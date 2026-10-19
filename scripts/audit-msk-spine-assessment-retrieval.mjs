import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, getQuestions, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { MSK_SPINE_REGISTERED_QUESTIONS } from '../data/mskSpineRegisteredQuestions.js'
import { MSK_SPINE_REGISTERED_FLASHCARDS, MSK_SPINE_REGISTERED_FLASHCARD_TOPICS } from '../data/mskSpineRegisteredFlashcards.js'

const languages = ['de', 'en', 'fa']
const curriculumTopics = new Map()
for (const subject of CURRICULUM) for (const chapter of subject.kapitel || []) {
  for (const topic of chapter.themen || []) curriculumTopics.set(topic.id, { subjectId: subject.id, chapterId: chapter.id, ...topic })
}

const integratedTopicIds = new Set(['spinalkanalstenose', 'spondylodiszitis', 'morbus-bechterew-ws', 'knochentumor-grundlagen'])
for (const group of MCQ_TOPIC_GROUPS.filter(item => item.topics.some(topic => integratedTopicIds.has(topic.id)))) {
  assert.ok(CURRICULUM.find(subject => subject.id === group.fachId)?.kapitel.some(chapter => chapter.id === group.kapitelId), `${group.fachId}/${group.kapitelId}: missing curriculum chapter`)
  for (const topic of group.topics) assert.ok(curriculumTopics.has(topic.id), `${topic.id}: missing exact curriculum ID`)
}

for (const localizedQuestion of MSK_SPINE_REGISTERED_QUESTIONS) {
  const de = localizedQuestion.de
  assert.equal(de.tags.length, 1, `${de.id}: expected one exact route tag`)
  const curriculumTopic = curriculumTopics.get(de.tags[0])
  assert.ok(curriculumTopic?.link, `${de.id}: tag has no linked route`)
  for (const lang of languages) {
    const question = localizedQuestion[lang]
    assert.ok(question, `${de.id}: missing ${lang}`)
    assert.deepEqual(question.tags, de.tags, `${question.id}: localized tags differ`)
    assert.equal(question.options.length, 4, `${question.id}: global MCQ requires four options`)
    assert.ok(question.options.some(option => option.id === question.correct), `${question.id}: invalid answer key`)
    for (const field of ['question', 'explanation']) assert.ok(question[field], `${question.id}: missing ${field}`)
    for (const option of question.options) assert.ok(option.text, `${question.id}/${option.id}: missing option text`)
    assert.equal(QUESTION_BANK[lang].filter(item => item.id === question.id).length, 1, `${question.id}: not uniquely registered`)
  }
}
for (const topicId of integratedTopicIds) {
  const expectedIds = MSK_SPINE_REGISTERED_QUESTIONS.filter(question => question.de.tags.includes(topicId)).map(question => question.de.id)
  for (const lang of languages) {
    const retrievedIds = getQuestions([topicId], lang, 20).map(item => item.id).sort()
    assert.deepEqual(retrievedIds, expectedIds.map(id => id.replace(/-(de|en|fa)$/, `-${lang}`)).sort(), `${lang}/${topicId} retrieval mismatch`)
  }
}

for (const topic of MSK_SPINE_REGISTERED_FLASHCARD_TOPICS) {
  assert.ok(curriculumTopics.get(topic.id)?.link, `${topic.id}: flashcard topic has no exact route`)
  assert.ok(FLASHCARD_TOPICS.some(item => item.id === topic.id), `${topic.id}: topic not in global flashcard list`)
  const cards = MSK_SPINE_REGISTERED_FLASHCARDS.filter(card => card.topicId === topic.id)
  assert.ok(cards.length, `${topic.id}: no cards registered`)
  for (const card of cards) {
    assert.equal(FLASHCARDS.filter(item => item.id === card.id).length, 1, `${card.id}: not uniquely registered`)
    for (const lang of languages) for (const field of ['front', 'answer', 'explanation']) assert.ok(card[field]?.[lang], `${card.id}: missing ${lang}.${field}`)
    for (const lang of languages) assert.ok(getCardsByTopic(topic.id).some(item => item.id === card.id), `${card.id}: ${lang} topic retrieval missing`)
  }
}

assert.ok(!MSK_SPINE_REGISTERED_QUESTIONS.some(question => question.de.tags.includes('morbus-scheuermann')), 'unlinked Scheuermann ID must stay unregistered')
assert.ok(!MSK_SPINE_REGISTERED_FLASHCARDS.some(card => card.id === 'ws-scheuermann-sorensen'), 'unlinked Scheuermann card must stay unregistered')
console.log(`MSK/spine assessment retrieval passed: ${MSK_SPINE_REGISTERED_QUESTIONS.length} four-option MCQs and ${MSK_SPINE_REGISTERED_FLASHCARDS.length} cards across ${MSK_SPINE_REGISTERED_FLASHCARD_TOPICS.length} exact linked curriculum IDs; DE/EN/FA.`)
