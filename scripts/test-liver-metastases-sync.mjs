import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
for (const lang of langs) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags.includes('lebermetastasen'))
  assert.equal(questions.length, 2, `${lang}: exact-topic quiz should contain two questions`)
  assert.ok(questions.every(question => question.options.length === 4 && question.options.some(option => option.id === question.correct)), `${lang}: each MCQ must have four options and a valid answer`)
}
const cards = FLASHCARDS.filter(card => card.topicId === 'lebermetastasen')
assert.equal(cards.length, 1, 'One phase-comparison flashcard is registered')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'lebermetastasen'), 'Flashcard topic must be selectable')

const [page, curriculum, menu] = await Promise.all([
  readFile(new URL('../app/abdomen/leber/metastasen/page.js', import.meta.url), 'utf8'),
  readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8'),
  readFile(new URL('../app/mcq/page.js', import.meta.url), 'utf8'),
])
assert.ok(page.includes('ct-case-p24.jpg') && page.includes('PDF-Seite 24') && page.includes('portalvenöse Phase'), 'Source CT and explicit phase credit must be present')
assert.ok(page.includes('width={704} height={279}'), 'Responsive image dimensions should match the cropped source asset')
assert.ok(page.includes('heroVisual={<PhaseDiagram c={c}/>}') && !page.includes('<PhaseDiagram c={c}/><p'), 'Topic-specific phase diagram should appear once in the hero')
assert.ok(page.includes('flashcardsHref="/flashcards/lebermetastasen"'), 'Lesson should link directly to its flashcards')
assert.ok(curriculum.includes("n=2&themen=lebermetastasen") && curriculum.includes("flashcardLink: '/flashcards/lebermetastasen'"), 'Curriculum links must match registered quiz and flashcard content')
assert.ok(menu.includes("key: 'lebermetastasen'") && menu.includes('2 Questions'), 'MCQ topic should be discoverable in the topic menu')
await stat(new URL('../public/educational/liver-metastases/ct-case-p24.jpg', import.meta.url))

console.log('Liver metastases sync passed: 2 DE/EN/FA MCQs, flashcard, topic links, PDF CT and source-phase labels.')
