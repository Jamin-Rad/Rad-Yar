import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import * as data from '../data/spineInfection.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', {
  'next/image': ({ fill, priority, ...props }) => React.createElement('img', props),
  './LessonHero.module.css': styles,
}).default
let activeLanguage = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/wirbelsaeule/infektion/page.js', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/spineInfection': data,
  './page.module.css': styles,
}).default
const escaped = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.title[lang])), `${lang}: title`)
  assert.ok(html.includes('src="/educational/spine-infection-schematic.svg"'), `${lang}: explanatory schematic`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.alt[lang])), `${lang}: schematic alt text`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.media[lang])), `${lang}: schematic is disclosed as non-diagnostic`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.caseImage.alt[lang])), `${lang}: real MRI image has localized alt text`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.caseImage.caption[lang])), `${lang}: real MRI image has localized caption`)
  assert.ok(html.includes(data.SPINE_INFECTION_LESSON.caseImage.src), `${lang}: verified case image is rendered`)
  assert.ok(html.includes(escaped(data.SPINE_INFECTION_LESSON.caseImage.href)), `${lang}: case link is rendered`)
  for (const term of ['Wirbelkörper / Endplatten', 'Bandscheibe', 'Paravertebrale Kollektion']) {
    const localized = term === 'Wirbelkörper / Endplatten' ? ['Wirbelkörper / Endplatten', 'Vertebral bodies / endplates', 'مهره‌ها / صفحات انتهایی'] : term === 'Bandscheibe' ? ['Bandscheibe', 'Intervertebral disc', 'دیسک بین‌مهره‌ای'] : ['Paravertebrale Kollektion', 'Paravertebral collection', 'تجمع پاراورتیبرال']
    assert.ok(html.includes(escaped(localized[['de','en','fa'].indexOf(lang)])), `${lang}: schematic legend ${term}`)
  }
  for (const chapter of data.SPINE_INFECTION_LESSON.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`), `${lang}: ${chapter.id} anchor`)
    assert.ok(html.includes(escaped(chapter.title[lang])), `${lang}: ${chapter.id} title`)
    assert.ok(html.includes(escaped(chapter.lead[lang])), `${lang}: ${chapter.id} lead`)
    assert.ok(html.includes(escaped(chapter.note[lang])), `${lang}: ${chapter.id} note`)
    for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(escaped(cell[lang])), `${lang}: table cell`)
  }
  assert.ok(html.includes('id="case"') && html.includes(escaped(data.SPINE_INFECTION_LESSON.case.prompt[lang])), `${lang}: self-check prompt`)
  for (const option of data.SPINE_INFECTION_LESSON.case.options) assert.ok(html.includes(escaped(option[lang])), `${lang}: self-check option`)
  assert.ok(html.includes('id="lesson-sources-panel"'), `${lang}: sources panel`)
}

assert.ok(data.SPINE_INFECTION_LESSON.source.includes('PDF S. 14–15'))
const agePattern = JSON.stringify(data.SPINE_INFECTION_LESSON.chapters[0].rows)
assert.match(agePattern, /small children|kleinen Kindern|کودکان خردسال/)
assert.ok(data.SPINE_INFECTION_LESSON.notice.en.includes('applies to adults'))
assert.ok(data.SPINE_INFECTION_LESSON.chapters[1].note.en.includes('Source conflict'))
assert.ok(data.SPINE_INFECTION_LESSON.case.answerIndex >= 0)
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(data.SPINE_INFECTION_LESSON.case.feedbackCorrect[lang])
  assert.ok(data.SPINE_INFECTION_LESSON.case.feedbackIncorrect[lang])
}
const routeSource = fs.readFileSync('app/wirbelsaeule/infektion/page.js', 'utf8')
assert.ok(routeSource.includes('setAnswer(null)'), 'incorrect-answer branch provides a retry action')
assert.ok(fs.existsSync('public/educational/spine-infection-schematic.svg'))
console.log('Spine infection actual-route StandardLessonShell SSR PASS: DE/EN/FA, RTL, source pages, age caveat, localized schematic, all content rows and correct/retry self-check feedback.')
