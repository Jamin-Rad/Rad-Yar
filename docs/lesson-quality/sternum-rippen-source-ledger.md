# Sternum und Rippen — MSK PDF supplement

Authoring date: 2026-10-24. Route: `/msk/trauma/sternum-rippen`.
Topic and progress ID: `sternum-rippen-trauma`.
Base language: German; complete English and Persian semantic counterparts.

## Source scope and outline prepared before implementation

`C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, physical page 13, printed page 12, was extracted with pypdf and rendered with pypdfium2. The author personally viewed `tmp/sternum-rib/msk-p13.png`. The page ends with the heading **Sternum und Rippen** and an empty bullet. The upper Rockwood illustration and treatment text belong to AC-joint injury and do not supply chest-wall trauma content. No chest-wall clinical image or teaching claim occurs under this heading.

This is an explicitly externally sourced supplement, not a transcription of unprovided PDF content. Learner: radiology trainee evaluating blunt chest trauma. Goal: select an appropriate imaging approach, recognize a sternal fracture, describe rib injury, and continue the search for associated injuries.

| Exact German chapter title | Instructional purpose | Media |
| --- | --- | --- |
| Bildgebung nach Traumakontext | Distinguish minor isolated rib trauma from broader injury assessment; understand negative radiography limits | Four-option retrieval with individual feedback |
| Sternum sagittal prüfen | Identify cortical step-off and inspect retrosternal tissues; avoid reconstruction pitfalls | Typical sagittal CT, source figure 3 |
| Rippen und Thorax gemeinsam lesen | Describe rib fractures and deliberately inspect adjacent intrathoracic structures | Clearly labeled associated-injury case, source figure 2; search table |
| Drei Regeln für den Traumabefund | Compress imaging context, multiplanar confirmation and associated-injury search | Three take-home rules |

## Coverage and clinical evidence

| Point | Source / location | Status | Lesson location |
| --- | --- | --- | --- |
| Sternum and ribs trauma heading | MSK.pdf physical 13 / printed 12 | Covered with supplemental content; PDF itself has no details | Entire route |
| Initial chest radiograph for outpatient minor blunt rib trauma; greater value of CT in high-energy trauma | Zandee van Rilland et al., Radiology 2026, DOI 10.1148/radiol.252309, Table 2 and rib discussion | Official publisher text read on 2026-10-24 | `bildgebung`, MCQ `normal-radiograph`, first card |
| CT over dedicated sternum radiographs; radiography limitations | Same 2026 consensus, Table 5, sternum trauma section | Verified; no routine CT for every minor isolated rib injury asserted | `bildgebung` |
| Sagittal sternal-body cortical step-off and retrosternal hematoma | Şimşek, Akgül Özmen & Onat, Radiol Bras 2022;55:167–172; DOI 10.1590/0100-3984.2021.0074, original figure 3 | Original cohort and actual figure personally inspected | `sternum`, MCQ `sternum-plane`, second card |
| Rib/manubrial injury and left hemothorax; associated-injury search | Same original cohort, figures 2–3 and results/methods | Actual selected figure inspected; no cohort frequency presented as general risk | `rippen`, third card |
| Sagittal reconstruction, respiratory stair-step artifact, normal segmentation; lower-rib/upper-abdominal association | Multidetector Computer Tomography: Evaluation of Blunt Chest Trauma in Adults, 2014, PMC4175749, sections 6.1–6.2 | Technical review text retrieved by web search; later direct-open hit browser-check page. Supplementary technical source, not a primary trial | `sternum` pitfall, `rippen` |

Sources:
- https://pubs.rsna.org/doi/full/10.1148/radiol.252309 (official 2026 multidisciplinary consensus; retrieved 2026-10-24)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC9254712/ (original 2022 retrospective cohort; retrieved 2026-10-24)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC4175749/ (technical review; text accessed in search result, direct-open challenge documented)

No operative threshold, flail-chest definition, mortality percentage, treatment algorithm, or cardiac-injury screening algorithm added. No assertion that an isolated fracture proves an internal organ injury. Final scientific approval remains Dr. Zia's responsibility.

## Media provenance and inspection

All assets are local under `public/educational/sternum-rippen/`.

| File | Source and reuse | Inspection and teaching reason |
| --- | --- | --- |
| `sternum-ct.jpg` (683×706) | Şimşek et al. 2022, original figure 3; https://pmc.ncbi.nlm.nih.gov/articles/PMC9254712/#f3; unchanged download https://cdn.ncbi.nlm.nih.gov/pmc/blobs/6c7b/9254712/f4e9e0e899a4/rb-55-03-0167-g03.jpg | Personally viewed. Sagittal CT; A indicates cortical discontinuity/displacement of sternal body; B retrosternal soft-tissue hematoma. Clear typical sternal fracture used before complex case. |
| `ribs-associated-ct.jpg` (683×392) | Same authors, original figure 2; https://pmc.ncbi.nlm.nih.gov/articles/PMC9254712/#f2; unchanged download https://cdn.ncbi.nlm.nih.gov/pmc/blobs/6c7b/9254712/a44d2add54e9/rb-55-03-0167-g02.jpg | Personally viewed. Axial CT with manubrial fracture A, left rib fracture B and left pleural fluid C (hemothorax in source). Explicitly labeled as combined injury, not first-exposure isolated rib case. |
| `hero.png` (1536×1024) | Built-in imagegen; exact prompt in `public/educational/sternum-rippen/hero-generation.md` | Personally viewed: conceptual ivory rib cage/teal cartilage with amber fracture accents. No simulated diagnostic scan or text. Topic orientation only; not precise anatomy assessment. |

The clinical article's copyright/license section explicitly states Creative Commons Attribution permitting unrestricted use/distribution/reproduction with citation. Attribution is visible under each image, and translated captions/alt explain the specific arrows. Original arrows retained; images not cropped or altered. Exact source anchors `f2` and `f3` verified in fetched HTML. No Radiopaedia permission inference is needed for these two images.

## Terminology and parity

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Sternal body | Sternumkörper | sternal body | تنهٔ جناغ |
| Nondisplaced fracture | nicht dislozierte Fraktur | nondisplaced fracture | شکستگی بدون جابه‌جایی |
| Cortical step-off | Kortikalisstufe | cortical step-off | پلهٔ کورتیکال |
| Retrosternal hematoma | retrosternales Hämatom | retrosternal hematoma | هماتوم پشت جناغ |
| Hemothorax | Hämatothorax | hemothorax | هموتوراکس |

All paragraphs, negation (normal radiograph does not exclude fracture), conditional imaging choice, labels, captions, alt, four distractors and per-option feedback translated in parallel. No untranslated German fallback content is used in Persian/English. Source author names/titles remain original bibliography.

## Assessment linkage and tests

- MCQs: `sternum-rippen-trauma-{de|en|fa}-normal-radiograph` (B) and `sternum-rippen-trauma-{de|en|fa}-sternum-plane` (C).
- Flashcards: `sternum-rippen-trauma-radiograph`, `sternum-rippen-trauma-sternum`, `sternum-rippen-trauma-surroundings`.
- Exported banks: `STERNUM_RIB_QUESTIONS`, `STERNUM_RIB_FLASHCARDS`, `STERNUM_RIB_FLASHCARD_TOPIC`. Parent integrates registries and curriculum.
- `node --import tsx scripts/test-sternum-rib-ssr.mjs`: PASS. Actual route and maintained shell compiled and rendered in DE/EN/FA; unique H1, locale/RTL, exactly one initial open chapter, assets, target training links, four-option consistency, chosen-option feedback wiring and localized card fields checked.
- SSR does not establish browser layout, interaction, global bank registration or clinical approval. Parent's real browser evidence and independent reviewer findings must be appended/referenced before final acceptance.

## Separate status fields

`editorial_qa: author_checks_passed; independent_review_pending`

`scientific_review: pending_Dr_Zia`

`browser_qa: pending_parent`

`publication: pending_parent_main_integration`

## Independent review repair cycle 1

- SR-SRC-01: 2026 consensus adult population made explicit in first lead and radiograph MCQ in DE/EN/FA. This lesson does not apply an adult imaging pathway to pediatric trauma.
- SR-ASM-01: implausible “ignore the visible ribs” distractor replaced with “recheck only axial images in the soft-tissue window”; translated feedback explains the added cortical value of bone windows and sagittal reconstruction.
- SSR rerun passed after both changes; independent re-review requested.
