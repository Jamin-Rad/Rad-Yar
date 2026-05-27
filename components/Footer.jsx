'use client'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Footer.module.css'

export default function Footer() {
  const { texts } = useLanguage()
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.r}>RAD</span><span className={styles.y}>YAR</span>
      </div>
      <div className={styles.copy}>{texts.footerCopy}</div>
    </footer>
  )
}
