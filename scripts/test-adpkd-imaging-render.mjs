import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/adpkdImagingLesson.js'
import * as assessments from '../data/adpkdImagingAssessments.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Image = ({ fill, priority, ...props }) => React.createElement('img', props)
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': Image, './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
let activeLanguage = 'de'
const Page = compile('app/abdomen/niere/adpkd/page.jsx', {
  'next/image': Image,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/adpkdImagingLesson': data,
  './page.module.css': styles,
}).default
const escapeText = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.equal((html.match(/<h1>/g) || []).length, 1, `${lang}: one page title`)
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: locale direction`)
  assert.ok(html.includes(escapeText(data.ADPKD_COPY.scopeNote[lang])), `${lang}: visible supplement scope`)
  assert.ok(html.includes(escapeText(data.ADPKD_COPY.visualCaption[lang])), `${lang}: localized figure caption`)
  assert.ok(html.includes('role="img"') && html.includes('adpkd-diagram-desc'), `${lang}: accessible conceptual diagram`)
  assert.ok(html.includes(escapeText(data.ADPKD_COPY.question[lang])), `${lang}: local self-check`)
  assert.equal((html.match(/<section\b/g) || []).length, 4, `${lang}: four authored lesson sections`)
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'))
  const quizHref = links.find(href => href.startsWith('/ueben/quiz?'))
  const flashcardHref = links.find(href => href.startsWith('/flashcards/'))
  assert.ok(quizHref, `${lang}: rendered quiz action`)
  assert.ok(flashcardHref, `${lang}: rendered flashcard action`)
  const quiz = new URL(quizHref, 'https://radyar.test')
  assert.equal(quiz.searchParams.get('fach'), 'abdomen')
  assert.equal(quiz.searchParams.get('n'), '2')
  assert.equal(quiz.searchParams.get('themen'), data.ADPKD_ID)
  assert.equal(quiz.searchParams.get('lang'), lang === 'de' ? null : lang)
  assert.equal(quiz.searchParams.get('from'), data.ADPKD_PATH + (lang === 'de' ? '' : `?lang=${lang}`))
  const cards = new URL(flashcardHref, 'https://radyar.test')
  assert.equal(cards.pathname, `/flashcards/${data.ADPKD_ID}`)
  assert.equal(cards.searchParams.get('lang'), lang === 'de' ? null : lang)
  assert.equal(cards.searchParams.get('from'), data.ADPKD_PATH + (lang === 'de' ? '' : `?lang=${lang}`))
  const optionGroup = html.match(/<div class="options" role="group"[^>]*>([\s\S]*?)<\/div>/)
  assert.ok(optionGroup, `${lang}: accessible self-check option group`)
  assert.equal((optionGroup[1].match(/<button/g) || []).length, 4, `${lang}: four self-check options`)
  assert.equal(assessments.ADPKD_QUESTIONS[lang].length, 2)
}
console.log('ADPKD route semantic SSR PASS: DE/EN/FA, shell, sections, scope, accessible diagram/self-check and localized registry links. Browser layout/interaction remain unverified.')
