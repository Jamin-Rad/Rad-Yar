const STORAGE_KEY = 'radyar_leitner_flashcards_v1'

export const LEITNER_STEPS = [
  { box: 1, label: 'Box 1', days: 1 },
  { box: 2, label: 'Box 2', days: 3 },
  { box: 3, label: 'Box 3', days: 7 },
  { box: 4, label: 'Box 4', days: 14 },
  { box: 5, label: 'Box 5', days: 30 },
  { box: 6, label: '3 Monate', days: 90 },
  { box: 7, label: '6 Monate', days: 180 },
  { box: 8, label: '12 Monate', days: 365 },
]

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
      seenCount: 1,
    }
  } else {
    state[cardId] = {
      ...state[cardId],
      lastSeenAt: nowIso(),
      seenCount: (state[cardId].seenCount || 0) + 1,
    }
  }
  saveLeitnerState(state)
  return state
}

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

  let nextBox = knew ? Math.min((current.box || 1) + 1, 9) : 1
  const next = {
    ...current,
    box: nextBox > 8 ? 8 : nextBox,
    status: nextBox > 8 ? 'mastered' : 'active',
    lastReviewedAt: nowIso(),
    lastSeenAt: nowIso(),
    correctCount: (current.correctCount || 0) + (knew ? 1 : 0),
    wrongCount: (current.wrongCount || 0) + (knew ? 0 : 1),
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
