import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { DWI_ADC_BLOCK, DWI_ADC_QUESTIONS, DWI_ADC_FLASHCARDS } from '../data/technikDwiAdcLesson.js'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const pageSource = readFileSync(new URL('../app/technik/grundlagen/StandardPage.jsx', import.meta.url), 'utf8')
assert.ok(pageSource.includes('kind="dwiAdc"'))
assert.ok(pageSource.includes('dwiAdc:'))
assert.ok(pageSource.includes('عبور سیگنال T2 ممکن است'))
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'mrt-spezial')
assert.ok(section.teachingBlocks.some(block => block.id === DWI_ADC_BLOCK.id))
assert.equal(DWI_ADC_QUESTIONS.length, 3)
assert.equal(DWI_ADC_FLASHCARDS.length, 1)
for (const lang of ['de', 'en', 'fa']) {
  const question = QUESTION_BANK[lang].filter(item => item.topicId === 'mrt-dwi-adc')
  assert.equal(question.length, 1, `${lang} exact topic MCQ`)
  assert.ok(question[0].tags.includes('mrt-dwi-adc'), `${lang} exact-topic retrieval tag`)
  assert.equal(question[0].options.length, 4)
  assert.equal(question[0].options.find(option => option.id === question[0].correct).id, 'A')
  for (const option of question[0].options) assert.ok(option.text.length > 10)
  assert.ok(question[0].explanation.length > 60)
  for (const row of DWI_ADC_BLOCK.rows) assert.ok(row.every(cell => cell[lang]?.length > 0))
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'mrt-dwi-adc').length, 1)
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'mrt-dwi-adc' && topic.href === '/flashcards/mrt-dwi-adc'))
assert.ok(DWI_ADC_BLOCK.visual.srcLocalized)
for (const suffix of ['en', 'de', 'fa']) {
  const svg = readFileSync(new URL('../public/technik/grundlagen/mrt-dwi-adc-pattern-' + suffix + '.svg', import.meta.url), 'utf8')
  assert.ok(svg.includes('<svg'))
  assert.ok(svg.includes('T2') || suffix === 'fa')
}
console.log('DWI/ADC source block, localized MCQ, flashcard registry and conceptual diagram passed')
