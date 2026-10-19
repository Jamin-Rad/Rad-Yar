import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { LUNG_RADS_LESSON as data } from '../data/lungRadsLesson.js'
import { CURRICULUM } from '../data/curriculum.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
let activeLanguage = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link, '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false }, './StandardLessonShell.module.css': styles,
})
const Page = compile('app/thorax/lung-rads/page.js', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/lungRadsLesson': { LUNG_RADS_LESSON: data }, './page.module.css': styles,
}).default
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language/direction`)
  assert.ok(html.includes(esc(data.title[lang])), `${lang}: title`)
  assert.ok(html.includes('src="/educational/lung-rads-category-map.svg"'), `${lang}: schematic`)
  assert.ok(html.includes(esc(data.alt[lang])) && html.includes(esc(data.visualNote[lang])), `${lang}: accessible visual disclosure`)
  for (const label of data.visualLegend) assert.ok(html.includes(esc(label[lang])), `${lang}: localized visual legend`)
  for (const chapter of data.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`) && html.includes(esc(chapter.title[lang])), `${lang}: chapter ${chapter.id}`)
    assert.ok(html.includes(esc(chapter.lead[lang])) && html.includes(esc(chapter.note[lang])), `${lang}: chapter prose`)
    for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(esc(cell[lang])), `${lang}: table cell`)
  }
  assert.ok(html.includes('/thorax/fleischner-kriterien'), `${lang}: contrast link to the existing incidental-nodule lesson`)
  assert.ok(html.includes('id="case"') && html.includes(esc(data.check.prompt[lang])), `${lang}: self-check`)
  assert.ok(data.check.correct[lang] && data.check.retry[lang], `${lang}: localized feedback`)
  for (const source of data.references) assert.ok(html.includes(esc(source.label[lang])), `${lang}: source label`)
  assert.ok(html.includes('id="lesson-sources-panel"'), `${lang}: sources panel`)
}
assert.ok(data.source.includes('Lung-RADS® v2022'))
assert.ok(data.source.includes('released November 2022'))
assert.match(data.notice.en, /cover Fleischner 2017, not Lung-RADS/)
assert.match(data.chapters.find(chapter => chapter.id === 'measure').rows[1][1].de, /höhere Größenschwelle erreicht/)
assert.match(data.chapters.find(chapter => chapter.id === 'measure').rows[0][1].en, /longest and perpendicular shortest diameters, rounded to 0\.1 mm/)
assert.match(data.chapters.find(chapter => chapter.id === 'measure').rows[3][1].en, /part of the category, not a modifier/)
assert.equal(data.references[0].url, 'https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/Lung-RADS/Lung-RADS-2022.pdf')
assert.match(data.chapters.find(chapter => chapter.id === 'contrast').note.fa, /ساب‌سالید \(شیشه‌مات و پارت‌سالید\)/)
assert.equal(data.check.answerIndex, 1)
assert.match(fs.readFileSync('app/thorax/lung-rads/page.js', 'utf8'), /setAnswer\(null\)/, 'incorrect answer has a retry action')
const svg = fs.readFileSync('public/educational/lung-rads-category-map.svg', 'utf8')
const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
assert.equal(doc.getElementsByTagName('parsererror').length, 0, 'SVG parses')
assert.doesNotMatch(svg, /additional suspicion|separate finding/, 'visible diagram labels are language-neutral')
assert.doesNotMatch(svg, /M185 91/, 'category 0 is not drawn as a progression step')
assert.match(svg, /4X is a distinct category and S is a modifier/)
assert.match(fs.readFileSync('public/educational/lung-rads-category-map.provenance.json', 'utf8'), /4X is a distinct category, not a modifier; S is a modifier/)
assert.ok(fs.existsSync('public/educational/lung-rads-category-map.provenance.json'))
const found = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (typeof value !== 'object') return; if (value.id === 'lung-rads') found.push(value); Object.values(value).forEach(visit) }
visit(CURRICULUM)
assert.equal(found.length, 1)
assert.equal(found[0].link, '/thorax/lung-rads')
assert.equal(found[0].inProgress, true)
assert.equal(found[0].updatedAt, '2026-10-19')
console.log('Lung-RADS actual-route StandardLessonShell SSR PASS: DE/EN/FA, RTL, localized category map, all source-linked chapters/tables, correct/retry self-check, exact curriculum link and inProgress.')
