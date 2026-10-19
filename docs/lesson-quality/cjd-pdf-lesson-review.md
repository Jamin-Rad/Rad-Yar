# CJD lesson from Gehirn.pdf pp.75–76

Status: independent source/content/translation retest passed for the scoped findings on 2026-10-19. Browser/RTL checks, specialist clinical sign-off, and release-rights review remain open; this ledger is not publication approval.

## Scope and route

- Existing curriculum topic: `creutzfeldt-jakob`.
- Lesson route: `/gehirn/neurodegeneration/cjd`.
- Data: `data/gehirnCjdMusterLesson.js`.
- Language set: German, English, Persian.
- Instructional path: inspect cortical DWI/FLAIR pattern → inspect deep grey nuclei and thalamus → interpret with ADC, clinical context, and differential.
- Assessment: one embedded, four-option self-check. No shared MCQ or flashcard registry changes.

## Source coverage

| Claim/item | PDF source | Disposition in lesson |
|---|---|---|
| Rapidly progressive decline and accompanying neurologic features | p.75 (printed p.74) | Bounded to the clinical context for interpreting a pattern; symptom list and old “triad” phrasing are not taught as diagnostic criteria. |
| DWI hyperintensity with corresponding ADC decrease | p.75 | Explicitly taught in all three languages: DWI hyperintensity with corresponding low ADC supports restricted diffusion; DWI brightness alone is insufficient because T2 shine-through/artifact may contribute. The p.75 example itself lacks an ADC map. |
| Cortical ribboning, often asymmetric | p.75 | Taught using the visible FLAIR/DWI pair; DWI conspicuity compared with the adjacent FLAIR frame. |
| Relative precentral sparing | p.75 | Omitted from learner-facing text to avoid turning a variable cohort observation into a required sign. |
| Caudate/putamen signal and sCJD MRI component | p.75 | CDC MRI component is taught narrowly: high signal in caudate/putamen or at least two cortical regions among temporal, parietal, and occipital lobes on DWI or FLAIR. Lesson identifies this as only the MRI component, not a standalone diagnosis; the full criteria remain linked. |
| Pulvinar sign claimed “highly specific for CJD” | p.75 | Corrected with explicit distinction: the classic pulvinar sign is particularly associated with variant CJD; it is not a general sCJD hallmark. The PDF claim is flagged as overgeneralized. |
| Hockey-stick pattern and thalamic signal | p.76 (printed p.75) | Taught as a described thalamic pattern; image is explicitly identified as DWI without ADC. No inference that it alone establishes a CJD subtype. |
| FLAIR signal less conspicuous than DWI | p.76 | Explained as a common sCJD pattern, not an invariant rule; supported by the cohort study below. |
| No enhancement, edema, or mass effect | p.76 | Not rendered as an absolute rule. Differential caveat explains that other acute processes may also restrict diffusion and should be considered. |

## Scientific sources checked

- CDC, *Clinical Overview of Creutzfeldt-Jakob Disease*, accessed 2026-10-19: lesson uses only the MRI component of CDC's probable sCJD criteria—high signal in caudate/putamen or at least two cortical regions (temporal, parietal, occipital) on DWI or FLAIR. Other elements of the clinical case definition are not collapsed into the MRI wording; full criteria remain linked in lesson references. https://www.cdc.gov/creutzfeldt-jakob/hcp/clinical-overview/index.html
- Vitali P, et al. *Diffusion-weighted MRI hyperintensity patterns differentiate CJD from other rapid dementias*. Neurology. 2011;76:1711–1719. Cohort evidence: DWI abnormalities often more conspicuous than FLAIR in sCJD; ADC review helps distinguish true restriction in subcortical findings, with overlapping mimics and limitations. https://pmc.ncbi.nlm.nih.gov/articles/PMC3100134/
- Hermann P, et al. *Biomarkers and diagnostic guidelines for sporadic Creutzfeldt-Jakob disease*. Lancet Neurol. 2021;20:235–246. Checked for current sCJD guideline context and pulvinar-sign distinction. https://pmc.ncbi.nlm.nih.gov/articles/PMC8285036/
- Zerr I, et al. *Updated clinical diagnostic criteria for sporadic Creutzfeldt-Jakob disease*. Brain. 2009;132:2659–2668. Retained as historical study/criteria source, not the sole current authority. https://pmc.ncbi.nlm.nih.gov/articles/PMC2759336/

## Visual provenance and inspection

Both full source pages were rendered at 300 dpi and visually inspected. Crops are stored under `public/educational/cjd/`; asset-specific record is `public/educational/cjd/image-provenance.json`.

| Asset | PDF page / printed page | Radiopaedia attribution | Visible material and crop choice |
|---|---|---|---|
| `cjd-cortex-rid54199.png` | p.75 / p.74 | Case courtesy of Mathieu Deltomme, rID-54199 | Axial FLAIR/DWI pair at high convexity; sequence labels retained. DWI cortical ribboning is visibly more conspicuous. No ADC is shown. Case ID and credit are in adjacent figcaption. |
| `cjd-thalamus-rid43970.png` | p.76 / p.75 | Case courtesy of Brad Hayhow, rID-43970 | Image-only crop of axial DWI with bilateral thalamic signal. No ADC is shown; case ID and credit are in adjacent figcaption. The source page labels the pattern hockey-stick-like. |

Use is covered by the user's project-level authorization for supplied PDFs and Radiopaedia case material, recorded in `docs/lesson-quality/standard.md`. Independent review should confirm visible credit, attribution consistency, and any displayed license metadata before release.

## Validation and open gates

- Source pages visually inspected; cropped assets opened and checked after cropping.
- Curriculum entry links exact ID to the existing route and remains `inProgress`.
- Lesson has DE/EN/FA fields and a four-choice local self-check.
- Independent read-only source/content/translation review and retest passed; the reported ADC, MRI-criterion, media-copy, and German-label findings were closed.
- Still required: prion-specialist clinical sign-off; rendered browser checks across DE/EN/FA, RTL, themes, desktop/mobile; relevant project checks; release-rights review.
- No commit or push.
