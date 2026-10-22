# Technik.pdf p.122 — elimination and extravasation

## Identity and bounded scope

- Physical page 122 / printed folio 121. Both the extracted text (`tmp/technik-p122-extracted.txt`) and full-page render (`tmp/technik-p122-source.png`) were inspected; reading order and headings are clear.
- Existing route only: `/technik/kontrastmittel/roentgen`, section `applikation` for elimination and environmental pathway, section `paravasat` for extravasation management.
- No diagnostic image appears on this PDF page. No new clinical image is indicated. The shared route-specific attenuation schematic remains unrelated and unchanged.
- No new chapter title or route is planned.

## Existing section purposes

1. **Kontrastmittel-Applikation und -Ausscheidung** — explain the usual elimination pathway and why pharmacokinetic estimates vary by agent and renal function; qualify the source’s environmental claim.
2. **Paravasat-Management** — make the response actionable: stop and assess, choose local-protocol cannula handling, perform serial neurovascular/skin checks, recognize red flags, escalate and document.

## Source coverage ledger

| Source point | Existing lesson location | Reconciliation |
|---|---|---|
| About 90% renal elimination; half-life 1–3 h; 50% by 2 h, 75% by 4 h, near-complete by 24 h | `applikation` / renal-elimination card | ACR 2026 describes most low-osmolality iodinated agents as having ~2 h half-life and ~20 h elimination in normal renal function. Qualify as approximate typical kinetics; do not teach PDF percentages as universal or imply a fixed repeat-dose interval. Impaired renal function can prolong clearance. |
| Minor extra-renal elimination through liver/bile, bowel and salivary glands | `applikation` / extra-renal card | Keep as a lesser, agent-dependent pathway; avoid implying the same fraction for every product. FDA product labeling notes biliary/gut elimination can increase in severe renal impairment for some iodinated agents. |
| Iodinated and gadolinium agents enter wastewater; measurable in drinking water; no effective countermeasures | `applikation` / environmental note | ESUR 2026 describes low measured gadolinium levels in surface/tap water and says risks are not yet known. Keep the wastewater pathway, qualify environmental levels/risks and treatment by agent; do not claim no effective countermeasures across agents without evidence. |
| Stop injection, retain access, attempt aspiration before cannula removal | `paravasat` / immediate steps | Source-level conflict: ACR 2026 advises against routine aspiration of the affected limb; ESUR 2026 says stop injection, consult responsible physician, mark/classify, but gives no cannula-aspiration directive. Older ESUR evidence review suggested aspiration through an in-situ cannula. Avoid a universal instruction: describe immediate stop/clinical assessment and defer any cannula aspiration/removal sequence to the current local protocol; explicitly do not recommend routine tissue/limb aspiration. |
| Elevate limb; cold compress 20 minutes repeatedly; mark extent | `paravasat` / immediate steps | ACR 2026 recommends elevation above heart and initially cold compress/ice packs; ESUR 2026 recommends elevation and ice packs for mild cases. Preserve elevation, cold initially and marking; remove universal 20-minute timing because current guidance does not establish it. |
| Check capillary refill/distal pulses, sensory/motor function, tension/edema, discoloration, blisters/necrosis | `paravasat` / serial checks | Retain and expand to ACR exam elements: tenderness, swelling, erythema, paresthesia, active/passive finger motion and perfusion. ESUR 2026 advises 2–4-hour monitoring for mild cases; add reassessment cadence while observed and urgent assessment for moderate/severe signs. |
| Counsel patient: expected swelling/redness/warmth; ED for worsening, blisters, numbness, discoloration, severe pain | `paravasat` / patient information | Keep and add reduced range of motion, impaired perfusion/capillary refill, progressive tight swelling, ulceration/necrosis as red flags. ACR requires clear instructions because severe injury may appear hours later. |
| Record volume, agent type, findings and measures | `paravasat` / documentation | Keep and specify contemporaneous clinical/radiology documentation and local incident reporting; include marked extent, neurovascular findings, advice/follow-up. |
| Surgical consultation for severe injury | `paravasat` / escalation | ACR: refer for clinical concern/red flags, not volume alone. ESUR additionally recommends surgical opinion for extravasate >150 mL. Present the guideline difference and defer local escalation pathway; do not use volume as the sole ACR trigger. |

## Sources consulted

- ACR Committee on Drugs and Contrast Media, **ACR Manual on Contrast Media 2026**, official [manual PDF](https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Contrast-Manual/ACR-Manual-on-Contrast-Media.pdf): extravasation printed pp. 17–22 (especially pp. 18–20); repeat-dose pharmacokinetics and renal status printed p. 39.
- ESUR Contrast Media Safety Committee, **Guidelines 2026**, official [manual PDF](https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf): extravasation printed pp. 19–20; environmental gadolinium note printed p. 30.
- ESUR CMSC, **Intravenous contrast medium extravasation: systematic review and updated guidelines**, *European Radiology* 2022, official-source DOI record [doi:10.1007/s00330-021-08433-4](https://doi.org/10.1007/s00330-021-08433-4): older recommendation for aspiration through cannula in situ; treated as historical evidence and explicitly distinguished from the 2026 ESUR summary and ACR 2026 recommendation.
- GE Healthcare, **OMNIPAQUE prescribing information**, official [FDA label](https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/018956s113%2C020608s045lbl.pdf): example product-specific renal elimination and delayed clearance in severe renal impairment; not generalized as an exact class-wide rate.

## Learning interaction and verification

- Added one in-section self-check on progressive pain/swelling and restricted movement with immediate feedback. No formal MCQ/flashcard was added because the existing topic registry has no extravasation topic and putting this safety content under “types and properties” would misclassify it.
- Focused `npm run test:technik-roentgen-sync`, custom DE/EN/FA lesson/self-check assertions, `npm run audit:mcq` (723 questions and 18 cases per language), and `git diff --check` pass. The repository-wide Persian-script audit exits 1 with its existing 142 “No Persian script” findings; changed Persian strings are localized, and this global audit does not establish a p122-specific defect.
- Production build attempted; blocked by `fonts.googleapis.com` DNS (`ENOTFOUND`) and then Next.js `EPERM` creating `.next/server/app/api/andarun/login`. No browser app was available, so rendered layout, interactions, responsive behavior and RTL remain unverified.
- Independent review initially found one terminology issue: the wording needed to distinguish ACR's advice against routine aspiration of the affected limb from an attempted aspiration of extravasated contrast through an existing cannula. This was clarified consistently in DE/EN/FA, including the limited yield, local-protocol status, and prohibition on additional puncture/tissue aspiration. Focused delta review returned no findings; source accuracy and language parity passed. The broader review still records browser UX as blocked because no browser was available. Dr. Zia's scientific approval and publication are not established.
