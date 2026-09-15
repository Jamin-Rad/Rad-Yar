export const STORAGE_KEY = 'andarun_prisoner_aid_v1'
export const DEFAULT_RATE = 254000

export const EMPTY_STATE = {
  tomanPerEuro: DEFAULT_RATE,
  prisoners: [],
  recipients: [],
  donations: [],
  seedVersion: 0,
}

const statuses = new Set(['promised', 'recorded', 'confirmed'])
const channels = new Set(['recipient', 'direct'])

function text(value, max = 250) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export function westernDigits(value) {
  return String(value ?? '').replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x0660))
}

export function parseLocalizedNumber(value) {
  const normalized = westernDigits(value).trim()
    .replace(/[\s٬،,]/g, '').replace(/٫/g, '.')
  return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized) ? Number(normalized) : NaN
}

function positive(value) {
  const number = parseLocalizedNumber(value)
  return Number.isFinite(number) && number > 0 ? number : 0
}

export function normalizeState(input) {
  const source = input && typeof input === 'object' ? input : {}
  const rate = positive(source.tomanPerEuro) || DEFAULT_RATE
  return {
    tomanPerEuro: rate,
    seedVersion: Number.isInteger(source.seedVersion) ? source.seedVersion : 0,
    prisoners: Array.isArray(source.prisoners) ? source.prisoners.slice(0, 1000).map(row => ({
      id: text(row.id, 100), number: westernDigits(text(row.number, 100)), name: text(row.name, 160),
      neededToman: positive(row.neededToman), note: text(row.note, 1000),
    })).filter(row => row.id && row.number) : [],
    recipients: Array.isArray(source.recipients) ? source.recipients.slice(0, 1000).map(row => ({
      id: text(row.id, 100), name: text(row.name, 160), account: text(row.account, 250),
      note: text(row.note, 1000),
    })).filter(row => row.id && row.name) : [],
    donations: Array.isArray(source.donations) ? source.donations.slice(0, 5000).map(row => ({
      id: text(row.id, 100), prisonerId: text(row.prisonerId, 100), donor: text(row.donor, 160),
      euroAmount: positive(row.euroAmount), rateAtRecord: positive(row.rateAtRecord) || rate,
      tomanAmount: positive(row.tomanAmount), originalCurrency: row.originalCurrency === 'toman' ? 'toman' : 'eur',
      status: statuses.has(row.status) ? row.status : 'recorded',
      channel: channels.has(row.channel) ? row.channel : 'recipient',
      settledToSetad: row.settledToSetad === true,
      recipientId: text(row.recipientId, 100), date: /^\d{4}-\d{2}-\d{2}$/.test(row.date || '') ? row.date : '',
      note: text(row.note, 1000),
    })).filter(row => row.id && row.prisonerId && row.euroAmount) : [],
  }
}

export function totalsFor(prisonerId, donations) {
  return donations.reduce((total, donation) => {
    if (donation.prisonerId !== prisonerId) return total
    const toman = donationToman(donation)
    if (donation.status === 'confirmed') {
      total.confirmedEuro += donation.euroAmount
      total.confirmedToman += toman
    } else if (donation.status === 'recorded') {
      total.recordedEuro += donation.euroAmount
      total.recordedToman += toman
    } else {
      total.promisedEuro += donation.euroAmount
      total.promisedToman += toman
    }
    return total
  }, { confirmedEuro: 0, confirmedToman: 0, recordedEuro: 0, recordedToman: 0, promisedEuro: 0, promisedToman: 0 })
}

export function donationToman(donation) {
  return donation.originalCurrency === 'toman' && donation.tomanAmount > 0
    ? donation.tomanAmount : donation.euroAmount * donation.rateAtRecord
}

export function recipientLedger(recipientId, donations, prisoners) {
  const cases = new Map()
  const prisonerById = new Map(prisoners.map(row => [row.id, row]))
  const result = { euro: 0, confirmedEuro: 0, toman: 0, owedToman: 0, donations: [], cases: [] }
  for (const donation of donations) {
    if (donation.channel !== 'recipient' || donation.recipientId !== recipientId) continue
    result.donations.push(donation)
    if (donation.status === 'promised') continue
    const toman = donationToman(donation)
    const owed = donation.settledToSetad ? 0 : toman
    result.euro += donation.euroAmount
    result.confirmedEuro += donation.status === 'confirmed' ? donation.euroAmount : 0
    result.toman += toman
    result.owedToman += owed
    const prisoner = prisonerById.get(donation.prisonerId)
    const previous = cases.get(donation.prisonerId) || {
      prisonerId: donation.prisonerId, number: prisoner?.number || '—', name: prisoner?.name || '—',
      euro: 0, toman: 0, owedToman: 0,
    }
    previous.euro += donation.euroAmount
    previous.toman += toman
    previous.owedToman += owed
    cases.set(donation.prisonerId, previous)
  }
  result.cases = [...cases.values()].sort((a, b) => Number(a.number) - Number(b.number))
  return result
}

export function donorSummary(donations) {
  const byName = new Map()
  for (const donation of donations) {
    const name = donation.donor?.trim() || ''
    const key = name.normalize('NFKC').replace(/ي/g, 'ی').replace(/ك/g, 'ک').toLocaleLowerCase('fa')
    const row = byName.get(key) || {
      key, name: name || 'نام کمک‌کننده ثبت نشده', donationCount: 0,
      registeredEuro: 0, registeredToman: 0, confirmedEuro: 0, confirmedToman: 0,
      promisedEuro: 0, promisedToman: 0, prisonerIds: new Set(),
    }
    const toman = donationToman(donation)
    if (donation.status === 'promised') {
      row.promisedEuro += donation.euroAmount
      row.promisedToman += toman
    } else {
      row.donationCount++
      row.registeredEuro += donation.euroAmount
      row.registeredToman += toman
      row.prisonerIds.add(donation.prisonerId)
      if (donation.status === 'confirmed') {
        row.confirmedEuro += donation.euroAmount
        row.confirmedToman += toman
      }
    }
    byName.set(key, row)
  }
  const collator = new Intl.Collator('fa', { sensitivity: 'base' })
  return [...byName.values()].map(({ prisonerIds, ...row }) => ({ ...row, prisonerCount: prisonerIds.size }))
    .sort((a, b) => !a.key ? 1 : !b.key ? -1 : collator.compare(a.name, b.name))
}

export function formatToman(value) {
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(value || 0))} تومان`
}

export function formatEuro(value) {
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(value || 0)} €`
}
