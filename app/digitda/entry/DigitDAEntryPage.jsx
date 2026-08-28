'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './entry.module.css'
import { entryEuroValue, formatEuro, formatPersianDate, formatToman, makeFinanceId, serviceFor } from '../financeData'
import { useDigitDAFinance } from '../useDigitDAFinance'

const MODES = {
  iran: { title: 'ثبت هزینه ایران', subtitle: 'هزینه‌های انجام‌شده در ایران را به تومان ثبت و تسویه کنید.', location: 'iran', currency: 'toman' },
  germany: { title: 'ثبت هزینه آلمان', subtitle: 'هزینه‌های انجام‌شده در آلمان را به یورو ثبت کنید.', location: 'germany', currency: 'eur' },
  income: { title: 'ثبت درآمد', subtitle: 'سفارش، تعداد و مبلغ دریافتی شرکت را ثبت کنید.' },
}

const TABS = [['iran','هزینه ایران'],['germany','هزینه آلمان'],['income','درآمد']]
const iranCategories = ['حقوق', 'فریلنسر', 'اجاره و دفتر', 'نرم‌افزار و اشتراک‌ها', 'بازاریابی', 'رفت‌وآمد', 'سایر']
const germanyCategories = ['نرم‌افزار و اشتراک‌ها', 'سخت‌افزار', 'اجاره و دفتر', 'بازاریابی', 'مشاوره مالیاتی', 'بیمه', 'سایر']
const number = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 })

function initialForm(type, services) {
  const date = new Date().toISOString().slice(0, 10)
  if (type === 'income') return { date, serviceId: services[0]?.id || '', quantity: 1, unitPrice: services[0]?.price || '', note: '', account: 'germany' }
  return { date, category: (type === 'iran' ? iranCategories : germanyCategories)[0], amount: '', note: '', account: type === 'iran' ? 'iran' : 'germany', settled: type === 'germany', exchangeRate: '', rateSource: 'manual', rateUpdatedAt: '' }
}

export default function DigitDAEntryPage({ type }) {
  const mode = MODES[type]
  const { state, loaded, saveStatus, saveNow } = useDigitDAFinance()
  const [form, setForm] = useState(() => initialForm(type, []))
  const [rateLoading, setRateLoading] = useState(false)
  const [rateError, setRateError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')

  const firstServiceId = state.services[0]?.id
  const firstServicePrice = state.services[0]?.price

  useEffect(() => {
    if (loaded && type === 'income' && !form.serviceId && firstServiceId) {
      setForm(previous => ({ ...previous, serviceId: firstServiceId, unitPrice: firstServicePrice }))
    }
  }, [loaded, type, form.serviceId, firstServiceId, firstServicePrice])

  const needsRate = type === 'iran'
    ? form.account === 'germany' || form.settled
    : type === 'germany' && form.account === 'iran'
  const rate = Number(form.exchangeRate || 0)
  const amount = Number(form.amount || 0)
  const euroEquivalent = type === 'iran' && rate > 0 ? amount / rate : type === 'germany' ? amount : 0
  const tomanEquivalent = type === 'germany' && rate > 0 ? amount * rate : type === 'iran' ? amount : 0

  const history = useMemo(() => state.entries.filter(entry => {
    const matchesType = type === 'income' ? entry.type === 'income' : entry.type === 'expense' && entry.location === mode.location
    if (!matchesType) return false
    if (!search.trim()) return true
    const service = serviceFor(state.services, entry.serviceId)
    return `${entry.category || ''} ${entry.note || ''} ${service?.name || ''}`.toLowerCase().includes(search.trim().toLowerCase())
  }).toSorted((a,b) => b.date.localeCompare(a.date)), [state.entries, state.services, type, mode.location, search])

  function changeService(id) {
    const service = serviceFor(state.services, id)
    setForm(previous => ({ ...previous, serviceId: id, unitPrice: service?.price || '' }))
  }

  async function fetchRate() {
    setRateLoading(true)
    setRateError('')
    try {
      const response = await fetch('/api/digitda/exchange-rate', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'دریافت نرخ ناموفق بود.')
      setForm(previous => ({ ...previous, exchangeRate: data.rate, rateSource: data.source, rateUpdatedAt: data.updatedAt }))
    } catch (error) { setRateError(error.message) }
    finally { setRateLoading(false) }
  }

  async function submit(event) {
    event.preventDefault()
    setNotice('')
    if (needsRate && rate <= 0) { setRateError('برای تسویه، نرخ یورو به تومان را وارد کنید.'); return }

    let entry
    if (type === 'income') {
      entry = { id: makeFinanceId(), type: 'income', date: form.date, serviceId: form.serviceId, quantity: Number(form.quantity), unitPrice: Number(form.unitPrice), note: form.note, account: form.account }
    } else {
      entry = {
        id: makeFinanceId(), type: 'expense', date: form.date, location: mode.location, currency: mode.currency,
        amount, category: form.category, note: form.note, account: form.account, settled: Boolean(form.settled),
        exchangeRateAtSettlement: needsRate ? rate : null,
        euroAmountAtSettlement: type === 'iran' && needsRate ? euroEquivalent : null,
        rateSource: needsRate ? form.rateSource : null,
        rateUpdatedAt: needsRate ? (form.rateUpdatedAt || new Date().toISOString()) : null,
      }
    }
    await saveNow({ ...state, tomanPerEuro: rate > 0 ? rate : state.tomanPerEuro, entries: [...state.entries, entry] })
    setForm(initialForm(type, state.services))
    setNotice('اطلاعات با موفقیت ذخیره شد.')
    setRateError('')
  }

  async function remove(id) {
    await saveNow({ ...state, entries: state.entries.filter(entry => entry.id !== id) })
  }

  return <main className={styles.page} dir="rtl">
    <header className={styles.header}><Link className={styles.logo} href="/digitda" lang="en" dir="ltr">Digit<span>DA</span></Link><Link className={styles.back} href="/digitda">بازگشت به داشبورد <span>←</span></Link></header>
    <div className={styles.container}>
      <nav className={styles.tabs} aria-label="نوع تراکنش">{TABS.map(([value,label]) => <Link key={value} className={type === value ? styles.activeTab : ''} href={`/digitda/entry/${value}`}>{label}</Link>)}</nav>
      <div className={styles.intro}><h1>{mode.title}</h1><p>{mode.subtitle}</p><span><i />{saveStatus}</span></div>

      <form className={styles.form} onSubmit={submit}>
        <div className={styles.formGrid}>
          <label>تاریخ<input required type="date" value={form.date || ''} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))}/></label>
          {type === 'income' ? <>
            <label>نوع خدمت<select required value={form.serviceId || ''} onChange={event => changeService(event.target.value)}>{state.services.map(service => <option value={service.id} key={service.id}>{service.name}</option>)}</select></label>
            <label>تعداد<input required min="1" step="1" type="number" value={form.quantity || ''} onChange={event => setForm(previous => ({ ...previous, quantity: event.target.value }))}/></label>
            <label>قیمت هر واحد به یورو<input required min="0" step=".01" type="number" value={form.unitPrice || ''} onChange={event => setForm(previous => ({ ...previous, unitPrice: event.target.value }))}/><small>این مبلغ فقط برای همین سفارش است.</small></label>
            <label className={styles.fullWidth}>حساب دریافت‌کننده<div className={styles.choiceGrid}><button type="button" className={form.account === 'germany' ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, account: 'germany' }))}>حساب آلمان</button><button type="button" className={form.account === 'iran' ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, account: 'iran' }))}>حساب ایران</button></div></label>
          </> : <>
            <label>دسته‌بندی<select value={form.category || ''} onChange={event => setForm(previous => ({ ...previous, category: event.target.value }))}>{(type === 'iran' ? iranCategories : germanyCategories).map(category => <option key={category}>{category}</option>)}</select></label>
            <label>مبلغ ({type === 'iran' ? 'تومان' : 'یورو'})<input required min="0" step={type === 'iran' ? '1000' : '.01'} type="number" value={form.amount || ''} onChange={event => setForm(previous => ({ ...previous, amount: event.target.value }))}/></label>
            <label className={styles.fullWidth}>برداشت از حساب<div className={styles.accountChoices}><button type="button" className={form.account === 'iran' ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, account: 'iran' }))}><b>حساب ایران</b><small>برداشت ریالی / تومانی</small></button><button type="button" className={form.account === 'germany' ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, account: 'germany', settled: true }))}><b>حساب آلمان</b><small>برداشت یورویی</small></button></div></label>
            {type === 'iran' ? <label className={styles.fullWidth}>وضعیت تسویه<div className={styles.choiceGrid}><button type="button" className={form.settled ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, settled: true }))}>تسویه شده</button><button type="button" className={!form.settled ? styles.choiceActive : ''} onClick={() => setForm(previous => ({ ...previous, settled: false }))}>هنوز تسویه نشده</button></div></label> : null}
          </>}
          <label className={styles.fullWidth}>توضیحات<input value={form.note || ''} onChange={event => setForm(previous => ({ ...previous, note: event.target.value }))} placeholder="شرح کوتاه یا شماره فاکتور"/></label>
        </div>

        {needsRate ? <section className={styles.settlement}><div className={styles.settlementHead}><div><h2>نرخ تسویه یورو</h2><p>نرخ زمان تسویه را ثبت کنید؛ این نرخ بعد از ذخیره همراه تراکنش قفل می‌شود.</p></div><button type="button" onClick={fetchRate} disabled={rateLoading}>{rateLoading ? 'در حال دریافت…' : 'دریافت نرخ روز'}</button></div><div className={styles.rateGrid}><label>هر یورو / تومان<input required type="number" min="1" value={form.exchangeRate || ''} onChange={event => setForm(previous => ({ ...previous, exchangeRate: event.target.value, rateSource: 'manual', rateUpdatedAt: new Date().toISOString() }))}/></label><div><span>منبع نرخ</span><strong>{form.rateSource === 'Navasan' ? 'نوسان · بازار آزاد' : 'ورود دستی'}</strong></div><div><span>معادل نهایی</span><strong>{type === 'iran' ? formatEuro(euroEquivalent,2) : formatToman(tomanEquivalent)}</strong></div></div>{form.rateUpdatedAt ? <small>آخرین دریافت: {formatPersianDate(form.rateUpdatedAt)}</small> : null}{rateError ? <p className={styles.rateError} role="alert">{rateError}</p> : null}</section> : null}

        {notice ? <p className={styles.success} role="status">{notice}</p> : null}
        <div className={styles.actions}><button type="submit">ذخیره اطلاعات</button><button type="button" onClick={() => setForm(initialForm(type,state.services))}>پاک‌کردن فرم</button></div>
      </form>

      <section className={styles.history}><div className={styles.historyHead}><div><span>تاریخچه</span><h2>{type === 'iran' ? 'هزینه‌های ایران' : type === 'germany' ? 'هزینه‌های آلمان' : 'درآمدها'}</h2></div><input aria-label="جستجو در تاریخچه" value={search} onChange={event => setSearch(event.target.value)} placeholder="جستجو در عنوان یا توضیحات…"/></div><div className={styles.tableWrap}><table><thead><tr><th>تاریخ</th><th>شرح</th><th>مبلغ اصلی</th>{type !== 'income' ? <><th>حساب</th><th>نرخ تسویه</th><th>معادل یورو</th><th>وضعیت</th></> : <><th>تعداد</th><th>حساب</th></>}<th /></tr></thead><tbody>{history.map(entry => { const service = serviceFor(state.services,entry.serviceId); return <tr key={entry.id}><td>{formatPersianDate(entry.date)}</td><td><strong>{type === 'income' ? service?.name : entry.category}</strong><small>{entry.note}</small></td><td>{type === 'income' ? formatEuro(entryEuroValue(entry,state.tomanPerEuro),2) : entry.currency === 'toman' ? formatToman(entry.amount) : formatEuro(entry.amount,2)}</td>{type !== 'income' ? <><td>{entry.account === 'iran' ? 'حساب ایران' : 'حساب آلمان'}</td><td>{entry.exchangeRateAtSettlement ? formatToman(entry.exchangeRateAtSettlement) : '—'}</td><td>{formatEuro(entryEuroValue(entry,state.tomanPerEuro),2)}</td><td><span className={entry.settled ? styles.settled : styles.pending}>{entry.settled ? 'تسویه‌شده' : 'در انتظار'}</span></td></> : <><td>{number.format(entry.quantity)}</td><td>{entry.account === 'iran' ? 'حساب ایران' : 'حساب آلمان'}</td></>}<td><button className={styles.delete} type="button" onClick={() => remove(entry.id)} aria-label="حذف تراکنش">×</button></td></tr>})}</tbody></table></div>{!history.length ? <p className={styles.empty}>موردی برای نمایش وجود ندارد.</p> : null}</section>
    </div>
  </main>
}
