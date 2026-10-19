import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { SELLA_COPY, SELLA_CHAPTERS } from '../data/gehirnSellaParasellaLesson.js'

const langs = ['de', 'en', 'fa']
const routePath = 'app/gehirn/tumoren/sella-parasella/page.jsx'
const route = await readFile(routePath, 'utf8')
const curriculum = await readFile('data/curriculum.js', 'utf8')
const ledger = await readFile('docs/lesson-quality/gehirn-sella-parasella-p49.md', 'utf8')
const units = []
function walk(value, path = 'copy') {
  if (Array.isArray(value)) return value.forEach((item, i) => walk(item, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    units.push([path, value])
    for (const lang of langs) assert.ok(value[lang].trim().length > 1, `${path}/${lang}: empty`)
    if (value.de.length > 22 && value.en.length > 22) assert.notEqual(value.de, value.en, `${path}: DE/EN sentence collision`)
    if (value.fa.length > 22) assert.match(value.fa, /[\u0600-\u06FF]/u, `${path}/fa: Persian text missing`)
    if (value.de.length > 22) assert.match(value.de, /[A-Za-zÄÖÜäöüß]/u, `${path}/de: German text missing`)
    if (value.en.length > 22) assert.match(value.en, /[A-Za-z]/u, `${path}/en: English text missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`)
}
walk(SELLA_COPY); walk(SELLA_CHAPTERS)
assert.ok(units.length >= 35, `expected broad DE/EN/FA coverage; got ${units.length}`)
assert.equal(SELLA_COPY.rows.length, 3)
assert.equal(SELLA_COPY.check.options.length, 4)
assert.equal(SELLA_COPY.check.feedback.length, 4)
assert.equal(SELLA_COPY.diagramLegend.length, 4)
assert.deepEqual(SELLA_COPY.diagramLegend.map(item => item.de), ['Hypophyse / Sella', 'Hypophysenstiel', 'Optisches Chiasma', 'Sinus cavernosus (beidseits)'])
assert.deepEqual(SELLA_COPY.diagramLegend.map(item => item.en), ['Pituitary / sella', 'Pituitary stalk', 'Optic chiasm', 'Cavernous sinus (both sides)'])
assert.deepEqual(SELLA_COPY.diagramLegend.map(item => item.fa), ['هیپوفیز / سلا', 'ساقهٔ هیپوفیز', 'کیاسمای بینایی', 'سینوس کاورنوس (دوطرفه)'])
assert.deepEqual(SELLA_CHAPTERS.map(s => s.id), ['orientation', 'patterns', 'limits', 'takehome'])
for (const id of ['sella-parasellaere-region-anatomie', 'hypophysenadenom', 'rathke-tasche-zyste', 'kraniopharyngeom']) {
  assert.match(curriculum, new RegExp(`id: '${id}'[^\\n]+link: '/gehirn/tumoren/sella-parasella', inProgress: true`), `${id}: mapped to route and remains inProgress`)
}
assert.match(route, /useLessonReadStatus\('sella-parasellaere-region-anatomie'\)/)
assert.match(route, /aria-live="polite"/)
assert.match(route, /s41574-025-01134-8/)
assert.match(ledger, /heading page only/i)
assert.match(ledger, /no diagnostic case image/i)
assert.match(ledger, /no global MCQ or flashcard/i)
assert.match(ledger, /Ugga L, Franca RA, Scaravilli A, Solari D, Cocozza S, Tortora F, Cavallo LM, De Caro MBD, Elefante A/)
const svg = await readFile('public/educational/sella-parasella/hero.svg', 'utf8')
for (const number of ['>1<', '>2<', '>3<', '>4<']) assert.ok(svg.includes(number), `diagram missing callout ${number}`)
for (const file of ['public/educational/sella-parasella/hero.svg', 'public/educational/sella-parasella/image-provenance.json']) await access(file)
console.log(`Sellar-region lesson checks passed (${units.length} localized units).`)
