import { NextResponse } from 'next/server'
import { requireAdmin, hasAdminEmail } from '@/lib/adminAuth'

export async function GET(request) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')?.trim() || undefined

    const { data: users, totalCount } = await client.users.getUserList({
      limit: 200,
      orderBy: '-created_at',
      query,
    })

    const cleaned = users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      emailAddresses: u.emailAddresses,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
      banned: u.banned,
      locked: u.locked,
      isAdmin: hasAdminEmail(u.emailAddresses),
      subscription: u.publicMetadata?.subscription ?? null,
    }))

    const promoActivatedCount = cleaned.filter(u => u.subscription?.promo).length

    return NextResponse.json({ users: cleaned, totalCount, promoActivatedCount })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
