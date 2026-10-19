# Gehirn.pdf pp. 41–42: Glioma / astrocytoma draft

Status: draft for independent review; no clinical approval. PDF pages 41–42 were text-extracted and visually inspected at 300 dpi. Printed page numbers are 40–41.

## Source coverage ledger

| PDF page | Source item | Lesson treatment | Evidence / limits |
|---|---|---|---|
| 41 (printed 40) | Pilocytic astrocytoma: slow-growing, usually childhood, cerebellar hemispheres; optic nerve/hypothalamus; cyst with enhancing mural nodule; T1/T2/T1+C claims | app/gehirn/tumoren/gliome/page.jsx, data/gehirnGliomeLesson.js, chapter pilocytic | Retains the central phenotype and age/location claims; external imaging context: EANO–EURACAN–SNO 2022 and Lee et al. 2014. |
| 42 (printed 41) | Axial T1 / post-contrast T1 / FLAIR teaching case, case label rID 36807; “in contrast to hemangioblastoma” prompt | Same chapter; cropped panel at public/gehirn/gliome/pilocytic-case-pdf-p42.jpg | Visual inspected. Crop keeps the three sequence labels and small rID marker. Attribution in lesson: Di Muzio B, Radiopaedia rID 36807, CC BY-NC-SA 3.0 as indicated by source copy. Reviewer should verify attribution/license/crop and displayed readability. |
| 42 | Differential table: pilocytic astrocytoma, medulloblastoma, ependymoma, hemangioblastoma; age, location, DWI clues | scope chapter | Kept only as a short structured prompt; no single feature is claimed to rule in/out a diagnosis. Subtypes outside scope remain overview-only. |
| 42 | Oligodendroglioma (IDH-mutant) and glioblastoma (IDH-wildtype) headings with no details | classification and scope chapters | Current WHO CNS5 grouping is supplied from Louis et al. 2021. No subtype-specific imaging, therapy, or prognosis is invented. |
| 41–42 | PDF heading “Astrozytom (IDH-mutiert)” placed immediately before pilocytic astrocytoma | Source conflict note in lesson | Corrected pedagogically: pilocytic astrocytoma is grouped among circumscribed astrocytic gliomas and is separate from adult-type diffuse astrocytoma, IDH-mutant. |
| 42 | Prognosis after complete resection | Omitted as a general rule | Simplified treatment/prognosis statement is outside objective; not validated for this lesson. |

## Lesson structure and visual plan

1. Classification map: adult-type diffuse glioma entities versus a separate circumscribed astrocytic family. Code-native diagram; SEGA/PXA are labelled “names only.”
2. Pilocytic astrocytoma: source MRI panel and concise sequence-aware description; explicitly non-specific morphology and hemangioblastoma differential.
3. Scope and uncertainty: headings-only topics, differential table limits, and source organization issue.

The actual source MRI case is reused from the user-provided PDF rather than replaced by a generated diagnostic image. Its source identity is cross-checked to Radiopaedia rID 36807 (Di Muzio B; case DOI 10.53347/rID-36807). No other PDF images from these pages are reused.

## Exact curriculum entries linked

who-klassifikation-hirntumoren, pilozytisches-astrozytom, astrozytom-idh-mutiert, oligodendrogliom-idh-mutiert, glioblastom → /gehirn/tumoren/gliome (all marked inProgress). The latter three diffuse tumor topics receive only concise WHO classification context, not disease-specific imaging lessons. SEGA, PXA, gliosarcoma, and the differential entities are not linked because these pages do not support a lesson for them.

## Verification and open gates

- Sources: Louis et al., WHO CNS5 summary, Neuro-Oncology 2021; EANO–EURACAN–SNO circumscribed astrocytic glioma guideline 2022; Lee et al., pilocytic astrocytoma pictorial review 2014.
- DE/EN/FA semantic units are authored in shared data; independent language review pending.
- Embedded assessment has four parallel options per language and a single correct answer; not added to shared question/flashcard banks.
- Checks run: `git diff --check`; `npm run audit:mcq` (pass: 619 questions / 18 cases per language); imported lesson data and verified all DE/EN/FA content plus four-option answer structure; parsed page JSX with the bundled Next Babel parser; `npm run audit:fa` reports no parse error or German residue for these files. Full visual browser check unavailable in this worktree session (no browser surfaced).
- Independent neuroradiology/neuropathology review, browser/layout checks, and approval of image attribution/reuse remain pending.

