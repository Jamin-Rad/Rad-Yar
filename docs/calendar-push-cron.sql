-- After migration 0024 and Production environment setup.
-- The user saves CALENDAR_CRON_SECRET in Supabase Vault under the exact name
-- jaminova_calendar_cron_secret. Never paste that value into committed SQL.
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- pg_net exposes queued headers. Send a short-lived HMAC, never a permanent token.
-- The job skips requests until Vault is ready.
select cron.schedule('jaminova-calendar-reminders', '* * * * *', $job$
  with config as (
    select decrypted_secret as token from vault.decrypted_secrets
    where name = 'jaminova_calendar_cron_secret' limit 1
  ), clock as (
    select floor(extract(epoch from clock_timestamp()))::bigint::text as stamp
  )
  select net.http_get(
    url := 'https://www.rad-yar.com/api/andarun/reminders/dispatch',
    headers := jsonb_build_object(
      'x-calendar-timestamp', c.stamp,
      'x-calendar-signature', encode(extensions.hmac(
        E'GET\n/api/andarun/reminders/dispatch\n' || c.stamp,
        k.token, 'sha256'), 'hex')
    ),
    timeout_milliseconds := 60000
  ) from config k cross join clock c;
$job$);

-- Verify cron.job_run_details, net._http_response HTTP 200 AND heartbeat.
-- Job execution success alone does not prove HTTP request success.
-- Disable without deleting device settings:
-- select cron.unschedule('jaminova-calendar-reminders');
