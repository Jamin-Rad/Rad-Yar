import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import sharp from 'sharp'
import { PATELLA_STRECKAPPARAT_LESSON as lesson } from '../data/patellaStreckapparatLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'

const route = 'app/msk/knie/patella-streckapparat/page.jsx'
assert.equal(lesson.id, 'patella-streckapparat')
assert.equal(lesson.sections.length, 5)
assert.equal(lesson.morphology.rows.length, 3)
assert.equal(lesson.check.options.length, 4)
assert.equal(lesson.check.feedback.length, 4)
assert.equal(lesson.check.answer, 0)
assert.ok(fs.existsSync(`public${lesson.hero}`))
for (const image of [lesson.morphology.image, lesson.morphology.comparisonImage, lesson.dislocation.image, lesson.tendinopathy.image]) assert.ok(fs.existsSync(`public${image}`), image)
assert.ok(!fs.existsSync('public/msk/patella/bipartite-vs-fracture-source.jpg'), 'untranslated source comparison table removed')
const radiographCrop = await sharp(`public${lesson.morphology.comparisonImage}`).metadata()
assert.equal(radiographCrop.width, 190)
assert.equal(radiographCrop.height, 141)

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile(route, {
  'next/image': props => React.createElement('img', props),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/patellaStreckapparatLesson': { PATELLA_STRECKAPPARAT_LESSON: lesson },
  './page.module.css': styles,
}).default
const htmlText = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes(htmlText(lesson.title[locale])) && html.includes(htmlText(lesson.heroAlt[locale])))
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(htmlText(section.title[locale])))
  }
  for (const part of [lesson.anatomy, lesson.morphology, lesson.fracturePatterns, lesson.dislocation, lesson.tendinopathy]) {
    if (part.lead) assert.ok(html.includes(htmlText(part.lead[locale])))
    for (const paragraph of part.paragraphs || []) assert.ok(html.includes(htmlText(paragraph[locale])))
  }
  for (const row of lesson.morphology.rows) for (const cell of row) assert.ok(html.includes(htmlText(cell[locale])))
  for (const row of lesson.fracturePatterns.rows) for (const cell of row) assert.ok(html.includes(htmlText(cell[locale])), `${locale}: localized fracture-pattern table`)
  assert.ok(html.includes(htmlText(lesson.fracturePatterns.imageAlt[locale])) && html.includes(htmlText(lesson.fracturePatterns.imageCaption[locale])))
  assert.ok(html.includes(htmlText({ de: 'Frakturfragen üben', en: 'Practice fracture questions', fa: 'تمرین پرسش‌های شکستگی' }[locale])), `${locale}: exact-topic MCQ action`)
  assert.ok(html.includes(htmlText({ de: 'Fraktur-Flashcards', en: 'Fracture flashcards', fa: 'فلش‌کارت‌های شکستگی' }[locale])), `${locale}: exact-topic flashcard action`)
  assert.ok(html.includes('/ueben/quiz?fach=msk&amp;n=1&amp;themen=patellafraktur-trauma&amp;from=%2Fmsk%2Fknie%2Fpatella-streckapparat%23fracture-patterns'), `${locale}: exact-topic MCQ destination`)
  assert.ok(html.includes('/flashcards/patellafraktur-trauma?from=%2Fmsk%2Fknie%2Fpatella-streckapparat%23fracture-patterns'), `${locale}: exact-topic flashcard destination`)
  assert.ok(lesson.fracturePatterns.check.options.every(option => option[locale]) && lesson.fracturePatterns.check.feedback.every(item => item[locale]), `${locale}: fracture self-check parity`)
  assert.equal(lesson.morphology.comparisonRows.length, 4)
  for (const row of lesson.morphology.comparisonRows) for (const cell of row) assert.ok(html.includes(htmlText(cell[locale])), `${locale}: localized bipartite/fracture table cell`)
  assert.ok(html.includes(htmlText(lesson.morphology.comparisonNote[locale])))
  assert.ok(html.includes(htmlText(lesson.check.question[locale])))
  assert.ok(lesson.check.options.every(option => option[locale]), `${locale}: all options translated`)
  assert.ok(lesson.check.feedback.every(feedback => feedback[locale]), `${locale}: per-option feedback translated`)
  for (const media of [lesson.morphology, lesson.fracturePatterns, lesson.dislocation, lesson.tendinopathy]) {
    for (const key of ['imageAlt', 'imageCaption']) assert.ok(media[key][locale], `${locale}: ${key}`)
  }
  assert.ok(lesson.summary.every(rule => rule[locale]), `${locale}: summary`)
  assert.ok(lesson.references.every(ref => typeof ref.citation === 'string' || ref.citation[locale]), `${locale}: citations`)
  assert.ok(!html.includes('Morbus Osgood-Schlatter'), 'does not duplicate the existing Osgood-Schlatter lesson')
}
for (const svgPath of [lesson.hero, lesson.fracturePatterns.image, lesson.dislocation.image]) {
  const svg = fs.readFileSync(`public${svgPath}`, 'utf8')
  assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0, `${svgPath}: valid SVG`)
}
const ledger = fs.readFileSync('docs/lesson-quality/patella-streckapparat-msk-p67-p71.md', 'utf8')
for (const id of ['PAT-66-01','PAT-66-02','PAT-66-03','PAT-67-01','PAT-67-02','PAT-67-03','PAT-68-01','PAT-68-02','PAT-68-03','PAT-69-01','PAT-69-02','PAT-70-01']) assert.ok(ledger.includes(id), `ledger includes ${id}`)
for (const asset of ['wiberg-morphology-source.jpg','bipartite-fracture-radiographs.jpg','tendinopathy-mri-source.jpg']) assert.ok(ledger.includes(asset), `ledger records ${asset}`)
assert.match(ledger, /radiographs only/i)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'patella-streckapparat',[^\n]*link: '\/msk\/knie\/patella-streckapparat',[^\n]*ready: true, inProgress: true/)
assert.ok(curriculum.includes("{ id: 'patellafraktur-trauma'"))
assert.ok(curriculum.includes("link: '/msk/knie/patella-streckapparat#fracture-patterns'"))
assert.ok(curriculum.includes("themen=patellafraktur-trauma"))
assert.ok(curriculum.includes("flashcardLink: '/flashcards/patellafraktur-trauma?from=%2Fmsk%2Fknie%2Fpatella-streckapparat%23fracture-patterns'"))
for (const locale of ['de', 'en', 'fa']) {
  const matching = QUESTION_BANK[locale].filter(question => question.tags?.includes('patellafraktur-trauma'))
  assert.equal(matching.length, 1, `${locale}: exact-topic global MCQ`)
  assert.equal(matching[0].options.length, 4)
  assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics?.some(topic => topic.id === 'patellafraktur-trauma')), `${locale}: MCQ selector topic`)
}
assert.equal(getFlashcardTopic('patellafraktur-trauma')?.href, '/flashcards/patellafraktur-trauma')
assert.equal(getCardsByTopic('patellafraktur-trauma').length, 1)
assert.ok(getCardsByTopic('patellafraktur-trauma')[0].front.fa && getCardsByTopic('patellafraktur-trauma')[0].answer.fa)
console.log('Patella & extensor mechanism lesson: SSR/content parity PASS for DE/EN/FA, RTL, localized comparison and fracture-pattern tables, both self-checks, source crops, diagrams, exact-topic global MCQ/flashcard links and scope ledger. Browser and clinical approval remain separate.')
