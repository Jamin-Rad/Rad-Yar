import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { PROXIMALE_FEMURFRAKTUR_LESSON as lesson } from '../data/proximaleFemurfrakturLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
assert.equal(lesson.id, 'proximale-femurfraktur')
assert.equal(lesson.sections.length, 2, 'lesson has two purpose-based chapters')
assert.deepEqual(lesson.sections.map(section => section.id), ['regions', 'classifications'])
const [regions, classifications] = lesson.sections
assert.equal(regions.rows.length, 6)
assert.equal(classifications.subTables.length, 2)
assert.deepEqual(classifications.subTables[0].rows.map(row => row[1].en), ['< 30°', '30°–50°', '> 50°'])
assert.deepEqual(classifications.subTables[1].rows.map(row => row[0].en), ['I', 'II', 'III', 'IV'])
assert.equal(classifications.visuals.length, 2)
assert.equal(lesson.check.answer, 0)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.references.length, 6)
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === 'proximale-femurfraktur'))
assert.equal(FLASHCARD_TOPICS.filter(topic => topic.id === 'proximale-femurfraktur').length, 1)
const cards = getCardsByTopic('proximale-femurfraktur')
assert.equal(cards.length, 2)
assert.ok(cards.every(card => ['de', 'en', 'fa'].every(lang => card.front[lang] && card.answer[lang] && card.explanation[lang])))
assert.ok(cards.every(card => card.front.de !== card.front.en))
for (const lang of langs) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags?.includes('proximale-femurfraktur'))
  assert.equal(questions.length, 2)
  assert.ok(questions.every(question => question.options.length === 4 && question.explanation))
  assert.ok(questions.every(question => question.question && question.options.every(option => option.text)))
}
assert.equal(QUESTION_BANK.de.find(question => question.tags?.includes('proximale-femurfraktur') && question.id.includes('pauwels-angle')).options[3].text, 'Die Einteilung verwendet nur die Dislokation, nicht den Winkel.')

const allLocalized = value => {
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) {
      assert.equal(typeof value[lang], 'string')
      assert.ok(value[lang].trim())
      if (lang !== 'fa') assert.ok(!/[\u0600-\u06ff]/u.test(value[lang]), `${lang} contains Persian script: ${value[lang]}`)
    }
    return
  }
  for (const child of Object.values(value)) allLocalized(child)
}
allLocalized(lesson)
assert.match(lesson.sourceNote.en, /30°\/50° convention/)
assert.match(classifications.note.en, /30–50° and >50°/)
assert.match(classifications.note.fa, /۳۰ تا ۵۰ و بیش از ۵۰ درجه/)
assert.match(classifications.note.en, /after traction and reduction intraoperatively/)
assert.match(classifications.visuals[0].caption.en, /schematic|Pauwels classifies/)
assert.match(lesson.references.find(reference => reference.href?.includes('PMC9408780')).title.en, /^Konarski et al\.:/)
assert.match(classifications.subTables[1].rows[2][1].en, /some contact remains/)
assert.match(lesson.check.explanation.en, /does not directly measure blood flow/)
assert.match(regions.rows[5][1].en, /exact relationship can vary/)
assert.equal(regions.imageLegend.length, 6)
assert.match(regions.imageLegend[3].en, /pertrochanteric region/)
assert.match(regions.imageLegend[4].en, /reverse obliquity/)
assert.match(regions.imageCaption.en, /anatomical location only/)
assert.match(regions.rows[2][1].en, /superomedial to inferolateral/)
assert.match(regions.rows[0][1].en, /superolateral.*inferomedial/)
assert.match(regions.rows[0][1].en, /medial buttress.*separate lesser-trochanter fragment/)
assert.match(regions.rows[1][1].en, /usually stable.*fragmentation/)
assert.match(regions.rows[2][1].en, /highly unstable/)
assert.match(regions.rows[3][1].en, /muscle forces/)
assert.equal(regions.image, '/educational/proximale-femurfraktur/fracture-zones.svg')
assert.deepEqual(classifications.visuals.map(visual => visual.src), [
  '/educational/proximale-femurfraktur/pauwels-angles.svg',
  '/educational/proximale-femurfraktur/garden-stages.svg',
])
for (const src of [lesson.hero, regions.image, ...classifications.visuals.map(visual => visual.src)]) assert.ok(fs.existsSync(`public${src}`), `asset exists: ${src}`)
const zoneSvg = fs.readFileSync(`public${regions.image}`, 'utf8')
assert.match(zoneSvg, /Numbered markers show anatomical regions only/)
assert.equal((zoneSvg.match(/<circle cx=/g) || []).length, 6)
assert.doesNotMatch(zoneSvg, /<path d="M(?:493 190 405 251|405 190 493 251)/)

const require = createRequire(import.meta.url)
let activeLang = 'de'
const styles = new Proxy({}, { get: (_, key) => String(key) })
function compileJsx(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const shell = compileJsx('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageAlt }) => React.createElement('div', null, React.createElement('h1', null, title), React.createElement('img', { alt: imageAlt })) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
const Page = compileJsx('app/msk/trauma/proximale-femurfraktur/page.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/proximaleFemurfrakturLesson': { PROXIMALE_FEMURFRAKTUR_LESSON: lesson },
  './page.module.css': { __esModule: true, default: styles },
}).default

for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('/ueben/quiz?fach=msk&amp;n=8&amp;themen=proximale-femurfraktur'))
  assert.ok(html.includes('/flashcards/proximale-femurfraktur'))
  assert.ok(html.includes('id="regions"') && html.includes('id="classifications"'))
  assert.ok(html.includes(lesson.title[lang]))
  assert.ok(html.includes(regions.imageAlt[lang]) && html.includes(regions.imageCaption[lang]))
  for (const legend of regions.imageLegend) assert.ok(html.includes(legend[lang]))
  for (const visual of classifications.visuals) assert.ok(html.includes(visual.alt[lang]) && html.includes(visual.caption[lang]))
  for (const table of classifications.subTables) assert.ok(html.includes(table.title[lang]))
  assert.ok(html.includes(lesson.check.prompt[lang]))
  assert.ok(html.includes(lesson.check.options[0][lang]))
  assert.ok(lesson.check.explanation[lang] && lesson.check.retry[lang])
  for (const reference of lesson.references.filter(item => item.href)) assert.ok(html.includes(reference.href))
  assert.equal(html.includes('Befund &amp; Selbsttest'), false)
}
const pageSource = fs.readFileSync('app/msk/trauma/proximale-femurfraktur/page.jsx', 'utf8')
assert.match(pageSource, /correct \? check\.explanation : check\.retry/)

const ledger = fs.readFileSync('docs/lesson-quality/proximale-femurfraktur-msk-p29-p30.md', 'utf8')
for (const id of ['PF-01', 'PF-02', 'PF-03', 'PF-04', 'PF-05', 'PF-06', 'PF-07', 'PF-08']) assert.ok(ledger.includes(id))
assert.match(ledger, /II 30–50°, III >50°/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'proximale-femurfraktur',[^\n]*link: '\/msk\/trauma\/proximale-femurfraktur',[^\n]*mcqLink: '\/ueben\/quiz\?fach=msk&n=8&themen=proximale-femurfraktur',[^\n]*flashcardLink: '\/flashcards\/proximale-femurfraktur'/)
console.log('Proximal femur lesson: source conflict, exact-topic MCQ/cards, concept visuals and embedded check; DE/EN/FA+RTL SSR passed.')
