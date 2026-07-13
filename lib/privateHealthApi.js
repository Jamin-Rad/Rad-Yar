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
}

function fallbackId(ownerId) {
  return `health:${ownerId}`
}

function normalizeState(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    records: Array.isArray(state.records) ? state.records : [],
    customSports: Array.isArray(state.customSports) ? state.customSports : [],
    customFoods: Array.isArray(state.customFoods) ? state.customFoods : [],
    deletedSports: Array.isArray(state.deletedSports) ? state.deletedSports : [],
    deletedFoods: Array.isArray(state.deletedFoods) ? state.deletedFoods : [],
  }
}

function unique(items) {
  return [...new Set(items.filter(Boolean))]
}

async function readState(ownerId) {
  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store')
    .eq('id', fallbackId(ownerId))
    .maybeSingle()

  if (error) throw error
  return normalizeState(data?.store || EMPTY_HEALTH_STATE)
}

async function writeState(ownerId, state) {
  const saved = normalizeState(state)
  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({
      id: fallbackId(ownerId),
      store: saved,
      recurring: [],
      cat_budgets: {},
      categories: [],
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })
    .select('store')
    .single()

  if (error) throw error
  return normalizeState(data?.store || saved)
}

async function updateState(ownerId, updater) {
  const current = await readState(ownerId)
  const next = normalizeState(await updater(current))
  return writeState(ownerId, next)
}

async function loadHealth(ownerId, label) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable(label)

  try {
    return NextResponse.json(await readState(ownerId))
  } catch (error) {
    console.error(`[private-health:${ownerId}] load failed`, error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

async function saveRecord(ownerId, request) {
  const body = await request.json()
  const date = typeof body.date === 'string' ? body.date : ''
  if (!date) return NextResponse.json({ error: 'date fehlt' }, { status: 400 })

  const record = {
    id: `record-${ownerId}-${date}`,
    date,
    weight: body.weight || null,
    note: body.note || '',
    manual_kcal: body.manual_kcal || 0,
    sports: Array.isArray(body.sports) ? body.sports : [],
    foods: Array.isArray(body.foods) ? body.foods : [],
    updated_at: new Date().toISOString(),
  }

  try {
    await updateState(ownerId, state => ({
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

async function deleteRecord(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(ownerId, state => ({
      ...state,
      records: state.records.filter(item => item.id !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function addSport(ownerId, request) {
  const { id, de, fa, kcalPerMin } = await request.json()
  const sport = {
    id: scopedId(ownerId, id),
    de: de || '',
    fa: fa || '',
    kcal_per_min: Number(kcalPerMin) || 0,
    created_at: new Date().toISOString(),
  }

  try {
    await updateState(ownerId, state => ({
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

async function deleteSport(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(ownerId, state => ({
      ...state,
      customSports: custom ? state.customSports.filter(item => item.id !== id) : state.customSports,
      deletedSports: custom ? state.deletedSports : unique([...state.deletedSports, id]),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function restoreSport(ownerId, request) {
  const { id } = await request.json()
  try {
    await updateState(ownerId, state => ({
      ...state,
      deletedSports: state.deletedSports.filter(item => item !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function addFood(ownerId, request) {
  const { id, de, fa, cat, kcalPer100g, portionG } = await request.json()
  const food = {
    id: scopedId(ownerId, id),
    de: de || '',
    fa: fa || '',
    cat: cat || 'sonstiges',
    kcal_per_100g: Number(kcalPer100g) || 0,
    portion_g: Number(portionG) || 100,
    created_at: new Date().toISOString(),
  }

  try {
    await updateState(ownerId, state => ({
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

async function deleteFood(ownerId, request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const custom = searchParams.get('custom') === 'true'
  if (!id) return NextResponse.json({ error: 'id fehlt' }, { status: 400 })

  try {
    await updateState(ownerId, state => ({
      ...state,
      customFoods: custom ? state.customFoods.filter(item => item.id !== id) : state.customFoods,
      deletedFoods: custom ? state.deletedFoods : unique([...state.deletedFoods, id]),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function restoreFood(ownerId, request) {
  const { id } = await request.json()
  try {
    await updateState(ownerId, state => ({
      ...state,
      deletedFoods: state.deletedFoods.filter(item => item !== id),
    }))
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
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
