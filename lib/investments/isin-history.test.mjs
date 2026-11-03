import test from 'node:test'
import assert from 'node:assert/strict'
import {parseIsinMarket,parseIsinHistory} from './isin-market.mjs'
import {marketImpact} from './market.mjs'
const now=Date.parse('2026-06-08T15:00:00Z')
const market={identity:{isin:'US0378331005',entityType:'STOCK',entityValue:'123'},quote:{idNotation:456,price:110,currency:'EUR',asOf:'2026-06-08T14:00:00Z'},fx:{latest:{rate:1,date:'2026-06-08'}},splits:[]}
const data={entityType:'STOCK',entityValue:'123',idNotation:456,market:{idNotation:456},isoCurrency:'EUR',unitType:'STK',datetimeLast:[Date.parse('2026-06-01')/1000,Date.parse('2026-06-08')/1000],last:[100,900],first:[99,900],high:[102,901],low:[98,899],volume:[12,15]}
test('history requires exact instrument, venue, currency and per-share unit, excluding the unfinished day',()=>{
 const result=parseIsinHistory(data,market,now)
 assert.deepEqual(result.history,[{date:'2026-06-01',close:100,open:99,high:102,low:98,volume:12}])
 assert.equal(result.historyMeta.verified,true)
 for(const change of [{entityValue:'124'},{entityType:'FUND'},{idNotation:457},{market:{idNotation:457}},{isoCurrency:'USD'},{unitType:'PCT'},{last:[100]}])assert.throws(()=>parseIsinHistory({...data,...change},market,now))
})
test('page history in USD is never attached to a EUR quote even when the selected quote is primary',()=>{
 const instrument={isin:market.identity.isin,entityType:'STOCK',entityValue:'123'}
 const quote={market:{idNotation:456},isoCurrency:'EUR',unitType:'STK',last:110,datetimeLast:'2026-06-08T14:00:00Z'}
 const html='<script id="__NEXT_DATA__">'+JSON.stringify({props:{pageProps:{data:{snapshot:{instrument,quote},eodHistory:{displayUnit:'USD',history:[{datetime:'2026-06-01',last:130}]}}}}})+'</script>'
 const parsed=parseIsinMarket(html,market.identity.isin,now)
 assert.deepEqual(parsed.history,[])
 assert.equal(marketImpact({isin:instrument.isin,quantity:'1'},{...parsed,history:[{date:'2026-06-01',close:130}]},7),null)
 const valid={...market,...parseIsinHistory(data,market,now)}
 assert.ok(Math.abs(marketImpact({isin:instrument.isin,quantity:'2'},valid,7).nativePercent-10)<1e-9)
 assert.equal(marketImpact({isin:instrument.isin,quantity:'2'},valid,7).deltaCents,2000)
})
