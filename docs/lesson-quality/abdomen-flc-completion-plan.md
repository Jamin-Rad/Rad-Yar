# Fibrolamellar carcinoma and HCC planning — implementation plan

Scope: Abdomen.pdf physical pages 22–23 (printed21–22). Dedicated FLC route `/abdomen/leber/fibrolamellaeres-karzinom`; bounded planning additions to HCC/LI-RADS. No legacy redesign.

Coverage: FLC young/noncirrhotic context, fibrous scar, heterogeneous enhancement, calcification, FNH differential, resection context. Replace absolute T2-dark scar and blanket better prognosis with qualified primary-study evidence. PDF p22 contains no patient figure.

Teaching path: (1) recognize suspicious mass in smooth liver; (2) inspect a published multiphase case and compare FNH; (3) stage beyond liver and establish diagnosis. Two questions and two cards across DE/EN/FA.

Visual plan: generated conceptual liver/mass header (not diagnostic); actual Takahashi et al.2021 Figure1 CT/MRI, first describe A/B/D and separately label later phases. Publisher verifies CC BY4.0, images included absent separate credit. No separate restriction on Figure1. License https://creativecommons.org/licenses/by/4.0/. Image download and visual inspection pending.

Primary sources: Do et al.2014, 37-patient imaging series, PMC4112400 (scar variability, metastases); Takahashi et al.2021 case doi:10.1186/s40792-021-01295-4, PMC8448801 (case and histologic confirmation); AASLD2023 PMC10663390 and EASL2025 HCC guidance for next steps/treatment context. No source percentage copied as a universal rule.

HCC/LI-RADS: LR3 3–6mo CT/MRI; LR4 MDT with repeat imaging within3mo or biopsy as context warrants; LR5 usually supports noninvasive diagnosis in eligible population but selected biopsy remains appropriate. Resection depends liver reserve; thermal ablation location/size; selective TACE with adequate reserve; SIRT radiomicrospheres and not only salvage afterTACE. Explicitly reject universalPDF MWA5cm and TACE75% thresholds. These are HCC planning notes, not an FLC regimen.

Terminology: central scar / zentrale Narbe / اسکار مرکزی; heterogeneous enhancement / heterogene Anreicherung / تقویت ناهمگون; staging / Ausbreitungsdiagnostik / مرحله‌بندی; liver reserve / Leberreserve / ذخیره عملکردی کبد.

QA pending: independent sources/content/visuals; actual browser matrix; clinical approval remains Dr.Zia.

## Completion evidence (24 October2026)

Implemented dedicated FLC route/data, generated hero and inspected CC BY4.0 patient figure. Publisher CDN timed out; identical published figure downloaded successfully from PMC8448801. Original six-panel figure retained, no alterations. Source labels and case caption distinguish native/arterial/delayed CT, T2, DWI and hepatobiliary MRI; no restriction claim without ADC. Hero prompt recorded in image-provenance.json.

HCC planning and LI-RADS next steps added in existing routes, plus localized exact practice access. Source checks: AASLD recommendations19–21; EASL2025 pp18–23 (resection/ablation), pp30–34 (TACE/SIRT). LR-5 biopsy remains selectively appropriate. HCC planning hash now opens target section; TOC includes planning.

Author checks: `node --import tsx scripts/test-abdomen-flc-completion.mjs` PASS (three-language actual-route SSR/RTL, links, assessments/assets/syntax). `scripts/test-reviewed-exam-distractors.mjs` PASS (17 questions x3lang validated against unchanged production exam validator). GlobalMCQ audit PASS871questions/18cases perlang at time of check. Independent review and browser evidence remain separate.

A global exam compatibility defect was found: DB migration0020 requires exactly4options. No API/schema relaxation applied. Added a fourth topic-specific global-bank distractor and explanation via reviewedExamDistractors.js for 17 affected FLC/LI-RADS/priorSpine/Thorax questions. Local3-option checks and originalcorrectanswers/cards remain unchanged. This is an authoring correction, not a DB migration. Reviewer asked to examine allnewdistractors.
