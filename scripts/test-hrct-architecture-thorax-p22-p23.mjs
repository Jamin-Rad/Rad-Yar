import assert from 'node:assert/strict'
import fs from 'node:fs'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { HRCT_FLASHCARDS, HRCT_LESSONS, HRCT_QUESTIONS } from '../data/hrct-muster.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
let lang = 'de'
const Page = compile('components/HrctPatternLesson.jsx', {
  'next/link': Link,
  '@/components/InProgressBanner': () => null,
  '@/components/LessonHero': ({ title, visual, visualCaption, lang: heroLang }) => React.createElement('div', { 'data-lesson-hero': '', lang: heroLang }, React.createElement('h1', null, title), visual, React.createElement('p', null, visualCaption)),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/app/abdomen/gi/divertikulitis/page.module.css': styles,
  './HrctPatternLesson.module.css': styles,
})

const id = 'hrct-architekturmuster'
const lesson = HRCT_LESSONS[id]
const localizedNumber = (value) => new RegExp(`${value}|${String(value).replace(/[0-9]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}`)
assert.deepEqual(lesson.sourceReferences[0].pages, [22, 23])
assert.deepEqual(lesson.sourceReferences[0].printedPages, [21, 22])
const honey = lesson.sections.find((section) => section.id === 'honeycombing')
assert.ok(honey)
for (const locale of ['de', 'en', 'fa']) {
  assert.match(honey.cards[0].text[locale], localizedNumber(25))
  assert.match(honey.cards[0].text[locale], /3.?10|۳.?۱۰/)
  assert.match(honey.cards[0].text[locale], /var|متغیر/i)
}

const imageSources = [
  ['image25.jpeg', 22, 21, 35820],
  ['image26.jpeg', 22, 21, 14799],
  ['image27.jpeg', 23, 22, 63668],
]
for (const [filename, page, printedPage, rid] of imageSources) {
  const image = lesson.sections.flatMap((section) => section.images ?? []).find((item) => item.src.endsWith(filename))
  assert.ok(image, `Missing ${filename}`)
  assert.deepEqual(image.pdfSource, {
    source: 'Thorax.pdf', page, printedPage, radiopaediaId: rid,
    match: image.pdfSource.match,
  })
  assert.match(image.pdfSource.match, /visually matches/i)
  for (const locale of ['de', 'en', 'fa']) {
    assert.ok(image.caption[locale].length < 110, 'Visible captions should guide image reading concisely')
    assert.match(image.alt[locale], /CT/i)
  }
  assert.ok(existsSync(new URL(`../public/hrct/architekturmuster/${filename}`, import.meta.url)))
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const questions = HRCT_QUESTIONS[lang].filter((question) => question.tags?.includes(id))
  assert.equal(questions.length, 12)
  assert.ok(questions.every((question) => question.options.length === 4 && question.options.some((option) => option.id === question.correct)))
  assert.ok(questions.every((question) => question.explanation.length > 30))
  const flashcards = HRCT_FLASHCARDS.filter((card) => card.topicId === id)
  assert.equal(flashcards.length, 15)
  const honeyCard = flashcards.find((card) => card.id === `${id}-fc-01`)
  assert.match(honeyCard.front[lang], lang === 'de' ? /Welches Merkmal/ : lang === 'en' ? /Which feature/ : /کدام ویژگی/)
  assert.match(honeyCard.explanation[lang], lang === 'de' ? /klinischem Kontext/ : lang === 'en' ? /clinical findings/ : /زمینه بالینی/)
  const html = renderToStaticMarkup(React.createElement(Page.default, { lesson }))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and text direction render`)
  assert.ok(html.includes('data-lesson-hero') && html.includes(lang === 'de' ? 'Schematische Bausteine' : lang === 'en' ? 'Schematic components' : 'اجزای شماتیک'), `${lang}: topic schematic in header`)
  assert.ok(!html.includes(`<h1>${lesson.title[lang]}</h1><p>${lesson.definition[lang]}</p>`), `${lang}: no explanatory subtitle under title`)
  assert.ok(html.includes(lesson.sections[0].lead[lang]), `${lang}: definition and mental model begin in lesson content`)
  assert.ok(html.includes(lesson.selfCheck.question[lang]), `${lang}: embedded decision is rendered`)
  assert.ok(html.includes(lesson.selfCheck.options[0][lang]), `${lang}: self-check option is rendered`)
  assert.equal((html.match(/<details/g) ?? []).length, 3, `${lang}: only the three source-traceable CT images show provenance disclosures`)
  for (const image of lesson.sections.flatMap((section) => section.images ?? []).filter((item) => item.pdfSource)) {
    assert.ok(html.includes(image.caption[lang]), `${lang}: concise image-reading task renders`)
    assert.ok(html.includes(image.alt[lang]), `${lang}: localized image alternative text renders`)
    assert.ok(html.includes(lang === 'de' ? 'Bildquelle und Nachweis' : lang === 'en' ? 'Image source and notes' : 'منبع و توضیحات تصویر'), `${lang}: source note disclosure is rendered`)
    assert.ok(html.includes(image.radiopaediaUrl), `${lang}: case link is accessible in source note`)
  }
}
assert.equal(lesson.selfCheck.answer, 0)
assert.match(lesson.selfCheck.options[0].en, /smaller vessels.*without convincing expiratory air trapping/i)
assert.match(lesson.selfCheck.options[1].en, /expiratory air trapping/i)
assert.match(lesson.selfCheck.explanation.en, /Hypoventilation can also make vessels appear smaller/)
for (const locale of ['de', 'en', 'fa']) {
  assert.ok(lesson.selfCheck.question[locale].length > 30)
  assert.ok(lesson.selfCheck.options.every((option) => option[locale].length > 5))
  assert.ok(lesson.selfCheck.explanation[locale].length > 50)
}

console.log('PASS: Thorax pp.22–23 coverage, honeycombing size nuance, localized image provenance, and linked MCQ/flashcard sets')
