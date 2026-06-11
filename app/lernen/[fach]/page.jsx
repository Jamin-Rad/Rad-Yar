'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: { back:'← Startseite', search:'Thema suchen…', readNow:'Artikel öffnen', noResult:'Kein Treffer für', themen:'Themen', available:'Verfügbar', read:'Gelesen', all:'Alle', mcq:'MCQ', flash:'Flashcards', fall:'Fallbeispiele', building:'Geplant', emptyAvailable:'In diesem Fachgebiet ist noch kein Thema freigeschaltet.', emptyRead:'Du hast in diesem Fachgebiet noch nichts als gelesen markiert.', emptyAllFach:'Dieses Fachgebiet ist noch im Aufbau – schau bald wieder vorbei.', showAll:'Alle Themen anzeigen', lessonsTitle:'Hauptthemen', lessonsLead:'Thema wählen und Lektionen öffnen', close:'Schließen' },
  en: { back:'← Home', search:'Search topic…', readNow:'Open article', noResult:'No results for', themen:'Topics', available:'Available', read:'Read', all:'All', mcq:'MCQ', flash:'Flashcards', fall:'Cases', building:'Planned', emptyAvailable:'No topics are unlocked in this specialty yet.', emptyRead:"You haven't marked anything as read in this specialty yet.", emptyAllFach:'This specialty is still being built – check back soon.', showAll:'Show all topics', lessonsTitle:'Main topics', lessonsLead:'Choose a topic and open its lessons', close:'Close' },
  fa: { back:'← خانه', search:'جستجوی موضوع…', readNow:'مطالعه کنید', noResult:'نتیجه‌ای برای', themen:'موضوع', available:'موجود', read:'خوانده‌شده', all:'همه', mcq:'MCQ', flash:'فلش‌کارت', fall:'کیس', building:'برنامه‌ریزی‌شده', emptyAvailable:'هنوز موضوعی در این تخصص فعال نشده.', emptyRead:'هنوز چیزی را در این تخصص خوانده‌شده علامت نزده‌ای.', emptyAllFach:'این تخصص هنوز در حال آماده‌سازی است – بزودی برمی‌گردیم.', showAll:'نمایش همه موضوعات', lessonsTitle:'موضوعات اصلی', lessonsLead:'موضوع را انتخاب کنید و درس‌ها را ببینید', close:'بستن' },
}

// Gruppiert Themen anhand thema.group (Reihenfolge wie in den Daten):
// aufeinanderfolgende Themen mit derselben group-Breadcrumb bilden einen
// Abschnitt mit neutraler Sub-Überschrift; Themen ohne group laufen ohne
// Header in der Original-Reihenfolge.
function groupThemen(themen) {
  const sections = []
  let current = null
  for (const th of themen) {
    const key = th.group ? th.group.join(' / ') : ''
    if (!current || current.key !== key) {
      current = { key, items: [] }
      sections.push(current)
    }
    current.items.push(th)
  }
  return sections
}

function withoutLeadingNumber(title) {
  return title.replace(/^[\d\u06F0-\u06F9\u0660-\u0669]+[.)،.]?\s*/, '')
}

function MskChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const icons = {
    'msk-anatomie': <><path d="M17 9c3-3 6 0 7 3 1-3 4-6 7-3s1 7-2 9l-10 12c-3 3-7 1-7-3 0-2 1-3 3-5-3-1-5-5-2-8 1-1 2-2 4-1 0-2-1-3 0-4Z"/><path d="m19 19 10 10"/></>,
    'msk-modalitaeten': <><rect x="9" y="8" width="30" height="27" rx="5"/><circle cx="24" cy="21.5" r="8"/><circle cx="24" cy="21.5" r="3"/><path d="M17 40h14M24 35v5"/></>,
    'msk-knochentumoren': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><circle cx="28" cy="24" r="5"/><path d="M28 21v6M25 24h6"/></>,
    'msk-weichteiltumoren': <><path d="M10 25c0-9 6-15 14-15s14 6 14 15-6 14-14 14-14-5-14-14Z"/><circle cx="20" cy="21" r="3"/><circle cx="29" cy="27" r="4"/><path d="M13 31c5-3 8 2 12 0s6-7 11-4"/></>,
    'msk-knocheninfektionen': <><path d="M17 9c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><circle cx="31" cy="30" r="2"/><path d="m31 25 1-3m3 5 3-1m-4 7 2 3m-8-3-2 3"/></>,
    'msk-metabolisch': <><path d="M18 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="M10 39h28M13 35h22M17 31h14"/></>,
    'msk-arthritiden': <><path d="M12 18h10l4 5 4-5h6M12 30h10l4-5 4 5h6"/><circle cx="26" cy="24" r="6"/><path d="m26 11 1-4m9 8 3-3m-23 3-3-3m23 21 3 3m-23-3-3 3"/></>,
    'msk-knochennekrosen': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="m23 20 7 7m0-7-7 7"/></>,
    'msk-osteochondrosen': <><path d="M15 10h18M13 15h22M17 20h14"/><path d="M19 20v16c0 3 2 5 5 5s5-2 5-5V20"/><path d="M20 29h8"/></>,
    'msk-trauma': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-4 5m-5 5-3 4c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="m24 20-3 5 5 1-3 6"/></>,
    'msk-schulter': <><path d="M10 37c2-14 7-23 16-26 6-2 12 2 12 8 0 7-6 10-12 8-4-1-7 1-8 10"/><circle cx="28" cy="19" r="6"/><path d="M18 22c4 0 6 2 8 5"/></>,
    'msk-ellenbogen': <><path d="M13 8v14c0 4 3 7 7 7h5"/><path d="M35 40V27c0-4-3-7-7-7h-5"/><circle cx="24" cy="25" r="4"/></>,
    'msk-hand': <><path d="M17 40c-3-6-6-11-6-16 0-2 3-3 4-1l2 4V11c0-3 4-3 4 0v12-15c0-3 4-3 4 0v15-13c0-3 4-3 4 0v14-10c0-3 4-3 4 0v13l3-4c2-2 5 0 3 3l-6 12c-1 2-3 3-6 3h-5c-2 0-4 0-5-1Z"/></>,
    'msk-huefte': <><path d="M14 10c-3 8-2 16 4 21l6-5 6 5c6-5 7-13 4-21"/><path d="M18 12c2 5 10 5 12 0M18 31l-3 9m15-9 3 9"/><circle cx="18" cy="30" r="3"/><circle cx="30" cy="30" r="3"/></>,
    'msk-knie': <><path d="M17 7v12c0 4 3 7 7 7s7-3 7-7V7M18 41V30c0-3 3-5 6-5s6 2 6 5v11"/><path d="M18 22c4-2 8-2 12 0"/><circle cx="24" cy="25" r="3"/></>,
    'msk-fuss': <><path d="M21 7c-1 10-1 17-5 23-2 3-6 5-5 8 1 4 8 3 13 1l13-5c3-1 2-6-2-6h-8c-2-5-1-13 0-20"/><path d="M17 31c4 0 7 2 10 5"/></>,
    'msk-postop': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="M29 19 38 28M34 24l-10 10"/><circle cx="35" cy="27" r="4"/></>,
  }

  return <svg {...common}>{icons[id] || icons['msk-anatomie']}</svg>
}

function ChapterIcon({ fachId, kapitel, className }) {
  if (fachId === 'msk') return <MskChapterIcon id={kapitel.id} className={className} />
  return <span className={className}>{kapitel.icon}</span>
}

function isAvailable(th) {
  return !!th.link || !!th.sub?.some(s => s.link)
}
function isRead(th, readArticles) {
  if ((readArticles[th.id] || 0) >= 1) return true
  return !!th.sub?.some(s => (readArticles[s.id] || 0) >= 1)
}
function themaMatchesFilter(th, filter, readArticles) {
  if (filter === 'available') return isAvailable(th)
  if (filter === 'read') return isRead(th, readArticles)
  return true
}

// Sub-thema expandable (for Knie etc.)
function SubThemen({ sub, fachColor, lang }) {
  const [open, setOpen] = useState(false)

  const getSubTitle = (item) => getThemaTitle(item, lang)

  const withLang = (href) => {
    if (!href) return null
    return lang === 'de' ? href : `${href}?lang=${lang}`
  }

  const labels = T[lang] || T.de
  const renderActions = (item) => {
    if (!item.mcqLink && !item.flashcardLink && !item.fallStatus) return null
    return (
      <div className={styles.subLearningActions}>
        {item.mcqLink && <Link href={withLang(item.mcqLink)} className={`${styles.subLearningBtn} ${styles.subLearningMcq}`}>{labels.mcq}</Link>}
        {item.fallStatus && <span className={`${styles.subLearningBtn} ${styles.subLearningFall}`} aria-disabled="true">{labels.fall} · {labels.building}</span>}
        {item.flashcardLink && <Link href={withLang(item.flashcardLink)} className={`${styles.subLearningBtn} ${styles.subLearningFlash}`}>{labels.flash}</Link>}
      </div>
    )
  }

  return (
    <div className={styles.subWrap}>
      <button className={styles.subToggle} onClick={() => setOpen(o => !o)}
        style={{ color: fachColor }}>
        {open ? '▼' : '▶'} {sub.length}
      </button>
      {open && (
        <div className={styles.subList}>
          {sub.map(s => {
            const content = (
              <>
                <span className={styles.subDot} style={{ background: fachColor }} />
                <span>{getSubTitle(s)}</span>
              </>
            )
            const href = withLang(s.link)

            return (
              <div key={s.id} className={styles.subItemRow}>
                {href ? (
                  <Link href={href} className={`${styles.subItem} ${styles.subItemLink}`}>
                    {content}
                  </Link>
                ) : (
                  <div className={styles.subItem}>{content}</div>
                )}
                {renderActions(s)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function LernenFachPage() {
  const params = useParams()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'
  const fach = getFach(params?.fach)

  const [selectedKapitel, setSelectedKapitel] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [readArticles, setReadArticles] = useState({})

  const visibleKapitel = useMemo(() => {
    if (!fach) return []
    return fach.kapitel
      .map(k => ({ kapitel: k, themen: k.themen.filter(th => themaMatchesFilter(th, filter, readArticles)) }))
      .filter(({ themen }) => filter === 'all' || themen.length > 0)
  }, [fach, filter, readArticles])

  useEffect(() => {
    setMounted(true)
    if (fach) setSelectedKapitel(null)
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
    } catch {}
  }, [fach])

  useEffect(() => { setSearch('') }, [params?.fach])

  useEffect(() => {
    if (!visibleKapitel.some(({ kapitel }) => kapitel.id === selectedKapitel)) setSelectedKapitel(null)
  }, [visibleKapitel, selectedKapitel])

  useEffect(() => {
    if (!selectedKapitel) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedKapitel(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedKapitel])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Nicht gefunden.</p>
      <Link href="/">← Startseite</Link>
    </div>
  )

  const fachName = getFachTitle(fach, lang)
  const fachIcon = fach.icon
  const selectedEntry = visibleKapitel.find(({ kapitel }) => kapitel.id === selectedKapitel)

  const withPageLang = (href) => {
    if (!href || lang === 'de') return href
    return href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`
  }

  const searchResults = search.trim().length > 1
    ? visibleKapitel.flatMap(({ kapitel: k, themen }) =>
        themen.filter(th => getThemaTitle(th, lang).toLowerCase().includes(search.toLowerCase()))
          .map(th => ({ ...th, kapitelTitle: getKapitelTitle(k, lang), kapitel: k }))
      )
    : []
  const searchActive = search.trim().length > 1

  return (
    <div className={styles.page}>

      {/* ── TOPBAR ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.back}>{t.back}</Link>
          <div className={styles.topCenter}>
            <div className={styles.topIcon}>
              <Image src={`/fach/${fach.id}.png`} alt={fachName} width={36} height={36} style={{objectFit:'contain'}}/>
            </div>
            <div className={styles.topHeading}>
              <h1 className={styles.topTitle} style={{ color: fach.color }}>{fachName}</h1>
              <span className={styles.topSubtitle}>{t.lessonsTitle} · {t.lessonsLead}</span>
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.searchBox}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="#94a3b8" strokeWidth="1.4"/>
                <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input className={styles.searchInput} placeholder={t.search}
                value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button className={styles.searchX} onClick={() => setSearch('')}>✕</button>}
            </div>
          </div>
        </div>
        {fach.kapitel.length > 0 && (
          <div className={styles.filterBar}>
            {['all', 'available', 'read'].map(f => (
              <button key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                style={filter === f ? { color: fach.color, borderColor: fach.color, background: fach.color + '12' } : {}}
                onClick={() => setFilter(f)}>
                {f === 'available' ? t.available : f === 'read' ? t.read : t.all}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>
        <div className={styles.contentLayout}>
          <main className={styles.chapterContent}>

        {/* SEARCH MODE */}
        {searchActive ? (
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <p className={styles.noResult}>{t.noResult} „{search}"</p>
            ) : searchResults.map((th, i) => (
              <div key={i} className={styles.searchRow}>
                <span className={styles.searchChapter}>
                  <ChapterIcon fachId={fach.id} kapitel={th.kapitel} className={styles.searchChapterIcon} />
                  {th.kapitelTitle}
                </span>
                <span className={styles.searchTitle}>{getThemaTitle(th, lang)}</span>
              </div>
            ))}
          </div>
        ) : visibleKapitel.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {fach.kapitel.length === 0
                ? t.emptyAllFach
                : filter === 'read' ? t.emptyRead : t.emptyAvailable}
            </p>
            {fach.kapitel.length > 0 && filter !== 'all' && (
              <button className={styles.emptyStateBtn} onClick={() => setFilter('all')}>{t.showAll}</button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.mainTopicGrid}>
              {visibleKapitel.map(({ kapitel: k, themen }) => {
                const active = selectedKapitel === k.id
                const count = themen.reduce((sum, th) => sum + 1 + (th.sub?.length || 0), 0)
                return (
                  <button key={k.id}
                    className={styles.mainTopicCard}
                    style={{ '--topic-color': fach.color }}
                    onClick={() => setSelectedKapitel(k.id)}
                    aria-pressed={active}>
                    <span className={styles.mainTopicIcon}>
                      <ChapterIcon fachId={fach.id} kapitel={k} className={styles.chapterIconSvg} />
                    </span>
                    <span className={styles.mainTopicTitle}>{withoutLeadingNumber(getKapitelTitle(k, lang))}</span>
                    <span className={styles.mainTopicCount}>{count} {t.themen}</span>
                  </button>
                )
              })}
            </div>

          </>
        )}
          </main>
        </div>
      </div>

      {selectedEntry && (
        <div className={styles.topicModalBackdrop} onMouseDown={() => setSelectedKapitel(null)}>
          <section className={styles.topicModal} style={{ '--topic-color': fach.color }}
            role="dialog" aria-modal="true" aria-labelledby="topic-modal-title"
            onMouseDown={event => event.stopPropagation()}>
            <header className={styles.topicListHeader}>
              <span className={styles.topicListIcon}>
                <ChapterIcon fachId={fach.id} kapitel={selectedEntry.kapitel} className={styles.chapterIconSvg} />
              </span>
              <div>
                <h3 id="topic-modal-title">{withoutLeadingNumber(getKapitelTitle(selectedEntry.kapitel, lang))}</h3>
                <p>{selectedEntry.themen.length} {t.themen}</p>
              </div>
              <button className={styles.topicModalClose} onClick={() => setSelectedKapitel(null)}
                aria-label={t.close}>×</button>
            </header>

            <div className={styles.topicModalBody}>
              <div className={styles.topicGroups}>
                {groupThemen(selectedEntry.themen).map((section, groupIndex) => (
                  <div key={groupIndex} className={styles.topicGroup}>
                    {section.key && (
                      <div className={styles.topicGroupHeader}>
                        <h4>{section.key}</h4>
                        <span>{section.items.length}</span>
                      </div>
                    )}
                    <div className={styles.topicList}>
                      {section.items.map(th => {
                        const available = isAvailable(th)
                        const rowContent = (
                          <>
                            <span className={styles.topicRowTitle}>{getThemaTitle(th, lang)}</span>
                            {isRead(th, readArticles) && <span className={styles.readBadge}>✓ {t.read}</span>}
                            <span className={`${styles.topicRowStatus} ${available ? styles.topicRowStatusReady : ''}`}>
                              {available ? t.available : t.building}
                            </span>
                            {th.link && <span className={styles.topicRowArrow}>→</span>}
                          </>
                        )

                        return (
                          <div key={th.id} className={styles.topicListItem}>
                            {th.link ? (
                              <Link href={withPageLang(th.link)} className={styles.topicRow}>{rowContent}</Link>
                            ) : (
                              <div className={styles.topicRow}>{rowContent}</div>
                            )}
                            {th.sub && <SubThemen sub={th.sub} fachColor={fach.color} lang={lang} />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
