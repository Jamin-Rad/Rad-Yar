# Gehirn.pdf — CAA transition and pp. 27–28

Source pages are physical PDF page numbers; printed folios are one lower. CAA begins at the bottom of physical p.26, immediately after the hypertensive ICH material.

| Source point | Existing lesson disposition | Notes / evidence |
| --- | --- | --- |
| p.26 transition: CAA heading, definition and frequency statement | Covered in CAA foundations/frequency modules. | The PDF's approximate ICH attribution is contextualized in `docs/caa-content-review.md`; its estimate is not treated as a universal attributable fraction. |
| p.27: sporadic age, earlier hereditary presentation, sex, Alzheimer/Down syndrome association | Covered with qualifications in existing lesson. | Exact M=F and ~85% Alzheimer figures are not copied: see the existing content review's cohort/denominator rationale. Down syndrome is taught as genetic predisposition, not as a deposit subtype. |
| p.27: lobar ICH, cortical microbleeds, convexity SAH, cSS; acute stroke-like/TIA-like and chronic clinical manifestations | Covered across MRI marker atlas and clinical chapters. | The lesson distinguishes cSAH/cSS and TFNE from unsupported causal assumptions; cognitive symptoms are not treated as a mandatory diagnostic criterion. |
| p.28: Boston v2.0 eligibility, probable/possible categories, hemorrhagic and white-matter markers, exclusions | Covered by criteria table, interactive counting guide/calculator and linked questions. | Thresholds and definitions traced to Charidimou et al. 2022 (primary diagnostic accuracy study): https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/. The page-28 source table is concise and does not replace all clinical context/definitions. |
| p.27–28 patient images | None in the source pages. | No PDF-derived patient case needed. Existing distribution schematic and case gallery are supplementary; the gallery's RCVS-associated convexity-SAH case is explicitly not presented as proof of CAA. |

## Wiring and validation

- Route: `/gehirn/vaskulaer/caa`; active reading content is `data/caaLesson.js`, while the separate linked assessment bank lives in `data/caaStudyBank.js` and `data/caa.js`.
- The curriculum MCQ link was inconsistent with the lesson action: it requested 8 questions although the lesson requests 18 and the CAA bank contains 18. Curriculum link corrected to 18; the case selection link remains `/faelle?thema=caa` while the lesson also offers a direct three-case exam action.
- No clinical content was added in this bounded reconciliation. Existing medical claims were not comprehensively revalidated here; see `docs/caa-content-review.md` for the separate claim-level evidence record.
- Browser QA / signed-in rendering: not performed in this execution. Specialist sign-off remains pending.
- Independent review of the source pages, coverage decisions, existing localized lesson, MRI examples, assessment bank and link correction: PASS for this bounded reconciliation. UX/browser remains blocked in the current execution; full scientific revalidation and specialist sign-off are not implied.
