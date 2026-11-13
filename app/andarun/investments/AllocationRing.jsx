'use client'

import { useId, useState } from 'react'
import { money, percent } from '@/lib/investments/portfolio.mjs'
import styles from './AllocationRing.module.css'

export default function AllocationRing({ groups, children, className, onOpenHolding }) {
  const gradientId = useId()
  const detailsId = gradientId + '-details'
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [selected, setSelected] = useState(null)
  const active = groups.find(group => group.key === (hovered ?? focused ?? selected))
  let offset = 0
  const segments = groups.map(group => {
    const start = offset
    offset += group.share * 100
    const gap = groups.length === 1 ? 0 : Math.min(0.7, group.share * 30)
    return {
      ...group,
      arc: {
        cx: 100, cy: 100, r: 81, fill: 'none', pathLength: 100, strokeWidth: 30,
        strokeDasharray: (group.share * 100 - gap) + ' 100',
        strokeDashoffset: -start,
        transform: 'rotate(-90 100 100)',
      },
    }
  })

  function toggle(key) {
    setSelected(previous => previous === key ? null : key)
  }

  function dismiss() {
    setHovered(null)
    setFocused(null)
    setSelected(null)
  }

  return <div className={`${className} ${styles.ring}`}
    onPointerLeave={() => setHovered(null)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null) }}
    onKeyDown={event => {
      if (event.key !== 'Escape' || !active) return
      event.stopPropagation()
      if (event.target.closest('[id]')?.id === detailsId) {
        event.currentTarget.querySelector('[data-active="true"]')?.focus()
      }
      dismiss()
    }}>
    <svg viewBox="0 0 200 200" role="group" aria-label="نمودار ترکیب سبد">
      <defs>
        {segments.map(group => <linearGradient key={group.key} id={gradientId + group.key} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={`color-mix(in srgb, ${group.color}, white 24%)`} />
          <stop offset="100%" stopColor={group.color} />
        </linearGradient>)}
      </defs>
      <g transform="translate(0 31) scale(1 .74)" aria-hidden="true" className={styles.depth}>
        {segments.map(group => <circle key={group.key} {...group.arc} stroke={group.color} />)}
      </g>
      <g transform="translate(0 20) scale(1 .74)">
        {segments.map(group => <circle key={group.key} {...group.arc}
          stroke={`url(#${gradientId + group.key})`}
          className={styles.segment} data-active={active?.key === group.key}
          role="button" tabIndex={0} aria-pressed={selected === group.key}
          aria-controls={active?.key === group.key ? detailsId : undefined}
          aria-label={`${group.label}، ${money(group.valueCents)}، ${percent(group.share * 100)} از سبد`}
          onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(group.key) }}
          onFocus={event => setFocused(event.currentTarget.matches(':focus-visible') ? group.key : null)}
          onClick={() => toggle(group.key)} onKeyDown={event => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            toggle(group.key)
          }}
        />)}
      </g>
    </svg>
    <div className={styles.center}>{children}</div>
    {active && <div id={detailsId} className={styles.tooltip} role="region" aria-label={`دارایی‌های ${active.label}`} tabIndex={0}>
      <div className={styles.detailHeader}>
        <strong><i style={{background: active.color}} />{active.label}</strong>
        <bdi>{money(active.valueCents)}</bdi><bdi>{percent(active.share * 100)}</bdi>
      </div>
      <table className={styles.holdings}>
        <thead><tr><th scope="col">دارایی</th><th scope="col">ارزش</th><th scope="col">از کل سبد</th></tr></thead>
        <tbody>{active.holdings.map(holding => <tr key={holding.key}>
          <th scope="row">
            <button type="button" className={styles.holdingLink} onClick={() => onOpenHolding(holding)}>
              <bdi>{holding.name}</bdi>
            </button>
          </th>
          <td><bdi>{money(holding.valueCents)}</bdi></td>
          <td><bdi>{percent(holding.share * 100)}</bdi></td>
        </tr>)}</tbody>
      </table>
    </div>}
  </div>
}
