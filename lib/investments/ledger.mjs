import { parseCsv } from './import.mjs'
import { ACCOUNT_DEFINITIONS, isDate, validIsin } from './family.mjs'

export const LEDGER_COLUMNS = ['datetime','date','account_type','category','type','asset_class','name','symbol','shares','price','amount','fee','tax','currency','original_amount','original_currency','fx_rate','description','transaction_id','counterparty_name','counterparty_iban','payment_reference','mcc_code']
export const TRANSACTION_LABELS = { BUY:'خرید', SELL:'فروش', DIVIDEND:'سود نقدی سهم', DISTRIBUTION:'سود صندوق', INTEREST_PAYMENT:'بهره نقدی', TAX_OPTIMIZATION:'اصلاح مالیات', TRANSFER_IN:'واریز', TRANSFER_OUT:'برداشت', CUSTOMER_INBOUND:'واریز', CUSTOMER_OUTBOUND_REQUEST:'برداشت', TRANSFER_OUTBOUND:'برداشت', TRANSFER_INSTANT_OUTBOUND:'برداشت فوری', TRANSFER_INSTANT_INBOUND:'واریز فوری', CARD_ORDERING_FEE:'کارمزد کارت', GIFT:'هدیه نقدی', UNBUNDLING:'تفکیک دارایی', UNBUNDLING_CANCELLED:'لغو تفکیک', SPIN_OFF:'انشعاب شرکت', MERGER:'ادغام', SPLIT:'تجزیه سهم', REVERSE_SPLIT:'تجمیع سهم', STOCK_DIVIDEND:'سود به شکل سهم', STOCK_DIVIDEND_CANCELLED:'لغو سود سهمی', BONUS_ISSUE:'سهام جایزه', BONUS_ISSUE_CANCELLED:'لغو سهام جایزه', LIQUIDATION_DIVIDEND:'خروج سهم در تسویه', LIQUIDATION_PROCEEDS:'وجه تسویه', EARNINGS:'تعدیل مرتبط با درآمد', SEC_ACCOUNT:'تعدیل حساب اوراق', EXCHANGE:'تبدیل اوراق' }
const ACCOUNTS = new Set(ACCOUNT_DEFINITIONS.map(a=>a.id))
const INCOME = new Set(['DIVIDEND','DISTRIBUTION','INTEREST_PAYMENT'])
const TRANSFERS = new Set(['TRANSFER_IN','TRANSFER_OUT','CUSTOMER_INBOUND','CUSTOMER_OUTBOUND_REQUEST','TRANSFER_OUTBOUND','TRANSFER_INSTANT_OUTBOUND','TRANSFER_INSTANT_INBOUND','GIFT'])
const CORPORATE = new Set(['UNBUNDLING','UNBUNDLING_CANCELLED','SPIN_OFF','MERGER','SPLIT','REVERSE_SPLIT','STOCK_DIVIDEND','STOCK_DIVIDEND_CANCELLED','BONUS_ISSUE','BONUS_ISSUE_CANCELLED','LIQUIDATION_DIVIDEND'])
const SCALE = 10000000000n
export const LEDGER_LIMIT = 50000
const ownerName = id=>ACCOUNT_DEFINITIONS.find(a=>a.id===id)?.owner || id
function amount(value, optional=true) {
  if(value===''&&optional)return null
  if(!/^-?\d{1,12}(?:\.\d{1,10})?$/.test(value))throw Error('مبلغ عددی معتبر نیست.')
  const [whole,frac='']=value.replace('-','').split('.')
  if(/[1-9]/.test(frac.slice(2)))throw Error('مبلغ کوچک‌تر از یک سنت است؛ تبدیل خودکار انجام نشد.')
  const result=(Number(whole)*100+Number(frac.slice(0,2).padEnd(2,'0')))*(value.startsWith('-')?-1:1)
  if(!Number.isSafeInteger(result)||Math.abs(result)>1e11)throw Error('مبلغ خارج از محدوده مجاز است.')
  return result
}
export function ledgerUnits(value) {
  if(!/^-?\d{1,12}(?:\.\d{1,10})?$/.test(value))throw Error('تعداد باید عدد با حداکثر ده رقم اعشار باشد.')
  const [whole,frac='']=value.replace('-','').split('.')
  return (BigInt(whole)*SCALE+BigInt(frac.padEnd(10,'0')))*(value.startsWith('-')?-1n:1n)
}
export function ledgerQuantity(value) {
  const negative=value<0n;const absolute=negative?-value:value
  const fraction=String(absolute%SCALE).padStart(10,'0').replace(/0+$/,'')
  return `${negative?'-':''}${absolute/SCALE}${fraction?'.'+fraction:''}`
}
const absolute=value=>value<0n?-value:value
function roundRatio(numerator,denominator) { const sign=numerator<0n?-1n:1n;return sign*((absolute(numerator)+denominator/2n)/denominator) }
function tradeGross(price,quantity) { return Number(roundRatio(absolute(ledgerUnits(price)*ledgerUnits(quantity))*100n,SCALE*SCALE)) }
export function transactionsFromCsv(csv, accountId) {
  if(!ACCOUNTS.has(accountId))throw Error('حساب مقصد معتبر نیست.')
  const [header,...rows]=parseCsv(csv)
  if(!header||!rows.length||rows.length>10000)throw Error('فایل باید بین ۱ تا ۱۰٬۰۰۰ تراکنش داشته باشد.')
  if(new Set(header).size!==header.length||LEDGER_COLUMNS.some(c=>!header.includes(c)))throw Error('قالب تراکنش پشتیبانی نمی‌شود؛ ستون‌های تاریخ، نوع، مبلغ، کارمزد، مالیات و شناسه تراکنش لازم‌اند.')
  const seen=new Map(),transactions=[];let duplicates=0
  rows.forEach((values,index)=>{
    try {
      if(values.length!==header.length)throw Error('تعداد ستون‌ها با سربرگ یکسان نیست.')
      const raw=Object.fromEntries(header.map((k,i)=>[k,values[i].trim()]))
      if(Object.values(raw).some(v=>v.length>4000))throw Error('متن یکی از ستون‌ها بیش از حد طولانی است.')
      if(!/^[A-Za-z0-9_-]{1,100}$/.test(raw.transaction_id))throw Error('شناسه تراکنش لازم است.')
      if(!isDate(raw.date)||!Number.isFinite(Date.parse(raw.datetime)))throw Error('تاریخ یا زمان معتبر نیست.')
      if(!/^[A-Z][A-Z0-9_]{0,79}$/.test(raw.type))throw Error('نوع تراکنش معتبر نیست.')
      if((['self','fatemeh'].includes(accountId)&&raw.account_type!=='DEFAULT')||(['mobin','mobina'].includes(accountId)&&raw.account_type!=='JUNIOR'))throw Error('نوع حساب فایل با حساب انتخاب‌شده یکسان نیست.')
      const issues=[]
      const quantity=raw.shares?ledgerQuantity(ledgerUnits(raw.shares)):null
      if(raw.price)ledgerUnits(raw.price)
      const amountCents=amount(raw.amount),feeCents=amount(raw.fee),taxCents=amount(raw.tax)
      const financial=amountCents!==null||feeCents!==null||taxCents!==null
      if(financial&&raw.currency!=='EUR')throw Error('مبالغ مالی این قالب باید EUR باشند؛ ارز را حدس نمی‌زنیم.')
      if(!financial&&raw.currency&&!/^[A-Z]{3}$/.test(raw.currency))throw Error('واحد ارز معتبر نیست.')
      const isin=raw.symbol.toUpperCase()
      if(isin&&!validIsin(isin))issues.push('شناسه ابزار نیازمند تطبیق است')
      if(!TRANSACTION_LABELS[raw.type])issues.push('نوع تراکنش هنوز دسته‌بندی نشده')
      if(['BUY','SELL'].includes(raw.type)){
        if(!isin||!quantity||ledgerUnits(quantity)===0n||!raw.price||ledgerUnits(raw.price)<=0n||amountCents===null)throw Error('تعداد، قیمت، شناسه و مبلغ معامله لازم‌اند.')
        if(raw.type==='BUY'&&amountCents>=0||raw.type==='SELL'&&amountCents<=0)throw Error('علامت مبلغ خرید یا فروش با نوع معامله سازگار نیست.')
        if(Math.abs(Math.abs(amountCents)-tradeGross(raw.price,quantity))>1)throw Error('مبلغ ناخالص با تعداد × قیمت مطابق نیست؛ برای جلوگیری از دوباره‌شماری کارمزد، وارد نشد.')
      }
      const tx={id:raw.transaction_id,datetime:raw.datetime,date:raw.date,accountType:raw.account_type,category:raw.category,type:raw.type,assetClass:raw.asset_class,name:raw.name,isin,quantity,price:raw.price||null,amountCents,feeCents,taxCents,currency:raw.currency,cashCents:financial?(amountCents||0)+(feeCents||0)+(taxCents||0):null,issues,raw}
      const fingerprint=JSON.stringify(tx)
      if(seen.has(tx.id)){if(seen.get(tx.id)!==fingerprint)throw Error('شناسه تکراری با محتوای متفاوت است.');duplicates++;return}
      seen.set(tx.id,fingerprint);transactions.push({...tx,sourceRow:index+2,accountId})
    }catch(error){throw Error(`ردیف ${index+2}: ${error.message}`)}
  })
  return {transactions,duplicates,inputCount:rows.length,accountId}
}
export function ledgerGroup(tx) {
  if(tx.type==='BUY'||tx.type==='SELL')return 'trading'
  if(INCOME.has(tx.type))return 'income'
  if(TRANSFERS.has(tx.type))return 'transfers'
  if(CORPORATE.has(tx.type))return 'corporate'
  if(tx.type==='TAX_OPTIMIZATION'||tx.type==='SEC_ACCOUNT'||tx.type==='EXCHANGE'||tx.type==='EARNINGS')return 'tax'
  if(tx.type==='CARD_ORDERING_FEE')return 'fees'
  return 'other'
}
export function filterTransactions(rows,filter={}) {
  const query=(filter.query||'').trim().toLowerCase()
  return rows.filter(tx=>(!filter.accountId||filter.accountId==='all'||tx.accountId===filter.accountId)&&(!filter.from||tx.date>=filter.from)&&(!filter.to||tx.date<=filter.to)&&(!filter.type||filter.type==='all'||tx.type===filter.type)&&(!filter.group||filter.group==='all'||ledgerGroup(tx)===filter.group)&&(!query||[tx.name,tx.isin,tx.type,tx.id,tx.raw?.description].some(v=>v?.toLowerCase().includes(query))))
}
// Basis is built over ALL preceding history before display filters are applied.
export function fifoAnalysis(transactions) {
  const books=new Map(),sales=[],problems=[]
  const ordered=[...transactions].sort((a,b)=>Date.parse(a.datetime)-Date.parse(b.datetime)||a.id.localeCompare(b.id))
  for(const tx of ordered){
    if(!tx.isin)continue
    const key=tx.accountId+':'+tx.isin
    if(!books.has(key))books.set(key,{accountId:tx.accountId,isin:tx.isin,name:tx.name,lots:[],tainted:false,corporate:false,quantityReliable:true,quantity:0n})
    const book=books.get(key);if(tx.name)book.name=tx.name
    if(tx.issues?.length){book.tainted=true;problems.push({...tx,reason:tx.issues.join('؛ ')})}
    if(CORPORATE.has(tx.type)){
      book.tainted=true;book.corporate=true;book.quantityReliable=false
      problems.push({...tx,reason:'اقدام شرکتی: تعداد و تخصیص بهای تمام‌شده باید با سند بروکر تطبیق داده شود'})
      continue
    }
    if(INCOME.has(tx.type)&&tx.quantity&&absolute(ledgerUnits(tx.quantity))>book.quantity){
      book.tainted=true;book.quantityReliable=false
    }
    if(tx.type==='LIQUIDATION_PROCEEDS'){
      const reason='وجه تسویه دریافت شده؛ بهای خرید و سهم خارج‌شده باید تطبیق داده شوند'
      sales.push({...tx,costCents:null,realizedBeforeTaxCents:null,realizedAfterTaxCents:null,matched:[],reason})
      problems.push({...tx,reason});book.tainted=true;book.quantityReliable=false;continue
    }
    if(tx.type==='BUY'){
      const qty=absolute(ledgerUnits(tx.quantity));book.quantity+=qty
      book.lots.push({quantity:qty,costCents:-(tx.cashCents),date:tx.date,id:tx.id})
    }else if(tx.type==='SELL'){
      const quantity=absolute(ledgerUnits(tx.quantity));let remaining=quantity,cost=0
      const matched=[]
      while(remaining>0n&&book.lots.length){
        const lot=book.lots[0],used=remaining<lot.quantity?remaining:lot.quantity
        const costPart=Number(roundRatio(BigInt(lot.costCents)*used,lot.quantity))
        cost+=costPart;matched.push({buyId:lot.id,quantity:ledgerQuantity(used),costCents:costPart})
        remaining-=used;lot.quantity-=used;lot.costCents-=costPart
        if(lot.quantity===0n)book.lots.shift()
      }
      book.quantity-=quantity
      if(remaining>0n){book.tainted=true;book.quantityReliable=false}
      const known=!book.tainted&&remaining===0n
      const result={...tx,costCents:known?cost:null,realizedBeforeTaxCents:known?tx.amountCents+(tx.feeCents||0)-cost:null,realizedAfterTaxCents:known?tx.cashCents-cost:null,matched,reason:known?'FIFO با خریدهای موجود':book.corporate?'رویداد شرکتی و تخصیص بهای خرید تأیید نشده':'خرید اولیه یا تعداد کامل در فایل موجود نیست'}
      sales.push(result)
      if(!known)problems.push({...tx,reason:result.reason})
    }
  }
  const holdings=[...books.values()].filter(b=>b.quantity!==0n||b.corporate).map(b=>({accountId:b.accountId,isin:b.isin,name:b.name,quantity:b.quantityReliable?ledgerQuantity(b.quantity):null,knownNetQuantity:ledgerQuantity(b.quantity),costCents:!b.tainted?b.lots.reduce((s,l)=>s+l.costCents,0):null,reason:b.corporate?'رویداد شرکتی نیازمند تطبیق':b.tainted?'تعداد یا بهای خرید اولیه ناقص':'تعداد و هزینه خرید از تراکنش‌ها؛ قیمت روز نیست'}))
  return {sales,holdings,problems}
}
const sum=(rows,field)=>rows.reduce((s,r)=>s+(r[field]||0),0)
export function ledgerSummary(rows,sales=[]) {
  const financial=rows.filter(t=>t.currency==='EUR'),income=financial.filter(t=>INCOME.has(t.type)),known=sales.filter(s=>s.realizedAfterTaxCents!==null)
  const taxWithheldCents=financial.reduce((s,t)=>s+Math.max(0,-(t.taxCents||0)),0),taxRefundedCents=financial.reduce((s,t)=>s+Math.max(0,t.taxCents||0),0)
  const feesPaidCents=financial.reduce((s,t)=>s+Math.max(0,-(t.feeCents||0)),0),feesRefundedCents=financial.reduce((s,t)=>s+Math.max(0,t.feeCents||0),0)
  return {count:rows.length,buyCents:-sum(financial.filter(t=>t.type==='BUY'),'amountCents'),sellCents:sum(financial.filter(t=>t.type==='SELL'||t.type==='LIQUIDATION_PROCEEDS'),'amountCents'),dividendCents:sum(financial.filter(t=>t.type==='DIVIDEND'||t.type==='DISTRIBUTION'),'amountCents'),interestCents:sum(financial.filter(t=>t.type==='INTEREST_PAYMENT'),'amountCents'),incomeGrossCents:sum(income,'amountCents'),incomeNetCents:sum(income,'cashCents'),taxWithheldCents,taxRefundedCents,taxNetCents:taxWithheldCents-taxRefundedCents,feesPaidCents,feesRefundedCents,feesNetCents:feesPaidCents-feesRefundedCents,inboundCents:sum(financial.filter(t=>TRANSFERS.has(t.type)&&t.amountCents>0),'amountCents'),outboundCents:-sum(financial.filter(t=>TRANSFERS.has(t.type)&&t.amountCents<0),'amountCents'),cashMovementCents:sum(financial,'cashCents'),knownSales:known.length,unknownSales:sales.length-known.length,realizedBeforeTaxCents:sales.length===known.length?sum(known,'realizedBeforeTaxCents'):null,realizedAfterTaxCents:sales.length===known.length?sum(known,'realizedAfterTaxCents'):null,knownRealizedBeforeTaxCents:sum(known,'realizedBeforeTaxCents'),knownRealizedAfterTaxCents:sum(known,'realizedAfterTaxCents'),winningCents:sum(known.filter(s=>s.realizedBeforeTaxCents>0),'realizedBeforeTaxCents'),losingCents:sum(known.filter(s=>s.realizedBeforeTaxCents<0),'realizedBeforeTaxCents')}
}
export function ledgerReport(transactions,filter={}) {
  const fifo=fifoAnalysis(transactions.filter(t=>!filter.to||t.date<=filter.to)),rows=filterTransactions(transactions,filter)
  const ids=new Set(rows.map(t=>t.accountId+':'+t.id)),sales=fifo.sales.filter(t=>ids.has(t.accountId+':'+t.id))
  const buckets=new Map()
  for(const tx of rows){const key=tx.accountId+':'+tx.date.slice(0,4);if(!buckets.has(key))buckets.set(key,{accountId:tx.accountId,year:tx.date.slice(0,4),rows:[]});buckets.get(key).rows.push(tx)}
  const annual=[...buckets.values()].sort((a,b)=>a.year.localeCompare(b.year)||a.accountId.localeCompare(b.accountId)).map(b=>({...b,summary:ledgerSummary(b.rows,sales.filter(s=>s.accountId===b.accountId&&s.date.slice(0,4)===b.year))}))
  const monthBuckets=new Map()
  for(const tx of rows){const key=tx.accountId+':'+tx.date.slice(0,7);if(!monthBuckets.has(key))monthBuckets.set(key,{accountId:tx.accountId,month:tx.date.slice(0,7),rows:[]});monthBuckets.get(key).rows.push(tx)}
  const monthly=[...monthBuckets.values()].sort((a,b)=>a.month.localeCompare(b.month)||a.accountId.localeCompare(b.accountId)).map(b=>({...b,summary:ledgerSummary(b.rows,sales.filter(s=>s.accountId===b.accountId&&s.date.slice(0,7)===b.month))}))
  return {filter:{...filter},rows,sales,annual,monthly,summary:ledgerSummary(rows,sales),holdings:fifo.holdings.filter(h=>!filter.accountId||filter.accountId==='all'||h.accountId===filter.accountId),problems:fifo.problems.filter(t=>ids.has(t.accountId+':'+t.id))}
}
function csvCell(value) {
  let s=String(value??'')
  if(/^[\s]*[=+@\t\r]/.test(s)||/^\s*-/.test(s)&&!/^-[0-9]+(?:\.[0-9]+)?$/.test(s))s="'"+s
  return '"'+s.replaceAll('"','""')+'"'
}
export function rowsToCsv(rows) {return '\ufeff'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n')}
const eur=value=>value==null?'':(value/100).toFixed(2)
export function ledgerCsv(report,kind='transactions') {
  if(kind==='annual'||kind==='monthly')return rowsToCsv([['Account',kind==='annual'?'Year':'Month','Transactions','Buys gross EUR','Sales gross EUR','Dividends gross EUR','Interest gross EUR','Income net EUR','Fees paid EUR','Fee refunds EUR','Tax withheld EUR','Tax refunds EUR','Net tax EUR','FIFO known before tax EUR','FIFO known after tax EUR','Sales with known basis','Sales missing basis'],...(kind==='annual'?report.annual:report.monthly).map(r=>[ownerName(r.accountId),r.year||r.month,r.summary.count,...['buyCents','sellCents','dividendCents','interestCents','incomeNetCents','feesPaidCents','feesRefundedCents','taxWithheldCents','taxRefundedCents','taxNetCents','knownRealizedBeforeTaxCents','knownRealizedAfterTaxCents'].map(k=>eur(r.summary[k])),r.summary.knownSales,r.summary.unknownSales])])
  if(kind==='sales')return rowsToCsv([['Account','Date','Asset','ISIN','Quantity','Proceeds gross EUR','Sale fees signed EUR','Sale tax signed EUR','Basis including buy costs EUR','FIFO before tax EUR','FIFO after tax EUR','Status','Transaction ID'],...report.sales.map(s=>[ownerName(s.accountId),s.date,s.name,s.isin,s.quantity,eur(s.amountCents),eur(s.feeCents),eur(s.taxCents),eur(s.costCents),eur(s.realizedBeforeTaxCents),eur(s.realizedAfterTaxCents),s.reason,s.id])])
  if(kind==='holdings')return rowsToCsv([['Account','Asset','ISIN','Quantity verified from file','Known net trade quantity (may be incomplete)','Remaining cost EUR','Status'],...report.holdings.map(h=>[ownerName(h.accountId),h.name,h.isin,h.quantity,h.knownNetQuantity,eur(h.costCents),h.reason])])
  if(kind==='issues')return rowsToCsv([['Account','Date','Asset','ISIN','Type','Issue','Transaction ID'],...report.problems.map(t=>[ownerName(t.accountId),t.date,t.name,t.isin,t.type,t.reason,t.id])])
  const rows=kind==='tax'?report.rows.filter(t=>t.taxCents!=null&&t.taxCents!==0):kind==='income'?report.rows.filter(t=>INCOME.has(t.type)):report.rows
  return rowsToCsv([['Account','Date (export)','Time (source)','Type','Asset','ISIN','Signed quantity','Amount gross EUR','Fee signed EUR','Tax signed EUR','Cash movement EUR','Transaction ID','Source row'],...rows.map(t=>[ownerName(t.accountId),t.date,t.datetime,t.type,t.name,t.isin,t.quantity,eur(t.amountCents),eur(t.feeCents),eur(t.taxCents),eur(t.cashCents),t.id,t.sourceRow])])
}
export function ledgerTextReport(report,filter={}) {
  const s=report.summary, money=v=>v==null?'نامشخص':new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(v/100)
  return `# گزارش تراکنش‌های سرمایه‌گذاری\n\nحساب: ${filter.accountId&&filter.accountId!=='all'?ownerName(filter.accountId):'حساب‌های انتخاب‌شده خانواده'}\nنوع: ${!filter.type||filter.type==='all'?'همه':TRANSACTION_LABELS[filter.type]||filter.type}\nگروه: ${({all:'همه',income:'درآمد نقدی',trading:'خرید و فروش',transfers:'واریز و برداشت',corporate:'اقدامات شرکتی',tax:'تعدیل مالیات',fees:'هزینه‌ها',other:'سایر'})[filter.group||'all']}\nجست‌وجو: ${filter.query||'بدون محدودیت'}\nاز ${filter.from||'ابتدای فایل'} تا ${filter.to||'انتهای فایل'}\nتعداد تراکنش: ${s.count}\nسود نقدی ناخالص: ${money(s.dividendCents)}\nبهره ناخالص: ${money(s.interestCents)}\nدرآمد نقدی پس از مالیات و کارمزد همان ردیف‌ها: ${money(s.incomeNetCents)}\nکارمزد پرداخت‌شده: ${money(s.feesPaidCents)}\nکارمزد برگشتی: ${money(s.feesRefundedCents)}\nمالیات کسرشده: ${money(s.taxWithheldCents)}\nمالیات برگشتی: ${money(s.taxRefundedCents)}\nخالص مالیات ثبت‌شده: ${money(s.taxNetCents)}\nسود/زیان کل فروش‌ها پس از مالیات: ${money(s.realizedAfterTaxCents)}\nبرآورد FIFO بخش قابل تطبیق: ${money(s.knownRealizedAfterTaxCents)} (${s.knownSales} فروش)\nفروش فاقد بهای خرید کافی: ${s.unknownSales}\n\nمبالغ amount، fee و tax در این قالب سه جزء جدا هستند؛ جریان نقد برابر جمع آن‌هاست. واریز و برداشت سود نیست. جریان نقد، موجودی حساب نیست. سود تحقق‌نیافته و قیمت روز در این گزارش محاسبه نشده‌اند. هزینه خرید و فروش در سود FIFO لحاظ شده و نباید دوباره از آن کم شود. تطبیق FIFO از اولین خرید موجود شروع شده و موجودی افتتاحیه ثبت‌نشده را در نظر نمی‌گیرد. FIFO بر کل تاریخچه موجود و مستقل از فیلتر تاریخ ساخته می‌شود؛ نتیجه جزئی، سود کل حساب یا گواهی مالیاتی بروکر نیست. رویداد شرکتی یا نبود خرید اولیه، نتیجه را نامشخص می‌کند.\n\n## درخواست برای ChatGPT\nداده‌ها و محدودیت پوشش را بررسی کن. مالیات کسرشده را از مالیات برگشتی جدا کن. برای مقدار نامشخص بهای خرید یا رویداد شرکتی، عدد حدس نزن. ابتدا موارد لازم برای تکمیل محاسبه سود واقعی را به ترتیب اهمیت مشخص کن.\n`
}
