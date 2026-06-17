'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

export default function WichtigeReferenzen() {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [modal, setModal] = useState(null) // 'messwerte' | 'klassifikationen' | null

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  return (
    <section className={styles.section} id="referenzen">
      <div className="sLabel">{copy.sectionLabel}</div>
      <h2 className="sTitle">{copy.title}</h2>
      <p className="sSub">{copy.sub}</p>

      <div className={styles.grid}>
        {/* Karte 1 – Messwerte */}
        <button className={`${styles.card} ${styles.cardBlue}`} onClick={() => setModal('messwerte')}>
          <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
            <span className={styles.iconEmoji} aria-hidden="true">📏</span>
          </div>
          <h3 className={`${styles.cardTitle} ${styles.colorBlue}`}>{copy.btnMesswerte}</h3>
          <p className={styles.cardDesc}>{copy.btnMesswerteSub}</p>
          <div className={styles.chips}>
            {(copy.chipsMesswerte || []).map(ch => (
              <span key={ch} className={`${styles.chip} ${styles.chipBlue}`}>{ch}</span>
            ))}
          </div>
        </button>

        {/* Karte 2 – Klassifikationen */}
        <button className={`${styles.card} ${styles.cardOrange}`} onClick={() => setModal('klassifikationen')}>
          <div className={`${styles.iconBox} ${styles.iconBoxOrange}`}>
            <span className={styles.iconEmoji} aria-hidden="true">🗂️</span>
          </div>
          <h3 className={`${styles.cardTitle} ${styles.colorOrange}`}>{copy.btnKlass}</h3>
          <p className={styles.cardDesc}>{copy.btnKlassSub}</p>
          <div className={styles.chips}>
            {(copy.chipsKlass || []).map(ch => (
              <span key={ch} className={`${styles.chip} ${styles.chipOrange}`}>{ch}</span>
            ))}
          </div>
        </button>
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

/* ── Modal-Hülle ──────────────────────────────── */
function Modal({ title, copy, onClose, children, accentClass }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className={`${styles.modalHead} ${accentClass || ''}`}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label={copy.close}>×</button>
        </header>
        <div className={styles.modalBody}>{children}</div>
        <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
      </div>
    </div>
  )
}

/* ── Messwerte-Modal: Bereich → Tabelle ──────── */
function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const region = regions.find(r => r.id === regionId) || regions[0]

  return (
    <Modal title={copy.btnMesswerte} copy={copy} onClose={onClose} accentClass={styles.headBlue}>
      <div className={styles.split}>
        <nav className={styles.sidebar}>
          {regions.map(r => (
            <button key={r.id}
              className={`${styles.navBtn} ${r.id === regionId ? styles.navActiveBlue : ''}`}
              style={{ '--ref-color': r.color }}
              onClick={() => setRegionId(r.id)}>
              <span className={styles.dot} style={{ background: r.color }} />
              <span>{tx(r.name, lang)}</span>
              <span className={styles.count}>{r.entries.length}</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{ '--ref-color': region.color }}>
          <table className={styles.table}>
            <thead><tr>
              <th>{copy.colStruktur}</th>
              <th>{copy.colWert}</th>
              <th>{copy.colHinweis}</th>
            </tr></thead>
            <tbody>
              {region.entries.map((e, i) => (
                <tr key={i}>
                  <td className={styles.cellName}>{tx(e.s, lang)}</td>
                  <td className={styles.cellVal}>{e.v}</td>
                  <td className={styles.cellNote}>{tx(e.h, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}

/* ── Klassifikationen-Modal: Thema → Klick → eigene Seite ─── */
function KlassifikationenModal({ copy, lang, onClose }) {
  const router = useRouter()
  const topics = REF_DATA.klassifikationen

  const go = (topicId, itemId) => {
    onClose()
    const langParam = lang !== 'de' ? `?lang=${lang}` : ''
    router.push(`/referenzen/${topicId}/${itemId}${langParam}`)
  }

  return (
    <Modal title={copy.btnKlass} copy={copy} onClose={onClose} accentClass={styles.headOrange}>
      <div className={styles.klassGrid}>
        {topics.map(topic => (
          <div key={topic.id} className={styles.klassGroup}>
            <div className={styles.klassGroupTitle} style={{ color: topic.color }}>
              <span className={styles.dot} style={{ background: topic.color }} />
              {tx(topic.name, lang)}
            </div>
            <div className={styles.klassList}>
              {topic.items.map(item => (
                <button key={item.id}
                  className={styles.klassItem}
                  style={{ '--ref-color': topic.color }}
                  onClick={() => go(topic.id, item.id)}>
                  <span className={styles.klassName}>{tx(item.name, lang)}</span>
                  <span className={styles.klassKicker}>{tx(item.kompakt, lang).slice(0, 60)}…</span>
                  <span className={styles.klassArrow}>→</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
