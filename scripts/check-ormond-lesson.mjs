import fs from 'node:fs'
import assert from 'node:assert/strict'
import parser from 'next/dist/compiled/babel/parser.js'
import { ORMOND_LESSON as lesson, ORMOND_QUESTIONS as questions } from '../data/ormondLesson.js'

const languages = ['de', 'en', 'fa']
const persian = /[\u0600-\u06ff]/u
let translations = 0
function inspect(value) {
  if (!value || typeof value !== 'object') return
  if (languages.every(lang => typeof value[lang] === 'string')) {
    translations += 1
    assert.ok(languages.every(lang => value[lang].trim()), 'Empty translation')
    const sharedScientificLabel = ['CT', 'T1 / T2', 'DWI / ADC'].includes(value.fa) && value.de === value.en && value.en === value.fa
    assert.ok(!persian.test(value.de) && !persian.test(value.en) && (persian.test(value.fa) || sharedScientificLabel), 'Language-slot mismatch')
  } else Object.values(value).forEach(inspect)
}
inspect(lesson)
assert.equal(lesson.chapters.length, 4)
assert.equal(new Set(lesson.chapters.map(chapter => chapter.id)).size, 4)
assert.equal(lesson.question.options.length, 4)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.summary.length, 3)
assert.equal(lesson.cards.length, 3)
for (const lang of languages) {
  const question = questions[lang][0]
  assert.equal(question.correct, String.fromCharCode(65 + lesson.question.answer))
  assert.equal(question.question, lesson.question.question[lang])
  assert.equal(question.explanation, lesson.question.feedback[lang])
  assert.deepEqual(question.tags, ['morbus-ormond'])
  assert.equal(new Set(question.options.map(option => option.text)).size, 4)
}
const route = fs.readFileSync('app/abdomen/retroperitoneum/morbus-ormond/page.jsx', 'utf8')
const routeAst = parser.parse(route, { sourceType: 'module', plugins: ['jsx'] })
let interfaceUnits = 0
function inspectInterface(node) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'CallExpression' && node.callee.name === 'L') {
    const values = node.arguments.map(argument => argument.value)
    assert.equal(values.length, 3)
    assert.ok(values.every(value => typeof value === 'string' && value.trim()))
    assert.ok(!persian.test(values[0]) && !persian.test(values[1]) && persian.test(values[2]), 'Interface language-slot mismatch')
    interfaceUnits += 1
  }
  for (const [key, value] of Object.entries(node)) if (key !== 'loc') {
    if (Array.isArray(value)) value.forEach(inspectInterface)
    else if (value && typeof value === 'object') inspectInterface(value)
  }
}
inspectInterface(routeAst)
assert.ok(route.includes('StandardLessonShell') && route.includes('LessonSection'))
assert.ok(route.includes('themen=morbus-ormond') && route.includes('<Decision lang={lang}/>'))
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'morbus-ormond'[^\n]+link: '\/abdomen\/retroperitoneum\/morbus-ormond'[^\n]+inProgress: true/)
const bank = fs.readFileSync('data/questions.js', 'utf8')
assert.ok(bank.includes('...ORMOND_QUESTIONS[lang]') && bank.includes("kapitelId: 'abdomen-retroperitoneum'"))
for (const asset of ['public/abdomen/ormond/hero.svg', 'public/abdomen/ormond/ct-montage.png', 'docs/lesson-quality/ormond-pdf-lesson-review.md']) assert.ok(fs.statSync(asset).size > 100)
console.log(`Ormond scoped audit passed: ${translations} content and ${interfaceUnits} interface translation units, 4 chapters, 1 connected four-option question per language, 3 retrieval cards, source assets and exact curriculum mapping.`)
