import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { MENINGITIS_COPY as C, MENINGITIS_ID, MENINGITIS_PATH, MENINGITIS_SECTIONS, MENINGITIS_SOURCES } from '../data/gehirnMeningitisEnzephalitisLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compileExports(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const ShellModule = compileExports('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const PageSource = transformSync(fs.readFileSync('app/gehirn/infektionen/meningitis-enzephalitis/page.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const PageModule = { exports: {} }
new Function('require', 'module', 'exports', PageSource)(name => {
  if (name === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) }
  if (name === '@/components/lesson-template/StandardLessonShell') return ShellModule
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: activeLanguage }) }
  if (name === '@/data/gehirnMeningitisEnzephalitisLesson') return { MENINGITIS_COPY: C, MENINGITIS_ID, MENINGITIS_PATH, MENINGITIS_SECTIONS, MENINGITIS_SOURCES }
  if (name === './page.module.css') return styles
  return require(name)
}, PageModule, PageModule.exports)
const Page = PageModule.exports.default
function assertLocalized(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${path}.${lang} missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) assertLocalized(child, `${path}.${key}`)
}
assertLocalized(C)
assertLocalized(MENINGITIS_SECTIONS)
assertLocalized(MENINGITIS_SOURCES)
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
const topic = curriculumSource.match(/\{ id: 'meningitis-enzephalitis',[^\n]+/)
assert.ok(topic, 'exact curriculum item exists')
assert.ok(topic[0].includes(`link: '${MENINGITIS_PATH}'`), 'exact route link')
assert.ok(topic[0].includes('inProgress: true'), 'remains in progress')
assert.ok(topic[0].includes("updatedAt: '2026-10-19'"), 'date recorded')
assert.ok(C.scopeNote.de.includes('PDF-S. 63') && C.scopeNote.de.includes('als Überschrift'), 'p.63 generic topic is heading only')
assert.ok(C.scopeNote.de.includes('HIV-Fallbilder auf PDF-S. 64') && C.scopeNote.de.includes('nicht verwendet'), 'p.64 HIV images excluded')
assert.match(C.noScanNote.en, /not taught or assessed/i)
assert.ok(!C.question.fa.includes('منبع بیماری'), 'check must not imply etiologic diagnosis')
for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} language and direction`)
  assert.ok(html.includes(C.title[lang]), `${lang} title`)
  assert.ok(html.includes(`/educational/meningitis-enzephalitis/compartments-${lang}.svg`), `${lang} localized diagram`)
  assert.ok(html.includes(C.question[lang]) && html.includes(C.options[0][lang]), `${lang} self-check`)
  assert.ok(C.feedback.every(item => typeof item[lang] === 'string' && item[lang].trim()), `${lang} localized answer explanations`)
  assert.ok(html.includes(C.visualCaption[lang]) && html.includes(C.noScanNote[lang]), `${lang} visual/scope boundary`)
  assert.ok(html.includes(C.scopeNote[lang]) && html.includes(C.sourcesNote[lang]), `${lang} PDF/source disclosure rendered by real LessonSources`)
  for (const source of MENINGITIS_SOURCES) assert.ok(html.includes(source.tag[lang]), `${lang} localized source tag`)
  assert.match(html, /<section id="compartment"[^>]*class="[^"]*sectionOpen[^"]*"/, `${lang} first section open in actual shell`)
}
for (const lang of ['de', 'en', 'fa']) {
  const svg = fs.readFileSync(`public/educational/meningitis-enzephalitis/compartments-${lang}.svg`, 'utf8')
  assert.ok(svg.includes(lang === 'de' ? 'Meningenraum' : lang === 'en' ? 'Meningeal space' : 'فضای مننژی'), `${lang} SVG text localized`)
}
assert.ok(!fs.existsSync('public/educational/meningitis-enzephalitis/compartments.svg'), 'no nonlocalized production diagram')
console.log('Meningitis/encephalitis actual StandardLessonShell SSR PASS: exact curriculum link inProgress; PDF p.63 meningitis subheading only (same-page HIV content excluded) and p.64 HIV image exclusion; localized DE/EN/FA source disclosure, RTL, first-open section, concept diagram and explanatory check.')
