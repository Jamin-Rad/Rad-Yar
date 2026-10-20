import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
let activeLanguage = 'de'
const shell = ({ children }) => React.createElement(React.Fragment, null, children)
const source = transformSync(fs.readFileSync('app/thorax/pneumonie-muster/page.js', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)(name => {
  if (name === 'next/link') return { __esModule: true, default: Link }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: activeLanguage }) }
  if (name === '@/components/LessonReferenceShell') return { __esModule: true, default: shell }
  if (name.endsWith('.module.css')) return styles
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language/direction`)
  assert.ok(html.includes(escape(lang === 'de' ? 'Pleuraempyem / Split-Pleura-Zeichen' : lang === 'en' ? 'Empyema / split pleura sign' : 'آمپیما / علامت split pleura')), `${lang}: empyema row`)
  assert.ok(html.includes(escape(lang === 'de' ? 'Postinfektiöse Pneumatozele' : lang === 'en' ? 'Postinfectious pneumatocele' : 'پنوماتوسل پس از عفونت')), `${lang}: pneumatocele row`)
  assert.ok(html.includes(escape(lang === 'de' ? 'Thorax 34 (PDF p.35)' : lang === 'en' ? 'Thorax 34 (PDF p.35)' : 'Thorax صفحه ۳۴ (صفحه PDF ۳۵)')), `${lang}: exact source page`)
  assert.match(html, /PJP/)
  assert.match(html, /Pneumatozele|pneumatocele|پنوماتوسل/)
  assert.match(html, /Abszesshöhle|abscess cavity|حفرهٔ آبسه/)
}
assert.match(fs.readFileSync('app/thorax/pneumonie-muster/page.js', 'utf8'), /not diagnostic by itself/)
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/pneumonia-thorax-p35-printed-p34.md', 'utf8'), /10\.1148\/radiology\.135\.3\.7384467/)
assert.match(fs.readFileSync('docs/lesson-quality/source-ledgers/pneumonia-thorax-p35-printed-p34.md', 'utf8'), /10\.1148\/radiology\.74\.1\.50/)
const ids = []
const visit = value => { if (!value) return; if (Array.isArray(value)) return value.forEach(visit); if (typeof value !== 'object') return; if (value.id === 'bakterielle-pneumonie') ids.push(value); Object.values(value).forEach(visit) }
visit(CURRICULUM)
assert.ok(ids.some(item => item.link === '/thorax/pneumonie-muster'), 'existing route remains linked; no new curriculum ID')
console.log('Pneumonia Thorax.pdf physical p.35 / printed p.34 actual-route SSR PASS: DE/EN/FA, RTL, empyema split-pleura context, abscess distinction, postinfectious/PJP pneumatocele separation, exact page and existing curriculum route.')
