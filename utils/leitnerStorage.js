const STORAGE_KEY = 'radyar_leitner_flashcards_v1'

// Alle Labels jetzt dreisprachig (DE / EN / FA)
export const LEITNER_STEPS = [
  { box: 1, days: 1,   label: { de: 'Box 1',     en: 'Box 1',     fa: 'جعبه ۱'    } },
  { box: 2, days: 3,   label: { de: 'Box 2',     en: 'Box 2',     fa: 'جعبه ۲'    } },
  { box: 3, days: 7,   label: { de: 'Box 3',     en: 'Box 3',     fa: 'جعبه ۳'    } },
  { box: 4, days: 14,  label: { de: 'Box 4',     en: 'Box 4',     fa: 'جعبه ۴'    } },
  { box: 5, days: 30,  label: { de: 'Box 5',     en: 'Box 5',     fa: 'جعبه ۵'    } },
  { box: 6, days: 90,  label: { de: '3 Monate',  en: '3 months',  fa: '۳ ماه'     } },
  { box: 7, days: 180, label: { de: '6 Monate',  en: '6 months',  fa: '۶ ماه'     } },
  { box: 8, days: 365, label: { de: '12 Monate', en: '12 months', fa: '۱۲ ماه'    } },
]

// Hilfsfunktion: Label für eine Box und Sprache ermitteln
export function getBoxLabel(boxNum, lang = 'de') {
  const step = LEITNER_STEPS[boxNum - 1]
  if (!step) return `Box ${boxNum}`
  return step.label[lang] ?? step.label.de
}

const todayStart = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

const addDays = (days) => {
  const d = todayStart()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

const nowIso = () => new Date().toISOString()

export function loadLeitnerState() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (error) {
    console.warn('RadYar flashcard storage could not be loaded', error)
    return {}
  }
}

export function saveLeitnerState(state) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('RadYar flashcard storage could not be saved', error)
  }
}

/**
 * Initialisiert eine Karte im Leitner-State, wenn sie noch nicht existiert.
 * WICHTIG: seenCount wird hier NICHT mehr erhöht (Fix: zählt nur echte Reviews).
 * Aufruf: beim ersten Anzeigen der Karte (zur Initialisierung).
 */
export function ensureCardStarted(cardId) {
  const state = loadLeitnerState()
  if (!state[cardId]) {
    state[cardId] = {
      id: cardId,
      box: 1,
      status: 'active',
      addedAt: nowIso(),
      lastSeenAt: nowIso(),
      lastReviewedAt: null,
      dueAt: todayStart().toISOString(),
      correctCount: 0,
      wrongCount: 0,
      seenCount: 0,  // wird nur in answerCard() gezählt
    }
    saveLeitnerState(state)
  }
  return state
}

/**
 * Beantwortet eine Karte und verschiebt sie in die entsprechende Leitner-Box.
 * seenCount wird hier (und nur hier) erhöht → entspricht echten Reviews.
 */
export function answerCard(cardId, knew) {
  const state = loadLeitnerState()
  const current = state[cardId] || {
    id: cardId,
    box: 1,
    status: 'active',
    addedAt: nowIso(),
    correctCount: 0,
    wrongCount: 0,
    seenCount: 0,
  }

  const nextBox = knew ? Math.min((current.box || 1) + 1, 9) : 1

  const next = {
    ...current,
    box: nextBox > 8 ? 8 : nextBox,
    status: nextBox > 8 ? 'mastered' : 'active',
    lastReviewedAt: nowIso(),
    lastSeenAt: nowIso(),
    correctCount: (current.correctCount || 0) + (knew ? 1 : 0),
    wrongCount:   (current.wrongCount   || 0) + (knew ? 0 : 1),
    seenCount:    (current.seenCount    || 0) + 1,   // ← hier gezählt
    dueAt: nextBox > 8 ? null : addDays(LEITNER_STEPS[nextBox - 1].days),
  }

  state[cardId] = next
  saveLeitnerState(state)
  return state
}

export function resetLeitnerState() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function isDue(record) {
  if (!record || record.status === 'mastered' || !record.dueAt) return false
  return new Date(record.dueAt).getTime() <= todayStart().getTime()
}

export function formatDueDate(record, lang = 'de') {
  if (!record?.dueAt) {
    return lang === 'fa' ? 'پایان‌یافته' : lang === 'en' ? 'completed' : 'abgeschlossen'
  }
  const d = new Date(record.dueAt)
  const locale = lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE'
  return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })
}
