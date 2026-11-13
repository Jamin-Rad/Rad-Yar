'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const COPY = {
  de: {
    phenotypes: ['RV-dominant', 'Biventrikulär', 'LV-dominant'],
    distribution: 'Schematische Darstellung. Orange hebt hervor, welche Kammer im jeweiligen ACM-Muster vor allem betroffen ist.',
    layers: 'LV-Wand in kurzer Achse. Die drei orangefarbenen Markierungen zeigen von oben im Uhrzeigersinn: subepikardial am Außenrand, intramural in der Wandmitte und subendokardial am Rand zur Kammerhöhle.',
  },
  en: {
    phenotypes: ['RV-dominant', 'Biventricular', 'LV-dominant'],
    distribution: 'Teaching illustration. Orange highlights the predominantly affected ventricle or ventricles in each ACM pattern.',
    layers: 'Teaching illustration of the LV wall in short axis. Clockwise from the top, the orange marks show subepicardial at the outer edge, midwall within the muscle, and subendocardial along the cavity.',
  },
  fa: {
    phenotypes: ['غالب در بطن راست', 'درگیری هر دو بطن', 'غالب در بطن چپ'],
    distribution: 'تصویر آموزشی. رنگ نارنجی بطن یا بطن‌هایی را نشان می‌دهد که در هر الگوی ACM بیشتر درگیرند.',
    layers: 'نمای آموزشی دیوارهٔ بطن چپ در محور کوتاه. علامت‌های نارنجی از بالا و در جهت عقربه‌های ساعت سه محل را نشان می‌دهند: زیر اپی‌کارد کنار لبهٔ بیرونی، میان‌دیواره‌ای در ضخامت عضله و زیر اندوکارد کنار حفرهٔ بطن.',
  },
}

export function VentricularDistributionIllustration() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={styles.acmIllustration}>
    <Image src="/thorax/kardio/arvc/acm-ventricular-distribution.webp" width={1536} height={764}
      sizes="(max-width: 760px) 90vw, 1000px" alt=""/>
    <figcaption>
      <ul className={styles.acmPhenotypeLabels} dir="ltr">
        {copy.phenotypes.map(label => <li key={label}><bdi>{label}</bdi></li>)}
      </ul>
      <p>{copy.distribution}</p>
    </figcaption>
  </figure>
}

export function ScarDepthIllustration() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={`${styles.acmIllustration} ${styles.scarDepthIllustration}`}>
    <Image src="/thorax/kardio/arvc/acm-lge-wall-depth.webp" width={1200} height={800}
      sizes="(max-width: 760px) 90vw, 620px" alt=""/>
    <figcaption><p>{copy.layers}</p></figcaption>
  </figure>
}
