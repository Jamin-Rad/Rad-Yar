'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatEuro, formatPersianDate, formatToman, makeFinanceId } from '../financeData'
import { useDigitDAFinance } from '../useDigitDAFinance'
import { neededToman, PRISONERS, TOTAL_NEEDED_RIAL } from './prisonerData'
import styles from './prisoners.module.css'

const number = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 })

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
  if (name === 'heart') return <svg {...common}><path d="M20.8 5.9c-1.8-1.9-4.8-1.9-6.7 0L12 8l-2.1-2.1a4.6 4.6 0 0 0-6.7 6.3L12 21l8.8-8.8a4.6 4.6 0 0 0 0-6.3Z" /></svg>
  return <svg {...common}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
}

function initialForm(prisonerId = PRISONERS[0].id) {
  return {
    prisonerId,
    donor: '',
    amount: '',
    currency: 'eur',
    destinationAccount: 'toranj',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  }
}

export default function PrisonerAidPage() {
  const { state, setState, loaded, saveStatus, saveNow } = useDigitDAFinance()
  const aid = state.prisonerAid
  const payments = aid?.payments || []
  const rate = Math.max(1, Number(aid?.tomanPerEuro || 270000))
  const [form, setForm] = useState(() => initialForm())
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [notice, setNotice] = useState('')

  const collectedByPrisoner = useMemo(() => {
    const totals = new Map()
    payments.forEach(payment => totals.set(Number(payment.prisonerId), (totals.get(Number(payment.prisonerId)) || 0) + Number(payment.tomanAmount || 0)))
    return totals
  }, [payments])

  const rows = useMemo(() => PRISONERS.map(prisoner => {
    const collected = collectedByPrisoner.get(prisoner.id) || 0
    const need = neededToman(prisoner)
    return { ...prisoner, collected, remaining: Math.max(need - collected, 0), progress: Math.min(collected / need * 100, 100) }
  }), [collectedByPrisoner])

  const filteredRows = useMemo(() => rows.filter(prisoner => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${prisoner.name} ${prisoner.fatherName} ${prisoner.nationalId} ${prisoner.prison}`.toLowerCase().includes(query)
    const matchesStatus = status === 'all' || (status === 'complete' ? prisoner.remaining === 0 : prisoner.remaining > 0)
    return matchesSearch && matchesStatus
  }), [rows, search, status])

  const totalCollected = payments.reduce((sum, payment) => sum + Number(payment.tomanAmount || 0), 0)
  const totalNeeded = TOTAL_NEEDED_RIAL / 10
  const assistedCount = collectedByPrisoner.size
  const amount = Number(form.amount || 0)
  const tomanEquivalent = form.currency === 'eur' ? amount * rate : amount
  const euroEquivalent = form.currency === 'eur' ? amount : amount / rate
  const selectedPrisoner = PRISONERS.find(prisoner => prisoner.id === Number(form.prisonerId))

  function updateRate(value) {
    const nextRate = Math.max(1, Number(value || 1))
    setState(previous => ({ ...previous, prisonerAid: { ...previous.prisonerAid, tomanPerEuro: nextRate } }))
  }

  function choosePrisoner(prisonerId) {
    setForm(previous => ({ ...previous, prisonerId }))
    document.getElementById('aid-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function submit(event) {
    event.preventDefault()
    setNotice('')
    if (!form.donor.trim() || amount <= 0) return
    const payment = {
      id: makeFinanceId(),
      prisonerId: Number(form.prisonerId),
      donor: form.donor.trim(),
      amount,
      currency: form.currency,
      paymentMethod: form.currency === 'eur' ? 'euro' : 'toman',
      destinationAccount: form.destinationAccount,
      exchangeRate: rate,
      euroAmount: euroEquivalent,
      tomanAmount: tomanEquivalent,
      date: form.date,
      note: form.note.trim(),
    }
    await saveNow({ ...state, prisonerAid: { ...aid, tomanPerEuro: rate, payments: [...payments, payment] } })
    setForm(initialForm(form.prisonerId))
    setNotice('کمک با موفقیت ثبت شد.')
  }

  async function removePayment(paymentId) {
    await saveNow({ ...state, prisonerAid: { ...aid, tomanPerEuro: rate, payments: payments.filter(payment => payment.id !== paymentId) } })
  }

  const recentPayments = payments.toSorted((a, b) => b.date.localeCompare(a.date))

  return <main className={styles.page} dir="rtl">
    <header className={styles.topbar}>
      <Link className={styles.logo} href="/digitda" lang="en" dir="ltr">Digit<span>DA</span></Link>
      <nav aria-label="بخش‌های مالی">
        <Link href="/digitda">داشبورد مالی</Link>
        <span className={styles.navActive}>کمک به زندانیان</span>
      </nav>
      <div className={styles.headerActions}><span><i />{loaded ? saveStatus : 'در حال بارگذاری…'}</span><Link href="/digitda">بازگشت <Icon name="back" /></Link></div>
    </header>

    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}><Icon name="heart" /><div><p>فهرست زندانیان جرائم غیرعمد استان فارس</p><h1>کمک‌ها، شفاف و قابل پیگیری</h1><span>مبلغ باقی‌مانده هر پرونده از ستون «مبلغ مورد نیاز» در PDF محاسبه شده است.</span></div></div>
        <label className={styles.rateControl}>نرخ قابل ویرایش یورو <span><input aria-label="قیمت هر یورو به تومان" min="1" step="1000" type="number" value={rate} onChange={event => updateRate(event.target.value)} /><b>تومان</b></span><small>این نرخ فقط برای این صفحه و تبدیل کمک‌هاست.</small></label>
      </section>

      <section className={styles.stats} aria-label="خلاصه کمک‌ها">
        <div><span>کل مبلغ مورد نیاز</span><strong>{formatToman(totalNeeded)}</strong><small>{formatEuro(totalNeeded / rate, 2)}</small></div>
        <div><span>کمک ثبت‌شده</span><strong className={styles.blue}>{formatToman(totalCollected)}</strong><small>{formatEuro(totalCollected / rate, 2)}</small></div>
        <div><span>مانده برای تأمین</span><strong>{formatToman(Math.max(totalNeeded - totalCollected, 0))}</strong><small>{formatEuro(Math.max(totalNeeded - totalCollected, 0) / rate, 2)}</small></div>
        <div><span>پرونده‌های کمک‌شده</span><strong className={styles.lime}>{number.format(assistedCount)} از {number.format(PRISONERS.length)}</strong><small>بر اساس پرداخت‌های ثبت‌شده</small></div>
      </section>

      <div className={styles.workspace}>
        <section className={styles.listSection}>
          <div className={styles.sectionHead}><div><p>۲۰ پرونده از سند ارائه‌شده</p><h2>بدهی باقی‌مانده زندانیان</h2></div><div className={styles.filters}><label><Icon name="search" /><input aria-label="جستجوی زندانی" value={search} onChange={event => setSearch(event.target.value)} placeholder="نام، کد ملی یا زندان…" /></label><select aria-label="فیلتر وضعیت" value={status} onChange={event => setStatus(event.target.value)}><option value="all">همه پرونده‌ها</option><option value="open">دارای مانده</option><option value="complete">تکمیل‌شده</option></select></div></div>
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>زندانی</th><th>بدهی کل سند</th><th>مبلغ مورد نیاز</th><th>کمک ثبت‌شده</th><th>مانده</th><th>پیشرفت</th><th /></tr></thead>
              <tbody>{filteredRows.map(prisoner => <tr key={prisoner.id}><td><strong>{prisoner.name}</strong><small>فرزند {prisoner.fatherName} · {prisoner.nationalId}<br />{prisoner.prison}</small></td><td>{formatToman(prisoner.totalDebtRial / 10)}</td><td><strong>{formatToman(neededToman(prisoner))}</strong><small>{formatEuro(neededToman(prisoner) / rate, 2)}</small></td><td className={styles.collected}>{formatToman(prisoner.collected)}</td><td>{formatToman(prisoner.remaining)}</td><td><div className={styles.progress}><i style={{ width: `${prisoner.progress}%` }} /></div><small>{number.format(prisoner.progress)}٪</small></td><td><button type="button" onClick={() => choosePrisoner(prisoner.id)}><Icon name="plus" /> ثبت کمک</button></td></tr>)}</tbody>
            </table>
          </div>
          {!filteredRows.length ? <p className={styles.empty}>پرونده‌ای با این مشخصات پیدا نشد.</p> : null}
        </section>

        <aside className={styles.formPanel} id="aid-form">
          <div className={styles.formTitle}><span>ثبت پرداخت</span><h2>{selectedPrisoner?.name}</h2><p>مانده فعلی: {formatToman(rows.find(row => row.id === selectedPrisoner?.id)?.remaining || 0)}</p></div>
          <form onSubmit={submit}>
            <label>انتخاب زندانی<select required value={form.prisonerId} onChange={event => setForm(previous => ({ ...previous, prisonerId: Number(event.target.value) }))}>{PRISONERS.map(prisoner => <option key={prisoner.id} value={prisoner.id}>{number.format(prisoner.id)} · {prisoner.name}</option>)}</select></label>
            <label>نام پرداخت‌کننده<input required value={form.donor} onChange={event => setForm(previous => ({ ...previous, donor: event.target.value }))} placeholder="نام شخص یا گروه" /></label>
            <fieldset><legend>نحوه پرداخت</legend><div className={styles.choiceGrid}><button type="button" className={form.currency === 'eur' ? styles.activeChoice : ''} onClick={() => setForm(previous => ({ ...previous, currency: 'eur' }))}>پرداخت یورو</button><button type="button" className={form.currency === 'toman' ? styles.activeChoice : ''} onClick={() => setForm(previous => ({ ...previous, currency: 'toman' }))}>پرداخت تومان</button></div></fieldset>
            <label>مبلغ ({form.currency === 'eur' ? 'یورو' : 'تومان'})<input required min="0" step={form.currency === 'eur' ? '.01' : '1000'} type="number" value={form.amount} onChange={event => setForm(previous => ({ ...previous, amount: event.target.value }))} /></label>
            <div className={styles.equivalent}><span>معادل با نرخ {formatToman(rate)}</span><strong>{form.currency === 'eur' ? formatToman(tomanEquivalent) : formatEuro(euroEquivalent, 2)}</strong></div>
            <fieldset><legend>واریز به حساب</legend><div className={styles.choiceGrid}><button type="button" className={form.destinationAccount === 'toranj' ? styles.activeChoice : ''} onClick={() => setForm(previous => ({ ...previous, destinationAccount: 'toranj' }))}>ترنج</button><button type="button" className={form.destinationAccount === 'fatemeh' ? styles.activeChoice : ''} onClick={() => setForm(previous => ({ ...previous, destinationAccount: 'fatemeh' }))}>فاطمه</button></div></fieldset>
            <label>تاریخ پرداخت<input required type="date" value={form.date} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))} /></label>
            <label>توضیحات<input value={form.note} onChange={event => setForm(previous => ({ ...previous, note: event.target.value }))} placeholder="اختیاری؛ شماره پیگیری یا توضیح کوتاه" /></label>
            {notice ? <p className={styles.success} role="status">{notice}</p> : null}
            <button className={styles.submit} type="submit"><Icon name="plus" /> ذخیره کمک</button>
          </form>
        </aside>
      </div>

      <section className={styles.history}>
        <div className={styles.sectionHead}><div><p>ریز پرداخت‌ها</p><h2>چه کسی، چقدر و به کدام حساب</h2></div></div>
        <div className={styles.tableWrap}><table><thead><tr><th>تاریخ</th><th>پرداخت‌کننده</th><th>زندانی</th><th>مبلغ پرداخت</th><th>معادل</th><th>نحوه پرداخت</th><th>حساب مقصد</th><th /></tr></thead><tbody>{recentPayments.map(payment => { const prisoner = PRISONERS.find(item => item.id === Number(payment.prisonerId)); return <tr key={payment.id}><td>{formatPersianDate(payment.date)}</td><td><strong>{payment.donor}</strong><small>{payment.note}</small></td><td>{prisoner?.name || '—'}</td><td>{payment.currency === 'eur' ? formatEuro(payment.amount, 2) : formatToman(payment.amount)}</td><td>{payment.currency === 'eur' ? formatToman(payment.tomanAmount) : formatEuro(payment.euroAmount, 2)}<small>نرخ: {formatToman(payment.exchangeRate)}</small></td><td>{payment.paymentMethod === 'euro' ? 'پرداخت یورو' : 'پرداخت تومان'}</td><td>{payment.destinationAccount === 'toranj' ? 'ترنج' : 'فاطمه'}</td><td><button className={styles.delete} type="button" onClick={() => removePayment(payment.id)} aria-label={`حذف کمک ${payment.donor}`}>×</button></td></tr>})}</tbody></table></div>
        {!recentPayments.length ? <p className={styles.empty}>هنوز کمکی ثبت نشده است.</p> : null}
      </section>
    </div>
  </main>
}
