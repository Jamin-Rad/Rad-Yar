import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { HRCT_LESSONS, HRCT_QUESTIONS } from '../data/hrct-muster.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
let lang = 'de'
const Page = compile('components/HrctPatternLesson.jsx', {
  'next/link': Link,
  '@/components/InProgressBanner': () => null,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/app/abdomen/gi/divertikulitis/page.module.css': styles,
}).default
const lesson = HRCT_LESSONS['hrct-dichteanhebung']
const section = lesson.sections.find(item => item.id === 'ggo')
const shapeCard = section.cards.find(card => card.title.de === 'Ausdehnung und Form beschreiben')
assert.ok(lesson.sourceReferences.some(ref => ref.source === 'Thorax.pdf' && ref.pages.includes(13)))
assert.ok(shapeCard, 'p.13 morphology note is placed in existing GGO/consolidation chapter')
assert.match(shapeCard.text.de, /homogen, fleckig oder flächig\/konfluierend/)
assert.match(shapeCard.text.de, /Form allein ist nicht diagnostisch/)
assert.match(shapeCard.text.en, /homogeneous, patchy or extensive\/confluent/)
assert.match(shapeCard.text.fa, /یکنواخت، لکه‌ای یا گسترده\/به‌هم‌پیوسته/)
const consolidation = section.images.find(image => image.radiopaediaUrl?.endsWith('/30227'))
const reverseHalo = section.images.find(image => image.radiopaediaUrl?.endsWith('/26531'))
assert.ok(consolidation && reverseHalo)
for (const image of [consolidation, reverseHalo]) {
  for (const locale of ['de','en','fa']) {
    assert.match(image.caption[locale], /13|۱۳/)
    assert.match(image.caption[locale], /12|۱۲/)
    assert.ok(image.caption[locale].includes(String(image === consolidation ? 30227 : 26531)) || image.caption[locale].includes('rID'), `${locale}: visible case ID`)
  }
}
const existingGgoQuestion = HRCT_QUESTIONS.en.find(question => question.question.includes('distinguishes GGO from consolidation'))
assert.ok(existingGgoQuestion, 'existing assessment still tests the vessels-visible distinction')
assert.match(existingGgoQuestion.explanation, /preserves vascular/)
for (const locale of ['de','en','fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page, { lesson }))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(shapeCard.title[locale]) && html.includes(shapeCard.text[locale]), `${locale}: morphology card is rendered`)
  for (const image of [consolidation, reverseHalo]) {
    assert.ok(html.includes(image.caption[locale]), `${locale}: localized image provenance caption`)
    assert.ok(html.includes(image.radiopaediaUrl), `${locale}: visible Radiopaedia source link`)
  }
}
const ledger = fs.readFileSync('docs/lesson-quality/hrct-dichteanhebung-thorax-p13.md', 'utf8')
assert.match(ledger, /COP, fungal pneumonia, tuberculosis and adenocarcinoma associations listed under reverse halo[\s\S]*Deferred/)
assert.match(ledger, /PDF p\.13 \/ printed p\.12/)
console.log('Thorax.pdf p.13 HRCT density delta SSR PASS: morphology/distribution, cautious shape claim, DE/EN/FA RTL, both image page/rID captions and links; existing GGO assessment remains aligned.')
