'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { sportarten as DEFAULT_SPORTS, lebensmittel as DEFAULT_FOODS, kategorien } from '@/data/health'
import styles from '../admin.module.css'

function today() { return new Date().toISOString().slice(0, 10) }
function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
function num(v)  { return Number(v) || 0 }

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

  const [records, setRecords]           = useState([])
  const [customSports, setCustomSports] = useState([])
  const [deletedSports, setDeletedSports] = useState(new Set())
  const [customFoods, setCustomFoods]   = useState([])
  const [deletedFoods, setDeletedFoods] = useState(new Set())

  const [form, setForm]           = useState(emptyForm())
  const [sportPick, setSportPick] = useState({ sportId: '', minutes: '' })
  const [foodPick, setFoodPick]   = useState({ foodId: '', grams: '' })
  const [saving, setSaving]       = useState(false)

  const [newSport, setNewSport] = useState({ de: '', fa: '', kcalPerMin: '' })
  const [newFood, setNewFood]   = useState({ de: '', fa: '', cat: 'irani-haupt', kcalPer100g: '', portionG: '' })

  const loadAll = useCallback(async () => {
    setLoading(true)
    const data = await apiFetch('')
    if (data) {
      setRecords(data.records.map(r => ({
        ...r,
        manualKcal: r.manual_kcal,
        sports: r.sports || [],
        foods:  r.foods  || [],
      })))
      setCustomSports(data.customSports.map(s => ({
        id: s.id, de: s.de, fa: s.fa, kcalPerMin: Number(s.kcal_per_min), custom: true,
      })))
      setCustomFoods(data.customFoods.map(f => ({
        id: f.id, de: f.de, fa: f.fa, cat: f.cat, kcalPer100g: f.kcal_per_100g, portionG: f.portion_g, custom: true,
      })))
      const deletedSportIds = data.deletedIds.filter(d => d.item_type === 'sport').map(d => d.item_id)
      const deletedFoodIds  = data.deletedIds.filter(d => d.item_type === 'food').map(d => d.item_id)
      setDeletedSports(new Set(deletedSportIds))
      setDeletedFoods(new Set(deletedFoodIds))
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

  const totalFoodKcal  = useMemo(() => num(form.manualKcal) + form.foods.reduce((s, f) => s + f.kcal, 0), [form])
  const totalSportKcal = useMemo(() => form.sports.reduce((s, sp) => s + sp.kcal, 0), [form])

  function addSport() {
    const sport = activeSports.find(s => s.id === sportPick.sportId)
    if (!sport || !sportPick.minutes) return
    const kcal = Math.round(sport.kcalPerMin * num(sportPick.minutes))
    setForm(p => ({ ...p, sports: [...p.sports, { id: makeId(), name: sport.de, fa: sport.fa, sportId: sport.id, minutes: num(sportPick.minutes), kcal }] }))
    setSportPick({ sportId: '', minutes: '' })
  }

  function addFood() {
    const food = activeFoods.find(f => f.id === foodPick.foodId)
    if (!food) return
    const grams = num(foodPick.grams) || food.portionG
    const kcal  = Math.round((food.kcalPer100g / 100) * grams)
    setForm(p => ({ ...p, foods: [...p.foods, { id: makeId(), name: food.de, fa: food.fa, foodId: food.id, grams, kcal }] }))
    setFoodPick({ foodId: '', grams: '' })
  }

  async function saveRecord(e) {
    e.preventDefault()
    setSaving(true)
    const rec = {
      id:          makeId(),
      date:        form.date || today(),
      weight:      form.weight ? num(form.weight) : null,
      note:        form.note.trim(),
      manual_kcal: num(form.manualKcal),
      sports:      form.sports,
      foods:       form.foods,
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

  async function deleteSport(id) {
    await apiFetch(`/sports?id=${id}&custom=false`, 'DELETE')
    setDeletedSports(prev => new Set([...prev, id]))
  }
  async function restoreSport(id) {
    await apiFetch('/sports', 'PATCH', { id })
    setDeletedSports(prev => { const n = new Set(prev); n.delete(id); return n })
  }
  async function deleteCustomSport(id) {
    await apiFetch(`/sports?id=${id}&custom=true`, 'DELETE')
    setCustomSports(prev => prev.filter(s => s.id !== id))
  }
  async function addCustomSport(e) {
    e.preventDefault()
    if (!newSport.de || !newSport.kcalPerMin) return
    const sport = { id: makeId(), de: newSport.de, fa: newSport.fa, kcalPerMin: num(newSport.kcalPerMin), custom: true }
    await apiFetch('/sports', 'POST', sport)
    setCustomSports(prev => [...prev, sport])
    setNewSport({ de: '', fa: '', kcalPerMin: '' })
  }

  async function deleteFood(id) {
    await apiFetch(`/foods?id=${id}&custom=false`, 'DELETE')
    setDeletedFoods(prev => new Set([...prev, id]))
  }
  async function restoreFood(id) {
    await apiFetch('/foods', 'PATCH', { id })
    setDeletedFoods(prev => { const n = new Set(prev); n.delete(id); return n })
  }
  async function deleteCustomFood(id) {
    await apiFetch(`/foods?id=${id}&custom=true`, 'DELETE')
    setCustomFoods(prev => prev.filter(f => f.id !== id))
  }
  async function addCustomFood(e) {
    e.preventDefault()
    if (!newFood.de || !newFood.kcalPer100g) return
    const food = { id: makeId(), de: newFood.de, fa: newFood.fa, cat: newFood.cat, kcalPer100g: num(newFood.kcalPer100g), portionG: num(newFood.portionG) || 100, custom: true }
    await apiFetch('/foods', 'POST', food)
    setCustomFoods(prev => [...prev, food])
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
  const maxKcal      = Math.max(1, ...chartRecords.map(r => num(r.manualKcal) + (r.foods || []).reduce((s, f) => s + f.kcal, 0)))
  const maxSport     = Math.max(1, ...chartRecords.map(r => (r.sports || []).reduce((s, sp) => s + sp.minutes, 0)))

  const selectedFood  = activeFoods.find(f => f.id === foodPick.foodId)
  const selectedSport = activeSports.find(s => s.id === sportPick.sportId)
  const sortedRecords = useMemo(() => [...records].sort((a, b) => b.date.localeCompare(a.date)), [records])

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <p className={styles.emptyAnalytics}>Daten werden geladen…</p>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <div className={styles.budgetHero}>
          <div>
            <h1 className={styles.title}>Kalorien & täglicher Sport</h1>
            <p className={styles.sub}>Täglich Kalorien, Gewicht und Sport eintragen. Wird in Supabase gespeichert.</p>
          </div>
        </div>

        <div className={styles.financeTabs}>
          <button className={tab === 'log'   ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('log')}>Tagesbuch</button>
          <button className={tab === 'lists' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('lists')}>
            Listen verwalten <span>{activeSports.length + activeFoods.length}</span>
          </button>
        </div>

        {tab === 'log' && (
          <>
            <section className={styles.budgetSummaryGrid}>
              <div className={styles.budgetMetric}><span>Erfasste Tage</span><strong>{summary.days}</strong></div>
              <div className={styles.budgetMetric}><span>Ø Kalorien</span><strong>{summary.avgKcal} kcal</strong></div>
              <div className={styles.budgetMetric}><span>Sport gesamt</span><strong>{summary.totalSport} Min.</strong></div>
              <div className={styles.budgetMetric}><span>Letztes Gewicht</span><strong>{summary.lastWeight ? `${summary.lastWeight} kg` : '—'}</strong></div>
              <div className={styles.budgetMetric}><span>Heute</span><strong>{today().slice(5).split('-').reverse().join('.')}</strong></div>
            </section>

            <div className={styles.budgetGrid}>
              <section className={styles.budgetPanel}>
                <h2 className={styles.sectionTitle}>Tageswert eintragen</h2>
                <form className={styles.budgetForm} onSubmit={saveRecord}>
                  <div className={styles.budgetFieldRow}>
                    <label><span>Datum</span><input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></label>
                    <label><span>Gewicht kg</span><input type="number" step="0.1" inputMode="decimal" value={form.weight} onChange={e => setForm(p => ({ ...p, weight: e.target.value }))} placeholder="optional" /></label>
                  </div>

                  <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: '12px 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sport</p>
                  <div className={styles.budgetFieldRow}>
                    <label>
                      <span>Sportart</span>
                      <select value={sportPick.sportId} onChange={e => setSportPick(p => ({ ...p, sportId: e.target.value }))}>
                        <option value="">— wählen —</option>
                        {activeSports.map(s => <option key={s.id} value={s.id}>{s.de} · {s.kcalPerMin} kcal/min</option>)}
                      </select>
                    </label>
                    <label>
                      <span>Minuten</span>
                      <input type="number" min="1" inputMode="numeric" value={sportPick.minutes} onChange={e => setSportPick(p => ({ ...p, minutes: e.target.value }))} placeholder="z. B. 30" />
                    </label>
                  </div>
                  {selectedSport && sportPick.minutes && (
                    <p style={{ fontSize: 12, color: '#0F6E56', margin: '-4px 0 6px' }}>≈ {Math.round(selectedSport.kcalPerMin * num(sportPick.minutes))} kcal verbrannt</p>
                  )}
                  <button type="button" onClick={addSport} className={styles.actionBtn} disabled={!sportPick.sportId || !sportPick.minutes}>+ Sport hinzufügen</button>

                  {form.sports.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {form.sports.map(s => (
                        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '5px 10px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0' }}>
                          <span style={{ color: '#166534' }}>{s.name} · {s.minutes} Min. · −{s.kcal} kcal</span>
                          <button type="button" onClick={() => setForm(p => ({ ...p, sports: p.sports.filter(x => x.id !== s.id) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 14 }}>✕</button>
                        </div>
                      ))}
                      <p style={{ fontSize: 12, color: '#0F6E56', margin: '2px 0 0' }}>Gesamt Sport: −{totalSportKcal} kcal</p>
                    </div>
                  )}

                  <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: '14px 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Essen</p>
                  <div className={styles.budgetFieldRow}>
                    <label>
                      <span>Lebensmittel</span>
                      <select value={foodPick.foodId} onChange={e => setFoodPick({ foodId: e.target.value, grams: '' })}>
                        <option value="">— wählen —</option>
                        {kategorien.map(cat => {
                          const items = activeFoods.filter(f => f.cat === cat.id)
                          if (!items.length) return null
                          return (
                            <optgroup key={cat.id} label={`${cat.de} · ${cat.fa}`}>
                              {items.map(f => <option key={f.id} value={f.id}>{f.de} ({f.kcalPer100g} kcal/100g)</option>)}
                            </optgroup>
                          )
                        })}
                        {activeFoods.filter(f => !kategorien.find(c => c.id === f.cat)).map(f => (
                          <option key={f.id} value={f.id}>{f.de}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Gramm</span>
                      <input type="number" min="1" inputMode="numeric" value={foodPick.grams} onChange={e => setFoodPick(p => ({ ...p, grams: e.target.value }))} placeholder={selectedFood ? `Std: ${selectedFood.portionG}g` : 'Gramm'} />
                    </label>
                  </div>
                  {selectedFood && (
                    <p style={{ fontSize: 12, color: '#c2410c', margin: '-4px 0 6px' }}>
                      ≈ {Math.round((selectedFood.kcalPer100g / 100) * (num(foodPick.grams) || selectedFood.portionG))} kcal
                      {!foodPick.grams && ` (${selectedFood.portionG}g Standardportion)`}
                    </p>
                  )}
                  <button type="button" onClick={addFood} className={styles.actionBtn} disabled={!foodPick.foodId}>+ Essen hinzufügen</button>

                  {form.foods.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {form.foods.map(f => (
                        <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '5px 10px', background: '#fff7ed', borderRadius: 6, border: '1px solid #fed7aa' }}>
                          <span style={{ color: '#9a3412' }}>{f.name} · {f.grams}g · {f.kcal} kcal</span>
                          <button type="button" onClick={() => setForm(p => ({ ...p, foods: p.foods.filter(x => x.id !== f.id) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 14 }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label style={{ marginTop: 8 }}>
                    <span>Zusätzliche Kalorien (manuell)</span>
                    <input type="number" min="0" inputMode="numeric" value={form.manualKcal} onChange={e => setForm(p => ({ ...p, manualKcal: e.target.value }))} placeholder="für Gerichte ohne Eintrag" />
                  </label>

                  {(form.foods.length > 0 || form.manualKcal) && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginTop: 4 }}>
                      <div><strong>Gesamt Kalorien: {totalFoodKcal} kcal</strong></div>
                      {totalSportKcal > 0 && (
                        <div style={{ color: '#64748b', marginTop: 2 }}>− {totalSportKcal} kcal Sport = <strong style={{ color: '#0f172a' }}>{totalFoodKcal - totalSportKcal} kcal netto</strong></div>
                      )}
                    </div>
                  )}

                  <label>
                    <span>Notiz</span>
                    <input value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="optional" />
                  </label>
                  <button className={styles.primaryBudgetBtn} type="submit" disabled={saving}>
                    {saving ? 'Wird gespeichert…' : 'Tag speichern'}
                  </button>
                </form>
              </section>

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
                ) : <p className={styles.emptyAnalytics}>Noch keine Werte eingetragen.</p>}
                <div className={styles.privateLegend}>
                  <span><i className={styles.legendCalories} /> Kalorien</span>
                  <span><i className={styles.legendSport} /> Sport (Min.)</span>
                </div>
              </section>
            </div>

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
                          <strong>
                            {kcal} kcal
                            {sportMin > 0 ? ` · −${sportKcal} kcal Sport (${sportMin} Min.) = ${kcal - sportKcal} netto` : ''}
                            {r.weight ? ` · ${r.weight} kg` : ''}
                          </strong>
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
          </>
        )}

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
                  <h2 className={styles.sectionTitle}>Neue Sportart hinzufügen</h2>
                  <form className={styles.budgetForm} onSubmit={addCustomSport}>
                    <label><span>Name (Deutsch)</span><input value={newSport.de} onChange={e => setNewSport(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Kampfsport" required /></label>
                    <label><span>Name (فارسی) — اختیاری</span><input value={newSport.fa} onChange={e => setNewSport(p => ({ ...p, fa: e.target.value }))} /></label>
                    <label><span>kcal pro Minute</span><input type="number" min="1" max="30" step="0.5" value={newSport.kcalPerMin} onChange={e => setNewSport(p => ({ ...p, kcalPerMin: e.target.value }))} placeholder="z. B. 7" required /></label>
                    <button className={styles.primaryBudgetBtn} type="submit">Hinzufügen</button>
                  </form>
                </section>

                <section className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle}>Aktive Sportarten ({activeSports.length})</h2>
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
                      <p style={{ fontSize: 12, color: '#94a3b8', margin: '16px 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gelöscht – wiederherstellbar</p>
                      <div className={styles.budgetEntryList} style={{ opacity: 0.6 }}>
                        {DEFAULT_SPORTS.filter(s => deletedSports.has(s.id)).map(s => (
                          <div className={styles.budgetEntry} key={s.id}>
                            <div className={styles.budgetEntryMain}>
                              <strong>{s.de}</strong><span>{s.fa} · {s.kcalPerMin} kcal/min</span>
                            </div>
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
                  <h2 className={styles.sectionTitle}>Neues Lebensmittel hinzufügen</h2>
                  <form className={styles.budgetForm} onSubmit={addCustomFood}>
                    <label><span>Name (Deutsch)</span><input value={newFood.de} onChange={e => setNewFood(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Käsekuchen" required /></label>
                    <label><span>Name (فارسی) — اختیاری</span><input value={newFood.fa} onChange={e => setNewFood(p => ({ ...p, fa: e.target.value }))} /></label>
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
                  <h2 className={styles.sectionTitle}>Aktive Lebensmittel ({activeFoods.length})</h2>
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
                        <div className={styles.budgetEntryMain}>
                          <strong>{f.de} ✦</strong><span>{f.fa} · {f.kcalPer100g} kcal/100g</span>
                        </div>
                        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button" onClick={() => deleteCustomFood(f.id)}>Löschen</button>
                      </div>
                    ))}
                  </div>
                  {deletedFoods.size > 0 && (
                    <>
                      <p style={{ fontSize: 12, color: '#94a3b8', margin: '16px 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gelöscht – wiederherstellbar</p>
                      <div className={styles.budgetEntryList} style={{ opacity: 0.6 }}>
                        {DEFAULT_FOODS.filter(f => deletedFoods.has(f.id)).map(f => (
                          <div className={styles.budgetEntry} key={f.id}>
                            <div className={styles.budgetEntryMain}>
                              <strong>{f.de}</strong><span>{f.fa} · {f.kcalPer100g} kcal/100g</span>
                            </div>
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
