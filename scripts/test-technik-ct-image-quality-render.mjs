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
import { CT_RECONSTRUCTION_BLOCK, CT_RECONSTRUCTION_TOPIC } from '../data/technikCTReconstructionLesson.js'
import { HRCT_TECHNIK_BLOCK, HRCT_TECHNIK_TOPIC } from '../data/technikHRCTLesson.js'

const langs = ['de', 'en', 'fa']
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'ct')
assert.ok(section, 'existing CT section exists')
assert.deepEqual(section.teachingBlocks, [CT_QUALITY_BLOCK, CT_ARTIFACTS_BLOCK, CT_RECONSTRUCTION_BLOCK, HRCT_TECHNIK_BLOCK, (await import('../data/technikCTPerfusionLesson.js')).CT_PERFUSION_BLOCK])
assert.equal(section.teachingBlocks[0].rows.length, 5)
assert.equal(CT_QUALITY_BLOCK.crossReference.href, '#ct-dose-geometry')
assert.equal(section.teachingBlocks[1].rows.length, 6)
assert.equal(CT_RECONSTRUCTION_BLOCK.rows.length, 4)
assert.ok(fs.existsSync(`public${CT_RECONSTRUCTION_BLOCK.visual.src}`))
assert.doesNotMatch(fs.readFileSync(`public${CT_RECONSTRUCTION_BLOCK.visual.src}`, 'utf8'), /<text\b/i, 'reconstruction SVG is language-neutral')
assert.ok(fs.existsSync(`public${HRCT_TECHNIK_BLOCK.visual.src}`))
assert.doesNotMatch(fs.readFileSync(`public${HRCT_TECHNIK_BLOCK.visual.src}`, 'utf8'), /<text\b/i, 'HRCT concept SVG is language-neutral')
assert.equal(HRCT_TECHNIK_BLOCK.visual.legend.length, 4, 'each of four visual panels has a key')
assert.match(fs.readFileSync(`public${HRCT_TECHNIK_BLOCK.visual.src}`, 'utf8'), /gridSmall|M 120 93|M 790 189/, 'HRCT diagram contains distinct sampling and maneuver visual primitives')
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === HRCT_TECHNIK_TOPIC.id), 'HRCT technique MCQ topic is discoverable')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === HRCT_TECHNIK_TOPIC.id), 'HRCT technique flashcard topic is registered')
assert.equal(getCardsByTopic(HRCT_TECHNIK_TOPIC.id).length, 5)
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
  const reconstructionQuestion = QUESTION_BANK[lang].find(item => item.id === `ct-reconstruction-${lang}-window-kernel`)
  assert.ok(reconstructionQuestion, `${lang}: reconstruction MCQ registered`)
  assert.deepEqual(Object.keys(reconstructionQuestion.wrongExplanations).sort(), ['B', 'C', 'D'])
  for (const row of CT_RECONSTRUCTION_BLOCK.rows) assert.ok(row[0][lang] && row[1][lang], `${lang}: reconstruction row localized`)
  assert.ok(CT_RECONSTRUCTION_BLOCK.visual.alt[lang] && CT_RECONSTRUCTION_BLOCK.note[lang])
  const mipCard = getCardsByTopic(CT_RECONSTRUCTION_TOPIC.id).find(item => item.id === 'ct-reconstruction-mip')
  const darkStructureText = { de: /(unterdrückt dunkle Strukturen vollständig|dunkle Strukturen werden vollständig unterdrückt)/, en: /(completely suppresses dark structures|dark structures are completely suppressed)/, fa: /ساختارهای تیره.*کاملاً حذف می/ }[lang]
  assert.match(CT_RECONSTRUCTION_BLOCK.note[lang], darkStructureText, `${lang}: MIP dark-structure limitation in note`)
  assert.match(mipCard.answer[lang], darkStructureText, `${lang}: MIP dark-structure limitation in flashcard`)
  const reconstructionCard = getCardsByTopic(CT_RECONSTRUCTION_TOPIC.id)[0]
  assert.ok(reconstructionCard.front[lang] && reconstructionCard.answer[lang], `${lang}: reconstruction flashcards localized`)
  const hrctQuestion = QUESTION_BANK[lang].find(item => item.id === `hrct-technik-${lang}-expiratory`)
  assert.ok(hrctQuestion, `${lang}: HRCT MCQ registered`)
  assert.deepEqual(Object.keys(hrctQuestion.wrongExplanations).sort(), ['B','C','D'])
  assert.equal(hrctQuestion.correct, 'A')
  assert.equal(hrctQuestion.options.length, 4)
  const wrongOptions = Object.fromEntries(hrctQuestion.options.filter(option => option.id !== 'A').map(option => [option.id, option.text]))
  const distractorPatterns = {
    de: { B:/Inspirationsserie.*Hypodensität/, C:/Bauchlage-Serie.*Air trapping.*abhängige Verdichtung/, D:/Exspirationsserie.*Fibrose/ },
    en: { B:/Inspiratory series.*hypoattenuation/, C:/Prone series.*air trapping.*dependent posterior opacity/, D:/Expiratory series.*fibrosis/ },
    fa: { B:/سری دمی.*کم‌دانسیته/, C:/سری دمر.*حبس هوا.*کدورت خلفی/, D:/سری بازدمی.*فیبروز/ },
  }[lang]
  for (const id of ['B','C','D']) {
    assert.match(wrongOptions[id], distractorPatterns[id], `${lang}: distractor ${id} is a plausible maneuver/interpretation confusion`)
    assert.ok(hrctQuestion.wrongExplanations[id].length > 35, `${lang}: distractor ${id} has specific feedback`)
  }
  for (const row of HRCT_TECHNIK_BLOCK.rows) assert.ok(row[0][lang] && row[1][lang], `${lang}: HRCT source point localized`)
  for (const key of HRCT_TECHNIK_BLOCK.visual.legend) assert.ok(key[lang], `${lang}: HRCT visual key localized`)
  assert.ok(HRCT_TECHNIK_BLOCK.note[lang] && getCardsByTopic(HRCT_TECHNIK_TOPIC.id)[0].answer[lang], `${lang}: HRCT scope note and flashcards localized`)
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
  assert.ok(html.includes(CT_RECONSTRUCTION_BLOCK.title[lang]) && html.includes(CT_RECONSTRUCTION_BLOCK.visual.src) && html.includes(CT_RECONSTRUCTION_BLOCK.visual.alt[lang]), `${lang}: reconstruction block and diagram render`)
  assert.ok(html.includes(CT_RECONSTRUCTION_BLOCK.note[lang]), `${lang}: exact localized source limitation renders`)
  for (const key of CT_RECONSTRUCTION_BLOCK.visual.legend) assert.ok(html.includes(key[lang]), `${lang}: visible left/centre/right panel key`)
  assert.ok(html.includes(CT_RECONSTRUCTION_TOPIC.id) && html.includes(lang === 'fa' ? 'تمرین بازسازی CT' : lang === 'en' ? 'Practise CT reconstruction' : 'CT-Rekonstruktion üben'), `${lang}: localized exercise actions render`)
  assert.ok(html.includes(HRCT_TECHNIK_BLOCK.title[lang]) && html.includes(HRCT_TECHNIK_BLOCK.visual.src) && html.includes(HRCT_TECHNIK_BLOCK.visual.alt[lang]), `${lang}: HRCT block and diagram render`)
  assert.ok(html.includes(HRCT_TECHNIK_BLOCK.note[lang]) && html.includes(HRCT_TECHNIK_BLOCK.rows[2][1][lang]), `${lang}: HRCT limitation and expiratory teaching render`)
  for (const key of HRCT_TECHNIK_BLOCK.visual.legend) assert.ok(html.includes(key[lang]), `${lang}: localized visual key labels thin/thick, FOV, expiratory and prone panels`)
  assert.ok(html.includes(HRCT_TECHNIK_TOPIC.id) && html.includes(lang === 'fa' ? 'تمرین تکنیک HRCT' : lang === 'en' ? 'Practise HRCT technique' : 'HRCT-Technik üben'), `${lang}: HRCT action links render`)
  assert.ok(html.includes(`/ueben/quiz?fach=technik&amp;n=1&amp;themen=hrct-technik&amp;from=%2Ftechnik%2Fgrundlagen${lang === 'de' ? '' : `%3Flang%3D${lang}`}%23ct`), `${lang}: HRCT MCQ link returns to localized CT section`)
  assert.ok(html.includes(`/flashcards/hrct-technik?from=%2Ftechnik%2Fgrundlagen${lang === 'de' ? '' : `%3Flang%3D${lang}`}%23ct`), `${lang}: HRCT flashcard link returns to localized CT section`)
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const entry = curriculum.match(/\{\s*id: 'ct-bildqualitaet-artefakte',[\s\S]*?\n\s*\}/)?.[0]
assert.ok(entry)
assert.match(entry, /link: '\/technik\/grundlagen#ct'/)
assert.match(entry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=ct-bildqualitaet-artefakte'/)
assert.match(entry, /flashcardLink: '\/flashcards\/ct-bildqualitaet-artefakte'/)
assert.match(entry, /inProgress: true/)
const reconstructionEntry = curriculum.split('\n').find(line => line.includes("id: 'ct-rekonstruktion-nachverarbeitung'"))
assert.ok(reconstructionEntry)
assert.match(reconstructionEntry, /link: '\/technik\/grundlagen#ct'/)
assert.match(reconstructionEntry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=ct-rekonstruktion-nachverarbeitung'/)
assert.match(reconstructionEntry, /flashcardLink: '\/flashcards\/ct-rekonstruktion-nachverarbeitung'/)
const hrctEntry = curriculum.split('\n').find(line => line.includes("id: 'hrct-technik'"))
assert.ok(hrctEntry)
assert.match(hrctEntry, /link: '\/technik\/grundlagen#ct'/)
assert.match(hrctEntry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=hrct-technik'/)
assert.match(hrctEntry, /flashcardLink: '\/flashcards\/hrct-technik'/)
console.log('CT image-quality focused SSR/registry assertions PASS: source blocks, conceptual diagram, DE/EN/FA, RTL, inline check, central MCQ/flashcards and curriculum links.')
