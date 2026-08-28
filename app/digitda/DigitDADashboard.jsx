'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'digitda_finance_v1'

const initialState = {
  foundedAt: '2024-01-01',
  tomanPerEuro: 105000,
  services: [
    { id: 'crown', name: 'Crown Design', unit: 'Projekt', price: 1200 },
    { id: 'full-arc', name: 'Full Arc Design', unit: 'Projekt', price: 2200 },
    { id: 'brand', name: 'Brand Identity', unit: 'Projekt', price: 1500 },
    { id: 'social', name: 'Social Media Paket', unit: 'Monat', price: 600 },
    { id: 'web', name: 'Webdesign', unit: 'Projekt', price: 2800 },
    { id: 'motion', name: 'Motion Design', unit: 'Projekt', price: 950 },
  ],
  entries: [
    { id: 'i01', type: 'income', date: '2024-02-12', serviceId: 'crown', quantity: 2, unitPrice: 1100, note: 'Launch Kollektion' },
    { id: 'e01', type: 'expense', date: '2024-02-18', location: 'germany', currency: 'eur', amount: 690, category: 'Software & Lizenzen', note: 'Design Tools' },
    { id: 'i02', type: 'income', date: '2024-05-09', serviceId: 'full-arc', quantity: 2, unitPrice: 2200, note: 'Arc Kampagne' },
    { id: 'e02', type: 'expense', date: '2024-05-20', location: 'iran', currency: 'toman', amount: 42000000, category: 'Freelancer', note: 'Illustration Team' },
    { id: 'i03', type: 'income', date: '2024-09-14', serviceId: 'brand', quantity: 4, unitPrice: 1450, note: 'Brand Sprint' },
    { id: 'e03', type: 'expense', date: '2024-10-01', location: 'germany', currency: 'eur', amount: 1280, category: 'Marketing', note: 'Studio Launch' },
    { id: 'i04', type: 'income', date: '2025-01-18', serviceId: 'web', quantity: 2, unitPrice: 3100, note: 'Web Experience' },
    { id: 'e04', type: 'expense', date: '2025-02-01', location: 'iran', currency: 'toman', amount: 183000000, category: 'Gehälter', note: 'Team Iran · Q1' },
    { id: 'i05', type: 'income', date: '2025-04-12', serviceId: 'social', quantity: 8, unitPrice: 600, note: 'Content Retainer' },
    { id: 'e05', type: 'expense', date: '2025-04-23', location: 'germany', currency: 'eur', amount: 2190, category: 'Hardware', note: 'Workstations' },
    { id: 'i06', type: 'income', date: '2025-08-08', serviceId: 'crown', quantity: 6, unitPrice: 1250, note: 'Crown Series' },
    { id: 'e06', type: 'expense', date: '2025-09-01', location: 'iran', currency: 'toman', amount: 201000000, category: 'Gehälter', note: 'Team Iran · Q3' },
    { id: 'i07', type: 'income', date: '2025-12-05', serviceId: 'full-arc', quantity: 5, unitPrice: 2350, note: 'Year End Edition' },
    { id: 'e07', type: 'expense', date: '2025-12-12', location: 'germany', currency: 'eur', amount: 1480, category: 'Steuerberatung', note: 'Jahresabschluss' },
    { id: 'i08', type: 'income', date: '2026-02-15', serviceId: 'brand', quantity: 5, unitPrice: 1600, note: 'Identity System' },
    { id: 'e08', type: 'expense', date: '2026-02-28', location: 'iran', currency: 'toman', amount: 225000000, category: 'Gehälter', note: 'Team Iran · Q1' },
    { id: 'i09', type: 'income', date: '2026-05-11', serviceId: 'web', quantity: 3, unitPrice: 2950, note: 'Digital Flagship' },
    { id: 'e09', type: 'expense', date: '2026-05-16', location: 'germany', currency: 'eur', amount: 890, category: 'Software & Lizenzen', note: 'Cloud & Adobe' },
    { id: 'i10', type: 'income', date: '2026-08-04', serviceId: 'crown', quantity: 4, unitPrice: 1300, note: 'Crown Design August' },
    { id: 'e10', type: 'expense', date: '2026-08-06', location: 'iran', currency: 'toman', amount: 95000000, category: 'Freelancer', note: '3D Artist' },
  ],
}

const shareholders = [
  { name: 'Fatemeh', share: 45, color: '#2458ed' },
  { name: 'Fahimeh', share: 45, color: '#78a800' },
  { name: 'Fereshteh', share: 10, color: '#ff775f' },
]

const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })
const shortMonth = new Intl.DateTimeFormat('de-DE', { month: 'short', year: '2-digit' })
const dateLabel = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })

function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
function serviceFor(services, id) { return services.find(service => service.id === id) }
function entryValue(entry, rate) { return entry.type === 'income' ? Number(entry.quantity || 0) * Number(entry.unitPrice || 0) : entry.currency === 'toman' ? Number(entry.amount || 0) / Math.max(Number(rate || 1), 1) : Number(entry.amount || 0) }
function quarterOf(date) { return Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1 }
function currentQuarter() { return Math.floor(new Date().getMonth() / 3) + 1 }
function monthKey(date) { return date.slice(0, 7) }

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>
  if (name === 'download') return <svg {...common}><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>
  if (name === 'trash') return <svg {...common}><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"/></svg>
  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
}

function TrendChart({ data }) {
  const width = 900
  const height = 280
  const pad = 30
  const max = Math.max(1, ...data.flatMap(point => [point.income, point.expense, Math.abs(point.profit)]))
  const x = index => data.length === 1 ? width / 2 : pad + index * ((width - pad * 2) / (data.length - 1))
  const y = value => height - pad - (value / max) * (height - pad * 2)
  const line = key => data.map((point, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(point[key]).toFixed(1)}`).join(' ')
  const area = data.length ? `${line('income')} L${x(data.length - 1)},${height - pad} L${x(0)},${height - pad} Z` : ''

  return (
    <div className={styles.chartWrap}>
      <svg className={styles.chart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Verlauf von Umsatz, Kosten und Gewinn">
        <defs><linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2458ed" stopOpacity=".2"/><stop offset="1" stopColor="#2458ed" stopOpacity="0"/></linearGradient></defs>
        {[0, .25, .5, .75, 1].map(value => <line key={value} x1={pad} x2={width-pad} y1={pad + value * (height-pad*2)} y2={pad + value * (height-pad*2)} className={styles.gridLine}/>) }
        {data.length ? <>
          <path d={area} fill="url(#incomeArea)"/>
          <path d={line('income')} className={styles.incomeLine}/>
          <path d={line('expense')} className={styles.expenseLine}/>
          <path d={line('profit')} className={styles.profitLine}/>
        </> : null}
      </svg>
      <div className={styles.chartLabels}>
        {data.map((point, index) => <span key={point.key} style={{ left: `${data.length === 1 ? 50 : index / (data.length - 1) * 100}%` }}>{shortMonth.format(new Date(`${point.key}-15`))}</span>)}
      </div>
    </div>
  )
}

export default function DigitDADashboard() {
  const [state, setState] = useState(initialState)
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState('Lokal gespeichert')
  const [period, setPeriod] = useState('all')
  const [year, setYear] = useState(new Date().getFullYear())
  const [quarter, setQuarter] = useState(currentQuarter())
  const [entryType, setEntryType] = useState(null)
  const [form, setForm] = useState({})
  const hydrated = useRef(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      let local = null
      try { local = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') } catch {}
      try {
        const response = await fetch('/api/digitda/state', { cache: 'no-store' })
        const remote = await response.json()
        if (!cancelled) setState(remote.state || local || initialState)
      } catch { if (!cancelled) setState(local || initialState) }
      if (!cancelled) { hydrated.current = true; setLoaded(true) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded || !hydrated.current) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setSaveStatus('Speichert …')
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/digitda/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state }) })
        if (!response.ok) throw new Error()
        setSaveStatus('Gespeichert')
      } catch { setSaveStatus('Lokal gespeichert') }
    }, 500)
    return () => window.clearTimeout(timer)
  }, [state, loaded])

  const availableYears = useMemo(() => [...new Set(state.entries.map(entry => Number(entry.date.slice(0, 4))))].sort((a, b) => b - a), [state.entries])
  const filtered = useMemo(() => state.entries.filter(entry => {
    if (period === 'all') return true
    const entryYear = Number(entry.date.slice(0, 4))
    if (entryYear !== Number(year)) return false
    return period === 'year' || quarterOf(entry.date) === Number(quarter)
  }), [state.entries, period, year, quarter])

  const metrics = useMemo(() => filtered.reduce((result, entry) => {
    const value = entryValue(entry, state.tomanPerEuro)
    if (entry.type === 'income') result.income += value
    else result.expense += value
    result.profit = result.income - result.expense
    return result
  }, { income: 0, expense: 0, profit: 0 }), [filtered, state.tomanPerEuro])

  const chartData = useMemo(() => {
    const map = new Map()
    filtered.toSorted((a, b) => a.date.localeCompare(b.date)).forEach(entry => {
      const key = monthKey(entry.date)
      const point = map.get(key) || { key, income: 0, expense: 0, profit: 0 }
      const value = entryValue(entry, state.tomanPerEuro)
      if (entry.type === 'income') point.income += value
      else point.expense += value
      point.profit = Math.max(0, point.income - point.expense)
      map.set(key, point)
    })
    const values = [...map.values()]
    return values.length > 12 ? values.filter((_, index) => index % Math.ceil(values.length / 12) === 0 || index === values.length - 1) : values
  }, [filtered, state.tomanPerEuro])

  const serviceStats = useMemo(() => state.services.map(service => {
    const entries = filtered.filter(entry => entry.type === 'income' && entry.serviceId === service.id)
    return { ...service, units: entries.reduce((sum, entry) => sum + Number(entry.quantity || 0), 0), revenue: entries.reduce((sum, entry) => sum + entryValue(entry, state.tomanPerEuro), 0) }
  }), [state.services, filtered, state.tomanPerEuro])

  const expenses = filtered.filter(entry => entry.type === 'expense').toSorted((a, b) => b.date.localeCompare(a.date))
  const recent = filtered.toSorted((a, b) => b.date.localeCompare(a.date)).slice(0, 6)

  function openEntry(type) {
    const firstService = state.services[0]
    setEntryType(type)
    setForm(type === 'income'
      ? { date: new Date().toISOString().slice(0, 10), serviceId: firstService.id, quantity: 1, unitPrice: firstService.price, note: '' }
      : { date: new Date().toISOString().slice(0, 10), location: 'germany', currency: 'eur', amount: '', category: 'Software & Lizenzen', note: '' })
  }

  function submitEntry(event) {
    event.preventDefault()
    const next = entryType === 'income'
      ? { id: makeId(), type: 'income', ...form, quantity: Number(form.quantity), unitPrice: Number(form.unitPrice) }
      : { id: makeId(), type: 'expense', ...form, amount: Number(form.amount) }
    setState(previous => ({ ...previous, entries: [...previous.entries, next] }))
    setEntryType(null)
  }

  function selectService(id) {
    const service = serviceFor(state.services, id)
    setForm(previous => ({ ...previous, serviceId: id, unitPrice: service?.price || 0 }))
  }

  function updateServicePrice(id, price) {
    setState(previous => ({ ...previous, services: previous.services.map(service => service.id === id ? { ...service, price: Math.max(0, Number(price)) } : service) }))
  }

  function removeEntry(id) {
    setState(previous => ({ ...previous, entries: previous.entries.filter(entry => entry.id !== id) }))
  }

  function exportCsv() {
    const rows = [['Datum','Typ','Bezeichnung','Währung','Originalbetrag','EUR-Wert'], ...filtered.map(entry => {
      const service = serviceFor(state.services, entry.serviceId)
      return [entry.date, entry.type === 'income' ? 'Einnahme' : 'Ausgabe', entry.type === 'income' ? service?.name : entry.category, entry.type === 'income' || entry.currency === 'eur' ? 'EUR' : 'Toman', entry.type === 'income' ? entryValue(entry, state.tomanPerEuro) : entry.amount, entryValue(entry, state.tomanPerEuro)]
    })]
    const csv = rows.map(row => row.map(cell => `"${String(cell ?? '').replaceAll('"','""')}"`).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `digitda-finanzen-${new Date().toISOString().slice(0,10)}.csv`; anchor.click(); URL.revokeObjectURL(url)
  }

  const margin = metrics.income ? metrics.profit / metrics.income * 100 : 0

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.logo} href="#overview">Digit<span>DA</span></a>
        <nav aria-label="DigitDA Bereiche">
          <a className={styles.navActive} href="#overview">Übersicht</a><a href="#income">Einnahmen</a><a href="#expenses">Ausgaben</a><a href="#shareholders">Gesellschafter</a>
        </nav>
        <div className={styles.headerActions}>
          <span className={styles.saveStatus}><i />{saveStatus}</span>
          <button type="button" onClick={exportCsv}><Icon name="download"/> Export</button>
          <form action="/api/digitda/logout" method="post"><button type="submit">Abmelden</button></form>
        </div>
      </header>

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.company}><strong>DigitDA</strong><span>Digital Design Studio</span><small>Gegründet · {dateLabel.format(new Date(state.foundedAt))}</small></div>
          <div className={styles.periodBlock}>
            <span>Zeitraum</span>
            <div className={styles.periodButtons}>
              {[['all','Gesamt'],['quarter','Quartal'],['year','Jahr']].map(([value, label]) => <button key={value} className={period === value ? styles.selected : ''} onClick={() => setPeriod(value)}>{label}</button>)}
            </div>
            {period !== 'all' ? <div className={styles.periodSelects}>
              <select value={year} onChange={event => setYear(event.target.value)}>{availableYears.map(value => <option key={value}>{value}</option>)}</select>
              {period === 'quarter' ? <select value={quarter} onChange={event => setQuarter(event.target.value)}>{[1,2,3,4].map(value => <option key={value} value={value}>Q{value}</option>)}</select> : null}
            </div> : null}
          </div>
          <div className={styles.sideMetrics}>
            <div><span>Gesamtumsatz</span><strong className={styles.blue}>{eur.format(metrics.income)}</strong></div>
            <div><span>Gesamtkosten</span><strong className={styles.lime}>{eur.format(metrics.expense)}</strong></div>
            <div><span>Bruttogewinn</span><strong>{eur.format(metrics.profit)}</strong><small>{margin.toFixed(1)}% Marge</small></div>
          </div>
          <div className={styles.rateBox}><label>Wechselkurs</label><div><input value={state.tomanPerEuro} onChange={event => setState(previous => ({ ...previous, tomanPerEuro: Number(event.target.value) }))} type="number"/><span>T / €</span></div><small>Für konsolidierte Ausgaben aus Iran</small></div>
          <button className={styles.primaryAction} onClick={() => openEntry('income')}><Icon name="plus"/> Eintrag hinzufügen</button>
        </aside>

        <div className={styles.content}>
          <section className={styles.overview} id="overview">
            <div className={styles.sectionHeading}>
              <div><span>Finanzübersicht</span><h1>Gewinn &amp; Kosten <em>seit Gründung.</em></h1></div>
              <div className={styles.legend}><span><i className={styles.legendIncome}/>Umsatz</span><span><i className={styles.legendExpense}/>Kosten</span><span><i className={styles.legendProfit}/>Gewinn</span></div>
            </div>
            <TrendChart data={chartData}/>
          </section>

          <section className={styles.incomeSection} id="income">
            <div className={styles.blockTitle}><div><span>Einnahmequellen</span><h2>Leistungen &amp; Preise</h2></div><button onClick={() => openEntry('income')}><Icon name="plus"/> Einnahme</button></div>
            <div className={styles.tableWrap}>
              <table><thead><tr><th>Service</th><th>Standardpreis</th><th>Einheit</th><th>Anzahl</th><th>Umsatz</th></tr></thead>
                <tbody>{serviceStats.map(service => <tr key={service.id}><td><strong>{service.name}</strong></td><td><label className={styles.priceInput}><span>€</span><input type="number" value={service.price} onChange={event => updateServicePrice(service.id, event.target.value)}/></label></td><td>{service.unit}</td><td>{num.format(service.units)}</td><td><strong>{eur.format(service.revenue)}</strong></td></tr>)}</tbody>
              </table>
            </div>
            <p className={styles.tableHint}>Der Standardpreis gilt für neue Einträge und kann bei jedem Auftrag individuell überschrieben werden.</p>
          </section>

          <div className={styles.lowerGrid}>
            <section className={styles.expenseSection} id="expenses">
              <div className={styles.blockTitle}><div><span>Ausgaben nach Standort</span><h2>Deutschland &amp; Iran</h2></div><button onClick={() => openEntry('expense')}><Icon name="plus"/> Ausgabe</button></div>
              <div className={styles.expenseGroups}>
                {[
                  { id: 'germany', title: 'Deutschland / EUR', accent: 'blue' },
                  { id: 'iran', title: 'Iran / Toman', accent: 'lime' },
                ].map(group => <div className={styles.expenseGroup} key={group.id}><h3 className={styles[group.accent]}>{group.title}</h3>{expenses.filter(entry => entry.location === group.id).slice(0,5).map(entry => <div className={styles.expenseRow} key={entry.id}><span><strong>{entry.category}</strong><small>{entry.note || dateLabel.format(new Date(entry.date))}</small></span><b>{entry.currency === 'toman' ? `${num.format(entry.amount)} T` : eur.format(entry.amount)}</b><button onClick={() => removeEntry(entry.id)} aria-label={`${entry.category} löschen`}><Icon name="trash"/></button></div>)}{!expenses.some(entry => entry.location === group.id) ? <p className={styles.empty}>Noch keine Ausgaben.</p> : null}</div>)}
              </div>
            </section>

            <aside className={styles.rightRail}>
              <section id="shareholders" className={styles.shareholders}>
                <div className={styles.blockTitle}><div><span>Eigentum</span><h2>Gesellschafter</h2></div></div>
                <div className={styles.shareBar}>{shareholders.map(holder => <i key={holder.name} style={{ width: `${holder.share}%`, background: holder.color }}/>)}</div>
                {shareholders.map(holder => <div className={styles.shareRow} key={holder.name}><span><i style={{ background: holder.color }}/>{holder.name}</span><strong>{holder.share}%</strong><small>{eur.format(Math.max(0, metrics.profit) * holder.share / 100)}</small></div>)}
              </section>
              <section className={styles.recent}>
                <div className={styles.blockTitle}><div><span>Journal</span><h2>Letzte Einträge</h2></div></div>
                {recent.map(entry => { const service = serviceFor(state.services, entry.serviceId); return <div className={styles.recentRow} key={entry.id}><span className={entry.type === 'income' ? styles.up : styles.down}>{entry.type === 'income' ? '↗' : '↓'}</span><span><strong>{entry.type === 'income' ? service?.name : entry.category}</strong><small>{dateLabel.format(new Date(entry.date))}</small></span><b>{entry.type === 'income' ? '+' : '−'} {eur.format(entryValue(entry, state.tomanPerEuro))}</b></div>})}
              </section>
            </aside>
          </div>
        </div>
      </div>

      {entryType ? <div className={styles.modalOverlay} onMouseDown={event => event.target === event.currentTarget && setEntryType(null)}>
        <form className={styles.entryModal} onSubmit={submitEntry}>
          <div className={styles.modalHead}><div><span>Neuer Eintrag</span><h2>{entryType === 'income' ? 'Einnahme erfassen' : 'Ausgabe erfassen'}</h2></div><button type="button" onClick={() => setEntryType(null)} aria-label="Schließen">×</button></div>
          <label>Datum<input required type="date" value={form.date || ''} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))}/></label>
          {entryType === 'income' ? <>
            <label>Leistung<select value={form.serviceId || ''} onChange={event => selectService(event.target.value)}>{state.services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}</select></label>
            <div className={styles.formGrid}><label>Anzahl<input required min="1" step="1" type="number" value={form.quantity || ''} onChange={event => setForm(previous => ({ ...previous, quantity: event.target.value }))}/></label><label>Preis pro Einheit (€)<input required min="0" step="0.01" type="number" value={form.unitPrice || ''} onChange={event => setForm(previous => ({ ...previous, unitPrice: event.target.value }))}/><small>Individueller Preis für diesen Auftrag</small></label></div>
          </> : <>
            <div className={styles.locationSwitch}><button type="button" className={form.location === 'germany' ? styles.activeLocation : ''} onClick={() => setForm(previous => ({ ...previous, location: 'germany', currency: 'eur' }))}>Deutschland · EUR</button><button type="button" className={form.location === 'iran' ? styles.activeLocation : ''} onClick={() => setForm(previous => ({ ...previous, location: 'iran', currency: 'toman' }))}>Iran · Toman</button></div>
            <div className={styles.formGrid}><label>Kategorie<input required value={form.category || ''} onChange={event => setForm(previous => ({ ...previous, category: event.target.value }))}/></label><label>Betrag ({form.currency === 'toman' ? 'Toman' : 'EUR'})<input required min="0" step={form.currency === 'toman' ? '1000' : '.01'} type="number" value={form.amount || ''} onChange={event => setForm(previous => ({ ...previous, amount: event.target.value }))}/></label></div>
          </>}
          <label>Notiz<input value={form.note || ''} onChange={event => setForm(previous => ({ ...previous, note: event.target.value }))} placeholder="Optional"/></label>
          <div className={styles.modalActions}><button type="button" onClick={() => setEntryType(null)}>Abbrechen</button><button type="submit">Eintrag speichern <Icon name="arrow"/></button></div>
        </form>
      </div> : null}
    </main>
  )
}
