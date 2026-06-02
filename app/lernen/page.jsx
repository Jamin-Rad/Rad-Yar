'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CURRICULUM } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './index.module.css'

const FACH_NAMES = {
  de: { abdomen:'Abdomen', gehirn:'Neuroradiologie', msk:'Muskuloskelettales',
        thorax:'Thorax', wirbelsaeule:'Wirbelsäule & Hals', mamma:'Mamma',
        becken:'Becken', technik:'Technik & Physik' },
  en: { abdomen:'Abdomen', gehirn:'Neuroradiology', msk:'Musculoskeletal',
        thorax:'Thorax', wirbelsaeule:'Spine & Neck', mamma:'Breast',
        becken:'Pelvis', technik:'Physics & Technology' },
  fa: { abdomen:'شکم', gehirn:'نوروراديولوژی', msk:'اسکلتی-عضلانی',
        thorax:'توراکس', wirbelsaeule:'ستون فقرات و گردن', mamma:'پستان',
        becken:'لگن', technik:'تکنیک و فیزیک' },
}

const TITLES = {
  de: { heading: 'Fachgebiet wählen', sub: 'Wähle ein Fachgebiet – dann lernst du direkt los.' },
  en: { heading: 'Choose a specialty', sub: 'Select a specialty and start learning.' },
  fa: { heading: 'انتخاب تخصص', sub: 'یک تخصص را انتخاب کنید و مستقیماً شروع کنید.' },
}

export default function LernenIndexPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const names = FACH_NAMES[lang] || FACH_NAMES.de
  const title = TITLES[lang] || TITLES.de

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>{title.heading}</h1>
        <p className={styles.sub}>{title.sub}</p>

        <div className={`${styles.grid} ${mounted ? styles.gridIn : ''}`}>
          {CURRICULUM.map((fach, i) => (
            <button
              key={fach.id}
              className={styles.card}
              style={{ '--fach-color': fach.color, animationDelay: `${i * 0.06}s` }}
              onClick={() => router.push(`/lernen/${fach.id}`)}
            >
              <span className={styles.cardIcon}>{fach.icon}</span>
              <div className={styles.cardTitle} style={{ color: fach.color }}>
                {names[fach.id] || fach.key}
              </div>
              <div className={styles.cardMeta}>
                {fach.kapitel.length} Kapitel ·{' '}
                {fach.kapitel.reduce((s,k) => s+k.themen.length, 0)} Themen
              </div>
              <div className={styles.cardArrow} style={{ color: fach.color }}>→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
