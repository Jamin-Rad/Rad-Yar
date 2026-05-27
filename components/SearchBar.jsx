'use client'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './SearchBar.module.css'

const fachgebiete = [
  'Neuroradiologie', 'Thorax', 'Abdomen', 'Muskuloskelettales',
  'Hals', 'Brust', 'Becken', 'Technik & Physik',
]

const topics = [
  'Anatomie', 'Pathologie', 'Befundlehre', 'Normalbefunde', 'Modalitäten',
  'Fallbeispiele', 'MCQs', 'Differenzialdiagnosen', 'Bildanalyse',
  'Prüfungsfragen', 'Schwerpunktthemen', 'Timed Tests', 'Fehleranalyse',
]

export default function SearchBar({ onClose }) {
  const { texts } = useLanguage()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const allItems = [
    ...fachgebiete.map((f) => ({ label: f, type: 'Fachgebiet' })),
    ...topics.map((t) => ({ label: t, type: 'Thema' })),
  ]

  const results = query.trim().length > 0
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Search input */}
        <div className={styles.inputRow}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.searchIcon}>
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder={texts.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.escBtn} onClick={onClose}>ESC</button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className={styles.results}>
            {results.map((item) => (
              <div key={item.label} className={styles.resultItem} onClick={onClose}>
                <span className={styles.resultLabel}>{item.label}</span>
                <span className={styles.resultType}>{item.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim().length > 0 && results.length === 0 && (
          <div className={styles.empty}>Kein Ergebnis für „{query}"</div>
        )}

        {/* Suggestions when empty */}
        {query.trim().length === 0 && (
          <div className={styles.suggestions}>
            <div className={styles.suggestLabel}>Fachgebiete</div>
            <div className={styles.chips}>
              {fachgebiete.map((f) => (
                <span key={f} className={styles.chip} onClick={onClose}>{f}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
