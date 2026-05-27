'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

// Logo B: Hexagonal emblem (same as navbar)
function HexLogoLarge() {
  return (
    <svg className={styles.wmIcon} viewBox="0 0 54 54" fill="none">
      <polygon
        points="27,2 49,14.5 49,39.5 27,52 5,39.5 5,14.5"
        stroke="url(#hwg)" strokeWidth="2.2" fill="rgba(249,115,22,0.08)"
      />
      <polygon
        points="27,11 41,19 41,35 27,43 13,35 13,19"
        stroke="url(#hwg)" strokeWidth="1.2" fill="none" opacity="0.4"
      />
      <text
        x="27" y="33" textAnchor="middle"
        fill="url(#hwg)" fontSize="16" fontWeight="800"
        fontFamily="'Syne','Segoe UI',system-ui,sans-serif"
      >RY</text>
      <defs>
        <linearGradient id="hwg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Hero() {
  const { texts } = useLanguage()

  return (
    <section className={styles.hero}>

      {/* Background image – brighter, more visible */}
      <div className={styles.heroBgWrap}>
        <Image
          src="/hero.png"
          alt="MRI Scanner"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.52) saturate(1.15)' }}
          priority
        />
      </div>

      {/* Subtle gradient – only left side dark for text, right stays open */}
      <div className={styles.heroOverlay} />

      {/* Orange glow orbs */}
      <div className={styles.orbOrange} />
      <div className={styles.orbAmber} />

      {/* Content */}
      <div className={styles.heroContent}>

        {/* Wordmark with hex logo */}
        <div className={styles.wordmark}>
          <HexLogoLarge />
          <div className={styles.wmTextBlock}>
            <span className={styles.wmText}>
              <span className={styles.wmRad}>RAD</span>
              <span className={styles.wmYar}>YAR</span>
            </span>
            <span className={styles.wmSub}>{texts.hs || 'Radiology Education'}</span>
          </div>
        </div>

        <p className={styles.heroTagline}>{texts.tagline}</p>
        <div className={styles.heroBar} />
        <p className={styles.heroDesc}>{texts.heroDesc}</p>

        {/* Stats */}
        <div className={styles.statsRow}>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#f97316' }} />
            {texts.stat1}
          </span>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#fbbf24' }} />
            {texts.stat2}
          </span>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#34d399' }} />
            {texts.stat3}
          </span>
        </div>

        <div className={styles.ctaRow}>
          <Link href="#fachgebiete" className={styles.btnPrimary}>{texts.cta}</Link>
          <Link href="#lernpfade" className={styles.btnGhost}>
            {texts.ctaSub}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 6.5l4.5 4.5 4.5-4.5"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
