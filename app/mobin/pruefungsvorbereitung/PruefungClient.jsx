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
        question: 'In „Wegen des starken Regens blieben die Kinder heute drinnen” ist „Wegen des starken Regens” ...',
        options: ['eine Grundangabe', 'eine Zeitangabe', 'eine Ortsangabe', 'ein Akkusativobjekt'],
        answer: 'eine Grundangabe',
        help: 'Frage: Warum blieben die Kinder drinnen? → Wegen des starken Regens. Das ist eine kausale Bestimmung.',
      },
      {
        question: 'Welcher Ausdruck ist KEIN eigenständiges Satzglied?',
        options: ['”den” (einzelner Artikel)', '”im Park”', '”sehr schnell”', '”am Dienstag”'],
        answer: '”den” (einzelner Artikel)',
        help: 'Ein einzelner Artikel kann nicht als Block verschoben werden – er gehört immer zum nächsten Nomen.',
      },
      {
        question: 'In „Gestern haben die Kinder im Wald Pilze gesucht” gibt es wie viele Satzglieder?',
        options: ['5', '3', '4', '6'],
        answer: '5',
        help: 'Gestern (Zeit) | haben gesucht (Prädikat) | die Kinder (Subjekt) | im Wald (Ort) | Pilze (Akkusativobjekt) → 5 Satzglieder.',
      },
      {
        question: 'Was beweist die Umstellprobe im Satz „Am Abend kocht Oma Suppe”?',
        options: ['„Am Abend” kann als Block vorgezogen werden', '„Oma” ist das Prädikat', '„Suppe” ist das Subjekt', 'Der Satz ist grammatisch falsch'],
        answer: '„Am Abend” kann als Block vorgezogen werden',
        help: '„Am Abend kocht Oma Suppe” → „Oma kocht am Abend Suppe.” „Am Abend” bleibt als Block erhalten – das ist die Umstellprobe.',
      },
      {
        question: 'In „Der fleißige Mobin erklärt seiner Schwester geduldig die Aufgabe” sind „seiner Schwester” und „die Aufgabe” ...',
        options: ['Dativobjekt und Akkusativobjekt', 'zwei Akkusativobjekte', 'Subjekt und Prädikat', 'zwei Zeitangaben'],
        answer: 'Dativobjekt und Akkusativobjekt',
        help: 'Wem erklärt er? → seiner Schwester (Dativ). Wen oder was erklärt er? → die Aufgabe (Akkusativ).',
      },
    ],
    flashcards: [
      { front: 'Satzglied', back: 'Ein Baustein des Satzes, der meist als Block verschoben werden kann.' },
      { front: 'Umstellprobe', back: 'Verschiebe Satzteile. Was zusammenbleibt, ist oft ein Satzglied.' },
      { front: 'Frageprobe', back: 'Frage nach der Funktion: Wer? Wen? Wann? Wo? Wie? Warum?' },
      { front: 'Start beim Bestimmen', back: 'Suche zuerst das Prädikat, dann Subjekt und Ergänzungen.' },
      { front: 'Beispiel', back: '„Morgen spielt Leo Tennis.” Morgen = Zeitangabe.' },
    ],
  },
  {
    id: 'praedikat',
    title: 'Prädikat',
    meta: 'Verb, Personalform, zweiteiliges Prädikat',
    learn: [
      'Das Prädikat sagt, was jemand tut oder was geschieht. Es enthält immer eine Verbform.',
      'Ein Prädikat kann einteilig sein: „Mobin liest.” Es kann auch zweiteilig sein: „Mobin hat gelesen.”',
      'Bei zweiteiligen Prädikaten entsteht oft eine Satzklammer: Ein Teil steht vorne, der andere am Satzende.',
    ],
    mcqs: [
      {
        question: 'In „Die Schüler haben gestern fleißig gelernt” ist das Prädikat ...',
        options: ['haben gelernt', 'gelernt', 'haben fleißig gelernt', 'haben gestern gelernt'],
        answer: 'haben gelernt',
        help: 'Das Prädikat = Personalform + Partizip/Infinitiv. „fleißig” und „gestern” sind adverbiale Bestimmungen und gehören nicht zum Prädikat.',
      },
      {
        question: 'Welche Aussage zur Satzklammer ist richtig?',
        options: [
          'Die Personalform steht auf Position 2, der Rest am Satzende.',
          'Beide Verbteile stehen immer direkt nebeneinander.',
          'Im Fragesatz gibt es keine Satzklammer.',
          'Die Satzklammer gibt es nur im Nebensatz.',
        ],
        answer: 'Die Personalform steht auf Position 2, der Rest am Satzende.',
        help: 'Beispiel: „Mobin [hat] das Buch bis Mitternacht [gelesen].” – Satzklammer schließt den Rest des Satzes ein.',
      },
      {
        question: 'In „Wirst du morgen zur Schule kommen?” ist das Prädikat ...',
        options: ['Wirst kommen', 'kommen', 'Wirst', 'morgen kommen'],
        answer: 'Wirst kommen',
        help: 'Hilfsverb + Infinitiv bilden zusammen das Prädikat. „morgen” ist eine Zeitangabe.',
      },
      {
        question: 'In „Er soll das Buch bereits gelesen haben” ist das Prädikat ...',
        options: ['soll gelesen haben', 'gelesen haben', 'soll', 'bereits gelesen'],
        answer: 'soll gelesen haben',
        help: 'Alle Verbteile zusammen bilden das Prädikat: soll ... gelesen haben. „bereits” ist eine Zeitangabe.',
      },
      {
        question: 'Welcher Satz hat ein einteiliges Prädikat?',
        options: ['Die Vögel singen.', 'Mobin hat gegessen.', 'Sie wird kommen.', 'Er konnte schlafen.'],
        answer: 'Die Vögel singen.',
        help: 'Nur „singen” ist einteilig. Bei den anderen gibt es Hilfsverb + Infinitiv/Partizip → zweiteilig.',
      },
    ],
    flashcards: [
      { front: 'Prädikat', back: 'Der Verbteil des Satzes: Was tut jemand? Was geschieht?' },
      { front: 'Personalform', back: 'Die gebeugte Verbform, z. B. ich lese, du liest, er liest.' },
      { front: 'Einteiliges Prädikat', back: '„Sara malt.” Prädikat: malt.' },
      { front: 'Zweiteiliges Prädikat', back: '„Sara hat gemalt.” Prädikat: hat gemalt.' },
      { front: 'Satzklammer', back: 'Bei zweiteiligem Prädikat steht ein Verbteil oft am Satzende.' },
    ],
  },
  {
    id: 'subjekt',
    title: 'Subjekt',
    meta: 'Wer oder was?',
    learn: [
      'Das Subjekt nennt, wer oder was etwas tut oder wer/was in einem Zustand ist.',
      'Du findest es mit der Frage „Wer oder was?” zusammen mit dem Prädikat.',
      'Das Subjekt steht im Nominativ und passt in Person und Zahl zum Prädikat.',
    ],
    mcqs: [
      {
        question: 'In „Mobin und seine Schwester spielen heute im Garten” ist das Subjekt ...',
        options: ['Mobin und seine Schwester', 'Mobin', 'spielen', 'heute im Garten'],
        answer: 'Mobin und seine Schwester',
        help: 'Wer spielt im Garten? → Mobin und seine Schwester. Beide zusammen bilden das Subjekt.',
      },
      {
        question: 'In „Dem Lehrer gefällt das Ergebnis” ist das Subjekt ...',
        options: ['das Ergebnis', 'Dem Lehrer', 'gefällt', 'Das Ergebnis und der Lehrer'],
        answer: 'das Ergebnis',
        help: 'Wer oder was gefällt? → das Ergebnis (Nominativ). „Dem Lehrer” steht im Dativ → Dativobjekt, nicht Subjekt.',
      },
      {
        question: 'Welche Aussage über das Subjekt ist falsch?',
        options: [
          'Das Subjekt steht immer am Satzanfang.',
          'Das Subjekt steht im Nominativ.',
          'Das Subjekt passt in Person und Zahl zum Prädikat.',
          'Das Subjekt antwortet auf „Wer oder was?”.',
        ],
        answer: 'Das Subjekt steht immer am Satzanfang.',
        help: 'Das Subjekt kann überall im Satz stehen. Beispiel: „Heute spielt Mobin.” – Subjekt Mobin steht nicht am Anfang.',
      },
      {
        question: 'In „Es regnet heute stark” ist „es” ...',
        options: ['das Subjekt (formales Subjekt)', 'ein Akkusativobjekt', 'eine Zeitangabe', 'das Prädikat'],
        answer: 'das Subjekt (formales Subjekt)',
        help: '„Es” übernimmt die Funktion des Subjekts, auch wenn es keinen konkreten Gegenstand nennt – man nennt das formales Subjekt.',
      },
      {
        question: 'In „Heute wird das Buch von der Lehrerin vorgelesen” ist das Subjekt ...',
        options: ['das Buch', 'die Lehrerin', 'Heute', 'vorgelesen'],
        answer: 'das Buch',
        help: 'Wer oder was wird vorgelesen? → das Buch (Nominativ). „von der Lehrerin” ist eine adverbiale Bestimmung (Agens im Passiv).',
      },
    ],
    flashcards: [
      { front: 'Subjekt-Frage', back: 'Wer oder was tut etwas?' },
      { front: 'Kasus', back: 'Das Subjekt steht im Nominativ.' },
      { front: 'Beispiel', back: '„Der Hund schläft.” Subjekt: Der Hund.' },
      { front: 'Nicht immer vorne', back: '„Heute spielt Mobin.” Subjekt: Mobin.' },
      { front: 'Zusammenhang', back: 'Subjekt und Prädikat passen zusammen: ich gehe, wir gehen.' },
    ],
  },
  {
    id: 'akkusativ',
    title: 'Akkusativ',
    meta: 'Wen oder was?',
    learn: [
      'Das Akkusativobjekt ergänzt viele Verben. Du fragst danach mit „Wen oder was?”',
      'Typische Verben mit Akkusativ sind sehen, lesen, kaufen, malen, essen, suchen.',
      'Achte auf die Artikel: der wird im Akkusativ oft zu den, ein zu einen.',
    ],
    mcqs: [
      {
        question: 'In „Der Vater zeigt dem Kind das neue Fahrrad” ist das Akkusativobjekt ...',
        options: ['das neue Fahrrad', 'dem Kind', 'Der Vater', 'zeigt'],
        answer: 'das neue Fahrrad',
        help: 'Wen oder was zeigt der Vater? → das neue Fahrrad. „dem Kind” ist Dativobjekt (Wem?).',
      },
      {
        question: 'Welche Artikelform zeigt an, dass ein maskulines Nomen im Akkusativ steht?',
        options: ['den / einen', 'dem / einem', 'der / einer', 'des / eines'],
        answer: 'den / einen',
        help: 'Maskulin im Akkusativ: der → den, ein → einen. Bei Feminin und Neutrum ändert sich der Artikel nicht.',
      },
      {
        question: 'In „Mobin liest seiner Mutter einen langen Brief vor” gibt es ...',
        options: ['ein Dativobjekt und ein Akkusativobjekt', 'zwei Akkusativobjekte', 'nur ein Akkusativobjekt', 'kein Objekt'],
        answer: 'ein Dativobjekt und ein Akkusativobjekt',
        help: 'Wem liest er vor? → seiner Mutter (Dativ). Wen oder was liest er vor? → einen langen Brief (Akkusativ).',
      },
      {
        question: 'Welches Verb verlangt typischerweise KEIN Akkusativobjekt?',
        options: ['schlafen', 'lesen', 'kaufen', 'sehen'],
        answer: 'schlafen',
        help: 'Intransitive Verben wie „schlafen” oder „laufen” haben kein Akkusativobjekt. Transitive Verben (lesen, kaufen, sehen) haben eines.',
      },
      {
        question: 'In „Das Mädchen vermisst ihre Freundin sehr” ist „sehr” ...',
        options: ['eine Art-und-Weise-Angabe', 'das Akkusativobjekt', 'das Subjekt', 'ein Dativobjekt'],
        answer: 'eine Art-und-Weise-Angabe',
        help: '„sehr” beantwortet Wie? → Art-und-Weise. Akkusativobjekt: ihre Freundin (Wen vermisst sie?).',
      },
    ],
    flashcards: [
      { front: 'Akkusativ-Frage', back: 'Wen oder was?' },
      { front: 'Beispiel', back: '„Ich lese ein Buch.” Akkusativobjekt: ein Buch.' },
      { front: 'Artikelwechsel', back: 'der Hund → den Hund, ein Hund → einen Hund.' },
      { front: 'Typische Verben', back: 'sehen, kaufen, essen, suchen, lesen, malen.' },
      { front: 'Abgrenzung Dativ', back: 'Akkusativ: Wen oder was? | Dativ: Wem?' },
    ],
  },
  {
    id: 'adverbiale',
    title: 'Adverbiale Bestimmungen',
    meta: 'Zeit, Ort, Art und Weise, Grund',
    learn: [
      'Adverbiale Bestimmungen geben genauere Umstände an: Zeit, Ort, Art und Weise oder Grund.',
      'Typische Fragen sind: Wann? Wo? Wohin? Wie? Warum? Weshalb?',
      'Sie sind oft verschiebbar: „Am Morgen fährt Ali zur Schule” und „Ali fährt am Morgen zur Schule”.',
    ],
    mcqs: [
      {
        question: 'In „Wegen der Krankheit konnte Mobin nicht am Unterricht teilnehmen” ist „Wegen der Krankheit” ...',
        options: ['Grundangabe (kausal)', 'Zeitangabe (temporal)', 'Ortsangabe (lokal)', 'Art-und-Weise-Angabe (modal)'],
        answer: 'Grundangabe (kausal)',
        help: 'Frage: Warum konnte er nicht teilnehmen? → Wegen der Krankheit. Kausal = Grund.',
      },
      {
        question: 'Welcher Ausdruck ist eine modale Bestimmung (Art und Weise)?',
        options: ['mit großer Sorgfalt', 'am Dienstag', 'im Klassenzimmer', 'wegen des Wetters'],
        answer: 'mit großer Sorgfalt',
        help: 'Frage: Wie? → mit großer Sorgfalt. Temporal: Wann? | Lokal: Wo? | Kausal: Warum?',
      },
      {
        question: 'In „Ali läuft jeden Morgen sehr schnell zur Schule” sind „jeden Morgen” und „sehr schnell” ...',
        options: ['eine Zeitangabe und eine Art-und-Weise-Angabe', 'zwei Ortsangaben', 'zwei Zeitangaben', 'ein Akkusativobjekt und ein Subjekt'],
        answer: 'eine Zeitangabe und eine Art-und-Weise-Angabe',
        help: 'Jeden Morgen → Wann? (Zeitangabe). Sehr schnell → Wie? (Art-und-Weise-Angabe).',
      },
      {
        question: 'Welcher Satz enthält eine lokale Bestimmung?',
        options: ['Sie schläft im Zelt.', 'Er schläft tief.', 'Wir essen jetzt.', 'Sie lacht laut.'],
        answer: 'Sie schläft im Zelt.',
        help: '„im Zelt” beantwortet: Wo schläft sie? → Das ist eine lokale (Orts-) Bestimmung.',
      },
      {
        question: 'Adverbiale Bestimmungen können ...',
        options: [
          'als Block im Satz verschoben werden',
          'nie an den Satzanfang gestellt werden',
          'nie weggelassen werden',
          'immer nur ein einziges Wort sein',
        ],
        answer: 'als Block im Satz verschoben werden',
        help: '„Im Garten spielen die Kinder.” → „Die Kinder spielen im Garten.” Die Ortsangabe lässt sich als Block verschieben.',
      },
    ],
    flashcards: [
      { front: 'Temporal', back: 'Zeit: Wann? Seit wann? Wie lange?' },
      { front: 'Lokal', back: 'Ort: Wo? Wohin? Woher?' },
      { front: 'Modal', back: 'Art und Weise: Wie?' },
      { front: 'Kausal', back: 'Grund: Warum? Weshalb?' },
      { front: 'Beispiel', back: '„Am Morgen fährt Ali zur Schule.” Am Morgen = Zeitangabe.' },
    ],
  },
  {
    id: 'satzreihe-satzgefuege',
    title: 'Satzreihe & Satzgefüge',
    meta: 'Hauptsatz, Nebensatz, Komma, Verbstellung',
    learn: [
      'Eine Satzreihe besteht aus Hauptsatz + Hauptsatz. Die Hauptsätze werden oft durch Komma oder nebenordnende Konjunktionen verbunden: und, oder, aber, sondern, denn, doch.',
      'Ein Satzgefüge besteht aus Hauptsatz + Nebensatz. Hauptsatz und Nebensatz werden immer durch Komma getrennt.',
      'Nebensätze werden oft durch unterordnende Konjunktionen eingeleitet: weil, da, obwohl, damit, dass, sodass, nachdem, während.',
      'Im Nebensatz steht die Personalform des Verbs am Ende: „weil die Sonne scheint”. Deshalb nennt man ihn Verbletztsatz.',
      'Satzbaupläne kannst du so zeichnen: HS + NS, NS + HS oder HS Teil 1 + NS + HS Teil 2.',
      'Satzarten helfen beim Satzbau: Aussagesatz mit Punkt, Fragesatz mit Fragezeichen, Aufforderungssatz meist mit Ausrufezeichen.',
    ],
    mcqs: [
      {
        question: 'Welcher Satz ist ein Satzgefüge?',
        options: [
          'Sie kam zu spät, weil der Bus ausfiel.',
          'Er schläft und sie liest.',
          'Mobin läuft schnell, aber Sara geht langsam.',
          'Es regnete, doch wir gingen trotzdem raus.',
        ],
        answer: 'Sie kam zu spät, weil der Bus ausfiel.',
        help: '„weil” ist eine unterordnende Konjunktion → Nebensatz → Satzgefüge. Die anderen verbinden zwei Hauptsätze (Satzreihe).',
      },
      {
        question: 'Welche Konjunktion leitet IMMER einen Nebensatz ein?',
        options: ['obwohl', 'aber', 'oder', 'und'],
        answer: 'obwohl',
        help: '„obwohl” ist unterordnend → Nebensatz. „aber”, „oder”, „und” sind nebenordnend → Satzreihe.',
      },
      {
        question: 'In „Mobin lernte fleißig, damit er die Prüfung besteht” steht das Verb im Nebensatz ...',
        options: ['am Satzende: besteht', 'an erster Stelle: damit', 'an zweiter Stelle: lernte', 'an erster Stelle: besteht'],
        answer: 'am Satzende: besteht',
        help: 'Im Nebensatz steht die Personalform ganz am Ende: „damit er die Prüfung besteht.”',
      },
      {
        question: 'Was ist die Regel für das Komma zwischen Haupt- und Nebensatz?',
        options: [
          'Haupt- und Nebensatz werden immer durch ein Komma getrennt.',
          'Ein Komma steht nur bei „weil” und „da”.',
          'Kein Komma, wenn der Nebensatz am Satzende steht.',
          'Komma nur, wenn der Nebensatz vorne steht.',
        ],
        answer: 'Haupt- und Nebensatz werden immer durch ein Komma getrennt.',
        help: 'Ob der Nebensatz vorne oder hinten steht – das Komma steht immer zwischen Haupt- und Nebensatz.',
      },
      {
        question: 'Wie lautet der Satzbauplan von „Obwohl es regnete, fuhren wir in den Park”?',
        options: ['NS + HS', 'HS + NS', 'HS + HS', 'HS + NS + HS'],
        answer: 'NS + HS',
        help: '„Obwohl es regnete” ist der Nebensatz (steht vorne), „fuhren wir in den Park” ist der Hauptsatz.',
      },
    ],
    flashcards: [
      { front: 'Satzreihe', back: 'Hauptsatz + Hauptsatz, oft mit und / oder / aber / denn / doch.' },
      { front: 'Satzgefüge', back: 'Hauptsatz + Nebensatz. Zwischen beiden steht immer ein Komma.' },
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
        <div className={styles.subjectBackdrop} role="presentation" onClick={() => { if (subject) setSubjectModalOpen(false) }}>
          <div className={styles.subjectModal} role="dialog" aria-modal="true" aria-labelledby="subject-title" onClick={(e) => e.stopPropagation()}>
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
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const [results, setResults] = useState({}) // { [index]: 'known' | 'missed' }
  const [done, setDone] = useState(false)
  const cards = topic.flashcards
  const current = cards[index]

  const knownCount = Object.values(results).filter((r) => r === 'known').length

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!exiting) setFlipped((v) => !v)
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') answer(true)
        if (e.code === 'ArrowLeft') answer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function answer(knew) {
    if (!flipped || exiting) return
    const dir = knew ? 'right' : 'left'
    setExiting(true)
    setExitDir(dir)
    const nextResults = { ...results, [index]: knew ? 'known' : 'missed' }
    setResults(nextResults)
    const knownTotal = Object.values(nextResults).filter((r) => r === 'known').length
    onProgress(knownTotal, cards.length)
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      setExitDir(null)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex((i) => i + 1)
    }, 300)
  }

  if (done) {
    const total = cards.length
    const known = Object.values(results).filter((r) => r === 'known').length
    return (
      <div className={styles.studyCard}>
        <div className={styles.flipResult}>
          <div className={styles.flipResultScore}>{known}/{total}</div>
          <p className={styles.flipResultSub}>
            {known === total ? 'Alle gewusst – sehr gut!' : `${known} von ${total} gewusst. Noch einmal üben?`}
          </p>
          <button
            className={styles.primaryAction}
            type="button"
            onClick={() => { setIndex(0); setFlipped(false); setResults({}); setDone(false) }}
          >
            Nochmal üben
          </button>
        </div>
      </div>
    )
  }

  const stageClass = [
    styles.flipStage,
    exiting ? styles.flipExiting : '',
    exitDir === 'right' ? styles.flipExitRight : exitDir === 'left' ? styles.flipExitLeft : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.studyCard}>
      <div className={styles.mcqTop}>
        <span>Karte {index + 1} von {cards.length}</span>
        <strong>{knownCount} gewusst</strong>
      </div>

      <div className={styles.flipNavRow}>
        {cards.map((_, i) => {
          const r = results[i]
          const dotClass = [
            styles.flipDot,
            r === 'known' ? styles.flipDotKnown : '',
            r === 'missed' ? styles.flipDotMissed : '',
            i === index && !r ? styles.flipDotActive : '',
          ].filter(Boolean).join(' ')
          return <span key={i} className={dotClass}>{i + 1}</span>
        })}
      </div>

      <div
        className={stageClass}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Karte umdrehen' : 'Antwort zeigen'}
        onClick={() => { if (!exiting) setFlipped((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (!exiting) setFlipped((v) => !v) } }}
      >
        <div className={`${styles.flipInner} ${flipped ? styles.flipInnerFlipped : ''}`}>
          <div className={styles.flipFront}>
            <strong className={styles.flipQuestion}>{current.front}</strong>
            <span className={styles.flipHint}>↕ Antippen zum Umdrehen</span>
          </div>
          <div className={styles.flipBack}>
            <div>
              <span className={styles.flipLabel}>Antwort</span>
              <p className={styles.flipAnswerText}>{current.back}</p>
            </div>
            <span className={styles.flipHint}>↕ Antippen zum Zurückdrehen</span>
          </div>
        </div>
      </div>

      <div className={`${styles.flipAnswerRow} ${flipped ? styles.flipAnswerVisible : ''}`}>
        <button className={styles.flipMissBtn} type="button" onClick={() => answer(false)}>
          Noch einmal ✗
        </button>
        <button className={styles.flipKnowBtn} type="button" onClick={() => answer(true)}>
          Gewusst ✓
        </button>
      </div>
    </div>
  )
}
