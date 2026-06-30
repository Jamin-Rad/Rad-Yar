'use client'
import { useState, useEffect, useRef } from 'react'
import s from './health.module.css'
import {
  sportarten, sportKategorien,
  lebensmittel, kategorien,
  berechneKcalSport, berechneKcalEssen,
} from '@/data/health'

const SPORT_ICONS = {
  ausdauer: '🏃', kraft: '💪', entspannung: '🧘',
  mannschaft: '⚽', alltag: '🚶', custom: '⭐',
}
const FOOD_ICONS = {
  'irani-haupt': '🫕', kebab: '🍖', 'reis-brot': '🍚',
  'brot-frueh': '🍞', fleisch: '🥩', eier: '🥚',
  milch: '🧀', salat: '🥗', gemuese: '🥦', fette: '🫙', sonstiges: '🍽️',
}

const TODAY = new Date().toISOString().slice(0, 10)

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

  // 3-level nav state
  const [view, setView] = useState('home') // home | sport-cats | sport-items | food-cats | food-items
  const [selectedCat, setSelectedCat] = useState(null)

  // inline input
  const [activeId, setActiveId] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef(null)

  // form
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  // management form state
  const [mgmtMode, setMgmtMode] = useState('sport')
  const [newSport, setNewSport] = useState({ de: '', kcalPerMin: '' })
  const [newFood, setNewFood] = useState({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '' })

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

  // ── Computed active lists ──────────────────────────────────────────
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

  // ── Sport categories with count ────────────────────────────────────
  const sportCatsWithCount = [
    ...sportKategorien.map(sc => ({
      ...sc,
      icon: SPORT_ICONS[sc.id] || '🏅',
      count: activeSports.filter(sp => sp.cat === sc.id).length,
    })).filter(sc => sc.count > 0),
    ...(activeSports.some(sp => sp.cat === 'custom') ? [{
      id: 'custom', de: 'Benutzerdefiniert',
      icon: '⭐', count: activeSports.filter(sp => sp.cat === 'custom').length,
    }] : []),
  ]

  // ── Food categories with count ─────────────────────────────────────
  const usedFoodCatIds = [...new Set(activeFoods.map(f => f.cat))]
  const foodCatsWithCount = [
    ...kategorien.filter(k => usedFoodCatIds.includes(k.id)).map(k => ({
      ...k, icon: FOOD_ICONS[k.id] || '🍽️',
      count: activeFoods.filter(f => f.cat === k.id).length,
    })),
    ...(usedFoodCatIds.includes('sonstiges') ? [{
      id: 'sonstiges', de: 'Sonstige',
      icon: '🍽️', count: activeFoods.filter(f => f.cat === 'sonstiges').length,
    }] : []),
  ]

  // ── Totals ─────────────────────────────────────────────────────────
  const totalSportKcal = form.sports.reduce((sum, item) => {
    const sp = activeSports.find(x => x.id === item.id)
    return sum + (sp ? Math.round(sp.kcalPerMin * item.min) : 0)
  }, 0)
  const totalFoodKcal = form.foods.reduce((sum, item) => {
    const food = activeFoods.find(x => x.id === item.id)
    return sum + (food ? Math.round((food.kcalPer100g / 100) * item.g) : 0)
  }, 0)
  const totalKcal = totalFoodKcal + (form.manualKcal || 0) - totalSportKcal

  // ── Navigation helpers ─────────────────────────────────────────────
  function goHome() { setView('home'); setSelectedCat(null); setActiveId(null) }
  function goSportCats() { setView('sport-cats'); setSelectedCat(null); setActiveId(null) }
  function goFoodCats() { setView('food-cats'); setSelectedCat(null); setActiveId(null) }
  function selectSportCat(catId) { setView('sport-items'); setSelectedCat(catId); setActiveId(null) }
  function selectFoodCat(catId) { setView('food-items'); setSelectedCat(catId); setActiveId(null) }

  // ── Inline input ───────────────────────────────────────────────────
  function openInput(id, defaultVal = '') {
    setActiveId(id)
    setInputVal(String(defaultVal || ''))
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function confirmSport(id) {
    const min = parseInt(inputVal)
    if (!min || min <= 0) { setActiveId(null); return }
    setForm(f => {
      const others = f.sports.filter(x => x.id !== id)
      return { ...f, sports: [...others, { id, min }] }
    })
    setActiveId(null)
  }

  function confirmFood(id) {
    const g = parseInt(inputVal)
    if (!g || g <= 0) { setActiveId(null); return }
    setForm(f => {
      const others = f.foods.filter(x => x.id !== id)
      return { ...f, foods: [...others, { id, g }] }
    })
    setActiveId(null)
  }

  function removeSportFromForm(id) {
    setForm(f => ({ ...f, sports: f.sports.filter(x => x.id !== id) }))
  }
  function removeFoodFromForm(id) {
    setForm(f => ({ ...f, foods: f.foods.filter(x => x.id !== id) }))
  }

  // ── Save ───────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    const id = `record-${form.date}`
    await api('/records', 'POST', {
      id, date: form.date,
      weight: form.weight ? parseFloat(form.weight) : null,
      note: form.note || '',
      manual_kcal: form.manualKcal || 0,
      sports: form.sports,
      foods: form.foods,
    })
    await loadAll()
    setSaving(false)
  }

  // ── Management ─────────────────────────────────────────────────────
  async function handleAddSport(e) {
    e.preventDefault()
    if (!newSport.de || !newSport.kcalPerMin) return
    const id = 'custom-' + newSport.de.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    await api('/sports', 'POST', { id, de: newSport.de, fa: '', kcalPerMin: parseFloat(newSport.kcalPerMin) })
    setNewSport({ de: '', kcalPerMin: '' })
    loadAll()
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
    setNewFood({ de: '', cat: 'sonstiges', kcalPer100g: '', portionG: '' })
    loadAll()
  }
  async function deleteSport(id, isCustom) {
    if (isCustom) await api(`/sports?id=${id}&custom=true`, 'DELETE')
    else await api(`/sports?id=${id}&custom=false`, 'DELETE')
    loadAll()
  }
  async function deleteFood(id, isCustom) {
    if (isCustom) await api(`/foods?id=${id}&custom=true`, 'DELETE')
    else await api(`/foods?id=${id}&custom=false`, 'DELETE')
    loadAll()
  }
  async function restoreSport(id) { await api('/sports', 'PATCH', { id }); loadAll() }
  async function restoreFood(id) { await api('/foods', 'PATCH', { id }); loadAll() }

  // ── Computed items for current view ───────────────────────────────
  const viewSportItems = selectedCat ? activeSports.filter(sp => sp.cat === selectedCat) : []
  const viewFoodItems  = selectedCat ? activeFoods.filter(f => f.cat === selectedCat) : []

  const navTitle = {
    'home': '',
    'sport-cats': 'Sport',
    'sport-items': sportCatsWithCount.find(c => c.id === selectedCat)?.de || '',
    'food-cats': 'Essen',
    'food-items': foodCatsWithCount.find(c => c.id === selectedCat)?.de || '',
  }[view] || ''

  if (loading) return (
    <div className={s.page}>
      <div className={s.hero}><p style={{ color: '#94a3b8' }}>Lädt…</p></div>
    </div>
  )

  return (
    <div className={s.page}>
      <div className={s.hero}>
        <h1>Gesundheit</h1>
        <p>Kalorien, Gewicht und Sport verfolgen</p>
      </div>

      <div className={s.statsRow}>
        <div className={s.stat}><span>Heute gegessen</span><strong>{totalFoodKcal} kcal</strong></div>
        <div className={s.stat}><span>Heute trainiert</span><strong>{totalSportKcal} kcal</strong></div>
        <div className={s.stat}><span>Netto</span><strong>{totalKcal} kcal</strong></div>
        <div className={s.stat}><span>Einträge</span><strong>{records.length}</strong></div>
      </div>

      <div className={s.tabs}>
        {[['eintragen', 'Eintragen'], ['verlauf', 'Verlauf'], ['verwaltung', 'Verwaltung']].map(([id, label]) => (
          <button key={id} className={tab === id ? s.tabActive : s.tab} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── TAB: Eintragen ────────────────────────────────────────── */}
      {tab === 'eintragen' && (
        <div className={s.grid}>
          {/* Left: navigation panel */}
          <div className={s.panel}>

            {/* Home: two big buttons */}
            {view === 'home' && (
              <div className={s.homeBtns}>
                <button className={s.bigBtnSport} onClick={goSportCats}>
                  <span className={s.bigBtnIcon}>🏃</span>
                  Sport
                  <span className={s.bigBtnSub}>
                    {form.sports.length > 0 ? `${form.sports.length} gewählt` : 'hinzufügen'}
                  </span>
                </button>
                <button className={s.bigBtnEssen} onClick={goFoodCats}>
                  <span className={s.bigBtnIcon}>🥗</span>
                  Essen
                  <span className={s.bigBtnSub}>
                    {form.foods.length > 0 ? `${form.foods.length} gewählt` : 'hinzufügen'}
                  </span>
                </button>
              </div>
            )}

            {/* Sport categories */}
            {view === 'sport-cats' && (
              <>
                <div className={s.navHeader}>
                  <button className={s.backBtn} onClick={goHome}>←</button>
                  <span className={s.navTitle}>Sport — Kategorie wählen</span>
                </div>
                {sportCatsWithCount.map(cat => (
                  <div key={cat.id} className={s.catRow} onClick={() => selectSportCat(cat.id)}>
                    <div className={`${s.catIcon} ${s.catIconSport}`}>{cat.icon}</div>
                    <div className={s.catRowMain}>
                      <div className={s.catRowName}>{cat.de}</div>
                      <div className={s.catRowCount}>{cat.count} Sportarten</div>
                    </div>
                    <span className={s.catRowArrow}>›</span>
                  </div>
                ))}
              </>
            )}

            {/* Sport items */}
            {view === 'sport-items' && (
              <>
                <div className={s.navHeader}>
                  <button className={s.backBtn} onClick={goSportCats}>←</button>
                  <span className={s.navTitle}>{navTitle}</span>
                  <span className={s.navCrumb}>Sport</span>
                </div>
                {viewSportItems.map(sp => {
                  const existing = form.sports.find(x => x.id === sp.id)
                  const isActive = activeId === sp.id
                  return (
                    <div key={sp.id}>
                      <div
                        className={isActive ? s.rowActive : s.row}
                        onClick={() => !isActive && openInput(sp.id, existing?.min || '')}
                      >
                        <div className={existing ? s.rowInitialActive : s.rowInitial}>
                          {sp.de.slice(0, 2).toUpperCase()}
                        </div>
                        <div className={s.rowMain}>
                          <div className={existing ? s.rowNameActive : s.rowName}>{sp.de}</div>
                        </div>
                        <span className={s.rowMeta}>{sp.kcalPerMin} kcal/min</span>
                        {existing && !isActive && (
                          <span style={{ fontSize: '11px', color: '#f97316', fontWeight: 600, marginLeft: 4 }}>
                            {existing.min} min
                          </span>
                        )}
                        <button
                          className={isActive ? s.addBtnActive : s.addBtn}
                          onClick={e => {
                            e.stopPropagation()
                            isActive ? setActiveId(null) : openInput(sp.id, existing?.min || '')
                          }}
                        >
                          {isActive ? '×' : existing ? '✓' : '+'}
                        </button>
                      </div>
                      {isActive && (
                        <>
                          <div className={s.inlineInput}>
                            <input
                              ref={inputRef}
                              type="number" min="1" max="360"
                              placeholder="Minuten…"
                              value={inputVal}
                              onChange={e => setInputVal(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') confirmSport(sp.id)
                                if (e.key === 'Escape') setActiveId(null)
                              }}
                            />
                            <button className={s.confirmBtn} onClick={() => confirmSport(sp.id)}>
                              Bestätigen
                            </button>
                          </div>
                          {parseInt(inputVal) > 0 && (
                            <div className={s.kcalPreview}>
                              ≈ {Math.round(sp.kcalPerMin * parseInt(inputVal))} kcal verbrannt
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </>
            )}

            {/* Food categories */}
            {view === 'food-cats' && (
              <>
                <div className={s.navHeader}>
                  <button className={s.backBtn} onClick={goHome}>←</button>
                  <span className={s.navTitle}>Essen — Kategorie wählen</span>
                </div>
                {foodCatsWithCount.map(cat => (
                  <div key={cat.id} className={s.catRow} onClick={() => selectFoodCat(cat.id)}>
                    <div className={`${s.catIcon} ${s.catIconFood}`}>{cat.icon}</div>
                    <div className={s.catRowMain}>
                      <div className={s.catRowName}>{cat.de}</div>
                      <div className={s.catRowCount}>{cat.count} Lebensmittel</div>
                    </div>
                    <span className={s.catRowArrow}>›</span>
                  </div>
                ))}
              </>
            )}

            {/* Food items */}
            {view === 'food-items' && (
              <>
                <div className={s.navHeader}>
                  <button className={s.backBtn} onClick={goFoodCats}>←</button>
                  <span className={s.navTitle}>{navTitle}</span>
                  <span className={s.navCrumb}>Essen</span>
                </div>
                {viewFoodItems.map(food => {
                  const existing = form.foods.find(x => x.id === food.id)
                  const isActive = activeId === food.id
                  return (
                    <div key={food.id}>
                      <div
                        className={isActive ? s.rowActive : s.row}
                        style={isActive ? { background: '#f0fdf4' } : undefined}
                        onClick={() => !isActive && openInput(food.id, existing?.g || food.portionG || '')}
                      >
                        <div className={existing
                          ? s.rowInitialFoodActive
                          : `${s.rowInitial} ${s.rowInitialFood}`
                        }>
                          {food.de.slice(0, 2).toUpperCase()}
                        </div>
                        <div className={s.rowMain}>
                          <div className={existing ? s.rowNameFoodActive : s.rowName}>{food.de}</div>
                        </div>
                        <span className={s.rowMeta}>{food.kcalPer100g} kcal/100g</span>
                        {existing && !isActive && (
                          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginLeft: 4 }}>
                            {existing.g}g
                          </span>
                        )}
                        <button
                          className={isActive ? s.addBtnFoodActive : `${s.addBtn} ${s.addBtnFood}`}
                          onClick={e => {
                            e.stopPropagation()
                            isActive ? setActiveId(null) : openInput(food.id, existing?.g || food.portionG || '')
                          }}
                        >
                          {isActive ? '×' : existing ? '✓' : '+'}
                        </button>
                      </div>
                      {isActive && (
                        <>
                          <div className={`${s.inlineInput} ${s.inlineInputFood}`}>
                            <input
                              ref={inputRef}
                              type="number" min="1"
                              placeholder={`Gramm… (Portion: ${food.portionG}g)`}
                              value={inputVal}
                              onChange={e => setInputVal(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') confirmFood(food.id)
                                if (e.key === 'Escape') setActiveId(null)
                              }}
                            />
                            <button className={s.confirmBtnFood} onClick={() => confirmFood(food.id)}>
                              Bestätigen
                            </button>
                          </div>
                          {parseInt(inputVal) > 0 && (
                            <div className={`${s.kcalPreview} ${s.kcalPreviewFood}`}>
                              ≈ {Math.round((food.kcalPer100g / 100) * parseInt(inputVal))} kcal
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </>
            )}
          </div>

          {/* Right: summary panel */}
          <div className={s.summaryPanel}>
            <div className={s.summaryMeta}>
              <input
                type="date" value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
              <input
                type="number" placeholder="Gewicht kg" step="0.1"
                value={form.weight}
                onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                style={{ width: 90 }}
              />
            </div>

            <div className={s.kcalHero}>
              <div className={s.kcalNum}>{totalKcal}</div>
              <div className={s.kcalLabel}>kcal netto heute</div>
            </div>

            <div className={s.summaryItems}>
              {form.sports.length === 0 && form.foods.length === 0 && (
                <div className={s.emptyItems}>Noch nichts eingetragen</div>
              )}
              {form.sports.map(item => {
                const sp = activeSports.find(x => x.id === item.id)
                if (!sp) return null
                const kcal = Math.round(sp.kcalPerMin * item.min)
                return (
                  <div key={item.id} className={s.summaryItem}>
                    <div className={`${s.summaryDot} ${s.dotSport}`} />
                    <span className={s.summaryItemName}>{sp.de} ({item.min} min)</span>
                    <span className={`${s.summaryItemKcal} ${s.summaryItemKcalSport}`}>−{kcal}</span>
                    <button className={s.summaryRemove} onClick={() => removeSportFromForm(item.id)}>×</button>
                  </div>
                )
              })}
              {form.foods.map(item => {
                const food = activeFoods.find(x => x.id === item.id)
                if (!food) return null
                const kcal = Math.round((food.kcalPer100g / 100) * item.g)
                return (
                  <div key={item.id} className={s.summaryItem}>
                    <div className={`${s.summaryDot} ${s.dotFood}`} />
                    <span className={s.summaryItemName}>{food.de} ({item.g}g)</span>
                    <span className={`${s.summaryItemKcal} ${s.summaryItemKcalFood}`}>+{kcal}</span>
                    <button className={s.summaryRemove} onClick={() => removeFoodFromForm(item.id)}>×</button>
                  </div>
                )
              })}
            </div>

            <div className={s.manualRow}>
              <span>Extra kcal</span>
              <input
                type="number" placeholder="0"
                value={form.manualKcal || ''}
                onChange={e => setForm(f => ({ ...f, manualKcal: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className={s.totalsBlock}>
              <div className={`${s.totalsRow} ${s.totalsRowFood}`}>
                <span>Gegessen</span><span>+{totalFoodKcal + (form.manualKcal || 0)} kcal</span>
              </div>
              <div className={`${s.totalsRow} ${s.totalsRowSport}`}>
                <span>Sport verbrannt</span><span>−{totalSportKcal} kcal</span>
              </div>
              <div className={s.totalsNet}>
                <span>Netto</span><span>{totalKcal} kcal</span>
              </div>
            </div>

            <input
              className={s.noteInput}
              placeholder="Notiz…"
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            />

            <button className={s.saveBtn} onClick={handleSave} disabled={saving}>
              {saving ? 'Speichert…' : 'Speichern'}
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: Verlauf ─────────────────────────────────────────────── */}
      {tab === 'verlauf' && (
        <div className={s.panel}>
          <div className={s.panelLabel}>Einträge</div>
          <hr className={s.divider} />
          {records.length === 0 && <div className={s.emptyHistory}>Noch keine Einträge</div>}
          {[...records].sort((a, b) => b.date.localeCompare(a.date)).map(rec => {
            const sportKcal = (rec.sports || []).reduce((sum, item) => {
              const sp = activeSports.find(x => x.id === item.id)
              return sum + (sp ? Math.round(sp.kcalPerMin * item.min) : 0)
            }, 0)
            const foodKcal = (rec.foods || []).reduce((sum, item) => {
              const food = activeFoods.find(x => x.id === item.id)
              return sum + (food ? Math.round((food.kcalPer100g / 100) * item.g) : 0)
            }, 0)
            const net = foodKcal + (rec.manual_kcal || 0) - sportKcal
            return (
              <div key={rec.id} className={s.row} style={{ cursor: 'default' }}>
                <div className={s.rowInitial}>{rec.date.slice(5)}</div>
                <div className={s.rowMain}>
                  <div className={s.rowName}>{rec.date}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 2 }}>
                    {rec.weight ? `${rec.weight} kg · ` : ''}{(rec.sports || []).length} Sport · {(rec.foods || []).length} Essen
                    {rec.note ? ` · ${rec.note}` : ''}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{net} kcal</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>netto</div>
                </div>
                <button
                  className={s.delBtn}
                  onClick={async () => { await api(`/records?id=${rec.id}`, 'DELETE'); loadAll() }}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ── TAB: Verwaltung ──────────────────────────────────────────── */}
      {tab === 'verwaltung' && (
        <>
          <div className={s.tabs} style={{ borderBottom: 'none', marginBottom: 12 }}>
            <button className={mgmtMode === 'sport' ? s.tabActive : s.tab} onClick={() => setMgmtMode('sport')}>Sportarten</button>
            <button className={mgmtMode === 'food' ? s.tabActive : s.tab} onClick={() => setMgmtMode('food')}>Lebensmittel</button>
          </div>

          {mgmtMode === 'sport' && (
            <div className={s.mgmtGrid}>
              <div className={s.panel}>
                <div className={s.panelLabel}>Neue Sportart</div>
                <form className={s.mgmtForm} onSubmit={handleAddSport}>
                  <label>Name<input value={newSport.de} onChange={e => setNewSport(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Klettern" /></label>
                  <label>kcal/min<input type="number" min="1" max="30" value={newSport.kcalPerMin} onChange={e => setNewSport(p => ({ ...p, kcalPerMin: e.target.value }))} placeholder="z. B. 7" /></label>
                  <button className={s.mgmtSubmit} type="submit">Hinzufügen</button>
                </form>
              </div>
              <div className={s.panel}>
                <div className={s.mgmtList}>
                  {sportKategorien.map(cat => {
                    const items = activeSports.filter(sp => sp.cat === cat.id)
                    if (!items.length) return null
                    return (
                      <div key={cat.id}>
                        <div className={s.mgmtCatLabel}>{cat.de}</div>
                        {items.map(sp => (
                          <div key={sp.id} className={s.mgmtRow}>
                            <div className={s.mgmtRowMain}>
                              <strong>{sp.de}</strong>
                              <span>{sp.kcalPerMin} kcal/min</span>
                            </div>
                            <button className={s.delBtn} onClick={() => deleteSport(sp.id, sp.cat === 'custom')}>Löschen</button>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {activeSports.filter(sp => sp.cat === 'custom').length > 0 && (
                    <div>
                      <div className={s.mgmtCatLabel}>Benutzerdefiniert</div>
                      {activeSports.filter(sp => sp.cat === 'custom').map(sp => (
                        <div key={sp.id} className={s.mgmtRow}>
                          <div className={s.mgmtRowMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                          <button className={s.delBtn} onClick={() => deleteSport(sp.id, true)}>Löschen</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {deletedSports.length > 0 && (
                    <div className={s.deletedSection}>
                      <div className={s.deletedLabel}>Gelöschte Standardsportarten</div>
                      {sportarten.filter(sp => deletedSports.includes(sp.id)).map(sp => (
                        <div key={sp.id} className={s.mgmtRow}>
                          <div className={s.mgmtRowMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                          <button className={s.restoreBtn} onClick={() => restoreSport(sp.id)}>Wiederherstellen</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {mgmtMode === 'food' && (
            <div className={s.mgmtGrid}>
              <div className={s.panel}>
                <div className={s.panelLabel}>Neues Lebensmittel</div>
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
              <div className={s.panel}>
                <div className={s.mgmtList}>
                  {kategorien.map(cat => {
                    const items = activeFoods.filter(f => f.cat === cat.id)
                    if (!items.length) return null
                    return (
                      <div key={cat.id}>
                        <div className={s.mgmtCatLabel}>{cat.de}</div>
                        {items.map(f => (
                          <div key={f.id} className={s.mgmtRow}>
                            <div className={s.mgmtRowMain}>
                              <strong>{f.de}</strong>
                              <span>{f.kcalPer100g} kcal/100g · Portion {f.portionG}g</span>
                            </div>
                            <button className={s.delBtn} onClick={() => deleteFood(f.id, !!customFoods.find(cf => cf.id === f.id))}>Löschen</button>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {deletedFoods.length > 0 && (
                    <div className={s.deletedSection}>
                      <div className={s.deletedLabel}>Gelöschte Standardlebensmittel</div>
                      {lebensmittel.filter(f => deletedFoods.includes(f.id)).map(f => (
                        <div key={f.id} className={s.mgmtRow}>
                          <div className={s.mgmtRowMain}><strong>{f.de}</strong><span>{f.kcalPer100g} kcal/100g</span></div>
                          <button className={s.restoreBtn} onClick={() => restoreFood(f.id)}>Wiederherstellen</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
