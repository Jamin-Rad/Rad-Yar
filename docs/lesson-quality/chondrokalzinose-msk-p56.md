# Chondrocalcinosis (CPPD) — MSK.pdf p.56

## Scope and learning path

- Route: `/msk/knie/chondrokalzinose`; exact curriculum ID: `chondrokalzinose`.
- Audience: radiology learners reviewing knee radiographs and MRI.
- Intended task: recognise the meniscal calcification pattern, avoid a false-positive meniscal tear call from PD signal, and describe the imaging finding without inferring symptomatic disease.
- Lesson sequence: orientation and goals → radiograph/MRI pattern → embedded retrieval question → four take-home rules.

## Source coverage

| Key | Source and page | Point | Priority | Lesson location | Disposition / caveat |
|---|---|---|---|---|---|
| CPPD-56-01 | MSK.pdf, physical p.56 / printed p.55 | Chondrocalcinosis is common, especially in older patients | Core | Intro and radiograph | Included, with no prevalence number added |
| CPPD-56-02 | MSK.pdf, physical p.56 / printed p.55 | Both knees may be symmetrically involved | Supporting | Radiograph | Included as a possibility, not a diagnostic criterion |
| CPPD-56-03 | MSK.pdf, physical p.56 / printed p.55 | Fine punctate or linear calcification follows the meniscus on radiographs | Core | Radiograph and source image | Included; source film caption stays cautious about visibility |
| CPPD-56-04 | MSK.pdf, physical p.56 / printed p.55 | MRI may show low-signal inclusions/foci in menisci | Core | MRI | Included |
| CPPD-56-05 | MSK.pdf, physical p.56 / printed p.55 | Calcification may paradoxically increase PD signal and mimic a tear | Core pitfall | MRI, CAVE, retrieval question | Included; adjacent slices and independent tear signs are requested |
| CPPD-56-06 | MSK.pdf, physical p.56 / printed p.55 | Diffuse calcification distribution differs from a clear tear line | Core pitfall | MRI | Included; no single image feature is presented as a validated rule |
| CPPD-56-07 | MSK.pdf, physical p.56 / printed p.55 | Radiograph is labelled “Goldstandard für die Erstdiagnose” | Needs qualification | Sources/scope | Wording is not repeated as a universal rule. 2023 EULAR recommends conventional radiography and ultrasound for diagnostic imaging; modality choice remains clinical-context dependent. |

## Visual record

| Goal | Asset | Provenance | Rationale and review |
|---|---|---|---|
| Orient to the menisci and show the concept of linear deposits | `public/educational/chondrokalzinose-knee.svg` | Original code-drawn teaching schematic; explicitly labelled as schematic, not patient imaging | Explains location only; it does not simulate a diagnostic film |
| Show source context and orient to the meniscal joint line | `public/msk/knie/chondrokalzinose/msk-p56-rid-22147.jpg` and `msk-p56-rid-22147-joint-detail.jpg` | Crop and enlarged joint-line detail from user-provided MSK.pdf, physical p.56 / printed p.55; visible source ID rID 22147 | Both rendered and visually inspected. The source film is retained as contextual example only: individual calcific foci are not confidently isolated in this crop. The topic-specific vector hero teaches only the meniscal location and explicitly says it is schematic, not a patient image. No arrow falsely identifies a specific deposit. |

## Terminology and translation

| Concept | DE | EN | FA |
|---|---|---|---|
| Imaging finding | Chondrokalzinose | Chondrocalcinosis | کندروکلسی‌نوز |
| Disease | CPPD-Erkrankung | CPPD disease | بیماری CPPD |
| Meniscal calcification | Meniskusverkalkung | meniscal calcification | کلسیفیکاسیون منیسک |
| Proton-density weighted | protonendichtegewichtet (PD) | proton-density-weighted (PD) | با وزن‌دهی چگالی پروتون (PD) |

Nouns and clinically important distinctions, including “may mimic,” “alone does not prove,” and symptomatic disease versus imaging finding, are represented in all three locales. Automated checks confirm required translated copy is present; native clinical-language review remains open.

## Evidence and status

- PDF physical page 56 was rendered at 150 dpi and visually reviewed; printed page 55 is legible.
- Current external reference: Mandl et al., 2023 EULAR recommendations, including recommendation to use conventional radiography and ultrasound in diagnostic assessment: https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/
- Direct MRI evidence: Kaushik et al., “Effect of chondrocalcinosis on the MR imaging of knee menisci,” AJR 2001;177(4):905–909, PMID 11566703, DOI 10.2214/ajr.177.4.1770905: https://doi.org/10.2214/ajr.177.4.1770905. The study reports reduced specificity/accuracy for tear assessment in the presence of chondrocalcinosis.
- Review context: Resnick & Kang, “The Meniscus: Recent Advances in MR Imaging of the Knee,” AJR 2002, DOI 10.2214/ajr.179.5.1791115: https://doi.org/10.2214/ajr.179.5.1791115
- Focused content/source test: `node scripts/test-chondrokalzinose-msk-p56.mjs`.
- Independent review: pending at authoring time.
- Browser, responsive, keyboard, theme, clinical-specialist review, and release approval: pending. The lesson does not claim complete CPPD coverage or clinical sign-off.
