import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>

      {/* Background image */}
      <div className={styles.heroBgWrap}>
        <Image
          src="/hero.png"
          alt="MRI Scanner"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.35) saturate(1.1)' }}
          priority
        />
      </div>

      {/* Animated glow orb */}
      <div className={styles.orbViolet} />
      <div className={styles.orbBlue} />

      {/* Dark gradient overlay */}
      <div className={styles.heroOverlay} />

      {/* Content */}
      <div className={styles.heroContent}>

        {/* Wordmark */}
        <div className={styles.wordmark}>
          <svg className={styles.wmIcon} viewBox="0 0 54 54" fill="none">
            <circle cx="27" cy="27" r="26" stroke="url(#g1)" strokeWidth="1.8" opacity="0.45" />
            <circle cx="27" cy="27" r="18" stroke="url(#g1)" strokeWidth="1.5" opacity="0.7" />
            <line x1="27" y1="11" x2="27" y2="43" stroke="url(#g1)" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="11" y1="27" x2="43" y2="27" stroke="url(#g1)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="27" cy="27" r="4.5" fill="url(#g1)" opacity="0.95" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.wmText}>
            <span className={styles.wmRad}>Rad</span>
            <span className={styles.wmYar}>Yar</span>
          </span>
        </div>

        <p className={styles.heroTagline}>
          Your Guide in <span>Radiology Education</span>
        </p>

        <div className={styles.heroBar} />

        <p className={styles.heroDesc}>
          Strukturiertes Wissen, interaktive Fälle und gezielte Prüfungsvorbereitung –
          kompakt aufbereitet für Radiologinnen und Radiologen in Weiterbildung.
        </p>

        {/* Stats chips */}
        <div className={styles.statsRow}>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#a78bfa' }} />
            8 Fachgebiete
          </span>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#38bdf8' }} />
            MCQs & Fälle
          </span>
          <span className={styles.statChip}>
            <span className={styles.statDot} style={{ background: '#34d399' }} />
            Kostenlos starten
          </span>
        </div>

        <div className={styles.ctaRow}>
          <Link href="#fachgebiete" className={styles.btnPrimary}>
            Jetzt entdecken
          </Link>
          <Link href="#lernpfade" className={styles.btnGhost}>
            Lernpfade ansehen
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 6.5l4.5 4.5 4.5-4.5"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </section>
  )
}
