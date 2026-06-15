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
    if (!response.ok) throw new Error(`Progress write failed: ${response.status}`)

    const pending = loadPending()
    delete pending[key]
    savePending(pending)
    return true
  } catch {
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
        allSucceeded = false
        continue
      }
      delete pending[key]
    } catch {
      allSucceeded = false
    }
  }
  savePending(pending)
  return allSucceeded
}
