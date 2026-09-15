export const STATUSES = [
  { id: 'offen', label: 'Offen' },
  { id: 'in_bearbeitung', label: 'In Bearbeitung' },
  { id: 'erledigt', label: 'Erledigt' },
]

export function findingStatus(value) {
  if (value === 'erledigt' || value === 'abgeschlossen') return 'erledigt'
  if (value === 'in_bearbeitung' || value === 'in Bearbeitung') return 'in_bearbeitung'
  return 'offen'
}

export function findingTitle(finding) {
  return finding?.type === 'question'
    ? finding?.question || finding?.vd || finding?.exam || 'Verlaufskontrolle / Frage'
    : finding?.diagnosis || finding?.exam || finding?.vd || 'Relevanter Fall'
}

export function filterControlFindings(items, filter) {
  const term = filter.search.trim().toLocaleLowerCase('de')
  const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true })
  return items.filter(item => {
    if (filter.type && (item.type === 'question' ? 'question' : 'case') !== filter.type) return false
    if (filter.modality && item.modality !== filter.modality) return false
    if (filter.status && findingStatus(item.status) !== filter.status) return false
    if (filter.from && (!item.examDate || item.examDate < filter.from)) return false
    if (filter.to && (!item.examDate || item.examDate > filter.to)) return false
    if (!term) return true
    return [item.name, item.diagnosis, item.vd, item.question, item.exam, item.examArea, item.organ, item.modality]
      .some(value => String(value || '').toLocaleLowerCase('de').includes(term))
  }).sort((a, b) => {
    if (filter.sort === 'name') return collator.compare(a.name || findingTitle(a), b.name || findingTitle(b))
    const order = collator.compare(a.examDate || a.createdAt || '', b.examDate || b.createdAt || '')
    return filter.sort === 'oldest' ? order : -order
  })
}

export function controlSummary(items) {
  return {
    all: items.length,
    open: items.filter(item => findingStatus(item.status) === 'offen').length,
    progress: items.filter(item => findingStatus(item.status) === 'in_bearbeitung').length,
    done: items.filter(item => findingStatus(item.status) === 'erledigt').length,
  }
}
