'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CURRICULUM, getFachTitle } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './index.module.css'

const PAGE_TITLES = {
  de: 'Körperregion wählen',
  en: 'Choose a body region',
  fa: 'انتخاب ناحیه بدن',
}

export default function LernenIndexPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>{PAGE_TITLES[lang] || PAGE_TITLES.de}</h1>

        <div className={`${styles.grid} ${mounted ? styles.gridIn : ''}`}>
          {CURRICULUM.map((fach, i) => {
            const d = { name: getFachTitle(fach, lang), icon: fach.icon }
            const totalThemen = fach.kapitel.reduce((s, k) => s + k.themen.length, 0)
            return (
              <button
                key={fach.id}
                className={styles.card}
                style={{ '--fach-color': fach.color, animationDelay: `${i * 0.06}s` }}
                onClick={() => router.push(`/lernen/${fach.id}`)}
              >
                <div className={styles.cardIcon} style={{width:64,height:64,margin:"0 auto 12px"}}>
                  <Image src={`/fach/${fach.imageId || fach.id}.png`} alt={d.name} width={64} height={64} style={{objectFit:'contain',width:'100%',height:'100%'}}/>
                </div>
                <div className={styles.cardTitle} style={{ color: fach.color }}>{d.name}</div>
                <div className={styles.cardMeta}>
                  {fach.kapitel.length} {lang === 'fa' ? 'فصل' : lang === 'en' ? 'chapters' : 'Kapitel'} ·{' '}
                  {totalThemen} {lang === 'fa' ? 'موضوع' : lang === 'en' ? 'topics' : 'Themen'}
                </div>
                <div className={styles.cardArrow} style={{ color: fach.color }}>
                  {lang === 'fa' ? '←' : '→'}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
