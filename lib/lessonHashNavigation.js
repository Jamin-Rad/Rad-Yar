// The location can target a teaching chapter or the independently disclosed summary.
export function readLessonHash(hash, trackedIds, summaryId) {
  let id
  try { id = decodeURIComponent(hash.replace(/^#/, '')) } catch { return null }
  if (!id) return { openId: trackedIds[0] || null, summaryOpen: false }
  if (id === summaryId) return { openId: null, summaryOpen: true }
  return trackedIds.includes(id) ? { openId: id, summaryOpen: false } : null
}

export function observeLessonHash({ target, trackedIds, summaryId, onChange }) {
  const synchronize = () => {
    const next = readLessonHash(target.location.hash, trackedIds, summaryId)
    if (next) onChange(next)
  }
  target.addEventListener('hashchange', synchronize)
  target.addEventListener('popstate', synchronize)
  synchronize()
  return () => {
    target.removeEventListener('hashchange', synchronize)
    target.removeEventListener('popstate', synchronize)
  }
}
