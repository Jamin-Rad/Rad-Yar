'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import basics from '../basics/page.module.css'
import styles from './page.module.css'
import { COPY, FEATURES, PRESETS, SECTIONS, SOURCES, UI, pick } from './content'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

const OPTIONS = {
  root: ['no', 'yes'],
  curve: ['persistent', 'plateau', 'washout'],
  margin: ['circumscribed', 'irregular'],
  enhancement: ['homogeneous', 'heterogeneous'],
  edema: ['absent', 'present'],
}

function resolvePath(answers) {
  if (!answers.root) return { question: 'root', step: 1 }
  if (!answers.curve) return { question: 'curve', step: 2 }
  if (answers.root === 'no') {
    if (answers.curve === 'persistent') return answers.margin ? { score: answers.margin === 'irregular' ? 3 : 1 } : { question: 'margin', step: 3 }
    if (answers.curve === 'plateau') return answers.margin ? { score: answers.margin === 'irregular' ? 5 : 2 } : { question: 'margin', step: 3 }
    return answers.enhancement ? { score: answers.enhancement === 'heterogeneous' ? 8 : 4 } : { question: 'enhancement', step: 3 }
  }
  if (answers.curve === 'persistent') return { score: 6 }
  if (!answers.edema) return { question: 'edema', step: 3 }
  return { score: answers.curve === 'plateau' ? (answers.edema === 'present' ? 10 : 7) : (answers.edema === 'present' ? 11 : 9) }
}

function riskFor(score) {
  if (score <= 4) return 'low'
  if (score <= 7) return 'intermediate'
  return 'high'
}

function orderedAnswers(answers) {
  return ['root', 'curve', 'margin', 'enhancement', 'edema'].filter(key => answers[key])
}

function CurveGlyph({ type }) {
  const paths = {
    persistent: 'M8 54 C23 50 28 34 42 29 S67 15 88 10',
    plateau: 'M8 54 C23 48 28 24 43 20 S68 21 88 20',
    washout: 'M8 54 C23 48 29 20 44 16 S67 28 88 39',
  }
  return <svg className={styles.curveGlyph} viewBox="0 0 96 64" aria-hidden="true"><path className={styles.curveAxis} d="M7 6v50h83"/><path className={styles.curveLine} d={paths[type]}/><circle cx="8" cy="54" r="2.5"/><circle cx="88" cy={type === 'persistent' ? 10 : type === 'plateau' ? 20 : 39} r="2.5"/></svg>
}

function OptionVisual({ question, option }) {
  if (question === 'curve') return <CurveGlyph type={option}/>
  if (question === 'root') return <span className={`${styles.lesionGlyph} ${styles[option === 'yes' ? 'spiculated' : 'smooth']}`} aria-hidden="true"/>
  if (question === 'margin') return <span className={`${styles.lesionGlyph} ${styles[option === 'irregular' ? 'irregular' : 'smooth']}`} aria-hidden="true"/>
  if (question === 'enhancement') return <span className={`${styles.lesionGlyph} ${styles[option === 'heterogeneous' ? 'rim' : 'filled']}`} aria-hidden="true"/>
  return <span className={`${styles.lesionGlyph} ${styles[option === 'present' ? 'edema' : 'filled']}`} aria-hidden="true"/>
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${basics.readButton} ${isRead ? `${base.readButtonActive} ${basics.readButtonActive}` : ''}`} onClick={onClick}><span className={`${base.readCheck} ${basics.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>{authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>
}

function SectionIcon({ name }) {
  const paths = {
    compass: <><circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/></>,
    features: <><circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></>,
    path: <><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v3.5c0 1.7 1.3 3 3 3h6c1.7 0 3 1.3 3 3V17M12 13.5V8m0 0-2.2 2.2M12 8l2.2 2.2"/></>,
    gauge: <><path d="M4.2 17.5a8.5 8.5 0 1 1 15.6 0"/><path d="m12 15 4.2-5.1"/><circle cx="12" cy="15" r="1.5"/></>,
    cases: <><path d="M4 7.5h6l1.5-2h4L17 7.5h3v11H4z"/><circle cx="12" cy="13" r="3.2"/><path d="M10.5 4h3"/></>,
    shield: <><path d="M12 3 19 6v5.2c0 4.2-2.8 7.8-7 9.8-4.2-2-7-5.6-7-9.8V6l7-3Z"/><path d="M12 8v5M12 16.5h.01"/></>,
  }
  return <svg className={styles.sectionGlyph} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function Section({ id, icon, title, open, onToggle, children }) {
  return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}><button className={`${base.sectionHeader} ${basics.sectionHeader}`} type="button" onClick={() => onToggle(id)} aria-expanded={open}><span className={basics.sectionHeading}><span className={`${basics.sectionIcon} ${styles.sectionIcon}`}><SectionIcon name={icon}/></span><h2>{title}</h2></span><span className={basics.sectionToggle}>{open ? '−' : '+'}</span></button>{open && <div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>
}

function ScoreRail({ score = null, compact = false }) {
  return <div className={`${styles.scoreRailWrap} ${compact ? styles.scoreRailCompact : ''}`}>
    <div className={styles.scoreRail} aria-label={score ? `Kaiser Score ${score}` : 'Kaiser Score 1 bis 11'}>
      {Array.from({ length: 11 }, (_, index) => index + 1).map(value => <span key={value} className={score === value ? styles.scoreActive : ''}>{value}</span>)}
    </div>
    <div className={styles.railLegend} aria-hidden="true"><span>1–4</span><span>5–7</span><span>8–11</span></div>
  </div>
}

function DecisionTrainer({ lang, withLang }) {
  const ui = UI[lang] || UI.de
  const [answers, setAnswers] = useState({})
  const resolution = resolvePath(answers)
  const history = orderedAnswers(answers)
  const score = resolution.score || null
  const risk = score ? riskFor(score) : null

  const choose = value => setAnswers(current => ({ ...current, [resolution.question]: value }))
  const back = () => setAnswers(current => {
    const keys = orderedAnswers(current)
    const next = { ...current }
    delete next[keys[keys.length - 1]]
    return next
  })

  return <div className={styles.trainerShell}>
    <header className={styles.trainerHeader}><div><span>{ui.trainerEyebrow}</span><h3>{ui.trainerTitle}</h3><p>{ui.trainerIntro}</p></div><button type="button" className={styles.resetButton} onClick={() => setAnswers({})}>{ui.reset}</button></header>
    <div className={styles.progressSteps} aria-hidden="true">{[1,2,3].map(step => <span key={step} className={(resolution.step || 3) >= step || score ? styles.progressDone : ''}><b>{step}</b><small>{ui.step} {step}</small></span>)}</div>

    <div className={styles.pathStrip}><span>{ui.path}</span><div>{history.length ? history.map(key => <strong key={key}>{ui.labels[key]}: {ui.options[answers[key]][0]}</strong>) : <em>—</em>}</div></div>

    {!score ? <div className={styles.questionPanel}>
      <div className={styles.questionCopy}><span>{ui.step} {resolution.step} {ui.of}</span><h4>{ui.questions[resolution.question][0]}</h4><p>{ui.questions[resolution.question][1]}</p></div>
      <div className={`${styles.answerGrid} ${OPTIONS[resolution.question].length === 3 ? styles.answerGridThree : ''}`}>{OPTIONS[resolution.question].map(option => <button type="button" key={option} onClick={() => choose(option)}><OptionVisual question={resolution.question} option={option}/><strong>{ui.options[option][0]}</strong><small>{ui.options[option][1]}</small></button>)}</div>
    </div> : <div className={`${styles.resultPanel} ${styles[risk]}`} aria-live="polite">
      <div className={styles.resultScore}><span>{ui.result}</span><strong>{score}</strong><small>Kaiser Score</small></div>
      <div className={styles.resultCopy}><span>{ui.risks[risk][0]}</span><h4>{ui.risks[risk][1]}</h4><p>{ui.risks[risk][2]}</p></div>
      <Link href={withLang('/kaiser-score')}>{ui.openCalculator}<span>↗</span></Link>
    </div>}

    <ScoreRail score={score}/>
    <div className={styles.trainerControls}><button type="button" disabled={!history.length} onClick={back}>{ui.back}</button><span>{score ? `${ui.result}: ${score}` : ui.choose}</span></div>

    <div className={styles.presets}><h4>{ui.presets}</h4><div>{PRESETS.map(preset => <button type="button" key={preset.id} onClick={() => setAnswers(preset.answers)}><span>{preset.score}</span><strong>{pick(preset.title, lang)}</strong><small>{pick(preset.note, lang)}</small><i>{ui.load} →</i></button>)}</div></div>
  </div>
}

function FeatureAtlas({ lang }) {
  const [active, setActive] = useState(FEATURES[0].id)
  const selected = FEATURES.find(feature => feature.id === active)
  return <div className={styles.atlas}>
    <figure className={styles.atlasImage}><a href="/mamma/mrt/kaiser-score/kaiser-features-synthetic.png" target="_blank" rel="noreferrer"><Image src="/mamma/mrt/kaiser-score/kaiser-features-synthetic.png" width={1536} height={1024} sizes="(max-width: 900px) calc(100vw - 48px), 780px" alt={pick({ de: 'Synthetische Mamma-MRT-Lehrdarstellung mit Root Sign, umschriebener Läsion, Rim Enhancement und perifokalem Ödem', en: 'Synthetic breast MRI teaching image showing root sign, circumscribed lesion, rim enhancement and perifocal oedema', fa: 'تصویر آموزشی مصنوعی MRI پستان شامل Root sign، ضایعه Circumscribed، Rim enhancement و ادم Perifocal' }, lang)}/></a><figcaption><strong>{pick(COPY.synthetic, lang)}</strong><span>{pick(COPY.zoom, lang)}</span></figcaption></figure>
    <div className={styles.atlasTabs} role="tablist" aria-label={pick(SECTIONS[1].label, lang)}>{FEATURES.map(feature => <button type="button" role="tab" aria-selected={active === feature.id} key={feature.id} onClick={() => setActive(feature.id)} className={active === feature.id ? styles.atlasTabActive : ''}><span>{feature.number}</span><strong>{pick(feature.title, lang)}</strong></button>)}</div>
    <article className={`${styles.featureDetail} ${styles[selected.accent]}`} role="tabpanel"><span>{selected.number}</span><div><h3>{pick(selected.title, lang)}</h3><strong>{pick(selected.short, lang)}</strong><p>{pick(selected.text, lang)}</p><small>{pick(selected.tip, lang)}</small></div></article>
  </div>
}

export default function KaiserScoreLessonPage() {
  useMobileLearningLayout()
  const { lang } = useLanguage()
  const tx = value => pick(value, lang)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [openId, setOpenId] = useState(SECTIONS[0].id)
  const shouldScroll = useRef(false)
  const { isRead, toggleRead, authError } = useLessonReadStatus('mamma-mrt-kaiser-score')
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), [])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveId(id), { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  useEffect(() => {
    if (!openId || !shouldScroll.current) return
    shouldScroll.current = false
    document.getElementById(openId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [openId])

  const selectSection = id => {
    setActiveId(id)
    if (openId === id) return document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    shouldScroll.current = true
    setOpenId(id)
  }

  const toggleSection = id => setOpenId(current => current === id ? null : id)

  return <main className={`${base.page} ${basics.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}>
      <nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.imaging)}</Link><span>›</span><span>{tx(COPY.breastMri)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav>
      <div className={base.hero}>
        <div className={`${base.heroText} ${basics.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${basics.sourceBadge}`}>Dr. Zia · {tx(COPY.sourceNote)}</span><h1>{tx(COPY.title)}</h1><p>{tx(COPY.subtitle)}</p><div className={base.actions}><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=15&themen=mamma-mrt-kaiser-score&from=${encodeURIComponent(withLang('/mamma/bildgebung/mrt/kaiser-score'))}`)}>🎯 15 MCQ</Link><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/mamma-mrt-kaiser-score?from=${encodeURIComponent(withLang('/mamma/bildgebung/mrt/kaiser-score'))}`)}>🧠 {tx(COPY.flashcards)}</Link><Link className={`${base.actionBtn} ${basics.actionBtn} ${styles.calculatorButton}`} href={withLang('/kaiser-score')}>{tx(COPY.calculator)} <span>↗</span></Link></div></div>
        <div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${basics.heroStat}`}><strong>5</strong><span>{tx({ de: 'Merkmale', en: 'features', fa: 'ویژگی' })}</span><small>Root · Curve · Margin · Enhancement · Edema</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>3</strong><span>{tx({ de: 'Entscheidungen', en: 'decisions', fa: 'تصمیم' })}</span><small>{tx({ de: 'Nur relevante Äste', en: 'Only relevant branches', fa: 'فقط شاخه‌های مرتبط' })}</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>1–11</strong><span>Kaiser Score</span><small>BI-RADS 2/3 · 4 · 5</small></div></div>
      </div>
    </header>

    <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang}/></div>
    <div className={base.layout}>
      <aside className={`${base.sidebar} ${basics.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{SECTIONS.map(section => <button key={section.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${basics.sideItemActive}` : ''}`} onClick={() => selectSection(section.id)}><span className={`${basics.sideNumber} ${styles.sideIcon}`}><SectionIcon name={section.icon}/></span><strong>{tx(section.label)}</strong></button>)}</aside>
      <div className={base.main}>
        <Section id="orientierung" icon={SECTIONS[0].icon} title={tx(SECTIONS[0].label)} open={openId === 'orientierung'} onToggle={toggleSection}>
          <p className={styles.lead}>{tx({ de: 'Der Kaiser Score ist keine weitere Liste von Einzelzeichen. Er ist eine klinische Entscheidungsregel, die etablierte BI-RADS-MRT-Merkmale in einer festen Reihenfolge kombiniert. Dadurch wird sichtbar, warum eine Läsion im niedrigen, intermediären oder hohen Risikobereich landet.', en: 'The Kaiser Score is not another checklist of isolated signs. It is a clinical decision rule that combines established BI-RADS MRI features in a fixed order, making the route to a low, intermediate or high-risk result explicit.', fa: 'Kaiser Score یک فهرست دیگر از علائم منفرد نیست؛ یک قانون تصمیم‌گیری بالینی است که ویژگی‌های شناخته‌شده BI-RADS در MRI را با ترتیب ثابت ترکیب می‌کند و نشان می‌دهد چرا ضایعه در محدوده کم‌خطر، میانی یا پرخطر قرار می‌گیرد.' })}</p>
          <div className={styles.orientationGrid}><article><span>01</span><h3>{tx({ de: 'Voraussetzung', en: 'Prerequisite', fa: 'پیش‌شرط' })}</h3><p>{tx({ de: 'Eine anreichernde Läsion sowie zuverlässig beurteilbare Morphologie und Kinetik.', en: 'An enhancing lesion with reliably assessable morphology and kinetics.', fa: 'ضایعه Enhancing با مورفولوژی و کینتیک قابل‌ارزیابی.' })}</p></article><article><span>02</span><h3>{tx({ de: 'Prinzip', en: 'Principle', fa: 'اصل' })}</h3><p>{tx({ de: 'Von oben nach unten gehen und pro Knoten nur eindeutig vorhandene Merkmale werten.', en: 'Move top to bottom and count only definite features at each node.', fa: 'از بالا به پایین حرکت کنید و در هر گره فقط ویژگی‌های قطعی را لحاظ کنید.' })}</p></article><article><span>03</span><h3>{tx({ de: 'Ziel', en: 'Goal', fa: 'هدف' })}</h3><p>{tx({ de: 'Eine reproduzierbare BI-RADS-nahe Einordnung – immer eingebettet in den klinischen Kontext.', en: 'A reproducible BI-RADS-oriented assessment, always embedded in the clinical context.', fa: 'ارزیابی تکرارپذیر و نزدیک به BI-RADS که همیشه در زمینه بالینی تفسیر می‌شود.' })}</p></article></div>
          <div className={styles.sequenceLine}><span>Root sign</span><i>→</i><span>Curve</span><i>→</i><span>{tx({ de: 'Rand / Enhancement / Ödem', en: 'Margin / enhancement / oedema', fa: 'حاشیه / Enhancement / ادم' })}</span><i>→</i><strong>Score 1–11</strong></div>
          <aside className={styles.caution}><strong>{tx({ de: 'Wichtig', en: 'Important', fa: 'مهم' })}</strong><p>{tx({ de: 'Der Score ergänzt die ärztliche Gesamtbeurteilung; Symptome, Voraufnahmen, Mammographie/Ultraschall, Therapieanamnese und radiologisch-pathologische Konkordanz können das Management verändern.', en: 'The score supports rather than replaces integrated physician assessment. Symptoms, priors, mammography/ultrasound, treatment history and radiology–pathology concordance can change management.', fa: 'این امتیاز جایگزین ارزیابی جامع پزشک نیست. علائم، تصاویر قبلی، ماموگرافی/سونوگرافی، سابقه درمان و تطابق رادیولوژی–پاتولوژی می‌توانند مدیریت را تغییر دهند.' })}</p></aside>
        </Section>

        <Section id="merkmale" icon={SECTIONS[1].icon} title={tx(SECTIONS[1].label)} open={openId === 'merkmale'} onToggle={toggleSection}><FeatureAtlas lang={lang}/></Section>

        <Section id="trainer" icon={SECTIONS[2].icon} title={tx(SECTIONS[2].label)} open={openId === 'trainer'} onToggle={toggleSection}><DecisionTrainer lang={lang} withLang={withLang}/></Section>

        <Section id="interpretation" icon={SECTIONS[3].icon} title={tx(SECTIONS[3].label)} open={openId === 'interpretation'} onToggle={toggleSection}>
          <ScoreRail/>
          <div className={styles.riskGrid}><article className={styles.low}><strong>1–4</strong><h3>BI-RADS 2/3</h3><p>{tx({ de: 'Minimaler bis niedriger Risikobereich im Modell; keine routinemäßige Biopsie allein aufgrund des Kaiser Scores.', en: 'Minimal-to-low risk range in the model; no routine biopsy based on the Kaiser Score alone.', fa: 'محدوده حداقل تا کم‌خطر در مدل؛ صرفاً بر اساس Kaiser Score بیوپسی روتین مطرح نیست.' })}</p></article><article className={styles.intermediate}><strong>5–7</strong><h3>BI-RADS 4</h3><p>{tx({ de: 'Intermediärer Bereich; ab Score 5 sieht der Entscheidungsbaum eine histologische Abklärung vor.', en: 'Intermediate range; the decision tree indicates histological verification from score 5.', fa: 'محدوده میانی؛ از امتیاز ۵ به بالا درخت تصمیم بررسی بافت‌شناسی را مطرح می‌کند.' })}</p></article><article className={styles.high}><strong>8–11</strong><h3>BI-RADS 5</h3><p>{tx({ de: 'Hoher Risikobereich; ein benignes Biopsieergebnis erfordert besonders sorgfältige Konkordanzprüfung.', en: 'High-risk range; a benign biopsy result requires particularly careful concordance review.', fa: 'محدوده پرخطر؛ نتیجه خوش‌خیم بیوپسی نیازمند بررسی بسیار دقیق تطابق است.' })}</p></article></div>
          <div className={styles.threshold}><span>4</span><div><strong>{tx({ de: 'Entscheidende Schwelle', en: 'Decision threshold', fa: 'آستانه تصمیم‌گیری' })}</strong><p>{tx({ de: 'Scores unter 5 gelten im Modell als benigne; ab 5 ist die Läsion biopsiepflichtig. Das ist eine Regel des Modells, kein Ersatz für die individuelle Indikationsstellung.', en: 'Scores below 5 are considered benign in the model; from 5, biopsy is indicated. This is a model rule, not a substitute for individual clinical indication.', fa: 'در مدل، امتیاز کمتر از ۵ خوش‌خیم و از ۵ به بالا نیازمند بیوپسی محسوب می‌شود. این قانون مدل است و جایگزین تصمیم‌گیری فردی بالینی نیست.' })}</p></div><span>5</span></div>
        </Section>

        <Section id="faelle" icon={SECTIONS[4].icon} title={tx(SECTIONS[4].label)} open={openId === 'faelle'} onToggle={toggleSection}>
          <p className={styles.lead}>{tx({ de: 'Lade die Beispiele im Entscheidungsweg und gehe rückwärts: Welche einzelne Änderung würde die Läsion über oder unter die Schwelle 5 bringen?', en: 'Load these examples in the decision path and reason backwards: which single change would move the lesion across the threshold of 5?', fa: 'مثال‌ها را در مسیر تصمیم بارگذاری و معکوس استدلال کنید: تغییر کدام ویژگی منفرد ضایعه را از آستانه ۵ عبور می‌دهد؟' })}</p>
          <div className={styles.caseGrid}>{PRESETS.map((preset, index) => <article key={preset.id}><span>{String(index + 1).padStart(2, '0')}</span><div className={styles.caseScore}>{preset.score}</div><h3>{tx(preset.title)}</h3><p>{tx(preset.note)}</p><dl>{Object.entries(preset.answers).map(([key, value]) => <div key={key}><dt>{(UI[lang] || UI.de).labels[key]}</dt><dd>{(UI[lang] || UI.de).options[value][0]}</dd></div>)}</dl><button type="button" onClick={() => selectSection('trainer')}>{tx({ de: 'Im Trainer nachvollziehen', en: 'Explore in trainer', fa: 'بررسی در مربی تعاملی' })} ↑</button></article>)}</div>
        </Section>

        <Section id="fallstricke" icon={SECTIONS[5].icon} title={tx(SECTIONS[5].label)} open={openId === 'fallstricke'} onToggle={toggleSection}>
          <div className={styles.pitfallGrid}><article><strong>01</strong><h3>{tx({ de: 'Unsicher ≠ positiv', en: 'Uncertain ≠ positive', fa: 'مشکوک ≠ مثبت' })}</h3><p>{tx({ de: 'Eine vermutete Spikula oder ein fraglicher Wash-out durch Bewegung darf nicht zum suspekteren Ast zwingen.', en: 'A suspected spicule or questionable wash-out caused by motion must not force the more suspicious branch.', fa: 'اسپیکول احتمالی یا Wash-out مشکوک ناشی از حرکت نباید شما را به شاخه مشکوک‌تر ببرد.' })}</p></article><article><strong>02</strong><h3>{tx({ de: 'Kontext kann überstimmen', en: 'Context can override', fa: 'زمینه می‌تواند تصمیم را تغییر دهد' })}</h3><p>{tx({ de: 'Blutige Sekretion, suspekte Verkalkungen, Palpabilität oder Diskordanz können trotz Score ≤ 4 eine Abklärung erfordern.', en: 'Bloody discharge, suspicious calcifications, palpability or discordance may require work-up despite a score ≤ 4.', fa: 'ترشح خونی، کلسیفیکاسیون مشکوک، لمس‌پذیری یا عدم تطابق ممکن است با وجود امتیاز ≤۴ نیازمند بررسی باشند.' })}</p></article><article><strong>03</strong><h3>{tx({ de: 'ADC ist komplementär', en: 'ADC is complementary', fa: 'ADC مکمل است' })}</h3><p>{tx({ de: 'DWI/ADC kann die Plausibilität unterstützen, verändert aber nicht automatisch den ursprünglichen Kaiser-Pfad und besitzt keinen universellen Grenzwert.', en: 'DWI/ADC can support plausibility but does not automatically alter the original Kaiser path and has no universal threshold.', fa: 'DWI/ADC می‌تواند از تفسیر حمایت کند، اما مسیر اصلی Kaiser را خودکار تغییر نمی‌دهد و آستانه جهانی واحدی ندارد.' })}</p></article><article><strong>04</strong><h3>{tx({ de: 'Mass und NME', en: 'Mass and NME', fa: 'Mass و NME' })}</h3><p>{tx({ de: 'Der Score kann auf beide angewendet werden. Bei NME müssen Rand und internes Muster BI-RADS-konform auf die Läsion übertragen werden.', en: 'The score can be applied to both. For NME, margin and internal pattern must be translated in a BI-RADS-consistent manner.', fa: 'امتیاز برای هر دو قابل استفاده است. در NME باید حاشیه و الگوی داخلی مطابق BI-RADS روی ضایعه اعمال شوند.' })}</p></article></div>
          <div className={styles.sources}><h3>{tx({ de: 'Primärquellen & Vertiefung', en: 'Primary sources & further reading', fa: 'منابع اصلی و مطالعه بیشتر' })}</h3>{SOURCES.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer"><span>↗</span>{source.label}</a>)}</div>
          <div className={styles.takeHome}><span>{tx({ de: 'Take-Home Message', en: 'Take-home message', fa: 'پیام نهایی' })}</span><h3>Root → Curve → {tx({ de: 'relevantes drittes Merkmal', en: 'relevant third feature', fa: 'ویژگی سوم مرتبط' })}</h3><p>{tx({ de: 'Der Kaiser Score ist ein Pfad, keine Summe: sichere Merkmale konsequent von oben nach unten bewerten, die Schwelle 5 kennen und das Ergebnis immer mit Klinik, Voraufnahmen und radiologisch-pathologischer Konkordanz verbinden.', en: 'The Kaiser Score is a path, not a sum: assess definite features consistently from top to bottom, know the threshold of 5, and always integrate the result with clinical context, priors and radiology–pathology concordance.', fa: 'Kaiser Score یک مسیر است، نه جمع امتیازها: ویژگی‌های قطعی را از بالا به پایین ارزیابی کنید، آستانه ۵ را بشناسید و نتیجه را همیشه با زمینه بالینی، تصاویر قبلی و تطابق رادیولوژی–پاتولوژی ادغام کنید.' })}</p><div className={styles.takeHomeSteps}><strong>{tx({ de: 'Sicher statt vermutet', en: 'Definite, not suspected', fa: 'قطعی، نه مشکوک' })}</strong><strong>{tx({ de: 'Ab 5 abklären', en: 'Verify from 5', fa: 'از ۵ بررسی بافتی' })}</strong><strong>{tx({ de: 'Kontext entscheidet mit', en: 'Context still matters', fa: 'زمینه همچنان مهم است' })}</strong></div></div>
        </Section>
        <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang}/></div>
      </div>
    </div>
  </main>
}
