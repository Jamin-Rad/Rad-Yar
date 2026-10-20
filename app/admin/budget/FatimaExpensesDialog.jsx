'use client'

import { useEffect, useId, useMemo, useRef } from 'react'
import detailStyles from './CategoryDetail.module.css'
import styles from './FatimaExpenseDetails.module.css'

const money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

export default function FatimaExpensesDialog({ entries, month, onClose }) {
  const dialog = useRef(null)
  const titleId = useId()
  const expenses = useMemo(() => entries.filter(entry => entry.type === 'expense' && entry.paidByFatima)
    .sort((a, b) => (b.date || '').localeCompare(a.date || '')), [entries])
  const total = expenses.reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  const monthLabel = new Date(`${month}-01T12:00:00`).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => { if (element.open) element.close() }
  }, [])

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => { if (!dialog.current?.open) onClose() }} onKeyDown={event => {
    // This read-only dialog has a single interactive control.
    if (event.key === 'Tab') {
      event.preventDefault()
      dialog.current.querySelector('button')?.focus()
    }
  }} onClick={event => {
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current.close()
    }
  }}>
    <div className={styles.layout}>
      <header className={detailStyles.header}>
        <div className={detailStyles.heading}>
          <p className={detailStyles.month}>{monthLabel}</p>
          <h2 id={titleId} className={detailStyles.title}>Von Fatima bezahlt</h2>
          <p className={detailStyles.total}>{money.format(total)}</p>
        </div>
        <button type="button" className={detailStyles.close} onClick={() => dialog.current.close()} aria-label="Schließen" autoFocus>×</button>
      </header>
      <div className={detailStyles.body}>
        {expenses.length === 0 ? <p className={detailStyles.empty}>Für diesen Monat wurden keine Ausgaben als von Fatima bezahlt markiert.</p> : <ul className={styles.list}>
          {expenses.map(entry => <li key={entry.id} className={styles.row}>
            <div className={styles.info}>
              <strong dir="auto">{entry.title || entry.subtitle || entry.category || 'Ausgabe'}</strong>
              <span>{entry.date ? new Date(`${entry.date}T12:00:00`).toLocaleDateString('de-DE') : 'Ohne Datum'} · {entry.category || 'Ohne Kategorie'}</span>
              {entry.description ? <span dir="auto">{entry.description}</span> : null}
            </div>
            <strong className={styles.money}>{money.format(Number(entry.amount || 0))}</strong>
          </li>)}
        </ul>}
      </div>
    </div>
  </dialog>
}
