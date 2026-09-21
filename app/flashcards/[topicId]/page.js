'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { hasFullAccess, FREE_TOPIC_LIMIT, FREE_ITEM_LIMIT } from '@/utils/subscription'
import { useLanguage } from '@/providers/LanguageProvider'
import { FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import { getLessonLinkForFlashcard } from '@/data/curriculum'
import { CONTRAST_GROUPS } from '@/data/contrastMedia'
import {
  loadLeitnerState, answerCard,
  isDue, getBoxLabel,
  pullLeitnerStateFromServer, syncLeitnerCardToServer,
} from '@/utils/leitnerStorage'
import AuthBanner from '@/components/AuthBanner'
import styles from './page.module.css'

const T = {
  de: {
    back: '← Übersicht',
    cardOf: (i, n) => `Karte ${i} von ${n}`,
    tap: 'Karte antippen zum Umdrehen',
    tapBack: 'Antippen, um die Frage wieder zu sehen',
    questionLabel: 'Frage',
    answerLabel: 'Kurze Antwort',
    explanationLabel: 'Erklärung',
    diagramLabel: 'Mini-Diagramm',
    know: 'Gewusst ✓',
    dontKnow: 'Nicht gewusst ✗',
    practiceKnow: 'Weiter ✓',
    practiceDontKnow: 'Nicht gewusst ✗',
    practiceMode: 'Üben ohne Zählen',
    practiceNote: 'Diese Wiederholung verändert keine Leitner-Box und wird nicht gezählt.',
    done: 'Sitzung beendet!',
    doneSub: 'Alle Karten für diese Sitzung wiederholt.',
    correct: 'Gewusst',
    wrong: 'Nochmal',
    total: 'Gesamt',
    backLink: '← Zurück zur Übersicht',
    backToLesson: '← Zur Lektion',
    emptyTitle: 'Keine Karten in dieser Auswahl.',
    emptySub: 'Wähle eine andere Box oder starte das Thema normal.',
    loadingTitle: 'Karten werden geladen...',
    lessonLinkLabel: 'Lektion lernen',
    navigatorTitle: 'Reihenfolge',
    navigatorHint: 'Karten direkt wählen',
    answeredCount: (n, total) => `${n} von ${total} beantwortet`,
    answeredCard: 'Bereits beantwortet',
    modeLearn: 'Neue Karten lernen',
    modeDue: 'Fällige Karten wiederholen',
    modePractice: 'Frei üben',
    modeHint: 'Neue und fällige Karten ändern deinen Lernplan. Freies Üben zählt nicht.',
    details: 'Erklärung und Diagramm anzeigen',
    emptyPractice: 'Alle Karten frei üben',
    emptyDue: 'Heute ist in diesem Thema nichts fällig. Neue Karten kannst du separat lernen.',
    emptyLearn: 'Keine neuen Karten mehr. Prüfe die fälligen Karten oder übe frei.',
    jumpToCard: (i, title) => `Zu Karte ${i}: ${title}`,
    dueLockedTitle: 'Gemischte Wiederholung',
    dueLockedHint: 'Die gemischte Wiederholung aller Themen benötigt ein Abo. Fällige Karten einzelner Themen und Boxen kannst du weiterhin wiederholen.',
    topicLockedTitle: 'Themenlimit erreicht',
    topicLockedHint: `Kostenlose Konten können bis zu ${FREE_TOPIC_LIMIT} Themen gleichzeitig lernen. Mit Abo unbegrenzt viele Themen.`,
    freeLimitNote: `Kostenlose Version: max. ${FREE_ITEM_LIMIT} Karten pro Durchgang. Mit Abo unbegrenzt.`,
    upgradeLink: 'Zum Abo →',
  },
  en: {
    back: '← Overview',
    cardOf: (i, n) => `Card ${i} of ${n}`,
    tap: 'Tap card to reveal answer',
    tapBack: 'Tap to see the question again',
    questionLabel: 'Question',
    answerLabel: 'Short answer',
    explanationLabel: 'Explanation',
    diagramLabel: 'Mini-diagram',
    know: 'Got it ✓',
    dontKnow: 'Missed it ✗',
    practiceKnow: 'Next ✓',
    practiceDontKnow: 'Missed it ✗',
    practiceMode: 'Practice without counting',
    practiceNote: 'This review does not change any Leitner box and is not counted.',
    done: 'Session complete!',
    doneSub: 'All cards in this session have been reviewed.',
    correct: 'Got it',
    wrong: 'Again',
    total: 'Total',
    backLink: '← Back to overview',
    backToLesson: '← Back to lesson',
    emptyTitle: 'No cards in this selection.',
    emptySub: 'Choose another box or start the topic normally.',
    loadingTitle: 'Loading cards...',
    lessonLinkLabel: 'Study lesson',
    navigatorTitle: 'Order',
    navigatorHint: 'Choose any card',
    answeredCount: (n, total) => `${n} of ${total} answered`,
    answeredCard: 'Already answered',
    modeLearn: 'Learn new cards',
    modeDue: 'Review due cards',
    modePractice: 'Free practice',
    modeHint: 'New and due cards update your schedule. Free practice does not count.',
    details: 'Show explanation and diagram',
    emptyPractice: 'Practice all cards',
    emptyDue: 'No cards are due in this topic today. You can learn new cards separately.',
    emptyLearn: 'No new cards remain. Check due cards or practice freely.',
    jumpToCard: (i, title) => `Go to card ${i}: ${title}`,
    dueLockedTitle: 'Mixed review',
    dueLockedHint: 'A subscription is needed to mix due cards from all topics. You can still review due cards in individual topics and boxes.',
    topicLockedTitle: 'Topic limit reached',
    topicLockedHint: `Free accounts can study up to ${FREE_TOPIC_LIMIT} topics at the same time. With a subscription, unlimited topics.`,
    freeLimitNote: `Free version: max. ${FREE_ITEM_LIMIT} cards per session. Unlimited with a subscription.`,
    upgradeLink: 'View subscription →',
  },
  fa: {
    back: '← مرور کلی',
    cardOf: (i, n) => `کارت ${i} از ${n}`,
    tap: 'برای دیدن جواب روی کارت بزن',
    tapBack: 'برای دیدن دوباره سؤال روی کارت بزن',
    questionLabel: 'سؤال',
    answerLabel: 'جواب کوتاه',
    explanationLabel: 'توضیح',
    diagramLabel: 'دیاگرام کوتاه',
    know: 'بلدم ✓',
    dontKnow: 'بلد نبودم ✗',
    practiceKnow: 'بعدی ✓',
    practiceDontKnow: 'بلد نبودم ✗',
    practiceMode: 'تمرین بدون شمارش',
    practiceNote: 'این مرور جعبه لایتنر را تغییر نمی‌دهد و در آمار حساب نمی‌شود.',
    done: 'سشن تمام شد!',
    doneSub: 'همه کارت‌های این سشن مرور شدند.',
    correct: 'بلدم',
    wrong: 'دوباره',
    total: 'کل',
    backLink: '← برگشت به مرور کلی',
    backToLesson: '← بازگشت به درس',
    emptyTitle: 'در این انتخاب کارتی وجود ندارد.',
    emptySub: 'یک جعبه دیگر انتخاب کن یا موضوع را به صورت عادی شروع کن.',
    loadingTitle: 'در حال بارگذاری کارت‌ها...',
    lessonLinkLabel: 'مطالعه درس',
    navigatorTitle: 'ترتیب کارت‌ها',
    navigatorHint: 'انتخاب مستقیم کارت',
    answeredCount: (n, total) => `${n} از ${total} پاسخ داده شده`,
    answeredCard: 'قبلاً پاسخ داده شده',
    modeLearn: 'یادگیری کارت‌های جدید',
    modeDue: 'مرور کارت‌های موعددار',
    modePractice: 'تمرین آزاد',
    modeHint: 'یادگیری و مرور برنامه را تغییر می‌دهند؛ تمرین آزاد در آمار ثبت نمی‌شود.',
    details: 'نمایش توضیح و دیاگرام',
    emptyPractice: 'تمرین آزاد همهٔ کارت‌ها',
    emptyDue: 'امروز کارتی از این موضوع موعد مرور ندارد. کارت‌های جدید را جداگانه می‌توانی یاد بگیری.',
    emptyLearn: 'کارت جدیدی باقی نمانده است. کارت‌های موعددار را مرور کن یا تمرین آزاد انجام بده.',
    jumpToCard: (i, title) => `رفتن به کارت ${i}: ${title}`,
    dueLockedTitle: 'مرور ترکیبی',
    dueLockedHint: 'مرور ترکیبی همهٔ موضوع‌ها به اشتراک نیاز دارد. مرور کارت‌های موعددار هر موضوع و جعبه همچنان ممکن است.',
    topicLockedTitle: 'محدودیت موضوعات',
    topicLockedHint: `حساب‌های رایگان می‌توانند حداکثر ${FREE_TOPIC_LIMIT} موضوع را همزمان مطالعه کنند. با اشتراک، بدون محدودیت.`,
    freeLimitNote: `نسخه رایگان: حداکثر ${FREE_ITEM_LIMIT} کارت در هر دور. با اشتراک، بدون محدودیت.`,
    upgradeLink: 'مشاهده اشتراک ←',
  },
}

// Synthetisches "Thema" für die zufällige Wiederholung aller heute fälligen Karten
const DUE_TOPIC_TITLE = { de: 'Heute fällig', en: 'Due today', fa: 'امروز برای مرور' }

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}


function DiagramView({ text }) {
  const lines = String(text || '').split('\n').map(line => line.trim()).filter(Boolean)
  return (
    <div className={styles.diagramFlow}>
      {lines.map((line, lineIndex) => {
        const parts = line.split('→').map(part => part.trim()).filter(Boolean)
        return (
          <div key={`${line}-${lineIndex}`} className={styles.diagramChain}>
            {parts.map((part, partIndex) => (
              <div key={`${part}-${partIndex}`} className={styles.diagramStep}>
                <div className={styles.diagramNode}>{part}</div>
                {partIndex < parts.length - 1 && <div className={styles.diagramArrowDown} aria-hidden="true">↓</div>}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function FlashcardReviewPage() {
  const { lang } = useLanguage()
  const { userId } = useAuth()
  const { user } = useUser()
  const params = useParams()
  const searchParams = useSearchParams()
  const fullAccess = hasFullAccess(user)
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const topicId = params?.topicId ?? 'meniskus'
  const isDueMode = topicId === 'faellig'
  const contrastGroup = CONTRAST_GROUPS.find(group => group.flashcardId === topicId)
  const topic = isDueMode
    ? { id: 'faellig', title: DUE_TOPIC_TITLE, href: null }
    : contrastGroup
      ? { id: contrastGroup.flashcardId, title: contrastGroup.title, href: `/flashcards/${contrastGroup.flashcardId}` }
      : getFlashcardTopic(topicId)
  const lessonLink = contrastGroup
    ? `/technik/kontrastmittel/${contrastGroup.id}`
    : (!isDueMode && topic ? getLessonLinkForFlashcard(topic.href) : null)
  const allCards = useMemo(
    () => isDueMode
      ? FLASHCARDS
      : contrastGroup
        ? FLASHCARDS.filter(card => contrastGroup.topicIds.includes(card.topicId))
        : FLASHCARDS.filter(card => card.topicId === topicId),
    [topicId, isDueMode, contrastGroup]
  )
  const practiceMode = searchParams.get('mode') === 'practice'
  const reviewMode = searchParams.get('mode') === 'due' || isDueMode
  const boxValue = searchParams.get('box')
  const boxFilter = boxValue ? Number(boxValue) : null
  const fromParam = searchParams.get('from')
  const backHref = fromParam || (lang === 'de' ? '/flashcards' : `/flashcards?lang=${lang}`)
  const backLabel = fromParam ? t.backToLesson : t.back
  const showLessonShortcut = Boolean(lessonLink && !fromParam)

  const [leitnerState, setLeitnerState] = useState({})
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })
  const [answeredIds, setAnsweredIds] = useState(() => new Set())
  const advanceTimer = useRef(null)

  useEffect(() => {
    let cancelled = false
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setLoading(true)
    async function load() {
      const state = userId ? await pullLeitnerStateFromServer(userId) : loadLeitnerState(userId)
      if (cancelled) return
      let selectedCards = allCards

      if (isDueMode) {
        selectedCards = shuffle(allCards.filter(card => isDue(state[card.id])))
      } else if (practiceMode && boxFilter) {
        selectedCards = allCards.filter(card => {
          const record = state[card.id]
          return record && Number(record.box) === boxFilter
        })
      } else if (practiceMode) {
        selectedCards = allCards
      } else if (boxFilter) {
        selectedCards = allCards.filter(card => {
          const record = state[card.id]
          return record && isDue(record) && Number(record.box) === boxFilter
        })
      } else if (reviewMode) {
        selectedCards = allCards.filter(card => isDue(state[card.id]))
      } else {
        selectedCards = allCards.filter(card => !state[card.id])
      }

      let finalCards = selectedCards
      if (!fullAccess) finalCards = finalCards.slice(0, FREE_ITEM_LIMIT)

      setLeitnerState(state)
      setCards(finalCards)
      setIndex(0)
      setFlipped(false)
      setDone(false)
      setStats({ correct: 0, wrong: 0 })
      setAnsweredIds(new Set())
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [allCards, userId, practiceMode, reviewMode, boxFilter, isDueMode, fullAccess])

  const startedTopicIds = useMemo(() => {
    const set = new Set()
    Object.keys(leitnerState).forEach(cardId => {
      const card = FLASHCARDS.find(c => c.id === cardId)
      if (card) set.add(card.topicId)
    })
    return set
  }, [leitnerState])
  const topicLocked = !isDueMode && !contrastGroup && !fullAccess && !!userId
    && !startedTopicIds.has(topicId) && startedTopicIds.size >= FREE_TOPIC_LIMIT

  const current = cards[index]
  const record = current ? leitnerState[current.id] : null
  const boxNum = practiceMode && boxFilter ? boxFilter : (record?.box ?? 1)
  const boxLabel = getBoxLabel(boxNum, lang)
  const progress = cards.length > 0 ? (answeredIds.size / cards.length) * 100 : 0
  const modeHref = (mode) => {
    const query = new URLSearchParams()
    if (mode) query.set('mode', mode)
    if (fromParam) query.set('from', fromParam)
    if (lang !== 'de') query.set('lang', lang)
    return `/flashcards/${topicId}${query.size ? `?${query}` : ''}`
  }

  const goToCard = useCallback((nextIndex) => {
    if (!cards.length || exiting) return
    const boundedIndex = Math.max(0, Math.min(cards.length - 1, nextIndex))
    if (answeredIds.has(cards[boundedIndex].id)) return
    setIndex(boundedIndex)
    setFlipped(false)
    setExiting(false)
    setExitDir(null)
    setDone(false)
  }, [cards, answeredIds, exiting])

  const handleFlip = useCallback(() => {
    if (exiting || !current) return
    setFlipped(value => !value)
  }, [exiting, current])

  const handleAnswer = useCallback((knew) => {
    if (!flipped || exiting || !current || answeredIds.has(current.id)) return
    setExiting(true)
    setExitDir(knew ? 'right' : 'left')

    if (!practiceMode) {
      const newState = answerCard(current.id, knew, userId)
      setLeitnerState(newState)
      if (userId) syncLeitnerCardToServer(current.id, newState[current.id], userId)
    }

    setStats(s => ({ correct: s.correct + (knew ? 1 : 0), wrong: s.wrong + (knew ? 0 : 1) }))
    const nextAnswered = new Set(answeredIds)
    nextAnswered.add(current.id)
    setAnsweredIds(nextAnswered)
    advanceTimer.current = setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      setExitDir(null)
      if (nextAnswered.size === cards.length) {
        setDone(true)
      } else {
        const nextIndex = cards.findIndex((card, cardIndex) => cardIndex > index && !nextAnswered.has(card.id))
        setIndex(nextIndex >= 0 ? nextIndex : cards.findIndex(card => !nextAnswered.has(card.id)))
      }
    }, 320)
  }, [flipped, exiting, current, index, cards, answeredIds, userId, practiceMode])

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.target instanceof Element && e.target.closest('button, a, summary, input, textarea, select, [role="button"]')) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        handleFlip()
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') handleAnswer(true)
        if (e.code === 'ArrowLeft') handleAnswer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, done, exiting, handleFlip, handleAnswer])

  if (!topic) return null

  const profilHref = lang === 'de' ? '/profil' : `/profil?lang=${lang}`

  if (isDueMode && !fullAccess) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🔒</span>
          <h1 className={styles.doneTitle}>{t.dueLockedTitle}</h1>
          <p className={styles.doneSub}>{t.dueLockedHint}</p>
          <div className={styles.lockActions}>
            <Link href={profilHref} className={styles.backLink}>{t.upgradeLink}</Link>
            <Link href={backHref} className={styles.secondaryLink}>{t.backLink}</Link>
          </div>
        </div>
      </div>
    </div>
  )

  if (topicLocked) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🔒</span>
          <h1 className={styles.doneTitle}>{t.topicLockedTitle}</h1>
          <p className={styles.doneSub}>{t.topicLockedHint}</p>
          <div className={styles.lockActions}>
            <Link href={profilHref} className={styles.backLink}>{t.upgradeLink}</Link>
            <Link href={backHref} className={styles.secondaryLink}>{t.backLink}</Link>
          </div>
        </div>
      </div>
    </div>
  )

  if (done) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🎉</span>
          <h1 className={styles.doneTitle}>{t.done}</h1>
          <p className={styles.doneSub}>{t.doneSub}</p>
          {practiceMode && <p className={styles.practiceDoneNote}>{t.practiceNote}</p>}
          <div className={styles.doneStats}>
            <div className={styles.doneStat}><strong>{stats.correct}</strong><span>{t.correct}</span></div>
            <div className={styles.doneStat}><strong>{stats.wrong}</strong><span>{t.wrong}</span></div>
            <div className={styles.doneStat}><strong>{stats.correct + stats.wrong}</strong><span>{t.total}</span></div>
          </div>
          <Link href={backHref} className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  if (loading) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>...</span>
          <h1 className={styles.doneTitle}>{t.loadingTitle}</h1>
        </div>
      </div>
    </div>
  )

  if (!current) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🗂️</span>
          <h1 className={styles.doneTitle}>{t.emptyTitle}</h1>
          <p className={styles.doneSub}>{!boxFilter && !practiceMode && !isDueMode ? (reviewMode ? t.emptyDue : t.emptyLearn) : t.emptySub}</p>
          {!isDueMode && !practiceMode && !boxFilter && reviewMode && <Link href={modeHref(null)} className={styles.backLink}>{t.modeLearn}</Link>}
          {!isDueMode && !practiceMode && !boxFilter && !reviewMode && <Link href={modeHref('due')} className={styles.backLink}>{t.modeDue}</Link>}
          {!isDueMode && !practiceMode && !boxFilter && <Link href={modeHref('practice')} className={styles.secondaryLink}>{t.emptyPractice}</Link>}
          <Link href={backHref} className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  const answer = localize(current.answer, lang) || localize(current.back, lang)
  const explanation = localize(current.explanation, lang)
  const diagram = localize(current.diagram, lang)

  return (
    <div className={styles.page} dir={dir}>
      <AuthBanner lang={lang} />

      {!fullAccess && (
        <div className={styles.freeLimitNote}>
          {t.freeLimitNote} <Link href={profilHref}>{t.upgradeLink}</Link>
        </div>
      )}

      <header className={styles.topBar}>
        <Link href={backHref} className={styles.backBtn}>{backLabel}</Link>
        <div className={styles.topCenter}>
          <span className={styles.cardCount}>{t.answeredCount(answeredIds.size, cards.length)}</span>
        </div>
        <div className={styles.topRight}>
          {showLessonShortcut && (
            <a
              href={lang === 'de' ? lessonLink : `${lessonLink}?lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lessonLink}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H9a4 4 0 0 1 3 1.4A4 4 0 0 1 15 2h4.5A2.5 2.5 0 0 1 22 4.5v13A2.5 2.5 0 0 1 19.5 20H15a3 3 0 0 0-3 3 3 3 0 0 0-3-3H4.5A2.5 2.5 0 0 1 2 17.5Z" />
                <path d="M12 7v13" />
              </svg>
              {t.lessonLinkLabel}
            </a>
          )}
        </div>
      </header>

      {!isDueMode && !boxFilter && (
        <div className={styles.modeNav} aria-label={t.modeHint}>
          <Link href={modeHref(null)} className={!practiceMode && !reviewMode ? styles.modeActive : ''}>{t.modeLearn}</Link>
          <Link href={modeHref('due')} className={reviewMode ? styles.modeActive : ''}>{t.modeDue}</Link>
          <Link href={modeHref('practice')} className={practiceMode ? styles.modeActive : ''}>{t.modePractice}</Link>
          <small>{t.modeHint}</small>
        </div>
      )}

      <div className={styles.progressTrack} role="progressbar" aria-valuenow={answeredIds.size} aria-valuemin={0} aria-valuemax={cards.length} aria-label={t.answeredCount(answeredIds.size, cards.length)}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <nav className={styles.cardNavigator} aria-label={t.navigatorTitle}>
        <div className={styles.navigatorHeader}>
          <div>
            <strong>{t.navigatorTitle}</strong>
            <span>{t.navigatorHint}</span>
          </div>
        </div>
        <div className={styles.cardMap}>
          {cards.map((card, cardIndex) => {
            const title = localize(card.front, lang)
            return (
              <button
                type="button"
                key={card.id}
                className={`${styles.cardMapItem} ${cardIndex === index ? styles.cardMapItemActive : ''} ${answeredIds.has(card.id) ? styles.cardMapItemAnswered : ''}`.trim()}
                onClick={() => goToCard(cardIndex)}
                disabled={answeredIds.has(card.id)}
                aria-current={cardIndex === index ? 'step' : undefined}
                aria-label={answeredIds.has(card.id) ? `${t.jumpToCard(cardIndex + 1, title)} · ${t.answeredCard}` : t.jumpToCard(cardIndex + 1, title)}
              >
                <span>{String(cardIndex + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <main className={styles.main}>
        {practiceMode && <div className={styles.practiceBadge}>{boxLabel} · {t.practiceNote}</div>}

        <div
          className={`${styles.stage} ${exiting ? styles.exiting : ''} ${exitDir === 'right' ? styles.exitRight : exitDir === 'left' ? styles.exitLeft : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={flipped ? t.tapBack : t.tap}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
        >
          <div key={index} className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.cardFront} aria-hidden={flipped}>
              <p className={styles.question}>{localize(current.front, lang)}</p>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tap}
              </div>
            </div>

            <div className={styles.cardBack} aria-hidden={!flipped}>
              <div className={styles.backContent}>
                <div className={styles.answerBlock}>
                  <span className={styles.answerLabel}>{t.answerLabel}</span>
                  <p className={styles.answerShort}>{answer}</p>
                </div>

              </div>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tapBack}
              </div>
            </div>
          </div>
        </div>

        {flipped && (explanation || diagram) && (
          <details className={styles.cardDetails}>
            <summary>{t.details}</summary>
            {explanation && <div className={styles.explanationBlock}>
              <span className={styles.explanationLabel}>{t.explanationLabel}</span>
              <p className={styles.answer}>{explanation}</p>
            </div>}
            {diagram && <div className={styles.diagramBlock}>
              <span>{t.diagramLabel}</span>
              <DiagramView text={diagram} />
            </div>}
          </details>
        )}

        <div className={`${styles.answerRow} ${flipped ? styles.answerVisible : ''}`}>
          <button className={styles.dontKnowBtn} onClick={() => handleAnswer(false)} disabled={!flipped || exiting}>
            {practiceMode ? t.practiceDontKnow : t.dontKnow}
          </button>
          <button className={styles.knowBtn} onClick={() => handleAnswer(true)} disabled={!flipped || exiting}>
            {practiceMode ? t.practiceKnow : t.know}
          </button>
        </div>
      </main>
    </div>
  )
}
