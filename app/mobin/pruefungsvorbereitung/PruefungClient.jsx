'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from '../mobin.module.css'

const STORAGE_KEY = 'mobin-pruefung-progress-v2'

const subjects = [
  { id: 'deutsch', title: 'Deutsch', meta: 'Klasse 5 Gymnasium', active: true },
  { id: 'englisch', title: 'Englisch', meta: 'kommt als Nächstes', active: false },
  { id: 'biologie', title: 'Biologie', meta: 'kommt als Nächstes', active: false },
  { id: 'geographie', title: 'Geographie', meta: 'kommt als Nächstes', active: false },
]

const topics = [
  {
    id: 'satzglieder',
    title: 'Satzglieder erkennen',
    meta: 'Umstellprobe, Frageprobe, Funktion im Satz',
    learn: [
      'Satzglieder sind Bausteine des Satzes. Sie können meist als ganzer Block verschoben werden.',
      'Suche zuerst das Prädikat. Danach fragst du nach Subjekt, Objekt und adverbialen Bestimmungen.',
      'Die wichtigsten Proben sind die Umstellprobe und die Frageprobe: Wer? Was tut? Wen oder was? Wann? Wo? Wie? Warum?',
    ],
    mcqs: [
      {
        question: 'Welche Probe hilft besonders gut, Satzglieder als Block zu erkennen?',
        options: ['Umstellprobe', 'Silbenprobe', 'Reimprobe', 'Großschreibprobe'],
        answer: 'Umstellprobe',
        help: 'Wenn ein Ausdruck zusammen verschoben werden kann, ist er oft ein Satzglied.',
      },
      {
        question: 'In „Am Abend liest Mobin ein Buch“ ist „Am Abend“ ...',
        options: ['eine Zeitangabe', 'das Subjekt', 'das Prädikat', 'ein Akkusativobjekt'],
        answer: 'eine Zeitangabe',
        help: 'Frage: Wann liest Mobin ein Buch?',
      },
      {
        question: 'Welche Reihenfolge ist beim Bestimmen von Satzgliedern sinnvoll?',
        options: ['Prädikat, Subjekt, Ergänzungen', 'Artikel, Nomen, Silben', 'Komma, Punkt, Fragezeichen', 'Erstes Wort, letztes Wort, Mitte'],
        answer: 'Prädikat, Subjekt, Ergänzungen',
        help: 'Das Prädikat zeigt, was geschieht. Von dort aus fragst du weiter.',
      },
      {
        question: 'Was ist in „Im Park fährt Sara Fahrrad“ ein Satzglied?',
        options: ['Im Park', 'im', 'Park fährt', 'fährt Sara Fahrrad im'],
        answer: 'Im Park',
        help: '„Im Park“ kann als Block nach vorne oder hinten verschoben werden.',
      },
      {
        question: 'Welche Gruppe enthält nur typische Satzglied-Fragen?',
        options: ['Wer? Was tut? Wen? Wo?', 'der, die, das, ein', 'hell, heller, am hellsten', 'Punkt, Komma, Doppelpunkt'],
        answer: 'Wer? Was tut? Wen? Wo?',
        help: 'Mit diesen Fragen findest du Funktionen im Satz.',
      },
    ],
    flashcards: [
      { front: 'Satzglied', back: 'Ein Baustein des Satzes, der meist als Block verschoben werden kann.' },
      { front: 'Umstellprobe', back: 'Verschiebe Satzteile. Was zusammenbleibt, ist oft ein Satzglied.' },
      { front: 'Frageprobe', back: 'Frage nach der Funktion: Wer? Wen? Wann? Wo? Wie? Warum?' },
      { front: 'Start beim Bestimmen', back: 'Suche zuerst das Prädikat, dann Subjekt und Ergänzungen.' },
      { front: 'Beispiel', back: '„Morgen spielt Leo Tennis.“ Morgen = Zeitangabe.' },
    ],
  },
  {
    id: 'praedikat',
    title: 'Prädikat',
    meta: 'Verb, Personalform, zweiteiliges Prädikat',
    learn: [
      'Das Prädikat sagt, was jemand tut oder was geschieht. Es enthält immer eine Verbform.',
      'Ein Prädikat kann einteilig sein: „Mobin liest.“ Es kann auch zweiteilig sein: „Mobin hat gelesen.“',
      'Bei zweiteiligen Prädikaten entsteht oft eine Satzklammer: Ein Teil steht vorne, der andere am Satzende.',
    ],
    mcqs: [
      {
        question: 'Was ist das Prädikat in „Der Ball liegt unter dem Tisch“?',
        options: ['liegt', 'Der Ball', 'unter dem Tisch', 'Tisch'],
        answer: 'liegt',
        help: 'Frage: Was geschieht mit dem Ball?',
      },
      {
        question: 'Welches Prädikat ist zweiteilig?',
        options: ['hat gelernt', 'rennt', 'lacht', 'schläft'],
        answer: 'hat gelernt',
        help: 'Zweiteilige Prädikate bestehen aus zwei Verbteilen.',
      },
      {
        question: 'In „Wir können Fußball spielen gehen“ ist das Prädikat ...',
        options: ['können spielen gehen', 'Wir', 'Fußball', 'gehen'],
        answer: 'können spielen gehen',
        help: 'Alle Verbteile gehören zum Prädikat.',
      },
      {
        question: 'Welche Frage passt zum Prädikat?',
        options: ['Was tut jemand? Was geschieht?', 'Wer oder was?', 'Wen oder was?', 'Wann?'],
        answer: 'Was tut jemand? Was geschieht?',
        help: 'Das Prädikat ist der Handlungskern des Satzes.',
      },
      {
        question: 'In „Hast du den Ball abgespielt?“ steht die Personalform ...',
        options: ['an erster Stelle', 'am Satzende', 'nie im Satz', 'nach dem Objekt'],
        answer: 'an erster Stelle',
        help: 'Ja-/Nein-Fragen sind häufig Verberstsätze.',
      },
    ],
    flashcards: [
      { front: 'Prädikat', back: 'Der Verbteil des Satzes: Was tut jemand? Was geschieht?' },
      { front: 'Personalform', back: 'Die gebeugte Verbform, z. B. ich lese, du liest, er liest.' },
      { front: 'Einteiliges Prädikat', back: '„Sara malt.“ Prädikat: malt.' },
      { front: 'Zweiteiliges Prädikat', back: '„Sara hat gemalt.“ Prädikat: hat gemalt.' },
      { front: 'Satzklammer', back: 'Bei zweiteiligem Prädikat steht ein Verbteil oft am Satzende.' },
    ],
  },
  {
    id: 'subjekt',
    title: 'Subjekt',
    meta: 'Wer oder was?',
    learn: [
      'Das Subjekt nennt, wer oder was etwas tut oder wer/was in einem Zustand ist.',
      'Du findest es mit der Frage „Wer oder was?“ zusammen mit dem Prädikat.',
      'Das Subjekt steht im Nominativ und passt in Person und Zahl zum Prädikat.',
    ],
    mcqs: [
      {
        question: 'Mit welcher Frage findest du das Subjekt?',
        options: ['Wer oder was?', 'Wen oder was?', 'Wann?', 'Wie?'],
        answer: 'Wer oder was?',
        help: 'Frage immer mit dem Prädikat: Wer oder was spielt?',
      },
      {
        question: 'In „Die Kinder spielen im Garten“ ist das Subjekt ...',
        options: ['Die Kinder', 'spielen', 'im Garten', 'Garten'],
        answer: 'Die Kinder',
        help: 'Wer spielt im Garten?',
      },
      {
        question: 'In „Heute regnet es stark“ ist das Subjekt ...',
        options: ['es', 'Heute', 'regnet', 'stark'],
        answer: 'es',
        help: 'Wer oder was regnet? Es regnet.',
      },
      {
        question: 'Welche Aussage stimmt?',
        options: ['Das Subjekt steht im Nominativ.', 'Das Subjekt ist immer eine Zeitangabe.', 'Das Subjekt steht immer am Satzanfang.', 'Das Subjekt ist immer ein einzelnes Wort.'],
        answer: 'Das Subjekt steht im Nominativ.',
        help: 'Das Subjekt kann vorne, in der Mitte oder selten hinten stehen.',
      },
      {
        question: 'In „Nach der Schule isst Mobin einen Apfel“ ist das Subjekt ...',
        options: ['Mobin', 'Nach der Schule', 'isst', 'einen Apfel'],
        answer: 'Mobin',
        help: 'Wer isst einen Apfel?',
      },
    ],
    flashcards: [
      { front: 'Subjekt-Frage', back: 'Wer oder was tut etwas?' },
      { front: 'Kasus', back: 'Das Subjekt steht im Nominativ.' },
      { front: 'Beispiel', back: '„Der Hund schläft.“ Subjekt: Der Hund.' },
      { front: 'Nicht immer vorne', back: '„Heute spielt Mobin.“ Subjekt: Mobin.' },
      { front: 'Zusammenhang', back: 'Subjekt und Prädikat passen zusammen: ich gehe, wir gehen.' },
    ],
  },
  {
    id: 'akkusativ',
    title: 'Akkusativ',
    meta: 'Wen oder was?',
    learn: [
      'Das Akkusativobjekt ergänzt viele Verben. Du fragst danach mit „Wen oder was?“',
      'Typische Verben mit Akkusativ sind sehen, lesen, kaufen, malen, essen, suchen.',
      'Achte auf die Artikel: der wird im Akkusativ oft zu den, ein zu einen.',
    ],
    mcqs: [
      {
        question: 'Welche Frage findet ein Akkusativobjekt?',
        options: ['Wen oder was?', 'Wer oder was?', 'Wem?', 'Wo?'],
        answer: 'Wen oder was?',
        help: 'Diese Frage ist der schnellste Weg zum Akkusativobjekt.',
      },
      {
        question: 'In „Der Lehrer erklärt die Aufgabe“ ist das Akkusativobjekt ...',
        options: ['die Aufgabe', 'Der Lehrer', 'erklärt', 'Lehrer'],
        answer: 'die Aufgabe',
        help: 'Wen oder was erklärt der Lehrer?',
      },
      {
        question: 'Welche Form ist richtig?',
        options: ['Ich sehe den Hund.', 'Ich sehe der Hund.', 'Ich sehe dem Hund.', 'Ich sehe des Hund.'],
        answer: 'Ich sehe den Hund.',
        help: '„der Hund“ wird im Akkusativ zu „den Hund“.',
      },
      {
        question: 'In „Oma gibt dem Kind ein Geschenk“ ist „ein Geschenk“ ...',
        options: ['Akkusativobjekt', 'Subjekt', 'Dativobjekt', 'Zeitangabe'],
        answer: 'Akkusativobjekt',
        help: 'Wen oder was gibt Oma?',
      },
      {
        question: 'In „Die Katze jagt die Maus“ ist „die Maus“ ...',
        options: ['Akkusativobjekt', 'Subjekt', 'Prädikat', 'Ortsangabe'],
        answer: 'Akkusativobjekt',
        help: 'Wen oder was jagt die Katze?',
      },
    ],
    flashcards: [
      { front: 'Akkusativ-Frage', back: 'Wen oder was?' },
      { front: 'Beispiel', back: '„Ich lese ein Buch.“ Akkusativobjekt: ein Buch.' },
      { front: 'Artikelwechsel', back: 'der Hund -> den Hund, ein Hund -> einen Hund.' },
      { front: 'Typische Verben', back: 'sehen, kaufen, essen, suchen, lesen, malen.' },
      { front: 'Abgrenzung', back: 'Subjekt: Wer? Akkusativobjekt: Wen oder was?' },
    ],
  },
  {
    id: 'adverbiale',
    title: 'Adverbiale Bestimmungen',
    meta: 'Zeit, Ort, Art und Weise, Grund',
    learn: [
      'Adverbiale Bestimmungen geben genauere Umstände an: Zeit, Ort, Art und Weise oder Grund.',
      'Typische Fragen sind: Wann? Wo? Wohin? Wie? Warum? Weshalb?',
      'Sie sind oft verschiebbar: „Am Morgen fährt Ali zur Schule“ und „Ali fährt am Morgen zur Schule“.',
    ],
    mcqs: [
      {
        question: 'Welche Frage passt zur Zeitangabe?',
        options: ['Wann?', 'Wer?', 'Wen?', 'Wie?'],
        answer: 'Wann?',
        help: 'Zeitangaben antworten auf Wann? Seit wann? Wie lange?',
      },
      {
        question: 'In „Die Kinder spielen im Garten“ ist „im Garten“ ...',
        options: ['Ortsangabe', 'Subjekt', 'Prädikat', 'Akkusativobjekt'],
        answer: 'Ortsangabe',
        help: 'Frage: Wo spielen die Kinder?',
      },
      {
        question: 'In „Mila schreibt sorgfältig“ ist „sorgfältig“ ...',
        options: ['Art-und-Weise-Angabe', 'Zeitangabe', 'Subjekt', 'Akkusativobjekt'],
        answer: 'Art-und-Weise-Angabe',
        help: 'Frage: Wie schreibt Mila?',
      },
      {
        question: 'Welche Frage passt zur Grundangabe?',
        options: ['Warum?', 'Wem?', 'Wer?', 'Wen?'],
        answer: 'Warum?',
        help: 'Grundangaben erklären den Grund oder die Ursache.',
      },
      {
        question: 'In „Wegen des Regens bleiben wir drinnen“ ist „Wegen des Regens“ ...',
        options: ['Grundangabe', 'Prädikat', 'Subjekt', 'Akkusativobjekt'],
        answer: 'Grundangabe',
        help: 'Frage: Warum bleiben wir drinnen?',
      },
    ],
    flashcards: [
      { front: 'Temporal', back: 'Zeit: Wann? Seit wann? Wie lange?' },
      { front: 'Lokal', back: 'Ort: Wo? Wohin? Woher?' },
      { front: 'Modal', back: 'Art und Weise: Wie?' },
      { front: 'Kausal', back: 'Grund: Warum? Weshalb?' },
      { front: 'Beispiel', back: '„Am Morgen fährt Ali zur Schule.“ Am Morgen = Zeitangabe.' },
    ],
  },
  {
    id: 'satzreihe-satzgefuege',
    title: 'Satzreihe / Satzgefüge + Satzbaupläne zeichnen',
    meta: 'Hauptsatz, Nebensatz, Komma, Verbstellung',
    learn: [
      'Eine Satzreihe besteht aus Hauptsatz + Hauptsatz. Die Hauptsätze werden oft durch Komma oder nebenordnende Konjunktionen verbunden: und, oder, aber, sondern, denn, doch.',
      'Ein Satzgefüge besteht aus Hauptsatz + Nebensatz. Hauptsatz und Nebensatz werden immer durch Komma getrennt.',
      'Nebensätze werden oft durch unterordnende Konjunktionen eingeleitet: weil, da, obwohl, damit, dass, sodass, nachdem, während.',
      'Im Nebensatz steht die Personalform des Verbs am Ende: „weil die Sonne scheint“. Deshalb nennt man ihn Verbletztsatz.',
      'Satzbaupläne kannst du so zeichnen: HS + NS, NS + HS oder HS Teil 1 + NS + HS Teil 2.',
      'Satzarten helfen beim Satzbau: Aussagesatz mit Punkt, Fragesatz mit Fragezeichen, Aufforderungssatz meist mit Ausrufezeichen.',
    ],
    mcqs: [
      {
        question: 'Was ist eine Satzreihe?',
        options: ['Hauptsatz + Hauptsatz', 'Hauptsatz + Nebensatz', 'Nur ein Nebensatz', 'Nur ein Satzglied'],
        answer: 'Hauptsatz + Hauptsatz',
        help: 'Eine Satzreihe verknüpft mindestens zwei Hauptsätze.',
      },
      {
        question: 'Was ist ein Satzgefüge?',
        options: ['Hauptsatz + Nebensatz', 'Subjekt + Prädikat', 'Akkusativ + Dativ', 'Frage + Antwort'],
        answer: 'Hauptsatz + Nebensatz',
        help: 'Ein Satzgefüge enthält mindestens einen Hauptsatz und einen Nebensatz.',
      },
      {
        question: 'Welche Konjunktion leitet typischerweise einen Nebensatz ein?',
        options: ['weil', 'und', 'oder', 'aber'],
        answer: 'weil',
        help: '„weil“ ist eine unterordnende Konjunktion. Danach steht das gebeugte Verb am Ende.',
      },
      {
        question: 'Welche Verbstellung ist im Nebensatz richtig?',
        options: ['..., weil die Sonne scheint.', '..., weil scheint die Sonne.', '..., weil die Sonne scheint heute.', '..., weil scheint heute die Sonne.'],
        answer: '..., weil die Sonne scheint.',
        help: 'Im Nebensatz steht die Personalform am Ende.',
      },
      {
        question: 'Welcher Satzbauplan passt zu „Wir trainieren heute, weil die Sonne scheint, im Freien“?',
        options: ['HS Teil 1 + NS + HS Teil 2', 'NS + NS', 'HS + HS ohne Komma', 'Nur Prädikat'],
        answer: 'HS Teil 1 + NS + HS Teil 2',
        help: 'Der Nebensatz ist in den Hauptsatz eingeschoben.',
      },
      {
        question: 'Welches Satzschlusszeichen passt zu „Sollen wir Fußball spielen gehen“?',
        options: ['?', '.', ',', ':'],
        answer: '?',
        help: 'Das ist ein Fragesatz.',
      },
    ],
    flashcards: [
      { front: 'Satzreihe', back: 'Hauptsatz + Hauptsatz, oft mit Komma oder und/oder/aber/denn/doch.' },
      { front: 'Satzgefüge', back: 'Hauptsatz + Nebensatz. Zwischen beiden steht ein Komma.' },
      { front: 'Nebensatz-Merkmal', back: 'Er kann nicht allein stehen und ist dem Hauptsatz untergeordnet.' },
      { front: 'Unterordnende Konjunktionen', back: 'weil, da, obwohl, damit, dass, sodass, nachdem, während.' },
      { front: 'Verbletztsatz', back: 'Im Nebensatz steht die Personalform des Verbs am Ende.' },
      { front: 'Satzbauplan', back: 'HS + NS, NS + HS oder HS Teil 1 + NS + HS Teil 2.' },
    ],
  },
]

function readProgress() {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}
  } catch {
    return {}
  }
}

function writeProgress(nextProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress))
  window.dispatchEvent(new Event('mobin-pruefung-progress'))
}

function calculateTopicProgress(topic, saved) {
  const mcqPercent = saved.mcqTotal ? saved.mcqCorrect / saved.mcqTotal : 0
  const flashPercent = saved.flashTotal ? saved.flashSeen / saved.flashTotal : 0
  const learnPercent = saved.learnDone ? 1 : 0
  return Math.round(((learnPercent + mcqPercent + flashPercent) / 3) * 100)
}

export { STORAGE_KEY, topics, calculateTopicProgress }

export default function PruefungClient() {
  const [progress, setProgress] = useState({})
  const [subjectModalOpen, setSubjectModalOpen] = useState(true)
  const [subject, setSubject] = useState(null)
  const [topicId, setTopicId] = useState(null)
  const [mode, setMode] = useState(null)

  useEffect(() => {
    setProgress(readProgress())
  }, [])

  const selectedTopic = useMemo(() => topics.find((topic) => topic.id === topicId) || null, [topicId])
  const selectedSubject = subjects.find((item) => item.id === subject)
  const overall = useMemo(() => {
    const sum = topics.reduce((total, topic) => total + calculateTopicProgress(topic, progress[topic.id] || {}), 0)
    return Math.round(sum / topics.length)
  }, [progress])

  function saveTopicProgress(id, patch) {
    const nextProgress = {
      ...progress,
      [id]: {
        ...(progress[id] || {}),
        ...patch,
        updatedAt: new Date().toISOString(),
      },
    }

    setProgress(nextProgress)
    writeProgress(nextProgress)
  }

  function chooseSubject(nextSubject) {
    if (!nextSubject.active) return

    setSubject(nextSubject.id)
    setSubjectModalOpen(false)
    setTopicId(null)
    setMode(null)
  }

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
            <button
              className={styles.glassButton}
              type="button"
              onClick={() => setSubjectModalOpen(true)}
              style={{ '--tilt': '-1.2deg', '--speed': '7.5s' }}
            >
              <span className={styles.buttonTitle}>{selectedSubject?.title || 'Fach wählen'}</span>
              <span className={styles.buttonMeta}>Popup öffnen</span>
            </button>
            <Link className={styles.glassButton} href="/mobin" style={{ '--tilt': '1.1deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Start</span>
              <span className={styles.buttonMeta}>Fortschritt ansehen</span>
            </Link>
          </nav>
        </header>

        <section className={styles.main}>
          <div className={styles.examHero}>
            <div>
              <span className={styles.eyebrow}>Klasse 5 Gymnasium</span>
              <h1 className={styles.sectionTitle}>Prüfungsvorbereitung</h1>
              <p className={styles.sectionText}>
                Wähle ein Fach, dann ein Thema und danach Lernbereich, MCQs oder Flashcards.
              </p>
            </div>
            <div className={styles.examScore}>
              <strong>{overall}%</strong>
              <span>Deutsch Fortschritt</span>
            </div>
          </div>

          {subject === 'deutsch' ? (
            <>
              <section className={styles.topicGrid} aria-label="Deutsch Themen">
                {topics.map((topic) => {
                  const saved = progress[topic.id] || {}
                  const percent = calculateTopicProgress(topic, saved)
                  return (
                    <button
                      className={`${styles.topicCard} ${topic.id === topicId ? styles.topicCardActive : ''}`}
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        setTopicId(topic.id)
                        setMode(null)
                      }}
                    >
                      <span>{topic.title}</span>
                      <small>{topic.meta}</small>
                      <i className={styles.progressTrack} aria-hidden="true">
                        <b style={{ width: `${percent}%` }} />
                      </i>
                      <em>{percent}% geschafft</em>
                    </button>
                  )
                })}
              </section>

              {selectedTopic ? (
                <section className={styles.practicePanel}>
                  <div className={styles.practiceHeader}>
                    <div>
                      <h2>{selectedTopic.title}</h2>
                      <p>{selectedTopic.meta}</p>
                    </div>
                    <span>{calculateTopicProgress(selectedTopic, progress[selectedTopic.id] || {})}%</span>
                  </div>

                  <div className={styles.modeGrid} aria-label="Übungsart wählen">
                    {[
                      { id: 'learn', title: 'Lernbereich', meta: 'kurz und klar' },
                      { id: 'mcq', title: 'MCQs', meta: `${selectedTopic.mcqs.length} Fragen` },
                      { id: 'flashcards', title: 'Flashcards', meta: `${selectedTopic.flashcards.length} Karten` },
                    ].map((item) => (
                      <button
                        className={`${styles.modeButton} ${mode === item.id ? styles.modeButtonActive : ''}`}
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                      >
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                      </button>
                    ))}
                  </div>

                  {mode === 'learn' ? (
                    <LearnMode
                      progress={progress[selectedTopic.id] || {}}
                      topic={selectedTopic}
                      onDone={() => saveTopicProgress(selectedTopic.id, { learnDone: true })}
                    />
                  ) : null}
                  {mode === 'mcq' ? (
                    <McqMode
                      topic={selectedTopic}
                      onComplete={(correct, total) => saveTopicProgress(selectedTopic.id, { mcqCorrect: correct, mcqTotal: total })}
                    />
                  ) : null}
                  {mode === 'flashcards' ? (
                    <FlashcardMode
                      topic={selectedTopic}
                      onProgress={(seen, total) => saveTopicProgress(selectedTopic.id, { flashSeen: seen, flashTotal: total })}
                    />
                  ) : null}
                </section>
              ) : (
                <section className={styles.practicePanel}>
                  <div className={styles.practiceHeader}>
                    <div>
                      <h2>Deutsch-Thema wählen</h2>
                      <p>Danach öffnest du Lernbereich, MCQs oder Flashcards.</p>
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className={styles.practicePanel}>
              <div className={styles.practiceHeader}>
                <div>
                  <h2>Bitte ein Fach wählen</h2>
                  <p>Deutsch ist jetzt fertig vorbereitet. Die anderen Fächer kommen später dazu.</p>
                </div>
              </div>
            </section>
          )}
        </section>

        <footer className={styles.footer}>
          Zurück zu <Link href="/mobin">Mobin</Link>
        </footer>
      </div>

      {subjectModalOpen ? (
        <div className={styles.subjectBackdrop} role="presentation">
          <div className={styles.subjectModal} role="dialog" aria-modal="true" aria-labelledby="subject-title">
            <div className={styles.subjectModalTop}>
              <div>
                <span className={styles.eyebrow}>Prüfungsfach</span>
                <h2 id="subject-title">Was möchtest du üben?</h2>
              </div>
              {subject ? (
                <button className={styles.closeButton} type="button" onClick={() => setSubjectModalOpen(false)} aria-label="Popup schließen">
                  ×
                </button>
              ) : null}
            </div>
            <div className={styles.subjectGrid}>
              {subjects.map((item) => (
                <button
                  className={`${styles.subjectButton} ${!item.active ? styles.subjectButtonDisabled : ''}`}
                  disabled={!item.active}
                  key={item.id}
                  type="button"
                  onClick={() => chooseSubject(item)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

function LearnMode({ topic, progress, onDone }) {
  return (
    <div className={styles.studyCard}>
      <div className={styles.learningList}>
        {topic.learn.map((item, index) => (
          <article key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
      <button className={styles.primaryAction} type="button" onClick={onDone}>
        {progress.learnDone ? 'Lernbereich wiederholt' : 'Lernbereich gelernt'}
      </button>
    </div>
  )
}

function McqMode({ topic, onComplete }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const current = topic.mcqs[index]
  const wasCorrect = selected === current.answer
  const visibleCorrect = correct + (wasCorrect ? 1 : 0)

  function choose(option) {
    if (selected) return

    setSelected(option)
  }

  function next() {
    const nextCorrect = selected === current.answer ? correct + 1 : correct
    if (index + 1 >= topic.mcqs.length) {
      setFinished(true)
      onComplete(nextCorrect, topic.mcqs.length)
      return
    }

    setCorrect(nextCorrect)
    setIndex((value) => value + 1)
    setSelected(null)
  }

  if (finished) {
    return (
      <div className={styles.studyCard}>
        <div className={styles.mcqResult}>
          <strong>{correct} von {topic.mcqs.length}</strong>
          <span>MCQs geschafft. Dein Ergebnis wurde gespeichert.</span>
        </div>
        <button
          className={styles.primaryAction}
          type="button"
          onClick={() => {
            setIndex(0)
            setSelected(null)
            setCorrect(0)
            setFinished(false)
          }}
        >
          Noch einmal üben
        </button>
      </div>
    )
  }

  return (
    <div className={styles.studyCard}>
      <div className={styles.mcqTop}>
        <span>Frage {index + 1} von {topic.mcqs.length}</span>
        <strong>{visibleCorrect} richtig</strong>
      </div>
      <h3 className={styles.mcqQuestion}>{current.question}</h3>
      <div className={styles.answerGrid}>
        {current.options.map((option) => {
          const isAnswer = selected && option === current.answer
          const isWrong = selected === option && option !== current.answer
          return (
            <button
              className={`${styles.answerButton} ${isAnswer ? styles.answerCorrect : ''} ${isWrong ? styles.answerWrong : ''}`}
              key={option}
              type="button"
              onClick={() => choose(option)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected ? (
        <div className={styles.feedbackBox}>
          <strong>{wasCorrect ? 'Richtig.' : 'Noch einmal merken.'}</strong>
          <span>{current.help}</span>
          <button className={styles.primaryAction} type="button" onClick={next}>
            {index + 1 >= topic.mcqs.length ? 'Ergebnis speichern' : 'Nächste Frage'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function FlashcardMode({ topic, onProgress }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [seen, setSeen] = useState([])
  const current = topic.flashcards[index]

  function markSeen() {
    const nextSeen = seen.includes(index) ? seen : [...seen, index]
    setSeen(nextSeen)
    onProgress(nextSeen.length, topic.flashcards.length)
    setIndex((value) => (value + 1) % topic.flashcards.length)
    setRevealed(false)
  }

  return (
    <div className={styles.studyCard}>
      <div className={styles.mcqTop}>
        <span>Karte {index + 1} von {topic.flashcards.length}</span>
        <strong>{seen.length} gelernt</strong>
      </div>
      <button className={styles.flashStudyCard} type="button" onClick={() => setRevealed((value) => !value)}>
        <strong>{current.front}</strong>
        <span>{revealed ? current.back : 'Antippen zum Umdrehen'}</span>
      </button>
      <div className={styles.actionRow}>
        <button className={styles.ghostAction} type="button" onClick={() => setRevealed((value) => !value)}>
          {revealed ? 'Vorderseite' : 'Antwort zeigen'}
        </button>
        <button className={styles.primaryAction} type="button" onClick={markSeen}>
          Karte gelernt
        </button>
      </div>
    </div>
  )
}
