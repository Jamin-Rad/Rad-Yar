'use client'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import LegacyPlan from './TagesplanClient'
import styles from './wizard.module.css'

const LIBRARY_KEY = 'mobin_planner_activities_v1'
const PLAN_KEY = 'mobin_planner_days_v1'
const defaults = [
  ['Känguru', 'focus'], ['Mathe', 'focus'], ['Englisch', 'focus'],
  ['Latein', 'focus'], ['Biologie', 'focus'], ['Persisch', 'focus'],
  ['Sport', 'focus'], ['Netflix', 'pause'], ['Handyspiele', 'pause'],
  ['Programmieren', 'pause'], ['Freie Pause', 'pause'],
].map(([name, group], id) => ({ name, group, id: String(id) }))

function ActivityIcon({ id }) {
  const position = defaults.some(activity => activity.id === id) ? Number(id) * 10 + '%' : null
  return position ? <i className={styles.activityIcon} style={{ backgroundPositionX: position }} aria-hidden="true" /> : null
}

const groupNames = { focus: 'Fokus', pause: 'Pause' }
const sum = blocks => blocks.reduce((total, block) => total + block.units, 0)
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const minutes = units => units * 5
const duration = units => {
  const value = minutes(units)
  return [Math.floor(value / 60) && Math.floor(value / 60) + ' Std.', value % 60 && value % 60 + ' Min.'].filter(Boolean).join(' ') || '0 Min.'
}
const clock = value => String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0')
const day = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

function distribute(blocks, budget) {
  if (!blocks.length) return []
  const extras = budget - blocks.length
  const weight = sum(blocks)
  let cumulative = 0
  let assigned = 0
  return blocks.map(block => {
    cumulative += block.units
    const next = Math.round(extras * cumulative / weight)
    const units = 1 + next - assigned
    assigned = next
    return { ...block, units }
  })
}

function shuffle(blocks) {
  const result = [...blocks]
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

function alternate(blocks) {
  const focus = shuffle(blocks.filter(block => block.group === 'focus'))
  const pause = shuffle(blocks.filter(block => block.group === 'pause'))
  if (!focus.length || !pause.length) return shuffle(blocks)
  for (const [group, minimum] of [[focus, pause.length], [pause, focus.length - 1]]) {
    while (group.length < minimum) {
      const longest = group.reduce((best, block, index) => block.units > group[best].units ? index : best, 0)
      const block = group[longest]
      if (block.units < 2) return null
      const units = Math.floor(block.units / 2)
      group.splice(longest, 1, { ...block, units }, { ...block, units: block.units - units, activityId: block.activityId ?? block.id, id: crypto.randomUUID() })
    }
  }
  return focus.flatMap((block, index) => pause[index] ? [block, pause[index]] : [block])
}

export default function PlannerWizard() {
  const [step, setStep] = useState(null)
  const [library, setLibrary] = useState(defaults)
  const [start, setStart] = useState('12:00')
  const [total, setTotal] = useState(36)
  const [selected, setSelected] = useState([])
  const [groups, setGroups] = useState({ focus: [], pause: [] })
  const [order, setOrder] = useState([])
  const [mode, setMode] = useState('manual')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const savedDate = useRef(null)
  const [message, setMessage] = useState('')
  const [legacy, setLegacy] = useState(false)
  const [over, setOver] = useState(false)
  const heading = useRef(null)
  const drag = useRef(null)
  const startMinutes = start.split(':').reduce((hours, value) => hours * 60 + Number(value), 0)
  const end = clock(startMinutes + minutes(total))
  const max = Math.min(72, Math.floor((1440 - startMinutes) / 5))
  const focus = sum(groups.focus)

  useEffect(() => {
    setLibrary(read(LIBRARY_KEY, defaults))
    savedDate.current = day()
    const today = read(PLAN_KEY, {})[savedDate.current] ?? null
    setSaved(today)
    setActiveIndex(today?.blocks.findIndex(block => (block.done ?? 0) < block.units) ?? 0)
    setStep(today?.blocks.length ? 4 : 0)
  }, [])

  function go(next) {
    setMessage('')
    setStep(next)
    requestAnimationFrame(() => heading.current?.focus())
  }

  function add(id) {
    if (library.some(activity => activity.id === id)) {
      setSelected(current => current.includes(id) ? current : [...current, id])
    }
  }

  function allocate() {
    const activities = selected.map(id => library.find(item => item.id === id)).filter(Boolean)
    if (activities.length > total) {
      setMessage('Wähle weniger Aktivitäten oder verlängere deine Planungszeit.')
      return
    }
    const make = group => activities.filter(item => item.group === group).map(item => ({ ...item, units: 1 }))
    const focusBlocks = make('focus')
    const pauseBlocks = make('pause')
    const budget = focusBlocks.length && pauseBlocks.length
      ? clamp(Math.round(total * 2 / 3), focusBlocks.length, total - pauseBlocks.length)
      : focusBlocks.length ? total : 0
    setGroups({ focus: distribute(focusBlocks, budget), pause: distribute(pauseBlocks, total - budget) })
    go(2)
  }

  function changeBudget(nextTotal, nextFocus) {
    setTotal(nextTotal)
    setGroups({
      focus: distribute(groups.focus, nextFocus),
      pause: distribute(groups.pause, nextTotal - nextFocus),
    })
  }

  function transfer(group, index, next) {
    setGroups(current => {
      const blocks = current[group]
      const pair = blocks[index].units + blocks[index + 1].units
      const first = clamp(next, 1, pair - 1)
      return { ...current, [group]: blocks.map((block, position) => {
        if (position === index) return { ...block, units: first }
        if (position === index + 1) return { ...block, units: pair - first }
        return block
      }) }
    })
  }

  function split(group, index) {
    const block = groups[group][index]
    const first = Math.floor(block.units / 2)
    const parts = [{ ...block, units: first }, { ...block, activityId: block.activityId ?? block.id, id: crypto.randomUUID(), units: block.units - first }]
    setGroups({ ...groups, [group]: groups[group].flatMap((item, position) => position === index ? parts : [item]) })
  }

  function create() {
    const blocks = [...groups.focus, ...groups.pause]
    const sequence = mode === 'shuffle' ? alternate(blocks) : blocks
    if (!sequence) {
      setMessage('Für einen Wechsel braucht eine Gruppe mehr Zeit zum Teilen. Passe die Aufteilung oben an.')
      return
    }
    setOrder(sequence)
    go(3)
  }

  function move(from, to) {
    if (from === to || from < 0 || to < 0 || to >= order.length || from >= order.length) return
    setOrder(current => {
      const next = [...current]
      next.splice(to, 0, next.splice(from, 1)[0])
      return next
    })
  }

  function save() {
    const plan = { start, blocks: order }
    const date = day()
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify({ ...read(PLAN_KEY, {}), [date]: plan }))
      setSaved(plan)
      savedDate.current = date
      setActiveIndex(0)
      go(4)
    } catch { setMessage('Dein Plan konnte nicht gespeichert werden.') }
  }

  function updateProgress(id, done) {
    const blocks = saved.blocks.map(block => block.id === id
      ? { ...block, done: clamp(done, 0, block.units) }
      : block)
    const plan = { ...saved, blocks }
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify({ ...read(PLAN_KEY, {}), [savedDate.current]: plan }))
      setSaved(plan)
      setMessage('')
    } catch { setMessage('Der Fortschritt konnte nicht gespeichert werden.') }
  }

  function newPlan() {
    setStart('12:00')
    setTotal(36)
    setSelected([])
    setGroups({ focus: [], pause: [] })
    setOrder([])
    setMode('manual')
    setEditing(false)
    go(0)
  }

  function updateLibrary(next) {
    try {
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(next))
      setLibrary(next)
    } catch { setMessage('Die Aktivitäten konnten nicht gespeichert werden.') }
  }

  if (legacy) return <><button className={styles.legacyBack} onClick={() => setLegacy(false)}>Zum neuen Planer</button><LegacyPlan /></>

  if (step === null) return <main className={styles.shell} aria-busy="true" />

  const savedBlocks = saved?.blocks ?? []
  const viewedIndex = activeIndex < 0 ? savedBlocks.length - 1 : activeIndex
  const viewed = savedBlocks[viewedIndex]
  const completed = savedBlocks.filter(block => (block.done ?? 0) === block.units).length
  const progress = savedBlocks.reduce((value, block) => value + (block.done ?? 0), 0)
  let savedCursor = saved?.start.split(':').reduce((hours, value) => hours * 60 + Number(value), 0)
  let cursor = startMinutes
  return <main className={styles.shell}>
    <div className={styles.wrap}>
      <header className={styles.header}>
        {step > 0 && step < 4 ? <button className={styles.brand} onClick={() => go(step - 1)}>← <b>Mobin</b></button> : <Link className={styles.brand} href="/mobin">← <b>Mobin</b></Link>}
        {step < 4 && <ol className={styles.steps}>{(step === 3 ? ['Zeit', 'Aktivitäten', 'Aufteilen', 'Dein Plan'] : ['Zeit', 'Aktivitäten', 'Aufteilen']).map((label, index) =>
          <li key={label} aria-current={step === index ? 'step' : undefined} data-done={step >= index}>{label}</li>)}</ol>}
        <Link href="/mobin" aria-label="Planer schließen" className={styles.close}>×</Link>
      </header>

      <section className={styles.stage} data-step={step} key={step}>
        <img className={styles.art} src="/mobin/planner-reference-clock.webp" alt="" />
        {step === 0 && <>
          <h1 tabIndex={-1} ref={heading}>Hey Mobin!</h1>
          <p className={styles.lead}>Lass uns deinen Tag planen.</p>
          <div className={styles.timeSetup}>
            <label className={styles.start}>Startzeit<span aria-hidden="true">{clock((startMinutes + 1380) % 1440)}</span>
              <input type="time" required value={start} max="23:30" onChange={event => {
                const value = event.target.value
                if (!value || value > '23:30') return
                const [hour, minute] = value.split(':').map(Number)
                setStart(value)
                setTotal(current => Math.min(current, Math.floor((1440 - hour * 60 - minute) / 5)))
              }} /><span aria-hidden="true">{clock((startMinutes + 60) % 1440)}</span>
            </label>
            <div className={styles.timeGraph}>
              <label htmlFor="first-duration">Wie viel Zeit hast du heute?</label>
              <strong>{total % 12 === 0 ? total / 12 + (total === 12 ? ' Stunde' : ' Stunden') : duration(total)}</strong>
              <input id="first-duration" className={styles.range} type="range" min="6" max={max} value={total} aria-valuetext={duration(total)} style={{ '--fill': (max === 6 ? 100 : (total - 6) / (max - 6) * 100) + '%' }} onChange={event => setTotal(Number(event.target.value))} />
              <div className={styles.scale}>{Array.from({ length: Math.floor(max / 12) + 1 }, (_, index) => <span key={index} style={{ '--tick': (index === 0 ? 0 : (index * 12 - 6) / Math.max(1, max - 6) * 100) + '%' }}>{index === 0 ? '30 Min.' : index + ' Std.'}</span>)}</div><p className={styles.sliderHint}>Zieh den Regler für deine Planungszeit</p>
              <p>Fertig um <b>{end}</b></p>
            </div>
          </div>
          <button className={styles.primary} onClick={() => go(1)}>Weiter zu den Aktivitäten →</button>
          <div className={styles.secondaryActions}>
            {saved && <button onClick={() => go(4)}>Heutigen Plan öffnen</button>}
            <button onClick={() => setLegacy(true)}>Ziele & bisherige Einträge</button>
          </div>
        </>}

        {step === 1 && <>
          <h1 className={styles.compact} tabIndex={-1} ref={heading}>Was möchtest du heute machen?</h1>
          <p className={styles.lead}>Zieh deine Aktivitäten in deinen Tageskorb.</p>
          <div className={styles.basketHeader}>
            <span className={styles.pill}>Heute · {start}–{end} · {duration(total)}</span>
            <button className={styles.pill} onClick={() => setEditing(!editing)} aria-expanded={editing}>Aktivitäten bearbeiten</button>
          </div>
          {editing ? <form className={styles.editor} onSubmit={event => {
            event.preventDefault()
            const fields = new FormData(event.currentTarget)
            const next = library.map(item => ({ ...item, name: String(fields.get(item.id)).trim() || item.name }))
            const name = String(fields.get('new-name')).trim()
            if (name) next.push({ name, group: fields.get('new-group'), id: crypto.randomUUID() })
            updateLibrary(next)
            setEditing(false)
          }}>
            {library.map(item => <label key={item.id}>{groupNames[item.group]}<input name={item.id} aria-label={item.name} defaultValue={item.name} maxLength={36} /></label>)}
            <label>Neue Aktivität<input name="new-name" maxLength={36} /></label>
            <label>Gruppe<select name="new-group"><option value="focus">Fokus</option><option value="pause">Pause</option></select></label>
            <button className={styles.pill}>Liste speichern</button>
          </form> : <>
            <div className={styles.catalog}>{Object.entries(groupNames).map(([group, label]) => <section key={group} className={styles.catalogGroup} data-group={group}><h2>{label}</h2><div className={styles.tokens}>{library.filter(item => item.group === group).map(item => <button key={item.id} type="button" draggable
              onDragStart={event => { event.dataTransfer.setData('text/plain', item.id); event.dataTransfer.effectAllowed = 'copy' }}
              onClick={() => add(item.id)} className={styles.token} data-group={item.group} aria-pressed={selected.includes(item.id)}><ActivityIcon id={item.id} />{item.name}</button>)}</div></section>)}</div>
            <div className={styles.basket} data-over={over} onDragOver={event => { event.preventDefault(); setOver(true) }}
              onDragLeave={event => { if (!(event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget))) setOver(false) }}
              onDrop={event => { event.preventDefault(); setOver(false); add(event.dataTransfer.getData('text/plain')) }}>
              <img src="/mobin/planner-reference-basket.webp" alt="" />
              <div className={styles.basketContent}>{selected.map(id => {
                const item = library.find(activity => activity.id === id)
                return item && <button key={id} className={styles.token} data-group={item.group} aria-label={item.name + ' entfernen'}
                  onClick={() => setSelected(current => current.filter(value => value !== id))}><ActivityIcon id={item.id} />{item.name}</button>
              })}</div>
              <span className={styles.basketBadge} aria-live="polite">{selected.length ? selected.length + ' ausgewählt' : 'Hier ablegen'}</span>
            </div>
            <button className={styles.primary} disabled={!selected.length} onClick={allocate}>Weiter zur Aufteilung →</button>
          </>}
        </>}

        {step === 2 && <>
          <h1 className={styles.compact} tabIndex={-1} ref={heading}>Verteile deine Zeit.</h1>
          <p className={styles.lead}>Zieh die Grenzen – dein Plan bleibt im Gleichgewicht.</p>
          <div className={styles.towers}>{Object.entries(groups).map(([group, blocks]) =>
            <section key={group} className={styles.tower} data-group={group}>
              <h2>{groupNames[group]} · {minutes(sum(blocks))} Min.</h2>
              <div className={styles.blocks} data-count={blocks.length}>{blocks.length ? blocks.map((block, index) =>
                <Fragment key={block.id}>
                  <div className={styles.block} style={{ flexGrow: block.units }}>
                    <strong><ActivityIcon id={block.activityId ?? block.id} />{block.name}</strong>
                    <span>{minutes(block.units)} Min.</span>
                    {block.units >= 2 && <button type="button" onClick={() => split(group, index)} aria-label={block.name + ' teilen'}>✂ Teilen</button>}
                  </div>
                  {index + 1 < blocks.length && <button className={styles.divider} type="button" role="slider"
                    aria-label={'Zeit zwischen ' + block.name + ' und ' + blocks[index + 1].name + ' verteilen'}
                    aria-orientation="vertical" aria-valuemin={5} aria-valuemax={minutes(block.units + blocks[index + 1].units - 1)}
                    aria-valuenow={minutes(block.units)} aria-valuetext={block.name + ' ' + minutes(block.units) + ' Minuten'}
                    onKeyDown={event => {
                      if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return
                      event.preventDefault()
                      transfer(group, index, block.units + (event.key === 'ArrowDown' ? 1 : -1))
                    }}
                    onPointerDown={event => {
                      event.currentTarget.setPointerCapture(event.pointerId)
                      const height = event.currentTarget.parentElement.getBoundingClientRect().height
                      drag.current = { y: event.clientY, units: block.units, scale: sum(blocks) / height }
                    }}
                    onPointerMove={event => {
                      if (event.currentTarget.hasPointerCapture(event.pointerId) && drag.current) {
                        transfer(group, index, drag.current.units + Math.round((event.clientY - drag.current.y) * drag.current.scale))
                      }
                    }}
                    onLostPointerCapture={() => { drag.current = null }}><span /></button>}
                </Fragment>) : <p className={styles.empty}>Keine Aktivitäten ausgewählt</p>}</div>
            </section>)}</div>
          <p className={styles.balanceHint}>Zieh die Griffe zwischen den Aktivitäten.</p>
          <div className={styles.balance} style={{ '--focus': focus / total * 100 + '%' }}>
            <div className={styles.balanceTrack}><span>{focus > 0 && 'Fokus · ' + duration(focus)}</span><span>{total > focus && 'Pause · ' + duration(total - focus)}</span></div>
            {groups.focus.length > 0 && groups.pause.length > 0 &&
              <input type="range" min="0" max={total} value={focus} aria-label="Zeit für Fokus und Pause aufteilen"
                aria-valuetext={'Fokus ' + duration(focus) + ', Pause ' + duration(total - focus)}
                onChange={event => changeBudget(total, clamp(Number(event.target.value), groups.focus.length, total - groups.pause.length))} />}
          </div>
          <p className={styles.balanceHint}>Fokus und Pause aufteilen</p>
          <p className={styles.fixedTotal}>Gesamtzeit · {duration(total)} · {start}–{end}</p>
          <div className={styles.modes} aria-label="Reihenfolge">
            <button aria-pressed={mode === 'manual'} onClick={() => setMode('manual')}>Selbst ordnen</button>
            <button aria-pressed={mode === 'shuffle'} onClick={() => setMode('shuffle')}>Für mich mischen</button>
          </div>
          <p className={styles.hint}>{mode === 'shuffle' ? 'Fokus und Pause wechseln sich ab. Bei Bedarf werden Blöcke geteilt.' : 'Fokus und Pause im Wechsel'}</p>
          <button className={styles.primary} onClick={create}>Meinen Plan erstellen →</button>
        </>}

        {step === 3 && <>
          <h1 className={styles.compact} tabIndex={-1} ref={heading}>Dein Plan für heute.</h1>
          <p className={styles.lead}>{start}–{end} · {duration(total)}</p>
          <ol className={styles.agenda}>{order.map((block, index) => {
            const time = clock(cursor)
            cursor += minutes(block.units)
            return <li key={block.id} draggable data-group={block.group}
              onDragStart={event => event.dataTransfer.setData('text/plain', String(index))}
              onDragOver={event => event.preventDefault()}
              onDrop={event => { event.preventDefault(); const from = event.dataTransfer.getData('text/plain'); if (/^\d+$/.test(from)) move(Number(from), index) }}>
              <span>{time}–{clock(cursor)}</span><strong><ActivityIcon id={block.activityId ?? block.id} />{block.name}</strong><span>{minutes(block.units)} Min.</span>
              <button disabled={!index} onClick={() => move(index, index - 1)} aria-label={block.name + ' nach oben'}>↑</button>
              <button disabled={index === order.length - 1} onClick={() => move(index, index + 1)} aria-label={block.name + ' nach unten'}>↓</button>
            </li>
          })}</ol>
          <button className={styles.primary} onClick={save}>Plan speichern</button>
        </>}
        {step === 4 && viewed && <>
          <h1 className={styles.compact} tabIndex={-1} ref={heading}>Dein Plan für heute.</h1>
          <div className={styles.todayLayout}>
            <section className={styles.todayPanel} aria-label="Tagesablauf">
              <h2>Tagesablauf</h2>
              <ol className={styles.todayList}>{savedBlocks.map((block, index) => {
                const time = clock(savedCursor)
                savedCursor += minutes(block.units)
                const done = (block.done ?? 0) === block.units
                return <li key={block.id} data-group={block.group}>
                  <button type="button" className={styles.todayActivity} aria-current={index === viewedIndex ? 'step' : undefined}
                    onClick={() => setActiveIndex(index)}>
                    <span>{time}–{clock(savedCursor)}</span>
                    <strong><ActivityIcon id={block.activityId ?? block.id} />{block.name}</strong>
                  </button>
                  <label className={styles.todayCheck}>
                    <input type="checkbox" checked={done} aria-label={block.name + ' erledigt'}
                      onChange={event => updateProgress(block.id, event.target.checked ? block.units : 0)} />
                  </label>
                </li>
              })}</ol>
            </section>
            <section className={styles.todayPanel} aria-label="Fortschritt">
              <h2>Fortschritt</h2>
              <p aria-live="polite">{completed} von {savedBlocks.length} Aktivitäten erledigt · {minutes(progress)} von {minutes(sum(savedBlocks))} Min.</p>
              <progress value={progress} max={sum(savedBlocks)} aria-label="Tagesfortschritt" />
              <div className={styles.todayDetail}>
                <div className={styles.todayNavigation}>
                  <button type="button" aria-label="Vorherige Aktivität" disabled={viewedIndex === 0}
                    onClick={() => setActiveIndex(viewedIndex - 1)}>←</button>
                  <strong>{viewed.name}</strong>
                  <button type="button" aria-label="Nächste Aktivität" disabled={viewedIndex === savedBlocks.length - 1}
                    onClick={() => setActiveIndex(viewedIndex + 1)}>→</button>
                </div>
                <div className={styles.todayNavigation}>
                  <button type="button" aria-label="5 Minuten weniger" disabled={!(viewed.done ?? 0)}
                    onClick={() => updateProgress(viewed.id, (viewed.done ?? 0) - 1)}>−</button>
                  <label>{minutes(viewed.done ?? 0)} / {minutes(viewed.units)} Min.
                    <input type="range" min="0" max={viewed.units} value={viewed.done ?? 0}
                      aria-label={'Fortschritt für ' + viewed.name}
                      aria-valuetext={minutes(viewed.done ?? 0) + ' von ' + minutes(viewed.units) + ' Minuten'}
                      onChange={event => updateProgress(viewed.id, Number(event.target.value))} />
                  </label>
                  <button type="button" aria-label="5 Minuten mehr" disabled={(viewed.done ?? 0) === viewed.units}
                    onClick={() => updateProgress(viewed.id, (viewed.done ?? 0) + 1)}>+</button>
                </div>
              </div>
              {completed === savedBlocks.length && <p className={styles.planDone} role="status">✓ Tagesplan abgeschlossen</p>}
            </section>
          </div>
          <div className={styles.secondaryActions}><button type="button" onClick={newPlan}>Neuen Plan erstellen</button></div>
        </>}
        {message && <p className={styles.message} role="status">{message}</p>}
      </section>
    </div>
  </main>
}
