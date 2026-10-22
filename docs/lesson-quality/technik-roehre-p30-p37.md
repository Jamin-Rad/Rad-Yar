# Technik.pdf pp. 30–37 — Röntgenröhre und Spektrum

## Scope and evidence

Source: user-provided `Technik.pdf`, physical PDF pages 30–37 (printed folios 29–36). Text extraction and page renders were reviewed for all eight pages on 2026-10-23. The page images were inspected at readable zoom; extracted text was used as a cross-check, not as the sole source.

Lesson: `/technik/grundlagen`, section `roehre`; assessments: `roentgenanlage-roehre` and `roentgenstrahlung-spektrum`.

## Coverage map

| PDF page | Main source points | Lesson disposition |
|---|---|---|
| 30 | Tube parts, cathode/Wehnelt focusing, dual focus, tungsten target, stationary/rotating anode | Covered. Added explicit stationary-versus-rotating heat distribution contrast; exact rpm omitted as model-specific. |
| 31 | Actual/thermal/effective focal spot, vacuum, housing and oil | Covered in concise rows and localized tube schematic. |
| 32 | Generator, high voltage, filament heating, tube current, high-frequency generator, controls | Covered in generator and exposure-parameter rows; no device-specific control recipe inferred. |
| 33 | Line-focus principle, anode angle and use examples | Principle covered. PDF angle ranges/use presets not generalized as universal settings. |
| 34 | Heel effect, intensity gradient, influencing factors and projection examples | Physical direction and conditional thicker-toward-cathode application covered. Added a trilingual transfer MCQ; projection/anatomy presets are not prescribed universally. |
| 35 | Falling load and off-focus radiation | Covered with constraints/countermeasures without implying they remove tube limits. |
| 36 | Electron emission, heat/X-ray production, bremsstrahlung and characteristic radiation | Mechanisms covered. Exact 99/1 and 80/20 fractions omitted as simplified, context-dependent figures. |
| 37 | Spectrum; mA/kV impact on quantity and quality | Covered by localized spectrum visual and linked MCQ. |

## Focused delta and review

Independent source-gap review identified two limited improvements: explicitly contrast fixed and rotating anodes, and add a conditional heel-effect application assessment. Both are implemented in DE/EN/FA. The second item is explicitly conditional on positioning and geometry and does not encode a universal projection preset.

Verification: `node --import tsx scripts/test-technik-roentgen-sync.mjs` passed; `npm run audit:mcq` passed (774 questions); `git diff --check` passed.

## Review limits and open evidence

This is a bounded source/teaching/assessment reconciliation for pp. 30–37, not clinical signoff. The PDF page images were reviewed for source coverage; current browser rendering of all three languages, mobile layout and interaction remains unverified in this audit. Current scientific validation of numerical or practice recommendations was not performed here; source-specific values and universal projection advice remain omitted. Existing diagrams are conceptual schematics, not diagnostic radiographs.

Independent re-review after two corrective deltas: SRC PASS, EDU PASS, VIS PASS, LNG PASS, ASM PASS, REV PASS for this bounded update. The reviewer independently re-extracted/rendered pp.30–37 and confirmed the concise anode comparison and plausible DE/EN/FA distractors. UX remains BLOCKED without browser evidence; no clinical/scientific signoff was performed.
