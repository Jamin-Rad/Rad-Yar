# RadYar educational page principles

These principles are distilled from the strongest existing lessons, especially Mamma MRI lesion characterisation, Meniscus, and Fleischner criteria. They define a reusable learning experience, not a fixed colour palette.

The maintained reference implementation lives at **Andarun → Test** (`/andarun/test`). New educational pages should start from this reference and keep the standard RadYar navbar and footer.

## 1. One clinical promise per page

The title and opening sentence must say what the learner will be able to do. A lesson starts with the diagnostic task, not with a long definition.

## 2. Orientation before detail

The first viewport contains three things only: the topic, the high-value mental model, and the next action. A persistent learning path shows where the learner is and what remains.

## 3. One open chapter at a time

Long lessons use focused accordion chapters. Opening a chapter closes the previous one. The sidebar, URL hash, and chapter state stay synchronised.

Chapters are identified by their own meaningful icon, not by a visible sequence number. The same icon is reused in the chapter header and in the learning path so both navigation surfaces stay visually connected.

## 4. Teach the decision path

Whenever possible, organise content as a sequence of diagnostic questions. Tables and facts support the path; they do not replace it.

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

## 9. Keep the system constant and the palette variable

The reusable system is layout, hierarchy, spacing, navigation, interaction, content roles, accessibility, and responsive behaviour. Palette, accent colour, illustration mood, and limited signature motifs may change per topic.

## 10. Definition of done

A lesson is ready only when it works in German, English, and Persian; respects RTL; supports keyboard focus; remains readable on mobile; has no horizontal overflow; and its primary interaction has been tested in the browser.
