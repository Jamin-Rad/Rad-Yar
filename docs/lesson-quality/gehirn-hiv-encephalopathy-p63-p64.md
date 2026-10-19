# HIV-associated encephalopathy MRI pattern — source and QA ledger

Status: bounded lesson and integration passed independent source/education/visual/language/assessment review; curriculum remains `inProgress` because this covers only selected HIV-associated encephalopathy MRI material.

## Scope and instructional path

This is a bounded lesson on interpreting selected MRI descriptors in HIV-associated encephalopathy. It is not a diagnostic algorithm, HIV neurology survey, HAND diagnostic framework, or treatment guide. Learners move from pattern description (distribution and volume) to a non-specificity warning and a report-descriptor self-check. The embedded self-check is the only assessment; no global MCQ-bank topic or flashcard topic was found or added.

PDF source: `Gehirn.pdf`, PDF pages 63–64 (printed page labels 62–63). Page 63 introduces HIV encephalopathy, its clinical context and the periventricular/deep white-matter pattern; p.64 continues with an attributed MRI example and differentials. The lesson excludes the PDF's MRS metabolite claims and broad HIV clinical/disease statements except where needed to delimit the imaging task.

| Source claim / page | Disposition in lesson | External verification / limit |
|---|---|---|
| p.63: usually symmetric, confluent T2/FLAIR hyperintensity in periventricular/deep white matter, often parieto-occipital; relative sparing of subcortical U-fibres and cortex | Included as a qualified description of the PDF pattern, explicitly not a specific sign; variability and overlap are stated. | Haziot et al. 2015 describes common late confluent bilateral symmetric lesions and relative subcortical/posterior-fossa sparing, while noting unequal/diffuse patterns also occur. The PDF's exact pattern is not a diagnostic criterion. |
| p.63: no mass effect, no diffusion restriction, no contrast enhancement; diffuse atrophy | Included as observations in the PDF's description of its typical pattern, with explicit wording that they are not universal exclusion criteria. Volume loss is described separately as a possible accompanying feature. | Do not infer that every HIV-related case lacks these findings. Page 64 case caption specifically reports no mass effect and no diffusion restriction; it does not independently state enhancement status. |
| p.63: progressive cognitive/motor symptoms and microglia/macrophage pathogenesis | Omitted from core lesson; stated only as context in the ledger. | Outside the selected imaging objective. |
| p.64: MRI example, caption attributes rID 22069; describes bilateral periventricular/deep signal and extension to the right cerebral peduncle, pons and medulla | Four labeled panels are included; the caption on the lesson identifies the PDF page and rID. Brainstem extent is deferred because the selected axial crop does not show those regions. | Source case DOI is recorded in provenance. Direct original case page was not accessible from this environment; no contributor, original study/frame identifier, or current reuse terms were independently verified. |
| p.64: MRS NAA/Cho/mI and differential diagnoses PML, HIV-associated lymphoma, toxoplasmosis | MRS details and disease-specific differential table omitted. A concise warning retains PML, infection, vascular, metabolic, and age-related alternatives. | Avoids turning this bounded lesson into a full opportunistic-infection differential; no omitted source point is represented as covered. |

## Primary/source references

- Hahn K, et al. **Guideline of the German Society of Neurology: diagnosis and therapy of HIV-1-associated neurological disorders**. *Neurological Research and Practice*. 2026;8:65. Published 13 Aug 2026. https://doi.org/10.1186/s42466-026-00519-y. MRI discussion: diffuse volume loss and age-adjusted white-matter hyperintensities; radiological HIV encephalopathy may reflect CNS escape; assess vascular disease and other causes.
- Haziot MEJ, Barbosa Junior SP, Vidal JE, de Oliveira FTM, de Oliveira ACP. **Neuroimaging of HIV-associated neurocognitive disorders**. *Dement Neuropsychol*. 2015;9(4):380–384. https://pmc.ncbi.nlm.nih.gov/articles/PMC5619320/. Review, not a diagnostic reference standard: no highly specific confirmatory radiological findings; describes common patterns and overlap.
- User-provided source: `Gehirn.pdf`, PDF pp.63–64.

## Visual plan and provenance

| Purpose | Chapter | Medium | Asset/source | Status / caption |
|---|---|---|---|---|
| Explain the possible symmetric periventricular/deep white-matter distribution with volume loss | Header and opening | Code-native SVG concept diagram | `public/educational/hiv-enzephalopathie/hero.svg` | Author-created; visibly labeled as a concept, not diagnostic imaging. Independent bounded visual review passed. |
| Let the learner connect sequence labels to the source's described case | Imaging features | Actual selected MRI panels, not an invented image | Crop from `Gehirn.pdf` p.64, captioned there as Radiopaedia rID 22069; crop is `public/educational/hiv-enzephalopathie/pdf-case.png` | User authorized re-use of the supplied PDF images and reported prior discussion with Radiopaedia on 2026-10-19. This project authorization is recorded separately from independent verification of the original case's terms. PDF source rendered with Poppler `pdftoppm` at 110 DPI (910 × 1287 px); crop box in rendered-page pixels `{left:150, top:100, width:590, height:620}`; output 590 × 620 px. It contains the labeled FLAIR/T1 C+/DWI/ADC panels. Case DOI: `https://doi.org/10.53347/rID-22069` (direct page not accessible via current web retrieval; contributor, original study/frame ID, and current terms unknown). The selected image is a single-case teaching example, not diagnostic evidence. |

## Integration and validation limits

- Exact curriculum item: `hiv-enzephalopathie`; link set to `/gehirn/infektionen/hiv-enzephalopathie`; status remains `inProgress`.
- Embedded report-descriptor self-check has explanatory feedback in DE/EN/FA. No linked global quiz or flashcards were created; the course registry did not expose them for this topic.
- Static checker verifies locale scripts/parity, key claims/caveats, route-to-curriculum mapping, and asset presence. JSX parsing and `audit:mcq` are required before handoff.
- Independent delta retest by `/root/workflow_trial` closed HIV-SRC-01/02, HIV-LNG-01, HIV-EDU-01, and HIV-VIS-01. The reviewer reproduced the 110-DPI source rendering and confirmed the recorded 590 × 620 crop is pixel-identical. The selected case image is suitable for this bounded first exposure and rID 22069 is verified; original contributor/study metadata and current terms remain unverified.
- Browser rendering, responsive/RTL interaction, and specialist approval remain open. UX is blocked because a real browser session is unavailable. This ledger does not claim full coverage of the PDF's HIV section or clinical approval.
