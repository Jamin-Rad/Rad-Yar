import { auth, currentUser } from '@clerk/nextjs/server'
import { canonicalUserEmail, primaryEmailFromUser } from '@/lib/emailIdentity'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

function normalizedEmail(user) {
  return canonicalUserEmail(user)
}

export async function getSignedInUserIdentity(request) {
  const { userId } = await auth()
  if (!userId) return null
  const expectedUserId = request?.headers?.get('X-Radyar-User-Id')
  if (expectedUserId && expectedUserId !== userId) return null

  let email = ''
  let originalEmail = ''
  let emailVerified = false
  try {
    const user = await currentUser()
    if (!user || user.id !== userId) return null
    email = normalizedEmail(user)
    originalEmail = primaryEmailFromUser(user).trim().toLowerCase()
    const primary = user.emailAddresses?.find(entry => entry.id === user.primaryEmailAddressId) || user.primaryEmailAddress
    emailVerified = primary?.verification?.status === 'verified'
  } catch { return null }

  const ownerId = email ? `email:${email}` : userId
  const lookupIds = [...new Set([ownerId, userId, ...(originalEmail ? [`email:${originalEmail}`] : [])])]

  return { userId, email, emailVerified, ownerId, lookupIds }
}

export async function getLearningUserIdentity(request) {
  const identity = await getSignedInUserIdentity(request)
  if (!identity) return null
  const result = { ...identity, ownerId: identity.userId, lookupIds: [identity.userId] }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return { ...result, storageUnavailable: true }
  const { data, error } = await supabaseAdmin.rpc('claim_learning_legacy_ids', {
    p_user_id: identity.userId, p_legacy_ids: identity.emailVerified ? identity.lookupIds.filter(id => id.startsWith('email:')) : [],
  })
  if (error) return { ...result, storageUnavailable: true }
  return { ...result, lookupIds: [identity.userId, ...(data || [])] }
}
