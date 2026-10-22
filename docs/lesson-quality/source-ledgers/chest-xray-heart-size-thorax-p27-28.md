# Thorax cardiac silhouette magnification — Thorax.pdf pp.27–28

Scope: integrate the existing chest-radiograph lesson with the exact curriculum ID `herzgroesse-roentgen`; do not create a new lesson or chapter. Source pages were visually reviewed. Physical p.28 (printed p.27) contrasts PA and AP projection, detector proximity, and apparent cardiac magnification. Physical p.27 includes the adjacent technical-quality material.

| Source point | Lesson disposition | Evidence and limits |
| --- | --- | --- |
| PA places the heart closer to the detector; AP places it farther away, causing geometric magnification of the cardiac silhouette. | The existing `PA oder AP?` section states this in DE/EN/FA and advises considering projection when comparing apparent size. Quiz and flashcard practice ask the learner to interpret the projection effect. | No cardiothoracic ratio cutoff or diagnostic threshold was added. This focused integration does not establish clinical approval. |

Curriculum ID `herzgroesse-roentgen` links to `/thorax/roentgen-thorax-systematik#projection`, a topic-filtered quiz, and a flashcard topic. Quiz/card return paths point back to the `#projection` anchor. No new imaging visual was needed: the learning objective is geometric projection context, not case-image recognition.

## Validation and limits

- `node --import tsx scripts/test-thorax-heart-size-assessment.mjs` verifies localized route rendering, exact curriculum and topic registration, tagged MCQ, flashcard, and return-anchor links.
- `npm run audit:mcq` passed: 763 questions and 18 cases per language, with valid answer mappings and explanations.\n- Production build reached compilation but failed in this restricted worktree: Google Fonts DNS lookups (`fonts.googleapis.com`, `ENOTFOUND`) and `EPERM` creating `.next/server/app/api/admin`. Treat build status as blocked by environment, not as a source-code pass.\n- The local route could not be loaded in a browser: the environment denied socket access to `localhost:3011`; only localized actual-route SSR was available.
- Independent delta review: UX-01 duplicate heading resolved; source/education/language/assessment gates passed. Reviewer could not verify browser appearance; real-browser and production-build evidence remain blocked. Clinical approval remains with Dr. Zia.
