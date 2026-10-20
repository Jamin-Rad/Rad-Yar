# Renal trauma imaging — Abdomen.pdf pp.56–57

Status: bounded author draft complete; focused SSR/evidence checks pending execution at initial creation. Independent review, browser UX and clinical approval remain open. No treatment recommendations are made.

## Scope and learning task

- Exact curriculum ID: `nierentrauma`.
- Route: `/abdomen/niere/renaltrauma`.
- Source: `Abdomen.pdf`, physical pp.56–57; printed pp.55–56.
- Learner task: assign CT phases to their main renal-trauma imaging questions, systematically describe parenchymal, vascular and collecting-system injury, and identify the limits of the PDF fornix-rupture example.
- Chapters: (1) phase-to-question mapping, (2) systematic injury description, (3) urinary extravasation and source boundary, (4) three portable rules.
- Excluded: trauma triage criteria beyond brief context, hemodynamic treatment decisions, intervention algorithms, detailed injury-grade table and follow-up recommendations.

## Source coverage and claim boundaries

| ID | Evidence | Lesson treatment | Status |
|---|---|---|---|
| PDF-56-01 | Abdomen.pdf p.56 / printed p.55: the fornix is described as a vulnerable thin extension at the minor calyx; increased collecting-system pressure can cause rupture | Included only as source context for the following leak pattern; no general trauma mechanism inferred | Included, attribution bounded |
| PDF-56-02 | Abdomen.pdf p.56 / printed p.55: causes include obstruction, compression, congenital variants, iatrogenic causes and trauma | The lesson states that this list does not identify the mechanism in the illustrated case; the source's approximate frequency figure is omitted | Context retained; number omitted |
| PDF-57-01 | Abdomen.pdf p.57 / printed p.56: unenhanced phase notes a small amount of perirenal fluid and fat stranding; delayed CT urogram shows contrast passing from the renal pelvis into anterior and posterior retroperitoneal spaces; caption calls the latter finding typical of fornix rupture | Native-phase fluid/stranding are identified as nonspecific; delayed extraluminal urinary contrast is shown in the crop and caption. The lesson explicitly states that the slide does not document trauma in this particular patient | Included; no trauma attribution |
| SUP-EAU-01 | EAU Guidelines on Urological Trauma 2026, §4.1.2.b.1: CT is modality of choice for suspected renal trauma; ideal three-phase roles are arterial (vascular injury/active bleeding), nephrographic (parenchymal contusion/laceration), delayed (collecting-system/ureteric injury) | Concise phase map in all locales | Supplement, linked to current official guideline |
| SUP-EAU-02 | EAU 2026: delayed images are described at about five minutes; this timing may be unreliable in hypovolaemic patients; targeted delayed imaging is advised if injury may not be fully evaluated | Caveat retained in DE/EN/FA; no universal fixed protocol is prescribed | Supplement, timing and limitation stated |
| SUP-AAST-01 | AAST official organ-injury page links the renal OIS revision, 2025 version; primary update: Keihani et al., J Trauma Acute Care Surg. 2025;98(3):448–451, DOI 10.1097/TA.0000000000004509 | Lesson warns that scale versions changed and tells learners to name the version used; does not reproduce a complete grade table or claim the 2018 table is current | Version boundary included; exact grading table deferred to current original |

The PDF case proves a urinary leak pattern as described by its caption. Its placement in a “renal injury” section and the p.56 mention of trauma among possible causes do not prove that the depicted leak was caused by trauma. This distinction is stated beside the image and in all translations.

## Media plan and provenance

1. Hero: code-authored, non-diagnostic kidney injury schematic; no patient data or diagnostic text.
2. Phase diagram: code-native, localized three-step diagram linking arterial, nephrographic and delayed imaging to different search targets.
3. Case figure: crop from the PDF's CT image on p.57. The original arrows and circle remain visible. No case identifier, sequence metadata or contributor credit is legible. The user authorized use of all six lecture-PDF images on 19 October 2026. See `public/educational/nierentrauma/image-provenance.json`.

## Terminology

| Concept | DE | EN | FA |
|---|---|---|---|
| renal trauma | Nierentrauma | renal trauma | تروما کلیه |
| nephrographic phase | nephrographische Phase | nephrographic phase | فاز نفروگرافیک |
| collecting system | Harnableitungssystem / Sammelsystem | collecting system | سیستم جمع‌کننده |
| urinary extravasation | Urinkontrastmittelaustritt | urinary contrast extravasation | خروج ماده حاجب ادراری |
| fornix rupture | Fornixruptur | fornix rupture | پارگی فورنیکس |
| hematoma rim distance | Hämatom-Randdistanz (HRD) | hematoma rim distance (HRD) | فاصلهٔ حاشیهٔ هماتوم (HRD) |

## Validation and review handoff

- Focused route SSR: `node --import tsx scripts/test-renal-trauma-abdomen-p56-p57.mjs` — checks DE/EN/FA, RTL, exact curriculum mapping and `inProgress`, source media disclosure, case-mechanism caveat, localized phase schematic and self-check feedback.
- Independent review findings RT-SRC-01, RT-VIS-01 and RT-LNG-01 were addressed: native-phase source findings added and mapped above, phase arrow now points toward the delayed phase in the fixed diagram order, and German case grammar corrected. Delta review remains required.
- `git diff --check` is required after authoring.
- The test is technical/editorial evidence only. It does not prove guideline concordance, scientific correctness, browser behavior or clinical approval.
- Independent reviewer should verify the actual PDF pages, each phase claim against the cited EAU text, the AAST 2025 version warning against the current official scale, translation parity, source image interpretation and crop, and the rendered route in desktop/mobile, light/dark and keyboard interactions.
