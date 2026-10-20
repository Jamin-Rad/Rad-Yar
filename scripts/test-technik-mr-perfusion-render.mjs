import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const inlineTitles = { de: 'Selbstcheck: T1- oder T2*-Antwort?', en: 'Self-check: T1 or T2* response?', fa: 'خودآزمایی: پاسخ T1 یا T2*؟' }
const block = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt-spezial')?.teachingBlocks?.find(item => item.id === 'mr-perfusion')
assert.ok(block, 'MR perfusion teaching block is attached to the existing section')
assert.equal(block.visual.src, '/technik/grundlagen/mr-perfusion-signal-curve.svg')
assert.ok(block.rows.some(row => row[0].de === 'CBV · CBF · MTT'))
const topicGroup = MCQ_TOPIC_GROUPS.flatMap(group => group.topics).find(topic => topic.id === 'mrt-perfusion')
assert.ok(topicGroup, 'central quiz topic group is registered')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'mrt-perfusion'), 'flashcard topic registered')
assert.equal(getCardsByTopic('mrt-perfusion').length, 2, 'two flashcards are discoverable')
for (const lang of langs) {
  const question = QUESTION_BANK[lang].find(item => item.id === `mrt-perfusion-${lang}-signal-response`)
  assert.ok(question, `${lang}: central MCQ registered`)
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B', 'C', 'D'])
}

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
let activeLang = 'de'
const replacements = {
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/InProgressBanner': { __esModule: true, default: () => null },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr' }, children),
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
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes(block.title[lang]) && html.includes(block.lead[lang]), `${lang}: block title and lead`)
  assert.ok(html.includes(block.visual.src) && html.includes(block.visual.alt[lang]) && html.includes(block.visual.caption[lang]), `${lang}: visual/caption`)
  assert.ok(html.includes(block.visual.yAxis[lang]) && html.includes(block.visual.xAxis[lang]) && html.includes(block.visual.legend[lang]), `${lang}: chart axes and legend`)
  for (const [term, detail] of block.rows) assert.ok(html.includes(term[lang]) && html.includes(detail[lang]), `${lang}: row ${term[lang]}`)
  assert.match(block.rows[1][1][lang], /shortens T2|verkürzt auch T2|T2 را نیز کوتاه می‌کند/, `${lang}: both relaxation effects are stated`)
  assert.ok(html.includes(inlineTitles[lang]), `${lang}: translated inline retrieval check`)
}
const svg = fs.readFileSync('public/technik/grundlagen/mr-perfusion-signal-curve.svg', 'utf8')
assert.doesNotMatch(svg, /<text\b/i, 'figure is language-neutral')
assert.ok(fs.readFileSync('data/curriculum.js', 'utf8').includes("id: 'mrt-perfusion'"))
console.log('MR perfusion focused StandardPage SSR and registry audit PASS: DE/EN/FA, RTL, source block, curve, inline check, central MCQ and two flashcards.')
