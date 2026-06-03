'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CURRICULUM, KAPITEL_TRANSLATIONS } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

// ── Translated fach names (same as lernen index) ─────────────────────────
const FACH_DISPLAY = {
  de: {
    abdomen:'Abdomen', gehirn:'Kopf', msk:'Muskuloskelettales',
    thorax:'Thorax', wirbelsaeule:'Wirbelsäule', hals:'Hals', mamma:'Mamma',
    'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', technik:'Technik & Physik',
  },
  en: {
    abdomen:'Abdomen', gehirn:'Head', msk:'Musculoskeletal',
    thorax:'Thorax', wirbelsaeule:'Spine', hals:'Neck', mamma:'Breast',
    'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', technik:'Physics & Tech',
  },
  fa: {
    abdomen:'شکم', gehirn:'سر', msk:'اسکلتی-عضلانی',
    thorax:'توراکس', wirbelsaeule:'ستون فقرات', hals:'گردن', mamma:'پستان',
    'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', technik:'تکنیک و فیزیک',
  },
}

// ── Page-local labels ─────────────────────────────────────────────────────
const UE = {
  de: {
    home:'RadYar', crumb:'Üben',
    title:'Üben', sub:'Stelle dir ein MCQ-Set zusammen – Fachgebiet, Themen und Anzahl der Fragen.',
    step1:'Fachgebiet wählen', step2:'Themen wählen', step3:'Anzahl der Fragen',
    chooseFirst:'Wähle zuerst ein Fachgebiet.',
    selAll:'Alle auswählen', selNone:'Keine',
    start:'Quiz starten', questions:'Fragen', topics:'Themen', kapitel:'Kapitel',
    noThemen:'Für dieses Fachgebiet sind noch keine Themen hinterlegt.',
  },
  en: {
    home:'RadYar', crumb:'Practice',
    title:'Practice', sub:'Build your MCQ set – specialty, topics and number of questions.',
    step1:'Choose a specialty', step2:'Choose topics', step3:'Number of questions',
    chooseFirst:'Choose a specialty first.',
    selAll:'Select all', selNone:'None',
    start:'Start quiz', questions:'questions', topics:'topics', kapitel:'chapters',
    noThemen:'No topics defined for this specialty yet.',
  },
  fa: {
    home:'RadYar', crumb:'تمرین',
    title:'تمرین', sub:'مجموعه MCQ خود را بسازید – تخصص، موضوعات و تعداد سؤالات.',
    step1:'انتخاب تخصص', step2:'انتخاب موضوعات', step3:'تعداد سؤالات',
    chooseFirst:'ابتدا یک تخصص انتخاب کنید.',
    selAll:'انتخاب همه', selNone:'هیچ‌کدام',
    start:'شروع آزمون', questions:'سؤال', topics:'موضوع', kapitel:'فصل',
    noThemen:'هنوز موضوعی برای این تخصص تعریف نشده است.',
  },
}

const ANZAHL_OPTIONS = [10, 20, 40]

function getKapitelTitle(k, lang) {
  if (lang === 'de') return k.title
  return KAPITEL_TRANSLATIONS[k.id]?.[lang] || k.title
}

export default function UebenPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = UE[lang] || UE.de
  const display = FACH_DISPLAY[lang] || FACH_DISPLAY.de

  const [fachId, setFachId]     = useState(null)
  const [selThemen, setSelThemen] = useState(() => new Set())
  const [anzahl, setAnzahl]     = useState(20)

  const fach = useMemo(() => CURRICULUM.find(f => f.id === fachId), [fachId])
  const allThemenIds = useMemo(
    () => fach ? fach.kapitel.flatMap(k => k.themen.map(th => th.id)) : [],
    [fach]
  )

  const chooseFach = (id) => {
    setFachId(id)
    const f = CURRICULUM.find(c => c.id === id)
    if (f) setSelThemen(new Set(f.kapitel.flatMap(k => k.themen.map(th => th.id))))
  }

  const toggleThema = (id) =>
    setSelThemen(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const selectAll  = () => setSelThemen(new Set(allThemenIds))
  const selectNone = () => setSelThemen(new Set())

  const canStart = fachId && selThemen.size > 0

  const start = () => {
    if (!canStart) return
    const params = new URLSearchParams({
      fach: fachId,
      n: String(anzahl),
      themen: [...selThemen].join(','),
    })
    router.push(`/ueben/quiz?${params.toString()}`)
  }

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.crumbLink}>{t.home}</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.crumbCurrent}>{t.crumb}</span>
        </div>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.sub}>{t.sub}</p>
      </div>

      {/* ── STEP 1: FACH ── */}
      <section className={styles.section}>
        <div className={styles.stepLabel}>
          <span className={styles.stepNum}>1</span>{t.step1}
        </div>
        <div className={styles.fachGrid}>
          {CURRICULUM.map(f => (
            <button
              key={f.id}
              className={`${styles.fachCard} ${fachId === f.id ? styles.fachCardActive : ''}`}
              style={fachId === f.id ? { borderColor: f.color, background: f.color + '12' } : {}}
              onClick={() => chooseFach(f.id)}
            >
              <span className={styles.fachName} style={fachId === f.id ? { color: f.color } : {}}>
                {display[f.id] || f.key}
              </span>
              <span className={styles.fachCount}>
                {f.kapitel.reduce((s, k) => s + k.themen.length, 0)} {t.topics}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── STEP 2: THEMEN ── */}
      <section className={styles.section}>
        <div className={styles.stepRow}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNum}>2</span>{t.step2}
          </div>
          {fach && (
            <div className={styles.bulkBtns}>
              <button className={styles.bulkBtn} onClick={selectAll}>{t.selAll}</button>
              <button className={styles.bulkBtn} onClick={selectNone}>{t.selNone}</button>
            </div>
          )}
        </div>

        {!fach ? (
          <div className={styles.hint}>{t.chooseFirst}</div>
        ) : (
          <div className={styles.kapitelList}>
            {fach.kapitel.map(k => (
              <div key={k.id} className={styles.kapitelBlock}>
                <div className={styles.kapitelHeader}>
                  <span>{k.icon}</span>
                  <span className={styles.kapitelTitle}>{getKapitelTitle(k, lang)}</span>
                  <span className={styles.kapitelCount}>{k.themen.length}</span>
                </div>
                <div className={styles.chips}>
                  {k.themen.map(th => (
                    <button
                      key={th.id}
                      className={`${styles.chip} ${selThemen.has(th.id) ? styles.chipActive : ''}`}
                      style={selThemen.has(th.id) ? { borderColor: fach.color, color: fach.color, background: fach.color + '12' } : {}}
                      onClick={() => toggleThema(th.id)}
                    >
                      {th.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── STEP 3: ANZAHL ── */}
      <section className={styles.section}>
        <div className={styles.stepLabel}>
          <span className={styles.stepNum}>3</span>{t.step3}
        </div>
        <div className={styles.anzahlRow}>
          {ANZAHL_OPTIONS.map(n => (
            <button
              key={n}
              className={`${styles.anzahlBtn} ${anzahl === n ? styles.anzahlBtnActive : ''}`}
              onClick={() => setAnzahl(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className={styles.bar}>
        <div className={styles.summary}>
          {fach ? (
            <>
              <strong style={{ color: fach.color }}>{display[fach.id] || fach.key}</strong>
              <span className={styles.dot}>·</span>
              {selThemen.size} {t.topics}
              <span className={styles.dot}>·</span>
              {anzahl} {t.questions}
            </>
          ) : (
            <span style={{ opacity: 0.45 }}>{t.chooseFirst}</span>
          )}
        </div>
        <button className={styles.startBtn} onClick={start} disabled={!canStart}>
          {t.start}
        </button>
      </div>
    </div>
  )
}
