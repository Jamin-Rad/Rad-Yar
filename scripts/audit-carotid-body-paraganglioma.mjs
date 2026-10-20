import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const lesson = readFileSync(resolve(root, 'data/carotidBodyParagangliomaLesson.js'), 'utf8')
const page = readFileSync(resolve(root, 'app/gehirn/hals-nnh/paragangliome/page.jsx'), 'utf8')
const curriculum = readFileSync(resolve(root, 'data/curriculum.js'), 'utf8')
const ledger = readFileSync(resolve(root, 'docs/lesson-quality/carotid-body-paraganglioma-wirbelsaeule-p23.md'), 'utf8')

const checks = [
  ['head/neck route uses the maintained lesson shell', /StandardLessonShell/.test(page)],
  ['lesson uses exact requested curriculum ID', /id:\s*'paragangliome-glomustumoren'/.test(lesson) && /lessonId=\{lesson\.id\}/.test(page)],
  ['curriculum maps exact ID to route and marks in progress', /id:\s*'paragangliome-glomustumoren'[^\n]*link:\s*'\/gehirn\/hals-nnh\/paragangliome'[^\n]*inProgress:\s*true/.test(curriculum)],
  ['spinal paraganglioma remains a separate curriculum item', /id:\s*'paragangliom-spinal'/.test(curriculum) && /paragangliom-spinal remains separate/.test(lesson)],
  ['source PDF and page numbering are explicit', /Wirbelsäule\.pdf/.test(lesson) && /PDF-Seite 23/.test(lesson) && /Druckseite 22/.test(lesson)],
  ['source case identifier is preserved', /rID 47694/.test(lesson) && /rID 47694/.test(ledger)],
  ['lesson title is present in all three languages', ['Paragangliom der Karotisbifurkation', 'Carotid body paraganglioma', 'پاراگانگلیوم جسم کاروتید'].every(text => lesson.includes(text))],
  ['MRI signal description is localized in all three languages', ['iso- bis hypointens zur Muskulatur', 'iso- to hypointense relative to muscle', 'هم‌سیگنال تا کم‌سیگنال نسبت به عضله'].every(text => lesson.includes(text))],
  ['salt-and-pepper retrieval feedback is localized', ['Flow-Voids', 'flow voids', 'Flow voidهای نقطه‌ای'].every(text => lesson.includes(text))],
  ['PDF-only DWI heading does not become an invented pattern', /DWI pattern is added/.test(lesson) && /No DWI pattern added/.test(ledger)],
  ['unverified statistics are excluded and source size caveat is qualified', !/5–10|5-10|30\s*%|40\.–60\./.test(lesson) && /2 cm/.test(lesson) && /not a diagnostic cutoff/.test(ledger)],
  ['scope is distinct from spinal imaging', /keine spinalen MRT-Merkmale/.test(lesson) && /does not support spinal paraganglioma/.test(lesson)],
  ['localized assessment and source crop are wired', /SelfCheck/.test(page) && /ct-case-rid47694\.png/.test(page)],
  ['source crop exists and is non-empty', existsSync(resolve(root, 'public/educational/carotid-body-paraganglioma/ct-case-rid47694.png')) && statSync(resolve(root, 'public/educational/carotid-body-paraganglioma/ct-case-rid47694.png')).size > 10_000],
]

for (const [label, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${label}`)
if (checks.some(([, pass]) => !pass)) process.exitCode = 1
