# Knee ligaments: MSK.pdf pages 57–66 source ledger

Scope: physical PDF pages 57–66 (printed pages 56–65), compared with `/msk/knie/kreuzbaender` and its DE/EN/FA copy. Page images were rendered and inspected; pages 60–61 and 63 were also checked at higher resolution. This is an editorial/source mapping, not a clinical sign-off.

| PDF page (printed page) | Source content | Existing route coverage / disposition |
|---|---|---|
| 57 (56) | MRI grading of ligament injuries | Covered by the grading chapter. |
| 58 (57) | Lateral collateral complex anatomy and fibular-head relationship | Covered by lateral-complex cards and source figures. |
| 59 (58) | LCL injury/follow-up, biceps-tendon-injury heading, arcuate sign and PLC | LCL course and arcuate sign are covered. The biceps heading has no accompanying explanatory content; no additional biceps-injury claim inferred. |
| 60 (59) | MCL, deep MCL, POL and semimembranosus anatomy | Covered by medial-complex cards and source figures. |
| 61 (60) | Partial MCL tear at trauma/6/12 weeks; separate grade-I sprain at trauma/2 weeks | Existing partial-tear figure retained. Added the existing PDF-derived 2-week grade-I sequence with a separate, qualified caption; it is not presented as the partial-tear timeline. |
| 62 (61) | MCL/POL rupture image set | Added explicit source-page attribution to the existing MCL/POL figure in all locales. |
| 63 (62) | ACL anatomy, bundle appearance, epidemiology and non-contact mechanism | Existing anatomy/bundle content plus newly added, source-backed non-contact pivot/valgus mechanism. Broad epidemiology percentages were not added. |
| 64 (63) | ACL direct/indirect MRI signs, contusions, Segond sign and tibial eminence avulsion | Added the two contusion locations to the localized text. Added AP radiograph crop `acl-avulsion-xray.jpeg` (rID 90186), correctly attributed to PDF p.64 / printed p.63. |
| 65 (64) | Mucoid ACL degeneration; unhappy triad | Covered. |
| 66 (65) | PCL anatomy, frequency, mechanism, MRI appearances and treatment note | Existing lesson covers the described MRI pattern and qualified treatment note. No percentage added. |

## Integration and remaining gates

The existing lesson already teaches both cruciate and collateral ligament material, so `kreuzbaender` and `seitenbaender-knie` point to the same route; both remain `inProgress`. No separate collateral route is needed for these pages. The empty case-placeholder chapter was removed. Page-to-topic and locale assertions are in `scripts/test-msk-knee-ligaments-p57-p66.mjs`.

Still open: independent review and any supported delta, real-browser desktop/mobile and interaction verification, and specialist clinical sign-off. The PDF's biceps-injury heading on p.58 is unresolved because it contains no actual content to map.
