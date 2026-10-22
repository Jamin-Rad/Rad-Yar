import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { BECKENRINGFRAKTUR_LESSON as lesson } from '../data/beckenringfraktur.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const route = 'app/msk/trauma/beckenringfraktur/page.jsx'
assert.equal(lesson.id, 'beckenringfraktur')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.sections[1].rows.length, 3)
assert.equal(lesson.sections[2].answer, 1)
assert.equal(lesson.sections[2].options.length, 4)
assert.match(lesson.sections[1].paragraphs[0].de, /AO\/OTA 2018.*61B1.*61B2/s)
const topicGroup = MCQ_TOPIC_GROUPS.flatMap(group => group.topics).find(topic => topic.id === 'beckenringfraktur')
assert.ok(topicGroup, 'exact pelvic-ring MCQ topic is registered')
assert.equal(FLASHCARD_TOPICS.filter(topic => topic.id === 'beckenringfraktur').length, 1)
assert.equal(getCardsByTopic('beckenringfraktur').length, 2)
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.includes('beckenringfraktur'))
  assert.equal(questions.length, 2)
  assert.ok(questions.every(question => question.options.length === 4 && question.explanation))
}
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(fs.existsSync(`public${lesson.sections[1].image}`))
assert.match(lesson.sections[2].paragraphs[0].en, /no association.*pelvic-ring stability/i)
assert.match(lesson.sections[2].feedback[3].en, /does not prove instability/i)
assert.ok(lesson.references.some(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/29218648/'))

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
  '@/data/beckenringfraktur': { BECKENRINGFRAKTUR_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  assert.ok(html.includes('/ueben/quiz?fach=msk&amp;n=8&amp;themen=beckenringfraktur'))
  assert.ok(html.includes('/flashcards/beckenringfraktur'))
  assert.ok(html.includes(lesson.hero) && html.includes(lesson.sections[1].image))
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])))
    for (const paragraph of section.paragraphs || []) assert.ok(html.includes(escape(paragraph[locale])))
    for (const row of section.rows || []) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
  }
  const check = lesson.sections[2]
  assert.ok(html.includes(escape(check.task[locale])))
  assert.ok(check.options.every(option => option[locale]), `${locale}: all assessment options translated`)
  assert.ok(check.feedback.every(item => item[locale]), `${locale}: all option-specific feedback translated`)
  assert.ok(html.includes(escape(check.note[locale])))
  assert.ok(lesson.summary.every(rule => rule[locale]))
  assert.ok(lesson.references.every(ref => typeof ref.citation === 'string' || ref.citation[locale]))
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
const ledger = fs.readFileSync('docs/lesson-quality/beckenringfraktur-msk-p25-p26.md', 'utf8')
for (const id of ['PEL-25-01','PEL-25-02','PEL-25-03','PEL-25-04','PEL-25-05','PEL-26-01','PEL-26-02','PEL-25-06']) assert.ok(ledger.includes(id))
assert.match(ledger, /Der vordere Ring ist unterbrochen, und der hintere Ring ist unvollständig verletzt/)
const provenance = fs.readFileSync('docs/lesson-quality/media-provenance.md', 'utf8')
for (const detail of ['source-pdf-page-26.jpg', 'Image342.jpg', 'physical PDF page 26', 'unknown', 'explicitly authorized', 'not asserted']) assert.ok(provenance.includes(detail))
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'beckenringfraktur',[^\n]*link: '\/msk\/trauma\/beckenringfraktur',[^\n]*mcqLink: '\/ueben\/quiz\?fach=msk&n=8&themen=beckenringfraktur',[^\n]*flashcardLink: '\/flashcards\/beckenringfraktur'/)
console.log('Pelvic ring fracture lesson: SSR/content parity PASS for DE/EN/FA, RTL, AO/Tile distinction, exact-topic quiz/cards, source image/hero, L5 evidence caveat and inline retrieval feedback.')
