import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { INTRAOSSEOUS_GANGLION_LESSON as lesson } from '../data/mskIntraosseousGanglionLesson.js'

const require = createRequire(import.meta.url)
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculumSource, /id: 'intraossaeres-ganglion'[^\n]*link: '\/msk\/tumoren\/intraossaeres-ganglion'/)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: file.endsWith('.jsx') ? 'jsx' : 'jsx', jsx: 'automatic', format: 'cjs' }).code
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
const routeDir = 'app/msk/tumoren/intraossaeres-ganglion'
assert.deepEqual(fs.readdirSync(routeDir).filter(file => /^page\.(js|jsx|ts|tsx)$/.test(file)), ['page.js'], 'route has exactly one Next.js page entry')
const entrySource = fs.readFileSync(`${routeDir}/page.js`, 'utf8')
assert.doesNotMatch(entrySource, /from\s+['"]\.\/page(?:\.[jt]sx?)?['"]/, 'server entry must not import itself')
const Client = compile(`${routeDir}/LessonClient.jsx`, {
  '@/components/lesson-template/StandardLessonShell': { ...shell, __esModule: true },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/mskIntraosseousGanglionLesson': { INTRAOSSEOUS_GANGLION_LESSON: lesson },
  './page.module.css': styles,
})
const entry = compile(`${routeDir}/page.js`, {
  './LessonClient.jsx': { ...Client, __esModule: true },
})
const Page = entry.default
assert.equal(entry.metadata.title, 'Intraossäres Ganglion | RadYar')

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
assert.equal(lesson.id, 'intraossaeres-ganglion')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.ok(fs.existsSync(`public${lesson.hero}`), 'topic-specific schematic exists')
const heroSvg = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.match(heroSvg, /id="fluid"/)
assert.match(heroSvg, /opposing joint surface/i)
assert.match(heroSvg, /M236 24/)
const signalDiagram = lesson.sections.find(section => section.id === 'imaging')
assert.ok(signalDiagram?.image && fs.existsSync(`public${signalDiagram.image}`), 'signal schematic is present')
assert.match(fs.readFileSync(`public${signalDiagram.image}`, 'utf8'), /not patient images/i)
assert.match(fs.readFileSync('public/educational/intraosseous-ganglion/mri-signal-schematic.provenance.json', 'utf8'), /"diagnosticImage": false/)
assert.doesNotMatch(heroSvg, /<text\b/, 'schematic has no language-locked visible labels')
assert.match(fs.readFileSync('public/educational/intraosseous-ganglion/hero.provenance.json', 'utf8'), /"diagnosticImage": false/)
const ledger = fs.readFileSync('docs/lesson-quality/msk-intraosseous-ganglion-p119.md', 'utf8')
assert.match(ledger, /no scientific extension was necessary/)
assert.match(lesson.sourceNote.en, /no external clinical claims were added/)
assert.doesNotMatch(JSON.stringify(lesson), /افزایش جذب/, 'Persian MRI wording must not imply tracer uptake')

for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale} title`)
  assert.ok(html.includes(lesson.hero) && html.includes(lesson.sections[0].imageAlt[locale]), `${locale} schematic and accessible label`)
  assert.ok(html.includes(signalDiagram.image) && html.includes(signalDiagram.imageAlt[locale]), `${locale} signal schematic and accessible label`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale} self-check`)
  assert.ok(html.includes(lesson.sourceNote[locale]), `${locale} scope disclosure`)
  assert.ok(html.includes(lesson.references[0].citation[locale]), `${locale} source reference`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(`id="${section.id}"`), `${locale} chapter ${section.id}`)
    for (const row of section.rows) for (const unit of row) assert.ok(html.includes(unit[locale]), `${locale} table content`)
  }
  for (const item of lesson.summary) assert.ok(html.includes(item[locale]), `${locale} summary`)
}

console.log('Intraosseous ganglion SSR PASS: shared shell, DE/EN/FA and RTL, page-119 source coverage, original non-diagnostic schematic provenance, self-check and summary. Browser QA and specialist review remain open.')
