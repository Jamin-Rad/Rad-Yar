import 'server-only'
import { createMarketCache } from './market-cache.mjs'
import { parseIsinMarket } from './isin-market.mjs'
import { validIsin } from './family.mjs'
const cached = createMarketCache()
export async function loadIsinMarket(isin, force = false) {
  if (!validIsin(isin)) throw Error('شناسه ابزار معتبر نیست.')
  return cached(isin, async () => {
    const response = await fetch(`https://www.onvista.de/suche/${isin}`, { headers:{'User-Agent':'Mozilla/5.0 (compatible; FamilyPortfolio/1.0)',Accept:'text/html'}, cache:'no-store', signal:AbortSignal.timeout(12000) })
    if (!response.ok || new URL(response.url).hostname !== 'www.onvista.de') throw Error('منبع قیمت خودکار پاسخ معتبر نداد.')
    const html = await response.text()
    if (html.length > 3000000) throw Error('پاسخ منبع بیش از حد بزرگ است.')
    return parseIsinMarket(html, isin)
  }, force)
}
