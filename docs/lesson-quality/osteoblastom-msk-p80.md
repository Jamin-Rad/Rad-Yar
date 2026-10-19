# Osteoblastom — bounded lesson record

**Scope:** MSK.pdf, PDF p. 80 (printed p. 79), source page identifier rID 85114. This is a one-page micro-lesson for the existing curriculum topic `osteoblastom`; it does not imply coverage of treatment, pathology, staging or the remainder of the chapter.

**Learning aim:** Recognize the source-described osteoblastoma pattern, distinguish its broad clues from osteoid osteoma, and avoid interpreting surrounding MRI oedema as proof of malignancy.

**Chapter plan:** (1) profile and symptom pattern; (2) radiograph/CT and MRI findings with the supplied spinal CT pair; (3) source-bounded comparison with osteoid osteoma; embedded retrieval question; three take-home rules. A standalone report chapter is not warranted by this one-page source.

## Source coverage

| Point | Source | Importance | Lesson location | Status / limitation |
| --- | --- | --- | --- | --- |
| Benign but locally aggressive growth | MSK.pdf p.80 | Essential | `profile` | Included; source wording retained |
| >2 cm distinction from osteoid osteoma | MSK.pdf p.80 | Essential | `profile`, `compare`, retrieval context | Included as the PDF's defining clue, explicitly not an absolute biological boundary or stand-alone proof; threshold variation noted from review literature |
| Typical age 10–30; male predominance | MSK.pdf p.80 | Context | `profile` | Included without treating demographic pattern as exclusion rule |
| Approx. 40% spinal location, posterior elements; otherwise long bones | MSK.pdf p.80 | Essential | `profile` | Included with approximate qualifier |
| Chronic dull localized pain; usually no classic aspirin/salicylate response and no night pain | MSK.pdf p.80 | Essential | `profile`, `compare` | Included with “usually” qualifier; not a treatment recommendation |
| Well-circumscribed osteolytic lesion; variable matrix calcification; thin reactive rim | MSK.pdf p.80 | Essential | `imaging` | Included |
| Expansion may occur; true periosteal response uncommon except fracture | MSK.pdf p.80 | Essential caveat | `imaging` | Included with PDF attribution |
| T1 hypointense, T2 hyperintense with signal varying by calcification | MSK.pdf p.80 | Essential | `imaging` | Included |
| Marked marrow and soft-tissue oedema (“flare phenomenon”) may overstate aggressiveness | MSK.pdf p.80 | Essential caveat | `imaging`, retrieval, summary | Included; retrieval explains lesion-versus-reaction distinction |
| Spinal CT example | MSK.pdf p.80, rID 85114 | Visual evidence | `imaging` | Cropped paired CT views included under user permission; exact sequences/case details beyond the page are not inferred; external contributor/licence not independently identified |

## Visual plan and terminology

| Teaching purpose | Media | Asset and interpretation | Status |
| --- | --- | --- | --- |
| Orient the learner to an expansile lesion, a reactive rim and surrounding reaction | Non-diagnostic code-drawn schematic | `public/educational/osteoblastom/hero.svg`; concept only, not patient imaging or a diagnostic sign | Implemented; check rendered alt text in DE/EN/FA |
| Show the PDF's spinal location example | User-supplied CT pair crop | `public/educational/osteoblastom/pdf-case-p80.jpg`; caption says only what the source page supports | Visually inspected against p.80; provenance recorded |

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Locally aggressive | lokal aggressiv | locally aggressive | تهاجمی موضعی |
| Posterior elements | Hinterelemente | posterior elements | عناصر خلفی |
| Reactive rim | reaktiver Knochenrand | reactive bony rim | حاشیهٔ استخوانی واکنشی |
| Matrix mineralization | Matrixverkalkung | matrix mineralization | کلسیفیکاسیون ماتریکس |
| Flare phenomenon | Flare-Phänomen | flare phenomenon | پدیدهٔ flare |
| Bone-marrow oedema | Knochenmarködem | bone-marrow oedema | ادم مغز استخوان |

## Validation and review status

- `node scripts/test-msk-osteoblastom-render.mjs`: PASS (SSR coverage for DE/EN/FA, RTL, source scope, source figure, schematic and unselected retrieval answers).
- `git diff --check`: PASS for this lesson's files.
- Independent source/content/image/language review and distractor delta: PASS; route connected and asserted in render test.
- Browser/device/theme/interaction evidence: pending (the route is sign-in gated in this environment).
- Clinician review and Dr. Zia scientific approval: pending.
- Release/publication approval: not asserted.

## Sources for the bounded comparison

- Supplied MSK.pdf p.80 is the coverage source.
- Klein et al., “Benign bone-forming lesions: osteoma, osteoid osteoma, and osteoblastoma,” *Radiology* 1994;190(1):227–235, [PubMed 8272884](https://pubmed.ncbi.nlm.nih.gov/8272884/).
- Lee et al., “Revisiting the WHO classification system of bone tumours: emphasis on advanced magnetic resonance imaging sequences. Part 2,” *Skeletal Radiology* 2020, [PMC7509892](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509892/). Used only to qualify tumour classification and avoid presenting size as a rigid biological boundary.
- Independent review found the initial retrieval distractors implausibly absolute; after revision, the independent corrective delta passed across DE/EN/FA.
