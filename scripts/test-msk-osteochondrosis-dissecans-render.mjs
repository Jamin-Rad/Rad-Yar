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

const { default: Route } = require(path.join(root, 'app/msk/osteochondrosen/osteochondrosis-dissecans/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Osteochondrosis dissecans', 'aseptische Nekrose', 'medialer Femurkondylus', 'Flüssigkeitssaum', 'Rodegerdts/Heuck', 'Stadium IV', 'juvenilen Läsionen', 'MR-Arthrographie', 'Knorpeldefekte', 'rID 8298', 'PDF S. 128–129'],
  en: ['lang="en"', 'dir="ltr"', 'Osteochondritis dissecans', 'aseptic necrosis', 'medial femoral condyle', 'fluid rim', 'Rodegerdts/Heuck', 'Stage IV', 'juvenile lesions', 'MR arthrography', 'Kijowski et al.', 'rID 8298', 'PDF pp. 128–129'],
  fa: ['lang="fa"', 'dir="rtl"', 'استئوکندروز دیسکانس', 'نکروز آسپتیک', 'کندیل داخلی فمور', 'حاشیهٔ مایع', 'Rodegerdts/Heuck', 'مرحلهٔ IV', 'ضایعات نوجوانان', 'آرتروگرافی مستقیم MRI', 'Kijowski', 'rID 8298', 'صفحات PDF ۱۲۸ تا ۱۲۹'],
}
const heroSvg = fs.readFileSync(path.join(root, 'public/educational/osteochondrosis-dissecans/hero.svg'), 'utf8')
const caseImage = fs.readFileSync(path.join(root, 'public/educational/osteochondrosis-dissecans/pdf-case-p129.jpg'))
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero contains no fixed-language visible labels')
assert.ok(caseImage.length > 10_000, 'source case crop exists')
assert.match(curriculum, /id: 'osteochondrosis-dissecans'/, 'uses the existing exact curriculum topic ID')

for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has a semantic lesson hero`)
  assert.ok(html.includes('/educational/osteochondrosis-dissecans/hero.svg'), `${locale} has its topic schematic`)
  assert.ok(html.includes('/educational/osteochondrosis-dissecans/pdf-case-p129.jpg'), `${locale} has the PDF case image`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale} renders three retrieval options`)
  assert.ok(!html.includes('checked=""'), `${locale} does not preselect an answer`)
}

console.log('Osteochondrosis dissecans bounded route SSR PASS: DE/EN/FA, RTL, source scope/case, stages, juvenile MRI limitation, differential and unselected retrieval. Browser and clinical review remain open.')
