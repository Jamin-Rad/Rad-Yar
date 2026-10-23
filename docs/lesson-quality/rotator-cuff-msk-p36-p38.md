# Rotator cuff and shoulder impingement — MSK.pdf pp. 36–38

**Scope:** bounded source audit of existing routes; no new disease unit.
**Primary route:** `/msk/schulter/rotatorenmanschette` (`rotatorenmanschette`).
**Related route:** `/msk/schulter/impingement-kalkschulter`
(`impingement-kalkschulter`, explicitly partial/in progress).
**Source:** user-provided `MSK.pdf`, physical pp. 36–38 (printed pp. 35–37).
All three pages were rendered and visually inspected. They contain teaching
schematics and projection guidance, not diagnostic patient images.

## Learning path and source coverage

| PDF point | Source content | Existing lesson coverage | Decision |
|---|---|---|---|
| p. 36 | Four rotator-cuff muscles and functions | The rotator-cuff lesson names all four muscle-tendon units and their main movements | Covered; no duplicate chapter |
| p. 36 | Bigliani acromion types I–III and the source's impingement association | The focused impingement lesson shows the three source morphologies and states that type is an associated clue, not proof or a reliable stand-alone classifier | Covered in the related route; link added from associated findings |
| p. 37 | AP, axial and transscapular-Y radiographic views | The focused impingement lesson includes the projections and the source-described Y relationship | Covered in the related route |
| pp. 37–38 | Subacromial pattern and contributors (acromion, inferior AC osteophytes, os acromiale); bursal/tendon findings | Focused impingement lesson includes these as possible contributors and findings; the PDF's <7 mm statement is qualified, not taught as a universal diagnostic cut-off | Covered with caveat |
| p. 38 | Subcoracoid compression and coracohumeral interval | Focused impingement lesson explains the pattern and treats the PDF's <6 mm value as a source observation, not a stand-alone criterion | Covered with caveat |
| p. 38 | Posterosuperior and anterosuperior internal patterns and associated findings | Focused impingement lesson includes the positional mechanisms and listed cuff/labral/pulley findings; no unlabelled sequence is inferred | Covered with sequence limitation |
| p. 39 | Shoulder instability, labrum/capsule and arthrosis headings | The rendered page has headings/blank bullets only | No standalone lesson is derived from this page; a substantive source is required |

The PDF's visible drawings are explanatory diagrams, not diagnostic cases. The
cuff route now uses a purpose-built, clearly schematic anatomy illustration;
the two routes do not claim that the PDF contains a patient MRI or radiograph.
The separate impingement route remains incomplete
for the curriculum label “Kalkschulter”: pp. 36–38 do not teach calcific
tendinopathy, and that broader label must not be read as completed coverage.

## Assessment and navigation

The rotator-cuff topic has 15 exact-tag MCQs per language and 12 localized
flashcards. Its curriculum entry now links directly to the 10-question topic
quiz and the existing flashcard deck. The associated-findings section links to
the separate impingement lesson, avoiding duplication of its projection and
impingement-pattern content.

The tangent-sign wording in the full-tear table and flashcard 11 was corrected
after independent review. It now describes the supraspinatus muscle belly on
the oblique sagittal Y view relative to the line joining the superior scapular
spine and coracoid margins. A positive sign indicates atrophy; it is not a
humeral-head crossing sign. Primary definition: Zanetti M, Gerber C, Hodler J.
*Quantitative assessment of the muscles of the rotator cuff with magnetic
resonance imaging.* Invest Radiol. 1998;33(3):163–170. PMID: 9525755,
https://pubmed.ncbi.nlm.nih.gov/9525755/.

The route now starts with the required topic-specific `LessonHero`, provides
one localized explanatory self-check after teaching the tangent sign, uses one
shared accordion state, opens a chapter from the sidebar, synchronizes the
active chapter with the URL hash, and localizes the final chapter title in all
three languages. The route is marked ready, so the contradictory unconditional
in-progress banner was removed.

## Verification and limits

- Focused route/curriculum/assessment integration check:
  `scripts/check-rotator-cuff-p36-p38.mjs`.
- Shared MCQ audit and existing impingement SSR/locale test were run after the
  link update.
- An independent read-only reviewer checked source-page alignment, assessment
  retrieval, translation fields and identified the tangent-sign and accordion
  defects; these code-level findings were corrected. Browser/device/focus
  behavior and Dr. Zia's clinical sign-off remain separate and pending.
- This ledger covers only the mapped points on pp. 36–38; it does not validate
  every claim in the broad rotator-cuff route.
