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
const Page = compile('app/abdomen/leber/angiomyolipom/page.js', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/LessonReferenceShell': { __esModule: true, default: Shell },
  '../../gi/divertikulitis/page.module.css': styles,
}).default

const expected = {
  de: ['Hepatisches Angiomyolipom', 'Schematische Läsion mit markiertem makroskopischem Fettanteil; keine Patientenaufnahme.', 'In der hepatobiliären Phase ist HAML meist hypointens', 'Eine frühe drainierende Vene kann ein Hinweis sein, ist aber nicht durchgehend sichtbar', 'auch HCC ist oft hypointens', 'Ding et al. · histopathologisch korrelierte CT/MRT-Studie', 'Warum darf Wash-out nicht als starres AML-Kriterium verwendet werden?', 'kein einzelnes dynamisches Muster schließt HAML aus'],
  en: ['Hepatic angiomyolipoma', 'Teaching schematic of a lesion with macroscopic fat; not patient imaging.', 'HAML is usually hypointense on the hepatobiliary phase', 'An early draining vein can be a clue, but is not consistently visible', 'HCC is often hypointense too', 'Ding et al. · pathology-correlated CT/MRI study ↗', 'Why should washout not be used as a rigid AML criterion?', 'no single dynamic pattern excludes HAML'],
  fa: ['آنژیومیولیپوم کبدی', 'شماتیک آموزشی ضایعه با چربی ماکروسکوپیک؛ تصویر بیمار نیست.', 'HAML معمولاً در فاز هپاتوبیلیاری هیپواینتنس است', 'ورید تخلیه‌کننده زودرس می‌تواند سرنخ باشد، اما همیشه دیده نمی‌شود', 'HCC نیز اغلب هیپواینتنس است', 'Ding و همکاران · مطالعه CT/MRI با تطبیق آسیب‌شناسی ↗', 'چرا wash-out نباید معیار ثابت AML باشد؟', 'هیچ الگوی دینامیک منفردی HAML را رد نمی‌کند'],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and text direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: rendered content contains ${phrase}`)
  assert.ok(html.includes('<svg'), `${locale}: code-native lesson hero is present`)
  assert.ok(html.includes('/ueben/quiz?fach=abdomen&amp;n=10&amp;themen=hepatisches-angiomyolipom'))
  assert.ok(html.includes('/flashcards/hepatisches-angiomyolipom'))
}
console.log('Hepatic AML route SSR PASS: DE/EN/FA, RTL, qualified HBP pattern, corrected Ding citation, linked self-check, topic quiz/cards and schematic hero. Browser and clinical review remain separate.')
