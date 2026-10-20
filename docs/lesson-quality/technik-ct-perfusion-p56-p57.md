# CT perfusion — Technik.pdf pp.56–57

## Scope and source inspection

- Source: `Technik.pdf`, PDF p.56 (printed p.55) and PDF p.57 (printed p.56).
- Both pages were visually rendered and read. The page images and text have been considered together; the source does not provide a clearly attributed patient case suitable for teaching as a diagnostic example.
- The existing CT chapter retains the concise overview block. The curriculum opens a focused lesson at `/technik/ct-perfusion`, with a topic-specific CT-perfusion hero.
- Learning aim: explain why CT perfusion uses repeated acquisition during a contrast bolus, distinguish CBF/CBV/MTT/TTP, and recognize that map patterns are model-dependent and require contextual interpretation.

## Coverage ledger

| PDF page | Source point | Status and destination |
|---|---|---|
| 56 (printed 55) | Functional imaging of regional tissue perfusion | Added to `CT_PERFUSION_BLOCK` as repeated dynamic images after an iodinated bolus. |
| 56 | Regular sampling over about 30–60 seconds | Included as the PDF’s description, explicitly not a universal protocol or injection recommendation. |
| 56 | Time-density curves are processed into perfusion maps | Taught as a conceptual input-to-model relationship; the diagram is newly authored and contains no patient data or quantitative values. |
| 56 | CBF, CBV, MTT, TTP definitions | Added to the localized parameter row and retrieval checks; definitions are cross-checked against the ACR–ASNR–SPR practice parameter. |
| 56 | Simplified stroke core pattern: reduced CBF and CBV | Included as a source-attributed simplified pattern, without thresholds or treatment eligibility claims. |
| 56 | Threatened/penumbral tissue: reduced CBF with preserved or increased CBV may occur | Included with the same qualification; explicitly not a standalone therapy decision. |
| 56 | Perfusion contributes to acute stroke assessment and therapy decisions | The lesson states that maps are supportive/contextual; it does not prescribe treatment selection. Current AHA/ASA criteria are outside this technical teaching block. |
| 57 | Tumour angiogenesis and often hyperdynamic perfusion; CBF/CBV may rise | Summarized in the applications row as an imaging question, not as a diagnostic rule. |
| 57 | Therapy response; declining perfusion during successful treatment; recurrence versus necrosis | Added with an explicit caveat that perfusion alone proves neither progression nor necrosis nor treatment effect. |
| 57 | Cardiac and pulmonary perfusion listed | Mentioned only as application areas; no organ-specific technique or diagnostic interpretation is inferred. |
| 57 | Momentary hemodynamic state and dependence on cardiac output / arterial pressure | Added to the limitations callout; low pressure can confound apparent perfusion. |
| 57 | High injection flow and contrast-bolus quality | Not converted into an instruction: exact injection rate is protocol-specific and requires current local technical review. |
| 57 | Repeat scanning adds exposure relative to standard CT | Added qualitatively; no dose ratio or protocol recommendation is invented. |

## Outline and visual plan

The block follows acquisition → time-density curve → parameter meaning → simplified tissue pattern → clinical application and limits. The focused page uses the shared lesson shell and a topic-specific hero, avoiding the generic Technik-Grundlagen hero for this curriculum destination. The concept diagram compares a narrow early arterial input curve with a broader delayed tissue curve. It is a language-neutral, code-native schematic with translated axes, legend, alt text, and caption. Neither visual is a diagnostic image; no case attribution is implied. The visual group has a concise translated label distinct from the image alt and caption.

## Independent technical source and limits

The [ACR–ASNR–SPR Practice Parameter for CT Perfusion in Neuroradiologic Imaging (Revised 2022)](https://www.acr.org/-/media/ACR/Files/Practice-Parameters/ct-perfusion.pdf) is the official technical reference for parameter definitions and contextual map interpretation. The source PDF's 5–7 mL/s injection rate is explicitly deferred pending local scanner and protocol review; it is not taught as a prescription. The source PDF remains the primary guide to content coverage. Proprietary thresholds and current stroke treatment criteria are outside this technical block.

## Verification still required

This is a bounded addition, not proof that all of Technik.pdf or the entire `/technik/grundlagen` route is complete. The source-specific MCQ and two flashcards are linked to the focused route, and distractors use plausible CBF/CBV and MTT/TTP definition swaps. The focused route provides visible quiz and flashcard actions that return to the localized lesson. `node --import tsx scripts/test-technik-ct-perfusion-render.mjs`, `npm run audit:mcq` (656 questions), JSX esbuild for the focused route, `node --check` on edited lesson data and `git diff --check` passed. The rendering test covers the Grundlagen block and focused route in DE/EN/FA, including Persian RTL, localized PDF provenance, and action URLs; browser visual review remains open. Specialist scientific approval is not claimed.
