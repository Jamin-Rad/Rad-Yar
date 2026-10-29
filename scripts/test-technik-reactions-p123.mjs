import assert from 'node:assert/strict'
import { localizedText } from './contrast-source-helpers.mjs'
import { CONTRAST_LESSONS, CONTRAST_SOURCES } from '../data/contrastLessons.js'
import { CONTRAST_FLASHCARDS, CONTRAST_QUESTIONS } from '../data/contrastMedia.js'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'

const locales = ['de', 'en', 'fa']
const lesson = CONTRAST_LESSONS.roentgen
const topicId = 'km-jod-reaktionen'

for (const locale of locales) {
  const section = lesson.sections.find(item => item.id === 'reaktionen')
  const recommendationTable = section.blocks.find(block => block.type === 'table' && block.rows?.length === 3)
  assert.ok(recommendationTable, `${locale}: severity-specific recommendation table exists`)
  assert.equal(recommendationTable.rows.length, 3, `${locale}: mild, moderate, severe rows are present`)
  for (const cell of [...recommendationTable.headers, ...recommendationTable.rows.flat()]) {
    assert.ok(cell[locale]?.length > 0, `${locale}: table cell is translated`)
  }
  const text=localizedText(section,locale)
  assert.match(text, /IgE/)
  assert.match(text, /2025/)
  assert.match(text, /31|۳۱/)
  assert.match(text, /ABCDE/)
  assert.ok(CONTRAST_SOURCES.some(source=>source.href==='https://doi.org/10.1148/radiol.240100'))

}

const questionByLocale = Object.fromEntries(locales.map(locale => {
  const question = CONTRAST_QUESTIONS[locale].find(item => item.tags.includes(topicId) && item.id === `km-jod-reaktionen-${locale}-4`)
  assert.ok(question, `${locale}: severe prior-reaction assessment exists`)
  assert.equal(question.options.length, 4, `${locale}: question has four options`)
  assert.equal(question.options.filter(option => option.id === question.correct).length, 1, `${locale}: exactly one keyed option exists`)
  assert.ok(question.explanation.length > 40, `${locale}: localized explanation is substantive`)
  return [locale, question]
}))

const [deQuestion, enQuestion, faQuestion] = locales.map(locale => questionByLocale[locale])
assert.equal(deQuestion.correct, enQuestion.correct)
assert.equal(deQuestion.correct, faQuestion.correct)

for (const locale of locales) {
  const question = questionByLocale[locale]
  const card = CONTRAST_FLASHCARDS.find(item => item.topicId === topicId && item.front[locale] === question.question)
  assert.ok(card, `${locale}: aligned flashcard exists`)
  assert.equal(card.answer[locale], question.options.find(option => option.id === question.correct).text, `${locale}: flashcard answer matches MCQ`)
  assert.equal(card.explanation[locale], question.explanation, `${locale}: flashcard feedback matches MCQ`)
  assert.ok(QUESTION_BANK[locale].some(item => item.id === question.id), `${locale}: question is registered in the exercise bank`)
}
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === topicId), 'reaction flashcard topic is registered')
assert.ok(FLASHCARDS.some(card => card.topicId === topicId && locales.every(locale => card.front[locale] === questionByLocale[locale].question)), 'reaction card is registered in the flashcard deck')

console.log('Röntgen reaction p.123 checks passed: severity table, source links, and DE/EN/FA severe-reaction MCQ/card parity.')
