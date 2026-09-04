'use client'
import { useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const MATRIX = {
  rund:           { diffus: '3',  regional: '3',  gruppiert: '3',  linear: '3',  segmental: '4B' },
  amorph:         { diffus: '3',  regional: '3',  gruppiert: '4B', linear: '4B', segmental: '4B' },
  grob_heterogen: { diffus: '3',  regional: '3',  gruppiert: '4A', linear: '4B', segmental: '4B' },
  fein_pleomorph: { diffus: '4B', regional: '4B', gruppiert: '4C', linear: '4C', segmental: '4C' },
  fein_linear:    { diffus: '4C', regional: '4B', gruppiert: '4C', linear: '5',  segmental: '5'  },
}

const MORPH_LABELS = {
  rund:           { de: 'Rund / oval',              en: 'Round / oval',              fa: 'گرد / بیضی' },
  amorph:         { de: 'Amorph',                   en: 'Amorphous',                 fa: 'بی‌شکل' },
  grob_heterogen: { de: 'Grob heterogen',            en: 'Coarse heterogeneous',      fa: 'ناهمگن درشت' },
  fein_pleomorph: { de: 'Fein pleomorph',            en: 'Fine pleomorphic',          fa: 'پلئومورف ریز' },
  fein_linear:    { de: 'Fein linear / verzweigt',   en: 'Fine linear / branching',   fa: 'خطی ریز / شاخه‌دار' },
}

const DIST_LABELS = {
  diffus:    { de: 'Diffus',     en: 'Diffuse',   fa: 'منتشر' },
  regional:  { de: 'Regional',   en: 'Regional',  fa: 'ناحیه‌ای' },
  gruppiert: { de: 'Gruppiert',  en: 'Grouped',   fa: 'گروهی' },
  linear:    { de: 'Linear',     en: 'Linear',    fa: 'خطی' },
  segmental: { de: 'Segmental',  en: 'Segmental', fa: 'سگمنتال' },
}

const INTERP = {
  '3':  {
    de: { risk: '< 2 %',       action: 'Verlaufskontrolle in 6 Monaten (Kurzzeit-Follow-up)' },
    en: { risk: '< 2 %',       action: 'Short-interval follow-up at 6 months' },
    fa: { risk: '< ۲٪',        action: 'پیگیری کوتاه‌مدت ۶ ماهه' },
  },
  '4A': {
    de: { risk: '2 – 10 %',    action: 'Biopsie erwägen' },
    en: { risk: '2 – 10 %',    action: 'Biopsy should be considered' },
    fa: { risk: '۲ – ۱۰٪',     action: 'بیوپسی توصیه می‌شود' },
  },
  '4B': {
    de: { risk: '10 – 50 %',   action: 'Biopsie empfohlen' },
    en: { risk: '10 – 50 %',   action: 'Biopsy recommended' },
    fa: { risk: '۱۰ – ۵۰٪',    action: 'بیوپسی توصیه می‌شود' },
  },
  '4C': {
    de: { risk: '50 – 95 %',   action: 'Biopsie dringend empfohlen' },
    en: { risk: '50 – 95 %',   action: 'Biopsy strongly recommended' },
    fa: { risk: '۵۰ – ۹۵٪',    action: 'بیوپسی اکیداً توصیه می‌شود' },
  },
  '5':  {
    de: { risk: '> 95 %',      action: 'Biopsie obligat — Malignom bis zum Beweis des Gegenteils' },
    en: { risk: '> 95 %',      action: 'Biopsy mandatory — assume malignancy until proven otherwise' },
    fa: { risk: '> ۹۵٪',       action: 'بیوپسی اجباری — تا زمان رد شدن، بدخیمی فرض می‌شود' },
  },
}

const CAT_ORDER = ['3', '4A', '4B', '4C', '5']
const CELL_CLASS = { '3': 'c3', '4A': 'c4a', '4B': 'c4b', '4C': 'c4c', '5': 'c5' }
const BADGE_CLASS = { '3': 'b3', '4A': 'b4a', '4B': 'b4b', '4C': 'b4c', '5': 'b5' }

const DISTS = ['diffus', 'regional', 'gruppiert', 'linear', 'segmental']
const MORPHS = ['rund', 'amorph', 'grob_heterogen', 'fein_pleomorph', 'fein_linear']

const TOP_COLORS = {
  '3': '#16a34a', '4A': '#0891b2', '4B': '#2563eb', '4C': '#d97706', '5': '#dc2626',
}

function t(obj, lang) {
  return obj?.[lang] ?? obj?.de ?? ''
}

export default function BiRadsKalzifikationPage() {
  const { lang } = useLanguage()
  const [morph, setMorph] = useState('')
  const [dist, setDist]   = useState('')
  const [mods, setMods]   = useState({ masse: false, alter: false, groesse: false, stabilitaet: false })

  const base = morph && dist ? MATRIX[morph][dist] : null

  const result = base ? (() => {
    let idx = CAT_ORDER.indexOf(base)
    if (mods.masse)       idx = Math.min(idx + 1, CAT_ORDER.length - 1)
    if (mods.alter)       idx = Math.min(idx + 1, CAT_ORDER.length - 1)
    if (mods.groesse)     idx = Math.min(idx + 1, CAT_ORDER.length - 1)
    if (mods.stabilitaet) idx = Math.max(idx - 1, 0)
    return CAT_ORDER[idx]
  })() : null

  const interp  = result ? INTERP[result][lang] ?? INTERP[result].de : null
  const modified = result && base && result !== base
  const activeModCount = Object.values(mods).filter(Boolean).length

  function toggleMod(key) {
    setMods(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const UI = {
    de: {
      eyebrow: 'Dr. Zia',
      title: 'BI-RADS · Kalzifikation',
      sub: 'Direkte Kategorisierung mammographischer Verkalkungen nach Morphologie und Verteilungsmuster gemäß ACR BI-RADS® 5. Auflage.',
      breadMamma: 'Mamma',
      breadRechner: 'Rechner',
      sectionCalc: 'Kalzifikation bewerten',
      labelMorph: 'Morphologie',
      labelDist: 'Verteilungsmuster',
      placeholderMorph: '— Morphologie wählen —',
      placeholderDist: '— Verteilung wählen —',
      sectionResult: 'Ergebnis',
      emptyResult: 'Bitte Morphologie und Verteilung auswählen',
      modifiedNote: (count) => `Basiswert BI-RADS ${base} · durch ${count} Modifikator${count > 1 ? 'en' : ''} angepasst`,
      sectionMods: 'Modifikatoren',
      sectionMatrix: 'Referenzmatrix',
      matrixColLabel: 'Morphologie ↓',
      mods: {
        masse:       { name: '↑ Masse / Architekturstörung', desc: 'Assoziierte Läsion vorhanden' },
        alter:       { name: '↑ Alter / pers. Anamnese',      desc: 'Erhöhtes individuelles Risiko' },
        groesse:     { name: 'Herd-Größe ≥ 15 mm',            desc: 'Ausgedehnte Kalzifikationsgruppe' },
        stabilitaet: { name: '↓ Stabilität (≥ 2 Jahre)',      desc: 'Keine Progredienz im Verlauf' },
      },
      malignLabel: 'Malignitätsrisiko',
      legend: [
        { cls: '#16a34a', label: 'BI-RADS 3 — wahrscheinlich benigne' },
        { cls: '#0891b2', label: '4A — gering suspekt' },
        { cls: '#2563eb', label: '4B — mäßig suspekt' },
        { cls: '#d97706', label: '4C — stark suspekt' },
        { cls: '#dc2626', label: '5 — hochgradig malignomverdächtig' },
      ],
      refLabel: 'Quellen',
    },
    en: {
      eyebrow: 'Dr. Zia',
      title: 'BI-RADS · Calcification',
      sub: 'Direct categorization of mammographic calcifications by morphology and distribution per ACR BI-RADS® 5th Edition.',
      breadMamma: 'Breast',
      breadRechner: 'Calculators',
      sectionCalc: 'Assess Calcification',
      labelMorph: 'Morphology',
      labelDist: 'Distribution',
      placeholderMorph: '— Select morphology —',
      placeholderDist: '— Select distribution —',
      sectionResult: 'Result',
      emptyResult: 'Select morphology and distribution to calculate',
      modifiedNote: (count) => `Base value BI-RADS ${base} · adjusted by ${count} modifier${count > 1 ? 's' : ''}`,
      sectionMods: 'Modifiers',
      sectionMatrix: 'Reference Matrix',
      matrixColLabel: 'Morphology ↓',
      mods: {
        masse:       { name: '↑ Mass / Arch. distortion', desc: 'Associated lesion present' },
        alter:       { name: '↑ Age / Personal history',  desc: 'Elevated individual risk' },
        groesse:     { name: 'Cluster size ≥ 15 mm',      desc: 'Extensive calcification group' },
        stabilitaet: { name: '↓ Stability (≥ 2 years)',   desc: 'No progression on follow-up' },
      },
      malignLabel: 'Malignancy risk',
      legend: [
        { cls: '#16a34a', label: 'BI-RADS 3 — probably benign' },
        { cls: '#0891b2', label: '4A — low suspicion' },
        { cls: '#2563eb', label: '4B — moderate suspicion' },
        { cls: '#d97706', label: '4C — high suspicion' },
        { cls: '#dc2626', label: '5 — highly suggestive of malignancy' },
      ],
      refLabel: 'References',
    },
    fa: {
      eyebrow: 'دکتر ضیاء',
      title: 'BI-RADS · کلسیفیکاسیون',
      sub: 'دسته‌بندی مستقیم کلسیفیکاسیون‌های ماموگرافی بر اساس مورفولوژی و الگوی توزیع، طبق ویرایش پنجم ACR BI-RADS®.',
      breadMamma: 'پستان',
      breadRechner: 'ماشین‌حساب',
      sectionCalc: 'ارزیابی کلسیفیکاسیون',
      labelMorph: 'مورفولوژی',
      labelDist: 'الگوی توزیع',
      placeholderMorph: '— مورفولوژی را انتخاب کنید —',
      placeholderDist: '— توزیع را انتخاب کنید —',
      sectionResult: 'نتیجه',
      emptyResult: 'لطفاً مورفولوژی و توزیع را انتخاب کنید',
      modifiedNote: (count) => `مقدار پایه BI-RADS ${base} · با ${count} اصلاح‌کننده تنظیم شد`,
      sectionMods: 'اصلاح‌کننده‌ها',
      sectionMatrix: 'ماتریس مرجع',
      matrixColLabel: 'مورفولوژی ↓',
      mods: {
        masse:       { name: '↑ توده / اختلال معماری', desc: 'ضایعه همراه وجود دارد' },
        alter:       { name: '↑ سن / سابقه شخصی',       desc: 'ریسک فردی بالا' },
        groesse:     { name: 'اندازه ≥ ۱۵ میلی‌متر',     desc: 'گروه کلسیفیکاسیون گسترده' },
        stabilitaet: { name: '↓ پایداری (≥ ۲ سال)',      desc: 'بدون پیشرفت در پیگیری' },
      },
      malignLabel: 'خطر بدخیمی',
      legend: [
        { cls: '#16a34a', label: 'BI-RADS 3 — احتمالاً خوش‌خیم' },
        { cls: '#0891b2', label: '4A — شک کم' },
        { cls: '#2563eb', label: '4B — شک متوسط' },
        { cls: '#d97706', label: '4C — شک زیاد' },
        { cls: '#dc2626', label: '5 — بسیار مشکوک به بدخیمی' },
      ],
      refLabel: 'منابع',
    },
  }

  const ui = UI[lang] ?? UI.de

  return (
    <main className={styles.page}>
      <InProgressBanner lang={lang} />
      <div className={styles.inner}>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/mamma">{ui.breadMamma}</Link>
          <span>›</span>
          <span>{ui.breadRechner}</span>
          <span>›</span>
          <span>BI-RADS</span>
        </nav>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.sourceBadge}>{ui.eyebrow}</div>
          <h1 className={styles.heroTitle}>{ui.title}</h1>
          <p className={styles.heroSub}>{ui.sub}</p>
        </div>

        {/* Input Card */}
        <div className={styles.card}>
          <div className={styles.cardLabel}>{ui.sectionCalc}</div>
          <div className={styles.inputsRow}>
            <div className={styles.field}>
              <label htmlFor="morph">{ui.labelMorph}</label>
              <select
                id="morph"
                value={morph}
                onChange={e => setMorph(e.target.value)}
              >
                <option value="">{ui.placeholderMorph}</option>
                {MORPHS.map(k => (
                  <option key={k} value={k}>{t(MORPH_LABELS[k], lang)}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="dist">{ui.labelDist}</label>
              <select
                id="dist"
                value={dist}
                onChange={e => setDist(e.target.value)}
              >
                <option value="">{ui.placeholderDist}</option>
                {DISTS.map(k => (
                  <option key={k} value={k}>{t(DIST_LABELS[k], lang)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className={styles.resultCard}>
          <div
            className={styles.resultTopBar}
            style={{ background: result ? TOP_COLORS[result] : 'var(--border)' }}
          />
          <div className={styles.cardLabel}>{ui.sectionResult}</div>

          <div className={`${styles.badge} ${result ? styles[BADGE_CLASS[result]] : styles.empty}`}>
            {result ?? '—'}
          </div>

          <div className={styles.resultText}>
            {result ? (
              <>
                <div className={`${styles.riskPill} ${styles[BADGE_CLASS[result]]}`}>
                  {ui.malignLabel}: {interp.risk}
                </div>
                <div className={styles.resultAction}>{interp.action}</div>
              </>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>{ui.emptyResult}</span>
            )}
          </div>

          {modified && (
            <div className={`${styles.modNote} ${styles.show}`}>
              {ui.modifiedNote(activeModCount)}
            </div>
          )}
        </div>

        {/* Modifiers */}
        <div className={styles.card}>
          <div className={styles.cardLabel}>{ui.sectionMods}</div>
          <div className={styles.modsGrid}>
            {[
              { key: 'masse',       dir: 'up' },
              { key: 'alter',       dir: 'up' },
              { key: 'groesse',     dir: 'up' },
              { key: 'stabilitaet', dir: 'down' },
            ].map(({ key, dir }) => (
              <button
                key={key}
                type="button"
                className={`${styles.modBtn} ${mods[key] ? styles.on : ''}`}
                onClick={() => toggleMod(key)}
                aria-pressed={mods[key]}
              >
                <div className={styles.modCheck}>
                  {mods[key] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className={styles.modInfo}>
                  <div className={styles.modName}>{ui.mods[key].name}</div>
                  <div className={styles.modDesc}>{ui.mods[key].desc}</div>
                </div>
                <span className={`${styles.modTag} ${styles[dir]}`}>{dir === 'up' ? '+1' : '−1'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reference Matrix */}
        <div className={styles.card}>
          <div className={styles.cardLabel}>{ui.sectionMatrix}</div>
          <div className={styles.matrixWrap}>
            <table className={styles.mx}>
              <thead>
                <tr>
                  <th>{ui.matrixColLabel}</th>
                  {DISTS.map(k => <th key={k}>{t(DIST_LABELS[k], lang)}</th>)}
                </tr>
              </thead>
              <tbody>
                {MORPHS.map(m => (
                  <tr key={m}>
                    <td>{t(MORPH_LABELS[m], lang)}</td>
                    {DISTS.map(d => {
                      const val = MATRIX[m][d]
                      const isHL = m === morph && d === dist
                      return (
                        <td
                          key={d}
                          className={[styles[CELL_CLASS[val]], isHL ? styles.hl : ''].join(' ')}
                        >
                          {val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.legend}>
            {ui.legend.map(({ cls, label }) => (
              <div key={label} className={styles.legItem}>
                <div className={styles.legDot} style={{ background: cls }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Reference */}
        <footer className={styles.ref}>
          <strong>{ui.refLabel}:</strong><br />
          Youk et al. · <em>Korean J Radiol</em> · 2019 &nbsp;·&nbsp;
          Rominger et al. · <em>RöFo</em> · 2012<br />
          ACR BI-RADS® Atlas, 5. Auflage · American College of Radiology
        </footer>

      </div>
    </main>
  )
}
