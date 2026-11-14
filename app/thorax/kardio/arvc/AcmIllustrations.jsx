'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const COPY = {
  de: {
    phases: ['Enddiastole', 'Endsystole'],
    phaseCaption: 'Normaler Herzzyklus in kurzer Achse. Am Ende der Füllung ist die LV-Höhle größer. Am Ende der Kontraktion ist sie kleiner und die Wand dicker.',
    rule: ['Regionale RV-Bewegungsstörung', 'UND', 'RVEDVi erhöht', 'ODER', 'RVEF vermindert', 'Ein MRT-Kriterium nach TFC 2010'],
    layers: 'LV-Wand in kurzer Achse. Die drei orangefarbenen Markierungen zeigen von oben im Uhrzeigersinn: subepikardial am Außenrand, intramural in der Wandmitte und subendokardial am Rand zur Kammerhöhle.',
  },
  en: {
    phases: ['End diastole', 'End systole'],
    phaseCaption: 'Normal cardiac cycle in short axis. The LV cavity is larger at the end of filling. At the end of contraction, it is smaller and the wall is thicker.',
    rule: ['Regional RV wall motion abnormality', 'AND', 'Increased RVEDVi', 'OR', 'Reduced RVEF', 'One MRI criterion under the 2010 TFC'],
    layers: 'Teaching illustration of the LV wall in short axis. Clockwise from the top, the orange marks show subepicardial at the outer edge, midwall within the muscle, and subendocardial along the cavity.',
  },
  fa: {
    phases: ['پایان دیاستول', 'پایان سیستول'],
    phaseCaption: 'چرخهٔ طبیعی قلب در نمای محور کوتاه. حفرهٔ بطن چپ در پایان پرشدن بزرگ‌تر است. در پایان انقباض، حفره کوچک‌تر و دیواره ضخیم‌تر است.',
    rule: ['اختلال موضعی حرکت دیوارهٔ بطن راست', 'و', 'افزایش RVEDVi', 'یا', 'کاهش RVEF', 'یک معیار MRI طبق TFC 2010'],
    layers: 'نمای آموزشی دیوارهٔ بطن چپ در محور کوتاه. علامت‌های نارنجی از بالا و در جهت عقربه‌های ساعت سه محل را نشان می‌دهند: زیر اپی‌کارد کنار لبهٔ بیرونی، میان‌دیواره‌ای در ضخامت عضله و زیر اندوکارد کنار حفرهٔ بطن.',
  },
}

export function VentricularDistributionIllustration({ pattern }) {
  return <div className={styles.acmDistributionImage} data-pattern={pattern}>
    <Image src="/thorax/kardio/arvc/acm-ventricular-distribution.webp" width={1536} height={764}
      sizes="(max-width: 760px) 90vw, 650px" alt=""/>
  </div>
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

export function CinePhaseIllustration() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  return <figure className={styles.acmIllustration}>
    <Image src="/thorax/kardio/arvc/acm-cine-phases.webp" width={1400} height={717}
      sizes="(max-width: 760px) 90vw, 900px" alt=""/>
    <figcaption>
      <ul className={styles.acmPhaseLabels} dir="ltr">
        {copy.phases.map(label => <li key={label}><bdi>{label}</bdi></li>)}
      </ul>
      <p>{copy.phaseCaption}</p>
    </figcaption>
  </figure>
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
