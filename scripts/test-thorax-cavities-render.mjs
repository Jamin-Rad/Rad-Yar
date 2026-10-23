import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { THORAX_CAVITIES as data } from '../data/thoraxCavities.js'
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
const Page = compile('app/thorax/kavitaeten/page.js', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/thoraxCavities': { THORAX_CAVITIES: data }, '../lungenoedem/page.module.css': styles,
  './page.module.css': styles,
}).default
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language/direction`)
  assert.ok(html.includes(esc(data.title[lang])), `${lang}: title`)
  assert.ok(html.includes(`src="${data.heroImage}"`) && html.includes(esc(data.alt[lang])), `${lang}: educational SVG and accessible disclosure`)
  assert.ok(html.includes(`topography-title-${lang}`) && html.includes(esc(lang === 'de' ? 'Schematische Orientierung · keine diagnostische CT' : lang === 'en' ? 'Schematic orientation · not diagnostic CT' : 'نمای شماتیک · CT تشخیصی نیست')), `${lang}: localized, non-diagnostic topography schematic`)
  const diagramDescription = lang === 'de' ? 'Schematische Lungenansichten' : lang === 'en' ? 'Schematic lung views' : 'نمای شماتیک ریه'
  assert.ok(html.includes(esc(diagramDescription)) && !/basal|قاعده‌ای/.test(html), `${lang}: schematic avoids unsupported basal distribution`)
  assert.ok(html.includes(`src="${data.caseImage}"`) && html.includes(esc(data.caseImageAlt[lang])) && html.includes(esc(data.caseImageCaption[lang])), `${lang}: source CT, alt and case attribution`)
  for (const chapter of data.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`) && html.includes(esc(chapter.title[lang])), `${lang}: chapter ${chapter.id}`)
    assert.ok(html.includes(esc(chapter.lead[lang])) && html.includes(esc(chapter.note[lang])), `${lang}: chapter prose and note`)
    for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(esc(cell[lang])), `${lang}: table cell`)
  }
  for (const expectedLabel of [lang === 'de' ? 'Oberlappen' : lang === 'en' ? 'Upper lobe' : 'لوب فوقانی', lang === 'de' ? 'Periphere Noduli' : lang === 'en' ? 'Peripheral nodules' : 'ندول‌های محیطی', lang === 'de' ? 'Multiple kavitäre Noduli' : lang === 'en' ? 'Multiple cavitary nodules' : 'ندول‌های کاویتاری متعدد']) assert.ok(data.chapters.flatMap(chapter => chapter.rows).some(([label]) => label[lang] === expectedLabel), `${lang}: concise PDF p.25 topography row ${expectedLabel}`)
  const carcinoma = data.chapters.flatMap(chapter => chapter.rows).find(([label]) => label[lang] === (lang === 'de' ? 'Kavitierendes Karzinom' : lang === 'en' ? 'Cavitating carcinoma' : 'کارسینوم کاویتاری'))
  assert.ok(carcinoma, `${lang}: cavitating carcinoma comparison row`)
  const eccentricCue = lang === 'de' ? 'exzentrisch' : lang === 'en' ? 'eccentric' : 'خارج‌مرکزی'
  assert.ok(carcinoma[1][lang].includes(eccentricCue), `${lang}: PDF p.26 eccentric cavity cue`)
  assert.ok(!/häufigstes|most frequent|شایع‌ترین/i.test(carcinoma[1][lang]), `${lang}: defer PDF prevalence claim`)
  assert.ok(html.includes('id="check"') && html.includes(esc(data.check.prompt[lang])) && html.includes(esc(data.locationCheck.prompt[lang])), `${lang}: aspergilloma and topography self-checks`)
  for (const source of data.references) assert.ok(html.includes(esc(source.label[lang])), `${lang}: source ${source.id}`)
  for (const id of ['septic-embolism-cohort', 'gpa-cavitary-cohort', 'klebs-necrosis-study', 'cavitary-infarct-review', 'multiple-cavities-cohort']) assert.ok(html.includes(esc(data.references.find(source => source.id === id).label[lang])), `${lang}: verified location-differential source ${id}`)
  assert.ok(html.includes('rID 97293') && html.includes('rID 30280'), `${lang}: attributed Radiopaedia cases`)
  assert.ok(data.check.correct[lang] && data.check.retry[lang], `${lang}: localized feedback`)
}
assert.ok(!data.references.some(item => item.id.includes('case') && item.embeddedImage), 'case image is not claimed as embedded')
assert.match(data.notice.fa, /به‌تنهایی علت یا فعال‌بودن بیماری را ثابت نمی‌کند/)
assert.equal(data.check.answerIndex, 0)
assert.equal(data.locationCheck.answerIndex, 0)
assert.match(fs.readFileSync('app/thorax/kavitaeten/page.js', 'utf8'), /setAnswer\(null\)/, 'wrong answer can be retried')
assert.match(fs.readFileSync('docs/lesson-quality/thorax-cavities-pdf-review.md', 'utf8'), /Thorax\.pdf p\. 25/)
const provenance = JSON.parse(fs.readFileSync('public/educational/thorax-cavities.provenance.json', 'utf8'))
assert.equal(provenance.source_case_credit, 'Visible identifier: rID 16033; site and contributor not independently verified')
assert.match(data.caseImageAlt.de, /sichtbare Kennung rID 16033/)
const cavityRoute = lang => lang === 'de' ? '/thorax/kavitaeten' : `/thorax/kavitaeten?lang=${lang}`
for (const lang of ['de','en','fa']) {
  const suffix = lang === 'de' ? '' : `?lang=${lang}`
  const expectedLabel = lang === 'fa' ? 'درس متمرکز کاویتی' : lang === 'en' ? 'Focused cavity lesson' : 'Fokussierte Kavitäten-Lektion'
  for (const file of ['app/thorax/tuberkulose-muster/page.js','app/thorax/pneumonie-muster/page.js']) {
    const source = fs.readFileSync(file,'utf8')
    assert.ok(source.includes(`'/thorax/kavitaeten${suffix}'`) || source.includes('`/thorax/kavitaeten?lang=${lang}`'), `${lang}: related route preserves language`)
    assert.ok(source.includes(expectedLabel), `${lang}: localized related label is available`)
  }
}
assert.ok(cavityRoute('fa').endsWith('?lang=fa'))
assert.match(provenance.transformation, /crop/i)
assert.ok(fs.existsSync(`public${data.caseImage}`), 'source CT image exists')
const svg = fs.readFileSync('public/educational/thorax-cavity-vs-cyst.svg', 'utf8')
const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
assert.equal(doc.getElementsByTagName('parsererror').length, 0, 'SVG parses')
assert.match(svg, /not a CT image/i)
const topics = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (typeof value !== 'object') return; if (['lungenabszess','tuberkulose','aspergillus-lunge'].includes(value.id)) topics.push(value); Object.values(value).forEach(visit) }
visit(CURRICULUM)
for (const id of ['lungenabszess','tuberkulose','aspergillus-lunge']) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic, `${id}: curriculum entry`)
  const expectedRoute = id === 'lungenabszess' ? '/thorax/kavitaeten' : id === 'tuberkulose' ? '/thorax/tuberkulose-muster' : '/thorax/pneumonie-muster'
  assert.equal(topic.link, expectedRoute, `${id}: preserve canonical route`)
  if (id !== 'lungenabszess') assert.equal(topic.relatedLink, '/thorax/kavitaeten', `${id}: related cavity lesson`)
}
console.log('Pulmonary cavities actual-route StandardLessonShell SSR PASS: DE/EN/FA, RTL, source scope, chapters/tables, self-check retry, SVG disclosure, case IDs, and canonical/related curriculum routes.')
