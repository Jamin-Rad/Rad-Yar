import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { SIMPLE_BONE_CYST_LESSON as lesson } from '../data/mskSimpleBoneCystLesson.js'

const require = createRequire(import.meta.url)
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculumSource, /id: 'knochenzyste-simple'[^\n]*link: '\/msk\/tumoren\/einfache-knochenzyste'/)
let language = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, overrides) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(overrides, name) ? overrides[name] : require(name), mod, mod.exports)
  return mod.exports
}
const Shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-lesson-hero': 'true', 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/msk/tumoren/einfache-knochenzyste/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/mskSimpleBoneCystLesson': { SIMPLE_BONE_CYST_LESSON: lesson },
  './page.module.css': styles,
}).default

function localized(value, where='lesson') {
  if (Array.isArray(value)) return value.forEach((item,index)=>localized(item,`${where}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de','en','fa'].some(key=>Object.hasOwn(value,key))) {
    for (const key of ['de','en','fa']) assert.ok(typeof value[key]==='string' && value[key].trim(),`${where}.${key} missing`)
    return
  }
  for (const [key,child] of Object.entries(value)) localized(child,`${where}.${key}`)
}
localized(lesson)
assert.equal(lesson.id, 'msk-simple-bone-cyst')
assert.deepEqual(lesson.sections.map(section=>section.id), ['clinical-pattern','radiograph-mri','differential','management'])
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
const hero = fs.readFileSync('public/educational/simple-bone-cyst/hero.svg','utf8')
assert.match(hero, /<svg/); assert.match(hero, /Non-diagnostic illustration/)
for (const label of ['Metaphysis', 'Fluid cavity', 'Concept diagram']) assert.ok(!hero.includes(label), `hero has no untranslated visible text: ${label}`)
const provenance = JSON.parse(fs.readFileSync('public/educational/simple-bone-cyst/msk-p110-images.provenance.json','utf8'))
assert.equal(provenance.pdfPage, 110); assert.deepEqual(provenance.imageIds, ['rID 17146','rID 10361'])
assert.equal(provenance.contributors.find(item=>item.imageId==='rID 10361').name, 'A.Prof Frank Gaillard')
assert.equal(provenance.contributors.find(item=>item.imageId==='rID 17146').name, null)
for (const locale of ['de','en','fa']) {
  assert.match(lesson.sections[0].rows[3][1][locale], /Frakturrisiko|fracture risk|خطر شکستگی/)
  assert.match(lesson.sections[0].rows[3][1][locale], /Heilungspotenzial|healing potential|احتمال بیشتر بهبود/)
  assert.match(lesson.sections[3].rows[1][1][locale], /Knochenmarkaspiration|bone-marrow aspiration|آسپیراسیون/)
}
assert.match(lesson.check.options[1].en, /NOF remains a differential/)
assert.match(lesson.check.prompt.en, /focal fracture interrupts the cortex/)
assert.match(lesson.check.options[2].en, /if additional MRI showed fluid-fluid levels or septa/)
assert.match(lesson.check.options[2].en, /not provided in this vignette/)
const fractureWording = {
  de: ['Fraktur unterbricht die Kortikalis', 'abhängigem Kortikalisfragment'],
  en: ['focal fracture interrupts the cortex', 'dependent cortical fragment'],
  fa: ['شکستگی موضعی پیوستگی کورتکس را قطع کرده', 'قطعهٔ کورتیکال وابسته'],
}
for (const locale of ['de','en','fa']) {
  const text = `${lesson.check.prompt[locale]} ${lesson.check.feedback[locale]}`
  assert.ok(fractureWording[locale].every(phrase => text.includes(phrase)), `${locale} separates cortical thinning from the focal fracture`)
}
for (const file of ['Image1109.jpg','Image1110.jpg']) {
  const meta = await sharp(`public/educational/simple-bone-cyst/${file}`).metadata()
  assert.ok(meta.width >= 280 && meta.height >= 600, `${file} retains embedded image resolution`)
}
const phrases = {
  de: ['lang="de"','dir="ltr"','Einfache Knochenzyste','Aktiv oder latent','Fallen-fragment sign','keine Zusage','MSK.pdf'],
  en: ['lang="en"','dir="ltr"','Simple bone cyst','Active or latent','fallen-fragment sign','does not guarantee','MSK.pdf'],
  fa: ['lang="fa"','dir="rtl"','کیست سادهٔ استخوانی','فعال یا نهفته','علامت قطعهٔ افتاده','تضمین نمی‌کند','MSK.pdf'],
}
for (const lang of ['de','en','fa']) {
  language=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  for (const phrase of phrases[lang]) assert.ok(html.includes(phrase), `${lang} includes ${phrase}`)
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`), `${lang} direction is correct`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${lang} uses StandardLessonShell`)
  assert.ok(html.includes('/educational/simple-bone-cyst/hero.svg'), `${lang} uses topic hero`)
  assert.ok(html.includes('Image1109.jpg') && html.includes('Image1110.jpg'), `${lang} displays both source radiographs`)
  assert.ok(html.includes('rID 17146') && html.includes('rID 10361'), `${lang} preserves figure IDs`)
  assert.equal((html.match(/type="radio"/g)||[]).length, 3, `${lang} has three self-check choices`)
}
console.log('SBC lesson SSR PASS: active/latent source associations, treatment options, image provenance/contributor status, translated non-diagnostic schematic, DE/EN/FA RTL, bounded sections and plausible retrieval feedback. Curriculum integration is parent-owned; browser QA and specialist sign-off remain pending.')
