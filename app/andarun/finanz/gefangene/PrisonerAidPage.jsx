'use client'

import Link from 'next/link'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { DEFAULT_RATE, EMPTY_STATE, STORAGE_KEY, donationToman, donorSummary, formatEuro, formatToman, normalizeState, parseLocalizedNumber, recipientLedger, totalsFor, westernDigits } from './aidData'
import { mergeScreenshotSeed } from './screenshotSeed'
import styles from './page.module.css'

const today = () => new Date().toISOString().slice(0, 10)
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
const emptyPrisoner = { number: '', name: '', neededToman: '', note: '' }
const emptyRecipient = { name: '', account: '', note: '' }
const emptyDonation = { prisonerId: '', donor: '', amount: '', rateAtRecord: DEFAULT_RATE, originalCurrency: 'eur', status: 'recorded', channel: 'recipient', recipientId: '', settledToSetad: false, date: today(), note: '' }
const statusLabels = { promised: 'قول کمک', recorded: 'کمک ثبت‌شده', confirmed: 'واریز تأییدشده' }
const donorCollator = new Intl.Collator('fa', { sensitivity: 'base' })
const registeredToman = totals => totals.recordedToman + totals.confirmedToman

function MetricIcon({ kind }) {
  return <span className={`${styles.metricIcon} ${styles[`metricIcon${kind}`]}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'Needed' ? <><circle cx="12" cy="12" r="8" /><path d="M12 4v8h8" /></> : null}
    {kind === 'Registered' ? <><path d="M4 13.5V19h16v-5.5M8 14l3.1 2.2a2 2 0 0 0 2.3 0L17 13" /><path d="M12 12.5s-4.7-2.8-4.7-5.5a2.3 2.3 0 0 1 4.7-.5 2.3 2.3 0 0 1 4.7.5c0 2.7-4.7 5.5-4.7 5.5Z" /></> : null}
    {kind === 'Confirmed' ? <><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2m-5 6 2 2 3-4" /></> : null}
    {kind === 'Complete' ? <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-2a5.5 5.5 0 0 1 11 0v2M17 5a3 3 0 0 1 0 6m1.5 2.5a4.5 4.5 0 0 1 2 3.5V19" /></> : null}
  </svg></span>
}

export default function PrisonerAidPage({ mode = 'report', initialRecipientId = '', initialPrisonerId = '' }) {
  const [state, setState] = useState(EMPTY_STATE)
  const [loaded, setLoaded] = useState(false)
  const [onlineReady, setOnlineReady] = useState(false)
  const [saveStatus, setSaveStatus] = useState('در حال بارگذاری…')
  const [prisonerForm, setPrisonerForm] = useState(emptyPrisoner)
  const [recipientForm, setRecipientForm] = useState(emptyRecipient)
  const [donationForm, setDonationForm] = useState(emptyDonation)
  const [editingPrisoner, setEditingPrisoner] = useState('')
  const [editingRecipient, setEditingRecipient] = useState('')
  const [editingDonation, setEditingDonation] = useState('')
  const [editingContext, setEditingContext] = useState('prisoner')
  const [selectedPrisoner, setSelectedPrisoner] = useState(initialPrisonerId)
  const [selectedRecipient, setSelectedRecipient] = useState(initialRecipientId)
  const [prisonerSort, setPrisonerSort] = useState('number')
  const [pdfReportType, setPdfReportType] = useState('overview')
  const [pdfTargetId, setPdfTargetId] = useState('')
  const [error, setError] = useState('')
  const [donationError, setDonationError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      let local = EMPTY_STATE
      try { local = normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')) } catch {}
      try {
        const response = await fetch('/api/andarun/prisoner-aid', { cache: 'no-store' })
        const result = await response.json()
        if (!response.ok || !result.online) throw new Error(result.error || 'ذخیرهٔ آنلاین در دسترس نیست.')
        if (!active) return
        setState(mergeScreenshotSeed(result.state ? normalizeState(result.state) : local))
        setOnlineReady(true)
        setSaveStatus('ذخیرهٔ آنلاین آماده است')
      } catch (cause) {
        if (!active) return
        setState(mergeScreenshotSeed(local))
        setSaveStatus(`ذخیرهٔ آنلاین در دسترس نیست: ${cause.message}`)
      }
      if (active) setLoaded(true)
    }
    load()
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!loaded || !onlineReady) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setSaveStatus('در حال ذخیره…')
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/andarun/prisoner-aid', {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state }),
        })
        const result = await response.json()
        if (!response.ok || !result.online) throw new Error(result.error || 'ذخیره ناموفق بود.')
        setSaveStatus('آنلاین ذخیره شد')
      } catch (cause) { setSaveStatus(`ذخیرهٔ آنلاین ناموفق: ${cause.message}`) }
    }, 600)
    return () => clearTimeout(timer)
  }, [state, loaded, onlineReady])

  const rows = useMemo(() => state.prisoners.map(prisoner => ({
    ...prisoner, totals: totalsFor(prisoner.id, state.donations),
  })), [state.prisoners, state.donations])
  const displayedRows = useMemo(() => {
    return [...rows].sort((a, b) => prisonerSort === 'remaining'
      ? Math.max(0, a.neededToman - registeredToman(a.totals)) - Math.max(0, b.neededToman - registeredToman(b.totals)) || Number(a.number) - Number(b.number)
      : Number(a.number) - Number(b.number))
  }, [prisonerSort, rows])
  const summary = useMemo(() => rows.reduce((result, row) => {
    result.needed += row.neededToman
    result.confirmed += row.totals.confirmedToman
    result.registered += registeredToman(row.totals)
    if (registeredToman(row.totals) >= row.neededToman) result.complete++
    return result
  }, { needed: 0, confirmed: 0, registered: 0, complete: 0 }), [rows])
  const historyDonations = useMemo(() => [...state.donations].sort((a, b) => {
    if (!a.donor && b.donor) return 1
    if (a.donor && !b.donor) return -1
    return donorCollator.compare(a.donor, b.donor) || b.date.localeCompare(a.date)
  }), [state.donations])
  const recipientRows = useMemo(() => {
    return state.recipients.map(row => ({ ...row,
      ledger: recipientLedger(row.id, state.donations, state.prisoners) }))
  }, [state.recipients, state.donations, state.prisoners])
  const donorRows = useMemo(() => donorSummary(state.donations), [state.donations])

  function savePrisoner(event) {
    event.preventDefault()
    if (!onlineReady) return
    const number = westernDigits(prisonerForm.number.trim())
    const name = prisonerForm.name.trim()
    const neededToman = parseLocalizedNumber(prisonerForm.neededToman)
    if (!number || !Number.isInteger(neededToman) || neededToman <= 0) {
      setError('شمارهٔ زندانی و مبلغ صحیحِ مورد نیاز را وارد کنید.')
      return
    }
    if (state.prisoners.some(row => row.number === number && row.id !== editingPrisoner)) {
      setError('شمارهٔ زندانی تکراری است.')
      return
    }
    const row = { id: editingPrisoner || makeId(), number, name, neededToman, note: prisonerForm.note.trim() }
    setState(current => ({ ...current, prisoners: editingPrisoner ? current.prisoners.map(item => item.id === editingPrisoner ? row : item) : [...current.prisoners, row] }))
    setPrisonerForm(emptyPrisoner); setEditingPrisoner(''); setError('')
  }

  function saveRecipient(event) {
    event.preventDefault()
    if (!onlineReady) return
    if (!recipientForm.name.trim()) return
    const row = { id: editingRecipient || makeId(), name: recipientForm.name.trim(), account: recipientForm.account.trim(), note: recipientForm.note.trim() }
    setState(current => ({ ...current, recipients: editingRecipient ? current.recipients.map(item => item.id === editingRecipient ? row : item) : [...current.recipients, row] }))
    setRecipientForm(emptyRecipient); setEditingRecipient('')
  }

  function saveDonation(event) {
    event.preventDefault()
    if (!onlineReady) return
    const amount = parseLocalizedNumber(donationForm.amount)
    const rateAtRecord = parseLocalizedNumber(donationForm.rateAtRecord)
    if (!state.prisoners.some(row => row.id === donationForm.prisonerId) || !Number.isFinite(amount) || amount <= 0 || donationForm.originalCurrency === 'toman' && !Number.isInteger(amount)) {
      setDonationError('زندانی و مبلغ صحیحِ کمک را وارد کنید.')
      return
    }
    if (!Number.isInteger(rateAtRecord) || rateAtRecord <= 0) {
      setDonationError('نرخ تبدیل این کمک را وارد کنید.')
      return
    }
    if (donationForm.channel === 'recipient' && !state.recipients.some(row => row.id === donationForm.recipientId)) {
      setDonationError('گیرندهٔ کمک را انتخاب کنید یا مسیر واریز مستقیم به ستاد دیه را بزنید.')
      return
    }
    const originalCurrency = donationForm.originalCurrency
    const tomanAmount = originalCurrency === 'toman' ? amount : 0
    const euroAmount = originalCurrency === 'toman' ? amount / rateAtRecord : amount
    const row = {
      id: editingDonation || makeId(), prisonerId: donationForm.prisonerId, donor: donationForm.donor.trim(),
      euroAmount, rateAtRecord, tomanAmount, originalCurrency,
      status: donationForm.status, channel: donationForm.channel,
      recipientId: donationForm.channel === 'direct' ? '' : donationForm.recipientId,
      settledToSetad: donationForm.channel === 'recipient' && donationForm.settledToSetad,
      date: donationForm.date, note: donationForm.note.trim(),
    }
    setState(current => ({ ...current, donations: editingDonation ? current.donations.map(item => item.id === editingDonation ? row : item) : [...current.donations, row] }))
    if (editingDonation && editingContext === 'recipient') setSelectedRecipient(row.recipientId)
    else if (editingDonation) setSelectedPrisoner(row.prisonerId)
    setDonationForm(emptyDonation); setEditingDonation(''); setDonationError('')
  }

  function editPrisoner(row) {
    setEditingPrisoner(row.id); setPrisonerForm({ number: row.number, name: row.name, neededToman: row.neededToman, note: row.note });
    document.getElementById('prisoner-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  function editRecipient(row) {
    setEditingRecipient(row.id); setRecipientForm({ name: row.name, account: row.account, note: row.note });
    document.getElementById('recipient-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  function editDonation(row, context = 'prisoner') {
    setEditingContext(context)
    if (context === 'recipient') setSelectedRecipient(row.recipientId)
    else setSelectedPrisoner(row.prisonerId)
    setEditingDonation(row.id); setDonationForm({ prisonerId: row.prisonerId, donor: row.donor,
      amount: row.originalCurrency === 'toman' ? row.tomanAmount : row.euroAmount,
      rateAtRecord: row.rateAtRecord,
      originalCurrency: row.originalCurrency || 'eur',
      status: row.status, channel: row.channel, recipientId: row.recipientId,
      settledToSetad: row.settledToSetad === true, date: row.date, note: row.note });
    setDonationError('')
    const editorId = context === 'recipient'
      ? `recipient-editor-${row.recipientId}` : `donation-editor-${row.prisonerId}`
    requestAnimationFrame(() => document.getElementById(editorId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function togglePrisoner(prisonerId) {
    setSelectedPrisoner(current => current === prisonerId ? '' : prisonerId)
    setEditingDonation('')
    setDonationForm(emptyDonation)
  }

  function toggleRecipient(recipientId) {
    setSelectedRecipient(current => current === recipientId ? '' : recipientId)
    setEditingDonation('')
    setDonationForm(emptyDonation)
  }

  function donationFormFields() {
    const editingRate = parseLocalizedNumber(donationForm.rateAtRecord) || 0
    const editingAmount = parseLocalizedNumber(donationForm.amount) || 0
    return <>
      <label>زندانی<select required value={donationForm.prisonerId} onChange={event => setDonationForm(current => ({ ...current, prisonerId: event.target.value }))}><option value="">انتخاب کنید</option>{state.prisoners.map(row => <option value={row.id} key={row.id}>{row.number}{row.name ? ` · ${row.name}` : ''}</option>)}</select></label>
      <label>نام کمک‌کننده<input value={donationForm.donor} onChange={event => setDonationForm(current => ({ ...current, donor: event.target.value }))} /></label>
      <label>ارز مبلغ اصلی<select value={donationForm.originalCurrency} onChange={event => setDonationForm(current => ({ ...current, originalCurrency: event.target.value, amount: '' }))}><option value="eur">یورو</option><option value="toman">تومان</option></select></label>
      <label>مبلغ کمک، {donationForm.originalCurrency === 'toman' ? 'تومان' : 'یورو'}<input required type="text" inputMode={donationForm.originalCurrency === 'toman' ? 'numeric' : 'decimal'} value={donationForm.amount} onChange={event => setDonationForm(current => ({ ...current, amount: event.target.value }))} /></label>
      <label>نرخ تبدیل همین کمک، تومان برای هر یورو<input required type="text" inputMode="numeric" value={donationForm.rateAtRecord} onChange={event => setDonationForm(current => ({ ...current, rateAtRecord: event.target.value }))} /></label>
      <label>وضعیت<select value={donationForm.status} onChange={event => setDonationForm(current => ({ ...current, status: event.target.value }))}><option value="promised">گفته واریز می‌کند</option><option value="recorded">کمک ثبت شده، منتظر تأیید</option><option value="confirmed">واریز تأیید شده</option></select></label>
      <label>مسیر واریز<select value={donationForm.channel} onChange={event => setDonationForm(current => ({ ...current, channel: event.target.value, recipientId: '', settledToSetad: false }))}><option value="recipient">از طریق گیرنده</option><option value="direct">مستقیم به حساب ستاد دیه</option></select></label>
      {donationForm.channel === 'recipient' ? <label>گیرنده<select required value={donationForm.recipientId} onChange={event => setDonationForm(current => ({ ...current, recipientId: event.target.value }))}><option value="">انتخاب گیرنده</option>{state.recipients.map(row => <option value={row.id} key={row.id}>{row.name}</option>)}</select></label> : null}
      {donationForm.channel === 'recipient' ? <label className={styles.checkboxLabel}><input type="checkbox" checked={donationForm.settledToSetad} onChange={event => setDonationForm(current => ({ ...current, settledToSetad: event.target.checked }))} />این مبلغ به ستاد دیه واریز شده است</label> : null}
      <label>تاریخ<input type="date" value={donationForm.date} onChange={event => setDonationForm(current => ({ ...current, date: event.target.value }))} /></label>
      <label>توضیح<input value={donationForm.note} onChange={event => setDonationForm(current => ({ ...current, note: event.target.value }))} /></label>
      <div className={styles.equivalent}><span>معادل کمک با نرخ همین ورودی</span><strong>{formatEuro(donationForm.originalCurrency === 'toman' ? editingRate ? editingAmount / editingRate : 0 : editingAmount)}</strong><strong>{formatToman(donationForm.originalCurrency === 'toman' ? editingAmount : editingAmount * editingRate)}</strong></div>
      {donationError ? <p className={styles.error} role="alert">{donationError}</p> : null}
      <div className={styles.formActions}><button type="submit" disabled={!state.prisoners.length || !onlineReady}>{editingDonation ? 'ذخیرهٔ تغییرات' : 'ثبت کمک'}</button>{editingDonation ? <button type="button" className={styles.secondary} onClick={() => { setEditingDonation(''); setDonationForm(emptyDonation); setDonationError('') }}>انصراف</button> : null}</div>
    </>
  }

  return <main className={styles.page} dir="rtl">
    <div className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Andarun / Finanzen</p>
        <div className={styles.headerTitle}><h1>کمک به زندانیان</h1><p>ثبت نیازها، کمک‌ها و وضعیت واریز هر زندانی</p></div>
        <div className={styles.headerSide}><span>{saveStatus}</span></div>
      </header>
      <div className={styles.actionRow}>
        <nav className={styles.modeTabs} aria-label="نمای صفحهٔ کمک به زندانیان">
          <Link href="/andarun/finanz/gefangene" className={mode === 'report' ? styles.activeTab : ''} aria-current={mode === 'report' ? 'page' : undefined}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5m0 14h16M8 15v-3m5 3V8m5 7V5" /></svg><span>گزارش</span></Link>
          <Link href="/andarun/finanz/gefangene/edit" className={mode === 'edit' ? styles.activeTab : ''} aria-current={mode === 'edit' ? 'page' : undefined}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15.5 5.5 18.5 8.5M4 20l4.2-.9L19 8.3a2.1 2.1 0 0 0-3-3L5.2 16.1 4 20Z" /></svg><span>ویرایش</span></Link>
        </nav>
        {mode === 'report' ? <section className={styles.pdfPanel} aria-labelledby="pdf-title">
          <h2 className={styles.srOnly} id="pdf-title">گرفتن PDF</h2>
          <form action="/andarun/finanz/gefangene/print" method="get" target="_blank" className={styles.pdfForm}>
            <input type="hidden" name="auto" value="1" />
            <label>نوع گزارش<select name="type" value={pdfReportType} onChange={event => { setPdfReportType(event.target.value); setPdfTargetId('') }}>
              <option value="overview">گزارش کامل</option><option value="prisoners">همهٔ زندانیان و ماندهٔ نیاز</option>
              <option value="recipients">همهٔ گیرنده‌ها و واریز به ستاد دیه</option><option value="donors">جمع کمک هر فرد</option><option value="donations">تاریخچهٔ کمک‌ها بر اساس کمک‌کننده</option>
              <option value="prisoner">یک زندانی و کمک‌هایش</option><option value="recipient">یک گیرنده و جزئیاتش</option>
            </select></label>
            {pdfReportType === 'prisoner' ? <label>زندانی<select name="id" required value={pdfTargetId} onChange={event => setPdfTargetId(event.target.value)}><option value="">انتخاب کنید</option>{state.prisoners.map(row => <option key={row.id} value={row.id}>{row.number} · {row.name}</option>)}</select></label> : null}
            {pdfReportType === 'recipient' ? <label>گیرنده<select name="id" required value={pdfTargetId} onChange={event => setPdfTargetId(event.target.value)}><option value="">انتخاب کنید</option>{recipientRows.map(row => <option key={row.id} value={row.id}>{row.name}</option>)}</select></label> : null}
            <button type="submit" disabled={!onlineReady}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M8 15h8m-8 3h5" /></svg><span>گرفتن PDF</span></button>
          </form>
        </section> : null}
      </div>
      {!onlineReady && loaded ? <p className={styles.storageAlert} role="alert">اتصال ذخیرهٔ آنلاین برقرار نیست. ویرایش تا برقراری اتصال غیرفعال است.</p> : null}

      {mode === 'edit' ? <section className={styles.panel} id="donation-form"><div className={styles.sectionTitle}><div><span>دفتر کمک‌ها</span><h2>ثبت کمک</h2></div></div>
        {editingDonation ? <p className={styles.empty}>فرم ویرایش کمک در جزئیات زندانی یا گیرنده باز است.</p> : <form className={styles.form} onSubmit={saveDonation}>{donationFormFields()}</form>}
      </section> : null}

      <section className={styles.metrics} aria-label="خلاصه کمک‌ها">
        <div><MetricIcon kind="Needed" /><div className={styles.metricText}><span>مبلغ مورد نیاز</span><strong>{formatToman(summary.needed)}</strong></div></div>
        <div><MetricIcon kind="Registered" /><div className={styles.metricText}><span>کمک ثبت‌شده</span><strong>{formatToman(summary.registered)}</strong></div></div>
        <div><MetricIcon kind="Confirmed" /><div className={styles.metricText}><span>واریز تأییدشده</span><strong>{formatToman(summary.confirmed)}</strong></div></div>
        <div><MetricIcon kind="Complete" /><div className={styles.metricText}><span>زندانی تکمیل‌شده</span><strong>{new Intl.NumberFormat('fa-IR').format(summary.complete)}</strong></div></div>
      </section>

      <section className={styles.panel} aria-labelledby="prisoners-title">
        <div className={styles.sectionTitle}><div><span>فهرست اصلی</span><h2 id="prisoners-title">زندانیان</h2></div><small>{rows.length} نفر</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th aria-sort={prisonerSort === 'number' ? 'ascending' : 'none'}><button type="button" className={styles.sortHeader} onClick={() => setPrisonerSort('number')}>شمارهٔ زندانی{prisonerSort === 'number' ? <span aria-hidden="true">↑</span> : null}</button></th><th>نام</th><th>مبلغ مورد نیاز</th><th>کمک ثبت‌شده</th><th>واریز تأییدشده</th><th aria-sort={prisonerSort === 'remaining' ? 'ascending' : 'none'}><button type="button" className={styles.sortHeader} onClick={() => setPrisonerSort('remaining')}>ماندهٔ نیاز{prisonerSort === 'remaining' ? <span aria-hidden="true">↑</span> : null}</button></th><th>وضعیت</th><th /></tr></thead><tbody>
          {displayedRows.map(row => {
            const counted = registeredToman(row.totals)
            const excess = counted - row.neededToman
            const isOpen = selectedPrisoner === row.id
            const prisonerDonations = isOpen ? state.donations.filter(item => item.prisonerId === row.id) : []
            return <Fragment key={row.id}>
            <tr className={counted >= row.neededToman ? styles.completeRow : ''}>
              <td className={styles.numberCell}><button id={`prisoner-${row.id}`} type="button" className={styles.prisonerLink} aria-expanded={isOpen} onClick={() => togglePrisoner(row.id)}>{row.number}</button></td><td><button type="button" className={styles.prisonerLink} aria-expanded={isOpen} onClick={() => togglePrisoner(row.id)}>{row.name || '—'}</button>{row.note ? <small>{row.note}</small> : null}</td>
              <td>{formatToman(row.neededToman)}</td>
              <td><strong>{formatEuro(row.totals.recordedEuro + row.totals.confirmedEuro)}</strong><small>{formatToman(counted)}</small></td>
              <td><strong>{formatEuro(row.totals.confirmedEuro)}</strong><small>{formatToman(row.totals.confirmedToman)}</small></td>
              <td>{formatToman(Math.max(0, row.neededToman - counted))}</td>
              <td>{excess > 0 ? <span className={styles.warning}>بیش از نیاز: {formatToman(excess)}</span> : counted >= row.neededToman ? <span className={styles.complete}>تکمیل</span> : <span className={styles.pending}>در حال جمع‌آوری</span>}</td>
              <td>{mode === 'edit' ? <button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editPrisoner(row)}>ویرایش</button> : <button type="button" className={styles.textButton} aria-expanded={isOpen} onClick={() => togglePrisoner(row.id)}>{isOpen ? 'بستن جزئیات' : 'نمایش جزئیات'}</button>}</td>
            </tr>
            {isOpen ? <tr className={styles.detailRow}><td colSpan={8}>
              <div className={styles.prisonerDetail}>
                <div className={styles.detailHeading}><div><strong>کمک‌های زندانی شماره {row.number} · {row.name || '—'}</strong><span>{prisonerDonations.length} کمک ثبت‌شده</span></div><button type="button" className={styles.textButton} onClick={() => togglePrisoner(row.id)}>بستن</button></div>
                {prisonerDonations.length ? <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>مبلغ</th><th>وضعیت</th><th>تاریخ</th><th>مسیر / گیرنده</th>{mode === 'edit' ? <th /> : null}</tr></thead><tbody>{prisonerDonations.map(donation => {
                  const recipient = state.recipients.find(item => item.id === donation.recipientId)
                  return <tr key={donation.id}><td>{donation.donor || '—'}</td><td><strong>{formatEuro(donation.euroAmount)}</strong><small>{formatToman(donationToman(donation))}</small></td><td><span className={donation.status === 'confirmed' ? styles.complete : donation.status === 'recorded' ? styles.pending : styles.promise}>{statusLabels[donation.status]}</span></td><td>{donation.date || '—'}</td><td>{donation.channel === 'direct' ? 'مستقیم به حساب ستاد دیه' : recipient?.name || '—'}</td>{mode === 'edit' ? <td><button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editDonation(donation)}>ویرایش کمک</button></td> : null}</tr>
                })}</tbody></table></div> : <p className={styles.empty}>هنوز کمکی برای این زندانی ثبت نشده است.</p>}
                {mode === 'edit' && editingContext === 'prisoner' && editingDonation && state.donations.some(donation => donation.id === editingDonation && donation.prisonerId === row.id) ? <div id={`donation-editor-${row.id}`} className={styles.inlineEditor}><h3>ویرایش کمک</h3><form className={styles.form} onSubmit={saveDonation}>{donationFormFields()}</form></div> : null}
              </div>
            </td></tr> : null}
            </Fragment>
          })}
        </tbody></table></div>
        {!rows.length ? <p className={styles.empty}>هنوز زندانی ثبت نشده است.</p> : null}
      </section>

      <section className={styles.panel} aria-labelledby="recipients-title">
        <div className={styles.sectionTitle}><div><span>مبالغ دریافتی و واریز به ستاد دیه</span><h2 id="recipients-title">گزارش گیرنده‌ها</h2></div><small>{recipientRows.length} گیرنده</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th>گیرنده</th><th>یوروی دریافت‌شده</th><th>یوروی در انتظار دریافت</th><th>معادل کلِ ثبت‌شده، تومان</th><th>باید به ستاد دیه واریز کند</th><th>برای چند زندانی</th>{mode === 'edit' ? <th /> : null}</tr></thead><tbody>
          {recipientRows.map(recipient => {
            const isOpen = selectedRecipient === recipient.id
            const ledger = recipient.ledger
            return <Fragment key={recipient.id}>
              <tr><td><button type="button" className={styles.prisonerLink} aria-expanded={isOpen} onClick={() => toggleRecipient(recipient.id)}>{recipient.name}</button>{recipient.account ? <small>{recipient.account}</small> : null}</td>
                <td><strong>{formatEuro(ledger.confirmedEuro)}</strong></td>
                <td><strong>{formatEuro(ledger.pendingEuro)}</strong>{ledger.promisedEuro ? <small>شامل قول کمک: {formatEuro(ledger.promisedEuro)}</small> : null}<small>کل ثبت‌شده: {formatEuro(ledger.euro)}</small></td>
                <td>{formatToman(ledger.toman)}</td><td><strong>{formatToman(ledger.owedToman)}</strong>{ledger.promisedEuro ? <small>شامل قول کمک</small> : null}</td>
                <td>{ledger.cases.length} نفر</td>{mode === 'edit' ? <td><button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editRecipient(recipient)}>ویرایش نام و حساب</button></td> : null}
              </tr>
              {isOpen ? <tr className={styles.detailRow}><td colSpan={mode === 'edit' ? 7 : 6}><div className={styles.prisonerDetail}>
                <div className={styles.detailHeading}><div><strong>جزئیات گیرنده: {recipient.name}</strong><span>{formatEuro(ledger.confirmedEuro)} دریافت‌شده · {formatEuro(ledger.pendingEuro)} در انتظار دریافت · {formatToman(ledger.owedToman)} ماندهٔ واریز به ستاد دیه</span>{ledger.promisedEuro ? <span>قول کمکِ ثبت‌نشده: {formatEuro(ledger.promisedEuro)}</span> : null}</div><button type="button" className={styles.textButton} onClick={() => toggleRecipient(recipient.id)}>بستن</button></div>
                <h3 className={styles.subheading}>مبلغ مورد واریز برای هر زندانی</h3>
                {ledger.cases.length ? <div className={styles.tableWrap}><table><thead><tr><th>شماره و نام زندانی</th><th>یوروی دریافت‌شده</th><th>یوروی در انتظار دریافت</th><th>معادل تومان</th><th>ماندهٔ واریز به ستاد دیه</th></tr></thead><tbody>{ledger.cases.map(item => <tr key={item.prisonerId}><td><strong>شماره {item.number} · {item.name}</strong></td><td>{formatEuro(item.confirmedEuro)}</td><td>{formatEuro(item.pendingEuro)}</td><td>{formatToman(item.toman)}</td><td><strong>{formatToman(item.owedToman)}</strong></td></tr>)}</tbody></table></div> : <p className={styles.empty}>هنوز کمک ثبت‌شده‌ای برای این گیرنده وجود ندارد.</p>}
                <h3 className={styles.subheading}>ورودی‌های این گیرنده و نرخ تبدیل هر کمک</h3>
                {ledger.donations.length ? <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>زندانی</th><th>یورو</th><th>نرخ هر یورو</th><th>معادل تومان</th><th>وضعیت</th><th>واریز به ستاد دیه</th>{mode === 'edit' ? <th /> : null}</tr></thead><tbody>{ledger.donations.map(donation => {
                  const prisoner = state.prisoners.find(item => item.id === donation.prisonerId)
                  return <tr key={donation.id}><td>{donation.donor || '—'}</td><td>شماره {prisoner?.number || '—'} · {prisoner?.name || '—'}</td><td>{formatEuro(donation.euroAmount)}</td><td>{formatToman(donation.rateAtRecord)}</td><td>{formatToman(donationToman(donation))}</td><td>{statusLabels[donation.status]}</td><td>{donation.status === 'promised' ? 'هنوز دریافت نشده' : donation.settledToSetad ? 'واریز شده' : 'باید واریز شود'}</td>{mode === 'edit' ? <td><button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editDonation(donation, 'recipient')}>ویرایش نرخ و کمک</button></td> : null}</tr>
                })}</tbody></table></div> : null}
                {mode === 'edit' && editingContext === 'recipient' && editingDonation && ledger.donations.some(item => item.id === editingDonation) ? <div id={`recipient-editor-${recipient.id}`} className={styles.inlineEditor}><h3>ویرایش نرخ و کمک این گیرنده</h3><form className={styles.form} onSubmit={saveDonation}>{donationFormFields()}</form></div> : null}
              </div></td></tr> : null}
            </Fragment>
          })}
        </tbody></table></div>
        {!recipientRows.length ? <p className={styles.empty}>گیرنده‌ای ثبت نشده است.</p> : null}
      </section>

      {mode === 'report' ? <section className={styles.panel} aria-labelledby="donors-title">
        <div className={styles.sectionTitle}><div><span>جمع کمک‌های ثبت‌شده بر اساس نام؛ قول کمک جداگانه آمده است</span><h2 id="donors-title">گزارش کمک‌کنندگان</h2></div><small>{donorRows.length} نام</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>مبلغ کمک ثبت‌شده</th><th>واریز تأییدشده از این مبلغ</th><th>قول کمک، هنوز ثبت نشده</th><th>تعداد کمک</th><th>برای چند زندانی</th></tr></thead><tbody>
          {donorRows.map(row => <tr key={row.key || 'without-name'}><td><strong>{row.name}</strong></td><td><strong>{formatEuro(row.registeredEuro)}</strong><small>{formatToman(row.registeredToman)}</small></td><td><strong>{formatEuro(row.confirmedEuro)}</strong><small>{formatToman(row.confirmedToman)}</small></td><td>{row.promisedEuro ? <><strong>{formatEuro(row.promisedEuro)}</strong><small>{formatToman(row.promisedToman)}</small></> : '—'}</td><td>{row.donationCount}</td><td>{row.prisonerCount}</td></tr>)}
        </tbody></table></div>
        {!donorRows.length ? <p className={styles.empty}>هنوز کمکی ثبت نشده است.</p> : null}
      </section> : null}

      {mode === 'edit' ? <div className={styles.formsGrid}>
        <section className={styles.panel} id="prisoner-form"><div className={styles.sectionTitle}><div><span>اطلاعات پرونده</span><h2>{editingPrisoner ? 'ویرایش زندانی' : 'افزودن زندانی'}</h2></div></div>
          <form className={styles.form} onSubmit={savePrisoner}>
            <label>شمارهٔ زندانی<input required inputMode="numeric" value={prisonerForm.number} onChange={event => setPrisonerForm(current => ({ ...current, number: event.target.value }))} /></label>
            <label>نام (اگر ثبت شده)<input value={prisonerForm.name} onChange={event => setPrisonerForm(current => ({ ...current, name: event.target.value }))} /></label>
            <label>فقط مبلغ مورد نیاز، تومان<input required type="text" inputMode="numeric" value={prisonerForm.neededToman} onChange={event => setPrisonerForm(current => ({ ...current, neededToman: event.target.value }))} /></label>
            <label>توضیح<input value={prisonerForm.note} onChange={event => setPrisonerForm(current => ({ ...current, note: event.target.value }))} /></label>
            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            <div className={styles.formActions}><button type="submit" disabled={!onlineReady}>{editingPrisoner ? 'ذخیرهٔ تغییرات' : 'افزودن زندانی'}</button>{editingPrisoner ? <button type="button" className={styles.secondary} onClick={() => { setEditingPrisoner(''); setPrisonerForm(emptyPrisoner) }}>انصراف</button> : null}</div>
          </form>
        </section>
        <section className={styles.panel} id="recipient-form"><div className={styles.sectionTitle}><div><span>مسیر انتقال</span><h2>{editingRecipient ? 'ویرایش گیرنده' : 'گیرندگان واریز'}</h2></div></div>
          <form className={styles.form} onSubmit={saveRecipient}>
            <label>نام گیرنده<input required value={recipientForm.name} onChange={event => setRecipientForm(current => ({ ...current, name: event.target.value }))} /></label>
            <label>حساب یا شناسهٔ واریز<input value={recipientForm.account} onChange={event => setRecipientForm(current => ({ ...current, account: event.target.value }))} /></label>
            <label>توضیح<input value={recipientForm.note} onChange={event => setRecipientForm(current => ({ ...current, note: event.target.value }))} /></label>
            <div className={styles.formActions}><button type="submit" disabled={!onlineReady}>{editingRecipient ? 'ذخیرهٔ تغییرات' : 'افزودن گیرنده'}</button>{editingRecipient ? <button type="button" className={styles.secondary} onClick={() => { setEditingRecipient(''); setRecipientForm(emptyRecipient) }}>انصراف</button> : null}</div>
          </form>
          <div className={styles.recipientList}>{state.recipients.map(row => <div key={row.id}><span><strong>{row.name}</strong><small>{row.account || row.note || 'حساب ثبت نشده'}</small></span><button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editRecipient(row)}>ویرایش</button></div>)}{!state.recipients.length ? <p className={styles.empty}>گیرنده‌ای ثبت نشده است.</p> : null}</div>
        </section>
      </div> : null}

      {mode === 'edit' ? <section className={styles.panel} aria-labelledby="donations-title"><div className={styles.sectionTitle}><div><span>مرتب‌شده بر اساس کمک‌کننده</span><h2 id="donations-title">تاریخچهٔ کمک‌ها</h2></div><small>{historyDonations.length} مورد</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>زندانی</th><th>تاریخ</th><th>مبلغ ثبت‌شده</th><th>وضعیت</th><th>مسیر / گیرنده</th><th>توضیح</th>{mode === 'edit' ? <th /> : null}</tr></thead><tbody>
          {historyDonations.map(row => {
            const prisoner = state.prisoners.find(item => item.id === row.prisonerId)
            const recipient = state.recipients.find(item => item.id === row.recipientId)
            return <tr key={row.id}><td><strong>{row.donor || '—'}</strong></td><td><strong>{prisoner?.name || `شماره ${prisoner?.number || '—'}`}</strong><small>شماره {prisoner?.number || '—'}</small></td><td>{row.date || '—'}</td><td><strong>{formatEuro(row.euroAmount)}</strong><small>{formatToman(donationToman(row))}</small></td><td><span className={row.status === 'confirmed' ? styles.complete : row.status === 'recorded' ? styles.pending : styles.promise}>{statusLabels[row.status]}</span></td><td>{row.channel === 'direct' ? 'مستقیم به حساب ستاد دیه' : recipient?.name || '—'}</td><td>{row.note || '—'}</td>{mode === 'edit' ? <td><button type="button" className={styles.textButton} disabled={!onlineReady} onClick={() => editDonation(row)}>ویرایش</button></td> : null}</tr>
          })}
        </tbody></table></div>{!historyDonations.length ? <p className={styles.empty}>هنوز کمکی ثبت نشده است.</p> : null}
      </section> : null}
    </div>
  </main>
}
