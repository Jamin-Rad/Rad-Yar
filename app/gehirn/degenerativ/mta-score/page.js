'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { MTA_LESSON } from '@/data/mta-score'
import styles from './page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

export default function MtaScorePage() {
  const { lang } = useLanguage()
  const c = v => L(v, lang)
  const rtl = lang === 'fa'
  const cas = MTA_LESSON.radiopaediaCase

  const withLang = href =>
    lang === 'de' ? href : href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`

  return (
    <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(MTA_LESSON.breadcrumb)}</span>
        </div>

        <span className={styles.sourceBadge}>{MTA_LESSON.sourceLabel}</span>
        <h1 className={styles.title}>{c(MTA_LESSON.title)}</h1>
        <p className={styles.definition}>{c(MTA_LESSON.definition)}</p>

        <div className={styles.heroStats}>
          {MTA_LESSON.heroCards.map(card => (
            <div className={styles.heroStat} key={c(card.value)}>
              <strong>{c(card.value)}</strong>
              <span>{c(card.label)}</span>
              <small>{c(card.text)}</small>
            </div>
          ))}
        </div>
      </header>

      {/* ── Radiopaedia image ── */}
      <figure className={styles.figure}>
        {/* Save image from Radiopaedia rID:42027 to /public/mta-score/mta-score-rid42027.jpg */}
        <img
          src={cas.src}
          alt={c(cas.caption)}
          className={styles.caseImg}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <figcaption className={styles.figcaption}>
          <span>{c(cas.caption)}</span>
          <a href={cas.url} target="_blank" rel="noopener noreferrer" className={styles.rpLink}>
            {c({ de: 'Fall öffnen', en: 'Open case', fa: 'باز کردن کیس' })} ↗
          </a>
        </figcaption>
      </figure>

      {/* ── Score 0–4 table ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c(MTA_LESSON.score.title)}</h2>
        <p className={styles.lead}>{c(MTA_LESSON.score.lead)}</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>{MTA_LESSON.score.headers.map(h => <th key={c(h)}>{c(h)}</th>)}</tr>
            </thead>
            <tbody>
              {MTA_LESSON.score.rows.map((row, r) => (
                <tr key={r} className={r === 0 ? styles.rowNormal : r >= 3 ? styles.rowPathol : ''}>
                  {row.map((cell, ci) => <td key={ci}>{c(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.callout}>
          <strong>💡 {c(MTA_LESSON.keyLabel)}</strong>
          <p>{c(MTA_LESSON.score.key)}</p>
        </div>
      </section>

      {/* ── Age thresholds ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c(MTA_LESSON.grenzwerte.title)}</h2>
        <p className={styles.lead}>{c(MTA_LESSON.grenzwerte.lead)}</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>{MTA_LESSON.grenzwerte.headers.map(h => <th key={c(h)}>{c(h)}</th>)}</tr>
            </thead>
            <tbody>
              {MTA_LESSON.grenzwerte.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, ci) => <td key={ci}>{c(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.callout} ${styles.cave}`}>
          <strong>⚠️ {c(MTA_LESSON.caveLabel)}</strong>
          <p>{c(MTA_LESSON.grenzwerte.cave)}</p>
        </div>
      </section>

      {/* ── Technique ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c(MTA_LESSON.technik.title)}</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>{MTA_LESSON.technik.headers.map(h => <th key={c(h)}>{c(h)}</th>)}</tr>
            </thead>
            <tbody>
              {MTA_LESSON.technik.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, ci) => <td key={ci}>{c(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.callout}>
          <strong>💡 {c(MTA_LESSON.keyLabel)}</strong>
          <p>{c(MTA_LESSON.technik.key)}</p>
        </div>
      </section>

      {/* ── Source ── */}
      <footer className={styles.footer}>
        <span>{c({ de: 'Quelle', en: 'Source', fa: 'منبع' })}: Scheltens P et al. (1992). Atrophy of medial temporal lobes on MRI in "probable" Alzheimer's disease. <em>J Neurol Neurosurg Psychiatry</em>, 55(10), 967–972.</span>
      </footer>

    </main>
  )
}
