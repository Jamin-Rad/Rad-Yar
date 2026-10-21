import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CADASIL_LESSON, CADASIL_QUESTIONS, CADASIL_FLASHCARDS } from '../data/cadasil.js'

const page = fs.readFileSync('app/gehirn/vaskulaer/cadasil/page.js', 'utf8')
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
for (const lang of ['de', 'en', 'fa']) {
  const row = CADASIL_LESSON.mrt.rows.find(item => item[0][lang] === (lang === 'de' ? 'Weitere Verteilung' : lang === 'en' ? 'Additional distribution' : 'توزیع بیشتر'))
  assert.ok(row, `${lang}: additional MRI distribution row`)
  assert.ok(row.flat().every(cell => cell[lang]), `${lang}: MRI row translated`)
  assert.ok(CADASIL_QUESTIONS[lang].find(q => q.id.endsWith('-13')), `${lang}: MCQ 13 exists`)
  assert.ok(CADASIL_FLASHCARDS.some(card => card.id.endsWith('-distribution') && card.front[lang] && card.answer[lang]), `${lang}: distribution flashcard exists`)
  assert.ok(CADASIL_LESSON.differenzial.rows.some(item => item[0][lang].includes('CAA')), `${lang}: CAA differential row`)
}
assert.match(page, /<LessonHero[\s\S]*imageSrc="\/cadasil\/hero\.svg"/)
assert.match(page, /\/cadasil\/distribution\.svg/)
assert.match(page, /id === 'grundlagen'/)
assert.match(page, /n=13&themen=cadasil/)
assert.match(curriculum, /id: 'cadasil'[\s\S]*n=13&themen=cadasil/)
for (const asset of ['public/cadasil/hero.svg', 'public/cadasil/distribution.svg']) assert.ok(fs.statSync(asset).size > 500, `${asset} exists`)
console.log('Gehirn CADASIL p29 source-alignment checks PASS: DE/EN/FA MRI row and CAA differential, MCQ 13, retrieval card, lesson hero, diagram, section default and curriculum count.')
