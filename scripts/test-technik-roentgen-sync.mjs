import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'

const topics = ['roentgenanlage-roehre', 'roentgenstrahlung-spektrum', 'roentgen-wechselwirkung-materie', 'roentgen-bildentstehung-detektor']
for (const lang of ['de', 'en', 'fa']) {
  for (const topic of topics) {
    const questions = QUESTION_BANK[lang].filter(question => question.tags.includes(topic))
    assert.equal(questions.length, 1, `${lang}: ${topic} must have exactly one linked MCQ`)
    assert.equal(questions[0].options.length, 4)
    assert.ok(questions[0].options.some(option => option.id === questions[0].correct))
  }
}
const cards = FLASHCARDS.filter(card => card.topicId === 'roentgenanlage-roehre')
assert.equal(cards.length, 4, 'Röntgen foundations deck should have four focused cards')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'roentgenanlage-roehre'))

const [lesson, curriculum, page] = await Promise.all([
  readFile(new URL('../data/technikGrundlagenLesson.js', import.meta.url), 'utf8'),
  readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8'),
  readFile(new URL('../app/technik/grundlagen/StandardPage.jsx', import.meta.url), 'utf8'),
])
for (const content of ['Kathode und Elektronenfokus', 'Anoden-Heel-Effekt', 'kV, Härte und Filterung', 'Computed Radiography (CR)', 'DR direkt']) assert.ok(lesson.includes(content), `Source-led lesson detail missing: ${content}`)
for (const asset of ['xray-tube.svg', 'heel-effect.svg', 'xray-interactions.svg', 'detector-chain.svg']) assert.ok(lesson.includes(asset), `Teaching diagram missing: ${asset}`)
assert.ok(page.includes('RetrievalCheck kind="roehre"') && page.includes('RetrievalCheck kind="wechselwirkung"') && page.includes('RetrievalCheck kind="detektor"'), 'Each updated chapter must include an inline knowledge check')
assert.ok(curriculum.includes("mcqLink: '/ueben/quiz?fach=technik&n=1&themen=roentgenanlage-roehre'") && curriculum.includes("flashcardLink: '/flashcards/roentgenanlage-roehre'"), 'Curriculum links should target the registered assessment and card deck')

console.log('Technik Röntgen sync passed: four source-linked topic IDs, DE/EN/FA checks, 4 cards and chapter visuals.')
