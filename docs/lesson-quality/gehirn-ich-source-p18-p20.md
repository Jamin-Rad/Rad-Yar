# Gehirn.pdf p.18–20: bounded ICH lesson update

## Scope

This batch covers **physical PDF pages 18–20** (printed folios 17–19) only: ICH causes and CT findings, approximate CT evolution, haemoglobin-related MRI signal, and the source's 1.5 T stage table. It does not audit physical p.21, cervical dissection, other ICH cases, the complete route, linked question/card banks, or clinical practice pathways.

Source inspected: C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf, pages 18–20. Text extraction was compared with page renders; p.20 is a dense six-stage table and was read visually. The PDF pages are source material whose reuse the user explicitly authorized.

## Page-to-lesson coverage

| Source point | Disposition and lesson location | Evidence / limit |
|---|---|---|
| p.18: intraparenchymal blood; source distinguishes macrobleed >10 mm and microbleed <10 mm | Retained in ICB_LESSON.klinik.definitionItems | This bounded pass did not independently validate the source's size terminology against every microbleed definition. |
| p.18: primary causes include hypertension and CAA; secondary causes include anticoagulants, tumour, vascular malformation and rarer causes | Cause list retained; the take-home no longer repeats the source's 80–85% as a universal population proportion | Cohort-dependent frequencies are not needed for the imaging task. The existing detailed percentages in the aetiology table are outside this page-level content update and remain unaudited. |
| p.18: disproportionate perifocal oedema and younger age can prompt secondary-cause evaluation | Caveat retained but revised to make vascular imaging choice depend on the clinical-imaging context | The PDF's mandatory CTA wording is not presented as a universal rule. |
| p.18: acute blood is often hyperattenuating, shown as 50–80 HU; oedema and intrahaematomal heterogeneity may occur | CT table retains 50–80 HU as the PDF's example range, explicitly variable with haematocrit and technique | Do not use the number to date or diagnose an individual scan in isolation. |
| p.18: swirl sign represents lower-attenuation areas and is described as active/unclotted blood | Lesson now says these areas may reflect an unclotted component and can associate with expansion; they do not prove active bleeding | This is aligned with the AHA/ASA guideline's cautious treatment of NCCT heterogeneity markers as potential expansion-risk markers, not direct proof of ongoing bleeding. |
| p.18: CTA spot sign as extravasation and expansion predictor | Lesson defines focal contrast extravasation and association with expansion; predictive performance is timing-dependent and not certain for an individual | AHA/ASA 2022 reports time-dependent sensitivity/PPV and substantial heterogeneity in predictive value. |
| p.19: attenuation falls during resorption; the PDF gives ~1.5–2 HU/day and 3–6 week isodensity estimate | Direction and possible temporary isoattenuation retained; the fixed linear daily rate and age-dating implication removed | Individual evolution varies. The lesson states HU/time do not support linear dating. |
| p.19: peripheral/ring enhancement can occur during resorption and may be seen for months; abscess/tumour are differentials | Retained as possible and nonspecific; alternatives require clinical context | Enhancement alone does not distinguish organising haematoma from infection or tumour. |
| p.19: oxy-Hb, deoxy-Hb, intracellular/extracellular met-Hb and haemosiderin stages | Core signal relationships retained with typical/often/may wording | Fixed day thresholds and absolute bright-bright specificity have been removed. |
| p.19: conversion can be peripheral-to-central and boundaries vary by haematoma size | Retained in the MRI caveat | Large haematomas may contain different signal stages at once. |
| p.20: six-stage 1.5 T MRI signal chart, with stated time ranges and T1/T2/T2*/SWI/DWI pattern | The source image is displayed in the MRI section, with source page, 1.5 T and approximate-model caveat in a localized caption and descriptive alt text | The PDF image is retained as supplied; the caption does not treat the chart's time labels as universal cut-offs. A separate code-authored schematic remains labelled as a conceptual summary. |

## Instructional structure and media

1. Start with the CT task: recognize acute hyperattenuating parenchymal blood and associated oedema.
2. Separate heterogeneity/spot markers as risk clues from proof of ongoing bleeding.
3. Read attenuation change as a variable course, not a linear haemorrhage clock.
4. Use the MRI hemoglobin-product model to explain signal, then compare it with the supplied 1.5 T source chart.
5. Keep the main caveat visible: time labels and signals vary with haematoma size and may coexist within one lesion.

The source chart at public/icb/mrt-flowchart.png was visually matched to p.20. The route now distinguishes its source-specific alt/caption from the separate conceptual SVG's alt text.

## Clinical sources used for corrections

- Greenberg SM et al. AHA/ASA, 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage, [official guideline](https://doi.org/10.1161/STR.0000000000000407). Scope is spontaneous adult ICH; relevant to uncertainty around NCCT heterogeneity markers, CTA spot-sign prediction, and MRI susceptibility sequences, not a blanket validation of traumatic or structural-cause haemorrhage.
- Gomori JM et al. MR imaging of intracerebral blood: diversity in the temporal pattern at 0.5 and 1.0 T, [primary study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8332990/). Serial signal patterns varied; classic timing at 1.5 T should be used as a guide, not an exact clock.

## Verification and open gates

- Source text and page renders: physical pp.18–20 inspected.
- `node --check data/icb.js`, `node --check app/gehirn/vaskulaer/intrazerebrale-blutung/page.js`, and `git diff --check` pass.
- The lesson source range is recorded as physical pages 18–20. The page-20 source chart is explicitly identified as 1.5 T and described as an approximate teaching model; stage boundaries are variable.
- The adjacent Sequences & Practice summary and DE/EN/FA assessment bank were corrected where they contradicted the inspected signal model (fixed >3-day cutoff, categorical exclusion, fixed HU/day, or categorical CT-blind claims). Spot Sign question/card language was also qualified: CTA timing/protocol affect predictive performance, with no unsupported comparison to Swirl Sign, fixed sensitivity/specificity, or blanket CTA recommendation. A focused independent review of this correction passed.
- This is a bounded content correction, not an independent scientific approval of the full lesson. The route's other causes, percentages, additional cases, assessment banks, RTL/browser behaviour, typography, mobile layout and clinical sign-off remain open.
