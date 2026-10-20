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

PDF p. 25 also lists GPA, septic emboli, pulmonary infarct and Klebsiella location examples; they are deferred from this focused four-pattern lesson and should not be read as fully covered.

The sources support pattern teaching only. They do not constitute scientific
approval of the finished RadYar lesson. Independent bounded source/education/
visual/language/assessment/integration review and delta retests PASS; the author
closed the citation, case-attribution boundary, canonical curriculum mapping,
and language-preserving related-link findings. The original rID 16033 case page,
contributor and external reuse terms remain unverified; the PDF image itself is
user-authorized for project use. Live browser UX and specialist clinical approval
remain pending. No actual positional aspergilloma image or complete case stack is
included, so those recognition tasks are not covered.
