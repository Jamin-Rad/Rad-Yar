import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { MSK_FIBROESE_DYSPLASIE_LESSON as lesson } from '../data/mskFibroeseDysplasieLesson.js'

const require = createRequire(import.meta.url)
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculumSource, /id: 'fibroese-dysplasie'[^\n]*link: '\/msk\/tumoren\/fibroese-dysplasie'/)
let language = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, overrides) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(overrides, name) ? overrides[name] : require(name), mod, mod.exports)
  return mod.exports
}
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-lesson-hero': 'true', 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/msk/tumoren/fibroese-dysplasie/page.jsx', {
  '@/components/lesson-template/StandardLessonShell': { ...shell, __esModule: true, default: shell.default, LessonSection: shell.LessonSection, LessonSources: shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: language }) },
  '@/data/mskFibroeseDysplasieLesson': { MSK_FIBROESE_DYSPLASIE_LESSON: lesson },
  './page.module.css': styles,
}).default

function localized(value, where = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => localized(item, `${where}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) {
    for (const key of ['de', 'en', 'fa']) assert.ok(typeof value[key] === 'string' && value[key].trim(), `${where}.${key} missing`)
    return
  }
  for (const [key, child] of Object.entries(value)) localized(child, `${where}.${key}`)
}
localized(lesson)
assert.equal(lesson.id, 'fibroese-dysplasie')
assert.equal(lesson.sections.length, 4)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.ok(fs.existsSync(`public${lesson.hero}`), 'topic hero exists')
const hero = fs.readFileSync(`public${lesson.hero}`, 'utf8')
assert.match(hero, /<svg/)
assert.doesNotMatch(hero, /<text\b|Ground-glass|Expanded|schematic only/i, 'hero contains no untranslated visible text')
assert.match(lesson.sections[0].rows[0][1].en, /70–80%/)
assert.match(lesson.sections[0].rows[1][1].en, /20–30%/)
assert.match(lesson.sections[3].warning.en, /rare/i)
assert.match(lesson.sections[3].warning.en, /rapid enlargement.*new focal pain/i)
assert.match(lesson.sections[3].warning.en, /cortical destruction.*soft-tissue component/i)
assert.match(lesson.sections[3].warning.en, /do not prove malignancy/i)
assert.match(lesson.sections[3].warning.en, /benign aggressive variants.*secondary aneurysmal bone cyst/i)
assert.equal(lesson.sections[2].title.de, 'Warum kann die MRT in die Irre führen?')
assert.match(lesson.check.options[1].en, /is enough to classify the lesion as malignant/)
assert.match(lesson.check.options[2].en, /High T2 signal excludes FD/)
for (const [image, minimum] of [[lesson.sections[1].image, 250], [lesson.sections[2].image, 250]]) {
  const path = `public${image}`
  assert.ok(fs.existsSync(path), `${path} exists`)
  const meta = await sharp(path).metadata()
  assert.ok(meta.width >= minimum && meta.height >= 180, `${path} usable dimensions`)
  assert.ok(fs.existsSync(path.replace('.jpg', '.provenance.json')), `${path} provenance exists`)
}
const ledger = fs.readFileSync('docs/lesson-quality/msk-fibroese-dysplasie-pbl-pp114-116.md', 'utf8')
for (const id of Array.from({ length: 16 }, (_, i) => `FD${String(i + 1).padStart(2, '0')}`)) assert.ok(ledger.includes(id), `source ledger includes ${id}`)
const expected = {
  de: ['lang="de"', 'dir="ltr"', 'Fibröse Dysplasie', 'Was ändert sich innerhalb dieses Spektrums?', 'Milchglasmatrix', 'Warum kann die MRT in die Irre führen?', 'selten', '70–80 %', '20–30 %', 'Javaid et al.'],
  en: ['lang="en"', 'dir="ltr"', 'Fibrous dysplasia', 'What changes across this spectrum?', 'ground-glass matrix', 'Why can MRI mislead?', 'rare', '70–80%', '20–30%', 'Javaid et al.'],
  fa: ['lang="fa"', 'dir="rtl"', 'دیسپلازی فیبروزی', 'در این طیف چه چیزی تغییر می‌کند؟', 'ماتریکس شیشه‌مات', 'چرا MRI می‌تواند گمراه‌کننده باشد؟', 'نادر', '۷۰ تا ۸۰٪', '۲۰ تا ۳۰٪', 'Javaid et al.'],
}
for (const lang of ['de', 'en', 'fa']) {
  language = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang} contains ${phrase}`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} direction`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${lang} uses StandardLessonShell`)
  assert.ok(html.includes('data-lesson-hero'), `${lang} topic hero renders`)
  assert.ok(html.includes('MSK.pdf'), `${lang} source scope visible`)
  assert.ok(html.includes(lesson.sections[3].warning[lang]), `${lang} includes localized rare-malignancy caution`)
  assert.ok(html.includes(lesson.sections[1].image) && html.includes(lesson.sections[2].image), `${lang} includes source images`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${lang} has three self-check choices`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`), `${lang} section ${section.id}`)
}
console.log('Fibrous dysplasia SSR/preflight PASS: bounded PDF ledger, source image provenance, DE/EN/FA RTL, shared shell, topic hero, image assets and embedded retrieval. Independent review, browser QA and clinical review remain open.')
