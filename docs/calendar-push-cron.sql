-- Optional scheduler setup, AFTER migration 0024 and Vercel environment setup.
-- Run manually in the Supabase SQL editor. Replace the placeholder only there.
-- Never paste a real secret into a committed file.
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Narrow token matching Vercel CALENDAR_CRON_SECRET, NOT a Supabase admin key.
select vault.create_secret('REPLACE_WITH_CALENDAR_CRON_SECRET', 'jaminova_calendar_cron_secret');

-- pg_net queues decrypted headers; application roles must not read the queue.
revoke all on table net.http_request_queue from public, anon, authenticated;

select cron.schedule('jaminova-calendar-reminders', '* * * * *', $job$
  select net.http_get(
    url := 'https://www.rad-yar.com/api/andarun/reminders/dispatch',
    headers := jsonb_build_object('Authorization', 'Bearer ' || (
      select decrypted_secret from vault.decrypted_secrets
      where name = 'jaminova_calendar_cron_secret' limit 1
    )),
    timeout_milliseconds := 60000
  );
$job$);

-- Verify via cron.job_run_details AND net._http_response (HTTP 200).
-- Job execution success alone does not prove HTTP request success.
-- To disable without deleting device settings:
-- select cron.unschedule('jaminova-calendar-reminders');
