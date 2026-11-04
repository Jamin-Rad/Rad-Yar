'use client'
import {useMemo,useState} from 'react'
import {accountActivity} from '@/lib/investments/account-activity.mjs'
import {TRANSACTION_LABELS,ledgerReport,ledgerCsv} from '@/lib/investments/ledger.mjs'
import {money,signedMoney,number} from '@/lib/investments/portfolio.mjs'
import {TransactionDetail} from './LedgerWorkspace'
import styles from './AccountView.module.css'

export default function AccountTransactions({account,ledger,onReport,download}) {
  const [filter,setFilter]=useState({from:'',to:'',query:''}),[limit,setLimit]=useState(40),[detail,setDetail]=useState(null)
  const activity=useMemo(()=>accountActivity(ledger.transactions,account.id,filter),[ledger.transactions,account.id,filter])
  const visible=accountActivity(activity.rows.slice(0,limit),account.id).groups
  function change(key,value){setFilter(f=>({...f,[key]:value}));setLimit(40)}
  function exportRows(){download(ledgerCsv(ledgerReport(ledger.transactions,{...filter,accountId:account.id}),'transactions'),`transactions-${account.id}-${filter.from||'all'}-${filter.to||'now'}.csv`,'text/csv')}
  return <section className={styles.activity} aria-label={`تراکنش‌های حساب ${account.owner}`}>
    <div className={styles.toolbar}><div className={styles.dateFilters}><label>از تاریخ<input type="date" value={filter.from} max={filter.to||undefined} onChange={e=>change('from',e.target.value)}/></label><label>تا تاریخ<input type="date" value={filter.to} min={filter.from||undefined} onChange={e=>change('to',e.target.value)}/></label><label>جست‌وجو<input type="search" placeholder="نام دارایی یا ISIN" value={filter.query} onChange={e=>change('query',e.target.value)}/></label></div><div className={styles.actions}><button type="button" onClick={exportRows} disabled={!ledger.loaded}>خروجی CSV</button><button type="button" onClick={onReport}>گزارش مالی و مالیات</button></div></div>
    {ledger.error&&<p role="alert">{ledger.error}</p>}
    {!ledger.loaded?<p role="status" className={styles.empty}>دریافت تراکنش‌ها…</p>:<><p className={styles.count}>{number(activity.rows.length)} تراکنش</p>{visible.map(group=><section key={group.date} className={styles.day}><h3><time dateTime={group.date}>{new Date(group.date+'T12:00:00Z').toLocaleDateString('fa-IR',{dateStyle:'long',calendar:'gregory'})}</time><bdi>{group.date}</bdi></h3>{group.rows.map(tx=><button type="button" className={styles.transaction} key={tx.id} onClick={()=>setDetail(tx)}><span className={styles.txType}>{TRANSACTION_LABELS[tx.type]||tx.type}</span><span className={styles.txName}><strong dir="auto">{tx.name||TRANSACTION_LABELS[tx.type]||tx.type}</strong>{tx.quantity&&<small>تعداد <bdi>{tx.quantity}</bdi></small>}</span><strong className={tx.cashCents>0?styles.positive:tx.cashCents<0?styles.negative:''}><bdi>{tx.cashCents==null?money(null):signedMoney(tx.cashCents)}</bdi></strong></button>)}</section>)}{!visible.length&&<p className={styles.empty}>تراکنشی در این بازه نیست.</p>}{activity.rows.length>limit&&<button type="button" className={styles.more} onClick={()=>setLimit(n=>n+40)}>نمایش تراکنش‌های بیشتر</button>}</>}
    {detail&&<TransactionDetail tx={detail} onClose={()=>setDetail(null)}/>}
  </section>
}
