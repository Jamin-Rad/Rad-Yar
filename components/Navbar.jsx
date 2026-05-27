import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        <svg width="28" height="28" viewBox="0 0 54 54" fill="none">
          <circle cx="27" cy="27" r="26" stroke="url(#ng)" strokeWidth="1.8" opacity="0.5" />
          <circle cx="27" cy="27" r="18" stroke="url(#ng)" strokeWidth="1.5" opacity="0.75" />
          <line x1="27" y1="11" x2="27" y2="43" stroke="url(#ng)" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="11" y1="27" x2="43" y2="27" stroke="url(#ng)" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="27" cy="27" r="4.5" fill="url(#ng)" opacity="0.95" />
          <defs>
            <linearGradient id="ng" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <span>
          <span className={styles.rad}>Rad</span>
          <span className={styles.yar}>Yar</span>
        </span>
      </Link>

      <div className={styles.right}>
        <span className={styles.lang}>🇩🇪 Deutsch</span>
        <Link href="#fachgebiete" className={styles.ctaSmall}>
          Starten
        </Link>
      </div>
    </nav>
  )
}
