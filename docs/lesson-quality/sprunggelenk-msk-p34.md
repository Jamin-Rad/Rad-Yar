# Sprunggelenk imaging and Weber classification — MSK.pdf p.34

## Scope

- Existing route: `/msk/trauma/sprunggelenk`; curriculum ID: `osg-fraktur`.
- Source: user-supplied `MSK.pdf`, physical p.34 / printed p.33. Text was extracted and the full page rendered and visually inspected. This is a bounded page audit, not route-wide clinical sign-off.
- Related continuation: special fracture patterns on physical p.35 are recorded in [the p.35 ledger](sprunggelenk-msk-p35.md).

## Coverage ledger

| Claim ID | Source point on p.34 | Lesson mapping | Status / limit |
|---|---|---|---|
| ANK-34-01 | MSK.pdf describes two projections: lateral and AP with 15–20° internal rotation (mortise); overlap is reduced and the joint spaces are visible | `imaging`, hero cards, `analysis` | Source wording is explicitly attributed as two projections. The teaching text distinguishes it from the typical three-view AP, mortise and lateral series and links the ACR source. Mortise is identified as a rotated AP projection, not as a neutral AP view. Local protocol may vary. |
| ANK-34-02 | CT described as gold standard for complex trimalleolar fracture assessment or planning with posterior tibial-margin / Volkmann fragment involvement | `ct`, stability table | Covered as a complement for complex patterns and posterior fragments, with articular mapping and incisural involvement; initial radiography remains the foundation. The phrase “gold standard” is not generalized beyond the source’s scoped planning context. |
| ANK-34-03 | Weber A below syndesmosis; B at level; C above; source makes categorical statements about syndesmotic and interosseous-membrane injury | `weber`, `stability` | Fracture-height mapping is retained. Associated injury is qualified in the lesson (“usually,” “may,” “typically”) and the reader is directed to inspect the mortise, syndesmosis and proximal fibula rather than treating Weber type as an individual stability diagnosis. |
| ANK-34-04 | Three-image Weber A/B/C schematic, with English labels Fibula, Tibia and “Ruptured Syndesmosis” | `/sprunggelenk/weber-klassifikation.png` | Visual comparison confirms this asset is the cropped PDF p.34 figure. It remains a source figure under the user’s authorization; the lesson now identifies the source/page and explains in DE/EN/FA that the embedded labels are English and the localized table below gives the meaning. |
| ANK-34-05 | Page contains no patient case or individualized treatment advice | Scope boundary | None inferred. The p.34 figure is a classification illustration, not a patient image. |

## Verification and remaining gates

- `node --import tsx scripts/test-sprunggelenk-p35-render.mjs` checks selected p.34 material, the two-versus-three-view clarification, and p.35 morphology in DE/EN/FA.
- `node --import tsx scripts/test-sprunggelenk-persian-parity.mjs` checks nested Persian copy against English fallback.
- Independent review, browser behavior/RTL layout and Dr. Zia’s clinical sign-off remain separate gates.
- p.35 scope and its independent Persian/source review remain documented in [the p.35 ledger](sprunggelenk-msk-p35.md); this p.34 addendum does not claim all ankle/foot material in MSK.pdf is covered.
