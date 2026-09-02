import { ApiError, requestJson } from './api'
import {
  cacheGet,
  cacheSet,
  enqueue,
  incrementAttempt,
  localId,
  pendingCount,
  queued,
  removeQueued,
} from './database'
import type { TodoItem } from '../types'

export type MutationMeta = { kind?: string; localId?: string; cacheKey?: string }

export async function queueMutation(
  endpoint: string,
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: unknown,
  meta?: MutationMeta,
) {
  const id = localId('mutation')
  await enqueue({
    id,
    endpoint,
    method,
    body: body == null ? null : JSON.stringify(body),
    meta: meta ? JSON.stringify(meta) : null,
    created_at: new Date().toISOString(),
  })
  return id
}

async function reconcileTodoCreate(meta: MutationMeta, response: { todo?: TodoItem }) {
  if (!meta.localId || !response.todo) return
  const todos = await cacheGet<TodoItem[]>('todos', [])
  const localTodo = todos.find(item => item.id === meta.localId)
  const next = todos.map(item => item.id === meta.localId
    ? { ...response.todo!, done: localTodo?.done || response.todo!.done, pending: Boolean(localTodo?.done) }
    : item)
  await cacheSet('todos', next)

  if (localTodo?.done && !response.todo.done) {
    await requestJson('/api/andarun/todos', {
      method: 'PATCH',
      body: JSON.stringify({ id: response.todo.id, done: true }),
    })
  }
}

export async function flushQueue() {
  const rows = await queued()
  for (const row of rows) {
    try {
      const response = await requestJson<Record<string, unknown>>(row.endpoint, {
        method: row.method,
        ...(row.body ? { body: row.body } : {}),
      })
      const meta = row.meta ? JSON.parse(row.meta) as MutationMeta : {}
      if (meta.kind === 'todo-create') {
        await reconcileTodoCreate(meta, response as { todo?: TodoItem })
      }
      await removeQueued(row.id)
    } catch (error) {
      await incrementAttempt(row.id)
      if (error instanceof ApiError && error.status === 401) throw error
      break
    }
  }
  return pendingCount()
}

export async function discardTodoCreate(localTodoId: string) {
  const rows = await queued()
  for (const row of rows) {
    const meta = row.meta ? JSON.parse(row.meta) as MutationMeta : {}
    if (meta.kind === 'todo-create' && meta.localId === localTodoId) await removeQueued(row.id)
  }
}
