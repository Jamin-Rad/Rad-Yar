# RadYar educational page principles

These principles are distilled from the strongest existing lessons, especially Mamma MRI lesion characterisation, Meniscus, and Fleischner criteria. They define a reusable learning experience, not a fixed colour palette.

The maintained reference implementation lives at **Andarun → Test** (`/andarun/test`). New educational pages should start from this reference and keep the standard RadYar navbar and footer.

## 1. One clinical promise per page

The title identifies the topic or diagnostic task. Every lesson header must include a generated schematic image specific to that topic. Do not reuse an unrelated topic's image. The schematic remains visible on desktop and mobile and must not overlap the title or controls.

Use the shared `components/LessonHero.jsx` for the header, with a required topic image and translated alt text. It deliberately accepts no subtitle or explanatory text. **Do not add a description beneath the title.** Definitions, clinical promises and introductory explanations belong at the beginning of the first chapter. Keep the author/breadcrumb row close to the hero (8px gap), and avoid vertically centering the desktop title in a tall image container; the shared hero positions it 32px below its top edge.

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

Pair the teaching content with meaningful anatomical schematics or decision diagrams. When the learner selects a finding or phase, update the graphic and its explanation together. Keep controls keyboard-operable and provide explicit selected states. Use an illustrative image base for anatomy and code-native overlays for changing findings; preserve the distinction between a schematic and a patient image. Decision simulations must show their qualifying criteria, exclusion paths and explanation, with medical rules covered by focused tests.

## 7. Make the learner act

Each lesson includes at least one embedded decision, reveal, comparison, or mini-case. The answer produces immediate, explanatory feedback rather than only correct/incorrect status.

## 8. End with compression

The final chapter reduces the lesson to three to five portable rules. These rules should be useful during reporting and exam preparation.

## 9. Keep the system constant and the palette variable

The reusable system is layout, hierarchy, spacing, navigation, interaction, content roles, accessibility, and responsive behaviour. Palette, accent colour, illustration mood, and limited signature motifs may change per topic.

Use a restrained handwritten or calligraphic accent for short teaching-note labels and the author's signature, following `components/LessonTypography.module.css`. It softens the page without reducing readability. Keep body paragraphs, tables, clinical values, navigation and controls in the standard readable fonts. Use the Persian calligraphic face for RTL labels rather than a Latin cursive fallback, and preserve comfortable size and line spacing on mobile.

## 10. Definition of done

A lesson is ready only when it works in German, English, and Persian; respects RTL; supports keyboard focus; remains readable on mobile; has no horizontal overflow; and its primary interaction has been tested in the browser.


## Shared navigation and Take Home implementation

Use `useLessonSectionScroll` for chapter selections and summary jumps. Request the scroll with the state change; the hook aligns the chapter header below the fixed navbar after React commits the new layout. Repeated selections must realign the header, rapid selections must cancel older requests, and selecting a chapter never marks it read.

Take Home uses `LessonTakeHome` and the shared `LessonTemplate.module.css`: numbered takeaway rows with concise titles and individually expandable explanations. Its outer panel opens independently of the active chapter, does not belong to the tracked learning path, and does not advance lesson progress.
