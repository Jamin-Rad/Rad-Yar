# CAA MCQ and flashcard review — 2026-10-15

The maintained reading lesson is `data/caaLesson.js`. Its study bank is now `data/caaStudyBank.js`, re-exported through the existing `data/caa.js` entry point. Unused legacy lesson data is outside this content change.

## MCQs

Reviewed and rewrote all eight existing questions; added exactly ten (`caa-09`–`caa-18`), giving 18 questions per language. Existing public question IDs remain unchanged. Every question has four distinct options, one best answer, a main explanation and feedback for each of the three distractors. German, English and Persian have matching meaning and keys. Correct answers are distributed across A–D (5/4/5/4).

| IDs | Learning objective / substantive review |
| --- | --- |
| 01–03 | Typical distribution; one haemorrhagic lesion plus a qualifying WM marker; cSS appearance versus CMB, PVS and acute sulcal blood |
| 04 | TFNE case now includes a matching FLAIR haemorrhage instead of inferring cSAH from symptoms alone; removes an absolute symptom-based TIA/embolic distinction |
| 05–08 | PVS location as an association rather than proof; Aβ deposit sites; precise multispot definition; ≥50 versus older criteria/onset age |
| 09 | Different, spatially separate lobar lesion types can be combined |
| 10 | WM-only presentation, even with both markers, does not meet probable CAA |
| 11 | A single deep CMB prevents the MRI categories but does not exclude coexisting CAA |
| 12 | Cerebellar haemorrhage is neutral for counting and deep exclusion |
| 13 | cSAH and cSS at the same site are not double-counted |
| 14 | >20 CSO-PVS on one axial T2 slice in one hemisphere; do not add hemispheres |
| 15 | >10 small round/oval subcortical WMH in total, with both hemispheres involved; not >10 per side |
| 16–17 | RCVS and cavernoma as explanatory differentials rather than automatically counting every lobar abnormality as CAA |
| 18 | Incidental MRI findings do not substitute for the required clinical presentation |

All diagnostic category vignettes state the relevant clinical prerequisites and exclusions or deliberately test a missing one. Questions 09–15 and 18 were independently checked against the original Boston v2.0 table. No case implies that MRI proves definite CAA.

## Flashcards

All 15 existing cards were revised, and 17 missing focused cards were added (32 total). The first 15 IDs and order are preserved for stored learning progress. Front, answer and explanation remain available in all three languages.

| Lesson content | Cards |
| --- | --- |
| Pathology, age/frequency/sex, systemic distinction, hereditary APP disease, Down syndrome, Alzheimer association | def, epid, systemisch, hereditaer, down, alzheimer |
| Four bleeding patterns, cSS versus cSAH, relevant sequences | vier-typen, css, csah, sequenzen |
| Acute deficits, TFNE, cognition, seizures, headache | klinik-akut, tfne, klinik-chronisch, anfaelle, kopfschmerz |
| Boston prerequisites, probable/possible, incidental markers, lesion counting, cerebellar neutrality | voraussetzungen, boston-probable, boston-possible, klinische-eingangsvoraussetzung, zaehlung, kleinhirn |
| Both WM markers and their distinct counting rules | pvs-cso, multispot |
| Arteriolosclerosis and all six other alternatives/alternative groups in the lesson | cmbs, dd-rcvs, dd-avm, dd-kavernom, dd-tumor, dd-trauma-infarkt, dd-venenthrombose |
| Reporting relevance of cSS and treatment risk assessment | css-risiko, therapie |

Removed or corrected: cSS supposedly limited to a few sulci; TFNE exclusively from acute cSAH; a fixed 30% dementia rate; the unsupported implication that mixed disease rules CAA out; PVS as a standalone cause-specific proof; older 85% Alzheimer wording; blanket prohibition of anticoagulation and routine statins as CAA therapy. The Alzheimer card uses the lesson's approximately 79% study estimate with its histological and denominator qualifiers. Treatment now emphasizes blood-pressure control and individual indication/risk assessment without prescribing an agent or timing.

The old `klinik-chronisch` card now focuses on cognition; acute symptoms, seizures and headache each have their own new focused card. Knowledge is covered by concepts and practical discriminators rather than memorising all text, case authors, image counts or UI mechanics.

## Sources checked

- [Charidimou et al., Boston v2.0, 2022 — original study and diagnostic table](https://epub.ub.uni-muenchen.de/112501/1/nihms-1825040.pdf)
- [Jensen-Kondering et al., CAA imaging review, 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11592298/)
- [Van Ly et al., convexity SAH practical guide, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10579515/)
- [Smith et al., CAA-related TFNE, 2021](https://pubmed.ncbi.nlm.nih.gov/34016709/)
- [Jäkel et al., CAA prevalence meta-analysis](https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.12366)
- [Yamada, epidemiology and pathology](https://pmc.ncbi.nlm.nih.gov/articles/PMC3079153/)
- [Carmona-Iragui et al., Down syndrome and CAA](https://pmc.ncbi.nlm.nih.gov/articles/PMC5660938/)
- [Akers et al., cavernous malformation recommendations, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12680281/)
- [Heit et al., intracranial haemorrhage imaging](https://pmc.ncbi.nlm.nih.gov/articles/PMC5307932/)
- [Choi et al., haemorrhagic infarction versus ICH](https://pmc.ncbi.nlm.nih.gov/articles/PMC3328163/)
- [AHA/ASA spontaneous ICH guideline, 2022](https://www.ahajournals.org/doi/10.1161/STR.0000000000000407)

## Validation

The repository MCQ audit passed through `tsx`: 589 questions and 15 cases per language, valid options, answer IDs and distractor feedback. The CAA aggregators contain 18 questions and 32 cards; all original question IDs and the first 15 flashcard IDs/order are preserved.

Browser verification mounted the real quiz and flashcard screens in temporary local routes (removed before publication). All 54 question/language combinations were answered incorrectly to verify the shuffled option's specific feedback; the correct-answer branch was also checked on mobile in all three languages. All 32 cards were revealed with their details in German; representative longer/new cards were checked in English/Persian and on mobile (47 card flows), followed by six targeted final epidemiology-card checks. No runtime errors, framework overlays or horizontal overflow occurred. Temporary practice-box records belonged to a disposable browser context; no user account data was changed.

The epidemiology card follows the lesson's approximate 15% estimate with a published 5–20% range rather than teaching the previous 15–20% as a fixed fraction. The production build passed with 203 routes. Publication is followed by verification of the live quiz/flashcard assets.

## English and Persian translation review — 2026-10-15

Reviewed 647 trilingual copy entries across the lesson, interactive panels, case captions, WM image labels and study bank. Revised 43 English and 138 Persian entries for faithful medical meaning, natural phrasing and consistent terminology. Persian now distinguishes blood breakdown products from transfusion products, defines spreading paraesthesias, uses consistent TFNE/PVS/white-matter terminology and states the multispot total across both hemispheres explicitly. The English counting highlights follow the revised text.

Two flashcard explanations used the broader term “intracranial haemorrhage” as a Boston qualifying presentation. Aligned all three languages with **spontaneous intracerebral haemorrhage (ICH)** in [Table 2 of the original Boston v2.0 study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/), matching the maintained lesson. The remaining German copy, numerical values, answer keys and study IDs are preserved. The bank still contains 18 questions per language and 32 flashcards.

Validation checks every localization tuple, numeric values, stable question/card IDs, correct-answer IDs, distractor-feedback mappings and the five WM counting highlights. Rendered QA covers all interactive lesson panels in English/Persian at 1440px and 390px; all 36 English/Persian question flows and 72 card flows (every card on mobile in both languages, plus representative desktop cards) passed. The correct-answer branch was also checked in all three languages. The repository-wide MCQ audit remains valid.
