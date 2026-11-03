import { marketForPosition, marketTrusted } from './market.mjs'

const DAY = 86400000
function euroProductCents(...values) {
  let numerator = 100n, scale = 0
  for (const value of values) {
    const match = String(value).match(/^(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i)
    if (!match) return null
    numerator *= BigInt(match[1]+(match[2] || ''))
    scale += (match[2]?.length || 0) - Number(match[3] || 0)
  }
  if (Math.abs(scale) > 100) return null
  const denominator = scale > 0 ? 10n ** BigInt(scale) : 1n
  if (scale < 0) numerator *= 10n ** BigInt(-scale)
  const result = Number((numerator + denominator/2n) / denominator)
  return Number.isSafeInteger(result) ? result : null
}
// Cash is a separate ledger: security quantities and purchase costs are not cash.
export function cashBalance(account, transactions) {
  if (!Array.isArray(transactions)) return { movementCents:null,balanceCents:null,estimatedCents:null,status:'loading',firstDate:null,throughDate:null }
  const rows = transactions.filter(t => t.accountId === account.id).sort((a,b) => Date.parse(a.datetime)-Date.parse(b.datetime))
  if (!rows.length) return { movementCents: account.cashCheckpoint || account.cashOpening ? 0 : null, balanceCents: account.cashCheckpoint?.balanceCents ?? account.cashOpening?.balanceCents ?? null, estimatedCents: null, checkpoint:account.cashCheckpoint, openingDate:account.cashOpening?.date,openingCents:account.cashOpening?.balanceCents,status: account.cashCheckpoint?'confirmed-checkpoint':account.cashOpening?'confirmed-opening':'empty', firstDate: null, throughDate: null }
  const firstDate = rows[0].date, throughDate = rows.at(-1).date
  const opening = account.cashOpening, checkpoint = account.cashCheckpoint
  const included = rows.filter(t => checkpoint ? Date.parse(t.datetime) > Date.parse(checkpoint.asOf) : !opening || t.date >= opening.date)
  const financial = included.filter(t => t.cashCents != null)
  const movementCents = financial.reduce((s,t) => s + t.cashCents, 0)
  const unsupported = financial.some(t => t.currency !== 'EUR' || !Number.isSafeInteger(t.cashCents))
  // A first inbound transfer supports a zero-opening estimate, not confirmation.
  const startsWithDeposit = ['TRANSFER_IN','TRANSFER_INBOUND','CUSTOMER_INBOUND','TRANSFER_INSTANT_INBOUND'].includes(rows[0].type) && rows[0].cashCents > 0
  const estimatedCents = !checkpoint && !unsupported && startsWithDeposit ? movementCents : null
  const balanceCents = !unsupported ? checkpoint ? checkpoint.balanceCents + movementCents : opening ? opening.balanceCents + movementCents : null : null
  return { movementCents, balanceCents, estimatedCents, status: unsupported ? 'unsupported' : checkpoint ? 'confirmed-checkpoint' : opening ? 'confirmed-opening' : startsWithDeposit ? 'zero-opening-estimate' : 'missing-opening', firstDate, throughDate, openingDate: opening?.date || firstDate, openingCents: opening?.balanceCents ?? null, checkpoint, transactionCount: included.length }
}

export function positionBalance(position, markets = {}, now = Date.now()) {
  const market = marketForPosition(position, markets), quote = market?.quote
  const time = Date.parse(quote?.asOf)
  const fresh = Number.isFinite(time) && time <= now + 300000 && now - time <= 7 * DAY
  const fx = quote?.currency === 'EUR' ? 1 : market?.fx?.latest?.rate
  const fxTime = quote?.currency === 'EUR' ? time : Date.parse(market?.fx?.latest?.date)
  const validFx = Number.isFinite(fx) && fx > 0 && Number.isFinite(fxTime) && fxTime <= now + DAY && now - fxTime <= 7 * DAY
  const computed = euroProductCents(position.quantity, quote?.price, fx)
  const hasPrice = marketTrusted(position, market) && fresh && validFx && Number.isFinite(quote.price) && quote.price > 0 && Number.isSafeInteger(computed)
  const quantityKnown = position.ledger?.quantityStatus !== 'prior-record' || position.ledger?.quantityConfirmed === true
  const valueCents = hasPrice ? computed : null
  const checkpoint=position.brokerBasis
  const brokerCost=checkpoint&&checkpoint.quantity===position.quantity&&checkpoint.throughId===position.ledger?.lastId?checkpoint.costCents:null
  const costCents = position.ledger?.costCents ?? brokerCost
  return { ...position, remainingCostCents:costCents,costSource:position.ledger?.costCents!=null?'ledger':brokerCost!=null?'broker':null,marketValueCents: valueCents, marketGainCents: valueCents != null && quantityKnown && costCents != null ? valueCents - costCents : null, quantityKnown, priceAsOf: hasPrice ? quote.asOf : null, priceSource: hasPrice ? quote.source : null, valueStatus: !hasPrice ? 'missing-price' : !quantityKnown ? 'quantity-review' : 'market' }
}

export function accountBalance(account, transactions, markets = {}, now = Date.now()) {
  const positions = account.positions.map(p => positionBalance(p, markets, now))
  const cash = cashBalance(account, transactions)
  const priced = positions.filter(p => p.marketValueCents != null)
  const partialValueCents = priced.reduce((s,p) => s + p.marketValueCents, 0)
  const unknownQuantityCount = positions.filter(p => !p.quantityKnown).length
  const missingPriceCount = positions.length - priced.length
  const complete = missingPriceCount === 0 && unknownQuantityCount === 0
  const securitiesCents = complete ? partialValueCents : null
  const estimatedSecuritiesCents = missingPriceCount === 0 ? partialValueCents : null
  const cashForEstimate = cash.balanceCents ?? cash.estimatedCents
  const equityCents = securitiesCents != null && cashForEstimate != null ? securitiesCents + cashForEstimate : null
  const estimatedEquityCents = estimatedSecuritiesCents != null && cashForEstimate != null ? estimatedSecuritiesCents + cashForEstimate : null
  return { accountId: account.id, positions, cash, pricedCount: priced.length, missingPriceCount, unknownQuantityCount, partialValueCents: priced.length || !positions.length ? partialValueCents : null, securitiesCents, estimatedSecuritiesCents, equityCents, estimatedEquityCents, equityEstimated: cash.balanceCents == null || unknownQuantityCount > 0, oldestPrice: priced.map(p=>p.priceAsOf).sort()[0] || null }
}

export function balanceCsv(balance) {
  const cell = value => {
    let text=String(value ?? '')
    if (/^\s*[=+@\t\r]/.test(text) || /^\s*-/.test(text) && !/^-[0-9]+(?:\.[0-9]+)?$/.test(text)) text="'"+text
    return '"'+text.replace(/"/g,'""')+'"'
  }
  const euro = n => n == null ? '' : (n / 100).toFixed(2)
  return [['Account','Asset','ISIN','Quantity','Quantity status','Market value EUR','Remaining cost EUR','Unrealized result EUR','Price timestamp','Source'], ...balance.positions.map(p=>[balance.accountId,p.name,p.isin,p.quantity,p.quantityKnown?'from records':'needs reconciliation',euro(p.marketValueCents),euro(p.remainingCostCents),euro(p.marketGainCents),p.priceAsOf,p.priceSource]), [balance.accountId,'Cash balance','','',balance.cash.status,euro(balance.cash.balanceCents ?? balance.cash.estimatedCents)], [balance.accountId,'Net cash movement','','','not an opening balance',euro(balance.cash.movementCents)], [balance.accountId,'Account equity','','',balance.equityEstimated?'estimated cash or inventory basis':'confirmed cash basis',euro(balance.equityCents ?? balance.estimatedEquityCents)]].map(row=>Array.from({length:10},(_,i)=>cell(row[i])).join(',')).join('\r\n')
}
