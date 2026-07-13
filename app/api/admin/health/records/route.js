import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

const ADMIN_HEALTH_OWNER = 'admin'

export async function POST(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const body = await request.json()
  const { id, date, weight, note, manual_kcal, sports, foods } = body

  const { error } = await supabaseAdmin.from('health_records').upsert({
    id: id || `record-${ADMIN_HEALTH_OWNER}-${date}`,
    owner_id: ADMIN_HEALTH_OWNER,
    date,
    weight:      weight || null,
    note:        note || '',
    manual_kcal: manual_kcal || 0,
    sports:      sports || [],
    foods:       foods || [],
    updated_at:  new Date().toISOString(),
  }, { onConflict: 'owner_id,date' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = await supabaseAdmin.from('health_records').delete().eq('owner_id', ADMIN_HEALTH_OWNER).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
