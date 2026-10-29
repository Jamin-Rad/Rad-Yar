import { useEffect, useRef } from 'react'
import Icon from './TimerIcon'
import styles from './timer.module.css'
export default function TimerDialog({ title, children, onClose, busy = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    ref.current.showModal()
    ref.current.querySelector('input')?.focus()
    return () => { if (previous instanceof HTMLElement && previous.isConnected) previous.focus() }
  }, [])
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="timer-dialog-title" onCancel={event => { event.preventDefault(); if (!busy) onClose() }}>
    <header><h2 id="timer-dialog-title">{title}</h2><button type="button" aria-label="Fenster schließen" onClick={onClose} disabled={busy}><Icon name="close"/></button></header>{children}
  </dialog>
}
