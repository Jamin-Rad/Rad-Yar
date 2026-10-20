import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const langs = ['de', 'en', 'fa']
const lesson = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrcp-protokoll')
assert.ok(lesson, 'MRCP section must exist')
assert.equal(lesson.curriculumId, 'mrcp-protokoll')
assert.equal(lesson.pages, '117 (printed p. 116)')
assert.equal(lesson.rows.length, 5)
assert.deepEqual(lesson.references.map(reference => new URL(reference.href).hostname), [
  'pmc.ncbi.nlm.nih.gov', 'pmc.ncbi.nlm.nih.gov', 'pubs.rsna.org',
])
assert.ok(lesson.references.some(reference => reference.citation.en.includes('2009;9(3):341–352')))
assert.ok(lesson.references.some(reference => reference.citation.en.includes('2012;3(1):11–21')))
assert.ok(lesson.references.some(reference => reference.citation.en.includes('2024;44(8):e230174')))
assert.equal(lesson.visuals.length, 1)
assert.equal(lesson.visuals[0].src, '/technik/mrcp-workflow.svg')
assert.ok(fs.existsSync(`public${lesson.visuals[0].src}`))

function inspect(value, path = 'mrcp') {
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) {
      assert.equal(typeof value[lang], 'string', `${path}.${lang}`)
      assert.ok(value[lang].trim(), `${path}.${lang} must not be empty`)
      if (lang !== 'fa') assert.ok(!/[\u0600-\u06ff]/u.test(value[lang]), `${path}.${lang} contains Persian script`)
    }
    return
  }
  for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`)
}
inspect(lesson)
const sourceText = [lesson.lead.de, ...lesson.rows.flat().map(cell => cell.de)].join(' ')
for (const phrase of [
  'stark T2-gewichteten', 'HASTE', 'MPR', 'MIP', 'Partialvolumen', 'dünnschichtigen Quellbilder', 'Fruchtsaft',
]) assert.ok(sourceText.includes(phrase), `source point missing: ${phrase}`)
assert.match(lesson.rows[4][1].en, /optional practice at some centres, not a universal routine/)
assert.match(lesson.rows[3][1].fa, /MIP به‌تنهایی کافی نیست/)

const specialty = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt-spezial')
assert.match(specialty.rows.find(row => row[0].de === 'CINE und BOLD')[1].de, /CINE.*Herz|Herz.*CINE|CINE.*Auswurffraktion/)

const require = createRequire(import.meta.url)
let activeLang = 'de'
const styles = new Proxy({}, { get: (_, key) => String(key) })
function compileJsx(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const shell = compileJsx('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageAlt }) => React.createElement('div', null, React.createElement('h1', null, title), React.createElement('img', { alt: imageAlt })) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
const Page = compileJsx('app/technik/grundlagen/StandardPage.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside', null, 'in progress') },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}).default

const check = {
  de: ['Selbstcheck: MIP und Quellbilder', 'Dünnschichtige Quellbilder und passende T2-Bilder zusätzlich prüfen.'],
  en: ['Self-check: MIP and source images', 'Also review thin-section source images and the relevant T2 images.'],
  fa: ['خودآزمایی: MIP و تصاویر منبع', 'تصاویر منبع با برش نازک و تصاویر مناسب T2 را هم بررسی کنید.'],
}
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('id="mrcp-protokoll"'))
  assert.ok(html.includes(lesson.title[lang]))
  assert.ok(html.includes(lesson.lead[lang]))
  assert.ok(html.includes(lesson.visuals[0].alt[lang]))
  assert.ok(html.includes(lesson.visuals[0].caption[lang]))
  assert.ok(html.includes(check[lang][0]) && html.includes(check[lang][1]))
  assert.ok(html.includes('role="status"') === false, 'answer feedback should appear after an answer')
  for (const reference of lesson.references) assert.ok(html.includes(reference.href))
}

const routeSource = fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8')
assert.match(routeSource, /section\.id === 'mrcp-protokoll' \? <RetrievalCheck kind="mrcp" lang=\{lang\}\/> : null/)
assert.match(routeSource, /answer === copy\.answer \? copy\.correct : copy\.retry/)
assert.match(routeSource, /mrcp:\s*\{[\s\S]*?de:\s*\{[\s\S]*?en:\s*\{[\s\S]*?fa:\s*\{/);

const svg = fs.readFileSync(`public${lesson.visuals[0].src}`, 'utf8')
assert.match(svg, /<svg[^>]+viewBox="0 0 1200 360"/)
assert.match(svg, /MPR \/ MIP/)
assert.doesNotMatch(svg, /SRC/, 'final source-image step has no untranslated acronym')
assert.doesNotMatch(svg, /fluid bright|volume data|overview|thin images/i, 'SVG has no untranslated explanatory labels')
const ledger = fs.readFileSync('docs/lesson-quality/mrcp-protokoll-technik-p117.md', 'utf8')
for (const id of ['MRCP-SRC-01', 'MRCP-SRC-02', 'MRCP-SRC-03', 'MRCP-SRC-04', 'MRCP-SRC-05', 'MRCP-SRC-06']) assert.ok(ledger.includes(id))

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'mrcp-protokoll',[^\n]*link: '\/technik\/grundlagen#mrcp-protokoll',[^\n]*inProgress: true/)
console.log('MRCP p.117: exact section, linked curriculum entry, source ledger, workflow diagram and DE/EN/FA+RTL shared-shell SSR passed.')
