import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { FIRST_RIB_LESSON as data } from '../data/firstRibPseudoarticulation.js'
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
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ priority, fill, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link, '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false }, './StandardLessonShell.module.css': styles,
})
const Page = compile('app/thorax/rippenpathologien/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/firstRibPseudoarticulation': { FIRST_RIB_LESSON: data, L: (de, en, fa) => ({ de, en, fa }) }, './page.module.css': styles,
}).default
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(esc(data.title[locale])) && html.includes(esc(data.lead[locale])), `${locale}: title and teaching lead`)
  assert.ok(html.includes('src="/educational/first-rib-pseudoarticulation-p10.png"') && html.includes(esc(data.imageAlt[locale])) && html.includes(esc(data.imageCaption[locale])), `${locale}: source image, alt and provenance caption`)
  assert.match(data.imageAlt[locale], locale === 'de' ? /PA-Thoraxaufnahme/ : locale === 'en' ? /PA chest radiograph/ : /رادیوگرافی PA/, `${locale}: image alt is in the selected language`)
  for (const chapter of data.chapters) assert.ok(html.includes(`id="${chapter.id}"`) && html.includes(esc(chapter.title[locale])), `${locale}: chapter ${chapter.id}`)
  for (const step of data.nextSteps) assert.ok(html.includes(esc(step[locale])), `${locale}: localisation step`)
  for (const option of data.check.options) assert.ok(html.includes(esc(option[locale])), `${locale}: check option`)
  assert.ok(data.check.correct[locale] && data.check.retry[locale], `${locale}: feedback`)
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/7217428/'), `${locale}: bounded primary reference`)
  assert.ok(html.includes('/lernen/thorax?lang=fa') === (locale === 'fa'), `${locale}: localized thorax breadcrumb`)
}
assert.equal(data.check.answerIndex, 1)
assert.match(data.lead.fa, /مفصل کاذب \(پسودوآرتروز\)/)
assert.match(data.mechanism.fa, /مفصل کاذب \(پسودوآرتروز\)/)
assert.match(data.lead.en, /neither proves nor excludes/)
assert.match(data.nextSteps[2].en, /must not replace evaluation/)
const found = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (typeof value !== 'object') return; if (value.id === 'rippenpathologien') found.push(value); Object.values(value).forEach(visit) }
visit(CURRICULUM)
assert.equal(found.length, 1)
assert.equal(found[0].link, '/thorax/rippenpathologien')
assert.equal(found[0].inProgress, true)
assert.equal(found[0].updatedAt, '2026-10-19')
assert.ok(fs.statSync('public/educational/first-rib-pseudoarticulation-p10.png').size > 10000)
assert.match(fs.readFileSync('docs/lesson-quality/pdf-map-abdomen-thorax.md', 'utf8'), /pseudoarticulation دندهٔ اول[^\n]*`\/thorax\/rippenpathologien`/)
console.log('First-rib pseudoarticulation route SSR PASS: DE/EN/FA and RTL, PDF p.10 image/provenance, caveats, self-check feedback, exact inProgress curriculum route.')
