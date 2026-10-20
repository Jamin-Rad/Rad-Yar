import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { TIBIAKOPFFRAKTUR_LESSON as lesson } from '../data/tibiakopffraktur.js'

const route = 'app/msk/trauma/tibiakopffraktur/page.jsx'
assert.equal(lesson.id, 'tibiakopffraktur')
assert.equal(lesson.sections.length, 2)
assert.equal(lesson.sections[0].rows.length, 6)
assert.equal(lesson.sections[1].answer, 1)
assert.equal(lesson.sections[1].options.length, 4)
for (const asset of [lesson.hero, ...lesson.sections.filter(section => section.image).map(section => section.image)]) assert.ok(fs.existsSync(`public${asset}`), asset)
assert.match(lesson.sections[1].paragraphs[0].en, /percentages.*not treated as universal frequencies/i)
assert.match(lesson.sections[1].paragraphs[1].en, /combination varies/i)
assert.match(lesson.sections[0].paragraphs[1].en, /not adopted here as a current universal/i)
assert.ok(lesson.references.some(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/24395399/'))
const peltola = lesson.references.find(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/24395399/')
assert.match(peltola.citation, /The reverse Segond fracture: not associated with knee dislocation.*Emerg Radiol\. 2014;21\(3\):245–249.*PMID:24395399/)
const yeo = lesson.references.find(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/36312215/')
assert.ok(yeo, '2022 Segond source links to the independently verified Yeo paper')
assert.match(yeo.citation, /Yeo .*Anterior cruciate ligament rupture and associated Segond fracture.*2022.*PMID:36312215/)
assert.ok(!lesson.references.some(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/35209895/'), 'remove mismatched PMID')
const localized = value => {
  if (!value || typeof value !== 'object') return
  if (typeof value.de === 'string' && typeof value.en === 'string' && typeof value.fa === 'string') {
    const arabicPersian = /[\u0600-\u06FF]/u
    assert.ok(!arabicPersian.test(value.de), `Persian/Arabic script in German field: ${value.de}`)
    assert.ok(!arabicPersian.test(value.en), `Persian/Arabic script in English field: ${value.en}`)
  }
  for (const child of Object.values(value)) localized(child)
}
localized(lesson)

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile(route, {
  'next/image': props => React.createElement('img', props),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/tibiakopffraktur': { TIBIAKOPFFRAKTUR_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])))
    for (const paragraph of section.paragraphs || []) assert.ok(html.includes(escape(paragraph[locale])))
    for (const row of section.rows || []) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
    if (section.image) assert.ok(html.includes(section.image) && html.includes(escape(section.imageAlt[locale])) && html.includes(escape(section.imageCaption[locale])))
  }
  const check = lesson.sections[1]
  assert.ok(html.includes(escape(check.task[locale])))
  assert.ok(check.options.every(option => option[locale]), `${locale}: options translated`)
  assert.ok(check.feedback.every(item => item[locale]), `${locale}: feedback translated`)
  assert.ok(html.includes(escape(check.note[locale])))
  assert.ok(lesson.summary.every(rule => rule[locale]))
  assert.ok(lesson.references.every(ref => typeof ref.citation === 'string' || ref.citation[locale]))
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
const ledger = fs.readFileSync('docs/lesson-quality/tibiakopffraktur-msk-p32-p33.md', 'utf8')
for (const id of ['TPF-32-01','TPF-32-02','TPF-32-03','TPF-32-04','TPF-32-05','TPF-32-06','TPF-32-07','TPF-33-01','TPF-33-02','TPF-33-03']) assert.ok(ledger.includes(id))
const provenance = fs.readFileSync('docs/lesson-quality/media-provenance.md', 'utf8')
for (const detail of ['Image375.jpg', 'Image382.jpg', 'rID:9758', 'physical page 32', 'physical page 33', 'not asserted']) assert.ok(provenance.includes(detail))
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'tibiakopffraktur',[^\n]*link: '\/msk\/trauma\/tibiakopffraktur',[^\n]*inProgress: true/)
console.log('Tibial plateau lesson: SSR/content parity PASS for DE/EN/FA, RTL, Schatzker I–VI, source images/captions, qualified avulsion associations and inline retrieval feedback.')
