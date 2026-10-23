# Schulterinstabilität · MSK.pdf p.39 · coverage and QA ledger

## Status and boundary

- Topic ID: `schulterinstabilitaet`; route: `/msk/schulter/instabilitaet`.
- Audience: radiology learners with basic shoulder MRI anatomy. Task: interpret and structure a written imaging report for suspected glenohumeral instability.
- PDF coverage: MSK.pdf PDF p.39 (printed p.38). Visual inspection confirms the page only contains the heading “Schulterinstabilität” and the note “Labrum und Kapsel”; no diagnostic image, criteria, or detailed teaching text is present. The adjacent “Arthrose” section contains only blank/glyph debris and is outside this lesson.
- All detailed teaching is labelled supplemental and sourced externally. The lesson gives a bounded overview of anterior-instability injury patterns and reporting structures; it is not a full shoulder-instability classification or management guide.

## Source coverage

| Claim/topic | PDF page | Disposition | Supplemental source / limitation |
|---|---|---|---|
| Shoulder instability | MSK.pdf p.39 / printed p.38 | Topic cue; no criteria available | No prevalence, frequency, thresholds, or image findings attributed to the PDF. |
| Labrum and capsule as relevant structures | MSK.pdf p.39 / printed p.38 | Topic cue; developed into concise anatomy/report framework | NCBI Bookshelf “Shoulder: Instability” (2026–2029) and Ladd et al. 2021 review. |
| Soft-tissue/osseous Bankart and Hill-Sachs paired pattern; capsuloligamentous injury | Not detailed on source page | Supplemental typical anterior-instability pattern; pattern is suggestive, not proof of mechanism/history | NCBI Bookshelf; RCR MRI arthrography report audit. No numeric risk/size threshold taught. |
| Imaging pathway: radiographs, MRI without IV contrast, selected MRA/CT | Not detailed on source page | Brief supplemental modality context only | ACR Acute Shoulder Pain, revised 2024. Not a patient-specific order recommendation. |
| Posterior/multidirectional instability, detailed Bankart variants, treatment, quantitative bone-loss planning | Not present on source page | Deferred | Outside bounded scope; requires separate source mapping/lessons. |

## Planned lesson sequence (recorded before implementation)

1. **Was klärt der Bildbefund bei Instabilität?** — Set the report-reading objective, clinical context and limits of imaging; briefly place the imaging pathway.
2. **Labrum, Kapsel und Knochen gemeinsam beurteilen** — Explain the typical anterior soft-tissue/osseous Bankart and Hill-Sachs constellation using a code-native conceptual diagram.
3. **Wie formulieren Sie den Befund?** — Give a concise report checklist and an embedded four-option self-check with answer-specific feedback.
4. **Vier Regeln für den Befund** — Compress the topic into four portable reporting rules.

## Visual plan

- Topic-specific code-native hero SVG and one inline concept diagram showing approximate anteroinferior glenoid/labrum and posterolateral humeral-head findings. Neither depicts an MRI or a patient; labels and alt/captions in DE/EN/FA disclose this.
- No PDF diagnostic image exists on p.39. No external case will be claimed or embedded without inspecting its exact image and provenance.

## Assessment and language plan

- Two localized shared MCQs on the paired anterior-instability pattern and cautious modality selection; one matching question embedded in the report section; answer-specific feedback for all distractors.
- Three concise retrieval cards tied to the exact `schulterinstabilitaet` topic ID.
- Translate all core descriptors, uncertainty, self-check feedback, diagram labels/alt, and source-scope notes in DE/EN/FA. Preserve RTL.

## Review and validation

- Implemented route: `app/msk/schulter/instabilitaet/page.jsx`; source content: `data/shoulderInstabilityLesson.js`; MCQ/flashcards: `data/shoulderInstabilityAssessments.js`; curriculum/registries linked by exact topic ID.
- Visual source: code-native SVG concept diagram in the route plus abstract topic-specific hero art at `public/educational/schulterinstabilitaet/hero.svg`. Both are authored assets; neither is a patient image or diagnostic evidence. Rights: original code-authored visual; no external image used. Hero alt describes the abstract banner; the concept diagram has DE/EN/FA title, description, labels and caption.
- Independent read-only review complete: SRC and EDU passed; the two minor VIS/ASM findings (hero alt mismatch and generic embedded-check feedback) were fixed and delta-reviewed as resolved. Clinical sign-off and runtime browser QA remain pending/blocked.
- Focused registry check (`node --import tsx scripts/check-shoulder-instability.mjs`) passed; global MCQ audit (`npm run audit:mcq`) passed. The full Persian audit exits nonzero on numerous existing repository-wide acronym/translation findings; no string from this topic appeared in its output.
- Production build attempted, but failed with EPERM creating `.next/server/app/gehirn/infektionen/hiv-enzephalopathie`; the route's build status is therefore unverified. Starting a local dev server showed “ready,” but opening its port from browser/shell was blocked by the environment socket policy; no rendered route screenshot or interaction evidence is claimed.
- Browser desktop/mobile, Persian RTL, keyboard/focus, theme, and embedded interaction checks remain blocked until a usable browser session is available.
- Scientific sign-off by Dr. Zia pending. No curriculum status or automated pass substitutes for that review.
