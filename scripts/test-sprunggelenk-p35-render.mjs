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

const { default: Route } = require(path.join(root, 'app/msk/trauma/sprunggelenk/page.js'))
const { getPatternCheckFeedback } = require(path.join(root, 'app/msk/trauma/sprunggelenk/page.js'))
const { CURRICULUM } = require(path.join(root, 'data/curriculum.js'))

function findTopic(topics = []) {
  for (const topic of topics) {
    if (topic.id === 'osg-fraktur') return topic
    const match = findTopic(topic.sub)
    if (match) return match
  }
  return null
}

const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).map(chapter => findTopic(chapter.themen)).find(Boolean)
assert.ok(topic, 'exact existing ankle curriculum entry exists')
assert.equal(topic.link, '/msk/trauma/sprunggelenk')

const expected = {
  de: ['Spezielle Frakturmuster erkennen', 'Bimalleoläre Fraktur', 'Trimalleoläre Fraktur', 'Syndesmosenruptur', 'Pilon-/Plafond-Fraktur', 'Chaput vs. Volkmann', 'PDF-S. 35 (gedruckte S. 34)', 'Muster erkennen', 'Trümmerfraktur des tibialen Plafonds'],
  en: ['Recognise specific fracture patterns', 'Bimalleolar fracture', 'Trimalleolar fracture', 'Syndesmotic rupture', 'Pilon / plafond fracture', 'Chaput vs Volkmann', 'PDF p. 35 (printed p. 34)', 'Identify the pattern', 'Comminuted tibial plafond fracture'],
  fa: ['الگوهای ویژه شکستگی را بشناسید', 'شکستگی دو قوزکی', 'شکستگی سه‌قوزکی', 'پارگی سندسموز', 'شکستگی Pilon / plafond', 'Chaput در برابر Volkmann', 'صفحه PDF شماره ۳۵', 'الگو را تشخیص دهید', 'شکستگی خردشده سطح مفصلی تیبیا'],
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} route includes ${phrase}`)
  assert.equal((html.match(/aria-pressed="false"/g) || []).length >= 3, true, `${locale} self-check options are exposed as buttons`)
  const sourceCopy = locale === 'de'
    ? { specialForms: { checkCorrect: 'Korrekt', checkIncorrect: 'Noch nicht' } }
    : locale === 'en'
      ? { specialForms: { checkCorrect: 'Correct', checkIncorrect: 'Not quite' } }
      : { specialForms: { checkCorrect: 'درست', checkIncorrect: 'هنوز نه' } }
  assert.equal(getPatternCheckFeedback(null, sourceCopy), null, `${locale} self-check has no feedback before selection`)
  assert.equal(getPatternCheckFeedback('pilon', sourceCopy), sourceCopy.specialForms.checkCorrect, `${locale} correct answer returns explanatory feedback`)
  assert.equal(getPatternCheckFeedback('mais', sourceCopy), sourceCopy.specialForms.checkIncorrect, `${locale} incorrect answer returns corrective feedback`)
}

console.log('PASS: MSK.pdf p.35 ankle morphology comparison renders in DE/EN/FA and links to exact osg-fraktur curriculum item')
