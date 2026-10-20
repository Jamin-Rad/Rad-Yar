import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const langs = ['de', 'en', 'fa']
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'mrt-spezial')
assert.ok(section)
assert.equal(section.pages, '110–119')
const ciss = section.rows.find(row => row[0].en.includes('CISS'))
assert.ok(ciss, 'CISS row exists in existing specialty section')
assert.equal(section.references.length, 2)
assert.equal(section.visuals[0].src, '/technik/ciss-anatomy-concept.svg')
assert.ok(fs.existsSync(`public${section.visuals[0].src}`))
for (const lang of langs) {
  assert.ok(ciss[0][lang] && ciss[1][lang], `translated CISS row in ${lang}`)
  assert.ok(section.visuals[0].alt[lang] && section.visuals[0].caption[lang], `localized visual in ${lang}`)
}
assert.match(ciss[1].de, /nicht vollständig austauschbar/)
assert.match(ciss[1].fa, /کاملاً معادل نیستند/)
assert.match(ciss[1].de, /3D-GRE-Steady-State-Sequenz.*kurzem TR und hohem Flipwinkel.*zwei Akquisitionen.*HF-Phase/)
assert.match(ciss[1].en, /3D gradient-echo steady-state sequence with short TR and a high flip angle.*two acquisitions with different RF phase/)
assert.match(ciss[1].fa, /توالی سه‌بعدی گرادیان‌اکو.*TR کوتاه و زاویهٔ چرخش بالا.*دو برداشت با فاز RF متفاوت/)
assert.match(section.note.en, /does not guarantee artefact-free images/)
assert.match(section.note.fa, /یکسان‌بودن پیاده‌سازی را ثابت نمی‌کنند/)

const require = createRequire(import.meta.url)
let activeLang = 'de'
const styles = new Proxy({}, { get: (_, key) => String(key) })
function compileJsx(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const shell = compileJsx('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageAlt }) => React.createElement('div', null, React.createElement('h1', null, title), React.createElement('img', { alt: imageAlt })) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
const Page = compileJsx('app/technik/grundlagen/StandardPage.jsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside', null, 'in progress') },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}).default

const checks = {
  de: ['Selbstcheck: Was zeigt das CISS-Kontrastmuster?', 'Das Muster unterstützt die anatomische Darstellung von Nerven im Liquorraum; es beweist allein keinen Tumor.'],
  en: ['Self-check: what does the CISS contrast pattern show?', 'The pattern supports anatomical depiction of nerves in CSF; it does not prove a tumour by itself.'],
  fa: ['خودآزمایی: الگوی کنتراست CISS چه چیزی را نشان می‌دهد؟', 'این الگو به نمایش آناتومیک اعصاب در فضای CSF کمک می‌کند؛ به‌تنهایی تومور را ثابت نمی‌کند.'],
}
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('id="mrt-spezial"'))
  assert.ok(html.includes(section.title[lang]))
  assert.ok(html.includes(ciss[0][lang]) && html.includes(ciss[1][lang]))
  assert.ok(html.includes(section.visuals[0].alt[lang]) && html.includes(section.visuals[0].caption[lang]))
  assert.ok(html.includes(checks[lang][0]) && html.includes(checks[lang][1]))
  for (const reference of section.references) assert.ok(html.includes(reference.href))
}
const ledger = fs.readFileSync('docs/lesson-quality/technik-ciss-p115.md', 'utf8')
for (const id of ['CISS-01', 'CISS-02', 'CISS-03', 'CISS-04', 'CISS-05', 'CISS-06']) assert.ok(ledger.includes(id))
const checkSource = fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8').split('  atom: {')[0].split('  ciss: {')[1]
assert.match(checkSource, /feedback: \[/)
for (const phrase of ['Banding reduzieren', 'reduce banding', 'banding را کاهش دهد']) assert.ok(checkSource.includes(phrase), `option-specific feedback includes ${phrase}`)
for (const phrase of ['Implementierungen', 'implementations', 'پیاده‌سازی‌های اثبات‌شدهٔ یکسان']) assert.ok(checkSource.includes(phrase), `vendor distractor feedback includes ${phrase}`)
const matrix = fs.readFileSync('docs/lesson-quality/gehirn-technik-curriculum-matrix.md', 'utf8')
assert.match(matrix, /114–115[^\n]*CISS[^\n]*independent source\/content\/language\/assessment review and delta PASS/)
console.log('CISS PDF p.115: existing route coverage, source ledger, localized concept visual and self-check; shared-shell DE/EN/FA+RTL SSR passed.')
