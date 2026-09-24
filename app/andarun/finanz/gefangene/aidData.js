export const STORAGE_KEY = 'andarun_prisoner_aid_v1'
export const DEFAULT_RATE = 260000

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

function positive(value) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : 0
}

export function normalizeState(input) {
  const source = input && typeof input === 'object' ? input : {}
  const rate = positive(source.tomanPerEuro) || DEFAULT_RATE
  return {
    tomanPerEuro: rate,
    seedVersion: Number.isInteger(source.seedVersion) ? source.seedVersion : 0,
    prisoners: Array.isArray(source.prisoners) ? source.prisoners.slice(0, 1000).map(row => ({
      id: text(row.id, 100), number: text(row.number, 100), name: text(row.name, 160),
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
      recipientId: text(row.recipientId, 100), date: /^\d{4}-\d{2}-\d{2}$/.test(row.date || '') ? row.date : '',
      note: text(row.note, 1000),
    })).filter(row => row.id && row.prisonerId && row.euroAmount) : [],
  }
}

export function totalsFor(prisonerId, donations) {
  return donations.reduce((total, donation) => {
    if (donation.prisonerId !== prisonerId) return total
    const toman = donation.originalCurrency === 'toman' && donation.tomanAmount > 0
      ? donation.tomanAmount : donation.euroAmount * donation.rateAtRecord
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

export function formatToman(value) {
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(value || 0))} تومان`
}

export function formatEuro(value) {
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(value || 0)} €`
}
