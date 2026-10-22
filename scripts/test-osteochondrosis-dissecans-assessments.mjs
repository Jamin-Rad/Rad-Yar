import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'
import { getQuestions, MCQ_TOPIC_GROUPS, QUESTION_BANK } from '../data/questions.js'

const topicId = 'osteochondrosis-dissecans'
const route = '/msk/osteochondrosen/osteochondrosis-dissecans'
const topic = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(kapitel => kapitel.themen || []))
  .find(item => item.id === topicId)
assert.ok(topic, 'exact curriculum topic exists')
assert.equal(topic.link, route)
assert.equal(topic.mcqLink, `/ueben/quiz?fach=msk&n=1&themen=${topicId}`)
assert.equal(topic.flashcardLink, `/flashcards/${topicId}`)

assert.equal(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).filter(item => item.id === topicId).length, 1)
for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags?.includes(topicId))
  assert.equal(questions.length, 1, `${lang} has exactly one global question`)
  assert.equal(getQuestions([topicId], lang, 1)[0]?.id, questions[0].id, `${lang} selector returns the question`)
  assert.equal(questions[0].correct, 'A')
  assert.equal(questions[0].options.length, 4)
  assert.ok(questions[0].explanation)
  assert.deepEqual(Object.keys(questions[0].wrongExplanations).sort(), ['B', 'C', 'D'])
}

assert.equal(getFlashcardTopic(topicId)?.id, topicId)
const cards = getCardsByTopic(topicId)
assert.equal(cards.length, 1, 'one localized retrieval card is registered')
for (const key of ['front', 'answer', 'explanation']) {
  for (const lang of ['de', 'en', 'fa']) assert.ok(cards[0][key]?.[lang], `${key}.${lang} is present`)
}

const page = await readFile(new URL('../app/msk/osteochondrosen/osteochondrosis-dissecans/page.jsx', import.meta.url), 'utf8')
assert.match(page, /<AssessmentActions lang=\{lang\}\/>/)
assert.match(page, /quiz\?fach=msk&n=1&themen=osteochondrosis-dissecans&from=\$\{from\}/)
assert.match(page, /flashcards\/osteochondrosis-dissecans\?from=\$\{from\}/)
assert.match(page, /osteochondrosis-dissecans\?lang=\$\{lang\}#check/)

console.log('OCD assessment integration passed: exact topic, localized MCQ/card, direct actions and return anchor.')
