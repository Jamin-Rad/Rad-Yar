import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { MSK_ENCHONDROM_LESSON as lesson } from '../data/mskEnchondromLesson.js'

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
const Page = compile('app/msk/tumoren/enchondrom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/mskEnchondromLesson': { MSK_ENCHONDROM_LESSON: lesson },
  './page.module.css': styles,
}).default

function localized(value, where='lesson') {
  if (Array.isArray(value)) return value.forEach((item,i)=>localized(item,`${where}[${i}]`))
  if (!value || typeof value !== 'object') return
  if (['de','en','fa'].some(key=>Object.hasOwn(value,key))) {
    for (const key of ['de','en','fa']) assert.ok(typeof value[key]==='string' && value[key].trim(),`${where}.${key} missing`)
    return
  }
  for (const [key,child] of Object.entries(value)) localized(child,`${where}.${key}`)
}
localized(lesson)
assert.equal(lesson.id,'enchondrom')
assert.equal(lesson.sections.length,3)
assert.equal(lesson.check.options.length,3)
assert.equal(lesson.check.answer,0)
const curriculum=fs.readFileSync('data/curriculum.js','utf8')
assert.match(curriculum,/id: 'enchondrom'[^\n]*link: '\/msk\/tumoren\/enchondrom'/)
const hero=fs.readFileSync('public/educational/enchondrom/hero.svg','utf8')
assert.match(hero,/<svg/); assert.doesNotMatch(hero,/<text\b/)
for(const file of ['rid-91156-hand-radiographs.jpg','rid-41467-tibia-ct.jpg','rid-33147-ankle-mri.jpg']) {
  const path=`public/educational/enchondrom/${file}`
  assert.ok(fs.existsSync(path),`${file} exists`)
  const meta=await sharp(path).metadata()
  assert.ok(meta.width>=300 && meta.height>=200,`${file} has usable dimensions`)
}
const expected={
  de:['lang="de"','dir="ltr"','Enchondrom','Welches Muster suche ich','Kortikalisdestruktion','Knocheninfarkt','rID 91156','rID 41467','rID 33147','Bone-RADS','nicht als feste individuelle Risiken','Isointens bis leicht hyperintens zum Muskel','deutlich hyperintens und gelappt','Ollier-Erkrankung','erste Manifestation'],
  en:['lang="en"','dir="ltr"','Enchondroma','Which imaging pattern','Cortical destruction','Bone infarct','rID 91156','rID 41467','rID 33147','Bone-RADS','not presented as fixed individual risks','Isointense to slightly hyperintense relative to muscle','markedly hyperintense and lobulated','Ollier disease','first presentation'],
  fa:['lang="fa"','dir="rtl"','انکندروم','در تصویر دنبال چه الگویی','تخریب کورتکس','انفارکت استخوان','شناسهٔ ۹۱۱۵۶','شناسهٔ ۴۱۴۶۷','شناسهٔ ۳۳۱۴۷','Bone-RADS','به‌عنوان خطر قطعی فردی','هم‌سیگنال تا اندکی پرسیگنال‌تر از عضله','به‌وضوح پرسیگنال و لوبوله','بیماری اولیر','تظاهر نخست'],
}
for(const lang of ['de','en','fa']) {
  language=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  for(const phrase of expected[lang]) assert.ok(html.includes(phrase),`${lang} contains ${phrase}`)
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} text direction is localized`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'),`${lang} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'),`${lang} has topic hero`)
  assert.ok(html.includes('MSK.pdf'),`${lang} source scope is visible`)
  assert.equal((html.match(/type="radio"/g)||[]).length,3,`${lang} has three choices`)
  assert.equal(html.includes('checked=""'),false,`${lang} answer starts unselected`)
}
console.log('Enchondroma bounded lesson SSR PASS: source pages/crops, DE/EN/FA, RTL, StandardLessonShell, curriculum route, cited warning context, and retrieval item. Independent review, browser and clinical gates remain open.')
