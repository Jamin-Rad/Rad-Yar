import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { PULMONARY_EDEMA_LESSON as data } from '../data/pulmonaryEdema.js'
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
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/thorax/lungenoedem/page.js', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/pulmonaryEdema': { PULMONARY_EDEMA_LESSON: data }, './page.module.css': styles,
}).default
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language/direction`)
  assert.ok(html.includes(esc(data.title[lang])), `${lang}: title`)
  assert.ok(html.includes('src="/educational/pulmonary-edema-patterns.svg"'), `${lang}: SVG`)
  assert.ok(html.includes(esc(data.alt[lang])) && html.includes(esc(data.visualNote[lang])), `${lang}: visual disclosure`)
  for (const label of data.visualLegend) assert.ok(html.includes(esc(label[lang])), `${lang}: localized schematic legend`)
  for (const chapter of data.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`) && html.includes(esc(chapter.title[lang])), `${lang}: chapter ${chapter.id}`)
    assert.ok(html.includes(esc(chapter.lead[lang])) && html.includes(esc(chapter.note[lang])), `${lang}: chapter prose`)
    for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(esc(cell[lang])), `${lang}: chapter row`)
  }
  assert.ok(html.includes('id="case"') && html.includes(esc(data.check.prompt[lang])), `${lang}: embedded self-check`)
  assert.ok(html.includes('id="lesson-sources-panel"'), `${lang}: sources`)
  for (const source of data.references.filter(item => item.url)) assert.ok(html.includes(esc(source.label[lang])), `${lang}: localized source label`)
  assert.ok(data.check.correct[lang] && data.check.retry[lang], `${lang}: localized correct/retry feedback is present in lesson data`)
}
assert.ok(data.source.includes('PDF S. 48–49'))
assert.equal(data.chapters[0].rows[0][0].de, '1 · Venöse Stauung', 'German label is not Persian')
assert.match(data.chapters[2].rows[0][1].de, /nur die Überschrift/)
assert.match(data.chapters[2].rows[0][1].en, /only the heading/)
assert.ok(!data.chapters[0].rows.flat().some(cell => /PCWP (13|18|25)/.test(cell.de || '')), 'avoid teaching PCWP bands as measurable radiographic criteria')
assert.equal(data.check.answerIndex, 1)
assert.match(fs.readFileSync('app/thorax/lungenoedem/page.js', 'utf8'), /setAnswer\(null\)/, 'wrong answer offers retry')
const svg = fs.readFileSync('public/educational/pulmonary-edema-patterns.svg', 'utf8')
assert.doesNotMatch(svg, /VASCULAR REDISTRIBUTION|INTERSTITIAL SIGNS|ALVEOLAR OPACITIES|Redistribution|Septal \/ peribronchial|Perihilar confluent/, 'language-neutral numbered figure; localized legend is adjacent')
const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
assert.equal(doc.getElementsByTagName('parsererror').length, 0, 'SVG parses')
const topics = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (typeof value !== 'object') return; if (value.id && ['lungenoedem','ards'].includes(value.id)) topics.push(value); Object.values(value).forEach(visit) }
visit(CURRICULUM)
for (const id of ['lungenoedem', 'ards']) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic, `${id}: curriculum entry`)
  assert.equal(topic.ready, true)
  assert.equal(topic.inProgress, true)
  assert.equal(topic.link, id === 'ards' ? '/thorax/lungenoedem#ards' : '/thorax/lungenoedem')
}
assert.ok(fs.existsSync('public/educational/pulmonary-edema-patterns.provenance.json'))
console.log('Pulmonary oedema actual-route StandardLessonShell SSR PASS: DE/EN/FA, RTL, PDF scope, every chapter/table cell, self-check feedback/retry, SVG/provenance, exact curriculum links and inProgress.')
