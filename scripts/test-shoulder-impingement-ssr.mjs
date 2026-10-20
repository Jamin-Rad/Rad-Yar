import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { DOMParser } from '@xmldom/xmldom'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = ({ title, visual, visualCaption }) => React.createElement('div', { 'data-lesson-hero': true }, React.createElement('h1', null, title), visual, React.createElement('p', null, visualCaption))
const defaultDiagramCalls = []
const Diagram = ({ variant, lang, title }) => {
  defaultDiagramCalls.push({ variant, lang, title })
  return React.createElement('svg', { 'data-shared-default-diagram': variant, lang, 'aria-label': title })
}
const shell = compile('components/LessonReferenceShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/components/ClinicalPatternDiagram': Diagram,
  '@/components/InProgressBanner': () => React.createElement('div', { 'data-in-progress': true }),
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/data/abdomenThoraxAssessmentDrafts': { abdomenThoraxAssessmentDrafts: {} },
  './LessonReferenceShell.module.css': styles,
})
const RouteShell = ({ lang, title, check, heroVisual, children }) => React.createElement('div', { lang, 'data-route-shell': true }, React.createElement('h1', null, title), React.createElement('div', { 'data-in-progress': true }), heroVisual, React.createElement('p', null, check.options[1]), React.createElement('p', null, check.explanation), React.createElement('p', null, check.incorrectExplanation), children)
const LocalDiagram = compile('app/msk/schulter/impingement-kalkschulter/ShoulderImpingementDiagram.jsx', {}).default
let lang = 'de'
const Page = compile('app/msk/schulter/impingement-kalkschulter/page.js', {
  'next/link': Link,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/LessonReferenceShell': { __esModule: true, default: RouteShell },
  './ShoulderImpingementDiagram': { __esModule: true, default: LocalDiagram },
  './page.module.css': styles,
}).default
const escaped = value => renderToStaticMarkup(React.createElement('span', null, value)).replace(/^<span>|<\/span>$/g, '')
const checks = {
  de: ['Schulter-Impingement: Bildmuster und Grenzen','Bigliani','Axiale MRI','PASTA','beweist weder eine symptomatische Einengung'],
  en: ['Shoulder impingement: imaging patterns and limits','Bigliani','Axial MRI','PASTA','proves neither symptomatic narrowing'],
  fa: ['ایمپینجمنت شانه','Bigliani','MRI آگزیال','PASTA','به‌تنهایی'],
}
const titles = {
  de: 'Schulter-Impingement: Bildmuster und Grenzen',
  en: 'Shoulder impingement: imaging patterns and limits',
  fa: 'ایمپینجمنت شانه: الگوهای تصویربرداری و محدودیت‌ها',
}
for (const locale of ['de','en','fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`), `${locale}: locale and direction`)
  for (const phrase of checks[locale]) assert.ok(html.includes(escaped(phrase)), `${locale}: ${phrase}`)
  assert.ok(html.includes('<svg'), `${locale}: route-local SVG hero is rendered`)
  assert.ok(html.includes(locale==='fa'?'نمای شماتیک فضای زیرآکرومیال':locale==='en'?'Schematic of the subacromial space':'Schematische Darstellung des subakromialen Raums'), `${locale}: localized hero accessibility title`)
  assert.ok(html.includes(locale==='fa'?'تاندون سوپرااسپیناتوس':locale==='en'?'Supraspinatus tendon':'Supraspinatussehne'), `${locale}: route-local diagram anatomy labels`)
  assert.ok(html.includes('/msk/shoulder/source-pdf-page-36.jpg'), `${locale}: source illustration`)
  assert.ok(html.includes('data-route-shell="true"'), `${locale}: route content is wrapped by the shared-shell contract`)
  assert.ok(html.includes('data-in-progress="true"'), `${locale}: in-progress status`)
  assert.ok(html.includes('10.2214/AJR.04.0830') && html.includes('JAAOS, 2021'), `${locale}: reviewed citation metadata`)
  assert.ok(html.includes(escaped(locale==='fa'?'این درس فقط الگوهای ایمپینجمنت را پوشش می‌دهد.':locale==='en'?'this lesson covers the impingement patterns only.':'diese Lektion deckt daher nur die Impingement-Muster ab.')), `${locale}: explicit partial curriculum scope`)
  assert.ok(html.includes(escaped(locale==='fa'?'فاصله کم در کنار یافته‌های ساب‌اسکاپولاریس یا بورس می‌تواند مؤید باشد، اما به‌تنهایی تشخیص را ثابت نمی‌کند.':locale==='en'?'A narrow interval can support the assessment alongside subscapularis or bursal findings, but does not establish the diagnosis by itself.':'Ein enges Intervall kann zusammen mit Subscapularis- oder Bursabefunden stützen, stellt die Diagnose aber nicht allein.')), `${locale}: option-specific diagnostic feedback`)
}
const heroHtml = renderToStaticMarkup(React.createElement(LocalDiagram, { lang:'fa' }))
assert.ok(heroHtml.includes('<svg') && heroHtml.length > 800)
assert.ok(heroHtml.includes('آکرومیون') && heroHtml.includes('فضای زیرآکرومیال'), 'route-local shoulder diagram labels are localized into Persian')
assert.equal(defaultDiagramCalls.length, 0, 'the shoulder route uses its local SVG instead of the shared clinical diagram')
const shellDefaultHtml = renderToStaticMarkup(React.createElement(shell.default, { lessonId:'shell-default', lang:'en', title:'Default shell', diagram:'liver', check:{ question:'Q?', options:['A'], answer:0, explanation:'Because.', diagramCaption:'Teaching visual.' } }))
assert.ok(shellDefaultHtml.includes('data-shared-default-diagram="liver"'), 'shell retains shared diagram rendering by default')
assert.deepEqual(defaultDiagramCalls.at(-1), { variant:'liver', lang:'en', title:'Default shell' }, 'heroVisual override leaves default shell diagram props unchanged')
const beforeOverride = defaultDiagramCalls.length
const shellOverrideHtml = renderToStaticMarkup(React.createElement(shell.default, { lessonId:'shell-local', lang:'fa', title:'Local visual', heroVisual:React.createElement(LocalDiagram, { lang:'fa' }), check:{ question:'Q?', options:['A'], answer:0, explanation:'Because.', diagramCaption:'Teaching visual.' } }))
assert.ok(shellOverrideHtml.includes('آکرومیون') && shellOverrideHtml.includes('فضای زیرآکرومیال'), 'shell renders the supplied route-local visual')
assert.equal(defaultDiagramCalls.length, beforeOverride, 'route-local hero visual bypasses the shared diagram')
assert.ok(fs.statSync('public/msk/shoulder/source-pdf-page-36.jpg').size > 10000)
assert.match(fs.readFileSync('docs/lesson-quality/impingement-kalkschulter-msk-p36-p38.md','utf8'),/SCOPE-01/)
assert.match(fs.readFileSync('docs/lesson-quality/impingement-kalkschulter-msk-p36-p38.md','utf8'),/SHO-37-00 \| 37 \/ printed 36/)
assert.match(fs.readFileSync('data/curriculum.js','utf8'),/\{ id: 'impingement-kalkschulter',[^\n]*link: '\/msk\/schulter\/impingement-kalkschulter',[^\n]*ready: true, inProgress: true/)
console.log('Shoulder impingement MSK.pdf pp.36–38: SSR translation/RTL, scope, citations, source image, route-local topic hero, default shell compatibility, retrieval feedback and in-progress curriculum link PASS for DE/EN/FA. Browser/clinical review remain separate.')
