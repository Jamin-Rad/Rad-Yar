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

const { default: Route } = require(path.join(root, 'app/wirbelsaeule/metabolisch/funikulaere-myelose/page.jsx'))
const { CURRICULUM } = require(path.join(root, 'data/curriculum.js'))
const { getContentStatus } = require(path.join(root, 'data/lessonStatus.js'))
const findTopic = topics => {
  for (const topic of topics || []) {
    if (topic.id === 'funikulaere-myelose') return topic
    const nested = findTopic(topic.sub)
    if (nested) return nested
  }
  return null
}
const curriculumTopic = CURRICULUM.flatMap(subject => subject.kapitel || []).reduce((found, chapter) => found || findTopic(chapter.themen), null)
assert.ok(curriculumTopic, 'existing curriculum topic remains present')
assert.equal(curriculumTopic.link, '/wirbelsaeule/metabolisch/funikulaere-myelose', 'curriculum topic routes to the authored lesson')
assert.equal(getContentStatus(curriculumTopic), 'in_progress', 'new route is visible as in progress pending QA')

const { FUNIKULAERE_MYELOSE_LESSON: lesson } = require(path.join(root, 'data/funikulaereMyeloseLesson.js'))
const brainSciencesCitation = lesson.references.find(reference => reference.href?.includes('PMC12468238'))
assert.equal(brainSciencesCitation?.tag, 'Brain Sciences · 2025', '2025 review uses the correct journal name')
assert.match(brainSciencesCitation?.citation || '', /Brain Sci\. 2025;15\(9\):972/, '2025 citation metadata matches Brain Sciences volume/issue/article')
assert.doesNotMatch(brainSciencesCitation?.tag || '', /NeuroImage/i, 'the 2025 review is not mislabeled as NeuroImage: Clinical')
const expected = {
  de: [
    'lang="de"', 'dir="ltr"', 'Funikuläre Myelose', 'Hinterstränge', 'umgekehrtes V',
    'nicht pathognomonisch', 'unauffälliges Rückenmark-MRT', 'HIV-assoziierte vakuoläre Myelopathie',
    'NICE', 'rID 33703', 'nicht als diagnostisches Beispiel wiederverwendet', 'max. 1–2 Segmente', 'Brain Sciences · 2025', 'alt="Nichtdiagnostische Schemazeichnung: symmetrische Hinterstränge im axialen Querschnitt."',
  ],
  en: [
    'lang="en"', 'dir="ltr"', 'Subacute combined degeneration', 'posterior columns', 'inverted V',
    'not pathognomonic', 'unremarkable cord MRI', 'HIV-associated vacuolar myelopathy',
    'NICE', 'rID 33703', 'not reused here as a diagnostic case', 'max. 1–2 segments', 'Brain Sciences · 2025', 'alt="Non-diagnostic schematic: symmetric posterior columns in axial cross-section."',
  ],
  fa: [
    'lang="fa"', 'dir="rtl"', 'دژنراسیون ترکیبی تحت‌حاد نخاع', 'ستون‌های خلفی', 'V وارونه',
    'پاتوگنومونیک نیست', 'MRI طبیعی نخاع', 'میلوپاتی واکوئولار مرتبط با HIV',
    'NICE', 'rID 33703', 'به‌عنوان تصویر تشخیصی بازاستفاده نشده', '۱ تا ۲ سگمان', 'Brain Sciences · 2025', 'alt="شماتیک غیرتشخیصی: ستون‌های خلفی متقارن در مقطع آکسیال."',
  ],
}

const heroSvg = fs.readFileSync(path.join(root, 'public/educational/funikulaere-myelose/hero.svg'), 'utf8')
assert.doesNotMatch(heroSvg, /<text\b/, 'hero is a localized-label-free anatomy concept schematic')
assert.match(heroSvg, /posterior columns highlighted/i, 'hero SVG documents non-diagnostic content')

for (const locale of Object.keys(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale} has semantic lesson hero`)
  assert.ok(html.includes('/educational/funikulaere-myelose/hero.svg'), `${locale} has topic-specific schematic`)
  assert.ok(html.includes('Wirbelsäule.pdf · pp. 28–29'), `${locale} shows exact source pages`)
  assert.ok(html.includes('26965759') && html.includes('NG239') && html.includes('PMC6108975'), `${locale} retains clinical/imaging references`)
  assert.ok((html.match(/type="radio"/g) || []).length === 3, `${locale} renders three retrieval choices`)
  assert.ok(!html.includes('checked=""'), `${locale} has no preselected retrieval answer`)
  assert.ok((html.match(/data-lehr-section-managed/g) || []).length >= 6, `${locale} retains shell section controls`)
}

console.log('Funikuläre Myelose bounded route SSR PASS: DE/EN/FA, RTL, StandardLessonShell, PDF page scope, diagnostic limits, MS source heuristic, translated schematic alt, retrieval choices, verified 2025 journal metadata, curriculum route and in-progress status. Browser, independent and clinical review remain open.')
