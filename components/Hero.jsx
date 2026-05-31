'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

// ── FACHGEBIETE DATA ──────────────────────────────────────────────────────
const FACH_DATA = {
  Neuroradiologie: {
    color: '#a78bfa',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    description: 'Gehirn, Rückenmark & Schädel',
    available: false,
    topics: ['Schlaganfall', 'Tumoren', 'Multiple Sklerose', 'Trauma', 'Gefäße'],
  },
  Hals: {
    color: '#60a5fa',
    bg: 'linear-gradient(135deg,#0c1f40,#1e3a6e)',
    description: 'Schilddrüse, Lymphknoten, Larynx & Wirbelsäule',
    available: false,
    topics: ['Schilddrüsentumoren', 'Lymphome', 'Larynxkarzinom', 'Myelon', 'HWS'],
  },
  Thorax: {
    color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    description: 'Lunge, Herz, Mediastinum & Pleura',
    available: false,
    topics: ['Pneumonie', 'Lungenembolie', 'Tumor', 'Herzinsuffizienz', 'Pneumothorax'],
  },
  Brust: {
    color: '#f472b6',
    bg: 'linear-gradient(135deg,#2a0a20,#5a1040)',
    description: 'Mammographie, Sonographie & MRT der Brust',
    available: false,
    topics: ['Mammakarzinom', 'Mastopathie', 'Fibroadenom', 'BIRADS'],
  },
  Abdomen: {
    color: '#34d399',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    description: 'Leber, Milz, Niere, Pankreas & GI-Trakt',
    available: false,
    topics: ['Leberzirrhose', 'Pankreatitis', 'Nierensteine', 'Appendizitis', 'Tumoren'],
  },
  BeckenF: {
    color: '#fb7185',
    bg: 'linear-gradient(135deg,#2a0a10,#5a1020)',
    description: 'Uterus, Ovarien, Hüfte & gynäkologische Organe',
    available: false,
    topics: ['Zervixkarzinom', 'Ovarialtumoren', 'Hüftarthrose', 'Endometriose'],
  },
  BeckenM: {
    color: '#c084fc',
    bg: 'linear-gradient(135deg,#1a0a30,#3a1060)',
    description: 'Prostata, Blase, Hüfte & männliche Urogenitalorgane',
    available: false,
    topics: ['Prostatakarzinom', 'Blasentumoren', 'Hüftarthrose', 'Urolithiasis'],
  },
  Muskuloskelettales: {
    color: '#fb923c',
    bg: 'linear-gradient(135deg,#2a1a00,#4a3000)',
    description: 'Knochen, Gelenke, Muskulatur & Weichteile',
    available: false,
    topics: ['Frakturen', 'Arthrose', 'Tumoren', 'Osteochondrose', 'Sportverletzungen'],
  },
  Technik: {
    color: '#4ade80',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    description: 'Physikalische Grundlagen · Kontrastmittel · Protokolle',
    available: true,
    links: [
      { label: 'Kontrastmittel', href: '/technik/kontrastmittel', ready: true },
      { label: 'MRT-Physik', href: '/technik/mrt', ready: false },
      { label: 'CT-Technik', href: '/technik/ct', ready: false },
    ],
  },
}

// ── ZONE DEFINITIONS (% of image 941x1672) ───────────────────────────────
const ZONES = [
  { id: 'Neuroradiologie', x: 37.0, y: 1.9,  w: 15.3, h: 8.3,  label: 'Neuroradiologie' },
  { id: 'Hals',            x: 36.7, y: 9.9,  w: 15.4, h: 8.1,  label: 'Hals & Wirbelsäule' },
  { id: 'Thorax',          x: 32.9, y: 17.9, w: 27.1, h: 12.0, label: 'Thorax' },
  { id: 'Brust',           x: 25.7, y: 23.9, w: 10.9, h: 6.0,  label: 'Brust (links)' },
  { id: 'Brust',           x: 50.8, y: 23.9, w: 11.1, h: 6.0,  label: 'Brust (rechts)', noLabel: true },
  { id: 'Abdomen',         x: 32.9, y: 29.9, w: 27.1, h: 17.3, label: 'Abdomen' },
  { id: 'BeckenF',         x: 32.9, y: 45.2, w: 27.1, h: 5.4,  label: 'Becken (Frau)' },
  { id: 'BeckenM',         x: 56.9, y: 55.9, w: 36.1, h: 16.1, label: 'Becken (Mann)' },
  { id: 'Technik',         x: 54.2, y: 74.2, w: 41.4, h: 19.4, label: 'Technik & Physik' },
  { id: 'Muskuloskelettales', x: 16.5, y: 17.6, w: 16.3, h: 36.2, label: 'Muskuloskelettales' },
  { id: 'Muskuloskelettales', x: 60.0, y: 17.6, w: 19.1, h: 36.2, label: 'Muskuloskelettales', noLabel: true },
  { id: 'Muskuloskelettales', x: 31.5, y: 50.4, w: 12.6, h: 45.7, label: 'Muskuloskelettales', noLabel: true },
  { id: 'Muskuloskelettales', x: 44.1, y: 50.4, w: 13.8, h: 45.7, label: 'Muskuloskelettales', noLabel: true },
]

const FACH_NAMES = {
  Neuroradiologie: 'Neuroradiologie',
  Hals: 'Hals & Wirbelsäule',
  Thorax: 'Thorax',
  Brust: 'Brust',
  Abdomen: 'Abdomen',
  BeckenF: 'Becken – Frau',
  BeckenM: 'Becken – Mann',
  Muskuloskelettales: 'Muskuloskelettales',
  Technik: 'Technik & Physik',
}

// ── HEX LOGO ──────────────────────────────────────────────────────────────
function HexLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 54 54" fill="none">
      <polygon points="27,2 49,14.5 49,39.5 27,52 5,39.5 5,14.5"
        stroke="url(#hwg)" strokeWidth="2.2" fill="rgba(249,115,22,0.12)" />
      <polygon points="27,11 41,19 41,35 27,43 13,35 13,19"
        stroke="url(#hwg)" strokeWidth="1.2" fill="none" opacity="0.45" />
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
function FachModal({ fachId, onClose }) {
  const { texts } = useLanguage()
  const fach = FACH_DATA[fachId]
  if (!fach) return null
  const name = FACH_NAMES[fachId] || fachId

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader} style={{ background: fach.bg }}>
          <div className={styles.modalAccent} style={{ background: fach.color }} />
          <div className={styles.modalTitleRow}>
            <span className={styles.modalTitle} style={{ color: fach.color }}>{name}</span>
            {fach.available && (
              <span className={styles.modalBadge} style={{ color: fach.color, borderColor: fach.color + '50', background: fach.color + '18' }}>
                ✓ Verfügbar
              </span>
            )}
          </div>
          <div className={styles.modalDesc}>{fach.description}</div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {fach.available ? (
            <>
              <div className={styles.modalLabel}>Verfügbare Inhalte</div>
              {fach.links?.map(link =>
                link.ready
                  ? <a key={link.label} href={link.href} className={styles.modalLink} onClick={onClose}>
                      <span className={styles.modalLinkIcon}>📄</span>
                      <div>
                        <div className={styles.modalLinkName}>{link.label}</div>
                        <div className={styles.modalLinkMeta}>Jetzt lesen</div>
                      </div>
                      <span className={styles.modalLinkArr}>→</span>
                    </a>
                  : <div key={link.label} className={`${styles.modalLink} ${styles.modalLinkLocked}`}>
                      <span className={styles.modalLinkIcon}>🔒</span>
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
                {fach.topics?.map(t => (
                  <span key={t} className={styles.modalChip}
                    style={{ borderColor: fach.color + '40', color: fach.color }}>
                    {t}
                  </span>
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
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const hovFach = hovered ? FACH_DATA[hovered] : null

  return (
    <section className={styles.hero}>

      {/* ── BACKGROUND ── */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      {/* ── LEFT PANEL ── */}
      <div className={`${styles.left} ${mounted ? styles.leftIn : ''}`}>

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

        {/* Live hover indicator */}
        <div className={styles.hoverIndicator}>
          <div
            className={styles.hoverDot}
            style={{ background: hovFach?.color || '#475569' }}
          />
          <span
            className={styles.hoverText}
            style={{ color: hovFach?.color || '#64748b' }}
          >
            {hovered ? (FACH_NAMES[hovered] || hovered) : 'Körperregion auswählen'}
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Interactive Body ── */}
      <div className={`${styles.right} ${mounted ? styles.rightIn : ''}`}>

        {/* Glow behind body */}
        <div
          className={styles.bodyGlow}
          style={{
            background: hovFach
              ? `radial-gradient(ellipse at center, ${hovFach.color}22 0%, transparent 70%)`
              : 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)',
            transition: 'background 0.4s ease',
          }}
        />

        <div className={styles.bodyWrap}>
          {/* Anatomy image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/body-anatomy.png"
            alt="Anatomie"
            className={styles.bodyImg}
            draggable={false}
          />

          {/* SVG clickable zones */}
          <svg
            className={styles.zoneSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {ZONES.map((zone, i) => {
              const isHov = hovered === zone.id
              const fach = FACH_DATA[zone.id]
              const color = fach?.color || '#f97316'
              return (
                <rect
                  key={i}
                  x={zone.x} y={zone.y}
                  width={zone.w} height={zone.h}
                  rx="1.5"
                  fill={isHov ? color + '30' : 'transparent'}
                  stroke={isHov ? color : 'transparent'}
                  strokeWidth="0.35"
                  style={{ cursor: 'pointer', transition: 'fill 0.2s, stroke 0.2s' }}
                  onMouseEnter={() => setHovered(zone.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(zone.id)}
                />
              )
            })}
          </svg>

          {/* Floating zone label on hover */}
          {hovered && hovFach && (
            <div
              className={styles.zoneLabel}
              style={{
                color: hovFach.color,
                borderColor: hovFach.color + '60',
                background: 'rgba(10,15,30,0.92)',
              }}
            >
              <span className={styles.zoneLabelDot} style={{ background: hovFach.color }} />
              {FACH_NAMES[hovered]}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <FachModal fachId={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
