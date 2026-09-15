'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { donationToman, donorSummary, formatEuro, formatToman, normalizeState, recipientLedger, totalsFor } from '../aidData'
import { mergeScreenshotSeed } from '../screenshotSeed'
import styles from './print.module.css'

const titles = {
  overview: 'گزارش کامل کمک به زندانیان',
  prisoners: 'گزارش زندانیان و ماندهٔ نیاز',
  recipients: 'گزارش گیرنده‌ها و واریز به ستاد دیه',
  donors: 'گزارش جمع کمک هر فرد',
  donations: 'تاریخچهٔ کمک‌ها بر اساس کمک‌کننده',
  prisoner: 'گزارش یک زندانی',
  recipient: 'گزارش یک گیرنده',
}
const statusLabels = { promised: 'قول کمک', recorded: 'کمک ثبت‌شده', confirmed: 'واریز تأییدشده' }
const registeredToman = totals => totals.recordedToman + totals.confirmedToman
const collator = new Intl.Collator('fa', { sensitivity: 'base' })

function ReportTable({ headers, children }) {
  return <table><thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>{children}</tbody></table>
}

function DonationsTable({ donations, state }) {
  return <ReportTable headers={['کمک‌کننده', 'شماره و نام زندانی', 'تاریخ', 'کمک، یورو', 'معادل تومان', 'نرخ هر یورو', 'وضعیت', 'مسیر / گیرنده']}>
    {donations.map(row => {
      const prisoner = state.prisoners.find(item => item.id === row.prisonerId)
      const recipient = state.recipients.find(item => item.id === row.recipientId)
      return <tr key={row.id}>
        <td>{row.donor || '—'}</td><td>{prisoner?.number || '—'} · {prisoner?.name || '—'}</td>
        <td>{row.date || '—'}</td><td>{formatEuro(row.euroAmount)}</td>
        <td>{formatToman(donationToman(row))}</td><td>{formatToman(row.rateAtRecord)}</td>
        <td>{statusLabels[row.status]}</td>
        <td>{row.channel === 'direct' ? 'مستقیم به ستاد دیه' : recipient?.name || '—'}</td>
      </tr>
    })}
  </ReportTable>
}

function DonorsTable({ donors }) {
  return <ReportTable headers={['کمک‌کننده', 'کمک ثبت‌شده', 'واریز تأییدشده از این مبلغ', 'قول کمک، هنوز ثبت نشده', 'تعداد کمک', 'برای چند زندانی']}>
    {donors.map(row => <tr key={row.key || 'without-name'}>
      <td>{row.name}</td>
      <td>{formatEuro(row.registeredEuro)}<br />{formatToman(row.registeredToman)}</td>
      <td>{formatEuro(row.confirmedEuro)}<br />{formatToman(row.confirmedToman)}</td>
      <td>{row.promisedEuro ? <>{formatEuro(row.promisedEuro)}<br />{formatToman(row.promisedToman)}</> : '—'}</td>
      <td>{row.donationCount}</td><td>{row.prisonerCount}</td>
    </tr>)}
  </ReportTable>
}

function RecipientDetail({ recipient, state }) {
  const ledger = recipientLedger(recipient.id, state.donations, state.prisoners)
  return <section className={styles.reportSection}>
    <h2>{recipient.name}</h2>
    <div className={styles.summaryLine}><span>یوروی دریافت‌شده: <strong>{formatEuro(ledger.confirmedEuro)}</strong></span><span>در انتظار دریافت: <strong>{formatEuro(ledger.pendingEuro)}</strong></span><span>کل ثبت‌شده: <strong>{formatEuro(ledger.euro)}</strong></span>{ledger.promisedEuro ? <span>قول کمک: <strong>{formatEuro(ledger.promisedEuro)}</strong></span> : null}<span>معادل تومان: <strong>{formatToman(ledger.toman)}</strong></span><span>ماندهٔ واریز به ستاد دیه: <strong>{formatToman(ledger.owedToman)}</strong></span></div>
    <h3>برای هر زندانی</h3>
    <ReportTable headers={['شماره و نام زندانی', 'یوروی دریافت‌شده', 'یوروی در انتظار دریافت', 'معادل تومان', 'ماندهٔ واریز به ستاد دیه']}>
      {ledger.cases.map(item => <tr key={item.prisonerId}><td>{item.number} · {item.name}</td><td>{formatEuro(item.confirmedEuro)}</td><td>{formatEuro(item.pendingEuro)}</td><td>{formatToman(item.toman)}</td><td>{formatToman(item.owedToman)}</td></tr>)}
    </ReportTable>
    {!ledger.cases.length ? <p>هنوز کمکی برای این گیرنده ثبت نشده است.</p> : null}
    <h3>کمک‌ها و نرخ هر ورودی</h3>
    <ReportTable headers={['کمک‌کننده', 'شماره و نام زندانی', 'یورو', 'نرخ هر یورو', 'معادل تومان', 'وضعیت', 'واریز به ستاد دیه']}>
      {ledger.donations.map(row => {
        const prisoner = state.prisoners.find(item => item.id === row.prisonerId)
        return <tr key={row.id}><td>{row.donor || '—'}</td><td>{prisoner?.number || '—'} · {prisoner?.name || '—'}</td><td>{formatEuro(row.euroAmount)}</td><td>{formatToman(row.rateAtRecord)}</td><td>{formatToman(donationToman(row))}</td><td>{statusLabels[row.status]}</td><td>{row.status === 'promised' ? 'هنوز دریافت نشده' : row.settledToSetad ? 'واریز شده' : 'باید واریز شود'}</td></tr>
      })}
    </ReportTable>
  </section>
}

export default function PrisonerAidPrintPage({ type, id, autoPrint }) {
  const [state, setState] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    fetch('/api/andarun/prisoner-aid', { cache: 'no-store' }).then(async response => {
      const result = await response.json()
      if (!response.ok || !result.online || !result.state) throw new Error(result.error || 'گزارش آنلاین در دسترس نیست.')
      if (active) setState(mergeScreenshotSeed(normalizeState(result.state)))
    }).catch(cause => { if (active) setError(cause.message) })
    return () => { active = false }
  }, [])

  const rows = useMemo(() => state?.prisoners.map(row => ({ ...row, totals: totalsFor(row.id, state.donations) })) || [], [state])
  const recipients = useMemo(() => state ? [...state.recipients] : [], [state])
  const donations = useMemo(() => state ? [...state.donations].sort((a, b) =>
    (a.donor && !b.donor ? -1 : !a.donor && b.donor ? 1 : collator.compare(a.donor, b.donor)) || b.date.localeCompare(a.date)
  ) : [], [state])
  const donors = useMemo(() => state ? donorSummary(state.donations) : [], [state])
  const prisoner = type === 'prisoner' ? rows.find(row => row.id === id) : null
  const recipient = type === 'recipient' ? recipients.find(row => row.id === id) : null
  const canPrint = state && (type !== 'prisoner' || prisoner) && (type !== 'recipient' || recipient)
  useEffect(() => {
    if (!autoPrint || !canPrint) return
    const timer = setTimeout(() => window.print(), 400)
    return () => clearTimeout(timer)
  }, [autoPrint, canPrint])
  const summary = rows.reduce((result, row) => {
    result.needed += row.neededToman
    result.registered += registeredToman(row.totals)
    result.confirmed += row.totals.confirmedToman
    if (registeredToman(row.totals) >= row.neededToman) result.complete++
    return result
  }, { needed: 0, registered: 0, confirmed: 0, complete: 0 })

  return <main className={styles.page} dir="rtl">
    <div className={styles.toolbar}><Link href="/andarun/finanz/gefangene">بازگشت به گزارش</Link><span>در پنجرهٔ چاپ، «Save as PDF» را انتخاب کنید.</span><button type="button" disabled={!canPrint} onClick={() => window.print()}>چاپ / ذخیرهٔ PDF</button></div>
    {error ? <p className={styles.message} role="alert">{error}</p> : null}
    {!error && !state ? <p className={styles.message}>در حال بارگذاری گزارش آنلاین…</p> : null}
    {state && !canPrint ? <p className={styles.message} role="alert">مورد انتخاب‌شده پیدا نشد. به صفحهٔ گزارش برگردید و دوباره انتخاب کنید.</p> : null}
    {canPrint ? <article className={styles.sheet}>
      <header className={styles.reportHeader}><div><span>Andarun / Finanzen</span><h1>{titles[type]}</h1><p>کمک به زندانیان · اطلاعات ثبت‌شدهٔ آنلاین</p></div><div><strong>تاریخ تهیه</strong><span>{new Date().toLocaleDateString('fa-IR')}</span></div></header>
      {type === 'overview' ? <section className={styles.reportSection}><h2>خلاصه</h2><div className={styles.summaryLine}><span>مبلغ مورد نیاز: <strong>{formatToman(summary.needed)}</strong></span><span>کمک ثبت‌شده: <strong>{formatToman(summary.registered)}</strong></span><span>واریز تأییدشده: <strong>{formatToman(summary.confirmed)}</strong></span><span>زندانی تکمیل‌شده: <strong>{summary.complete}</strong></span></div></section> : null}
      {['overview', 'prisoners', 'prisoner'].includes(type) ? <section className={styles.reportSection}><h2>{type === 'prisoner' ? `زندانی شماره ${prisoner.number} · ${prisoner.name}` : 'زندانیان و ماندهٔ نیاز'}</h2>
        <ReportTable headers={['شماره', 'نام', 'مبلغ مورد نیاز', 'کمک ثبت‌شده', 'واریز تأییدشده', 'ماندهٔ نیاز', 'وضعیت']}>
          {(type === 'prisoner' ? [prisoner] : rows).map(row => {
            const counted = registeredToman(row.totals)
            const excess = counted - row.neededToman
            return <tr key={row.id} className={counted >= row.neededToman ? styles.completeRow : ''}><td>{row.number}</td><td>{row.name}</td><td>{formatToman(row.neededToman)}</td><td>{formatEuro(row.totals.recordedEuro + row.totals.confirmedEuro)}<br />{formatToman(counted)}</td><td>{formatEuro(row.totals.confirmedEuro)}<br />{formatToman(row.totals.confirmedToman)}</td><td>{formatToman(Math.max(0, row.neededToman - counted))}</td><td>{excess > 0 ? `بیش از نیاز: ${formatToman(excess)}` : counted >= row.neededToman ? 'تکمیل' : 'در حال جمع‌آوری'}</td></tr>
          })}
        </ReportTable>
        {type === 'prisoner' && prisoner.note ? <p>توضیح: {prisoner.note}</p> : null}
      </section> : null}
      {type === 'prisoner' ? <section className={styles.reportSection}><h2>کمک‌های این زندانی</h2><DonationsTable donations={donations.filter(row => row.prisonerId === id)} state={state} /></section> : null}
      {['overview', 'recipients', 'recipient'].includes(type) ? <>
        <section className={styles.reportSection}><h2>گیرنده‌ها و ماندهٔ واریز به ستاد دیه</h2><ReportTable headers={['گیرنده', 'یوروی دریافت‌شده', 'یوروی در انتظار دریافت', 'معادل تومان', 'باید به ستاد دیه واریز کند', 'تعداد زندانی']}>
          {(type === 'recipient' ? [recipient] : recipients).map(row => {
            const ledger = recipientLedger(row.id, state.donations, state.prisoners)
            return <tr key={row.id || 'unassigned'}><td>{row.name}</td><td>{formatEuro(ledger.confirmedEuro)}</td><td>{formatEuro(ledger.pendingEuro)}{ledger.promisedEuro ? <><br />قول کمک: {formatEuro(ledger.promisedEuro)}</> : null}</td><td>{formatToman(ledger.toman)}</td><td>{formatToman(ledger.owedToman)}</td><td>{ledger.cases.length}</td></tr>
          })}
        </ReportTable></section>
        {(type === 'recipient' ? [recipient] : recipients).map(row => <RecipientDetail key={row.id || 'unassigned'} recipient={row} state={state} />)}
      </> : null}
      {['overview', 'donors'].includes(type) ? <section className={styles.reportSection}><h2>جمع کمک‌های ثبت‌شده بر اساس فرد</h2><p>قول کمک جداگانه نمایش داده شده و در جمع کمک ثبت‌شده حساب نشده است.</p><DonorsTable donors={donors} /></section> : null}
      {['overview', 'donations'].includes(type) ? <section className={styles.reportSection}><h2>تاریخچهٔ کمک‌ها بر اساس کمک‌کننده</h2><DonationsTable donations={donations} state={state} /></section> : null}
      <footer className={styles.footer}>گزارش بر اساس کمک‌های ثبت‌شده تهیه شده است؛ وضعیت تأیید واریز هر کمک جداگانه نمایش داده می‌شود.</footer>
    </article> : null}
  </main>
}
