'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

const HOME_CARD_VISUALS = {
  anatomie: {
    src: '/fach/technik.png',
    className: styles.iconBoxPurple,
  },
  messwerte: {
    src: '/referenzen/messwerte.png',
    className: styles.iconBoxBlue,
  },
  klassifikationen: {
    src: '/referenzen/klassifikation.png',
    className: styles.iconBoxOrange,
  },
  rechner: {
    src: '/referenzen/rechner.png',
    className: styles.iconBoxGreen,
  },
}

const CLASSIFICATION_TOPIC_LOGOS = {
  neuro: '/fach/gehirn.png',
  thorax: '/fach/thorax.png',
  schilddruese: '/fach/hals.png',
  abdomen: '/fach/abdomen.png',
  mamma: '/fach/mamma.png',
  urogenital: '/fach/becken-m.png',
  'mamma-uro': '/fach/mamma.png',
  wirbelsaeule: '/fach/wirbelsaeule.png',
  msk: '/fach/msk.png',
  onko: '/fach/technik.png',
}

const ANATOMY_TOPIC_LOGOS = {
  neuro: '/fach/gehirn.png',
  'thorax-herz': '/fach/thorax.png',
  abdomen: '/fach/abdomen.png',
  urogenital: '/fach/becken-m.png',
}

const ANATOMY_TOPIC_ORDER = [
  {
    id: 'neuro',
    name: { de: 'Neuro', en: 'Neuro', fa: 'نورولوژی' },
    color: '#7c3aed',
    itemIds: ['hirngefaess-territorien'],
  },
  {
    id: 'thorax-herz',
    name: { de: 'Thorax & Herz', en: 'Thorax & Heart', fa: 'توراکس و قلب' },
    color: '#0ea5e9',
    itemIds: ['lungensegmente', 'bronchopulmonal-gefaesse', 'koronararterien-territorien'],
  },
  {
    id: 'abdomen',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    color: '#f59e0b',
    itemIds: ['lebersegmente-couinaud', 'pankreas-gallenwege'],
  },
  {
    id: 'urogenital',
    name: { de: 'Urogenital', en: 'Urogenital', fa: 'اوروژنیتال' },
    color: '#ef4444',
    itemIds: ['beckenarterien'],
  },
]

const CLASSIFICATION_SEARCH_ALIASES = {
  'ti-rads': ['tirads', 'schilddrüse', 'schilddruesenknoten', 'thyroid'],
  'bi-rads': ['birads', 'mammografie', 'mammography', 'brust', 'breast'],
  'mamma-mrt-dichte': ['bpe', 'fgT', 'mamma mrt', 'brust mrt', 'breast mri'],
  'pi-rads': ['pirads', 'prostata', 'prostate'],
  'harnstau-grad': ['harnstau', 'harnstauung', 'hydronephrose', 'hydronephrosis', 'nierenstau', 'ureterstau'],
  'li-rads': ['lirads', 'leber', 'hcc', 'liver'],
  bosniak: ['bosnak', 'nierenzyste', 'nierencyste', 'kidney cyst', 'renal cyst'],
  balthazar: ['ctsi', 'pankreatitis', 'pancreatitis'],
  cdd: ['divertikulitis', 'divertikelkrankheit', 'diverticular'],
  'aast-ois': ['aast', 'ois', 'organ injury scale', 'lebertrauma', 'milztrauma', 'nierentrauma', 'liver trauma', 'spleen trauma', 'kidney trauma'],
  'lung-rads': ['lungrads', 'lungenscreening', 'lung screening'],
  fleischner: ['lungenrundherd', 'lungenrundherde', 'pulmonary nodule', 'milchglas', 'ggo', 'ground glass', 'part solid', 'subsolid', 'nodulus', 'rundherd'],
  'stanford-debakey': ['stanford', 'debakey', 'aortendissektion', 'aortic dissection', 'dissektion'],
  'salter-harris': ['salter harris', 'salterharis', 'salter-haris', 'wachstumsfuge', 'epiphysenfuge', 'physis', 'kindesfraktur', 'child fracture', 'physeal fracture'],
  fazekas: ['fazekes', 'marklager', 'white matter'],
  'mta-score': ['mta', 'mediale temporalatrophie', 'hippocampus', 'alzheimer', 'demenz'],
  modic: ['endplatte', 'abschlussplatte', 'wirbelkoerperabschlussplatte', 'wirbelkörperabschlussplatte', 'bone marrow', 'endplate', 'spine'],
  vancouver: ['vancover', 'periprothetisch', 'periprothetische fraktur', 'hueft tep', 'hüft tep', 'prothesenschaft', 'femurfraktur'],
  aspects: ['schlaganfall', 'stroke', 'mca'],
  'pc-aspects': ['posterior circulation', 'hintere zirkulation', 'basilaris'],
  recist: ['tumoransprechen', 'response'],
  deauville: ['lymphom', 'lymphoma', 'pet'],
  lugano: ['lymphom', 'lymphoma', 'ann arbor', 'pet ct', 'lymphom staging'],
}

const CLASSIFICATION_SEARCH_COPY = {
  de: {
    placeholder: 'Klassifikation oder Organ suchen …',
    hint: 'Tippfehler werden erkannt, z. B. „Bosnak“ oder „PIRAD“.',
    results: 'Treffer',
    suggestion: 'Meintest du',
    empty: 'Keine passende Klassifikation gefunden.',
    clear: 'Suche löschen',
  },
  en: {
    placeholder: 'Search classification or organ …',
    hint: 'Typos are recognised, e.g. “Bosnak” or “PIRAD”.',
    results: 'Results',
    suggestion: 'Did you mean',
    empty: 'No matching classification found.',
    clear: 'Clear search',
  },
  fa: {
    placeholder: 'جستجوی طبقه‌بندی، اندام یا مخفف …',
    hint: 'خطاهای تایپی نیز شناسایی می‌شوند؛ مانند Bosnak یا PIRAD.',
    results: 'نتایج',
    suggestion: 'منظورتان این بود',
    empty: 'طبقه‌بندی مرتبطی پیدا نشد.',
    clear: 'پاک کردن جستجو',
  },
}

const ANATOMY_SEARCH_COPY = {
  de: {
    placeholder: 'Anatomie oder Region suchen …',
    results: 'Treffer',
    suggestion: 'Meintest du',
    empty: 'Keine passende Anatomie gefunden.',
    clear: 'Suche löschen',
  },
  en: {
    placeholder: 'Search anatomy or region …',
    results: 'Results',
    suggestion: 'Did you mean',
    empty: 'No matching anatomy found.',
    clear: 'Clear search',
  },
  fa: {
    placeholder: 'جستجوی آناتومی یا ناحیه …',
    results: 'نتایج',
    suggestion: 'منظورتان این بود',
    empty: 'آناتومی مرتبطی پیدا نشد.',
    clear: 'پاک کردن جستجو',
  },
}

const REFERENCE_MODAL_FIXED_BODY = { minHeight: 'min(620px, calc(88vh - 128px))' }

function normaliseSearch(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, ' ')
    .trim()
}

function editDistance(a, b) {
  if (!a) return b.length
  if (!b) return a.length
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0]
    previous[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      const above = previous[j]
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      diagonal = above
    }
  }
  return previous[b.length]
}

function classificationSearchScore(query, candidate) {
  const q = normaliseSearch(query)
  const c = normaliseSearch(candidate)
  if (!q || !c) return null
  if (c === q) return 0
  if (c.startsWith(q)) return 0.04
  if (c.includes(q)) return 0.08

  const words = c.split(' ')
  let best = editDistance(q, c) / Math.max(q.length, c.length)
  for (const word of words) {
    best = Math.min(best, editDistance(q, word) / Math.max(q.length, word.length))
  }
  return best <= 0.38 ? 0.2 + best : null
}

function buildClassificationTopics(sourceTopics) {
  const byId = Object.fromEntries(sourceTopics.map(topic => [topic.id, topic]))
  const thorax = byId.thorax
  const mammaUro = byId['mamma-uro']
  const makeTopic = (id, source, name, items, color = source.color) => ({
    ...source,
    id,
    sourceTopicId: source.id,
    name,
    color,
    items,
  })

  return [
    byId.neuro,
    makeTopic(
      'thorax',
      thorax,
      { de: 'Thorax', en: 'Thorax', fa: 'توراکس' },
      thorax.items.filter(item => item.id !== 'ti-rads'),
    ),
    makeTopic(
      'schilddruese',
      thorax,
      { de: 'Schilddrüse', en: 'Thyroid', fa: 'تیروئید' },
      thorax.items.filter(item => item.id === 'ti-rads'),
      '#db2777',
    ),
    byId.abdomen,
    makeTopic(
      'mamma',
      mammaUro,
      { de: 'Mamma', en: 'Breast', fa: 'پستان' },
      mammaUro.items.filter(item => !['pi-rads', 'harnstau-grad'].includes(item.id)),
      '#ec4899',
    ),
    makeTopic(
      'urogenital',
      mammaUro,
      { de: 'Urogenital', en: 'Urogenital', fa: 'اوروژنیتال' },
      mammaUro.items.filter(item => ['pi-rads', 'harnstau-grad'].includes(item.id)),
      '#0ea5e9',
    ),
    byId.wirbelsaeule,
    byId.msk,
    byId.onko,
  ].filter(Boolean)
}

function buildAnatomyTopics(sourceItems, lang) {
  const byId = Object.fromEntries(sourceItems.map(item => [item.id, item]))
  return ANATOMY_TOPIC_ORDER
    .map(topic => ({
      ...topic,
      items: sortByLocalizedName(topic.itemIds.map(id => byId[id]).filter(Boolean), lang),
    }))
    .filter(topic => topic.items.length)
}

function sortByLocalizedName(items, lang) {
  return [...items].sort((a, b) => tx(a.name, lang).localeCompare(tx(b.name, lang), lang === 'de' ? 'de' : undefined, { sensitivity: 'base' }))
}

const MEASUREMENT_REGION_LOGOS = {
  neuro: '/fach/gehirn.png',
  thorax: '/fach/thorax.png',
  herz: '/fach/thorax.png',
  abdomen: '/fach/abdomen.png',
  urogenital: '/fach/becken-m.png',
  gefaesse: '/fach/gefaesse-ir.png',
  wirbelsaeule: '/fach/wirbelsaeule.png',
  msk: '/fach/msk.png',
  'hu-werte': '/fach/technik.png',
}

const CALCULATOR_GROUP_LOGOS = {
  'neuro-gefaesse': '/fach/gehirn.png',
  'herz-thorax': '/fach/thorax.png',
  abdomen: '/fach/abdomen.png',
  urogenital: '/fach/becken-m.png',
  onko: '/fach/technik.png',
  wirbelsaeule: '/fach/wirbelsaeule.png',
}

function HomeCardIcon({ type, alt }) {
  const visual = HOME_CARD_VISUALS[type]
  return (
    <div className={`${styles.iconBox} ${visual.className}`}>
      <Image src={visual.src} alt={alt} width={124} height={124} className={styles.cardIconImage} />
    </div>
  )
}

/* ── Collapsible Gruppe (Messwerte) ──────────── */
function CollapseGroup({ name, color, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={styles.groupBlock}>
      <button
        className={`${styles.groupHeadingBtn} ${open ? styles.groupHeadingBtnOpen : ''}`}
        style={{ '--ref-color': color }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.groupHeadingMarker} aria-hidden="true" />
        <span className={styles.groupHeadingText}>{name}</span>
        <span className={styles.groupChevron} aria-hidden="true" />
      </button>
      {open && <div className={styles.groupCollapseBody}>{children}</div>}
    </div>
  )
}

/* ── Hauptkomponente ──────────────────────────── */
export default function WichtigeReferenzen({ mode = 'section' }) {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('ref') === 'anatomie') setModal('anatomie')
    if (params.get('ref') === 'klassifikationen') setModal('klassifikationen')
  }, [])

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  useEffect(() => {
    const openReferenceModal = (event) => {
      const modalId = event.detail?.modal
      if (['anatomie', 'messwerte', 'klassifikationen', 'rechner'].includes(modalId)) {
        setModal(modalId)
      }
    }
    window.addEventListener('radyar:open-reference-modal', openReferenceModal)
    return () => window.removeEventListener('radyar:open-reference-modal', openReferenceModal)
  }, [])

  if (mode === 'modals') {
    return (
      <>
        {modal==='anatomie'        && <AnatomieModal        copy={copy} lang={lang} onClose={()=>setModal(null)} />}
        {modal==='messwerte'       && <MesswerteModal       copy={copy} lang={lang} onClose={()=>setModal(null)} />}
        {modal==='klassifikationen'&& <KlassifikationenModal copy={copy} lang={lang} onClose={()=>setModal(null)} />}
        {modal==='rechner'         && <RechnerModal          copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      </>
    )
  }

  return (
    <section className={styles.section} id="referenzen">
      <div className={styles.glassHeader}>
        <div className={styles.glassHeaderGlow} />
        <div className={styles.glassTop}>
          <h2 className={styles.glassTitle} data-title={copy.sectionLabel}>{copy.sectionLabel}</h2>
          <p className={styles.glassSubtitle}>{copy.title}</p>
          <p className={styles.glassSub}>{copy.sub}</p>
        </div>
        <div className={styles.grid}>
          <button className={`${styles.card} ${styles.cardPurple}`} onClick={() => setModal('anatomie')}>
            <HomeCardIcon type="anatomie" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorPurple}`}>{copy.btnAnatomie}</h3>
            <p className={styles.cardDesc}>{copy.btnAnatomieSub}</p>
            <div className={styles.chips}>{(copy.chipsAnatomie||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipPurple}`}>{ch}</span>)}</div>
          </button>
          <button className={`${styles.card} ${styles.cardOrange}`} onClick={() => setModal('klassifikationen')}>
            <HomeCardIcon type="klassifikationen" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorOrange}`}>{copy.btnKlass}</h3>
            <p className={styles.cardDesc}>{copy.btnKlassSub}</p>
            <div className={styles.chips}>{(copy.chipsKlass||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipOrange}`}>{ch}</span>)}</div>
          </button>
          <button className={`${styles.card} ${styles.cardBlue}`} onClick={() => setModal('messwerte')}>
            <HomeCardIcon type="messwerte" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorBlue}`}>{copy.btnMesswerte}</h3>
            <p className={styles.cardDesc}>{copy.btnMesswerteSub}</p>
            <div className={styles.chips}>{(copy.chipsMesswerte||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipBlue}`}>{ch}</span>)}</div>
          </button>
          <button className={`${styles.card} ${styles.cardGreen}`} onClick={() => setModal('rechner')}>
            <HomeCardIcon type="rechner" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorGreen}`}>{copy.btnRechner}</h3>
            <p className={styles.cardDesc}>{copy.btnRechnerSub}</p>
            <div className={styles.chips}>{(copy.chipsRechner||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipGreen}`}>{ch}</span>)}</div>
          </button>
        </div>
      </div>

      {modal==='anatomie'        && <AnatomieModal        copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='messwerte'       && <MesswerteModal       copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='klassifikationen'&& <KlassifikationenModal copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='rechner'         && <RechnerModal          copy={copy} lang={lang} onClose={()=>setModal(null)} />}
    </section>
  )
}

/* ── Modal-Hülle ──────────────────────────────── */
function Modal({ title, subtitle, accent, copy, onClose, children, accentClass, wide, showDisclaimer = true }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${wide ? styles.modalWide : ''}`}
           onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <header className={`${styles.modalHead} ${accentClass||''}`}>
          <h3 className={styles.modalTitle}>
            <span className={styles.modalTitleMain}>{title}</span>
            {subtitle && (
              <span className={styles.modalCrumb} style={accent?{color:accent}:undefined}>
                <span className={styles.modalCrumbSep}>›</span>{subtitle}
              </span>
            )}
          </h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label={copy.close}>×</button>
        </header>
        <div className={styles.modalBody}>{children}</div>
        {showDisclaimer && <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>}
      </div>
    </div>
  )
}

/* ── Befundrelevante Anatomie ─────────────────── */
function AnatomieModal({ copy, lang, onClose }) {
  const router = useRouter()
  const topics = buildAnatomyTopics(REF_DATA.anatomie, lang)
  const [topicId, setTopicId] = useState(topics[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const [query, setQuery] = useState('')
  const topic = topics.find(entry => entry.id === topicId) || topics[0]
  const items = topics.flatMap(entry => entry.items.map(item => ({ ...item, topic: entry })))
  const searchCopy = ANATOMY_SEARCH_COPY[lang] || ANATOMY_SEARCH_COPY.de
  const searchResults = query.trim()
    ? items.map(entry => {
        const candidates = [
          tx(entry.name, lang),
          tx(entry.name, 'de'),
          tx(entry.name, 'en'),
          tx(entry.topic.name, lang),
          ...(entry.rows || []).flatMap(row => row.map(cell => tx(cell, lang))),
        ]
        const scores = candidates
          .map(candidate => classificationSearchScore(query, candidate))
          .filter(score => score !== null)
        if (!scores.length) return null
        return { item: entry, score: Math.min(...scores) }
      }).filter(Boolean)
        .sort((a, b) => a.score - b.score || tx(a.item.name, lang).localeCompare(tx(b.item.name, lang)))
        .slice(0, 8)
    : []
  const topResultNameScore = searchResults[0]
    ? classificationSearchScore(query, tx(searchResults[0].item.name, lang))
    : null
  const suggestedResult = query.trim().length >= 3
    && searchResults[0]
    && topResultNameScore !== null
    && normaliseSearch(query) !== normaliseSearch(tx(searchResults[0].item.name, lang))
    ? searchResults[0]
    : null
  const go = id => {
    onClose()
    router.push(`/referenzen/anatomie/${id}${lang!=='de'?`?lang=${lang}`:''}`)
  }

  return (
    <Modal title={copy.btnAnatomie} subtitle={showDetail?tx(topic.name, lang):null} accent={topic.color}
      copy={copy} onClose={onClose} accentClass={styles.headPurple} wide showDisclaimer={false}>
      <div className={`${styles.klassSearchWrap} ${styles.anatomySearchWrap}`}>
        <div className={`${styles.klassSearchField} ${styles.anatomySearchField}`}>
          <span className={`${styles.klassSearchIcon} ${styles.anatomySearchIcon}`} aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className={styles.klassSearchInput}
            placeholder={searchCopy.placeholder}
            aria-label={searchCopy.placeholder}
          />
          {query && (
            <button type="button" className={`${styles.klassSearchClear} ${styles.anatomySearchClear}`} onClick={() => setQuery('')} aria-label={searchCopy.clear}>×</button>
          )}
        </div>
        {suggestedResult && (
          <p className={`${styles.klassSearchSuggestion} ${styles.anatomySearchSuggestion}`}>
            {searchCopy.suggestion}:{' '}
            <button type="button" onClick={() => setQuery(tx(suggestedResult.item.name, lang))}>
              {tx(suggestedResult.item.name, lang)}
            </button>
            ?
          </p>
        )}
      </div>

      {query.trim() ? (
        <div className={styles.klassSearchResults} style={REFERENCE_MODAL_FIXED_BODY}>
          <div className={`${styles.klassSearchResultsHead} ${styles.anatomySearchResultsHead}`}>
            <strong>{searchCopy.results}</strong>
            <span>{searchResults.length}</span>
          </div>
          {searchResults.length ? (
            <div className={styles.klassSearchGrid}>
              {searchResults.map(({ item: resultItem }) => (
                <button
                  key={resultItem.id}
                  type="button"
                  className={styles.klassSearchResult}
                  style={{ '--ref-color': resultItem.color }}
                  onClick={() => go(resultItem.id)}
                >
                  <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                    <Image src={ANATOMY_TOPIC_LOGOS[resultItem.topic.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
                  </span>
                  <span className={styles.klassSearchResultText}>
                    <strong>{tx(resultItem.name, lang)}</strong>
                  </span>
                  <span className={styles.klassSearchResultArrow}>→</span>
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.klassSearchEmpty}>{searchCopy.empty}</p>
          )}
        </div>
      ) : (
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`} style={REFERENCE_MODAL_FIXED_BODY}>
        <nav className={styles.sidebar}>
          {topics.map(entry => (
            <button key={entry.id}
              className={`${styles.navBtn} ${styles.klassNavBtn} ${entry.id===topicId?styles.navActivePurple:''}`}
              style={{'--ref-color':entry.color}} onClick={()=>{
                setTopicId(entry.id)
                setShowDetail(true)
              }}>
              <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                <Image src={ANATOMY_TOPIC_LOGOS[entry.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
              </span>
              <span className={styles.klassNavText}>
                <span className={styles.navLabel}>{tx(entry.name, lang)}</span>
              </span>
              <span className={styles.klassNavArrow}>›</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{'--ref-color':topic.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <div className={styles.klassTopicHead}>
            <span className={`${styles.regionHeadingIcon} ${styles.klassTopicLogoWrap}`}>
              <Image src={ANATOMY_TOPIC_LOGOS[topic.id] || '/fach/technik.png'} alt="" width={38} height={38} className={styles.klassTopicLogo} />
            </span>
            <div>
              <span className={styles.klassTopicEyebrow}>{copy.btnAnatomie}</span>
              <h2 style={{color:topic.color}}>{tx(topic.name,lang)}</h2>
            </div>
          </div>
          <div className={styles.klassCardGrid}>
            {topic.items.map(entry => (
              <button
                key={entry.id}
                type="button"
                className={styles.klassCard}
                style={{'--ref-color': entry.color}}
                onClick={() => go(entry.id)}
              >
                <span className={styles.klassCardName} style={{color: entry.color}}>{tx(entry.name, lang)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      )}
    </Modal>
  )
}

/* ── Messwerte-Modal ──────────────────────────── */
function MeasurementText({ value, lang }) {
  const text = tx(value, lang)
  if (Array.isArray(text)) {
    return (
      <ul className={styles.measurementList}>
        {text.map((line, index) => <li key={index}>{line}</li>)}
      </ul>
    )
  }
  return text
}

function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const [zoomImage, setZoomImage] = useState(null)
  const region = regions.find(r=>r.id===regionId) || regions[0]
  return (
    <Modal title={copy.btnMesswerte} subtitle={showDetail?tx(region.name,lang):null} accent={region.color}
      copy={copy} onClose={onClose} accentClass={styles.headBlue}>
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        <nav className={styles.sidebar}>
          {regions.map(r=>(
            <button key={r.id}
              className={`${styles.navBtn} ${r.id===regionId?styles.navActiveBlue:''}`}
              style={{'--ref-color':r.color}} onClick={()=>{setRegionId(r.id);setShowDetail(true)}}>
              <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                <Image src={MEASUREMENT_REGION_LOGOS[r.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
              </span>
              <span className={styles.navLabel}>{tx(r.name,lang)}</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{'--ref-color':region.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={`${styles.regionHeadingIcon} ${styles.klassTopicLogoWrap}`}>
              <Image src={MEASUREMENT_REGION_LOGOS[region.id] || '/fach/technik.png'} alt="" width={38} height={38} className={styles.klassTopicLogo} />
            </span>
            <span style={{color:region.color}}>{tx(region.name,lang)}</span>
          </h2>
          {region.groups.map((group,gi)=>(
            <CollapseGroup key={gi} name={tx(group.name,lang)} color={region.color}>
              <div className={styles.tableWrap}>
                <table className={styles.mTable}>
                  <thead><tr>
                    <th className={styles.thName}>{copy.colStruktur}</th>
                    <th className={styles.thVal}>{copy.colWert}</th>
                    <th className={styles.thNote}>{copy.colHinweis}</th>
                  </tr></thead>
                  <tbody>{group.entries.map((e,ei)=>(
                    <tr key={ei}>
                      <td className={styles.tdName}>{tx(e.s,lang)}</td>
                      <td className={styles.tdVal}>{e.v}</td>
                      <td className={styles.tdNote}>
                        <MeasurementText value={e.h} lang={lang} />
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              {(group.note || group.source || group.image) && (
                <div className={`${styles.measurementFootnotes} ${group.image ? styles.measurementFootnotesWithImage : ''}`}>
                  {group.image && (
                    <figure className={styles.measurementImageFigure}>
                      <button
                        type="button"
                        className={styles.measurementImageButton}
                        onClick={() => setZoomImage(group.image)}
                        aria-label={copy.zoomImage}
                      >
                        <Image
                          src={group.image.src}
                          alt={tx(group.image.alt, lang)}
                          width={1448}
                          height={1086}
                          className={styles.measurementImage}
                          sizes="240px"
                        />
                        <span>{copy.zoomImage}</span>
                      </button>
                    </figure>
                  )}
                  <div className={styles.measurementFootnoteText}>
                    {group.note && <p className={styles.measurementNote}>{tx(group.note, lang)}</p>}
                    {group.source && (
                      <p className={styles.measurementSource}>
                        {copy.reference}:{' '}
                        <a href={group.source.url} target="_blank" rel="noreferrer">
                          {tx(group.source.label, lang)}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CollapseGroup>
          ))}
        </div>
      </div>
      {zoomImage && (
        <div className={styles.measurementZoomBackdrop} role="presentation" onClick={() => setZoomImage(null)}>
          <button type="button" className={styles.measurementZoomClose} onClick={() => setZoomImage(null)} aria-label={copy.close}>×</button>
          <Image
            src={zoomImage.src}
            alt={tx(zoomImage.alt, lang)}
            width={1448}
            height={1086}
            className={styles.measurementZoomImage}
            sizes="96vw"
          />
        </div>
      )}
    </Modal>
  )
}

/* ── Klassifikationen-Modal (Split wie Messwerte) ─ */
function KlassifikationenModal({ copy, lang, onClose }) {
  const router = useRouter()
  const topics = buildClassificationTopics(REF_DATA.klassifikationen)
    .map(topic => ({ ...topic, items: sortByLocalizedName(topic.items, lang) }))
  const [topicId, setTopicId] = useState(topics[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const [query, setQuery] = useState('')
  const topic = topics.find(t => t.id === topicId) || topics[0]
  const searchCopy = CLASSIFICATION_SEARCH_COPY[lang] || CLASSIFICATION_SEARCH_COPY.de
  const searchResults = query.trim()
    ? topics.flatMap(searchTopic => searchTopic.items.map(item => {
        const candidates = [
          tx(item.name, lang),
          tx(item.name, 'de'),
          tx(item.name, 'en'),
          tx(searchTopic.name, lang),
          tx(item.kompakt, lang),
          ...(CLASSIFICATION_SEARCH_ALIASES[item.id] || []),
        ]
        const scores = candidates
          .map(candidate => classificationSearchScore(query, candidate))
          .filter(score => score !== null)
        if (!scores.length) return null
        return {
          item,
          topic: searchTopic,
          score: Math.min(...scores),
        }
      })).filter(Boolean)
      .sort((a, b) => a.score - b.score || tx(a.item.name, lang).localeCompare(tx(b.item.name, lang)))
      .slice(0, 8)
    : []
  const topResultNameScore = searchResults[0]
    ? classificationSearchScore(query, tx(searchResults[0].item.name, lang))
    : null
  const suggestedResult = query.trim().length >= 3
    && searchResults[0]
    && topResultNameScore !== null
    && normaliseSearch(query) !== normaliseSearch(tx(searchResults[0].item.name, lang))
    ? searchResults[0]
    : null
  const go = (tId, itemId) => {
    onClose()
    router.push(`/referenzen/${tId}/${itemId}${lang!=='de'?`?lang=${lang}`:''}`)
  }
  return (
    <Modal title={copy.btnKlass} subtitle={showDetail?tx(topic.name,lang):null} accent={topic.color}
      copy={copy} onClose={onClose} accentClass={styles.headOrange} wide showDisclaimer={false}>
      <div className={styles.klassSearchWrap}>
        <div className={styles.klassSearchField}>
          <span className={styles.klassSearchIcon} aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className={styles.klassSearchInput}
            placeholder={searchCopy.placeholder}
            aria-label={searchCopy.placeholder}
          />
          {query && (
            <button type="button" className={styles.klassSearchClear} onClick={() => setQuery('')} aria-label={searchCopy.clear}>×</button>
          )}
        </div>
        {suggestedResult && (
          <p className={styles.klassSearchSuggestion}>
            {searchCopy.suggestion}:{' '}
            <button type="button" onClick={() => setQuery(tx(suggestedResult.item.name, lang))}>
              {tx(suggestedResult.item.name, lang)}
            </button>
            ?
          </p>
        )}
      </div>

      {query.trim() ? (
        <div className={styles.klassSearchResults}>
          <div className={styles.klassSearchResultsHead}>
            <strong>{searchCopy.results}</strong>
            <span>{searchResults.length}</span>
          </div>
          {searchResults.length ? (
            <div className={styles.klassSearchGrid}>
              {searchResults.map(({ item, topic: resultTopic }) => (
                <button
                  key={`${resultTopic.id}-${item.id}`}
                  type="button"
                  className={styles.klassSearchResult}
                  style={{ '--ref-color': resultTopic.color }}
                  onClick={() => go(resultTopic.sourceTopicId || resultTopic.id, item.id)}
                >
                  <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                    <Image src={CLASSIFICATION_TOPIC_LOGOS[resultTopic.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
                  </span>
                  <span className={styles.klassSearchResultText}>
                    <strong>{tx(item.name, lang)}</strong>
                    <small>{tx(resultTopic.name, lang)}</small>
                  </span>
                  <span className={styles.klassSearchResultArrow}>→</span>
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.klassSearchEmpty}>{searchCopy.empty}</p>
          )}
        </div>
      ) : (
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        <nav className={styles.sidebar}>
          {topics.map(t => (
            <button key={t.id}
              className={`${styles.navBtn} ${styles.klassNavBtn} ${t.id===topicId?styles.navActiveOrange:''}`}
              style={{'--ref-color':t.color}} onClick={()=>{setTopicId(t.id);setShowDetail(true)}}>
              <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                <Image src={CLASSIFICATION_TOPIC_LOGOS[t.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
              </span>
              <span className={styles.klassNavText}>
                <span className={styles.navLabel}>{tx(t.name,lang)}</span>
              </span>
              <span className={styles.klassNavArrow}>›</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{'--ref-color':topic.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <div className={styles.klassTopicHead}>
            <span className={`${styles.regionHeadingIcon} ${styles.klassTopicLogoWrap}`}>
              <Image src={CLASSIFICATION_TOPIC_LOGOS[topic.id] || '/fach/technik.png'} alt="" width={38} height={38} className={styles.klassTopicLogo} />
            </span>
            <div>
              <span className={styles.klassTopicEyebrow}>{copy.btnKlass}</span>
              <h2 style={{color:topic.color}}>{tx(topic.name,lang)}</h2>
            </div>
          </div>
          <div className={styles.klassCardGrid}>
            {topic.items.map(item=>(
              <button key={item.id} className={styles.klassCard} style={{'--ref-color':topic.color}} onClick={()=>go(topic.sourceTopicId || topic.id,item.id)}>
                <span className={styles.klassCardName} style={{color:topic.color}}>{tx(item.name,lang)}</span>
                <span className={styles.klassCardText}>{tx(item.kompakt,lang)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      )}
    </Modal>
  )
}

/* ═══════════════════════════════════════════════
   RECHNER-GRUPPEN
   ═══════════════════════════════════════════════ */
const RECHNER_GROUPS = [
  {
    id: 'neuro-gefaesse',
    name: { de: 'Neuro & Gefäße', en: 'Neuro & Vessels', fa: 'نورو و عروق' },
    color: '#7c3aed', iconId: 'neuro',
    calcIds: ['evans-index', 'icb', 'nascet', 'ecst-nascet'],
  },
  {
    id: 'herz-thorax',
    name: { de: 'Thorax', en: 'Thorax', fa: 'توراکس' },
    color: '#be185d', iconId: 'herz',
    calcIds: ['lv-biplan-volumen', 'ktq', 'fleischner'],
  },
  {
    id: 'abdomen',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    color: '#f59e0b', iconId: 'abdomen',
    calcIds: ['milz-index', 'niere-volumen'],
  },
  {
    id: 'urogenital',
    name: { de: 'Urogenital', en: 'Urogenital', fa: 'اوروژنیتال' },
    color: '#0ea5e9', iconId: 'urogenital',
    calcIds: ['prostata-psa'],
  },
  {
    id: 'onko',
    name: { de: 'Onkologie', en: 'Oncology', fa: 'انکولوژی' },
    color: '#0d9488', iconId: 'hu-werte',
    calcIds: ['recist'],
  },
  {
    id: 'wirbelsaeule',
    name: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' },
    color: '#f97316', iconId: 'wirbelsaeule',
    calcIds: ['meyerding'],
  },
]

/* ── Rechner-Modal ────────────────────────────── */
function RechnerModal({ copy, lang, onClose }) {
  const [groupId, setGroupId] = useState(RECHNER_GROUPS[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const group = RECHNER_GROUPS.find(g => g.id === groupId) || RECHNER_GROUPS[0]
  const calcs = group.calcIds.map(id => REF_DATA.rechner.find(c => c.id === id)).filter(Boolean)

  return (
    <Modal title={copy.btnRechner} subtitle={showDetail?tx(group.name,lang):null} accent={group.color}
      copy={copy} onClose={onClose} accentClass={styles.headGreen} wide>
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        {/* Sidebar – Gruppen */}
        <nav className={styles.sidebar}>
          {RECHNER_GROUPS.map(g => (
            <button key={g.id}
              className={`${styles.navBtn} ${g.id === groupId ? styles.navActiveGreen : ''}`}
              style={{'--ref-color': g.color}}
              onClick={() => {setGroupId(g.id);setShowDetail(true)}}>
              <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                <Image src={CALCULATOR_GROUP_LOGOS[g.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
              </span>
              <span className={styles.navLabel}>{tx(g.name, lang)}</span>
            </button>
          ))}
        </nav>

        {/* Inhalt – Rechner der gewählten Gruppe */}
        <div className={styles.content} style={{'--ref-color': group.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={`${styles.regionHeadingIcon} ${styles.klassTopicLogoWrap}`}>
              <Image src={CALCULATOR_GROUP_LOGOS[group.id] || '/fach/technik.png'} alt="" width={38} height={38} className={styles.klassTopicLogo} />
            </span>
            <span style={{color: group.color}}>{tx(group.name, lang)}</span>
          </h2>
          <div className={`${styles.rechnerSubGrid} ${group.id === 'herz-thorax' ? styles.rechnerThoraxGrid : ''}`}>
            {calcs.map(calc => (
              <RechnerCard key={calc.id} calc={calc} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* ── Rechner-Karte (dispatch by type) ────────── */
function RechnerCard({ calc, lang }) {
  return (
    <div className={styles.rechnerCard} data-calc-id={calc.id} style={{'--rc': calc.color}}>
      <div className={styles.rcHead}>
        <div className={styles.rcName} style={{color: calc.color}}>{tx(calc.name, lang)}</div>
        {calc.formula && <div className={styles.rcFormula}>{calc.formula}</div>}
      </div>

      {calc.type === 'single'     && <SingleCalc     calc={calc} lang={lang} />}
      {calc.type === 'multi'      && <MultiCalc      calc={calc} lang={lang} />}
      {calc.type === 'conversion' && <ConversionCalc calc={calc} lang={lang} />}
      {calc.type === 'recist'     && <RecistCalc     calc={calc} lang={lang} />}
      {calc.type === 'fleischner' && <FleischnerCalc calc={calc} lang={lang} />}

      {calc.hint && <p className={styles.rcHint}>{tx(calc.hint, lang)}</p>}
    </div>
  )
}

/* ── Hilfsfunktionen ──────────────────────────── */
function numFmt(val, decimals) {
  if (val == null) return null
  return decimals != null ? val.toFixed(decimals) : val.toFixed(1)
}
function getRange(ranges, val) {
  if (val == null || ranges == null) return null
  return ranges.find(r => val <= r.max) || null
}
function FieldRow({ label, help, id, val, onChange, unit, step = 0.1, min, max }) {
  return (
    <label className={styles.rcField}>
      <span className={styles.rcFieldLabel}>
        {label}
        {help && (
          <span className={styles.rcHelp} tabIndex={0} aria-label={help}>
            ?
            <span className={styles.rcHelpBubble}>{help}</span>
          </span>
        )}
      </span>
      <div className={styles.rcInputWrap}>
        <input type="number" className={styles.rcInput}
          placeholder="—" min={min} max={max} step={step}
          value={val ?? ''} onChange={e => onChange(id, e.target.value)} />
        <span className={styles.rcUnit}>{unit}</span>
      </div>
    </label>
  )
}
function ResultBox({ val, unit, decimals, range, lang }) {
  const display = numFmt(val, decimals)
  return (
    <div className={styles.rcResult} style={{
      background: range ? range.color + '14' : '#f8fafc',
      borderColor: range ? range.color + '44' : '#eef2f7',
    }}>
      {display != null ? (
        <>
          <span className={styles.rcResultVal} style={{color: range?.color || '#1a2051'}}>
            {display}{unit ? ` ${unit}` : ''}
          </span>
          {range && <span className={styles.rcResultLabel} style={{color: range.color}}>{tx(range.label, lang)}</span>}
        </>
      ) : (
        <span className={styles.rcResultPlaceholder}>—</span>
      )}
    </div>
  )
}

/* ── SingleCalc ───────────────────────────────── */
function SingleCalc({ calc, lang }) {
  const [v, setV] = useState({})
  const set = (id, val) => setV(prev => ({...prev, [id]: val === '' ? '' : parseFloat(val)}))
  const result = calc.calc(v)
  const range  = getRange(calc.ranges, result)
  return (
    <>
      <div className={styles.rcFields}>
        {calc.fields.map(f => (
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} help={f.help ? tx(f.help, lang) : null} val={v[f.id]} onChange={set}
            unit={f.unit} step={f.step} min={f.min} max={f.max} />
        ))}
      </div>
      <ResultBox val={result} unit={calc.resultUnit} decimals={calc.decimals} range={range} lang={lang} />
    </>
  )
}

/* ── MultiCalc (Prostata + PSA) ───────────────── */
function MultiCalc({ calc, lang }) {
  const [v, setV] = useState({})
  const set = (id, val) => setV(prev => ({...prev, [id]: val === '' ? '' : parseFloat(val)}))
  return (
    <>
      <div className={styles.rcFields}>
        {calc.fields.map(f => (
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} help={f.help ? tx(f.help, lang) : null} val={v[f.id]} onChange={set}
            unit={f.unit} step={f.step} min={f.min} max={f.max} />
        ))}
      </div>
      <div className={styles.rcMultiOutputs}>
        {calc.outputs.map((out, i) => {
          const res   = out.calc(v)
          const range = getRange(out.ranges, res)
          return (
            <div key={i} className={styles.rcOutputRow}>
              <span className={styles.rcOutputLabel} style={{color: calc.color}}>{tx(out.label,lang)}</span>
              <ResultBox val={res} unit={out.unit} decimals={out.decimals} range={range} lang={lang} />
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ── ConversionCalc (ECST ↔ NASCET) ──────────── */
function ConversionCalc({ calc, lang }) {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const aNum = parseFloat(a)
  const bNum = parseFloat(b)
  const bFromA = !isNaN(aNum) && a !== '' ? calc.calcAtoB(aNum) : null
  const aFromB = !isNaN(bNum) && b !== '' ? calc.calcBtoA(bNum) : null
  return (
    <div className={styles.rcConvWrapper}>
      {/* A → B */}
      <div className={styles.rcConvRow}>
        <label className={styles.rcConvLabel}>{tx(calc.labelA,lang)}</label>
        <div className={styles.rcInputWrap} style={{flex:1}}>
          <input type="number" className={styles.rcInput} placeholder="—" min={0} max={100} step={1}
            value={a} onChange={e=>setA(e.target.value)}/>
          <span className={styles.rcUnit}>{calc.unit}</span>
        </div>
        <span className={styles.rcConvArrow}>→</span>
        <div className={styles.rcConvResult} style={{color: calc.color}}>
          {bFromA != null ? `${tx(calc.labelB,lang)}: ${bFromA.toFixed(1)} ${calc.unit}` : `${tx(calc.labelB,lang)}: —`}
        </div>
      </div>
      {/* B → A */}
      <div className={styles.rcConvRow}>
        <label className={styles.rcConvLabel}>{tx(calc.labelB,lang)}</label>
        <div className={styles.rcInputWrap} style={{flex:1}}>
          <input type="number" className={styles.rcInput} placeholder="—" min={0} max={100} step={1}
            value={b} onChange={e=>setB(e.target.value)}/>
          <span className={styles.rcUnit}>{calc.unit}</span>
        </div>
        <span className={styles.rcConvArrow}>→</span>
        <div className={styles.rcConvResult} style={{color: calc.color}}>
          {aFromB != null ? `${tx(calc.labelA,lang)}: ${Math.max(0,aFromB).toFixed(1)} ${calc.unit}` : `${tx(calc.labelA,lang)}: —`}
        </div>
      </div>
    </div>
  )
}

/* ── RecistCalc ───────────────────────────────── */
function RecistCalc({ calc, lang }) {
  const [bl, setBl] = useState('')
  const [fu, setFu] = useState('')
  const [newLesion, setNewLesion] = useState(false)

  function getResponse() {
    const blN = parseFloat(bl)
    const fuN = parseFloat(fu)
    if (newLesion) return { resp: 'PD', color: '#dc2626', text: { de: 'PD – Progressive Disease (neue Läsion)', en: 'PD – Progressive Disease (new lesion)', fa: 'PD – پیشرفت بیماری (ضایعه جدید)' } }
    if (isNaN(blN) || blN <= 0 || isNaN(fuN) || fuN < 0) return null
    if (fuN === 0) return { resp: 'CR', delta: -100, color: '#16a34a', text: { de: 'CR – Complete Response', en: 'CR – Complete Response', fa: 'CR – پاسخ کامل' } }
    const delta = (fuN - blN) / blN * 100
    const abs   = fuN - blN
    const sign  = delta > 0 ? '+' : ''
    if (delta <= -30) return { resp: 'PR', delta, color: '#0ea5e9', text: { de: `PR – Partial Response (${delta.toFixed(1)} %)`, en: `PR – Partial Response (${delta.toFixed(1)}%)`, fa: `PR – پاسخ جزئی (${delta.toFixed(1)}٪)` } }
    if (delta >= 20 && abs >= 5) return { resp: 'PD', delta, color: '#dc2626', text: { de: `PD – Progressive Disease (+${delta.toFixed(1)} %)`, en: `PD – Progressive Disease (+${delta.toFixed(1)}%)`, fa: `PD – پیشرفت بیماری (+${delta.toFixed(1)}٪)` } }
    return { resp: 'SD', delta, color: '#ca8a04', text: { de: `SD – Stable Disease (${sign}${delta.toFixed(1)} %)`, en: `SD – Stable Disease (${sign}${delta.toFixed(1)}%)`, fa: `SD – بیماری پایدار (${sign}${delta.toFixed(1)}٪)` } }
  }

  const resp = getResponse()
  return (
    <>
      <div className={styles.rcFields}>
        <FieldRow id="bl" label={tx(calc.lbl.bl, lang)} val={bl}
          onChange={(_,v)=>setBl(v)} unit="mm" step={1} min={0} />
        <FieldRow id="fu" label={tx(calc.lbl.fu, lang)} val={fu}
          onChange={(_,v)=>setFu(v)} unit="mm" step={1} min={0} />
        <label className={styles.rcCheckRow}>
          <input type="checkbox" className={styles.rcCheck}
            checked={newLesion} onChange={e=>setNewLesion(e.target.checked)}/>
          <span>{tx(calc.lbl.newLesion, lang)}</span>
        </label>
      </div>
      <div className={styles.rcResult} style={{
        background: resp ? resp.color+'14' : '#f8fafc',
        borderColor: resp ? resp.color+'44' : '#eef2f7',
      }}>
        {resp ? (
          <>
            <span className={styles.recistBadge} style={{background: resp.color}}>{resp.resp}</span>
            <span className={styles.rcResultLabel} style={{color: resp.color, marginTop: 4}}>
              {tx(resp.text, lang)}
            </span>
          </>
        ) : <span className={styles.rcResultPlaceholder}>—</span>}
      </div>
    </>
  )
}

/* ── FleischnerCalc ───────────────────────────── */
function getFleischnerRec(type, size, risk, solidComp) {
  if (!size || isNaN(size) || size <= 0) return null
  if (type === 'solid') {
    if (size < 6) return risk === 'high'
      ? { color:'#ca8a04', text:{ de:'Optional: CT nach 12 Monaten.', en:'Optional: CT at 12 months.', fa:'اختیاری: CT پس از ۱۲ ماه.' } }
      : { color:'#16a34a', text:{ de:'Kein Routine-Follow-up empfohlen.', en:'No routine follow-up recommended.', fa:'پیگیری روتین توصیه نمی‌شود.' } }
    if (size <= 8) return risk === 'high'
      ? { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon., danach 18–24 Mon.', en:'CT at 6–12 m, then 18–24 m.', fa:'CT پس از ۶–۱۲ ماه، سپس ۱۸–۲۴ ماه.' } }
      : { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon.; bei stabilem Befund erneut 18–24 Mon.', en:'CT at 6–12 m; if stable, again at 18–24 m.', fa:'CT پس از ۶–۱۲ ماه؛ در صورت ثبات، مجدداً ۱۸–۲۴ ماه.' } }
    return { color:'#dc2626', text:{ de:'CT nach 3 Mon. oder PET/CT; Biopsie erwägen.', en:'CT at 3 m or PET/CT; consider tissue sampling.', fa:'CT پس از ۳ ماه یا PET/CT؛ نمونه‌برداری در نظر بگیرید.' } }
  }
  if (type === 'ggo') {
    if (size < 6) return { color:'#16a34a', text:{ de:'Kein Routine-Follow-up (GGO < 6 mm).', en:'No routine follow-up (GGO < 6 mm).', fa:'پیگیری روتین لازم نیست (GGO < ۶ mm).' } }
    return { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon. (Persistenz?); danach alle 2 J. × 5 J.', en:'CT at 6–12 m (persistence?); then every 2 y × 5 y.', fa:'CT پس از ۶–۱۲ ماه؛ سپس هر ۲ سال × ۵ سال.' } }
  }
  // partsolid
  if (size < 6) return { color:'#16a34a', text:{ de:'Kein Follow-up (Part-solid < 6 mm).', en:'No follow-up (part-solid < 6 mm).', fa:'پیگیری لازم نیست (نیمه‌جامد < ۶ mm).' } }
  if (!solidComp || isNaN(solidComp)) return { color:'#ca8a04', text:{ de:'CT nach 3–6 Mon. — bitte Solid-Anteil eingeben.', en:'CT at 3–6 m — please enter solid component size.', fa:'CT پس از ۳–۶ ماه — لطفاً اندازه جز جامد را وارد کنید.' } }
  if (solidComp < 6) return { color:'#ca8a04', text:{ de:'CT nach 3–6 Mon.; wenn stabil & Solid < 6 mm → jährl. CT × 5 J.', en:'CT at 3–6 m; if stable & solid < 6 mm → annual CT × 5 y.', fa:'CT پس از ۳–۶ ماه؛ اگر پایدار و جز جامد < ۶ mm → CT سالانه × ۵ سال.' } }
  return { color:'#ea580c', text:{ de:'CT nach 3–6 Mon.; Solid-Anteil ≥ 6 mm → CT/PET-CT/Biopsie.', en:'CT at 3–6 m; solid ≥ 6 mm → CT/PET-CT/biopsy.', fa:'CT پس از ۳–۶ ماه؛ جز جامد ≥ ۶ mm → CT/PET-CT/بیوپسی.' } }
}

function FleischnerCalc({ calc, lang }) {
  const [type, setType]       = useState('solid')
  const [size, setSize]       = useState('')
  const [risk, setRisk]       = useState('low')
  const [solidComp, setSolidComp] = useState('')
  const sizeNum = parseFloat(size)
  const solidNum = parseFloat(solidComp)
  const rec = getFleischnerRec(type, sizeNum, risk, solidNum)
  const showSolidComp = type === 'partsolid' && sizeNum >= 6

  return (
    <>
      <div className={styles.rcFields}>
        {/* Typ-Select */}
        <label className={styles.rcField}>
          <span className={styles.rcFieldLabel}>{tx(calc.lbl.nodeType, lang)}</span>
          <select className={styles.rcSelect} value={type} onChange={e=>setType(e.target.value)}>
            {calc.opts.type.map(o=>(
              <option key={o.v} value={o.v}>{tx(o.label, lang)}</option>
            ))}
          </select>
        </label>

        {/* Größe */}
        <FieldRow id="size" label={tx(calc.lbl.size, lang)} val={size}
          onChange={(_,v)=>setSize(v)} unit="mm" step={1} min={0} max={50} />

        {/* Risiko (nur Solid) */}
        {type === 'solid' && (
          <label className={styles.rcField}>
            <span className={styles.rcFieldLabel}>{tx(calc.lbl.risk, lang)}</span>
            <select className={styles.rcSelect} value={risk} onChange={e=>setRisk(e.target.value)}>
              {calc.opts.risk.map(o=>(
                <option key={o.v} value={o.v}>{tx(o.label, lang)}</option>
              ))}
            </select>
          </label>
        )}

        {/* Solid-Anteil (nur Part-solid ≥ 6mm) */}
        {showSolidComp && (
          <FieldRow id="solidComp" label={tx(calc.lbl.solidComp, lang)} val={solidComp}
            onChange={(_,v)=>setSolidComp(v)} unit="mm" step={1} min={0} max={50} />
        )}
      </div>

      <div className={styles.rcResult} style={{
        background: rec ? rec.color+'14' : '#f8fafc',
        borderColor: rec ? rec.color+'44' : '#eef2f7',
      }}>
        {rec ? (
          <span className={styles.rcFleischnerRec} style={{color: rec.color}}>
            {tx(rec.text, lang)}
          </span>
        ) : <span className={styles.rcResultPlaceholder}>Eingabe …</span>}
      </div>
    </>
  )
}
