import { NextResponse } from 'next/server'
import { requireAdmin, hasAdminEmail } from '@/lib/adminAuth'
import { isSubscriptionActive } from '@/utils/subscription'

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

    const cleaned = users.map(u => ({
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
    }))

    const promoActivatedCount = summaryUsers.filter(u => u.publicMetadata?.subscription?.promo).length
    const activeSubscriptionCount = summaryUsers.filter(u => isSubscriptionActive(u)).length
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const newUsers7Count = summaryUsers.filter(u => u.createdAt && new Date(u.createdAt).getTime() >= weekAgo).length

    return NextResponse.json({
      users: cleaned,
      totalCount,
      promoActivatedCount,
      activeSubscriptionCount,
      newUsers7Count,
    })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
