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
const compiled = transformSync(fs.readFileSync('app/thorax/bronchialkarzinom-bildgebung/page.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
let lang = 'de'
new Function('require', 'module', 'exports', compiled)(name => {
  if (name === 'next/link') return { __esModule: true, default: Link }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (name === '@/components/lesson-template/StandardLessonShell') return sharedShell
  if (name === '@/data/lungCarcinomaImagingLesson') return require('../data/lungCarcinomaImagingLesson.js')
  if (name === './page.module.css') return { __esModule: true, default: styles }
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const { LUNG_CARCINOMA_IMAGING_LESSON: lesson } = require('../data/lungCarcinomaImagingLesson.js')
const { QUESTION_BANK, MCQ_TOPIC_GROUPS } = require('../data/questions.js')
const { FLASHCARD_TOPICS, getCardsByTopic } = require('../data/flashcards.js')
const { CURRICULUM } = require('../data/curriculum.js')

const expected = {
  de: ['Thorax.pdf, PDF-S. 38', 'kann NSCLC und SCLC nicht', 'Knotenstationen', 'Formulierungsbeispiel', 'Lektionsinhalt', 'Abschnitt öffnen', 'Abschnitt als gelesen markieren'],
  en: ['Thorax.pdf, PDF p. 38', 'cannot reliably distinguish NSCLC from SCLC', 'nodal stations', 'Example wording', 'Lesson contents', 'Open section', 'Mark section as read'],
  fa: ['صفحهٔ PDF ۳۸', 'تمایز بافت‌شناختی NSCLC از SCLC', 'ایستگاه‌های غدد', 'نمونهٔ عبارت‌بندی', 'محتوای درس', 'بازکردن بخش', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'],
}
for (lang of ['de', 'en', 'fa']) {
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang}: missing ${phrase}`)
  assert.ok(html.includes('lung-carcinoma-report-map.svg') && html.includes(lesson.heroAlt[lang]), `${lang}: original schematic and localized alt`)
  assert.ok(html.includes('/ueben/quiz?fach=thorax&amp;n=1&amp;themen=nsclc,sclc'), `${lang}: exact MCQ scope`)
  assert.ok(html.includes('/flashcards/lungenkarzinom-bildgebung'), `${lang}: exact cards route`)
  assert.doesNotMatch(html, /Befund &amp; Selbsttest/, `${lang}: no invented boilerplate chapter`)
  assert.ok(html.includes(`aria-label="${expected[lang][5]}:`), `${lang}: translated section navigation name`)
}
const routeSource = fs.readFileSync('app/thorax/bronchialkarzinom-bildgebung/page.jsx', 'utf8')
for (const key of ['contents', 'close', 'complete', 'completed']) assert.ok(routeSource.includes(`${key}: L(`), `shared shell label ${key}`)
const topics = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).filter(entry => ['nsclc', 'sclc'].includes(entry.id))
assert.equal(topics.length, 2)
for (const topic of topics) {
  assert.equal(topic.link, '/thorax/bronchialkarzinom-bildgebung')
  assert.equal(topic.flashcardLink, '/flashcards/lungenkarzinom-bildgebung')
  assert.equal(topic.inProgress, true)
}
const carcinomaGroups = MCQ_TOPIC_GROUPS.filter(group => group.topics?.some(topic => ['nsclc', 'sclc'].includes(topic.id)))
assert.equal(carcinomaGroups.length, 1, 'NSCLC/SCLC quiz topics are registered exactly once')
for (const id of ['nsclc', 'sclc']) assert.equal(carcinomaGroups[0].topics.filter(topic => topic.id === id).length, 1, `${id}: exactly one quiz topic entry`)
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.some(tag => ['nsclc', 'sclc'].includes(tag)))
  assert.equal(questions.length, 1, `${locale}: shared imaging-boundary MCQ registered`)
  assert.equal(questions[0].correct, 'A')
  assert.deepEqual(Object.keys(questions[0].wrongExplanations).sort(), ['B', 'C', 'D'])
}
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'lungenkarzinom-bildgebung' && topic.href === '/flashcards/lungenkarzinom-bildgebung'))
assert.equal(getCardsByTopic('lungenkarzinom-bildgebung').length, 2)
const provenance = JSON.parse(fs.readFileSync('public/educational/lung-carcinoma-report-map.provenance.json', 'utf8'))
assert.match(provenance.clinicalUse, /Non-diagnostic conceptual graphic/)
assert.deepEqual(provenance.alt, lesson.heroAlt)
assert.ok(fs.existsSync('public/educational/lung-carcinoma-report-map.svg'))
assert.match(lesson.notice.en, /no diagnostic CT cases and no NSCLC\/SCLC distinction/)
assert.match(lesson.chapters.find(chapter => chapter.id === 'report').lead.en, /contribute to clinical cTNM assessment/)
console.log('Lung carcinoma SSR/registry PASS: shared shell, DE/EN/FA + RTL, topic-only PDF boundary, original non-diagnostic SVG provenance, exact curriculum/quiz/cards registrations.')
