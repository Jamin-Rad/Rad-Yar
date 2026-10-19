# ALARA, CT dose optimization and interventional 3A · Technik.pdf pp. 10–15

Status: bounded source/technical/editorial review PASS after independent repair retest. Exact curriculum items are linked
to `/technik/grundlagen#optimierung`, `/technik/grundlagen#ct-dose-geometry` and
`/technik/grundlagen#intervention-3a` with `inProgress`. This update reuses the
existing fundamentals page, separates ALARA/protocol decisions from CT geometry, and does not
repeat the radiation-protection law or dosimetry lessons on pp. 5–9 and 16–24.

## Learning path

1. Connect ALARA to justified, task-specific imaging and sufficient diagnostic quality.
2. Apply a focused CT optimization path: scan extent, centering, protocol and reconstruction.
3. Distinguish collimation, pitch, overbeaming and overranging, and avoid a universal
   pitch-to-dose shortcut.
4. Apply the 3A staff-protection model to interventional geometry and recognize
   patient-protection actions that also reduce scatter to staff.

## Source coverage ledger

| ID | PDF page / printed folio | Source content | Disposition in lesson |
|---|---|---|---|
| OPT-01 | p.10 / folio 9 | Practical CT dose reduction: positioning, metal, centering, scan length, tube-current modulation, low kV, iterative reconstruction | Covered as a compact protocol decision table. No percentage savings or fixed kV claims. Centering and task-specific positioning are retained. The PDF's blanket metal-removal suggestion is deferred; no generalized removal directive or dose-savings claim is taught. |
| OPT-02 | p.10 / folio 9 | Dual-energy virtual non-contrast and stated dose savings / contraindications | Deferred. Whether a true native phase can be omitted depends on the diagnostic task, protocol and material decomposition. The page’s numerical savings and blanket TACE/EVAR claims need protocol-specific evidence and are not generalized. |
| OPT-03 | pp.10–11 / folios 9–10 | Low-dose CT use and listed sinus, lung, urinary stone and appendix examples; smoking-screening age/pack-year statement | The principle “use a low-dose technique only when it still answers the defined task” is included. Indication lists and the smoking-screening criteria are excluded because they are jurisdiction- and guideline-sensitive and not required for this short optimization decision path. |
| OPT-04 | p.11 / folio 10 | Collimation to limit field; shorter scan range; modulation; iterative reconstruction; anti-scatter grids | Scan extent, collimation, AEC and reconstruction are covered. The grid subsection is deferred: grids are primarily a projection-imaging method and their dose/image trade-off requires a separate modality-specific explanation. The PDF’s reference to older/special CT systems is not generalized to current CT. |
| OPT-05 | p.12 / folio 11 | Z-axis collimation and image-quality/noise trade-off; linear and 180/360-degree helical interpolation | Collimation trade-off is covered without universal narrow-is-better advice. The named interpolation algorithms are recorded but deferred: vendor implementation and reconstruction geometry require a dedicated CT reconstruction lesson; no unsupported ranking of algorithms is taught. |
| OPT-06 | p.13 / folio 12 | Pitch definition and dose/image-quality statements; over-ranging and proposed mitigations | Pitch definition is included with explicit caveat that dose response depends on scanner/AEC implementation. Overranging is distinguished from overbeaming; adaptive collimation and short-range axial acquisition remain vendor-/task-specific options, not prescriptions. The PDF’s blanket claim that pitch >2 causes gaps is omitted as an unsupported universal setting rule. |
| OPT-07 | p.14 / folio 13 | Overbeaming: beam penumbra extends beyond active detector rows; geometric inefficiency | Included with a code-native schematic and separate comparison to over-ranging. The diagram is conceptual, not a dose curve or patient image. |
| OPT-08 | p.15 / folio 14 | Interventional 3A rule; C-arm orientation; shielding; pulse rate, DSA frame rate, magnification; patient measures | Existing section is linked to the exact curriculum ID and refined around time, distance and shielding. Numeric apron lead-equivalent and example frame-rate claims are omitted as non-universal. The source's under-table tube/detector-side, lateral/oblique projection, rotational-room-exit and patient-specific collimation instructions are not generalized into procedural rules here; they are explicitly deferred for a dedicated geometry lesson with equipment/local-protocol review. |

## Visual and terminology plan

- `/technik/grundlagen#ct-dose-geometry`: code-native figure separates active detector
  width `nT`, full beam width `a`, pitch geometry and helical end exposure. It carries
  localized alt and explanatory captions. It is not a diagnostic image.
- `/technik/grundlagen#intervention-3a`: existing inline source–patient/scatter–shield–staff
  illustration remains, with localized labels and caption.
- Shared terms: Dosisoptimierung / dose optimization / بهینه‌سازی دوز;
  Kollimation / collimation / کولیمیشن; Scanbereich / scan range / محدودهٔ اسکن;
  Röhrenstrommodulation / tube-current modulation / مدولاسیون جریان لوله;
  Pitch / pitch / pitch; Overbeaming / overbeaming / overbeaming;
  Overranging / overranging / overranging; Streustrahlung / scatter radiation / پرتو پراکنده.

## Source references and limits

- Current German federal law: StrlSchG §8 and §83(5), checked against the official
  consolidated text on 2026-10-19: <https://www.gesetze-im-internet.de/strlschg/__8.html>.
- AAPM Medical Physics Practice Guideline 1.b (2021), CT protocol management and
  review: <https://www.aapm.org/pubs/reports/detail.asp?docid=239>.
- AAPM Report 111 (2010), definitions and geometry of active detector width and
  overbeaming: <https://www.aapm.org/pubs/reports/rpt_111.pdf>.
- IAEA Human Health Series No. 47 (2023), CT collimation/overbeaming quality-control
  methods, §5.2.4: <https://www-pub.iaea.org/MTCD/publications/PDF/PUB2021_web.pdf>.
- IAEA Safety Standards Series No. SSG-46, §3.10, time, distance and shielding:
  <https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf>.

The page images for PDF pp. 10–15 and their extracted text were inspected. Values
and protocol examples on the source pages are not current recommendations by
themselves. This focused lesson does not provide equipment settings, legal advice,
patient-specific dose estimates, browser QA or clinical specialist approval.

## Validation status

- `node_modules/.bin/tsx scripts/test-technik-optimization-render.mjs` — PASS,
  server-rendered DE/EN/FA copy, language slots, linked curriculum items, content,
  references and schematic metadata.
- `node_modules/.bin/tsx scripts/check-technik-grundlagen-parity.mjs` — PASS.
- `git diff --check` — PASS (only repository CRLF conversion notices).
- Independent workflow_trial retest PASS: corrected AAPM 111 citation, localized diagram and reference labels, accurate Persian staff-protection alt, source classification, restored four interactive checks with correct/wrong feedback across DE/EN/FA, restored localized 3A diagram, and actual `StandardLessonShell`/`LessonSources` SSR. The checker invoked all eight answer branches per language family (four checks × correct/wrong × three languages) and verified source disclosure and curriculum links.
- Browser desktop/mobile, history/hash interaction, both themes, keyboard flow, and clinical specialist approval remain pending. A local dev server returned HTTP 200, but the in-app browser timed out before visual inspection; no browser pass is claimed.
