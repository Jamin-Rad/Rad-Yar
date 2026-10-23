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
assert.deepEqual(HIRNABZESS_COPY.visualLegend.map(item => item.de), [
  'Verteilung und Lokalisation der Läsion',
  'Zentrum: DWI und ADC',
  'Kapsel und Rand',
  'Perifokales Ödem',
  'Klinischer Kontext und mögliche Infektionsquelle',
], 'German concept legend must use German wording')
assert.deepEqual(HIRNABZESS_COPY.visualLegend.map(item => item.fa), [
  'توزیع و محل ضایعه',
  'مرکز: DWI و ADC',
  'کپسول و حاشیه',
  'ادم اطراف ضایعه',
  'زمینهٔ بالینی و منبع احتمالی',
], 'Persian concept legend must use Persian wording')
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} direction`)
  assert.ok(html.includes(HIRNABZESS_COPY.title[lang]), `${lang} page title`)
  assert.ok(html.includes(HIRNABZESS_COPY.sequence[0].title[lang]), `${lang} first sequence heading`)
  assert.ok(html.includes('radiopaedia.org/cases/brain-abscess-with-dual-rim-sign-1'), `${lang} links to sequence-verifiable source case`)
  const sequenceDisclosure = {
    de: 'weil seine Sequenz anhand der Quelle nicht verifiziert werden konnte',
    en: 'because its sequence could not be verified from the source',
    fa: 'چون توالی آن از منبع قابل تأیید نبود',
  }
  assert.ok(html.includes(sequenceDisclosure[lang]), `${lang} explains why no standalone frame is embedded in the active language`)
  assert.ok(html.includes('/educational/hirnabszess/hero.svg'), `${lang} concept image`)
  assert.ok(html.includes(HIRNABZESS_COPY.heroAlt[lang]), `${lang} concept image has localized, non-diagnostic alt text`)
  for (const [index, item] of HIRNABZESS_COPY.visualLegend.entries()) {
    assert.ok(html.includes(item[lang]), `${lang} concept legend item ${index + 1} is localized`)
  }
}
assert.ok(fs.existsSync('public/educational/hirnabszess/hero.svg'))
assert.ok(!fs.existsSync('public/educational/hirnabszess/radiopaedia-dual-rim-luu-hanh.jpeg'))
console.log('Brain abscess route semantic SSR PASS: DE/EN/FA, localized headings, RTL, linked Radiopaedia case, explicit image-sequence limitation and non-diagnostic schematic boundary.')
