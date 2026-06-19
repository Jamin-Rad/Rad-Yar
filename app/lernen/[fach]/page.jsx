'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { CURRICULUM, getFach, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { pullReadStatusFromServer } from '@/utils/readStatus'
import { CONTRAST_GROUPS } from '@/data/contrastMedia'
import { ChapterIcon } from '@/components/ChapterIcons'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: { back:'← Körperregionen', search:'Thema suchen…', readNow:'Artikel öffnen', noResult:'Kein Treffer für', themen:'Themen', available:'Verfügbar', unread:'Noch nicht gelernt', read:'Gelernt', all:'Alle', mcq:'MCQ', flash:'Flashcards', fall:'Fallbeispiele', building:'Geplant', emptyAvailable:'In diesem Fachgebiet ist noch kein Thema freigeschaltet.', emptyUnread:'Alle verfügbaren Lektionen in diesem Fachgebiet sind bereits gelernt.', emptyRead:'Du hast in diesem Fachgebiet noch nichts als gelesen markiert.', emptyAllFach:'Dieses Fachgebiet ist noch im Aufbau – schau bald wieder vorbei.', showAll:'Alle Themen anzeigen', lessonsTitle:'Hauptthemen', lessonsLead:'Thema wählen und Lektionen öffnen', close:'Schließen' },
  en: { back:'← Body regions', search:'Search topic…', readNow:'Open article', noResult:'No results for', themen:'Topics', available:'Available', unread:'Not learned yet', read:'Learned', all:'All', mcq:'MCQ', flash:'Flashcards', fall:'Cases', building:'Planned', emptyAvailable:'No topics are unlocked in this specialty yet.', emptyUnread:'All available lessons in this specialty have already been learned.', emptyRead:"You haven't marked anything as read in this specialty yet.", emptyAllFach:'This specialty is still being built – check back soon.', showAll:'Show all topics', lessonsTitle:'Main topics', lessonsLead:'Choose a topic and open its lessons', close:'Close' },
  fa: { back:'ناحیه‌های بدن →', search:'جستجوی موضوع…', readNow:'مطالعه کنید', noResult:'نتیجه‌ای برای', themen:'موضوع', available:'موجود', unread:'هنوز یاد نگرفته‌ام', read:'یاد گرفته‌ام', all:'همه', mcq:'MCQ', flash:'فلش‌کارت', fall:'کیس', building:'برنامه‌ریزی‌شده', emptyAvailable:'هنوز موضوعی در این تخصص فعال نشده.', emptyUnread:'همه درس‌های موجود در این تخصص مطالعه شده‌اند.', emptyRead:'هنوز چیزی را در این تخصص خوانده‌شده علامت نزده‌ای.', emptyAllFach:'این تخصص هنوز در حال آماده‌سازی است – بزودی برمی‌گردیم.', showAll:'نمایش همه موضوعات', lessonsTitle:'موضوعات اصلی', lessonsLead:'موضوع را انتخاب کنید و درس‌ها را ببینید', close:'بستن' },
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

function isAvailable(th) {
  return !!th.link || !!th.sub?.some(s => s.link)
}
function isRead(th, readArticles) {
  if ((readArticles[th.id] || 0) >= 1) return true
  return !!th.sub?.some(s => (readArticles[s.id] || 0) >= 1)
}
function themaMatchesFilter(th, filter, readArticles) {
  if (filter === 'available') return isAvailable(th)
  if (filter === 'unread') return isAvailable(th) && !isRead(th, readArticles)
  if (filter === 'read') return isRead(th, readArticles)
  return true
}

function getKapitelThemen(kapitel) {
  if (kapitel.id !== 'technik-kontrastmittel') return kapitel.themen

  return CONTRAST_GROUPS.map(group => ({
    id: group.readId,
    title: group.title,
    tags: group.id === 'ultraschall' ? ['Sono'] : group.id === 'mrt' ? ['MRT'] : ['CT', 'MRT'],
    diff: 2,
    link: `/technik/kontrastmittel/${group.id}`,
    updatedAt: '2026-06-12',
  }))
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
  const { isLoaded, userId } = useAuth()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'
  const fach = getFach(params?.fach)

  const [selectedKapitel, setSelectedKapitel] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState('available')
  const [readArticles, setReadArticles] = useState({})

  const visibleKapitel = useMemo(() => {
    if (!fach) return []
    return fach.kapitel
      .map(k => ({ kapitel: k, themen: getKapitelThemen(k).filter(th => themaMatchesFilter(th, filter, readArticles)) }))
      .filter(({ themen }) => filter === 'all' || themen.length > 0)
  }, [fach, filter, readArticles])

  useEffect(() => {
    setMounted(true)
    if (fach) {
      setSelectedKapitel(null)
      const hasAvailableTopics = fach.kapitel.some(kapitel => getKapitelThemen(kapitel).some(isAvailable))
      setFilter(hasAvailableTopics ? 'available' : 'all')
    }
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
    } catch {}
  }, [fach])

  // Lesefortschritt vom Server holen (geräteübergreifend) und mergen
  useEffect(() => {
    if (!isLoaded || !userId) return
    let cancelled = false
    pullReadStatusFromServer()
      .then(result => {
        if (cancelled || !result) return
        setReadArticles(result.articles)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [isLoaded, userId])

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
      <Link href="/lernen">← Körperregionen</Link>
    </div>
  )

  const fachName = getFachTitle(fach, lang)
  const fachIcon = fach.icon
  const selectedEntry = visibleKapitel.find(({ kapitel }) => kapitel.id === selectedKapitel)

  const withPageLang = (href) => {
    if (!href || lang === 'de') return href
    return href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`
  }

  return (
    <div className={styles.page}>

      {/* ── TOPBAR ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/lernen" className={styles.back}>{t.back}</Link>
          <div className={styles.topCenter}>
            <div className={styles.topIcon}>
              <Image src={`/fach/${fach.imageId || fach.id}.png`} alt={fachName} width={36} height={36} style={{objectFit:'contain'}}/>
            </div>
            <div className={styles.topHeading}>
              <h1 className={styles.topTitle} style={{ color: fach.color }}>{fachName}</h1>
              <span className={styles.topSubtitle}>{t.lessonsTitle} · {t.lessonsLead}</span>
            </div>
          </div>
        </div>
        {fach.kapitel.length > 0 && (
          <div className={styles.filterBar}>
            {['all', 'available', 'read', 'unread'].map(f => (
              <button key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                style={filter === f ? { color: fach.color, borderColor: fach.color, background: fach.color + '12' } : {}}
                onClick={() => setFilter(f)}>
                {f === 'available' ? t.available : f === 'unread' ? t.unread : f === 'read' ? t.read : t.all}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>
        <div className={styles.contentLayout}>
          <main className={styles.chapterContent}>

        {visibleKapitel.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {fach.kapitel.length === 0
                ? t.emptyAllFach
                : filter === 'read' ? t.emptyRead : filter === 'unread' ? t.emptyUnread : t.emptyAvailable}
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
