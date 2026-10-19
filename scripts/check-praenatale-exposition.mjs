import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { CURRICULUM } from '../data/curriculum.js'
import { getLessonStatus } from '../data/lessonStatus.js'

const require = createRequire(import.meta.url)
const path = 'app/technik/strahlenschutz/praenatale-exposition/page.jsx'
const page = await readFile(path, 'utf8')
const ledger = await readFile('docs/lesson-quality/technik-p24-pranatale-exposition.md', 'utf8')
const langs = ['de', 'en', 'fa']
const triplets = [...page.matchAll(/L\('((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'\)/gs)]
assert.ok(triplets.length >= 25, `Expected a substantial set of localized units, found ${triplets.length}`)
for (const [de, en, fa] of triplets.map(match => match.slice(1))) {
  assert.ok(de.trim() && en.trim() && fa.trim(), 'Every localized unit has non-empty DE/EN/FA strings')
  assert.match(fa, /[\u0600-\u06FF]/, `Persian string should contain Persian script: ${fa}`)
}

const topic = CURRICULUM.flatMap(subject => subject.kapitel.flatMap(chapter => chapter.themen)).find(item => item.id === 'praenatale-strahlenexposition')
assert.equal(topic?.link, '/technik/strahlenschutz/praenatale-exposition')
assert.equal(topic?.inProgress, true)
assert.equal(getLessonStatus(topic.link), 'in_progress')
assert.ok(!CURRICULUM.flatMap(subject => subject.kapitel.flatMap(chapter => chapter.themen)).some(item => item.id === 'mamma-schwangerschaft-stillzeit' && item.link === topic.link), 'Keep this radiation-protection topic distinct from broad breast pregnancy/lactation topic')

const jsx = require('esbuild').transformSync(page, { loader: 'jsx', format: 'esm' }).code
assert.ok(jsx.includes('heroImageAlt'))
assert.match(page, /import Footer from '@\/components\/Footer'/)
assert.match(page, /syncHashNavigation/)
assert.match(page, /<Footer \/>/)
const hero = await readFile('public/technik/strahlenschutz/praenatale-exposition/hero.svg', 'utf8')
assert.match(hero, /not a dose or risk scale/i)
assert.match(hero, /path d="M360 118v32H202v40"/i, 'The SVG must show a conditional reporting branch')
assert.match(hero, /path d="M360 150h158v40"/i, 'The SVG must show the parallel investigation branch')
for (const required of [
  'unverzüglich', 'allen verfügbaren Angaben', 'nach Abschluss der Untersuchung',
  'without delay', 'all information available', 'after the investigation is complete',
  'بی‌درنگ', 'اطلاعات موجود', 'پس از پایان بررسی',
]) assert.ok(page.includes(required), `Missing §108/§109 workflow meaning: ${required}`)
assert.match(page, /parallel nach §109/i)
assert.match(page, /in parallel, investigate and record/i)
assert.match(page, /هم‌زمان، طبق §۱۰۹/)
assert.match(page, /Prompt significance assessment and parallel action/)
assert.match(page, /ارزیابی فوری اهمیت رویداد و اقدام موازی/)
assert.match(page, /DLP is not itself fetal dose/)
assert.match(page, /a displayed dose metric such as DLP is not itself fetal dose/)
assert.match(page, /عددی مانند DLP به‌تنهایی دوز جنین نیست/)
assert.match(page, /Pregnancy discovered later does not by itself trigger a report/)
assert.match(page, /کشف دیرهنگام بارداری به‌تنهایی موجب گزارش نیست/)
assert.match(page, /Keine pauschale Risikozahl oder Empfehlung zum Schwangerschaftsausgang/)
assert.match(page, /Do not infer a blanket risk number or pregnancy-outcome recommendation/)
assert.match(page, /از یک عدد دوز، خطر کلی یا توصیه درباره پیامد بارداری نتیجه‌گیری نکنید/)
assert.doesNotMatch(page, /<\s*1\s*mGy|>\s*100\s*mGy|1.?100\s*mGy|Schwangerschaftsabbruch.{0,80}(Option|empfehlen|consider)/i, 'PDF dose bands/outcome advice must not enter lesson content')
for (const source of ['https://www.gesetze-im-internet.de/strlschv_2018/BJNR203600018.html', 'https://ssk.de/publikationen/2025-10-28-praenatale-exposition', 'https://www.apt2.drg.de/de-DE/8860/bericht-praenatale-strahlenexposition-aus-medizinischer-indikation/', 'https://doris.bfs.de/jspui/bitstream/urn%3Anbn%3Ade%3A0221-2021010624674/3/2020_BfS_3617S42332_3617S42333_LF.pdf']) assert.ok(page.includes(source), `missing authoritative reference ${source}`)
assert.match(ledger, /New exact curriculum ID: `praenatale-strahlenexposition`/)
assert.match(ledger, /Dose bands \(<1, 1–100, >100 mGy\).*Omitted entirely/)
assert.match(ledger, /legal advice for a specific case/)
assert.match(ledger, /no global MCQ-bank entry is claimed/i)
assert.match(ledger, /§108\(1–2\).*without delay, with all available information/)
assert.match(ledger, /§109\(1–2\)/)
assert.match(ledger, /investigation and recording .*continue in parallel/i)

console.log(`Prenatal exposure scoped checks passed: ${triplets.length} localized L() units, exact new curriculum mapping/status, assessment and source/scope boundaries. These checks do not establish clinical signoff or rendered UX.`)
