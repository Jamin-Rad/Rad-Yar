'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import Link from 'next/link'
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
  'boston-v2': ['boston', 'burson', 'CAA', 'amyloidangiopathie', 'cerebral amyloid angiopathy', 'بوستون'],
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
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('ref') === 'anatomie') setModal('anatomie')
    if (params.get('ref') === 'messwerte') setModal('messwerte')
    if (params.get('ref') === 'klassifikationen') setModal('klassifikationen')
    if (params.get('ref') === 'rechner') {
      const calc = params.get('calc')
      const language = params.get('lang')
      router.replace(`/rechner${calc ? `/${encodeURIComponent(calc)}` : ''}${language ? `?lang=${encodeURIComponent(language)}` : ''}`)
    }
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
      if (modalId === 'rechner') {
        router.push(`/rechner?lang=${lang}`)
        return
      }
      if (['anatomie', 'messwerte', 'klassifikationen'].includes(modalId)) {
        setModal(modalId)
      }
    }
    window.addEventListener('radyar:open-reference-modal', openReferenceModal)
    return () => window.removeEventListener('radyar:open-reference-modal', openReferenceModal)
  }, [router, lang])

  if (mode === 'modals') {
    return (
      <>
        {modal==='anatomie'        && <AnatomieModal        copy={copy} lang={lang} onClose={()=>setModal(null)} />}
        {modal==='messwerte'       && <MesswerteModal       copy={copy} lang={lang} onClose={()=>setModal(null)} />}
        {modal==='klassifikationen'&& <KlassifikationenModal copy={copy} lang={lang} onClose={()=>setModal(null)} />}
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
          <Link className={`${styles.card} ${styles.cardGreen}`} href={`/rechner?lang=${lang}`}>
            <HomeCardIcon type="rechner" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorGreen}`}>{copy.btnRechner}</h3>
            <p className={styles.cardDesc}>{copy.btnRechnerSub}</p>
            <div className={styles.chips}>{(copy.chipsRechner||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipGreen}`}>{ch}</span>)}</div>
          </Link>
        </div>
      </div>

      {modal==='anatomie'        && <AnatomieModal        copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='messwerte'       && <MesswerteModal       copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='klassifikationen'&& <KlassifikationenModal copy={copy} lang={lang} onClose={()=>setModal(null)} />}
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
function getAnatomyTopicItems(topic) {
  if (topic.groups) return topic.groups.flatMap(group => group.items)
  return topic.items || []
}

function centerAnatomyZoom(node) {
  if (!node) return
  node.scrollLeft = Math.max(0, (node.scrollWidth - node.clientWidth) / 2)
  node.scrollTop = Math.max(0, (node.scrollHeight - node.clientHeight) / 2)
}

function AnatomieModal({ copy, lang, onClose }) {
  const topics = REF_DATA.anatomie
  const [topicId, setTopicId] = useState(topics[0].id)
  const [itemId, setItemId] = useState(getAnatomyTopicItems(topics[0])[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const [zoomImage, setZoomImage] = useState(null)
  const topic = topics.find(item => item.id === topicId) || topics[0]
  const topicItems = getAnatomyTopicItems(topic)
  const item = topicItems.find(anatomyItem => anatomyItem.id === itemId) || topicItems[0]
  const itemGroup = topic.groups?.find(group => group.items.some(groupItem => groupItem.id === item.id))

  const selectTopic = nextTopic => {
    setTopicId(nextTopic.id)
    setItemId(getAnatomyTopicItems(nextTopic)[0].id)
    setShowDetail(true)
  }

  const selectItem = (nextTopic, nextItem) => {
    setTopicId(nextTopic.id)
    setItemId(nextItem.id)
    setShowDetail(true)
  }

  return (
    <Modal
      title={copy.btnAnatomie}
      subtitle={showDetail ? tx(topic.name, lang) : null}
      accent={topic.color}
      copy={copy}
      onClose={onClose}
      accentClass={styles.headPurple}
      wide
      showDisclaimer={false}
    >
      <div className={`${styles.split} ${showDetail ? styles.showDetail : ''}`}>
        <nav className={`${styles.sidebar} ${styles.anatomySidebar}`} aria-label={copy.chooseTopic}>
          {topics.map(anatomyTopic => {
            const isActiveTopic = anatomyTopic.id === topicId
            const groups = anatomyTopic.groups || [{ id: `${anatomyTopic.id}-items`, name: null, items: anatomyTopic.items }]
            return (
              <div key={anatomyTopic.id} className={styles.anatomyNavSection} style={{ '--ref-color': anatomyTopic.color }}>
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.klassNavBtn} ${isActiveTopic ? styles.navActivePurple : ''}`}
                  onClick={() => selectTopic(anatomyTopic)}
                  aria-expanded={isActiveTopic}
                >
                  <span className={`${styles.navIconWrap} ${styles.klassNavLogoWrap}`}>
                    <Image src={anatomyTopic.icon} alt="" width={30} height={30} className={styles.klassNavLogo} />
                  </span>
                  <span className={styles.klassNavText}>
                    <span className={styles.navLabel}>{tx(anatomyTopic.name, lang)}</span>
                  </span>
                  <span className={`${styles.klassNavArrow} ${isActiveTopic ? styles.anatomyNavArrowOpen : ''}`} aria-hidden="true">›</span>
                </button>

                {isActiveTopic && (
                  <div className={styles.anatomySubnav}>
                    {groups.map(group => (
                      <div key={group.id} className={styles.anatomySubnavGroup}>
                        {group.name && <span className={styles.anatomySubnavLabel}>{tx(group.name, lang)}</span>}
                        {group.items.map(groupItem => (
                          <button
                            key={groupItem.id}
                            type="button"
                            className={`${styles.anatomyItemNavBtn} ${groupItem.id === item.id ? styles.anatomyItemNavBtnActive : ''}`}
                            onClick={() => selectItem(anatomyTopic, groupItem)}
                          >
                            <span className={styles.anatomyItemNavMarker} aria-hidden="true" />
                            <span>{tx(groupItem.title, lang)}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <article className={`${styles.content} ${styles.anatomyContent}`} style={{ '--ref-color': topic.color }}>
          <button type="button" className={styles.mobileBack} onClick={() => setShowDetail(false)}>← {copy.back}</button>
          <div className={styles.anatomyTopicHead}>
            <div>
              <span className={styles.anatomyTopicLabel}>
                {tx(topic.name, lang)}{itemGroup ? ` · ${tx(itemGroup.name, lang)}` : ''}
              </span>
              <h2>{tx(item.title, lang)}</h2>
              <p>{tx(item.lead, lang)}</p>
            </div>
          </div>

          <div className={`${styles.anatomyDetailGrid} ${item.imageLayout === 'wide' ? styles.anatomyDetailGridWide : ''}`}>
            <figure className={styles.anatomyFigure}>
              <button
                type="button"
                className={styles.anatomyFigureButton}
                onClick={() => setZoomImage(item)}
                aria-label={`${copy.zoomImage}: ${tx(item.imageAlt, lang)}`}
              >
                <Image
                  src={item.image}
                  alt={tx(item.imageAlt, lang)}
                  width={item.imageWidth || 1122}
                  height={item.imageHeight || 1402}
                  className={styles.anatomyFigureImage}
                  style={item.imageWidth ? { aspectRatio: `${item.imageWidth} / ${item.imageHeight}` } : undefined}
                  sizes={item.imageLayout === 'wide' ? '(max-width: 640px) 100vw, 850px' : '(max-width: 640px) 100vw, 430px'}
                  priority
                />
                <span className={styles.anatomyZoomIcon} aria-hidden="true">⌕</span>
              </button>

              {(item.imageCaption || item.imageCredit) && (
                <figcaption className={styles.anatomyFigureCaption}>
                  {item.imageCaption && <p>{tx(item.imageCaption, lang)}</p>}
                  {item.imageCredit && (
                    <p>
                      {item.imageCredit.authors} · <a href={item.imageCredit.sourceUrl} target="_blank" rel="noopener noreferrer">{tx(item.imageCredit.label, lang)}</a>
                      {' · '}<a href={item.imageCredit.licenseUrl} target="_blank" rel="noopener noreferrer">{item.imageCredit.licenseLabel}</a>
                    </p>
                  )}
                </figcaption>
              )}
            </figure>

            <div className={styles.anatomyNotes}>
              <ol className={styles.anatomyPointList}>
                {item.points.map(point => (
                  <li key={point.number} className={styles.anatomyPoint}>
                    {point.color ? (
                      <span className={styles.anatomyPointSwatch} style={{ backgroundColor: point.color }} aria-hidden="true" />
                    ) : (
                      <span className={styles.anatomyPointNumber}>{point.number}</span>
                    )}
                    <span>
                      <strong>{tx(point.title, lang)}</strong>
                      <small>{tx(point.text, lang)}</small>
                    </span>
                  </li>
                ))}
              </ol>
              <aside className={styles.anatomyClinicalNote}>
                <span className={styles.anatomyClinicalIcon} aria-hidden="true">i</span>
                <span>
                  <strong>{tx(item.clinicalTitle, lang)}</strong>
                  <small>{tx(item.clinicalNote, lang)}</small>
                  {item.source && (
                    <small>
                      <a href={item.source.url} target="_blank" rel="noopener noreferrer">{item.source.label}</a>
                    </small>
                  )}
                </span>
              </aside>
              {topic.source && (
                <a className={styles.anatomySource} href={topic.source.url} target="_blank" rel="noreferrer">
                  {copy.reference}: {topic.source.label}
                </a>
              )}
            </div>
          </div>
        </article>
      </div>

      {zoomImage && (
        <div className={styles.measurementZoomBackdrop} role="presentation" onClick={() => setZoomImage(null)}>
          <button type="button" className={styles.measurementZoomClose} onClick={() => setZoomImage(null)} aria-label={copy.close}>×</button>
          <div
            className={zoomImage.imageLayout === 'wide' ? styles.anatomyReferenceZoom : undefined}
            ref={zoomImage.imageLayout === 'wide' ? centerAnatomyZoom : undefined}
            onClick={event => event.stopPropagation()}
            tabIndex={zoomImage.imageLayout === 'wide' ? 0 : undefined}
            role={zoomImage.imageLayout === 'wide' ? 'region' : undefined}
            aria-label={zoomImage.imageLayout === 'wide' ? tx(zoomImage.imageAlt, lang) : undefined}
          >
            <Image
              src={zoomImage.image}
              alt={tx(zoomImage.imageAlt, lang)}
              width={zoomImage.imageWidth || 1122}
              height={zoomImage.imageHeight || 1402}
              className={`${styles.measurementZoomImage} ${styles.anatomyZoomImage}`}
              sizes="96vw"
            />
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

function MeasurementFigure({ image, lang, zoomLabel, onZoom }) {
  return (
    <figure data-no-zoom className={`${styles.measurementImageFigure} ${image.layout === 'wide' ? styles.measurementImageFigureWide : ''}`}>
      <button
        type="button"
        className={styles.measurementImageButton}
        onClick={() => onZoom(image)}
        aria-label={`${zoomLabel}: ${tx(image.alt, lang)}`}
      >
        <Image
          src={image.src}
          alt={tx(image.alt, lang)}
          width={image.width || 1448}
          height={image.height || 1086}
          className={styles.measurementImage}
          sizes={image.layout === 'wide' ? '(max-width: 640px) 100vw, 850px' : '240px'}
        />
        <span>{zoomLabel}</span>
      </button>
    </figure>
  )
}

function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const [zoomImage, setZoomImage] = useState(null)
  const region = regions.find(r=>r.id===regionId) || regions[0]
  return (
    <Modal title={copy.btnMesswerte} subtitle={showDetail?tx(region.name,lang):null} accent={region.color}
      copy={copy} onClose={onClose} accentClass={styles.headBlue} wide={region.groups.some(group => group.image?.layout === 'wide')}>
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
              {group.image?.layout === 'wide' && (
                <MeasurementFigure image={group.image} lang={lang} zoomLabel={copy.zoomImage} onZoom={setZoomImage} />
              )}
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
                      <td className={styles.tdVal}>{tx(e.v, lang)}</td>
                      <td className={styles.tdNote}>
                        <MeasurementText value={e.h} lang={lang} />
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              {(group.note || group.source || group.image) && (
                <div className={`${styles.measurementFootnotes} ${group.image && group.image.layout !== 'wide' ? styles.measurementFootnotesWithImage : ''}`}>
                  {group.image && group.image.layout !== 'wide' && (
                    <MeasurementFigure image={group.image} lang={lang} zoomLabel={copy.zoomImage} onZoom={setZoomImage} />
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
          <div
            data-no-zoom
            className={zoomImage.layout === 'wide' ? styles.anatomyReferenceZoom : undefined}
            ref={zoomImage.layout === 'wide' ? centerAnatomyZoom : undefined}
            onClick={event => event.stopPropagation()}
            tabIndex={zoomImage.layout === 'wide' ? 0 : undefined}
            role={zoomImage.layout === 'wide' ? 'region' : undefined}
            aria-label={zoomImage.layout === 'wide' ? tx(zoomImage.alt, lang) : undefined}
          >
            <Image
              src={zoomImage.src}
              alt={tx(zoomImage.alt, lang)}
              width={zoomImage.width || 1448}
              height={zoomImage.height || 1086}
              className={zoomImage.layout === 'wide' ? styles.anatomyZoomImage : styles.measurementZoomImage}
              sizes={zoomImage.layout === 'wide' ? '1200px' : '96vw'}
            />
          </div>
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
