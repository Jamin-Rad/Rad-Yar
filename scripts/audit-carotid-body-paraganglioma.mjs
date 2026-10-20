import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const lesson = readFileSync(resolve(root, 'data/carotidBodyParagangliomaLesson.js'), 'utf8')
const page = readFileSync(resolve(root, 'app/gehirn/hals-nnh/paragangliome/page.jsx'), 'utf8')
const curriculum = readFileSync(resolve(root, 'data/curriculum.js'), 'utf8')
const ledger = readFileSync(resolve(root, 'docs/lesson-quality/carotid-body-paraganglioma-wirbelsaeule-p23.md'), 'utf8')
const p24Ledger = readFileSync(resolve(root, 'docs/lesson-quality/carotid-body-paraganglioma-wirbelsaeule-p24.md'), 'utf8')

const checks = [
  ['head/neck route uses the maintained lesson shell', /StandardLessonShell/.test(page)],
  ['lesson uses exact requested curriculum ID', /id:\s*'paragangliome-glomustumoren'/.test(lesson) && /lessonId=\{lesson\.id\}/.test(page)],
  ['curriculum maps exact ID to route and marks in progress', /id:\s*'paragangliome-glomustumoren'[^\n]*link:\s*'\/gehirn\/hals-nnh\/paragangliome'[^\n]*inProgress:\s*true/.test(curriculum)],
  ['spinal paraganglioma remains a separate curriculum item', /id:\s*'paragangliom-spinal'/.test(curriculum) && /paragangliom-spinal remains separate/.test(lesson)],
  ['both source pages and printed numbering are explicit', /Wirbelsäule\.pdf/.test(lesson) && /PDF-Seiten 23–24/.test(lesson) && /Druckseiten 22–23/.test(lesson) && /PDF-Seite 24/.test(lesson) && /Druckseite 23/.test(lesson) && /PDF p\.24 addendum ledger/.test(p24Ledger)],
  ['source case identifier is preserved', /rID 47694/.test(lesson) && /rID 47694/.test(ledger)],
  ['lesson title is present in all three languages', ['Paragangliom der Karotisbifurkation', 'Carotid body paraganglioma', 'پاراگانگلیوم جسم کاروتید'].every(text => lesson.includes(text))],
  ['MRI signal description is localized in all three languages', ['iso- bis hypointens zur Muskulatur', 'iso- to hypointense relative to muscle', 'هم‌سیگنال تا کم‌سیگنال نسبت به عضله'].every(text => lesson.includes(text))],
  ['salt-and-pepper retrieval feedback is localized', ['Flow-Voids', 'flow voids', 'Flow voidهای نقطه‌ای'].every(text => lesson.includes(text))],
  ['PDF-only DWI heading does not become an invented pattern', /DWI pattern is added/.test(lesson) && /No DWI pattern added/.test(ledger)],
  ['unverified statistics are excluded and source size caveat is qualified', !/5–10|5-10|30\s*%|40\.–60\./.test(lesson) && /2 cm/.test(lesson) && /not a diagnostic cutoff/.test(ledger)],
  ['scope is distinct from spinal imaging', /keine spinalen MRT-Merkmale/.test(lesson) && /do not support spinal paraganglioma/.test(lesson)],
  ['localized checks and source crop are wired', /SelfCheck/.test(page) && /additionalCheck/.test(page) && /ct-case-rid47694\.png/.test(page)],
  ['p24 modality roles are covered in all languages', ['TOF-MRA / CE-MRA', 'TOF-MRA / CE-MRA', 'TOF-MRA / CE-MRA'].every(text => lesson.includes(text)) && ['68Ga-DOTATATE-PET/CT', '68Ga-DOTATATE PET/CT', '68Ga-DOTATATE PET/CT'].every(text => lesson.includes(text))],
  ['all PDF p24 named differential diagnoses are included', ['Schwannom', 'Glomus vagale', 'Lymphknotenmetastase', 'Karotisaneurysma'].every(text => lesson.includes(text))],
  ['treatment and embolization claims stay internal and deferred', !/emboliz|preoperative intervention|intervention-planning|DOTATATE.*treatment/i.test(lesson) && /Excluded from learner-facing recommendations/.test(p24Ledger) && /24–48-hour.*timing/.test(p24Ledger) && /does not recommend treatment, indication, embolization, or procedural timing/i.test(p24Ledger)],
  ['DSA is framed only as targeted vascular imaging', /gezielte Methode zur Gefäßdarstellung/.test(lesson) && /targeted method for vascular depiction/.test(lesson) && /روشی هدفمند برای نمایش عروق/.test(lesson) && !/SDHD/.test(lesson) && !/intervention planning/i.test(lesson)],
  ['second self-check tests modality roles in DE/EN/FA', ['Bei bekanntem Kopf-Hals-Paragangliom', 'A patient with known head-and-neck paraganglioma', 'در بیمار مبتلا به پاراگانگلیوم شناخته‌شده'].every(text => lesson.includes(text))],
  ['scope remains head-neck carotid body, not spinal paraganglioma', /paragangliom-spinal remains separate/.test(lesson) && /do not support spinal paraganglioma/.test(lesson)],
  ['source crop exists and is non-empty', existsSync(resolve(root, 'public/educational/carotid-body-paraganglioma/ct-case-rid47694.png')) && statSync(resolve(root, 'public/educational/carotid-body-paraganglioma/ct-case-rid47694.png')).size > 10_000],
]

for (const [label, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${label}`)
if (checks.some(([, pass]) => !pass)) process.exitCode = 1
