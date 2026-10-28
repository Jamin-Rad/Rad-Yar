export const FINDING_MODALITIES = ['Röntgen', 'CT', 'MRT']
export const FINDING_AREAS = {
  CT: ['Schädel', 'HWS', 'Thorax', 'Abdomen', 'BBA', 'Obere Extremität', 'Untere Extremität', 'Sonstiges'],
  Röntgen: ['Thorax', 'Abdomen', 'Becken', 'HWS', 'BWS', 'LWS', 'Schulter', 'Clavicula', 'Oberarm', 'Ellenbogen', 'Unterarm', 'Handgelenk', 'Hand', 'Finger', 'Hüfte', 'Oberschenkel', 'Knie', 'Unterschenkel', 'OSG', 'Fuß', 'Zehen', 'Sonstiges'],
  MRT: ['Kopf', 'Wirbelsäule', 'Herz', 'Prostata', 'Mamma', 'Oberbauch', 'Becken', 'Sellink', 'Knie', 'Schulter', 'Hand', 'Ellenbogen', 'OSG', 'Sonstiges'],
}

export const findingKind = item => item.type === 'question' ? 'controls' : 'cases'
export const findingLabel = item => item.name || item.diagnosis || item.exam || item.vd || item.reviewReason || item.question || 'Gespeicherter Befund'
export const findingNote = item => findingKind(item) === 'controls'
  ? item.reviewReason || item.question || ''
  : item.keyFinding || item.vd || item.question || ''

export function filterFindingCollection(items, kind, { search = '', modality = '', sort = 'recent' } = {}) {
  const term = search.trim().toLocaleLowerCase('de')
  return items.filter(item => findingKind(item) === kind
    && (!modality || item.modality === modality)
    && (!term || [item.name, item.birthDate, String(item.birthDate || '').split('-').reverse().join('.'), item.examDate, String(item.examDate || '').split('-').reverse().join('.'), item.modality, item.examArea, item.exam, item.diagnosis, item.vd, item.keyFinding, item.question, item.reviewReason, item.reviewResult, item.learningPoint, item.tags]
      .some(value => String(value || '').toLocaleLowerCase('de').includes(term))))
    .sort((a, b) => sort === 'name'
      ? findingLabel(a).localeCompare(findingLabel(b), 'de', { numeric: true, sensitivity: 'base' })
      : String(b.updatedAt || b.createdAt || b.examDate || '').localeCompare(String(a.updatedAt || a.createdAt || a.examDate || '')))
}

export function findingForm(item, kind) {
  return { name: '', birthDate: '', modality: '', examArea: '', examDate: '', ...item,
    type: kind === 'controls' ? 'question' : 'case',
    note: item ? findingNote(item) : '',
  }
}

export function findingPayload(form, id) {
  const { note, ...record } = form
  return { ...record, id: form.id || id,
    ...(form.type === 'question'
      ? { reviewReason: note, question: form.question || note }
      : { keyFinding: note }),
  }
}

// Keep legacy clinical notes and scheduling metadata when an existing record is
// edited. A new saved reference does not create a deadline, priority or status.
export function sanitizeSavedFinding(value, now = new Date().toISOString()) {
  const text = (field, limit = 500) => typeof value?.[field] === 'string' ? value[field].trim().slice(0, limit) : ''
  const date = field => /^\d{4}-\d{2}-\d{2}$/.test(value?.[field] || '') ? value[field] : ''
  return {
    id: text('id', 80) || `finding-${Date.now()}`,
    type: text('type', 20) === 'question' ? 'question' : 'case',
    examDate: date('examDate'), name: text('name', 120), birthDate: date('birthDate'),
    modality: text('modality', 40), examArea: text('examArea', 80), exam: text('exam', 120),
    diagnosis: text('diagnosis', 180), vd: text('vd', 160), organ: text('organ', 100),
    question: text('question'), keyFinding: text('keyFinding', 1000), learningPoint: text('learningPoint', 1000), tags: text('tags', 240),
    reviewReason: text('reviewReason', 1000), reviewResult: text('reviewResult', 1000),
    dueDate: date('dueDate'), priority: ['normal', 'hoch', 'dringend'].includes(value?.priority) ? value.priority : '',
    status: text('status', 40), createdAt: text('createdAt', 40) || now, updatedAt: now,
  }
}
