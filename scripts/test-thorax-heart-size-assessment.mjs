import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'
import { ABDOMEN_THORAX_REGISTERED_QUESTIONS, ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS } from '../data/abdomenThoraxRegisteredQuestions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
let activeLanguage = 'de'
let shellProps
const source = transformSync(fs.readFileSync(path.join(root, 'app/thorax/roentgen-thorax-systematik/page.js'), 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)(name => {
  if (name === 'next/link') return { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: activeLanguage }) }
  if (name === '@/components/LessonReferenceShell') return { __esModule: true, default: props => { shellProps = props; return React.createElement(React.Fragment, null, props.children) } }
  if (name.endsWith('.module.css')) return styles
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const curriculum = []
const visit = value => {
  if (!value) return
  if (Array.isArray(value)) return value.forEach(visit)
  if (typeof value !== 'object') return
  if (value.id === 'herzgroesse-roentgen') curriculum.push(value)
  Object.values(value).forEach(visit)
}
visit(CURRICULUM)
assert.equal(curriculum.length, 1, 'exact curriculum ID exists once')
assert.equal(curriculum[0].link, '/thorax/roentgen-thorax-systematik#projection')
assert.equal(curriculum[0].mcqLink, '/ueben/quiz?fach=thorax&n=1&themen=herzgroesse-roentgen')
assert.equal(curriculum[0].flashcardLink, '/flashcards/herzgroesse-roentgen')
assert.equal(curriculum[0].inProgress, true)
assert.ok(ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS.some(group => group.topics.some(topic => topic.id === 'herzgroesse-roentgen')), 'topic filter group exists')
const question = ABDOMEN_THORAX_REGISTERED_QUESTIONS['thorax-heart-size']
assert.ok(question)
const flashcard = FLASHCARDS.find(card => card.id === 'herzgroesse-roentgen-projection')
assert.ok(flashcard, 'topic flashcard is in the shared bank')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'herzgroesse-roentgen'), 'flashcard topic is registered')

const expected = {
  de: ['Bei a.p. liegt das Herz weiter entfernt', 'Wissen testen', 'Karteikarten öffnen'],
  en: ['On an AP view, the heart is farther away', 'Open quiz', 'Flashcards'],
  fa: ['در نمای AP، قلب از دتکتور دورتر قرار می‌گیرد', 'بازکردن آزمون', 'فلش‌کارت‌ها'],
}
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.doesNotMatch(html, /<h1/, `${lang}: route child does not duplicate shell title`)
  assert.ok(html.includes('id="projection"'), `${lang}: stable projection anchor exists`)
  assert.ok(html.includes(expected[lang][0]), `${lang}: AP magnification explanation renders`)
  assert.equal(shellProps.quizHref, '/ueben/quiz?fach=thorax&n=1&themen=herzgroesse-roentgen&from=%2Fthorax%2Froentgen-thorax-systematik%23projection')
  assert.equal(shellProps.flashcardsHref, '/flashcards/herzgroesse-roentgen?from=%2Fthorax%2Froentgen-thorax-systematik%23projection')
  assert.equal(shellProps.lang, lang)
}
for (const lang of ['de', 'en', 'fa']) {
  assert.match(question[lang].question, /AP|a\.p\.|پرتابل/)
  assert.equal(question[lang].tags[0], 'herzgroesse-roentgen')
  assert.equal(question[lang].options.length, 4)
  assert.equal(question[lang].correct, 'A')
  assert.match(flashcard.front[lang], /AP|a\.p\.|AP/)
  assert.match(flashcard.answer[lang], /Detektor|detector|دتکتور/)
}
const map = fs.readFileSync(path.join(root, 'docs/lesson-quality/pdf-map-abdomen-thorax.md'), 'utf8')
assert.match(map, /`herzgroesse-roentgen`[^\n]*MCQ/i)
const ledger = fs.readFileSync(path.join(root, 'docs/lesson-quality/source-ledgers/chest-xray-heart-size-thorax-p27-28.md'), 'utf8')
assert.match(ledger, /Physical p\.28 \(printed p\.27\)/i)
assert.match(ledger, /geometric magnification/)
console.log('Thorax cardiac-size integration PASS: curriculum, exact topic-filtered MCQ, registered flashcard, DE/EN/FA route SSR, RTL, AP nuance, and return anchors.')
