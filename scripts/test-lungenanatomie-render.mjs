import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/lungenanatomie.js'

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
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
assert.match(curriculum, /id: 'lungenanatomie'[^\n]*link: '\/thorax\/anatomie\/lungenanatomie'/, 'curriculum entry links to the lesson route')
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.title[locale])))
  assert.ok(html.includes(`alt="${esc(data.LUNGENANATOMIE.alt[locale])}"`), `${locale} localized hero alt`)
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.lobuleLead[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.acinus[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.segmentLead[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.segmentVariant[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.segmentCT[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.segmentCheck.question[locale])))
  assert.ok(data.LUNGENANATOMIE.segmentRows.every(row => html.includes(esc(row.lobe[locale])) && html.includes(esc(row.segments[locale]))), `${locale} segment table and laterality`)
  assert.ok(data.LUNGENANATOMIE.segmentCheck.options.every(option => option[locale]))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.azygosLead[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.check.question[locale])))
  assert.ok(data.LUNGENANATOMIE.check.options.every(option => option[locale]))
  for (const chapter of data.LUNGENANATOMIE.chapters.filter(item => !item.emphasis)) {
    assert.ok(html.includes(`aria-label="${esc(data.LUNGENANATOMIE.labels.open[locale])}: ${esc(chapter.title[locale])}"`), `${locale} shell navigation label ${chapter.id}`)
  }
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.chapters.find(item => item.emphasis).title[locale])), `${locale} summary label`)
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.infracardiacCaption[locale])))
  assert.ok(html.includes(esc(data.LUNGENANATOMIE.superiorCaption[locale])))
  assert.equal((html.match(/aria-controls="(?:lobule|segments|interstitium|variants|azygos|takehome)-panel"/g) || []).length, 6, `${locale} chapter controls`)
  for (const asset of ['hero.svg', 'segments.svg', 'accessory-fissures.png', 'superior-fissure.png', 'azygos-variant.png', 'image-provenance.json']) assert.ok(fs.existsSync(`public/educational/lungenanatomie/${asset}`), `${asset} exists`)
}
const provenance = JSON.parse(fs.readFileSync('public/educational/lungenanatomie/image-provenance.json', 'utf8'))
assert.deepEqual(provenance.assets.filter(asset => asset.radiopaediaId).map(asset => asset.radiopaediaId).sort(), ['rID 13544', 'rID 23182', 'rID 34669'])
assert.ok(!JSON.stringify(data.LUNGENANATOMIE.takeHome).includes('resolution'))
for (const locale of ['de', 'en', 'fa']) {
  assert.equal(data.getLungenanatomieCheckFeedback(data.LUNGENANATOMIE.check.answer, locale), data.LUNGENANATOMIE.check.feedback[locale], `${locale} correct response`)
  assert.equal(data.getLungenanatomieCheckFeedback(1, locale), data.LUNGENANATOMIE.check.incorrectFeedback[locale], `${locale} incorrect response`)
  assert.notEqual(data.LUNGENANATOMIE.check.feedback[locale], data.LUNGENANATOMIE.check.incorrectFeedback[locale], `${locale} feedback distinguishes answer paths`)
  assert.equal(data.getLungenanatomieSegmentCheckFeedback(data.LUNGENANATOMIE.segmentCheck.answer, locale), data.LUNGENANATOMIE.segmentCheck.feedback[locale], `${locale} correct segment response`)
  assert.equal(data.getLungenanatomieSegmentCheckFeedback(1, locale), data.LUNGENANATOMIE.segmentCheck.incorrectFeedback[locale], `${locale} incorrect segment response`)
  assert.notEqual(data.LUNGENANATOMIE.segmentCheck.feedback[locale], data.LUNGENANATOMIE.segmentCheck.incorrectFeedback[locale], `${locale} segment feedback distinguishes answer paths`)
}
const lessonSource = fs.readFileSync('app/thorax/anatomie/lungenanatomie/page.jsx', 'utf8')
assert.ok(lessonSource.includes('10.1002/acm2.70193'), 'primary CT segment-boundary source is cited')
assert.ok(lessonSource.includes('PMC6039811'), 'anatomical segment terminology source is cited')
assert.ok(data.LUNGENANATOMIE.segmentRows.some(row => row.segments.de.includes('S7+8') && row.lobe.de.includes('Linker Unterlappen')), 'left S7+8 is mapped to the left lower lobe')
assert.ok(data.LUNGENANATOMIE.segmentRows.some(row => row.segments.de.includes('S4 superior-lingular') && row.segments.de.includes('S5 inferior-lingular')), 'lingular S4/S5 naming is explicit')
console.log('Lungenanatomie actual-route semantic SSR PASS: DE/EN/FA, RTL, six chapters, lobule/segments/interstitium, left basal and lingular nomenclature, CT boundary caveat, source crops, checks and localized data.')
