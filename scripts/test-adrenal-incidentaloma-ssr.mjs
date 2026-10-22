import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, overrides) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(overrides, name) ? overrides[name] : require(name), mod, mod.exports)
  return mod.exports
}

let lang = 'de'
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = ({ title, visual, visualCaption }) => React.createElement('header', { 'data-hero': true }, React.createElement('h1', null, title), visual, React.createElement('p', null, visualCaption))
const Diagram = compile('components/ClinicalPatternDiagram.jsx', {}).default
const Shell = compile('components/LessonReferenceShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/components/ClinicalPatternDiagram': Diagram,
  '@/components/InProgressBanner': () => React.createElement('span', { 'data-status': 'in-progress' }),
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/data/abdomenThoraxAssessmentDrafts': { abdomenThoraxAssessmentDrafts: require('../data/abdomenThoraxAssessmentDrafts.js').abdomenThoraxAssessmentDrafts },
  './LessonReferenceShell.module.css': styles,
}).default
const Page = compile('app/abdomen/nebenniere/raumforderungen/page.js', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/LessonReferenceShell': { __esModule: true, default: Shell },
  '@/data/abdomenAdrenalLessonMaterials': require('../data/abdomenAdrenalLessonMaterials.js'),
  './page.module.css': styles,
}).default

const expected = {
  de: ['Die im PDF gezeigte Größen- und Prozentgrafik mit Kontrollintervallen ist keine aktuelle Entscheidungsregel', 'homogene Nebenniereninzidentalome mit ≤10 HU in der Nativ-CT als benigne und benötigen unabhängig von der Größe keine weitere Bildgebung', 'nativ −3 HU, arteriell +3 HU, portalvenös +38 HU und spät +12 HU', 'definieren keine universelle Washout-Regel'],
  en: ['The size-based flowchart and follow-up percentages shown in the PDF are not current decision rules', 'homogeneous adrenal incidentalomas with unenhanced CT attenuation ≤10 HU are benign and need no further imaging, irrespective of size', '−3 HU unenhanced, +3 HU arterial, +38 HU portal venous and +12 HU delayed', 'do not define a universal washout rule'],
  fa: ['فلوچارت مبتنی بر اندازه و درصدهای پیگیری در PDF، قاعده تصمیم‌گیری جاری نیست', 'اینسی‌دنتالوم همگن آدرنال با دانسیته بدون تزریق ≤۱۰ HU خوش‌خیم است و مستقل از اندازه به تصویربرداری بیشتر نیاز ندارد', '۳− HU بدون تزریق، ۳+ HU شریانی، ۳۸+ HU پورت و ۱۲+ HU تأخیری', 'قاعده عمومی Washout را تعریف نمی‌کنند'],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: rendered copy includes ${phrase}`)
  assert.ok(html.includes('nebennieren-inzidentalom,nebennierenadenom'), `${locale}: exact lesson quiz topics remain linked`)
  assert.ok(html.includes('/flashcards/nebennierenraumforderungen'), `${locale}: lesson flashcards remain linked`)
  assert.doesNotMatch(html, /(?:absolute|relative|relatives?)\s+washout[^.]{0,80}(?:>\s*)?(?:60|40)\s*%|100\s*%\s*(?:specificity|Spezifität)|50\s*%\s*(?:sensitivity|Sensitivität)/i, `${locale}: legacy washout thresholds and source statistics are not presented as general criteria`)
}
console.log('Adrenal incidentaloma SSR PASS: DE/EN/FA, RTL, excluded size-only flowchart and legacy washout statistics, current ESE/ENSAT any-size homogeneous ≤10 HU framing, exact four-phase ROI values, existing lesson interactions and links.')
