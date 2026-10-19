import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const curriculumSource = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.match(curriculumSource, /id: 'osteoblastom'[^\n]*link: '\/msk\/tumoren\/osteoblastom'/)
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

const { default: Route } = require(path.join(root, 'app/msk/tumoren/osteoblastom/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Osteoblastom', '10–30 Jahre', 'Hinterelementen', 'Matrixverkalkung', 'Flare-Phänomen', 'Osteoidosteom', 'extraossäre Tumorausdehnung', 'PDF S. 80', 'pdf-case-p80.jpg', 'rID 85114', 'Nichtdiagnostisches Schema einer expansiven Knochenläsion'],
  en: ['lang="en"', 'dir="ltr"', 'Osteoblastoma', 'age 10–30 years', 'posterior elements', 'matrix mineralization', 'flare phenomenon', 'osteoid osteoma', 'extraosseous tumour extension', 'PDF p. 80', 'pdf-case-p80.jpg', 'rID 85114', 'Non-diagnostic schematic of an expansile bone lesion'],
  fa: ['lang="fa"', 'dir="rtl"', 'استئوبلاستوما', '۱۰ تا ۳۰ سالگی', 'عناصر خلفی', 'کلسیفیکاسیون ماتریکس', 'پدیدهٔ flare', 'استئوئید استئوما', 'گسترش تومور به خارج استخوان', 'صفحهٔ PDF ۸۰', 'pdf-case-p80.jpg', 'rID 85114', 'شماتیک غیرتشخیصی ضایعهٔ گسترش‌پذیر استخوان'],
}
const heroSvg = fs.readFileSync(path.join(root, 'public/educational/osteoblastom/hero.svg'), 'utf8')
const image = fs.readFileSync(path.join(root, 'public/educational/osteoblastom/pdf-case-p80.jpg'))
assert.doesNotMatch(heroSvg, /<text\b/, 'hero has no fixed-language visible labels')
assert.ok(image.length > 10_000, 'source CT crop exists')

for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} renders semantic lesson hero`)
  assert.ok(html.includes('/educational/osteoblastom/hero.svg'), `${locale} uses topic schematic`)
  assert.ok(html.includes('MSK.pdf'), `${locale} cites the supplied PDF`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale} renders three retrieval options`)
  assert.ok(!html.includes('checked=""'), `${locale} does not preselect an answer`)
}

console.log('Osteoblastoma bounded route SSR PASS: DE/EN/FA, RTL, shell, source scope, PDF case, schematic, differential and unselected retrieval. Browser and clinical review remain open.')
