import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { MSK_ABC_LESSON as lesson } from '../data/mskAneurysmalBoneCystLesson.js'

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
const Page = compile('app/msk/tumoren/aneurysmal-bone-cyst/page.js', {
  '@/components/lesson-template/StandardLessonShell': { ...shell, __esModule: true },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/mskAneurysmalBoneCystLesson': { MSK_ABC_LESSON: lesson },
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
assert.equal(lesson.id, 'aneurysmal-bone-cyst')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
const assets = [lesson.hero, ...['t2-fat-sat','pd-fat-sat','t1','t1-c-plus-fat-sat'].map(file => `/educational/aneurysmal-bone-cyst/${file}.jpg`)]
for (const asset of assets) assert.ok(fs.existsSync(`public${asset}`), `asset exists: ${asset}`)
assert.match(fs.readFileSync(lesson.hero.replace(/^\//, 'public/'), 'utf8'), /NOT A DIAGNOSTIC IMAGE/)
const ledger = fs.readFileSync('docs/lesson-quality/aneurysmal-bone-cyst-msk-p112-p113.md', 'utf8')
assert.match(ledger, /PDF pages 112–113/)
assert.match(ledger, /rID 12152/)
assert.match(ledger, /clinical validation/)
assert.match(lesson.sourceNote.en, /not specific/)
assert.match(lesson.check.explanation.en, /also occur in telangiectatic osteosarcoma/i)
assert.match(lesson.check.explanation.fa, /در استئوسارکوم تلانژکتاتیک/)
assert.match(lesson.sourceNote.en, /USP6 rearrangement.*two-thirds/)
assert.match(lesson.sections[2].rows[1][1].en, /Telangiectatic osteosarcoma/)
assert.match(lesson.check.explanation.en, /telangiectatic osteosarcoma/i)
assert.ok(lesson.sources.some(source => source.href?.includes('PMC3278819')))
assert.ok(lesson.sources.some(source => source.href?.includes('16612549')))
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const curriculumRow = curriculum.split(/\r?\n/).find(line => line.includes("id: 'knochenzyste-aneurysmatisch'"))
assert.ok(curriculumRow?.includes("link: '/msk/tumoren/aneurysmal-bone-cyst'") && curriculumRow.includes('ready: true') && curriculumRow.includes('inProgress: true'), 'exact curriculum route and reviewed readiness state')

for (const locale of ['de','en','fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language and direction`)
  assert.ok(html.includes(lesson.title[locale]) && html.includes(lesson.hero), `${locale} title and topic-specific hero`)
  for (const asset of assets.slice(1)) assert.ok(html.includes(asset), `${locale} source MRI panel ${asset}`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} self-check content`)
  assert.ok(lesson.check.explanation[locale].length > 60 && lesson.check.retry[locale].length > 40, `${locale} explanatory feedback content`)
  assert.ok(html.includes(lesson.sourceNote[locale]), `${locale} source and scope note`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`), `${locale} section ${section.id}`)
  for (const source of lesson.sources) assert.ok(html.includes(source.title[locale]), `${locale} reference title`)
}

console.log('ABC SSR/preflight PASS: shared shell, three chapters, DE/EN/FA and RTL, four PDF-derived MRI panels, specific TOS differential, USP6 sourcing, assessment feedback, source ledger, curriculum route and citations. Independent review/delta PASS; browser QA and clinical sign-off remain open.')
