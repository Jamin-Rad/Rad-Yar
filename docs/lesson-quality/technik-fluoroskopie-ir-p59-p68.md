# Fluoroscopy, DSA and intervention basics — source ledger

**Sources:** user-provided `Technik.pdf`, PDF pages 59–68 (printed pages 58–67). Pages were read as text and their rendered content was inspected during the PDF batch review.
**Existing route:** `/technik/grundlagen#fluoro`
**Dedicated bounded route:** `/technik/interventionelle-radiologie`
**Language base:** German PDF; learner copy in DE/EN/FA.

## Learning path

1. Fluoroscopy provides dynamic X-ray imaging. The detector's signal-conversion chain explains how a live image is produced.
2. DSA subtracts a pre-contrast mask from sequential post-contrast images. Motion can misregister the frames; dense calcification and implants may leave artefacts or residual overlap.
3. Recognize the roles and sizing labels of wire, catheter and sheath without treating the source as a procedural manual.
4. Understand PTA/stent and embolization as high-level functions with source-listed examples, not individual treatment recommendations.
5. Distinguish acquisition, display and geometric magnification before inferring effects on detail, blur or exposure.

## Coverage and source boundaries

| PDF page | Source claim | Lesson location | Status / qualification |
| --- | --- | --- | --- |
| 59 | Fluoroscopy: dynamic real-time X-ray; monitor; motion, contrast flow and instrument navigation | Existing `fluoro` lead | Included, concise |
| 59–60 | Image intensifier cascade: input scintillator, photocathode, electron acceleration/focusing, output scintillator, CCD/CMOS; flat panel indirect/direct conversion | Existing `fluoro` → `fluoro-detectors` | Included; direct/indirect chains distinguished |
| 60 | Flat panel geometry, resolution, dynamic range, DQE and compactness; Dyna-CT/C-arm CT and lower soft-tissue resolution | Existing `fluoro` | Detector comparison included; Dyna-CT details remain in source PDF and are not expanded in this subtask |
| 61 | DSA mask, contrast-filled sequence and subtraction; spatial/temporal depiction, measurement, 3D; invasive acquisition, contrast, radiation, motion and calcification/implant caveats | Existing `fluoro` → `dsa-acquisition`; new route `dsa-grundlagen` | Included; PDF flags possible limitations for marked calcification/implants, but the lesson does not generalize this to an exclusion rule |
| 62 | DSA triptych, printed page 61, panels a–c: contrast-filled image, native image, subtraction result; basilar tip aneurysm example | New route `dsa-grundlagen`, image source panel and `<figure>` | Crop from user-authorized PDF; sourceRef `Technik.pdf#page=62`, printed p.61, panels a–c. A single example, not a universal sequence. No source rID is printed on the page. |
| 62–63 | Gauge, inch and French; wire/catheter/sheath definitions and wire-guided advancement | New route `ir-materialien`; `ir-seldinger-technik` anchor | Included as component concepts. PDF does not describe Seldinger puncture steps, access choice, sterile technique, anticoagulation or complications; these are explicitly out of scope. |
| 63 | Image-intensifier magnification by reducing input FOV (PDF example 30→22 cm); claimed detail and dose trade-off | Existing `fluoro` → `fluoro-zoom` | Included; example is explicitly not a universal size. IAEA HHS 48 qualifies automatic exposure and dose effects by detector type/system. |
| 63 | Electronic/display zoom after acquisition | Existing `fluoro` → `fluoro-zoom`; linked MCQ and flashcard | Included; pure post-processing enlarges existing information and does not itself cause another exposure. Kept distinct from smaller-FOV acquisition. |
| 64 | Geometric enlargement by increasing object-detector distance; PDF claim of unsharpness/dose | Existing `fluoro` → `fluoro-zoom` | Included; maps the PDF's motion/scatter note and distinguishes motion blur from scatter-related contrast loss; adds focal-spot geometric unsharpness and qualifies dose by geometry/system. No patient-specific setting advice. |
| 65 | Diagnostic angiography examples; PTA, stent, embolization, thrombectomy, TIPS and other applications | New route `ir-pta-stent` and `ir-embolisation` | PTA/stent/embolization only, as requested; other procedure topics remain unlinked |
| 66 | Self-/balloon-expandable, covered and drug-eluting stents; example territories/uses | New route `ir-pta-stent` | PDF examples are labeled as examples, not indications or current device recommendations |
| 67–68 | Coils/plugs, particles, liquid agents, covered stents and temporary balloons; intended functions/examples | New route `ir-embolisation` | Functional overview only. No sizing, dose, material-selection algorithm or procedural steps are taught. |

## Translation terminology

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Image intensifier | Bildverstärker (BV) | image intensifier (II) | تقویت‌کنندهٔ تصویر |
| Flat-panel detector | Flachdetektor | flat-panel detector | آشکارساز تخت |
| Mask image | Maskenbild | mask image | تصویر ماسک |
| Misregistration | Fehlregistrierung | misregistration | ناهماهنگی ثبت |
| Sheath | Schleuse | sheath | شیت |
| Self-expanding stent | selbstexpandierender Stent | self-expanding stent | استنت خودبازشونده |
| Covered stent | gecoverter Stent | covered stent | استنت پوشیده |
| Embolization | Embolisation | embolization | آمبولیزاسیون |
| Display zoom | Anzeigezoom | display zoom | بزرگ‌نمایی نمایشی |
| Geometric magnification | geometrische Vergrößerung | geometric magnification | بزرگ‌نمایی هندسی |

## Supplemental evidence

- Detector-chain context is supplemented by Nickoloff EL, “AAPM/RSNA Physics Tutorial for Residents: Physics of Flat-Panel Fluoroscopy Systems,” *RadioGraphics*. 2011;31(2):1117–1135. DOI: [10.1148/rg.312105185](https://pubs.rsna.org/doi/10.1148/rg.312105185). This is not the source of the PDF claims.
- Motion-related misregistration and non-subtracted digital angiography as a complementary alternative when DSA is inadequately interpretable are supplemented by Tateishi H, Kuroki K, Machida H, et al., “Clinical applications of digital angiography with the harmonization function in body interventional radiology,” *Jpn J Radiol*. 2020;38(10):922–933. DOI: [10.1007/s11604-020-00990-w](https://link.springer.com/article/10.1007/s11604-020-00990-w). This citation is not used to support calcification or implant claims.
- The source PDF warns that strong calcification or implants may limit DSA. The lesson preserves this as a source warning and avoids a categorical exclusion or an unsupported mechanism claim.
- IAEA, *Quality Assurance and Optimization for Fluoroscopically Guided Interventional Procedures*, Human Health Series No. 48 (2025), sections on magnification modes and geometry. This is used to qualify dose effects by detector/system and distinguish image-intensifier magnification from flat-panel behavior: [official IAEA publication](https://www-pub.iaea.org/MTCD/publications/PDF/p15730-PUB2101_web.pdf).
- Specific angiographic procedures, access steps, material sizes, dose settings, contraindications and patient selection remain outside this lesson. A clinician's review is still required before treating this as teaching guidance.

## Current evidence gates

- `editorial_qa`: pending independent review of the added magnification block and linked assessment.
- `scientific_review`: pending clinician review; no procedural or patient-specific recommendation is made.
- `browser_qa`: pending visual checks at desktop/mobile and all three languages; existing login gate is unchanged.
- `publication`: not assessed. `inProgress` in curriculum indicates a linked draft, not approval or completion.
