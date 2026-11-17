'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LessonPublicPreview.module.css'

const labels = {
  de: ['Lektionsvorschau', 'In dieser Lektion', 'Vollständige Lektion und Übungen'],
  en: ['Lesson preview', 'In this lesson', 'Full lesson and exercises'],
  fa: ['پیش‌نمایش درس', 'در این درس', 'درس کامل و تمرین‌ها'],
}

export default function LessonPublicPreview({ preview, children }) {
  const { lang } = useLanguage()
  const [eyebrow, contents, locked] = labels[lang] || labels.de
  const pick = copy => copy?.[lang] || copy?.de || copy?.en || copy?.fa
  const title = pick(preview.title)
  const excerpt = pick(preview.excerpt)
  return <main className={styles.preview} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <article className={styles.article}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        {excerpt && <p className={styles.excerpt} lang={preview.excerpt[lang] ? lang : 'de'}>{excerpt}</p>}
        {!!preview.headings?.length && <>
          <h2>{contents}</h2>
          <ul>{preview.headings.map((heading, index) => <li key={index}>{pick(heading)}</li>)}</ul>
        </>}
      </div>
      {preview.image && <figure className={styles.figure}>
        <Image src={preview.image} alt={title} fill sizes="(max-width: 700px) 90vw, 400px" priority />
      </figure>}
    </article>
    <section className={styles.locked} aria-label={locked}>
      <div className={styles.fade} aria-hidden="true"><i/><i/><i/></div>
      {children}
    </section>
  </main>
}
