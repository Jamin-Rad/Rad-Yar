import assert from 'node:assert/strict'
import { CONTRAST_GROUPS, CONTRAST_TOPICS, CONTRAST_QUESTIONS, CONTRAST_FLASHCARD_TOPICS, CONTRAST_FLASHCARDS } from '../data/contrastMedia.js'
import { localizedText } from './contrast-source-helpers.mjs'
import { CONTRAST_LESSONS, CONTRAST_SOURCES } from '../data/contrastLessons.js'

const group = CONTRAST_GROUPS.find(item => item.id === 'mrt')
const topic = CONTRAST_TOPICS.find(item => item.id === 'km-buscopan')
assert.ok(group && topic, 'MRI group and dedicated Buscopan topic exist')
assert.ok(group.topicIds.includes('km-buscopan'), 'MRI group quiz/deck includes Buscopan topic')
assert.deepEqual(topic.title, { de: 'Buscopan®', en: 'Buscopan®', fa: 'Buscopan®' })
for (const lang of ['de', 'en', 'fa']) {
  const questions = CONTRAST_QUESTIONS[lang].filter(question => question.tags.includes('km-buscopan'))
  assert.equal(questions.length, 2, `${lang}: two Buscopan questions are registered`)
  assert.ok(questions.every(question => question.question && question.explanation && question.options.length === 4), `${lang}: translated MCQ content is complete`)
  const cards = CONTRAST_FLASHCARDS.filter(card => card.topicId === 'km-buscopan')
  assert.equal(cards.length, 2, `${lang}: Buscopan flashcard records are generated`)
  assert.ok(cards.every(card => card.front[lang] && card.answer[lang] && card.explanation[lang]), `${lang}: flashcards contain localized content`)
}
assert.ok(CONTRAST_FLASHCARD_TOPICS.some(item => item.id === 'km-buscopan' && item.href === '/flashcards/km-buscopan'), 'dedicated Buscopan flashcard route is generated')
const bus = CONTRAST_LESSONS.mrt.sections.find(section => section.id === 'buscopan')
assert.ok(bus, 'the existing MRI anchor remains the teaching route')
for(const lang of ['de','en','fa']) {
 const text=localizedText(bus,lang)
 assert.match(text, /Glucagon|گلوکاگون/)
 assert.ok(text.length>500)
}
const text=localizedText(bus,'de')
assert.match(text,/Engwinkelglaukom/)
assert.match(text,/mit Harnverhalt/)
assert.match(text,/bis das Sehen wieder normal ist/)
assert.ok(CONTRAST_SOURCES.some(source=>source.href.includes('medicines.org.uk')))
assert.match(localizedText(CONTRAST_LESSONS.mrt.sections.find(s=>s.id==='takehome'),'de'), /Buscopan/)
console.log('Buscopan source coverage, precise contraindications and unchanged localized bank/card parity passed.')
