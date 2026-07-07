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
  {
    question: 'In „Der Hund schläft im Körbchen“ ist „Der Hund“ ...',
    options: ['Subjekt', 'Objekt', 'Zeitangabe'],
    answer: 'Subjekt',
  },
  {
    question: 'In „Lisa malt ein Bild“ ist „malt“ ...',
    options: ['Prädikat', 'Subjekt', 'Ort'],
    answer: 'Prädikat',
  },
  {
    question: 'Welche Frage passt zur Ortsangabe?',
    options: ['Wo?', 'Wer?', 'Wen?'],
    answer: 'Wo?',
  },
  {
    question: 'Welche Frage passt zur Zeitangabe?',
    options: ['Wann?', 'Wer?', 'Was?'],
    answer: 'Wann?',
  },
  {
    question: 'In „Am Morgen fährt Ali zur Schule“ ist „Am Morgen“ ...',
    options: ['Zeitangabe', 'Subjekt', 'Prädikat'],
    answer: 'Zeitangabe',
  },
  {
    question: 'In „Die Kinder spielen im Garten“ ist „im Garten“ ...',
    options: ['Ortsangabe', 'Subjekt', 'Akkusativobjekt'],
    answer: 'Ortsangabe',
  },
  {
    question: 'Welche Frage findet ein Akkusativobjekt?',
    options: ['Wen oder was?', 'Wer oder was?', 'Wann?'],
    answer: 'Wen oder was?',
  },
  {
    question: 'Welche Frage findet ein Dativobjekt?',
    options: ['Wem?', 'Wen oder was?', 'Wo?'],
    answer: 'Wem?',
  },
  {
    question: 'In „Oma gibt dem Kind ein Geschenk“ ist „dem Kind“ ...',
    options: ['Dativobjekt', 'Subjekt', 'Prädikat'],
    answer: 'Dativobjekt',
  },
  {
    question: 'In „Oma gibt dem Kind ein Geschenk“ ist „ein Geschenk“ ...',
    options: ['Akkusativobjekt', 'Dativobjekt', 'Zeitangabe'],
    answer: 'Akkusativobjekt',
  },
  {
    question: 'Was ist in „Der Ball liegt unter dem Tisch“ das Prädikat?',
    options: ['liegt', 'Der Ball', 'unter dem Tisch'],
    answer: 'liegt',
  },
  {
    question: 'Was ist in „Der Ball liegt unter dem Tisch“ die Ortsangabe?',
    options: ['unter dem Tisch', 'Der Ball', 'liegt'],
    answer: 'unter dem Tisch',
  },
  {
    question: 'Welche Aussage stimmt?',
    options: ['Das Prädikat enthält ein Verb.', 'Das Subjekt ist immer ein Ort.', 'Ein Objekt ist immer eine Zeitangabe.'],
    answer: 'Das Prädikat enthält ein Verb.',
  },
  {
    question: 'In „Heute regnet es stark“ ist „Heute“ ...',
    options: ['Zeitangabe', 'Subjekt', 'Objekt'],
    answer: 'Zeitangabe',
  },
  {
    question: 'In „Heute regnet es stark“ ist „stark“ ...',
    options: ['Art-und-Weise-Angabe', 'Dativobjekt', 'Subjekt'],
    answer: 'Art-und-Weise-Angabe',
  },
  {
    question: 'Welche Frage passt zur Art und Weise?',
    options: ['Wie?', 'Wem?', 'Wer?'],
    answer: 'Wie?',
  },
  {
    question: 'In „Mila schreibt sorgfältig“ ist „sorgfältig“ ...',
    options: ['Art-und-Weise-Angabe', 'Akkusativobjekt', 'Subjekt'],
    answer: 'Art-und-Weise-Angabe',
  },
  {
    question: 'In „Der Lehrer erklärt die Aufgabe“ ist „die Aufgabe“ ...',
    options: ['Akkusativobjekt', 'Subjekt', 'Prädikat'],
    answer: 'Akkusativobjekt',
  },
  {
    question: 'In „Wir helfen unserem Freund“ ist „unserem Freund“ ...',
    options: ['Dativobjekt', 'Akkusativobjekt', 'Zeitangabe'],
    answer: 'Dativobjekt',
  },
  {
    question: 'Was fragt man nach dem Subjekt?',
    options: ['Wer oder was?', 'Wohin?', 'Wie lange?'],
    answer: 'Wer oder was?',
  },
  {
    question: 'Was fragt man nach dem Prädikat?',
    options: ['Was tut jemand? Was geschieht?', 'Wem?', 'Woher?'],
    answer: 'Was tut jemand? Was geschieht?',
  },
  {
    question: 'In „Nach der Schule isst Mobin einen Apfel“ ist „Nach der Schule“ ...',
    options: ['Zeitangabe', 'Ortsangabe', 'Dativobjekt'],
    answer: 'Zeitangabe',
  },
  {
    question: 'In „Nach der Schule isst Mobin einen Apfel“ ist „einen Apfel“ ...',
    options: ['Akkusativobjekt', 'Subjekt', 'Zeitangabe'],
    answer: 'Akkusativobjekt',
  },
  {
    question: 'In „Im Park fährt Sara Fahrrad“ ist „Im Park“ ...',
    options: ['Ortsangabe', 'Prädikat', 'Subjekt'],
    answer: 'Ortsangabe',
  },
  {
    question: 'In „Im Park fährt Sara Fahrrad“ ist „Sara“ ...',
    options: ['Subjekt', 'Objekt', 'Art-und-Weise-Angabe'],
    answer: 'Subjekt',
  },
  {
    question: 'Welche Gruppe besteht nur aus Satzglied-Fragen?',
    options: ['Wer? Was tut? Wen? Wo?', 'der die das', 'Nomen Verb Adjektiv'],
    answer: 'Wer? Was tut? Wen? Wo?',
  },
  {
    question: 'In „Der Vogel singt laut“ ist „laut“ ...',
    options: ['Art-und-Weise-Angabe', 'Subjekt', 'Akkusativobjekt'],
    answer: 'Art-und-Weise-Angabe',
  },
  {
    question: 'In „Papa kauft Brot“ ist „Brot“ ...',
    options: ['Akkusativobjekt', 'Dativobjekt', 'Prädikat'],
    answer: 'Akkusativobjekt',
  },
  {
    question: 'In „Die Katze jagt die Maus“ ist „Die Katze“ ...',
    options: ['Subjekt', 'Objekt', 'Ort'],
    answer: 'Subjekt',
  },
  {
    question: 'In „Die Katze jagt die Maus“ ist „die Maus“ ...',
    options: ['Akkusativobjekt', 'Subjekt', 'Prädikat'],
    answer: 'Akkusativobjekt',
  },
]

const flashcards = [
  { front: 'Prädikat', back: 'Was tut jemand? Was geschieht?' },
  { front: 'Subjekt', back: 'Wer oder was tut etwas?' },
  { front: 'Objekt', back: 'Wen oder was? Wem? Wessen?' },
  { front: 'Adverbiale', back: 'Wann, wo, wie oder warum?' },
  { front: 'Akkusativobjekt', back: 'Frage: Wen oder was?' },
  { front: 'Dativobjekt', back: 'Frage: Wem?' },
  { front: 'Zeitangabe', back: 'Frage: Wann? Seit wann? Wie lange?' },
  { front: 'Ortsangabe', back: 'Frage: Wo? Wohin? Woher?' },
  { front: 'Art und Weise', back: 'Frage: Wie?' },
  { front: 'Grund', back: 'Frage: Warum? Weshalb?' },
  { front: 'Satzgliedprobe', back: 'Ein Satzglied kann man als Block verschieben.' },
  { front: 'Verb finden', back: 'Suche zuerst das Prädikat.' },
  { front: 'Subjekt finden', back: 'Frage nach dem Prädikat: Wer oder was?' },
  { front: 'Objekt finden', back: 'Frage: Wen oder was? Wem? Wessen?' },
  { front: 'Adverbiale finden', back: 'Frage nach Zeit, Ort, Art/Weise oder Grund.' },
  { front: 'Beispiel Subjekt', back: '„Der Hund schläft.“ Subjekt: Der Hund.' },
  { front: 'Beispiel Prädikat', back: '„Lisa malt.“ Prädikat: malt.' },
  { front: 'Beispiel Akkusativ', back: '„Ich lese ein Buch.“ Objekt: ein Buch.' },
  { front: 'Beispiel Dativ', back: '„Ich helfe dem Kind.“ Dativobjekt: dem Kind.' },
  { front: 'Beispiel Ort', back: '„Wir spielen im Garten.“ Ort: im Garten.' },
  { front: 'Beispiel Zeit', back: '„Morgen schreiben wir.“ Zeit: Morgen.' },
  { front: 'Beispiel Wie?', back: '„Er arbeitet genau.“ Wie? genau.' },
  { front: 'Prädikat zweiteilig', back: '„Ich habe gelernt.“ Prädikat: habe gelernt.' },
  { front: 'Modalverb', back: '„Ich muss üben.“ Prädikat: muss üben.' },
  { front: 'Satzklammer', back: 'Bei zweiteiligem Prädikat steht ein Teil oft am Satzende.' },
  { front: 'Kein Satzglied', back: 'Ein einzelner Artikel allein ist normalerweise kein Satzglied.' },
  { front: 'Umstellprobe', back: '„Am Abend liest Mobin.“ Zeitangabe steht vorne.' },
  { front: 'Frageprobe', back: 'Mit Fragen findest du die Funktion im Satz.' },
  { front: 'Merksatz', back: 'Prädikat zuerst, dann Subjekt, dann Ergänzungen.' },
  { front: 'Klassenarbeit-Tipp', back: 'Unterstreiche Prädikat rot, Subjekt blau, Objekte grün.' },
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
