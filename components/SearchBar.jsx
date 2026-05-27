'use client'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './SearchBar.module.css'

const FACH_KEYS = ['Neuroradiologie','Thorax','Abdomen','Muskuloskelettales','Hals','Brust','Becken','Technik & Physik']
const TOPICS_DE = ['Anatomie','Pathologie','Befundlehre','Normalbefunde','Modalitäten','Fallbeispiele','MCQs','Differenzialdiagnosen','Bildanalyse','Prüfungsfragen','Schwerpunktthemen','Timed Tests','Fehleranalyse']

export default function SearchBar({ onClose }) {
  const { texts } = useLanguage()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const fachLabels = FACH_KEYS.map(k => ({ label: texts.fachNames[k], type: texts.section2Label, key: k }))
  const topicLabels = TOPICS_DE.map(t => ({ label: t, type: 'Thema', key: t }))
  const all = [...fachLabels, ...topicLabels]

  const results = query.trim().length > 0
    ? all.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.icon}>
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input ref={inputRef} className={styles.input} placeholder={texts.searchPlaceholder} value={query} onChange={e => setQuery(e.target.value)} />
          <button className={styles.escBtn} onClick={onClose}>ESC</button>
        </div>

        {results.length > 0 && (
          <div className={styles.results}>
            {results.map(item => (
              <div key={item.key} className={styles.resultItem} onClick={onClose}>
                <span className={styles.resultLabel}>{item.label}</span>
                <span className={styles.resultType}>{item.type}</span>
              </div>
            ))}
          </div>
        )}

        {query.trim().length > 0 && results.length === 0 && (
          <div className={styles.empty}>„{query}" – {texts.section2Label === 'تخصص‌ها' ? 'نتیجه‌ای یافت نشد' : 'Kein Ergebnis'}</div>
        )}

        {query.trim().length === 0 && (
          <div className={styles.suggestions}>
            <div className={styles.suggestLabel}>{texts.section2Label}</div>
            <div className={styles.chips}>
              {FACH_KEYS.map(k => (
                <span key={k} className={styles.chip} onClick={onClose}>{texts.fachNames[k]}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
