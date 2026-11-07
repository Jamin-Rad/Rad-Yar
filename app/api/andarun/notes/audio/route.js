import { supabaseAdmin } from '@/lib/supabase/server'
import { audioName, audioPath, MAX_AUDIO_BYTES, NOTES_BUCKET, noteId } from '@/lib/todoNotesContract.mjs'
import { notesBody, notesIdentity, notesJSON, notesUnavailable, storedAudio } from '@/lib/todoNotesServer'

export const dynamic = 'force-dynamic'
export async function POST(request) {
  const identity = await notesIdentity(request)
  if (identity.response) return identity.response
  const body = await notesBody(request), id = noteId(body?.id)
  if (!id) return notesJSON({ error: 'Ungültige Notiz.' }, 400)
  try {
    if (body.action === 'download') {
      const { data: note, error } = await supabaseAdmin.from('jaminova_todo_notes').select('voice_object,deleted_at').eq('owner_id', identity.ownerId).eq('id', id).maybeSingle()
      if (error) throw error
      if (!note?.voice_object || note.deleted_at) return notesJSON({ error: 'Aufnahme nicht verfügbar.' }, 404)
      const { data, error: signedError } = await supabaseAdmin.storage.from(NOTES_BUCKET).createSignedUrl(note.voice_object, 900)
      if (signedError) throw signedError
      return notesJSON({ url: data.signedUrl })
    }
    if (body.action !== 'upload' || !audioName(body.fileName) || !Number.isSafeInteger(body.size) || body.size <= 0 || body.size > MAX_AUDIO_BYTES) return notesJSON({ error: 'Ungültige Aufnahme (max. 8 MB).' }, 400)
    const path = audioPath(identity.ownerId, id, body.fileName)
    const existing = await storedAudio(path)
    if (existing) return notesJSON({ uploaded: true })
    const { data, error } = await supabaseAdmin.storage.from(NOTES_BUCKET).createSignedUploadUrl(path, { upsert: false })
    if (error) throw error
    return notesJSON({ uploaded: false, url: data.signedUrl })
  } catch { return notesUnavailable() }
}
