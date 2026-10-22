import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'
import { SPINE_INFLAMMATORY_STRUCTURAL_LESSON as lesson } from '../data/spineInflammatoryStructural.js'
import { MSK_SPINE_REGISTERED_QUESTIONS } from '../data/mskSpineRegisteredQuestions.js'
import { MSK_SPINE_REGISTERED_FLASHCARDS, MSK_SPINE_REGISTERED_FLASHCARD_TOPICS } from '../data/mskSpineRegisteredFlashcards.js'
import { QUESTION_BANK, getQuestions } from '../data/questions.js'
import { FLASHCARDS, getCardsByTopic } from '../data/flashcards.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

function compile(path, replacements = {}) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = ({ title, imageSrc, imageAlt, lang }) => React.createElement('header', { lang }, React.createElement('h1', null, title), React.createElement('img', { src: imageSrc, alt: imageAlt }))
const Lesson = compile('app/wirbelsaeule/degenerative/Lesson.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/components/Navbar': () => null,
  '@/components/Footer': () => null,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: (_, ids) => React.useState(() => new Set()) },
  '@/data/sourceLessonUi': require('../data/sourceLessonUi.js'),
  '@/data/spineDegenerative': { SPINE_DEGENERATIVE_LESSON: lesson },
  './page.module.css': styles,
}).default
const Page = compile('app/wirbelsaeule/entzuendlich/page.js', {
  '../degenerative/Lesson': Lesson,
  '@/data/spineInflammatoryStructural': { SPINE_INFLAMMATORY_STRUCTURAL_LESSON: lesson },
}).default

const topic = CURRICULUM.flatMap(group => group.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === 'morbus-scheuermann')
assert.equal(topic?.link, '/wirbelsaeule/entzuendlich')
assert.equal(topic?.inProgress, true)
const chapter = lesson.chapters.find(item => item.id === 'scheuermann')
assert.ok(chapter)
assert.equal(chapter.source.de.includes('PDF S. 13 (Druckseite 12)'), true)
const criterion = chapter.rows.find(([label]) => label.de === 'Sørensen-Kriterium')
assert.ok(criterion?.[1].de.includes('≥5°') && criterion[1].de.includes('mindestens drei benachbarten Wirbeln'))
assert.ok(!criterion[1].de.includes('Kyphoseapex'), 'do not add an unsupported apex requirement')
assert.ok(chapter.rows.some(([label]) => label.de === 'PDF-Angaben zur Verteilung'))
assert.ok(chapter.rows.some(([, text]) => text.de.includes('Edgren-Vaino')))
assert.ok(chapter.rows.some(([, text]) => text.de.includes('aktives Ödem')))
assert.ok(chapter.rows.some(([, text]) => text.en.includes('postural kyphosis is flexible')))
assert.equal(chapter.visual?.src, '/educational/scheuermann-wirbelsaeule-p13.png')
assert.ok(fs.existsSync(`public${chapter.visual.src}`), 'source crop asset exists')
assert.ok(lesson.references.some(item => item.url.includes('aofoundation.org')))

const clinicalChapter = lesson.chapters.find(item => item.id === 'ankylosing-clinical-context')
const structuralChapter = lesson.chapters.find(item => item.id === 'ankylosing-structural')
assert.ok(clinicalChapter && structuralChapter, 'p.11–12 axSpA chapters are present')
assert.equal(structuralChapter.visual?.src, '/educational/axial-spondyloarthritis-rid54155-p12.png')

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language/direction`)
  assert.ok(html.includes(esc(chapter.title[lang])), `${lang}: chapter title`)
  assert.ok(html.includes(esc(chapter.lead[lang])), `${lang}: lesson lead`)
  assert.ok(html.includes(`src="${chapter.visual.src}"`), `${lang}: source image`)
  assert.ok(html.includes(esc(chapter.visual.alt[lang])), `${lang}: localized alt`)
  assert.ok(html.includes(esc(chapter.visual.caption[lang])), `${lang}: localized provenance/caveat`)
  for (const row of chapter.rows) for (const cell of row) assert.ok(html.includes(esc(cell[lang])), `${lang}: translated row`)
  assert.ok(html.includes(esc(chapter.note[lang])), `${lang}: source and threshold caveat`)
  assert.ok(html.includes(esc(clinicalChapter.title[lang])), `${lang}: p.11 clinical chapter title`)
  assert.ok(html.includes(esc(clinicalChapter.note[lang])), `${lang}: epidemiology/HLA caveat`)
  assert.ok(html.includes(esc(structuralChapter.visual.caption[lang])), `${lang}: rID 54155 provenance caption`)
  assert.ok(html.includes(esc(lesson.chapters.find(item => item.id === 'ankylosing-mri').note[lang])), `${lang}: ASAS/negative MRI caveat`)
  assert.ok(html.includes(esc(lesson.case.prompt[lang])), `${lang}: case prompt`)
  assert.ok(lesson.case.feedbackIncorrect[lang], `${lang}: explanatory wrong-answer feedback is localized`)
}

const registeredQuestion = MSK_SPINE_REGISTERED_QUESTIONS.find(item => item.de.tags.includes('morbus-scheuermann'))
assert.ok(registeredQuestion, 'exact curriculum topic has a registered question')
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(registeredQuestion[lang].tags[0], 'morbus-scheuermann')
  assert.equal(registeredQuestion[lang].options.length, 4)
  assert.ok(QUESTION_BANK[lang].some(item => item.id === registeredQuestion[lang].id))
  assert.ok(getQuestions(['morbus-scheuermann'], lang, 20).some(item => item.id === registeredQuestion[lang].id))
}
const card = MSK_SPINE_REGISTERED_FLASHCARDS.find(item => item.id === 'ws-scheuermann-sorensen')
assert.equal(card?.topicId, 'morbus-scheuermann')
assert.ok(MSK_SPINE_REGISTERED_FLASHCARD_TOPICS.some(item => item.id === 'morbus-scheuermann'))
assert.ok(FLASHCARDS.some(item => item.id === card.id))
assert.ok(getCardsByTopic('morbus-scheuermann').some(item => item.id === card.id))
const axspaQuestion = MSK_SPINE_REGISTERED_QUESTIONS.find(item => item.de.id.startsWith('ws-axspa-negative-mri-01-'))
assert.ok(axspaQuestion, 'new negative-MRI follow-up check is registered')
const axspaCard = MSK_SPINE_REGISTERED_FLASHCARDS.find(item => item.id === 'ws-axspa-negative-mri')
assert.equal(axspaCard?.topicId, 'morbus-bechterew-ws')
assert.ok(getCardsByTopic('morbus-bechterew-ws').some(item => item.id === axspaCard.id))
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(axspaQuestion[lang].question && axspaQuestion[lang].explanation, `${lang}: question and feedback localized`)
  assert.equal(axspaQuestion[lang].tags[0], 'morbus-bechterew-ws')
  assert.equal(axspaQuestion[lang].options.length, 4)
  assert.ok(QUESTION_BANK[lang].some(item => item.id === axspaQuestion[lang].id))
  assert.ok(getQuestions(['morbus-bechterew-ws'], lang, 20).some(item => item.id === axspaQuestion[lang].id))
  assert.ok(axspaCard.front[lang] && axspaCard.answer[lang] && axspaCard.explanation[lang])
}
assert.ok(fs.readFileSync('app/wirbelsaeule/entzuendlich/page.js', 'utf8').includes('SPINE_INFLAMMATORY_STRUCTURAL_LESSON'))
assert.ok(fs.readFileSync('app/wirbelsaeule/degenerative/Lesson.jsx', 'utf8').includes('lessonData.case.feedbackIncorrect'), 'actual route presents explanatory feedback on an incorrect answer')

console.log('Wirbelsäule PDF p.11–13 route SSR PASS: axSpA clinical context and negative-MRI retrieval, Scheuermann source coverage, DE/EN/FA+RTL, source attribution, exact curriculum retrieval.')
