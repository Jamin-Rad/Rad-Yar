# Pulmonary LCH — source ledger and authoring plan

Route: `/thorax/lch-lunge`; topic `lch-lunge`; chapter `thorax-lunge`.
Source: Thorax.pdf, physical p21 / printed p20. Extracted text and full rendered page inspected 2026-10-24. No unreadable teaching content. This is one page within the parent Thorax batch map.

Audience: radiology learners familiar with basic HRCT morphology. Teaching language of source and draft: German. Expected skill: recognize the nodulocystic PLCH pattern and describe its temporal change without overcalling diagnosis or recovery.
Observable objectives: identify nodules and irregular cysts in the supplied CT pair; compare the two-year morphologic change; state typical distribution and the limits of the displayed frames; combine imaging with clinical context and diagnostic confirmation.

## Chapter outline (before implementation)

1. **Noduli und Zysten gemeinsam erkennen** — introduce the smoking-associated nodulocystic pattern, upper-lung predominance and relative costophrenic sparing.
2. **Den Wandel im CT verfolgen** — inspect the PDF's actual baseline and two-year CT comparison; separate changing morphology from a claim of overall recovery.
3. **Verteilung und Diagnose absichern** — explain the limits of isolated findings and two apical slices; embed an application check and concise takeaways.

## Coverage ledger

| Source point | Status / destination | Evidence and qualification |
|---|---|---|
| Rare disease, smoking association | Included / chapter1 | PDF p21; Goyal et al. 2022, pulmonary LCH section |
| Early nodular disease, cavitation and irregular cysts | Included / chapter2 | PDF p21; a possible evolution, not a compulsory individual timeline |
| Upper-lung predominance; relative costophrenic sparing | Included / chapters1,3 | PDF p21 text; basal sparing cannot be assessed on the two displayed apical frames |
| A: centrilobular nodules plus irregular cysts | Included / image A | Source page visually matched to existing image22.jpeg |
| B after 2 years: fewer nodules, more elongated/branching cysts | Included / image B + check1 | Source page visually matched to existing image23.jpeg; interval comes from source caption |
| HRCT and diagnostic qualification | Added / chapter3 + check2 | Adult consensus, DOI10.1182/blood.2021014343, Table1 statements1,6; Table3 pulmonary section. Characteristic HRCT may support diagnosis in an appropriate smoking context; tissue confirmation generally recommended, individualized exceptions. No treatment module added. |

## Media plan and provenance

- Header: original generated conceptual illustration of lungs and nodulocystic change, not diagnostic imagery. No text/labels. Exact prompt and saved file recorded in asset provenance.
- Chapter2: reuse inspected `/hrct/retikulaer-nodulaer/image22.jpeg` (A) and `image23.jpeg` (B). Both match Thorax.pdf p21, whose caption names Radiopaedia rID161054. Contributor and original extraction method are not recorded in the PDF; do not invent attribution. The user explicitly confirms permission for PDF imagery and Radiopaedia use, including subscription access. Link case by its printed rID. No new image download or claim of new direct case inspection.
- Both panels retain their original pixels, with localized captions and alt. No arrows added. Side-by-side at desktop, stacked in source order on mobile.
- No extra decorative or redundant diagram: the real longitudinal pair directly teaches the morphologic transition.

## Terminology and assessment plan

DE zentrilobuläre Noduli / EN centrilobular nodules / FA ندول‌های سنترلوبولار; Kavitation / cavitation / کاویتاسیون; irreguläre Zysten / irregular cysts / کیست‌های نامنظم; relative Aussparung / relative sparing / حفظ نسبی. Preserve the two-year interval, relative (not absolute) sparing, and diagnostic uncertainty in all languages.
Two four-option checks: fewer nodules with more cysts does not mean complete recovery; a characteristic full HRCT pattern needs clinical context and appropriate diagnostic confirmation. Derive linked MCQs and flashcards from the same data.

## Evidence status

Primary source checked via the Histiocytosis Association-hosted full article PDF (https://histio.org/wp-content/uploads/2022/05/LCH-guidelines-adult_Blood-2022.pdf). PMC direct page encountered browser verification; the full article mirror was readable. Scientific approval by Dr. Zia remains pending. Independent review and actual-browser evidence are coordinated by the parent agent; not yet performed for this change.

Author verification: `node scripts/test-thorax-lch-ssr.mjs` passes DE/EN/FA shared-shell rendering, one initially open chapter, language/direction, hero and actual CT asset references, two four-option questions with three distinct wrong-answer explanations, translated cards and Thorax practice routes. Layout guard assertions retain Navbar, Footer and access gates with no duplicate local Footer. `git diff --check` found no whitespace errors. SSR is not browser or scientific acceptance.
