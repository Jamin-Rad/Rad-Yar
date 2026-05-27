import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.r}>Rad</span>
        <span className={styles.y}>Yar</span>
      </div>
      <div className={styles.copy}>© 2025 RadYar · Your Guide in Radiology Education</div>
    </footer>
  )
}
