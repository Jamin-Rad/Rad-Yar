'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

function HexLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon points="18,1.5 32,9.75 32,26.25 18,34.5 4,26.25 4,9.75"
        stroke="url(#ng)" strokeWidth="1.8" fill="rgba(249,115,22,0.1)"/>
      <polygon points="18,8 26,12.6 26,23.4 18,28 10,23.4 10,12.6"
        stroke="url(#ng)" strokeWidth="1" fill="none" opacity="0.4"/>
      <text x="18" y="23" textAnchor="middle" fill="url(#ng)" fontSize="11" fontWeight="800"
        fontFamily="'Syne',system-ui,sans-serif">RY</text>
      <defs>
        <linearGradient id="ng" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const { lang, texts, setLang } = useLanguage()
  const [search, setSearch] = useState(false)

  return (
    <>
      <nav className={styles.nav}>

        {/* ── Logo always LTR ── */}
        <Link href="/" className={styles.brand} dir="ltr">
          <HexLogo size={28} />
          <span className={styles.wordmark} dir="ltr">
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </span>
        </Link>

        {/* ── Right: search + language only ── */}
        <div className={styles.right}>
          <button className={styles.iconBtn} onClick={() => setSearch(true)}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <div className={styles.langToggle} dir="ltr">
            <button className={`${styles.langBtn} ${lang==='de'?styles.langOn:''}`} onClick={() => setLang('de')}>DE</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='en'?styles.langOn:''}`} onClick={() => setLang('en')}>EN</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='fa'?styles.langOn:''}`} onClick={() => setLang('fa')}>FA</button>
          </div>
        </div>
      </nav>
      {search && <SearchBar onClose={() => setSearch(false)} />}
    </>
  )
}
