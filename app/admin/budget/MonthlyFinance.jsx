'use client'

import { useMemo, useState } from 'react'
import { entryTotals, primaryCategory, shiftMonth } from '@/utils/monthlyFinance'
import FinanceIcon, { categoryIcon } from './FinanceIcon'
import styles from './MonthlyFinance.module.css'

export const money = value => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value || 0)
const monthLabel = key => new Date(`${key}-01T12:00:00`).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
const shortDate = date => date ? new Date(`${date}T12:00:00`).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }) : '—'
const percent = value => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value)

function Change({ change }) {
  return <small>{!change ? 'Kein Vergleich verfügbar' : <>{change.amount > 0 ? '+' : ''}{money(change.amount)}{change.percent !== null ? ` (${change.percent > 0 ? '+' : ''}${percent(change.percent)} %)` : ''}</>}</small>
}

export function FinanceMetrics({ analytics, onAddIncome }) {
  const { totals, changes, budgetTotal, budgetRemaining, unbudgeted, comparisonDay, current, future } = analytics
  return <>
    <section className={styles.metrics} aria-label="Monatsübersicht">
      <div className={styles.metric}><span><FinanceIcon name="wallet" />Einkommen<button aria-label="Einkommen hinzufügen" onClick={onAddIncome}><FinanceIcon name="plus" size={16} /></button></span><strong>{money(totals.income)}</strong><Change change={changes.income} /></div>
      <div className={styles.metric}><span><FinanceIcon name="receipt" />Ausgaben</span><strong>{money(totals.expenses)}</strong><small>{money(totals.fixed)} fix · {money(totals.variable)} variabel</small></div>
      <div className={`${styles.metric} ${styles.balanceMetric}`}><span>Verbleibendes Einkommen</span><strong className={totals.balance < 0 ? styles.negative : ''}>{money(totals.balance)}</strong><small>Einkommen minus Ausgaben · kein Kontostand</small></div>
      <div className={styles.metric}><span><FinanceIcon name="chart" />Budget übrig</span><strong className={budgetTotal > 0 && budgetRemaining < 0 ? styles.negative : ''}>{budgetTotal > 0 ? money(budgetRemaining) : '—'}</strong><small>{budgetTotal ? `von ${money(budgetTotal)} · ${money(unbudgeted)} ohne Budget` : 'Noch keine Kategorie-Limits'}</small></div>
    </section>
    <p className={styles.periodNote}>{future ? 'Geplanter Monat' : current ? 'Laufender Monat' : 'Abgeschlossener Zeitraum'} · Summen inkl. automatisch eingeplanter Fixkosten.{!future && <> Vergleich mit {monthLabel(analytics.previousMonth)}{comparisonDay ? `, jeweils bis Tag ${comparisonDay}` : ' (voller Monat)'}.</>}</p>
  </>
}

function CategoryRows({ analytics, onCategory, budgetOnly = false, limit }) {
  const rows = budgetOnly ? analytics.rows.filter(row => row.budget > 0) : analytics.rows
  return <div className={styles.categoryList}>
    {(limit ? rows.slice(0, limit) : rows).map(row => <button key={row.name} className={styles.categoryRow} onClick={() => onCategory('expense', row.name, row.name)}>
      <span className={styles.categoryIdentity}><span className={styles.categoryIcon}><FinanceIcon name={categoryIcon(row.name)} /></span><b>{row.name}</b></span>
      <span className={styles.categoryDetails}><span className={styles.rowFigures}><strong>{money(row.actual)}</strong><small>{row.budget ? ` / ${money(row.budget)}` : ' · ohne Budget'}</small></span><span className={styles.track}><i className={row.status === 'over' ? styles.overFill : ''} style={{ width: `${Math.min(row.percent ?? row.share, 100)}%` }} /></span><small className={row.status === 'over' ? styles.negative : ''}>{row.budget ? row.remaining < 0 ? `${money(-row.remaining)} über Budget` : row.remaining === 0 ? 'Budget ausgeschöpft' : `${money(row.remaining)} übrig` : `${percent(row.share)} % der Ausgaben`}</small></span>
      <span className={`${styles.rowPercent} ${row.status === 'over' ? styles.negative : ''}`}>{percent(row.percent ?? row.share)} %</span>
    </button>)}
    {!rows.length && <p className={styles.empty}>Noch keine {budgetOnly ? 'Budgets' : 'Ausgaben'} vorhanden.</p>}
    {analytics.multiTagged && <p className={styles.help}>Jede Ausgabe zählt einmal in ihrer Hauptkategorie. Weitere Kategorie-Tags bleiben an der Buchung erhalten.</p>}
  </div>
}

function Insights({ analytics }) {
  const { changes, totals, increases, comparable, overBudget, comparisonDay } = analytics
  const delta = changes.expenses
  return <div className={styles.insights}>
    <p><FinanceIcon name="trend" /><span>{delta ? delta.amount === 0 ? 'Die Ausgaben sind unverändert zum Vormonat.' : <>Du hast {money(Math.abs(delta.amount))}{delta.percent !== null ? ` (${percent(Math.abs(delta.percent))} %)` : ''} {delta.amount > 0 ? 'mehr' : 'weniger'} ausgegeben als im Vormonat.</> : 'Für diesen Zeitraum sind noch keine Vergleichsdaten vorhanden.'}{comparisonDay && <small>Verglichen werden jeweils die ersten {comparisonDay} Tage.</small>}</span></p>
    {comparable && increases[0] && <p><FinanceIcon name="chart" /><span>Größter Anstieg: <b>{increases[0].name}</b>, +{money(increases[0].change)}.</span></p>}
    <p><FinanceIcon name="tag" /><span>{overBudget.length ? <>{overBudget.length} {overBudget.length === 1 ? 'Kategorie liegt' : 'Kategorien liegen'} über Budget: {overBudget.map(row => row.name).join(', ')}.</> : analytics.budgetTotal ? 'Keine Kategorie liegt über ihrem Budget.' : 'Lege Kategorie-Limits an, um dein Budget zu verfolgen.'}</span></p>
    <div className={styles.payers}><h3><FinanceIcon name="people" />Bezahlt von</h3>{[['Jamin', totals.jamin], ['Fatima', totals.fatima]].map(([name, value]) => <div key={name}><span>{name}</span><strong>{money(value)}</strong></div>)}<small>Ausgaben inkl. Fixkosten; ohne Markierung wird Jamin zugeordnet. Keine Berechnung von Kostenanteilen oder Schulden.</small></div>
  </div>
}

function HistoryChart({ data, title = 'Einkommen & Ausgaben' }) {
  const maximum = Math.max(1, ...data.flatMap(item => [item.income, item.expenses]))
  return <section className={styles.panel}>
    <div className={styles.panelHead}><h2><FinanceIcon name="chart" />{title}</h2></div>
    <div className={styles.legend}><span><i />Einkommen</span><span><i />Ausgaben</span><small>Skala: 0 – {money(maximum)}</small></div>
    <div className={styles.chart} role="img" aria-label={data.map(item => `${monthLabel(item.key)}: Einkommen ${money(item.income)}, Ausgaben ${money(item.expenses)}`).join('; ')}>{data.map(item => <div className={styles.chartMonth} key={item.key}><div className={styles.bars}><span title={`Einkommen: ${money(item.income)}`} style={{ height: `${item.income / maximum * 100}%` }} /><span title={`Ausgaben: ${money(item.expenses)}`} style={{ height: `${item.expenses / maximum * 100}%` }} /></div><small>{new Date(`${item.key}-01T12:00:00`).toLocaleDateString('de-DE', { month: 'short' })}</small></div>)}</div>
    <p className={styles.help}>{monthLabel(data[0].key)} – {monthLabel(data.at(-1).key)} · inkl. eingeplanter Fixkosten</p>
  </section>
}

function TrendReport({ month, categories, getMonthEntries, onMonth }) {
  const [from, setFrom] = useState(() => shiftMonth(month, -5))
  const [to, setTo] = useState(month)
  const [category, setCategory] = useState('all')
  const count = (Number(to.slice(0, 4)) - Number(from.slice(0, 4))) * 12 + Number(to.slice(5)) - Number(from.slice(5)) + 1
  const valid = count > 0 && count <= 36 && /^\d{4}-\d{2}$/.test(from) && /^\d{4}-\d{2}$/.test(to)
  const data = useMemo(() => valid ? Array.from({ length: count }, (_, index) => {
    const key = shiftMonth(from, index)
    const entries = getMonthEntries(key).filter(entry => category === 'all' || primaryCategory(entry, categories) === category)
    return { key, ...entryTotals(entries) }
  }) : [], [from, count, valid, category, categories, getMonthEntries])
  return <>
    <section className={styles.panel}><div className={styles.panelHead}><h2>Verlauf nach Kategorie</h2></div><div className={styles.trendFilters}>
      <label className={styles.field}>Von<input aria-label="Verlauf von" type="month" value={from} onChange={event => setFrom(event.target.value)} /></label>
      <label className={styles.field}>Bis<input aria-label="Verlauf bis" type="month" value={to} onChange={event => setTo(event.target.value)} /></label>
      <label className={styles.field}>Kategorie<select aria-label="Verlauf Kategorie" value={category} onChange={event => setCategory(event.target.value)}><option value="all">Alle Kategorien</option>{categories.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
    </div><p className={styles.help}>Bis zu 36 Monate. Ausgaben zählen einmal in der Hauptkategorie. Zukünftige Monate enthalten nur bereits erfasste Buchungen.</p>{!valid && <p className={styles.error} role="alert">Bitte einen gültigen Zeitraum von höchstens 36 Monaten auswählen.</p>}</section>
    {data.length > 0 && <><HistoryChart data={data} title={category === 'all' ? 'Einkommen & Ausgaben im Verlauf' : category} /><div className={styles.tableWrap}><table><thead><tr><th>Monat</th><th>Einkommen</th><th>Ausgaben</th><th>Verbleibend</th></tr></thead><tbody>{data.map(item => <tr key={item.key}><th><button className={styles.textButton} onClick={() => onMonth(item.key)}>{monthLabel(item.key)}</button></th><td>{money(item.income)}</td><td>{money(item.expenses)}</td><td>{money(item.balance)}</td></tr>)}</tbody></table></div></>}
  </>
}

function BookingRows({ entries, categories, onEdit, compact = false }) {
  return <div className={styles.bookings}>
    {entries.map(entry => <div className={styles.booking} key={entry.id}>
      <span className={styles.bookingDate}>{shortDate(entry.date)}</span>
      <span className={styles.categoryIcon}><FinanceIcon name={categoryIcon(primaryCategory(entry, categories))} /></span>
      <span className={styles.bookingCopy}><strong>{entry.description || entry.title}</strong><small>{primaryCategory(entry, categories)}{entry.generatedRecurring ? ' · Fixkosten' : ''}{entry.type === 'expense' ? ` · ${entry.paidByFatima ? 'Fatima' : 'Jamin'}` : ' · Einkommen'}</small>{!compact && entry.tags?.length > 1 && <small>Tags: {entry.tags.join(' · ')}</small>}</span>
      <strong className={entry.type === 'income' ? styles.positive : styles.bookingAmount}>{entry.type === 'income' ? '+' : '−'}{money(Number(entry.amount))}</strong>
      {!compact && <button className={styles.textButton} onClick={() => onEdit(entry)}>{entry.generatedRecurring ? 'Details' : 'Bearbeiten'}</button>}
    </div>)}
    {!entries.length && <p className={styles.empty}>Keine passenden Buchungen. Passe die Filter an oder füge einen Eintrag hinzu.</p>}
  </div>
}

function BookingList({ entries, categories, onEdit }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [payer, setPayer] = useState('all')
  const [kind, setKind] = useState('all')
  const [category, setCategory] = useState('all')
  const filtered = useMemo(() => entries.filter(entry => {
    if (type !== 'all' && entry.type !== type) return false
    if (payer !== 'all' && (entry.type !== 'expense' || Boolean(entry.paidByFatima) !== (payer === 'fatima'))) return false
    if (kind !== 'all' && Boolean(entry.generatedRecurring) !== (kind === 'fixed')) return false
    if (category !== 'all' && primaryCategory(entry, categories) !== category) return false
    return [entry.title, entry.description, entry.category, ...(entry.tags || [])].join(' ').toLocaleLowerCase('de').includes(search.toLocaleLowerCase('de'))
  }), [entries, categories, search, type, payer, kind, category])
  return <section className={styles.panel}>
    <div className={styles.panelHead}><h2>Buchungen</h2><span>{filtered.length} Einträge</span></div>
    <div className={styles.filters}>
      <label className={styles.search}><FinanceIcon name="search" /><input aria-label="Buchungen durchsuchen" placeholder="Beschreibung, Kategorie oder Tag" value={search} onChange={event => setSearch(event.target.value)} /></label>
      <label>Art<select aria-label="Buchungsart filtern" value={type} onChange={event => setType(event.target.value)}><option value="all">Alle Buchungen</option><option value="expense">Ausgaben</option><option value="income">Einkommen</option></select></label>
      <label>Bezahlt von<select aria-label="Bezahlt von" value={payer} onChange={event => setPayer(event.target.value)}><option value="all">Alle</option><option value="jamin">Jamin</option><option value="fatima">Fatima</option></select></label>
      <label>Kosten<select aria-label="Kostenart filtern" value={kind} onChange={event => setKind(event.target.value)}><option value="all">Fix & variabel</option><option value="fixed">Fixkosten</option><option value="variable">Variabel</option></select></label>
      <label>Kategorie<select aria-label="Kategorie filtern" value={category} onChange={event => setCategory(event.target.value)}><option value="all">Alle Kategorien</option>{[...new Set(entries.map(entry => primaryCategory(entry, categories)))].sort().map(name => <option key={name}>{name}</option>)}</select></label>
    </div>
    <BookingRows entries={filtered} categories={categories} onEdit={onEdit} />
  </section>
}

export default function MonthlyFinance({ view, analytics, entries, categories, history, annualData, onCategory, onEdit, onView, onPrint, getMonthEntries, onMonth }) {
  const [report, setReport] = useState('monat')
  const sortedEntries = useMemo(() => [...entries].sort((a, b) => (b.date || '').localeCompare(a.date || '') || String(b.id).localeCompare(String(a.id))), [entries])
  if (view === 'buchungen') return <BookingList entries={sortedEntries} categories={categories} onEdit={onEdit} />
  if (view === 'berichte') {
    const annual = annualData.reduce((sum, item) => ({ income: sum.income + item.income, expenses: sum.expenses + item.expenses }), { income: 0, expenses: 0 })
    return <div className={styles.report}>
      <div className={styles.reportHeader}><div><h2>Berichte</h2><p>{monthLabel(analytics.month)} · Zahlen, Vergleiche und Budgetstatus</p></div><button className={styles.secondary} onClick={onPrint}><FinanceIcon name="receipt" />PDF / Drucken</button></div>
      <div className={styles.reportTabs} role="tablist" aria-label="Berichtsart">{[['monat', 'Monat'], ['jahr', 'Jahr'], ['verlauf', 'Verlauf'], ['top', 'Größte Ausgaben'], ['budget', 'Budget']].map(([key, label]) => <button key={key} id={`report-${key}`} role="tab" aria-selected={report === key} aria-controls="finance-report-panel" onClick={() => setReport(key)}>{label}</button>)}</div>
      <div role="tabpanel" id="finance-report-panel" aria-labelledby={`report-${report}`}>
        {report === 'monat' && <><div className={styles.dashboardGrid}><section className={styles.panel}><div className={styles.panelHead}><h2>Was hat sich verändert?</h2></div><Insights analytics={analytics} /></section><HistoryChart data={history} title="Die letzten 6 Monate" /></div><section className={styles.panel}><div className={styles.panelHead}><h2>Ausgaben nach Kategorie</h2><span>Betrag / Budget</span></div><CategoryRows analytics={analytics} onCategory={onCategory} /></section></>}
        {report === 'jahr' && <><section className={styles.panel}><div className={styles.panelHead}><h2>Jahresbilanz {analytics.month.slice(0, 4)}</h2></div><div className={styles.yearTotals}><div><span>Einkommen</span><strong>{money(annual.income)}</strong></div><div><span>Ausgaben</span><strong>{money(annual.expenses)}</strong></div><div><span>Verbleibendes Einkommen</span><strong>{money(annual.income - annual.expenses)}</strong></div></div><p className={styles.help}>Zukünftige Monate enthalten nur bereits erfasste Buchungen; keine automatisch eingeplanten Fixkosten.</p></section><HistoryChart data={annualData} title="Monate im Vergleich" /><div className={styles.tableWrap}><table><thead><tr><th>Monat</th><th>Einkommen</th><th>Ausgaben</th><th>Verbleibend</th><th>Sparquote</th></tr></thead><tbody>{annualData.map(item => <tr key={item.key}><th>{monthLabel(item.key)}</th><td>{money(item.income)}</td><td>{money(item.expenses)}</td><td>{money(item.balance)}</td><td>{item.income > 0 ? `${percent(item.balance / item.income * 100)} %` : '—'}</td></tr>)}</tbody></table></div></>}
        {report === 'top' && <section className={styles.panel}><div className={styles.panelHead}><h2>Die 10 größten Ausgaben</h2></div><p className={styles.help}>Einzelne Buchungen inkl. Fixkosten, nach Betrag sortiert.</p><BookingRows entries={sortedEntries.filter(entry => entry.type === 'expense').sort((a, b) => b.amount - a.amount).slice(0, 10)} categories={categories} onEdit={onEdit} /></section>}
        {report === 'budget' && <section className={styles.panel}><div className={styles.panelHead}><h2>Budgetstatus</h2><button className={styles.textButton} onClick={() => onView('budgets')}>Budgets verwalten →</button></div><p className={styles.help}>{money(analytics.budgetActual)} von {money(analytics.budgetTotal)} verbraucht · {money(analytics.unbudgeted)} Ausgaben ohne Budget. Limits sind aktuell konfiguriert und nicht historisch versioniert.</p><CategoryRows analytics={analytics} onCategory={onCategory} budgetOnly /></section>}
        {report === 'verlauf' && <TrendReport key={analytics.month} month={analytics.month} categories={categories} getMonthEntries={getMonthEntries} onMonth={onMonth} />}
      </div>
    </div>
  }
  return <div className={styles.dashboardGrid}>
    <section className={styles.panel}><div className={styles.panelHead}><h2>Ausgaben nach Kategorie</h2><span>Betrag / Budget</span></div><CategoryRows analytics={analytics} onCategory={onCategory} limit={6} /><button className={styles.textButton} onClick={() => onView('berichte')}>Alle Kategorien & Berichte →</button></section>
    <section className={styles.panel}><div className={styles.panelHead}><h2>Diesen Monat</h2></div><Insights analytics={analytics} /></section>
    <section className={styles.panel}><div className={styles.panelHead}><h2>Letzte Buchungen</h2><button className={styles.textButton} onClick={() => onView('buchungen')}>Alle anzeigen →</button></div><BookingRows entries={sortedEntries.slice(0, 5)} categories={categories} compact /></section>
    <HistoryChart data={history} />
  </div>
}
