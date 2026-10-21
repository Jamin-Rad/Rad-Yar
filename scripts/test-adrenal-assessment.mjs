import assert from 'node:assert/strict'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const definitions = [
  { id: 'nebennieren-inzidentalom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['abdomen-adrenal-masses'] },
  { id: 'nebennierenadenom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['abdomen-adrenal-masses', 'adrenal-adenoma-microscopic-fat'] },
  { id: 'phaeochromozytom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-pheochromocytoma-washout'] },
  { id: 'myelolipom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-myelolipoma-macroscopic-fat'] },
  { id: 'neuroblastom-nebenniere', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-neuroblastoma-origin'] },
]
const topics = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen)

assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'nebennierenraumforderungen'))
assert.equal(getCardsByTopic('nebennierenraumforderungen').length, 5)
for (const item of definitions) {
  const topic = topics.find(candidate => candidate.id === item.id)
  assert.ok(topic, `${item.id}: curriculum topic exists`)
  assert.equal(topic.link, item.route)
  assert.equal(topic.flashcardLink, '/flashcards/nebennierenraumforderungen')
  assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), item.route)
  assert.ok(topic.mcqLink?.includes(`themen=${item.id}`), `${item.id}: exact quiz topic link`)
  for (const lang of ['de', 'en', 'fa']) {
    for (const id of item.questions) {
      const question = QUESTION_BANK[lang].find(candidate => candidate.id === `${id}-${lang}-01`)
      assert.ok(question, `${id}: registered ${lang} question`)
      assert.ok(question.tags.includes(item.id), `${id}: tagged ${item.id}`)
      assert.equal(question.options.length, 4)
      assert.ok(question.options.some(option => option.id === question.correct))
    }
  }
}
for (const card of getCardsByTopic('nebennierenraumforderungen')) {
  for (const lang of ['de', 'en', 'fa']) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} copy`)
}
console.log('Adrenal assessments PASS: exact curriculum links, localized MCQ retrieval and five localized flashcards.')
