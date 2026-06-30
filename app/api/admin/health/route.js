import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })

  const [records, customSports, customFoods, deletedIds] = await Promise.all([
    supabaseAdmin.from('health_records').select('*').order('date', { ascending: false }),
    supabaseAdmin.from('health_custom_sports').select('*').order('created_at'),
    supabaseAdmin.from('health_custom_foods').select('*').order('created_at'),
    supabaseAdmin.from('health_deleted_ids').select('*'),
  ])

  return NextResponse.json({
    records:      records.data      ?? [],
    customSports: customSports.data ?? [],
    customFoods:  customFoods.data  ?? [],
    deletedIds:   deletedIds.data   ?? [],
  })
}
