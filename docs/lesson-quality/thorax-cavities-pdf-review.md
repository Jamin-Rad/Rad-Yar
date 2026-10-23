# Thorax pulmonary cavities: source and media review

This is an authoring ledger, not clinical approval. Physical PDF page numbers are
used. The source map in `pdf-map-abdomen-thorax.md` records that pages 25 and 26
were rendered and visually reviewed for this topic. This focused route is linked
from the exact existing curriculum IDs `lungenabszess`, `tuberkulose`, and
`aspergillus-lunge`; `lungenabszess` links here; `tuberkulose` and `aspergillus-lunge` retain their established canonical routes and list this as a related focused lesson.

## Page coverage

| Source point | PDF page | Priority | Lesson location | Disposition |
|---|---:|---|---|---|
| Cavity/cavern and cyst differential; compare morphology, wall and surrounding finding | Thorax.pdf p. 25 | Essential | `read-the-space` | Covered as morphology, not as a stand-alone etiologic or thickness-threshold diagnosis; current Fleischner terminology source linked. PDF wall figures (`≥1 mm`, often `>4 mm`, cyst `<2 mm`) and cutoffs (including the suggested `>15 mm` malignancy clue) are explicitly not taught as universal rules; the small CT cohort by Nin et al. (96 solitary cavities) supports pattern association but its fitted cutoffs are not universal. |
| Lung abscess imaging and air-fluid level | Thorax.pdf p. 26 | Essential | `infection-patterns` | Covered concisely; CT distinction from pleural empyema is supplemented by the cited radiology review. Air-fluid level is explicitly non-specific. |
| Cavitary tuberculosis | Thorax.pdf pp. 25–26 | Essential | `infection-patterns` | Covered as a pattern that supports suspicion in context; CDC source explicitly says imaging does not definitively diagnose TB. Existing broader primary/post-primary/miliary patterns remain at `/thorax/tuberkulose-muster`. |
| Aspergilloma, air crescent and mobility | Thorax.pdf pp. 25–26 | Essential | `infection-patterns` | Covered with IDSA/ERS references. Air crescent is not treated as specific; positional mobility supports a free intracavitary fungal ball but is not a stand-alone proof. |
| Cavitating bronchial carcinoma, particularly squamous cell carcinoma | Thorax.pdf p. 26 | Essential differential | `infection-patterns` | Added the source's eccentric cavity-within-lesion cue to the trilingual comparison. Thick/irregular morphology raises consideration but does not diagnose tumour. The PDF's prevalence claim (“most frequent cavitating bronchial carcinoma”) is explicitly deferred and not copied; no wall-thickness cutoff is copied from the lecture. |
| CT case frame | Thorax.pdf p. 25 | Visual evidence | `caseImage` in `data/thoraxCavities.js` | Axial CT lung-window panel rendered at 300 dpi, cropped and inspected. The inspected crop visibly contains rID 16033 only; site and contributor are not independently verified. Provenance record: `/public/educational/thorax-cavities.provenance.json`. User has authorized project reuse of PDF images. The crop illustrates cavity and adjacent nodules; it does not establish etiology. |
| CT case frames for abscess, TB and aspergilloma | Radiopaedia links in lesson sources | Further visual study | Linked source pages only | Attributed abscess rID 97293 (Stefan Tigges) and cavitating TB rID 30280 (Henry Knipe) remain external links, not embedded frame-level evidence. Aspergilloma mobility is described from PDF pp.25–26 and current cited guidelines; no independent diagnostic case image is claimed for that movement. |

## Learning path and visuals

1. Describe the space: relation to a lesion, shape, wall, contents and surroundings.
2. Compare abscess, cavitary TB and aspergilloma without turning one sign into a diagnosis.
3. Apply the mobility clue in a localized self-check and review four practical take-home rules.

The SVG `/public/educational/thorax-cavity-vs-cyst.svg` is a code-native explanatory
diagram. It is labelled in three languages via the page's accessible alt and
legend and explicitly states that it is not diagnostic imaging. The page also
shows one actual PDF CT panel with the visible rID 16033 retained; no contributor credit is asserted. This is a single cavity example; separate abscess and TB case links are not embedded, while a frame demonstrating aspergilloma positional mobility remains an open visual requirement.

## Claim sources consulted

- Bankier et al. Fleischner Society Glossary of Terms for Thoracic Imaging.
  *Radiology*. 2024;310(2):e232558. [doi:10.1148/radiol.232558](https://doi.org/10.1148/radiol.232558).
- Williford ME, Godwin JD. Computed Tomography of Lung Abscess and Empyema. *Radiologic Clinics of North America*. 1983;21(3):575–583. [PubMed PMID 6635173](https://pubmed.ncbi.nlm.nih.gov/6635173/).
- American College of Radiology. Acute Respiratory Illness in Immunocompetent
  Patients, revised 2024. [ACR Appropriateness Criteria](https://acsearch.acr.org/docs/69446/narrative/).
- Centers for Disease Control and Prevention. [Clinical and Laboratory Diagnosis
  for Tuberculosis](https://www.cdc.gov/tb/hcp/testing-diagnosis/clinical-and-laboratory-diagnosis.html).
- Patterson et al. IDSA Clinical Practice Guideline for Aspergillosis. *Clinical
  Infectious Diseases*. 2016;63(4):e1–e60. [Guideline](https://www.idsociety.org/practice-guideline/aspergillosis/).
- Denning et al. Chronic pulmonary aspergillosis: rationale and clinical
  guidelines for diagnosis and management. *European Respiratory Journal*.
  2016;47:45–68. [doi:10.1183/13993003.00583-2015](https://doi.org/10.1183/13993003.00583-2015).
- Kunihiro et al. High-resolution CT findings of primary lung cancer with
  cavitation: a comparison between adenocarcinoma and squamous cell carcinoma.
  *Clinical Radiology*. 2016;71(11):1126–1131.
  [doi:10.1016/j.crad.2016.06.110](https://doi.org/10.1016/j.crad.2016.06.110).
- Nin et al. Solitary lung cavities: CT findings in malignant and non-malignant
  disease. *Clinical Radiology*. 2016;71(11):1132–1136.
  [doi:10.1016/j.crad.2016.04.009](https://doi.org/10.1016/j.crad.2016.04.009).
- Radiopaedia case attribution links: Stefan Tigges, lung abscess rID 97293;
  Henry Knipe, cavitating lung lesion—tuberculosis rID 30280. Both pages are
  cited in the lesson; the original image series has not been embedded.

The original review deferred the PDF p.25 location examples for GPA, septic emboli,
pulmonary infarct and Klebsiella from the focused four-pattern lesson. Their
bounded follow-up is recorded below.

## Topography delta (2026-10-23)

The location examples on physical p.25 / printed p.24 are now included in three
short rows in the existing morphology table, with no new chapter or disease
route. Reactivated TB and cavitating Klebsiella infection are compatible upper-
lobe considerations, not pathogen-identifying locations. Multiple peripheral
nodules (sometimes cavitating) and pleura-based wedge-shaped opacities support
consideration of septic pulmonary emboli only in clinical context. A peripheral
wedge-shaped opacity may also represent infarction; cavitation is explicitly
rare. GPA and pulmonary metastases remain among the possibilities for multiple
cavitary nodules; morphology and distribution overlap. A new embedded self-check
tests the septic-embolism pattern and its context limitation. No location or
sign is treated as diagnostic.

Clinical cross-checks: Chou et al. (20-patient retrospective ICU cohort) for
septic pulmonary emboli, PMID 27759843; Russell et al. (225-patient GPA imaging
cohort), PMID 28992397; Giacomelli et al. (102-patient retrospective cohort of
multiple cavitary lung lesions), PMID 31859704; Yoo et al. (small retrospective series of complicated
Klebsiella infection), PMID 7890837; and a 2025 case report/literature review
for the rare possibility of cavitary pulmonary infarction, PMCID PMC12677935.
These sources support pattern associations with different strengths and do not
make the patterns specific. A 198-patient Klebsiella CT cohort (PMID 19034459)
did not establish an upper-lobe cavitation rule; accordingly, upper-lobe
topography is not used to identify Klebsiella. The reviewer also found no direct
support in the cited Chou cohort for a basal distribution; the lesson therefore
uses only the supported peripheral location. The current CT image illustrates
one cavity and nearby nodules only; it does not illustrate or validate this new
set of etiologic patterns. A localized code-native schematic maps distribution
concepts only and is captioned as non-diagnostic. The independent delta reviewer
passed SRC, EDU, VIS, LNG, ASM and REV after corrections. UX remains blocked
because the local server could not be reached from the browser; focused SSR tests
do not substitute for browser QA. Clinical approval remains separate.

The sources support pattern teaching only. They do not constitute scientific
approval of the finished RadYar lesson. Independent bounded source/education/
visual/language/assessment/integration review and delta retests for the original
four-pattern lesson passed; the author closed the citation, case-attribution
boundary, canonical curriculum mapping, and language-preserving related-link
findings. The 2026-10-23 topography delta passed independent SRC, EDU, VIS, LNG,
ASM and REV review after corrections; its UX gate remains blocked pending live
browser evidence. The original rID 16033 case page,
contributor and external reuse terms remain unverified; the PDF image itself is
user-authorized for project use. Live browser UX and specialist clinical approval
remain pending. No actual positional aspergilloma image or complete case stack is
included, so those recognition tasks are not covered.

## Assessment integration delta (2026-10-22)

The lesson's embedded check remains about a mobile intracavitary fungal ball. A
separate exact-topic MCQ and one flashcard now assess the PDF p.26 lung-abscess /
pleural-empyema distinction in DE/EN/FA. Both emphasize location and morphology;
an air-fluid level alone does not determine cause. Curriculum ID `lungenabszess`
links to `/ueben/quiz?fach=thorax&n=1&themen=lungenabszess` and
`/flashcards/lungenabszess`; lesson actions return to `#infection-patterns`.
Focused retrieval and lesson-action link checks are recorded in
`scripts/test-thorax-lung-abscess-assessment.mjs`. Independent review, browser UX and
clinical approval remain pending until their evidence is recorded.

## Related-route navigation delta (2026-10-23)

The pneumonia-pattern route now exposes the curriculum-declared related cavity lesson with a localized, language-preserving link. This closes the assertion in `scripts/test-thorax-cavities-render.mjs`; the render test passes in DE/EN/FA. No diagnostic or clinical content changed. Browser click-through remains unverified.
