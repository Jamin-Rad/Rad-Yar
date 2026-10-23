# Parkinsonism imaging, Gehirn.pdf pp.77–78

Status: authored draft, 2026-10-19. This record does not imply clinical approval or publication readiness.

## Scope and teaching path

- Route: `/gehirn/neurodegeneration/parkinson`; exact curriculum ID `morbus-parkinson` (`inProgress`).
- Promise: distinguish the structural nigrosome-1 MRI sign from functional DAT-SPECT and describe each with its technical/interpretive limits.
- Audience: radiology learners with basic MRI and nuclear-medicine terminology.
- Outline: (1) orient to nigrosome 1 on axial T2*/SWI, compare the PDF's normal and PD-labelled examples; (2) distinguish DAT-SPECT from MRI; (3) keep imaging subordinate to clinical syndrome diagnosis and report limits.
- Three-language implementation: German, English, Persian. Embedded self-check tests modality distinction and the non-definitive nature of an absent sign.

## Source coverage ledger

| Point | Source | Importance | Location / disposition |
| --- | --- | --- | --- |
| Nigrosome 1 in dorsolateral substantia nigra is normally visible on suitable susceptibility-sensitive MRI; sign may be reduced/absent in PD | Gehirn.pdf p.77 (printed p.76) | Essential to bounded imaging objective | MRI chapter; source examples shown. Case diagnosis not independently verified. |
| Sequence, plane and image quality affect assessment | p.77 and Prasuhn et al. 2021 | Essential limitation | MRI chapter; no universal sensitivity/specificity claimed. |
| Clinical performance of the swallow-tail sign is limited/inconsistent | Prasuhn et al. 2021; Meijer et al. 2016 | Essential caveat | MRI chapter reports the findings at a high level; no pooled estimate or threshold taught. |
| Conventional MRI is often normal in idiopathic PD; assess structural alternatives including vascular lesions and normal-pressure hydrocephalus | p.78 | Essential scope limit | Report chapter names both alternatives. No unsupported diagnostic criteria or thresholds added. |
| DaTSCAN FP-CIT SPECT depicts presynaptic dopamine transporter; reduced striatal binding is a functional signal | p.78 | Essential modality distinction | Nuclear-medicine chapter. |
| DAT imaging indicates presynaptic dopaminergic deficit but cannot distinguish idiopathic PD from DLB, PSP, CBD, or MSA | p.78; Morbelli et al. 2020 EANM/SNMMI guideline | Essential caveat | Nuclear-medicine chapter states the limit without implying syndrome-specific diagnosis. |
| FDG-PET and differential by glucose-metabolism pattern | p.78; SNMMI/EANM 2024 IV.A.2 | Essential modality distinction | FDG chapter, measurement table and localized self-check. Regional relative increases and decreases can coexist; treatment affects the pattern. No diagnostic threshold or FDG scan-recognition task. |
| Clinical symptom/definition/pathophysiology detail | p.77 | Deferred | Outside this imaging-focused lesson; would require a separate clinical source/objective. |

## Media ledger

| Purpose | Asset | Source / frame | Selection and status |
| --- | --- | --- | --- |
| Recognize a normal nigrosome-1 example | `public/educational/parkinson/nigrosome-normal.png` | Gehirn.pdf p.77, upper-right axial MRI panel with inset | Visually checked against rendered source page; user-authorized PDF educational image use recorded. Original case/study, contributor and reuse terms unknown. |
| Contrast the source's PD-labelled example | `public/educational/parkinson/nigrosome-parkinson.png` | Gehirn.pdf p.77, lower-right axial MRI panel labelled PD | Visually checked; case diagnosis not independently verified; user-authorized educational use recorded. |
| Concept orientation | `public/educational/parkinson/hero.svg` | Code-native SVG | Abstract modality illustration; not a diagnostic MRI/SPECT image. |

## References and terminology

- Prasuhn J, et al. Clinical MR imaging in Parkinson’s disease: How useful is the swallow tail sign? Brain Behav. 2021;11(7):e02202. doi:10.1002/brb3.2202. This cohort found no group difference and overall poor diagnostic performance.
- Meijer FJA, et al. Nigrosome-1 on susceptibility weighted imaging to differentiate Parkinson’s disease from atypical parkinsonism: an in vivo and ex vivo pilot study. Pol J Radiol. 2016;81:363–369. doi:10.12659/PJR.897090. Clinical 3T discrimination was marginal.
- Postuma RB, et al. MDS clinical diagnostic criteria for Parkinson’s disease. Mov Disord. 2015;30:1591–1601. doi:10.1002/mds.26424.
- Morbelli S, et al. EANM practice guideline/SNMMI procedure standard for dopaminergic imaging in Parkinsonian syndromes 1.0. Eur J Nucl Med Mol Imaging. 2020;47:1885–1912. doi:10.1007/s00259-020-04817-8.

Terminology: Nigrosom 1 / nigrosome 1 / نیگروزوم ۱; suszeptibilitätsgewichtete Bildgebung (SWI) / susceptibility-weighted imaging / تصویربرداری حساس به سوسپتیبیلیتی; Dopamintransporter-SPECT / dopamine-transporter SPECT / SPECT ناقل دوپامین.

## Validation and open gates

### FDG extension, 2026-10-23

- The outline now includes regional FDG-PET metabolism between DAT-SPECT and reporting, with a comparison table and answer-specific self-check in DE/EN/FA.
- Primary source: SNMMI/EANM brain FDG PET guideline version 2.0 (2024), section IV.A.2, doi:10.2967/jnumed.124.268754; consulted directly. The blanket reduced-metabolism wording from PDF p.78 is qualified using the guideline's regional patterns and treatment effects.
- PDF physical p.78 inspected; no FDG case image appears there. The table explains measurement differences; it is not diagnostic image training.
- Independent read-only review found the source correspondence, DE/EN/FA text and all option-specific feedback sound. Its requested ledger correction is included here.
- `node --import tsx scripts/test-gehirn-parkinson-ssr.mjs` passed in all three languages, including the new chapter, table, reference and assessment.
- The local Next route compiled and served on port 3021. Initial browser access reached the sign-in gate; after normal session hydration, desktop FDG content was checked in FA/light and DE/dark, including the measurement table and wrong-to-correct feedback. Screenshot: `tmp/gehirn-browser/parkinson-de-dark.png`. Mobile and full keyboard checks remain open. No gate was altered.
- Existing content outside the FDG delta was not comprehensively re-reviewed. Clinical sign-off and later lesson-by-lesson optimization remain open.

### Earlier lesson evidence

- `node scripts/check-gehirn-late-lessons.mjs`: checks DE/EN/FA data structure, source metadata, assessment schema, exact curriculum link, shared shell, image/provenance presence, and JSX parsing.
- `node scripts/test-gehirn-parkinson-ssr.mjs`: actual route and maintained shared shell rendered with React SSR in DE/EN/FA; checks one title, initial single-open chapter, RTL direction, source images, references, and localized answer-specific retry feedback. CSS modules and language provider are test fixtures; this is not a browser or Next production-build test.
- `npm run audit:mcq`: repository assessment-bank audit; not Parkinson-specific scientific validation.
- Both PDF crops visually inspected against the rendered source page.
- Build: attempted but not passed; the full build was blocked by `fonts.googleapis.com` DNS failure and an `EPERM` creating an unrelated Thorax `.next` route.
- Independent bounded source/content/language/assessment/visual review: PASS after bibliography, coverage, question feedback, and hero-label repairs. Browser desktop/mobile/theme and keyboard interaction checks remain pending; specialist approval and original image attribution/reuse terms remain unknown.
- Curriculum link explicitly remains `inProgress`; no completion or release status is inferred.
