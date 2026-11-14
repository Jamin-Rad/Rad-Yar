'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { LGE_PATTERN_SOURCE } from './lessonContent'
import styles from './page.module.css'

const LGE_IMAGE = '/thorax/kardio/arvc/lge-patterns-sokolska-2025.png'
const CC_BY = 'https://creativecommons.org/licenses/by/4.0/'

const COPY = {
  de: {
    lge: 'Die Pfeile zeigen die Lage des LGE. Von links nach rechts: subendokardial (an der Kammerinnenseite), transmural (durch die ganze Wand), subepikardial (außen) und intramural (in der Wandmitte).',
    lgeAlt: 'Vier originale Herz-MRTs in kurzer Achse mit Pfeilen auf die unterschiedlichen LGE-Muster.',
    enlarge: 'Abbildung in voller Größe öffnen',
  },
  en: {
    lge: 'The arrows show the location of LGE. From left to right: subendocardial (at the inner border), transmural (through the entire wall), subepicardial (at the outer border), and midwall.',
    lgeAlt: 'Four original short-axis cardiac MR images with arrows pointing to different LGE patterns.',
    enlarge: 'Open the full-size figure',
  },
  fa: {
    lge: 'فلش‌ها محل LGE را نشان می‌دهند. از چپ به راست: زیر اندوکارد (لبهٔ داخلی دیواره)، تمام‌ضخامت، زیر اپی‌کارد (لبهٔ خارجی) و میان‌دیواره‌ای.',
    lgeAlt: 'چهار تصویر واقعی MRI قلب در محور کوتاه، با فلش‌هایی که الگوهای مختلف LGE را نشان می‌دهند.',
    enlarge: 'نمایش تصویر در اندازهٔ کامل',
  },
}

export function LgePatternFigure() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={styles.publishedFigure}>
    <a href={LGE_IMAGE} target="_blank" rel="noreferrer" aria-label={copy.enlarge}>
      <Image src={LGE_IMAGE} width={3722} height={1116} sizes="(max-width: 760px) 90vw, 900px" alt={copy.lgeAlt} unoptimized/>
    </a>
    <figcaption>
      <p>{copy.lge}</p>
      <small><a href={LGE_PATTERN_SOURCE.url}>{LGE_PATTERN_SOURCE.label} · Fig. A1</a> · <a href={CC_BY}>CC BY 4.0</a></small>
    </figcaption>
  </figure>
}
