import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { OSTEOM_LESSON as lesson } from '../data/osteomLesson.js'

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
const Page = compile('app/msk/tumoren/osteom/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...shell, __esModule: true },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/osteomLesson': { OSTEOM_LESSON: lesson },
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
assert.equal(lesson.id, 'osteom')
assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'osteom'[^\n]*link: '\/msk\/tumoren\/osteom', ready: true, inProgress: true/)
assert.equal(lesson.sections.length, 4)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.ok(fs.existsSync(`public${lesson.hero}`), 'hero exists')
assert.ok(fs.existsSync('public/educational/osteom-pdf-case.png'), 'source-approved CT crop exists')
assert.match(fs.readFileSync('public/educational/osteom-hero.svg', 'utf8'), /<svg/)
assert.match(fs.readFileSync('docs/lesson-quality/osteom-msk-p105-p106.md', 'utf8'), /OS-14/)
assert.match(lesson.sourceNote.de, /„obligate Präkanzerose“.*nicht übernommen/)
assert.match(lesson.sections[0].points[2].en, /source-reported range.*not a stand-alone diagnostic cutoff/)
assert.match(lesson.sourceNote.en, /not a diagnosis by themselves/)
assert.match(lesson.check.prompt.en, /No polyposis diagnosis has been established/i)

for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes(lesson.hero), `${locale} topic-specific hero`)
  assert.ok(html.includes('/educational/osteom-pdf-case.png') && html.includes(lesson.sections[1].imageAlt[locale]), `${locale} case, alt and attribution`)
  assert.ok(html.includes('rID 24249') && html.includes('rID 10646'), `${locale} image provenance`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} self-check`)
  assert.ok(lesson.check.feedbackCorrect[locale].length > 40 && lesson.check.feedbackIncorrect[locale].length > 40, `${locale} correct and incorrect feedback exist`)
  assert.ok(html.includes(lesson.sourceNote[locale]), `${locale} source scope`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`), `${locale} section ${section.id}`)
  for (const item of [...lesson.sections.flatMap(section => [...(section.points || []), ...(section.rows || []).flat()]), ...lesson.summary]) assert.ok(html.includes(item[locale]), `${locale} content unit`)
}

console.log('Osteoma SSR PASS: shared shell, curriculum route, DE/EN/FA and RTL, PDF-derived CT figure attribution, section coverage, source ledger and retrieval feedback. Browser QA and clinical sign-off remain open.')
