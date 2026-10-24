# Abdomen.pdf — source coverage and completion scope

Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Abdomen.pdf`, 99 physical pages, 11,894,704 bytes. Mapping date: 24 October 2026. Physical page numbers are used below; printed folios are generally one lower.

The independent mapper extracted and rendered all 99 pages and inspected all nine contact sheets. Dense tables on physical pages32 and82 were additionally enlarged. Actual route/data consumers were inspected to distinguish an existing lesson from a curriculum-only entry. Contact sheets are inventory evidence, not acceptance of individual diagnostic frames.

## Four genuinely missing topics

| Source | New route / topic ID | Source boundary |
| --- | --- | --- |
| p27, Zirrhose heading | `/abdomen/leber/zirrhose` / `leberzirrhose` | Heading only. Substantive teaching and clinical figures are explicitly supplemented from external sources. |
| p66, Ulkuserkrankung heading | `/abdomen/gi/ulkuserkrankung` / `ulkuserkrankung` | Heading only. External clinical sources support the lesson; no patient figure is attributed to p66. |
| p66, gastroduodenal Divertikel heading | `/abdomen/gi/duodenaldivertikel` / `duodenaldivertikel` | Heading only. Bounded duodenal-diverticulum lesson, not a general course on every diverticulum. |
| p22, substantive fibrolamellar carcinoma | `/abdomen/leber/fibrolamellaeres-karzinom` / `fibrolamellaeres-karzinom` | Young/noncirrhotic context, fibrous scar, enhancement and calcification, FNH differential and resection context. Scar signal and prognosis claims are qualified with primary evidence. p22 is text only; actual case is Takahashi et al.2021, Figure1, CC BY4.0. |

All four have dedicated lesson routes, generated conceptual headers, clinical teaching figures, DE/EN/FA copy, local checks and exact MCQ/card registrations. This describes implementation scope. Independent review, browser verification, final clinician approval and publication are separate statuses in the completion/review records.

## Page-level disposition

“Existing core” means the main topic is present in an inspected consumer. It does not mean every historical PDF sentence was reproduced or that every existing lesson has passed a new full scientific/browser review.

| Physical pages | Topic and actual consumer | Disposition / important limits |
| --- | --- | --- |
| 1 | Cover | Metadata only. |
| 2–4 | Liver inflow/outflow, abdominal vessels → `/abdomen/leber/gefaesse`, `data/abdomenLiverVesselsLesson.js` | Existing core; original anatomy diagrams. |
| 5 | Simple liver cyst and complex/cystic differential → `/abdomen/leber/zystische-laesionen` | Existing core. Caroli is a differential mention, not a missing independent course. |
| 6–7 | Hydatid cyst → same route | Existing core: daughter cysts, membranes, complications and intervention caution. |
| 8–9 | Typical hemangioma → `/abdomen/leber/haemangiom` | Existing core; prior case work is not recertified by this ledger. |
| 10 | Atypical hemangioma → same route | Source conflates atypical subtypes. Binary source table is not a universal rule. |
| 11 | Hepatic AVM/shunt → `/abdomen/leber/avm` | Existing core with explicit ambiguity in unlabelled PDF montage. Current delta removes two unrelated-level external case frames; arterial/portal lesion-level comparison retained. No general shunt washout rule inferred. |
| 12–13 | Hepatic AML → `/abdomen/leber/angiomyolipom` | Existing core; variable fat/vascular pattern and qualified source washout contradiction. |
| 14–15 | FNH → `/abdomen/leber/fnh` | Existing core. Historical 70% scar /20% atypical figures are not newly certified here. |
| 16–18 | HCA → `/abdomen/leber/adenom` | Existing core; qualified current clinical section replaces blanket source algorithm. |
| 19 | HCC imaging and biopsy-confirmed atypical case → `/abdomen/leber/hcc` | Existing core. |
| 20–21 | LI-RADS population/features/table → `/abdomen/leber/li-rads` | Existing diagnostic framework; new exact practice access. |
| 22 | LR next steps, FLC, resection/MWA/TACE | FLC added separately. LI-RADS next steps supplemented by AASLD2023; HCC planning added. Selected LR5 biopsy remains possible. |
| 23 | TACE and SIRT | Bounded HCC planning addition. Universal MWA5cm, TACE75% and SIRT-only-after-TACE framing not adopted. Liver reserve, portal flow, selectivity and context retained. |
| 24–25 | Liver metastases → `/abdomen/leber/metastasen` | Existing enhancement-pattern core. Full primary-tumour lists and every historical MRI claim remain supplementary/deferred. |
| 26–27 | Steatosis → `/abdomen/leber/steatose`, `data/steatosisLesson.js` | Existing core; source segment II/III–gallbladder inconsistency already qualified. |
| 27 | Cirrhosis heading | New externally supplemented lesson above. |
| 27 | Traumatic changes placeholder | Empty generic divider; not a source-derived full liver-trauma course. |
| 28–29 | PSC → `/abdomen/leber/psc-mrcp` | Existing MRCP core; bounded addition covers IBD association and complication awareness. No “obligate precancer” claim. |
| 30 | Tumoren placeholder | Empty generic divider; no defined full biliary-tumour course. |
| 31 | Acute pancreatitis/Atlanta → `/abdomen/pankreas/pankreatitis` | Existing core; current delta qualifies retained high-risk wording. |
| 32 | APFC/pseudocyst/ANC/WON; CTSI/Balthazar | Existing core in pancreatitis; dense table independently enlarged. |
| 33 | Pancreatitis vascular complications, infected necrosis and duct disruption | Existing core. Current delta distinguishes gas/infection uncertainty, necrosis extent from definition and conventional MRCP from contrast-excretion imaging. |
| 34 | Chronic pancreatitis and AIP/PDAC differential | Existing pancreatitis core; no separate AIP lesson needed for this source scope. |
| 35–37 | PDAC → `/abdomen/pankreas/pankreaskarzinom` | Imaging/vascular-contact core exists; old TNM explicitly deferred, not claimed current. |
| 38–39 | PanNET → `/abdomen/pankreas/neuroendokrine-tumoren` | Existing imaging core; detailed endocrine syndromes and historical percentages not fully taught. |
| 40–42 | Pancreatic cysts/IPMN → `/abdomen/pankreas/zystische-tumoren` | Existing core and current qualified risk context; full historical WF/management algorithm not reproduced. |
| 43 | Milz placeholder | Empty divider. |
| 44–45 | Renal anatomy/variants → `/abdomen/niere/anatomie` | Existing core with limitations. |
| 46 | Bosniak → `/abdomen/niere/nierenzysten` | Explicit v2019 replacement. Unversioned source risks/management estimates deferred. |
| 47 | Polycystic renal disease heading → `/abdomen/niere/adpkd` | Externally supplemented lesson exists; concept-only, actual-case training deferred. |
| 48 | RCC → `/abdomen/niere/raumforderungen` | Existing imaging/subtype/venous-extension core. |
| 49 | Oncocytoma → same route | Existing scar pattern and diagnostic limitations. |
| 50–51 | Renal AML/fat-poor AML/TSC → same route | Existing core. Bounded hemorrhage/Wunderlich context added; old automatic4cm treatment rule remains excluded. Stale p47 note corrected to ADPKD link. |
| 52 | Wilms → `/abdomen/niere/wilms-tumour`, `data/wilmsLesson.js` | Existing core including source CT/claw-sign limitation and differential. |
| 53–54 | Pyelonephritis/abscess/emphysematous extension → `/abdomen/niere/pyelonephritis` | Existing core; exact practice access addressed separately. Historical gas-compartment wording is not automatically scientifically recertified by topic coverage. |
| 55 | FMD heading | Duplicate; p92 is the substantive source. |
| 56–57 | Fornix rupture → `/abdomen/niere/fornixruptur` | Mapper found absent p57 figure/practice and wrong citation. Current route now consumes `fornixRuptureLesson.js` through the shared GI lesson shell, with source figure, checks and practice registration; citation corrected to physical56–57/printed55–56. Actual browser/visual acceptance remains separate. |
| 58 | Adrenal incidentaloma algorithm → `/abdomen/nebenniere/raumforderungen` | Existing qualified current context; old full source algorithm deferred. |
| 59–60 | Adrenal adenoma → same route | Existing measurement/chemical-shift core; historical universal washout performance rules excluded. |
| 61–62 | Myelolipoma → same route | Existing macroscopic-fat/MRI core. |
| 62 | Adrenal cyst | Explicit limited caveat in same route; no separate lesson required. |
| 63 | Pheochromocytoma → same route | Existing CT/washout mimic core; historical10% mnemonic excluded. |
| 64 | Neuroblastoma → same route | Existing origin/encasement/spread/Wilms differential. |
| 65 | Ösophagus placeholder | Empty divider. |
| 66 | Pyloric stenosis → `/abdomen/gi/pylorusstenose` | Externally supplemented existing lesson; PDF has no patient image. Practice access addressed separately. |
| 66 | Gastroduodenal diverticulum/ulcer headings | New lessons above. |
| 67–68 | GIST → `/abdomen/gi/gist` | Existing morphology core. TNM, PET/Choi and detailed therapy explicitly deferred; not “all source points implemented”. |
| 69 | Ileus types and Winslow hernia → `/abdomen/gi/ileus-volvulus` | Existing core; preserve actual herniated-organ identity in source case. |
| 70 | Intussusception, adhesive fat notch, gallstone ileus/Rigler → same route | Existing core with actual intussusception case. |
| 71–72 | Transition/closed loop/ischemia signs → same and ischemia route | Existing core; absolute caliber/gas rules require context. |
| 73–75 | Mesenteric arterial/venous ischemia/NOMI → `/abdomen/gi/mesenteriale-ischaemie` | Existing CTA/imaging core with limitations; no single-sign irreversibility rule. |
| 76–78 | Sigmoid/cecal volvulus → `/abdomen/gi/ileus-volvulus` | Existing core; duplicate registration resolved. Actual imported MCQ groups now contain this topic once; completion registration test passes. |
| 79–80 | Appendicitis → `/abdomen/gi/appendizitis` | Existing core, qualified diameter values. |
| 81 | C. difficile/PMC → `/abdomen/gi/kolitis-patterns` | Existing pattern core with specificity limitations; practice access addressed separately. |
| 82 | UC/toxic megacolon/Crohn comparison → same route | Existing UC core plus bounded comparison/PSC association addition. Source table was enlarged. Stenosis was not in this source table and is not attributed to it. |
| 83–85 | Diverticulitis → `/abdomen/gi/divertikulitis` | Existing core; source CDD inconsistency and blanket therapy rules not imported as current. |
| 86–87 | Lower GI bleed → `/abdomen/gi/untere-gi-blutung` | Existing CTA/DSA/embolisation core. |
| 88–89 | Colorectal carcinoma → `/abdomen/gi/kolorektales-karzinom` | Existing CT/MRI reporting core; historical T3 subclassification deferred. |
| 90–91 | Female/male pelvis dividers | Empty generic dividers. |
| 92 | FMD → `/abdomen/gefaesse/fmd` | Existing core; canonical location for p55 duplicate. |
| 93–94 | Inguinal/femoral hernia → `/abdomen/hernien/inguinal-femoral` | Existing core; truncated final source line explicitly omitted. |
| 95–96 | Ormond/RPF → `/abdomen/retroperitoneum/morbus-ormond` | Existing core; three authored retrieval cards now registered globally, quiz/card returns supplied. |
| 97 | Epiploic appendagitis → `/abdomen/peritoneum/appendicitis-epiploica` | Existing core. |
| 98 | Mesenteric panniculitis → `/abdomen/peritoneum/mesenteriale-panniculitis` | Existing core/differential; three authored retrieval cards registered globally. |
| 99 | Peritoneal carcinomatosis → `/abdomen/peritoneum/peritonealkarzinose` | Existing core/CT limits; three authored retrieval cards registered globally. |

## What this completion does and does not establish

The batch closes the four missing named lessons and bounded essential omissions. Shared decks for liver vessels, pancreatitis/cysts, renal/adrenal masses and inguinal/femoral hernias remain intentional; an absent separate deck for every subheading is not automatically a missing lesson.

Empty dividers do not define additional whole-organ courses. Historical classifications, detailed treatment schemes outside the imaging objective and unsupported numerical claims are explicitly deferred or replaced with qualified current sources, not silently counted as taught. Source conflicts and image provenance are documented in the topic plans/reviews.

The complete PDF has been inventoried. This is **not a fresh certification of every legacy sentence, translation, image, assessment or interaction**. Final scientific approval by Dr.Zia remains separate from editorial/technical agent review. Build success, curriculum links and `complete` flags are not evidence of clinical correctness.

## Verification pointers

- `scripts/test-abdomen-completion-registration.mjs`: actual four routes, exact question/card topics, three-language retrieval, nine legacy cards and unique Volvulus registration.
- `scripts/test-abdomen-flc-completion.mjs`: actual FLC shell SSR and labels/links.
- `scripts/test-abdomen-legacy-card-access.mjs`: three legacy route action links in all languages.
- `scripts/test-reviewed-exam-distractors.mjs`: seventeen affected MCQs × three languages accepted by the unchanged four-option exam validator.
- Topic plans and image-provenance manifests provide exact primary sources, licensing and author observations. Independent review and browser evidence must be consulted separately before claiming acceptance or publication.


Registration retest: `node --import tsx scripts/test-abdomen-completion-registration.mjs` PASS after Volvulus deduplication. Fornix new route/data and curriculum/practice imports inspected; browser proof remains in the separate QA record.
