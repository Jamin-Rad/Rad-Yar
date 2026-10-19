# Einseitige Nasennebenhöhlenverschattung — bounded lesson record

**Scope:** Gehirn.pdf, PDF p. 89 (printed p. 88). The page lists five differential diagnoses and gives an expanded inverted-papilloma profile, plus a protocol-unspecified dose comparison. No patient scan is included. Proposed route: `/gehirn/hals-nnh/einseitige-verschattung`.

**Learning aim:** Use only the source-listed CT/MRI and dental/bone clues to compare the named causes of unilateral sinus opacification, recognize the inverted-papilloma pattern, and keep imaging clues separate from confirmed diagnosis.

**Chapter plan:** (1) five source-listed differential patterns; (2) the expanded inverted-papilloma profile and limits of imaging clues; (3) the source's dose figures with protocol caveat; embedded retrieval check; three take-home rules. A separate report chapter is not warranted by the one-page source.

## Source coverage

| Point | Source | Importance | Lesson location | Status / qualification |
| --- | --- | --- | --- | --- |
| Unilateral NNH opacification and differential | Gehirn.pdf p.89 | Essential orientation | `differential` | Included as finding, not diagnosis; source list explicitly non-exhaustive |
| Inverted papilloma: focal hyperostosis on CT; cerebriform MRI pattern | Gehirn.pdf p.89 | Essential | `differential`, `papilloma` | Included; source calls pattern pathognomonic, but primary imaging study found it in 13% of other malignant sinonasal tumours, so lesson says characteristic, not proof |
| Squamous cell carcinoma: aggressive bone destruction and soft-tissue infiltration | Gehirn.pdf p.89 | Essential differential clue | `differential` | Included as suspicious clues only, not sufficient diagnostic criteria |
| Fungal sinusitis / mycetoma: hyperdense calcifications and T2 hypointensity | Gehirn.pdf p.89 | Essential differential clue | `differential` | Included with source attribution |
| Odontogenic sinusitis: periapical defect, maxillary sinus | Gehirn.pdf p.89 | Essential differential clue | `differential` | Included without adding dental diagnosis criteria |
| Mucocele: expansion and bony thinning | Gehirn.pdf p.89 | Essential differential clue | `differential` | Included with consistent German term “Mucozele”; no complication or treatment claims added |
| Inverted papilloma: benign Schneiderian epithelial tumour, local aggressiveness, recurrence and premalignant potential; PDF gives 5–10% SCC | Gehirn.pdf p.89 | Context / caveat | `papilloma` | Included as source estimate; independently checked against a review reporting approximately 5–11% across cited studies; not an individual risk estimate |
| Location: lateral nasal wall, maxillary sinus most common, then ethmoid; almost always unilateral | Gehirn.pdf p.89 | Context | `papilloma` | Included as source statement |
| CT: unilateral soft-tissue mass, focal hyperostosis at attachment (PDF 70–90%), bone remodelling | Gehirn.pdf p.89 | Essential | `papilloma` | Included; 70–90% remains explicitly a PDF source value, not independently confirmed sensitivity/prevalence; focal hyperostosis can help localize attachment but does not prove histology |
| MRI: alternating gyriform T2 and post-contrast T1 cerebriform pattern | Gehirn.pdf p.89 | Essential | `papilloma` | Included as characteristic; absolute “pathognomonic” wording corrected/qualified against primary evidence |
| DWI restriction as clue to malignant transformation | Gehirn.pdf p.89 | Caution | `papilloma` | Included only as the PDF's possible clue; interpretation tied to actual DWI sequence and ADC map. No b-value or ADC threshold is supplied by the PDF; an isolated finding is not diagnostic |
| NNH-CT versus native CCT: CTDIvol, DLP, effective-dose ranges; approximate tenfold claim | Gehirn.pdf p.89 | Context, protocol-dependent | `dose` | All figures reproduced as page-reported values. CTDIvol/DLP are identified as scanner-output indices, effective dose as a modeled comparison quantity; none is presented as an individual organ dose or personal risk. Protocol/scanner/patient-size caveat retained. Linked to `/technik/dosimetrie`. |

## Visual plan and terminology

| Teaching purpose | Media | Asset and interpretation | Status |
| --- | --- | --- | --- |
| Show the concept of unilateral maxillary sinus opacity without implying a particular disease | Code-drawn non-diagnostic schematic | `public/educational/einseitige-nnh-verschattung/hero.svg`; one side shaded, opposite side outlined, no fixed-language text or patient anatomy claim | Implemented; translated alt text in route |
| Show a typical or counterexample case | Patient imaging | The source page contains no case images and no separately authorized case asset was identified | Unresolved; lesson explicitly states this limit rather than inventing or fetching a case |

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Unilateral sinus opacification | einseitige NNH-Verschattung | unilateral sinus opacification | کدورت یک‌طرفهٔ سینوس‌های پارانازال |
| Focal hyperostosis | fokale Hyperostose | focal hyperostosis | هیپراستوز کانونی |
| Cerebriform pattern | cerebriformes Muster | cerebriform pattern | الگوی cerebriform |
| Bone remodelling | Knochenremodeling | bone remodelling | بازسازی استخوان |
| Diffusion restriction | Diffusionsrestriktion | diffusion restriction | محدودیت انتشار |
| Periapical defect | periapikaler Defekt | periapical defect | نقص پری‌آپیکال |

## Existing routes and assessment audit

- Curriculum group `hals-nnh` has topic IDs `sinusitis`, `mukozelen`, `sinonasal-tumoren`, and `odontogene-pathologien`; at audit time none has a linked lesson route.
- No dedicated route for unilateral sinus opacification or inverted papilloma was found. The existing Osteom lesson mentions paranasal sinuses but is not a sinus-opacity lesson.
- No matching MCQ/flashcard ID for this differential was found. Generic systemic-disease questions mention sinusitis but do not assess these imaging patterns. This lesson includes one embedded three-option decision check; shared assessment banks were not changed.

## Validation and review status

- Source page visually reviewed from the supplied PDF and text extracted from PDF p.89 (printed p.88).
- `node scripts/test-gehirn-unilateral-sinus-render.mjs`: PASS (SSR coverage for DE/EN/FA, RTL, five differentials, qualified papilloma clues, source dose table, schematic, and unselected retrieval answers).
- `git diff --check`: PASS for this lesson's files.
- Independent read-only review and delta: PASS within the source, teaching, visual-concept, language, and assessment checks described in the reviewer report; terminology, Eide et al. attribution, dose terminology, and the link to `/technik/dosimetrie` were retested. Four existing curriculum IDs now link to this bounded route and remain `inProgress`.
- Browser/device/theme/interaction evidence: pending; route access is sign-in gated in this environment.
- Clinician review and Dr. Zia scientific approval: pending.
- Release/publication approval: not asserted.

## External verification used to qualify source wording

- Lee et al., “Sinonasal Inverted Papilloma: Value of Convoluted Cerebriform Pattern on MR Imaging,” *AJNR* 2008;29(8):1556–1561, [PMC8119066](https://pmc.ncbi.nlm.nih.gov/articles/PMC8119066/). In the study's selected sample, a cerebriform pattern was also present in 17/128 malignant sinonasal tumours; this supports avoiding the term pathognomonic.
- Long et al., “Imaging predictors for malignant transformation of inverted papilloma,” *Laryngoscope* 2019;129(4):777–782, [PubMed 30515841](https://pubmed.ncbi.nlm.nih.gov/30515841/). Retrospective imaging/pathology comparison; DWI/ADC and pattern findings are described as predictors, not a stand-alone diagnosis.
- Eide et al., “Sinonasal Inverted Papilloma and Squamous Cell Carcinoma: Contemporary Management and Patient Outcomes,” *Cancers (Basel)* 2022;14(9):2195, [PMC9102473](https://pmc.ncbi.nlm.nih.gov/articles/PMC9102473/). Review reports synchronous SCC at initial resection in approximately 5–11% across cited literature.
- Lee et al., “Focal Hyperostosis on CT of Sinonasal Inverted Papilloma as a Predictor of Tumor Origin,” *AJNR* 2007;28(4):618–621, [PMC7977366](https://pmc.ncbi.nlm.nih.gov/articles/PMC7977366/). Surgical correlation study supports focal hyperostosis as a possible attachment-localization clue, not as a prevalence/diagnostic certainty metric.
