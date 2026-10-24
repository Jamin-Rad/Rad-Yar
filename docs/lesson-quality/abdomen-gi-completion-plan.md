# Abdomen GI completion — source and visual plan

Authoring scope: `ulkuserkrankung`, `duodenaldivertikel`; physical Abdomen.pdf p66, printed p65. The mapper and extracted page show headings only, not a supplied diagnostic description. Both titles will be covered; all substantive teaching is supplemental. No claim that a detailed source chapter was transcribed. Clinical approval remains pending Dr. Zia.

Audience: radiology trainees. Prerequisite: basic gastroduodenal CT anatomy. References: active CAA content and StandardLessonShell / andarun/test; lesson skill, quality standard and educational page design principles read before implementation.

## Learning and source ledger

| Point | Source | Purpose / placement |
|---|---|---|
| Ulkuserkrankung heading | Abdomen.pdf p66 | New exact-topic route |
| Duodenal diverticula heading | Abdomen.pdf p66 | New exact-topic route |
| Deep ulcer crater vs nonspecific inflammatory wall change; negative CT limitation | Tonolini et al., 2017, DOI 10.1007/s13244-017-0562-5, own clinical examples Fig 2–3 | Recognise pattern, then CT/endoscopy limits |
| Perforation and bleeding require timely evaluation; CT in suspected perforation, endoscopy for bleeding | WSES guideline, 2020, DOI 10.1186/s13017-019-0283-9 | Complication chapter, no drug regimen |
| Fluid-filled periampullary pouch may mimic pancreatic cyst; gas and communication are clues | Macari et al., 2003, seven patients, DOI 10.2214/ajr.180.1.1800195; Ng et al. 2016 three cases DOI 10.12659/AJCR.896944 | Pattern, pitfall, exact-topic questions |
| Luminal continuity does not equal perforation | Khan, Chetan, D’Costa 2022 case DOI 10.1259/bjrcr.20210196 | Labelled large-diverticulum pitfall, not presented as typical size |
| Inflammatory changes/extraluminal gas suggest complication | Vasin et al. 2024 case DOI 10.7759/cureus.65494 | Complication distinction, no universal treatment algorithm |

Verification date: 2026-10-24. Primary publications/guideline and original clinical examples accessed using web tool. Scope excludes prevalence percentages, medication protocols, pediatric windsock diverticula and unsupported diagnostic thresholds.

## Chapters and visual rationale

- Ulcer: mucosal defect → direct/indirect CT findings with original Fig 2 → complications and diagnostic limits → three take-home rules. Two embedded explanatory checks.
- Diverticulum: establish connection to duodenum → gas/fluid and pancreatic-cyst pitfall → distinguish complication, with original clinical illustration → three take-home rules. Two checks.
- Two separate generated medical concept heroes, no text or simulated diagnostic scans; imagegen skill applies. Precise lumen/outpouching schematic is explanatory only.
- Ulcer original Fig 2 from Tonolini: endoscopically confirmed prepyloric ulcer with CT crater. Article CC BY 4.0, verify actual pixels and preserve original panels/arrows.
- Diverticulum original Khan Fig 3 or Fig 1: confirm luminal filling/large pouch and explicitly label atypically large case, CC BY 4.0. No use of Ng images (CC BY-NC-ND); use that paper for source-backed factual interpretation only.

## Language and assessment contract

Ulkuskrater / ulcer crater / دهانهٔ زخم; Schleimhaut / mucosa / مخاط; Lumenkontinuität / luminal continuity / ارتباط با لومن; Divertikulitis / diverticulitis / دیورتیکولیت. Natural equivalent DE/EN/FA captions, alt, feedback, caveats. Two MCQs and two self-contained cards per topic; cards written as independent recall prompts. Locale-preserving encoded return paths, language-keyed inline checks and shared hash/read state.

## Evidence status

Source and outline established before code. Parent owns shared registry integration and release. Never infer scientific approval from successful technical tests.

## Completed author evidence

- Source page text and rendered contact sheet `tmp/abdomen-completion/contact-061.jpg` inspected: physical p66 contains the three headings and placeholder letters only. No clinical image exists on that page. The existing pyloric stenosis route remains outside this owned scope.
- Added original blinded CT/endoscopy study: Allen et al., 2015, 114 subjects, https://pubmed.ncbi.nlm.nih.gov/25015399/ (DOI 10.1007/s00261-014-0190-1). Supports occult ulcers, multiplanar interpretation and ancillary signs. No cohort percentage is generalized as a universal sensitivity threshold in the lesson.
- Added **typical first case**, Pavan et al. 2022 original Fig. 13, DOI 10.1590/0100-3984.2021.0106. Unenhanced axial CT of an incidental duodenal diverticulum, visible gas-fluid content. The selected slice does not alone establish the full neck; caption explicitly asks for continuity across adjacent slices. The publisher confirms CC BY 4.0 at https://rb.org.br/about-the-authors/3441/en-US and the SciELO article confirms unrestricted attributed reuse. This original illustrated case is the media source, not a general management guideline.
- Three clinical image files individually inspected using view_image: `ulcer-ct.png` (709×233, original three-plane CT figure), `diverticulum-typical.jpg` (385×314), `diverticulum-fluoro.jpg` (520×347). Visible original arrows preserved. GIF→PNG is a lossless format conversion only. Original figures are otherwise unchanged. All have translated teaching caption/alt, named authors, DOI and CC BY link. Images open at original dimensions for enlargement; available source resolution is limited, especially the typical CT.
- Khan Fig. 4 CT was downloaded and inspected but **not used**: typical introductory image from Pavan is clearer for this purpose. Khan Fig. 3 fluoroscopy retained only as a labelled atypically large pitfall, after typical teaching. No NC-restricted images used. No diagnostic scan was generated.
- Precise extra diagram considered but not added: the original fluoroscopy demonstrates luminal filling directly, and the table compares urgent complications without redundant decorative graphics.
- Two topic-specific built-in imagegen outputs visually inspected and converted to WebP, stored in `public/educational/abdomen-gi-completion/`. Ulcer concept hero has cutaway stomach with a focal prepyloric mucosal crater; diverticulum hero has C-shaped duodenum and small medial pouch. Both labelled as concept art via localized alt.
- `node scripts/test-abdomen-gi-ssr.mjs`: PASS, two routes × DE/EN/FA; single H1, RTL, first-only open chapter, sources, real file assets, exact-topic quiz/cards, encoded locale return; four MCQs/language and four unique self-contained recall cards. This does not exercise actual browser interactions.
- `git diff --check`: PASS for tracked changes; owned new sources also parsed by esbuild SSR test. No shared registry changes or commit made by this author.
- Independent review, browser matrix/interactions and Dr. Zia's clinical signoff remain pending. No clinical acceptance claimed.

Review correction: initial generated test accidentally omitted the SSR loop despite its log; it was repaired to call `renderToString` six times and assert actual output before the final successful run. ExamDB requires four options: all four GI questions now provide A–D with three wrong-answer explanations, and the renderer and assertions use that contract.

License clarification: Khan 2022 original PDF first-page declaration explicitly specifies CC Attribution 4.0 unrestricted reuse. The current migrated OUP footer inconsistently says non-commercial while linking CC BY; independent reviewer confirmed the original PDF declaration separately. The original publication license is the basis for Fig. 3 reuse.

### Media source URLs

Ulcer full-resolution figure: https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs13244-017-0562-5/MediaObjects/13244_2017_562_Fig2_HTML.gif

Typical diverticulum: https://rb.org.br/imagebank/imagens/aop-2021-0106-fig13.jpg

Large diverticulum fluoroscopy: publisher Figure 3 at https://academic.oup.com/bjrcr/article/8/3/20210196/7243857 (original figure delivery uses a signed CDN URL, not used as a lesson runtime dependency).

### Generated hero prompts (built-in imagegen)

Ulcer: “Create a refined medical editorial hero illustration for a radiology lesson on peptic ulcer disease. Landscape 3:2. Dark deep teal background, softly lit anatomical cutaway of a human stomach and proximal duodenum on the RIGHT half, realistic folded pink mucosa and one small clearly defined shallow ulcer crater in the prepyloric mucosa. Restrained copper and ivory palette, elegant three dimensional medical illustration, ample calm dark negative space on the LEFT for page title overlay. No text, no symbols, no labels, no CT or MRI, no decorative particles, no cartoon or icon. Educational concept art, not diagnostic evidence.”

Diverticulum: “Refined medical editorial hero illustration, landscape 3:2. Human proximal duodenum as a soft C-shaped tubular anatomical segment with a single small rounded outward pouch on its inner medial wall, realistic flesh coloured anatomical rendering, gentle warm ivory and copper highlights against a dark deep teal background. Focus anatomy on RIGHT half leaving calm empty LEFT half for title overlay. Elegant softly lit professional medical atlas concept art. No text, labels, arrows, icons, particles, CT, MRI, scan, or cartoon. External shape only, no fabricated diagnostic evidence.”
