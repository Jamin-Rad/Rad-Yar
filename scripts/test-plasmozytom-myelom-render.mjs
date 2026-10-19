import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { PLASMOZYTOM_MYELOM_LESSON as lesson } from '../data/plasmozytomMyelomLesson.js'

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
const Page = compileExports('app/msk/tumoren/plasmozytom-myelom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/plasmozytomMyelomLesson': { PLASMOZYTOM_MYELOM_LESSON: lesson },
  './page.module.css': styles,
}).default
function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (Object.keys(value).some(locale => ['de', 'en', 'fa'].includes(locale))) {
    for (const locale of ['de', 'en', 'fa']) assert.ok(typeof value[locale] === 'string' && value[locale].trim().length > 0, `${key}.${locale} translated`)
    return
  }
  for (const [childKey, child] of Object.entries(value)) assertLocalized(child, `${key}.${childKey}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'plasmozytom-myelom')
assert.equal(lesson.sections.length, 4)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.match(lesson.sourceNote.de, /97–99.*96–98/)
assert.ok(!JSON.stringify(lesson).includes('5 %'))
assert.ok(!JSON.stringify(lesson).includes('30–50 %'))
assert.ok(!JSON.stringify(lesson).includes('heute der Goldstandard'))
assert.ok(!JSON.stringify(lesson).includes('detects lesions already at < 5'))
assert.ok(!JSON.stringify(lesson).includes('Röntgen erst ab 30'))
assert.match(lesson.sections[0].rows[0][1].en, /first-line/i)
assert.match(lesson.sections[2].images[0].caption.en, /not labelled/i)
assert.match(lesson.sections[3].title.en, /suspected solitary plasmacytoma/i)
assert.match(lesson.sections[3].rows[0][1].en, /whole-body MRI with DWI/i)
assert.match(lesson.sections[3].rows[1][1].en, /PET\/CT is preferred/i)
assert.match(lesson.sections[3].rows[0][0].fa, /پلاسماسیتوم منفرد استخوانی/)
assert.match(lesson.sections[3].rows[1][0].fa, /پلاسماسیتوم منفرد خارج از مغز استخوان \(بافت نرم\)/)
assert.match(lesson.sections[3].note.en, /imaging-focused summary of the 2026 IMWG/i)
assert.match(lesson.sections[1].images[0].caption.en, /rID 14104/)
assert.match(lesson.sections[1].images[1].caption.en, /12559.*9962/)
assert.match(lesson.sections[2].images[0].caption.en, /rID 208317/)
assert.match(lesson.references[1].href, /pubmed\.ncbi\.nlm\.nih\.gov/)
assert.match(lesson.references[2].href, /JCO-26-00410/)
assert.match(lesson.sections[1].rows[0][0].fa, /سقف جمجمه/)
assert.match(lesson.sections[1].rows[1][1].fa, /فرسایش قاشقی سطح اندوست/)
assert.match(lesson.sections[1].images[1].alt.fa, /شرح جزئی‌تری ارائه نمی‌دهد/)
assert.match(fs.readFileSync('public/educational/plasmozytom-myelom/hero.svg', 'utf8'), /<svg/)
const provenance = JSON.parse(fs.readFileSync('public/educational/plasmozytom-myelom/image-provenance.json', 'utf8'))
assert.equal(provenance.assets.length, 4)
for (const item of provenance.assets.slice(1)) assert.ok(fs.statSync(`public/educational/plasmozytom-myelom/${item.file}`).size > 20000, `${item.file} exists`)

await fs.promises.mkdir('tmp/plasmozytom-myelom-review', { recursive: true })
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale}: translated title`)
  assert.ok(html.includes(lesson.sourceNote[locale]), `${locale}: source scope`)
  assert.ok(html.includes('/educational/plasmozytom-myelom/hero.svg'), `${locale}: hero image`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`) && html.includes(section.title[locale]), `${locale}: section ${section.id}`)
    for (const image of section.images || []) assert.ok(html.includes(image.src) && html.includes(image.alt[locale]) && html.includes(image.caption[locale]), `${locale}: localized image evidence ${image.src}`)
  }
  for (const reference of lesson.references.filter(item => item.href)) assert.ok(html.includes(reference.href), `${locale}: primary source link`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale}: self-check`)
  assert.ok(lesson.check.feedback[locale].length > 30 && lesson.check.retry[locale].length > 20, `${locale}: explanatory response data`)
  assert.ok(html.includes(lesson.summary[0][locale]), `${locale}: take-home rules`)
  assert.ok(!html.includes('role="status"'), 'answer feedback is conditional until an answer is chosen')
  assert.ok(html.includes('myeloma-modality-check'), `${locale}: named response group`)
  await sharp(`public/educational/plasmozytom-myelom/hero.svg`).png().toFile(`tmp/plasmozytom-myelom-review/hero-${locale}.png`)
}
assert.match(fs.readFileSync('app/msk/tumoren/plasmozytom-myelom/page.jsx', 'utf8'), /role="status"/)
console.log('Myeloma bounded SSR PASS: DE/EN/FA and RTL, all source-image captions/alt text, references, lesson scope, case IDs, answer feedback wiring, and media provenance. Independent, browser, and scientific review remain open.')
