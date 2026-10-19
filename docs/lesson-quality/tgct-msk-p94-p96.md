# Tenosynovial giant cell tumour — source and QA ledger

## Scope and learning path

- Route proposal: `/msk/tumoren/tgct`; curriculum integration is intentionally left to the coordinator.
- Audience: medical students and radiology trainees; prerequisite: basic joint anatomy and MRI signal concepts.
- Learning promise: distinguish localized/nodular from diffuse TGCT; recognize where MRI, GRE/T2*/SWI and radiography/CT help; avoid treating blooming or one imaging sign as definitive.
- Chapters: growth pattern and distribution; radiography/CT; MRI and case; key differentials; one embedded self-check; four take-home rules.

## PDF page verification

MSK.pdf contains 138 PDF pages. Pages 94–96 were extracted with pdfplumber and separately rendered with Poppler at 1400 px high for visual inspection. The footer printed page numbers are 93, 94 and 95 respectively.

## Source coverage ledger

| Point | Source page | Importance | Lesson location | Status / qualification |
|---|---|---:|---|---|
| Synovial proliferation; locally aggressive; haemosiderin deposition | MSK.pdf PDF p.94 / printed p.93 | High | forms, MRI | Included; modern name and terminology added from consensus |
| Rare; common age 30–50 years | PDF p.94 | Context | forms | Included as a source-reported range, with caveat that estimates vary |
| Localized vs diffuse: frequency, location, morphology, recurrence behaviour | PDF p.94 | High | forms | Included; old labels PANS/PVNS replaced by localized/nodular and diffuse TGCT; no unsupported numeric recurrence claim retained |
| Gradual swelling, pain or load-related swelling, stiffness/foreign-body sensation | PDF p.94 | Supporting | forms | Core chronic swelling, pain and movement restriction included; load relation/foreign-body sensation omitted as lower-yield detail |
| Radiographs often normal/nonspecific; late erosions with sclerotic margin; joint space often preserved and no osteopenia per PDF | PDF p.94 | High | radiograph-ct | Included as source clues, qualified as typical/source-described rather than exclusion rules |
| CT hyperdense iron/haemosiderin-rich soft tissue; erosions/cysts | PDF p.94 | High | radiograph-ct | Included |
| MRI T1 low/isointense to muscle, T2 low, fluid-sensitive signal variable/high, GRE/T2*/SWI blooming, contrast enhancement | PDF p.95 | High | mri | Included. Blooming claim corrected: not pathognomonic; sensitivity may be lower in nodular TGCT and observer variability exists |
| Ring-finger lesion at flexor tendon sheath near PIP; uniformly low signal in described sequences; rID 28877 | PDF p.95 / printed p.94 | High visual evidence | case figure in mri | Included as source-PDF crop; panels not individually assigned to sequences |
| Separate knee panels on PDF p.95, rID 17398 | PDF p.95 | Optional comparison | — | Not used: no readable accompanying caption tying specific panels to subtype or sequence; avoid inventing characterization |
| Synovial chondromatosis, haemophilic arthropathy, RA, synovial sarcoma differentials | PDF p.96 | High | differential | All included with pattern clues and caveat that signs overlap |

## Media plan and provenance

| Teaching question | Media | Source/provenance | Status |
|---|---|---|---|
| How does focal nodular growth differ from diffuse synovial proliferation? | Inline SVG comparison | New concept diagram; labels in DE/EN/FA; explicitly non-diagnostic | Rendered by SSR test; browser inspection pending |
| What does a localized tendon-sheath lesion look like? | `public/educational/tgct/rid-28877-localized-finger.jpg` | MSK.pdf PDF p.95 (printed p.94), Radiopaedia rID 28877; contributor unnamed on supplied page; source-PDF crop used with user authorization | Crop visibly inspected; sequence names not inferred |
| What is the page-specific hero? | `public/educational/tgct/hero.svg` | Code-native topic schematic | Non-diagnostic |

## Terminology and translation

| Concept | DE | EN | FA |
|---|---|---|---|
| localized/nodular TGCT | lokalisierter/nodulärer TGCT | localized/nodular TGCT | TGCT موضعی/ندولار |
| diffuse TGCT | diffuser TGCT | diffuse TGCT | TGCT منتشر |
| tendon sheath | Sehnenscheide | tendon sheath | غلاف تاندون |
| haemosiderin | Hämosiderin | haemosiderin | هموسیدرین |
| blooming effect | Blooming-Effekt | blooming effect | اثر blooming |
| pressure erosion | Druckerosion | pressure erosion | اروژن فشاری |

## Scientific notes and unresolved QA

- The source calls blooming “pathognomonic.” This is corrected using the 2023 expert consensus: blooming is less sensitive in nodular TGCT, has high interobserver variability, and is not exclusive to TGCT. Absence does not exclude it.
- The PDF's recurrence estimate “up to 50%” is omitted from the learner-facing text because recurrence data vary by subtype, joint, treatment and cohort. The qualitative contrast is retained.
- The 2023 consensus source is Stacchiotti et al., *Cancer Treatment Reviews* 112 (2023), 102491, https://doi.org/10.1016/j.ctrv.2022.102491. It is expert consensus with evidence grading, not a formal clinical guideline.
- DE/EN/FA semantic parity and SSR/RTL metadata are covered by the local render test. Real browser tests for languages, themes, mobile layouts, navigation and interaction remain pending.
- No separate MCQ bank or flashcards were authored or synchronized; the lesson has one embedded retrieval check with explanatory feedback.
- Independent review and Dr. Zia's clinical approval remain pending. This QA ledger is not release approval.
