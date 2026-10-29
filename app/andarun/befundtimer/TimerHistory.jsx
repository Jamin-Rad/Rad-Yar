import { memo, useMemo, useState } from 'react'
import { formatWorkHours, summarizeTimerModalities } from '../dienste/findingTimerSummary'
import { MODALITIES, addDays, dateLabel, duration, historyRecords, shiftsForDate, shiftLabel, shiftDescription, totals, weekDates, compareDays } from './timerModel'
import Icon from './TimerIcon'
import styles from './timer.module.css'
const PAGE_SIZE = 30
function MetricSummary({ records }) {
  const summary = totals(records)
  return <dl className={styles.metrics}><div><dd>{summary.count}</dd><dt>Befunde</dt></div><div><dd>{formatWorkHours(summary.totalMs)}</dd><dt>Befundzeit</dt></div><div><dd>{summary.count ? duration(summary.avg) : '—'}</dd><dt>Ø pro Befund</dt></div></dl>
}
function RecordTable({ records, shifts, onEdit, showDate = false, busy }) {
  return <div className={styles.tableWrap}><table className={styles.records}><thead><tr>{showDate && <th>Datum / Dienst</th>}<th>Modalität</th><th>Befunde</th><th>Dauer</th><th>Ø / Befund</th><th><span className={styles.srOnly}>Aktionen</span></th></tr></thead><tbody>{records.map(timer => <tr key={timer.id}>
    {showDate && <td><strong>{dateLabel(timer.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}</strong><small>{shiftsForDate(shifts, timer.date).map(shiftLabel).join(' · ') || 'Kein Dienst eingetragen'}</small></td>}
    <td><span className={styles.modalityDot} data-modality={timer.modality}/>{timer.modality}</td><td>{timer.count || 1}</td><td>{duration(timer.durationMs)}</td><td>{duration(timer.durationMs / (timer.count || 1))}</td><td><button type="button" className={styles.iconButton} aria-label={`${timer.modality} vom ${dateLabel(timer.date)} bearbeiten`} onClick={() => onEdit(timer)} disabled={busy}><Icon name="edit"/></button></td>
  </tr>)}</tbody></table>{!records.length && <p className={styles.empty}>Keine Befundzeiten für diesen Zeitraum gespeichert.</p>}</div>
}
function ComparisonCell({ stat }) {
  return <><strong>{stat.count ? `${stat.count} ${stat.count === 1 ? 'Befund' : 'Befunde'}` : '—'}</strong><small>Gesamt {stat.count ? duration(stat.totalMs) : '—'}</small><span>Ø {stat.count ? duration(stat.avg) : '—'}</span></>
}
function TimerHistory({ timers, shifts, today, onEdit, busy, view, onViewChange, selection, onSelectionChange }) {
  const [week, setWeek] = useState(selection?.date || today)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [modality, setModality] = useState(selection?.modality || '')
  const [detail, setDetail] = useState(selection?.modality ? 'sessions' : 'comparison')
  const [page, setPage] = useState(0)
  const days = useMemo(() => weekDates(week), [week])
  const records = useMemo(() => historyRecords(timers, { from: view === 'week' ? days[0] : from, to: view === 'week' ? days[6] : to, modality }), [timers, view, days, from, to, modality])
  const comparisons = useMemo(() => compareDays(records, view === 'week' ? days : undefined), [records, days, view])
  const summaries = useMemo(() => summarizeTimerModalities(records, MODALITIES), [records])
  const sessions = selection?.date ? records.filter(timer => timer.date === selection.date) : records
  const resultCount = detail === 'sessions' ? sessions.length : comparisons.length
  const pages = Math.max(1, Math.ceil(resultCount / PAGE_SIZE))
  const currentPage = Math.min(page, pages - 1)
  const range = [currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE]
  function resetSelection() { onSelectionChange(null); setPage(0) }
  function switchPeriod(next) { onViewChange(next); resetSelection() }
  function updateFilter(setter, value) { setter(value); resetSelection() }
  function openDay(date) { onSelectionChange({ date, modality: '' }); setDetail('sessions'); setPage(0) }
  return <section className={styles.history} aria-label="Befundtimer Verlauf">
    <div className={styles.historyToolbar}><div className={styles.tabs} aria-label="Zeitraum"><button type="button" aria-pressed={view === 'week'} onClick={() => switchPeriod('week')}>Diese Woche</button><button type="button" aria-pressed={view === 'all'} onClick={() => switchPeriod('all')}>Gesamtverlauf</button></div>
      {view === 'week' && <div className={styles.weekNav}><button type="button" className={styles.iconButton} aria-label="Vorherige Woche" onClick={() => { setWeek(addDays(days[0], -7)); resetSelection() }}><Icon name="left"/></button><strong>{dateLabel(days[0], { day: 'numeric', month: 'short' })} – {dateLabel(days[6], { day: 'numeric', month: 'short', year: 'numeric' })}</strong><button type="button" className={styles.iconButton} aria-label="Nächste Woche" onClick={() => { setWeek(addDays(days[0], 7)); resetSelection() }}><Icon name="right"/></button><button type="button" className={styles.todayButton} onClick={() => { setWeek(today); resetSelection() }}>Heute</button></div>}
    </div>
    {view === 'all' && <div className={styles.filters}><label>Von<input type="date" value={from} onChange={e => updateFilter(setFrom, e.target.value)}/></label><label>Bis<input type="date" value={to} onChange={e => updateFilter(setTo, e.target.value)}/></label><label>Modalität<select value={modality} onChange={e => updateFilter(setModality, e.target.value)}><option value="">Alle Modalitäten</option>{MODALITIES.map(m => <option key={m}>{m}</option>)}</select></label>{(from || to || modality) && <button type="button" onClick={() => { setFrom(''); setTo(''); setModality(''); resetSelection() }}>Zurücksetzen</button>}</div>}
    {view === 'week' && modality && <button type="button" className={styles.clearDay} onClick={() => { setModality(''); resetSelection() }}>Filter: {modality} · Alle Modalitäten anzeigen</button>}
    {from && to && from > to && view === 'all' && <p className={styles.error} role="alert">„Von“ muss vor „Bis“ liegen.</p>}
    <MetricSummary records={records}/>
    <div className={styles.detailTabs} aria-label="Vergleichsart"><button type="button" aria-pressed={detail === 'comparison'} onClick={() => { setDetail('comparison'); resetSelection() }}>Tage &amp; Modalitäten</button><button type="button" aria-pressed={detail === 'sessions'} onClick={() => { setDetail('sessions'); setPage(0) }}>Einzelzeiten</button></div>
    {detail === 'comparison' ? <div className={styles.comparisonPane}>
      <div className={styles.comparisonBlock}><h3>Modalitäten im Zeitraum</h3><div className={styles.tableWrap}><table className={styles.records} aria-label="Modalitäten im Zeitraum"><thead><tr><th>Modalität</th><th>Befunde</th><th>Gesamtzeit</th><th>Ø pro Befund</th></tr></thead><tbody>{summaries.map(stat => <tr key={stat.modality}><td><i className={styles.modalityDot} data-modality={stat.modality}/>{stat.modality}</td><td>{stat.count}</td><td>{stat.count ? duration(stat.totalMs) : '—'}</td><td>{stat.count ? duration(stat.avg) : '—'}</td></tr>)}</tbody></table></div></div>
      <div className={styles.comparisonBlock}><div className={styles.comparisonHeading}><h3>Tage vergleichen</h3><span>Tag öffnen für Einzelzeiten<span className={styles.comparisonHint}> · Weitere Modalitäten: seitlich wischen</span></span></div><div className={styles.tableWrap}><table className={`${styles.records} ${styles.dayComparison}`} aria-label="Tage und Modalitäten vergleichen"><thead><tr><th>Tag / Dienst</th>{MODALITIES.map(m => <th key={m}><i className={styles.modalityDot} data-modality={m}/>{m}</th>)}<th>Gesamt</th></tr></thead><tbody>{comparisons.slice(...range).map(day => <tr key={day.date}><td><button type="button" className={styles.dateButton} onClick={() => openDay(day.date)} aria-label={`Einzelzeiten vom ${dateLabel(day.date, { day: 'numeric', month: 'long', year: 'numeric' })}`}><strong>{dateLabel(day.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}</strong><Icon name="right"/></button><small>{shiftsForDate(shifts, day.date).map(shiftDescription).join(' / ') || 'Kein Dienst eingetragen'}</small></td>{day.modalities.map(stat => <td key={stat.modality}><ComparisonCell stat={stat}/></td>)}<td><ComparisonCell stat={day}/></td></tr>)}</tbody></table>{!comparisons.length && <p className={styles.empty}>Keine Befundzeiten für diesen Zeitraum gespeichert.</p>}</div></div>
    </div> : <>
      {selection?.date && <div className={styles.selectedDay}><strong>{dateLabel(selection.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong><button type="button" onClick={resetSelection}>Alle Tage anzeigen</button></div>}
      <RecordTable records={sessions.slice(...range)} shifts={shifts} onEdit={onEdit} showDate busy={busy}/>
    </>}
    <footer className={styles.pagination}><span>{resultCount} {detail === 'sessions' ? 'gespeicherte Zeiten' : 'Tage'}{resultCount > PAGE_SIZE ? ` · ${range[0] + 1}–${Math.min(range[1], resultCount)}` : ''}</span><button type="button" className={styles.iconButton} aria-label="Vorherige Ergebnisse" disabled={!currentPage} onClick={() => setPage(currentPage - 1)}><Icon name="left"/></button><button type="button" className={styles.iconButton} aria-label="Weitere Ergebnisse" disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}><Icon name="right"/></button></footer>
  </section>
}
export default memo(TimerHistory)
