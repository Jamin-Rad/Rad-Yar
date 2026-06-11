'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: { back:'← Startseite', search:'Thema suchen…', readNow:'Artikel öffnen →', noResult:'Kein Treffer für', themen:'Themen', alles:'Alles aufklappen', none:'Zuklappen', available:'Verfügbar', read:'Gelesen', all:'Alle', mcq:'MCQ', flash:'Flashcards', fall:'Fallbeispiele', building:'im Aufbau', emptyAvailable:'In diesem Fachgebiet ist noch kein Thema freigeschaltet.', emptyRead:'Du hast in diesem Fachgebiet noch nichts als gelesen markiert.', emptyAllFach:'Dieses Fachgebiet ist noch im Aufbau – schau bald wieder vorbei.', showAll:'Alle Themen anzeigen' },
  en: { back:'← Home', search:'Search topic…', readNow:'Open article →', noResult:'No results for', themen:'Topics', alles:'Expand all', none:'Collapse', available:'Available', read:'Read', all:'All', mcq:'MCQ', flash:'Flashcards', fall:'Cases', building:'coming soon', emptyAvailable:'No topics are unlocked in this specialty yet.', emptyRead:"You haven't marked anything as read in this specialty yet.", emptyAllFach:'This specialty is still being built – check back soon.', showAll:'Show all topics' },
  fa: { back:'← خانه', search:'جستجوی موضوع…', readNow:'← مطالعه کنید', noResult:'نتیجه‌ای برای', themen:'موضوع', alles:'بازکردن همه', none:'بستن همه', available:'موجود', read:'خوانده‌شده', all:'همه', mcq:'MCQ', flash:'فلش‌کارت', fall:'کیس', building:'در حال ساخت', emptyAvailable:'هنوز موضوعی در این تخصص فعال نشده.', emptyRead:'هنوز چیزی را در این تخصص خوانده‌شده علامت نزده‌ای.', emptyAllFach:'این تخصص هنوز در حال آماده‌سازی است – بزودی برمی‌گردیم.', showAll:'نمایش همه موضوعات' },
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

  const [openKapitel, setOpenKapitel] = useState(new Set())
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('available')
  const [readArticles, setReadArticles] = useState({})

  const visibleKapitel = useMemo(() => {
    if (!fach) return []
    return fach.kapitel
      .map(k => ({ kapitel: k, themen: k.themen.filter(th => themaMatchesFilter(th, filter, readArticles)) }))
      .filter(({ themen }) => filter === 'all' || themen.length > 0)
  }, [fach, filter, readArticles])

  const allKapitelIds = useMemo(() => visibleKapitel.map(({ kapitel }) => kapitel.id), [visibleKapitel])

  useEffect(() => {
    setMounted(true)
    if (fach) setOpenKapitel(new Set())
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
    } catch {}
  }, [fach])

  useEffect(() => { setSearch('') }, [params?.fach])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Nicht gefunden.</p>
      <Link href="/">← Startseite</Link>
    </div>
  )

  const fachName = getFachTitle(fach, lang)
  const fachIcon = fach.icon
  const allOpen = allKapitelIds.length > 0 && openKapitel.size === allKapitelIds.length

  const withPageLang = (href) => {
    if (!href || lang === 'de') return href
    return href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`
  }

  const toggleKapitel = (id) => setOpenKapitel(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })
  const toggleAll = () => setOpenKapitel(allOpen ? new Set() : new Set(allKapitelIds))

  const searchResults = search.trim().length > 1
    ? visibleKapitel.flatMap(({ kapitel: k, themen }) =>
        themen.filter(th => getThemaTitle(th, lang).toLowerCase().includes(search.toLowerCase()))
          .map(th => ({ ...th, kapitelTitle: getKapitelTitle(k, lang), kapitelIcon: k.icon }))
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
            <h1 className={styles.topTitle} style={{ color: fach.color }}>{fachName}</h1>
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
            <button className={styles.toggleAllBtn} onClick={toggleAll}
              style={{ color: fach.color, borderColor: fach.color + '44' }}>
              {allOpen ? t.none : t.alles}
            </button>
          </div>
        </div>
        {fach.kapitel.length > 0 && (
          <div className={styles.filterBar}>
            {['available', 'read', 'all'].map(f => (
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
                <span className={styles.searchChapter}>{th.kapitelIcon} {th.kapitelTitle}</span>
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
          /* ACCORDION SECTIONS */
          visibleKapitel.map(({ kapitel: k, themen }) => {
            const isOpen = openKapitel.has(k.id)
            const sections = groupThemen(themen)

            return (
              <div key={k.id} id={'kap-' + k.id} className={styles.accordion}>
                {/* Accordion header */}
                <button className={`${styles.accHeader} ${isOpen ? styles.accHeaderOpen : ''}`} onClick={() => toggleKapitel(k.id)}
                  style={{ borderLeftColor: isOpen ? fach.color : 'transparent' }}>
                  <span className={styles.accIcon}>{k.icon}</span>
                  <span className={styles.accTitle}>{getKapitelTitle(k, lang)}</span>
                  <span className={styles.accCount}
                    style={isOpen ? { color: fach.color, background: fach.color + '15' } : {}}>
                    {themen.reduce((s, th) => s + 1 + (th.sub?.length || 0), 0)} {t.themen}
                  </span>
                  {k.ready && k.link && (
                    <Link href={withPageLang(k.link)} className={styles.readyBtn}
                      style={{ color: fach.color, borderColor: fach.color + '44' }}
                      onClick={e => e.stopPropagation()}>
                      {t.readNow}
                    </Link>
                  )}
                  <span className={styles.accChevron}
                    style={{ color: fach.color, transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</span>
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div className={styles.accBody}>
                    {sections.map((section, i) => (
                      <div key={i} className={styles.group}>
                        {section.key && (
                          <div className={styles.groupHeader}>
                            <span className={styles.groupLabel}>{section.key}</span>
                            <span className={styles.groupCount}>{section.items.length}</span>
                          </div>
                        )}
                        <div className={styles.themaGrid}>
                          {section.items.map(th => {
                            const cardContent = (
                              <>
                                <span className={styles.themaDot} style={{ background: fach.color }} />
                                <span className={styles.themaTitle}>{getThemaTitle(th, lang)}</span>
                                {isRead(th, readArticles) && <span className={styles.readBadge}>✓ {t.read}</span>}
                                {th.link && <span className={styles.openHint}>{t.readNow}</span>}
                                {th.sub && <SubThemen sub={th.sub} fachColor={fach.color} lang={lang} />}
                              </>
                            )
                            return th.link ? (
                              <Link key={th.id} href={withPageLang(th.link)} className={`${styles.themaCard} ${styles.themaCardLink}`}>
                                {cardContent}
                              </Link>
                            ) : (
                              <div key={th.id} className={styles.themaCard}>
                                {cardContent}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
          </main>
        </div>
      </div>
    </div>
  )
}
