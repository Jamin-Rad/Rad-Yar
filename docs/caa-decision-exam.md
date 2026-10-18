# CAA story examinations

Updated 2026-10-18. The maintained case data are in `data/caaStoryCases.mjs`: RMH Neuropathology, rID 40475 (recurrent intracranial haemorrhage); Yves Leonard Voss, rID 147140 (CAA-related inflammation); and Mark Rodrigues, rID 58758 (CAA-associated lobar intracerebral haemorrhage). Source images are unchanged and credited under CC BY-NC-SA 3.0. Image URLs, study/sequence identities, source order and SHA-256 hashes are recorded in `public/caa/exams/radiopaedia/stacks/provenance.json`.

## Case structure

The first story retains its six questions, stages, choices and explanations. The second story has been rebuilt as four radiology decisions, each starting with actual scrollable source images. There is no separate history-only question, management question or treatment-response question in the second story. The third story uses three CT-based decisions: localize the acute lobar bleed, describe its margins and associated haemorrhage, then integrate the pattern with age to assess the likelihood of CAA. Axial images appear first; coronal reconstructions are added for morphology and final integration. The diagnosis remains an imaging-supported inference until the source case’s autopsy confirmation is disclosed after the final answer.

| CAA-ri step | Available sequences, in initial display order | Task |
| --- | --- | --- |
| 1 · FLAIR | FLAIR | Describe the location and cortical/subcortical distribution |
| 2 · DWI / ADC | DWI, ADC, FLAIR | Interpret diffusion at the FLAIR abnormality against competing imaging patterns |
| 3 · SWI | SWI minIP, SWI, FLAIR | Distinguish rounded lobar microbleeds from sulcal siderosis, continuous veins and deep microbleeds |
| 4 · Combined findings | FLAIR, SWI minIP, SWI, DWI, ADC, T1 C+ | Choose the best radiological working diagnosis against PCA infarction, PRES and glioma |

| Lobar CT step | Available images, in initial display order | Task |
| --- | --- | --- |
| 1 · Axial CT | Axial non-contrast CT | Localize the centre of the acute haemorrhage |
| 2 · CT morphology | Coronal reconstructions, axial CT | Assess the lobulated margin, finger-like projections and blood in superficial sulci |
| 3 · Integration | Axial CT, coronal reconstructions | Weigh age and CT pattern for CAA; distinguish a suggestive pattern from proof |

Clinical context appears once at the opening, with a short relevant reminder at diagnostic integration. The “case information so far” disclosure has been removed from the active examination. Stages without imaging use a centred single column. Source/adaptation commentary remains in final review.

The numbered timeline has as many columns as the current story has questions (six/four). Future labels are neutral “Später / Later / بعداً”; no future examination name is placed in a tooltip or accessible label. Final scoring includes only domains actually assessed, avoiding empty 0/0 domains in the radiology story.

## Evidence and feedback

Before an imaging question, the narrative supplies context and sequence availability, rather than the finding to select. Post-answer explanations describe the observed finding and why the competing descriptions fit less well. FLAIR feedback does not state the diffusion answer; diffusion feedback does not disclose the SWI finding; SWI feedback does not name CAA-ri. Diagnostic integration and the source report's subtle leptomeningeal enhancement are discussed after the final diagnosis choice. Earlier images remain legitimate evidence for later synthesis.

Learning mode locks the selected letter A–D before revealing the answer and explanation. Timed mode withholds feedback until review. The eight-minute-per-case wall-clock timer, expiration handling, immutable committed answers, case selection, mixed sessions and account access are retained. Final review contains the questions, recorded choices, correct answers, explanations and credited sources.

Medical checking follows the [original CAA-ri case](https://radiopaedia.org/cases/cerebral-amyloid-angiopathy-related-inflammation-caa-ri-1), [Auriel et al., 2016](https://pubmed.ncbi.nlm.nih.gov/26720093/), [Boston v2.0](https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/) and the [primary SWI study of haemorrhage in PRES](https://pmc.ncbi.nlm.nih.gov/articles/PMC7968802/). Absent corresponding restriction favours vasogenic oedema over a typical acute territorial infarct but does not exclude all ischaemia. PRES may be asymmetric and haemorrhagic: neither asymmetry nor ADC alone makes the diagnosis. The final answer is a clinical-radiological working diagnosis, not histological proof or an unsupported formal Boston category. No follow-up MRI or biopsy finding has been invented.

## Source stacks and interaction

The three cases retain all 556 original slices in eleven stacks: initial CT (35), GRE (22), follow-up CT/CTA (36), FLAIR (22), SWI minIP (80), SWI (80), DWI (22), ADC (23), post-contrast T1 (122), and the new lobar haemorrhage case’s axial (51) and coronal (63) CT series. The CAA-ri case uses six stacks with 349 slices. `data/caaExamSeries.mjs` explicitly whitelists sequences per question rather than accumulating everything previously unlocked. Contrast T1 is available only at final integration. No later source study is requested early.

Wheel, arrow keys, Home/End, touch swipes, a range slider and previous/next buttons move through slices with bounded indices and visible counts. Only adjacent slices of the active sequence are prefetched. The enlarged dialog shares the current slice with the inline viewer. Changing question resets to that question's initial sequence and representative slice. Source pixels and attribution remain unchanged.

## Validation

`scripts/caa-decision.test.mjs` checks six/four questions, translations, keys, stage ordering, scoring and the specific premature-answer failure modes. `scripts/caa-stack.test.mjs` verifies every source file/hash and exact per-stage sequence lists. The shared MCQ audit checks integration with the existing bank.

Browser verification uses the real production component in a temporary local QA route, removed before building. Both stories are exercised in German/English/Persian, learning and timed modes, including correct/incorrect choices, answer locking, dynamic timeline columns, active score domains, no history disclosure, no future text/sequence leakage, loaded images and slice navigation. Desktop and Persian RTL mobile are checked for overflow and console errors. Regular Playwright is used because the Browser plugin is not available. Screenshots and helper scripts remain outside committed source; authentication is unchanged.
