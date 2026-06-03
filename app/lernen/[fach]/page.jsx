'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, KAPITEL_TRANSLATIONS } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: {
    back: '← Zurück',
    search: 'Thema suchen…',
    mcq: 'MCQs starten',
    cases: 'Fallbeispiele',
    soon: 'Bald verfügbar',
    available: 'Verfügbar',
    readNow: 'Jetzt lesen →',
    noResult: 'Kein Treffer für',
    themen: 'Themen',
    benigne: 'Benigne',
    maligne: 'Maligne',
    diffus: 'Diffus / Systemisch',
    vaskulaer: 'Vaskulär',
    entzuendlich: 'Entzündlich & Infektiös',
    tumor: 'Tumoren',
    grundlagen: 'Grundlagen & Anatomie',
    staging: 'Klassifikation & Staging',
    sonstiges: 'Sonstiges',
  },
  en: {
    back: '← Back',
    search: 'Search topic…',
    mcq: 'Start MCQs',
    cases: 'Case studies',
    soon: 'Coming soon',
    available: 'Available',
    readNow: 'Read now →',
    noResult: 'No results for',
    themen: 'Topics',
    benigne: 'Benign',
    maligne: 'Malignant',
    diffus: 'Diffuse / Systemic',
    vaskulaer: 'Vascular',
    entzuendlich: 'Inflammatory & Infectious',
    tumor: 'Tumours',
    grundlagen: 'Basics & Anatomy',
    staging: 'Classification & Staging',
    sonstiges: 'Other',
  },
  fa: {
    back: '← بازگشت',
    search: 'جستجوی موضوع…',
    mcq: 'شروع MCQ',
    cases: 'موارد بالینی',
    soon: 'به زودی',
    available: 'موجود',
    readNow: 'مطالعه کنید ←',
    noResult: 'نتیجه‌ای برای',
    themen: 'موضوع',
    benigne: 'خوش‌خیم',
    maligne: 'بدخیم',
    diffus: 'منتشر / سیستمیک',
    vaskulaer: 'عروقی',
    entzuendlich: 'التهابی و عفونی',
    tumor: 'تومورها',
    grundlagen: 'پایه و آناتومی',
    staging: 'طبقه‌بندی و استیجینگ',
    sonstiges: 'سایر',
  },
}

// Fach display names per language
const FACH_NAMES = {
  de: { abdomen:'Abdomen', gehirn:'Kopf', msk:'Muskuloskelettales',
        thorax:'Thorax', wirbelsaeule:'Wirbelsäule', hals:'Hals', mamma:'Mamma',
        'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', technik:'Technik & Physik' },
  en: { abdomen:'Abdomen', gehirn:'Head', msk:'Musculoskeletal',
        thorax:'Thorax', wirbelsaeule:'Spine', hals:'Neck', mamma:'Breast',
        'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', technik:'Physics & Technology' },
  fa: { abdomen:'شکم', gehirn:'سر', msk:'اسکلتی-عضلانی',
        thorax:'توراکس', wirbelsaeule:'ستون فقرات', hals:'گردن', mamma:'پستان',
        'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', technik:'تکنیک و فیزیک' },
}

// Fach icons - including new ones for punkt 9
const FACH_ICONS = {
  abdomen: '🫁', gehirn: '🧠', msk: '🦴', thorax: '🫀',
  wirbelsaeule: '🔩', hals: '🔵', mamma: '🌸',
  'becken-f': '♀️', 'becken-m': '♂️', technik: '⚙️'
}

// Group assignment
function getGroup(title) {
  const t = title.toLowerCase()
  if (/anatomie|grundlagen|normalbefund|normvariante|physik|technik|befundung|interpretation|screening/.test(t)) return 'grundlagen'
  if (/zyste|hämangiom|adenom|fnh|angiomyolipom|hydatide|fibro|mastopathie|onkozytom|myelolipom|bph|myom|einfache|nof|intraoss|gang|benigne/.test(t)) return 'benigne'
  if (/karzinom|sarkom|lymphom|metasta|maligne|hcc|ccc|gbm|glioblastom|ewing|myelom|neuroblastom|nephroblastom|astrozytom|meningeom|medulloblastom/.test(t)) return 'maligne'
  if (/steatosis|zirrhose|verfettung|diffus|hämochrom|budd|portale|fibrose|chronisch|pankreatitis|psc|cholangitis|morbus paget|osteoporose/.test(t)) return 'diffus'
  if (/infarkt|embolie|schlaganfall|blutung|thrombose|dissektion|moya|angiopathie|malformation|hämangioblastom|kavernom|dva|avf|avm|fmd|pavk|nekrose|avn/.test(t)) return 'vaskulaer'
  if (/entzünd|infekt|meningitis|abszess|enzephalitis|spondylodiszitis|bechterew|lyme|gbs|ms |multiple sklerose|neuromyelitis/.test(t)) return 'entzuendlich'
  if (/lirads|pirads|birads|klassifikation|iota|staging|li-rads|pi-rads/.test(t)) return 'staging'
  if (/tumor|neoplasie|net|ipmn|adenokarzinom/.test(t)) return 'tumor'
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

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function LernenFachPage() {
  const params = useParams()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'
  const fach = getFach(params?.fach)
  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setActiveIdx(0); setSearch('') }, [params?.fach])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Fachgebiet nicht gefunden.</p>
      <Link href="/">← Startseite</Link>
    </div>
  )

  const fachName = FACH_NAMES[lang]?.[fach.id] || fach.key
  const getKapitelTitle = (k) => {
    if (lang === 'de') return k.title
    const tr = KAPITEL_TRANSLATIONS[k.id]
    return tr?.[lang] || k.title
  }
  const fachIcon = FACH_ICONS[fach.id] || fach.icon
  const activeKap = fach.kapitel[activeIdx]
  const searchActive = search.trim().length > 0

  const searchResults = searchActive
    ? fach.kapitel.flatMap(k =>
        k.themen.filter(th => th.title.toLowerCase().includes(search.toLowerCase()))
          .map(th => ({ ...th, kapitelTitle: k.title, kapitelIcon: k.icon }))
      )
    : []

  // Group themen
  const grouped = {}
  activeKap?.themen.forEach(th => {
    const g = getGroup(th.title)
    if (!grouped[g]) grouped[g] = []
    grouped[g].push(th)
  })
  const orderedGroups = GROUP_ORDER.filter(g => grouped[g]?.length > 0)

  return (
    <div className={styles.page}>

      {/* ── TOPBAR ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.back}>{t.back}</Link>

          <div className={styles.topBarCenter}>
            <span className={styles.topIcon}>{fachIcon}</span>
            <h1 className={styles.topTitle} style={{ color: fach.color }}>{fachName}</h1>
          </div>

          {/* Search */}
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

      {/* ── BODY: sidebar + content ── */}
      <div className={`${styles.body} ${isRTL ? styles.bodyRTL : ''}`}>

        {/* ── SIDEBAR (left for DE/EN, right for FA) ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLabel}>
            {lang === 'fa' ? 'فصل‌ها' : lang === 'en' ? 'Chapters' : 'Kapitel'}
          </div>
          {fach.kapitel.map((k, i) => (
            <button
              key={k.id}
              className={`${styles.sideBtn} ${i === activeIdx && !searchActive ? styles.sideBtnActive : ''}`}
              style={i === activeIdx && !searchActive ? {
                borderLeftColor: isRTL ? 'transparent' : fach.color,
                borderRightColor: isRTL ? fach.color : 'transparent',
                color: fach.color,
                background: fach.color + '10',
              } : {}}
              onClick={() => { setActiveIdx(i); setSearch('') }}
            >
              <span className={styles.sideBtnIcon}>{k.icon}</span>
              <span className={styles.sideBtnText}>{getKapitelTitle(k)}</span>
              <span className={styles.sideBtnCount}
                style={i === activeIdx && !searchActive ? { color: fach.color } : {}}>
                {k.themen.length}
              </span>
            </button>
          ))}

          {/* Ready link */}
          {activeKap?.ready && activeKap?.link && (
            <div className={styles.sideReady}>
              <span>✓</span>
              <Link href={activeKap.link} className={styles.sideReadyLink}>{t.readNow}</Link>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className={`${styles.main} ${mounted ? styles.mainIn : ''}`}>

          {searchActive ? (
            /* Search results */
            <div className={styles.searchResults}>
              {searchResults.length === 0 ? (
                <p className={styles.noResult}>{t.noResult} „{search}"</p>
              ) : searchResults.map((th, i) => (
                <div key={i} className={styles.searchRow}>
                  <span className={styles.searchRowChapter}>
                    {th.kapitelIcon} {th.kapitelTitle}
                  </span>
                  <span className={styles.searchRowTitle}>{th.title}</span>
                </div>
              ))}
            </div>
          ) : activeKap ? (
            <>
              {/* Chapter header */}
              <div className={styles.chapterHeader}>
                <span className={styles.chapterIcon}>{activeKap.icon}</span>
                <div>
                  <h2 className={styles.chapterTitle}>{getKapitelTitle(activeKap)}</h2>
                  <p className={styles.chapterMeta}>
                    {activeKap.themen.length} {t.themen}
                  </p>
                </div>
                <div className={styles.chapterAccent} style={{background: fach.color}}/>
              </div>

              {/* Ready banner */}
              {activeKap.ready && activeKap.link && (
                <div className={styles.readyBanner}>
                  <span>📖 {t.available}</span>
                  <Link href={activeKap.link} className={styles.readyLink}>{t.readNow}</Link>
                </div>
              )}

              {/* Grouped themen */}
              <div className={styles.groups}>
                {orderedGroups.map(g => {
                  const c = GROUP_COLORS[g]
                  return (
                    <div key={g} className={styles.groupSection}>
                      <div className={styles.groupHeader}>
                        <span className={styles.groupBadge}
                          style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                          {t[g] || g}
                        </span>
                        <span className={styles.groupCount}>{grouped[g].length}</span>
                      </div>
                      <div className={styles.themaGrid}>
                        {grouped[g].map(th => (
                          <div key={th.id} className={styles.themaCard}>
                            <span className={styles.themaDot} style={{ background: fach.color }} />
                            <span className={styles.themaTitle}>{th.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>


            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}
