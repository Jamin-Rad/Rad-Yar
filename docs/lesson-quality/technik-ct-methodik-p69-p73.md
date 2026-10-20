# Clinical CT method and contrast phases — Technik.pdf pp.69–73

Bounded source mapping for exact curriculum ID `ct-methodik-km-phasen` at `/technik/grundlagen#protokoll`. Physical PDF pages 69–73 (printed pp.68–72) were rendered and visually inspected. Pages 70–73 contain teaching diagrams, phase tables and individual illustrative cases; this addendum does not re-use patient images or claim a new independent diagnostic case.

## Source map and dispositions

| PDF page | Source content | Lesson disposition |
|---|---|---|
| 69 | Native, early arterial, late arterial, portal venous, nephrographic and delayed/excretory phase labels; approximate time examples and timeline | Distinguish early arterial vessel enhancement from late arterial organ/perfusion phase. Teach order and phase purpose only. Source text and embedded timeline show inconsistent example timing, so no seconds are made universal. Every phase is not required for every exam. |
| 70 | Liver lesion table: HCC, adenoma, hyper-/hypovascular metastases, FNH, hemangioma and cholangiocarcinoma phase examples | Use a concise HCC arterial/portal washout example only, explicitly as source case/table illustration and not a stand-alone diagnosis criterion. Other detailed pattern labels remain out of scope pending current disease-specific review. |
| 71 | Individual liver case with arterial hyperenhancement and portal-venous washout | No patient image reused; reinforces that source findings are case-specific and do not form a complete diagnostic rule. |
| 72 | Renal native, early arterial/corticomedullary, nephrographic and excretory phase roles; simple/complex cyst, RCC, AML examples and individual RCC case | Teach baseline/fat, renal vascular/early enhancement, parenchymal comparison and collecting-system opacification. Do not transfer Bosniak cutoffs, management, or individual case as universal criteria. |
| 73 | Pancreatic phase for hypovascular tumour conspicuity; portal phase for veins, liver metastases and extent; positive oral contrast indications/tradeoffs | Teach phase roles with protocol qualification; oral positive contrast may help show fistula, perforation, anastomotic insufficiency or abscess communication but can mask GI bleeding or mural enhancement. Use depends on the question and protocol. |

## Technical evidence and limitations

- ACR’s [Adult Abdomen CT technique module (revised 2026)](https://accreditationsupport.acr.org/support/solutions/articles/11000049638-technique-parameters-and-anatomic-coverage-ct-adult-abdomen-module) documents different liver, renal, pancreatic and general abdominal study series, supporting the decision not to generalize one phase prescription across organs.
- ACR [LI-RADS](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/LI-RADS) is referenced for the distinction between an illustrative HCC enhancement pattern and formal standardized reporting criteria.
- ACR [GI bleeding criteria](https://acsearch.acr.org/docs/69413/Narrative) can inform the source’s positive oral-contrast caveat; this addendum does not provide patient-specific protocol advice.
- The source provides mismatching example times on p.69; fixed seconds and local dose/timing recommendations are deliberately deferred.

## Teaching implementation

The existing generic `/protokoll` summary now includes one focused, source-bounded DE/EN/FA block with a non-proportional conceptual phase diagram and visible five-node localized key, organ-phase table (early vs late arterial, renal corticomedullary and nephrographic distinctions), one organ-specific MCQ and five flashcards. Positive oral-contrast indications include fistula, perforation, anastomotic insufficiency and abscess communication, alongside masking trade-offs. Curriculum quiz/card actions point back to the localized section. Existing RECIST caution remains untouched.

Focused `/protokoll` SSR/registry testing passes for DE/EN/FA and RTL, with all organ rows, each of five localized timeline labels, early/late and renal phase distinctions, oral-contrast indications, plausible distractor feedback, visible quiz/card links and curriculum registration. The adjacent CT quality/reconstruction SSR suite still passes. `audit:mcq` passes with 663 questions and 18 cases per language; focused syntax transforms and `git diff --check` pass. Independent review passed source, education, visual, language, assessment and revision gates after corrections for arterial-phase distinction, renal corticomedullary content, oral-contrast indications, timeline labels and distractor quality. Live-browser UX remains blocked; clinical approval remains separate.
