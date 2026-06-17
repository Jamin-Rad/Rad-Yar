'use client'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

const CARD_COLOR = { bg: '#f0f9ff', border: '#bae6fd', num: '#0ea5e9', iconBorder: '#7dd3fc' }
const CHIPS = {
  de: ['Neuro', 'Thorax', 'Abdomen', 'Urogenital', 'Gefäße', 'MSK'],
  en: ['Neuro', 'Thorax', 'Abdomen', 'Urogenital', 'Vessels', 'MSK'],
  fa: ['نورو', 'توراکس', 'شکم', 'اوروژنیتال', 'عروق', 'MSK'],
}

export default function WichtigeReferenzen() {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [modal, setModal] = useState(null)
  const chips = CHIPS[lang] || CHIPS.de

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  const c = CARD_COLOR
  return (
    <section className={styles.section} id="referenzen">
      <div
        className={styles.card}
        style={{ background: c.bg, borderColor: c.border }}
        onClick={() => setModal('messwerte')}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setModal('messwerte')}
      >
        <div className={styles.iconWrap} style={{ borderColor: c.iconBorder }}>
          <span className={styles.iconEmoji} aria-hidden="true">📏</span>
        </div>
        <h3 className={styles.cardTitle} style={{ color: c.num }}>{copy.title}</h3>
        <p className={styles.cardDesc}>{copy.sub}</p>
        <div className={styles.chips}>
          {chips.map(ch => (
            <span key={ch} className={styles.chip}
              style={{ borderColor: c.border, color: c.num }}>{ch}</span>
          ))}
        </div>
      </div>

      {modal === 'messwerte' && (
        <MesswerteModal copy={copy} lang={lang} onClose={() => setModal(null)} />
      )}
      {modal === 'klassifikationen' && (
        <KlassifikationenModal copy={copy} lang={lang} onClose={() => setModal(null)} />
      )}
    </section>
  )
}

/* ── Modal-Hülle ─────────────────────────────── */
function Modal({ title, copy, onClose, children }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className={styles.modalHead}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label={copy.close}>×</button>
        </header>
        <div className={styles.modalBody}>{children}</div>
        <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
      </div>
    </div>
  )
}

/* ── Messwerte: Bereich → Tabelle ────────────── */
function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()

  const region = regions.find(r => r.id === regionId) || regions[0]
  const rows = useMemo(() => {
    if (!query) return region.entries
    return region.entries.filter(e =>
      tx(e.s, lang).toLowerCase().includes(query) ||
      tx(e.s, 'de').toLowerCase().includes(query) ||
      String(e.v).toLowerCase().includes(query) ||
      tx(e.h, lang).toLowerCase().includes(query))
  }, [query, region, lang])

  return (
    <Modal title={copy.btnMesswerte} copy={copy} onClose={onClose}>
      <div className={styles.split}>
        <nav className={styles.sidebar} aria-label={copy.chooseRegion}>
          {regions.map(r => (
            <button key={r.id}
              className={`${styles.navBtn} ${r.id === regionId ? styles.navActive : ''}`}
              style={{ '--ref-color': r.color }}
              onClick={() => { setRegionId(r.id); setQ('') }}>
              <span className={styles.dot} />
              <span>{tx(r.name, lang)}</span>
              <span className={styles.count}>{r.entries.length}</span>
            </button>
          ))}
        </nav>

        <div className={styles.content} style={{ '--ref-color': region.color }}>
          <input className={styles.search} type="search" placeholder={copy.search}
            value={q} onChange={e => setQ(e.target.value)} />
          {rows.length === 0 ? <p className={styles.empty}>{copy.empty}</p> : (
            <table className={styles.table}>
              <thead><tr>
                <th>{copy.colStruktur}</th><th>{copy.colWert}</th><th>{copy.colHinweis}</th>
              </tr></thead>
              <tbody>
                {rows.map((e, i) => (
                  <tr key={i}>
                    <td className={styles.cellName}>{tx(e.s, lang)}</td>
                    <td className={styles.cellVal}>{e.v}</td>
                    <td className={styles.cellNote}>{tx(e.h, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Modal>
  )
}

/* ── Klassifikationen: Thema/Item → Kompakt + Vollständig + Quelle ── */
function KlassifikationenModal({ copy, lang, onClose }) {
  const topics = REF_DATA.klassifikationen
  const [sel, setSel] = useState({ topic: topics[0].id, item: topics[0].items[0].id })
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()

  const matches = (it) =>
    tx(it.name, lang).toLowerCase().includes(query) ||
    tx(it.name, 'de').toLowerCase().includes(query) ||
    tx(it.kompakt, lang).toLowerCase().includes(query)

  const visibleTopics = useMemo(() => {
    if (!query) return topics
    return topics
      .map(t => ({ ...t, items: t.items.filter(matches) }))
      .filter(t => t.items.length)
  }, [query, lang])

  const topic = topics.find(t => t.id === sel.topic)
  const item = topic?.items.find(i => i.id === sel.item)

  return (
    <Modal title={copy.btnKlass} copy={copy} onClose={onClose}>
      <div className={styles.split}>
        <nav className={styles.sidebar} aria-label={copy.chooseClass}>
          <input className={styles.search} type="search" placeholder={copy.search}
            value={q} onChange={e => setQ(e.target.value)} />
          {visibleTopics.length === 0 && <p className={styles.empty}>{copy.empty}</p>}
          {visibleTopics.map(t => (
            <div key={t.id} className={styles.navGroup}>
              <div className={styles.navGroupTitle} style={{ '--ref-color': t.color }}>
                <span className={styles.dot} />{tx(t.name, lang)}
              </div>
              {t.items.map(it => (
                <button key={it.id}
                  className={`${styles.navSub} ${item?.id === it.id ? styles.navActive : ''}`}
                  style={{ '--ref-color': t.color }}
                  onClick={() => setSel({ topic: t.id, item: it.id })}>
                  {tx(it.name, lang)}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.content} style={{ '--ref-color': topic?.color }}>
          {!item ? <p className={styles.empty}>{copy.pickHint}</p> : (
            <article className={styles.detail}>
              <h4 className={styles.detailTitle}>{tx(item.name, lang)}</h4>

              <div className={styles.kompaktBox}>
                <span className={styles.kompaktLabel}>{copy.kompakt}</span>
                <p>{tx(item.kompakt, lang)}</p>
              </div>

              <div className={styles.vollLabel}>{copy.voll}</div>
              <table className={styles.table}>
                <thead><tr>{item.cols.map((c, i) => <th key={i}>{tx(c, lang)}</th>)}</tr></thead>
                <tbody>
                  {item.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className={ci === 0 ? styles.cellVal : styles.cellNote}>{tx(cell, lang)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className={styles.refLine}>
                <span>{copy.reference}:</span> {item.ref}
              </p>
            </article>
          )}
        </div>
      </div>
    </Modal>
  )
}
