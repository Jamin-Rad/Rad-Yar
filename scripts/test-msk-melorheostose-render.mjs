import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const swc = require('next/dist/build/swc')
let language = 'de'

const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, request.slice(2))
  return originalResolve.call(this, request, parent, ...rest)
}
const loader = (module, filename) => {
  const { code } = swc.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  })
  module._compile(code, filename)
}
require.extensions['.js'] = loader
require.extensions['.jsx'] = loader
require.extensions['.css'] = module => { module.exports = {} }
const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
  if (request === '@/components/Navbar' || request === '@/components/Footer') return () => null
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: language }) }
  if (request === '@/hooks/usePersistedSectionProgress') return { usePersistedSectionProgress: () => [new Set(), () => {}] }
  if (request === '@/hooks/useLehrModeActive') return { useLehrModeActive: () => false }
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/msk/knochenstoffwechsel/melorheostose/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Melorheostose', 'fließende kortikale Hyperostose', 'signalarm', '40-Fälle-Serie', '4/4 kontrastverstärkt untersuchten Läsionen', 'schließt sie nicht aus', 'Enostose / Osteom', 'rID 199384', 'MSK.pdf · p. 133'],
  en: ['lang="en"', 'dir="ltr"', 'Melorheostosis', 'flowing cortical hyperostosis', 'low signal', '40-case series', 'all 4 contrast-enhanced lesions', 'does not exclude it', 'Enostosis / osteoma', 'rID 199384', 'MSK.pdf · p. 133'],
  fa: ['lang="fa"', 'dir="rtl"', 'ملوره‌اوستوز', 'هیپراستوز قشری', 'کم‌سیگنال', 'مجموعهٔ ۴۰ موردی', 'هر ۴ ضایعه‌ای', 'ادم مجاور آن را رد نمی‌کند', 'انوستوز / استئوما', 'rID 199384', 'صفحهٔ ۱۳۳ MSK.pdf'],
}
const heroSvg = fs.readFileSync(path.join(root, 'public/educational/melorheostose/hero.svg'), 'utf8')
const caseImage = fs.readFileSync(path.join(root, 'public/educational/melorheostose/pdf-case-p133.jpg'))
const provenance = JSON.parse(fs.readFileSync(path.join(root, 'public/educational/melorheostose/pdf-case-p133.provenance.json'), 'utf8'))
const data = fs.readFileSync(path.join(root, 'data/melorheostoseLesson.js'), 'utf8')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero has no fixed-language visible text')
assert.ok(caseImage.length > 10_000, 'source case crop exists')
assert.equal(provenance.sourcePdfPage, 133)
assert.equal(provenance.sourcePageIdentifier, 'Radiopaedia rID 199384')
assert.match(provenance.sourceContributor, /Not identified/)
assert.match(data, /answer: 0/, 'self-check correct answer is explicitly configured')

for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has semantic lesson hero`)
  assert.ok(html.includes('/educational/melorheostose/hero.svg'), `${locale} has topic schematic`)
  assert.ok(html.includes('/educational/melorheostose/pdf-case-p133.jpg'), `${locale} includes source image`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale} renders three retrieval options`)
  assert.ok(!html.includes('checked=""'), `${locale} does not preselect an answer`)
}

console.log('Melorheostosis bounded route SSR PASS: DE/EN/FA, RTL, source case/provenance, MRI oedema/enhancement caveat, differential and unselected retrieval check.')
