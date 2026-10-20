import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
;(globalThis as typeof globalThis & { React?: typeof React }).React = React
import ClinicalPatternDiagram from '../components/ClinicalPatternDiagram.jsx'
import { GIST_QUESTIONS, GIST_FLASHCARDS, GIST_FLASHCARD_TOPIC } from '../data/gistLearning.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestions } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'
import { abdomenThoraxAssessmentDrafts } from '../data/abdomenThoraxAssessmentDrafts.js'
import { CURRICULUM } from '../data/curriculum.js'

const root = process.cwd()
const langs = ['de', 'en', 'fa'] as const
for (const lang of langs) {
  assert.equal(GIST_QUESTIONS[lang].length, 1, `${lang}: exactly one GIST MCQ`)
  const question = GIST_QUESTIONS[lang][0]
  assert.equal(question.id, 'gist-ct-01')
  assert.deepEqual(question.tags, ['gist'])
  assert.equal(question.options.length, 4)
  assert.match(question.question, /hypervascular|hypervaskulär|پرعروق/i)
  assert.match(question.question, /unlabelled|unbeschrifteten|بدون برچسب/i)
  assert.ok(question.source.includes('10.1177/17588359231192388'))
  assert.ok(QUESTION_BANK[lang].some(item => item.id === question.id && item.source === question.source), `${lang}: registered question retains provenance`)
  assert.equal(getQuestions(['gist'], lang, 10).length, 1, `${lang}: GIST quiz selection`)
}
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === 'gist'))
assert.equal(GIST_FLASHCARDS.length, 4)
assert.ok(GIST_FLASHCARDS.every(card => card.topicId === 'gist'))
assert.equal(FLASHCARDS.filter(card => card.topicId === 'gist').length, 4)
assert.equal(FLASHCARD_TOPICS.filter(topic => topic.id === 'gist').length, 1)
assert.equal(GIST_FLASHCARD_TOPIC.href, '/flashcards/gist')
const selfCheck = abdomenThoraxAssessmentDrafts['abdomen-gist']
assert.equal(selfCheck.options.length, 3)
assert.match(selfCheck.options[selfCheck.answer].de, /Magenursprung.*Wachstumsrichtung/)
assert.doesNotMatch(selfCheck.question.de, /Phase|phasen/i)

const allTopics = (value: any): any[] => Array.isArray(value) ? value.flatMap(allTopics) : value && typeof value === 'object' ? [...(value.id ? [value] : []), ...Object.values(value).flatMap(allTopics)] : []
const curriculumTopic = allTopics(CURRICULUM).find(topic => topic.id === 'gist')
assert.ok(curriculumTopic, 'curriculum contains exact gist ID')
assert.equal(curriculumTopic.link, '/abdomen/gi/gist')
assert.equal(curriculumTopic.inProgress, true)
assert.equal(curriculumTopic.mcqLink, '/ueben/quiz?fach=abdomen&n=10&themen=gist')

const route = fs.readFileSync(path.join(root, 'app/abdomen/gi/gist/page.js'), 'utf8')
assert.match(route, /lessonId="abdomen-gist"/)
assert.match(route, /diagram="gist"/)
assert.match(route, /pdf-p68-axial-1\.png/)
assert.match(route, /pdf-p68-axial-2\.png/)
assert.match(route, /pdf-p68-coronal\.png/)
assert.match(route, /phase not specified|Phase nicht angegeben|فاز مشخص نشده/)
assert.match(route, /particularly marked arterial enhancement/)
assert.match(route, /besonders deutlichem Enhancement in der arteriellen Phase/)
assert.match(route, /جذب واضح‌تر به‌ویژه در فاز شریانی/)
assert.match(route, /outward-growing mass; not patient imaging/)
assert.match(route, /توده‌ای رو به بیرون؛ تصویر بیمار نیست/)
const diagram = fs.readFileSync(path.join(root, 'components/ClinicalPatternDiagram.jsx'), 'utf8')
assert.match(diagram, /Der Magen ist dargestellt; eine Raumforderung wächst nach außen aus der Magenwand/)
assert.match(diagram, /stomach is shown with a mass growing outward from its wall/)
assert.match(diagram, /معده و توده‌ای که به بیرون از دیواره معده رشد می‌کند/)
for (const [lang, phrase] of [['de', 'Der Magen ist dargestellt; eine Raumforderung wächst nach außen aus der Magenwand'], ['en', 'stomach is shown with a mass growing outward from its wall'], ['fa', 'معده و توده‌ای که به بیرون از دیواره معده رشد می‌کند']]) {
  const markup = renderToStaticMarkup(React.createElement(ClinicalPatternDiagram, { variant: 'gist', lang, title: 'GIST' }))
  assert.match(markup, /role="img"/)
  assert.ok(markup.includes(`aria-label="`) && markup.includes(phrase), `${lang}: localized accessible label is server-rendered`)
  assert.ok(markup.includes('<title>'), `${lang}: SVG title is server-rendered`)
}
for (const file of ['pdf-p68-axial-1.png', 'pdf-p68-axial-2.png', 'pdf-p68-coronal.png']) {
  const asset = path.join(root, 'public/educational/gist', file)
  assert.ok(fs.existsSync(asset) && fs.statSync(asset).size > 20_000, `${file}: retained image asset exists`)
}
console.log('GIST focused registry, locale, provenance, route and image assertions passed.')
