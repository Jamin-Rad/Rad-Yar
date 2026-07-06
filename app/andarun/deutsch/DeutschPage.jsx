'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const DAY = 24 * 60 * 60 * 1000
const INTERVALS = [0, 1, 3, 7, 14, 30]

const todayIso = () => new Date().toISOString().slice(0, 10)
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

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

const contentPrompt = `Erstelle eine Tageslektion Deutsch für Andarun als reines JSON ohne Markdown.
Niveau: B1/B2, anspruchsvoll, aber alltagsnah.

Schema:
{
  "id": "deutsch-YYYY-MM-DD-kurzer-slug",
  "date": "YYYY-MM-DD",
  "level": "B1/B2",
  "title": "...",
  "topic": "...",
  "reading": {
    "title": "...",
    "text": "120-180 Wörter auf Deutsch",
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
- vocabulary.term muss exakt im Lesetext vorkommen, wenn möglich`

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

export default function DeutschPage() {
  const [state, setState] = useState(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeLessonId, setActiveLessonId] = useState('')
  const [activeTab, setActiveTab] = useState('lesen')
  const [selectedWord, setSelectedWord] = useState(null)
  const [importText, setImportText] = useState('')
  const [writingText, setWritingText] = useState('')
  const [correction, setCorrection] = useState(null)
  const [correcting, setCorrecting] = useState(false)
  const [message, setMessage] = useState('')
  const saveTimer = useRef(null)

  useEffect(() => {
    let ignore = false
    fetch('/api/andarun/deutsch')
      .then(res => res.ok ? res.json() : Promise.reject(new Error('load failed')))
      .then(data => {
        if (ignore) return
        const loaded = normalizeState(data.state)
        if (!loaded.lessons.length) loaded.lessons = [sampleLesson]
        setState(loaded)
        setActiveLessonId(loaded.lessons[0]?.id || sampleLesson.id)
      })
      .catch(() => {
        const fallback = { ...emptyState, lessons: [sampleLesson] }
        setState(fallback)
        setActiveLessonId(sampleLesson.id)
        setMessage('Online-Speicherung ist gerade nicht erreichbar. Änderungen bleiben in dieser Sitzung sichtbar.')
      })
      .finally(() => !ignore && setLoading(false))
    return () => { ignore = true }
  }, [])

  function persist(nextState) {
    setState(nextState)
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(async () => {
      setSaving(true)
      try {
        const res = await fetch('/api/andarun/deutsch', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: nextState }),
        })
        if (!res.ok) throw new Error('save failed')
        const data = await res.json()
        setState(normalizeState(data.state))
        setMessage('Gespeichert.')
      } catch {
        setMessage('Speichern online fehlgeschlagen.')
      } finally {
        setSaving(false)
      }
    }, 450)
  }

  const activeLesson = useMemo(
    () => state.lessons.find(lesson => lesson.id === activeLessonId) || state.lessons[0] || sampleLesson,
    [state.lessons, activeLessonId]
  )
  const dueCards = useMemo(() => state.cards.filter(isDue), [state.cards])
  const nextCard = dueCards[0]
  const learnedWords = new Set(state.cards.map(card => card.term.toLowerCase()))

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

  function reviewCard(card, quality) {
    const box = quality === 'hard' ? 0 : Math.min((card.box || 0) + (quality === 'easy' ? 2 : 1), INTERVALS.length - 1)
    const nextCardState = { ...card, box, dueAt: dueDateForBox(box), lastReviewedAt: new Date().toISOString() }
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
      setImportText('')
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
      const res = await fetch('/api/andarun/deutsch/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: writingText, task: activeLesson.writing?.prompt || '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'KI nicht verfügbar')
      setCorrection(data.result)
      setMessage('KI-Korrektur ist fertig.')
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
    <main className={styles.shell}>
      <header className={styles.hero}>
        <div>
          <Link className={styles.backLink} href="/andarun">Andarun</Link>
          <span className={styles.kicker}>Deutschlernen</span>
          <h1>Lesen, Hören, Schreiben, Wiederholen.</h1>
          <p>Manuelle Tageslektionen mit KI-Vorbereitung, schwierigen Fragen und einem eigenen Leitner-System für deine Wörter und Fehler.</p>
        </div>
        <div className={styles.heroStats}>
          <span><strong>{state.lessons.length}</strong>Lektionen</span>
          <span><strong>{dueCards.length}</strong>heute fällig</span>
          <span><strong>{state.cards.length}</strong>Karten</span>
        </div>
      </header>

      {message && <div className={styles.status}>{message} {saving ? 'Speichert...' : ''}</div>}

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
                <button type="button" onClick={() => reviewCard(nextCard, 'hard')}>Schwer</button>
                <button type="button" onClick={() => reviewCard(nextCard, 'good')}>Gut</button>
                <button type="button" onClick={() => reviewCard(nextCard, 'easy')}>Leicht</button>
              </div>
            </div>
          ) : (
            <p className={styles.empty}>Keine fälligen Karten. Neue Wörter entstehen beim Lesen durch Klick auf ein Wort.</p>
          )}
        </article>

        <aside className={styles.lessonPicker}>
          <div className={styles.panelHead}>
            <span>Lektionen</span>
            <strong>{activeLesson.title}</strong>
          </div>
          <div className={styles.lessonList}>
            {state.lessons.map(lesson => (
              <button
                type="button"
                key={lesson.id}
                className={lesson.id === activeLesson.id ? styles.activeLesson : ''}
                onClick={() => setActiveLessonId(lesson.id)}
              >
                <span>{lesson.date}</span>
                <strong>{lesson.title}</strong>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <nav className={styles.tabs} aria-label="Deutschbereiche">
        {[
          ['lesen', 'Lesen'],
          ['grammatik', 'Grammatik'],
          ['hoeren', 'Hören'],
          ['schreiben', 'Schreiben'],
          ['import', 'Import'],
        ].map(([id, label]) => (
          <button type="button" key={id} className={activeTab === id ? styles.activeTab : ''} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </nav>

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
          </article>

          <article className={styles.correctionPanel}>
            <div className={styles.panelHead}>
              <span>KI-Rückmeldung</span>
              <strong>{correction ? 'Korrektur' : 'Bereit'}</strong>
            </div>
            {correction ? (
              <>
                <h3>Korrigierte Version</h3>
                <p>{correction.corrected}</p>
                <h3>Wichtigste Fehler</h3>
                {(correction.mistakes || []).map((mistake, index) => (
                  <div className={styles.mistakeRow} key={`${mistake.wrong}-${index}`}>
                    <strong>{mistake.wrong} → {mistake.correct}</strong>
                    <span>{mistake.reason}</span>
                    <button type="button" onClick={() => addMistakeCard(mistake)}>Als Karte speichern</button>
                  </div>
                ))}
              </>
            ) : (
              <p className={styles.empty}>Hier erscheint die KI-Korrektur, sobald `OPENAI_API_KEY` online gesetzt ist.</p>
            )}
          </article>
        </section>
      )}

      {activeTab === 'import' && (
        <section className={styles.importGrid}>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>Prompt für ChatGPT</span>
              <strong>Tageslektion erzeugen</strong>
            </div>
            <textarea readOnly value={contentPrompt} className={styles.promptBox} />
          </article>
          <article className={styles.textPanel}>
            <div className={styles.panelHead}>
              <span>JSON Import</span>
              <strong>Neue Lektion hinzufügen</strong>
            </div>
            <textarea value={importText} onChange={event => setImportText(event.target.value)} placeholder="Hier das JSON von ChatGPT einfügen..." />
            <button type="button" className={styles.primaryBtn} onClick={importLesson}>Lektion importieren</button>
          </article>
        </section>
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
