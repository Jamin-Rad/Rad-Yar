import { parseMoney, normalizeDigits, validateState } from './portfolio.mjs'
import { isDate, validIsin, todayBerlin } from './family.mjs'
export function parseCsv(text) {
  text=text.replace(/^\uFEFF/,'')
  const first=text.split(/\r?\n/)[0]
  const delimiter=first.includes('\t')?'\t':(first.match(/;/g)||[]).length>(first.match(/,/g)||[]).length?';':','
  const rows=[];let row=[],cell='',quoted=false
  for(let i=0;i<text.length;i++){
    const c=text[i]
    if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++}else quoted=!quoted}
    else if(c===delimiter&&!quoted){row.push(cell);cell=''}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell=''}
    else cell+=c
  }
  if(quoted)throw Error('نقل‌قول CSV بسته نشده است.')
  row.push(cell);if(row.some(v=>v.trim()))rows.push(row)
  return rows
}
const key=value=>value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u0600-\u06ff]/g,'')
const fields={name:['asset','name','instrument','wertpapier','bezeichnung','نام','دارایی'],isin:['isin'],quantity:['quantity','shares','anzahl','menge','stuck','تعداد'],value:['recordedvalueeur','valueeur','marketvalueeur','marktwerteur','werte ur','value','ارزشیورو'],gain:['displayedgaineur','gaineur','profitlosseur','سودزیانیورو'],symbol:['symbol','ticker'],date:['asof','date','datum','تاریخ']}
export function holdingsFromCsv(text, idFactory, owner) {
  const [header,...rows]=parseCsv(text)
  if(!header||!rows.length||rows.length>500)throw Error('فایل باید بین ۱ تا ۵۰۰ ردیف دارایی داشته باشد.')
  const indices=Object.fromEntries(Object.entries(fields).map(([name,aliases])=>[name,header.findIndex(h=>aliases.map(key).includes(key(h)))]))
  if(['name','quantity','value'].some(f=>indices[f]<0))throw Error('ستون‌های نام دارایی، تعداد و ارزش کل به یورو لازم‌اند. فایل تاریخچه تراکنش، جایگزین فهرست دارایی‌ها نیست؛ از قالب نمونه استفاده کن.')
  const accountIndex=header.findIndex(h=>key(h)==='account')
  const currencyIndex=header.findIndex(h=>['currency','wahrung','ارز'].map(key).includes(key(h)))
  if(currencyIndex>=0&&rows.some(r=>r[currencyIndex]?.trim().toUpperCase()!=='EUR')) throw Error('ارزش‌های CSV باید همگی به یورو باشند؛ تبدیل ارز را حدس نمی‌زنیم.')
  if(accountIndex>=0&&owner&&rows.some(r=>r[accountIndex]?.trim()!==owner)) throw Error('فایل شامل حساب دیگری است؛ ابتدا خروجی یک مالک را جدا کن.')
  const seen=new Set()
  const positions=rows.map((row,index)=>{
    const get=f=>indices[f]<0?'':(row[indices[f]]||'').trim()
    const name=get('name'),isin=get('isin').toUpperCase(),asOf=get('date')||null
    if(isin&&!validIsin(isin))throw Error(`ISIN ردیف ${index+2} معتبر نیست.`)
    if(asOf&&(!isDate(asOf)||asOf>todayBerlin()))throw Error(`تاریخ ردیف ${index+2} باید YYYY-MM-DD و غیرآینده باشد.`)
    const identity=isin||name.toLowerCase()
    if(seen.has(identity))throw Error(`دارایی تکراری در ردیف ${index+2}؛ ابتدا تعداد و ارزش را تجمیع کن.`)
    seen.add(identity)
    return{id:idFactory(),name,isin,symbol:get('symbol'),quantity:normalizeDigits(get('quantity')).replace(',','.'),valueCents:parseMoney(get('value')),gainCents:parseMoney(get('gain'),true),asOf,category:'stock',note:'ورود از CSV؛ تطبیق نماد بازار جداگانه لازم است.',source:'csv',verified:false,marketSymbol:'',marketConfirmed:false}
  })
  validateState({version:1,positions,account:{},watchlist:[]})
  return positions
}
export function mergeHoldings(account, imported) {
  const positions=account.positions.map(p=>({...p,asOf:p.asOf||account.snapshotDate||null}))
  for(const incoming of imported){
    if (!incoming.isin && positions.some(p=>p.isin&&p.name.toLowerCase()===incoming.name.toLowerCase())) throw Error('برای به‌روزرسانی دارایی دارای ISIN، همان شناسه را در فایل وارد کن.')
    const matches=positions.map((p,i)=>({p,i})).filter(({p})=>incoming.isin?p.isin===incoming.isin:!p.isin&&p.name.toLowerCase()===incoming.name.toLowerCase())
    if(matches.length>1)throw Error(`برای ${incoming.name} چند ردیف مشابه وجود دارد؛ ISIN را مشخص کن.`)
    if(matches.length){const {p,i}=matches[0];positions[i]={...p,...incoming,id:p.id,category:p.category,marketSymbol:p.marketSymbol,marketConfirmed:p.marketConfirmed}}
    else positions.push(incoming)
  }
  const dates=[...new Set(positions.map(p=>p.asOf))]
  return{...account,positions,snapshotDate:dates.length===1?dates[0]:null,complete:false}
}
