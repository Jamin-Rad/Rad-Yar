import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { FLASHCARD_TOPICS, FLASHCARDS, getCardsByTopic } from '../data/flashcards.js'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK } from '../data/questions.js'

const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === 'osteochondrosis-intervertebralis')
assert.ok(topic, 'exact Modic curriculum item exists')
assert.equal(topic.link, '/wirbelsaeule/degenerative#modic')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=wirbelsaeule&n=1&themen=osteochondrosis-intervertebralis')
assert.equal(topic.flashcardLink, '/flashcards/osteochondrosis-intervertebralis')
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), topic.link)

assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'wirbelsaeule' && group.topics?.some(item => item.id === topic.id)))
assert.ok(FLASHCARD_TOPICS.some(item => item.id === topic.id && item.href === topic.flashcardLink))

for (const lang of ['de', 'en', 'fa']) {
  const questionId = `osteochondrosis-intervertebralis-${lang}-modic-ii-signal`
  const questions = QUESTION_BANK[lang].filter(item => item.id === questionId)
  assert.equal(questions.length, 1, `${lang}: exactly one focused Modic question`)
  assert.deepEqual(questions[0].tags, [topic.id])
  assert.equal(questions[0].options.length, 4)
  assert.equal(questions[0].correct, 'B')
  assert.ok(questions[0].explanation)
}

const cards = getCardsByTopic(topic.id)
assert.equal(cards.length, 1)
for (const card of cards) {
  for (const lang of ['de', 'en', 'fa']) {
    assert.ok(card.front?.[lang] && card.answer?.[lang] && card.explanation?.[lang], `${card.id}: complete ${lang} card`)
  }
}

const route = readFileSync(new URL('../app/wirbelsaeule/degenerative/Lesson.jsx', import.meta.url), 'utf8')
assert.ok(route.includes('themen=osteochondrosis-intervertebralis'))
assert.ok(route.includes('/flashcards/osteochondrosis-intervertebralis?from='))
assert.ok(route.includes('Modic-Veränderungen üben') && route.includes('Practise Modic changes') && route.includes('تمرین تغییرات مودیک'))

console.log('Modic assessment integration PASS: exact curriculum link, localized MCQ/card, registered topic group, and lesson actions.')
