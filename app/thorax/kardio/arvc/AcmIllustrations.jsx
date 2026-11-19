'use client'

import Image from 'next/image'
import styles from './page.module.css'

export function VentricularDistributionIllustration({ pattern }) {
  return <div className={styles.acmDistributionImage} data-pattern={pattern}>
    <Image src="/thorax/kardio/arvc/acm-ventricular-distribution.webp" width={1536} height={764}
      sizes="(max-width: 760px) 90vw, 650px" alt=""/>
  </div>
}
