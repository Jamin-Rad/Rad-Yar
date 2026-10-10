'use client'

import { useRef, useState } from 'react'
import styles from './InteractiveTeachingGroups.module.css'

const identity = value => value

function InteractiveTeachingGroup({ group, resolve, direction, renderVisual }) {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef([])
  const prefix = `teaching-${group.id}`

  const handleKeyDown = (event, current) => {
    let next
    if (event.key === 'ArrowDown') next = (current + 1) % group.items.length
    else if (event.key === 'ArrowUp') next = (current - 1 + group.items.length) % group.items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = group.items.length - 1
    else return

    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return <section className={`${styles.group} ${group.tone === 'secondary' ? styles.secondary : ''}`} aria-labelledby={`${prefix}-heading`}>
    <header className={styles.groupHeader}>
      <span aria-hidden="true" />
      <h3 id={`${prefix}-heading`}>{resolve(group.title)}</h3>
    </header>
    <p className={styles.intro}>{resolve(group.intro)}</p>
    <div className={styles.explorer} dir="ltr">
      <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-label={resolve(group.title)} dir={direction}>
        {group.items.map((item, index) => <button
          key={item.id}
          ref={node => { tabRefs.current[index] = node }}
          type="button"
          role="tab"
          id={`${prefix}-${item.id}-tab`}
          aria-controls={`${prefix}-${item.id}-panel`}
          aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1}
          onClick={() => setSelected(index)}
          onKeyDown={event => handleKeyDown(event, index)}
        ><span>{resolve(item.label)}</span><i aria-hidden="true">→</i></button>)}
      </div>
      <div className={styles.panels} dir={direction}>
        {group.items.map((item, index) => {
          const visual = renderVisual?.(item, group)
          return <div
            key={item.id}
            className={`${styles.panel} ${visual ? styles.panelWithVisual : ''}`}
            id={`${prefix}-${item.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${prefix}-${item.id}-tab`}
            tabIndex={0}
            hidden={selected !== index}
          >
            <div className={styles.panelCopy}>
              <span className={styles.category}>{resolve(item.category)}</span>
              <h4>{resolve(item.label)}</h4>
              {item.text ? <p>{resolve(item.text)}</p> : null}
              {item.details ? <dl className={styles.detailList}>{item.details.map(detail => <div key={detail.id}><dt>{resolve(detail.label)}</dt><dd>{resolve(detail.text)}</dd></div>)}</dl> : null}
            </div>
            {visual ? <div className={styles.panelVisual}>{visual}</div> : null}
          </div>
        })}
      </div>
    </div>
    {group.note ? <p className={styles.note}><strong>{resolve(group.noteTitle)}</strong>{resolve(group.note)}</p> : null}
  </section>
}

export default function InteractiveTeachingGroups({ groups, resolve = identity, direction = 'ltr', renderVisual }) {
  return <div className={styles.lesson} dir={direction}>
    {groups.map(group => <InteractiveTeachingGroup key={group.id} group={group} resolve={resolve} direction={direction} renderVisual={renderVisual} />)}
  </div>
}
