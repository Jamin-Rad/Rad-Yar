import { DEFAULT_RATE, normalizeState } from './aidData'
import { PRISONERS, neededToman } from './prisonerData'

const HISTORICAL_DATE = '2026-09-14'
const PREVIOUS_DEFAULT_RATE = 260000
const FATEMEH_ID = 'screenshot-recipient-fatemeh'
const MOBIN_ID = 'screenshot-recipient-mobin'
const DIRECT_TOMAN_IDS = new Set(['screenshot-toman-8', 'screenshot-toman-11', 'screenshot-toman-12'])
const recipientLabels = new Map([
  ['screenshot-recipient-torang', 'ترنج'],
  [FATEMEH_ID, 'فاطمه'],
  ['screenshot-recipient-mahmood', 'محمود'],
])

function migrateRecipientCorrections(state) {
  return normalizeState({
    ...state,
    recipients: state.recipients
      .filter(row => row.id !== MOBIN_ID)
      .map(row => ({ ...row, name: recipientLabels.get(row.id) || row.name })),
    donations: state.donations.map(row => {
      if (DIRECT_TOMAN_IDS.has(row.id)) return {
        ...row, channel: 'direct', recipientId: '',
        note: 'مسیر کمک: واریز مستقیم به حساب ستاد دیه.',
      }
      return row.recipientId === MOBIN_ID ? { ...row, recipientId: FATEMEH_ID } : row
    }),
    seedVersion: 8,
  })
}

function migrateDefaultRate(state) {
  return migrateRecipientCorrections(normalizeState({
    ...state,
    tomanPerEuro: DEFAULT_RATE,
    donations: state.donations.map(row => row.rateAtRecord === PREVIOUS_DEFAULT_RATE ? {
      ...row,
      rateAtRecord: DEFAULT_RATE,
      euroAmount: row.originalCurrency === 'toman' && row.tomanAmount > 0
        ? row.tomanAmount / DEFAULT_RATE : row.euroAmount,
    } : row),
    seedVersion: 7,
  }))
}

function dateExistingDonations(state) {
  return migrateDefaultRate(normalizeState({ ...state,
    donations: state.donations.map(row => ({ ...row, date: HISTORICAL_DATE })),
    seedVersion: 6,
  }))
}

// Amounts and donors transcribed from the user's 15 Sep 2026 screenshot.
// Rows with unclear payment evidence remain pending review.
const prisonerNotes = {
  7: 'فیش واریزی ناموجود؛ وضعیت پرداخت نیازمند بررسی است.',
  8: 'فیش واریزی ناموجود؛ مبلغ ۲۶٬۸۰۰٬۰۰۰ تومان در توضیحات تصویر آمده و وضعیت پرداخت نیازمند بررسی است.',
  11: 'نام «مهسا» در تصویر آمده؛ وضعیت مبلغ ۵۰٬۰۰۰٬۰۰۰ تومان نیازمند بررسی است.',
  12: 'نام «صبا نوروزی» در تصویر آمده؛ وضعیت مبلغ ۴۷٬۳۰۰٬۰۰۰ تومان نیازمند بررسی است.',
}

const euroRows = [
  [2, 'سامی', 230],
  [3, 'ترنج', 50], [3, 'نعیمه محمدی', 100],
  [4, 'سامی', 367],
  [13, 'نعیمه محمدی', 50], [13, 'آن ۲۱', 97], [13, 'سارا', 80],
  [13, 'samareh', 80], [13, 'FHZ', 30],
  [15, 'Niloofar', 100], [15, 'mahmood', 80],
  [20, 'زهرا فیاض', 100], [20, 'مرتضی', 30],
  [20, 'لیلا', 50, 'promised'], [20, 'ثریا', 30],
  [20, 'مهدیه ترکی', 50], [20, 'کمی', 30], [20, 'سیمین مرعشی', 20],
]

const recipientNames = [
  ['torang', 'ترنج'], ['fatemeh', 'فاطمه'], ['mahmood', 'محمود'],
]

function recipientFor(number, donor) {
  if ([2, 3, 4, 13].includes(number)) return 'Torang'
  if (number === 15) return 'Mahmood'
  if (number === 20 && ['زهرا فیاض', 'لیلا'].includes(donor)) return 'Fatemeh'
  if (number === 20 && ['مرتضی', 'ثریا'].includes(donor)) return 'Fatemeh'
  return 'Mahmood'
}

export const SCREENSHOT_RECIPIENTS = recipientNames.map(([slug, name]) => ({
  id: `screenshot-recipient-${slug}`,
  name, account: '', note: 'نام ستون واریز در تصویر پیوست؛ شمارهٔ حساب ثبت نشده است.',
}))

export const SCREENSHOT_PRISONERS = PRISONERS.map(prisoner => {
  const number = String(prisoner.id)
  return {
    id: `screenshot-prisoner-${number}`, number,
    name: prisoner.name,
    neededToman: neededToman(prisoner),
    note: prisonerNotes[prisoner.id] || '',
  }
})

export const SCREENSHOT_DONATIONS = [
  ...euroRows.map(([number, donor, euroAmount, status = 'recorded'], index) => ({
    id: `screenshot-euro-${index + 1}`,
    prisonerId: `screenshot-prisoner-${number}`,
    donor, euroAmount, rateAtRecord: DEFAULT_RATE,
    tomanAmount: 0, originalCurrency: 'eur',
    status, channel: 'recipient', recipientId: `screenshot-recipient-${recipientFor(number, donor).toLowerCase()}`, date: HISTORICAL_DATE,
    note: status === 'promised' ? 'در تصویر «واریز نشده» آمده است.' : '',
  })),
  {
    id: 'screenshot-direct-3', prisonerId: 'screenshot-prisoner-3',
    donor: '', euroAmount: 10000000 / DEFAULT_RATE,
    rateAtRecord: DEFAULT_RATE, tomanAmount: 10000000, originalCurrency: 'toman',
    status: 'recorded', channel: 'direct', recipientId: '', date: HISTORICAL_DATE,
    note: 'در تصویر «مستقیم» و ۱۰٬۰۰۰٬۰۰۰ تومان آمده؛ تأیید واریز ثبت نشده است.',
  },
  ...[
    [8, '', 26800000],
    [11, 'مهسا', 50000000],
    [12, 'صبا نوروزی', 47300000],
  ].map(([number, donor, tomanAmount]) => ({
    id: `screenshot-toman-${number}`,
    prisonerId: `screenshot-prisoner-${number}`, donor,
    euroAmount: tomanAmount / DEFAULT_RATE, rateAtRecord: DEFAULT_RATE,
    tomanAmount, originalCurrency: 'toman',
    status: 'recorded', channel: 'direct', recipientId: '', date: HISTORICAL_DATE,
    note: 'مسیر کمک: واریز مستقیم به حساب ستاد دیه.',
  })),
]

export function mergeScreenshotSeed(input) {
  const state = normalizeState(input)
  if (state.seedVersion >= 8) return state
  if (state.seedVersion === 7) return migrateRecipientCorrections(state)
  if (state.seedVersion === 6) return migrateDefaultRate(state)
  if (state.seedVersion === 5) return dateExistingDonations(state)
  if (state.seedVersion === 4) {
    const prisoners = state.prisoners.map(row => {
      const original = SCREENSHOT_PRISONERS.find(item => item.number === row.number && item.neededToman === row.neededToman)
      return original && (!row.name || row.name === `زندانی شماره ${row.number}`)
        ? { ...row, name: original.name } : row
    })
    return dateExistingDonations({ ...state, prisoners })
  }
  const prisoners = [...state.prisoners]
  const numberToId = new Map(prisoners.map(row => [row.number, row.id]))
  for (const row of SCREENSHOT_PRISONERS) {
    if (numberToId.has(row.number)) continue
    prisoners.push(row)
    numberToId.set(row.number, row.id)
  }
  for (let index = 0; index < prisoners.length; index++) {
    const row = prisoners[index]
    const original = SCREENSHOT_PRISONERS.find(item => item.number === row.number && item.neededToman === row.neededToman)
    if (original && (!row.name || row.name === `زندانی شماره ${row.number}`))
      prisoners[index] = { ...row, name: original.name }
  }

  const donations = [...state.donations]
  const recipients = [...state.recipients]
  const recipientNameToId = new Map(recipients.map(row => [row.name.toLowerCase(), row.id]))
  for (const row of SCREENSHOT_RECIPIENTS) {
    if (recipients.some(item => item.id === row.id) || recipientNameToId.has(row.name.toLowerCase())) continue
    recipients.push(row)
    recipientNameToId.set(row.name.toLowerCase(), row.id)
  }
  if (state.seedVersion === 1) {
    const seedById = new Map(SCREENSHOT_DONATIONS.map(row => [row.id, row]))
    for (let index = 0; index < donations.length; index++) {
      const row = donations[index]
      const original = seedById.get(row.id)
      if (!original || row.recipientId || !original.recipientId) continue
      const recipientName = original.recipientId.split('-').at(-1)
      donations[index] = { ...row, recipientId: recipientNameToId.get(recipientName) || original.recipientId }
    }
  }
  const existingIds = new Set(donations.map(row => row.id))
  for (const row of SCREENSHOT_DONATIONS) {
    if (existingIds.has(row.id)) continue
    const number = row.prisonerId.split('-').at(-1)
    const prisonerId = numberToId.get(number)
    if (!prisonerId) continue
    const duplicate = donations.some(item => item.prisonerId === prisonerId
      && item.donor === row.donor && Math.abs(item.euroAmount - row.euroAmount) < 0.01
      && item.channel === row.channel)
    if (!duplicate) {
      const recipientName = row.recipientId.split('-').at(-1)
      donations.push({ ...row, prisonerId,
        recipientId: recipientName ? recipientNameToId.get(recipientName) || row.recipientId : '' })
    }
  }
  return dateExistingDonations({ ...state, prisoners, recipients, donations })
}
