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
const compiled = transformSync(fs.readFileSync('app/gehirn/tumoren/atrt/page.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
let lang = 'de'
new Function('require', 'module', 'exports', compiled)(name => {
  if (name === 'next/link') return { __esModule: true, default: Link }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (name === '@/components/lesson-template/StandardLessonShell') return sharedShell
  if (name === '@/data/atrtLesson') return require('../data/atrtLesson.js')
  if (name === './page.module.css') return { __esModule: true, default: styles }
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const lesson = require('../data/atrtLesson.js')
const { QUESTION_BANK, MCQ_TOPIC_GROUPS } = require('../data/questions.js')
const { FLASHCARD_TOPICS, getCardsByTopic } = require('../data/flashcards.js')
const { CURRICULUM } = require('../data/curriculum.js')
const expected = {
  de: ['Gehirn.pdf · phys. S. 44', 'sagittales T1', 'axiales FLAIR', 'axiales T1 C+', 'nicht verifiziert', 'Fallserie und Literaturreview', 'Fallserie mit 11 Patienten', 'DWI', 'ADC', 'Abschnitt öffnen', 'Abschnitt als gelesen markieren'],
  en: ['Gehirn.pdf · physical p.44', 'sagittal T1', 'axial FLAIR', 'axial T1 C+', 'not verified', 'Case series and literature review', '11-patient case series', 'DWI', 'ADC', 'Open section', 'Mark section as read'],
  fa: ['صفحهٔ فیزیکی ۴۴', 'T1 ساژیتال', 'FLAIR محوری', 'T1 C+ محوری', 'تأیید نشده', 'مجموعهٔ موارد و مرور متون', 'مجموعهٔ ۱۱ بیمار', 'DWI', 'ADC', 'بازکردن بخش', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'],
}
for (lang of ['de', 'en', 'fa']) {
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang}: missing ${phrase}`)
  assert.ok(html.includes('atrt-mri-pattern.svg') && html.includes(lesson.ATRT_COPY.heroAlt[lang]), `${lang}: localized conceptual hero alt`)
  assert.ok(html.includes('/ueben/quiz?fach=gehirn&amp;n=1&amp;themen=atrt'), `${lang}: exact quiz topic`)
  assert.ok(html.includes('/flashcards/atrt'), `${lang}: exact flashcard link`)
  assert.doesNotMatch(html, /Befund &amp; Selbsttest|rID10997/, `${lang}: no boilerplate section or unverified case attribution`)
}
const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(entry => entry.id === 'atrt')
assert.equal(topic.link, '/gehirn/tumoren/atrt')
assert.equal(topic.inProgress, true)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(entry => entry.id === 'atrt')))
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.includes('atrt'))
  assert.equal(questions.length, 1, `${locale}: exactly one localized MCQ`)
  assert.equal(questions[0].correct, 'B')
  assert.deepEqual(Object.keys(questions[0].wrongExplanations).sort(), ['A', 'C', 'D'])
}
assert.ok(FLASHCARD_TOPICS.some(entry => entry.id === 'atrt' && entry.href === '/flashcards/atrt'))
assert.equal(getCardsByTopic('atrt').length, 3)
const provenance = JSON.parse(fs.readFileSync('public/educational/atrt-mri-pattern.provenance.json', 'utf8'))
assert.deepEqual(provenance.alt, lesson.ATRT_COPY.heroAlt)
assert.match(provenance.clinicalUse, /Non-diagnostic conceptual graphic/)
assert.ok(fs.existsSync('public/educational/atrt-mri-pattern.svg'))
assert.ok(lesson.ATRT_SOURCES.some(source => source.href === 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10225182/'))
assert.ok(lesson.ATRT_SOURCES.some(source => source.href === 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9914341/' && source.title.en.startsWith('Calandrelli')))
assert.ok(!JSON.stringify(lesson.ATRT_SOURCES).includes('PMC9992450'))
assert.match(lesson.ATRT_COPY.intro.en, /posterior fossa is only one possible location/)
assert.match(fs.readFileSync('public/educational/atrt-mri-pattern.svg', 'utf8'), /one possible example location/)
const routeSource = fs.readFileSync('app/gehirn/tumoren/atrt/page.jsx', 'utf8')
for (const key of ['contents', 'close', 'complete', 'completed']) assert.ok(routeSource.includes(`${key}: {`), `shared shell label ${key}`)
console.log('ATRT SSR/registry PASS: actual shared shell, DE/EN/FA and RTL, PDF source boundary, conceptual visual provenance, exact quiz/cards/curriculum and assessment registrations.')
