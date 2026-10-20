# MRI fundamentals and image quality: Technik.pdf pp. 76–86

Source: user-provided `Technik.pdf`, physical PDF pp. 76–86 (printed pp. 75–85). All eleven source pages were text-extracted and visually inspected as rendered page images on 2026-10-20. The section is `/technik/grundlagen#mrt`; exact curriculum IDs are `mrt-grundprinzip-signalbildung` and `mrt-bildqualitaet-artefakte-snr`.

## Page-level coverage ledger

| PDF page (printed) | Source content | Disposition and lesson location |
| --- | --- | --- |
| 76 (75) | Proton spin, magnetic moment, B₀ alignment, longitudinal net magnetization | Already present in the existing signal-formation block; retained. The simplified cartoon/example population counts are not taught as measurements. |
| 77 (76) | Precession and Larmor frequency | Added to `MRI_SIGNAL_BLOCK`, with the RF resonance relationship and localized concept diagram. |
| 78 (77) | Resonant RF excitation, longitudinal-to-transverse tipping, phase coherence and detectable signal | Added to `MRI_SIGNAL_BLOCK`; MCQ and card assess why coherent transverse contributions add. |
| 79–80 (78–79) | T1 recovery and T2 decay, 63%/37% time-constant definitions, water/fat examples and comparison table/curves | Existing block already teaches the idealized 63%/37% definitions and concurrent processes. Source's typical millisecond ranges and oversimplified universal tissue brightness table are deferred; contrast depends on tissue and sequence weighting. |
| 81 (80) | Static macroscopic field deviations at metal/air interfaces; microscopic tissue-dependent effects; T2 vs T2* | Existing text distinguishes T2/T2* and SE/GRE. Added a concise scale distinction and field-related limitation in `MRI_QUALITY_BLOCK`; no clinical magnetic-susceptibility diagnosis rules added. |
| 82–83 (81–82) | TR/TE weighting, receive coils, k-space and Fourier transform | Existing blocks teach TR/TE context, k-space and reconstruction. Receive-coil role was missing; added regional signal reception and qualified SNR contribution. Corrected the PDF's claim that a receive coil reduces noise as such: it receives signal with spatial sensitivity; it does not generically remove image noise. |
| 84 (83) | Slice, phase and frequency encoding | Already taught in the spatial-encoding block with a localized conceptual diagram; retained. Axis assignment is labelled as a simplified 2D teaching example. |
| 85 (84) | SNR definition and influence of slice thickness, averages, TR; resolution influences from field strength/FOV/matrix | Existing SNR block teaches voxel size, averages, FOV, matrix and timing trade-offs. Numerical parameter examples and broad 1.5 T/3 T preferences are deferred; they are not adopted as universal clinical recommendations. |
| 86 (85) | Simplified scan-time formula, SE parameter examples, shimming purpose/types and potential artifact effects | Added only shimming's purpose and bounded effects to `MRI_QUALITY_BLOCK`. Fixed scan-time formula, example protocol values and passive-shimming construction details are deferred as oversimplified or system-dependent. |

## Teaching outline and media

1. The rendered sequence begins with the added causal chain: precession → Larmor-matched RF excitation → transverse coherence → receive signal. The following existing signal/relaxation block defines idealized T1/T2 time constants (63%/37%) and concurrent processes; the new block does not refer to curves as having appeared earlier.
2. Existing spatial encoding and SNR trade-offs remain the main foundation; the new quality block distinguishes microscopic T2 behavior, macroscopic B₀ inhomogeneity, receive sensitivity, and shimming.

Two code-native schematics teach the signal chain and the distinct roles of field correction and signal reception. Their language-neutral numeric markers have localized keys in the lesson block. They are conceptual diagrams, not patient images. The two MCQs and cards are registered to the exact curriculum topics and linked from the `/mrt` section.

## Scope and evidence limits

This batch is source coverage and educational implementation, not a scientific sign-off. The PDF's ranges, field-strength preferences, fixed scan-time example, and protocol values were not independently validated and are not generalized. Independent review passed source, education, visual, language, assessment and revision gates after the block-order wording and coherent-vector diagram were corrected. Live-browser QA and specialist approval remain open. No advanced sequence physics beyond pp. 76–86 was added.
