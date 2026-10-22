# Ileus and foramen of Winslow hernia — Abdomen.pdf p.69

Scope: bounded DE/EN/FA addition to the existing `/abdomen/gi/ileus-volvulus` route and exact curriculum topic `ileus-duenndarm`. This covers physical PDF p.69 (printed p.68) only; it does not audit all content in the surrounding ileus topic.

## Learning outline

- **Distinguish the broad mechanisms:** define ileus as interrupted bowel passage; contrast absent peristalsis (paralytic) with a physical obstruction (mechanical), using only the source examples.
- **Locate the named internal hernia:** explain the source's Foramen omentale/Winslow route into the bursa omentalis behind the stomach.
- **Read the case-specific CT location:** pair the source's axial and coronal CT views with its wording about epigastric bowel behind the stomach and anterior to the vena cava; identify that the slide labels the depicted hernia content as displaced caecum.

No separate new chapter is added: the content belongs in the existing mechanical-obstruction chapter. No treatment advice or general rule for all small-bowel obstruction is inferred.

## Source coverage

| Source point | Lesson disposition | Evidence and limit |
| --- | --- | --- |
| Ileus definition: interruption of bowel passage | Added in DE/EN/FA | Directly visible on Abdomen.pdf physical p.69 / printed p.68. |
| Paralytic ileus: absent peristalsis; postoperative, inflammatory (pancreatitis/appendicitis), vascular examples | Added as source examples | The source examples are repeated without assigning frequency or mechanism not shown on the page. |
| Mechanical ileus: physical obstacle; hernia and tumour examples | Added in DE/EN/FA | Direct source match. No prevalence or management statement. |
| Foramen-Winslow hernia: bowel loop through the omental foramen into the bursa omentalis behind the stomach | Added as a named internal-hernia pattern | The source definition describes a small-bowel loop; its figure caption labels the illustrated herniated content as a displaced caecum. Lesson preserves this distinction and attributes both to the page. |
| CT location clue: gas/fluid-filled bowel in the epigastrium, typically posterior to stomach and anterior to vena cava | Added as a location clue for this source example, not a rule for every obstruction | Directly visible in source text; the caution against generalization is an editorial boundary. |
| Paired CT views and visible `rID 44820` label | Cropped and embedded as one responsive paired figure | Original source page visually inspected at 140 dpi. The user authorized reuse of images from the six supplied PDFs for this project. The crop preserves both axial/coronal views and the printed rID; contributor and separate licensing terms are not established by this crop. |

## Media and provenance

Asset: `/educational/abdomen-ileus/foramen-winslow-p69-ct-pair.png`, cropped from the visually inspected source page. It teaches the spatial relation named in the PDF, not general small-bowel transition recognition. DE/EN/FA alt text and captions explicitly attribute the case label to the source slide. See `public/educational/abdomen-ileus/image-provenance.json`.

## Assessment and validation

- One localized MCQ is registered under existing exact topic ID `ileus-duenndarm`; no lesson or curriculum ID is added.
- One DE/EN/FA flashcard reinforces the lesser-sac/posterior-stomach location and source caption's displaced-caecum label.
- Focused actual-route SSR passed with `node --import tsx scripts/test-ileus-fat-notch-p70-render.mjs`; the same test confirms one four-option MCQ per language and four cards under the exact existing topic. `npm run audit:mcq` passed (781 questions; 18 cases per language), and `node --import tsx scripts/audit-abdomen-thorax-assessment-retrieval.mjs` passed (42 registered questions; 49 exact topic tags across DE/EN/FA). The provenance JSON parses and `git diff --check` passes.
- Independent review, live-browser/RTL evidence, and Dr. Zia's scientific approval remain pending. This bounded source addition is not full lesson review, clinical sign-off, or publication approval.
