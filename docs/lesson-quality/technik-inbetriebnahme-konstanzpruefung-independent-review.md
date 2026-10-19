# Technik p.23 equipment QA — independent review

Date: 2026-10-19. Reviewer: separate read-only agent. Lesson route `/technik/qualitaetssicherung-vorkommnisse`, existing ID `qualitaetssicherung-vorkommnisse`; source Technik.pdf p.23 / printed p.22.

| Gate | Result | Evidence and limits |
|---|---|---|
| SRC | PASS, bounded | Actual PDF page/image and official StrlSchG §§19,70,172 and StrlSchV §§115–117,129–132 were checked against route and ledger. Notice period is scoped to notification-based/non-licensed status; constancy/retention, acceptance, change controls and MPE role are bounded. |
| EDU | PASS | Commission/change → acceptance → constancy testing → cause correction. §116(4) visual/card state that the cause must be identified and eliminated without delay. |
| VIS | PASS, static | Four-step HTML/CSS visual and responsive layout inspected statically; no browser appearance claim. |
| LNG | PASS after retest | Independent review required a concise SSB appointment/qualification statement while preserving SSV responsibility, and stronger `identify AND eliminate without delay` wording. All languages now align. |
| ASM | PASS, bounded | Embedded change-trigger self-check matches the selected §§115(4)/117 duties. No global MCQ item is claimed. Exact existing curriculum ID/route remains linked and `inProgress`. |
| UX | BLOCKED | No live browser, RTL, theme, focus, persistence or interaction review. |
| REV | PASS, bounded | Initial independent review and separate read-only retest closed the p.23 findings. No legal specialist or scientific release signoff. |

## Findings and retest

- **T23-SRC-01 (minor): CLOSED.** The roles card now teaches the evidence path for appointing the required number of qualified SSBs under §19(3) nos. 3–4 and retains SSV responsibility. Independent retest checked each language against the current official Act.
- **T23-LNG-01 (minor): CLOSED.** Route card and visual require immediate identification **and elimination** of the cause in DE/EN/FA, checked against §116(4).
- **T23-SRC-02 (minor): CLOSED.** The earlier p.21–22 ledger is explicitly historical, cross-links this p.23 ledger, and no longer says p.23 is excluded or MPE is wholly absent from the current expanded route. The validated p.21–22 content was not revised.

Independent checks passed `check-technik-inbetriebnahme-konstanzpruefung.mjs`, `check-technik-qualitaetssicherung-vorkommnisse.mjs` (111 aligned units), JSX parse and scoped whitespace checks. Browser, full build, and specialist/legal approval remain unverified.
