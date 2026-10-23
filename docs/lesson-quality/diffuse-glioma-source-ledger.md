# Diffuse adult-type gliomas — source and authoring ledger

Date: 2026-10-23. Authoring branch: detached origin/main baseline `5a2a54fd` in `gehirn-completion-main`.

Scope: complete the three adult diffuse-glioma headings in **Gehirn.pdf physical pages 41–42**. This is a comparative lesson with substantial individual sections, not three names pointing to the pilocytic lesson. Scientific approval remains pending Dr. Zia. Publication belongs to the parent workflow.

## Source reading and coverage

Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf` (89 physical pages). This worker inspected extracted text provided in the existing source artifacts AND full rendered page images of physical pp41–42 from `.worktrees/intussusception-main-sync/.tmp-brain-tumor-source-41.jpg` and `...42.jpg`. This worker does not claim to have read the other 87 pages; the parent batch audit owns full-file coverage.

| PDF evidence | Interpretation / conflict | Implemented target |
| --- | --- | --- |
| p41 (printed 40): adult IDH-mutant astrocytoma heading; body actually describes pilocytic astrocytoma | Pilocytic is a separate circumscribed glioma. Its cyst/mural nodule teaching must not be attributed to diffuse IDH-mutant astrocytoma. | `/gehirn/tumoren/diffuse-gliome#astrozytom-idh-mutiert` teaches diffuse disease; source note explains boundary. Existing `/gehirn/tumoren/gliome` retains pilocytic content. |
| p42 (printed 41): pilocytic image and posterior-fossa differential table | Neither is diagnostic evidence for any of the adult diffuse types. | Not reused here. Three externally verified original clinical figures replace this evidence gap. |
| p42: “Oligodendrogliom (IDH-mutiert)” heading only | Source naming incomplete by CNS5: IDH mutation AND 1p/19q codeletion required. | `#oligodendrogliom-idh-mutiert`; definition, calcification, enhancement/perfusion caveat. |
| p42: “Glioblastom (IDH-Wildtyp)” heading only | IDH-wildtype alone does not establish GBM, especially in younger patients or other molecular contexts. | `#glioblastom`; solid/necrotic/FLAIR components, differential, limited-enhancement exception. |

All substantive imaging criteria in this new lesson are **external supplements**, not claims copied from the PDF. No unreadable page is marked covered. Parent maintains full-batch duplicate and coverage ledger.

## Proposed chapter plan (recorded before editing)

1. MRT-Muster und molekulare Diagnose — common image-reading workflow and tissue/molecular boundary.
2. Astrozytom: Infiltration und T2/FLAIR — non-enhancing infiltrative pattern, strict mismatch and its limits.
3. Oligodendrogliom: Kortex und Verkalkung — calcification, variable enhancement, grade boundary.
4. Glioblastom: solider Rand, Nekrose und Umgebung — components, surrounding FLAIR and diagnostic overlap.
5. Drei Muster sicher einordnen — concise comparison, reporting and topic-specific practice links.

## Supplemental scientific evidence

| Claim / use | Source verified online | Limit |
| --- | --- | --- |
| Three adult diffuse types; integrated classification; grade ranges; IDH-wildtype alone insufficient | Louis et al. WHO CNS5 summary, DOI 10.1093/neuonc/noab106; https://pmc.ncbi.nlm.nih.gov/articles/PMC8328013/ | Not an imaging-only diagnosis; molecular algorithms are beyond this short lesson. |
| MRI before/after contrast, T2/FLAIR, tissue necessity, perfusion adjunct | EANO guideline, DOI 10.1038/s41571-020-00447-z; https://pmc.ncbi.nlm.nih.gov/articles/PMC7904519/ | No treatment recommendations added. |
| Strict mismatch supports IDH-mutant non-codeleted glioma; absence does not exclude | Patel et al. original study, DOI 10.1158/1078-0432.CCR-17-0560; https://pubmed.ncbi.nlm.nih.gov/28751449/; validation Broen et al. DOI 10.1093/neuonc/noy048, https://pmc.ncbi.nlm.nih.gov/articles/PMC6120363/ | Restricted context: adult non-enhancing diffuse glioma; no absolute specificity claim or cyst misclassification. |
| Molecular subtype association with calcium, enhancement, ADC | Original CNS5 cohort, PMID 41458936; https://pubmed.ncbi.nlm.nih.gov/41458936/ | Associations, not diagnostic thresholds or certainty for individual patients. |
| Three histomolecularly confirmed cases | Fernandes et al. Radiol Bras 2023, DOI 10.1590/0100-3984.2022.0089-en; https://pmc.ncbi.nlm.nih.gov/articles/PMC10411771/ | Original institutional figures illustrate examples, not frequencies. GBM figure is explicitly a limited-enhancement counterexample. |

## Media plan and inspected evidence

All four full-resolution downloaded clinical images were opened with `view_image` on 2026-10-23 and compared with figure captions. They retain their original panel labels, overlays and arrows; no cropping, annotations or diagnostic image synthesis. Full figures appear in the body and can be opened separately. The parent supplied a separate conceptual generated `hero.png`; its purpose, generation and non-diagnostic status are recorded in `hero-generation.md`. The clinical figures are not the hero.

| Asset | Teaching purpose | Evidence / rights |
| --- | --- | --- |
| `public/educational/diffuse-glioma/astrocytoma.jpg` | Compare T2 vs FLAIR, then later enhancement/perfusion. Avoid implying panels A–D are a single time point. | Fernandes Fig1; original 25-year-old case. A/B 2010; C/D 2021 after progression. Article CC Attribution. |
| `.../oligodendroglioma.jpg` | Calcification and focal enhancement/high perfusion can coexist with tissue-confirmed grade 2. | Fernandes Fig2; original 26-year-old case. CT A, T1 C+ B, perfusion C. Article CC Attribution. |
| `.../glioblastoma.jpg` | Challenge false reassurance from only limited enhancement. Not a typical large necrotic ring example. | Fernandes Fig3; original 53-year-old case. FLAIR A, T1 C+ B. Tissue/molecular GBM. Article CC Attribution. |
| `.../glioblastoma-typical.jpg` | First GBM image: compare enhancing tissue, surrounding FLAIR, DWI and ADC before the exception. Blue lower-row research segmentation is explicitly not a histological tumour boundary. | Mahmoudi et al., Cancers 2024, DOI 10.3390/cancers16030589, Fig1. Original IDH-wildtype GBM cohort, https://pmc.ncbi.nlm.nih.gov/articles/PMC10854536/ . CC BY 4.0 verified in source HTML. |

Full source URLs, license statement, captions, localized alt and hashes: `public/educational/diffuse-glioma/provenance.json`. Article license statement was read directly: Creative Commons Attribution, unrestricted distribution/reproduction with attribution; no version was asserted because the rendered PMC text does not state one. No reliance on assumed Radiopaedia rights is needed for these figures.

## Translation and assessment ledger

| Sensitive concept | DE | EN | FA | Preservation |
| --- | --- | --- | --- | --- |
| Molecular conjunction | IDH-Mutation UND 1p/19q-Kodeletion | IDH mutation AND 1p/19q codeletion | جهش IDH و حذف همزمان 1p/19q | Both required in all locales. |
| Negative sign | schließt nicht aus | does not exclude | رد نمی‌کند | Same uncertainty; no absolute imaging diagnosis. |
| Grades | Astro 2/3/4; Oligo 2/3; GBM 4 | same | ۲/۳/۴؛ ۲/۳؛ ۴ | Molecular/tissue determination, not enhancement-based grade. |
| Signal vs diagnosis | unterstützt / Hinweis | supports / clue | به نفع / سرنخ | No translation changes suggestion into proof. |
| FLAIR environment | Ödem und nicht anreichernder Tumor | oedema and non-enhancing tumour | ادم و تومور بدون enhancement | Neither pure oedema nor pure tumour claimed. |
| Figure timeline | elf Jahre später | eleven years later | یازده سال بعد | Longitudinal panels remain explicit. |

Three topic-specific MCQs per language; each has one correct option and explicit per-distractor feedback. Six cards (two per topic) contain localized prompt, answer and explanation. Questions test interpretation, not provenance trivia. Assessment IDs derive from existing exact topic IDs, so parent can integrate without retagging unrelated assessments.

## Integration contract

- New route: `/gehirn/tumoren/diffuse-gliome`.
- Exact curriculum links: route plus `#astrozytom-idh-mutiert`, `#oligodendrogliom-idh-mutiert`, `#glioblastom`.
- `DIFFUSE_GLIOMA_QUESTIONS`: locale-keyed arrays, 3 each.
- `DIFFUSE_GLIOMA_FLASHCARDS`: 6 multilingual cards.
- `DIFFUSE_GLIOMA_FLASHCARD_TOPICS`: 3 catalog entries.
- `DIFFUSE_GLIOMA_TOPIC_GROUP`: one MCQ topic group containing the 3 topic IDs.
- Author changed no broad registries, access controls, shared shell, typography or global styles.

## Validation and review state

- Focused test **PASS**: `node scripts/test-diffuse-glioma-lesson.mjs` renders the actual shared shell with mocked persistence/router dependencies; verifies DE/EN/FA + RTL, topic anchors, exact exercise destinations, localized visible figure captions, assessment rationales and provenance references. It also bundles actual question/card/curriculum registries and checks production filters return exactly one four-option question per topic/language and two cards per topic, with precise curriculum anchors. This is not browser testing.
- Parent owns build validation and browser evidence. Port3021 initially showed the normal membership gate, then authenticated after hydration without bypass. Parent/reviewer saw a dark-mode foreground defect in actual lesson screenshots; scoped dark surface/foreground CSS was fixed. The coordinator and independent reviewer inspected post-fix DE/dark and FA/light screenshots at desktop 1265x712: text/table contrast and the tested RTL layout are readable. Mobile, keyboard and the remaining matrix cells remain unverified; UX is partial/BLOCKED for full acceptance. See the exact interaction evidence below.
- Independent read-only reviewer: SRC/EDU/VIS/LNG/ASM/REV PASS within this bounded delta; UX BLOCKED for the incomplete full matrix. Sources, all four clinical figures, generated hero, translations, actual registry filters and supplied screenshots reviewed. Minor finding DG-DOC-01 (stale browser-verification status) corrected in the preceding entry. This is not scientific sign-off.
- Scientific approval: **pending Dr. Zia**. No scientific approval or publication inferred from tests.

### Coordinator browser retest (2026-10-23)

Normal authentication hydration made the lesson available without gate changes. Desktop 1265x712: DE chapter/hash navigation opened one chapter, GBM wrong/correct answers displayed appropriate feedback and did not mark reading progress; EN localized the same state; FA RTL was observed in dark assessment and light introduction/table. Post-fix DE/dark screenshot confirms readable body/table, FA/light screenshot confirms RTL layout. Files: `tmp/gehirn-browser/diffuse-de-dark.png`, `tmp/gehirn-browser/diffuse-fa-light.png` (local evidence, not tracked). Mobile, exhaustive keyboard flow and global quiz/card page UI remain unverified; production registry filters are tested separately. This supersedes the earlier access-blocked observation, not the remaining untested cells.

Global `npm run audit:mcq` passed: 803 questions and 18 cases per language. No full production-build or clinical approval claimed.
