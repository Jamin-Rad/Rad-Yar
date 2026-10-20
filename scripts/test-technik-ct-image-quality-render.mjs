import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CT_ARTIFACTS_BLOCK, CT_QUALITY_BLOCK, CT_QUALITY_QUESTIONS, CT_QUALITY_TOPIC } from '../data/technikCTQuality.js'

const langs = ['de', 'en', 'fa']
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'ct')
assert.ok(section, 'existing CT section exists')
assert.deepEqual(section.teachingBlocks, [CT_QUALITY_BLOCK, CT_ARTIFACTS_BLOCK])
assert.equal(section.teachingBlocks[0].rows.length, 5)
assert.equal(CT_QUALITY_BLOCK.crossReference.href, '#ct-dose-geometry')
assert.equal(section.teachingBlocks[1].rows.length, 6)
assert.ok(section.teachingBlocks[1].rows.some(row => /Partialvolumen|Partial volume|حجم جزئی/.test(row[0].de + row[0].en + row[0].fa)))
assert.ok(section.teachingBlocks[1].visual.alt.fa && section.teachingBlocks[1].visual.caption.fa)
assert.match(section.teachingBlocks[1].visual.caption.de, /größeres Voxel.*kleineres Voxel.*magenta Umrandung/i)
assert.match(CT_QUALITY_QUESTIONS[0].options[1].text, /Detektorelement/)
assert.ok(fs.existsSync(`public${CT_ARTIFACTS_BLOCK.visual.src}`))
const svg = fs.readFileSync(`public${CT_ARTIFACTS_BLOCK.visual.src}`, 'utf8')
assert.match(svg, /<svg/)
assert.doesNotMatch(svg, /<text\b/i, 'diagram remains language-neutral')

const topic = MCQ_TOPIC_GROUPS.flatMap(group => group.topics).find(item => item.id === CT_QUALITY_TOPIC.id)
assert.ok(topic, 'MCQ topic is discoverable')
assert.ok(FLASHCARD_TOPICS.some(item => item.id === CT_QUALITY_TOPIC.id), 'flashcard topic is registered')
assert.equal(getCardsByTopic(CT_QUALITY_TOPIC.id).length, 2)
for (const lang of langs) {
  const question = QUESTION_BANK[lang].find(item => item.id === `ct-quality-${lang}-partial-volume`)
  assert.ok(question, `${lang}: MCQ is in the central bank`)
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B', 'C', 'D'])
  const card = getCardsByTopic(CT_QUALITY_TOPIC.id)[0]
  assert.ok(card.front[lang] && card.answer[lang], `${lang}: flashcard translated`)
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
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: locale and direction`)
  assert.ok(html.includes(CT_QUALITY_BLOCK.title[lang]) && html.includes(CT_ARTIFACTS_BLOCK.title[lang]), `${lang}: both question-led blocks render`)
  assert.ok(html.includes('#ct-dose-geometry') && html.includes(CT_QUALITY_BLOCK.crossReference.label[lang]), `${lang}: pitch cross-reference renders`)
  assert.ok(html.includes(CT_ARTIFACTS_BLOCK.visual.src) && html.includes(CT_ARTIFACTS_BLOCK.visual.alt[lang]) && html.includes(CT_ARTIFACTS_BLOCK.visual.caption[lang]), `${lang}: diagram and translated accessible text`)
  for (const block of [CT_QUALITY_BLOCK, CT_ARTIFACTS_BLOCK]) for (const row of block.rows) assert.ok(html.includes(row[0][lang]) && html.includes(row[1][lang]), `${lang}: ${row[0][lang]} row renders`)
  assert.ok(html.includes(lang === 'fa' ? 'خودآزمایی: آرتیفکت پله‌ای یا سخت‌شدن پرتو؟' : lang === 'en' ? 'Self-check: stair-step or beam hardening?' : 'Selbstcheck: Stufenartefakt oder Strahlaufhärtung?'), `${lang}: distinct inline retrieval check`)
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const entry = curriculum.match(/\{\s*id: 'ct-bildqualitaet-artefakte',[\s\S]*?\n\s*\}/)?.[0]
assert.ok(entry)
assert.match(entry, /link: '\/technik\/grundlagen#ct'/)
assert.match(entry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=ct-bildqualitaet-artefakte'/)
assert.match(entry, /flashcardLink: '\/flashcards\/ct-bildqualitaet-artefakte'/)
assert.match(entry, /inProgress: true/)
console.log('CT image-quality focused SSR/registry assertions PASS: source blocks, conceptual diagram, DE/EN/FA, RTL, inline check, central MCQ/flashcards and curriculum links.')
