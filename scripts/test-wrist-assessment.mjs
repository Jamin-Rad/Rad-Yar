import assert from 'node:assert/strict'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const topics = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen)
const definitions = [
  { id: 'sehnenpathologien-hand', route: '/msk/hand/strecksehnenfaecher', questions: 1, cards: 3 },
  { id: 'de-quervain', route: '/msk/hand/de-quervain', questions: 1, cards: 3 },
]

for (const definition of definitions) {
  const topic = topics.find(item => item.id === definition.id)
  assert.ok(topic, `${definition.id}: curriculum topic exists`)
  assert.equal(topic.link, definition.route)
  assert.equal(topic.mcqLink, `/ueben/quiz?fach=msk&n=1&themen=${definition.id}`)
  assert.equal(topic.flashcardLink, `/flashcards/${definition.id}`)
  assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), topic.link)
  assert.ok(FLASHCARD_TOPICS.some(item => item.id === definition.id && item.href === topic.flashcardLink))
  assert.equal(getCardsByTopic(definition.id).length, definition.cards)
  for (const lang of ['de', 'en', 'fa']) {
    const questions = QUESTION_BANK[lang].filter(item => item.id === `${definition.id}-${lang}-01`)
    assert.equal(questions.length, definition.questions, `${definition.id}: one ${lang} question`)
    assert.ok(questions[0].tags.includes(definition.id))
    assert.equal(questions[0].options.length, 4)
  }
  for (const card of getCardsByTopic(definition.id)) {
    for (const lang of ['de', 'en', 'fa']) {
      assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} translation`)
    }
  }
}

console.log('MSK wrist assessments PASS: exact curriculum links, localized MCQ retrieval and localized flashcards.')
