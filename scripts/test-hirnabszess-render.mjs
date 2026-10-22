import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { HIRNABZESS_COPY, HIRNABZESS_ID, HIRNABZESS_SECTIONS, HIRNABZESS_SOURCES } from '../data/gehirnHirnabszessLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
const Link = ({ children, ...props }) => React.createElement('a', props, children)
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports.default
}
const Shell = ({ children, lang, title }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr' }, React.createElement('h1', null, title), children)
const LessonSection = ({ children, title }) => React.createElement('section', null, React.createElement('h2', null, title), children)
const LessonSources = () => null
const TakeHomeList = ({ items }) => React.createElement('ul', null, ...items.map(item => React.createElement('li', { key: item.title }, item.title)))
const Page = compile('app/gehirn/infektionen/hirnabszess/page.jsx', {
  'next/link': Link,
  '@/components/lesson-template/StandardLessonShell': { __esModule: true, default: Shell, LessonSection, LessonSources, TakeHomeList },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/gehirnHirnabszessLesson': { HIRNABZESS_COPY, HIRNABZESS_ID, HIRNABZESS_SECTIONS, HIRNABZESS_SOURCES },
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

assertLocalized(HIRNABZESS_COPY)
assertLocalized(HIRNABZESS_SECTIONS)
assertLocalized(HIRNABZESS_SOURCES)
assert.equal(HIRNABZESS_COPY.sequence[0].title.de, '1 · Zentrum', 'German sequence heading must be German')
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} direction`)
  assert.ok(html.includes(HIRNABZESS_COPY.title[lang]), `${lang} page title`)
  assert.ok(html.includes(HIRNABZESS_COPY.sequence[0].title[lang]), `${lang} first sequence heading`)
  assert.ok(html.includes('Radiopaedia case') || html.includes('Radiopaedia-Fall') || lang === 'fa', `${lang} case reference`)
  assert.ok(html.includes('/educational/hirnabszess/radiopaedia-dual-rim-luu-hanh.jpeg'), `${lang} embedded source case image`)
  assert.ok(html.includes(HIRNABZESS_COPY.caseFigureAlt[lang]) && html.includes(HIRNABZESS_COPY.caseFigureCaption[lang]), `${lang} case image alt and caption`)
  assert.ok(html.includes('/educational/hirnabszess/hero.svg'), `${lang} concept image`)
  assert.ok(html.includes('not a diagnostic MRI') || html.includes('kein diagnostisches MRT') || html.includes('تصویر تشخیصی MRI نیست'), `${lang} schematic limitation`)
}
assert.ok(fs.existsSync('public/educational/hirnabszess/hero.svg'))
assert.ok(fs.existsSync('public/educational/hirnabszess/radiopaedia-dual-rim-luu-hanh.jpeg'))
console.log('Brain abscess route semantic SSR PASS: DE/EN/FA, localized headings, RTL, attributed Radiopaedia case image, explicit sequence limitation and non-diagnostic schematic boundary.')
