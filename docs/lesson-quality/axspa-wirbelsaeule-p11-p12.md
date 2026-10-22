# Axiale Spondyloarthritis — Wirbelsäule.pdf pp.11–12

## Identität und Umfang

- Quelle: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Wirbelsäule.pdf`, physische Seiten 11–12, gedruckte Seiten 10–11.
- Route / Curriculum: `/wirbelsaeule/entzuendlich`, exact topic `morbus-bechterew-ws`; source lesson `data/spineInflammatoryStructural.js`.
- Gelesen: Layout-Text und beide gerenderten Originalseiten. Der Bildausschnitt der Radiographien wurde zusätzlich in voller Größe geprüft.
- Seitenzuordnung: p.11 enthält axSpA/Bechterew definition, epidemiology, inflammatory back pain and initial radiographic pattern; p.12 contains structural signs, a small STIR thumbnail, a radiograph pair labelled with Radiopaedia rID 54155, MRI sequence notes and complications.
- Geplanter Lernpfad vor Umsetzung: **„Welche klinischen Hinweise stützen den Verdacht auf axSpA?“** — source-reported age/sex/HLA-B27 context, inflammatory pain and associated features, without turning population tendencies into diagnostic rules. **„Welche chronischen Zeichen passen zur Spondylitis ankylosans?“** — recognize established radiographic change, correctly distinguish dagger/trolley-track and qualify Andersson lesions. Existing MRI and complication chapters retain their diagnostic and safety purposes; Scheuermann remains separate.
- Medienplan: reuse the p.12 AP pelvis/lateral spine source case, because the page identifies it as Radiopaedia rID 54155 and the source case title matches the dagger-sign teaching point. Do not reuse the separate small STIR thumbnail: its exact case/sequence attribution is not sufficiently clear and the displayed panel is too small for a reliable MRI-recognition task.

## Seitenweiser Quellenabgleich

| PDF p. / gedruckt | Quellinhalt | Ort in der Lektion / Assessment | Entscheidung und Beleg |
|---|---|---|---|
| 11 / 10 | Chronic seronegative SpA with axial skeleton/SIJ involvement | Clinical-context chapter | Preserved as orientation, updated to current term axSpA; imaging signs alone do not diagnose. |
| 11 / 10 | M:F 3:1; presentation 20–40 years; HLA-B27 >90% | Clinical-context table | Kept explicitly as PDF-reported tendencies, not general prevalence/rule-outs. NICE says axSpA affects similar numbers of women and men and a negative HLA-B27 does not exclude; global epidemiology shows population/ancestry variation. |
| 11 / 10 | Deep inflammatory back pain, night symptoms, morning stiffness, improvement with movement | Clinical-context table | Preserved as suspicion-supporting features, explicitly not diagnostic alone. NICE NG65 supplies current referral/clinical correlation context. |
| 11 / 10 | Sacroiliitis as early manifestation; anterior uveitis, enthesitis, aortitis | Clinical-context table and MRI chapter | Preserved; MRI section distinguishes active subchondral BME from chronic structural findings and nonspecific mimics. |
| 11 / 10 | Bilateral symmetric, iliac-predominant sacroiliitis; thin vertical marginal syndesmophytes; bamboo spine | Structural chapter, source radiograph montage | Retained as the PDF-described pattern, not a universal rule or standalone diagnosis; case caption limits it to established structural change. |
| 12 / 11 | Shiny corners/Romanus, squaring, Andersson lesion, facet ankylosis, dagger/trolley-track | Structural chapter | Preserved; corrected trolley-track anatomy: central dagger line from supra-/interspinous ossification, paired lateral lines from ossified facet-joint capsules. Andersson lesion defined as focal discovertebral destruction with inflammatory and stress/fracture mechanisms; fracture/infection remain differentials. |
| 12 / 11 | STIR/T2-FS subchondral SIJ BME; T1 erosions/fatty conversion; capsulitis/enthesitis | MRI chapter | Retained with sequence attribution; active BME must be typical/subchondral and highly suggestive for ASAS classification. Isolated structural lesions or nonspecific BME are insufficient. A negative MRI does not exclude axSpA. |
| 12 / 11 | Fracture risk after low-energy trauma, especially transdiscal cervical fracture; atlantoaxial subluxation, cauda equina syndrome, restrictive ventilatory impairment | Complications chapter | Preserved, with whole-spine/neurological assessment and local trauma protocol caveats. |
| 12 / 11 | Tiny STIR thumbnail | Not reused | Caption says “STIR hyperintense signal” but page supplies no clear case ID/sequence details; insufficient for a case-level MRI-recognition objective. |
| 12 / 11 | Radiograph pair with rID 54155 | Structural chapter image | Reused as source-derived case crop after visual inspection. Source labels case “Ankylosing spondylitis with dagger sign,” M. Niknejad. Caption states AP pelvis + lateral lumbar views, structural-only purpose and no inference of MRI activity. Rights/attribution recorded in asset provenance JSON; user previously explicitly authorized Radiopaedia use for RadYar. |

## Scientific sources checked

- NICE NG65: axSpA must not be ruled out solely by a single feature/test; negative HLA-B27 does not exclude; when MRI does not meet ASAS/OMERACT criteria, do not exclude axSpA; consider specialist review or follow-up MRI if suspicion remains. [Recommendations](https://www.nice.org.uk/guidance/ng65/chapter/recommendations)
- Lambert et al., ASAS MRI Working Group (2016): clear subchondral BME remains the defining observation for active sacroiliitis in the classification MRI definition; structural MRI lesions may support interpretation but are not independently required/defining. [PubMed](https://pubmed.ncbi.nlm.nih.gov/26768408/)
- Global epidemiology review (2025): axSpA and HLA-B27 prevalence vary across populations/ancestry. [Nature Reviews Rheumatology](https://www.nature.com/articles/s41584-025-01286-x)
- Bron et al. (2009): Andersson lesions have debated inflammatory versus mechanical/stress-fracture mechanisms; CT/MRI add information, and fracture/infectious mimics require clinical context. [PubMed](https://pubmed.ncbi.nlm.nih.gov/19294478/)
- Jacobson et al. (2008): radiographic definitions of dagger and trolley-track signs, including central posterior-ligament and paired facet-capsule lines. [Article PDF](https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/Radiographic_Evaluation_of_Inflammatory_Conditions.pdf)

## Assessment alignment

- Existing MCQ `ws-entzuendlich-asas-mri-01` continues to test that SIJ BME alone does not diagnose axSpA.
- Added `ws-axspa-negative-mri-01` to test that negative MRI/HLA-B27 do not exclude axSpA when clinical suspicion persists; registered under exact topic `morbus-bechterew-ws`.
- Added card `ws-axspa-negative-mri`, also registered under exact topic `morbus-bechterew-ws`.
- No additional quiz about epidemiology is needed; the values are source-attributed contextual information rather than a memorization target.

## Review and validation status

- Focused route SSR test `node --import tsx scripts/test-morbus-scheuermann-wirbelsaeule-p13.mjs`: PASS for p.11–13 route content, source image and caption, all DE/EN/FA content, Persian RTL, exact-topic MCQ/card retrieval and feedback.
- `node --import tsx scripts/audit-msk-spine-assessment-retrieval.mjs`: PASS; 7 four-option questions and 7 cards across 5 exact linked spine curriculum IDs, DE/EN/FA.
- `git diff --check`: PASS.
- `node --import tsx scripts/check-msk-spine-authorship.mjs`: p.11–12 source/lesson assertions pass; the broader script later stops at line 163 on an unrelated pre-existing pediatric-assessment primary-outcome citation assertion.
- Independent fresh review of lesson, both source-page renders, asset/provenance, assessments and evidence: SRC/EDU/LNG/ASM/VIS/REV PASS; no in-scope defects. UX BLOCKED because no browser/app surfaces are available (SSR evidence passed). Reviewer confirmed NICE NG65 and ASAS MRI definition alignment, exact-topic retrieval and DE/EN/FA + Persian RTL parity.
- Browser UX: CUA reports no available apps or browsers in this environment, so live browser verification is blocked.
- Scientific review by Dr. Zia and publication: pending.
