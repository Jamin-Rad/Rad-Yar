// ─── Abo- und Zugriffsstufen ────────────────────────────
import { canonicalEmail, primaryEmailFromUser } from '@/lib/emailIdentity'

// Subscription-Status wird serverseitig in Clerk `publicMetadata.subscription`
// gepflegt (manuell durch den Admin), siehe app/api/admin/users/[userId]/route.js.

export const FREE_TOPIC_LIMIT = 2
export const FREE_ITEM_LIMIT = 5
export const FLASHCARD_TRIAL_DAYS = 10
export const PROMO_LIMIT = 1000
export const PROMO_MONTHS = 5
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
  return ageDays <= FLASHCARD_TRIAL_DAYS
}

export function hasFullAccess(user) {
  return isSubscriptionActive(user) || isFlashcardTrialActive(user)
}

export function isTechnikKapitelLocked(kapitelId, user) {
  return !isSubscriptionActive(user) && !TECHNIK_FREE_KAPITEL_IDS.includes(kapitelId)
}
