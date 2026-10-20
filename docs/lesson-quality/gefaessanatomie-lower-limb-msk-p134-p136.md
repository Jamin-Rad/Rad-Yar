# Gefäßanatomie der unteren Extremität — MSK.pdf pp. 134–136

**Route:** `/gefaesse/anatomie-untere-extremitaet`

**Exact existing curriculum ID:** `gefaessanatomie-kollateralen` (linked as `inProgress`)

**Audience and promise:** radiology learners; trace the named lower-limb arterial pathway from external iliac artery to the dorsal and plantar foot and recognize its major branches.
**Status:** exact curriculum ID is linked as `inProgress`; independent delta review now passes after correcting plantar-arch topology. Browser QA and clinical sign-off remain open. No publication or scientific-release approval implied.

## Source coverage

| ID | Source and page | Source point | Importance | Lesson location | Status / note |
|---|---|---|---|---|---|
| ALA-SRC-01 | `MSK.pdf`, physical p.134 / printed p.133 | Pelvic and thigh arteries: external iliac, common femoral, deep and superficial femoral arteries, circumflex/perforating branches and genicular network | Essential | `start`, `pelvis-thigh`, pathway schematic | Covered; the route transitions and branch relations are cross-checked against NCBI Bookshelf anatomy references. Smaller branches are named in the source note but not all drawn. |
| ALA-SRC-02 | `MSK.pdf`, physical p.135 / printed p.134 | Posterior/anterior lower leg, popliteal artery, anterior tibial artery, tibioperoneal trunk, posterior tibial/fibular arteries, dorsalis pedis and dorsal foot branches | Essential | `leg`, `foot`, schematic | Covered; simplified pathway, not to scale. |
| ALA-SRC-03 | `MSK.pdf`, physical p.136 / printed p.135 | Plantar vessels: posterior tibial continuation, medial/lateral plantar arteries, plantar arch and metatarsal/digital branches | Essential | `foot`, schematic | Covered. The schematic now draws separate medial and lateral plantar branches; only the lateral branch continues to the arch, which also receives the dashed deep plantar connection from dorsalis pedis. The general arrangement is supported by the external anatomy reference; individual variants are not implied. |
| ALA-SRC-04 | `MSK.pdf`, physical p.135 / printed p.134 | TeachMeAnatomy watermark on external diagram | Visual/provenance constraint | Media plan | Not embedded. A new code-native pathway graphic replaces the source image; no source-page image, contributor attribution or third-party licence is claimed for the new graphic. |

## Learning path

1. Start with one proximal-to-distal route.
2. Follow the thigh branches and transition through the adductor hiatus.
3. Distinguish the anterior tibial artery from the tibioperoneal trunk and its branches.
4. Compare dorsal and plantar foot supply, then retrieve one branch relation in a short self-check.

The lesson remains an anatomy orientation. It does not teach PAD, stenosis, occlusion, CTA/DSA interpretation, pulse examination or treatment.

## Visual and terminology plan

- **Hero visual:** original abstract SVG arterial branching, non-diagnostic and topic-specific.
- **Chapter visual:** original, numbered SVG branching map. It is a non-diagnostic flow diagram and deliberately avoids anatomic scale, patient imagery, or the watermarked source figure. A localized HTML key identifies each number in German, English and Persian. The plantar split and arch relationship are now explicit in the SVG and in the localized alt/caption text.
- **Self-check:** choose the named continuation of the anterior tibial artery on the dorsum; reveal explanatory feedback for either response.
- **Terminology:** A. iliaca externa / external iliac artery / شریان ایلیاک خارجی; A. femoralis communis / common femoral artery / شریان فمورال مشترک; A. profunda femoris / deep femoral artery / شریان فمورال عمقی; A. femoralis superficialis / superficial femoral artery / شریان فمورال سطحی; A. poplitea / popliteal artery / شریان پوپلیته‌آل; Truncus tibiofibularis / tibioperoneal trunk / تنهٔ تیبیوپروونئال; A. tibialis anterior/posterior / anterior/posterior tibial artery / شریان تیبیال قدامی/خلفی; A. fibularis / fibular artery / شریان فیبولار; A. dorsalis pedis / dorsalis pedis artery / شریان دورسالیس پدیس; Aa. plantares / plantar arteries / شریان‌های پلانتار; Arcus plantaris / plantar arch / قوس پلانتار.

## Verification evidence

- Source pages 134–136 were rendered and visually inspected at full page resolution. The labelled anatomy and distinction between dorsal/plantar figures were directly checked.
- The common-femoral split, popliteal-to-tibial route, and dorsal/plantar foot continuities were checked against NCBI Bookshelf: [Arterial supply of the lower extremities](https://www.ncbi.nlm.nih.gov/books/NBK27342/) and [Foot arteries](https://www.ncbi.nlm.nih.gov/books/NBK560912/).
- Both SVG assets are newly authored. The chapter map does not reuse the PDF's external TeachMeAnatomy drawing.
- Focused SSR test: `node scripts/test-lower-limb-arterial-anatomy.mjs` (PASS after topology correction).
- `git diff --check` scoped to the lesson files (result recorded after execution).
- Independent delta review verified the medial/lateral plantar bifurcation, lateral-only path to the arch, deep plantar connection and localized key/caption. Focused SSR asserts these relationships across DE/EN/FA.
- Browser responsive/RTL interaction QA and clinical specialist sign-off remain outstanding.
