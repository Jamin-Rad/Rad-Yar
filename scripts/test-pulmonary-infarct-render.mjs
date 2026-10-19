import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { PULMONARY_INFARCT_LESSON as data } from '../data/pulmonaryInfarctLesson.js'
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
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link, '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false }, './StandardLessonShell.module.css': styles,
})
const Page = compile('app/thorax/akute-le/page.js', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/data/pulmonaryInfarctLesson': { PULMONARY_INFARCT_LESSON: data }, './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: locale and direction`)
  assert.ok(html.includes(escape(data.title[locale])), `${locale}: localized title`)
  assert.ok(html.includes(escape(data.alt[locale])) && html.includes('/educational/pulmonary-infarct.svg'), `${locale}: schematic and alt`)
  assert.ok(html.includes('/educational/pulmonary-infarct-pdf-case.png'), `${locale}: PDF case image`)
  for (const chapter of data.chapters) assert.ok(html.includes(escape(chapter.title[locale])) && html.includes(escape(chapter.text[locale])) && html.includes(escape(chapter.note[locale])), `${locale}: chapter ${chapter.id}`)
  assert.ok(html.includes(escape(data.check.prompt[locale])) && data.check.correct[locale] && data.check.retry[locale], `${locale}: check and feedback`)
  for (const item of data.takeHome) assert.ok(item[locale], `${locale}: take-home`)
  for (const source of data.references) assert.ok(html.includes(escape(source.label[locale])), `${locale}: source label`)
  assert.ok(html.includes(['Thorax.pdf, PDF S. 12 (Druckseite 11)', 'Thorax.pdf, PDF p. 12 (printed p. 11)', 'Thorax.pdf، صفحهٔ PDF ۱۲ (چاپی ۱۱)'][locale === 'de' ? 0 : locale === 'en' ? 1 : 2]), `${locale}: localized image provenance in sources`)
}
assert.equal(data.id, 'akute-le', 'Reuse the existing Acute PE curriculum ID')
const found = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (value.id === 'akute-le') found.push(value); if (value.themen) visit(value.themen); if (value.sub) visit(value.sub) }
for (const subject of CURRICULUM) visit(subject.kapitel)
assert.equal(found.length, 1, 'No duplicate curriculum topic')
assert.equal(found[0].link, '/thorax/akute-le')
assert.equal(found[0].inProgress, true)
const svg = fs.readFileSync('public/educational/pulmonary-infarct.svg', 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0, 'Schematic SVG parses')
assert.ok(fs.statSync('public/educational/pulmonary-infarct-pdf-case.png').size > 10000, 'PDF image crop exists')
assert.match(fs.readFileSync('public/educational/pulmonary-infarct.provenance.json', 'utf8'), /Thorax.pdf, physical PDF page 12/)
assert.match(data.chapters.find(chapter => chapter.id === 'ct').text.en, /less than atelectatic lung/)
assert.match(data.check.correct.en, /does not reliably diagnose or exclude PE/)
assert.match(data.notice.en, /not a complete PE lesson/)
console.log('Pulmonary infarct lesson SSR, locale parity, source image, SVG and exact curriculum ID: PASS')
