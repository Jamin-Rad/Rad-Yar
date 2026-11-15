import SubjectHeader from '../../SubjectHeader'
import styles from '../../learning.module.css'

export const metadata = { title: 'Deutsch · Mobin' }

export default function DeutschPage() {
  return (
    <main className={styles.shell} lang="de">
      <div className={styles.subjectWrap}>
        <SubjectHeader title="Deutsch" />
        <section className={styles.panel} aria-labelledby="deutsch-pruefung">
          <h2 id="deutsch-pruefung">Prüfungsvorbereitung</h2>
          <p><time dateTime="2026-11-20">20. November 2026</time></p>
          <p>Die Prüfungsthemen und Übungen werden ergänzt, sobald der Lernstoff vorliegt.</p>
        </section>
      </div>
    </main>
  )
}
