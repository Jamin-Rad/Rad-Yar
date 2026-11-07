import test from 'node:test'
import assert from 'node:assert/strict'
import { audioName, audioPath, clientNote, noteId, parseNoteWrite } from './todoNotesContract.mjs'

const id = 'AA234567-89AB-4CDE-8123-456789ABCDEF'
const body = { id, mutationId: id, baseVersion: 0, text: '  memo  ', done: false, createdAt: 1794000000 }
test('stable canonical IDs, text and original creation date', () => {
  assert.equal(noteId(id), id.toLowerCase())
  assert.equal(parseNoteWrite(body).text, 'memo')
  assert.equal(parseNoteWrite(body).createdAt, body.createdAt)
})
test('reject invalid or oversized mutation payloads', () => {
  for (const patch of [{id:'../other'}, {mutationId:'bad'}, {baseVersion:-1}, {baseVersion:1.1}, {text:' '}, {text:'x'.repeat(501)}, {done:'true'}, {createdAt:Infinity}, {voice:{fileName:id+'.m4a',duration:NaN}}, {voice:{fileName:id+'.m4a',duration:602}}]) assert.equal(parseNoteWrite({...body,...patch}),null)
  assert.equal(parseNoteWrite(null),null)
})
test('audio references cannot escape owner/note namespace', () => {
  assert.equal(audioName(id+'.m4a'), id.toLowerCase()+'.m4a')
  for (const file of ['../'+id+'.m4a',id+'.mp3','https://host/voice.m4a']) assert.equal(audioName(file),null)
  assert.notEqual(audioPath('ownerA',id,id+'.m4a'),audioPath('ownerB',id,id+'.m4a'))
  assert.ok(!audioPath('ownerA',id,id+'.m4a').includes('ownerA'))
})
test('delete accepts only a safe optional audio reference', () => {
  assert.equal(parseNoteWrite({...body,fileName:'../bad'},true),null)
  assert.equal(parseNoteWrite({...body,fileName:id+'.m4a'},true).fileName,id.toLowerCase()+'.m4a')
})
test('wire data omits owner, storage path and mutation receipts', () => {
  const result=clientNote({id,owner_id:'private',text:'voice',done:true,version:3,voice_object:'private/path/'+id+'.m4a',voice_duration:2,created_at:'2026-11-01T00:00:00Z',deleted_at:null})
  assert.equal(result.voice.fileName,id+'.m4a'); assert.equal(result.version,3)
  assert.ok(!JSON.stringify(result).includes('private')); assert.equal(result.deleted,false)
})
test('Unicode character counts match the app without trimming content', () => {
  for (const text of ['😀'.repeat(500), 'e\u0301'.repeat(500), 'یادداشت فارسی', '👨‍👩‍👧‍👦'.repeat(500)]) assert.equal(parseNoteWrite({...body,text}).text,text)
  assert.equal(parseNoteWrite({...body,text:'😀'.repeat(501)}),null)
})
