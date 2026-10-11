'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './friendAccountReport.module.css'

const STORAGE_KEY = 'andarun_friend_accounts_v1'
const ACCOUNTS = [
  { id: 'zia', name: 'خانواده ضیا', initials: 'ض' },
  { id: 'ebrahimi', name: 'خانواده ابراهیمی نسب', initials: 'ا' },
  { id: 'mansour', name: 'خانواده منصور مقدم', initials: 'م' },
  { id: 'amirmohammad', name: 'امیرمحمد ابراهیمی نسب', initials: 'ا' },
]

function readLocalLedger() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
    return value && typeof value === 'object' ? value : {}
  } catch { return {} }
}

function balancesFor(entries) {
  return entries.reduce((totals, entry) => {
    totals[entry.currency] += (entry.payer === 'me' ? 1 : -1) * Number(entry.amount || 0)
    return totals
  }, { eur: 0, irr: 0 })
}

function formatAmount(value, currency) {
  const amount = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: currency === 'eur' ? 2 : 0 }).format(Number(value || 0))
  return currency === 'eur' ? `${amount} یورو` : `${amount} ریال`
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fa-IR-u-ca-gregory', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(`${value}T12:00:00`))
}

function balanceLabel(value) {
  if (value > 0) return 'بستانکار هستید'
  if (value < 0) return 'بدهکار هستید'
  return 'حساب تسویه است'
}

export default function FriendAccountReport({ accountId, autoPrint = false }) {
  const account = ACCOUNTS.find(item => item.id === accountId) || ACCOUNTS[0]
  const [ledger, setLedger] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const local = readLocalLedger()
    setLedger(local)
    fetch('/api/andarun/friend-finance')
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!cancelled && data?.state && typeof data.state === 'object') setLedger(data.state)
      })
      .catch(() => null)
      .finally(() => { if (!cancelled) setReady(true) })
    return () => { cancelled = true }
  }, [])

  const entries = useMemo(() => (ledger[account.id] || []).toSorted((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt), [ledger, account.id])
  const balances = useMemo(() => balancesFor(entries), [entries])

  useEffect(() => {
    if (!ready || !autoPrint) return
    const timeout = window.setTimeout(() => window.print(), 500)
    return () => window.clearTimeout(timeout)
  }, [ready, autoPrint])

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.actions}>
        <button type="button" onClick={() => window.print()}>چاپ یا ذخیره به‌صورت PDF</button>
        <button type="button" className={styles.closeButton} onClick={() => window.close()}>بستن</button>
      </div>
      <article className={styles.sheet}>
        <header className={styles.header}>
          <div><h1>{account.name}</h1><p>گزارش مستقل بدهکاری، بستانکاری و گردش حساب</p></div>
          <span>{account.initials}</span>
        </header>

        <section className={styles.summary}>
          {[
            { currency: 'eur', label: 'مانده یورو', value: balances.eur },
            { currency: 'irr', label: 'مانده ریال', value: balances.irr },
          ].map(item => (
            <div className={styles.balance} key={item.currency}>
              <small>{item.label}</small>
              <strong className={item.value > 0 ? styles.green : item.value < 0 ? styles.red : ''}>{formatAmount(Math.abs(item.value), item.currency)}</strong>
              <span>{balanceLabel(item.value)}</span>
            </div>
          ))}
        </section>

        <div className={styles.sectionHead}><h2>گردش حساب</h2><span>{new Intl.NumberFormat('fa-IR').format(entries.length)} تراکنش</span></div>
        {entries.length ? (
          <table>
            <thead><tr><th>ردیف</th><th>تاریخ</th><th>شرح</th><th>پرداخت‌کننده</th><th>مبلغ</th><th>نرخ هر یورو</th></tr></thead>
            <tbody>{entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{new Intl.NumberFormat('fa-IR').format(index + 1)}</td>
                <td>{formatDate(entry.date)}</td>
                <td><strong>{entry.note}</strong>{entry.kind === 'settlement' ? <small>ثبت تسویه</small> : null}</td>
                <td><span className={`${styles.payer} ${entry.payer === 'me' ? styles.credit : styles.debt}`}>{entry.payer === 'me' ? 'من پرداخت کردم' : 'طرف مقابل پرداخت کرد'}</span></td>
                <td><strong className={entry.payer === 'me' ? styles.green : styles.red}>{entry.payer === 'me' ? '+' : '−'} {formatAmount(entry.amount, entry.currency)}</strong>{entry.currency === 'irr' && entry.euroValue ? <small>معادل {formatAmount(entry.euroValue, 'eur')}</small> : null}</td>
                <td>{entry.rate ? formatAmount(entry.rate, 'irr') : '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        ) : <div className={styles.empty}>هنوز تراکنشی برای این حساب ثبت نشده است.</div>}
        <footer>تاریخ تهیه گزارش: {new Intl.DateTimeFormat('fa-IR-u-ca-gregory', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())}</footer>
      </article>
    </main>
  )
}
