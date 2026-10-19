import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { MORBUS_PERTHES_LESSON as lesson } from '../data/morbusPerthesLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compileExports(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const Shell = compileExports('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compileExports('app/msk/osteochondrosen/morbus-perthes/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/morbusPerthesLesson': { MORBUS_PERTHES_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(lang => Object.hasOwn(value, lang))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${key}.${lang} missing`)
    return
  }
  for (const [name, child] of Object.entries(value)) assertLocalized(child, `${key}.${name}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'morbus-perthes')
assert.equal(lesson.sections.length, 5)
assert.equal(lesson.stages.length, 5)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.match(lesson.notice.de, /15 Minuten/)
assert.match(lesson.notice.en, /15 months/)
assert.match(lesson.notice.fa, /۱۵ دقیقه/)
assert.doesNotMatch(lesson.notice.de, / Radiopaedia.*reproduziert/)
assert.match(lesson.differentials[1][1].en, /synchronous and relatively symmetric/)
assert.match(lesson.mri[0].en, /most sensitive early diagnostic/)
assert.match(lesson.features.at(-1).de, /meist einseitig/)
assert.match(lesson.features.at(-1).fa, /یک‌طرفه/)
assert.match(lesson.mri[3].fa, /افزایش جذب مادهٔ حاجب/)
assert.doesNotMatch(lesson.mri[3].fa, /افزایش سیگنال حاشیه‌ای/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'morbus-perthes'[^\n]*link: '\/msk\/osteochondrosen\/morbus-perthes'/, 'curriculum route is linked')
assert.equal(lesson.radiographSeries.length, 3)
assert.deepEqual(lesson.radiographSeries.map(item => item.period.en), ['Initial phase', 'After 2 months', 'After 10 months'])
assert.equal(lesson.radiographSeries[0].src, '/educational/perthes/rid-9742-initial.jpg')
for (const item of lesson.radiographSeries) assert.ok(fs.existsSync(`public${item.src}`), `${item.src} crop exists`)
assert.match(fs.readFileSync('public/educational/perthes-hero.svg', 'utf8'), /<svg/)
assert.match(fs.readFileSync('docs/lesson-quality/morbus-perthes-p124-p127.md', 'utf8'), /Radiopaedia rID 9742/)

await fs.promises.mkdir('tmp/perthes-review', { recursive: true })
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} lang and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes('/educational/perthes-hero.svg'), `${locale} hero asset`)
  assert.ok(html.includes(lesson.notice[locale]) && html.includes('MSK.pdf'), `${locale} explicit source scope`)
  assert.ok(html.includes('H. Salam') && html.includes('rID 9742') && html.includes('https://doi.org/10.53347/rID-9742'), `${locale} case credit`)
  const sourceNote = { de: 'Drei klar beschriftete Zeitpunkte des Radiopaedia-Falls rID 9742', en: 'Three clearly labelled time points from Radiopaedia case rID 9742', fa: 'سه زمانِ دارای برچسب روشن از کیس Radiopaedia با شناسهٔ rID 9742' }[locale]
  assert.ok(html.includes(sourceNote), `${locale} source note describes the included case images`)
  assert.ok(html.includes(locale === 'fa' ? 'direction="rtl"' : 'direction="ltr"'), `${locale} timeline SVG direction`)
  assert.ok(html.includes(lesson.check.question[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} retrieval check content`)
  assert.ok(lesson.check.feedback[locale].length > 40, `${locale} explanatory feedback exists`)
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/19843759/'), `${locale} imaging citation`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`), `${locale} section ${section.id}`)
  for (const item of [...lesson.features, ...lesson.radiograph, ...lesson.mri, ...lesson.takeHome]) assert.ok(html.includes(item[locale]), `${locale} content unit`)
  for (const item of lesson.radiographSeries) {
    assert.ok(html.includes(item.src), `${locale} localized image src`)
    assert.ok(html.includes(item.alt[locale]) && html.includes(item.period[locale]), `${locale} image alt and caption`)
  }
  assert.ok(!html.includes('rid-9742-15') && !html.includes('After 15'), `${locale} contradictory final panel omitted`)
  const svg = html.match(/<svg viewBox="0 0 1000 235"[\s\S]*?<\/svg>/)?.[0]
  assert.ok(svg, `${locale} custom timeline diagram`)
  await sharp(Buffer.from(svg)).png().toFile(`tmp/perthes-review/timeline-${locale}.png`)
}
console.log('Morbus Perthes bounded SSR PASS: DE/EN/FA, RTL, StandardLessonShell, source boundary, five source-labelled temporal phases, accessible custom schematic, differential, retrieval feedback and independent imaging citations. Browser and clinical review remain open.')
