import { ArchiveError, normalizeCase, summarizeCase, caseSearchText, searchText } from './model.mjs'
import { remoteCaseSummary } from './radiopaedia.mjs'

const TABLE = 'andarun_case_archive'
const PAGE_SIZE = 48
const literalLike = value => value.replace(/[\\%_]/g, '\\$&')

export function archiveRow(record) {
  return {
    id: record.id, document: record, summary: summarizeCase(record), source_key: record.sourceKey,
    search_text: caseSearchText(record),
    diagnosis_text: searchText(`${record.diagnosis} ${record.diagnosisEn} ${record.title}`),
    anatomy_text: searchText([record.organ, record.region, ...record.studies.map(study => study.area)].join(' ')),
    modalities: [...new Set(record.studies.map(study => study.modality).filter(Boolean))],
    updated_at: record.updatedAt,
  }
}

export function createArchiveStore(client, ownerId) {
  if (!client) throw new ArchiveError('Der Online-Speicher ist derzeit nicht erreichbar.', 503)
  const table = () => client.from(TABLE)
  const check = error => { if (error) throw error }
  return {
    async list({ q = '', diagnosis = '', anatomy = '', modality = '', page = 0 } = {}) {
      const pageNumber = Math.max(0, Math.min(10000, Number.isFinite(Number(page)) ? Math.floor(Number(page)) : 0))
      let query = table().select('summary,revision', { count: 'exact' }).eq('owner_id', ownerId)
      for (const [column, value] of [['search_text', q], ['diagnosis_text', diagnosis], ['anatomy_text', anatomy]]) {
        if (typeof value === 'string' && value.trim()) query = query.ilike(column, `%${literalLike(searchText(value.slice(0, 200)))}%`)
      }
      if (typeof modality === 'string' && modality.trim()) query = query.contains('modalities', [modality.slice(0, 60)])
      const { data, count, error } = await query.order('updated_at', { ascending: false }).order('id').range(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE - 1)
      check(error)
      return { cases: (data || []).map(row => ({ ...row.summary, revision: row.revision })), total: count || 0, page: pageNumber, pageSize: PAGE_SIZE }
    },
    async get(id) {
      const { data, error } = await table().select('document,revision').eq('owner_id', ownerId).eq('id', id).maybeSingle()
      check(error)
      if (!data) throw new ArchiveError('Dieser Fall wurde nicht gefunden.', 404)
      return { ...data.document, revision: data.revision }
    },
    async create(input) {
      const record = normalizeCase(input)
      const { data, error } = await table().insert({ ...archiveRow(record), owner_id: ownerId, revision: 1 }).select('document,revision').single()
      if (error?.code === '23505') throw new ArchiveError('Diese Fall-ID ist bereits vorhanden.', 409)
      check(error)
      return { ...data.document, revision: data.revision }
    },
    async update(id, input, revision) {
      if (!Number.isSafeInteger(revision) || revision < 1) throw new ArchiveError('Die Fallversion fehlt. Bitte den Fall neu laden.', 409)
      const existing = await this.get(id)
      if (existing.revision !== revision) throw new ArchiveError('Der Fall wurde inzwischen geändert. Bitte neu laden; deine Eingabe bleibt geöffnet.', 409)
      const record = normalizeCase(input, { existing })
      const { data, error } = await table().update({ ...archiveRow(record), revision: revision + 1 }).eq('owner_id', ownerId).eq('id', id).eq('revision', revision).select('document,revision').maybeSingle()
      check(error)
      if (!data) throw new ArchiveError('Der Fall wurde inzwischen geändert. Bitte neu laden; deine Eingabe bleibt geöffnet.', 409)
      return { ...data.document, revision: data.revision }
    },
    async importStatus() {
      const { data, error } = await client.from('andarun_case_archive_imports').select('completed_at,case_count,source_count').eq('owner_id', ownerId).eq('source', 'fallsammlung').maybeSingle()
      check(error)
      return data || null
    },
    async copyFallsammlung() {
      const { data, error } = await client.rpc('case_archive_import_fallsammlung', { p_owner_id: ownerId })
      check(error)
      return data
    },
    async importRadiopaedia(items) {
      if (!Array.isArray(items) || items.length > 100) throw new ArchiveError('Bitte höchstens 100 Fälle je Import senden.')
      const summaries = items.map(remoteCaseSummary)
      let copied = 0, alreadyPresent = 0
      for (const item of summaries) {
        const sourceKey = `radiopaedia:${item.id}`
        const bySource = await table().select('id').eq('owner_id', ownerId).eq('source_key', sourceKey).limit(1)
        check(bySource.error)
        if (bySource.data?.length) { alreadyPresent++; continue }
        const byLink = await table().select('id').eq('owner_id', ownerId).contains('summary->radiopaediaUrls', [item.url]).limit(1)
        check(byLink.error)
        if (byLink.data?.length) { alreadyPresent++; continue }
        const record = normalizeCase({ id: `radiopaedia-${item.id}`, title: item.title, diagnosisEn: item.title, certainty: 'unknown', radiopaediaCaseUrl: item.url, studies: [] })
        record.source = 'radiopaedia'; record.sourceKey = sourceKey
        const result = await table().insert({ ...archiveRow(record), owner_id: ownerId, revision: 1 })
        if (result.error?.code === '23505') {
          const collision = await table().select('source_key').eq('owner_id', ownerId).eq('id', record.id).maybeSingle()
          check(collision.error)
          if (collision.data?.source_key !== sourceKey) throw new ArchiveError('Diese Fall-ID ist bereits anders belegt. Bitte die Zuordnung prüfen.', 409)
          alreadyPresent++; continue
        }
        check(result.error); copied++
      }
      return { copied, alreadyPresent }
    },
  }
}
