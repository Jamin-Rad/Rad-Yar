// Pure market calculations. Recorded broker values are never overwritten.
export function marketKey(position) {
  return position.marketConfirmed && position.marketSymbol ? position.marketSymbol : position.isin ? `ISIN:${position.isin}` : ''
}
export function marketForPosition(position, markets = {}) { return markets[marketKey(position)] }
export function marketTrusted(position, market) { return !!market && (market.identity?.isin ? !!position.isin && market.identity.isin === position.isin : position.marketConfirmed === true) }
export function periodReference(history, days, asOf) {
  const cutoff = new Date(asOf).getTime() - days * 86400000
  return [...history].reverse().find(p => new Date(p.date).getTime() <= cutoff) || null
}
export function marketImpact(position, market, days = 7) {
  if (!marketTrusted(position, market) || !market?.quote || !market.history?.length) return null
  if (market.identity?.isin && (!market.historyMeta?.verified || market.historyMeta.idNotation !== market.quote.idNotation || market.historyMeta.currency !== market.quote.currency)) return null
  const base = periodReference(market.history, days, market.quote.asOf)
  if (!base || market.splits?.some(s => s.date > base.date && s.date <= market.quote.asOf.slice(0, 10))) return null
  const nativePercent = (market.quote.price / base.close - 1) * 100
  const fx = market.quote.currency==='EUR' ? {rate:1} : market.fx?.[base.date]
  const latestFx = market.fx?.latest
  const estimated = (position.ledger?.quantityStatus !== 'prior-record' || position.ledger?.quantityConfirmed) && fx && latestFx ? Math.round(Number(position.quantity) * (market.quote.price * latestFx.rate - base.close * fx.rate) * 100) : null
  const deltaCents = Number.isSafeInteger(estimated) ? estimated : null
  return { nativePercent, deltaCents, previous: base.date, latest: market.quote.asOf.slice(0, 10), fxDate: latestFx?.date || null }
}
export function attentionQueue(state, markets, today) {
  const rows = []
  const total = state.accounts.flatMap(a => a.positions).reduce((s, p) => s + p.valueCents, 0)
  for (const account of state.accounts) for (const p of account.positions) {
    const market = marketForPosition(p,markets)
    const reasons = []
    if (!marketTrusted(p,market)) reasons.push({ kind: 'quality', text: 'نماد بازار هنوز با ابزار بروکر تطبیق نشده' })
    if (p.gainCents == null && p.ledger?.costCents == null) reasons.push({ kind: 'quality', text: 'مبلغ سود/زیان ناقص است' })
    if (!market?.quote && !p.asOf && !account.snapshotDate) reasons.push({ kind: 'quality', text: 'تاریخ ارزش ثبت‌شده مشخص نیست' })
    const movement = marketImpact(p, market)
    const stale = market?.quote && new Date(today).getTime() - new Date(market.quote.asOf).getTime() > 4 * 86400000
    if (stale) reasons.push({ kind: 'quality', text: 'داده بازار بیش از چهار روز قدمت دارد' })
    if (movement && !stale && (Math.abs(movement.nativePercent) >= 5 || (movement.deltaCents != null && total && Math.abs(movement.deltaCents) >= total * .005))) reasons.push({ kind: 'movement', text: 'حرکت هفتگی قابل توجه؛ آستانه ۵٪ یا اثر برآوردی ۰٫۵٪ از سبد ثبت‌شده' })
    const news = (market?.news || []).filter(n => n.important)
    if (marketTrusted(p,market) && news.length) reasons.push({ kind: 'news', text: `${news.length} خبر با واژه‌های رویداد مهم؛ ارتباط و اثر آن باید بررسی شود` })
    if (reasons.length) rows.push({ accountId: account.id, owner: account.owner, positionId: p.id, name: p.name, reasons, movement, news, score: reasons.some(r => r.kind === 'movement') ? 3 : news.length && marketTrusted(p,market) ? 2 : 1 })
  }
  return rows.sort((a, b) => b.score - a.score || Math.abs(b.movement?.deltaCents || 0) - Math.abs(a.movement?.deltaCents || 0))
}
export function parseNews(xml, now = Date.now()) {
  const decode = value => value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
  const extract = (item, name) => decode(item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || '')
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const title = extract(item, 'title'), url = extract(item, 'link'), date = new Date(extract(item, 'pubDate'))
    return { title, url, publisher: extract(item, 'source'), date: Number.isFinite(date.getTime()) ? date.toISOString() : null, important: /earnings|guidance|acquis|merger|dividend|recall|lawsuit|bankrupt|profit warning|results|SEC filing/i.test(title) }
  }).filter(n => n.title && /^https:\/\//.test(n.url) && n.date && now - new Date(n.date).getTime() < 14 * 86400000 && new Date(n.date).getTime() <= now + 86400000).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
}
