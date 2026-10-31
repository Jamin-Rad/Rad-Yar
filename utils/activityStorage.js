import { activityDay, maxActivityDay, aggregateActivity } from './learningActivity.js'
import { isUserCacheActive, getUserCacheToken, isUserCacheCurrent } from './progressCache.js'

const IDLE_MS = 60000
const sourceIds = new Map()
const inFlight = new Map()
const keyFor = id => `radyar_activity_${id || 'anon'}`
const snapshotKey = id => `radyar_activity_snapshot_v2_${id}`
const prefix = id => `radyar_activity_stream_${id}_`
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
function json(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback } }
function notify(userId) { window.dispatchEvent(new CustomEvent('radyar:activity-updated', { detail: { userId } })) }
function sourceFor(userId) {
  // Every page instance gets a distinct stream, including duplicated tabs.
  // Keep streams durable: another tab may still be adding to its own stream.
  if (!sourceIds.has(userId)) sourceIds.set(userId, crypto.randomUUID())
  return sourceIds.get(userId)
}
function streams(userId) {
  const result = []
  for (let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith(prefix(userId))) continue
    const stream = json(key, null)
    if (stream) for (const [day, value] of Object.entries(stream.days)) result.push({ sourceId: stream.sourceId, day, ...activityDay(value) })
  }
  return result
}
function legacyDays(userId, snapshot) {
  const local = json(keyFor(userId), { days: {} }).days || {}
  const days = { ...(snapshot.legacyDays || {}) }
  for (const [day, value] of Object.entries(local)) days[day] = maxActivityDay(days[day], value)
  return days
}
export function loadActivity(userId) {
  if (typeof window === 'undefined') return { days: {} }
  const snapshot = json(snapshotKey(userId), { sources: [], legacyDays: {} })
  return { days: aggregateActivity(legacyDays(userId,snapshot), [...(snapshot.sources || []), ...streams(userId)]) }
}
function changeSource(userId, date, update) {
  if (typeof window === 'undefined' || !userId) return
  const sourceId = sourceFor(userId), key = `${prefix(userId)}${sourceId}`
  const stream = json(key, { sourceId, days: {} })
  const dayKey = dateKey(date), day = { ...activityDay(stream.days[dayKey]), fractionalSeconds: { ...(stream.days[dayKey]?.fractionalSeconds || {}) } }
  update(day)
  stream.days[dayKey] = day
  localStorage.setItem(key, JSON.stringify(stream))
  notify(userId)
}
export function addActiveSeconds(userId, seconds, category = 'other', at = new Date()) {
  const amount = Math.max(0, Number(seconds) || 0)
  if (!amount) return
  changeSource(userId,at,day => {
    const key = ['lessons','practice','flashcards','other'].includes(category) ? category : 'other'
    const total = amount + Number(day.fractionalSeconds[key] || 0)
    const whole = Math.floor(total)
    day.fractionalSeconds[key] = total - whole
    day.categories[key] += whole
    day.activeSeconds += whole
  })
}
export function registerVisit(userId) {
  if (!userId) return
  const key = `${keyFor(userId)}_visit_${dateKey(new Date())}`
  if (sessionStorage.getItem(key)) return
  changeSource(userId,new Date(),day => { day.visits += 1 })
  sessionStorage.setItem(key,'1')
}
export function getActivitySummary(userId) {
  const { days } = loadActivity(userId), dates = Object.keys(days).filter(key => days[key].activeSeconds > 0 || days[key].visits > 0).sort()
  let streak = 0
  const cursor = new Date();cursor.setHours(0,0,0,0)
  if (!days[dateKey(cursor)]) cursor.setDate(cursor.getDate()-1)
  while (days[dateKey(cursor)]?.activeSeconds > 0) { streak++;cursor.setDate(cursor.getDate()-1) }
  return { days, totalSeconds: dates.reduce((sum,key)=>sum+days[key].activeSeconds,0), streak, visitedDays: dates.length }
}
export function mergeServerActivity(userId, data) {
  if (data.version !== 2 || !Array.isArray(data.sources) || !data.legacyDays) throw new Error('Activity storage upgrade required')
  const previous = json(snapshotKey(userId), { sources: [], legacyDays: {} })
  const remote = new Map()
  for (const row of [...previous.sources, ...data.sources]) {
    const key = `${row.sourceId}:${row.day}`
    remote.set(key, { ...row, ...maxActivityDay(remote.get(key), row) })
  }
  const legacy = { ...previous.legacyDays }
  for (const [day,value] of Object.entries(data.legacyDays)) legacy[day] = maxActivityDay(legacy[day],value)
  localStorage.setItem(snapshotKey(userId), JSON.stringify({ sources: [...remote.values()], legacyDays: legacy }))
  // A stream may still be active in another tab. Keep its durable counter;
  // deleting it after an acknowledgement could reset that tab's next write.
  notify(userId)
  return loadActivity(userId)
}
async function reconcile(userId, keepalive) {
  const token=getUserCacheToken(userId), snapshot=json(snapshotKey(userId),{sources:[],legacyDays:{}})
  const acknowledged = new Map(snapshot.sources.map(row => [`${row.sourceId}:${row.day}`, activityDay(row)]))
  const localStreams=streams(userId).filter(row => {
    const remote=acknowledged.get(`${row.sourceId}:${row.day}`)
    return !remote || row.visits>remote.visits || Object.keys(row.categories).some(key=>row.categories[key]>remote.categories[key])
  })
  const legacy=Object.entries(legacyDays(userId,snapshot)).filter(([day,value])=>JSON.stringify(activityDay(value))!==JSON.stringify(activityDay(snapshot.legacyDays[day])))
  const headers={'Content-Type':'application/json','X-Radyar-User-Id':userId}
  // Limit payloads so pagehide keepalive requests stay below the browser limit.
  for(let offset=0;offset<Math.max(legacy.length,localStreams.length);offset+=100){
    if(!isUserCacheCurrent(userId,token))return null
    const response=await fetch('/api/progress/activity',{method:'POST',headers,body:JSON.stringify({streams:localStreams.slice(offset,offset+100),legacyDays:Object.fromEntries(legacy.slice(offset,offset+100))}),keepalive})
    if(!response.ok)throw new Error('Activity upload failed')
  }
  if(!isUserCacheCurrent(userId,token))return null
  const response=await fetch('/api/progress/activity',{cache:'no-store',headers:{'X-Radyar-User-Id':userId}})
  if(!response.ok)throw new Error('Activity download failed')
  const data=await response.json()
  if(!isUserCacheCurrent(userId,token))return null
  return mergeServerActivity(userId,data)
}
export async function syncActivityToServer(userId,{keepalive=false}={}) {
  if(!userId || !isUserCacheActive(userId))return null
  const flightKey = `${userId}:${getUserCacheToken(userId)}`
  if(!inFlight.has(flightKey))inFlight.set(flightKey,reconcile(userId,keepalive).finally(()=>inFlight.delete(flightKey)))
  return inFlight.get(flightKey)
}
export { IDLE_MS, dateKey as activityDateKey }
