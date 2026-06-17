'use client'
import { useMemo, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

const TABS = ['messwerte', 'klassifikationen']

export default function WichtigeReferenzen() {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [tab, setTab] = useState('messwerte')
  const [regionId, setRegionId] = useState(REF_DATA.messwerte[0].id)
  const [query, setQuery] = useState('')

  const regions = REF_DATA[tab]
  const q = query.trim().toLowerCase()

  const handleTab = (next) => {
    setTab(next)
    setRegionId(REF_DATA[next][0].id)
    setQuery('')
  }

  // Beim Suchen: alle Bereiche mit Treffern; sonst nur der gewählte Bereich
  const visible = useMemo(() => {
    if (!q) {
      const r = regions.find(x => x.id === regionId) || regions[0]
      return [r]
    }
    const match = (e) =>
      tx(e.s, lang).toLowerCase().includes(q) ||
      tx(e.s, 'de').toLowerCase().includes(q) ||
      tx(e.s, 'en').toLowerCase().includes(q) ||
      String(e.v).toLowerCase().includes(q) ||
      tx(e.h, lang).toLowerCase().includes(q)
    return regions
      .map(r => ({ ...r, entries: r.entries.filter(match) }))
      .filter(r => r.entries.length > 0)
  }, [q, regions, regionId, lang])

  const resultCount = q ? visible.reduce((n, r) => n + r.entries.length, 0) : 0
  const isClass = tab === 'klassifikationen'

  return (
    <section className={styles.section} id="referenzen">
      {/* Kopfzeile: Titel links, Tabs rechts */}
      <div className={styles.head}>
        <div className={styles.headText}>
          <div className={styles.label}>{copy.label}</div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.sub}>{copy.sub}</p>
        </div>
        <div className={styles.tabs} role="tablist">
          {TABS.map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => handleTab(t)}
            >
              {copy.tabs[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Suche */}
      <div className={styles.searchRow}>
        <input
          type="search"
          className={styles.search}
          placeholder={copy.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {q && <span className={styles.resultCount}>{resultCount} {copy.results}</span>}
      </div>

      {/* Master-Detail */}
      <div className={styles.body}>
        {/* Linke Spalte: Bereiche */}
        <nav className={styles.regionList} aria-label={copy.chooseRegion}>
          {regions.map(r => (
            <button
              key={r.id}
              className={`${styles.regionBtn} ${!q && r.id === regionId ? styles.regionActive : ''}`}
              style={{ '--ref-color': r.color }}
              onClick={() => { setRegionId(r.id); setQuery('') }}
            >
              <span className={styles.regionDot} />
              <span>{tx(r.name, lang)}</span>
              <span className={styles.regionCount}>{r.entries.length}</span>
            </button>
          ))}
        </nav>

        {/* Rechte Spalte: Tabellen */}
        <div className={styles.detail}>
          {visible.length === 0 && <p className={styles.empty}>{copy.empty}</p>}
          {visible.map(r => (
            <div key={r.id} className={styles.panel} style={{ '--ref-color': r.color }}>
              {q && <h3 className={styles.panelTitle}>{tx(r.name, lang)}</h3>}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{copy.colStruktur}</th>
                    <th>{isClass ? copy.colStufen : copy.colWert}</th>
                    <th>{isClass ? copy.colBedeutung : copy.colHinweis}</th>
                  </tr>
                </thead>
                <tbody>
                  {r.entries.map((e, i) => (
                    <tr key={i}>
                      <td className={styles.cellName}>{tx(e.s, lang)}</td>
                      <td className={styles.cellVal}>{e.v}</td>
                      <td className={styles.cellNote}>{tx(e.h, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
    </section>
  )
}
