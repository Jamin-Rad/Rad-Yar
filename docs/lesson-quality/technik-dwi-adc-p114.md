# DWI / ADC · Technik.pdf PDF p.114 (printed p.113)

## Scope and learning goal

Existing lesson: `/technik/grundlagen#mrt-spezial`; exact curriculum topic: `mrt-dwi-adc`.
After this short section, learners should (1) state why DWI brightness alone does not
prove restriction, (2) compare DWI and ADC patterns, and (3) recognize that b-value
selection and EPI limitations depend on protocol and anatomy.

## Source coverage

| Point | Source | Importance | Lesson location | Status |
| --- | --- | --- | --- | --- |
| DWI reflects water motion; reduced mobility can be bright on diffusion weighting | Technik.pdf p.114 / printed p.113 | Core | `DWI_ADC_BLOCK` | Included, wording qualified |
| ADC is calculated from DWI at different b-values and helps distinguish true restriction from T2 shine-through | same | Core | Block, MCQ, flashcard | Included |
| b-value controls diffusion weighting; PDF's b=1000 is an example, not a universal protocol | same | Core caveat | Block | Included as protocol-dependent; no fixed threshold |
| EPI is fast and may distort | same | Useful caveat | Block | Included |
| Source page's case images | same | Optional visual examples | Not reused | Original conceptual comparison diagram avoids assigning unverified diagnoses to small source images |
| Stroke, inflammation and cellular tumors as applications | same | Optional overview | Deferred | Existing surrounding lessons teach these clinically; not needed to explain the signal principle |

Page text and rendered page were inspected. Two paired example figures are present;
the diagram in this lesson is original and explanatory, not diagnostic imaging.

## Learning path and media

Signal principle → compare DWI with ADC → distinguish shine-through → remember
protocol and EPI limitations. `/public/technik/grundlagen/mrt-dwi-adc-pattern.svg`
visually contrasts bright DWI/low ADC with bright DWI/normal-high ADC. It has no
patient data and no quantitative scale.

## Assessments and terminology

One MCQ and one dedicated flashcard are linked to the exact topic in German, English
and Persian. Stable terms: diffusion-weighted imaging (DWI), apparent diffusion
coefficient (ADC), restricted diffusion, T2 shine-through, b-value, echo-planar
imaging (EPI). Review should compare the meaning across all three languages.

## Evidence and open gates

- External reference: ESR Essentials DWI practice recommendations (2025),
  https://pubmed.ncbi.nlm.nih.gov/41037070/ — joint DWI/ADC interpretation and
  protocol-dependent b-values.
- Author checks: focused DWI/ADC source/assessment test passed; `npm run audit:mcq`
  passed (777 questions); `node --import tsx scripts/check-technik-grundlagen-parity.mjs`
  passed; `git diff --check` passed.
- Independent review: SRC/EDU/VIS/LNG/ASM/REV PASS after fixes; reviewer rechecked
  the localized SVG visible and accessibility labels. The table now points forward
  to the dedicated explanation; an interactive three-language check and direct
  quiz/card links follow that DWI block.
- Browser UX (desktop/mobile, RTL and interaction): BLOCKED; no live browser evidence.
- Production build: BLOCKED in this worktree: `fonts.googleapis.com` DNS lookup failed,
  followed by `EPERM` creating `.next/server/app/abdomen/gi`. This does not establish
  a code failure or a successful build.
- Clinical approval by Dr. Zia: pending.
- Release status: not requested by this ledger; publication is not implied.
