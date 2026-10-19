---
name: radyar-lessons
description: Build or revise RadYar radiology lessons from supplied sources, or independently review their teaching structure, visuals, translations, linked assessments and rendered behavior. Use for lesson work, not unrelated application development.
---

# RadYar lesson author and quality reviewer

Project-scoped Codex specialists are available under `.codex/agents/`:
`radyar_lesson_builder` coordinates authoring, `radyar_pdf_mapper` inventories
PDF batches, and `radyar_lesson_reviewer` performs independent read-only QA.
For batch PDF work, use the mapper for the page-level source map and the reviewer
after implementation; keep the author and reviewer roles separate.

CAA is a teaching-quality reference, not a list of required section names.
`/andarun/test` is a layout and interaction reference, not a content outline.
Never copy a chapter title such as `Befund & Selbsttest` as a default. Derive
chapter titles from the source, learning goals, and a stated instructional purpose.
Report examples, self-checks, and take-home points may sit inside relevant
chapters; give them a standalone chapter only when the lesson warrants it.

Read `../../docs/lesson-quality/standard.md` and the existing
`../../docs/educational-page-design-principles.md`. For an audit, also read
`../../docs/lesson-quality/review-template.md`. The baseline evidence is in
`../../docs/lesson-quality/baseline-review.md`; it is not scientific validation.

## Select the role

- **Author:** map sources, design the learning path and media plan, implement the
  scoped lesson, translate, and gather validation evidence.
- **Independent reviewer:** inspect the actual artifacts and sources afresh; return
  evidence and required fixes using the review template. Do not silently rewrite
  the artifact under review or rely on the author's claimed pass.
- **Coordinator:** assign bounded work and consolidate findings. Use a separate
  reviewer agent when the user has authorized delegation, as in this lesson
  workflow. Without delegation, explicitly label review as self-review and leave
  independent acceptance pending. Never create sidebar chats for subtasks.

This is a reusable repository workflow, not a continuously running service.
Root `AGENTS.md` routes relevant future repository tasks here. No custom model,
scheduled run, external publication or platform-wide skill installation is implied.

## Authoring contract

1. Inspect the actual route, imports, curriculum entry, assessments, translations
   and assets. Active CAA prose is `data/caaLesson.js`; `data/caa.js` also contains
   older prose and the connected training bank. Follow consumers before editing.
2. With supplied PDFs, inspect both text and page images where tables, diagrams,
   OCR or reading order matter. Record source file and PDF page; never claim full
   coverage of an unreadable or unavailable source. Use the PDF skill if available.
3. Produce a source coverage ledger, a concise chapter outline and a visual plan
   before implementation. Distinguish essential, optional, duplicate and unresolved
   points. Keep essential caveats even when shortening.
4. Follow the CAA teaching sequence when appropriate, not its disease-specific
   six-chapter outline mechanically. Reuse the maintained shared lesson shell.
   Paragraph length and chapter count are editorial guidance, not clinical rules.
5. Prefer a canonical typical teaching case for first exposure, then a labelled
   counterexample. Inspect the actual case/study/frame before claiming it shows a
   feature. Record source, attribution, reuse terms and selection rationale.
   Missing access is an unresolved visual requirement, never an invented URL or
   an AI-generated diagnostic scan. Follow the image-generation skill when making
   a topic hero; use code-native diagrams for precise explanatory graphics.
6. Translate with a shared terminology table and compare semantic units across
   DE/EN/FA, including assessment explanations and accessibility labels.
7. Validate only affected surfaces: source coverage, assessment consistency,
   translations, assets and relevant build checks; then browser desktop/mobile,
   languages, themes and interactions. Never change access gates to obtain a pass.
8. Hand artifacts and the evidence ledger to the independent reviewer. Apply
   supported fixes and request re-review of those fixes and affected dependencies.
   Stop after three unsuccessful repair cycles and report remaining issues.

## Reviewer contract

Review against gates SRC, EDU, VIS, LNG, ASM, UX and REV in the standard. Every
finding needs a stable issue ID, severity, file/key or source/page, observed
problem, learner impact, required correction, and retest evidence. Check linked
MCQs and flashcards, not just the lesson route. Check translation omissions as
well as wrong words. Audit visual teaching value, not merely image presence.

For scientific criteria and thresholds, read the provided source and verify
against an appropriate primary source when needed. Distinguish a demonstrated
error from a claim awaiting verification. Do not give a clinical correctness pass
from memory or from the existing lesson itself.

Use PASS / REVISE / BLOCKED / NOT_APPLICABLE per gate. Missing required source
evidence (including PDFs when they are the declared source), inaccessible required
cases, absent browser evidence or missing clinical verification block the relevant
checks. When defects and missing evidence coexist, use REVISE for the gate and
record evidence blockers separately; overall acceptance still cannot pass. Use
BLOCKED when essential evidence is missing without a demonstrated defect. Explain
any NOT_APPLICABLE. An overall technical/editorial PASS does not imply Dr. Zia's
scientific approval or production publication.

For standards-only work, audit representative lessons and record limitations;
do not bulk rewrite lessons or mark them complete. For a PDF pilot, complete one
lesson and independent review before generalizing changes to the rest of the bank.
