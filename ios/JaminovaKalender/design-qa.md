# Verification — synchronization update

0.2.0 (2) preserves the selected pearl/olive design and replaces fixture-only state with the persistent calendar store. iPhone login, all-day create/save, active sync status/profile and iPad landscape week/inspector were observed on iOS 18.5. Synthetic QA uses a compile-time-only service that cannot perform HTTP requests. Production starts at the real current date with login, not fixture data.

Evidence: `outputs/JaminovaKalender/sync-login.png`, `sync-profile-qa.png`; native iPad week and inspector also observed via Computer Use. Storage restart, offline retry, lost acknowledgment, conflicts and exact Unicode retention were tested with the real store against an isolated service. Live database integration used a separate QA owner and removed its synthetic row.

One inaccurate generic inspector label was replaced with “Persönlicher Termin”, because only the status bar can establish whether a particular local change is still pending. The all-day header was shortened to fit its narrow time-axis column.

Full physical-device and authenticated protected-preview end-to-end testing remains pending. Backend production deployment and TestFlight build 2 distribution are not complete; automatic review rejected the direct main-branch release. See README for validation counts and limitations. Earlier home-screen diagnostic captures are not app evidence.
