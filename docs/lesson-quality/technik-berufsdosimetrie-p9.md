# Personendosimetrie im Beruf · Technik.pdf p. 9

## Identity and scope

- Proposed route: `/technik/berufsdosimetrie`; lesson id `berufsdosimetrie` (curriculum integration belongs to the coordinator).
- Source: user-provided `Technik.pdf`, PDF p. 9 / printed p. 8. Text extraction and a 130 dpi page render were inspected.
- This is a bounded occupational-monitoring topic adjoining, but distinct from, the patient dose-quantity lesson `/technik/dosimetrie`. The learning promise is to distinguish a personal dosimeter's monitoring role, common detector/readout principles, the current German official monitoring interval, and the BfS register identifier.
- Teaching path: what the badge monitors and representative wear location → how passive and electronic device roles differ → how evaluation and person-linked records fit together → retrieve what a live electronic display can and cannot establish.
- Visual plan: one code-authored, topic-specific hero schematic (badge → reading station → person-linked record) and one code-native three-step workflow map in the lesson. Neither shows dose values or patient imaging; the flow answers how exposure records are connected to a monitored person.

## Source coverage ledger

| ID | Source point | Importance | Disposition |
|---|---|---|---|
| PD-01 | PDF p. 9: dosimeter measures ionizing radiation worn at the body | Core | Reframed as monitoring occupational personal exposure, not patient dose or imaging. Legal placement qualifier is grounded in StrlSchV §66(2). |
| PD-02 | PDF p. 9: monthly monitoring | Core | Included with current German legal context: StrlSchV §66(3) requires submission after one month for the standard official service route; a competent authority can permit intervals up to three months when exposure conditions allow. |
| PD-03 | PDF p. 9: TL-DOS / thermoluminescence, heat readout | Core | Principle included in plain language. “Current standard”, LiF composition, model-specific measuring ranges and reuse claims are omitted as product-/date-dependent and not needed for the objective. |
| PD-04 | PDF p. 9: OSL / optical readout and detector material/range/reuse details | Core subset | Optical stimulation/readout principle included. Specific BeO/Al2O3 materials, ranges and reuse claims omitted as model-specific and unverified for current local equipment. |
| PD-05 | PDF p. 9: film darkening, range, single use and end-2022 transition | Historical context | Film darkening is identified as the film principle and the PDF's older listed type. The source's end-2022 transition statement is not generalized to current services; model range and no-reuse claim omitted. |
| PD-06 | PDF p. 9: electronic dosimeter for pregnant people/visitors with weekly evaluation | Time-/context-sensitive | Not repeated as a general audience assignment or weekly legal rule. The lesson distinguishes a direct-reading operational display from official dose determination and cites current German legal qualification/authorization requirements. |
| PD-07 | PDF p. 9: SSR number personal, BfS-issued, not newly acquired at workplace change | Core subset | Current StrlSchG §170 supports a BfS-assigned personal identifier for persons whose records are entered. The lesson explains its record-linking role and avoids a blanket “lifetime/no reapplication” claim not needed for the learning goal. |

## Current authoritative context

- Germany's StrlSchV §66(2) specifies wearing at a representative body location, generally the front of the torso; §66(3) specifies the one-month return interval for the standard measurement service and allows a competent-authority extension up to three months when conditions permit. §66(1) also allows an alternative procedure subject to measurement-service consent and competent-authority permission. The lesson names this jurisdiction and does not generalize it abroad.
- StrlSchG §170 describes the register's purpose and states that the BfS assigns a personal identifier for each person whose records are entered. The lesson does not present the identifier as a measurement or dose.
- The current BfS 2024 register report is listed as a supporting source for the role/name of the SSR number; no population statistics from it are included.

## Translation, assessment and validation

- Shared terminology: Personendosimeter / personal dosimeter / دوزیمتر فردی; berufliche Exposition / occupational exposure / پرتوگیری شغلی; passive Auslesung / passive readout / خوانش غیرفعال; Strahlenschutzregisternummer (SSR-Nummer) / Radiation Protection Register identifier / شناسهٔ ثبت حفاظت پرتویی.
- All three localized versions keep the same distinction between live display, authorized official determination and personal registry identifier.
- `node scripts/test-technik-berufsdosimetrie-render.mjs` — PASS (20 localized units; DE/EN/FA static render and RTL; 3 chapters, explanatory assessment, official source links, localized hero and workflow).
- Browser interaction, responsive layout and mobile RTL — pending.
- Independent review round 1: SRC REVISE, EDU PASS, VIS PASS, LNG PASS (static semantic comparison), ASM REVISE, UX REVISE, with browser evidence blocked; REV REVISE pending re-review. PD-SRC-01 identified that §66's physical return interval applies to the designated-service path while an authorized alternative submits readings; PD-ASM-01 found the third answer implausible. Author corrections: both §66 routes are distinguished, the on-request availability provision in §66(5) is included, and the third distractor now tests confusion between person-level register linkage and official measurement authorization.
- Independent delta review: SRC, EDU, VIS, LNG (static), ASM and REV PASS for the corrected claims and assessment. The reviewer rechecked both legal paths and §66(5), compared translations and reran the focused SSR test.
- Browser interaction/responsive/mobile RTL, curriculum route integration and specialist scientific signoff remain pending; overall acceptance is not claimed.
