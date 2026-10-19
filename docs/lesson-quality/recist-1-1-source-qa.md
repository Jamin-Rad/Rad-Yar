# RECIST 1.1: source/design/QA ledger

Date: 2026-10-19; worktree `.worktrees/pdf-lessons-main`.
New mapping explicitly authorized by coordinator after actual checkout search: ID `recist-1-1`, route `/technik/onkologie/recist-1-1`, small chapter `technik-onkologie`. No exact RECIST curriculum entry or route existed. Inspected neighboring Technik routes/layout: nested modality routes already used; this route inherits existing Navbar/access/in-progress gates and adds its own Footer as neighboring Technik lessons do. Keep `inProgress`; no existing topic is reassigned.

## Source and lesson plan before implementation

User-supplied `C:/Users/Drham/OneDrive/Desktop/Lerncore/Technik.pdf` PDF74–75 / printed73–74: text and complete rendered pages inspected by author and independent mapper. Substantial rules and thresholds, no diagnostic scans, schematic, case IDs or bibliography. Scope is these two pages, checked/corrected against **original RECIST1.1**, not a comprehensive oncology-response manual.

Primary authority actually read: Eisenhauer et al., EJC2009, DOI10.1016/j.ejca.2008.10.026, original RECIST1.1 guideline from official EORTC site: https://recist.eortc.org/recist/wp-content/uploads/sites/14/2025/12/RECISTGuidelines.pdf . Essential relevant sections3.1–3.2 and4.2–4.4 read, especially published pp230–235 / source PDF3–8. Official RECIST overview also read: https://recist.eortc.org/recist-1-1/ . Source publication2009 is separate from access date2026-10-19. Failed earlier obsolete URLs not counted as evidence. No other response-framework rules imported.

Audience: trainees who can identify reproducibly measurable lesions. Goals: choose correct axis/targets, assign PR versus PD reference correctly, apply both PD size conditions, and keep target arithmetic distinct from overall disease assessment.

Four topic-derived chapters: select/measure targets → baseline versus nadir → combine target/non-target/new-lesion evidence (embedded numerical exercise) → four portable rules. Scope/framework caveats are a compact supplementary block. A code-native, explicitly fictitious SoD timeline shows baseline100 → nadir50 → current61mm. Its arithmetic and translated legend are the teaching visual, not a patient scan or automated clinical response calculator.

## Point coverage and required corrections to compressed source

| ID | Supplied source | Priority | Destination | Disposition / primary verification |
| --- | --- | --- | --- | --- |
| RE-01 | PDF74 definition, CT/MRI SoD | essential | `selection` | Standardized size response of defined lesions; not sole treatment decision. Original purpose sec2. |
| RE-02 | PDF74 organ longest ≥10mm, node short ≥15mm | essential | selection table, MCQ3/card3 | Preserve correct axes; technical CT≤5mm caveat and node10–<15 versus<10 distinction supplied from original sec3.1–3.2. No claim every small node is pathological. |
| RE-03 | PDF74 max5 total/max2 per organ, sum | essential | selection | Included; choose reproducibly measurable representative targets. Original sec4.2. |
| RE-04 | PDF74–75 non-targets qualitative | essential | `overall` | Present/absent/unequivocal progression; not every slight increase is PD. Original sec4.3.3–4.3.4 fills important omitted caveat. |
| RE-05 | PDF75 CR and node<10 | essential | response table | Label target response; normal-size target nodes may retain measurements, so sum need not be zero. Overall CR also requires appropriate non-target/new-lesion assessment. Original sec4.3/4.4. |
| RE-06 | PDF75 PR≥30% | essential | response table, chart/exercise | Explicit baseline reference; corrects ambiguous “Baseline bzw. Nadir” wording. Original sec4.3.1. |
| RE-07 | PDF75 PD≥20% AND≥5mm | essential | response table, MCQ1/2, card1/2 | Explicit smallest-on-study/nadir reference (including baseline when smallest). Both relative and absolute increase required; target PD may coexist with shrinkage from baseline. Original sec4.3.1. |
| RE-08 | PDF75 SD neitherPRnorPD | essential | response table | Target category after appropriate reference tests; not a synonym for “less than20% growth from baseline”. |
| RE-09 | PDF75 unequivocal new lesion→PD | essential caveat | overall, exercise | Preserve unequivocal malignancy; indeterminate findings not automatically PD. Classical RECIST context, not iRECIST confirmation rules. Original sec4.3.5. |
| RE-10 | PDF74 lymphoma/brain/RANO/Lugano | scope | selection supplementary | Original1.1 excludes lymphoma studies and acknowledges separate brain-tumor criteria; names from supplied page are orientation only, no versions/algorithms taught. |
| RE-11 | PDF74 immunotherapy/iRECIST, HCC/mRECIST | scope, unverified blanket restriction | selection supplementary | Do not repeat “RECIST never usable”. Protocol/framework must be specified; source names alternatives but does not provide their rules. No iRECIST or mRECIST algorithm imported or asserted independently validated here. |
| RE-12 | PDF74 prostate/bone nonmeasurability | essential exception | selection supplementary | No blanket exclusion of prostate diagnosis. Lytic/mixed bone with measurable soft-tissue component can be measurable; pure blastic lesion not measurable. Original sec3.1.3. No prostate-specific response system added. |
| RE-13 | PDF74 cystic/calcified no-go | essential uncertainty | selection supplementary | Simple cysts are not malignant lesions. Cystic metastases may be measurable, noncystic targets preferred (original sec3.1.3). Calcification not taught as a universal no-go; reproducibility/protocol assessment required; PDF supplies no specific calcified-lesion rule. |

Original best-overall-response confirmation schedules, missing-data algorithms, FDG-PET algorithm and special split/coalesced-lesion rules are outside this two-page introduction. Their omission is not a claim of full RECIST proficiency. Examples explicitly supply non-target/new-lesion status when mentioning overall response.

## Terminology / media plan

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Baseline | Ausgangssumme / Baseline | baseline sum | مجموع آغازین / خط پایه |
| Nadir | kleinste Summe im Verlauf | smallest sum on study | کمترین مجموع در طول پیگیری |
| Target | Zielläsion | target lesion | ضایعه هدف |
| Non-target | Nicht-Zielläsion | non-target lesion | ضایعه غیرهدف |
| Unequivocal | eindeutig | unequivocal | بدون ابهام |

Original SVG `public/educational/recist-1-1-schematic.svg` and adjacent provenance. Numeric example100/50/61mm is fictitious, explicitly labelled, shows correct point heights and denominator distinctions. No copied patient scan or lesion localization claim; no real image required to demonstrate this arithmetic objective. Browser rendering/RTL still separate evidence.

## Initial QA state

`editorial_qa: in_progress`; `scientific_review: pending`; `browser_qa: blocked`; `publication: not_requested`.
Checks/review pending; previous environment browser limitations persist and are not this route's runtime evidence. No gate modifications, stage, commit or push.

## Author checks actually performed

- `npx tsx scripts/check-recist-1-1.mjs`: PASS, 89 localized semantic units; exact new curriculum/in-progress mapping, unique Technik chapter MCQ group,9 questions/3 languages with4 options and all wrong-option explanations,3 cards, localized ID mapping and return links, valid topic color, actual RECIST JSX parsed with esbuild, SVG/provenance present. Numerical checks:61−50=11;11/50=22%;24−20=4.
- `npm run audit:mcq`: PASS,630 questions and18 cases per language at final author retest. Structural assessment transfer check, not clinical correctness.
- `git diff --check`: PASS (unrelated concurrently modified pdf-map-abdomen-thorax line-ending warning only).
- SVG rasterized with bundled Sharp; resulting PNG actually inspected:100/50/61 labels and point heights correct, both comparison values visible, no patient-image claim. This is asset-only inspection, not runtime hero cropping or mobile/RTL evidence.
- No production build or authenticated browser run completed for this batch. No dev server started; nothing to close. Browser environment evidence comes from prior batches: bundled Chromium executable absent; installed Edge headless access errors under sandbox; CUA IAB unavailable; loopback socket permission denied. These remain unresolved environmental blockers, not a route-specific observation or passed runtime test. No auth/in-progress gate bypass.

Independent review requested from separate read-only reviewer; full report/retest pending below. Clinical release remains pending Dr. Zia; source-supported bounded draft does not claim complete RECIST protocol competence. No stage/commit/push.

## QA state after independent review

`editorial_qa: independently_reviewed_draft_acceptance_blocked`; `scientific_review: pending`; `browser_qa: blocked`; `publication: not_requested`.

Separate reviewer completed local PDF/image and primary-guideline checks plus semantic/assessment/integration review; SRC/EDU/VIS(asset)/ASM/REV PASS. LNG semantic parity passed; real Persian numeric/RTL display and UX browser matrix remain BLOCKED. See `recist-1-1-independent-review.md` for exact gate evidence and two closed minor findings: copied checker route and invalid color hex. Both fixed and independently retested; header-only follow-up tracked in report. No clinical/scientific release inferred. No server was started; no process remains from this batch. No stage/commit/push.

Independent final header-delta retest PASS:89 localized units; correct DE/EN/FA column semantics and page bindings. All demonstrated findings closed; browser/display/scientific approval remain explicitly pending.
