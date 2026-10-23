import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { SPINALE_TUMOREN_GRUNDLAGEN as lesson } from '../data/spinaleTumorenGrundlagen.js'
import { WIRBELMETASTASEN_QUESTIONS, WIRBELMETASTASEN_FLASHCARDS } from '../data/wirbelmetastasenAssessment.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => String(key) })
function compile(path, replacements) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
const page = compile('app/wirbelsaeule/tumoren/grundlagen/page.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/spinaleTumorenGrundlagen': { SPINALE_TUMOREN_GRUNDLAGEN: lesson },
  './page.module.css': { __esModule: true, default: styles },
  '../../infektion/page.module.css': { __esModule: true, default: styles },
})
const assertLocalized = value => {
  if (Array.isArray(value)) return value.forEach(assertLocalized)
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(lang => Object.hasOwn(value, lang))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(value[lang]?.trim(), `missing ${lang}`)
    return
  }
  Object.values(value).forEach(assertLocalized)
}
assertLocalized(lesson)
assertLocalized(WIRBELMETASTASEN_FLASHCARDS)
assert.equal(lesson.id, 'spinale-tumoren-grundlagen')
assert.equal(lesson.check.answerIndex, 0)
assert.equal(lesson.ivoryFigures.length, 2, 'both source radiographs should be represented')
for (const figure of lesson.ivoryFigures) assert.ok(fs.existsSync(`public${figure.src}`), `missing source image ${figure.src}`)
for (const lang of ['de', 'en', 'fa']) {
  const question = WIRBELMETASTASEN_QUESTIONS.find(item => item.id === `wirbelmetastasen-${lang}-ivory-vs-destructive`)
  assert.ok(question && QUESTION_BANK[lang].some(item => item.id === question.id), `${lang} vertebral-metastasis MCQ is registered`)
  assert.equal(question.options.length, 4)
}
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(topic => topic.id === 'wirbelmetastasen')))
assert.ok(WIRBELMETASTASEN_FLASHCARDS.length === 1 && WIRBELMETASTASEN_FLASHCARDS[0].topicId === 'wirbelmetastasen')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'wirbelmetastasen') && FLASHCARDS.some(card => card.topicId === 'wirbelmetastasen'))
assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'wirbelmetastasen'[^\n]*link: '\/wirbelsaeule\/tumoren\/grundlagen#ivory-vertebra'[^\n]*mcqLink: '[^']*themen=wirbelmetastasen'[^\n]*flashcardLink: '\/flashcards\/wirbelmetastasen'/)
const allSignalRows = lesson.chapters.find(chapter => chapter.id === 'signal-patterns').rows
for (const name of ['Astrozytom', 'Ependymom', 'Meningeom', 'Schwannom', 'Epidermoidzyste', 'Metastase', 'Epiduralabszess']) {
  assert.ok(allSignalRows.some(([label]) => label.de.includes(name)), `missing PDF p.22 descriptor row: ${name}`)
}
const svg = fs.readFileSync('public/educational/spinal-tumour-compartments.svg', 'utf8')
const dura = svg.match(/<ellipse cx="(\d+)" cy="(\d+)" rx="(\d+)" ry="(\d+)"[^>]*stroke="#2586a0" stroke-width="(\d+)"/)
const extradural = svg.match(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="#3978b6" stroke="#fff" stroke-width="(\d+)"/)
assert.ok(dura && extradural, 'dural boundary and extradural marker must be present')
const [, duraX, duraY, duraRx, duraRy, duraStroke] = dura.map(Number)
const [, markerX, markerY, markerRadius, markerStroke] = extradural.map(Number)
const ellipseRightEdge = duraX + duraRx * Math.sqrt(1 - ((markerY - duraY) / duraRy) ** 2) + duraStroke / 2
const markerLeftEdge = markerX - markerRadius - markerStroke / 2
assert.ok(markerLeftEdge - ellipseRightEdge >= 6, 'extradural marker must clear the dural ellipse by at least 6 SVG units')
assert.ok(markerX + markerRadius + markerStroke / 2 <= 570, 'extradural marker must remain within widened bony canal outline')
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(page.default))
  assert.match(html, new RegExp(`lang="${lang}"`))
  assert.match(html, /spinal-tumour-compartments\.svg/)
  assert.match(html, /spinal-tumour-compartment-check/)
  assert.match(html, /Quelle: Wirbelsäule\.pdf|Source: Wirbelsäule\.pdf|منبع: Wirbelsäule\.pdf/)
  assert.match(html, /not been independently confirmed|nicht unabhängig bestätigt|مستقلاً تأیید نشده/)
  assert.match(html, /outside the cord|außerhalb des Myelons|خارج از طناب نخاعی/)
  assert.match(html, /outside the dural sac, inside the bony canal|außerhalb des Duralsacks, innerhalb des knöchernen Spinalkanals|خارج از کیسهٔ دورال/)
  for (const figure of lesson.ivoryFigures) {
    assert.ok(html.includes(figure.src), `${lang} displays the source radiograph`)
    assert.ok(html.includes(figure.alt[lang]), `${lang} has localized image alt text`)
    assert.ok(html.includes(figure.caption[lang]), `${lang} has localized, source-bounded caption`)
  }
  assert.match(html, /Radiopaedia rIDs 25354 and 96568|Radiopaedia rID 25354 und 96568|شناسه‌های Radiopaedia rID 25354 و 96568/)
}
console.log('spinale-tumoren-grundlagen SSR, locales, source limits, ivory-vertebra images, and check markup: PASS')
