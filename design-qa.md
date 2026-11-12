# Rechner visual QA

final result: passed

Scope: selected Orbit concept with the user's explicit amendments: shared RadYar header/footer, both themes, no question/top search, no right-side Alle Rechner link, calculator selection from the specialty list, typo-tolerant search opened from the dock.

## Evidence
- Dark source: C:/Users/Drham/.codex/generated_images/01a1d1ca-5bdb-7a11-873d-529731be6da9/exec-80e34b4c-dd76-4510-817e-143b3161f533.png
- Light revised source: C:/Users/Drham/.codex/generated_images/01a1d1ca-5bdb-7a11-873d-529731be6da9/exec-977d1001-a245-4963-a946-e2724f0a00ad.png
- Browser evidence directory: C:/Users/Drham/.codex/visualizations/2026/11/12/01a1d1ca-5bdb-7a11-873d-529731be6da9/rechner-qa
- Final screenshots: dark-final.jpg, light-final.jpg. Full-view paired comparisons: dark-final-comparison.png and light-final-comparison.png (source left, rendered app right).
- Responsive evidence: mobile-dark.jpg, mobile-light-final.jpg, mobile-fa-final.jpg.
- Browser: Codex in-app browser, http://127.0.0.1:3012/rechner. Desktop CSS viewport 1440x1024; mobile 390x844. Browser full-page export 1424x1042 excludes the scrollbar. Source images 1487x1058. Paired comparisons resize each proportionally to 720 pixels wide, without warping. Full-height differences include the real shared footer and requested removal of the heading.
- State: German, Urogenital selected, light/dark. Persian responsive layout also checked.

## Comparison history
1. P1 distorted/clipped sprite anatomy: replaced the strip with seven independently generated transparent assets, maintaining aspect ratio; added reference-style glass pedestals. Confirmed complete loading of all seven assets.
2. P2 hierarchy and glass styling: corrected right column width, heading/card type scale, dock width, organ positions, teal lighting, selected state and panel highlights. Inspected successive full-page captures and paired comparisons.
3. P2 long German calculator name caused horizontal list overflow: constrained grid tracks and wrapped long labels. Rechecked Herz & Thorax; clientWidth and scrollWidth both 472.
4. P1 shared header hydration mismatch: Clerk's cached loaded state differed from SSR. Added a mount guard while retaining the existing sign-in fallback. Reloaded and verified no new error logs after the fix.
5. P2 enlargement of the active organ touched the drag hint: reverted that enlargement and recaptured both themes. Final paired images show separation.

## Required fidelity surfaces
- Typography: existing Manrope, strong sans headings, readable labels and descriptions. Long labels wrap. Shared header/footer intentionally retain RadYar's existing typography.
- Layout: orbital menu left, selected specialty list right, centered lower dock. Responsive stacking and no horizontal page overflow at 390 CSS pixels.
- Color: deep navy/cyan dark mode and pale blue/navy light mode. Existing shared header/footer remain their own site theme styles.
- Assets: independent cyan glass anatomy and pedestals, bladder/prostate and pelvis thumbnails, ambient background. Transparent WebP assets preserve the artwork and reduce transfer size. These are rendered 3D illustrations animated in the UI, not live volumetric/WebGL models.
- Copy: rejected question, top calculator-search field, and right-side Alle Rechner link removed. Real calculator titles and destinations retained. Dock opens functional search.
- Focused checks: full-resolution browser captures inspected organ edges, labels, right-card icons/type, center hint separation and long-title overflow in addition to paired overview comparisons.

## Interaction checks
Passed: category click, category rotation and selected state, previous/next controls, ArrowLeft keyboard navigation, drag across empty orbit surface, typo queries fleishner/prosttaa, no-results query, Escape and focus return, theme switch, German/Persian switch, PSA link navigation to its actual calculator page.
Passed: scripts/test-rechner-search.mjs (typos, transposition, Arabic/Persian normalization, exact matches, aliases, group boundaries, shared categories, empty query and no results).
Passed: page identity, meaningful content, no framework error overlay after fix, all scene assets loaded, no new app console errors after fix, git diff --check. Development Clerk warning and local development badges remain; production authentication and a full-site production build were outside this page verification.

## Remaining differences
P3: regenerated anatomical illustrations, lighting and existing arrow icons are faithful to the concept but are not identical raster pixels to the generated mock. Header/footer differ intentionally because the user required the actual site components. Local Next/Clerk development badges are visible only in the development preview captures. No actionable P0/P1/P2 findings remain for the amended concept.
