import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { STEATOSIS_CHAPTERS, STEATOSIS_COPY } from '../data/steatosisLesson.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const compile = (path, replacements) => {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
let lang = 'de'
const lesson = compile('app/abdomen/leber/steatose/SteatosisLesson.jsx', {
  'next/link': Link,
  '@/data/steatosisLesson': { STEATOSIS_CHAPTERS, STEATOSIS_COPY },
  '@/components/LessonHero': Hero,
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/app/andarun/test/page.module.css': styles,
  '@/components/LessonTypography.module.css': styles,
  './page.module.css': styles,
})
const Page = compile('app/abdomen/leber/steatose/page.js', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => false }) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  './SteatosisLesson': lesson,
  '@/data/steatosisLesson': { STEATOSIS_CHAPTERS, STEATOSIS_COPY },
}).default

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(STEATOSIS_COPY.title[locale]), `${locale}: title`)
  for (const chapter of STEATOSIS_CHAPTERS) assert.ok(html.includes(chapter.title[locale]) && html.includes(`id="${chapter.id}"`), `${locale}: chapter ${chapter.id}`)
  assert.ok(html.includes(STEATOSIS_COPY.quiz.title[locale]) && html.includes(STEATOSIS_COPY.quiz.stem[locale]), `${locale}: self-check`)
  assert.ok(html.includes('id="lesson-sources-panel"'), `${locale}: source panel`)
  assert.ok(html.includes('href="https://doi.org/10.1016/j.jhep.2024.04.031"'), `${locale}: current MASLD guideline`)
  assert.ok(html.includes('href="https://doi.org/10.1016/j.jhep.2021.05.025"'), `${locale}: imaging guideline`)
  assert.ok(html.includes('PDF S. 26–27') || html.includes('PDF pp. 26–27') || html.includes('صفحه‌های PDF ۲۶–۲۷'), `${locale}: exact PDF source scope`)
  assert.ok(html.includes('Lehrschema') || html.includes('teaching schematic') || html.includes('شماتیک آموزشی'), `${locale}: diagram disclosed as schematic`)
}
const topic = fs.readFileSync('data/curriculum.js', 'utf8').match(/\{ id: 'hepatische-steatose'[^\n]+/)
assert.ok(topic, 'exact curriculum topic exists')
assert.match(topic[0], /link: '\/abdomen\/leber\/steatose'/)
assert.match(topic[0], /inProgress: true/)
assert.doesNotMatch(fs.readFileSync('data/steatosisLesson.js', 'utf8'), /Goldstandard|gold standard|استاندارد طلایی/, 'outdated blanket MRI gold-standard wording removed')
console.log('Hepatic steatosis actual-route SSR PASS: DE/EN/FA, RTL, source citations, PDF scope, schematic disclosure, embedded check, exact in-progress curriculum link.')
