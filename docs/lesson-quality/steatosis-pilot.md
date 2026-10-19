# Hepatic steatosis · page-level production ledger

Status: existing lesson refined against Abdomen.pdf pp.26–27 and current EASL guidance; fresh independent review found a material PDF anatomy conflict, now repaired and awaiting delta retest; browser QA pending.
Route: `/abdomen/leber/steatose` · exact curriculum topic: `hepatische-steatose`.

## Source coverage

Source inspected visually: user-provided `Abdomen.pdf`, PDF pages 26–27 (printed pages 25–26). PDF page 26 contains diffuse steatosis; PDF page 27 contains focal steatosis and transitions into cirrhosis, which is outside this lesson.

| Source | Point | Disposition | Lesson location |
| --- | --- | --- | --- |
| p. 26 / printed 25 | Abnormal hepatocyte lipid, especially triglyceride, accumulation | Included, concise definition | `muster` |
| p. 26 | Prevalence about 25% | Deferred: prevalence is not needed for the imaging learning goals and is not generalized without a current, population-specific estimate | — |
| p. 26 | Associations: alcohol; metabolic dysfunction/insulin resistance, obesity, dyslipidaemia; medications; parenteral nutrition; chronic hepatitis; pregnancy | Included concisely as source-attributed associations; pregnancy omitted to avoid conflating generic steatosis with distinct pregnancy-related liver disease | `ursachen` |
| p. 26 | Reversibility absent fibrosis/cirrhosis if underlying cause addressed; possible progression to fibrosis/cirrhosis | Included as source-attributed course; clinical context caveat | `ursachen` |
| p. 26 | Ultrasound: increased liver echogenicity relative to kidney; sound attenuation may obscure deep liver/diaphragm | Included with limitation against quantifying from brightness alone | `muster` |
| p. 26 | Unenhanced CT: reduced liver density; liver-to-spleen comparison and HU examples | Included conceptually; source HU cutoffs deliberately not presented as validated criteria pending clinical verification | `muster`, `takehome` |
| p. 26 | MRI: in-/opposed-phase signal drop; PDF calls MRI gold standard | Qualitative signal-drop pattern retained; dated “gold standard” wording replaced with current distinction: MRI-PDFF is highly accurate for quantification but is not automatically first line due to cost/access | `muster`; visible sources |
| p. 27 / printed 26 | PDF states segment IV near falciform ligament and segments II/III near gallbladder | Segment IV/falciform association retained; the II/III–gallbladder pairing is flagged as an internal anatomy conflict and not taught. Vilgrain et al. (Radiology 2016, doi:10.1148/radiol.2015142576) places the gallbladder fossa in segments IV/V. This is an imaging-review source, not a new primary anatomy study. | `fokal` |
| p. 27 | Atypical venous drainage may locally dilute portal venous blood | Omitted from learner copy as mechanistic explanation pending verification; mechanism is not needed for the imaging decision taught | Ledger only |
| p. 27 | No mass effect; vessels course normally through the region | Included as discriminating imaging clues; not treated as proof | `fokal` |
| p. 27 | Opposed-phase signal drop as standard for detecting intracellular fat | Included with restrained interpretation (“supports”) | `fokal` |
| p. 27 | Next heading starts cirrhosis | Excluded; separate exact topic `leberzirrhose`, not implied covered here | Scope boundary |

## Learning path and visuals

1. Recognise diffuse parenchymal change across ultrasound, unenhanced CT and MRI.
2. Distinguish focal fat/sparing from a mass using location, vessel course and MRI signal behavior.
3. Place source-listed associations and possible course in context without implying imaging establishes cause.
4. Retrieve the focal-area decision in an embedded explanatory self-check; compress four reporting rules.

The PDF pages contain text, not diagnostic patient images. The page therefore uses a code-native, labeled teaching schematic to show diffuse background change with a focal spared region and traversing vessels. It is explicitly identified as a schematic, not a patient scan. No Radiopaedia image is required for this recognition task. No source-page graphic was extracted as clinical evidence.

## Terminology map

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Hepatic steatosis | Hepatische Steatose | Hepatic steatosis | استئاتوز کبدی |
| Focal sparing | Fokale Aussparung | Focal sparing | ناحیه حفظ‌شده موضعی |
| In-/opposed-phase | In-/Opposed-Phase | In-/opposed-phase | فاز هم‌فاز/ناهم‌فاز |
| Mass effect | Masseneffekt | Mass effect | اثر فشاری |

## Evidence and open gates

- Source pages visually inspected; OCR/text extraction utility was unavailable in the bundled Poppler directory, so source coverage above is based on rendered pages.
- Author structural checks passed (ESBuild transform, locale structure, MCQ audit and diff check). Full Next build was attempted but could not complete because Google Fonts DNS access failed and `.next` creation then hit EPERM; no browser render was obtained.
- Current modality framing was checked against the EASL–EASD–EASO 2024 MASLD guideline and EASL 2021 non-invasive imaging guideline (see visible lesson references). The PDF's generic “MRI gold standard” label is not carried over as a first-line recommendation. Prevalence is deferred; source-reported HU examples are intentionally not taught as validated thresholds. The cause/progression list remains a source-attributed summary, not a complete classification or a patient-level prognosis.
- VIS reviewer should inspect the schematic and ensure it does not imply that typical location or vessel passage alone excludes a mass. The schematic does not depict anatomic segment landmarks; its alt text now describes only diffuse steatosis and focal sparing.
- LNG source-level comparison remains pending, despite DE/EN/FA copy being present.
- ASM has an embedded three-option self-check; global bank linkage and assessment audit are not claimed.
- UX desktop/mobile, theme, RTL and interaction browser checks are pending.
- The fresh independent review found STE-SRC01 (PDF segment/gallbladder mismatch), STE-SRC02 (fibrosis assessment wording), and STE-VIS01 (alt text promised landmarks absent from the schematic). All three corrections were independently retested and closed; actual-route SSR and scoped diff checks pass. Browser UX, diagnostic-image recognition and Dr. Zia's clinical approval remain open. No global MCQ/flashcard registration is claimed.
