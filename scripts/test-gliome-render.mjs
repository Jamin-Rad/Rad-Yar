import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnGliomeLesson.js'

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
const Page = compile('app/gehirn/tumoren/gliome/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnGliomeLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes(`alt="${escaped(data.GEHIRN_GLIOME_LESSON.heroAlt[lang])}"`), `${lang}: localized hero alt`)
  assert.ok(html.includes('src="/educational/gliome/pilocytic-hero.svg"'), `${lang}: topic hero`)
  assert.ok(html.includes('src="/gehirn/gliome/pilocytic-case-pdf-p42.jpg"'), `${lang}: user-PDF case crop`)
  assert.ok(html.includes(escaped(data.GEHIRN_GLIOME_LESSON.objective[lang])))
  assert.ok(html.includes(escaped(data.GEHIRN_GLIOME_LESSON.sourceConflict[lang])))
  assert.ok(html.includes(escaped(data.GEHIRN_GLIOME_LESSON.cystWallNote[lang])), `${lang}: cyst-wall enhancement is qualified`)
  assert.ok(html.includes(escaped(data.GEHIRN_GLIOME_LESSON.assessment.question[lang])))
  data.GEHIRN_GLIOME_LESSON.assessment.options.forEach(option => assert.ok(html.includes(escaped(option[lang])), `${lang}: localized answer option`))
  const optionHtml = html.match(/<div class="options">([\s\S]*?)<\/div>/)?.[1] || ''
  assert.equal((optionHtml.match(/<button/g) || []).length, 4, `${lang}: four answer options`)
  const required = lang === 'fa' ? ['گلیوم‌های منتشر بزرگسالان', 'گروه آستروسیتی محدودشده', 'حذف همزمان 1p/19q'] : lang === 'en' ? ['Adult-type diffuse gliomas', 'Circumscribed astrocytic gliomas', '1p/19q-codeleted'] : ['Adulte diffuse Gliome', 'Zirkumskripte astrozytäre Gliome', '1p/19q-kodeletiert']
  required.forEach(text => assert.ok(html.includes(escaped(text)), `${lang}: localized classification map`))
}
console.log('Glioma actual-route semantic SSR PASS: DE/EN/FA, StandardLessonShell, RTL, classification, source MRI, attribution limits and self-check.')
