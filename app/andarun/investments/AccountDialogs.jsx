'use client'

import { useState } from 'react'
import { createSnapshot, todayBerlin, normalizeFamilyState, MAX_BACKUP_BYTES } from '@/lib/investments/family.mjs'
import { number, money } from '@/lib/investments/portfolio.mjs'
import { JournalDialog } from './TradeDialogs'
import styles from './investments.module.css'

export function SnapshotDialog({ account, onClose, onSave }) {
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try { onSave(createSnapshot(account, { id: crypto.randomUUID(), asOf: form.get('asOf'), recordedAt: new Date().toISOString(), note: String(form.get('note')) })) }
    catch (err) { setError(err.message) }
  }
  return <JournalDialog title={`ثبت وضعیت حساب ${account.owner}`} description="این ثبت برای مقایسه‌های آینده حفظ می‌شود و بازنویسی نمی‌شود." onClose={onClose} onSubmit={submit} error={error}>
    <label className={styles.field}>این ارزش‌ها مربوط به چه تاریخی هستند؟<input type="date" name="asOf" required max={todayBerlin()} defaultValue={account.snapshotDate || ''} dir="ltr" /></label>
    <label className={styles.field}>یادداشت<textarea name="note" rows={3} maxLength={1000} placeholder="مثلاً خرید، فروش یا تغییرات مهمی که باید در مقایسه در نظر گرفت" /></label>
    <label className={styles.checkbox}><input type="checkbox" required />تعداد و ارزش همه ردیف‌های فعلی این حساب را با تاریخ انتخاب‌شده تطبیق داده‌ام.</label>
    <p className={styles.footnote}>از عکس بدون تاریخ، ثبت امروز ساخته نمی‌شود. ابتدا مبالغ را با وضعیت واقعی همان روز تطبیق بده.</p>
  </JournalDialog>
}

export function AccountDetailsDialog({ account, onClose, onSave }) {
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try { onSave({ ...account, snapshotDate: form.get('snapshotDate') || null, complete: form.get('complete') === 'on' }) }
    catch (err) { setError(err.message) }
  }
  return <JournalDialog title={`مشخصات حساب ${account.owner}`} description="مالکیت حساب ثابت است؛ تاریخ و پوشش اطلاعات را مشخص کن." onClose={onClose} onSubmit={submit} error={error}>
    <label className={styles.field}>تاریخ داده‌های فعلی، اگر مشخص است<input type="date" name="snapshotDate" max={todayBerlin()} defaultValue={account.snapshotDate || ''} dir="ltr" /></label>
    <label className={styles.checkbox}><input type="checkbox" name="complete" defaultChecked={account.complete} />همه دارایی‌های این حساب وارد شده‌اند.</label>
    <p className={styles.footnote}>وجه نقد، واریز و برداشت و معاملات بسته‌شده در ارزش فعلی دارایی‌ها محاسبه نمی‌شوند.</p>
  </JournalDialog>
}

export function BackupDialog({ state, onClose, onImport, download }) {
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [legacy, setLegacy] = useState(false)
  async function choose(event) {
    const file = event.target.files?.[0]
    setPreview(null); setError('')
    if (!file) return
    if (file.size > MAX_BACKUP_BYTES) { setError('فایل از حد مجاز ۱۲ مگابایت بزرگ‌تر است.'); return }
    try { const raw = JSON.parse(await file.text()); setLegacy(raw.version === 1); setPreview(normalizeFamilyState(raw)) }
    catch (err) { setError(err.message || 'فایل خوانده نشد.') }
  }
  function submit(event) {
    event.preventDefault()
    if (!preview) return
    try {
      onImport(legacy ? { ...state, accounts: state.accounts.map(account => account.id === 'self' ? { ...preview.accounts[0], snapshots: account.snapshots } : account) } : preview)
    } catch (err) { setError(err.message) }
  }
  const count = preview?.accounts.reduce((sum, a) => sum + a.positions.length, 0) || 0
  return <JournalDialog title="بازیابی پشتیبان سرمایه" description="پشتیبان JSON این ابزار را انتخاب کن؛ ابتدا پیش‌نمایش می‌بینی." onClose={onClose} onSubmit={submit} error={error}>
    <label className={styles.fileField}>انتخاب فایل JSON<input type="file" accept=".json,application/json" onChange={choose} required /></label>
    {preview && <div className={styles.importPreview}><strong>{number(count)} دارایی · {number(preview.trades.length)} برنامه معامله</strong><p>{legacy ? 'نسخه قبلی است؛ فقط حساب من به‌روز می‌شود و بقیه حساب‌ها حفظ می‌شوند.' : 'حساب‌ها با این فایل جایگزین می‌شوند. سابقه تصمیم‌ها و ثبت‌های قبلی باید حفظ شده باشد.'}</p></div>}
    <button type="button" className={styles.secondaryButton} onClick={() => download(JSON.stringify(state, null, 2), 'family-before-import.json', 'application/json')}>پشتیبان از وضعیت فعلی</button>
    {preview && <label className={styles.checkbox}><input type="checkbox" required />پیش‌نمایش را بررسی کردم و جایگزینی اطلاعات را تأیید می‌کنم.</label>}
  </JournalDialog>
}
