export const ENGLISH_STORAGE_KEY = 'mobin_english_vokabeltest_unit2_v1'

export function readEnglishHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(ENGLISH_STORAGE_KEY) || '{}')
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  } catch { return {} }
}

export function saveEnglishHistory(value) {
  try {
    localStorage.setItem(ENGLISH_STORAGE_KEY, JSON.stringify(value))
    window.dispatchEvent(new Event('mobin-english-progress'))
  } catch { /* Browser storage can be unavailable. */ }
}

export function challengeComplete(history) {
  const challenge = history?.['word-challenge']
  return Boolean(challenge?.completed || challenge?.date)
}

export function challengeAnswered(history) {
  return challengeComplete(history) ? 30 : Math.min(30, history?.['word-challenge']?.run?.results?.length || 0)
}

export function canOpenEnglishMode(mode, history) {
  return mode === 'word-challenge' || challengeComplete(history) && ['probe-a', 'probe-b'].includes(mode)
}
