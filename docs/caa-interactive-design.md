# CAA interactive teaching design

The five reading chapters retain their shared Test layout, independent Take Home, topic-specific hero, language support and progress tracking.

## Learning interactions

- **Foundations:** three-stage vessel-wall explorer. The cross-section changes from no amyloid to deposits and possible wall injury/bleeding. It is a simplified schema, not an inevitable disease trajectory.
- **MRI:** four selectable bleeding patterns with a generated anatomical base and code-native finding overlays. Location, sequence and interpretation change with the selected pattern. The complete marker table remains available in a comparison disclosure. White-matter criteria have separate schematics with visible thresholds.
- **Clinical:** a three-stage TFNE illustration (hand symptoms, spreading, resolution). The persistent superficial blood focus does not vanish when symptoms resolve. The diagram illustrates an example and proposed mechanism, not a fixed duration or precise somatotopic map.
- **Boston:** editable example findings, three presets, a connected decision diagram and live MRI category with explanation. This is a teaching simulation. It counts ICH/CMB and separate cSS/cSAH foci, applies age ≥50, compatible symptoms and exclusions, and permits possible CAA from a WM marker alone. Two WM markers alone never establish probable CAA.
- **Differentials:** switch between lobar, deep and mixed distributions. The diagram and interpretation change together. A mixed pattern precludes the MRI probable/possible categories while permitting coexisting CAA.

Interactions do not mark sections read, change the URL or navigate to another chapter. Reading progress remains an explicit action. All teaching text and controls have German, English and Persian versions. Tabs support arrow keys, Home and End, with RTL direction, visible focus and selected states.

## Design and media

Visual references: generated MRI-atlas, clinical-TFNE and Boston-module concepts, adapted to the existing Test shell. Generated UI concepts are layout references; medical labels are locked to the source lesson and Boston publication. Erroneous labels in generated drafts (55 instead of 50, omitted cSS/cSAH, or WM alone as probable) are never used as medical source material. Existing navbar, hero rules and five chapter icons take precedence over mockup chrome.

Production assets use the built-in Image Gen tool:

- public/educational/caa-axial-anatomy-v1.webp: neutral axial anatomical illustration, no lesions, labels, numerals or scan texture; cream/lilac cortex and white matter on transparent background.
- public/educational/caa-tfne-anatomy-v1.webp: lateral brain and hand/forearm anatomy, no blood, wave, arrows, labels or UI; transparent lilac editorial illustration.

Dynamic blood, cortical-wave and symptom overlays are code-native. Generated image bases are compressed for delivery without changing their anatomy. Vessel-wall and white-matter schematics and the Boston decision diagram are native SVG/HTML.

## Clinical sources

Boston rules: [Charidimou et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/).
TFNE mechanism: [Smith et al., 2021](https://discovery.ucl.ac.uk/id/eprint/10129277/).
The reviewed lesson sources and factual corrections remain in docs/caa-content-review.md.


## Production image prompts

Built-in tool, transparent_background=true, brand-new images, no reference targets.

**Axial anatomy:** Create ONE standalone transparent-background anatomical brain illustration for a German radiology teaching atlas, no UI, no text, no numerals, no arrows, no lesions, no labels. A clean symmetrical axial schematic of the brain, not an MRI scan or patient image, designed as refined medical editorial artwork. Two hemispheres, anatomically recognisable gyral cortical ribbon and a simplified inner white-matter region, narrow midline fissure, small central CSF spaces. Clear cream and pale lilac tissue with muted mauve outlines and subtle painted volume; beautifully legible cortical sulci. No glow, no stars. Brain fills almost the entire square canvas, centred with 5% transparent margin. Front of brain at top. Do not draw skull or extra panels. This neutral base will have code-native coloured lesions overlaid later; all cerebral tissue must remain clean. Consistent with a dark charcoal/lilac/teal RadYar lesson.

**TFNE anatomy:** Create ONE standalone transparent-background medical editorial illustration for an interactive TFNE teaching diagram. No UI, no text, no letters, no numerals, no arrows, no wave, no blood, no lesions or callout boxes. Wide landscape layout. On the left half, lateral view of a human brain with recognisable delicate cortical folds and small cerebellum, facing left. On the right half, one clear hand and forearm anatomical outline, hand at upper right and elbow below at lower centre-right, clean consistent proportions. The two objects are separate with negative space between them. Refined pale lilac / mauve anatomical line art with subtle dark translucent shading and restrained volume, suitable on both charcoal and pale backgrounds. No x-ray appearance, no network patterns, no decorative medical symbols. Objects fill the image with 5% transparent margins. This clean static base will receive code-native teal wave and symptom highlights during interaction.

Delivery sizes after WebP compression: axial 800×800 / 97,346 bytes; TFNE 1000×667 / 93,274 bytes. Anatomy is unchanged. The mobile Boston result summary stays visible while editing; the existing live result provides one accessible announcement. Interactive controls have safe scroll margins for the fixed navbar and mobile learning path. Persian inequalities use directional isolation.
