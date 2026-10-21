# AVM · Gehirn.pdf pp. 37–38

## Scope and teaching plan

- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, PDF pages 37–38 (printed folios 36–37); rendered and visually inspected at 130 dpi; text and illustrations compared with the route.
- Route/data: `/gehirn/vaskulaer/avm-zns`, `data/avm.js`; linked AVM quiz and flashcards reviewed and corrected where they repeated unsupported case or treatment claims.
- Learning path: (1) flow model and components, (2) clinical presentations, (3) Spetzler–Martin operative-risk score, (4) sequence findings and DSA, (5) image-limited Radiopaedia case, (6) mimics, (7) treatment modalities as overview, (8) take-home rules.
- Visual plan: topic-specific schematic in shared `LessonHero`; precise feeder–nidus–draining-vein flow diagram; source case MRI images captioned only for visible findings. No fabricated diagnostic scan.
- Header art: `public/avm/hero-generated.webp`, custom AI-generated educational illustration of a cerebral AVM; visually inspected, not a diagnostic scan. The in-chapter flow diagram is code-authored SVG.

## PDF coverage ledger

| PDF point | Source | Importance | Lesson location | Status |
| --- | --- | --- | --- | --- |
| Direct AV shunt through dysplastic nidus without capillary bed | p.37 | Essential | Basics and diagram | Included |
| Feeder, nidus, draining vein | p.37 | Essential | Basics and diagram | Included |
| Typical age and supratentorial predominance | p.37 | Context | Retained in the epidemiology section and cards | Included |
| Approximate yearly bleeding estimate | p.37 | Context | Omitted from learner-facing text because one blanket annual rate is population-dependent; reconsider with a clearly scoped source if needed | Omitted / qualified |
| Haemorrhage as common initial presentation; seizures, headache, focal deficits | p.37 | Essential | Clinical table; no unsupported symptom percentages | Included |
| T1/T2 flow voids and possible gliosis | p.37 | Essential | Imaging table and source case | Included |
| Contrast MRI, SWI/T2*, TOF-MRA | p.37 | Essential | Imaging table | Included |
| DSA with nidus and early venous filling in arterial phase | p.38 | Essential | Imaging and linked assessment; wording no longer says “only,” “proof,” or blanket pathognomonic | Included / qualified |
| Spetzler–Martin: size, eloquence, deep drainage; point thresholds | p.38 | Essential | Scoring table, grade summary and self-check | Included |
| Grades I–II described as better operative candidates in PDF | p.38 | Context | Reframed as operative-risk estimate; no automatic recommendation | Included / qualified |
| ICH common complication; SAH superficial / IVH deep | p.38 | Essential | Clinical table | Included |
| Microsurgery, embolisation, radiosurgery | p.38 | Essential | Management overview; individualised, not prescriptive | Included |
| Mimics: dAVF, proliferative angiopathy, Moyamoya | p.38 | Essential | Differential table; unsafe blanket risk/demographic claims removed | Included |

## Scientific and visual evidence

- Spetzler–Martin original scale: Spetzler RF, Martin NA. *A proposed grading system for arteriovenous malformations*. J Neurosurg. 1986;65:476–483. [PubMed](https://pubmed.ncbi.nlm.nih.gov/3760956/). The paper describes the scale as predicting operative morbidity/mortality using size, venous drainage and neurological eloquence; it does not make the score a treatment order.
- Hemorrhage estimates are population-dependent. Kim et al. patient-level meta-analysis: overall 2.3% per year; unruptured at presentation 1.3%, ruptured 4.8%. [Full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC4141996/). The lesson removes one blanket annual rate from quiz/cards.
- AHA/ASA management statement used to avoid blanket treatment recommendations: [scientific statement](https://professional.heart.org/en/guidelines-statements/management-of-brain-arteriovenous-malformations-a-scientific-statement-forstrd1700012).
- Radiopaedia case rID 74111 is attributed and linked; user confirmed explicit permission for this use. Current rendered frames were inspected. T1/T2 show serpiginous flow-void-like vascular structures; MRA projection mainly shows basal cerebral arteries and does not establish nidus, drainage, or Spetzler–Martin grade in that frame. Removed unsupported first-seizure story, grade I, and “ideal surgical candidate” recommendation.

## Validation evidence

- Focused static test: `node scripts/test-gehirn-avm-p37-p38.mjs` passed (12 quiz items × 3 languages, 15 cards × 3 languages, distributed answer positions, answer IDs, required translations, and stale unsupported claim checks).
- Global linked-question audit: `npm run audit:mcq` passed for 688 questions and 18 cases per language, including answer and explanation validity.
- `git diff --check`: passed.
- Asset checks: WebP header art is 1536×1024 (about 202 kB); both SVGs rasterized and visually inspected.
- Browser interaction, desktop/mobile, themes, and RTL: blocked. The available in-app browser rejected the local route with `ERR_BLOCKED_BY_CLIENT`; direct localhost access from this execution environment was denied. No rendered-browser pass is claimed.
- Production build: blocked. `npm run build` reached Next.js compilation, then failed on inaccessible `fonts.googleapis.com` and `EPERM` while creating `.next/types/app/api/admin`; no AVM-specific compiler error was reported.
- Independent reviewer: final re-review passed for educational structure, visuals/assets, assessment design, translations in source, and code-level navigation behavior. Browser/RTL rendering remains unverified because the local route could not be opened in the available browser.
- Scientific approval by Dr. Zia: pending. Publication/release approval: pending.
