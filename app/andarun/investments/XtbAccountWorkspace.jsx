'use client'
import {useEffect,useRef,useState} from 'react'
import {todayBerlin,tradeStatus} from '@/lib/investments/family.mjs'
import {valueXtbAccount} from '@/lib/investments/xtb-risk.mjs'
import {xtbBalance} from '@/lib/investments/xtb.mjs'
import {money,signedMoney,percent,parseMoney} from '@/lib/investments/portfolio.mjs'
import TradeWorkspace from './TradeWorkspace'
import { xtbMarkets } from '@/lib/investments/xtb-markets.mjs'
import InvestmentPositionChart from './InvestmentPositionChart'
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

export default function XtbAccountWorkspace({account,owner,trades,tradeProps,drawings,onDrawings}) {
  const ownTrades=trades.filter(t=>t.ownerId===account?.id)
  const openTrades=ownTrades.filter(t=>tradeStatus(t)==='open')
  const [chartId,setChartId]=useState(null)
  const [marketSymbol,setMarketSymbol]=useState(null)
  const executedTrades=ownTrades.filter(t=>t.executions.some(event=>event.kind==='entry'))
  const chartTrade=executedTrades.find(t=>t.id===chartId)||openTrades[0]||executedTrades[0]
  const watchMarket=xtbMarkets.find(market=>market.symbol===marketSymbol)??(!chartTrade?xtbMarkets[0]:null)
  const [tab,setTab]=useState(tradeProps.createOpen||tradeProps.selectedId||openTrades.length?'plans':'transactions')
  useEffect(()=>{if(tradeProps.createOpen||tradeProps.selectedId)setTab('plans')},[tradeProps.createOpen,tradeProps.selectedId])
  const balance=xtbBalance(account,trades)
  const cacheKey = 'andarun-xtb-equity-v1:' + account?.id
  const [quotes,setQuotes]=useState({})
  const [refreshing,setRefreshing]=useState(false)
  const [quoteError,setQuoteError]=useState('')
  useEffect(()=>{
    try { setQuotes(JSON.parse(localStorage.getItem(cacheKey)) || {}) } catch {}
  },[cacheKey])
  const valuation=valueXtbAccount(balance?.balanceCents,openTrades,quotes)
  const hasBrent=openTrades.some(t=>t.plan.product==='cfd'&&t.plan.symbol?.trim().toUpperCase()==='OIL'&&t.plan.currency==='USD')
  async function refreshEquity(){
    setRefreshing(true)
    setQuoteError('')
    try {
      const response=await fetch('/api/andarun/investments/market?symbol=BZ%3DF&refresh=1',{cache:'no-store'})
      if(!response.ok) throw Error('quote')
      const {quote,fx}=await response.json()
      if(quote?.symbol!=='BZ=F'||quote.currency!=='USD'||!(quote.price>0)||!(fx?.latest?.rate>0))throw Error('quote')
      const next={'BZ=F':{price:quote.price,currency:quote.currency,asOf:quote.asOf,eurRate:fx.latest.rate}}
      setQuotes(next)
      try { localStorage.setItem(cacheKey,JSON.stringify(next)) } catch {}
    } catch { setQuoteError('قیمت تازه یا نرخ تبدیل دریافت نشد. آخرین قیمت ذخیره‌شده در صورت وجود نمایش داده می‌شود.') }
    finally {setRefreshing(false)}
  }
  return <>
    {balance&&<section className={view.summary} aria-label={`ارزش XTB ${owner}`}>
      <div className={view.metrics}>
        <div><span>ارزش برآوردی حساب</span><strong><bdi>{valuation.equityCents==null?'—':money(valuation.equityCents)}</bdi></strong></div>
        <div><span>ماندهٔ حساب</span><strong><bdi>{money(balance.balanceCents)}</bdi></strong></div>
        <div><span>سود و زیان باز برآوردی</span><strong><bdi>{valuation.openCents==null?'—':signedMoney(valuation.openCents)}</bdi></strong></div>
      </div>
      {hasBrent&&<button type="button" className={styles.secondaryButton} disabled={refreshing} onClick={refreshEquity}>{refreshing?'در حال دریافت…':'به‌روزرسانی قیمت حساب'}</button>}
      {openTrades.length>valuation.priced&&<p>برای {openTrades.length-valuation.priced} موقعیت باز، قیمت یا مشخصات کافی برای ارزش‌گذاری موجود نیست.</p>}
      {quotes['BZ=F']?.asOf&&<p>Yahoo Finance · <bdi>BZ=F · {quotes['BZ=F'].price} USD · {new Date(quotes['BZ=F'].asOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'})}</bdi> · تعدیلات ثبت‌شدهٔ XTB</p>}
      {openTrades.some(t=>t.brokerSnapshot)&&<ul>{openTrades.filter(t=>t.brokerSnapshot).map(t=><li key={t.id}>
        <bdi>{t.plan.symbol} · {t.brokerSnapshot.positionId}</bdi> · خالص گزارش‌شدهٔ XTB <bdi>{signedMoney(t.brokerSnapshot.netCents)}</bdi> در قیمت <bdi>{t.brokerSnapshot.price} {t.plan.currency}</bdi>
      </li>)}</ul>}
      {quoteError&&<p role="status">{quoteError}</p>}
    </section>}
    <nav aria-label="بازارهای XTB" className={styles.buttonRow}>
      {chartTrade&&<button type="button" className={styles.secondaryButton} aria-pressed={!watchMarket} onClick={()=>setMarketSymbol(null)}>موقعیت‌های حساب</button>}
      {xtbMarkets.map(market=><button key={market.symbol} type="button" className={styles.secondaryButton} aria-pressed={(watchMarket?.symbol??(!chartTrade?'US100':null))===market.symbol} onClick={()=>setMarketSymbol(market.symbol)}>{market.name} · <bdi>{market.symbol}</bdi></button>)}
    </nav>
    {watchMarket&&(()=>{
      const market=watchMarket
      const preview={id:market.symbol,ownerId:account?.id,plan:{symbol:market.symbol,name:market.name,currency:'USD',direction:'long'},executions:[]}
      return <InvestmentPositionChart key={'market:'+market.symbol} trade={preview} watchMarket={market} drawings={drawings} onDrawings={onDrawings}/>
    })()}
    {chartTrade && !watchMarket && <>
      {executedTrades.length > 1 && <label className={styles.field}>موقعیت روی نمودار
        <select value={chartTrade.id} onChange={event=>setChartId(event.target.value)}>
          {executedTrades.map(trade=><option key={trade.id} value={trade.id}>{trade.plan.name} · {trade.plan.planDate}</option>)}
        </select>
      </label>}
      <InvestmentPositionChart key={chartTrade.id} trade={chartTrade} symbolTrades={executedTrades.filter(item=>item.plan.symbol===chartTrade.plan.symbol&&item.plan.currency===chartTrade.plan.currency)} onTransaction={tradeStatus(chartTrade)==='open'?kind=>{setTab('plans');tradeProps.onSelect(chartTrade.id);tradeProps.onCreateOpen(false);tradeProps.onExecution(kind)}:undefined} openCount={openTrades.length} drawings={drawings} onDrawings={onDrawings}/>
    </>}
    {!balance?<section className={view.wallet}><Icon name="trading" size={40}/><h2>موجودی XTB ثبت نشده است</h2></section>:<>
    <section className={view.summary} aria-label={`موجودی XTB ${owner}`}><div className={view.metrics}>

      <div><span>سرمایهٔ اولیه</span><strong><bdi>{money(balance.openingCents)}</bdi></strong></div>
      <div><span>سود و زیان بسته‌شده</span><strong className={balance.profitCents<0?view.negative:view.positive}><bdi>{signedMoney(balance.profitCents)}</bdi></strong><small><bdi>{percent(balance.returnPercent)}</bdi> نسبت به سرمایهٔ اولیه</small></div>
    </div></section>
    <div className={view.tabs} role="tablist" aria-label="بخش‌های حساب XTB">{[['transactions','تراکنش‌ها'],['plans','برنامه‌های معامله']].map(([key,label])=><button type="button" role="tab" id={`xtb-tab-${key}`} aria-controls="xtb-tab-panel" tabIndex={tab===key?0:-1} key={key} aria-selected={tab===key} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'transactions':e.key==='End'?'plans':tab==='transactions'?'plans':'transactions';setTab(next);document.getElementById(`xtb-tab-${next}`)?.focus()}}} onClick={()=>setTab(key)}>{label}</button>)}</div>
    <div id="xtb-tab-panel" role="tabpanel" aria-labelledby={`xtb-tab-${tab}`}>{tab==='transactions'?<section className={view.xtbRows}><div className={view.xtbRow}><div><strong>وضعیت مبنا</strong><small><bdi>{account.asOf}</bdi> · سرمایهٔ اولیه <bdi>{money(account.openingCents)}</bdi> · سود بسته‌شده <bdi>{signedMoney(account.balanceCents-account.openingCents)}</bdi></small></div><strong><bdi>{money(account.balanceCents)}</bdi></strong></div>{balance.rows.map(row=><div key={row.id} className={view.xtbRow}><div><strong>{LABELS[row.kind]}</strong><small><bdi>{row.date}</bdi>{row.note&&<> · {row.note}</>}</small></div><strong className={row.deltaCents<0?view.negative:view.positive}><bdi>{signedMoney(row.deltaCents)}</bdi></strong></div>)}{!balance.rows.length&&<p className={view.empty}>تراکنش جدیدی پس از این وضعیت ثبت نشده است.</p>}</section>:<TradeWorkspace {...tradeProps} compact trades={ownTrades} settings={{xtbEquityCents:balance.balanceCents}}/>}</div>
    </>}
  </>
}

export function DigitalWalletWorkspace({className = view.wallet}){return <section className={className}><Icon name="wallet" size={44}/><h2>کیف پول دیجیتال</h2><p>موجودی رمزارزها هنوز وارد نشده است.</p></section>}
