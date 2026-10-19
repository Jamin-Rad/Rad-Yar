import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnEpidermoidArachnoidLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Image = ({ fill, priority, ...props }) => React.createElement('img', props)
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': Image, './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
let activeLanguage = 'de'
const Page = compile('app/gehirn/tumoren/epidermoid-arachnoid/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnEpidermoidArachnoidLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('class="diagramColumns" dir="ltr"'), `${lang}: stable left-to-right schematic columns`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}">${escaped(lang === 'fa' ? 'اپیدرموئید' : 'Epidermoid')}</strong>`), `${lang}: first column is epidermoid`)
  assert.ok(html.includes(escaped(data.EPIDERMOID_ARACHNOID_COPY.diagramLegend[1][lang])))
  assert.ok(html.includes(escaped(data.EPIDERMOID_ARACHNOID_COPY.shape[lang])))
  assert.ok(html.includes(escaped(data.EPIDERMOID_ARACHNOID_COPY.takeaway[3].detail[lang])))
  assert.ok(html.includes(lang === 'fa' ? 'ویژگی' : lang === 'en' ? 'Feature' : 'Merkmal'), `${lang}: comparison table rendered`)
}
console.log('Epidermoid/arachnoid actual-route semantic SSR PASS: DE/EN/FA, table, localized legend, stable diagram direction and morphology text.')
