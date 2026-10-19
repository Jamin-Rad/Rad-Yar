# Knocheninfarkt: source, design and QA ledger

Authoring date: 2026-10-19. Scope: one new lesson, not the full MSK necrosis chapter.
Route: `/msk/knochennekrosen/knocheninfarkt`; exact curriculum ID: `knocheninfarkt`.
Existing route inventory and curriculum were inspected before authoring; no corresponding route/link existed.

## Before implementation: learning contract and chapter plan

Audience: radiology trainees familiar with long-bone anatomy and basic T1/T2 signal.
Promise: distinguish a typical established medullary infarct pattern from epiphyseal osteonecrosis and identify findings requiring reconsideration.
Source language: German; authored equivalents: German, English, Persian.

1. Locate the lesion in metaphysis/diaphysis versus epiphysis (PDF 121–122).
2. Read the serpiginous border and central marrow separately on radiography/MRI (PDF 122).
3. Compare a cartilaginous lesion and infection without using one sign as an exclusion test (PDF 123 plus primary-source checks).
4. Compress the pattern into four portable rules; the self-check stays within the differential chapter.

No AVN ARCO staging, Perthes/OCD classification, treatment algorithm or follow-up interval is imported.
Report wording is an authored descriptive synthesis, not a source-provided template.

## Sources actually read

- Supplied `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF 120–123 / printed 119–122: extracted text and complete page images inspected. Essential scope is PDF 122–123; 120–121 only establish the AVN boundary.
- Duda et al., 1993, PMID 8508844, abstract: https://pubmed.ncbi.nlm.nih.gov/8508844/ . Retrospective chemical-shift study, eight femoral-head AVN and three bone-infarct patients; chemical shift can contribute to the double line, and its absence did not exclude proven osteonecrosis. Full article not read.
- Umans et al., 2000, PMID 10745133, abstract: https://pubmed.ncbi.nlm.nih.gov/10745133/ . Small selected acute-infarct/infection series (11 patients, mostly sickle-cell disease); documented coexistence and a pediatric infarct with periostitis prevent absolute exclusion rules. Full article not read; no diagnostic-accuracy claim generalized.
- Champsaur and Laredo, 1997, PMID 9754342, abstract: https://pubmed.ncbi.nlm.nih.gov/9754342/ . Supports peripheral serpiginous mineralization versus chondroid matrix and continuous low-signal infarct border. Full article not read.
- Barakat et al., 2019, PMID 30944730, abstract: https://pubmed.ncbi.nlm.nih.gov/30944730/ . Single longitudinal case demonstrates evolution before the established border appears; not a universal timeline. PMC full-text request returned recaptcha, so it is not recorded as read.

Publication dates above are distinct from access/verification date 2026-10-19.

## Coverage ledger

| ID | Source PDF / printed | Importance | Lesson/assessment destination | Status and rationale |
| --- | --- | --- | --- | --- |
| KI-01 | 122 / 121, definition | essential | `location` | Included: ischemic medullary/spongiosa necrosis in long-bone meta/diaphysis. |
| KI-02 | 120–122 / 119–121, AVN contrast | essential | `location`, MCQ location | Included as terminology/location distinction; no claim to cover AVN diagnosis or staging. |
| KI-03 | 122 / 121, risks | context | `location` | Included idiopathic, steroids, alcohol, trauma, hemoglobinopathies. Unsupported ranking “most common” omitted and recorded unresolved. |
| KI-04 | 122 / 121, radiography/CT | essential | `pattern`, flashcard border | Included early unremarkable imaging, established serpiginous sclerosis, possible later intramedullary mineralization. Not an obligatory chronology. |
| KI-05 | 122 / 121, T1 | essential | `pattern`, MCQ pattern | Included dark border with often retained central fatty-marrow signal. |
| KI-06 | 122 / 121, T2/STIR | essential | `pattern`, flashcard double line | Included possible bright/dark double line on T2; “pathognomonic” and simple histological proof are not repeated. Duda abstract records chemical-shift contribution and absence in proven cases. |
| KI-07 | 122 / 121, edema | essential caveat | `pattern`, `mimics` | Included acute edema can precede established border; no fixed timeline. Barakat single-case evidence labelled in ledger. |
| KI-08 | 122 / 121, contrast | supplementary | `pattern` | Included reactive rim may enhance; PDF's absolute nonenhancing core softened because Umans includes central enhancement in pediatric infarct. No routine contrast protocol implied. |
| KI-09 | 122 / 121, no periostitis/mass | essential caveat | `mimics`, embedded check, MCQ caution | Conflict recorded: typical uncomplicated pattern versus absolute source wording. Periostitis or soft-tissue abnormality prompts reassessment; cannot exclude infarct or coinfection by itself (Umans). |
| KI-10 | 123 / 122, enchondroma | essential | `mimics`, comparative schematic | Included serpiginous peripheral border versus lobulated very bright T2/chondroid mineralization. No sensitivity/specificity claimed. |
| KI-11 | 123 / 122, infection | essential | `mimics`, embedded check | Included clinical/lab and soft-tissue context as clues, not universal discriminators; coexistence possible (Umans). |
| KI-12 | 123 / 122, image collage rID 99068 | essential visual | `pattern`, two source radiographs | Four-panel collage inspected; original embedded frontal/lateral radiograph objects extracted unchanged. No sequence inferred from unlabeled MRI panels. User reuse authorization confirmed by coordinator; original contributor/external case matching remain unverified. |

## Visual plan and media ledger

| Task / destination | Media | Provenance / rights | Observed feature and selection rationale | Status |
| --- | --- | --- | --- | --- |
| Locate medullary infarct; hero | Original SVG schematic | Created for this lesson, no copied pixels; `public/educational/knocheninfarkt-schematic.svg` | Long-bone medullary silhouette with serpiginous border and retained center; translated alt explicitly schematic, not a diagnostic scan | Code inspected; browser render inspection blocked |
| Read actual radiographic distribution; pattern chapter | Two unchanged PDF image objects | `public/educational/knocheninfarkt/pdf-p123-Image1261.jpg` and `pdf-p123-Image1262.jpg`; provenance JSON adjacent. User PDF-image reuse authorization explicitly confirmed by coordinator | Frontal/lateral knee projections with extensive winding medullary sclerosis. Complete page and extracted originals visually inspected. Extensive example is labelled as such. No invented patient history, MRI sequence, contributor or authenticated external case match | Actual images inspected; rendered responsive layout pending |
| Recognize actual MRI signal pattern | Unused sagittal source MRI panels | PDF 123, rID 99068 printed in source; source sequence labels/contributor unavailable | Exact sequences and discrete double line not independently established, so not extracted or assigned guessed labels | VIS evidence blocker for complete MRI recognition teaching; do not give overall VIS PASS |

## Terminology and semantic checks

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Bone infarct | Knocheninfarkt | bone infarct | انفارکت استخوان |
| Location | Metaphyse / Diaphyse | metaphysis / diaphysis | متافیز / دیافیز |
| Serpiginous border | serpiginöser Rand | serpiginous border | حاشیه مارپیچی |
| Retained marrow | erhaltenes Fettmark | retained fatty marrow | مغز استخوان چرب حفظ‌شده |
| Periosteal response | Periostreaktion | periosteal reaction | واکنش پریوستئال |

Every authored prose unit, warning, caption, feedback and accessibility label uses the same DE/EN/FA data unit. The independent reviewer compared the semantic units, MCQs and feedback and found no consequential omission or answer-changing translation. Persian RTL and mixed-script display remain pending browser inspection.

## QA status (authoring, not acceptance)

`editorial_qa: independently_reviewed_draft_acceptance_blocked`; `scientific_review: pending`; `browser_qa: blocked`; `publication: not_requested`.

SRC: mapped declared scope with conflict ledger; clinical independent review pending.
EDU/LNG/ASM: four authored topic-specific chapters, embedded explanatory check in differential chapter, three MCQs (four options each, feedback for every wrong option) and three cards; exact single-ID curriculum/quiz/flashcard integration. No unrelated IDs marked covered.
VIS: actual radiograph teaching inspected; MRI recognition image remains unresolved; schematic is not a substitute.
UX: no browser claims. REV: separate read-only reviewer completed source/artifact review and independently reran both check commands; rechecked the source-orientation correction. See `knocheninfarkt-independent-review.md`. SRC/EDU/ASM/REV pass within declared/static scope; VIS/LNG-display/UX remain blocked by evidence. No unconditional acceptance.
No commit, push, publication, access-gate changes or complete-status assignment authorized/performed.

### Verification actually run

- `npm run audit:mcq`: PASS, 622 questions and 18 cases per language at time of run; valid options, answer IDs and option-specific explanations. The first run during authoring exposed three-option bank entries; corrected all nine localized entries to four options before rerunning.
- `npx tsx scripts/check-knocheninfarkt.mjs`: PASS, 75 localized semantic units present, exact curriculum and in-progress status, flashcard-to-lesson link, nine registered MCQs, three cards, DE-ID to EN/FA conversion, feedback key integrity, source fields/assets and esbuild JSX transform. Automated presence is not semantic/clinical acceptance.
- `git diff --check -- data/curriculum.js data/questions.js data/flashcards.js`: PASS (line-ending warning only for curriculum).
- Hero SVG rasterized with bundled Sharp and visually inspected: complete bone silhouette, medullary border/centre and conceptual magnification visible. This is asset-only inspection, not browser QA.
- Independent reviewer identified that the source PDF reflects its lateral radiograph object horizontally. Confirmed the negative-width placement matrix in the actual PDF content stream; the lesson applies CSS reflection only to the second image, preserving source-page orientation while leaving source bytes untouched. Frontal placement has a positive-width matrix. Browser rendering of this correction remains untested.
- Next dev server started on 127.0.0.1:3023. This only establishes startup, not route compilation or build success. No full production build claimed.
- Browser plugin/skill absent; attempted regular Playwright per frontend testing skill. Bundled Chromium executable missing; installed Edge headless exited with sandbox access errors. CUA in-app browser returned unavailable. Local HTTP request itself was refused with socket-permission error. No screenshots, DOM, console, authenticated access or viewport/theme/language matrix obtained. No product access gates changed.

### Required independent review / retests

Re-read PDF 122–123, both extracted radiographs and primary abstracts; compare all three language semantic units, MCQ keys and feedback. Review whether the limited radiographic example plus explicit MRI-image gap is acceptable as a draft; it is not ready for unconditional acceptance. Then run actual DE/EN/FA × 1440/390 × light/dark browser checks, 320/760 sampling, hash/reload/navigation/read/quiz/back links, keyboard/focus, image visibility and permitted persistence with authorized account. Confirm clinical approval separately.
