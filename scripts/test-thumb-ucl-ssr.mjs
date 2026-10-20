import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { THUMB_UCL_LESSON as lesson } from '../data/thumbUclLesson.js'

const route = 'app/msk/trauma/ulnares-kollateralband-daumen/page.jsx'
assert.equal(lesson.id, 'ulnares-kollateralband-daumen')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.sections[2].answer, 0)
assert.equal(lesson.sections[2].options.length, 3)
assert.equal(lesson.sections[2].feedback.length, 3)
assert.equal(lesson.sections[2].image, '/msk/thumb-ucl/stener-mri-pdf-p23.jpg')
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(fs.existsSync(`public${lesson.sections[2].image}`))
assert.equal(lesson.summary.length, 4)

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const shellModule = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile(route, {
  'next/image': props => React.createElement('img', props),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: locale }) },
  '@/components/lesson-template/StandardLessonShell': shellModule,
  '@/data/thumbUclLesson': { THUMB_UCL_LESSON: lesson },
  './page.module.css': styles,
}).default

let locale = 'de'
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const lang of ['de', 'en', 'fa']) {
  locale = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and RTL`)
  assert.ok(html.includes(escape(lesson.title[lang])) && html.includes(escape(lesson.heroAlt[lang])))
  const keyLabels = {
    de: ['intaktes UCL unter der Aponeurose', 'Stener-Läsion mit dazwischenliegender Aponeurose', 'Adduktorenaponeurose'],
    en: ['intact UCL beneath the aponeurosis', 'Stener lesion with the aponeurosis interposed', 'adductor aponeurosis'],
    fa: ['UCL سالم در زیر آپونوروز', 'ضایعهٔ استنر با آپونوروزِ قرارگرفته در میان رباط و محل اتصال', 'آپونوروز اداکتور'],
  }
  for (const label of keyLabels[lang]) assert.ok(html.includes(escape(label)), `${lang}: localized schematic key`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`), `${lang}: ${section.id} anchor`)
    assert.ok(html.includes(escape(section.title[lang])) && html.includes(escape(section.lead[lang])))
    for (const paragraph of section.paragraphs) assert.ok(html.includes(escape(paragraph[lang])), `${lang}: paragraph parity`)
  }
  assert.ok(html.includes(lesson.sections[2].image))
  assert.ok(html.includes(escape(lesson.sections[2].imageAlt[lang])) && html.includes(escape(lesson.sections[2].imageCaption[lang])))
  assert.ok(html.includes(escape(lesson.sections[2].task[lang])))
  assert.ok(lesson.sections[2].feedback.every(item => item[lang]), `${lang}: option-specific feedback is translated`)
  assert.ok(lesson.summary.every(rule => html.includes(escape(rule[lang]))), `${lang}: summary parity`)
  assert.ok(html.includes('https://doi.org/10.1177/1753193421993015'))
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/23001117/'))
  assert.ok(html.includes('https://acsearch.acr.org/docs/69418/Narrative/'))
}

const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
assert.doesNotMatch(svg, /INTACT UCL|STENER LESION|UCL stump|Adductor aponeurosis|UCL remains beneath/)
const source = fs.readFileSync(route, 'utf8')
assert.match(source, /<fieldset>/)
assert.match(source, /role="status"/)
assert.match(source, /StandardLessonShell/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'bandverletzungen-daumen',[^\n]*link: '\/msk\/trauma\/ulnares-kollateralband-daumen',[^\n]*ready: true, inProgress: true/)
console.log('Thumb MCP UCL / Stener lesion: SSR content parity PASS for DE/EN/FA, RTL, source MRI figure and caption, three-answer image self-check with feedback, source links and four take-home rules. Browser QA remains separate.')
