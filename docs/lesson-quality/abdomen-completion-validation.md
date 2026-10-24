# Abdomen completion: targeted technical validation

Executed 2026-10-24 in `.worktrees/gehirn-completion-main` against the current working tree. This record covers the targeted automated checks below. Browser evidence, independent scientific review, production build and publication are separate records; no build, server stop, commit or push was performed for this validation.

## Passing checks

Each script was run with `node --import tsx scripts/<filename>` and returned exit code 0.

| Script | Verified scope |
| --- | --- |
| `test-abdomen-flc-completion.mjs` | Actual FLC shell SSR in DE/EN/FA, RTL, labels, encoded practice returns, FLC/LI-RADS assessments, assets and HCC/LI-RADS syntax. |
| `test-abdomen-cirrhosis-render.mjs` | Actual cirrhosis route SSR and controls in three languages, encoded practice returns, four-option assessments, CT asset/clip CSS contract and four bounded-context route compilation. |
| `test-abdomen-gi-ssr.mjs` | Two new GI lessons in three languages, source links/assets, exact topic returns, four MCQs per language and four cards. |
| `test-abdomen-existing-practice-ssr.mjs` | Twelve actual route/locale SSR renders, Fornix shell/assets/source labels, six exact topics, encoded locale/anchor returns, twelve four-option MCQs per language and twelve cards. |
| `test-abdomen-completion-registration.mjs` | Four new routes and actual curriculum registration, eight new questions and eight cards with real localized retrieval, nine legacy cards registered once and unique Volvulus topic group. |
| `test-abdomen-legacy-card-access.mjs` | Nine self-contained translated cards, three topics and actual Ormond/panniculitis/peritoneal route action links in DE/EN/FA. |
| `test-reviewed-exam-distractors.mjs` | Seventeen questions × three languages accepted by the unchanged production exam validator; four unique choices, specific fourth-option feedback, correct answers unchanged, no input mutation. |
| `test-responsive-admin-navigation.mjs` | Actual component SSR with localized accessible toggle, target relation, all five existing admin features and unchanged signed-out/non-admin gates. |
| `test-lesson-hero-mobile-title.mjs` | Actual visible hero headings for four new lessons × three languages; mobile-only wrapping CSS and Persian hyphenation override. |
| `test-psc-mrcp-integration.mjs` | PSC/MRCP registration, trilingual assessments, PDF mapping, PBC scope and route actions. |
| `test-liver-avm-card-scope.mjs` | Hepatic AVM card scope and shunt distinction in three languages. |
| `test-pancreatitis-duct-disruption-card.mjs` | Duct continuity, secretin MRCP and fluid-leak terminology with explicit caveat against calling conventional T2 MRCP a contrast leak. |
| `test-solid-renal-masses.mjs` | Actual route fixture, curriculum, localized four-option questions, cards, visual/source ledger. |
| `test-colitis-patterns-render.mjs` | Actual route SSR in DE/EN/FA and RTL, bounded PDF scope, source examples, hash synchronization and curriculum links. |

`npm run audit:mcq` returned exit code 0: **883 questions and 18 cases per language** passed answer and option-specific explanation validation for exact exam transfer.

`git diff --check` returned exit code 0. Git emitted only line-ending conversion notices for the Fornix route and Navbar stylesheet; these were not test failures.

## Known existing stale test

`node --import tsx scripts/test-abdomen-gist-pylorus-render.mjs` was rerun and returned exit code 1 at the test harness import: `Cannot find module '@/components/LessonReferenceShell'`. The harness does not supply the shell used by the existing GIST route. Its subsequent source assertions also expect Choi response criteria, while the current GIST lesson explicitly defers historical TNM/PET/treatment/Choi statements and avoids assigning contrast phases to unlabelled PDF images.

This is recorded as an unresolved stale legacy test, not a passing check or a newly observed runtime defect. The test file has **no working-tree diff**; no exploratory changes remain. Current Pylorus route rendering and assessment links are exercised by the passing `test-abdomen-existing-practice-ssr.mjs`. This batch does not newly certify all historical GIST content.

## Evidence limits and remaining release record

SSR and CSS assertions do not establish visual contrast, title wrapping at 320/390 pixels, keyboard behavior, browser return trips, read-state persistence or clinical correctness. The parent maintains the browser evidence and independent reviewer findings separately, and will append build/publication results after their actual execution. No publication or clinical approval is implied by this report.
