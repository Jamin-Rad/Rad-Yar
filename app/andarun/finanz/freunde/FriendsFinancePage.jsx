'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './friendsFinance.module.css'

const STORAGE_KEY = 'andarun_friend_accounts_v1'

const ACCOUNTS = [
  { id: 'zia', name: 'خانواده ضیا', initials: 'ض' },
  { id: 'ebrahimi', name: 'خانواده ابراهیمی نسب', initials: 'ا' },
  { id: 'mansour', name: 'خانواده منصور مقدم', initials: 'م' },
  { id: 'amirmohammad', name: 'امیرمحمد ابراهیمی نسب', initials: 'ا' },
]

const EMPTY_FORM = {
  payer: 'me',
  amount: '',
  currency: 'eur',
  rate: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
}

function Icon({ name, size = 22 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'users') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>
  if (name === 'close') return <svg {...common}><path d="m18 6-12 12M6 6l12 12"/></svg>
  if (name === 'calendar') return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
  if (name === 'wallet') return <svg {...common}><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v11H5a3 3 0 0 1-3-3V6"/><path d="M16 13h4"/></svg>
  if (name === 'scale') return <svg {...common}><path d="M12 3v18M6 6h12M5 6 2 12h6L5 6ZM19 6l-3 6h6l-3-6ZM8 21h8"/></svg>
  if (name === 'trash') return <svg {...common}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/></svg>
  return <svg {...common}><path d="m15 18-6-6 6-6"/></svg>
}

function toPersianDigits(value) {
  return String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])
}

function formatAmount(value, currency) {
  const digits = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: currency === 'eur' ? 2 : 0 }).format(Number(value || 0))
  return currency === 'eur' ? `${digits} یورو` : `${digits} ریال`
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(`${value}T12:00:00`))
}

function cleanNumber(value) {
  return value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
}

function loadLedger() {
  if (typeof window === 'undefined') return {}
  try {
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

function balancesFor(entries) {
  return entries.reduce((totals, entry) => {
    const direction = entry.payer === 'me' ? 1 : -1
    totals[entry.currency] += direction * Number(entry.amount || 0)
    return totals
  }, { eur: 0, irr: 0 })
}

function BalanceStatus({ value, currency }) {
  const status = value > 0 ? 'بستانکار هستید' : value < 0 ? 'بدهکار هستید' : 'حساب تسویه است'
  return (
    <div className={`${styles.balanceCard} ${value > 0 ? styles.creditCard : value < 0 ? styles.debtCard : ''}`}>
      <span className={styles.balanceIcon}><Icon name={currency === 'eur' ? 'scale' : 'wallet'} size={24} /></span>
      <div>
        <small>مانده به {currency === 'eur' ? 'یورو' : 'ریال'}</small>
        <strong>{formatAmount(Math.abs(value), currency)}</strong>
        <span>{status}</span>
      </div>
    </div>
  )
}

export default function FriendsFinancePage() {
  const [ledger, setLedger] = useState({})
  const [ready, setReady] = useState(false)
  const [activeId, setActiveId] = useState(ACCOUNTS[0].id)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const localLedger = loadLedger()
    setLedger(localLedger)

    fetch('/api/andarun/friend-finance')
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!cancelled && data?.state && typeof data.state === 'object') setLedger(data.state)
      })
      .catch(() => null)
      .finally(() => { if (!cancelled) setReady(true) })

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger))
    const timeout = window.setTimeout(() => {
      fetch('/api/andarun/friend-finance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: ledger }),
      }).catch(() => null)
    }, 450)
    return () => window.clearTimeout(timeout)
  }, [ledger, ready])

  const activeAccount = ACCOUNTS.find(account => account.id === activeId) || ACCOUNTS[0]
  const entries = useMemo(() => (ledger[activeId] || []).toSorted((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt), [ledger, activeId])
  const balances = useMemo(() => balancesFor(entries), [entries])

  function openForm() {
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) })
    setError('')
    setFormOpen(true)
  }

  function saveTransaction(event) {
    event.preventDefault()
    const amount = Number(form.amount)
    const rate = Number(form.rate)
    if (!amount || amount <= 0) return setError('مبلغ را به‌درستی وارد کنید.')
    if (form.currency === 'irr' && (!rate || rate <= 0)) return setError('برای تراکنش ریالی، نرخ هر یورو الزامی است.')
    if (!form.date) return setError('تاریخ تراکنش را وارد کنید.')
    if (!form.note.trim()) return setError('برای تراکنش یک شرح کوتاه بنویسید.')

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      payer: form.payer,
      amount,
      currency: form.currency,
      rate: form.currency === 'irr' ? rate : null,
      euroValue: form.currency === 'irr' ? amount / rate : amount,
      date: form.date,
      note: form.note.trim(),
      createdAt: Date.now(),
      kind: 'expense',
    }
    setLedger(previous => ({ ...previous, [activeId]: [entry, ...(previous[activeId] || [])] }))
    setFormOpen(false)
  }

  function settleAll() {
    const openCurrencies = ['eur', 'irr'].filter(currency => balances[currency])
    if (!openCurrencies.length) return
    if (!window.confirm(`همه مانده‌های باز ${activeAccount.name} تسویه و در گردش حساب ثبت شود؟`)) return
    const createdAt = Date.now()
    const settlements = openCurrencies.map((currency, index) => {
      const balance = balances[currency]
      return {
        id: `${createdAt}-settle-${currency}`,
        payer: balance > 0 ? 'them' : 'me',
        amount: Math.abs(balance),
        currency,
        rate: null,
        euroValue: currency === 'eur' ? Math.abs(balance) : null,
        date: new Date().toISOString().slice(0, 10),
        note: 'تسویه حساب',
        createdAt: createdAt + index,
        kind: 'settlement',
      }
    })
    setLedger(previous => ({ ...previous, [activeId]: [...settlements, ...(previous[activeId] || [])] }))
  }

  function removeEntry(entryId) {
    if (!window.confirm('این تراکنش از گردش حساب حذف شود؟')) return
    setLedger(previous => ({ ...previous, [activeId]: (previous[activeId] || []).filter(entry => entry.id !== entryId) }))
  }

  return (
    <main className={styles.page} dir="rtl">
      <header className={styles.topbar}>
        <div className={styles.titleBlock}>
          <div className={styles.titleIcon}><Icon name="users" size={27} /></div>
          <div>
            <h1>حساب‌های مالی دوستان</h1>
            <p>خرج‌های مشترک، بدهکاری و بستانکاری؛ شفاف و جدا از هزینه‌های ماهانه</p>
          </div>
        </div>
        <Link href="/andarun" className={styles.backLink}><Icon name="back" size={19} /> بازگشت</Link>
      </header>

      <div className={styles.shell}>
        <aside className={styles.accountRail} aria-label="حساب‌ها">
          <div className={styles.railHead}><span>حساب‌ها</span><small>{toPersianDigits(ACCOUNTS.length)} حساب</small></div>
          <div className={styles.accountList}>
            {ACCOUNTS.map(account => {
              const accountBalances = balancesFor(ledger[account.id] || [])
              const hasCredit = accountBalances.eur > 0 || accountBalances.irr > 0
              const hasDebt = accountBalances.eur < 0 || accountBalances.irr < 0
              const accountStatus = hasCredit && hasDebt ? 'مانده باز' : hasCredit ? 'بستانکار' : hasDebt ? 'بدهکار' : 'تسویه'
              return (
                <button key={account.id} className={`${styles.accountButton} ${activeId === account.id ? styles.accountActive : ''}`} onClick={() => { setActiveId(account.id); setFormOpen(false) }}>
                  <span className={styles.avatar}>{account.initials}</span>
                  <span><strong>{account.name}</strong><small>{accountStatus}</small></span>
                </button>
              )
            })}
          </div>
          <div className={styles.railNote}><Icon name="wallet" size={20} /><p>مانده یورو و ریال جداگانه نگهداری می‌شود و نرخ ارز هر تراکنش تغییر نمی‌کند.</p></div>
        </aside>

        <section className={styles.workspace}>
          <section className={styles.accountHero}>
            <div className={styles.accountIdentity}>
              <span className={styles.heroAvatar}>{activeAccount.initials}</span>
              <div><h2>{activeAccount.name}</h2><p>تسویه و ثبت هزینه‌های مشترک</p></div>
            </div>
            <div className={styles.heroActions}>
              <button type="button" className={styles.settleButton} onClick={settleAll} disabled={!balances.eur && !balances.irr}><Icon name="scale" size={19} /> تسویه حساب</button>
              <button type="button" className={styles.primaryButton} onClick={openForm}><Icon name="plus" size={20} /> ثبت تراکنش</button>
            </div>
          </section>

          <div className={styles.balanceGrid}>
            <BalanceStatus value={balances.eur} currency="eur" />
            <BalanceStatus value={balances.irr} currency="irr" />
          </div>

          <section className={styles.ledgerSection}>
            <div className={styles.sectionHeading}>
              <div><h3>گردش حساب</h3><p>{entries.length ? `${toPersianDigits(entries.length)} تراکنش ثبت‌شده` : 'هنوز تراکنشی ثبت نشده است'}</p></div>
              <button className={styles.mobileAdd} type="button" onClick={openForm}><Icon name="plus" size={19} /> تراکنش جدید</button>
            </div>
            {entries.length ? (
              <div className={styles.tableWrap}>
                <table>
                  <thead><tr><th>تاریخ</th><th>شرح</th><th>پرداخت‌کننده</th><th>مبلغ</th><th>نرخ هر یورو</th><th aria-label="عملیات" /></tr></thead>
                  <tbody>
                    {entries.map(entry => (
                      <tr key={entry.id}>
                        <td>{formatDate(entry.date)}</td>
                        <td><strong>{entry.note}</strong>{entry.kind === 'settlement' ? <small>ثبت تسویه</small> : null}</td>
                        <td><span className={`${styles.payerTag} ${entry.payer === 'me' ? styles.paidMe : styles.paidThem}`}>{entry.payer === 'me' ? 'من پرداخت کردم' : 'طرف مقابل پرداخت کرد'}</span></td>
                        <td><strong className={entry.payer === 'me' ? styles.positive : styles.negative}>{entry.payer === 'me' ? '+' : '−'} {formatAmount(entry.amount, entry.currency)}</strong>{entry.currency === 'irr' && entry.euroValue ? <small>معادل {formatAmount(entry.euroValue, 'eur')}</small> : null}</td>
                        <td>{entry.rate ? formatAmount(entry.rate, 'irr') : '—'}</td>
                        <td><button className={styles.deleteButton} onClick={() => removeEntry(entry.id)} aria-label={`حذف ${entry.note}`}><Icon name="trash" size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span><Icon name="wallet" size={29} /></span>
                <h4>گردش حساب خالی است</h4>
                <p>اولین پرداخت خودتان یا طرف مقابل را ثبت کنید.</p>
                <button type="button" onClick={openForm}><Icon name="plus" size={19} /> ثبت اولین تراکنش</button>
              </div>
            )}
          </section>
        </section>
      </div>

      {formOpen ? (
        <div className={styles.drawerBackdrop} onMouseDown={event => event.target === event.currentTarget && setFormOpen(false)}>
          <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="transaction-title">
            <div className={styles.drawerHead}><div><h2 id="transaction-title">ثبت تراکنش</h2><p>{activeAccount.name}</p></div><button type="button" onClick={() => setFormOpen(false)} aria-label="بستن"><Icon name="close" /></button></div>
            <form onSubmit={saveTransaction}>
              <fieldset className={styles.fieldset}><legend>پرداخت‌کننده</legend><div className={styles.segmented}><button type="button" className={form.payer === 'me' ? styles.segmentActive : ''} onClick={() => setForm(previous => ({ ...previous, payer: 'me' }))}>من پرداخت کردم</button><button type="button" className={form.payer === 'them' ? styles.segmentActiveDebt : ''} onClick={() => setForm(previous => ({ ...previous, payer: 'them' }))}>طرف مقابل پرداخت کرد</button></div></fieldset>
              <label className={styles.field}><span>مبلغ</span><input inputMode="decimal" value={form.amount} onChange={event => setForm(previous => ({ ...previous, amount: cleanNumber(event.target.value) }))} placeholder="۰" autoFocus /></label>
              <fieldset className={styles.fieldset}><legend>واحد پول</legend><div className={styles.segmented}><button type="button" className={form.currency === 'eur' ? styles.segmentActive : ''} onClick={() => setForm(previous => ({ ...previous, currency: 'eur', rate: '' }))}>یورو</button><button type="button" className={form.currency === 'irr' ? styles.segmentActive : ''} onClick={() => setForm(previous => ({ ...previous, currency: 'irr' }))}>ریال</button></div></fieldset>
              {form.currency === 'irr' ? <label className={styles.field}><span>نرخ هر یورو <b>الزامی</b></span><input inputMode="decimal" value={form.rate} onChange={event => setForm(previous => ({ ...previous, rate: cleanNumber(event.target.value) }))} placeholder="مثلاً ۱٬۲۰۰٬۰۰۰ ریال" /><small>نرخ در همین تراکنش ذخیره می‌شود و بعداً تغییر نمی‌کند.</small></label> : null}
              <label className={styles.field}><span>تاریخ</span><div className={styles.dateField}><Icon name="calendar" size={19} /><input type="date" value={form.date} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))} /></div></label>
              <label className={styles.field}><span>شرح</span><textarea rows="3" value={form.note} onChange={event => setForm(previous => ({ ...previous, note: event.target.value }))} placeholder="مثلاً خرید بلیت، رستوران یا هدیه" /></label>
              {error ? <p className={styles.formError} role="alert">{error}</p> : null}
              <button className={styles.submitButton} type="submit">ثبت در گردش حساب</button>
            </form>
          </aside>
        </div>
      ) : null}
    </main>
  )
}
