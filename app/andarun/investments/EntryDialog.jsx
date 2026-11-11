'use client'
import {useRef,useState} from 'react'
import {ACCOUNT_DEFINITIONS} from '@/lib/investments/family.mjs'
import {parseMoney,normalizeDigits} from '@/lib/investments/portfolio.mjs'
import {manualEntryBatches} from '@/lib/investments/manual-entry.mjs'
import {JournalDialog} from './TradeDialogs'
import styles from './investments.module.css'
const kinds=[['BUY','خرید'],['SELL','فروش'],['DEPOSIT','واریز از بانک'],['WITHDRAW','برداشت به بانک'],['TRANSFER','انتقال بین حساب‌ها']]
export default function EntryDialog({state,ledger,initialAccount='self',initialKind='BUY',initialAmount='',plan=null,onClose,onSaved}){
  const [kind,setKind]=useState(initialKind),[accountId,setAccountId]=useState(initialAccount==='all'?'self':initialAccount),[selected,setSelected]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false)
  const requestId=useRef(null),locked=useRef(false)
  const instruments=[...new Map([...state.accounts.flatMap(a=>a.positions),...(ledger.transactions||[])].filter(p=>p.isin).map(p=>[p.isin,{isin:p.isin,name:p.name}])).values()].sort((a,b)=>a.name.localeCompare(b.name))
  const instrument=instruments.find(p=>p.isin===selected),trade=kind==='BUY'||kind==='SELL'
  async function submit(event){
    event.preventDefault();if(locked.current)return
    const form=new FormData(event.currentTarget)
    try{
      const input={requestId:requestId.current||(requestId.current=crypto.randomUUID()),kind,accountId,datetime:new Date(form.get('datetime')).toISOString(),netCents:parseMoney(form.get('amount')),note:String(form.get('note')||'')}
      if(kind==='TRANSFER'){input.fromAccount=accountId;input.toAccount=form.get('toAccount')}
      if(trade)Object.assign(input,{isin:instrument?.isin||form.get('isin'),name:instrument?.name||form.get('name'),quantity:normalizeDigits(form.get('quantity')).replace(/[٫,]/g,'.'),feeCents:parseMoney(form.get('fee')||'',true),taxCents:parseMoney(form.get('tax')||'',true)})
      if(plan){input.planId=plan.id;input.requestId=`plan_${plan.id}_${new Date(input.datetime).toLocaleDateString('en-CA',{timeZone:'Europe/Berlin'}).slice(0,7)}`}
      manualEntryBatches(input)
      locked.current=true;setBusy(true);setError('')
      const response=await fetch('/api/andarun/investments/entry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)})
      const result=await response.json();if(!response.ok)throw Error(result.error||'ثبت انجام نشد.')
      await onSaved(result)
    }catch(err){setError(err.message)}finally{locked.current=false;setBusy(false)}
  }
  const localNow=new Date().toLocaleString('sv-SE').slice(0,16).replace(' ','T')
  return <JournalDialog title="ثبت تراکنش" onClose={()=>{if(!locked.current)onClose()}} onSubmit={submit} error={error} submitLabel={busy?'در حال ثبت…':'ثبت تراکنش'} busy={busy}>
    <fieldset disabled={busy} className={styles.entryFields}>
      <div className={styles.formGrid}><label className={styles.field}>نوع<select value={kind} onChange={e=>setKind(e.target.value)}>{kinds.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label><label className={styles.field}>{kind==='TRANSFER'?'حساب مبدأ':'حساب'}<select value={accountId} onChange={e=>setAccountId(e.target.value)}>{ACCOUNT_DEFINITIONS.map(a=><option key={a.id} value={a.id}>{a.owner}</option>)}</select></label></div>
      {kind==='TRANSFER'&&<label className={styles.field}>حساب مقصد<select name="toAccount" defaultValue="mobin">{ACCOUNT_DEFINITIONS.filter(a=>a.id!==accountId).map(a=><option key={a.id} value={a.id}>{a.owner}</option>)}</select></label>}
      {trade&&<><label className={styles.field}>دارایی<select value={selected} onChange={e=>setSelected(e.target.value)}><option value="">دارایی جدید</option>{instruments.map(p=><option key={p.isin} value={p.isin}>{p.name}</option>)}</select></label>{!instrument&&<div className={styles.formGrid}><label className={styles.field}>نام دارایی<input name="name" required maxLength={160}/></label><label className={styles.field}>شناسه دارایی<input name="isin" required dir="ltr" placeholder="ISIN" maxLength={12}/></label></div>}<label className={styles.field}>تعداد سهم<input name="quantity" required inputMode="decimal" dir="ltr"/></label></>}
      <div className={styles.formGrid}><label className={styles.field}>{kind==='BUY'?'کل مبلغ پرداخت‌شده (یورو)':kind==='SELL'?'خالص دریافتی (یورو)':'مبلغ (یورو)'}<input name="amount" required inputMode="decimal" dir="ltr" defaultValue={initialAmount}/></label><label className={styles.field}>زمان تراکنش<input type="datetime-local" name="datetime" required defaultValue={localNow} max={localNow} dir="ltr"/></label></div>
      {trade&&<><div className={styles.formGrid}><label className={styles.field}>کارمزد (یورو)<input name="fee" required inputMode="decimal" dir="ltr" placeholder="در صورت نداشتن، صفر"/></label><label className={styles.field}>مالیات (یورو)<input name="tax" required inputMode="decimal" dir="ltr" placeholder="در صورت نداشتن، صفر"/></label></div><small>در صورت نداشتن کارمزد یا مالیات، صفر وارد کن. مبلغ بالا پس از محاسبه این هزینه‌هاست.</small></>}
      <label className={styles.field}>یادداشت<input name="note" maxLength={1000}/></label>
    </fieldset>
  </JournalDialog>
}
