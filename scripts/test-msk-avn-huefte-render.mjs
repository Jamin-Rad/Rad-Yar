import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { MSK_AVN_HUEFTE_LESSON as lesson } from '../data/mskAvnHuefteLesson.js'

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
const Page = compileExports('app/msk/knochennekrosen/avn-huefte/page.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/mskAvnHuefteLesson': { MSK_AVN_HUEFTE_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(lang => Object.hasOwn(value, lang))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${key}.${lang} missing`)
    return
  }
  for (const [name, child] of Object.entries(value)) assertLocalized(child, `${key}.${name}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'avn-huefte')
assert.equal(lesson.pdfStages.length, 5)
assert.equal(lesson.revisedStages.length, 5)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.equal(lesson.pdfStages[0][0].de, '0')
assert.equal(lesson.revisedStages[0][0].de, 'I')
assert.match(lesson.intro.de, /2019 revidierten ARCO/)
assert.match(lesson.localizations[0].de, /klassisch/)
assert.match(lesson.bilateralNote.de, /50 %/)
assert.doesNotMatch(lesson.localizations[0].de, /häufigste/)
assert.match(lesson.check.feedback.de, /Ödem allein/)
await fs.promises.mkdir('tmp/avn-huefte-review', { recursive: true })
for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language/direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes('/educational/avn-huefte/hero.svg'), `${locale} schematic`)
  assert.ok(html.includes(lesson.notice[locale]) && html.includes('MSK.pdf'), `${locale} source scope`)
  assert.ok(html.includes(lesson.bilateralNote[locale]), `${locale} source-attributed bilateral statement`)
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/31866252/'), `${locale} primary source link`)
  assert.ok(html.includes(locale === 'fa' ? 'direction="rtl"' : 'direction="ltr"'), `${locale} stage diagram direction`)
  assert.ok(html.includes(lesson.revisedStages[0][1][locale]) && html.includes(lesson.revisedStages[4][1][locale]), `${locale} revised ARCO comparison`)
  assert.ok(html.includes(lesson.pdfStages[0][1][locale]) && html.includes(lesson.pdfStages[1][1][locale]), `${locale} clearly separate source table`)
  assert.ok(html.includes(lesson.check.question[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} retrieval question`)
  for (const id of ['definition', 'imaging', 'differentials', 'check', 'take-home']) assert.ok(html.includes(`id="${id}"`), `${locale} section ${id}`)
  for (const finding of [lesson.pdfStages[0][1], lesson.pdfStages[1][1], lesson.revisedStages[2][1], lesson.imaging[2][1], lesson.differentials[2][1]]) assert.ok(html.includes(finding[locale]), `${locale} source finding`)
  const stageSvg = html.match(/<svg viewBox="0 0 1000 188"[\s\S]*?<\/svg>/)?.[0]
  assert.ok(stageSvg, `${locale} staged SVG found`)
  await sharp(Buffer.from(stageSvg)).png().toFile(`tmp/avn-huefte-review/stages-${locale}.png`)
}
assert.ok(fs.existsSync('public/educational/avn-huefte/hero.svg'), 'hero asset exists')
assert.match(fs.readFileSync('public/educational/avn-huefte/hero.svg', 'utf8'), /<svg/)
console.log('MSK AVN bounded route SSR PASS: DE/EN/FA, RTL, StandardLessonShell, source boundary, source-versioned staging tables, primary ARCO citation, self-check, and full-size stage SVG rasters generated for visual inspection. Browser and clinical review remain open.')
