import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { WRIST_EXTENSOR_COMPARTMENTS_LESSON as lesson } from '../data/wristExtensorCompartments.js'
import { DE_QUERVAIN_LESSON as deQuervain } from '../data/deQuervainLesson.js'

const root = process.cwd()
const route = await readFile(`${root}/app/msk/hand/strecksehnenfaecher/page.jsx`, 'utf8')
const ledger = await readFile(`${root}/docs/lesson-quality/msk-wrist-extensor-p40-p43.md`, 'utf8')
const image = await stat(`${root}/public/msk/hand/extensor-compartments-pdf-p41-axial-mri.png`)
const hero = await stat(`${root}/public/educational/wrist-extensor-compartments/hero.svg`)

assert.equal(lesson.id, 'sehnenpathologien-hand')
assert.equal(lesson.sections.length, 2)
assert.equal(lesson.sections[1].rows.length, 7, 'six compartments plus a header row')
assert.equal(lesson.sections[1].options.length, 3)
assert.equal(lesson.sections[1].answer, 0)
assert.equal(image.size > 100_000, true, 'source MRI crop exists at useful resolution')
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
assert.match(ledger, /MSK\.pdf p\.41 \/ printed p\.40/)
assert.match(ledger, /MSK\.pdf p\.43 \/ printed p\.42/)
assert.match(ledger, /sequence parameters are not provided|sequence\/field strength are not stated/i)

for (const lang of ['de', 'en', 'fa']) {
  assert.ok(lesson.title[lang] && lesson.heroAlt[lang] && lesson.scope[lang], `${lang}: route metadata translated`)
  for (const section of lesson.sections) {
    assert.ok(section.title[lang] && section.lead[lang] && section.source[lang], `${lang}: ${section.id} section translated`)
  }
  for (const row of lesson.sections[1].rows) for (const cell of row) assert.ok(cell[lang], `${lang}: complete six-compartment table`)
  assert.ok(lesson.sections[1].task[lang] && lesson.sections[1].feedback.every(text => text[lang]), `${lang}: self-check and feedback translated`)
  assert.ok(lesson.summary.every(rule => rule[lang]), `${lang}: take-home rules translated`)
}

console.log('Wrist extensor compartment lesson PASS: source-mapped six-row table, DE/EN/FA parity, image asset and self-check.')
