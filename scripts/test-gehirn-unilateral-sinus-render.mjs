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

const { default: Route } = require(path.join(root, 'app/gehirn/hals-nnh/einseitige-verschattung/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Einseitige Nasennebenhöhlenverschattung', 'Invertiertes Papillom', 'Plattenepithelkarzinom', 'Myzetom', 'periapikalen Defekt', 'Mucozele', 'Knochenremodeling', 'pathognomonisch', 'CTDIvol', 'Scanner-Ausgabeindizes', 'Dosisgrößen', 'Eide et al.', 'pdf'],
  en: ['lang="en"', 'dir="ltr"', 'Unilateral paranasal sinus opacification', 'Inverted papilloma', 'Squamous cell carcinoma', 'Fungal sinusitis', 'periapical defect', 'Mucocele', 'bone remodelling', 'pathognomonic', 'CTDIvol', 'scanner-output indices', 'dose quantities', 'Eide et al.', 'Gehirn.pdf'],
  fa: ['lang="fa"', 'dir="rtl"', 'کدورت یک‌طرفهٔ سینوس‌های پارانازال', 'پاپیلوم معکوس', 'کارسینوم سلول سنگفرشی', 'سینوزیت قارچی', 'نقص پری‌آپیکال', 'موکوسل', 'بازسازی استخوان', 'پاتوگنومونیک', 'CTDIvol', 'شاخص‌های استاندارد خروجی اسکنرند', 'تفسیر کمیت‌های دوز', 'Eide و همکاران', 'Gehirn.pdf'],
}
const heroSvg = fs.readFileSync(path.join(root, 'public/educational/einseitige-nnh-verschattung/hero.svg'), 'utf8')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero contains no fixed-language visible labels')

for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has a semantic hero`)
  assert.ok(html.includes('/educational/einseitige-nnh-verschattung/hero.svg'), `${locale} has the topic schematic`)
  assert.ok(html.includes('/technik/dosimetrie'), `${locale} links to the dose-quantity lesson`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale} renders three retrieval options`)
  assert.ok(!html.includes('checked=""'), `${locale} does not preselect an answer`)
}

console.log('Unilateral sinus opacity bounded route SSR PASS: DE/EN/FA, RTL, shell, differential patterns, inverted-papilloma caveats, PDF dose values, schematic and unselected retrieval answers. Browser and clinical review remain open.')
