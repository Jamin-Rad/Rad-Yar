# Technik.pdf: MRI fat-suppression methods (PDF pp.106–108)

## Scope and route

Existing route: `/technik/grundlagen#mrt` · curriculum ID `mrt-fettsuppression`. This is a bounded expansion of the current MRI fundamentals section; page 109 and its existing Dixon crops/self-check are outside this update.

Learning task: distinguish spectral fat suppression, STIR/SPIR, opposed-phase imaging and Dixon by mechanism, what signal they alter, and their limitations. No universal protocol recommendation is intended.

## Outline and media plan before implementation

No new route or accordion chapter. Add one focused teaching block to the existing MRI section with these instructional rows:

1. **How do I recognize effective fat suppression?** Establish the visible baseline check: subcutaneous fat should become low signal where suppression is intended.
2. **How do the suppression methods differ?** Compare frequency-selective saturation, STIR, SPIR and Dixon by mechanism and limitations, without ranking quality or prescribing a sequence.
3. **What does opposed phase show?** Explain signal addition/cancellation and separate within-voxel cancellation from the boundary India-ink artifact; avoid conflating it with directional chemical-shift misregistration.
4. **What does Dixon reconstruct, and where can it fail?** Explain in-/opposed-phase and water-only/fat-only images, then qualify water-fat swaps as reconstruction ambiguity affecting separated outputs.

One localized, code-native conceptual vector will show water/fat vector addition in-phase, partial cancellation opposed-phase, and conceptual water-only/fat-only Dixon reconstructions. It contains no patient image or scanner measurement; captions and alt text will say this. The SVG was authored in this repository for this lesson and contains no third-party image, case, or copied source artwork; no external asset license is involved. The p.106 source diagram is useful provenance but is not needed as a second redundant visual. Existing p.109 images, captions and attribution will remain unchanged.

## Source coverage map

Source file: user-provided `Technik.pdf`, 134 pages. Physical page numbers below are PDF page indices; printed folios differ by one.

| Key | PDF page / printed folio | Source teaching point | Importance | Planned lesson location | Disposition |
|---|---|---|---|---|---|
| FS-106-01 | 106 / 105 | Effective suppression is visibly checked in subcutaneous fat | Essential | Row 1 | Include as a practical check; local nonuniform suppression is possible |
| FS-106-02 | 106 / 105 | Spectral-selective pulse targets fat resonance and spoils transverse fat magnetization | Essential | Row 2 | Include mechanism concisely; don't imply exact pulse implementation is universal |
| FS-106-03 | 106 / 105 | Spectral method is vulnerable to B0 inhomogeneity and metal-related susceptibility | Essential | Row 2 | Include with field/system dependence; not an absolute failure rule |
| FS-106-04 | 106 / 105 | STIR uses short TI to null fat; non-frequency-selective; other short-T1 tissue, including enhancing tissue, can also be suppressed | Essential | Row 2 | Include the non-specificity and enhancement caution; distinguish conventional STIR from specialized variants |
| FS-107-01 | 107 / 106 | SPIR combines spectral selection and inversion recovery | Essential | Row 2 | Include mechanism; describe as fat-selective but still B0-sensitive. The source's unqualified “more specific than STIR” is not repeated as a quality ranking |
| FS-107-02 | 107 / 106 | In-phase signals add; opposed-phase water/fat signals partially cancel at different echo times | Essential | Row 3 | Include as signal behavior, not as a direct fat-suppression pulse |
| FS-107-03 | 107 / 106 | Fatty liver or intracellular fat may show opposed-phase signal loss | Essential | Row 3 | State as a pattern clue, not standalone diagnosis or universal absence/presence rule |
| FS-107-04 | 107 / 106 | Boundary India-ink/etching artifact reflects mixed fat-water voxels and is not limited to the frequency-encoding direction | Essential | Row 3 | Include boundary distinction; do not conflate with first-type chemical-shift displacement |
| FS-108-01 | 108 / 107 | Dixon derives in-phase/opposed-phase and separated water-only/fat-only images | Essential | Row 4 | Include conceptual output relationship; note phase correction/reconstruction rather than presenting two-point arithmetic as universal implementation |
| FS-108-02 | 108 / 107 | Dixon may give more homogeneous fat-water separation in challenging regions than conventional spectral suppression | Important | Row 2/4 | Include as relative tendency, not guarantee or protocol recommendation |
| FS-108-03 | 108 / 107 | Water-fat swapping may occur in separated Dixon outputs in B0 inhomogeneity/noise contexts; acquired in-/opposed-phase images remain | Essential | Row 4 | Include with qualified mechanism; distinguish reconstruction label swap from raw-signal cancellation |
| FS-108-04 | 108 / 107 | Source comparison table summarizes relative pros/cons of STIR, spectral, SPIR, in-/opposed-phase and Dixon | Essential | Row 2 | Rebuild as concise comparison; avoid source's unsupported absolute rank, and do not invent fixed acquisition values |

All three pages were extracted with `pdfplumber` and visually rendered and inspected. The figures and table are legible; no OCR/layout ambiguity affects the mapped points. These pages contain conceptual MRI diagrams and a comparison table, not diagnostic patient images. Page 109 is separately covered by `technik-dixon-p109.md` and is not repeated here.

## Scientific verification plan

- Check fat-water separation mechanics, field-map ambiguity and swap failure against Sharma et al., *Improving Chemical Shift Encoded Water-Fat Separation Using Object-Based Information of the Magnetic Field Inhomogeneity* (2015), [PMC4148476](https://pmc.ncbi.nlm.nih.gov/articles/PMC4148476/).
- Check a clinical comparison of multipoint Dixon, SPIR and STIR without generalizing its one region/protocol to all scanners: Gaddikeri et al., *Optimal Fat Suppression in Head and Neck MRI* (2018), [PMC7410601](https://pmc.ncbi.nlm.nih.gov/articles/PMC7410601/).
- Check the opposed-phase boundary artifact's mechanism and context: Kang et al., *Parameters Affecting India Ink Artifacts on Opposed-Phase MR Images* (2019), [iMRI](https://www.i-mri.org/DOIx.php?id=10.13104%2Fimri.2019.23.4.341).

## Review and verification status

Implementation is in place. The first independent review prompted a correction to the opposed-phase vector direction; a second independent review re-read the updated lesson, source pages, assessments and ledger, rasterized the three SVGs, and found no open content or asset findings. The diagram now has a regression assertion, the method comparison is split into parallel rows, the steatosis example is included with a caveat, and the ledger records SVG provenance. Review gates: SRC/EDU/VIS/ASM/REV PASS; LNG and UX BLOCKED because browser RTL/layout and interaction evidence could not be captured. See `review-mrt-fat-suppression-p106-p108.md` for the review record. The following checks actually ran after the fixes:

- `node --import tsx scripts/test-technik-mri-basics-render.mjs` — PASS; MRI teaching blocks, exact route wiring, localized render, source references and diagram assets checked in DE/EN/FA.
- `npm run audit:mcq` — PASS; 719 questions and 18 cases per language, with answer and option-specific explanation validation.
- `git diff --check` — PASS.
- `npm run build` — BLOCKED in this worktree: Next.js could not create `.next/server/app/api` (`EPERM`). Before that, font fetching also failed because `fonts.googleapis.com` is unavailable (`ENOTFOUND`). This does not establish a source compilation failure; full build remains unverified.
- Browser layout, mobile/responsive behavior, RTL rendering and keyboard behavior — NOT TESTED in this cycle; no browser evidence captured.

No source pages were unreadable, and no page-106–108 diagnostic patient-image or image-rights blocker applies because the pages provide conceptual diagrams/table only and the lesson uses a locally authored conceptual SVG. Dr. Zia's clinical approval remains pending; publication has not been requested or performed.
