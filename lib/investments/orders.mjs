import {ACCOUNT_DEFINITIONS, validIsin} from './family.mjs'
import {ledgerQuantity, ledgerUnits} from './ledger.mjs'
import {normalizeDigits} from './portfolio.mjs'

export function orderTerms(input) {
  const {accountId, side, type} = input || {}
  const name = String(input?.name || '').trim()
  const isin = String(input?.isin || '').trim().toUpperCase()
  if (!ACCOUNT_DEFINITIONS.some(account => account.id === accountId) || !['BUY', 'SELL'].includes(side) || !['market', 'limit', 'stop'].includes(type)) throw Error('حساب، جهت یا نوع اردر معتبر نیست.')
  if (!name || name.length > 160 || !validIsin(isin)) throw Error('نام دارایی و ISIN معتبر وارد کن.')
  const readDecimal = value => ledgerUnits(normalizeDigits(value ?? '').replace(/[٫,]/g, '.'))
  const quantity = readDecimal(input.quantity)
  const price = type === 'market' ? null : readDecimal(input.price)
  if (quantity <= 0n || (price !== null && price <= 0n)) throw Error('تعداد و قیمت باید مثبت باشند.')
  return {accountId, side, type, name, isin, quantity: ledgerQuantity(quantity), price: price === null ? null : ledgerQuantity(price)}
}

export function orderProgress(order) {
  const filled = order.fills.reduce((total, fill) => total + ledgerUnits(fill.quantity), 0n)
  const remaining = ledgerUnits(order.terms.quantity) - filled
  let status = 'draft'
  if (order.cancelled_at) status = 'cancelled'
  else if (remaining === 0n) status = 'filled'
  else if (filled > 0n) status = 'partial'
  else if (order.placed_at) status = 'open'
  return {status, remaining: ledgerQuantity(remaining), filled: ledgerQuantity(filled)}
}
