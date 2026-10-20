import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { MR_ANGIOGRAPHY_BLOCK, MR_ANGIOGRAPHY_QUESTIONS } from '../data/technikMraLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const id = 'mrt-gefaessdarstellung'
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'mrt-spezial')
assert.ok(section, 'existing MRI-special-techniques section exists')
assert.equal(section.teachingBlocks.find(block => block.id === MR_ANGIOGRAPHY_BLOCK.id), MR_ANGIOGRAPHY_BLOCK)
assert.equal(MR_ANGIOGRAPHY_BLOCK.visual.src, '/technik/grundlagen/mr-angiography-mechanisms.svg')
assert.equal(MR_ANGIOGRAPHY_QUESTIONS.length, 3)
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === id), 'MCQ topic registered')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === id), 'flashcard topic registered')
assert.equal(getCardsByTopic(id).length, 4)

for (const lang of langs) {
  assert.ok(MR_ANGIOGRAPHY_BLOCK.title[lang] && MR_ANGIOGRAPHY_BLOCK.lead[lang] && MR_ANGIOGRAPHY_BLOCK.note[lang], `${lang}: block localized`)
  for (const [term, detail] of MR_ANGIOGRAPHY_BLOCK.rows) assert.ok(term[lang] && detail[lang], `${lang}: ${term[lang]} localized`)
  const ceResolution = MR_ANGIOGRAPHY_BLOCK.rows.find(([term]) => term.de === 'CE-MRA vs TOF: Auflösung')?.[1][lang]
  assert.ok(ceResolution, `${lang}: source comparison for stenotic/post-stenotic segments present`)
  const resolutionTerms = { de: ['Stenosen und poststenotischen', 'protokollabhängiger Vergleich'], en: ['stenotic and post-stenotic', 'protocol-dependent comparison'], fa: ['تنگی‌ها و بخش‌های پس از تنگی', 'وابسته به منبع و پروتکل'] }[lang]
  for (const phrase of resolutionTerms) assert.ok(ceResolution.includes(phrase), `${lang}: qualified CE-MRA versus TOF resolution claim: ${phrase}`)
  const tof = MR_ANGIOGRAPHY_BLOCK.rows.find(([term]) => term.de === 'TOF-MRA')?.[1][lang]
  const pc = MR_ANGIOGRAPHY_BLOCK.rows.find(([term]) => term.de.includes('Phasenkontrast-MRA'))?.[1][lang]
  const noContrastTerms = { de: ['kein Kontrastmittel', 'kein Kontrastmittel'], en: ['does not require a contrast agent', 'does not require a contrast agent'], fa: ['به مادهٔ حاجب نیاز ندارد', 'به مادهٔ حاجب نیاز ندارد'] }[lang]
  assert.ok(tof.toLowerCase().includes(noContrastTerms[0].toLowerCase()), `${lang}: TOF no-contrast property present`)
  assert.ok(pc.includes(noContrastTerms[1]), `${lang}: PC-MRA no-contrast property present`)
  assert.ok(MR_ANGIOGRAPHY_BLOCK.visual.alt[lang] && MR_ANGIOGRAPHY_BLOCK.visual.caption[lang] && MR_ANGIOGRAPHY_BLOCK.visual.legend.every(item => item[lang]), `${lang}: visual localized`)
  const question = QUESTION_BANK[lang].find(item => item.id === `${id}-${lang}-venc`)
  assert.ok(question, `${lang}: central MCQ registered`)
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.deepEqual(question.options.map(option => option.id), ['A', 'B', 'C', 'D'])
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B', 'C', 'D'])
  assert.ok(question.explanation.length > 50)
  for (const option of ['B', 'C', 'D']) assert.ok(question.wrongExplanations[option].length > 35, `${lang}: option ${option} specific explanation`)
}

const svgPath = `public${MR_ANGIOGRAPHY_BLOCK.visual.src}`
const svg = fs.readFileSync(svgPath, 'utf8')
assert.doesNotMatch(svg, /<text\b/i, 'diagram language-neutral')

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
let activeLang = 'de'
const replacements = {
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/InProgressBanner': { __esModule: true, default: () => null },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang, sources }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr' }, children, sources),
    LessonSection: ({ id, title, children }) => React.createElement('section', { id, 'aria-label': title }, React.createElement('h2', null, title), children),
    LessonSources: ({ items }) => React.createElement('aside', null, items.map(item => React.createElement('a', { key: item.href, href: item.href }, item.title))),
  },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}
const source = transformSync(fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
const Page = module.exports.default
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and RTL`)
  assert.ok(html.includes(MR_ANGIOGRAPHY_BLOCK.title[lang]) && html.includes(MR_ANGIOGRAPHY_BLOCK.lead[lang]), `${lang}: rendered teaching block`)
  assert.ok(html.includes(MR_ANGIOGRAPHY_BLOCK.visual.src) && html.includes(MR_ANGIOGRAPHY_BLOCK.visual.alt[lang]) && html.includes(MR_ANGIOGRAPHY_BLOCK.visual.caption[lang]), `${lang}: rendered diagram and labels`)
  for (const label of MR_ANGIOGRAPHY_BLOCK.visual.legend) assert.ok(html.includes(label[lang]), `${lang}: diagram panel key`)
  for (const [term, detail] of MR_ANGIOGRAPHY_BLOCK.rows) assert.ok(html.includes(term[lang]) && html.includes(detail[lang]), `${lang}: rendered row`)
  for (const reference of MR_ANGIOGRAPHY_BLOCK.references) assert.ok(html.includes(reference.href), `${lang}: source citation rendered`)
  assert.ok(html.includes(`themen=${id}`), `${lang}: visible quiz action`)
  assert.ok(html.includes(`/flashcards/${id}?from=`), `${lang}: visible card action`)
  const expectedReturn = lang === 'de' ? '%2Ftechnik%2Fgrundlagen%23mrt-spezial' : `%2Ftechnik%2Fgrundlagen%3Flang%3D${lang}%23mrt-spezial`
  assert.ok(html.includes(expectedReturn), `${lang}: actions return to localized section`)
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'mrt-gefaessdarstellung'.*link: '\/technik\/grundlagen#mrt-spezial'.*mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=mrt-gefaessdarstellung'.*flashcardLink: '\/flashcards\/mrt-gefaessdarstellung'/)
const ledger = fs.readFileSync('docs/lesson-quality/technik-mr-angiography-p110-p113.md', 'utf8')
for (const tag of ['MRA-110-01', 'MRA-110-03', 'MRA-110-04', 'MRA-112-02', 'MRA-112-02a', 'MRA-112-03', 'MRA-113-01', 'MRA-113-FIG']) assert.ok(ledger.includes(tag), `ledger includes ${tag}`)
assert.match(ledger, /higher resolution than TOF in stenotic and post-stenotic segments[\s\S]*qualified/)
assert.match(ledger, /TOF does not require contrast agent[\s\S]*Included explicitly/)
assert.match(ledger, /PC-MRA does not require contrast agent[\s\S]*Included explicitly/)
console.log('MR angiography pp.110–113: localized StandardPage SSR, exact curriculum/assessment links, concept diagram, MCQ/cards and source ledger PASS.')
