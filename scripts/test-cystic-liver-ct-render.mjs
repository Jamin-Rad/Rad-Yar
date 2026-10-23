import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
const Image = ({ alt, src, width, height, ...props }) => React.createElement('img', { alt, src, width, height, ...props })
const Shell = ({ children, lang, title }) => React.createElement('div', { lang, 'data-title': title }, children)

function compilePage() {
  const source = transformSync(fs.readFileSync('app/abdomen/leber/zystische-laesionen/page.js', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => {
    if (name === 'next/image') return { __esModule: true, default: Image }
    if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: activeLanguage }) }
    if (name === '@/components/LessonReferenceShell') return { __esModule: true, default: Shell }
    if (name === './page.module.css') return styles
    return require(name)
  }, mod, mod.exports)
  return mod.exports.default
}

const Page = compilePage()
const expected = {
  de: ['links arterielle, rechts portalvenöse Phase', 'keine Zeitangaben abgeleitet', 'links arterielle'],
  en: ['arterial phase left, portal-venous phase right', 'no timing is inferred', 'arterial phase on the left'],
  fa: ['فاز شریانی در چپ و فاز وریدی پورت در راست', 'زمان‌بندی استنباط نشده است', 'فاز شریانی در چپ'],
}

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`), `${lang} language is rendered`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} direction is rendered`)
  assert.ok(html.includes('/educational/hydatid-liver/source-ct-phases-p6.png'), `${lang} p.6 CT asset is rendered`)
  assert.ok(html.includes('/educational/hydatid-liver/source-mri-p7.jpg'), `${lang} existing p.7 MRI asset remains rendered`)
  for (const phrase of expected[lang]) assert.ok(html.includes(phrase), `${lang} contains localized phase attribution: ${phrase}`)
  const imageMatch = html.match(/<img[^>]*src="\/educational\/hydatid-liver\/source-ct-phases-p6\.png"[^>]*>/)
  assert.ok(imageMatch && /alt="[^"]+"/.test(imageMatch[0]), `${lang} CT image has translated alt text`)
}

const asset = 'public/educational/hydatid-liver/source-ct-phases-p6.png'
assert.ok(fs.existsSync(asset), 'p.6 CT crop exists')
const provenance = JSON.parse(fs.readFileSync('public/educational/hydatid-liver/source-provenance.json', 'utf8'))
const ctProvenance = provenance.additionalSourceImages.find(entry => entry.image === 'source-ct-phases-p6.png')
assert.equal(ctProvenance.pdfPage, 6)
assert.equal(ctProvenance.printedPage, 5)
assert.equal(ctProvenance.figurePanels[0].phase, 'arterial phase (source label)')
assert.equal(ctProvenance.figurePanels[1].phase, 'portal-venous phase (source label)')
assert.match(ctProvenance.crop, /labels and source arrows were preserved/)
assert.match(ctProvenance.reuseTerms, /user's explicit project authorization/)

console.log('Cystic liver CT visual delta SSR PASS: p.6 arterial/portal-venous labels, localized captions/alt, existing p.7 MRI, RTL markup and source provenance verified in DE/EN/FA.')
