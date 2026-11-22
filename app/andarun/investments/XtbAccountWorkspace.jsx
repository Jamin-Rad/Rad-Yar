'use client'
import {useEffect,useRef,useState} from 'react'
import {todayBerlin,tradeStatus} from '@/lib/investments/family.mjs'
import {readChartHistory} from '@/lib/investments/local-asset-chart.mjs'
import {valueXtbAccount,xtbExposure} from '@/lib/investments/xtb-risk.mjs'
import {xtbBalance} from '@/lib/investments/xtb.mjs'
import {money,signedMoney,percent,parseMoney} from '@/lib/investments/portfolio.mjs'
import TradeWorkspace from './TradeWorkspace'
import { xtbMarkets } from '@/lib/investments/xtb-markets.mjs'
import dynamic from 'next/dynamic'
const InvestmentPositionChart = dynamic(() => import('./InvestmentPositionChart'), { loading: () => <p role="status">در حال آماده‌سازی نمودار…</p> })
import Icon from './InvestmentIcon'
import styles from './investments.module.css'
import desk from './XtbDesk.module.css'

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

export default function XtbAccountWorkspace({dark=true,account,owner,trades,tradeProps,drawings,onDrawings}) {
  const ownTrades=trades.filter(t=>t.ownerId===account?.id)
  const openTrades=ownTrades.filter(t=>tradeStatus(t)==='open')
  const [chartId,setChartId]=useState(null)
  const [marketSymbol,setMarketSymbol]=useState(null)
  const executedTrades=ownTrades.filter(t=>t.executions.some(event=>event.kind==='entry'))
  const chartTrade=executedTrades.find(t=>t.id===chartId)||openTrades[0]||executedTrades[0]
  const watchMarket=xtbMarkets.find(market=>market.symbol===marketSymbol)??(!chartTrade?xtbMarkets[0]:null)
  const [tab,setTab]=useState(tradeProps.createOpen||tradeProps.selectedId?'plans':account?'positions':'chart')
  useEffect(()=>{if(tradeProps.createOpen||tradeProps.selectedId)setTab('plans')},[tradeProps.createOpen,tradeProps.selectedId])
  const balance=xtbBalance(account,trades)
  const cacheKey = 'andarun-xtb-equity-v1:' + account?.id
  const [quotes,setQuotes]=useState({})
  const [refreshing,setRefreshing]=useState(false)
  const [quoteError,setQuoteError]=useState('')
  useEffect(()=>{
    try {
      const saved = JSON.parse(localStorage.getItem(cacheKey)) || {}
      const chart = readChartHistory(localStorage, 'BZ=F')
      const quote = chart?.quote
      if (quote?.symbol === 'BZ=F' && quote.currency === 'USD' && quote.price > 0 &&
        (!saved['BZ=F'] || Date.parse(quote.asOf) > Date.parse(saved['BZ=F'].asOf))) {
        saved['BZ=F'] = {...quote, eurRate:chart.fx?.latest?.rate}
      }
      setQuotes(saved)
    } catch {}
  },[cacheKey])
  const valuation=valueXtbAccount(balance?.balanceCents,openTrades,quotes)
  const marketQuote=quotes['BZ=F']
  const lastBrokerPrice=openTrades.filter(t=>t.plan.symbol==='OIL'&&t.brokerSnapshot?.price)
    .map(t=>t.brokerSnapshot).sort((a,b)=>b.observedDate.localeCompare(a.observedDate))[0]
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
  function showTrade(trade) {
    tradeProps.onCreateOpen(false)
    tradeProps.onSelect(trade.id)
    setTab('plans')
  }
  function showChart(trade) {
    setChartId(trade.id)
    setMarketSymbol(null)
    setTab('chart')
  }
  const tabs = [
    ['positions','موقعیت‌های باز',openTrades.length],
    ['chart','نمودار و بازارها'],
    ['plans','سفارش‌ها و سابقهٔ معاملات'],
    ['transactions','گردش حساب'],
  ]
  function moveTab(event,index) {
    const steps = { ArrowLeft:1, ArrowRight:-1, Home:-index, End:tabs.length-1-index }
    if (!(event.key in steps)) return
    event.preventDefault()
    const next = tabs[(index + steps[event.key] + tabs.length) % tabs.length][0]
    setTab(next)
    document.getElementById('xtb-tab-'+next)?.focus()
  }
  return <div className={desk.workspace} data-theme={dark?'dark':'light'}>
    {balance && <section className={desk.summary} aria-label={`ارزش XTB ${owner}`}>
      <div className={desk.metrics}>
        <div><span>ارزش برآوردی حساب</span><strong><bdi>{valuation.equityCents==null?'—':money(valuation.equityCents)}</bdi></strong></div>
        <div><span>ماندهٔ حساب</span><strong><bdi>{money(balance.balanceCents)}</bdi></strong></div>
        <div><span>سود و زیان باز برآوردی</span><strong data-sign={Math.sign(valuation.openCents)}><bdi>{valuation.openCents==null?'—':signedMoney(valuation.openCents)}</bdi></strong></div>
        <div><span>سود و زیان بسته‌شده</span><strong data-sign={Math.sign(balance.profitCents)}><bdi>{signedMoney(balance.profitCents)}</bdi></strong></div>
      </div>
      {hasBrent && <div className={desk.quote}>
        <span>آخرین قیمت بازار <bdi>OIL · {marketQuote?.price ?? lastBrokerPrice?.price ?? '—'} USD</bdi>
          {marketQuote?.asOf ? <> · Yahoo Finance · <bdi>{new Date(marketQuote.asOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'})}</bdi></> :
            lastBrokerPrice && <> · ثبت XTB در <bdi>{lastBrokerPrice.observedDate}</bdi></>}
        </span>
        <button type="button" className={desk.action} disabled={refreshing} onClick={refreshEquity}><Icon name="refresh" size={16}/>{refreshing?'در حال دریافت…':'به‌روزرسانی قیمت حساب'}</button>
      </div>}
      {openTrades.length>valuation.priced&&<p>ارزش کل حساب پس از تکمیل قیمت موقعیت‌های باز نمایش داده می‌شود.</p>}
      {quoteError&&<p role="status">{quoteError}</p>}
    </section>}
    <div className={desk.tabs} role="tablist" aria-label="بخش‌های حساب XTB">{tabs.map(([key,label,count],index)=>
      <button key={key} type="button" role="tab" id={'xtb-tab-'+key} aria-controls="xtb-panel" aria-selected={tab===key} tabIndex={tab===key?0:-1}
        onKeyDown={event=>moveTab(event,index)} onClick={()=>setTab(key)}>{label}{count!=null&&<b>{count.toLocaleString('fa-IR')}</b>}</button>)}</div>
    <div id="xtb-panel" role="tabpanel" aria-labelledby={'xtb-tab-'+tab}>
    {tab==='positions' && <section className={desk.panel}>
      <div className={desk.heading}><h2>موقعیت‌های باز</h2><button type="button" className={desk.action} onClick={()=>{tradeProps.onSelect(null);tradeProps.onCreateOpen(true);setTab('plans')}}><Icon name="plus" size={16}/>برنامهٔ جدید</button></div>
      {openTrades.length ? <div className={desk.scroll}><table className={desk.table}>
        <thead><tr>{['نماد و موقعیت','حجم باز','میانگین ورود','حد ضرر / حد سود','سود و زیان باز',''].map((label,i)=><th key={i} scope="col">{label}</th>)}</tr></thead>
        <tbody>{openTrades.map(trade=>{
          const exposure=xtbExposure(trade)
          const result=valueXtbAccount(null,[trade],quotes).openCents
          return <tr key={trade.id}><td><strong><bdi>{trade.plan.symbol}</bdi> · {trade.plan.direction==='short'?'فروش':'خرید'}</strong><small><bdi>{trade.brokerSnapshot?.positionId || trade.plan.name}</bdi></small></td>
            <td><bdi>{Number(exposure.volume.toFixed(8))}</bdi></td><td><bdi>{exposure.entry?.toLocaleString('en-US',{maximumFractionDigits:6}) ?? '—'} {trade.plan.currency}</bdi></td>
            <td><bdi>{trade.plan.stopPrice ?? '—'} / {trade.plan.targetPrice ?? '—'}</bdi></td>
            <td><bdi data-sign={Math.sign(result)}>{result==null?'—':signedMoney(result)}</bdi>
              {trade.brokerSnapshot && <details className={desk.snapshot}><summary>آخرین ثبت XTB</summary>
                <small><bdi>{signedMoney(trade.brokerSnapshot.netCents)}</bdi> در <bdi>{trade.brokerSnapshot.price} {trade.plan.currency}</bdi></small>
                <small><bdi>{trade.brokerSnapshot.observedDate}</bdi></small>
              </details>}</td>
            <td><div className={desk.actions}><button className={desk.action} onClick={()=>showChart(trade)}>نمودار</button><button className={desk.action} onClick={()=>showTrade(trade)}>جزئیات</button></div></td></tr>
        })}</tbody></table></div> : <p>موقعیت بازی برای این حساب ثبت نشده است.</p>}
    </section>}
    {tab==='chart' && <>
    <nav aria-label="بازارهای XTB" className={desk.markets}>
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
          {executedTrades.map(trade=><option key={trade.id} value={trade.id}>{trade.plan.symbol} · {trade.brokerSnapshot?.positionId || trade.plan.name} · {trade.plan.planDate}</option>)}
        </select>
      </label>}
      <InvestmentPositionChart key={chartTrade.id} trade={chartTrade} symbolTrades={executedTrades.filter(item=>item.plan.symbol===chartTrade.plan.symbol&&item.plan.currency===chartTrade.plan.currency)} onTransaction={tradeStatus(chartTrade)==='open'?kind=>{setTab('plans');tradeProps.onSelect(chartTrade.id);tradeProps.onCreateOpen(false);tradeProps.onExecution(kind)}:undefined} openCount={openTrades.length} drawings={drawings} onDrawings={onDrawings}/>
    </>}
    </>}
    {tab==='plans' && <TradeWorkspace {...tradeProps} compact trades={ownTrades} settings={{xtbEquityCents:balance?.balanceCents}} onChart={showChart}/>}
    {tab==='transactions' && (balance ? <section className={desk.panel}><h2>گردش حساب</h2>
    <p>سرمایهٔ اولیه <bdi>{money(balance.openingCents)}</bdi> · بازده بسته‌شده <bdi>{balance.returnPercent==null?'—':percent(balance.returnPercent)}</bdi></p>
    <div className={desk.cashRow}><div><strong>وضعیت مبنا</strong><small><bdi>{account.asOf}</bdi> · سرمایهٔ اولیه <bdi>{money(account.openingCents)}</bdi> · سود بسته‌شده <bdi>{signedMoney(account.balanceCents-account.openingCents)}</bdi></small></div><strong><bdi>{money(account.balanceCents)}</bdi></strong></div>{balance.rows.map(row=><div key={row.id} className={desk.cashRow}><div><strong>{LABELS[row.kind]}</strong><small><bdi>{row.date}</bdi>{row.note&&<> · {row.note}</>}</small></div><strong data-sign={Math.sign(row.deltaCents)}><bdi>{signedMoney(row.deltaCents)}</bdi></strong></div>)}{!balance.rows.length&&<p>تراکنش جدیدی پس از این وضعیت ثبت نشده است.</p>}</section> : <p>موجودی مبنای این حساب ثبت نشده است.</p>)}
    </div>
  </div>
}
