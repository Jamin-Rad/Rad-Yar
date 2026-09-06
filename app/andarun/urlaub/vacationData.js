export const VACATION_STORE_KEY = '__vacations_v1'
export const IRAN_TRIP_KEY = '__iran_special_trip_v1'

export const VACATION_CATEGORIES = [
  { id: 'stay', label: 'Unterkunft', color: '#2458ed' },
  { id: 'transport', label: 'Transport', color: '#86bd00' },
  { id: 'food', label: 'Verpflegung', color: '#ff775f' },
  { id: 'activities', label: 'Aktivitäten', color: '#8b5cf6' },
  { id: 'other', label: 'Sonstiges', color: '#7b8798' },
]

const monthFormatter = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' })
const dateFormatter = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
const euroFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })
const tomanFormatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })

export function makeVacationId() {
  return `urlaub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function formatVacationEuro(value) {
  return euroFormatter.format(Number(value || 0))
}

export function formatVacationToman(value) {
  return `${tomanFormatter.format(Number(value || 0))} Toman`
}

export function formatVacationDate(value) {
  return value ? dateFormatter.format(new Date(`${value}T12:00:00`)) : '—'
}

export function formatVacationRange(startDate, endDate) {
  return `${formatVacationDate(startDate)} – ${formatVacationDate(endDate)}`
}

export function vacationDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0
  return Math.max(1, Math.round((new Date(`${endDate}T12:00:00`) - new Date(`${startDate}T12:00:00`)) / 86400000) + 1)
}

export function categoryForImportedEntry(entry) {
  const text = `${entry.title || ''} ${entry.subtitle || ''} ${Object.values(entry.catSubtitles || {}).join(' ')}`.toLowerCase()
  if (/aufenthalt|hotel|unterkunft|miete/.test(text)) return 'stay'
  if (/transport|flug|bahn|taxi|bus|tanken|parken|mietwagen/.test(text)) return 'transport'
  if (/essen|restaurant|lebensmittel|verpflegung|supermarkt/.test(text)) return 'food'
  if (/ticket|museum|freizeit|aktivität|ausflug/.test(text)) return 'activities'
  return 'other'
}

export function normalizeVacations(value) {
  if (!value || typeof value !== 'object') return { trips: [] }
  return {
    trips: Array.isArray(value.trips) ? value.trips.map(trip => ({ ...trip, expenses: Array.isArray(trip.expenses) ? trip.expenses : [] })) : [],
  }
}

export function importedVacations(store) {
  return Object.entries(store || {}).flatMap(([monthKey, monthValue]) => {
    if (!/^\d{4}-\d{2}$/.test(monthKey)) return []
    const entries = (monthValue?.entries || []).filter(entry => (
      entry.type === 'expense' && (entry.category === 'Ausflug' || (entry.tags || []).includes('Ausflug'))
    ))
    if (!entries.length) return []
    const [year, month] = monthKey.split('-').map(Number)
    const lastDay = new Date(year, month, 0).getDate()
    const titles = [...new Set(entries.map(entry => entry.title).filter(title => title && !['Aufenthalt', 'Transport', 'Essen', 'Ticket'].includes(title)))]
    return [{
      id: `monat-${monthKey}`,
      imported: true,
      title: titles.length === 1 ? titles[0] : `Urlaub · ${monthFormatter.format(new Date(year, month - 1, 1))}`,
      destination: titles.length === 1 ? titles[0] : '',
      startDate: `${monthKey}-01`,
      endDate: `${monthKey}-${String(lastDay).padStart(2, '0')}`,
      expenses: entries.map(entry => ({
        id: `monat-${monthKey}-${entry.id}`,
        sourceId: entry.id,
        imported: true,
        date: entry.date || `${monthKey}-01`,
        category: categoryForImportedEntry(entry),
        amount: Number(entry.amount || 0),
        description: entry.title || entry.subtitle || 'Urlaubsausgabe',
      })),
    }]
  }).toSorted((a, b) => b.startDate.localeCompare(a.startDate))
}

export function iranTripSummary(store) {
  const trip = store?.[IRAN_TRIP_KEY] || {}
  const fallbackRate = Number(trip.exchangeRate || 0)
  const expenses = Array.isArray(trip.expenses) ? trip.expenses : []
  const euro = expenses.reduce((sum, entry) => {
    const lockedEuro = Number(entry.amountEuroAtEntry || 0)
    if (lockedEuro > 0) return sum + lockedEuro
    if (entry.originalCurrency === 'eur' && Number(entry.originalAmount) > 0) return sum + Number(entry.originalAmount)
    const rate = Number(entry.exchangeRateAtEntryToman || (entry.exchangeRateUnit === 'toman' ? entry.exchangeRateAtEntry : 0) || fallbackRate)
    return sum + (rate > 0 ? Number(entry.amountRial || 0) / 10 / rate : 0)
  }, 0)
  const toman = expenses.reduce((sum, entry) => sum + Number(entry.amountRial || 0) / 10, 0)
  return {
    id: 'iran', special: true, title: 'Sonderurlaub Iran', destination: 'Iran',
    startDate: '2026-07-31', endDate: '2026-08-23', expenses, euro, toman,
  }
}

export function vacationTotal(trip) {
  return (trip.expenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
}
