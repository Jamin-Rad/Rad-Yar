'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

// ── FACHGEBIETE DATA (mirrors Fachgebiete.jsx) ────────────────────────────
const FACH_DATA = {
  Neuroradiologie: {
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    description: 'Gehirn, Rückenmark, Schädel',
    available: false,
    topics: ['Schlaganfall', 'Tumoren', 'Multiple Sklerose', 'Trauma', 'Gefäße'],
  },
  Hals: {
    color: '#2563eb',
    bg: 'linear-gradient(135deg,#0c1f40,#142d5a)',
    description: 'Schilddrüse, Lymphknoten, Larynx, Wirbelsäule',
    available: false,
    topics: ['Schilddrüsentumoren', 'Lymphome', 'Larynxkarzinom', 'Myelon'],
  },
  Thorax: {
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    description: 'Lunge, Herz, Mediastinum & Pleura',
    available: false,
    topics: ['Pneumonie', 'Lungenembolie', 'Tumor', 'Herzinsuffizienz'],
  },
  Brust: {
    color: '#db2777',
    bg: 'linear-gradient(135deg,#2a0a20,#420c2e)',
    description: 'Mammographie, Sonographie & MRT der Brust',
    available: false,
    topics: ['Mammakarzinom', 'Mastopathie', 'Fibroadenom', 'BIRADS'],
  },
  Abdomen: {
    color: '#10b981',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    description: 'Leber, Milz, Niere, Pankreas & GI-Trakt',
    available: false,
    topics: ['Leberzirrhose', 'Pankreatitis', 'Nierensteine', 'Tumoren'],
  },
  Becken: {
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#2a0a10,#3d1020)',
    description: 'Hüfte, Blase, Prostata & gynäkologische Organe',
    available: false,
    topics: ['Prostatakarzinom', 'Zervixkarzinom', 'Hüftarthrose'],
  },
  Muskuloskelettales: {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#2a1a00,#3d2800)',
    description: 'Knochen, Gelenke, Muskulatur & Weichteile',
    available: false,
    topics: ['Frakturen', 'Arthrose', 'Tumoren', 'Sportverletzungen'],
  },
  'Technik & Physik': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    description: 'Physikalische Grundlagen · Kontrastmittel · Protokolle',
    available: true,
    topics: ['Kontrastmittel', 'MRT-Physik', 'CT-Technik', 'Strahlenschutz'],
    links: [{ label: 'Kontrastmittel', href: '/technik/kontrastmittel', ready: true }],
  },
}

// ── BODY ZONES — positions as % of image container ────────────────────────
// Image is portrait ~570×1100px equivalent. Zones are clickable areas.
const ZONES = [
  {
    key: 'Neuroradiologie',
    label: 'Neuroradiologie',
    // Ellipse covering head
    shape: 'ellipse',
    cx: 50, cy: 5.5, rx: 12, ry: 6,
    color: '#7c3aed',
  },
  {
    key: 'Hals',
    label: 'Hals & Wirbelsäule',
    // Tall narrow rect covering neck + spine running through center
    shape: 'rect',
    x: 38, y: 11, w: 24, h: 14,
    color: '#2563eb',
  },
  {
    key: 'Thorax',
    label: 'Thorax',
    // Wide rect covering ribcage, excluding breast area
    shape: 'rect',
    x: 28, y: 24, w: 44, h: 14,
    color: '#0ea5e9',
  },
  {
    key: 'Brust',
    label: 'Brust',
    // Two ellipses (left + right breast) — rendered as one clickable zone
    shape: 'ellipse',
    cx: 50, cy: 30, rx: 18, ry: 5,
    color: '#db2777',
  },
  {
    key: 'Abdomen',
    label: 'Abdomen',
    shape: 'rect',
    x: 30, y: 38, w: 40, h: 16,
    color: '#10b981',
  },
  {
    key: 'Becken',
    label: 'Becken',
    shape: 'rect',
    x: 28, y: 54, w: 44, h: 12,
    color: '#e11d48',
  },
  {
    key: 'Muskuloskelettales',
    label: 'Muskuloskelettales',
    // Arms + Legs combined — two separate highlight areas shown as one zone
    shape: 'rect',
    x: 5, y: 25, w: 20, h: 50,
    color: '#d97706',
  },
  {
    key: 'Muskuloskelettales_r',
    label: 'Muskuloskelettales',
    shape: 'rect',
    x: 75, y: 25, w: 20, h: 50,
    color: '#d97706',
    linkedKey: 'Muskuloskelettales',
  },
]

function HexLogo() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <polygon points="27,2 49,14.5 49,39.5 27,52 5,39.5 5,14.5"
        stroke="url(#hwg)" strokeWidth="2.2" fill="rgba(249,115,22,0.1)" />
      <polygon points="27,11 41,19 41,35 27,43 13,35 13,19"
        stroke="url(#hwg)" strokeWidth="1.2" fill="none" opacity="0.4" />
      <text x="27" y="33" textAnchor="middle" fill="url(#hwg)"
        fontSize="16" fontWeight="800" fontFamily="'Syne',system-ui,sans-serif">RY</text>
      <defs>
        <linearGradient id="hwg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── MODAL ─────────────────────────────────────────────────────────────────
function FachModal({ fachKey, onClose }) {
  const { texts } = useLanguage()
  const fach = FACH_DATA[fachKey]
  if (!fach) return null
  const name = texts.fachNames?.[fachKey] || fachKey

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ border: `1px solid ${fach.color}40` }} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader} style={{ background: fach.bg }}>
          <div className={styles.modalTitle} style={{ color: fach.color }}>{name}</div>
          <div className={styles.modalDesc}>{fach.description}</div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          {fach.available ? (
            <>
              <div className={styles.modalLabel}>Verfügbare Inhalte</div>
              {fach.links?.map(link =>
                link.ready
                  ? <a key={link.label} href={link.href} className={styles.modalLink} onClick={onClose}>
                      <span>📄</span>
                      <div>
                        <div className={styles.modalLinkName}>{link.label}</div>
                        <div className={styles.modalLinkMeta}>Jetzt lesen →</div>
                      </div>
                    </a>
                  : <div key={link.label} className={`${styles.modalLink} ${styles.modalLinkLocked}`}>
                      <span>🔒</span>
                      <div>
                        <div className={styles.modalLinkName}>{link.label}</div>
                        <div className={styles.modalLinkMeta}>In Vorbereitung</div>
                      </div>
                    </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.modalLabel}>Themen</div>
              <div className={styles.modalChips}>
                {fach.topics.map(t => (
                  <span key={t} className={styles.modalChip} style={{ borderColor: fach.color + '40', color: fach.color }}>{t}</span>
                ))}
              </div>
              <div className={styles.modalSoon}>🚧 Inhalte werden vorbereitet – bald verfügbar!</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN HERO ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { texts } = useLanguage()
  const [hoveredZone, setHoveredZone] = useState(null)
  const [selectedFach, setSelectedFach] = useState(null)

  const handleZoneClick = (zone) => {
    const key = zone.linkedKey || zone.key
    setSelectedFach(key)
  }

  // Active color for a zone key
  const getZoneColor = (zone) => {
    const key = zone.linkedKey || zone.key
    return FACH_DATA[key]?.color || '#f97316'
  }

  const isHovered = (zone) => {
    const key = zone.linkedKey || zone.key
    return hoveredZone === key
  }

  return (
    <section className={styles.hero}>
      {/* ── LEFT: Branding + Text ── */}
      <div className={styles.left}>
        <div className={styles.wordmark} dir="ltr">
          <HexLogo />
          <div className={styles.wmText} dir="ltr">
            <span className={styles.wmTitle}>
              <span className={styles.wmRad}>RAD</span>
              <span className={styles.wmYar}>YAR</span>
            </span>
            <span className={styles.wmSub}>{texts.heroSub || 'Radiology Education'}</span>
          </div>
        </div>

        <p className={styles.tagline}>{texts.tagline}</p>
        <div className={styles.bar} />
        <p className={styles.desc}>{texts.heroDesc}</p>

        <div className={styles.stats}>
          {[
            { dot: '#f97316', text: texts.stat1 },
            { dot: '#fbbf24', text: texts.stat2 },
            { dot: '#34d399', text: texts.stat3 },
          ].map(s => (
            <span key={s.text} className={styles.chip}>
              <span className={styles.dot} style={{ background: s.dot }} />
              {s.text}
            </span>
          ))}
        </div>

        <div className={styles.ctas} dir="ltr">
          <Link href="#lernpfade" className={styles.btnPrimary}>{texts.cta}</Link>
          <Link href="/technik/kontrastmittel" className={styles.btnGhost}>
            Technik & Physik
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Hover hint */}
        <div className={styles.hint}>
          {hoveredZone
            ? <><span className={styles.hintDot} style={{ background: FACH_DATA[hoveredZone]?.color }} />{texts.fachNames?.[hoveredZone] || hoveredZone}</>
            : <><span className={styles.hintDot} />Körperregion wählen</>
          }
        </div>
      </div>

      {/* ── RIGHT: Interactive Body ── */}
      <div className={styles.right}>
        <div className={styles.bodyWrap}>
          {/* The anatomy image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/body-anatomy.png"
            alt="Anatomie Körper"
            className={styles.bodyImg}
            draggable={false}
          />

          {/* SVG overlay with clickable zones */}
          <svg
            className={styles.bodySvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {ZONES.map((zone) => {
              const hovered = isHovered(zone)
              const color = getZoneColor(zone)
              const key = zone.linkedKey || zone.key

              const commonProps = {
                key: zone.key,
                fill: hovered ? color + '33' : 'transparent',
                stroke: hovered ? color : 'transparent',
                strokeWidth: '0.4',
                style: { cursor: 'pointer', transition: 'fill 0.2s, stroke 0.2s' },
                onMouseEnter: () => setHoveredZone(key),
                onMouseLeave: () => setHoveredZone(null),
                onClick: () => handleZoneClick(zone),
              }

              if (zone.shape === 'ellipse') {
                return <ellipse {...commonProps} cx={zone.cx} cy={zone.cy} rx={zone.rx} ry={zone.ry} />
              }
              return <rect {...commonProps} x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="2" />
            })}
          </svg>

          {/* Zone labels on hover */}
          {hoveredZone && (
            <div
              className={styles.zoneLabel}
              style={{ color: FACH_DATA[hoveredZone]?.color }}
            >
              {texts.fachNames?.[hoveredZone] || hoveredZone}
            </div>
          )}

          {/* Technik & Physik badge — bottom right of image */}
          <button
            className={styles.techBadge}
            onClick={() => setSelectedFach('Technik & Physik')}
            onMouseEnter={() => setHoveredZone('Technik & Physik')}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <span className={styles.techIcon}>⚙️</span>
            <span className={styles.techLabel}>Technik & Physik</span>
            <span className={styles.techNew}>Neu</span>
          </button>
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedFach && (
        <FachModal fachKey={selectedFach} onClose={() => setSelectedFach(null)} />
      )}
    </section>
  )
}
