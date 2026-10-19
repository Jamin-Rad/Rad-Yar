# Abdomen / Thorax batch review repair

Status: repair evidence note; independent re-review and coordinated application build are pending. This note is not clinical approval.

## Frozen route set

The independent review found major issues in shared layout (`AT-SRC-01`), teaching structure (`EDU-01`), visual explanation (`VIS-01`), language parity (`LNG-01`), and integration (`ASM-01`). Browser evidence (`UX-01`) remains blocked until a fresh browser session can be exercised; integration and build retest (`REV-01`) remain pending. Curriculum, quiz, and flashcard registry changes are coordinated centrally and have not been made in this domain batch.

The new `components/LessonReferenceShell.jsx` and `components/ClinicalPatternDiagram.jsx` are the repair direction: shared chapter navigation, explicit goals, self-check, take-home rules, and code-native teaching schematics. The diagrams are original educational schematics, not patient images or Radiopaedia cases. They do not replace source images or establish diagnoses.

## Clinical claims requiring primary-source verification

| Lesson | Claim boundary | Primary/authoritative evidence consulted | Repair status |
|---|---|---|---|
| Ileus / volvulus | CT can establish obstruction cause and help identify closed-loop/strangulation features; imaging morphology alone does not prove ischemia. | WSES Bologna guideline, 2017 update: [World Journal of Emergency Surgery / PMC](https://pmc.ncbi.nlm.nih.gov/articles/6006983/) | Route wording keeps ischemia as a concern requiring clinical correlation. It does not infer an operative decision from one sign. |
| Pneumonia patterns | Distribution and opacity patterns narrow the differential but do not identify an organism alone. The lesson should remain descriptive, not a treatment guide. | ATS/IDSA adult CAP guideline: [IDSA guideline page](https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults); diagnostic pathway: [IDSA PDF](https://www.idsociety.org/globalassets/idsa/practice-guidelines/community-acquired-pneumonia-in-adults/cap-clinical-pathway-overview.pdf) | Current route caveat already states imaging overlap and requires clinical/immune-status correlation. Pathogen-specific associations remain teaching cues from the PDF, not validated standalone criteria. |
| Tuberculosis patterns | Radiographs may suggest TB but cannot definitively diagnose it; microbiological evaluation and clinical context are required. | ATS/CDC/IDSA diagnosis guideline: [IDSA guideline page](https://www.idsociety.org/practice-guideline/diagnosis-of-tb-in-adults-and-children/); CDC diagnostic summary: [CDC](https://www.cdc.gov/tb/hcp/testing-diagnosis/clinical-and-laboratory-diagnosis.html) | Route caveat says imaging cannot establish activity and requests clinical, immune-status and microbiological correlation. Distribution labels are presented as classic patterns, not sensitivity/specificity claims. |
| Foreign-body aspiration | Radiolucent aspirated objects may lack direct visibility; age-specific imaging choices require current guidance. | ACR Appropriateness Criteria, 2025: [Ingested or Aspirated Foreign Body—Child](https://acsearch.acr.org/list/TopicNarrativePdf?topicId=384) | Current lesson is limited to signs and source-PDF scope. Do not extend the child recommendation to adults. Primary-source review of each indirect sign remains pending. |
| Focal liver lesions | Phase enhancement must be interpreted in clinical/background-liver context; lesion pattern alone is not a universal diagnosis. | ACG Clinical Guideline: Focal Liver Lesions (2024): [DOI](https://doi.org/10.14309/ajg.0000000000002857) | Existing lesson includes context and multiphase comparison. Detailed claim-by-claim review of every differential row remains pending. |
| Hepatic angiomyolipoma | Enhancement is variable; washout is not a universal rule separating AML from HCC. | Yang et al. 2009: [World Journal of Gastroenterology](https://pmc.ncbi.nlm.nih.gov/articles/PMC2712904/); Tsai et al. 2017: [PubMed](https://pubmed.ncbi.nlm.nih.gov/28809731/) | PDF p12 vs p13 conflict remains explicitly described. No deterministic washout rule is taught. |

## Language and integration status

Existing route bodies contain DE/EN/FA copy, but full semantic parity across all headings, explanatory detail, warnings, and figures has not been independently verified. Any route without translated, clinically reviewed metadata must keep `LNG-01` open. Do not mark parity as passed from key presence alone.

This batch contains lesson-scoped self-check metadata only; no questions, flashcards, or routes have been registered in global curriculum/training data. Coordinator integration remains required. No build or fresh browser evidence is claimed here. UX-01 stays blocked until screenshot plus interaction/accessibility evidence is captured from a running local app.

## Rights and figure status

Source-PDF patient cases and Radiopaedia images are not copied into lesson assets. The diagrams in `components/ClinicalPatternDiagram.jsx` are code-native schematic drawings. They should be reviewed for pedagogic and medical accuracy before release.
