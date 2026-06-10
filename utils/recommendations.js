// ─── Empfehlungs-Logik für den Robot-Assistenten ──────
// Liest bestehende localStorage-Daten (Leitner, MCQ, Gelesen)
// und das Curriculum, ohne deren Format zu verändern.

import { CURRICULUM } from '@/data/curriculum'
import { loadLeitnerState, isDue } from '@/utils/leitnerStorage'

const DAY_MS = 24 * 60 * 60 * 1000

/** Anzahl heute fälliger Flashcards (über alle Themen). */
export function getDueFlashcardCount(userId) {
  const state = loadLeitnerState(userId)
  return Object.values(state).filter(isDue).length
}

/** Hat der Nutzer heute schon mindestens ein MCQ-Set bearbeitet? */
export function hasMcqToday() {
  if (typeof window === 'undefined') return false
  try {
    const scores = JSON.parse(window.localStorage.getItem('radyar_mcq_scores') || '{}')
    const today = new Date().toDateString()
    return Object.values(scores).some(v => v?.lastDate && new Date(v.lastDate).toDateString() === today)
  } catch { return false }
}

function loadReadArticles() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(window.localStorage.getItem('radyar_read_articles') || '{}') } catch { return {} }
}

/** Zufälliges, noch ungelesenes Thema mit updatedAt innerhalb der letzten `days` Tage. */
export function getRandomRecentTopic(days = 30) {
  const cutoff = Date.now() - days * DAY_MS
  const read = loadReadArticles()
  const candidates = []
  for (const fach of CURRICULUM) {
    for (const k of fach.kapitel) {
      for (const th of k.themen) {
        for (const item of [th, ...(th.sub || [])]) {
          if (!item.updatedAt || !item.link) continue
          if (new Date(item.updatedAt).getTime() < cutoff) continue
          if ((read[item.id] || 0) >= 1) continue
          candidates.push({ fach, kapitel: k, thema: item })
        }
      }
    }
  }
  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}
