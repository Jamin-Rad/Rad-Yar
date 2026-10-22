import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DISTALE_RADIUS_LESSON, DISTALE_RADIUS_QUESTIONS, DISTALE_RADIUS_FLASHCARDS } from '../data/distale-radiusfraktur.js'

const langs = ['de', 'en', 'fa']
const imageDir = new URL('../public/distale-radiusfraktur/', import.meta.url)
const topic = DISTALE_RADIUS_LESSON
const ledger = fs.readFileSync(new URL('../docs/lesson-quality/source-ledgers/distale-radius-msk-p17-p18.md', import.meta.url), 'utf8')
const routeSource = fs.readFileSync(new URL('../app/msk/trauma/distale-radiusfraktur/page.js', import.meta.url), 'utf8')
assert.doesNotMatch(routeSource, /useEffect\(\(\)\s*=>\s*setOpen\(false\)/, 'sections stay open on initial render')
assert.match(routeSource, /querySelector\('button\[aria-expanded="false"\]'\)/, 'TOC finds a collapsed destination section')
assert.match(routeSource, /header\?\.click\(\)[\s\S]*target\?\.scrollIntoView/, 'TOC expands before scrolling')
assert.match(ledger, /DRF-UX-01[\s\S]*route now keeps/i, 'independent UX finding and correction are recorded')
assert.match(ledger, /DRF-LNG-01[\s\S]*three-language legend/i, 'embedded English labels have a recorded localized legend')

for (const lang of langs) {
  const fernandez = topic.fernandez
  assert.ok(fernandez, `${lang}: existing Fernandez section remains`)
  assert.equal(fernandez.rows.length, 5)
  const table = fernandez.rows.map(row => row.map(cell => cell[lang]).join(' ')).join(' ')
  for (const term of [
    /bending|Biegung|خمشی/i,
    /shear|Scherung|برشی/i,
    /compression|Kompression|فشاری/i,
    /avulsion|Avulsion|آولسیون/i,
    /combination|Kombination|ترکیبی/i,
    /radiocarpal|radiokarpal|رادیوکارپال/i,
    /high-energy|Hochenergie|پرانرژی/i,
  ]) assert.match(table, term, `${lang}: source mechanisms and patterns are present`)
  assert.match(fernandez.key[lang], /stability assessment|Stabilitätsbeurteilung|ارزیابی اختصاصی پایداری/i)
  assert.doesNotMatch(fernandez.key[lang], /increasingly unstable|zunehmend instabil|به‌طور فزاینده ناپایدار/i)
  assert.match(topic.muster.items[0].text[lang], /dorsal|dorsal|دورسال/i)
  assert.match(topic.muster.items[1].text[lang], /volar|palmar|ولار/i)
  assert.match(topic.muster.items[2].text[lang], /carpus|Karpus|کارپ/i)
  assert.equal(topic.muster.imageLegend.length, 3, `${lang}: embedded figure labels have a localized legend`)
  for (const item of topic.muster.imageLegend) assert.ok(item.title[lang] && item.text[lang], `${lang}: figure legend item is translated`)
  const chauffeur = topic.sonderformen.items.find(item => /Chauffeur/i.test(`${item.title.de} ${item.title.en}`))
  assert.match(chauffeur.text[lang], /bony avulsion|knöcherne Avulsion|آولسیون استخوانی/i)
  const slText = topic.begleitverletzungen.items[0].text[lang]
  assert.match(slText, /rough guide|grobe Orientierung|راهنمای تقریبی/i)
  assert.match(slText, /opposite wrist|Gegenseite|مچ مقابل/i)
  assert.match(topic.begleitverletzungen.images[0].caption[lang], /single PA|einzelne PA|یک نمای PA/i)
  assert.match(topic.begleitverletzungen.images[0].caption[lang], /does not establish|belegt keine|اثبات نمی‌کند/i)
}

for (const filename of ['fernandez-schema.png', 'fernandez-roentgen.png', 'klassische-muster.png', 'fall-rid88989.jpeg']) {
  const stat = fs.statSync(new URL(filename, imageDir))
  assert.ok(stat.size > 10_000, `${filename} exists as a non-empty visual asset`)
}
assert.match(topic.fernandez.schemaAlt.de, /Frakturmuster/)
assert.match(topic.fernandez.xrayAlt.en, /MSK\.pdf, page 17/)
assert.equal(topic.begleitverletzungen.radiopaediaUrl, 'https://radiopaedia.org/cases/88989')
assert.match(ledger, /MSK\.pdf`, p\.18[\s\S]*klassische-muster\.png/, 'classic-pattern image provenance is tied to the supplied PDF page')
assert.doesNotMatch(ledger, /code-native diagram/i, 'do not misidentify the supplied-PDF comparison as code-native')

const q = (id, lang) => DISTALE_RADIUS_QUESTIONS[lang].find(question => question.id === `distaleradius-${lang}-${id}`)
const answer = question => question.options.find(option => option.id === question.correct)?.text
for (const lang of langs) {
  const fernandezQ = q('fernandez-ii', lang)
  assert.ok(fernandezQ)
  assert.match(answer(fernandezQ), /II|Barton|بارتون/i)
  assert.match(fernandezQ.explanation, /shear|Scher|برشی/i)
  const chauffeurQ = q('chauffeur', lang)
  assert.match(answer(chauffeurQ), /bony avulsion|knöcherne Avulsion|آولسیون استخوانی/i)
  assert.match(chauffeurQ.explanation, /PDF|Avulsion|آولسیون/i)
  const slQ = q('sl', lang)
  assert.match(answer(slQ), /roughly|grob|حدوداً/i)
  assert.match(slQ.explanation, /not a universal cutoff|kein universeller Grenzwert|نه حد قطعی همگانی/i)
  assert.match(slQ.explanation, /opposite wrist|Gegenseite|سمت مقابل/i)
}

const cards = Object.fromEntries(DISTALE_RADIUS_FLASHCARDS.map(card => [card.id, card]))
for (const id of ['drf-fc-01', 'drf-fc-02', 'drf-fc-03', 'drf-fc-04', 'drf-fc-06', 'drf-fc-10', 'drf-fc-11']) {
  assert.ok(cards[id], `${id} remains in the linked flashcard deck`)
  for (const field of ['front', 'answer', 'explanation']) {
    for (const lang of langs) assert.ok(cards[id][field][lang].trim(), `${id}.${field}.${lang} is present`)
  }
}
for (const lang of langs) {
  assert.match(cards['drf-fc-04'].explanation[lang], /stability assessment|Stabilitätsbeurteilung|ارزیابی پایداری/i)
  assert.match(cards['drf-fc-06'].answer[lang], /bony avulsion|knöcherne Avulsion|آولسیون استخوانی/i)
  assert.match(cards['drf-fc-10'].answer[lang], /rough|grob|تقریبی/i)
  assert.match(cards['drf-fc-10'].explanation[lang], /not a universal cutoff|kein universeller Grenzwert|نه حد قطعی همگانی/i)
}

console.log('Distal radius MSK pp.17–18 source-alignment checks passed for DE/EN/FA.')
