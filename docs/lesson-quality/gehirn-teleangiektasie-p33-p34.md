# Gehirn.pdf pp. 33–34: Kapilläre Teleangiektasie

Stand: 21.10.2026. Bounded comparison of the source pages with the existing route; not a full clinical audit.

## Source coverage

| PDF page | Source point | Existing lesson location | Disposition |
|---|---|---|---|
| 33 | Thin-walled dilated capillaries with normal brain tissue between them; low-flow lesion | Basics / histology and flow cards | Already covered |
| 33 | Pons is the predilection site (~2/3); usually incidental/asymptomatic | Clinical table | Already covered; percentage retained as source-linked teaching note, not independently validated here |
| 33 | DVA/cavernoma can coexist; low-flow lesion has little spontaneous bleeding tendency | Basics, differential and clinical table | Existing lesson distinguishes rare spontaneous bleeding from bleeding risk of biopsy; preserve this nuance |
| 33 | T1 often unremarkable; T2/FLAIR normal or subtly bright without oedema/mass effect; faint brush-like post-contrast enhancement; SWI/T2* signal loss; DWI usually normal | Sequence-by-sequence MRI table and diagnostic triad | Already covered |
| 33 | rID 58408 case with post-contrast T1, FLAIR and SWI examples | Case gallery only displayed post-contrast T1 | Three sequence images are now shown together with localized sequence labels and individual zoom |
| 34 | rID 9732: ill-defined midline-crossing pontine enhancement without mass effect | Case gallery only displayed post-contrast T1 | Four source-matching sequences (T1 C+, SWI, DWI, T2) now shown together with localized labels and individual zoom |
| 34 | Diagnostic triad: brush-like enhancement, SWI hypointensity, no oedema/mass effect | Dedicated triad section | Already covered and now directly inspectable across the case sequence galleries |
| 34 | Typical incidental lesion needs no routine follow-up; biopsy is discouraged due procedural bleeding risk | Management section and biopsy flashcard | Already covered; not altered |

## Changes

- The route now follows the shared `LessonHero` header with a new original pons locator schematic; the explanatory definition remains in the Basics chapter.
- The case gallery exposes all seven MRI panels represented by the two PDF cases, with per-sequence alt text, captions, credit and zoom.
- The first Basics accordion starts open; the previous mount effect collapsed it immediately.
- Removed standalone Trias and Befundung chapters; triad remains in the MRI key and recap, while the report checklist and impression remain within the case analysis. The route now has seven chapters.
- No new clinical claims or assessment items were added.

## Media record

The seven images are existing local Radiopaedia case assets under `public/kapillaere-teleangiektasie/`, attributed in the lesson to rID 58408 and rID 9732, and linked back to their case pages. These IDs and sequence panels match the examples shown in the user's PDF. The new hero SVG is original code-native anatomy, not a diagnostic image. User has confirmed explicit reuse permission for Radiopaedia case media in RadYar.

## Independent review and verification

Independent reviewer passed SRC/VIS/LNG/ASM and REV for this bounded update; EDU passed after restructuring the repeated triad/reporting sections. The focused gallery assertions and full MCQ-bank audit passed. UX is BLOCKED: the local browser refused the lesson URL; production build did not complete in this environment (Google Fonts DNS unavailable; `.next/types` creation returned EPERM). Browser layout/RTL, theme, keyboard and actual zoom interaction remain unverified. Clinical correctness and specialist sign-off also remain open.
