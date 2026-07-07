import Link from 'next/link'
import styles from '../mobin.module.css'

const mcqs = [
  {
    question: 'Welches Satzglied ist das Prädikat?',
    options: ['das Verb im Satz', 'der Ort', 'eine Person'],
    answer: 'das Verb im Satz',
  },
  {
    question: 'Mit welcher Frage findest du das Subjekt?',
    options: ['Wer oder was?', 'Wann?', 'Wem?'],
    answer: 'Wer oder was?',
  },
  {
    question: 'In „Mobin liest ein Buch“ ist „ein Buch“ ...',
    options: ['Objekt', 'Subjekt', 'Prädikat'],
    answer: 'Objekt',
  },
]

const flashcards = [
  { front: 'Prädikat', back: 'Was tut jemand? Was geschieht?' },
  { front: 'Subjekt', back: 'Wer oder was tut etwas?' },
  { front: 'Objekt', back: 'Wen oder was? Wem? Wessen?' },
  { front: 'Adverbiale', back: 'Wann, wo, wie oder warum?' },
]

export const metadata = {
  title: 'Mobin | Prüfungsvorbereitung',
}

export default function PruefungsvorbereitungPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Deutsch</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Mobin Navigation">
            <Link className={styles.glassButton} href="/mobin/routine" style={{ '--tilt': '-1.2deg', '--speed': '7.5s' }}>
              <span className={styles.buttonTitle}>Routine</span>
              <span className={styles.buttonMeta}>Üben</span>
            </Link>
            <Link className={styles.glassButton} href="/mobin/tagebuch" style={{ '--tilt': '1.1deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Tagebuch</span>
              <span className={styles.buttonMeta}>Notizen</span>
            </Link>
          </nav>
        </header>

        <section className={styles.main}>
          <div className={styles.wideCard}>
            <h1 className={styles.sectionTitle}>Deutsch üben</h1>
            <p className={styles.sectionText}>
              Klasse 5, Thema Satzglieder. Kurz lernen, dann MCQs und Flashcards.
            </p>
          </div>

          <div className={styles.prepGrid}>
            <section className={styles.prepItem}>
              <h2>Lernen</h2>
              <p>
                Satzglieder sind Bausteine im Satz. Zuerst suchst du das Prädikat,
                dann fragst du nach Subjekt, Objekt und adverbialen Bestimmungen.
              </p>
            </section>

            <section className={styles.prepItem}>
              <h2>Mini-Beispiel</h2>
              <p>
                Mobin liest am Abend ein Buch. Prädikat: liest. Subjekt: Mobin.
                Zeit: am Abend. Objekt: ein Buch.
              </p>
            </section>
          </div>

          <div className={styles.wideCard}>
            <h2 className={styles.sectionTitle}>MCQs</h2>
            <div className={styles.quizList}>
              {mcqs.map((mcq) => (
                <article className={styles.quizItem} key={mcq.question}>
                  <h3>{mcq.question}</h3>
                  <div className={styles.optionGrid}>
                    {mcq.options.map((option) => (
                      <span className={option === mcq.answer ? styles.correctOption : styles.option} key={option}>
                        {option}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.wideCard}>
            <h2 className={styles.sectionTitle}>Flashcards</h2>
            <div className={styles.flashGrid}>
              {flashcards.map((card) => (
                <article className={styles.flashCard} key={card.front}>
                  <strong>{card.front}</strong>
                  <span>{card.back}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>Zurück zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
