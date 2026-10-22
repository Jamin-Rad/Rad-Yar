# Technik.pdf p.127 (printed p.126): Gadolinium classes and NSF risk

## Scope and learning outline

Physical PDF page 127 / printed folio 126 only. Target route: `/technik/kontrastmittel/mrt`; existing sections `gadolinium` and `nsf`. No new route or chapter is introduced.

Proposed existing chapter titles and purpose:

- **Gadolinium und Chelatstruktur** — distinguish chelate geometry from guideline-specific NSF groups, and explain the liver-agent dose and elimination by product.
- **Nephrogene systemische Fibrose** — connect patient renal risk with the specific agent and keep ACR and ESUR classifications distinct.

## Source-page coverage ledger

| PDF point | Implementation | Evidence/status |
| --- | --- | --- |
| Gadolinium is paramagnetic; free Gd³⁺ is toxic and administered chelated | Existing lead retained | Existing lesson wording; not independently re-evaluated on this page |
| Linear/open-chain versus macrocyclic/cage structure and relative stability | Existing comparison retained, narrowed to say that linear geometry does not itself determine NSF group | ACR 2026 table and ESUR 2026 classify agents individually |
| Linear agents and 2018 restrictions | Replaced blanket “many linear agents suspended/restricted” with a dated, explicitly limited statement | ESUR 2026 names the three highest-risk agents; EU suspension/withdrawal applies to specified products, not all linear agents |
| Gadoxetate (Primovist/Eovist) and gadobenate (MultiHance) remain as liver agents | Updated note describes agent-specific status and says the EU guideline describes authorization for hepatobiliary imaging | ESUR 2026 p.24–25; local authorization remains controlling |
| Primovist 0.025 mmol/kg, approximately 50% biliary and 50% renal elimination | Retained only for gadoxetate, specified for normal organ function, with severe renal/hepatic impairment caveat | Spanish AEMPS Primovist product information §§4.2, 5.2; ESUR 2026 p.24 says gadobenate has about 4% biliary elimination |
| Gadobenate versus gadoxetate dose/elimination | Explicitly separated; no dose is generalized across GBCAs | ESUR 2026 p.24–25; exact use/dose remains product-label and protocol dependent |
| NSF is severe fibrosing disease, associated with severe renal impairment and less stable agents | Existing mechanism retained; risk card now includes AKI/dialysis/eGFR<30 and agent-specific risk groups | ACR Manual 2026, NSF chapter and Table 1; ESUR Guidelines 2026 p.23–25 |
| ACR/ESUR agent-specific classes | Added to the source note and one localized MCQ: gadoxetate and gadobenate are ACR Group II despite linear structure; ESUR classifies them as intermediate risk | ACR 2026 pp.82–86 and 88; ESUR 2026 pp.24–25 |
| Dose-dependent T1/T2 effects | Not in scope of changed text; existing section `wirkung` retained | Source page is in scope but no identified gap against this existing section |
| Source-page images/tables | Page visually inspected; no diagnostic figure or table on p.127 | No diagnostic source image is needed; a topic-specific explanatory header schematic is used per page-design standard |

## Assessment integration

Added one item under the existing `km-gadolinium` topic, asking learners to distinguish ACR 2026 and ESUR 2026 classification for gadoxetate/gadobenate. It is translated in DE/EN/FA with equivalent class names and explanation. The generated flashcard inherits the same question, answer, and explanation. Other questions/cards were not changed.

## Visual ledger

| Goal/location | Type and asset | Source/rights | Purpose and translated description | Review status |
| --- | --- | --- | --- | --- |
| Lesson header | Author-created, code-native SVG: `public/educational/gadolinium-chelate.svg` | RadYar-authored conceptual drawing; no external image, patient data, or diagnostic evidence | Contrasts an open-chain ligand with a closed macrocyclic ring around Gd³⁺; alt and caption are localized in DE/EN/FA and say the drawing is not a molecular structure or to scale | SVG source checked; independent image/render review and browser behavior pending |

## Official references checked

- ACR, *Manual on Contrast Media 2026*, NSF chapter/Table 1 (especially pp. 82–86 and p. 88): https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Contrast-Manual/ACR-Manual-on-Contrast-Media.pdf
- ESUR Contrast Media Safety Committee, *Guidelines 2026*, NSF classification and dialysis (pp. 18, 23–25): https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf
- AEMPS/CIMA, Primovist 0.25 mmol/ml product information (adult dose, renal precautions): https://cima.aemps.es/cima/dochtml/ft/66648/FichaTecnica_66648.html
- U.S. DailyMed, MultiHance label, revised 2025 (illustrates jurisdiction/product-specific dose and indications; not used to generalize EU labeling): https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f63abe56-46d9-4e32-afb1-f4e22370717d

The linked existing dialysis section was cross-checked: ESUR 2026 recommends immediate/next-day HD only for patients already receiving HD after linear GBCAs; ACR 2026 recommends scheduling group-II exposure before routine HD when feasible but says not to initiate or alter dialysis solely due to group-II/III GBCA. The p.127 delta does not add or change dialysis instructions.

## Validation and open limits

- Source page text and rendered image reviewed; the page is readable and contains no diagnostic image or table.
- `npm run test:technik-roentgen-sync`, `npm run audit:mcq` (724 questions, all three languages), focused p.127 question/card/language assertions, SVG asset checks, and `git diff --check` passed after the final header schematic delta.
- Independent delta review passed source coverage, teaching structure, visual purpose, DE/EN/FA, and assessment/card consistency. Reviewer inspected `tmp/technik-p127-127.png` and confirmed the page content and agent-specific classification/dose statements. No open authoring finding remains.
- Browser inventory returned no available apps or browsers. `npm run build` was retried after the header delta but remains blocked by unavailable DNS for `fonts.googleapis.com` and an `EPERM` writing `.next/server/app/andarun/finanz/freunde/print`; no successful build/browser rendering is claimed.
- Review-template gates: SRC PASS, EDU PASS, VIS PASS, LNG PASS, ASM PASS, UX BLOCKED (no browser/build), REV PASS for the independent content/visual/translation/assessment delta. Dr. Zia scientific approval and publication remain pending.
- Scientific approval by Dr. Zia and publication remain pending.
- This ledger covers only p.127. p.128 has a separate visual ledger; p.129 remains unaudited. It does not establish complete coverage of the MRI contrast lesson or entire PDF.
