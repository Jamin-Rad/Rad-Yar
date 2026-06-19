'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import styles from './SearchBar.module.css'

const T = {
  de: { placeholder: 'Thema suchen…', noResult: 'Kein Ergebnis für', sections: 'Fachgebiete', lesson: 'Lektion', mcq: 'Quiz', flash: 'Flashcards' },
  en: { placeholder: 'Search topic…', noResult: 'No result for', sections: 'Specialties', lesson: 'Lesson', mcq: 'Quiz', flash: 'Flashcards' },
  fa: { placeholder: 'جستجوی موضوع…', noResult: 'نتیجه‌ای برای', sections: 'تخصص‌ها', lesson: 'درس', mcq: 'کوییز', flash: 'فلش‌کارت' },
}

function buildIndex(lang) {
  const items = []
  for (const fach of CURRICULUM) {
    const fachTitle = getFachTitle(fach, lang)
    for (const kapitel of fach.kapitel) {
      const kapitelTitle = getKapitelTitle(kapitel, lang)
      for (const th of kapitel.themen || []) {
        if (!th.link && !th.mcqLink && !th.flashcardLink) continue
        items.push({
          id: th.id,
          title: getThemaTitle(th, lang),
          kapitel: kapitelTitle,
          fach: fachTitle,
          fachId: fach.id,
          fachColor: fach.color,
          link: th.link || null,
          mcqLink: th.mcqLink || null,
          flashcardLink: th.flashcardLink || null,
          tags: th.tags || [],
        })
      }
    }
  }
  return items
}

function highlight(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchBar({ onClose }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const index = useMemo(() => buildIndex(lang), [lang])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    return index
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.kapitel.toLowerCase().includes(q) ||
        item.fach.toLowerCase().includes(q)
      )
      .slice(0, 12)
  }, [query, index])

  useEffect(() => { setActive(0) }, [results])

  useEffect(() => {
    inputRef.current?.focus()
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const navigate = useCallback((item) => {
    const href = lang === 'de' ? item.link : `${item.link}?lang=${lang}`
    router.push(href)
    onClose()
  }, [router, lang, onClose])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[active]?.link) { navigate(results[active]) }
  }

  const q = query.trim()

  const fachChips = useMemo(() =>
    CURRICULUM.map(f => ({ id: f.id, title: getFachTitle(f, lang), color: f.color, link: `/lernen/${f.id}` }))
  , [lang])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t.placeholder}>
        <div className={styles.inputRow}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.icon}>
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder={t.placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
          />
          <button className={styles.escBtn} onClick={onClose}>ESC</button>
        </div>

        {q.length > 0 && results.length === 0 && (
          <div className={styles.empty}>{t.noResult} „{query}"</div>
        )}

        {results.length > 0 && (
          <ul className={styles.results} ref={listRef} role="listbox">
            {results.map((item, i) => (
              <li
                key={item.id}
                className={`${styles.resultItem} ${i === active ? styles.resultItemActive : ''}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => item.link && navigate(item)}
              >
                <div className={styles.resultMain}>
                  <span className={styles.resultDot} style={{ background: item.fachColor }} />
                  <div className={styles.resultText}>
                    <span className={styles.resultTitle}>{highlight(item.title, query.trim())}</span>
                    <span className={styles.resultBreadcrumb}>{item.fach} · {item.kapitel}</span>
                  </div>
                  {item.tags.length > 0 && (
                    <div className={styles.resultTags}>
                      {item.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
                <div className={styles.resultActions}>
                  {item.link && <span className={styles.actionBtn}>{t.lesson} →</span>}
                  {item.mcqLink && (
                    <span className={styles.actionBtn} onClick={e => { e.stopPropagation(); router.push(item.mcqLink); onClose() }}>
                      {t.mcq}
                    </span>
                  )}
                  {item.flashcardLink && (
                    <span className={styles.actionBtn} onClick={e => { e.stopPropagation(); router.push(item.flashcardLink); onClose() }}>
                      {t.flash}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {q.length === 0 && (
          <div className={styles.suggestions}>
            <div className={styles.suggestLabel}>{t.sections}</div>
            <div className={styles.chips}>
              {fachChips.map(f => (
                <button
                  key={f.id}
                  className={styles.chip}
                  style={{ '--chip-color': f.color }}
                  onClick={() => { router.push(f.link); onClose() }}
                >
                  {f.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
