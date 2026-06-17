// Lesefortschritt vom Server holen und mit localStorage mergen
// (Server gewinnt bei "gelesen" – für geräteübergreifende Konsistenz).
// Wird von useLessonReadStatus und der Lernpfad-Übersicht (/lernen/[fach]) genutzt.

export async function pullReadStatusFromServer() {
  const res = await fetch('/api/progress/read-status')
  if (!res.ok) return null
  const data = await res.json()

  const articles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
  for (const [id, read] of Object.entries(data.read || {})) {
    if (read) articles[id] = 1
  }
  localStorage.setItem('radyar_read_articles', JSON.stringify(articles))

  const history = JSON.parse(localStorage.getItem('radyar_learning_history') || '[]')
  const historyById = new Map(history.map(item => [item.topicId, item]))
  for (const item of data.history || []) {
    historyById.set(item.topicId, item)
  }
  const mergedHistory = [...historyById.values()]
  localStorage.setItem('radyar_learning_history', JSON.stringify(mergedHistory))

  return { articles, history: mergedHistory }
}
