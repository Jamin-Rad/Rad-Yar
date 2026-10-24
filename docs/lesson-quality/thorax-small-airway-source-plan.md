# Bronchiolitis and hypersensitivity pneumonitis: author plan

Date: 2026-10-24. Scope: two bounded source-derived imaging lessons, not full treatment courses. Builder: thorax_small_airway_builder. Primary coverage source: user Thorax.pdf. Read text and rendered physical pp19,20,29,37; p29 bronchiolitis and p37 EAA are headings only. p19 supplies real cases and pattern text; p20 supplies tree-in-bud morphology.

## Exact chapter outline

Bronchiolitis:
1. **Die kleinen Atemwege sichtbar machen** — recognize centrilobular nodules/branching opacities in the supplied CT; explain why normally invisible bronchioles become visible.
2. **Muster und Ursache trennen** — relate tree-in-bud to bronchiolar plugging, retain infection/aspiration/inflammatory differential and limits of etiologic inference; embedded decisions.
3. **Drei Regeln für die Bildbeurteilung** — compress location, morphology and clinical-context rules.

HP/EAA:
1. **Parenchym und kleine Atemwege zusammen lesen** — introduce immune-mediated antigen response and the combination of GGO/nodules with airway disease; supplied p19 case.
2. **Fibrose und Air-Trapping gezielt prüfen** — distinguish fibrotic/nonfibrotic pattern, inspiration mosaic versus expiratory air trapping; precise comparison table, embedded decisions.
3. **Den CT-Verdacht klinisch einordnen** — exposure history and multidisciplinary integration, no CT-only confirmation; three take-home rules.

## Coverage/media

| Key | PDF physical/printed | Disposition |
|---|---|---|
| B1 centrilobular position and relative pleural sparing |19/18|Core firstchapter; avoid treating a 5–10mm distance as universal measured cutoff|
| B2 bronchiolar wall thickening/nodules |19/18|Original p019-Image325.jpg, rID24616; source frame personally inspected|
| B3 tree-in-bud branching/plugging |20/19|Core secondchapter; mechanism schematic; mucus/pus from source|
| B4 named disease |29/28|Source placeholder completed through B1–B3 and sourced context|
| H1 ill-defined centrilobular ground-glass nodules |19/18|Original p019-Image326.jpg, rID17192; personally inspected. Single axial image (respiratory phase not verified) cannot demonstrate expiratory air trapping or prove etiology|
| H2 EAA heading |37/36|Bounded primary-guideline supplement explicitly recorded|
| H3 nonfibrotic/fibrotic patterns; diagnostic integration |ATS/JRS/ALAT2020; CHEST2021|Supplement; no treatment/biopsy thresholds|

Illustrations: generate a topic-specific non-diagnostic bronchiolar schematic and a separate antigen/small-airway/parenchymal schematic. No simulated CT scans. Original source images are authorized by user's standing instruction; contributor/study/frame not individually verified beyond PDF page+rID, recorded honestly. No invented attribution.

Sources checked: Fleischner Society glossary2024 doi10.1148/radiol.232558 bronchiole/tree-in-bud definitions; ATS/JRS/ALAT diagnosis guideline2020 doi10.1164/rccm.202005-2032ST; CHEST2021 doi10.1016/j.chest.2021.03.066 (diagnostic approach). Primary source supplementation separate from source PDF.

Terminology: Bronchiolitis / bronchiolitis / برونشیولیت; zentrilobulär / centrilobular / سنترلوبولار; Tree-in-bud / tree-in-bud / درخت در جوانه; Milchglas / ground glass / شیشه‌مات; Air-Trapping / air trapping / حبس هوا; Hypersensitivitätspneumonitis / hypersensitivity pneumonitis / پنومونیت حساسیتی; Fibrose / fibrosis / فیبروز. Negation and uncertainty preserved across DE/EN/FA.

Validation pending: independent content/translation review, parent global registration, rendered browser matrix and build. Scientific approval Dr. Zia pending.


## Author validation / source access

Both source CT frames individually inspected after extraction. Generated header outputs individually inspected: branching airway with plugs for bronchiolitis; conceptual antigen response at small airway/alveolar level for HP. These are not diagnostic scans and are explicitly labelled in translated alt. Built-in imagegen used; final assets public/educational/thorax-bronchiolitis/hero.png and public/educational/thorax-hp/hero.png. Prompts requested scientific-educational, midnight teal editorial 3D concepts without text or simulated CT, one with inflamed bronchiole and mucus plugs, the other with inhaled particles and combined bronchiolar/alveolar reaction.

Source retrieval: RSNA full-text glossary opened, Bronchiole, Small Airways Disease and tree-in-bud entries read. ATS2020 HRCT Tables5–6, definitions, diagnostic criteria and exposure integration read through indexed primary full-text excerpts; direct PMC open returned browser verification. CHEST indexed Table6 and executive-summary evidence read; direct full text returned403. No treatment or numerical diagnostic thresholds copied. Expiratory CT not available for source HP case, so acquisition phase is not asserted. HP source p19 contains a single static frame.

Authored files: data/thoraxBronchiolitisLesson.js; data/thoraxHypersensitivityLesson.js; app/thorax/bronchiolitis/{page.jsx,SmallAirwayLesson.jsx,page.module.css}; app/thorax/hypersensitivitaetspneumonitis/page.jsx; dedicated assets. Parent integrates registries.

Tests: node --import tsx scripts/test-thorax-small-airway.mjs passes; checks DE/EN/FA units, answer parity, per-distractor feedback, localcheck/global MCQ/card consistency, and local assets. Browser and independent review remain pending at author handoff. No clinical signoff claimed.

Additional visual after independent reviewer request: HP chapter2 includes code-native three-density lobule schematic and a paired inspiration/expiration normal-versus-air-trapping diagram. Clearly not CT or a measurement scale; no diagnostic evidence claim. Original CT remains the first visual. Generated hero provenance and prompt specifications above apply only to headers.

HTTP smoke after read-only local-network escalation: exact /thorax/bronchiolitis and /thorax/hypersensitivitaetspneumonitis returned200 and HTML on localhost3021. An initial misspelled test URL returned404; corrected exact path returned200. This is route compilation evidence, not browser interaction/visual QA.
