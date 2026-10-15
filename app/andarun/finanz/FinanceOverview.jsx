import { mainCategory, money, monthLabel, percent, shortDate } from '@/utils/monthlyExpenseModel'
import Icon, { iconForCategory } from './FinanceIcons'
import s from './MonthlyExpenses.module.css'

export function Summary({ model }) {
  const { totals, budgetTotal, budgetPercent, budgetLeft, budgetUsed, unbudgeted } = model
  return <section className={s.summary} aria-label="Monatsbilanz">
    <div className={s.summaryMain}><p>Nach den Ausgaben übrig</p><strong className={`${s.balanceNumber} ${totals.balance < 0 ? s.negative : ''}`}>{money(totals.balance)}</strong><span className={s.balanceHint}>Einkommen minus Ausgaben · kein Kontostand</span>
      <div className={s.summaryFigures}>{[['Einkommen', totals.income], ['Ausgaben', totals.expenses], ['fix', totals.fixed], ['variabel', totals.variable]].map(([label, value]) => <div key={label}><strong>{money(value)}</strong><span>{label}</span></div>)}</div>
    </div>
    <div className={s.summaryBudget}>
      <span className={s.mobileBudgetPercent}>{budgetTotal ? `Budget genutzt: ${percent(budgetPercent)} %` : 'Noch kein Budget'}</span>
      <div className={s.ring} style={{ '--progress': `${Math.min(budgetPercent || 0, 100) * 3.6}deg` }} aria-label={budgetTotal ? `${percent(budgetPercent)} Prozent des Budgets genutzt` : 'Noch kein Budget'}><span><strong>{budgetTotal ? `${Math.round(budgetPercent)} %` : '—'}</strong><small>Budget genutzt</small></span></div>
      <div className={s.budgetCaption}><strong className={budgetTotal && budgetLeft < 0 ? s.negative : ''}>{budgetTotal ? `${money(Math.abs(budgetLeft))} ${budgetLeft < 0 ? 'über Budget' : 'übrig'}` : 'Noch kein Budget'}</strong><span>{budgetTotal ? `${money(budgetUsed)} von ${money(budgetTotal)}` : 'In Planung Kategorie-Limits setzen'}</span></div>
      <div className={s.mobileBudgetTrack}><i style={{ width: `${Math.min(budgetPercent || 0, 100)}%` }} /></div>
    </div>
    <p className={s.summaryFootnote}>{model.future ? 'Geplanter Monat · ' : ''}Inkl. eingeplanter Fixkosten<span className={s.mobileCostSplit}> · {money(totals.fixed)} fix / {money(totals.variable)} variabel</span>{unbudgeted > 0 ? ` · ${money(unbudgeted)} ohne Kategorie-Budget` : ''}</p>
  </section>
}

export function CategoryList({ model, onCategory, limit, budgetOnly = false }) {
  const all = budgetOnly ? model.rows.filter(row => row.budget > 0) : model.rows
  const rows = limit ? all.slice(0, limit) : all
  return <div className={s.categories}>{rows.map(row => <button type="button" key={row.name} className={s.categoryRow} onClick={() => onCategory(row.name)}>
    <span className={s.categoryIcon}><Icon name={iconForCategory(row.name)} size={22} /></span>
    <span className={s.categoryContent}><span className={s.categoryTop}><strong>{row.name}</strong><b className={row.status === 'over' ? s.negative : ''}>{money(row.actual)}</b></span><span className={s.progress}><i className={row.status === 'over' ? s.over : ''} style={{ width: `${Math.min(row.percent ?? row.share, 100)}%` }} /></span><span className={s.categoryBottom}><small>{row.budget ? `${percent(row.percent)} % von ${money(row.budget)}` : `${percent(row.share)} % der Ausgaben · ohne Budget`}</small>{row.status === 'over' && <small className={s.negative}>{money(-row.remaining)} über Budget</small>}</span></span>
    <Icon name="right" size={15} />
  </button>)}{!rows.length && <div className={s.empty}><Icon name={budgetOnly ? 'wallet' : 'cart'} size={28} /><strong>{budgetOnly ? 'Dein Budget beginnt hier.' : 'Ein frischer Monat.'}</strong><p>{budgetOnly ? 'Lege unter Planung ein Kategorie-Limit fest.' : 'Trage deine erste Ausgabe ein. Hier siehst du dann, wohin dein Geld fließt.'}</p></div>}</div>
}

export function MonthInsights({ model, compact = false }) {
  const [expanded, setExpanded] = useState(false)
  const showDetails = !compact || expanded
  const { delta, increases, totals } = model
  return <>
    <div className={s.insight}><span className={s.insightIcon}><Icon name="chart" size={25} /></span><div><strong>{delta === null ? 'Dein Überblick wächst mit.' : delta === 0 ? 'Ausgaben wie im Vormonat' : `${money(Math.abs(delta))} ${delta > 0 ? 'mehr' : 'weniger'} als im Vormonat`}</strong><p>{delta === null ? 'Mit den ersten Einträgen kannst du deine Monate vergleichen.' : `Vergleich mit ${monthLabel(model.before)}${model.day ? ` – jeweils bis Tag ${model.day}` : ' – vollständige Monate'}.${model.deltaPercent !== null ? ` ${percent(Math.abs(model.deltaPercent))} % ${delta >= 0 ? 'mehr' : 'weniger'}.` : ''}`}</p></div></div>
    {showDetails && (increases[0] ? <div className={s.insight}><span className={s.insightIcon}><Icon name="trend" size={25} /></span><div><strong>Größter Anstieg: {increases[0].name}</strong><p>{money(increases[0].delta)} mehr als im Vergleichszeitraum.</p></div></div> : <div className={s.insight}><span className={s.insightIcon}><Icon name="wallet" size={25} /></span><div><strong>{model.rows.some(row => row.status === 'over') ? 'Ein Budget braucht Aufmerksamkeit.' : 'Dein Budget im Blick.'}</strong><p>{model.rows.filter(row => row.status === 'over').map(row => row.name).join(', ') || 'Kategorie-Limits helfen dir, Ausgaben rechtzeitig zu erkennen.'}</p></div></div>)}
    {showDetails && <div className={s.payerSummary}><span>Bezahlt von</span>{[['Jamin', totals.jamin], ['Fatima', totals.fatima]].map(([name, value], index) => <div key={name}><i className={index ? s.goldDot : ''} /><span>{name}</span><strong>{money(value)}</strong><small>{totals.expenses ? `${percent(value / totals.expenses * 100)} %` : '—'}</small></div>)}<p>Inkl. Fixkosten. Ohne andere Markierung: Jamin. Zahlungen, keine Kostenaufteilung.</p></div>}
    {compact && <button type="button" className={s.textAction} aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? 'Weniger anzeigen' : 'Mehr zum Monat'}<Icon name={expanded ? 'close' : 'right'} size={14} /></button>}
  </>
}

export function BookingRows({ entries, categories, onEdit, onDelete, compact = false }) {
  return <div className={s.bookings}>
    {entries.map(entry => <div className={s.booking} key={entry.id}>
      <span className={s.bookingDate}>{shortDate(entry.date)}</span><span className={s.bookingIcon}><Icon name={iconForCategory(mainCategory(entry, categories))} size={18} /></span>
      <div className={s.bookingCopy}><strong>{entry.description || entry.title}</strong><small>{mainCategory(entry, categories)} · {entry.type === 'income' ? 'Einkommen' : entry.paidByFatima ? 'Fatima' : 'Jamin'}{entry.generatedRecurring ? ' · fix' : ''}</small>{!compact && entry.tags?.length > 1 && <small>Tags: {entry.tags.join(' · ')}</small>}</div>
      <strong className={entry.type === 'income' ? s.positive : s.bookingAmount}>{entry.type === 'income' ? '+' : '−'}{money(entry.amount)}</strong>
      {!compact && <div className={s.rowActions}><button type="button" title={entry.generatedRecurring ? 'In Planung bearbeiten' : 'Buchung bearbeiten'} aria-label={`${entry.title} bearbeiten`} onClick={() => onEdit(entry)}><Icon name="edit" size={16} /></button>{!entry.generatedRecurring && <button type="button" aria-label={`${entry.title} löschen`} onClick={() => onDelete(entry)}><Icon name="trash" size={16} /></button>}</div>}
    </div>)}
    {!entries.length && <div className={s.empty}><Icon name="wallet" size={28} /><strong>Noch keine Buchungen.</strong><p>Eine Ausgabe oder ein Einkommen eintragen – oder deine Filter anpassen.</p></div>}
  </div>
}
import { useState } from 'react'
