'use client'

import { useEffect, useRef, useState } from 'react'
import { CATEGORY_LABELS, parseMoney, normalizeDigits } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function PositionDialog({ position, account, onClose, onSave, onDelete }) {
  const dialog = useRef(null)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])
  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      onSave({
        ...position, id: position?.id || crypto.randomUUID(), asOf: data.get('asOf') || null,
        name: String(data.get('name')).trim(),
        symbol: String(data.get('symbol') || '').trim(), isin: String(data.get('isin') || '').trim().toUpperCase(),
        quantity: normalizeDigits(data.get('quantity')).replace(',', '.'),
        category: data.get('category'), valueCents: parseMoney(data.get('value')),
        gainCents: parseMoney(data.get('gain'), true), note: String(data.get('note')).trim(),
        verified: data.get('verified') === 'on', source: 'manual',
        marketConfirmed: position?.marketConfirmed === true && String(data.get('isin') || '').trim().toUpperCase() === position.isin && String(data.get('name')).trim() === position.name,
      })
    } catch (err) { setError(err.message) }
  }
  return <dialog id="investment-dialog" ref={dialog} className={styles.dialog} aria-labelledby="investment-dialog-title" dir="rtl" lang="fa" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <form onSubmit={submit}>
      <div className={styles.dialogHead}><div><h2 id="investment-dialog-title">{position ? 'بررسی و اصلاح دارایی' : 'افزودن دارایی'}</h2><p>حساب {account.owner} · Trade Republic · مبالغ را با سند همین حساب تطبیق بده.</p></div><button type="button" className={styles.iconButton} onClick={onClose} aria-label="بستن"><Icon name="close" /></button></div>
      {position?.source?.startsWith('screenshot') && <p className={styles.sourceHint}>منبع اولیه: تصویر {position.source.split('-')[1]} · تاریخ قیمت نامشخص</p>}
      <label className={styles.field}>نام دارایی<input name="name" defaultValue={position?.name || ''} maxLength={160} required dir="auto" autoFocus /></label>
      <div className={styles.formGrid}><label className={styles.field}>نماد، اختیاری<input name="symbol" defaultValue={position?.symbol || ''} maxLength={35} dir="ltr" placeholder="از سند اصلی" /></label><label className={styles.field}>ISIN، اختیاری<input name="isin" defaultValue={position?.isin || ''} maxLength={12} dir="ltr" placeholder="شناسه دقیق ۱۲ کاراکتری" /></label></div>
      <div className={styles.formGrid}>
        <label className={styles.field}>تعداد<input name="quantity" defaultValue={position?.quantity || ''} required inputMode="decimal" dir="ltr" placeholder="1.996985" /></label>
        <label className={styles.field}>گروه<select name="category" defaultValue={position?.category || 'stock'}>{Object.entries(CATEGORY_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label className={styles.field}>ارزش کل این دارایی (€)<input name="value" defaultValue={position ? (position.valueCents / 100).toFixed(2) : ''} inputMode="decimal" dir="ltr" required placeholder="1048.50" /><small>ارزش کل ردیف، نه قیمت هر واحد</small></label>
        <label className={styles.field}>سود یا زیان نمایش‌داده‌شده (€)<input name="gain" defaultValue={position?.gainCents != null ? (position.gainCents / 100).toFixed(2) : ''} inputMode="text" dir="ltr" placeholder="نامشخص: خالی بگذار" /><small>زیان با علامت منفی؛ مثل ‎−166.30</small></label>
      </div>
      <label className={styles.field}>تاریخ ارزش این ردیف، اگر مشخص است<input type="date" name="asOf" defaultValue={position?.asOf || account.snapshotDate || ''} max={new Date().toLocaleDateString('en-CA',{timeZone:'Europe/Berlin'})} dir="ltr" /></label>
      <label className={styles.field}>یادداشت و ابهام منبع<textarea name="note" rows={3} maxLength={1000} defaultValue={position?.note || ''} /></label>
      <label className={styles.checkbox}><input type="checkbox" name="verified" defaultChecked={position?.verified || false} />نام، تعداد و مبالغ این ردیف را با سند اصلی بررسی کرده‌ام.</label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.dialogActions}><button type="submit" className={styles.primaryButton}><Icon name="check" size={16} />ثبت تغییرات</button><button type="button" className={styles.secondaryButton} onClick={onClose}>انصراف</button>{position && <button type="button" className={styles.deleteButton} onClick={() => { if (confirmDelete) onDelete(position.id); else setConfirmDelete(true) }}>{confirmDelete ? 'تأیید حذف این دارایی' : 'حذف دارایی'}</button>}</div>
    </form>
  </dialog>
}
