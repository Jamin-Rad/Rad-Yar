'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, getThemenCount } from '@/data/curriculum'
import styles from './page.module.css'

// ── DIFFICULTY STARS ──────────────────────────────────────────────────────
function Difficulty({ level }) {
  return (
    <span className={styles.diffStars}>
      {[1,2,3].map(i => (
        <span key={i} className={i <= level ? styles.starOn : styles.starOff}>★</span>
      ))}
    </span>
  )
}

// ── TAG CHIP ──────────────────────────────────────────────────────────────
function Tag({ label }) {
  const colors = {
    CT: '#38bdf8', MRT: '#a78bfa', Rö: '#fb923c',
    Sono: '#34d399', KM: '#fbbf24', DWI: '#f472b6',
    CTA: '#60a5fa', MRV: '#c084fc', SWI: '#f97316',
    Mammo: '#fb7185', PET: '#4ade80', Szinti: '#facc15',
    LIRADS: '#f97316', MRCP: '#38bdf8', DSA: '#fb923c',
  }
  const color = colors[label] || '#94a3b8'
  return (
    <span className={styles.tag} style={{ color, borderColor: color + '40', background: color + '12' }}>
      {label}
    </span>
  )
}

// ── KAPITEL CARD ──────────────────────────────────────────────────────────
function KapitelCard({ kapitel, fachId, fachColor, index }) {
  const [open, setOpen] = useState(false)
  const count = kapitel.themen.length

  return (
    <div
      className={`${styles.card} ${open ? styles.cardOpen : ''}`}
      style={{ '--fach-color': fachColor, animationDelay: `${index * 0.07}s` }}
    >
      {/* Card Header */}
      <button className={styles.cardHeader} onClick={() => setOpen(o => !o)}>
        <div className={styles.cardLeft}>
          <span className={styles.cardIcon}>{kapitel.icon}</span>
          <div>
            <div className={styles.cardTitle}>{kapitel.title}</div>
            <div className={styles.cardMeta}>
              <span className={styles.cardCount}>{count} Themen</span>
              {kapitel.ready && (
                <span className={styles.cardReady}>✓ Verfügbar</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          {/* Mini preview of first 3 tags */}
          <div className={styles.cardTags}>
            {[...new Set(kapitel.themen.flatMap(t => t.tags))].slice(0, 3).map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        </div>
      </button>

      {/* Expandable Themen List */}
      {open && (
        <div className={styles.themenList}>
          {kapitel.ready && kapitel.link ? (
            <div className={styles.themenReadyBanner}>
              <span>📖 Inhalte bereits verfügbar</span>
              <Link href={kapitel.link} className={styles.themenReadyLink}>
                Jetzt lesen →
              </Link>
            </div>
          ) : null}

          {kapitel.themen.map((thema, i) => (
            <div
              key={thema.id}
              className={styles.themaRow}
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className={styles.themaLeft}>
                <span className={styles.themaDot} style={{ background: fachColor }} />
                <span className={styles.themaTitle}>{thema.title}</span>
              </div>
              <div className={styles.themaRight}>
                <div className={styles.themaTags}>
                  {thema.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                <Difficulty level={thema.diff} />
              </div>
            </div>
          ))}

          {/* MCQ + Fälle Buttons */}
          <div className={styles.themenActions}>
            <button className={styles.actionBtn} style={{ borderColor: fachColor + '50', color: fachColor }}>
              🎯 MCQs zu diesem Kapitel
            </button>
            <button className={styles.actionBtn} style={{ borderColor: fachColor + '50', color: fachColor }}>
              📋 Fallbeispiele
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function LernenFachPage() {
  const params = useParams()
  const fachId = params?.fach
  const fach = getFach(fachId)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { setMounted(true) }, [])

  if (!fach) {
    return (
      <div className={styles.notFound}>
        <p>Fachgebiet nicht gefunden.</p>
        <Link href="/">← Zurück zur Startseite</Link>
      </div>
    )
  }

  const totalThemen = getThemenCount(fachId)

  // Filter kapitel by search
  const filteredKapitel = search.trim()
    ? fach.kapitel.map(k => ({
        ...k,
        themen: k.themen.filter(t =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter(k => k.themen.length > 0)
    : fach.kapitel

  return (
    <div className={styles.page}>

      {/* ── HERO HEADER ── */}
      <div className={styles.hero} style={{ background: fach.bg }}>
        <div className={styles.heroGlow} style={{ background: fach.color + '22' }} />
        <div className={styles.heroContent}>
          <Link href="/" className={styles.breadcrumb}>
            ← Alle Fachgebiete
          </Link>
          <div className={styles.heroIconRow}>
            <span className={styles.heroIcon}>{fach.icon}</span>
            <div>
              <h1 className={styles.heroTitle} style={{ color: fach.color }}>
                {fach.key}
              </h1>
              <p className={styles.heroMeta}>
                {fach.kapitel.length} Kapitel · {totalThemen} Themen
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className={styles.heroStats}>
            {fach.kapitel.map(k => (
              <div key={k.id} className={styles.heroStat}>
                <span className={styles.heroStatIcon}>{k.icon}</span>
                <span className={styles.heroStatLabel}>{k.title}</span>
                <span className={styles.heroStatCount} style={{ color: fach.color }}>
                  {k.themen.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            className={styles.searchInput}
            placeholder={`In ${fach.key} suchen…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* ── KAPITEL CARDS ── */}
      <div className={`${styles.cards} ${mounted ? styles.cardsIn : ''}`}>
        {filteredKapitel.length === 0 ? (
          <div className={styles.empty}>
            Kein Thema gefunden für „{search}"
          </div>
        ) : (
          filteredKapitel.map((kapitel, i) => (
            <KapitelCard
              key={kapitel.id}
              kapitel={kapitel}
              fachId={fachId}
              fachColor={fach.color}
              index={i}
            />
          ))
        )}
      </div>

      {/* ── BOTTOM ACTION ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <span className={styles.bottomText}>
            Bereit zum Testen?
          </span>
          <div className={styles.bottomBtns}>
            <button className={styles.bottomBtn} style={{ background: fach.color, color: '#060708' }}>
              🎯 Alle MCQs – {fach.key}
            </button>
            <button className={styles.bottomBtnGhost} style={{ borderColor: fach.color + '50', color: fach.color }}>
              📋 Fallbeispiele
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
