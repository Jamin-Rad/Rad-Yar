import assert from 'node:assert/strict'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { CURRICULUM } from '../data/curriculum.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'

const ids = ['leber-anatomie', 'gefaesse-anatomie-abdomen']
const cardTopic = 'leber-gefaesse-anatomie'
const languages = ['de', 'en', 'fa']
const persian = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/

for (const lang of languages) {
  const questions = QUESTION_BANK[lang].filter(question => question.id.startsWith(`liver-vessels-${lang}-`))
  assert.equal(questions.length, 3, `${lang}: three focused questions are registered`)
  for (const question of questions) {
    assert.equal(question.fach, 'abdomen')
    assert.deepEqual(question.tags, ids)
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.equal(Object.keys(question.wrongExplanations).length, 3)
    assert.equal(new Set(Object.values(question.wrongExplanations)).size, 3, `${question.id}: distractor explanations are option-specific`)
    for (const text of [question.question, question.explanation, ...question.options.map(option => option.text), ...Object.values(question.wrongExplanations)]) {
      assert.ok(text)
      if (lang === 'fa') assert.match(text, persian)
      else assert.doesNotMatch(text, persian)
    }
  }
  const cards = getCardsByTopic(cardTopic)
  assert.equal(cards.length, 4, `${lang}: four cards are registered under the exact flashcard topic`)
  for (const card of cards) {
    for (const value of [card.front, card.answer, card.explanation]) {
      assert.ok(value[lang], `${card.id}: ${lang} value exists`)
      if (lang === 'fa') assert.match(value[lang], persian)
      else assert.doesNotMatch(value[lang], persian)
    }
    assert.ok(card.source)
  }
}

const quizTopics = MCQ_TOPIC_GROUPS.flatMap(group => group.topics || [])
for (const id of ids) assert.equal(quizTopics.filter(topic => topic.id === id).length, 1, `${id}: exact MCQ topic is listed once`)
assert.equal(getFlashcardTopic(cardTopic)?.href, `/flashcards/${cardTopic}`)

const curriculum = []
const visit = value => {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) return value.forEach(visit)
  if (ids.includes(value.id)) curriculum.push(value)
  Object.values(value).forEach(visit)
}
visit(CURRICULUM)
assert.equal(curriculum.length, 2, 'both source curriculum topics are present exactly once')
for (const topic of curriculum) {
  assert.match(topic.mcqLink, /fach=abdomen&n=3&themen=leber-anatomie,gefaesse-anatomie-abdomen/)
  assert.equal(topic.flashcardLink, `/flashcards/${cardTopic}`)
}

console.log('Liver-vessel lesson assessments and exact curriculum links passed in DE/EN/FA.')
