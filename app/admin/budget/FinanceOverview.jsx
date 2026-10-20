import { useMemo } from 'react'
import FinanceIcon, { categoryIcon } from './FinanceIcon'
import { buildExpenseBreakdown, expenseCategory } from './financeOverviewData.mjs'
import styles from './financeWorkspace.module.css'

const palette = ['#71c8a1', '#39947a', '#26766e', '#b2ded0', '#899995', '#5bafac', '#a6c9a0', '#507e6b']
const knownColors = { Wohnen: 0, 'Zu Hause': 0, Lebensmittel: 1, Mobilität: 2, Auto: 2, Freizeit: 3, Restaurant: 3, Sonstiges: 4 }
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
    <div className={styles.balance}><span>Monatsbilanz</span><strong className={summary.balance < 0 ? styles.negative : ''}>{loaded ? formatMoney(summary.balance) : '—'}</strong></div>
    <div><span>Einkommen</span><strong>{loaded ? formatMoney(summary.income) : '—'}</strong></div>
    <div><span>Ausgaben</span><strong>{loaded ? formatMoney(summary.expenses) : '—'}</strong></div>
    <div><span>Sparquote</span><strong>{loaded ? rate : '—'}</strong></div>
  </section>
}

function ExpenseDonut({ breakdown, formatMoney, onOpenCategory }) {
  const positiveTotal = breakdown.reduce((sum, [, value]) => sum + Math.max(0, value), 0)
  const refunds = breakdown.reduce((sum, [, value]) => sum + Math.min(0, value), 0)
  let offset = 0
  return <>
    <div className={styles.chartLayout}>
      <div className={styles.donut}>
        <svg viewBox="0 0 200 200" role="img" aria-label={`Ausgaben nach Hauptkategorie: ${breakdown.map(([name, amount]) => `${name} ${formatMoney(amount)}`).join(', ') || 'Keine Ausgaben'}`}>
          <circle cx="100" cy="100" r="78" fill="none" stroke="#e8efec" strokeWidth="28" />
          {breakdown.filter(([, amount]) => amount > 0).map(([name, amount]) => {
            const share = amount / positiveTotal * 100
            const paintedShare = share - Math.min(.35, share * .1)
            const start = offset
            offset += share
            return <circle key={name} data-expense-segment={name} cx="100" cy="100" r="78" fill="none" stroke={categoryColor(name)} strokeWidth="28" pathLength="100" data-share={share} strokeDasharray={`${paintedShare} ${100 - paintedShare}`} strokeDashoffset={-start} transform="rotate(-90 100 100)" />
          })}
        </svg>
        <div className={styles.donutValue}><span>{refunds < 0 ? 'Positive Ausgaben' : 'Ausgaben'}</span><strong>{formatMoney(positiveTotal)}</strong></div>
      </div>
      <div className={styles.legend}>
        {breakdown.map(([name, amount]) => <button key={name} type="button" className={styles.legendRow} onClick={() => onOpenCategory(name)}><span className={styles.swatch} style={{ background: categoryColor(name) }} /><span>{name}</span><strong>{formatMoney(amount)}</strong></button>)}
      </div>
    </div>
    {refunds < 0 && <p className={styles.note}>Erstattungen: {formatMoney(-refunds)} · im Monatssaldo berücksichtigt.</p>}
  </>
}

export default function FinanceOverview({ entries, incomeTotals, formatMoney, onOpenCategory, onOpenIncome, onOpenEntry, onAddExpense, onAddIncome, fatimaPaid, loaded }) {
  const breakdown = useMemo(() => buildExpenseBreakdown(entries), [entries])
  const recentEntries = useMemo(() => [...entries].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3), [entries])
  return <div className={styles.overview} aria-busy={!loaded}>
    <div className={styles.ledger}>
      <section aria-labelledby="finance-expenses-title">
        <h2 id="finance-expenses-title">Ausgaben nach Kategorien</h2>
        <div className={styles.listHeader}><span>Kategorie</span><span>Betrag</span></div>
        {breakdown.length ? breakdown.map(([name, amount]) => <button key={name} type="button" className={styles.expenseRow} onClick={() => onOpenCategory(name)}>
          <span className={styles.categoryIcon}><FinanceIcon name={categoryIcon(name)} /></span><span className={styles.categoryName}>{name}</span><strong>{formatMoney(amount)}</strong><FinanceIcon name="arrow" width="16" height="16" />
        </button>) : <div className={styles.empty}><p>{loaded ? 'Noch keine Ausgaben in diesem Monat.' : 'Einträge werden geladen …'}</p>{loaded && <button type="button" className={styles.textButton} onClick={onAddExpense}>+ Ausgabe eintragen</button>}</div>}
        {fatimaPaid !== 0 && <p className={styles.note}>Von Fatima bezahlt: {formatMoney(fatimaPaid)}</p>}
      </section>
      <section className={styles.recent} aria-labelledby="finance-recent-title">
        <h2 id="finance-recent-title">Letzte Einträge</h2>
        {recentEntries.length ? <table className={styles.transactions}>
          <thead><tr><th>Datum</th><th>Beschreibung</th><th>Kategorie</th><th>Betrag</th></tr></thead>
          <tbody>{recentEntries.map(entry => {
            const signedAmount = Number(entry.amount) * (entry.type === 'income' ? 1 : -1)
            return <tr key={entry.id}><td>{formatDate(entry.date)}</td><td><button type="button" onClick={() => onOpenEntry(entry)}>{entry.title || 'Eintrag'}</button></td><td>{entry.type === 'income' ? 'Einkommen' : expenseCategory(entry)}</td><td className={signedAmount >= 0 ? styles.positive : styles.negative}>{signedAmount >= 0 ? '+' : '−'}{formatMoney(Math.abs(signedAmount))}</td></tr>
          })}</tbody>
        </table> : <p className={styles.empty}>Noch keine Einträge.</p>}
      </section>
    </div>
    <aside className={styles.analysis} aria-label="Ausgabenverteilung und Einnahmequellen">
      <section aria-labelledby="finance-chart-title">
        <h2 id="finance-chart-title">Ausgaben nach Kategorien</h2>
        <ExpenseDonut breakdown={breakdown} formatMoney={formatMoney} onOpenCategory={onOpenCategory} />
        {!breakdown.length && <p className={styles.note}>Deine Ausgaben erscheinen hier nach dem ersten Eintrag.</p>}
      </section>
      <section className={styles.income} aria-labelledby="finance-income-title">
        <h2 id="finance-income-title">Einnahmen nach Quellen</h2>
        <div className={styles.listHeader}><span>Quelle</span><span>Betrag</span></div>
        {incomeTotals.length ? incomeTotals.map(([name, amount]) => <button type="button" key={name} className={styles.incomeRow} onClick={() => onOpenIncome(name)}><FinanceIcon name="company" /><span>{name}</span><strong>{formatMoney(amount)}</strong></button>) : <div className={styles.empty}><p>Noch kein Einkommen eingetragen.</p><button type="button" className={styles.textButton} onClick={onAddIncome}>+ Einkommen eintragen</button></div>}
      </section>
    </aside>
  </div>
}
