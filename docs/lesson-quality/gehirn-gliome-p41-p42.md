# Gehirn.pdf pp. 41–42: Glioma / astrocytoma draft

Status: existing PDF-to-lesson draft revised to use the maintained `StandardLessonShell`; independent scoped review and delta retest PASS. Specialized clinical approval and browser QA remain pending. PDF pages 41–42 were text-extracted and visually inspected at 110 dpi in this pass and at 300 dpi in the earlier source audit. Printed page numbers are 40–41.

## Source coverage ledger

| PDF page | Source item | Lesson treatment | Evidence / limits |
|---|---|---|---|
| 41 (printed 40) | Pilocytic astrocytoma: slow-growing, usually childhood, cerebellar hemispheres; optic nerve/hypothalamus; cyst with enhancing mural nodule; T1/T2/T1+C claims, including mild cyst-wall enhancement | app/gehirn/tumoren/gliome/page.jsx, data/gehirnGliomeLesson.js, section “pilocytic” | Retains the central phenotype and sequence description. Mild cyst-wall enhancement is presented as a feature of the depicted case, not as an independent or specific discriminator; external context: EANO–EURACAN–SNO 2022 and Lee et al. 2014. |
| 42 (printed 41) | Axial T1 / post-contrast T1 / FLAIR teaching case, case label rID 36807; “in contrast to hemangioblastoma” prompt | Section “pilocytic”; cropped panel at public/gehirn/gliome/pilocytic-case-pdf-p42.jpg | Crop keeps sequence labels and rID marker. Lesson now states case identity, attribution, and exact reuse terms are not independently verified; source-copy license statement alone is not treated as proof. |
| 42 | Differential table: pilocytic astrocytoma, medulloblastoma, ependymoma, hemangioblastoma; age, location, DWI clues | Section “differential” | Retained as a limited orientation; no single feature rules in/out a diagnosis. It does not teach standalone imaging of the other tumors. |
| 42 | Oligodendroglioma (IDH-mutant) and glioblastoma (IDH-wildtype) headings with no details | Section “classification” and source-scope note | Only current WHO CNS5 group/name context is provided from Louis et al. 2021; no disease-specific imaging, treatment, or prognosis is inferred. |
| 41–42 | PDF heading “Astrozytom (IDH-mutiert)” placed immediately before pilocytic astrocytoma | Source conflict note in lesson | Pedagogic clarification: pilocytic astrocytoma is a circumscribed astrocytic glioma, separate from adult-type diffuse astrocytoma, IDH-mutant. |
| 42 | “Very good prognosis after complete resection” | Omitted | Simplified treatment/prognosis statement is outside the imaging learning objective and is not generalized. |

## Lesson structure and visual plan

1. Classification map: adult-type diffuse glioma entities versus a separate circumscribed astrocytic family. Code-native diagram; SEGA/PXA are labelled “names only.”
2. Pilocytic astrocytoma: source MRI panel and concise sequence-aware description; explicitly non-specific morphology and hemangioblastoma differential.
3. Differential and source limits: table clues, headings-only topics, omitted prognosis claim, and the PDF heading sequence.

The actual source MRI case is reused from the user-provided PDF rather than replaced by a generated diagnostic image. The case is labelled rID 36807 in the PDF; the prior ledger records a DOI match, but actual case identity, contributor, and reuse terms still require independent review. No other PDF images from these pages are reused. The new code-native hero is explicitly a non-diagnostic schematic.

## Exact curriculum entries linked

Currently routed to `/gehirn/tumoren/gliome`: `who-klassifikation-hirntumoren`, `pilozytisches-astrozytom`, `astrozytom-idh-mutiert`, `oligodendrogliom-idh-mutiert`, `glioblastom`. The route teaches a bounded classification orientation and a focused pilocytic MRI pattern. The diffuse entities receive names/WHO context only; they do not have dedicated imaging lessons here. `sega`, `pxa`, and `gliosarkom` are not linked by this page set; p.41–42 do not support full lessons for them. The table's medulloblastoma, ependymoma, and hemangioblastoma entries are differential prompts only. Curriculum link presence must not be read as full topic coverage.

## Verification and open gates

- Sources: Louis et al., WHO CNS5 summary, Neuro-Oncology 2021; EANO–EURACAN–SNO circumscribed astrocytic glioma guideline 2022; Lee et al., pilocytic astrocytoma pictorial review 2014.
- Independent reviewer rechecked DE/EN/FA content and classification labels after the current shell revision; translation parity PASS in the bounded scope.
- Embedded assessment has four parallel options per language and a single correct answer; not added to shared question/flashcard banks.
- Current revision checks are recorded after implementation below; earlier checks: `git diff --check`; `npm run audit:mcq` (pass: 619 questions / 18 cases per language); DE/EN/FA data import and four-option answer structure; Next Babel JSX parse; `npm run audit:fa` found no parse error or German residue for the earlier route. Browser visual check unavailable in that session.
- Independent scoped reviewer verified source-page alignment, the PDF heading conflict, the p42 MRI crop against its three labeled sequences, and the linked WHO/guideline claims; no demonstrated content mismatch was found. The same reviewer separately retested the later pilo MRI refinement (T1 CSF-like cyst, T1-isointense mural nodule, usually T2-hyperintense; CNS WHO grade 1) and confirmed PDF attribution and DE/EN/FA parity.
- Independent delta retest PASS for the current shell revision, source-image task, DE/EN/FA classification labels, and cyst-wall note. Neuroradiology/neuropathology signoff, browser/layout/RTL checks, and final image attribution/reuse confirmation remain pending. This lesson ledger does not certify unseen tumor topics.

## Shell revision and current verification

- The legacy custom page was migrated in place to `StandardLessonShell` and the topic `LessonHero`; chapter names now describe the source-supported task. No duplicate route was created.
- Added a localized classification map, a source-image task, explicit scope/case-identity limits, translated self-check feedback, and three portable reporting rules.
- The source-image task directs learners to compare cyst fluid and mural-nodule enhancement across the labeled T1, post-contrast T1, and FLAIR frames. The image remains the unchanged crop from the user-supplied PDF.
- Added the PDF's mild cyst-wall enhancement as a qualified, case-specific observation; it is not taught as a discriminator. The classification-map oligodendroglioma label now explicitly says 1p/19q-codeleted in DE/EN/FA.
- Current actual-route SSR and focused file checks pass; independent review of the shell revision, source-image task and source details PASS in the bounded scope. Browser interaction/layout and clinical specialist approval remain pending; do not infer approval from `inProgress`.

