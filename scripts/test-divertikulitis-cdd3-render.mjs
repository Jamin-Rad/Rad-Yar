import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const swc = require('next/dist/build/swc')
let lang = 'de'

const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, request.slice(2))
  return originalResolve.call(this, request, parent, ...rest)
}
const loader = (module, filename) => {
  const { code } = swc.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  })
  module._compile(code, filename)
}
require.extensions['.js'] = loader
require.extensions['.jsx'] = loader
require.extensions['.css'] = module => { module.exports = {} }
const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
  if (request === 'next/image') return ({ fill, priority, ...props }) => React.createElement('img', props)
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (request === '@/hooks/useLessonReadStatus') return { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) }
  if (request === '@/hooks/useMobileLearningLayout') return { useMobileLearningLayout: () => false }
  if (request === '@/components/InProgressBanner') return () => null
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/gi/divertikulitis/page.js'))
const { QUESTION_BANK } = require(path.join(root, 'data/questions.js'))
const { getCardsByTopic } = require(path.join(root, 'data/flashcards.js'))
const { CURRICULUM } = require(path.join(root, 'data/curriculum.js'))

function findTopic(topics = []) {
  for (const topic of topics) {
    if (topic.id === 'divertikulitis') return topic
    const match = findTopic(topic.sub)
    if (match) return match
  }
  return null
}

const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).map(chapter => findTopic(chapter.themen)).find(Boolean)
assert.ok(topic, 'exact divertikulitis curriculum entry exists')
assert.equal(topic.link, '/abdomen/gi/divertikulitis')

const expected = {
  de: ['3a', 'Symptomatische unkomplizierte Divertikelkrankheit (SUDD)', '3b', 'Rezidivierende Divertikulitis ohne Komplikationen', '3c', 'Rezidivierende Divertikulitis mit Komplikationen'],
  en: ['3a', 'Symptomatic uncomplicated diverticular disease (SUDD)', '3b', 'Recurrent diverticulitis without complications', '3c', 'Recurrent diverticulitis with complications'],
  fa: ['3a', 'بیماری دیورتیکولی علامت‌دار بدون عارضه (SUDD)', '3b', 'دیورتیکولیت عودکننده بدون عارضه', '3c', 'دیورتیکولیت عودکننده همراه عارضه'],
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} route includes ${phrase}`)
  assert.ok(html.includes('CDD 3a'), `${locale} route distinguishes chronic type 3 from acute type 2`)
}

for (const locale of ['de', 'en', 'fa']) {
  const item = QUESTION_BANK[locale].find(question => question.id === `divertikulitis-${locale}-cdd-3c`)
  assert.ok(item, `${locale} cdd-3c retrieval question exists`)
  assert.equal(item.correct, 'C')
  assert.equal(item.options.length, 4)
  assert.ok(item.explanation.length > 20)
}

const card = getCardsByTopic('divertikulitis').find(item => item.id === 'divertikulitis-cdd-3')
assert.ok(card, 'CDD 3a/b/c flashcard exists')
for (const locale of ['de', 'en', 'fa']) {
  assert.ok(card.front[locale] && card.answer[locale] && card.explanation[locale], `${locale} flashcard has front, answer and explanation`)
}

console.log('PASS: CDD 3a/3b/3c renders in DE/EN/FA and linked MCQ/flashcard parity holds')
