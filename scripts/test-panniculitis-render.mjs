import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/panniculitisLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
// Isolated semantic render of the actual route/shell/hero. Next Image/Link and
// progress/environment hooks are mocked; layout, loading and browser events are
// not tested. Closed accordion bodies remain in SSR markup, as in the real shell.
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
const Page = compile('app/abdomen/peritoneum/mesenteriale-panniculitis/page.jsx', {
  'next/image': Image,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/panniculitisLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))
const lesson = data.PANNICULITIS_LESSON
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.equal((html.match(/<h1>/g) || []).length, 1)
  assert.ok(html.includes('data-lesson-hero="true"'))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(`alt="${escaped(lesson.heroAlt[lang])}"`))
  for (const chapter of lesson.chapters) {
    assert.ok(html.includes(`id="${chapter.id}-panel"`))
    chapter.paragraphs.forEach(text => assert.ok(html.includes(escaped(text[lang]))))
  }
  for (const figure of Object.values(lesson.figures)) {
    assert.ok(html.includes(`src="${figure.src}"`))
    assert.ok(html.includes(`alt="${escaped(figure.alt[lang])}"`))
    assert.ok(html.includes(`href="${figure.sourceUrl}"`))
    assert.ok(html.includes(escaped(figure.caption[lang])))
  }
  assert.equal((html.match(/<figcaption>/g) || []).length, 2)
  assert.equal((html.match(/type="radio"/g) || []).length, 4)
  assert.ok(html.includes(escaped(lesson.question.question[lang])))
  lesson.question.options.forEach(text => assert.ok(html.includes(escaped(text[lang]))))
  assert.equal((html.match(/<details>/g) || []).length, 3)
  lesson.cards.forEach(([front, back]) => {
    assert.ok(html.includes(escaped(front[lang])))
    assert.ok(html.includes(escaped(back[lang])))
  })
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'))
  const quizHref = links.find(href => href.startsWith('/ueben/quiz?'))
  assert.ok(quizHref, 'Actual rendered practice link')
  const quiz = new URL(quizHref, 'https://radyar.test')
  assert.equal(quiz.pathname, '/ueben/quiz')
  assert.equal(quiz.searchParams.get('fach'), 'abdomen')
  assert.equal(quiz.searchParams.get('n'), '1')
  assert.equal(quiz.searchParams.get('themen'), 'mesenteriale-panniculitis')
  assert.equal(quiz.searchParams.get('lang'), lang === 'de' ? null : lang)
  const expectedReturn = '/abdomen/peritoneum/mesenteriale-panniculitis' + (lang === 'de' ? '' : `?lang=${lang}`)
  // The actual quiz consumer uses the decoded from parameter as its Back href.
  assert.match(fs.readFileSync('app/ueben/quiz/page.jsx', 'utf8'), /const backHref\s*=\s*fromParam \|\| '\/ueben'/)
  const backHref = quiz.searchParams.get('from') || '/ueben'
  assert.equal(backHref, expectedReturn)
  const destination = new URL(backHref, 'https://radyar.test')
  assert.equal(destination.pathname, '/abdomen/peritoneum/mesenteriale-panniculitis')
  assert.equal(destination.searchParams.get('lang'), lang === 'de' ? null : lang)
  assert.ok(html.includes('id="lesson-sources-panel"'))
}
console.log('Panniculitis actual-route SSR PASS: DE/EN/FA, actual maintained shell/hero, chapters/captions, source links, four options, three cards and parsed localized quiz/return mapping. Next runtime, visual layout and interactive behaviour remain unverified.')
