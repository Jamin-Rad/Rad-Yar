// The trade amount excludes fees and taxes. Never infer a gross price from net cash.
export function saleUnitPrice(tx) {
  if (tx?.type !== 'SELL' || tx.currency !== 'EUR' || !Number.isSafeInteger(tx.amountCents)) return null
  const quantity = Math.abs(Number(tx.quantity))
  if (!Number.isFinite(quantity) || quantity <= 0 || tx.amountCents <= 0) return null
  const price = tx.amountCents / 100 / quantity
  return Number.isFinite(price) ? price : null
}
import {positionBalance} from './balances.mjs'

export function heldSaleEstimate(tx, sale, market, now=Date.now()) {
  const quantity=Math.abs(Number(tx?.quantity))
  if(tx?.type!=='SELL'||!tx.isin||!Number.isFinite(quantity)||quantity<=0||!Number.isSafeInteger(sale?.costCents))return null
  if(market?.splits?.some(s=>s.date>tx.date))return null
  const key='ISIN:'+tx.isin
  const value=positionBalance({isin:tx.isin,quantity:String(quantity),ledger:{quantityStatus:'transactions'}},{[key]:market},now)
  return value.marketValueCents==null?null:{gainCents:value.marketValueCents-sale.costCents,asOf:value.priceAsOf}
}
