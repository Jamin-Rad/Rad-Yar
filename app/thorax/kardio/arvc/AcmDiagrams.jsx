'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const COPY = {
  de: {
    schematic: 'Schema · betonte Beteiligung',
    distribution: { rv: 'Rechte Kammer', both: 'Beide Kammern', lv: 'Linke Kammer' },
    layers: ['Subepikardial', 'Intramural', 'Subendokardial'],
    caption: 'Schema der LV-Wand in kurzer Achse. Orange markiert die Lage des LGE.',
  },
  en: {
    schematic: 'Diagram · main involvement',
    distribution: { rv: 'Right ventricle', both: 'Both ventricles', lv: 'Left ventricle' },
    layers: ['Subepicardial', 'Midwall', 'Subendocardial'],
    caption: 'Diagram of the LV wall in short axis. Orange marks the location of LGE.',
  },
  fa: {
    schematic: 'نمای شماتیک · محل درگیری بارز',
    distribution: { rv: 'بطن راست', both: 'هر دو بطن', lv: 'بطن چپ' },
    layers: ['زیر اپی‌کارد', 'میان‌دیواره‌ای', 'زیر اندوکارد'],
    caption: 'نمای شماتیک دیوارهٔ بطن چپ در محور کوتاه. رنگ نارنجی محل LGE را نشان می‌دهد.',
  },
}

export function VentricleDiagram({ pattern }) {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={styles.ventricleDiagram}>
    <svg viewBox="0 0 240 146" aria-hidden="true">
      <path data-highlight={pattern !== 'lv'} d="M111 27C88 11 59 14 42 31C12 61 34 101 107 125C78 97 81 61 111 27Z"/>
      <path data-highlight={pattern !== 'rv'} d="M120 29C146 8 183 15 198 42C213 68 193 108 134 131C93 106 83 62 120 29Z"/>
      <text x="62" y="64">RV</text>
      <text x="150" y="73">LV</text>
    </svg>
    <figcaption>{copy.schematic}: <strong>{copy.distribution[pattern]}</strong></figcaption>
  </figure>
}

const LAYERS = [
  'M48 16 A35 35 0 0 1 83 51',
  'M48 25 A26 26 0 0 1 74 51',
  'M48 33 A18 18 0 0 1 66 51',
]

export function ScarLayerDiagrams() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={styles.scarLayerDiagrams}>
    <ul>
      {LAYERS.map((arc, index) => <li key={arc}>
        <svg viewBox="0 0 96 102" aria-hidden="true">
          <circle className={styles.scarWall} cx="48" cy="51" r="39"/>
          <circle className={styles.scarCavity} cx="48" cy="51" r="14"/>
          <path className={styles.scarArc} d={arc}/>
        </svg>
        <span>{copy.layers[index]}</span>
      </li>)}
    </ul>
    <figcaption>{copy.caption}</figcaption>
  </figure>
}
