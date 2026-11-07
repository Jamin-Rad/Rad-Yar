import { createHash } from 'node:crypto'

export const NOTES_BUCKET = 'jaminova-notes-audio'
export const MAX_AUDIO_BYTES = 8 * 1024 * 1024
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const characters = new Intl.Segmenter('de', { granularity: 'grapheme' })
export function noteId(value) { return typeof value === 'string' && UUID.test(value) ? value.toLowerCase() : null }
export function audioName(value) { return typeof value === 'string' && value.endsWith('.m4a') && noteId(value.slice(0, -4)) ? value.toLowerCase() : null }
export function audioPath(owner, id, name) {
  if (!owner || !noteId(id) || !audioName(name)) throw new Error('Invalid audio reference')
  return `${createHash('sha256').update(owner).digest('hex')}/${id.toLowerCase()}/${name.toLowerCase()}`
}
export function parseNoteWrite(body, deleting = false) {
  const id = noteId(body?.id), mutationId = noteId(body?.mutationId)
  if (!id || !mutationId || !Number.isSafeInteger(body.baseVersion) || body.baseVersion < 0) return null
  if (deleting) {
    if (body.fileName != null && !audioName(body.fileName)) return null
    return { id, mutationId, baseVersion: body.baseVersion, fileName: body.fileName ? audioName(body.fileName) : null }
  }
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  const createdAt = Number(body.createdAt)
  if (!text || [...characters.segment(text)].length > 500 || Buffer.byteLength(text, 'utf8') > 65536 || typeof body.done !== 'boolean' || !Number.isFinite(createdAt) || createdAt < 0 || createdAt > Date.now() / 1000 + 86400) return null
  let voice = null
  if (body.voice != null) {
    if (!audioName(body.voice.fileName) || !Number.isFinite(body.voice.duration) || body.voice.duration <= 0 || body.voice.duration > 601) return null
    voice = { fileName: audioName(body.voice.fileName), duration: body.voice.duration }
  }
  return { id, mutationId, baseVersion: body.baseVersion, text, done: body.done, createdAt, voice }
}
export function clientNote(row) {
  return { id: row.id, text: row.text, done: row.done, createdAt: Date.parse(row.created_at) / 1000,
    version: Number(row.version), deleted: row.deleted_at != null,
    voice: row.voice_object ? { fileName: row.voice_object.split('/').at(-1), duration: row.voice_duration } : null }
}
