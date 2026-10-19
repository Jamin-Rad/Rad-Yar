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
  const { code } = swc.transformSync(fs.readFileSync(filename, 'utf8'), { filename, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } }, module: { type: 'commonjs' } })
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

const { default: Route } = require(path.join(root, 'app/msk/tumoren/osteochondrom/page.jsx'))
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.match(curriculum, /id: 'osteochondrom'[^\n]*link: '\/msk\/tumoren\/osteochondrom'/, 'curriculum topic links to the lesson route')
const hero = fs.readFileSync(path.join(root, 'public/educational/osteochondrom/hero.svg'), 'utf8')
assert.doesNotMatch(hero, /<text\b/, 'hero has no English-only embedded labels')
for (const asset of ['rid-8434-radiographs.jpg','rid-79580-mri.jpg']) assert.ok(fs.statSync(path.join(root, 'public/educational/osteochondrom', asset)).size > 1000, `${asset} exists`)

const expected = {
  de: ['lang="de"','dir="ltr"','Osteochondrom','Kortikalis und Markraum','Knorpelkappe','Parosteales Osteosarkom','rID 8434','rID 79580','20392983','Ursprungsknochen','≥2 cm','101 pathologisch bestätigte Läsionen','keine Sequenzen'],
  en: ['lang="en"','dir="ltr"','Osteochondroma','cortex and medullary canal','cartilage cap','Parosteal osteosarcoma','rID 8434','rID 79580','20392983','parent bone','≥2 cm','101 pathologically confirmed lesions','does not identify the sequences'],
  fa: ['lang="fa"','dir="rtl"','استئوکندروم','کورتکس و کانال مدولاری','کلاهک غضروفی','استئوسارکوم پارواستئال','rID 8434','rID 79580','20392983','استخوان مادر','≥۲ سانتی‌متر','۱۰۱ ضایعهٔ تأییدشده','نام سکانس‌ها را مشخص نکرده است'],
}
for (const locale of Object.keys(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has semantic lesson hero`)
  assert.ok(html.includes('/educational/osteochondrom/hero.svg'), `${locale} has topic-specific schematic`)
  assert.ok(html.includes('MSK.pdf · pp. 84–86'), `${locale} shows PDF page range`)
  assert.ok(html.includes('warning sign') || html.includes('Warnhinweis') || html.includes('علامت هشدار'), `${locale} frames threshold as a warning`)
  assert.doesNotMatch(html, /alt="[^"]*T2 bright|alt="[^"]*T2-hell|alt="[^"]*در T2 روشن/, `${locale} does not infer a specific sequence from the cropped case`)
  assert.equal((html.match(/type="radio"/g)||[]).length,3,`${locale} has three self-check options`)
  assert.equal(html.includes('checked=""'),false,`${locale} does not preselect an answer`)
}
console.log('Osteochondroma bounded lesson SSR PASS: DE/EN/FA, RTL, StandardLessonShell, curriculum route, source scope and figures, primary cap-thickness citation, and unselected self-check. Independent review/delta PASS; clinical approval and browser checks remain open.')
