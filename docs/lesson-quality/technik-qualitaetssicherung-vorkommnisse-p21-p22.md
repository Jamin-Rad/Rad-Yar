# Qualitätssicherung & Vorkommnisse — source and QA ledger

Status: bounded author draft; independent clinical/legal, translation and browser review pending. No publication approval implied.

## Topic and scope

- Existing curriculum ID: `qualitaetssicherung-vorkommnisse`.
- Authored route: `/technik/qualitaetssicherung-vorkommnisse`.
- Source: user-provided `Technik.pdf`; PDF pages 21–22 (printed pages 20–21), inspected as text and rendered images.
- Scope selected from those pages: diagnostic reference levels (DRW), selected significant-event criteria for CT, non-interventional fluoroscopy, and diagnostic/therapeutic interventions, and the response/documentation pathway.
- PDF pages 23–24 were also inspected. Device commissioning/acceptance/constancy tests and unrecognised pregnancy exposure are excluded from this bounded lesson; their detailed claims need separate current-source review.

## Source coverage

| Source | Point | Disposition |
| --- | --- | --- |
| Technik.pdf p.21 / printed p.20 | DRW as the 75th percentile for standard examinations; use for QA/optimisation; not patient dose limits | The route teaches that BfS DRW for X-ray examinations use the 75th percentile of nationally collected dose-relevant values and are not individual dose limits. It retains justification and optimisation as separate duties. Verified against BfS methodology reporting and current statutory definitions. |
| Technik.pdf p.21 / printed p.20 | DFP for projection radiography/fluoroscopy; CTDIvol and DLP for CT | DFP/CTDIvol appear only where needed for selected legal criteria. DLP is not taught in this route; detailed modality dose quantities are deferred to the separate dose-quantities lesson. No numerical DRW table is reproduced. |
| Technik.pdf p.21 / printed p.20 | Medizinphysik-Expert*innen (MPE): qualification, responsibilities and physical presence | Not taught in this bounded incident-reporting lesson. The PDF distinguishes required employment from continuous physical presence; MPE qualification/assignment requirements belong in a separate current-source lesson and must not be inferred from this route. |
| Technik.pdf p.22 / printed p.21 | Incident and significant-incident definitions | Taught as distinct: event/unintended-exposure concept vs legally significant criteria. |
| Technik.pdf p.22 / printed p.21 | Group approach: individual DRW exceedance and mean of last 20 examinations | Corrected to current Annex 14 I wording and scope: applies to examinations without intervention, excluding conventional projection radiography and dental CBCT. The 20-exam mean must exceed the DRW by more than 100%; this applies once a single examination has exceeded the DRW by 200%. The law's wording is retained without translating it into a derived multiplier. |
| Technik.pdf p.22 / printed p.21 | Individual CT and non-interventional fluoroscopy values | CT brain CTDIvol >120 mGy; other body CT >80 mGy; non-interventional fluoroscopy total DAP >20,000 cGy·cm², checked against current Annex 14 I.2.a. |
| Technik.pdf p.22 / printed p.21 | A justified high-dose CT, including a planned protocol above a numerical threshold, is not automatically an incident | Restored narrowly and checked against the Ärztliche Stelle der Bayerischen Landesärztekammer (BLÄK), 04/2025, p.2, and BfS/Winter et al. (2025): under §1(22), an incident requires unintended exposure. Annex 14 thresholds assess significance; they do not by themselves turn a planned, justified exposure performed as specified into an incident. Such protocol and justification should be documented, and the patient informed if deterministic harm is possible. This does not exempt an unintended protocol/setup deviation that crosses a criterion; assess/report as applicable. |
| Technik.pdf p.22 / printed p.21 | Diagnostic and therapeutic intervention criteria | Diagnostic intervention DAP >20,000 cGy·cm² is presented separately under Annex 14 II.2.a. Therapeutic intervention retains the separate criterion: DAP >50,000 cGy·cm² plus acute or within-21-day grade ≥2 deterministic skin injury under II.3.a. |
| Technik.pdf p.22 / printed p.21 | Internal recording, reportable and non-reportable categories | Recast to avoid implying events below report thresholds can be ignored. Current §109 requires systematic investigation, recording and 30-year retention. Conventional projection radiography is only described as excluded from the cited Annex 14 I category; no blanket “not reportable” claim is made. |
| Technik.pdf p.23 / printed p.22 | Device commissioning, acceptance and constancy testing | Inspected and excluded from this lesson. |
| Technik.pdf p.24 / printed p.23 | Unrecognised pregnancy and fetal dose counselling | Inspected and excluded; no dose-risk thresholds or counselling guidance were copied. |

## Current legal verification

- Primary source: [Strahlenschutzverordnung (official consolidated text)](https://www.gesetze-im-internet.de/strlschv_2018/BJNR203600018.html), §108–109 and Annex 14 I–II.
- Regulatory interpretation: [Ärztliche Stelle der Bayerischen Landesärztekammer (BLÄK), Erkennung von Vorkommnissen (04/2025)](https://api.blaek.de/media/pages/medien/ysly2oxelf1524808553jebrme7ozz920/d8d4d64a3f-1748929601/2_erkennung-von-vorkommnissen_4.2025.pdf), p. 2. It states that the criteria apply to unintended overexposure as defined in §1(22); a consciously justified, planned high-dose protocol (example: CT brain perfusion) performed as planned is not reportable solely for crossing the numerical criterion. It recommends documenting this in the SOP and informing the patient if deterministic harm is possible.
- BfS analysis: Winter KS, Schweden M, Brix G, et al. [Significant incidents during X-ray exposures in humans—assessment and findings of the Federal Office for Radiation Protection](https://pubmed.ncbi.nlm.nih.gov/39260390/). Rofo. 2025;197:154–162. DOI: 10.1055/a-2339-3684. Used as supporting context for distinguishing unintended events and threshold-based significance assessment; the ordinance remains the legal authority.
- BfS methodology source: Schegerer et al., *Diagnostic Reference Levels for Diagnostic and Interventional X-Ray Procedures in Germany: Update and Handling* (Rofo. 2019;191:739–751; [PubMed](https://pubmed.ncbi.nlm.nih.gov/30665250/)). It reports how nationally collected dose-relevant values and percentiles inform German DRWs.
- §108: significant events are reported to the competent authority without delay with all available information needed for assessment; causes, effects and measures are included where possible. Reporting starts in parallel with §109 investigation/recording. Required supplements follow investigation completion; a complete summary is due within six months unless the authority agrees to a later submission.
- §109: all events' causes/effects are investigated and recorded; records are retained for 30 years.
- Annex 14 I covers examinations without interventions, excluding conventional projection radiography and dental CBCT. Its I.1 group criterion is conditional: the mean of the last 20 consecutive same-type examinations on the same device exceeds the DRL by more than 100%, once the DRL for a single examination has been exceeded by 200%. The route mirrors this wording without an unsupported hard `>3×` gloss.
- Annex 14 I.2.a: CT brain CTDIvol >120 mGy; other CT body CTDIvol >80 mGy; non-interventional fluoroscopy total DAP >20,000 cGy·cm². Annex 14 II.2.a separately lists DAP >20,000 cGy·cm² for diagnostic intervention; II.3.a gives the therapeutic-intervention threshold plus skin-injury condition.
- Operational distinction before applying any threshold: §1(22) requires an unintended exposure/event. A planned, justified high-dose examination correctly performed as specified is not automatically an incident solely because it exceeds the Annex 14 threshold (BLÄK example: planned CT brain perfusion); document the protocol/justification and inform the patient if deterministic harm is possible. If an unintended protocol/setup deviation causes the exceedance, the threshold is relevant to significance assessment and the event must be handled under the applicable reporting/investigation duties.
- Scope caution: the lesson presents selected criteria, not a complete legal checklist. Local reporting procedures and the current official law govern case handling.

## Learning design and media

- Path: distinguish DRL from a dose limit → determine whether the event meets a current criterion → if significant, notify without delay using available information **while** investigation and recording proceed → supplement after investigation and provide the complete summary within six months.
- Visual: code-native four-step workflow in the lesson plus topic-specific SVG hero. Neither purports to depict diagnostic evidence.
- Embedded self-check: an unintended selection of a high-dose/perfusion protocol instead of the intended standard head CT protocol results in CTDIvol 125 mGy. The correct response recognises both the unintended deviation and the individual threshold, then selects notification alongside investigation/recording. Feedback contrasts this with a planned, justified protocol performed as specified. It is embedded in the lesson only; no global MCQ-bank item or quiz link is claimed.

## Translation and validation

- DE/EN/FA units preserve exact thresholds, conjunctions, modality, and timing; assessment feedback explains the decision.
- Curriculum ID `qualitaetssicherung-vorkommnisse` links to `/technik/qualitaetssicherung-vorkommnisse` and remains `inProgress: true`. The embedded self-check is connected through the lesson route; no global MCQ link is defined because no global MCQ was added.
- Pending: independent clinical/legal and native-language review; browser verification in DE/EN/FA, RTL, mobile, themes, and interaction.
