# Thorax completion: browser verification

Date: 2026-10-24. Local worktree, development server localhost:3021; authenticated existing admin account. Access gates were preserved. This is local evidence, not a production deployment check.

Evidence directory: `C:/Users/Drham/.codex/visualizations/2026/10/18/01a150ca-995b-7911-8a8a-2ed2ee94575b/thorax-qa`.

| Surface | Actual checks | Evidence |
|---|---|---|
| Cyst differential | DE desktop comparison; EN original CT; FA390 dark diagram and RTL; wrong/correct local feedback and language reset; EN two-card deck flip and return | cysts-de-desktop.png, cysts-fa-mobile-dark.png, cysts-en-case-dark.png, cysts-card-en.png |
| Pectus | DE desktop; FA320 image pair stacked; EN two-question quiz wrong-answer feedback, three-card deck flip and both lesson returns | pectus-de-desktop.png, pectus-fa-320.png, pectus-quiz-en.png, pectus-card-en.png |
| LCH | DE desktop; EN dark actual paired CT loaded (naturalWidth567/460); FA390 dark stack; wrong basal-sparing assertion feedback, correct morphology response, language reset | lch-en-case-dark-final.png, lch-fa-mobile-dark.png |
| CF | DE desktop; EN case with wrong expiratory-proof feedback and correct response; FA390 dark actual axial/coronal images loaded (280/261), language reset | cf-de-desktop.png, cf-fa-mobile-dark.png |
| HP | EN desktop original CT loaded (320); FA390 dark density/phase diagram; correct expiration response and EN language reset | hp-en-case-light.png, hp-fa-diagram-dark.png |
| Bronchiolitis | DE desktop; incorrect organism-proof response and correct morphology-context explanation; FA390 original CT loaded (306), RTL and language reset | bronchiolitis-de-desktop.png, bronchiolitis-fa-mobile.png |
| HRCT | Direct atelectasis hash; header to GGO synchronizes hash; reload preserves GGO; Back restores atelectasis; local wrong/correct responses | hrct-hash-back.png |
| Pneumonia | EN route renders; empyema row opens exact one-question quiz; correct response plus explanation; Back restores language and #pleuraempyem; exact one-card deck flipped and returned to same anchor | pneumonia-empyema-quiz-en.png, pneumonia-empyema-card-en.png |

Mobile lesson body scrollWidth375 at viewport390 (pectus305 at320): no horizontal lesson overflow observed. Existing admin toolbar is crowded at320; it was not redesigned. Shared dark sidebar/mobile-path contrast was corrected; final LCH dark evidence supersedes the earlier loading/light screenshot `lch-en-case-dark.png`. The older cyst EN screenshot also predates that contrast repair. Do not cite those old screenshots as proof of the repaired contrast.

Final captured browser error log returned no errors. There were transient screenshot/selector timing failures during tool use; evidence was recaptured after hydration, theme transitions and image loading. This matrix is representative across languages/themes and interactions, not a claim that every possible viewport/state or all legacy lessons were exhaustively tested. Pure exact-topic registry/SSR tests cover all DE/EN/FA variants separately.

Production closeout: exact package-lock dependencies installed with `npm ci --ignore-scripts --no-audit --no-fund`; Next15.5.19 production build exited0 and generated365/365 pages. Initial missing `web-push` was a local installation issue; no manifest/lock change. Existing unrelated CSS/autoprefixer and multiple-lockfile tracing warnings remain. All seven scoped scripts were rerun successfully with the locked install.

Production-mode LCH verified via `next start`: actual pointer hover on the active sidebar button yielded background rgb(48,69,82), white text, theme=dark; both CT images loaded. Screenshot `lch-production-dark-hover.png` captures this repaired state. Final production browser errors: none in captured error log. Theme restored to light after testing.
