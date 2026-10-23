# MR-Myelographie — authoring plan and coverage

Route `/technik/mr-myelographie`; topic `mr-myelographie`. Source: Technik.pdf physical p118 / printed117, lower half; text and rendered page inspected 2026-10-24. Upper BOLD section belongs to the existing fMRI lesson.

## Exact chapter plan before implementation

1. **Liquor als natürlichen Kontrast nutzen** — explain heavily T2-weighted fluid contrast and the bounded noncontrast technique.
2. **Vom 3D-Datensatz zur Übersicht** — distinguish acquisition, MIP overview and source/anatomical image correlation.
3. **Was die Untersuchung beantworten kann** — separate stenosis assessment and CSF collection detection from exact leak localization; identify motion and metal limits.
4. **Drei Regeln für die Anwendung** — compress the preceding content and retrieve the localization caveat.

Audience: early radiology trainees with basic T2 knowledge. Goals: explain bright CSF, select source/anatomical correlation rather than MIP-only interpretation, distinguish collection extent from leak site, name the noninvasive technique's advantages and limitations.

## Source ledger

| Point | Source | Placement | Status / qualification |
|---|---|---|---|
| Strong T2: bright CSF, relatively dark background | p118 | chapter1 | Included; not all tissue universally black |
| Fluid as endogenous contrast, analogous to MRCP/uro-MRI | p118 | chapter1 | Included; explicitly unenhanced fluid-sensitive technique |
| 3D TSE; SPACE/CUBE/VISTA | p118 | chapter2 | Included as example vendor names, not interchangeable parameter prescriptions |
| Very long TE/TR; PDF TE >400 ms | p118 + Dobrocky2020 methods | chapter2 | Strong T2 weighting included; >400 ms is NOT a universal threshold. Dobrocky uses TE180 ms. Conflict resolved explicitly in prose as protocol dependent |
| MIP, conventional T1/T2 anatomy correlation | p118 | chapter2 diagram | Included; source images also required |
| Spinal stenosis | p118 | chapter3 | Context only, no grading or stand-alone diagnostic sensitivity claim |
| CSF leak after trauma/operation | p118 | chapter3 | Included as clinical context; distinguish fluid detection and exact leak site |
| No contrast/puncture/ionizing radiation | p118 | chapter1 +3 | Applies to this noncontrast technique, not every method called MR myelography |
| Better soft-tissue representation | p118 | chapter2/3 | Qualified as conventional MRI's complementary anatomical information, not universal superiority to CT myelography |
| Motion and postoperative metal artefacts | p118 | chapter3 | Included; postoperative status alone does not imply nondiagnostic MRI |
| Limited exact leak localization | Dobrocky et al. AJNR2020, doi10.3174/ajnr.A6592 | chapter3 +check/cards | Supplemental primary cohort; no sensitivity number generalized |

Primary supplement read: https://pmc.ncbi.nlm.nih.gov/articles/PMC7357665/ (methods, results and conclusions). Publication2020; accessed2026-10-24. No figures reused (AJNR copyright). Source does not support claiming negative MRI excludes every leak; lesson does not make that claim.

## Media and language plan

- Topic hero: generated conceptual lumbar spine/CSF illustration. Not a diagnostic scan or exact anatomy atlas. Prompt and provenance recorded beside asset.
- Code-native acquisition → overview → correlation diagram with translated labels and caption. Purpose: make the difference between MIP and source-image interpretation explicit.
- No clinical pattern-recognition objective or diagnostic case inference in this short technical lesson. PDF has no image in this section; a patient image is not necessary for the bounded physics/workflow goals. Clinical lesion recognition remains in spine lessons.
- Terminology: Liquor / CSF / مایع مغزی‌نخاعی; stark T2-gewichtet / heavily T2-weighted / با وزن‌دهی شدید T2; Quellbilder / source images / تصاویر منبع; Liquorleck / CSF leak / نشت مایع مغزی‌نخاعی; Lecklokalisation / leak localization / تعیین محل نشت. DE source; authored DE/EN/FA units preserve uncertainty and negative claims.

## Status

Author implementation complete. `node --import tsx scripts/test-technik-mr-myelography-ssr.mjs` passes DE/EN/FA: shared shell, single-open sections, RTL/localized workflow, 2 four-option MCQs per language, 2 multilingual cards, correct training routes, Footer and inherited gates. Real browser interactions are not proven by SSR and remain coordinated by parent, as does independent review. Scientific approval Dr. Zia pending; publication parent-controlled.

Changed files: `app/technik/mr-myelographie/page.jsx`, `page.module.css`; `data/technikMrMyelographyLesson.js`; `public/educational/mr-myelography/hero.png`, `provenance.md`; `scripts/test-technik-mr-myelography-ssr.mjs`; this ledger. Global registries/curriculum are parent-owned.

Independent review SRC-01 resolved by explicitly attributing trauma/postoperative context to the PDF and limiting the supplemental cohort to spontaneous intracranial hypotension in the source note. No performance results generalized to trauma/surgery; specialist selection retained. RSNA review doi10.1148/radiol.232961 was checked as contextual corroboration for postoperative noncontrast fluid-sensitive imaging but is a review, not the cited primary cohort.
