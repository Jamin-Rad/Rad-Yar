import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const diagram = compile('components/ClinicalPatternDiagram.jsx', {}).default
let lang = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/components/ClinicalPatternDiagram': diagram,
  '@/components/InProgressBanner': () => null,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Page = compile('app/msk/gefaesse/pavk-stenosen/page.jsx', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  './page.module.css': styles,
}).default
const htmlText = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))
const ensure = (markup, value, message) => assert.ok(markup.includes(htmlText(value)), message)
const pageSource = fs.readFileSync('app/msk/gefaesse/pavk-stenosen/page.jsx', 'utf8')
const curriculumSource = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(pageSource, /const id = 'gefaesse-pavk-stenosen'/, 'exact curriculum lesson ID')
assert.match(curriculumSource, /\{ id: 'gefaesse-pavk-stenosen',[^\n]*link: '\/msk\/gefaesse\/pavk-stenosen', inProgress: true, updatedAt: '2026-10-20' \}/, 'exact curriculum ID links to the reviewed lesson route')
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/gefaesse-pavk-stenosen.md', 'utf8'), /PDF 137 \/ printed 136/)
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/gefaesse-pavk-stenosen.md', 'utf8'), /PDF 138 \/ printed 137/)
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/gefaesse-pavk-stenosen.md', 'utf8'), /ESC Task Force.*2024 ESC Guidelines/s)

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(`aria-label="${locale === 'de' ? 'Lektionsinhalt' : locale === 'en' ? 'Lesson contents' : 'محتوای درس'}"`), `${locale}: breadcrumb navigation label`)
  ensure(html, locale === 'de' ? 'pAVK: Stenosen erkennen und einordnen' : locale === 'en' ? 'PAD: recognising and characterising stenoses' : 'بیماری شریانی محیطی: شناخت و توصیف تنگی‌ها', `${locale}: title`)
  assert.ok(html.includes('/educational/pavk-stenosis-hero.svg'), `${locale}: topic-specific hero graphic`)
  for (const phrase of locale === 'de' ? ['200 m', 'keine aktuelle Behandlungsregel', 'Duplexsonographie'] : locale === 'en' ? ['200 m', 'not current treatment rules', 'duplex ultrasound'] : ['۲۰۰ متر', 'قاعده درمانی امروز نیست', 'سونوگرافی داپلکس']) assert.ok(html.includes(phrase), `${locale}: current-evidence caveat ${phrase}`)
  for (const phrase of locale === 'de' ? ['einfache, kurze Stenosen/Verschlüsse', 'mehrere, weniger ausgeprägte Läsionen', 'längere, komplexe Verschlüsse', 'sehr komplexe, diffuse Verschlüsse'] : locale === 'en' ? ['simple, short stenoses/occlusions', 'multiple, less extensive lesions', 'longer, complex occlusions', 'very complex, diffuse occlusions'] : ['تنگی/انسدادهای ساده و کوتاه', 'چند ضایعه با شدت کمتر', 'انسدادهای طولانی و پیچیده', 'انسدادهای بسیار پیچیده و منتشر']) assert.ok(html.includes(phrase), `${locale}: TASC source morphology ${phrase}`)
  assert.ok(html.includes(locale === 'de' ? 'chronische gliedmaßenbedrohende Ischämie (CLTI)' : locale === 'en' ? 'chronic limb-threatening ischaemia (CLTI)' : 'ایسکمی مزمن تهدیدکننده اندام (CLTI)'), `${locale}: expanded CLTI term`)
  for (const phrase of ['CTA', 'MRA', 'DSA', 'TASC', 'PTA']) assert.ok(html.includes(phrase), `${locale}: lesson scope ${phrase}`)
  assert.ok(html.includes(locale === 'de' ? 'Lange Gefäßstrecken; Turbulenzen können die Stenose überschätzen.' : locale === 'en' ? 'Long vascular segments; turbulence can cause stenosis overestimation.' : 'بررسی قطعات طولانی عروقی؛ آشفتگی جریان می‌تواند تنگی را بیش‌برآورد کند.'), `${locale}: MRA detail renders in the second cell`)
  assert.match(html, locale === 'de' ? /TEA/ : locale === 'en' ? /endarterectomy/i : /اندآرترکتومی/, `${locale}: open procedure is translated`)
  assert.ok(html.includes('Eine Antwort auswählen') || locale !== 'de', `${locale}: assessment control`)
  assert.ok(html.includes('academic.oup.com/eurheartj/article/45/36/3538/7738955'), `${locale}: current guideline source link`)
  assert.ok(html.includes('Sources and scope') || html.includes('Quellen und Umfang') || html.includes('منابع و دامنه'), `${locale}: source panel`)
}

assert.match(pageSource, /incorrectExplanation/, 'incorrect answer receives explanatory feedback')
assert.match(pageSource, /heroImage: '\/educational\/pavk-stenosis-hero\.svg'/, 'lesson selects its dedicated topic diagram')
assert.match(pageSource, /ESC 2024/, 'current guideline context is explained in the lesson')
assert.doesNotMatch(fs.readFileSync('public/educational/pavk-stenosis-hero.svg', 'utf8'), /Conceptual stenosis|not patient imaging/i, 'hero has no untranslated visible caption')
console.log('PAVK lesson SSR PASS: DE/EN/FA, RTL, exact route ID, source ledger, guideline caveats and imaging/procedure coverage.')
