// ─── Abo- und Zugriffsstufen ────────────────────────────
import { canonicalEmail, primaryEmailFromUser } from '@/lib/emailIdentity'

// Subscription-Status wird serverseitig in Clerk `publicMetadata.subscription`
// gepflegt (manuell durch den Admin), siehe app/api/admin/users/[userId]/route.js.

export const FREE_TOPIC_LIMIT = 2
export const FREE_ITEM_LIMIT = 5
export const PRO_TRIAL_DAYS = 7
export const FLASHCARD_TRIAL_DAYS = PRO_TRIAL_DAYS
export const PROMO_MONTHS = 6
export const RENEWAL_MONTHS = 3
export const TECHNIK_FACH_ID = 'technik'
export const TECHNIK_FREE_KAPITEL_IDS = ['technik-kontrastmittel']
export const ADMIN_ACCESS_EMAIL = 'dr.benjaminzia@gmail.com'

export function isAdminAccessUser(user) {
  return canonicalEmail(primaryEmailFromUser(user)) === canonicalEmail(ADMIN_ACCESS_EMAIL)
}

export function getSubscription(user) {
  const sub = user?.publicMetadata?.subscription
  if (!sub) return { status: 'inactive', until: null, activatedAt: null, promo: false }
  return {
    status: sub.status === 'active' ? 'active' : 'inactive',
    until: sub.until || null,
    activatedAt: sub.activatedAt || null,
    promo: !!sub.promo,
  }
}

export function isSubscriptionActive(user) {
  if (isAdminAccessUser(user)) return true
  const sub = getSubscription(user)
  if (sub.status !== 'active') return false
  if (!sub.until) return true
  return new Date(sub.until).getTime() > Date.now()
}

export function isFlashcardTrialActive(user) {
  if (!user?.createdAt) return false
  const ageDays = (Date.now() - new Date(user.createdAt).getTime()) / 86400000
  return ageDays >= 0 && ageDays <= PRO_TRIAL_DAYS
}

export function hasFullAccess(user) {
  return isSubscriptionActive(user) || isFlashcardTrialActive(user)
}

export function getTrialUntil(user) {
  if (!user?.createdAt) return null
  return new Date(new Date(user.createdAt).getTime() + PRO_TRIAL_DAYS * 86400000).toISOString()
}

export function getProAccess(user) {
  if (isAdminAccessUser(user)) return { active: true, source: 'admin', until: null }
  const subscription = getSubscription(user)
  if (isSubscriptionActive(user)) {
    return { active: true, source: 'subscription', until: subscription.until }
  }
  if (isFlashcardTrialActive(user)) {
    return { active: true, source: 'trial', until: getTrialUntil(user) }
  }
  return { active: false, source: 'none', until: null }
}

export function getLearningAccess(user) {
  const access = user?.publicMetadata?.learningAccess
  return {
    earlyAccessPaths: Array.isArray(access?.earlyAccessPaths) ? access.earlyAccessPaths : [],
    proRequest: access?.proRequest || null,
    earlyAccessRequests: access?.earlyAccessRequests && typeof access.earlyAccessRequests === 'object'
      ? access.earlyAccessRequests
      : {},
  }
}

export function hasEarlyAccess(user, pathname) {
  if (isAdminAccessUser(user)) return true
  const normalizedPathname = normalizePathname(pathname)
  const { earlyAccessPaths } = getLearningAccess(user)
  return earlyAccessPaths.includes('*') || earlyAccessPaths.includes(normalizedPathname)
}

export function getProRequestKind(user) {
  const subscription = getSubscription(user)
  return subscription.activatedAt || subscription.promo ? 'renewal' : 'welcome'
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return pathname || ''
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export function isTechnikKapitelLocked(kapitelId, user) {
  return !hasFullAccess(user) && !TECHNIK_FREE_KAPITEL_IDS.includes(kapitelId)
}
