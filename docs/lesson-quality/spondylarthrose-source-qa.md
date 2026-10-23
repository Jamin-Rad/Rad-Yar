# Spondylarthrose: source/design/QA ledger

Date: 2026-10-19. One focused lesson. Worktree: `.worktrees/pdf-lessons-main`.
Route: `/wirbelsaeule/degenerative/spondylarthrose`; exact curriculum ID: `spondylarthrose`.

## Source selection before implementation

Inspected actual Wirbelsäule.pdf text pp4–10 and complete page renders pp7–10. Independent mapper inspected every original page4–10. Printed pagination = PDF minus one.

- p7 / printed6 contains the complete facet arthropathy text: structural CT findings, MRI activity-related findings and cyst/stenosis effects. No diagnostic images.
- p8 central stenosis already has a linked curriculum route. The foraminal stenosis subsection is only a heading plus placeholder.
- p9 listhesis and p10 ligament ossification are visibly almost blank, not OCR loss. They cannot support independent lessons from the PDF.
- `spondylarthrose` had no curriculum link and no focused route. Existing `/wirbelsaeule/degenerative` has a short facet chapter. This focused lesson deliberately overlaps the PDF's core facts but adds a dedicated modality/activity/space-effect learning task and retrieval exercise. Do not claim the topic was wholly absent; preserve the existing umbrella route/IDs and provide a related-learning link.
- A separate cyst lesson was rejected: p7 contains only two short cyst mentions, insufficient for a full cyst diagnostic/treatment lesson.

## Learning and visual plan, recorded before coding

Audience: radiology trainees familiar with basic spinal anatomy and MRI sequence names. Source language German; authored DE/EN/FA semantic units.

Goals: (1) identify which listed findings describe structural degeneration; (2) distinguish those from activity-related MRI findings; (3) describe the affected compartment when hypertrophy/cyst contributes to narrowing.

Four compact chapters: structural facet changes → MRI activity signs → secondary space effect with embedded self-check → four portable rules. Chapter titles derive from these tasks, not CAA default chapters.

One original code-native axial conceptual graphic depicts vertebral body, thecal compartment, paired facet regions and a juxtafacet protrusion toward the canal. Numbered relationships have translated legends/alt. It is not a diagnostic scan, not to scale, and does not establish MRI signal or etiology. Real MRI/CT recognition remains an evidence gap, explicitly not compensated by the diagram.

## Source coverage

| ID | Source PDF / printed | Importance | Destination | Disposition |
| --- | --- | --- | --- | --- |
| SA-01 | WS7 / 6, definition | essential | first chapter | Degenerative facet arthrosis; distinguish structural morphology from edema/effusion/synovitis signs. |
| SA-02 | WS7 / 6, clinical association | caveat | warning | PDF's “common cause” frequency not repeated as verified. Image finding alone does not establish the pain generator; primary community study supports caution. |
| SA-03 | WS7 / 6, CT | essential | structural table, MCQ1/card1 | Joint narrowing, subchondral sclerosis, osteophytes, vacuum and hypertrophy all included. No grading scale or threshold added. |
| SA-04 | WS7 / 6, CT limitation | essential | structural note | Conventional structural findings do not independently establish inflammatory activity; not a universal assertion about all CT methods. |
| SA-05 | WS7 / 6, T1 | essential | activity table | Low periarticular marrow signal when edema is present; not obligatory for all facet degeneration. |
| SA-06 | WS7 / 6, T2/STIR/TIRM | essential | activity table, card2 | Subchondral edema, joint effusion and periarticular soft-tissue hyperintensity included; no specificity/clinical-causation guarantee. MCQ2 instead tests the cyst's space effect (SA-09). |
| SA-07 | WS7 / 6, postcontrast T1 fat-sat | supplementary | activity table | Synovial/periarticular enhancement when such sequences were obtained; no routine contrast indication/protocol inferred. |
| SA-08 | WS7 / 6, hypertrophy/osteophytes/flavum | essential | effects table | Separate contributing structures; state observed neural/compartment effect rather than automatic stenosis from a feature name. |
| SA-09 | WS7 / 6, juxtafacet cyst | essential bounded item | effects + conceptual diagram/self-check; exact curriculum link, one localized MCQ and flashcard added 2026-10-23 | Can narrow recess/canal. No invented characteristic cyst signal, visible communication, differential or treatment. Separate ID remains source-bounded to possible space effect and reporting anatomy. |
| SA-10 | WS7 / 6, secondary central/foraminal stenosis | essential | effects | Name level/side/compartment; no new numeric cutoff or extension to full stenosis curriculum. |
| SA-11 | WS8 / 7, neural assessment | context only | summary | Narrowing and actual neural compromise must be distinguished; quantitative/myelopathy claims stay outside scope. |

## Clinical source check, separate from publication date

Access/verification date 2026-10-19. Primary abstracts only, no full-article verification claimed:

- Berg et al., 2019, PMID30796571, https://pubmed.ncbi.nlm.nih.gov/30796571/ : CT/MRI structural facet ratings in selected chronic-back-pain patients; reader agreement has limitations. Supports avoiding certainty from morphology. Search returned full indexed abstract; direct page fetch was sparse. No numerical study results imported into lesson.
- Kalichman et al., 2008, PMID18923337, https://pubmed.ncbi.nlm.nih.gov/18923337/ : community CT study did not find the assumed association of facet OA with low-back pain. Used only to avoid individual pain-causation claims, not to claim facets cannot hurt.

PDF7's “CT only morphology” is scoped to conventional structural findings. Its clinical frequency statement is not independently verified or repeated. No treatment or classification added.

## Media/provenance

`public/educational/spondylarthrose-schematic.svg` and adjacent provenance JSON: original code-native conceptual drawing. No reused scan/patient or Modic image; PDF p5's Modic case is not a facet case. Diagnosis, sequences and actual frame-recognition performance cannot be verified with the available source page.

The SVG was rasterized with bundled Sharp and visually inspected. Numbers1/2/3, posterior paired facet regions, anterior vertebral body and adjacent protrusion are visible without clipping. This verifies the asset alone, not its hero crop, mobile readability or medical diagnostic-image teaching value.

## Terminology and translation checks

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Facet degeneration | Spondylarthrose / Facettenarthrose | facet arthropathy | آرتروز فاست |
| Activity-related signs | Aktivitätszeichen | activity-related findings | نشانه‌های فعالیت |
| Marrow edema | Knochenmarködem | marrow oedema | ادم مغز استخوان |
| Joint effusion | Gelenkerguss | joint effusion | افیوژن مفصل |
| Space effect | Einengung / Bedrängung | narrowing / compromise | تنگی / فشار |
| Lateral recess | Rezessus | lateral recess | رِسِس جانبی |

DE/EN/FA use shared semantic objects for prose, table cells, alt, diagram explanation, self-check and bank feedback. No German fallback is used by this page. Presence checks are not semantic acceptance; independent translation review and RTL browser observation remain separate.

## Checks actually run

- `npm run audit:mcq`: PASS, 624 questions and 18 cases per language at author run; exactly four options and valid wrong-option feedback for all new questions.
- `npx tsx scripts/check-spondylarthrose.mjs`: PASS, 68 localized semantic units present; exact curriculum/status/flashcard route, six questions and two cards in global registries, DE-ID → EN/FA mapping, answer and feedback keys, asset/provenance presence, JSX transform. Explicitly checks that existing spinalkanalstenose umbrella link remains unchanged.
- `git diff --check -- data/curriculum.js data/questions.js data/flashcards.js`: PASS, curriculum line-ending warning only.
- No production build, local route/browser session, console/DOM screenshot or runtime interaction was completed for this lesson. No server started in this batch.

## QA status

`editorial_qa: independently_reviewed_draft_acceptance_blocked`; `scientific_review: pending`; `browser_qa: blocked`; `publication: not_requested`.

Independent author/reviewer roles preserved. Read-only reviewer completed source/semantic/assessment/graphic review, independently reran both checks, and performed bounded re-review after corrections. SRC/EDU/ASM/REV PASS within declared/static scope; VIS/LNG-display/UX remain BLOCKED. See `spondylarthrose-independent-review.md` for actual scope and retests. Browser limitations from the immediately preceding Knocheninfarkt batch remain unresolved (Chromium binary missing, Edge sandbox access failure, CUA IAB unavailable, loopback socket denied). They are recorded as prior observed environmental blockers, not new checks or screenshots for this route. No access gate changes and no claimed browser/build pass.

Review cycle: SA-SRC-001 minor ledger destination corrected (activity → table/card2; MCQ2 → cyst space effect) and independently rechecked. Author-detected duplicate MCQ chapter-key risk fixed by merging spondylarthrose into the existing `wirbelsaeule/ws-degenerativ` group alongside preserved spinalkanalstenose; scoped checker asserts uniqueness, reviewer retest PASS. No clinical content repairs required. No unconditional acceptance.

### Exact curriculum integration for the bounded cyst item (23.10.2026)

`synovialzyste-facettengelenke` now deep-links to `#space`, retrieves its own DE/EN/FA four-option MCQ and has one separately registered flashcard topic. The item remains limited to the source's possible canal/recess narrowing; its assessment asks for actual level, side, spatial relation and visible neural effect. After independent review, distractors were revised to plausible partial reporting descriptions and the checker now bounds option-length imbalance to <1.25 in all three languages. The MCQ return target preserves `/wirbelsaeule/degenerative/spondylarthrose#space`, and the focused checker verifies the decoded path. `node --import tsx scripts/check-spondylarthrose.mjs`, `npm run audit:mcq` (787 questions and 18 cases per language) and `git diff --check` pass. SRC/EDU/ASM/REV pass for this bounded static addition; diagnostic media, browser/RTL and Dr. Zia's clinical approval remain open. See the [independent delta review](spondylarthrose-independent-review.md#independent-bounded-delta-review--juxtafacet-cyst-2026-10-23).

Required next evidence: independent source/semantic/assessment review, suitable inspected CT/fluid-sensitive MRI teaching frames with exact sequence/level/side and provenance, DE/EN/FA × 1440/390 × light/dark plus 320/760 samples, hash/reload/accordion/read/quiz/back links, keyboard/focus and permitted persistence. Scientific approval by Dr. Zia remains separate. No complete flag, staging, commit, push or publication.
