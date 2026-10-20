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

const { default: Route } = require(path.join(root, 'app/msk/osteochondrosen/osgood-schlatter/page.jsx'))
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Morbus Osgood-Schlatter', 'Tuberositas tibiae', 'Fragmentierung', 'Weichteilschwellung', 'Knochenmarködem', 'infrapatellare Bursitis', 'rID 61412', 'MSK.pdf · p. 71', 'normale Ossifikationsvariante'],
  en: ['lang="en"', 'dir="ltr"', 'Osgood-Schlatter disease', 'tibial tubercle', 'fragmentation', 'soft-tissue swelling', 'marrow oedema', 'infrapatellar bursitis', 'rID 61412', 'MSK.pdf · p. 71', 'normal ossification variant'],
  fa: ['lang="fa"', 'dir="rtl"', 'بیماری آزگود–اشلاتر', 'برجستگی درشت‌نی', 'قطعه‌قطعه‌شدن', 'ادم مغز استخوان', 'بورسیت عمقی زیرکشککی', 'rID 61412', 'صفحهٔ ۷۱ MSK.pdf', 'گونه‌ای طبیعی از استخوانی‌شدن'],
}
const heroSvg = fs.readFileSync(path.join(root, 'public/educational/osgood-schlatter/hero.svg'), 'utf8')
const caseImage = fs.readFileSync(path.join(root, 'public/educational/osgood-schlatter/pdf-case-p71.jpg'))
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
const data = fs.readFileSync(path.join(root, 'data/osgoodSchlatterLesson.js'), 'utf8')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero has no fixed-language visible text')
assert.ok(caseImage.length > 10_000, 'source case crop exists')
assert.match(curriculum, /id: 'osgood-schlatter'/, 'uses existing exact curriculum topic ID')
assert.match(data, /answer: 0/, 'self-check correct answer is explicitly configured')

for (const [locale, phrases] of Object.entries(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of phrases) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has semantic lesson hero`)
  assert.ok(html.includes('/educational/osgood-schlatter/hero.svg'), `${locale} has topic schematic`)
  assert.ok(html.includes('/educational/osgood-schlatter/pdf-case-p71.jpg'), `${locale} includes source case crop`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale} renders three self-check options`)
  assert.ok(!html.includes('checked=""'), `${locale} does not preselect an answer`)
}

console.log('Osgood-Schlatter bounded route SSR PASS: DE/EN/FA, RTL, source case and provenance path, normal-variant caveat, and unselected retrieval check.')
