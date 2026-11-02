'use client'
import {useState} from 'react'
import {holdingsFromCsv,mergeHoldings} from '@/lib/investments/import.mjs'
import {money,number} from '@/lib/investments/portfolio.mjs'
import {JournalDialog} from './TradeDialogs'
import styles from './investments.module.css'
export default function HoldingsImportDialog({account,onClose,onSave,download}){
 const [rows,setRows]=useState(null),[error,setError]=useState('')
 async function choose(event){setRows(null);setError('');const file=event.target.files?.[0];if(!file)return;if(file.size>1000000){setError('حداکثر اندازه CSV یک مگابایت است.');return}try{setRows(holdingsFromCsv(await file.text(),()=>crypto.randomUUID(),account.owner))}catch(err){setError(err.message)}}
 function submit(event){event.preventDefault();if(!rows)return;try{onSave(mergeHoldings(account,rows))}catch(err){setError(err.message)}}
 return <JournalDialog title={`ورود CSV حساب ${account.owner}`} description="پیش‌نمایش را بررسی کن؛ فقط دارایی‌های همین حساب افزوده یا به‌روز می‌شوند." onClose={onClose} onSubmit={submit} error={error}>
 <p className={styles.footnote}>فهرست دارایی با ارزش کل به یورو؛ تاریخچه خرید و فروش و PDF در این فرم پذیرفته نمی‌شود. ستون تاریخ با قالب YYYY-MM-DD است.</p>
 <button type="button" className={styles.secondaryButton} onClick={()=>download('Asset,ISIN,Quantity,Recorded value EUR,Displayed gain EUR,As of\r\nExample asset,,2.5,250.00,,\r\n','holdings-template.csv','text/csv')}>دانلود قالب CSV</button>
 <label className={styles.fileField}>فایل دارایی‌ها<input type="file" accept=".csv,text/csv" required onChange={choose}/></label>
 {rows&&<><div className={styles.importPreview}><strong>{number(rows.length)} ردیف · {money(rows.reduce((s,p)=>s+p.valueCents,0))}</strong><p>تطبیق با ISIN؛ در نبود آن، نام دقیق. دارایی‌های دیگر و تاریخچه حفظ می‌شوند.</p>{rows.slice(0,6).map(p=><p key={p.id}><bdi>{p.name}</bdi> · <bdi>{p.quantity}</bdi> · <bdi>{money(p.valueCents)}</bdi></p>)}</div><label className={styles.checkbox}><input type="checkbox" required/>مالک حساب، واحد یورو، تعداد، ارزش کل و تاریخ ردیف‌ها را بررسی کردم.</label></>}
 </JournalDialog>
}
