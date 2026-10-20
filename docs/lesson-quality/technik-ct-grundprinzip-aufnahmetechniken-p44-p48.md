# CT fundamentals and acquisition — Technik.pdf pp.44–48

## Scope, source inspection and lesson promise

- Source inspected: `Technik.pdf`, PDF pp.44–48 (printed pp.43–47); text was extracted and all five pages were rendered and visually inspected. The source has no current diagnostic case that is necessary for these technical learning goals.
- Curriculum IDs: `ct-grundprinzip-aufbau` and `ct-aufnahmetechniken`.
- Existing route: `/technik/grundlagen`, CT section. The focused route `/technik/ct-grundlagen` teaches both linked topics with the shared lesson shell and a CT-specific schematic hero.
- Learner promise: explain how CT turns attenuation measurements from multiple angles into a cross-sectional image, and distinguish sequential, helical and multidetector acquisition without treating scanner-specific values or old dose claims as universal.
- Chapter structure: (1) How do CT components turn X-rays into a section? (2) How does the table move during acquisition, and what do multiple detector rows add?
- Implemented visuals: a code-native CT signal chain for the first chapter; a code-native side-by-side couch/tube timing and detector-row schematic for the second; topic-specific CT gantry hero.

## Coverage ledger

| PDF page (printed) | Source point | Importance | Lesson mapping / disposition |
|---|---|---|---|
| 44 (43) | Tube rotates, emits a fan beam; opposing detector measurements record attenuation at many angles; computer calculates attenuation values and forms slices | Essential | Chapter 1: acquisition → projection data → reconstruction diagram and concise explanation |
| 44 (43) | CT scanner history and first human CT date | Contextual | Omitted from main path; dated history is not needed to meet either curriculum objective |
| 44–45 (43–44) | Early generations: translate/rotate pencil beam, partial fan beam, rotate/rotate geometry, stationary detector ring | Contextual | Historical list omitted from the learning path; a note cautions that generation labels are historical and do not fully classify current systems |
| 45–46 (44–45) | Gantry, tube/collimator, detector unit, generator, cooling, couch, console and computer | Essential | Chapter 1: group into acquisition hardware, patient positioning/control and computing/reconstruction |
| 45 (44) | Gantry mass, heat capacity and rotation-time examples | Non-universal | Omit exact weight, 0.5 s and 8 MHU: equipment-specific and not required for the learning goals |
| 46 (45) | Energy-integrating solid-state detector: scintillator converts X-rays to light, photodiode converts light to electrical signal; signal digitized and reconstructed | Essential | Chapter 1: detector pathway visual and comparison |
| 46 (45) | Photon-counting detector (CdTe): direct conversion to electrical pulses, energy discrimination; claims of higher resolution/lower dose | Essential with qualification | Chapter 1: concept included; performance claims expressed as potential/system-dependent, not guaranteed patient dose or universal superiority |
| 47 (46) | Sequential step-and-shoot: acquire at fixed table position, then advance for next section | Essential | Chapter 2 and schematic |
| 47 (46) | Sequential advantages (less data / lower dose), disadvantages (time, gaps, no 3D), selected applications | Requires qualification | Teach stop-and-go mechanics and selected examples. Do not claim universal lower dose or absolute absence of 3D; exam time, gaps, and reformats depend on coverage, protocol and reconstruction |
| 47 (46) | Helical/spiral: continuous table movement during tube rotation; PDF lists as current standard with faster acquisition, fewer motion artefacts and volume/3D data | Essential with qualification | Chapter 2: mechanics, possible shorter volume acquisition, motion caveat, and volume data. Benefits are task-dependent, not a guarantee |
| 47–48 (46–47) | Multiple detector rows acquire several z-channels per rotation; PDF lists faster scan, better contrast-agent utilization, higher spatial resolution, isotropic voxels and MPR/3D | Essential with qualification | Chapter 2: MDCT is detector geometry, improves possible z-coverage speed; near-isotropic reformats and contrast timing depend on collimation/protocol. Row count alone does not determine spatial resolution or guarantee lower contrast volume |
| 48 (47) | 320-row system, 0.5-mm reconstructed slice thickness, 16-cm coverage in one rotation; historical row-count progression | Scanner-specific/contextual | Lesson states these are source-specific equipment examples, not general CT specifications |
| 48 (47) | Higher detector counts improve resolution, asserted as primarily detector-count determined | Needs correction/qualification | Explain z-coverage depends on collimation/active rows; spatial resolution depends on multiple system/reconstruction factors, not row count alone |

## Independent technical sources and limits

- AAPM, [CT Lexicon v2.0 (2022)](https://www.aapm.org/pubs/CTProtocols/documents/CTTerminologyLexicon.pdf): standard acquisition terminology and pitch definition; not used as a clinical protocol.
- Hsieh & Flohr, [Computed tomography recent history and future perspectives](https://doi.org/10.1117/1.JMI.8.5.052109): technical evolution, helical/multislice and photon-counting detector context.
- Bardo & Brown, [Cardiac multidetector CT: basic physics of image acquisition](https://pmc.ncbi.nlm.nih.gov/articles/PMC2780825/): scan-mode and hardware principles; cardiac protocol details are outside scope.
- Flores et al., [Photon-counting detector CT: key points radiologists should know](https://pubmed.ncbi.nlm.nih.gov/36047540/): direct conversion and potential technical benefits; does not justify universal dose claims.

## Assessment and verification

- One embedded two-part retrieval check tests acquisition geometry and detector pathway, with immediate explanations in DE/EN/FA.
- Central MCQs and flashcards map to both exact curriculum IDs. Quiz/flashcard links carry the localized focused-route return path.
- Focused SSR/registry test passed: source-ledger linkage, localized content, both exact topic registrations, questions/cards, action links and DE/EN/FA output including RTL.
- Central MCQ-bank audit passed: 659 questions and 18 cases per language.
- JSX bundling, JavaScript syntax checks and XML parsing of the three lesson SVGs passed.
- Independent review passed SRC/EDU/VIS/ASM/REV for this bounded lesson after defining helical pitch in all locales and correcting the German distractor explanation. Browser evidence remains blocked: the local site renders its sign-in gate in the available browser, so the lesson itself could not be inspected at desktop/mobile or in RTL. Specialist scientific approval remains separate; these checks do not constitute publication approval.
