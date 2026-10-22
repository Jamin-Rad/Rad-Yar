# Spin echo, TR/TE and TSE — Technik.pdf pp. 95–99

## Source and route audit

Source: user-provided `C:\Users\Drham\OneDrive\Desktop\Lerncore\Technik.pdf` (134 pages). Pages 95–99 were text-extracted and visually inspected; printed page numbers are 94–98. A previous workspace copy differs in pagination/content and was not used.

The existing `/technik/grundlagen#mrt` section covered T1/T2, SE-vs-GRE in one brief row, and the qualitative relation between TR, phase-encoding steps and acquisition time. It did not teach the SE pulse sequence, the source's TR/TE matrix, T1/T2 signal behavior, the TSE family, or PD imaging. A focused block now fills those gaps without duplicating the general signal-formation block.

## Page map

| PDF page (printed) | Source content | Lesson disposition |
|---|---|---|
| 95 (94) | 90° excitation, TE/2 dephasing, 180° refocusing, echo at TE; SE advantages and limits | Pulse sequence, partial refocusing, qualitative robustness and one-echo-per-TR motion/time trade-off are explained; the source’s “true T2” phrasing is qualified as reduced T2* influence, not immunity to all susceptibility/motion. |
| 96 (95) | Qualitative TR/TE matrix; T1-weighted behavior | Included with relative short/long settings, no fixed millisecond cutoffs. |
| 97 (96) | T2-weighted behavior; simplified gadolinium effects; TSE echo train | T2/fluid relation and sequence/concentration-dependent contrast are summarized; no diagnostic rule inferred from the simplified PDF statements. TSE principle included. |
| 98 (97) | TSE trade-offs; BLADE/Propeller; HASTE | ETL trade-offs, half-Fourier HASTE (sub-second timing treated as a source example) and BLADE central-k-space resampling for retrospective motion correction included concisely. |
| 99 (98) | Proton-density weighting, relative TR/TE, signal examples and MSK use | PD relative settings and MSK context included; no fixed sequence prescription. |

## Assessment and review status

The new block uses a code-native SE timing/TR/TE figure with DE/EN/FA labels, one MCQ on the PD setting pattern, and four retrieval cards including active HASTE retrieval. The source-dense accelerated-SE row is split into separate TSE, HASTE, BLADE and PD rows. DE/EN/FA content is linked to curriculum ID `mrt-spin-echo`, the existing `/technik/grundlagen#mrt` route and central quiz/flashcards.

### Verification update — 2026-10-22

- `node --import tsx scripts/test-technik-mri-artifacts-render.mjs` — PASS; covers localized SSR, curriculum links, question and card retrieval for the MRI block.
- `node --import tsx scripts/test-technik-mri-basics-render.mjs` — PASS; localized MRI fundamentals and shared rendering.
- `npm run audit:mcq` — PASS; 713 questions and 18 cases per language, with valid answer keys and option explanations.
- Independent source/education/assessment review — PASS. The reviewer confirmed the page 95 susceptibility qualification, the bounded HASTE statement and qualitative PD settings. No blocking content finding remained.
- VIS and LNG browser-render gates — BLOCKED: the timing diagram’s rendered appearance and Persian RTL behavior have not been verified in a browser.
- UX — BLOCKED: no browser evidence for responsive layout, theme, interaction or accessibility states.
- Specialist clinical sign-off by Dr. Zia and release approval remain pending. This is bounded source coverage, not a full protocol review or publication clearance.
