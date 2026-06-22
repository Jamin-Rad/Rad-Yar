'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import {
  AbdomenChapterIcon,
  GehirnChapterIcon,
  MammaChapterIcon,
  MskChapterIcon,
  TechnikChapterIcon,
  ThoraxChapterIcon,
} from '@/components/ChapterIcons'
import styles from './KlassDetailPage.module.css'

function ClassificationTopicIcon({ topicId }) {
  const className = styles.currentTopicSvg
  if (topicId === 'neuro') return <GehirnChapterIcon id="kopf-anatomie" className={className} />
  if (topicId === 'thorax') return <ThoraxChapterIcon id="thorax-anatomie" className={className} />
  if (topicId === 'abdomen') return <AbdomenChapterIcon id="abdomen-anatomie" className={className} />
  if (topicId === 'mamma-uro') return <MammaChapterIcon id="mamma-bildgebung" className={className} />
  if (topicId === 'msk') return <MskChapterIcon id="msk-anatomie" className={className} />
  return <TechnikChapterIcon id="technik-nuklearmedizin" className={className} />
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
  const otherTopics = REF_DATA.klassifikationen.filter(t => t.id !== topic.id)
  const backHref = lang !== 'de' ? `/?lang=${lang}#referenzen` : '/#referenzen'
  const [zoomSrc, setZoomSrc] = useState(null)

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
          <Link href={backHref} className={styles.sidebarBack}>
            <span>←</span>
            <span>{copy.btnKlass}</span>
          </Link>
          <div className={styles.currentTopic} style={{ '--ref-color': color }}>
            <span className={styles.currentTopicIcon}><ClassificationTopicIcon topicId={topic.id} /></span>
            <span>
              <small>{lang === 'de' ? 'Aktueller Bereich' : lang === 'fa' ? 'بخش فعلی' : 'Current section'}</small>
              <strong>{tx(topic.name, lang)}</strong>
            </span>
          </div>
          <div className={styles.currentList}>
            <div className={styles.sidebarSectionLabel}>
              {lang === 'de' ? 'In diesem Bereich' : lang === 'fa' ? 'در این بخش' : 'In this section'}
            </div>
            {siblings.map((sib, index) => (
              <Link
                key={sib.id}
                href={`/referenzen/${topic.id}/${sib.id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
                className={`${styles.sibLink} ${sib.id === item.id ? styles.sibActive : ''}`}
                style={{ '--ref-color': color }}
                aria-current={sib.id === item.id ? 'page' : undefined}
              >
                <span className={styles.sibIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span>{tx(sib.name, lang)}</span>
              </Link>
            ))}
          </div>

          <div className={styles.otherGroup}>
            <div className={styles.sidebarSectionLabel}>
              {lang === 'de' ? 'Bereich wechseln' : lang === 'fa' ? 'تغییر بخش' : 'Switch section'}
            </div>
            <div className={styles.otherTopicGrid}>
              {otherTopics.map(t => (
                <Link
                  key={t.id}
                  href={`/referenzen/${t.id}/${t.items[0].id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
                  className={styles.otherTopicLink}
                  style={{ '--ref-color': t.color }}
                >
                  <span className={styles.dot} style={{ background: t.color }} />
                  <span>{tx(t.name, lang)}</span>
                  <small>{t.items.length}</small>
                </Link>
              ))}
            </div>
          </div>
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
                    {item.tableNote && (
                      <div className={styles.tableNote}>
                        <span className={styles.tableNoteStart}>⬤ {tx(item.tableNote.start, lang)}</span>
                        <span className={styles.tableNoteCutoff}>⚠ {tx(item.tableNote.cutoff, lang)}</span>
                      </div>
                    )}
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
                <button
                  type="button"
                  className={styles.imageBtn}
                  onClick={() => setZoomSrc({ src: item.image.src, alt: tx(item.image.alt, lang) })}
                  aria-label={copy.zoomImage || 'Vergrößern'}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image.src} alt={tx(item.image.alt, lang)} className={styles.image} />
                  <span className={styles.zoomHint}>🔍 {copy.zoomImage || 'Vergrößern'}</span>
                </button>
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

      {/* Lightbox */}
      {zoomSrc && (
        <div className={styles.lightboxOverlay} onClick={() => setZoomSrc(null)} role="dialog" aria-modal="true">
          <button type="button" className={styles.lightboxClose} onClick={() => setZoomSrc(null)} aria-label="Schließen">×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomSrc.src} alt={zoomSrc.alt} className={styles.lightboxImg} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </main>
  )
}
