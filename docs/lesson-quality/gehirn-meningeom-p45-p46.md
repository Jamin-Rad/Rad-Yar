# Gehirn.pdf pp. 45–46: meningioma lesson draft

Status: draft for independent review; not clinical or publication approval. The source PDF pages are numbered 45–46; their printed page labels are 44–45.

## Source coverage ledger

| PDF page | Readable source content | Lesson treatment | Source/current-reference boundary |
|---|---|---|---|
| 45 (printed 44) | Definition, grading, frequency/sex/age claims, NF2, risk factors, anatomical sites, native and post-contrast CT | CT chapter preserves the central imaging pattern: extra-axial, often hyperdense, possible calcification, enhancement; bone-window role. Epidemiology percentages, hormone claims and exhaustive location list are omitted. | EANO 2021 and Watts et al. 2014 support the imaging summary. Frequencies vary by population and source; no unsupported point estimate is asserted. |
| 45 | “Hyperostose … pathognomonisch”; rare lytic destruction in aggressive subtypes | Corrected: hyperostosis is supportive, not pathognomonic; bone changes may be reactive or reflect involvement. Lysis is described without assigning grade. | Watts et al. 2014 describes hyperostosis and osteolysis and cautions about interpretation. CT bone window is supported by EANO guidance. |
| 46 (printed 45) | T1/T2 signal, avid homogeneous T1+C enhancement, dural tail frequency and explanation, variable oedema, DWI, MRS, perfusion | Teaches T1/T2 and enhancement pattern; dural tail as common but nonspecific/reactive possibility; oedema variable; routine MRI cannot establish WHO grade. Omits MRS/perfusion technical claims. | Watts et al. 2014 supports signal/enhancement and that dural tail is nonspecific. EANO 2021 says routine imaging cannot establish pathology/grade. cIMPACT-NOW update 8 (2024) supports current molecular grading context. |
| 46 | “DWI restriction → atypical/anaplastic”; extra-axial signs CSF cleft, white-matter buckling, broad dural base | DWI retained as a possible atypical clue only, with no reliable grade assignment; extra-axial signs organized as a combined interface assessment. | Routine MRI signs are not a substitute for pathology or defined molecular criteria. No criteria/thresholds are taught. |
| 45–46 | No diagnostic case images on either page | Code-native schematic only, labelled as a diagram rather than a diagnostic image. | No PDF or third-party medical images reused; no image attribution/license required for the schematic. |

## Learning path and visual plan

1. CT: mass plus adjacent bone.
2. MRI: signal, enhancement, dural tail and limits of grading.
3. Extra-axial localization: broad dural base, CSF cleft, white-matter buckling.

The hero diagram is a conceptual cross-section of the dura, mass, CSF cleft and underlying brain; it is not based on a specific scan and is not a substitute for image recognition practice. The supplied pages do not include a real scan.

## Curriculum mapping

Only existing intracranial curriculum ID 'meningeom' is linked to '/gehirn/tumoren/meningeom' and marked inProgress. The separate spinal meningioma ID is not changed.

## Validation and open gates

- PDF text extracted and pp.45–46 rendered at 300 dpi; both pages visually inspected. Printed labels 44–45 confirm the one-page offset.
- Scientific framing checked against EANO meningioma guideline (2021), Watts et al. MRI pictorial review (2014), and cIMPACT-NOW update 8 (2024).
- Local self-check uses four options per language and tests the nonspecificity of dural tail / limits of image-based grading; no shared MCQ/flashcard registry modified.
- Independent scoped source/content and static DE/EN/FA review found no demonstrated mismatch across the lesson’s mapped claims. Browser/layout/RTL runtime test and neuroradiology/neuropathology signoff remain pending.
- The source’s percentage claims and wording “pathognomonic hyperostosis” are explicitly not propagated as facts.
- Validation run: lesson module imported and checked for three chapters, four answer choices, and DE/EN/FA parity; Next's bundled Babel parser accepted the route JSX; `npm run audit:mcq` passed (619 questions, 18 cases per language); `npm run audit:fa` reported no parse errors or German residue for this change; `git diff --check` passed. No production build or browser-render check was run in this worktree.

