'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CURRICULUM, KAPITEL_TRANSLATIONS } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const FACH_DISPLAY = {
  de: { gehirn:'Kopf', wirbelsaeule:'Wirbelsäule', hals:'Hals', thorax:'Thorax',
        mamma:'Mamma', abdomen:'Abdomen', 'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann',
        msk:'Muskuloskelettales', technik:'Technik & Physik' },
  en: { gehirn:'Head', wirbelsaeule:'Spine', hals:'Neck', thorax:'Thorax',
        mamma:'Breast', abdomen:'Abdomen', 'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male',
        msk:'Musculoskeletal', technik:'Physics & Tech' },
  fa: { gehirn:'سر', wirbelsaeule:'ستون فقرات', hals:'گردن', thorax:'توراکس',
        mamma:'پستان', abdomen:'شکم', 'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان',
        msk:'اسکلتی-عضلانی', technik:'تکنیک و فیزیک' },
}

const FACH_ICONS = {
  gehirn:'🧠', wirbelsaeule:'🩻', hals:'🦋', thorax:'🫁',
  mamma:'🩺', abdomen:'🫘', 'becken-f':'♀️', 'becken-m':'♂️',
  msk:'🦴', technik:'⚙️',
}

const UE = {
  de: { home:'RadYar', crumb:'Üben',
        title:'MCQ-Training', sub:'Wähle eine oder mehrere Körperregionen, dann Themen und Anzahl der Fragen.',
        step1:'Körperregion(en) wählen', step2:'Themen wählen', step3:'Anzahl der Fragen',
        allSel:'Alle', noneSel:'Keine', start:'Quiz starten',
        questions:'Fragen', topics:'Themen', selected:'Ausgewählt',
        noFach:'Wähle zuerst eine Körperregion.', random:'Zufällige Auswahl' },
  en: { home:'RadYar', crumb:'Practice',
        title:'MCQ Training', sub:'Choose one or more body regions, then topics and number of questions.',
        step1:'Choose body region(s)', step2:'Choose topics', step3:'Number of questions',
        allSel:'All', noneSel:'None', start:'Start quiz',
        questions:'questions', topics:'topics', selected:'Selected',
        noFach:'Choose a body region first.', random:'Random selection' },
  fa: { home:'RadYar', crumb:'تمرین',
        title:'تمرین MCQ', sub:'یک یا چند ناحیه بدن انتخاب کنید، سپس موضوعات و تعداد سؤالات.',
        step1:'انتخاب ناحیه(ها)', step2:'انتخاب موضوعات', step3:'تعداد سؤالات',
        allSel:'همه', noneSel:'هیچ', start:'شروع آزمون',
        questions:'سؤال', topics:'موضوع', selected:'انتخاب شده',
        noFach:'ابتدا یک ناحیه انتخاب کنید.', random:'انتخاب تصادفی' },
}

const ANZAHL_OPTIONS = [5, 10, 25, 50]

function getKapitelTitle(k, lang) {
  if (lang === 'de') return k.title
  return KAPITEL_TRANSLATIONS[k.id]?.[lang] || k.title
}

export default function UebenPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = UE[lang] || UE.de
  const display = FACH_DISPLAY[lang] || FACH_DISPLAY.de

  // ── State ──────────────────────────────────────
  const [selFach, setSelFach]     = useState(new Set())   // multiple fach
  const [selThemen, setSelThemen] = useState(new Set())   // selected thema ids
  const [anzahl, setAnzahl]       = useState(10)

  // All themen from all selected fach (combined, deduped by id)
  const allThemenFromSel = useMemo(() => {
    const result = []
    CURRICULUM.filter(f => selFach.has(f.id)).forEach(f => {
      f.kapitel.forEach(k => {
        k.themen.forEach(th => {
          result.push({ ...th, fachId: f.id, fachColor: f.color, kapitelTitle: getKapitelTitle(k, lang), kapitelId: k.id })
          // Also add sub-themen
          if (th.sub) th.sub.forEach(s => result.push({ ...s, fachId: f.id, fachColor: f.color, kapitelTitle: getKapitelTitle(k, lang), kapitelId: k.id }))
        })
      })
    })
    return result
  }, [selFach, lang])

  const toggleFach = (id) => {
    setSelFach(prev => {
      const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
    })
    // Auto-select all themen of newly added fach
    const f = CURRICULUM.find(c => c.id === id)
    if (f) {
      setSelThemen(prev => {
        const s = new Set(prev)
        if (selFach.has(id)) {
          // Deselecting fach — remove its themen
          f.kapitel.forEach(k => k.themen.forEach(th => { s.delete(th.id); th.sub?.forEach(sub => s.delete(sub.id)) }))
        } else {
          // Adding fach — add all its themen
          f.kapitel.forEach(k => k.themen.forEach(th => { s.add(th.id); th.sub?.forEach(sub => s.add(sub.id)) }))
        }
        return s
      })
    }
  }

  const toggleThema = (id) => setSelThemen(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const selectAll  = () => setSelThemen(new Set(allThemenFromSel.map(t => t.id)))
  const selectNone = () => setSelThemen(prev => {
    const s = new Set(prev)
    allThemenFromSel.forEach(t => s.delete(t.id))
    return s
  })

  const canStart = selFach.size > 0 && selThemen.size > 0

  const start = () => {
    if (!canStart) return
    const params = new URLSearchParams({
      fach: [...selFach].join(','),
      n: String(anzahl),
      themen: [...selThemen].join(','),
    })
    router.push(`/ueben/quiz?${params.toString()}`)
  }

  // Group themen by fach + kapitel for display
  const groupedBySel = useMemo(() => {
    const result = []
    CURRICULUM.filter(f => selFach.has(f.id)).forEach(f => {
      f.kapitel.forEach(k => {
        const themen = k.themen.flatMap(th => th.sub ? [th, ...th.sub.map(s => ({ ...s, _sub: true }))] : [th])
        result.push({ fachId: f.id, fachColor: f.color, kapitelId: k.id, kapitelTitle: getKapitelTitle(k, lang), themen })
      })
    })
    return result
  }, [selFach, lang])

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.crumbLink}>{t.home}</Link>
              <span className={styles.sep}>›</span>
              <span className={styles.crumbCurrent}>{t.crumb}</span>
            </div>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.sub}>{t.sub}</p>
          </div>

          {/* STEP 1: FACH (multiselect) */}
          <section className={styles.section}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>1</span>{t.step1}
            </div>
            <div className={styles.fachGrid}>
              {CURRICULUM.map(f => {
                const active = selFach.has(f.id)
                return (
                  <button key={f.id}
                    className={`${styles.fachCard} ${active ? styles.fachCardActive : ''}`}
                    style={active ? { borderColor: f.color, background: f.color + '12' } : {}}
                    onClick={() => toggleFach(f.id)}>
                    <span className={styles.fachIcon}>{FACH_ICONS[f.id] || f.icon}</span>
                    <span className={styles.fachName} style={active ? { color: f.color } : {}}>
                      {display[f.id] || f.key}
                    </span>
                    {active && <span className={styles.fachCheck} style={{ background: f.color }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </section>

          {/* STEP 2: THEMEN */}
          <section className={styles.section}>
            <div className={styles.stepRow}>
              <div className={styles.stepLabel}>
                <span className={styles.stepNum}>2</span>{t.step2}
              </div>
              {selFach.size > 0 && (
                <div className={styles.bulkBtns}>
                  <button className={styles.bulkBtn} onClick={selectAll}>{t.allSel}</button>
                  <button className={styles.bulkBtn} onClick={selectNone}>{t.noneSel}</button>
                </div>
              )}
            </div>

            {selFach.size === 0 ? (
              <div className={styles.hint}>{t.noFach}</div>
            ) : (
              <div className={styles.kapitelList}>
                {groupedBySel.map(({ fachId, fachColor, kapitelId, kapitelTitle, themen }) => (
                  <div key={fachId + '-' + kapitelId} className={styles.kapitelBlock}>
                    <div className={styles.kapitelHeader}>
                      <span className={styles.kapitelDot} style={{ background: fachColor }} />
                      <span className={styles.kapitelTitle}>{display[fachId] || fachId} · {kapitelTitle}</span>
                    </div>
                    <div className={styles.chips}>
                      {themen.map(th => (
                        <button key={th.id}
                          className={`${styles.chip} ${selThemen.has(th.id) ? styles.chipActive : ''} ${th._sub ? styles.chipSub : ''}`}
                          style={selThemen.has(th.id) ? { borderColor: fachColor, color: fachColor, background: fachColor + '12' } : {}}
                          onClick={() => toggleThema(th.id)}>
                          {th.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* STEP 3: ANZAHL */}
          <section className={styles.section}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>3</span>{t.step3}
            </div>
            <div className={styles.anzahlRow}>
              {ANZAHL_OPTIONS.map(n => (
                <button key={n}
                  className={`${styles.anzahlBtn} ${anzahl === n ? styles.anzahlBtnActive : ''}`}
                  onClick={() => setAnzahl(n)}>
                  {n}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT PANEL: selected summary ── */}
        <div className={styles.rightPanel}>
          <div className={styles.rightInner}>
            <div className={styles.summaryTitle}>{t.selected}</div>

            {selFach.size === 0 ? (
              <div className={styles.summaryEmpty}>{t.noFach}</div>
            ) : (
              <>
                <div className={styles.summaryFach}>
                  {[...selFach].map(id => {
                    const f = CURRICULUM.find(c => c.id === id)
                    return (
                      <div key={id} className={styles.summaryFachTag} style={{ borderColor: f?.color + '44', color: f?.color }}>
                        {FACH_ICONS[id]} {display[id] || id}
                      </div>
                    )
                  })}
                </div>

                <div className={styles.summaryStats}>
                  <div className={styles.statBox}>
                    <div className={styles.statNum}>{selThemen.size}</div>
                    <div className={styles.statLbl}>{t.topics}</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statNum}>{anzahl}</div>
                    <div className={styles.statLbl}>{t.questions}</div>
                  </div>
                </div>

                <div className={styles.summaryNote}>{t.random}</div>

                <button className={styles.startBtn} onClick={start} disabled={!canStart}>
                  {t.start}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
