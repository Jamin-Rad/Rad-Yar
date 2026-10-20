import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CT_PERFUSION_QUESTIONS } from '../data/technikCTPerfusionLesson.js'

const langs = ['de', 'en', 'fa']
const inlineTitles = { de: 'Selbstcheck: Welcher Parameter beschreibt was?', en: 'Self-check: what does each parameter describe?', fa: 'خودآزمایی: هر شاخص چه چیزی را توصیف می‌کند؟' }
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'ct')
const block = section?.teachingBlocks?.find(item => item.id === 'ct-perfusion')
assert.ok(block, 'CT perfusion block is in the existing CT section')
assert.equal(block.visual.src, '/technik/grundlagen/ct-perfusion-time-density.svg')
assert.equal(block.rows.length, 5)
assert.ok(block.references.some(item => item.href === 'https://www.acr.org/-/media/ACR/Files/Practice-Parameters/ct-perfusion.pdf'))
assert.match(block.note.de, /5–7 mL\/s.*nicht als Protokoll übernommen/)
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === 'ct-perfusion-technik'))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'ct-perfusion-technik'))
assert.equal(getCardsByTopic('ct-perfusion-technik').length, 2)
const svg = fs.readFileSync('public/technik/grundlagen/ct-perfusion-time-density.svg', 'utf8')
assert.ok(fs.existsSync('public/technik/ct-perfusion/hero.svg'), 'focused route has a topic-specific hero')
assert.doesNotMatch(svg, /<text\b/i, 'diagram is language-neutral')
assert.match(svg, /stroke="#2864a7"/)
assert.match(svg, /stroke="#198b83"/)

for (const lang of langs) {
  const question = QUESTION_BANK[lang].find(item => item.id === `ct-perfusion-${lang}-parameter`)
  assert.ok(question, `${lang}: MCQ is registered`)
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B', 'C', 'D'])
  assert.match(question.options.find(option => option.id === 'B').text, /CBF = (Blutvolumen|blood volume|حجم خون)/, `${lang}: plausible CBF/CBV swap`)
  assert.match(question.options.find(option => option.id === 'C').text, /MTT = (Zeit bis|time to|زمان رسیدن)/, `${lang}: plausible MTT/TTP swap`)
  assert.match(question.wrongExplanations.B, /CBF.*CBV/)
  assert.match(question.wrongExplanations.C, /MTT.*TTP/)
  for (const row of block.rows) assert.ok(row[0][lang] && row[1][lang], `${lang}: localized row ${row[0][lang]}`)
  assert.ok(block.visual.alt[lang] && block.visual.caption[lang] && block.note[lang], `${lang}: visual/limitations copy`)
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
  assert.ok(html.includes(block.visual.src) && html.includes(block.visual.alt[lang]) && html.includes(block.visual.caption[lang]), `${lang}: visual and caption`)
  assert.ok(html.includes(block.visual.yAxis[lang]) && html.includes(block.visual.xAxis[lang]) && html.includes(block.visual.legend[lang]), `${lang}: visual axis labels and legend`)
  assert.ok(html.includes(block.note[lang]), `${lang}: limitations note`)
  assert.ok(html.includes(inlineTitles[lang]), `${lang}: inline retrieval check`)
}
assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'ct-perfusion-technik'.*mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=ct-perfusion-technik'/)
assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'ct-perfusion-technik'.*link: '\/technik\/ct-perfusion'/)
assert.match(fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8'), /aria-label=\{t\(block\.visual\.groupLabel \|\| block\.title\)\}/, 'diagram group has a concise label distinct from caption and image alt')
assert.match(fs.readFileSync('docs/lesson-quality/technik-ct-perfusion-p56-p57.md', 'utf8'), /PDF p\.56.*PDF p\.57/s)

const routeReplacements = {
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang, actions, title, theme, heroImageAlt, sources }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr' },
      React.createElement('h1', null, title),
      React.createElement('img', { src: theme.heroImage, alt: heroImageAlt }),
      React.createElement('nav', null, Object.values(actions).map(action => React.createElement('a', { key: action.href, href: action.href }, action.label))),
      sources, children),
    LessonSection: ({ id, title, children }) => React.createElement('section', { id }, React.createElement('h2', null, title), children),
    LessonSources: ({ title, items }) => React.createElement('aside', null, React.createElement('h2', null, title), items.map((item, index) => React.createElement('div', { key: item.href || index }, item.href ? React.createElement('a', { href: item.href }, item.title) : item.title, React.createElement('p', null, item.citation))))
  },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikCTPerfusionLesson': { CT_PERFUSION_BLOCK: (await import('../data/technikCTPerfusionLesson.js')).CT_PERFUSION_BLOCK, CT_PERFUSION_QUESTIONS },
  './page.module.css': { __esModule: true, default: styles },
}
const routeSource = transformSync(fs.readFileSync('app/technik/ct-perfusion/page.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const routeModule = { exports: {} }
new Function('require', 'module', 'exports', routeSource)(name => Object.hasOwn(routeReplacements, name) ? routeReplacements[name] : require(name), routeModule, routeModule.exports)
const FocusedPage = routeModule.exports.default
const pdfCitations = {
  de: 'Vom Nutzer bereitgestelltes PDF; beide Seiten visuell geprüft.',
  en: 'User-provided PDF; both pages visually inspected.',
  fa: 'PDF ارائه‌شده توسط کاربر؛ هر دو صفحه به‌صورت بصری بررسی شدند.',
}
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(FocusedPage))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: focused route direction`)
  assert.ok(html.includes('/technik/ct-perfusion/hero.svg'), `${lang}: topic-specific hero`)
  assert.ok(html.includes(`/ueben/quiz?fach=technik&amp;n=1&amp;themen=ct-perfusion-technik&amp;from=%2Ftechnik%2Fct-perfusion${lang === 'de' ? '' : `%3Flang%3D${lang}`}${lang === 'de' ? '' : `&amp;lang=${lang}`}`), `${lang}: visible MCQ action points back to lesson`)
  assert.ok(html.includes(`/flashcards/ct-perfusion-technik?from=%2Ftechnik%2Fct-perfusion${lang === 'de' ? '' : `%3Flang%3D${lang}`}${lang === 'de' ? '' : `&amp;lang=${lang}`}`), `${lang}: visible flashcard action points back to lesson`)
  assert.ok(html.includes(pdfCitations[lang]), `${lang}: localized PDF provenance`)
}
console.log('CT perfusion lesson SSR and registry audit PASS: source block, focused route, hero, DE/EN/FA/RTL, localized source provenance, visible MCQ/flashcard links, inline retrieval, MCQ, curriculum and flashcards.')
