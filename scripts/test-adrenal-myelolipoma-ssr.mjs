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
    'Bei homogener Läsion kann ein homogener Signalabfall in Opposed-Phase für mikroskopisches Lipid sprechen; allein beweist er kein Adenom.',
    'STIR ist nicht fettspezifisch und weist intrazelluläres Lipid nicht nach.',
    'deren Anteile variieren von kleinen Fetteinseln bis zu überwiegend fetthaltigen Massen.',
    'In den zwei axialen CT-Bildern bleibt die makroskopische Fettkomponente nativ sichtbar; nach Kontrastmittel ist heterogene Anreicherung der weichteildichten Anteile zu sehen.',
    'Quellpaar aus Abdomen.pdf, PDF-Seite 61 (Druckseite 60).',
    'Fettanteile T1/T2 hyperintens; hämatopoetische Weichteilanteile intermediär.',
    'Kein diffuser Signalabfall der gesamten Läsion; ein dunkler India-ink-Rand an Fett-Wasser-Grenzen ist möglich.',
    'Makroskopische Fettanteile zeigen deutlichen Signalabfall.',
  ],
  en: [
    'In a homogeneous lesion, homogeneous opposed-phase signal loss may support microscopic lipid; it does not by itself diagnose adenoma.',
    'STIR is not fat-specific and does not demonstrate intracellular lipid.',
    'with proportions ranging from small fat islands to predominantly fatty masses.',
    'In the two axial CT images, macroscopic fat remains visible on the unenhanced image; after contrast, the soft-tissue components enhance heterogeneously.',
    'Source pair from Abdomen.pdf, PDF page 61 (printed page 60).',
    'Fatty components are T1/T2 hyperintense; haematopoietic soft-tissue components are intermediate in signal.',
    'No diffuse signal loss of the whole lesion; a dark India-ink rim may appear at fat–water boundaries.',
    'Macroscopic fat shows marked signal loss.',
  ],
  fa: [
    'در ضایعه همگن، افت همگن سیگنال در opposed-phase می‌تواند از چربی میکروسکوپیک حمایت کند؛ به‌تنهایی آدنوم را تشخیص نمی‌دهد.',
    'STIR اختصاصی چربی نیست و چربی داخل‌سلولی را اثبات نمی‌کند.',
    'نسبت این اجزا از جزیره‌های کوچک چربی تا توده‌های عمدتاً چربی‌دار متغیر است.',
    'در دو تصویر CT محوری، چربی ماکروسکوپیک در تصویر بدون تزریق دیده می‌شود؛ پس از تزریق، اجزای بافت نرم تقویت ناهمگون دارند.',
    'دو تصویر منبع از Abdomen.pdf، صفحه ۶۱ فایل (صفحه چاپی ۶۰).',
    'اجزای چربی در T1/T2 پرسیگنال‌اند؛ اجزای بافت نرم خون‌ساز سیگنال میانی دارند.',
    'افت منتشر سیگنال در کل ضایعه وجود ندارد؛ ممکن است حاشیه تیره India-ink در مرز چربی و آب دیده شود.',
    'چربی ماکروسکوپیک افت سیگنال بارز دارد.',
  ],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: rendered myelolipoma content includes ${phrase}`)
  assert.ok(html.includes('/abdomen/nebenniere/source-pdf/myelolipoma-native.jpg'), `${locale}: unenhanced source image remains attached`)
  assert.ok(html.includes('/abdomen/nebenniere/source-pdf/myelolipoma-postcontrast.jpg'), `${locale}: post-contrast source image remains attached`)
  assert.doesNotMatch(html, /20\s*[–-]\s*30\s*%|20\s*%\s*(?:to|bis)\s*30\s*%|(?:−|-)30\s*(?:to|bis)\s*(?:−|-)?120\s*HU|hormonally inactive|hormonell inaktiv|ه‌ورمونی غیرفعال/i, `${locale}: source calcification percentages/ranges and unverified inactivity claim are not presented`)
}
console.log('Adrenal MRI SSR PASS: DE/EN/FA, RTL, adenoma opposed-phase qualification, STIR caveat, myelolipoma fat pattern, source-labeled p61 CT pair, and excluded unverified source claims.')
