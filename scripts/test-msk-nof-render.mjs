import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { MSK_NOF_LESSON as lesson } from '../data/mskNofLesson.js'

const require = createRequire(import.meta.url)
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
const Page = compile('app/msk/tumoren/nicht-ossifizierendes-fibrom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/mskNofLesson': { MSK_NOF_LESSON: lesson },
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
assert.equal(lesson.id,'nicht-ossifizierendes-fibrom')
assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'kortikalisdefekt-nof'[^\n]*link: '\/msk\/tumoren\/nicht-ossifizierendes-fibrom', ready: true, inProgress: true/)
assert.equal(lesson.sections.length,3)
assert.equal(lesson.check.options.length,3)
assert.equal(lesson.check.answer,0)
const hero=fs.readFileSync('public/educational/nicht-ossifizierendes-fibrom/hero.svg','utf8')
assert.match(hero,/<svg/); assert.doesNotMatch(hero,/<text\b[^>]*>[^<]*[\u0600-\u06ff]/)
const imagePath='public/educational/nicht-ossifizierendes-fibrom/msk-pdf-p108-radiographs.jpg'
const meta=await sharp(imagePath).metadata()
assert.ok(meta.width>=300 && meta.height>=200,'source crop is usable')
assert.ok(fs.existsSync('public/educational/nicht-ossifizierendes-fibrom/msk-pdf-p108-radiographs.provenance.json'))
const expected={
  de:['lang="de"','dir="ltr"','Nicht-ossifizierendes Fibrom','FCD oder NOF','Konventionell kleiner als 3 cm','intakt','über 50 %','keine Operationsindikation','Goldin et al.'],
  en:['lang="en"','dir="ltr"','Non-ossifying fibroma','FCD or NOF','Conventionally smaller than 3 cm','intact','more than 50%','not an indication for surgery','Goldin et al.'],
  fa:['lang="fa"','dir="rtl"','فیبروم غیر استخوان‌ساز','FCD یا NOF','کوچک‌تر از ۳ سانتی‌متر','پیوستگی خود را حفظ می‌کند','بیش از ۵۰٪','اندیکاسیون جراحی نیست','Goldin et al.'],
}
for(const lang of ['de','en','fa']) {
  language=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  for(const phrase of expected[lang]) assert.ok(html.includes(phrase),`${lang} contains ${phrase}`)
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} text direction is localized`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'),`${lang} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'),`${lang} has topic hero`)
  assert.ok(html.includes('MSK.pdf'),`${lang} source scope is visible`)
  assert.ok(html.includes('msk-pdf-p108-radiographs.jpg'),`${lang} includes source case crop`)
  assert.equal((html.match(/type="radio"/g)||[]).length,3,`${lang} has three choices`)
}
console.log('NOF/FCD bounded lesson SSR PASS: source coverage/crop provenance, DE/EN/FA and RTL, curriculum route integration, distinct FCD/NOF descriptors, cautious fracture context, and retrieval item. Browser and clinical gates remain open.')
