'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

// ── FACHGEBIETE DATA ──────────────────────────────────────────────────────
const FACH_DATA = {
  Neuroradiologie: {
    color: '#a78bfa',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    available: false,
    topics: ['Schlaganfall', 'Tumoren', 'Multiple Sklerose', 'Trauma', 'Gefäße'],
    desc: { de: 'Gehirn, Rückenmark & Schädel', en: 'Brain, spinal cord & skull', fa: 'مغز، نخاع و جمجمه' },
  },
  Hals: {
    color: '#60a5fa',
    bg: 'linear-gradient(135deg,#0c1f40,#1e3a6e)',
    available: false,
    topics: ['Schilddrüsentumoren', 'Lymphome', 'Larynxkarzinom', 'Myelon', 'HWS'],
    desc: { de: 'Schilddrüse, Lymphknoten, Larynx & Wirbelsäule', en: 'Thyroid, lymph nodes, larynx & spine', fa: 'تیروئید، غدد لنفاوی، حنجره و ستون فقرات' },
  },
  Thorax: {
    color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    available: false,
    topics: ['Pneumonie', 'Lungenembolie', 'Tumor', 'Herzinsuffizienz', 'Pneumothorax'],
    desc: { de: 'Lunge, Herz, Mediastinum & Pleura', en: 'Lung, heart, mediastinum & pleura', fa: 'ریه، قلب، مدیاستن و پلور' },
  },
  Brust: {
    color: '#f472b6',
    bg: 'linear-gradient(135deg,#2a0a20,#5a1040)',
    available: false,
    topics: ['Mammakarzinom', 'Mastopathie', 'Fibroadenom', 'BIRADS'],
    desc: { de: 'Mammographie, Sonographie & MRT der Brust', en: 'Mammography, ultrasound & breast MRI', fa: 'ماموگرافی، سونوگرافی و MRI پستان' },
  },
  Abdomen: {
    color: '#34d399',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    available: false,
    topics: ['Leberzirrhose', 'Pankreatitis', 'Nierensteine', 'Appendizitis', 'Tumoren'],
    desc: { de: 'Leber, Milz, Niere, Pankreas & GI-Trakt', en: 'Liver, spleen, kidney, pancreas & GI', fa: 'کبد، طحال، کلیه، پانکراس و دستگاه گوارش' },
  },
  BeckenF: {
    color: '#fb7185',
    bg: 'linear-gradient(135deg,#2a0a10,#5a1020)',
    available: false,
    topics: ['Zervixkarzinom', 'Ovarialtumoren', 'Hüftarthrose', 'Endometriose'],
    desc: { de: 'Uterus, Ovarien & gynäkologische Organe', en: 'Uterus, ovaries & gynaecological organs', fa: 'رحم، تخمدان‌ها و اندام‌های زنانه' },
  },
  BeckenM: {
    color: '#c084fc',
    bg: 'linear-gradient(135deg,#1a0a30,#3a1060)',
    available: false,
    topics: ['Prostatakarzinom', 'Blasentumoren', 'Hüftarthrose', 'Urolithiasis'],
    desc: { de: 'Prostata, Blase & männliche Urogenitalorgane', en: 'Prostate, bladder & male urogenital organs', fa: 'پروستات، مثانه و اندام‌های مردانه' },
  },
  Muskuloskelettales: {
    color: '#fb923c',
    bg: 'linear-gradient(135deg,#2a1a00,#4a3000)',
    available: false,
    topics: ['Frakturen', 'Arthrose', 'Tumoren', 'Osteochondrose', 'Sportverletzungen'],
    desc: { de: 'Knochen, Gelenke, Muskulatur & Weichteile', en: 'Bones, joints, muscles & soft tissue', fa: 'استخوان‌ها، مفاصل، عضلات و بافت نرم' },
  },
  Technik: {
    color: '#4ade80',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    available: true,
    desc: { de: 'Physikalische Grundlagen · Kontrastmittel · Protokolle', en: 'Physics · Contrast agents · Protocols', fa: 'فیزیک · ماده حاجب · پروتکل‌ها' },
    links: [
      { label: { de: 'Kontrastmittel', en: 'Contrast Agents', fa: 'ماده حاجب' }, href: '/technik/kontrastmittel', ready: true },
      { label: { de: 'MRT-Physik', en: 'MRI Physics', fa: 'فیزیک MRI' }, href: '/technik/mrt', ready: false },
      { label: { de: 'CT-Technik', en: 'CT Technique', fa: 'تکنیک CT' }, href: '/technik/ct', ready: false },
    ],
  },
}

// ── TRANSLATED NAMES per language ─────────────────────────────────────────
const FACH_NAMES = {
  de: {
    Neuroradiologie: 'Neuroradiologie',
    Hals: 'Hals & Wirbelsäule',
    Thorax: 'Thorax',
    Brust: 'Brust',
    Abdomen: 'Abdomen',
    BeckenF: 'Becken – Frau',
    BeckenM: 'Becken – Mann',
    Muskuloskelettales: 'Muskuloskelettales',
    Technik: 'Technik & Physik',
  },
  en: {
    Neuroradiologie: 'Neuroradiology',
    Hals: 'Head & Neck / Spine',
    Thorax: 'Thorax',
    Brust: 'Breast',
    Abdomen: 'Abdomen',
    BeckenF: 'Pelvis – Female',
    BeckenM: 'Pelvis – Male',
    Muskuloskelettales: 'Musculoskeletal',
    Technik: 'Physics & Technology',
  },
  fa: {
    Neuroradiologie: 'نوروراديولوژی',
    Hals: 'گردن و ستون فقرات',
    Thorax: 'توراکس',
    Brust: 'پستان',
    Abdomen: 'شکم',
    BeckenF: 'لگن – زنان',
    BeckenM: 'لگن – مردان',
    Muskuloskelettales: 'اسکلتی-عضلانی',
    Technik: 'تکنیک و فیزیک',
  },
}

// ── ZONE DEFINITIONS (% of 1024×1536 image) ──────────────────────────────
const ZONES = [
  { id: 'Neuroradiologie',    x: 43.0, y: 0.0,  w: 12.2, h: 10.9 },
  { id: 'Hals',               x: 44.4, y: 10.9, w:  9.3, h:  7.0 },
  { id: 'Thorax',             x: 35.2, y: 18.0, w: 27.8, h:  9.4 },
  { id: 'Brust',              x: 32.7, y: 24.7, w: 11.7, h:  8.5 },
  { id: 'Brust',              x: 53.5, y: 24.7, w: 11.9, h:  8.5 },
  { id: 'Abdomen',            x: 35.2, y: 33.2, w: 27.8, h: 18.9 },
  { id: 'BeckenF',            x: 35.2, y: 52.1, w: 27.8, h:  4.9 },
  { id: 'BeckenM',            x: 49.2, y: 58.6, w: 43.6, h: 12.4 },
  { id: 'Technik',            x: 50.0, y: 74.2, w: 47.5, h: 21.5 },
  { id: 'Muskuloskelettales', x: 23.9, y: 18.0, w: 11.4, h: 38.0 },
  { id: 'Muskuloskelettales', x: 62.7, y: 18.0, w: 13.3, h: 38.0 },
  { id: 'Muskuloskelettales', x: 37.4, y: 57.0, w: 10.9, h: 41.3 },
  { id: 'Muskuloskelettales', x: 49.8, y: 57.0, w: 11.2, h: 41.3 },
]

// ── MAGNETIC FIELD CANVAS ─────────────────────────────────────────────────
function MagneticField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Magnetic field lines: elliptical paths around a central axis (z-axis = bore)
    // Protons precess around B0 field lines → simulate as particles on elliptical orbits
    const NUM_PARTICLES = 55
    const NUM_FIELD_LINES = 8

    // Field line paths: concentric ellipses at different depths
    // Center of field: middle of the right panel
    const getCenter = () => ({ cx: canvas.width * 0.5, cy: canvas.height * 0.42 })

    // Each field line = ellipse with given rx, ry, tilt
    const fieldLines = Array.from({ length: NUM_FIELD_LINES }, (_, i) => {
      const t = (i + 1) / (NUM_FIELD_LINES + 1)
      return {
        rx: canvas.width  * (0.12 + t * 0.38),
        ry: canvas.height * (0.08 + t * 0.26),
        tilt: (i % 2 === 0 ? 1 : -1) * 0.08, // slight tilt like real B0 field
        opacity: 0.04 + t * 0.04,
        color: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#34d399',
      }
    })

    // Particles: each assigned to a field line, precessing around it
    const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => {
      const lineIdx = i % NUM_FIELD_LINES
      const fl = fieldLines[lineIdx]
      const phase = (Math.PI * 2 * i) / NUM_PARTICLES + Math.random() * 0.5
      return {
        lineIdx,
        phase,
        speed: 0.003 + Math.random() * 0.004,  // proton precession speed
        size: 1.5 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.5,
        // Larmor precession: tiny wobble around field line
        wobble: 0.015 + Math.random() * 0.025,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        color: ['#f97316', '#fbbf24', '#60a5fa', '#a78bfa', '#34d399', '#f472b6'][i % 6],
        trail: [],
      }
    })

    let frame = 0
    let animId

    const draw = () => {
      const { cx, cy } = getCenter()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw field lines (static ellipses)
      fieldLines.forEach(fl => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(fl.tilt)
        ctx.beginPath()
        ctx.ellipse(0, 0, fl.rx, fl.ry, 0, 0, Math.PI * 2)
        ctx.strokeStyle = fl.color
        ctx.globalAlpha = fl.opacity
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 12])
        ctx.stroke()
        ctx.restore()
      })

      ctx.setLineDash([])

      // Draw particles with trails
      particles.forEach(p => {
        const fl = fieldLines[p.lineIdx]
        p.phase += p.speed
        p.wobblePhase += p.wobbleSpeed

        // Position on ellipse + Larmor wobble
        const wobX = Math.cos(p.wobblePhase) * fl.rx * p.wobble
        const wobY = Math.sin(p.wobblePhase * 1.3) * fl.ry * p.wobble

        const x = cx + (fl.rx + wobX) * Math.cos(p.phase) * Math.cos(fl.tilt)
                     - (fl.ry + wobY) * Math.sin(p.phase) * Math.sin(fl.tilt)
        const y = cy + (fl.rx + wobX) * Math.cos(p.phase) * Math.sin(fl.tilt)
                     + (fl.ry + wobY) * Math.sin(p.phase) * Math.cos(fl.tilt)

        // Store trail
        p.trail.push({ x, y })
        if (p.trail.length > 18) p.trail.shift()

        // Draw trail
        if (p.trail.length > 2) {
          for (let t = 1; t < p.trail.length; t++) {
            const prog = t / p.trail.length
            ctx.beginPath()
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y)
            ctx.lineTo(p.trail[t].x, p.trail[t].y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = prog * p.opacity * 0.35
            ctx.lineWidth = p.size * prog * 0.7
            ctx.stroke()
          }
        }

        // Draw particle glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3)
        grad.addColorStop(0, p.color)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.globalAlpha = p.opacity * 0.25
        ctx.fill()

        // Draw particle core
        ctx.beginPath()
        ctx.arc(x, y, p.size * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity * 0.9
        ctx.fill()
      })

      ctx.globalAlpha = 1
      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.magnetCanvas} />
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
  const { lang } = useLanguage()
  const fach = FACH_DATA[fachId]
  if (!fach) return null
  const name = FACH_NAMES[lang]?.[fachId] || FACH_NAMES.de[fachId]
  const desc = fach.desc?.[lang] || fach.desc?.de || ''

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader} style={{ background: fach.bg }}>
          <div className={styles.modalAccent} style={{ background: fach.color }} />
          <div className={styles.modalTitleRow}>
            <span className={styles.modalTitle} style={{ color: fach.color }}>{name}</span>
            {fach.available && (
              <span className={styles.modalBadge}
                style={{ color: fach.color, borderColor: fach.color + '50', background: fach.color + '18' }}>
                ✓ { lang === 'fa' ? 'موجود' : lang === 'en' ? 'Available' : 'Verfügbar' }
              </span>
            )}
          </div>
          <div className={styles.modalDesc}>{desc}</div>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {fach.available ? (
            <>
              <div className={styles.modalLabel}>
                { lang === 'fa' ? 'محتوای موجود' : lang === 'en' ? 'Available Content' : 'Verfügbare Inhalte' }
              </div>
              {fach.links?.map((link, i) =>
                link.ready
                  ? <a key={i} href={link.href} className={styles.modalLink} onClick={onClose}>
                      <span className={styles.modalLinkIcon}>📄</span>
                      <div>
                        <div className={styles.modalLinkName}>{link.label[lang] || link.label.de}</div>
                        <div className={styles.modalLinkMeta}>
                          { lang === 'fa' ? 'مطالعه کنید' : lang === 'en' ? 'Read now' : 'Jetzt lesen' } →
                        </div>
                      </div>
                      <span className={styles.modalLinkArr}>→</span>
                    </a>
                  : <div key={i} className={`${styles.modalLink} ${styles.modalLinkLocked}`}>
                      <span className={styles.modalLinkIcon}>🔒</span>
                      <div>
                        <div className={styles.modalLinkName}>{link.label[lang] || link.label.de}</div>
                        <div className={styles.modalLinkMeta}>
                          { lang === 'fa' ? 'در حال آماده‌سازی' : lang === 'en' ? 'Coming soon' : 'In Vorbereitung' }
                        </div>
                      </div>
                    </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.modalLabel}>
                { lang === 'fa' ? 'موضوعات' : lang === 'en' ? 'Topics' : 'Themen' }
              </div>
              <div className={styles.modalChips}>
                {fach.topics?.map(t => (
                  <span key={t} className={styles.modalChip}
                    style={{ borderColor: fach.color + '40', color: fach.color }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.modalSoon}>
                🚧 { lang === 'fa' ? 'محتوا در حال آماده‌سازی است – به زودی!' : lang === 'en' ? 'Content coming soon!' : 'Inhalte werden vorbereitet – bald verfügbar!' }
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN HERO ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { texts, lang } = useLanguage()
  const [hovered, setHovered]   = useState(null)
  const [selected, setSelected] = useState(null)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const hovFach = hovered ? FACH_DATA[hovered] : null
  const hovName = hovered ? (FACH_NAMES[lang]?.[hovered] || FACH_NAMES.de[hovered]) : null

  return (
    <section className={styles.hero}>

      {/* ── BACKGROUND ── */}
      <div className={styles.bg} />
      <div className={styles.bgGrid} />

      {/* ── LEFT PANEL ── */}
      <div className={`${styles.left} ${mounted ? styles.leftIn : ''}`}>
        {/* Wordmark always LTR + always Fraunces — never overridden by Farsi RTL/Vazirmatn */}
        <div className={styles.wordmark} dir="ltr" lang="en">
          <HexLogo />
          <div className={styles.wmText} dir="ltr" lang="en">
            <span className={styles.wmTitle}>
              <span className={styles.wmRad}>RAD</span>
              <span className={styles.wmYar}>YAR</span>
            </span>
            <span className={styles.wmSub} dir="ltr" lang="en">
              {texts.heroSub || 'Radiology Education'}
            </span>
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
          <Link href="#lernpfade" className={styles.btnPrimary}>
            { lang === 'fa' ? 'مسیرهای یادگیری' : lang === 'en' ? 'Learning Paths' : 'Lernpfade' }
          </Link>
        </div>

        {/* Live hover indicator */}
        <div className={styles.hoverIndicator}>
          <div className={styles.hoverDot} style={{ background: hovFach?.color || '#334155' }} />
          <span className={styles.hoverText} style={{ color: hovFach?.color || '#64748b' }}>
            { hovName ||
              (lang === 'fa' ? 'یک ناحیه را انتخاب کنید' :
               lang === 'en' ? 'Select a body region' :
               'Körperregion auswählen') }
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={`${styles.right} ${mounted ? styles.rightIn : ''}`}>

        {/* Magnetic field particle animation — fills the right panel */}
        <MagneticField />

        {/* Body image — no background, blends seamlessly */}
        <div className={styles.bodyWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/body-anatomy.png"
            alt="Anatomy"
            className={styles.bodyImg}
            draggable={false}
          />

          {/* Colour wash matching hovered fachgebiet */}
          <div
            className={styles.bodyColorWash}
            style={{
              background: hovFach
                ? `radial-gradient(ellipse 60% 70% at 50% 40%, ${hovFach.color}18 0%, transparent 75%)`
                : 'none',
            }}
          />

          {/* SVG clickable zones */}
          <svg className={styles.zoneSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {ZONES.map((zone, i) => {
              const isHov = hovered === zone.id
              const color = FACH_DATA[zone.id]?.color || '#f97316'
              return (
                <rect
                  key={i}
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h}
                  rx="1.2"
                  fill={isHov ? color + '28' : 'transparent'}
                  stroke={isHov ? color : 'transparent'}
                  strokeWidth="0.3"
                  style={{ cursor: 'pointer', transition: 'fill 0.2s, stroke 0.2s' }}
                  onMouseEnter={() => setHovered(zone.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(zone.id)}
                />
              )
            })}
          </svg>

          {/* Floating zone label */}
          {hovered && hovFach && (
            <div className={styles.zoneLabel}
              style={{ color: hovFach.color, borderColor: hovFach.color + '55', background: 'rgba(8,14,28,0.88)' }}>
              <span className={styles.zoneDot} style={{ background: hovFach.color }} />
              {hovName}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && <FachModal fachId={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
