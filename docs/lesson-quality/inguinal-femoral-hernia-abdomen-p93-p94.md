# Inguinal and femoral hernias — source and QA ledger

## Scope and learning task

**Route:** `/abdomen/hernien/inguinal-femoral`  
**Curriculum IDs:** `inguinalhernie`, `femoralhernie` only  
**Learner task:** use the inguinal ligament, inferior epigastric vessels/deep ring, and femoral vein to localise a groin hernia; describe source-listed dynamic ultrasound and CT findings.  
**Source pages:** `Abdomen.pdf`, PDF pp.93–94 / printed pp.92–93, section “Leistenhernie”. Both pages were inspected as rendered images and extracted text.

## Source coverage

| ID | Source | Point | Importance | Lesson location | Status / note |
|---|---|---|---|---|---|
| HN-01 | PDF p.93 / print 92 | Inguinal hernia exits above the inguinal ligament; femoral exits below | Essential | `map`, `femoral` | Included |
| HN-02 | PDF p.93 / print 92 | Indirect type is lateral to inferior epigastric vessels and passes through deep ring into inguinal canal | Essential | `inguinal` | Included |
| HN-03 | PDF p.93 / print 92 | Direct type is medial to inferior epigastric vessels through Hesselbach triangle | Essential | `inguinal` | Included |
| HN-04 | PDF p.93 / print 92 | Femoral sac typically lies medial to femoral vein | Essential | `femoral` | Included |
| HN-05 | PDF p.94 / print 93 | Ultrasound is first-line; dynamic Valsalva and reducibility can be assessed | Essential | `imaging`, summary | Included with attribution to the supplied source |
| HN-06 | PDF p.94 / print 93 | CT complication signs: bowel-wall thickening, reduced/absent mural enhancement, surrounding fat edema | Essential | `imaging` | Included as source-listed findings; no single sign is taught as standalone proof |
| HN-07 | PDF p.94 / print 93 | Free fluid in sac | Potentially relevant | Source note | Not included: final source sentence is visibly incomplete (“und.”) |
| HN-08 | PDF p.93–94 / print 92–93 | Frequency, sex distribution and comparative incarceration-risk claims | Optional/background | — | Omitted; not needed for the imaging localisation task and not independently verified |
| HN-09 | PDF p.94 / print 93 | CT “gold standard in complication” | Optional/background | — | Omitted; absolute comparative claim not independently verified |

## Learning path and visual plan

1. Establish the inguinal ligament as the first boundary.
2. Separate direct from indirect inguinal hernia using vessel and deep-ring relationships.
3. Identify the femoral route by its relation to the ligament and femoral vein.
4. Apply the map to a short self-check, then review source-listed US/CT observations.

The code-native SVG is a non-diagnostic orientation map, not a patient image or evidence that a hernia is present. The caption and translated legend state that the schematic places lateral on the left and medial on the right; the deep ring/indirect path is lateral to the inferior epigastric vessels, and the direct path is medial. No source patient image was needed for this anatomy task; the PDF illustration is not reproduced.

## Terminology map

| Concept | DE | EN | FA |
|---|---|---|---|
| Inguinal ligament | Leistenband | inguinal ligament | رباط اینگوینال |
| Inferior epigastric vessels | inferiore epigastrische Gefäße | inferior epigastric vessels | عروق اپی‌گاستریک تحتانی |
| Deep inguinal ring | tiefer Leistenring | deep inguinal ring | حلقهٔ عمقی اینگوینال |
| Hesselbach triangle | Hesselbach-Dreieck | Hesselbach’s triangle | مثلث هسل‌باخ |
| Femoral vein | Vena femoralis | femoral vein | ورید فمورال |
| Reducibility | Reponibilität | reducibility | قابلیت جاافتادن |
| Bowel-wall enhancement | Kontrastmittel-Enhancement der Darmwand | bowel-wall enhancement | جذب مادهٔ حاجب در دیوارهٔ روده |

## Validation and remaining review

- Targeted SSR/render test: PASS — `node scripts/test-inguinal-femoral-hernia-render.mjs` checks DE/EN/FA, RTL, source scope, curriculum links, and that the femoral path is medial to the femoral vein under the stated orientation.
- Independent-review delta: PASS. SVG states its lateral/medial orientation in all languages and the color legend ties each path to the epigastric vessels; its femoral path is medial to the femoral vein. The source's first-line ultrasound statement is included in the lesson and summary.
- Translation parity: implemented in DE/EN/FA; automated presence checks included.
- Source/image provenance: source PDF and page range recorded; diagram is original code-native anatomy art.
- Retrieval integration delta: added one four-option MCQ for each exact curriculum topic (`inguinalhernie`, `femoralhernie`), both with DE/EN/FA stems, options, and explanations. Added a shared four-card topic for the combined lesson and linked both curriculum entries and the shell actions to it. Focused integration test checks exact routes, option counts, localization, and card registration.
- Browser desktop/mobile, RTL, themes, and keyboard interaction: not yet verified in a real browser.
- Independent editorial and retrieval-integration delta review: PASS within the bounded source/education/visual/text/assessment checks. Scientific review and real-browser testing: pending. Curriculum presence or passing local checks does not imply clinical approval or publication readiness.
