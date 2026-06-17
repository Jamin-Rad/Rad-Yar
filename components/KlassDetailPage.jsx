'use client'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './KlassDetailPage.module.css'

export default function KlassDetailPage({ topic, item }) {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const color = topic.color

  // Alle Items des Themas für die Seitenleiste
  const siblings = topic.items

  const backHref = lang !== 'de' ? `/?lang=${lang}#referenzen` : '/#referenzen'

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href={backHref} className={styles.backLink}>← {copy.btnKlass}</Link>
        <span className={styles.breadSep}>/</span>
        <span style={{ color }}>{tx(topic.name, lang)}</span>
        <span className={styles.breadSep}>/</span>
        <strong>{tx(item.name, lang)}</strong>
      </div>

      <div className={styles.layout}>
        {/* Sidebar: andere Klassifikationen desselben Themas */}
        <nav className={styles.sidebar} aria-label={copy.chooseClass}>
          <div className={styles.sidebarTitle} style={{ color }}>
            <span className={styles.dot} style={{ background: color }} />
            {tx(topic.name, lang)}
          </div>
          {siblings.map(sib => (
            <Link
              key={sib.id}
              href={`/referenzen/${topic.id}/${sib.id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
              className={`${styles.sibLink} ${sib.id === item.id ? styles.sibActive : ''}`}
              style={{ '--ref-color': color }}
            >
              {tx(sib.name, lang)}
            </Link>
          ))}

          {/* Andere Themen */}
          {REF_DATA.klassifikationen.filter(t => t.id !== topic.id).map(t => (
            <div key={t.id} className={styles.otherGroup}>
              <div className={styles.otherTitle} style={{ color: t.color }}>
                <span className={styles.dot} style={{ background: t.color }} />
                {tx(t.name, lang)}
              </div>
              {t.items.map(it => (
                <Link
                  key={it.id}
                  href={`/referenzen/${t.id}/${it.id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
                  className={styles.sibLink}
                  style={{ '--ref-color': t.color }}
                >
                  {tx(it.name, lang)}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Hauptinhalt */}
        <article className={styles.content} style={{ '--ref-color': color }}>
          <h1 className={styles.heading}>{tx(item.name, lang)}</h1>

          {/* Kompakt */}
          <div className={styles.kompaktBox} style={{ borderColor: color + '44', background: color + '0d' }}>
            <span className={styles.kompaktLabel} style={{ color }}>{copy.kompakt}</span>
            <p className={styles.kompaktText}>{tx(item.kompakt, lang)}</p>
          </div>

          {/* Vollständig */}
          <h2 className={styles.subHeading}>{copy.voll}</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>{item.cols.map((c, i) => <th key={i}>{tx(c, lang)}</th>)}</tr>
              </thead>
              <tbody>
                {item.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={ci === 0 ? styles.cellFirst : styles.cellRest}>
                        {tx(cell, lang)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quelle */}
          <p className={styles.ref}>
            <span className={styles.refLabel}>{copy.reference}:</span> {item.ref}
          </p>

          <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
        </article>
      </div>
    </main>
  )
}
