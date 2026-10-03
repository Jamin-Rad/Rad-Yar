'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

const SECTION_COPY = [
  { id: 'start', short: L('Start', 'Start', 'شروع'), title: L('Der 5-Minuten-Workflow', 'The five-minute workflow', 'روند پنج‌دقیقه‌ای'), icon: 'brain' },
  { id: 'fall', short: L('Radiopaedia-Fall', 'Radiopaedia case', 'کیس Radiopaedia'), title: L('Bildbefund unter Zeitdruck', 'Imaging under time pressure', 'تفسیر تصویر در شرایط حساس زمانی'), icon: 'case' },
  { id: 'take-home', short: 'Take Home Message', title: 'Take Home Message', icon: 'spark', emphasis: true },
]

const SECTION_IDS = SECTION_COPY.map(section => section.id)

const COPY = {
  title: L('Akuter ischämischer Schlaganfall', 'Acute ischaemic stroke', 'سکته ایسکمیک حاد'),
  mcq: L('MCQ starten', 'Start MCQs', 'شروع MCQ'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  facts: [
    ['NCCT', L('Blutung ausschließen', 'Exclude haemorrhage', 'رد خونریزی')],
    ['CTA', L('Gefäßverschluss lokalisieren', 'Localise the occlusion', 'تعیین محل انسداد عروقی')],
    ['CTP', L('Rettbares Gewebe erkennen', 'Identify salvageable tissue', 'شناسایی بافت قابل نجات')],
  ],
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  close: L('Schließen', 'Close', 'بستن'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  open: L('Abschnitt öffnen', 'Open section', 'باز کردن بخش'),
  intro: L(
    'In wenigen, strukturierten Schritten von der ersten Bildbeurteilung zur richtigen Therapieentscheidung – schnell, sicher und teamorientiert.',
    'Move from first image review to the right treatment decision in a few structured steps — quickly, safely, and as a team.',
    'با چند گام ساختاریافته از نخستین بررسی تصویر به تصمیم درمانی درست برسید — سریع، ایمن و تیم‌محور.'
  ),
  workflow: [
    [L('Blutung?', 'Haemorrhage?', 'خونریزی؟'), L('Intrakranielle Blutung ausschließen', 'Exclude intracranial haemorrhage', 'رد خونریزی داخل جمجمه'), 'brain'],
    [L('Frühischämie?', 'Early ischaemia?', 'ایسکمی اولیه؟'), L('ASPECTS und subtile Zeichen prüfen', 'Check ASPECTS and subtle signs', 'بررسی ASPECTS و علائم ظریف'), 'scan'],
    ['LVO?', L('Großgefäßverschluss lokalisieren', 'Localise large-vessel occlusion', 'تعیین محل انسداد عروق بزرگ'), 'vessel'],
    [L('Kern & Penumbra?', 'Core & penumbra?', 'هسته و پنومبرا؟'), L('Rettbares Gewebe beurteilen', 'Assess salvageable tissue', 'ارزیابی بافت قابل نجات'), 'chart'],
    [L('Teamentscheidung', 'Team decision', 'تصمیم تیمی'), L('Befunde priorisieren und kommunizieren', 'Prioritise and communicate findings', 'اولویت‌بندی و انتقال یافته‌ها'), 'decision'],
  ],
  warningTitle: L('Nicht an einer unauffälligen NCCT hängen bleiben', 'Do not stop at a normal NCCT', 'در NCCT طبیعی متوقف نشوید'),
  warningText: L(
    'Eine frühe Ischämie kann in der NCCT noch subtil sein. Bei passender Klinik die Gefäßbildgebung ohne unnötige Verzögerung fortsetzen.',
    'Early ischaemia may still be subtle on NCCT. When the clinical picture fits, continue vascular imaging without unnecessary delay.',
    'ایسکمی اولیه ممکن است در NCCT هنوز ظریف باشد. در صورت تطابق بالینی، تصویربرداری عروقی را بدون تأخیر غیرضروری ادامه دهید.'
  ),
  miniCheck: L('Mini-Check', 'Mini check', 'آزمون کوتاه'),
  question: L('Wo liegt der nächste diagnostische Schritt?', 'What is the next diagnostic step?', 'گام تشخیصی بعدی چیست؟'),
  caseText: L(
    '72-jähriger Patient mit akut aufgetretener Hemiparese rechts. Die NCCT zeigt keine Blutung und allenfalls diskrete Frühzeichen einer Ischämie.',
    'A 72-year-old patient presents with acute right hemiparesis. NCCT shows no haemorrhage and, at most, subtle early ischaemic change.',
    'بیمار ۷۲ ساله با همی‌پارزی حاد سمت راست مراجعه کرده است. NCCT خونریزی نشان نمی‌دهد و فقط علائم ظریف اولیه ایسکمی دیده می‌شود.'
  ),
  options: [
    L('Verlaufskontrolle mit erneuter NCCT in 6 Stunden', 'Repeat NCCT in six hours', 'تکرار NCCT پس از ۶ ساعت'),
    L('CTA zum Nachweis eines Gefäßverschlusses', 'CTA to detect a vessel occlusion', 'CTA برای تشخیص انسداد عروقی'),
    L('Direkte CTP ohne Gefäßdarstellung', 'Proceed directly to CTP without vessel imaging', 'انجام مستقیم CTP بدون تصویربرداری عروقی'),
  ],
  checkAnswer: L('Antwort prüfen', 'Check answer', 'بررسی پاسخ'),
  correct: L('Richtig. Die CTA klärt jetzt rasch, ob ein proximaler Gefäßverschluss vorliegt.', 'Correct. CTA now rapidly determines whether a proximal vessel occlusion is present.', 'درست است. CTA اکنون به‌سرعت وجود انسداد پروگزیمال عروقی را مشخص می‌کند.'),
  incorrect: L('Noch nicht. Nach Blutungsausschluss muss bei diesem Defizit der Gefäßstatus zügig geklärt werden.', 'Not yet. After excluding haemorrhage, the vascular status must be clarified promptly in this patient.', 'هنوز نه. پس از رد خونریزی، وضعیت عروقی در این بیمار باید سریع مشخص شود.'),
  finalLabel: L('Das Wesentliche in vier Sätzen', 'The essentials in four lines', 'اصل مطلب در چهار جمله'),
}

const LESSON_CONTENT = {
  ncct: {
    lead: L('Die native CT beantwortet zuerst die Sicherheitsfrage und zeigt danach das Ausmaß früher Parenchymveränderungen.', 'NCCT answers the safety question first, then shows the extent of early parenchymal change.', 'CT بدون کنتراست ابتدا به پرسش ایمنی پاسخ می‌دهد و سپس وسعت تغییرات اولیه پارانشیم را نشان می‌دهد.'),
    cards: [
      ['01', L('Blutung ausschließen', 'Exclude haemorrhage', 'رد خونریزی'), L('Parenchym, Ventrikel und Subarachnoidalräume systematisch prüfen.', 'Systematically review parenchyma, ventricles, and subarachnoid spaces.', 'پارانشیم، بطن‌ها و فضاهای ساب‌آراکنوئید را منظم بررسی کنید.')],
      ['02', L('Frühzeichen suchen', 'Look for early signs', 'جستجوی علائم اولیه'), L('Insular ribbon, Nucleus lentiformis, Sulcusverstrich und hyperdenses Gefäß.', 'Insular ribbon, lentiform nucleus, sulcal effacement, and a hyperdense vessel.', 'نوار اینسولا، هسته لنتی‌فرم، محوشدن سولکوس و رگ هایپردنس.')],
      ['03', 'ASPECTS', L('Das betroffene MCA-Parenchym quantifizieren – nicht den Gefäßverschluss.', 'Quantify affected MCA parenchyma — not the vessel occlusion.', 'پارانشیم درگیر MCA را کمی‌سازی کنید — نه خود انسداد عروقی را.')],
    ],
    note: L('Merke: Eine unauffällige NCCT schließt eine klinisch relevante frühe Ischämie nicht aus.', 'Remember: a normal NCCT does not exclude clinically relevant early ischaemia.', 'به یاد داشته باشید: NCCT طبیعی، ایسکمی اولیه مهم از نظر بالینی را رد نمی‌کند.'),
  },
  cta: {
    lead: L('Die CTA verbindet die klinische Symptomatik mit der behandelbaren Gefäßläsion.', 'CTA links the clinical deficit to the treatable vascular lesion.', 'CTA علائم بالینی را به ضایعه عروقی قابل درمان مرتبط می‌کند.'),
    cards: [
      ['A', L('Verschlusshöhe', 'Occlusion level', 'سطح انسداد'), L('ICA, M1, M2 oder Basilaris präzise benennen.', 'Name ICA, M1, M2, or basilar occlusion precisely.', 'انسداد ICA، M1، M2 یا بازیلار را دقیق بیان کنید.')],
      ['B', L('Gefäßweg', 'Access route', 'مسیر عروقی'), L('Tandemläsion, Stenose oder Dissektion aktiv suchen.', 'Actively look for tandem lesions, stenosis, or dissection.', 'ضایعه تاندوم، تنگی یا دیسکسیون را فعالانه جستجو کنید.')],
      ['C', L('Kollateralen', 'Collaterals', 'کولترال‌ها'), L('Die distale Gefäßfüllung im klinischen Kontext einordnen.', 'Interpret distal vessel filling in clinical context.', 'پرشدن عروق دیستال را در زمینه بالینی تفسیر کنید.')],
    ],
    note: L('Befundkern: Seite + Segment + Tandemläsion + Kollateralstatus.', 'Report core: side + segment + tandem lesion + collateral status.', 'هسته گزارش: سمت + سگمان + ضایعه تاندوم + وضعیت کولترال‌ها.'),
  },
  perfusion: {
    lead: L('Perfusionskarten sind Entscheidungshilfen. Zuerst Qualität und Bewegungsartefakte prüfen, dann Kern und hypoperfundiertes Gewebe vergleichen.', 'Perfusion maps support decisions. Check quality and motion first, then compare core and hypoperfused tissue.', 'نقشه‌های پرفیوژن ابزار کمک‌تصمیم هستند. ابتدا کیفیت و آرتیفکت حرکت و سپس هسته و بافت کم‌پرفیوژن را مقایسه کنید.'),
    metrics: [
      ['CBF', L('im Kern deutlich vermindert', 'markedly reduced in the core', 'در هسته به‌طور واضح کاهش‌یافته')],
      ['CBV', L('nicht isoliert interpretieren', 'do not interpret in isolation', 'به‌تنهایی تفسیر نشود')],
      ['Tmax', L('zeigt relevante Perfusionsverzögerung', 'shows relevant perfusion delay', 'تأخیر مهم پرفیوژن را نشان می‌دهد')],
    ],
    note: L('Plausibilitätscheck: Passt die Perfusionsstörung zur Klinik, zum Gefäßverschluss und zum Parenchymbefund?', 'Plausibility check: does the perfusion deficit match the clinical picture, vessel occlusion, and parenchymal findings?', 'بررسی منطقی: آیا اختلال پرفیوژن با علائم بالینی، انسداد عروقی و یافته پارانشیم هم‌خوانی دارد؟'),
  },
  entscheidung: {
    lead: L('Ein starker Akutbefund komprimiert die Untersuchung auf vier handlungsrelevante Aussagen.', 'A strong acute report compresses the study into four actionable statements.', 'یک گزارش حاد قوی بررسی را به چهار گزاره عملی فشرده می‌کند.'),
    report: [
      L('Keine intrakranielle Blutung.', 'No intracranial haemorrhage.', 'خونریزی داخل جمجمه وجود ندارد.'),
      L('Frühischämische Veränderungen links im MCA-Territorium, ASPECTS 8.', 'Early ischaemic change in the left MCA territory, ASPECTS 8.', 'تغییرات اولیه ایسکمیک در قلمرو MCA چپ، ASPECTS برابر ۸.'),
      L('Proximaler M1-Verschluss links, keine Tandemläsion.', 'Proximal left M1 occlusion, no tandem lesion.', 'انسداد پروگزیمال M1 چپ، بدون ضایعه تاندوم.'),
      L('Perfusionsmismatch mit erhaltener Penumbra; Stroke-Team unmittelbar informiert.', 'Perfusion mismatch with preserved penumbra; stroke team informed immediately.', 'عدم تطابق پرفیوژن با پنومبرای حفظ‌شده؛ تیم سکته بلافاصله مطلع شد.'),
    ],
    note: L('Kommunikation ist Teil des Befunds: kritischen Verschluss und Zeitpunkt der Übergabe dokumentieren.', 'Communication is part of the report: document the critical occlusion and time of handover.', 'ارتباط بخشی از گزارش است: انسداد بحرانی و زمان اطلاع‌رسانی را ثبت کنید.'),
  },
  'take-home': {
    points: [
      L('NCCT: Blutung und frühe Parenchymzeichen.', 'NCCT: haemorrhage and early parenchymal signs.', 'NCCT: خونریزی و علائم اولیه پارانشیم.'),
      L('CTA: genaue Verschlusshöhe und Gefäßweg.', 'CTA: exact occlusion level and vascular route.', 'CTA: سطح دقیق انسداد و مسیر عروقی.'),
      L('CTP: nur technisch valide und im Kontext interpretieren.', 'CTP: interpret only when technically valid and in context.', 'CTP: فقط در صورت اعتبار فنی و در زمینه مناسب تفسیر شود.'),
      L('Der Befund endet mit einer klaren Handlungsbotschaft.', 'The report ends with a clear action message.', 'گزارش با یک پیام عملی روشن پایان می‌یابد.'),
    ],
  },
}

const RADIOPAEDIA_CASE = {
  image: '/stroke/case-dense-mca-rid-45310.png',
  url: 'https://radiopaedia.org/cases/acute-ischaemic-stroke-dense-mca-sign?lang=us',
  title: L('Akuter linker MCA-Infarkt mit Dense-MCA-Zeichen', 'Acute left MCA infarct with a dense MCA sign', 'انفارکت حاد MCA چپ با علامت MCA هایپردنس'),
  text: L(
    '80-jährige Patientin mit akuter Aphasie und rechtsseitiger Schwäche. Die NCCT zeigt ein hyperdenses linkes MCA-Segment, Verlust des Insular ribbon und beginnende Hypodensität im linken MCA-Territorium.',
    'An 80-year-old woman with acute aphasia and right-sided weakness. NCCT shows a dense left MCA segment, loss of the insular ribbon and early low attenuation in the left MCA territory.',
    'خانم ۸۰ ساله با آفازی حاد و ضعف سمت راست؛ NCCT سگمان هایپردنس MCA چپ، محوشدن نوار اینسولا و هیپودنسیتی اولیه در قلمرو MCA چپ را نشان می‌دهد.'
  ),
  alt: L('Native CCT mit hyperdensem linken MCA-Zeichen', 'Non-contrast CT with a dense left MCA sign', 'CT بدون کنتراست با علامت MCA هایپردنس چپ'),
  credit: 'Case courtesy of Gaurav Som Prakash Gupta, Radiopaedia.org · rID-45310 · CC BY-NC-SA 3.0',
}

function Icon({ name, className = '' }) {
  const paths = {
    brain: <><path d="M12 5.3a3.4 3.4 0 0 0-6.1 2.1A3.5 3.5 0 0 0 4 13.8a3.8 3.8 0 0 0 4 4.9c1.1 0 2.1-.5 2.7-1.2V6.8A2.9 2.9 0 0 0 8.2 4c-1 0-1.8.5-2.3 1.3"/><path d="M12 5.3a3.4 3.4 0 0 1 6.1 2.1 3.5 3.5 0 0 1 1.9 6.4 3.8 3.8 0 0 1-4 4.9c-1.1 0-2.1-.5-2.7-1.2V6.8A2.9 2.9 0 0 1 15.8 4c1 0 1.8.5 2.3 1.3"/><path d="M7.2 9.2c1 .1 1.8.8 1.9 1.8M16.8 9.2c-1 .1-1.8.8-1.9 1.8M7.5 15.2c.8-.7 1.6-.9 2.4-.7M16.5 15.2c-.8-.7-1.6-.9-2.4-.7"/></>,
    scan: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M3.5 10.5h2M10.5 3.5v2"/></>,
    vessel: <><path d="M12 21V11M12 11 7 6M12 11l5-5M7 6V3M17 6V3M8.5 14.5 5 18v3M15.5 14.5 19 18v3"/><circle cx="12" cy="10.5" r="1.2"/></>,
    chart: <><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/><path d="m3 6 5 2 5-4 6 3"/></>,
    decision: <><circle cx="8" cy="7" r="2.2"/><circle cx="16" cy="7" r="2.2"/><path d="M3.5 19v-2.2A3.8 3.8 0 0 1 7.3 13h1.4a3.8 3.8 0 0 1 3.8 3.8V19M12.5 19v-2.2A3.8 3.8 0 0 1 16.3 13h.4a3.8 3.8 0 0 1 3.8 3.8V19"/></>,
    case: <><path d="M6 4h12v16H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></>,
    check: <><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Section({ section, lang, open, isRead, onToggle, onReadToggle, children }) {
  return <section id={section.id} className={`${styles.section} ${open ? styles.sectionOpen : ''} ${section.emphasis ? styles.takeHomeSection : ''}`}>
    <button type="button" className={styles.sectionHeader} aria-expanded={open} aria-controls={`${section.id}-panel`} onClick={() => onToggle(section.id)}>
      <span className={styles.sectionIcon}><Icon name={section.icon} /></span>
      <span>{section.emphasis ? <small>{pick(COPY.finalLabel, lang)}</small> : null}<strong>{pick(section.title, lang)}</strong></span>
      <span className={styles.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id={`${section.id}-panel`} hidden={!open} className={styles.sectionBody}>
      {children}
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => onReadToggle(section.id)}><Icon name="check" />{pick(isRead ? COPY.completed : COPY.complete, lang)}</button>
    </div>
  </section>
}

function MiniCheck({ lang }) {
  const [selected, setSelected] = useState(1)
  const [checked, setChecked] = useState(false)
  const resultCorrect = selected === 1

  return <div className={styles.miniCheck}>
    <div className={styles.questionBlock}><span><Icon name="vessel" />{pick(COPY.miniCheck, lang)}</span><h3>{pick(COPY.question, lang)}</h3><p>{pick(COPY.caseText, lang)}</p></div>
    <div className={styles.answers} role="radiogroup" aria-label={pick(COPY.question, lang)}>
      {COPY.options.map((option, index) => <button key={pick(option, lang)} type="button" role="radio" aria-checked={selected === index} className={selected === index ? styles.answerSelected : ''} onClick={() => { setSelected(index); setChecked(false) }}><i aria-hidden="true" />{pick(option, lang)}</button>)}
      <button className={styles.checkButton} type="button" onClick={() => setChecked(true)}>{pick(COPY.checkAnswer, lang)}<span aria-hidden="true">→</span></button>
      {checked ? <p className={`${styles.feedback} ${resultCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status">{pick(resultCorrect ? COPY.correct : COPY.incorrect, lang)}</p> : null}
    </div>
  </div>
}

function StartSection({ lang }) {
  return <>
    <p className={styles.lead}>{pick(COPY.intro, lang)}</p>
    <ol className={styles.workflow}>
      {COPY.workflow.map(([title, text, icon], index) => <li key={pick(title, lang)}><span className={styles.stepIcon}><Icon name={icon} /></span><span className={styles.stepNumber}>{index + 1}</span><strong>{pick(title, lang)}</strong><p>{pick(text, lang)}</p></li>)}
    </ol>
    <aside className={styles.warning}><span aria-hidden="true">!</span><div><strong>{pick(COPY.warningTitle, lang)}</strong><p>{pick(COPY.warningText, lang)}</p></div></aside>
    <MiniCheck lang={lang} />
  </>
}

function RadiopaediaCase({ lang }) {
  return <article className={styles.caseStudy}>
    <a className={styles.caseImage} href={RADIOPAEDIA_CASE.url} target="_blank" rel="noopener noreferrer">
      <Image src={RADIOPAEDIA_CASE.image} alt={pick(RADIOPAEDIA_CASE.alt, lang)} width={612} height={612} />
      <span>{pick(L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'), lang)} ↗</span>
    </a>
    <div className={styles.caseBody}>
      <small>RADIOPAEDIA · rID 45310</small>
      <h3>{pick(RADIOPAEDIA_CASE.title, lang)}</h3>
      <p>{pick(RADIOPAEDIA_CASE.text, lang)}</p>
      <footer>{RADIOPAEDIA_CASE.credit}</footer>
    </div>
  </article>
}

function ContentSection({ id, lang }) {
  if (id === 'fall') return <><p className={styles.lead}>{pick(L('Erkenne das frühe CT-Zeichen, bevor du die nächste Untersuchung auswählst.', 'Recognise the early CT sign before selecting the next examination.', 'پیش از انتخاب بررسی بعدی، علامت اولیه CT را شناسایی کنید.'), lang)}</p><RadiopaediaCase lang={lang} /><MiniCheck lang={lang} /></>
  const content = LESSON_CONTENT[id]
  return <>
    {content.lead ? <p className={styles.lead}>{pick(content.lead, lang)}</p> : null}
    {content.cards ? <div className={styles.learningRows}>{content.cards.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{pick(title, lang)}</h3><p>{pick(text, lang)}</p></div></article>)}</div> : null}
    {content.metrics ? <div className={styles.metrics}>{content.metrics.map(([name, text]) => <article key={name}><strong>{name}</strong><span>{pick(text, lang)}</span></article>)}</div> : null}
    {content.report ? <div className={styles.report}><span>{pick(L('So klingt ein klarer Akutbefund', 'A clear acute report', 'نمونه یک گزارش حاد روشن'), lang)}</span><ol>{content.report.map(line => <li key={pick(line, lang)}>{pick(line, lang)}</li>)}</ol></div> : null}
    {content.points ? <div className={styles.takeHomePanel}><header><Icon name="spark" /><div><small>{pick(COPY.finalLabel, lang)}</small><h3>Take Home Message</h3></div></header><ol className={styles.takeHome}>{content.points.map((point, index) => <li key={pick(point, lang)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{pick(point, lang)}</strong></li>)}</ol></div> : null}
    {content.note ? <aside className={styles.keyPoint}><Icon name="check" /><p>{pick(content.note, lang)}</p></aside> : null}
  </>
}

function MobileLearningPath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const activeSection = SECTION_COPY.find(section => section.id === openId) || SECTION_COPY[0]
  const progress = (readSections.size / SECTION_COPY.length) * 360
  const selectFromPanel = id => { onSelect(id); setPanelOpen(false) }

  return <div className={styles.mobileLearningPath}>
    {panelOpen ? <section id="mobile-learning-path-panel" className={styles.mobilePathPanel} role="dialog" aria-label={pick(COPY.path, lang)}>
      <header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {SECTION_COPY.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header>
      <nav>{SECTION_COPY.map(section => <button type="button" key={section.id} className={`${openId === section.id ? styles.mobilePathCurrent : ''} ${section.emphasis ? styles.mobilePathFinal : ''}`} onClick={() => selectFromPanel(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={styles.mobilePathItemIcon}><Icon name={section.icon} /></span><span><strong>{pick(section.short, lang)}</strong><small>{pick(section.title, lang)}</small></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav>
    </section> : null}
    <button type="button" className={styles.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mobile-learning-path-panel"><span className={styles.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{SECTION_COPY.length}</small></span><span className={styles.mobileCurrentIcon}><Icon name={activeSection.icon} /></span><span className={styles.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(activeSection.short, lang)}</small></span></button>
  </div>
}

export default function TestLearningPage() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('start')
  const [readSections, setReadSections] = usePersistedSectionProgress('andarun-test', SECTION_IDS)
  const activeIndex = useMemo(() => Math.max(0, SECTION_COPY.findIndex(section => section.id === openId)), [openId])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (SECTION_IDS.includes(hash)) setOpenId(hash)
  }, [])

  const selectSection = id => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    window.history.replaceState(null, '', nextId ? `#${nextId}` : window.location.pathname)
    if (nextId) requestAnimationFrame(() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const advance = () => selectSection(SECTION_COPY[Math.min(activeIndex + 1, SECTION_COPY.length - 1)].id)
  const toggleSectionRead = id => setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const lessonComplete = readSections.size === SECTION_COPY.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(SECTION_IDS))

  return <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}>
      <div className={styles.topline}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">RadYar</Link><span>/</span><Link href="/andarun">Andarun</Link><span>/</span><strong>Test</strong></nav><span className={styles.author}>Dr. Zia</span></div>
      <div className={styles.hero}><div className={styles.heroCopy}><h1>{pick(COPY.title, lang)}</h1><div className={styles.actions}><Link className={styles.primaryAction} href="/ueben/quiz?fach=gehirn&n=10&themen=ischaemischer-schlaganfall&from=%2Fandarun%2Ftest">{pick(COPY.mcq, lang)}<span aria-hidden="true">→</span></Link><Link className={styles.secondaryAction} href="/flashcards/ischaemischer-schlaganfall"><Icon name="case" />{pick(COPY.flashcards, lang)}</Link></div></div><div className={styles.heroFacts}>{COPY.facts.map(([value, label], index) => <article key={value}><span className={styles.factIcon}><Icon name={['brain', 'vessel', 'chart'][index]} /></span><strong>{value}</strong><p>{pick(label, lang)}</p></article>)}</div></div>
      <div className={styles.progressBar}><div className={styles.progressTrack}><i style={{ width: `${(readSections.size / SECTION_COPY.length) * 100}%` }} /></div><span>{readSections.size} / {SECTION_COPY.length} {pick(COPY.progress, lang)}</span><div className={styles.progressActions}><button type="button" className={`${styles.lessonCompleteButton} ${lessonComplete ? styles.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><Icon name="check" />{pick(lessonComplete ? COPY.lessonCompleted : COPY.completeLesson, lang)}</button><button type="button" className={styles.continueButton} onClick={advance} disabled={activeIndex === SECTION_COPY.length - 1}>{pick(COPY.continue, lang)}<span aria-hidden="true">→</span></button></div></div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}><h2>{pick(COPY.path, lang)}</h2><nav>{SECTION_COPY.map(section => <button type="button" key={section.id} className={`${openId === section.id ? styles.activeSideItem : ''} ${section.emphasis ? styles.finalSideItem : ''}`} onClick={() => selectSection(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.short, lang)}`}><span className={styles.sideIcon}><Icon name={section.icon} /></span><strong>{pick(section.short, lang)}</strong></button>)}</nav></aside>
      <article className={styles.lesson}>{SECTION_COPY.map(section => <Section key={section.id} section={section} lang={lang} open={openId === section.id} isRead={readSections.has(section.id)} onToggle={selectSection} onReadToggle={toggleSectionRead}>{section.id === 'start' ? <StartSection lang={lang} /> : <ContentSection id={section.id} lang={lang} />}</Section>)}</article>
    </div>
    <MobileLearningPath lang={lang} openId={openId} readSections={readSections} onSelect={selectSection} />
  </main>
}
