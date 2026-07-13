import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

function unavailable(label) {
  return NextResponse.json({ error: `${label} health storage is not available.` }, { status: 503 })
}

function scopedId(ownerId, id) {
  const raw = typeof id === 'string' && id ? id : `item-${Date.now()}`
  return raw.startsWith(`${ownerId}:`) ? raw : `${ownerId}:${raw}`
}

const EMPTY_HEALTH_STATE = {
  records: [],
  customSports: [],
  customFoods: [],
  deletedSports: [],
  deletedFoods: [],
  caloriePlan: null,
}

function fallbackId(storageId) {
  return `health:${storageId}`
}

function defaultStorageId(ownerId) {
  if (ownerId === 'private:fatima') return 'fatima'
  if (String(ownerId || '').includes('benjamin')) return 'andarun'
  return ownerId
}

function normalizeState(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    records: Array.isArray(state.records) ? state.records : [],
    customSports: Array.isArray(state.customSports) ? state.customSports : [],
    customFoods: Array.isArray(state.customFoods) ? state.customFoods : [],
    deletedSports: Array.isArray(state.deletedSports) ? state.deletedSports : [],
    deletedFoods: Array.isArray(state.deletedFoods) ? state.deletedFoods : [],
    caloriePlan: state.caloriePlan && typeof state.caloriePlan === 'object' ? state.caloriePlan : null,
  }
}

function unique(items) {
  return [...new Set(items.filter(Boolean))]
}

async function readState(storageId, legacyStorageIds = []) {
  const ids = unique([storageId, ...legacyStorageIds]).map(fallbackId)
  for (const id of ids) {
    const { data, error } = await supabaseAdmin
      .from('admin_budget_state')
      .select('store')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    const state = normalizeState(data?.store || EMPTY_HEALTH_STATE)
    if (data) return state
  }

  return normalizeState(EMPTY_HEALTH_STATE)
}

async function writeState(storageId, state) {
  const saved = normalizeState(state)
  const id = fallbackId(storageId)
  const payload = {
    id,
    store: saved,
    updated_at: new Date().toISOString(),
  }
  const result = await supabaseAdmin
    .from('admin_budget_state')
    .upsert(payload, { onConflict: 'id' })
    .select('store')
    .single()

  if (!result.error) return normalizeState(result.data?.store || saved)

  const text = `${result.error?.message || ''} ${result.error?.details || ''} ${result.error?.hint || ''} ${result.error?.code || ''}`
  if (!/updated_at|schema cache|PGRST204/i.test(text)) throw result.error

  const fallback = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({ id, store: saved }, { onConflict: 'id' })
    .select('store')
    .single()

  if (fallback.error) throw fallback.error
  return normalizeState(fallback.data?.store || saved)
}

async function updateState(storageId, legacyStorageIds, updater) {
  const current = await readState(storageId, legacyStorageIds)
  const next = normalizeState(await updater(current))
  return writeState(storageId, next)
}

async function loadHealth(storageId, legacyStorageIds, label) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable(label)

  try {
    return NextResponse.json(await readState(storageId, legacyStorageIds))
  } catch (error) {
    console.error(`[private-health:${storageId}] load failed`, error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

async function saveRecord(storageId, legacyStorageIds, request) {
  const body = await request.json()
  const date = typeof body.date === 'string' ? body.date : ''
  if (!date) return NextResponse.json({ error: 'date fehlt' }, { status: 400 })

  const record = {
    id: `record-${storageId}-${date}`,
    date,
    weight: body.weight || null,
    note: body.note || '',
    manual_kcal: body.manual_kcal || 0,
    sports: Array.isArray(body.sports) ? body.sports : [],
    foods: Array.isArray(body.foods) ? body.foods : [],
    updated_at: new Date().toISOString(),
  }

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      records: [
        record,
        ...state.records.filter(item => item.date !== date),
      ].sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function deleteRecord(storageId, legacyStorageIds, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      records: state.records.filter(item => item.id !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function addSport(storageId, legacyStorageIds, request) {
  const { id, de, fa, kcalPerMin } = await request.json()
  const sport = {
    id: scopedId(storageId, id),
    de: de || '',
    fa: fa || '',
    kcal_per_min: Number(kcalPerMin) || 0,
    created_at: new Date().toISOString(),
  }

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      customSports: [
        ...state.customSports.filter(item => item.id !== sport.id),
        sport,
      ],
      deletedSports: state.deletedSports.filter(item => item !== sport.id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function deleteSport(storageId, legacyStorageIds, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      customSports: custom ? state.customSports.filter(item => item.id !== id) : state.customSports,
      deletedSports: custom ? state.deletedSports : unique([...state.deletedSports, id]),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function restoreSport(storageId, legacyStorageIds, request) {
  const { id } = await request.json()
  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      deletedSports: state.deletedSports.filter(item => item !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function addFood(storageId, legacyStorageIds, request) {
  const { id, de, fa, cat, kcalPer100g, portionG } = await request.json()
  const food = {
    id: scopedId(storageId, id),
    de: de || '',
    fa: fa || '',
    cat: cat || 'sonstiges',
    kcal_per_100g: Number(kcalPer100g) || 0,
    portion_g: Number(portionG) || 100,
    created_at: new Date().toISOString(),
  }

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      customFoods: [
        ...state.customFoods.filter(item => item.id !== food.id),
        food,
      ],
      deletedFoods: state.deletedFoods.filter(item => item !== food.id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function deleteFood(storageId, legacyStorageIds, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      customFoods: custom ? state.customFoods.filter(item => item.id !== id) : state.customFoods,
      deletedFoods: custom ? state.deletedFoods : unique([...state.deletedFoods, id]),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function restoreFood(storageId, legacyStorageIds, request) {
  const { id } = await request.json()
  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      deletedFoods: state.deletedFoods.filter(item => item !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function loadSettings(storageId, legacyStorageIds, label) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable(label)

  try {
    const state = await readState(storageId, legacyStorageIds)
    return NextResponse.json({ caloriePlan: state.caloriePlan || null })
  } catch (error) {
    console.error(`[private-health:${storageId}] settings load failed`, error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

async function saveSettings(storageId, legacyStorageIds, request) {
  const body = await request.json()
  const caloriePlan = body.caloriePlan && typeof body.caloriePlan === 'object' ? body.caloriePlan : null

  try {
    await updateState(storageId, legacyStorageIds, state => ({
      ...state,
      caloriePlan,
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export function createPrivateHealthHandlers(requireIdentity, label, explicitStorageId) {
  async function getIdentity() {
    const identity = await requireIdentity()
    if (identity.error) return { response: NextResponse.json({ error: identity.error }, { status: identity.status }) }
    if (!isSupabaseAdminConfigured || !supabaseAdmin) return { response: unavailable(label) }
    const storageId = explicitStorageId || defaultStorageId(identity.ownerId)
    const legacyStorageIds = [
      identity.ownerId,
      ...(Array.isArray(identity.lookupOwnerIds) ? identity.lookupOwnerIds : []),
    ].filter(id => id && id !== storageId)
    return { storageId, legacyStorageIds }
  }

  return {
    async GET() {
      const identity = await getIdentity()
      if (identity.response) return identity.response
      return loadHealth(identity.storageId, identity.legacyStorageIds, label)
    },
    records: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return saveRecord(identity.storageId, identity.legacyStorageIds, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteRecord(identity.storageId, identity.legacyStorageIds, request)
      },
    },
    sports: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return addSport(identity.storageId, identity.legacyStorageIds, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteSport(identity.storageId, identity.legacyStorageIds, request)
      },
      async PATCH(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return restoreSport(identity.storageId, identity.legacyStorageIds, request)
      },
    },
    foods: {
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return addFood(identity.storageId, identity.legacyStorageIds, request)
      },
      async DELETE(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return deleteFood(identity.storageId, identity.legacyStorageIds, request)
      },
      async PATCH(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return restoreFood(identity.storageId, identity.legacyStorageIds, request)
      },
    },
    settings: {
      async GET() {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return loadSettings(identity.storageId, identity.legacyStorageIds, label)
      },
      async POST(request) {
        const identity = await getIdentity()
        if (identity.response) return identity.response
        return saveSettings(identity.storageId, identity.legacyStorageIds, request)
      },
    },
  }
}
