import {familyReport,DECISION_ACTIONS} from './family.mjs'
import {money,signedMoney} from './portfolio.mjs'
import {marketImpact,marketForPosition,marketTrusted} from './market.mjs'
export const REVIEW_MODES={weekly:'مرور هفتگی',asset:'بررسی دارایی',decision:'بازبینی تصمیم'}
export function reviewReport(state,options={},markets={},mode='weekly'){
 const {accountIds=[],positionIds=[],decisionIds=[]}=options
 const owners=state.accounts.filter(a=>accountIds.includes(a.id))
 const base=familyReport(state,options)
 const tradingChats=options.includeTrades?state.trades.filter(t=>options.tradeIds?.includes(t.id)).map(t=>`${t.plan.name}:\n${t.reviews.slice(-6).filter(r=>r.chatResponse).map(r=>`${r.date}: ${r.chatResponse}`).join('\n')}`).join('\n\n'):''
 const history=owners.flatMap(a=>a.snapshots.slice().sort((x,y)=>y.asOf.localeCompare(x.asOf)).slice(0,6).flatMap(s=>s.positions.filter(p=>positionIds.includes(`${a.id}:${p.id}`)).map(p=>`- ${a.owner} / ${p.name} / ${s.asOf}: تعداد ${p.quantity}؛ ارزش ثبت‌شده ${money(p.valueCents)}؛ سود/زیان منبع ${signedMoney(p.gainCents)}`))).join('\n')
 const marketRows=owners.flatMap(a=>a.positions.filter(p=>positionIds.includes(`${a.id}:${p.id}`)).map(p=>{
  const m=marketForPosition(p,markets)
  if(!marketTrusted(p,m))return `### ${a.owner} / ${p.name}\nنماد بازار تطبیق‌شده یا داده دریافت‌شده ندارد؛ قیمت روز استنتاج نکن.`
  const week=marketImpact(p,m)
  return `### ${a.owner} / ${p.name}\nنماد: ${m.quote.symbol}؛ بورس ${m.quote.exchange}؛ قیمت مرجع هر واحد ${m.quote.price} ${m.quote.currency}؛ زمان ${m.quote.asOf}؛ منبع ${m.quote.sourceUrl}\nاثر برآوردی هفتگی با تعداد فعلی: ${signedMoney(week?.deltaCents)}؛ این مبلغ بازده واقعی حساب نیست. مبنای قبل ${week?.previous||'نامشخص'}؛ نرخ تبدیل یورو مربوط به ${week?.fxDate||'نامشخص'} از ${m.fx?.latest?.source||'منبع نرخ ثبت‌شده'}.\nخبرهای گردآوری‌شده، بدون تأیید اثرگذاری:\n${m.news.slice(0,3).map(n=>`- ${n.date} | ${n.publisher} | ${n.title} | ${n.url}`).join('\n')||'خبر دریافت نشده است.'}`
 })).join('\n\n')
 const decisions=state.decisions.filter(d=>decisionIds.includes(d.id)).map(d=>`### ${d.name} — حساب ${state.accounts.find(a=>a.id===d.accountId)?.owner}\nتصمیم: ${DECISION_ACTIONS[d.action]}؛ تاریخ ${d.planDate}؛ زمان ثبت ${d.createdAt}\nدلیل اولیه: ${d.rationale}\nشرط تغییر نظر: ${d.invalidation}\nمبنای ثبت: ${money(d.baselineValueCents)} در ${d.baselineDate||'تاریخ نامشخص'}؛ تعداد ${d.baselineQuantity||'نامشخص'}\nبازبینی‌ها (آخرین ۶ مورد):\n${d.reviews.slice(-6).map(r=>`${r.date}: فرض معتبر؟ ${r.thesisValid}؛ پایبندی؟ ${r.followedPlan}؛ ${r.note}\nنتیجه واقعی ${signedMoney(r.actualOutcomeCents)}؛ سناریوی بدون تغییر ${signedMoney(r.noActionOutcomeCents)}؛ مبنای مقایسه ${r.evidence||'ثبت نشده'}\nپاسخ قبلی ChatGPT: ${r.chatResponse||'ثبت نشده'}`).join('\n')||'بازبینی ثبت نشده است.'}`).join('\n\n')
 return `# نوع بررسی: ${REVIEW_MODES[mode]||REVIEW_MODES.weekly}\n\n${base}\n\n## ثبت‌های تاریخی انتخاب‌شده (آخرین ۶ ثبت هر حساب)\n${history||'در محدوده انتخاب‌شده سابقه تاریخ‌دار ثبت نشده است.'}\n\n## داده بازار و منابع انتخاب‌شده\n${marketRows||'دارایی‌ای برای اطلاعات بازار انتخاب نشده است.'}\n\n## تصمیم‌های انتخاب‌شده سرمایه‌گذاری\n${decisions||'تصمیمی انتخاب نشده است.'}\n\n## پاسخ‌های قبلی انتخاب‌شده XTB\n${tradingChats||'ثبت نشده است.'}\n\n## روش پاسخ\nواقعیت منبع‌دار، برداشت تحلیلی و اطلاعات ناموجود را جدا مشخص کن. تاریخ و تازگی هر منبع را بررسی کن. اولویت بررسی را با دلیل، اثر احتمالی بر سبد و شواهد مخالف بنویس. پاسخ قبلی ChatGPT یک منبع مستقل خبری نیست. برای ارزیابی تصمیم، کیفیت استدلال و نتیجه مالی را جدا بسنج و سناریوی بدون تغییر را فقط با دوره، جریان پول و هزینه‌های قابل مقایسه ارزیابی کن. در پایان، سؤال‌های باز و موارد لازم برای بازبینی بعدی را فهرست کن.\n`
}
