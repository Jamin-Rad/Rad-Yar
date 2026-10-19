import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CHONDROSARKOM_LESSON as lesson } from '../data/chondrosarkomLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/msk/tumoren/chondrosarkom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...shell, __esModule: true },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/chondrosarkomLesson': { CHONDROSARKOM_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(locale => Object.hasOwn(value, locale))) {
    for (const locale of ['de', 'en', 'fa']) assert.ok(typeof value[locale] === 'string' && value[locale].trim(), `${key}.${locale} missing`)
    return
  }
  for (const [name, child] of Object.entries(value)) assertLocalized(child, `${key}.${name}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'chondrosarkom')
assert.equal(lesson.sections.length, 4)
assert.equal(lesson.case.options.length, 3)
assert.equal(lesson.case.answer, 0)
assert.match(lesson.features[2].de, /mehr als zwei Dritteln.*erhöht den Verdacht.*nicht allein/)
assert.match(lesson.features[2].en, /more than two-thirds.*raises suspicion.*does not prove/)
assert.match(lesson.features[2].fa, /بیش از دوسوم.*شک به کندروسارکوما را افزایش می‌دهد.*به‌تنهایی تشخیص را ثابت نمی‌کند/)
assert.doesNotMatch(JSON.stringify(lesson.sources[0].citation), /omitted because independent verification was unavailable|wegen fehlender unabhängiger Bestätigung nicht übernommen|به‌دلیل نبود تأیید مستقل وارد درس نشد/)
assert.match(lesson.sources[0].citation.de, /als Warnzeichen aufgenommen.*allein nicht diagnostisch/)
assert.match(lesson.sources[0].citation.en, /included as a warning sign.*not diagnostic alone/)
assert.match(lesson.sources[0].citation.fa, /به‌عنوان نشانهٔ هشدار گنجانده شده است.*به‌تنهایی تشخیصی نیست/)
assert.ok(fs.existsSync(`public${lesson.case.src}`), 'case crop exists')
assert.match(fs.readFileSync('public/educational/chondrosarkom-hero.svg', 'utf8'), /<svg/)
assert.match(fs.readFileSync('docs/lesson-quality/chondrosarkom-msk-p90-p91.md', 'utf8'), /rID-6171/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'chondrosarkom'[^\n]*link: '\/msk\/tumoren\/chondrosarkom'/)
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes('/educational/chondrosarkom-hero.svg'), `${locale} hero`)
  assert.ok(html.includes(lesson.case.src) && html.includes(lesson.case.alt[locale]) && html.includes(lesson.case.caption[locale]), `${locale} case image, alt and case-limited caption`)
  assert.ok(html.includes('rID 6171') && html.includes('CC BY-NC-SA 3.0'), `${locale} source attribution and license`)
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/9747616/'), `${locale} primary comparative study`)
  assert.ok(html.includes(lesson.case.question[locale]) && html.includes(lesson.case.options[0][locale]), `${locale} retrieval check`)
  assert.ok(lesson.case.feedback[locale].length > 40, `${locale} explanatory feedback exists`)
  assert.ok(html.includes(lesson.sourceNote[locale]), `${locale} source scope`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`), `${locale} section ${section.id}`)
  for (const item of [...lesson.features, ...lesson.takeHome]) assert.ok(html.includes(item[locale]), `${locale} content unit`)
}
console.log('Chondrosarcoma bounded SSR PASS: StandardLessonShell, DE/EN/FA and RTL, source pages, credited case image, case-limited claim, retrieval feedback, and curriculum route. Browser, independent and clinical review remain open.')
