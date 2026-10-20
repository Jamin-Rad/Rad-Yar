# Breast-implant overlap on chest radiography — Thorax.pdf p.27

Scope: one source-bounded pitfall added to the existing `/thorax/roentgen-thorax-systematik` route. Source: user-provided `Thorax.pdf`, physical PDF p.27 / printed p.26. The complete page image was visually inspected.

| Source point | Lesson disposition | Evidence and limits |
| --- | --- | --- |
| Under “Überlagerung: Brustimplantate,” a PA chest radiograph shows paired concentric contours; the caption describes the outer contour as normal breast tissue and the inner contour as the implant capsule. Red arrows point to the lower breast contours. Visible image identifier: rID 26714. | Added one DE/EN/FA card under projection pitfalls. It asks the learner to recognize a projected soft-tissue/implant contour and not call it an intrapulmonary opacity in isolation. | This is a visual-recognition cue from the supplied slide only. No implant integrity, rupture, complication, or mammographic interpretation claim is added. The source figure is not embedded or copied into the lesson. The visible rID is recorded; contributor/site and reuse metadata were not independently verified. |

## Validation and limits

- `node --import tsx scripts/test-thorax-implant-overlap-render.mjs` checks actual-route SSR in DE/EN/FA, Persian RTL, source-page attribution, all three language labels and content, and the existing curriculum linkage.
- Focused verification does not establish browser layout, scientific approval, or coverage of other Thorax.pdf pages.
- Independent delta review passed: the wording matches the source cue and remains limited to overlap on chest radiography; no integrity or rupture claims were added. Browser layout and clinical approval remain open.
