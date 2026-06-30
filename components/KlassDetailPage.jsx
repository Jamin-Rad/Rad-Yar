'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './KlassDetailPage.module.css'

const TOPIC_LOGOS = {
  anatomie: '/fach/technik.png',
  'anatomie-neuro': '/fach/gehirn.png',
  'anatomie-thorax-herz': '/fach/thorax.png',
  'anatomie-abdomen': '/fach/abdomen.png',
  'anatomie-urogenital': '/fach/becken-m.png',
  neuro: '/fach/gehirn.png',
  thorax: '/fach/thorax.png',
  abdomen: '/fach/abdomen.png',
  'mamma-uro': '/fach/mamma.png',
  wirbelsaeule: '/fach/wirbelsaeule.png',
  msk: '/fach/msk.png',
  onko: '/fach/technik.png',
}

const ANATOMY_TOPIC_ORDER = [
  {
    id: 'anatomie-neuro',
    name: { de: 'Neuro', en: 'Neuro', fa: 'نورولوژی' },
    color: '#7c3aed',
    itemIds: ['hirngefaess-territorien'],
  },
  {
    id: 'anatomie-thorax-herz',
    name: { de: 'Thorax & Herz', en: 'Thorax & Heart', fa: 'توراکس و قلب' },
    color: '#0ea5e9',
    itemIds: ['lungensegmente', 'bronchopulmonal-gefaesse', 'koronararterien-territorien'],
  },
  {
    id: 'anatomie-abdomen',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    color: '#f59e0b',
    itemIds: ['lebersegmente-couinaud', 'pankreas-gallenwege'],
  },
  {
    id: 'anatomie-urogenital',
    name: { de: 'Urogenital', en: 'Urogenital', fa: 'اوروژنیتال' },
    color: '#ef4444',
    itemIds: ['beckenarterien'],
  },
]

function ClassificationTopicLogo({ topicId, size = 30 }) {
  return <Image src={TOPIC_LOGOS[topicId] || '/fach/technik.png'} alt="" width={size} height={size} className={styles.topicLogo} />
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
  const renderCell = (cell) => tx(cell, lang).split('\n').map((line, index, lines) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))

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
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function InfoText({ text }) {
  return (
    <p>
      {text.split('\n').map((line, index, lines) => {
        const isCave = ['Cave:', 'نکته احتیاط:'].includes(line.trim())
        return (
          <span key={index}>
            {isCave ? <strong className={styles.infoCave}>{line}</strong> : line}
            {index < lines.length - 1 && <br />}
          </span>
        )
      })}
    </p>
  )
}

function DetailList({ detail, lang, color }) {
  return (
    <div className={styles.detailList}>
      {detail.map((d, di) => (
        <div key={di} className={styles.detailBlock} style={{ borderColor: color + '33' }}>
          <h3 className={styles.detailStage} style={{ color }}>
            <span className={styles.detailDot} style={{ background: color }} />
            {tx(d.stage, lang)}
          </h3>
          <p className={styles.detailText}>{tx(d.text, lang)}</p>
        </div>
      ))}
    </div>
  )
}

function SourceLinks({ item, lang }) {
  const sources = item.sources || (item.refUrl ? [{ label: item.ref, url: item.refUrl }] : [])
  if (!sources.length) return item.ref || null
  return (
    <span className={styles.refLinks}>
      {sources.map((source, index) => (
        <span key={`${source.url}-${index}`} className={styles.refLinkItem}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className={styles.refLink}>
            {tx(source.label, lang)}
          </a>
          {index < sources.length - 1 && <span className={styles.refSep}>·</span>}
        </span>
      ))}
    </span>
  )
}

function sortByLocalizedName(items, lang) {
  return [...items].sort((a, b) => tx(a.name, lang).localeCompare(tx(b.name, lang), lang === 'de' ? 'de' : undefined, { sensitivity: 'base' }))
}

function buildAnatomyDetailTopics(items, lang) {
  const byId = Object.fromEntries(items.map(item => [item.id, item]))
  return ANATOMY_TOPIC_ORDER
    .map(topic => ({
      ...topic,
      items: sortByLocalizedName(topic.itemIds.map(id => byId[id]).filter(Boolean), lang),
    }))
    .filter(topic => topic.items.length)
}

function normalizeDetailImage(item, lang) {
  if (!item.image) return null
  if (typeof item.image === 'string') {
    return { src: item.image, alt: tx(item.name, lang) }
  }
  return { src: item.image.src, alt: tx(item.image.alt, lang), attribution: item.image.attribution }
}

function normalizeDetailImages(item, lang) {
  if (item.images?.length) {
    return item.images.map(image => ({
      src: image.src,
      alt: tx(image.alt || item.name, lang),
      attribution: image.attribution,
    }))
  }
  const image = normalizeDetailImage(item, lang)
  return image ? [image] : []
}

function ImageStack({ images, copy, setZoomSrc }) {
  return (
    <div className={styles.imageStack}>
      {images.map((image, index) => (
        <figure className={styles.imageFigure} key={image.src}>
          <button
            type="button"
            className={styles.imageBtn}
            onClick={() => setZoomSrc({ src: image.src, alt: image.alt })}
            aria-label={copy.zoomImage || 'Vergroessern'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} className={styles.image} />
            <span className={styles.zoomHint}>{copy.zoomImage || 'Vergroessern'}</span>
          </button>
          {images.length > 1 && (
            <figcaption className={styles.imageCaption}>{index + 1}. {image.alt}</figcaption>
          )}
          {image.attribution && (
            <figcaption className={styles.imageCaption}>
              Case courtesy of <strong>{image.attribution.name}</strong>,{' '}
              <a href={image.attribution.sourceUrl} target="_blank" rel="noopener noreferrer">Radiopaedia.org</a>.
              From the case <a href={image.attribution.caseUrl} target="_blank" rel="noopener noreferrer">rID: {image.attribution.caseId}</a>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

export default function KlassDetailPage({ topic, item, section = 'klassifikationen' }) {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const isAnatomie = section === 'anatomie'
  const anatomyTopics = isAnatomie ? buildAnatomyDetailTopics(topic.items, lang) : []
  const anatomyTopic = isAnatomie
    ? (anatomyTopics.find(entry => entry.items.some(sib => sib.id === item.id)) || anatomyTopics[0])
    : null
  const activeTopic = anatomyTopic || topic
  const color = isAnatomie ? activeTopic.color : topic.color
  const siblings = isAnatomie ? activeTopic.items : sortByLocalizedName(topic.items, lang)
  const otherTopics = isAnatomie
    ? anatomyTopics.filter(entry => entry.id !== activeTopic.id)
    : REF_DATA.klassifikationen
      .filter(t => t.id !== topic.id)
      .map(t => ({ ...t, items: sortByLocalizedName(t.items, lang) }))
  const refParam = isAnatomie ? 'anatomie' : 'klassifikationen'
  const backHref = lang !== 'de' ? `/?lang=${lang}&ref=${refParam}#referenzen` : `/?ref=${refParam}#referenzen`
  const [zoomSrc, setZoomSrc] = useState(null)
  const infoLabel = lang === 'de' ? 'Einordnung & Radiologie-Check' : lang === 'fa' ? 'توضیح و چک رادیولوژی' : 'Context & radiology check'
  const images = normalizeDetailImages(item, lang)
  const imageBeforeTables = item.imagePosition === 'beforeTables'
  const sourceLinks = SourceLinks({ item, lang })

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href={backHref} className={styles.backLink}>← {isAnatomie ? copy.btnAnatomie : copy.btnKlass}</Link>
        <span className={styles.breadSep}>/</span>
        <span style={{ color }}>{tx(activeTopic.name, lang)}</span>
        <span className={styles.breadSep}>/</span>
        <strong>{tx(item.name, lang)}</strong>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <nav className={styles.sidebar} aria-label={copy.chooseClass}>
          <Link href={backHref} className={styles.sidebarBack}>
            <span>←</span>
            <span>{isAnatomie ? copy.btnAnatomie : copy.btnKlass}</span>
          </Link>
          <div className={styles.currentTopic} style={{ '--ref-color': color }}>
            <span className={styles.currentTopicIcon}><ClassificationTopicLogo topicId={activeTopic.id} size={32} /></span>
            <span>
              <small>{lang === 'de' ? 'Aktueller Bereich' : lang === 'fa' ? 'بخش فعلی' : 'Current section'}</small>
              <strong>{tx(activeTopic.name, lang)}</strong>
            </span>
          </div>
          <div className={styles.currentList}>
            <div className={styles.sidebarSectionLabel}>
              {lang === 'de' ? 'In diesem Bereich' : lang === 'fa' ? 'در این بخش' : 'In this section'}
            </div>
            {siblings.map((sib, index) => (
              <Link
                key={sib.id}
                href={`/referenzen/${isAnatomie ? 'anatomie' : topic.id}/${sib.id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
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
                  href={`/referenzen/${isAnatomie ? 'anatomie' : t.id}/${t.items[0].id}${lang !== 'de' ? `?lang=${lang}` : ''}`}
                  className={styles.otherTopicLink}
                  style={{ '--ref-color': t.color }}
                >
                  <span className={styles.otherTopicIcon}><ClassificationTopicLogo topicId={t.id} size={20} /></span>
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

          {!isAnatomie && (item.kompakt || item.erklaerung || item.radiologie) && (
            <section id="erklaerung" className={styles.infoPanel}>
              <span className={styles.infoPanelLabel}>{infoLabel}</span>
              {item.kompakt && <InfoText text={tx(item.kompakt, lang)} />}
              {item.erklaerung && <InfoText text={tx(item.erklaerung, lang)} />}
              {item.radiologie && <DetailList detail={item.radiologie} lang={lang} color={color} />}
            </section>
          )}

          {imageBeforeTables && images.length > 0 && (
            <ImageStack images={images} copy={copy} setZoomSrc={setZoomSrc} />
          )}

          <div className={images.length && !imageBeforeTables ? styles.tableImageGrid : undefined}>
            {/* Tabellen-Sektion */}
            <div>
              {item.detail && item.detailPosition === 'beforeTables' && (
                <CollapseSection title={copy.ausfuehrlich} color={color} defaultOpen={true}>
                  <DetailList detail={item.detail} lang={lang} color={color} />
                </CollapseSection>
              )}
              {item.einfach && (
                <div id="einfach">
                <CollapseSection title={copy.einfachUebersicht} color={color} defaultOpen={true}>
                  <ClassTable cols={item.einfach.cols} rows={item.einfach.rows} lang={lang} />
                </CollapseSection>
                </div>
              )}
              {item.tables ? (
                <div id="vollstaendig">
                {item.tables.map((table, i) => (
                  <CollapseSection key={i} title={tx(table.title, lang)} color={color} defaultOpen={true}>
                    <ClassTable cols={table.cols} rows={table.rows} lang={lang} />
                  </CollapseSection>
                ))}
                </div>
              ) : (
                <div id="vollstaendig">
                  <CollapseSection title={isAnatomie ? copy.voll : copy.vollstaendig} color={color} defaultOpen={!item.einfach}>
                    <ClassTable cols={item.cols} rows={item.rows} lang={lang} />
                    {item.tableNote && (
                      <div className={styles.tableNote}>
                        <span className={styles.tableNoteStart}>⬤ {tx(item.tableNote.start, lang)}</span>
                        <span className={styles.tableNoteCutoff}>⚠ {tx(item.tableNote.cutoff, lang)}</span>
                      </div>
                    )}
                  </CollapseSection>
                </div>
              )}
              {item.detail && item.detailPosition !== 'beforeTables' && (
                <CollapseSection title={copy.ausfuehrlich} color={color} defaultOpen={false}>
                  <DetailList detail={item.detail} lang={lang} color={color} />
                </CollapseSection>
              )}
            </div>

            {/* Bilder rechts (optional) */}
            {!imageBeforeTables && images.length > 0 && (
              <div className={styles.imageStack}>
                {images.map((image, index) => (
                  <figure className={styles.imageFigure} key={image.src}>
                    <button
                      type="button"
                      className={styles.imageBtn}
                      onClick={() => setZoomSrc({ src: image.src, alt: image.alt })}
                      aria-label={copy.zoomImage || 'Vergrößern'}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt={image.alt} className={styles.image} />
                      <span className={styles.zoomHint}>🔍 {copy.zoomImage || 'Vergrößern'}</span>
                    </button>
                    {images.length > 1 && (
                      <figcaption className={styles.imageCaption}>{index + 1}. {image.alt}</figcaption>
                    )}
                    {image.attribution && (
                      <figcaption className={styles.imageCaption}>
                        Case courtesy of <strong>{image.attribution.name}</strong>,{' '}
                        <a href={image.attribution.sourceUrl} target="_blank" rel="noopener noreferrer">Radiopaedia.org</a>.
                        From the case <a href={image.attribution.caseUrl} target="_blank" rel="noopener noreferrer">rID: {image.attribution.caseId}</a>
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>

          {/* Quelle */}
          {sourceLinks && (
            <p id="quelle" className={styles.ref}>
              <span className={styles.refLabel}>{copy.reference}:</span>{' '}
              {sourceLinks}
            </p>
          )}

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
