# Osteochondrose terminology orientation · MSK.pdf p.124

**Route:** `/msk/osteochondrosen/weitere-osteochondrosen`
**Curriculum ID:** `weitere-osteochondrosen` (existing; now linked and in progress)
**Source:** `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF p.124 / printed p.123; source page image `tmp/perthes/page-124.png` inspected.
**Scope:** A short terminology/orientation page only. It does not claim to cover a disease or provide shared imaging criteria, staging, management, or a comprehensive taxonomy.

## Learning aim and structure

Learners should read the source's umbrella term without confusing it with an acute growth-cartilage injury or with the German-language adult degenerative-disc expression. The path is source definition and qualification → three-way term comparison → links to dedicated lessons → one retrieval check and three portable rules.

## Source coverage

| Point | Source | Disposition |
|---|---|---|
| Osteochondrosis describes a group in which cartilage-to-bone conversion (endochondral ossification) is disturbed | MSK.pdf PDF p.124 / printed p.123, image checked | Included, attributed to PDF |
| A disturbance of blood supply in epiphyseal cartilage/physis is described as the most likely trigger | Same page | Included only as the source's position; not asserted as universal etiology |
| Osteochondroses are not consequences of acute growth-cartilage injuries | Same page | Explicitly included as the key distinction |
| Scheuermann disease is named as a spinal special case; growth disturbance of vertebral endplates | Same page | Linked to its existing spine lesson, whose content based on Wirbelsäule.pdf p.13 explicitly covers endplate growth disturbance; no new imaging claims are added here |
| In German-speaking usage, “Osteochondrosis intervertebralis” can describe adult disc wear with bone reaction; English “degenerative disc disease (DDD)” | Same page | Included as a source-attributed terminology note; not conflated with childhood disease |
| Named dedicated topics: Perthes, Osgood-Schlatter, OCD | Existing curriculum and dedicated routes | Linked without merging them or inventing a shared disease taxonomy |

## Visual and terminology

`public/educational/osteochondrosen-orientation.svg` is a code-native, non-diagnostic concept diagram for the source's cartilage-to-bone definition. It contains no diagnostic criteria or patient-image claims. Terms are aligned across DE/EN/FA in the lesson data; the one MCQ tests the adult terminology distinction. The page image was visually inspected; this minimal orientation does not reuse a clinical image.

## Verification status

Focused render test: `node --import tsx scripts/test-msk-osteochondrosen-orientation-render.mjs` passed for DE/EN/FA SSR, RTL, page-specific hero, source bounds, cross-links and the unselected self-check; `git diff --check` passed. Independent review confirmed the curriculum title matches the orientation scope and found no further issue (SRC/VIS/LNG/ASM/REV pass; the minor EDU title mismatch was corrected). Browser interaction/layout and clinician review remain open; this is not scientific or publication approval.
