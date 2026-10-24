# Wirbelsäule completion — bounded browser QA, 2026-10-24

Environment: Next dev at http://localhost:3021, real in-app Chromium controlled through cua_repl. Browser plugin skill was not available; the supported computer-use browser API was used. An agent-owned hidden tab inherited the existing Ben sign-in after hydration. No authentication, entitlement, publication, or learning-status gate was altered. Temporary viewport override was reset at the end.

Flow: each new lesson → localized chapters and clinical figures → inline decision feedback → exact-topic quiz/cards → localized return; additionally existing MS/epidermoid hash targets and reload.

## Evidence and coverage

Evidence folder (outside source repository):
`C:/Users/Drham/.codex/visualizations/2026/10/18/01a150ca-995b-7911-8a8a-2ed2ee94575b/spine-qa`

54 route/language/viewport/theme observations are recorded in `matrix.json`; viewport screenshots and DOM text accompany the captures. 67 screenshots total include interim captures and focused interactions. This is a bounded sample, not an assertion of exhaustive device/browser coverage. Matrix captures examined page identity, meaningful content, heading language, geometry and hero loading. Pixel inspection was focused on representative desktop clinical figures and mobile FA layouts, not every saved image.

| Lesson | Recorded entry matrix | Additional rendered check |
|---|---|---|
| Leptomeningitis | DE/EN/FA ×1440/390 light | EN desktop clinical figure; DE wrong→correct→EN feedback reset; exact quiz/card |
| Neuroborreliose | DE/EN/FA ×1440/390 light | FA390 dark: clinical MRI, RTL, chapter switching |
| Spondylolisthesis | DE/EN/FA ×1440/390 light/dark | DE desktop real image loaded (naturalWidth772); wrong→correct→DE reset; quiz/card |
| Bandossifikation | DE/EN/FA ×1440/390 light/dark | EN desktop CT chapter/figure and attribution |
| Osteoporotische Fraktur | DE/EN/FA ×1440/390 light/dark | EN desktop CT/MRI figure; wrong/correct inline feedback; quiz/card |
| Renale Osteodystrophie | DE/EN/FA ×1440/390 dark | Figure image loaded in all six states; FA390 pixel-inspected entry; light theme switch and DOM inspected |

All recorded geometry checks had document scrollWidth ≤ viewport width (1425/1440 or375/390). No full-page horizontal overflow. Mobile headings wrap, including longer Persian titles, without overlap in inspected captures. Shared typography/RTL and controls remained legible. Long source captions wrap within cards. Clinical figures in initially closed chapters are lazy-loaded; false image-complete values in the entry matrix are not broken-asset evidence. Those figures were separately opened and inspected, including replacement of an early Spondylolisthesis screenshot taken before loading.

## Interaction evidence

- Leptomeningitis: DE wrong answer explains why enhancement is not pathogen proof; changing to correct answer updates explanation; switching EN clears selected feedback. EN#mrt opens the intended chapter. `lepto-en-desktop.png`.
- Lyme: FA390 dark case chapter opens, real sagittal/axial MRI and translated caption visible, root-specific answer options in RTL. `lyme-fa-mobile-dark.png`.
- Osteoporosis: EN#aktivitaet renders actual CT/T2 figure and caption. Wrong cause-inference receives specific feedback; correct activity interpretation receives correct feedback. Quiz shows2 exact-topic questions and correct shuffled answer handling; cards show2 topic-specific cards and flip. `osteoporosis-real-image.png`, `metabolic-quiz.png`, `metabolic-card.png`. Quiz return was used; the card return link was observed and activated, but no separate final-URL assertion was completed for that card return (the same route has the same heading in cards and lesson).
- Degenerative: local Spondylolisthesis wrong/correct explanations and language reset verified. Quiz incorrect answer shows correct answer plus selected-option analysis. Card flip succeeds. Both quiz and card return awaited the exact EN lesson URL. `spondylo-real-image.png`, `ossification-real-image.png`.
- Infectious: Leptomeningitis quiz handles3 options and correct/incorrect explanations, not an unrelated topic. Card shows2 exact-topic entries, flips and returns to the exact EN lesson URL. `infectious-quiz.png`, `infectious-card.png`.
- Existing MS comparison: direct EN#compare opens comparison and new spinal check, exact `multiple-sklerose-spinal` quiz/card links include encoded localized `#compare`. Wrong/correct selections display substantive feedback. Reload preserves expanded comparison chapter. `ms-compare-check.png`.
- Existing tumour lesson: direct EN#signal-patterns opens table and new epidermoid check, exact `epidermoid-spinal` practice links include encoded localized hash. Wrong/correct selections produce explanatory feedback. Reload preserves expanded target chapter. `epidermoid-check.png`.
- Existing arachnoiditis practice roundtrip was independently exercised by parent; see `spine-completion-access-plan.md`.

## Browser health and limits

Final captured error log: empty. Warn log contained Clerk development-key notices, not a lesson runtime error. No framework overlay observed. A few short locator timeouts arose during auth/card hydration; refreshed DOM showed the loaded content and checks resumed successfully. First SSR frame is German before query-language hydration; captures used localized heading waits. No persistent loading failure found.

No new visual or runtime blocker found in this bounded pass. This does not certify scientific correctness, all states on every device, 320/760px behavior, complete keyboard/screen-reader interaction, reading-progress persistence, or final clinician approval. Those should not be silently upgraded to PASS based on these captures. Independent review and Dr. Zia's scientific review remain distinct.

## Required matrix follow-up (review finding)

The lesson standard requires the full DE/EN/FA ×1440/390 ×light/dark entry matrix. The preceding54 observations leave18 required states outstanding: leptomeningitis and neuroborreliosis in dark mode (12), and renal osteodystrophy in light mode (6). Required320/760 samples and a keyboard-focus/mobile-navigation probe also remain to be supplied. The initial bounded pass is therefore not a full UX-gate PASS.

A follow-up was dispatched on the production server at localhost3021. In the reactivated subagent, the former Browser2 became unavailable, `cua.listBrowsers()` returned an empty array, and a new hidden IAB tab could not be created (`Browser is not available`). No further UI state was claimed from those failed calls. Completion of these checks requires the parent's still-active browser or restoration of a browser surface. Parent is separately checking reading progress, continue, history navigation and reload.

## Production retest and closure evidence — coordinator

`npm run build` succeeded (Next15.5.19,371 generated pages). Production server on3021 used for this retest. Known unrelated CSS/autoprefixer and multiple-lockfile warnings remain; no build failure.

The prior screenshots `lepto-en-desktop.png`, `lyme-fa-mobile-dark.png`, `ossification-real-image.png` and `osteoporosis-real-image.png` were insufficient diagnostic-pixel evidence (SPN-VIS-03): early captures showed blank/unpainted areas. DOM image-loaded checks alone did not close this. They are superseded by actual pixel-inspected production captures: `production-lepto-mri-visible.png`, `production-lyme-visible.png`, `production-ossification-visible.png`, `production-osteoporosis-visible.png`. All display the diagnostic panels and matching surrounding text. Additional `production-renal-visible.png` and `production-spondylo-visible.png` show the remaining two actual clinical figures. No source image/CSS repair was required; this was a capture-timing/evidence defect, not a demonstrated broken clinical asset.

Root completed the18 previously missing matrix entries: both infection routes DE/EN/FA×1440/390 dark; renal DE/EN/FA×1440/390 light. `production-matrix.json` plus same-name PNG/TXT captures records these. Theme-button state independently checked in each saved DOM. Combined with original54, all72 required entry states exist. All added entries had document width1425/375 at viewport1440/390. Representative FA darkLyme/lightRenal pixels inspected, readable and no overlap.

Additional samples/interactions:
- Renal FA320: document width305 atviewport320; mobile contents opened, all3namedchapters visible in dialog. Enter on secondchapter selected it and closed dialog. `production-renal-fa-320-menu.png`.
- Renal FA760: document width745 atviewport760. Tab from expanded chapter header focused the firstanswer with visible2.66667px outline; Enter selected it and displayed translated correct-answer status. `production-renal-fa-760-keyboard.png`. This is a targeted keyboard sample, not full screen-reader certification.
- Leptomeningitis DE production: navigation from first to second chapter leftprogress0/3. Explicit marksection changed to1/3; reload retained1/3 and the #mrt chapter. Continue opened the thirdchapter while retaining1/3. Returned to secondchapter and toggled markoff, restoring teststate0/3. `production-progress-reload.png`.
- Production final captured browsererrorlog empty. Viewportoverride reset. No gates altered.

Earlier “missing18/320/760/progress” evidence blockers above are superseded by this retest. Independent reviewer must still inspect these corrections; final clinical approval remains separate.

Independent reviewer final: all gates PASS for this bounded delta after production retest. Findings and actual scope are recorded in `spine-independent-review.md`.
