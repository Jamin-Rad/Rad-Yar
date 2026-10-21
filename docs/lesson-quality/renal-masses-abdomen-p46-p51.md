# Solid renal masses — source and QA ledger

## Scope and learning path

- Route: `/abdomen/niere/raumforderungen`
- Audience: radiology learners; prerequisite: renal CT/MRI phases and basic lesion description.
- Learner task: distinguish cystic from solid masses, recognise imaging clues for RCC, oncocytoma and AML, and report venous extent without overstating histology.
- Lesson outline: composition → solid lesion patterns → structured report → one embedded decision → four reporting rules.
- Companion: cystic masses/Bosniak v2019 remain at `/abdomen/niere/nierenzysten`; page 46 is not duplicated here.
- Visual plan: topic-specific code-native renal cross-section schematic in the hero plus the axial AML CT on PDF p.50. The CT is used to locate and inspect the mass morphology only; phase is not labelled, so it is not presented as proof of macroscopic fat.

## Source coverage

| Point | Source | Importance | Lesson placement | Status / rationale |
| --- | --- | --- | --- | --- |
| Bosniak introduction and cystic mass morphology | Abdomen.pdf physical p.46 / printed p.45 | Essential to parent topic, not this route | Separate cystic renal mass lesson | Covered in companion lesson using v2019 primary source; unversioned risk percentages and management table excluded. |
| Polycystic kidney disease | physical p.47 / printed p.46 | Unresolved source gap | None | Page is only a heading with corrupted fragment; no substantive claims can be responsibly reconstructed. |
| RCC frequency statement (~90%) | physical p.48 / printed p.47 | Optional epidemiology | None | Not needed for imaging task; no denominator/source is supplied on slide. |
| RCC morphology, necrosis, irregular calcification, early arterial enhancement with relative reduction later, subtype-related MRI signal and venous tumour extension | physical p.48 / printed p.47 | Essential | “What imaging shows”; two RCC MCQs; reporting checklist | Included with qualified wording; venous assessment supported against EAU diagnostic guidance. |
| RCC lung/liver/bone common metastases | physical p.48 / printed p.47 | Optional staging | None | Outside the focused imaging-characterisation objective. |
| Oncocytoma may show central stellate scar; imaging often cannot separate it from RCC | physical p.49 / printed p.48 | Essential differential caveat | Oncocytoma item; MCQ; report caveat | Included; source’s claim that metastasis/infiltration are the only unequivocal RCC signs is not repeated. |
| AML components, sporadic vs TSC-associated multiplicity/laterality, macroscopic CT fat, enhancement and calcification caveat | physical p.50 / printed p.49 | Essential | AML paragraph; embedded check; MCQ and cards | Included with bounded wording; no definitive diagnosis from a single discordant sign. |
| CT image captioned AML | physical p.50 / printed p.49 | Typical case orientation | `public/educational/renal-masses/aml-axial-ct.png` | Reused from user-provided PDF under user's explicit project-wide permission. Axial slice shows an exophytic right upper-pole mass (image-left); phase is unlabeled, so it is not used to claim macroscopic fat or enhancement. |
| MRI T1 fat-equivalent signal, fat suppression, opposed-phase ink artifact at interface vs diffuse microscopic-fat signal loss; fat-poor AML may mimic papillary RCC | physical p.51 / printed p.50 | Essential | Fat-poor AML item; new card; report caveat | Included in three languages; imaging clue is distinguished from histologic proof. EAU RCC guidance independently notes that fat-poor AML cannot always be identified reliably by imaging. |
| Wunderlich syndrome; 4-cm treatment threshold; embolisation/surgery; pregnancy-risk wording | physical p.51 / printed p.50 | Clinical management | Not transferred as recommendation | These are management claims outside lesson objective and lack contemporary validation on the source slide. No threshold or treatment directive is taught. |

## Media inventory

| Goal | Media | Provenance and use | Review state |
| --- | --- | --- | --- |
| Orient learner to solid renal mass | `public/educational/renal-masses/hero.svg` | Original code-native educational schematic, explicitly not patient imaging; translated alt text | Rendered through `LessonHero` |
| Locate the AML example and inspect morphology | `public/educational/renal-masses/aml-axial-ct.png` | Crop from user-provided Abdomen.pdf, physical p.50 / printed p.49; user's project-wide permission confirmed 2026-10-21 | Visually checked; phase not stated; caption does not overclaim the sign shown |

## Translation terminology

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| renal cell carcinoma | Nierenzellkarzinom (RCC) | renal cell carcinoma (RCC) | کارسینوم سلول کلیوی (RCC) |
| angiomyolipoma | Angiomyolipom (AML) | angiomyolipoma (AML) | آنژیومیولیپوما (AML) |
| fat-poor AML | fettarmes AML | fat-poor AML | AML کم‌چربی |
| tumour thrombus | Tumorthrombus | tumour thrombus | تومورترومبوز |
| macroscopic fat | makroskopisches Fett | macroscopic fat | چربی ماکروسکوپیک |

Translations preserve calibrated terms (“supports”, “may”, “often”, “not reliably”) and distinguish a clue from histologic proof. The same correct decision and caveat appear in DE/EN/FA feedback. RTL visual verification requires browser access.

## Independent verification and review

- PDF mapping: physical pp.46–51, each page rendered and visually inspected; footer numbering is one lower than physical PDF page number.
- Primary/guideline sources checked 2026-10-21: EAU RCC diagnostic evaluation (https://uroweb.org/guidelines/renal-cell-carcinoma/chapter/diagnostic-evaluation) for imaging and venous involvement; EAU RCC epidemiology/pathology (https://uroweb.org/guidelines/renal-cell-carcinoma/chapter/epidemiology-aetiology-and-pathology) for fat-poor AML limitation; Silverman et al., Bosniak v2019 (https://doi.org/10.1148/radiol.2019182646) for companion lesson version reference.
- Scientific scope: these checks verify the included imaging statements against sources; they are not clinical sign-off by Dr. Zia.
- Independent QA by separate `radyar_lesson_reviewer` agent, re-review of fixes completed 2026-10-21:

| Gate | Status | Evidence / limitation |
| --- | --- | --- |
| SRC | PASS (scoped solid-mass content) | Reviewer confirmed the RCC phase pattern, ink-artifact distinction, and TSC pattern are included and bounded. The separate p.47 polycystic-kidney heading remains a documented source gap; no disease content was invented. |
| EDU | PASS | Composition → patterns → reporting → decision → take-home; duplicate question removed. |
| VIS | PASS for stated use | Reviewer inspected the actual p.50 crop and confirmed it supports location/morphology. Caption does not claim phase or macroscopic-fat proof. |
| LNG | BLOCKED | Static semantic parity checked; actual Persian RTL rendering could not be inspected in browser. |
| ASM | PASS | Four options per registered MCQ, topic links and six localized flashcards; `test-solid-renal-masses.mjs` and `npm run audit:mcq` pass. |
| UX | BLOCKED | Browser cannot open local development server; no responsive/theme/interaction screenshot evidence. |
| REV | PASS for authored fixes | Independent reviewer confirmed RM-SRC-01/02/03, RM-VIS-01 and RM-MEDIA-02 resolved. Browser blockers remain separate. |
- First review also found duplicated embedded question text; the accessible radio-group legend is now a short instruction while the full prompt appears once.
- Browser QA: blocked in this environment: opening `http://localhost:3011/abdomen/niere/raumforderungen` in the in-app browser timed out; direct local request was denied by socket permissions. The app build also could not finish because Google Fonts could not resolve and Next reported `EPERM` creating `.next/server/app/api`. Do not treat source checks as visual browser evidence.
- Clinical review by Dr. Zia: pending. Publication status: not requested in this batch; user authorized pushes, and this is an incremental code push only.
