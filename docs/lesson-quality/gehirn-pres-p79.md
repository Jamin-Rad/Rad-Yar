# PRES pattern lesson — Gehirn.pdf p.79

## Scope and learning path

- Exact curriculum topic: `pres` (Metabolisch-toxische Enzephalopathien).
- Route: `/gehirn/encephalopathie/pres`.
- Audience: radiology learners familiar with MRI sequences and acute neurological presentations.
- Outcome: recognize the common bilateral posterior T2/FLAIR distribution, interpret DWI with ADC, and retain atypical distribution and infarction as alternatives.
- Sections: pattern and clinical context → diffusion → distribution and differential → retrieval check → four portable reporting rules. The take-home is registered with the shared shell’s emphasis treatment and hash/learning-path registry.
- The page uses `StandardLessonShell` and `LessonHero`; no default “Befund & Selbsttest” chapter.

## Source coverage

Source file: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`. PDF page 79 has printed folio 78. The page was rendered and visually inspected; it contains text only and no diagnostic image or figure.

| ID | PDF point | Priority | Lesson destination | Disposition |
|---|---|---|---|---|
| PR-01 | Acute neurological syndrome, vasogenic oedema, typically bilateral parieto-occipital | Essential | `pattern` | Included, preserving “typical” rather than making the distribution mandatory |
| PR-02 | Proposed pathophysiology: autoregulation failure → endothelial injury → vasogenic oedema | Context | Not stated as settled mechanism | Deliberately omitted because the source gives one mechanism without caveat; mechanisms remain debated in the cited review |
| PR-03 | Hypertensive crisis, pre/eclampsia, immunosuppression/chemotherapy | Essential context | `pattern` | Included as compatible contexts; none is presented as diagnostic alone |
| PR-04 | Headache, seizures, visual symptoms, altered consciousness, hypertension | Essential context | `pattern` | Included; these findings are not presented as a required checklist |
| PR-05 | Symmetric parieto-occipital cortical/subcortical T2/FLAIR hyperintensity, white matter > cortex | Essential imaging | `pattern` + localized distribution schematic | Included; the schematic communicates location and is explicitly not an MRI |
| PR-06 | DWI negative in vasogenic oedema; ADC increased | Essential sequence reasoning | `diffusion` + self-check | Included with qualification: bright DWI alone may reflect T2 shine-through; assess ADC |
| PR-07 | SWI microhaemorrhage possible, source estimate ~15% | Relevant caveat | `diffusion` | Possibility included qualitatively; unsupported page-level percentage omitted |
| PR-08 | Minimal/no enhancement in most cases | Optional imaging feature | `pattern` | Included qualitatively; no case demonstrates enhancement |
| PR-09 | Three major distributions: parieto-occipital (~70%), holohemispheric watershed, superior frontal sulcus | Essential | `distribution` | Included qualitatively; the source's ~70% label is not taught as a universal frequency criterion |
| PR-10 | Brainstem, cerebellum, basal ganglia may be involved | Essential caveat | `distribution` | Included as possible additional locations |
| PR-11 | Posterior infarct: unilateral vascular territory, cortical/subcortical, DWI+, ADC↓; PRES may have irreversible infarction/haemorrhage | Essential differential/caveat | `diffusion`, `distribution`, take-home | Included as a differential and warning; no automatic reversibility claim |

## Visual plan and provenance

1. Topic-specific hero and one distribution diagram use a code-native SVG at `public/educational/pres/posterior-pattern.svg`. Bilateral posterior emphasis is schematic only; no image-generation model or diagnostic-scan simulation is used.
2. PDF p.79 provides no case image. No case image has been reused, no Radiopaedia URL is invented, and no diagnostic visual requirement is claimed complete. A typical PRES MRI case remains open under VIS until an exact case and image are accessible and reviewed.
3. Diagram caption, localized alt text, and the three teaching legend units are DE/EN/FA. The SVG contains no visible embedded language labels.

## Terminology

| Concept | DE | EN | FA | Use |
|---|---|---|---|---|
| Vasogenic oedema | vasogenes Ödem | vasogenic oedema | ادم وازوژنیک | Keep distinct from cytotoxic injury |
| Restricted diffusion | Diffusionsrestriktion | restricted diffusion | محدودیت انتشار | Interpret using DWI and ADC together |
| Apparent diffusion coefficient | ADC-Wert | ADC | مقدار ADC | Low values do not by themselves establish a final diagnosis |
| Parieto-occipital | parieto-okzipital | parieto-occipital | آهیانه‌ای ـ پس‌سری | Common distribution, not an exclusion rule |

## Validation and open gates

- Focused route SSR check: `scripts/test-pres-render.mjs` (DE/EN/FA, shared shell, section labels, translated hero alt, lesson text, self-check and feedback).
- Independent read-only review and delta retest PASS (SRC/EDU/LNG/ASM/REV) for the bounded p.79 lesson. Browser UX, RTL display/keyboard/device matrix, and specialist scientific signoff remain pending.
- VIS remains unresolved for diagnostic case evidence: page 79 contains no image. The SVG only teaches orientation and distribution.
- `editorial_qa`: independent review PASS. `scientific_review`: pending specialist signoff. `browser_qa`: BLOCKED pending real browser; diagnostic case VIS remains BLOCKED because p.79 contains no case image. `publication`: not requested. This ledger does not confer clinical or release approval.
