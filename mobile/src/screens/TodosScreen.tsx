import { useCallback, useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppBackground, EmptyState, Field, PrimaryButton, ScreenHeader, SyncBanner } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import { createTodo, deleteTodo, loadTodos, refreshTodos, toggleTodo } from '../data/todos'
import { flushQueue } from '../data/sync'
import { pendingCount } from '../data/database'
import type { TodoItem } from '../types'

type Filter = 'today' | 'open' | 'done'

export function TodosScreen({ mode = 'todos', online, pending, onBack, onPendingChange }: {
  mode?: 'todos' | 'events'
  online: boolean
  pending: number
  onBack: () => void
  onPendingChange: (count: number) => void
}) {
  const [items, setItems] = useState<TodoItem[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<Filter>('today')
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async (remote = false) => {
    setRefreshing(true)
    try {
      const next = remote && online ? await refreshTodos() : await loadTodos()
      setItems(next)
      setError('')
    } catch (loadError) {
      setItems(await loadTodos())
      setError(loadError instanceof Error ? loadError.message : 'همگام‌سازی انجام نشد.')
    } finally {
      onPendingChange(await pendingCount())
      setRefreshing(false)
    }
  }, [online, onPendingChange])

  useEffect(() => { void load(online) }, [load, online])

  const filtered = useMemo(() => items
    .filter(item => item.itemType === (mode === 'events' ? 'event' : 'todo'))
    .filter(item => filter === 'done' ? item.done : !item.done), [filter, items, mode])

  async function add() {
    const clean = title.trim()
    if (!clean) return
    const item = await createTodo(clean, mode === 'events' ? 'event' : 'todo')
    setItems(current => [item, ...current])
    setTitle('')
    onPendingChange(await pendingCount())
    if (online) await synchronize()
  }

  async function synchronize() {
    if (!online) return
    setRefreshing(true)
    try {
      await flushQueue()
      await load(true)
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'همگام‌سازی انجام نشد.')
    } finally {
      onPendingChange(await pendingCount())
      setRefreshing(false)
    }
  }

  async function toggle(item: TodoItem) {
    await toggleTodo(item.id, !item.done)
    setItems(current => current.map(value => value.id === item.id ? { ...value, done: !value.done, pending: true } : value))
    onPendingChange(await pendingCount())
    if (online) await synchronize()
  }

  async function remove(id: string) {
    await deleteTodo(id)
    setItems(current => current.filter(item => item.id !== id))
    onPendingChange(await pendingCount())
    if (online) await synchronize()
  }

  return (
    <AppBackground>
      <ScreenHeader title={mode === 'events' ? 'قرارها' : 'کارها'} onBack={onBack} />
      <SyncBanner online={online} pending={pending} error={error} />

      <View style={styles.addRow}>
        <Field
          accessibilityLabel={mode === 'events' ? 'قرار جدید' : 'کار جدید'}
          onChangeText={setTitle}
          onSubmitEditing={add}
          placeholder={mode === 'events' ? 'قرار جدید' : 'کار جدید'}
          value={title}
          style={styles.addField}
        />
        <PrimaryButton label="افزودن" onPress={add} disabled={!title.trim()} />
      </View>

      <View style={styles.filters}>
        {([['done', 'انجام‌شده'], ['open', 'باز'], ['today', 'امروز']] as Array<[Filter, string]>).map(([value, label]) => (
          <Pressable key={value} onPress={() => setFilter(value)} style={[styles.filter, filter === value && styles.filterActive]}>
            <Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filtered.length ? filtered.map(item => (
          <View key={item.id} style={styles.item}>
            <Pressable accessibilityLabel="حذف" onPress={() => remove(item.id)} hitSlop={10}>
              <MaterialCommunityIcons name="trash-can-outline" size={21} color={colors.muted} />
            </Pressable>
            <View style={styles.itemCopy}>
              <Text style={[styles.itemTitle, item.done && styles.itemDone]}>{item.title}</Text>
              <View style={styles.metaRow}>
                {item.pending ? <MaterialCommunityIcons name="sync" size={14} color={colors.amber} /> : null}
                <Text style={styles.itemMeta}>{item.deadline || 'امروز'}</Text>
              </View>
            </View>
            <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: item.done }} onPress={() => toggle(item)} style={[styles.checkbox, item.done && styles.checkboxDone]}>
              {item.done ? <MaterialCommunityIcons name="check" size={20} color={colors.background} /> : null}
            </Pressable>
          </View>
        )) : <EmptyState icon={mode === 'events' ? 'calendar-blank-outline' : 'check-all'} title="چیزی اینجا نیست" text={filter === 'done' ? 'هنوز مورد انجام‌شده‌ای ندارید.' : 'یک مورد جدید اضافه کنید؛ حتی آفلاین روی گوشی ذخیره می‌شود.'} />}
      </ScrollView>

      {online ? (
        <Pressable onPress={synchronize} disabled={refreshing} style={styles.refreshButton}>
          <MaterialCommunityIcons name="sync" size={18} color={colors.gold} />
          <Text style={styles.refreshText}>{refreshing ? 'در حال همگام‌سازی…' : 'همگام‌سازی'}</Text>
        </Pressable>
      ) : null}
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  addRow: { flexDirection: 'row', gap: 9, paddingHorizontal: 16, alignItems: 'stretch' },
  addField: { flex: 1 },
  filters: { flexDirection: 'row', margin: 16, padding: 4, borderRadius: 17, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filter: { flex: 1, minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  filterActive: { backgroundColor: 'rgba(226, 185, 102, 0.16)', borderWidth: 1, borderColor: colors.gold },
  filterText: { color: colors.muted, fontSize: 13, writingDirection: 'rtl' },
  filterTextActive: { color: colors.gold, fontWeight: '800' },
  list: { flex: 1 },
  listContent: { paddingBottom: 90 },
  item: { minHeight: 82, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(156, 169, 187, 0.14)', backgroundColor: 'rgba(10, 24, 45, 0.72)', flexDirection: 'row', alignItems: 'center', gap: 13 },
  itemCopy: { flex: 1, alignItems: 'flex-end' },
  itemTitle: { ...rtlText, fontSize: 18, fontWeight: '700' },
  itemDone: { color: colors.muted, textDecorationLine: 'line-through' },
  metaRow: { flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 6 },
  itemMeta: { ...rtlText, color: colors.gold, fontSize: 12 },
  checkbox: { width: 30, height: 30, borderRadius: 9, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: colors.gold },
  refreshButton: { position: 'absolute', bottom: 18, alignSelf: 'center', flexDirection: 'row', gap: 7, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border },
  refreshText: { color: colors.gold, fontSize: 12, writingDirection: 'rtl' },
})
