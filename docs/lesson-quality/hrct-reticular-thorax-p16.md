# Reticular and reticulonodular pattern: Thorax.pdf p.16

Status: bounded reconciliation of the existing `/thorax/hrct/retikulaer-nodulaer` module. Physical PDF page 16 (printed page 15) was text-extracted and rendered for visual inspection. This record is not clinical sign-off.

## Identity and scope

- Curriculum ID: `hrct-retikulaer-nodulaer`; existing route only, no new route or lesson.
- Lesson module: `data/hrct-muster.js`; source page: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Thorax.pdf`, physical p.16 / printed p.15.
- Lesson outline retained: `Retikuläres Muster` — define the imaging pattern and its limits; smooth/irregular/nodular septal morphology remains in the same section. The added cards explain the reticular network, reticulonodular combination, PLC suspicion and contextual differentials.
- Reviewed source material: extracted text and rendered p.16 image; existing DE/EN/FA lesson cards and compact fact bank; image asset; route wrapper and linked assessment registry.
- Out of scope: full claim audit for the lesson’s pages 18–21, clinical approval, and publication.

## Source coverage and disposition

| PDF p.16 / printed p.15 claim | Lesson location | Disposition | Evidence or qualification |
| --- | --- | --- | --- |
| Fine linear opacities make a network; correlate with interlobular septal thickening or fibrosis | `retikulaer` card “Was bildet das feine Netz?” | Included, qualified | Pattern description and possible correlates do not establish etiology. |
| Reticulonodular pattern combines reticulation and superimposed small rounded nodules | `retikulaer` card “Wann ist ein Muster retikulonodulär?” | Included | Explicitly says morphology alone does not identify cause. |
| PLC may show irregular/nodular septal thickening and asymmetric involvement, in a malignancy context; nodules/adenopathy can coexist | `retikulaer` card “Wann an lymphangitische Tumorausbreitung denken?” | Included, qualified | Findings support suspicion but are nonspecific; focal/unilateral distribution is not diagnostic. Adenopathy is no longer called frequent in the compact fact bank. |
| PDF states focal or unilateral pattern in 50% and hilar/mediastinal adenopathy in 50% | Same PLC card | Fixed rates omitted | The consulted AJR 35-patient cohort reported diffuse (17/35), focal (13/35), and bilateral (5/35) findings as separate categories; it does not support combining “focal or unilateral” into one 50% rate. No universal adenopathy rate is taught. |
| Lymphoma and rare pediatric HIV-associated LIP as differentials | `retikulaer` card “Weitere Differenzialdiagnosen” | Included, contextualized | LIP is limited to the rare pediatric HIV context stated in the source. |
| Page image labelled `rID:44439` | Existing `image10.png`, localized image captions and media metadata | Retained | Rendered page image and local frame were visually matched as the same axial slice. Whether the local file came from a PDF crop or a separate source download is undocumented. Attribution `rID 44439` remains; original contributor and exact license terms were not independently verified. User has explicitly authorized use of Radiopaedia cases in RadYar; this is authorization context, not verification of contributor/license metadata. |

## Scientific sources consulted

- Munk PL et al. *Pulmonary lymphangitic carcinomatosis: CT findings.* Radiology. 1988;166(3):705–709. [RSNA article](https://pubs.rsna.org/doi/10.1148/radiology.166.3.3340765). Primary descriptive cohort supporting septal and peribronchovascular morphology; it does not establish a universal percentage for the PDF’s combined focal/unilateral category.
- *Pulmonary lymphangitic carcinomatosis: CT findings.* AJR. 2010. [DOI: 10.2214/AJR.09.3059](https://doi.org/10.2214/AJR.09.3059). Retrospective 35-patient cohort; diffuse (17/35), focal (13/35), and bilateral (5/35) are distinct reported categories, not a combined focal/unilateral rate. These cohort-specific categories are recorded here only to explain why the PDF's combined 50% generalization is not retained in the lesson.
- Jreige M et al. *Pulmonary lymphangitic carcinomatosis: diagnostic performance of high-resolution CT and 18F-FDG PET/CT in correlation with clinical pathologic outcome.* [PubMed PMID 31227574](https://pubmed.ncbi.nlm.nih.gov/31227574/). Histology-referenced diagnostic-performance study; used as support for treating imaging signs as suggestive rather than diagnostic.
- Hwang JH et al. Serial HRCT findings in pulmonary lymphangitic carcinomatosis. [Journal of the Korean Society of Radiology](https://jksronline.org/DOIx.php?id=10.3348%2Fjkrs.1997.37.6.1051). Primary imaging series supporting septal, linear and nodular manifestations.
- Johkoh T et al. CT findings in sarcoidosis, lymphoma and lymphangitic carcinoma. [PubMed PMID 10348442](https://pubmed.ncbi.nlm.nih.gov/10348442/). Comparative study used to keep differentials and septal morphology contextual rather than treating a single pattern as specific.
- McLoud TC et al. Thoracic disease in children with AIDS. Radiographics. 1996. [PubMed PMID 8946540](https://pubmed.ncbi.nlm.nih.gov/8946540/). Supports the pediatric HIV/LIP context; no claim of common adult PLC mimic is made.

## Review gates

| Gate | Status | Evidence / remaining blocker |
| --- | --- | --- |
| SRC | PASS | Source claims are reconciled; fixed 50% teaching rates omitted. The ledger distinguishes the cited cohort's diffuse/focal/bilateral categories from the unsupported combined PDF statement. |
| EDU | PASS | Pattern definitions are grouped before clinical applications; morphology remains supportive and does not diagnose etiology. |
| VIS | PASS | PDF and local image10.png show the same frame; localized captions point to visible asymmetric nodular septal thickening and retain rID attribution. Exact local derivation, original contributor and license terms remain unverified. |
| LNG | PASS | Independent review found DE/EN/FA cards and captions equivalent in claims, caveats, negation and context. |
| ASM | PASS | Existing MCQ/flashcard routes and question registration remain connected; no assessment content changed. Global MCQ audit passed. |
| UX | BLOCKED | Real browser and RTL interaction evidence not captured in this bounded audit. |
| REV | PASS | Independent review and delta recheck accepted the p.16 changes. This does not constitute specialist clinical approval or establish live publication. |

## Tests and browser evidence

- `npm run audit:mcq`: passed (719 questions and 18 cases per language).
- `node scripts/audit-abdomen-thorax-copy-parity.cjs`: passed for its listed subset; this route is not in that subset.
- `git diff --check`: passed.
- `node --import tsx scripts/test-hrct-distribution-p18-p24.mjs`: failed on an existing expected-value assertion: the script received page references `[24, 25, 26]` where it expected `[24]`. This is outside p.16 content and was not changed here; the p.18–24 ledger’s historical test-pass statement should not be read as evidence that this run passed.
- `node scripts/audit-abdomen-thorax-assessment-retrieval.mjs`: reviewer run failed on an unrelated `de/leberadenom` mismatch (5 actual retrieval entries vs 1 expected); no p.16 assessment content was changed.
- Browser route, interactive behavior, theme, and RTL: not tested in this cycle.

## Decision

Bounded author reconciliation completed; independent review pending. Open source/media provenance and browser-access evidence remain explicit. Dr. Zia scientific approval: pending. Publication: not requested.
