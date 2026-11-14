'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const COPY = {
  de: {
    rule: ['Ein Abschnitt der RV-Wand bewegt sich auffällig', 'UND', 'RV-Volumen über dem Grenzwert', 'ODER', 'RV-Auswurffraktion unter dem Grenzwert', 'Ein MRT-Kriterium nach TFC 2010'],
  },
  en: {
    rule: ['Abnormal motion in a segment of the RV wall', 'AND', 'RV volume above the threshold', 'OR', 'RV ejection fraction below the threshold', 'One MRI criterion under the 2010 TFC'],
  },
  fa: {
    rule: ['اختلال موضعی حرکت دیوارهٔ بطن راست', 'و', 'حجم بطن راست بالاتر از حد آستانه', 'یا', 'کسر جهشی بطن راست پایین‌تر از حد آستانه', 'یک معیار MRI طبق TFC ۲۰۱۰'],
  },
}

export function VentricularDistributionIllustration({ pattern }) {
  return <div className={styles.acmDistributionImage} data-pattern={pattern}>
    <Image src="/thorax/kardio/arvc/acm-ventricular-distribution.webp" width={1536} height={764}
      sizes="(max-width: 760px) 90vw, 650px" alt=""/>
  </div>
}

export function TfcRuleDiagram() {
  const { lang } = useLanguage()
  const [motion, and, volume, or, ef, criterion] = (COPY[lang] || COPY.de).rule
  return <figure className={styles.tfcDiagram}>
    <div className={styles.tfcNode}>{motion}</div>
    <strong className={styles.tfcOperator}>{and}</strong>
    <div className={styles.tfcAlternatives}>
      <div>{volume}</div>
      <strong className={styles.tfcOperator}>{or}</strong>
      <div>{ef}</div>
    </div>
    <span className={styles.tfcArrow} aria-hidden="true">↓</span>
    <figcaption>{criterion}</figcaption>
  </figure>
}
