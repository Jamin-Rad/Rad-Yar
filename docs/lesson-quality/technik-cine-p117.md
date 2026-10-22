# CINE-MRT — Technik.pdf p.117 (printed p.116)

Bounded addition to `/technik/grundlagen#mrt-spezial`; exact curriculum ID: `mrt-cine`. The page was visually inspected from the supplied PDF. It is text-only; it has no diagnostic patient image.

## Learning purpose and outline

Expected outcome: describe what a time-resolved CINE sequence can show and distinguish motion depiction from quantitative flow measurement.

1. **“CINE: Bewegungsphasen als Film”** — explain repeated time-resolved acquisition across a cardiac or respiratory cycle and interpret the frames as a motion sequence.
2. **Paired instructional contrast and registered retrieval** — follow wall/valve motion and ventricular volume change; identify phase-contrast methods as the route for quantitative velocity/flow rather than assuming every CINE display measures it. A separate localized MCQ and two flashcards are linked from the subsection.

An original code-native SVG shows the same abstract outline at three time points. It is a conceptual schematic, not anatomy, patient data or diagnostic evidence.

## Source coverage ledger

| ID | Source point | Priority | Lesson destination | Disposition |
|---|---|---|---|---|
| CINE-117-01 | Dynamic MRI depicts motion as a film | Core | CINE subsection and SVG | Included as a time-resolved sequence; SVG is explicitly conceptual |
| CINE-117-02 | Repeated rapid signal acquisition over cardiac or respiratory cycle | Core | CINE subsection | Included without specifying a gating/acquisition protocol |
| CINE-117-03 | Cardiac wall motion and valve function | Core | CINE subsection and MCQ | Included as observable motion; no disease or protocol claims added |
| CINE-117-04 | Ejection fraction | Core | CINE subsection and flashcard | Included as a functional measure supported by cine-derived ventricular volumes per SCMR reporting guideline |
| CINE-117-05 | Vessel pulsation / flow dynamics | Context | CINE subsection | Retained as a source-listed use, carefully distinguished from quantitative velocity/flow measurement |
| CINE-117-FIG | No diagnostic figure on p.117 | Visual | New conceptual SVG | No patient image inferred or reused |

## Assessment and terminology

One localized four-option MCQ under exact tag `mrt-cine` and two localized retrieval flashcards are registered. The assessment tests (a) the motion/volume role of CINE and (b) the boundary between general motion display and quantitative phase-contrast flow. Terminology: `CINE-MRT | Cine MRI | MRI سینمایی (CINE)`; `Phasenkontrast | phase contrast | phase-contrast`.

## Supporting source

- Hundley WG et al. *Society for Cardiovascular Magnetic Resonance (SCMR) guidelines for reporting cardiovascular magnetic resonance examinations.* J Cardiovasc Magn Reson. 2022;24:29. doi:10.1186/s12968-021-00827-z. [Open-access full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC9052489/). Used to support cine reporting for ventricular volumes, ejection fraction and wall motion, and to distinguish quantitative flow reporting.

## QA state

- Source page: visually inspected; no patient image.
- Focused registration/localization test: PASS via `node --import tsx scripts/test-technik-cine-assessment.mjs`.
- Independent review: delta re-review passed; the ledger and discoverability findings are closed. Rendered browser/RTL UX remains blocked because the local browser port refused connection.
- Global `npm run audit:mcq`: PASS (761 questions and 18 cases per language). `git diff --check`: PASS. Browser rendering and RTL interaction: blocked because localhost:3011 refused connection. Clinical specialist approval and publication: pending; do not infer these from the route, curriculum link or test pass.
