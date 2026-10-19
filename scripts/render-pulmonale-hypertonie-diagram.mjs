import fs from 'node:fs/promises'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import * as DiagramModule from '../components/PulmonaryHypertensionDiagram.jsx'

const Diagram = DiagramModule.default?.default || DiagramModule.default
const PulmonaryHypertensionFigureCaption = DiagramModule.PulmonaryHypertensionFigureCaption

const outDir = new URL('../tmp/ph-diagram-review/', import.meta.url)
await fs.mkdir(outDir, { recursive: true })

for (const lang of ['de', 'en', 'fa']) {
  const diagram = renderToStaticMarkup(React.createElement(Diagram, { lang }))
  const caption = PulmonaryHypertensionFigureCaption({ lang })
  const lines = lang === 'fa'
    ? ['شماتیک آموزشی غیرتشخیصی', 'شریان ریوی، نسبت PA/Ao و قلب راست را', 'با هم بسنجید؛ هیچ‌کدام به‌تنهایی تشخیصی نیست.']
    : lang === 'de'
      ? ['Nichtdiagnostisches Lehrschema: Pulmonalarterienweite, PA/Ao-Verhältnis und rechtes', 'Herz gemeinsam beurteilen. Keines davon ist allein diagnostisch.']
      : ['Non-diagnostic teaching schematic: assess pulmonary-artery enlargement, PA/Ao ratio', 'and right-heart size together. None is diagnostic alone.']
  const captionSvg = lines.map((line, index) => lang === 'fa'
    ? `<text x="380" y="${360 + index * 18}" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" fill="#303746" font-family="Arial,sans-serif" font-size="13">${line}</text>`
    : `<text x="22" y="${368 + index * 22}" fill="#303746" font-family="Arial,sans-serif" font-size="16">${line}</text>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420"><rect width="760" height="420" fill="#fff"/>${diagram.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}${captionSvg}</svg>`
  const path = new URL(`ph-${lang}.png`, outDir)
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(path))
  console.log(`${lang}: ${fileURLToPath(path)}; caption chars=${caption.length}`)
}
