export const STATUSES = [
  { id: 'offen', label: 'Offen' },
  { id: 'in_bearbeitung', label: 'In Bearbeitung' },
  { id: 'erledigt', label: 'Erledigt' },
]

export const PRIORITIES = [
  { id: 'normal', label: 'Normal' },
  { id: 'hoch', label: 'Hoch' },
  { id: 'dringend', label: 'Dringend' },
]

export function findingStatus(value) {
  if (value === 'erledigt' || value === 'abgeschlossen') return 'erledigt'
  if (value === 'in_bearbeitung' || value === 'in Bearbeitung') return 'in_bearbeitung'
  return 'offen'
}

export function findingTitle(finding) {
  return finding?.reviewReason || finding?.question || finding?.vd || finding?.exam || 'Kontrolle ohne Beschreibung'
}

export function filterControlFindings(items, filter) {
  const term = filter.search.trim().toLocaleLowerCase('de')
  const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true })
  const today = new Date().toISOString().slice(0, 10)
  return items.filter(item => {
    if (item.type !== 'question') return false
    if (filter.modality && item.modality !== filter.modality) return false
    if (filter.status && findingStatus(item.status) !== filter.status) return false
    if (filter.priority && (item.priority || 'normal') !== filter.priority) return false
    if (filter.overdue && (!item.dueDate || item.dueDate >= today || findingStatus(item.status) === 'erledigt')) return false
    if (filter.from && (!item.examDate || item.examDate < filter.from)) return false
    if (filter.to && (!item.examDate || item.examDate > filter.to)) return false
    if (!term) return true
    return [item.name, item.reviewReason, item.reviewResult, item.question, item.vd, item.exam, item.examArea, item.modality]
      .some(value => String(value || '').toLocaleLowerCase('de').includes(term))
  }).sort((a, b) => {
    if (filter.sort === 'due') {
      const doneOrder = Number(findingStatus(a.status) === 'erledigt') - Number(findingStatus(b.status) === 'erledigt')
      if (doneOrder) return doneOrder
      const aDue = a.dueDate || '9999-12-31'
      const bDue = b.dueDate || '9999-12-31'
      const dueOrder = collator.compare(aDue, bDue)
      if (dueOrder) return dueOrder
    }
    if (filter.sort === 'priority') {
      const rank = { dringend: 0, hoch: 1, normal: 2 }
      const priorityOrder = (rank[a.priority] ?? 2) - (rank[b.priority] ?? 2)
      if (priorityOrder) return priorityOrder
    }
    const order = collator.compare(a.examDate || a.createdAt || '', b.examDate || b.createdAt || '')
    return filter.sort === 'oldest' ? order : -order
  })
}

export function controlSummary(items) {
  const controls = items.filter(item => item.type === 'question')
  const today = new Date().toISOString().slice(0, 10)
  return {
    all: controls.length,
    open: controls.filter(item => findingStatus(item.status) === 'offen').length,
    progress: controls.filter(item => findingStatus(item.status) === 'in_bearbeitung').length,
    done: controls.filter(item => findingStatus(item.status) === 'erledigt').length,
    overdue: controls.filter(item => item.dueDate && item.dueDate < today && findingStatus(item.status) !== 'erledigt').length,
  }
}
