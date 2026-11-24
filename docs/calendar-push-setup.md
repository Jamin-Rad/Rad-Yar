# Jaminova calendar reminders

Supabase Cron checks the calendar every minute. The database records a heartbeat locally and calls Vercel only when a registered device has a due reminder. The dispatcher rechecks the current appointment and device while reserving its receipt. The receipt belongs to one device, appointment occurrence and lead time.

## Installation

1. Apply `supabase/migrations/0024_calendar_push.sql` and `supabase/migrations/20261124114153_due_calendar_push.sql`.
2. Configure the production VAPID public and private keys, the VAPID contact subject and `CALENDAR_CRON_SECRET`. Store the same scheduler secret in Supabase Vault as `jaminova_calendar_cron_secret`. Keep the secret in Vault and Vercel settings.
3. Deploy the corresponding sender, then run `docs/calendar-push-cron.sql`. It updates the existing named minute job in a transaction. A due callback uses a short-lived HMAC, and pg_net sends it after commit.
4. Check the recent successful run in `cron.job_run_details` and `calendar_push_health.last_run`. An idle tick returns NULL. For a due tick, check the HTTP outcome and the device receipt.
5. Enable reminders on the intended device under **Termine → Erinnerungen → Auf diesem Gerät aktivieren** and use **Test senden**. On iOS, use the installed Home Screen web app.

## Delivery

Timed appointments use Europe/Berlin. The supported leads are 24 elapsed hours and 30 minutes. The first occurrence of an ambiguous autumn time is used. A nonexistent spring time, a cancelled or completed event, or an all-day entry has no timed notification. The sender allows up to five minutes of catch-up for a delayed tick. Devices and appointments must have existed when the reminder became due.

A successful push-provider response records `sent`. Explicit HTTP 429 or 503 responses can retry on a later tick, respecting Retry-After, the five-minute window and the three-attempt limit. A timeout or ambiguous response records `uncertain`. A worker that stops after claiming leaves `sending`. Both prevent a second submission when the provider may already have accepted the first one. The device also remembers recently displayed reminder keys. The provider, connectivity and device notification settings determine when an accepted push appears.

Private appointment titles on the lock screen are opt-in per device. The service worker stores only short-lived display keys for deduplication.
