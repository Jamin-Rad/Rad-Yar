import { memo, useMemo, useState } from 'react'
import { formatWorkHours, summarizeTimerModalities } from '../dienste/findingTimerSummary'
import { MODALITIES, addDays, dateLabel, duration, historyRecords, shiftsForDate, shiftLabel, shiftShortLabel, shiftDescription, totals, weekDates } from './timerModel'
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
function TimerHistory({ timers, shifts, today, onEdit, busy, view, onViewChange, selection, onSelectionChange }) {
  const [week, setWeek] = useState(today)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [modality, setModality] = useState('')
  const [page, setPage] = useState(0)
  const days = useMemo(() => weekDates(selection?.date || week), [week, selection?.date])
  const weekly = useMemo(() => historyRecords(timers, { from: days[0], to: days[6] }), [timers, days])
  const all = useMemo(() => historyRecords(timers, { from, to, modality }), [timers, from, to, modality])
  const day = days.includes(selection?.date) ? selection.date : days.includes(today) ? today : days[0]
  const selectedModality = selection?.date === day ? selection.modality : ''
  const daily = weekly.filter(timer => timer.date === day && (!selectedModality || timer.modality === selectedModality))
  const dayShifts = shiftsForDate(shifts, day)
  const chart = days.map(date => ({ date, ...totals(weekly.filter(t => t.date === date)), modalities: summarizeTimerModalities(weekly.filter(t => t.date === date), MODALITIES) }))
  const max = Math.max(1, ...chart.map(day => day.count))
  const pageCount = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount - 1)
  function moveWeek(delta) { const next = addDays(days[0], delta * 7); setWeek(next); onSelectionChange(null) }
  function updateFilter(setter, value) { setter(value); setPage(0) }
  return <section className={styles.history} aria-label="Befundtimer Verlauf">
    <header className={styles.historyHead}><h2>Verlauf</h2><div className={styles.tabs} aria-label="Verlaufansicht"><button type="button" aria-pressed={view === 'week'} onClick={() => onViewChange('week')}>Diese Woche</button><button type="button" aria-pressed={view === 'all'} onClick={() => onViewChange('all')}>Gesamtverlauf</button></div></header>
    {view === 'week' ? <>
      <div className={styles.weekNav}><button type="button" className={styles.iconButton} aria-label="Vorherige Woche" onClick={() => moveWeek(-1)}><Icon name="left"/></button><strong>{dateLabel(days[0], { day: 'numeric', month: 'short' })} – {dateLabel(days[6], { day: 'numeric', month: 'short', year: 'numeric' })}</strong><button type="button" className={styles.iconButton} aria-label="Nächste Woche" onClick={() => moveWeek(1)}><Icon name="right"/></button><button type="button" className={styles.todayButton} onClick={() => { setWeek(today); onSelectionChange(null) }}>Heute</button></div>
      <MetricSummary records={weekly}/>
      <div className={styles.legend}>{MODALITIES.map(m => <span key={m}><i className={styles.modalityDot} data-modality={m}/>{m}</span>)}</div>
      <div className={styles.weekChart} aria-label="Befunde und Dienste pro Wochentag">{chart.map(item => <button key={item.date} type="button" className={styles.chartDay} aria-pressed={item.date === day} aria-label={`${dateLabel(item.date, { weekday: 'long', day: 'numeric', month: 'long' })}: ${item.count} Befunde, ${shiftsForDate(shifts, item.date).map(shiftLabel).join(', ') || 'kein Dienst eingetragen'}`} onClick={() => onSelectionChange({ date: item.date, modality: '' })}>
        <span className={styles.barArea}><strong>{item.count || ''}</strong><span className={styles.barStack} style={{ height: `${item.count / max * 80}%` }}>{item.modalities.map(stat => stat.count > 0 && <i key={stat.modality} data-modality={stat.modality} style={{ flex: stat.count }}/>)}</span></span>
        <span className={styles.chartWeekday}>{dateLabel(item.date, { weekday: 'short' })} <b>{dateLabel(item.date, { day: 'numeric' })}</b></span><small title={shiftsForDate(shifts, item.date).map(shiftDescription).join(' / ')}><span className={styles.shiftLong}>{shiftsForDate(shifts, item.date).map(shiftLabel).join(' · ') || '—'}</span><span className={styles.shiftShort}>{shiftsForDate(shifts, item.date).map(shiftShortLabel).join(' · ') || '—'}</span></small>
      </button>)}</div>
      <div className={styles.dayHeading}><div><h3>{dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</h3><p>{dayShifts.length ? dayShifts.map(shiftDescription).join(' / ') : 'Kein Dienst eingetragen'}</p></div>{selectedModality && <button type="button" onClick={() => onSelectionChange({ date: day, modality: '' })}>{selectedModality} · Alle anzeigen</button>}</div>
      <RecordTable records={daily} shifts={shifts} onEdit={onEdit} busy={busy}/>
    </> : <>
      <div className={styles.filters}><label>Von<input type="date" value={from} onChange={e => updateFilter(setFrom, e.target.value)}/></label><label>Bis<input type="date" value={to} onChange={e => updateFilter(setTo, e.target.value)}/></label><label>Modalität<select value={modality} onChange={e => updateFilter(setModality, e.target.value)}><option value="">Alle Modalitäten</option>{MODALITIES.map(m => <option key={m}>{m}</option>)}</select></label>{(from || to || modality) && <button type="button" onClick={() => { setFrom(''); setTo(''); setModality(''); setPage(0) }}>Zurücksetzen</button>}</div>
      {from && to && from > to && <p className={styles.error} role="alert">„Von“ muss vor „Bis“ liegen.</p>}
      <MetricSummary records={all}/>
      <RecordTable records={all.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)} shifts={shifts} onEdit={onEdit} showDate busy={busy}/>
      <footer className={styles.pagination}><span>{all.length} gespeicherte {all.length === 1 ? 'Zeit' : 'Zeiten'}{all.length > 0 ? ` · ${currentPage * PAGE_SIZE + 1}–${Math.min((currentPage + 1) * PAGE_SIZE, all.length)}` : ''}</span><button type="button" className={styles.iconButton} aria-label="Vorherige Ergebnisse" disabled={!currentPage} onClick={() => setPage(currentPage - 1)}><Icon name="left"/></button><button type="button" className={styles.iconButton} aria-label="Weitere Ergebnisse" disabled={currentPage + 1 >= pageCount} onClick={() => setPage(currentPage + 1)}><Icon name="right"/></button></footer>
    </>}
  </section>
}

export default memo(TimerHistory)
