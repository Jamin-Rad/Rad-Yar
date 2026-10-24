# Wirbelsäule completion: bounded existing-lesson practice plan

The page-level ledger identifies six new named topics, authored separately, plus access/assessment gaps in existing teaching. Parent owns shared registries and these bounded existing-lesson repairs.

- Arachnoiditis/GBS/SCD: reuse the existing source-reviewed self-contained decisions as exact global questions/cards; add localized lesson return links; reset local answer on language change. Keep original focused lessons rather than adding duplicate courses.
- Tumour overview: reuse compartment decision; add exact spinal epidermoid DWI/ADC decision alongside the existing signal-pattern table. Qualify bright DWI alone and retain separation between compartment and histology. Source: Wirbelsäule p22; spinal epidermoid primary cases PMID16778630 and PMID10871034, and PMC4769457.
- Spinal MS: link the existing cross-specialty demyelination comparison at #compare and add exact spinal pattern practice. PDF p20 supplies only heading; source supplement Filippi2019 doi10.1093/brain/awz144. Bounded comparison, not complete McDonald criteria or an independent diagnostic pathway.
- Existing infection TB/paravertebral/epidural topics: authoring delegated to infectious builder with exact-topic decisions/returns and primary verification.
- Existing degeneration: concise PDF p6 disc hydration/root relationship and p8 congenital short-pedicle points, keeping imaging versus clinical syndrome distinct. Remove stale assertion that newly authored p9–10 topics remain excluded from the project; they remain outside this individual overview.
- Runtime language retrieval: preserve saved question IDs, support both internal and terminal locale tokens; add a regression using actual spine DE IDs and EN/FA banks.

Independent reviewer found incorrect bibliographic metadata for SCD PMC6108975. Replace with Mohajeri Moghaddam and Bhatt, Insights Imaging2018;9:511–526, doi10.1007/s13244-018-0608-3. No clinical content inferred from the incorrect reference.

Images and broad design changes to legacy courses are outside this bounded access delta; original source images remain. The six new lessons have their own visual plans and actual-case evidence. Test actual registry resolution, language equivalence, inline feedback, return links, browser layouts and build; review independently before Main push.
## Coordinator verification — 24 October 2026

- Registry integration: six new lesson topics plus nine bounded existing-topic additions; 21 new questions in each language and 21 trilingual cards across 15 exact topics. `test-spine-completion-registration.mjs` passed, including existing saved IDs with terminal language suffixes.
- Dedicated SSR checks passed for degenerative, infectious and metabolic additions (six routes × DE/EN/FA), plus arachnoiditis, Guillain–Barré, funicular myelosis, tumor overview, demyelinating patterns, infection and Modic regressions. Fixtures were updated for new real imports and the corrected source citation; tumor-type comparison quiz remains available alongside the exact overview quiz.
- Actual signed-in browser at localhost:3021: arachnoiditis EN → exact one-question quiz → wrong option A → correct C and English explanation shown → Back returned to EN lesson. Lesson → exact one-card deck → reveal displayed peripheral adherence answer → Back returned to EN lesson. No access gates changed. Screenshot evidence: `C:/Users/Drham/.codex/visualizations/2026/10/18/01a150ca-995b-7911-8a8a-2ed2ee94575b/spine-qa/arachnoiditis-en-quiz-feedback.png` and `arachnoiditis-en-card-answer.png`. Card answer inspected visually; screenshot is scrolled to answer, not full-page layout evidence.
- Broader browser matrix, independent review and production build are recorded separately before push. Existing lessons were not all redesigned or medically recertified.
