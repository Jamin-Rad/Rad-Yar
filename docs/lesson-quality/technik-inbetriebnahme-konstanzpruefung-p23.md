# Technik.pdf p.23 — equipment commissioning and quality assurance ledger

Status: bounded author draft; independent legal/technical, language and browser review pending. No publication approval implied.

## Mapping and learning target

- Existing curriculum ID and route: `qualitaetssicherung-vorkommnisse` → `/technik/qualitaetssicherung-vorkommnisse` (same exact ID as the preceding incident/QS lesson; no duplicate registry entry created). Curriculum stays `inProgress: true`.
- Source: user-provided `Technik.pdf`, PDF p.23 (printed p.22), inspected as extracted text and rendered page image.
- Learner outcome: distinguish the legal operating pathway, the initial acceptance test and reference baseline, recurring constancy tests, and the response/documentation required after a quality-affecting change or failed test.
- Outline: (1) authorisation/notification before operation; (2) acceptance and reference values; (3) constancy testing and corrective response; (4) roles and records; embedded update-change self-check.
- Visual plan: code-native four-step flow from legal pathway to acceptance/baseline to recurring comparison to corrective action. It represents process, not diagnostic or measurement evidence.

## Source coverage and disposition

| Key | PDF point | Importance | Lesson location | Disposition / current-source check |
|---|---|---|---|---|
| T23-01 | Device quality must be demonstrated before clinical use | Essential | Intro, device QA flow | Reframed as required application quality under StrlSchG §14(1)(5) and StrlSchV §115; avoids vague precision language. |
| T23-02 | Notification before start, PDF says four weeks | Essential, but outdated | “Before operation” card | Corrected to the current §19(1) StrlSchG: generally at least two weeks before intended start for notification-based, non-licensed operation. The lesson explicitly says some devices/uses require a licence instead, so the two-week statement is not generalized to all equipment. |
| T23-03 | External expert safety inspection and report | Essential pathway context | “Before operation” card | Kept distinct from clinical acceptance/constancy tests. StrlSchG §172 concerns authority-designated, independent experts; §19(3) requires the relevant certificate/report in the notification dossier. Not described as universal in every licensing/operating scenario. |
| T23-04 | Staff roles: SSV, SSB, MPE for CT/interventions | Essential, with qualification | Roles card | SSV responsibility remains explicit. For the notification pathway, documents include evidence that the required number of SSBs are appointed and have required expertise under StrlSchG §19(3) nos. 3–4; this does not transfer the SSV’s responsibility. MPE involvement follows StrlSchV §131: CT and specified low-contrast 3D imaging (except tomosynthesis), and fluoroscopy-guided interventions with substantial exposure; extent depends on procedure types/count and devices. No universal physical presence is implied. |
| T23-05 | Notify Ärztliche Stelle for external QA | Essential context | Roles card | Aligned with StrlSchV §§129–130: SSV ensures prompt notice of start/end of covered activity; medical advisory bodies assess clinical QA including justification and equipment/procedures. Not conflated with device acceptance testing. |
| T23-06 | One-time acceptance test by manufacturer/supplier, establish baseline | Core | Step 2 card | StrlSchV §115 requires quality before commissioning and an acceptance test by the manufacturer/supplier with SSV involvement; reference values for later tests are determined as part of it or equivalent quality measures. Integrated systems also need a system-level check. |
| T23-07 | Reference values kept for later comparison | Core | Step 2–3 flow | Taught as baseline values under §115, not as an independent test or a permanent value unaffected by later changes. |
| T23-08 | Regular constancy checks; PDF says usually monthly | Core, interval is equipment-specific | Step 3 card | Corrected to §116: checks recur regularly at required intervals; applicable rules/equipment determine method and timing, and the authority may set intervals where necessary. No universal monthly cadence is claimed. Checks compare reference values using normally same-type/equivalent test equipment. |
| T23-09 | Two-year retention of constancy results in PDF | Essential, outdated | Record paragraph and warning | Corrected to §117: promptly record content, result and date; retain constancy-test records five years after the test. Acceptance-test records are retained during operation, at least three years after the next complete acceptance test. |
| T23-10 | Response when reference/required quality fails | Essential addition from current law | Step 4 and self-check feedback | §116(4) requires the cause to be identified and eliminated without delay when required quality is no longer met. §115(4) applies after a change that may affect required quality; check can be limited to change and effects. |
| T23-11 | PDF page 24 pregnancy exposure advice and dose bands | Separate high-stakes topic | Excluded from this bounded lesson | Page was text-extracted and visually inspected. Dose bands, gestational timing/risk claims and counseling pathway are not copied; they need a dedicated current clinical/source review before teaching. |

## Authoritative sources checked

Current official German legal text was checked on 2026-10-19:

- [StrlSchG §19](https://www.gesetze-im-internet.de/strlschg/__19.html): operating notification, its two-week lead time for the applicable non-licensed pathway, cases requiring a licence, and required documents including the expert certificate/report.
- [StrlSchG §172](https://www.gesetze-im-internet.de/strlschg/__172.html): competent authority designates independent experts for the specified expert inspections.
- [StrlSchV §§115–117](https://www.gesetze-im-internet.de/strlschv_2018/BJNR203600018.html): pre-commissioning quality, acceptance testing/baseline and integrated system checks; recurring constancy testing and prompt correction; record content, dates and retention.
- [StrlSchV §§129–132](https://www.gesetze-im-internet.de/strlschv_2018/BJNR203600018.html): notification to medical advisory bodies, their QA role, required MPE involvement and duties.

The PDF claims “four weeks”, “usually monthly”, and “two years” are explicitly corrected to the current law where applicable. Specific interval schedules, technical tolerances and modality-specific test protocols are outside the selected pages and are not reproduced.

## Translation, assessment and validation plan

- DE/EN/FA wording keeps role, condition, time interval, modality and records parallel; current legal corrections are translated as content, not hidden in notes.
- Embedded self-check: a software change that may affect CT reconstruction quality; the learner identifies the §115(4) check of the change and its effects and records its outcome. A routine future constancy test or software self-test alone is not treated as a substitute.
- No global MCQ-bank item is claimed or added. The connected lesson ID remains the existing `qualitaetssicherung-vorkommnisse` with `inProgress: true`.
- Pending independent legal/technical, native-language, browser, mobile/RTL, theme, accessibility, and interaction review. Passing a code check is not scientific sign-off.
