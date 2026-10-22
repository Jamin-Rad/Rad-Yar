import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'
import DiagramModule from '../components/ClinicalPatternDiagram.jsx'

const ClinicalPatternDiagram = DiagramModule.default || DiagramModule
globalThis.React = React

const root = new URL('../', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')
const moduleText = await read('data/tuberculosisPatternsLearning.js')
const learning = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(moduleText)}`)

assert.equal(learning.TUBERCULOSIS_FLASHCARDS.length, 1, 'one focused retrieval card')
assert.equal(learning.TUBERCULOSIS_FLASHCARDS[0].topicId, 'tuberkulose')
assert.equal(learning.TUBERCULOSIS_FLASHCARD_TOPIC.id, 'tuberkulose')
assert.equal(getFlashcardTopic('tuberkulose')?.href, '/flashcards/tuberkulose')
assert.deepEqual(getCardsByTopic('tuberkulose').map(card => card.id), ['tuberkulose-miliares-verteilungsmuster'])
for (const lang of ['de', 'en', 'fa']) {
  const card = learning.TUBERCULOSIS_FLASHCARDS[0]
  assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${lang}: localized card fields`)
  assert.ok(card.explanation[lang].includes(lang === 'fa' ? 'صفحهٔ ۳۷' : lang === 'de' ? 'PDF-S. 37' : 'PDF p. 37'), `${lang}: physical source page`)
  assert.ok(card.answer[lang].includes(lang === 'fa' ? '۱ تا ۳ میلی‌متر' : lang === 'de' ? '1–3 mm' : '1–3 mm'), `${lang}: source-supported size`)
  const diagram = renderToStaticMarkup(createElement(ClinicalPatternDiagram, { variant: 'tuberculosis', lang, title: 'Tuberculosis' }))
  const diagramLabels = {
    de: ['diffus verteilten Noduli', 'keine Patientenaufnahme', 'miliäre Noduli'],
    en: ['diffusely distributed nodules', 'not patient imaging', 'miliary nodules'],
    fa: ['ندول‌های منتشر', 'تصویر بیمار نیست', 'ندول‌های میلیاری'],
  }
  assert.ok(diagramLabels[lang].every(text => diagram.includes(text)), `${lang}: accessible name describes diffuse nodules and says it is not patient imaging`)
}

const curriculum = await read('data/curriculum.js')
const questions = await read('data/abdomenThoraxRegisteredQuestions.js')
const flashcards = await read('data/flashcards.js')
const route = await read('app/thorax/tuberkulose-muster/page.js')
const ledger = await read('docs/lesson-quality/abdomen-thorax-authoring-ledger.md')
const map = await read('docs/lesson-quality/pdf-map-abdomen-thorax.md')

assert.match(questions, /key: 'thorax-tuberculosis'.*tags: \['tuberkulose'\]/)
assert.match(curriculum, /id: 'tuberkulose'.*flashcardLink: '\/flashcards\/tuberkulose'/)
assert.match(flashcards, /TUBERCULOSIS_FLASHCARD_TOPIC/)
assert.match(flashcards, /\.\.\.TUBERCULOSIS_FLASHCARDS/)
assert.match(route, /flashcardsHref=\{`\/flashcards\/tuberkulose\?from=/)
assert.match(route, /encodeURIComponent\('\/thorax\/tuberkulose-muster#patterns'\)/)
assert.match(route, /href="\/lernen\/thorax">\{c\.returnToThorax\}/)
assert.match(route, /PDF-S\. 36–37 \(gedruckte S\. 35–36\)/)
assert.match(route, /PDF pp\. 36–37 \(printed pp\. 35–36\)/)
assert.match(route, /صفحات چاپی ۳۵–۳۶/)
assert.match(ledger, /physical pp\. 36–37 \(printed pp\. 35–36\).*one localized retrieval card/s)
assert.match(map, /physical pp\. 36–37 \(printed pp\. 35–36\).*one registered DE\/EN\/FA miliary-pattern card/s)

console.log('TB flashcard integration passed: exact topic, one DE/EN/FA retrieval card, existing question, curriculum link, return anchor, and physical/printed PDF mapping.')
