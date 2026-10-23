# Bronchial carcinoma imaging — Thorax.pdf p.38 (printed p.37)

## Source boundary and coverage ledger

| Point | Source | Importance | Disposition | Evidence and limitation |
| --- | --- | --- | --- | --- |
| Topic cue: lung neoplasms, lung nodule, bronchial carcinoma | Thorax.pdf, physical p.38 / printed p.37; rendered image `tmp/thorax-p38.png`, visually inspected 2026-10-23 | Essential context | Included as topic/source note | The slide visibly reads “Neoplasien (Tumore)”, “Lungenrundherd”, and “Bronchialkarzinom”; one small bullet reads “Solitaer vs multipler Rundherd”. Remaining glyphs/marks are unclear. There are no diagnostic images, criteria, staging rules, or histology labels. In particular, NSCLC/SCLC are not named or distinguished on this page. |
| NSCLC and SCLC curriculum subdivisions | `data/curriculum.js`, exact IDs `nsclc` and `sclc` | Exact curriculum linkage | Both IDs link to one bounded imaging/reporting lesson, with separate topic filters/cards | These are existing curriculum IDs, not content evidenced by p.38. The lesson does not claim that CT classifies histology. |
| Imaging diagnosis and tissue confirmation | NCI, NSCLC PDQ Health Professional Version, reviewed 2026-10-23 | Essential safety boundary | Included | NCI lists CT and biopsy in diagnostic work-up and says pathology review is critical; imaging alone does not determine NSCLC vs SCLC. The lesson is not a pathology or treatment lesson. |
| Clinical and pathologic evaluation | NCI PDQ NSCLC and SCLC Health Professional Versions; updated 2025-05-15 and 2025-05-14 respectively; accessed 2026-10-23 | Supports the limited distinction between imaging extent, clinical work-up, and tissue diagnosis | CT and biopsy are listed in both; the NSCLC PDQ describes CT/PET in clinical staging and selective brain imaging according to context | NCI PDQ is an evidence-reviewed source, not a local imaging protocol; no individual test sequence or treatment instruction is taught. |
| Structured reporting descriptors | Helsedirektoratet, national lung-cancer guideline, “Description of CT thorax and upper abdomen”; accessed 2026-10-23 | Supports the report checklist only | Longest diameter of the solid tumor component on lung windows regardless of plane; report spiculation and post-obstructive atelectasis separately and exclude them from tumor size; morphology/location, adjacent structures, nodal station and short-axis measurement, pleural/pericardial effusion, and suspicious distant findings | Norwegian national guidance is cited as a reporting example, not a universal protocol; its numerical thresholds and test sequence are not taught. The lesson uses only the reporting descriptors and retains uncertainty about nodal metastasis. |
| Contemporary staging framework | UICC TNM 9 / IASLC 9th-edition official resource, reviewed 2026-10-23 | Context only | Version note only; no stage categories taught | Current version is named to prevent silently applying an old edition. Detailed T/N/M assignment is outside this bounded lesson. |

The slide is a low-content topic cue, not a teaching source for radiologic signs. No PDF case image is present. The lesson supplements the cue with external authoritative sources and does not say that the PDF teaches NSCLC/SCLC, staging, or CT criteria.

## Learning outline and visual plan

1. **Was kann die Bildgebung zeigen — und was nicht?** Separate lesion morphology/extent from histologic subtype; connect the existing `nsclc` and `sclc` curriculum IDs without claiming image-based classification.
2. **Wie beschreiben Sie den Primärtumor?** Measure the longest diameter of the solid component on lung windows, regardless of plane; describe spiculation and post-obstructive atelectasis separately. Avoid repeating incidental-nodule management from the Fleischner route.
3. **Welche Ausdehnung ist für die weitere Abklärung relevant?** Describe nodes by IASLC station and short-axis measurement, pleura, additional lung lesions, and visible distant findings as observations; explain that imaging suspicion is not pathologic confirmation and further evaluation depends on histology, clinical question, and current protocol.
4. **Wie formulieren Sie einen knappen Befund?** Give a non-patient-specific reporting scaffold and one retrieval check; distinguish cTNM contribution from histology and avoid assigning a complete stage from one CT impression.
5. **Drei Regeln merken.** Compress the report sequence and uncertainty boundary.

Visual plan: a topic-specific, code-native schematic of a lung lesion, bronchus, mediastinal/hilar nodal stations, pleura and an adrenal silhouette as reporting landmarks. It is expressly non-diagnostic, not to scale, not a CT, and not evidence of disease. No generic hero or fabricated diagnostic case.

## Terminology map

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Bronchial carcinoma / lung cancer | Bronchialkarzinom / Lungenkarzinom | bronchial carcinoma / lung cancer | سرطان برونش / سرطان ریه |
| histologic subtype | histologischer Subtyp | histologic subtype | زیرگروه بافت‌شناختی |
| nodal station | Lymphknotenstation | nodal station | ایستگاه غدد لنفاوی |
| radiologic suspicion | bildgebender Verdacht | imaging suspicion | شک بر پایهٔ تصویربرداری |
| tissue confirmation | histologische Sicherung | tissue confirmation | تأیید بافت‌شناختی |

## Implemented artifacts and verification

- Lesson route: `/thorax/bronchialkarzinom-bildgebung`; exact existing curriculum IDs `nsclc` and `sclc` point to this shared imaging/reporting scope and remain marked `inProgress`.
- Assessment: one localized histology-boundary MCQ tagged to both exact IDs and two retrieval cards; both IDs resolve to the same relevant MCQ/card set rather than claiming separate image-based histology.
- Media: original SVG and adjacent provenance JSON. No PDF diagnostic image or Radiopaedia case is used for this heading-only page.
- Independent review: [saved report](../lungenkarzinom-independent-review.md). The reviewer caught a duplicate topic-group registration, overbroad TNM phrasing and unexplained SVG numerals; all three were fixed and retested.
- Final verification after source and measurement wording updates: `node --import tsx scripts/test-lung-carcinoma-thorax-p38-ssr.mjs` passed; `npm run audit:mcq` passed (800 questions and 18 cases per language); `git diff --check` passed with line-ending notices only.
- Browser UX remains blocked because no browser surface was available to the independent reviewer. The SSR test uses the real `StandardLessonShell` but stubs `LessonHero`, so does not verify actual rendered art, font, responsive layout, themes or live interaction. Specialist scientific approval remains pending; no publication was requested.
