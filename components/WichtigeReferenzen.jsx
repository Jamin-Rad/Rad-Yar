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
  'nierenverletzung': ['nierenverletzung', 'nierentrauma', 'kidney injury', 'kidney trauma', 'renal injury', 'renal trauma', 'niere trauma', 'nierenlazeration', 'kidney laceration', 'kidney grading', 'آسیب کلیه', 'ترومای کلیه'],
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
  mamma: '/fach/mamma.png',
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
    id: 'mamma',
    name: { de: 'Mamma', en: 'Breast', fa: 'پستان' },
    color: '#db2777', iconId: 'mamma',
    calcIds: ['birads-masse', 'birads-kalk', 'node-rads'],
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
  const [openCalcId, setOpenCalcId] = useState(calcs[0]?.id ?? null)

  function switchGroup(id) {
    setGroupId(id)
    setShowDetail(true)
    const grp = RECHNER_GROUPS.find(g => g.id === id)
    const first = grp?.calcIds[0]
    setOpenCalcId(first ?? null)
  }

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
              onClick={() => switchGroup(g.id)}>
              <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                <Image src={CALCULATOR_GROUP_LOGOS[g.id] || '/fach/technik.png'} alt="" width={30} height={30} className={styles.klassNavLogo} />
              </span>
              <span className={styles.navLabel}>{tx(g.name, lang)}</span>
            </button>
          ))}
        </nav>

        {/* Inhalt – Rechner der gewählten Gruppe als Akkordeon */}
        <div className={styles.content} style={{'--ref-color': group.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={`${styles.regionHeadingIcon} ${styles.klassTopicLogoWrap}`}>
              <Image src={CALCULATOR_GROUP_LOGOS[group.id] || '/fach/technik.png'} alt="" width={38} height={38} className={styles.klassTopicLogo} />
            </span>
            <span style={{color: group.color}}>{tx(group.name, lang)}</span>
          </h2>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {calcs.map(calc => (
              <RechnerCard
                key={calc.id}
                calc={calc}
                lang={lang}
                isOpen={openCalcId === calc.id}
                onToggle={() => setOpenCalcId(prev => prev === calc.id ? null : calc.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* ── Rechner-Karte (Akkordeon) ────────────────── */
function RechnerCard({ calc, lang, isOpen, onToggle }) {
  return (
    <div className={styles.rechnerCard} data-calc-id={calc.id} style={{'--rc': calc.color}}>
      {/* Akkordeon-Kopf – immer sichtbar, klickbar */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          width:'100%', background:'none', border:'none', cursor:'pointer',
          padding:0, textAlign:'left', gap:8,
        }}
        aria-expanded={isOpen}
      >
        <div style={{flex:1, minWidth:0}}>
          <div className={styles.rcName} style={{color: calc.color}}>{tx(calc.name, lang)}</div>
          {calc.formula && !isOpen && (
            <div className={styles.rcFormula} style={{marginTop:2}}>{calc.formula}</div>
          )}
        </div>
        <span style={{
          flexShrink:0, width:22, height:22, borderRadius:'50%',
          background: calc.color+'18', border:`1.5px solid ${calc.color}44`,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: calc.color, fontSize:14, fontWeight:700,
          transition:'transform 0.2s',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}>
          +
        </span>
      </button>

      {/* Akkordeon-Inhalt – nur wenn offen */}
      {isOpen && (
        <div style={{marginTop:14, borderTop:`1px solid ${calc.color}22`, paddingTop:14}}>
          {calc.formula && <div className={styles.rcFormula} style={{marginBottom:12}}>{calc.formula}</div>}

          {calc.type === 'single'       && <SingleCalc      calc={calc} lang={lang} />}
          {calc.type === 'multi'        && <MultiCalc       calc={calc} lang={lang} />}
          {calc.type === 'conversion'   && <ConversionCalc  calc={calc} lang={lang} />}
          {calc.type === 'recist'       && <RecistCalc      calc={calc} lang={lang} />}
          {calc.type === 'fleischner'   && <FleischnerCalc  calc={calc} lang={lang} />}
          {calc.type === 'birads-kalk'  && <BiRadsKalkCalc  calc={calc} lang={lang} />}
          {calc.type === 'birads-masse' && <BiRadsMasseCalc calc={calc} lang={lang} />}
          {calc.type === 'node-rads'    && <NodeRadsCalc    calc={calc} lang={lang} />}

          {calc.hint && <p className={styles.rcHint}>{tx(calc.hint, lang)}</p>}
        </div>
      )}
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

/* ── BiRadsMasseCalc ──────────────────────────── */
// ACR BI-RADS 5th Ed. – Masse in der Mammographie
// Form × Rand → BI-RADS 2–5; fetthaltig → immer BI-RADS 2
const BRM_MATRIX = {
  // [form][rand] → kategorie
  oval_rund: { circumscribed:'3', microlobulated:'4A', indistinct:'4B', angular:'4B', spiculated:'4C' },
  irregular: { circumscribed:'4A', microlobulated:'4B', indistinct:'4B', angular:'4C', spiculated:'5' },
}
const BRM_CAT_COLORS = { '2':'#16a34a','3':'#16a34a','4A':'#0891b2','4B':'#2563eb','4C':'#d97706','5':'#dc2626' }
const BRM_CAT_BG     = { '2':'#dcfce7','3':'#dcfce7','4A':'#cffafe','4B':'#dbeafe','4C':'#fef3c7','5':'#fee2e2' }
const BRM_INTERP = {
  '2':  { de:'Benigne · Keine weitere Abklärung',                    en:'Benign · No further workup',              fa:'خوش‌خیم · بدون بررسی بیشتر' },
  '3':  { de:'Wahrscheinlich benigne · Verlaufskontrolle 6 Mon.',    en:'Probably benign · Follow-up 6 mo',        fa:'احتمالاً خوش‌خیم · پیگیری ۶ ماهه' },
  '4A': { de:'Gering suspekt (2–10 %) · Biopsie erwägen',           en:'Low suspicion (2–10 %) · Consider biopsy', fa:'شک کم (۲–۱۰٪) · بیوپسی مد نظر' },
  '4B': { de:'Mäßig suspekt (10–50 %) · Biopsie empfohlen',         en:'Moderate suspicion (10–50 %) · Biopsy rec.', fa:'شک متوسط (۱۰–۵۰٪) · بیوپسی توصیه' },
  '4C': { de:'Stark suspekt (50–95 %) · Biopsie dringend empfohlen', en:'High suspicion (50–95 %) · Biopsy strongly rec.', fa:'شک زیاد (۵۰–۹۵٪) · بیوپسی اکید' },
  '5':  { de:'Hochgradig malignomverdächtig (> 95 %) · Biopsie obligat', en:'Highly suspicious (>95 %) · Biopsy mandatory', fa:'بسیار مشکوک (>۹۵٪) · بیوپسی اجباری' },
}
function BiRadsMasseCalc({ calc, lang }) {
  const [fat,   setFat]   = useState(false)
  const [shape, setShape] = useState('')
  const [rand,  setRand]  = useState('')
  const lbl = (obj) => obj[lang] || obj.de
  const result = fat ? '2' : (shape && rand ? BRM_MATRIX[shape]?.[rand] ?? null : null)
  const color  = result ? BRM_CAT_COLORS[result] : '#db2777'
  const bg     = result ? BRM_CAT_BG[result]     : 'var(--surface-soft)'
  const interp = result ? (BRM_INTERP[result][lang] || BRM_INTERP[result].de) : null

  const chipSt = (on) => ({
    padding:'6px 10px', borderRadius:8,
    border:`1.5px solid ${on ? color : 'var(--border)'}`,
    background: on ? color+'18' : 'var(--surface)',
    cursor:'pointer', fontSize:12, fontWeight: on ? 700 : 500,
    color: on ? color : 'var(--text)', transition:'all 0.12s',
    fontFamily:'var(--font-main)', textAlign:'left',
  })

  const SHAPES = [
    { k:'oval_rund', de:'Rund / Oval', en:'Round / Oval', fa:'گرد / بیضی' },
    { k:'irregular', de:'Irregulär',   en:'Irregular',    fa:'نامنظم' },
  ]
  const RAENDER = [
    { k:'circumscribed',  de:'Umschrieben',     en:'Circumscribed',  fa:'محدود' },
    { k:'microlobulated', de:'Mikrolobuliert',   en:'Microlobulated', fa:'میکرولوبوله' },
    { k:'indistinct',     de:'Unscharf',         en:'Indistinct',     fa:'نامشخص' },
    { k:'angular',        de:'Eckig',            en:'Angular',        fa:'زاویه‌دار' },
    { k:'spiculated',     de:'Spekuliert',       en:'Spiculated',     fa:'اسپیکوله' },
  ]

  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {/* Fetthaltig – Sonderfall */}
      <button type="button" onClick={()=>{setFat(f=>!f); if(!fat){setShape('');setRand('')}}}
        style={{...chipSt(fat), color: fat?'#16a34a':'var(--text)', border:`1.5px solid ${fat?'#16a34a':'var(--border)'}`, background: fat?'#dcfce718':'var(--surface)', display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:14,height:14,borderRadius:3,border:`2px solid ${fat?'#16a34a':'var(--border)'}`,background:fat?'#16a34a':'transparent',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {fat && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <span style={{fontSize:12,fontWeight:600}}>
          {lang==='fa'?'حاوی چربی':lang==='en'?'Fat-containing':'Fetthaltig'}
          <span style={{fontSize:11,fontWeight:400,marginLeft:6,opacity:0.7}}>→ BI-RADS 2</span>
        </span>
      </button>

      {!fat && (<>
        {/* Form */}
        <div>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
            {lang==='fa'?'شکل':lang==='en'?'Shape':'Form'}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5}}>
            {SHAPES.map(s=>(
              <button key={s.k} type="button" onClick={()=>setShape(s.k)} style={chipSt(shape===s.k)}>{lbl(s)}</button>
            ))}
          </div>
        </div>
        {/* Rand */}
        <div>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
            {lang==='fa'?'حاشیه':lang==='en'?'Margin':'Rand'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {RAENDER.map(r=>(
              <button key={r.k} type="button" onClick={()=>setRand(r.k)} style={chipSt(rand===r.k)}>{lbl(r)}</button>
            ))}
          </div>
        </div>
      </>)}

      {/* Ergebnis */}
      <div style={{background:bg,border:`1.5px solid ${result?color+'44':'var(--border)'}`,borderRadius:12,padding:'13px 16px',textAlign:'center',transition:'all 0.25s',minHeight:56,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        {result ? (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'1.6rem',fontWeight:700,color,lineHeight:1}}>{result}</div>
            <div style={{fontSize:11.5,color,fontWeight:600,marginTop:3,opacity:0.9}}>{interp}</div>
          </>
        ) : <span style={{color:'var(--text-muted)',fontSize:13}}>—</span>}
      </div>
      <div style={{fontSize:10,color:'var(--text-muted)'}}>ACR BI-RADS® Atlas, 5. Auflage</div>
    </div>
  )
}

/* ── BiRadsKalkCalc ───────────────────────────── */
const BIRKALK_MATRIX = {
  rund:           { diffus:'3', regional:'3', gruppiert:'3',  linear:'3',  segmental:'4B' },
  amorph:         { diffus:'3', regional:'3', gruppiert:'4B', linear:'4B', segmental:'4B' },
  grob_heterogen: { diffus:'3', regional:'3', gruppiert:'4A', linear:'4B', segmental:'4B' },
  fein_pleomorph: { diffus:'4B',regional:'4B',gruppiert:'4C', linear:'4C', segmental:'4C' },
  fein_linear:    { diffus:'4C',regional:'4B',gruppiert:'4C', linear:'5',  segmental:'5'  },
}
const BIRKALK_MORPHS = [
  { k:'rund',           de:'Rund / oval',            en:'Round / oval',          fa:'گرد / بیضی' },
  { k:'amorph',         de:'Amorph',                 en:'Amorphous',             fa:'بی‌شکل' },
  { k:'grob_heterogen', de:'Grob heterogen',          en:'Coarse heterogeneous',  fa:'ناهمگن درشت' },
  { k:'fein_pleomorph', de:'Fein pleomorph',          en:'Fine pleomorphic',      fa:'پلئومورف ریز' },
  { k:'fein_linear',    de:'Fein linear / verzweigt', en:'Fine linear/branching', fa:'خطی ریز / شاخه‌دار' },
]
const BIRKALK_DISTS = [
  { k:'diffus',    de:'Diffus',    en:'Diffuse',   fa:'منتشر' },
  { k:'regional',  de:'Regional',  en:'Regional',  fa:'ناحیه‌ای' },
  { k:'gruppiert', de:'Gruppiert', en:'Grouped',   fa:'گروهی' },
  { k:'linear',    de:'Linear',    en:'Linear',    fa:'خطی' },
  { k:'segmental', de:'Segmental', en:'Segmental', fa:'سگمنتال' },
]
const BIRKALK_CATS = ['3','4A','4B','4C','5']
const BIRKALK_COLORS = { '3':'#16a34a','4A':'#0891b2','4B':'#2563eb','4C':'#d97706','5':'#dc2626' }
const BIRKALK_INTERP = {
  '3':  { de:'< 2 % · Verlaufskontrolle 6 Mon.',   en:'< 2 % · Follow-up 6 mo',         fa:'< ۲٪ · پیگیری ۶ ماهه' },
  '4A': { de:'2–10 % · Biopsie erwägen',            en:'2–10 % · Consider biopsy',        fa:'۲–۱۰٪ · بیوپسی بررسی شود' },
  '4B': { de:'10–50 % · Biopsie empfohlen',         en:'10–50 % · Biopsy recommended',    fa:'۱۰–۵۰٪ · بیوپسی توصیه' },
  '4C': { de:'50–95 % · Biopsie dringend',          en:'50–95 % · Biopsy strongly rec.',  fa:'۵۰–۹۵٪ · بیوپسی اکید' },
  '5':  { de:'> 95 % · Biopsie obligat',            en:'> 95 % · Biopsy mandatory',       fa:'> ۹۵٪ · بیوپسی اجباری' },
}
const BIRKALK_MODS = [
  { k:'masse',       up:true,  de:'↑ Masse / Architekturstörung', en:'↑ Mass / Arch. distortion',  fa:'↑ توده / اختلال معماری' },
  { k:'alter',       up:true,  de:'↑ Alter / Anamnese',           en:'↑ Age / Personal history',   fa:'↑ سن / سابقه' },
  { k:'groesse',     up:true,  de:'Herd ≥ 15 mm',                 en:'Cluster ≥ 15 mm',            fa:'اندازه ≥ ۱۵ mm' },
  { k:'stabilitaet', up:false, de:'↓ Stabilität ≥ 2 J.',          en:'↓ Stability ≥ 2 yrs',       fa:'↓ پایداری ≥ ۲ سال' },
]
function BiRadsKalkCalc({ calc, lang }) {
  const [morph, setMorph] = useState('')
  const [dist,  setDist]  = useState('')
  const [mods,  setMods]  = useState({masse:false,alter:false,groesse:false,stabilitaet:false})
  const base = morph && dist ? BIRKALK_MATRIX[morph][dist] : null
  const result = base ? (() => {
    let idx = BIRKALK_CATS.indexOf(base)
    if (mods.masse)       idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.alter)       idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.groesse)     idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.stabilitaet) idx = Math.max(idx-1, 0)
    return BIRKALK_CATS[idx]
  })() : null
  const color = result ? BIRKALK_COLORS[result] : '#db2777'
  const interp = result ? (BIRKALK_INTERP[result][lang] || BIRKALK_INTERP[result].de) : null
  const modified = result && base && result !== base
  const lbl = (obj) => obj[lang] || obj.de
  const toggleMod = (k) => setMods(p => ({...p,[k]:!p[k]}))
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {/* Selects */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label style={{display:'flex',flexDirection:'column',gap:4,fontSize:11,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'var(--text-muted)'}}>
          {lang==='fa'?'مورفولوژی':lang==='en'?'Morphology':'Morphologie'}
          <select value={morph} onChange={e=>setMorph(e.target.value)} className={styles.rcInput} style={{padding:'7px 10px',height:'auto',fontSize:12.5,fontWeight:400,background:'var(--surface)',color:'var(--text)',border:'1.5px solid var(--border)',borderRadius:10,cursor:'pointer',textTransform:'none',letterSpacing:0}}>
            <option value="">—</option>
            {BIRKALK_MORPHS.map(m=><option key={m.k} value={m.k}>{lbl(m)}</option>)}
          </select>
        </label>
        <label style={{display:'flex',flexDirection:'column',gap:4,fontSize:11,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'var(--text-muted)'}}>
          {lang==='fa'?'توزیع':lang==='en'?'Distribution':'Verteilung'}
          <select value={dist} onChange={e=>setDist(e.target.value)} className={styles.rcInput} style={{padding:'7px 10px',height:'auto',fontSize:12.5,fontWeight:400,background:'var(--surface)',color:'var(--text)',border:'1.5px solid var(--border)',borderRadius:10,cursor:'pointer',textTransform:'none',letterSpacing:0}}>
            <option value="">—</option>
            {BIRKALK_DISTS.map(d=><option key={d.k} value={d.k}>{lbl(d)}</option>)}
          </select>
        </label>
      </div>
      {/* Result */}
      <div style={{background: result ? color+'14' : 'var(--surface-soft)', border:`1.5px solid ${result ? color+'44' : 'var(--border)'}`, borderRadius:12, padding:'14px 16px', textAlign:'center', transition:'all 0.25s'}}>
        {result ? (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:700,color,lineHeight:1}}>{result}</div>
            <div style={{fontSize:12,color,fontWeight:600,marginTop:4,opacity:0.85}}>{interp}</div>
            {modified && <div style={{fontSize:10.5,color:'var(--text-muted)',marginTop:4,fontStyle:'italic'}}>Basis: BI-RADS {base}</div>}
          </>
        ) : (
          <span style={{color:'var(--text-muted)',fontSize:13}}>—</span>
        )}
      </div>
      {/* Modifiers */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
        {BIRKALK_MODS.map(m=>(
          <button key={m.k} type="button" onClick={()=>toggleMod(m.k)}
            style={{display:'flex',alignItems:'center',gap:6,padding:'7px 10px',border:`1.5px solid ${mods[m.k]?'#db2777':'var(--border)'}`,borderRadius:10,background:mods[m.k]?'#fdf2f8':'var(--surface)',cursor:'pointer',textAlign:'left',fontFamily:'var(--font-main)',transition:'all 0.15s'}}>
            <span style={{width:14,height:14,borderRadius:4,border:`2px solid ${mods[m.k]?'#db2777':'var(--border)'}`,background:mods[m.k]?'#db2777':'transparent',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {mods[m.k] && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
            <span style={{fontSize:11,fontWeight:600,color:'var(--text)',flex:1,lineHeight:1.3}}>{lbl(m)}</span>
            <span style={{fontSize:10,fontWeight:800,padding:'1px 5px',borderRadius:5,background:m.up?'#fee2e2':'#dcfce7',color:m.up?'#b91c1c':'#15803d'}}>{m.up?'+1':'−1'}</span>
          </button>
        ))}
      </div>
      {/* Ref */}
      <div style={{fontSize:10,color:'var(--text-muted)',marginTop:2}}>Youk et al. Korean J Radiol 2019 · Rominger et al. RöFo 2012</div>
    </div>
  )
}

/* ── NodeRadsCalc ─────────────────────────────── */
// Scoring per Elsholtz et al. Eur Radiol 2021
// Size: normal (<10mm SAx) / enlarged / bulk (≥30mm)
// Config: texture(0-3) + border(0-1) + shape(0-1) = 0-5
// Final: normal+0→1, normal+1→2, normal+2-3→3, normal+4-5→4
//        enlarged+0→2, enlarged+1-2→3, enlarged+3-4→4, enlarged+5→5
//        bulk→5
const NR_CATS = [
  { v:1, de:'1 — Sehr niedrig',   en:'1 — Very low',    fa:'۱ — بسیار پایین',   color:'#16a34a', bg:'#dcfce7', risk:'< 5 %',    action:{ de:'Keine weitere Abklärung',              en:'No further workup',              fa:'بدون بررسی بیشتر' } },
  { v:2, de:'2 — Niedrig',        en:'2 — Low',         fa:'۲ — پایین',          color:'#0891b2', bg:'#cffafe', risk:'5–15 %',   action:{ de:'Verlaufskontrolle erwägen',            en:'Consider follow-up',             fa:'پیگیری مد نظر' } },
  { v:3, de:'3 — Äquivokal',      en:'3 — Equivocal',   fa:'۳ — مبهم',           color:'#ca8a04', bg:'#fef9c3', risk:'15–50 %',  action:{ de:'Zusatzdiagnostik / klinische Korrelation', en:'Additional workup / correlation', fa:'ارزیابی بیشتر' } },
  { v:4, de:'4 — Hoch',           en:'4 — High',        fa:'۴ — بالا',           color:'#d97706', bg:'#fef3c7', risk:'50–85 %',  action:{ de:'Biopsie empfohlen',                   en:'Biopsy recommended',             fa:'بیوپسی توصیه' } },
  { v:5, de:'5 — Sehr hoch',      en:'5 — Very high',   fa:'۵ — بسیار بالا',    color:'#dc2626', bg:'#fee2e2', risk:'> 85 %',   action:{ de:'Biopsie obligat',                     en:'Biopsy mandatory',               fa:'بیوپسی اجباری' } },
]
function nodeRadsScore(size, tex, border, shape) {
  if (!size) return null
  const cfg = tex + border + shape
  if (size === 'bulk') return 5
  if (size === 'normal') {
    if (cfg === 0) return 1
    if (cfg === 1) return 2
    if (cfg <= 3) return 3
    return 4
  }
  // enlarged
  if (cfg === 0) return 2
  if (cfg <= 2) return 3
  if (cfg <= 4) return 4
  return 5
}
function NodeRadsCalc({ calc, lang }) {
  const [size,   setSize]   = useState('')
  const [tex,    setTex]    = useState(null)
  const [border, setBorder] = useState(null)
  const [shape,  setShape]  = useState(null)
  const ready = size && tex !== null && border !== null && shape !== null
  const score = ready ? nodeRadsScore(size, tex, border, shape) : null
  const cat   = score ? NR_CATS.find(c => c.v === score) : null
  const cfg   = (tex ?? 0) + (border ?? 0) + (shape ?? 0)
  const lbl   = (obj) => (obj && (obj[lang] || obj.de)) || ''

  const SIZES = [
    { k:'normal',   de:'Normal (Kurzachse < 10 mm)',    en:'Normal (SAx < 10 mm)',       fa:'طبیعی (محور کوتاه < ۱۰ mm)' },
    { k:'enlarged', de:'Vergrößert (10–29 mm)',          en:'Enlarged (10–29 mm)',         fa:'بزرگ‌شده (۱۰–۲۹ mm)' },
    { k:'bulk',     de:'Bulk (≥ 30 mm)',                 en:'Bulk (≥ 30 mm)',             fa:'توده (≥ ۳۰ mm)' },
  ]
  const TEX_OPTS = [
    { v:0, de:'Homogen',              en:'Homogeneous',        fa:'همگن' },
    { v:1, de:'Heterogen',            en:'Heterogeneous',      fa:'ناهمگن' },
    { v:2, de:'Fokale Nekrose',       en:'Focal necrosis',     fa:'نکروز کانونی' },
    { v:3, de:'Makroskop. Nekrose',   en:'Macroscopic necrosis', fa:'نکروز ماکروسکوپی' },
  ]
  const chipStyle = (selected, color='#7c3aed') => ({
    padding:'5px 10px', borderRadius:8, border:`1.5px solid ${selected?color:'var(--border)'}`,
    background: selected ? color+'18' : 'var(--surface)', cursor:'pointer',
    fontSize:11.5, fontWeight: selected?700:500, color: selected?color:'var(--text)',
    transition:'all 0.12s', fontFamily:'var(--font-main)',
  })

  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {/* Size */}
      <div>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
          {lang==='fa'?'اندازه':lang==='en'?'Size':'Größe (Kurzachse)'}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:4}}>
          {SIZES.map(s=>(
            <button key={s.k} type="button" onClick={()=>setSize(s.k)} style={chipStyle(size===s.k)}>
              {lbl(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration — only show if not bulk */}
      {size && size !== 'bulk' && (
        <>
          {/* Texture */}
          <div>
            <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
              {lang==='fa'?'بافت':lang==='en'?'Texture':'Textur'}
              <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',marginLeft:4,opacity:0.7}}>(0–3)</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
              {TEX_OPTS.map(o=>(
                <button key={o.v} type="button" onClick={()=>setTex(o.v)} style={chipStyle(tex===o.v)}>
                  <span style={{fontSize:10,fontWeight:700,marginRight:4,opacity:0.6}}>+{o.v}</span>{lbl(o)}
                </button>
              ))}
            </div>
          </div>
          {/* Border */}
          <div>
            <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
              {lang==='fa'?'حاشیه':lang==='en'?'Border':'Rand'}
              <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',marginLeft:4,opacity:0.7}}>(0–1)</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
              {[{v:0,de:'Glatt',en:'Smooth',fa:'صاف'},{v:1,de:'Unregelmäßig',en:'Irregular',fa:'نامنظم'}].map(o=>(
                <button key={o.v} type="button" onClick={()=>setBorder(o.v)} style={chipStyle(border===o.v)}>
                  <span style={{fontSize:10,fontWeight:700,marginRight:4,opacity:0.6}}>+{o.v}</span>{lbl(o)}
                </button>
              ))}
            </div>
          </div>
          {/* Shape */}
          <div>
            <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
              {lang==='fa'?'شکل':lang==='en'?'Shape':'Form'}
              <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',marginLeft:4,opacity:0.7}}>(0–1)</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
              {[{v:0,de:'Oval / Fetthilus',en:'Oval / fatty hilum',fa:'بیضی / هیلوس چربی'},{v:1,de:'Rund, kein Hilus',en:'Spherical, no hilum',fa:'کروی، بدون هیلوس'}].map(o=>(
                <button key={o.v} type="button" onClick={()=>setShape(o.v)} style={chipStyle(shape===o.v)}>
                  <span style={{fontSize:10,fontWeight:700,marginRight:4,opacity:0.6}}>+{o.v}</span>{lbl(o)}
                </button>
              ))}
            </div>
          </div>
          {/* Config sum badge */}
          {tex !== null && border !== null && shape !== null && (
            <div style={{fontSize:11,color:'var(--text-muted)',textAlign:'right'}}>
              {lang==='fa'?'مجموع کانفیگ':lang==='en'?'Config total':'Konfig.-Summe'}: <strong style={{color:'#7c3aed'}}>{cfg}/5</strong>
            </div>
          )}
        </>
      )}

      {/* Result */}
      <div style={{background: cat ? cat.color+'14' : 'var(--surface-soft)', border:`1.5px solid ${cat ? cat.color+'44' : 'var(--border)'}`, borderRadius:12, padding:'14px 16px', textAlign:'center', transition:'all 0.25s', minHeight:64, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        {cat ? (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'1.75rem',fontWeight:700,color:cat.color,lineHeight:1}}>{cat.v}</div>
            <div style={{fontSize:11.5,color:cat.color,fontWeight:700,marginTop:3}}>{lbl(cat)}</div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginTop:3}}>
              {lang==='fa'?'خطر':lang==='en'?'Risk':'Risiko'}: {cat.risk} · {lbl(cat.action)}
            </div>
          </>
        ) : (
          <span style={{color:'var(--text-muted)',fontSize:13}}>—</span>
        )}
      </div>
      {/* Ref */}
      <div style={{fontSize:10,color:'var(--text-muted)',marginTop:2}}>Elsholtz et al. · Eur Radiol · 2021</div>
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
