'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const DAY = 24 * 60 * 60 * 1000
const INTERVALS = [0, 1, 3, 7, 14, 30]

const todayIso = () => new Date().toISOString().slice(0, 10)
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
const LEITNER_BOXES = [0, 1, 2, 3, 4, 5]

const emptyState = {
  lessons: [],
  cards: [],
  reviews: [],
  writings: [],
  answers: {},
}

const sampleLesson = {
  id: 'deutsch-001-arzttermin',
  date: todayIso(),
  level: 'B1/B2',
  title: 'Einen Arzttermin verschieben',
  topic: 'Alltag und Gesundheit',
  reading: {
    title: 'Eine Terminverschiebung',
    text: 'Mina hat seit drei Wochen einen Termin beim Orthopäden. Leider muss sie an diesem Tag länger arbeiten, weil eine Kollegin krank geworden ist. Sie ruft in der Praxis an und erklärt ruhig die Situation. Die Mitarbeiterin bietet ihr einen neuen Termin am Freitagvormittag an. Mina bittet darum, die Uhrzeit schriftlich per E-Mail zu bestätigen, damit sie den Termin nicht vergisst.',
    vocabulary: [
      { term: 'verschieben', de: 'einen geplanten Termin auf einen anderen Zeitpunkt legen', fa: 'به زمان دیگری منتقل کردن', example: 'Ich möchte meinen Termin verschieben.' },
      { term: 'die Praxis', de: 'Ort, an dem Ärztinnen oder Ärzte Patientinnen und Patienten behandeln', fa: 'مطب', example: 'Ich rufe in der Praxis an.' },
      { term: 'bestätigen', de: 'sagen oder schreiben, dass etwas richtig oder fest vereinbart ist', fa: 'تأیید کردن', example: 'Bitte bestätigen Sie den Termin per E-Mail.' },
      { term: 'die Mitarbeiterin', de: 'eine Person, die in einer Firma oder Praxis arbeitet', fa: 'کارمند زن', example: 'Die Mitarbeiterin bietet einen neuen Termin an.' },
      { term: 'schriftlich', de: 'nicht nur mündlich, sondern als Text', fa: 'کتبی', example: 'Ich brauche eine schriftliche Bestätigung.' },
    ],
    questions: [
      { question: 'Warum muss Mina den Termin verschieben?', options: ['Sie muss länger arbeiten.', 'Sie hat den Termin vergessen.', 'Der Orthopäde ist krank.', 'Sie möchte am Freitag arbeiten.'], answer: 0, explanation: 'Im Text steht, dass Mina länger arbeiten muss, weil eine Kollegin krank geworden ist.' },
      { question: 'Was macht Mina zuerst?', options: ['Sie schreibt eine Beschwerde.', 'Sie ruft in der Praxis an.', 'Sie geht direkt zur Praxis.', 'Sie storniert alle Termine.'], answer: 1, explanation: 'Sie ruft an und erklärt die Situation.' },
      { question: 'Was bedeutet „schriftlich bestätigen“ hier am besten?', options: ['den Termin bezahlen', 'den Termin per Text festhalten', 'die Praxis wechseln', 'die Uhr reparieren'], answer: 1, explanation: 'Schriftlich bedeutet, dass die Bestätigung als Text kommt.' },
      { question: 'Welche Eigenschaft beschreibt Minas Verhalten?', options: ['panisch', 'ruhig und organisiert', 'unhöflich', 'gleichgültig'], answer: 1, explanation: 'Sie erklärt ruhig und bittet um eine E-Mail, damit sie den Termin nicht vergisst.' },
      { question: 'Welche Information möchte Mina per E-Mail bekommen?', options: ['den Namen der kranken Kollegin', 'die genaue Uhrzeit', 'eine Rechnung', 'eine Diagnose'], answer: 1, explanation: 'Sie bittet darum, die Uhrzeit schriftlich zu bestätigen.' },
    ],
  },
  grammar: [
    { question: 'Welche Form ist korrekt?', options: ['beim Orthopäden', 'bei der Orthopäde', 'bei dem Orthopäde', 'beim Orthopäde'], answer: 0, explanation: '„bei dem“ wird zu „beim“, und „Orthopäde“ bekommt im Dativ Singular oft die Endung -n: beim Orthopäden.' },
    { question: 'Warum steht „seit drei Wochen“?', options: ['weil es um eine abgeschlossene Vergangenheit geht', 'weil der Zeitraum bis jetzt andauert', 'weil es Zukunft ausdrückt', 'weil es einen Ort beschreibt'], answer: 1, explanation: '„Seit“ beschreibt einen Zeitraum, der in der Vergangenheit begonnen hat und bis jetzt relevant ist.' },
    { question: 'Welche Satzstellung ist korrekt?', options: ['Leider muss sie an diesem Tag länger arbeiten.', 'Leider sie muss an diesem Tag länger arbeiten.', 'Leider an diesem Tag sie muss länger arbeiten.', 'Leider arbeiten muss sie länger.'], answer: 0, explanation: 'Nach einem Adverb am Satzanfang steht das finite Verb auf Position 2.' },
    { question: 'Was ist „damit sie den Termin nicht vergisst“?', options: ['ein Finalsatz', 'ein Relativsatz', 'eine indirekte Frage', 'ein Hauptsatz'], answer: 0, explanation: '„damit“ zeigt einen Zweck: Die E-Mail hilft ihr, den Termin nicht zu vergessen.' },
    { question: 'Welche Form passt: „Sie bittet ___ eine Bestätigung“?', options: ['um', 'für', 'an', 'mit'], answer: 0, explanation: 'Die feste Verbindung lautet „um etwas bitten“.' },
  ],
  listening: {
    title: 'Ein ähnlicher Anruf',
    text: 'Guten Morgen, hier spricht Mina Rahimi. Ich habe am Mittwoch einen Termin in Ihrer Praxis. Leider kann ich an diesem Tag nicht kommen. Wäre es möglich, den Termin auf Freitag zu verschieben? Bitte schicken Sie mir die neue Uhrzeit schriftlich per E-Mail.',
    questions: [
      { question: 'An welchem Tag hat Mina ursprünglich einen Termin?', options: ['Montag', 'Mittwoch', 'Freitag', 'Sonntag'], answer: 1, explanation: 'Im Hörtext sagt Mina: „am Mittwoch“.' },
      { question: 'Wohin ruft Mina an?', options: ['in eine Praxis', 'in eine Schule', 'in ein Restaurant', 'in ein Hotel'], answer: 0, explanation: 'Sie sagt „in Ihrer Praxis“.' },
      { question: 'Was möchte Mina?', options: ['den Termin verschieben', 'eine Rechnung bezahlen', 'eine Kollegin suchen', 'eine Diagnose bekommen'], answer: 0, explanation: 'Sie fragt, ob der Termin auf Freitag verschoben werden kann.' },
      { question: 'Wie möchte sie die neue Uhrzeit bekommen?', options: ['telefonisch', 'per SMS', 'schriftlich per E-Mail', 'per Postkarte'], answer: 2, explanation: 'Sie bittet um eine schriftliche E-Mail.' },
      { question: 'Welche Formulierung ist besonders höflich?', options: ['Ich komme nicht.', 'Wäre es möglich...', 'Schicken Sie sofort...', 'Ich will Freitag.'], answer: 1, explanation: '„Wäre es möglich...“ ist eine höfliche indirekte Frage.' },
    ],
  },
  writing: {
    prompt: 'Schreibe eine kurze E-Mail an eine Arztpraxis. Du kannst deinen Termin nicht wahrnehmen und möchtest höflich einen neuen Termin vereinbaren.',
    checklist: ['Anrede', 'Grund kurz erklären', 'neuen Termin erfragen', 'schriftliche Bestätigung bitten', 'höflicher Abschluss'],
  },
}

const upgradedSampleLesson = {
  id: 'deutsch-001-digitale-erreichbarkeit',
  date: todayIso(),
  level: 'B2',
  title: 'Immer erreichbar sein?',
  topic: 'Alltag, Arbeit und digitale Grenzen',
  reading: {
    title: 'Die unsichtbare Pflicht zur Antwort',
    text: 'Seit Leyla im Projektteam arbeitet, erwartet niemand offiziell, dass sie abends erreichbar ist. Trotzdem entsteht ein subtiler Druck: Wenn eine Nachricht im Gruppenchat unbeantwortet bleibt, wirkt es schnell, als nehme sie ihre Aufgaben nicht ernst. Einige Kolleginnen beantworten jede Anfrage sofort, andere schalten nach Feierabend konsequent ab. In der woechentlichen Besprechung spricht Leyla das Thema vorsichtig an. Sie sagt nicht, dass jemand falsch handelt, sondern fragt, ob das Team gemeinsame Regeln braucht. Ihr Vorschlag ist einfach: Dringende Fragen sollen telefonisch geklaert werden, normale Nachrichten koennen bis zum naechsten Arbeitstag warten. Zunaechst reagieren manche skeptisch, weil sie Flexibilitaet verlieren koennten. Nach einer kurzen Diskussion merken jedoch viele, dass klare Grenzen nicht gegen Zusammenarbeit sprechen, sondern sie verlaesslicher machen.',
    vocabulary: [
      { term: 'erreichbar', de: 'so verfuegbar, dass andere einen kontaktieren koennen', fa: 'در دسترس', example: 'Nach Feierabend bin ich nur in Notfaellen erreichbar.' },
      { term: 'subtiler Druck', de: 'ein Druck, der nicht direkt ausgesprochen wird, aber trotzdem spuerbar ist', fa: 'فشار پنهان', example: 'In manchen Teams entsteht subtiler Druck, sofort zu antworten.' },
      { term: 'unbeantwortet', de: 'ohne Antwort geblieben', fa: 'بی پاسخ', example: 'Die Nachricht blieb bis zum Morgen unbeantwortet.' },
      { term: 'konsequent', de: 'klar, bewusst und ohne staendige Ausnahme', fa: 'قاطعانه', example: 'Sie schaltet ihr Diensthandy konsequent aus.' },
      { term: 'Besprechung', de: 'ein berufliches Treffen, bei dem Themen diskutiert werden', fa: 'جلسه', example: 'In der Besprechung wurde ueber neue Regeln gesprochen.' },
      { term: 'Dringende Fragen', de: 'Fragen, die schnell geklaert werden muessen', fa: 'سوالات فوری', example: 'Dringende Fragen sollen telefonisch geklaert werden.' },
      { term: 'Flexibilitaet', de: 'die Moeglichkeit, sich an verschiedene Situationen anzupassen', fa: 'انعطاف پذیری', example: 'Homeoffice bietet mehr Flexibilitaet.' },
      { term: 'verlaesslicher', de: 'zuverlaessiger und besser planbar', fa: 'قابل اعتمادتر', example: 'Klare Regeln machen die Zusammenarbeit verlaesslicher.' },
    ],
    questions: [
      { question: 'Was ist das zentrale Problem im Text?', options: ['Eine offizielle Pflicht, nachts zu arbeiten.', 'Unausgesprochene Erwartungen an schnelle Antworten.', 'Leylas fehlende Verantwortung im Projekt.', 'Ein technisches Problem im Gruppenchat.'], answer: 1, explanation: 'Der Text betont, dass niemand offiziell Erreichbarkeit verlangt, aber trotzdem subtiler Druck entsteht.' },
      { question: 'Warum formuliert Leyla ihr Anliegen vorsichtig?', options: ['Sie will niemanden direkt beschuldigen.', 'Sie hat keine eigene Meinung.', 'Sie will die Besprechung vermeiden.', 'Sie kennt die Regeln bereits.'], answer: 0, explanation: 'Sie sagt nicht, dass jemand falsch handelt, sondern fragt nach gemeinsamen Regeln.' },
      { question: 'Welche Loesung schlaegt Leyla vor?', options: ['Alle Nachrichten ignorieren.', 'Nur die Teamleitung darf schreiben.', 'Dringendes telefonisch, Normales am naechsten Arbeitstag.', 'Den Gruppenchat loeschen.'], answer: 2, explanation: 'Ihr Vorschlag unterscheidet zwischen dringenden Fragen und normalen Nachrichten.' },
      { question: 'Was zeigt die skeptische Reaktion einiger Kolleginnen und Kollegen?', options: ['Sie lehnen Zusammenarbeit grundsaetzlich ab.', 'Sie befuerchten weniger Flexibilitaet.', 'Sie verstehen Feierabend nicht.', 'Sie wollen nur telefonisch arbeiten.'], answer: 1, explanation: 'Im Text steht, dass manche skeptisch reagieren, weil sie Flexibilitaet verlieren koennten.' },
      { question: 'Welche Schlussfolgerung passt am besten?', options: ['Grenzen verhindern Zusammenarbeit.', 'Klare Regeln koennen Zusammenarbeit planbarer machen.', 'Schnelle Antworten sind immer professioneller.', 'Private Zeit ist beruflich unwichtig.'], answer: 1, explanation: 'Am Ende erkennen viele, dass klare Grenzen die Zusammenarbeit verlaesslicher machen.' },
    ],
  },
  grammar: [
    { question: 'Welche Funktion hat "Wenn eine Nachricht unbeantwortet bleibt"?', options: ['Konditionaler Nebensatz', 'Relativsatz', 'Infinitivsatz', 'Indirekte Rede'], answer: 0, explanation: '"Wenn" leitet hier einen Nebensatz ein; das finite Verb steht am Ende.' },
    { question: 'Warum steht "als nehme sie ihre Aufgaben nicht ernst"?', options: ['Konjunktiv I zur Wiedergabe eines Eindrucks', 'Imperativ', 'Passiv Praeteritum', 'Futur II'], answer: 0, explanation: 'Nach vergleichendem "als" kann Konjunktiv I stehen: als nehme sie...' },
    { question: 'Welche Umformung ist korrekt?', options: ['Auf normale Nachrichten kann bis morgen gewartet werden.', 'Normale Nachrichten sind gewartet.', 'Normale Nachrichten werden warten lassen.', 'Normale Nachrichten lassen sich warten.'], answer: 0, explanation: 'Das unpersoenliche Passiv mit "kann ... gewartet werden" ist grammatisch moeglich.' },
    { question: 'Welche Bedeutung hat "nicht ..., sondern ..."?', options: ['Gegensatz und Korrektur', 'Grund und Folge', 'Zeitliche Reihenfolge', 'Vermutung'], answer: 0, explanation: 'Die Struktur korrigiert eine Erwartung: nicht gegen Zusammenarbeit, sondern verlaesslicher.' },
    { question: 'Welche Form ist standardsprachlich korrekt?', options: ['wegen der Flexibilitaet', 'wegen die Flexibilitaet', 'wegen den Flexibilitaet', 'wegen dem Flexibilitaet'], answer: 0, explanation: '"Wegen" steht in Standardsprache mit Genitiv: wegen der Flexibilitaet.' },
  ],
  listening: {
    title: 'Eine Diskussion im Team',
    text: 'In unserem Team ist niemand verpflichtet, nach Feierabend zu antworten. Trotzdem haben viele das Gefuehl, sie muessten kurz reagieren, sobald eine Nachricht erscheint. Ich schlage deshalb vor, zwischen echten Notfaellen und normalen Rueckfragen zu unterscheiden. Wenn etwas dringend ist, sollte man anrufen. Alles andere kann bis zum naechsten Morgen warten. So bleiben wir flexibel, ohne staendig unter Druck zu stehen.',
    questions: [
      { question: 'Was ist laut Hoertext nicht offiziell vorgeschrieben?', options: ['Nach Feierabend zu antworten', 'Morgens zu arbeiten', 'Telefonisch erreichbar zu sein', 'Im Team zu diskutieren'], answer: 0, explanation: 'Es wird gesagt, dass niemand verpflichtet ist, nach Feierabend zu antworten.' },
      { question: 'Welches Gefuehl beschreibt der Sprecher?', options: ['Viele fuehlen sich zu kurzen Reaktionen gedraengt.', 'Viele wollen keine Nachrichten mehr bekommen.', 'Viele verstehen die Aufgaben nicht.', 'Viele arbeiten nur nachts gut.'], answer: 0, explanation: 'Der Hoertext spricht von dem Gefuehl, kurz reagieren zu muessen.' },
      { question: 'Was soll telefonisch passieren?', options: ['Jede normale Rueckfrage', 'Nur echte Notfaelle oder Dringendes', 'Jede Nachricht nach 18 Uhr', 'Alle Besprechungen'], answer: 1, explanation: 'Bei Dringendem soll man anrufen.' },
      { question: 'Welche Balance wird gesucht?', options: ['Flexibilitaet ohne staendigen Druck', 'Mehr Kontrolle und weniger Vertrauen', 'Schnellere Antworten ohne Regeln', 'Weniger Zusammenarbeit'], answer: 0, explanation: 'Der letzte Satz nennt genau diese Balance.' },
      { question: 'Wie unterscheidet sich der Hoertext vom Lesetext?', options: ['Er formuliert den Vorschlag direkter.', 'Er widerspricht dem Lesetext.', 'Er handelt von einem Arzttermin.', 'Er verbietet Flexibilitaet.'], answer: 0, explanation: 'Der Hoertext klingt wie ein direkter Beitrag in einer Diskussion.' },
    ],
  },
  writing: {
    prompt: 'Schreibe einen kurzen Diskussionsbeitrag: Soll man nach Feierabend fuer Arbeit erreichbar sein? Begruende deine Meinung mit mindestens zwei Argumenten und einem konkreten Beispiel.',
    checklist: ['klare Position', 'zwei Argumente', 'ein Alltagsbeispiel', 'Gegenargument kurz nennen', 'ruhiger B2-Stil'],
  },
}

const contentPrompt = `Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
Niveau: B2. Thema soll aus echter täglicher Sprachbenutzung kommen: Arbeit, Familie, Behörden, Gesundheit, Wohnung, Konflikte, Diskussionen, Meinung äußern, Entscheidungen begründen.
Der Stil soll natürlich und alltagsnah sein, aber nicht einfach. Keine Kindersprache, keine A2/B1-Übungen.

Schema:
{
  "id": "deutsch-YYYY-MM-DD-kurzer-slug",
  "date": "YYYY-MM-DD",
  "level": "B2",
  "title": "...",
  "topic": "...",
  "reading": {
    "title": "...",
    "text": "170-230 Wörter auf Deutsch mit B2-Satzbau",
    "vocabulary": [
      { "term": "...", "de": "einfache Erklärung auf Deutsch", "fa": "persische Bedeutung", "example": "deutscher Beispielsatz" }
    ],
    "questions": [
      { "question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..." }
    ]
  },
  "grammar": [
    { "question": "Grammatikfrage aus einem Satz des Lesetextes", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "kurze Erklärung" }
  ],
  "listening": {
    "title": "...",
    "text": "ähnlicher Text mit ähnlichen Wörtern, aber nicht identisch",
    "questions": [
      { "question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..." }
    ]
  },
  "writing": {
    "prompt": "konkrete Schreibaufgabe",
    "checklist": ["...", "...", "..."]
  }
}

Regeln:
- genau 5 reading.questions
- genau 5 grammar Fragen
- genau 5 listening.questions
- mindestens 8 vocabulary Einträge
- answer ist der Index der richtigen Option, beginnend bei 0
- vocabulary.term muss exakt im Lesetext vorkommen, wenn möglich
- MCQs müssen schwierig sein: Bedeutung, Schlussfolgerung, Haltung, indirekte Aussage, nicht nur Wortsuche
- Grammatikfragen müssen aus echten Sätzen des Lesetextes kommen: Konjunktiv, Nebensatz, Passiv, Präposition, Satzstellung, Nominalisierung
- Der Hörtext soll ähnliche Wörter nutzen, aber ein anderer Text sein
- Die Schreibaufgabe soll eine Meinung oder Entscheidung verlangen`

function normalizeState(value) {
  return {
    lessons: Array.isArray(value?.lessons) ? value.lessons : [],
    cards: Array.isArray(value?.cards) ? value.cards : [],
    reviews: Array.isArray(value?.reviews) ? value.reviews : [],
    writings: Array.isArray(value?.writings) ? value.writings : [],
    answers: value?.answers && typeof value.answers === 'object' ? value.answers : {},
  }
}

function dueDateForBox(box) {
  const date = new Date()
  date.setHours(8, 0, 0, 0)
  date.setTime(date.getTime() + (INTERVALS[Math.min(box, INTERVALS.length - 1)] || 0) * DAY)
  return date.toISOString()
}

function isDue(card) {
  return !card.dueAt || new Date(card.dueAt) <= new Date()
}

function isToday(value) {
  return typeof value === 'string' && value.slice(0, 10) === todayIso()
}

function getLessonQuestions(lesson) {
  return [
    ...(lesson?.reading?.questions || []).map((_, index) => `${lesson.id}-reading-${index}`),
    ...(lesson?.grammar || []).map((_, index) => `${lesson.id}-grammar-${index}`),
    ...(lesson?.listening?.questions || []).map((_, index) => `${lesson.id}-listening-${index}`),
  ]
}

function getLessonProgress(lesson, answers) {
  const keys = getLessonQuestions(lesson)
  if (!keys.length) return 0
  const done = keys.filter(key => typeof answers[key] === 'number').length
  return Math.round((done / keys.length) * 100)
}

function speak(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.88
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
  return true
}

function tokenizeText(text, vocabulary, onWordClick) {
  const terms = [...vocabulary].sort((a, b) => b.term.length - a.term.length)
  const pattern = terms.length
    ? new RegExp(`(${terms.map(item => item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    : null
  const wordPattern = /^([\p{L}ÄÖÜäöüß-]{3,})$/u

  const parts = pattern ? text.split(pattern) : text.split(/(\s+|[.,!?;:()]+)/)
  return parts.map((part, index) => {
    const match = terms.find(item => item.term.toLowerCase() === part.toLowerCase())
    if (!match && !wordPattern.test(part)) return <span key={`${part}-${index}`}>{part}</span>
    const word = match || {
      term: part,
      de: 'Für dieses Wort ist in dieser Lektion noch keine vorbereitete Erklärung gespeichert.',
      fa: 'برای این واژه هنوز توضیح آماده ذخیره نشده است.',
      example: '',
      incomplete: true,
    }
    return (
      <button type="button" key={`${part}-${index}`} className={match ? styles.wordBtn : styles.plainWordBtn} onClick={() => onWordClick(word)}>
        {part}
      </button>
    )
  })
}

function QuestionBlock({ id, items, answers, onAnswer }) {
  return (
    <div className={styles.questionList}>
      {items.map((item, index) => {
        const key = `${id}-${index}`
        const selected = answers[key]
        const answered = typeof selected === 'number'
        return (
          <article className={styles.questionCard} key={key}>
            <div className={styles.questionTop}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.question}</strong>
            </div>
            <div className={styles.optionsGrid}>
              {(item.options || []).map((option, optionIndex) => {
                const isSelected = selected === optionIndex
                const isCorrect = item.answer === optionIndex
                const className = [
                  styles.optionBtn,
                  answered && isCorrect ? styles.correct : '',
                  answered && isSelected && !isCorrect ? styles.wrong : '',
                ].filter(Boolean).join(' ')
                return (
                  <button type="button" className={className} key={option} onClick={() => onAnswer(key, optionIndex)}>
                    {option}
                  </button>
                )
              })}
            </div>
            {answered && <p className={styles.explanation}>{item.explanation}</p>}
          </article>
        )
      })}
    </div>
  )
}

function MarkedCorrection({ correction }) {
  const segments = Array.isArray(correction?.annotatedCorrection)
    ? correction.annotatedCorrection.filter(segment => typeof segment?.text === 'string' && segment.text)
    : []

  if (!segments.length) return <p>{correction?.corrected || ''}</p>

  return (
    <p className={styles.markedCorrection}>
      {segments.map((segment, index) => {
        const className = segment.type === 'addition'
          ? styles.markAddition
          : segment.type === 'correction'
            ? styles.markCorrection
            : ''
        return className
          ? <span className={className} key={`${segment.text}-${index}`}>{segment.text}</span>
          : <span key={`${segment.text}-${index}`}>{segment.text}</span>
      })}
    </p>
  )
}

export default function DeutschPage({
  initialLessonId = '',
  lessonMode = false,
  apiBase = '/api/andarun/deutsch',
  correctEndpoint = '/api/andarun/deutsch/correct',
  homeHref = '/andarun',
  homeLabel = 'Privat',
  courseHref = '/andarun/deutsch',
  lessonBase = '/andarun/deutsch',
  canImport = true,
  theme = 'dark',
}) {
  const [state, setState] = useState(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeLessonId, setActiveLessonId] = useState('')
  const [activeTab, setActiveTab] = useState(lessonMode ? 'lesen' : 'home')
  const [selectedWord, setSelectedWord] = useState(null)
  const [importText, setImportText] = useState('')
  const [writingText, setWritingText] = useState('')
  const [correction, setCorrection] = useState(null)
  const [correcting, setCorrecting] = useState(false)
  const [message, setMessage] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const [flashOpen, setFlashOpen] = useState(false)
  const [flashView, setFlashView] = useState({ mode: 'boxes', box: 0, practice: false })
  const [showBack, setShowBack] = useState(false)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [visualTheme, setVisualTheme] = useState(theme)
  const saveTimer = useRef(null)
  const localStorageKey = `deutsch_state_${apiBase.replace(/[^a-z0-9]/gi, '_')}`

  function readLocalState() {
    try {
      const local = window.localStorage.getItem(localStorageKey)
      return local ? normalizeState(JSON.parse(local)) : null
    } catch {
      return null
    }
  }

  function writeLocalState(nextState) {
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(normalizeState(nextState)))
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    let ignore = false
    fetch(apiBase)
      .then(res => res.ok ? res.json() : Promise.reject(new Error('load failed')))
      .then(data => {
        if (ignore) return
        const loaded = normalizeState(data.state)
        loaded.lessons = loaded.lessons.map(lesson => lesson.id === sampleLesson.id ? upgradedSampleLesson : lesson)
        if (!loaded.lessons.length) {
          loaded.lessons = [upgradedSampleLesson]
        }
        setState(loaded)
        const preferredLesson = loaded.lessons.find(lesson => lesson.id === initialLessonId)
        setActiveLessonId(preferredLesson?.id || loaded.lessons[0]?.id || upgradedSampleLesson.id)
      })
      .catch(() => {
        const fallback = readLocalState() || { ...emptyState, lessons: [upgradedSampleLesson] }
        setState(fallback)
        setActiveLessonId(initialLessonId || fallback.lessons[0]?.id || upgradedSampleLesson.id)
        setMessage('Online-Speicherung ist gerade nicht erreichbar. Dein Fortschritt wird lokal auf diesem Gerät gespeichert.')
      })
      .finally(() => !ignore && setLoading(false))
    return () => { ignore = true }
  }, [initialLessonId, lessonMode, apiBase])

  useEffect(() => {
    const stored = window.localStorage.getItem('andarun-deutsch-theme')
    if (stored === 'dark' || stored === 'light') setVisualTheme(stored)
  }, [])

  function toggleVisualTheme() {
    const next = visualTheme === 'dark' ? 'light' : 'dark'
    setVisualTheme(next)
    window.localStorage.setItem('andarun-deutsch-theme', next)
  }

  function persist(nextState) {
    setState(nextState)
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(async () => {
      setSaving(true)
      try {
        const res = await fetch(apiBase, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: nextState }),
        })
        if (!res.ok) throw new Error('save failed')
        const data = await res.json()
        setState(normalizeState(data.state))
        setMessage('Gespeichert.')
      } catch {
        const stored = writeLocalState(nextState)
        setMessage(stored ? 'Lokal gespeichert. Online-Speicherung ist gerade nicht erreichbar.' : 'Speichern ist gerade nicht möglich.')
      } finally {
        setSaving(false)
      }
    }, 450)
  }

  const activeLesson = useMemo(
    () => state.lessons.find(lesson => lesson.id === activeLessonId) || state.lessons[0] || upgradedSampleLesson,
    [state.lessons, activeLessonId]
  )
  const sortedLessons = useMemo(
    () => [...state.lessons].sort((a, b) => `${b.date || ''}`.localeCompare(`${a.date || ''}`)),
    [state.lessons]
  )
  const dueCards = useMemo(() => state.cards.filter(isDue), [state.cards])
  const nextCard = dueCards[0]
  const learnedWords = new Set(state.cards.map(card => card.term.toLowerCase()))
  const dueDoneToday = useMemo(() => state.reviews.filter(review => isToday(review.at)).length, [state.reviews])
  const flashCards = useMemo(() => {
    if (flashView.practice) return state.cards
    return state.cards.filter(card => (card.box || 0) === flashView.box && isDue(card))
  }, [flashView, state.cards])
  const activeFlashCard = flashView.practice ? flashCards[practiceIndex % Math.max(flashCards.length, 1)] : flashCards[0]
  const lessonWritings = useMemo(
    () => state.writings.filter(item => item.lessonId === activeLesson.id),
    [state.writings, activeLesson.id]
  )

  function answerQuestion(key, optionIndex) {
    persist({ ...state, answers: { ...state.answers, [key]: optionIndex } })
  }

  function addWordCard(word) {
    const cardId = `${activeLesson.id}-${word.term.toLowerCase().replace(/\s+/g, '-')}`
    if (state.cards.some(card => card.id === cardId)) {
      setMessage('Diese Karte ist schon gespeichert.')
      return
    }
    if (word.incomplete) {
      setMessage('Für dieses Wort fehlt noch eine gute Erklärung. Besser in der nächsten KI-Lektion ins Vokabular aufnehmen.')
      return
    }
    const card = {
      id: cardId,
      lessonId: activeLesson.id,
      type: 'word',
      term: word.term,
      front: word.term,
      back: `${word.de}\n\nPersisch: ${word.fa}`,
      de: word.de,
      fa: word.fa,
      example: word.example || '',
      box: 0,
      dueAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    persist({ ...state, cards: [card, ...state.cards] })
    setMessage(`"${word.term}" wurde als Flashcard gespeichert.`)
  }

  function reviewCard(card, knew) {
    const quality = knew ? 'known' : 'unknown'
    const box = knew ? Math.min((card.box || 0) + 1, INTERVALS.length - 1) : 0
    const nextCardState = { ...card, box, dueAt: dueDateForBox(box), lastReviewedAt: new Date().toISOString() }
    setShowBack(false)
    persist({
      ...state,
      cards: state.cards.map(item => item.id === card.id ? nextCardState : item),
      reviews: [...state.reviews, { id: uid('review'), cardId: card.id, quality, at: new Date().toISOString() }],
    })
  }

  function importLesson() {
    try {
      const lesson = JSON.parse(importText)
      if (!lesson.id || !lesson.title || !lesson.reading?.text) throw new Error('bad lesson')
      const lessons = [lesson, ...state.lessons.filter(item => item.id !== lesson.id)]
      persist({ ...state, lessons })
      setActiveLessonId(lesson.id)
      setActiveTab('home')
      setImportText('')
      setImportOpen(false)
      setMessage('Neue Lektion importiert.')
    } catch {
      setMessage('JSON konnte nicht als Lektion gelesen werden.')
    }
  }

  function saveWritingDraft() {
    if (!writingText.trim()) return
    persist({
      ...state,
      writings: [{
        id: uid('writing'),
        lessonId: activeLesson.id,
        task: activeLesson.writing?.prompt || '',
        text: writingText.trim(),
        correction,
        createdAt: new Date().toISOString(),
      }, ...state.writings],
    })
    setMessage('Schreibtext gespeichert.')
  }

  async function correctWriting() {
    if (!writingText.trim()) {
      setMessage('Schreibe zuerst einen Text.')
      return
    }
    setCorrecting(true)
    setCorrection(null)
    try {
      const res = await fetch(correctEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: writingText,
          task: activeLesson.writing?.prompt || '',
          checklist: activeLesson.writing?.checklist || [],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'KI nicht verfügbar')
      const nextCorrection = data.result
      setCorrection(nextCorrection)
      persist({
        ...state,
        writings: [{
          id: uid('writing'),
          lessonId: activeLesson.id,
          task: activeLesson.writing?.prompt || '',
          checklist: activeLesson.writing?.checklist || [],
          text: writingText.trim(),
          correction: nextCorrection,
          createdAt: new Date().toISOString(),
        }, ...state.writings],
      })
      setMessage('KI-Korrektur ist fertig und gespeichert.')
    } catch (error) {
      setMessage(error.message || 'KI-Korrektur ist gerade nicht verfügbar.')
    } finally {
      setCorrecting(false)
    }
  }

  function addMistakeCard(mistake) {
    const card = {
      id: uid('mistake'),
      lessonId: activeLesson.id,
      type: 'mistake',
      term: mistake.correct || mistake.cardBack || 'Fehlerkarte',
      front: mistake.cardFront || `Korrigiere: ${mistake.wrong}`,
      back: mistake.cardBack || mistake.correct,
      de: mistake.reason || '',
      fa: '',
      example: mistake.correct || '',
      box: 0,
      dueAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    persist({ ...state, cards: [card, ...state.cards] })
    setMessage('Fehler wurde als Wiederholungskarte gespeichert.')
  }

  return (
    <main className={`${styles.shell} ${visualTheme === 'light' ? styles.lightShell : ''}`}>
      <header className={`${styles.hero} ${!lessonMode ? styles.heroSimple : ''}`}>
        <div>
          <div className={styles.heroNav}>
            <Link className={styles.backLink} href={lessonMode ? courseHref : homeHref}>← {lessonMode ? 'Kurs' : homeLabel}</Link>
            <button type="button" className={styles.themeToggle} onClick={toggleVisualTheme} aria-label="Farbschema wechseln">
              <span>{visualTheme === 'dark' ? '☾' : '☼'}</span>
              {visualTheme === 'dark' ? 'Galaxy' : 'Heaven'}
            </button>
          </div>
          <span className={styles.kicker}>{lessonMode ? `${activeLesson.level} · Lektion` : 'Deutsch · B2'}</span>
          <h1>{lessonMode ? activeLesson.title : <>Deutsch<br/><em>lernen.</em></>}</h1>
          <p>{lessonMode ? activeLesson.topic : 'Lesen. Testen. Sprechen.'}</p>
          {!lessonMode && canImport && (
            <button type="button" className={styles.importMiniBtn} onClick={() => setImportOpen(true)}>
              Import
            </button>
          )}
        </div>
        {lessonMode && <div className={styles.heroStats}>
          <span><strong>{getLessonProgress(activeLesson, state.answers)}%</strong>Fortschritt</span>
          <span><strong>{dueCards.length}</strong>fällig</span>
          <span><strong>{state.cards.length}</strong>Wörter</span>
        </div>}
      </header>

      {message && <div className={styles.status}>{message} {saving ? 'Speichert...' : ''}</div>}

      {lessonMode && (
        <>
          <nav className={styles.tabs} aria-label="Deutschbereiche">
            {[
              ['lesen', '01 · Lesen'],
              ['grammatik', '02 · Test'],
              ['hoeren', '03 · Hören'],
              ['schreiben', '04 · Schreiben'],
            ].map(([id, label]) => (
              <button type="button" key={id} className={activeTab === id ? styles.activeTab : ''} onClick={() => setActiveTab(id)}>
                {label}
              </button>
            ))}
          </nav>

          <section className={styles.dashboard}>
            <article className={styles.reviewPanel}>
              <div className={styles.panelHead}>
                <span>Wiederholung</span>
                <strong>{dueCards.length ? 'Heute dran' : 'Alles ruhig'}</strong>
              </div>
              {nextCard ? (
                <div className={styles.reviewCard}>
                  <small>{nextCard.type === 'mistake' ? 'Fehlerkarte' : 'Wortkarte'} · Box {nextCard.box + 1}</small>
                  <h2>{nextCard.front}</h2>
                  <p>{nextCard.back}</p>
                  {nextCard.example && <em>{nextCard.example}</em>}
                  <div className={styles.reviewActions}>
                    <button type="button" className={styles.missedBtn} onClick={() => reviewCard(nextCard, false)}>Nicht gewusst</button>
                    <button type="button" className={styles.knewBtn} onClick={() => reviewCard(nextCard, true)}>Gewusst</button>
                  </div>
                </div>
              ) : (
                <p className={styles.empty}>Alles wiederholt. ✦</p>
              )}
            </article>

            <aside className={styles.lessonPicker}>
              <div className={styles.panelHead}>
                <span>Lektionen</span>
                <strong>{activeLesson.title}</strong>
              </div>
              <div className={styles.lessonList}>
                {sortedLessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    className={lesson.id === activeLesson.id ? styles.activeLesson : ''}
                    href={`${lessonBase}/${lesson.id}`}
                  >
                    <span>{String(index + 1).padStart(2, '0')} · {lesson.level}</span>
                    <strong>{lesson.title}</strong>
                  </Link>
                ))}
              </div>
            </aside>
          </section>

        </>
      )}

      {!lessonMode && activeTab === 'home' && (
        <section className={styles.homeGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Dein Kurs</span>
              <strong>{state.lessons.length} Lektionen</strong>
            </div>
            <div className={styles.lessonRows}>
              {sortedLessons.map((lesson, index) => {
                const progress = getLessonProgress(lesson, state.answers)
                return (
                  <Link
                    className={styles.lessonRow}
                    key={lesson.id}
                    href={`${lessonBase}/${lesson.id}`}
                  >
                    <span className={styles.lessonNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <span>{lesson.level} · {lesson.date}</span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.topic}</small>
                    </div>
                    <div className={styles.progressWrap} aria-label={`${progress}% gelernt`}>
                      <b>{progress === 100 ? 'vollständig' : `${progress}%`}</b>
                      <i><em style={{ width: `${progress}%` }} /></i>
                    </div>
                  </Link>
                )
              })}
            </div>
          </article>

          <aside className={styles.flashPanel}>
            <div className={styles.panelHead}>
              <span>Quick Practice</span>
              <strong>Flashcards</strong>
            </div>
            <div className={styles.flashNumbers}>
              <span><strong>{dueCards.length}</strong>fällig</span>
              <span><strong>{dueDoneToday}</strong>erledigt</span>
              <span><strong>{state.cards.length}</strong>gesamt</span>
            </div>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                setFlashView({ mode: 'boxes', box: 0, practice: false })
                setShowBack(false)
                setFlashOpen(true)
              }}
            >
              Training starten →
            </button>
          </aside>
        </section>
      )}

      {activeTab === 'lesen' && (
        <section className={styles.lessonGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>{activeLesson.level} · {activeLesson.topic}</span>
              <strong>{activeLesson.reading.title}</strong>
            </div>
            <p className={styles.readingText}>
              {tokenizeText(activeLesson.reading.text, activeLesson.reading.vocabulary || [], setSelectedWord)}
            </p>
            <div className={styles.wordShelf}>
              {(activeLesson.reading.vocabulary || []).map(word => (
                <button type="button" key={word.term} onClick={() => setSelectedWord(word)} className={learnedWords.has(word.term.toLowerCase()) ? styles.savedWord : ''}>
                  {word.term}
                </button>
              ))}
            </div>
          </article>
          <QuestionBlock id={`${activeLesson.id}-reading`} items={activeLesson.reading.questions || []} answers={state.answers} onAnswer={answerQuestion} />
        </section>
      )}

      {activeTab === 'grammatik' && (
        <section className={styles.singleSection}>
          <div className={styles.sectionIntro}>
            <span>Aus dem Lesetext</span>
            <h2>Grammatik in echten Sätzen</h2>
          </div>
          <QuestionBlock id={`${activeLesson.id}-grammar`} items={activeLesson.grammar || []} answers={state.answers} onAnswer={answerQuestion} />
        </section>
      )}

      {activeTab === 'hoeren' && (
        <section className={styles.lessonGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Hören</span>
              <strong>{activeLesson.listening.title}</strong>
            </div>
            <p className={styles.listeningHint}>Höre zuerst ohne mitzulesen. Danach kannst du den Text öffnen und die Fragen beantworten.</p>
            <button type="button" className={styles.primaryBtn} onClick={() => speak(activeLesson.listening.text)}>Vorlesen</button>
            <details className={styles.transcript}>
              <summary>Transkript anzeigen</summary>
              <p>{activeLesson.listening.text}</p>
            </details>
          </article>
          <QuestionBlock id={`${activeLesson.id}-listening`} items={activeLesson.listening.questions || []} answers={state.answers} onAnswer={answerQuestion} />
        </section>
      )}

      {activeTab === 'schreiben' && (
        <section className={styles.writingGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Schreiben</span>
              <strong>Tagesaufgabe</strong>
            </div>
            <p className={styles.taskText}>{activeLesson.writing?.prompt}</p>
            <ul className={styles.checklist}>
              {(activeLesson.writing?.checklist || []).map(item => <li key={item}>{item}</li>)}
            </ul>
            <textarea value={writingText} onChange={event => setWritingText(event.target.value)} placeholder="Schreibe hier deinen Text..." />
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} onClick={correctWriting} disabled={correcting}>{correcting ? 'Korrigiert...' : 'Mit KI korrigieren'}</button>
              <button type="button" onClick={saveWritingDraft}>Speichern</button>
            </div>
            {!!lessonWritings.length && (
              <section className={styles.writingHistory}>
                <h3>Gespeicherte Texte</h3>
                {lessonWritings.slice(0, 6).map(item => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setWritingText(item.text || '')
                      setCorrection(item.correction || null)
                      setMessage('Gespeicherte Korrektur geladen.')
                    }}
                  >
                    <span>{new Date(item.createdAt).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    <strong>{item.correction ? 'mit KI-Korrektur' : 'Entwurf'}</strong>
                    <small>{(item.text || '').slice(0, 120)}{(item.text || '').length > 120 ? '...' : ''}</small>
                  </button>
                ))}
              </section>
            )}
          </article>

          <article className={styles.correctionPanel}>
            <div className={styles.panelHead}>
              <span>KI-Rückmeldung</span>
              <strong>{correction ? 'Korrektur' : 'Bereit'}</strong>
            </div>
            {correction ? (
              <>
                {correction.taskFulfillment && (
                  <div className={styles.fulfillmentBox}>
                    <span>{correction.taskFulfillment.status || 'Aufgabenbezug'}</span>
                    <strong>{typeof correction.taskFulfillment.score === 'number' ? `${correction.taskFulfillment.score}%` : 'Bewertet'}</strong>
                    <p>{correction.taskFulfillment.feedback}</p>
                    {!!correction.taskFulfillment.missingPoints?.length && (
                      <>
                        <h4>Fehlende Punkte</h4>
                        <ul>
                          {correction.taskFulfillment.missingPoints.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                        </ul>
                      </>
                    )}
                    {!!correction.taskFulfillment.offTopicParts?.length && (
                      <>
                        <h4>Nicht passend zur Aufgabe</h4>
                        <ul>
                          {correction.taskFulfillment.offTopicParts.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                <h3>Korrigierte Version</h3>
                <MarkedCorrection correction={correction} />
                {!!correction.annotatedCorrection?.length && (
                  <div className={styles.markLegend} aria-label="Markierungslegende">
                    <span><i className={styles.legendCorrection} /> rot: korrigiert</span>
                    <span><i className={styles.legendAddition} /> gelb: ergänzt</span>
                  </div>
                )}
                {correction.teacherVersion && (
                  <>
                    <h3>Passende Musterlösung</h3>
                    <p>{correction.teacherVersion}</p>
                  </>
                )}
                {!!correction.grammarErrors?.length && (
                  <>
                    <h3>Relevante Grammatikfehler</h3>
                    <ol className={styles.grammarList}>
                      {correction.grammarErrors.map((error, index) => (
                        <li key={`${error.wrong}-${index}`}>
                          <strong>{error.wrong} → {error.correct}</strong>
                          <span>{error.rule}</span>
                          {error.example && <em>{error.example}</em>}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                <h3>Weitere wichtige Fehler</h3>
                {(correction.mistakes || []).map((mistake, index) => (
                  <div className={styles.mistakeRow} key={`${mistake.wrong}-${index}`}>
                    <strong>{mistake.wrong} → {mistake.correct}</strong>
                    <span>{mistake.type ? `${mistake.type}: ` : ''}{mistake.reason}</span>
                    <button type="button" onClick={() => addMistakeCard(mistake)}>Als Karte speichern</button>
                  </div>
                ))}
                {correction.nextStep && (
                  <>
                    <h3>Nächster Schritt</h3>
                    <p>{correction.nextStep}</p>
                  </>
                )}
              </>
            ) : (
              <p className={styles.empty}>Hier erscheint die KI-Korrektur, sobald der KI-Anbieter online konfiguriert ist.</p>
            )}
          </article>
        </section>
      )}

      {importOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setImportOpen(false)}>
          <section className={styles.importModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setImportOpen(false)}>Schließen</button>
            <span>Import</span>
            <h2>Neue Lektion</h2>
            <textarea value={importText} onChange={event => setImportText(event.target.value)} placeholder="Hier das JSON von ChatGPT einfügen..." />
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} onClick={importLesson}>Lektion importieren</button>
              <button type="button" onClick={() => navigator.clipboard?.writeText(contentPrompt).then(() => setMessage('Prompt kopiert.'))}>Prompt kopieren</button>
            </div>
            <details className={styles.promptDetails}>
              <summary>Prompt anzeigen</summary>
              <textarea readOnly value={contentPrompt} className={styles.promptBox} />
            </details>
          </section>
        </div>
      )}

      {flashOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setFlashOpen(false)}>
          <section className={styles.flashModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setFlashOpen(false)}>Schließen</button>
            <span>Leitner</span>
            <h2>Flashcards</h2>

            {flashView.mode === 'boxes' && (
              <>
                <div className={styles.boxGrid}>
                  {LEITNER_BOXES.map(box => {
                    const cards = state.cards.filter(card => (card.box || 0) === box)
                    const due = cards.filter(isDue)
                    return (
                      <button
                        type="button"
                        className={styles.boxBtn}
                        key={box}
                        onClick={() => {
                          setFlashView({ mode: 'review', box, practice: false })
                          setShowBack(false)
                        }}
                      >
                        <strong>Box {box + 1}</strong>
                        <span>{due.length} fällig · {cards.length} gesamt</span>
                      </button>
                    )
                  })}
                </div>
                <button
                  type="button"
                  className={styles.practiceAllBtn}
                  onClick={() => {
                    setFlashView({ mode: 'review', box: 0, practice: true })
                    setPracticeIndex(0)
                    setShowBack(false)
                  }}
                >
                  Alle Karten ansehen
                </button>
              </>
            )}

            {flashView.mode === 'review' && (
              <div className={styles.flashReview}>
                <button type="button" className={styles.ghostBtn} onClick={() => setFlashView({ mode: 'boxes', box: 0, practice: false })}>Zurück zu Boxen</button>
                {activeFlashCard ? (
                  <article className={styles.flashCardFace}>
                    <small>{flashView.practice ? 'Ansehen ohne Speichern' : `Box ${flashView.box + 1}`}</small>
                    <h3>{activeFlashCard.front}</h3>
                    {showBack && <p>{activeFlashCard.back}</p>}
                    {!showBack ? (
                      <button type="button" className={styles.primaryBtn} onClick={() => setShowBack(true)}>Antwort zeigen</button>
                    ) : flashView.practice ? (
                      <button type="button" onClick={() => {
                        setPracticeIndex(index => index + 1)
                        setShowBack(false)
                      }}>Nächste ansehen</button>
                    ) : (
                      <div className={styles.reviewActions}>
                        <button type="button" className={styles.missedBtn} onClick={() => reviewCard(activeFlashCard, false)}>Nicht gewusst</button>
                        <button type="button" className={styles.knewBtn} onClick={() => reviewCard(activeFlashCard, true)}>Gewusst</button>
                      </div>
                    )}
                  </article>
                ) : (
                  <p className={styles.empty}>{flashView.practice ? 'Noch keine Karten gespeichert.' : 'In dieser Box ist gerade nichts fällig.'}</p>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {selectedWord && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setSelectedWord(null)}>
          <section className={styles.wordModal} role="dialog" aria-modal="true" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setSelectedWord(null)}>Schließen</button>
            <span>Wortkarte</span>
            <h2>{selectedWord.term}</h2>
            <p><strong>Deutsch:</strong> {selectedWord.de}</p>
            <p><strong>Persisch:</strong> {selectedWord.fa}</p>
            {selectedWord.example && <em>{selectedWord.example}</em>}
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn} onClick={() => addWordCard(selectedWord)}>Als Flashcard speichern</button>
              <button type="button" onClick={() => speak(selectedWord.example || selectedWord.term)}>Anhören</button>
            </div>
          </section>
        </div>
      )}

      {loading && <div className={styles.loading}>Lade Deutschlernen...</div>}
    </main>
  )
}
