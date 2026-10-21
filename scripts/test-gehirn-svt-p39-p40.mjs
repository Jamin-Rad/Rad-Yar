import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { SVT_FLASHCARDS, SVT_LESSON, SVT_QUESTIONS, SVT_SOURCES } from '../data/sinusvenenthrombose.js'

const route = await readFile(new URL('../app/gehirn/vaskulaer/sinusvenenthrombose/page.js', import.meta.url), 'utf8')
const matrix = await readFile(new URL('../docs/lesson-quality/gehirn-technik-curriculum-matrix.md', import.meta.url), 'utf8')

assert.deepEqual(SVT_LESSON.pdfSourcePages, [39, 40])
assert.equal(SVT_LESSON.mrt.headers.length, 4)
assert.ok(SVT_LESSON.mrt.rows.every(row => row.length === 4), 'stage matrix keeps T1, T2 and FLAIR separate')
assert.equal(SVT_LESSON.mrt.sequenceHeaders.length, 3)
assert.ok(SVT_LESSON.mrt.sequenceRows.every(row => row.length === 3), 'sequence findings use a separate method table')
assert.ok(SVT_LESSON.mrt.rows.some(row => row[0].de === 'Akut, 0–5 Tage'))
assert.ok(SVT_LESSON.mrt.rows.some(row => row[0].de === 'Subakut, >5 Tage'))
assert.match(SVT_LESSON.mrt.sequenceRows[1][1].en, /absent flow independently of thrombus signal/i)
assert.doesNotMatch(JSON.stringify(SVT_LESSON), /90\s?%/)
assert.match(SVT_LESSON.takehome.title.fa, /نکات کلیدی/)
assert.equal(SVT_SOURCES.length, 2)

for (const lang of ['de', 'en', 'fa']) {
  assert.equal(SVT_QUESTIONS[lang].length, 12)
  assert.ok(SVT_QUESTIONS[lang].every(question => question.options.length === 4 && question.options.some(option => option.id === question.correct)))
  assert.ok(new Set(SVT_QUESTIONS[lang].map(question => question.correct)).size === 4, `${lang} answer positions should be distributed`)
  assert.ok(SVT_QUESTIONS[lang].every(question => question.explanation?.length > 20))
  assert.ok(SVT_FLASHCARDS.length >= 12)
  assert.ok(SVT_FLASHCARDS.every(card => card.front?.[lang] && card.answer?.[lang] && card.explanation?.[lang]))
  assert.ok(SVT_LESSON.sections.every(section => section.label?.[lang]))
}

assert.match(route, /LessonHero/)
assert.match(route, /LessonTemplate\.module\.css/)
assert.match(route, /usePersistedSectionProgress/)
assert.match(route, /setOpenSection/)
assert.match(route, /popstate/)
assert.match(route, /QuickCheck/)
assert.match(route, /setChecked\(true\)/)
assert.match(route, /scope="row"/)
assert.match(route, /venous-drainage\.svg/)
assert.doesNotMatch(route, /signalverhalten\.png/)
assert.match(matrix, /39–40 \| Sinus- und Hirnvenenthrombosen[^\n]+localized T1\/T2\/FLAIR stage table/)

console.log('SVT pp.39–40 focused checks passed')
