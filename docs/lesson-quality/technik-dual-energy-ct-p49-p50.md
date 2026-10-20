# Dual-Energy CT — Technik.pdf pp. 49–50 (printed pp. 48–49)

Status: bounded DE/EN/FA standalone lesson at `/technik/dual-energy-ct`. It covers the requested principle, acquisition families and application matrix; it is not a full audit of the surrounding CT curriculum.

## Source coverage ledger

| Key | PDF evidence | Lesson disposition | Qualification |
|---|---|---|---|
| DECT-49-01 | p.49 text: attenuation differs by photon energy and material; two spectral measurements inform material differentiation | Opening explanation and principle flashcard | Model-based decomposition; two measurements do not identify an arbitrary number of materials or constitute direct chemical analysis |
| DECT-49-02 | p.49 methods overview: dual-source, detector-layer, rapid tube-voltage switching; source text also names sequential acquisition | Localized method table | Schematic crop shows only the first three methods; sequential acquisition is explicitly text-only here. System implementations vary |
| DECT-50-01 | p.50 application text: lower-keV virtual monoenergetic images improve iodine conspicuity | Application row, retrieval question, take-home rule | Noise and achievable benefit depend on scanner, task, dose and reconstruction |
| DECT-50-02 | p.50 application text: higher-keV images can reduce metal artefacts | Application row and take-home rule | Not guaranteed to remove all artefacts; iodine contrast may fall |
| DECT-50-03 | p.50 application text: urate/calcium material separation in gout | Application row | False positives/negatives and artefacts are possible; clinical context and synovial-fluid analysis where appropriate remain relevant |
| DECT-50-04 | p.50 application text: calcium-suppressed musculoskeletal images | Application row | Additional, task-specific depiction of marrow oedema; not a general MRI replacement |
| DECT-50-05 | p.50 application text: iodine maps and virtual noncontrast after thrombectomy | Application row | Mixed iodine/haemorrhage findings occur; inspect both reconstructions and clinical evolution |
| DECT-50-FIG | Clinical CT panels are shown but sequence/frame mapping and image-specific assertions are not sufficiently traceable in the supplied page | Not used as diagnostic cases | No patient-level finding is inferred from those panels |

Both source pages were rendered and visually inspected. The p.49 methods schematic was cropped from the supplied PDF with nearby scanner labels retained. The crop is not a patient scan. User authorization covers supplied-PDF imagery; independent rights metadata is not present in the PDF and is not asserted here.

## Learner outline and visual plan

Proposed chapter titles:

1. **Dual-Energy-CT: Spektren in Materialinformation übersetzen** — explain the energy/material relationship, compare acquisition approaches, and choose an application while naming its limitation.
2. **Drei Regeln mitnehmen** — consolidate the bounded material model, the low-/high-keV trade-off, and the adjunctive status of material maps/VNC/VNCa.

Use the source methods schematic for acquisition recognition, a compact technique/application table for comparisons, and one focused low-keV retrieval question. Do not add a generic “Befund und Selbsttest” section. No synthetic scan or unverified Radiopaedia case is used.

## Scientific support and limits

- McCollough et al. *Dual- and Multi-Energy CT: Principles, Technical Approaches, and Clinical Applications.* Radiology. 2015;276:637–653. doi:10.1148/radiol.2015142631 — principles and acquisition approaches (review).
- *Dual-Energy CT Images: Pearls and Pitfalls.* RadioGraphics. 2021;41:98–119. doi:10.1148/rg.2021200102 — virtual monoenergetic trade-offs and reconstruction pitfalls (review).
- Bongartz et al. *Dual-energy CT for the diagnosis of gout: an accuracy and diagnostic yield study.* Ann Rheum Dis. 2015;74:1072–1077. doi:10.1136/annrheumdis-2013-205095 — prospective diagnostic study; false-positive findings in advanced knee osteoarthritis.
- *Determinants and Clinical Relevance of Iodine Contrast Extravasation after Endovascular Thrombectomy: A Dual-Energy CT Study.* AJNR. 2024. doi:10.3174/ajnr.A8081 — observational post-thrombectomy cohort with iodine and mixed findings.

Scientific literature was used to qualify, not expand, the PDF's bounded teaching claims. The lesson does not teach a universal acquisition recommendation, detailed post-thrombectomy management, or that VNC/VNCa replace true noncontrast CT/MRI.

## Changed paths and verification

- `app/technik/dual-energy-ct/page.jsx` and `page.module.css` — standalone localized route using the shared lesson shell.
- `data/technikDualEnergyLesson.js` — localized lesson, one three-language MCQ, two flashcards, and source mapping.
- `data/curriculum.js`, `data/questions.js`, `data/flashcards.js` — exact `dual-energy-ct` links and registry entries.
- `public/technik/grundlagen/dect-methods-p49.png` — source crop; `public/technik/dual-energy-ct/hero.svg` — code-native conceptual header, not diagnostic evidence.

## Quality review

- SRC, EDU, VIS, LNG, ASM, REV: independent review PASS for this bounded scope. Reviewer inspected both source pages and the crop; the p.50 patient panels remain excluded as diagnostic cases.
- Verification: focused SSR/registry test PASS for DE/EN/FA and RTL; `npm run audit:mcq` PASS (652 questions); esbuild route parse PASS; `git diff --check` PASS.
- UX: BLOCKED pending real-browser route, responsive, RTL, and interaction evidence. Clinical approval and publication are not established.
