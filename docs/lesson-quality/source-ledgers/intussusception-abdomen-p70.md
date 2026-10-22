# Intussusception: Abdomen.pdf p.70 coverage ledger

## Scope and source inspection

This is a focused expansion of the intussusception subsection in
`/abdomen/gi/ileus-volvulus`, not a claim that the full mechanical ileus lesson or
all of Abdomen.pdf has been revalidated. The relevant PDF is `Abdomen.pdf`,
physical p.70 (printed p.69). Its extracted text and page image were inspected.
The page's ultrasound/intussusception heading and prose were read visually; the
CT montage on that page is explicitly about adhesive obstruction/Fat Notch and
is not used for this subsection. No table or figure specific to intussusception
appears on that page.

## Chapter plan recorded before implementation

Existing parent chapter: **Ileus und Volvulus / Ileus and volvulus / ایلئوس و ولولوس**.

Existing subsection retained: **Intussuszeption / Intussusception / اینتوساسپشن**.

1. **Was stülpt sich ein? / What telescopes into the bowel? / چه بخشی از روده فرو می‌رود؟** — define bowel-within-bowel and give the age context without implying exclusivity.
2. **Wie sieht derselbe Prozess aus zwei Richtungen aus? / How does the same process look from two directions? / یک فرایند از دو جهت چگونه دیده می‌شود؟** — connect the transverse target sign and longitudinal pseudokidney/sandwich appearance to the same process, using one real case study in two orientations.

## Coverage map

| Source point | Source | Lesson location | Status / boundary |
|---|---|---|---|
| A bowel segment invaginates into the following aboral segment | Abdomen.pdf, physical p.70 / printed p.69 | `#intussusception`, definition paragraph | Covered. Wording is concise and preserves the distal direction. |
| Intussusception is common in infancy/children in the first/second year and is a common cause of ileus in childhood | Abdomen.pdf, physical p.70 / printed p.69 | `#intussusception`, age paragraph | Covered as the PDF's framing, with current age context added from RCH. |
| Target/sandwich and pseudokidney are sonographic signs | Abdomen.pdf, physical p.70 / printed p.69 | `#intussusception`, two-view explanation and figures | The PDF names the signs but does not provide intussusception images. Real case views were added with attribution and frame provenance; the page's unrelated Fat Notch CT is excluded. |
| Suspected pediatric intussusception: ultrasound is the initial imaging study | RCH Clinical Practice Guideline; ACR Appropriateness Criteria | `#intussusception`, modality paragraph | Supplementary, clinically material claim, checked against the cited sources. |
| Age distribution: any age, most common 3 months–2 years, peak 4–9 months | RCH Clinical Practice Guideline | `#intussusception`, age paragraph | Supplementary. The displayed Radiopaedia case is 2 months old and captioned as younger than typical peak. |

## Visual and rights record

Both images come from the visibly inspected Radiopaedia rID 232928 case page,
contributor Soo Tze Hui. Transverse frame 74523028 teaches the target sign;
longitudinal frame 74523027 is cropped to its left-hand long-axis panel so the
adjacent transverse view is not mislabeled. The exact files, crop record,
multilingual captions and alt text are in
`public/educational/ileus-intussusception/image-provenance.json`.

The user explicitly confirmed in this conversation that RadYar has permission to
use Radiopaedia cases, including for subscription-supported use. This is the
project's reported authorization; the author did not independently inspect a
license document. Source case: https://radiopaedia.org/cases/232928.

## Clinical references

- Royal Children's Hospital Melbourne, *Clinical Practice Guideline: Intussusception* (updated 2026): https://www.rch.org.au/clinicalguide/guideline_index/intussusception_guideline/
- American College of Radiology, *ACR Appropriateness Criteria: Abdominal Pain-Child*, suspected intussusception, initial imaging: https://acsearch.acr.org/list/TopicNarrativePdf?topicId=351

## Assessment and exclusions

No new MCQ or flashcard is added in this focused patch. Existing ileus assessment
IDs remain unchanged; there is no exact small-bowel intussusception curriculum ID
in the available registry, so the unrelated rectal `rektuminvagination` ID is not
reused. Existing shared closed-loop and gallstone questions are outside this
subsection's learning objective.

This subsection does not teach reduction, lead points, management, complications,
or adult intussusception. Do not infer their coverage from this entry.

## Verification record

- Source page text and rendered page image inspected.
- Radiopaedia case page and both selected frames visually inspected; attribution,
  view orientation and age noted.
- Age and initial-imaging claims checked against the RCH guideline and ACR criteria.
- Focused DE/EN/FA server-render assertions are defined in
  `scripts/test-ileus-intussusception-render.mjs`.
- A separate reviewer identified that the original second frame also contained
  an adjacent transverse panel. The published asset was cropped to the
  longitudinal panel, visually rechecked, and the image width updated. The
  reviewer confirmed the fix; the visible view, caption, alt text and provenance
  now match.
- Focused DE/EN/FA render test, JavaScript syntax check and `git diff --check`
  pass. The neighboring volvulus p.76–78 test also passes. A browser tab could
  not connect to the local server, so rendered layout, RTL and responsive UX
  remain unverified. Two other neighboring checks are stale or blocked by a
  missing module and were not changed in this focused patch.
- Independent source, education, visual, language and assessment review passed
  for this delta. UX remains blocked; scientific sign-off by Dr. Zia and release
  approval remain separate and pending.
