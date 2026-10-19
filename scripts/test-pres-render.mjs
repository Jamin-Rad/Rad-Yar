import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnPresLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
let activeLanguage = 'de'
const Page = compile('app/gehirn/encephalopathie/pres/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnPresLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${lang}: maintained shell`)
  assert.ok(html.includes(`alt="${escaped(data.GEHIRN_PRES_LESSON.diagramAlt[lang])}"`), `${lang}: localized hero alt`)
  assert.ok(html.includes('src="/educational/pres/posterior-pattern.svg"'), `${lang}: topic-specific schematic`)
  for (const chapter of data.GEHIRN_PRES_LESSON.chapters) {
    assert.ok(html.includes(escaped(chapter.title[lang])), `${lang}: chapter title ${chapter.id}`)
    assert.ok(html.includes(`id="${chapter.id}"`), `${lang}: chapter id ${chapter.id} matches the learning path`)
  }
  assert.ok(html.includes('id="take-home"') && html.includes('takeHomeSection'), `${lang}: registered emphasis summary section`)
  assert.ok(html.includes(escaped(data.GEHIRN_PRES_LESSON.objective[lang])), `${lang}: learning outcome`)
  assert.ok(html.includes(escaped(data.GEHIRN_PRES_LESSON.assessment.question[lang])), `${lang}: self-check question`)
  for (const option of data.GEHIRN_PRES_LESSON.assessment.options) assert.ok(html.includes(escaped(option[lang])), `${lang}: data-driven assessment options`)
  assert.ok(data.GEHIRN_PRES_LESSON.assessment.feedback[lang].length > 40, `${lang}: explanatory feedback is localized`)
  assert.ok(data.GEHIRN_PRES_LESSON.assessment.retry[lang].length > 20, `${lang}: retry feedback is localized`)
  for (const item of data.GEHIRN_PRES_LESSON.takeaways) assert.ok(html.includes(escaped(item.title[lang])), `${lang}: summary title`)
}
console.log('PRES actual-route semantic SSR PASS: DE/EN/FA, StandardLessonShell, RTL metadata, topic schematic, chapter text, self-check and summary.')
