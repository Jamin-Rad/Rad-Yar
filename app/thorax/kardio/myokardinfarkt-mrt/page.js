'use client'

import Link from 'next/link'
import LessonKeyPoints from '@/components/LessonKeyPoints'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const copy = {
  title: L('Myokardinfarkt im Kardio-MRT', 'Myocardial infarction on cardiac MRI', 'انفارکت میوکارد در MRI قلب'),
  subtitle: L('LGE-Muster erkennen · MVO und Thrombus unterscheiden', 'Recognise LGE patterns · distinguish MVO and thrombus', 'شناخت الگوهای LGE · افتراق MVO و ترومبوس'),
  chapter: L('Kardiale Bildgebung / Kardio-MRT', 'Cardiac imaging / cardiac MRI', 'تصویربرداری قلبی / MRI قلب'),
  thorax: L('Thorax', 'Thorax', 'قفسه سینه'),
  contents: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  preview: L('Lektion im Aufbau · LGE-Grundlagen', 'Lesson in progress · LGE basics', 'درس در حال تکمیل · مبانی LGE'),
  read: L('Als gelesen markieren', 'Mark as read', 'علامت‌گذاری به‌عنوان خوانده‌شده'),
  readDone: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  auth: L('Bitte melde dich an, um deinen Lernfortschritt zu speichern.', 'Please sign in to save your learning progress.', 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.'),
  signIn: L('Anmelden', 'Sign in', 'ورود'),
  rule: L('Die Leitfrage', 'The key question', 'پرسش کلیدی'),
  ruleQuestion: L('Erfasst das LGE das Subendokard und folgt es einem Koronarterritorium?', 'Does the LGE involve the subendocardium and follow a coronary territory?', 'آیا LGE ساب‌اندوکارد را درگیر می‌کند و از قلمرو یک شریان کرونری پیروی می‌کند؟'),
  yes: L('Beides ja → eher ischämische Schädigung / Infarkt', 'Both yes → favour ischaemic injury / infarction', 'هر دو بله ← بیشتر به آسیب ایسکمیک / انفارکت فکر کن'),
  no: L('Mid-wall, subepikardial oder nichtterritorial → eher nichtischämisch', 'Mid-wall, subepicardial or non-territorial → favour non-ischaemic disease', 'میدوال، ساب‌اپیکاردیال یا غیرقلمروی ← بیشتر به بیماری غیرایسکمیک فکر کن'),
  caveat: L('Subendokardiales LGE allein beweist keinen Infarkt: eine diffuse, nichtterritoriale Verteilung kann z. B. bei Amyloidose vorkommen.', 'Subendocardial LGE alone does not prove infarction: a diffuse, non-territorial pattern can occur with amyloidosis.', 'LGE ساب‌اندوکاردی به‌تنهایی انفارکت را ثابت نمی‌کند؛ الگوی منتشر و غیرقلمروی می‌تواند در آمیلوئیدوز دیده شود.'),
  sources: L('Quellen', 'Sources', 'منابع'),
}

const sections = [
  {
    id: 'principle', number: '01', title: L('Warum ist gesundes Myokard dunkel?', 'Why is healthy myocardium dark?', 'چرا میوکارد سالم تیره است؟'),
    paragraphs: [
      L('Bei der Late-Gadolinium-Enhancement-Bildgebung (LGE) wird die Inversionszeit so eingestellt, dass das Signal des normalen Myokards unterdrückt (genullt) wird. Es erscheint nahezu schwarz.', 'In late gadolinium enhancement (LGE), the inversion time is chosen to null normal myocardium. It therefore appears nearly black.', 'در تصویربرداری Late Gadolinium Enhancement یا LGE، زمان وارونگی طوری تنظیم می‌شود که سیگنال میوکارد سالم null شود؛ بنابراین تقریباً سیاه دیده می‌شود.'),
      L('Bei Nekrose und Fibrose ist der effektive Extrazellulärraum vergrößert. Dort reichert sich relativ mehr Gadolinium an; das geschädigte Gewebe erscheint hell (hyperintens).', 'Necrosis and fibrosis expand the effective extracellular space. Relatively more gadolinium accumulates there, so injured tissue appears bright (hyperintense).', 'در نکروز و فیبروز، فضای خارج‌سلولی مؤثر افزایش می‌یابد. گادولینیوم بیشتری در آن ناحیه تجمع می‌یابد و بافت آسیب‌دیده روشن (hyperintense) دیده می‌شود.'),
    ],
    takeaway: L('Dunkel = genulltes normales Myokard · Hell = erweiterter Extrazellulärraum', 'Dark = nulled normal myocardium · Bright = expanded extracellular space', 'تیره = میوکارد سالم null‌شده · روشن = فضای خارج‌سلولی افزایش‌یافته'),
  },
  {
    id: 'infarct', number: '02', title: L('Infarct-type LGE', 'Infarct-type LGE', 'الگوی LGE در انفارکت'),
    paragraphs: [L('Ein typischer Infarkt zeigt deutlich hyperintenses, häufig relativ scharf begrenztes LGE in einem Koronararterienterritorium. Es beginnt am Subendokard und kann sich nach außen ausdehnen.', 'A typical infarct shows marked, often fairly sharply demarcated hyperintense LGE in a coronary artery territory. It starts at the subendocardium and may extend outwards.', 'در انفارکت، LGE معمولاً واضح، شدیداً هایپراینتنس و نسبتاً با مرز مشخص است؛ از قلمرو یک شریان کرونری پیروی می‌کند، از ساب‌اندوکارد شروع می‌شود و ممکن است به سمت بیرون گسترش یابد.')],
    bullets: [
      L('Subendokardial: Nur der innere Anteil der Wand ist betroffen.', 'Subendocardial: only the inner portion of the wall is involved.', 'ساب‌اندوکاردیال: فقط بخش داخلی دیواره درگیر است.'),
      L('Transmural: Das LGE reicht vom Subendokard bis zum Epikard und erfasst nahezu die gesamte Wanddicke.', 'Transmural: LGE extends from subendocardium to epicardium and involves nearly the entire wall thickness.', 'ترانس‌مورال: LGE از ساب‌اندوکارد تا اپیکارد گسترش می‌یابد و تقریباً تمام ضخامت دیواره را درگیر می‌کند.'),
    ],
    takeaway: L('Ausdehnung und Transmuralität des LGE beschreiben die Infarktgröße und den Anteil der betroffenen Wand.', 'LGE extent and transmurality describe infarct size and the proportion of wall involved.', 'وسعت و میزان ترانس‌مورال بودن LGE برای تعیین اندازهٔ انفارکت و درصد درگیری ضخامت دیواره مهم‌اند.'),
  },
  {
    id: 'mvo', number: '03', title: L('Mikrovaskuläre Obstruktion (MVO)', 'Microvascular obstruction (MVO)', 'انسداد میکروواسکولار (MVO)'),
    paragraphs: [
      L('In einem hellen Infarktareal kann ein dunkler Kern liegen: microvascular obstruction (MVO). Trotz Wiedereröffnung der großen Koronararterie ist die Mikrozirkulation schwer geschädigt; Kontrastmittel erreicht den Kern nur verzögert oder gar nicht.', 'A dark core may sit inside a bright infarct: microvascular obstruction (MVO). Even after the main coronary artery is reopened, severe microcirculatory injury delays or prevents contrast from reaching the core.', 'گاهی درون ناحیهٔ سفید انفارکت، هسته‌ای تیره دیده می‌شود: microvascular obstruction یا MVO. حتی پس از باز شدن شریان اصلی، میکروسیرکولاسیون ممکن است آن‌قدر آسیب دیده باشد که ورود کنتراست به هسته به تأخیر بیفتد یا رخ ندهد.'),
      L('MVO spricht bei akutem Infarkt für eine schwerere Reperfusionsschädigung und ist prognostisch ungünstig.', 'In acute infarction, MVO indicates more severe reperfusion injury and is associated with a worse prognosis.', 'در انفارکت حاد، MVO نشانهٔ آسیب شدیدتر پس از بازپرفیوژن است و با پیش‌آگهی نامطلوب‌تر همراهی دارد.'),
    ],
    takeaway: L('Hell = infarziertes Myokard · Dunkler Kern in der Wand = MVO', 'Bright = infarcted myocardium · Dark core within the wall = MVO', 'سفید = میوکارد انفارکت‌شده · هستهٔ تیره داخل دیواره = MVO'),
  },
  {
    id: 'thrombus', number: '04', title: L('Wandständiger Thrombus', 'Mural (apposition) thrombus', 'ترومبوس جداری (Apposition thrombus)'),
    paragraphs: [
      L('Eine dunkle, nicht anreichernde Struktur innerhalb der Ventrikelhöhle, die der Infarktwand anliegt, lässt an einen muralen beziehungsweise Appositionsthrombus denken.', 'A dark, non-enhancing structure in the ventricular cavity that adheres to the infarcted wall suggests a mural or apposition thrombus.', 'ساختاری تیره و بدون enhancement در حفرهٔ بطن که به دیوارهٔ انفارکت‌شده چسبیده باشد، مطرح‌کنندهٔ mural یا apposition thrombus است.'),
      L('Ein klassisches Beispiel ist ein apikaler Thrombus nach großem Vorderwandinfarkt. Entscheidend ist die Lage: MVO liegt innerhalb des Myokards, ein Thrombus ragt in die Ventrikelhöhle.', 'An apical thrombus after a large anterior infarct is a classic example. Location matters: MVO lies within the myocardium, whereas thrombus is in the ventricular cavity.', 'نمونهٔ کلاسیک، ترومبوس اپیکال پس از انفارکت بزرگ دیوارهٔ قدامی است. محل ضایعه مهم است: MVO داخل میوکارد قرار دارد، اما ترومبوس در حفرهٔ بطن است.'),
    ],
  },
  {
    id: 'noninfarct', number: '05', title: L('Non-infarct-type LGE', 'Non-infarct-type LGE', 'الگوهای غیرانفارکتی LGE'),
    paragraphs: [L('Fehlt die typische Kombination aus subendokardialem Beginn und koronarer Verteilung, spricht das Muster eher für eine nichtischämische Myokarderkrankung. Die Verteilung liefert Hinweise, aber keine Diagnose für sich allein.', 'If the combination of subendocardial involvement and coronary distribution is absent, the pattern favours non-ischaemic myocardial disease. Distribution offers clues but is not diagnostic on its own.', 'اگر ترکیبِ شروع از ساب‌اندوکارد و توزیع مطابق قلمرو کرونری وجود نداشته باشد، الگو بیشتر به نفع بیماری غیرایسکمیک میوکارد است. توزیع سرنخ می‌دهد، اما به‌تنهایی تشخیص قطعی نمی‌سازد.')],
    bullets: [
      L('Subepikardial → häufig bei Myokarditis.', 'Subepicardial → often seen in myocarditis.', 'ساب‌اپیکاردیال ← در میوکاردیت شایع است.'),
      L('Mid-wall / intramyokardial → z. B. bei dilatativer Kardiomyopathie.', 'Mid-wall / intramyocardial → for example, in dilated cardiomyopathy.', 'میدوال / اینترامیوکاردیال ← مثلاً در کاردیومیوپاتی اتساعی.'),
      L('Diffus subendokardial oder transmural ohne Koronarterritorium → kann bei kardialer Amyloidose vorkommen.', 'Diffuse subendocardial or transmural without a coronary territory → can occur in cardiac amyloidosis.', 'ساب‌اندوکاردیال یا ترانس‌مورال منتشر با الگوی غیرکرونری ← ممکن است در آمیلوئیدوز قلبی دیده شود.'),
      L('Je nach Erkrankung sind auch fokale, multifokale oder diffuse Muster möglich.', 'Focal, multifocal or diffuse patterns are also possible depending on the disease.', 'بسته به بیماری، الگوهای فوکال، چندکانونی یا منتشر نیز ممکن‌اند.'),
    ],
  },
]

const references = [
  { label: 'SCMR position paper: clinical indications for CMR', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7649060/' },
  { label: 'Cardiac MR assessment of microvascular obstruction', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4651190/' },
  { label: 'CMR imaging for assessment of cardiac thrombus', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3782319/' },
  { label: 'Clinical CMR patterns in cardiomyopathies', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9902331/' },
]

export default function MyokardinfarktMrtPage() {
  const { lang } = useLanguage()
  const current = lang === 'fa' || lang === 'en' ? lang : 'de'
  const t = value => value[current]
  const { isRead, toggleRead, authError } = useLessonReadStatus('myokardinfarkt-mrt')
  useMobileLearningLayout()
  const withLang = href => current === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${current}`
  const readButton = <div className={base.readControl}><button type="button" className={`${base.readButton} ${isRead ? base.readButtonActive : ''}`} onClick={toggleRead}><span className={base.readCheck}>{isRead ? '✓' : ''}</span><span>{t(isRead ? copy.readDone : copy.read)}</span></button>{authError && <div className={base.readError}><span>{t(copy.auth)}</span><Link href={withLang('/sign-in')}>{t(copy.signIn)}</Link></div>}</div>

  return <main className={`${base.page} ${styles.page}`} dir={current === 'fa' ? 'rtl' : 'ltr'} lang={current}>
    <header className={base.header}>
      <nav className={base.breadcrumb} aria-label="Breadcrumb"><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{t(copy.thorax)}</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{t(copy.chapter)}</Link><span>›</span><strong>{t(copy.title)}</strong></nav>
      <div className={base.hero}>
        <div className={`${base.heroText} ${styles.heroText}`}><span className={base.sourceBadge}>Dr. Zia</span><span className={styles.eyebrow}>LGE · KARDIO-MRT</span><h1>{t(copy.title)}</h1><p>{t(copy.subtitle)}</p><small>{t(copy.preview)}</small></div>
        <LessonKeyPoints points={[[t(sections[1].title), t(sections[1].takeaway)], [t(sections[2].title), t(sections[2].takeaway)], [t(copy.rule), t(copy.ruleQuestion)]]} />
      </div>
    </header>
    <div className={base.readBar}>{readButton}</div>
    <div className={base.layout}>
      <aside className={base.sidebar}><div className={base.sideTitle}>{t(copy.contents)}</div>{sections.map(section => <a className={base.sideItem} href={`#${section.id}`} key={section.id}><span className={styles.navNumber}>{section.number}</span><strong>{t(section.title)}</strong></a>)}<a className={base.sideItem} href="#decision"><span className={styles.navNumber}>06</span><strong>{t(copy.rule)}</strong></a></aside>
      <div className={base.main}>
        {sections.map(section => <section className={`${base.section} ${styles.section}`} id={section.id} key={section.id}>
          <div className={styles.sectionHead}><span>{section.number}</span><h2>{t(section.title)}</h2></div>
          <div className={styles.sectionBody}>{section.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph)}</p>)}{section.bullets && <ul>{section.bullets.map((bullet, index) => <li key={index}>{t(bullet)}</li>)}</ul>}{section.takeaway && <div className={styles.takeaway}>{t(section.takeaway)}</div>}</div>
        </section>)}
        <section className={`${base.section} ${styles.section} ${styles.decision}`} id="decision"><div className={styles.sectionHead}><span>06</span><h2>{t(copy.rule)}</h2></div><div className={styles.sectionBody}><p className={styles.question}>{t(copy.ruleQuestion)}</p><div className={styles.answers}><div>{t(copy.yes)}</div><div>{t(copy.no)}</div></div><p className={styles.caveat}>{t(copy.caveat)}</p></div></section>
        <section className={`${base.section} ${styles.section}`} id="sources"><div className={styles.sectionHead}><span>↗</span><h2>{t(copy.sources)}</h2></div><div className={styles.references}>{references.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a>)}</div></section>
        <div className={styles.bottomRead}>{readButton}</div>
      </div>
    </div>
  </main>
}
