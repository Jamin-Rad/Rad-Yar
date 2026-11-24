import { priceValueDigits } from '@/lib/investments/xtb-chart.mjs'

const formats = new Map()
export function chartPrice(value, signed = false, scale = value) {
  if (!Number.isFinite(value)) return '—'
  const digits = scale !== 0 && Math.abs(scale) < 10 ? Math.max(4, priceValueDigits(scale)) : 2
  const key = digits + ':' + signed
  if (!formats.has(key)) formats.set(key, new Intl.NumberFormat('en-US', {
    minimumFractionDigits:2, maximumFractionDigits:digits, signDisplay:signed ? 'exceptZero' : 'auto',
  }))
  return formats.get(key).format(value)
}

const day = new Intl.DateTimeFormat('de-DE', {timeZone:'Europe/Berlin', day:'2-digit', month:'2-digit', year:'numeric'})
const minute = new Intl.DateTimeFormat('de-DE', {timeZone:'Europe/Berlin', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'})
const exact = new Intl.DateTimeFormat('de-DE', {timeZone:'Europe/Berlin', day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'})
export function berlinTime(value, withYear = false) {
  if (!value) return '—'
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return '—'
  return (value.includes('T') ? withYear ? exact : minute : day).format(date)
}

export const frameLabels = {5:'5m', 15:'15m', 30:'30m', 60:'1h', 240:'4h', '1d':'1D', '1w':'1W', '1mo':'1M'}
export const signedFormat = new Intl.NumberFormat('en-US', {signDisplay:'exceptZero', minimumFractionDigits:2, maximumFractionDigits:2})
