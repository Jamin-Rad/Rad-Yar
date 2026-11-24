-- The clock and receipt key are shared by cron and the sender. Existing receipts stay valid.
alter table public.calendar_push_health add column if not exists last_dispatch_at timestamptz;
alter table public.calendar_push_deliveries add column if not exists retry_after timestamptz;
alter table public.calendar_push_deliveries drop constraint if exists calendar_push_deliveries_status_check;
alter table public.calendar_push_deliveries add constraint calendar_push_deliveries_status_check
  check (status in ('sending', 'sent', 'failed', 'uncertain', 'rejected'));

-- Older workers recorded timeouts and definite refusals under the same status.
update public.calendar_push_deliveries set status='uncertain' where status='failed' and retry_after is null;

create index if not exists calendar_push_open_deadline_idx on public.andarun_todos (owner_id, deadline)
  where not done and deadline is not null;

-- Malformed legacy notes are ordinary notes. On older installations the event fields exist only here.
create or replace function public.calendar_push_note_meta(note text)
returns jsonb language sql immutable strict security invoker set search_path = '' as $$
  select case when starts_with(note, '[[andarun:todo-meta:') and strpos(note, ']]') > 0
    and pg_input_is_valid(header, 'jsonb') then header::jsonb else '{}'::jsonb end
  from (select split_part(substr(note, length('[[andarun:todo-meta:') + 1), ']]', 1) as header) parsed
$$;

create or replace function public.calendar_push_candidates(p_now timestamptz default statement_timestamp())
returns table (owner_id text, endpoint_hash text, reminder_key text, subscription jsonb,
  show_details boolean, enabled_at timestamptz, title text, event_time text, lead integer)
language sql stable security invoker set search_path = '' as $$
  with events as materialized (
    select t.id, t.title, t.deadline, t.created_at, to_jsonb(t) as fields, public.calendar_push_note_meta(t.note) as meta
    from public.andarun_todos t
    where not t.done and t.owner_id in ('email:dr.benjamin.zia@gmail.com','email:dr.benjaminzia@gmail.com','email:drbenjaminzia@gmail.com')
      and t.deadline between (p_now at time zone 'Europe/Berlin')::date and ((p_now + interval '24 hours') at time zone 'Europe/Berlin')::date
  ), timed as (
    select e.*, left(coalesce(nullif(fields->>'event_time',''),meta->>'eventTime',''),5) as hhmm
    from events e
    where coalesce(nullif(meta->>'itemType',''),fields->>'item_type','todo') = 'event'
      and (meta->'cancelled') is distinct from 'true'::jsonb
      and coalesce(fields->>'all_day',meta->>'allDay','false') = 'false'
  )
  select s.owner_id, s.endpoint_hash, k.receipt, s.subscription, s.show_details, s.enabled_at, e.title, e.hhmm, l.minutes
  from timed e
  cross join lateral (select e.deadline + case when e.hhmm ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' then e.hhmm::time end as wall) w
  -- Reject a nonexistent spring time; select the first occurrence during the fall overlap.
  cross join lateral (select min(instant) as starts from
    (values (w.wall at time zone 'Europe/Berlin'), ((w.wall at time zone 'Europe/Berlin') - interval '1 hour')) offsets(instant)
    where instant at time zone 'Europe/Berlin' = w.wall) b
  join public.calendar_push_subscriptions s on s.owner_id = 'email:dr.benjamin.zia@gmail.com'
  cross join lateral (select distinct minutes from unnest(s.leads) values_(minutes) where minutes in (30,1440)) l
  cross join lateral (select b.starts - l.minutes * interval '1 minute' as due,
    e.id::text || ':' || (extract(epoch from b.starts)*1000)::bigint::text || ':' || l.minutes::text as receipt) k
  left join public.calendar_push_deliveries d on (d.owner_id,d.endpoint_hash,d.reminder_key) = (s.owner_id,s.endpoint_hash,k.receipt)
  where k.due between p_now - interval '5 minutes' and p_now and b.starts > p_now
    and e.created_at <= k.due and s.enabled_at <= k.due
    and (d.reminder_key is null or (d.status='failed' and d.attempts<3
      and coalesce(d.retry_after,d.claimed_at + interval '1 minute') <= p_now))
  order by k.due, e.id, s.endpoint_hash
$$;

-- Once an attempt crosses the send boundary, only a definite provider refusal makes it retryable.
-- A lost response or worker crash must not re-send an already accepted notification.
create or replace function public.claim_calendar_push(p_owner text, p_endpoint text, p_key text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare acquired boolean;
begin
  insert into public.calendar_push_deliveries as d (owner_id,endpoint_hash,reminder_key)
  values (p_owner,p_endpoint,p_key)
  on conflict (owner_id,endpoint_hash,reminder_key) do update
    set status='sending', attempts=d.attempts+1, claimed_at=statement_timestamp(), retry_after=null
    where d.status='failed' and d.attempts<3 and coalesce(d.retry_after,d.claimed_at+interval '1 minute') <= statement_timestamp()
  returning true into acquired;
  return coalesce(acquired,false);
end $$;

create or replace function public.claim_due_calendar_push(p_owner text,p_endpoint text,p_key text)
returns table(subscription jsonb, show_details boolean, enabled_at timestamptz, title text, event_time text, lead integer)
language plpgsql volatile security invoker set search_path = '' as $$
declare c record;
begin
  select * into c from public.calendar_push_candidates() v
    where (v.owner_id,v.endpoint_hash,v.reminder_key)=(p_owner,p_endpoint,p_key);
  if not found then return; end if;
  if public.claim_calendar_push(p_owner,p_endpoint,p_key) then
    return query select c.subscription,c.show_details,c.enabled_at,c.title,c.event_time,c.lead;
  end if;
end $$;

revoke all on function public.calendar_push_note_meta(text), public.calendar_push_candidates(timestamptz),
  public.claim_calendar_push(text,text,text), public.claim_due_calendar_push(text,text,text) from public, anon, authenticated;
grant execute on function public.calendar_push_note_meta(text), public.calendar_push_candidates(timestamptz),
  public.claim_calendar_push(text,text,text), public.claim_due_calendar_push(text,text,text) to service_role;
