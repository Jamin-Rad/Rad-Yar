export const DIGITDA_STORAGE_KEY = 'digitda_finance_v1'

export const SHAREHOLDERS = [
  { name: 'فاطمه', share: 45, color: '#2458ed' },
  { name: 'فهیمه', share: 45, color: '#86bd00' },
  { name: 'فرشته', share: 10, color: '#ff775f' },
]

export const INITIAL_FINANCE_STATE = {
  foundedAt: '2024-01-01',
  tomanPerEuro: 105000,
  services: [
    { id: 'crown', name: 'طراحی Crown', unit: 'پروژه', price: 1200 },
    { id: 'full-arc', name: 'طراحی Full Arc', unit: 'پروژه', price: 2200 },
    { id: 'brand', name: 'هویت بصری', unit: 'پروژه', price: 1500 },
    { id: 'social', name: 'پکیج شبکه‌های اجتماعی', unit: 'ماه', price: 600 },
    { id: 'web', name: 'طراحی وب‌سایت', unit: 'پروژه', price: 2800 },
    { id: 'motion', name: 'موشن دیزاین', unit: 'پروژه', price: 950 },
  ],
  entries: [
    { id: 'i01', type: 'income', date: '2024-02-12', serviceId: 'crown', quantity: 2, unitPrice: 1100, note: 'مجموعه افتتاحیه', account: 'germany' },
    { id: 'e01', type: 'expense', date: '2024-02-18', location: 'germany', currency: 'eur', amount: 690, category: 'نرم‌افزار و اشتراک‌ها', note: 'ابزارهای طراحی', account: 'germany', settled: true },
    { id: 'i02', type: 'income', date: '2024-05-09', serviceId: 'full-arc', quantity: 2, unitPrice: 2200, note: 'کمپین Arc', account: 'germany' },
    { id: 'e02', type: 'expense', date: '2024-05-20', location: 'iran', currency: 'toman', amount: 42000000, category: 'فریلنسر', note: 'تیم تصویرسازی', account: 'iran', settled: true, exchangeRateAtSettlement: 68000, euroAmountAtSettlement: 617.65, rateSource: 'manual' },
    { id: 'i03', type: 'income', date: '2024-09-14', serviceId: 'brand', quantity: 4, unitPrice: 1450, note: 'اسپرینت برند', account: 'germany' },
    { id: 'e03', type: 'expense', date: '2024-10-01', location: 'germany', currency: 'eur', amount: 1280, category: 'بازاریابی', note: 'شروع استودیو', account: 'germany', settled: true },
    { id: 'i04', type: 'income', date: '2025-01-18', serviceId: 'web', quantity: 2, unitPrice: 3100, note: 'تجربه وب', account: 'germany' },
    { id: 'e04', type: 'expense', date: '2025-02-01', location: 'iran', currency: 'toman', amount: 183000000, category: 'حقوق', note: 'تیم ایران · فصل اول', account: 'iran', settled: true, exchangeRateAtSettlement: 92000, euroAmountAtSettlement: 1989.13, rateSource: 'manual' },
    { id: 'i05', type: 'income', date: '2025-04-12', serviceId: 'social', quantity: 8, unitPrice: 600, note: 'قرارداد محتوا', account: 'germany' },
    { id: 'e05', type: 'expense', date: '2025-04-23', location: 'germany', currency: 'eur', amount: 2190, category: 'سخت‌افزار', note: 'سیستم‌های کاری', account: 'germany', settled: true },
    { id: 'i06', type: 'income', date: '2025-08-08', serviceId: 'crown', quantity: 6, unitPrice: 1250, note: 'مجموعه Crown', account: 'germany' },
    { id: 'e06', type: 'expense', date: '2025-09-01', location: 'iran', currency: 'toman', amount: 201000000, category: 'حقوق', note: 'تیم ایران · فصل سوم', account: 'iran', settled: true, exchangeRateAtSettlement: 108000, euroAmountAtSettlement: 1861.11, rateSource: 'manual' },
    { id: 'i07', type: 'income', date: '2025-12-05', serviceId: 'full-arc', quantity: 5, unitPrice: 2350, note: 'مجموعه پایان سال', account: 'germany' },
    { id: 'e07', type: 'expense', date: '2025-12-12', location: 'germany', currency: 'eur', amount: 1480, category: 'مشاوره مالیاتی', note: 'بستن حساب‌های سال', account: 'germany', settled: true },
    { id: 'i08', type: 'income', date: '2026-02-15', serviceId: 'brand', quantity: 5, unitPrice: 1600, note: 'سیستم هویت بصری', account: 'germany' },
    { id: 'e08', type: 'expense', date: '2026-02-28', location: 'iran', currency: 'toman', amount: 225000000, category: 'حقوق', note: 'تیم ایران · فصل اول', account: 'iran', settled: true, exchangeRateAtSettlement: 132000, euroAmountAtSettlement: 1704.55, rateSource: 'manual' },
    { id: 'i09', type: 'income', date: '2026-05-11', serviceId: 'web', quantity: 3, unitPrice: 2950, note: 'وب‌سایت پرچمدار', account: 'germany' },
    { id: 'e09', type: 'expense', date: '2026-05-16', location: 'germany', currency: 'eur', amount: 890, category: 'نرم‌افزار و اشتراک‌ها', note: 'فضای ابری و Adobe', account: 'germany', settled: true },
    { id: 'i10', type: 'income', date: '2026-08-04', serviceId: 'crown', quantity: 4, unitPrice: 1300, note: 'طراحی Crown مرداد', account: 'germany' },
    { id: 'e10', type: 'expense', date: '2026-08-06', location: 'iran', currency: 'toman', amount: 95000000, category: 'فریلنسر', note: 'طراح سه‌بعدی', account: 'iran', settled: false },
  ],
}

const SERVICE_NAME_MIGRATION = {
  'Crown Design': 'طراحی Crown',
  'Full Arc Design': 'طراحی Full Arc',
  'Brand Identity': 'هویت بصری',
  'Social Media Paket': 'پکیج شبکه‌های اجتماعی',
  Webdesign: 'طراحی وب‌سایت',
  'Motion Design': 'موشن دیزاین',
}

export function normalizeFinanceState(value) {
  const input = value && typeof value === 'object' ? value : INITIAL_FINANCE_STATE
  const fallbackRate = Number(input.tomanPerEuro || INITIAL_FINANCE_STATE.tomanPerEuro)
  const services = Array.isArray(input.services) && input.services.length
    ? input.services.map(service => ({ ...service, name: SERVICE_NAME_MIGRATION[service.name] || service.name, unit: service.unit === 'Monat' ? 'ماه' : service.unit === 'Projekt' ? 'پروژه' : service.unit }))
    : INITIAL_FINANCE_STATE.services
  const entries = Array.isArray(input.entries) ? input.entries.map(entry => {
    if (entry.type === 'income') return { ...entry, account: entry.account || 'germany' }
    if (entry.currency !== 'toman') return { ...entry, account: entry.account || 'germany', settled: entry.settled ?? true }
    const settled = entry.settled ?? true
    if (!settled) {
      return {
        ...entry,
        account: entry.account || 'iran',
        settled: false,
        exchangeRateAtSettlement: null,
        euroAmountAtSettlement: null,
        rateSource: null,
        rateUpdatedAt: null,
      }
    }
    const rate = Number(entry.exchangeRateAtSettlement || fallbackRate)
    return {
      ...entry,
      account: entry.account || 'iran',
      settled: true,
      exchangeRateAtSettlement: rate,
      euroAmountAtSettlement: Number(entry.euroAmountAtSettlement || (Number(entry.amount || 0) / Math.max(rate, 1))),
      rateSource: entry.rateSource || 'migration',
    }
  }) : INITIAL_FINANCE_STATE.entries
  return { ...INITIAL_FINANCE_STATE, ...input, tomanPerEuro: fallbackRate, services, entries }
}

export function makeFinanceId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function serviceFor(services, id) {
  return services.find(service => service.id === id)
}

export function entryEuroValue(entry, fallbackRate) {
  if (entry.type === 'income') return Number(entry.quantity || 0) * Number(entry.unitPrice || 0)
  if (entry.currency !== 'toman') return Number(entry.amount || 0)
  const lockedEuro = Number(entry.euroAmountAtSettlement)
  if (lockedEuro > 0) return lockedEuro
  const lockedRate = Number(entry.exchangeRateAtSettlement || fallbackRate || 1)
  return Number(entry.amount || 0) / Math.max(lockedRate, 1)
}

export function formatEuro(value, digits = 0) {
  return new Intl.NumberFormat('fa-IR', { style: 'currency', currency: 'EUR', maximumFractionDigits: digits }).format(Number(value || 0))
}

export function formatToman(value) {
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Number(value || 0))} تومان`
}

export function formatPersianDate(value) {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))
}
