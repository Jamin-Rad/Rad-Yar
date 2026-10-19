import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { EWING_SARKOM_LESSON as lesson } from '../data/ewingSarkomLesson.js'

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
const Page = compileExports('app/msk/tumoren/ewing-sarkom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/ewingSarkomLesson': { EWING_SARKOM_LESSON: lesson },
  './page.module.css': styles,
}).default
function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (Object.keys(value).some(locale => ['de', 'en', 'fa'].includes(locale))) {
    for (const locale of ['de', 'en', 'fa']) assert.ok(typeof value[locale] === 'string' && value[locale].length > 0, `${key}.${locale} translated`)
    return
  }
  for (const [childKey, child] of Object.entries(value)) assertLocalized(child, `${key}.${childKey}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'ewing-sarkom')
assert.equal(lesson.sections.length, 5)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.match(lesson.sections[1].rows[1][1].en, /not diagnostic/i)
assert.match(lesson.sections[2].imageCaption.en, /sequence.*not labelled/i)
assert.match(lesson.sections[3].rows[0][0].de, /Osteomyelitis/)
assert.match(lesson.sections[4].lead.en, /chest CT/)
assert.match(fs.readFileSync('public/educational/ewing-sarkom/hero.svg', 'utf8'), /<svg/)
const caseImagePath = 'public/educational/ewing-sarkom/rid-27379-source-case.jpg'
assert.ok(fs.existsSync(caseImagePath) && fs.statSync(caseImagePath).size > 10000, 'source case crop exists')
const provenance = JSON.parse(fs.readFileSync('public/educational/ewing-sarkom/image-provenance.json', 'utf8'))
assert.equal(provenance.assets.find(asset => asset.file === 'rid-27379-source-case.jpg').radiopaediaId, 'rID 27379')
assert.match(provenance.assets.find(asset => asset.file === 'rid-27379-source-case.jpg').licenseClaim, /No external contributor or Radiopaedia licence verification is claimed/)
assert.match(lesson.sourceNote.en, /current classification summarized by NCI PDQ/)

await fs.promises.mkdir('tmp/ewing-review', { recursive: true })
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale}: localized title`)
  assert.ok(html.includes(lesson.sourceNote[locale]) && html.includes('MSK.pdf'), `${locale}: source scope`)
  assert.ok(html.includes('/educational/ewing-sarkom/hero.svg'), `${locale}: hero`)
  const imageSection = lesson.sections[2]
  assert.ok(html.includes(imageSection.image) && html.includes(imageSection.imageAlt[locale]) && html.includes(imageSection.imageCaption[locale]), `${locale}: localized source-image alt and caption`)
  assert.ok(html.includes('rID 27379'), `${locale}: case attribution`)
  assert.ok(html.includes('https://www.cancer.gov/types/bone/hp/ewing-treatment-pdq'), `${locale}: current classification and staging reference`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale}: self-check`)
  assert.ok(lesson.check.feedback[locale].length > 40 && lesson.check.retry[locale].length > 20, `${locale}: explanatory feedback and retry`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`) && html.includes(section.title[locale]), `${locale}: ${section.id}`)
  assert.ok(html.includes('role="img"') && html.includes(lesson.sections[0].rows[0][1][locale]), `${locale}: teaching schematic and table`)
  assert.ok(html.includes(lesson.summary[0][locale]), `${locale}: summary`)
  const svg = html.match(/<svg viewBox="0 0 720 390"[\s\S]*?<\/svg>/)?.[0]
  assert.ok(svg, `${locale}: inline diagram SVG`)
  await sharp(Buffer.from(svg)).png().toFile(`tmp/ewing-review/diagram-${locale}.png`)
}
console.log('Ewing sarcoma bounded SSR PASS: DE/EN/FA, RTL attributes, localized content, source-image alt/caption and provenance, self-check feedback, renderable schematic. Independent review passed; browser UX and clinician review remain open.')
