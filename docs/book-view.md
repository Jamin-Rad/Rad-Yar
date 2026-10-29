# Universal lesson presentation view

CAA and the five contrast-media lessons are enabled. The reader presents one automatically
paginated slide at a time in an immersive viewport. Both Classic and presentation
render the same live React tree. Lesson text, images, references, tables, question
banks and the existing interaction components are unchanged.

## Integration

Wrap a lesson in `LessonViewProvider` with a stable lesson ID and an explicit
`enabled` flag. Render `LessonViewToggle` with `variant="action"` in its existing
header action row beside Take Home and practice links. Wrap the existing reading
tree in `BookView`; supply the localized title and ordered section IDs/titles.
Mark outer sections `data-book-section` and expandable bodies `data-book-body`.
Keep those bodies open while `useLessonView().mode === 'book'`, preserving the
original Classic expansion state. Route section jumps through `navigate(id)` in
presentation mode. The `book:restore` event reopens the current Classic chapter.

The internal `book` mode and per-lesson preference key remain compatible with the
initial pilot. `?view=presentation` is the current direct link; `?view=book` still
works. `?view=classic` explicitly opens the original lesson.

## Presentation and fullscreen

All widths and orientations use one slide. `semanticSlides.mjs` reads the live
DOM's sections, headings, teaching groups and interactive tool boundaries. A tool
keeps its introduction and following explanatory notes; the next topic starts a
new slide. Viewport size never determines content boundaries, so orientation
changes preserve the same topic and slide count. There are no lesson IDs, page
counts, size thresholds or hardcoded page breaks in the planner.

Existing wrapper elements become transparent only in presentation mode. The
engine assigns the original content elements to slides and changes their CSS
visibility without moving, cloning or remounting them. Hidden interactive panels
keep their original visibility. If a topic is taller than the canvas, the whole
slide scrolls vertically instead of splitting its explanation or truncating its
media. Only one scroll surface is introduced. A compact glass toolbar holds the
chapter selector, fullscreen and exit controls. The 52px glass navigation dock
contains 44px Previous/Next targets, a slide counter and a 2px progress line; no
persistent range slider or large navigation panel consumes the canvas.

The header action requests native fullscreen synchronously during its click,
using the app's existing standard/WebKit fullscreen helpers. Direct links and
restored preferences cannot request browser fullscreen without user activation;
they still open the immersive viewport, with a Fullscreen button when supported.
If the API is unavailable or rejected, the viewport presentation remains usable.
The top toolbar provides Windowed/Fullscreen and Back to lesson controls. Escape
returns to the lesson when already windowed. Leaving native fullscreen through
browser Escape, system gestures or application switching keeps the presentation
open on the same slide, with its scroll position and view preference preserved.
Exiting only the native fullscreen through the
Windowed button keeps the immersive presentation open. The reader only exits
native fullscreen it requested itself, unless the user explicitly presses the
Windowed control.

The viewport covers page navigation and background UI, locks background scrolling
and restores it on exit, and retains the existing higher image/dialog overlays.
It is exposed as a modal dialog; keyboard focus stays inside until exit. The same
live content nodes preserve their interactive state. No cloning, HTML rewriting,
canvas snapshots or React content reparenting occurs.

Left/Right arrows, Home/End and Previous/Next navigate individual slides.
Space/Shift+Space, Up/Down and Page Up/Down scroll a long topic before advancing
at its boundary. Existing form, tab, image/case viewer and nested modal keyboard
controls keep their own input. Tablet/desktop slides have explicit 48×96px
Previous/Next touch targets in
reserved side gutters; compact footer controls remain available at every width.
Their physical positions and arrows follow the lesson's reading direction.
Tapping the middle of a slide does not navigate.

Primary finger swipes on reading areas and non-interactive card text navigate.
A native touch listener locks the initial axis: vertical movement always remains
reading scroll, while a deliberate horizontal swipe turns one slide. Only that
horizontal movement cancels browser panning. Whole learning cards are no longer
excluded from swiping. Actual buttons, question-option labels, inputs, tables,
images, image/case viewers and custom `data-book-gesture-ignore` regions keep
native gestures. Multi-touch, selection, cancelled gestures, pen/mouse input and
pinch zoom cannot trigger a slide turn. A completed swipe suppresses its trailing
compatibility click so a new slide cannot accidentally receive it. Reduced motion
disables the subtle slide transition.

## Content and questions

Mark unusual interactive components `data-book-atomic`. Existing learning tools,
figures, tables, media, forms and tab groups are detected automatically and stay
intact. Semantic HTML headings and sections supply topic structure for future
lessons; `data-book-slide` can explicitly preserve an unusual standalone unit.
Original tables, images, captions and explanations remain reachable through the
slide's scroll surface. No content is clipped or discarded.

Each mapped question is a standalone slide containing only that original
question, its options and its own feedback. Adjacent questions, lecture text,
chapter headings and read-progress buttons never share that slide.

`pilots.js` contains only feature flags and explicitly reviewed question-ID
mappings. `BookCheckpoint` uses 1–3 original localized question objects verbatim,
including options, correct answer, explanation and per-option feedback. Missing
mappings/questions are skipped. In-view exercises do not change the existing
scored quiz or read-progress workflow. Current CAA mappings cover vessel
location, TFNE, Boston/cSS/PVS, RCVS and cavernoma.

## Standard lesson integration and contrast media

`StandardLessonShell` opts in only when its stable lesson ID is in the feature
registry. The four contrast group pages keep their existing read IDs; the
ultrasound reference shell keeps `ref-kontrastmittel-ultraschall`. Other standard
lessons keep their original Classic tree and receive no presentation controls.
The action sits beside Take Home, MCQ and flashcards. Open chapter and original
self-check state survive switching views; read-progress controls stay outside the
presentation. References are retained on a final slide.

Existing card comparisons and workflow lists use `data-book-group` to remain
intact while allowing text-area swipes; interactive tools keep `data-book-atomic`.
`data-book-note` retains a warning's styling with its related topic, rather than
flattening it into loose paragraphs. `data-book-heading` marks an existing
accordion title without rewriting its Classic markup. `data-book-ignore` excludes
read-progress UI only. Tables retain their own horizontal scroll container and
keyboard focus; marked image galleries use natural aspect ratios in presentation.
These are reusable semantic annotations, never lesson-specific page breaks.

Reviewed contrast mappings use original question IDs with a `{lang}` placeholder.
They cover agent classes and injection concepts, reactions, thyroid and GI use,
chelation, NSF, retention, liver agents, Buscopan, renal protection, dialysis,
metformin, pregnancy/lactation and CEUS. No question text or answer is copied or
changed. Topics without a reliable existing mapping add no checkpoint.

The contrast QA run compares the complete original body text and image URLs/alts
between views in DE/EN/FA. All 91 slides (including original self-checks and
mapped question-only slides) were traversed at desktop and iPad portrait sizes.
Additional checks cover landscape/phone layout, original MRI image zoom, RTL
keyboard navigation, question feedback/state, Classic chapter/answer restoration,
and fullscreen/windowed preservation. Temporary local routes exercise the real
components under the root layout and are removed before publishing. Physical
iPad Safari/Pencil and authenticated account sync still need device validation.

## Validation

- `node --test scripts/book-view.test.mjs scripts/caa-*.test.mjs`
- `node --import tsx --test scripts/contrast-book-view.test.mjs`
- `npm run test:technik-contrast-hero`
- `npm run test:technik-pregnancy-p131`
- `node --import tsx scripts/test-gehirn-caa-source-p26-p28.mjs`
- `npm run build`

The original CAA browser QA used installed Playwright/Chrome (Browser plugin
unavailable); contrast rollout QA uses the Codex in-app browser. CAA QA covered
the real CAA component under its normal root layout through temporary
local QA routes; production access gates stay unchanged and QA routes are removed
before deployment. Checks include real native fullscreen entry/exit, fullscreen
API fallback, every semantic slide and source-text coverage, source text/asset
fidelity, existing tabs/case slider/image zoom, original MCQ feedback, view and
chapter restoration, background scroll restoration, keyboard navigation and
overflow scrolling,
native CDP touch versus pen/control handling, swipe cancellation and axis lock,
fullscreen-exit preservation, RTL and reduced motion. Viewports include
1440×1000, iPad 820×1180 / 1180×820 / 1024×768 and phone 390×844. An unrelated
generic fixture checks section boundaries, an
80-row table with its explanation, a tall image/caption and isolated questions.

The installed browser runtime has no WebKit binary. Physical iPad Safari and
Apple Pencil behavior, and authenticated cross-device server sync, still require
device/account validation. Native fullscreen availability depends on the browser;
the immersive viewport fallback does not hide unsupported browser chrome.
