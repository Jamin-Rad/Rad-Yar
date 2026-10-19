import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { OSTEOSARKOM_LESSON as lesson } from '../data/osteosarkomLesson.js'

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
const Page = compileExports('app/msk/tumoren/osteosarkom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/osteosarkomLesson': { OSTEOSARKOM_LESSON: lesson },
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
assert.equal(lesson.id, 'osteosarkom')
assert.equal(lesson.sections.length, 4)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.match(lesson.sections[1].note.de, /pathognomonisch/)
assert.match(lesson.sections[1].note.en, /too absolute/)
assert.match(lesson.sections[1].note.fa, /بیش از حد قطعی/)
assert.match(lesson.sections[2].rows[3][1].de, /Thorax-CT/)
assert.match(lesson.sections[3].rows[2][1].en, /Fluid-fluid levels alone do not exclude/)
assert.equal(lesson.references.filter(item => item.href).length, 4)
assert.match(fs.readFileSync('public/educational/osteosarkom/hero.svg', 'utf8'), /<svg/)
const caseImagePath = 'public/educational/osteosarkom/rid-231551-knee-xray-ct.png'
assert.ok(fs.existsSync(caseImagePath) && fs.statSync(caseImagePath).size > 10000, 'source case crop exists')
const provenance = JSON.parse(fs.readFileSync('public/educational/osteosarkom/image-provenance.json', 'utf8'))
assert.equal(provenance.assets.find(asset => asset.file === 'rid-231551-knee-xray-ct.png').radiopaediaId, 'rID 231551')
assert.match(provenance.assets.find(asset => asset.file === 'rid-231551-knee-xray-ct.png').licenseClaim, /No external contributor or Radiopaedia licence verification is claimed/)
assert.match(provenance.assets.find(asset => asset.file === 'rid-231551-knee-xray-ct.png').panels[1], /based on displayed image appearance/)
assert.match(lesson.sections[1].imageCaption.en, /the PDF page does not caption the panels individually/i)
assert.doesNotMatch(lesson.sections[1].imageCaption.en, /source labels|the source labels/i)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'osteosarkom'[^\n]*link: '\/msk\/tumoren\/osteosarkom'/)
assert.match(fs.readFileSync('docs/lesson-quality/msk-osteosarkom-p81-p83.md', 'utf8'), /rID 231551.*rID 31802/)

await fs.promises.mkdir('tmp/osteosarkom-review', { recursive: true })
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale}: localized title`)
  assert.ok(html.includes(lesson.sourceNote[locale]) && html.includes('MSK.pdf'), `${locale}: source scope`)
  assert.ok(html.includes('/educational/osteosarkom/hero.svg'), `${locale}: hero`)
  const example = lesson.sections[1]
  assert.ok(html.includes(example.image) && html.includes(example.imageAlt[locale]) && html.includes(example.imageCaption[locale]), `${locale}: localized source-image alt and caption`)
  assert.ok(html.includes('rID 231551'), `${locale}: source-image attribution`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale}: self-check`)
  assert.ok(lesson.check.feedback[locale].length > 50 && lesson.check.retry[locale].length > 20, `${locale}: explanatory feedback and retry`)
  assert.ok(html.includes('https://www.cancer.gov/types/bone/hp/osteosarcoma-treatment-pdq'), `${locale}: NCI source`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`) && html.includes(section.title[locale]), `${locale}: ${section.id}`)
  assert.ok(html.includes('role="img"') && html.includes(lesson.sections[1].rows[2][1][locale]), `${locale}: teaching schematic`)
  assert.ok(html.includes(lesson.summary[0][locale]), `${locale}: summary`)
  const svg = html.match(/<svg viewBox="0 0 720 390"[\s\S]*?<\/svg>/)?.[0]
  assert.ok(svg, `${locale}: inline diagram SVG`)
  await sharp(Buffer.from(svg)).png().toFile(`tmp/osteosarkom-review/diagram-${locale}.png`)
}
console.log('Osteosarcoma bounded SSR PASS: DE/EN/FA, RTL attributes, localized content and source-image alt/caption, provenance, curriculum link, self-check feedback and renderable schematic. Independent review/deltas PASS; browser and clinical review remain open.')
