import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const langs = ['de', 'en', 'fa']
const mri = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'mrt')
assert.ok(mri)
assert.deepEqual(mri.curriculumId, ['mrt-grundprinzip-signalbildung', 'mrt-bildqualitaet-artefakte-snr'])
assert.equal(mri.teachingBlocks.length, 3)
assert.deepEqual(mri.teachingBlocks.map(block => block.id), ['signal-formation', 'spatial-encoding', 'snr-tradeoffs'])

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
assert.match(mri.teachingBlocks[0].rows[0][1].en, /63%/)
assert.match(mri.teachingBlocks[0].rows[1][1].en, /37%/)
assert.match(mri.teachingBlocks[1].rows[2][1].en, /k-space/)
assert.match(mri.teachingBlocks[2].rows[1][1].en, /square root/)
assert.match(mri.teachingBlocks[2].supplement.en, /Supplement to the PDF/)
assert.match(mri.teachingBlocks[2].supplement.en, /more averages increase SNR and scan time/)
assert.equal(mri.teachingBlocks[2].references[0].href, 'https://doi.org/10.1002/mrm.1910360327')
for (const block of mri.teachingBlocks) assert.ok(fs.existsSync(`public${block.visual.src}`), `${block.visual.src} must exist`)

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
  assert.ok(html.includes(mri.teachingBlocks[0].title[lang]))
  assert.ok(html.includes(mri.teachingBlocks[1].title[lang]))
  assert.ok(html.includes(mri.teachingBlocks[2].title[lang]))
  assert.ok(html.includes('/technik/mri-signal-encoding.svg'))
  assert.ok(html.includes('/technik/mri-snr-tradeoffs.svg'))
  assert.ok(html.includes(lang === 'fa' ? 'خودآزمایی: کدگذاری مکانی و SNR' : lang === 'en' ? 'Self-check: spatial encoding and SNR' : 'Selbstcheck: Ortskodierung und SNR'))
  assert.ok(html.includes('aria-label=') && html.includes('data-lesson-progress-managed="true"'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع:' : lang === 'en' ? 'Source:' : 'Quelle:'))
  assert.ok(html.includes('role="status"') === false, 'feedback is hidden until a learner selects an answer')
  assert.ok(html.includes(lang === 'fa' ? '۳: پیکسل/وکسل کوچک‌تر' : lang === 'en' ? '3: Smaller pixels/voxels' : '3: Kleinere Pixel/Voxel'))
  assert.ok(html.includes('https://doi.org/10.1002/mrm.1910360327'))
  assert.ok(html.includes(lang === 'fa' ? 'رابطهٔ تکمیلی (در PDF نیامده است)' : lang === 'en' ? 'Supplemental relationship (not stated in the PDF)' : 'Zusatzbeziehung (nicht aus der PDF)'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع تکمیلی:' : lang === 'en' ? 'Supplemental source:' : 'Ergänzende Quelle:'))
  assert.ok(html.includes(lang === 'fa' ? 'سیگنال قابل‌اندازه‌گیری' : lang === 'en' ? 'measurable signal' : 'messbare Signal'))
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
for (const id of mri.curriculumId) {
  const entry = curriculum.match(new RegExp(`\\{\\s*id: '${id}',[\\s\\S]*?\\n\\s*\\}`))?.[0]
  assert.ok(entry, `curriculum entry ${id} must exist`)
  assert.match(entry, /link: '\/technik\/grundlagen#mrt'/, `${id} must link to the MRI section`)
  assert.match(entry, /inProgress: true/, `${id} must remain in progress`)
}
for (const asset of ['public/technik/mri-signal-encoding.svg', 'public/technik/mri-snr-tradeoffs.svg']) {
  assert.match(fs.readFileSync(asset, 'utf8'), /<svg/)
}
const routeSource = fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8')
assert.match(routeSource, /function MRIKnowledgeCheck/)
assert.match(routeSource, /answer === copy\.answer \? copy\.correct : copy\.retry/)
for (const phrase of ['Relaxation after RF', 'Spatial encoding', 'Slice selection', 'Phase encoding', 'Frequency encoding', 'More signal', 'Less noise', 'relative trend']) {
  assert.doesNotMatch(fs.readFileSync('public/technik/mri-signal-encoding.svg', 'utf8'), new RegExp(phrase, 'i'))
  assert.doesNotMatch(fs.readFileSync('public/technik/mri-snr-tradeoffs.svg', 'utf8'), new RegExp(phrase, 'i'))
}
console.log('MRI fundamentals, spatial encoding, SNR trade-offs and localized render passed in DE/EN/FA.')
