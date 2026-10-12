'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ANDARUN_HOME_GROUPS } from '@/data/andarunHome'
import { lebensmittel } from '@/data/health'
import { getBadenWuerttembergCalendarEntriesInRange } from '@/utils/germanPublicHolidays'
import { todayDuties, todayEvents, todayNutrition } from '@/utils/andarunToday'
import useTodayDashboard from './useTodayDashboard'
import styles from './page.module.css'

const kcal = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })
const dateLabel = date => new Date(date + 'T12:00:00Z').toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

function dutyTime(duty) {
  if (duty.carryover) return 'Seit gestern · bis ' + duty.end
  return (duty.start || '—') + '–' + (duty.end || '—') + (duty.overnight ? ' (+1 Tag)' : '')
}

export default function AndarunLanding({ initialNow }) {
  const { now, sources, refresh, loading } = useTodayDashboard(initialNow)
  const duties = sources.work.status === 'ready' ? todayDuties(sources.work.data.shifts, now) : []
  const events = sources.events.status === 'ready' ? todayEvents(sources.events.data.todos, now.date, getBadenWuerttembergCalendarEntriesInRange(now.date, now.date)) : []
  const nutrition = sources.health.status === 'ready' ? todayNutrition(sources.health.data, now.date, lebensmittel) : null

  return <main className={styles.page} lang="de" dir="ltr" data-andarun-home>
    <div className={styles.galaxyArtwork} aria-hidden="true"><Image src="/andarun-galaxy-dashboard.png" alt="" fill sizes="100vw" priority /></div>
    <div className={styles.shell}>
      <header className={styles.homeHeader}><Link href="/andarun" aria-label="Jaminova Startseite">JAMINOVA</Link></header>
      <section className={styles.welcome} aria-labelledby="andarun-title">
        <h1 id="andarun-title">Dein <em>persönlicher</em> Raum.</h1>
      </section>
      <section className={styles.todayPanel} aria-labelledby="today-title">
        <header className={styles.todayHeader}>
          <h2 id="today-title">Heute</h2>
          <div className={styles.todayTools}><time dateTime={now.date}>{dateLabel(now.date)}</time>
            <button type="button" onClick={refresh} disabled={loading} aria-label="Tagesübersicht aktualisieren" className={styles.refreshButton}><SpaceIcon name="refresh" /></button>
          </div>
        </header>
        <div className={styles.todayGrid}>
          <TodayColumn title="Dienst" icon="briefcase" tone="blue" href="/andarun/dienste" label="Dienstplan öffnen" status={sources.work.status}>
            {duties.length ? <ul className={styles.dutyList}>{duties.map(duty => <li key={duty.id + '-' + duty.date}>
              <strong className={styles.dutyTitle}>{duty.label}{duty.duty && duty.duty !== duty.model && !['U', 'K', 'F', 'TZ'].includes(duty.model) ? <span> · {duty.duty}</span> : null}</strong>
              {duty.start || duty.end ? <p className={styles.dutyTime}>{dutyTime(duty)}</p> : null}
              {duty.assignment ? <p className={styles.muted}>{duty.assignment}</p> : null}
              {duty.note ? <p className={styles.muted} dir="auto">{duty.note}</p> : null}
            </li>)}</ul> : <p className={styles.emptyText}>Kein Dienst eingetragen.</p>}
          </TodayColumn>
          <TodayColumn title="Termine" icon="calendar" tone="coral" href="/andarun/termine" label="Kalender öffnen" status={sources.events.status}>
            {events.length ? <ul className={styles.eventList}>{events.map(event => <li key={event.id}>
              <time className={styles.eventTime}>{event.allDay ? 'Ganztägig' : event.startTime + (event.endTime ? '–' + event.endTime : '')}</time>
              <strong dir="auto">{event.title}</strong>
              {event.itemType === 'holiday' || event.itemType === 'schoolHoliday' ? <small>{event.itemType === 'schoolHoliday' ? 'Schulferien' : 'Feiertag'} · Baden-Württemberg</small> : null}
            </li>)}</ul> : <p className={styles.emptyText}>Keine Termine für heute.</p>}
          </TodayColumn>
          <TodayColumn title="Ernährung" icon="food" tone="mint" href="/andarun/gesundheit" label="Gesundheit öffnen" status={sources.health.status}>
            {nutrition ? <NutritionSummary nutrition={nutrition} /> : null}
          </TodayColumn>
        </div>
      </section>
      <section className={styles.directory} aria-labelledby="all-sections-title">
        <header className={styles.directoryHeading}><h2 id="all-sections-title">Alle Bereiche</h2></header>
        <div className={styles.moduleGroups}>{ANDARUN_HOME_GROUPS.map(group => <nav key={group.id} className={[styles.group, styles[group.tone]].join(' ')} aria-labelledby={'group-' + group.id}>
          <h3 id={'group-' + group.id}>{group.title}</h3>
          <ul>{group.items.map(item => <li key={item.title}>
            {item.disabled ? <button type="button" disabled className={styles.directoryLink}><SpaceIcon name={item.icon} /><span>{item.title}</span><small>Inaktiv</small></button> :
              <Link href={item.href} className={[styles.directoryLink, item.tone ? styles[item.tone] : ''].join(' ')}><SpaceIcon name={item.icon} /><span>{item.title}</span><ChevronIcon /></Link>}
          </li>)}</ul>
        </nav>)}</div>
      </section>
      <footer className={styles.footer}>JAMINOVA · DEIN PERSÖNLICHER RAUM</footer>
    </div>
  </main>
}

function TodayColumn({ title, icon, tone, href, label, status, children }) {
  return <section className={[styles.todayColumn, styles[tone]].join(' ')} aria-labelledby={'today-' + icon} aria-busy={status === 'loading'}>
    <h3 id={'today-' + icon}><SpaceIcon name={icon} />{title}</h3>
    <div className={styles.summaryBody} aria-live="polite">
      {status === 'ready' ? children : <p className={status === 'error' ? styles.errorText : styles.muted}>{status === 'error' ? 'Daten konnten nicht geladen werden. Bitte aktualisieren.' : 'Daten werden geladen…'}</p>}
    </div>
    <Link className={styles.summaryLink} href={href}>{label}<ChevronIcon /></Link>
  </section>
}

function NutritionSummary({ nutrition }) {
  const note = !nutrition.complete ? 'Lebensmittel fehlen im Katalog. Bitte in Gesundheit prüfen.'
    : !nutrition.targetKcal ? 'Kalorienziel noch nicht festgelegt.'
    : nutrition.overKcal ? kcal.format(nutrition.overKcal) + ' kcal über dem Ziel.'
    : 'Tagesziel: ' + kcal.format(nutrition.targetKcal) + ' kcal.'
  return <>
    <div className={styles.calorieNumbers}>
      <div><strong>{nutrition.complete ? kcal.format(nutrition.eatenKcal) + ' kcal' : '—'}</strong><span>Gegessen</span></div>
      <div><strong>{nutrition.remainingKcal === null ? '—' : kcal.format(nutrition.remainingKcal) + ' kcal'}</strong><span>Noch offen</span></div>
    </div>
    {nutrition.targetKcal && nutrition.complete ? <div className={styles.calorieTrack} role="progressbar" aria-label="Kalorien heute" aria-valuemin={0} aria-valuemax={nutrition.targetKcal} aria-valuenow={Math.min(Math.max(nutrition.eatenKcal, 0), nutrition.targetKcal)} aria-valuetext={kcal.format(nutrition.eatenKcal) + ' von ' + kcal.format(nutrition.targetKcal) + ' kcal'}>
      <span className={nutrition.overKcal ? styles.overTarget : ''} style={{ width: Math.min(Math.max(nutrition.eatenKcal / nutrition.targetKcal, 0), 1) * 100 + '%' }} />
    </div> : <div className={styles.calorieTrack} aria-hidden="true" />}
    <p className={[styles.nutritionNote, nutrition.overKcal ? styles.overNote : ''].join(' ')}>{note}{!nutrition.hasRecord ? ' Noch kein Eintrag für heute.' : ''}</p>
  </>
}

function SpaceIcon({ name }) {
  if (name === 'refresh') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 18A16 16 0 0 0 11 12l-4 6M7 8v10h10M9 30a16 16 0 0 0 28 6l4-6M41 40V30H31" /></svg>
  if (name === 'food') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="25" cy="24" r="13"/><path d="M4 7v12c0 5 6 5 6 0V7M7 7v34M43 7c-4 5-4 14 0 17v17M43 7v17"/></svg>
  if (name === 'people') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="14" r="6"/><circle cx="34" cy="17" r="4"/><path d="M5 39v-5c0-7 6-11 13-11s13 4 13 11v5ZM30 26c7-1 13 3 13 9v4h-6"/></svg>
  if (name === 'plane') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m42 6-5-1-13 12-14-4-5 4 14 8-8 10-5-1-3 3 9 4 4 4 3-3-1-5 10-8 8 14 4-5-4-14 12-13Z"/></svg>
  if (name === 'sun') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>
  if (name === 'check') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="m15 24 6 6 13-14"/></svg>
  if (name === 'calendar') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M15 6v8M33 6v8M7 19h34"/></svg>
  if (name === 'book') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 11c-5-5-13-5-19-2v30c6-3 14-3 19 2 5-5 13-5 19-2V9c-6-3-14-3-19 2Zm0 0v30"/></svg>
  if (name === 'heart') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39S9 30 9 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-13 21-13 21Z"/></svg>
  if (name === 'pill') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 35a9 9 0 0 1 0-13L24 11a9 9 0 0 1 13 13L26 35a9 9 0 0 1-13 0Z"/><path d="m18 17 13 13"/></svg>
  if (name === 'coins') return <svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="18" cy="18" rx="12" ry="5"/><path d="M6 18v18c0 7 24 7 24 0V18M6 24c0 7 24 7 24 0M6 30c0 7 24 7 24 0"/><path d="M24 9c0-7 18-7 18 0v19c0 4-7 6-12 5M24 9c0 6 18 6 18 0M30 17c5 1 12-1 12-4M30 25c5 1 12-1 12-4"/></svg>
  if (name === 'briefcase') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="14" width="34" height="25" rx="3"/><path d="M18 14v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M7 24h34M21 24v4h6v-4"/></svg>
  if (name === 'file') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h14l8 8v28H14Z"/><path d="M28 6v9h8M19 24h12M19 31h12M19 17h5"/></svg>
  if (name === 'test') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 6h12M21 6v11L10 36a4 4 0 0 0 3.5 6h21a4 4 0 0 0 3.5-6L27 17V6"/><path d="M15 31h18M19 26h10"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 41h34M11 41V18h10v23M27 41V7h10v34M15 23h2M15 29h2M15 35h2M31 13h2M31 19h2M31 25h2M31 31h2M31 37h2"/></svg>
}

function ChevronIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
}
