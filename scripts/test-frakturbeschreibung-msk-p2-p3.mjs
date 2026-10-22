import assert from 'node:assert/strict'
import fs from 'node:fs'
import { FRAKTUR_LESSON, FRAKTUR_QUESTIONS, FRAKTUR_FLASHCARDS } from '../data/frakturbeschreibung.js'

const langs = ['de', 'en', 'fa']
const localized = value => {
  for (const lang of langs) assert.equal(typeof value?.[lang], 'string', `missing ${lang} translation`)
}

for (const row of FRAKTUR_LESSON.entstehung.rows) row.forEach(localized)
for (const row of FRAKTUR_LESSON.morphologie.rows) row.forEach(localized)
localized(FRAKTUR_LESSON.entstehung.note)
localized(FRAKTUR_LESSON.morphologie.avulsionExamples)

const mechanismRows = FRAKTUR_LESSON.entstehung.rows.map(row => row[0].de)
for (const name of ['Direktes Trauma', 'Indirektes Trauma', 'Stressfraktur', 'Insuffizienzfraktur', 'Pathologische Fraktur']) {
  assert.ok(mechanismRows.includes(name), `source mechanism absent: ${name}`)
}
const morphologyRows = FRAKTUR_LESSON.morphologie.rows.map(row => row[0].de)
for (const name of ['Fissur', 'Querfraktur', 'Schrägfraktur', 'Spiralfraktur', 'Biegungskeil', 'Stückfraktur', 'Trümmerfraktur', 'Impression', 'Kompression', 'Impaktion', 'Avulsion']) {
  assert.ok(morphologyRows.includes(name), `source morphology absent: ${name}`)
}
assert.match(FRAKTUR_LESSON.entstehung.note.de, /Begriffe sind also nicht überall deckungsgleich/)
assert.match(FRAKTUR_LESSON.morphologie.rows.find(row => row[0].de === 'Impaktion')[2].de, /Stabilität nur im gesamten Verletzungskontext/)

for (const lang of langs) {
  assert.equal(FRAKTUR_QUESTIONS[lang].length, 12)
  for (const question of FRAKTUR_QUESTIONS[lang]) {
    assert.ok(question.id.startsWith(`frakturbeschreibung-${lang}-`))
    assert.ok(question.tags.includes('frakturbeschreibung'))
    assert.ok(question.options.some(option => option.id === question.correct), `${question.id}: answer key missing`)
    assert.ok(question.options.every(option => option.text.trim()), `${question.id}: empty option`)
    assert.ok(question.explanation.trim(), `${question.id}: missing explanation`)
  }
}
assert.equal(FRAKTUR_FLASHCARDS.length, 15)
for (const card of FRAKTUR_FLASHCARDS) {
  localized(card.front)
  localized(card.answer)
  localized(card.explanation)
}

const route = fs.readFileSync('app/msk/trauma/frakturbeschreibung/page.js', 'utf8')
assert.match(route, /openSection==='systematik'/, 'the first learning chapter opens on initial render')
assert.match(route, /hidden=\{!open\}/, 'closed chapters remain hidden in the document')
assert.match(route, /openSection===id\?'':id/, 'chapter state allows at most one open section')
assert.match(route, /setOpenSection\(id\);updateSectionHash\(id\)/, 'table-of-contents selection opens the chapter and updates the hash')
assert.match(route, /window\.history\.pushState/)
assert.match(route, /syncFromLocation\(\);window\.addEventListener\('popstate',syncFromLocation\);window\.addEventListener\('hashchange',syncFromLocation\)/, 'direct hashes and browser history restore the open chapter')
assert.match(route, /<details[\s\S]*sourceMorphologyImage/, 'the p.4 source-image appendix is collapsed by default')

console.log('MSK.pdf pp.2–3 source coverage and linked DE/EN/FA assessments passed.')
