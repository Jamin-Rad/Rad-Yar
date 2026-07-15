'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun_immobilien_v1'

const EMPTY_FILTERS = { city: 'Alle', district: 'Alle', area: 'Alle', age: 'Alle', energy: 'Alle', rooms: 'Alle', floor: 'Alle', maxPriceSqm: '', maxPrice: '', query: '' }

const Icon = ({ name }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    sliders: <><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    trash: <><path d="M5 7h14M9 7V4h6v3M8 10v8M12 10v8M16 10v8M7 7l1 14h8l1-14"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  }
  return <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function ageGroup(year) {
  const age = new Date().getFullYear() - Number(year)
  if (!year) return 'Unbekannt'
  if (age <= 1) return 'Neubau'
  if (age < 10) return '< 10 Jahre'
  if (age < 20) return '< 20 Jahre'
  return '20+ Jahre'
}

function areaGroup(area) {
  const value = Number(area)
  if (value >= 50 && value < 60) return '50–59 m²'
  if (value >= 60 && value < 70) return '60–69 m²'
  if (value >= 70 && value <= 75) return '70–75 m²'
  if (value < 50) return '< 50 m²'
  return '> 75 m²'
}

function energyGroup(value = '') {
  const energy = value.toUpperCase().replace('PLUS', '+')
  if (['A+', 'A'].includes(energy)) return 'A oder besser'
  if (['B', 'C'].includes(energy)) return 'B oder C'
  return 'D oder schlechter'
}

function money(value) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value) || 0)
}

function normalizeHomes(value) {
  const raw = Array.isArray(value) ? value : value?.properties || value?.homes || value?.wohnungen
  if (!Array.isArray(raw)) throw new Error('Das JSON muss ein Array oder ein Objekt mit "properties" sein.')
  return raw.map((home, index) => {
    const area = Number(home.area ?? home.size_m2 ?? home.wohnflaeche ?? 0)
    const price = Number(home.price ?? home.price_eur ?? home.kaufpreis ?? 0)
    return {
      id: String(home.id || `import-${Date.now()}-${index}`),
      title: home.title || home.name || home.titel || 'Wohnungsangebot',
      city: home.city || home.stadt || '', district: home.district || home.neighborhood || home.stadtteil || '',
      address: home.address || home.adresse || '', rooms: Number(home.rooms ?? home.zimmer ?? 0), area,
      price, pricePerSqm: Number(home.pricePerSqm ?? home.price_per_m2 ?? home.preis_pro_m2 ?? (area ? price / area : 0)),
      yearBuilt: Number(home.yearBuilt ?? home.year_built ?? home.baujahr ?? 0),
      energyClass: String(home.energyClass ?? home.energy_class ?? home.energieklasse ?? '?').toUpperCase(),
      floor: home.floor || home.etage || 'k. A.', elevator: Boolean(home.elevator ?? home.aufzug),
      balcony: Boolean(home.balcony ?? home.balkon), parking: Boolean(home.parking ?? home.stellplatz),
      provider: home.provider || home.source || home.anbieter || '', url: home.url || home.link || '',
      features: Array.isArray(home.features || home.besonderheiten) ? (home.features || home.besonderheiten) : [],
      note: home.note || home.notes || home.notiz || '', addedAt: home.addedAt || new Date().toISOString().slice(0, 10),
    }
  })
}

function buildPrompt(city, propertyUrl = '') {
  if (propertyUrl.trim()) {
    return `Analysiere dieses konkrete Immobilienangebot:\n${propertyUrl.trim()}\n\nÖffne den Link und übernimm ausschließlich Angaben, die du dort tatsächlich findest. Erfinde keine Werte. Berechne pricePerSqm nur aus Kaufpreis und Wohnfläche, falls er nicht direkt angegeben ist. Wenn eine Angabe fehlt, verwende null.\n\nGib ausschließlich einen gültigen JSON-Codeblock zurück, ohne zusätzlichen Text:\n\n{\n  "properties": [\n    {\n      "id": "Angebots-ID aus dem Link oder eine eindeutige ID",\n      "title": "Titel",\n      "city": "Stadt",\n      "district": "Stadtteil",\n      "address": "Adresse oder Lage",\n      "rooms": 3,\n      "area": 68.5,\n      "price": 350000,\n      "pricePerSqm": 5109,\n      "yearBuilt": 2018,\n      "energyClass": "B",\n      "floor": "2. OG",\n      "elevator": true,\n      "balcony": true,\n      "parking": false,\n      "provider": "ImmobilienScout24",\n      "url": "${propertyUrl.trim()}",\n      "features": ["Balkon", "Einbauküche"],\n      "note": "Besonderheiten oder fehlende Angaben"\n    }\n  ]\n}`
  }
  return `Suche aktuell zum Kauf stehende Wohnungen in ${city || 'Dresden'}, bevorzugt Stadtmitte und angrenzende zentrale Stadtteile, auf www.immobilienscout24.de.\n\nKriterien:\n- 2 oder 3 Zimmer\n- 50–75 m², gruppiert in 50–59, 60–69 und 70–75 m²\n- Baujahr gruppiert in Neubau, unter 10 Jahre, unter 20 Jahre und 20+ Jahre\n- Energieeffizienz gruppiert in A+ / A, B / C und D oder schlechter\n\nNutze nur Angebote, deren Angaben du auf der verlinkten Seite tatsächlich findest. Erfinde keine Werte. Wenn eine Angabe fehlt, verwende null. Entferne Dubletten. Gib nach einer kurzen Zusammenfassung ausschließlich einen gültigen JSON-Codeblock im folgenden Schema zurück, damit ich ihn in Andarun importieren kann:\n\n{\n  "properties": [\n    {\n      "id": "eindeutige Angebots-ID",\n      "title": "Titel",\n      "city": "${city || 'Dresden'}",\n      "district": "Stadtteil",\n      "address": "Adresse oder Lage",\n      "rooms": 3,\n      "area": 68.5,\n      "price": 350000,\n      "pricePerSqm": 5109,\n      "yearBuilt": 2018,\n      "energyClass": "B",\n      "floor": "2. OG",\n      "elevator": true,\n      "balcony": true,\n      "parking": false,\n      "provider": "ImmobilienScout24",\n      "url": "vollständiger direkter Link",\n      "features": ["Balkon", "Einbauküche"],\n      "note": "Besonderheiten oder fehlende Angaben"\n    }\n  ]\n}`
}

export default function ImmobilienPage() {
  const [homes, setHomes] = useState([])
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sort, setSort] = useState('match')
  const [view, setView] = useState('cards')
  const [importOpen, setImportOpen] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)
  const [jsonText, setJsonText] = useState('')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState([])
  const [propertyUrl, setPropertyUrl] = useState('')
  const [groupBy, setGroupBy] = useState('area')
  const [storageReady, setStorageReady] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (Array.isArray(stored?.homes)) {
        setHomes(stored.homes.filter(home => !String(home.id).startsWith('demo-') && home.provider !== 'Demo'))
      }
      if (Array.isArray(stored?.favorites)) setFavoriteIds(stored.favorites)
    } catch {}
    setStorageReady(true)
  }, [])

  useEffect(() => {
    if (!storageReady) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ homes, favorites: favoriteIds })) } catch {}
  }, [homes, favoriteIds, storageReady])

  const cities = useMemo(() => [...new Set(homes.map(home => home.city).filter(Boolean))].sort(), [homes])
  const districts = useMemo(() => [...new Set(homes.filter(home => filters.city === 'Alle' || home.city === filters.city).map(home => home.district).filter(Boolean))].sort(), [homes, filters.city])

  const visibleHomes = useMemo(() => {
    const result = homes.filter(home => {
      const haystack = `${home.title} ${home.city} ${home.district} ${home.address} ${home.features?.join(' ')}`.toLowerCase()
      return (filters.city === 'Alle' || home.city === filters.city)
        && (filters.district === 'Alle' || home.district === filters.district)
        && (filters.area === 'Alle' || areaGroup(home.area) === filters.area)
        && (filters.age === 'Alle' || ageGroup(home.yearBuilt) === filters.age)
        && (filters.energy === 'Alle' || energyGroup(home.energyClass) === filters.energy)
        && (filters.rooms === 'Alle' || Number(home.rooms) === Number(filters.rooms))
        && (filters.floor === 'Alle' || (filters.floor === 'EG' ? /eg|erd/i.test(home.floor) : !/eg|erd/i.test(home.floor)))
        && (!filters.maxPriceSqm || home.pricePerSqm <= Number(filters.maxPriceSqm))
        && (!filters.maxPrice || home.price <= Number(filters.maxPrice))
        && (!filters.query || haystack.includes(filters.query.toLowerCase()))
    })
    return result.sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price
      if (sort === 'priceDesc') return b.price - a.price
      if (sort === 'sqmAsc') return a.pricePerSqm - b.pricePerSqm
      if (sort === 'newest') return b.yearBuilt - a.yearBuilt
      return (favoriteIds.includes(b.id) ? 1 : 0) - (favoriteIds.includes(a.id) ? 1 : 0)
    })
  }, [homes, filters, sort, favoriteIds])

  const avgPrice = visibleHomes.length ? Math.round(visibleHomes.reduce((sum, home) => sum + home.price, 0) / visibleHomes.length) : 0
  const avgSqm = visibleHomes.length ? Math.round(visibleHomes.reduce((sum, home) => sum + home.pricePerSqm, 0) / visibleHomes.length) : 0
  const prompt = buildPrompt(filters.city === 'Alle' ? (cities[0] || 'Dresden') : filters.city, propertyUrl)
  const groupedHomes = useMemo(() => {
    const groups = new Map()
    visibleHomes.forEach(home => {
      const label = groupBy === 'area' ? areaGroup(home.area)
        : groupBy === 'age' ? ageGroup(home.yearBuilt)
          : groupBy === 'energy' ? energyGroup(home.energyClass)
            : home.city || 'Stadt unbekannt'
      if (!groups.has(label)) groups.set(label, [])
      groups.get(label).push(home)
    })
    return [...groups.entries()]
  }, [visibleHomes, groupBy])

  function setFilter(name, value) {
    setFilters(current => ({ ...current, [name]: value, ...(name === 'city' ? { district: 'Alle' } : {}) }))
  }

  function importJson() {
    try {
      const clean = jsonText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
      const incoming = normalizeHomes(JSON.parse(clean))
      const map = new Map(homes.filter(home => !home.id.startsWith('demo-')).map(home => [home.id, home]))
      incoming.forEach(home => map.set(home.id, home))
      setHomes([...map.values()])
      setJsonText('')
      setImportOpen(false)
      setMessage(`${incoming.length} Angebot${incoming.length === 1 ? '' : 'e'} importiert.`)
      setTimeout(() => setMessage(''), 3500)
    } catch (error) { setMessage(error.message || 'JSON konnte nicht gelesen werden.') }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt)
    setMessage('Prompt kopiert – jetzt in ChatGPT einfügen.')
    setTimeout(() => setMessage(''), 3500)
  }

  function toggleFavorite(id) {
    setFavoriteIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  function deleteHome(id) {
    setHomes(current => current.filter(home => home.id !== id))
    setSelected(null)
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>IMMOBILIEN · PRIVATE COLLECTION</span>
          <h1>Ein Zuhause,<br/><em>das passt.</em></h1>
          <p>Wohnungen sammeln, klug filtern und in Ruhe vergleichen.</p>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.secondaryButton} type="button" onClick={() => setPromptOpen(true)}><Icon name="spark"/> ChatGPT Prompt</button>
          <button className={styles.primaryButton} type="button" onClick={() => setImportOpen(true)}><Icon name="plus"/> Angebote importieren</button>
        </div>
        <div className={styles.heroLine} aria-hidden="true"><span>01</span><i/><span>{String(homes.length).padStart(2, '0')}</span></div>
      </section>

      {message && <div className={styles.toast}>{message}</div>}

      <section className={styles.stats} aria-label="Übersicht">
        <div><span>Gefunden</span><strong>{visibleHomes.length}</strong><small>Angebote</small></div>
        <div><span>Ø Kaufpreis</span><strong>{avgPrice ? money(avgPrice) : '–'}</strong><small>nach aktuellen Filtern</small></div>
        <div><span>Ø Preis / m²</span><strong>{avgSqm ? `${avgSqm.toLocaleString('de-DE')} €` : '–'}</strong><small>nach aktuellen Filtern</small></div>
        <div><span>Favoriten</span><strong>{favoriteIds.length}</strong><small>merken & vergleichen</small></div>
      </section>

      <section className={styles.linkWorkflow} aria-labelledby="link-workflow-title">
        <div><span className={styles.eyebrow}>NEUES ANGEBOT</span><h2 id="link-workflow-title">Link rein. Wohnung raus.</h2><p>Füge den Link einer Wohnung ein und kopiere den passenden Analyse-Prompt für ChatGPT.</p></div>
        <div className={styles.linkComposer}>
          <input type="url" value={propertyUrl} onChange={event => setPropertyUrl(event.target.value)} placeholder="https://www.immobilienscout24.de/expose/…" aria-label="Link zum Immobilienangebot"/>
          <button className={styles.primaryButton} type="button" onClick={() => setPromptOpen(true)} disabled={!propertyUrl.trim()}><Icon name="spark"/> Prompt erstellen</button>
        </div>
      </section>

      <section className={styles.content}>
        <aside className={styles.filters}>
          <div className={styles.filterHeading}><div><span>Suche verfeinern</span><h2>Filter</h2></div><Icon name="sliders"/></div>
          <label className={styles.searchField}><Icon name="search"/><input value={filters.query} onChange={event => setFilter('query', event.target.value)} placeholder="Titel, Lage, Merkmal …"/></label>
          <Filter label="Stadt" value={filters.city} onChange={value => setFilter('city', value)} options={cities}/>
          <Filter label="Stadtteil" value={filters.district} onChange={value => setFilter('district', value)} options={districts}/>
          <Filter label="Wohnfläche" value={filters.area} onChange={value => setFilter('area', value)} options={['< 50 m²', '50–59 m²', '60–69 m²', '70–75 m²', '> 75 m²']}/>
          <Filter label="Baujahr" value={filters.age} onChange={value => setFilter('age', value)} options={['Neubau', '< 10 Jahre', '< 20 Jahre', '20+ Jahre']}/>
          <Filter label="Energieklasse" value={filters.energy} onChange={value => setFilter('energy', value)} options={['A oder besser', 'B oder C', 'D oder schlechter']}/>
          <div className={styles.chipFilter}><span>Zimmer</span><div>{['Alle', '2', '3'].map(value => <button className={filters.rooms === value ? styles.chipActive : ''} type="button" onClick={() => setFilter('rooms', value)} key={value}>{value}</button>)}</div></div>
          <div className={styles.rangeRow}><label>Max. Kaufpreis<input type="number" value={filters.maxPrice} onChange={event => setFilter('maxPrice', event.target.value)} placeholder="z. B. 400000"/></label><label>Max. €/m²<input type="number" value={filters.maxPriceSqm} onChange={event => setFilter('maxPriceSqm', event.target.value)} placeholder="z. B. 5500"/></label></div>
          <button className={styles.resetButton} type="button" onClick={() => setFilters(EMPTY_FILTERS)}>Alle Filter zurücksetzen</button>
        </aside>

        <div className={styles.results}>
          <header className={styles.resultsHeader}>
            <div><span className={styles.eyebrow}>DEINE AUSWAHL</span><h2>{visibleHomes.length} Wohnungen</h2></div>
            <div className={styles.resultControls}>
              <select value={groupBy} onChange={event => setGroupBy(event.target.value)} aria-label="Gruppierung"><option value="area">Gruppiert: Wohnfläche</option><option value="age">Gruppiert: Baujahr</option><option value="energy">Gruppiert: Energie</option><option value="city">Gruppiert: Stadt</option></select>
              <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sortierung"><option value="match">Favoriten zuerst</option><option value="priceAsc">Preis: niedrig zuerst</option><option value="priceDesc">Preis: hoch zuerst</option><option value="sqmAsc">Preis/m²: niedrig zuerst</option><option value="newest">Neuestes Baujahr</option></select>
              <div className={styles.viewSwitch}><button className={view === 'cards' ? styles.viewActive : ''} onClick={() => setView('cards')} type="button" aria-label="Kartenansicht">▦</button><button className={view === 'table' ? styles.viewActive : ''} onClick={() => setView('table')} type="button" aria-label="Tabellenansicht">☷</button></div>
            </div>
          </header>

          {view === 'cards' ? (
            <div className={styles.groupedResults}>
              {groupedHomes.map(([label, groupHomes]) => {
                const groupAverage = Math.round(groupHomes.reduce((sum, home) => sum + home.price, 0) / groupHomes.length)
                return <section className={styles.resultGroup} key={label}>
                  <header><div><span>GRUPPE</span><h3>{label}</h3></div><div><strong>{groupHomes.length}</strong><small>Wohnungen</small></div><div><strong>{money(groupAverage)}</strong><small>Ø Kaufpreis</small></div></header>
                  <div className={styles.cards}>
                    {groupHomes.map((home, index) => <HomeCard home={home} index={index} favorite={favoriteIds.includes(home.id)} onFavorite={() => toggleFavorite(home.id)} onOpen={() => setSelected(home)} key={home.id}/>) }
                  </div>
                </section>
              })}
            </div>
          ) : (
            <HomeTable homes={visibleHomes} favorites={favoriteIds} onOpen={setSelected}/>
          )}
          {!visibleHomes.length && <div className={styles.empty}><Icon name="home"/><h3>Keine Treffer</h3><p>Ändere die Filter oder importiere neue Angebote.</p></div>}
        </div>
      </section>

      {importOpen && <Modal title="Angebote importieren" kicker="JSON IMPORT" onClose={() => setImportOpen(false)}>
        <p className={styles.modalIntro}>Füge den vollständigen JSON-Block aus ChatGPT ein. Vorhandene Angebote mit gleicher ID werden aktualisiert.</p>
        <textarea className={styles.jsonArea} value={jsonText} onChange={event => setJsonText(event.target.value)} placeholder={'{\n  "properties": [ ... ]\n}'} autoFocus/>
        <div className={styles.modalActions}><button className={styles.secondaryButton} type="button" onClick={() => setImportOpen(false)}>Abbrechen</button><button className={styles.primaryButton} type="button" onClick={importJson} disabled={!jsonText.trim()}>JSON importieren <Icon name="arrow"/></button></div>
      </Modal>}

      {promptOpen && <Modal title="Dein Such-Prompt" kicker="CHATGPT WORKFLOW" onClose={() => setPromptOpen(false)} wide>
        <p className={styles.modalIntro}>{propertyUrl.trim() ? 'Dieser Prompt analysiert genau den eingefügten Wohnungslink.' : 'Dieser Prompt sucht mehrere Wohnungen nach deinen ursprünglichen Kriterien.'} Den JSON-Block aus der Antwort fügst du anschließend über „Angebote importieren“ ein.</p>
        <label className={styles.promptUrlField}><span>Immobilien-Link (optional)</span><input type="url" value={propertyUrl} onChange={event => setPropertyUrl(event.target.value)} placeholder="https://…"/></label>
        <pre className={styles.promptBox}>{prompt}</pre>
        <div className={styles.modalActions}><button className={styles.secondaryButton} type="button" onClick={() => setPromptOpen(false)}>Schließen</button><button className={styles.primaryButton} type="button" onClick={copyPrompt}><Icon name="copy"/> Prompt kopieren</button></div>
      </Modal>}

      {selected && <Modal title={selected.title} kicker={`${selected.city} · ${selected.district}`} onClose={() => setSelected(null)}>
        <div className={styles.detailPrice}><strong>{money(selected.price)}</strong><span>{Math.round(selected.pricePerSqm).toLocaleString('de-DE')} €/m²</span></div>
        <div className={styles.detailGrid}><span><small>Fläche</small>{selected.area} m²</span><span><small>Zimmer</small>{selected.rooms}</span><span><small>Baujahr</small>{selected.yearBuilt || '–'}</span><span><small>Energie</small>{selected.energyClass}</span><span><small>Etage</small>{selected.floor}</span><span><small>Gruppe</small>{ageGroup(selected.yearBuilt)}</span></div>
        {selected.features?.length > 0 && <div className={styles.featureList}>{selected.features.map(item => <span key={item}>{item}</span>)}</div>}
        {selected.note && <p className={styles.detailNote}>{selected.note}</p>}
        <div className={styles.modalActions}><button className={styles.deleteButton} type="button" onClick={() => deleteHome(selected.id)}><Icon name="trash"/> Löschen</button>{selected.url && <a className={styles.primaryButton} href={selected.url} target="_blank" rel="noreferrer">Zum Angebot <Icon name="arrow"/></a>}</div>
      </Modal>}
    </main>
  )
}

function Filter({ label, value, options, onChange }) {
  return <label className={styles.selectField}><span>{label}</span><select value={value} onChange={event => onChange(event.target.value)}><option>Alle</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>
}

function HomeCard({ home, index, favorite, onFavorite, onOpen }) {
  return <article className={styles.card}>
    <div className={styles.cardVisual}>
      <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span><span className={styles.buildingYear}>{ageGroup(home.yearBuilt)}</span>
      <div className={styles.building} aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
      <button className={favorite ? styles.favoriteActive : styles.favorite} type="button" onClick={onFavorite} aria-label={favorite ? 'Favorit entfernen' : 'Als Favorit merken'}>{favorite ? '♥' : '♡'}</button>
    </div>
    <div className={styles.cardBody} onClick={onOpen} role="button" tabIndex={0} onKeyDown={event => (event.key === 'Enter' || event.key === ' ') && onOpen()}>
      <div className={styles.location}><span>{home.city}</span><i/> {home.district || 'Stadtteil unbekannt'}</div>
      <h3>{home.title}</h3>
      <div className={styles.primaryFacts}><span><strong>{home.rooms}</strong> Zimmer</span><span><strong>{home.area}</strong> m²</span><span><strong>{home.floor}</strong> Etage</span></div>
      <div className={styles.energyRow}><span className={`${styles.energy} ${styles[`energy${home.energyClass?.replace('+', 'Plus')}`] || ''}`}>{home.energyClass}</span><span>{energyGroup(home.energyClass)}</span><span>·</span><span>Baujahr {home.yearBuilt || 'k. A.'}</span></div>
      <div className={styles.cardPrice}><div><strong>{money(home.price)}</strong><small>Kaufpreis</small></div><div><strong>{Math.round(home.pricePerSqm).toLocaleString('de-DE')} €</strong><small>pro m²</small></div><button type="button" aria-label="Details öffnen"><Icon name="arrow"/></button></div>
    </div>
  </article>
}

function HomeTable({ homes, favorites, onOpen }) {
  return <div className={styles.tableWrap}><table><thead><tr><th>Wohnung</th><th>Fläche</th><th>Zimmer</th><th>Baujahr</th><th>Energie</th><th>Etage</th><th>Preis/m²</th><th>Preis</th></tr></thead><tbody>{homes.map(home => <tr onClick={() => onOpen(home)} key={home.id}><td><strong>{favorites.includes(home.id) && '♥ '}{home.title}</strong><small>{home.city} · {home.district}</small></td><td>{home.area} m²</td><td>{home.rooms}</td><td>{home.yearBuilt}<small>{ageGroup(home.yearBuilt)}</small></td><td><span className={styles.energy}>{home.energyClass}</span></td><td>{home.floor}</td><td>{Math.round(home.pricePerSqm).toLocaleString('de-DE')} €</td><td><strong>{money(home.price)}</strong></td></tr>)}</tbody></table></div>
}

function Modal({ title, kicker, onClose, children, wide = false }) {
  return <div className={styles.backdrop} onMouseDown={onClose} role="presentation"><section className={`${styles.modal} ${wide ? styles.modalWide : ''}`} onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}><header><div><span className={styles.eyebrow}>{kicker}</span><h2>{title}</h2></div><button type="button" onClick={onClose} aria-label="Schließen">×</button></header>{children}</section></div>
}
