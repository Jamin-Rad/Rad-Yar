'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './KlassDetailPage.module.css'

function RadYarMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="22" fill="url(#ryMarkBg)" />
      <path d="M13.8 8.6A20.2 20.2 0 0 1 39 13.3" stroke="url(#ryMarkArc)" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M39.8 13.9A20.1 20.1 0 0 1 40.2 33.6" stroke="#f97316" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M34.8 41.4A20.2 20.2 0 0 1 8.2 14.7" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="39.8" cy="14" r="3.2" fill="#ff8a1d" />
      <circle cx="39.8" cy="14" r="6.4" fill="url(#ryMarkGlow)" />
      <text x="17.1" y="31.8" fill="#ffffff" fontSize="24" fontWeight="900"
        fontFamily="Inter,Manrope,system-ui,sans-serif" letterSpacing="-.9">R</text>
      <text x="27.1" y="32.2" fill="#f97316" fontSize="23" fontWeight="900"
        fontFamily="Inter,Manrope,system-ui,sans-serif" letterSpacing="-.8">Y</text>
      <defs>
        <radialGradient id="ryMarkBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12) rotate(50) scale(38)">
          <stop stopColor="#102a44"/><stop offset=".62" stopColor="#071a2f"/><stop offset="1" stopColor="#020617"/>
        </radialGradient>
        <linearGradient id="ryMarkArc" x1="11" y1="8" x2="42" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff"/><stop offset="1" stopColor="#f97316"/>
        </linearGradient>
        <radialGradient id="ryMarkGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.8 14) scale(8)">
          <stop stopColor="#ffedd5" stopOpacity=".95"/>
          <stop offset=".45" stopColor="#f97316" stopOpacity=".45"/>
          <stop offset="1" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  )
}

function CollapseSection({ title, color, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={styles.collapseWrap}>
      <button
        className={`${styles.collapseBtn} ${open ? styles.collapseBtnOpen : ''}`}
        style={{ '--ref-color': color }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.collapseBtnTitle}>{title}</span>
        <span className={styles.collapseChevron} aria-hidden="true" />
      </button>
      {open && <div className={styles.collapseBody}>{children}</div>}
    </div>
  )
}

function ClassTable({ cols, rows, lang }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{cols.map((c, i) => <th key={i}>{tx(c, lang)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
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
  )
}

export default function KlassDetailPage({ topic, item }) {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const color = topic.color
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
        {/* Sidebar */}
        <nav className={styles.sidebar} aria-label={copy.chooseClass}>
          <div className={styles.sidebarBrand}>
            <RadYarMark size={28} />
            <span className={styles.sidebarBrandLabel}>RadYar</span>
          </div>
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

          {/* Beschreibung */}
          <div className={styles.beschreibungBox} style={{ borderColor: color + '44', background: color + '0d' }}>
            <p className={styles.beschreibungText}>{tx(item.kompakt, lang)}</p>
          </div>

          <div className={item.image ? styles.tableImageGrid : undefined}>
            {/* Tabellen-Sektion */}
            <div>
              {item.tables ? (
                item.tables.map((table, i) => (
                  <CollapseSection key={i} title={tx(table.title, lang)} color={color} defaultOpen={true}>
                    <ClassTable cols={table.cols} rows={table.rows} lang={lang} />
                  </CollapseSection>
                ))
              ) : (
                <>
                  {item.einfach && (
                    <CollapseSection title={copy.einfachUebersicht} color={color} defaultOpen={true}>
                      <ClassTable cols={item.einfach.cols} rows={item.einfach.rows} lang={lang} />
                    </CollapseSection>
                  )}
                  <CollapseSection title={copy.vollstaendig} color={color} defaultOpen={!item.einfach}>
                    <ClassTable cols={item.cols} rows={item.rows} lang={lang} />
                  </CollapseSection>
                </>
              )}
              {item.detail && (
                <CollapseSection title={copy.ausfuehrlich} color={color} defaultOpen={false}>
                  <div className={styles.detailList}>
                    {item.detail.map((d, di) => (
                      <div key={di} className={styles.detailBlock} style={{ borderColor: color + '33' }}>
                        <h3 className={styles.detailStage} style={{ color }}>
                          <span className={styles.detailDot} style={{ background: color }} />
                          {tx(d.stage, lang)}
                        </h3>
                        <p className={styles.detailText}>{tx(d.text, lang)}</p>
                      </div>
                    ))}
                  </div>
                </CollapseSection>
              )}
            </div>

            {/* Bild rechts (optional) */}
            {item.image && (
              <figure className={styles.imageFigure}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image.src} alt={tx(item.image.alt, lang)} className={styles.image} />
                {item.image.attribution && (
                  <figcaption className={styles.imageCaption}>
                    Case courtesy of <strong>{item.image.attribution.name}</strong>,{' '}
                    <a href={item.image.attribution.sourceUrl} target="_blank" rel="noopener noreferrer">Radiopaedia.org</a>.
                    From the case <a href={item.image.attribution.caseUrl} target="_blank" rel="noopener noreferrer">rID: {item.image.attribution.caseId}</a>
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          {/* Quelle */}
          <p className={styles.ref}>
            <span className={styles.refLabel}>{copy.reference}:</span>{' '}
            {item.refUrl ? (
              <a href={item.refUrl} target="_blank" rel="noopener noreferrer" className={styles.refLink}>
                {item.ref}
              </a>
            ) : item.ref}
          </p>

          <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
        </article>
      </div>
    </main>
  )
}
