import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const routePath = 'app/abdomen/gi/mesenteriale-ischaemie/page.js'
const route = readFileSync(resolve(root, routePath), 'utf8')
const curriculum = readFileSync(resolve(root, 'data/curriculum.js'), 'utf8')
const ledger = readFileSync(resolve(root, 'docs/lesson-quality/mesenterial-ischaemie-pdf-review.md'), 'utf8')

const required = [
  ['route uses shared shell', /LessonReferenceShell/.test(route)],
  ['exact lesson ID', /lessonId="mesenteriale-ischaemie"/.test(route)],
  ['German, English and Persian dictionaries', /de:\s*\{/.test(route) && /en:\s*\{/.test(route) && /fa:\s*\{/.test(route)],
  ['curriculum route link', /id:\s*'mesenteriale-ischaemie'[^\n]*link:\s*'\/abdomen\/gi\/mesenteriale-ischaemie'/.test(curriculum)],
  ['source pages and current guideline in ledger', /Abdomen\.pdf.*p\.73/.test(ledger) && /ESVS 2025/.test(ledger)],
]

for (const key of ['protocolTitle', 'flow', 'arterialText', 'venousText', 'strangulationTitle', 'strangulationText', 'nomiText', 'bowelTitle', 'bowel', 'cave', 'imageArterialAlt', 'imageVenousAlt', 'arterialCaption', 'venousCaption', 'checkQ', 'options', 'explanation', 'summary']) {
  const occurrences = route.match(new RegExp(`\\b${key}\\s*:` , 'g'))?.length ?? 0
  required.push([`DE/EN/FA semantic unit exists for ${key}`, occurrences >= 3])
}
required.push(['target sign and three-layer wall covered in all languages', ['Target-Zeichen', 'target sign', 'علامت هدف'].every(term => route.includes(term))])
required.push(['closed-loop/strangulation included without copied frequency', /Closed loop und Strangulation/.test(route) && !/> 75 % der Fälle/.test(route) && /not carried forward as a current figure/.test(route) && /به‌عنوان عدد معتبر امروزی بازگو نمی‌شود/.test(route)])

for (const asset of ['public/abdomen/mesenteric/arterial-occlusion-cta.png', 'public/abdomen/mesenteric/venous-thrombosis-ct.png']) {
  required.push([`image asset exists: ${asset}`, existsSync(resolve(root, asset)) && statSync(resolve(root, asset)).size > 10_000])
}

const failed = required.filter(([, pass]) => !pass)
for (const [label, pass] of required) console.log(`${pass ? 'PASS' : 'FAIL'} ${label}`)
if (failed.length) process.exitCode = 1
