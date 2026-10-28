# Universal lesson Book View

The CAA route is the first pilot. No lesson, question bank, image, source reference,
or shared Classic stylesheet is edited by this feature. Both presentations render
one live React tree; the browser fragments it into columns in Book View.

## Integration contract

Wrap a lesson in `LessonViewProvider` with a stable lesson ID and an explicit
`enabled` flag. Render `LessonViewToggle` with `variant="action"` in the existing lesson header
action row, beside Take Home and practice links. Wrap the existing reading tree in `BookView` and pass the localized
lesson title and ordered section IDs/titles. Mark existing outer sections with
`data-book-section` and their expandable body with `data-book-body`. Open those
bodies while `useLessonView().mode === 'book'`; retain the original Classic
expansion state. Route existing section jumps through `navigate(id)` in Book
View. The `book:restore` event identifies the chapter to reopen on returning to
Classic View.

Native CSS fragmentation uses measured column widths and available viewport
height, with no lesson-specific page counts or breaks. Portrait uses a single
page; sufficiently wide landscape uses a two-page spread. Resize, orientation,
font loading, images and interactive content changes trigger measurement. The
first visible content element anchors repagination. View mode is saved per
lesson; `?view=book` is a shareable direct entry.

Mark unusual interactive components `data-book-atomic`. Existing
`data-learning-tool` components, figures, tables, form controls, tab groups and
media are detected automatically. Atomic components stay together. Elements
larger than the reading area have a labeled, keyboard-focusable internal scroll
area, preserving their original size, content and interaction. They are never
cropped or shrunk into illegible thumbnails. Wide tables retain internal
horizontal scrolling. No lesson content is cloned, reparented, serialized into
HTML, rewritten or drawn onto canvas. Text and interactive controls remain DOM
content. Off-page keyboard focus brings its page into view.

Only primary finger swipes on noninteractive reading areas turn pages. Pencil
and mouse input, pinch zoom, image/case viewers, tabs, forms, sliders, editable
areas, selected text and dialogs retain their own interactions. Arrow keys,
Page Up/Down, Home/End, previous/next controls and a position slider navigate the
book. Reduced-motion preferences disable the decorative leaf-turn animation.

## Existing questions

`pilots.js` is presentation configuration. Its explicitly reviewed section-to-ID
mapping contains no educational copy. `BookCheckpoint` selects 1–3 existing
localized bank objects verbatim and uses the original option IDs, correct answer,
explanation and per-option feedback. Missing section mappings, missing questions
or invalid schemas produce no checkpoint. These optional in-book exercises do
not mark sections read or alter the existing scored quiz/progress workflow.
CAA mappings: vessel distribution after Foundations; TFNE after Clinical;
Boston/cSS/PVS after MRI; RCVS/cavernoma after Differentials.

Future lessons can opt into this same engine and add reliable ID mappings without
changing the renderer. Until explicitly enabled, their routes remain untouched.

## Validation

- `node --test scripts/book-view.test.mjs`
- `node --test scripts/caa-*.test.mjs`
- `node --import tsx scripts/test-gehirn-caa-source-p26-p28.mjs`
- `npm run build`

Rendered checks should compare the original and integrated Classic component,
check text/asset/reference order, visit every generated page, exercise existing
tabs, case viewers and read controls, answer a checkpoint, resize between desktop
and iPad orientations, check touch/Pencil/keyboard conflicts, and verify RTL and
reduced motion. Temporary QA routes must be removed before committing/deploying.
Physical Apple Pencil hardware still needs device validation.

## Pilot QA (28 October 2026)

All 45 reader/CAA automated tests and CAA bank wiring checks pass. Rendered QA
used the installed Playwright/Chrome runtime because the Browser plugin was not
available. The original production Classic component and the integrated version
match in section text, asset/reference order, expansion, sizes and spacing; the
mode control is placed in the existing header action row. `ChapterContent` is byte
identical to production. No data, assets, existing learning tools or shared Classic
styles changed.

Browser checks covered every generated desktop page, atomic unit boundaries,
original case selection and image slider, diagram and differential tab keyboards,
original read-progress persistence, checkpoint feedback, view/URL preference,
chapter restoration, off-page focus, finger vs pen input, Persian RTL and reduced
motion. Viewports: 1440×1000, 820×1180, 1180×820, 1024×768 and 390×844. No runtime
errors or framework overlay; console warnings were limited to the existing local
Clerk development-key notice. An unrelated fixture confirmed long paragraphs,
a tall image/caption, an 80-row table with the last row accessible, expandable
content, preserved input state after resize, and a one-page lesson in a spread.

QA rendered the actual lesson component in temporary routes under the real root
layout; production access gates were not bypassed or changed. Authenticated
cross-device server sync was not exercised. The installed runtime has no WebKit
binary: Safari, physical iPad touch and Apple Pencil require device validation.
