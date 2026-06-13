'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CURRICULUM, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { countCases, getAvailableCaseTopicIds } from '@/data/cases'
import { useLanguage } from '@/providers/LanguageProvider'
import CaseExamMaintenance from '@/components/CaseExamMaintenance'
import styles from '@/app/ueben/page.module.css'
import caseStyles from './page.module.css'

const FACH_DISPLAY = {
  de: { gehirn:'Kopf', wirbelsaeule:'Wirbelsäule', hals:'Hals', thorax:'Thorax', mamma:'Mamma', abdomen:'Abdomen', 'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', msk:'Muskuloskelettales', technik:'Technik & Physik', 'gefaesse-ir':'Gefäße' },
  en: { gehirn:'Head', wirbelsaeule:'Spine', hals:'Neck', thorax:'Thorax', mamma:'Breast', abdomen:'Abdomen', 'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', msk:'Musculoskeletal', technik:'Physics & Tech', 'gefaesse-ir':'Vascular' },
  fa: { gehirn:'سر', wirbelsaeule:'ستون فقرات', hals:'گردن', thorax:'توراکس', mamma:'پستان', abdomen:'شکم', 'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', msk:'اسکلتی-عضلانی', technik:'تکنیک و فیزیک', 'gefaesse-ir':'عروق' },
}

const UI = {
  de: {
    home:'RadYar', crumb:'Fallprüfung', title:'Fallprüfung',
    sub:'Wähle eine oder mehrere Körperregionen, Themen und die Anzahl der Fälle.',
    step1:'Körperregion(en) wählen', step2:'Themen wählen', step3:'Anzahl der Fälle',
    all:'Alle', none:'Keine', start:'Prüfung starten', cases:'Fälle', topics:'Themen',
    selected:'Ausgewählt', noRegion:'Wähle zuerst eine verfügbare Körperregion.',
    noCases:'Für diese Körperregion sind noch keine Fälle verfügbar.',
    random:'Die Fälle werden in zufälliger Reihenfolge gezeigt.', planned:'Noch keine Fälle',
    wholeChapter:'Ganzes Kapitel wählen', chapterSelected:'Ganzes Kapitel ausgewählt',
  },
  en: {
    home:'RadYar', crumb:'Case Exam', title:'Case exam',
    sub:'Choose one or more body regions, topics and the number of cases.',
    step1:'Choose body region(s)', step2:'Choose topics', step3:'Number of cases',
    all:'All', none:'None', start:'Start exam', cases:'cases', topics:'topics',
    selected:'Selected', noRegion:'Choose an available body region first.',
    noCases:'No cases are available for this body region yet.',
    random:'Cases are shown in random order.', planned:'No cases yet',
    wholeChapter:'Select whole chapter', chapterSelected:'Whole chapter selected',
  },
  fa: {
    home:'RadYar', crumb:'آزمون بالینی', title:'آزمون کیس',
    sub:'یک یا چند ناحیه بدن، موضوع و تعداد کیس‌ها را انتخاب کن.',
    step1:'انتخاب ناحیه(ها)', step2:'انتخاب موضوعات', step3:'تعداد کیس‌ها',
    all:'همه', none:'هیچ', start:'شروع آزمون', cases:'کیس', topics:'موضوع',
    selected:'انتخاب شده', noRegion:'ابتدا یک ناحیه دارای کیس را انتخاب کن.',
    noCases:'هنوز برای این ناحیه کیسی موجود نیست.',
    random:'کیس‌ها با ترتیب تصادفی نمایش داده می‌شوند.', planned:'هنوز کیسی نیست',
    wholeChapter:'انتخاب کل فصل', chapterSelected:'کل فصل انتخاب شده',
  },
}

const COUNT_OPTIONS = [1, 2, 5, 10]
const regionIcon = id => `/fach/${id}.png`

function CasesSetupPageContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const ui = UI[lang] || UI.de
  const display = FACH_DISPLAY[lang] || FACH_DISPLAY.de
  const availableTopicIds = useMemo(() => getAvailableCaseTopicIds(), [])
  const [selectedRegions, setSelectedRegions] = useState(new Set())
  const [selectedTopics, setSelectedTopics] = useState(new Set())
  const [openGroups, setOpenGroups] = useState(new Set())
  const [count, setCount] = useState(1)

  const regionCaseTopics = useMemo(() => {
    const map = new Map()
    CURRICULUM.forEach(region => {
      const ids = []
      region.kapitel.forEach(chapter => chapter.themen.forEach(topic => {
        if (availableTopicIds.has(topic.id)) ids.push(topic.id)
        topic.sub?.forEach(sub => { if (availableTopicIds.has(sub.id)) ids.push(sub.id) })
      }))
      map.set(region.id, ids)
    })
    return map
  }, [availableTopicIds])

  const groups = useMemo(() => {
    const result = []
    CURRICULUM.filter(region => selectedRegions.has(region.id)).forEach(region => {
      region.kapitel.forEach(chapter => {
        const topics = chapter.themen.flatMap(topic => {
          const rows = availableTopicIds.has(topic.id) ? [topic] : []
          topic.sub?.forEach(sub => { if (availableTopicIds.has(sub.id)) rows.push({ ...sub, _sub: true }) })
          return rows
        })
        if (topics.length) result.push({ region, chapter, topics })
      })
    })
    return result
  }, [availableTopicIds, selectedRegions])

  const availableCases = countCases([...selectedTopics])
  const canStart = selectedTopics.size > 0 && availableCases > 0

  useEffect(() => {
    if (availableCases > 0 && count > availableCases) setCount(availableCases)
  }, [availableCases, count])

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('thema')
    if (!requested || !availableTopicIds.has(requested)) return
    const region = CURRICULUM.find(item => item.kapitel.some(chapter =>
      chapter.themen.some(topic => topic.id === requested || topic.sub?.some(sub => sub.id === requested))
    ))
    if (!region) return
    setSelectedRegions(new Set([region.id]))
    setSelectedTopics(new Set([requested]))
    const chapter = region.kapitel.find(item => item.themen.some(topic => topic.id === requested || topic.sub?.some(sub => sub.id === requested)))
    if (chapter) setOpenGroups(new Set([`${region.id}-${chapter.id}`]))
  }, [availableTopicIds])

  const toggleRegion = (region) => {
    const topicIds = regionCaseTopics.get(region.id) || []
    if (!topicIds.length) return
    const removing = selectedRegions.has(region.id)
    setSelectedRegions(previous => {
      const next = new Set(previous)
      removing ? next.delete(region.id) : next.add(region.id)
      return next
    })
    if (removing) {
      setSelectedTopics(previous => {
        const next = new Set(previous)
        topicIds.forEach(id => next.delete(id))
        return next
      })
    }
  }

  const toggleTopic = id => setSelectedTopics(previous => {
    const next = new Set(previous)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const toggleChapter = topics => setSelectedTopics(previous => {
    const next = new Set(previous)
    const ids = topics.map(topic => topic.id)
    const allSelected = ids.every(id => next.has(id))
    ids.forEach(id => allSelected ? next.delete(id) : next.add(id))
    return next
  })
  const toggleGroup = id => setOpenGroups(previous => {
    const next = new Set(previous)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const selectAll = () => setSelectedTopics(previous => {
    const next = new Set(previous)
    groups.forEach(group => group.topics.forEach(topic => next.add(topic.id)))
    return next
  })
  const selectNone = () => setSelectedTopics(previous => {
    const next = new Set(previous)
    groups.forEach(group => group.topics.forEach(topic => next.delete(topic.id)))
    return next
  })

  const start = () => {
    if (!canStart) return
    const params = new URLSearchParams({
      fach: [...selectedRegions].join(','),
      themen: [...selectedTopics].join(','),
      n: String(Math.min(count, availableCases)),
    })
    router.push(`/faelle/pruefung?${params.toString()}`)
  }

  return (
    <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.layout}>
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.crumbLink}>{ui.home}</Link>
              <span className={styles.sep}>›</span><span className={styles.crumbCurrent}>{ui.crumb}</span>
            </div>
            <h1 className={styles.title}>{ui.title}</h1>
            <p className={styles.sub}>{ui.sub}</p>
          </div>

          <section className={styles.section}>
            <div className={styles.stepLabel}><span className={styles.stepNum}>1</span>{ui.step1}</div>
            <div className={styles.fachGrid}>
              {CURRICULUM.map(region => {
                const enabled = (regionCaseTopics.get(region.id) || []).length > 0
                const active = selectedRegions.has(region.id)
                return (
                  <button key={region.id} disabled={!enabled}
                    className={`${styles.fachCard} ${active ? styles.fachCardActive : ''} ${!enabled ? caseStyles.unavailable : ''}`}
                    style={active ? { borderColor: region.color, background: region.color + '12' } : {}}
                    onClick={() => toggleRegion(region)}>
                    <span className={styles.fachIcon}><Image src={regionIcon(region.id)} alt={display[region.id]} width={54} height={54} /></span>
                    <span className={styles.fachName} style={active ? { color: region.color } : {}}>{display[region.id]}</span>
                    {!enabled && <small className={caseStyles.planned}>{ui.planned}</small>}
                    {active && <span className={styles.fachCheck} style={{ background: region.color }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.stepRow}>
              <div className={styles.stepLabel}><span className={styles.stepNum}>2</span>{ui.step2}</div>
              {selectedRegions.size > 0 && <div className={styles.bulkBtns}>
                <button className={styles.bulkBtn} onClick={selectAll}>{ui.all}</button>
                <button className={styles.bulkBtn} onClick={selectNone}>{ui.none}</button>
              </div>}
            </div>
            {selectedRegions.size === 0 ? <div className={styles.hint}>{ui.noRegion}</div> : groups.length === 0 ? (
              <div className={styles.hint}>{ui.noCases}</div>
            ) : (
              <div className={styles.kapitelList}>
                {groups.map(({ region, chapter, topics }) => {
                  const key = `${region.id}-${chapter.id}`
                  const open = openGroups.has(key)
                  const selectedCount = topics.filter(topic => selectedTopics.has(topic.id)).length
                  const wholeChapterSelected = topics.length > 0 && selectedCount === topics.length
                  return (
                    <div key={key} className={`${styles.kapitelBlock} ${open ? styles.kapitelBlockOpen : ''}`}>
                      <button className={styles.kapitelHeaderBtn} onClick={() => toggleGroup(key)}>
                        <span className={styles.kapitelIconWrap}><Image src={regionIcon(region.id)} alt="" width={26} height={26} /></span>
                        <span className={styles.kapitelTitle}>{display[region.id]} · {getKapitelTitle(chapter, lang)}</span>
                        <span className={styles.kapitelMeta} style={{ color: region.color, background: region.color + '12' }}>{selectedCount}/{topics.length}</span>
                        <span className={styles.kapitelChevron} style={{ color: open ? region.color : undefined }}>{open ? '−' : '+'}</span>
                      </button>
                      {open && <div className={styles.kapitelContent}>
                        <button
                          className={`${styles.chapterSelect} ${wholeChapterSelected ? styles.chapterSelectActive : ''}`}
                          style={wholeChapterSelected ? { borderColor: region.color, color: region.color, background: region.color + '12' } : {}}
                          onClick={() => toggleChapter(topics)}
                        >
                          <span className={styles.chapterSelectCheck}>{wholeChapterSelected ? '✓' : ''}</span>
                          <span>{wholeChapterSelected ? ui.chapterSelected : ui.wholeChapter}</span>
                          <small>{topics.length}</small>
                        </button>
                        <div className={styles.chips}>
                          {topics.map(topic => (
                            <button key={topic.id}
                              className={`${styles.chip} ${selectedTopics.has(topic.id) ? styles.chipActive : ''}`}
                              style={selectedTopics.has(topic.id) ? { borderColor: region.color, color: region.color, background: region.color + '12' } : {}}
                              onClick={() => toggleTopic(topic.id)}>
                              {getThemaTitle(topic, lang)}
                            </button>
                          ))}
                        </div>
                      </div>}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles.stepLabel}><span className={styles.stepNum}>3</span>{ui.step3}</div>
            <div className={styles.anzahlRow}>
              {COUNT_OPTIONS.map(option => {
                const disabled = option > availableCases
                return (
                  <button key={option} disabled={disabled}
                    className={`${styles.anzahlBtn} ${count === option ? styles.anzahlBtnActive : ''} ${disabled ? caseStyles.countDisabled : ''}`}
                    onClick={() => setCount(option)}>{option}</button>
                )
              })}
            </div>
          </section>
        </div>

        <aside className={styles.rightPanel}>
          <div className={styles.rightInner}>
            <div className={styles.summaryTitle}>{ui.selected}</div>
            {selectedRegions.size === 0 ? <div className={styles.summaryEmpty}>{ui.noRegion}</div> : <>
              <div className={styles.summaryFach}>
                {[...selectedRegions].map(id => {
                  const region = CURRICULUM.find(item => item.id === id)
                  return <div key={id} className={styles.summaryFachTag} style={{ borderColor: region?.color + '44', color: region?.color }}>
                    <Image src={regionIcon(id)} alt="" width={18} height={18} /> {display[id]}
                  </div>
                })}
              </div>
              <div className={styles.summaryStats}>
                <div className={styles.statBox}><div className={styles.statNum}>{selectedTopics.size}</div><div className={styles.statLbl}>{ui.topics}</div></div>
                <div className={styles.statBox}><div className={styles.statNum}>{canStart ? Math.min(count, availableCases) : 0}</div><div className={styles.statLbl}>{ui.cases}</div></div>
              </div>
              <div className={styles.summaryNote}>{ui.random}</div>
              <button className={styles.startBtn} disabled={!canStart} onClick={start}>{ui.start}</button>
            </>}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function CasesSetupPage() {
  return <CaseExamMaintenance />
}
