# Cervicocephalic artery dissection — Gehirn.pdf pp.22–23

## Scope and lesson path

- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, physical pp.22–23 (printed folios 21–22).
- Existing lesson: `/gehirn/vaskulaer/gefaessdissektion`, data in `data/dissection.js`; linked DE/EN/FA MCQ and flashcard banks are registered from the same data module.
- This batch reconciles only the two PDF pages with the existing lesson, linked assessments and case references. It does not re-review the complete route, every case frame, browser UX or all linked assessment items.
- The source renders `tmp/pdfs/brain18-23/p-22.png` and `p-23.png` were visually inspected. The PDF's approximate epidemiology percentage was not transferred because its denominator and citation are not supplied in the notes.

## Page-by-page source coverage

| ID | PDF page / printed | Source point | Importance | Existing lesson / disposition |
|---|---|---|---|---|
| DIS-01 | 22 / 21 | Intimal tear or vasa-vasorum event → intramural haematoma → lumen narrowing/ischaemia or outward pseudoaneurysm | Essential | `patho` and `/dissection/dissection-pathway.svg`; thromboembolism mechanism in the linked lesson. |
| DIS-02 | 22 / 21 | Approx. 20% of strokes in patients younger than 50; prompt to consider dissection in young stroke | Supporting, statistic unresolved | The exact percentage is intentionally omitted: the source notes provide no denominator, population, date or citation. The broader “young adult with new head/neck pain and TIA/stroke” warning is covered in `basics`, hero card and `young-stroke` MCQ. Do not reinstate the percentage without a traceable source. |
| DIS-03 | 22 / 21 | Extracranial ICA usually 2–3 cm distal to bifurcation; vertebral artery V2/V3 | Essential | `basics.items` (“Typical vessels”), plus `location-ica` / `va-location` questions and cards. |
| DIS-04 | 22 / 21 | Neck pain, partial Horner syndrome, cerebral ischaemia; may be delayed/incomplete | Essential | `basics.items` and caveat; `triad` question/card explicitly state often incomplete and ischaemia may follow pain. |
| DIS-05 | 22 / 21 | Axial T1 fat-sat / black-blood mural haematoma, crescent sign; early T1 hyperintensity can be absent | Essential | `mri` table/caveat, `crescent` and `early-mri` MCQs, `crescent` / `early` flashcards. Lesson uses a 48–72 h caution, not an exclusion threshold. Early signal evolution is supported by the primary fat-suppressed MRI study below. |
| DIS-06 | 22–23 / 21–22 | String sign, flame-shaped taper/occlusion, pseudoaneurysm | Essential | `cta.rows`, `/dissection/imaging-signs.svg`, `string`, `flame` and `pseudo` assessment items. |
| DIS-07 | 23 / 22 | TOF-MRA pitfalls: slow/turbulent flow signal loss and T1-bright haematoma mimicking flow | Essential | `mri.rows`, caveat, `tof` MCQ and card. |
| DIS-08 | 22–23 / 21–22 | MRI crescent case rID 28441; CTA pseudoaneurysm case rID 58286 | Essential visual | Existing case viewer/attribution in `page.js`: Ian Bickle (rID 28441) and Heather Pascoe (rID 58286), both marked CC BY-NC-SA 3.0. PDF page render confirms the respective teaching targets; this batch does not re-audit every viewer frame or browser rendering. User authorized use of project PDF images and Radiopaedia cases. |
| DIS-09 | 23 / 22 | Ischaemic infarct most common; intracranial dissection can cause SAH | Essential | `complications.items`, `sah` and embolism questions/cards; intracranial extension included in structured reporting. |
| DIS-10 | 23 / 22 | Antithrombotic therapy for 3–6 months; source mentions stenting after treatment failure | Essential with clinical qualification | Individualised antiplatelet/anticoagulation 3–6 months retained. Stenting is described as non-routine. Non-exhaustive examples for multidisciplinary consideration include recurrent ischaemia despite optimal antithrombotic therapy, symptomatic hypoperfusion, or an expanding dissecting aneurysm causing compression, consistent with current AHA/ESO guidance. Visible guideline links are supplied in the complications section. |

## External evidence checked for clinical qualifications

- AHA scientific statement (2024): individualized antithrombotic choice for at least 3–6 months; acute thrombolysis/thrombectomy reasonable in otherwise eligible patients; stenting evidence is limited and is discussed for selected hypoperfusion cases: [Yaghi et al., *Stroke*](https://www.ahajournals.org/doi/10.1161/STR.0000000000000457).
- ESO guideline (2021): recommends against routine post-acute endovascular/surgical treatment; exceptional consideration includes recurrent ischaemic events despite optimal antithrombotic therapy or expanding dissecting aneurysm with compression after multidisciplinary review: [ESO guideline PDF](https://eso-stroke.org/wp-content/uploads/ESO_Dissection_Guideline_03092021.pdf).
- Early T1 fat-suppressed mural-haematoma signal: [primary MRI study, PMID 10598164](https://pubmed.ncbi.nlm.nih.gov/10598164/). This supports the caution that a very early study may not yet show T1 hyperintensity; it does not establish a universal hard diagnostic cutoff.

## Assessment and evidence limits

- Connected questions and cards cover young-stroke context, ICA/vertebral locations, the incomplete triad, Crescent sign, early false-negative MRI, string/flame signs, pseudoaneurysm, TOF pitfalls, stroke mechanism, intracranial SAH and individualized antithrombotic treatment.
- Focused independent review passed the bounded SRC/EDU/VIS/LNG/ASM delta after revising the intervention examples to be explicitly non-exhaustive; the identified reviewer finding was rechecked and resolved. `node scripts/test-gehirn-dissection-p22-p23.mjs`, data syntax and route JSX parsing passed.
- UX remains blocked: no authenticated browser evidence was available for rendered content, RTL, device widths, keyboard behavior or interactions. Independent review does not imply full-route clinical correctness or specialist sign-off.
- Source reconciliation is bounded to pp.22–23. A complete route-wide question/card review, frame-by-frame image audit, browser/RTL/device checks and specialist sign-off are not implied by this ledger.
- The approximate “20% under age 50” figure remains deliberately unresolved and omitted from learner-facing content until its source population and denominator can be established.
