import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { ARTERIAL_ANATOMY_LOWER_LIMB as data } from '../data/arterialAnatomyLowerLimb.js'

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
const Page = compile('app/gefaesse/anatomie-untere-extremitaet/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/arterialAnatomyLowerLimb': { ARTERIAL_ANATOMY_LOWER_LIMB: data },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

assert.equal(data.id, 'gefaessanatomie-kollateralen')
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'gefaessanatomie-kollateralen',[^\n]*link: '\/gefaesse\/anatomie-untere-extremitaet', inProgress: true, updatedAt: '2026-10-20' \}/)
assert.equal(data.chapters.length, 3)
assert.equal(data.check.answerIndex, 0)
assert.match(data.chapters[1].lead.en, /tibioperoneal trunk/)
assert.match(data.chapters[2].rows[0][1].en, /dorsalis pedis/)
assert.match(data.chapters[2].rows[1][1].en, /plantar arch/)
const svg = fs.readFileSync('public/educational/lower-limb-arterial-pathway.svg', 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
assert.match(svg, /non-diagnostic/i)
assert.equal((svg.match(/<circle /g) || []).length, 12)
for (const id of ['posterior-to-medial-plantar', 'posterior-to-lateral-plantar', 'lateral-plantar-to-arch', 'dorsalis-pedis-deep-plantar-connection']) {
  assert.ok(svg.includes(`id="${id}"`), `diagram explicitly shows ${id}`)
}
assert.match(svg, /id="dorsalis-pedis-deep-plantar-connection"[^>]*stroke-dasharray=/, 'dorsalis pedis deep plantar connection is dashed')
assert.ok(!svg.includes('medial and lateral plantar arteries</text>'), 'the two plantar arteries are not collapsed into a shared arch node')
const heroSvg = fs.readFileSync('public/educational/lower-limb-arterial-hero.svg', 'utf8')
assert.equal(new DOMParser().parseFromString(heroSvg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(escape(data.title[locale])), `${locale}: lesson title`)
  assert.ok(html.includes(escape(data.alt[locale])) && html.includes('/educational/lower-limb-arterial-hero.svg'), `${locale}: hero and translated alt`)
  assert.ok(html.includes(escape(data.diagramAlt[locale])) && html.includes('/educational/lower-limb-arterial-pathway.svg'), `${locale}: map and translated alt`)
  assert.ok(html.includes(escape(locale === 'de' ? 'nur die laterale bildet den Hauptanteil des Plantarbogens' : locale === 'en' ? 'only the lateral branch forms most of the plantar arch' : 'فقط شاخهٔ خارجی بخش عمدهٔ قوس پلانتار را می‌سازد')), `${locale}: lateral branch and arch relation are explained`)
  assert.ok(html.includes(escape(data.intro.text[locale])), `${locale}: opening text`)
  for (const chapter of data.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`) && html.includes(escape(chapter.title[locale])), `${locale}: chapter ${chapter.id}`)
    assert.ok(html.includes(escape(chapter.lead[locale])) && html.includes(escape(chapter.note[locale])), `${locale}: chapter text and caveat ${chapter.id}`)
    for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(escape(cell[locale])), `${locale}: table row ${chapter.id}`)
  }
  assert.ok(html.includes(escape(data.check.prompt[locale])), `${locale}: self-check prompt`)
  for (const option of data.check.options) assert.ok(html.includes(escape(option[locale])), `${locale}: self-check option`)
  assert.ok(data.check.feedback[locale], `${locale}: self-check feedback translation`)
  assert.ok(html.includes(escape(data.scope[locale])), `${locale}: source scope`)
  for (const ref of data.references) assert.ok(html.includes(escape(ref.title[locale])), `${locale}: reference title`)
  for (const point of data.takeHome) assert.ok(html.includes(escape(point[locale])), `${locale}: take-home point`)
}
const pageSource = fs.readFileSync('app/gefaesse/anatomie-untere-extremitaet/page.jsx', 'utf8')
assert.match(pageSource, /useState/)
assert.match(pageSource, /lesson\.check\.feedback/, 'self-check renders explanatory feedback after a response')
console.log('Lower-limb arterial anatomy StandardLessonShell SSR PASS: DE/EN/FA, RTL, branch map, source scope, chapter coverage, and retrieval check.')
