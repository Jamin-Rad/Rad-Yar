# Frakturbeschreibung: bounded source update

Date: 2026-10-19. Author role: delegated lesson author. Route: `/msk/trauma/frakturbeschreibung`; exact existing route verified in `app/msk/trauma/frakturbeschreibung/page.js`. Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF pages 2–3 (printed 1–2), German. Text read from `tmp/MSK-pages.txt`; complete page images rendered at 1800 px and visually inspected before editing. These pages contain text, no diagnostic patient images.

## Authoring plan and scope

The first open source match in the current MSK progress matrix is fracture description. This update covers mechanism and morphology, not all fracture classifications or the entire MSK PDF. Audience: radiology trainees. Outcome: distinguish load/bone-quality mechanisms and name line, fragment and compression/traction patterns without inferring stability from a shape alone.

Observable goals: (1) distinguish fatigue from insufficiency and a focal pathological lesion; (2) separate transverse/oblique/spiral and segmental/wedge patterns; (3) separate surface depression, cancellous collapse and impaction; (4) recognise an avulsion attachment and apply one distinction in an embedded self-check.

Keep existing chapter IDs and assessment IDs. Use concrete navigation titles. Add an original code-native A–D morphology comparison plus a translated interpretation task, separate depression/compression table entries, and a short attachment example note. Correct Persian `Translation` everywhere in the local lesson and its exported MCQ/cards to `جابه‌جایی انتقالی`.

The existing broader reporting/imaging/joint sections remain supplementary legacy content. They were read for connected changes but are not verified against these two PDF pages. Their scientific claims require separate review. Preserve the existing route/access policy and global navigation.

## Page trace and reconciliation

| ID | PDF page | Source point | Treatment / target |
| --- | --- | --- | --- |
| FD-01 | 2 | Direct force on healthy bone at impact; blow/gunshot/collision | Retained in `entstehung.rows[0]`; examples included. |
| FD-02 | 2 | Indirect lever/rotation/compression/traction, fracture remote from force | Retained in `entstehung.rows[1]`. |
| FD-03 | 2 | Fatigue: repeated overload of normal bone; march fracture | Retained in `entstehung.rows[2]` and matching fatigue/insufficiency question/card. |
| FD-04 | 2 | Insufficiency: normal load on weakened bone; osteoporosis/Paget/radiation | Retained in `entstehung.rows[3]`. |
| FD-05 | 2 | Pathological: focal cortical destruction; metastasis/plasmacytoma/cyst/osteomyelitis; source groups under insufficiency | Local focal-lesion description retained in row 4. Source grouping recorded here; no claim that this is the only taxonomy. |
| FD-06 | 3 | Fissure, transverse, oblique, spiral definitions | Retained in `morphologie.rows[0..3]`; schematic A/B and existing spiral MCQ. Mechanism as clue, never proof of stability. |
| FD-07 | 3 | Segmental: two independent lines isolating a segment | Retained row 5; schematic C, existing segmental MCQ/card. |
| FD-08 | 3 | Third bending wedge fragment | Retained row 4; no general stable/unstable deduction. |
| FD-09 | 3 | Source defines comminution as >6 fragments | **Unresolved source discrepancy:** do not teach this as a universal threshold. Existing descriptive multifragmentary wording retained. AO primary reference uses patterns including wedge comminution without this universal threshold; see sources below. Dr. Zia review required. |
| FD-10 | 3 | Impression: depressed surface; skull/tibial plateau | Split into a distinct row. |
| FD-11 | 3 | Compression: cancellous collapse; vertebral body | Split into a distinct row. |
| FD-12 | 3 | Impaction: interlocked ends; source says often stable, e.g. femoral neck | Definition retained, stability explicitly context-dependent. AO impacted humeral example supports possible stability only in its defined setting; do not generalise to every site. |
| FD-13 | 3 | Avulsion: tendon/ligament traction | Retained row; schematic D and new applied self-check. |
| FD-14 | 3 | Avulsion sites: MT V base, tibial tuberosity/patellar tendon, superior patella/quadriceps, lesser trochanter/iliopsoas, proximal phalanx first ray | All five retained in a concise source example note. Last source item lacks side/attachment; do not invent a specific collateral ligament or thumb/toe identity. |

Primary sources checked 2026-10-19 (these corroborate limited statements, not full scientific acceptance):

- [AO Surgery Reference: thumb multifragmentary fracture](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/thumb/proximal-phalanx-base-and-shaft-multifragmentary/definition): describes small-fragment and wedge comminution; supports recording the PDF's numeric threshold as unresolved rather than a general definition.
- [AO Surgery Reference: impacted two-part surgical-neck fracture](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/proximal-humerus/extraarticular-2-part-surgical-neck-impaction/definition): stability described for a specific impacted humeral pattern, with further assessment when uncertain; does not establish a universal stability rule for all impacted fractures.

## Visual and language plan

Original asset `public/educational/fracture-morphology-comparison.svg`: four simplified long-bone outlines, A transverse, B oblique, C segmental, D avulsion with traction arrow. An explanatory schematic, not a diagnostic radiograph; all interpretation and alt text translated in the lesson. No patient-image reuse or external asset rights asserted. It replaces the lesson's legacy morphology image; other routes remain untouched.

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| displacement without rotation | Translation | translation | جابه‌جایی انتقالی |
| depressed surface | Impression | depression | فرورفتگی سطح |
| cancellous collapse | Kompression | compression | فروریزش استخوان اسفنجی |
| interlocked ends | Impaktion | impaction | درهم‌رفتگی انتهای شکستگی |
| attachment avulsion | Avulsion | avulsion | کندگی |

## QA ledger

Implementation completed for the bounded scope above. This is an author ledger, not independent acceptance.

Actual files changed:

- `data/frakturbeschreibung.js`: concrete source chapter titles, load/bone-quality lead, morphology caveat, separate impression/compression rows, context-dependent impaction stability wording, attachment note, translated image explanation and three-choice applied self-check; corrected Persian translation terminology in lesson and affected assessment/card text.
- `app/msk/trauma/frakturbeschreibung/page.js`: renders the translated diagram explanation, attachment note and self-check with selectable answers, `aria-pressed` and `aria-live` explanatory feedback. Existing shell/access logic retained.
- `public/educational/fracture-morphology-comparison.svg`: original educational A–D comparison, not a patient image.
- `public/educational/fracture-morphology-comparison.provenance.json`: authoring method, PDF concept source, no external image reuse, localization contract and limitations.
- This ledger. No curriculum/status/registry edits; no commit or push.

Verification performed:

- Full source page 2 and 3 PNGs viewed; reading order matches extracted text. No source patient image to reuse.
- Data JavaScript and route JSX parsed with installed Next Babel parser: pass.
- Static scan of 237 localised units found DE/EN/FA string keys present. This tests structural presence, not clinical translation correctness.
- Export validation: 12 questions per language, 15 flashcards; question IDs unique, four options each and existing correct key valid; embedded self-check has three options and three explanatory feedback units with valid answer index 1.
- Original SVG rasterised using installed Sharp and visually inspected: four visible panels, line orientation and separate segment readable; D uses an attachment fragment with traction arrow. Final browser sizing remains unverified.
- `git diff --check` on the two tracked changed files passed.
- No repository build or browser session run by this author. No local development listener was found on ports 3000–3002 at this check. Parent coordinator may add later browser/build evidence.

| Gate | Author finding | Scope / remaining evidence |
| --- | --- | --- |
| SRC | BLOCKED for whole-lesson acceptance | PDF pp2–3 mapped; numeric >6-fragment source statement remains explicitly unresolved and is not propagated as a universal rule. Source's general stability wording is qualified. Broader legacy imaging/joint/report statements have not undergone clinical verification in this bounded update. |
| EDU | PASS for changed source sections only | Distinctions made explicit without new repetitive chapters; applied avulsion self-check added. Independent editorial acceptance pending. |
| VIS | PASS for original diagram as an author check | SVG raster inspected, translated interpretation task supplied; not a diagnostic case or substitute for future image-recognition examples. Actual page/mobile rendering pending. |
| LNG | PASS for changed strings as author review | DE/EN/FA semantic units supplied; 237-unit structural scan passed, Persian mistranslation corrected throughout local exported content. Rendered RTL not checked. |
| ASM | BLOCKED for whole-bank clinical acceptance | Shape and IDs checked, changed Persian term consistent. Existing bank has all 12 correct answers in position A and includes legacy supplementary imaging/joint facts outside pp2–3; distractor quality and scientific verification are not fully reviewed. |
| UX | REVISE | Existing legacy header lacks the required LessonHero and has introductory prose under the heading; multiple chapters can open independently, with all initially collapsed and no synchronised hash opening. This update does not claim shell-standard compliance. Browser matrix/keyboard/focus/zoom-modal checks remain pending. |
| REV | BLOCKED | Independent reviewer has not inspected this bounded update yet. |

Stable remaining findings:

| ID | Severity | Location / evidence | Learner impact / required follow-up |
| --- | --- | --- | --- |
| FD-SRC-01 | Major evidence blocker | PDF p3: >6 fragments; `morphologie.rows` descriptive comminution retained | Dr. Zia to reconcile source terminology; do not turn numeric source claim into an MCQ rule. |
| FD-UX-01 | Major | Existing route header and `Section` local state | Bring full route to maintained lesson shell, then test hash, one-open chapter and explicit progress; separate from this limited content update. |
| FD-ASM-01 | Minor editorial plus evidence blocker | Existing 12 exported MCQs, all correct A | Review distractor quality and vary correct positions in a later controlled bank review; clinical correctness of supplementary questions still pending. |

## Checkout correction and independent-review repair

The initial authoring was mistakenly performed in primary checkout `C:/Users/Drham/Documents/GitHub/Rad-Yar`, branch `main`, base `dc00db033facd52a1381cee6426f8b883b49adf2`. The coordinator/reviewer was using another checkout, so their lesson correctly still resolved to the legacy German-labelled `/frakturbeschreibung/frakturmorphologie.png`. The author's earlier SVG report described files that had not reached the review checkout. This was an integration error, not evidence that the reviewer had inspected the new asset.

On repair, the author stopped writing to the primary checkout. The two destination lesson files were verified byte-equivalent after newline normalization to the expected original base before porting. Then only the bounded lesson, original SVG and this ledger were ported to `C:/Users/Drham/Documents/GitHub/Rad-Yar/.worktrees/pdf-lessons-main`, branch `codex/pdf-lessons-main`, checked HEAD `a5f8a1b6626b066808ef627e90e6500ce39d01e6`. No unrelated primary dirty files were copied. One provenance sidecar was additionally created in this target checkout.

Both inline and enlarged views now render `MorphologyLegend`: four panel names, explanatory alt and attribution from DE/EN/FA data. The SVG's only visible text is the neutral identifiers A–D, so no German anatomy or fracture names are baked into EN/FA images. The old raster remains in the repository for preservation but is not referenced by the affected lesson.

| Repair | Evidence in actual target checkout | Status |
| --- | --- | --- |
| German-labelled visual in EN/FA | Data points to original SVG, no legacy raster reference; SVG visible-text extraction gives exactly A/B/C/D; four translated panel entries; legend rendered twice, inline and zoom | Author static repair PASS; independent/browser retest pending |
| Missing asset provenance | Adjacent provenance JSON records original code-native creation, Dr. Zia MSK PDF p3 concept source, no patient or third-party image reuse; translated on-page source credit | Author static repair PASS; independent retest pending |
| Accidental wrong-checkout delivery | Expected-base comparison passed before port; scoped target files verified on `codex/pdf-lessons-main` | Corrected; primary checkout not modified further |

Target checks after repair: Next Babel parser accepted data and JSX; 242 localised string units structurally complete; 12 MCQ IDs per language and 15 flashcard IDs exactly match target HEAD; provenance JSON parsed; `git diff --check` passed. The standalone SVG had previously been rasterised and visually inspected; no geometry changed during the target port. No browser pass, build pass or final scientific approval is asserted by this repair.

`editorial_qa`: author changes checked; independent pending. `scientific_review`: pending Dr. Zia. `browser_qa`: pending. `publication`: not requested/performed. No `complete` status changed.

## MSK.pdf p.4 (printed p.3): source figure morphology addendum

The complete page image was rendered from `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF page 4, at 160 dpi and visually inspected. The page contains one labelled figure and no accompanying prose definition. Its twelve visible labels are: Fissur, Querfraktur, Schrägfraktur, Schrägfraktur mit Biegungskeil, Spiralfraktur, Stauchungsfraktur, Stückfraktur (Zweietagenfraktur), Trümmerfraktur, Impressionsfraktur, Meißelfraktur, Abrissfraktur (Avulsionsfraktur), Kompressionsfraktur.

Coverage reconciliation: the existing lesson table already covers nine source labels (fissure, transverse, oblique, spiral, segmental/two-level, comminuted, impression, compression and avulsion). Its separate Biegungskeil row explains a component of the source's combined fourth label, but does not itself count as another label. The figure adds three labels not previously explicit in the lesson: Stauchungsfraktur, Meißelfraktur, and the combined pattern Schrägfraktur mit Biegungskeil. The first is kept distinct from the existing Impaktion row: the image depicts a locally crushed multifragmentary shaft zone, while the lesson reserves impaction for fracture ends driven/interlocked together. The source figure alone does not define Stauchung as impaction. Meißelfraktur is preserved as the PDF's term; because the page supplies no text definition, the lesson limits the explanation to the visible periarticular knee-fragment pattern and tells learners to report exact location and fragment relation rather than infer an unprovided classification. The combined oblique-plus-wedge row explicitly names both features.

The localized DE/EN/FA lesson displays a crop of the actual source figure, a translated description and a concise three-row table. The crop is `public/educational/msk-fracture-morphologies-p4.png`, extracted from the PDF page image and retaining the source's German labels; on-page alt text and attribution identify the source, PDF page 4 / printed page 3, and the crop. No patient image is present on this page.

| ID | Source point | Treatment |
| --- | --- | --- |
| FD-P4-01 | PDF p.4 / printed p.3 labels Fissur, Querfraktur, Schrägfraktur, Spiralfraktur | Already covered by rows 1–4 of the existing morphology table. |
| FD-P4-02 | Schrägfraktur mit Biegungskeil | Added as a distinct combined pattern: oblique line plus additional bending wedge; links to already-covered line and wedge terms. |
| FD-P4-03 | Stauchungsfraktur | Added from the visible crushed/multifragmentary shaft depiction; explicitly not treated as synonymous with Impaktion. The PDF page offers no text definition. |
| FD-P4-04 | Stückfraktur (Zweietagenfraktur), Trümmerfraktur | Already covered by segmental and comminuted rows. Source's exact numeric fragment-count rule remains unresolved per FD-09 and is not introduced. |
| FD-P4-05 | Impressionsfraktur, Kompressionsfraktur | Already covered as separate existing rows. |
| FD-P4-06 | Meißelfraktur | Added with the source term and only the visible periarticular knee-fragment description; no unsupported classification definition inferred. |
| FD-P4-07 | Abrissfraktur (Avulsionsfraktur) | Already covered in the avulsion row and source attachment examples. |

The cropped figure is a source excerpt, not a new diagnostic case and not an independently generated diagram. Technical review, exact route SSR, independent image review and browser rendering are tracked separately; no clinical approval or publication status is inferred.
