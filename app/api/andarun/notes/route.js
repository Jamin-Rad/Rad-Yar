import { supabaseAdmin } from '@/lib/supabase/server'
import { audioPath, clientNote, MAX_AUDIO_BYTES, NOTES_BUCKET, parseNoteWrite } from '@/lib/todoNotesContract.mjs'
import { notesIdentity, notesJSON, notesBody, notesUnavailable, storedAudio } from '@/lib/todoNotesServer'

export const dynamic = 'force-dynamic'
export async function GET(request) {
  const identity = await notesIdentity(request)
  if (identity.response) return identity.response
  try {
    const notes = []
    for (let offset = 0; offset < 50000; offset += 1000) {
      const { data, error } = await supabaseAdmin.from('jaminova_todo_notes').select('*').eq('owner_id', identity.ownerId).order('id').range(offset, offset + 999)
      if (error) throw error
      notes.push(...data.map(clientNote))
      if (data.length < 1000) return notesJSON({ notes })
    }
    return notesUnavailable()
  } catch { return notesUnavailable() }
}
async function write(request, deleting) {
  const identity = await notesIdentity(request)
  if (identity.response) return identity.response
  const value = parseNoteWrite(await notesBody(request), deleting)
  if (!value) return notesJSON({ error: 'Ungültige Notiz.' }, 400)
  try {
    let path = null
    if (value.voice) {
      path = audioPath(identity.ownerId, value.id, value.voice.fileName)
      const file = await storedAudio(path)
      if (!file || !(Number(file.metadata?.size) > 0) || Number(file.metadata?.size) > MAX_AUDIO_BYTES) return notesJSON({ error: 'Aufnahme noch nicht vollständig hochgeladen.' }, 400)
    }
    const { data, error } = await supabaseAdmin.rpc('jaminova_write_todo_note', {
      p_owner: identity.ownerId, p_id: value.id, p_base: value.baseVersion, p_mutation: value.mutationId,
      p_text: value.text ?? '', p_done: value.done ?? false,
      p_created: new Date((value.createdAt ?? Date.now() / 1000) * 1000).toISOString(),
      p_voice: path, p_duration: value.voice?.duration ?? null, p_delete: deleting,
    })
    if (error) throw error
    // Keep the tombstone, but remove the actual recording. A retry also retries cleanup.
    if (deleting && data.note.deleted_at) {
      const removal = data.note.voice_object || (value.fileName ? audioPath(identity.ownerId, value.id, value.fileName) : null)
      if (removal) {
        const { error: removeError } = await supabaseAdmin.storage.from(NOTES_BUCKET).remove([removal])
        if (removeError) throw removeError
      }
      const { data: tombstone, error: cleanupError } = await supabaseAdmin.from('jaminova_todo_notes')
        .update({ text: '', done: false, voice_object: null, voice_duration: null })
        .eq('owner_id', identity.ownerId).eq('id', value.id).not('deleted_at', 'is', null).select('*').single()
      if (cleanupError) throw cleanupError
      data.note = tombstone
    }
    return notesJSON({ conflict: data.conflict, note: clientNote(data.note) })
  } catch { return notesUnavailable() }
}
export async function PUT(request) { return write(request, false) }
export async function DELETE(request) { return write(request, true) }
