import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

const ADMIN_HEALTH_OWNER = 'admin'

// POST: add custom sport
export async function POST(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { id, de, fa, kcalPerMin } = await request.json()
  const { error } = await supabaseAdmin.from('health_custom_sports').insert({
    id,
    owner_id: ADMIN_HEALTH_OWNER,
    de,
    fa:           fa || '',
    kcal_per_min: kcalPerMin,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE ?id=&custom=true  → delete custom sport
// DELETE ?id=&custom=false → mark default sport as deleted
export async function DELETE(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { searchParams } = new URL(request.url)
  const id     = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = custom
    ? await supabaseAdmin.from('health_custom_sports').delete().eq('owner_id', ADMIN_HEALTH_OWNER).eq('id', id)
    : await supabaseAdmin.from('health_deleted_ids').upsert({ owner_id: ADMIN_HEALTH_OWNER, item_type: 'sport', item_id: id })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// PATCH: restore a deleted default sport
export async function PATCH(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { id } = await request.json()
  const { error } = await supabaseAdmin.from('health_deleted_ids')
    .delete().eq('owner_id', ADMIN_HEALTH_OWNER).eq('item_type', 'sport').eq('item_id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
