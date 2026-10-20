import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { UNTERARM_LESSON, UNTERARM_QUESTIONS, UNTERARM_FLASHCARDS } from '../data/unterarmschaftfrakturen.js'

const flattenTopics = (sections) => sections.flatMap((section) => [
  ...(section.themen ?? section.topics ?? []),
  ...flattenTopics(section.kapitel ?? section.chapters ?? []),
])
const items = flattenTopics(CURRICULUM)
const byId = new Map(items.map((item) => [item.id, item]))
for (const id of ['monteggia-fraktur', 'galeazzi-fraktur']) {
  const item = byId.get(id)
  assert.ok(item, `curriculum item ${id} exists`)
  assert.equal(item.link, '/msk/trauma/unterarmschaftfrakturen', `${id} links to the existing shared lesson`)
  assert.equal(item.ready, true, `${id} is available`)
  assert.equal(item.inProgress, true, `${id} remains marked in progress`)
}

assert.ok(UNTERARM_LESSON.monteggia, 'lesson has a dedicated Monteggia chapter')
assert.ok(UNTERARM_LESSON.galeazzi, 'lesson has a dedicated Galeazzi chapter')
for (const language of ['de', 'en', 'fa']) {
  assert.ok(UNTERARM_LESSON.monteggia.title[language], `Monteggia title translated: ${language}`)
  assert.ok(UNTERARM_LESSON.galeazzi.title[language], `Galeazzi title translated: ${language}`)
  assert.ok(UNTERARM_QUESTIONS[language].some((question) => /Monteggia|مونتگیا/i.test(question.question)), `Monteggia retrieval question: ${language}`)
  assert.ok(UNTERARM_QUESTIONS[language].some((question) => /Galeazzi|گالئاتزی/i.test(question.question)), `Galeazzi retrieval question: ${language}`)
}
for (const language of ['de', 'en', 'fa']) {
  assert.ok(UNTERARM_FLASHCARDS.some((card) => /Monteggia|مونتگیا/i.test(card.front[language]) && card.answer[language]), `Monteggia flashcard translated: ${language}`)
  assert.ok(UNTERARM_FLASHCARDS.some((card) => /Galeazzi|گالئاتزی/i.test(card.front[language]) && card.answer[language]), `Galeazzi flashcard translated: ${language}`)
}

console.log('PASS: MSK p.16 Monteggia/Galeazzi curriculum links and existing lesson retrieval coverage')
