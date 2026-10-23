import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { INTRAOSSEOUS_LIPOMA_LESSON as lesson } from '../data/mskIntraosseousLipomaLesson.js'

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
const routeDir = 'app/msk/tumoren/intraossaeres-lipom'
assert.deepEqual(fs.readdirSync(routeDir).filter(file => /^page\.(js|jsx|ts|tsx)$/.test(file)), ['page.js'], 'route has exactly one Next.js page entry')
const entrySource = fs.readFileSync(`${routeDir}/page.js`, 'utf8')
assert.doesNotMatch(entrySource, /from\s+['"]\.\/page(?:\.[jt]sx?)?['"]/, 'server entry must not import itself')
const Client = compile(`${routeDir}/LessonClient.jsx`, {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/mskIntraosseousLipomaLesson': { INTRAOSSEOUS_LIPOMA_LESSON: lesson },
  './page.module.css': styles,
})
const entry = compile(`${routeDir}/page.js`, {
  './LessonClient.jsx': { ...Client, __esModule: true },
})
const Page = entry.default
assert.equal(entry.metadata.title, 'Intraossäres Lipom | RadYar')
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
assert.equal(lesson.id,'msk-intraosseous-lipoma')
assert.equal(lesson.sections.length,3)
assert.equal(lesson.check.options.length,3)
assert.equal(lesson.check.answer,0)
const hero=fs.readFileSync('public/educational/intraosseous-lipoma/hero.svg','utf8')
assert.match(hero,/<svg/); assert.match(hero,/not diagnostic imaging/)
const provenance=JSON.parse(fs.readFileSync('public/educational/intraosseous-lipoma/media-provenance.json','utf8'))
assert.equal(provenance.assets.length,6)
for (const asset of provenance.assets) {
  const file=`public${asset.path}`
  assert.ok(fs.existsSync(file),`${file} exists`)
  assert.equal(asset.extraction,'original embedded JPEG extracted from PDF; bytes retained without re-encoding')
  const meta=await sharp(file).metadata()
  assert.ok(meta.width>=350 && meta.height>=350,`${file} has usable resolution`)
  assert.match(asset.sha256,/^[a-f0-9]{64}$/)
}
const expected={
  de:['lang="de"','dir="ltr"','Intraossäres Lipom','−60 bis −100 HU','Cockade-Zeichen','Knocheninfarkt','T1-Signal','Milgram III','subtile Aufhellung im Kalkaneuskörper','nicht klar genug zu sehen','nicht beschriftet'],
  en:['lang="en"','dir="ltr"','Intraosseous lipoma','−60 to −100 HU','Cockade sign','Bone infarct','T1 signal','Milgram III','subtle lucency in the calcaneal body','not clearly demonstrated enough','no specific projection'],
  fa:['lang="fa"','dir="rtl"','لیپوم داخل‌استخوانی','۶۰− تا ۱۰۰− HU','Cockade','انفارکتوس استخوانی','سیگنال T1','میلگرام III','ناحیه‌ای نسبتاً شفاف در تنهٔ کالکانئوس','به‌اندازهٔ کافی واضح نیست','برچسب‌گذاری نشده است'],
}
for(const lang of ['de','en','fa']) {
  language=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  for(const phrase of expected[lang]) assert.ok(html.includes(phrase),`${lang} contains ${phrase}`)
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} text direction is localized`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'),`${lang} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'),`${lang} has topic hero`)
  assert.ok(html.includes('MSK.pdf'),`${lang} source scope is visible`)
  for(const asset of provenance.assets) assert.ok(html.includes(asset.path),`${lang} includes ${asset.path}`)
  assert.equal((html.match(/type="radio"/g)||[]).length,3,`${lang} has three choices`)
}
console.log('Intraosseous lipoma scoped SSR PASS: PDF figure provenance/dimensions, DE/EN/FA RTL, fat signs vs pitfalls, and explained retrieval item. Browser and clinical gates remain open.')
