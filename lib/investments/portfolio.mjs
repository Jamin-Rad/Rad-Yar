export const CATEGORY_LABELS = { stock: 'سهام', metal: 'فلزات گران‌بها', fund: 'صندوق موضوعی', other: 'سایر' }
export const CATEGORY_COLORS = { stock: '#11816a', metal: '#dca52d', fund: '#6395d4', other: '#8995a7' }

const moneyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
export function money(cents) { return cents == null ? 'نامشخص' : moneyFormatter.format(cents / 100) }
export function signedMoney(cents) { return cents == null ? 'نامشخص' : `${cents > 0 ? '+' : ''}${money(cents)}` }
export function percent(value) { return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 }).format(value) + '٪' }
export function number(value) { return new Intl.NumberFormat('fa-IR').format(value) }

export function normalizeDigits(value) {
  return String(value).replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c)))
    .replace(/[٠-٩]/g, c => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/−/g, '-').trim()
}

// Monetary input uses decimal strings and integer cents. A single dot is a
// decimal separator; German 1.048,50 and Persian ۱٬۰۴۸٫۵۰ are also accepted.
export function parseMoney(value, optional = false) {
  let text = normalizeDigits(value).replace(/[€\s٬]/g, '').replace(/٫/g, '.')
  if (!text && optional) return null
  if (text.includes(',')) text = text.replace(/\./g, '').replace(',', '.')
  if (!/^-?\d+(?:\.\d{1,2})?$/.test(text)) throw new Error('مبلغ را با حداکثر دو رقم اعشار وارد کن؛ مانند 1048.50 یا 1.048,50.')
  const [whole, decimal = ''] = text.replace('-', '').split('.')
  const cents = (Number(whole) * 100 + Number(decimal.padEnd(2, '0'))) * (text.startsWith('-') ? -1 : 1)
  if (!Number.isSafeInteger(cents) || Math.abs(cents) > 1e12) throw new Error('مبلغ خارج از محدوده است.')
  return cents
}

export function summarize(positions) {
  const totalCents = positions.reduce((sum, p) => sum + p.valueCents, 0)
  const known = positions.filter(p => p.gainCents != null)
  const sorted = [...positions].sort((a, b) => b.valueCents - a.valueCents)
  const allocation = Object.entries(CATEGORY_LABELS).map(([key, label]) => {
    const valueCents = positions.filter(p => p.category === key).reduce((sum, p) => sum + p.valueCents, 0)
    return { key, label, valueCents, share: totalCents ? valueCents / totalCents * 100 : 0 }
  }).filter(group => group.valueCents > 0)
  return {
    totalCents, count: positions.length,
    knownGainCents: known.reduce((sum, p) => sum + p.gainCents, 0),
    unknownGainCount: positions.length - known.length,
    winners: known.filter(p => p.gainCents > 0).length,
    losers: known.filter(p => p.gainCents < 0).length,
    verified: positions.filter(p => p.verified).length,
    topFiveShare: totalCents ? sorted.slice(0, 5).reduce((sum, p) => sum + p.valueCents, 0) / totalCents * 100 : 0,
    largest: sorted[0] || null, allocation,
    needsReview: positions.filter(p => p.gainCents == null || (p.gainCents === p.valueCents && p.valueCents > 0) || p.name.includes('…')),
  }
}

function cleanText(value, max = 1000) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }
export function validateState(input) {
  if (!input || input.version !== 1 || !Array.isArray(input.positions) || input.positions.length > 500) throw new Error('ساختار فایل سبد معتبر نیست.')
  const ids = new Set()
  const positions = input.positions.map(p => {
    if (!p || typeof p.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(p.id) || ids.has(p.id)) throw new Error('شناسه دارایی تکراری یا نامعتبر است.')
    ids.add(p.id)
    const name = cleanText(p.name, 160)
    const quantity = normalizeDigits(p.quantity).replace(',', '.')
    if (!name || !/^\d{1,12}(?:\.\d{1,8})?$/.test(quantity) || Number(quantity) <= 0) throw new Error('نام و تعداد دارایی را بررسی کن.')
    if (!Number.isSafeInteger(p.valueCents) || p.valueCents < 0 || p.valueCents > 1e12) throw new Error('ارزش دارایی معتبر نیست.')
    if (p.gainCents !== null && (!Number.isSafeInteger(p.gainCents) || Math.abs(p.gainCents) > 1e12)) throw new Error('سود یا زیان معتبر نیست.')
    if (!Object.hasOwn(CATEGORY_LABELS, p.category)) throw new Error('گروه دارایی معتبر نیست.')
    return { id: p.id, name, quantity, valueCents: p.valueCents, gainCents: p.gainCents, category: p.category, note: cleanText(p.note), verified: p.verified === true, source: cleanText(p.source, 80) || 'manual' }
  })
  const snapshotDate = input.account?.snapshotDate || null
  if (snapshotDate && (!/^\d{4}-\d{2}-\d{2}$/.test(snapshotDate) || Number.isNaN(Date.parse(snapshotDate)) || new Date(snapshotDate).toISOString().slice(0, 10) !== snapshotDate)) throw new Error('تاریخ تصویر معتبر نیست.')
  const watchIds = new Set()
  const watchlist = (Array.isArray(input.watchlist) ? input.watchlist : []).slice(0, 100).map(w => {
    if (!w || typeof w.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(w.id) || watchIds.has(w.id)) throw new Error('شناسه دیده‌بان معتبر نیست.')
    watchIds.add(w.id)
    const name = cleanText(w.name, 160)
    if (!name) throw new Error('نام مورد دیده‌بان الزامی است.')
    return { id: w.id, name, thesis: cleanText(w.thesis), risk: cleanText(w.risk) }
  })
  return { version: 1, account: { owner: 'من', broker: 'Trade Republic', currency: 'EUR', complete: input.account?.complete === true, snapshotDate }, positions, watchlist }
}

export function portfolioReport(state) {
  const summary = summarize(state.positions)
  return `# گزارش خصوصی سرمایه — Trade Republic\n\nصاحب حساب: من\nارز مبنا: EUR\nتاریخ قیمت‌ها: ${state.account.snapshotDate || 'نامشخص؛ تاریخ ثبت فایل، تاریخ قیمت نیست'}\nپوشش: ${state.account.complete ? 'کاربر کامل بودن را تأیید کرده است' : 'ناقص؛ فقط دارایی‌های ثبت‌شده'}\nمنبع اولیه: سه اسکرین‌شات کاربر؛ اصلاحات دستی در ردیف‌ها مشخص است.\n\nارزش دارایی‌های ثبت‌شده: ${money(summary.totalCents)}\nتعداد: ${summary.count}\nجمع سود/زیانِ قابل خواندن: ${signedMoney(summary.knownGainCents)} (از ${summary.count - summary.unknownGainCount} ردیف؛ ${summary.unknownGainCount} ردیف نامشخص)\nاین جمع، سود خالص حساب یا بازده تاریخی نیست؛ دوره سود/زیان در تصاویر مشخص نشده است.\nتعداد ردیف‌های تأییدشده توسط کاربر: ${summary.verified}\nسهم پنج دارایی بزرگ: ${percent(summary.topFiveShare)}\n\n## دارایی‌ها\n${state.positions.map(p => `- ${p.name}: تعداد ${p.quantity}، ارزش ${money(p.valueCents)}، سود/زیان نمایش‌داده‌شده ${signedMoney(p.gainCents)}، گروه ${CATEGORY_LABELS[p.category]}، منبع ${p.source}، ${p.verified ? 'تأییدشده توسط کاربر' : 'نیازمند تأیید'}${p.note ? `؛ یادداشت: ${p.note}` : ''}`).join('\n')}\n\n## دیده‌بان شخصی\n${state.watchlist.length ? state.watchlist.map(w => `- ${w.name}: فرضیه: ${w.thesis || 'ثبت نشده'}؛ ریسک/شرط ابطال: ${w.risk || 'ثبت نشده'}`).join('\n') : 'موردی ثبت نشده است.'}\n\n## درخواست تحلیل از ChatGPT\nابتدا محدودیت داده‌ها را توضیح بده. بر اساس همین داده‌ها ترکیب و تمرکز سبد و اولویت بررسی را تحلیل کن. برای قیمت روز، اخبار و فرصت‌های جدید از منابع معتبر با تاریخ و لینک استفاده کن؛ داده قدیمی را قیمت روز فرض نکن. برای اسامی کوتاه یا مبهم، ISIN بخواه. از تفاضل ارزش و سود، بهای خرید قطعی یا بازده سالانه استنتاج نکن. ردیف‌های سود برابر ارزش را از نظر انتقال و تخصیص مبنای خرید بررسی کن، بدون فرض قطعی رویداد شرکتی. جریان نقد، وجه نقد، مالیات، کارمزد، سود نقدی و معاملات بسته‌شده در این فایل کامل نیستند. قبل از پیشنهاد متناسب با شخص، افق زمانی، هدف، نیاز نقدینگی و تحمل زیان را بپرس. پیشنهادها را سناریویی و همراه ریسک بنویس.\n`
}
