# Cystic pancreatic lesions: source and assessment ledger

## Scope and evidence

- Route: `/abdomen/pankreas/zystische-tumoren`
- Source: `Abdomen.pdf`, physical pp.40–42; visible printed footer pages 39–41.
- Exact curriculum IDs already present: `ipmn`, `mcn-pankreas`, `seroeses-zystadenom`.
- Physical p.40 / printed p.39 was visually reviewed. It compares true cysts and pseudocysts (epithelial lining versus connective-tissue/scar wall), gives congenital versus inflammation/trauma associations, describes pseudocyst context and shows a CT example.
- Physical p.41 / printed p.40 was visually reviewed. It defines IPMN, distinguishes main-duct, branch-duct and mixed types, emphasizes duct communication, and contains CT/MRI/MRCP examples.
- Physical p.42 / printed p.41 was visually reviewed. It lists risk features using older Fukuoka-era criteria. The lesson labels this source list as dated and uses the separately cited Kyoto 2024 guideline for current high-risk stigmata.
- The p.40 image is a CT example of a pseudocyst. It does not depict the separate serous-cystadenoma comparison, which is text-only; no image was reused as serous evidence.
- Paired axial MRI/MRCP panels from physical p.41 (printed p.40) are now displayed next to the duct-communication teaching point. Visual inspection confirms the slide places them with the statement that communication with the pancreatic duct matters. The panels are unannotated, so the localized caption and alt explicitly avoid claiming that one connection is proven from this crop. Provenance is recorded in `public/educational/pancreatic-cysts/image-provenance.json`.
- Page renders used during this bounded review are in `review-cystic-pancreas-pages/abdomen-cystic-pancreas-40.png`, `-41.png`, and `-42.png`.

## Assessment disposition

| Exact curriculum ID | Existing/added global MCQ | Retrieval card | Scope statement |
|---|---|---|---|
| `ipmn` | Existing single question retained and linked: duct communication in a fitting clinical context supports IPMN over pseudocyst. | Shared topic link | The question addresses IPMN recognition only. The pseudocyst-context retrieval card is relevant background, not an IPMN classification test. |
| `mcn-pankreas` | None; no distinct source-supported global objective was added. | None; curriculum route link removed | MCN is not taught on pp.40–42. This topic needs another approved source before authoring or assessment. |
| `seroeses-zystadenom` | None; the PDF provides only one limited morphology clue, so no broader global MCQ was added. | Shared topic link; one separate card asks the PDF’s macrocystic/lobulated-head clue | The card tests this single source finding only; no broader serous-neoplasm characterization or management is claimed. |

The original route-local check asked about duct communication, duplicating the existing global IPMN MCQ. It was removed. The route shell now has a distinct localized check on epithelial lining versus connective-tissue/scar wall; the global MCQ retains the duct-communication objective. Two cards are localized in German, English and Persian: pseudocyst context clues, and the separate source-limited serous morphology cue. IPMN and serous topic links lead to the shared card set; MCN has no route or assessment link because the PDF does not cover it.

The route’s `LessonReferenceShell` previously received `c` even though the localized content object is `copy`, causing an undefined-variable runtime failure. The scoped repair now passes `copy.title` and `copy` and exposes the existing IPMN quiz and shared-card action, each with a localized return target to `#first-look`.

## Verification status

- Focused test: `node --import tsx scripts/test-pancreatic-cyst-assessment-integration.mjs` — passed after review fixes.
- Global MCQ audit: `npm run audit:mcq` — passed (767 questions and 18 cases per language in the current audit output).
- Diff whitespace check: `git diff --check` — passed.
- Independent review: initial ASM/EDU findings (duplicated duct-communication checks and broad true-cyst etiology wording) were corrected. Independent delta confirmed the p.41 MRI/MRCP pair, crop, provenance and translated caption/alt. SRC/EDU/VIS/LNG/ASM/REV PASS for this bounded scope. UX remains BLOCKED by browser/build access; Dr. Zia's scientific approval remains pending.
- Browser/render QA: not performed; CUA reported no available apps or browsers. `npm run build` failed because font download resolution returned `ENOTFOUND fonts.googleapis.com`, then Next.js could not create a `.next/server/app/...` directory (`EPERM`).
- Clinical approval by Dr. Zia: pending.
- Publication: not requested.

## Independent delta review

| Gate | Result | Evidence / open item |
|---|---|---|
| SRC | PASS | Physical pp.40–42 / printed pp.39–41 rechecked; MCN is explicitly excluded from this source scope. Kyoto 2024 criteria are separately cited. |
| EDU | PASS | Duplicate route-local duct question removed; shell check now covers wall lining, while global IPMN MCQ covers duct communication. Chapter labels are route-specific and localized. |
| VIS | PASS | Independent reviewer confirmed the paired MRI/MRCP crop from physical p.41 (printed p.40), that it is placed with the related duct/morphology point, and that it adds no claims beyond the unannotated source panels. The p.40 serous clue remains text-only because its image is a pseudocyst CT. |
| LNG | PASS | Wall check and both cards reviewed as semantically equivalent across DE/EN/FA. |
| ASM | PASS | IPMN alone links to the existing global MCQ; IPMN and serous cystadenoma link to the shared two-card topic; MCN has no route or assessment link. |
| UX | BLOCKED | No browser was available; production build hit font DNS and `.next` permission errors. |
| REV | PASS for scoped assessment/visual changes | Independent reviewer rechecked the image, crop, provenance, translated caption/alt and assessment wiring after the initial findings were repaired. UX remains separately blocked. |

| ID | Severity | Evidence | Status |
|---|---|---|---|
| PANC-VIS-01 | Major / resolved | Lesson previously showed no source MRI/MRCP example despite the p.41 cases. | Added paired source MRI/MRCP crop, localized caption/alt and provenance record; independent delta confirmed the crop and source caveat. |
