# Spine metabolic completion source plan — 2026-10-24

Wirbelsäule.pdf PDF p27 contains topic headings only: osteoporosis and renal osteodystrophy. All radiological teaching below is explicitly supplemental. Author additionally inspected rendered page-27.png and extracted p027.txt; printed page 26. No teaching prose or diagnostic images appear on this page.

| Topic | Goals / chapter sequence | Supplemental evidence |
|---|---|---|
| Osteoporosis | recognize vertebral deformation; separate fracture morphology from activity; distinguish DXA from fracture imaging | NASS 2024 Osteoporotic Vertebral Compression Fractures guideline; ISCD 2023 official positions; Liu et al JMIR Med Inform 2025;13:e75665, Fig3 |
| Renal osteodystrophy | recognize endplate bands; distinguish imaging pattern from CKD-MBD spectrum; interpret BMD and biochemical context | KDIGO 2017 CKD-MBD 3.2.1–3.2.3; Abdulla 2024 doi10.4103/ijn.ijn_387_23; Hellerhoff original radiograph |

Essential scope: two bounded introductory spine lessons, not complete osteoporosis management or CKD therapy. No threshold-heavy classification. No invented PDF prose.

Visual plan: generated anatomical conceptual hero for each topic, explicitly non-diagnostic. Osteoporosis real sagittal CT and fat-suppressed T2 MRI (Liu Fig3 A/B), showing morphology versus edema. Renal: real lateral radiograph by Hellerhoff, morphological hyperparathyroidism example; source does NOT establish CKD and caption must say so. Image acquisition/inspection pending at planning time.

Terminology: Wirbelkörper / vertebral body / جسم مهره; Knochenmarködem / marrow edema / ادم مغز استخوان; Hinterwand / posterior wall / دیوارهٔ خلفی; Deck- und Grundplatten / upper and lower endplates / صفحات انتهایی فوقانی و تحتانی; Knochenumsatz / bone turnover / بازسازی استخوان; Knochendichte / bone mineral density / تراکم معدنی استخوان.

Assessment plan: 2 applied four-option MCQs and 2 focused recall cards per topic, equivalent DE/EN/FA. Inline answer-specific feedback; language switch resets state. Exact topic-bound practice actions and encoded localized return route.

External sources checked 2026-10-24. Independent review and browser evidence pending; no scientific release approval claimed.

## Final media and verification ledger

- Osteoporosis hero: generated anatomical concept, visually inspected 2026-10-24; sparse trabeculae and wedge compression, explicitly not a clinical scan. Renal hero: generated endplate-band concept with kidney context, visually inspected. Both are topic-specific, not teaching evidence.
- `public/educational/spine-osteoporosis/liu-2025-fig3.jpg`: Liu et al, JMIR Med Inform 2025;13:e75665, Fig3. Original unchanged 800x237 image downloaded from https://cdn.ncbi.nlm.nih.gov/pmc/blobs/099a/12396830/f2ae7e593e9a/medinform-v13-e75665-g003.jpg . Primary article https://medinform.jmir.org/2025/1/e75665 . CC BY4.0 verified in PMC full article. Full author credit, copyright, article citation, publisher link and license included. Visually inspected: A sagittal CT shows compressed L4 and cleft; B fat-suppressed T2 sagittal MRI shows increased signal in the same fractured body. C/D are segmentation and surface model, clearly labeled as research panels rather than diagnostic comparisons. Kept original figure without crop or AI modification.
- `public/educational/spine-renal-osteodystrophy/rugger-jersey.jpg`: Hellerhoff original work, 2021, lateral chest radiograph 919x1122. https://commons.wikimedia.org/wiki/File:Rugger-Jersey-Wirbelsaeule_bei_Hyperparathyreoidismus_66M_-_CR_seitlich_-_001.jpg . CC BY-SA4.0, original unchanged. Inspected: broad dense endplate bands particularly clear at lower visible vertebrae, with relatively less dense centers. Source says hyperparathyroidism, not established CKD; all three captions explicitly state this boundary. Source/author/license/change notice displayed next to image.
- Normal public `Invoke-WebRequest` succeeded; urllib 403 responses were not circumvented. No credential or paywall bypass.
- NASS2024 PDF p9 glossary checked: edema in clinical context and persistent edema with unhealed component; no exact dating claim. ISCD2023 checked: visual VFA diagnosis rather than morphometry alone; handling structural change in DXA. KDIGO2017 3.2.1–3.2.3 checked: BMD for decision-relevant fracture risk, histological type not determined by BMD, selected biopsy and PTH/bone ALP context.
- `node --import tsx scripts/test-spine-metabolic-ssr.mjs` PASS: 2 routes x3 languages; StandardLessonShell, one initially open chapter, RTL, clinical/hero files, 2 MCQs/topic/language and 2 cards/topic, answer-specific feedback, encoded localized from routes. This is SSR and structural verification, not browser or scientific acceptance.
- Browser desktop/mobile/theme/interaction evidence and independent reviewer acceptance remain coordinator-owned. No commit/push by this author.
