'use client'
import Link from 'next/link'
import RadYarIcon from './RadYarIcon'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import SearchBar from './SearchBar'
import ClerkNavActions from './ClerkNavActions'
import styles from './Navbar.module.css'

function HexLogo({ size = 32 }) {
  return <RadYarIcon size={size} />
}

function getGreeting(lang) {
  const h = new Date().getHours()
  if (lang === 'fa') {
    if (h >= 5 && h < 12) return 'صبح بخیر'
    if (h >= 12 && h < 18) return 'روز بخیر'
    return 'شب بخیر'
  }
  if (lang === 'en') {
    if (h >= 5 && h < 12) return 'Good morning'
    if (h >= 12 && h < 18) return 'Good afternoon'
    return 'Good evening'
  }
  if (h >= 5 && h < 12) return 'Guten Morgen'
  if (h >= 12 && h < 18) return 'Guten Tag'
  return 'Guten Abend'
}

export default function Navbar() {
  const { lang, texts, setLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [search, setSearch] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const signInLabel = lang === 'fa' ? 'ورود' : lang === 'en' ? 'Sign in' : 'Anmelden'

  const themeLabel = theme === 'dark'
    ? (lang === 'fa' ? 'تم روشن' : lang === 'en' ? 'Light theme' : 'Helles Theme')
    : (lang === 'fa' ? 'تم تاریک' : lang === 'en' ? 'Dark theme' : 'Dunkles Theme')


  return (
    <>
      <nav className={styles.nav}>
        {isHome ? <div /> : (
          <Link href="/" className={styles.brand} dir="ltr">
            <HexLogo size={28} />
            <span className={styles.wordmark} dir="ltr">
              <span className={styles.rad}>RAD</span>
              <span className={styles.yar}>YAR</span>
            </span>
          </Link>
        )}

        <div className={styles.right} data-lang={lang}>
          <div className={styles.authSlot}>
            {!authReady && <Link href="/sign-in" className={styles.signInBtn}>{signInLabel}</Link>}
            <ClerkNavActions lang={lang} onReady={() => setAuthReady(true)} />
          </div>

          <div className={styles.langToggle} dir="ltr">
            <button className={`${styles.langBtn} ${lang==='de'?styles.langOn:''}`} onClick={() => setLang('de')}>DE</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='en'?styles.langOn:''}`} onClick={() => setLang('en')}>EN</button>
            <span className={styles.langSep}>·</span>
            <button className={`${styles.langBtn} ${lang==='fa'?styles.langOn:''}`} onClick={() => setLang('fa')}>FA</button>
          </div>

          <button type="button" className={styles.themeBtn}
            onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>

          <button className={styles.iconBtn} onClick={() => setSearch(true)}
            aria-label={texts?.searchPlaceholder ?? 'Suchen'}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
      {search && <SearchBar onClose={() => setSearch(false)} />}
    </>
  )
}
