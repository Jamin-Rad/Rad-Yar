# Biological radiation effects — Technik.pdf pp. 2–3

## Identity and scope

- Route: `/technik/grundlagen#wirkung`; data: `data/technikGrundlagenLesson.js`, section `wirkung`.
- Curriculum IDs: `biologische-strahlenwirkung` and `stochastische-deterministische-schaeden` now link to the same bounded section and remain `inProgress`.
- Source: user-provided `Technik.pdf`, PDF pp. 2–3; page footers show printed pp. 1–2. Both pages were rendered and visually inspected at 140 dpi. They contain text/list content, not diagnostic images or a plotted dose-response graph.
- Existing match found: this section was already on the broad `/technik/grundlagen` page, but both IDs were unlinked and the section had only two summary rows. The work expands and activates that existing topic; it does not create a duplicate route.
- Page implementation is the existing broad legacy page, not `StandardLessonShell`. This bounded edit does not claim a shell migration or browser acceptance.

## Source coverage ledger

| ID | Source | Point in PDF | Importance | Disposition and lesson location |
|---|---|---|---|---|
| RB-01 | Technik.pdf, PDF p. 2 / printed p. 1 | Direct ionisation of biomolecules and indirect action via water radiolysis/reactive species | Core | Included in first table row and lead. Percent estimates 30/70 omitted: the PDF provides no source, and UNSCEAR Annex F describes proportions in a specific low-LET context rather than a universal constant. |
| RB-02 | Technik.pdf, PDF p. 2 / printed p. 1 | DNA/enzyme injury and chemical bond disruption | Core | Included in DNA-damage row, with base changes and single-/double-strand lesions; no lesion is equated automatically with disease. |
| RB-03 | Technik.pdf, PDF p. 2 / printed p. 1 | Repair may succeed, fail or leave a changed cell; cell death and malignant transformation are listed | Core | Included in cellular-response row, qualified as possible outcomes rather than a deterministic sequence. |
| RB-04 | Technik.pdf, PDF p. 2 / printed p. 1 | Deterministic effects: threshold, greater severity with greater dose above threshold; skin erythema, hair loss, marrow injury; days to weeks | Core | Current term “tissue reaction” and threshold-region concept included, with examples. Fixed onset window omitted because timing varies by tissue, dose distribution, fractionation and endpoint; the PDF supplies no source. No patient-specific dose threshold is taught. |
| RB-05 | Technik.pdf, PDF p. 2 / printed p. 1 | Stochastic effects: chance-related, higher probability with dose, severity not higher in an individual cancer; long latency; cancer/leukaemia examples | Core | Probability/severity distinction and cancer examples included. “Years to decades” is not made a universal patient-specific promise; no attribution or individual risk estimate is implied. |
| RB-06 | Technik.pdf, PDF p. 3 / printed p. 2 | Cataract classification, occupational 20 mSv/year claim, and protective measures (lead glasses, CT gantry tilt, gonad/thyroid/lens shielding) | Important but current-sensitive | Omitted from this bounded biology lesson. These require separate, current clinical/occupational/legal context and are not safely generalized from the PDF. In particular, the cataract discussion itself notes uncertainty; no threshold or protective recommendation is carried over. |
| RB-07 | Technik.pdf, PDF pp. 2–3 / printed pp. 1–2 | Radiosensitivity and tissue examples | Supporting | General dependency on cell type, maturation, tissue function and exposure pattern included; “rapid division” is stated as one factor, not a stand-alone rule or individual prognosis. |
| RB-08 | No plotted curve on source pages | Distinguish the protection model for stochastic probability from tissue-reaction severity | Core visual need | Added a code-native conceptual, two-panel SVG. It is expressly labelled conceptual, has no numerical scale or universal threshold, and is not represented as source data. |

## Teaching path and media

1. Direct/indirect injury → DNA lesions → variable cellular response.
2. Distinguish the modelled occurrence probability of stochastic effects from severity of one case. The conceptual probability panel uses a straight, unscaled line consistent with the proportionality assumption cited for radiation protection.
3. Distinguish tissue reactions, which commonly have effect/tissue-dependent threshold regions and increasing severity above them.
4. Retrieve the distinction in a three-option localized self-check.

The two-panel diagram exists to answer “what changes with dose?” The first panel shows the radiation-protection assumption that stochastic-effect occurrence probability rises with dose; the second shows tissue-reaction severity rising after a conceptual, tissue-dependent threshold region. No PDF image was copied because neither page contains an explanatory figure. The SVG is authored in code; it is not an AI-generated diagnostic image.

## Sources and limits

- UNSCEAR. *2000 Report, Annex F: DNA damage and mutation induced by radiation*. https://www.unscear.org/unscear/uploads/documents/publications/UNSCEAR_2000_Annex-F.pdf — supports direct energy deposition and indirect damage through water radiolysis; it contextualizes the low-LET proportions and does not support treating 30/70 as universal.
- ICRP Publication 118 (2012), *ICRP Statement on Tissue Reactions / Early and Late Effects of Radiation in Normal Tissues and Organs*. https://www.icrp.org/publication.asp?id=ICRP+Publication+118 — uses “tissue reactions” for the older “deterministic effects” and describes endpoint-specific threshold estimates and modifying factors.
- IAEA, *Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards*, GSR Part 3, §§1.3–1.4. https://nucleus.iaea.org/sites/nss-oui/Published%20Collections/m_3761d926-c16f-4477-a63b-741a9db1c16c/m_3761d926-c16f-4477-a63b-741a9db1c16c__50_0.Html — protection-framework definitions of tissue reactions and stochastic effects.

These are authoritative scientific/protection sources, not patient-specific clinical advice and not German legal advice. The lesson intentionally avoids dose limits, cataract thresholds, pregnancy risk bands, individual risk calculations and diagnostic-management guidance. Scientific signoff and real-browser review remain pending.

## Verification

- `node scripts/check-technik-grundlagen-parity.mjs` — PASS for DE/EN/FA translation keys and script separation in the checked lesson datasets.
- `node scripts/test-technik-strahlenbiologie-render.mjs` — PASS actual-route semantic SSR in DE/EN/FA; checks RTL direction, section anchor, localized diagram alt/caption, source labels and three-option self-check rendering.
- `git diff --check` — PASS for this change set; repository may emit unrelated line-ending notices for other ongoing batch files.
- Browser interaction, mobile layout, theme contrast, and scientific specialist approval were not tested here.
