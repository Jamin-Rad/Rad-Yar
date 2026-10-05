import type { ComponentProps } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { AppBackground, Field, ScreenHeader, SyncBanner } from '../ui/components'
import { colors, rtlText } from '../ui/theme'
import {
  EVERY_DAY,
  loadMedicationState,
  loadProfileSettings,
  newMedication,
  newSchedule,
  ROUTINES,
  routineByValue,
  saveMedicine,
  deleteMedicine,
  toggleDose,
  syncMedicationState,
  WEEKDAYS,
} from '../data/medications'
import {
  MEDICATION_CATEGORIES,
  findMedicationById,
  searchMedicationCatalog,
} from '../data/medicationCatalog'
import type { CatalogMedication } from '../data/medicationCatalog'
import type { Medication, MedicationRoutine, MedicationSchedule, MedicationState } from '../types'
import { pendingCount } from '../data/database'

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']
type Props = { onBack: () => void; online: boolean; pending: number; onPendingChange: (count: number) => void }

function fa(value: number) {
  return value.toLocaleString('fa-IR')
}

function clockLabel(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  return `${fa(hour)}:${String(minute).padStart(2, '0').replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}`
}

function dayDose(medicine: Medication, weekday: number) {
  return medicine.doseByWeekday[String(weekday)] || medicine.dose
}

function scheduleTitle(schedule: MedicationSchedule) {
  return schedule.type === 'routine' ? routineByValue(schedule.routine)?.label || 'روتین' : `ساعت ${clockLabel(schedule.time)}`
}

function scheduleIcon(schedule: MedicationSchedule): IconName {
  if (schedule.type === 'exact') return 'clock-outline'
  return (routineByValue(schedule.routine)?.icon || 'silverware-fork-knife') as IconName
}

function DoseTile({ medicine, schedule, taken, onPress }: {
  medicine: Medication
  schedule: MedicationSchedule
  taken: boolean
  onPress: () => void
}) {
  const scale = useRef(new Animated.Value(1)).current

  function press() {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: Platform.OS !== 'web', speed: 35, bounciness: 2 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: Platform.OS !== 'web', speed: 20, bounciness: 9 }),
    ]).start()
    onPress()
  }

  return (
    <Animated.View style={[styles.doseTileWrap, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: taken }}
        accessibilityLabel={`${medicine.name}، ${dayDose(medicine, new Date().getDay())}`}
        onPress={press}
        style={[styles.doseTile, taken && styles.doseTileTaken]}
      >
        <View style={[styles.doseCheck, taken && styles.doseCheckTaken]}>
          <MaterialCommunityIcons name={taken ? 'check' : 'pill'} size={22} color={taken ? colors.white : colors.greenDeep} />
        </View>
        <Text numberOfLines={1} style={[styles.doseName, taken && styles.doseNameTaken]}>{medicine.name}</Text>
        <Text numberOfLines={1} style={styles.doseAmount}>{dayDose(medicine, new Date().getDay())}</Text>
      </Pressable>
    </Animated.View>
  )
}

export function MedicationsScreen({ onBack, online, pending, onPendingChange }: Props) {
  const [state, setState] = useState<MedicationState>({ medicines: [], logs: [] })
  const [personName, setPersonName] = useState('')
  const [managerOpen, setManagerOpen] = useState(false)
  const [editing, setEditing] = useState<Medication | null | undefined>(undefined)
  const entrance = useRef(new Animated.Value(0)).current

  useEffect(() => {
    void Promise.all([loadMedicationState(), loadProfileSettings()]).then(([medications, profile]) => {
      setState(medications)
      setPersonName(profile.personName)
      Animated.timing(entrance, { toValue: 1, duration: 520, useNativeDriver: Platform.OS !== 'web' }).start()
    })
  }, [entrance])

  useEffect(() => {
    if (!online) return
    let ignore = false
    void syncMedicationState().then(next => {
      if (!ignore) setState(next)
    })
    return () => { ignore = true }
  }, [online])

  const today = new Date()
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const weekday = today.getDay()
  const doses = useMemo(() => state.medicines
    .filter(medicine => medicine.weekdays.includes(weekday))
    .flatMap(medicine => medicine.schedules.map(schedule => ({ medicine, schedule })))
    .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time)), [state.medicines, weekday])
  const groups = useMemo(() => doses.reduce<Array<{ key: string; schedule: MedicationSchedule; items: typeof doses }>>((result, item) => {
    const key = `${item.schedule.type}:${item.schedule.type === 'routine' ? item.schedule.routine : item.schedule.time}`
    const group = result.find(value => value.key === key)
    if (group) group.items.push(item)
    else result.push({ key, schedule: item.schedule, items: [item] })
    return result
  }, []), [doses])
  const completed = doses.filter(item => state.logs.some(log => log.id === `${dateKey}:${item.medicine.id}:${item.schedule.id}`)).length
  const progress = doses.length ? completed / doses.length : 0
  const persianDate = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' }).format(today)

  async function mark(medicine: Medication, schedule: MedicationSchedule) {
    setState(await toggleDose(medicine, schedule, today))
    onPendingChange(await pendingCount())
  }

  async function save(value: Medication) {
    setState(await saveMedicine(value))
    onPendingChange(await pendingCount())
    setEditing(undefined)
    setManagerOpen(true)
  }

  async function remove(value: Medication) {
    Alert.alert('حذف دارو', `«${value.name}» از برنامه پاک شود؟`, [
      { text: 'انصراف', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => void deleteMedicine(value.id).then(async next => { setState(next); setEditing(undefined); onPendingChange(await pendingCount()) }) },
    ])
  }

  const translateY = entrance.interpolate({ inputRange: [0, 1], outputRange: [18, 0] })

  return (
    <AppBackground>
      <ScreenHeader title="داروی من" onBack={onBack} right={(
        <Pressable accessibilityLabel="مدیریت داروها" onPress={() => setManagerOpen(true)} style={styles.headerAction}>
          <MaterialCommunityIcons name="tune-variant" size={22} color={colors.greenDeep} />
        </Pressable>
      )} />
      <SyncBanner online={online} pending={pending} />
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        style={{ opacity: entrance, transform: [{ translateY }] }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={['#fefcf7', '#edf6e9']} style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.greeting}>سلام {personName || 'دوست من'}</Text>
            <Text style={styles.date}>{persianDate}</Text>
          </View>
          <View style={styles.progressRing}>
            <View style={[styles.progressFill, progress === 1 && styles.progressComplete]}>
              <Text style={styles.progressValue}>{fa(completed)} از {fa(doses.length)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>برنامه امروز</Text>
          <Text style={styles.sectionMeta}>{doses.length ? `${fa(doses.length - completed)} نوبت باقی مانده` : 'امروز نوبتی نداری'}</Text>
        </View>

        {groups.length ? groups.map(group => (
          <View key={group.key} style={styles.doseGroup}>
            <View style={styles.groupHead}>
              <MaterialCommunityIcons name={scheduleIcon(group.schedule)} size={20} color={colors.amber} />
              <Text style={styles.groupTitle}>{scheduleTitle(group.schedule)}</Text>
            </View>
            <View style={styles.doseGrid}>{group.items.map(item => {
              const logId = `${dateKey}:${item.medicine.id}:${item.schedule.id}`
              return <DoseTile key={logId} {...item} taken={state.logs.some(log => log.id === logId)} onPress={() => void mark(item.medicine, item.schedule)} />
            })}</View>
          </View>
        )) : (
          <Pressable accessibilityRole="button" onPress={() => setEditing(null)} style={styles.emptyToday}>
            <View style={styles.emptyIcon}><MaterialCommunityIcons name="pill-multiple" size={32} color={colors.greenDeep} /></View>
            <Text style={styles.emptyTitle}>هنوز دارویی برای امروز نیست</Text>
            <Text style={styles.emptyText}>اولین دارو را اضافه کن؛ بدون اینترنت هم روی همین گوشی می‌ماند.</Text>
            <Text style={styles.emptyAction}>افزودن دارو</Text>
          </Pressable>
        )}

        <View style={styles.weekCard}>
          <View style={styles.weekIcon}><MaterialCommunityIcons name="chart-bar" size={27} color={colors.greenDeep} /></View>
          <View style={styles.weekCopy}>
            <Text style={styles.weekTitle}>گزارش این هفته</Text>
            <Text style={styles.weekText}>{state.logs.length ? 'آفرین؛ ثبت داروها را شروع کرده‌ای. ادامه بده تا برنامه‌ات منظم‌تر شود.' : 'همه‌چیز خوبه؛ فعلاً چیزی جا نیفتاده.'}</Text>
          </View>
        </View>

        <Pressable accessibilityRole="button" onPress={() => setManagerOpen(true)} style={styles.manageButton}>
          <MaterialCommunityIcons name="chevron-left" size={25} color={colors.greenDeep} />
          <View style={styles.manageCopy}><Text style={styles.manageTitle}>مدیریت داروها</Text><Text style={styles.manageMeta}>افزودن یا ویرایش دارو</Text></View>
          <View style={styles.manageIcon}><MaterialCommunityIcons name="pill" size={24} color={colors.greenDeep} /></View>
        </Pressable>
      </Animated.ScrollView>

      <ManagerModal open={managerOpen} medicines={state.medicines} onClose={() => setManagerOpen(false)} onEdit={medicine => { setManagerOpen(false); setEditing(medicine) }} onAdd={() => { setManagerOpen(false); setEditing(null) }} />
      <MedicineEditor open={editing !== undefined} medicine={editing || null} onClose={() => setEditing(undefined)} onSave={save} onDelete={remove} />
    </AppBackground>
  )
}

function ManagerModal({ open, medicines, onClose, onAdd, onEdit }: {
  open: boolean
  medicines: Medication[]
  onClose: () => void
  onAdd: () => void
  onEdit: (medicine: Medication) => void
}) {
  return (
    <Modal animationType="slide" transparent visible={open} onRequestClose={onClose}>
      <View style={styles.modalShade}>
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHead}>
            <Pressable accessibilityRole="button" accessibilityLabel="بستن" onPress={onClose} style={styles.closeButton}><MaterialCommunityIcons name="close" size={24} color={colors.text} /></Pressable>
            <Text style={styles.sheetTitle}>داروهای من</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={onAdd} style={styles.addMedicineButton}>
            <MaterialCommunityIcons name="plus" size={24} color={colors.white} />
            <Text style={styles.addMedicineText}>افزودن داروی جدید</Text>
          </Pressable>
          <ScrollView contentContainerStyle={styles.managerList}>
            {medicines.length ? medicines.map(medicine => (
              <Pressable accessibilityRole="button" key={medicine.id} onPress={() => onEdit(medicine)} style={styles.managerRow}>
                <MaterialCommunityIcons name="chevron-left" size={24} color={colors.muted} />
                <View style={styles.managerRowCopy}>
                  <Text style={styles.managerRowTitle}>{medicine.name}</Text>
                  <Text style={styles.managerRowMeta}>{medicine.weekdays.length === 7 ? 'هر روز' : WEEKDAYS.filter(day => medicine.weekdays.includes(day.value)).map(day => day.label).join('، ')} · {medicine.dose}</Text>
                </View>
                <View style={styles.managerPill}><MaterialCommunityIcons name="pill" size={22} color={colors.greenDeep} /></View>
              </Pressable>
            )) : <Text style={styles.emptyManager}>هنوز دارویی ثبت نشده.</Text>}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

function MedicineEditor({ open, medicine, onClose, onSave, onDelete }: {
  open: boolean
  medicine: Medication | null
  onClose: () => void
  onSave: (medicine: Medication) => Promise<void>
  onDelete: (medicine: Medication) => Promise<void>
}) {
  const [draft, setDraft] = useState<Medication>(medicine || newMedication())
  const [queryOpen, setQueryOpen] = useState(false)
  const [differentDose, setDifferentDose] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setDraft(medicine ? { ...medicine, weekdays: [...medicine.weekdays], doseByWeekday: { ...medicine.doseByWeekday }, schedules: medicine.schedules.map(item => ({ ...item })) } : newMedication())
      setDifferentDose(Boolean(medicine && Object.keys(medicine.doseByWeekday).length))
      setQueryOpen(false)
      setError('')
    }
  }, [medicine, open])

  const selectedDrug = findMedicationById(draft.drugCatalogId)
  const suggestions = useMemo(() => searchMedicationCatalog(draft.name, 6), [draft.name])
  const routineMode = draft.schedules.length > 0 && draft.schedules.every(schedule => schedule.type === 'routine')

  function patch(value: Partial<Medication>) {
    setDraft(current => ({ ...current, ...value }))
  }

  function updateName(name: string) {
    const keep = selectedDrug && (name === selectedDrug.fa || name === selectedDrug.en)
    patch({ name, ...(keep ? {} : { drugCatalogId: undefined, genericNameEn: undefined, category: 'other' }) })
    setQueryOpen(true)
  }

  function selectDrug(drug: CatalogMedication) {
    const weekly = drug.defaultFrequency === 'weekly'
    patch({
      name: drug.fa,
      dose: drug.doses[0] || '',
      drugCatalogId: drug.id,
      genericNameEn: drug.en,
      category: drug.category,
      frequency: weekly ? 'weekly' : 'daily',
      weekdays: weekly ? [new Date().getDay()] : [...EVERY_DAY],
      doseByWeekday: {},
    })
    setDifferentDose(false)
    setQueryOpen(false)
  }

  function chooseDay(day: number) {
    if (draft.frequency === 'daily') {
      patch({ frequency: 'weekly', weekdays: [day], doseByWeekday: differentDose ? { [String(day)]: draft.dose } : {} })
      return
    }
    const selected = draft.weekdays.includes(day)
    if (selected && draft.weekdays.length === 1) return
    const weekdays = selected ? draft.weekdays.filter(value => value !== day) : [...draft.weekdays, day]
    const doseByWeekday = { ...draft.doseByWeekday }
    if (selected) delete doseByWeekday[String(day)]
    else if (differentDose) doseByWeekday[String(day)] = draft.dose
    patch({ weekdays, doseByWeekday })
  }

  function setDaily() {
    patch({ frequency: 'daily', weekdays: [...EVERY_DAY], doseByWeekday: differentDose ? Object.fromEntries(EVERY_DAY.map(day => [String(day), draft.doseByWeekday[String(day)] || draft.dose])) : {} })
  }

  function setSelectedDays() {
    const day = new Date().getDay()
    patch({ frequency: 'weekly', weekdays: draft.frequency === 'weekly' ? draft.weekdays : [day], doseByWeekday: differentDose ? { [String(day)]: draft.doseByWeekday[String(day)] || draft.dose } : {} })
  }

  function toggleDifferent(value: boolean) {
    setDifferentDose(value)
    patch({ doseByWeekday: value ? Object.fromEntries(draft.weekdays.map(day => [String(day), draft.dose])) : {} })
  }

  function setRoutine(routine: MedicationRoutine) {
    const option = routineByValue(routine)
    patch({ schedules: [{ ...newSchedule('routine', routine), time: option?.time || '08:00' }] })
  }

  function toggleRoutine(routine: MedicationRoutine) {
    const current = draft.schedules.filter(schedule => schedule.type === 'routine')
    const existing = current.find(schedule => schedule.routine === routine)
    if (existing) {
      if (current.length === 1) return
      patch({ schedules: current.filter(schedule => schedule.id !== existing.id) })
      return
    }
    patch({ schedules: [...current, newSchedule('routine', routine)] })
  }

  function updateTime(index: number, time: string) {
    patch({ schedules: draft.schedules.map((schedule, itemIndex) => itemIndex === index ? { ...schedule, time } : schedule) })
  }

  function addExactTime() {
    if (draft.schedules.length >= 4) return
    const next = newSchedule('exact')
    next.time = ['08:00', '14:00', '20:00', '22:00'][draft.schedules.length] || '08:00'
    patch({ schedules: [...draft.schedules, next] })
  }

  async function submit() {
    if (!draft.name.trim()) return setError('نام دارو را وارد کن.')
    if (!draft.dose.trim()) return setError('دوز دارو را انتخاب یا وارد کن.')
    if (selectedDrug && !selectedDrug.doses.includes(draft.dose)) return setError('دوز را از گزینه‌های همین دارو انتخاب کن.')
    if (!draft.weekdays.length) return setError('حداقل یک روز مصرف لازم است.')
    if (draft.schedules.some(schedule => !/^([01]\d|2[0-3]):[0-5]\d$/.test(schedule.time))) return setError('ساعت را به‌شکل 08:00 وارد کن.')
    setError('')
    await onSave(draft)
  }

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.editorPage} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.editorHead}>
          <Pressable accessibilityRole="button" accessibilityLabel="بستن" onPress={onClose} style={styles.closeButton}><MaterialCommunityIcons name="close" size={24} color={colors.text} /></Pressable>
          <View style={styles.editorTitleWrap}><Text style={styles.editorTitle}>{medicine ? 'ویرایش دارو' : 'افزودن دارو'}</Text><Text style={styles.editorSubtitle}>نام، دوز، روز و زمان مصرف</Text></View>
        </View>
        <ScrollView contentContainerStyle={styles.editorContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>نام دارو</Text>
          <View style={styles.searchWrap}>
            <MaterialCommunityIcons name="magnify" size={23} color={colors.muted} />
            <Field value={draft.name} onFocus={() => setQueryOpen(true)} onChangeText={updateName} placeholder="نام فارسی یا انگلیسی" style={styles.searchField} />
          </View>
          {queryOpen && draft.name && suggestions.length ? <View style={styles.suggestions}>{suggestions.map(drug => (
            <Pressable accessibilityRole="button" key={drug.id} onPress={() => selectDrug(drug)} style={styles.suggestionRow}>
              <Text style={styles.suggestionCategory}>{MEDICATION_CATEGORIES[drug.category]?.fa || 'سایر'}</Text>
              <View style={styles.suggestionCopy}><Text style={styles.suggestionFa}>{drug.fa}</Text><Text style={styles.suggestionEn}>{drug.en}</Text></View>
            </Pressable>
          ))}</View> : null}

          <Text style={styles.label}>دوز</Text>
          {selectedDrug ? <View style={styles.chipGrid}>{selectedDrug.doses.map(dose => <Choice key={dose} label={dose} selected={draft.dose === dose} onPress={() => patch({ dose })} />)}</View> : <Field value={draft.dose} onChangeText={dose => patch({ dose })} placeholder="مثلاً ۵۰ میلی‌گرم" />}
          {selectedDrug ? <Text style={styles.helper}>فقط دوزهای ثبت‌شده برای این دارو قابل انتخاب‌اند.</Text> : <Text style={styles.helper}>اگر دارو در بانک نبود، نام و دوز را دستی ثبت کن.</Text>}

          {selectedDrug?.guidance ? <View style={styles.guidance}>
            <View style={styles.guidanceHead}><MaterialCommunityIcons name="heart-outline" size={23} color={colors.greenDeep} /><Text style={styles.guidanceTitle}>راهنمای مصرف مکمل</Text></View>
            <Text style={styles.guidanceText}>{selectedDrug.guidance.text}</Text>
            {selectedDrug.guidance.caution ? <Text style={styles.guidanceCaution}>{selectedDrug.guidance.caution}</Text> : null}
            {selectedDrug.guidance.suggestedRoutine ? <Pressable accessibilityRole="button" onPress={() => setRoutine(selectedDrug.guidance?.suggestedRoutine as MedicationRoutine)} style={styles.applyGuide}><Text style={styles.applyGuideText}>تنظیم خودکار: {routineByValue(selectedDrug.guidance.suggestedRoutine)?.short}</Text></Pressable> : null}
          </View> : null}

          <Text style={styles.label}>روزهای مصرف</Text>
          <View style={styles.segmented}>
            <Choice label="هر روز" selected={draft.frequency === 'daily'} onPress={setDaily} grow />
            <Choice label="روزهای مشخص هفته" selected={draft.frequency === 'weekly'} onPress={setSelectedDays} grow />
          </View>
          <View style={styles.weekdays}>{WEEKDAYS.map(day => <Choice key={day.value} label={day.label} selected={draft.frequency === 'weekly' && draft.weekdays.includes(day.value)} onPress={() => chooseDay(day.value)} compact />)}</View>

          <View style={styles.switchRow}>
            <Switch value={differentDose} onValueChange={toggleDifferent} trackColor={{ false: '#d9dedc', true: '#8fc3a5' }} thumbColor={differentDose ? colors.greenDeep : '#fff'} />
            <View style={styles.switchCopy}><Text style={styles.switchTitle}>دوز در بعضی روزها فرق دارد</Text><Text style={styles.switchText}>برای هر روز دوز نسخه را جدا انتخاب کن.</Text></View>
          </View>
          {differentDose ? <View style={styles.dayDoses}>{WEEKDAYS.filter(day => draft.weekdays.includes(day.value)).map(day => (
            <View key={day.value} style={styles.dayDoseRow}>
              <Text style={styles.dayDoseLabel}>{day.label}</Text>
              {selectedDrug ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.inlineDoses}>{selectedDrug.doses.map(dose => <Choice key={dose} label={dose} selected={(draft.doseByWeekday[String(day.value)] || draft.dose) === dose} onPress={() => patch({ doseByWeekday: { ...draft.doseByWeekday, [String(day.value)]: dose } })} compact />)}</ScrollView> : <Field value={draft.doseByWeekday[String(day.value)] || draft.dose} onChangeText={dose => patch({ doseByWeekday: { ...draft.doseByWeekday, [String(day.value)]: dose } })} style={styles.dayDoseField} />}
            </View>
          ))}</View> : null}

          <Text style={styles.label}>زمان مصرف</Text>
          <View style={styles.segmented}>
            <Choice label="ساعت دقیق" selected={!routineMode} onPress={() => patch({ schedules: [newSchedule('exact')] })} grow />
            <Choice label="وعده یا روتین" selected={routineMode} onPress={() => patch({ schedules: [newSchedule('routine', 'breakfast')] })} grow />
          </View>
          {routineMode ? <View style={styles.routines}>{ROUTINES.map(option => <Choice key={option.value} label={option.label} selected={draft.schedules.some(schedule => schedule.routine === option.value)} onPress={() => toggleRoutine(option.value)} icon={option.icon as IconName} />)}</View> : <View style={styles.exactTimes}>
            {draft.schedules.map((schedule, index) => <View key={schedule.id} style={styles.timeRow}><Text style={styles.timeLabel}>نوبت {fa(index + 1)}</Text><Field value={schedule.time} onChangeText={time => updateTime(index, time)} placeholder="08:00" keyboardType="numbers-and-punctuation" maxLength={5} style={styles.timeField} /></View>)}
            {draft.schedules.length < 4 ? <Pressable accessibilityRole="button" onPress={addExactTime} style={styles.addTime}><MaterialCommunityIcons name="plus" size={20} color={colors.greenDeep} /><Text style={styles.addTimeText}>افزودن ساعت دیگر</Text></Pressable> : null}
          </View>}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {medicine ? <Pressable accessibilityRole="button" onPress={() => void onDelete(medicine)} style={styles.deleteButton}><MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.danger} /><Text style={styles.deleteText}>حذف دارو</Text></Pressable> : null}
        </ScrollView>
        <View style={styles.editorFooter}>
          <Pressable accessibilityRole="button" onPress={() => void submit()} style={styles.saveButton}><MaterialCommunityIcons name="content-save-outline" size={22} color={colors.white} /><Text style={styles.saveText}>ذخیره دارو</Text></Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

function Choice({ label, selected, onPress, compact, grow, icon }: { label: string; selected: boolean; onPress: () => void; compact?: boolean; grow?: boolean; icon?: IconName }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={[styles.choice, compact && styles.choiceCompact, grow && styles.choiceGrow, selected && styles.choiceSelected]}>{icon ? <MaterialCommunityIcons name={icon} size={18} color={selected ? colors.white : colors.greenDeep} /> : null}<Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text></Pressable>
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 124 },
  headerAction: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.greenTint },
  hero: { minHeight: 146, borderRadius: 28, padding: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  heroCopy: { flex: 1, alignItems: 'flex-end' },
  greeting: { ...rtlText, fontSize: 30, lineHeight: 42, fontWeight: '900' },
  date: { ...rtlText, color: colors.muted, fontSize: 14, marginTop: 6 },
  progressRing: { width: 83, height: 83, borderRadius: 42, padding: 8, backgroundColor: '#dbe6df', marginRight: 12 },
  progressFill: { flex: 1, borderRadius: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderWidth: 7, borderColor: colors.green },
  progressComplete: { backgroundColor: '#e9f6ee' },
  progressValue: { color: colors.greenDeep, fontSize: 12, fontWeight: '900', writingDirection: 'rtl' },
  sectionHead: { marginTop: 25, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  sectionTitle: { ...rtlText, fontSize: 24, fontWeight: '900' },
  sectionMeta: { ...rtlText, color: colors.muted, fontSize: 12 },
  doseGroup: { marginBottom: 18 },
  groupHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 7, marginBottom: 9, paddingHorizontal: 4 },
  groupTitle: { ...rtlText, color: colors.text, fontSize: 16, fontWeight: '800' },
  doseGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 9 },
  doseTileWrap: { width: '48.5%' },
  doseTile: { minHeight: 116, borderRadius: 23, padding: 13, alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, shadowColor: '#163326', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
  doseTileTaken: { backgroundColor: colors.greenTint, borderColor: '#87bda0' },
  doseCheck: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef4f0', borderWidth: 1, borderColor: colors.border },
  doseCheckTaken: { backgroundColor: colors.greenDeep, borderColor: colors.greenDeep },
  doseName: { ...rtlText, width: '100%', fontSize: 16, fontWeight: '900', marginTop: 8 },
  doseNameTaken: { color: colors.greenDeep },
  doseAmount: { ...rtlText, width: '100%', color: colors.muted, fontSize: 11, marginTop: 3 },
  emptyToday: { padding: 28, borderRadius: 26, alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  emptyIcon: { width: 62, height: 62, borderRadius: 22, backgroundColor: colors.greenTint, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { ...rtlText, fontSize: 19, fontWeight: '900', marginTop: 14 },
  emptyText: { ...rtlText, color: colors.muted, textAlign: 'center', lineHeight: 22, marginTop: 6 },
  emptyAction: { color: colors.greenDeep, fontWeight: '900', fontSize: 15, marginTop: 14 },
  weekCard: { marginTop: 11, padding: 18, borderRadius: 25, flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#f6f8ed', borderWidth: 1, borderColor: '#e2e8d4' },
  weekIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#e2efdf', alignItems: 'center', justifyContent: 'center' },
  weekCopy: { flex: 1, alignItems: 'flex-end' },
  weekTitle: { ...rtlText, fontSize: 18, fontWeight: '900' },
  weekText: { ...rtlText, color: colors.muted, fontSize: 12, lineHeight: 20, marginTop: 5 },
  manageButton: { minHeight: 78, marginTop: 13, paddingHorizontal: 14, borderRadius: 23, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  manageCopy: { flex: 1, alignItems: 'flex-end' },
  manageTitle: { ...rtlText, color: colors.greenDeep, fontWeight: '900', fontSize: 17 },
  manageMeta: { ...rtlText, color: colors.muted, fontSize: 11, marginTop: 3 },
  manageIcon: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.greenTint },
  modalShade: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(12, 31, 23, .28)' },
  sheet: { maxHeight: '88%', minHeight: '56%', paddingHorizontal: 16, paddingBottom: 30, borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: colors.background },
  sheetHandle: { width: 48, height: 5, borderRadius: 3, backgroundColor: '#cbd3cf', alignSelf: 'center', marginTop: 10 },
  sheetHead: { minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { ...rtlText, fontSize: 25, fontWeight: '900' },
  closeButton: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f4f3', borderWidth: 1, borderColor: colors.border },
  addMedicineButton: { minHeight: 58, borderRadius: 19, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.greenDeep },
  addMedicineText: { color: colors.white, fontSize: 16, fontWeight: '900', writingDirection: 'rtl' },
  managerList: { paddingVertical: 14 },
  managerRow: { minHeight: 79, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1, borderBottomColor: colors.border },
  managerRowCopy: { flex: 1, alignItems: 'flex-end' },
  managerRowTitle: { ...rtlText, fontSize: 17, fontWeight: '900' },
  managerRowMeta: { ...rtlText, color: colors.muted, fontSize: 11, marginTop: 5 },
  managerPill: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.greenTint },
  emptyManager: { ...rtlText, textAlign: 'center', color: colors.muted, marginTop: 50 },
  editorPage: { flex: 1, backgroundColor: colors.background },
  editorHead: { minHeight: 92, paddingTop: Platform.OS === 'android' ? 24 : 4, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', gap: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  editorTitleWrap: { flex: 1, alignItems: 'flex-end' },
  editorTitle: { ...rtlText, fontSize: 26, fontWeight: '900' },
  editorSubtitle: { ...rtlText, color: colors.muted, fontSize: 12, marginTop: 3 },
  editorContent: { padding: 18, paddingBottom: 130 },
  label: { ...rtlText, fontSize: 15, fontWeight: '900', marginTop: 18, marginBottom: 9 },
  searchWrap: { minHeight: 56, paddingHorizontal: 12, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  searchField: { flex: 1, borderWidth: 0, backgroundColor: 'transparent', minHeight: 52 },
  suggestions: { marginTop: 7, borderRadius: 19, overflow: 'hidden', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  suggestionRow: { minHeight: 63, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  suggestionCategory: { color: colors.greenDeep, fontSize: 11, fontWeight: '800' },
  suggestionCopy: { flex: 1, alignItems: 'flex-end' },
  suggestionFa: { ...rtlText, fontSize: 15, fontWeight: '900' },
  suggestionEn: { color: colors.muted, fontSize: 11, marginTop: 2 },
  chipGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 },
  choice: { minHeight: 48, paddingHorizontal: 15, borderRadius: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  choiceCompact: { minHeight: 46, paddingHorizontal: 10 },
  choiceGrow: { flex: 1 },
  choiceSelected: { backgroundColor: colors.greenDeep, borderColor: colors.greenDeep },
  choiceText: { color: colors.text, fontSize: 12, fontWeight: '800', writingDirection: 'rtl' },
  choiceTextSelected: { color: colors.white },
  helper: { ...rtlText, color: colors.muted, fontSize: 11, lineHeight: 18, marginTop: 7 },
  guidance: { marginTop: 16, padding: 16, borderRadius: 22, backgroundColor: colors.greenTint, borderWidth: 1, borderColor: '#c8dfd0' },
  guidanceHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  guidanceTitle: { ...rtlText, fontSize: 15, fontWeight: '900' },
  guidanceText: { ...rtlText, fontSize: 12, lineHeight: 20, marginTop: 10 },
  guidanceCaution: { ...rtlText, color: colors.danger, fontSize: 11, lineHeight: 18, marginTop: 7 },
  applyGuide: { minHeight: 45, marginTop: 12, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: '#a9cbb5' },
  applyGuideText: { color: colors.greenDeep, fontSize: 13, fontWeight: '900', writingDirection: 'rtl' },
  segmented: { flexDirection: 'row-reverse', gap: 7, padding: 4, borderRadius: 18, backgroundColor: '#eef1ef' },
  weekdays: { marginTop: 9, flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 7 },
  switchRow: { minHeight: 76, marginTop: 14, paddingHorizontal: 14, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  switchCopy: { flex: 1, alignItems: 'flex-end' },
  switchTitle: { ...rtlText, fontSize: 14, fontWeight: '900' },
  switchText: { ...rtlText, color: colors.muted, fontSize: 10, marginTop: 4 },
  dayDoses: { marginTop: 8, gap: 8 },
  dayDoseRow: { minHeight: 70, padding: 10, borderRadius: 18, backgroundColor: colors.greenTint },
  dayDoseLabel: { ...rtlText, fontSize: 13, fontWeight: '900', marginBottom: 7 },
  inlineDoses: { gap: 6 },
  dayDoseField: { minHeight: 45 },
  routines: { gap: 8 },
  exactTimes: { gap: 8 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeLabel: { ...rtlText, flex: 1, fontSize: 13, fontWeight: '800' },
  timeField: { width: 118, minHeight: 48, textAlign: 'center', writingDirection: 'ltr' },
  addTime: { minHeight: 48, borderRadius: 16, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: '#8cb79d' },
  addTimeText: { color: colors.greenDeep, fontWeight: '900', writingDirection: 'rtl' },
  error: { ...rtlText, color: colors.danger, fontSize: 13, marginTop: 14 },
  deleteButton: { minHeight: 52, marginTop: 20, borderRadius: 17, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff3f1' },
  deleteText: { color: colors.danger, fontWeight: '900', writingDirection: 'rtl' },
  editorFooter: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 18, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 26 : 16, backgroundColor: 'rgba(255,255,255,.97)', borderTopWidth: 1, borderTopColor: colors.border },
  saveButton: { minHeight: 58, borderRadius: 19, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.greenDeep, shadowColor: colors.greenDeep, shadowOpacity: 0.24, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  saveText: { color: colors.white, fontSize: 17, fontWeight: '900', writingDirection: 'rtl' },
})
