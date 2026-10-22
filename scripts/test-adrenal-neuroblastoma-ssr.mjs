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
    'Neuroblastome entstehen entlang des sympathischen Nervensystems',
    'Eine sichtbare Abgrenzung zur Niere mit Verdrängung stützt einen extrarenalen Ursprung.',
    'die Ummauerung allein beweist keine Invasion der Gefäßwand.',
    'Das PDF nennt Verkalkungen als möglichen CT-Befund; sie sind in diesem MRT-Paar nicht dargestellt.',
    'Ein möglicher Spinalkanalbefall sowie retroperitoneale Lymphknoten- oder Knochenmetastasen',
    'Fallbeispiel aus Abdomen.pdf, PDF-Seite 64 (Druckseite 63): linksseitige zystisch-solide Raumforderung',
    'Die MRT-Sequenzen sind nicht angegeben.',
  ],
  en: [
    'Neuroblastoma arises along the sympathetic nervous system',
    'A visible plane from the kidney with displacement supports an extra-renal origin.',
    'encasement alone does not prove vessel-wall invasion.',
    'The PDF notes calcification as a possible CT finding; it is not shown in this MRI pair.',
    'Possible spinal canal involvement and retroperitoneal nodal or bone metastases',
    'Case example from Abdomen.pdf, PDF page 64 (printed page 63): a left-sided cystic-solid mass',
    'MRI sequences are not specified.',
  ],
  fa: [
    'نوروبلاستوما در امتداد دستگاه عصبی سمپاتیک ایجاد می‌شود',
    'وجود مرز قابل مشاهده با کلیه همراه با جابه‌جایی آن از منشأ خارج‌کلیوی حمایت می‌کند.',
    'احاطه عروق به‌تنهایی تهاجم به دیواره عروق را ثابت نمی‌کند.',
    'PDF کلسیفیکاسیون را به‌عنوان یافته احتمالی CT ذکر می‌کند؛ این یافته در این جفت تصویر MRI نشان داده نشده است.',
    'درگیری احتمالی کانال نخاعی و متاستاز غدد لنفاوی رتروپریتوئن یا استخوان',
    'نمونه موردی از Abdomen.pdf، صفحه ۶۴ فایل (صفحه چاپی ۶۳): توده کیستیک-جامد چپ',
    'توالی‌های MRI مشخص نیستند.',
  ],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: rendered neuroblastoma content includes ${phrase}`)
  assert.ok(html.includes('/abdomen/nebenniere/source-pdf/neuroblastoma-mri-pair.jpg'), `${locale}: source MRI image remains attached`)
  assert.ok(html.includes('/abdomen/niere/wilms-tumour'), `${locale}: renal-origin cross-link remains available`)
  assert.doesNotMatch(html, /MRI[^.]{0,30}(?:T1|T2|DWI|STIR)|(?:lung|pulmonary) metastases[^.]{0,50}bone metastases|bone metastases[^.]{0,50}(?:lung|pulmonary) metastases/i, `${locale}: no unsupported sequence inference or lung-versus-bone staging rule`)
}
console.log('Neuroblastoma SSR PASS: DE/EN/FA, RTL, case-specific MRI attribution/caption, no sequence inference, renal-origin link, and no lung-versus-bone staging comparison.')
