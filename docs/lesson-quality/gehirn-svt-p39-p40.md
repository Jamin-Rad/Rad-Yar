# SVT · Gehirn.pdf pp. 39–40

## Scope and learning path

- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, physical PDF pp.39–40 (printed folios 38–39); rendered at 120 dpi and visually inspected.
- Route/data: `/gehirn/vaskulaer/sinusvenenthrombose`, `data/sinusvenenthrombose.js`; linked question bank and flashcards checked.
- Learning path: venous segments and drainage → consequences/clinical pattern → CT/CTV → stage-dependent MRI signal and MRV → variants/pitfall → management overview.
- No separate `Befund` or `Selbsttest` chapter was added. The self-check sits within the pitfall chapter; the reporting implications remain in the existing linked card.

## PDF coverage ledger

| PDF point | Source | Importance | Lesson location | Status |
| --- | --- | --- | --- | --- |
| Common sites: transverse/sigmoid, superior sagittal and deep veins; multiple segments; hypoplastic left transverse sinus variant | p.39 | Essential | Location table and variant chapter | Included; source percentages omitted because the page gives overlapping estimates without denominator/definition |
| Venous infarct and raised ICP from impaired CSF resorption | p.39 | Essential | Mechanism cards | Included |
| Headache, seizures, visual/papilloedema symptoms, deficits and impaired consciousness; clinical risk constellation | p.39 | Essential | Clinical chapter | Included qualitatively; source percentages omitted |
| Flow void in flowing blood; thrombus may lack it | p.39 | Essential | MRI table and pitfall self-check | Included |
| Acute (0–5 d) T1 grey/iso, T2 dark, FLAIR bright; subacute (>5 d) all bright | p.39 | Essential | Responsive localized MRI table with separate T1/T2/FLAIR columns | Included; explicitly a typical pattern, not a reliable clock |
| Empty-delta appearance with peripheral dural enhancement and central SSS thrombus | p.40 | Essential | CT/CTV chapter and question bank | Included as classic but insensitive; source's “pathognomonic” wording and ~30% estimate not repeated |
| PC-MRA shows absent flow independent of thrombus signal | p.40 | Essential | MRV/PC-MRA row | Included |
| IV heparin including haemorrhagic infarct; local thrombolysis/thrombectomy if worsening despite anticoagulation | p.40 | Essential | Management overview | Included as source outline; supplemental management context linked to AHA/ASA and ESO |

## Media and design

| Goal/location | Asset | Evidence/description | Status |
| --- | --- | --- | --- |
| Topic orientation/header | `public/sinusvenenthrombose/hero-generated-v2.webp` | AI-generated non-diagnostic cerebral venous schematic with transparent background for the shared dark LessonHero; no labels or scan-like texture; visually inspected | Included |
| Venous drainage/location | `public/sinusvenenthrombose/venous-drainage.svg` | Code-authored simplified orientation diagram for superficial/deep drainage and outflow; localized caption identifies the midline sinus, deep veins, transverse sinuses and sigmoid outflow; no unexplained marker | Included |
| Stage-dependent MRI signal | Responsive HTML table in lesson | Replaces old flattened, German-only `signalverhalten.png`; preserves T1, T2 and FLAIR independently | Included |
| Diagnostic case image | None | PDF pp.39–40 contain no patient scan; no synthetic case or Radiopaedia image is presented as source evidence | Not applicable |

## Sources and claim boundaries

- AHA/ASA, *Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement* (2024): [Professional Heart Daily statement page](https://professional.heart.org/en/guidelines-statements/diagnosis-and-management-of-cerebral-venous-thrombosis-a-scientific-statementstr0000000000000456).
- European Stroke Organization guideline: [European Stroke Journal](https://academic.oup.com/esj/article/2/3/195/8275513).
- Supplemental risk-factor, CT/CTV, MRV and management details are not attributed to PDF pp.39–40. The source's overlapping epidemiology percentages and the empty-delta percentage are omitted. Empty-delta is described as a classic, insensitive finding, not pathognomonic.

## Validation and remaining gates

- Focused static test: `node scripts/test-gehirn-svt-p39-p40.mjs`.
- Global linked MCQ audit: `npm run audit:mcq`.
- `git diff --check`.
- Focused lesson test, global MCQ audit (688 questions + 18 cases per language), JSX syntax bundle and `git diff --check` pass.
- Independent static re-review: SRC/EDU/VIS/LNG/ASM/REV PASS. Reviewer checked semantic locale coverage and interaction logic.
- UX browser matrix and rendered Persian RTL: not verified; the available local browser previously blocked localhost. The build environment failed on inaccessible Google Fonts/network and `.next` permission; no build pass is claimed.
- Scientific approval by Dr. Zia and publication approval: pending.
- Scientific approval by Dr. Zia and publication approval: pending.
