'use client'

import { useEffect, useRef, useState } from 'react'
import { berlinToday, parseEuroAmount } from '@/utils/monthlyFinance'
import FinanceIcon, { categoryIcon } from './FinanceIcon'
import styles from './MonthlyFinance.module.css'

export function FinancePlanForm({ categories, selectedItems, onChooseItem, amount, onAmountChange, startMonth, onStartMonthChange, onSaveBudget, onSaveRecurring, error }) {
  const selected = selectedItems[0]
  const category = categories.find(item => item.id === selected?.catId)
  const available = categories.filter(item => item.type === 'expense')
  function choose(catId, subId = '') {
    const item = available.find(cat => cat.id === catId)
    if (!item) return
    const sub = item.subs.find(sub => sub.id === subId)
    onChooseItem([{ catId: item.id, catName: item.name, subId: sub?.id || null, subName: sub?.name || null }])
  }
  return <div className={styles.planForm}>
    <div className={styles.planFields}>
      <label className={styles.field}>Kategorie<select aria-label="Budget-Kategorie" value={selected?.catId || ''} onChange={event => choose(event.target.value)}><option value="" disabled>Kategorie auswählen</option>{available.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      {category && <label className={styles.field}>Unterkategorie<select aria-label="Budget-Unterkategorie" value={selected?.subId || ''} onChange={event => choose(category.id, event.target.value)}><option value="">Gesamte Kategorie</option>{category.subs.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}</select></label>}
      <label className={styles.field}>Betrag in Euro<input type="text" inputMode="decimal" value={amount} onChange={event => onAmountChange(event.target.value)} placeholder="0,00" onBlur={() => { const parsed = parseEuroAmount(amount); if (parsed !== null) onAmountChange(parsed.toLocaleString('de-DE', { minimumFractionDigits: 2, useGrouping: false })) }} /></label>
      <label className={styles.field}>Fixkosten gültig ab<input type="month" value={startMonth} onChange={event => onStartMonthChange(event.target.value)} /><small>Nur für Fixkosten; Budgets gelten als Kategorie-Limit.</small></label>
    </div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <div className={styles.planActions}><button className={styles.primary} type="button" onClick={onSaveBudget}>Budget speichern</button><button className={styles.secondary} type="button" onClick={onSaveRecurring}>Fixkosten speichern</button></div>
  </div>
}

export default function FinanceEntryForm({ formId, categories, type, onTypeChange, selectedItems, onChooseItem, onToggleItem, entryAmount, onAmountChange, entryDate, onDateChange, entryDescription, onDescriptionChange, onSubmit, paidByFatima, onToggleFatima, entryScope, incomeSourceMode, onIncomeSourceModeChange, otherIncomeName, onOtherIncomeNameChange, errors = {}, frequentCategories = [], onManageCategories }) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const amountRef = useRef(null)
  const available = categories.filter(category => category.type === type)
  const selected = selectedItems[0]
  const category = available.find(item => item.id === selected?.catId)
  const priority = [...available].sort((a, b) => {
    const index = name => frequentCategories.indexOf(name) < 0 ? 999 : frequentCategories.indexOf(name)
    return index(a.name) - index(b.name)
  })
  const quick = priority.slice(0, 4)
  const matches = priority.filter(item => `${item.name} ${item.subs.map(sub => sub.name).join(' ')}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')))
  const today = berlinToday()
  const yesterday = new Date(`${today}T12:00:00Z`)
  yesterday.setUTCDate(yesterday.getUTCDate() - 1)
  const yesterdayKey = yesterday.toISOString().slice(0, 10)

  useEffect(() => {
    if (window.matchMedia('(min-width: 641px)').matches) amountRef.current?.focus()
  }, [])
  useEffect(() => {
    setQuery('')
    setShowAll(false)
  }, [type])
  useEffect(() => {
    if (errors.amount) amountRef.current?.focus()
  }, [errors])

  function choose(item, sub = null) {
    onChooseItem(item.id, item.name, sub?.id || null, sub?.name || null)
    setShowAll(false)
    setQuery('')
  }

  return <form id={formId} className={styles.entryForm} onSubmit={onSubmit} noValidate>
    {!entryScope && <div className={styles.segment} role="group" aria-label="Buchungsart"><button type="button" aria-pressed={type === 'expense'} onClick={() => onTypeChange('expense')}>Ausgabe</button><button type="button" aria-pressed={type === 'income'} onClick={() => onTypeChange('income')}>Einkommen</button></div>}
    <div>
      <label htmlFor="finance-amount" className={styles.fieldLabel}><FinanceIcon name="wallet" />Betrag</label>
      <div className={`${styles.amountInput} ${errors.amount ? styles.invalid : ''}`}><input ref={amountRef} id="finance-amount" type="text" inputMode="decimal" autoComplete="off" value={entryAmount} onChange={event => onAmountChange(event.target.value)} onBlur={() => { const amount = parseEuroAmount(entryAmount); if (amount !== null) onAmountChange(amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })) }} placeholder="0,00" aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'finance-amount-error' : undefined} /><span>€</span></div>
      {errors.amount && <p id="finance-amount-error" className={styles.error}>{errors.amount}</p>}
    </div>

    <div>
      <span className={styles.fieldLabel}><FinanceIcon name="tag" />{type === 'income' ? 'Einkommensquelle' : 'Kategorie'}</span>
      {type === 'income' && !entryScope && <div className={styles.sourceChoices}><button type="button" aria-pressed={incomeSourceMode === 'standard'} onClick={() => onIncomeSourceModeChange('standard')}>Gehalt / Kindergeld</button><button type="button" aria-pressed={incomeSourceMode === 'other'} onClick={() => onIncomeSourceModeChange('other')}>Andere Quelle</button></div>}
      {type === 'income' && incomeSourceMode === 'other' ? <label className={styles.field}>Bezeichnung<input value={otherIncomeName} onChange={event => onOtherIncomeNameChange(event.target.value)} placeholder="z. B. Bonus oder Erstattung" maxLength={240} aria-invalid={Boolean(errors.category)} /></label> : entryScope ? <div className={styles.selectedCategory}><FinanceIcon name={categoryIcon(entryScope.catName)} /><span><strong>{entryScope.catName}</strong>{entryScope.subName && <small>{entryScope.subName}</small>}</span><FinanceIcon name="check" /></div> : <>
        <div className={styles.quickCategories}>{quick.map(item => <button type="button" key={item.id} aria-pressed={selected?.catId === item.id} onClick={() => choose(item)}><FinanceIcon name={categoryIcon(item.name)} size={23} /><span>{item.name}</span>{selected?.catId === item.id && <i><FinanceIcon name="check" size={12} /></i>}</button>)}</div>
        {selected && !quick.some(item => item.id === selected.catId) && <div className={styles.selectedCategory}><FinanceIcon name={categoryIcon(selected.catName)} /><strong>{selected.catName}</strong><FinanceIcon name="check" /></div>}
        <label className={styles.search}><FinanceIcon name="search" /><input aria-label="Kategorien durchsuchen" placeholder="Alle Kategorien durchsuchen …" value={query} onFocus={() => setShowAll(true)} onChange={event => { setQuery(event.target.value); setShowAll(true) }} /></label>
        <button type="button" className={styles.textButton} aria-expanded={showAll} onClick={() => setShowAll(value => !value)}>{showAll ? 'Liste schließen' : 'Alle Kategorien anzeigen'}</button>
        {showAll && <div className={styles.categoryResults}>{matches.map(item => <div key={item.id}><button type="button" aria-pressed={selected?.catId === item.id} onClick={() => choose(item)}><FinanceIcon name={categoryIcon(item.name)} /><span>{item.name}</span>{selected?.catId === item.id && <FinanceIcon name="check" size={16} />}</button>{query && item.subs.filter(sub => sub.name.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))).map(sub => <button type="button" className={styles.subResult} key={sub.id} onClick={() => choose(item, sub)}>{item.name} / {sub.name}</button>)}</div>)}{!matches.length && <p className={styles.help}>Keine passende Kategorie gefunden.</p>}</div>}
        {category?.subs.length > 0 && <label className={styles.field}>Unterkategorie (optional)<select value={selected.subId || ''} onChange={event => choose(category, category.subs.find(sub => sub.id === event.target.value))}><option value="">Gesamte Kategorie</option>{category.subs.map(sub => <option value={sub.id} key={sub.id}>{sub.name}</option>)}</select></label>}
        {!available.length && <p className={styles.help}>Noch keine Kategorien vorhanden. <button type="button" className={styles.textButton} onClick={onManageCategories}>Kategorie anlegen</button></p>}
      </>}
      {errors.category && <p className={styles.error} role="alert">{errors.category}</p>}
    </div>

    <div><label htmlFor="finance-date" className={styles.fieldLabel}><FinanceIcon name="calendar" />Datum</label><div className={styles.dateChoices}><button type="button" aria-pressed={entryDate === today} onClick={() => onDateChange(today)}>Heute</button><button type="button" aria-pressed={entryDate === yesterdayKey} onClick={() => onDateChange(yesterdayKey)}>Gestern</button><input id="finance-date" type="date" value={entryDate} onChange={event => onDateChange(event.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'finance-date-error' : 'finance-date-hint'} /></div>{errors.date ? <p id="finance-date-error" className={styles.error}>{errors.date}</p> : <small id="finance-date-hint" className={styles.help}>Die Buchung wird im Monat dieses Datums gespeichert.</small>}</div>

    {type === 'expense' && <div><span className={styles.fieldLabel}><FinanceIcon name="people" />Bezahlt von</span><div className={styles.payerChoices} role="group" aria-label="Bezahlt von"><button type="button" aria-pressed={!paidByFatima} onClick={() => paidByFatima && onToggleFatima()}>Jamin{!paidByFatima && <FinanceIcon name="check" size={16} />}</button><button type="button" aria-pressed={paidByFatima} onClick={() => !paidByFatima && onToggleFatima()}>Fatima{paidByFatima && <FinanceIcon name="check" size={16} />}</button></div></div>}

    <label className={styles.field}><span className={styles.fieldLabel}><FinanceIcon name="note" />Notiz (optional)</span><textarea value={entryDescription} onChange={event => onDescriptionChange(event.target.value)} rows={2} maxLength={500} placeholder="z. B. REWE, Wocheneinkauf …" /></label>
    {!entryScope && category && !(type === 'income' && incomeSourceMode === 'other') && <details className={styles.extraTags}><summary>Weitere Kategorie-Tags (optional){selectedItems.length > 1 ? ` · ${selectedItems.length - 1}` : ''}</summary><p className={styles.help}>Zusätzliche Zuordnung, z. B. zu einer Person. Der Betrag zählt im Bericht nur einmal in der Hauptkategorie.</p><div className={styles.tagChoices}>{available.filter(item => item.id !== category.id).map(item => <button type="button" key={item.id} aria-pressed={selectedItems.slice(1).some(selectedTag => selectedTag.catId === item.id)} onClick={() => onToggleItem(item.id, item.name, null, null)}>{item.name}</button>)}</div></details>}
  </form>
}
