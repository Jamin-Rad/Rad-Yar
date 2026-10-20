# CT reconstruction and post-processing — Technik.pdf pp.51–53

Bounded source mapping for exact curriculum ID `ct-rekonstruktion-nachverarbeitung` in `/technik/grundlagen#ct`. The stated lesson task is to distinguish image reconstruction from display processing and MIP post-processing. The map covers PDF pages 51–53 (printed pp.50–52); each text page was extracted and each page image visually inspected.

## Learning path and visual plan

1. Compare filtered backprojection with the source-described iterative feedback cycle.
2. Separate HU measurement, window/level display mapping, and reconstruction kernel effects.
3. Trace a ray through a volume to see how MIP keeps the maximum voxel and what 2D projection discards.

One three-panel, code-native, language-neutral SVG explains FBP versus iterative reconstruction, HU window mapping, and voxel selection along an MIP ray. No patient study is included on these source pages.

## Coverage ledger

| PDF page (printed) | Source point | Importance | Lesson disposition |
|---|---|---|---|
| 51 (50) | Reconstruction transforms projection measurements into an image | Essential | Introductory lead and pipeline visual |
| 51 (50) | Filtered backprojection filters projection profiles and backprojects them into a 2D slice; source calls it the primary method | Essential with qualification | Teach the analytical sequence. Do not repeat “primary” as a statement about all current scanners or vendor systems |
| 51 (50) | Iterative reconstruction: initial image, forward projection, comparison with measured projections, update and repetition | Essential | Teach cycle diagram; note algorithms differ by implementation |
| 51 (50) | Claimed iterative benefits: noise/artifact reduction, improved low-contrast visibility and reduced radiation exposure | Requires qualification | Describe image-noise/contrast aims; dose reduction is not inherent or guaranteed and depends on task, acquisition, algorithm and evaluation. No dose-saving promise |
| 52 (51) | HU scale; water 0 HU and air −1000 HU; source lists example tissue/material ranges | Essential with qualification | Teach references; show source examples as approximate only, not diagnostic thresholds; note energy, composition, acquisition and reconstruction variation |
| 52 (51) | Window center selects midpoint; width selects HU range. Wide window lowers displayed contrast; narrow window raises it | Essential | Teach display mapping; windowing does not change underlying acquired/reconstructed HU data |
| 52–53 (51–52) | Soft kernel smooths/noise reduction; sharp kernel emphasizes edges/detail and can increase noise | Essential with qualification | Teach tradeoff; result depends on reconstruction method, strength and task |
| 53 (52) | MIP casts virtual rays and selects the highest-intensity voxel along each ray | Essential | Show voxel-selection diagram; clarify the 2D output loses depth |
| 53 (52) | MIP applications include CTA; strengths are bright-structure overview and rotation, limits include overlap and loss of dark structures | Essential | Include CTA as the CT-specific example; state MIP supplements review of source volume because overlap/depth are lost |
| 53 (52) | PDF additionally lists MRA, MR myelography and MRCP | Contextual; outside this CT batch | Note that the algorithm also applies outside CT only if needed for context; no MRI application lesson is added |

## Supporting technical sources

- AAPM, [CT Lexicon v2.0 (2022)](https://www.aapm.org/pubs/CTProtocols/documents/CTTerminologyLexicon.pdf): CT display and reconstruction terminology.
- Kak and Slaney, [Principles of Computerized Tomographic Imaging](https://www.slaney.org/pct/pct-toc.html): analytic reconstruction and iterative projection-model foundations.
- Napel et al., [CT angiography with spiral CT and maximum intensity projection](https://pubs.rsna.org/doi/10.1148/radiology.185.2.1410382): primary CTA MIP application.
- Ferretti et al., [Multidetector CT in thoracic diseases: MIP technique](https://publications.ersnet.org/content/erj/18/2/381.full.pdf): maximum-voxel selection and projection caveats.

## Assessment and validation

One localized MCQ distinguishes display windowing from reconstruction kernel; MIP limitations, including suppression of dark structures, are assessed in the block/card set. Six DE/EN/FA flashcards cover FBP, iterative cycle, HU, windowing, kernel tradeoff and MIP. Focused StandardPage SSR/registry tests, MCQ-bank audit (661 questions, 18 cases per language), JSX syntax transform, and SVG checks pass. Independent review passed source, education, visual, language and assessment gates after corrections for the omitted dark-structure limitation, the German note translation and the localized panel key. Live-browser UX remains blocked; no clinical approval is implied.
