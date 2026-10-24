# Thorax pneumonia practice integration — 2026-10-24

Scope: existing lesson `app/thorax/pneumonie-muster/page.js`; no new disease course. Existing six curriculum aliases plus the already taught pleural-empyema row. Parent owns curriculum and global registration. No image replacement or claim of full lesson scientific acceptance.

Plan: keep established PDF pp32–35 pattern teaching, expose practice links for each actual topic, add stable row anchors (including `#pleuraempyem`), and attach one distinct application MCQ and one retrieval card per topic. Preserve DE/EN/FA. Questions avoid treatment, prevalence or new numeric criteria. Four choices with explanation, exact-topic tags and matching cards.

| Topic | Existing content | Check |
|---|---|---|
| pneumonie-muster | p33 bronchopneumonic distribution | Classify patchy peribronchial consolidation |
| bakterielle-pneumonie | p32 lobar consolidation/air bronchogram | Describe pattern without organism identification |
| virale-pneumonie-covid | p34 peripheral/basal GGO | Recognise distribution, retain specificity caveat |
| atypische-pneumonie | p33 interstitial pattern and diagnostic caveat | Avoid treating “atypical” as organism identification |
| aspergillus-lunge | pp34–35 halo/air crescent and immune context | Early halo clue versus later air crescent |
| pcp | p35 GGO despite mild radiographic change | Recognise compatibility in immunosuppression |
| pleuraempyem | p35 split pleura | Localise fluid to pleura, not intraparenchymal abscess |

Sources checked through web tools on 2026-10-24:

- Ito et al., prospective CAP cohort with retrospective CT assessment: https://pmc.ncbi.nlm.nih.gov/articles/PMC7127011/ ; doi:10.1016/j.ejrad.2008.08.004. CT pattern definitions and imperfect discrimination support retaining the lesson's pattern/organism distinction. No study-specific performance percentages transferred.
- Lee et al., primary 16-patient CT series: https://pubmed.ncbi.nlm.nih.gov/16215734/ ; doi:10.1007/s00330-005-0026-z. Multiple patterns in proven Mycoplasma, not a unique interstitial sign.
- Bernheim et al., primary121-patient cohort: https://doi.org/10.1148/radiol.2020200463 . Bilateral/peripheral GGO/consolidation; no modern screening/treatment recommendation inferred from early-pandemic paper.
- IDSA Aspergillosis guideline, radiographic diagnosis evidence summary: https://www.idsociety.org/practice-guideline/aspergillosis . Halo in neutropenia, later air crescent; not organism-specific.
- NIH Adult/Adolescent OI guideline: https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis . HIV-specific evidence for subtle/normal CXR, CT GGO and atypical large effusion. Lesson already covers immunosuppression; no new rates or test-performance extrapolation.
- Tsujimoto et al., primary83-patient retrospective study: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130141 . Split pleura associated with complicated parapneumonic effusion/empyema, imperfect diagnostic performance. No isolated CT sign promoted to proof or drainage decision.

Translations: matched question/choice order and correct letters B/A/C/B/D/A/C in each language; source-facing bibliographic titles retain original title. Each card and topic name localized. Technical contracts: `THORAX_PNEUMONIA_QUESTIONS` flat21 with language suffix, `THORAX_PNEUMONIA_FLASHCARDS`7, `THORAX_PNEUMONIA_TOPICS`7.

Validation: `node --import tsx scripts/test-thorax-pneumonia-practice.mjs` PASS. This bundles and server-renders the actual route for DE/EN/FA, checks each topic's quiz/card href, RTL, empyema anchor, unique IDs, localized cards, valid answers/options and wrong-answer explanations. It exposed a preexisting fatal `lessonGoals.map is not a function`: page previously passed a language-object where LessonReferenceShell expects an array. Fixed at caller by selecting language array. Check reset on language change achieved with keyed shell. No shared layout edited.

Open: browser interaction/responsive evidence, actual global registration (parent), independent acceptance and physician review. SSR is not browser or scientific approval. Existing picture captions and image quality were not reaudited by this bounded practice subtask.

Handoff fixes: question IDs use language-middle form `thorax-pattern-{topic}-{lang}-01`, compatible with localized ID lookup. Every quiz/card link carries encoded `from` pointing to the localized lesson plus exact row anchor (language query before hash). SSR now asserts these return paths. Rerun PASS.
