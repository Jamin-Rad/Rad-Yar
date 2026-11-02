import { validateState, summarize, money, signedMoney, percent, normalizeDigits, holdingQuantity } from './portfolio.mjs'
import { tradingViewSymbol } from './tradingview.mjs'

export const ACCOUNT_DEFINITIONS = [
  { id: 'self', owner: 'من', initials: 'م', color: '#c7e99a' },
  { id: 'fatemeh', owner: 'فاطمه', initials: 'ف', color: '#c6b6f0' },
  { id: 'mobin', owner: 'مبین', initials: 'م', color: '#9bc7ed' },
  { id: 'mobina', owner: 'مبینا', initials: 'م', color: '#e4b394' },
]
export const MAX_BACKUP_BYTES = 12_000_000
const ACCOUNT_IDS = new Set(ACCOUNT_DEFINITIONS.map(a => a.id))
const PRODUCTS = ['stock', 'etf', 'cfd', 'other']
export const PRODUCT_LABELS = { stock: 'سهام', etf: 'ETF', cfd: 'CFD', other: 'سایر' }
export const STATUS_LABELS = { planned: 'برنامه‌ریزی‌شده', open: 'باز', closed: 'بسته‌شده', cancelled: 'لغوشده' }

function text(value, max = 1000) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }
function identifier(value) { return typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value) }
export function isDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value
}
function date(value, label, optional = false) {
  if (!value && optional) return null
  if (!isDate(value)) throw new Error(`${label} معتبر نیست.`)
  return value
}
function timestamp(value) {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) throw new Error('زمان ثبت معتبر نیست.')
  return value
}
function cents(value, optional = true) {
  if (value == null && optional) return null
  if (!Number.isSafeInteger(value) || Math.abs(value) > 1e12) throw new Error('مبلغ ثبت‌شده معتبر نیست.')
  return value
}
export function decimal(value, optional = false) {
  const normalized = normalizeDigits(value ?? '').replace(',', '.').replace(/٫/g, '.')
  if (!normalized && optional) return null
  if (!/^\d{1,12}(?:\.\d{1,8})?$/.test(normalized) || Number(normalized) <= 0) throw new Error('عدد مثبت با حداکثر هشت رقم اعشار وارد کن.')
  return normalized
}
export function priceUnits(value) {
  const [whole, fraction = ''] = value.split('.')
  return BigInt(whole) * 100000000n + BigInt(fraction.padEnd(8, '0'))
}
export function unitsDecimal(value) {
  const whole = value / 100000000n
  const fraction = String(value % 100000000n).padStart(8, '0').replace(/0+$/, '')
  return `${whole}${fraction ? '.' + fraction : ''}`
}
function marketSymbol(value) {
  const symbol = text(value, 35).toUpperCase()
  if (symbol && !/^[A-Z0-9^][A-Z0-9.^=\-]{0,34}$/.test(symbol)) throw new Error('نماد منبع بازار معتبر نیست.')
  return symbol
}
export function validIsin(value) {
  if (!/^[A-Z]{2}[A-Z0-9]{9}\d$/.test(value)) return false
  const digits = value.replace(/[A-Z]/g, char => String(char.charCodeAt(0) - 55))
  let total = 0
  for (let i = digits.length - 1, offset = 0; i >= 0; i--, offset++) {
    let digit = Number(digits[i]) * (offset % 2 ? 2 : 1)
    total += digit > 9 ? digit - 9 : digit
  }
  return total % 10 === 0
}
export function safeLink(value) {
  if (!value) return ''
  try { const url = new URL(value); if (url.protocol === 'https:' && !url.username && !url.password) return url.href } catch {}
  throw new Error('لینک باید یک نشانی معتبر HTTPS باشد.')
}
function unique(values, label) {
  const ids = new Set()
  for (const value of values) {
    if (!identifier(value?.id) || ids.has(value.id)) throw new Error(`شناسه ${label} تکراری یا نامعتبر است.`)
    ids.add(value.id)
  }
}

function validateAccount(input, definition) {
  const legacy = validateState({ version: 1, account: input, positions: input.positions, watchlist: input.watchlist || [] })
  const originals = new Map(input.positions.map(p => [p.id, p]))
  const positions = legacy.positions.map(p => {
    const original = originals.get(p.id)
    const symbol = text(original.symbol, 35)
    const isin = text(original.isin, 12).toUpperCase()
    if (isin && !validIsin(isin)) throw new Error('ISIN باید ۱۲ کاراکتر و رقم کنترل معتبر داشته باشد.')
    if (original.asOf && original.asOf > todayBerlin()) throw new Error('تاریخ ارزش دارایی نمی‌تواند در آینده باشد.')
    let ledger
    if(original.ledger){
      const l=original.ledger
      if(!['transactions','prior-record'].includes(l.quantityStatus)||!/^[-]?\d{1,12}(?:\.\d{1,10})?$/.test(l.netQuantity)||!Number.isInteger(l.transactionCount)||l.transactionCount<1||l.transactionCount>50000)throw new Error('منبع تعداد دارایی معتبر نیست.')
      ledger={throughDate:date(l.throughDate,'تاریخ تراکنش'),lastId:text(l.lastId,100),transactionCount:l.transactionCount,netQuantity:l.netQuantity,quantityStatus:l.quantityStatus,quantityConfirmed:l.quantityConfirmed===true,costCents:cents(l.costCents),reason:text(l.reason)}
    }
    return { ...p, symbol, isin, asOf: date(original.asOf, 'تاریخ ارزش دارایی', true), marketSymbol: marketSymbol(original.marketSymbol), marketConfirmed: original.marketConfirmed === true, tradingViewSymbol: tradingViewSymbol(original.tradingViewSymbol),...(ledger?{ledger}:{}) }
  })
  const snapshots = input.snapshots || []
  if (!Array.isArray(snapshots) || snapshots.length > 10000) throw new Error('تعداد ثبت‌های تاریخی بیش از حد مجاز است.')
  unique(snapshots, 'ثبت تاریخی')
  const dates = new Set()
  const normalized = snapshots.map(s => {
    const asOf = date(s.asOf, 'تاریخ ثبت تاریخی')
    if (asOf > todayBerlin() || s.confirmed !== true) throw new Error('ثبت تاریخی باید مربوط به گذشته و تأییدشده باشد.')
    if (dates.has(asOf)) throw new Error('برای یک تاریخ، دو ثبت در یک حساب مجاز نیست.')
    dates.add(asOf)
    if (!Array.isArray(s.positions) || !s.positions.length || s.positions.length > 500) throw new Error('ثبت تاریخی باید دارایی‌های همان روز را داشته باشد.')
    unique(s.positions, 'دارایی تاریخی')
    const storedPositions = s.positions.map(p => {
      const name = text(p.name, 160)
      if (!name) throw new Error('نام دارایی تاریخی لازم است.')
      const valueCents = cents(p.valueCents, false)
      if (valueCents < 0) throw new Error('ارزش دارایی نمی‌تواند منفی باشد.')
      return { id: p.id, name, symbol: text(p.symbol, 35), quantity: holdingQuantity(p.quantity), valueCents, gainCents: cents(p.gainCents) }
    })
    return { id: s.id, asOf, recordedAt: timestamp(s.recordedAt), positions: storedPositions, note: text(s.note), confirmed: s.confirmed === true }
  })
  let cashOpening
  if (input.cashOpening != null) {
    const openingDate = date(input.cashOpening.date, 'تاریخ مانده افتتاحیه')
    if (openingDate > todayBerlin()) throw Error('تاریخ مانده افتتاحیه نمی‌تواند در آینده باشد.')
    cashOpening = {date:openingDate,balanceCents:cents(input.cashOpening.balanceCents,false)}
  }
  let cashCheckpoint
  if (input.cashCheckpoint != null) {
    if (cashOpening) throw Error('فقط یک مبنای نقد برای حساب تعیین کن.')
    const asOf = timestamp(input.cashCheckpoint.asOf)
    if (Date.parse(asOf) > Date.now() + 300000) throw Error('زمان مانده نقد نمی‌تواند در آینده باشد.')
    cashCheckpoint = {asOf,balanceCents:cents(input.cashCheckpoint.balanceCents,false)}
  }
  return { id: definition.id, owner: definition.owner, broker: 'Trade Republic', currency: 'EUR', complete: legacy.account.complete, snapshotDate: legacy.account.snapshotDate, positions, watchlist: legacy.watchlist, snapshots: normalized, cashOpening:cashOpening || null, cashCheckpoint:cashCheckpoint || null }
}

function validateTrade(input) {
  const plan = input.plan
  if (!plan || !text(plan.name, 160) || !text(plan.rationale) || !text(plan.invalidation)) throw new Error('نام دارایی، دلیل ورود و شرط ابطال برنامه لازم است.')
  if (!['long', 'short'].includes(plan.direction) || !PRODUCTS.includes(plan.product)) throw new Error('جهت یا نوع ابزار معتبر نیست.')
  const entryPrice = decimal(plan.entryPrice)
  const stopPrice = decimal(plan.stopPrice, true)
  const targetPrice = decimal(plan.targetPrice, true)
  if (stopPrice && (plan.direction === 'long' ? priceUnits(stopPrice) >= priceUnits(entryPrice) : priceUnits(stopPrice) <= priceUnits(entryPrice))) throw new Error('حد توقف باید در سمت زیانِ قیمت ورود برنامه‌ریزی‌شده باشد.')
  if (targetPrice && (plan.direction === 'long' ? priceUnits(targetPrice) <= priceUnits(entryPrice) : priceUnits(targetPrice) >= priceUnits(entryPrice))) throw new Error('هدف باید در سمت سودِ قیمت ورود برنامه‌ریزی‌شده باشد.')
  const plannedRiskCents = cents(plan.plannedRiskCents)
  if (plannedRiskCents != null && plannedRiskCents < 0) throw new Error('زیان برنامه‌ریزی‌شده نمی‌تواند منفی باشد.')
  if (!/^[A-Z]{3}$/.test(plan.currency || '')) throw new Error('ارز قیمت معتبر نیست.')
  const plannedAt = timestamp(plan.createdAt)
  const plannedDate = date(plan.planDate, 'تاریخ برنامه')
  if (plannedDate > todayBerlin()) throw new Error('تاریخ برنامه ثبت‌شده نمی‌تواند در آینده باشد.')
  const reviewDate = date(plan.reviewDate, 'موعد بازبینی')
  if (reviewDate < plannedDate) throw new Error('موعد بازبینی باید پس از تاریخ برنامه باشد.')
  const executions = input.executions || []
  const reviews = input.reviews || []
  if (!Array.isArray(executions) || executions.length > 2000 || !Array.isArray(reviews) || reviews.length > 10000) throw new Error('تعداد ثبت‌های معامله معتبر نیست.')
  unique(executions, 'اجرای معامله'); unique(reviews, 'بازبینی')
  let lastDate = plannedDate
  let status = 'planned'
  let balance = 0n
  const normalizedExecutions = executions.map(event => {
    const eventDate = date(event.date, 'تاریخ اجرا')
    if (eventDate > todayBerlin()) throw new Error('اجرای واقعی با تاریخ آینده ثبت نمی‌شود.')
    if (eventDate < lastDate) throw new Error('ترتیب تاریخ‌های اجرا معتبر نیست.')
    lastDate = eventDate
    const common = { id: event.id, date: eventDate, recordedAt: timestamp(event.recordedAt), note: text(event.note) }
    if (status === 'planned' && event.kind === 'cancel') { status = 'cancelled'; return { ...common, kind: 'cancel' } }
    if (['planned', 'open'].includes(status) && event.kind === 'entry') {
      const quantity = decimal(event.quantity)
      balance += priceUnits(quantity)
      status = 'open'
      return { ...common, kind: 'entry', price: decimal(event.price), quantity }
    }
    if (status === 'open' && event.kind === 'exit') {
      const quantity = event.quantity == null ? unitsDecimal(balance) : decimal(event.quantity)
      const amount = priceUnits(quantity)
      if (amount > balance) throw new Error('حجم خروج از مانده موقعیت بیشتر است.')
      balance -= amount
      status = balance === 0n ? 'closed' : 'open'
      return { ...common, kind: 'exit', price: decimal(event.price), quantity, netResultCents: cents(event.netResultCents, false) }
    }
    throw new Error('ورود، خروج یا لغو با وضعیت فعلی معامله سازگار نیست.')
  })
  let previousReviewDate = plannedDate
  const normalizedReviews = reviews.map(r => {
    const reviewAt = date(r.date, 'تاریخ بازبینی')
    if (reviewAt > todayBerlin()) throw new Error('بازبینی انجام‌شده نمی‌تواند در آینده باشد.')
    if (reviewAt < previousReviewDate) throw new Error('تاریخ بازبینی‌ها باید به ترتیب باشد.')
    previousReviewDate = reviewAt
    if (!['yes', 'no', 'uncertain'].includes(r.thesisValid) || !['yes', 'no', 'uncertain'].includes(r.followedPlan) || !text(r.note)) throw new Error('نتیجه بازبینی و یادداشت را تکمیل کن.')
    const nextReviewDate = date(r.nextReviewDate, 'بازبینی بعدی', true)
    if (nextReviewDate && nextReviewDate < reviewAt) throw new Error('بازبینی بعدی نمی‌تواند قبل از این بازبینی باشد.')
    return { id: r.id, date: reviewAt, recordedAt: timestamp(r.recordedAt), thesisValid: r.thesisValid, followedPlan: r.followedPlan, note: text(r.note), nextReviewDate, chatResponse: text(r.chatResponse, 20000) }
  })
  return {
    id: input.id, accountId: 'xtb',
    plan: { name: text(plan.name, 160), symbol: text(plan.symbol, 35), direction: plan.direction, product: plan.product, currency: plan.currency, entryPrice, stopPrice, targetPrice, quantity: decimal(plan.quantity, true), plannedRiskCents, rationale: text(plan.rationale), invalidation: text(plan.invalidation), planDate: plannedDate, reviewDate, createdAt: plannedAt },
    executions: normalizedExecutions, reviews: normalizedReviews,
  }
}

export const DECISION_ACTIONS = { hold: 'نگهداری', add: 'افزایش', reduce: 'کاهش', exit: 'خروج', watch: 'زیر نظر گرفتن' }
function validateDecision(d) {
  if (!ACCOUNT_IDS.has(d.accountId) || !identifier(d.positionId) || !text(d.name, 160) || !Object.hasOwn(DECISION_ACTIONS, d.action) || !text(d.rationale) || !text(d.invalidation)) throw new Error('حساب، دارایی، تصمیم، دلیل و شرط تغییر نظر را تکمیل کن.')
  const planDate = date(d.planDate, 'تاریخ تصمیم')
  if (planDate > todayBerlin()) throw new Error('تصمیم ثبت‌شده نمی‌تواند تاریخ آینده داشته باشد.')
  const reviewDate = date(d.reviewDate, 'موعد بازبینی')
  if (reviewDate < planDate) throw new Error('موعد بازبینی قبل از تصمیم است.')
  const reviews = d.reviews || []
  if (!Array.isArray(reviews) || reviews.length > 10000) throw new Error('تعداد بازبینی‌ها معتبر نیست.')
  unique(reviews, 'بازبینی تصمیم')
  let previous = planDate
  return { id: d.id, accountId: d.accountId, positionId: d.positionId, name: text(d.name, 160), action: d.action, rationale: text(d.rationale), invalidation: text(d.invalidation), planDate, reviewDate, createdAt: timestamp(d.createdAt), baselineQuantity: decimal(d.baselineQuantity, true), baselineValueCents: cents(d.baselineValueCents), baselineDate: date(d.baselineDate, 'تاریخ مبنا', true), reviews: reviews.map(r => {
    const reviewAt = date(r.date, 'تاریخ بازبینی')
    if (reviewAt < previous || reviewAt > todayBerlin()) throw new Error('ترتیب یا تاریخ بازبینی معتبر نیست.')
    previous = reviewAt
    if (!text(r.note) || !['yes', 'no', 'uncertain'].includes(r.thesisValid) || !['yes', 'no', 'uncertain'].includes(r.followedPlan)) throw new Error('یادداشت و ارزیابی بازبینی را تکمیل کن.')
    const next = date(r.nextReviewDate, 'بازبینی بعدی', true)
    if (next && next < reviewAt) throw new Error('موعد بعدی قبل از بازبینی است.')
    return { id: r.id, date: reviewAt, recordedAt: timestamp(r.recordedAt), thesisValid: r.thesisValid, followedPlan: r.followedPlan, note: text(r.note), nextReviewDate: next, chatResponse: text(r.chatResponse, 20000), actualOutcomeCents: cents(r.actualOutcomeCents), noActionOutcomeCents: cents(r.noActionOutcomeCents), evidence: text(r.evidence, 2000) }
  }) }
}
export function normalizeFamilyState(input) {
  if (input?.version === 1) {
    const legacy = validateState(input)
    return normalizeFamilyState({ version: 2, accounts: ACCOUNT_DEFINITIONS.map((definition, i) => ({ id: definition.id, complete: i ? false : legacy.account.complete, snapshotDate: i ? null : legacy.account.snapshotDate, positions: i ? [] : legacy.positions, watchlist: i ? [] : legacy.watchlist, snapshots: [] })), trades: [] })
  }
  if (!input || ![2, 3].includes(input.version) || !Array.isArray(input.accounts) || input.accounts.length !== 4 || !Array.isArray(input.trades) || input.trades.length > 500) throw new Error('ساختار فضای سرمایه معتبر نیست.')
  unique(input.accounts, 'حساب'); unique(input.trades, 'برنامه معامله')
  if (input.accounts.some(a => !ACCOUNT_IDS.has(a.id))) throw new Error('حساب ناشناخته است.')
  const decisions = input.decisions || []
  const events = input.events || []
  if (!Array.isArray(decisions) || decisions.length > 5000 || !Array.isArray(events) || events.length > 5000) throw new Error('تعداد تصمیم‌ها یا رویدادها معتبر نیست.')
  unique(decisions, 'تصمیم'); unique(events, 'رویداد')
  const xtbEquityCents = cents(input.settings?.xtbEquityCents)
  if (xtbEquityCents != null && xtbEquityCents < 0) throw new Error('ارزش حساب XTB نمی‌تواند منفی باشد.')
  return { version: 3, accounts: ACCOUNT_DEFINITIONS.map(definition => validateAccount(input.accounts.find(a => a.id === definition.id), definition)), trades: input.trades.map(validateTrade), decisions: decisions.map(validateDecision), events: events.map(e => {
    if (!ACCOUNT_IDS.has(e.accountId) || !identifier(e.positionId) || !text(e.title, 160)) throw new Error('رویداد معتبر نیست.')
    return { id: e.id, accountId: e.accountId, positionId: e.positionId, title: text(e.title, 160), date: date(e.date, 'تاریخ رویداد'), url: safeLink(e.url), done: e.done === true }
  }), settings: { xtbEquityCents, isinPricesEnabled:input.settings?.isinPricesEnabled === true } }
}

export function tradePosition(trade) {
  let balance = 0n
  let netResultCents = 0
  for (const e of trade.executions) {
    if (e.kind === 'entry') balance += priceUnits(e.quantity)
    if (e.kind === 'exit') { balance -= e.quantity == null ? balance : priceUnits(e.quantity); netResultCents += e.netResultCents }
  }
  return { quantity: unitsDecimal(balance), netResultCents, hasRealized: trade.executions.some(e => e.kind === 'exit') }
}
export function tradeStatus(trade) {
  if (trade.executions.some(e => e.kind === 'cancel')) return 'cancelled'
  if (!trade.executions.some(e => e.kind === 'entry')) return 'planned'
  return tradePosition(trade).quantity === '0' ? 'closed' : 'open'
}
export function nextReviewDate(trade) {
  const last = trade.reviews.at(-1)
  return last ? last.nextReviewDate : trade.plan.reviewDate
}
export function familySummary(state) {
  const populated = state.accounts.filter(a => a.positions.length)
  const all = populated.flatMap(a => a.positions)
  const grouped = new Map()
  all.forEach((p, index) => { const key = p.isin || `unmatched-${index}`; const current = grouped.get(key); grouped.set(key, current ? { ...current, valueCents: current.valueCents + p.valueCents } : p) })
  const summary = summarize(all)
  summary.topFiveShare = summarize([...grouped.values()]).topFiveShare
  return { ...summary, populatedAccounts: populated.length, emptyAccounts: state.accounts.length - populated.length }
}
export function todayBerlin(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  return ['year', 'month', 'day'].map(key => parts.find(p => p.type === key).value).join('-')
}
export function reviewQueue(state, today = todayBerlin()) {
  return state.trades.filter(trade => nextReviewDate(trade) && nextReviewDate(trade) <= today).sort((a, b) => nextReviewDate(a).localeCompare(nextReviewDate(b)))
}
export function createSnapshot(account, { id, asOf, recordedAt, note = '' }) {
  if (!account.positions.length) throw new Error('حساب خالی ثبت تاریخی نمی‌گیرد.')
  if(account.positions.some(p=>p.valueCents==null))throw new Error('برای ثبت وضعیت تاریخ‌دار، ابتدا ارزش دارایی‌های بدون قیمت را تکمیل کن.')
  if (!isDate(asOf) || asOf > todayBerlin()) throw new Error('تاریخ واقعی ثبت را وارد کن؛ تاریخ آینده مجاز نیست.')
  if (account.snapshots.some(s => s.asOf === asOf)) throw new Error('برای این تاریخ قبلاً ثبت تاریخی انجام شده است.')
  return { id, asOf, recordedAt, confirmed: true, note, positions: account.positions.map(({ id, name, symbol = '', quantity, valueCents, gainCents }) => ({ id, name, symbol, quantity, valueCents, gainCents })) }
}
export function snapshotComparison(account) {
  const history = [...account.snapshots].sort((a, b) => a.asOf.localeCompare(b.asOf))
  if (history.length < 2) return null
  const latest = history.at(-1)
  const previous = history.at(-2)
  const total = snapshot => snapshot.positions.reduce((sum, p) => sum + p.valueCents, 0)
  const oldTotal = total(previous)
  const deltaCents = total(latest) - oldTotal
  return { previous, latest, deltaCents, percent: oldTotal ? deltaCents / oldTotal * 100 : null }
}
export function sharedPositions(state) {
  const registry = new Map()
  for (const account of state.accounts) for (const p of account.positions) {
    // Exact ISIN only; matching names or broker tickers alone can mix share classes.
    if (!p.isin) continue
    const entry = registry.get(p.isin) || { isin: p.isin, name: p.name, valueCents: 0, accounts: new Set() }
    entry.valueCents = entry.valueCents==null||p.valueCents==null?null:entry.valueCents+p.valueCents; entry.accounts.add(account.owner); registry.set(p.isin, entry)
  }
  return [...registry.values()].filter(p => p.accounts.size > 1).map(p => ({ ...p, accounts: [...p.accounts] })).sort((a, b) => b.valueCents - a.valueCents)
}

// Every old journal and dated snapshot is retained byte-for-byte after
// normalization. Edits become additional review records, never hindsight edits.
export function assertHistoryPreserved(previousInput, nextInput) {
  const previous = normalizeFamilyState(previousInput)
  const next = normalizeFamilyState(nextInput)
  for (const trade of previous.trades) {
    const updated = next.trades.find(t => t.id === trade.id)
    if (!updated || JSON.stringify(trade.plan) !== JSON.stringify(updated.plan)) throw new Error('برنامه اولیه ثبت‌شده قابل حذف یا بازنویسی نیست؛ بازبینی جدید اضافه کن.')
    for (const field of ['executions', 'reviews']) {
      if (JSON.stringify(trade[field]) !== JSON.stringify(updated[field].slice(0, trade[field].length))) throw new Error('سابقه اجرا و بازبینی قابل بازنویسی نیست.')
    }
  }
  for (const decision of previous.decisions) {
    const updated = next.decisions.find(d => d.id === decision.id)
    if (!updated || JSON.stringify({ ...decision, reviews: [] }) !== JSON.stringify({ ...updated, reviews: [] }) || JSON.stringify(decision.reviews) !== JSON.stringify(updated.reviews.slice(0, decision.reviews.length))) throw new Error('فرض اولیه و بازبینی تصمیم قابل حذف یا بازنویسی نیست؛ بازبینی جدید اضافه کن.')
  }
  for (const account of previous.accounts) for (const snapshot of account.snapshots) {
    const updated = next.accounts.find(a => a.id === account.id).snapshots.find(s => s.id === snapshot.id)
    if (JSON.stringify(snapshot) !== JSON.stringify(updated)) throw new Error('ثبت‌های تاریخی قابل حذف یا بازنویسی نیستند.')
  }
  return next
}

export function familyReport(state, { accountIds = ACCOUNT_DEFINITIONS.map(a => a.id), positionIds = null, tradeIds = null, includeTrades = true } = {}) {
  const accounts = state.accounts.filter(a => accountIds.includes(a.id))
  const rows = accounts.map(a => {
    const positions = positionIds ? a.positions.filter(p => positionIds.includes(`${a.id}:${p.id}`)) : a.positions
    return `## حساب ${a.owner} — Trade Republic\nتاریخ داده: ${a.snapshotDate || 'نامشخص'}؛ ${a.complete ? 'دارایی‌ها به تأیید کاربر کامل‌اند' : 'پوشش ناقص یا هنوز ثبت‌نشده'}\n${positions.length ? positions.map(p => `- ${p.name}${p.symbol ? ` (${p.symbol})` : ''}${p.isin ? `، ISIN: ${p.isin}` : ''}: تعداد ${p.quantity}؛ ارزش ثبت‌شده ${money(p.valueCents)}؛ سود/زیان نمایشی ${signedMoney(p.gainCents)}؛ منبع ${p.source}${p.ledger?`؛ تعداد ${p.ledger.quantityStatus==='transactions'?'از تراکنش‌ها محاسبه شده':'از ثبت قبلی و نیازمند تطبیق'}؛ هزینه خرید باقی‌مانده ${money(p.ledger.costCents)}؛ ${p.ledger.reason}`:''}؛ ${p.verified ? 'تطبیق‌شده توسط کاربر' : 'تأییدنشده'}${p.note ? `؛ یادداشت: ${p.note}` : ''}`).join('\n') : 'هیچ دارایی در محدوده انتخاب‌شده ثبت نشده است.'}`
  }).join('\n\n')
  const trades = includeTrades ? state.trades.filter(t => !tradeIds || tradeIds.includes(t.id)).map(t => `### ${t.plan.name} — XTB\nوضعیت: ${STATUS_LABELS[tradeStatus(t)]}؛ برنامه ${t.plan.planDate}؛ ${t.plan.direction === 'long' ? 'خرید/Long' : 'فروش/Short'}؛ ${PRODUCT_LABELS[t.plan.product]}\nزمان ثبت در ابزار: ${t.plan.createdAt}؛ تاریخ برنامه، تاریخ اعلام‌شده کاربر است.\nورود برنامه: ${t.plan.entryPrice} ${t.plan.currency}؛ توقف ${t.plan.stopPrice || 'تعیین نشده'}؛ هدف ${t.plan.targetPrice || 'تعیین نشده'}؛ زیان برنامه‌ریزی‌شده ${money(t.plan.plannedRiskCents)}\nدلیل: ${t.plan.rationale}\nشرط ابطال: ${t.plan.invalidation}\nاجراهای ثبت‌شده: ${t.executions.map(e => `${e.date} ${e.kind}${e.kind === 'exit' ? `، نتیجه خالص واقعی ${signedMoney(e.netResultCents)}` : e.kind === 'entry' ? `، قیمت ${e.price} ${t.plan.currency}، تعداد ${e.quantity}` : ''}`).join('؛ ') || 'هنوز اجرا ثبت نشده'}\nبازبینی‌ها: ${t.reviews.map(r => `${r.date}: فرض معتبر؟ ${r.thesisValid}؛ پایبندی به برنامه؟ ${r.followedPlan}؛ ${r.note}`).join('\n') || 'هنوز بازبینی ثبت نشده'}`).join('\n\n') : ''
  return `# بسته بررسی سرمایه خانواده\n\n${rows || 'حسابی انتخاب نشده است.'}${includeTrades ? `\n\n## دفتر معاملات XTB\n${trades || 'برنامه‌ای ثبت نشده است.'}` : ''}\n\n## درخواست از ChatGPT\nاین داده‌ها قیمت زنده نیستند. ابتدا محدودیت پوشش، تاریخ و مبنای خرید را مشخص کن. هر حساب را با مالکیت مستقل تحلیل کن. خبرها و قیمت‌های جدید را با منبع و زمان بررسی کن و داده ناموجود را نساز. تغییر ارزش حساب را بدون تفکیک واریز، برداشت و معاملات، بازده سرمایه‌گذاری ننام. نام نماد به تنهایی شناسه قطعی ابزار نیست. برای تصمیم‌های XTB، برنامه اولیه را حفظ کن؛ نتیجه مالی و پایبندی به برنامه را جدا ارزیابی کن. فرض‌های ضعیف، اطلاعات لازم و سناریوهای مخالف را مشخص کن. پیش از توصیه متناسب با شخص، هدف، افق زمانی، نقدینگی مورد نیاز و تحمل زیان را بپرس.\n`
}
