import Link from 'next/link'
import styles from '../mobin.module.css'

const sentenceParts = [
  {
    title: 'Prädikat',
    text: 'Was tut jemand? Was geschieht? Das Prädikat ist meistens das Verb.',
  },
  {
    title: 'Subjekt',
    text: 'Wer oder was tut etwas? Frage mit: Wer oder was?',
  },
  {
    title: 'Objekt',
    text: 'Wen oder was? Wem? Wessen? Objekte ergänzen den Satz.',
  },
  {
    title: 'Adverbiale',
    text: 'Wann, wo, wie oder warum passiert etwas?',
  },
]

const exercises = [
  {
    sentence: 'Mobin liest am Abend ein spannendes Buch.',
    answer: 'Subjekt: Mobin | Prädikat: liest | Zeit: am Abend | Objekt: ein spannendes Buch',
  },
  {
    sentence: 'Der kleine Stern leuchtet über dem Garten.',
    answer: 'Subjekt: Der kleine Stern | Prädikat: leuchtet | Ort: über dem Garten',
  },
  {
    sentence: 'Morgen schreibt die Klasse eine Deutsch-Klassenarbeit.',
    answer: 'Zeit: Morgen | Prädikat: schreibt | Subjekt: die Klasse | Objekt: eine Deutsch-Klassenarbeit',
  },
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
              <span className={styles.brandSub}>Prüfung</span>
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
            <h1 className={styles.sectionTitle}>Prüfungsvorbereitung</h1>
            <p className={styles.sectionText}>
              Deutsch Klasse 5: Vorbereitung auf die Klassenarbeit. Erstes Thema:
              Satzglieder erkennen, fragen und im Satz markieren.
            </p>

            <div className={styles.prepGrid}>
              {sentenceParts.map((part) => (
                <article className={styles.prepItem} key={part.title}>
                  <h2>{part.title}</h2>
                  <p>{part.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.wideCard}>
            <h2 className={styles.sectionTitle}>Üben</h2>
            <p className={styles.sectionText}>
              Frage zuerst nach dem Prädikat, dann nach Subjekt, Objekt und den
              adverbialen Bestimmungen.
            </p>
            <div className={styles.exerciseList}>
              {exercises.map((exercise) => (
                <article className={styles.exercise} key={exercise.sentence}>
                  {exercise.sentence}
                  <span className={styles.answer}>{exercise.answer}</span>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.wideCard}>
            <h2 className={styles.sectionTitle}>Lernplan</h2>
            <div className={styles.prepGrid}>
              <article className={styles.prepItem}>
                <h3>Tag 1</h3>
                <p>Prädikat und Subjekt finden. Jeden Satz mit Fragen prüfen.</p>
              </article>
              <article className={styles.prepItem}>
                <h3>Tag 2</h3>
                <p>Objekte und adverbiale Bestimmungen unterscheiden.</p>
              </article>
              <article className={styles.prepItem}>
                <h3>Tag 3</h3>
                <p>Gemischte Übungssätze markieren und laut erklären.</p>
              </article>
              <article className={styles.prepItem}>
                <h3>Tag 4</h3>
                <p>Kleine Probe-Klassenarbeit mit Ruhe und sauberer Schrift.</p>
              </article>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>Zurück zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
