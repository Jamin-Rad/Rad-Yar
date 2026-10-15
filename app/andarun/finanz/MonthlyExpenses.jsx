'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { analyseMonth, mainCategory, money, monthLabel, shiftMonth, todayBerlin, validDate } from '@/utils/monthlyExpenseModel'
import Icon from './FinanceIcons'
import { BookingRows, CategoryList, MonthInsights, Summary } from './FinanceOverview'
import ExpenseEntry from './ExpenseEntry'
import FinanceReports, { FinanceBookings } from './FinanceReports'
import FinancePlanning from './FinancePlanning'
import s from './MonthlyExpenses.module.css'

const syncLabels = {
  loading: ['Wird geladen', 'Deine Finanzdaten werden geladen.'],
  saving: ['Wird gespeichert', 'Die Eingaben sind auf diesem Gerät gesichert; der Online-Abgleich läuft.'],
  merging: ['Wird abgeglichen', 'Lokale und Online-Änderungen werden zusammengeführt.'],
  synced: ['Online gespeichert', 'Alle Änderungen sind synchronisiert.'],
  offline: ['Nur auf diesem Gerät', 'Online-Speichern ist pausiert. Deine Eingaben bleiben lokal erhalten. Beim erneuten Öffnen wird der Abgleich versucht.'],
  conflict: ['Abgleich pausiert', 'Die lokalen Eingaben bleiben erhalten. Beim erneuten Öffnen wird der Abgleich versucht.'],
}

export default function MonthlyExpenses({ store, recurring, budgets, categories, month, onMonth, loaded, syncStatus, categoryError, onSaveEntry, onUndoEntry, onDeleteEntry, onBudget, onRecurring, onEndRecurring, onCategory, onSubcategory, onDeleteCategory, onDeleteSubcategory }) {
  const [view, setView] = useState('overview')
  const [entryType, setEntryType] = useState('expense')
  const [entryOpen, setEntryOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [editing, setEditing] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [notice, setNotice] = useState(null)
  const entryRail = useRef(null)
  const opener = useRef(null)
  const model = useMemo(() => analyseMonth({ month, store, recurring, budgets, categories }), [month, store, recurring, budgets, categories])
  const recent = useMemo(() => [...model.entries].sort((a, b) => (b.date || '').localeCompare(a.date || '') || String(b.id).localeCompare(String(a.id))).slice(0, 4), [model.entries])
  const preferred = useMemo(() => {
    const counts = new Map()
    Object.entries(store).filter(([key]) => /^\d{4}-\d{2}$/.test(key)).forEach(([, data]) => (data.entries || []).forEach(entry => { if (entry.type === entryType) { const name = mainCategory(entry, categories); counts.set(name, (counts.get(name) || 0) + 1) } }))
    return [...counts].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [store, categories, entryType])
  const sync = syncLabels[syncStatus] || syncLabels.loading

  useEffect(() => {
    const media = window.matchMedia('(max-width: 980px)')
    const update = () => setMobile(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (mobile) return
    let frame = 0
    const measure = () => {
      frame = 0
      const rail = entryRail.current
      if (rail) rail.style.setProperty('--rail-offset', `${Math.max(22, rail.getBoundingClientRect().top) + 20}px`)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (frame) window.cancelAnimationFrame(frame) }
  }, [mobile])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 9000)
    return () => window.clearTimeout(timer)
  }, [notice])
  useEffect(() => {
    if (!mobile || !entryOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const viewport = window.visualViewport
    const resize = () => entryRail.current?.style.setProperty('--sheet-height', `${viewport?.height || window.innerHeight}px`)
    resize(); viewport?.addEventListener('resize', resize)
    const timer = window.setTimeout(() => entryRail.current?.querySelector('button')?.focus(), 50)
    const keyboard = event => {
      if (event.key === 'Escape') { setEntryOpen(false); return }
      if (event.key !== 'Tab') return
      const controls = [...(entryRail.current?.querySelectorAll('input, select, textarea, button, summary') || [])].filter(item => !item.disabled && item.getClientRects().length)
      const first = controls[0], last = controls.at(-1)
      if (event.shiftKey && (document.activeElement === first || !entryRail.current?.contains(document.activeElement))) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && (document.activeElement === last || !entryRail.current?.contains(document.activeElement))) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keyboard)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
      viewport?.removeEventListener('resize', resize)
      document.removeEventListener('keydown', keyboard)
      if (opener.current?.isConnected) opener.current.focus()
    }
  }, [mobile, entryOpen])

  function openEntry(type = 'expense', original = null) {
    opener.current = document.activeElement
    setEntryType(type); setEditing(original); setEntryOpen(mobile)
    if (!mobile) {
      entryRail.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      window.setTimeout(() => document.getElementById('monthly-amount')?.focus(), 50)
    }
  }
  function saveEntry(values, original) {
    const change = onSaveEntry(values, original)
    onMonth(values.date.slice(0, 7))
    setNotice({ text: `${original ? 'Buchung aktualisiert' : values.type === 'income' ? 'Einkommen erfasst' : 'Ausgabe erfasst'} · ${money(values.amount)}`, undo: () => onUndoEntry(change) })
    setEditing(null)
    if (mobile) setEntryOpen(false)
  }
  function editEntry(entry) {
    if (entry.generatedRecurring) { setView('plan'); return }
    openEntry(entry.type, entry)
  }
  function deleteEntry(entry) {
    if (!window.confirm(`„${entry.description || entry.title}“ (${money(entry.amount)}) löschen?`)) return
    const change = onDeleteEntry(entry)
    setNotice({ text: 'Buchung entfernt.', undo: () => onUndoEntry(change) })
  }
  function category(name) { setCategoryFilter(name); setView('bookings') }
  function selectMonth(key) { onMonth(key); setView('overview'); setCategoryFilter('') }
  function manage() { setEntryOpen(false); setView('plan') }

  return <div className={s.studio}>
    <header className={s.topbar}><div className={s.topbarInner}><span className={s.brand}><Icon name="wallet" size={25} />Finanzen</span><Link href="/andarun" className={s.backLink}>Zur Übersicht<Icon name="right" size={15} /></Link><div className={`${s.syncStatus} ${syncStatus === 'offline' || syncStatus === 'conflict' ? s.syncOffline : syncStatus === 'synced' ? s.syncGood : ''}`} role="status" aria-live="polite" title={sync[1]}><i /><span>{sync[0]}</span></div></div></header>
    <main className={s.container} aria-busy={!loaded}>
      <div className={s.pageHeading}><div><h1>Monatliche Ausgaben</h1><p>Alles Wichtige für deinen Monat.</p></div><div className={s.monthPicker}><button type="button" aria-label="Vorheriger Monat" onClick={() => onMonth(shiftMonth(month, -1))}><Icon name="left" size={17} /></button><label><span>{monthLabel(month)}</span><input type="month" aria-label="Monat auswählen" value={month} onChange={event => { if (validDate(`${event.target.value}-01`)) onMonth(event.target.value) }} /></label><button type="button" aria-label="Nächster Monat" onClick={() => onMonth(shiftMonth(month, 1))}><Icon name="right" size={17} /></button></div></div>
      <div className={s.workspace}>
        <div className={s.mainColumn}>
          <nav className={s.navigation} aria-label="Finanzbereiche">{[['overview', 'Übersicht'], ['bookings', 'Buchungen'], ['reports', 'Auswertung'], ['plan', 'Planung']].map(([id, label]) => <button type="button" key={id} aria-current={view === id ? 'page' : undefined} onClick={() => { setView(id); if (id === 'bookings') setCategoryFilter('') }}>{label}</button>)}</nav>
          {!loaded ? <div className={s.loading} role="status"><span />Dein Monatsüberblick wird geladen …</div> : <>
            {view === 'overview' && <>
              <Summary model={model} />
              <div className={s.overviewColumns}>
                <section className={s.panel}><div className={s.panelHead}><h2>Wo dein Geld hingeht</h2></div><CategoryList model={model} onCategory={category} limit={5} />{model.rows.length > 5 && <button type="button" className={s.textAction} onClick={() => setView('reports')}>Alle Kategorien ansehen →</button>}</section>
                <section className={s.panel}><div className={s.panelHead}><h2>Dein Monat in Kürze</h2></div><MonthInsights model={model} compact={mobile} /></section>
              </div>
              <section className={s.panel}><div className={s.panelHead}><h2>Letzte Buchungen</h2><button type="button" className={s.textAction} onClick={() => { setCategoryFilter(''); setView('bookings') }}>Alle ansehen <Icon name="right" size={15} /></button></div><BookingRows entries={recent} categories={categories} compact /><p className={s.help}>Jede Buchung zählt einmal. Fixkosten werden automatisch eingeplant.</p></section>
            </>}
            {view === 'bookings' && <FinanceBookings entries={model.entries} categories={categories} categoryFilter={categoryFilter} onCategoryFilter={setCategoryFilter} onEdit={editEntry} onDelete={deleteEntry} />}
            {view === 'reports' && <FinanceReports key={month} model={model} store={store} recurring={recurring} categories={categories} onCategory={category} onEdit={editEntry} onDelete={deleteEntry} onMonth={selectMonth} onPlan={() => setView('plan')} />}
            {view === 'plan' && <FinancePlanning categories={categories} budgets={budgets} recurring={recurring} categoryError={categoryError} onBudget={onBudget} onRecurring={onRecurring} onEndRecurring={onEndRecurring} onCategory={onCategory} onSubcategory={onSubcategory} onDeleteCategory={onDeleteCategory} onDeleteSubcategory={onDeleteSubcategory} />}
          </>}
        </div>
        <aside ref={entryRail} className={`${s.entryRail} ${entryOpen ? s.entryRailOpen : ''}`} role={mobile && entryOpen ? 'dialog' : undefined} aria-modal={mobile && entryOpen ? true : undefined} aria-labelledby="monthly-entry-title">
          <div className={s.entryHeader}><h2 id="monthly-entry-title">{editing ? 'Buchung bearbeiten' : mobile ? entryType === 'income' ? 'Neues Einkommen' : 'Neue Ausgabe' : 'Schnell eintragen'}</h2><button type="button" className={s.sheetClose} aria-label="Eingabe schließen" onClick={() => setEntryOpen(false)}><Icon name="close" size={20} /></button></div>
          <ExpenseEntry type={entryType} onType={setEntryType} categories={categories} month={month} entry={editing} loaded={loaded} onSave={saveEntry} onCancel={() => setEditing(null)} onManage={manage} preferred={preferred} />
        </aside>
      </div>
      <div className={s.mobileEntryButton}><button type="button" className={s.primary} disabled={!loaded} onClick={() => openEntry()}><Icon name="plus" size={23} />Ausgabe eintragen</button></div>
      {notice && <div className={`${s.toast} ${entryOpen && mobile ? s.toastOverSheet : ''}`} role="status"><Icon name="check" size={18} /><span>{notice.text}</span><button type="button" onClick={() => { notice.undo(); setNotice(null) }}>Rückgängig</button><button type="button" aria-label="Meldung schließen" onClick={() => setNotice(null)}><Icon name="close" size={16} /></button></div>}
    </main>
  </div>
}
