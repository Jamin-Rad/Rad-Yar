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
  if (request === 'next/image') return ({ src, alt, width, height, ...props }) => React.createElement('img', { src, alt, width, height, ...props })
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang }) }
  if (request === '@/components/InProgressBanner') return () => null
  if (request === '@/components/LessonReferenceShell') return ({ children, check }) => React.createElement(React.Fragment, null,
    children,
    React.createElement('aside', { 'data-shell-check': true }, check.question[lang], ...check.options.map(option => React.createElement('span', { key: option.de }, option[lang]))),
  )
  if (request === '@/components/SmallBowelFecesCard' || request === '@/components/IschaemiaWarningCard') return () => null
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/abdomen/gi/ileus-volvulus/page.js'))
for (const file of ['rid-232928-transverse.png', 'rid-232928-longitudinal.png']) {
  assert.ok(fs.statSync(path.join(root, 'public/educational/ileus-intussusception', file)).size > 100_000, `${file} exists and is non-empty`)
}

const expected = {
  de: ['Intussuszeption', 'Invagination', '4–9 Monaten', 'Abdomensonografie', 'Ziel- oder Doughnut-Zeichen', 'Pseudokidney', 'Radiopaedia: Intussusception, rID 232928', '2 Monate alt'],
  en: ['Intussusception', 'telescopes', '4–9 months', 'abdominal ultrasound', 'target sign', 'pseudokidney', 'Radiopaedia: Intussusception, rID 232928', '2 months old'],
  fa: ['اینتوساسپشن', 'فرو می‌رود', '۴ تا ۹ ماهگی', 'سونوگرافی شکم', 'علامت هدف', 'شبه‌کلیه', 'Radiopaedia: Intussusception, rID 232928', '۲ ماهه'],
}
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} render includes ${phrase}`)
  assert.ok(html.includes('rid-232928-transverse.png'), `${locale} renders transverse source image`)
  assert.ok(html.includes('rid-232928-longitudinal.png'), `${locale} renders longitudinal source image`)
  assert.ok(!html.includes('Befund &amp; Selbsttest'), `${locale} has no invented boilerplate chapter`)
}
console.log('PASS: intussusception definition, age context, initial imaging and two case views render in DE/EN/FA')
