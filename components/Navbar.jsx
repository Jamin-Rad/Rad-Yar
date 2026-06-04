'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

function HexLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="35" height="35" rx="13" fill="url(#logoBg)" />
      <path d="M10 22.5c2.2-7.8 17.8-7.8 20 0" stroke="rgba(255,255,255,.55)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 17.5c2.2 7.8 17.8 7.8 20 0" stroke="rgba(255,255,255,.34)" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="13.5" stroke="rgba(255,255,255,.42)" strokeWidth="1" />
      <text x="20" y="24.2" textAnchor="middle" fill="white" fontSize="12.6" fontWeight="900"
        fontFamily="Inter, Manrope, system-ui, sans-serif" letterSpacing="-.5">RY</text>
      <defs>
        <linearGradient id="logoBg" x1="3" y1="3" x2="37" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a"/>
          <stop offset="0.55" stopColor="#1e3a8a"/>
          <stop offset="1" stopColor="#f97316"/>
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
        {/* Logo */}
        <Link href="/" className={styles.brand} dir="ltr">
          <HexLogo size={28} />
          <span className={styles.wordmark} dir="ltr">
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </span>
        </Link>

        {/* Right: search + lang only */}
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
