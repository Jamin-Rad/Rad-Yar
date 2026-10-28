# Universal lesson presentation view

CAA is the only enabled pilot. The reader now presents one automatically
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

All widths and orientations use one slide. The engine measures available canvas
height and width, then uses native CSS fragmentation; no lesson-specific page
counts, section layouts or hardcoded page breaks exist. Resize, orientation,
loaded media/fonts and component changes trigger pagination around the current
content anchor. A clear slide counter, position slider and large Previous/Next
buttons remain outside the canvas and inside the viewport.

The header action requests native fullscreen synchronously during its click,
using the app's existing standard/WebKit fullscreen helpers. Direct links and
restored preferences cannot request browser fullscreen without user activation;
they still open the immersive viewport, with a Fullscreen button when supported.
If the API is unavailable or rejected, the viewport presentation remains usable.
The top toolbar provides Windowed/Fullscreen and Back to lesson controls. Escape
returns to the lesson; leaving an owned native fullscreen session through browser
Escape also restores Classic. Exiting only the native fullscreen through the
Windowed button keeps the immersive presentation open. The reader only exits
native fullscreen it requested itself, unless the user explicitly presses the
Windowed control.

The viewport covers page navigation and background UI, locks background scrolling
and restores it on exit, and retains the existing higher image/dialog overlays.
It is exposed as a modal dialog; keyboard focus stays inside until exit. The same
live content nodes preserve their interactive state. No cloning, HTML rewriting,
canvas snapshots or React content reparenting occurs.

Arrow keys, Space/Shift+Space, Page Up/Down, Home/End, the slider and Previous/Next
navigate individual slides. Existing form, tab, image/case viewer and nested modal
keyboard controls keep their own input. Primary finger swipes on reading areas
navigate; pen/mouse, pinch zoom and interactive component gestures retain their
original behavior. Reduced motion disables the subtle slide transition.

## Content and questions

Mark unusual interactive components `data-book-atomic`. Existing learning tools,
figures, tables, media, forms and tab groups are detected automatically and stay
intact. Oversized units use a labeled, keyboard-accessible internal scroll area;
large tables retain horizontal scrolling. No content is clipped or discarded.
Off-page keyboard focus brings the corresponding slide into view.

`pilots.js` contains only feature flags and explicitly reviewed question-ID
mappings. `BookCheckpoint` uses 1–3 original localized question objects verbatim,
including options, correct answer, explanation and per-option feedback. Missing
mappings/questions are skipped. In-view exercises do not change the existing
scored quiz or read-progress workflow. Current CAA mappings cover vessel
location, TFNE, Boston/cSS/PVS, RCVS and cavernoma.

## Validation

- `node --test scripts/book-view.test.mjs scripts/caa-*.test.mjs`
- `node --import tsx scripts/test-gehirn-caa-source-p26-p28.mjs`
- `npm run build`

Browser QA uses installed Playwright/Chrome (Browser plugin unavailable). It
covers the real CAA component under its normal root layout through temporary
local QA routes; production access gates stay unchanged and QA routes are removed
before deployment. Checks include real native fullscreen entry/exit, fullscreen
API fallback, every generated slide and atomic-unit boundary, source text/asset
fidelity, existing tabs/case slider/image zoom, original MCQ feedback, view and
chapter restoration, background scroll restoration, keyboard/Space navigation,
touch versus pen/control handling, RTL and reduced motion. Viewports include
1440×1000, iPad 820×1180 / 1180×820 / 1024×768 and phone 390×844.

The installed browser runtime has no WebKit binary. Physical iPad Safari and
Apple Pencil behavior, and authenticated cross-device server sync, still require
device/account validation. Native fullscreen availability depends on the browser;
the immersive viewport fallback does not hide unsupported browser chrome.
