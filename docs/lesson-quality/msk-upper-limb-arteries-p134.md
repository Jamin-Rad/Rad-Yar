# Upper-limb arterial anatomy — MSK.pdf p134

Authoring plan, 2026-10-24. Topic `arterien-obere-extremitaet`, route `/gefaesse/anatomie-obere-extremitaet`. Audience: radiology learners; objective: name the main arterial pathway and locate its name-changing landmarks, while recognizing variable branching. This is an anatomical orientation lesson, not diagnostic angiogram recognition or a treatment protocol.

## Source boundary and teaching outline

The independent mapper visually surveyed all138 PDF pages and enlarged p134. The heading “Obere Extremität” has no upper-limb teaching detail; surrounding figures actually show lower-limb arteries. They must not be relabelled or reused as arm anatomy. Supplemental sources: Friedman et al., Radiographics2025, doi:10.1148/rg.240077, Normal and Variant Anatomy; Bajzer, Arterial supply to the upper extremities, NCBI Bookshelf NBK27339; Epperson/Varacallo, Brachial Artery, NBK537145. Sources consulted2026-10-24. No numerical variant prevalence or treatment recommendations copied.

1. Proximal pathway and two name-change landmarks.
2. Brachial bifurcation and forearm orientation; original schematic with localized labels.
3. Palmar arches and variation; dominance is not exclusive supply and continuity must not be assumed.
4. Two retrieval decisions and three takeaways.

Media: generated conceptual arm header, not diagnostic evidence; deterministic flow diagram for named pathways and landmarks. No patient angiogram is required for the bounded objective of anatomical route naming; patient-image recognition remains outside this lesson. Diagram deliberately omits small collateral branches and does not assert scale or universal complete arches.

Terminology: A.subclavia/subclavian/ساب‌کلاوین; A.axillaris/axillary/آگزیلاری; A.brachialis/brachial/براکیال; radial/thumbside/سمت شست; ulnar/little-fingerside/سمت انگشت کوچک; superficial/deep palmar arch/قوس کف‌دستی سطحی و عمقی. DE/EN/FA must preserve “usually/predominantly” and variant uncertainty.

Validation, independent review and browser evidence pending implementation. Scientific approval pending Dr.Zia.

## Implementation and author evidence, 2026-10-24

Route author personally extracted physical PDF page 134 (printed 133) with pypdf and viewed a pypdfium2 render at `tmp/sternum-rib/msk-p134.png`. It confirms the heading-only upper-limb entry and lower-limb figure below the separate heading. No unprovided upper-limb detail is attributed to the PDF.

Exact implemented chapters and purposes:

| Chapter | Purpose |
| --- | --- |
| Zwei Landmarken, drei Gefäßnamen | Follow continuity across first rib and teres-major boundaries, not false bifurcations |
| Am Ellenbogen zwei Wege verfolgen | Relate radial/ulnar names to thumb/little-finger destinations and recognize possible high origins |
| Zwei Hohlhandbögen, variable Verbindungen | Contrast predominant radial/deep and ulnar/superficial contribution without asserting universal completeness |
| Den Verlauf sicher benennen | Three compact takeaways; retrieval occurs beside its relevant teaching point |

### Source coverage

Author read the actual normal/variant anatomy section of [Friedman et al.2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11736060/) on 2026-10-24. This is a RadioGraphics educational review, not an original prevalence study. It supports right/left subclavian origin, first-rib and teres-major name changes, typical cubital bifurcation, interosseous origin/division, palmar contribution and variable connections, and high radial origin. No numerical prevalence or protocol from the paper was imported. This full-text source is displayed in the lesson. Earlier plan's Bookshelf references are supplementary background, not required sources for claims uniquely added here.

| Source point | Lesson destination | Status |
| --- | --- | --- |
| MSK.pdf physical134 / printed133 upper-limb heading | Whole bounded anatomical lesson | Supplemental coverage complete |
| Normal proximal artery origin and boundaries | `landmarken`, main-path diagram, landmark MCQ/card | Incorporated |
| Typical brachial split and radial/ulnar destination | `unterarm`, branch diagram | Incorporated |
| Common interosseous → anterior/posterior | `unterarm` prose | Incorporated; small branches explicitly omitted in flow diagrams |
| Variable high radial origin | `unterarm` second paragraph | Incorporated without unsupported prevalence |
| Radial/deep and ulnar/superficial arches; distal superficial arch; variable connections | `hand`, conceptual flow diagram, arches MCQ/card | Incorporated; diagram is a supply flow, not to-scale hand geometry |

### Media

- `public/educational/upper-limb-arteries/hero.png`: generated conceptual orientation illustration, personally inspected. Five digits, visible single arterial pathway dividing in forearm, no text/scan simulation. It is not used as precise branch topology evidence. Prompt and built-in tool provenance recorded in adjacent `hero-generation.md`.
- `MainPath` and `DistalPath` in route: original deterministic HTML/CSS diagrams with DE/EN/FA text and accessible semantic content. No copied figure or third-party asset. Main diagram shows a continuous sequence of names, boundary labels sit between nodes. Forearm diagram shows two destinations. Hand diagram says **predominantly** and a dashed text panel explicitly describes variable connections. Precise small collaterals and interosseous branches are not drawn; caption discloses incomplete representation.
- No real patient angiogram required for this bounded anatomical naming objective. Image-recognition training and vascular-injury diagnosis are outside scope.

### Integration and test contract

Curriculum belongs to `fachId: gefaesse-ir`, `kapitelId: gefaesse-grundlagen`; the PDF file category does not override the existing curriculum structure. Quiz queries and question `fach` are `gefaesse-ir`.

Exports from `data/upperLimbArteriesLesson.js`: `UPPER_ARTERY_QUESTIONS` (two four-option MCQs per language), `UPPER_ARTERY_CARDS` (two localized cards), `UPPER_ARTERY_CARD_TOPIC`, `UPPER_ARTERY_TOPIC_GROUP`.

MCQ IDs: `arterien-obere-extremitaet-{de|en|fa}-landmark` (B) and `arterien-obere-extremitaet-{de|en|fa}-arches` (C). Cards end in `landmark` and `arches`.

`node --import tsx scripts/test-upper-limb-arteries-ssr.mjs`: PASS after implementation. Actual shared-shell route compiled/rendered for all three languages; unique H1, correct locale/RTL, single initial open chapter, correct artery topic links, four-option bank consistency, localized cards, chosen-option feedback wiring and correct `gefaesse-ir` scope tested. Browser layout and actual clicks remain parent's separate evidence; SSR is not browser or scientific approval.

`editorial_qa: author_checks_passed; independent_review_pending`

`browser_qa: pending_parent`

`scientific_review: pending_Dr_Zia`

`publication: pending_parent_main_integration`

## Browser-discovered integration repair

The real curriculum subject is `gefaesse-ir`, not the route prefix `gefaesse`. Questions, topic-group subject, quiz query and breadcrumb now use `gefaesse-ir`, while the lesson URL remains `/gefaesse/anatomie-obere-extremitaet`. The existing `gefaesse-grundlagen` chapter ID is retained.

The `/gefaesse` tree had no enclosing subject layout. Added only `app/gefaesse/anatomie-obere-extremitaet/layout.js`, matching `app/msk/layout.js`: Navbar, LearningAccessGate wrapping LessonInProgressGate, then Footer. This supplies normal navigation and preserves normal product access restrictions. No existing lower-limb route or access gate implementation was modified. SSR regression checks now assert exact curriculum links and bank subject plus required scoped-layout components. Parent reruns actual browser behavior and requests independent integration re-review.
