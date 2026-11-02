'use client'
import {useEffect,useRef,useState} from 'react'
import {ACCOUNT_DEFINITIONS} from '@/lib/investments/family.mjs'
import {transactionsFromCsv,ledgerReport} from '@/lib/investments/ledger.mjs'
import {money,number} from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

export default function TransactionImportDialog({onClose,onImported,initialAccount='self'}){
 const dialog=useRef(null),selection=useRef(0)
 const [accountId,setAccountId]=useState(initialAccount==='all'?'self':initialAccount),[file,setFile]=useState(null),[csv,setCsv]=useState(''),[preview,setPreview]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false)
 useEffect(()=>{dialog.current.showModal();return()=>dialog.current?.close()},[])
 function clear(){selection.current++;setFile(null);setCsv('');setPreview(null);setError('')}
 async function choose(event){
  const input=event.target.files?.[0];const version=++selection.current
  setFile(null);setCsv('');setPreview(null);setError('');if(!input)return
  try{
   if(input.size>3000000)throw Error('فایل باید کمتر از ۳ مگابایت باشد.')
   const text=await input.text();if(version!==selection.current)return
   const parsed=transactionsFromCsv(text,accountId),report=ledgerReport(parsed.transactions)
   setFile(input);setCsv(text);setPreview({parsed,report})
  }catch(err){if(version===selection.current)setError(err.message)}
 }
 async function save(event){
  event.preventDefault();if(!preview||!file)return
  setBusy(true);setError('')
  try{
   const response=await fetch('/api/andarun/investments/ledger',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accountId,csv,filename:file.name})})
   const result=await response.json();if(!response.ok)throw Error(result.error||'ذخیره انجام نشد.')
   onImported(result)
  }catch(err){setError(err.message)}finally{setBusy(false)}
 }
 return <dialog ref={dialog} className={styles.dialog} dir="rtl" lang="fa" onCancel={event=>{if(busy)event.preventDefault();else onClose()}} aria-labelledby="ledger-import-title"><form onSubmit={save}>
  <div className={styles.dialogHead}><div><h2 id="ledger-import-title">ورود تاریخچه تراکنش‌ها</h2><p>حساب مقصد را پیش از انتخاب فایل بررسی کن.</p></div><button type="button" className={styles.iconButton} onClick={onClose} disabled={busy} aria-label="بستن"><Icon name="close"/></button></div>
  <label className={styles.field}>صاحب حساب<select value={accountId} disabled={busy} onChange={e=>{setAccountId(e.target.value);clear()}}>{ACCOUNT_DEFINITIONS.map(a=><option value={a.id} key={a.id}>{a.owner}</option>)}</select></label>
  <label className={styles.field}>فایل CSV تراکنش‌ها<input key={accountId} type="file" accept=".csv,text/csv" onChange={choose} disabled={busy}/></label>
  <p className={styles.footnote}>در فایل Junior نام صاحب حساب ثبت نشده است؛ فایل مبین و مبینا را با حساب مقصد تطبیق بده. واردکردن شناسه‌های موجود، آن‌ها را دوباره ثبت نمی‌کند؛ تغییر محتوای همان شناسه متوقف می‌شود.</p>
  {preview&&<div className={styles.importPreview}><p><strong>{number(preview.parsed.transactions.length)}</strong> تراکنش · {preview.parsed.duplicates>0?`${number(preview.parsed.duplicates)} تکراری داخل فایل`:file.name}</p><p>مالیات کسرشده: <bdi>{money(preview.report.summary.taxWithheldCents)}</bdi> · برگشتی: <bdi>{money(preview.report.summary.taxRefundedCents)}</bdi></p><p>کارمزد: <bdi>{money(preview.report.summary.feesPaidCents)}</bdi> · درآمد نقدی خالص: <bdi>{money(preview.report.summary.incomeNetCents)}</bdi></p><label className={styles.checkbox}><input type="checkbox" required/>این فایل متعلق به حساب {ACCOUNT_DEFINITIONS.find(a=>a.id===accountId).owner} است.</label></div>}
  {error&&<p role="alert" className={styles.error}>{error}</p>}
  <div className={styles.dialogActions}><button type="submit" className={styles.primaryButton} disabled={!preview||busy}>{busy?'در حال ثبت خصوصی…':'تأیید و ذخیره در سرور'}</button><button type="button" className={styles.secondaryButton} disabled={busy} onClick={onClose}>انصراف</button></div>
 </form></dialog>
}
