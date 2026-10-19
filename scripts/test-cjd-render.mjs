import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnCjdMusterLesson.js'

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
const Page = compile('app/gehirn/neurodegeneration/cjd/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnCjdMusterLesson': data,
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(escape(data.GEHIRN_CJD_MUSTER_LESSON.title[lang])))
  assert.ok(html.includes('src="/educational/cjd/pattern-overview.svg"'))
  assert.ok(html.includes(lang === 'fa' ? 'شماتیک غیرتشخیصی' : lang === 'en' ? 'Non-diagnostic schematic' : 'Nichtdiagnostisches Schema'))
  for (const chapter of data.GEHIRN_CJD_MUSTER_LESSON.chapters) assert.ok(html.includes(escape(chapter.title[lang])))
  for (const figure of data.GEHIRN_CJD_MUSTER_LESSON.figures) {
    assert.ok(html.includes(`src="${figure.src}"`))
    assert.ok(html.includes(escape(figure.alt[lang])))
    assert.ok(html.includes(escape(figure.credit)))
  }
  assert.ok(html.includes(escape(data.GEHIRN_CJD_MUSTER_LESSON.assessment.question[lang])))
  data.GEHIRN_CJD_MUSTER_LESSON.assessment.options.forEach(option => assert.ok(html.includes(escape(option[lang]))))
  assert.ok(data.GEHIRN_CJD_MUSTER_LESSON.assessment.feedback[lang].length > 0)
  assert.ok(data.GEHIRN_CJD_MUSTER_LESSON.assessment.retry[lang].length > 0)
  assert.ok(html.includes('data-lehr-sections-managed="true"'))
}
assert.ok(fs.existsSync('public/educational/cjd/pattern-overview.svg'))
console.log('CJD actual-route semantic SSR PASS: StandardLessonShell, DE/EN/FA RTL, source images and localized embedded check.')
