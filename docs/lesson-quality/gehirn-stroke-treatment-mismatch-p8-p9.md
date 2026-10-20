# Ischaemic stroke · imaging-selection and thrombolysis wording · Gehirn.pdf pp.8–9

## Scope

- Existing lesson: `/gehirn/vaskulaer/isch-aemischer-schlaganfall`; curriculum ID `ischaemischer-schlaganfall`.
- This bounded delta corrects two claims in the MRI mismatch and treatment concepts. It does not audit or approve the entire lesson, its assessments, or its browser presentation.
- Source pages were inspected as rendered images: `tmp/pdfs/gehirn-next/page-08.png` and `page-09.png` (PDF pp.8–9; printed pp.7–8).

## Source coverage and correction ledger

| Source point | PDF page | Existing lesson location | Disposition | Status |
|---|---:|---|---|---|
| DWI-visible / FLAIR-not-yet-visible pattern is described as suggesting a stroke under 4.5 h | 8 (printed 7) | `STROKE_LESSON.mri.mismatchText` | Reframed as an imaging-selection pattern for selected patients with unknown onset. Explicitly states that mismatch does not establish exact lesion age or independently determine treatment eligibility. | Source wording corrected against current guidance |
| Alteplase within 4.5 h, extended to 9 h if CTP is positive | 9 (printed 8) | `STROKE_LESSON.treatment.items[0]`; hero thrombolysis card | Standard window now names alteplase or tenecteplase in eligible patients. Unknown-onset selection is separately described with DWI-FLAIR mismatch; the 4.5–9 h window is separately tied to defined automated perfusion-mismatch criteria. A generic positive CTP is explicitly insufficient. Hero no longer implies alteplase is the only standard-window agent. | Source wording corrected against current guidance |
| Thrombectomy up to 24 h with appropriate mismatch / penumbra | 9 (printed 8) | Existing `treatment.items[1]` and linked assessments | Left unchanged in this delta; already framed as selected LVO patients with appropriate imaging. | Covered; not re-audited here |

## External scientific verification

- Prabhakaran S et al. “2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke.” *Stroke*. 2026;57:e316–e436. DOI: [10.1161/STR.0000000000000513](https://doi.org/10.1161/STR.0000000000000513). The guideline supports alteplase or tenecteplase in the 4.5-hour IV thrombolysis window. In selected unknown-onset cases, DWI-FLAIR mismatch may support treatment selection; in the 4.5–9-hour window, advanced perfusion imaging criteria support selection. These are distinct pathways, not interchangeable criteria. See §§4.6.2–4.6.3. DWI-FLAIR mismatch is not a precise timestamp.
- Primary-source verification was performed against the published AHA/ASA guideline text on 20 October 2026. Reference page: [AHA Journals guideline](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513).

## Validation and limits

- Added focused assertions for all DE/EN/FA variants, the eligible-agent statement, criteria-based extended window, rejection of a generic positive-CTP rule, and mismatch-as-selection wording.
- The source images were visually checked. The thrombolysis question/card already distinguish eligible agents and imaging-based selection. A later p.4–9 assessment audit corrected one DWI-FLAIR MCQ and one retrieval card that still described mismatch as “likely early”; see [the p.4–9 audit](gehirn-stroke-p4-p9-audit.md).
- Independent review of this delta, browser/RTL review, full lesson evidence gates and Dr. Zia's scientific approval remain pending. Passing focused tests does not imply release approval.
