import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { FRAKTUR_LESSON, FRAKTUR_QUESTIONS, FRAKTUR_FLASHCARDS } from '../data/frakturbeschreibung.js'
import { QUESTION_BANK, getQuestions } from '../data/questions.js'
import { FLASHCARDS, getCardsByTopic } from '../data/flashcards.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Image = ({ src, alt, ...props }) => React.createElement('img', { src, alt, ...props })
const LessonHero = ({ title, imageSrc, imageAlt, visualCaption, lang }) => React.createElement('section', { 'data-lesson-hero': true, lang }, React.createElement('h1', null, title), React.createElement('img', { src: imageSrc, alt: imageAlt }), React.createElement('figcaption', null, visualCaption))
let lang = 'de'
const source = fs.readFileSync('app/msk/trauma/frakturbeschreibung/page.js', 'utf8')
const compiled = transformSync(source, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', compiled)(name => ({
  'next/link': Link,
  'next/image': Image,
  '@/components/InProgressBanner': () => null,
  '@/components/LessonHero': LessonHero,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/data/frakturbeschreibung': { FRAKTUR_LESSON },
  '../../../abdomen/gi/divertikulitis/page.module.css': styles,
  './page.module.css': styles,
}[name] ?? require(name)), module, module.exports)

const morphology = FRAKTUR_LESSON.morphologie
const questions = FRAKTUR_QUESTIONS.de
for (const language of ['de', 'en', 'fa']) {
  const answersByIndex = [0, 0, 0, 0]
  const mechanismNote = FRAKTUR_LESSON.entstehung.note[language]
  assert.ok(mechanismNote, `${language}: fracture taxonomy note translated`)
  assert.ok(mechanismNote.length > 150, `${language}: taxonomy note has meaningful content`)
  assert.equal(FRAKTUR_QUESTIONS[language].length, 12)
  for (const question of FRAKTUR_QUESTIONS[language]) {
    assert.equal(question.options.length, 4)
    assert.ok(question.explanation)
    answersByIndex[question.options.findIndex(option => option.id === question.correct)]++
  }
  assert.deepEqual(answersByIndex, [3, 3, 3, 3], `${language}: correct-option positions are balanced across 12 items`)
  assert.ok(FRAKTUR_LESSON.takehome.title[language], `${language}: takeaway title translated`)
  assert.ok(FRAKTUR_LESSON.sections.find(section => section.id === 'takehome').label[language], `${language}: take-home navigation label translated`)
  const registeredIds = FRAKTUR_QUESTIONS[language].map(question => question.id)
  assert.ok(registeredIds.every(id => QUESTION_BANK[language].some(question => question.id === id)), `${language}: all MCQs are exported to the question bank`)
  assert.ok(getQuestions(['frakturbeschreibung'], language, 50).filter(question => registeredIds.includes(question.id)).length === 12, `${language}: all MCQs retrieve for the exact curriculum topic`)
}
assert.match(FRAKTUR_QUESTIONS.en[0].question, /six core steps/i)
assert.match(FRAKTUR_FLASHCARDS[0].front.en, /six steps.*core description.*supplements/i)
assert.ok(!('definition' in FRAKTUR_LESSON), 'no descriptive subtitle is placed below the lesson title')
for (const id of ['frakturbeschreibung-de-03', 'frakturbeschreibung-de-04', 'frakturbeschreibung-de-05', 'frakturbeschreibung-de-06', 'frakturbeschreibung-de-12']) {
  assert.ok(questions.find(question => question.id === id), `${id}: source-relevant assessment exists`)
}
for (const id of ['frakturbeschreibung-06-stress', 'frakturbeschreibung-07-pathologic', 'frakturbeschreibung-08-spiral', 'frakturbeschreibung-09-segmental', 'frakturbeschreibung-10-avulsion']) {
  const card = FRAKTUR_FLASHCARDS.find(item => item.id === id)
  assert.ok(card?.answer?.de && card.answer.en && card.answer.fa, `${id}: flashcard answers translated`)
  assert.ok(card.explanation.de && card.explanation.en && card.explanation.fa)
  assert.ok(FLASHCARDS.some(item => item.id === id), `${id}: card is in the exported deck`)
  assert.ok(getCardsByTopic('frakturbeschreibung').some(item => item.id === id), `${id}: card retrieves under its exact topic`)
}
assert.equal(morphology.sourceMorphologyRows.length, 3)
assert.match(morphology.sourceMorphologyNote.de, /Neun Quellbegriffe.*Abriss-\/Avulsionsfraktur/s)
assert.match(morphology.sourceMorphologyNote.en, /Nine source labels.*avulsion fractures/s)
assert.match(morphology.sourceMorphologyNote.fa, /نه برچسب منبع.*کندگی/s)
assert.match(morphology.sourceMorphologyNote.en, /bending-wedge row explains one component/)
const extras = morphology.sourceMorphologyRows
assert.equal(extras[0][0].de, 'Stauchungsfraktur')
assert.match(extras[0][1].de, /nicht automatisch eine Impaktion/)
assert.match(extras[0][1].en, /does not automatically mean impaction/)
assert.match(extras[0][1].fa, /به‌طور خودکار به معنی درهم‌رفتگی انتهای شکستگی نیست/)
assert.equal(extras[1][0].de, 'Meißelfraktur')
assert.match(extras[1][1].de, /ohne es im Text weiter zu definieren/)
assert.match(extras[2][0].de, /Schrägfraktur mit Biegungskeil/)
assert.match(extras[2][1].de, /Kombiniertes Muster/)
for (const locale of ['de', 'en', 'fa']) {
  for (const row of extras) for (const cell of row) assert.ok(cell[locale], `${locale}: localized source comparison`)
  assert.ok(morphology.sourceMorphologyAlt[locale] && morphology.sourceMorphologyCredit[locale])
}
const imagePath = `public${morphology.sourceMorphologyImage}`
assert.ok(fs.existsSync(imagePath), 'source figure crop exists')
const imageMeta = await sharp(imagePath).metadata()
assert.equal(imageMeta.width, 830)
assert.equal(imageMeta.height, 895)

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(module.exports.default))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('data-lesson-hero'), `${locale}: shared LessonHero renders`)
  assert.ok(html.includes(morphology.imageAlt[locale]) && html.includes(morphology.imageCredit[locale]), `${locale}: topic-specific hero schematic has translated alt and caption`)
  assert.ok(html.includes(FRAKTUR_LESSON.entstehung.note[locale]), `${locale}: PDF taxonomy nuance renders`)
  for (const row of FRAKTUR_LESSON.entstehung.rows) for (const cell of row) assert.ok(cell[locale], `${locale}: mechanism row translated`)
  for (const row of morphology.rows) for (const cell of row) assert.ok(cell[locale], `${locale}: fracture morphology row translated`)
  assert.ok(html.includes(morphology.sourceMorphologyImage))
  assert.ok(html.includes(morphology.sourceMorphologyCredit[locale]))
  for (const row of extras) for (const cell of row) assert.ok(html.includes(cell[locale]), `${locale}: rendered ${cell[locale]}`)
}

const ledger = fs.readFileSync('docs/lesson-quality/msk-fracture-description-pilot.md', 'utf8')
assert.match(ledger, /MSK\.pdf p\.4 \(printed p\.3\)/)
for (const label of ['Stauchungsfraktur', 'Meißelfraktur', 'Schrägfraktur mit Biegungskeil']) assert.ok(ledger.includes(label), `ledger: ${label}`)
for (const [index, label] of ['Fissur', 'Querfraktur', 'Schrägfraktur', 'Schrägfraktur mit Biegungskeil', 'Spiralfraktur', 'Stauchungsfraktur', 'Stückfraktur', 'Trümmerfraktur', 'Impressionsfraktur', 'Meißelfraktur', 'Abrissfraktur', 'Kompressionsfraktur'].entries()) {
  assert.ok(ledger.includes(label), `ledger maps existing source morphology ${index + 1}: ${label}`)
}
const provenance = JSON.parse(fs.readFileSync('public/educational/msk-fracture-morphologies-p4.provenance.json', 'utf8'))
assert.equal(provenance.source, 'Dr. Zia, MSK.pdf, PDF page 4 (printed page 3)')
assert.deepEqual(provenance.cropPixels, { left: 230, top: 55, width: 830, height: 895 })
console.log('MSK.pdf p.2–4 fracture-description actual-route SSR PASS: mechanism taxonomy nuance, translated morphology/source comparison, exact-topic assessment/card content, balanced MCQ keys, and p.4 figure reconciliation; browser and scientific review remain separate.')
