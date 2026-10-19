# Gehirn.pdf p. 2: midline cava source audit

**Draft status:** source-mapped editorial update; independent neuroradiology and browser review remain open. The existing route remains `inProgress` and is not clinically approved.

## Scope and outcome

Source: user-provided `Gehirn.pdf`, PDF p. 2 (printed p. 1). The page is a text-only anatomy summary for cavum septi pellucidi (CSP), cavum vergae (CV), and cavum veli interpositi (CVI). It contains no diagnostic scan or figure. The existing curriculum entry `liquorraeume-ventrikelsystem` already routes to `/gehirn/anatomie/liquorraeume-ventrikelsystem`; this pass adds a focused landmark check and narrows two overbroad CSP statements. It does not create a duplicate lesson.

## Source coverage ledger

| Item | PDF evidence | Existing route placement | Decision |
|---|---|---|---|
| CSP is a fluid-containing cleft between septal leaflets, anterior to the Monro plane and between frontal horns | PDF p. 2, CSP bullets | `CONTENT.{de,en,fa}.csp.lead`, plus the shared `orientation` cards | Retained; an external anatomy reference also supports septal leaflets and frontal-horn position. |
| CV is the posterior continuation of CSP, posterior to Monro, below corpus callosum and above fornices | PDF p. 2, CV bullets | `CONTENT.{de,en,fa}.cv.lead` and its continuity card | Retained; language now describes continuity without an unsupported frequency claim. |
| CV is rarely isolated | PDF p. 2 CAVE note | `CONTENT.{de,en,fa}.cv.key` | The practical check remains: if anterior CSP is not seen, review planes and alternatives. The lesson does not repeat “almost never” as a quantified prevalence. |
| CVI lies below the fornices, above the third ventricle, in the tela choroidea; axial shape is commonly triangular | PDF p. 2, CVI bullets | `CONTENT.{de,en,fa}.cvi` and code-native comparison figure | Retained; the in-lesson check contrasts this location with CSP/CV. |
| CSP appearance/significance | PDF p. 2 calls it a fluid-filled cleft; no threshold or follow-up protocol is given | `CONTENT.{de,en,fa}.csp.rows` and caveat | Reworded “all MRI sequences” to routine CSF-like signal/attenuation. Removed a blanket “no follow-up” statement not supported on this PDF page; now directs attention to size, mass effect, and CSF pathways in context. |
| Page 2 images | No figures on PDF p. 2 | Existing code-native `/public/mittellinienzysten/cavum-comparison.jpg`; separate local MRI series in the route | No PDF diagnostic image claimed. Existing diagram credit is Zyryab/Wikimedia Commons, CC BY-SA 3.0. Case suitability, frame provenance, and rights still need independent review. |

## Teaching plan and language parity

The existing lesson sequence stays intact. Within its “Normvarianten” chapter, learners identify the frontal horns and Monro plane, compare the three spaces, then answer a short retrieval question before reading its explanation. The exercise is repeated in the linked quiz bank only where relevant; no registry or flashcard set was altered in this pass.

| Concept | DE | EN | FA |
|---|---|---|---|
| cavum septi pellucidi | Cavum septi pellucidi (CSP) | cavum septi pellucidi (CSP) | کاووم سپتی پلوسیدی (CSP) |
| cavum vergae | Cavum vergae (CV) | cavum vergae (CV) | کاووم ورگه (CV) |
| cavum veli interpositi | Cavum veli interpositi (CVI) | cavum veli interpositi (CVI) | کاووم ولی اینترپوزیتی (CVI) |
| foramen of Monro / reference plane | Foramen-Monroi-Ebene | Monro plane | سطح مونرو |
| fornix | Fornix | fornix | فورنیکس |
| CSF-like appearance | liquorähnliche Dichte/Signalcharakteristik | CSF-like attenuation/signal | دانسیته یا سیگنال مشابه CSF |

## Evidence and remaining gates

- The code-native comparison and the first two CSP/CV and CVI MRI frames were visually inspected. They are not figures from PDF p. 2. The remaining CVI frames, exact case/frame match, attribution, and reuse terms still need independent review.
- External anatomy check: Das & Gillespie, *Cavum Septi Pellucidi*, StatPearls (updated 2026), especially the anatomy and differential diagnosis sections: <https://www.ncbi.nlm.nih.gov/books/NBK537048/>. It describes CSP between septal leaflets and frontal horns, posterior continuity with CV, and differentiates CVI by its relation to fornices, internal cerebral veins, and third ventricle.
- External CVI check: De Leucio & Dossani, *Cavum Veli Interpositi*, StatPearls (updated 2022): <https://www.ncbi.nlm.nih.gov/books/NBK559000/>. It supports the tela-choroidea location and triangular configuration; it also cautions that clinical significance is uncertain.
- The touched JSX parsed with the repository's bundled Babel parser; `npm run audit:mcq` passed (619 questions, 18 cases per language), and `git diff --check` passed. `npm run audit:fa` was also run but fails on repository-wide strings; a route-filtered search found no `liquorraeume-ventrikelsystem` findings in its output. This pass has not run browser, responsive, RTL, theme, keyboard, or integrated-build validation.
- Independent reviewer: pending. Do not treat this source audit or passing code checks as medical approval or release readiness.
