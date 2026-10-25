# AVM19 — full original assessment pool frozen for independent review

Route `/gehirn/vaskulaer/avm-zns`. Author scope: `data/avm.js` and `app/gehirn/vaskulaer/avm-zns/page.js`. The entire original 12-question/15-card pool was read in DE/EN/FA, with targeted substantive revisions. All question/card IDs, original correct keys/positions and counts remain unchanged. Shared aggregate banks, unrelated WIP, access controls and assets were not edited. Root owns global integration, build, browser verification and publication.

Five observable goals map actual IDs to reading ranges in `packet19-avm-sources.json`; the pre-edit chapter outline/media plan is `packet19-avm-plan.md`. No duplicate bank or item quota was added. All 36 localized questions have three specific incorrect-answer feedback entries (108 total), and all cards have sources. Text vignettes state their clinical facts and do not claim an unseen supplied image.

Substantive changes: report feeder/nidus/drainage rather than isolated name recall; motor-event pattern and acute initial bleed assessment; plausible modality and vascular-pattern alternatives; maximum diameter and any deep drainage component, including mixed outflow; eloquent-region interpretation; flow voids and susceptibility findings as contextual evidence; AVM versus dAVF/proliferative angiopathy/cavernoma; surgical grade versus later-bleed predictors; delayed radiochirurgical obliteration and persistent latency risk; targeted/adjunctive/selected definitive embolization; observation and the bounded ARUBA adult/unruptured findings. No grade automatically orders a treatment.

Teaching parity remains within the existing eight chapters. Narrow revisions address the same concepts, add five objectives in chapter 1 and a source footer, and reuse registered questions 09, 08 and 10 as inline checks in the grading, imaging and management chapters. The source-limited rID74111 case object is exactly unchanged from pre-author WIP. The prior trilingual T1 label and both translated route consumers are preserved by assertions. No new frame, clinical history, angiographic grade or media permission is inferred.

Fresh PDF coverage is physical pages 37/38, printed 36/37. Both extracted text and actual rendered images were read. The ledger accounts for every relevant spread point, including the PDF's population figures and simplified management annotations: these are explicitly qualified rather than silently promoted to individual risk or therapy rules. Primary reading ranges and direct-access/indexed-source limitations are recorded. This is not a whole-PDF or whole-paper read claim.

Review inputs:

- `packet19-avm-sources.json`: five goals with actual DE/EN/FA IDs, physical/printed page coverage, primary readings, qualifications, glossary and media boundaries.
- `packet19-avm-runtime.json`: exact producer/route SHA256, original IDs/keys/counts, specific feedback, WIP guards and actual test scope.
- `packet19-avm-teaching-delta.json`: 58 runtime leaf/object/array delta entries against pre-author working tree, including added source/objective arrays as entries.
- `packet19-avm-assessment-delta.json`: 285 question and 95 card runtime delta entries, exact before/after values.
- `tmp/assessment-quality/packet19-avm-actual-pool.json`: convenient current runtime export; reviewer should also read actual producer/route afresh.
- `tmp/assessment-quality/avm19-before.js` and `avm19-route-before.js`: pre-author working-tree snapshots. Separate `avm19-head.js`/`avm19-route-head.js` preserve the permitted read-only HEAD comparison.
- `tmp/assessment-quality/brain-next-pdf/avm-37.png` and `avm-38.png`: freshly rendered source pages actually seen.

Actually tested: isolated full-pool imports with retained IDs/keys/card metadata, all option sets and correct keys, all specific incorrect feedback, trilingual card fields/sources, exact preservation of the case/WIP, five objectives, eight chapters and three correctly wired inline IDs; existing `node scripts/test-gehirn-avm-p37-p38.mjs`; `node --check data/avm.js`; bounded `git diff --check` (read-only, explicitly permitted). Node emitted its existing package-module-type warning; the focused checks passed. No build/server/browser or git mutation was run.

| Gate | Author evidence state and remaining scope |
|---|---|
| SRC | Relevant PDF spread text/images and listed primary ranges read; independent scientific review pending |
| EDU | Five mapped goals, original item counts and eight existing chapters; separate editorial review pending |
| ASM | Isolated producer and focused structural checks pass; root's global registry/runtime integration pending |
| LNG | Entire Q/card triads and affected teaching compared by author; independent parity and rendered RTL pending |
| VIS | Existing patient media/schema/hero retained; no fresh whole-route diagnostic-image/frame acceptance claimed |
| UX | No author browser, viewport/theme/locale/interaction/access test; root owns bounded browser evidence |
| REV | Separate read-only full-pool review requested through root; author checks do not establish independence |

Scientific approval remains **pending Dr. Zia**. No publication action by this author. This packet does not establish whole-route, whole-media or whole-PDF acceptance.
