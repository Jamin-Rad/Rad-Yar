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

const { default: Route } = require(path.join(root, 'app/msk/osteochondrosen/weitere-osteochondrosen/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Osteochondrose: Begriff und Abgrenzung', 'enchondrale Ossifikation', 'akute Verletzungen des Wachstumsknorpels', 'Osteochondrosis intervertebralis', 'Morbus Perthes', 'Osgood-Schlatter', 'Scheuermann'],
  en: ['lang="en"', 'dir="ltr"', 'Osteochondrosis: meaning and terminology', 'endochondral ossification', 'acute growth-cartilage injuries', 'Osteochondrosis intervertebralis', 'Perthes disease', 'Osgood–Schlatter', 'Scheuermann'],
  fa: ['lang="fa"', 'dir="rtl"', 'استئوکندروز: مفهوم و تمایز اصطلاحی', 'استخوان‌سازی درون‌غضروفی', 'آسیب حاد غضروف رشد', 'Osteochondrosis intervertebralis', 'بیماری پرتس', 'آزگود–اشلاتر', 'شویرمان'],
}
const hero = fs.readFileSync(path.join(root, 'public/educational/osteochondrosen-orientation.svg'), 'utf8')
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.doesNotMatch(hero, /<text\b/, 'hero has no fixed-language visible labels')
assert.match(curriculum, /id: 'weitere-osteochondrosen'[^\n]*link: '\/msk\/osteochondrosen\/weitere-osteochondrosen'[^\n]*inProgress: true/)
for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'))
  assert.ok(html.includes('/educational/osteochondrosen-orientation.svg'))
  assert.equal((html.match(/type="radio"/g) || []).length, 3)
  assert.ok(!html.includes('checked=""'))
}
assert.match(fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8'), /id: 'weitere-osteochondrosen', title: \{ de: 'Osteochondrose: Begriff und Abgrenzung', en: 'Osteochondrosis: meaning and terminology', fa: 'استئوکندروز: مفهوم و تمایز اصطلاحی' \}/)
console.log('MSK p.124 terminology orientation SSR PASS: DE/EN/FA, RTL, source-bounded distinctions, links and retrieval options. Browser and independent review remain open.')
