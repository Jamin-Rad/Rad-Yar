// The unscoped keys are a working cache for the active account only.
const OWNER_KEY = 'radyar_progress_cache_owner'
const GENERATION_KEY = 'radyar_progress_cache_generation'
const ANONYMOUS = '__anonymous__'
const CACHE_KEYS = [
  ['radyar_read_articles', {}],
  ['radyar_learning_history', []],
  ['radyar_mcq_scores', {}],
]

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback }
}

function saveCache(owner) {
  for (const [key, fallback] of CACHE_KEYS) {
    localStorage.setItem(`${key}_${owner}`, JSON.stringify(readJson(key, fallback)))
  }
}

export function activateUserCache(userId) {
  const nextOwner = userId || ANONYMOUS
  const owner = localStorage.getItem(OWNER_KEY)
  if (owner === nextOwner) return
  if (owner) saveCache(owner)
  else {
    // Preserve legacy data without guessing which account created it.
    for (const [key] of CACHE_KEYS) {
      const raw = localStorage.getItem(key)
      if (raw !== null && localStorage.getItem(`${key}_unclaimed`) === null) {
        localStorage.setItem(`${key}_unclaimed`, raw)
      }
    }
  }
  for (const [key, fallback] of CACHE_KEYS) {
    localStorage.setItem(key, JSON.stringify(readJson(`${key}_${nextOwner}`, fallback)))
  }
  localStorage.setItem(OWNER_KEY, nextOwner)
  localStorage.setItem(GENERATION_KEY, `${Date.now()}:${Math.random()}`)
}

export function isUserCacheActive(userId) {
  return localStorage.getItem(OWNER_KEY) === (userId || ANONYMOUS)
}

export function getUserCacheToken(userId) {
  return isUserCacheActive(userId) ? localStorage.getItem(GENERATION_KEY) : null
}

export function isUserCacheCurrent(userId, token) {
  return isUserCacheActive(userId) && getUserCacheToken(userId) === token
}

export function persistCurrentUserCache(userId) {
  if (isUserCacheActive(userId)) saveCache(userId || ANONYMOUS)
}
