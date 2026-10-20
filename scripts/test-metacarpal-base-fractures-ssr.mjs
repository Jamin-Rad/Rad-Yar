import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { METAKARPALE_FRAKTUREN_LESSON as lesson } from '../data/metakarpale-frakturen.js'
import { METACARPAL_BASE_QUESTIONS } from '../data/metacarpalBaseQuestions.js'

const route = 'app/msk/trauma/metakarpale-frakturen/page.jsx'
assert.equal(lesson.id, 'metakarpale-frakturen')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.sections[0].paragraphs.length, 2)
assert.equal(lesson.sections[1].rows.length, 3)
assert.equal(lesson.sections[2].answer, 1)
assert.equal(lesson.sections[2].options.length, 3)
assert.match(lesson.sections[0].paragraphs[0].de, /laut PDF.*APL/)
assert.match(lesson.sections[0].paragraphs[0].en, /PDF attributes.*APL/)
assert.match(lesson.sections[0].paragraphs[0].fa, /طبق PDF.*APL/)
assert.equal(METACARPAL_BASE_QUESTIONS.de.length, 1)
assert.equal(METACARPAL_BASE_QUESTIONS.en.length, 1)
assert.equal(METACARPAL_BASE_QUESTIONS.fa.length, 1)
assert.equal(METACARPAL_BASE_QUESTIONS.en[0].correct, 'B')
assert.deepEqual(METACARPAL_BASE_QUESTIONS.en[0].tags, ['metakarpale-frakturen'])
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(fs.existsSync('public/msk/metacarpal/source-pdf-page-21.jpg'))

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
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile(route, {
  'next/image': ({ ...props }) => React.createElement('img', props),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/metakarpale-frakturen': { METAKARPALE_FRAKTUREN_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  assert.ok(html.includes(lesson.hero) && html.includes(lesson.sections[1].image))
  assert.ok(html.includes(escape(lesson.scope[locale])))
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])))
    for (const paragraph of section.paragraphs || []) assert.ok(html.includes(escape(paragraph[locale])))
    for (const row of section.rows || []) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
  }
  assert.ok(html.includes(escape(lesson.sections[2].task[locale])))
  assert.ok(lesson.sections[2].feedback.every(item => item[locale]), `${locale}: option-specific feedback exists`)
  assert.ok(html.includes('/ueben/quiz?fach=msk&amp;n=1&amp;themen=metakarpale-frakturen'))
  assert.ok(html.includes(escape(lesson.summary[2][locale])))
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
assert.match(fs.readFileSync(route, 'utf8'), /lesson\.sections\[2\]\.feedback\[answer\]/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'metakarpale-frakturen',[^\n]*link: '\/msk\/trauma\/metakarpale-frakturen',[^\n]*inProgress: true/)
const bank = fs.readFileSync('data/questions.js', 'utf8')
assert.match(bank, /\.\.\.METACARPAL_BASE_QUESTIONS\[lang\]/)
assert.match(bank, /id: 'metakarpale-frakturen', title: \{ de: 'Metakarpalbasisfrakturen'/)
assert.ok(METACARPAL_BASE_QUESTIONS.fa[0].options.every(option => option.text))
console.log('Metacarpal base fractures MSK.pdf p.21: SSR content parity PASS for DE/EN/FA, RTL, lesson image/hero, self-check feedback, registered MCQ and exact curriculum link.')
