'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TOOLS = [
  { slug: 'birads-mass', icon: 'mass', accent: 'coral' },
  { slug: 'birads-calcifications', icon: 'calc', accent: 'coral' },
  { slug: 'node-rads', icon: 'node', accent: 'violet' },
]

const COPY = {
  de: {
    brand: 'MAMMA RECHNER', by: 'Ein Tool von', overview: 'Übersicht',
    choose: 'Welchen Befund möchten Sie einordnen?', chooseHint: 'Bitte wählen Sie genau ein Tool aus.',
    tools: {
      'birads-mass': { name: 'BI-RADS · Herd', desc: 'Zur Einordnung mammographischer Massen nach Form und Rand.', short: 'Form × Rand' },
      'birads-calcifications': { name: 'BI-RADS · Kalzifikationen', desc: 'Zur Einordnung mammographischer Verkalkungen nach Morphologie und Verteilung.', short: 'Morphologie × Verteilung' },
      'node-rads': { name: 'Node-RADS', desc: 'Zur standardisierten Einordnung von Lymphknotenbefunden in CT und MRT.', short: 'Größe × Konfiguration' },
    },
    assessment: 'Voraussichtliche Einstufung', selectAll: 'Bitte alle Merkmale auswählen.', reset: 'Zurücksetzen',
    disclaimer: 'Orientierungshilfe · ersetzt nicht die ärztliche Gesamtbeurteilung',
    form: 'Form', margin: 'Rand', fat: 'Fetthaltige Masse', fatHint: 'Lipom · Hamartom · Galaktozele',
    morphology: 'Morphologie', distribution: 'Verteilung', size: 'Größe (Kurzachse)', texture: 'Textur', border: 'Rand', nodeShape: 'Form', config: 'Konfigurationssumme',
    risk: 'Malignitätsrisiko', action: 'Konsequenz',
  },
  en: {
    brand: 'MAMMA CALCULATOR', by: 'A tool by', overview: 'Overview',
    choose: 'Which finding would you like to classify?', chooseHint: 'Please select exactly one tool.',
    tools: {
      'birads-mass': { name: 'BI-RADS · Mass', desc: 'Classify mammographic masses by shape and margin.', short: 'Shape × margin' },
      'birads-calcifications': { name: 'BI-RADS · Calcifications', desc: 'Classify mammographic calcifications by morphology and distribution.', short: 'Morphology × distribution' },
      'node-rads': { name: 'Node-RADS', desc: 'Standardised assessment of lymph nodes on CT and MRI.', short: 'Size × configuration' },
    },
    assessment: 'Provisional classification', selectAll: 'Please select all features.', reset: 'Reset',
    disclaimer: 'Decision aid · does not replace integrated physician assessment',
    form: 'Shape', margin: 'Margin', fat: 'Fat-containing mass', fatHint: 'Lipoma · hamartoma · galactocele',
    morphology: 'Morphology', distribution: 'Distribution', size: 'Size (short axis)', texture: 'Texture', border: 'Border', nodeShape: 'Shape', config: 'Configuration total',
    risk: 'Malignancy risk', action: 'Management',
  },
  fa: {
    brand: 'MAMMA RECHNER', by: 'ابزاری از', overview: 'نمای کلی',
    choose: 'کدام یافته را می‌خواهید دسته‌بندی کنید؟', chooseHint: 'لطفاً دقیقاً یک ابزار را انتخاب کنید.',
    tools: {
      'birads-mass': { name: 'BI-RADS · توده', desc: 'دسته‌بندی توده‌های ماموگرافی بر اساس شکل و حاشیه.', short: 'شکل × حاشیه' },
      'birads-calcifications': { name: 'BI-RADS · کلسیفیکاسیون', desc: 'دسته‌بندی کلسیفیکاسیون بر اساس مورفولوژی و توزیع.', short: 'مورفولوژی × توزیع' },
      'node-rads': { name: 'Node-RADS', desc: 'ارزیابی استاندارد غدد لنفاوی در CT و MRI.', short: 'اندازه × پیکربندی' },
    },
    assessment: 'دسته‌بندی احتمالی', selectAll: 'همه ویژگی‌ها را انتخاب کنید.', reset: 'پاک کردن',
    disclaimer: 'ابزار راهنما · جایگزین ارزیابی جامع پزشک نیست',
    form: 'شکل', margin: 'حاشیه', fat: 'توده حاوی چربی', fatHint: 'لیپوم · هامارتوم · گالاکتوسل',
    morphology: 'مورفولوژی', distribution: 'توزیع', size: 'اندازه (محور کوتاه)', texture: 'بافت', border: 'حاشیه', nodeShape: 'شکل', config: 'مجموع پیکربندی',
    risk: 'خطر بدخیمی', action: 'اقدام',
  },
}

const MASS_MATRIX = {
  roundOval: { circumscribed: '3', microlobulated: '4A', indistinct: '4B', angular: '4B', spiculated: '4C' },
  irregular: { circumscribed: '4A', microlobulated: '4B', indistinct: '4B', angular: '4C', spiculated: '5' },
}

const CALC_MATRIX = {
  round: { diffuse: '3', regional: '3', grouped: '3', linear: '3', segmental: '4B' },
  amorphous: { diffuse: '3', regional: '3', grouped: '4B', linear: '4B', segmental: '4B' },
  coarse: { diffuse: '3', regional: '3', grouped: '4A', linear: '4B', segmental: '4B' },
  pleomorphic: { diffuse: '4B', regional: '4B', grouped: '4C', linear: '4C', segmental: '4C' },
  branching: { diffuse: '4C', regional: '4B', grouped: '4C', linear: '5', segmental: '5' },
}

const CATEGORY_INFO = {
  '2': { color: '#18945a', risk: '0 %', de: 'Benigne', en: 'Benign', fa: 'خوش‌خیم', action: { de: 'Keine weitere Abklärung', en: 'No further work-up', fa: 'بدون بررسی بیشتر' } },
  '3': { color: '#18945a', risk: '< 2 %', de: 'Wahrscheinlich benigne', en: 'Probably benign', fa: 'احتمالاً خوش‌خیم', action: { de: 'Verlaufskontrolle in 6 Monaten', en: '6-month follow-up', fa: 'پیگیری ۶ ماهه' } },
  '4A': { color: '#0796af', risk: '2–10 %', de: 'Gering suspekt', en: 'Low suspicion', fa: 'شک کم', action: { de: 'Biopsie erwägen', en: 'Consider biopsy', fa: 'بیوپسی در نظر گرفته شود' } },
  '4B': { color: '#2870cc', risk: '10–50 %', de: 'Mäßig suspekt', en: 'Moderate suspicion', fa: 'شک متوسط', action: { de: 'Biopsie empfohlen', en: 'Biopsy recommended', fa: 'بیوپسی توصیه می‌شود' } },
  '4C': { color: '#d58518', risk: '50–95 %', de: 'Stark suspekt', en: 'High suspicion', fa: 'شک زیاد', action: { de: 'Biopsie dringend empfohlen', en: 'Biopsy strongly recommended', fa: 'بیوپسی اکیداً توصیه می‌شود' } },
  '5': { color: '#d94b47', risk: '> 95 %', de: 'Hochgradig malignomverdächtig', en: 'Highly suspicious', fa: 'بسیار مشکوک', action: { de: 'Biopsie obligat', en: 'Biopsy mandatory', fa: 'بیوپسی الزامی است' } },
}

const MASS_SHAPES = [
  { key: 'roundOval', de: 'Rund / oval', en: 'Round / oval', fa: 'گرد / بیضی' },
  { key: 'irregular', de: 'Irregulär', en: 'Irregular', fa: 'نامنظم' },
]
const MARGINS = [
  { key: 'circumscribed', de: 'Umschrieben', en: 'Circumscribed', fa: 'محدود' },
  { key: 'microlobulated', de: 'Mikrolobuliert', en: 'Microlobulated', fa: 'میکرولوبوله' },
  { key: 'indistinct', de: 'Unscharf', en: 'Indistinct', fa: 'نامشخص' },
  { key: 'angular', de: 'Eckig', en: 'Angular', fa: 'زاویه‌دار' },
  { key: 'spiculated', de: 'Spikuliert', en: 'Spiculated', fa: 'اسپیکوله' },
]
const CALC_MORPHS = [
  { key: 'round', de: 'Rund / oval', en: 'Round / oval', fa: 'گرد / بیضی' },
  { key: 'amorphous', de: 'Amorph', en: 'Amorphous', fa: 'بی‌شکل' },
  { key: 'coarse', de: 'Grob heterogen', en: 'Coarse heterogeneous', fa: 'ناهمگن درشت' },
  { key: 'pleomorphic', de: 'Fein pleomorph', en: 'Fine pleomorphic', fa: 'پلئومورف ریز' },
  { key: 'branching', de: 'Fein linear / verzweigt', en: 'Fine linear / branching', fa: 'خطی ریز / شاخه‌دار' },
]
const DISTRIBUTIONS = [
  { key: 'diffuse', de: 'Diffus', en: 'Diffuse', fa: 'منتشر' },
  { key: 'regional', de: 'Regional', en: 'Regional', fa: 'ناحیه‌ای' },
  { key: 'grouped', de: 'Gruppiert', en: 'Grouped', fa: 'گروهی' },
  { key: 'linear', de: 'Linear', en: 'Linear', fa: 'خطی' },
  { key: 'segmental', de: 'Segmental', en: 'Segmental', fa: 'سگمنتال' },
]

function Icon({ type }) {
  if (type === 'mass') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/><path d="M18 14c7-4 17 1 17 10 0 8-7 14-15 11-8-3-10-15-2-21Z"/></svg>
  if (type === 'node') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 37c7-7 12-10 19-12M28 24c4-7 7-11 13-15M27 25c3 4 6 8 7 15"/><ellipse cx="27" cy="24" rx="9" ry="7" transform="rotate(-35 27 24)"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="13" cy="14" r="2"/><circle cx="25" cy="10" r="1.6"/><circle cx="34" cy="17" r="2.3"/><circle cx="19" cy="25" r="2.5"/><circle cx="31" cy="30" r="1.8"/><circle cx="12" cy="36" r="1.5"/><circle cx="39" cy="38" r="2"/></svg>
}

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 11 0M11 5l5 5-5 5"/></svg>
}

function Header({ lang, setLang, ui }) {
  const homeHref = lang === 'de' ? '/' : `/?lang=${lang}`
  return <header className={styles.header}>
    <Link href="/mamma-calculator" className={styles.wordmark}>{ui.brand}</Link>
    <div className={styles.headerActions}>
      <Link href={homeHref} className={styles.radyarLink}><span className={styles.radyarBy}>{ui.by}</span><strong>RadYar</strong><span>↗</span></Link>
      <div className={styles.languages} aria-label="Language">
        {['de', 'en', 'fa'].map(code => <button key={code} type="button" onClick={() => setLang(code)} className={lang === code ? styles.languageActive : ''} aria-pressed={lang === code}>{code.toUpperCase()}</button>)}
      </div>
    </div>
  </header>
}

function ToolNav({ active, ui }) {
  return <nav className={styles.toolNav} aria-label={ui.brand}>
    <Link href="/mamma-calculator" className={!active ? styles.navActive : ''}><span className={styles.homeIcon}>⌂</span>{ui.overview}</Link>
    {TOOLS.map(tool => <Link key={tool.slug} href={`/mamma-calculator/${tool.slug}`} className={`${active === tool.slug ? styles.navActive : ''} ${tool.accent === 'violet' ? styles.navViolet : ''}`}><span className={styles.navIcon}><Icon type={tool.icon}/></span>{ui.tools[tool.slug].name}</Link>)}
  </nav>
}

function Overview({ ui }) {
  return <section className={styles.overviewShell}>
    <div className={styles.overviewCopy}>
      <h1>{ui.choose}</h1>
      <span className={styles.titleRule}/>
      <p>{ui.chooseHint}</p>
    </div>
    <div className={styles.toolChoices}>
      {TOOLS.map((tool, index) => <Link key={tool.slug} href={`/mamma-calculator/${tool.slug}`} className={`${styles.toolChoice} ${tool.accent === 'violet' ? styles.toolChoiceViolet : ''}`}>
        <span className={styles.choiceNumber}>0{index + 1}</span>
        <span className={styles.choiceIcon}><Icon type={tool.icon}/></span>
        <span className={styles.choiceCopy}><strong>{ui.tools[tool.slug].name}</strong><small>{ui.tools[tool.slug].desc}</small><em>{ui.tools[tool.slug].short}</em></span>
        <span className={styles.choiceArrow}><Arrow/></span>
      </Link>)}
    </div>
  </section>
}

function ChoiceGroup({ title, items, value, setValue, iconType }) {
  return <fieldset className={styles.choiceGroup}>
    <legend>{title}</legend>
    <div className={styles.choiceGrid}>
      {items.map(item => <button key={item.key} type="button" onClick={() => setValue(item.key)} className={value === item.key ? styles.controlActive : ''} aria-pressed={value === item.key}>
        {iconType ? <span className={styles.controlMark}><Icon type={iconType}/></span> : null}<span>{item.label}</span>
      </button>)}
    </div>
  </fieldset>
}

function ResultPanel({ result, ui, lang, nodeCategory }) {
  const info = nodeCategory || (result ? CATEGORY_INFO[result] : null)
  return <aside className={styles.resultPanel} style={info ? { '--result-color': info.color } : undefined} aria-live="polite">
    <span className={styles.resultEyebrow}>{ui.assessment}</span>
    <div className={styles.resultValue}><small>{nodeCategory ? 'NODE-RADS' : 'BI-RADS'}</small><strong>{result || '—'}</strong></div>
    {info ? <div className={styles.resultMeta}>
      <strong>{info[lang] || info.de}</strong>
      <dl><div><dt>{ui.risk}</dt><dd>{info.risk}</dd></div><div><dt>{ui.action}</dt><dd>{info.action[lang] || info.action.de}</dd></div></dl>
    </div> : <p className={styles.resultEmpty}>{ui.selectAll}</p>}
    <div className={styles.safetyNote}><span>i</span>{ui.disclaimer}</div>
  </aside>
}

function MassCalculator({ ui, lang }) {
  const [fat, setFat] = useState(false)
  const [shape, setShape] = useState('')
  const [margin, setMargin] = useState('')
  const result = fat ? '2' : (shape && margin ? MASS_MATRIX[shape][margin] : null)
  const reset = () => { setFat(false); setShape(''); setMargin('') }
  return <CalculatorLayout ui={ui} lang={lang} tool="birads-mass" result={result} onReset={reset}>
    <button type="button" className={`${styles.fatControl} ${fat ? styles.fatActive : ''}`} onClick={() => { setFat(value => !value); setShape(''); setMargin('') }} aria-pressed={fat}>
      <span className={styles.checkBox}>{fat ? '✓' : ''}</span><span><strong>{ui.fat}</strong><small>{ui.fatHint}</small></span><em>BI-RADS 2</em>
    </button>
    {!fat ? <>
      <ChoiceGroup title={`1 · ${ui.form}`} items={MASS_SHAPES.map(item => ({ ...item, label: item[lang] || item.de }))} value={shape} setValue={setShape} iconType="mass" />
      <ChoiceGroup title={`2 · ${ui.margin}`} items={MARGINS.map(item => ({ ...item, label: item[lang] || item.de }))} value={margin} setValue={setMargin} />
    </> : null}
  </CalculatorLayout>
}

function CalcificationsCalculator({ ui, lang }) {
  const [morph, setMorph] = useState('')
  const [distribution, setDistribution] = useState('')
  const result = morph && distribution ? CALC_MATRIX[morph][distribution] : null
  const reset = () => { setMorph(''); setDistribution('') }
  return <CalculatorLayout ui={ui} lang={lang} tool="birads-calcifications" result={result} onReset={reset}>
    <ChoiceGroup title={`1 · ${ui.morphology}`} items={CALC_MORPHS.map(item => ({ ...item, label: item[lang] || item.de }))} value={morph} setValue={setMorph} iconType="calc" />
    <ChoiceGroup title={`2 · ${ui.distribution}`} items={DISTRIBUTIONS.map(item => ({ ...item, label: item[lang] || item.de }))} value={distribution} setValue={setDistribution} />
  </CalculatorLayout>
}

const NODE_CATEGORIES = [
  { value: 1, color: '#18945a', risk: '< 5 %', de: 'Sehr niedrig', en: 'Very low', fa: 'بسیار پایین', action: { de: 'Keine weitere Abklärung', en: 'No further work-up', fa: 'بدون بررسی بیشتر' } },
  { value: 2, color: '#0796af', risk: '5–15 %', de: 'Niedrig', en: 'Low', fa: 'پایین', action: { de: 'Verlaufskontrolle erwägen', en: 'Consider follow-up', fa: 'پیگیری مدنظر باشد' } },
  { value: 3, color: '#c28a16', risk: '15–50 %', de: 'Äquivokal', en: 'Equivocal', fa: 'مبهم', action: { de: 'Zusatzdiagnostik / Korrelation', en: 'Additional work-up / correlation', fa: 'ارزیابی تکمیلی' } },
  { value: 4, color: '#d57228', risk: '50–85 %', de: 'Hoch', en: 'High', fa: 'بالا', action: { de: 'Biopsie empfohlen', en: 'Biopsy recommended', fa: 'بیوپسی توصیه می‌شود' } },
  { value: 5, color: '#d94b47', risk: '> 85 %', de: 'Sehr hoch', en: 'Very high', fa: 'بسیار بالا', action: { de: 'Biopsie obligat', en: 'Biopsy mandatory', fa: 'بیوپسی الزامی است' } },
]

function getNodeScore(size, texture, border, shape) {
  if (!size) return null
  if (size === 'bulk') return 5
  if (texture === null || border === null || shape === null) return null
  const config = texture + border + shape
  if (size === 'normal') return config === 0 ? 1 : config === 1 ? 2 : config <= 3 ? 3 : 4
  return config === 0 ? 2 : config <= 2 ? 3 : config <= 4 ? 4 : 5
}

function NodeRadsCalculator({ ui, lang }) {
  const [size, setSize] = useState('')
  const [texture, setTexture] = useState(null)
  const [border, setBorder] = useState(null)
  const [shape, setShape] = useState(null)
  const result = getNodeScore(size, texture, border, shape)
  const category = result ? NODE_CATEGORIES.find(item => item.value === result) : null
  const label = (item) => item[lang] || item.de
  const sizes = [
    { key: 'normal', de: 'Normal (< 10 mm)', en: 'Normal (< 10 mm)', fa: 'طبیعی (< ۱۰ mm)' },
    { key: 'enlarged', de: 'Vergrößert (10–29 mm)', en: 'Enlarged (10–29 mm)', fa: 'بزرگ‌شده (۱۰–۲۹ mm)' },
    { key: 'bulk', de: 'Bulk (≥ 30 mm)', en: 'Bulk (≥ 30 mm)', fa: 'توده‌ای (≥ ۳۰ mm)' },
  ]
  const textures = [
    { key: 0, de: 'Homogen · 0', en: 'Homogeneous · 0', fa: 'همگن · ۰' }, { key: 1, de: 'Heterogen · +1', en: 'Heterogeneous · +1', fa: 'ناهمگن · +۱' },
    { key: 2, de: 'Fokale Nekrose · +2', en: 'Focal necrosis · +2', fa: 'نکروز کانونی · +۲' }, { key: 3, de: 'Makroskopische Nekrose · +3', en: 'Macroscopic necrosis · +3', fa: 'نکروز ماکروسکوپی · +۳' },
  ]
  const borders = [{ key: 0, de: 'Glatt · 0', en: 'Smooth · 0', fa: 'صاف · ۰' }, { key: 1, de: 'Unregelmäßig · +1', en: 'Irregular · +1', fa: 'نامنظم · +۱' }]
  const shapes = [{ key: 0, de: 'Oval / Fetthilus · 0', en: 'Oval / fatty hilum · 0', fa: 'بیضی / هیلوس چربی · ۰' }, { key: 1, de: 'Rund, kein Hilus · +1', en: 'Spherical, no hilum · +1', fa: 'کروی، بدون هیلوس · +۱' }]
  const reset = () => { setSize(''); setTexture(null); setBorder(null); setShape(null) }
  return <CalculatorLayout ui={ui} lang={lang} tool="node-rads" result={result} nodeCategory={category} onReset={reset}>
    <ChoiceGroup title={`1 · ${ui.size}`} items={sizes.map(item => ({ ...item, label: label(item) }))} value={size} setValue={setSize} />
    {size && size !== 'bulk' ? <>
      <ChoiceGroup title={`2 · ${ui.texture}`} items={textures.map(item => ({ ...item, label: label(item) }))} value={texture} setValue={setTexture} />
      <div className={styles.nodePair}>
        <ChoiceGroup title={`3 · ${ui.border}`} items={borders.map(item => ({ ...item, label: label(item) }))} value={border} setValue={setBorder} />
        <ChoiceGroup title={`4 · ${ui.nodeShape}`} items={shapes.map(item => ({ ...item, label: label(item) }))} value={shape} setValue={setShape} />
      </div>
      {texture !== null && border !== null && shape !== null ? <div className={styles.configTotal}>{ui.config}<strong>{texture + border + shape} / 5</strong></div> : null}
    </> : null}
  </CalculatorLayout>
}

function CalculatorLayout({ ui, lang, tool, result, nodeCategory, onReset, children }) {
  return <section className={`${styles.workspace} ${tool === 'node-rads' ? styles.workspaceViolet : ''}`}>
    <ToolNav active={tool} ui={ui}/>
    <div className={styles.workspaceHeader}>
      <div><h1>{ui.tools[tool].name}</h1><p>{ui.tools[tool].desc}</p></div>
      <button type="button" className={styles.reset} onClick={onReset}>{ui.reset}<span>↺</span></button>
    </div>
    <div className={styles.calculatorBody}>
      <div className={styles.controls}>{children}</div>
      <ResultPanel result={result} ui={ui} lang={lang} nodeCategory={nodeCategory}/>
    </div>
  </section>
}

export default function MammaCalculatorClient({ initialTool = null }) {
  const { lang, setLang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const rtl = lang === 'fa'
  return <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <Header lang={lang} setLang={setLang} ui={ui}/>
    <div className={styles.stage}>
      <div className={styles.mammography} aria-hidden="true"/>
      {!initialTool ? <Overview ui={ui}/> : null}
      {initialTool === 'birads-mass' ? <MassCalculator ui={ui} lang={lang}/> : null}
      {initialTool === 'birads-calcifications' ? <CalcificationsCalculator ui={ui} lang={lang}/> : null}
      {initialTool === 'node-rads' ? <NodeRadsCalculator ui={ui} lang={lang}/> : null}
    </div>
  </main>
}
