'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

function RadYarWordmark() {
  return (
    <div className={styles.wordmark}>
      <svg className={styles.wmIcon} viewBox="0 0 54 54" fill="none">
        <circle cx="27" cy="27" r="25.5" stroke="url(#wg)" strokeWidth="2" opacity="0.5" />
        <circle cx="27" cy="27" r="17" stroke="url(#wg)" strokeWidth="1.5" opacity="0.7" />
        <path
          d="M18 13 L18 41 M18 13 L30 13 C34.4 13 38 16.6 38 21 C38 25.4 34.4 28 30 28 L18 28 M28 28 L38 41"
          stroke="url(#wg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.wmTextBlock}>
        <span className={styles.wmText}>
          <span className={styles.wmRad}>rad</span>
          <span className={styles.wmYar}>YAR</span>
        </span>
        <span className={styles.wmSub}>Radiology Education</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { texts } = useLanguage()

  return (
    <section className={styles.hero}>
      <div className={styles.heroBgWrap}>
        <Image
          src="/hero.png"
          alt="MRI Scanner"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.35) saturate(1.1)' }}
          priority
        />
      </div>
      <div className={styles.orbViolet} />
      <div className={styles.orbBlue} />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <RadYarWordmark />

        <p className={styles.heroTagline}>{texts.tagline}</p>
        <div className={styles.heroBar} />
        <p className={styles.heroDesc}>{texts.heroDesc}</p>

        <div className={styles.statsRow}>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#a78bfa' }} />
            {texts.stat1}
          </span>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#38bdf8' }} />
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
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 6.5l4.5 4.5 4.5-4.5"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
