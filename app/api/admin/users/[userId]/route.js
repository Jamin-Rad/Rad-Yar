import { NextResponse } from 'next/server'
import { requireAdmin, hasAdminEmail } from '@/lib/adminAuth'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import { getLessonStatus, normalizeLessonPath } from '@/data/lessonStatus'
import { PROMO_MONTHS, RENEWAL_MONTHS } from '@/utils/subscription'

async function getSameEmailUsers(client, user) {
  const email = canonicalUserEmail(user)
  if (!email) return [user]
  const { data } = await client.users.getUserList({ limit: 200 })
  const matching = (data || []).filter(candidate => canonicalUserEmail(candidate) === email)
  return matching.length ? matching : [user]
}

export async function PATCH(request, { params }) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin
    const { userId } = await params
    const { action, months, promo, pathname } = await request.json()

    const target = await client.users.getUser(userId)
    if (hasAdminEmail(target.emailAddresses)) {
      return NextResponse.json({ error: 'Admin-Account kann nicht bearbeitet werden' }, { status: 400 })
    }

    if (action === 'ban' || action === 'unban') {
      const updated = action === 'ban' ? await client.users.banUser(userId) : await client.users.unbanUser(userId)
      return NextResponse.json({ banned: updated.banned, locked: updated.locked })
    }

    if (action === 'setSubscription') {
      const monthsNum = Number(months)
      if (!Number.isFinite(monthsNum) || monthsNum <= 0) {
        return NextResponse.json({ error: 'Ungültige Laufzeit' }, { status: 400 })
      }
      const existing = target.publicMetadata?.subscription || {}
      const until = new Date()
      until.setMonth(until.getMonth() + monthsNum)
      const subscription = {
        status: 'active',
        until: until.toISOString(),
        activatedAt: existing.activatedAt || new Date().toISOString(),
        promo: !!promo || !!existing.promo,
      }
      const sameEmailUsers = await getSameEmailUsers(client, target)
      const updatedUsers = await Promise.all(sameEmailUsers.map(user => {
        const learningAccess = user.publicMetadata?.learningAccess
        const nextLearningAccess = learningAccess?.proRequest?.status === 'pending'
          ? { ...learningAccess, proRequest: { ...learningAccess.proRequest, status: 'approved', reviewedAt: new Date().toISOString() } }
          : learningAccess
        return client.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, subscription, ...(nextLearningAccess ? { learningAccess: nextLearningAccess } : {}) },
        })
      }))
      const updated = updatedUsers.find(user => user.id === userId) || updatedUsers[0]
      return NextResponse.json({ subscription: updated.publicMetadata?.subscription ?? subscription, learningAccess: updated.publicMetadata?.learningAccess ?? null })
    }

    if (action === 'approveProRequest' || action === 'rejectProRequest') {
      const requestState = target.publicMetadata?.learningAccess?.proRequest
      if (!requestState) return NextResponse.json({ error: 'Keine Pro-Anfrage vorhanden' }, { status: 400 })
      const sameEmailUsers = await getSameEmailUsers(client, target)
      const reviewedAt = new Date().toISOString()
      const approved = action === 'approveProRequest'
      const monthsToGrant = requestState.kind === 'renewal' ? RENEWAL_MONTHS : PROMO_MONTHS
      const until = new Date()
      until.setMonth(until.getMonth() + monthsToGrant)

      const updatedUsers = await Promise.all(sameEmailUsers.map(user => {
        const learningAccess = user.publicMetadata?.learningAccess || {}
        const publicMetadata = {
          ...user.publicMetadata,
          learningAccess: {
            ...learningAccess,
            proRequest: { ...requestState, status: approved ? 'approved' : 'rejected', reviewedAt },
          },
        }
        if (approved) {
          const existing = user.publicMetadata?.subscription || {}
          publicMetadata.subscription = {
            status: 'active',
            until: until.toISOString(),
            activatedAt: existing.activatedAt || reviewedAt,
            promo: requestState.kind === 'welcome' || !!existing.promo,
          }
        }
        return client.users.updateUser(user.id, { publicMetadata })
      }))
      const updated = updatedUsers.find(user => user.id === userId) || updatedUsers[0]
      return NextResponse.json({
        subscription: updated.publicMetadata?.subscription ?? null,
        learningAccess: updated.publicMetadata?.learningAccess ?? null,
      })
    }

    if (action === 'grantEarlyAccess' || action === 'rejectEarlyAccess' || action === 'revokeEarlyAccess') {
      const lessonPath = normalizeLessonPath(typeof pathname === 'string' ? pathname.split('?')[0] : '')
      if (!lessonPath || getLessonStatus(lessonPath) !== 'in_progress') {
        return NextResponse.json({ error: 'Ungültige Lektion' }, { status: 400 })
      }
      const sameEmailUsers = await getSameEmailUsers(client, target)
      const reviewedAt = new Date().toISOString()
      const updatedUsers = await Promise.all(sameEmailUsers.map(user => {
        const learningAccess = user.publicMetadata?.learningAccess || {}
        const paths = new Set(Array.isArray(learningAccess.earlyAccessPaths) ? learningAccess.earlyAccessPaths : [])
        if (action === 'grantEarlyAccess') paths.add(lessonPath)
        if (action === 'revokeEarlyAccess') paths.delete(lessonPath)
        const requests = { ...(learningAccess.earlyAccessRequests || {}) }
        if (action !== 'revokeEarlyAccess') {
          requests[lessonPath] = {
            ...(requests[lessonPath] || { requestedAt: reviewedAt, title: lessonPath }),
            status: action === 'grantEarlyAccess' ? 'approved' : 'rejected',
            reviewedAt,
          }
        } else if (requests[lessonPath]) {
          requests[lessonPath] = { ...requests[lessonPath], status: 'rejected', reviewedAt }
        }
        return client.users.updateUser(user.id, {
          publicMetadata: {
            ...user.publicMetadata,
            learningAccess: { ...learningAccess, earlyAccessPaths: [...paths], earlyAccessRequests: requests },
          },
        })
      }))
      const updated = updatedUsers.find(user => user.id === userId) || updatedUsers[0]
      return NextResponse.json({ learningAccess: updated.publicMetadata?.learningAccess ?? null })
    }

    if (action === 'clearSubscription') {
      const sameEmailUsers = await getSameEmailUsers(client, target)
      const updatedUsers = await Promise.all(sameEmailUsers.map(user => {
        const existing = user.publicMetadata?.subscription || {}
        const subscription = { ...existing, status: 'inactive' }
        return client.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, subscription },
        })
      }))
      const updated = updatedUsers.find(user => user.id === userId) || updatedUsers[0]
      return NextResponse.json({ subscription: updated.publicMetadata?.subscription ?? subscription, learningAccess: updated.publicMetadata?.learningAccess ?? null })
    }

    return NextResponse.json({ error: 'Unbekannte Aktion' }, { status: 400 })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin
    const { userId } = await params

    const target = await client.users.getUser(userId)
    if (hasAdminEmail(target.emailAddresses)) {
      return NextResponse.json({ error: 'Admin-Account kann nicht gelöscht werden' }, { status: 400 })
    }

    await client.users.deleteUser(userId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
