import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { MSK_MORBUS_PAGET_LESSON as lesson } from '../data/mskMorbusPagetLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compileExports(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const Shell = compileExports('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compileExports('app/msk/knochenstoffwechsel/morbus-paget/page.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/mskMorbusPagetLesson': { MSK_MORBUS_PAGET_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(lang => Object.hasOwn(value, lang))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${key}.${lang} missing`)
    return
  }
  for (const [name, child] of Object.entries(value)) assertLocalized(child, `${key}.${name}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'morbus-paget')
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language/direction`)
  assert.ok(html.includes(locale === 'en' ? 'Paget' : lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes('/educational/morbus-paget/hero.svg'), `${locale} topic schematic`)
  assert.ok(html.includes(lesson.check.question[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} check`)
  assert.ok(html.includes(lesson.notice[locale]), `${locale} source scope`)
  for (const id of ['pattern', 'imaging', 'context', 'check', 'take-home']) assert.ok(html.includes(`id="${id}"`), `${locale} section ${id}`)
}
assert.ok(fs.existsSync('public/educational/morbus-paget/hero.svg'), 'hero asset exists')
assert.ok(fs.readFileSync('public/educational/morbus-paget/hero.svg', 'utf8').includes('<svg'), 'hero is an SVG')
console.log('MSK Morbus Paget bounded route SSR PASS: DE/EN/FA, RTL, shell, source boundary, schematic and retrieval item verified. Browser, clinical and independent review remain open.')
