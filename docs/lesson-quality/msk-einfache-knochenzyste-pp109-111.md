# Einfache Knochenzyste / simple bone cyst — source and author ledger

Status: independent content and quiz delta review PASS; curriculum route integrated; bounded SSR/render test PASS. Browser QA and specialist scientific sign-off remain pending. This ledger records source coverage and author decisions; it is not a clinical release approval.

## Learning promise and outline

Learner task: recognize a typical simple/unicameral bone cyst pattern, use the active/latent relationship to the physis as a location descriptor, identify fracture-related changes, and compare the PDF's principal differentials without treating one sign as proof.

1. Clinical pattern: age/sex distribution, presentation, typical sites, active versus latent.
2. Imaging: radiograph first; morphology, intact thinned cortex, fallen-fragment sign, MRI fluid pattern and fracture caveat.
3. Differential: ABC, NOF, enchondroma and fibrous dysplasia.
4. Management: accurately label options as the PDF's brief summary, without an individual recommendation or universal treatment algorithm.
5. Embedded retrieval question and four portable take-home rules.

Visual plan: topic-specific non-diagnostic SVG hero without embedded-language labels; two unaltered embedded radiographs from PDF page 110 shown separately with source IDs and translated alt text; a compact comparison table; one retrieval item. No generated diagnostic imaging.

## Page-by-page coverage

| Source | Point | Importance | Lesson location | Status / decision |
| --- | --- | --- | --- | --- |
| MSK.pdf PDF p.109 / printed p.108 | Synonyms SBC/juvenile cyst; benign, fluid-filled, unilocular | Core | `clinical-pattern` | Included; term is also UBC |
| p.109 | Typical age 5–15; boys about 2:1 | Context | `clinical-pattern` | Included with attribution to PDF; explicitly not exclusion criteria |
| p.109 | Often incidental; pathological fracture may occur | Core | `clinical-pattern` | Included |
| p.109 | Long-bone metaphysis; proximal humerus 50–60%, proximal femur 25–30% | Core | `clinical-pattern` | Included as approximate PDF frequencies, not independently generalized |
| p.109 | Origin near physis and relative diaphyseal shift during growth | Core | `clinical-pattern` | Included; “migration” clarified as relative position change |
| p.109 | Active abuts physis; latent has intervening normal bone; active position associated with higher fracture risk and latent position with greater healing potential | Core | `clinical-pattern` | Source-attributed associations included with explicit caveat: position alone does not predict an individual's course or decide treatment |
| PDF p.110 / printed p.109 | First-line radiograph; sharply marginated, unilocular, oval/central lucency | Core | `radiograph-mri` | Included |
| p.110 | Relationship to physis width; distinction from ABC | Supporting | `radiograph-mri` | Included as PDF-described clue, expressly not a single criterion |
| p.110 | Long axis parallel to shaft; cortex thinned from inside, mildly expanded, intact | Core | `radiograph-mri` | Included |
| p.110 | Fallen-fragment sign after fracture | Core | `radiograph-mri`, retrieval | Included as a supportive cystic clue, not stand-alone proof |
| p.110 | Two example radiographs (rIDs 17146 and 10361) | Visual evidence | `radiograph-mri` | Embedded JPEGs extracted without re-encoding; separate labels; provenance JSON records source, limits and contributor status (10361 credited to Frank Gaillard by an external index, not source-verified; 17146 unknown) |
| p.110 | MRI simple fluid low T1/high T2, usually homogeneous | Core | `radiograph-mri` | Included |
| p.110 | Fracture can introduce fluid levels/septa and mimic ABC | Safety caveat | `radiograph-mri`, `differential` | Included |
| PDF p.111 / printed p.110 | ABC: usually eccentric/expansile, fluid-fluid levels common | Core differential | `differential` | Included with caveat that fractured SBC can also be complex |
| p.111 | NOF: cortical/eccentric, sclerotic rim | Core differential | `differential` | Included |
| p.111 | Enchondroma: more often adult, matrix calcification, short tubular bones of hand | Supporting differential | `differential` | Included as PDF description |
| p.111 | Fibrous dysplasia: ground-glass matrix rather than simple fluid | Core differential | `differential` | Included |
| p.111 | Observation for small, asymptomatic, latent cyst; spontaneous resolution after skeletal maturity | Management context | `management` | Included as PDF summary, not as a guaranteed natural history or unsupervised plan |
| p.111 | Intervention esp. femoral fracture risk; curettage/grafting, corticosteroid injection or bone-marrow aspiration/puncture options | Management context | `management` | All source-listed options included as course material, not current recommendation; no universal ranking/indication; specialist decision required |

## Supplementary evidence and unresolved items

- Guggenbuhl et al., *Unicameral Bone Cysts: Review of Etiopathogenesis and Current Concepts in Diagnosis and Management* (2022): https://pmc.ncbi.nlm.nih.gov/articles/PMC9043174/. Used to keep management language bounded and acknowledge varied treatment approaches.
- Cochrane review, *Interventions for treating simple bone cysts in the long bones of children* (2019): https://pmc.ncbi.nlm.nih.gov/articles/PMC6464391/. Used for treatment aims and limited comparative evidence.
- Accessed 2026-10-20. These reviews do not constitute a specialist sign-off or a local treatment protocol.
- The supplied PDF's age/frequency percentages, spatial width rule, and exact risk wording have not been independently validated here; retained only as attributed course-source information and softened where necessary.
- The actual radiographic cases have no case history or projection labels on the PDF page. Do not infer patient age, fracture, or diagnosis independently of the page's teaching context. Contributor attribution: rID 10361 is credited to A.Prof Frank Gaillard by an external case index (direct source page not independently verified); contributor for rID 17146 remains unknown.
- Browser gate remains open; the app's existing login gate must remain untouched. Independent review and clinician approval are still required.

## Translation glossary

| German | English | Persian |
| --- | --- | --- |
| Einfache / juvenile Knochenzyste (SBC/UBC) | simple / unicameral bone cyst (SBC/UBC) | کیست سادهٔ استخوانی |
| Wachstumsfuge / Epiphysenfuge | physis / growth plate | صفحهٔ رشد |
| aktive / latente Zyste | active / latent cyst | کیست فعال / نهفته |
| Fallen-fragment sign | fallen-fragment sign | علامت قطعهٔ افتاده |
| aneurysmatische Knochenzyste (ABC) | aneurysmal bone cyst (ABC) | کیست استخوانی آنوریسمال (ABC) |
| nicht-ossifizierendes Fibrom (NOF) | non-ossifying fibroma (NOF) | فیبروم غیراستخوانی (NOF) |
| Randsaum / Kortikalis | sclerotic margin / cortex | حاشیهٔ اسکلروتیک / کورتکس |

