# Contrast curriculum rebuilt from Technik.pdf

Source: downloaded Technik.pdf, 134 pages, SHA-256 `b1d8e91484340145e66bdeec0d53550e8a8b634dc5f607ddb11cabe7a5ddd333`. All page numbers here are **physical PDF pages**; printed page numbers are one lower. Read the full text and rendered pages 120–134. Page 129 is blank. Pages 132–133 contain general sonographic physics; this rebuild covers the contrast subsection beginning on 133, not the unrelated ultrasound physics lesson.

The user's follow-up explicitly requested a fresh lesson based on the PDF. This supersedes the original presentation-only/no-content-change scope **for the contrast topic**. CAA and unrelated lessons retain their existing content and presentation behavior.

## Coverage and corrections

| Source page | Teaching content | Shared curriculum destination | Source qualification |
|---|---|---|---|
| 120 | negative/positive; water/air/CO₂; soluble triiodobenzene; ionic/nonionic; barium/oils | roentgen/arten | Charge, osmolarity and authorised route are distinct. |
| 121 | concentration, all four volume examples, weight, renal risk, access and flow | roentgen/applikation | All numbers are examples; catheter manufacturer limits control power injection. Added an illustrative iodine-delivery explorer, not a clinical dosing calculator. |
| 122 | elimination, minor routes, wastewater; extravasation examination, care, escalation, documentation | roentgen/applikation + paravasat | ACR approximate clearance replaces a universal 90% claim. Routine aspiration is not an ACR requirement. Escalation is clinical, not volume-only. |
| 123 | physiologic versus hypersensitivity, severity, prior reaction, substitution, study figures, iodine allergy | roentgen/reaktionen | IgE mechanisms also occur. Keep ACR and Ring–Messmer scales distinct. Source cohort figures are not individual risk estimates. ACR/AAAAI 2025 severity-specific prevention. |
| 124 | CA/PC-AKI, creatinine definition; 30/45 thresholds, first/second pass, repeated exposure; hydration and dialysis | nierenfunktion/definition, jodrisiko, schutz, dialyse | Association is not causation; preserve ICU/first-pass threshold. Hydration is individual. Explicit ESUR versus ACR dialysis comparison. |
| 125 | no drug prophylaxis, metformin, hyperthyroidism/autonomy, perchlorate, emergencies, radioiodine | nierenfunktion/metformin + roentgen/schilddruese | Include AKI and IA first pass. State exact eGFR 30 boundary difference. No automatic perchlorate or lifelong cancer ban. |
| 126 | oral/rectal barium, stool, double contrast, gas/distension, leaks, aspiration, stasis, soluble agents | roentgen/gastrointestinal | Methylcellulose is not gas. Correct erroneous hypo-osmolar water-extraction explanation. Hyperosmolar diatrizoate aspiration risk separated from barium risks. |
| 127 | Gd chelation, linear/macrocyclic, EMA, T1/T2 effects, NSF, gadoxetate dose/excretion | mrt/gadolinium, wirkung, nsf, leber | EMA review 2017. ACR group II includes gadoxetate/gadobenate. T2 effects depend on concentration/sequence, not a fixed high-dose threshold. |
| 128 | renal testing, retention, anatomy, three-panel MRI figure rID40640; liver uptake table/indications | mrt/nsf, retention, leber | Full original triptych, arrows and sequence labels preserved via PDFium page crop at scale 4, page-coordinate crop (66.75,163.75)–(507.5,337.5) pt. No synthetic medical images. Correct dentate anatomy and absolute hepatocyte-agent claim. Retention is not proof of clinical injury. |
| 129 | blank | none | No teaching content to omit. |
| 130 | Buscopan action, alternative, contraindications, vision/driving | mrt/buscopan | Product-specific narrow-angle glaucoma, urinary retention and additional label contraindications. No fixed 1–2 h driving clearance. |
| 131 | necessity, placental transfer, fetal thyroid/TSH, amniotic recirculation; lactation amounts/choice | schwangerschaft/* | Named ESUR first-week versus ACR routine screening distinction; uncertainty not asserted as proven teratogenicity. No routine iodine/Gd breastfeeding interruption. |
| 133–134 | gas/shell/size, nonlinear signal, blood pool, elimination; liver/renal/breast/cardiac uses, safety | ultraschall/content, anwendungen, sicherheit | Tissue not completely harmonic-free. Distinguish clinical uses from EU authorisation. Current SonoVue IV contraindications, caution settings, 30-minute supervision and pregnancy/lactation label. |

Primary references are linked in `CONTRAST_SOURCES` in the shared data file: ESUR 2026, ACR Manual (NSF update 2025), ACR/AAAAI consensus 2025, EMA gadolinium referral and SonoVue product information, Buscopan SmPC. Rechecked 29 October 2026. These clinical qualifications are visible in the teaching prose, not silently changed source quotations.

## One source, two views

`data/contrastLessons.js` supplies all five routes in DE/EN/FA. `ContrastGroupPage` renders the same mounted React tree in Classic and the reusable `BookView` engine. Semantic topics determine slides; oversized topics scroll intact. Existing 29-question-per-language bank and flashcards are unchanged. Only reviewed mappings supply checkpoints (1–3 questions), each isolated in presentation. Classic questions can be expanded, and answer state survives view changes.

Stable four-group section hashes, read IDs and presentation keys remain. Ultrasound retains its `ref-kontrastmittel-ultraschall` presentation/section key and `content` anchor, migrates `take-home` to `takehome`, drops obsolete `self-check` completion rather than claiming new safety/application chapters were read. Lesson-level saved read state remains governed by the existing hook.

## Design reference decisions

Accepted reference: imagegen concept `exec-ad432182-84e1-4231-b661-042fc2e16002.png` (29 October).

- White editorial article, plum primary presentation action, teal teaching accents.
- Compact title/source/actions rather than the previous empty hero.
- Narrow desktop contents rail; collapsible full-width contents below 1000px.
- Purposeful comparisons, responsive tables, iodine interaction and existing question feedback.
- Intentional differences: existing global brand navbar retained; no invented attenuation coefficients from concept art; established generic immersive presentation frame retained; source MRI figure used unchanged.
