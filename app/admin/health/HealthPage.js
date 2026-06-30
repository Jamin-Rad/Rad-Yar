'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { sportarten as DEFAULT_SPORTS, lebensmittel as DEFAULT_FOODS, kategorien } from '@/data/health'
import s from './health.module.css'

function today() { return new Date().toISOString().slice(0, 10) }
function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
function num(v)   { return Number(v) || 0 }
function initials(str) { return str.slice(0, 2).toUpperCase() }

const emptyForm = () => ({ date: today(), weight: '', note: '', manualKcal: '', sports: [], foods: [] })

async function api(path, method = 'GET', body) {
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

  const [form, setForm]   = useState(emptyForm())
  const [saving, setSaving] = useState(false)

  const [activeSportId, setActiveSportId] = useState(null)
  const [sportMinutes, setSportMinutes]   = useState('')
  const [activeFoodId, setActiveFoodId]   = useState(null)
  const [foodGrams, setFoodGrams]         = useState('')
  const [catFilter, setCatFilter]         = useState('all')

  const [newSport, setNewSport] = useState({ de: '', kcalPerMin: '' })
  const [newFood, setNewFood]   = useState({ de: '', cat: 'irani-haupt', kcalPer100g: '', portionG: '' })

  const loadAll = useCallback(async () => {
    setLoading(true)
    const data = await api('')
    if (data) {
      setRecords(data.records.map(r => ({ ...r, manualKcal: r.manual_kcal, sports: r.sports || [], foods: r.foods || [] })))
      setCustomSports(data.customSports.map(s => ({ id: s.id, de: s.de, kcalPerMin: Number(s.kcal_per_min), custom: true })))
      setCustomFoods(data.customFoods.map(f => ({ id: f.id, de: f.de, cat: f.cat, kcalPer100g: f.kcal_per_100g, portionG: f.portion_g, custom: true })))
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

  const totalFoodKcal  = num(form.manualKcal) + form.foods.reduce((t, f) => t + f.kcal, 0)
  const totalSportKcal = form.sports.reduce((t, sp) => t + sp.kcal, 0)
  const netKcal        = totalFoodKcal - totalSportKcal

  function toggleSport(sport) {
    if (activeSportId === sport.id) { setActiveSportId(null); setSportMinutes(''); return }
    setActiveSportId(sport.id); setSportMinutes('')
  }

  function commitSport(sport) {
    if (!sportMinutes) return
    const kcal = Math.round(sport.kcalPerMin * num(sportMinutes))
    setForm(p => ({ ...p, sports: [...p.sports, { id: makeId(), name: sport.de, sportId: sport.id, minutes: num(sportMinutes), kcal }] }))
    setActiveSportId(null); setSportMinutes('')
  }

  function toggleFood(food) {
    if (activeFoodId === food.id) { setActiveFoodId(null); setFoodGrams(''); return }
    setActiveFoodId(food.id); setFoodGrams('')
  }

  function commitFood(food) {
    const grams = num(foodGrams) || food.portionG
    const kcal  = Math.round((food.kcalPer100g / 100) * grams)
    setForm(p => ({ ...p, foods: [...p.foods, { id: makeId(), name: food.de, foodId: food.id, grams, kcal }] }))
    setActiveFoodId(null); setFoodGrams('')
  }

  async function saveRecord(e) {
    e.preventDefault(); setSaving(true)
    const rec = { id: makeId(), date: form.date || today(), weight: form.weight ? num(form.weight) : null, note: form.note.trim(), manual_kcal: num(form.manualKcal), sports: form.sports, foods: form.foods }
    await api('/records', 'POST', rec)
    await loadAll()
    setForm(emptyForm()); setSaving(false)
  }

  async function deleteRecord(id) { await api(`/records?id=${id}`, 'DELETE'); setRecords(p => p.filter(r => r.id !== id)) }

  async function doDeleteSport(id)   { await api(`/sports?id=${id}&custom=false`, 'DELETE'); setDeletedSports(p => new Set([...p, id])) }
  async function doRestoreSport(id)  { await api('/sports', 'PATCH', { id }); setDeletedSports(p => { const n = new Set(p); n.delete(id); return n }) }
  async function doDelCustomSport(id){ await api(`/sports?id=${id}&custom=true`, 'DELETE'); setCustomSports(p => p.filter(x => x.id !== id)) }
  async function addCustomSport(e) {
    e.preventDefault()
    if (!newSport.de || !newSport.kcalPerMin) return
    const sp = { id: makeId(), de: newSport.de, kcalPerMin: num(newSport.kcalPerMin), custom: true }
    await api('/sports', 'POST', sp)
    setCustomSports(p => [...p, sp]); setNewSport({ de: '', kcalPerMin: '' })
  }

  async function doDeleteFood(id)    { await api(`/foods?id=${id}&custom=false`, 'DELETE'); setDeletedFoods(p => new Set([...p, id])) }
  async function doRestoreFood(id)   { await api('/foods', 'PATCH', { id }); setDeletedFoods(p => { const n = new Set(p); n.delete(id); return n }) }
  async function doDelCustomFood(id) { await api(`/foods?id=${id}&custom=true`, 'DELETE'); setCustomFoods(p => p.filter(x => x.id !== id)) }
  async function addCustomFood(e) {
    e.preventDefault()
    if (!newFood.de || !newFood.kcalPer100g) return
    const fd = { id: makeId(), de: newFood.de, cat: newFood.cat, kcalPer100g: num(newFood.kcalPer100g), portionG: num(newFood.portionG) || 100, custom: true }
    await api('/foods', 'POST', fd)
    setCustomFoods(p => [...p, fd]); setNewFood({ de: '', cat: 'irani-haupt', kcalPer100g: '', portionG: '' })
  }

  const summary = useMemo(() => {
    const days      = records.length
    const totalKcal = records.reduce((t, r) => t + num(r.manualKcal) + (r.foods || []).reduce((ft, f) => ft + f.kcal, 0), 0)
    const totalMin  = records.reduce((t, r) => t + (r.sports || []).reduce((st, sp) => st + sp.minutes, 0), 0)
    const lastW     = [...records].sort((a, b) => b.date.localeCompare(a.date)).find(r => r.weight)?.weight
    return { days, avgKcal: days ? Math.round(totalKcal / days) : 0, totalMin, lastW }
  }, [records])

  const chartRecords = useMemo(() => [...records].sort((a, b) => a.date.localeCompare(b.date)).slice(-14), [records])
  const maxKcal  = Math.max(1, ...chartRecords.map(r => num(r.manualKcal) + (r.foods || []).reduce((t, f) => t + f.kcal, 0)))
  const maxSport = Math.max(1, ...chartRecords.map(r => (r.sports || []).reduce((t, sp) => t + sp.minutes, 0)))
  const sorted   = useMemo(() => [...records].sort((a, b) => b.date.localeCompare(a.date)), [records])

  const activeFood  = activeFoods.find(f => f.id === activeFoodId)
  const activeSport = activeSports.find(s => s.id === activeSportId)

  if (loading) return <div className={s.page}><p className={s.emptyHistory}>Wird geladen…</p></div>

  return (
    <div className={s.page}>
      <div className={s.hero}>
        <h1>Kalorien & Sport</h1>
        <p>Sport und Essen auswählen — Kalorien werden automatisch berechnet.</p>
      </div>

      <div className={s.tabs}>
        <button className={tab === 'log'   ? s.tabActive : s.tab} onClick={() => setTab('log')}>Tagesbuch</button>
        <button className={tab === 'lists' ? s.tabActive : s.tab} onClick={() => setTab('lists')}>Listen bearbeiten</button>
      </div>

      {/* ── TAGESBUCH ── */}
      {tab === 'log' && (
        <>
          <div className={s.statsRow}>
            <div className={s.stat}><span>Erfasste Tage</span><strong>{summary.days}</strong></div>
            <div className={s.stat}><span>Ø Kalorien</span><strong>{summary.avgKcal}</strong></div>
            <div className={s.stat}><span>Sport gesamt</span><strong>{summary.totalMin} Min.</strong></div>
            <div className={s.stat}><span>Letztes Gewicht</span><strong>{summary.lastW ? `${summary.lastW} kg` : '—'}</strong></div>
          </div>

          <form onSubmit={saveRecord}>
            <div className={s.grid}>

              {/* LEFT */}
              <div>
                {/* Sport */}
                <div className={s.panel}>
                  <div className={s.panelLabel}>Sport</div>
                  <hr className={s.divider} />
                  {activeSports.map(sport => {
                    const isActive   = activeSportId === sport.id
                    const kcalPrev   = isActive && sportMinutes ? Math.round(sport.kcalPerMin * num(sportMinutes)) : null
                    return (
                      <div key={sport.id}>
                        <div className={isActive ? s.rowActive : s.row} onClick={() => toggleSport(sport)}>
                          <div className={isActive ? s.rowInitialActive : s.rowInitial}>{initials(sport.de)}</div>
                          <div className={s.rowMain}>
                            <div className={isActive ? s.rowNameActive : s.rowName}>{sport.de}</div>
                            <div className={s.rowSub}>{sport.kcalPerMin} kcal/min</div>
                          </div>
                          <button
                            type="button"
                            className={isActive ? s.addBtnActive : s.addBtn}
                            onClick={e => { e.stopPropagation(); toggleSport(sport) }}
                          >{isActive ? '✕' : '+'}</button>
                        </div>

                        {isActive && (
                          <>
                            <div className={s.inlineInput}>
                              <input
                                type="number" min="1" inputMode="numeric"
                                value={sportMinutes}
                                onChange={e => setSportMinutes(e.target.value)}
                                placeholder="Minuten eingeben…"
                                autoFocus
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), commitSport(sport))}
                              />
                              <button type="button" className={s.confirmBtn} onClick={() => commitSport(sport)}>
                                + Hinzufügen
                              </button>
                            </div>
                            {kcalPrev !== null && <div className={s.kcalPreview}>≈ −{kcalPrev} kcal verbrannt</div>}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Essen */}
                <div className={s.panel}>
                  <div className={s.panelLabel}>Essen</div>
                  <hr className={s.divider} />
                  <div className={s.catBar}>
                    <button type="button" className={catFilter === 'all' ? s.catPillActive : s.catPill} onClick={() => setCatFilter('all')}>Alle</button>
                    {kategorien.filter(cat => activeFoods.some(f => f.cat === cat.id)).map(cat => (
                      <button key={cat.id} type="button" className={catFilter === cat.id ? s.catPillActive : s.catPill} onClick={() => setCatFilter(cat.id)}>
                        {cat.de}
                      </button>
                    ))}
                  </div>
                  <hr className={s.divider} />
                  {visibleFoods.map(food => {
                    const isActive = activeFoodId === food.id
                    const grams    = num(foodGrams) || food.portionG
                    const kcalPrev = isActive ? Math.round((food.kcalPer100g / 100) * grams) : null
                    return (
                      <div key={food.id}>
                        <div className={isActive ? s.rowActive : s.row} onClick={() => toggleFood(food)}>
                          <div className={isActive ? s.rowInitialActive : s.rowInitial}>{initials(food.de)}</div>
                          <div className={s.rowMain}>
                            <div className={isActive ? s.rowNameActive : s.rowName}>{food.de}</div>
                            <div className={s.rowSub}>{food.portionG}g Portion</div>
                          </div>
                          <div className={s.rowMeta}>{food.kcalPer100g} kcal/100g</div>
                          <button
                            type="button"
                            className={isActive ? s.addBtnActive : s.addBtn}
                            onClick={e => { e.stopPropagation(); toggleFood(food) }}
                          >{isActive ? '✕' : '+'}</button>
                        </div>

                        {isActive && (
                          <>
                            <div className={s.inlineInput}>
                              <input
                                type="number" min="1" inputMode="numeric"
                                value={foodGrams}
                                onChange={e => setFoodGrams(e.target.value)}
                                placeholder={`${food.portionG}g (Standardportion)`}
                                autoFocus
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), commitFood(food))}
                              />
                              <button type="button" className={s.confirmBtn} onClick={() => commitFood(food)}>
                                + Hinzufügen
                              </button>
                            </div>
                            {kcalPrev !== null && <div className={s.kcalPreview}>≈ {kcalPrev} kcal</div>}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT: Summary */}
              <div className={s.summaryPanel}>
                <div className={s.summaryMeta}>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                  <input type="number" step="0.1" inputMode="decimal" value={form.weight} onChange={e => setForm(p => ({ ...p, weight: e.target.value }))} placeholder="Gewicht kg" style={{ width: 96 }} />
                </div>

                <div className={s.kcalHero}>
                  <div className={s.kcalNum}>{netKcal.toLocaleString('de')}</div>
                  <div className={s.kcalLabel}>kcal netto heute</div>
                </div>

                <div className={s.summaryItems}>
                  {form.sports.length === 0 && form.foods.length === 0
                    ? <div className={s.emptyItems}>Noch nichts hinzugefügt</div>
                    : <>
                        {form.sports.map(sp => (
                          <div key={sp.id} className={s.summaryItem}>
                            <div className={`${s.summaryDot} ${s.dotSport}`} />
                            <div className={s.summaryItemName}>{sp.name} · {sp.minutes} min</div>
                            <div className={`${s.summaryItemKcal} ${s.summaryItemKcalSport}`}>−{sp.kcal}</div>
                            <button type="button" className={s.summaryRemove} onClick={() => setForm(p => ({ ...p, sports: p.sports.filter(x => x.id !== sp.id) }))}>✕</button>
                          </div>
                        ))}
                        {form.foods.map(f => (
                          <div key={f.id} className={s.summaryItem}>
                            <div className={`${s.summaryDot} ${s.dotFood}`} />
                            <div className={s.summaryItemName}>{f.name} · {f.grams}g</div>
                            <div className={s.summaryItemKcal}>{f.kcal}</div>
                            <button type="button" className={s.summaryRemove} onClick={() => setForm(p => ({ ...p, foods: p.foods.filter(x => x.id !== f.id) }))}>✕</button>
                          </div>
                        ))}
                      </>
                  }
                </div>

                <div className={s.manualRow}>
                  <span>+ Manuell</span>
                  <input type="number" min="0" inputMode="numeric" value={form.manualKcal} onChange={e => setForm(p => ({ ...p, manualKcal: e.target.value }))} placeholder="kcal" />
                </div>

                {(form.foods.length > 0 || totalSportKcal > 0 || form.manualKcal) && (
                  <div className={s.totalsBlock}>
                    {totalFoodKcal > 0 && <div className={s.totalsRow}><span>Essen</span><span>{totalFoodKcal} kcal</span></div>}
                    {totalSportKcal > 0 && <div className={`${s.totalsRow} ${s.totalsRowSport}`}><span>Sport</span><span>−{totalSportKcal} kcal</span></div>}
                    <div className={s.totalsNet}><span>Netto</span><span>{netKcal} kcal</span></div>
                  </div>
                )}

                <input className={s.noteInput} value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Notiz (optional)…" />
                <button className={s.saveBtn} type="submit" disabled={saving}>
                  {saving ? 'Wird gespeichert…' : 'Tag speichern'}
                </button>
              </div>
            </div>
          </form>

          {/* Chart + History */}
          <div className={s.historyGrid}>
            <div className={s.panel} style={{ overflow: 'hidden' }}>
              <div className={s.panelLabel}>Verlauf — letzte 14 Tage</div>
              <hr className={s.divider} />
              {chartRecords.length ? (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, padding: '16px 16px 8px', height: 120 }}>
                  {chartRecords.map(r => {
                    const kcal  = num(r.manualKcal) + (r.foods || []).reduce((t, f) => t + f.kcal, 0)
                    const sport = (r.sports || []).reduce((t, sp) => t + sp.minutes, 0)
                    return (
                      <div key={r.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 80, gap: 2 }}>
                          <div title={`${kcal} kcal`} style={{ background: '#f97316', borderRadius: 3, height: `${Math.max((kcal / maxKcal) * 72, 3)}px` }} />
                          {sport > 0 && <div title={`${sport} Min.`} style={{ background: '#22c55e', borderRadius: 3, height: `${Math.max((sport / maxSport) * 20, 3)}px` }} />}
                        </div>
                        <div style={{ fontSize: 9, color: '#cbd5e1', whiteSpace: 'nowrap' }}>{r.date.slice(5)}</div>
                      </div>
                    )
                  })}
                </div>
              ) : <p className={s.emptyHistory}>Noch keine Werte.</p>}
              <div style={{ display: 'flex', gap: 12, padding: '0 16px 12px', fontSize: 11, color: '#94a3b8' }}>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#f97316', marginRight: 4 }} />Kalorien</span>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#22c55e', marginRight: 4 }} />Sport</span>
              </div>
            </div>

            <div className={s.panel}>
              <div className={s.panelLabel}>Tagebuch</div>
              <hr className={s.divider} />
              {sorted.length ? sorted.map(r => {
                const kcal     = num(r.manualKcal) + (r.foods || []).reduce((t, f) => t + f.kcal, 0)
                const sportMin = (r.sports || []).reduce((t, sp) => t + sp.minutes, 0)
                const sportK   = (r.sports || []).reduce((t, sp) => t + sp.kcal, 0)
                return (
                  <div key={r.id} className={s.mgmtRow}>
                    <div className={s.mgmtRowMain}>
                      <strong>{r.date.slice(8)}.{r.date.slice(5, 7)} · {kcal - sportK} kcal netto{r.weight ? ` · ${r.weight} kg` : ''}</strong>
                      <span>
                        {(r.sports || []).map(sp => sp.name).join(', ')}
                        {(r.sports || []).length > 0 && (r.foods || []).length > 0 ? ' · ' : ''}
                        {(r.foods  || []).map(f => f.name).join(', ')}
                        {r.note ? ` · ${r.note}` : ''}
                      </span>
                    </div>
                    <button className={s.delBtn} type="button" onClick={() => deleteRecord(r.id)}>Löschen</button>
                  </div>
                )
              }) : <p className={s.emptyHistory}>Noch keine Einträge.</p>}
            </div>
          </div>
        </>
      )}

      {/* ── LISTEN BEARBEITEN ── */}
      {tab === 'lists' && (
        <>
          <div className={s.tabs} style={{ marginBottom: 20 }}>
            <button className={listTab === 'sport' ? s.tabActive : s.tab} onClick={() => setListTab('sport')}>
              Sportarten ({activeSports.length})
            </button>
            <button className={listTab === 'food' ? s.tabActive : s.tab} onClick={() => setListTab('food')}>
              Lebensmittel ({activeFoods.length})
            </button>
          </div>

          {listTab === 'sport' && (
            <div className={s.mgmtGrid}>
              <div className={s.panel}>
                <div className={s.panelLabel}>Neue Sportart</div>
                <hr className={s.divider} />
                <form className={s.mgmtForm} onSubmit={addCustomSport}>
                  <label>Name<input value={newSport.de} onChange={e => setNewSport(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Kampfsport" required /></label>
                  <label>kcal pro Minute<input type="number" min="1" max="30" step="0.5" value={newSport.kcalPerMin} onChange={e => setNewSport(p => ({ ...p, kcalPerMin: e.target.value }))} placeholder="z. B. 7" required /></label>
                  <button className={s.mgmtSubmit} type="submit">Hinzufügen</button>
                </form>
              </div>

              <div className={s.panel}>
                <div className={s.panelLabel}>Alle Sportarten</div>
                <hr className={s.divider} />
                <div className={s.mgmtList}>
                  {activeSports.map(sp => (
                    <div key={sp.id} className={s.mgmtRow}>
                      <div className={s.mgmtRowMain}>
                        <strong>{sp.de}{sp.custom ? ' ✦' : ''}</strong>
                        <span>{sp.kcalPerMin} kcal/min</span>
                      </div>
                      <button className={s.delBtn} onClick={() => sp.custom ? doDelCustomSport(sp.id) : doDeleteSport(sp.id)}>Löschen</button>
                    </div>
                  ))}
                </div>
                {deletedSports.size > 0 && (
                  <div className={s.deletedSection}>
                    <div className={s.deletedLabel}>Gelöscht — wiederherstellbar</div>
                    {DEFAULT_SPORTS.filter(sp => deletedSports.has(sp.id)).map(sp => (
                      <div key={sp.id} className={s.mgmtRow}>
                        <div className={s.mgmtRowMain}><strong>{sp.de}</strong><span>{sp.kcalPerMin} kcal/min</span></div>
                        <button className={s.restoreBtn} onClick={() => doRestoreSport(sp.id)}>Wiederherstellen</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {listTab === 'food' && (
            <div className={s.mgmtGrid}>
              <div className={s.panel}>
                <div className={s.panelLabel}>Neues Lebensmittel</div>
                <hr className={s.divider} />
                <form className={s.mgmtForm} onSubmit={addCustomFood}>
                  <label>Name<input value={newFood.de} onChange={e => setNewFood(p => ({ ...p, de: e.target.value }))} placeholder="z. B. Käsekuchen" required /></label>
                  <label>Kategorie
                    <select value={newFood.cat} onChange={e => setNewFood(p => ({ ...p, cat: e.target.value }))}>
                      {kategorien.map(c => <option key={c.id} value={c.id}>{c.de}</option>)}
                    </select>
                  </label>
                  <label>kcal / 100g<input type="number" min="0" inputMode="numeric" value={newFood.kcalPer100g} onChange={e => setNewFood(p => ({ ...p, kcalPer100g: e.target.value }))} placeholder="z. B. 250" required /></label>
                  <label>Standardportion (g)<input type="number" min="1" inputMode="numeric" value={newFood.portionG} onChange={e => setNewFood(p => ({ ...p, portionG: e.target.value }))} placeholder="z. B. 150" /></label>
                  <button className={s.mgmtSubmit} type="submit">Hinzufügen</button>
                </form>
              </div>

              <div className={s.panel}>
                <div className={s.panelLabel}>Alle Lebensmittel</div>
                <hr className={s.divider} />
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
                              <strong>{f.de}{f.custom ? ' ✦' : ''}</strong>
                              <span>{f.kcalPer100g} kcal/100g · {f.portionG}g Portion</span>
                            </div>
                            <button className={s.delBtn} onClick={() => f.custom ? doDelCustomFood(f.id) : doDeleteFood(f.id)}>Löschen</button>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
                {deletedFoods.size > 0 && (
                  <div className={s.deletedSection}>
                    <div className={s.deletedLabel}>Gelöscht — wiederherstellbar</div>
                    {DEFAULT_FOODS.filter(f => deletedFoods.has(f.id)).map(f => (
                      <div key={f.id} className={s.mgmtRow}>
                        <div className={s.mgmtRowMain}><strong>{f.de}</strong><span>{f.kcalPer100g} kcal/100g</span></div>
                        <button className={s.restoreBtn} onClick={() => doRestoreFood(f.id)}>Wiederherstellen</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
