# Ischaemic stroke classification · Gehirn.pdf p. 3

## Scope and integration

- Existing lesson: `/gehirn/vaskulaer/isch-aemischer-schlaganfall`; existing curriculum ID `ischaemischer-schlaganfall` and assessment routes were retained.
- This bounded update source-matches and corrects only the clinical classification/terminology block represented on PDF p. 3. It does not claim that pages 4–9 or the full lesson have been reconciled to the PDF.
- Learner outcome: distinguish CNS infarction from primary intracranial haemorrhage, use a tissue-based TIA definition, and understand that NIHSS quantifies neurological deficit but does not itself determine disability.
- The existing vascular-territory comparison table on the same source page remains in the lesson; it was not re-authored in this batch.

## Source coverage ledger

| Source point | PDF p. | Importance | Disposition in the route | Status |
|---|---:|---|---|---|
| Ischaemic and haemorrhagic forms, with illustrative proportions | 3 | Orientation | Kept the two broad patterns; removed fixed prevalence percentages because no population, year, or case mix is stated. | Included / qualified |
| ICH and SAH under haemorrhagic stroke | 3 | Core | Preserved; clarified that secondary haemorrhagic transformation is a separate process. | Included |
| NIHSS range 0–42 | 3 | Core | Preserved in DE/EN/FA. | Included |
| PDF's “NIHSS >6” as a threshold for functional impairment | 3 | High-impact | Removed. The current AHA/ASA 2026 guidance supports thrombolysis for eligible patients with disabling deficits regardless of NIHSS score; disability is judged for the individual. | Corrected against current guidance |
| ACA/MCA/PCA/posterior circulation territory and syndrome table | 3 | Core | Existing five-row DE/EN/FA territory table retained. | Included; image/text layout checked |
| Legacy TIA definition by symptom resolution and <1 h / <24 h durations | 3 and existing lesson data | High-impact | Replaced with the AHA/ASA tissue-based definition: transient focal dysfunction due to ischaemia without infarction; symptom duration alone does not distinguish TIA from infarction. | Corrected against AHA/ASA statement |
| RIND, PRIND and “completed stroke” course labels | Existing lesson classification, not supported by p. 3 | Optional / obsolete for this learning goal | Removed from the live classification block. | Deferred/removed |
| Stroke subtype proportions | 3 and existing lesson data | Optional, context-dependent | Removed from hero and classification content. | Deferred |
| Venous infarction due to venous/sinus thrombosis | Existing lesson classification; not stated on p. 3 | Supporting, outside p. 3 scope | Retained as a separate mechanism with its original concept restored and localized in DE/EN/FA; it is not presented as a p. 3 source claim. | Retained / explicitly out of source-page scope |

## Editorial path and visual plan

The classification panel now moves from core forms, to infarct patterns/mechanisms, then TIA and NIHSS. Venous infarction remains a distinct mechanism because it was already taught in the lesson, but it is explicitly outside the p. 3 source map. The detailed NIHSS limitation appears once in the classification panel; the clinical-basics card gives only the scale range and refers the learner back to that explanation. The adjacent territory table still links vessel territory to expected clinical syndrome. No diagnostic image is required to teach the corrected definitions; the source page itself uses a text/table comparison, and the existing lesson preserves that learning function. The acute CT, ASPECTS, perfusion and sequence visuals on p. 4 onward were not audited in this batch.

## Terminology map

| Concept | DE | EN | FA |
|---|---|---|---|
| Ischaemic stroke | Ischämischer Schlaganfall | Ischaemic stroke | سکته ایسکمیک |
| Primary intracranial haemorrhage | Primäre intrakranielle Blutung | Primary intracranial haemorrhage | خونریزی اولیه داخل جمجمه |
| Haemorrhagic transformation | Hämorrhagische Transformation | Haemorrhagic transformation | تبدیل هموراژیک |
| Transient ischaemic attack | Transitorische ischämische Attacke | Transient ischaemic attack | حمله ایسکمیک گذرا |
| NIH Stroke Scale | NIHSS | NIHSS | NIHSS |

## External scientific verification

- Easton JD et al. AHA/ASA scientific statement, “Definition and Evaluation of Transient Ischemic Attack.” *Stroke*. 2009. DOI: [10.1161/STROKEAHA.108.192218](https://doi.org/10.1161/STROKEAHA.108.192218). Supports the tissue-based TIA definition and states the diagnosis is not based on symptom duration.
- Sacco RL et al. AHA/ASA scientific statement, “An Updated Definition of Stroke for the 21st Century.” *Stroke*. 2013. DOI: [10.1161/STR.0b013e318296aeca](https://doi.org/10.1161/STR.0b013e318296aeca). Supports CNS infarction as the tissue-based stroke definition and treats ischaemic and haemorrhagic stroke as distinct forms.
- Prabhakaran S et al. AHA/ASA, “2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke.” *Stroke*. 2026. DOI: [10.1161/STR.0000000000000513](https://doi.org/10.1161/STR.0000000000000513). The official AHA summary says eligible patients with disabling deficits should receive rapid thrombolytic treatment regardless of NIHSS score. This lesson makes no treatment recommendation; this evidence is used only to reject a hard NIHSS disability threshold.

## Validation and open evidence

- Visually inspected rendered Gehirn.pdf p. 3 at `tmp/pdfs/gehirn-next/page-03.png`; confirmed the source page's two stroke forms, percentage ranges, NIHSS range and >6 statement, plus the territory/symptom table. The PNG is an intermediate render and is not a lesson asset.
- `node --import tsx scripts/test-stroke-classification-p3.mjs` passes: required localized units exist in DE/EN/FA; legacy time-based TIA wording, RIND/PRIND, fixed prevalence values and NIHSS >6 rule are absent from the updated classification; the territory table remains localized.
- `git diff --check` passed for changed lesson and test files.
- MCQs and flashcards were searched for TIA/RIND/PRIND and NIHSS threshold claims. The existing NIHSS “score below 6 always excludes therapy” option is a distractor in a question whose keyed answer explicitly rejects it; its explanatory answer does not teach that claim. No assessment content needed changing.
- Independent lesson review, actual browser/RTL checks, complete p. 4–9 source match and Dr. Zia's scientific approval remain pending. The curriculum `ready` flag is untouched and is not release approval.
