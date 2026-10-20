# Mesenteriale Ischämie — scoped source and QA record

Date: 2026-10-19
Route: `/abdomen/gi/mesenteriale-ischaemie`
Curriculum ID: `mesenteriale-ischaemie`
Scope: imaging pattern recognition in suspected acute mesenteric ischaemia; not management, prognosis, chronic ischaemia, or a complete clinical pathway.

## Source coverage ledger

| Point | Source/page | Lesson location | Status / limits |
|---|---|---|---|
| Definition and mechanisms; closed-loop/strangulation | `Abdomen.pdf`, PDF p.73 (printed p.72) | `Closed loop und Strangulation` / translations | Closed-loop strangulation is retained qualitatively as a possible cause. The source's “>75% of cases” frequency estimate is deliberately not taught: no current independent source was established for that number. The source's arterial/venous cause categories are represented in the pattern sections. |
| Acute symptom phases and prognosis | `Abdomen.pdf`, PDF p.73 (printed p.72) | Not included | Explicitly deferred: symptom-stage narrative, prognosis/mortality, progression to necrosis/sepsis/perforation are clinical-course and outcome teaching beyond this imaging-focused lesson; several claims are not independently verified. Revisit only in a separately sourced clinical lesson. |
| Treatment statement for venous thrombosis | `Abdomen.pdf`, PDF p.73 (printed p.72) | Not included | The source's local arterial thrombolysis statement is omitted because it is treatment guidance outside scope and has not been verified against current management guidance. |
| Early CT signs: filling defect and target sign / three-layer wall | `Abdomen.pdf`, PDF p.74 (printed p.73) | Arterial/venous patterns and `Was sagen Darmwand und Gas?` | Included: target sign means enhancing mucosa and serosa around relatively low-attenuation oedematous submucosa. It is taught descriptively, not as a specific sign or proof of viability. |
| Wall thickening and oedema with venous ischaemia or reperfusion | `Abdomen.pdf`, PDF p.74 (printed p.73), source caption to venous CT example | Venous paragraph and source-image caption | Included with attribution to the PDF. The association is framed as the source's description, not a standalone diagnostic rule. |
| Thin non-enhancing wall; later gas/free air signs | `Abdomen.pdf`, PDF p.74 (printed p.73) | Bowel signs paragraph | Included as serious perfusion/severity findings. The PDF's “early reversible” versus “late irreversible/necrosis” labels are not repeated as guaranteed tissue-viability categories; ESVS 2025 caveat takes precedence for gas findings. |
| Arterial CTA example | `Abdomen.pdf`, PDF p.75 (printed p.74), montage marked `rID 84614` | Arterial occlusion figure | Source crop inspected. Caption preserves PDF page, printed page and identifier. The image illustrates the source case; it is not a claim that one cropped frame alone establishes the full diagnosis. |
| Venous thrombosis CT example | `Abdomen.pdf`, PDF p.74 (printed p.73), two-panel example | Venous thrombosis figure | Source crop inspected. Caption follows the source marking of SMV thrombosis extending to portal vein and bowel/mesenteric changes. |
| CTA protocol in suspected acute mesenteric ischaemia | ESVS 2025 guideline, Recommendation 33; DOI `10.1016/j.ejvs.2025.06.010`; PDF p.27 (1-based viewer page; zero-based index 26); printed journal pagination spans pp.26–27 in this section | CTA protocol paragraph | Verified against current primary professional guideline: urgent CTA, arterial and venous phases, thin sections ≤1 mm; non-contrast phase may be added; the recommendation explicitly applies regardless of renal function. Date checked 2026-10-20. [Official ESVS guideline page](https://esvs.org/guideline/diseases-of-the-mesenteric-arteries-and-veins/) · [Full guideline PDF](https://ris.utwente.nl/ws/portalfiles/portal/502462657/PIIS1078588425005167.pdf). |
| Wall hypoenhancement, pneumatosis and portomesenteric gas | ESVS 2025 guideline, CTA bowel findings discussion, DOI above | Bowel signs and CAVE | Verified: these findings can indicate severe/transmural ischaemia, but pneumatosis or portomesenteric gas does not by itself establish irreversible necrosis or non-viability. |
| NOMI pattern | ESVS 2025 guideline, NOMI imaging discussion, DOI above | NOMI paragraph and embedded question | Verified in bounded wording: shock plus bowel signs on CTA without relevant SMA stenosis/occlusion should raise suspicion; presented as a clinical-radiological constellation, not a single-sign diagnosis. |

## Learning plan and visual rationale

Learner promise: read suspected acute mesenteric ischaemia CTA in a repeatable order and report the vascular and bowel components separately. Sequence: (1) confirm arterial/venous phase coverage, (2) inspect arterial inflow, (3) inspect venous outflow, (4) evaluate bowel/mesentery consequences and severity caveats, then retrieve the NOMI pattern in a self-check.

Visuals: the shared hero schematic is the code-native bowel pattern diagram. The arterial CTA montage and venous CT pair are cropped from the user-provided PDF to demonstrate actual source patterns. Both retain source page and identifiers in captions; no patient image has been generated or relabelled as synthetic. Source-image reuse was explicitly approved by the user in the coordinating thread.

## Translation/parity notes

DE is the base language. The same lesson units, three stations, three cause/pattern elements (arterial, venous and closed-loop/strangulation), bowel-wall layers, gas caveat, source captions, self-check and three summary rules are provided in DE/EN/FA. The scoped audit asserts the presence of each semantic unit in all three language dictionaries; signs, phase labels, negation and uncertainty around NOMI/irreversibility were also compared by author self-check. Independent linguistic review and RTL browser rendering remain pending.

## Validation and open gates

- Scoped structural and DE/EN/FA semantic-unit key audit: passed (2026-10-19).
- `node --check data/curriculum.js` and scoped `git diff --check`: passed (2026-10-19).
- Browser rendering and interaction, desktop/mobile, themes and FA RTL: not run; browser QA remains open.
- Independent review: first review returned REVISE for target sign/three-layer wall, venous oedema/reperfusion, closed-loop/strangulation disposition, cave-versus-ledger separation, and ESVS pagination. All findings were corrected and independently retested CLOSED on 2026-10-19; the reviewer reran the expanded audit and manually compared the DE/EN/FA meanings.
- Independent review delta on 2026-10-20: CTA protocol’s explicit “regardless of renal function” qualifier was added in DE/EN/FA to match Recommendation 33; the focused audit now asserts this qualifier in all languages. Independent reviewer confirmed the omission is resolved in all three languages; the expanded audit passes. Browser and clinical sign-off remain pending.
- Clinical approval: not claimed. ESVS-based claims above were checked; all other claims are constrained to source-supported descriptive teaching.
- Whole Abdomen.pdf coverage: not claimed; this record covers only PDF pp.73–75.
- Assessment: one embedded formative self-check; no global quiz or flashcard integration requested for this scoped lesson.
