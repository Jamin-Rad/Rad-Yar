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
  if (request === 'next/image') return ({ fill, priority, ...props }) => React.createElement('img', props)
  if (request === '@/components/Navbar' || request === '@/components/Footer') return () => null
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: language }) }
  if (request === '@/hooks/usePersistedSectionProgress') return { usePersistedSectionProgress: () => [new Set(), () => {}] }
  if (request === '@/hooks/useLehrModeActive') return { useLehrModeActive: () => false }
  if (request === '@/lib/lessonHashNavigation') return { observeLessonHash: () => () => {} }
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/niere/wilms-tumour/page.jsx'))
const { WILMS_LESSON: lesson } = require(path.join(root, 'data/wilmsLesson.js'))
const { CURRICULUM } = require(path.join(root, 'data/curriculum.js'))
const { getContentStatus } = require(path.join(root, 'data/lessonStatus.js'))
const findTopic = topics => {
  for (const topic of topics || []) {
    if (topic.id === 'nephroblastom-wilms') return topic
    const nested = findTopic(topic.sub)
    if (nested) return nested
  }
  return null
}
const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).reduce((found, chapter) => found || findTopic(chapter.themen), null)
assert.ok(topic, 'Wilms tumour topic exists in curriculum')
assert.equal(topic.link, '/abdomen/niere/wilms-tumour')
assert.equal(getContentStatus(topic), 'in_progress', 'route remains in progress pending review')

const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Nephroblastom (Wilms-Tumor)', 'inhomogene, solide Raumforderung', 'Claw sign', 'Lunge als häufigsten Metastasenort', 'Nebennierenraumforderung', 'verdrängt benachbarte Strukturen', 'Zusammen mit dem Claw sign stützt das den Nierenursprung', 'nicht zur histologischen Sicherung', 'Abdomen.pdf', 'keine diagnostische Aufnahme'],
  en: ['lang="en"', 'dir="ltr"', 'Nephroblastoma (Wilms tumour)', 'heterogeneous solid mass', 'claw sign', 'lungs as the most common metastatic site', 'adrenal mass', 'displaces adjacent structures', 'Together with the claw sign, this supports renal origin', 'does not establish histology', 'Abdomen.pdf', 'not a diagnostic image'],
  fa: ['lang="fa"', 'dir="rtl"', 'نفروبلاستوما (تومور ویلمز)', 'توده‌ای بزرگ، جامد و ناهمگن', 'علامت چنگالی', 'ریه شایع‌ترین محل متاستاز', 'توده آدرنال مجاور', 'ساختارهای مجاور را جابه‌جا می‌کند', 'همراه با علامت چنگالی از منشأ کلیوی حمایت می‌کند', 'بافت‌شناسی را مشخص نمی‌کند', 'Abdomen.pdf', 'تصویر تشخیصی نیست'],
}
for (const locale of ['de', 'en', 'fa']) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale}: StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${locale}: semantic hero`)
  assert.ok(html.includes('/educational/wilms/hero.svg'), `${locale}: topic-specific hero schematic`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${locale}: three self-check options`)
  assert.ok(!html.includes('checked=""'), `${locale}: no answer is preselected`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(section.title[locale]), `${locale}: localized section title`)
    assert.ok(html.includes(section.body[locale]), `${locale}: localized section content`)
    assert.ok(html.includes(section.implication[locale]), `${locale}: localized clinical implication`)
  }
  assert.ok(html.includes(lesson.check.question[locale]), `${locale}: localized self-check question`)
  assert.ok(html.includes(lesson.check.diagramCaption[locale]), `${locale}: localized diagram caption`)
  assert.ok(html.includes(lesson.media[locale]), `${locale}: media provenance/scope disclosure`)
  assert.ok(html.includes(lesson.sourceReview[locale]), `${locale}: review status disclosed`)
  assert.ok(!html.includes('85%') && !html.includes('90%'), `${locale}: unsupported epidemiology/outcome percentages omitted`)
}
const hero = fs.readFileSync(path.join(root, 'public/educational/wilms/hero.svg'), 'utf8')
assert.doesNotMatch(hero, /<text\b/, 'hero SVG has no unlocalized labels')
assert.ok(fs.existsSync(path.join(root, 'public/educational/wilms/image-provenance.json')), 'schematic provenance exists')
assert.match(fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8'), /id: 'nephroblastom-wilms'[^\n]*inProgress: true/)
console.log('Wilms route SSR PASS: DE/EN/FA, RTL, StandardLessonShell, source-bounded morphology, claw-sign self-check, localized media note and curriculum in-progress link. Browser and scientific review remain pending.')
