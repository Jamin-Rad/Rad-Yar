import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

const ADMIN_HEALTH_OWNER = 'admin'

export async function GET() {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const [records, customSports, customFoods, deletedIds] = await Promise.all([
    supabaseAdmin.from('health_records').select('*').eq('owner_id', ADMIN_HEALTH_OWNER).order('date', { ascending: false }),
    supabaseAdmin.from('health_custom_sports').select('*').eq('owner_id', ADMIN_HEALTH_OWNER).order('created_at'),
    supabaseAdmin.from('health_custom_foods').select('*').eq('owner_id', ADMIN_HEALTH_OWNER).order('created_at'),
    supabaseAdmin.from('health_deleted_ids').select('*').eq('owner_id', ADMIN_HEALTH_OWNER),
  ])

  const error = records.error || customSports.error || customFoods.error || deletedIds.error
  if (error) return NextResponse.json({ error: error.message }, { status: 503 })

  return NextResponse.json({
    records:      records.data      ?? [],
    customSports: customSports.data ?? [],
    customFoods:  customFoods.data  ?? [],
    deletedSports: (deletedIds.data ?? []).filter(item => item.item_type === 'sport').map(item => item.item_id),
    deletedFoods:  (deletedIds.data ?? []).filter(item => item.item_type === 'food').map(item => item.item_id),
  })
}
