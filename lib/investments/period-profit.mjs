import { isDate, validIsin, todayBerlin } from './family.mjs'
import { ledgerUnits, ledgerQuantity, ledgerGroup, rowsToCsv } from './ledger.mjs'
import { currentHoldings } from './holdings.mjs'
import { historicalPrice } from './history-coverage.mjs'
import { euroProductCents } from './balances.mjs'

const DAY = 86400000
const MOVEMENTS = new Set(['BUY','SELL','UNBUNDLING','UNBUNDLING_CANCELLED','SPIN_OFF','MERGER','SPLIT','REVERSE_SPLIT','STOCK_DIVIDEND','STOCK_DIVIDEND_CANCELLED','BONUS_ISSUE','BONUS_ISSUE_CANCELLED','LIQUIDATION_DIVIDEND','INTERMEDIATE_SECURITIES_DISTRIBUTION','WORTHLESS'])
const NON_MOVEMENTS = new Set(['DIVIDEND','DISTRIBUTION','INTEREST_PAYMENT','LIQUIDATION_PROCEEDS'])
const abs = n => n < 0n ? -n : n
export function shiftDate(date, days) { return new Date(Date.parse(date+'T12:00:00Z')+days*DAY).toISOString().slice(0,10) }
export function profitRange(selection = {mode:'current'}, today = todayBerlin()) {
  if (selection.mode === 'current') return null
  const from = selection.mode === 'week' ? shiftDate(today,-6) : selection.mode === 'month' ? shiftDate(today,-29) : selection.mode === 'year' ? today.slice(0,4)+'-01-01' : selection.from
  const to = selection.mode === 'custom' ? selection.to : today
  if (!isDate(from) || !isDate(to) || from > to || to > today) return {error:'تاریخ شروع و پایان را درست انتخاب کن؛ پایان نباید بعد از امروز باشد.'}
  return {from, to, startDate:shiftDate(from,-1)}
}

// Reconstruct boundary inventories from an explicit complete inventory anchor,
// or quantities verified by the ledger. Purchase costs are not needed for returns.
function inventoryAt(account, rows, date, now, verified) {
  const anchor = account.inventoryCheckpoint
  const units = new Map(), issues = new Map()
  if (anchor) for (const p of anchor.holdings) units.set(p.isin,ledgerUnits(p.quantity))
  else {
    for (const p of account.positions) {
      if (!validIsin(p.isin)) { issues.set(p.id,'شناسه دارایی مشخص نیست'); continue }
      units.set(p.isin,(units.get(p.isin)||0n)+ledgerUnits(p.quantity))
      if (p.ledger?.quantityStatus === 'prior-record' && !p.ledger.quantityConfirmed) issues.set(p.isin,'تعداد دارایی تأیید نشده است')
    }
    for (const h of verified) if (!units.has(h.isin) && !h.closed) issues.set(h.isin,'مبنای موجودی تاریخی کامل نیست')
  }
  for (const tx of rows) {
    if (!tx.isin) continue
    const atTarget = tx.date <= date && Date.parse(tx.datetime) <= now
    const atAnchor = anchor ? Date.parse(tx.datetime) <= Date.parse(anchor.asOf) : Date.parse(tx.datetime) <= now
    if (atTarget === atAnchor) continue
    if (tx.type==='LIQUIDATION_PROCEEDS') issues.set(tx.isin,'تعداد اوراق پیش از تسویه مشخص نیست')
    if (MOVEMENTS.has(tx.type)) {
      if (tx.quantity == null) { issues.set(tx.isin,'تعداد رویداد اوراق مشخص نیست'); continue }
      // Corporate histories may be split-adjusted. Do not combine them with
      // pre-action quantities without a verified unadjusted price series.
      if (!['BUY','SELL'].includes(tx.type)) issues.set(tx.isin,'قیمت و تعداد پیش از رویداد شرکتی نیازمند تطبیق است')
      const q = ledgerUnits(tx.quantity)
      const delta = tx.type==='BUY' ? abs(q) : tx.type==='SELL' ? -abs(q) : q
      units.set(tx.isin,(units.get(tx.isin)||0n)+(atTarget ? delta : -delta))
    } else if (!NON_MOVEMENTS.has(tx.type) && tx.quantity != null && ledgerUnits(tx.quantity)!==0n) issues.set(tx.isin,'تغییر تعداد اوراق پشتیبانی نشده است')
  }
  for (const [isin,q] of units) if (q<0n) issues.set(isin,'موجودی تاریخی منفی است؛ سابقه تعداد کامل نیست')
  return {units,issues}
}

export function periodPlan(accounts, transactions, range, now = Date.now()) {
  if (!range || range.error || !Array.isArray(transactions)) return null
  const verified = currentHoldings(transactions.filter(t=>!['BUY','SELL'].includes(t.type)||t.quantity!=null))
  return accounts.map(account => {
    const rows = transactions.filter(t=>t.accountId===account.id)
    const start = inventoryAt(account,rows,range.startDate,now,verified.filter(h=>h.accountId===account.id))
    const end = inventoryAt(account,rows,range.to,now,verified.filter(h=>h.accountId===account.id))
    const periodRows = rows.filter(t=>t.date>=range.from && t.date<=range.to && Date.parse(t.datetime)<=now)
    const registry = new Map(rows.filter(t=>t.isin).map(t=>[t.isin,t.name]))
    account.positions.forEach(p=>registry.set(p.isin || p.id,p.name))
    const ids = new Set([...start.units.keys(),...end.units.keys(),...start.issues.keys(),...end.issues.keys(),...periodRows.filter(t=>t.isin).map(t=>t.isin)])
    const instruments = [...ids].map(isin=>{
      const instrumentRows = periodRows.filter(t=>t.isin===isin)
      const startQuantity = ledgerQuantity(start.units.get(isin)||0n), endQuantity = ledgerQuantity(end.units.get(isin)||0n)
      const issue = start.issues.get(isin) || end.issues.get(isin)
      return {isin,name:registry.get(isin)||isin,startQuantity,endQuantity,rows:instrumentRows,issue}
    }).filter(i=>i.startQuantity!=='0'||i.endQuantity!=='0'||i.rows.length||i.issue)
    return {accountId:account.id,owner:account.owner,instruments,rows:periodRows,range}
  })
}

export function periodInstruments(plan, today=todayBerlin()) {
  const rows=new Map()
  for(const account of plan||[])for(const i of account.instruments){
    if(i.issue||!validIsin(i.isin)||(i.startQuantity==='0'&&i.endQuantity==='0'))continue
    if(!rows.has(i.isin))rows.set(i.isin,{isin:i.isin,name:i.name,historyDates:[]})
    const row=rows.get(i.isin)
    if(i.startQuantity!=='0')row.historyDates.push(account.range.startDate)
    if(i.endQuantity!=='0'&&account.range.to<today)row.historyDates.push(account.range.to)
    row.historyDates=[...new Set(row.historyDates)].sort()
  }
  return [...rows.values()]
}
function priceAt(isin, date, markets, now, today) {
  const market = markets['ISIN:'+isin]
  if (market?.identity?.isin!==isin || market.quote?.currency!=='EUR') return null
  const quote = market.quote
  if (date===today && Number.isFinite(quote.price) && quote.price>0 && Date.parse(quote.asOf)<=now+300000 && now-Date.parse(quote.asOf)<=7*DAY) return {price:quote.price,asOf:quote.asOf}
  return historicalPrice(market,date,now)
}
function performanceCash(rows) {
  let cents = 0
  for (const tx of rows) {
    if (tx.cashCents == null) {
      if (['BUY','SELL'].includes(tx.type) || tx.amountCents!=null || tx.feeCents!=null || tx.taxCents!=null) return null
      continue
    }
    if (tx.currency!=='EUR' || !Number.isSafeInteger(tx.cashCents) || ledgerGroup(tx)==='other') return null
    if (ledgerGroup(tx)==='transfers' && !Number.isSafeInteger(tx.amountCents)) return null
    // Principal deposits and withdrawals are not returns; their costs still are.
    cents += tx.cashCents - (ledgerGroup(tx)==='transfers' ? tx.amountCents : 0)
  }
  return Number.isSafeInteger(cents) ? cents : null
}
export function periodProfit(plan, markets = {}, now = Date.now(), today = todayBerlin()) {
  if (!plan) return null
  const accounts = plan.map(account=>{
    const instruments = account.instruments.map(i=>{
      const start = i.startQuantity==='0' ? {price:0,asOf:null} : priceAt(i.isin,account.range.startDate,markets,now,today)
      const end = i.endQuantity==='0' ? {price:0,asOf:null} : priceAt(i.isin,account.range.to,markets,now,today)
      const startCents = start ? euroProductCents(i.startQuantity,start.price) : null
      const endCents = end ? euroProductCents(i.endQuantity,end.price) : null
      const cashCents = performanceCash(i.rows)
      const issue = i.issue || (startCents==null ? 'قیمت ابتدای بازه موجود نیست' : endCents==null ? 'قیمت پایان بازه موجود نیست' : cashCents==null ? 'مبلغ یا نوع تراکنش کامل نیست' : null)
      return {...i,startCents,endCents,cashCents,startAsOf:start?.asOf,endAsOf:end?.asOf,issue,gainCents:issue?null:endCents-startCents+cashCents}
    })
    const unidentifiedMovement = account.rows.some(t=>!t.isin && !NON_MOVEMENTS.has(t.type) && t.quantity!=null && ledgerUnits(t.quantity)!==0n)
    const otherCashCents = unidentifiedMovement ? null : performanceCash(account.rows.filter(t=>!t.isin))
    const known = instruments.filter(i=>i.gainCents!=null)
    const complete = known.length===instruments.length && otherCashCents!=null
    const knownGainCents = known.reduce((sum,i)=>sum+i.gainCents,0)+(otherCashCents||0)
    return {...account,instruments,knownCount:known.length,count:instruments.length,complete,otherCashCents,knownGainCents,gainCents:complete?knownGainCents:null}
  })
  const complete = accounts.every(a=>a.complete)
  return {accounts,complete,count:accounts.reduce((s,a)=>s+a.count,0),knownCount:accounts.reduce((s,a)=>s+a.knownCount,0),knownGainCents:accounts.reduce((s,a)=>s+a.knownGainCents,0),gainCents:complete?accounts.reduce((s,a)=>s+a.gainCents,0):null}
}
export function periodProfitCsv(result, range) {
  const eur = n=>n==null?'':(n/100).toFixed(2)
  return rowsToCsv([['Account','From (inclusive)','To (inclusive)','Asset','ISIN','Start quantity','End quantity','Start price date','End price date','Start value EUR','End value EUR','Net performance cash EUR','Profit after fees and tax EUR','Status'],...result.accounts.flatMap(a=>[
    [a.owner,range.from,range.to,'ACCOUNT TOTAL','','','','','', '', '', '',eur(a.gainCents),a.complete?'Complete':'Incomplete'],
    ...a.instruments.map(i=>[a.owner,range.from,range.to,i.name,i.isin,i.startQuantity,i.endQuantity,i.startAsOf,i.endAsOf,eur(i.startCents),eur(i.endCents),eur(i.cashCents),eur(i.gainCents),i.issue||'Complete']),
    [a.owner,range.from,range.to,'Cash income / costs without instrument','','','','','','','',eur(a.otherCashCents),eur(a.otherCashCents),a.otherCashCents==null?'Incomplete':'Complete']
  ])])
}
