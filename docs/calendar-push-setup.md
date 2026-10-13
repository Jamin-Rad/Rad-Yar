# Jaminova calendar reminders

Not active until all of the following are configured. UI fails closed and checks a
recent authenticated scheduler heartbeat before offering device activation.

1. Apply `supabase/migrations/0024_calendar_push.sql` in the project's Supabase SQL
   editor. These new tables contain device subscriptions and delivery receipts;
   RLS is enabled and browser roles have no access. Existing appointments need no
   migration: cancellation is stored in their existing event metadata.
2. Generate one VAPID key pair with `npx web-push generate-vapid-keys` locally.
   Save its values as **Production** Vercel secrets `CALENDAR_VAPID_PUBLIC_KEY` and
   `CALENDAR_VAPID_PRIVATE_KEY`. Do not put keys in Git or chat. Set
   `CALENDAR_VAPID_SUBJECT` to a real contact `mailto:` URL.
3. Generate an independent random secret (at least 32 bytes) and set
   `CALENDAR_CRON_SECRET` in Vercel Production. Redeploy. This is NOT the Supabase
   service-role key and NOT the OpenAI API key.
4. Configure an HTTPS scheduler to GET
   `https://www.rad-yar.com/api/andarun/reminders/dispatch` **every minute** with
   authenticated by a short-lived HMAC (`x-calendar-timestamp` plus
   `x-calendar-signature`). Use `docs/calendar-push-cron.sql`. The user saves the
   same `CALENDAR_CRON_SECRET` in Vault as `jaminova_calendar_cron_secret`.
   No permanent token is placed in a queued request or URL. Alternatively,
   Vercel Pro Cron can call a secured wrapper; Vercel's normal `CRON_SECRET`
   must then be identical. Hobby's once-daily cron is not sufficient.
   No paid plan upgrade or external scheduler account is created by this change.
   Supabase does not support restricting pg_net queue grants per project;
   signatures expire after 90 seconds and reveal no permanent credential.
   Verify Vault is inaccessible to browser roles. Never use a broad database/admin
   token for this job. Verify HTTP 200 and heartbeat after setup.
5. On iOS 16.4+, install via Safari → Share → Add to Home Screen; open that app.
   Termine → Erinnerungen → Auf diesem Gerät aktivieren. Grant permission from
   that button and use **Test senden**. Close the app to verify a real reminder.

Defaults: 24 hours and 30 minutes before timed personal appointments (not school
holidays, public holidays, duties or all-day entries). Timezone Europe/Berlin.
Cancelled/completed appointments never enter delivery. Rescheduled entries are
checked again before sending. Late/newly-entered reminders are not backfilled;
grace window is five minutes. Failed deliveries retry at most three times using
an atomic lease, with a stable notification tag. Notification delivery can still
be delayed by network/device/Focus settings. No guaranteed exact-time delivery.

Lock-screen details are opt-in, independently per device. Subscriptions are sent
only to Apple's/Google's/Mozilla's approved push endpoints. No food photos or
health records are accessed. Service worker has no fetch handler or private cache.
