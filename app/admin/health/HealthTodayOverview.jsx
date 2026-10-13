'use client'

import { photoMealTotals } from '../../../utils/foodPhotoMeals'
import s from './HealthTodayOverview.module.css'

export function HealthIcon({ name, ...props }) {
  const paths = {
    camera: <><path d="m8 5 1.5-2h5L16 5h4a1 1 0 0 1 1 1v13H3V6a1 1 0 0 1 1-1Z" /><circle cx="12" cy="12" r="4" /></>,
    plus: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8m-4-4h8" /></>,
    movement: <><circle cx="15" cy="4" r="2" /><path d="m12 8 4 3 4-1M5 12l4-4 3 1-3 6 4 3v4m-5-7-4 6" /></>,
    weight: <><path d="M6 4h12l3 16H3Z" /><circle cx="12" cy="9" r="2" /></>,
    left: <path d="m14 6-6 6 6 6" />,
    right: <path d="m10 6 6 6-6 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.plus}</svg>
}

export default function HealthTodayOverview({ form, today, saving, saved, formatDate, shiftDate, selectDate,
  photoEnabled, openPhoto, openFood, openSport, openWeight, eatenKcal, totalSportKcal, recommendedKcal,
  kcalDelta, isOver, foodFraction, macros, targets, activeFoods, activeSports, foodAmountText,
  removePhoto, injectionDue, injectionDone, medicationName, toggleInjection }) {
  const ringC = 2 * Math.PI * 50
  return <div className={s.overview}>
    <div className={s.dateBar}>
      <div className={s.dateNavigation}>
        <button type="button" onClick={() => shiftDate(-1)} aria-label="Voriger Tag"><HealthIcon name="left" /></button>
        <label className={s.dateLabel}><span>{formatDate(form.date)}</span><input aria-label="Datum" type="date" max={today} value={form.date} onChange={event => selectDate(event.target.value)} /></label>
        <button type="button" onClick={() => shiftDate(1)} disabled={form.date >= today} aria-label="Nächster Tag"><HealthIcon name="right" /></button>
        {form.date !== today && <button type="button" className={s.todayButton} onClick={() => selectDate(today)}>Heute</button>}
      </div>
      <span className={s.saveStatus} role="status">{saving ? 'Speichert…' : saved ? 'Gespeichert' : ''}</span>
    </div>
    {injectionDue && <button type="button" className={`${s.reminder} ${injectionDone ? s.done : ''}`} onClick={toggleInjection}>{injectionDone ? '✓ ' : ''}{medicationName} · Spritze heute</button>}
    <section className={s.balance} aria-label="Tagesübersicht">
      <div className={s.ring}>
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" className={s.ringTrack} /><circle cx="60" cy="60" r="50" className={`${s.ringValue} ${isOver ? s.over : ''}`} style={{ strokeDasharray: ringC, strokeDashoffset: ringC * (1 - foodFraction) }} /></svg>
        <div><strong>{eatenKcal}</strong><span>kcal</span><small>Gegessen</small></div>
      </div>
      <div className={s.remaining}>
        <strong className={isOver ? s.overText : ''}>{recommendedKcal ? Math.abs(kcalDelta) : '—'} <small>kcal</small></strong>
        <span>{recommendedKcal ? isOver ? 'Über dem Tagesziel' : 'Übrig' : 'Tagesziel nicht festgelegt'}</span>
        <div className={s.energyDetails}><div><span>Tagesziel</span><b>{recommendedKcal || '—'} kcal</b></div><div><span>Bewegung</span><b>{totalSportKcal} kcal</b></div></div>
      </div>
      <div className={s.macros}>
        {[['Protein', macros.protein, targets.protein], ['Zucker', macros.sugar, targets.sugar], ['Fett', macros.fat, targets.fat]].map(([label, value, goal]) => <div key={label} className={s.macro}>
          <div><span>{label}</span><span><b>{value}</b> / {goal} g</span></div>
          <div className={s.track}><i className={label !== 'Protein' && value > goal ? s.overFill : ''} style={{ width: `${Math.min(value / goal * 100, 100)}%` }} /></div>
        </div>)}
      </div>
    </section>
    <section className={s.actions} aria-label="Eintragen">
      {photoEnabled && <button type="button" className={s.primary} onClick={() => openPhoto(null)}><HealthIcon name="camera" />Essen per Foto</button>}
      <button type="button" onClick={openFood}><HealthIcon name="plus" />Mahlzeit hinzufügen</button>
      <button type="button" onClick={openSport}><HealthIcon name="movement" />Bewegung</button>
      <button type="button" onClick={openWeight}><HealthIcon name="weight" />Gewicht</button>
    </section>
    <div className={s.ledger}>
      <section className={s.meals}>
        <h2>Mahlzeiten</h2>
        {!form.foods.length && !form.photoMeals.length && !form.manualKcal && <p className={s.empty}>Noch keine Mahlzeit</p>}
        {form.foods.map(item => {
          const food = activeFoods.find(value => value.id === item.id)
          if (!food) return null
          const g = item.g ?? (item.count != null ? item.count * food.portionG : 0)
          return <article className={s.meal} key={item.id}><div><strong>{food.de}</strong><small>{foodAmountText(food, g)}</small></div><b>{Math.round(food.kcalPer100g / 100 * g)} kcal</b><button type="button" onClick={openFood} aria-label={`${food.de} bearbeiten`}>Bearbeiten</button></article>
        })}
        {form.photoMeals.map(meal => <article className={s.meal} key={meal.id}>
          <div><strong title={meal.title}>{meal.title}</strong><small>{Math.round(meal.items.reduce((sum, item) => sum + Number(item.g || 0), 0))} g · {meal.items.length} Zutaten</small></div>
          <b>≈ {photoMealTotals([meal]).kcal} kcal</b>
          <div className={s.mealTools}><button type="button" onClick={() => openPhoto(meal)}>Bearbeiten</button><button type="button" aria-label={`${meal.title} entfernen`} onClick={() => removePhoto(meal.id)}><HealthIcon name="trash" /></button></div>
        </article>)}
        {form.manualKcal > 0 && <article className={s.meal}><div><strong>Manuell eingetragen</strong></div><b>{form.manualKcal} kcal</b></article>}
      </section>
      <section className={s.activity}>
        <h2>Bewegung</h2>
        {!form.sports.length && <div className={s.activityEmpty}><HealthIcon name="movement" /><p>Noch keine Aktivität</p></div>}
        {form.sports.map(item => {
          const sport = activeSports.find(value => value.id === item.id)
          if (!sport) return null
          return <button type="button" className={s.activityRow} key={item.id} onClick={openSport}><strong>{sport.de}</strong><span>{item.min} min · {Math.round(sport.kcalPerMin * item.min)} kcal</span></button>
        })}
      </section>
    </div>
  </div>
}
