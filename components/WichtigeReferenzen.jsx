'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

/* ── SVG-Icons für jede Messwerteregion ──────── */
function RegionIcon({ id, size = 17 }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const icons = {
    neuro: (<><path {...s} d="M9 3C6.5 3 4.5 5 4.5 7.5C4.5 8.3 4.7 9 5.2 9.6C4.2 10.2 3.5 11.3 3.5 12.5C3.5 14.4 5.1 16 7 16H9v4h6v-4h2c1.9 0 3.5-1.6 3.5-3.5C20.5 11.3 19.8 10.2 18.8 9.6C19.3 9 19.5 8.3 19.5 7.5C19.5 5 17.5 3 15 3H9Z"/><path {...s} d="M12 9v4M10 11h4"/></>),
    thorax: (<><path {...s} d="M12 3v3.5M8.5 6.5C6.5 6.5 4.5 8.5 4.5 11v3.5c0 2 1.5 3.5 3.5 3.5H9c.8 0 1.5-.7 1.5-1.5V8c0-.8-.7-1.5-1.5-1.5Z"/><path {...s} d="M15.5 6.5C17.5 6.5 19.5 8.5 19.5 11v3.5c0 2-1.5 3.5-3.5 3.5H15c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5Z"/></>),
    herz: (<path {...s} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>),
    abdomen: (<><rect {...s} x="3" y="3" width="18" height="18" rx="5"/><path {...s} d="M9 8.5c0 1.7.8 2.5 3 2.5s3-.8 3-2.5"/><path {...s} d="M9 15.5c0-1.7.8-2.5 3-2.5s3 .8 3 2.5"/><line {...s} x1="12" y1="11" x2="12" y2="13"/></>),
    urogenital: (<><path {...s} d="M12 4C9 4 6.5 7.5 6.5 11.5C6.5 15.5 9 20 12 20C14.8 20 16.5 17.5 17 14.5C18 10.5 17.5 5.5 14.5 4.2C13.7 3.9 12.8 4 12 4Z"/><path {...s} d="M12 8v4"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/></>),
    gefaesse: (<><path {...s} d="M2 11c1.5-4 3.5-4 5 0s3.5 4 5 0 3.5-4 5 0"/><path {...s} d="M2 16c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0"/></>),
    wirbelsaeule: (<><rect {...s} x="7" y="2" width="10" height="4" rx="1.5"/><rect {...s} x="7" y="10" width="10" height="4" rx="1.5"/><rect {...s} x="7" y="18" width="10" height="4" rx="1.5"/><line {...s} x1="12" y1="6" x2="12" y2="10"/><line {...s} x1="12" y1="14" x2="12" y2="18"/></>),
    msk: (<><path {...s} d="M6.5 6.5C6.5 4.8 8 3.5 9.5 4.5L14.5 9.5"/><path {...s} d="M9.5 4.5C10.5 3 13 3 13.5 5"/><path {...s} d="M17.5 17.5C17.5 19.2 16 20.5 14.5 19.5L9.5 14.5"/><path {...s} d="M14.5 19.5C13.5 21 11 21 10.5 19"/><line {...s} x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></>),
    'hu-werte': (<><circle {...s} cx="12" cy="12" r="9"/><circle {...s} cx="12" cy="12" r="3.5"/><line {...s} x1="12" y1="3" x2="12" y2="8.5"/><line {...s} x1="12" y1="15.5" x2="12" y2="21"/><line {...s} x1="3" y1="12" x2="8.5" y2="12"/><line {...s} x1="15.5" y1="12" x2="21" y2="12"/></>),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {icons[id] ?? <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"/>}
    </svg>
  )
}

/* ── Hauptkomponente ──────────────────────────── */
export default function WichtigeReferenzen() {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  return (
    <section className={styles.section} id="referenzen">
      {/* ── Glassmorphismus-Karte mit Karten innen ── */}
      <div className={styles.glassHeader}>
        <div className={styles.glassHeaderGlow} />

        {/* Titel-Bereich */}
        <div className={styles.glassTop}>
          <span className={styles.glassBadge}>{copy.sectionLabel}</span>
          <h2 className={styles.glassTitle}>{copy.title}</h2>
          <p className={styles.glassSub}>{copy.sub}</p>
        </div>

        {/* Karten innerhalb des Headers */}
        <div className={styles.grid}>
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

/* ── Messwerte-Modal ──────────────────────────── */
function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const region = regions.find(r => r.id === regionId) || regions[0]

  return (
    <Modal title={copy.btnMesswerte} copy={copy} onClose={onClose} accentClass={styles.headBlue}>
      <div className={styles.split}>
        {/* Sidebar – keine Zahlen mehr */}
        <nav className={styles.sidebar}>
          {regions.map(r => (
            <button key={r.id}
              className={`${styles.navBtn} ${r.id === regionId ? styles.navActiveBlue : ''}`}
              style={{ '--ref-color': r.color }}
              onClick={() => setRegionId(r.id)}>
              <span className={styles.navIconWrap} style={{ color: r.color }}>
                <RegionIcon id={r.id} size={16} />
              </span>
              <span className={styles.navLabel}>{tx(r.name, lang)}</span>
            </button>
          ))}
        </nav>

        {/* Inhalt */}
        <div className={styles.content} style={{ '--ref-color': region.color }}>
          <h2 className={styles.regionHeading}>
            <span className={styles.regionHeadingIcon} style={{ color: region.color }}>
              <RegionIcon id={region.id} size={22} />
            </span>
            <span style={{ color: region.color }}>{tx(region.name, lang)}</span>
          </h2>

          {region.groups.map((group, gi) => (
            <div key={gi} className={styles.groupBlock}>
              <h3 className={styles.groupHeading}>{tx(group.name, lang)}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.mTable}>
                  <thead>
                    <tr>
                      <th className={styles.thName}>{copy.colStruktur}</th>
                      <th className={styles.thVal}>{copy.colWert}</th>
                      <th className={styles.thNote}>{copy.colHinweis}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.entries.map((e, ei) => (
                      <tr key={ei}>
                        <td className={styles.tdName}>{tx(e.s, lang)}</td>
                        <td className={styles.tdVal}>{e.v}</td>
                        <td className={styles.tdNote}>{tx(e.h, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

/* ── Klassifikationen-Modal ───────────────────── */
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
            <div className={styles.klassGroupTitle} style={{ '--ref-color': topic.color, color: topic.color }}>
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
