import { useEffect, useRef, useState } from 'react'
import FinanceIcon from './FinanceIcon'
import styles from './financeWorkspace.module.css'

const monthNames = Array.from({ length: 12 }, (_, index) => new Date(2026, index, 1).toLocaleDateString('de-DE', { month: 'long' }))
function moveMonth(month, step) {
  const [year, number] = month.split('-').map(Number)
  const date = new Date(year, number - 1 + step, 1)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default function FinanceWorkspaceHeader({ month, onMonthChange, onAdd, loaded, children }) {
  const [open, setOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(Number(month.slice(0, 4)))
  const root = useRef(null)
  const trigger = useRef(null)
  const panel = useRef(null)
  const [year, number] = month.split('-').map(Number)
  function close() { setOpen(false); trigger.current?.focus() }
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('[aria-pressed="true"]')?.focus()
    function outside(event) { if (!root.current?.contains(event.target)) setOpen(false) }
    function escape(event) { if (event.key === 'Escape') { event.preventDefault(); close() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  return <header className={styles.header}>
    <h1 className={styles.heading}>Finanzen</h1>
    <div className={styles.monthPicker} ref={root}>
      <button type="button" className={styles.monthArrow} aria-label="Vorheriger Monat" onClick={() => { onMonthChange(moveMonth(month, -1)); setOpen(false) }}>‹</button>
      <button type="button" ref={trigger} className={styles.monthDisplay} aria-label="Monat auswählen" aria-expanded={open} aria-haspopup="dialog" onClick={() => { setPickerYear(year); setOpen(value => !value) }}><span>{monthNames[number - 1]} {year}</span><span className={styles.monthChevron} aria-hidden="true">⌄</span></button>
      <button type="button" className={styles.monthArrow} aria-label="Nächster Monat" onClick={() => { onMonthChange(moveMonth(month, 1)); setOpen(false) }}>›</button>
      {open && <div className={styles.monthDropdown} ref={panel} role="dialog" aria-label="Monat und Jahr auswählen">
        <div className={styles.monthYearRow}>
          <button type="button" className={styles.monthYearButton} aria-label="Vorheriges Jahr" onClick={() => setPickerYear(value => value - 1)}>‹</button>
          <span className={styles.monthYearLabel} aria-live="polite">{pickerYear}</span>
          <button type="button" className={styles.monthYearButton} aria-label="Nächstes Jahr" onClick={() => setPickerYear(value => value + 1)}>›</button>
        </div>
        <div className={styles.monthGrid}>{monthNames.map((name, index) => {
          const key = `${pickerYear}-${String(index + 1).padStart(2, '0')}`
          return <button type="button" key={key} aria-label={`${name} ${pickerYear}`} aria-pressed={key === month} className={key === month ? styles.monthSelected : styles.monthCell} onClick={() => { onMonthChange(key); close() }}>{name.slice(0, 3)}</button>
        })}</div>
      </div>}
    </div>
    <div className={styles.headerActions}>
      <button type="button" className={styles.action} disabled={!loaded} onClick={() => onAdd('expense')}><FinanceIcon name="plus" width="18" height="18" />Ausgabe</button>
      <button type="button" className={styles.secondaryAction} disabled={!loaded} onClick={() => onAdd('income')}><FinanceIcon name="plus" width="18" height="18" />Einkommen</button>
    </div>
    {children}
  </header>
}
