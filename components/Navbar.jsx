'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

const FACH_KEYS = [
  'Neuroradiologie','Thorax','Abdomen','Muskuloskelettales',
  'Hals','Brust','Becken','Technik & Physik',
]

const FACH_ICONS = {
  Neuroradiologie: '🧠', Thorax: '🫁', Abdomen: '🫃',
  Muskuloskelettales: '🦴', Hals: '🫀', Brust: '🩺',
  Becken: '⭕', 'Technik & Physik': '⚛️',
}

// Logo B: Hexagonal emblem with RY
function HexLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon
        points="18,1.5 32,9.75 32,26.25 18,34.5 4,26.25 4,9.75"
        stroke="url(#hg)" strokeWidth="1.8" fill="rgba(249,115,22,0.08)"
      />
      <polygon
        points="18,8 26,12.6 26,23.4 18,28 10,23.4 10,12.6"
        stroke="url(#hg)" strokeWidth="1" fill="none" opacity="0.4"
      />
      <text
        x="18" y="23" textAnchor="middle"
        fill="url(#hg)" fontSize="11" fontWeight="800"
        fontFamily="'Syne','Segoe UI',system-ui,sans-serif"
      >RY</text>
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className={styles.chevron}>
      <path d="M2 4l3.5 3.5L9 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function FachDropdown({ texts }) {
  return (
    <div className={styles.dropdown}>
      <div className={styles.ddLabel}>{texts.navFach}</div>
      {FACH_KEYS.map((k) => (
        <Link key={k} href="#fachgebiete" className={styles.ddItem}>
          <span className={styles.ddDot} />
          {texts.fachNames[k]}
        </Link>
      ))}
    </div>
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
          <HexLogo size={30} />
          <span className={styles.wordmark}>
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </span>
        </Link>

        {/* Center nav links - both with dropdowns */}
        <div className={styles.links}>

          {/* Lernen dropdown */}
          <div className={styles.navItem}>
            <button className={styles.navLink}>
              {texts.navLearn} <ChevronDown />
            </button>
            <FachDropdown texts={texts} />
          </div>

          {/* Fallbeispiele/MCQs dropdown */}
          <div className={styles.navItem}>
            <button className={`${styles.navLink} ${styles.navLinkActive}`}>
              {texts.navFall} <ChevronDown />
            </button>
            <FachDropdown texts={texts} />
          </div>

        </div>

        {/* Right */}
        <div className={styles.right}>
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(true)}
            aria-label="Suche"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === 'de' ? styles.langOn : ''}`}
              onClick={() => setLang('de')}
            >DE</button>
            <span className={styles.langSep}>·</span>
            <button
              className={`${styles.langBtn} ${lang === 'fa' ? styles.langOn : ''}`}
              onClick={() => setLang('fa')}
            >FA</button>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  )
}
