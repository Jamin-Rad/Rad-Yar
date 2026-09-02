import { cacheGet, cacheSet, localId } from './database'
import { requestJson } from './api'
import { discardTodoCreate, flushQueue, queueMutation } from './sync'
import type { TodoItem } from '../types'

const CACHE_KEY = 'todos'

export async function loadTodos() {
  return cacheGet<TodoItem[]>(CACHE_KEY, [])
}

export async function refreshTodos() {
  await flushQueue()
  const response = await requestJson<{ todos: TodoItem[] }>('/api/andarun/todos')
  await cacheSet(CACHE_KEY, response.todos)
  return response.todos
}

export async function createTodo(title: string, itemType: 'todo' | 'event' = 'todo') {
  const id = localId(itemType)
  const now = new Date().toISOString()
  const item: TodoItem = {
    id,
    title: title.trim(),
    lane: 'today',
    deadline: now.slice(0, 10),
    itemType,
    done: false,
    createdAt: now,
    updatedAt: now,
    pending: true,
  }
  const current = await loadTodos()
  await cacheSet(CACHE_KEY, [item, ...current])
  await queueMutation('/api/andarun/todos', 'POST', {
    title: item.title,
    lane: item.lane,
    deadline: item.deadline,
    itemType,
    allDay: itemType === 'event',
  }, { kind: 'todo-create', localId: id })
  return item
}

export async function toggleTodo(id: string, done: boolean) {
  const current = await loadTodos()
  await cacheSet(CACHE_KEY, current.map(item => item.id === id ? { ...item, done, pending: true } : item))
  if (!id.startsWith('todo-') && !id.startsWith('event-')) {
    await queueMutation('/api/andarun/todos', 'PATCH', { id, done }, { cacheKey: CACHE_KEY })
  }
}

export async function deleteTodo(id: string) {
  const current = await loadTodos()
  await cacheSet(CACHE_KEY, current.filter(item => item.id !== id))
  if (id.startsWith('todo-') || id.startsWith('event-')) {
    await discardTodoCreate(id)
    return
  }
  await queueMutation(`/api/andarun/todos?id=${encodeURIComponent(id)}`, 'DELETE', undefined, { cacheKey: CACHE_KEY })
}
