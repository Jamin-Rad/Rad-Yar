# Pulmonary oedema HRCT addition — Thorax.pdf p.17

Date: 2026-10-20 · existing route `/thorax/lungenoedem#hrct` · curriculum ID `lungenoedem` (`inProgress`).

## Learning aim and source scope

Learners identify a supportive HRCT combination for hydrostatic oedema, describe its distribution and accompanying findings, and avoid treating morphology as proof of a cardiac cause.

Thorax.pdf p.17 (printed p.16) was rendered and visually inspected. The upper section is explicitly headed “Kardiogenes Lungenödem” and contains text plus three images: axial CT, coronal CT, and a frontal chest radiograph. The lower section is the separate UIP topic. The p.17 image panels are not used for UIP. The lesson uses a crop from the three edema panels as source illustrations in the cardiogenic/permeability comparison chapter, not under the HRCT heading. They are labeled by modality and source page. The caption directs attention to the combined CT pattern while making clear that the third panel is a chest radiograph; it does not assign an individual sign to a specific image.

## Coverage ledger

| ID | PDF point | Implementation | Verification / limits |
|---|---|---|---|
| PE17-01 | Smooth septal thickening with GGO | HRCT comparison table, DE/EN/FA | Supported by source slide and Ribeiro et al. 2006 (retrospective cohort, n=15); not specific alone |
| PE17-02 | Perihilar and gravity-dependent distribution | HRCT comparison table | Source slide plus Kim et al. 2001 positional study (n=16); position and volume status influence appearance. The study found more pronounced shifting of septal thickening in edema, but no significant difference for GGO shifting. |
| PE17-03 | Peribronchovascular thickening/cuffing, fissural thickening, cardiomegaly and pleural effusion | Accompanying-signs row | Described as possible associated findings, not required signs |
| PE17-04 | CT and radiograph image examples | Three-panel crop from PDF p.17 with modality labels and a localized caption in the modality-comparison chapter | First two panels are identified as CT and linked to the table's combined pattern; third panel is explicitly a radiograph, not HRCT; no standalone diagnostic claim |
| PE17-05 | Clinical inference | CAVE/interpretive-limit row and new MCQ/card | Morphology is supportive, not proof of etiology or a PCWP measurement |

## Assessment integration

Added a four-option question for each language to the central thorax question bank, with distinct explanations for incorrect options. Added one flashcard to the `lungenoedem` topic and connected curriculum quiz/card links. Existing lesson sections and ARDS material remain intact.

## Added sources

- Ribeiro CMC, Marchiori E, Rodrigues R, et al. *Hydrostatic pulmonary edema: high-resolution computed tomography aspects.* J Bras Pneumol. 2006;32(6):515–522. DOI: 10.1590/S1806-37132006000600008. [PubMed](https://pubmed.ncbi.nlm.nih.gov/17440672/). Retrospective 15-patient cohort; supports the principal GGO/septal/effusion/peribronchovascular findings.
- Kim YS, Choi YW, Jeon SC, et al. *Positional Shifting of HRCT Findings in Patients with Pulmonary Edema.* J Korean Radiol Soc. 2001;44(3):333–338. [DOI](https://doi.org/10.3348/jkrs.2001.44.3.333). Small positional study; informs the gravity-dependent caveat.
- Thorax.pdf, PDF p.17 (printed p.16), cardiogenic edema section: source of notes and three source images.

## QA status

- SRC: page and panel positions visually checked; scientific claims are linked to the source slide and two small studies. Kim et al. (n=16) specifically found greater positional shift of septal thickening, not a significant GGO-shift difference.
- EDU: one focused HRCT chapter is inserted after the existing chest-radiograph sequence; current ARDS chapter remains separate.
- VIS: source CT/coronal CT/radiograph crop has localized labels and provenance; no panel-specific diagnostic claim. After independent review, the figure was moved from the HRCT chapter to the modality-comparison chapter and a three-language viewing guide was added. See the correction note below.
- LNG: DE/EN/FA copy and assessment corrected after independent review; Persian septa wording normalized to `سپتاهای بین‌لوبولی`; independent language delta PASS.
- ASM: central question/card/curriculum integration added; correct choice matches the updated stem in all languages, distractor explanations align; `npm run audit:mcq` PASS (651 questions); actual-route SSR test PASS.
- UX: local dev server could not bind because socket access was denied; browser QA remains blocked.
- REV: independent review identified and verified corrections to the GGO positional-shift claim, Persian spelling, and mismatched MCQ options; final bounded delta PASS. Clinical signoff is not established.

## Independent visual review correction — 2026-10-23

The reviewer found that the original placement of a CT/CT/radiograph montage under
the HRCT heading could mislead learners about modality. The montage now appears in
the cardiogenic-versus-permeability comparison chapter; its caption names the two
CT panels and the radiograph separately and gives the table's combined CT pattern
as a viewing target without claiming each sign is visible in each panel. A media
provenance record was added. Independent re-review confirmed VIS/REV/ASM PASS
for the correction after inspecting the source page and crop. Focused render test,
global MCQ audit and scoped diff-check pass. Live browser and specialist approval
remain unverified; SSR output does not establish live RTL behavior.
