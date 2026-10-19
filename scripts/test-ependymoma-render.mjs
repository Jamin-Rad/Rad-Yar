import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnEpendymomaLesson.js'

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
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
let activeLanguage = 'de'
const Page = compile('app/gehirn/tumoren/ependymom/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnEpendymomaLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(`alt="${escaped(data.EPENDYMOMA_COPY.heroAlt[lang])}"`))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.diagramLegend[1][lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.anatomy[lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.definition[lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.scanTask[lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.sourceCase[lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.scanCaption[lang])))
  data.EPENDYMOMA_COPY.frameFindings.forEach(finding => assert.ok(html.includes(escaped(finding[lang])), `${lang}: localized image observation`))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.scope[lang])))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.question[lang])))
  data.EPENDYMOMA_COPY.options.forEach(option => assert.ok(html.includes(escaped(option[lang])), `${lang}: localized option rendered`))
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.frameAlt[lang])))
  for (const label of lang === 'de' ? ['Axiales T1 nach Kontrastmittel', 'Axiales FLAIR'] : lang === 'en' ? ['Axial T1 post-contrast', 'Axial FLAIR'] : ['T1 محوری پس از کنتراست', 'FLAIR محوری']) {
    assert.ok(html.includes(escaped(label)), `${lang}: localized frame label`)
  }
  const optionHtml = html.match(/<div class="options">([\s\S]*?)<\/div>/)?.[1] || ''
  assert.equal((optionHtml.match(/<button/g) || []).length, 4, `${lang}: four assessment options`)
  assert.ok(html.includes(escaped(data.EPENDYMOMA_COPY.classification[lang])))
  assert.ok(html.includes(`src="/educational/ependymoma/t1c.png"`))
  assert.ok(html.includes(`src="/educational/ependymoma/flair.png"`))
}
console.log('Ependymoma actual-route semantic SSR PASS: DE/EN/FA, diagram, source-image limits, WHO context and embedded check.')
