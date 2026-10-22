import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK } from '../data/questions.js'

const visit = (node, predicate) => {
  if (!node || typeof node !== 'object') return []
  const found = predicate(node) ? [node] : []
  return found.concat(Object.values(node).flatMap(value => Array.isArray(value) ? value.flatMap(item => visit(item, predicate)) : visit(value, predicate)))
}

const curriculumItems = visit(CURRICULUM, item => item.id === 'mrt-cine')
assert.equal(curriculumItems.length, 1, 'one exact CINE curriculum item is registered')
const [item] = curriculumItems
assert.equal(item.link, '/technik/grundlagen#mrt-spezial')
assert.equal(item.mcqLink, '/ueben/quiz?fach=technik&n=1&themen=mrt-cine')
assert.equal(item.flashcardLink, '/flashcards/mrt-cine')

const group = MCQ_TOPIC_GROUPS.find(candidate => candidate.topics?.some(topic => topic.id === 'mrt-cine'))
assert.ok(group, 'CINE is available as a dedicated MCQ topic')
for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags?.includes('mrt-cine'))
  assert.equal(questions.length, 1, `${lang}: one CINE MCQ is registered`)
  const question = questions[0]
  assert.ok(question.question && question.explanation, `${lang}: prompt and explanation exist`)
  assert.equal(question.options.length, 4, `${lang}: four answer choices exist`)
  assert.equal(question.correct, 'A', `${lang}: one correct option is declared`)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B', 'C', 'D'], `${lang}: each distractor has feedback`)
}

const deck = FLASHCARD_TOPICS.find(topic => topic.id === 'mrt-cine')
assert.ok(deck, 'CINE has a dedicated flashcard topic')
assert.equal(deck.href, '/flashcards/mrt-cine')
const cards = FLASHCARDS.filter(card => card.topicId === 'mrt-cine')
assert.equal(cards.length, 2, 'two CINE retrieval cards are registered')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(cards.every(card => card.front[lang] && card.answer[lang] && card.explanation[lang]), `${lang}: both cards are localized`)
}

const section = TECHNIK_GRUNDLAGEN.sections.find(candidate => candidate.id === 'mrt-spezial')
assert.ok(section, 'the existing special-techniques section remains the lesson route')
const block = section.teachingBlocks.find(candidate => candidate.id === 'cine-motion')
assert.ok(block, 'the focused CINE subsection is present')
assert.ok(block.rows.length >= 2 && block.note, 'the subsection covers use and interpretation limits')
assert.ok(block.visual?.src === '/technik/cine-motion-concept.svg', 'the subsection points to its conceptual visual')
assert.ok(existsSync('public/technik/cine-motion-concept.svg'), 'the conceptual visual asset exists')
const routeSource = readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8')
assert.match(routeSource, /section\.id === 'mrt-spezial'.*<CineActions lang=\{lang\}/, 'CINE actions are reachable from the existing subsection')
assert.match(routeSource, /themen=mrt-cine&from=\$\{from\}/, 'CINE MCQ link returns to the lesson subsection')
assert.match(routeSource, /flashcards\/mrt-cine\?from=\$\{from\}/, 'CINE flashcard link returns to the lesson subsection')
assert.ok(section.references.some(reference => reference.href.includes('PMC9052489')), 'the CINE reference is linked in the lesson source panel')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(block.title[lang] && block.lead[lang] && block.note[lang], `${lang}: subsection is localized`)
  assert.ok(block.visual.alt[lang] && block.visual.caption[lang], `${lang}: visual is accessible and captioned`)
}

console.log('CINE p.117 registration and localization PASS: one curriculum item, one MCQ, two cards, source panel and conceptual schematic.')
