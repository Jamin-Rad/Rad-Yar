# Pneumonia complications — Thorax.pdf physical p.35 / printed p.34

Scope: bounded trilingual update to the existing `/thorax/pneumonie-muster` route. Source: user-provided `Thorax.pdf`, physical PDF p.35 / printed p.34. The full page image was inspected; it contains the end of the fungal/PJP pattern material followed by a separate complications section.

| Key | Source point | Lesson disposition | Evidence and limits |
| --- | --- | --- | --- |
| PNEU-34-01 | Empyema: purulent pleural effusion; contrast-CT split-pleura sign, with thickened/enhancing visceral and parietal pleura surrounding low-attenuation fluid | Added as a short row in the existing pneumonia-pattern lesson in DE/EN/FA. States that the sign supports pleural infection in context but does not prove it alone. Identifies the pleural location as distinct from an intraparenchymal abscess cavity. | The PDF slide is the page-level coverage source. Baber et al. (13-patient primary comparison) supports differentiating peripheral empyema from lung abscess by CT morphology: [Radiology 1980, DOI](https://doi.org/10.1148/radiology.135.3.7384467). A later diagnostic-accuracy meta-analysis reports imperfect sensitivity/specificity for the split-pleura sign; therefore no standalone-diagnosis claim is made: [meta-analysis, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8778997/). No treatment advice or thresholds added. |
| PNEU-34-02 | Pneumatocele: thin-walled, air-filled cystic space, described as a later sequela, especially after staphylococcal pneumonia in children | Added a separate row in DE/EN/FA. Explicitly distinguishes this postinfectious context from the existing PJP-associated pneumatocele mention. Notes the typical thin/smooth wall versus the thicker, irregular abscess cavity, without making wall appearance an absolute discriminator. | Flaherty et al. report 20 post-pneumonic cases and describe thin-walled air-containing cyst-like lesions: [Radiology 1960, DOI](https://doi.org/10.1148/radiology.74.1.50). This older case series supports morphology/context only; prevalence and current organism epidemiology are not inferred. No patient image added. |

## Validation

- Focused actual-route SSR: `node --import tsx scripts/test-pneumonia-thorax-p34-render.mjs`.
- Verifies DE/EN/FA rendering and direction, exact PDF page attribution, the two separate complication rows, PJP-context distinction, abscess/cavity distinction, and route/curriculum linkage.
- This bounded source addition is not a full scientific or clinical review of the lesson. No browser interaction, mobile rendering, or specialist sign-off is claimed.
