'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './HomeGlass.module.css'

// ── MAGNETIC FIELD CANVAS (same as Hero) ──────────────────────────────────
function MagneticField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, dpr = 1
    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const protons = Array.from({ length: 14 }, (_, i) => ({
      orbit: i % 3,
      phase: (i / 14) * Math.PI * 2,
      speed: 0.000055 + (i % 4) * 0.000006,
    }))
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let animId
    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width * 0.5
      const cy = height * 0.43
      const pulse = reducedMotion ? 0.4 : (Math.sin(time * 0.0011) + 1) / 2
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.52)
      glow.addColorStop(0, `rgba(56,189,248,${0.035 + pulse * 0.018})`)
      glow.addColorStop(0.55, 'rgba(37,99,235,0.018)')
      glow.addColorStop(1, 'rgba(37,99,235,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)
      const fieldTop = height * 0.09
      const fieldBottom = height * 0.84
      const fieldGradient = ctx.createLinearGradient(0, fieldTop, 0, fieldBottom)
      fieldGradient.addColorStop(0, 'rgba(125,211,252,0.08)')
      fieldGradient.addColorStop(0.45, 'rgba(125,211,252,0.34)')
      fieldGradient.addColorStop(1, 'rgba(125,211,252,0.04)')
      ctx.strokeStyle = fieldGradient
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(cx, fieldBottom)
      ctx.lineTo(cx, fieldTop)
      ctx.stroke()
      ctx.fillStyle = 'rgba(125,211,252,0.55)'
      ctx.beginPath()
      ctx.moveTo(cx, fieldTop - 1)
      ctx.lineTo(cx - 5, fieldTop + 9)
      ctx.lineTo(cx + 5, fieldTop + 9)
      ctx.closePath()
      ctx.fill()
      ctx.font = '700 10px Manrope, sans-serif'
      ctx.fillText('B₀', cx + 9, fieldTop + 6)
      const orbitSizes = [
        [width * 0.24, height * 0.31],
        [width * 0.34, height * 0.39],
        [width * 0.44, height * 0.47],
      ]
      orbitSizes.forEach(([rx, ry], index) => {
        const gradient = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy)
        gradient.addColorStop(0, 'rgba(56,189,248,0)')
        gradient.addColorStop(0.5, `rgba(125,211,252,${0.18 - index * 0.025})`)
        gradient.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = index === 0 ? 1.45 : 1
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
      })
      protons.forEach((proton) => {
        const [rx, ry] = orbitSizes[proton.orbit]
        const angle = proton.phase + (reducedMotion ? 0 : time * proton.speed)
        const x = cx + Math.cos(angle) * rx
        const y = cy + Math.sin(angle) * ry
        const alpha = 0.3 + (Math.cos(angle) + 1) * 0.14
        ctx.shadowColor = 'rgba(56,189,248,0.5)'
        ctx.shadowBlur = 6
        ctx.fillStyle = `rgba(186,230,253,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, proton.orbit === 0 ? 2 : 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
      const rfRadius = width * (0.09 + pulse * 0.045)
      ctx.strokeStyle = `rgba(249,115,22,${0.34 - pulse * 0.12})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.ellipse(cx, cy, rfRadius, rfRadius * 0.32, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(249,115,22,0.62)'
      ctx.font = '700 9px Manrope, sans-serif'
      ctx.fillText('RF', cx + rfRadius + 6, cy + 3)
      if (!reducedMotion) animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.magnetCanvas} />
}

// ── CARD DATA ─────────────────────────────────────────────────────────────
const LERN_CARDS = [
  { key: 'lektionen',    img: '/lernbereiche/lektionen.jpg',    href: '/lernen',     pillarIdx: 0 },
  { key: 'fallpruefung', img: '/lernbereiche/fallpruefung.jpg', href: '/faelle',     pillarIdx: 1 },
  { key: 'mcq',          img: '/lernbereiche/mcq.jpg',          href: '/ueben',      pillarIdx: 2 },
  { key: 'flashcards',   img: '/lernbereiche/flashcards.jpg',   href: '/flashcards', pillarIdx: 3 },
]

const SCHNELL_CARDS = [
  { key: 'anatomie',         img: '/referenzen/anatomie/anatomie-icon.jpg', href: '/referenzen' },
  { key: 'klassifikationen', img: '/referenzen/klassifikation.png',          href: '/referenzen' },
  { key: 'rechner',          img: '/referenzen/rechner.png',                 href: '/referenzen' },
  { key: 'messwerte',        img: '/referenzen/messwerte.png',               href: '/referenzen' },
]

const SCHNELL_LABELS = {
  de: ['Anatomie', 'Klassifikationen', 'Rechner', 'Messwerte'],
  en: ['Anatomy', 'Classifications', 'Calculators', 'Reference Values'],
  fa: ['آناتومی', 'طبقه‌بندی‌ها', 'محاسبه‌گرها', 'مقادیر مرجع'],
}

const COL_LABELS = {
  lern:    { de: 'Lernbereich',   en: 'Learning',     fa: 'بخش آموزش'   },
  schnell: { de: 'Schnellzugriff', en: 'Quick Access', fa: 'دسترسی سریع' },
}

// ── COMPONENT ─────────────────────────────────────────────────────────────
export default function HomeGlass() {
  const { texts, lang } = useLanguage()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const schnellLabels = SCHNELL_LABELS[lang] ?? SCHNELL_LABELS.de
  const lernLabel  = COL_LABELS.lern[lang]    ?? COL_LABELS.lern.de
  const schnellLabel = COL_LABELS.schnell[lang] ?? COL_LABELS.schnell.de

  return (
    <section className={styles.scene}>
      {/* ── Background layers ── */}
      <div className={styles.bg} />
      <MagneticField />

      {/* ── Top heading (existing text, unchanged) ── */}
      <header className={`${styles.header} ${mounted ? styles.headerIn : ''}`}>
        <span className={styles.heroSub}>{texts?.heroSub ?? 'Radiology Education'}</span>
        <p className={styles.tagline}>{texts?.tagline}</p>
      </header>

      {/* ── Three-column cockpit layout ── */}
      <div className={styles.layout}>

        {/* LEFT: Lernbereich */}
        <div className={styles.col}>
          <p className={`${styles.colLabel} ${styles.colLabelCyan}`}>{lernLabel}</p>
          <div className={styles.stack}>
            {LERN_CARDS.map((card, i) => (
              <Link
                key={card.key}
                href={card.href}
                className={`${styles.card} ${styles.cardCyan} ${mounted ? styles.cardIn : ''}`}
                style={{ '--i': i }}
              >
                <span className={`${styles.iconBox} ${styles.iconCyan}`}>
                  <Image src={card.img} alt="" width={44} height={44} className={styles.iconImg} />
                </span>
                <span className={styles.cardName}>
                  {texts?.pillars?.[card.pillarIdx]?.title ?? card.key}
                </span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER: Body anatomy */}
        <div className={styles.center}>
          <div className={styles.bodyWrap}>
            <div className={styles.bodyGlow} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/body-anatomy.png"
              alt="Körper-Anatomie"
              className={styles.bodyImg}
              draggable={false}
            />
          </div>
        </div>

        {/* RIGHT: Schnellzugriff */}
        <div className={styles.col}>
          <p className={`${styles.colLabel} ${styles.colLabelPurple}`}>{schnellLabel}</p>
          <div className={styles.stack}>
            {SCHNELL_CARDS.map((card, i) => (
              <Link
                key={card.key}
                href={card.href}
                className={`${styles.card} ${styles.cardPurple} ${mounted ? styles.cardIn : ''}`}
                style={{ '--i': i }}
              >
                <span className={`${styles.iconBox} ${styles.iconPurple}`}>
                  <Image src={card.img} alt="" width={44} height={44} className={styles.iconImg} />
                </span>
                <span className={styles.cardName}>{schnellLabels[i]}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
