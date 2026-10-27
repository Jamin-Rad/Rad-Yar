/** Prepare German recordings once on macOS. Playback never calls a speech service.
 * node scripts/prepare-deutsch-audio.mjs [lessons.json]
 * Input: a lesson, an array of lessons, or { lessons: [...] }. Records reading and listening texts.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const manifestPath = new URL('../data/deutschRecordings.json', import.meta.url)
const recordings = JSON.parse(readFileSync(manifestPath, 'utf8'))
if (process.argv[2]) {
  const input = JSON.parse(readFileSync(process.argv[2], 'utf8'))
  const lessons = Array.isArray(input) ? input : input.lessons || input.state?.lessons || [input]
  for (const lesson of lessons) {
    for (const section of [lesson.reading, lesson.listening]) {
      if (section?.text && !recordings.some(item => item.text === section.text)) recordings.push({ text: section.text })
    }
  }
}
const outputDir = new URL('../public/andarun/deutsch/audio/', import.meta.url)
mkdirSync(outputDir, { recursive: true })
for (const recording of recordings) {
  const id = createHash('sha256').update(recording.text).digest('hex').slice(0, 20)
  const filename = `${id}.wav`
  const destination = new URL(filename, outputDir)
  if (!existsSync(destination)) {
    const temporary = join(tmpdir(), `deutsch-${id}.aiff`)
    // Legacy lesson text sometimes spells umlauts as ae/oe/ue.
    const spokenText = recording.text.replaceAll('Gefuehl', 'Gefühl').replaceAll('muessten', 'müssten').replaceAll('Notfaellen', 'Notfällen').replaceAll('Rueckfragen', 'Rückfragen').replaceAll('staendig', 'ständig')
    execFileSync('/usr/bin/say', ['-v', 'Anna', '-r', '155', '-o', temporary, spokenText])
    if (statSync(temporary).size <= 4096) throw new Error('The German voice produced no audio. Run this command with access to the installed macOS voices.')
    execFileSync('/usr/bin/afconvert', ['-f', 'WAVE', '-d', 'LEI16', temporary, destination.pathname])
    unlinkSync(temporary)
  }
  recording.src = `/andarun/deutsch/audio/${filename}`
}
writeFileSync(manifestPath, `${JSON.stringify(recordings, null, 2)}\n`)
console.log(`Prepared ${recordings.length} recordings.`)
