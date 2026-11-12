'use client'
import {useState} from 'react'
import {money,signedMoney,percent} from '@/lib/investments/portfolio.mjs'
import {marketImpact,marketKey,marketForPosition,marketTrusted} from '@/lib/investments/market.mjs'
import Icon from './InvestmentIcon'
import TradingViewChart from './TradingViewChart'
import TechnicalChart from './TechnicalChart'
import styles from './investments.module.css'
const price=value=>new Intl.NumberFormat('de-DE',{maximumSignificantDigits:10}).format(value)
function MarketConnection({position,marketData,onConnect}){
 const [query,setQuery]=useState(position.name),[symbol,setSymbol]=useState(position.marketSymbol||''),[results,setResults]=useState([]),[busy,setBusy]=useState(false),[error,setError]=useState('')
 async function search(event){event.preventDefault();setBusy(true);setError('');try{const response=await fetch(`/api/andarun/investments/market?${new URLSearchParams({q:query})}`);const value=await response.json();if(!response.ok)throw Error(value.error);setResults(value.results);if(!value.results.length)setError('نتیجه‌ای پیدا نشد؛ نماد دقیق منبع بازار را وارد کن.')}catch(err){setError(err.message)}finally{setBusy(false)}}
 async function connect(event){event.preventDefault();setBusy(true);setError('');try{const value=await marketData.load(symbol.trim().toUpperCase(),position.name,true,true);if(!value)throw Error('داده‌ای برای این نماد دریافت نشد.');onConnect(value.quote.symbol)}catch(err){setError(err.message)}finally{setBusy(false)}}
 return <div className={styles.marketConnection}><h3>تطبیق ابزار و منبع قیمت</h3><p className={styles.footnote}>ISIN بروکر: <bdi>{position.isin||'ثبت نشده'}</bdi>. نام مشابه کافی نیست؛ ابزار، کلاس سهم، بورس و واحد قیمت را تطبیق بده.</p><form onSubmit={search} className={styles.inlineForm}><label className={styles.field}>جست‌وجوی ابزار<input value={query} onChange={e=>setQuery(e.target.value)} maxLength={160} required dir="auto"/></label><button className={styles.secondaryButton} disabled={busy} type="submit">جست‌وجو</button></form>
 {results.length>0&&<div className={styles.instrumentResults}>{results.map(r=><button type="button" key={r.symbol} onClick={()=>setSymbol(r.symbol)} className={symbol===r.symbol?styles.selectedTrade:''}><strong><bdi>{r.symbol}</bdi> · <bdi>{r.name}</bdi></strong><small><bdi>{r.exchange} · {r.type}</bdi></small></button>)}</div>}
 <form onSubmit={connect}><label className={styles.field}>نماد دقیق در منبع بازار<input value={symbol} onChange={e=>setSymbol(e.target.value)} dir="ltr" required maxLength={35} placeholder="مثلاً نماد تأییدشده در Yahoo Finance"/></label><label className={styles.checkbox}><input type="checkbox" required/>این نماد را با ابزار، کلاس سهم و بورس مورد نظرم تطبیق داده‌ام؛ ارز منبع ممکن است با حساب یورویی متفاوت باشد.</label><button className={styles.primaryButton} type="submit" disabled={busy}>{busy?'در حال بررسی…':'اتصال قیمت و تاریخچه'}</button></form>{error&&<p role="alert" className={styles.error}>{error}</p>}</div>
}
export default function AssetProfile({account, position, state, marketData, onTransactions, onConnect, onChartConnect, onDecision, onOpenDecision, onEvent}) {
  const [connectOpen, setConnectOpen] = useState(false)
  if (!position) return <section className={styles.panel}><h2>این دارایی در فهرست فعلی حساب نیست.</h2></section>

  const key = marketKey(position)
  const market = marketForPosition(position, marketData.markets)
  const quote = market?.quote
  const canLoad = key && (position.marketConfirmed || state.settings.isinPricesEnabled)
  const changes = [['هفته', marketImpact(position, market, 7)], ['ماه', marketImpact(position, market, 30)]]
  const related = state.decisions.filter(item => item.accountId === account.id && item.positionId === position.id)
  const events = state.events.filter(item => item.accountId === account.id && item.positionId === position.id && !item.done)
  const owners = state.accounts.flatMap(item => item.positions
    .filter(holding => (holding.id === position.id && item.id === account.id) || (position.isin && holding.isin === position.isin))
    .map(holding => ({...holding, owner: item.owner, accountId: item.id})))
  const history = account.snapshots.map(snapshot => ({
    date: snapshot.asOf,
    row: snapshot.positions.find(holding => holding.id === position.id),
  })).filter(item => item.row).sort((a, b) => b.date.localeCompare(a.date))

  return <div className={styles.sectionStack}>
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <div><h2 dir="auto">{position.name}</h2><p>{account.owner} · <bdi>{position.isin || 'بدون ISIN'}</bdi></p></div>
        <button type="button" className={styles.primaryButton} onClick={onTransactions}>تراکنش‌های این دارایی</button>
      </div>
      <div className={styles.profileStats}>
        <div><span>تعداد سهم</span><strong><bdi>{position.quantity}</bdi></strong></div>
        <div><span>آخرین قیمت هر سهم</span><strong><bdi>{quote ? <>{price(quote.price)} {quote.currency}</> : '—'}</bdi></strong>
          {quote && <small>{quote.exchange} · <bdi>{new Date(quote.asOf).toLocaleString('de-DE', {timeZone: 'Europe/Berlin'})}</bdi></small>}
        </div>
        <div><span>ارزش ثبت‌شده در گزارش بروکر</span><strong><bdi>{money(position.valueCents)}</bdi></strong>
          <small><bdi>{position.asOf || account.snapshotDate || 'تاریخ نامشخص'}</bdi></small>
        </div>
      </div>
    </section>

    <TradingViewChart position={position} onConnect={onChartConnect}/>

    <details className={`${styles.panel} ${styles.assetDetails}`}>
      <summary>تاریخچه، منبع قیمت و خبرها</summary>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.secondaryButton} disabled={!canLoad || marketData.loading[key]} onClick={() => marketData.load(key, position.name, true, true)}>دریافت تاریخچه</button>
        <button type="button" className={styles.textButton} aria-expanded={connectOpen} onClick={() => setConnectOpen(open => !open)}>تنظیم منبع قیمت</button>
      </div>
      {connectOpen && <MarketConnection position={position} marketData={marketData} onConnect={symbol => {onConnect(symbol); setConnectOpen(false)}}/>}
      {marketData.loading[key] && <p role="status">در حال دریافت دادهٔ بازار…</p>}
      {marketData.errors[key] && <p role="alert" className={styles.error}>{marketData.errors[key]}</p>}
      {quote && <p className={styles.marketSource}><a href={quote.sourceUrl} target="_blank" rel="noreferrer">{quote.source}</a> · <bdi>{quote.symbol} · {quote.exchange}</bdi></p>}
      {market && !marketTrusted(position, market) && <p className={styles.error}>تطبیق این منبع قیمت تأیید نشده است.</p>}
      {market?.history?.length > 0 && <TechnicalChart key={key} market={market} loading={marketData.loading[key]} error={marketData.errors[key]}/>}
      {changes.some(([, change]) => change) && <div className={styles.periodGrid}>{changes.map(([label, change]) => change && <div key={label}>
        <h3>تغییر {label}</h3><strong><bdi>{percent(change.nativePercent)}</bdi></strong>
        <p>اثر برآوردی با تعداد فعلی <bdi>{signedMoney(change.deltaCents)}</bdi></p>
      </div>)}</div>}
      {market?.news?.length > 0 && <div className={styles.newsList}>{market.news.map(item => <article key={item.url}>
        <a href={item.url} target="_blank" rel="noreferrer" dir="auto">{item.title}</a><small><bdi>{item.publisher} · {item.date.slice(0, 10)}</bdi></small>
      </article>)}</div>}
    </details>

    <details className={`${styles.panel} ${styles.assetDetails}`}>
      <summary>تصمیم‌ها و رویدادها</summary>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.secondaryButton} onClick={onDecision}>ثبت تصمیم</button>
        <button type="button" className={styles.secondaryButton} onClick={onEvent}>ثبت رویداد</button>
      </div>
      {related.map(item => <button key={item.id} type="button" className={styles.reviewQueueRow} onClick={() => onOpenDecision(item.id)}><bdi>{item.planDate}</bdi><span>{item.rationale}</span><Icon name="arrow" size={16}/></button>)}
      {events.map(item => <p key={item.id}><bdi>{item.date}</bdi> · {item.title}</p>)}
    </details>

    <details className={`${styles.panel} ${styles.assetDetails}`}>
      <summary>دارایی در حساب‌های خانواده و ثبت‌های تاریخی</summary>
      {owners.map(item => <div className={styles.dataAccountRow} key={item.accountId + ':' + item.id}>
        <strong>{item.owner}</strong><bdi>{item.quantity}</bdi><bdi>{money(item.valueCents)}</bdi>
      </div>)}
      {history.map(item => <p key={item.date}><bdi>{item.date}</bdi> · <bdi>{item.row.quantity}</bdi> سهم · <bdi>{money(item.row.valueCents)}</bdi></p>)}
    </details>
  </div>
}
