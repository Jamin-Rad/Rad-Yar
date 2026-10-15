'use client'

import { useEffect, useRef, useState } from 'react'
import { mainCategory, parseAmount, todayBerlin, validDate } from '@/utils/monthlyExpenseModel'
import Icon, { iconForCategory } from './FinanceIcons'
import s from './MonthlyExpenses.module.css'

export default function ExpenseEntry({ type, onType, categories, month, entry, loaded, onSave, onCancel, onManage, preferred = [] }) {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subId, setSubId] = useState('')
  const [date, setDate] = useState(() => month === todayBerlin().slice(0, 7) ? todayBerlin() : `${month}-01`)
  const [note, setNote] = useState('')
  const [otherTitle, setOtherTitle] = useState('')
  const [fatima, setFatima] = useState(false)
  const [extraTags, setExtraTags] = useState([])
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const amountRef = useRef(null)
  const categoryRef = useRef(null)
  const searchRef = useRef(null)
  const available = categories.filter(category => category.type === type)
  const category = available.find(item => item.id === categoryId)
  const today = todayBerlin()
  const yesterdayDate = new Date(`${today}T12:00:00Z`)
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1)
  const yesterday = yesterdayDate.toISOString().slice(0, 10)
  const ranked = [...available].sort((a, b) => {
    const rank = name => preferred.indexOf(name) < 0 ? 999 : preferred.indexOf(name)
    return rank(a.name) - rank(b.name)
  })
  const shortcuts = type === 'expense' ? ['Lebensmittel', 'Auto', 'Zu Hause'].map(name => available.find(item => item.name === name)).filter(Boolean) : ranked.slice(0, 3)
  const matches = ranked.filter(item => `${item.name} ${item.subs.map(sub => sub.name).join(' ')}`.toLocaleLowerCase('de').includes(search.toLocaleLowerCase('de')))

  useEffect(() => {
    if (entry) return
    if (!available.some(item => item.id === categoryId) && !(type === 'income' && categoryId === 'other')) {
      setCategoryId(ranked[0]?.id || '')
      setSubId('')
    }
  }, [categories, type, entry, categoryId, preferred])
  useEffect(() => {
    if (entry) return
    setDate(month === todayBerlin().slice(0, 7) ? todayBerlin() : `${month}-01`)
  }, [month, entry])
  useEffect(() => {
    if (!entry) { setAmount(''); setNote(''); setErrors({}); return }
    const main = available.find(item => item.name === mainCategory(entry, categories))
    const sub = main?.subs.find(item => item.name === (entry.catSubtitles?.[main.name] || entry.title))
    setAmount(String(entry.amount).replace('.', ','))
    setCategoryId(main?.id || (entry.type === 'income' ? 'other' : ''))
    setSubId(sub?.id || '')
    setOtherTitle(entry.title || '')
    setDate(entry.date)
    setNote(entry.description || '')
    setFatima(Boolean(entry.paidByFatima))
    setExtraTags((entry.tags || []).filter(tag => tag !== mainCategory(entry, categories) && categories.some(category => category.name === tag)))
    setErrors({})
    amountRef.current?.focus()
  }, [entry])
  useEffect(() => {
    if (!searchOpen) return
    const close = event => { if (!searchRef.current?.contains(event.target)) setSearchOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [searchOpen])

  function selectCategory(item, sub) {
    setCategoryId(item.id)
    setSubId(sub?.id || '')
    setSearch('')
    setSearchOpen(false)
    setErrors(previous => ({ ...previous, category: undefined }))
  }
  function changeType(next) {
    onType(next)
    setCategoryId('')
    setSubId('')
    setOtherTitle('')
    setExtraTags([])
    setErrors({})
  }
  function submit(event) {
    event.preventDefault()
    const value = parseAmount(amount)
    const nextErrors = {}
    if (value === null) nextErrors.amount = 'Bitte einen Betrag größer als 0 mit höchstens zwei Nachkommastellen eingeben.'
    if (!category && !(type === 'income' && categoryId === 'other' && otherTitle.trim())) nextErrors.category = 'Bitte eine Kategorie oder Einkommensquelle wählen.'
    if (!validDate(date)) nextErrors.date = 'Bitte ein gültiges Datum auswählen.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      if (nextErrors.amount) amountRef.current?.focus()
      else if (nextErrors.category) categoryRef.current?.focus()
      return
    }
    const sub = category?.subs.find(item => item.id === subId)
    const sameCategory = entry && category?.name === mainCategory(entry, categories)
    const title = categoryId === 'other' ? otherTitle.trim() : sub?.name || (sameCategory && !subId ? entry.title : category.name)
    try {
      onSave({ type, amount: value, date, title, category: category?.name || 'Andere',
        tags: [...new Set([category?.name || 'Andere', ...extraTags])],
        catSubtitles: { ...(entry?.catSubtitles || {}), [category?.name || 'Andere']: sub?.name || title },
        description: note.trim(), paidByFatima: type === 'expense' && fatima,
      }, entry)
      setAmount('')
      setNote('')
      setErrors({})
      if (!entry && window.matchMedia('(min-width: 981px)').matches) amountRef.current?.focus()
    } catch (error) { setErrors({ general: error.message }) }
  }

  return <form id="monthly-entry" className={s.entryForm} onSubmit={submit} noValidate>
    <div className={s.entryBody}>
      <div className={s.segment} role="group" aria-label="Buchungsart"><button type="button" aria-pressed={type === 'expense'} onClick={() => changeType('expense')}>Ausgabe</button><button type="button" aria-pressed={type === 'income'} onClick={() => changeType('income')}>Einkommen</button></div>
      <div><label htmlFor="monthly-amount" className={s.mobileAmountLabel}>Betrag</label><div className={`${s.amountField} ${errors.amount ? s.invalid : ''}`}><input id="monthly-amount" ref={amountRef} style={{ width: `${Math.max(4, (amount || '0,00').length)}ch` }} aria-label="Betrag in Euro" aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'monthly-amount-error' : undefined} disabled={!loaded} type="text" inputMode="decimal" autoComplete="off" placeholder="0,00" value={amount} onChange={event => setAmount(event.target.value)} onBlur={() => { const number = parseAmount(amount); if (number !== null) setAmount(number.toLocaleString('de-DE', { minimumFractionDigits: 2, useGrouping: false })) }} /><span>€</span></div>{errors.amount && <p id="monthly-amount-error" className={s.error}>{errors.amount}</p>}</div>
      <div><span className={s.fieldLabel}>{type === 'income' ? 'Einkommensquelle' : 'Kategorie'}</span>
        <div className={s.shortcuts}>{shortcuts.map(item => <button type="button" key={item.id} aria-pressed={categoryId === item.id} onClick={() => selectCategory(item)}><Icon name={iconForCategory(item.name)} size={25} /><span>{item.name}</span>{categoryId === item.id && <i><Icon name="check" size={11} /></i>}</button>)}</div>
        <label className={s.selectWithIcon}><Icon name={iconForCategory(category?.name)} size={18} /><select ref={categoryRef} aria-label={type === 'income' ? 'Einkommensquelle auswählen' : 'Alle Kategorien'} value={categoryId} onChange={event => { setCategoryId(event.target.value); setSubId(''); setErrors(previous => ({ ...previous, category: undefined })) }} disabled={!loaded}><option value="" disabled>Kategorie auswählen</option>{ranked.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}{type === 'income' && <option value="other">Andere Quelle</option>}</select></label>
        <div className={s.categorySearch} ref={searchRef}><button type="button" className={s.textAction} aria-expanded={searchOpen} onClick={() => setSearchOpen(value => !value)}><Icon name="search" size={14} />Kategorie suchen</button>{searchOpen && <div className={s.searchPopover}><input aria-label="Kategorien durchsuchen" placeholder="Kategorie oder Unterkategorie …" autoFocus value={search} onChange={event => setSearch(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setSearchOpen(false) } if (event.key === 'Enter') { event.preventDefault(); if (matches[0]) selectCategory(matches[0], matches[0].subs.find(sub => sub.name.toLocaleLowerCase('de').includes(search.toLocaleLowerCase('de')))) } }} /><div>{matches.map(item => <div key={item.id}><button type="button" onClick={() => selectCategory(item)}>{item.name}</button>{search && item.subs.filter(sub => sub.name.toLocaleLowerCase('de').includes(search.toLocaleLowerCase('de'))).map(sub => <button type="button" className={s.subSearchResult} key={sub.id} onClick={() => selectCategory(item, sub)}>{item.name} / {sub.name}</button>)}</div>)}{!matches.length && <p className={s.help}>Keine passende Kategorie.</p>}</div></div>}</div>
        {errors.category && <p className={s.error} role="alert">{errors.category}</p>}
        {!available.length && <button type="button" className={s.textAction} onClick={onManage}>Kategorie anlegen →</button>}
      </div>
      {category?.subs.length > 0 && <label className={s.field}>Unterkategorie <span>(optional)</span><select aria-label="Unterkategorie" value={subId} onChange={event => setSubId(event.target.value)}><option value="">Gesamte Kategorie</option>{category.subs.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
      {categoryId === 'other' && <label className={s.field}>Bezeichnung<input aria-label="Einkommensbezeichnung" value={otherTitle} maxLength={240} placeholder="z. B. Bonus, Erstattung …" onChange={event => setOtherTitle(event.target.value)} /></label>}
      <div><label htmlFor="monthly-date" className={s.fieldLabel}>Datum</label><div className={s.dateRow}><button type="button" aria-pressed={date === today} onClick={() => setDate(today)}>Heute</button><button type="button" className={s.yesterday} aria-pressed={date === yesterday} onClick={() => setDate(yesterday)}>Gestern</button><input id="monthly-date" type="date" value={date} onChange={event => setDate(event.target.value)} aria-invalid={Boolean(errors.date)} /></div>{errors.date && <p className={s.error}>{errors.date}</p>}{date.slice(0, 7) !== month && <p className={s.help}>Wird im Monat des gewählten Datums gespeichert.</p>}</div>
      {type === 'expense' && <div><span className={s.fieldLabel}>Bezahlt von</span><div className={s.segment} role="group" aria-label="Bezahlt von"><button type="button" aria-pressed={!fatima} onClick={() => setFatima(false)}>Jamin</button><button type="button" aria-pressed={fatima} onClick={() => setFatima(true)}>Fatima</button></div></div>}
      <label className={s.field}>Notiz <span>(optional)</span><input aria-label="Notiz" value={note} maxLength={500} onChange={event => setNote(event.target.value)} placeholder="z. B. Einkauf bei REWE …" /></label>
      <details className={s.extraTags}><summary>Zusätzliche Kategorie-Tags{extraTags.length ? ` (${extraTags.length})` : ''}</summary><p className={s.help}>Zusätzliche Zuordnung, ohne den Betrag doppelt zu zählen.</p><div className={s.tagChoices}>{available.filter(item => item.id !== categoryId).map(item => <button type="button" key={item.id} aria-pressed={extraTags.includes(item.name)} onClick={() => setExtraTags(previous => previous.includes(item.name) ? previous.filter(name => name !== item.name) : [...previous, item.name])}>{item.name}</button>)}</div></details>
      {errors.general && <p className={s.error} role="alert">{errors.general}</p>}
    </div>
    <div className={s.entryFooter}>{entry && <button type="button" className={s.textAction} onClick={onCancel}>Bearbeitung abbrechen</button>}<button type="submit" className={s.primary} disabled={!loaded}>{entry ? 'Änderung speichern' : type === 'income' ? 'Einkommen speichern' : 'Ausgabe speichern'}<Icon name="right" size={19} /></button></div>
  </form>
}
