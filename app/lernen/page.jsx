'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CURRICULUM } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './index.module.css'

const FACH_DISPLAY = {
  de: {
    abdomen:      { name: 'Abdomen',              icon: '🟠' },
    gehirn:       { name: 'Kopf',                 icon: '🧠' },
    msk:          { name: 'Muskuloskelettales',   icon: '🦴' },
    thorax:       { name: 'Thorax',               icon: '🫀' },
    wirbelsaeule: { name: 'Wirbelsäule',          icon: '🦴' },
    hals:         { name: 'Hals',                 icon: '💠' },
    mamma:        { name: 'Mamma',                icon: '🌸' },
    'becken-f':   { name: 'Becken – Frau',        icon: '♀️' },
    'becken-m':   { name: 'Becken – Mann',        icon: '♂️' },
    technik:      { name: 'Technik & Physik',     icon: '⚙️' },
  },
  en: {
    abdomen:      { name: 'Abdomen',              icon: '🟠' },
    gehirn:       { name: 'Head',                 icon: '🧠' },
    msk:          { name: 'Musculoskeletal',      icon: '🦴' },
    thorax:       { name: 'Thorax',               icon: '🫀' },
    wirbelsaeule: { name: 'Spine',                icon: '🦴' },
    hals:         { name: 'Neck',                 icon: '💠' },
    mamma:        { name: 'Breast',               icon: '🌸' },
    'becken-f':   { name: 'Pelvis – Female',      icon: '♀️' },
    'becken-m':   { name: 'Pelvis – Male',        icon: '♂️' },
    technik:      { name: 'Physics & Tech',       icon: '⚙️' },
  },
  fa: {
    abdomen:      { name: 'شکم',                  icon: '🫘' },
    gehirn:       { name: 'سر',                   icon: '🧠' },
    msk:          { name: 'اسکلتی-عضلانی',        icon: '🦴' },
    thorax:       { name: 'توراکس',               icon: '🫀' },
    wirbelsaeule: { name: 'ستون فقرات',           icon: '🦴' },
    hals:         { name: 'گردن',                 icon: '💠' },
    mamma:        { name: 'پستان',                icon: '🌸' },
    'becken-f':   { name: 'لگن – زنان',           icon: '♀️' },
    'becken-m':   { name: 'لگن – مردان',          icon: '♂️' },
    technik:      { name: 'تکنیک و فیزیک',        icon: '⚙️' },
  },
}

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

  const display = FACH_DISPLAY[lang] || FACH_DISPLAY.de

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>{PAGE_TITLES[lang] || PAGE_TITLES.de}</h1>

        <div className={`${styles.grid} ${mounted ? styles.gridIn : ''}`}>
          {CURRICULUM.map((fach, i) => {
            const d = display[fach.id] || { name: fach.key, icon: fach.icon }
            const totalThemen = fach.kapitel.reduce((s, k) => s + k.themen.length, 0)
            return (
              <button
                key={fach.id}
                className={styles.card}
                style={{ '--fach-color': fach.color, animationDelay: `${i * 0.06}s` }}
                onClick={() => router.push(`/lernen/${fach.id}`)}
              >
                <span className={styles.cardIcon}>{d.icon}</span>
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
