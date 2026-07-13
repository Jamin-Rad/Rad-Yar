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

const TODAY = new Date().toISOString().slice(0, 10)
const RING_R = 50
const RING_C = 2 * Math.PI * RING_R

async function api(path, method = 'GET', body) {
  const res = await fetch(`/api/admin/health${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.ok ? res.json() : null
}

const EMPTY_FORM = { date: TODAY, weight: '', note: '', manualKcal: 0, sports: [], foods: [] }

export default function HealthPage() {
  const [tab, setTab] = useState('eintragen')
  const [records, setRecords] = useState([])
  const [customSports, setCustomSports] = useState([])
  const [deletedSports, setDeletedSports] = useState([])
  const [customFoods, setCustomFoods] = useState([])
  const [deletedFoods, setDeletedFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const [view, setView] = useState('home')
  const [selectedCat, setSelectedCat] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [mgmtMode, setMgmtMode] = useState('sport')
  const [newSport, setNewSport] = useState({ de: '', kcalPerMin: '' })
  const [newFood, setNewFood] = useState({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '' })
  const sparkPathRef = useRef(null)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    const data = await api('/')
    if (data) {
      setRecords(data.records || [])
      setCustomSports(data.customSports || [])
      setDeletedSports(data.deletedSports || [])
      setCustomFoods(data.customFoods || [])
      setDeletedFoods(data.deletedFoods || [])
      const today = (data.records || []).find(r => r.date === TODAY)
      if (today) {
        setForm({
          date: today.date,
          weight: today.weight ?? '',
          note: today.note ?? '',
          manualKcal: today.manual_kcal ?? 0,
          sports: today.sports ?? [],
          foods: today.foods ?? [],
        })
      }
    }
    setLoading(false)
  }

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

  function goHome()           { setView('home');        setSelectedCat(null); setActiveId(null) }
  function goSportCats()      { setView('sport-cats');  setSelectedCat(null); setActiveId(null) }
  function goFoodCats()       { setView('food-cats');   setSelectedCat(null); setActiveId(null) }
  function selectSportCat(id) { setView('sport-items'); setSelectedCat(id);   setActiveId(null) }
  function selectFoodCat(id)  { setView('food-items');  setSelectedCat(id);   setActiveId(null) }

  function openInput(id, defaultVal = '') {
    setActiveId(id); setInputVal(String(defaultVal || ''))
    setTimeout(() => inputRef.current?.focus(), 50)
  }
  function confirmSport(id) {
    const min = parseInt(inputVal)
    if (!min || min <= 0) { setActiveId(null); return }
    setForm(f => ({ ...f, sports: [...f.sports.filter(x => x.id !== id), { id, min }] }))
    setActiveId(null)
  }
  function confirmFood(id) {
    const g = parseInt(inputVal)
    if (!g || g <= 0) { setActiveId(null); return }
    setForm(f => ({ ...f, foods: [...f.foods.filter(x => x.id !== id), { id, g }] }))
    setActiveId(null)
  }
  function removeSportFromForm(id) { setForm(f => ({ ...f, sports: f.sports.filter(x => x.id !== id) })) }
  function removeFoodFromForm(id)  { setForm(f => ({ ...f, foods:  f.foods.filter(x => x.id !== id) })) }

  async function handleSave() {
    setSaving(true)
    await api('/records', 'POST', {
      id: `record-${form.date}`, date: form.date,
      weight: form.weight ? parseFloat(form.weight) : null,
      note: form.note || '', manual_kcal: form.manualKcal || 0,
      sports: form.sports, foods: form.foods,
    })
    await loadAll(); setSaving(false)
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

  const viewSportItems = selectedCat ? activeSports.filter(sp => sp.cat === selectedCat) : []
  const viewFoodItems  = selectedCat ? activeFoods.filter(f => f.cat === selectedCat) : []

  const weightSeries = [...records]
    .filter(r => r.weight)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-8)

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
          {[['eintragen', 'Eintragen', '✏️'], ['verlauf', 'Verlauf', '📈'], ['verwaltung', 'Verwaltung', '⚙️']].map(([id, label, icon]) => (
            <button key={id} className={tab === id ? s.tabActive : s.tab} onClick={() => setTab(id)}>
              <span className={s.tabIcon}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* ── TAB: Eintragen ── */}
        {tab === 'eintragen' && (
          <div className={s.enterGrid}>

            {/* Browse panel */}
            <div className={s.browsePanel}>

              {view === 'home' && (
                <div className={s.homeTiles}>
                  <button className={s.homeTileSport} onClick={goSportCats}>
                    <div className={s.homeTileIcon}>🏃</div>
                    <div className={s.homeTileLabel}>Sport</div>
                    <div className={s.homeTileSub}>{form.sports.length > 0 ? `${form.sports.length} gewählt` : 'hinzufügen'}</div>
                    {form.sports.length > 0 && <div className={s.homeTileBadge}>{form.sports.length}</div>}
                  </button>
                  <button className={s.homeTileFood} onClick={goFoodCats}>
                    <div className={s.homeTileIcon}>🥗</div>
                    <div className={s.homeTileLabel}>Essen</div>
                    <div className={s.homeTileSub}>{form.foods.length > 0 ? `${form.foods.length} gewählt` : 'hinzufügen'}</div>
                    {form.foods.length > 0 && <div className={s.homeTileBadge + ' ' + s.homeTileBadgeFood}>{form.foods.length}</div>}
                  </button>
                </div>
              )}

              {view === 'sport-cats' && (
                <div className={s.catView}>
                  <div className={s.browseHeader}>
                    <button className={s.backBtn} onClick={goHome}>←</button>
                    <span className={s.browseTitle}>Sport — Kategorie</span>
                  </div>
                  <div className={s.catTileGrid}>
                    {sportCatsWithCount.map(cat => (
                      <button key={cat.id} className={s.catTile} onClick={() => selectSportCat(cat.id)}>
                        <span className={s.catTileEmoji}>{cat.icon}</span>
                        <span className={s.catTileName}>{cat.de}</span>
                        <span className={s.catTileCount}>{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {view === 'sport-items' && (
                <div className={s.itemView}>
                  <div className={s.browseHeader}>
                    <button className={s.backBtn} onClick={goSportCats}>←</button>
                    <span className={s.browseTitle}>{sportCatsWithCount.find(c => c.id === selectedCat)?.de}</span>
                  </div>
                  <div className={s.itemList}>
                    {viewSportItems.map(sp => {
                      const existing = form.sports.find(x => x.id === sp.id)
                      const isActive = activeId === sp.id
                      return (
                        <div key={sp.id}>
                          <div
                            className={[s.itemRow, existing ? s.itemRowSelected : '', isActive ? s.itemRowOpen : ''].join(' ')}
                            onClick={() => !isActive && openInput(sp.id, existing?.min || '')}
                          >
                            <div className={s.itemAvatar}>{sp.de.slice(0, 2).toUpperCase()}</div>
                            <div className={s.itemInfo}>
                              <div className={s.itemName}>{sp.de}</div>
                              <div className={s.itemMeta}>{sp.kcalPerMin} kcal/min</div>
                            </div>
                            {existing && !isActive && (
                              <div className={s.itemChip}>{existing.min} min</div>
                            )}
                            <button
                              className={[s.itemToggle, isActive ? s.itemToggleClose : existing ? s.itemToggleOn : ''].join(' ')}
                              onClick={e => { e.stopPropagation(); isActive ? setActiveId(null) : openInput(sp.id, existing?.min || '') }}
                            >
                              {isActive ? '×' : existing ? '✓' : '+'}
                            </button>
                          </div>
                          {isActive && (
                            <div className={s.inputRow}>
                              <input
                                ref={inputRef} type="number" min="1" max="360"
                                placeholder="Minuten…" value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') confirmSport(sp.id); if (e.key === 'Escape') setActiveId(null) }}
                              />
                              {parseInt(inputVal) > 0 && (
                                <span className={s.inputPreview}>≈ {Math.round(sp.kcalPerMin * parseInt(inputVal))} kcal</span>
                              )}
                              <button className={s.inputConfirm} onClick={() => confirmSport(sp.id)}>OK</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {view === 'food-cats' && (
                <div className={s.catView}>
                  <div className={s.browseHeader}>
                    <button className={s.backBtn} onClick={goHome}>←</button>
                    <span className={s.browseTitle}>Essen — Kategorie</span>
                  </div>
                  <div className={s.catTileGrid}>
                    {foodCatsWithCount.map(cat => (
                      <button key={cat.id} className={s.catTile + ' ' + s.catTileFood} onClick={() => selectFoodCat(cat.id)}>
                        <span className={s.catTileEmoji}>{cat.icon}</span>
                        <span className={s.catTileName}>{cat.de}</span>
                        <span className={s.catTileCount}>{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {view === 'food-items' && (
                <div className={s.itemView}>
                  <div className={s.browseHeader}>
                    <button className={s.backBtn} onClick={goFoodCats}>←</button>
                    <span className={s.browseTitle}>{foodCatsWithCount.find(c => c.id === selectedCat)?.de}</span>
                  </div>
                  <div className={s.itemList}>
                    {viewFoodItems.map(food => {
                      const existing = form.foods.find(x => x.id === food.id)
                      const isActive = activeId === food.id
                      return (
                        <div key={food.id}>
                          <div
                            className={[s.itemRow, existing ? s.itemRowSelectedFood : '', isActive ? s.itemRowOpenFood : ''].join(' ')}
                            onClick={() => !isActive && openInput(food.id, existing?.g || food.portionG || '')}
                          >
                            <div className={s.itemAvatar + ' ' + s.itemAvatarFood}>{food.de.slice(0, 2).toUpperCase()}</div>
                            <div className={s.itemInfo}>
                              <div className={s.itemName}>{food.de}</div>
                              <div className={s.itemMeta}>{food.kcalPer100g} kcal/100g · Portion {food.portionG}g</div>
                            </div>
                            {existing && !isActive && (
                              <div className={s.itemChip + ' ' + s.itemChipFood}>
                                {existing.g ?? (existing.count != null ? existing.count * food.portionG : '?')}g
                              </div>
                            )}
                            <button
                              className={[s.itemToggle, s.itemToggleFood, isActive ? s.itemToggleClose : existing ? s.itemToggleOnFood : ''].join(' ')}
                              onClick={e => { e.stopPropagation(); isActive ? setActiveId(null) : openInput(food.id, existing?.g || food.portionG || '') }}
                            >
                              {isActive ? '×' : existing ? '✓' : '+'}
                            </button>
                          </div>
                          {isActive && (
                            <div className={s.inputRow + ' ' + s.inputRowFood}>
                              <input
                                ref={inputRef} type="number" min="1"
                                placeholder={`Gramm… (Portion: ${food.portionG}g)`}
                                value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') confirmFood(food.id); if (e.key === 'Escape') setActiveId(null) }}
                              />
                              {parseInt(inputVal) > 0 && (
                                <span className={s.inputPreview + ' ' + s.inputPreviewFood}>
                                  ≈ {Math.round((food.kcalPer100g / 100) * parseInt(inputVal))} kcal
                                </span>
                              )}
                              <button className={s.inputConfirm + ' ' + s.inputConfirmFood} onClick={() => confirmFood(food.id)}>OK</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
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
                      <span className={s.summaryDuration}>{g}g</span>
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

              <input className={s.noteInput} placeholder="Notiz für heute…"
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />

              <button className={s.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? 'Speichert…' : 'Heute speichern'}
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: Verlauf ── */}
        {tab === 'verlauf' && (
          <div className={s.historyView}>

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

            {records.length === 0 && (
              <div className={s.emptyState}>
                <div className={s.emptyIcon}>📊</div>
                <div className={s.emptyText}>Noch keine Einträge vorhanden</div>
              </div>
            )}

            <div className={s.historyList}>
              {[...records].sort((a, b) => b.date.localeCompare(a.date)).map((rec, idx) => {
                const sportKcal = (rec.sports || []).reduce((sum, item) => {
                  const sp = activeSports.find(x => x.id === item.id)
                  return sum + (sp ? Math.round(sp.kcalPerMin * item.min) : 0)
                }, 0)
                const foodKcal = (rec.foods || []).reduce((sum, item) => {
                  const food = activeFoods.find(x => x.id === item.id)
                  return sum + (food ? Math.round((food.kcalPer100g / 100) * (item.g ?? (item.count != null ? item.count * food.portionG : 0))) : 0)
                }, 0)
                const net = foodKcal + (rec.manual_kcal || 0) - sportKcal
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
                    <label>Portion (g)<input type="number" min="1" value={newFood.portionG} onChange={e => setNewFood(p => ({ ...p, portionG: e.target.value }))} placeholder="100" /></label>
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
                            <div className={s.mgmtItemMain}><strong>{f.de}</strong><span>{f.kcalPer100g} kcal/100g · Portion {f.portionG}g</span></div>
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
