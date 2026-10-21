import assert from 'node:assert/strict'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === 'appendizitis')
assert.ok(topic, 'Appendizitis curriculum topic exists')
assert.equal(topic.link, '/abdomen/gi/appendizitis')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=abdomen&n=1&themen=appendizitis')
assert.equal(topic.flashcardLink, '/flashcards/appendizitis')
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), topic.link)

for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(question => question.id === `abdomen-appendizitis-${lang}-01`)
  assert.equal(questions.length, 1, `${lang}: exactly one registered appendicitis question`)
  assert.equal(questions[0].tags.includes('appendizitis'), true)
  assert.equal(questions[0].options.length, 4)
}

assert.ok(FLASHCARD_TOPICS.some(item => item.id === 'appendizitis' && item.href === topic.flashcardLink))
const cards = getCardsByTopic('appendizitis')
assert.equal(cards.length, 3)
for (const card of cards) {
  for (const lang of ['de', 'en', 'fa']) {
    assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} card`)
  }
}

console.log('Appendizitis assessment links PASS: curriculum, localized MCQ retrieval, and three localized flashcards.')
