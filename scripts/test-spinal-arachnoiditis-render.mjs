import * as spinePracticeLinks from '../data/spinePracticeLinks.js'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { SPINALE_ARACHNOIDITIS_LESSON as data } from '../data/spinaleArachnoiditisLesson.js'

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
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/wirbelsaeule/arachnoiditis/page.jsx', {
  '@/data/spinePracticeLinks': spinePracticeLinks,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/spinaleArachnoiditisLesson': { SPINALE_ARACHNOIDITIS_LESSON: data },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
assert.equal(data.id, 'spinale-arachnoiditis')
assert.equal(data.sections.length, 3)
assert.equal(data.sections[0].rows.length, 3)
assert.equal(data.sections[1].rows.length, 2)
assert.equal(data.sections[2].rows.length, 4)
assert.equal(data.check.answerIndex, 0)
assert.match(data.sections[0].note.en, /not reliable severity grades/)
assert.match(data.sections[1].note.en, /historical and rarely used/)
assert.match(data.sections[2].rows[3][1].en, /mimic clumping/)
assert.match(data.context.de, /Cauda-equina-Syndrom/)
assert.match(data.context.en, /cauda equina syndrome/)
assert.match(data.context.fa, /سندرم کودا اکوئینا/)
const provenance = JSON.parse(fs.readFileSync('public/educational/arachnoiditis-pdf-case-p17.provenance.json', 'utf8'))
assert.equal(provenance.physical_pdf_page, 17)
assert.equal(provenance.source_identifier_visible_on_page, 'rID:14055')
assert.match(provenance.external_license, /not established/i)
assert.ok(fs.existsSync('public/educational/arachnoiditis-pdf-case-p17.png'))
const svg = fs.readFileSync('public/educational/spinal-arachnoiditis-patterns.svg', 'utf8')
assert.match(svg, /non-diagnostic/i)
assert.doesNotMatch(svg, /<text[^>]*>SCHEMATIC<\/text>/i)
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(escape(data.title[locale])), `${locale}: title`)
  assert.ok(html.includes(escape(data.alt[locale])) && html.includes('/educational/spinal-arachnoiditis-patterns.svg'), `${locale}: hero visual and alt`)
  assert.ok(html.includes('id="start"') && html.includes(escape(data.intro.title[locale])) && html.includes(escape(data.intro.text[locale])), `${locale}: opening chapter`)
  assert.ok(html.includes(escape(data.context[locale])), `${locale}: context note`)
  for (const section of data.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])), `${locale}: chapter ${section.id}`)
    assert.ok(html.includes(escape(section.lead[locale])), `${locale}: chapter lead ${section.id}`)
    for (const row of section.rows) for (const cell of row) assert.ok(html.includes(escape(cell[locale])), `${locale}: table cell ${section.id}`)
    if (section.note) assert.ok(html.includes(escape(section.note[locale])), `${locale}: note ${section.id}`)
  }
  assert.ok(html.includes('src="/educational/arachnoiditis-pdf-case-p17.png"'), `${locale}: PDF case image`)
  assert.ok(html.includes(escape(data.sections[1].image.caption[locale])), `${locale}: PDF case provenance caption`)
  assert.ok(html.includes(escape(data.check.prompt[locale])), `${locale}: self-check prompt`)
  assert.ok(data.check.feedback[locale], `${locale}: self-check feedback translation exists`)
  assert.ok(html.includes(escape(data.sourceNote[locale])), `${locale}: source limits`)
  for (const ref of data.references) if (ref.href) assert.ok(html.includes(escape(ref.title[locale])), `${locale}: reference title`)
}
assert.match(fs.readFileSync('app/wirbelsaeule/arachnoiditis/page.jsx', 'utf8'), /lesson\.check\.feedback/, 'self-check renders explanatory answer feedback after selection')
console.log('Spinal arachnoiditis StandardLessonShell SSR PASS: DE/EN/FA, RTL, source scope, three morphologic patterns, historical myelography label, differentials, case/provenance, references and retrieval feedback.')
