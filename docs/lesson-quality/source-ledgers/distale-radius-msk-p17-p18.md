# Distal radius fracture: MSK.pdf pp.17–18 source ledger

**Scope:** Existing lesson `/msk/trauma/distale-radiusfraktur`, `data/distale-radiusfraktur.js`, physical PDF pages 17–18 (printed pp.16–17), and linked MCQs/flashcards whose content covers Fernandez patterns, classic eponyms, Chauffeur fracture, or carpal associated injuries. This is a bounded source pass, not a full-route review.

## Page coverage

| Source item | PDF page | Lesson / linked assessment | Status | Notes |
| --- | --- | --- | --- | --- |
| Fernandez I: bending, metaphyseal pattern, usually Colles/Smith | 17 (printed 16) | `fernandez.rows[I]`, `drf-fc-04` | Imported | Source also shows a paired schematic and radiograph. Kept the existing image assets and clarified their source in accessible alt text. |
| Fernandez II: articular shear; rim fragment with carpus moving dorsally or palmarly; Barton; radiocarpal subluxation | 17 (printed 16) | `fernandez.rows[II]`, `muster` Barton, MCQs `fernandez-ii`/`barton`, card `drf-fc-03` | Imported | Eponym describes the rim-fragment/carpal relationship; full fracture description remains necessary. |
| Fernandez III: compression, die-punch, lunate impacts the lunate fossa producing a central impression | 17 (printed 16) | `fernandez.rows[III]`, linked Die-Punch teaching and `drf-fc-05` | Imported | The mechanism and central depression are visible in the paired type strips. |
| Fernandez IV: avulsion; radiocarpal fracture-dislocation with avulsion component | 17 (printed 16) | `fernandez.rows[IV]`, `drf-fc-04` | Imported | Avoided adding a more specific ligament/bone subtype than the page supports. |
| Fernandez V: combination; high-energy trauma and complex articular comminution | 17 (printed 16) | `fernandez.rows[V]`, `drf-fc-04` | Imported | No treatment recommendation copied from the diagram. |
| Paired Fernandez schematic/radiograph strips, types I–V, dorsopalmar and lateral/axial views | 17 (printed 16) | `/distale-radiusfraktur/fernandez-schema.png`, `/distale-radiusfraktur/fernandez-roentgen.png` | Visually inspected and retained | Source figures teach type-to-pattern comparison. They are not presented as separately verified patient cases. User authorization for supplied-PDF images is recorded in the project standard. |
| Colles, dorsal Barton, Smith, volar/reverse Barton in extra-/intra-articular and dorsal/volar layout | 18 (printed 17) | `muster` diagram and translated cards; MCQs `colles`, `smith`, `barton`; cards `drf-fc-01`–`03` | Imported / checked | The local raster display asset matches the PDF figure and is not a code-native redraw. Whether the raster was directly extracted or cropped before entering this workspace is not established. The lesson keeps “usually/typically” where morphology can vary. |
| Chauffeur fracture: intra-articular bony avulsion of radial styloid | 18 (printed 17) | `sonderformen` Chauffeur, MCQ `chauffeur`, card `drf-fc-06` | Imported | Removed a specific scaphoid-compression cause from this scoped teaching because it is not stated on these pages. |
| Important associated injuries: scapholunate dissociation and lunate dislocation | 18 (printed 17) | `begleitverletzungen`, linked carpal MCQs/cards | Imported | No specific diagnosis is attributed to the case image below. |
| Embedded Radiopaedia image ID `rID:88989` | 18 (printed 17) | `fall-rid88989.jpeg`, case exercise caption | Asset visually inspected; diagnosis not asserted | It is a single PA wrist view with a visible right marker. The PDF labels the case ID but provides no arrow or case diagnosis. The Radiopaedia case page could not be fetched in this environment, so contributor/study metadata and full case findings remain unverified. Caption asks learners to inspect alignment and states that one PA image does not establish a specific ligament or lunate injury. Project permission to reuse Radiopaedia images is recorded in the project standard; retain the case ID and source link. |

## Supplemental claims kept distinct from pp.17–18

| Claim | Location | Evidence / disposition |
| --- | --- | --- |
| Fernandez is mechanism-oriented and is not a substitute for describing morphology or assessing stability | `fernandez.key`, card `drf-fc-04` | Source pages support mechanism groups. A published review notes limited reliability/reproducibility across established systems: [classification systems review](https://pmc.ncbi.nlm.nih.gov/articles/PMC5694815/). The lesson therefore avoids saying Types II–V are monotonically “increasingly unstable.” |
| SL interval around 3 mm | associated-injury text, MCQ `sl`, card `drf-fc-10` | Not on pp.17–18. Kept as a rough guide, not a universal cutoff, and added projection/contralateral comparison because reported normal limits vary by location/position: [RSNA review](https://pubs.rsna.org/radiology/doi/full/10.1148/rg.210123). |
| Lunate/perilunate signs and alignment | associated-injury text, MCQ `lunate`, card `drf-fc-11` | Not detailed on pp.17–18. The radiographic distinction is supported by [primary image-diagnosis review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3327118/) and [wrist-trauma imaging review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12169939/). |
| Other numeric measures (e.g. articular step, radial tilt, SL angle) and management principles elsewhere in the route | Other sections and assessments | Outside the assigned pages and not revised in this batch. This ledger does not validate the rest of the lesson’s measurements or treatment section. |

## Media record

| Goal / location | Media | Provenance and rights | Caption/alt and review |
| --- | --- | --- | --- |
| Compare Fernandez mechanisms / p.17 | Schematic strip | Supplied `MSK.pdf`, p.17 / printed p.16; user authorized the supplied PDF figures for RadYar | DE/EN/FA alt labels it as a schematic of fracture patterns; visually compared with rendered source page. |
| Compare type-correlated appearances / p.17 | Radiograph strip | Supplied `MSK.pdf`, p.17 / printed p.16; user authorized the supplied PDF figures for RadYar | DE/EN/FA alt calls them the radiographic examples paired with the classification, not independently diagnosed cases; visually inspected. |
| Compare classic patterns / p.18 | Figure matching the supplied-PDF comparison | `MSK.pdf`, p.18 / printed p.17; local display asset `public/distale-radiusfraktur/klassische-muster.png`; user authorization for supplied-PDF figures recorded in the project standard | The local image matches the 2×2 comparison visible in the PDF (Colles, dorsal Barton, Smith, volar/reverse Barton). DE/EN/FA alt names those patterns; visually inspected against the rendered page. |
| Prompt systematic carpal review / p.18 | PA radiograph | Embedded in supplied MSK.pdf p.18 as Radiopaedia `rID:88989`; local asset `public/distale-radiusfraktur/fall-rid88989.jpeg`; user authorization noted in project standard | The image was inspected. Localized caption asks for carpal alignment, Gilula arcs and SL interval, and explicitly avoids assigning a lesion from the single PA view. Contributor and full-study details pending source-page access. |

## Translation check

| Meaning | DE | EN | FA | Result |
| --- | --- | --- | --- | --- |
| Type IV is an avulsion-containing radiocarpal fracture-dislocation | `Luxationsfraktur mit Avulsionskomponente` | `fracture-dislocation with an avulsion component` | `شکستگی-دررفتگی ... با مؤلفهٔ آولسیون` | Matched; no unsupported subtype added. |
| Fernandez is a mechanism aid, not a complete stability assessment | Explicit in key/card | Explicit in key/card | Explicit in key/card | Matched. |
| Approx. 3 mm SL interval is a guide, with projection and opposite wrist considered | Explicit in lesson/MCQ/card | Explicit in lesson/MCQ/card | Explicit in lesson/MCQ/card | Matched; not stated as a universal hard threshold. |
| rID 88989 image is an assessment prompt only; PA alone does not prove a particular injury | Explicit in caption | Explicit in caption | Explicit in caption | Matched. |

## Validation and remaining gates

- Focused test: `node scripts/test-distale-radius-msk-p17-p18.mjs` — passed for DE/EN/FA.
- MCQ registry audit: `node --import tsx scripts/audit-mcq-bank.mjs` — passed (730 questions and 18 cases per language).
- `git diff --check` — passed.
- PDF text extraction utility was unavailable; source transcription used rendered images. Both physical pages were rendered with Poppler and visually inspected.
- Browser behavior was not tested in this bounded batch. Independent reviewer and Dr. Zia scientific review remain pending; the Radiopaedia case page could not be fetched to verify contributor/full-study details.
