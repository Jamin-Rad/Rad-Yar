/** Pre-render German neural speech; playback reads saved files, never a speech service.
 * node --env-file=.env.local scripts/prepare-deutsch-audio.mjs [--sample] [lessons.json]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const manifestPath = new URL('../data/deutschRecordings.json', import.meta.url)
const recordings = JSON.parse(readFileSync(manifestPath, 'utf8'))
const sample = process.argv.includes('--sample')
const inputPath = process.argv.slice(2).find(arg => !arg.startsWith('--'))
if (inputPath) {
  const input = JSON.parse(readFileSync(inputPath, 'utf8'))
  const lessons = Array.isArray(input) ? input : input.lessons || input.state?.lessons || [input]
  for (const lesson of lessons) {
    for (const section of [lesson.reading, lesson.listening, ...(lesson.reading?.vocabulary || []).map(word => ({ text: word.example }))]) {
      if (section?.text && !recordings.some(item => item.text === section.text)) recordings.push({ text: section.text })
    }
  }
}
const outputDir = new URL('../public/andarun/deutsch/audio/', import.meta.url)
mkdirSync(outputDir, { recursive: true })
const key = process.env.GOOGLE_TTS_API_KEY
if (!key) throw new Error('Google Cloud TTS key is not configured.')
const voices = ['de-DE-Chirp3-HD-Sulafat', 'de-DE-Chirp3-HD-Charon']
const speakerVoices = { Nora: 0, Kundin: 0, Mitarbeiter: 1, Amir: 1, Mitarbeiterin: 0, Hausverwaltung: 1, Bewohnerin: 0 }
const cleanText = text => text.replaceAll('Gefuehl','Gefühl').replaceAll('muessten','müssten').replaceAll('Notfaellen','Notfällen').replaceAll('Rueckfragen','Rückfragen').replaceAll('staendig','ständig').replaceAll('naechsten','nächsten')

async function synthesize(text, voice) {
  const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key },
    body: JSON.stringify({ input: { text: cleanText(text) }, voice: { languageCode: 'de-DE', name: voice }, audioConfig: { audioEncoding: 'LINEAR16', sampleRateHertz: 24000, speakingRate: 0.95 } }),
    signal: AbortSignal.timeout(90000),
  })
  if (!response.ok) { const data = await response.json(); throw new Error(`Google TTS ${response.status}: ${data.error?.message || 'Synthesis failed'}`) }
  const data = await response.json()
  if (!data.audioContent) throw new Error('TTS returned no audio.')
  const wav = Buffer.from(data.audioContent, 'base64')
  for (let pos = 12; pos + 8 <= wav.length;) {
    const size = wav.readUInt32LE(pos + 4)
    if (wav.toString('ascii', pos, pos + 4) === 'data') return wav.subarray(pos + 8, pos + 8 + size)
    pos += 8 + size + (size % 2)
  }
  throw new Error('TTS returned an invalid WAV file.')
}
function wavFile(pcm) {
  const h = Buffer.alloc(44)
  h.write('RIFF'); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVEfmt ', 8); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(24000, 24); h.writeUInt32LE(48000, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40)
  return Buffer.concat([h, pcm])
}
for (const [index, recording] of recordings.entries()) {
  const revision = /^(Amir|Mitarbeiterin|Hausverwaltung|Bewohnerin):/m.test(recording.text) ? 'chirp3-dialogue-v2' : 'chirp3-dialogue-v1'
  const id = createHash('sha256').update(`${revision}:${recording.text}`).digest('hex').slice(0, 20)
  const filename = `${id}.m4a`
  const destination = new URL(filename, outputDir)
  if (!existsSync(destination) || statSync(destination).size < 1000) {
    const temporary = join(tmpdir(), `deutsch-neural-${id}.wav`)
    if (!existsSync(temporary)) {
    const speakerMap = new Map()
    const lines = recording.text.split('\n').filter(line => line.trim())
    const parts = []
    for (const line of lines) {
      const match = line.match(/^([\p{L} .-]{2,35}):\s*(.+)$/u)
      if (match && !speakerMap.has(match[1])) speakerMap.set(match[1], speakerMap.size % 2)
      const voice = voices[match ? (speakerVoices[match[1]] ?? speakerMap.get(match[1])) : 0]
      parts.push(await synthesize(match ? match[2] : line, voice), Buffer.alloc(14400))
    }
    writeFileSync(temporary, wavFile(Buffer.concat(parts)))
    }
    execFileSync('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac@44100', '-b', '96000', temporary, destination.pathname])
    unlinkSync(temporary)
  }
  recording.src = `/andarun/deutsch/audio/${filename}`
  recording.voice = 'Google Chirp 3 HD · Sulafat / Charon'
  writeFileSync(manifestPath, `${JSON.stringify(recordings, null, 2)}\n`)
  console.log(`Prepared ${index + 1}/${recordings.length}: ${filename}`)
  if (sample) break
}
