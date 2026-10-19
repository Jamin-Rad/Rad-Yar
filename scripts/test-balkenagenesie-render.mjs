import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import * as data from '../data/gehirnBalkenagenesieLesson.js'

const require = createRequire(import.meta.url)
const styleMap = new Proxy({}, { get: (_, key) => String(key) })
const styles = { default: styleMap }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

let activeLanguage = 'de'
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/gehirn/anatomie/balkenagenesie/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/gehirnBalkenagenesieLesson': data,
  './page.module.css': styles,
}).default

const escaped = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(escaped(data.GEHIRN_BALKENAGENESIE_LESSON.title[lang])))
  for (const chapter of data.GEHIRN_BALKENAGENESIE_LESSON.chapters) {
    assert.ok(html.includes(escaped(chapter.title[lang])), `${lang}: chapter title`)
    chapter.text[lang].split('\n\n').forEach(paragraph => assert.ok(html.includes(escaped(paragraph)), `${lang}: chapter paragraph`))
  }
  assert.ok(html.includes(escaped(data.GEHIRN_BALKENAGENESIE_LESSON.assessment.question[lang])))
  data.GEHIRN_BALKENAGENESIE_LESSON.assessment.options.forEach(option => assert.ok(html.includes(escaped(option[lang])), `${lang}: answer option`))
  data.GEHIRN_BALKENAGENESIE_LESSON.frames.forEach(frame => {
    assert.ok(html.includes(`src="/educational/callosal/${frame.src}"`), `${lang}: source MRI crop`)
    assert.ok(html.includes(escaped(frame.label[lang])), `${lang}: crop label`)
    assert.ok(html.includes(escaped(frame.task[lang])), `${lang}: guided task`)
    assert.ok(fs.existsSync(`public/educational/callosal/${frame.src}`), `${frame.src}: asset exists`)
  })
  assert.ok(html.includes(lang === 'fa' ? 'شماتیک آموزشی سه صفحه' : lang === 'en' ? 'Three-plane teaching schematic' : 'Drei-Ebenen-Schema'))
  assert.ok(html.includes(escaped(data.GEHIRN_BALKENAGENESIE_LESSON.media[lang])))
  assert.ok(html.includes('lesson-sources-panel'))
}
const provenance = JSON.parse(fs.readFileSync('public/educational/callosal/image-provenance.json', 'utf8'))
assert.ok(provenance.projectAuthorization.includes('user authorized'))
assert.ok(provenance.licenseStatus.includes('unverified'))
console.log('Balkenagenesie actual-route StandardLessonShell semantic SSR PASS: DE/EN/FA, RTL, all localized chapters, schematic disclosure, sources and embedded self-check.')
