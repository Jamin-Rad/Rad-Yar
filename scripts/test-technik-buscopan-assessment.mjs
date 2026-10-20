import assert from 'node:assert/strict'
import { CONTRAST_GROUPS, CONTRAST_TOPICS, CONTRAST_QUESTIONS, CONTRAST_FLASHCARD_TOPICS, CONTRAST_FLASHCARDS } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'

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
const takeaway = CONTRAST_LESSONS.mrt.sections.find(section => section.id === 'takehome')?.blocks.find(block => block.type === 'takehome')?.items.find(item => item.title.de.includes('Buscopan'))
assert.ok(bus, 'the existing MRI lesson section remains the teaching route')
assert.ok(takeaway, 'take-home summary repeats the Buscopan safety check')
for (const lang of ['de','en','fa']) assert.ok(takeaway.text[lang], `${lang}: take-home rule is localized`)
assert.ok(!/Glaukom, Prostatahyperplasie/.test(takeaway.text.de), 'take-home no longer overgeneralizes contraindications')
assert.match(bus.lead.de, /entspannt vorübergehend/)
assert.ok(bus.blocks.some(block => block.type === 'sourceLink' && /fachinfo\.de/.test(block.href)), 'German product-information source is linked beside claims')
const contraindications = bus.blocks.find(block => block.type === 'cards').items[0].bullets
assert.ok(contraindications.some(item => item.de.includes('Engwinkelglaukom')))
assert.ok(contraindications.some(item => item.de.includes('Harnverhaltung')))
assert.ok(bus.blocks.some(block => block.type === 'callout' && block.text.de.includes('Eine feste Dauer von 1–2 Stunden lässt sich aus der Produktinformation nicht ableiten')))
console.log('Buscopan p.130 coverage audit PASS: MRI section discoverable, dedicated topic id connected to group quiz and flashcards, localized assessments, precise product-label contraindications and linked source.')
