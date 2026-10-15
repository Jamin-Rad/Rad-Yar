'use client'

import Link from 'next/link'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { monthlyFinanceSummary } from '@/utils/monthlyFinanceSummary'
import styles from './MonthlyFinanceHeader.module.css'

const money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
const percent = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })
const months = Array.from({ length: 12 }, (_, index) => new Date(2026, index, 1).toLocaleDateString('de-DE', { month: 'long' }))

function Icon({ name, ...props }) {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18"/></>,
    previous: <path d="m14 6-6 6 6 6" />,
    next: <path d="m10 6 6 6-6 6" />,
    down: <path d="m6 9 6 6 6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    overview: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/></>,
    year: <><path d="M4 20V12h4v8M10 20V7h4v13M16 20V3h4v17"/></>,
    trend: <><path d="m3 17 6-6 4 4 8-10m-6 0h6v6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m9 3-.5 2-2 1L4 6l-2 4 2 2v2l-1 2 3 4 2-1 2 1 1 2h4l1-2 2-1 2 1 2-4-1-2v-2l2-2-2-4-2 .5-2-1L15 3Z"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

function moveMonth(month, direction) {
  const [year, number] = month.split('-').map(Number)
  const next = new Date(year, number - 1 + direction, 1)
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`
}

function MonthPicker({ month, onChange }) {
  const [open, setOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(Number(month.slice(0, 4)))
  const root = useRef(null)
  const panel = useRef(null)
  const trigger = useRef(null)
  const [year, number] = month.split('-').map(Number)

  function toggle(event) {
    trigger.current = event.currentTarget
    setPickerYear(year)
    setOpen(value => !value)
  }
  function close() {
    setOpen(false)
    trigger.current?.focus()
  }
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('[aria-pressed="true"]')?.focus()
    function outside(event) { if (!root.current?.contains(event.target)) setOpen(false) }
    function escape(event) {
      if (event.key === 'Escape') { event.preventDefault(); close() }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return <div className={styles.monthPicker} ref={root}>
    <div className={styles.monthControls}>
      <button type="button" className={styles.monthTitle} onClick={toggle} aria-label="Monat auswählen" aria-expanded={open} aria-haspopup="dialog">
        <span className={styles.calendarIcon}><Icon name="calendar" /></span>
        <span><strong>{months[number - 1]}</strong><small>{year}</small></span>
      </button>
      <div className={styles.monthSteps}>
        <button type="button" onClick={() => { onChange(moveMonth(month, -1)); setOpen(false) }} aria-label="Vorheriger Monat"><Icon name="previous" /></button>
        <button type="button" onClick={() => { onChange(moveMonth(month, 1)); setOpen(false) }} aria-label="Nächster Monat"><Icon name="next" /></button>
        <button type="button" onClick={toggle} aria-label="Monatsauswahl öffnen" aria-expanded={open} aria-haspopup="dialog"><Icon name="down" /></button>
      </div>
    </div>
    {open ? <div className={styles.pickerPanel} role="dialog" aria-label="Monat und Jahr auswählen" ref={panel}>
      <div className={styles.pickerYear}>
        <button type="button" onClick={() => setPickerYear(value => value - 1)} aria-label="Vorheriges Jahr"><Icon name="previous" /></button>
        <strong aria-live="polite">{pickerYear}</strong>
        <button type="button" onClick={() => setPickerYear(value => value + 1)} aria-label="Nächstes Jahr"><Icon name="next" /></button>
      </div>
      <div className={styles.monthGrid}>
        {months.map((label, index) => {
          const key = `${pickerYear}-${String(index + 1).padStart(2, '0')}`
          return <button type="button" key={key} aria-label={`${label} ${pickerYear}`} aria-pressed={month === key} onClick={() => { onChange(key); close() }}>{label.slice(0, 3)}</button>
        })}
      </div>
    </div> : null}
  </div>
}

function SpendingChart({ totals, loaded }) {
  const gradientId = useId().replaceAll(':', '')
  const used = totals.usedPercent
  const label = !loaded ? '—' : used === null ? '—' : `${percent.format(used)} %`
  const description = used === null ? 'Noch kein Einkommen' : 'des Einkommens verbraucht'
  const segments = [
    { name: 'Fixkosten', share: totals.fixedShare, className: styles.fixedArc },
    { name: 'Laufende Kosten', share: totals.currentShare, className: styles.currentArc },
  ]
  let offset = 0
  return <figure className={styles.chart} aria-label={loaded ? `Ausgabenverteilung: Fixkosten ${money.format(totals.fixed)}, laufende Kosten ${money.format(totals.current)}. ${used === null ? 'Noch kein Einkommen erfasst.' : `${percent.format(used)} Prozent des Einkommens verbraucht.`}` : 'Monatsbilanz wird geladen'}>
    <div className={styles.ring}>
      <svg viewBox="0 0 240 240" aria-hidden="true">
        <defs>
          <linearGradient id={`${gradientId}-gold`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe6a0"/><stop offset=".48" stopColor="#e9c76d"/><stop offset="1" stopColor="#b99142"/></linearGradient>
          <linearGradient id={`${gradientId}-purple`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ead3ff"/><stop offset=".4" stopColor="#c291e8"/><stop offset="1" stopColor="#9551cd"/></linearGradient>
        </defs>
        <circle className={styles.ringTrack} cx="120" cy="120" r="100" fill="none" strokeWidth="30" />
        {loaded ? segments.map(segment => {
          const start = offset
          const share = Math.min(1, Math.max(0, segment.share))
          offset += share
          return share > 0 ? <circle key={segment.name} className={segment.className} style={{ stroke: `url(#${gradientId}-${segment.name === 'Fixkosten' ? 'gold' : 'purple'})` }} cx="120" cy="120" r="100" fill="none" strokeWidth="30" pathLength="100" strokeDasharray={`${share * 100} ${100 - share * 100}`} strokeDashoffset={-start * 100} transform="rotate(-90 120 120)" /> : null
        }) : null}
      </svg>
      <div className={styles.ringCenter}><strong className={used > 100 ? styles.negative : undefined}>{label}</strong><span>{loaded ? description : 'Wird geladen'}</span></div>
    </div>
    <figcaption className={styles.legend}>
      <span><i className={styles.fixedDot} />Fixkosten</span>
      <span><i className={styles.currentDot} />Laufende Kosten</span>
      <span><i className={styles.remainingDot} />Verfügbar</span>
    </figcaption>
  </figure>
}

export default function MonthlyFinanceHeader({ month, onMonthChange, entries, loaded, onAdd, view, onNavigate, showVacation = false, children }) {
  const totals = useMemo(() => monthlyFinanceSummary(entries), [entries])
  const amount = value => loaded ? money.format(value) : '—'
  const tabs = [
    { id: 'monat', name: 'Übersicht', icon: 'overview' },
    { id: 'jahr', name: 'Jahresübersicht', icon: 'year' },
    { id: 'verlauf', name: 'Verlauf', icon: 'trend' },
    { id: 'einstellung', name: 'Einstellung', icon: 'settings' },
  ]
  return <div className={styles.root}>
    <div className={styles.titleRow}>
      <h1>Monatliche Ausgaben</h1>
      <div className={styles.actions}>
        <button type="button" onClick={() => onAdd('income')}><Icon name="plus" />Einkommen</button>
        <button type="button" className={styles.primaryAction} onClick={() => onAdd('expense')}><Icon name="plus" />Ausgabe</button>
      </div>
    </div>
    {children}
    <section className={styles.summary} aria-label="Monatsbilanz" aria-busy={!loaded}>
      <div className={styles.summaryData}>
        <MonthPicker month={month} onChange={onMonthChange} />
        <div className={styles.balance}>
          <span>{totals.remaining < 0 ? 'Im Minus' : 'Noch verfügbar'}</span>
          <strong className={totals.remaining < 0 ? styles.negative : undefined}>{amount(totals.remaining)}</strong>
          <small>Einkommen minus Ausgaben</small>
        </div>
        <dl className={styles.metrics}>
          <div><dt>Eingekommen</dt><dd>{amount(totals.income)}</dd></div>
          <div><dt>Ausgegeben</dt><dd>{amount(totals.expenses)}</dd></div>
          <div><dt>Fixkosten</dt><dd className={styles.fixedAmount}>{amount(totals.fixed)}</dd></div>
          <div><dt>Laufende Kosten</dt><dd className={styles.currentAmount}>{amount(totals.current)}</dd></div>
        </dl>
      </div>
      <SpendingChart totals={totals} loaded={loaded} />
    </section>
    <nav className={styles.navigation} aria-label="Finanzbereiche">
      {tabs.map(tab => <button type="button" key={tab.id} aria-current={view === tab.id ? 'page' : undefined} onClick={() => onNavigate(tab.id)}><Icon name={tab.icon} /><span>{tab.name}</span></button>)}
      {showVacation ? <Link href="/andarun/urlaub">Urlaub</Link> : null}
    </nav>
  </div>
}
