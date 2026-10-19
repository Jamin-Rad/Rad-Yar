import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { HIV_COPY, HIV_CHAPTERS } from '../data/gehirnHivEnzephalopathieLesson.js'

const langs = ['de', 'en', 'fa']
const route = 'app/gehirn/infektionen/hiv-enzephalopathie/page.jsx'
const routeText = await readFile(route, 'utf8')
const curriculum = await readFile('data/curriculum.js', 'utf8')
const ledger = await readFile('docs/lesson-quality/gehirn-hiv-encephalopathy-p63-p64.md', 'utf8')
const provenance = await readFile('public/educational/hiv-enzephalopathie/image-provenance.json', 'utf8')
const localized = []
function collect(value, path = 'copy') {
  if (Array.isArray(value)) return value.forEach((item, i) => collect(item, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    localized.push([path, value])
    for (const lang of langs) assert.ok(value[lang].trim().length > 1, `${path}/${lang}: missing translation`)
    if (value.de.length > 24 && value.en.length > 24) assert.notEqual(value.de, value.en, `${path}: full German and English sentences are identical`)
    if (value.fa.length > 24) assert.match(value.fa, /[\u0600-\u06FF]/u, `${path}/fa: Persian script missing`)
    assert.match(value.de, /[A-Za-zÄÖÜäöüß]/u, `${path}/de: German Latin text missing`)
    assert.match(value.en, /[A-Za-z]/u, `${path}/en: English Latin text missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) collect(child, `${path}.${key}`)
}
collect(HIV_COPY)
collect(HIV_CHAPTERS)
assert.ok(localized.length >= 35, `expected broad DE/EN/FA coverage; found ${localized.length} localized units`)
assert.deepEqual(HIV_CHAPTERS.map(x => x.id), ['approach', 'findings', 'limits', 'takehome'])
assert.match(curriculum, /id: 'hiv-enzephalopathie'[^\n]+link: '\/gehirn\/infektionen\/hiv-enzephalopathie', inProgress: true/)
assert.match(routeText, /useLessonReadStatus\('hiv-enzephalopathie'\)/)
assert.match(routeText, /pdf-case\.png/)
assert.match(routeText, /aria-live="polite"/)
assert.match(ledger, /no highly specific/i)
assert.match(ledger, /rID 22069/)
assert.match(ledger, /does not prove|not a diagnostic/i)
assert.match(ledger, /Haziot MEJ.*Dement Neuropsychol.*2015/)
assert.match(ledger, /subcortical U-fibres and cortex/i)
assert.match(ledger, /parieto-occipital/i)
assert.match(ledger, /no mass effect, no diffusion restriction, no contrast enhancement/i)
assert.match(provenance, /"dpi": 110/)
assert.match(provenance, /"crop_box_render_pixels": \{ "left": 150, "top": 100, "width": 590, "height": 620 \}/)
assert.match(provenance, /contributor.*unknown/i)
assert.match(provenance, /terms.*unknown/i)
for (const file of ['public/educational/hiv-enzephalopathie/hero.svg', 'public/educational/hiv-enzephalopathie/pdf-case.png', 'public/educational/hiv-enzephalopathie/image-provenance.json']) await access(file)
console.log(`HIV encephalopathy lesson checks passed (${localized.length} localized units).`)
