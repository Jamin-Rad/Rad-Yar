import { isUserCacheActive, persistCurrentUserCache } from './progressCache.js'

const keyFor = userId => `radyar_read_state_v2_${userId}`
const logPrefix = userId => `radyar_read_change_v2:${encodeURIComponent(userId)}:`
const epoch = '1970-01-01T00:00:00.000Z'
export const readVersion = record => `${record?.changedAt || epoch}|${record?.changeId || ''}`

function json(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback }
}

export function loadReadState(userId) {
  const saved = json(keyFor(userId), null)
  if (saved) return withLocalChanges(userId, saved)
  // Only migrate caches with a known account owner. Never infer an owner for
  // unclaimed browser history or refresh a legacy timestamp to "now".
  const articles = json(isUserCacheActive(userId) ? 'radyar_read_articles' : `radyar_read_articles_${userId}`, {})
  const history = json(isUserCacheActive(userId) ? 'radyar_learning_history' : `radyar_learning_history_${userId}`, [])
  const dates = new Map(history.map(item => [item.topicId, item.learnedAt]))
  const records = Object.fromEntries(Object.entries(articles).map(([id, read]) => {
    const date = dates.get(id)
    const changedAt = Number.isFinite(Date.parse(date)) ? new Date(date).toISOString() : epoch
    return [id, { read: Number(read) >= 1, changedAt, changeId: '', learnedAt: Number(read) >= 1 ? changedAt : null, legacy: true }]
  }))
  return withLocalChanges(userId, { records, reset: null })
}

function withLocalChanges(userId, state) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith(logPrefix(userId))) continue
    const change = json(key, null)
    if (!change) continue
    if (change.reset) {
      if (readVersion(change.reset) > readVersion(state.reset)) state.reset = change.reset
    } else if (!state.records[change.topicId] || readVersion(change.record) > readVersion(state.records[change.topicId])) state.records[change.topicId] = change.record
  }
  return state
}

export function projectReadState(state) {
  const articles = {}, history = []
  for (const [topicId, record] of Object.entries(state.records)) {
    if (state.reset && readVersion(record) <= readVersion(state.reset)) continue
    if (record.read) {
      articles[topicId] = 1
      history.push({ topicId, learnedAt: record.learnedAt || record.changedAt })
    }
  }
  history.sort((a, b) => Date.parse(b.learnedAt) - Date.parse(a.learnedAt))
  return { articles, history }
}

export function saveReadState(userId, state) {
  localStorage.setItem(keyFor(userId), JSON.stringify(state))
  const progress = projectReadState(state)
  if (isUserCacheActive(userId)) {
    localStorage.setItem('radyar_read_articles', JSON.stringify(progress.articles))
    localStorage.setItem('radyar_learning_history', JSON.stringify(progress.history))
    persistCurrentUserCache(userId)
    window.dispatchEvent(new CustomEvent('radyar:read-updated', { detail: { userId, ...progress, reset: state.reset } }))
  }
  return progress
}

export function readServerState(data) {
  if (data.records) return { records: data.records, reset: data.reset || null }
  // Compatibility with an older server during a rolling deployment.
  const history = new Map((data.history || []).map(item => [item.topicId, item.learnedAt]))
  return { records: Object.fromEntries(Object.entries(data.read || {}).map(([id, read]) => [id, {
    read, changedAt: history.get(id) || epoch, changeId: '', learnedAt: history.get(id) || null,
  }])), reset: null }
}

export function mergeReadState(userId, data) {
  const local = loadReadState(userId), server = readServerState(data)
  const reset = readVersion(server.reset) >= readVersion(local.reset) ? server.reset : local.reset
  const records = { ...local.records }
  for (const [id, record] of Object.entries(server.records)) {
    if (!records[id] || records[id].legacy || readVersion(record) >= readVersion(records[id])) records[id] = record
  }
  const state = { records, reset }
  saveReadState(userId, state)
  return { state, server, ...projectReadState(state) }
}

function newVersion(state) {
  const latest = Object.values(state.records).reduce((max, record) => Math.max(max, Date.parse(record.changedAt) || 0), Date.parse(state.reset?.changedAt) || 0)
  return { changedAt: new Date(Math.max(Date.now(), latest + 1)).toISOString(), changeId: crypto.randomUUID() }
}

export function changeReadStatus(userId, topicId, read) {
  const state = loadReadState(userId)
  const record = { ...newVersion(state), read, learnedAt: null }
  if (read) record.learnedAt = record.changedAt
  state.records[topicId] = record
  localStorage.setItem(`${logPrefix(userId)}${record.changeId}`, JSON.stringify({ topicId, record }))
  saveReadState(userId, state)
  return { themaId: topicId, ...record }
}

export function resetReadProgress(userId) {
  const state = loadReadState(userId)
  state.reset = newVersion(state)
  localStorage.setItem(`${logPrefix(userId)}${state.reset.changeId}`, JSON.stringify({ reset: state.reset }))
  saveReadState(userId, state)
  return { reset: state.reset }
}
