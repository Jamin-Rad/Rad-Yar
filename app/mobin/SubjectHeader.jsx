import Link from 'next/link'
import styles from './learning.module.css'

export default function SubjectHeader({ title, mark, flag, rtl = false }) {
  return <>
    <Link className={styles.subjectBack} href="/mobin?bereich=1">← Mobin</Link>
    <header className={styles.subjectHero}>
      <h1>{title}</h1>
      {flag ? <img className={styles.subjectFlag} src={flag} alt="" />
        : mark && <span className={styles.subjectMark} dir={rtl ? 'rtl' : undefined} aria-hidden="true">{mark}</span>}
    </header>
  </>
}
