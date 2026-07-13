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

export default function HealthPage({ apiBase = '/api/admin/health' }) {
  const [tab, setTab] = useState('eintragen')
  const [records, setRecords] = useState([])
  const [customSports, setCustomSports] = useState([])
  const [deletedSports, setDeletedSports] = useState([])
  const [customFoods, setCustomFoods] = useState([])
  const [deletedFoods, setDeletedFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const [picker, setPicker] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [mgmtMode, setMgmtMode] = useState('sport')
  const [newSport, setNewSport] = useState({ de: '', kcalPerMin: '' })
  const [newFood, setNewFood] = useState({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '' })
  const [caloriePlan, setCaloriePlan] = useState(DEFAULT_CALORIE_PLAN)
  const sparkPathRef = useRef(null)
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
  const totalKcal = totalFoodKcal + (form.manualKcal || 0) - totalSportKcal
  const foodFraction  = Math.min((totalFoodKcal + (form.manualKcal || 0)) / 2000, 1)
  const sportFraction = Math.min(totalSportKcal / 2000, 1)
  const latestWeight = [...records].filter(record => record.weight).sort((a, b) => b.date.localeCompare(a.date))[0]?.weight || ''
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
  }

  function chooseFoodAmount(food, amount) {
    const g = Math.round((food.portionG || 100) * amount)
    setForm(f => ({ ...f, foods: [...f.foods.filter(x => x.id !== food.id), { id: food.id, g }] }))
    setActiveId(null)
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
    })
    setNewFood({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '' }); loadAll()
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

        {/* ── HERO ── */}
        <div className={s.hero}>
          <div className={s.heroMeta}>
            <span className={s.heroDate}>
              {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <h1 className={s.heroTitle}>Gesundheit</h1>

          <div className={s.heroRingArea}>
            <div className={s.ringWrap + ' ' + s.ringWrapPulsing}>
              <svg className={s.ringSvg} viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="foodGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient id="sportGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
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
              <div className={s.ringCenter}>
                <div className={s.ringNum}>{totalKcal}</div>
                <div className={s.ringUnit}>kcal netto</div>
              </div>
            </div>
          </div>

          <div className={s.heroChips}>
            <div className={s.chip + ' ' + s.chipFood}>
              <span className={s.chipDot} />
              Gegessen · {totalFoodKcal + (form.manualKcal || 0)} kcal
            </div>
            <div className={s.chip + ' ' + s.chipSport}>
              <span className={s.chipDot} />
              Verbrannt · {totalSportKcal} kcal
            </div>
            {form.weight && (
              <div className={s.chip + ' ' + s.chipWeight}>
                <span className={s.chipDot} />
                {form.weight} kg
              </div>
            )}
            <div className={s.chip + ' ' + s.chipRecords}>
              {records.length} Einträge
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className={s.tabRow}>
          {[['eintragen', 'Heute', '✏️'], ['verlauf', 'Verlauf', '📈'], ['verwaltung', 'Verwaltung', '⚙️']].map(([id, label, icon]) => (
            <button key={id} className={tab === id ? s.tabActive : s.tab} onClick={() => setTab(id)}>
              <span className={s.tabIcon}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* ── TAB: Heute ── */}
        {tab === 'eintragen' && (
          <div className={s.enterGrid}>

            {/* Browse panel */}
            <div className={s.browsePanel}>
              <div className={s.homeTiles}>
                <button className={s.homeTileSport} onClick={() => openPicker('sport')}>
                  <div className={s.homeTileIcon}>🏃</div>
                  <div className={s.homeTileLabel}>Sport</div>
                  <div className={s.homeTileSub}>{form.sports.length > 0 ? `${form.sports.length} gewählt` : 'Kategorie auswählen'}</div>
                  {form.sports.length > 0 && <div className={s.homeTileBadge}>{form.sports.length}</div>}
                </button>
                <button className={s.homeTileFood} onClick={() => openPicker('food')}>
                  <div className={s.homeTileIcon}>🥗</div>
                  <div className={s.homeTileLabel}>Essen</div>
                  <div className={s.homeTileSub}>{form.foods.length > 0 ? `${form.foods.length} gewählt` : 'Kategorie auswählen'}</div>
                  {form.foods.length > 0 && <div className={s.homeTileBadge + ' ' + s.homeTileBadgeFood}>{form.foods.length}</div>}
                </button>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className={s.summaryPanel}>
              <div className={s.summaryHead}>
                <input className={s.summaryInput} type="date" value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                <input className={s.summaryInput} type="number" placeholder="kg" step="0.1"
                  value={form.weight} style={{ width: 64 }}
                  onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
              </div>

              <div className={s.summaryItems}>
                {form.sports.length === 0 && form.foods.length === 0 && (
                  <div className={s.summaryEmpty}>Noch nichts eingetragen</div>
                )}
                {form.sports.map(item => {
                  const sp = activeSports.find(x => x.id === item.id)
                  if (!sp) return null
                  const kcal = Math.round(sp.kcalPerMin * item.min)
                  return (
                    <div key={item.id} className={s.summaryItem}>
                      <div className={s.summaryPill + ' ' + s.pillSport}>Sport</div>
                      <span className={s.summaryName}>{sp.de}</span>
                      <span className={s.summaryDuration}>{item.min} min</span>
                      <span className={s.summaryKcalSport}>−{kcal}</span>
                      <button className={s.summaryRemove} onClick={() => removeSportFromForm(item.id)}>×</button>
                    </div>
                  )
                })}
                {form.foods.map(item => {
                  const food = activeFoods.find(x => x.id === item.id)
                  if (!food) return null
                  const g = item.g ?? (item.count != null ? item.count * food.portionG : 0)
                  const kcal = Math.round((food.kcalPer100g / 100) * g)
                  return (
                    <div key={item.id} className={s.summaryItem}>
                      <div className={s.summaryPill + ' ' + s.pillFood}>Essen</div>
                      <span className={s.summaryName}>{food.de}</span>
                      <span className={s.summaryDuration}>{foodAmountText(food, g)}</span>
                      <span className={s.summaryKcalFood}>+{kcal}</span>
                      <button className={s.summaryRemove} onClick={() => removeFoodFromForm(item.id)}>×</button>
                    </div>
                  )
                })}
              </div>

              <div className={s.summaryTotals}>
                <div className={s.summaryTotalRow}>
                  <span>Gegessen</span>
                  <span className={s.summaryTotalFood}>+{totalFoodKcal + (form.manualKcal || 0)} kcal</span>
                </div>
                <div className={s.summaryTotalRow}>
                  <span>Verbrannt</span>
                  <span className={s.summaryTotalSport}>−{totalSportKcal} kcal</span>
                </div>
                <div className={s.manualRow}>
                  <span>Extra kcal</span>
                  <input type="number" placeholder="0"
                    value={form.manualKcal || ''}
                    onChange={e => setForm(f => ({ ...f, manualKcal: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className={s.summaryNet}>
                  <span>Netto</span><span>{totalKcal} kcal</span>
                </div>
              </div>

              <input className={s.noteInput} placeholder=""
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />

              {(saving || saveMessage) && (
                <div className={saveMessage.includes('fehl') || saveMessage.includes('nicht') ? s.saveError : s.saveOk}>
                  {saving ? 'Speichert automatisch…' : saveMessage}
                </div>
              )}
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
                          <span className={s.itemToggle}>{isActive ? '×' : existing ? '✓' : '+'}</span>
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
                          <span className={s.itemToggle}>{isActive ? '×' : existing ? '✓' : '+'}</span>
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

        {/* ── TAB: Verwaltung ── */}
        {tab === 'verwaltung' && (
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

            <div className={s.mgmtTabs}>
              <button className={mgmtMode === 'sport' ? s.mgmtTabActive : s.mgmtTab} onClick={() => setMgmtMode('sport')}>Sportarten</button>
              <button className={mgmtMode === 'food' ? s.mgmtTabActive : s.mgmtTab} onClick={() => setMgmtMode('food')}>Lebensmittel</button>
            </div>

            {mgmtMode === 'sport' && (
              <div className={s.mgmtGrid}>
                <div className={s.mgmtFormCard}>
                  <h3 className={s.mgmtFormTitle}>Neue Sportart</h3>
                  <form className={s.mgmtForm} onSubmit={handleAddSport}>
                    <label>Name<input value={newSport.de} onChange={e => setNewSport(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Klettern" /></label>
                    <label>kcal/min<input type="number" min="1" max="30" value={newSport.kcalPerMin} onChange={e => setNewSport(p => ({ ...p, kcalPerMin: e.target.value }))} placeholder="z. B. 7" /></label>
                    <button className={s.mgmtSubmit} type="submit">Hinzufügen</button>
                  </form>
                </div>
                <div className={s.mgmtListCard}>
                  {sportKategorien.map(cat => {
                    const items = activeSports.filter(sp => sp.cat === cat.id)
                    if (!items.length) return null
                    return (
                      <div key={cat.id}>
                        <div className={s.mgmtCatLabel}>{cat.de}</div>
                        {items.map(sp => (
                          <div key={sp.id} className={s.mgmtItem}>
                            <div className={s.mgmtItemMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                            <button className={s.mgmtDelBtn} onClick={() => deleteSport(sp.id, sp.cat === 'custom')}>Löschen</button>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {activeSports.filter(sp => sp.cat === 'custom').length > 0 && (
                    <div>
                      <div className={s.mgmtCatLabel}>Benutzerdefiniert</div>
                      {activeSports.filter(sp => sp.cat === 'custom').map(sp => (
                        <div key={sp.id} className={s.mgmtItem}>
                          <div className={s.mgmtItemMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                          <button className={s.mgmtDelBtn} onClick={() => deleteSport(sp.id, true)}>Löschen</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {deletedSports.length > 0 && (
                    <div className={s.mgmtDeleted}>
                      <div className={s.mgmtCatLabel}>Gelöschte Standards</div>
                      {sportarten.filter(sp => deletedSports.includes(sp.id)).map(sp => (
                        <div key={sp.id} className={s.mgmtItem}>
                          <div className={s.mgmtItemMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                          <button className={s.mgmtRestoreBtn} onClick={() => restoreSport(sp.id)}>Wiederherstellen</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {mgmtMode === 'food' && (
              <div className={s.mgmtGrid}>
                <div className={s.mgmtFormCard}>
                  <h3 className={s.mgmtFormTitle}>Neues Lebensmittel</h3>
                  <form className={s.mgmtForm} onSubmit={handleAddFood}>
                    <label>Name<input value={newFood.de} onChange={e => setNewFood(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Baklava" /></label>
                    <label>Kategorie
                      <select value={newFood.cat} onChange={e => setNewFood(p => ({ ...p, cat: e.target.value }))}>
                        {kategorien.map(k => <option key={k.id} value={k.id}>{k.de}</option>)}
                        <option value="sonstiges">Sonstige</option>
                      </select>
                    </label>
                    <label>kcal/100g<input type="number" min="0" value={newFood.kcalPer100g} onChange={e => setNewFood(p => ({ ...p, kcalPer100g: e.target.value }))} placeholder="z. B. 250" /></label>
                    <label>Einheit in g<input type="number" min="1" value={newFood.portionG} onChange={e => setNewFood(p => ({ ...p, portionG: e.target.value }))} placeholder="100" /></label>
                    <button className={s.mgmtSubmit} type="submit">Hinzufügen</button>
                  </form>
                </div>
                <div className={s.mgmtListCard}>
                  {kategorien.map(cat => {
                    const items = activeFoods.filter(f => f.cat === cat.id)
                    if (!items.length) return null
                    return (
                      <div key={cat.id}>
                        <div className={s.mgmtCatLabel}>{cat.de}</div>
                        {items.map(f => (
                          <div key={f.id} className={s.mgmtItem}>
                            <div className={s.mgmtItemMain}><strong>{f.de}</strong><span>{f.kcalPer100g} kcal/100g · 1 {unitForFood(f)} ≈ {f.portionG}g</span></div>
                            <button className={s.mgmtDelBtn} onClick={() => deleteFood(f.id, !!customFoods.find(cf => cf.id === f.id))}>Löschen</button>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {deletedFoods.length > 0 && (
                    <div className={s.mgmtDeleted}>
                      <div className={s.mgmtCatLabel}>Gelöschte Standards</div>
                      {lebensmittel.filter(f => deletedFoods.includes(f.id)).map(f => (
                        <div key={f.id} className={s.mgmtItem}>
                          <div className={s.mgmtItemMain}><strong>{f.de}</strong><span>{f.kcalPer100g} kcal/100g</span></div>
                          <button className={s.mgmtRestoreBtn} onClick={() => restoreFood(f.id)}>Wiederherstellen</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
