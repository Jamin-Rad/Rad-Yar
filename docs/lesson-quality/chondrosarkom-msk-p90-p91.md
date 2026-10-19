# Chondrosarkom — source and QA ledger

## Lesson contract

- Route / curriculum ID: `/msk/tumoren/chondrosarkom` / `chondrosarkom`.
- Audience: radiology learners who know basic bone-lesion description.
- Learning promise: combine chondroid matrix, bone response and MRI morphology while avoiding a diagnosis from one sign.
- Language base: German source notes in MSK.pdf; authored semantically in DE/EN/FA.
- Chapter plan: first pattern and limits; modality roles; one attributed case with a retrieval check; three take-home points.
- Media plan: topic-specific conceptual SVG in the shared hero; cropped real case panel from PDF p. 91 (Radiopaedia rID 6171) with explicit caption and attribution.

## Source coverage

| ID | Source | Point | Priority | Lesson location | Status / rationale |
|---|---|---|---|---|---|
| CHS-01 | MSK.pdf PDF p. 90 (printed 89) | Usually middle/older age, stated as >40–50 years | Context | — | Omitted: not needed for the imaging promise and no range was independently checked. |
| CHS-02 | MSK.pdf PDF p. 90 | Primary de novo and secondary arising in a pre-existing lesion | Context | `pattern` | Included with limited wording; no complete subtype classification. |
| CHS-03 | MSK.pdf PDF p. 90 | Slowly increasing deep pain, sometimes night pain; swelling and pathological fracture possible | Context | — | Deferred: clinical symptoms are not needed to teach this imaging pattern. |
| CHS-04 | MSK.pdf PDF p. 90 | Chondroid “popcorn” or rings-and-arcs mineralisation | Essential | `pattern`, modality comparison | Included; explicitly described as matrix pattern, not a stand-alone diagnosis. |
| CHS-05 | MSK.pdf PDF p. 90 | Permeative destruction | Essential | `pattern` | Included as an aggressive-behaviour warning, not entity-specific. |
| CHS-06 | MSK.pdf PDF p. 90; Murphey et al., Radiographics 1998, PMID 9747616 | Endosteal scalloping; deep scalloping involving >2/3 of normal cortical thickness is a warning sign | Essential caveat | `pattern` | Included after checking the comparative study (92 enchondromas, 95 chondrosarcomas). Wording says it raises suspicion, especially alongside other findings, and cannot diagnose alone. No management claim is inferred. |
| CHS-07 | MSK.pdf PDF p. 90 | High T2 signal, lobulated morphology, septal/peripheral enhancement | Essential | `modalities` | Included as source-described MRI characteristics; no sequence sign is called definitive. |
| CHS-08 | MSK.pdf PDF p. 91 | Proximal femur case: intramedullary lesion, endosteal scalloping, chondroid calcification; caption reports no periosteal reaction or extraosseous mass | Essential visual | `case` | Included as observations in this case only; absence is expressly not presented as an exclusion criterion. Image labels STIR/T1/T2 retained from source. |

## Media provenance

- Hero SVG is a conceptual schematic: no patient imaging and no diagnostic assertion.
- Case panel was cropped from the user-provided MSK.pdf p. 91. Source figure gives `rID:6171`; Radiopaedia case is Frank Gaillard, *Chondrosarcoma – proximal femur*, DOI `10.53347/rID-6171`. The PDF/rID case attribution identifies the contributor and case; the image is marked CC BY-NC-SA 3.0 by a secondary index (accessed 2026-10-20). The crop is a modification and attribution/license are visible in the lesson sources. The Radiopaedia case page itself returned HTTP 402 during this review, so its current disclosure and exact license text were not independently checked. Use is within the user's explicit instruction that supplied PDF images are licensed for this project.
- Figure alt describes modality, anatomy, and the visible feature; caption separates this case's observations from disease-wide criteria.

## QA status

- Source pages inspected as rendered images and extracted text; printed and PDF page numbering recorded.
- Automated SSR/localization check: run with `node scripts/test-chondrosarkom-render.mjs` (result recorded after implementation).
- Independent review: pending.
- Browser QA (desktop/mobile, theme, RTL interaction), runtime/build, and clinical review: pending.
- Scientific claims about treatment, biopsy, and grading are outside this lesson. The scalloping threshold is cited as a comparative imaging warning sign, not an isolated diagnosis. This draft is not clinical release approval.
