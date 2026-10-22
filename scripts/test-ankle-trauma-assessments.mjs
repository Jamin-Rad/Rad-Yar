import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === 'osg-fraktur')
assert.ok(topic)
assert.equal(topic.link, '/msk/trauma/sprunggelenk')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=msk&n=8&themen=osg-fraktur')
assert.equal(topic.flashcardLink, '/flashcards/osg-fraktur')
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), topic.link)
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(item => item.id === 'osg-fraktur'))
assert.ok(FLASHCARD_TOPICS.some(item => item.id === 'osg-fraktur' && item.href === topic.flashcardLink))

for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(item => item.tags?.includes('osg-fraktur'))
  assert.equal(questions.length, 2, `${lang}: two exact-topic questions`)
  assert.ok(questions.every(item => item.options.length === 4 && item.options.every(option => option.text)))
  assert.ok(questions.every(item => item.question && item.explanation))
}

const cards = getCardsByTopic('osg-fraktur')
assert.equal(cards.length, 2)
for (const card of cards) for (const lang of ['de', 'en', 'fa']) {
  assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang}`)
}

const route = fs.readFileSync('app/msk/trauma/sprunggelenk/page.js', 'utf8')
assert.ok(route.includes("/ueben/quiz?fach=msk&n=8&themen=osg-fraktur"))
assert.ok(route.includes("/flashcards/osg-fraktur"))
assert.match(route, /patternAnswer === id/)

console.log('Ankle trauma assessments PASS: exact-topic DE/EN/FA quiz, flashcards, curriculum links and route actions.')
