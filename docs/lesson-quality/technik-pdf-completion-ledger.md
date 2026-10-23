# Technik.pdf source inventory - 2026-10-24

Read-only mapping against detached Main d7117a04 in .worktrees/gehirn-completion-main. Source: C:/Users/Drham/OneDrive/Desktop/Lerncore/Technik.pdf. 134 physical pages; printed folio is physical page minus one after the cover. German text with occasional English labels. Born-digital text is broadly readable; formulas, bullets, tables and embedded raster captions need page images. All 134 pages extracted and rendered, all seven contact sheets inspected. Detailed renders inspected for pp.71,91,103,109,113,114,116,118,128. All text read, including follow-up reads where output truncation affected pp.12-13 and 88-96.

This document records the baseline audit before the current authoring deltas. Implementation, independent review, browser evidence and Main publication must be appended by the coordinator after they occur. The analyst edited this documentation only; no lesson source files were changed. Temporary evidence is tmp/technik-inventory/text.txt, p001.png through p134.png, sheet-001.jpg through sheet-121.jpg and detail-*.png.

## Actionable source gaps

| ID | Source/page | Teaching point and importance | Existing location/evidence | Required disposition |
| --- | --- | --- | --- | --- |
| TECH-GAP-118 | Technik.pdf physical118 / printed117, lower half | MR myelography: heavily T2 fluid contrast; CSF bright against surrounding structures; 3D-TSE/MIP; standard T1/T2 correlation; stenosis/CSF-leak context; motion and metal limits. Essential distinct topic. | No Technik data or route teaches MR myelography. BOLD p118 ledger maps only the upper half. | New focused lesson or complete independently accessible block. p118.txt and detail-118.png contain exact evidence. No diagnostic image on source page. |
| TECH-GAP-060 | Technik.pdf physical60 / printed59, lower half | Flat-panel C-arm CT: rotating C-arm acquires many projections, reconstruction yields sectional volume; hardware-position and angiography-room complication contexts; soft-tissue limitations. Essential distinct technical concept. | Fluoroscopy ledger expressly leaves Dyna-CT details in source; no actual C-arm CT teaching found in current Technik route/data. | Add focused block or lesson, qualify diagnostic limitations without promising exclusion of subtle haemorrhage. No diagnostic example on source page. |
| TECH-GAP-011 | Technik.pdf physical11 / printed10, lower half | Anti-scatter grid structure and directional action: absorbing lamellae, radiolucent interspaces, primary versus oblique scattered photons. Supporting but substantive source concept. | Only a one-line grid mention under #wechselwirkung; optimization ledger explicitly defers the full mechanism. | Add a short projection-radiography block with code-native ray/lamella diagram and exposure trade-off. Do not present as a universal CT dose-reduction step. |
| TECH-LINK-046 | Technik.pdf physical46 / printed45 | Photon-counting detector direct conversion and energy bins. Essential. | Already substantively taught in data/technikCTBasicsLesson.js and /technik/ct-grundlagen. Curriculum photon-counting-ct remains unlinked. | Link to existing bounded lesson; avoid duplicate broad content. |
| TECH-LINK-016 | Technik.pdf physical16-20 | Law, areas/responsibility, qualifications, teleradiology. Essential. | Four substantial # sections exist in data/technikGrundlagenLesson.js, but respective curriculum IDs are unlinked. | Fix curriculum and associated training integration; not four missing authored lessons. |

The five access gaps are the exact curriculum IDs `photon-counting-ct`, `strahlenschutz-gesetzliche-grundlagen`, `strahlenschutzbereiche-verantwortliche`, `fachkunde-strahlenschutz` and `teleradiologie`. They have existing substantive content; route presence alone does not establish assessment integration.

Concrete adjacent defect: data/technikGrundlagenLesson.js around line241, CT rows[0][1].de is Persian. Correct the German unit when editing this dataset. No broad retranslation audit performed.

## Complete page-to-topic map

All shorthand anchors below mean /technik/grundlagen. Other paths have /technik/ prefix. Covered means topic-level source match, not clinical or full-lesson QA approval. Existing detailed ledgers carry per-claim inclusions and exclusions.

| Physical pages | Source topics/points | Existing lesson | Status |
| --- | --- | --- | --- |
| 1 | Cover | none | No teaching content |
| 2-3 | Direct/indirect radiation injury, DNA damage and repair, stochastic/tissue effects, radiosensitivity; cataract/shielding context | #wirkung | Covered with documented source-sensitive exclusions |
| 4 | Natural/medical exposure sources and comparisons | strahlenbelastung | Covered; numerical population claims qualified |
| 5-8 | Absorbed/equivalent/effective dose; weighting; dose-area product; entrance kerma/backscatter; CTDIvol/DLP | dosimetrie | Covered |
| 9 | TLD/OSL/film/electronic dosimeters, registry number | berufsdosimetrie | Covered with occupational-law qualification |
| 10-11 | CT positioning/centering, field extent, modulation, low-kV/reconstruction, low-dose use; scatter/grid | #optimierung | Main concepts covered; grid mechanism gap above |
| 12-14 | Collimation, helical interpolation, pitch, overranging and overbeaming | #ct-dose-geometry | Core covered; named 180/360 algorithms deliberately deferred, not new lesson required |
| 15 | Time/distance/shielding and staff/patient geometry | #intervention-3a | Core covered; equipment/procedure-specific directives deferred |
| 16 | Law, justification/optimization/limits | #strahlenschutz-gesetzliche-grundlagen | Authored; link gap |
| 16-18 | Responsible roles, areas, occupational categories and thresholds | #strahlenschutzbereiche-verantwortliche | Authored bounded legal teaching; link gap; operational checklist deferred |
| 19 | Expertise/knowledge and justifying indication | #fachkunde-strahlenschutz | Authored; link gap |
| 19-20 | Teleradiology roles, authorization, regional integration | #teleradiologie | Authored; link gap |
| 21-22 | MPE, diagnostic reference levels, incidents and reporting | qualitaetssicherung-vorkommnisse | Covered with primary-law corrections |
| 23 | Commissioning, expert/acceptance/constancy testing | qualitaetssicherung-vorkommnisse | Covered |
| 24 | Prenatal inadvertent exposure, fetal dose and counselling | strahlenschutz/praenatale-exposition | Covered with qualified dose/gestational claims |
| 25-27 | Atom, Z/A/isotopes, excitation/ionization, radiation distinction | #atom | Covered |
| 28-29 | Alpha/beta/gamma/X-rays, photons, energy-frequency relation and uses | strahlungsarten | Covered; SPECT is an application example, not separate source lesson |
| 30-37 | Tube, cathode/anode/foci, generator, line focus, heel effect, falling load, off-focus radiation, brems/characteristic spectrum, mA/kV | #roehre | Covered; old review-status text is stale |
| 38-42 | Attenuation, photoelectric/Compton/coherent scattering, energy and filtration, mammography spectrum | #wechselwirkung | Covered |
| 43 | Film/CR/indirect/direct DR, image quality and geometry | #detektor | Covered |
| 44-48 | CT signal chain/hardware, detector types, sequential/helical/multidetector geometry | ct-grundlagen | Covered; photon-counting link gap |
| 49-50 | DECT implementations, material separation, iodine/calcium/urate/VNC examples | dual-energy-ct | Covered |
| 51-53 | FBP/iterative reconstruction, HU, windowing, kernels, MIP | #ct | Covered |
| 54-55 | Contrast/resolution/noise, parameter trade-offs, motion/metal/ring/beam-hardening/partial-volume artefacts | #ct | Covered |
| 56-57 | CT perfusion, curves/CBF/CBV/MTT/TTP, stroke/tumour contexts, hemodynamic/protocol limits | ct-perfusion | Covered |
| 58 | Thin sections/sharp kernel/FOV; expiration/prone rationale | #ct | Covered |
| 59-60 | Fluoroscopy and image-intensifier/flat-panel signal chains; C-arm CT | #fluoro | Detector concepts covered; C-arm CT gap |
| 61-62 | DSA mask/fill/subtraction and real triptych | interventionelle-radiologie | Covered |
| 62-63 | Gauge/inch/French, wire/catheter/sheath | interventionelle-radiologie | Covered; no Seldinger procedural steps in PDF |
| 63-64 | Acquisition/display/geometric zoom | #fluoro | Covered |
| 65-68 | Angiographic/interventional application examples, stent types, embolic materials and temporary balloons | interventionelle-radiologie | Core covered; isolated TIPS/port/thrombectomy examples do not require inferred standalone procedural lessons |
| 69-73 | CT phase purposes, liver/renal/pancreas examples, positive oral contrast trade-offs | #protokoll | Covered; p71 is image-only liver case, NOT blank |
| 74-75 | RECIST 1.1 targets, limits, response categories | onkologie/recist-1-1 | Covered |
| 76-86 | Spin/B0/RF, T1/T2/T2*, TR/TE, encoding/k-space, coils/SNR and shim | #mrt | Covered; older basics ledger contains superseded open-shim wording |
| 87-91 | Susceptibility, motion, aliasing, zipper, Gibbs and chemical shift | #mrt-sicherheit | Covered; p91 has real examples |
| 92-94 | Magnet/RF/gradient hazards, SAR and pregnancy contexts | #mrt-sicherheit | Covered with current-context exclusions |
| 95-99 | SE timing; T1/T2/PD; TSE, BLADE/PROPELLER, HASTE | #mrt | Covered |
| 100-103 | GRE, FLASH/VIBE/MPRAGE, T2*/SWI, phase/minIP and SE comparison | #mrt | Covered |
| 104-105 | IR/TI, STIR/FLAIR/DIR | #mrt | Covered |
| 106-109 | Frequency fat suppression, STIR/SPIR, in/opposed phase, Dixon and swap | #mrt | Covered; p109 image-only, NOT blank |
| 110,112-113 | CE/TOF/PC-MRA, VENC, black-blood | #mrt-spezial | Covered |
| 111 | Blank except watermark/folio | none | No gap |
| 114 | DWI, ADC, b value, shine-through | #mrt-spezial | Covered |
| 115 | CISS principle, contrast and small fluid-space anatomy | #mrt-spezial | Covered |
| 116 | MR perfusion T1/T2*, parameters and contexts | #mrt-spezial | Covered |
| 117 upper | CINE temporal motion and functional use | #mrt-spezial | Covered |
| 117 lower | MRCP fluid contrast, source images/MPR/MIP, oral signal suppression and limits | #mrcp-protokoll | Covered |
| 118 upper | BOLD mechanism, task use and planning | #fmri-bold | Covered |
| 118 lower | MR myelography | none | Missing; see gap |
| 119 | Liver MRI native/dynamic/hepatobiliary roles | #leber-mrt-protokoll | Covered |
| 120-123 | Iodine/other X-ray contrast classes, administration, elimination, extravasation, reaction types/prevention | kontrastmittel/roentgen | Covered with current-source qualifications |
| 124-125 | Renal risk, prophylaxis, dialysis/metformin, thyroid | kontrastmittel/nierenfunktion and roentgen | Covered with current-source qualifications |
| 126 | Barium/water-soluble GI contrast and risks | kontrastmittel/roentgen | Covered with source corrections |
| 127-128 | Gadolinium classes, effects/NSF/retention, hepatobiliary agents | kontrastmittel/mrt | Covered |
| 129 | Blank except watermark/folio | none | No gap |
| 130 | Buscopan purpose, contraindications/adverse effects | kontrastmittel/mrt#buscopan | Covered |
| 131 | Contrast pregnancy/lactation | kontrastmittel/schwangerschaft | Covered |
| 132-133 | US interaction/artefacts and Doppler/duplex | sonographie/grundlagen | Covered |
| 133-134 | CEUS microbubbles/mechanism, applications and safety | kontrastmittel/ultraschall | Covered with regulatory qualification |

## Visual inventory and source conflicts

The source contains many code-replaceable conceptual diagrams: CT collimation/pitch/overbeaming pp12-14, tube/focus/spectrum pp30-37, atom/photon interactions pp26/39-40, CT hardware/acquisition/DECT pp44-49, MR spin/relaxation/encoding/sequence timing pp76-84 and95-108. Tables occur at pp6,16,22 (embedded raster),34,42,52-55,59,68,70,72,80,82,87,93,96,103-104,108,128. These are not standalone missing lessons.

Inspected real image candidates: p71 arterial/portal-venous liver case; p91 movement/pulsation, folding, inhomogeneous fat suppression and opposed-phase edge; p103 SWI/filtered phase/minIP/T2*; p109 Dixon and fat-suppression comparisons; p113 TOF/CE-MRA/PC-MRA; p114 DWI/ADC restricted diffusion versus shine-through; p116 T1 postcontrast/FLAIR/CBV treated-glioblastoma example; p128 T1/FLAIR retention panel rID40640. Their source labels are visible. Do not infer unshown sequences, frame timing, diagnoses or diagnostic accuracy beyond the source. New gaps pp11,60,118 do not have source case images; conceptual diagrams can address their technical learning objectives.

Source-sensitive claims needing authoritative confirmation are already dispositioned in many existing ledgers: p3 cataract classification and shielding; p16-24 legal/operational thresholds; p69 timing versus diagram and late-phase CCC wording; p87 susceptibility material table; p88 mandatory two-weighting lesion rule; p92-94 device/SAR/pregnancy rules; p102 SWI phase display and venous-brightness generalization; p115 vendor-equivalence; p120-131 contrast drug/guideline claims. This inventory does not independently approve those claims or imply full scientific re-review.

Excluded missing-curriculum candidates: MR spectroscopy appears only as shim context p86; nuclear medicine/SPECT only radiation-use context p28; PET/CT only dose/response context pp6/74. No separate source lesson for general/neuro/spine/cardiac/breast/pelvic/MSK MRI protocols, elastography, scintigraphy/SPECT or PET-CT technique. The liver MRI protocol at119 is the substantive protocol chapter.

## Completion delta — 2026-10-24

The baseline gaps above have now been implemented:
- TECH-GAP-118: `/technik/mr-myelographie`, four topic-specific chapters, generated conceptual hero, translated workflow, two questions/cards.
- TECH-GAP-060 and TECH-GAP-011: focused C-arm CT and grid blocks within `#fluoro` / `#optimierung`, original diagrams, one question/card each.
- TECH-LINK-046 / TECH-LINK-016: all five curriculum links enabled; each has an exact-topic MCQ and flashcard. The generic take-home now includes individual justification and task-specific responsibilities.
- German CT text defect corrected. Eight topic entries now resolve consistently to lessons and registered training in DE/EN/FA.

Detailed source corrections: see `technik-mr-myelographie-p118.md`, `technik-remaining-blocks-plan.md`, and `technik-topic-access-plan.md`. Existing coverage rows denote mapped teaching coverage, not a new scientific approval of every existing lesson. Incidental references do not create missing standalone lessons; exclusions above remain explicit. Historical 180/360-degree interpolation names on pp12–13 remain a supplemental historical detail rather than a separate lesson; the existing CT geometry block teaches the relevant acquisition/reconstruction distinction.

Independent review and browser evidence are consolidated in `technik-completion-review.md`. Main publication is reported separately by the coordinator after remote verification. Dr. Zia's personal scientific and lesson-by-lesson editorial review remains pending.
