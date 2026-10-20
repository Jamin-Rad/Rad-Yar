# Technik: Buscopan section in MRI contrast lesson (PDF p. 130)

## Discoverability and assessment coverage

PDF p. 130 (printed p. 129) has a bounded adjunct-medication topic: antispasmodic purpose, contraindications, an alternative named in the summary, and visual/accommodation effects. The rendered page image and extracted text were inspected on 20 October 2026.

The material already lives at `/technik/kontrastmittel/mrt#buscopan`, with a visible `Buscopan` item in the page table of contents. Thus a new standalone lesson is unnecessary. Previously, however, the MRI group’s MCQ `topicIds` omitted Buscopan; no matching `CONTRAST_TOPICS` item existed, so quiz selection and generated flashcards omitted the section. This update adds topic ID `km-buscopan`, includes it in the MRI group topic IDs, and supplies two localized MCQs plus two generated flashcards. Existing page-level MCQ and flashcard actions now include that content; the dedicated flashcard route is `/flashcards/km-buscopan` and the MRI group deck remains `/flashcards/kontrastmittel-mrt`.

### Curriculum integration

The current curriculum retains its parent row `kontrastmittel-mrt` and adds `km-buscopan` as a child under `technik-kontrastmittel`, linked to the existing lesson anchor, a two-question quiz selection and the dedicated flashcard route. The item remains `inProgress` pending browser and specialist review.

The coordinator updated the curriculum module, batch matrix and execution plan after independent review.

## Source coverage ledger

| ID | PDF p. 130 point | Importance | Disposition |
|---|---|---|---|
| BU-01 | Buscopan® as parasympatholytic; temporary effect on smooth GI muscle | Core | Reworded as antimuscarinic antispasmodic that relaxes smooth muscle; avoids the misleading “paralyses” wording. |
| BU-02 | Goal: reduce artefacts | Core | Retained narrowly as potential motion-artifact reduction in selected MRI exams; not a universal indication or administration instruction. |
| BU-03 | Glaucoma | Core, requires specificity | Refined against German product information for Buscopan Ampoules: narrow-angle glaucoma, not a blanket statement covering every glaucoma type. |
| BU-04 | Prostatic hyperplasia | Core, requires specificity | Refined to urinary retention with subvesical obstruction, e.g. prostatic adenoma, as stated in the injectable product information; not every case of hyperplasia. |
| BU-05 | Tachyarrhythmia | Core | Retained and aligned with product information listing tachycardia/tachyarrhythmia. |
| BU-06 | Mechanical ileus | Core | Expanded only to the product-label wording: mechanical GI stenosis, paralytic/obstructive ileus and megacolon. |
| BU-07 | Glucagon alternative | Context-sensitive | Retained explicitly as an example named by the PDF, not as an automatic substitute; local SOP, indication and current product information govern use. |
| BU-08 | Mydriasis / impaired near focus; no driving/machinery for 1–2 hours | Core plus correction | Near-accommodation disturbance retained. Current German injectable product information advises caution and avoidance of hazardous activities if accommodation disturbance or dizziness occurs; no fixed 1–2-hour rule was found, so it is removed. |
| BU-09 | Assessment linkage | Core coverage gap | Added two DE/EN/FA MCQs on exact labeled contraindication nuance and two corresponding generated flashcards. Linked through `km-buscopan` group topic selection. |

## Current primary product information

- German Fachinformation, Buscopan® Ampullen 20 mg/1 ml, sections 4.3, 4.7 and 4.8, dated July 2022: https://www.fachinfo.de/fi/pdf/004055/buscopan-r-ampullen-injektionsloesung . It lists narrow-angle glaucoma; urinary retention with subvesical obstruction (e.g. prostatic adenoma); tachycardia/tachyarrhythmia; mechanical GI stenoses; paralytic/obstructive ileus; megacolon; and myasthenia gravis. It says to avoid potentially dangerous activities when accommodation disturbance or dizziness occurs, without a fixed 1–2-hour period.
- Current UK Buscopan Ampoules SmPC, updated 5 January 2026, checked as a supplementary regulator-facing product-label comparison: https://www.medicines.org.uk/emc/product/890/smpc . It similarly limits prostate-related contraindication to hypertrophy with urinary retention and states symptom-based driving/machinery caution. The user-facing section links the German product-specific information; it does not generalize UK authorization details to Germany.
- This is educational material, not a prescribing or administration protocol. Formulation, national authorization and current local product information matter.

## Validation and review state

- Source p. 130 text extracted and page image visually inspected.
- `node scripts/test-technik-buscopan-assessment.mjs` — PASS (MRI group topic linkage, two MCQs and generated flashcards in DE/EN/FA, localized source-linked section, precise label wording and removal of unsupported fixed duration).
- Focused `git diff --check` — PASS.
- Independent review — PASS for the bounded source correction and assessment linkage; the reviewer rechecked the German product information and supplemental UK SmPC, confirmed the fixed-duration removal, and re-ran the focused audit and diff-check with no new finding.
- Browser gate/interactions in DE/EN/FA and RTL — pending.
- Curriculum integration — complete for this bounded lesson. Current legal/clinical practice signoff and browser review remain pending; no overall acceptance claimed.
