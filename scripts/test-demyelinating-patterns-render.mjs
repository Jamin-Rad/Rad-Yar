import * as spinePatternPractice from '../data/spinePatternPractice.js'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'
import { DEMYELINATION_COPY as C, DEMYELINATION_IDS, DEMYELINATION_PATH, DEMYELINATION_SECTIONS, DEMYELINATION_SOURCES } from '../data/gehirnDemyelinationLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const value = (item, lang) => item[lang]
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compileExports(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const compile = (path, replacements) => compileExports(path, replacements).default
const ShellModule = compileExports('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/gehirn/entzuendlich/demyelinisierende-muster/page.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/components/lesson-template/StandardLessonShell': ShellModule,
  '@/data/spinePatternPractice': spinePatternPractice,
  '@/components/lesson-template/TopicAssessment': compileExports('components/lesson-template/TopicAssessment.jsx', {}),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/gehirnDemyelinationLesson': { DEMYELINATION_COPY: C, DEMYELINATION_IDS, DEMYELINATION_PATH, DEMYELINATION_SECTIONS, DEMYELINATION_SOURCES },
  './page.module.css': styles,
})
function assertLocalized(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${path}.${lang} missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) assertLocalized(child, `${path}.${key}`)
}

assertLocalized(C)
assertLocalized(DEMYELINATION_SECTIONS)
assertLocalized(DEMYELINATION_SOURCES)
const persianLetters = /[\u0600-\u06FF]/
assert.ok(!persianLetters.test(C.visualCaption.de), 'German visual caption must not contain Persian')
for (const [index, item] of C.visualLegend.entries()) assert.ok(!persianLetters.test(item.de), `German anatomy legend ${index} must not contain Persian`)
for (const [index, row] of C.comparison.entries()) {
  for (const key of ['feature', 'ms', 'nmosd', 'mog', 'adem']) assert.ok(!persianLetters.test(row[key].de), `German comparison row ${index} ${key} must not contain Persian`)
}
const topics = CURRICULUM.flatMap(group => group.kapitel || []).flatMap(chapter => chapter.themen || [])
for (const id of DEMYELINATION_IDS) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic, `curriculum item ${id} exists`)
  assert.equal(topic.link, DEMYELINATION_PATH, `${id} route`)
  assert.equal(topic.inProgress, true, `${id} remains in progress`)
}
assert.equal(topics.some(item => item.id.toLowerCase().includes('mogad')), false, 'do not invent a MOGAD curriculum ID')
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} direction`)
  assert.ok(html.includes(C.title[lang]), `${lang} title`)
  assert.ok(html.includes(`/educational/demyelinisierende-muster/pattern-map-${lang}.svg`), `${lang} localized concept visual`)
  assert.ok(html.includes(C.question[lang]) && html.includes(C.options[0][lang]), `${lang} self-check`)
  assert.ok(C.feedback.every(item => item[lang]), `${lang} localized answer feedback`)
  assert.ok(html.includes(C.visualCaption[lang]) && html.includes(C.visualLegend[3][lang]), `${lang} localized anatomy caption/legend`)
  assert.ok(html.includes(value(C.scope, lang)) && html.includes(value(C.sourcesNote, lang)), `${lang} source/scope disclosure is rendered`)
  for (const source of DEMYELINATION_SOURCES) assert.ok(html.includes(source.tag[lang]), `${lang} localized source tag`)
  for (const id of ['orient', 'compare', 'self-check', 'take-home']) assert.ok(html.includes(`id="${id}"`), `${lang} section ${id}`)
  assert.match(html, /<section id="orient"[^>]*class="[^"]*sectionOpen[^"]*"/, `${lang} first section opens by default`)
}
for (const lang of ['de', 'en', 'fa']) assert.ok(fs.existsSync(`public/educational/demyelinisierende-muster/pattern-map-${lang}.svg`), `${lang} SVG exists`)
console.log('Demyelinating pattern route semantic SSR PASS: exact three curriculum links remain inProgress; no MOGAD ID; DE/EN/FA, RTL, localized concept media and feedback verified.')
