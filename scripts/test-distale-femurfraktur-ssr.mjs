import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { DISTALE_FEMURFRAKTUR_LESSON as lesson } from '../data/distaleFemurfraktur.js'

const route = 'app/msk/trauma/distale-femurfraktur/page.jsx'
assert.equal(lesson.id, 'distale-femurfraktur')
assert.equal(lesson.sections.length, 1)
assert.equal(lesson.sections[0].rows.length, 3)
assert.equal(lesson.sections[0].answer, 1)
assert.equal(lesson.sections[0].options.length, 3)
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(fs.existsSync(`public${lesson.sections[0].image}`))
assert.match(lesson.sections[0].rows[1][1].en, /coronal-plane condylar fragment/i)
assert.match(lesson.sections[0].imageCaption.en, /easy to overlook.*AP view/i)
assert.ok(lesson.references.some(ref => ref.tag === 'MSK.pdf · PDF S.31'))
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
const Image = props => React.createElement('img', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': Image, './LessonHero.module.css': styles }).default
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
  'next/image': Image,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/distaleFemurfraktur': { DISTALE_FEMURFRAKTUR_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  assert.ok(html.includes(escape(lesson.scope[locale])), `${locale}: localized source scope`)
  assert.ok(html.includes(lesson.hero) && html.includes(lesson.sections[0].image))
  const section = lesson.sections[0]
  assert.ok(html.includes(escape(section.title[locale])) && html.includes(escape(section.lead[locale])))
  for (const row of section.rows) for (const cell of row) assert.ok(html.includes(escape(cell[locale])), `${locale}: translated morphology row`)
  assert.ok(html.includes(escape(section.task[locale])))
  assert.ok(section.options.every(item => item[locale]))
  assert.ok(section.feedback.every(item => item[locale]))
  assert.ok(html.includes(escape(section.note[locale])))
  assert.ok(html.includes(escape(section.imageCaption[locale])))
  assert.ok(lesson.summary.every(rule => rule[locale]))
  assert.ok(lesson.references.every(ref => ref.title[locale] && ref.citation[locale]))
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
const ledger = fs.readFileSync('docs/lesson-quality/distale-femurfraktur-msk-p31.md', 'utf8')
for (const id of ['DF-31-01', 'DF-31-02', 'DF-31-03', 'DF-31-04', 'DF-31-05', 'DF-31-06']) assert.ok(ledger.includes(id))
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'distale-femurfraktur',[^\n]*link: '\/msk\/trauma\/distale-femurfraktur',[^\n]*inProgress: true/)
console.log('Distal femur lesson: SSR/content parity PASS for DE/EN/FA, RTL, AO 33 morphology, Hoffa source radiographs, retrieval feedback and source ledger.')
