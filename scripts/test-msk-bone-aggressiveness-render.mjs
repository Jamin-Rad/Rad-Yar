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
  if (request === '@/components/Navbar' || request === '@/components/Footer') return () => null
  if (request === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: language }) }
  if (request === '@/hooks/useLessonReadStatus') return { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: '' }) }
  if (request === '@/hooks/usePersistedSectionProgress') return { usePersistedSectionProgress: () => [new Set(), () => {}] }
  return originalLoad.call(this, request, parent, isMain)
}

const { default: Route } = require(path.join(root, 'app/msk/tumoren/knochenzeichen/page.js'))
const expected = {
  de: ['Aggressivität fokaler Knochenläsionen', 'Das Muster ist nicht exklusiv.', 'Endosteales Scalloping'],
  en: ['Aggressiveness of focal bone lesions', 'The pattern is not exclusive.', 'Endosteal scalloping'],
  fa: ['ارزیابی تهاجمی‌بودن ضایعات کانونی استخوان', 'اختصاصی آن‌ها نیست', 'فرسایش اندوستئال'],
}

for (const locale of Object.keys(expected)) {
  language = locale
  const html = renderToStaticMarkup(React.createElement(Route))
  assert.match(html, new RegExp(`lang="${locale}"`), `${locale} route language`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${locale} route uses the maintained source lesson shell`)
  for (const phrase of expected[locale]) assert.ok(html.includes(phrase), `${locale} SSR includes ${phrase}`)
  assert.ok(html.includes('aria-expanded="true"'), `${locale} SSR includes an initially open chapter`)
  assert.ok(html.includes('msk-bone-aggressiveness.svg'), `${locale} SSR includes the topic schematic`)
}

console.log('MSK bone aggressiveness route SSR passed for DE/EN/FA. Browser UX, diagnostic-case image review and clinical approval remain separate.')
