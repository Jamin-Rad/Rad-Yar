# LCH bone lesson: source ledger and author handoff

## Scope and curriculum relationship

- Route: `/msk/tumoren/eosinophiles-granulom`
- Curriculum node: `eosinophiles-granulom` under MSK → bone tumours → tumour-like lesions.
- Source language: the user PDF is German; DE is the authored base, EN and FA are translated semantic equivalents.
- Learner promise: recognize several suggestive osseous LCH patterns, select what CT/MRI contribute to lesion extent, and stop short of asserting histology from imaging.
- Scope: bone imaging only. Systemic evaluation, staging and treatment are deliberately excluded.
- Source relationship: **supplemental lesson**. `MSK.pdf` physical p.108 (printed p.107) teaches non-ossifying fibroma; it only mentions “eosinophiles Granulom” in the NOF differential. It does not supply the LCH teaching content.

## Proposed chapter plan

1. **Welche Knochenmuster legen LCH nahe?** — Introduce the nonspecific lytic spectrum and three suggestive anatomic patterns.
2. **Was prüfe ich in jeder Modalität?** — Separate radiograph pattern description from CT bone detail and MRI marrow/soft-tissue extent.
3. **Wo endet der Bildbefund?** — Distinguish suspicion from pathological diagnosis and constrain the report to what imaging shows.
4. **Drei Regeln für den Bericht** — Apply one embedded decision with explanatory feedback, then compress into three take-home rules.

## Source coverage ledger

| Claim / source unit | Source and location | Importance | Lesson destination | Status / limitation |
| --- | --- | --- | --- | --- |
| “Eosinophilic granuloma” is mentioned in the NOF differential; its appearance may be more aggressive, periosteal reaction possible, sclerotic margin not guaranteed | User `MSK.pdf`, physical p.108 / printed p.107; extracted text and full-page image reviewed (`tmp/lch-msk-p108.png`) | Essential link to the user's curriculum source | Source note, PDF source card, modality caveat | Included as a *differential note only*. Page does not teach LCH and does not support the rest of the lesson. Its NOF radiographs are not reused as LCH images. |
| Imaging findings in bone LCH are variable/nonspecific; study included 82 pathology-confirmed patients | Zhao et al., *World Journal of Surgical Oncology* 2021;19:146, abstract, methods and conclusions | Essential source for uncertainty | Intro, limits, question feedback | Included; retrospective single-centre study, not a universal diagnostic rule. |
| Suggestive patterns: isolated long-bone diaphyseal destruction with fusiform periosteal reaction and peripheral edema; vertebra plana; bevelled skull defect with soft-tissue mass | Zhao et al. 2021, conclusions and image descriptions | Essential imaging pattern | Pattern table, diagram, embedded question, MCQ 1, card 1 | Included with “suggestive, not specific” framing. The study itself notes variable patterns and diagnostic difficulty. |
| Long-bone periosteal reaction varies; multilayer/fusiform forms observed in cohort | Zhao et al. 2021, radiographic findings discussion | Essential to reconcile with PDF's “possible” phrasing | Radiograph row and bilingual/tri-lingual caveat | Included; no claim that all active lesions have this feature. |
| CT/MRI characterize bone destruction and marrow/soft-tissue extent; imaging does not determine histology | Zhao et al. 2021, methods, imaging descriptions and diagnostic basis; NCI PDQ, bone biopsy section | Essential boundary | Modalities table, limits, MCQ 2, flashcards | Included; not a biopsy decision algorithm. |
| Sclerotic margin is not guaranteed in the source differential; radiographic appearance varies | User `MSK.pdf` physical p.108; Zhao et al. 2021, variable imaging pattern | Essential caution | Modality caveat, MCQ 3, flashcard 3 | Included without a phase-specific rule not established by this source set. |
| Systemic disease evaluation, whole-body imaging protocol, treatment choices | Not covered by the supplied PDF page; multiple external sources exist but are outside this lesson | Optional/out of scope | Excluded | Explicitly excluded to avoid implying a complete LCH curriculum or management guide. |

## External sources actually consulted

1. Zhao M, Tang L, Sun S, Cui J, Chen H. **Radiologic findings that aid in the reduction of misdiagnoses of Langerhans cell histiocytosis of the bone: a retrospective study.** *World J Surg Oncol.* 2021;19:146. doi:[10.1186/s12957-021-02261-y](https://doi.org/10.1186/s12957-021-02261-y). Primary retrospective cohort of 82 pathology-confirmed patients. Supports variable/nonspecific imaging, radiographic patterns, modality descriptions and histological/immunophenotypic diagnosis. It is not a guideline and its single-centre cohort limits generalization.
2. National Cancer Institute. **Langerhans Cell Histiocytosis Treatment (PDQ®), Health Professional Version.** [NCI PDQ](https://www.cancer.gov/types/langerhans/hp/langerhans-treatment-pdq), “Biopsy” section. Current page checked 2026-10-22; latest update listed on the page: 2025-01-06. Official, regularly reviewed clinical summary used narrowly to support that lytic bone lesions are commonly sampled for diagnosis; not used for treatment content.

## Media ledger

| Purpose | Asset | Type / source / rights | Alt/caption and rationale | Status |
| --- | --- | --- | --- | --- |
| Topic-specific LessonHero | `public/educational/eosinophiles-granulom/hero.svg` | Original RadYar code-native SVG, created for this lesson; no patient data | Translated alt in DE/EN/FA identifies a non-diagnostic long-bone schematic and its diaphyseal focus. | Included; no visible SVG text that would be untranslated. |
| Compare the locations of three suggestive patterns | `public/educational/eosinophiles-granulom/patterns.svg` | Original RadYar code-native SVG, created for this lesson; no patient data | Translated alt and caption map left/centre/right patterns; supports spatial comparison, not recognition of real imaging. | Included; caption marks conceptual/non-diagnostic and explicitly says none is diagnostic alone. |
| Skull LCH case for image-recognition transfer | Scott S. Radiopaedia rID 160614, [case page](https://radiopaedia.org/cases/160614), DOI 10.53347/rID-160614. Case details checked against the indexed case page; its image viewer was not independently inspected in this task. | Important applied case; pathology-confirmed case describes clustered lytic lesions along the right coronal suture, bevelled margins and adjacent soft-tissue prominence | Localized case card in the pattern section and source list; opens Radiopaedia original case and images | User has explicitly confirmed permission for RadYar commercial reuse of Radiopaedia cases. This implementation links to the source and does not copy or embed its images. **VIS partial/open:** learner can inspect the official image case, but in-page visual review/rendering and image-recognition assessment remain open. |

## Assessment mapping

- Embedded self-check: diaphyseal lytic destruction plus fusiform reaction → suggestive, not specific. Every choice changes the explanatory feedback.
- Three MCQs per language: suggestive pattern; modality roles; no sclerotic margin is not diagnostic. Each has four options, one correct answer and a keyed explanation for each incorrect option.
- Three flashcards per language: pattern, CT/MRI roles, diagnostic limit.
- Assessment sources cite Zhao et al. 2021 and label MSK.pdf only as the source of the NOF differential mention.

## Translation terminology

| Concept | DE | EN | FA | Sensitive meaning checked |
| --- | --- | --- | --- | --- |
| Disease name in this lesson | Langerhans-Zell-Histiozytose des Knochens | Osseous Langerhans cell histiocytosis | هیستیوسیتوز سلول لانگرهانس در استخوان | The route retains the existing curriculum ID `eosinophiles-granulom`; the page title uses the current descriptive term “osseous LCH.” No independent terminology history claim is made. |
| Suggestive, not specific | kann … nahelegen, nicht spezifisch | may suggest, not specific | می‌تواند مطرح کند، اختصاصی نیست | Uncertainty is preserved in prose, assessments and diagram caption. |
| Sclerotic margin not guaranteed | sklerotischer Randsaum nicht garantiert | sclerotic margin not guaranteed | حاشیهٔ اسکلروتیک تضمین‌شده نیست | Stays tied to PDF differential note, not generalized into a diagnostic rule. |
| Tissue confirmation | histologische/immunphänotypische Diagnose | histological/immunophenotypic diagnosis | تشخیص بافت‌شناختی/ایمونوفنوتیپی | Imaging alone is explicitly insufficient in each language. |

## Authoring validation and independent review

- Route, curriculum link, MCQ bank, flashcard route and translations: focused script passed (`node --import tsx scripts/check-eosinophiles-granulom.mjs`), including 51 translated units and nine localized MCQs with keyed wrong-answer explanations.
- Build and browser behavior: pending. A build or code-level test will not establish real browser QA.
- Independent reviewer: bounded static review passed for source scope, education, localization, assessment wiring and route conventions. The reviewer did not inspect the Radiopaedia case card added afterward; that delta review remains pending. No clinical sign-off.
- Scientific sign-off by Dr. Zia: pending.
- Publication: not requested by this subtask.
