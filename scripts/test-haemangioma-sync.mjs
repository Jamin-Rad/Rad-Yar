import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { HEMANGIOMA_CHAPTERS } from '../data/haemangiomaLesson.js'
import { HEMANGIOMA_QUESTIONS } from '../data/haemangiomaTraining.js'

const lesson = await readFile(new URL('../data/haemangiomaLesson.js', import.meta.url), 'utf8')
const training = await readFile(new URL('../data/haemangiomaTraining.js', import.meta.url), 'utf8')
const lessonRoute = await readFile(new URL('../app/abdomen/leber/haemangiom/LessonContent.jsx', import.meta.url), 'utf8')
const lessonCss = await readFile(new URL('../app/abdomen/leber/haemangiom/page.module.css', import.meta.url), 'utf8')
const mcqPicker = await readFile(new URL('../app/mcq/page.js', import.meta.url), 'utf8')

for (const lang of ['de', 'en', 'fa']) {
  assert.equal(HEMANGIOMA_QUESTIONS[lang].length, 8, `${lang}: expected eight haemangioma MCQs`)
}

assert.match(lessonRoute, /fach=abdomen&n=8&themen=haemangiom/)
assert.match(mcqPicker, /href: '\/ueben\/quiz\?fach=abdomen&n=8&themen=haemangiom'/)
assert.match(mcqPicker, /count: \{ de: '8 Fragen', en: '8 Questions', fa: '۸ سؤال' \}/)
assert.match(training, /مرکزگرا، یعنی پرشدن از محیط به‌سمت مرکز/)
assert.match(lessonRoute, /case-10052-arterial-ct\.jpg/)
assert.match(lessonRoute, /case-10052-portal-venous-ct\.jpg/)
assert.match(lessonRoute, /case-10052-delayed-ct\.jpg/)
assert.match(lessonRoute, /Case courtesy of Hani M\. Al Salam · Radiopaedia\.org · case 10052/)
assert.match(lessonCss, /\.casePhaseGrid\s*\{[^}]*repeat\(3,minmax\(0,1fr\)\)/)
assert.match(lessonCss, /\.casePhaseGrid\s*\{ grid-template-columns:1fr/)

const t2Rows = HEMANGIOMA_CHAPTERS.flatMap(chapter => chapter.blocks)
  .filter(block => block.type === 'table')
  .flatMap(block => block.rows)
  .filter(row => row[0]?.de === 'T2')
assert.equal(t2Rows.length, 1, 'expected one T2 row in the lesson')
for (const lang of ['de', 'en', 'fa']) {
  const text = t2Rows[0][1][lang]
  assert.match(text, lang === 'de' ? /heller als die Galle/ : lang === 'en' ? /brighter than bile/ : /روشن‌تر از صفرا/)
}
assert.match(lesson, /Abdomen\.pdf, physical pp\. 8–10/)

console.log('Haemangioma source cue, Persian explanation, and MCQ counts are synchronized.')
