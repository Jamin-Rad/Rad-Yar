// ─── App-Einstellungen (geräteweit, localStorage) ──────

const KEY = 'radyar_settings'

const DEFAULTS = {
  longBoxesEnabled: false,
  mcqDailyGoal: 10,
}

export function loadSettings() {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  try {
    const raw = window.localStorage.getItem(KEY)
    return { ...DEFAULTS, ...(raw ? JSON.parse(raw) : {}) }
  } catch {
    return { ...DEFAULTS }
  }
}

export function saveSettings(settings) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(KEY, JSON.stringify(settings)) } catch (_) {}
}
