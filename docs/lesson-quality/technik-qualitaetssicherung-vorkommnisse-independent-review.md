# Quality assurance and significant incidents — independent review

Date: 2026-10-19. Lesson `/technik/qualitaetssicherung-vorkommnisse`, exact curriculum ID `qualitaetssicherung-vorkommnisse`; Technik.pdf pp.21–22 / printed pp.20–21. Reviewer was a separate read-only agent, not the author.

## Final gate status

| Gate | Result | Evidence and limits |
|---|---|---|
| SRC | PASS, bounded | Actual PDF pages and current official StrlSchV §§1(22),108–109, Annex 14 I–II inspected; BLÄK 04/2025 attribution verified against PDF; BfS/DRW methodology references checked. Unintended-event prerequisite is distinct from significance thresholds. Selected legal criteria only. |
| EDU | PASS | §108 notification with available information is shown in parallel with §109 investigation/recording; supplements and complete summary follow. A planned, justified, correctly executed high-dose examination is not treated as an event solely by its number. The 125 mGy scenario explicitly gives an unintended protocol deviation. |
| VIS | PASS, static | Code-native workflow and SVG inspected; parallel branches and translated labels align. Browser rendering is unverified. |
| LNG | PASS, static | DE/EN/FA wording, thresholds, timing, aria labels and feedback checked. Focused checker passed 74 aligned language units. |
| ASM | PASS, bounded | Embedded self-check and feedback align in all languages. It remains local to lesson; no global MCQ link is claimed. Exact curriculum route is linked, `inProgress: true`. |
| UX | BLOCKED | No browser evidence for RTL/rendering, mobile, themes, keyboard, auth/persistence or interaction. |
| REV | PASS, bounded | Independent findings repaired and independently retested; no specialist or legal counsel signoff. |

## Findings and retests

- **TECH-QA-EDU-01 (major): CLOSED.** Visual and semantic sequence changed to recognize → assess → parallel immediate notification (if significant) and investigate/record every event → supplement after investigation. Independent reviewer checked visual order, text, aria labels, question/feedback and ledger in DE/EN/FA.
- **TECH-QA-LNG-01 (minor): CLOSED.** Group criterion retains statutory “um 200 Prozent” wording; Persian clarifies the amount of exceedance. No derived `>3×` gloss is taught.
- **TECH-QA-LNG-02 (minor): CLOSED.** Therapeutic-intervention skin injury timing is explicitly acute or within 21 days in all three languages.
- **TECH-QA-SRC-02 (minor): CLOSED.** DLP is no longer claimed as taught; MPE scope is explicitly deferred; the 75th-percentile DRW explanation has a BfS methodology citation; remaining p.21–22 omissions and the high-dose caveat are dispositioned.
- **TECH-QA-SRC-03 (major): CLOSED.** Under §1(22), an event requires unintended exposure; Annex 14 thresholds assess significance. The lesson restores the narrowly qualified caveat for a planned, justified protocol correctly performed as specified, and its self-check defines an unintended protocol-selection error. Verified against the official ordinance, BLÄK guidance 04/2025, and BfS/Winter et al. (2025). Threshold values were not changed.
- **TECH-QA-SRC-04 (minor): CLOSED.** Attribution corrected to *Ärztliche Stelle der Bayerischen Landesärztekammer (BLÄK), 04/2025, p.2* after the reviewer reopened and inspected the official PDF. Extracted text line offsets were removed.
- **TECH-QA-UX-01: CLOSED for curriculum integration.** Exact route linked and `inProgress: true`; browser UX remains blocked separately.

Independent retests passed the focused lesson checker (74 units), JSX/JS syntax checks, MCQ audit (630 questions and 18 cases per language at retest), and scoped whitespace check. These results do not establish full build/browser behavior, clinical specialist approval, or release approval.
