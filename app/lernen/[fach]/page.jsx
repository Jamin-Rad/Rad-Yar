'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { CURRICULUM, getFach } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

// ── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  de: {
    back: '← Alle Fachgebiete',
    kapitel: 'Kapitel',
    themen: 'Themen',
    benigne: 'Benigne',
    maligne: 'Maligne',
    diffus: 'Diffus',
    vaskulaer: 'Vaskulär',
    entzuendlich: 'Entzündlich',
    tumor: 'Tumor',
    sonstiges: 'Sonstiges',
    grundlagen: 'Grundlagen',
    staging: 'Staging',
    search: 'Thema suchen…',
    mcq: 'MCQs starten',
    cases: 'Fallbeispiele',
    soon: 'Bald',
    available: 'Verfügbar',
    readNow: 'Jetzt lesen',
    noResult: 'Kein Treffer',
    difficulty: ['Basis', 'Fortgeschritten', 'Experte'],
  },
  en: {
    back: '← All specialties',
    kapitel: 'Chapter',
    themen: 'Topics',
    benigne: 'Benign',
    maligne: 'Malignant',
    diffus: 'Diffuse',
    vaskulaer: 'Vascular',
    entzuendlich: 'Inflammatory',
    tumor: 'Tumour',
    sonstiges: 'Other',
    grundlagen: 'Basics',
    staging: 'Staging',
    search: 'Search topic…',
    mcq: 'Start MCQs',
    cases: 'Case studies',
    soon: 'Soon',
    available: 'Available',
    readNow: 'Read now',
    noResult: 'No results',
    difficulty: ['Basic', 'Advanced', 'Expert'],
  },
  fa: {
    back: '← همه تخصص‌ها',
    kapitel: 'فصل',
    themen: 'موضوع',
    benigne: 'خوش‌خیم',
    maligne: 'بدخیم',
    diffus: 'منتشر',
    vaskulaer: 'عروقی',
    entzuendlich: 'التهابی',
    tumor: 'تومور',
    sonstiges: 'سایر',
    grundlagen: 'پایه',
    staging: 'استیجینگ',
    search: 'جستجوی موضوع…',
    mcq: 'شروع MCQ',
    cases: 'موارد بالینی',
    soon: 'به زودی',
    available: 'موجود',
    readNow: 'مطالعه کنید',
    noResult: 'نتیجه‌ای یافت نشد',
    difficulty: ['پایه', 'پیشرفته', 'متخصص'],
  },
}

// ── GROUP KEYWORDS → auto-assign group from title ─────────────────────────
function getGroup(title) {
  const t = title.toLowerCase()
  if (/zyste|hämangiom|adenom|fnh|angiomyolipom|hydatide|benigne|fibro|mastopathie|onkozytom|myelolipom|bph|myom|einfache|nof|intraoss|gang/.test(t)) return 'benigne'
  if (/karzinom|sarkom|lymphom|metasta|maligne|hcc|ccc|gbm|glioblastom|ewing|myelom|neuroblastom|nephroblastom|astrozytom|meningeom|medulloblastom|lirads|pirads|birads/.test(t)) return 'maligne'
  if (/steatosis|zirrhose|verfettung|diffus|hämochrom|budd|portale|fibrose|chronisch|morbus|pankreatitis|psc|cholangitis/.test(t)) return 'diffus'
  if (/infarkt|embolie|schlaganfall|blutung|thrombose|dissektion|moya|angiopathie|malformation|hämangioblastom|kavernom|dva|avf|avm|fmd|pavk|nekrose|avn/.test(t)) return 'vaskulaer'
  if (/entzünd|infekt|meningitis|abszess|enzephalitis|spondylodiszitis|bechterew|lyme|gbs|ms |multiple sklerose|neuromyelitis/.test(t)) return 'entzuendlich'
  if (/anatomie|grundlagen|normalbefund|normvariante|physik|technik|befundung|interpretation|screening/.test(t)) return 'grundlagen'
  if (/staging|lirads|pirads|birads|klassifikation|iota/.test(t)) return 'staging'
  if (/tumor|neoplasie|karzinom|net|ipmn|adenokarzinom/.test(t)) return 'tumor'
  return 'sonstiges'
}

const GROUP_ORDER = ['grundlagen','benigne','maligne','diffus','vaskulaer','entzuendlich','tumor','staging','sonstiges']

const GROUP_COLORS = {
  grundlagen:   { bg: '#e0f2fe', text: '#0369a1', border: '#7dd3fc' },
  benigne:      { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  maligne:      { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  diffus:       { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
  vaskulaer:    { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  entzuendlich: { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' },
  tumor:        { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4' },
  staging:      { bg: '#f0fdf4', text: '#14532d', border: '#86efac' },
  sonstiges:    { bg: '#f8fafc', text: '#475569', border: '#cbd5e1' },
}

// Difficulty badge
function DiffBadge({ level, labels }) {
  const colors = [
    { bg: '#dcfce7', text: '#166534' },
    { bg: '#fef9c3', text: '#854d0e' },
    { bg: '#fee2e2', text: '#991b1b' },
  ]
  const c = colors[level - 1] || colors[0]
  return (
    <span className={styles.diffBadge} style={{ background: c.bg, color: c.text }}>
      {labels[level - 1]}
    </span>
  )
}

// ── THEMA CARD ─────────────────────────────────────────────────────────────
function ThemaCard({ thema, fachColor, t }) {
  return (
    <div className={styles.themaCard}>
      <div className={styles.themaCardDot} style={{ background: fachColor }} />
      <span className={styles.themaCardTitle}>{thema.title}</span>
      <DiffBadge level={thema.diff} labels={t.difficulty} />
    </div>
  )
}

// ── GROUP SECTION ──────────────────────────────────────────────────────────
function GroupSection({ group, themen, fachColor, t }) {
  const colors = GROUP_COLORS[group] || GROUP_COLORS.sonstiges
  const label = t[group] || group
  return (
    <div className={styles.groupSection}>
      <div className={styles.groupHeader}>
        <span className={styles.groupBadge}
          style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
          {label}
        </span>
        <span className={styles.groupCount}>{themen.length}</span>
      </div>
      <div className={styles.themaGrid}>
        {themen.map(thema => (
          <ThemaCard key={thema.id} thema={thema} fachColor={fachColor} t={t} />
        ))}
      </div>
    </div>
  )
}

// ── KAPITEL PANEL ──────────────────────────────────────────────────────────
function KapitelPanel({ kapitel, fachColor, fach, t }) {
  // Group themen
  const grouped = {}
  kapitel.themen.forEach(thema => {
    const g = getGroup(thema.title)
    if (!grouped[g]) grouped[g] = []
    grouped[g].push(thema)
  })

  const orderedGroups = GROUP_ORDER.filter(g => grouped[g]?.length > 0)

  return (
    <div className={styles.kapitelPanel}>
      {/* Ready banner */}
      {kapitel.ready && kapitel.link && (
        <div className={styles.readyBanner}>
          <span>📖 Inhalte bereits verfügbar</span>
          <Link href={kapitel.link} className={styles.readyLink}>{t.readNow} →</Link>
        </div>
      )}

      {/* Groups */}
      <div className={styles.groupsWrap}>
        {orderedGroups.map(g => (
          <GroupSection key={g} group={g} themen={grouped[g]} fachColor={fachColor} t={t} />
        ))}
      </div>

      {/* Actions */}
      <div className={styles.panelActions}>
        <button className={styles.actionPrimary}
          style={{ background: fachColor, color: '#060708' }}>
          🎯 {t.mcq}
        </button>
        <button className={styles.actionSecondary}
          style={{ borderColor: fachColor + '60', color: fachColor }}>
          📋 {t.cases}
        </button>
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function LernenFachPage() {
  const params = useParams()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const fach = getFach(params?.fach)
  const [activeKapitel, setActiveKapitel] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setActiveKapitel(0) }, [params?.fach])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Fachgebiet nicht gefunden.</p>
      <Link href="/">← Startseite</Link>
    </div>
  )

  const kapitel = fach.kapitel

  // Search filter
  const searchActive = search.trim().length > 0
  const searchResults = searchActive
    ? fach.kapitel.flatMap(k => k.themen
        .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
        .map(t => ({ ...t, kapitelTitle: k.title }))
      )
    : []

  const activeKap = kapitel[activeKapitel]

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.back}>{t.back}</Link>
          <div className={styles.headerMain}>
            <span className={styles.headerIcon}>{fach.icon}</span>
            <div>
              <h1 className={styles.headerTitle} style={{ color: fach.color }}>
                {fach.key === 'Neuroradiologie' && lang === 'en' ? 'Neuroradiology'
                  : fach.key === 'Muskuloskelettales' && lang === 'en' ? 'Musculoskeletal'
                  : fach.key}
              </h1>
              <p className={styles.headerMeta}>
                {kapitel.length} {t.kapitel} ·{' '}
                {fach.kapitel.reduce((s,k) => s + k.themen.length, 0)} {t.themen}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="#94a3b8" strokeWidth="1.4"/>
              <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input className={styles.searchInput} placeholder={t.search}
              value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button className={styles.searchX} onClick={() => setSearch('')}>✕</button>}
          </div>
        </div>
      </div>

      {/* ── KAPITEL TABS ── */}
      {!searchActive && (
        <div className={styles.tabsWrap}>
          <div className={styles.tabs}>
            {kapitel.map((k, i) => (
              <button
                key={k.id}
                className={`${styles.tab} ${i === activeKapitel ? styles.tabActive : ''}`}
                style={i === activeKapitel ? { borderBottomColor: fach.color, color: fach.color } : {}}
                onClick={() => setActiveKapitel(i)}
              >
                <span className={styles.tabIcon}>{k.icon}</span>
                <span className={styles.tabLabel}>{k.title}</span>
                <span className={styles.tabCount}
                  style={i === activeKapitel ? { background: fach.color + '20', color: fach.color } : {}}>
                  {k.themen.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>
        {searchActive ? (
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <p className={styles.noResult}>{t.noResult} „{search}"</p>
            ) : (
              searchResults.map((thema, i) => (
                <div key={i} className={styles.searchResultRow}>
                  <span className={styles.searchResultChapter}>{thema.kapitelTitle}</span>
                  <span className={styles.searchResultTitle}>{thema.title}</span>
                  <DiffBadge level={thema.diff} labels={t.difficulty} />
                </div>
              ))
            )}
          </div>
        ) : (
          activeKap && (
            <KapitelPanel
              kapitel={activeKap}
              fachColor={fach.color}
              fach={fach}
              t={t}
            />
          )
        )}
      </div>
    </div>
  )
}
