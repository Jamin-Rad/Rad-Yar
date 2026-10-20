# CT image quality and artefacts — source ledger

## Scope and plan

- Route: `/technik/grundlagen#ct`; curriculum ID: `ct-bildqualitaet-artefakte`.
- Source: `Technik.pdf`, PDF pp. 54–55 (printed pp. 53–54). Both pages were reviewed as extracted text and rendered page images. They contain explanatory text and a parameter/artefact table, but no diagnostic case images.
- Learner outcome: relate image-quality trade-offs to the task and recognize common artefact patterns without turning a summary table into scanner-protocol advice.
- Proposed teaching titles and purpose: **“Was bedeutet Bildqualität für die konkrete Aufgabe?”** — relate contrast, spatial resolution, noise, display and reconstruction to task-dependent image quality; **“Welche Ursache passt zum Artefaktbild?”** — compare cause, appearance and interpretive limitation for six patterns.
- Visual plan: one code-native, language-neutral conceptual diagram of a voxel crossing a material boundary; it illustrates partial-volume averaging and is explicitly not patient data. No diagnostic image is needed for these source pages.

## Source coverage

| Point | PDF page (printed page) | Importance | Lesson location | Status / qualification |
|---|---|---|---|---|
| Contrast, spatial resolution, noise and artefacts are distinct image-quality factors | 54 (53) | Core | CT image quality block | Included; framed as task-dependent, not a single score |
| kV, focal spot, pixel/matrix, kernel, mAs and windowing influence quality | 54 (53) | Core concepts | CT image quality block | Included conceptually; lower kV can increase iodine contrast while often increasing noise; dose/image effects depend on patient, automatic current modulation, reconstruction and task. Windowing is presentation, not acquisition. |
| CT-vs-projection pixel-count comparison | 54 (53) | Misleading generalization | — | Omitted: matrix/pixel count alone does not define system resolution or justify a modality-wide comparison |
| Parameter table: kV, mAs, reconstructed thickness, pitch, noise and dose | 55 (54) | Core trade-offs, but oversimplified | CT image quality block; pitch cross-reference to `#ct-dose-geometry` | Fixed-condition mAs/photon relationship retained with qualifier; kV/pitch dose generalizations omitted; thicker reconstructed slices tied to lower noise and lower z-detail. Pitch is connected to the existing route's geometry explanation and current-modulation caveat; no universal values or protocol prescription. |
| Motion artefact | 55 (54) | Core | Artefact table | Included: cause → appearance → interpretive limitation |
| Metal artefact | 55 (54) | Core | Artefact table | Included as multifactorial (including beam hardening and photon starvation); correction caveat included |
| Ring artefact / detector or calibration issue | 55 (54) | Core | Artefact table | Included: concentric appearance and technical QC/service context |
| Stair-step on MPR from coarse z sampling/source resolution | 55 (54) | Core | Artefact table | Included; directs learner to check source volume, not apply a fixed scanner setting |
| Beam hardening at dense interfaces; PDF-listed measures (greater slice thickness, prefilter, iterative reconstruction) | 55 (54) | Core pattern; countermeasure list requires qualification | Artefact table and this ledger | Pattern and physical explanation included. The PDF's three measures were considered but not prescribed: greater reconstructed thickness can smooth/mask the appearance while sacrificing z-detail and does not remove the beam-hardening mechanism; prefiltering is system/acquisition-specific rather than a general reader adjustment; iterative reconstruction/correction may reduce the artefact but is implementation- and task-dependent and is not guaranteed. No measure is presented as a universal fix. |
| Partial volume from mixed-material voxel averaging | 55 (54) | Core | Artefact table and conceptual diagram | Included; thinner reconstruction may reduce z-averaging but increases noise; system resolution still limits detail |

## Language and terminology

| Concept | DE | EN | FA | Notes |
|---|---|---|---|---|
| Spatial resolution | räumliche Auflösung | spatial resolution | تفکیک مکانی | Matrix/pixel size is one factor only |
| Noise | Rauschen | noise | نویز | Noise magnitude/texture and task both matter |
| Reconstruction kernel | Rekonstruktionskernel | reconstruction kernel | کرنل بازسازی | Sharpness/noise trade-off is qualified |
| Partial volume | Partialvolumen | partial volume | حجم جزئی | Voxel attenuation is averaged across included materials |
| Beam hardening | Strahlaufhärtung | beam hardening | سخت‌شدن پرتو | Dense-material context; correction does not guarantee removal |
| Stair-step artefact | Stufenartefakt in MPR | stair-step in MPR | پله‌ای‌شدن در بازسازی چندصفحه‌ای | Linked to coarse z sampling/source resolution |

## Scientific references used to qualify claims

- AAPM Task Group 233, *Performance Evaluation of Computed Tomography Systems* (2019), task-based image-quality assessment and limitations of single conventional metrics: <https://aapm.org/pubs/reports/detail.asp?docid=186>.
- ICRU Report 87, *Radiation Dose and Image-Quality Assessment in CT* (2012), including resolution and noise characterization: <https://pubmed.ncbi.nlm.nih.gov/24158924/>.
- *Artifacts at Cardiac CT: Physics and Solutions*, RadioGraphics (2017), for artefact mechanisms including motion and stair-step: <https://doi.org/10.1148/rg.2016160079>.
- *Current and Novel Techniques for Metal Artifact Reduction at CT: Practical Guide for Radiologists*, RadioGraphics (2018): <https://doi.org/10.1148/rg.2018170102>.

These sources support the conceptual qualifications; they do not constitute a scanner-specific protocol, dose prescription, or independent clinical sign-off.

## Validation status

- Content and translated labels/captions: author-side review performed; focused StandardPage SSR/registry test passed for DE/EN/FA, including RTL direction and the six artefact rows.
- MCQ/cards: one central MCQ and two flashcards linked to the exact curriculum ID; focused test and `npm run audit:mcq` passed (655 questions per language, all explanations valid).
- Focused esbuild of `StandardPage.jsx` passed; `git diff --check` passed.
- Reviewer delta items addressed: kV trade-off qualified; pitch cross-linked to the existing CT geometry section; diagram caption explains panel voxel sizes and magenta outline (unexplained bars removed); German stair-step label localized; MCQ names detector element/calibration; inline retrieval check now assesses MPR stair-step recognition instead of repeating partial-volume MCQ.
- Visual: code-native explanatory schematic; no case rights question on these source pages.
- Browser QA (desktop/mobile, themes, actual route interaction): not performed in this bounded batch; report as open, not pass.
- Independent review: SRC/EDU/VIS/LNG/ASM/REV PASS after source-ledger delta; UX BLOCKED because no real browser evidence was available. Reviewer issue CT-SRC-01 (minor, disposition of three p.55 beam-hardening measures) was fixed and rechecked against rendered page 55; no remaining delta issue.
- Scientific approval by Dr. Zia and publication remain separate.
