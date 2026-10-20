import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const swc = require('next/dist/build/swc')
let lang = 'de'

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
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (request === '@/components/InProgressBanner') return () => null
  if (request === '@/components/LessonReferenceShell') return ({ children, check }) => React.createElement(React.Fragment, null,
    children,
    React.createElement('aside', { 'data-shell-check': true }, check.question[lang], ...check.options.map(option => React.createElement('span', { key: option.de }, option[lang]))),
  )
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/gi/ileus-volvulus/page.js'))
const { QUESTION_BANK } = require(path.join(root, 'data/questions.js'))
const { getQuestions } = require(path.join(root, 'data/questions.js'))

const expected = {
  de: ['Gallensteinileus und Rigler-Trias', 'biliodigestive Fistel', 'Klassische Rigler-Trias', 'Dünndarmobstruktion', 'Pneumobilie', 'Ektoper Gallenstein im Darm', 'Die vollständige Trias liegt häufig nicht vor', 'Closed-loop-Obstruktion'],
  en: ['Gallstone ileus and Rigler triad', 'biliodigestive fistula', 'Classic Rigler triad', 'Small-bowel obstruction', 'Pneumobilia', 'Ectopic gallstone in the bowel', 'The complete triad is often not present', 'closed-loop obstruction'],
  fa: ['ایلئوس سنگ صفراوی و تریاد ریگلر', 'فیستول صفراوی', 'تریاد کلاسیک ریگلر', 'انسداد روده باریک', 'پنوموبیلی', 'سنگ صفراوی نابجا در روده', 'در بسیاری موارد هر سه جزء تریاد هم‌زمان دیده نمی‌شوند', 'انسداد لوپ بسته'],
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} render includes ${phrase}`)
  assert.ok(html.includes('27615020'), `${locale} route cites the source supporting an often-incomplete triad`)
  const linkedId = `abdomen-ileus-volvulus-${locale}-01`
  const question = QUESTION_BANK[locale].find(item => item.id === linkedId)
  assert.ok(question, `${locale} gallstone item remains in existing registered module`)
  assert.deepEqual(question.tags, ['ileus-duenndarm', 'volvulus'])
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.ok(question.options.some(option => option.id === 'D' && option.text === (locale === 'de' ? 'Dünndarmobstruktion, Pneumobilie und ein Stein noch in der Gallenblase' : locale === 'en' ? 'Small-bowel obstruction, pneumobilia and a stone still within the gallbladder' : 'انسداد روده باریک، پنوموبیلی و سنگی که هنوز داخل کیسه صفراست')), `${locale} registered distractor is localized and distinct from an ectopic bowel stone`)
  assert.ok(question.explanation.includes(locale === 'de' ? 'schließt' : locale === 'en' ? 'does not exclude' : 'رد نمی‌کند'), `${locale} MCQ explains that an incomplete triad does not exclude gallstone ileus`)
  assert.deepEqual(getQuestions(['ileus-duenndarm'], locale, 10).map(item => item.id), [linkedId])
  assert.deepEqual(getQuestions(['volvulus'], locale, 10).map(item => item.id), [linkedId])
}

console.log('PASS: p.70 gallstone-ileus mechanism and incomplete Rigler triad render in DE/EN/FA; existing exact-ID MCQ retrieval is localized and valid')
