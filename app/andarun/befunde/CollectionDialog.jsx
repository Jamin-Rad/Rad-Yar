'use client'
import { useEffect, useRef } from 'react'
import styles from './collection.module.css'

export default function CollectionDialog({ children, labelId, onClose, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    ref.current?.showModal()
    ref.current?.querySelector('[data-autofocus]')?.focus()
    return () => { if (previous instanceof HTMLElement && previous.isConnected) previous.focus() }
  }, [])
  return <dialog ref={ref} className={`${styles.dialog} ${className}`} aria-labelledby={labelId} onCancel={event => { event.preventDefault(); onClose() }}>{children}</dialog>
}
