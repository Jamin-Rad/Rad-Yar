# Meniscus lesson addendum — MSK.pdf pp.53 and 56

Scope: two bounded MRI interpretation additions to the existing `/msk/knie/meniskus`
lesson. Physical PDF pages 53 and 56 (printed pp.52 and 55) were rendered and
visually inspected. One crop from the page 53 flounce example is included with source attribution.

| Key | PDF source point | Lesson disposition | Limits |
| --- | --- | --- | --- |
| MEN-53-01 | MSK.pdf physical p.53 / printed p.52: medial meniscus inner-margin flounce; a wavy contour may mimic a tear/deformity on an individual slice; assess otherwise homogeneous signal and absence of a radial component | Concise three-language pitfall and source sagittal MRI example added under MRI diagnosis; inspect adjacent slices and require no separate tear signs before calling a normal variant | The source case is explicitly a single illustrative example, not proof of a universal pattern; flounce can coexist with other injury findings. Crop provenance records physical p.53, printed p.52, rID 39464. |
| MEN-56-01 | MSK.pdf physical p.56 / printed p.55: meniscal body extends beyond the outer tibial plateau margin by >3 mm | Definition and qualified conventional threshold added under MRI diagnosis | >3 mm is a conventional medial-meniscus reference; SSR reports variable thresholds (2.5–4 mm) and recommends measurement at the mid-tibial plateau level. The lesson says this and requests the actual value/reference; no threshold alone proves tear/root tear. |

The same PDF page also introduces meniscal calcification/chondrocalcinosis and
notes that calcification can paradoxically increase PD signal and mimic a tear.
This finding now has its own bounded DE/EN/FA lesson at
`/msk/knie/chondrokalzinose`; see the [p.56 coverage ledger](chondrokalzinose-msk-p56.md).
The separate curriculum topic links to that route. The meniscus addendum itself
remains focused on flounce and extrusion, avoiding duplicated CPPD teaching.

## Evidence

- Source image pages visually inspected: `MSK.pdf` physical p.53 / printed p.52
  and physical p.56 / printed p.55. The page labels are legible in the supplied
  PDF. The sagittal flounce case on p.53 was cropped at 300 dpi; the yellow
  arrow remains visible and the caption retains rID 39464 and source page.
- Meniscal flounce: Yu et al., “Meniscal flounce MR imaging,” *Radiology* (1997),
  [DOI 10.1148/radiology.203.2.9114114](https://pubs.rsna.org/doi/10.1148/radiology.203.2.9114114),
  and Lee et al., *AJR* (2000), [PMID 10992813](https://pubmed.ncbi.nlm.nih.gov/10992813/).
  These support cautious assessment because a flounce may be physiologic/transient
  but can mimic a tear, and tear-like folds also occur.
- Extrusion: SSR, “Standardized MRI nomenclature for knee meniscal lesions” (2026),
  [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/). The consensus
  defines radial displacement beyond the tibial plateau margin, notes >3 mm as a
  conventional medial-meniscus threshold with a 2.5–4 mm reported range, and
  recommends measurement at the mid-tibial plateau level and reporting the value.

## Validation

- Focused coverage test: `node --import tsx scripts/test-meniscus-pdf-p53-p56.mjs`.
- Browser/device interaction and specialist clinical sign-off remain open; this
  bounded addendum does not indicate complete review of the existing meniscus lesson.
