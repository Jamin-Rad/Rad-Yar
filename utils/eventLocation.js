// Reuse the existing calendar note format, including ICS and ChatGPT events.
// No schema migration or second copy of the event location is needed.
export function splitEventNote(value) {
  const note = typeof value === 'string' ? value : ''
  const match = note.match(/^Ort:[ \t]*([^\r\n]*)(?:\r?\n|$)/i)
  return match ? { location: match[1].trim(), note: note.slice(match[0].length) } : { location: '', note }
}

export function combineEventNote(location, note) {
  const place = (location || '').replace(/[\r\n]+/g, ' ').trim()
  return [place ? `Ort: ${place}` : '', (note || '').trim()].filter(Boolean).join('\n')
}
