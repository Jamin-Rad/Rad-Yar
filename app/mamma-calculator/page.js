'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const MATRIX = {
  rund: { diffus: '3', regional: '3', gruppiert: '3', linear: '3', segmental: '4B' },
  amorph: { diffus: '3', regional: '3', gruppiert: '4B', linear: '4B', segmental: '4B' },
  grob_heterogen: { diffus: '3', regional: '3', gruppiert: '4A', linear: '4B', segmental: '4B' },
  fein_pleomorph: { diffus: '4B', regional: '4B', gruppiert: '4C', linear: '4C', segmental: '4C' },
  fein_linear: { diffus: '4C', regional: '4B', gruppiert: '4C', linear: '5', segmental: '5' },
}

const MORPHS = ['rund', 'amorph', 'grob_heterogen', 'fein_pleomorph', 'fein_linear']
const DISTS = ['diffus', 'regional', 'gruppiert', 'linear', 'segmental']
const CATEGORIES = ['3', '4A', '4B', '4C', '5']

const MORPH_LABELS = {
  rund: { de: 'Rund / oval', en: 'Round / oval', fa: 'گرد / بیضی' },
  amorph: { de: 'Amorph', en: 'Amorphous', fa: 'بی‌شکل' },
  grob_heterogen: { de: 'Grob heterogen', en: 'Coarse heterogeneous', fa: 'ناهمگن درشت' },
  fein_pleomorph: { de: 'Fein pleomorph', en: 'Fine pleomorphic', fa: 'پلئومورف ریز' },
  fein_linear: { de: 'Fein linear / verzweigt', en: 'Fine linear / branching', fa: 'خطی ریز / شاخه‌دار' },
}

const DIST_LABELS = {
  diffus: { de: 'Diffus', en: 'Diffuse', fa: 'منتشر' },
  regional: { de: 'Regional', en: 'Regional', fa: 'ناحیه‌ای' },
  gruppiert: { de: 'Gruppiert', en: 'Grouped', fa: 'گروهی' },
  linear: { de: 'Linear', en: 'Linear', fa: 'خطی' },
  segmental: { de: 'Segmental', en: 'Segmental', fa: 'سگمنتال' },
}

const INTERPRETATION = {
  '3': {
    de: { risk: '< 2 %', action: 'Verlaufskontrolle in 6 Monaten' },
    en: { risk: '< 2 %', action: 'Short-interval follow-up at 6 months' },
    fa: { risk: '< ۲٪', action: 'پیگیری کوتاه‌مدت ۶ ماهه' },
  },
  '4A': {
    de: { risk: '2 – 10 %', action: 'Biopsie erwägen' },
    en: { risk: '2 – 10 %', action: 'Consider biopsy' },
    fa: { risk: '۲ – ۱۰٪', action: 'بیوپسی در نظر گرفته شود' },
  },
  '4B': {
    de: { risk: '10 – 50 %', action: 'Biopsie empfohlen' },
    en: { risk: '10 – 50 %', action: 'Biopsy recommended' },
    fa: { risk: '۱۰ – ۵۰٪', action: 'بیوپسی توصیه می‌شود' },
  },
  '4C': {
    de: { risk: '50 – 95 %', action: 'Biopsie dringend empfohlen' },
    en: { risk: '50 – 95 %', action: 'Biopsy strongly recommended' },
    fa: { risk: '۵۰ – ۹۵٪', action: 'بیوپسی اکیداً توصیه می‌شود' },
  },
  '5': {
    de: { risk: '> 95 %', action: 'Biopsie obligat' },
    en: { risk: '> 95 %', action: 'Biopsy mandatory' },
    fa: { risk: '> ۹۵٪', action: 'بیوپسی الزامی است' },
  },
}

const COPY = {
  de: {
    brand: 'MAMMA RECHNER', toolBy: 'Ein Tool von', hero: <>Klar entscheiden.<br />Sicher einordnen.</>,
    intro: 'BI-RADS®-Orientierung für mammographische Verkalkungen – schnell, fokussiert und direkt am Befund.',
    morph: 'Morphologie', distribution: 'Verteilung', assessment: 'Ihre Einschätzung',
    emptyTitle: 'Zwei Merkmale. Eine klare Orientierung.', emptyText: 'Morphologie und Verteilung auswählen',
    risk: 'Malignitätsrisiko', base: 'Basiskategorie', modifiers: 'Modifikatoren', reset: 'Auswahl zurücksetzen',
    disclaimer: 'Orientierungshilfe · ersetzt nicht die ärztliche Befundung',
    context: <>Mehr Kontext.<br />Bessere Einordnung.</>,
    contextText: 'Klinische Hinweise können die Basiskategorie gezielt anpassen.', yes: 'Ja', no: 'Nein',
    matrix: 'BI-RADS Referenz', matrixMorph: 'Morphologie',
    close: <>Entwickelt für den Moment<br />zwischen Bild und Befund.</>,
    rethink: 'Radiologie weiterdenken', sources: 'ACR BI-RADS® Atlas · 5. Auflage',
    mods: {
      masse: { name: 'Masse / Architekturstörung', desc: 'Assoziierte Läsion vorhanden', delta: '+1' },
      alter: { name: 'Alter / persönliche Anamnese', desc: 'Erhöhtes individuelles Risiko', delta: '+1' },
      groesse: { name: 'Herdgröße ≥ 15 mm', desc: 'Ausgedehnte Kalzifikationsgruppe', delta: '+1' },
      stabilitaet: { name: 'Stabilität ≥ 2 Jahre', desc: 'Keine Progredienz im Verlauf', delta: '−1' },
    },
  },
  en: {
    brand: 'MAMMA CALCULATOR', toolBy: 'A tool by', hero: <>Decide clearly.<br />Classify confidently.</>,
    intro: 'BI-RADS® guidance for mammographic calcifications – fast, focused and right at the point of reporting.',
    morph: 'Morphology', distribution: 'Distribution', assessment: 'Your assessment',
    emptyTitle: 'Two features. One clear direction.', emptyText: 'Select morphology and distribution',
    risk: 'Malignancy risk', base: 'Base category', modifiers: 'Modifiers', reset: 'Reset selection',
    disclaimer: 'Decision aid · does not replace physician assessment',
    context: <>More context.<br />Better classification.</>,
    contextText: 'Clinical clues can refine the base category.', yes: 'Yes', no: 'No',
    matrix: 'BI-RADS reference', matrixMorph: 'Morphology',
    close: <>Built for the moment<br />between image and report.</>,
    rethink: 'Rethink radiology', sources: 'ACR BI-RADS® Atlas · 5th edition',
    mods: {
      masse: { name: 'Mass / architectural distortion', desc: 'Associated lesion present', delta: '+1' },
      alter: { name: 'Age / personal history', desc: 'Elevated individual risk', delta: '+1' },
      groesse: { name: 'Cluster size ≥ 15 mm', desc: 'Extensive calcification group', delta: '+1' },
      stabilitaet: { name: 'Stability ≥ 2 years', desc: 'No progression on follow-up', delta: '−1' },
    },
  },
  fa: {
    brand: 'MAMMA RECHNER', toolBy: 'ابزاری از', hero: <>شفاف تصمیم بگیرید.<br />مطمئن دسته‌بندی کنید.</>,
    intro: 'راهنمای BI-RADS® برای کلسیفیکاسیون‌های ماموگرافی؛ سریع، متمرکز و در لحظه‌ی گزارش.',
    morph: 'مورفولوژی', distribution: 'توزیع', assessment: 'ارزیابی شما',
    emptyTitle: 'دو ویژگی. یک مسیر روشن.', emptyText: 'مورفولوژی و توزیع را انتخاب کنید',
    risk: 'خطر بدخیمی', base: 'دسته‌بندی پایه', modifiers: 'اصلاح‌کننده‌ها', reset: 'پاک کردن انتخاب‌ها',
    disclaimer: 'ابزار راهنما · جایگزین تفسیر پزشک نیست',
    context: <>اطلاعات بیشتر.<br />دسته‌بندی دقیق‌تر.</>,
    contextText: 'نکات بالینی می‌توانند دسته‌بندی پایه را هدفمند تنظیم کنند.', yes: 'بله', no: 'خیر',
    matrix: 'مرجع BI-RADS', matrixMorph: 'مورفولوژی',
    close: <>طراحی‌شده برای لحظه‌ی<br />بین تصویر و گزارش.</>,
    rethink: 'نگاهی تازه به رادیولوژی', sources: 'اطلس ACR BI-RADS® · ویرایش پنجم',
    mods: {
      masse: { name: 'توده / اختلال معماری', desc: 'ضایعه‌ی همراه وجود دارد', delta: '+۱' },
      alter: { name: 'سن / سابقه شخصی', desc: 'ریسک فردی افزایش یافته', delta: '+۱' },
      groesse: { name: 'اندازه کانون ≥ ۱۵ میلی‌متر', desc: 'گروه کلسیفیکاسیون گسترده', delta: '+۱' },
      stabilitaet: { name: 'پایداری ≥ ۲ سال', desc: 'بدون پیشرفت در پیگیری', delta: '−۱' },
    },
  },
}

const CATEGORY_CLASS = { '3': 'cat3', '4A': 'cat4a', '4B': 'cat4b', '4C': 'cat4c', '5': 'cat5' }

function ArrowUpRight() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M6 4h8v8" /></svg>
}

function Chevron() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
}

function CalcificationMark({ type }) {
  const dots = {
    rund: [[6, 8], [14, 5], [21, 9], [10, 17], [19, 19]],
    amorph: [[7, 7], [16, 6], [22, 12], [9, 18], [17, 20]],
    grob_heterogen: [[7, 8], [17, 5], [22, 15], [10, 20], [17, 17]],
    fein_pleomorph: [[5, 9], [12, 5], [19, 8], [24, 14], [15, 15], [8, 20], [20, 22]],
    fein_linear: [[5, 20], [9, 17], [13, 14], [17, 11], [21, 8], [24, 5]],
  }[type]
  return (
    <svg className={styles.calcMark} viewBox="0 0 30 28" aria-hidden="true">
      {dots.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={type === 'grob_heterogen' ? (index % 2 ? 2 : 1.4) : 1.25} />)}
      {type === 'fein_linear' ? <path d="m4 22 22-19" /> : null}
    </svg>
  )
}

function DistributionMark({ type }) {
  return (
    <svg className={styles.distMark} viewBox="0 0 30 28" aria-hidden="true">
      {type === 'diffus' ? <><circle cx="6" cy="7" r="1"/><circle cx="20" cy="5" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="24" cy="20" r="1"/><circle cx="7" cy="22" r="1"/></> : null}
      {type === 'regional' ? <><circle cx="10" cy="8" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="21" cy="11" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="19" cy="20" r="1"/><path d="M5 14c1-7 6-11 12-11 6 0 10 5 10 11 0 7-5 11-11 11S5 21 5 14Z" /></> : null}
      {type === 'gruppiert' ? <><circle cx="11" cy="10" r="1.4"/><circle cx="17" cy="8" r="1.4"/><circle cx="21" cy="14" r="1.4"/><circle cx="14" cy="18" r="1.4"/><circle cx="8" cy="16" r="1.4"/></> : null}
      {type === 'linear' ? <><circle cx="15" cy="5" r="1.2"/><circle cx="15" cy="10" r="1.2"/><circle cx="15" cy="15" r="1.2"/><circle cx="15" cy="20" r="1.2"/><circle cx="15" cy="25" r="1.2"/></> : null}
      {type === 'segmental' ? <><path d="M15 4v7M15 11 8 22M15 11l7 11"/><circle cx="15" cy="4" r="1.2"/><circle cx="8" cy="22" r="1.2"/><circle cx="22" cy="22" r="1.2"/></> : null}
    </svg>
  )
}

function OptionButton({ selected, onClick, children, icon }) {
  return (
    <button type="button" className={`${styles.option} ${selected ? styles.optionSelected : ''}`} onClick={onClick} aria-pressed={selected}>
      <span className={styles.radio} aria-hidden="true"><span /></span>
      {icon}
      <span className={styles.optionText}>{children}</span>
      <span className={styles.chevron}><Chevron /></span>
    </button>
  )
}

function LanguageSwitch({ lang, setLang }) {
  return (
    <div className={styles.languages} aria-label="Language">
      {['de', 'en', 'fa'].map(code => (
        <button key={code} type="button" className={lang === code ? styles.languageActive : ''} onClick={() => setLang(code)} aria-pressed={lang === code}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function MammaRechnerPage() {
  const { lang, setLang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const isRTL = lang === 'fa'
  const [morph, setMorph] = useState('')
  const [dist, setDist] = useState('')
  const [mods, setMods] = useState({ masse: false, alter: false, groesse: false, stabilitaet: false })

  const base = morph && dist ? MATRIX[morph][dist] : null
  let result = base
  if (result) {
    let index = CATEGORIES.indexOf(result)
    if (mods.masse) index = Math.min(index + 1, CATEGORIES.length - 1)
    if (mods.alter) index = Math.min(index + 1, CATEGORIES.length - 1)
    if (mods.groesse) index = Math.min(index + 1, CATEGORIES.length - 1)
    if (mods.stabilitaet) index = Math.max(index - 1, 0)
    result = CATEGORIES[index]
  }

  const interpretation = result ? INTERPRETATION[result][lang] || INTERPRETATION[result].de : null
  const resultClass = result ? styles[CATEGORY_CLASS[result]] : ''
  const homeHref = lang === 'de' ? '/' : `/?lang=${lang}`

  const reset = () => {
    setMorph('')
    setDist('')
    setMods({ masse: false, alter: false, groesse: false, stabilitaet: false })
  }

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <Link href="/mamma-calculator" className={styles.wordmark} lang="en">{ui.brand}</Link>
        <div className={styles.headerActions}>
          <Link href={homeHref} className={styles.radyarLink}>
            <span>{ui.toolBy} <strong lang="en">RadYar</strong></span><ArrowUpRight />
          </Link>
          <LanguageSwitch lang={lang} setLang={setLang} />
        </div>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroArt} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <h1>{ui.hero}<span className={styles.period}>.</span></h1>
          <p>{ui.intro}</p>
        </div>

        <section className={styles.calculator} aria-label={ui.assessment}>
          <div className={styles.choices}>
            <fieldset>
              <legend><span>1</span>{ui.morph}</legend>
              <div className={styles.optionList}>
                {MORPHS.map(key => (
                  <OptionButton key={key} selected={morph === key} onClick={() => setMorph(key)} icon={<CalcificationMark type={key} />}>
                    {MORPH_LABELS[key][lang] || MORPH_LABELS[key].de}
                  </OptionButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>2</span>{ui.distribution}</legend>
              <div className={styles.optionList}>
                {DISTS.map(key => (
                  <OptionButton key={key} selected={dist === key} onClick={() => setDist(key)} icon={<DistributionMark type={key} />}>
                    {DIST_LABELS[key][lang] || DIST_LABELS[key].de}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className={`${styles.result} ${resultClass}`} aria-live="polite">
            <h2>{ui.assessment}</h2>
            <div className={styles.resultRing}>
              <span className={styles.resultLabel}>{result ? 'BI-RADS' : ''}</span>
              <strong>{result || '—'}</strong>
            </div>
            {result ? (
              <div className={styles.resultDetails}>
                <div><span>{ui.risk}</span><strong>{interpretation.risk}</strong></div>
                <p>{interpretation.action}</p>
                {base !== result ? <small>{ui.base}: BI-RADS {base}</small> : null}
              </div>
            ) : (
              <div className={styles.emptyResult}>
                <strong>{ui.emptyTitle}</strong>
                <span>{ui.emptyText}</span>
              </div>
            )}
            {(morph || dist) ? <button type="button" className={styles.resetButton} onClick={reset}>{ui.reset}</button> : null}
          </aside>

          <div className={styles.disclaimer}>
            <svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7"/><path d="M9 8v5M9 5.4v.2"/></svg>
            <span>{ui.disclaimer}</span>
          </div>
        </section>
      </section>

      <section className={styles.contextSection}>
        <div className={styles.contextHeading}>
          <h2>{ui.context}<span className={styles.period}>.</span></h2>
          <p>{ui.contextText}</p>
        </div>

        <div className={styles.modifierRail}>
          {Object.entries(ui.mods).map(([key, mod]) => (
            <div className={styles.modifier} key={key}>
              <div className={styles.modifierHeading}>
                <span className={styles.modifierIndex}>{String(Object.keys(ui.mods).indexOf(key) + 1).padStart(2, '0')}</span>
                <div><strong>{mod.name}</strong><small>{mod.desc}</small></div>
                <span className={styles.delta}>{mod.delta}</span>
              </div>
              <div className={styles.segmented}>
                <button type="button" className={!mods[key] ? styles.segmentActive : ''} onClick={() => setMods(prev => ({ ...prev, [key]: false }))}>{ui.no}</button>
                <button type="button" className={mods[key] ? styles.segmentActive : ''} onClick={() => setMods(prev => ({ ...prev, [key]: true }))}>{ui.yes}</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.matrixBlock}>
          <div className={styles.matrixTitle}><span />{ui.matrix}</div>
          <div className={styles.matrixScroll}>
            <table className={styles.matrix}>
              <thead><tr><th>{ui.matrixMorph}</th>{DISTS.map(key => <th key={key}>{DIST_LABELS[key][lang] || DIST_LABELS[key].de}</th>)}</tr></thead>
              <tbody>
                {MORPHS.map(morphKey => (
                  <tr key={morphKey}>
                    <th>{MORPH_LABELS[morphKey][lang] || MORPH_LABELS[morphKey].de}</th>
                    {DISTS.map(distKey => {
                      const value = MATRIX[morphKey][distKey]
                      const highlighted = morph === morphKey && dist === distKey
                      return <td key={distKey} className={`${styles[CATEGORY_CLASS[value]]} ${highlighted ? styles.matrixSelected : ''}`}>BI-RADS {value}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.closing}><span /><h2>{ui.close}<span className={styles.period}>.</span></h2></div>
        <div className={styles.footerLine}>
          <Link href={homeHref} className={styles.footerBrand} lang="en">Rad<span>Yar</span></Link>
          <small>{ui.sources}</small>
          <Link href={homeHref} className={styles.footerLink}>{ui.rethink}<ArrowUpRight /></Link>
        </div>
      </footer>
    </main>
  )
}
