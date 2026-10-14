'use client'

import { useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function CalendarDay({ day, events, markers, duty, formatEventMeta, onClose, onAdd, onEdit, onToggle }) {
  const dialog = useRef(null)
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.querySelector('button')?.focus()
    function handleKey(event) {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab') return
      const buttons = [...dialog.current.querySelectorAll('button:not(:disabled)')]
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [onClose])

  const date = new Date(`${day}T12:00:00`)
  const heading = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
  const weekday = new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(date)
  return (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
      <section ref={dialog} className={`${styles.detailModal} ${styles.dayModal}`} role="dialog" aria-modal="true" aria-labelledby="calendar-day-title" onMouseDown={event => event.stopPropagation()}>
        <header className={styles.modalHeader}>
          <div><span className={styles.kicker}>{weekday}</span><h2 id="calendar-day-title">{heading}</h2></div>
          <button type="button" className={styles.modalClose} aria-label="Tagesansicht schließen" onClick={onClose}>×</button>
        </header>
        <div className={styles.dayBody}>
          {(duty || markers.length > 0) && <div className={styles.dayMarkers}>
            {duty && <span className={styles.workBadge}>{duty}</span>}
            {markers.map(marker => <span key={marker.id} className={marker.itemType === 'schoolHoliday' ? styles.monthSchoolHoliday : styles.monthHoliday}>{marker.title}</span>)}
          </div>}
          <div className={styles.dayList}>
            {events.length ? events.map(event => <div key={event.id} className={`${styles.dayEvent} ${event.cancelled ? styles.dayCancelled : ''}`}>
              <button type="button" className={styles.dayEventDetails} onClick={() => onEdit(event)} aria-label={`${event.title}: Termin bearbeiten`}>
                {!event.cancelled && <span className={styles.dayTime}>{formatEventMeta(event)}</span>}
                <strong>{event.title}</strong>
                {!event.cancelled && event.note && <span className={styles.dayNote}>{event.note}</span>}
              </button>
              {!event.cancelled && <button type="button" className={`${styles.eventCheck} ${event.done ? styles.eventCheckDone : ''}`} aria-label={`${event.title}: ${event.done ? 'Wieder öffnen' : 'Als erledigt markieren'}`} aria-pressed={Boolean(event.done)} onClick={() => onToggle(event)}>{event.done ? '✓' : ''}</button>}
            </div>) : <p className={styles.dayEmpty}>Keine Termine an diesem Tag.</p>}
          </div>
        </div>
        <footer className={styles.dayFooter}><button type="button" className={styles.dayAdd} onClick={() => onAdd(day)}>+ Neuer Termin</button></footer>
      </section>
    </div>
  )
}
