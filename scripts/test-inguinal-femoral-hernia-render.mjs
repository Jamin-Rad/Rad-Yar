import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { INGUINAL_FEMORAL_HERNIA_LESSON as lesson } from '../data/inguinalFemoralHerniaLesson.js'
import { QUESTION_BANK } from '../data/questions.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const Shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/abdomen/hernien/inguinal-femoral/page.jsx', {
  'next/image': { __esModule: true, default: props => React.createElement('img', props) },
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/inguinalFemoralHerniaLesson': { INGUINAL_FEMORAL_HERNIA_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(language => Object.hasOwn(value, language))) {
    for (const language of ['de', 'en', 'fa']) assert.ok(typeof value[language] === 'string' && value[language].trim(), `${key}.${language} missing`)
    return
  }
  for (const [name, child] of Object.entries(value)) assertLocalized(child, `${key}.${name}`)
}
assertLocalized(lesson)
assert.equal(lesson.id, 'inguinal-femoral-hernia')
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 2)
assert.match(lesson.chapters[3].paragraphs[0].de, /Erstliniendiagnostik/)
assert.match(lesson.chapters[3].paragraphs[0].en, /first-line imaging/)
assert.match(lesson.chapters[0].visualNote.de, /links.*lateral.*rechts.*mediale/i)
assert.match(lesson.chapters[0].visualNote.en, /left.*lateral.*right.*medial/)
assert.match(lesson.chapters[0].visualNote.fa, /چپ.*لترال.*راست.*مدیال/)
assert.ok(fs.existsSync(`public${lesson.visual.src}`), 'anatomy schematic exists')
const diagram = fs.readFileSync(`public${lesson.visual.src}`, 'utf8')
assert.match(diagram, /<svg/)
const femoralPath = diagram.match(/<path d="M(\d+) 236C[^"]+"[^>]*stroke="#e2a449"/)
assert.ok(femoralPath, 'femoral path exists in the source SVG')
assert.ok(Number(femoralPath[1]) > 514, 'with left=lateral/right=medial, femoral path is medial to the femoral vein at x514')
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'inguinalhernie'[^\n]*link: '\/abdomen\/hernien\/inguinal-femoral'[^\n]*mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=inguinalhernie'[^\n]*flashcardLink: '\/flashcards\/inguinal-femoral-hernia'/)
assert.match(curriculum, /id: 'femoralhernie'[^\n]*link: '\/abdomen\/hernien\/inguinal-femoral'[^\n]*mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=femoralhernie'[^\n]*flashcardLink: '\/flashcards\/inguinal-femoral-hernia'/)
assert.match(curriculum, /id: 'umbilikalhernie'[^\n]*tags: \['Sono','CT'\], diff: 1 \}/, 'umbilical hernia stays unlinked')
assert.match(curriculum, /id: 'innere-hernien'[^\n]*tags: \['CT'\], diff: 3 \}/, 'internal hernia stays unlinked')
assert.match(fs.readFileSync('docs/lesson-quality/inguinal-femoral-hernia-abdomen-p93-p94.md', 'utf8'), /PDF pp\.93–94 \/ printed pp\.92–93/)
for (const id of ['inguinalhernie', 'femoralhernie']) {
  const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === id)
  assert.equal(topic?.link, '/abdomen/hernien/inguinal-femoral')
  assert.equal(topic?.mcqLink, `/ueben/quiz?fach=abdomen&n=1&themen=${id}`)
  assert.equal(topic?.flashcardLink, '/flashcards/inguinal-femoral-hernia')
  assert.ok(FLASHCARD_TOPICS.some(item => item.id === 'inguinal-femoral-hernia'))
  assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), '/abdomen/hernien/inguinal-femoral')
}
assert.equal(getCardsByTopic('inguinal-femoral-hernia').length, 4)
for (const language of ['de', 'en', 'fa']) {
  for (const id of ['abdomen-inguinal-hernia-landmarks', 'abdomen-femoral-hernia-landmarks']) {
    const question = QUESTION_BANK[language].find(item => item.id === `${id}-${language}-01`)
    assert.ok(question, `${id} registered in ${language}`)
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
  }
  for (const card of getCardsByTopic('inguinal-femoral-hernia')) assert.ok(card.front[language] && card.answer[language] && card.explanation[language])
}
for (const language of ['de', 'en', 'fa']) {
  activeLanguage = language
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${language}"`) && html.includes(`dir="${language === 'fa' ? 'rtl' : 'ltr'}"`), `${language} direction`)
  assert.ok(html.includes(lesson.title[language]), `${language} title`)
  assert.ok(html.includes(lesson.check.prompt[language]), `${language} self-check`)
  assert.ok(html.includes(lesson.sourceNote[language]) && html.includes('Abdomen.pdf'), `${language} source scope`)
  assert.ok(html.includes(lesson.visual.alt[language]), `${language} image alternative text`)
  assert.ok(html.includes('/ueben/quiz?fach=abdomen&amp;n=2&amp;themen=inguinalhernie,femoralhernie'), `${language} lesson quiz action`)
  assert.ok(html.includes('/flashcards/inguinal-femoral-hernia'), `${language} lesson flashcard action`)
}
console.log('Inguinal/femoral hernia SSR and retrieval integration PASS: DE/EN/FA, two exact curriculum topics/questions, four shared flashcards, lesson actions, source scope, and diagram.')
