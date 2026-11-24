'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { SHOULDER_MRI_TITLE, shoulderMriTopics } from '@/data/shoulderMriChapter'
import styles from './shoulder.module.css'

const groups = [
  { start: 0, end: 2, de: 'Technik und Schulterdach', en: 'Technique and acromial anatomy', fa: 'تکنیک و سقف شانه' },
  { start: 2, end: 6, de: 'Rotatorenmanschette und Impingement', en: 'Rotator cuff and impingement', fa: 'روتاتور کاف و ایمپینجمنت' },
  { start: 6, end: 9, de: 'Luxation und Instabilität', en: 'Dislocation and instability', fa: 'دررفتگی و ناپایداری' },
]

const copy = {
  de: {
    back: 'Bewegungsapparat', lead: 'Von der Schichtplanung bis zur Beurteilung der instabilen Schulter.',
    note: 'Neun Lektionen mit Bildfällen, Befundchecks, MCQ und Karteikarten.',
  },
  en: {
    back: 'Musculoskeletal', lead: 'From MRI plane prescription to assessment of shoulder instability.',
    note: 'Nine lessons with imaging cases, reporting checklists, MCQs and flashcards.',
  },
  fa: {
    back: 'اسکلتی‌عضلانی', lead: 'از طراحی برش‌های ام‌آر‌آی تا ارزیابی ناپایداری شانه.',
    note: '۹ درس با کیس تصویری، چک‌لیست گزارش، آزمون چندگزینه‌ای و فلش‌کارت.',
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
        <p>{texts.note}</p>
      </div>
    </header>
    {groups.map(group => <section className={styles.chapterGroup} key={group.start}>
      <h2>{group[lang] ?? group.de}</h2>
      <ol start={group.start + 1}>
        {shoulderMriTopics.slice(group.start, group.end).map((topic, index) => <li key={topic.id}>
          <Link href={localPath(topic.link)}>
            <span className={styles.number}>{group.start + index + 1}</span>
            <strong>{topic.title[lang] ?? topic.title.de}</strong>
            <span aria-hidden="true">{lang === 'fa' ? '←' : '→'}</span>
          </Link>
        </li>)}
      </ol>
    </section>)}
  </main>
}
