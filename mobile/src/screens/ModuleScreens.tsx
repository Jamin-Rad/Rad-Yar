import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppBackground, EmptyState, Field, PrimaryButton, ScreenHeader, SyncBanner } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import { useResource } from '../hooks/useResource'
import { cacheGet, cacheSet, localId, pendingCount } from '../data/database'
import { flushQueue, queueMutation } from '../data/sync'
import type { BudgetEntry, BudgetPayload, DeutschState, HealthState, RoutinesPayload, WorkState } from '../types'

const EMPTY_ROUTINES: RoutinesPayload = { routines: [], logs: [] }
const EMPTY_WORK: WorkState = { shifts: [], findings: [], findingTimers: [] }
const EMPTY_HEALTH: HealthState = { records: [], customSports: [], customFoods: [], deletedSports: [], deletedFoods: [], caloriePlan: null }
const EMPTY_DEUTSCH_WRAPPER = { state: { lessons: [], cards: [], reviews: [], writings: [], answers: {} } as DeutschState }
const EMPTY_BUDGET: BudgetPayload = { store: {}, recurring: [], catBudgets: {}, categories: [] }

type CommonProps = {
  online: boolean
  pending: number
  onBack: () => void
  onPendingChange: (count: number) => void
}

function SectionShell({ title, online, pending, error, onBack, children }: CommonProps & { title: string; error?: string; children: ReactNode }) {
  return (
    <AppBackground>
      <ScreenHeader title={title} onBack={onBack} />
      <SyncBanner online={online} pending={pending} error={error} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </AppBackground>
  )
}

async function settle(online: boolean, refresh: () => Promise<void>, onPendingChange: (count: number) => void) {
  onPendingChange(await pendingCount())
  if (!online) return
  await flushQueue()
  await refresh()
  onPendingChange(await pendingCount())
}

export function RoutinesScreen(props: CommonProps) {
  const resource = useResource('routines', '/api/andarun/routines', EMPTY_ROUTINES, props.online)
  const [title, setTitle] = useState('')
  const today = new Date().toISOString().slice(0, 10)

  async function addRoutine() {
    if (!title.trim()) return
    const routine = { id: localId('routine'), title: title.trim(), unit: 'بار', dailyTarget: 1, color: 'gold', pending: true }
    const next = { ...resource.data, routines: [routine, ...resource.data.routines] }
    resource.setData(next)
    await cacheSet('routines', next)
    await queueMutation('/api/andarun/routines', 'POST', { title: routine.title, unit: routine.unit, dailyTarget: 1, color: 'gold' })
    setTitle('')
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  async function mark(routineId: string, amount: number) {
    const current = resource.data.logs.filter(log => !(log.routineId === routineId && log.date === today))
    const next = { ...resource.data, logs: [{ id: localId('log'), routineId, date: today, amount }, ...current] }
    resource.setData(next)
    await cacheSet('routines', next)
    await queueMutation('/api/andarun/routines', 'POST', { action: 'log', routineId, date: today, amount })
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  return (
    <SectionShell title="روتین" {...props} error={resource.error}>
      <View style={styles.formRow}>
        <Field placeholder="روتین جدید" value={title} onChangeText={setTitle} onSubmitEditing={addRoutine} style={styles.flex} />
        <PrimaryButton label="افزودن" onPress={addRoutine} disabled={!title.trim()} />
      </View>
      {resource.data.routines.length ? resource.data.routines.map(routine => {
        const log = resource.data.logs.find(item => item.routineId === routine.id && item.date === today)
        const done = Number(log?.amount || 0) >= routine.dailyTarget
        return (
          <View key={routine.id} style={styles.dataRow}>
            <Pressable onPress={() => mark(routine.id, done ? 0 : routine.dailyTarget)} style={[styles.roundAction, done && styles.roundActionDone]}>
              <MaterialCommunityIcons name={done ? 'check' : 'plus'} size={22} color={done ? colors.background : colors.gold} />
            </Pressable>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>{routine.title}</Text>
              <Text style={styles.rowMeta}>{done ? 'هدف امروز انجام شد' : `${routine.dailyTarget.toLocaleString('fa-IR')} ${routine.unit}`}</Text>
            </View>
          </View>
        )
      }) : <EmptyState icon="autorenew" title="روتینی ثبت نشده" text="اولین روتین را اضافه کنید؛ ثبت روزانه بدون اینترنت هم باقی می‌ماند." />}
    </SectionShell>
  )
}

export function WorkScreen(props: CommonProps) {
  const resource = useResource('work', '/api/andarun/work', EMPTY_WORK, props.online)
  const [model, setModel] = useState('')
  const today = new Date().toISOString().slice(0, 10)

  async function addShift() {
    if (!model.trim()) return
    const shift = { id: localId('shift'), date: today, model: model.trim(), assignment: '', updatedAt: new Date().toISOString() }
    const next = { ...resource.data, shifts: [shift, ...resource.data.shifts] }
    resource.setData(next)
    await cacheSet('work', next)
    await queueMutation('/api/andarun/work', 'POST', { type: 'shift', shift })
    setModel('')
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  return (
    <SectionShell title="خدمات" {...props} error={resource.error}>
      <View style={styles.formRow}>
        <Field placeholder="نوع شیفت امروز" value={model} onChangeText={setModel} onSubmitEditing={addShift} style={styles.flex} />
        <PrimaryButton label="ثبت" onPress={addShift} disabled={!model.trim()} icon="briefcase-plus-outline" />
      </View>
      {resource.data.shifts.length ? resource.data.shifts.map(shift => (
        <View key={shift.id} style={styles.dataRow}>
          <MaterialCommunityIcons name="briefcase-outline" size={26} color={colors.gold} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{String(shift.model || 'شیفت')}</Text>
            <Text style={styles.rowMeta}>{String(shift.date || '')}{shift.assignment ? ` · ${shift.assignment}` : ''}</Text>
          </View>
        </View>
      )) : <EmptyState icon="briefcase-clock-outline" title="شیفتی ثبت نشده" text="برنامهٔ کاری شما پس از اولین همگام‌سازی اینجا نمایش داده می‌شود." />}
    </SectionShell>
  )
}

export function FindingsScreen(props: CommonProps) {
  const resource = useResource('work', '/api/andarun/work', EMPTY_WORK, props.online)
  const [question, setQuestion] = useState('')

  async function addQuestion() {
    if (!question.trim()) return
    const finding = { id: localId('finding'), type: 'question', question: question.trim(), status: 'offen', createdAt: new Date().toISOString() }
    const next = { ...resource.data, findings: [finding, ...resource.data.findings] }
    resource.setData(next)
    await cacheSet('work', next)
    await queueMutation('/api/andarun/work', 'POST', { type: 'finding', finding })
    setQuestion('')
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  return (
    <SectionShell title="گزارش‌ها" {...props} error={resource.error}>
      <View style={styles.formStack}>
        <Field placeholder="پرسش یا یافتهٔ جدید" value={question} onChangeText={setQuestion} multiline />
        <PrimaryButton label="ذخیره" onPress={addQuestion} disabled={!question.trim()} icon="content-save-outline" />
      </View>
      {resource.data.findings.length ? resource.data.findings.map(finding => (
        <View key={finding.id} style={styles.dataRow}>
          <MaterialCommunityIcons name="file-document-outline" size={26} color={colors.gold} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{String(finding.question || finding.diagnosis || 'یافته')}</Text>
            <Text style={styles.rowMeta}>{String(finding.examDate || finding.status || '')}</Text>
          </View>
        </View>
      )) : <EmptyState icon="file-document-alert-outline" title="یافته‌ای ثبت نشده" text="یافته‌ها و پرسش‌های کاری شما اینجا و روی گوشی ذخیره می‌شوند." />}
    </SectionShell>
  )
}

export function HealthScreen(props: CommonProps) {
  const resource = useResource('health', '/api/andarun/health', EMPTY_HEALTH, props.online)
  const [weight, setWeight] = useState('')
  const [note, setNote] = useState('')
  const today = new Date().toISOString().slice(0, 10)

  async function saveToday() {
    if (!weight.trim() && !note.trim()) return
    const record = { id: `record-andarun-${today}`, date: today, weight: Number(weight) || undefined, note: note.trim(), manual_kcal: 0, sports: [], foods: [], updated_at: new Date().toISOString() }
    const next = { ...resource.data, records: [record, ...resource.data.records.filter(item => item.date !== today)] }
    resource.setData(next)
    await cacheSet('health', next)
    await queueMutation('/api/andarun/health/records', 'POST', record)
    setWeight('')
    setNote('')
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  return (
    <SectionShell title="سلامت" {...props} error={resource.error}>
      <View style={styles.formStack}>
        <Field placeholder="وزن امروز (کیلوگرم)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" />
        <Field placeholder="یادداشت امروز" value={note} onChangeText={setNote} multiline />
        <PrimaryButton label="ثبت امروز" onPress={saveToday} disabled={!weight.trim() && !note.trim()} icon="heart-plus-outline" />
      </View>
      {resource.data.records.length ? resource.data.records.map(record => (
        <View key={record.id} style={styles.dataRow}>
          <MaterialCommunityIcons name="heart-pulse" size={26} color={colors.gold} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{record.weight ? `${Number(record.weight).toLocaleString('fa-IR')} کیلوگرم` : record.note || 'ثبت روزانه'}</Text>
            <Text style={styles.rowMeta}>{record.date}{record.weight && record.note ? ` · ${record.note}` : ''}</Text>
          </View>
        </View>
      )) : <EmptyState icon="heart-outline" title="هنوز رکوردی نیست" text="وزن یا یادداشت امروز را ثبت کنید؛ اطلاعات آفلاین نیز حفظ می‌شوند." />}
    </SectionShell>
  )
}

export function DeutschScreen(props: CommonProps) {
  const resource = useResource('deutsch', '/api/andarun/deutsch', EMPTY_DEUTSCH_WRAPPER, props.online)
  const state = resource.data.state
  return (
    <SectionShell title="آلمانی" {...props} error={resource.error}>
      <View style={styles.statGrid}>
        <Stat label="درس‌ها" value={state.lessons.length} icon="book-open-page-variant-outline" />
        <Stat label="فلش‌کارت" value={state.cards.length} icon="cards-outline" />
        <Stat label="مرور" value={state.reviews.length} icon="history" />
        <Stat label="نوشته‌ها" value={state.writings.length} icon="pencil-outline" />
      </View>
      {state.lessons.length ? state.lessons.slice(0, 20).map((lesson, index) => (
        <View key={String(lesson.id || index)} style={styles.dataRow}>
          <MaterialCommunityIcons name="book-outline" size={26} color={colors.gold} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{String(lesson.title || lesson.name || `درس ${index + 1}`)}</Text>
            <Text style={styles.rowMeta}>دادهٔ همگام‌شدهٔ اندرون</Text>
          </View>
        </View>
      )) : <EmptyState icon="book-open-blank-variant-outline" title="درسی پیدا نشد" text="پس از همگام‌سازی، درس‌ها و پیشرفت موجود اینجا ظاهر می‌شوند." />}
    </SectionShell>
  )
}

function monthKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function FinanceScreen(props: CommonProps) {
  const resource = useResource('finance', '/api/admin/budget', EMPTY_BUDGET, props.online)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const currentMonth = monthKey()
  const entries = resource.data.store[currentMonth]?.entries || []
  const income = entries.filter(item => item.type === 'income').reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const expense = entries.filter(item => item.type !== 'income').reduce((sum, item) => sum + Number(item.amount || 0), 0)

  async function addExpense() {
    if (!title.trim() || !Number(amount)) return
    const entry: BudgetEntry = { id: localId('expense'), type: 'expense', title: title.trim(), amount: Number(amount), category: 'سایر', date: new Date().toISOString().slice(0, 10) }
    const next: BudgetPayload = {
      ...resource.data,
      store: {
        ...resource.data.store,
        [currentMonth]: { ...(resource.data.store[currentMonth] || {}), entries: [entry, ...entries] },
      },
    }
    resource.setData(next)
    await cacheSet('finance', next)
    await queueMutation('/api/admin/budget', 'PUT', { store: next.store, recurring: next.recurring, catBudgets: next.catBudgets, categories: next.categories })
    setTitle('')
    setAmount('')
    await settle(props.online, resource.refresh, props.onPendingChange)
  }

  return (
    <SectionShell title="امور مالی" {...props} error={resource.error}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>ماندهٔ این ماه</Text>
        <Text style={styles.balanceValue}>{(income - expense).toLocaleString('fa-IR')} €</Text>
        <Text style={styles.balanceMeta}>درآمد {income.toLocaleString('fa-IR')} € · هزینه {expense.toLocaleString('fa-IR')} €</Text>
      </View>
      <View style={styles.formStack}>
        <Field placeholder="عنوان هزینه" value={title} onChangeText={setTitle} />
        <Field placeholder="مبلغ به یورو" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
        <PrimaryButton label="ثبت هزینه" onPress={addExpense} disabled={!title.trim() || !Number(amount)} icon="wallet-plus-outline" />
      </View>
      {entries.map(entry => (
        <View key={entry.id} style={styles.dataRow}>
          <Text style={styles.moneyNegative}>−{Number(entry.amount).toLocaleString('fa-IR')} €</Text>
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{entry.title}</Text>
            <Text style={styles.rowMeta}>{entry.date} · {entry.category || 'بدون دسته'}</Text>
          </View>
        </View>
      ))}
    </SectionShell>
  )
}

function Stat({ label, value, icon }: { label: string; value: number; icon: ComponentProps<typeof MaterialCommunityIcons>['name'] }) {
  return (
    <View style={styles.stat}>
      <MaterialCommunityIcons name={icon} size={24} color={colors.gold} />
      <Text style={styles.statValue}>{value.toLocaleString('fa-IR')}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

export function ReportsScreen(props: CommonProps) {
  const [counts, setCounts] = useState({ todos: 0, routines: 0, shifts: 0, findings: 0, health: 0 })

  useEffect(() => {
    void Promise.all([
      cacheGet<Array<{ done?: boolean }>>('todos', []),
      cacheGet<RoutinesPayload>('routines', EMPTY_ROUTINES),
      cacheGet<WorkState>('work', EMPTY_WORK),
      cacheGet<HealthState>('health', EMPTY_HEALTH),
    ]).then(([todos, routines, work, health]) => setCounts({
      todos: todos.filter(item => !item.done).length,
      routines: routines.routines.length,
      shifts: work.shifts.length,
      findings: work.findings.length,
      health: health.records.length,
    }))
  }, [props.pending])

  return (
    <SectionShell title="گزارش کلی" {...props}>
      <View style={styles.statGrid}>
        <Stat label="کار باز" value={counts.todos} icon="clipboard-check-outline" />
        <Stat label="روتین" value={counts.routines} icon="autorenew" />
        <Stat label="شیفت" value={counts.shifts} icon="briefcase-outline" />
        <Stat label="یافته" value={counts.findings} icon="file-chart-outline" />
        <Stat label="ثبت سلامت" value={counts.health} icon="heart-pulse" />
      </View>
      <Text style={styles.reportNote}>این گزارش مستقیماً از داده‌های ذخیره‌شده روی گوشی ساخته می‌شود و در حالت آفلاین هم در دسترس است.</Text>
    </SectionShell>
  )
}

export function ProfileScreen({ onBack, onLogout, online, pending, onPendingChange }: CommonProps & { onLogout: () => void }) {
  return (
    <SectionShell title="من" online={online} pending={pending} onBack={onBack} onPendingChange={onPendingChange}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><MaterialCommunityIcons name="account" size={42} color={colors.gold} /></View>
        <Text style={styles.profileTitle}>اندرون شخصی</Text>
        <Text style={styles.profileText}>توکن ورود در فضای امن دستگاه و داده‌ها در SQLite محلی نگهداری می‌شوند.</Text>
      </View>
      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>خروج و پاک‌کردن داده‌های محلی</Text>
        <MaterialCommunityIcons name="logout" size={22} color={colors.danger} />
      </Pressable>
    </SectionShell>
  )
}

const styles = StyleSheet.create({
  content: { paddingBottom: 112, flexGrow: 1 },
  flex: { flex: 1 },
  formRow: { flexDirection: 'row', gap: 9, paddingHorizontal: 16, marginBottom: 18 },
  formStack: { gap: 10, paddingHorizontal: 16, marginBottom: 18 },
  dataRow: { minHeight: 76, paddingHorizontal: 18, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(156, 169, 187, 0.14)', backgroundColor: 'rgba(10, 24, 45, 0.72)', flexDirection: 'row', alignItems: 'center', gap: 13 },
  rowCopy: { flex: 1, alignItems: 'flex-end' },
  rowTitle: { ...rtlText, fontSize: 17, fontWeight: '700' },
  rowMeta: { ...rtlText, color: colors.muted, fontSize: 12, marginTop: 5 },
  roundAction: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  roundActionDone: { backgroundColor: colors.gold },
  statGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  stat: { width: '47%', minHeight: 126, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  statValue: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 6 },
  statLabel: { ...rtlText, color: colors.muted, fontSize: 13, marginTop: 3 },
  balanceCard: { marginHorizontal: 16, marginBottom: 18, padding: 22, borderRadius: 24, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border, alignItems: 'flex-end' },
  balanceLabel: { ...rtlText, color: colors.gold, fontSize: 13, fontWeight: '700' },
  balanceValue: { ...rtlText, fontSize: 32, fontWeight: '800', marginTop: 8 },
  balanceMeta: { ...rtlText, color: colors.muted, fontSize: 12, marginTop: 7 },
  moneyNegative: { color: colors.danger, fontWeight: '800', fontSize: 15 },
  reportNote: { ...rtlText, color: colors.muted, fontSize: 14, lineHeight: 24, marginHorizontal: 22, textAlign: 'center' },
  profileCard: { margin: 18, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  avatar: { width: 82, height: 82, borderRadius: 41, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  profileTitle: { ...rtlText, fontSize: 22, fontWeight: '800', marginTop: 14 },
  profileText: { ...rtlText, color: colors.muted, fontSize: 13, lineHeight: 22, textAlign: 'center', marginTop: 8 },
  logoutButton: { marginHorizontal: 18, minHeight: 56, paddingHorizontal: 18, borderRadius: 17, borderWidth: 1, borderColor: 'rgba(239,123,123,0.35)', backgroundColor: 'rgba(239,123,123,0.08)', flexDirection: 'row', gap: 9, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: colors.danger, fontSize: 14, fontWeight: '700', writingDirection: 'rtl' },
})
