-- Run after the due_calendar_push migration and publication of the matching sender.
-- The existing Vault secret and the named job are reused. Running this file again is safe.
begin;
create extension if not exists pg_cron;
create extension if not exists pg_net;

create or replace function public.calendar_push_tick()
returns bigint language plpgsql security invoker set search_path = '' as $$
declare
  tick timestamptz := statement_timestamp();
  stamp text;
  secret text;
  request_id bigint;
begin
  if not exists (select 1 from vault.secrets where name='jaminova_calendar_cron_secret') then
    raise exception 'Calendar scheduler credential missing';
  end if;
  insert into public.calendar_push_health(id,last_run) values(1,tick)
    on conflict(id) do update set last_run=greatest(public.calendar_push_health.last_run,excluded.last_run);

  if date_trunc('minute',tick at time zone 'UTC')=date_trunc('day',tick at time zone 'UTC') then
    delete from public.calendar_push_deliveries where claimed_at < tick - interval '30 days';
  end if;
  if not exists (select 1 from public.calendar_push_subscriptions where cardinality(leads)>0) then return null; end if;
  if not exists (select 1 from public.calendar_push_candidates(tick)) then return null; end if;

  update public.calendar_push_health set last_dispatch_at=tick where id=1
    and (last_dispatch_at is null or last_dispatch_at < date_trunc('minute',tick));
  if not found then return null; end if;

  select decrypted_secret into strict secret from vault.decrypted_secrets where name='jaminova_calendar_cron_secret';
  stamp := floor(extract(epoch from clock_timestamp()))::bigint::text;
  select net.http_get(url := 'https://www.rad-yar.com/api/andarun/reminders/dispatch',
    headers := jsonb_build_object('x-calendar-timestamp',stamp,'x-calendar-signature',
      encode(extensions.hmac(E'GET\n/api/andarun/reminders/dispatch\n'||stamp,secret,'sha256'),'hex')),
    timeout_milliseconds := 60000) into request_id;
  return request_id;
end $$;

revoke all on function public.calendar_push_tick() from public,anon,authenticated,service_role;
select cron.schedule('jaminova-calendar-reminders','* * * * *','select public.calendar_push_tick()');
commit;
