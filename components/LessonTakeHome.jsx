'use client'

import { useState } from 'react'
import styles from './LessonTemplate.module.css'

const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

// The maintained Test page and actual lessons use the very same summary rows.
export default function LessonTakeHome({ points, lang, idPrefix }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  const toggleItem = index => setOpenItems(previous => {
    const next = new Set(previous)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })

  return <ol className={styles.takeHome}>{points.map((point, index) => {
    const open = openItems.has(index)
    const genericTitle = /^(?:Regel|Rule|قاعده[ٔ‌]*)\s*[0-9۰-۹٠-٩]+[.:]?$/iu.test(String(pick(point.title, lang)).trim())
    if (genericTitle && point.detail) return <li key={index}><div className={styles.takeHomeStatic}><span className={styles.takeHomePriority}>{String(index + 1).padStart(2, '0')}</span><strong>{pick(point.detail, lang)}</strong></div></li>
    if (!point.detail || pick(point.detail, lang) === pick(point.title, lang)) return <li key={index}><div className={styles.takeHomeStatic}><span className={styles.takeHomePriority}>{String(index + 1).padStart(2, '0')}</span><strong>{pick(point.title, lang)}</strong></div></li>
    const detailId = idPrefix + '-detail-' + index
    return <li key={index} className={open ? styles.takeHomeItemOpen : ''}>
      <button type="button" aria-expanded={open} aria-controls={detailId} onClick={() => toggleItem(index)}>
        <span className={styles.takeHomePriority}>{String(index + 1).padStart(2, '0')}</span>
        <strong>{pick(point.title, lang)}</strong>
        <i aria-hidden="true">{open ? '−' : '+'}</i>
      </button>
      <div id={detailId} hidden={!open} className={styles.takeHomeDetail}>
        <p>{pick(point.detail, lang)}</p>
      </div>
    </li>
  })}</ol>
}
