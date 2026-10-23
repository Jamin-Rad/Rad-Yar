import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const compile = (path, overrides) => {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(overrides, name) ? overrides[name] : require(name), mod, mod.exports)
  return mod.exports
}
const sharedShell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: Link },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('header', null, React.createElement('h1', null, title), React.createElement('img', { src: imageSrc, alt: imageAlt })) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
const compiled = transformSync(fs.readFileSync('app/thorax/copd-bildgebung/page.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
let lang = 'de'
new Function('require', 'module', 'exports', compiled)(name => {
  if (name === 'next/link') return { __esModule: true, default: Link }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (name === '@/components/lesson-template/StandardLessonShell') return sharedShell
  if (name === '@/data/copdImagingLesson') return require('../data/copdImagingLesson.js')
  if (name === './page.module.css') return { __esModule: true, default: styles }
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const { COPD_IMAGING_LESSON: lesson } = require('../data/copdImagingLesson.js')
const { QUESTION_BANK, MCQ_TOPIC_GROUPS } = require('../data/questions.js')
const { FLASHCARD_TOPICS, getCardsByTopic } = require('../data/flashcards.js')
const { CURRICULUM } = require('../data/curriculum.js')

const expected = {
  de: ['Thorax.pdf, PDF-S. 29', 'von links nach rechts', 'zentrilobulär', 'panlobulär', 'paraseptal', 'Spirometrie', 'Abschnitt öffnen', 'Abschnitt als gelesen markieren'],
  en: ['Thorax.pdf, PDF p. 29', 'from left to right', 'Centrilobular', 'Panlobular', 'Paraseptal', 'spirometry', 'Open section', 'Mark section as read'],
  fa: ['صفحهٔ PDF ۲۹', 'از چپ به راست', 'سنترلوبولار', 'پان‌لوبولار', 'پاراسپتال', 'اسپیرومتری', 'بازکردن بخش', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'],
}
const sourceScope = { de: 'nennt „COPD“ nur als Thema', en: 'lists “COPD” only as a topic', fa: 'فقط «COPD» را به‌عنوان موضوع' }
for (lang of ['de', 'en', 'fa']) {
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang}: missing ${phrase}`)
  assert.ok(html.includes('copd-patterns.svg') && html.includes(lesson.heroAlt[lang]), `${lang}: localized schematic alt`)
  assert.ok(html.includes('/ueben/quiz?fach=thorax&amp;n=1&amp;themen=copd'), `${lang}: exact quiz topic`)
  assert.ok(html.includes('/flashcards/copd'), `${lang}: exact flashcard path`)
  assert.ok(html.includes('/thorax/hrct/dichteminderung'), `${lang}: related low-attenuation lesson`)
  assert.doesNotMatch(html, /Befund &amp; Selbsttest/, `${lang}: no invented boilerplate chapter`)
  assert.ok(html.includes(sourceScope[lang]), `${lang}: PDF page is explicitly topic-only`)
  assert.ok(html.includes(`aria-label="${expected[lang][6]}:`), `${lang}: translated section navigation name`)
}
const routeSource = fs.readFileSync('app/thorax/copd-bildgebung/page.jsx', 'utf8')
for (const key of ['contents', 'close', 'complete', 'completed']) assert.ok(routeSource.includes(`${key}: L(`), `shared shell label ${key}`)
const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(entry => entry.id === 'copd')
assert.equal(topic.link, '/thorax/copd-bildgebung')
assert.equal(topic.inProgress, true)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(entry => entry.id === 'copd')))
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.includes('copd'))
  assert.equal(questions.length, 1, `${locale}: exactly one localized MCQ`)
  assert.equal(questions[0].correct, 'A')
  assert.deepEqual(Object.keys(questions[0].wrongExplanations).sort(), ['B', 'C', 'D'])
}
assert.ok(FLASHCARD_TOPICS.some(entry => entry.id === 'copd' && entry.href === '/flashcards/copd'))
assert.equal(getCardsByTopic('copd').length, 3)
const provenance = JSON.parse(fs.readFileSync('public/educational/copd-patterns.provenance.json', 'utf8'))
assert.match(provenance.clinicalUse, /Non-diagnostic conceptual graphic/)
assert.deepEqual(provenance.alt, lesson.heroAlt)
assert.ok(fs.existsSync('public/educational/copd-patterns.svg'))
console.log('COPD SSR/registry PASS: actual shared shell, DE/EN/FA and RTL, topic-only source boundary, localized SVG alt/provenance, exact quiz/cards/curriculum and assessment registrations.')
