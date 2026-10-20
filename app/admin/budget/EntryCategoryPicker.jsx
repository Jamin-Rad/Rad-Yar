'use client'

import { useEffect, useId, useRef, useState } from 'react'
import FinanceIcon, { categoryIcon } from './FinanceIcon'
import ui from './FinanceEntry.module.css'

const searchKey = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de').trim()

export default function EntryCategoryPicker({ categories, selectedItems, onToggleItem, expandedCats, onToggleExpand }) {
  const [query, setQuery] = useState('')
  const detailId = useId()
  const detailRef = useRef(null)
  const term = searchKey(query)
  const groups = categories.filter(cat => cat.type === 'expense' && (
    !term || searchKey(cat.name).includes(term) || cat.subs.some(sub => searchKey(sub.name).includes(term))
  ))
  const active = groups.find(cat => cat.subs.length && expandedCats.has(cat.id))
    || (term ? groups.find(cat => cat.subs.length) : null)
  const subs = active?.subs.filter(sub => !term || searchKey(active.name).includes(term) || searchKey(sub.name).includes(term)) || []

  useEffect(() => {
    if (expandedCats.size) detailRef.current?.scrollIntoView({ block: 'nearest' })
  }, [expandedCats])

  return (
    <section className={ui.picker} aria-label="Ausgabenkategorie">
      <div className={ui.pickerHeading}>
        <div><h4>Kategorie wählen</h4><p>Wofür war die Ausgabe?</p></div>
        <span className={ui.count} role="status">{selectedItems.length ? `${selectedItems.length} ausgewählt` : 'Mehrfachauswahl'}</span>
      </div>
      <div className={ui.search}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
        <input type="search" aria-label="Kategorie oder Unterkategorie suchen" placeholder="Kategorie oder Unterkategorie suchen …" value={query} onChange={e => setQuery(e.target.value)} autoComplete="off" />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Suche leeren">×</button>}
      </div>

      {selectedItems.length > 0 && (
        <div className={ui.selections} aria-label="Ausgewählte Kategorien">
          {selectedItems.map(item => (
            <button type="button" key={`${item.catId}-${item.subId || 'parent'}`} onClick={() => onToggleItem(item.catId, item.catName, item.subId, item.subName)} aria-label={`${item.catName}${item.subName ? ` · ${item.subName}` : ''} entfernen`}>
              {item.subName ? `${item.catName} · ${item.subName}` : item.catName}<span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}

      <div className={ui.categoryGrid} role="group" aria-label="Kostengruppen">
        {groups.map(cat => {
          const selected = selectedItems.filter(item => item.catId === cat.id)
          const hasSubs = cat.subs.length > 0
          const open = active?.id === cat.id
          return (
            <button key={cat.id} type="button" className={`${ui.category} ${selected.length ? ui.selected : ''} ${open ? ui.open : ''}`}
              aria-label={cat.name}
              aria-pressed={hasSubs ? undefined : selected.length > 0}
              aria-expanded={hasSubs ? open : undefined}
              aria-controls={hasSubs && open ? detailId : undefined}
              onClick={() => hasSubs ? onToggleExpand(cat.id) : onToggleItem(cat.id, cat.name, null, null)}>
              <span className={ui.categoryIcon}><FinanceIcon name={categoryIcon(cat.name)} /></span>
              <span className={ui.categoryText}><strong>{cat.name}</strong><small>{selected.length ? `${selected.length} ausgewählt` : hasSubs ? `${cat.subs.length} ${cat.subs.length === 1 ? 'Unterkategorie' : 'Unterkategorien'}` : 'Direkt auswählen'}</small></span>
              <span className={ui.indicator} aria-hidden="true">{selected.length ? '✓' : hasSubs ? <FinanceIcon name="arrow" width="14" height="14" /> : '+'}</span>
            </button>
          )
        })}
        {!groups.length && <div className={ui.noResults}><strong>Keine Kategorie gefunden</strong><span>Versuche einen anderen Suchbegriff.</span><button type="button" onClick={() => setQuery('')}>Alle Kategorien anzeigen</button></div>}
      </div>

      {active && (
        <div className={ui.subPanel} id={detailId} ref={detailRef}>
          <div className={ui.subHeading}><span><FinanceIcon name={categoryIcon(active.name)} width="17" height="17" />{active.name}</span><small>Unterkategorie wählen</small></div>
          <div className={ui.subGrid} role="group" aria-label={`${active.name}: Unterkategorien`}>
            {subs.map(sub => {
              const selected = selectedItems.some(item => item.catId === active.id && item.subId === sub.id)
              return <button type="button" key={sub.id} aria-pressed={selected} className={selected ? ui.subSelected : ''} onClick={() => onToggleItem(active.id, active.name, sub.id, sub.name)}><span>{sub.name}</span><span className={ui.subCheck} aria-hidden="true">{selected ? '✓' : '+'}</span></button>
            })}
          </div>
        </div>
      )}
    </section>
  )
}
