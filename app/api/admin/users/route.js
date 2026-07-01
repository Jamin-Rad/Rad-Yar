import { NextResponse } from 'next/server'
import { requireAdmin, hasAdminEmail } from '@/lib/adminAuth'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import { isSubscriptionActive } from '@/utils/subscription'

function toClientUser(u) {
  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    emailAddresses: u.emailAddresses,
    createdAt: u.createdAt,
    lastSignInAt: u.lastSignInAt,
    lastActiveAt: u.lastActiveAt,
    banned: u.banned,
    locked: u.locked,
    isAdmin: hasAdminEmail(u.emailAddresses),
    subscription: u.publicMetadata?.subscription ?? null,
  }
}

function mergeSameEmailUsers(users) {
  const byEmail = new Map()
  for (const user of users) {
    const key = canonicalUserEmail(user) || user.id
    const previous = byEmail.get(key)
    if (!previous) {
      byEmail.set(key, user)
      continue
    }

    const previousScore = Number(hasAdminEmail(previous.emailAddresses)) * 3 + Number(isSubscriptionActive(previous)) * 2 + Number(previous.lastSignInAt || 0) / 1e15
    const userScore = Number(hasAdminEmail(user.emailAddresses)) * 3 + Number(isSubscriptionActive(user)) * 2 + Number(user.lastSignInAt || 0) / 1e15
    if (userScore > previousScore) byEmail.set(key, user)
  }
  return [...byEmail.values()]
}

export async function GET(request) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')?.trim() || undefined

    const [{ data: users }, { data: summaryUsers, totalCount }] = await Promise.all([
      client.users.getUserList({ limit: 200, orderBy: '-created_at', query }),
      client.users.getUserList({ limit: 200, orderBy: '-created_at' }),
    ])

    const visibleUsers = mergeSameEmailUsers(users)
    const canonicalSummaryUsers = mergeSameEmailUsers(summaryUsers)
    const cleaned = visibleUsers.map(toClientUser)

    const promoActivatedCount = canonicalSummaryUsers.filter(u => u.publicMetadata?.subscription?.promo).length
    const activeSubscriptionCount = canonicalSummaryUsers.filter(u => isSubscriptionActive(u)).length
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const newUsers7Count = canonicalSummaryUsers.filter(u => u.createdAt && new Date(u.createdAt).getTime() >= weekAgo).length

    return NextResponse.json({
      users: cleaned,
      totalCount: canonicalSummaryUsers.length || totalCount,
      promoActivatedCount,
      activeSubscriptionCount,
      newUsers7Count,
    })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
