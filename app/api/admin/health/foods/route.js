import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

// POST: add custom food
export async function POST(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { id, de, fa, cat, kcalPer100g, portionG } = await request.json()
  const { error } = await supabaseAdmin.from('health_custom_foods').insert({
    id,
    de,
    fa:             fa || '',
    cat:            cat || 'sonstiges',
    kcal_per_100g:  kcalPer100g,
    portion_g:      portionG || 100,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE ?id=&custom=true  → delete custom food
// DELETE ?id=&custom=false → mark default food as deleted
export async function DELETE(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { searchParams } = new URL(request.url)
  const id     = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = custom
    ? await supabaseAdmin.from('health_custom_foods').delete().eq('id', id)
    : await supabaseAdmin.from('health_deleted_ids').upsert({ item_type: 'food', item_id: id })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// PATCH: restore a deleted default food
export async function PATCH(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const { id } = await request.json()
  const { error } = await supabaseAdmin.from('health_deleted_ids')
    .delete().eq('item_type', 'food').eq('item_id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
