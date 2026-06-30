'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { sportarten as DEFAULT_SPORTS, lebensmittel as DEFAULT_FOODS, kategorien } from '@/data/health'
import styles from '../admin.module.css'

function today() { return new Date().toISOString().slice(0, 10) }
function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
function num(v)   { return Number(v) || 0 }

const emptyForm = () => ({ date: today(), weight: '', note: '', manualKcal: '', sports: [], foods: [] })

async function apiFetch(path, method = 'GET', body) {
  const res = await fetch(`/api/admin/health${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.ok ? res.json() : null
}

export default function HealthPage() {
  const [tab, setTab]         = useState('log')
  const [listTab, setListTab] = useState('sport')
  const [loading, setLoading] = useState(true)

  const [records, setRecords]               = useState([])
  const [customSports, setCustomSports]     = useState([])
  const [deletedSports, setDeletedSports]   = useState(new Set())
  const [customFoods, setCustomFoods]       = useState([])
  const [deletedFoods, setDeletedFoods]     = useState(new Set())

  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)

  // Picker state
  const [activeSportId, setActiveSportId] = useState(null)
  const [sportMinutes, setSportMinutes]   = useState('')
  const [activeFoodId, setActiveFoodId]   = useState(null)
  const [foodGrams, setFoodGrams]         = useState('')
  const [catFilter, setCatFilter]         = useState('all')

  // List management forms
  const [newSport, setNewSport] = useState({ de: '', fa: '', kcalPerMin: '' })
  const [newFood, setNewFood]   = useState({ de: '', fa: '', cat: 'irani-haupt', kcalPer100g: '', portionG: '' })

  const loadAll = useCallback(async () => {
    setLoading(true)
    const data = await apiFetch('')
    if (data) {
      setRecords(data.records.map(r => ({ ...r, manualKcal: r.manual_kcal, sports: r.sports || [], foods: r.foods || [] })))
      setCustomSports(data.customSports.map(s => ({ id: s.id, de: s.de, fa: s.fa, kcalPerMin: Number(s.kcal_per_min), custom: true })))
      setCustomFoods(data.customFoods.map(f => ({ id: f.id, de: f.de, fa: f.fa, cat: f.cat, kcalPer100g: f.kcal_per_100g, portionG: f.portion_g, custom: true })))
      setDeletedSports(new Set(data.deletedIds.filter(d => d.item_type === 'sport').map(d => d.item_id)))
      setDeletedFoods(new Set(data.deletedIds.filter(d => d.item_type === 'food').map(d => d.item_id)))
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const activeSports = useMemo(() => [
    ...DEFAULT_SPORTS.filter(s => !deletedSports.has(s.id)),
    ...customSports,
  ], [deletedSports, customSports])

  const activeFoods = useMemo(() => [
    ...DEFAULT_FOODS.filter(f => !deletedFoods.has(f.id)),
    ...customFoods,
  ], [deletedFoods, customFoods])

  const visibleFoods = useMemo(() =>
    catFilter === 'all' ? activeFoods : activeFoods.filter(f => f.cat === catFilter),
  [activeFoods, catFilter])

  const totalFoodKcal  = num(form.manualKcal) + form.foods.reduce((s, f) => s + f.kcal, 0)
  const totalSportKcal = form.sports.reduce((s, sp) => s + sp.kcal, 0)

  function handleSportClick(sport) {
    if (activeSportId === sport.id) { setActiveSportId(null); setSportMinutes(''); return }
    setActiveSportId(sport.id)
    setSportMinutes('')
  }

  function commitSport(sport) {
    if (!sportMinutes) return
    const kcal = Math.round(sport.kcalPerMin * num(sportMinutes))
    setForm(p => ({ ...p, sports: [...p.sports, { id: makeId(), name: sport.de, fa: sport.fa, sportId: sport.id, minutes: num(sportMinutes), kcal }] }))
    setActiveSportId(null)
    setSportMinutes('')
  }

  function handleFoodClick(food) {
    if (activeFoodId === food.id) { setActiveFoodId(null); setFoodGrams(''); return }
    setActiveFoodId(food.id)
    setFoodGrams('')
  }

  function commitFood(food) {
    const grams = num(foodGrams) || food.portionG
    const kcal  = Math.round((food.kcalPer100g / 100) * grams)
    setForm(p => ({ ...p, foods: [...p.foods, { id: makeId(), name: food.de, fa: food.fa, foodId: food.id, grams, kcal }] }))
    setActiveFoodId(null)
    setFoodGrams('')
  }

  async function saveRecord(e) {
    e.preventDefault()
    setSaving(true)
    const rec = {
      id: makeId(), date: form.date || today(),
      weight: form.weight ? num(form.weight) : null,
      note: form.note.trim(), manual_kcal: num(form.manualKcal),
      sports: form.sports, foods: form.foods,
    }
    await apiFetch('/records', 'POST', rec)
    await loadAll()
    setForm(emptyForm())
    setSaving(false)
  }

  async function deleteRecord(id) {
    await apiFetch(`/records?id=${id}`, 'DELETE')
    setRecords(prev => prev.filter(r => r.id !== id))
  }

  async function deleteSport(id)       { await apiFetch(`/sports?id=${id}&custom=false`, 'DELETE'); setDeletedSports(p => new Set([...p, id])) }
  async function restoreSport(id)      { await apiFetch('/sports', 'PATCH', { id }); setDeletedSports(p => { const n = new Set(p); n.delete(id); return n }) }
  async function deleteCustomSport(id) { await apiFetch(`/sports?id=${id}&custom=true`, 'DELETE'); setCustomSports(p => p.filter(s => s.id !== id)) }
  async function addCustomSport(e) {
    e.preventDefault()
    if (!newSport.de || !newSport.kcalPerMin) return
    const s = { id: makeId(), de: newSport.de, fa: newSport.fa, kcalPerMin: num(newSport.kcalPerMin), custom: true }
    await apiFetch('/sports', 'POST', s)
    setCustomSports(p => [...p, s])
    setNewSport({ de: '', fa: '', kcalPerMin: '' })
  }

  async function deleteFood(id)       { await apiFetch(`/foods?id=${id}&custom=false`, 'DELETE'); setDeletedFoods(p => new Set([...p, id])) }
  async function restoreFood(id)      { await apiFetch('/foods', 'PATCH', { id }); setDeletedFoods(p => { const n = new Set(p); n.delete(id); return n }) }
  async function deleteCustomFood(id) { await apiFetch(`/foods?id=${id}&custom=true`, 'DELETE'); setCustomFoods(p => p.filter(f => f.id !== id)) }
  async function addCustomFood(e) {
    e.preventDefault()
    if (!newFood.de || !newFood.kcalPer100g) return
    const f = { id: makeId(), de: newFood.de, fa: newFood.fa, cat: newFood.cat, kcalPer100g: num(newFood.kcalPer100g), portionG: num(newFood.portionG) || 100, custom: true }
    await apiFetch('/foods', 'POST', f)
    setCustomFoods(p => [...p, f])
    setNewFood({ de: '', fa: '', cat: 'irani-haupt', kcalPer100g: '', portionG: '' })
  }

  const summary = useMemo(() => {
    const days       = records.length
    const totalKcal  = records.reduce((s, r) => s + num(r.manualKcal) + (r.foods || []).reduce((fs, f) => fs + f.kcal, 0), 0)
    const totalSport = records.reduce((s, r) => s + (r.sports || []).reduce((ss, sp) => ss + sp.minutes, 0), 0)
    const lastWeight = [...records].sort((a, b) => b.date.localeCompare(a.date)).find(r => r.weight)?.weight
    return { days, avgKcal: days ? Math.round(totalKcal / days) : 0, totalSport, lastWeight }
  }, [records])

  const chartRecords = useMemo(() => [...records].sort((a, b) => a.date.localeCompare(b.date)).slice(-14), [records])
  const maxKcal  = Math.max(1, ...chartRecords.map(r => num(r.manualKcal) + (r.foods || []).reduce((s, f) => s + f.kcal, 0)))
  const maxSport = Math.max(1, ...chartRecords.map(r => (r.sports || []).reduce((s, sp) => s + sp.minutes, 0)))
  const sortedRecords = useMemo(() => [...records].sort((a, b) => b.date.localeCompare(a.date)), [records])

  const activeFood  = activeFoods.find(f => f.id === activeFoodId)
  const activeSport = activeSports.find(s => s.id === activeSportId)

  if (loading) {
    return <div className={styles.page}><main className={styles.content}><p className={styles.emptyAnalytics}>Daten werden geladen…</p></main></div>
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <div className={styles.budgetHero}>
          <div>
            <h1 className={styles.title}>Kalorien & täglicher Sport</h1>
            <p className={styles.sub}>Sport und Essen auswählen — Kalorien werden automatisch berechnet.</p>
          </div>
        </div>

        <div className={styles.financeTabs}>
          <button className={tab === 'log'   ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('log')}>Tagesbuch</button>
          <button className={tab === 'lists' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('lists')}>
            Listen bearbeiten <span>{activeSports.length + activeFoods.length}</span>
          </button>
        </div>

        {/* ── TAB: TAGESBUCH ── */}
        {tab === 'log' && (
          <>
            <section className={styles.budgetSummaryGrid}>
              <div className={styles.budgetMetric}><span>Erfasste Tage</span><strong>{summary.days}</strong></div>
              <div className={styles.budgetMetric}><span>Ø Kalorien</span><strong>{summary.avgKcal} kcal</strong></div>
              <div className={styles.budgetMetric}><span>Sport gesamt</span><strong>{summary.totalSport} Min.</strong></div>
              <div className={styles.budgetMetric}><span>Letztes Gewicht</span><strong>{summary.lastWeight ? `${summary.lastWeight} kg` : '—'}</strong></div>
            </section>

            <div className={styles.healthGrid}>
              {/* ── LEFT: PICKER ── */}
              <div>
                {/* Sport Picker */}
                <div className={styles.healthPickerSection}>
                  <p className={styles.healthPickerTitle}>Sport wählen</p>
                  <div className={styles.healthCardGrid}>
                    {activeSports.map(sport => {
                      const isActive = activeSportId === sport.id
                      const kcalPrev = isActive && sportMinutes ? Math.round(sport.kcalPerMin * num(sportMinutes)) : null
                      return (
                        <div
                          key={sport.id}
                          className={`${styles.healthCard} ${isActive ? styles.healthCardActive : ''}`}
                          onClick={() => handleSportClick(sport)}
                        >
                          <p className={styles.healthCardName}>{sport.de}</p>
                          {sport.fa && <p className={styles.healthCardFa}>{sport.fa}</p>}
                          <p className={styles.healthCardMeta}>{sport.kcalPerMin} kcal/min</p>
                          {isActive && (
                            <>
                              <div className={styles.healthCardInputRow} onClick={e => e.stopPropagation()}>
                                <input
                                  type="number" min="1" inputMode="numeric"
                                  value={sportMinutes}
                                  onChange={e => setSportMinutes(e.target.value)}
                                  placeholder="Min."
                                  autoFocus
                                  onKeyDown={e => e.key === 'Enter' && commitSport(sport)}
                                />
                                <button className={styles.healthCardAddBtn} onClick={e => { e.stopPropagation(); commitSport(sport) }}>
                                  + Hinzufügen
                                </button>
                              </div>
                              {kcalPrev !== null && <p className={styles.healthCardKcalPreview}>≈ −{kcalPrev} kcal</p>}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Food Picker */}
                <div className={styles.healthPickerSection}>
                  <p className={styles.healthPickerTitle}>Essen wählen</p>
                  <div className={styles.healthCategoryBar}>
                    <button
                      className={`${styles.healthCategoryBtn} ${catFilter === 'all' ? styles.healthCategoryBtnActive : ''}`}
                      onClick={() => setCatFilter('all')}
                    >Alle</button>
                    {kategorien.filter(cat => activeFoods.some(f => f.cat === cat.id)).map(cat => (
                      <button
                        key={cat.id}
                        className={`${styles.healthCategoryBtn} ${catFilter === cat.id ? styles.healthCategoryBtnActive : ''}`}
                        onClick={() => setCatFilter(cat.id)}
                      >{cat.de}</button>
                    ))}
                  </div>
                  <div className={styles.healthCardGrid}>
                    {visibleFoods.map(food => {
                      const isActive = activeFoodId === food.id
                      const grams    = num(foodGrams) || food.portionG
                      const kcalPrev = isActive ? Math.round((food.kcalPer100g / 100) * grams) : null
                      return (
                        <div
                          key={food.id}
                          className={`${styles.healthCard} ${isActive ? styles.healthCardActive : ''}`}
                          onClick={() => handleFoodClick(food)}
                        >
                          <p className={styles.healthCardName}>{food.de}</p>
                          {food.fa && <p className={styles.healthCardFa}>{food.fa}</p>}
                          <p className={styles.healthCardMeta}>{food.kcalPer100g} kcal/100g · {food.portionG}g</p>
                          {isActive && (
                            <>
                              <div className={styles.healthCardInputRow} onClick={e => e.stopPropagation()}>
                                <input
                                  type="number" min="1" inputMode="numeric"
                                  value={foodGrams}
                                  onChange={e => setFoodGrams(e.target.value)}
                                  placeholder={`${food.portionG}g`}
                                  autoFocus
                                  onKeyDown={e => e.key === 'Enter' && commitFood(food)}
                                />
                                <button className={styles.healthCardAddBtn} onClick={e => { e.stopPropagation(); commitFood(food) }}>
                                  + Hinzufügen
                                </button>
                              </div>
                              {kcalPrev !== null && <p className={styles.healthCardKcalPreview}>≈ {kcalPrev} kcal</p>}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: SUMMARY PANEL ── */}
              <form className={styles.healthSummaryPanel} onSubmit={saveRecord}>
                <p className={styles.healthSummaryTitle}>Tagesübersicht</p>

                <div className={styles.healthSummaryMeta}>
                  <div className={styles.healthSummaryMetaRow}>
                    <label>Datum</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                  </div>
                  <div className={styles.healthSummaryMetaRow}>
                    <label>Gewicht kg</label>
                    <input type="number" step="0.1" inputMode="decimal" value={form.weight} onChange={e => setForm(p => ({ ...p, weight: e.target.value }))} placeholder="optional" />
                  </div>
                </div>

                {/* Sport entries */}
                <div className={styles.healthSummaryGroup}>
                  <p className={styles.healthSummaryGroupLabel}>Sport</p>
                  {form.sports.length === 0
                    ? <p className={styles.healthEmptyItems}>Noch kein Sport ausgewählt</p>
                    : form.sports.map(s => (
                      <div key={s.id} className={`${styles.healthSummaryItem} ${styles.healthSummaryItemSport}`}>
                        <div className={styles.healthSummaryItemMain}>
                          <div className={styles.healthSummaryItemName}>{s.name}</div>
                          <div className={styles.healthSummaryItemSub}>{s.minutes} Minuten</div>
                        </div>
                        <span className={styles.healthSummaryItemKcal}>−{s.kcal} kcal</span>
                        <button type="button" className={styles.healthSummaryRemove} onClick={() => setForm(p => ({ ...p, sports: p.sports.filter(x => x.id !== s.id) }))}>✕</button>
                      </div>
                    ))
                  }
                </div>

                {/* Food entries */}
                <div className={styles.healthSummaryGroup}>
                  <p className={styles.healthSummaryGroupLabel}>Essen</p>
                  {form.foods.length === 0
                    ? <p className={styles.healthEmptyItems}>Noch kein Essen ausgewählt</p>
                    : form.foods.map(f => (
                      <div key={f.id} className={`${styles.healthSummaryItem} ${styles.healthSummaryItemFood}`}>
                        <div className={styles.healthSummaryItemMain}>
                          <div className={styles.healthSummaryItemName}>{f.name}</div>
                          <div className={styles.healthSummaryItemSub}>{f.grams}g</div>
                        </div>
                        <span className={styles.healthSummaryItemKcal}>{f.kcal} kcal</span>
                        <button type="button" className={styles.healthSummaryRemove} onClick={() => setForm(p => ({ ...p, foods: p.foods.filter(x => x.id !== f.id) }))}>✕</button>
                      </div>
                    ))
                  }
                </div>

                {/* Manual kcal */}
                <div className={styles.healthManualRow}>
                  <span>+ Manuell</span>
                  <input type="number" min="0" inputMode="numeric" value={form.manualKcal} onChange={e => setForm(p => ({ ...p, manualKcal: e.target.value }))} placeholder="kcal (optional)" />
                </div>

                {/* Totals */}
                <div className={styles.healthTotals}>
                  {totalFoodKcal > 0 && <div className={styles.healthTotalsRow}><span>Essen</span><span>{totalFoodKcal} kcal</span></div>}
                  {totalSportKcal > 0 && <div className={styles.healthTotalsRow}><span>Sport</span><span>−{totalSportKcal} kcal</span></div>}
                  <div className={styles.healthTotalsRowNet}>
                    <span>Netto</span>
                    <span>{totalFoodKcal - totalSportKcal} kcal</span>
                  </div>
                </div>

                <input className={styles.healthNoteInput} value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Notiz (optional)" />
                <button className={styles.healthSaveBtn} type="submit" disabled={saving}>
                  {saving ? 'Wird gespeichert…' : 'Tag speichern'}
                </button>
              </form>
            </div>

            {/* Chart */}
            <div className={styles.budgetGrid} style={{ marginTop: 20 }}>
              <section className={styles.budgetPanel}>
                <h2 className={styles.sectionTitle}>Diagramm — letzte 14 Tage</h2>
                {chartRecords.length ? (
                  <div className={styles.privateChart}>
                    {chartRecords.map(r => {
                      const kcal  = num(r.manualKcal) + (r.foods || []).reduce((s, f) => s + f.kcal, 0)
                      const sport = (r.sports || []).reduce((s, sp) => s + sp.minutes, 0)
                      return (
                        <div className={styles.privateChartCol} key={r.id}>
                          <div className={styles.privateChartBars}>
                            <span className={styles.privateCaloriesBar} style={{ height: `${Math.max((kcal / maxKcal) * 100, 4)}%` }} title={`${kcal} kcal`} />
                            <span className={styles.privateSportBar}    style={{ height: `${Math.max((sport / maxSport) * 100, 4)}%` }} title={`${sport} Min.`} />
                          </div>
                          <small>{r.date.slice(5)}</small>
                        </div>
                      )
                    })}
                  </div>
                ) : <p className={styles.emptyAnalytics}>Noch keine Werte.</p>}
                <div className={styles.privateLegend}>
                  <span><i className={styles.legendCalories} /> Kalorien</span>
                  <span><i className={styles.legendSport} /> Sport (Min.)</span>
                </div>
              </section>

              {/* History */}
              <section className={styles.budgetPanel}>
                <h2 className={styles.sectionTitle}>Tagebuch</h2>
                {sortedRecords.length ? (
                  <div className={styles.budgetEntryList}>
                    {sortedRecords.map(r => {
                      const kcal      = num(r.manualKcal) + (r.foods || []).reduce((s, f) => s + f.kcal, 0)
                      const sportMin  = (r.sports || []).reduce((s, sp) => s + sp.minutes, 0)
                      const sportKcal = (r.sports || []).reduce((s, sp) => s + sp.kcal, 0)
                      return (
                        <div className={styles.budgetEntry} key={r.id}>
                          <span className={`${styles.budgetEntryType} ${styles.entryIncome}`}>{r.date.slice(8)}.{r.date.slice(5, 7)}</span>
                          <div className={styles.budgetEntryMain}>
                            <strong>{kcal} kcal{sportMin > 0 ? ` · −${sportKcal} Sport` : ''}{r.weight ? ` · ${r.weight} kg` : ''}</strong>
                            <span>
                              {(r.sports || []).map(s => s.name).join(', ')}
                              {(r.sports || []).length > 0 && (r.foods || []).length > 0 ? ' · ' : ''}
                              {(r.foods  || []).map(f => f.name).join(', ')}
                              {r.note ? ` · ${r.note}` : ''}
                            </span>
                          </div>
                          <button className={styles.actionBtn} type="button" onClick={() => deleteRecord(r.id)}>Löschen</button>
                        </div>
                      )
                    })}
                  </div>
                ) : <p className={styles.emptyAnalytics}>Noch keine Einträge.</p>}
              </section>
            </div>
          </>
        )}

        {/* ── TAB: LISTEN BEARBEITEN ── */}
        {tab === 'lists' && (
          <>
            <div className={styles.financeTabs} style={{ marginBottom: 20 }}>
              <button className={listTab === 'sport' ? styles.financeTabActive : styles.financeTab} onClick={() => setListTab('sport')}>
                Sportarten <span>{activeSports.length}</span>
              </button>
              <button className={listTab === 'food' ? styles.financeTabActive : styles.financeTab} onClick={() => setListTab('food')}>
                Lebensmittel <span>{activeFoods.length}</span>
              </button>
            </div>

            {listTab === 'sport' && (
              <div className={styles.budgetGrid}>
                <section className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle}>Neue Sportart</h2>
                  <form className={styles.budgetForm} onSubmit={addCustomSport}>
                    <label><span>Name (Deutsch)</span><input value={newSport.de} onChange={e => setNewSport(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Kampfsport" required /></label>
                    <label><span>Name (فارسی)</span><input value={newSport.fa} onChange={e => setNewSport(p => ({ ...p, fa: e.target.value }))} placeholder="اختیاری" /></label>
                    <label><span>kcal / Minute</span><input type="number" min="1" max="30" step="0.5" value={newSport.kcalPerMin} onChange={e => setNewSport(p => ({ ...p, kcalPerMin: e.target.value }))} placeholder="z. B. 7" required /></label>
                    <button className={styles.primaryBudgetBtn} type="submit">Hinzufügen</button>
                  </form>
                </section>

                <section className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle}>Alle Sportarten ({activeSports.length})</h2>
                  <div className={styles.budgetEntryList}>
                    {activeSports.map(s => (
                      <div className={styles.budgetEntry} key={s.id}>
                        <div className={styles.budgetEntryMain}>
                          <strong>{s.de}{s.custom ? ' ✦' : ''}</strong>
                          <span>{s.fa ? `${s.fa} · ` : ''}{s.kcalPerMin} kcal/min</span>
                        </div>
                        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button"
                          onClick={() => s.custom ? deleteCustomSport(s.id) : deleteSport(s.id)}>Löschen</button>
                      </div>
                    ))}
                  </div>
                  {deletedSports.size > 0 && (
                    <>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: '14px 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gelöscht – wiederherstellbar</p>
                      <div className={styles.budgetEntryList} style={{ opacity: 0.55 }}>
                        {DEFAULT_SPORTS.filter(s => deletedSports.has(s.id)).map(s => (
                          <div className={styles.budgetEntry} key={s.id}>
                            <div className={styles.budgetEntryMain}><strong>{s.de}</strong><span>{s.fa} · {s.kcalPerMin} kcal/min</span></div>
                            <button className={styles.actionBtn} type="button" onClick={() => restoreSport(s.id)}>Wiederherstellen</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              </div>
            )}

            {listTab === 'food' && (
              <div className={styles.budgetGrid}>
                <section className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle}>Neues Lebensmittel</h2>
                  <form className={styles.budgetForm} onSubmit={addCustomFood}>
                    <label><span>Name (Deutsch)</span><input value={newFood.de} onChange={e => setNewFood(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Käsekuchen" required /></label>
                    <label><span>Name (فارسی)</span><input value={newFood.fa} onChange={e => setNewFood(p => ({ ...p, fa: e.target.value }))} placeholder="اختیاری" /></label>
                    <label>
                      <span>Kategorie</span>
                      <select value={newFood.cat} onChange={e => setNewFood(p => ({ ...p, cat: e.target.value }))}>
                        {kategorien.map(c => <option key={c.id} value={c.id}>{c.de}</option>)}
                      </select>
                    </label>
                    <div className={styles.budgetFieldRow}>
                      <label><span>kcal / 100g</span><input type="number" min="0" inputMode="numeric" value={newFood.kcalPer100g} onChange={e => setNewFood(p => ({ ...p, kcalPer100g: e.target.value }))} placeholder="z. B. 250" required /></label>
                      <label><span>Portion (g)</span><input type="number" min="1" inputMode="numeric" value={newFood.portionG} onChange={e => setNewFood(p => ({ ...p, portionG: e.target.value }))} placeholder="z. B. 150" /></label>
                    </div>
                    <button className={styles.primaryBudgetBtn} type="submit">Hinzufügen</button>
                  </form>
                </section>

                <section className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle}>Alle Lebensmittel ({activeFoods.length})</h2>
                  <div className={styles.budgetEntryList}>
                    {kategorien.map(cat => {
                      const items = activeFoods.filter(f => f.cat === cat.id)
                      if (!items.length) return null
                      return (
                        <div key={cat.id}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '10px 0 4px' }}>{cat.de} · {cat.fa}</p>
                          {items.map(f => (
                            <div className={styles.budgetEntry} key={f.id}>
                              <div className={styles.budgetEntryMain}>
                                <strong>{f.de}{f.custom ? ' ✦' : ''}</strong>
                                <span>{f.fa ? `${f.fa} · ` : ''}{f.kcalPer100g} kcal/100g · {f.portionG}g</span>
                              </div>
                              <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button"
                                onClick={() => f.custom ? deleteCustomFood(f.id) : deleteFood(f.id)}>Löschen</button>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                    {activeFoods.filter(f => !kategorien.find(c => c.id === f.cat)).map(f => (
                      <div className={styles.budgetEntry} key={f.id}>
                        <div className={styles.budgetEntryMain}><strong>{f.de} ✦</strong><span>{f.fa} · {f.kcalPer100g} kcal/100g</span></div>
                        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button" onClick={() => deleteCustomFood(f.id)}>Löschen</button>
                      </div>
                    ))}
                  </div>
                  {deletedFoods.size > 0 && (
                    <>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: '14px 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gelöscht – wiederherstellbar</p>
                      <div className={styles.budgetEntryList} style={{ opacity: 0.55 }}>
                        {DEFAULT_FOODS.filter(f => deletedFoods.has(f.id)).map(f => (
                          <div className={styles.budgetEntry} key={f.id}>
                            <div className={styles.budgetEntryMain}><strong>{f.de}</strong><span>{f.fa} · {f.kcalPer100g} kcal/100g</span></div>
                            <button className={styles.actionBtn} type="button" onClick={() => restoreFood(f.id)}>Wiederherstellen</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
