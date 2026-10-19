# Balkenfehlbildung: PDF coverage and evidence ledger

Status: editorial draft, 19 October 2026. Route: `/gehirn/anatomie/balkenagenesie`.
Curriculum ID: `balkenfehlbildung` (title: Corpus Callosum Malformations).
This ledger is not clinical approval or publication approval.

## Source inspected

`Gehirn.pdf`, PDF pages 85–86 (printed pages 84–85). Both pages were rendered and
visually inspected. Page 85 contains the definition and sagittal/coronal signs;
page 86 contains coronal Probst-bundle/high-third-ventricle examples, axial
parallel-ventricle/racing-car and colpocephaly examples, and four MRI frames.
Four crops from that montage now appear beside a guided task. A separate
code-native header schematic remains explicitly non-diagnostic.

## Source-to-lesson coverage

| PDF page | Source point | Importance | Lesson disposition | Note |
|---|---|---|---|---|
| 85 | Congenital malformation of the corpus callosum; complete agenesis or partial hypogenesis | Essential | Chapter 1: distinguishes complete absence from absence of selected segments | A thin but continuous callosum (hypoplasia) is explicitly distinguished and excluded from this lesson's scope. |
| 85 | In the illustrated agenesis pattern: absent callosum, radiating medial gyri toward third ventricle, possible absent/malformed cingulate gyrus | Essential | Chapter 1, sagittal direct inspection | The cingulate finding is qualified as possible. |
| 85 | Coronal frontal-horn “steer-horn/Viking-helmet” appearance, splaying superolaterally | Essential | Chapter 2, coronal signs | Indirect supportive configuration, not a stand-alone diagnosis. |
| 85–86 | Widely separated lateral ventricles; longitudinal Probst bundles shaping medial walls; high third ventricle | Essential | Chapter 2, coronal signs | PDF wording retained as possible/supportive. |
| 86 | Axially parallel lateral ventricles (“racing-car sign”) | Essential | Chapter 2 and self-check | Points back to direct midline inspection. |
| 86 | Colpocephaly: disproportionate occipital-horn enlargement | Essential | Chapter 2 | Not presented as specific in isolation. |
| 85 | Approximate isolated/syndromic proportions and association list (including named syndromes/trisomy) | Optional; deferred | Not repeated | The source page does not provide a sufficient basis for applying those percentages or assigning an association to an individual; the lesson instead advises documenting associated findings separately. |
| 85 | Claim that splenium and rostrum are the first portions absent in partial forms | Unresolved; withheld | Visible source-conflict note | This developmental-order statement is not taught pending targeted verification. |
| 85–86 | Source anatomical illustrations, conceptual drawings and four MRI examples; p.86 montage marked rID 10662 | Visual evidence | Four guided crops from PDF p.86 (`public/educational/callosal/`) accompany a non-diagnostic three-plane header schematic | User authorized the supplied PDF images for this project. The PDF carries rID 10662; a secondary PACS.DE record attributes the case to Frank Gaillard, “Callosal dysgenesis,” and lists CC BY-NC-SA 3.0. The primary Radiopaedia page was unavailable during this check (HTTP 402), so direct case attribution and terms remain to be independently verified. Crop coordinates, source limitation and teaching tasks are recorded in `public/educational/callosal/image-provenance.json`. |

## Learning path and visual plan

1. Inspect the corpus callosum directly in the true mid-sagittal plane and
   describe visible segments.
2. Use coronal and axial ventricular configurations as supporting clues, then
   return to direct midline assessment.
3. Distinguish a descriptive isolated malformation from inferred syndromic
   association; report associated findings separately.

The header schematic shows sagittal, coronal and axial tasks as a locator, not as
patient anatomy or a diagnostic image. The MRI comparison uses the four source
frames with restrained plane-specific tasks; the PDF does not state the sequence
or exact midsagittal position for the sagittal crops. The embedded question checks
the transition from indirect axial signs to direct midline assessment.

## Terminology map

| Concept | German | English | Persian |
|---|---|---|---|
| Agenesis | Agenesie | agenesis | آژنزی |
| Partial agenesis / hypogenesis | partielle Agenesie / Hypogenesie | partial agenesis / hypogenesis | آژنزی ناقص / هیپوژنز |
| Hypoplasia (thin but continuous structure; outside lesson scope) | Hypoplasie (dünn, aber durchgehend angelegt; außerhalb des Umfangs) | hypoplasia (thin but continuous structure; outside lesson scope) | هیپوپلازی (ساختار باریک اما پیوسته؛ خارج از محدودهٔ درس) |
| Corpus callosum | Corpus callosum / Balken | corpus callosum | جسم پینه‌ای |
| Probst bundles | Probst-Bündel | Probst bundles | دسته‌های پروبست |
| Colpocephaly | Kolpozephalie | colpocephaly | کولپوسفالیا |

## Verification and open gates

- Independent bounded editorial/source/language/visual review: PASS after the
  cited correction, terminology narrowing, and addition of guided source crops.
  The reviewer independently checked the four crops against PDF p.86. This is
  not specialist clinical sign-off or image-rights clearance.
- `node scripts/test-balkenagenesie-render.mjs`: actual route semantic SSR in
  German, English, and Persian; includes RTL direction, chapter content, schematic
  disclosure, and embedded self-check.
- The source's developmental sequence claim remains withheld.
- This bounded lesson has not received specialist approval or browser visual
  inspection. The source frames are low-resolution crops and their sequence
  labels/exact sagittal plane were not supplied; they support broad plane and
  configuration review only.
- The primary Radiopaedia page could not be checked; secondary case and license
  metadata remain distinct from the user's project authorization.
- The route uses the shared `StandardLessonShell`; curriculum presence and SSR do
  not establish release readiness.
