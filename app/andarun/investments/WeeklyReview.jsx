'use client'
import {useEffect,useState} from 'react'
import {reviewQueue,nextReviewDate,todayBerlin} from '@/lib/investments/family.mjs'
import {marketForPosition,marketTrusted,marketKey,marketImpact,attentionQueue} from '@/lib/investments/market.mjs'
import {signedMoney,percent,number} from '@/lib/investments/portfolio.mjs'
import {decisionDue} from './DecisionWorkspace'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'
export default function WeeklyReview({state,marketData,onTrade,onDecision,onAsset,onAccount,onNewTrade,onReport,onEventDone}){
 const [filter,setFilter]=useState('all'),[owner,setOwner]=useState('all'),[expanded,setExpanded]=useState(false)
 const historyRows=JSON.stringify([...new Map(state.accounts.flatMap(a=>a.positions.filter(p=>p.marketConfirmed&&p.marketSymbol||state.settings?.isinPricesEnabled&&p.isin).map(p=>({key:marketKey(p),name:p.name}))).map(row=>[row.key,row])).values()])
 useEffect(()=>{
  let active=true,index=0
  const instruments=JSON.parse(historyRows)
  async function worker(){while(active&&index<instruments.length){const row=instruments[index++];await marketData.load(row.key,row.name,false,true)}}
  Promise.all(Array.from({length:Math.min(3,instruments.length)},worker))
  return ()=>{active=false}
 },[historyRows,marketData.load])
 const today=todayBerlin()
 const all=attentionQueue(state,marketData.markets,today)
 const rows=all.filter(r=>(owner==='all'||r.accountId===owner)&&(filter==='all'||r.reasons.some(reason=>reason.kind===filter)))
 const plans=[...reviewQueue(state).map(t=>({id:t.id,name:t.plan.name,owner:'XTB',date:nextReviewDate(t),kind:'trade'})),...state.decisions.filter(d=>decisionDue(d)&&decisionDue(d)<=today).map(d=>({id:d.id,name:d.name,owner:state.accounts.find(a=>a.id===d.accountId)?.owner,date:decisionDue(d),kind:'decision'}))].sort((a,b)=>a.date.localeCompare(b.date))
 const upcoming=state.events.filter(e=>!e.done&&e.date<=new Date(Date.now()+30*86400000).toISOString().slice(0,10)).sort((a,b)=>a.date.localeCompare(b.date))
 const count=state.accounts.flatMap(a=>a.positions).length
 const matched=state.accounts.flatMap(a=>a.positions).filter(p=>marketTrusted(p,marketForPosition(p,marketData.markets))).length
 const withHistory=state.accounts.flatMap(a=>a.positions).filter(p=>marketImpact(p,marketForPosition(p,marketData.markets),7)).length
 return <div className={styles.sectionStack}>
 <section className={styles.panel}><div className={styles.panelHead}><div><h2>این هفته کجا را دقیق‌تر بررسی کنم؟</h2><p>{number(matched)} از {number(count)} دارایی با قیمت · {number(withHistory)} دارایی با مقایسهٔ هفتگی · {number(plans.length)} تصمیم سررسیدشده</p></div><button type="button" className={styles.primaryButton} onClick={onReport}>آماده‌سازی مرور در ChatGPT</button></div><p className={styles.footnote}>اولویت‌ها براساس قواعد قابل مشاهده‌اند؛ سیگنال خرید یا فروش نیستند. اثر پولی، برآوردی با تعداد فعلی است. دارایی بدون نماد تطبیق‌شده در رتبه‌بندی حرکت بازار وارد نمی‌شود.</p>
 <div className={styles.weeklyFilters}><div className={styles.segmented}>{[['all','همه'],['movement','حرکت بازار'],['news','خبر مهم احتمالی'],['quality','تکمیل اطلاعات']].map(([key,label])=><button key={key} type="button" aria-pressed={filter===key} onClick={()=>setFilter(key)}>{label}</button>)}</div><label className={styles.field}>حساب<select value={owner} onChange={e=>setOwner(e.target.value)}><option value="all">همه حساب‌ها</option>{state.accounts.map(a=><option key={a.id} value={a.id}>{a.owner}</option>)}</select></label></div>
 {rows.length?<div className={styles.attentionList}>{rows.slice(0,expanded?rows.length:6).map(row=><button type="button" key={`${row.accountId}:${row.positionId}`} onClick={()=>onAsset(row.accountId,row.positionId)}><div><strong dir="auto">{row.name}</strong><small>حساب {row.owner}</small></div><div>{row.reasons.map((reason,i)=><p key={i}>{reason.text}</p>)}</div><div>{row.movement&&<><strong><bdi>{signedMoney(row.movement.deltaCents)}</bdi></strong><small><bdi>{percent(row.movement.nativePercent)}</bdi> تغییر قیمت مرجع</small></>}<Icon name="arrow" size={16}/></div></button>)}</div>:<div className={styles.calmEmpty}><Icon name="review" size={30}/><strong>موردی در این فیلتر ثبت نشده است</strong><p>پوشش داده و زمان منبع را بررسی کن؛ نبود مورد، تضمین آرام بودن بازار نیست.</p></div>}
 {rows.length>6&&<button type="button" className={styles.textButton} onClick={()=>setExpanded(v=>!v)}>{expanded?'نمایش کمتر':`نمایش همه ${number(rows.length)} مورد`}</button>}
 </section>
 <div className={styles.overviewBottom}><section className={styles.panel}><div className={styles.panelHead}><h2>تصمیم‌های موعددار خانواده و XTB</h2><Icon name="calendar"/></div>{plans.length?plans.map(p=><button key={p.id} type="button" className={styles.reviewQueueRow} onClick={()=>p.kind==='trade'?onTrade(p.id):onDecision(p.id)}><span><strong dir="auto">{p.name}</strong><small>حساب {p.owner} · {p.date}</small></span><Icon name="arrow" size={16}/></button>):<div className={styles.calmEmpty}><strong>بازبینی سررسیدشده‌ای نداری</strong><p>از پرونده هر دارایی تصمیم ثبت کن؛ برنامه‌های XTB هم در همین فهرست می‌آیند.</p><button type="button" className={styles.outlineButton} onClick={onNewTrade}>برنامه جدید XTB</button></div>}</section>
 <section className={styles.panel}><div className={styles.panelHead}><h2>رویدادهای دستی و موعدهای مهم</h2></div>{upcoming.length?upcoming.map(e=><article key={e.id} className={styles.eventRow}><button type="button" className={styles.textButton} onClick={()=>onAsset(e.accountId,e.positionId)}>{e.title} · <bdi>{e.date}</bdi></button>{e.url&&<a href={e.url} target="_blank" rel="noreferrer">منبع</a>}<button type="button" className={styles.secondaryButton} onClick={()=>onEventDone(e.id)}>بررسی شد</button></article>):<p className={styles.muted}>برای گزارش مالی شرکت، تقسیم سود یا موعد دلخواه، از پرونده دارایی رویداد ثبت کن. تقویم خودکار شرکت‌ها هنوز منبع تأییدشده ندارد.</p>}</section></div>
 <section className={styles.panel}><div className={styles.panelHead}><h2>تاریخ اطلاعات حساب‌ها</h2></div>{state.accounts.map(account=><button key={account.id} type="button" className={styles.reviewQueueRow} onClick={()=>onAccount(account.id)}><strong>{account.owner}</strong><span>{number(account.positions.length)} دارایی · {number(account.snapshots.length)} ثبت تاریخی</span><span>{account.snapshotDate||'تاریخ فعلی نامشخص'}</span><Icon name="arrow" size={16}/></button>)}</section>
 </div>
}
