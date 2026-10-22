import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'
import { SKAPHOIDFRAKTUR_LESSON as lesson } from '../data/skaphoidfraktur.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const route = 'app/msk/trauma/skaphoidfraktur/page.jsx'
assert.equal(lesson.id, 'skaphoidfraktur')
const assertLocalizedScripts = value => {
  if (!value || typeof value !== 'object') return
  if (typeof value.de === 'string' && typeof value.en === 'string' && typeof value.fa === 'string') {
    const arabicPersian = /[\u0600-\u06FF]/u
    assert.ok(!arabicPersian.test(value.de), `Persian/Arabic script in German field: ${value.de}`)
    assert.ok(!arabicPersian.test(value.en), `Persian/Arabic script in English field: ${value.en}`)
  }
  for (const child of Object.values(value)) assertLocalizedScripts(child)
}
assertLocalizedScripts(lesson)
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.sections[0].image, '/msk/scaphoid/source-herbert-classification-p19.jpg')
assert.equal(lesson.sections[1].image, '/msk/scaphoid/source-snac-radiograph-p20.jpg')
assert.equal(lesson.sections[2].image, '/msk/scaphoid/source-pseudarthrosis-vs-bipartitum-p19.jpg')
assert.equal(lesson.sections[0].answer, 2)
assert.equal(lesson.sections[0].options.length, 4)
assert.match(lesson.sections[0].imageLabelTranslations[2].en, /figure preserves.*displaced or gaping.*AO defines B2 as a complete waist fracture/)
assert.match(lesson.sections[0].paragraphs[0].en, /B2 complete waist fracture/)
assert.ok(lesson.sections.every(section => section.lead.de && section.lead.en && section.lead.fa))
for (const section of lesson.sections) {
  assert.ok(fs.existsSync(`public${section.image}`), `missing ${section.image}`)
  assert.ok(section.imageAlt.de && section.imageAlt.en && section.imageAlt.fa)
  assert.ok(section.imageCaption.de && section.imageCaption.en && section.imageCaption.fa)
}
assert.ok(fs.existsSync(`public${lesson.hero}`))
assert.ok(lesson.references.some(ref => ref.href === 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/further-reading/classifications-for-fractures-of-carpal-bones'))
assert.ok(lesson.references.some(ref => ref.href === 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/scaphoid-proximal-pole/definition'))
for (const locale of ['de', 'en', 'fa']) assert.ok(lesson.sections[0].paragraphs.some(item => /osteonecrosis|Osteonekrose|استئونکروز/i.test(item[locale]) && /B3/.test(item[locale])), `${locale}: B3 vascularity and osteonecrosis risk is qualified`)
assert.ok(lesson.references.some(ref => ref.href === 'https://pubmed.ncbi.nlm.nih.gov/3611645/'))

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
  '@/data/skaphoidfraktur': { SKAPHOIDFRAKTUR_LESSON: lesson },
  './page.module.css': styles,
}).default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes(escape(lesson.title[locale])) && html.includes(escape(lesson.heroAlt[locale])))
  assert.ok(html.includes(escape(lesson.scope[locale])), `${locale}: rendered localized source scope`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(escape(section.title[locale])))
    assert.ok(html.includes(escape(section.lead[locale])) && html.includes(section.image))
    if (section.imageCaption) assert.ok(html.includes(escape(section.imageCaption[locale])), `${locale}: rendered image caption`)
    for (const label of section.imageLabelTranslations || []) assert.ok(html.includes(escape(label[locale])), `${locale}: rendered translated image label`)
    for (const paragraph of section.paragraphs || []) assert.ok(html.includes(escape(paragraph[locale])))
    for (const row of section.rows || []) for (const cell of row) assert.ok(html.includes(escape(cell[locale])))
  }
  const check = lesson.sections[0]
  assert.ok(html.includes(escape(check.task[locale])))
  assert.ok(check.options.every(option => option[locale]), `${locale}: options`)
  assert.ok(check.feedback.every(item => item[locale]), `${locale}: feedback`)
  assert.ok(html.includes(escape(check.note[locale])))
  assert.ok(lesson.summary.every(rule => rule[locale]), `${locale}: summary`)
  assert.ok(lesson.references.every(ref => ref.title[locale] && ref.citation[locale]), `${locale}: references`)
}
const svg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.equal(new DOMParser().parseFromString(svg, 'image/svg+xml').getElementsByTagName('parsererror').length, 0)
const ledger = fs.readFileSync('docs/lesson-quality/skaphoidfraktur-msk-p19-p20.md', 'utf8')
for (const detail of ['SCAP-19-01', 'SCAP-19-02', 'SCAP-19-04', 'SCAP-19-05', 'SCAP-20-01', 'source-herbert-classification-p19.jpg', 'source-pseudarthrosis-vs-bipartitum-p19.jpg', 'source-snac-radiograph-p20.jpg', '220 dpi', 'user supplied the PDF']) assert.ok(ledger.includes(detail), `ledger detail missing: ${detail}`)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'skaphoidfraktur',[^\n]*link: '\/msk\/trauma\/skaphoidfraktur',[^\n]*inProgress: true/)
for (const locale of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[locale].filter(item => item.tags?.includes('skaphoidfraktur'))
  assert.equal(questions.length, 2, `${locale}: exact-topic quiz questions are registered`)
  assert.ok(questions.every(item => item.options.length === 4 && item.options.every(option => option.text)), `${locale}: four localized options`)
  assert.ok(questions.every(item => item.explanation), `${locale}: answer explanations`)
}
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(topic => topic.id === 'skaphoidfraktur')), 'quiz topic selector registers the exact curriculum ID')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'skaphoidfraktur'), 'flashcard topic is registered')
const cards = getCardsByTopic('skaphoidfraktur')
assert.equal(cards.length, 2, 'exact-topic flashcard deck is registered')
for (const card of cards) for (const field of ['front', 'answer', 'explanation']) for (const locale of ['de', 'en', 'fa']) assert.ok(card[field][locale], `${card.id} ${field} ${locale}`)
console.log('Scaphoid fracture/SNAC lesson: SSR and content parity PASS for DE/EN/FA, RTL, source figures, conceptual SVG, retrieval check, and references.')
