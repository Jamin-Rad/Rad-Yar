import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { FEMORAL_SHAFT_ID, FEMORAL_SHAFT_PATH, FEMORAL_SHAFT_LESSON } from '../data/femoralShaftLesson.js'
import { FEMORAL_SHAFT_QUESTIONS, FEMORAL_SHAFT_FLASHCARDS, FEMORAL_SHAFT_FLASHCARD_TOPIC } from '../data/femoralShaftAssessments.js'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const arabicScript = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u
let units = 0

function visit(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    units++
    for (const lang of langs) {
      assert.ok(value[lang].trim(), `Missing ${lang} at ${path}`)
      if (lang !== 'fa') assert.doesNotMatch(value[lang], arabicScript, `Arabic-script leakage in ${lang} at ${path}`)
    }
    return
  }
  Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`))
}

visit(FEMORAL_SHAFT_LESSON)
visit(FEMORAL_SHAFT_QUESTIONS)
visit(FEMORAL_SHAFT_FLASHCARDS)
visit(FEMORAL_SHAFT_FLASHCARD_TOPIC)

function findNode(value, id) {
  if (Array.isArray(value)) {
    for (const item of value) { const match = findNode(item, id); if (match) return match }
  } else if (value && typeof value === 'object') {
    if (value.id === id) return value
    for (const child of Object.values(value)) { const match = findNode(child, id); if (match) return match }
  }
  return null
}

const curriculumEntry = findNode(CURRICULUM, FEMORAL_SHAFT_ID)
assert.ok(curriculumEntry, 'Exact curriculum entry must exist')
assert.equal(curriculumEntry.link, FEMORAL_SHAFT_PATH)
assert.equal(curriculumEntry.mcqLink, '/ueben/quiz?fach=msk&n=2&themen=femurschaftfraktur')
assert.equal(curriculumEntry.flashcardLink, '/flashcards/femurschaftfraktur')
assert.equal(curriculumEntry.inProgress, true)
assert.ok(FEMORAL_SHAFT_LESSON.sections.some(section => section.id === 'simple-patterns'))
assert.match(FEMORAL_SHAFT_LESSON.sections[1].imageCaption.de, /nur 32-A1\/A2\/A3/)
assert.match(FEMORAL_SHAFT_LESSON.sections[1].imageCaption.en, /only 32-A1\/A2\/A3/)
assert.match(FEMORAL_SHAFT_LESSON.sections[1].imageCaption.fa, /32-A1\/A2\/A3/)
assert.equal(FEMORAL_SHAFT_QUESTIONS.de.length, 2)
assert.equal(FEMORAL_SHAFT_FLASHCARDS.length, 3)
for (const lang of langs) {
  const quiz = FEMORAL_SHAFT_QUESTIONS[lang]
  assert.equal(quiz.length, 2)
  assert.ok(quiz.every(item => item.tags.includes(FEMORAL_SHAFT_ID) && item.options.length === 4 && item.options.filter(option => option.id === item.correct).length === 1))
  assert.ok(QUESTION_BANK[lang].some(item => item.id === quiz[0].id), `${lang} MCQs registered`)
}
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics?.some(topic => topic.id === FEMORAL_SHAFT_ID)))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === FEMORAL_SHAFT_ID))
assert.ok(FLASHCARDS.filter(card => card.topicId === FEMORAL_SHAFT_ID).length === 3)

const route = await readFile('app/msk/trauma/femurschaftfraktur/page.jsx', 'utf8')
const css = await readFile('app/msk/trauma/femurschaftfraktur/page.module.css', 'utf8')
const svg = await readFile('public/msk/femoral-shaft/ao32-schematic.svg', 'utf8')
const provenance = JSON.parse(await readFile('public/msk/femoral-shaft/provenance.json', 'utf8'))
assert.match(route, /StandardLessonShell/)
assert.match(route, /<LessonSection/)
assert.match(route, /name="femoral-shaft-pattern"/)
assert.match(css, /:focus-visible/)
assert.match(svg, /Not diagnostic imaging/)
assert.equal(provenance.physicalPdfPage, 31)
assert.equal(provenance.printedPage, 30)
assert.deepEqual(provenance.cropPixels, { left: 436, top: 916, width: 1112, height: 610 })
assert.ok(provenance.rights.includes('User explicitly authorized'))

console.log(`Femoral shaft scoped checks passed: ${units} translated units, exact route and curriculum wiring, six assessment items registered, source-page figure boundary and provenance verified. Browser display and scientific approval remain unverified.`)
