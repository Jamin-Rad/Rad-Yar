// Lesefortschritt vom Server holen und mit localStorage mergen
// (Server gewinnt bei "gelesen" – für geräteübergreifende Konsistenz).
// Wird von useLessonReadStatus und der Lernpfad-Übersicht (/lernen/[fach]) genutzt.

import { activateUserCache, getUserCacheToken, isUserCacheCurrent } from './progressCache.js'
import { mergeReadState } from './readProgressStore.js'

const inFlight = new Map()

export async function pullReadStatusFromServer(userId) {
  if (!userId) return null
  activateUserCache(userId)
  const token = getUserCacheToken(userId)
  if (!inFlight.has(token)) {
    inFlight.set(token, fetchAndMergeReadStatus(userId, token).finally(() => inFlight.delete(token)))
  }
  return inFlight.get(token)
}

async function fetchAndMergeReadStatus(userId, token) {
  const res = await fetch('/api/progress/read-status', {
    cache: 'no-store', headers: { 'X-Radyar-User-Id': userId },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!isUserCacheCurrent(userId, token)) return null

  return mergeReadState(userId, data)
}
