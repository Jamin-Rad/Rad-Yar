const PENDING_KEY = 'radyar_pending_progress'

function loadPending() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || '{}')
  } catch {
    return {}
  }
}

function savePending(pending) {
  if (typeof window === 'undefined') return
  try {
    if (Object.keys(pending).length === 0) localStorage.removeItem(PENDING_KEY)
    else localStorage.setItem(PENDING_KEY, JSON.stringify(pending))
  } catch {}
}

export function queueProgressWrite(key, endpoint, payload) {
  const pending = loadPending()
  pending[key] = { endpoint, payload, queuedAt: new Date().toISOString() }
  savePending(pending)
}

async function progressError(response) {
  let message = `Progress write failed: ${response.status}`
  try {
    const body = await response.json()
    if (body?.error) message = `${message} (${body.error})`
  } catch {}
  return new Error(message)
}

export async function persistProgressWrite(key, endpoint, payload, canSync) {
  if (!canSync) {
    queueProgressWrite(key, endpoint, payload)
    return false
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw await progressError(response)

    const pending = loadPending()
    delete pending[key]
    savePending(pending)
    return true
  } catch (error) {
    console.error('Fortschritt konnte nicht gespeichert werden:', error.message)
    queueProgressWrite(key, endpoint, payload)
    return false
  }
}

export async function flushPendingProgress() {
  const pending = loadPending()
  const entries = Object.entries(pending)
  if (entries.length === 0) return true

  let allSucceeded = true
  for (const [key, item] of entries) {
    try {
      const response = await fetch(item.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload),
      })
      if (!response.ok) {
        console.error('Ausstehender Fortschritt konnte nicht gespeichert werden:', (await progressError(response)).message)
        allSucceeded = false
        continue
      }
      delete pending[key]
    } catch (error) {
      console.error('Ausstehender Fortschritt konnte nicht gespeichert werden:', error.message)
      allSucceeded = false
    }
  }
  savePending(pending)
  return allSucceeded
}
