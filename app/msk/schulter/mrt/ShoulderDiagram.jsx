'use client'

import { useEffect, useRef, useState } from 'react'
import { canvasLabels, translatedDiagrams } from './shoulderDiagramCopy'
import styles from './shoulder.module.css'

const ink = '#e9f1f7'
const bone = '#9cabba'
const teal = '#55e1cb'
const gold = '#ffda8c'
const red = '#ff958c'

const diagrams = [
  {
    title: 'Planungsachsen und Rotatorenintervall',
    variants: [
      ['Axial → parakoronal', 'Die gestrichelte Referenz folgt dem Skapulablatt durch die Glenoidmitte.'],
      ['Parakoronal → parasagittal', 'Die Referenz verbindet oberen und unteren Glenoidpol.'],
      ['Axial · Intervall', 'LBS und SGHL liegen im Rotatorenintervall. Der obere Subscapularis grenzt ventral an.'],
    ],
  },
  {
    title: 'Akromion und Critical Shoulder Angle',
    variants: [
      ['CSA', 'Der Winkel öffnet sich am unteren Glenoidpol zwischen Glenoidlinie und lateralstem Akromionpunkt.'],
      ['Bigliani I–IV', 'Parasagittale Profile bei gleichbleibender Orientierung. Vorn liegt links.'],
    ],
  },
  {
    title: 'Partialrupturen im Sehnenquerschnitt',
    variants: [
      ['PASTA', 'Der Defekt öffnet sich an der artikulären Seite direkt am Footprint.'],
      ['Reverse PASTA', 'Der Defekt erreicht die bursale Sehnenoberfläche am Footprint.'],
      ['PAINT', 'Der artikuläre Defekt setzt sich innerhalb der Sehne nach medial fort.'],
      ['Interstitiell', 'Die Läsion bleibt innerhalb der Sehne. Beide Oberflächen sind durchgängig.'],
    ],
  },
  {
    title: 'Dicke und Breite einer Ruptur',
    variants: [
      ['Vorderes Bündel', 'Im vorderen Schnitt ist die Sehne durchgängig.'],
      ['Hinteres Bündel', 'Im hinteren Schnitt reicht der Defekt von der Bursa bis zum Gelenk.'],
      ['Tangentenzeichen', 'Der atrophierte Muskelbauch bleibt unter der Tangente von Korakoid zu Spina scapulae.'],
    ],
  },
  {
    title: 'Pulley und obere Subscapularisläsion',
    variants: [
      ['Intakter Pulley', 'Der Halteapparat führt die lange Bizepssehne in den Sulcus.'],
      ['Subscapularisläsion', 'Komma-Gewebe markiert den oberen retrahierten Sehnenrand. Die Bizepssehne kann nach medial abweichen.'],
    ],
  },
  {
    title: 'Intraartikuläre Kontaktzonen',
    variants: [
      ['Posterosuperior', 'Kontakt zwischen hinterem Tuberculum majus und posterosuperiorem Glenoidrand in ABER.'],
      ['Anterosuperior', 'Kontakt zwischen Tuberculum minus und vorderem Glenoidrand bei Innenrotation.'],
    ],
  },
  {
    title: 'Glenoid Track bei konstantem HSI',
    variants: [
      ['On-track · d = 0 mm', 'Bei D = 30 mm und d = 0 mm ist der Track 24,9 mm breit. Ein HSI von 23 mm liegt innerhalb des Tracks.'],
      ['Off-track · d = 5 mm', 'Bei D = 30 mm und d = 5 mm ist der Track 19,9 mm breit. Ein HSI von 23 mm reicht 3,1 mm darüber hinaus.'],
    ],
  },
  {
    title: 'Vergleich am anteroinferioren Glenoidrand',
    variants: [
      ['GLAD', 'Der Gelenkknorpel ist verletzt. Das Periost bleibt intakt.'],
      ['Perthes', 'Das abgelöste Labrum bleibt ortsständig. Der Periostschlauch bleibt intakt.'],
      ['ALPSA', 'Das Labrum ist zusammen mit dem abgehobenen Periostschlauch nach medial verlagert.'],
      ['Bankart', 'Das Labrum ist abgelöst und der Periostschlauch unterbrochen.'],
    ],
  },
  {
    title: 'Luxationsrichtung und Impressionsort',
    variants: [
      ['Anterior', 'Der Humeruskopf verlagert sich nach anterior. Die Impression liegt posterolateral.'],
      ['Posterior', 'Der Humeruskopf verlagert sich nach posterior. Die Impression liegt anteromedial.'],
    ],
  },
]

function draw(ctx, lesson, variant, lang) {
  ctx.scale(2, 2)
  ctx.fillStyle = '#111e2d'
  ctx.fillRect(0, 0, 440, 220)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const shape = (d, { fill, stroke, width = 2, dash = [] } = {}) => {
    const path = new Path2D(d)
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill(path)
    }
    if (stroke) {
      ctx.setLineDash(dash)
      ctx.lineWidth = width
      ctx.strokeStyle = stroke
      ctx.stroke(path)
      ctx.setLineDash([])
    }
  }
  const line = (d, stroke, width = 2, dash = []) => shape(d, { stroke, width, dash })
  const dot = (x, y, r, fill) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = fill
    ctx.fill()
  }
  const label = (value, x, y, fill = ink) => {
    const translated = canvasLabels[lang]?.[value] ?? value
    ctx.font = lang === 'fa' ? '600 13px Vazirmatn, sans-serif' : '600 13px system-ui, sans-serif'
    ctx.direction = /[\u0600-\u06ff]/u.test(translated) ? 'rtl' : 'ltr'
    ctx.textAlign = 'left'
    ctx.fillStyle = fill
    ctx.fillText(translated, x, y, 434 - x)
  }
  const head = (x, y, r = 56) => {
    dot(x, y, r + 2, bone)
    dot(x, y, r, '#344457')
  }
  const glenoid = () => shape('M62 129L189 96Q215 74 232 79Q207 114 228 149Q208 158 183 144L68 157Z', { fill: '#344457', stroke: bone })
  const coronal = () => {
    shape('M70 175L172 124Q191 98 218 94Q198 123 216 151L100 194Z', { fill: '#344457', stroke: bone })
    head(284, 124)
    line('M173 55Q233 26 335 47', bone, 14)
  }
  const tendon = () => shape('M50 90Q171 64 295 91L342 104L336 139L289 124Q169 97 50 125Z', { fill: '#275e63', stroke: teal })
  const lesion = d => shape(d, { fill: red })
  const point = (x, y) => dot(x, y, 4, gold)

  switch (lesson) {
    case 0:
      if (variant === 1) {
        coronal()
        line('M211 48L210 187', gold, 2, [6, 6])
        point(211, 96)
        point(210, 150)
        label('Glenoidpole', 104, 106, gold)
        label('Humeruskopf', 258, 126)
      } else {
        glenoid()
        head(292, 117)
        if (variant === 0) {
          line('M54 162L383 64', gold, 2, [6, 6])
          point(219, 113)
          label('Skapulablatt', 62, 109)
          label('Glenoidmitte', 138, 182, gold)
          label('Humeruskopf', 246, 125)
        } else {
          line('M125 54Q230 29 271 68', teal, 9)
          line('M226 75Q250 55 285 62', gold, 3)
          dot(291, 64, 7, red)
          label('Subscapularis', 106, 36, teal)
          label('SGHL', 220, 55, gold)
          label('LBS', 307, 59, red)
          label('Ventral', 359, 30)
        }
      }
      break
    case 1:
      if (variant === 0) {
        coronal()
        line('M210 150L210 89M210 150L336 47', gold, 2)
        line('M210 115Q223 113 237 128', gold, 2)
        point(210, 150)
        point(210, 89)
        point(336, 47)
        label('CSA', 227, 111, gold)
        label('Laterales Akromion', 290, 28)
        label('Glenoid', 126, 142)
      } else {
        const outlines = ['M0 4L75 4', 'M0 13Q31 -14 75 1', 'M0 19Q8 -6 75 1', 'M0 -4Q35 24 75 -4']
        outlines.forEach((d, i) => {
          ctx.save()
          ctx.translate(26 + i * 102, 103)
          line(d, i === 2 ? gold : bone, 7)
          label(['I · Flach', 'II · Gebogen', 'III · Haken', 'IV · Konvex'][i], 0, 60)
          ctx.restore()
        })
        label('Anterior ←', 26, 45)
      }
      break
    case 2:
      tendon()
      line('M342 88L333 157', bone, 9)
      lesion([
        'M305 129L321 109L337 122L335 139Z',
        'M308 96L327 118L342 115L342 104Z',
        'M305 129L319 109Q247 106 213 91Q264 93 327 100L337 122L335 139Z',
        'M179 91Q261 91 317 115Q243 109 179 91Z',
      ][variant])
      label('Bursaseite', 53, 61)
      label('Gelenkseite', 53, 154)
      label('Footprint', 339, 184)
      break
    case 3:
      if (variant === 2) {
        line('M116 165L212 114L322 172M212 114L212 187', bone, 12)
        line('M116 165L156 66M322 172L305 66', bone, 13)
        shape('M148 120Q216 75 305 123L274 153L215 138L172 152Z', { fill: '#275e63', stroke: teal })
        line('M156 63L305 63', gold, 2, [6, 5])
        label('Korakoid', 110, 46)
        label('Spina scapulae', 286, 46)
        label('Muskel', 204, 119, teal)
      } else {
        tendon()
        line('M342 88L333 157', bone, 9)
        if (variant === 1) {
          shape('M258 83L286 87L283 124L254 118Z', { fill: '#111e2d' })
          line('M258 83L254 118M286 87L283 124', red, 4)
          label('Transmural', 240, 158, red)
        } else label('Durchgängige Sehne', 147, 159, teal)
        label('Bursaseite', 52, 62)
        label('Gelenkseite', 52, 190)
      }
      break
    case 4:
      glenoid()
      head(293, 126)
      line('M185 46Q206 29 230 43', bone, 12)
      line(variant ? 'M47 69Q124 36 206 65' : 'M47 69Q154 23 267 70', teal, 10)
      if (variant) line('M208 66Q224 69 220 88L212 96', red, 5)
      else line('M252 69Q270 49 291 70', gold, 4)
      dot(variant ? 240 : 275, 68, 7, gold)
      label('Subscapularis', 33, 38, teal)
      label(variant ? 'Komma-Zeichen' : 'Pulley', 98, 101, variant ? red : gold)
      label('LBS', variant ? 231 : 300, 48, gold)
      label('Ventral', 357, 32)
      break
    case 5: {
      glenoid()
      head(286, 117)
      const y = variant ? 82 : 151
      dot(224, y, 10, red)
      dot(244, y, 6, gold)
      label('Ventral', 50, 40)
      label('Dorsal', 50, 185)
      label('Superiorer Kontaktbereich', 238, variant ? 57 : 191, red)
      break
    }
    case 6: {
      head(92, 109, 50)
      if (variant) {
        shape('M125 67L152 67L152 151L125 151Z', { fill: '#111e2d' })
        line('M125 70L125 148', red, 2)
        line('M125 72Q159 109 125 146', bone, 2, [4, 5])
        line('M125 169L142 169M125 165V173M142 165V173', red)
        label('d', 130, 158, red)
      }
      line('M42 109L142 109', gold, 2, [5, 4])
      label('D', 87, 101, gold)
      label('Glenoid en face', 43, 192)
      const trackEnd = variant ? 318 : 347
      line('M206 79L' + trackEnd + ' 79', teal, 12)
      label(variant ? 'GT 19,9 mm' : 'GT 24,9 mm', 205, 56, teal)
      line('M206 133L336 133', gold, 12)
      if (variant) line('M318 133L336 133', red, 12)
      label('HSI 23 mm', 205, 158, gold)
      break
    }
    case 7: {
      shape('M53 150L226 123L225 48L158 55L52 122Z', { fill: '#344457', stroke: bone })
      line(variant === 0 ? 'M227 54L227 94M227 108L227 120' : 'M227 54L227 119', teal, 6)
      if (variant === 0) line('M228 94L228 106', red, 4)
      const labrum = ['M225 120L245 113L242 136Z', 'M231 125L252 119L248 143Z', 'M178 154L200 137L205 157Z', 'M243 135L268 123L263 146Z']
      shape(labrum[variant], { fill: gold })
      const periosteum = ['M63 153L222 131Q242 153 272 147', 'M63 153L222 137Q243 157 272 151', 'M63 153L169 150Q195 178 269 159', 'M63 153L212 135M249 152L275 157']
      line(periosteum[variant], '#bcabff', 3)
      label('Knorpel', 240, 76, teal)
      label('Labrum', 292, 127, gold)
      label('Periost', 92, 182, '#bcabff')
      label('← Medial', 61, 54)
      break
    }
    case 8: {
      glenoid()
      head(286, variant ? 151 : 70, 47)
      if (variant) lesion('M247 123L267 109L260 130Z')
      else lesion('M308 108L324 97L330 91L329 111Z')
      dot(222, variant ? 146 : 82, 6, gold)
      label('Anterior', 50, 45)
      label('Posterior', 50, 188)
      label(variant ? 'Reverse Hill-Sachs' : 'Hill-Sachs', variant ? 286 : 328, variant ? 94 : 130, red)
      label(variant ? 'Reverse Bankart' : 'Bankart', 109, variant ? 178 : 71, gold)
      break
    }
  }
}

export default function ShoulderDiagram({ lesson, lang, schemaLabel }) {
  const { title, variants } = (translatedDiagrams[lang] ?? diagrams)[lesson]
  const [variant, setVariant] = useState(0)
  const canvas = useRef(null)
  const [label, description] = variants[variant]

  useEffect(() => {
    const context = canvas.current.getContext('2d')
    if (!context) return
    let active = true
    const paint = () => {
      if (!active) return
      context.setTransform(1, 0, 0, 1, 0, 0)
      draw(context, lesson, variant, lang)
    }
    paint()
    if (lang === 'fa') document.fonts?.load('600 13px Vazirmatn').then(paint).catch(() => {})
    return () => { active = false }
  }, [lesson, variant, lang])

  return <figure className={styles.diagram}>
    <figcaption><span>{schemaLabel}</span><strong>{title}</strong></figcaption>
    <div className={styles.controls} role="group" aria-label={title}>
      {variants.map(([name], index) => <button key={name} type="button"
        aria-pressed={variant === index} onClick={() => setVariant(index)}>{name}</button>)}
    </div>
    <canvas ref={canvas} width={880} height={440} role="img" aria-label={label + '. ' + description} />
    <p aria-live="polite">{description}</p>
  </figure>
}
