import { todayBerlin } from './family.mjs'
import { fifoAnalysis, ledgerCsv } from './ledger.mjs'

// Realized results belong to the sold quantity, including partial exits.
// Original purchase history must be included even when the position is closed.
export function realizedProfit(accounts, transactions, now=Date.now(), today=todayBerlin()) {
  if(!Array.isArray(transactions))return null
  const sales=fifoAnalysis(transactions.filter(t=>t.date<=today&&Date.parse(t.datetime)<=now)).sales
  function summarize(rows){
    const known=rows.filter(s=>Number.isSafeInteger(s.realizedAfterTaxCents))
    const complete=known.length===rows.length
    const knownGainCents=known.length||complete?known.reduce((sum,s)=>sum+s.realizedAfterTaxCents,0):null
    return {sales:rows,count:rows.length,knownCount:known.length,complete,knownGainCents,gainCents:complete?knownGainCents:null,winningCents:known.reduce((sum,s)=>sum+Math.max(0,s.realizedAfterTaxCents),0),losingCents:known.reduce((sum,s)=>sum+Math.min(0,s.realizedAfterTaxCents),0)}
  }
  const results=accounts.map(a=>({accountId:a.id,owner:a.owner,...summarize(sales.filter(s=>s.accountId===a.id))}))
  return {...summarize(results.flatMap(a=>a.sales)),accounts:results,asOf:today}
}
export function realizedProfitCsv(result,accountId) {
  return ledgerCsv({sales:result.accounts.filter(a=>!accountId||a.accountId===accountId).flatMap(a=>a.sales)},'sales')
}
