# Osteoidosteom — source and QA ledger

Date: 2026-10-20. Bounded authoring scope: `MSK.pdf`, PDF pp. 77–79 (printed pp. 76–78), curriculum ID `osteoid-osteom`; route added at `/msk/tumoren/osteoid-osteom`. The three full page scans were rendered and inspected, alongside the extracted/visible page content. The embedded page-78 (printed p.77) image group was cropped from the supplied PDF at high resolution and visually checked. The PDF gives no figure contributor or original image licence; the user has explicitly authorized use of images in their PDFs. No Radiopaedia image was needed.

## Learning path and visual plan

1. Use the symptom/location pattern to motivate a search for a small nidus, without treating symptoms as diagnostic proof.
2. Read radiography, CT and MRI for the nidus versus the reactive response; distinguish direct nidus depiction from oedema.
3. Compare the source-listed differentials by nidus, sclerosis, size and location, retaining the limits of single findings.
4. Retrieve the imaging decision in a short, explicitly fictional vignette derived from source features; no external patient case is invented.
5. Compress to three portable reading rules. Treatment is a short, source-attributed endpoint because p.79 contains it.

Visuals: (a) code-native, non-diagnostic cross-section diagram separates small nidus from larger reactive sclerosis; (b) actual three-panel source figure from p.78, with source-captioned right femur radiograph and MRI-STIR. The middle panel modality is not identified by the source caption and stays explicitly unlabeled. The PDF does not state image contributors/licence; user authorization is recorded above. Browser image loading and three-locale rendering remain to be verified.

## Coverage

| Point | Source | Importance | Lesson location | Status |
|---|---|---:|---|---|
| Definition as benign bone-forming tumour | PDF p.77 | Essential | Clinical lead | Included |
| Typical age 10–25, male predominance 2:1–3:1 | PDF p.77 | Supporting | Clinical table | Included with source attribution |
| Marked night pain; prompt NSAID response; prostaglandin-mediated note | PDF p.77 | Essential | Clinical table | Included as source statement |
| Long bones, ~50% femur/tibia; intracortical diaphysis/metaphysis | PDF p.77 | Essential | Clinical table | Included as PDF-specific estimate |
| Radiograph: sharply defined cortical thickening/sclerosis and small nidus | PDF p.77 | Essential | Imaging section and source figure | Included; actual figure from p.78 is used |
| CT labelled Goldstandard; nidus <2 cm, hypodense within reactive sclerosis, possible punctate central calcification | PDF p.78 | Essential | Imaging table | Included; “Goldstandard” attributed to PDF. The scan renders the parenthetical word as “Sequestrid”; it is flagged as unclear and not repeated as a technical term. |
| MRI sensitivity / specificity caveat, marrow and soft-tissue oedema, small nidus can be obscured, avid nidus enhancement | PDF p.78 | Essential | Imaging table | Included in compressed form; checkable distinction is nidus versus reaction |
| Right femur radiograph and MRI-STIR with cortical thickening, nidus and marrow/periosteal reaction | PDF p.78 | Visual evidence | Cropped teaching figure | Included; no independent claim made about the unlabelled middle panel |
| Brodie abscess / subacute osteomyelitis: central avascular zone with reactive sclerosis | PDF p.78 | Essential differential | Differential table | Included; not treated as proven infection from imaging alone |
| Osteoblastoma: usually >2 cm, more aggressive, spinal preference | PDF p.78 | Essential differential | Differential table | Included as a source heuristic, not an absolute size diagnosis |
| Ewing sarcoma: malignant, periosteal reaction, no CT nidus (PDF summary) | PDF p.78 | Essential differential | Differential table | Included as source’s differentiating clues, without saying any single sign excludes it |
| Enostosis: purely sclerotic, no nidus/symptoms | PDF p.78 | Essential differential | Differential table | Included as source-described pattern |
| CT-guided RFA, thermal destruction, >90% success as stated in source | PDF p.79 | Supporting | Management endpoint | Included and attributed to PDF; compared with a 47-patient primary series (44/47, 94%) to put the estimate in context |
| Mild symptoms, NSAID observation and possible spontaneous regression | PDF p.79 | Supporting | Management endpoint | Included as source summary; selection and follow-up details are not present on this page |

## Terminology and evidence

| Concept | DE | EN | FA | Use |
|---|---|---|---|---|
| Nidus | Nidus | nidus | نیدوس | Small tumour focus; preserve Latin term in all languages |
| Reactive sclerosis | Reaktive Sklerose | reactive sclerosis | اسکلروز واکنشی | Bone response, distinct from the nidus |
| Night pain | Nachtschmerz | night pain | درد شبانه | Symptom clue, not a diagnostic criterion by itself |
| MRI oedema obscuring the nidus | Ödem kann den Nidus überdecken | oedema may obscure the nidus | ادم ممکن است نیدوس را بپوشاند | Cautious language; no absolute modality exclusion |
| RFA | Radiofrequenzablation | radiofrequency ablation | ابلیشن رادیوفرکانسی | Procedure in the PDF's treatment summary |

External scientific cross-checks: Assoun et al. compared CT and MRI in 19 histologically proven lesions; CT detected the nidus more accurately in 63% and MRI better showed adjacent marrow/soft-tissue changes ([PubMed 8134575](https://pubmed.ncbi.nlm.nih.gov/8134575/)). Woertler et al. reported clinical success in 44/47 patients (94%) in a CT-guided RFA series ([PubMed 11389223](https://pubmed.ncbi.nlm.nih.gov/11389223/)). These support the modality distinction and the approximate outcome context; neither turns the lesson into a clinical protocol. The PDF's 2 cm distinction is preserved as a source heuristic, explicitly not a stand-alone diagnostic rule.

## Validation and open evidence

Author verification is a targeted SSR test in DE/EN/FA: language/direction, shared shell, chapters, translated lesson facts and assessment choices, image provenance cues and retrieval content. `git diff --check` is also required. The user-supplied diagnostic figure was visually inspected after crop. Independent bounded source/education/visual/assessment review passed; the only language finding was corrected and independently retested. Browser desktop/mobile/theme/interaction review and clinical approval remain outstanding. Curriculum ID `osteoid-osteom` links to `/msk/tumoren/osteoid-osteom` (`inProgress`). No production/publication approval is implied.
