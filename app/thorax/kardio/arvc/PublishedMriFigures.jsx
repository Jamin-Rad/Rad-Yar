'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { CASES, LGE_PATTERN_SOURCE } from './lessonContent'
import styles from './page.module.css'

const VENTRICULAR_EXAMPLES = [
  { caseId: '87505', size: 630 },
  { caseId: '194915', size: 448 },
]

const LGE_IMAGE = '/thorax/kardio/arvc/lge-patterns-sokolska-2025.png'
const CC_BY = 'https://creativecommons.org/licenses/by/4.0/'
const RADIOPAEDIA_LICENSE = 'https://creativecommons.org/licenses/by-nc-sa/3.0/'

const COPY = {
  de: {
    rv: 'Cine-Standbild im Vierkammerblick. Der rechte Ventrikel liegt im Bild oberhalb des linken und ist deutlich vergrößert.',
    both: 'LGE im Vierkammerblick. Im Originalbefund sind Veränderungen der rechten und der linken Kammerwand beschrieben.',
    lge: 'Die Pfeile zeigen die Lage des LGE. Von links nach rechts: subendokardial (an der Kammerinnenseite), transmural (durch die ganze Wand), subepikardial (außen) und intramural (in der Wandmitte).',
    lgeAlt: 'Vier originale Herz-MRTs in kurzer Achse mit Pfeilen auf die unterschiedlichen LGE-Muster.',
    enlarge: 'Abbildung in voller Größe öffnen',
  },
  en: {
    rv: 'Four-chamber cine still. The right ventricle appears above the left ventricle in this image and is markedly enlarged.',
    both: 'Four-chamber LGE. The original case describes changes in the walls of both ventricles.',
    lge: 'The arrows show the location of LGE. From left to right: subendocardial (at the inner border), transmural (through the entire wall), subepicardial (at the outer border), and midwall.',
    lgeAlt: 'Four original short-axis cardiac MR images with arrows pointing to different LGE patterns.',
    enlarge: 'Open the full-size figure',
  },
  fa: {
    rv: 'نمای ثابت سینمایی چهارحفره‌ای. بطن راست در تصویر بالای بطن چپ قرار دارد و به‌وضوح بزرگ شده است.',
    both: 'نمای چهارحفره‌ای LGE. در گزارش اصلی، تغییرات دیوارهٔ هر دو بطن توصیف شده‌اند.',
    lge: 'فلش‌ها محل LGE را نشان می‌دهند. از چپ به راست: زیر اندوکارد (لبهٔ داخلی دیواره)، تمام‌ضخامت، زیر اپی‌کارد (لبهٔ خارجی) و میان‌دیواره‌ای.',
    lgeAlt: 'چهار تصویر واقعی MRI قلب در محور کوتاه، با فلش‌هایی که الگوهای مختلف LGE را نشان می‌دهند.',
    enlarge: 'نمایش تصویر در اندازهٔ کامل',
  },
}

export function VentricularMriExamples() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <div className={styles.ventricularMriExamples}>
    {VENTRICULAR_EXAMPLES.map(({ caseId, size }, index) => {
      const item = CASES.find(entry => entry.id === caseId)
      const { src } = item.views[0]
      const caption = index === 0 ? copy.rv : copy.both
      return <figure key={caseId} className={styles.publishedFigure}>
        <Image src={src} width={size} height={size} sizes="(max-width: 560px) 90vw, 420px" alt="" unoptimized/>
        <figcaption>
          <p>{caption}</p>
          <small>{item.creator} · <a href={item.url}>Radiopaedia rID {caseId}</a> · <a href={RADIOPAEDIA_LICENSE}>CC BY-NC-SA 3.0</a></small>
        </figcaption>
      </figure>
    })}
  </div>
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
