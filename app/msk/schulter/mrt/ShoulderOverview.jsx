'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { SHOULDER_MRI_TITLE, shoulderMriTopics } from '@/data/shoulderMriChapter.mjs'
import styles from './shoulder.module.css'

const copy = {
  de: {
    back: 'Bewegungsapparat', lead: 'Von der Schichtplanung bis zur Beurteilung der instabilen Schulter.',
  },
  en: {
    back: 'Musculoskeletal', lead: 'From MRI plane prescription to assessment of shoulder instability.',
  },
  fa: {
    back: 'اسکلتی‌عضلانی', lead: 'از طراحی برش‌های ام‌آر‌آی تا ارزیابی ناپایداری شانه.',
  },
}

export default function ShoulderOverview() {
  const { lang } = useLanguage()
  const texts = copy[lang] ?? copy.de
  const localPath = href => lang === 'de' ? href : `${href}?lang=${lang}`

  return <main className={styles.overview} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <Link className={styles.back} href={localPath('/lernen/msk')}>{texts.back}</Link>
    <header className={styles.cover}>
      <div>
        <h1>{SHOULDER_MRI_TITLE[lang] ?? SHOULDER_MRI_TITLE.de}</h1>
        <p>{texts.lead}</p>
      </div>
    </header>
    <ol className={styles.chapterList}>
      {shoulderMriTopics.map((topic, index) => <li key={topic.id}>
        <Link href={localPath(topic.link)}>
          <span className={styles.number}>{index + 1}</span>
          <strong>{topic.title[lang] ?? topic.title.de}</strong>
          <span aria-hidden="true">{lang === 'fa' ? '←' : '→'}</span>
        </Link>
      </li>)}
    </ol>
  </main>
}
