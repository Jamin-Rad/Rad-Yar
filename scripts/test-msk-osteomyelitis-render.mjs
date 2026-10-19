import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const swc = require('next/dist/build/swc')
let language = 'de'

const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, request.slice(2))
  return originalResolve.call(this, request, parent, ...rest)
}

const loader = (module, filename) => {
  const { code } = swc.transformSync(require('node:fs').readFileSync(filename, 'utf8'), {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  })
  module._compile(code, filename)
}
require.extensions['.js'] = loader
require.extensions['.jsx'] = loader
require.extensions['.css'] = module => { module.exports = {} }

const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
  if (request === '@/components/LessonHero') return ({ title, imageSrc, imageAlt }) => React.createElement('header', null, React.createElement('h1', null, title), React.createElement('img', { src: imageSrc, alt: imageAlt }))
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: language }) }
  if (request === '@/hooks/useLehrModeActive') return { useLehrModeActive: () => false }
  if (request === '@/hooks/usePersistedSectionProgress') return { usePersistedSectionProgress: () => [new Set(), () => {}] }
  if (request === '@/lib/lessonHashNavigation') return { observeLessonHash: () => () => {} }
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/msk/infektionen/osteomyelitis/page.jsx'))
const expected = {
  de: ['Osteomyelitis als Knochenläsion', 'Wie passt der Brodie-Abszess ins Bild?'],
  en: ['Osteomyelitis as a bone lesion', 'How does a Brodie abscess fit the pattern?'],
  fa: ['استئومیلیت به‌عنوان ضایعه استخوانی', 'آبسه برودی چگونه در الگو می‌گنجد؟'],
}

for (const locale of Object.keys(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  assert.match(html, new RegExp(`lang="${locale}"`), `${locale} route language`)
  assert.ok(html.includes('data-lehr-sections-managed="true"'), `${locale} route uses the maintained lesson shell`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('aria-expanded="true"'), `${locale} SSR includes an initially open chapter`)
  assert.ok(html.includes('bone-focus.svg'), `${locale} SSR includes the topic schematic`)
}

console.log('MSK osteomyelitis route SSR passed for DE/EN/FA (shared app providers and shell boundaries stubbed). Browser UX and clinical approval remain separate.')
