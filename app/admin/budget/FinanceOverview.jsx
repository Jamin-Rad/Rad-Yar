import { useId, useMemo, useState } from 'react'
import FatimaPaidBadge from './FatimaPaidBadge'
import fatimaStyles from './FatimaExpenseDetails.module.css'
import FinanceIcon, { categoryIcon } from './FinanceIcon'
import { buildExpenseBreakdown, expenseCategory } from './financeOverviewData.mjs'
import { buildExpenseDonut, formatExpenseShare } from './financeDonutGeometry.mjs'
import styles from './financeWorkspace.module.css'

const palette = ['#c8b4f2', '#9670d2', '#b7a0e5', '#a8d6c7', '#7254a4', '#8fa9d6', '#d6b0d9', '#a9b4df']
const knownColors = { Wohnen: 0, 'Zu Hause': 0, Lebensmittel: 2, Mobilität: 4, Auto: 4, Freizeit: 3, Restaurant: 3, Sonstiges: 1 }
function categoryColor(name) {
  if (Object.hasOwn(knownColors, name)) return palette[knownColors[name]]
  let hash = 0
  for (const character of name) hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  return palette[hash % palette.length]
}
const dateFormatter = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '—'
  return dateFormatter.format(new Date(`${value}T12:00:00`))
}

export function FinanceSummary({ summary, formatMoney, loaded }) {
  const rate = summary.income ? ((summary.balance / summary.income) * 100).toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' %' : '—'
  return <section className={styles.summary} aria-label="Monatsbilanz" aria-busy={!loaded}>
    <div className={styles.balance}><span className={styles.metricLabel}>Monatsbilanz</span><strong className={summary.balance < 0 ? styles.negative : ''}>{loaded ? formatMoney(summary.balance) : '—'}</strong></div>
    <div><span className={styles.metricLabel}>Einkommen</span><div className={styles.metricValue}><strong>{loaded ? formatMoney(summary.income) : '—'}</strong><span className={`${styles.metricIcon} ${styles.incomeIcon}`}><FinanceIcon name="trend" /></span></div></div>
    <div><span className={styles.metricLabel}>Ausgaben</span><div className={styles.metricValue}><strong>{loaded ? formatMoney(summary.expenses) : '—'}</strong><span className={`${styles.metricIcon} ${styles.expenseIcon}`}><FinanceIcon name="arrow" /></span></div></div>
    <div><span className={styles.metricLabel}>Sparquote</span><div className={styles.metricValue}><strong>{loaded ? rate : '—'}</strong><span className={styles.metricIcon}><FinanceIcon name="category" /></span></div></div>
  </section>
}

function shade(color, amount) {
  return `#${[1, 3, 5].map(index => Math.round(parseInt(color.slice(index, index + 2), 16) * amount).toString(16).padStart(2, '0')).join('')}`
}

function ExpenseDonut({ breakdown, onOpenCategory, loaded }) {
  const chartId = useId().replace(/:/g, '')
  const segments = useMemo(() => buildExpenseDonut(breakdown), [breakdown])
  const hasRefunds = breakdown.some(([, value]) => value < 0)
  return <>
    <div className={styles.chartLayout}>
      <div className={styles.donut}>
        <svg viewBox="0 0 320 260" role="img" aria-label={`Anteile der ${hasRefunds ? 'positiven ' : ''}Ausgaben: ${segments.map(({ name, share }) => `${name} ${formatExpenseShare(share)}`).join(', ') || 'Keine Ausgaben'}`}>
          <defs>
            <radialGradient id={`${chartId}-shadow`}><stop offset="0" stopColor="#080d1d" stopOpacity=".8" /><stop offset="1" stopColor="#080d1d" stopOpacity="0" /></radialGradient>
            {segments.map(({ name }, index) => <g key={name}>
              <linearGradient id={`${chartId}-top-${index}`} x1="0" y1="0" x2=".75" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor={categoryColor(name)} /><stop offset="1" stopColor={shade(categoryColor(name), .86)} /></linearGradient>
              <linearGradient id={`${chartId}-side-${index}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={shade(categoryColor(name), .7)} /><stop offset="1" stopColor={shade(categoryColor(name), .42)} /></linearGradient>
            </g>)}
          </defs>
          <ellipse cx="160" cy="233" rx="143" ry="22" fill={`url(#${chartId}-shadow)`} />
          {segments.length ? <>
            {segments.map((segment, index) => <g key={segment.name} fill={`url(#${chartId}-side-${index})`}>
              {[...segment.inner, ...segment.outer, ...segment.edges].map((path, wall) => <path key={wall} d={path} />)}
            </g>)}
            {segments.map(({ name, share, top }, index) => <path key={name} d={top} fill={`url(#${chartId}-top-${index})`} stroke={categoryColor(name)} strokeWidth=".6" data-expense-segment={name} data-share={share}><title>{name}: {formatExpenseShare(share)}</title></path>)}
          </> : <ellipse cx="160" cy="124" rx="108" ry="78" fill="none" stroke="#39415b" strokeWidth="32" />}
        </svg>
        <div className={styles.donutValue}><span>{loaded ? hasRefunds ? 'Positive Ausgaben' : 'Ausgaben' : 'Lädt …'}</span><strong>{segments.length ? '100 %' : '—'}</strong></div>
      </div>
      <div className={styles.legend}>
        {segments.map(({ name, share }) => <button key={name} type="button" className={styles.legendRow} onClick={() => onOpenCategory(name)}><span className={styles.swatch} style={{ background: categoryColor(name) }} /><span>{name}</span><strong>{formatExpenseShare(share)}</strong></button>)}
      </div>
    </div>
    {hasRefunds && <p className={styles.note}>Erstattungen sind im Monatssaldo berücksichtigt und nicht als Ausgabenanteil dargestellt.</p>}
  </>
}

export default function FinanceOverview({ entries, incomeTotals, formatMoney, onOpenCategory, onOpenIncome, onOpenEntry, onAddExpense, onAddIncome, fatimaPaid, onOpenFatima, loaded }) {
  const [showAllEntries, setShowAllEntries] = useState(false)
  const entriesId = useId()
  const breakdown = useMemo(() => buildExpenseBreakdown(entries), [entries])
  const sortedEntries = useMemo(() => [...entries].sort((a, b) => (b.date || '').localeCompare(a.date || '')), [entries])
  const recentEntries = showAllEntries ? sortedEntries : sortedEntries.slice(0, 3)
  return <div className={styles.overview} aria-busy={!loaded}>
    <div className={styles.ledger}>
      <section className={styles.expenseCard} aria-labelledby="finance-expenses-title">
        <h2 id="finance-expenses-title">Ausgaben nach Kategorien</h2>
        <div className={styles.listHeader}><span>Kategorie</span><span>Betrag</span></div>
        {breakdown.length ? breakdown.map(([name, amount]) => <button key={name} type="button" className={styles.expenseRow} onClick={() => onOpenCategory(name)}>
          <span className={styles.categoryIcon}><FinanceIcon name={categoryIcon(name)} /></span><span className={styles.categoryName}>{name}</span><strong>{formatMoney(amount)}</strong><FinanceIcon name="arrow" width="16" height="16" />
        </button>) : <div className={styles.empty}><p>{loaded ? 'Noch keine Ausgaben in diesem Monat.' : 'Einträge werden geladen …'}</p>{loaded && <button type="button" className={styles.textButton} onClick={onAddExpense}>+ Ausgabe eintragen</button>}</div>}
        {loaded && <p className={styles.note}><button type="button" className={fatimaStyles.trigger} aria-haspopup="dialog" onClick={onOpenFatima}>Von Fatima bezahlt: {formatMoney(fatimaPaid)}</button></p>}
      </section>
      <section className={styles.recent} aria-labelledby="finance-recent-title">
        <h2 id="finance-recent-title">{showAllEntries ? 'Alle Einträge des Monats' : 'Letzte Einträge'}</h2>
        {recentEntries.length ? <table id={entriesId} className={styles.transactions}>
          <thead><tr><th>Datum</th><th>Beschreibung</th><th>Kategorie</th><th>Betrag</th></tr></thead>
          <tbody>{recentEntries.map(entry => {
            const signedAmount = Number(entry.amount) * (entry.type === 'income' ? 1 : -1)
            return <tr key={entry.id}><td>{formatDate(entry.date)}</td><td><button type="button" onClick={() => onOpenEntry(entry)}>{entry.title || 'Eintrag'}</button>{entry.type === 'expense' && entry.paidByFatima ? <> <FatimaPaidBadge /></> : null}</td><td>{entry.type === 'income' ? 'Einkommen' : expenseCategory(entry)}</td><td className={signedAmount >= 0 ? styles.positive : styles.negative}>{signedAmount >= 0 ? '+' : '−'}{formatMoney(Math.abs(signedAmount))}</td></tr>
          })}</tbody>
        </table> : <p className={styles.empty}>Noch keine Einträge.</p>}
        {sortedEntries.length > 3 ? <button type="button" className={styles.monthEntriesToggle} aria-expanded={showAllEntries} aria-controls={entriesId} onClick={() => setShowAllEntries(value => !value)}>{showAllEntries ? 'Weniger anzeigen' : `Ganzen Monat anzeigen (${sortedEntries.length} Einträge)`}</button> : null}
      </section>
    </div>
    <aside className={styles.analysis} aria-label="Ausgabenverteilung und Einnahmequellen">
      <section className={styles.chartCard} aria-labelledby="finance-chart-title">
        <h2 id="finance-chart-title">Ausgabenverteilung</h2>
        <ExpenseDonut breakdown={breakdown} onOpenCategory={onOpenCategory} loaded={loaded} />
        {!breakdown.some(([, amount]) => amount > 0) && <p className={styles.note}>{loaded ? 'Noch keine positiven Ausgaben in diesem Monat.' : 'Einträge werden geladen …'}</p>}
      </section>
      <section className={styles.income} aria-labelledby="finance-income-title">
        <h2 id="finance-income-title">Einkommen nach Quellen</h2>
        {incomeTotals.length ? incomeTotals.map(([name, amount]) => <button type="button" key={name} className={styles.incomeRow} onClick={() => onOpenIncome(name)}><span className={styles.sourceIcon}><FinanceIcon name="company" /></span><span>{name}</span><strong>{formatMoney(amount)}</strong></button>) : <div className={styles.empty}><p>Noch kein Einkommen eingetragen.</p><button type="button" className={styles.textButton} onClick={onAddIncome}>+ Einkommen eintragen</button></div>}
      </section>
    </aside>
  </div>
}
