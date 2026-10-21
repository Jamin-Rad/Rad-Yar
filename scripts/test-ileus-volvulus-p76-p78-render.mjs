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
  if (request === 'next/image') return props => React.createElement('img', props)
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (request === '@/components/InProgressBanner') return () => null
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/gi/ileus-volvulus/page.js'))
const { QUESTION_BANK, getQuestions } = require(path.join(root, 'data/questions.js'))
const { FLASHCARD_TOPICS, getCardsByTopic } = require(path.join(root, 'data/flashcards.js'))
const expected = {
  de: ['pathologische Verdrehung', 'mechanische Obstruktion', 'Gefäße komprimieren', 'linken Unterbauch', 'rechten Unterbauch', 'Ileozökalklappe', '360°-Verdrehung', 'Bird-beak', 'CT kann zur Bestätigung beitragen', 'bei Verdacht auf Ischämie oder Perforation', 'rID:199019'],
  en: ['pathological twisting', 'mechanical obstruction', 'compress mesenteric vessels', 'left lower abdomen', 'right lower abdomen', 'ileocaecal valve', '360° rotation', 'bird-beak', 'CT can help confirm the diagnosis', 'ischaemia or perforation is suspected', 'rID:199019'],
  fa: ['پیچش پاتولوژیک', 'انسداد مکانیکی', 'عروق مزانتریک را بفشارد', 'پایین چپ شکم', 'پایین راست شکم', 'دریچه ایلئوسکال', 'چرخش ۳۶۰ درجه', 'Bird-beak', 'CT می‌تواند به تأیید تشخیص کمک کند', 'شک به ایسکمی یا سوراخ‌شدگی', 'rID:199019'],
}

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${locale}: one main landmark`)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${locale}: one page title`)
  assert.equal((html.match(/<header\b/g) || []).length, 1, `${locale}: shared shell header only`)
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: direction and language`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale}: route renders ${phrase}`)
  assert.ok(html.includes('/abdomen/volvulus/sigmoid-radiograph-p76.png'), `${locale}: PDF radiograph crop renders`)
  assert.ok(html.includes('/abdomen/volvulus/sigmoid-ct-p78.png'), `${locale}: PDF CT crop renders`)
  assert.ok(html.includes('https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/'), `${locale}: WSES guidance is linked`)
  assert.ok(html.includes('https://fascrs.org/getattachment/Healthcare-Providers/Education/Clinical-Practice-Guidelines/2021-Colonic-Volvulus-CPG.pdf?lang=en-US'), `${locale}: ASCRS guideline is linked`)
  assert.ok(fs.existsSync(path.join(root, 'public/abdomen/volvulus/sigmoid-radiograph-p76.png')))
  assert.ok(fs.existsSync(path.join(root, 'public/abdomen/volvulus/sigmoid-ct-p78.png')))
  const questions = QUESTION_BANK[locale].filter(question => question.tags?.includes('volvulus'))
  assert.equal(questions.length, 1, `${locale}: only the focused volvulus question uses the volvulus tag`)
  assert.equal(questions[0].options.length, 4)
  assert.deepEqual(getQuestions(['volvulus'], locale, 1).map(question => question.id), [questions[0].id])
}
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'volvulus'))
assert.equal(getCardsByTopic('volvulus').length, 3)
for (const card of getCardsByTopic('volvulus')) for (const locale of ['de', 'en', 'fa']) assert.ok(card.front[locale] && card.answer[locale] && card.explanation[locale], `${card.id} has ${locale} content`)

console.log('PASS: p.76–78 volvulus source content and images render in DE/EN/FA; one shared title/main landmark; focused question and cards are correctly linked.')
