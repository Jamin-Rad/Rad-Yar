# Funikuläre Myelose — source and QA ledger

Date: 2026-10-20. Bounded scope: `Wirbelsäule.pdf`, PDF pp. 28–29 (printed pp. 27–28), curriculum ID `funikulaere-myelose`; route authored at `/wirbelsaeule/metabolisch/funikulaere-myelose`. The two full source pages were rendered at 120 dpi and inspected visually; text was extracted with pdfplumber and compared with both page images. Page 28 contains the clinical pattern, a T2 subsection and one axial MRI image credited only as `rID:33703`; page 29 continues with T1/T1+C, differential diagnoses and management. The PDF gives no contributor, sequence parameters beyond its position under T2, or original reuse terms. User authorization covers images in these PDFs, but this image is not reused because the source lacks enough image-specific metadata for a responsible diagnostic teaching claim.

## Learning path and visual plan

1. Connect B12 deficiency to paired posterior and lateral tract symptoms while keeping the MRI from becoming a stand-alone biochemical diagnosis.
2. Read symmetry and tract distribution on axial T2, then note the source's T1 and contrast descriptions and the limits of an unremarkable MRI.
3. Compare the PDF-listed mimics by distribution, onset and clinical context. The inverted-V pattern is explicitly non-specific and not pathognomonic.
4. Apply that limitation in one retrieval question with explanatory feedback.
5. End with three portable rules and a cautious, sourced urgency statement.

Visual plan: use a code-native, non-diagnostic axial concept diagram highlighting the paired posterior columns. It contains no patient data, does not imitate an MRI, and makes no claim about sagittal extent. The source MRI (rID 33703) is intentionally omitted from the lesson because page placement alone is not a sufficient sequence/frame caption for independent visual verification. The displayed source note records this evidence gap.

## Coverage

| Point | Source | Importance | Lesson location | Status |
|---|---|---:|---|---|
| B12-associated cord demyelination; primary posterior and secondary lateral columns; cervical / upper thoracic predominance | PDF p. 28 | Essential | Clinical lead and imaging extent | Included, source-attributed |
| Malabsorption, selected examples, diet without supplements, nitrous oxide | PDF p. 28 | Supporting | Clinical context table | Included, source-attributed |
| Symmetric paraesthesia, impaired vibration/position, sensory ataxia | PDF p. 28 | Essential | Clinical table | Included |
| Spastic paraparesis and increased reflexes/Babinski | PDF p. 28 | Essential | Clinical table | Included as corticospinal context |
| Axial T2 symmetric posterior-column hyperintensity / inverted V | PDF p. 28 | Essential | Imaging table, schematic and self-check | Included; “pathognomonic” corrected to “characteristic, not pathognomonic” and supported by clinical imaging literature |
| T1 usually unremarkable; chronic cord atrophy possible; usually no enhancement | PDF p. 29 | Supporting | Imaging table | Included as source statements; no absolute exclusion claim |
| MS: often eccentric, max. 1–2 segments per PDF, possible enhancement during relapse | PDF p. 29 | Essential differential | Differential table | Included as source heuristic; explicitly not a diagnostic cutoff or stand-alone exclusion criterion |
| Anterior spinal artery ischemia: anterior horns / owl-eye clue and sudden onset | PDF p. 29 | Essential differential | Differential table | Included cautiously; owl-eye is not presented as proof |
| HIV vacuolar myelopathy may be morphologically similar; context matters | PDF p. 29 | Essential differential | Differential table and self-check | Included; corroborated by intramedullary imaging review |
| Tabes dorsalis: dorsal root entry zone and possible meningeal enhancement | PDF p. 29 | Supporting differential | Differential table | Included as PDF clues, with clinical/serologic context retained |
| Immediate B12 replacement, early MRI reversibility, late irreversible gliosis | PDF p. 29 | Essential action/prognosis | Action section | Included as PDF summary; urgency cross-checked against NICE, without prescribing a dose |
| MRI may be normal despite suspected B12 myelopathy | Xiao et al., 36-person cohort, 2016 | Essential limitation | Imaging table | Added; study reported T2 abnormality in 19/36, so this is explicitly not an exclusion test |

## Terminology and evidence

| Concept | DE | EN | FA | Review note |
|---|---|---|---|---|
| Funikuläre Myelose / SCD | Funikuläre Myelose | subacute combined degeneration | دژنراسیون ترکیبی تحت‌حاد نخاع | Keep the distinct English standard name rather than literal “funicular myelosis” |
| Hinterstränge | Hinterstränge | posterior columns | ستون‌های خلفی | Posterior/dorsal tract distribution |
| Seitenstränge | Seitenstränge | lateral tracts | راه‌های جانبی | Avoid implying all lateral tracts are always involved |
| Inverted-V-Zeichen | inverted V | inverted V sign | علامت V وارونه | Characteristic pattern, not pathognomonic or specific |
| Sensible Ataxie | sensible Ataxie | sensory ataxia | آتاکسی حسی | Preserve the proprioceptive mechanism in all locales |
| Lachgas | Lachgas | nitrous oxide | نیتروس‌اکسید | Source says it inactivates B12; lesson only lists it as risk context |

External scientific checks used during authoring:

- Xiao et al. retrospectively studied 36 clinically confirmed patients; conventional T2 abnormalities were visible in 19/36, and an inverted-V appearance was seen in five. This supports treating an unremarkable MRI as a limitation and the sign as a pattern rather than pathognomonic proof: [PubMed 26965759](https://pubmed.ncbi.nlm.nih.gov/26965759/).
- Flanagan et al. describe HIV-associated vacuolar myelopathy with symmetric dorsal-column T2 signal resembling B12-related SCD: [AJNR 2018, DOI 10.3174/ajnr.A5881](https://pmc.ncbi.nlm.nih.gov/articles/PMC6108975/).
- NICE recommends taking diagnostic blood samples before treatment (1.3.4) and not delaying replacement while awaiting results in suspected megaloblastic anaemia with neurological symptoms (1.3.6): [NICE NG239 recommendations](https://www.nice.org.uk/guidance/ng239/chapter/recommendations).
- Bernetti et al. (2025 review) support symmetric posterior-column T2 pattern, occasional mild enhancement, chronic atrophy and MRI mimics: [Brain Sciences 2025;15(9):972](https://pmc.ncbi.nlm.nih.gov/articles/PMC12468238/).

## Verification and open evidence

The targeted SSR test checks the route in DE/EN/FA, RTL direction, shared shell and lesson hero, source scope, core translation parity, retrieval choices, primary/authoritative links, the journal metadata, the existing curriculum ID's route/status, and the absence of a pathognomonic claim. The source's “max. 1–2 segments” MS comparison is restored with an explicit heuristic caveat. `git diff --check` is also required. The code-native diagram was inspected as SVG source; visual browser rendering in dark/light themes, responsive widths, keyboard and interaction checks remain open. Independent content review and its delta pass; clinician sign-off remains open. The curriculum route is linked; its generated status is in progress because it is not listed as completed. The work is not a release approval.
