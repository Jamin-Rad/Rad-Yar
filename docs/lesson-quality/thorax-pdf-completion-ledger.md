# Thorax.pdf completion ledger

Source audit: 2026-10-24. Baseline commit: `1f90d4e254734a9771ec2be7943a5d214322fcdb`.

## Evidence and limits

The supplied `C:/Users/Drham/OneDrive/Desktop/Lerncore/Thorax.pdf` has **50 physical PDF pages** (6,363,289 bytes), German text, English radiological terms, clinical images, anatomical plates and comparison tables. Physical page numbers are used throughout; after the cover, the printed number is one lower. Text extraction is readable, but decorative bullets become private-use glyphs and the segment anatomy on p7 is mainly an embedded image. Pages 2–4, 29, 38–39, 44–45 and 50 contain headings or placeholder characters, not hidden substantive prose. Page 37 has TB content above the EAA heading; page 49 has oedema content above the ARDS heading.

All 50 pages were extracted with pypdf and rendered with Poppler. All five contact sheets were inspected; enlarged pages 7, 9, 10, 19, 29, 37, 44 and 45 and the candidate raw images below were also inspected. Evidence lives under `tmp/thorax-completion/`: `p001.txt`–`p050.txt`, `text.txt`, `page-01.png`–`page-50.png`, `sheet-001.jpg`, `sheet-013.jpg`, `sheet-025.jpg`, `sheet-037.jpg`, `sheet-049.jpg`, and `source-images/`.

Coverage means corresponding teaching content exists in the actual route/component/data, not that a curriculum status says complete. This audit establishes source scope and missing topics. It is not a clinical certification, full UI review, or release approval of existing lessons. Previously authored material remains eligible for the user's later lesson-by-lesson improvement pass.

## Completion delta at the baseline

Five named topics require a bounded lesson: **Pectus excavatum, bronchiolitis, hypersensitivity pneumonitis/EAA, cystic fibrosis, and lung-cyst differential diagnosis**. The first three have substantive source material and clinical images elsewhere in this PDF. CF has only a heading. Cyst differential has a heading plus relevant morphology elsewhere. External teaching additions must be explicitly sourced rather than attributed to the empty source pages. This is consistent with the existing bounded COPD, bronchiectasis and lung-cancer supplements built from named heading-only topics.

Generic organ placeholders (mediastinum, heart/pericardium, great vessels, breast) do not define missing diseases or authorize inventing full organ courses. The generic ILD heading is addressed through its named source patterns and diseases, not an invented list of every ILD.

## Page-by-page point map

Priority: **core** = substantive teaching point; **support** = explanatory/contextual point; **cue** = named topic without teaching content. “Covered” is baseline source coverage, not an overall quality grade. Each row explicitly applies to `Thorax.pdf` at the stated physical page.

| PDF page | Source teaching points / priority | Actual lesson location and disposition |
|---|---|---|
| 1 | Cover, author and dates; support | Administrative; no lesson needed. |
| 2 | Mediastinum, “Topic”, empty bullet; cue | Deferred placeholder: no specific disease, image or teachable content. |
| 3 | Heart/pericardium, “Sdfs”; cue | Deferred placeholder for same reason. |
| 4 | Great vessels, “fghrf”; cue | Deferred placeholder for same reason. |
| 5 | Secondary lobule boundary/size, central bronchiole and artery, peripheral veins/lymphatics; acinus location and size; core | Covered: `/thorax/anatomie/lungenanatomie`, `data/lungenanatomie.js`. |
| 6 | Acinus not individually visible normally, filled acinar opacity; axial/peripheral/intralobular interstitium and associated CT patterns; core | Covered in the same anatomy lesson. |
| 7 | Labelled lung lobes, S1–S10, segmental bronchi, left-sided segment combinations and axial anatomic levels; core, image-led | Covered: anatomy lesson segment material and segment image. This page is not blank despite minimal extracted text. |
| 8 | Infracardiac accessory lobe, superior accessory fissure separating S6, left horizontal fissure separating lingula; core | Covered: anatomy lesson variant section with PDF cases rID23182/34669. |
| 9 upper | Azygos lobe embryological vein/pleura course, not a true accessory lobe, convex apical fissure; core. Approximate prevalence; support | Covered: anatomy lesson azygos section and rID13544. Exact prevalence is nonessential source context. |
| 9 lower | Pectus excavatum: depressed sternum, apparent paracardiac opacity, altered cardiac silhouette, steep anterior ribs; core | **Unresolved/missing lesson** at baseline. No pectus/trichterbrust content in app/data. Build bounded chest-wall projection lesson using frontal/lateral source CXR rID33208. |
| 10 | Accessory first-rib articulation/pseudoarthrosis, upper-zone apparent nodule on projection; core | Covered: `/thorax/rippenpathologien`, `data/firstRibPseudoarticulation.js`, original p10 image. Do not duplicate. |
| 11 | Atelectasis volume loss and secondary displacement; rounded atelectasis, pleural folding, comet tail; core | Covered: `/thorax/hrct/dichteanhebung#atelektase`, `data/hrct-muster.js`. “Pathognomonic” source wording is not automatically endorsed. |
| 12 upper | Pulmonary infarction, vascular occlusion context, pleural-based wedge and Hampton-hump concept; core | Covered: `/thorax/akute-le`, `data/pulmonaryInfarctLesson.js`; explicitly bounded infarct supplement, not a complete acute PE management course. Source CT rID27283 already present. |
| 12 lower | Alveolar filling; morphology preferable to vague “infiltrate”; GGO preserves vessel visibility; core | Covered: `/thorax/hrct/dichteanhebung#ggo`. |
| 13 | Consolidation obscures vessel margins; shape/distribution; reversed halo/atoll and differential; core | Covered: HRCT increased-density lesson and its source images; pathogen/disease specificity must remain qualified. |
| 14 | Nodule/mass size, solid/subsolid density; mean diameter; solid Fleischner pathways and risk factors; core | Covered: HRCT increased-density lesson plus `/thorax/fleischner-kriterien`. Source terminology and shortened follow-up schedules require primary-guideline interpretation, not literal copying. |
| 15 | Pure GGO versus part-solid follow-up; PFN shape/location/lymph-node interpretation; core | Covered across Fleischner and HRCT nodule section (including PFN visual). Exact PFN follow-up wording remains a guideline-verification item in later optimization. |
| 16 | Reticular/reticulonodular morphology; smooth versus nodular/irregular septa; lymphangitic tumour spread, asymmetric distribution, nodes, differential; core | Covered: `/thorax/hrct/retikulaer-nodulaer`, actual reticular chapter in `data/hrct-muster.js`. Numerical frequency claims need not be reproduced as universal rules. |
| 17 upper | Cardiogenic oedema: smooth septa/GGO, dependent/perihilar distribution, cuffing, fissural fluid, cardiac size/effusions; core | Covered: `/thorax/lungenoedem` and HRCT increased-density lesson. |
| 17 lower | UIP source pattern: basal subpleural honeycombing, traction bronchiectasis, architectural destruction; core | Covered: `/thorax/uip-ipf`, `data/thoraxUipIpfLesson.js`. UIP/IPF are not interchangeable; source definition is overbroad. |
| 18 | Perilymphatic/centrilobular/random distribution algorithm; perilymphatic locations and sarcoid/lymphangitic/pneumoconiosis DD; core | Covered: HRCT reticular/nodular distribution chapter; sarcoid case rID89958. |
| 19 | Centrilobular nodules spare immediate pleura/fissures; bronchiolitis CT; HP/respiratory bronchiolitis/infectious DD; ill-defined acinar GGO in HP; core | Pattern covered in HRCT; **dedicated bronchiolitis and HP teaching missing**. Use real p19 images as anchors for p29 and p37 topic cues. |
| 20 | Tree-in-bud branching/impacted bronchioles; random haematogenous distribution and differential; core | Covered: HRCT reticular/nodular chapter; tree-in-bud rID12039 and random-nodule image. New bronchiolitis lesson should link back, not repeat the entire HRCT lesson. |
| 21 | Smoker-associated LCH, upper-zone nodules evolving into irregular cysts, costophrenic sparing, interval change; core | Covered: `/thorax/lch-lunge` and HRCT reticular/nodular chapter. Source rID161054 paired images. |
| 22 | Honeycombing morphology and fibrosis context; mosaic attenuation: parenchymal, small-airway, vascular causes; core | Covered: `/thorax/hrct/architekturmuster`. |
| 23 | Crazy paving = GGO plus septal thickening; geographical distribution; PAP association and infectious/haemorrhagic/oedema DD; core | Covered: HRCT architecture lesson. PAP aetiology in source is oversimplified; do not treat pattern as diagnostic. |
| 24 | Bulla versus cyst: size, wall, emphysema context; examples LAM/LCH; core | Morphology covered: `/thorax/hrct/dichteminderung`. **Diffuse cyst-disease comparison missing** for p45 cue. Source solitary cyst image cannot diagnose LAM or CF. |
| 25 | Cavity within lesion, necrosis; wall/inner contour/content; differential by distribution; core | Covered: HRCT low-density lesson and `/thorax/kavitaeten`, `data/thoraxCavities.js`. Wall thickness is probabilistic, not a binary diagnostic threshold. |
| 26 | Abscess, cavitating TB, mobile intracavitary aspergilloma, cavitating SCC; core | Covered: cavity lesson plus TB and lung-cancer lessons. |
| 27 | Breast-implant projected contours; exposure/contrast comparison; PA/AP context; core | Covered: `/thorax/roentgen-thorax-systematik`. The page's conflicting BWS-versus-thorax kV statements are not valid acquisition instructions; source flags below. |
| 28 | PA/AP heart magnification; rotation, inspiration, penetration, motion; scapular/clavicular clues; core | Covered: chest-radiography quality/projection lesson. Projection clues are support, not mandatory universal appearances. |
| 29 | Bronchiectasis, bronchiolitis, COPD headings only; cue | Bronchiectasis `/thorax/bronchiektasen` and COPD `/thorax/copd-bildgebung` are existing bounded sourced supplements. **Bronchiolitis remains missing**, with source evidence p19–20. |
| 30 | Paediatric aspiration age, indirect signs: hyperinflation/air trapping, shift, obstructive atelectasis; core | Covered: `/thorax/fremdkoerperaspiration` and source CXR rID49402. Source “no side preference” requires age/context qualification. |
| 31 | Inspiratory/expiratory and decubitus assessment; dependent lung expected density; unilateral lucency DD; core | Covered in same aspiration lesson. |
| 32 | Immune context; lobar pneumonia and air bronchograms; core | Covered: `/thorax/pneumonie-muster`. Source “almost always bacterial” is not a general scientific rule. |
| 33 | Bronchopneumonic versus interstitial pattern, distribution and organism examples; core | Covered: pneumonia patterns lesson. |
| 34 | Air bronchogram, tree-in-bud, GGO; viral/CMV/COVID and invasive aspergillosis/halo; core | Covered: pneumonia patterns lesson. Source absolute specificity/exclusion wording must not be preserved. |
| 35 | Air crescent versus aspergilloma context; PJP/GGO/pneumatocele/pneumothorax; abscess, empyema split-pleura, postinfectious pneumatocele; core | Covered: pneumonia pattern rows include PJP, empyema and postinfectious pneumatoceles; cavity lesson covers abscess/aspergilloma. |
| 36 | Primary TB/Ghon/Ranke; postprimary apical distribution, cavity and endobronchial spread; core | Covered: `/thorax/tuberkulose-muster`. Tree-in-bud does not alone prove active TB. |
| 37 upper | TB case collage and miliary 1–3 mm random nodules; core | Covered: TB lesson. The top rID40135 image shows a cavity and must not be reassigned as an HP case. |
| 37 lower | EAA heading only; cue | **Missing bounded HP/EAA lesson**. Source p19 provides additional actual content and image. |
| 38 | Lung nodule, lung carcinoma, solitary versus multiple headings; cue | Covered: Fleischner/HRCT and `/thorax/bronchialkarzinom-bildgebung`, `data/lungCarcinomaImagingLesson.js`, with declared external supplement. |
| 39 | Generic ILD heading only; cue | Deferred generic umbrella. Named UIP, sarcoid, LCH and HRCT patterns are mapped separately. Does not require inventing NSIP/COP/AIP courses from an empty page. |
| 40 | Sarcoid granulomas/systemic context and Scadding 0–IV; core | Covered: `/lunge/sarkoidose`. |
| 41 | Scadding I–IV CXR/CT visual examples; core | Covered: same sarcoid lesson stage cases. CT examples support morphology; Scadding is a CXR classification. |
| 42 | Symmetric hilar/right paratracheal nodes, eggshell; perilymphatic upper-zone nodules, galaxy/cluster; bone/cardiac/neural manifestations; core/support | Covered: sarcoid lesson. rID29251 CT plus nonmedical galaxy analogy; latter is not a clinical image. |
| 43 | Heerfordt; sarcoid DD; asbestosis/silicosis/sarcoid distribution, pleura, nodes and fibrosis comparison; core | Covered in sarcoid lesson DD/comparison. Malignancy-risk row needs verification and is not a universal low-risk assertion. Separate full occupational-disease courses not defined by this comparison alone. |
| 44 | Cystic fibrosis/mucoviscidosis heading only; cue | **Missing bounded CF chest-imaging lesson**. Requires primary-source supplement and an actual suitable external case; no source CT exists on this page. |
| 45 | Lung-cyst differential heading only; cue | **Missing bounded cyst-DD lesson**. Reuse p24 morphology and p21 LCH context; primary-source additions for any disease-specific pattern beyond those source points. |
| 46 | PH mPAP >20 by catheter; WHO groups and radiological associations; central arteries, pruning, cardiac signs, CT metrics; core | Covered: `/thorax/pulmonale-hypertonie`. Imaging suggests context, does not establish haemodynamic diagnosis. |
| 47 | RV/LV ratio and septal flattening/deviation; core | Covered in same PH lesson. |
| 48 | Oedema compartments, PCWP context, vascular/interstitial/alveolar progression, upper-lobe diversion/Kerley/cuffing/bat-wing; core | Covered: `/thorax/lungenoedem` and imported lesson data. Thresholds should remain approximate correlations. |
| 49 upper | Effusions/acinar opacity; cardiogenic versus noncardiogenic table; core | Covered: oedema lesson comparison. |
| 49 lower | ARDS/diffuse alveolar damage heading only; cue | Existing sourced chapter `/thorax/lungenoedem#ards`, with exact ARDS assessment route in curriculum. Do not create duplicate merely because source is thin. |
| 50 | Mamma heading only; cue | Deferred generic organ placeholder; no specified disease, clinical image or teachable point. |

## Bounded outlines for the five missing lessons

These are source-driven scopes rather than a mandatory repeated heading template. Implementation should follow the established CAA teaching and `/andarun/test` layout standard, with meaningful topic-specific questions and cards.

| Topic | Core scope and sequence | Source boundary / verification |
|---|---|---|
| Pectus excavatum | Pair frontal and lateral source images; identify inward sternum; explain why a frontal paracardiac opacity/cardiac silhouette may mislead; transfer to a projection-pitfall decision. | Thorax p9 supplies these points. No surgery threshold, severity index or treatment indication is supplied. Any such addition needs a separate source and is unnecessary for the bounded lesson. |
| Bronchiolitis | Relate small airways to centrilobular nodules; inspect source CT; distinguish visible tree-in-bud from indirect air trapping; use context to differentiate infectious, smoking-related and other causes without claiming one pattern proves an organism. | Thorax pp19–20, topic heading p29. Classification and expiratory CT extensions require primary references; avoid turning an adult imaging lesson into a paediatric treatment guide. |
| HP/EAA | Introduce inhalational context; inspect ill-defined centrilobular GGO source image; explain air trapping/mosaic context; distinguish nonfibrotic versus fibrotic patterns only with guideline support; require integrated clinical assessment. | Thorax p19 supports HP association/image; p37 supplies only heading. Diagnostic criteria, fibrotic classification and three-density terminology are external additions. |
| Cystic fibrosis | Explain airway-centred chest findings; interpret a verified clinical CT; connect bronchiectasis, mucus and small-airway changes; distinguish actual bronchial continuity from isolated cysts; identify complications without treatment algorithms. | Thorax p44 supplies only the topic name. All clinical detail must be attributed to independent primary sources. An unrelated PDF cyst image is not a CF case. |
| Lung-cyst differential | First distinguish cyst, bulla, cavity and honeycombing; then compare distribution, shape, associated nodules/other findings and clinical context; reuse LCH source evolution only as LCH; make a bounded pattern comparison. | Thorax pp21,24–25 provide LCH and morphology; p45 is a title. LAM/BHD/LIP and any algorithm beyond source definitions require explicit supporting references. |

## Candidate source images seen directly

Raw image bytes were extracted without recompression. The PDF page and its visible rID are the provenance; a filename or rID alone is not proof of the remote case details/contributor.

| Original image / evidence path | Source | Visible teaching use and limits |
|---|---|---|
| `tmp/thorax-completion/source-images/p009-Image201.jpg` (474×515) and `p009-Image202.jpg` (302×506) | p9 lower, rID33208 | Frontal/lateral pectus pair. Lateral view clearly supports the depressed anterior chest contour; use both to explain frontal projection pitfalls. Do not infer a measured index. |
| `tmp/thorax-completion/source-images/p019-Image325.jpg` (558×459) | p19 upper, rID24616 | Axial bronchiolitis-labelled source CT with airway wall changes and small nodular opacities. The red circle on the PDF page is a separate annotation, absent from this raw image. |
| `tmp/thorax-completion/source-images/p019-Image326.jpg` (366×270) | p19 lower, rID17192 | Axial HP-labelled source CT with ill-defined ground-glass nodular/patchy attenuation. Limited resolution; do not enlarge to a huge hero or claim an expiratory air-trapping series. |
| `tmp/thorax-completion/source-images/p024-Image367.jpg` (630×571) | p24, rID10493 | Solitary right-basal air-containing cyst morphology. It does **not** show diffuse LAM or establish CF; suitable only for a morphology exercise. |
| Page 21 source pair | p21, rID161054 | Upper-zone nodular/cystic LCH and interval evolution, already used by existing HRCT/LCH lessons. A potential cross-link; not a CF case. |

## Source claims requiring qualification

The mapper records these as verification flags, not new clinical conclusions. Existing lessons may already qualify them; do not silently reintroduce the source wording in new lessons.

- pp11,34,36 use “pathognomonic”, “proves” or equivalent for comet-tail, air bronchogram/tree-in-bud and active TB. Verify specificity before any literal adoption.
- p14 labels all <6 mm nodules “micronodules” and compresses Fleischner management; p15 further compresses subsolid follow-up. Use the actual guideline and terminology reference for recommendations.
- p17 equates UIP with a generic destructive end stage and contrasts potentially reversible GGO too broadly. Keep pattern and diagnosis separate.
- pp24–25 use wall-thickness cut-offs that overlap and should not be treated as rigid benign/malignant or cyst/cavity boundaries.
- p27 first says BWS needs higher kV than thorax, then gives BWS 70–90 kV versus thorax >120 kV. Treat this as a source contradiction, not a protocol.
- p32 “almost always bacterial” pneumonia in immunocompetent patients and p34 “no consolidation/cavity/adenopathy” viral pneumonia are overgeneralized.
- p43's risk comparison and p48 PCWP-to-imaging-stage values need context; neither creates a universal rule.

## Handoff status

This document records the **pre-build inventory and required delta**. Completion of the five lessons, independent scientific/translation/assessment review, browser verification, tests and Main push must be added by the orchestrating agent with actual evidence. No missing-topic lesson is declared shipped by this source audit alone.
## Completion delta — 24 October 2026

All five missing, specifically named teaching topics from the 50-page inventory now have dedicated DE/EN/FA lessons:

- `/thorax/pectus-excavatum` (p9)
- `/thorax/bronchiolitis` (pp19–20; p29 heading)
- `/thorax/hypersensitivitaetspneumonitis` (p19; p37 heading)
- `/thorax/mukoviszidose` (p44 heading; clinical teaching explicitly externally sourced)
- `/thorax/lungenzysten-differentialdiagnose` (p45 heading plus pp24–25 morphology; selected primary-source differential)

Existing LCH `/thorax/lch-lunge` was completed with its original paired p21 CTs and connected exercises. Curriculum links now resolve to the appropriate lesson or anchored section. Exact MCQ/card coverage was repaired for atelectasis, rib, pulmonary infarct and seven pneumonia topics (including empyema). Six new/finished lesson banks have two MCQs per language and two cards each, except pectus with three cards; ten bounded practice topics have one per language and one card each.

The original generic organ placeholders (pp2–4, p39 and p50) do not specify a missing teachable disease lesson and remain excluded. Existing covered topics were mapped, not comprehensively rewritten or clinically recertified. The older pre-build wording above is retained as audit history, superseded for implementation by this section.

Source plans and media provenance accompany each new lesson. Independent review findings and repair evidence are in `thorax-completion-independent-review.md`; actual browser matrix is in `thorax-completion-browser-qa.md`. Scientific approval by Dr. Zia remains separate and pending. No curriculum `complete` flag is treated as clinical approval.

Validation: seven focused tests passed (registration, CF, cysts, LCH, pectus, pneumonia, small-airway); exact-lock Next15.5.19 production build exited0,365/365 pages. Browser evidence and independent findings are linked above. Publication is verified separately by comparing the pushed commit with remote main; this ledger does not claim a live deployment merely from a successful build.
