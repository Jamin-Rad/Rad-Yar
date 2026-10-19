import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/lungenanatomie.js'

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
  'next/link': Link, '@/components/LessonHero': Hero, '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false }, './StandardLessonShell.module.css': styles,
})
let lang = 'de'
const Page = compile('app/thorax/anatomie/lungenanatomie/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) }, '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/lungenanatomie': data, './page.module.css': styles,
}).default
const esc = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))
function assertLocalized(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${path}[${index}]`))
  if (value && typeof value === 'object') {
    if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) for (const key of ['de', 'en', 'fa']) assert.ok(typeof value[key] === 'string' && value[key].trim(), `${path}.${key} missing`)
    else for (const [key, child] of Object.entries(value)) assertLocalized(child, `${path}.${key}`)
  }
}

assertLocalized(data.LUNGENANATOMIE)
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.title[locale])))
  assert.ok(html.includes(`alt="${esc(data.LUNGENANATOMIE.alt[locale])}"`), `${locale} localized hero alt`)
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.lobuleLead[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.acinus[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.azygosLead[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.check.question[locale])))
  assert.ok(data.LUNGENANATOMIE.check.options.every(option => option[locale]))
  for (const chapter of data.LUNGENANATOMIE.chapters.filter(item => !item.emphasis)) {
    assert.ok(html.includes(`aria-label="${esc(data.LUNGENANATOMIE.labels.open[locale])}: ${esc(chapter.title[locale])}"`), `${locale} shell navigation label ${chapter.id}`)
  }
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.chapters.find(item => item.emphasis).title[locale])), `${locale} summary label`)
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.infracardiacCaption[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.superiorCaption[locale])))
  assert.equal((html.match(/aria-controls="(?:lobule|interstitium|variants|azygos|takehome)-panel"/g) || []).length, 5, `${locale} chapter controls`)
  for (const asset of ['hero.svg', 'accessory-fissures.png', 'superior-fissure.png', 'azygos-variant.png', 'image-provenance.json']) assert.ok(fs.existsSync(`public/educational/lungenanatomie/${asset}`), `${asset} exists`)
}
const provenance = JSON.parse(fs.readFileSync('public/educational/lungenanatomie/image-provenance.json', 'utf8'))
assert.deepEqual(provenance.assets.filter(asset => asset.radiopaediaId).map(asset => asset.radiopaediaId).sort(), ['rID 13544', 'rID 23182', 'rID 34669'])
assert.ok(!JSON.stringify(data.LUNGENANATOMIE.takeHome).includes('resolution'))
for (const locale of ['de', 'en', 'fa']) {
  assert.equal(data.getLungenanatomieCheckFeedback(data.LUNGENANATOMIE.check.answer, locale), data.LUNGENANATOMIE.check.feedback[locale], `${locale} correct response`)
  assert.equal(data.getLungenanatomieCheckFeedback(1, locale), data.LUNGENANATOMIE.check.incorrectFeedback[locale], `${locale} incorrect response`)
  assert.notEqual(data.LUNGENANATOMIE.check.feedback[locale], data.LUNGENANATOMIE.check.incorrectFeedback[locale], `${locale} feedback distinguishes answer paths`)
}
console.log('Lungenanatomie actual-route semantic SSR PASS: DE/EN/FA, RTL, five chapters, lobule/acinus/interstitium, source crops, azygos check and localized data.')
