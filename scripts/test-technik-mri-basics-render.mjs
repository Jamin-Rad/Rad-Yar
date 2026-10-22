import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { MRI_SIGNAL_TOPIC, MRI_QUALITY_TOPIC, MRI_SIGNAL_BLOCK, MRI_QUALITY_BLOCK } from '../data/technikMRIFundamentalsLesson.js'
import { MRI_SPIN_ECHO_BLOCK, MRI_SPIN_ECHO_QUESTIONS, MRI_SPIN_ECHO_FLASHCARDS } from '../data/technikMriSpinEchoLesson.js'
import { MRI_GRADIENT_ECHO_BLOCK, MRI_GRADIENT_ECHO_QUESTIONS, MRI_GRADIENT_ECHO_FLASHCARDS, MRI_GRADIENT_ECHO_TOPIC_GROUP, MRI_GRADIENT_ECHO_FLASHCARD_TOPIC } from '../data/technikMriGradientEchoLesson.js'

const langs = ['de', 'en', 'fa']
const mri = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt')
assert.ok(mri)
assert.equal(mri.teachingBlocks.length, 7)
assert.deepEqual(mri.teachingBlocks.map(block => block.id), ['mri-resonance-signal', 'mri-field-coil-shimming', 'signal-formation', 'spatial-encoding', 'snr-tradeoffs', 'mri-spin-echo-tr-te', 'mri-gradient-echo-swi'])
assert.ok(mri.curriculumId.includes(MRI_SIGNAL_TOPIC.id) && mri.curriculumId.includes(MRI_QUALITY_TOPIC.id) && mri.curriculumId.includes('mrt-spin-echo') && mri.curriculumId.includes('mrt-gradient-echo'))
assert.ok(mri.teachingBlocks.includes(MRI_SPIN_ECHO_BLOCK))
assert.ok(mri.teachingBlocks.includes(MRI_GRADIENT_ECHO_BLOCK))
assert.equal(MRI_GRADIENT_ECHO_BLOCK.rows.length, 7)
assert.equal(MRI_GRADIENT_ECHO_QUESTIONS.length, 3)
assert.equal(MRI_GRADIENT_ECHO_FLASHCARDS.length, 4)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[3][1].en, /depend on vendor, B₀, sequence and processing/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[4][1].en, /exact slice location/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[5][1].en, /not identical implementations/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[5][1].en, /dynamic contrast imaging\/overviews.*morphological neuro MRI and 3D surgical planning/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[6][1].en, /SE has qualitatively higher SNR and SAR/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.rows[3][1].en, /may help distinguish paramagnetic blood products from diamagnetic calcification/)
assert.match(MRI_GRADIENT_ECHO_QUESTIONS[0].options[1].text, /vollständig refokussiert.*reinen T2-Kontrast/)
assert.match(MRI_GRADIENT_ECHO_BLOCK.note.en, /not an independently identified diagnostic case/)
assert.ok(MCQ_TOPIC_GROUPS.includes(MRI_GRADIENT_ECHO_TOPIC_GROUP))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === MRI_GRADIENT_ECHO_FLASHCARD_TOPIC.id))
assert.equal(getCardsByTopic(MRI_GRADIENT_ECHO_FLASHCARD_TOPIC.id).length, MRI_GRADIENT_ECHO_FLASHCARDS.length)
assert.ok(MRI_GRADIENT_ECHO_QUESTIONS.every(item => item.correct === 'A' && item.options.length === 4 && Object.keys(item.wrongExplanations).length === 3))
assert.match(MRI_SPIN_ECHO_BLOCK.rows[0][1].en, /180° pulse reverses their relative phase/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[0][1].en, /one echo per TR makes conventional SE longer/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[1][1].en, /long TR and short TE/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[5][1].en, /Rotating k-space strips repeatedly sample the center/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[5][1].en, /repeatedly sample the center, supporting retrospective motion correction/)
assert.equal(MRI_SPIN_ECHO_QUESTIONS.length, 3)
assert.equal(MRI_SPIN_ECHO_FLASHCARDS.length, 4)
assert.ok(MRI_SPIN_ECHO_FLASHCARDS.some(card => card.id === 'mrt-spin-echo-haste'))
assert.match(MRI_SPIN_ECHO_BLOCK.rows[4][1].en, /HASTE is a single-shot TSE variant/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[5][1].en, /Rotating k-space strips repeatedly sample the center/)
assert.match(MRI_SPIN_ECHO_BLOCK.rows[6][1].en, /PD uses long TR and short TE/)
for (const lang of langs) {
  const svgPath = `public${MRI_SPIN_ECHO_BLOCK.visual.srcLocalized[lang]}`
  assert.ok(fs.existsSync(svgPath), `${lang}: localized spin-echo diagram exists`)
  const svg = fs.readFileSync(svgPath, 'utf8')
  assert.match(svg, new RegExp(lang === 'de' ? 'Refokussierung' : lang === 'en' ? 'refocus' : 'بازفازدهی'))
  assert.match(svg, new RegExp(lang === 'de' ? 'Gewichtung' : lang === 'en' ? 'Weighting' : 'وزن‌دهی'))
  const title = svg.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? ''
  const desc = svg.match(/<desc[^>]*>(.*?)<\/desc>/s)?.[1] ?? ''
  assert.ok(title && desc, `${lang}: SVG title and description are present`)
  const allSvgText = `${title} ${desc} ${[...svg.matchAll(/<text[^>]*>(.*?)<\/text>/gs)].map(match => match[1]).join(' ')}`
  if (lang === 'de') {
    assert.match(title, /Spin-Echo/)
    assert.match(desc, /Anregung.*Refokussierung/)
    assert.match(allSvgText, /TR \(von 90° bis zur nächsten 90°-Anregung\)/)
    assert.doesNotMatch(allSvgText, /from 90°|next excitation|qualitative weighting/i)
  } else if (lang === 'en') {
    assert.match(title, /Spin echo/)
    assert.match(desc, /excitation.*refocusing/)
    assert.match(allSvgText, /TR \(from 90° to next 90°\)/)
  } else {
    assert.match(title, /اسپین‌اکو/)
    assert.match(desc, /تحریک.*بازفازدهی/)
    assert.match(allSvgText, /TR \(از تحریک ۹۰° تا تحریک بعدی\)/)
    assert.doesNotMatch(allSvgText, /from 90°|next excitation|qualitative weighting/i)
  }
}
for (const lang of langs) {
  const svgPath = `public${MRI_GRADIENT_ECHO_BLOCK.visual.srcLocalized[lang]}`
  assert.ok(fs.existsSync(svgPath), `${lang}: localized GRE diagram exists`)
  const svg = fs.readFileSync(svgPath, 'utf8')
  const title = svg.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? ''
  const desc = svg.match(/<desc[^>]*>(.*?)<\/desc>/s)?.[1] ?? ''
  assert.ok(title && desc, `${lang}: SVG title and description are present`)
  const allSvgText = `${title} ${desc} ${[...svg.matchAll(/<text[^>]*>(.*?)<\/text>/gs)].map(match => match[1]).join(' ')}`
  assert.match(allSvgText, lang === 'de' ? /HF|Gradient|Echo|TE/ : lang === 'en' ? /RF|gradient|echo|TE/ : /RF|گرادیان|اکو|TE/)
}

for (const [topicId, block] of [[MRI_SIGNAL_TOPIC.id, MRI_SIGNAL_BLOCK], [MRI_QUALITY_TOPIC.id, MRI_QUALITY_BLOCK]]) {
  assert.ok(mri.teachingBlocks.includes(block))
  assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === topicId), `${topicId}: MCQ topic registered`)
  assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === topicId), `${topicId}: card topic registered`)
  assert.ok(getCardsByTopic(topicId).length > 0, `${topicId}: cards available`)
  assert.ok(fs.existsSync(`public${block.visual.src}`), `${block.visual.src} exists`)
  assert.equal(block.visual.legend.length, topicId === MRI_SIGNAL_TOPIC.id ? 4 : 3, `${topicId}: localized numbered legend`)
}

function inspect(value, path = 'mri') {
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) {
      assert.equal(typeof value[lang], 'string', `${path}.${lang}`)
      assert.ok(value[lang].trim(), `${path}.${lang} must not be empty`)
      if (lang !== 'fa') assert.ok(!/[\u0600-\u06ff]/u.test(value[lang]), `${path}.${lang} contains Persian script`)
    }
    return
  }
  for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`)
}
inspect(mri)
assert.match(mri.teachingBlocks[2].rows[0][1].en, /63%/)
assert.match(mri.teachingBlocks[2].rows[1][1].en, /37%/)
assert.match(mri.teachingBlocks[3].rows[2][1].en, /k-space/)
assert.match(mri.teachingBlocks[4].rows[1][1].en, /square root/)
assert.match(mri.teachingBlocks[4].supplement.en, /Supplement to the PDF/)
assert.match(mri.teachingBlocks[4].supplement.en, /more averages increase SNR and scan time/)
assert.equal(mri.teachingBlocks[4].references[0].href, 'https://doi.org/10.1002/mrm.1910360327')
for (const block of mri.teachingBlocks) assert.ok(fs.existsSync(`public${block.visual.src}`), `${block.visual.src} must exist`)
assert.match(MRI_SIGNAL_BLOCK.rows[0][1].en, /Larmor frequency/)
assert.match(MRI_SIGNAL_BLOCK.rows[1][1].en, /brings spins into phase/)
for (const lang of langs) {
  const afterRf = MRI_SIGNAL_BLOCK.rows[2][1][lang]
  assert.match(afterRf, lang === 'de' ? /Zeitverläufe unterscheiden sich/ : lang === 'en' ? /time courses differ/ : /روند زمانی آن‌ها با نوع بافت تفاوت دارد/)
  assert.doesNotMatch(afterRf, /already shown|already explained|bereits erklärt|پیش‌تر آمده/)
}
assert.match(MRI_QUALITY_BLOCK.rows[2][1].en, /sensitivity region/)
assert.match(MRI_QUALITY_BLOCK.rows[3][1].en, /compensates for B₀ deviations/)
for (const lang of langs) {
  for (const [topicId, stem] of [[MRI_SIGNAL_TOPIC.id, 'mrt-signal'], [MRI_QUALITY_TOPIC.id, 'mrt-quality']]) {
    const question = QUESTION_BANK[lang].find(item => item.id.startsWith(`${stem}-${lang}-`))
    assert.ok(question, `${lang}: ${topicId} MCQ registered`)
    assert.equal(question.correct, 'A')
    assert.equal(question.options.length, 4)
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B','C','D'])
    for (const explanation of Object.values(question.wrongExplanations)) assert.ok(explanation.length > 45)
  }
  for (const topicId of [MRI_SIGNAL_TOPIC.id, MRI_QUALITY_TOPIC.id]) {
    const cards = getCardsByTopic(topicId)
    assert.ok(cards.every(card => card.front[lang] && card.answer[lang]), `${lang}: ${topicId} cards localized`)
  }
}

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
const replacements = {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside', null, 'in progress') },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}
const Page = compileJsx('app/technik/grundlagen/StandardPage.jsx', replacements).default
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  for (const block of mri.teachingBlocks) assert.ok(html.includes(block.title[lang]), `${lang}: rendered ${block.id}`)
  const signalBlockAt = html.indexOf(MRI_SIGNAL_BLOCK.title[lang])
  const qualityBlockAt = html.indexOf(MRI_QUALITY_BLOCK.title[lang])
  const relaxationBlockAt = html.indexOf(mri.teachingBlocks[2].title[lang])
  assert.ok(signalBlockAt >= 0 && qualityBlockAt > signalBlockAt && relaxationBlockAt > qualityBlockAt, `${lang}: rendered order matches the ledger`)
  assert.ok(html.includes(MRI_SIGNAL_BLOCK.visual.src) && html.includes(MRI_SIGNAL_BLOCK.visual.alt[lang]))
  assert.ok(html.includes(MRI_QUALITY_BLOCK.visual.src) && html.includes(MRI_QUALITY_BLOCK.visual.alt[lang]))
  for (const key of [...MRI_SIGNAL_BLOCK.visual.legend, ...MRI_QUALITY_BLOCK.visual.legend]) assert.ok(html.includes(key[lang]), `${lang}: localized visual key`)
  assert.ok(html.includes('/technik/mri-signal-encoding.svg'))
  assert.ok(html.includes('/technik/mri-snr-tradeoffs.svg'))
  assert.ok(html.includes(lang === 'fa' ? 'خودآزمایی: کدگذاری مکانی و SNR' : lang === 'en' ? 'Self-check: spatial encoding and SNR' : 'Selbstcheck: Ortskodierung und SNR'))
  assert.ok(html.includes('aria-label=') && html.includes('data-lesson-progress-managed="true"'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع:' : lang === 'en' ? 'Source:' : 'Quelle:'))
  assert.ok(html.includes('role="status"') === false, 'feedback is hidden until a learner selects an answer')
  assert.ok(html.includes(lang === 'fa' ? '۳: پیکسل/وکسل کوچک‌تر' : lang === 'en' ? '3: Smaller pixels/voxels' : '3: Kleinere Pixel/Voxel'))
  assert.ok(html.includes(lang === 'fa' ? 'تمرین مبانی MRI' : lang === 'en' ? 'Practise MRI fundamentals' : 'MRT-Grundlagen üben'))
  const from = lang === 'de' ? '%2Ftechnik%2Fgrundlagen%23mrt' : `%2Ftechnik%2Fgrundlagen%3Flang%3D${lang}%23mrt`
  assert.ok(html.includes(`themen=mrt-grundprinzip-signalbildung,mrt-spin-echo,mrt-gradient-echo,mrt-bildqualitaet-artefakte-snr&amp;from=${from}`), `${lang}: linked dual-topic quiz returns to MRI section`)
  assert.ok(html.includes(`/flashcards/mrt-grundprinzip-signalbildung?from=${from}`), `${lang}: signal cards return to MRI section`)
  assert.ok(html.includes(`/flashcards/mrt-bildqualitaet-artefakte-snr?from=${from}`), `${lang}: quality cards return to MRI section`)
  assert.ok(html.includes(`/flashcards/mrt-spin-echo?from=${from}`), `${lang}: spin-echo cards return to MRI section`)
  assert.ok(html.includes(`/flashcards/mrt-gradient-echo?from=${from}`), `${lang}: GRE cards return to MRI section`)
  assert.ok(html.includes(MRI_SPIN_ECHO_BLOCK.visual.srcLocalized[lang]), `${lang}: localized spin-echo SVG is rendered`)
  assert.ok(html.includes(MRI_SPIN_ECHO_BLOCK.visual.alt[lang]))
  assert.ok(html.includes(MRI_GRADIENT_ECHO_BLOCK.title[lang]), `${lang}: GRE block is rendered`)
  assert.ok(html.includes(MRI_GRADIENT_ECHO_BLOCK.visual.srcLocalized[lang]), `${lang}: localized GRE SVG is rendered`)
  assert.ok(html.includes(MRI_GRADIENT_ECHO_BLOCK.visual.alt[lang]))
  assert.ok(html.includes('https://doi.org/10.1002/mrm.1910360327'))
  assert.ok(html.includes(lang === 'fa' ? 'رابطهٔ تکمیلی (در PDF نیامده است)' : lang === 'en' ? 'Supplemental relationship (not stated in the PDF)' : 'Zusatzbeziehung (nicht aus der PDF)'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع تکمیلی:' : lang === 'en' ? 'Supplemental source:' : 'Ergänzende Quelle:'))
  assert.ok(html.includes(lang === 'fa' ? 'سیگنال قابل‌اندازه‌گیری' : lang === 'en' ? 'measurable signal' : 'messbare Signal'))
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
for (const id of [MRI_SIGNAL_TOPIC.id, MRI_QUALITY_TOPIC.id]) {
  const entry = curriculum.match(new RegExp(`\\{\\s*id: '${id}',[\\s\\S]*?\\n\\s*\\}`))?.[0]
  assert.ok(entry, `curriculum entry ${id} must exist`)
  assert.match(entry, /link: '\/technik\/grundlagen#mrt'/, `${id} must link to the MRI section`)
  assert.match(entry, /inProgress: true/, `${id} must remain in progress`)
  assert.match(entry, new RegExp(`mcqLink: '\\/ueben\\/quiz\\?fach=technik&n=1&themen=${id}'`), `${id} must link its MCQ`)
  assert.match(entry, new RegExp(`flashcardLink: '\\/flashcards\\/${id}'`), `${id} must link its cards`)
}
for (const asset of ['public/technik/mri-signal-encoding.svg', 'public/technik/mri-snr-tradeoffs.svg', 'public/technik/mri-resonance-signal.svg', 'public/technik/mri-field-shimming.svg']) {
  assert.match(fs.readFileSync(asset, 'utf8'), /<svg/)
}
const resonanceSvg = fs.readFileSync('public/technik/mri-resonance-signal.svg', 'utf8')
assert.match(resonanceSvg, /id="coherent-vectors" aria-label="Phase-coherent transverse vectors aligned in one direction"/)
const vectorLines = [...resonanceSvg.matchAll(/<line class="coherent-vector" x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"\/>/g)]
assert.ok(vectorLines.length >= 4, 'coherence panel has multiple vectors')
const vectorDeltas = vectorLines.map(([, x1, y1, x2, y2]) => [Number(x2) - Number(x1), Number(y2) - Number(y1)])
assert.ok(vectorDeltas.every(([dx, dy]) => dx === 0 && dy === vectorDeltas[0][1] && dy < 0), 'coherent vectors point in the same direction')
const routeSource = fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8')
assert.match(routeSource, /function MRIKnowledgeCheck/)
assert.match(routeSource, /answer === copy\.answer \? copy\.correct : copy\.retry/)
for (const phrase of ['Relaxation after RF', 'Spatial encoding', 'Slice selection', 'Phase encoding', 'Frequency encoding', 'More signal', 'Less noise', 'relative trend']) {
  assert.doesNotMatch(fs.readFileSync('public/technik/mri-signal-encoding.svg', 'utf8'), new RegExp(phrase, 'i'))
  assert.doesNotMatch(fs.readFileSync('public/technik/mri-snr-tradeoffs.svg', 'utf8'), new RegExp(phrase, 'i'))
}
console.log('MRI fundamentals, spatial encoding, SNR trade-offs and localized render passed in DE/EN/FA.')
