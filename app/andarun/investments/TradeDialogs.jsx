'use client'

import { useEffect, useRef, useState } from 'react'
import { parseMoney } from '@/lib/investments/portfolio.mjs'
import { decimal, todayBerlin, tradePosition } from '@/lib/investments/family.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export function JournalDialog({ title, description, onClose, children, onSubmit, error, busy=false, submitLabel="ثبت در سابقه" }) {
  const dialog = useRef(null)
  useEffect(() => { const element = dialog.current; element.showModal(); return () => element.close() }, [])
  return <dialog id="investment-dialog" ref={dialog} className={styles.dialog} aria-labelledby="investment-dialog-title" dir="rtl" lang="fa" onCancel={event=>{if(busy)event.preventDefault();else onClose()}} onClick={event => { if (!busy&&event.target === dialog.current) onClose() }}><form onSubmit={onSubmit}><div className={styles.dialogHead}><div><h2 id="investment-dialog-title">{title}</h2>{description&&<p>{description}</p>}</div><button type="button" className={styles.iconButton} onClick={onClose} disabled={busy} aria-label="بستن"><Icon name="close" /></button></div>{children}{error && <p className={styles.error} role="alert">{error}</p>}<div className={styles.dialogActions}><button type="submit" disabled={busy} className={styles.primaryButton}><Icon name="check" size={16} />{submitLabel}</button><button type="button" disabled={busy} className={styles.secondaryButton} onClick={onClose}>انصراف</button></div></form></dialog>
}

export function ExecutionDialog({ trade, kind, onClose, onSave }) {
  const [error, setError] = useState('')
  const titles = { entry: 'ثبت ورود انجام‌شده', exit: 'ثبت خروج انجام‌شده', cancel: 'ثبت لغو برنامه' }
  function submit(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    try {
      const record = { id: crypto.randomUUID(), kind, date: values.get('date'), recordedAt: new Date().toISOString(), note: String(values.get('note') || '') }
      if (kind !== 'cancel') record.price = decimal(values.get('price'))
      if (kind !== 'cancel') record.quantity = decimal(values.get('quantity'))
      if (kind === 'exit') record.netResultCents = parseMoney(values.get('netResult'))
      onSave(record)
    } catch (err) { setError(err.message) }
  }
  return <JournalDialog title={titles[kind]} description={`${trade.plan.name} · این فرم فقط سابقه اجرای واقعی را ثبت می‌کند.`} onClose={onClose} onSubmit={submit} error={error}>
    <label className={styles.field}>تاریخ {kind === 'cancel' ? 'لغو' : 'اجرای واقعی'}<input type="date" name="date" defaultValue={todayBerlin()} min={trade.executions.at(-1)?.date || trade.plan.planDate} max={todayBerlin()} required dir="ltr" /></label>
    {kind !== 'cancel' && <label className={styles.field}>قیمت واقعی هر واحد ({trade.plan.currency})<input name="price" required inputMode="decimal" dir="ltr" placeholder="قیمت واقعی از سابقه بروکر" /></label>}
    {kind !== 'cancel' && <label className={styles.field}>تعداد / حجم واقعی<input name="quantity" defaultValue={kind === 'exit' ? tradePosition(trade).quantity : trade.plan.quantity || ''} required inputMode="decimal" dir="ltr" /><small>واحد حجم همان ابزار در XTB؛ حجم CFD لزوماً تعداد سهم نیست.</small></label>}
    {kind === 'exit' && <><label className={styles.field}>سود یا زیان خالص واقعی به یورو<input name="netResult" required inputMode="text" dir="ltr" placeholder="مثلاً ‎−25.50" /><small>مبلغ نهایی پس از هزینه‌ها، از گزارش حساب؛ از اختلاف قیمت CFD محاسبه نمی‌شود.</small></label><label className={styles.checkbox}><input type="checkbox" required />نتیجه خالص را به یورو با گزارش حساب تطبیق داده‌ام.</label></>}
    <label className={styles.field}>یادداشت {kind === 'cancel' ? 'و دلیل لغو' : 'اجرا'}<textarea name="note" rows={3} maxLength={1000} required={kind === 'cancel'} /></label>
  </JournalDialog>
}

export function TradeReviewDialog({ trade, onClose, onSave, investment = false }) {
  const plan = trade.plan || trade
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    try {
      onSave({ id: crypto.randomUUID(), date: values.get('date'), recordedAt: new Date().toISOString(), thesisValid: values.get('thesisValid'), followedPlan: values.get('followedPlan'), note: String(values.get('note')), chatResponse: String(values.get('chatResponse') || ''), actualOutcomeCents: parseMoney(values.get('actualOutcome') || '', true), noActionOutcomeCents: parseMoney(values.get('noActionOutcome') || '', true), evidence: String(values.get('evidence') || ''), nextReviewDate: values.get('nextReviewDate') || null })
    } catch (err) { setError(err.message) }
  }
  return <JournalDialog title="بازبینی تصمیم" description={`${plan.name} · نتیجه مالی و کیفیت تصمیم را جدا بررسی کن.`} onClose={onClose} onSubmit={submit} error={error}>
    <div className={styles.planReminder}><strong>فرض اولیه</strong><p>{plan.rationale}</p><strong>شرط ابطال</strong><p>{plan.invalidation}</p></div>
    <label className={styles.field}>تاریخ این بازبینی<input type="date" name="date" required defaultValue={todayBerlin()} min={trade.reviews.at(-1)?.date || plan.planDate} max={todayBerlin()} dir="ltr" /></label>
    <div className={styles.formGrid}><label className={styles.field}>فرض اولیه هنوز معتبر است؟<select name="thesisValid" defaultValue="uncertain"><option value="uncertain">هنوز مطمئن نیستم</option><option value="yes">بله</option><option value="no">خیر</option></select></label><label className={styles.field}>به برنامه پایبند بودم؟<select name="followedPlan" defaultValue="uncertain"><option value="uncertain">هنوز قابل ارزیابی نیست</option><option value="yes">بله</option><option value="no">خیر</option></select></label></div>
    <label className={styles.field}>چه چیزی فهمیدم و تصمیم بعدی چیست؟<textarea name="note" rows={4} required maxLength={1000} /></label>
    <label className={styles.field}>پاسخ ChatGPT، اختیاری<textarea name="chatResponse" rows={4} maxLength={20000} placeholder="پاسخ گفت‌وگوی شخصی‌ات را اینجا بچسبان؛ داده‌ای خودکار ارسال نمی‌شود." /></label>
    {investment && <><div className={styles.formGrid}><label className={styles.field}>نتیجه واقعی در دوره (€)<input name="actualOutcome" inputMode="decimal" dir="ltr" /></label><label className={styles.field}>نتیجه سناریوی بدون تغییر (€)<input name="noActionOutcome" inputMode="decimal" dir="ltr" /></label></div><label className={styles.field}>دوره و مبنای مقایسه<textarea name="evidence" rows={2} maxLength={2000} placeholder="بازه یکسان، واریز/برداشت، سود نقدی و هزینه‌ها؛ در صورت نامشخص بودن، اعداد را خالی بگذار." /></label></>}
    <label className={styles.field}>بازبینی بعدی<input type="date" name="nextReviewDate" min={todayBerlin()} dir="ltr" /><small>اگر موعد دیگری لازم نیست، خالی بگذار.</small></label>
  </JournalDialog>
}
