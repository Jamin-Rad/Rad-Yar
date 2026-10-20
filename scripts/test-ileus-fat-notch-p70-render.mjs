import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { QUESTION_BANK } from '../data/questions.js'
import { getCardsByTopic } from '../data/flashcards.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const swc = require('next/dist/build/swc')
let lang = 'de'
let renderedLessonId = null

const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, request.slice(2))
  return originalResolve.call(this, request, parent, ...rest)
}
require.extensions['.js'] = (module, filename) => {
  const { code } = swc.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  })
  module._compile(code, filename)
}
require.extensions['.jsx'] = require.extensions['.js']
require.extensions['.css'] = module => { module.exports = {} }
const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
  if (request === 'next/image') return { __esModule: true, default: props => React.createElement('img', props) }
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (request === '@/components/InProgressBanner') return () => null
  if (request === '@/components/LessonReferenceShell') return ({ children, lessonId }) => {
    renderedLessonId = lessonId
    return React.createElement(React.Fragment, null, children)
  }
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/gi/ileus-volvulus/page.js'))
const expected = {
  de: ['Bridenileus im CT', 'ohne sichtbare Raumforderung', 'Fat-Notch-Zeichen', 'fettdichte Einziehung', 'kein alleiniger Beweis', 'physische Seite 70 (Druckseite 69)', 'Gallensteinileus und Rigler-Trias'],
  en: ['Adhesive obstruction on CT', 'without a visible mass', 'Fat notch sign', 'fat-density indentation', 'not proof of the cause', 'physical p.70 (printed p.69)', 'Gallstone ileus and Rigler triad'],
  fa: ['انسداد چسبندگی در CT', 'بدون تودهٔ قابل مشاهده', 'علامت Fat Notch', 'فرورفتگی کوچکی با دانسیتهٔ چربی', 'به‌تنهایی علت یا شدت انسداد را اثبات نمی‌کند', 'صفحهٔ فیزیکی ۷۰ (صفحهٔ چاپی ۶۹)', 'ایلئوس سنگ صفراوی و تریاد ریگلر'],
}
const uiLabels = {
  de: ['Zökumvolvulus', 'Sigmavolvulus', 'Strukturierter Befund'],
  en: ['Caecal volvulus', 'Sigmoid volvulus', 'Structured report'],
  fa: ['ولولوس سکوم', 'ولولوس سیگموئید', 'گزارش ساختاریافته'],
}
const fecesPhrases = {
  de: ['Small-Bowel-Feces-Zeichen', 'partikulärer, stuhlähnlicher Inhalt', 'keine verlässliche Aussage über Ischämie'],
  en: ['Small-bowel feces sign', 'particulate, faeces-like material', 'does not reliably establish ischaemia'],
  fa: ['علامت مدفوع رودهٔ باریک', 'محتوای ذره‌ای شبیه مدفوع', 'به‌طور قابل‌اعتماد تعیین نمی‌کند'],
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  assert.equal(renderedLessonId, 'abdomen-ileus-volvulus')
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} route direction`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} render includes ${phrase}`)
  for (const phrase of fecesPhrases[locale]) assert.ok(html.includes(phrase), `${locale} render includes small-bowel feces content: ${phrase}`)
  for (const label of uiLabels[locale]) assert.ok(html.includes(label), `${locale} localized UI label ${label}`)
  assert.ok(html.includes('/educational/abdomen-ileus/fat-notch-p70.png'), `${locale} source CT crop renders`)
  assert.ok(html.includes('19234265') || html.includes('10.2214/AJR.08.1550'), `${locale} includes the supplementary study citation`)
  assert.ok(fs.readFileSync('data/curriculum.js', 'utf8').includes("{ id: 'ileus-duenndarm', title: { de: 'Ileus', en: 'Ileus', fa: 'ایلئوس' }, group: ['Jejunum & Ileum'], tags: ['Rö','CT'], diff: 2, link: '/abdomen/gi/ileus-volvulus', flashcardLink: '/flashcards/ileus-duenndarm' }"), 'existing exact curriculum ID still links to the route and flashcards')
}

const route = fs.readFileSync('app/abdomen/gi/ileus-volvulus/page.js', 'utf8')
assert.match(route, /Dünndarmobstruktion.*Pneumobilie.*Ektoper Gallenstein im Darm/)
assert.match(route, /Small-bowel obstruction.*Pneumobilia.*Ectopic gallstone in the bowel/)
assert.match(route, /انسداد روده باریک.*پنوموبیلی.*سنگ صفراوی نابجا در روده/)
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/adhesive-ileus-abdomen-p70.md', 'utf8'), /physical PDF p\.70 \/ printed p\.69/)
assert.match(fs.readFileSync('public/educational/abdomen-ileus/image-provenance.json', 'utf8'), /"pdfPage": 70[\s\S]*"printedPage": 69/)
assert.ok(QUESTION_BANK.de.some(question => question.id === 'abdomen-small-bowel-feces-de-01' && question.tags.includes('ileus-duenndarm')), 'MCQ maps to the existing ileus curriculum ID')
assert.equal(getCardsByTopic('ileus-duenndarm').length, 2, 'two targeted flashcards resolve under the existing ileus topic')
for (const card of getCardsByTopic('ileus-duenndarm')) for (const language of ['de', 'en', 'fa']) assert.ok(card.front[language] && card.answer[language] && card.explanation[language], `${card.id} has full ${language} translation`)

console.log('PASS: ileus lesson renders Fat Notch and small-bowel feces content in DE/EN/FA; its new MCQ and two flashcards use the existing curriculum topic')
