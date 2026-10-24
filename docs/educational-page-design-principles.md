# RadYar educational page principles

For lesson production and independent review, use
[`lesson-quality/standard.md`](lesson-quality/standard.md). CAA is the user's
preferred teaching reference; this document remains the shared layout and
interaction reference. The complementary standard adds source coverage, visual
case selection, translation parity, assessment consistency and evidence gates.

These principles are distilled from the strongest existing lessons, especially Mamma MRI lesion characterisation, Meniscus, and Fleischner criteria. They define a reusable learning experience, not a fixed colour palette.

The maintained reference implementation lives at **Andarun → Test** (`/andarun/test`). New educational pages should start from this reference and keep the standard RadYar navbar and footer.

User-confirmed site-wide design contract, 25 October 2026: CAA and the Test page define the shared presentation. Use the maintained `StandardLessonShell` for new lesson families. Topic accents and atmospheric backgrounds may vary; reading panels keep paired light paper and dark ink in both application themes. Dark diagnostic figures may retain their own explicitly paired palette. Do not apply old application-dark text overrides to light reading cards.

The curriculum's **Frühzugriff / Early access** label is sufficient. Do not render an additional lesson-under-construction banner or acknowledgement dialog. This presentation rule does not change access permissions, scientific review or lesson completion metadata.

## 1. One clinical promise per page

The title identifies the topic or diagnostic task. Every lesson header must include a generated schematic image specific to that topic. Do not reuse an unrelated topic's image. The schematic remains visible on desktop and mobile and must not overlap the title or controls.

Match CAA's polished medical-atlas illustration quality. A simple icon, flat SVG placeholder or generic `ClinicalPatternDiagram` is not an acceptable header substitute. Precise code diagrams remain useful inside the teaching chapters. Inspect the actual illustration for topic fit and keep its silhouette and relevant inset inside the header column. Header artwork is conceptual, not diagnostic patient evidence. Existing approved topic illustrations may be retained.

Use the shared `components/LessonHero.jsx` for the header, with a required topic image and translated alt text. It deliberately accepts no subtitle or explanatory text. **Do not add a description beneath the title.** Definitions, clinical promises and introductory explanations belong at the beginning of the first chapter.

## 2. Orientation before detail

The first viewport introduces the topic through its title and schematic, followed by the learning actions and progress. The high-value mental model begins in the first chapter. A persistent learning path shows where the learner is and what remains.

Navigation position and learning progress are separate states. Opening or jumping to a later chapter never marks earlier chapters as read; the progress bar advances only after an explicit “mark section as read” action.

## 3. One open chapter at a time

Long lessons use focused accordion chapters. Opening a chapter closes the previous one. The sidebar, URL hash, and chapter state stay synchronised.

Chapters are identified by their own meaningful icon, not by a visible sequence number. The same icon is reused in the chapter header and in the learning path so both navigation surfaces stay visually connected.

## 4. Teach the decision path

Whenever possible, organise content as a sequence of diagnostic questions. Tables and facts support the path; they do not replace it.

Use short paragraphs to make educational text easy to scan. Keep one idea per paragraph and separate the core statement, explanation and clinical implication, especially in Merke/CAVE callouts. Use semantic `<p>` elements with visible spacing rather than one dense text block or manual line breaks. Preserve the same paragraph structure in German, English and Persian. Emphasise the important sentences without turning every explanation into a heading or a new card.

## 5. Distinguish knowledge roles visually

Use a small, stable vocabulary of content roles:

- explanation for the core concept;
- key point for what must be remembered;
- warning for a consequential pitfall;
- report example for wording in practice;
- self-check for retrieval and transfer.

Colour is allowed to change between lessons, but the role and visual weight of each element stay consistent.

## 6. Prefer visual evidence over decoration

Images, diagrams, curves, and tables must answer a learning question. Every visual receives a short interpretation or task. Decorative media never competes with the content.

## 7. Make the learner act

Each lesson includes at least one embedded decision, reveal, comparison, or mini-case. The answer produces immediate, explanatory feedback rather than only correct/incorrect status.

## 8. End with compression

The final chapter reduces the lesson to three to five portable rules. These rules should be useful during reporting and exam preparation.

Its visible title is **Take Home Message** in German and English, and **پیام نهایی** in Persian. Use the shared `LessonTakeHome` or `TakeHomeList` presentation with meaningful authored rule text. Do not hide all meaning behind labels such as “Regel 1”, create empty reveals or repeat the same sentence as both title and explanation. A reveal is appropriate when a distinct authored explanation exists. Sources can follow outside the teaching chapter sequence. Preserve essential authored caveats when grouping longer existing summaries.

## 9. Keep the system constant and the palette variable

The reusable system is layout, hierarchy, spacing, navigation, interaction, content roles, accessibility, and responsive behaviour. Palette, accent colour, illustration mood, and limited signature motifs may change per topic.

Use a restrained handwritten or calligraphic accent for short teaching-note labels and the author's signature, following `components/LessonTypography.module.css`. It softens the page without reducing readability. Keep body paragraphs, tables, clinical values, navigation and controls in the standard readable fonts. Use the Persian calligraphic face for RTL labels rather than a Latin cursive fallback, and preserve comfortable size and line spacing on mobile.

## 10. Definition of done

A lesson is ready only when it works in German, English, and Persian; respects RTL; supports keyboard focus; remains readable on mobile; has no horizontal overflow; and its primary interaction has been tested in the browser.
