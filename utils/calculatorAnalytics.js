'use client'

import { readPrivacyChoice } from '@/components/LegalNotice'

const VISITOR_KEY = 'radyar_visitor_id'
const SESSION_KEY = 'radyar_analytics_session'
const SOURCE_KEY = 'radyar_analytics_source'

function randomId(prefix) {
  return `${prefix}_${crypto.randomUUID().replaceAll('-', '')}`
}

export function getAnalyticsVisitorId() {
  let value = localStorage.getItem(VISITOR_KEY)
  if (!value) {
    value = randomId('rv')
    localStorage.setItem(VISITOR_KEY, value)
  }
  return value
}

export function getAnalyticsSessionId() {
  let value = sessionStorage.getItem(SESSION_KEY)
  if (!value || value === '1') {
    value = randomId('rs')
    sessionStorage.setItem(SESSION_KEY, value)
  }
  return value
}

export function getAnalyticsSource() {
  const saved = sessionStorage.getItem(SOURCE_KEY)
  if (saved) return saved

  const params = new URLSearchParams(window.location.search)
  const campaign = params.get('utm_source') || params.get('ref')
  let source = campaign ? campaign.toLowerCase() : 'direct'
  if (!campaign && document.referrer) {
    try {
      const referringUrl = new URL(document.referrer)
      source = referringUrl.origin === window.location.origin ? 'internal' : referringUrl.hostname.replace(/^www\./, '').toLowerCase()
    } catch {}
  }
  source = source.replace(/[^a-z0-9.-]/g, '').slice(0, 80) || 'direct'
  sessionStorage.setItem(SOURCE_KEY, source)
  return source
}

export function trackCalculatorEvent(tool, event) {
  if (readPrivacyChoice()?.analytics !== true) return false
  fetch('/api/analytics/calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: getAnalyticsVisitorId(),
      sessionId: getAnalyticsSessionId(),
      source: getAnalyticsSource(),
      tool,
      event,
    }),
    keepalive: true,
  }).catch(() => {})
  return true
}
