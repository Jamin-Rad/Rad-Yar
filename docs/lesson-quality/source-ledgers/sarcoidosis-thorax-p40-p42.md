# Sarcoidosis — Thorax.pdf physical pages 40–42

Scope: bounded reconciliation of the existing `/lunge/sarkoidose` lesson
(`curriculumId: sarkoidose`) against Thorax.pdf physical pages 40–42 (printed
pages 39–41). This is not a full lesson or assessment audit. Physical page 43
(printed 42) has its own ledger: [p.43 fibrosis ledger](sarcoidosis-fibrosis-thorax-p43.md).

## Source inspection and coverage

The PDF text layer was extracted and all three pages rendered and visually
inspected. Text, page order, tables, and figures were legible; no OCR or
sequencing issue was found. Temporary renders and extraction are under
`tmp/sarcoid-audit/`.

| PDF page | Source content | Existing lesson mapping / disposition |
|---|---|---|
| Physical 40 / printed 39 | Systemic granulomatous disease, non-caseating granulomas, thoracic involvement stated as >90%, age peaks 20–40 and 60–70, female predominance, perilymphatic distribution, Scadding 0–IV | `/grundlagen`, `/roentgen`, `/hrct`. Definition, thoracic predominance, distribution, and Scadding descriptions remain. The exact age peaks and categorical female predominance were not repeated: epidemiology varies by population and the PDF’s values are not universal. The lesson now says onset is more common in young-to-middle adulthood and explicitly notes population variation. |
| Physical 41 / printed 40 | CXR/CT montage illustrating Scadding I–IV: isolated BHL; BHL plus parenchymal change; parenchymal change without BHL; fibrosis | `/roentgen` table covers the stage definitions. The montage was inspected but not imported: sequence/acquisition details and reuse metadata are not available in the lesson package. Stage is descriptive, not a severity ranking; the existing note that II is not simply worse than III remains. |
| Physical 42 / printed 41 | HRCT described by PDF as “gold standard”; symmetric BHL, right paratracheal nodes and 1-2-3 sign; eggshell calcification; 2–4 mm perilymphatic nodules along fissures/pleura/septa/peribronchovascular interstitium and upper/middle zones; Galaxy and Cluster signs; extrapulmonary examples; differential note (Galaxy can occur in TB) | `/hrct`, `/extrapulmonal`, `/dd`. The 2–4 mm pattern, nodal stations/sign, non-specific eggshell, Galaxy/TB caveat, extrapulmonary examples and competing diagnoses are represented. “Gold standard” was softened to HRCT as a key method for parenchymal characterization; a brief clinical-context/alternative-diagnosis caveat was added. The embedded CT panel labeled rID 29251 is included as one frame for the visible nodular aggregate; its caption states the label comes from the source PDF, preserves non-specificity, and does not infer a diagnosis. Cluster sign remains descriptive and non-diagnostic. |

The source’s p.42 panel is a CT image adjacent to the Galaxy-sign description
and labeled with `rID 29251`. Its visual content is adequate as one teaching
frame: an arrow points to a nodular aggregate with nearby smaller nodules. The
native embedded JPEG (`Image532`, 664×379) was extracted directly from the
user-provided PDF at the page crop `x=253.60–467.52`, `top=406.01–528.06` PDF
points and saved as
`public/educational/sarkoidose/galaxy-rid-29251.jpg`. No rescaling, annotation,
decorative starfield, or neighboring text was added. The image is integrated
with translated alt text and a caption that attributes modality, PDF physical
and printed page, rID, unknown sequence/contrast phase, and non-specificity.
The user authorized reuse of supplied-PDF images. Contributor identity and
original case-license metadata remain unknown. The p.41 four-row Scadding
montage was not reused.

**Media record:** Image 1 is a source CT frame for the visible nodular aggregate
and smaller adjacent nodules. Source: user-provided Thorax.pdf physical p.42
(printed p.41), embedded object Image532, Radiopaedia rID 29251 as printed in
the PDF. Rights basis: explicit user authorization to use images from supplied
PDFs; original contributor/license not identified. Captions and alt text exist
in DE/EN/FA in the lesson. Sequence and contrast phase are not stated in the
source. Do not use the adjacent decorative starfield as diagnostic evidence.

## Claim reconciliation

- **Diagnosis:** ATS says diagnosis rests on a compatible clinical presentation,
  non-necrotizing granulomatous inflammation when tissue is needed, and
  exclusion of alternative causes; no single imaging pattern alone proves the
  diagnosis. This supports adding a concise caveat to the HRCT lead.
- **Scadding:** retain as a chest-radiograph classification of intrathoracic
  manifestations, not a severity ladder. The existing II-versus-III caution is
  retained. Scadding should not be extended to CT-only staging.
- **HRCT role:** RSNA’s 2025 multimodality review describes complementary
  imaging roles and distinguishes chest radiography Scadding from CT
  assessment. To avoid turning “gold standard” into a diagnostic claim, the
  lesson now calls HRCT a key parenchymal-characterization method.
- **Micronodules:** the 2–4 mm size and perilymphatic locations are retained as
  typical morphology, not a stand-alone diagnosis. Current reference table
  supports 2–4 mm nodules along perilymphatic structures.
- **Galaxy / Cluster:** Galaxy is kept with a non-specificity caveat and TB in
  the differential. Cluster is presented as morphology only, not a specific
  diagnostic sign.
- **Epidemiology:** the PDF’s bimodal age range and female predominance are not
  generalized. Published epidemiology shows substantial regional and
  population variation, and some cohorts do not show a late-life second peak.
  The lesson uses qualified wording rather than the exact numerical claims.
- **Extrapulmonary / differentials:** the page-level examples are represented
  in existing sections; no new claims or chapter were added in this bounded
  update. Their full scientific currency is outside this narrow review.

## External evidence

- American Thoracic Society, *Diagnosis and Detection of Sarcoidosis* (2020):
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC7159433/>
- RSNA, *Multimodality Imaging for the Diagnosis and Evaluation of Pulmonary
  Sarcoidosis* (2025): <https://pubs.rsna.org/doi/10.1148/ryct.240294>
- NCBI Bookshelf, *Typical and atypical features of pulmonary sarcoidosis*,
  Table 3: <https://www.ncbi.nlm.nih.gov/books/NBK621664/table/ch5.Tab3/?report=objectonly>
- Rossides et al., population variation review (2023):
  <https://doi.org/10.1111/joim.13629>
- Danish registry study of incidence patterns (2021):
  <https://doi.org/10.1016/j.rmed.2021.106548>

## QA status

- Changed files: `app/lunge/sarkoidose/page.js`,
  `components/ClinicalPatternDiagram.jsx`, `data/flashcards.js`,
  `data/questions.js`, `public/educational/sarkoidose/galaxy-rid-29251.jpg`,
  its `image-provenance.json`, and the PDF map. The header now uses shared `LessonHero`
  with a localized, accessible sarcoidosis schematic showing bilateral hilar
  nodes and a perilymphatic nodule pattern. The explanatory subtitle was removed
  from below the title. The former “Cases” cards are now explicitly labelled as
  Radiopaedia reading links. One actual CT frame is now displayed in the HRCT
  section; the article links do not claim to display other case images.
- Curriculum ID and route are unchanged. The
  affected Cluster-sign flashcard (`sarkoidose-10-cluster`) was updated in
  DE/EN/FA to match the non-diagnostic wording. Independent review also found
  and prompted removal of a duplicated phrase in `sarkoidose-fa-02` option C.
- Targeted raster check confirms the local asset is JPEG 664×379. Figure SSR
  and caption/provenance assertions passed for DE/EN/FA; `esbuild` parsed the
  changed lesson and diagram component. Independent visual/source review
  inspected the full source page and local panel; VIS passed. It confirmed the
  CT-only crop is clear, retains the source arrow, excludes the starfield, and
  has no unsupported diagnosis claim. The rID was not independently verified
  against Radiopaedia; it is recorded as printed in the PDF.
- Global MCQ audit passed on the final worktree after independent review
  (719 questions and 18 cases per language); focused review confirms the
  duplicate text is gone from `sarkoidose-fa-02` and assessment concepts remain
  aligned with lesson statements. The reviewer reported an earlier failed
  attempt due to an existing extensionless import; the subsequent final-worktree
  rerun passed.
- `esbuild` parsed the updated route and diagram component. Server-side rendering
  of the schematic passed in DE/EN/FA, including localized accessible names,
  bilateral hilar nodes and multiple perilymphatic marks. This is component SSR,
  not a full route render.
- `git diff --check` passed. A production build remains unverified: the attempted
  build failed fetching `fonts.googleapis.com` and with `EPERM` creating the
  shared worktree's `.next` output.
- Structural/semantic translation review of changed text passed; the Persian
  translation audit still flags pre-existing mixed-script terms on this route
  (Galaxy, Jüngling and Scadding), none introduced by this change.
- Independent review of the bounded lesson changes and the CT frame is
  complete: SRC, EDU, LNG, ASM and VIS pass for the reviewed scope. UX remains
  BLOCKED without browser evidence. Browser/UX verification remains untested.
- Browser route behavior: not verified. Browser inventory had no tabs and the
  browser UI is unavailable to this subagent; static/component SSR cannot
  establish the actual responsive route layout or interactions.
- Clinical approval and publication approval remain with Dr. Zia and the user.
