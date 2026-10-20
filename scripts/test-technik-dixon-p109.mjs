import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { CURRICULUM } from '../data/curriculum.js'

const require = createRequire(import.meta.url)
const langState = { lang: 'de' }
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const t = value => typeof value === 'string' ? value : value?.[langState.lang] || value?.de || ''
const StandardLessonShell = ({ lang, title, children, sources }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr' }, React.createElement('h1', null, title), children, sources)
const LessonSection = ({ id, title, children }) => React.createElement('section', { id }, React.createElement('h2', null, title), children)
const LessonSources = ({ items }) => React.createElement('aside', null, ...(items || []).map(item => React.createElement('a', { key: item.href, href: item.href }, item.title)))
Object.assign(StandardLessonShell, { LessonSection, LessonSources })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Page = compile('app/technik/grundlagen/StandardPage.jsx', {
  '@/components/Footer': () => React.createElement('footer'),
  '@/components/InProgressBanner': () => null,
  '@/components/lesson-template/StandardLessonShell': StandardLessonShell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: langState.lang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': styles,
}).default

const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'mrt')
assert.ok(section)
assert.ok(section.pages.includes('109'))
assert.ok(section.curriculumId.includes('mrt-fettsuppression'))
const dixonRow = section.rows.find(row => row[0].de === 'Dixon und Opposed-Phase')
assert.ok(dixonRow)
assert.match(dixonRow[1].de, /linken Nebenniere/)
assert.match(dixonRow[1].de, /kein allgemeiner Adenomnachweis/)
assert.match(dixonRow[1].en, /left adrenal lesion/)
assert.match(dixonRow[1].fa, /آدرنال چپ/)
assert.equal(section.visuals.length, 2)
const [fatWater, adrenal] = section.visuals
for (const visual of section.visuals) {
  assert.ok(fs.existsSync(`public${visual.src}`), `${visual.src} exists`)
  for (const locale of ['de', 'en', 'fa']) {
    assert.match(visual.caption[locale], /109|۱۰۹/)
    assert.match(visual.caption[locale], /108|۱۰۸/)
  }
}
assert.match(fatWater.caption.de, /Fat-only.*Water-only/)
assert.match(adrenal.alt.de, /linken Nebenniere/)
assert.match(adrenal.caption.en, /compatible with an adrenal adenoma/)
assert.ok(section.references.some(ref => ref.href.includes('10.1148/radiol.250374')))
assert.ok(section.references.some(ref => ref.href.includes('10.1148/rg.2016150139')))

const curriculum = CURRICULUM.flatMap(group => group.kapitel || []).flatMap(chapter => chapter.themen || [])
const fatSuppression = curriculum.find(item => item.id === 'mrt-fettsuppression')
assert.equal(fatSuppression?.link, '/technik/grundlagen#mrt')
assert.equal(fatSuppression?.inProgress, true)

for (const locale of ['de', 'en', 'fa']) {
  langState.lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: direction`)
  assert.ok(html.includes(section.title[locale]), `${locale}: section title`)
  assert.ok(html.includes(dixonRow[1][locale]), `${locale}: Dixon teaching row`)
  for (const visual of section.visuals) {
    assert.ok(html.includes(visual.src), `${locale}: image source`)
    assert.ok(html.includes(visual.alt[locale]), `${locale}: localized alt`)
    assert.ok(html.includes(visual.caption[locale]), `${locale}: localized source caption`)
  }
  assert.ok(html.includes('Self-check: what does the Dixon figure show?') || locale !== 'en')
  if (locale === 'de') assert.ok(html.includes('Selbstcheck: Was zeigt die Dixon-Abbildung?'))
  if (locale === 'fa') assert.ok(html.includes('خودآزمایی: تصویر Dixon چه چیزی را نشان می‌دهد؟'))
  assert.ok(html.includes('Any out-of-phase signal drop proves an adenoma') || locale !== 'en')
  if (locale === 'de') assert.ok(html.includes('kein allgemeiner Adenomnachweis'))
  if (locale === 'fa') assert.ok(html.includes('به‌تنهایی آدنوم را ثابت نمی‌کند'))
}

console.log('Technik.pdf p.109 Dixon addendum SSR PASS: exact source crops, DE/EN/FA + RTL, guarded adrenal interpretation, and existing curriculum mapping.')
