import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import { HRCT_LESSONS } from '../data/hrct-muster.js'
import { ATELECTASIS_QUESTIONS } from '../data/thoraxAtelectasisAssessment.js'
const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, replacements) {
  const module = { exports: {} }
  new Function('require', 'module', 'exports', transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ children, href, ...props }) => React.createElement('a', { href, ...props }, children)
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/components/LessonHero': ({ title }) => React.createElement('div', { 'data-lesson-hero': '' }, React.createElement('h1', null, title)),
  './StandardLessonShell.module.css': styles,
})
let lang = 'de'
const Page = compile('components/HrctPatternLesson.jsx', {
  'next/link': Link,
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/components/lesson-template/TopicAssessment': ({ topic }) => React.createElement('div', { 'data-topic-assessment': topic }),
  '@/data/thoraxAtelectasisAssessment': { ATELECTASIS_QUESTIONS },
  '@/app/abdomen/gi/divertikulitis/page.module.css': styles,
  './HrctPatternLesson.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement('p', null, text)).slice(3, -4)
for (const lesson of Object.values(HRCT_LESSONS)) for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page, { lesson }))
  assert.equal((html.match(/<main\b/g) || []).length, 1)
  assert.ok(html.includes(`data-lesson-shell="${lesson.id}"`))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(escaped(lesson.definition[lang])))
  assert.ok(html.indexOf(escaped(lesson.definition[lang])) > html.indexOf(`id="${lesson.sections[0].id}-panel"`), 'definition belongs in first chapter')
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`))
    for (const card of section.cards || []) assert.ok(html.includes(escaped(card.text[lang])), `authored card retained ${lesson.id}/${section.id}/${lang}`)
    for (const image of section.images || []) assert.ok(html.includes(`src="${image.src}"`), 'clinical source image retained')
  }
  for (const point of lesson.takehome) assert.ok(html.includes(escaped(point[lang])), 'all authored summary rules retained')
  assert.ok(html.includes(lang === 'fa' ? 'پیام نهایی' : 'Take Home Message'))
  assert.ok(html.indexOf('id="takehome"') > html.lastIndexOf(`id="${lesson.sections.at(-1).id}"`))
  assert.ok(html.includes(`themen=${lesson.id}`))
  assert.ok(html.includes(`/flashcards/${lesson.id}`))
  if (lesson.selfCheck) assert.ok(html.includes(escaped(lesson.selfCheck.question[lang])))
}
console.log('HRCT standard-design SSR PASS: four real lesson definitions × DE/EN/FA, original sections/cards/images/checks, exact practice links, first-chapter definitions and final authored Take Home Message.')
