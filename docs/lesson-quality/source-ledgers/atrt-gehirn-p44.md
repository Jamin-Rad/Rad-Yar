# ATRT MRI lesson — Gehirn.pdf p.44 / printed p.43

## Scope and source boundary

This bounded supplement adds a report-focused MRI lesson for exact curriculum ID `atrt` at `/gehirn/tumoren/atrt`. Physical PDF page 44 was rendered at 110 dpi and visually inspected on 2026-10-23. It has three panels labelled sagittal T1, axial FLAIR, and axial T1 C+; no caption or diagnostic criteria are visible. The panel set appears in the adjacent embryonal-tumour teaching sequence, whose medulloblastoma lesson already documents the uncertain case identifier `rID10997`. It is not treated as an ATRT case, and the image is not reused here. No DWI/ADC or spine images are present on p.44.

The title “embryonal tumours” and the adjacent curriculum ID establish a topic cue only. MRI pattern details below are supplemental and separately attributed. This lesson teaches report descriptors and limits, not case recognition, treatment, molecular subgrouping, or histopathologic diagnosis.

| Source | Evidence inspected | Lesson use | Boundary |
| --- | --- | --- | --- |
| Gehirn.pdf, physical p.44 / printed p.43 | Complete rendered page and labels; no substantive paragraph or caption | Scope cue; records the three sequence types and unavailable DWI/ADC/spinal images | Does not establish that the shown lesion is ATRT; contributor and case metadata are unverified |
| PDQ Pediatric Treatment Editorial Board, NCI, “Childhood CNS AT/RT Treatment” | Professional NCI summary, diagnostic-evaluation section, accessed 2026-10-23 | Tumour can occur in different CNS locations; MRI alone cannot reliably distinguish malignant paediatric tumours; tissue and molecular evaluation establish diagnosis | NCI PDQ is an evidence summary, not an imaging-pattern atlas |
| NCI-CONNECT, “Atypical Teratoid/Rhabdoid Tumors: Diagnosis and Treatment” | MRI description and image credit inspected, accessed 2026-10-23 | Variable, heterogeneous mass and fluid-containing components as broad examples | NCI-CONNECT page is not used to claim the PDF case; no NCI scan is copied |
| Wu et al., *Cancer Medicine* 2023;12:10449–10461. DOI 10.1002/cam4.5780; PMID 37225445; PMCID PMC10225182 | Full text, methods, results, figure captions and limitations reviewed | Small retrospective comparison with medulloblastoma: imaging overlap; potentially helpful features discussed qualitatively | 16 AT/RT and 57 medulloblastoma patients from one centre; no cutoff or deterministic imaging rule is transferred |
| Nowak et al., *Neuro-Oncology* 2018;20(12):1672–1679. DOI 10.1093/neuonc/noy111; PMID 30010851; PMCID PMC6231209 | Full text / abstract and subgroup data reviewed | 43-patient molecular subgroup cohort; posterior-fossa midline/off-midline location alone was not subgroup-specific | Exploratory cohort; does not establish a rule for an individual patient |
| Calandrelli et al., *Diagnostics* 2023;13(3):475. DOI 10.3390/diagnostics13030475; PMID 36766580; PMCID PMC9914341 | Full text, methods, results, and figure captions reviewed; accessed 2026-10-23 | Heterogeneity and possible cystic components, haemorrhage, and restricted diffusion, with caveats | 11-patient case series plus literature review; not a validated checklist |

Source URLs: [NCI PDQ](https://www.cancer.gov/types/brain/hp/child-cns-atrt-treatment-pdq), [NCI-CONNECT](https://www.cancer.gov/rare-brain-spine-tumor/tumors/atrt), [Wu et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10225182/), [Nowak et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC6231209/), [Calandrelli et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC9914341/).

## Learning outline and visual plan

1. **What can MRI describe?** Separate the radiologic phenotype from histology and explain the topic-only PDF evidence.
2. **How should the sequences be read together?** Organize T1, T2/FLAIR, DWI/ADC and postcontrast T1 as observations of components, diffusion, and enhancement; avoid claiming every feature occurs in every tumour.
3. **How far can the differential go?** Compare ATRT with medulloblastoma only as an overlapping differential; explain that tissue diagnosis and molecular workup are required.
4. **Four rules to retain.** Compress the reporting sequence and uncertainty boundaries.

The topic-specific SVG is an original non-diagnostic orientation schematic, not a patient scan, anatomic atlas, or case. The posterior fossa is shown only as one possible example location; it does not communicate prevalence or typical location. It visualizes heterogeneous components as a concept and names no pathognomonic pattern. No uncertain PDF or Radiopaedia case image is reused. The learning objective is explicitly limited to reporting descriptors and diagnostic boundaries; it does not claim scan-recognition instruction.

## Terminology map

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| ATRT | atypischer teratoid/rhabdoider Tumor | atypical teratoid/rhabdoid tumour | تومور تراتوئید/رابدوئید آتیپیک |
| restricted diffusion | Diffusionsrestriktion | restricted diffusion | محدودیت انتشار |
| dissemination | Ausbreitung | dissemination | گسترش |
| tissue diagnosis | Gewebediagnose | tissue diagnosis | تشخیص بافتی |

## Validation and review

Exact-topic assessment: one localized MCQ and three retrieval cards. `node --import tsx scripts/test-atrt-gehirn-p44-ssr.mjs` passes against the actual shared lesson shell in DE/EN/FA, including RTL, source-panel localization, exact quiz/card registrations and the PDF boundary. `npm run audit:mcq` passes (799 questions and 18 cases per language). `git diff --check` passes; Git reports existing LF-to-CRLF warnings for unrelated files. The SVG was rendered and visually inspected after updating its labels and posterior-fossa caveat.

Independent review initially found (1) incorrect attribution/link for the cited diagnostic-pathway paper, (2) untranslated public source metadata and visible diagram labels, (3) possible overreading of the posterior-fossa illustration, (4) a focused test invocation that did not load the TS/ESM resolver, (5) a location-related differential statement needing qualification, and (6) no live-browser evidence. The source was corrected to Calandrelli et al., *Diagnostics* 2023, DOI 10.3390/diagnostics13030475, PMID 36766580, PMCID PMC9914341. Note: the first review's suggested author label “Makino” was itself incorrect; the linked paper is by Calandrelli et al. Translation and location-framing findings were fixed; the differential statement now says location alone is not discriminatory, supported by Nowak et al. 2018. The independent reviewer confirmed the source, language, and visual-scope corrections, plus the focused test. Live browser/keyboard/mobile evidence and specialist review remain distinct from these static checks. No specialist or publication approval is implied.
