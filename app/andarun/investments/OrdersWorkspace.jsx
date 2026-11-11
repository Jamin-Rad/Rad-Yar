'use client'

import {useEffect, useState} from 'react'
import {ACCOUNT_DEFINITIONS} from '@/lib/investments/family.mjs'
import {orderProgress, orderTerms} from '@/lib/investments/orders.mjs'
import {money} from '@/lib/investments/portfolio.mjs'
import EntryDialog from './EntryDialog'
import {JournalDialog} from './TradeDialogs'
import styles from './investments.module.css'

const typeLabels = {market: 'بازار', limit: 'محدود', stop: 'توقف'}
const statusLabels = {draft: 'در انتظار ثبت در کارگزاری', open: 'باز در کارگزاری', partial: 'اجرای جزئی', filled: 'اجرا شده', cancelled: 'لغو شده'}
const accountName = id => ACCOUNT_DEFINITIONS.find(account => account.id === id)?.owner || id
const date = value => new Date(value).toLocaleString('fa-IR', {timeZone: 'Europe/Berlin'})

async function ordersRequest(options) {
  const response = await fetch('/api/andarun/investments/orders', options)
  const result = await response.json()
  if (!response.ok) throw Error(result.error || 'ارتباط با دفتر اردرها برقرار نشد.')
  return result
}

function OrderDialog({dialog, onClose, onSaved}) {
  const {action, order, id} = dialog
  const terms = order?.terms
  const [type, setType] = useState(terms?.type || 'limit')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const titles = {create: 'اردر جدید', edit: 'ویرایش پیش‌نویس', place: 'تأیید ثبت در کارگزاری', cancel: 'لغو اردر'}

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setError('')
    try {
      const body = {action, id}
      if (action === 'create' || action === 'edit') body.terms = orderTerms(Object.fromEntries(form))
      if (action === 'place') Object.assign(body, {reference: form.get('reference'), confirmed: form.has('confirmed'), expectedTerms: terms})
      if (action === 'cancel') body.confirmed = form.has('confirmed')
      if (action === 'edit') body.expectedTerms = terms
      await ordersRequest({method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)})
      await onSaved()
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  return <JournalDialog title={titles[action]} onClose={onClose} onSubmit={submit} busy={busy} error={error} submitLabel={action === 'place' ? 'تأیید ثبت' : action === 'cancel' ? 'تأیید لغو' : 'ذخیره پیش‌نویس'}>
    <fieldset disabled={busy} className={styles.entryFields}>
      {(action === 'create' || action === 'edit') && <>
        <div className={styles.formGrid}>
          <label className={styles.field}>حساب<select name="accountId" defaultValue={terms?.accountId || 'self'}>{ACCOUNT_DEFINITIONS.map(account => <option key={account.id} value={account.id}>{account.owner}</option>)}</select></label>
          <label className={styles.field}>جهت<select name="side" defaultValue={terms?.side || 'BUY'}><option value="BUY">خرید</option><option value="SELL">فروش</option></select></label>
          <label className={styles.field}>نام دارایی<input name="name" defaultValue={terms?.name} maxLength={160} required/></label>
          <label className={styles.field}>ISIN<input name="isin" dir="ltr" defaultValue={terms?.isin} minLength={12} maxLength={12} required/></label>
          <label className={styles.field}>تعداد سهم<input name="quantity" dir="ltr" inputMode="decimal" defaultValue={terms?.quantity} required/></label>
          <label className={styles.field}>نوع اردر<select name="type" value={type} onChange={event => setType(event.target.value)}>{Object.entries(typeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          {type !== 'market' && <label className={styles.field}>{type === 'stop' ? 'قیمت فعال‌سازی هر سهم (یورو)' : 'قیمت محدود هر سهم (یورو)'}<input name="price" dir="ltr" inputMode="decimal" defaultValue={terms?.price || ''} required/></label>}
        </div>
      </>}
      {action === 'place' && <>
        <p>{terms.name} · {terms.side === 'BUY' ? 'خرید' : 'فروش'} · <bdi>{terms.quantity}</bdi> سهم</p>
        <label className={styles.field}>شناسه اردر در کارگزاری (اختیاری)<input name="reference" dir="ltr" maxLength={100}/></label>
        <label><input type="checkbox" name="confirmed" required/> این اردر را در نرم‌افزار کارگزاری ثبت کردم.</label>
      </>}
      {action === 'cancel' && <>
        <p>{terms.name} · اجراهای قبلی در دفتر تراکنش‌ها باقی می‌مانند.</p>
        <label><input type="checkbox" name="confirmed" required/> {order.placed_at ? 'لغو ماندهٔ اردر را در کارگزاری تأیید کردم.' : 'این پیش‌نویس را کنار می‌گذارم.'}</label>
      </>}
    </fieldset>
  </JournalDialog>
}

export default function OrdersWorkspace({state, ledger, onFill, onLedger}) {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')
  const [dialog, setDialog] = useState(null)
  const [archived, setArchived] = useState(false)

  async function reload() {
    setError('')
    try { setOrders(await ordersRequest()) }
    catch (err) { setError(err.message) }
  }

  useEffect(() => { reload() }, [])

  function open(action, order) {
    setDialog({action, order, id: order?.id || crypto.randomUUID()})
  }

  async function saved() {
    setDialog(null)
    await reload()
  }

  const items = (orders || []).map(order => ({order, ...orderProgress(order)}))
  const visible = items.filter(item => archived === ['filled', 'cancelled'].includes(item.status))

  return <section className={styles.panel}>
    <div className={styles.panelHead}>
      <div><h2>اردرهای Trade Republic</h2><p>پیش‌نویس را ذخیره کن، ثبت در کارگزاری را تأیید کن و هر اجرای واقعی را در دفتر ثبت کن.</p></div>
      <button type="button" className={styles.primaryButton} onClick={() => open('create')}>اردر جدید</button>
    </div>
    <div className={styles.dialogActions}>
      <button type="button" className={styles.secondaryButton} aria-pressed={!archived} onClick={() => setArchived(false)}>در جریان</button>
      <button type="button" className={styles.secondaryButton} aria-pressed={archived} onClick={() => setArchived(true)}>تاریخچه</button>
      <button type="button" className={styles.secondaryButton} onClick={reload}>تازه‌سازی</button>
      <button type="button" className={styles.secondaryButton} onClick={onLedger}>دفتر تراکنش‌ها</button>
    </div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {!orders && !error && <p role="status">در حال دریافت اردرها…</p>}
    {orders && !visible.length && <p className={styles.calmEmpty}>{archived ? 'هنوز اردر بسته‌شده‌ای ثبت نشده است.' : 'اردر باز یا پیش‌نویسی نداری.'}</p>}
    <div className={styles.orderList}>
      {visible.map(({order, status, filled, remaining}) => {
        const {terms} = order
        const active = status === 'open' || status === 'partial'
        return <article key={order.id} className={styles.orderCard}>
          <div className={styles.panelHead}><div><h3 dir="auto">{terms.name}</h3><p>{accountName(terms.accountId)} · {terms.side === 'BUY' ? 'خرید' : 'فروش'} · {typeLabels[terms.type]} · <bdi>{terms.isin}</bdi></p></div><strong>{statusLabels[status]}</strong></div>
          <dl className={styles.transactionFacts}>
            <div><dt>تعداد اردر</dt><dd><bdi>{terms.quantity}</bdi></dd></div>
            <div><dt>اجرا شده</dt><dd><bdi>{filled}</bdi></dd></div>
            <div><dt>{status === 'cancelled' ? 'لغوشده' : 'مانده'}</dt><dd><bdi>{remaining}</bdi></dd></div>
            {terms.price && <div><dt>{terms.type === 'stop' ? 'قیمت فعال‌سازی' : 'قیمت محدود'}</dt><dd><bdi>{terms.price} €</bdi></dd></div>}
          </dl>
          {order.placed_at && <p>تأیید ثبت در کارگزاری · {date(order.placed_at)} {order.broker_reference && <bdi>· {order.broker_reference}</bdi>}</p>}
          {order.fills.length > 0 && <details><summary>اجراهای ثبت‌شده ({order.fills.length})</summary><ul>{order.fills.map(fill => <li key={fill.transactionId}>{date(fill.datetime)} · <bdi>{fill.quantity}</bdi> سهم · <bdi>{money(fill.cashCents)}</bdi>{ledger.loaded && !ledger.transactions.some(tx => tx.accountId === terms.accountId && tx.id === fill.transactionId) && <small> · تراکنش از دفتر حذف شده</small>}</li>)}</ul></details>}
          {(status === 'draft' || active) && <div className={styles.dialogActions}>
            {status === 'draft' && <><button type="button" className={styles.primaryButton} onClick={() => open('place', order)}>تأیید ثبت در کارگزاری</button><button type="button" className={styles.secondaryButton} onClick={() => open('edit', order)}>ویرایش</button></>}
            {active && <button type="button" className={styles.primaryButton} onClick={() => open('fill', order)}>تأیید و ثبت اجرا</button>}
            <button type="button" className={styles.secondaryButton} onClick={() => open('cancel', order)}>{active ? 'لغو مانده' : 'لغو پیش‌نویس'}</button>
          </div>}
        </article>
      })}
    </div>
    {dialog?.action === 'fill' && <EntryDialog state={state} ledger={ledger} order={dialog.order} onClose={() => setDialog(null)} onSaved={async () => { await saved(); await onFill() }}/>}
    {dialog && dialog.action !== 'fill' && <OrderDialog key={`${dialog.id}:${dialog.action}`} dialog={dialog} onClose={() => setDialog(null)} onSaved={saved}/>}
  </section>
}
