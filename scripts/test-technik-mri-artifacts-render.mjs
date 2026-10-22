import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { MRI_ARTIFACT_BLOCKS, MRI_ARTIFACT_QUESTIONS, MRI_ARTIFACT_TOPIC_GROUP, MRI_ARTIFACT_FLASHCARD_TOPIC, MRI_ARTIFACT_FLASHCARDS } from '../data/technikMriArtifacts.js'
import { MRI_QUALITY_FLASHCARDS } from '../data/technikMRIFundamentalsLesson.js'
import { MRI_SAFETY_BLOCK, MRI_SAFETY_QUESTIONS, MRI_SAFETY_PREGNANCY_QUESTIONS, MRI_SAFETY_TOPIC_GROUP, MRI_SAFETY_FLASHCARD_TOPIC, MRI_SAFETY_FLASHCARDS } from '../data/technikMriSafetyLesson.js'
import { MRI_SPIN_ECHO_BLOCK, MRI_SPIN_ECHO_QUESTIONS, MRI_SPIN_ECHO_TOPIC_GROUP, MRI_SPIN_ECHO_FLASHCARD_TOPIC, MRI_SPIN_ECHO_FLASHCARDS } from '../data/technikMriSpinEchoLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS, getCardsByTopic } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const safety = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt-sicherheit')
assert.ok(safety)
assert.equal(safety.pages, '87–94')
assert.equal(safety.teachingBlocks[0], MRI_ARTIFACT_BLOCKS[0])
assert.equal(safety.teachingBlocks[1], MRI_SAFETY_BLOCK)
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
  assert.ok(html.includes(MRI_SPIN_ECHO_BLOCK.title[lang]))
  assert.ok(html.includes(MRI_SPIN_ECHO_BLOCK.visual.srcLocalized[lang]))
  assert.ok(html.includes(MRI_SPIN_ECHO_BLOCK.visual.alt[lang]))
  assert.ok(html.includes(`/flashcards/mrt-spin-echo?from=`))
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
assert.equal(getCardsByTopic(MRI_ARTIFACT_FLASHCARD_TOPIC.id).length, MRI_ARTIFACT_FLASHCARDS.length + MRI_QUALITY_FLASHCARDS.length)
for (const card of getCardsByTopic(MRI_ARTIFACT_FLASHCARD_TOPIC.id)) {
  assert.ok(langs.every(lang => card.front[lang]?.trim() && card.answer[lang]?.trim()), `${card.id}: translated front/answer`)
}
assert.ok(FLASHCARDS.every(card => card.topicId !== MRI_ARTIFACT_FLASHCARD_TOPIC.id || [...MRI_ARTIFACT_FLASHCARDS, ...MRI_QUALITY_FLASHCARDS].some(registered => registered.id === card.id)))

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const entry = curriculum.match(/\{\s*id: 'mrt-bildqualitaet-artefakte-snr',[\s\S]*?\n\s*\}/)?.[0]
assert.ok(entry)
assert.match(entry, /link: '\/technik\/grundlagen#mrt'/)
assert.match(entry, /mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=mrt-bildqualitaet-artefakte-snr'/)
assert.match(entry, /flashcardLink: '\/flashcards\/mrt-bildqualitaet-artefakte-snr'/)
assert.match(entry, /inProgress: true/)

assert.equal(MRI_SAFETY_BLOCK.rows.length, 4)
assert.match(MRI_SAFETY_BLOCK.rows[1][1].en, /local hot spots are not equivalent/)
assert.match(MRI_SAFETY_BLOCK.rows[1][1].en, /GRE < SE, TSE highest/)
assert.match(MRI_SAFETY_BLOCK.note.en, /PDF pp\. 92–94/)
assert.match(MRI_SAFETY_BLOCK.note.en, /not current universal rules/)
assert.match(MRI_SAFETY_BLOCK.rows[1][1].en, /Normal and First-Level Controlled are distinct operating modes/)
assert.match(MRI_SAFETY_BLOCK.rows[3][1].en, /Patient: Clinical MRI/)
assert.match(MRI_SAFETY_BLOCK.rows[3][1].en, /pregnant staff/)
assert.match(MRI_SAFETY_BLOCK.rows[3][1].en, /during active scanning/)
assert.ok(fs.existsSync(`public${MRI_SAFETY_BLOCK.visual.src}`))
for (const lang of langs) {
  assert.ok(fs.existsSync(`public${MRI_SAFETY_BLOCK.visual.srcLocalized[lang]}`))
  const localizedSvg = fs.readFileSync(`public${MRI_SAFETY_BLOCK.visual.srcLocalized[lang]}`, 'utf8')
  assert.match(localizedSvg, new RegExp(lang === 'de' ? 'STATISCHES FELD' : lang === 'en' ? 'STATIC FIELD' : 'میدان ثابت', 'i'))
  assert.match(localizedSvg, new RegExp(lang === 'de' ? 'Gewebeerwärmung' : lang === 'en' ? 'Tissue heating' : 'گرم‌شدن بافت', 'i'))
}
assert.ok(MRI_SAFETY_FLASHCARDS.some(card => card.id === 'mri-safety-static-field'))
const safetySvg = fs.readFileSync(`public${MRI_SAFETY_BLOCK.visual.src}`, 'utf8')
assert.match(safetySvg, /B₀ · STATIC FIELD/)
assert.match(safetySvg, /RF · ABSORPTION/)
assert.match(safetySvg, /GRADIENTS/)
for (const lang of langs) {
  activeLang = lang
  assert.ok(MRI_SAFETY_QUESTIONS.some(q => q.id === `mri-safety-${lang}-hotspot`))
  const q = MRI_SAFETY_QUESTIONS.find(q => q.id === `mri-safety-${lang}-hotspot`)
  assert.ok(QUESTION_BANK[lang].some(item => item.id === q.id))
  const pregnancyQuestion = MRI_SAFETY_PREGNANCY_QUESTIONS.find(q => q.id === `mri-safety-${lang}-pregnancy`)
  assert.ok(QUESTION_BANK[lang].some(item => item.id === pregnancyQuestion.id))
  assert.equal(pregnancyQuestion.options.length, 4)
  assert.ok(pregnancyQuestion.explanation && Object.keys(pregnancyQuestion.wrongExplanations).length === 3)
  assert.deepEqual(Object.keys(q.wrongExplanations).sort(), ['B', 'C', 'D'])
  assert.ok(MRI_SAFETY_FLASHCARDS.every(card => card.front[lang] && card.answer[lang]))
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(MRI_SAFETY_BLOCK.title[lang]))
  assert.ok(html.includes(MRI_SAFETY_BLOCK.visual.srcLocalized[lang]))
  assert.ok(html.includes(MRI_SAFETY_BLOCK.visual.alt[lang]))
  assert.ok(html.includes(`/flashcards/mrt-sicherheit-risiken?from=`))
}
for (const [lang, terms] of Object.entries({ de: [/Patientin/, /Beschäftigte/, /Zone IV/], en: [/patient/, /staff/, /Zone IV/], fa: [/بیمار/, /کارکنان/, /Zone IV/] })) {
  const q = MRI_SAFETY_PREGNANCY_QUESTIONS.find(question => question.id === `mri-safety-${lang}-pregnancy`)
  assert.ok(terms.every(term => term.test(`${q.question} ${q.options[0]} ${q.explanation}`)), `${lang}: patient/staff distinction translated`)
}
assert.ok(MCQ_TOPIC_GROUPS.includes(MRI_SAFETY_TOPIC_GROUP))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === MRI_SAFETY_FLASHCARD_TOPIC.id))
assert.equal(MRI_SAFETY_FLASHCARDS.length, 3)
assert.ok(MRI_SAFETY_FLASHCARDS.some(card => card.id === 'mri-safety-gradient-noise'))
const gradientCard = MRI_SAFETY_FLASHCARDS.find(card => card.id === 'mri-safety-gradient-noise')
for (const [lang, terms] of Object.entries({ de: [/Nerven/, /implant/, /Gehörschutz/], en: [/nerve/, /implanted devices/, /hearing protection/], fa: [/عصب/, /ایمپلنت/, /محافظ شنوایی/] })) {
  assert.ok(terms.every(term => term.test(`${gradientCard.front[lang]} ${gradientCard.answer[lang]}`)), `${lang}: gradient stimulation and acoustic noise are actively retrievable`)
}
for (const [lang, terms] of Object.entries({ de: [/bis 3 T/, /ohne Kontrast/, /keine praktische Alternative/], en: [/up to 3 T/, /without contrast/, /no practical alternative/], fa: [/۳ تسلا/, /بدون مادهٔ حاجب/, /جایگزین عملی/] })) {
  assert.ok(terms.every(term => term.test(MRI_SAFETY_BLOCK.rows[3][1][lang])), `${lang}: pregnant-patient recommendation has bounded indication`)
}
assert.equal(getCardsByTopic(MRI_SAFETY_FLASHCARD_TOPIC.id).length, MRI_SAFETY_FLASHCARDS.length)
inspect(MRI_SAFETY_BLOCK)
inspect(MRI_SPIN_ECHO_BLOCK)
assert.equal(MRI_SPIN_ECHO_BLOCK.rows.length, 7)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[1][1].en, /T1w uses short TR and short TE; T2w uses long TR and long TE;.*PD.*long TR and short TE/)
assert.ok(fs.existsSync(`public${MRI_SPIN_ECHO_BLOCK.visual.src}`))
const spinSvg = fs.readFileSync(`public${MRI_SPIN_ECHO_BLOCK.visual.src}`, 'utf8')
assert.match(spinSvg, /90° excitation/)
assert.match(spinSvg, /180° refocus/)
assert.match(spinSvg, /echo at TE/)
assert.match(spinSvg, /T1w/)
assert.match(spinSvg, /T2w/)
for (const lang of langs) {
  const q = MRI_SPIN_ECHO_QUESTIONS.find(item => item.id === `mrt-spin-echo-${lang}-pd`)
  assert.ok(q && QUESTION_BANK[lang].some(item => item.id === q.id), `${lang}: spin echo MCQ registered`)
  assert.deepEqual(Object.keys(q.wrongExplanations).sort(), ['B', 'C', 'D'])
  assert.ok(MRI_SPIN_ECHO_FLASHCARDS.every(card => card.front[lang] && card.answer[lang]), `${lang}: localized cards`)
}
assert.ok(MCQ_TOPIC_GROUPS.includes(MRI_SPIN_ECHO_TOPIC_GROUP))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === MRI_SPIN_ECHO_FLASHCARD_TOPIC.id))
assert.equal(getCardsByTopic(MRI_SPIN_ECHO_FLASHCARD_TOPIC.id).length, MRI_SPIN_ECHO_FLASHCARDS.length)
assert.match(fs.readFileSync('docs/lesson-quality/technik-mri-spin-echo-p95-p99.md', 'utf8'), /Pages 95–99 were text-extracted and visually inspected/)
const spinCurriculum = fs.readFileSync('data/curriculum.js', 'utf8').match(/\{\s*id: 'mrt-spin-echo',[\s\S]*?\n\s*\}/)?.[0]
assert.ok(spinCurriculum)
assert.match(spinCurriculum, /link: '\/technik\/grundlagen#mrt'/)
assert.match(spinCurriculum, /flashcardLink: '\/flashcards\/mrt-spin-echo'/)
assert.match(fs.readFileSync('docs/lesson-quality/technik-mri-safety-p92-p94.md', 'utf8'), /OneDrive.*12,126,005/)

console.log('MRI artefacts and source-bounded safety mechanisms, localized assessment/cards, shared-shell SSR and curriculum links pass in DE/EN/FA.')
