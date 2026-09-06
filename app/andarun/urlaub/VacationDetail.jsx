'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import AndarunNav from '../AndarunNav'
import styles from './vacation.module.css'
import {
  VACATION_CATEGORIES, VACATION_STORE_KEY, formatVacationDate, formatVacationEuro,
  formatVacationRange, importedVacations, makeVacationId, normalizeVacations, vacationDuration, vacationTotal,
} from './vacationData'
import { useVacationBudget } from './useVacationBudget'

export default function VacationDetail({ tripId }) {
  const { budget, loaded, status, save } = useVacationBudget()
  const [form, setForm] = useState({ category: 'stay', amount: '', date: new Date().toISOString().slice(0, 10), description: '' })
  const [notice, setNotice] = useState('')

  const savedState = useMemo(() => normalizeVacations(budget.store[VACATION_STORE_KEY]), [budget.store])
  const savedTrip = savedState.trips.find(item => item.id === tripId)
  const importedTrip = useMemo(() => importedVacations(budget.store).find(item => item.id === tripId), [budget.store, tripId])
  const trip = useMemo(() => {
    if (!importedTrip) return savedTrip
    return { ...importedTrip, ...savedTrip, imported: true, expenses: [...importedTrip.expenses, ...(savedTrip?.expenses || [])] }
  }, [importedTrip, savedTrip])
  const totals = useMemo(() => VACATION_CATEGORIES.map(category => ({
    ...category,
    total: (trip?.expenses || []).filter(expense => expense.category === category.id).reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
  })), [trip?.expenses])

  const tripStartDate = trip?.startDate
  const tripEndDate = trip?.endDate
  useEffect(() => {
    if (!tripStartDate || !tripEndDate) return
    setForm(previous => {
      if (previous.date >= tripStartDate && previous.date <= tripEndDate) return previous
      return { ...previous, date: tripEndDate }
    })
  }, [tripStartDate, tripEndDate])

  async function addExpense(event) {
    event.preventDefault()
    const amount = Number(form.amount || 0)
    if (!trip || amount <= 0) return
    const expense = { id: makeVacationId(), ...form, amount, createdAt: new Date().toISOString() }
    const base = savedTrip || { id: trip.id, title: trip.title, destination: trip.destination, startDate: trip.startDate, endDate: trip.endDate, imported: trip.imported, expenses: [] }
    const trips = savedTrip
      ? savedState.trips.map(item => item.id === trip.id ? { ...item, expenses: [expense, ...(item.expenses || [])] } : item)
      : [{ ...base, expenses: [expense] }, ...savedState.trips]
    await save({ ...budget, store: { ...budget.store, [VACATION_STORE_KEY]: { trips } } })
    setForm(previous => ({ ...previous, amount: '', description: '' }))
    setNotice('Ausgabe wurde gespeichert.')
  }

  async function removeExpense(expenseId) {
    if (!savedTrip) return
    const trips = savedState.trips.map(item => item.id === trip.id
      ? { ...item, expenses: (item.expenses || []).filter(expense => expense.id !== expenseId) }
      : item)
    await save({ ...budget, store: { ...budget.store, [VACATION_STORE_KEY]: { trips } } })
  }

  if (!loaded) return <main className={styles.page}><AndarunNav/><div className={styles.loading}>Urlaub wird geladen …</div></main>
  if (!trip) return <main className={styles.page}><AndarunNav/><div className={styles.notFound}><h1>Urlaub nicht gefunden</h1><Link href="/andarun/urlaub">← Alle Urlaube</Link></div></main>

  const savedExpenseIds = new Set((savedTrip?.expenses || []).map(expense => expense.id))
  return <main className={styles.page}>
    <AndarunNav />
    <div className={styles.shell}>
      <header className={styles.detailHero}>
        <div><Link href="/andarun/urlaub" className={styles.back}>← Alle Urlaube</Link><h1>{trip.title}</h1><p>{trip.destination || 'Urlaub'} · {formatVacationRange(trip.startDate, trip.endDate)} · {vacationDuration(trip.startDate, trip.endDate)} Tage</p></div>
        <div className={styles.detailTotal}><small>Gesamtkosten</small><strong>{formatVacationEuro(vacationTotal(trip))}</strong><span><i />{status}</span></div>
      </header>

      <form className={styles.expenseForm} onSubmit={addExpense}>
        <div><h2>Neue Ausgabe hinzufügen</h2><p>Alle Beträge werden für diesen Urlaub in Euro gespeichert.</p></div>
        <label>Kategorie<select value={form.category} onChange={event => setForm(previous => ({ ...previous, category: event.target.value }))}>{VACATION_CATEGORIES.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>
        <label>Betrag (€)<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={event => setForm(previous => ({ ...previous, amount: event.target.value }))} placeholder="0,00"/></label>
        <label>Datum<input required type="date" min={trip.startDate} max={trip.endDate} value={form.date} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))}/></label>
        <label>Beschreibung<input value={form.description} onChange={event => setForm(previous => ({ ...previous, description: event.target.value }))} placeholder="z. B. Hotelübernachtung"/></label>
        <button type="submit">Ausgabe speichern</button>
      </form>
      {notice ? <p className={styles.notice}>{notice}</p> : null}

      <section className={styles.expenseHistory}>
        <div className={styles.sectionTitle}><div><h2>Ausgabenverlauf</h2><p>{trip.imported ? 'Monatsdaten bleiben unverändert und werden hier gemeinsam mit neuen Einträgen gezeigt.' : 'Alle Ausgaben dieses Urlaubs.'}</p></div><b>{trip.expenses.length} Einträge</b></div>
        {trip.expenses.length ? <div className={styles.expenseTableWrap}><table><thead><tr><th>Datum</th><th>Kategorie</th><th>Beschreibung</th><th>Betrag</th><th /></tr></thead><tbody>{trip.expenses.toSorted((a,b) => b.date.localeCompare(a.date)).map(expense => {
          const category = VACATION_CATEGORIES.find(item => item.id === expense.category) || VACATION_CATEGORIES[4]
          return <tr key={expense.id}><td>{formatVacationDate(expense.date)}</td><td><span className={styles.categoryDot} style={{background:category.color}} />{category.label}</td><td>{expense.description || '—'}{expense.imported ? <small>Aus Monatsübersicht übernommen</small> : null}</td><td><strong>{formatVacationEuro(expense.amount)}</strong></td><td>{savedExpenseIds.has(expense.id) ? <button type="button" onClick={() => removeExpense(expense.id)} aria-label="Ausgabe löschen">×</button> : <span className={styles.locked}>Original</span>}</td></tr>
        })}</tbody></table></div> : <div className={styles.empty}><strong>Noch keine Ausgaben vorhanden</strong><p>Füge die erste Ausgabe über das Formular hinzu.</p></div>}
        <div className={styles.categoryTotals}>{totals.map(category => <div key={category.id}><i style={{background:category.color}}/><span>{category.label}</span><strong>{formatVacationEuro(category.total)}</strong></div>)}</div>
      </section>
    </div>
  </main>
}
