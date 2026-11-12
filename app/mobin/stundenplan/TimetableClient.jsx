'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { berlinStudyDay } from '@/lib/mobinStudyTime'
import UntisConnect, { useUntis } from '../UntisConnect'
import styles from '../learning.module.css'

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
const storeKey = 'mobin-timetable-v1'
const dateLabel = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'numeric', timeZone: 'UTC' })

function weekDays(offset) {
  const now = new Date(berlinStudyDay() + 'T12:00:00Z')
  now.setUTCDate(now.getUTCDate() - (now.getUTCDay() + 6) % 7 + offset * 7)
  return days.map((name, index) => {
    const date = new Date(now)
    date.setUTCDate(now.getUTCDate() + index)
    return { name, date, key: date.toISOString().slice(0, 10) }
  })
}

async function photoData(file) {
  if (!file.type.startsWith('image/') || file.size > 25 * 1024 * 1024) throw new Error()
  const url = URL.createObjectURL(file)
  try {
    const photo = new Image()
    photo.src = url
    await photo.decode()
    const scale = Math.min(1, 1500 / Math.max(photo.width, photo.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(photo.width * scale)
    canvas.height = Math.round(photo.height * scale)
    canvas.getContext('2d').drawImage(photo, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', .8)
  } finally { URL.revokeObjectURL(url) }
}

export default function TimetableClient() {
  const untis = useUntis('timetable')
  const [local, setLocal] = useState({ photo: '', lessons: [] })
  const [offset, setOffset] = useState(0)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || 'null')
      if (saved) setLocal(saved)
    } catch {}
  }, [])
  function save(next) {
    try {
      localStorage.setItem(storeKey, JSON.stringify(next))
      setLocal(next)
      setNotice('')
    } catch { setNotice('Der Stundenplan konnte nicht auf diesem Gerät gespeichert werden.') }
  }
  const week = weekDays(offset)
  const connected = untis.data?.connected
  return <main className={styles.shell}><div className={styles.wrap}>
    <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
    <header className={styles.heading}><h1>Stundenplan</h1><div className={styles.actions}>
      <UntisConnect state={untis} update />
      {!connected && <label className={styles.capture}>
        {local.photo ? 'Unterricht aktualisieren' : 'Stundenplan scannen'}
        <input type="file" accept="image/*" capture="environment" aria-label="Stundenplan fotografieren" onChange={async event => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (!file) return
          try { save({ ...local, photo: await photoData(file) }) }
          catch { setNotice('Dieses Foto konnte nicht geöffnet werden. Versuche es mit einem JPEG oder PNG.') }
        }} />
      </label>}
    </div></header>
    {notice && <p role="status">{notice}</p>}
    <section className={styles.panel} aria-label="Unterricht dieser Woche">
      <div className={styles.heading}><h2>{dateLabel.format(week[0].date)} – {dateLabel.format(week[4].date)}</h2>
        <div className={styles.actions}><button aria-label="Vorherige Woche" onClick={() => setOffset(offset - 1)}>‹</button>
        <button onClick={() => setOffset(0)}>Diese Woche</button><button aria-label="Nächste Woche" onClick={() => setOffset(offset + 1)}>›</button></div>
      </div>
      <div className={styles.timetable}>{week.map((item, index) => {
        const lessons = connected ? untis.data.events.filter(event => event.day === item.key) : local.lessons.filter(lesson => lesson.day === index)
        return <section key={item.key}><h3>{item.name}</h3>
          {lessons.length ? <ul>{lessons.map((lesson, i) => <li key={i}>
            <span>{lesson.time}{lesson.end && '–' + lesson.end}</span>
            <strong>{lesson.cancelled && 'Entfällt · '}{lesson.title}</strong>
            {!connected && <button aria-label={lesson.title + ' entfernen'} onClick={() => save({ ...local, lessons: local.lessons.filter(item => item !== lesson) })}>×</button>}
          </li>)}</ul> : <p>Kein Unterricht eingetragen</p>}
        </section>
      })}</div>
    </section>
    {!connected && <section className={styles.panel}>
      <h2>Stunden eintragen</h2>
      {local.photo && <details open><summary>Fotografierter Stundenplan</summary><img className={styles.timetablePhoto} src={local.photo} alt="Fotografierter Stundenplan" /></details>}
      <p>Du kannst Stunden aus dem Foto in die Wochenübersicht übertragen.</p>
      <form className={styles.controls} onSubmit={event => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const title = String(form.get('title')).trim()
        const time = form.get('time')
        const end = form.get('end')
        if (!title || (end && end <= time)) { setNotice('Bitte prüfe Fach, Beginn und Ende.'); return }
        save({ ...local, lessons: [...local.lessons, { day: Number(form.get('day')), time, end, title }].sort((a, b) => a.time.localeCompare(b.time)) })
        event.currentTarget.reset()
      }}>
        <label>Tag<select name="day">{days.map((name, i) => <option key={name} value={i}>{name}</option>)}</select></label>
        <label>Beginn<input type="time" name="time" required /></label>
        <label>Ende<input type="time" name="end" /></label>
        <label>Fach<input name="title" maxLength={80} required /></label>
        <button>Hinzufügen</button>
      </form>
    </section>}
  </div></main>
}
