'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

// Wordmark SVG logo - stylized R in gradient circle
function RadYarLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="url(#nl)" strokeWidth="1.8" />
      <path
        d="M10 8 L10 24 M10 8 L18 8 C21.3 8 24 10.7 24 14 C24 17.3 21.3 19 18 19 L10 19 M17 19 L24 24"
        stroke="url(#nl)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="nl" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const { lang, texts, setLang } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <RadYarLogo size={30} />
          <span className={styles.wordmark}>
            <span className={styles.rad}>rad</span>
            <span className={styles.yar}>YAR</span>
          </span>
        </Link>

        {/* Center links */}
        <div className={styles.links}>
          <Link href="#fachgebiete" className={styles.navLink}>
            {texts.navFach}
          </Link>
          <Link href="#lernpfade" className={styles.navLink}>
            {texts.navFall}
          </Link>
        </div>

        {/* Right side */}
        <div className={styles.right}>
          {/* Search icon */}
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(true)}
            aria-label="Suche"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {/* Language toggle */}
          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === 'de' ? styles.langActive : ''}`}
              onClick={() => setLang('de')}
            >
              DE
            </button>
            <span className={styles.langDivider}>·</span>
            <button
              className={`${styles.langBtn} ${lang === 'fa' ? styles.langActive : ''}`}
              onClick={() => setLang('fa')}
            >
              FA
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  )
}
