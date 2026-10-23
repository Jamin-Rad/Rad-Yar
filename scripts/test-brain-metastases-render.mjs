import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnHirnmetastasenLesson.js'

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
const Page = compile('app/gehirn/tumoren/hirnmetastasen/page.jsx', {
  'next/image': Image,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnHirnmetastasenLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.equal((html.match(/<h1>/g) || []).length, 1)
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(`alt="${escaped(data.BRAIN_METASTASES_COPY.heroAlt[lang])}"`))
  assert.ok(html.includes(escaped(data.BRAIN_METASTASES_COPY.scopeNote[lang])))
  assert.ok(html.includes(escaped(data.BRAIN_METASTASES_COPY.question[lang])))
  assert.ok(html.includes(escaped(data.BRAIN_METASTASES_COPY.leptomeningealQuestion[lang])))
  assert.ok(html.includes(escaped(data.BRAIN_METASTASES_COPY.leptomeningealVisualCaption[lang])))
  const figures = [...html.matchAll(/<figure class="diagram">([\s\S]*?)<\/figure>/g)]
  assert.equal(figures.length, 2)
  for (const [, figure] of figures) assert.equal((figure.match(/<figcaption/g) || []).length, 1)
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'))
  const quizHref = links.find(href => href.startsWith('/ueben/quiz?'))
  const flashcardHref = links.find(href => href.startsWith('/flashcards/'))
  assert.ok(quizHref, `${lang}: actual rendered quiz action`)
  assert.ok(flashcardHref, `${lang}: actual rendered flashcard action`)
  const quiz = new URL(quizHref, 'https://radyar.test')
  assert.equal(quiz.searchParams.get('fach'), 'gehirn')
  assert.equal(quiz.searchParams.get('n'), '2')
  assert.equal(quiz.searchParams.get('themen'), data.BRAIN_METASTASES_ID)
  assert.equal(quiz.searchParams.get('lang'), lang === 'de' ? null : lang)
  const expectedReturn = data.BRAIN_METASTASES_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  assert.equal(quiz.searchParams.get('from'), expectedReturn)
  const cards = new URL(flashcardHref, 'https://radyar.test')
  assert.equal(cards.pathname, `/flashcards/${data.BRAIN_METASTASES_ID}`)
  assert.equal(cards.searchParams.get('lang'), lang === 'de' ? null : lang)
  assert.equal(cards.searchParams.get('from'), expectedReturn)
  const optionGroups = [...html.matchAll(/<div class="options" role="group" aria-labelledby="(?:parenchymal|leptomeningeal)-question-question">([\s\S]*?)<\/div>/g)]
  assert.equal(optionGroups.length, 2)
  for (const [, group] of optionGroups) assert.equal((group.match(/<button/g) || []).length, 4)
  assert.ok(html.includes('id="leptomeningeal"'))
}
console.log('Brain metastases actual-route semantic SSR PASS: DE/EN/FA, standard shell/hero, two local checks and parsed localized quiz/flashcard return links. Browser layout and interactions remain unverified.')
