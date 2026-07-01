import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const BUDGET_ID = 'default'

function makeId() {
  return `seed-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function entry(category, title, amount, date = '2026-01-01') {
  return {
    id: makeId(),
    type: 'expense',
    amount,
    title,
    subtitle: category,
    category,
    tags: [category],
    date,
  }
}

const JAN_2026_ENTRIES = [
  // Lebensmittel
  entry('Lebensmittel', 'Aldi',              266),
  entry('Lebensmittel', 'Lidl',              288),
  entry('Lebensmittel', 'Bonus',               2),
  entry('Lebensmittel', 'Edeka/Rewe/Netto',   21),
  entry('Lebensmittel', 'DM',                 60),
  entry('Lebensmittel', 'Türkei',            116),

  // Kleidung (standalone – NICHT unter Personen)
  entry('Kleidung', 'Takko',              44),
  entry('Kleidung', 'Ernstings Family',   41),

  // Restaurant
  entry('Restaurant', 'Essen', 171),

  // Auto
  entry('Auto', 'Tanken',  100),
  entry('Auto', 'Strom',     8),
  entry('Auto', 'Parekn',    3),
  entry('Auto', 'Waschen',   3),
  entry('Auto', 'Leasing', 348),

  // Zu Hause
  entry('Zu Hause', 'Miete',          2025),
  entry('Zu Hause', 'Darlehen',        475),
  entry('Zu Hause', 'Strom',           153),
  entry('Zu Hause', 'Internet',         47),
  entry('Zu Hause', 'Netflix',          12),
  entry('Zu Hause', 'Haushaltgerät',    25),

  // Jamin
  entry('Jamin', 'Konto',        11),
  entry('Jamin', 'Gothaer',      22),
  entry('Jamin', 'SIM-Karte',    31),
  entry('Jamin', 'Sonst',        34),
  entry('Jamin', 'Medikamente',  10),
  entry('Jamin', 'Versicherung', 78),

  // Fatima (Kleidung SEPARAT von allgemeinem Kleidung!)
  entry('Fatima', 'Iphone 16',    53),
  entry('Fatima', 'Kleidung',     31),
  entry('Fatima', 'Medikamente', 287),
  entry('Fatima', 'Cosmetics',    10),

  // Mobin
  entry('Mobin', 'Schule',       1029),
  entry('Mobin', 'Taschengeld',    18),
  entry('Mobin', 'Bus-Ticket',     45),
  entry('Mobin', 'Kleidung',       38),
  entry('Mobin', 'SIM-Karte',       9),
  entry('Mobin', 'Schulsachen',    71),
  entry('Mobin', 'Gift',          444),
  entry('Mobin', 'Sonst',          80),

  // Mobina
  entry('Mobina', 'Kindergarten', 370),
  entry('Mobina', 'Kleidung',      45),
  entry('Mobina', 'Spielzeug',      9),
  entry('Mobina', 'Sonst',        114),

  // Moschee
  entry('Moschee', 'Nazri', 21),
  entry('Moschee', 'Sonst',  50),

  // Ausflug (Mailand)
  entry('Ausflug', 'Milan', 1400),
]

export async function POST() {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ error: 'Supabase ist nicht konfiguriert.' }, { status: 503 })
  }

  // 1. Load current state
  const { data, error: getErr } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store,recurring,cat_budgets,categories')
    .eq('id', BUDGET_ID)
    .maybeSingle()

  if (getErr) return NextResponse.json({ error: getErr.message }, { status: 500 })

  const store      = data?.store      ?? {}
  const recurring  = data?.recurring  ?? []
  const catBudgets = data?.cat_budgets ?? {}
  const categories = data?.categories  ?? []

  // 2. Check if already seeded
  const jan = store['2026-01'] ?? { entries: [] }
  const alreadySeeded = jan.entries.some(e => String(e.id).startsWith('seed-'))
  if (alreadySeeded) {
    return NextResponse.json({ ok: true, message: 'Januar 2026 bereits eingetragen.' })
  }

  // 3. Merge entries
  const updatedStore = {
    ...store,
    '2026-01': {
      ...jan,
      entries: [...JAN_2026_ENTRIES, ...(jan.entries || [])],
    },
  }

  // 4. Save
  const { error: putErr } = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({
      id: BUDGET_ID,
      store: updatedStore,
      recurring,
      cat_budgets: catBudgets,
      categories,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

  if (putErr) return NextResponse.json({ error: putErr.message }, { status: 500 })

  return NextResponse.json({
    ok: true,
    message: `${JAN_2026_ENTRIES.length} Einträge für Januar 2026 hinzugefügt.`,
    total: JAN_2026_ENTRIES.reduce((s, e) => s + e.amount, 0),
  })
}
