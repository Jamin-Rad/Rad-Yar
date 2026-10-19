import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import * as lessonData from '../data/gehirnPvlLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const curriculum = compile('data/curriculum.js', { './contrastMedia': { CONTRAST_GROUPS: [] } }).CURRICULUM
const Link = props => React.createElement('a', props)
const Image = ({ fill, priority, ...props }) => React.createElement('img', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': Image, './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
let activeLanguage = 'de'
const Page = compile('app/gehirn/anatomie/pvl/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/gehirnPvlLesson': lessonData,
  './page.module.css': styles,
}).default

const topic = curriculum.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === lessonData.GEHIRN_PVL_LESSON.id)
assert.ok(topic, 'exact PVL curriculum entry exists')
assert.equal(topic.link, '/gehirn/anatomie/pvl')
assert.equal(topic.inProgress, true)

const escaped = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
const figures = [
  ['axial-flair-a.jpg', 'axial-flair-a.jpg'],
  ['axial-flair-b.jpg', 'axial-flair-b.jpg'],
  ['sagittal-t1.jpg', 'sagittal-t1.jpg'],
]
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes(`alt="${escaped(lessonData.GEHIRN_PVL_LESSON.diagramAlt[lang])}"`), `${lang}: translated hero alt`)
  for (const chapter of lessonData.GEHIRN_PVL_LESSON.chapters) {
    assert.ok(html.includes(escaped(chapter.title[lang])), `${lang}: chapter ${chapter.id}`)
    for (const paragraph of chapter.text[lang].split('\n\n')) assert.ok(html.includes(escaped(paragraph)), `${lang}: localized paragraph`)
  }
  for (const [name] of figures) {
    assert.ok(html.includes(`src="/educational/pvl/${name}"`), `${lang}: source image ${name}`)
    assert.ok(fs.existsSync(`public/educational/pvl/${name}`), `${name}: file exists`)
  }
  assert.ok(html.includes(escaped(lessonData.GEHIRN_PVL_LESSON.assessment.question[lang])), `${lang}: assessment`)
  lessonData.GEHIRN_PVL_LESSON.assessment.options.forEach(option => assert.ok(html.includes(escaped(option[lang])), `${lang}: assessment option`))
  lessonData.GEHIRN_PVL_LESSON.takeaways.forEach(item => assert.ok(html.includes(escaped(item.detail[lang])), `${lang}: takeaway`))
  assert.ok(html.includes(escaped(lessonData.GEHIRN_PVL_LESSON.media[lang])), `${lang}: media provenance note`)
  assert.ok(html.includes('lesson-sources-panel'), `${lang}: source panel`)
}
const provenance = JSON.parse(fs.readFileSync('public/educational/pvl/image-provenance.json', 'utf8'))
assert.ok(provenance.projectAuthorization.includes('User authorized'))
assert.ok(provenance.licenseStatus.includes('not been verified'))
assert.equal(provenance.frames.length, 3)
const ledger = fs.readFileSync('docs/lesson-quality/gehirn-pvl-p80-p81.md', 'utf8')
assert.match(ledger, /p\.80/)
assert.match(ledger, /p\.81/)
assert.match(ledger, /rID 89973/)
assert.match(ledger, /This statement is explicitly not attributed to PDF pp\.80–81/)
assert.match(lessonData.GEHIRN_PVL_LESSON.assessment.feedback.en, /Dubowitz et al\. \(1985\) and Agut et al\. \(2020\)/)
assert.doesNotMatch(lessonData.GEHIRN_PVL_LESSON.assessment.feedback.en, /The PDF notes/)
for (const lang of ['de', 'en', 'fa']) {
  assert.match(lessonData.GEHIRN_PVL_LESSON.chapters[1].text[lang], /Dubowitz/)
  assert.match(lessonData.GEHIRN_PVL_LESSON.assessment.feedback[lang], /Dubowitz/)
  assert.match(lessonData.GEHIRN_PVL_LESSON.assessment.retry[lang], /Dubowitz/)
}
console.log('PVL actual-route StandardLessonShell semantic SSR PASS: DE/EN/FA, RTL metadata, source frames, assessment, takeaways, exact inProgress curriculum link, provenance and source ledger.')
