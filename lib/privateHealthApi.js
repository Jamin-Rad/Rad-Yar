import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

function unavailable(label) {
  return NextResponse.json({ error: `${label} health storage is not available.` }, { status: 503 })
}

function scopedId(ownerId, id) {
  const raw = typeof id === 'string' && id ? id : `item-${Date.now()}`
  return raw.startsWith(`${ownerId}:`) ? raw : `${ownerId}:${raw}`
}

function isMissingOwnerColumn(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''} ${error?.code || ''}`
  return /owner_id|schema cache|PGRST204|42703/i.test(text)
}

async function loadHealth(ownerId, label) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable(label)

  const [records, customSports, customFoods, deletedIds] = await Promise.all([
    supabaseAdmin.from('health_records').select('*').eq('owner_id', ownerId).order('date', { ascending: false }),
    supabaseAdmin.from('health_custom_sports').select('*').eq('owner_id', ownerId).order('created_at'),
    supabaseAdmin.from('health_custom_foods').select('*').eq('owner_id', ownerId).order('created_at'),
    supabaseAdmin.from('health_deleted_ids').select('*').eq('owner_id', ownerId),
  ])

  const ownerError = [records, customSports, customFoods, deletedIds].find(result => result.error && isMissingOwnerColumn(result.error))
  if (ownerError) return unavailable(`${label} health owner migration`)

  const error = records.error || customSports.error || customFoods.error || deletedIds.error
  if (error) return NextResponse.json({ error: error.message }, { status: 503 })

  return NextResponse.json({
    records: records.data ?? [],
    customSports: customSports.data ?? [],
    customFoods: customFoods.data ?? [],
    deletedSports: (deletedIds.data ?? []).filter(item => item.item_type === 'sport').map(item => item.item_id),
    deletedFoods: (deletedIds.data ?? []).filter(item => item.item_type === 'food').map(item => item.item_id),
  })
}

async function saveRecord(ownerId, request) {
  const body = await request.json()
  const date = typeof body.date === 'string' ? body.date : ''
  if (!date) return NextResponse.json({ error: 'date fehlt' }, { status: 400 })

  const { error } = await supabaseAdmin.from('health_records').upsert({
    id: `record-${ownerId}-${date}`,
    owner_id: ownerId,
    date,
    weight: body.weight || null,
    note: body.note || '',
    manual_kcal: body.manual_kcal || 0,
    sports: Array.isArray(body.sports) ? body.sports : [],
    foods: Array.isArray(body.foods) ? body.foods : [],
    updated_at: new Date().toISOString(),
  }, { onConflict: 'owner_id,date' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function deleteRecord(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('health_records')
    .delete()
    .eq('owner_id', ownerId)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function addSport(ownerId, request) {
  const { id, de, fa, kcalPerMin } = await request.json()
  const { error } = await supabaseAdmin.from('health_custom_sports').insert({
    id: scopedId(ownerId, id),
    owner_id: ownerId,
    de,
    fa: fa || '',
    kcal_per_min: kcalPerMin,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function deleteSport(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = custom
    ? await supabaseAdmin.from('health_custom_sports').delete().eq('owner_id', ownerId).eq('id', id)
    : await supabaseAdmin.from('health_deleted_ids').upsert({ owner_id: ownerId, item_type: 'sport', item_id: id })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function restoreSport(ownerId, request) {
  const { id } = await request.json()
  const { error } = await supabaseAdmin.from('health_deleted_ids')
    .delete()
    .eq('owner_id', ownerId)
    .eq('item_type', 'sport')
    .eq('item_id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function addFood(ownerId, request) {
  const { id, de, fa, cat, kcalPer100g, portionG } = await request.json()
  const { error } = await supabaseAdmin.from('health_custom_foods').insert({
    id: scopedId(ownerId, id),
    owner_id: ownerId,
    de,
    fa: fa || '',
    cat: cat || 'sonstiges',
    kcal_per_100g: kcalPer100g,
    portion_g: portionG || 100,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function deleteFood(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  const { error } = custom
    ? await supabaseAdmin.from('health_custom_foods').delete().eq('owner_id', ownerId).eq('id', id)
    : await supabaseAdmin.from('health_deleted_ids').upsert({ owner_id: ownerId, item_type: 'food', item_id: id })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

async function restoreFood(ownerId, request) {
  const { id } = await request.json()
  const { error } = await supabaseAdmin.from('health_deleted_ids')
    .delete()
    .eq('owner_id', ownerId)
    .eq('item_type', 'food')
    .eq('item_id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export function createPrivateHealthHandlers(requireIdentity, label) {
  async function getIdentity() {
    const identity = await requireIdentity()
    if (identity.error) return { response: NextResponse.json({ error: identity.error }, { status: identity.status }) }
    if (!isSupabaseAdminConfigured || !supabaseAdmin) return { response: unavailable(label) }
    return { ownerId: identity.ownerId }
  }

  return {
    async GET() {
      const identity = await getIdentity()
      if (identity.response) return identity.response
      return loadHealth(identity.ownerId, label)
    },
    records: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return saveRecord(identity.ownerId, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteRecord(identity.ownerId, request)
      },
    },
    sports: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return addSport(identity.ownerId, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteSport(identity.ownerId, request)
      },
      async PATCH(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return restoreSport(identity.ownerId, request)
      },
    },
    foods: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return addFood(identity.ownerId, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteFood(identity.ownerId, request)
      },
      async PATCH(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return restoreFood(identity.ownerId, request)
      },
    },
  }
}
