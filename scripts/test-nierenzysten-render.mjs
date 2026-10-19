import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: (_id, ids) => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': ({ title, imageSrc, imageAlt }) => React.createElement('div', { className: 'hero', role: 'img', 'aria-label': imageAlt }, title, imageSrc),
  '@/lib/lessonHashNavigation': { observeLessonHash }, './StandardLessonShell.module.css': styles,
})
let lang = 'de'
const Page = compile('app/abdomen/niere/nierenzysten/page.js', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  './page.module.css': styles,
}).default
const esc = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale} direction`)
  const criteria = locale === 'de' ? ['IIF', 'III', 'IV', 'spitzen Winkeln jeder Größe', 'stumpfen Winkeln ≤3 mm']
    : locale === 'en' ? ['IIF', 'III', 'IV', 'acute margins of any size', 'obtuse margins ≥4 mm']
      : ['IIF', 'III', 'IV', 'زاویه تیز در هر اندازه', 'زاویه‌های باز و اندازه ≤۳ میلی‌متر']
  for (const label of criteria) assert.ok(html.includes(label), `${locale} includes localized Bosniak criteria: ${label}`)
  assert.ok(html.includes(locale === 'fa' ? '۲۵٪' : locale === 'de' ? '25 %' : '25%'), `${locale} localized cystic-mass scope`)
  assert.ok(html.includes(locale === 'de' ? 'Zystische Nierenmassen' : locale === 'en' ? 'Cystic renal masses' : 'توده‌های کیستیک کلیه'), `${locale} localized title`)
  assert.ok(html.includes(locale === 'de' ? 'Silverman' : locale === 'fa' ? 'Silverman' : 'Silverman'), `${locale} primary reference`)
  assert.ok(html.includes('hero.svg'), `${locale} topic schematic`)
  assert.ok(html.includes(locale === 'fa' ? 'کیست‌های ساده کلیه' : locale === 'en' ? 'Simple renal cysts' : 'Einfache Nierenzysten'), `${locale} localized lesson content`)
}
const source = fs.readFileSync('app/abdomen/niere/nierenzysten/page.js', 'utf8')
assert.ok(!source.includes('getLungenanatomieCheckFeedback'), 'renal lesson has its own assessment feedback')
for (const phrase of ['Richtig. Bei v2019 sprechen mindestens vier dünne', 'Noch einmal prüfen: Enhancement allein macht', 'Correct. In v2019, at least four thin', 'Review the morphology: enhancement alone', 'درست است. در نسخه ۲۰۱۹، دست‌کم چهار', 'مورفولوژی را دوباره بررسی کنید: تقویت به‌تنهایی', 'nonenhancing heterogeneously T1-hyperintense mass on fat-suppressed MRI', 'ضخامت ۳ میلی‌متر', 'obtuse margins ≥4 mm', 'زاویه باز و اندازه ≥۴ میلی‌متر']) assert.ok(source.includes(phrase), `reviewed criteria/localized content: ${phrase}`)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'nierenzysten'[^\n]*link: '\/abdomen\/niere\/nierenzysten'[^\n]*inProgress: true/)
const hero = fs.readFileSync('public/educational/nierenzysten/hero.svg', 'utf8')
assert.ok(!hero.includes('<text'), 'hero schematic has no unlocalized visible SVG labels')
assert.ok(fs.existsSync('public/educational/nierenzysten/image-provenance.json'))
console.log('Renal cyst actual-route SSR PASS: DE/EN/FA, RTL, current Bosniak morphology, source citation, localized schematic, distinct answer feedback content and asset provenance.')
