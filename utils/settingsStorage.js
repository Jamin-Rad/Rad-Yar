// ─── App-Einstellungen (pro Benutzer, localStorage) ──────

const KEY = 'radyar_settings'

const DEFAULTS = {
  longBoxesEnabled: false,
  mcqDailyGoal: 10,
}

function keyFor(userId) {
  return userId ? `${KEY}_${userId}` : KEY
}

export function loadSettings(userId) {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  try {
    const raw = window.localStorage.getItem(keyFor(userId))
    return { ...DEFAULTS, ...(raw ? JSON.parse(raw) : {}) }
  } catch {
    return { ...DEFAULTS }
  }
}

export function saveSettings(settings, userId) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(keyFor(userId), JSON.stringify(settings)) } catch (_) {}
}
