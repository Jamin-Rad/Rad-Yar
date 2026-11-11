import { fifoAnalysis, ledgerUnits, ledgerQuantity } from './ledger.mjs'
import { validIsin } from './family.mjs'

// Broker share movements are signed deltas, including replacement ISINs and cancellations.
const MOVEMENTS = new Set(['BUY','SELL','UNBUNDLING','UNBUNDLING_CANCELLED','SPIN_OFF','MERGER','SPLIT','REVERSE_SPLIT','STOCK_DIVIDEND','STOCK_DIVIDEND_CANCELLED','BONUS_ISSUE','BONUS_ISSUE_CANCELLED','LIQUIDATION_DIVIDEND','INTERMEDIATE_SECURITIES_DISTRIBUTION','WORTHLESS'])
const INCOME = new Set(['DIVIDEND','DISTRIBUTION'])
const abs = n => n < 0n ? -n : n
const nameKey = s => s.toLowerCase().replace(/[…]/g,'').replace(/\.\.\./g,'').replace(/[^a-z0-9]/g,'')
function movementUnits(tx) {
  if (!MOVEMENTS.has(tx.type) || tx.quantity == null) return 0n
  const qty = ledgerUnits(tx.quantity)
  return tx.type==='BUY' ? abs(qty) : tx.type==='SELL' ? -abs(qty) : qty
}

export function currentHoldings(transactions) {
  const groups = new Map()
  const costs = new Map(fifoAnalysis(transactions).holdings.map(h=>[h.accountId+':'+h.isin,h.costCents]))
  for (const tx of [...transactions].sort((a,b)=>Date.parse(a.datetime)-Date.parse(b.datetime)||a.sourceRow-b.sourceRow||a.id.localeCompare(b.id))) {
    if (!tx.isin) continue
    const key=tx.accountId+':'+tx.isin
    if (!groups.has(key)) groups.set(key,{accountId:tx.accountId,isin:tx.isin,rows:[],names:new Set(),batches:new Map()})
    const group=groups.get(key);group.rows.push(tx);group.names.add(tx.name)
    const instant=Date.parse(tx.datetime)
    if(!group.batches.has(instant))group.batches.set(instant,[])
    group.batches.get(instant).push(tx)
  }
  return [...groups.values()].map(group=>{
    let net=0n,missingOpening=false,unsupported=!validIsin(group.isin),hasMovement=false
    for(const batch of group.batches.values()) {
      let delta=0n
      for(const tx of batch) {
        const qty=tx.quantity==null?null:ledgerUnits(tx.quantity)
        if(MOVEMENTS.has(tx.type)) {
          hasMovement=true
          if(qty===null){unsupported=true;continue}
          delta+=tx.type==='BUY'?abs(qty):tx.type==='SELL'?-abs(qty):qty
        } else if(INCOME.has(tx.type)) {
          // Dividend shares refer to an earlier record date, not today's balance.
          if(qty!==null&&qty>net)missingOpening=true
        } else if(qty!==null&&qty!==0n&&!['LIQUIDATION_PROCEEDS'].includes(tx.type)) unsupported=true
      }
      net+=delta
      if(net<0n)missingOpening=true
    }
    const last=group.rows.at(-1),known=!missingOpening&&!unsupported
    return {accountId:group.accountId,isin:group.isin,name:last.name,names:[...group.names],quantity:known?ledgerQuantity(net):null,netQuantity:ledgerQuantity(net),closed:known&&hasMovement&&net===0n,throughDate:group.rows.reduce((d,t)=>d>t.date?d:t.date,''),lastId:last.id,transactionCount:group.rows.length,assetClass:last.assetClass,costCents:known?(costs.get(group.accountId+':'+group.isin)??null):null,reason:unsupported?'نوع یا تعداد رویداد اوراق نیازمند تطبیق است':missingOpening?'خرید اولیه در فایل کامل نیست؛ تعداد فعلی از جمع معاملات مشخص نمی‌شود':'تعداد از خرید، فروش و تغییرات تعداد اوراق در فایل محاسبه شده است'}
  })
}

function matchesName(position,row) {
  const name=nameKey(position.name)
  return row.names.some(n=>nameKey(n)===name||(position.name.includes('…')||position.name.includes('...'))&&name.length>=12&&nameKey(n).startsWith(name))
}

// Pure, idempotent materialization. Never changes journals, snapshots or other accounts.
export function reconcileHoldings(state,transactions) {
  const balances=currentHoldings(transactions)
  const ordered=[...transactions].sort((a,b)=>Date.parse(a.datetime)-Date.parse(b.datetime)||a.sourceRow-b.sourceRow||a.id.localeCompare(b.id))
  return {...state,accounts:state.accounts.map(account=>{
    const rows=balances.filter(r=>r.accountId===account.id)
    if(!rows.length)return {...account,positions:account.positions.filter(p=>!p.ledger)}
    const assigned=new Map(),used=new Set()
    for(const position of account.positions) {
      let candidates=position.isin?rows.filter(r=>r.isin===position.isin):rows.filter(r=>matchesName(position,r))
      if(candidates.length>1){const active=candidates.filter(r=>r.quantity!==null&&ledgerUnits(r.quantity)>0n);if(active.length===1)candidates=active}
      if(candidates.length===1&&!assigned.has(candidates[0].isin)){assigned.set(candidates[0].isin,position);used.add(position.id)}
    }
    const positions=account.positions.filter(p=>!used.has(p.id)&&(!p.ledger||rows.some(r=>r.isin===p.isin)))
    for(const row of rows) {
      const previous=assigned.get(row.isin)
      const checkpoint=account.inventoryCheckpoint
      let checkpointQuantity=null
      if(checkpoint){
        const anchor=checkpoint.holdings.find(h=>h.isin===row.isin)
        const next=(anchor?ledgerUnits(anchor.quantity):0n)+ordered.filter(t=>t.accountId===account.id&&t.isin===row.isin&&Date.parse(t.datetime)>Date.parse(checkpoint.asOf)).reduce((sum,t)=>sum+movementUnits(t),0n)
        if(next===0n)continue
        if(next>0n)checkpointQuantity=ledgerQuantity(next)
      }
      if(!checkpoint&&row.closed)continue
      const exact=row.quantity!==null&&ledgerUnits(row.quantity)>0n&&(checkpointQuantity==null||ledgerUnits(checkpointQuantity)===ledgerUnits(row.quantity))
      if(!exact&&!previous&&!checkpointQuantity)continue
      let quantity=checkpointQuantity || (exact?row.quantity:previous.quantity)
      let quantityConfirmed=previous?.ledger?.quantityConfirmed===true
      // A prior count is an inventory anchor. Apply subsequent movements, not
      // backfilled opening trades already represented by that recorded count.
      if (!checkpoint && !exact && previous.ledger) {
        const rows=ordered.filter(t=>t.accountId===account.id&&t.isin===row.isin)
        const anchor=rows.findIndex(t=>t.id===previous.ledger.lastId)
        if(anchor>=0) {
          const next=ledgerUnits(previous.quantity)+rows.slice(anchor+1).reduce((sum,t)=>sum+movementUnits(t),0n)
          if(next===0n)continue
          if(next>0n)quantity=ledgerQuantity(next)
          else quantityConfirmed=false
        } else quantityConfirmed=false
      }
      if(checkpointQuantity)quantityConfirmed=true
      const sameQuantity=previous&&ledgerUnits(previous.quantity)===ledgerUnits(quantity)
      const ledger={throughDate:row.throughDate,lastId:row.lastId,transactionCount:row.transactionCount,netQuantity:row.netQuantity,quantityStatus:exact?'transactions':'prior-record',...(quantityConfirmed?{quantityConfirmed:true}:{}),costCents:exact?row.costCents:null,reason:exact?row.reason:quantityConfirmed?'مبنای تعداد با تأیید کاربر؛ تغییرات بعدی از تراکنش‌ها محاسبه شده است. بهای خرید اولیه همچنان نیازمند تطبیق است.':row.reason+'؛ مبنای قبلی با تغییرات بعدی محاسبه شده و نیازمند تطبیق است.'}
      positions.push({...previous,id:previous?.id||'ledger_'+row.isin,name:row.name||previous?.name,isin:row.isin,quantity,category:previous?.category||(/ETF|FUND/.test(row.assetClass)?'fund':row.assetClass==='STOCK'?'stock':'other'),source:sameQuantity&&previous.valueCents!=null?previous.source:'ledger',verified:exact&&sameQuantity&&previous?.verified===true,note:previous?.note||'',symbol:previous?.symbol||'',marketSymbol:previous?.marketSymbol||'',marketConfirmed:previous?.marketConfirmed===true,tradingViewSymbol:previous?.tradingViewSymbol||'',asOf:sameQuantity?previous.asOf||null:null,valueCents:sameQuantity?previous.valueCents:null,gainCents:sameQuantity?previous.gainCents:null,ledger})
    }
    return {...account,positions}
  })}
}

export function holdingsReview(state,transactions,accountId) {
  const account=state.accounts.find(a=>a.id===accountId)
  return currentHoldings(transactions).filter(r=>r.accountId===accountId&&r.quantity===null&&!account?.positions.some(p=>p.isin===r.isin&&p.ledger?.quantityConfirmed)).map(r=>({...r,hasPriorRecord:account?.positions.some(p=>p.isin===r.isin)}))
}
