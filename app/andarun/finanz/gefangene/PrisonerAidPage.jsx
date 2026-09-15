'use client'

import Link from 'next/link'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { DEFAULT_RATE, EMPTY_STATE, STORAGE_KEY, formatEuro, formatToman, normalizeState, totalsFor } from './aidData'
import { mergeScreenshotSeed } from './screenshotSeed'
import styles from './page.module.css'

const today = () => new Date().toISOString().slice(0, 10)
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
const emptyPrisoner = { number: '', name: '', neededToman: '', note: '' }
const emptyRecipient = { name: '', account: '', note: '' }
const emptyDonation = { prisonerId: '', donor: '', amount: '', originalCurrency: 'eur', status: 'recorded', channel: 'recipient', recipientId: '', date: today(), note: '' }
const statusLabels = { promised: 'قول کمک', recorded: 'کمک ثبت‌شده', confirmed: 'واریز تأییدشده' }
const donorCollator = new Intl.Collator('fa', { sensitivity: 'base' })
const registeredToman = totals => totals.recordedToman + totals.confirmedToman

export default function PrisonerAidPage() {
  const [state, setState] = useState(EMPTY_STATE)
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState('در حال بارگذاری…')
  const [prisonerForm, setPrisonerForm] = useState(emptyPrisoner)
  const [recipientForm, setRecipientForm] = useState(emptyRecipient)
  const [donationForm, setDonationForm] = useState(emptyDonation)
  const [editingPrisoner, setEditingPrisoner] = useState('')
  const [editingRecipient, setEditingRecipient] = useState('')
  const [editingDonation, setEditingDonation] = useState('')
  const [selectedPrisoner, setSelectedPrisoner] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      let local = EMPTY_STATE
      try { local = normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')) } catch {}
      try {
        const response = await fetch('/api/andarun/prisoner-aid', { cache: 'no-store' })
        if (!response.ok) throw new Error('remote load failed')
        const result = await response.json()
        if (!active) return
        setState(mergeScreenshotSeed(result.state ? normalizeState(result.state) : local))
        setSaveStatus(result.localOnly ? 'ذخیره در همین دستگاه' : 'آمادهٔ ذخیره')
      } catch {
        if (!active) return
        setState(mergeScreenshotSeed(local))
        setSaveStatus('ذخیره در همین دستگاه')
      }
      if (active) setLoaded(true)
    }
    load()
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setSaveStatus('در حال ذخیره…')
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/andarun/prisoner-aid', {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state }),
        })
        if (!response.ok) throw new Error('save failed')
        const result = await response.json()
        setSaveStatus(result.localOnly ? 'ذخیره در همین دستگاه' : 'ذخیره شد')
      } catch { setSaveStatus('ذخیره در همین دستگاه') }
    }, 600)
    return () => clearTimeout(timer)
  }, [state, loaded])

  const rows = useMemo(() => state.prisoners.map(prisoner => ({
    ...prisoner, totals: totalsFor(prisoner.id, state.donations),
  })), [state.prisoners, state.donations])
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

  function savePrisoner(event) {
    event.preventDefault()
    const number = prisonerForm.number.trim()
    const name = prisonerForm.name.trim()
    const neededToman = Number(prisonerForm.neededToman)
    if (!number || !Number.isFinite(neededToman) || neededToman <= 0) return
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
    if (!recipientForm.name.trim()) return
    const row = { id: editingRecipient || makeId(), name: recipientForm.name.trim(), account: recipientForm.account.trim(), note: recipientForm.note.trim() }
    setState(current => ({ ...current, recipients: editingRecipient ? current.recipients.map(item => item.id === editingRecipient ? row : item) : [...current.recipients, row] }))
    setRecipientForm(emptyRecipient); setEditingRecipient('')
  }

  function saveDonation(event) {
    event.preventDefault()
    const amount = Number(donationForm.amount)
    if (!state.prisoners.some(row => row.id === donationForm.prisonerId) || !Number.isFinite(amount) || amount <= 0) return
    const previous = state.donations.find(row => row.id === editingDonation)
    const rateAtRecord = previous?.rateAtRecord || state.tomanPerEuro
    const originalCurrency = donationForm.originalCurrency
    const tomanAmount = originalCurrency === 'toman' ? amount : 0
    const euroAmount = originalCurrency === 'toman' ? amount / rateAtRecord : amount
    const row = {
      id: editingDonation || makeId(), prisonerId: donationForm.prisonerId, donor: donationForm.donor.trim(),
      euroAmount, rateAtRecord, tomanAmount, originalCurrency,
      status: donationForm.status, channel: donationForm.channel,
      recipientId: donationForm.channel === 'direct' ? '' : donationForm.recipientId,
      date: donationForm.date, note: donationForm.note.trim(),
    }
    setState(current => ({ ...current, donations: editingDonation ? current.donations.map(item => item.id === editingDonation ? row : item) : [...current.donations, row] }))
    if (editingDonation) setSelectedPrisoner(row.prisonerId)
    setDonationForm(emptyDonation); setEditingDonation('')
  }

  function editPrisoner(row) {
    setEditingPrisoner(row.id); setPrisonerForm({ number: row.number, name: row.name, neededToman: row.neededToman, note: row.note });
    document.getElementById('prisoner-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  function editRecipient(row) {
    setEditingRecipient(row.id); setRecipientForm({ name: row.name, account: row.account, note: row.note });
    document.getElementById('recipient-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  function editDonation(row) {
    setSelectedPrisoner(row.prisonerId)
    setEditingDonation(row.id); setDonationForm({ prisonerId: row.prisonerId, donor: row.donor,
      amount: row.originalCurrency === 'toman' ? row.tomanAmount : row.euroAmount,
      originalCurrency: row.originalCurrency || 'eur',
      status: row.status, channel: row.channel, recipientId: row.recipientId, date: row.date, note: row.note });
    requestAnimationFrame(() => document.getElementById(`donation-editor-${row.prisonerId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function togglePrisoner(prisonerId) {
    setSelectedPrisoner(current => current === prisonerId ? '' : prisonerId)
    setEditingDonation('')
    setDonationForm(emptyDonation)
  }

  function donationFormFields() {
    const editingRate = state.donations.find(row => row.id === editingDonation)?.rateAtRecord || state.tomanPerEuro
    return <>
      <label>زندانی<select required value={donationForm.prisonerId} onChange={event => setDonationForm(current => ({ ...current, prisonerId: event.target.value }))}><option value="">انتخاب کنید</option>{state.prisoners.map(row => <option value={row.id} key={row.id}>{row.number}{row.name ? ` · ${row.name}` : ''}</option>)}</select></label>
      <label>نام کمک‌کننده<input value={donationForm.donor} onChange={event => setDonationForm(current => ({ ...current, donor: event.target.value }))} /></label>
      <label>ارز مبلغ اصلی<select value={donationForm.originalCurrency} onChange={event => setDonationForm(current => ({ ...current, originalCurrency: event.target.value, amount: '' }))}><option value="eur">یورو</option><option value="toman">تومان</option></select></label>
      <label>مبلغ کمک، {donationForm.originalCurrency === 'toman' ? 'تومان' : 'یورو'}<input required type="number" min={donationForm.originalCurrency === 'toman' ? '1' : '0.01'} step={donationForm.originalCurrency === 'toman' ? '1' : '0.01'} value={donationForm.amount} onChange={event => setDonationForm(current => ({ ...current, amount: event.target.value }))} /></label>
      <label>وضعیت<select value={donationForm.status} onChange={event => setDonationForm(current => ({ ...current, status: event.target.value }))}><option value="promised">گفته واریز می‌کند</option><option value="recorded">کمک ثبت شده، منتظر تأیید</option><option value="confirmed">واریز تأیید شده</option></select></label>
      <label>مسیر واریز<select value={donationForm.channel} onChange={event => setDonationForm(current => ({ ...current, channel: event.target.value, recipientId: '' }))}><option value="recipient">از طریق گیرنده</option><option value="direct">مستقیم به حساب ستاد دیه</option></select></label>
      {donationForm.channel === 'recipient' ? <label>گیرنده<select value={donationForm.recipientId} onChange={event => setDonationForm(current => ({ ...current, recipientId: event.target.value }))}><option value="">هنوز مشخص نیست</option>{state.recipients.map(row => <option value={row.id} key={row.id}>{row.name}</option>)}</select></label> : null}
      <label>تاریخ<input type="date" value={donationForm.date} onChange={event => setDonationForm(current => ({ ...current, date: event.target.value }))} /></label>
      <label>توضیح<input value={donationForm.note} onChange={event => setDonationForm(current => ({ ...current, note: event.target.value }))} /></label>
      <div className={styles.equivalent}><span>معادل کمک</span><strong>{formatEuro(donationForm.originalCurrency === 'toman' ? (Number(donationForm.amount) || 0) / editingRate : Number(donationForm.amount) || 0)}</strong><strong>{formatToman(donationForm.originalCurrency === 'toman' ? Number(donationForm.amount) || 0 : (Number(donationForm.amount) || 0) * editingRate)}</strong></div>
      <div className={styles.formActions}><button type="submit" disabled={!state.prisoners.length}>{editingDonation ? 'ذخیرهٔ تغییرات' : 'ثبت کمک'}</button>{editingDonation ? <button type="button" className={styles.secondary} onClick={() => { setEditingDonation(''); setDonationForm(emptyDonation) }}>انصراف</button> : null}</div>
    </>
  }

  return <main className={styles.page} dir="rtl">
    <div className={styles.shell}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Andarun / Finanzen</p><h1>کمک به زندانیان</h1><p>ثبت نیازها، کمک‌ها و وضعیت واریز هر زندانی</p></div>
        <div className={styles.headerSide}><Link href="/andarun">بازگشت به اندرون ←</Link><span>{saveStatus}</span></div>
      </header>

      <section className={styles.rateBand} aria-label="نرخ پایه یورو">
        <div><span>نرخ پایهٔ یورو</span><strong>{formatToman(state.tomanPerEuro)}</strong><small>معادل تومان هر کمک با نرخ زمان ثبت آن ثابت می‌ماند.</small></div>
        <label>ویرایش نرخ برای کمک‌های جدید <input type="number" min="1" step="1000" value={state.tomanPerEuro} onChange={event => setState(current => ({ ...current, tomanPerEuro: Number(event.target.value) || DEFAULT_RATE }))} /></label>
      </section>

      <section className={styles.metrics} aria-label="خلاصه کمک‌ها">
        <div><span>مبلغ مورد نیاز</span><strong>{formatToman(summary.needed)}</strong></div>
        <div><span>کمک ثبت‌شده</span><strong>{formatToman(summary.registered)}</strong></div>
        <div><span>واریز تأییدشده</span><strong>{formatToman(summary.confirmed)}</strong></div>
        <div><span>زندانی تکمیل‌شده</span><strong>{new Intl.NumberFormat('fa-IR').format(summary.complete)}</strong></div>
      </section>

      <section className={styles.panel} aria-labelledby="prisoners-title">
        <div className={styles.sectionTitle}><div><span>فهرست اصلی</span><h2 id="prisoners-title">زندانیان</h2></div><small>{rows.length} نفر</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th>شمارهٔ زندانی</th><th>نام</th><th>مبلغ مورد نیاز</th><th>کمک ثبت‌شده</th><th>واریز تأییدشده</th><th>ماندهٔ نیاز</th><th>وضعیت</th><th /></tr></thead><tbody>
          {rows.map(row => {
            const counted = registeredToman(row.totals)
            const excess = counted - row.neededToman
            const isOpen = selectedPrisoner === row.id
            const prisonerDonations = isOpen ? state.donations.filter(item => item.prisonerId === row.id) : []
            return <Fragment key={row.id}>
            <tr className={excess > 0 ? styles.overRow : ''}>
              <td className={styles.numberCell}><button id={`prisoner-${row.id}`} type="button" className={styles.prisonerLink} aria-expanded={isOpen} onClick={() => togglePrisoner(row.id)}>{row.number}</button></td><td><button type="button" className={styles.prisonerLink} aria-expanded={isOpen} onClick={() => togglePrisoner(row.id)}>{row.name || '—'}</button>{row.note ? <small>{row.note}</small> : null}</td>
              <td>{formatToman(row.neededToman)}</td>
              <td><strong>{formatEuro(row.totals.recordedEuro + row.totals.confirmedEuro)}</strong><small>{formatToman(counted)}</small></td>
              <td><strong>{formatEuro(row.totals.confirmedEuro)}</strong><small>{formatToman(row.totals.confirmedToman)}</small></td>
              <td>{formatToman(Math.max(0, row.neededToman - counted))}</td>
              <td>{excess > 0 ? <span className={styles.warning}>بیش از نیاز: {formatToman(excess)}</span> : counted >= row.neededToman ? <span className={styles.complete}>تکمیل</span> : <span className={styles.pending}>در حال جمع‌آوری</span>}</td>
              <td><button type="button" className={styles.textButton} onClick={() => editPrisoner(row)}>ویرایش</button></td>
            </tr>
            {isOpen ? <tr className={styles.detailRow}><td colSpan={8}>
              <div className={styles.prisonerDetail}>
                <div className={styles.detailHeading}><div><strong>کمک‌های زندانی شماره {row.number} · {row.name || '—'}</strong><span>{prisonerDonations.length} کمک ثبت‌شده</span></div><button type="button" className={styles.textButton} onClick={() => togglePrisoner(row.id)}>بستن</button></div>
                {prisonerDonations.length ? <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>مبلغ</th><th>وضعیت</th><th>تاریخ</th><th>مسیر / گیرنده</th><th /></tr></thead><tbody>{prisonerDonations.map(donation => {
                  const recipient = state.recipients.find(item => item.id === donation.recipientId)
                  return <tr key={donation.id}><td>{donation.donor || '—'}</td><td><strong>{formatEuro(donation.euroAmount)}</strong><small>{formatToman(donation.originalCurrency === 'toman' && donation.tomanAmount > 0 ? donation.tomanAmount : donation.euroAmount * donation.rateAtRecord)}</small></td><td><span className={donation.status === 'confirmed' ? styles.complete : donation.status === 'recorded' ? styles.pending : styles.promise}>{statusLabels[donation.status]}</span></td><td>{donation.date || '—'}</td><td>{donation.channel === 'direct' ? 'مستقیم به حساب ستاد دیه' : recipient?.name || 'گیرنده نامشخص'}</td><td><button type="button" className={styles.textButton} onClick={() => editDonation(donation)}>ویرایش کمک</button></td></tr>
                })}</tbody></table></div> : <p className={styles.empty}>هنوز کمکی برای این زندانی ثبت نشده است.</p>}
                {editingDonation && state.donations.some(donation => donation.id === editingDonation && donation.prisonerId === row.id) ? <div id={`donation-editor-${row.id}`} className={styles.inlineEditor}><h3>ویرایش کمک</h3><form className={styles.form} onSubmit={saveDonation}>{donationFormFields()}</form></div> : null}
              </div>
            </td></tr> : null}
            </Fragment>
          })}
        </tbody></table></div>
        {!rows.length ? <p className={styles.empty}>هنوز زندانی ثبت نشده است.</p> : null}
      </section>

      <div className={styles.formsGrid}>
        <section className={styles.panel} id="prisoner-form"><div className={styles.sectionTitle}><div><span>اطلاعات پرونده</span><h2>{editingPrisoner ? 'ویرایش زندانی' : 'افزودن زندانی'}</h2></div></div>
          <form className={styles.form} onSubmit={savePrisoner}>
            <label>شمارهٔ زندانی<input required value={prisonerForm.number} onChange={event => setPrisonerForm(current => ({ ...current, number: event.target.value }))} /></label>
            <label>نام (اگر ثبت شده)<input value={prisonerForm.name} onChange={event => setPrisonerForm(current => ({ ...current, name: event.target.value }))} /></label>
            <label>فقط مبلغ مورد نیاز، تومان<input required type="number" min="1" value={prisonerForm.neededToman} onChange={event => setPrisonerForm(current => ({ ...current, neededToman: event.target.value }))} /></label>
            <label>توضیح<input value={prisonerForm.note} onChange={event => setPrisonerForm(current => ({ ...current, note: event.target.value }))} /></label>
            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            <div className={styles.formActions}><button type="submit">{editingPrisoner ? 'ذخیرهٔ تغییرات' : 'افزودن زندانی'}</button>{editingPrisoner ? <button type="button" className={styles.secondary} onClick={() => { setEditingPrisoner(''); setPrisonerForm(emptyPrisoner) }}>انصراف</button> : null}</div>
          </form>
        </section>
        <section className={styles.panel} id="recipient-form"><div className={styles.sectionTitle}><div><span>مسیر انتقال</span><h2>{editingRecipient ? 'ویرایش گیرنده' : 'گیرندگان واریز'}</h2></div></div>
          <form className={styles.form} onSubmit={saveRecipient}>
            <label>نام گیرنده<input required value={recipientForm.name} onChange={event => setRecipientForm(current => ({ ...current, name: event.target.value }))} /></label>
            <label>حساب یا شناسهٔ واریز<input value={recipientForm.account} onChange={event => setRecipientForm(current => ({ ...current, account: event.target.value }))} /></label>
            <label>توضیح<input value={recipientForm.note} onChange={event => setRecipientForm(current => ({ ...current, note: event.target.value }))} /></label>
            <div className={styles.formActions}><button type="submit">{editingRecipient ? 'ذخیرهٔ تغییرات' : 'افزودن گیرنده'}</button>{editingRecipient ? <button type="button" className={styles.secondary} onClick={() => { setEditingRecipient(''); setRecipientForm(emptyRecipient) }}>انصراف</button> : null}</div>
          </form>
          <div className={styles.recipientList}>{state.recipients.map(row => <div key={row.id}><span><strong>{row.name}</strong><small>{row.account || row.note || 'حساب ثبت نشده'}</small></span><button type="button" className={styles.textButton} onClick={() => editRecipient(row)}>ویرایش</button></div>)}{!state.recipients.length ? <p className={styles.empty}>گیرنده‌ای ثبت نشده است.</p> : null}</div>
        </section>
      </div>

      <section className={styles.panel} id="donation-form"><div className={styles.sectionTitle}><div><span>دفتر کمک‌ها</span><h2>ثبت کمک</h2></div></div>
        {editingDonation ? <p className={styles.empty}>فرم ویرایش کمک در پروندهٔ زندانی باز است.</p> : <form className={styles.form} onSubmit={saveDonation}>{donationFormFields()}</form>}
      </section>

      <section className={styles.panel} aria-labelledby="donations-title"><div className={styles.sectionTitle}><div><span>مرتب‌شده بر اساس کمک‌کننده</span><h2 id="donations-title">تاریخچهٔ کمک‌ها</h2></div><small>{historyDonations.length} مورد</small></div>
        <div className={styles.tableWrap}><table><thead><tr><th>کمک‌کننده</th><th>زندانی</th><th>تاریخ</th><th>مبلغ ثبت‌شده</th><th>وضعیت</th><th>مسیر / گیرنده</th><th>توضیح</th><th /></tr></thead><tbody>
          {historyDonations.map(row => {
            const prisoner = state.prisoners.find(item => item.id === row.prisonerId)
            const recipient = state.recipients.find(item => item.id === row.recipientId)
            return <tr key={row.id}><td><strong>{row.donor || '—'}</strong></td><td><strong>{prisoner?.name || `شماره ${prisoner?.number || '—'}`}</strong><small>شماره {prisoner?.number || '—'}</small></td><td>{row.date || '—'}</td><td><strong>{formatEuro(row.euroAmount)}</strong><small>{formatToman(row.originalCurrency === 'toman' && row.tomanAmount > 0 ? row.tomanAmount : row.euroAmount * row.rateAtRecord)}</small></td><td><span className={row.status === 'confirmed' ? styles.complete : row.status === 'recorded' ? styles.pending : styles.promise}>{statusLabels[row.status]}</span></td><td>{row.channel === 'direct' ? 'مستقیم به حساب ستاد دیه' : recipient?.name || 'گیرنده نامشخص'}</td><td>{row.note || '—'}</td><td><button type="button" className={styles.textButton} onClick={() => editDonation(row)}>ویرایش</button></td></tr>
          })}
        </tbody></table></div>{!historyDonations.length ? <p className={styles.empty}>هنوز کمکی ثبت نشده است.</p> : null}
      </section>
    </div>
  </main>
}
