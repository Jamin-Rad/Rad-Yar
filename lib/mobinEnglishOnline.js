import { readEnglishHistory, saveEnglishHistory } from './mobinEnglishProgress'
import { mergeEnglishHistory, normalizeEnglishHistory } from './mobinEnglishSync'

async function request(options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)
  try {
    const response = await fetch('/api/mobin/english', { cache: 'no-store', ...options, signal: controller.signal })
    if (!response.ok) throw new Error('English progress unavailable')
    const payload = await response.json()
    if (!payload.state || typeof payload.state !== 'object') throw new Error('Invalid progress')
    return normalizeEnglishHistory(payload.state)
  } finally { clearTimeout(timeout) }
}

export async function syncEnglishHistory(history) {
  const state = await request({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state: normalizeEnglishHistory(history) }), keepalive: true })
  const merged = mergeEnglishHistory(readEnglishHistory(), state)
  saveEnglishHistory(merged)
  return merged
}

export async function loadEnglishHistory() {
  const local = readEnglishHistory()
  const remote = await request()
  const merged = mergeEnglishHistory(remote, local)
  saveEnglishHistory(merged)
  return JSON.stringify(merged) === JSON.stringify(remote) ? merged : syncEnglishHistory(merged)
}
