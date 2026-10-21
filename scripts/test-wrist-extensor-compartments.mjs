import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { WRIST_EXTENSOR_COMPARTMENTS_LESSON as lesson } from '../data/wristExtensorCompartments.js'
import { DE_QUERVAIN_LESSON as deQuervain } from '../data/deQuervainLesson.js'
import { WRIST_EXTENSOR_QUESTIONS, WRIST_EXTENSOR_FLASHCARDS, WRIST_EXTENSOR_FLASHCARD_TOPIC } from '../data/wristExtensorAssessments.js'

const root = process.cwd()
const route = await readFile(`${root}/app/msk/hand/strecksehnenfaecher/page.jsx`, 'utf8')
const ledger = await readFile(`${root}/docs/lesson-quality/msk-wrist-extensor-p40-p43.md`, 'utf8')
const image = await stat(`${root}/public/msk/hand/extensor-compartments-pdf-p41-axial-mri.png`)
const carpalImage = await stat(`${root}/public/msk/hand/carpal-joint-lines-pdf-p40.png`)
const hero = await stat(`${root}/public/educational/wrist-extensor-compartments/hero.svg`)

assert.equal(lesson.id, 'sehnenpathologien-hand')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.sections[0].image, '/msk/hand/carpal-joint-lines-pdf-p40.png')
assert.equal(lesson.sections[0].options.length, 3)
assert.equal(lesson.sections[0].answer, 0)
assert.equal(lesson.sections[2].rows.length, 7, 'six compartments plus a header row')
assert.equal(lesson.sections[2].options.length, 3)
assert.equal(lesson.sections[2].answer, 0)
assert.equal(WRIST_EXTENSOR_QUESTIONS.de.length, 2)
assert.equal(WRIST_EXTENSOR_QUESTIONS.en.length, 2)
assert.equal(WRIST_EXTENSOR_QUESTIONS.fa.length, 2)
assert.ok(WRIST_EXTENSOR_QUESTIONS.de[1].options.some(option => option.text.includes('Mediokarpalgelenk')))
assert.ok(WRIST_EXTENSOR_QUESTIONS.en[1].options.some(option => option.text.includes('midcarpal joint')))
assert.ok(WRIST_EXTENSOR_QUESTIONS.fa[1].options.some(option => option.text.includes('میدکارپی')))
assert.ok(WRIST_EXTENSOR_FLASHCARDS.some(card => card.id === 'wrist-carpal-midcarpal'))
assert.equal(WRIST_EXTENSOR_FLASHCARD_TOPIC.title.en, lesson.title.en)
assert.equal(image.size > 100_000, true, 'source MRI crop exists at useful resolution')
assert.equal(carpalImage.size > 100_000, true, 'labelled source anatomy crop exists at useful resolution')
assert.equal(lesson.hero, '/educational/wrist-extensor-compartments/hero.svg')
assert.equal(hero.size > 1_000, true, 'purpose-built schematic hero exists')
assert.match(deQuervain.notice.en, /pages 40–43 \(printed pages 39–42\)/)
assert.match(deQuervain.notice.de, /PDF-Seiten 40–43 \(Druckseiten 39–42\)/)
assert.match(deQuervain.notice.fa, /۴۰ تا ۴۳/)
assert.ok(deQuervain.chapters.some(section => section.caseImage === '/msk/hand/de-quervain-pdf-p43-pd-fs-pair.png'))
assert.match(route, /StandardLessonShell/)
assert.match(route, /<table>/)
assert.match(route, /LessonSection/)
assert.match(route, /\/msk\/hand\/de-quervain/)
assert.match(ledger, /p\.40 \/ printed p\.39/)
assert.match(ledger, /MSK\.pdf p\.41 \/ printed p\.40/)
assert.match(ledger, /MSK\.pdf p\.43 \/ printed p\.42/)
assert.match(ledger, /sequence parameters are not provided|sequence\/field strength are not stated/i)

for (const lang of ['de', 'en', 'fa']) {
  assert.ok(lesson.title[lang] && lesson.heroAlt[lang] && lesson.scope[lang], `${lang}: route metadata translated`)
  for (const section of lesson.sections) {
    assert.ok(section.title[lang] && section.lead[lang] && section.source[lang], `${lang}: ${section.id} section translated`)
    if (section.image) assert.ok(section.imageAlt[lang] && section.imageCaption[lang], `${lang}: ${section.id} image/caption translated`)
    if (section.imageKey) assert.ok(section.imageKeyTitle[lang] && section.imageKey.every(item => item.label[lang]), `${lang}: ${section.id} source label key translated`)
    if (section.task) assert.ok(section.task[lang] && section.feedback.every(text => text[lang]), `${lang}: ${section.id} self-check and feedback translated`)
  }
  for (const row of lesson.sections[2].rows) for (const cell of row) assert.ok(cell[lang], `${lang}: complete six-compartment table`)
  assert.ok(lesson.summary.every(rule => rule[lang]), `${lang}: take-home rules translated`)
}

console.log('Wrist anatomy lesson PASS: source p.40 carpal diagram/label key, p.41 six-compartment MRI table, connected MCQ/card coverage, and DE/EN/FA parity.')
