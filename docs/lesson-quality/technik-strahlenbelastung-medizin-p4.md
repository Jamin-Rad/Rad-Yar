# Strahlenexposition der Bevölkerung · Technik.pdf p. 4

## Identity and scope

- Proposed route: `/technik/strahlenbelastung`; curriculum ID `strahlenbelastung-medizin` (route integration belongs to the coordinator).
- Source: user-provided `Technik.pdf`, PDF p. 4 / printed p. 3. Text extraction and a 130 dpi page render were inspected.
- Lesson promise: distinguish population-level exposure accounting from individual examination dose, and group natural versus human-made sources without treating an old average as a current patient-specific comparison.
- Existing relevant lessons reviewed: `/technik/dosimetrie` (dose quantities and limits of output indices) and `/technik/grundlagen#wirkung` (radiobiological effects). This lesson links the idea of population exposure to these but does not duplicate their dose definitions or teach risk thresholds.
- Concise learning path: meaning and limits of annual population means → natural sources → historical German medical-exposure pattern → limits of informal comparisons and self-check.
- Media plan: one custom, non-quantitative code-authored schematic contrasting background sources with a medical scanner; a second in-lesson map lists exposure-source families. Neither graphic encodes dose magnitude or presents patient imaging.

## Source coverage ledger

| ID | Source point | Importance | Disposition |
|---|---|---|---|
| RE-01 | PDF p. 4: mean effective dose per year, with natural and human-made components | Core | Population statistic distinguished from individual dose. The PDF's undated values are explicitly excluded as current reference values. |
| RE-02 | PDF p. 4: cosmic exposure; variation by flight duration, route/latitude and solar activity | Core | Included qualitatively. No flight-dose number or comparison to chest radiography is repeated. |
| RE-03 | PDF p. 4: terrestrial radionuclides including uranium/radon | Core | Included as natural terrestrial sources, with a sourced explanation of inhaled radon and its progeny. |
| RE-04 | PDF p. 4: radionuclides in food, including potassium-40 | Supporting | Included as a source family; no dietary dose estimate or banana comparison. |
| RE-05 | PDF p. 4: medical imaging as major human-made exposure contribution, especially CT | Core | Rephrased only as a historical BfS finding for the assessed German data period 2007–2018. No undated percentages or “number of scans equals dose” inference. |
| RE-06 | PDF p. 4: nuclear power, fallout and technical installations under 1% | Supporting, time-sensitive | Omitted because the PDF provides no reference period and the lesson's source classification goal does not require this current-sensitive percentage. |
| RE-07 | PDF p. 4: flight vs chest x-ray and annual exposure vs skull CT comparisons | Context-sensitive | Omitted as potentially misleading shorthand. The lesson explains why a population average or broad equivalence cannot determine the dose of a specific examination. |

## External context and limitations

- The BfS report *Umweltradioaktivität und Strahlenbelastung: Jahresbericht 2020* evaluates German medical exposure using data for 2007–2018. The summary statement is on PDF p. 9 (printed pp. 10–11), section “Medizinische Anwendung”; the detailed analysis is on PDF pp. 88–89 (printed pp. 89–90), section B IV 1.1. It reports medical applications as the major contribution to human-made population exposure, with the CT-frequency increase driving the trend in mean effective dose. The lesson labels this as historical; it does not assert that the dataset is current in 2026.
- The BfS/BMUV fundamentals report (status December 2021) supports source categories and the variability of natural exposure. ICRP Publication 103 is used for the intended population-protection/comparison role of effective dose, not individual prognosis.
- No dose threshold, legal limit, clinical recommendation, or individual risk estimate is taught. Numeric dose examples and percentages from the undated source page are intentionally excluded.

## Translation and validation

- DE/EN/FA share the same claims and cautions. Core terms: Bevölkerungsmittel / population average / میانگین جمعیت; natürliche Exposition / natural exposure / پرتوگیری طبیعی; medizinische Anwendung ionisierender Strahlung / medical use of ionizing radiation / کاربرد پزشکی پرتو یون‌ساز; effektive Dosis / effective dose / دوز مؤثر.
- `node scripts/test-technik-strahlenbelastung-render.mjs` — PASS (21 localized units; DE/EN/FA static route render and direction; section structure, source references, topic schematic, map and explanatory three-option check).
- Browser interaction, responsive layout and mobile RTL verification — pending.
- Independent review round 1: SRC REVISE, EDU PASS, VIS PASS, LNG PASS (static comparison), ASM REVISE, UX REVISE; browser evidence blocked; REV REVISE pending fixes and re-review. SRC-01 (solar activity omitted despite ledger claiming inclusion), ASM-01 (implausibly absolute distractors) and SRC-02 (missing exact report page references) were identified. Author corrections: solar activity added in DE/EN/FA; distractors now test misuse of a historical population mean and confusion between collective and individual dose; exact BfS report pages/sections recorded above.
- Independent delta review after those corrections: SRC PASS, EDU PASS, VIS PASS, LNG PASS (static semantic comparison), ASM PASS, REV PASS. The reviewer rechecked the PDF and BfS report and reran the SSR audit.
- UX-01 curriculum route integrated at `/technik/strahlenbelastung` and asserted in the SSR test. Browser interaction/responsive/RTL review and specialist scientific signoff remain pending, so overall acceptance is not claimed.
