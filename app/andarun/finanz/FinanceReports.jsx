'use client'

import { useMemo, useState } from 'react'
import { mainCategory, money, monthEntries, monthLabel, percent, shiftMonth, todayBerlin, totals, validDate } from '@/utils/monthlyExpenseModel'
import { BookingRows, CategoryList, MonthInsights } from './FinanceOverview'
import Icon from './FinanceIcons'
import s from './MonthlyExpenses.module.css'

function HistoryChart({ data, category }) {
  const max = Math.max(1, ...data.flatMap(item => [item.income, item.expenses]))
  return <section className={s.panel}><div className={s.panelHead}><h2>{category && category !== 'all' ? category : 'Einkommen & Ausgaben'}</h2><span className={s.chartScale}>0 – {money(max)}</span></div><div className={s.legend}><span><i />Einkommen</span><span><i />Ausgaben</span></div><div className={s.historyChart} role="img" aria-label={data.map(item => `${monthLabel(item.key)}: Einkommen ${money(item.income)}, Ausgaben ${money(item.expenses)}`).join('; ')}>{data.map(item => <div className={s.chartMonth} key={item.key}><div className={s.chartBars}><i style={{ height: `${item.income / max * 100}%` }} title={`${monthLabel(item.key)} · Einkommen ${money(item.income)}`} /><i style={{ height: `${item.expenses / max * 100}%` }} title={`${monthLabel(item.key)} · Ausgaben ${money(item.expenses)}`} /></div><small>{new Date(`${item.key}-01T12:00:00Z`).toLocaleDateString('de-DE', { month: 'short', year: data.length > 12 ? '2-digit' : undefined })}</small></div>)}</div><p className={s.help}>Exakte Beträge findest du in der Tabelle. Zukünftige Monate enthalten nur schon erfasste Buchungen.</p></section>
}
function MonthTable({ data, onMonth }) {
  return <div className={s.tableWrap}><table><caption>Monatswerte · inkl. eingeplanter Fixkosten in vergangenen und laufenden Monaten</caption><thead><tr><th>Monat</th><th>Einkommen</th><th>Ausgaben</th><th>Übrig</th><th>Sparquote</th></tr></thead><tbody>{data.map(item => <tr key={item.key}><th><button className={s.textAction} onClick={() => onMonth(item.key)}>{monthLabel(item.key)}</button></th><td>{money(item.income)}</td><td>{money(item.expenses)}</td><td className={item.balance < 0 ? s.negative : ''}>{money(item.balance)}</td><td>{item.income > 0 ? `${percent(item.balance / item.income * 100)} %` : '—'}</td></tr>)}</tbody></table></div>
}
export default function FinanceReports({ model, store, recurring, categories, onCategory, onEdit, onDelete, onMonth, onPlan }) {
  const [tab, setTab] = useState('monat')
  const [from, setFrom] = useState(() => shiftMonth(model.month, -5))
  const [to, setTo] = useState(model.month)
  const [category, setCategory] = useState('all')
  const count = (Number(to.slice(0, 4)) - Number(from.slice(0, 4))) * 12 + Number(to.slice(5)) - Number(from.slice(5)) + 1
  const validRange = validDate(`${from}-01`) && validDate(`${to}-01`) && count > 0 && count <= 36
  const data = useMemo(() => {
    const keys = tab === 'jahr' ? Array.from({ length: 12 }, (_, index) => `${model.month.slice(0, 4)}-${String(index + 1).padStart(2, '0')}`)
      : tab === 'verlauf' ? validRange ? Array.from({ length: count }, (_, index) => shiftMonth(from, index)) : []
      : Array.from({ length: 6 }, (_, index) => shiftMonth(model.month, index - 5))
    return keys.map(key => {
      const entries = monthEntries(key, store, recurring, { futureRecurring: false }).filter(entry => tab !== 'verlauf' || category === 'all' || mainCategory(entry, categories) === category)
      return { key, ...totals(entries) }
    })
  }, [tab, model.month, store, recurring, validRange, count, from, category, categories])
  const year = totals(data.flatMap(item => [{ type: 'income', amount: item.income }, { type: 'expense', amount: item.expenses }]))
  return <div className={s.reportView}>
    <div className={s.sectionHeading}><div><h2>Dein Geld im Detail</h2><p>{monthLabel(model.month)} · verstehen, vergleichen, planen.</p></div><button className={s.secondary} onClick={() => window.print()}><Icon name="print" size={17} />PDF / Drucken</button></div>
    <div className={s.subTabs} role="tablist" aria-label="Auswertungsart">{[['monat', 'Monat'], ['jahr', 'Jahr'], ['verlauf', 'Verlauf'], ['top', 'Größte Ausgaben'], ['budget', 'Budget']].map(([key, label]) => <button type="button" key={key} role="tab" aria-selected={tab === key} aria-controls="monthly-report-panel" id={`monthly-report-${key}`} onClick={() => setTab(key)}>{label}</button>)}</div>
    <div className={s.reportContent} role="tabpanel" id="monthly-report-panel" aria-labelledby={`monthly-report-${tab}`}>
      {tab === 'monat' && <><section className={s.panel}><div className={s.panelHead}><h2>Dein Monat in Kürze</h2></div><MonthInsights model={model} /></section><section className={s.panel}><div className={s.panelHead}><h2>Alle Ausgaben-Kategorien</h2></div><CategoryList model={model} onCategory={onCategory} /><p className={s.help}>Jede Ausgabe zählt einmal in ihrer Hauptkategorie. Weitere Tags bleiben gespeichert.</p></section><HistoryChart data={data} /><MonthTable data={data} onMonth={onMonth} /></>}
      {tab === 'jahr' && <><section className={s.panel}><div className={s.panelHead}><h2>Jahresbilanz {model.month.slice(0, 4)}</h2></div><div className={s.yearFigures}>{[['Einkommen', year.income], ['Ausgaben', year.expenses], ['Übrig', year.balance]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{money(value)}</strong></div>)}</div></section><HistoryChart data={data} /><MonthTable data={data} onMonth={onMonth} /></>}
      {tab === 'verlauf' && <><section className={s.panel}><div className={s.panelHead}><h2>Deinen Verlauf ansehen</h2></div><div className={s.reportFilters}><label className={s.field}>Von<input type="month" aria-label="Verlauf von" value={from} onChange={event => setFrom(event.target.value)} /></label><label className={s.field}>Bis<input type="month" aria-label="Verlauf bis" value={to} onChange={event => setTo(event.target.value)} /></label><label className={s.field}>Kategorie<select aria-label="Verlauf Kategorie" value={category} onChange={event => setCategory(event.target.value)}><option value="all">Alle Kategorien</option>{categories.map(item => <option key={item.id}>{item.name}</option>)}</select></label></div>{!validRange && <p role="alert" className={s.error}>Bitte einen Zeitraum von 1 bis 36 Monaten wählen.</p>}</section>{data.length > 0 && <><HistoryChart data={data} category={category} /><MonthTable data={data} onMonth={onMonth} /></>}</>}
      {tab === 'top' && <section className={s.panel}><div className={s.panelHead}><h2>Die 10 größten Ausgaben</h2></div><BookingRows entries={[...model.entries].filter(entry => entry.type === 'expense').sort((a, b) => b.amount - a.amount).slice(0, 10)} categories={categories} onEdit={onEdit} onDelete={onDelete} /><p className={s.help}>Inklusive eingeplanter Fixkosten.</p></section>}
      {tab === 'budget' && <section className={s.panel}><div className={s.panelHead}><h2>Deine Kategorie-Limits</h2><button className={s.textAction} onClick={onPlan}>Anpassen →</button></div><p className={s.help}>{money(model.budgetUsed)} von {money(model.budgetTotal)} genutzt · {money(model.unbudgeted)} ohne Budget. Die aktuell gespeicherten Limits sind nicht historisch versioniert.</p><CategoryList model={model} onCategory={onCategory} budgetOnly /></section>}
    </div>
  </div>
}

export function FinanceBookings({ entries, categories, categoryFilter, onCategoryFilter, onEdit, onDelete }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [payer, setPayer] = useState('all')
  const [kind, setKind] = useState('all')
  const filtered = useMemo(() => entries.filter(entry => {
    if (type !== 'all' && entry.type !== type) return false
    if (payer !== 'all' && (entry.type !== 'expense' || Boolean(entry.paidByFatima) !== (payer === 'fatima'))) return false
    if (kind !== 'all' && Boolean(entry.generatedRecurring) !== (kind === 'fixed')) return false
    if (categoryFilter && mainCategory(entry, categories) !== categoryFilter) return false
    return [entry.title, entry.description, entry.category, ...(entry.tags || [])].join(' ').toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))
  }).sort((a, b) => (b.date || '').localeCompare(a.date || '')), [entries, categories, type, payer, kind, categoryFilter, query])
  return <section className={s.panel}>
    <div className={s.panelHead}><h2>Deine Buchungen</h2><span>{filtered.length} Einträge</span></div>
    <label className={s.searchField}><Icon name="search" size={18} /><input aria-label="Buchungen durchsuchen" value={query} onChange={event => setQuery(event.target.value)} placeholder="Beschreibung, Kategorie, Tag …" /></label>
    <div className={s.bookingFilters}><select aria-label="Buchungsart filtern" value={type} onChange={event => setType(event.target.value)}><option value="all">Alle Buchungen</option><option value="expense">Ausgaben</option><option value="income">Einkommen</option></select><select aria-label="Bezahlt von filtern" value={payer} onChange={event => setPayer(event.target.value)}><option value="all">Alle Personen</option><option value="jamin">Jamin</option><option value="fatima">Fatima</option></select><select aria-label="Kostenart filtern" value={kind} onChange={event => setKind(event.target.value)}><option value="all">Fix & variabel</option><option value="fixed">Fixkosten</option><option value="variable">Variabel</option></select><select aria-label="Kategorie filtern" value={categoryFilter || ''} onChange={event => onCategoryFilter(event.target.value)}><option value="">Alle Kategorien</option>{[...new Set(entries.map(entry => mainCategory(entry, categories)))].sort().map(name => <option key={name}>{name}</option>)}</select></div>
    <BookingRows entries={filtered} categories={categories} onEdit={onEdit} onDelete={onDelete} />
  </section>
}
