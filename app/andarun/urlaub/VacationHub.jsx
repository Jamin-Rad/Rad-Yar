'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import AndarunNav from '../AndarunNav'
import styles from './vacation.module.css'
import {
  VACATION_CATEGORIES, VACATION_STORE_KEY, formatVacationEuro, formatVacationRange,
  formatVacationToman, importedVacations, iranTripSummary, makeVacationId,
  normalizeVacations, vacationDuration, vacationTotal,
} from './vacationData'
import { useVacationBudget } from './useVacationBudget'

const CATEGORY_ICON = {
  stay: <><path d="M4 19V8M4 14h16v5M7 14V9h5a3 3 0 0 1 3 3v2M4 19v2M20 19v2"/></>,
  transport: <><path d="M5 17h14l-1-7a3 3 0 0 0-3-2H9a3 3 0 0 0-3 2l-1 7Z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M7 12h10"/></>,
  food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 3 4 7 0 10"/></>,
  activities: <><path d="m12 3 2.2 4.7 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7Z"/></>,
  other: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
}

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{CATEGORY_ICON[name] || <path d="M5 12h14M13 6l6 6-6 6"/>}</svg>
}

function mergeTrips(store) {
  const saved = normalizeVacations(store[VACATION_STORE_KEY]).trips
  const savedById = new Map(saved.map(trip => [trip.id, trip]))
  const imported = importedVacations(store).map(trip => {
    const additions = savedById.get(trip.id)
    if (!additions) return trip
    savedById.delete(trip.id)
    return { ...trip, ...additions, imported: true, expenses: [...trip.expenses, ...(additions.expenses || [])] }
  })
  return [...savedById.values(), ...imported].toSorted((a, b) => b.startDate.localeCompare(a.startDate))
}

function initialTripForm() {
  const start = new Date()
  const end = new Date(start)
  end.setDate(end.getDate() + 7)
  return {
    title: '', destination: '',
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  }
}

export default function VacationHub() {
  const router = useRouter()
  const { budget, loaded, status, save } = useVacationBudget()
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState(initialTripForm)

  const iran = useMemo(() => iranTripSummary(budget.store), [budget.store])
  const trips = useMemo(() => mergeTrips(budget.store), [budget.store])
  const allExpenses = useMemo(() => [
    ...trips.flatMap(trip => trip.expenses || []),
    ...iran.expenses.map(entry => {
      const rate = Number(entry.exchangeRateAtEntryToman || (entry.exchangeRateUnit === 'toman' ? entry.exchangeRateAtEntry : 0) || budget.store?.__iran_special_trip_v1?.exchangeRate || 0)
      const amount = Number(entry.amountEuroAtEntry || (entry.originalCurrency === 'eur' ? entry.originalAmount : 0) || (rate > 0 ? Number(entry.amountRial || 0) / 10 / rate : 0))
      const text = String(entry.category || '').toLowerCase()
      const category = /aufenthalt/.test(text) ? 'stay' : /transport/.test(text) ? 'transport' : /essen/.test(text) ? 'food' : /freizeit/.test(text) ? 'activities' : 'other'
      return { category, amount }
    }),
  ], [trips, iran.expenses, budget.store])
  const categoryTotals = useMemo(() => VACATION_CATEGORIES.map(category => ({
    ...category,
    total: allExpenses.filter(expense => expense.category === category.id).reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
  })), [allExpenses])
  const grandTotal = categoryTotals.reduce((sum, category) => sum + category.total, 0)
  const maxCategory = Math.max(1, ...categoryTotals.map(category => category.total))

  async function createTrip(event) {
    event.preventDefault()
    if (!form.title || !form.startDate || !form.endDate) return
    const id = makeVacationId()
    const current = normalizeVacations(budget.store[VACATION_STORE_KEY])
    const trip = { id, ...form, expenses: [], createdAt: new Date().toISOString() }
    const next = { ...budget, store: { ...budget.store, [VACATION_STORE_KEY]: { trips: [trip, ...current.trips] } } }
    await save(next)
    router.push(`/andarun/urlaub/${id}`)
  }

  return <main className={styles.page}>
    <AndarunNav />
    <div className={styles.shell}>
      <header className={styles.hero}>
        <div><Link href="/andarun" className={styles.back}>← Zurück zu Andarun</Link><h1>Urlaubsarchiv</h1><p>Alle Reisen und ihre Kosten an einem Ort.</p></div>
        <div className={styles.heroActions}><span><i />{loaded ? status : 'Wird geladen …'}</span><button type="button" onClick={() => setShowNew(value => !value)}>+ Neuen Urlaub anlegen</button></div>
      </header>

      {showNew ? <form className={styles.newTrip} onSubmit={createTrip}>
        <div><h2>Neuen Urlaub anlegen</h2><p>Für normale Urlaube werden alle Ausgaben einfach in Euro geführt.</p></div>
        <label>Titel<input required value={form.title} onChange={event => setForm(previous => ({ ...previous, title: event.target.value }))} placeholder="z. B. Sommerurlaub Italien"/></label>
        <label>Ziel<input value={form.destination} onChange={event => setForm(previous => ({ ...previous, destination: event.target.value }))} placeholder="Ort oder Land"/></label>
        <label>Von<input required type="date" value={form.startDate} onChange={event => setForm(previous => ({ ...previous, startDate: event.target.value }))}/></label>
        <label>Bis<input required min={form.startDate} type="date" value={form.endDate} onChange={event => setForm(previous => ({ ...previous, endDate: event.target.value }))}/></label>
        <div className={styles.newActions}><button type="button" onClick={() => setShowNew(false)}>Abbrechen</button><button type="submit">Urlaub anlegen</button></div>
      </form> : null}

      <Link href="/andarun/iran-app" className={styles.iranTrip}>
        <div className={styles.specialIcon}>★</div>
        <div><span>Sonderurlaub</span><h2>Sonderurlaub Iran</h2><p>{formatVacationRange(iran.startDate, iran.endDate)} · {vacationDuration(iran.startDate, iran.endDate)} Tage</p></div>
        <div className={styles.iranCost}><small>Gesamtkosten</small><strong>{formatVacationEuro(iran.euro)}</strong><b>{formatVacationToman(iran.toman)}</b></div>
        <Icon name="arrow" />
      </Link>

      <section className={styles.archive} aria-labelledby="past-vacations">
        <div className={styles.sectionTitle}><div><h2 id="past-vacations">Bisherige Urlaube</h2><p>Bereits erfasste Ausflüge wurden automatisch nach Monat übernommen.</p></div><b>{trips.length} Reisen</b></div>
        <div className={styles.tripList}>{trips.map(trip => <Link href={`/andarun/urlaub/${trip.id}`} className={styles.tripRow} key={trip.id}>
          <div><strong>{trip.title}</strong><small>{trip.imported ? 'Aus bisherigen Monatsdaten' : trip.destination || 'Urlaub'}</small></div>
          <span>{formatVacationRange(trip.startDate, trip.endDate)}</span>
          <span>{vacationDuration(trip.startDate, trip.endDate)} Tage</span>
          <b>{formatVacationEuro(vacationTotal(trip))}</b>
          <Icon name="arrow" />
        </Link>)}</div>
        {loaded && !trips.length ? <div className={styles.empty}><strong>Noch keine früheren Urlaube</strong><p>Lege oben einen Urlaub an. Bereits vorhandene Ausflugskosten erscheinen hier automatisch.</p></div> : null}
      </section>

      <section className={styles.comparison}>
        <div className={styles.totalPanel}><span>Gesamtkosten aller Urlaube</span><strong>{formatVacationEuro(grandTotal)}</strong><small>{trips.length + 1} Reisen inklusive Iran</small></div>
        <div className={styles.categoryPanel}><div className={styles.sectionTitle}><div><h2>Kostenvergleich</h2><p>Alle Reisen nach Kostenart</p></div></div>
          <div className={styles.bars}>{categoryTotals.map(category => <div className={styles.barRow} key={category.id}>
            <span><i style={{color:category.color}}><Icon name={category.id}/></i>{category.label}</span>
            <div><i style={{width:`${(category.total / maxCategory) * 100}%`,background:category.color}} /></div>
            <b>{formatVacationEuro(category.total)}</b>
          </div>)}</div>
        </div>
      </section>
    </div>
  </main>
}
