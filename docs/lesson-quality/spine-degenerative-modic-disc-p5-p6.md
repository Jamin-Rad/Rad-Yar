# Wirbelsäule: Modic und Bandscheibenpathologien (PDF S. 5–6)

Stand: 21.10.2026. Begrenzter Abgleich der physischen PDF-Seiten 5–6 (Druckseiten 4–5) mit der bestehenden Lektion `/wirbelsaeule/degenerative`. Das ist ein Quellen-/Abdeckungsprotokoll, keine klinische Freigabe.

Quelle: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Wirbelsäule.pdf`, 29 Seiten. Beide Seiten visuell geprüft; PDF S. 5 als Bild bei 160 dpi, S. 4–6 zusätzlich im Seitenkontext bei 120 dpi angesehen. Die Bildtafel auf S. 5 trägt `rID:79624`; Sequenzparameter und Contributor-Angabe sind auf der Seite nicht angegeben. Das sagittale T1/T2/DWI-Triptychon ist für die Lektion aus dem Nutzer-PDF beschnitten und unverändert übernommen (`public/educational/spine-modic-mri-pdf-p5.jpg`). Die Bildkennung im Seitenrand reicht hier nicht als externe Contributor-Angabe; keine weitergehenden Zuschreibungen werden ergänzt.

| Source item | Exact source | Existing lesson disposition | Status / note |
|---|---|---|---|
| Modic I: Ödem, T1 signal ↓, T2 signal ↑ | PDF S. 5 / printed p. 4 | `/wirbelsaeule/degenerative#modic`, first row | Covered; “active” is not promoted to a symptom/severity claim. |
| Modic II: fat, T1 ↑, T2 ↑ | PDF S. 5 / printed p. 4 | `#modic`, second row | Covered as the PDF’s signal pattern. |
| Modic III: sclerosis, T1 ↓, T2 ↓ | PDF S. 5 / printed p. 4 | `#modic`, third row | Covered. |
| DWI claw: two linear, endplate-parallel high-signal bands around the disc on high b-values in degenerative Modic-I change | PDF S. 5 / printed p. 4 | `#modic` note | Covered cautiously as an adjunct; no standalone infection rule is stated. |
| Sagittal T1/T2/DWI image example, rID 79624 | PDF S. 5 / printed p. 4 | `#modic` source figure | Added an unaltered crop with exact page/ID; parameters not reported by source. It illustrates the supplied case and is not an independent reread. |
| Herniated disc morphology: protrusion, extrusion, sequestration | PDF S. 6 / printed p. 5 | `#disk`, comparison rows | Existing comparison retained. For general terminology, extrusion/sequestration wording should follow the 2014 consensus; the PDF’s shorthand “intact annulus” for protrusion is not repeated. |
| Axial zones: median, paramedian/posterolateral, foraminal, extraforaminal | PDF S. 6 / printed p. 5 | `#disk` note | Covered; clarified that the structure at risk depends on vertebral level and that the affected level/structure must be stated. |

## Wissenschaftliche Einordnung

The original Modic classification describes vertebral marrow signal patterns adjacent to degenerative discs. Signal visibility and reader agreement depend on acquisition and sequence parameters, so the table is a pattern-recognition aid, not a stand-alone diagnosis or clinical activity score. The source page’s DWI claw statement is kept as a contextual adjunct; it is not a rule-out test.

The source’s disc morphology is aligned with the Spine/ASSR/ASNR/NASS consensus nomenclature: protrusion and extrusion are defined by the relative dimensions of the displaced component and its base; sequestration denotes loss of continuity with the parent disc. “Bulge” is not used as a synonym for a focal herniation. The source’s location list is retained with anatomy-sensitive wording; in particular, a lumbar central lesion below the conus should not be labeled spinal-cord compression.

## Verifikation / offene Punkte

- Existing route found before editing: `app/wirbelsaeule/degenerative/page.js` renders the route; content is in `data/spineDegenerative.js` and already included the Modic table and disc-morphology/location teaching points.
- Added the source sagittal MRI crop only to the existing Modic chapter. The existing route renderer already supports a chapter-local `visual` object.
- No separate route was created. The existing curriculum ID `bandscheibenpathologien` links to `/wirbelsaeule/degenerative#disk`, a four-question filtered quiz and a matching flashcard topic.
- The existing Modic section is now separately discoverable through the exact curriculum ID `osteochondrosis-intervertebralis`, linked to `/wirbelsaeule/degenerative#modic`, one source-bounded localized MCQ, and one localized flashcard. The route exposes direct quiz/card actions that return to the Modic anchor. This does not duplicate or broaden the disc-pathology module.
- Scientific references below support terminology and interpretive limits, but do not clinically validate the particular source image.
- Pending checks: independent reviewer for the new Modic assessment integration; browser visual inspection; expert clinical sign-off. A build or code review does not establish diagnostic correctness.

## References

- Modic MT, et al. *Degenerative disk disease: assessment of changes in vertebral body marrow with MR imaging.* Radiology. 1988;166:193–199. [PubMed PMID 3336678](https://pubmed.ncbi.nlm.nih.gov/3336678/).
- Fields AJ, et al. *Measuring and reporting of vertebral endplate bone marrow lesions as seen on MRI (Modic changes): recommendations from the ISSLS Degenerative Spinal Phenotypes Group.* Eur Spine J. 2019;28:2266–2274. [PubMed PMID 31446492](https://pubmed.ncbi.nlm.nih.gov/31446492/).
- Patel KB, et al. *Diffusion-weighted MRI “claw sign” improves differentiation of infectious from degenerative Modic type 1 signal changes of the spine.* AJNR. 2014;35:1647–1652. [PubMed PMID 24742801](https://pubmed.ncbi.nlm.nih.gov/24742801/).
- Fardon DF, et al. *Lumbar disc nomenclature: version 2.0.* Spine J. 2014;14:2525–2545. [PubMed PMID 24768732](https://pubmed.ncbi.nlm.nih.gov/24768732/).

## Review-fix delta (21.10.2026)

- The source MRI figure caption now gives a concrete read prompt: compare endplates on T1/T2, then locate the paired bands on DWI. The original PDF sequence labels are retained and attributed to PDF S. 5 / printed p. 4, rID 79624; no new diagnostic overlay was drawn onto patient data.
- Added `public/educational/spine-disc-morphology-and-zones.svg`, a non-diagnostic, language-neutral schematic. Its caption maps sagittal A/B/C to protrusion/extrusion/sequestration and axial zones 1–4 to central, subarticular, foraminal and extraforaminal locations.
- Curriculum ID `bandscheibenpathologien` now links to `/wirbelsaeule/degenerative#disk`, a four-question quiz and `/flashcards/bandscheibenpathologien`. Four MCQs and four flashcards have DE/EN/FA text and exact-topic retrieval tags.
- Source page has no sequence parameters or image contributor metadata. User-authorized PDF image reuse is recorded; no external image rights or contributor claims are inferred.
- Validation after this delta: source modules pass `node --check`; SVG parses as XML; targeted whitespace check passes. The dedicated audit/build could not run in this checkout because project dependencies are absent; rendered/browser validation remains pending independent reviewer access.

## Independent-review delta (21.10.2026)

- Correction to the prior prompt: the low-resolution DWI panel is retained as part of the supplied sagittal triptych but is not used to claim that paired claw bands are visibly demonstrated. The prompt is limited to comparing adjacent endplate signal on T1/T2 and states that individual DWI signs cannot be reliably assessed at this crop resolution. The original source labels and exact attribution remain.
- Protrusion and extrusion now explicitly compare the base with the displaced component in the same plane. This wording appears in the lesson comparison table, the protrusion MCQ and its rationale, and the morphology flashcards; the extrusion criterion still specifies that the displaced component exceeds the base in at least one such plane, consistent with Fardon et al. (2014).
- This delta supersedes the earlier review-fix bullet that asked the reader to locate paired bands on the displayed DWI crop. That claim was not visually supported by the crop.
