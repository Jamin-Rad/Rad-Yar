# Meniscus classification cross-reference — MSK.pdf p.46

Scope: one terminology clarification in the existing `/msk/knie/meniskus` grading section. Source page visually inspected: user-provided `MSK.pdf`, physical PDF p.46 / printed p.45.

| Key | Source point | Lesson disposition | Evidence and limits |
| --- | --- | --- | --- |
| MEN-46-01 | The PDF labels complex tear morphology (multiple planes, maceration, displaced fragments) “Stoller grade IV”; it gives bucket-handle and flap tears as examples. | Added a DE/EN/FA source note below the existing Lotysch signal grading, explicitly identifying the PDF wording as a separate morphology label. Existing bucket-handle and flap coverage remains in place. | The source label is recorded as written, not asserted as universal nomenclature. No grade IV was added to the Lotysch scale, and no Stoller grading table or new assessment item was created. |
| MEN-46-02 | Existing lesson presents Lotysch signal grades 0–III; grade III refers to signal reaching an articular surface. | Clarified that this signal-based classification and the PDF’s complex morphology label are separate descriptions and should not be conflated. | Crues et al. (with Lotysch and Stoller as coauthors) evaluated grades 1–3 by intrameniscal signal and surface communication; the primary study does not establish the PDF’s grade-IV morphology wording as a continuation of that signal scale. [Crues et al., Radiology 1987, DOI](https://doi.org/10.1148/radiology.164.2.3602385). |

The note is placed inside the existing grading section; no route, curriculum ID, chapter, or assessment ID was added. The visual source page was checked; its treatment section is outside this change.

## Validation

- Focused regression: `node --import tsx scripts/test-meniscus-p46-classification.mjs`.
- Checks all three language strings, source-page mapping, route placement, separation of the nomenclature systems, and the primary-source reference.
- Browser rendering and clinical sign-off for the full lesson remain outside this bounded check.
