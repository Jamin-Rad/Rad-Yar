import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { PERIPROTHETISCHE_FEMURFRAKTUR_LESSON as lesson } from '../data/periprothetische-femurfraktur.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const route = 'app/msk/trauma/periprothetische-femurfraktur/page.jsx'
assert.equal(lesson.id, 'periprothetische-femurfraktur')
assert.equal(lesson.sections.length, 3)
assert.deepEqual(lesson.sections[0].rows.map(row => row[0].de), ['AG', 'AL', 'B', 'C'])
assert.deepEqual(lesson.sections[1].rows.map(row => row[0].de), ['B1', 'B2', 'B3'])
assert.equal(lesson.sections[2].answer, 1)
assert.equal(lesson.sections[2].options.length, 3)
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === 'periprothetische-femurfraktur'))
assert.equal(FLASHCARD_TOPICS.filter(topic => topic.id === 'periprothetische-femurfraktur').length, 1)
assert.equal(getCardsByTopic('periprothetische-femurfraktur').length, 2)
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.includes('periprothetische-femurfraktur'))
  assert.equal(questions.length, 2)
  assert.ok(questions.every(question => question.options.length === 4 && question.explanation))
}
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(fs.existsSync(`public${lesson.sections[0].image}`))

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
  'next/image': props => React.createElement('img', props),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/periprothetische-femurfraktur': { PERIPROTHETISCHE_FEMURFRAKTUR_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  assert.ok(html.includes('/ueben/quiz?fach=msk&amp;n=8&amp;themen=periprothetische-femurfraktur'))
  assert.ok(html.includes('/flashcards/periprothetische-femurfraktur'))
  assert.ok(html.includes(lesson.hero) && html.includes(lesson.sections[0].image))
  assert.ok(html.includes(escape(lesson.sections[0].imageCaption[locale])))
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])))
    for (const paragraph of section.paragraphs || []) assert.ok(html.includes(escape(paragraph[locale])))
    for (const row of section.rows || []) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
  }
  assert.ok(lesson.sections[2].feedback.every(item => item[locale]), `${locale}: option-specific feedback exists`)
  assert.ok(html.includes(escape(lesson.summary[2][locale])))
  assert.ok(html.includes('10.1007/s00402-024-05469-1'))
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
assert.match(svg, /AG marks the greater trochanter on the lateral proximal projection; AL marks the lesser trochanter at the medial neck-shaft junction/i)
assert.match(svg, /<circle cx="337" cy="101"[^>]*fill="#16857b"\/><rect x="448" y="59"/)
assert.match(svg, /<circle cx="280" cy="172"[^>]*fill="#16857b"\/><rect x="96" y="151"/)
assert.match(fs.readFileSync(route, 'utf8'), /section\.feedback\[answer\]/)
assert.match(fs.readFileSync('docs/lesson-quality/periprothetische-femurfraktur-msk-p27.md', 'utf8'), /Image345\.jpg/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'periprothetische-femurfraktur',[^\n]*link: '\/msk\/trauma\/periprothetische-femurfraktur',[^\n]*mcqLink: '\/ueben\/quiz\?fach=msk&n=8&themen=periprothetische-femurfraktur',[^\n]*flashcardLink: '\/flashcards\/periprothetische-femurfraktur'/)
console.log('Vancouver periprosthetic femur fracture lesson: SSR parity PASS for DE/EN/FA, RTL, exact-topic quiz/cards, source/hero media, AG/AL/B/C, B1/B2/B3, self-check feedback and sources.')
