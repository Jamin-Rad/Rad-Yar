export const MODALITIES = ['CT', 'MRT', 'Röntgen', 'Sonographie', 'Angiographie', 'Mammographie', 'PET/CT', 'Szintigraphie', 'Sonstige']
export const INTAKE_AREAS = ['Mamma', 'Knie', 'Schulter', 'Prostata']
export const PUBLICATION_STATES = ['not-linked', 'draft', 'submitted', 'published']

export class ArchiveError extends Error {
  constructor(message, status = 400) { super(message); this.status = status }
}

function text(value, max, field) {
  if (value == null) return ''
  if (typeof value !== 'string' || value.length > max) throw new ArchiveError(`${field}: ungültig oder zu lang.`)
  return value.trim()
}

function originalText(value, max, field) {
  if (value == null) return ''
  if (typeof value !== 'string' || value.length > max) throw new ArchiveError(`${field}: ungültig oder zu lang.`)
  return value
}

export function validDate(value, field = 'Datum') {
  const result = text(value, 10, field)
  if (!result) return ''
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result) || !Number.isFinite(Date.parse(`${result}T12:00:00Z`)) || new Date(`${result}T12:00:00Z`).toISOString().slice(0, 10) !== result) {
    throw new ArchiveError(`${field}: bitte ein gültiges Datum verwenden.`)
  }
  return result
}

export function radiopaediaUrl(value, image = false) {
  const result = text(value, 2000, image ? 'Vorschaubild' : 'Radiopaedia-Link')
  if (!result) return ''
  let url
  try { url = new URL(result) } catch { throw new ArchiveError('Ungültiger Radiopaedia-Link.') }
  const host = url.hostname.toLowerCase()
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !(host === 'radiopaedia.org' || host.endsWith('.radiopaedia.org'))) {
    throw new ArchiveError('Bitte einen HTTPS-Link von Radiopaedia verwenden.')
  }
  if (!image && !/^\/cases\/[^/]+(?:\/studies\/[^/]+)?\/?$/.test(url.pathname)) throw new ArchiveError('Bitte den Link zu einem Radiopaedia-Fall verwenden.')
  url.hash = ''
  return url.href
}

function localPath(value) {
  const result = text(value, 2000, 'Lokaler Ordner')
  if (result && (!/^(?:[a-z]:[\\/]|\\\\[^\\]+\\|\/)/i.test(result) || /[\x00-\x1f]/.test(result))) {
    throw new ArchiveError('Bitte einen absoluten lokalen Ordnerpfad verwenden.')
  }
  return result
}

function array(value, max, field) {
  if (value == null) return []
  if (!Array.isArray(value) || value.length > max) throw new ArchiveError(`${field}: ungültige Anzahl.`)
  return value
}

function uniqueIds(items, field) {
  if (new Set(items.map(item => item.id)).size !== items.length) throw new ArchiveError(`${field}: doppelte Kennung.`)
  return items
}

export function normalizeCase(input, { existing, newId = () => globalThis.crypto.randomUUID(), now = new Date().toISOString() } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ArchiveError('Falldaten fehlen.')
  const studies = uniqueIds(array(input.studies, 200, 'Untersuchungen').map(study => {
    if (!study || typeof study !== 'object') throw new ArchiveError('Ungültige Untersuchung.')
    const publicationStatus = study.publicationStatus || 'not-linked'
    if (!PUBLICATION_STATES.includes(publicationStatus)) throw new ArchiveError('Ungültiger Veröffentlichungsstatus.')
    return {
      id: text(study.id, 100, 'Untersuchungs-ID') || newId(),
      date: validDate(study.date, 'Untersuchungsdatum'),
      modality: text(study.modality, 60, 'Modalität'),
      area: text(study.area, 200, 'Untersuchungsregion'),
      reportOriginal: originalText(study.reportOriginal, 100000, 'Originalbefund'),
      reportDe: text(study.reportDe, 100000, 'Befund Deutsch'),
      reportEn: text(study.reportEn, 100000, 'Befund Englisch'),
      localPath: localPath(study.localPath),
      radiopaediaUrl: radiopaediaUrl(study.radiopaediaUrl),
      thumbnailUrl: radiopaediaUrl(study.thumbnailUrl, true),
      publicationStatus,
    }
  }), 'Untersuchungen')
  const followUps = uniqueIds(array(input.followUps, 1000, 'Verlauf').map(item => ({
    id: text(item?.id, 100, 'Verlaufs-ID') || newId(),
    date: validDate(item?.date, 'Verlaufsdatum'),
    text: text(item?.text, 50000, 'Verlauf'),
  })), 'Verlauf')
  const certainty = input.certainty || 'suspected'
  if (!['suspected', 'confirmed', 'unknown'].includes(certainty)) throw new ArchiveError('Ungültige diagnostische Sicherheit.')
  const intakeStatus = input.intakeStatus ?? existing?.intakeStatus ?? 'complete'
  if (!['temporary', 'complete'].includes(intakeStatus)) throw new ArchiveError('Ungültiger Erfassungsstatus.')
  const intakeArea = text(input.intakeArea ?? existing?.intakeArea, 50, 'Erfassungsbereich')
  if (intakeArea && !INTAKE_AREAS.includes(intakeArea)) throw new ArchiveError('Ungültiger Erfassungsbereich.')
  const availableModalities = [...new Set(array(input.availableModalities ?? existing?.availableModalities, 20, 'Verfügbare Modalitäten').map(value => text(value, 60, 'Modalität')))].filter(Boolean)
  const psaValue = text(input.psa?.value ?? existing?.psa?.value, 30, 'PSA').replace(',', '.')
  if (psaValue && (!/^\d+(?:\.\d+)?$/.test(psaValue) || !Number.isFinite(Number(psaValue)))) throw new ArchiveError('PSA: bitte einen nicht negativen Zahlenwert eingeben.')
  const diagnosis = text(input.diagnosis, 500, 'Diagnose')
  const result = {
    id: existing?.id || text(input.id, 100, 'Fall-ID') || newId(),
    title: text(input.title, 500, 'Titel') || diagnosis || 'Fall ohne Diagnose',
    diagnosis,
    diagnosisEn: text(input.diagnosisEn, 500, 'Diagnose Englisch'),
    certainty,
    intakeStatus, intakeArea, availableModalities,
    archiveNumber: existing?.archiveNumber || null,
    psa: { value: psaValue, date: validDate(input.psa?.date ?? existing?.psa?.date, 'PSA-Labordatum') },
    organ: text(input.organ, 200, 'Organ'),
    region: text(input.region, 200, 'Körperregion'),
    patient: { name: text(input.patient?.name, 200, 'Patientenname'), birthDate: validDate(input.patient?.birthDate, 'Geburtsdatum') },
    historyOriginal: originalText(input.historyOriginal, 100000, 'Anamnese'),
    radiopaediaCaseUrl: radiopaediaUrl(input.radiopaediaCaseUrl),
    studies,
    followUps,
    source: existing?.source || 'manual',
    sourceKey: existing?.sourceKey || null,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,99}$/.test(result.id)) throw new ArchiveError('Ungültige Fall-ID.')
  if (existing?.legacyOriginal) result.legacyOriginal = existing.legacyOriginal
  if (existing?.radiopaediaOriginal) result.radiopaediaOriginal = existing.radiopaediaOriginal
  if (JSON.stringify(result).length > 1000000) throw new ArchiveError('Dieser Fall ist zu groß. Bitte Untersuchungen aufteilen.', 413)
  return result
}

export function summarizeCase(record) {
  const studies = [...record.studies].sort((a, b) => b.date.localeCompare(a.date))
  return {
    archiveNumber: record.archiveNumber || null, intakeStatus: record.intakeStatus || 'complete',
    intakeArea: record.intakeArea || '', availableModalities: record.availableModalities || [],
    id: record.id, title: record.title, diagnosis: record.diagnosis, diagnosisEn: record.diagnosisEn,
    certainty: record.certainty, organ: record.organ, region: record.region, patient: record.patient,
    modalities: [...new Set([...studies.map(study => study.modality), ...(record.availableModalities || [])].filter(Boolean))],
    studyCount: studies.length, latestDate: studies[0]?.date || '',
    radiopaediaUrls: [...new Set([record.radiopaediaCaseUrl, ...studies.map(study => study.radiopaediaUrl)].filter(Boolean))],
    thumbnailUrl: studies.find(study => study.thumbnailUrl)?.thumbnailUrl || '',
    hasLocalFiles: studies.some(study => study.localPath), source: record.source, updatedAt: record.updatedAt,
  }
}

export function searchText(value) {
  return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[ßẞ]/g, 'ss').toLowerCase().trim()
}

export function caseSearchText(record) {
  const s = summarizeCase(record)
  const dob = s.patient.birthDate ? s.patient.birthDate.split('-').reverse().join('.') : ''
  return searchText([s.archiveNumber, s.title, s.diagnosis, s.diagnosisEn, s.organ, s.region, s.patient.name, s.patient.birthDate, dob, ...s.modalities, ...record.studies.map(study => study.area)].join(' '))
}

// A text-only publication package. Original reports, local paths and patient fields
// are deliberately excluded. Image de-identification is a separate local step.
export function publicTextPackage(record) {
  const title = record.diagnosisEn || record.diagnosis || record.title
  if (record.certainty === 'unknown') throw new ArchiveError('Die diagnostische Sicherheit muss zuerst angegeben werden.')
  const studies = record.studies.map(study => ({ modality: study.modality, findings: study.reportEn }))
  if (!title || !studies.length || studies.some(study => !study.findings)) throw new ArchiveError('Englischer Befund und Falltitel müssen zuerst vorbereitet werden.')
  const publicText = searchText(JSON.stringify({ title, studies })).replace(/[^\p{L}\p{N}]/gu, '')
  const nameParts = (record.patient.name || '').split(/[\s,]+/).filter(part => part.length > 2)
  const dob = record.patient.birthDate
  const identifiers = [...nameParts, dob, dob ? dob.split('-').reverse().join('') : ''].filter(Boolean)
  if (identifiers.some(value => publicText.includes(searchText(value).replace(/[^\p{L}\p{N}]/gu, '')))) {
    throw new ArchiveError('Im Veröffentlichungstext wurden Patientenangaben gefunden.')
  }
  return { title, diagnosticCertainty: record.certainty, studies }
}
