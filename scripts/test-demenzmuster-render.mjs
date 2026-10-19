import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as data from '../data/gehirnDemenzMusterLesson.js'

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
const Page = compile('app/gehirn/neurodegeneration/demenzmuster/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/gehirnDemenzMusterLesson': data,
  './page.module.css': styles,
}).default
const escaped = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))
const assets = ['public/educational/demenzmuster/atrophy-distribution.svg', 'public/educational/demenzmuster/alzheimer-mta-p72.png', 'public/educational/demenzmuster/ftd-p74.png']
assets.forEach(asset => assert.ok(fs.existsSync(asset), `asset exists: ${asset}`))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(`src="/educational/demenzmuster/atrophy-distribution.svg"`))
  assert.ok(html.includes(`alt="${escaped(data.GEHIRN_DEMENZMUSTER_LESSON.heroAlt[lang])}"`))
  data.GEHIRN_DEMENZMUSTER_LESSON.chapters.forEach(chapter => {
    assert.ok(html.includes(escaped(chapter.title[lang])), `${lang}: chapter title ${chapter.id}`)
    assert.ok(html.includes(escaped(chapter.text[lang].split('\n\n')[0])), `${lang}: chapter text ${chapter.id}`)
    if (chapter.figure) {
      assert.ok(html.includes(`src="${chapter.figure.src}"`), `${lang}: image ${chapter.id}`)
      assert.ok(html.includes(escaped(chapter.figure.alt[lang])), `${lang}: alt ${chapter.id}`)
      assert.ok(html.includes(escaped(chapter.figure.caption[lang])), `${lang}: caption ${chapter.id}`)
    }
  })
  assert.ok(html.includes(escaped(data.GEHIRN_DEMENZMUSTER_LESSON.assessment.question[lang])))
  data.GEHIRN_DEMENZMUSTER_LESSON.assessment.options.forEach(option => assert.ok(html.includes(escaped(option[lang]))))
  data.GEHIRN_DEMENZMUSTER_LESSON.takeaways.forEach(item => assert.ok(html.includes(escaped(item.detail[lang]))))
  assert.ok(html.includes('aria-controls="alzheimer-panel"') || html.includes('id="alzheimer"'))
  assert.ok(html.includes('PDF · pp.72–74') || html.includes('Gehirn.pdf'))
}
console.log('Dementia-pattern actual-route semantic SSR PASS: DE/EN/FA shell, RTL metadata, source images, localized alts/captions, assessment and takeaways.')
