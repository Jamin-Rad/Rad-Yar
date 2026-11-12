'use client'
import {useEffect,useRef,useState} from 'react'
import {todayBerlin} from '@/lib/investments/family.mjs'
import {xtbBalance} from '@/lib/investments/xtb.mjs'
import {money,signedMoney,percent,parseMoney} from '@/lib/investments/portfolio.mjs'
import TradeWorkspace from './TradeWorkspace'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'
import view from './AccountView.module.css'

const LABELS={deposit:'واریز',withdrawal:'برداشت',realized:'سود و زیان بسته‌شده'}
export function XtbEntryDialog({account,onClose,onSave}) {
  const dialog=useRef(null),[error,setError]=useState('')
  useEffect(()=>{const d=dialog.current;d.showModal();return()=>d.close()},[])
  function submit(event){event.preventDefault();try{const form=new FormData(event.currentTarget),kind=form.get('kind'),amountCents=parseMoney(form.get('amount'));
    if (!amountCents || (kind!=='realized'&&amountCents<0))throw Error('مبلغ معتبر وارد کن؛ برای زیان از عدد منفی استفاده کن.')
    const date=form.get('date');if(date<account.asOf||date>todayBerlin())throw Error('تاریخ باید از وضعیت مبنا تا امروز باشد.')
    onSave({id:crypto.randomUUID(),kind,amountCents,date,note:String(form.get('note')).trim(),recordedAt:new Date().toISOString()})
  }catch(err){setError(err.message)}}
  return <dialog ref={dialog} id="investment-dialog" className={styles.dialog} dir="rtl" lang="fa" onCancel={onClose} aria-labelledby="xtb-entry-title"><div className={styles.dialogHead}><h2 id="xtb-entry-title">ثبت تراکنش XTB</h2><button type="button" onClick={onClose} className={styles.iconButton} aria-label="بستن"><Icon name="close"/></button></div><form onSubmit={submit}>
    <label className={styles.field}>نوع ثبت<select name="kind">{Object.entries(LABELS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
    <label className={styles.field}>مبلغ به یورو<input name="amount" required inputMode="decimal" dir="ltr"/><small>سود مثبت، زیان منفی؛ مبلغ خالص پس از هزینه‌ها.</small></label>
    <label className={styles.field}>تاریخ<input name="date" type="date" required min={account.asOf} max={todayBerlin()} defaultValue={todayBerlin()} dir="ltr"/></label>
    <label className={styles.field}>یادداشت<input name="note" maxLength={1000}/></label>
    {error&&<p role="alert" className={styles.error}>{error}</p>}<div className={styles.buttonRow}><button type="submit" className={styles.primaryButton}>ثبت</button><button type="button" className={styles.secondaryButton} onClick={onClose}>انصراف</button></div>
  </form></dialog>
}

export default function XtbAccountWorkspace({account,owner,trades,tradeProps}) {
  const [tab,setTab]=useState(tradeProps.createOpen||tradeProps.selectedId?'plans':'transactions')
  useEffect(()=>{if(tradeProps.createOpen||tradeProps.selectedId)setTab('plans')},[tradeProps.createOpen,tradeProps.selectedId])
  const balance=xtbBalance(account,trades)
  if(!balance)return <section className={view.wallet}><Icon name="trading" size={40}/><h2>موجودی XTB ثبت نشده است</h2></section>
  const ownTrades=trades.filter(t=>t.ownerId===account.id)
  return <>
    <section className={view.summary} aria-label={`موجودی XTB ${owner}`}><div className={view.metrics}>
      <div><span>موجودی حساب</span><strong><bdi>{money(balance.balanceCents)}</bdi></strong><small>موجودی پس از معاملات بسته‌شده</small></div>
      <div><span>سرمایهٔ اولیه</span><strong><bdi>{money(balance.openingCents)}</bdi></strong></div>
      <div><span>سود و زیان بسته‌شده</span><strong className={balance.profitCents<0?view.negative:view.positive}><bdi>{signedMoney(balance.profitCents)}</bdi></strong><small><bdi>{percent(balance.returnPercent)}</bdi> نسبت به سرمایهٔ اولیه</small></div>
    </div></section>
    <div className={view.tabs} role="tablist" aria-label="بخش‌های حساب XTB">{[['transactions','تراکنش‌ها'],['plans','برنامه‌های معامله']].map(([key,label])=><button type="button" role="tab" id={`xtb-tab-${key}`} aria-controls="xtb-tab-panel" tabIndex={tab===key?0:-1} key={key} aria-selected={tab===key} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'transactions':e.key==='End'?'plans':tab==='transactions'?'plans':'transactions';setTab(next);document.getElementById(`xtb-tab-${next}`)?.focus()}}} onClick={()=>setTab(key)}>{label}</button>)}</div>
    <div id="xtb-tab-panel" role="tabpanel" aria-labelledby={`xtb-tab-${tab}`}>{tab==='transactions'?<section className={view.xtbRows}><div className={view.xtbRow}><div><strong>وضعیت مبنا</strong><small><bdi>{account.asOf}</bdi> · سرمایهٔ اولیه <bdi>{money(account.openingCents)}</bdi> · سود بسته‌شده <bdi>{signedMoney(account.balanceCents-account.openingCents)}</bdi></small></div><strong><bdi>{money(account.balanceCents)}</bdi></strong></div>{balance.rows.map(row=><div key={row.id} className={view.xtbRow}><div><strong>{LABELS[row.kind]}</strong><small><bdi>{row.date}</bdi>{row.note&&<> · {row.note}</>}</small></div><strong className={row.deltaCents<0?view.negative:view.positive}><bdi>{signedMoney(row.deltaCents)}</bdi></strong></div>)}{!balance.rows.length&&<p className={view.empty}>تراکنش جدیدی پس از این وضعیت ثبت نشده است.</p>}</section>:<TradeWorkspace {...tradeProps} compact trades={ownTrades} settings={{xtbEquityCents:balance.balanceCents}}/>}</div>
  </>
}

export function DigitalWalletWorkspace({className = view.wallet}){return <section className={className}><Icon name="wallet" size={44}/><h2>کیف پول دیجیتال</h2><p>موجودی رمزارزها هنوز وارد نشده است.</p></section>}
