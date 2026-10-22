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
  de: [
    'Die portalvenöse Phase ist in der beschriebenen Falltafel stärker als die arterielle; später nimmt die Anreicherung ab.',
    'Die Bildgebung ersetzt bei entsprechendem Verdacht nicht die biochemische Abklärung',
    'freien Plasma-Metanephrinen oder fraktionierten Metanephrinen im Urin',
    'Falltafel aus Abdomen.pdf, PDF-Seite 63 (Druckseite 62).',
  ],
  en: [
    'In the described case panel, portal-venous enhancement exceeds arterial enhancement and decreases later.',
    'When suspected, imaging does not replace biochemical assessment',
    'plasma-free or urinary-fractionated metanephrines',
    'Case panel from Abdomen.pdf, PDF page 63 (printed page 62).',
  ],
  fa: [
    'در شرح همین نمونه، تقویت پورت از شریانی بیشتر است و در فاز تأخیری کاهش می‌یابد.',
    'در صورت شک بالینی، تصویربرداری جای بررسی بیوشیمیایی را نمی‌گیرد',
    'متانفرین آزاد پلاسما یا متانفرین‌های جزءبه‌جزء ادرار',
    'مجموعه موردی از Abdomen.pdf، صفحه ۶۳ فایل (صفحه چاپی ۶۲).',
  ],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: rendered pheochromocytoma content includes ${phrase}`)
  assert.ok(html.includes('/abdomen/nebenniere/source-pdf/pheochromocytoma-four-phase.jpg'), `${locale}: source image remains attached`)
  assert.doesNotMatch(html, /10\s*%|10%-Regel|10% rule|110\s*[–-]\s*120\s*HU|(?:one|a) third|ein Drittel|یک سوم/i, `${locale}: source mnemonic, HU threshold, arterial clue, and prevalence are not presented`)
}
console.log('Pheochromocytoma SSR PASS: DE/EN/FA, RTL, case-specific four-phase description, biochemical-workup distinction, source attribution, and excluded legacy rules; assessment registration is covered by test-adrenal-assessment.mjs.')
