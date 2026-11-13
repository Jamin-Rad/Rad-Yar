'use client'

import { useId, useState } from 'react'
import { money, percent } from '@/lib/investments/portfolio.mjs'
import styles from './AllocationRing.module.css'

export default function AllocationRing({ groups, children, className }) {
  const gradientId = useId()
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

  function onKeyDown(event, key) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle(key)
    } else if (event.key === 'Escape') {
      event.stopPropagation()
      setHovered(null)
      setFocused(null)
      setSelected(null)
    }
  }

  return <div className={`${className} ${styles.ring}`}>
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
          aria-label={`${group.label}، ${money(group.valueCents)}، ${percent(group.share * 100)} از سبد`}
          onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(group.key) }}
          onPointerLeave={() => setHovered(null)}
          onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setFocused(group.key) }}
          onBlur={() => setFocused(null)}
          onClick={() => toggle(group.key)} onKeyDown={event => onKeyDown(event, group.key)}
        />)}
      </g>
    </svg>
    <div className={styles.center}>{children}</div>
    {active && <div className={styles.tooltip} aria-hidden="true">
      <strong><i style={{background: active.color}} />{active.label}</strong>
      <div><bdi>{money(active.valueCents)}</bdi><bdi>{percent(active.share * 100)}</bdi></div>
    </div>}
  </div>
}
