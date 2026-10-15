'use client'

import { useState } from 'react'
import { categoryLimit, money, monthLabel, parseAmount, recurringAmount, shiftMonth, todayBerlin, validDate } from '@/utils/monthlyExpenseModel'
import Icon from './FinanceIcons'
import s from './MonthlyExpenses.module.css'

function CategorySettings({ category, onSubcategory, onDelete, onDeleteSub }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  return <details className={s.categorySettings}><summary><strong>{category.name}</strong><span>{category.type === 'income' ? 'Einkommen' : 'Ausgabe'} · {category.subs.length} Unterkategorien</span></summary>
    <div className={s.categorySettingsBody}><div className={s.subcategoryList}>{category.subs.map(sub => <span key={sub.id}>{sub.name}<button type="button" aria-label={`${category.name} / ${sub.name} entfernen`} onClick={() => onDeleteSub(category.id, sub.id)}><Icon name="close" size={13} /></button></span>)}</div>
      <form className={s.inlineForm} onSubmit={event => { event.preventDefault(); try { onSubcategory(category.id, name); setName(''); setError('') } catch (error) { setError(error.message) } }}><input aria-label={`Unterkategorie für ${category.name}`} value={name} onChange={event => setName(event.target.value)} placeholder="Neue Unterkategorie" maxLength={120} /><button className={s.secondary} disabled={!name.trim()}>Hinzufügen</button></form>
      {error && <p className={s.error} role="alert">{error}</p>}<button type="button" className={s.dangerAction} onClick={() => onDelete(category.id)}>Kategorie entfernen</button>
    </div>
  </details>
}

export default function FinancePlanning({ categories, budgets, recurring, categoryError, onBudget, onRecurring, onEndRecurring, onCategory, onSubcategory, onDeleteCategory, onDeleteSubcategory }) {
  const [tab, setTab] = useState('budget')
  const [categoryId, setCategoryId] = useState('')
  const [subId, setSubId] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [start, setStart] = useState(() => todayBerlin().slice(0, 7))
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [name, setName] = useState('')
  const [newType, setNewType] = useState('expense')
  const category = categories.find(item => item.id === categoryId)
  const current = todayBerlin().slice(0, 7)
  const budgetTotal = [...new Set(Object.keys(budgets).map(key => key.split(' / ')[0]))].reduce((sum, name) => sum + categoryLimit(budgets, name), 0)

  function save(kind) {
    const value = parseAmount(amount)
    if (!category || value === null) { setError('Bitte Kategorie und einen gültigen Betrag größer als 0 eingeben.'); return }
    if (kind === 'recurring' && !validDate(`${start}-01`)) { setError('Bitte einen gültigen Startmonat auswählen.'); return }
    const sub = category.subs.find(item => item.id === subId)
    try {
      if (kind === 'budget') onBudget(sub ? `${category.name} / ${sub.name}` : category.name, value)
      else onRecurring({ id: editing?.id, type, category: category.name, title: sub?.name || (editing?.category === category.name ? editing.title : category.name), amount: value, startMonth: start, budgetKey: sub ? `${category.name} / ${sub.name}` : category.name })
      setAmount(''); setEditing(null); setError(''); setNotice(kind === 'budget' ? 'Budget gespeichert.' : 'Fixkosten gespeichert.')
    } catch (error) { setError(error.message) }
  }
  function edit(item) {
    setEditing(item); setType(item.type || 'expense'); setCategoryId(categories.find(category => category.name === item.category)?.id || '')
    const category = categories.find(category => category.name === item.category)
    setSubId(category?.subs.find(sub => sub.name === item.title)?.id || '')
    setAmount(String(recurringAmount(item, current)).replace('.', ',')); setStart(current); setError(''); setNotice('')
    document.getElementById('monthly-plan-composer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return <div className={s.planning}>
    <div className={s.sectionHeading}><div><h2>Deinen Monat planen</h2><p>Klare Limits. Wiederkehrende Kosten. Deine Kategorien.</p></div></div>
    <div className={s.subTabs} role="tablist" aria-label="Planungsbereich"><button role="tab" aria-selected={tab === 'budget'} onClick={() => setTab('budget')}>Budgets & Fixkosten</button><button role="tab" aria-selected={tab === 'categories'} onClick={() => setTab('categories')}>Kategorien</button></div>
    {tab === 'budget' ? <>
      <section className={s.panel} id="monthly-plan-composer"><div className={s.panelHead}><h2>{editing ? 'Fixkosten anpassen' : 'Budget oder Fixkosten anlegen'}</h2><span>{money(budgetTotal)} Budget gesamt</span></div>
        <div className={s.planFields}><label className={s.field}>Art<select aria-label="Planungsart" value={type} disabled={Boolean(editing)} onChange={event => { setType(event.target.value); setCategoryId(''); setSubId('') }}><option value="expense">Ausgabe</option><option value="income">Wiederkehrendes Einkommen</option></select></label><label className={s.field}>Kategorie<select aria-label="Planung Kategorie" value={categoryId} disabled={Boolean(editing)} onChange={event => { setCategoryId(event.target.value); setSubId('') }}><option value="" disabled>Kategorie auswählen</option>{categories.filter(item => item.type === type).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          {category && <label className={s.field}>Unterkategorie<select aria-label="Planung Unterkategorie" value={subId} disabled={Boolean(editing)} onChange={event => setSubId(event.target.value)}><option value="">Gesamte Kategorie</option>{category.subs.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
          <label className={s.field}>Betrag in Euro<input aria-label="Planungsbetrag" type="text" inputMode="decimal" placeholder="0,00" value={amount} onChange={event => setAmount(event.target.value)} /></label><label className={s.field}>{editing ? 'Änderung gültig ab' : 'Fixkosten gültig ab'}<input type="month" aria-label="Planung Startmonat" value={start} onChange={event => setStart(event.target.value)} /></label>
        </div><p className={s.help}>Budgets sind aktuelle Kategorie-Limits. Fixkosten und Betragsänderungen gelten ab dem gewählten Monat. Ein Gesamtlimit hat Vorrang vor Unterkategorie-Limits.</p>
        {error && <p className={s.error} role="alert">{error}</p>}{notice && <p className={s.success} role="status">{notice}</p>}<div className={s.planActions}>{!editing && type === 'expense' && <button className={s.secondary} onClick={() => save('budget')}>Budget speichern</button>}<button className={s.primary} onClick={() => save('recurring')}>{editing ? 'Änderung speichern' : 'Fixkosten speichern'}</button>{editing && <button className={s.textAction} onClick={() => { setEditing(null); setAmount('') }}>Abbrechen</button>}</div>
      </section>
      <section className={s.panel}><div className={s.panelHead}><h2>Deine Budgets</h2></div>{Object.entries(budgets).filter(([, amount]) => Number(amount) > 0).map(([name, value]) => <div className={s.planRow} key={name}><div><strong>{name.replace(' / Gesamt', '')}</strong><small>Aktuelles Kategorie-Limit</small></div><strong>{money(value)}</strong><button className={s.iconButton} aria-label={`Budget ${name} entfernen`} onClick={() => onBudget(name, 0)}><Icon name="trash" size={16} /></button></div>)}{!budgetTotal && <p className={s.help}>Noch keine Limits. Beginne mit einer Kategorie, die du gut im Blick behalten möchtest.</p>}</section>
      <section className={s.panel}><div className={s.panelHead}><h2>Wiederkehrende Kosten & Einnahmen</h2></div>{recurring.map(item => <div className={s.planRow} key={item.id}><div><strong>{item.title}</strong><small>{item.category} · {item.type === 'income' ? 'Einkommen' : 'Ausgabe'} · ab {monthLabel(item.startMonth || '2025-01')}{item.endMonth ? ` · bis ${monthLabel(item.endMonth)}` : ''}</small>{(item.amountChanges || []).filter(change => change.startMonth > current).map(change => <small key={change.startMonth}>Ab {monthLabel(change.startMonth)}: {money(change.amount)}</small>)}</div><strong>{money(recurringAmount(item, current))}</strong><div className={s.rowActions}><button aria-label={`${item.title} Fixkosten bearbeiten`} onClick={() => edit(item)}><Icon name="edit" size={16} /></button>{!item.endMonth && <button aria-label={`${item.title} Fixkosten beenden`} onClick={() => { if (window.confirm(`„${item.title}“ ab ${monthLabel(current)} beenden? Frühere Monate bleiben erhalten.`)) onEndRecurring(item.id, shiftMonth(current, -1)) }}><Icon name="close" size={16} /></button>}</div></div>)}{!recurring.length && <p className={s.help}>Miete, Abos oder Gehalt einmal anlegen – sie erscheinen automatisch im passenden Monat.</p>}</section>
    </> : <>
      <section className={s.panel}><div className={s.panelHead}><h2>Neue Kategorie</h2></div><form className={s.inlineForm} onSubmit={event => { event.preventDefault(); try { onCategory(name, newType); setName(''); setError('') } catch (error) { setError(error.message) } }}><input aria-label="Neue Kategorie" placeholder="z. B. Sport, Haustier …" maxLength={120} value={name} onChange={event => setName(event.target.value)} /><select aria-label="Neue Kategorie Art" value={newType} onChange={event => setNewType(event.target.value)}><option value="expense">Ausgabe</option><option value="income">Einkommen</option></select><button className={s.primary} disabled={!name.trim()}>Anlegen</button></form>{error && <p role="alert" className={s.error}>{error}</p>}</section>
      <section className={s.panel}><div className={s.panelHead}><h2>Deine Kategorien</h2></div>{categoryError && <p role="alert" className={s.error}>{categoryError}</p>}{categories.map(category => <CategorySettings key={category.id} category={category} onSubcategory={onSubcategory} onDelete={onDeleteCategory} onDeleteSub={onDeleteSubcategory} />)}</section>
    </>}
  </div>
}
