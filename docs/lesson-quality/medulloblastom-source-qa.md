# Medulloblastoma — source/design/QA ledger

2026-10-19; active worktree `.worktrees/pdf-lessons-main`. Existing exact topic `medulloblastom`, chapter `kopf-tumoren`, embryonal group; unlinked and no dedicated route on initial inspection. New route `/gehirn/tumoren/medulloblastom` fills that item, inProgress. Existing umbrella `/gehirn/tumoren/muster` has a brief pattern row; overlap acknowledged, no broad rewrite.

## Source inspected and plan before implementation

Actual `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf` PDF43–44 / printed42–43: text and complete page images inspected by author and separate mapper. PDF43 substantive prose; PDF44 three-panel MRI labelled LEFT sagittal T1, MIDDLE axial FLAIR, RIGHT axial T1 C+, case rID10997. Extracted sequence order differs from visible labels; use visible labels. No DWI/ADC, CT or spine images; no contributor/patient age/pathology metadata. Source FLAIR lesion is bright; do not label it a demonstration of cortical isointensity.

Audience trainees with basic MRI knowledge. DE base, DE/EN/FA equivalents. Goals: combine posterior-fossa location and solid-component diffusion; interpret variable enhancement; distinguish findings demonstrated in a supplied panel from missing sequences; assess obstruction/dissemination context without inventing a staging protocol.

Four chapters: location and obstruction → actual T1/FLAIR/T1C+ case and complementary diffusion question → spread and limits (embedded evidence check) → four retrieval rules. Original conceptual posterior-fossa hero is explicitly a schematic. Actual authorized PDF crop teaches location/enhancement only. Matching real DWI/ADC pair and spinal dissemination image remain unresolved recognition-media requirements. No treatment, ADC cutoff, molecular classifier, formal staging timing or therapy advice.

## Primary verification (access2026-10-19; publication dates separate)

- Perreault et al.2014, original discovery47/validation52 patient MRI/tissue study, DOI10.3174/ajnr.A3990, https://pmc.ncbi.nlm.nih.gov/articles/PMC4819007/ and https://pubmed.ncbi.nlm.nih.gov/24831600/ . Indexed full original methods/results plus PubMed abstract read. Direct PMC returned recaptcha and AJNR page internal error. Supports location/enhancement variability; do not transfer molecular prediction percentages or claim MRI replaces tissue. Only qualitative location/enhancement caveat imported.
- Yeom et al.2013, original38-patient pretreatment MRI/pathology study, DOI10.2214/AJR.12.9249, https://pubmed.ncbi.nlm.nih.gov/23521467/ . Indexed primary PubMed abstract/results read; direct page sparse and publisher inaccessible. Supports variable diffusion/enhancement; no numeric ADC values or histologic risk algorithm imported.
- Mata-Mbemba et al.2018,119-patient original MRI/molecular study, DOI10.3174/ajnr.A5578, https://pmc.ncbi.nlm.nih.gov/articles/PMC7410665/ and https://pubmed.ncbi.nlm.nih.gov/29545246/ . Indexed original abstract/methods/results and figure captions read; direct PMC challenged. Supports non-midline/minimally enhancing presentations and intracranial/spinal dissemination; no subgroup-specific staging or prediction algorithm transferred. Source figure pixels not inspected/reused.
- Louis et al.2021 WHO classification authors' summary, DOI10.1093/neuonc/noab106, https://pmc.ncbi.nlm.nih.gov/articles/PMC8328013/ . Indexed original classification passages read: CNS WHO grade4, molecular/histologic integrated classification. No molecular subtype assigned to source case.
- Radiopaedia https://radiopaedia.org/cases/10997 attempted, returned internal error. Contributor/case-specific reuse metadata inaccessible; not inferred. Project authorization from maintained standard covers user-provided sixPDF images, not independently verified legal clearance.

## Coverage ledger

|ID|Source|Importance|Disposition/location|
|---|---|---|---|
|MB01|PDF43/print42 embryonal malignant/grade4|essential|location intro; WHO terminology verified above|
|MB02|PDF43 second-most-common/age3–9|optional unverified specificity|Defer ranking/precise peak: population/denominator absent, not a diagnostic gate. Preserve childhood emphasis, not exclusive age restriction. Original2014 includes adults.|
|MB03|PDF43 vermis/roof fourth ventricle|essential corrected|location; typical near-midline pattern, not invariant origin. Qualitative variability from original2014/2018.|
|MB04|PDF43 ventricular extension/obstructive hydrocephalus|essential|location; assess separately, not inevitable/proven in selectedcase|
|MB05|PDF43 leptomeningeal/spinal drop metastases|essential|extent; no timing/sequence staging protocol imported|
|MB06|PDF43 CT hyperdensity/cellularity|supplementary|MRI chapter supplementary table; no CT supplied|
|MB07|PDF43 T1 hypo-/iso|essential|MRI table; actual sagittalT1 panel|
|MB08|PDF43 T2/FLAIR cortexiso|essential caveat|MRI table variable; suppliedFLAIRbright, not proof of isointensity|
|MB09|PDF43 avidinhomogeneousenhancement|essential corrected|variable enhancement, lack of aviduptake not exclusion, original2014/2018|
|MB10|PDF43 DWIbright/ADClow|essential|MRI table/pairedreading, no cutoff; actual case lacksboth. Missing recognition media explicit.|
|MB11|PDF44/print43 actual3panels/rID10997|essentialvisual|authorizedcrop, correct visible labels and provenance; no DWI/spread claim|

## Glossary

|Concept|DE|EN|FA|
|---|---|---|---|
|Vermis|Kleinhirnwurm|cerebellar vermis|ورمیس مخچه|
|Obstruction|Verschlusshydrozephalus|obstructive hydrocephalus|هیدروسفالی انسدادی|
|Restriction|Diffusionsrestriktion|restricted diffusion|محدودیت انتشار|
|Dissemination|leptomeningeale Aussaat|leptomeningeal dissemination|گسترش لپتومننژیال|

## Initial QA

`editorial_qa: in_progress`;`scientific_review: pending`;`browser_qa: blocked`;`publication: not_requested`. Independent review requested after author checks. No source-scan fabrication, gate changes, commit or push.

## Author verification / independent-review handoff

- `npx tsx scripts/check-medulloblastom.mjs`: PASS61 localized semantic units, exact existing topic/link/inProgress and flashcard backlink, single shared brain-tumour MCQ setup group,6 globally connected four-option questions with every wrong-option feedback key and language-ID mapping,2 cards, real route JSX parsed, hero/provenance/source dimensions1340×550 and panel metadata verified. These are structural checks, not clinical proof.
- `npm run audit:mcq`: PASS632 questions and18 cases per language at this batch run; not the number of newly authored questions.
- `git diff --check`: PASS; unrelated concurrent line-ending warnings only.
- Full local PDF43–44 images/text independently inventoried by mapper. Author viewed final1340×550 crop: complete three panels/red labels/rID retained. Hero SVG rasterized with Sharp and actually inspected: cerebellar highlighted region posterior to fourth-ventricular region, conceptual labels1/2 explained in all hero alt translations. Neither graphic claims a DWI,ADC,CT or spine observation.
- Real DWI/ADC and spinal recognition media remain unresolved VIS requirements. Actual case contributor and case-specific rights metadata inaccessible, explicitly null/unknown in provenance. Project user authorization is recorded separately; no legal-clearance claim.
- No new production build or authenticated browser run; no dev server started for this batch. Prior environmental blockers persist: bundled Chromium absent, Edge headless sandbox access errors, CUA IAB unavailable, loopback socket permission denied. These are prior environment evidence, not route-specific successful tests. DE/EN/FA desktop/mobile/themes, RTL/numeric display, hash/reload/read/self-check/practice-return/persistence still unverified. No access gate changes.

Status at handoff: `editorial_qa: author_checked_independent_review_pending`;`scientific_review: pending`;`browser_qa: blocked`;`publication: not_requested`. Reviewer should re-read declared primary-source passages with access limits retained, compare semantic units and images/provenance, and test source claim boundaries. Source-paper figure pixels not inspected or reused. No commit/push.


## Persian terminology repair (independent finding; delta retest pending)

Replaced all four ambiguous imaging uses of «انتشار مولکولی» in title, basics, pattern intro and flashcard-topic description with explicit MRI wording «تصویربرداری انتشار» or «توالی‌های انتشار». The DWI/ADC table correctly retains «محدودیت انتشار». Dissemination uses «گسترش», including the take-home rule and glossary. The embedded/global MCQs and generated cards share the same corrected source objects; no remaining ambiguous imaging phrase in any exported lesson/question/card/topic semantic unit. All DE/EN text and explicit absent DWI/ADC/spine-image limits are preserved. Focused checker now rejects the ambiguous phrase across every exported locale and asserts the intended Persian vocabulary and missing-image caveats. Author retest results below; independent delta review pending.

Repair author checks: `npx tsx scripts/check-medulloblastom.mjs` PASS61 localized units plus new terminology/explicit image-limit assertions; `npm run audit:mcq` PASS633 questions/18cases per language; `git diff --check` PASS (unrelated concurrent CRLF warnings only). No browser/server/commit/push; stopped for separate independent delta retest.
