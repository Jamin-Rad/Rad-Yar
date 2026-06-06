'use client'
import Link from 'next/link'
import { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

function HexLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="url(#radyarNavLogoBg)" />
      <path d="M13.8 8.6A20.2 20.2 0 0 1 39 13.3" stroke="url(#radyarNavLogoArc)" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M39.8 13.9A20.1 20.1 0 0 1 40.2 33.6" stroke="#f97316" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M34.8 41.4A20.2 20.2 0 0 1 8.2 14.7" stroke="rgba(255,255,255,.82)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="39.8" cy="14" r="3.2" fill="#ff8a1d" />
      <circle cx="39.8" cy="14" r="6.4" fill="url(#radyarNavLogoGlow)" />
      <text x="17.1" y="31.8" fill="#ffffff" fontSize="24" fontWeight="900"
        fontFamily="Inter, Manrope, system-ui, sans-serif" letterSpacing="-.9">R</text>
      <text x="27.1" y="32.2" fill="#f97316" fontSize="23" fontWeight="900"
        fontFamily="Inter, Manrope, system-ui, sans-serif" letterSpacing="-.8">Y</text>
      <defs>
        <radialGradient id="radyarNavLogoBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12) rotate(50) scale(38)">
          <stop stopColor="#102a44"/>
          <stop offset="0.62" stopColor="#071a2f"/>
          <stop offset="1" stopColor="#020617"/>
        </radialGradient>
        <linearGradient id="radyarNavLogoArc" x1="11" y1="8" x2="42" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff"/>
          <stop offset="1" stopColor="#f97316"/>
        </linearGradient>
        <radialGradient id="radyarNavLogoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.8 14) scale(8)">
          <stop stopColor="#ffedd5" stopOpacity=".95"/>
          <stop offset=".45" stopColor="#f97316" stopOpacity=".45"/>
          <stop offset="1" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const { lang, texts, setLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [search, setSearch] = useState(false)

  const themeLabel = theme === 'dark'
    ? (lang === 'fa' ? 'تم روشن' : lang === 'en' ? 'Light theme' : 'Helles Theme')
    : (lang === 'fa' ? 'تم تاریک' : lang === 'en' ? 'Dark theme' : 'Dunkles Theme')

  const signInLabel = lang === 'fa' ? 'ورود' : lang === 'en' ? 'Sign in' : 'Anmelden'

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

        {/* Right side */}
        <div className={styles.right}>

          {/* Theme toggle */}
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>

          {/* Search */}
          <button
            className={styles.iconBtn}
            onClick={() => setSearch(true)}
            aria-label={texts?.searchPlaceholder ?? 'Suchen'}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Language toggle */}
          <div className={styles.langToggle} dir="ltr">
            <button className={`${styles.langBtn} ${lang==='de'?styles.langOn:''}`} onClick={() => setLang('de')}>DE</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='en'?styles.langOn:''}`} onClick={() => setLang('en')}>EN</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='fa'?styles.langOn:''}`} onClick={() => setLang('fa')}>FA</button>
          </div>

          {/* ── AUTH ─────────────────────────────────── */}
          {/* Nicht angemeldet: Anmelden-Button */}
          <SignedOut>
            
              <Link href="/sign-in" className={styles.signInBtn}>
                
              </button>
            
          </SignedOut>

          {/* Angemeldet: Clerk User-Button (Avatar + Dropdown) */}
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: { width: 30, height: 30 },
                },
              }}
            />
          </SignedIn>

        </div>
      </nav>
      {search && <SearchBar onClose={() => setSearch(false)} />}
    </>
  )
}
