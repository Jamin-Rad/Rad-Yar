// ─── Einmalige Übernahme bestehender localStorage-Fortschritte nach Supabase ──
// Wird beim ersten Profilbesuch eines eingeloggten Nutzers nach diesem Update
// einmal ausgeführt, damit bisheriger (nur lokaler) Fortschritt geräteübergreifend
// verfügbar wird. Danach läuft der Sync laufend über die Write-Through-Aufrufe
// in useLessonReadStatus, leitnerStorage und der MCQ-Auswertung.

const SYNCED_KEY = 'radyar_synced_v1'

export async function syncLocalProgressToServer(userId) {
  if (typeof window === 'undefined' || !userId) return
  if (localStorage.getItem(SYNCED_KEY)) return

  try {
    const readArticles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
    const learningHistory = JSON.parse(localStorage.getItem('radyar_learning_history') || '[]')
    const mcqScores = JSON.parse(localStorage.getItem('radyar_mcq_scores') || '{}')
    const leitnerState = JSON.parse(localStorage.getItem(`radyar_leitner_${userId}`) || '{}')

    const historyByTopic = new Map(learningHistory.map(item => [item.topicId, item.learnedAt]))
    const readBulk = Object.entries(readArticles)
      .filter(([, value]) => Number(value) >= 1)
      .map(([themaId]) => ({ themaId, read: true, learnedAt: historyByTopic.get(themaId) }))

    const requests = []
    if (readBulk.length > 0) {
      requests.push(fetch('/api/progress/read-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulk: readBulk }),
      }))
    }
    if (Object.keys(mcqScores).length > 0) {
      requests.push(fetch('/api/progress/mcq-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulk: mcqScores }),
      }))
    }
    if (Object.keys(leitnerState).length > 0) {
      requests.push(fetch('/api/progress/leitner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulk: leitnerState }),
      }))
    }

    await Promise.all(requests)
    localStorage.setItem(SYNCED_KEY, '1')
  } catch (_) {}
}
