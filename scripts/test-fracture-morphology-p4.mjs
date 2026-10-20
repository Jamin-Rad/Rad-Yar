import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { FRAKTUR_LESSON } from '../data/frakturbeschreibung.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Image = ({ src, alt, ...props }) => React.createElement('img', { src, alt, ...props })
let lang = 'de'
const source = fs.readFileSync('app/msk/trauma/frakturbeschreibung/page.js', 'utf8')
const compiled = transformSync(source, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', compiled)(name => ({
  'next/link': Link,
  'next/image': Image,
  '@/components/InProgressBanner': () => null,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/data/frakturbeschreibung': { FRAKTUR_LESSON },
  '../../../abdomen/gi/divertikulitis/page.module.css': styles,
}[name] ?? require(name)), module, module.exports)

const morphology = FRAKTUR_LESSON.morphologie
assert.equal(morphology.sourceMorphologyRows.length, 3)
assert.match(morphology.sourceMorphologyNote.de, /Neun Quellbegriffe.*Abriss-\/Avulsionsfraktur/s)
assert.match(morphology.sourceMorphologyNote.en, /Nine source labels.*avulsion fractures/s)
assert.match(morphology.sourceMorphologyNote.fa, /نه برچسب منبع.*کندگی/s)
assert.match(morphology.sourceMorphologyNote.en, /bending-wedge row explains one component/)
const extras = morphology.sourceMorphologyRows
assert.equal(extras[0][0].de, 'Stauchungsfraktur')
assert.match(extras[0][1].de, /nicht automatisch eine Impaktion/)
assert.match(extras[0][1].en, /does not automatically mean impaction/)
assert.match(extras[0][1].fa, /به‌طور خودکار به معنی درهم‌رفتگی انتهای شکستگی نیست/)
assert.equal(extras[1][0].de, 'Meißelfraktur')
assert.match(extras[1][1].de, /ohne es im Text weiter zu definieren/)
assert.match(extras[2][0].de, /Schrägfraktur mit Biegungskeil/)
assert.match(extras[2][1].de, /Kombiniertes Muster/)
for (const locale of ['de', 'en', 'fa']) {
  for (const row of extras) for (const cell of row) assert.ok(cell[locale], `${locale}: localized source comparison`)
  assert.ok(morphology.sourceMorphologyAlt[locale] && morphology.sourceMorphologyCredit[locale])
}
const imagePath = `public${morphology.sourceMorphologyImage}`
assert.ok(fs.existsSync(imagePath), 'source figure crop exists')
const imageMeta = await sharp(imagePath).metadata()
assert.equal(imageMeta.width, 830)
assert.equal(imageMeta.height, 895)

for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(module.exports.default))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(morphology.sourceMorphologyImage))
  assert.ok(html.includes(morphology.sourceMorphologyCredit[locale]))
  for (const row of extras) for (const cell of row) assert.ok(html.includes(cell[locale]), `${locale}: rendered ${cell[locale]}`)
}

const ledger = fs.readFileSync('docs/lesson-quality/msk-fracture-description-pilot.md', 'utf8')
assert.match(ledger, /MSK\.pdf p\.4 \(printed p\.3\)/)
for (const label of ['Stauchungsfraktur', 'Meißelfraktur', 'Schrägfraktur mit Biegungskeil']) assert.ok(ledger.includes(label), `ledger: ${label}`)
for (const [index, label] of ['Fissur', 'Querfraktur', 'Schrägfraktur', 'Schrägfraktur mit Biegungskeil', 'Spiralfraktur', 'Stauchungsfraktur', 'Stückfraktur', 'Trümmerfraktur', 'Impressionsfraktur', 'Meißelfraktur', 'Abrissfraktur', 'Kompressionsfraktur'].entries()) {
  assert.ok(ledger.includes(label), `ledger maps existing source morphology ${index + 1}: ${label}`)
}
const provenance = JSON.parse(fs.readFileSync('public/educational/msk-fracture-morphologies-p4.provenance.json', 'utf8'))
assert.equal(provenance.source, 'Dr. Zia, MSK.pdf, PDF page 4 (printed page 3)')
assert.deepEqual(provenance.cropPixels, { left: 230, top: 55, width: 830, height: 895 })
console.log('MSK.pdf p.4 fracture morphology actual-route SSR PASS: three translated additions, source crop/attribution, Stauchung vs impaction caveat, and covered-label reconciliation; browser and scientific review remain separate.')
