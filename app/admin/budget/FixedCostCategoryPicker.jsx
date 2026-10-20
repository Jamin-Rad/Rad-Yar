'use client'

import { useId, useState } from 'react'
import styles from './FixedCostCategoryPicker.module.css'

export default function FixedCostCategoryPicker({ categories, selected, onSelect, onCreateSubcategory }) {
  const categoryLabel = useId()
  const subcategoryLabel = useId()
  const expenseCategories = categories.filter(category => category.type === 'expense')
  const category = expenseCategories.find(item => item.id === selected?.catId)

  function selectCategory(id) {
    const item = expenseCategories.find(category => category.id === id)
    onSelect(item ? { catId: item.id, catName: item.name, subId: null, subName: null } : null)
  }

  function selectSubcategory(id) {
    const sub = category.subs.find(item => item.id === id)
    onSelect({ catId: category.id, catName: category.name, subId: sub?.id || null, subName: sub?.name || null })
  }

  return <div className={styles.picker}>
    <label className={styles.field}>
      <span id={categoryLabel}>Kategorie</span>
      <select aria-labelledby={categoryLabel} value={category?.id || ''} onChange={event => selectCategory(event.target.value)}>
        <option value="">Kategorie wählen</option>
        {expenseCategories.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
      </select>
    </label>
    <label className={styles.field}>
      <span id={subcategoryLabel}>Unterkategorie (optional)</span>
      <select aria-labelledby={subcategoryLabel} value={category ? selected?.subId || '' : ''} disabled={!category} onChange={event => selectSubcategory(event.target.value)}>
        <option value="">Gesamte Kategorie</option>
        {(category?.subs || []).map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
      </select>
    </label>
    {category ? <NewSubcategory key={category.id} category={category} onCreate={onCreateSubcategory} /> : null}
    {expenseCategories.length === 0 ? <p>Noch keine Ausgabenkategorien vorhanden. Lege zuerst unter „Kategorien“ eine an.</p> : null}
  </div>
}

function NewSubcategory({ category, onCreate }) {
  const [name, setName] = useState('')
  function create() {
    if (!name.trim()) return
    onCreate(category.id, name.trim())
    setName('')
  }
  return <div className={styles.create}>
    <label className={styles.field}>
      <span>Neue Unterkategorie in „{category.name}“</span>
      <input value={name} onChange={event => setName(event.target.value)} placeholder="Name der Unterkategorie" onKeyDown={event => {
        if (event.key === 'Enter') { event.preventDefault(); create() }
      }} />
    </label>
    <button type="button" disabled={!name.trim()} onClick={create}>Anlegen und auswählen</button>
    <small>Bereits vorhandene Namen werden ausgewählt.</small>
  </div>
}
