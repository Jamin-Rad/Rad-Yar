import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import { transformSync } from 'esbuild'
import { ABDOMEN_LIVER_VESSELS_LESSON as lesson } from '../data/abdomenLiverVesselsLesson.js'

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
const Page = compile('app/abdomen/leber/gefaesse/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/abdomenLiverVesselsLesson': { ABDOMEN_LIVER_VESSELS_LESSON: lesson },
  './page.module.css': styles,
}).default
function localized(value, where = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => localized(item, `${where}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) {
    for (const key of ['de', 'en', 'fa']) assert.ok(typeof value[key] === 'string' && value[key].trim(), `${where}.${key} missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) localized(child, `${where}.${key}`)
}
localized(lesson)
assert.equal(lesson.id, 'abdomen-liver-vessels')
assert.equal(lesson.sections.length, 2)
assert.equal(lesson.check.answer, 0)
assert.ok(fs.existsSync('app/abdomen/leber/gefaesse/page.jsx'), 'bounded route exists')
const provenance = JSON.parse(fs.readFileSync('public/educational/abdomen-liver-vessels/provenance.json', 'utf8'))
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculumSource, /id: 'leber-anatomie'[^\n]*link: '\/abdomen\/leber\/gefaesse'/)
assert.match(curriculumSource, /id: 'gefaesse-anatomie-abdomen'[^\n]*link: '\/abdomen\/leber\/gefaesse'/)
for (const path of ['/educational/abdomen-liver-vessels/source-p2-arterial-overview.png', '/educational/abdomen-liver-vessels/source-p3-portal-confluence.png']) {
  const file = `public${path}`
  assert.ok(fs.existsSync(file), `${file} exists`)
  assert.ok(provenance[file.split('/').at(-1)], `${path} has provenance`)
  const meta = await sharp(file).metadata()
  assert.ok(meta.width > 700 && (path.includes('p2-') ? meta.height > 900 : meta.height > 500), `${path} retains readable figure resolution`)
}
assert.match(provenance['source-p3-portal-confluence.png'].scope, /left=55, top=35, width=800, height=565/)
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Lebergefäße: Zufluss und Abfluss', 'V. mesenterica superior', 'Vv. hepaticae', 'Truncus coeliacus', 'Abdomen.pdf'],
  en: ['lang="en"', 'dir="ltr"', 'Liver vessels: inflow and outflow', 'superior mesenteric vein', 'hepatic veins', 'celiac trunk', 'Abdomen.pdf'],
  fa: ['lang="fa"', 'dir="rtl"', 'عروق کبد: ورودی و خروجی', 'ورید مزانتریک فوقانی', 'وریدهای کبدی', 'تنهٔ سلیاک', 'Abdomen.pdf'],
}
for (const lang of ['de', 'en', 'fa']) {
  language = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang} contains ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${lang} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${lang} has topic hero`)
  for (const option of lesson.check.options) assert.ok(html.includes(option[lang]), `${lang} includes self-check option ${option[lang]}`)
}
console.log('Liver vessel orientation SSR PASS: source-page provenance, bounded scope, DE/EN/FA direction, two inflows versus hepatic venous outflow, and explanatory self-check. Browser and clinician review remain open.')
