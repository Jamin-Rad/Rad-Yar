import * as spinePracticeLinks from '../data/spinePracticeLinks.js'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { GUILLAIN_BARRE_SPINE_LESSON as data } from '../data/guillainBarreSpineLesson.js'

const langs = ['de', 'en', 'fa']
const route = 'app/wirbelsaeule/entzuendlich/guillain-barre-syndrom/page.jsx'
assert.equal(data.id, 'guillain-barre-syndrom')
assert.equal(data.sections.length, 3)
assert.equal(data.sections[0].rows.length, 2)
assert.equal(data.sections[1].rows.length, 2)
assert.equal(data.sections[2].rows.length, 2)
assert.equal(data.check.answerIndex, 1)
assert.match(data.check.options[2].en, /unremarkable MRI proves there is no relevant neurologic cause/i)
assert.equal(data.references.length, 3)
assert.ok(data.references.some(ref => ref.href === 'https://doi.org/10.1111/ene.16073'))
assert.ok(data.references.some(ref => ref.href === 'https://doi.org/10.1148/radiology.208.1.9646804'))
assert.ok(fs.existsSync(`public${data.hero}`))

for (const locale of langs) {
  assert.ok(data.title[locale] && data.alt[locale] && data.intro.title[locale] && data.intro.text[locale])
  assert.match(data.sections[0].rows[0][1][locale], /MRI|MRT|MRI/)
  assert.ok(locale === 'de' ? /nicht spezifisch/.test(data.sections[1].rows[0][1][locale]) : locale === 'en' ? /neither specific nor pathognomonic/.test(data.sections[1].rows[0][1][locale]) : /اختصاصی یا پاتوگنومونیک نیست/.test(data.sections[1].rows[0][1][locale]), `${locale}: enhancement is not definitive`)
  assert.ok(data.sections[2].rows[1][1][locale], `${locale}: normal MRI limitation`)
  assert.ok(data.check.feedback[locale] && data.scope[locale] && data.summary.every(item => item[locale]))
}
assert.match(data.sections[0].rows[0][1].en, /advises against.*routine/i)
assert.match(data.sections[1].rows[0][1].en, /neither specific nor pathognomonic/i)
assert.match(data.sections[2].rows[1][1].en, /does not exclude GBS/i)
assert.match(data.sections[1].note.en, /specificity unknown/i)
assert.match(data.sections[1].note.en, /50–83%.*not presented as current performance estimates/)

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
  '@/data/spinePracticeLinks': spinePracticeLinks,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/guillainBarreSpineLesson': { GUILLAIN_BARRE_SPINE_LESSON: data },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of langs) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: locale and direction`)
  assert.ok(html.includes(escape(data.title[locale])) && html.includes(escape(data.alt[locale])), `${locale}: title and translated hero alt`)
  assert.ok(html.includes(data.hero), `${locale}: topic hero`)
  assert.ok(html.includes(escape(data.intro.text[locale])) && html.includes(escape(data.scope[locale])), `${locale}: intro and scope`)
  for (const section of data.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])))
    for (const row of section.rows) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
    if (section.note) assert.ok(html.includes(escape(section.note[locale])))
  }
  assert.ok(html.includes(escape(data.check.prompt[locale])))
  for (const option of data.check.options) assert.ok(html.includes(escape(option[locale])))
  assert.ok(data.check.feedback[locale], `${locale}: translated explanatory feedback exists`)
  for (const ref of data.references) assert.ok(html.includes(escape(ref.title[locale])))
  for (const item of data.summary) assert.ok(html.includes(escape(item[locale])))
}
const svg = fs.readFileSync(`public${data.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
assert.match(svg, /non-diagnostic/i)
assert.match(fs.readFileSync(route, 'utf8'), /lesson\.check\.feedback/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'guillain-barre-syndrom',[^\n]*link: '\/wirbelsaeule\/entzuendlich\/guillain-barre-syndrom',[^\n]*inProgress: true/)
const ledger = fs.readFileSync('docs/lesson-quality/guillain-barre-mri-wirbelsaeule-p19.md', 'utf8')
for (const id of ['GBS-19-01','GBS-19-02','GBS-19-03','GBS-19-04','GBS-19-05','GBS-19-06','GBS-19-07','GBS-19-08']) assert.ok(ledger.includes(id))
console.log('GBS MRI p.19 StandardLessonShell SSR PASS: DE/EN/FA, RTL, image scope, evidence boundaries, source ledger, citations and retrieval feedback.')
