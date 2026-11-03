'use client'
import {useState} from 'react'
import {ACCOUNT_DEFINITIONS,todayBerlin} from '@/lib/investments/family.mjs'
import {cashPlanStatus} from '@/lib/investments/cash-plan.mjs'
import {money,number,parseMoney} from '@/lib/investments/portfolio.mjs'
import {JournalDialog} from './TradeDialogs'
import styles from './investments.module.css'
export function CashPlans({plans=[],ledger,onPost,onEdit}){
 if(!plans.length)return null
 return <section className={styles.cashPlans} aria-label="واریزهای ماهانه">{plans.map(plan=>{
  const status=cashPlanStatus(plan,ledger.transactions,todayBerlin())
  return <article key={plan.id}><div><strong>واریز ماهانه · {ACCOUNT_DEFINITIONS.find(a=>a.id===plan.accountId)?.owner}</strong><span><bdi>{money(plan.amountCents)}</bdi> · روز {number(plan.day)} هر ماه{!plan.active?' · متوقف':''}</span></div><div className={styles.buttonRow}><button type="button" className={styles.secondaryButton} disabled={!ledger.loaded||!status.ready} onClick={()=>onPost(plan)}>{status.recorded?'این ماه ثبت شده':'ثبت واریز این ماه'}</button><button type="button" className={styles.textButton} onClick={()=>onEdit(plan)}>ویرایش</button></div></article>
 })}</section>
}
export function CashPlanDialog({plan,accountId='self',onSave,onClose}){
 const [error,setError]=useState('')
 function submit(e){e.preventDefault();const form=new FormData(e.currentTarget);try{onSave({id:plan?.id||crypto.randomUUID(),accountId:form.get('accountId'),amountCents:parseMoney(form.get('amount')),day:Number(form.get('day')),startMonth:form.get('startMonth'),active:form.get('active')==='on'})}catch(err){setError(err.message)}}
 return <JournalDialog title="واریز ماهانه از بانک" onClose={onClose} onSubmit={submit} error={error}><label className={styles.field}>حساب<select name="accountId" defaultValue={plan?.accountId||accountId}>{ACCOUNT_DEFINITIONS.map(a=><option value={a.id} key={a.id}>{a.owner}</option>)}</select></label><div className={styles.formGrid}><label className={styles.field}>مبلغ (یورو)<input name="amount" inputMode="decimal" dir="ltr" defaultValue={plan?(plan.amountCents/100).toFixed(2):''} required/></label><label className={styles.field}>روز ماه<input type="number" name="day" min="1" max="31" defaultValue={plan?.day||''} required dir="ltr"/></label></div><label className={styles.field}>شروع از ماه<input type="month" name="startMonth" defaultValue={plan?.startMonth||todayBerlin().slice(0,7)} required dir="ltr"/></label><label className={styles.checkbox}><input type="checkbox" name="active" defaultChecked={plan?.active!==false}/>فعال</label><p className={styles.footnote}>بعد از دریافت پول، واریز هر ماه را با یک دکمه ثبت کن.</p></JournalDialog>
}
