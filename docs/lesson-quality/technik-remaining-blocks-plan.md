# Technik remaining blocks — 24 October 2026

Scope: Technik.pdf physical p.11 (printed 10), anti-scatter grid; physical p.60 (printed 59), flat-detector C-arm CT. Extracted text and rendered pages p011.png/p060.png inspected. Existing optimierung and fluoro sections provide the shell. No new route or chapter is needed.

Exact subsection titles and purposes, before implementation:

1. **Streustrahlenraster: Kontrast gewinnen, Primärstrahlung verlieren** — explain lamellae/interspaces, angular rejection and the exposure trade-off; distinguish prevention of scatter through collimation from interception at the detector.
2. **C-Bogen-CT: aus Projektionen wird ein Volumen** — explain rotational acquisition and reconstruction, intraoperative uses and why post-thrombectomy hyperdensity cannot simply be called blood.

Media plan: two original, code-native, non-diagnostic schematics. Grid: straight transmitted rays versus oblique blocked ray. C-arm CT: angular measurements → reconstructed stack. All explanations, captions and alt are DE/EN/FA. The source pages contain no actual patient imaging for these blocks; no recognition case is required for these mechanism goals.

Coverage: grid construction, mechanism and materials included; universal unhindered primary transmission corrected with explicit loss caveat. CT-specific scatter hardware is distinguished from a projection grid. CT modulation/reconstruction already taught elsewhere and not duplicated. C-arm rotational principle, screw-position and post-thrombectomy applications included. Source's categorical claim that CT-like imaging is fully sufficient to exclude gross bleeding is not adopted: original clinical evidence demonstrates imperfect sensitivity and contrast accumulation mimicking blood. System-dependent soft-tissue limits are retained.

Verification sources (accessed 24 October 2026):
- IAEA Diagnostic Radiology Physics, chapter 6 (technical mechanism; official publisher).
- Hong Kong Radiation Health Division, Guidance Notes on Radiation Protection for Diagnostic Radiology, §8.9 (grid improves contrast but entails exposure trade-off).
- Siemens Healthineers syngo DynaCT official documentation (product name and C-arm cone-beam application; manufacturer claims are not clinical validation).
- Kau et al. AJNR 2014;35:1759–1764, original 73-patient study: https://www.ajnr.org/content/ajnr/35/9/1759.full.pdf (post-treatment blood versus contrast limitation). No numerical study result is generalized as a modern scanner benchmark.

Assessments: one four-option MCQ and one card for each topic, with matching inline check supplied by parent integration. Topic IDs roentgen-streustrahlenraster and c-arm-ct. Independent review and browser verification pending parent integration; scientific approval pending Dr. Zia.

## Author validation

- `node scripts/check-technik-remaining-blocks.mjs`: PASS. Checks that both blocks are consumed by the rendered section data, assets exist, DE/EN/FA fields exist, linked topic IDs match, all four options and distractor feedback are populated, and the CT German cell is German.
- `node scripts/check-technik-grundlagen-parity.mjs`: PASS.
- Both SVGs rendered through sharp and visually inspected: clear geometry, no embedded language-dependent text, captions and alt supplied by module. Original RadYar code-native diagrams; no patient images or third-party visual assets.
- Technical references checked on 24 October 2026 via official IAEA/RHD/manufacturer sources and original AJNR article PDF. The AJNR HTML endpoint returned 403; the article PDF was accessible through the source tool. Scientific confirmation by Dr. Zia is still pending.
- Independent review and actual browser evidence are coordinated by the parent after integration; no author claim of browser PASS.

| Source point | Location | Disposition |
| --- | --- | --- |
| p.11, lead lamellae and aluminium/fibre interspaces | GRID_BLOCK rows 0–1 | Included; transmission not treated as complete |
| p.11, oblique scatter interception | GRID_BLOCK lead and schematic | Included |
| p.11, collimation reduces scatter production | GRID_BLOCK rows 3 | Included; distinguished from a detector-side grid |
| p.11, CT modulation/iterative reconstruction | Existing optimierung/CT quality blocks | Already covered, not duplicated |
| p.60 lower, rotational projections and reconstructed slices | C_ARM_CT_BLOCK lead/row 0 and schematic | Included |
| p.60 lower, screw position and post-thrombectomy use | C_ARM_CT_BLOCK row 1 | Included |
| p.60 lower, soft-tissue limitation and categorical sufficiency | C_ARM_CT_BLOCK rows 2–3/note | Limit retained; categorical haemorrhage assurance corrected and source conflict explicitly labelled |

Shared terminology: Streustrahlenraster / anti-scatter grid / گرید ضدپراکندگی; Primärstrahlung / primary radiation / پرتو اولیه; Flachdetektor-CT / flat-panel detector CT / CT با آشکارساز تخت. Negation and uncertainty retained in all languages, including non-universal haemorrhage exclusion.
