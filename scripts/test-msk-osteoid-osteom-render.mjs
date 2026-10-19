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
  const { code } = swc.transformSync(require('node:fs').readFileSync(filename, 'utf8'), {
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

const { default: Route } = require(path.join(root, 'app/msk/tumoren/osteoid-osteom/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Osteoid-Osteom', 'CT', 'Brodie-Abszess', 'Osteoblastom', 'Radiofrequenzablation', 'Nidus bleibt unklar', 'ausgeprägte nächtliche Schmerzen', 'pdf-case-figure.jpg', 'nicht ausgewiesen', 'alt="Nichtdiagnostisches Schema: kleiner Nidus innerhalb einer reaktiven Knochenverdickung."'],
  en: ['lang="en"', 'dir="ltr"', 'Osteoid osteoma', 'MRI', 'Brodie abscess', 'Osteoblastoma', 'radiofrequency ablation', 'nidus remains unclear', 'marked night pain', 'pdf-case-figure.jpg', 'not identified', 'alt="Non-diagnostic schematic: a small nidus within reactive bone thickening."'],
  fa: ['lang="fa"', 'dir="rtl"', 'استئوئید استئوما', 'CT', 'آبسه برودی', 'استئوبلاستوما', 'ابلیشن رادیوفرکانسی', 'نیدوس کوچک واضح نیست', 'درد شدید شبانه', 'pdf-case-figure.jpg', 'مشخص نشده', 'alt="شماتیک غیرتشخیصی: نیدوس کوچک درون ضخیم‌شدگی واکنشی استخوان."'],
}

const heroSvg = fs.readFileSync(path.join(root, 'public/educational/osteoid-osteom/hero.svg'), 'utf8')
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.match(curriculum, /id: 'osteoid-osteom'[^\n]*link: '\/msk\/tumoren\/osteoid-osteom'/, 'curriculum topic links to the lesson route')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero schematic contains no visible English-only labels')
assert.doesNotMatch(heroSvg, /Reactive sclerosis|Small nidus|Concept schematic/, 'hero schematic has no English-only legend or footer')

for (const locale of Object.keys(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has the semantic lesson hero`)
  assert.ok(html.includes('/educational/osteoid-osteom/hero.svg'), `${locale} has its topic-specific schematic`)
  assert.ok(html.includes('MSK.pdf · pp. 77–79'), `${locale} shows the source page range`)
  assert.ok(html.includes('8134575') && html.includes('11389223'), `${locale} retains primary-source references`)
  assert.ok(html.includes('checked=""') === false, `${locale} does not preselect a retrieval answer`)
  assert.ok((html.match(/type="radio"/g) || []).length === 3, `${locale} renders three retrieval options`)
}

console.log('Osteoid osteoma bounded route SSR PASS: DE/EN/FA, RTL, StandardLessonShell, curriculum link, PDF scope, source figure, modality and differential teaching, primary citations, and unselected retrieval options. Browser and clinical review remain open.')
