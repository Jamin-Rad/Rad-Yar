# Gehirn.pdf pp.12–17: EDH, SDH und SAB

## Scope and evidence

This is a bounded source-to-lesson audit of `Gehirn.pdf`, physical pages 12–17 (printed folios 11–16). The six page images were independently inspected at `tmp/pdfs/brain12-24/p-12.png` through `p-17.png`; this confirmed visual ordering, figures and the source table. Coverage below is page-specific and does not imply a full lesson or scientific audit. The PDF's illustrative CT examples are source material authorized by the user, but this batch did not copy or alter them.

| PDF page (printed folio) | Source point | Existing lesson location | Result / action |
|---|---|---|---|
| 12 (11) | EDH is extra-axial and commonly traumatic; lentiform/biconvex morphology | `/gehirn/trauma/epidurale-blutung`, `data/edh.js` | Existing lesson covers the mapped points; no supported omission found in this bounded comparison. |
| 12 (11) | Usually limited by sutures; fracture-associated suture diastasis is an exception | EDH section on margins / sutures | Covered, including the exception. |
| 12 (11) | Swirl sign suggests unclotted blood/ongoing bleeding, with caveat | EDH CT-sign section | Covered with uncertainty caveat. |
| 13 (12) | Trauma CT window width 100–150 HU | EDH CT technique section | Covered. |
| 14 (13) | SDH crescentic shape, broad distribution and mass effect | `/gehirn/vaskulaer/subduralhaematom`, `data/sdh.js` | Covered in existing lesson; no supported omission found. |
| 14 (13) | Acute/subacute/chronic attenuation evolution and examples/timeline | SDH density/time-course section | Covered; exact intervals remain approximate and are not promoted to precise dating. |
| 14 (13) | Hygroma as a relevant differential/context | SDH associated findings | Covered. |
| 15 (14) | SAH aetiology and blood-distribution clues | `/gehirn/vaskulaer/subarachnoidalblutung`, `data/sab.js` | Retained qualitative distribution-to-source clues. Removed unqualified location/cause percentages from the lesson/assessment where they did not help pattern recognition. |
| 15 (14) | Hunt–Hess and original Fisher scales | SAB clinical/grading sections | Existing grading content retained; detailed clinical use is outside the PDF's radiology emphasis. |
| 15 (14) | Modified Fisher: thickness plus IVH | SAB grade content and linked flashcards | Clarified as a blood-burden classification; removed several percentages presented as individual risk estimates. Assessment focuses on grade criteria. |
| 16 (15) | Noncontrast CT and attenuation/distribution clues | SAB CT section | Pattern and distribution teaching retained. Removed unqualified sensitivity percentages. |
| 16 (15) | CTA/DSA and likely source distribution | SAB vascular imaging section | Distribution remains a search clue, not proof. Claims that CTA/DSA is mandatory or optional for every perimesencephalic pattern were removed. |
| 16 (15) | FLAIR and LP in context | SAB supplemental diagnostic section, CT timing table, `sab-q1`, `sab-fc-4` | Further testing is framed by timing, examination, CT quality and clinical suspicion. AHA/ASA 2023 considers a high-quality NCCT interpreted by a **board-certified neuroradiologist** reasonable for ruling out aSAH when performed **<6 hours** after onset in a patient without a new deficit; after **>6 hours** or a new deficit with a negative CT, LP is recommended. Exactly 6 hours is explicitly outside that CT-only recommendation and requires clinical assessment. |
| 17 (16) | Rebleed, hydrocephalus, vasospasm/DCI, hyponatraemia and timeline | SAB complication section and assessment | Complications retained with time-course caveats. Static source treatment claims were removed or softened; current guideline-supported aneurysm securing and early enteral nimodipine statements were used. No fixed electrolyte treatment advice was added. |

## Curriculum outline and media plan

Existing instructional sequence retained; no generic chapter was added:

1. **Klinik und Ätiologie** — recognize warning presentation and interpret likely source from the blood pattern.
2. **CT-Diagnostik** — identify acute subarachnoid blood and describe cisternal, sulcal and ventricular distribution.
3. **Fisher-Skalen** — classify blood burden and distinguish original Fisher from Modified Fisher criteria.
4. **Gefäßdiagnostik** — use CTA/DSA in context and treat distribution as a search clue.
5. **Komplikationen** — recognize rebleeding, hydrocephalus and DCI/vasospasm over time.
6. **Take-home messages** — compress safe reporting and diagnostic-pathway points.

Media: the supplied PDF includes an EDH anatomy sketch (p.12) and SDH CT examples/timeline (p.14), but this batch did not add them to the site. The SAB route uses a code-authored conceptual header schematic and, in the CT section, an axial non-contrast CT frame from Radiopaedia case rID 28096 (study 28351), contributed by Frank Gaillard. The frame was visually inspected in the case viewer; attribution, case link and teaching caption are provided. The user explicitly authorized Radiopaedia reuse in RadYar, including subscription revenue. The frame is a patient example, unlike the conceptual header.

## Clinical evidence used for SAB wording

- AHA/ASA, 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage, [official guideline DOI](https://doi.org/10.1161/STR.0000000000000436): CT/LP pathway, DSA after negative/inconclusive CTA when aneurysmal concern remains, unresolved CTA-alone versus DSA choice for a classic perimesencephalic pattern, prompt aneurysm securing preferably within 24 hours, early enteral nimodipine, and recommendations against prophylactic hemodynamic augmentation/hypervolemia.
- Modified Fisher: Claassen et al. (2001), [PubMed](https://pubmed.ncbi.nlm.nih.gov/11546890/); validation by Frontera et al. (2006), [PubMed](https://pubmed.ncbi.nlm.nih.gov/16823296/). The previous lesson's exact grade-specific percentages were not retained as calibrated individual prognoses.

## Verification and remaining gates

- Source visual inspection: pp.12–17 inspected. Source evidence is primary for coverage; figures were not re-used.
- EDH/SDH: mapped lesson coverage found in place; no content edits made in this batch.
- SAB: assessment and data wording revised in `data/sab.js`; route refactored to `StandardLessonShell` / `LessonHero` in DE/EN/FA, with the previous Diverticulitis stylesheet dependency removed.
- Full asset-rights audit, route-by-route visual browser review, independent AI reviewer, and Dr. Zia's scientific approval remain open. A build or automated audit does not close those gates. The user confirmed explicit Radiopaedia permission for RadYar, including subscription revenue; correct per-image attribution remains necessary.
- The SAB route shell uses `StandardLessonShell` and a self-authored conceptual header diagram, with translated alt text that identifies it as non-diagnostic. A separate real NCCT frame from rID 28096 is now included in the CT section.
- **VIS: PARTIAL**: the selected CT frame was visually checked in the source viewer and is suitable as a classic SAH example. The local RadYar render of the external image and full desktop/mobile page remain unverified. The case discussion cautions that blood distribution alone does not reliably locate the responsible aneurysm.
- Existing EDH supplemental treatment statements and SDH clinical details beyond these six PDF pages were not scientifically revalidated here.
- Independent SAB review delta found and the author corrected a thunderclap-headache wording conflict, harmonized Persian hydrocephalus/cardiopulmonary content with DE/EN, and removed a deterministic sentinel-headache-to-rebleed chain from the connected card. The reviewer also verified the case identity and source-viewer appearance for rID 28096, but could not verify the local external-image request because the lesson is behind sign-in. The image now has a concise localized visual alt, while case/source attribution remains in the figure caption.
