import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestions } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { MSK_BONE_AGGRESSIVENESS_QUESTIONS, MSK_BONE_AGGRESSIVENESS_FLASHCARDS } from '../data/mskBoneAggressivenessAssessments.js'

const languages = ['de', 'en', 'fa']
const topicId = 'riesenzelltumor'
const lessonRoute = '/msk/tumoren/knochenzeichen#lodwick'
const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === topicId)
assert.equal(topic?.link, lessonRoute, 'GCT cross-link stays on the Lodwick anchor')
assert.equal(topic?.inProgress, true, 'bounded GCT coverage remains partial')
assert.ok(topic?.mcqLink?.includes('themen=riesenzelltumor'), 'curriculum links the exact-topic MCQ')
assert.ok(topic?.flashcardLink?.startsWith('/flashcards/riesenzelltumor?from='), 'curriculum links the exact-topic card')
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(item => item.id === topicId)), 'exact topic is discoverable in quiz topics')
assert.ok(CURRICULUM.find(subject => subject.id === 'msk')?.kapitel.some(chapter => chapter.id === 'msk-knochentumoren'), 'quiz topic group uses the real curriculum chapter')

for (const lang of languages) {
  const [question] = MSK_BONE_AGGRESSIVENESS_QUESTIONS[lang]
  assert.equal(question.tags.length, 1)
  assert.deepEqual(question.tags, [topicId])
  assert.equal(question.options.length, 4)
  assert.equal(QUESTION_BANK[lang].filter(item => item.id === question.id).length, 1)
  assert.deepEqual(getQuestions([topicId], lang, 5).map(item => item.id), [question.id])
}

const [card] = MSK_BONE_AGGRESSIVENESS_FLASHCARDS
assert.equal(FLASHCARDS.filter(item => item.id === card.id).length, 1)
assert.ok(FLASHCARD_TOPICS.some(item => item.id === topicId))
assert.equal(getCardsByTopic(topicId).filter(item => item.id === card.id).length, 1)
for (const lang of languages) for (const field of ['category', 'front', 'answer', 'explanation']) assert.ok(card[field]?.[lang], `${field}/${lang} missing`)

console.log('Bounded GCT assessment integration passed: exact curriculum link, MCQ/card retrieval and DE/EN/FA parity.')
