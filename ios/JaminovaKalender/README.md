# Jaminova Kalender

Native iPhone/iPad calendar, iOS 17+, using the approved pearl/olive design. Release bundle `com.radyar.jaminovakalender`, Apple team `5G6A6659M8`. Version 0.1.0 (1) is the original private TestFlight design preview. Version **0.2.0 (2)** implements persistent storage and two-way synchronization and is prepared for release; it has **not** been published to production or TestFlight.

## Shared data and authentication

The app signs in with the existing Jaminova web password through `https://www.rad-yar.com/api/andarun/login`. Only the resulting mobile session is stored in this app's Keychain service, accessible while the device is unlocked and restricted to this device. No password or database key is bundled. Cookies are disabled and redirects never receive credentials.

The new authenticated `/api/andarun/calendar` endpoint reads and changes the existing `andarun_todos` event rows, including the legacy owner IDs. Web, the personal-calendar ChatGPT connector, iPhone and iPad therefore use the same event IDs and metadata. Tasks are excluded; unrelated/shared-account access is not added. No database migration, new user account or new ChatGPT connection is needed.

## Persistence and synchronization

`Application Support/JaminovaKalender/calendar-v1.json` contains the last server snapshot and a durable queue of local changes. It is atomically written with complete file protection before an edit is reported as saved. A disk-write failure keeps the editor open; unreadable stored data fails closed and is not overwritten. Failed uploads retain the same event and mutation IDs across restarts. An acknowledged creation cannot be duplicated by a retry after a lost response.

The app synchronizes at login, after local edits, on foreground entry and every 15 seconds while active. The profile provides manual sync, pending-change counts, last-sync time and authentication errors. Offline edits remain visible and durable. Synchronization does not run continuously while iOS suspends the app; other devices receive changes when both can reach the server. Expired login preserves pending work and requests reauthentication. Logout is blocked while pending changes exist.

Writes compare the server's exact `updated_at` version. Concurrent web/ChatGPT/device edits become durable conflicts, retaining both the local draft and server snapshot. The user can explicitly keep the server state or apply the local change; a remote deletion requires an explicit new copy. Later queued local edits are rebased only after the preceding local mutation is acknowledged. Changes to different records do not block one another on conflict.

All-day and inclusive multi-day events, untimed events and optional end times round-trip in Europe/Berlin. Cancellation preserves the row for the web and ChatGPT; the profile can reopen cancelled/completed events. The selected category survives web/ChatGPT edits. Unicode notes are not truncated by UTF-16 code-unit boundaries.

The web calendar polls while visible and refreshes on focus, without replacing open edit forms. Stale saves return a conflict and leave the draft open. Existing ChatGPT tool names and return contracts are preserved.

## Validation — 2026-11-10

- 13 original model checks, 29 durable-store/two-device checks, 10 HTTP contract checks.
- 16 backend/web/ChatGPT checks; JSX compilation and Vercel preview build passed.
- Live database integration passed create/read/update/retry/stale-write/cancellation using an isolated synthetic owner; its test row was removed. Personal calendar records were not changed.
- iOS 18.5 simulator UI: production login screen, synthetic all-day create/save, sync status/profile and landscape iPad week/detail view verified. QA cannot reach a network service and is compiled only with `CALENDAR_QA` in the `.preview` bundle.
- Evidence is under `../../outputs/JaminovaKalender/`: `sync-login.png`, `sync-profile-qa.png`, build logs and the signed archive.

No real user's password was entered in the simulator. Authenticated full end-to-end testing against the protected Vercel preview and physical devices is not claimed. Production publication needs final approval after automatic review rejected a direct push to `main`; the existing website and TestFlight build 1 remain unchanged. The existing authenticated Vercel deployment build was verified as READY; creating a temporary access-sharing link was rejected and no such link was created.

## Build and tests

```sh
xcodebuild -project ios/JaminovaKalender/JaminovaKalender.xcodeproj -scheme JaminovaKalender -configuration Release -sdk iphonesimulator -derivedDataPath /private/tmp/kalender-sync-build CODE_SIGN_IDENTITY=- build
swiftc -parse-as-library -module-cache-path /private/tmp/kalender-module-cache ios/JaminovaKalender/JaminovaKalender/CalendarModel.swift ios/JaminovaKalender/JaminovaKalender/CalendarSync.swift ios/JaminovaKalender/JaminovaKalender/CalendarStore.swift ios/JaminovaKalender/tests/SyncTests.swift -o /private/tmp/kalender-sync-tests
/private/tmp/kalender-sync-tests
```

Backend changes were made in an isolated checkout on `codex/kalender-durable-sync`, based on the current production source, to preserve unrelated local work. The native Release uses the canonical production URL; publish the backend before assigning build 2 to the existing private TestFlight group. `ExportOptions-TestFlight.plist` remains Internal Only.

Automatic holiday overlays, push reminders, recurring events and Persian localization are not included in this update. Owned calendar events synchronize; the web's calculated holiday overlays are not stored as personal events. The old preview fixtures are never loaded by the normal application.
