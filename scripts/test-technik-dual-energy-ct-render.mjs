import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DUAL_ENERGY_CT_SECTION as lesson, DUAL_ENERGY_CT_QUESTIONS as questions, DUAL_ENERGY_CT_FLASHCARDS as cards } from '../data/technikDualEnergyLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const persian = /[\u0600-\u06ff]/u
assert.equal(lesson.id, 'dual-energy-ct')
assert.equal(lesson.pages, '49–50')
assert.equal(lesson.rows.length, 8)
assert.equal(questions.length, 3)
assert.equal(cards.length, 2)
for (const lang of langs) assert.ok(QUESTION_BANK[lang].some(question => question.id === `dual-energy-ct-${lang}-low-kev`), `${lang} MCQ registered`)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(topic => topic.id === 'dual-energy-ct')), 'quiz topic registered')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'dual-energy-ct'), 'flashcard topic registered')
assert.equal(getCardsByTopic('dual-energy-ct').length, 2, 'both flashcards registered')
function inspect(value) {
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    assert.ok(langs.every(lang => value[lang].trim()))
    assert.ok(!persian.test(value.de) && !persian.test(value.en))
  } else Object.values(value).forEach(inspect)
}
inspect(lesson); inspect(cards)
for (const lang of langs) {
  const q = questions.find(item => item.id === `dual-energy-ct-${lang}-low-kev`)
  assert.ok(q && q.options.length === 4 && q.correct === 'A')
  assert.ok(q.options.every(option => option.text.trim()))
  assert.ok(['B', 'C', 'D'].every(id => q.wrongExplanations[id]?.trim()))
  assert.ok(persian.test(q.question) === (lang === 'fa'))
}
assert.equal(lesson.visuals[0].src, '/technik/grundlagen/dect-methods-p49.png')
assert.ok(lesson.visuals[0].alt.fa && lesson.visuals[0].caption.fa)
assert.ok(lesson.references.length >= 4)

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
let activeLang = 'de'
const replacements = {
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang, sections, sources }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr', 'data-sections': sections.map(section => section.id).join(',') }, children, sources),
    LessonSection: ({ id, title, children }) => React.createElement('section', { id, 'aria-label': title }, children),
    LessonSources: ({ items }) => React.createElement('aside', { 'data-references': items.map(item => item.href || '').join('|') }),
  },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikDualEnergyLesson': { DUAL_ENERGY_CT_QUESTIONS: questions, DUAL_ENERGY_CT_SECTION: lesson },
  './page.module.css': { __esModule: true, default: styles },
}
const pageSource = fs.readFileSync('app/technik/dual-energy-ct/page.jsx', 'utf8')
const source = transformSync(pageSource, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
const Page = module.exports.default
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`), `${lang} language`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} text direction`)
  assert.ok(html.includes('id="dual-energy-ct"') && html.includes('id="take-home"'), `${lang} chapter anchors`)
  assert.ok(html.includes(lesson.title[lang]), `${lang} title`)
  assert.ok(html.includes(lesson.visuals[0].src) && html.includes(lesson.visuals[0].alt[lang]), `${lang} source image and alt`)
  assert.ok(html.includes(lesson.visuals[0].caption[lang]), `${lang} source caption`)
  assert.ok(html.includes(questions.find(item => item.id === `dual-energy-ct-${lang}-low-kev`).question), `${lang} MCQ`)
  assert.ok(lesson.rows.every(([term]) => html.includes(term[lang])), `${lang} all application rows`)
  assert.ok(lesson.references.every(ref => html.includes(ref.href)), `${lang} references`)
  assert.ok(html.includes(lesson.note[lang]), `${lang} caveat`)
}
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'dual-energy-ct',[^\n]*link: '\/technik\/dual-energy-ct'[^\n]*mcqLink: '[^']*themen=dual-energy-ct'[^\n]*flashcardLink: '\/flashcards\/dual-energy-ct'/)
for (const asset of ['public/technik/grundlagen/dect-methods-p49.png', 'public/technik/dual-energy-ct/hero.svg']) assert.ok(fs.existsSync(asset), `${asset} exists`)
assert.doesNotMatch(fs.readFileSync('public/technik/dual-energy-ct/hero.svg', 'utf8'), /<text\b/i, 'hero is language-neutral vector art')
console.log('Dual-Energy CT SSR audit PASS: DE/EN/FA, RTL, lesson chapters, source figure, all application rows, MCQ, caveats, references and curriculum links.')
