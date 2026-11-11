import { ACCOUNT_DEFINITIONS, validIsin } from './family.mjs'
import { LEDGER_COLUMNS, transactionsFromCsv, ledgerUnits, ledgerQuantity } from './ledger.mjs'

const accounts = new Set(ACCOUNT_DEFINITIONS.map(a=>a.id))
const SCALE = 10000000000n
const euro = n => (n/100).toFixed(2)
const csvCell = value => '"'+String(value??'').replaceAll('"','""')+'"'
const owner = id => ACCOUNT_DEFINITIONS.find(a=>a.id===id)?.owner || ''
function positiveCents(value) {
  if(!Number.isSafeInteger(value)||value<=0||value>1e11)throw Error('مبلغ باید مثبت و به سنت باشد.')
  return value
}
function charge(value) {
  if(value==null)throw Error('کارمزد و مالیات را وارد کن؛ اگر مبلغی ندارند، صفر وارد کن.')
  if(!Number.isSafeInteger(value)||value<0||value>1e11)throw Error('کارمزد و مالیات باید صفر یا مثبت باشند.')
  return value
}
// A request ID survives network retries. Both transfer legs share this ID and
// are committed together by the database, never by two independent requests.
export function manualEntryBatches(input, now=Date.now()) {
  if(!input || !/^[A-Za-z0-9_-]{8,64}$/.test(input.requestId))throw Error('شناسه ثبت معتبر نیست.')
  if(!['BUY','SELL','DEPOSIT','WITHDRAW','TRANSFER'].includes(input.kind))throw Error('نوع ثبت معتبر نیست.')
  const time=Date.parse(input.datetime)
  if(typeof input.datetime!=='string'||!/(Z|[+-]\d\d:\d\d)$/.test(input.datetime)||!Number.isFinite(time)||time>now+300000)throw Error('تاریخ و زمان معتبر وارد کن.')
  const datetime=new Date(time).toISOString(),date=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(time)
  const net=positiveCents(input.netCents), note=String(input.note||'').trim().slice(0,1000)
  const trade=['BUY','SELL'].includes(input.kind)
  const from=input.kind==='TRANSFER'?input.fromAccount:input.accountId
  if(!accounts.has(from))throw Error('حساب معتبر نیست.')
  if(input.kind==='TRANSFER'&&(!accounts.has(input.toAccount)||from===input.toAccount))throw Error('مبدأ و مقصد باید دو حساب متفاوت باشند.')
  let quantity,isin='',name='',price=null,fee=null,tax=null,gross=net
  if(trade){
    isin=String(input.isin||'').trim().toUpperCase();name=String(input.name||'').trim().slice(0,160)
    if(!validIsin(isin)||!name)throw Error('نام و شناسه دارایی را وارد کن.')
    const units=ledgerUnits(String(input.quantity));if(units<=0n)throw Error('تعداد باید مثبت باشد.')
    quantity=ledgerQuantity(units);fee=charge(input.feeCents);tax=charge(input.taxCents)
    gross=input.kind==='BUY'?net-(fee||0)-(tax||0):net+(fee||0)+(tax||0)
    positiveCents(gross)
    // Derived execution price, rounded to ten places, solely to validate the
    // gross amount in the shared CSV parser. The entered net cash is preserved.
    price=ledgerQuantity((BigInt(gross)*SCALE*SCALE+50n*units)/(100n*units))
  }
  const legs=input.kind==='TRANSFER'?[{accountId:from,type:'TRANSFER_OUT',cash:-net,counterparty:owner(input.toAccount)},{accountId:input.toAccount,type:'TRANSFER_IN',cash:net,counterparty:owner(from)}]:[{accountId:from,type:trade?input.kind:input.kind==='DEPOSIT'?'TRANSFER_IN':'TRANSFER_OUT',cash:['BUY','WITHDRAW'].includes(input.kind)?-net:net,counterparty:trade?'':'حساب بانکی'}]
  return legs.map((leg,index)=>{
    const raw={datetime,date,account_type:['self','fatemeh'].includes(leg.accountId)?'DEFAULT':'JUNIOR',category:trade?'TRADING':'CASH',type:leg.type,asset_class:trade?'STOCK':'',name:trade?name:leg.counterparty,symbol:isin,shares:trade?(input.kind==='SELL'?'-':'')+quantity:'',price:price||'',amount:euro(trade?(input.kind==='BUY'?-gross:gross):leg.cash),fee:fee==null?'':euro(-fee),tax:tax==null?'':euro(-tax),currency:'EUR',description:note,transaction_id:`manual_${input.requestId}_${index}`,counterparty_name:leg.counterparty,payment_reference:input.kind==='TRANSFER'?`family_${input.requestId}`:''}
    const csv=[LEDGER_COLUMNS.map(csvCell).join(','),LEDGER_COLUMNS.map(k=>csvCell(raw[k])).join(',')].join('\r\n')
    const rows=transactionsFromCsv(csv,leg.accountId).transactions.map(tx=>({...tx,...(trade&&(fee==null||tax==null)?{amountCents:null,price:null}:{}),manual:{requestId:input.requestId,kind:input.kind,netCents:net,breakdownComplete:!trade||fee!=null&&tax!=null,linkedAccount:input.kind==='TRANSFER'?(index?from:input.toAccount):null,...(typeof input.planId==='string'&&/^[A-Za-z0-9_-]{1,80}$/.test(input.planId)?{planId:input.planId,month:date.slice(0,7)}:{})}}))
    if(rows[0].cashCents!==leg.cash)throw Error('تطبیق مبلغ نقد انجام نشد.')
    return {accountId:leg.accountId,csv,rows,filename:`entry-${input.requestId}.csv`}
  })
}
