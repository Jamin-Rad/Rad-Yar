'use client'
import { useState, useEffect, useRef } from 'react'
import s from './health.module.css'
import {
  sportarten, sportKategorien,
  lebensmittel, kategorien,
} from '@/data/health'

const SPORT_ICONS = {
  ausdauer: '🏃', kraft: '💪', entspannung: '🧘',
  mannschaft: '⚽', alltag: '🚶', custom: '⭐',
}
const FOOD_ICONS = {
  haupt: '🫕', kebab: '🍖', reis: '🍚', brot: '🍞',
  fruehstueck: '🍳', fleisch: '🥩', gemuese: '🥗',
  obst: '🍎', getraenke: '🥛', sonstiges: '🍽️',
}
const UNIT_BY_CATEGORY = {
  getraenke: 'Glas',
  obst: 'Stück',
  brot: 'Scheibe',
  gemuese: 'Schüssel',
}
const UNIT_PLURALS = {
  Portion: 'Portionen',
  Glas: 'Gläser',
  Tasse: 'Tassen',
  Stück: 'Stück',
  Scheibe: 'Scheiben',
  Schüssel: 'Schüsseln',
  Spieß: 'Spieße',
  Blatt: 'Blätter',
  Esslöffel: 'Esslöffel',
  Teelöffel: 'Teelöffel',
  Patty: 'Pattys',
  Dose: 'Dosen',
  Kugel: 'Kugeln',
}
const FOOD_UNITS = Object.keys(UNIT_PLURALS)
const MACRO_PROFILES = {
  haupt: { protein: .055, sugar: .018, fat: .045 },
  kebab: { protein: .12, sugar: .012, fat: .095 },
  reis: { protein: .026, sugar: .002, fat: .006 },
  brot: { protein: .085, sugar: .035, fat: .035 },
  fruehstueck: { protein: .09, sugar: .055, fat: .07 },
  fleisch: { protein: .2, sugar: .004, fat: .09 },
  gemuese: { protein: .025, sugar: .025, fat: .018 },
  obst: { protein: .008, sugar: .11, fat: .003 },
  getraenke: { protein: .01, sugar: .06, fat: .006 },
  sonstiges: { protein: .055, sugar: .22, fat: .16 },
}

const TODAY = new Date().toISOString().slice(0, 10)
const RING_R = 50
const RING_C = 2 * Math.PI * RING_R
const SPORT_MINUTES = [10, 20, 30, 45, 60, 90]
const FOOD_AMOUNTS = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4]
const ACTIVITY_LEVELS = [
  { id: 'low', label: 'Wenig aktiv', factor: 1.2 },
  { id: 'light', label: 'Leicht aktiv', factor: 1.375 },
  { id: 'moderate', label: 'Mittel aktiv', factor: 1.55 },
  { id: 'high', label: 'Sehr aktiv', factor: 1.725 },
]
const DAY_MS = 86400000
const WEEKDAY_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const DEFAULT_CALORIE_PLAN = {
  currentWeight: '',
  targetWeight: '',
  weeks: '12',
  sex: 'male',
  activity: 'moderate',
  height: '',
  age: '',
}

async function apiRequest(apiBase, path, method = 'GET', body) {
  const res = await fetch(`${apiBase}${path}`, {
    method,
    cache: 'no-store',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || 'Speichern fehlgeschlagen')
  return data
}

const EMPTY_FORM = { date: TODAY, weight: '', note: '', manualKcal: 0, sports: [], foods: [] }

function dateValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function weekDaysFor(value = TODAY) {
  const current = new Date(`${value}T12:00:00`)
  const monday = new Date(current)
  monday.setDate(current.getDate() - ((current.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return dateValue(date)
  })
}

function formatAmount(value) {
  const exact = Number(value)
  if (exact === 0.25) return '¼'
  if (exact === 0.5) return '½'
  if (exact === 0.75) return '¾'
  if (exact === 1.5) return '1½'
  if (exact === 2.5) return '2½'
  return Number.isInteger(exact) ? String(exact) : exact.toString().replace('.', ',')
}

function unitForFood(food) {
  return food?.unit || UNIT_BY_CATEGORY[food?.cat] || 'Portion'
}

function unitLabel(unit, amount) {
  return Number(amount) === 1 ? unit : (UNIT_PLURALS[unit] || unit)
}

function foodAmountText(food, grams) {
  const portionG = food?.portionG || 100
  const amount = portionG ? grams / portionG : 1
  const unit = unitForFood(food)
  return `${formatAmount(amount)} ${unitLabel(unit, amount)}`
}

function formatHealthDate(value) {
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return 'Heute'
  return date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })
}

function estimateMacros(food, grams) {
  const profile = MACRO_PROFILES[food?.cat] || MACRO_PROFILES.sonstiges
  return {
    protein: Math.round(grams * profile.protein),
    sugar: Math.round(grams * profile.sugar),
    fat: Math.round(grams * profile.fat),
  }
}

export default function HealthPage({ apiBase = '/api/admin/health' }) {
  const [tab, setTab] = useState('eintragen')
  const [records, setRecords] = useState([])
  const [customSports, setCustomSports] = useState([])
  const [deletedSports, setDeletedSports] = useState([])
  const [customFoods, setCustomFoods] = useState([])
  const [deletedFoods, setDeletedFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const [picker, setPicker] = useState(null)
  const [weightOpen, setWeightOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [mgmtMode, setMgmtMode] = useState('sport')
  const [newSport, setNewSport] = useState({ de: '', kcalPerMin: '' })
  const [newFood, setNewFood] = useState({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '', unit: 'Portion' })
  const [caloriePlan, setCaloriePlan] = useState(DEFAULT_CALORIE_PLAN)
  const sparkPathRef = useRef(null)
  const activeWeightRef = useRef(null)
  const loadedRef = useRef(false)
  const saveTimerRef = useRef(null)
  const lastSavedRef = useRef('')
  const settingsLoadedRef = useRef(false)
  const settingsTimerRef = useRef(null)
  const lastSavedSettingsRef = useRef('')
  const api = (path, method = 'GET', body) => apiRequest(apiBase, path, method, body)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [data, settings] = await Promise.all([
        api('/'),
        api('/settings').catch(() => ({})),
      ])
      setRecords(data.records || [])
      setCustomSports(data.customSports || [])
      setDeletedSports(data.deletedSports || [])
      setCustomFoods(data.customFoods || [])
      setDeletedFoods(data.deletedFoods || [])
      const today = (data.records || []).find(r => r.date === TODAY)
      if (today) {
        const nextForm = {
          date: today.date,
          weight: today.weight ?? '',
          note: today.note ?? '',
          manualKcal: today.manual_kcal ?? 0,
          sports: today.sports ?? [],
          foods: today.foods ?? [],
        }
        setForm(nextForm)
        lastSavedRef.current = JSON.stringify(nextForm)
      } else {
        lastSavedRef.current = JSON.stringify(EMPTY_FORM)
      }
      const loadedPlan = settings.caloriePlan && typeof settings.caloriePlan === 'object'
        ? { ...DEFAULT_CALORIE_PLAN, ...settings.caloriePlan }
        : DEFAULT_CALORIE_PLAN
      setCaloriePlan(loadedPlan)
      lastSavedSettingsRef.current = JSON.stringify(loadedPlan)
      loadedRef.current = true
      settingsLoadedRef.current = true
      setSaveMessage('')
    } catch (error) {
      setSaveMessage(error.message || 'Daten konnten nicht geladen werden.')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!loadedRef.current || loading) return undefined

    const serialized = JSON.stringify(form)
    if (serialized === lastSavedRef.current) return undefined

    const hasContent = form.weight || form.note || form.manualKcal || form.sports.length || form.foods.length
    const existingRecord = records.some(record => record.date === form.date)
    if (!hasContent && !existingRecord) return undefined

    setSaving(true)
    setSaveMessage('Speichert automatisch…')
    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveCurrentForm(form, serialized)
    }, 700)

    return () => clearTimeout(saveTimerRef.current)
  }, [form, loading, records])

  useEffect(() => {
    if (!settingsLoadedRef.current || loading) return undefined

    const serialized = JSON.stringify(caloriePlan)
    if (serialized === lastSavedSettingsRef.current) return undefined

    clearTimeout(settingsTimerRef.current)
    settingsTimerRef.current = setTimeout(async () => {
      try {
        await api('/settings', 'POST', { caloriePlan })
        lastSavedSettingsRef.current = serialized
      } catch (error) {
        setSaveMessage(error.message || 'Kalorienziel konnte nicht gespeichert werden.')
      }
    }, 700)

    return () => clearTimeout(settingsTimerRef.current)
  }, [caloriePlan, loading])

  // Animate sparkline on mount/change
  useEffect(() => {
    const el = sparkPathRef.current
    if (!el) return
    const len = el.getTotalLength?.()
    if (!len) return
    el.style.transition = 'none'
    el.style.strokeDasharray = len
    el.style.strokeDashoffset = len
    requestAnimationFrame(() => {
      el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)'
      el.style.strokeDashoffset = 0
    })
  }, [records])

  const activeSports = [
    ...sportarten.filter(sp => !deletedSports.includes(sp.id)),
    ...customSports.map(cs => ({
      id: cs.id, cat: 'custom', de: cs.de, fa: cs.fa || '',
      kcalPerMin: cs.kcal_per_min,
    })),
  ]
  const activeFoods = [
    ...lebensmittel.filter(lm => !deletedFoods.includes(lm.id)),
    ...customFoods.map(cf => ({
      id: cf.id, cat: cf.cat || 'sonstiges', de: cf.de, fa: cf.fa || '',
      kcalPer100g: cf.kcal_per_100g, portionG: cf.portion_g || 100,
      unit: cf.unit || UNIT_BY_CATEGORY[cf.cat] || 'Portion',
    })),
  ]

  const sportCatsWithCount = [
    ...sportKategorien.map(sc => ({
      ...sc, icon: SPORT_ICONS[sc.id] || '🏅',
      count: activeSports.filter(sp => sp.cat === sc.id).length,
    })).filter(sc => sc.count > 0),
    ...(activeSports.some(sp => sp.cat === 'custom') ? [{
      id: 'custom', de: 'Benutzerdefiniert', icon: '⭐',
      count: activeSports.filter(sp => sp.cat === 'custom').length,
    }] : []),
  ]

  const usedFoodCatIds = [...new Set(activeFoods.map(f => f.cat))]
  const foodCatsWithCount = [
    ...kategorien.filter(k => usedFoodCatIds.includes(k.id)).map(k => ({
      ...k, icon: FOOD_ICONS[k.id] || '🍽️',
      count: activeFoods.filter(f => f.cat === k.id).length,
    })),
    ...(usedFoodCatIds.includes('sonstiges') ? [{
      id: 'sonstiges', de: 'Sonstige', icon: '🍽️',
      count: activeFoods.filter(f => f.cat === 'sonstiges').length,
    }] : []),
  ]

  const totalSportKcal = form.sports.reduce((sum, item) => {
    const sp = activeSports.find(x => x.id === item.id)
    return sum + (sp ? Math.round(sp.kcalPerMin * item.min) : 0)
  }, 0)
  const totalFoodKcal = form.foods.reduce((sum, item) => {
    const food = activeFoods.find(x => x.id === item.id)
    return sum + (food ? Math.round((food.kcalPer100g / 100) * (item.g ?? (item.count != null ? item.count * food.portionG : 0))) : 0)
  }, 0)
  const todayMacros = form.foods.reduce((sum, item) => {
    const food = activeFoods.find(x => x.id === item.id)
    if (!food) return sum
    const grams = item.g ?? (item.count != null ? item.count * food.portionG : 0)
    const macros = estimateMacros(food, grams)
    return {
      protein: sum.protein + macros.protein,
      sugar: sum.sugar + macros.sugar,
      fat: sum.fat + macros.fat,
    }
  }, { protein: 0, sugar: 0, fat: 0 })
  const totalKcal = totalFoodKcal + (form.manualKcal || 0) - totalSportKcal
  const foodFraction  = Math.min((totalFoodKcal + (form.manualKcal || 0)) / 2000, 1)
  const sportFraction = Math.min(totalSportKcal / 2000, 1)
  const latestWeight = [...records].filter(record => record.weight).sort((a, b) => b.date.localeCompare(a.date))[0]?.weight || ''
  const previousWeight = [...records]
    .filter(record => record.weight && record.date < TODAY)
    .sort((a, b) => b.date.localeCompare(a.date))[0]?.weight || ''
  const weightBase = parseFloat(form.weight || previousWeight || caloriePlan.currentWeight || latestWeight || 80)
  const weightStart = Math.max(30, Math.round((weightBase - 4) * 10) / 10)
  const weightOptions = Array.from({ length: 81 }, (_, index) => (Math.round((weightStart + index * 0.1) * 10) / 10).toFixed(1))
  const activeWeight = (parseFloat(form.weight || weightBase) || weightBase).toFixed(1)

  useEffect(() => {
    if (!weightOpen) return
    requestAnimationFrame(() => {
      activeWeightRef.current?.scrollIntoView({ block: 'center' })
    })
  }, [weightOpen, activeWeight])

  const planCurrentWeight = parseFloat(caloriePlan.currentWeight || form.weight || latestWeight || 0)
  const planTargetWeight = parseFloat(caloriePlan.targetWeight || 0)
  const planWeeks = Math.max(parseInt(caloriePlan.weeks) || 1, 1)
  const planHeight = parseFloat(caloriePlan.height || 0)
  const planAge = parseInt(caloriePlan.age) || 0
  const activityFactor = ACTIVITY_LEVELS.find(level => level.id === caloriePlan.activity)?.factor || 1.55
  const bmr = planCurrentWeight && planHeight && planAge
    ? Math.round((10 * planCurrentWeight) + (6.25 * planHeight) - (5 * planAge) + (caloriePlan.sex === 'female' ? -161 : 5))
    : null
  const maintenanceKcal = bmr ? Math.round(bmr * activityFactor) : null
  const planDailyDelta = planCurrentWeight && planTargetWeight
    ? Math.round(((planTargetWeight - planCurrentWeight) * 7700) / (planWeeks * 7))
    : 0
  const recommendedKcal = maintenanceKcal && planTargetWeight ? Math.max(caloriePlan.sex === 'female' ? 1200 : 1500, maintenanceKcal + planDailyDelta) : null
  const planWeeklyChange = planCurrentWeight && planTargetWeight
    ? ((planTargetWeight - planCurrentWeight) / planWeeks).toFixed(2)
    : null

  function openPicker(type) {
    setPicker({ type, step: 'cats', catId: null })
    setActiveId(null)
  }

  function closePicker() {
    setPicker(null)
    setActiveId(null)
  }

  function selectPickerCat(catId) {
    setPicker(prev => prev ? { ...prev, step: 'items', catId } : prev)
    setActiveId(null)
  }

  function chooseSportMinutes(id, min) {
    setForm(f => ({ ...f, sports: [...f.sports.filter(x => x.id !== id), { id, min }] }))
    setActiveId(null)
    closePicker()
  }

  function chooseFoodAmount(food, amount) {
    const g = Math.round((food.portionG || 100) * amount)
    setForm(f => ({ ...f, foods: [...f.foods.filter(x => x.id !== food.id), { id: food.id, g }] }))
    setActiveId(null)
    closePicker()
  }
  function removeSportFromForm(id) { setForm(f => ({ ...f, sports: f.sports.filter(x => x.id !== id) })) }
  function removeFoodFromForm(id)  { setForm(f => ({ ...f, foods:  f.foods.filter(x => x.id !== id) })) }

  async function saveCurrentForm(snapshot, serialized) {
    try {
      await api('/records', 'POST', {
        id: `record-${snapshot.date}`, date: snapshot.date,
        weight: snapshot.weight ? parseFloat(snapshot.weight) : null,
        note: snapshot.note || '', manual_kcal: snapshot.manualKcal || 0,
        sports: snapshot.sports, foods: snapshot.foods,
      })
      lastSavedRef.current = serialized
      setRecords(current => {
        const record = {
          id: `record-${snapshot.date}`,
          date: snapshot.date,
          weight: snapshot.weight ? parseFloat(snapshot.weight) : null,
          note: snapshot.note || '',
          manual_kcal: snapshot.manualKcal || 0,
          sports: snapshot.sports,
          foods: snapshot.foods,
          updated_at: new Date().toISOString(),
        }
        return [record, ...current.filter(item => item.date !== snapshot.date)]
          .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
      })
      setSaveMessage('Automatisch gespeichert.')
    } catch (error) {
      setSaveMessage(error.message || 'Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  async function handleAddSport(e) {
    e.preventDefault()
    if (!newSport.de || !newSport.kcalPerMin) return
    const id = 'custom-' + newSport.de.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    await api('/sports', 'POST', { id, de: newSport.de, fa: '', kcalPerMin: parseFloat(newSport.kcalPerMin) })
    setNewSport({ de: '', kcalPerMin: '' }); loadAll()
  }
  async function handleAddFood(e) {
    e.preventDefault()
    if (!newFood.de || !newFood.kcalPer100g) return
    const id = 'custom-' + newFood.de.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    await api('/foods', 'POST', {
      id, de: newFood.de, fa: '', cat: newFood.cat,
      kcalPer100g: parseInt(newFood.kcalPer100g),
      portionG: parseInt(newFood.portionG) || 100,
      unit: newFood.unit || UNIT_BY_CATEGORY[newFood.cat] || 'Portion',
    })
    setNewFood({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '', unit: 'Portion' }); loadAll()
  }
  async function deleteSport(id, isCustom) { await api(`/sports?id=${id}&custom=${isCustom}`, 'DELETE'); loadAll() }
  async function deleteFood(id, isCustom)  { await api(`/foods?id=${id}&custom=${isCustom}`, 'DELETE'); loadAll() }
  async function restoreSport(id) { await api('/sports', 'PATCH', { id }); loadAll() }
  async function restoreFood(id)  { await api('/foods',  'PATCH', { id }); loadAll() }

  const pickerSportItems = picker?.catId ? activeSports.filter(sp => sp.cat === picker.catId) : []
  const pickerFoodItems  = picker?.catId ? activeFoods.filter(f => f.cat === picker.catId) : []

  const weightSeries = [...records]
    .filter(r => r.weight)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-8)
  const weekDays = weekDaysFor(TODAY)
  const recordsByDate = new Map(records.map(record => [record.date, record]))

  function caloriesForRecord(rec) {
    if (!rec) return { foodKcal: 0, sportKcal: 0, net: 0 }
    const sportKcal = (rec.sports || []).reduce((sum, item) => {
      const sp = activeSports.find(x => x.id === item.id)
      return sum + (sp ? Math.round(sp.kcalPerMin * item.min) : 0)
    }, 0)
    const foodKcal = (rec.foods || []).reduce((sum, item) => {
      const food = activeFoods.find(x => x.id === item.id)
      return sum + (food ? Math.round((food.kcalPer100g / 100) * (item.g ?? (item.count != null ? item.count * food.portionG : 0))) : 0)
    }, 0)
    return { foodKcal, sportKcal, net: foodKcal + (rec.manual_kcal || 0) - sportKcal }
  }

  const weekData = weekDays.map((day, index) => {
    const rec = recordsByDate.get(day)
    const kcal = caloriesForRecord(rec)
    return {
      day,
      label: WEEKDAY_SHORT[index],
      rec,
      ...kcal,
    }
  })
  const weekMax = Math.max(1, ...weekData.map(day => Math.max(day.foodKcal, day.sportKcal, Math.abs(day.net))))
  const weekTotals = weekData.reduce((totals, day) => ({
    foodKcal: totals.foodKcal + day.foodKcal,
    sportKcal: totals.sportKcal + day.sportKcal,
    net: totals.net + day.net,
  }), { foodKcal: 0, sportKcal: 0, net: 0 })
  const weekTarget = recommendedKcal ? recommendedKcal * 7 : null
  const weekDelta = weekTarget ? weekTotals.net - weekTarget : null

  if (loading) return (
    <div className={s.page}>
      <div aria-hidden="true" className={s.orbA} />
      <div aria-hidden="true" className={s.orbB} />
      <div aria-hidden="true" className={s.orbC} />
      <div className={s.loadingHero}>
        <div className={s.loadingRing} />
        <p>Lädt…</p>
      </div>
    </div>
  )

  return (
    <div className={s.page}>
      {/* Background orbs */}
      <div aria-hidden="true" className={s.orbA} />
      <div aria-hidden="true" className={s.orbB} />
      <div aria-hidden="true" className={s.orbC} />

      <div className={s.inner}>

        <header className={s.simpleHero}>
          <h1 className={s.heroTitle}>Gesundheit</h1>
        </header>

        <div className={s.tabRow}>
          {[['eintragen', 'Heute'], ['verlauf', 'Verlauf'], ['einstellung', 'Einstellung']].map(([id, label]) => (
            <button key={id} type="button" className={tab === id ? s.tabActive : s.tab} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'eintragen' && (
          <div className={s.todayView}>
            <section className={s.todayDashboard}>
              <div className={s.todayKcalCard}>
                <div className={s.todayRing}>
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={RING_R} className={s.ringTrack} />
                    <circle cx="60" cy="60" r={RING_R} className={s.ringFood}
                      style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C * (1 - foodFraction) }}
                    />
                    {sportFraction > 0 && (
                      <circle cx="60" cy="60" r={RING_R} className={s.ringSport}
                        style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C * (1 - sportFraction) }}
                      />
                    )}
                  </svg>
                  <div>
                    <strong>{totalKcal}</strong>
                    <span>kcal netto</span>
                  </div>
                </div>
                <div className={s.todayKcalRows}>
                  <div><span>Gegessen</span><strong>+{totalFoodKcal + (form.manualKcal || 0)}</strong></div>
                  <div><span>Sport</span><strong>−{totalSportKcal}</strong></div>
                </div>
              </div>
              <div className={s.macroPanel}>
                {[
                  ['Protein', todayMacros.protein, 120, s.macroProtein],
                  ['Zucker', todayMacros.sugar, 90, s.macroSugar],
                  ['Fett', todayMacros.fat, 80, s.macroFat],
                ].map(([label, value, max, className]) => (
                  <div className={s.macroRow} key={label}>
                    <div><span>{label}</span><strong>{value} g</strong></div>
                    <div className={s.macroTrack}><i className={className} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className={s.todayDetailGrid}>
                <div>
                  <h3>Gegessen</h3>
                  {form.foods.length ? form.foods.map(item => {
                    const food = activeFoods.find(x => x.id === item.id)
                    if (!food) return null
                    const g = item.g ?? (item.count != null ? item.count * food.portionG : 0)
                    const kcal = Math.round((food.kcalPer100g / 100) * g)
                    return <span key={item.id}>{food.de} · {foodAmountText(food, g)} · {kcal} kcal</span>
                  }) : <span>Keine Mahlzeit eingetragen</span>}
                </div>
                <div>
                  <h3>Sport</h3>
                  {form.sports.length ? form.sports.map(item => {
                    const sp = activeSports.find(x => x.id === item.id)
                    if (!sp) return null
                    return <span key={item.id}>{sp.de} · {item.min} min · −{Math.round(sp.kcalPerMin * item.min)} kcal</span>
                  }) : <span>Kein Sport eingetragen</span>}
                </div>
              </div>
            </section>

            <section className={s.todayActionPanel}>
              <div className={s.todayPanelHead}>
                <span>{formatHealthDate(TODAY)}</span>
                <strong>{saving ? 'Speichert…' : saveMessage && !saveMessage.includes('fehl') && !saveMessage.includes('nicht') ? 'Gespeichert' : 'Heute'}</strong>
              </div>
              <div className={s.todayActions}>
                <button className={s.todayActionWeight} type="button" onClick={() => setWeightOpen(true)}>
                  <i className={s.actionVisual} aria-hidden="true" />
                  <span>Gewicht</span>
                </button>
                <button className={s.todayActionSport} type="button" onClick={() => openPicker('sport')}>
                  <i className={s.actionVisual} aria-hidden="true" />
                  <span>Sport</span>
                </button>
                <button className={s.todayActionFood} type="button" onClick={() => openPicker('food')}>
                  <i className={s.actionVisual} aria-hidden="true" />
                  <span>Essen</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {tab === 'eintragen' && weightOpen && (
          <div className={s.pickerBackdrop} role="dialog" aria-modal="true" aria-label="Gewicht eintragen" onClick={() => setWeightOpen(false)}>
            <div className={s.weightModal} onClick={event => event.stopPropagation()}>
              <header className={s.pickerHeader}>
                <button className={s.backBtn} type="button" onClick={() => setWeightOpen(false)} aria-label="Gewicht schließen">×</button>
                <div>
                  <span className={s.pickerKicker}>Gewicht</span>
                  <h2>Heute wählen</h2>
                </div>
              </header>
              <div className={s.weightPicker}>
                <div className={s.weightCurrent}>
                  <span>Startwert</span>
                  <strong>{activeWeight} kg</strong>
                </div>
                <div className={s.weightWheel} role="listbox" aria-label="Gewicht auswählen">
                  {weightOptions.map(value => (
                    <button
                      key={value}
                      ref={value === activeWeight ? activeWeightRef : null}
                      type="button"
                      className={value === activeWeight ? s.weightOptionActive : s.weightOption}
                      onClick={() => setForm(f => ({ ...f, weight: value, date: TODAY }))}
                      aria-selected={value === activeWeight}
                    >
                      {value} kg
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'eintragen' && picker && (
          <div className={s.pickerBackdrop} role="dialog" aria-modal="true" aria-label={picker.type === 'sport' ? 'Sport auswählen' : 'Essen auswählen'} onClick={closePicker}>
            <div className={s.pickerModal} onClick={event => event.stopPropagation()}>
              <header className={s.pickerHeader}>
                <button
                  className={s.backBtn}
                  type="button"
                  onClick={() => picker.step === 'items' ? setPicker(prev => ({ ...prev, step: 'cats', catId: null })) : closePicker()}
                  aria-label={picker.step === 'items' ? 'Zurück zu Kategorien' : 'Auswahl schließen'}
                >
                  {picker.step === 'items' ? '←' : '×'}
                </button>
                <div>
                  <span className={s.pickerKicker}>{picker.type === 'sport' ? 'Sport' : 'Essen'}</span>
                  <h2>
                    {picker.step === 'cats'
                      ? 'Kategorie auswählen'
                      : picker.type === 'sport'
                        ? sportCatsWithCount.find(cat => cat.id === picker.catId)?.de
                        : foodCatsWithCount.find(cat => cat.id === picker.catId)?.de}
                  </h2>
                </div>
              </header>

              {picker.step === 'cats' && (
                <div className={s.catTileGrid + ' ' + s.pickerCatGrid}>
                  {(picker.type === 'sport' ? sportCatsWithCount : foodCatsWithCount).map(cat => (
                    <button
                      key={cat.id}
                      className={`${s.catTile} ${picker.type === 'food' ? s.catTileFood : ''}`}
                      type="button"
                      onClick={() => selectPickerCat(cat.id)}
                    >
                      <span className={s.catTileEmoji}>{cat.icon}</span>
                      <span className={s.catTileName}>{cat.de}</span>
                      <span className={s.catTileCount}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              )}

              {picker.step === 'items' && picker.type === 'sport' && (
                <div className={s.pickerList}>
                  {pickerSportItems.map(sp => {
                    const existing = form.sports.find(x => x.id === sp.id)
                    const isActive = activeId === sp.id
                    return (
                      <div className={`${s.pickerItem} ${existing ? s.pickerItemSelected : ''}`} key={sp.id}>
                        <button className={s.pickerItemButton} type="button" onClick={() => setActiveId(isActive ? null : sp.id)}>
                          <span className={s.itemAvatar}>{sp.de.slice(0, 2).toUpperCase()}</span>
                          <span className={s.pickerItemText}>
                            <strong>{sp.de}</strong>
                            <small>{sp.kcalPerMin} kcal/min{existing ? ` · ${existing.min} min gewählt` : ''}</small>
                          </span>
                          <span className={s.itemToggle}>{isActive ? '×' : '+'}</span>
                        </button>
                        {isActive && (
                          <div className={s.choiceGrid}>
                            {SPORT_MINUTES.map(min => (
                              <button key={min} className={existing?.min === min ? s.choiceActive : s.choiceBtn} type="button" onClick={() => chooseSportMinutes(sp.id, min)}>
                                <strong>{min} min</strong>
                                <span>{Math.round(sp.kcalPerMin * min)} kcal</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {picker.step === 'items' && picker.type === 'food' && (
                <div className={s.pickerList}>
                  {pickerFoodItems.map(food => {
                    const existing = form.foods.find(x => x.id === food.id)
                    const isActive = activeId === food.id
                    const currentG = existing?.g ?? (existing?.count != null ? existing.count * food.portionG : null)
                    const unit = unitForFood(food)
                    return (
                      <div className={`${s.pickerItem} ${existing ? s.pickerItemSelectedFood : ''}`} key={food.id}>
                        <button className={s.pickerItemButton} type="button" onClick={() => setActiveId(isActive ? null : food.id)}>
                          <span className={s.itemAvatar + ' ' + s.itemAvatarFood}>{food.de.slice(0, 2).toUpperCase()}</span>
                          <span className={s.pickerItemText}>
                            <strong>{food.de}</strong>
                            <small>
                              {food.kcalPer100g} kcal/100g · 1 {unit} ≈ {food.portionG}g
                              {currentG ? ` · ${foodAmountText(food, currentG)} gewählt` : ''}
                            </small>
                          </span>
                          <span className={s.itemToggle}>{isActive ? '×' : '+'}</span>
                        </button>
                        {isActive && (
                          <div className={s.amountPicker}>
                            <div className={s.amountPickerHint}>Menge wählen</div>
                            <div className={s.amountPickerRail} role="listbox" aria-label={`${food.de} Menge`}>
                              {FOOD_AMOUNTS.map(amount => {
                              const g = Math.round((food.portionG || 100) * amount)
                              const kcal = Math.round((food.kcalPer100g / 100) * g)
                              return (
                                <button key={amount} className={currentG === g ? s.amountOptionActive : s.amountOption} type="button" onClick={() => chooseFoodAmount(food, amount)} role="option" aria-selected={currentG === g}>
                                  <strong>{formatAmount(amount)} {unitLabel(unit, amount)}</strong>
                                  <span>{g}g · {kcal} kcal</span>
                                </button>
                              )
                            })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Verlauf ── */}
        {tab === 'verlauf' && (
          <div className={s.historyView}>
            <section className={s.weekPanel}>
              <header className={s.weekHeader}>
                <div>
                  <span className={s.sparkLabel}>Wochenview</span>
                  <h2>Diese Woche</h2>
                </div>
                <div className={s.weekTotals}>
                  <span><strong>{weekTotals.foodKcal}</strong> gegessen</span>
                  <span><strong>{weekTotals.sportKcal}</strong> verbrannt</span>
                  <span><strong>{weekTotals.net}</strong> netto</span>
                  {weekDelta !== null && (
                    <span className={weekDelta > 0 ? s.overTarget : s.underTarget}>
                      <strong>{weekDelta > 0 ? '+' : ''}{weekDelta}</strong> {weekDelta > 0 ? 'über Ziel' : 'unter Ziel'}
                    </span>
                  )}
                </div>
              </header>

              <div className={s.weekChart} aria-label="Kalorien pro Woche">
                {weekData.map(day => {
                  const dateObj = new Date(`${day.day}T12:00:00`)
                  const foodHeight = Math.max(4, Math.round((day.foodKcal / weekMax) * 100))
                  const sportHeight = Math.max(4, Math.round((day.sportKcal / weekMax) * 100))
                  return (
                    <div className={s.weekDay} key={day.day}>
                      <div className={s.weekBars}>
                        <span className={s.weekFoodBar} style={{ height: `${day.foodKcal ? foodHeight : 4}%` }} />
                        <span className={s.weekSportBar} style={{ height: `${day.sportKcal ? sportHeight : 4}%` }} />
                      </div>
                      <strong>{day.label}</strong>
                      <small>{dateObj.getDate()}</small>
                    </div>
                  )
                })}
              </div>
            </section>

            {weightSeries.length >= 2 && (() => {
              const weights = weightSeries.map(d => d.weight)
              const min = Math.min(...weights)
              const max = Math.max(...weights)
              const range = max - min || 1
              const W = weightSeries.length * 50
              const pts = weightSeries.map((d, i) => [i * 50 + 8, 52 - ((d.weight - min) / range) * 40])
              const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
              const areaD = `${pathD} L${pts[pts.length - 1][0]},60 L${pts[0][0]},60 Z`
              return (
                <div className={s.sparkCard}>
                  <div className={s.sparkHeader}>
                    <span className={s.sparkLabel}>Gewichtsverlauf</span>
                    <span className={s.sparkRange}>{weights[0]} → {weights[weights.length - 1]} kg</span>
                  </div>
                  <svg className={s.sparkSvg} viewBox={`0 0 ${W} 60`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={areaD} fill="url(#sparkGrad)" />
                    <path ref={sparkPathRef} d={pathD} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#818cf8" />)}
                  </svg>
                  <div className={s.sparkDots}>
                    {weightSeries.map((d, i) => <span key={i}>{d.weight}</span>)}
                  </div>
                </div>
              )
            })()}

            <div className={s.historyList}>
              {[...records].sort((a, b) => b.date.localeCompare(a.date)).map((rec, idx) => {
                const { foodKcal, sportKcal, net } = caloriesForRecord(rec)
                const targetDelta = recommendedKcal ? net - recommendedKcal : null
                const dateObj = new Date(rec.date + 'T12:00:00')
                return (
                  <div key={rec.id} className={s.historyCard} style={{ animationDelay: `${idx * 0.04}s` }}>
                    <div className={s.historyDate}>
                      <div className={s.historyDay}>{dateObj.getDate()}</div>
                      <div className={s.historyMonth}>{dateObj.toLocaleDateString('de-DE', { month: 'short' })}</div>
                    </div>
                    <div className={s.historyBody}>
                      <div className={s.historyMeta}>
                        {rec.weight && <span className={s.historyTag + ' ' + s.historyTagWeight}>{rec.weight} kg</span>}
                        {(rec.sports || []).length > 0 && <span className={s.historyTag + ' ' + s.historyTagSport}>{(rec.sports || []).length} Sport</span>}
                        {(rec.foods || []).length > 0 && <span className={s.historyTag + ' ' + s.historyTagFood}>{(rec.foods || []).length} Mahlzeiten</span>}
                        {targetDelta !== null && (
                          <span className={`${s.historyTag} ${targetDelta > 0 ? s.historyTagOver : s.historyTagUnder}`}>
                            {targetDelta > 0 ? '+' : ''}{targetDelta} zum Ziel
                          </span>
                        )}
                      </div>
                      <div className={s.kcalBar}>
                        <div className={s.kcalBarFood} style={{ width: `${Math.min((foodKcal / 2500) * 100, 100)}%` }} />
                        <div className={s.kcalBarSport} style={{ width: `${Math.min((sportKcal / 2500) * 100, 100)}%` }} />
                      </div>
                      {rec.note && <div className={s.historyNote}>{rec.note}</div>}
                    </div>
                    <div className={s.historyNet}>
                      <div className={s.historyNetNum}>{net}</div>
                      <div className={s.historyNetLabel}>kcal</div>
                    </div>
                    <button className={s.historyDel}
                      onClick={async () => { await api(`/records?id=${rec.id}`, 'DELETE'); loadAll() }}>×</button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'einstellung' && (
          <div className={s.mgmtView}>
            <section className={s.goalCard}>
              <div className={s.goalCopy}>
                <span className={s.sparkLabel}>Kalorienziel</span>
                <h2>Tägliche Empfehlung</h2>
              </div>
              <div className={s.goalForm}>
                <label>Gewicht
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    value={caloriePlan.currentWeight}
                    placeholder={form.weight || latestWeight || 'kg'}
                    onChange={event => setCaloriePlan(prev => ({ ...prev, currentWeight: event.target.value }))}
                  />
                </label>
                <label>Größe
                  <input
                    type="number"
                    min="100"
                    value={caloriePlan.height}
                    placeholder="cm"
                    onChange={event => setCaloriePlan(prev => ({ ...prev, height: event.target.value }))}
                  />
                </label>
                <label>Alter
                  <input
                    type="number"
                    min="12"
                    value={caloriePlan.age}
                    placeholder="Jahre"
                    onChange={event => setCaloriePlan(prev => ({ ...prev, age: event.target.value }))}
                  />
                </label>
                <label>Geschlecht
                  <select
                    value={caloriePlan.sex}
                    onChange={event => setCaloriePlan(prev => ({ ...prev, sex: event.target.value }))}
                  >
                    <option value="male">Männlich</option>
                    <option value="female">Weiblich</option>
                  </select>
                </label>
                <label>Aktivität
                  <select
                    value={caloriePlan.activity}
                    onChange={event => setCaloriePlan(prev => ({ ...prev, activity: event.target.value }))}
                  >
                    {ACTIVITY_LEVELS.map(level => (
                      <option key={level.id} value={level.id}>{level.label}</option>
                    ))}
                  </select>
                </label>
                <label>Ziel
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    value={caloriePlan.targetWeight}
                    placeholder="kg"
                    onChange={event => setCaloriePlan(prev => ({ ...prev, targetWeight: event.target.value }))}
                  />
                </label>
                <label>Zeit in Wochen
                  <input
                    type="number"
                    min="1"
                    value={caloriePlan.weeks}
                    onChange={event => setCaloriePlan(prev => ({ ...prev, weeks: event.target.value }))}
                  />
                </label>
              </div>
              <div className={s.goalResult}>
                <span>Empfohlen</span>
                <strong>{recommendedKcal ? `${recommendedKcal} kcal` : '—'}</strong>
                {recommendedKcal && (
                  <small>Erhalt {maintenanceKcal} kcal · {planDailyDelta >= 0 ? '+' : ''}{planDailyDelta} kcal/Tag · {planWeeklyChange} kg/Woche · {planWeeks} Wochen</small>
                )}
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  )
}
