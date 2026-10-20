import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { MRI_ARTIFACT_BLOCKS, MRI_ARTIFACT_QUESTIONS, MRI_ARTIFACT_TOPIC_GROUP, MRI_ARTIFACT_FLASHCARD_TOPIC, MRI_ARTIFACT_FLASHCARDS } from '../data/technikMriArtifacts.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const safety = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt-sicherheit')
assert.ok(safety)
assert.equal(safety.pages, '87–94')
assert.equal(safety.teachingBlocks, MRI_ARTIFACT_BLOCKS)
assert.equal(MRI_ARTIFACT_BLOCKS.length, 1)
const block = MRI_ARTIFACT_BLOCKS[0]
assert.equal(block.id, 'artifact-pattern-cause-correction')
assert.equal(block.rows.length, 6)
assert.deepEqual(block.rows.map(row => row[0].de), [
  '1 · Suszeptibilität', '2 · Bewegung und Pulsation', '3 · Aliasing / Faltung',
  '4 · Zipper / RF-Störung', '5 · Gibbs / Truncation', '6 · Chemical Shift',
])

function inspect(value, path = 'artifacts') {
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) {
      assert.equal(typeof value[lang], 'string', `${path}.${lang}`)
      assert.ok(value[lang].trim(), `${path}.${lang}`)
      if (lang !== 'fa') assert.ok(!/[\u0600-\u06ff]/u.test(value[lang]), `${path}.${lang} contains Persian script`)
    }
    return
  }
  for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`)
}
inspect(block)
for (const [index, row] of block.rows.entries()) assert.match(row[1].en, /Cause:.*Pattern:.*Response:/)
assert.match(block.rows[2][1].en, /phase-encoding direction/)
assert.match(block.rows[3][1].en, /pause and follow the local escalation process/)
assert.ok(block.rows[3][1].en.includes('perpendicular'))
assert.ok(block.rows[3][1].de.includes('senkrecht'))
assert.ok(block.rows[3][1].fa.includes('عمود'))
assert.ok(block.visual.legend[3].en.includes('parallel'))
assert.ok(block.visual.legend[3].de.includes('parallel'))
assert.ok(block.visual.legend[3].fa.includes('موازی'))
assert.match(block.rows[5][1].en, /frequency encoding/)
assert.ok(fs.existsSync(`public${block.visual.src}`))
assert.equal(block.visual.images.length, 3)
for (const item of block.visual.images) assert.ok(fs.existsSync(`public${item.src}`), item.src)
assert.ok(block.visual.images[0].alt.de.includes('axiales Gehirn'))
assert.ok(block.visual.images[0].alt.en.includes('axial brain'))
assert.ok(block.visual.images[0].alt.fa.includes('مغز محوری'))
assert.match(fs.readFileSync('docs/lesson-quality/technik-mri-artifacts-p87-p91.md', 'utf8'), /Nicht gelehrt; ausdrücklich zurückgestellt/)

const require = createRequire(import.meta.url)
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
let activeLang = 'de'
const Page = compileJsx('app/technik/grundlagen/StandardPage.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside', null, 'in progress') },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}).default

for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes('data-lesson-progress-managed="true"'))
  assert.ok(html.includes('id="mrt-sicherheit"'))
  assert.ok(html.includes(block.title[lang]))
  assert.ok(html.includes(block.visual.src))
  assert.ok(html.includes(block.visual.alt[lang]))
  assert.ok(html.includes(block.visual.legend[5][lang]))
  for (const item of block.visual.images) {
    assert.ok(html.includes(item.src))
    assert.ok(html.includes(item.alt[lang]))
    assert.ok(html.includes(item.caption[lang]))
  }
  assert.ok(html.includes(lang === 'fa' ? 'خودآزمایی: aliasing یا تداخل RF؟' : lang === 'en' ? 'Self-check: aliasing or RF interference?' : 'Selbstcheck: Aliasing oder RF-Störung?'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع:' : lang === 'en' ? 'Source:' : 'Quelle:'))
  assert.equal(html.includes('role="status"'), false, 'answer feedback appears only after interaction')
}

const svg = fs.readFileSync(`public${block.visual.src}`, 'utf8')
assert.match(svg, /<svg/)
assert.match(svg, /<text[^>]*>6<\/text>/)
assert.doesNotMatch(svg, /ghost copies|susceptibility|aliasing|zipper|Gibbs|chemical shift/i)
const routeSource = fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8')
assert.match(routeSource, /function MRIArtifactKnowledgeCheck/)
assert.match(routeSource, /answer === copy\.answer \? copy\.correct : copy\.retry/)

for (const lang of langs) {
  const question = MRI_ARTIFACT_QUESTIONS.find(item => item.id === `mri-artifacts-${lang}-aliasing`)
  assert.ok(question)
  assert.ok(QUESTION_BANK[lang].some(item => item.id === question.id), `${lang}: central MCQ registration`)
  assert.equal(question.options.find(option => option.id === question.correct)?.text, question.options[0].text)
  assert.equal(Object.keys(question.wrongExplanations).sort().join(','), 'B,C,D')
}
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(topic => topic.id === 'mrt-bildqualitaet-artefakte-snr')))
assert.ok(MCQ_TOPIC_GROUPS.includes(MRI_ARTIFACT_TOPIC_GROUP))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === MRI_ARTIFACT_FLASHCARD_TOPIC.id))
assert.equal(MRI_ARTIFACT_FLASHCARDS.length, 2)
assert.equal(getCardsByTopic(MRI_ARTIFACT_FLASHCARD_TOPIC.id).length, 2)
for (const card of getCardsByTopic(MRI_ARTIFACT_FLASHCARD_TOPIC.id)) {
  assert.ok(langs.every(lang => card.front[lang]?.trim() && card.answer[lang]?.trim()), `${card.id}: translated front/answer`)
}
assert.ok(FLASHCARDS.every(card => card.topicId !== MRI_ARTIFACT_FLASHCARD_TOPIC.id || MRI_ARTIFACT_FLASHCARDS.some(registered => registered.id === card.id)))

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const entry = curriculum.match(/\{\s*id: 'mrt-bildqualitaet-artefakte-snr',[\s\S]*?\n\s*\}/)?.[0]
assert.ok(entry)
assert.match(entry, /link: '\/technik\/grundlagen#mrt-sicherheit'/)
assert.match(entry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=mrt-bildqualitaet-artefakte-snr'/)
assert.match(entry, /flashcardLink: '\/flashcards\/mrt-bildqualitaet-artefakte-snr'/)
assert.match(entry, /inProgress: true/)
console.log('MRI artefact pattern, localized encoding axes, source MRI examples, actual shared-shell/source SSR, and curriculum link pass in DE/EN/FA.')
