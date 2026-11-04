// Account snapshots are private data. No personal balances belong in this module.
export const XTB_OWNERS = ['self', 'fatemeh']
const id = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value)
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value
const cents = value => Number.isSafeInteger(value) && Math.abs(value) <= 1e12

export function normalizeXtbAccounts(input = []) {
  if (!Array.isArray(input) || input.length > 2 || new Set(input.map(a=>a.id)).size !== input.length) throw Error('حساب‌های XTB معتبر نیستند.')
  return input.map(a=>{
    if (!XTB_OWNERS.includes(a.id) || a.currency !== 'EUR' || !cents(a.openingCents) || a.openingCents < 0 || !cents(a.balanceCents) || a.balanceCents < 0 || !validDate(a.asOf)) throw Error('مبنای حساب XTB معتبر نیست.')
    const entries=a.entries || [], includedExecutionIds=a.includedExecutionIds || []
    if (!Array.isArray(entries) || entries.length > 10000 || new Set(entries.map(e=>e.id)).size !== entries.length || !Array.isArray(includedExecutionIds) || includedExecutionIds.length > 10000 || includedExecutionIds.some(v=>typeof v!=='string'||v.length>170)) throw Error('سابقهٔ XTB معتبر نیست.')
    return {id:a.id,currency:'EUR',openingCents:a.openingCents,balanceCents:a.balanceCents,asOf:a.asOf,includedExecutionIds,entries:entries.map(e=>{
      if (!id(e.id) || !['deposit','withdrawal','realized'].includes(e.kind) || !cents(e.amountCents) || !e.amountCents || (e.kind!=='realized'&&e.amountCents<0) || !validDate(e.date) || e.date<a.asOf || typeof e.recordedAt!=='string' || !Number.isFinite(Date.parse(e.recordedAt))) throw Error('تراکنش XTB معتبر نیست.')
      return {id:e.id,kind:e.kind,amountCents:e.amountCents,date:e.date,recordedAt:e.recordedAt,note:typeof e.note==='string'?e.note.trim().slice(0,1000):''}
    })}
  })
}

export function xtbBalance(account, trades = []) {
  if (!account) return null
  const rows=account.entries.map(e=>({...e,deltaCents:e.kind==='withdrawal'?-e.amountCents:e.amountCents}))
  // Exit netResultCents is explicitly broker-reported EUR, independent of the underlying quote currency.
  // Explicit snapshot inclusion, rather than a date cutoff, also handles same-day exits.
  for (const trade of trades.filter(t=>t.ownerId===account.id)) for (const e of trade.executions) {
    if (e.kind==='exit' && !account.includedExecutionIds.includes(`${trade.id}:${e.id}`)) rows.push({...e,id:`${trade.id}:${e.id}`,kind:'realized',note:trade.plan.name,deltaCents:e.netResultCents})
  }
  rows.sort((a,b)=>b.date.localeCompare(a.date)||b.recordedAt.localeCompare(a.recordedAt)||b.id.localeCompare(a.id))
  const profitCents=account.balanceCents-account.openingCents+rows.filter(e=>e.kind==='realized').reduce((s,e)=>s+e.deltaCents,0)
  const balanceCents=account.balanceCents+rows.reduce((s,e)=>s+e.deltaCents,0)
  return {balanceCents,profitCents,openingCents:account.openingCents,returnPercent:account.openingCents?profitCents/account.openingCents*100:null,rows}
}

export function assertXtbHistory(previous, next) {
  for (const old of previous) {
    const current=next.find(a=>a.id===old.id)
    if (!current || JSON.stringify({...old,entries:[]})!==JSON.stringify({...current,entries:[]}) || JSON.stringify(old.entries)!==JSON.stringify(current.entries.slice(0,old.entries.length))) throw Error('مبنا و تراکنش‌های ثبت‌شدهٔ XTB قابل بازنویسی نیستند.')
  }
}
