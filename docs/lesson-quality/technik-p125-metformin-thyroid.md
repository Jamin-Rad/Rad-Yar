# Technik.pdf p.125 — prophylaxis, metformin, and iodine-related thyroid effects

## Identity and scope

- Physical PDF page 125 / printed folio 124. Text extraction and full-page render were checked.
- Existing routes only: `/technik/kontrastmittel/nierenfunktion`, sections `schutz` and `metformin`; `/technik/kontrastmittel/roentgen`, section `schilddruese`.
- Scope is this one page; p.126 and other contrast topics remain out of scope.
- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Technik.pdf`; temporary evidence: `tmp/technik-p125-extracted.txt` and `tmp/technik-p125-mapped-125.png`.

## Existing section purposes — no new titles or routes

1. **Hydrierung und Nierenschutz** — distinguish preventive hydration from unproven pharmacologic prophylaxis and avoid overstating the evidence against acetylcysteine.
2. **Metformin-Management** — compare ESUR and ACR interruption rules by eGFR, AKI, and arterial exposure; distinguish contrast-related interruption from metformin's own renal-use limits.
3. **Hyperthyreose und jodhaltiges Kontrastmittel** — identify risk groups, explain ESUR/ACR differences, and coordinate planned radioiodine imaging or treatment without a blanket cancer contraindication or fixed drug regimen.

No diagnostic image appears on this page. A route-specific conceptual schematic was added to the renal-function route to satisfy the shared lesson-header rule and clarify the clinically relevant difference between systemic IV delivery and direct arterial renal first-pass delivery. The SVG is original, non-diagnostic artwork; translated alt text, caption and route legends are in the page component. It is not presented as a patient image.

## Source coverage ledger

| PDF claim | Lesson location | Reconciliation status |
|---|---|---|
| No proven drug prophylaxis; acetylcysteine formerly used but “efficacy disproved” | Renal `schutz` | Verify scope: ACR says N-acetylcysteine did not outperform placebo for IA iodine and is not recommended for IV prophylaxis; ESUR says pharmacologic prophylaxis has not shown consistent protection. Avoid saying efficacy is universally “disproved.” |
| Continue metformin at eGFR >30; stop at eGFR <30 or AKI for 48 h; eGFR <30 itself contraindicates metformin | Renal `metformin` | Replace route-blind rule with the ESUR 2025/2026 vs ACR 2026 comparison. ESUR: continue if eGFR >30, no AKI, IV or IA second-pass; stop for AKI, eGFR <30 with IV/second-pass, or any IA first-pass; check eGFR at 48 h and restart if no significant change. ACR: for IV, continue with eGFR ≥30 and no AKI; stop with AKI, eGFR <30, or an arterial catheter procedure that could embolize renal arteries; hold 48 h and restart after reassessment finds renal function normal. eGFR =30 is not assigned by ESUR's strict inequalities; defer to local/product instructions. |
| Iodine may worsen hyperthyroidism or precipitate storm, especially Graves, multinodular goitre, autonomy | Röntgen `schilddruese` | Retain risk groups, distinguish prior history from active disease, and label guideline divergence: ESUR advises against iodine in manifest hyperthyroidism; ACR does not advise restriction/premedication solely for a history but says avoid during acute thyroid storm. |
| Reaction usually no earlier than a week, estimate 100 per 5 million exposures | Röntgen `schilddruese` | ACR calls the complication rare; ESUR calls for risk-based endocrinology follow-up but does not validate this fixed incidence/onset estimate. Recast as rare and potentially delayed; do not present the PDF number as universal incidence. |
| Perchlorate before and for 7–10 days; manifest hyperthyroidism absolute contraindication; emergencies use perchlorate plus thiamazole/carbimazole | Röntgen `schilddruese` | ESUR allows prophylaxis for selected high-risk patients under endocrinologist direction and close follow-up, without prescribing a universal agent/duration; do not infer a fixed regimen or emergency combination. Avoid the categorical “absolute” phrasing across guidelines. |
| Papillary/follicular cancer means contrast is strictly forbidden because iodine blocks later radioiodine | Röntgen `schilddruese` | Correct to coordination: iodinated contrast can interfere with later radioiodine uptake; thyroid cancer alone is not a general contrast contraindication. ACR gives ideal washout intervals of 3–4 weeks in hyperthyroidism and 6 weeks in hypothyroidism; coordinate with nuclear medicine and local policy. |

## Sources consulted

- ESUR Contrast Media Safety Committee, **Guidelines 2025**, official [PDF](https://www.esur.org/wp-content/uploads/2025/12/Guidelines-2025-ESUR-vf-1.pdf), pp. 27–28.
- ESUR Contrast Media Safety Committee, **Guidelines 2026**, official [PDF](https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf), pp. 27–28; compared with 2025, these relevant metformin and thyroid recommendations appear unchanged.
- American College of Radiology, **Manual on Contrast Media 2026**, official [PDF](https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Contrast-Manual/ACR-Manual-on-Contrast-Media.pdf), metformin pp. 48–50; hyperthyroidism pp. 5–7; CA-AKI pharmacologic prophylaxis pp. 43–46.
- U.S. FDA, current GLUMETZA prescribing information (2026), official [label](https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/021748s031lbl.pdf), metformin contraindication below eGFR 30 and product-specific contrast interruption.

## Assessment and review

- Added one metformin guideline-comparison MCQ and one thyroid guideline-comparison MCQ because the source reconciliation requires retrieving distinctions not represented by the prior items; both are localized in DE/EN/FA and use translated item-specific feedback for linked flashcards.
- Independent review: SRC, EDU, LNG, ASM and REV passed. Reviewer finding VIS-125-1 (missing route-specific renal header schematic) was fixed with `public/educational/renal-contrast-pass.svg`; focused delta re-review requested.
- `npm run test:technik-roentgen-sync`, targeted DE/EN/FA lesson and assessment assertions, and `git diff --check` passed. Production build could not complete: external Google Fonts DNS failed (`ENOTFOUND`) and Next.js then reported `EPERM` creating `.next/types/app/...`. No browser app was available, so responsive layout, RTL presentation and live interaction remain unverified.
- Dr. Zia's scientific approval and publication are not established by this AI review.
