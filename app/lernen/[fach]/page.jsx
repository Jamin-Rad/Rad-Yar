'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, KAPITEL_TRANSLATIONS } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: { back:'← Startseite', search:'Thema suchen…', readNow:'Artikel öffnen →', noResult:'Kein Treffer für', themen:'Themen', alles:'Alles aufklappen', none:'Zuklappen', available:'Verfügbar' },
  en: { back:'← Home', search:'Search topic…', readNow:'Open article →', noResult:'No results for', themen:'Topics', alles:'Expand all', none:'Collapse', available:'Available' },
  fa: { back:'← خانه', search:'جستجوی موضوع…', readNow:'← مطالعه کنید', noResult:'نتیجه‌ای برای', themen:'موضوع', alles:'بازکردن همه', none:'بستن همه', available:'موجود' },
}

const FACH_NAMES = {
  de: { abdomen:'Abdomen', gehirn:'Kopf', msk:'Muskuloskelettales', thorax:'Thorax',
        wirbelsaeule:'Wirbelsäule', hals:'Hals', mamma:'Mamma',
        'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', technik:'Technik & Physik' },
  en: { abdomen:'Abdomen', gehirn:'Head', msk:'Musculoskeletal', thorax:'Thorax',
        wirbelsaeule:'Spine', hals:'Neck', mamma:'Breast',
        'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', technik:'Physics & Technology' },
  fa: { abdomen:'شکم', gehirn:'سر', msk:'اسکلتی-عضلانی', thorax:'توراکس',
        wirbelsaeule:'ستون فقرات', hals:'گردن', mamma:'پستان',
        'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', technik:'تکنیک و فیزیک' },
}

const FACH_ICONS = {
  abdomen:'🟠', gehirn:'🧠', msk:'🦴', thorax:'🫀',
  wirbelsaeule:'🦴', hals:'💠', mamma:'🌸',
  'becken-f':'♀️', 'becken-m':'♂️', technik:'⚙️'
}

function getGroup(title) {
  const t = title.toLowerCase()
  if (/anatomie|grundlagen|normalbefund|normvariante|physik|technik|befundung|screening/.test(t)) return 'grundlagen'
  if (/zyste|hämangiom|adenom|fnh|angiomyolipom|hydatide|fibro|mastopathie|onkozytom|myelolipom|bph|myom|nof|intraoss|gang|benigne/.test(t)) return 'benigne'
  if (/karzinom|sarkom|lymphom|metasta|maligne|hcc|ccc|gbm|glioblastom|ewing|myelom|neuroblastom|nephroblastom|astrozytom|meningeom|medulloblastom/.test(t)) return 'maligne'
  if (/steatosis|zirrhose|verfettung|diffus|hämochrom|budd|portale|fibrose|chronisch|pankreatitis|psc|cholangitis|osteoporose/.test(t)) return 'diffus'
  if (/infarkt|embolie|schlaganfall|blutung|thrombose|dissektion|moya|angiopathie|malformation|hämangioblastom|kavernom|dva|avf|avm|fmd|pavk|nekrose|avn/.test(t)) return 'vaskulaer'
  if (/entzünd|infekt|meningitis|abszess|enzephalitis|spondylodiszitis|bechterew|lyme|gbs|ms |multiple sklerose|neuromyelitis/.test(t)) return 'entzuendlich'
  if (/lirads|pirads|birads|klassifikation|iota|staging|li-rads|pi-rads/.test(t)) return 'staging'
  if (/tumor|neoplasie|net|ipmn|adenokarzinom|sarkom|osteosarkom|chondrosarkom|osteoidosteom/.test(t)) return 'tumor'
  return 'sonstiges'
}
const GROUP_ORDER = ['grundlagen','benigne','maligne','diffus','vaskulaer','entzuendlich','tumor','staging','sonstiges']
const GROUP_COLORS = {
  grundlagen:   { bg:'#e0f2fe', text:'#0369a1', border:'#7dd3fc' },
  benigne:      { bg:'#dcfce7', text:'#166534', border:'#86efac' },
  maligne:      { bg:'#fee2e2', text:'#991b1b', border:'#fca5a5' },
  diffus:       { bg:'#fef9c3', text:'#854d0e', border:'#fde047' },
  vaskulaer:    { bg:'#ede9fe', text:'#5b21b6', border:'#c4b5fd' },
  entzuendlich: { bg:'#ffedd5', text:'#9a3412', border:'#fdba74' },
  tumor:        { bg:'#fce7f3', text:'#9d174d', border:'#f9a8d4' },
  staging:      { bg:'#f0fdf4', text:'#14532d', border:'#bbf7d0' },
  sonstiges:    { bg:'#f8fafc', text:'#475569', border:'#cbd5e1' },
}

// Sub-thema expandable (for Knie etc.)
function SubThemen({ sub, fachColor }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.subWrap}>
      <button className={styles.subToggle} onClick={() => setOpen(o => !o)}
        style={{ color: fachColor }}>
        {open ? '▼' : '▶'} {sub.length}
      </button>
      {open && (
        <div className={styles.subList}>
          {sub.map(s => (
            <div key={s.id} className={styles.subItem}>
              <span className={styles.subDot} style={{ background: fachColor }} />
              {s.title}
            </div>
          ))}
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

  const allKapitelIds = useMemo(() => fach?.kapitel.map(k => k.id) || [], [fach])
  const [openKapitel, setOpenKapitel] = useState(new Set())
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setMounted(true)
    if (fach) setOpenKapitel(new Set(fach.kapitel.map(k => k.id)))
  }, [fach])

  useEffect(() => { setSearch('') }, [params?.fach])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Nicht gefunden.</p>
      <Link href="/">← Startseite</Link>
    </div>
  )

  const fachName = FACH_NAMES[lang]?.[fach.id] || fach.key
  const fachIcon = FACH_ICONS[fach.id] || fach.icon
  const allOpen = openKapitel.size === allKapitelIds.length

  const getKapitelTitle = (k) => {
    if (lang === 'de') return k.title
    return KAPITEL_TRANSLATIONS[k.id]?.[lang] || k.title
  }

  const toggleKapitel = (id) => setOpenKapitel(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })
  const toggleAll = () => setOpenKapitel(allOpen ? new Set() : new Set(allKapitelIds))

  const searchResults = search.trim().length > 1
    ? fach.kapitel.flatMap(k =>
        k.themen.filter(th => th.title.toLowerCase().includes(search.toLowerCase()))
          .map(th => ({ ...th, kapitelTitle: getKapitelTitle(k), kapitelIcon: k.icon }))
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

        {/* Kapitel pills navigation */}
        <div className={styles.kapitelNav}>
          {fach.kapitel.map(k => (
            <button key={k.id} className={`${styles.kapitelPill} ${openKapitel.has(k.id) ? styles.kapitelPillActive : ''}`}
              style={openKapitel.has(k.id) ? { borderColor: fach.color, color: fach.color, background: fach.color + '12' } : {}}
              onClick={() => { toggleKapitel(k.id); document.getElementById('kap-' + k.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
              {k.icon} {getKapitelTitle(k)}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>

        {/* SEARCH MODE */}
        {searchActive ? (
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <p className={styles.noResult}>{t.noResult} „{search}"</p>
            ) : searchResults.map((th, i) => (
              <div key={i} className={styles.searchRow}>
                <span className={styles.searchChapter}>{th.kapitelIcon} {th.kapitelTitle}</span>
                <span className={styles.searchTitle}>{th.title}</span>
              </div>
            ))}
          </div>
        ) : (
          /* ACCORDION SECTIONS */
          fach.kapitel.map((k) => {
            const isOpen = openKapitel.has(k.id)
            // Group themen
            const grouped = {}
            k.themen.forEach(th => {
              const g = getGroup(th.title)
              if (!grouped[g]) grouped[g] = []
              grouped[g].push(th)
            })
            const orderedGroups = GROUP_ORDER.filter(g => grouped[g]?.length > 0)

            return (
              <div key={k.id} id={'kap-' + k.id} className={styles.accordion}>
                {/* Accordion header */}
                <button className={styles.accHeader} onClick={() => toggleKapitel(k.id)}
                  style={{ borderLeftColor: isOpen ? fach.color : 'transparent' }}>
                  <span className={styles.accIcon}>{k.icon}</span>
                  <span className={styles.accTitle}>{getKapitelTitle(k)}</span>
                  <span className={styles.accCount}
                    style={isOpen ? { color: fach.color, background: fach.color + '15' } : {}}>
                    {k.themen.reduce((s, th) => s + 1 + (th.sub?.length || 0), 0)} {t.themen}
                  </span>
                  {k.ready && k.link && (
                    <Link href={k.link} className={styles.readyBtn}
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
                    {orderedGroups.map(g => {
                      const c = GROUP_COLORS[g]
                      return (
                        <div key={g} className={styles.group}>
                          <div className={styles.groupHeader}>
                            <span className={styles.groupBadge}
                              style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                              {g === 'grundlagen' ? (lang==='fa'?'پایه':lang==='en'?'Basics':'Grundlagen')
                               : g === 'benigne'   ? (lang==='fa'?'خوش‌خیم':lang==='en'?'Benign':'Benigne')
                               : g === 'maligne'   ? (lang==='fa'?'بدخیم':lang==='en'?'Malignant':'Maligne')
                               : g === 'diffus'    ? (lang==='fa'?'منتشر':lang==='en'?'Diffuse':'Diffus')
                               : g === 'vaskulaer' ? (lang==='fa'?'عروقی':lang==='en'?'Vascular':'Vaskulär')
                               : g === 'entzuendlich' ? (lang==='fa'?'التهابی':lang==='en'?'Inflammatory':'Entzündlich')
                               : g === 'tumor'     ? (lang==='fa'?'تومور':lang==='en'?'Tumour':'Tumor')
                               : g === 'staging'   ? (lang==='fa'?'طبقه‌بندی':lang==='en'?'Staging':'Staging')
                               : (lang==='fa'?'سایر':lang==='en'?'Other':'Sonstiges')}
                            </span>
                            <span className={styles.groupCount}>{grouped[g].length}</span>
                          </div>
                          <div className={styles.themaGrid}>
                            {grouped[g].map(th => (
                              <div key={th.id} className={styles.themaCard}>
                                <span className={styles.themaDot} style={{ background: fach.color }} />
                                <span className={styles.themaTitle}>{th.title}</span>
                                {th.sub && <SubThemen sub={th.sub} fachColor={fach.color} />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
