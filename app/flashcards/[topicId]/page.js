'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import {
  loadLeitnerState,
  answerCard,
  ensureCardStarted,
  isDue,
  LEITNER_STEPS,
  getBoxLabel,
} from '@/utils/leitnerStorage'
import styles from './page.module.css'

/* ── Übersetzungen ─────────────────────────────────── */
const T = {
  de: {
    back:        '← Übersicht',
    cardOf:      (i, n) => `Karte ${i} von ${n}`,
    tap:         'Karte antippen zum Umdrehen',
    know:        'Gewusst ✓',
    dontKnow:    'Nicht gewusst ✗',
    done:        'Sitzung beendet!',
    doneSub:     'Alle Karten für heute wiederholt.',
    correct:     'Richtig',
    wrong:       'Falsch',
    total:       'Gesamt',
    backLink:    '← Zurück zur Übersicht',
    newTag:      'Neu',
    masteredTag: 'Beherrscht',
  },
  en: {
    back:        '← Overview',
    cardOf:      (i, n) => `Card ${i} of ${n}`,
    tap:         'Tap card to reveal answer',
    know:        'Got it ✓',
    dontKnow:    'Missed it ✗',
    done:        'Session complete!',
    doneSub:     'All cards reviewed for today.',
    correct:     'Correct',
    wrong:       'Missed',
    total:       'Total',
    backLink:    '← Back to overview',
    newTag:      'New',
    masteredTag: 'Mastered',
  },
  fa: {
    back:        '← مرور کلی',
    cardOf:      (i, n) => `کارت ${i} از ${n}`,
    tap:         'برای نشان دادن پاسخ روی کارت بزن',
    know:        'بلدم ✓',
    dontKnow:    'بلد نبودم ✗',
    done:        'سشن تموم شد!',
    doneSub:     'همه کارت‌ها برای امروز مرور شدند.',
    correct:     'درست',
    wrong:       'اشتباه',
    total:       'کل',
    backLink:    '← برگشت به مرور کلی',
    newTag:      'جدید',
    masteredTag: 'تسلط',
  },
}

/* ── Karten sortieren: fällige → neue → zukünftige ── */
function sortCards(cards, state) {
  const due = [], fresh = [], future = []
  cards.forEach(c => {
    const r = state[c.id]
    if (!r) {
      fresh.push(c)
    } else if (r.status === 'mastered') {
      // Beherrschte Karten ans Ende
      future.push(c)
    } else if (isDue(r)) {
      due.push(c)
    } else {
      future.push(c)
    }
  })
  return [...due, ...fresh, ...future]
}

/* ═══════════════════════════════════════════════════════
   SEITE
═══════════════════════════════════════════════════════ */
export default function FlashcardReviewPage({ params }) {
  const { lang } = useLanguage()
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const topicId = params?.topicId ?? 'meniskus'
  const topic = getFlashcardTopic(topicId)

  const allCards = useMemo(
    () => FLASHCARDS.filter(c => c.topicId === topicId),
    [topicId]
  )

  /* ── State ─────────────────────────────────────── */
  const [leitnerState, setLeitnerState] = useState({})
  const [cards, setCards]               = useState([])
  const [index, setIndex]               = useState(0)
  const [flipped, setFlipped]           = useState(false)
  const [exiting, setExiting]           = useState(false)
  const [done, setDone]                 = useState(false)
  const [stats, setStats]               = useState({ correct: 0, wrong: 0 })

  /* Initialisierung: State laden + Karten sortieren */
  useEffect(() => {
    const state = loadLeitnerState()
    setLeitnerState(state)
    setCards(sortCards(allCards, state))
  }, [allCards])

  /* Tastatur-Support (Leertaste zum Umdrehen, ←/→ für Antwort) */
  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!flipped) handleFlip()
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') handleAnswer(true)
        if (e.code === 'ArrowLeft')  handleAnswer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, done, exiting]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Aktuelle Karte ─────────────────────────────── */
  const current = cards[index]
  const record  = current ? leitnerState[current.id] : null
  const boxNum  = record?.box ?? 1
  const boxLabel = getBoxLabel(boxNum, lang)
  const progress = cards.length > 0 ? (index / cards.length) * 100 : 0

  /* ── Handlers ───────────────────────────────────── */
  const handleFlip = useCallback(() => {
    if (flipped || exiting || !current) return
    // Karte im Leitner-State initialisieren, falls noch nicht vorhanden
    const newState = ensureCardStarted(current.id)
    setLeitnerState(newState)
    setFlipped(true)
  }, [flipped, exiting, current])

  const handleAnswer = useCallback((knew) => {
    if (!flipped || exiting || !current) return
    setExiting(true)
    const newState = answerCard(current.id, knew)
    setLeitnerState(newState)
    setStats(s => ({
      correct: s.correct + (knew ? 1 : 0),
      wrong:   s.wrong   + (knew ? 0 : 1),
    }))
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      if (index + 1 >= cards.length) {
        setDone(true)
      } else {
        setIndex(i => i + 1)
      }
    }, 280)
  }, [flipped, exiting, current, index, cards.length])

  /* ── Topic nicht gefunden ───────────────────────── */
  if (!topic) {
    return (
      <div className={styles.page}>
        <div className={styles.doneWrap}>
          <div className={styles.doneCard}>
            <p>Topic nicht gefunden.</p>
            <Link href="/flashcards" className={styles.backLink}>← Übersicht</Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── ABSCHLUSS-SCREEN ───────────────────────────── */
  if (done) {
    return (
      <div className={styles.page} dir={dir}>
        <div className={styles.doneWrap}>
          <div className={styles.doneCard}>
            <span className={styles.doneEmoji}>🎉</span>
            <h1 className={styles.doneTitle}>{t.done}</h1>
            <p className={styles.doneSub}>{t.doneSub}</p>
            <div className={styles.doneStats}>
              <div className={styles.doneStat}>
                <strong>{stats.correct}</strong>
                <span>{t.correct}</span>
              </div>
              <div className={styles.doneStat}>
                <strong>{stats.wrong}</strong>
                <span>{t.wrong}</span>
              </div>
              <div className={styles.doneStat}>
                <strong>{stats.correct + stats.wrong}</strong>
                <span>{t.total}</span>
              </div>
            </div>
            <Link href="/flashcards" className={styles.backLink}>{t.backLink}</Link>
          </div>
        </div>
      </div>
    )
  }

  if (!current) return null

  /* ── REVIEW-SCREEN ──────────────────────────────── */
  return (
    <div className={styles.page} dir={dir}>

      {/* Obere Leiste */}
      <header className={styles.topBar}>
        <Link href="/flashcards" className={styles.backBtn}>{t.back}</Link>
        <div className={styles.topCenter}>
          <span className={styles.topicName}>{topic.title[lang]}</span>
          <span className={styles.cardCount}>{t.cardOf(index + 1, cards.length)}</span>
        </div>
        <div className={styles.boxPill}>{boxLabel}</div>
      </header>

      {/* Fortschrittsbalken */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      {/* Hauptbereich */}
      <main className={styles.main}>

        {/* Kategorie-Badge */}
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>
            {current.category?.[lang]}
          </span>
        </div>

        {/* ── 3D FLIP-KARTE ─────────────────────── */}
        <div
          className={`${styles.stage} ${exiting ? styles.exiting : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={t.tap}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleFlip()
            }
          }}
        >
          <div className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}>

            {/* Vorderseite: Frage */}
            <div className={styles.cardFront}>
              <p className={styles.question}>
                {current.front?.[lang]}
              </p>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tap}
              </div>
            </div>

            {/* Rückseite: Antwort */}
            <div className={styles.cardBack}>
              <p className={styles.answer}>
                {current.back?.[lang]}
              </p>
            </div>

          </div>
        </div>

        {/* Antwort-Buttons — erscheinen nach dem Umdrehen */}
        <div className={`${styles.answerRow} ${flipped ? styles.answerVisible : ''}`}>
          <button
            className={styles.dontKnowBtn}
            onClick={() => handleAnswer(false)}
            aria-label={t.dontKnow}
          >
            {t.dontKnow}
          </button>
          <button
            className={styles.knowBtn}
            onClick={() => handleAnswer(true)}
            aria-label={t.know}
          >
            {t.know}
          </button>
        </div>

      </main>
    </div>
  )
}
