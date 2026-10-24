import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
// This fixture supplies its authored check explicitly; no curriculum draft lookup is needed.
const drafts = { abdomenThoraxAssessmentDrafts: {} }
const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
const progressCalls = []
let currentLang = 'de'
const Link = ({ children, href, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = ({ title, lessonId }) => React.createElement('div', { 'data-lesson-hero': lessonId }, React.createElement('h1', null, title))
function compile(file, replacements) {
  const module = { exports: {} }
  const code = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const standard = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: currentLang }) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: (key, ids) => { progressCalls.push({ key, ids }); return [new Set(ids), () => {}] } },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/components/LessonHero': Hero,
  './StandardLessonShell.module.css': styles,
})
const Reference = compile('components/LessonReferenceShell.jsx', {
  '@/components/lesson-template/StandardLessonShell': standard,
  '@/data/abdomenThoraxAssessmentDrafts': drafts,
  './LessonReferenceShell.module.css': styles,
}).default
const translated = { de: 'Quellinhalt', en: 'Source content', fa: 'محتوای منبع' }
const goals = { de: 'Vorhandenes Lernziel', en: 'Existing learning goal', fa: 'هدف یادگیری موجود' }
const check = { question: translated, options: [translated, goals], answer: 0, explanation: translated }
for (const lang of ['de', 'en', 'fa']) {
  currentLang = lang
  const html = renderToStaticMarkup(React.createElement(Reference, {
    lessonId: 'reference-fixture', lang, title: translated, goals: [goals], check,
    summary: [translated, goals], mainLandmark: true,
    quizHref: `/ueben/quiz?lang=${lang}&from=%2Ffixture%3Flang%3D${lang}`,
    flashcardsHref: `/flashcards/fixture?lang=${lang}`,
  }, React.createElement('main', null, React.createElement('h1', null, translated[lang]), React.createElement('p', null, translated[lang]))))
  assert.equal((html.match(/<main\b/g) || []).length, 1, 'one actual page landmark')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'legacy content heading is demoted without duplicating the page title')
  assert.ok(html.includes('data-lesson-shell="reference-fixture"'))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(`aria-valuemax="3" aria-valuenow="3"`), 'preserve all three legacy read IDs')
  assert.deepEqual(progressCalls.at(-1), { key: 'ref-reference-fixture', ids: ['content', 'self-check', 'take-home'] })
  assert.ok(html.includes(`id="content-panel"`))
  assert.ok(/id="self-check-panel" hidden=""/.test(html))
  assert.ok(/id="take-home-panel" hidden=""/.test(html))
  assert.ok(html.indexOf(goals[lang]) > html.indexOf('id="content-panel"'), 'goals are inside first chapter')
  assert.ok(html.includes(`href="/flashcards/fixture?lang=${lang}"`))
  assert.ok(html.includes(`/ueben/quiz?lang=${lang}&amp;from=%2Ffixture%3Flang%3D${lang}`))
  assert.ok(html.includes(lang === 'fa' ? 'پیام نهایی' : 'Take Home Message'))
  assert.ok(html.indexOf('id="take-home"') > html.indexOf('id="self-check"'), 'summary is final chapter')
  assert.ok(!html.includes('Diese Lektion wird noch bearbeitet'))
}
console.log('Reference shell actual StandardLessonShell SSR PASS: three languages, one landmark, first-chapter goals, exact links, final Take Home Message and all three saved ref-progress IDs.')
