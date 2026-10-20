# Atelektase / Rundatelektase — Thorax.pdf p. 11

## Scope and route

- Existing curriculum ID: `atelektase` (no new ID proposed).
- Existing route: `/thorax/hrct/dichteanhebung`, section hash `#atelektase`.
- This source addition belongs in the existing HRCT density lesson. Do not create a duplicate route.
- Learning promise: identify volume loss as the key imaging feature of atelectasis, recognize secondary displacement signs, and describe the characteristic constellation of rounded atelectasis without treating the comet-tail sign as independently diagnostic.
- Audience: radiology learners familiar with basic thoracic CT anatomy.

## Chapter outline and visual plan

1. Volume loss: compare regional lung size and attenuation; inspect fissures, hilum, bronchovascular structures, and ipsilateral diaphragm.
2. Rounded atelectasis: recognize the pleural-based smooth rounded-to-triangular opacity, pleural scarring/folding, and curved bronchovascular convergence toward the hilum.
3. Pitfall: a rounded opacity can mimic peripheral neoplasm. If the supportive pleural/volume-loss constellation is absent or the lesion is atypical, growing, or otherwise suspicious, do not close the differential on the comet-tail sign alone.
4. Retrieval already linked to the lesson: MCQs ask for the volume-loss/fissural-shift combination and for the rounded opacity/comet-tail constellation. The lesson's existing quiz architecture remains linked at parent HRCT ID.

Visual: retain the existing CT case image `public/hrct/dichteanhebung/image2.jpeg` (Radiopaedia rID 8563), which matches the source CT example. Remove the decorative comet photograph and unrelated pulmonary-infarct image from this section. The CT caption now identifies the finding, source case ID, and that the image is also reproduced in the supplied PDF. In the supplied PDF page, the case is labelled `rID: 8563`; no contributor name or external license is visible there. Image reuse in the project is authorized by the user for supplied PDF images; external licensing/attribution details remain unverified.

## Source coverage ledger

| Claim ID | Source and page | Source content | Importance | Lesson destination | Status / qualification |
|---|---|---|---|---|---|
| ATE-11-01 | `Thorax.pdf`, physical p. 11 (printed p. 10) | Atelectasis is reduced ventilation, often from resorption of distal air after bronchial obstruction. | Core | Existing `#atelektase` lead/cards | Included in concise form; no cause is inferred from the image alone. |
| ATE-11-02 | Same | Reduced volume of the affected lung region is the most important radiologic correlate; density also increases, potentially to consolidation. | Core | Lead and volume-loss card | Included; wording emphasizes volume loss over opacity alone. |
| ATE-11-03 | Same | Secondary signs: mediastinal shift, fissure displacement, bronchial/vascular displacement, elevated diaphragm. | Core | Volume-loss card | Included as possible secondary signs; direction/context phrasing kept cautious. |
| ATE-11-04 | Same | Rounded/roll atelectasis: pleural-adjacent, smooth, approximately hemispheric or triangular consolidation; visceral pleural scar may fold lung. | Core | Rounded-atelectasis card | Included with “rounded to triangular” wording. |
| ATE-11-05 | Same | Curving bronchovascular bundle enters lesion toward hilum; PDF calls comet-tail sign “pathognomonic.” | Core | Rounded-atelectasis card; self-check | Pattern retained as characteristic/supportive in the constellation; “pathognomonic” is not repeated as a stand-alone rule. |
| ATE-11-06 | Same | CT example alongside comet mnemonic; visible label `rID:8563`. | Core visual | Existing CT case `image2.jpeg` | Matched to existing image and retained. The comet photo is removed because it is a mnemonic, not imaging evidence; unrelated infarct image removed from this section. |
| ATE-EXT-01 | Bankier et al. Fleischner Society Glossary. *Radiology*. 2024. DOI: 10.1148/radiol.232558. https://pubs.rsna.org/doi/full/10.1148/radiol.232558 | Rounded atelectasis is rounded collapsed lung associated with invaginated fibrotic pleura; pleural-adjacent mass and converging vessels/bronchi may form comet-tail. | Qualification | Rounded-atelectasis card / terminology | Used to validate terminology and constellation; not a PDF coverage substitute. |
| ATE-EXT-02 | Kim et al. “Pictorial Review of Pleural Disease: Multimodality Imaging and Differential Diagnosis.” *RadioGraphics*. 2023. DOI: 10.1148/rg.230079. https://pubs.rsna.org/radiographics/doi/10.1148/rg.230079 | Typical imaging constellation includes pleural abnormality, pleural-abutting lung finding, swirling/comet-tail, and volume loss; not specific to asbestos. | Qualification | Caveat | Supports describing the constellation and avoiding single-sign certainty. |
| ATE-EXT-03 | Lynch et al. “Asbestos-related focal lung masses: manifestations on conventional and high-resolution CT scans.” *Radiology*. 1988;169(3). DOI: 10.1148/radiology.169.3.3186982. https://pubs.rsna.org/doi/abs/10.1148/radiology.169.3.3186982 | In an asbestos-exposed cohort, CT clues included adjacent pleural thickening, lentiform/wedge outline, adjacent volume loss, and vessels/bronchi sweeping into the mass; less advanced cases showed fewer classic features. | Qualification | Caveat / self-check | Supports requiring pattern-level assessment rather than interpreting a single sign in isolation. |

## Translation terminology

| Concept | DE | EN | FA |
|---|---|---|---|
| Volume loss | Volumenverlust | volume loss | کاهش حجم |
| Fissure displacement | Fissurenverlagerung | fissural displacement | جابه‌جایی فیشور |
| Rounded atelectasis | Rundatelektase / Rollatelektase | rounded atelectasis | آتلکتازی گرد |
| Comet-tail sign | Kometenschweifzeichen | comet-tail sign | علامت دم‌دنباله‌دار |
| Pleural-based | pleuranah | pleural-based | مجاور پلور |

## Limitations and verification

- Physical p. 11 was visually rendered and reviewed; text extraction was also reviewed. Printed page number is 10.
- Independent source/content/visual/language/assessment review and delta retest: PASS. The source ledger now matches the rendered definition and secondary signs; focused DE/EN/FA + RTL SSR and scoped `git diff --check` pass.
- This is a bounded addendum to the existing HRCT lesson, not a complete atelectasis differential or management pathway.
- The case image remains a single selected axial CT example, not a multi-slice diagnosis or universal presentation.
- The PDF case contributor and external image reuse license are not visible/independently verified; project reuse is based on the user's explicit authorization for images contained in the supplied PDFs.
- Scientific/editorial authoring does not constitute clinical approval. Browser/device/theme evidence for the existing route is still outstanding.
