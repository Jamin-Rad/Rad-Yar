// ─── Leitner-System Storage ───────────────────────────
// - Ohne Login: Fortschritt in localStorage (anonym)
// - Mit Login:  Fortschritt in localStorage pro User-ID (Clerk userId)
//   → Damit mehrere User auf demselben Gerät getrennte Fortschritte haben

const ANON_KEY = 'radyar_leitner_anon'

function getKey(userId) {
  return userId ? `radyar_leitner_${userId}` : ANON_KEY
}

// ─── Box-Labels (dreisprachig) ─────────────────────────
const LABELS = {
  de: ['Box 1','Box 2','Box 3','Box 4','Box 5','3 Monate','6 Monate','12 Monate'],
  en: ['Box 1','Box 2','Box 3','Box 4','Box 5','3 months','6 months','12 months'],
  fa: ['جعبه ۱','جعبه ۲','جعبه ۳','جعبه ۴','جعبه ۵','۳ ماه','۶ ماه','۱۲ ماه'],
}

// label bleibt String → bestehende Seiten brechen nicht
export const LEITNER_STEPS = [
  { box: 1, days: 1,   label: 'Box 1'     },
  { box: 2, days: 3,   label: 'Box 2'     },
  { box: 3, days: 7,   label: 'Box 3'     },
  { box: 4, days: 14,  label: 'Box 4'     },
  { box: 5, days: 30,  label: 'Box 5'     },
  { box: 6, days: 90,  label: '3 Monate'  },
  { box: 7, days: 180, label: '6 Monate'  },
  { box: 8, days: 365, label: '12 Monate' },
]

// Übersetzter Label für neue Seiten
export function getBoxLabel(boxNum, lang = 'de') {
  const idx = (boxNum ?? 1) - 1
  return (LABELS[lang] ?? LABELS.de)[idx] ?? `Box ${boxNum}`
}

// Wiederholungs-Intervall als Erklärung für Box 1-5 (Box 6-8 sagt es schon im Label)
const INTERVALS = {
  de: ['nach 1 Tag', 'nach 3 Tagen', 'nach 7 Tagen', 'nach 14 Tagen', 'nach 30 Tagen', null, null, null],
  en: ['after 1 day', 'after 3 days', 'after 7 days', 'after 14 days', 'after 30 days', null, null, null],
  fa: ['بعد از ۱ روز', 'بعد از ۳ روز', 'بعد از ۷ روز', 'بعد از ۱۴ روز', 'بعد از ۳۰ روز', null, null, null],
}

export function getBoxInterval(boxNum, lang = 'de') {
  const idx = (boxNum ?? 1) - 1
  return (INTERVALS[lang] ?? INTERVALS.de)[idx] ?? null
}

// ─── Datum-Helfer ──────────────────────────────────────
const todayStart = () => {
  const d = new Date(); d.setHours(0,0,0,0); return d
}
const addDays = (n) => {
  const d = todayStart(); d.setDate(d.getDate() + n); return d.toISOString()
}
const nowIso = () => new Date().toISOString()

// ─── Kern-Funktionen ───────────────────────────────────

export function loadLeitnerState(userId = null) {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(getKey(userId))
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function saveLeitnerState(state, userId = null) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(getKey(userId), JSON.stringify(state)) } catch (_) {}
}

/**
 * Entfernt veraltete Fortschritts-Einträge aus einer Ansicht, wenn die
 * zugehörige Flashcard inzwischen umbenannt oder gelöscht wurde.
 * Der gespeicherte Zustand selbst bleibt unverändert.
 */
export function filterLeitnerState(state, cards) {
  const validIds = new Set(
    (cards || [])
      .map(card => typeof card === 'string' ? card : card?.id)
      .filter(Boolean)
  )
  return Object.fromEntries(
    Object.entries(state || {}).filter(([cardId]) => validIds.has(cardId))
  )
}

/**
 * Karte beantworten — seenCount wird NUR hier gezählt
 */
export function answerCard(cardId, knew, userId = null) {
  const state = loadLeitnerState(userId)
  const cur = state[cardId] || {
    id: cardId, box: 1, status: 'active',
    addedAt: nowIso(), correctCount: 0, wrongCount: 0, seenCount: 0,
  }
  const nextBox = knew ? Math.min((cur.box || 1) + 1, 9) : 1
  state[cardId] = {
    ...cur,
    box:            nextBox > 8 ? 8 : nextBox,
    status:         nextBox > 8 ? 'mastered' : 'active',
    lastReviewedAt: nowIso(),
    lastSeenAt:     nowIso(),
    correctCount:   (cur.correctCount || 0) + (knew ? 1 : 0),
    wrongCount:     (cur.wrongCount   || 0) + (knew ? 0 : 1),
    seenCount:      (cur.seenCount    || 0) + 1,
    dueAt:          nextBox > 8 ? null : addDays(LEITNER_STEPS[nextBox - 1].days),
  }
  saveLeitnerState(state, userId)
  return state
}

export function isDue(record) {
  if (!record || record.status === 'mastered' || !record.dueAt) return false
  return new Date(record.dueAt).getTime() <= todayStart().getTime()
}

export function resetLeitnerState(userId = null) {
  if (typeof window === 'undefined') return
  try { window.localStorage.removeItem(getKey(userId)) } catch (_) {}
}

export function formatDueDate(record, lang = 'de') {
  if (!record?.dueAt) return { de:'Beherrscht', en:'Mastered', fa:'تسلط' }[lang] ?? 'Beherrscht'
  const locale = { de:'de-DE', en:'en-GB', fa:'fa-IR' }[lang] ?? 'de-DE'
  return new Date(record.dueAt).toLocaleDateString(locale, { day:'2-digit', month:'short', year:'numeric' })
}

// ─── Server-Sync (nur für eingeloggte Nutzer) ──────────────────────
// localStorage bleibt die sofort verfügbare Quelle für die UI;
// der Server (Supabase `leitner_cards`) ermöglicht geräteübergreifenden Sync.

const syncQueues = new Map()

export function syncLeitnerCardToServer(cardId, record, userId = null) {
  const queueKey = `${userId || 'anon'}:${cardId}`
  const previous = syncQueues.get(queueKey) || Promise.resolve()
  const next = previous.then(async () => {
    try {
      const response = await fetch('/api/progress/leitner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, record }),
      })
      if (!response.ok && userId) {
        const { markProgressSyncPending } = await import('@/utils/syncProgressToServer')
        markProgressSyncPending(userId)
      }
    } catch (_) {
      if (userId) {
        const { markProgressSyncPending } = await import('@/utils/syncProgressToServer')
        markProgressSyncPending(userId)
      }
    }
  })
  syncQueues.set(queueKey, next)
  next.then(() => {
    if (syncQueues.get(queueKey) === next) syncQueues.delete(queueKey)
  })
  return next
}

/**
 * Holt den Server-Stand und merged ihn in den lokalen Zustand.
 * Pro Karte gewinnt der "fortgeschrittenere" Eintrag (neueres lastReviewedAt).
 */
export async function pullLeitnerStateFromServer(userId) {
  try {
    const res = await fetch('/api/progress/leitner')
    if (!res.ok) return loadLeitnerState(userId)
    const { cards } = await res.json()
    const local = loadLeitnerState(userId)
    let changed = false
    for (const [cardId, serverRecord] of Object.entries(cards || {})) {
      const localRecord = local[cardId]
      if (!localRecord) {
        local[cardId] = serverRecord
        changed = true
        continue
      }
      const localTime = new Date(localRecord.lastReviewedAt || localRecord.addedAt || 0).getTime()
      const serverTime = new Date(serverRecord.lastReviewedAt || serverRecord.addedAt || 0).getTime()
      if (serverTime > localTime) {
        local[cardId] = serverRecord
        changed = true
      }
    }
    if (changed) saveLeitnerState(local, userId)
    return local
  } catch (_) {
    return loadLeitnerState(userId)
  }
}
