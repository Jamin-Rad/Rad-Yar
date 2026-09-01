import * as SQLite from 'expo-sqlite'

export type QueueRow = {
  id: string
  endpoint: string
  method: string
  body: string | null
  meta: string | null
  created_at: string
  attempts: number
}

let databasePromise: ReturnType<typeof SQLite.openDatabaseAsync> | null = null

function database() {
  if (!databasePromise) databasePromise = SQLite.openDatabaseAsync('andarun.db')
  return databasePromise
}

export async function initDatabase() {
  const db = await database()
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS cache (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY NOT NULL,
      endpoint TEXT NOT NULL,
      method TEXT NOT NULL,
      body TEXT,
      meta TEXT,
      created_at TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0
    );
  `)
}

export async function cacheGet<T>(key: string, fallback: T): Promise<T> {
  const db = await database()
  const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM cache WHERE key = ?', key)
  if (!row?.value) return fallback
  try {
    return JSON.parse(row.value) as T
  } catch {
    return fallback
  }
}

export async function cacheSet<T>(key: string, value: T) {
  const db = await database()
  await db.runAsync(
    `INSERT INTO cache (key, value, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    key,
    JSON.stringify(value),
    new Date().toISOString(),
  )
}

export async function enqueue(row: Omit<QueueRow, 'attempts'>) {
  const db = await database()
  await db.runAsync(
    'INSERT OR REPLACE INTO sync_queue (id, endpoint, method, body, meta, created_at, attempts) VALUES (?, ?, ?, ?, ?, ?, 0)',
    row.id,
    row.endpoint,
    row.method,
    row.body,
    row.meta,
    row.created_at,
  )
}

export async function queued(): Promise<QueueRow[]> {
  const db = await database()
  return db.getAllAsync<QueueRow>('SELECT * FROM sync_queue ORDER BY created_at ASC')
}

export async function removeQueued(id: string) {
  const db = await database()
  await db.runAsync('DELETE FROM sync_queue WHERE id = ?', id)
}

export async function incrementAttempt(id: string) {
  const db = await database()
  await db.runAsync('UPDATE sync_queue SET attempts = attempts + 1 WHERE id = ?', id)
}

export async function pendingCount() {
  const db = await database()
  const row = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) AS count FROM sync_queue')
  return Number(row?.count || 0)
}

export async function clearLocalData() {
  const db = await database()
  await db.execAsync('DELETE FROM cache; DELETE FROM sync_queue;')
}

export function localId(prefix = 'local') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
