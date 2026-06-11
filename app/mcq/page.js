'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TOPICS = [
  {
    key: 'km-roentgen-grundlagen',
    href: '/ueben/quiz?fach=technik&n=10&themen=km-roentgen-grundlagen',
    icon: '☢️', iconImage: '/fach/technik.png', color: '#f97316', available: true,
    count: { de: '2 Fragen', en: '2 Questions', fa: '۲ سوال' },
    name: { de: 'Röntgen-Kontrastmittel Grundlagen', en: 'X-ray contrast media basics', fa: 'مبانی مواد حاجب رادیوگرافی / CT' },
    desc: { de: 'Jod-KM · Applikation · Injektionsrate · Ausscheidung', en: 'Iodinated CM · administration · injection rate · elimination', fa: 'مواد یددار · تزریق · سرعت تزریق · دفع' },
  },
  {
    key: 'km-mrt',
    href: '/ueben/quiz?fach=technik&n=10&themen=km-mrt',
    icon: '🧲', iconImage: '/fach/technik.png', color: '#7c3aed', available: true,
    count: { de: '1 Frage', en: '1 Question', fa: '۱ سوال' },
    name: { de: 'MRT KM', en: 'MRI contrast media', fa: 'مواد حاجب MRI' },
    desc: { de: 'Gadolinium · Chelate · leberspezifische KM', en: 'Gadolinium · chelates · liver-specific agents', fa: 'گادولینیوم · کلات‌ها · مواد اختصاصی کبد' },
  },
  {
    key: 'km-nebenwirkung-jod',
    href: '/ueben/quiz?fach=technik&n=10&themen=km-nebenwirkung-jod',
    icon: '⚠️', iconImage: '/fach/technik.png', color: '#dc2626', available: true,
    count: { de: '3 Fragen', en: '3 Questions', fa: '۳ سوال' },
    name: { de: 'Nebenwirkung jodhaltiger KM', en: 'Adverse effects of iodinated CM', fa: 'عوارض مواد حاجب یددار' },
    desc: { de: 'Pseudoallergie · PC-AKI · Metformin · Schilddrüse', en: 'Pseudoallergy · PC-AKI · metformin · thyroid', fa: 'شبه‌آلرژی · PC-AKI · متفورمین · تیروئید' },
  },
  {
    key: 'km-nebenwirkung-gadolinium',
    href: '/ueben/quiz?fach=technik&n=10&themen=km-nebenwirkung-gadolinium',
    icon: '🛡️', iconImage: '/fach/technik.png', color: '#0891b2', available: true,
    count: { de: '1 Frage', en: '1 Question', fa: '۱ سوال' },
    name: { de: 'Nebenwirkung Gadolinium', en: 'Adverse effects of gadolinium', fa: 'عوارض گادولینیوم' },
    desc: { de: 'NSF · Retention · lineare vs. makrozyklische KM', en: 'NSF · retention · linear vs macrocyclic agents', fa: 'NSF · رسوب · مواد خطی و ماکروسیکلیک' },
  },
  {
    key: 'km-schwangerschaft-stillzeit',
    href: '/ueben/quiz?fach=technik&n=10&themen=km-schwangerschaft-stillzeit',
    icon: '🤰', iconImage: '/fach/technik.png', color: '#db2777', available: true,
    count: { de: '3 Fragen', en: '3 Questions', fa: '۳ سوال' },
    name: { de: 'Schwangerschaft und Stillzeit', en: 'Pregnancy and breastfeeding', fa: 'بارداری و شیردهی' },
    desc: { de: 'Fetale Schilddrüse · Gadolinium · Stillpause', en: 'Fetal thyroid · gadolinium · breastfeeding pause', fa: 'تیروئید جنین · گادولینیوم · شیردهی' },
  },
  {
    key: 'meniskus',
    href: '/msk/knie/meniskus/mcq',
    icon: '🦵', iconImage: '/fach/msk.png', color: '#fb923c', available: true,
    count: { de: '6 Fragen', en: '6 Questions', fa: '۶ سوال' },
    name: { de: 'Knie · Meniskus', en: 'Knee · Meniscus', fa: 'زانو · منیسک' },
    desc: { de: 'Anatomie · MRT-Grading · Vaskularisation · Rissdiagnostik', en: 'Anatomy · MRI grading · vascular zones · tear diagnosis', fa: 'آناتومی · درجه‌بندی MRI · خون‌رسانی · تشخیص پارگی' },
  },
  {
    key: 'haemangiom',
    href: '/ueben/quiz?fach=abdomen&n=10&themen=haemangiom',
    icon: '🟢', iconImage: '/fach/abdomen.png', color: '#10b981', available: true,
    count: { de: '10 Fragen', en: '10 Questions', fa: '۱۰ سوال' },
    name: { de: 'Leber · Hämangiome', en: 'Liver · Haemangiomas', fa: 'کبد · همانژیوم' },
    desc: { de: 'Sono · CT · MRT · DWI · atypische Formen', en: 'Ultrasound · CT · MRI · DWI · atypical forms', fa: 'سونوگرافی · CT · MRI · DWI · فرم آتیپیک' },
  },
  {
    key: 'sarkoidose',
    href: '/ueben/quiz?fach=thorax&n=10&themen=sarkoidose',
    icon: '🫁', iconImage: '/fach/thorax.png', color: '#0284c7', available: true,
    count: { de: '10 Fragen', en: '10 Questions', fa: '۱۰ سوال' },
    name: { de: 'Lunge · Sarkoidose', en: 'Lung · Sarcoidosis', fa: 'ریه · سارکوئیدوز' },
    desc: { de: 'Scadding · HRCT · perilymphatische Noduli · DD', en: 'Scadding · HRCT · perilymphatic nodules · DD', fa: 'Scadding · HRCT · ندول‌های پری‌لنفاتیک · DD' },
  },
  { key: 'mrt',    icon: '🧲', iconImage: '/fach/technik.png', color: '#7c3aed', available: false, name: { de: 'MRT-Physik',     en: 'MRI Physics',    fa: 'فیزیک MRI' } },
  { key: 'ct',     icon: '🩻', iconImage: '/fach/technik.png', color: '#0ea5e9', available: false, name: { de: 'CT-Technik',     en: 'CT Technology',  fa: 'تکنولوژی CT' } },
  { key: 'strah',  icon: '🛡️', iconImage: '/fach/technik.png', color: '#d97706', available: false, name: { de: 'Strahlenschutz', en: 'Radiation Protection', fa: 'حفاظت از تابش' } },
  { key: 'neuro',  icon: '🧠', iconImage: '/fach/gehirn.png', color: '#7c3aed', available: false, name: { de: 'Neuroradiologie',en: 'Neuroradiology', fa: 'نوروراديولوژی' } },
  { key: 'thorax-soon', icon: '🫁', iconImage: '/fach/thorax.png', color: '#0ea5e9', available: false, name: { de: 'Weitere Thorax-Themen', en: 'More thorax topics', fa: 'موضوعات بیشتر توراکس' } },
]

const UI = {
  de: {
    title: 'MCQs · Thema wählen',
    sub: 'Wähle ein Thema oder kombiniere mehrere Themen im MCQ-Training.',
    available: 'Verfügbar', soon: 'Demnächst', start: 'Quiz starten →',
    trainingTitle: 'MCQ-Training nach Themen',
    trainingDesc: 'Hier kannst du mehrere Körperregionen und Unterthemen kombinieren – inklusive Technik → Kontrastmittel und MSK → Knie → Meniskus.',
    trainingBtn: 'Themen auswählen →',
  },
  en: {
    title: 'MCQs · Choose Topic',
    sub: 'Select one topic or combine multiple topics in MCQ training.',
    available: 'Available', soon: 'Coming soon', start: 'Start Quiz →',
    trainingTitle: 'Topic-based MCQ training',
    trainingDesc: 'Combine multiple body regions and subtopics, including Physics → Contrast media and MSK → Knee → Meniscus.',
    trainingBtn: 'Choose topics →',
  },
  fa: {
    title: 'MCQ · انتخاب موضوع',
    sub: 'یک موضوع را انتخاب کنید یا چند موضوع را در تمرین MCQ ترکیب کنید.',
    available: 'در دسترس', soon: 'به زودی', start: 'شروع ←',
    trainingTitle: 'تمرین MCQ بر اساس موضوع',
    trainingDesc: 'می‌توانید چند ناحیه و زیرموضوع را انتخاب کنید، از جمله تکنیک → مواد حاجب و MSK → زانو → منیسک.',
    trainingBtn: 'انتخاب موضوعات ←',
  },
}

export default function McqSelectPage() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>MCQ</span>
        </div>
        <h1 className={styles.title}>{ui.title}</h1>
        <p className={styles.sub}>{ui.sub}</p>
      </div>

      <div className={styles.trainingBox}>
        <div className={styles.trainingIcon}>🎛️</div>
        <div className={styles.trainingText}>
          <div className={styles.trainingTitle}>{ui.trainingTitle}</div>
          <div className={styles.trainingDesc}>{ui.trainingDesc}</div>
        </div>
        <Link href={withLang('/ueben')} className={styles.trainingBtn}>{ui.trainingBtn}</Link>
      </div>

      <div className={styles.list}>
        {TOPICS.filter(t => t.available).map(t => {
          const name = t.name[lang] || t.name.de
          const desc = t.desc?.[lang] || t.desc?.de
          const count = t.count?.[lang] || t.count?.de

          return (
            <Link key={t.key} href={withLang(t.href)} className={styles.card}>
              <span className={styles.icon}>{t.iconImage ? <Image src={t.iconImage} alt={name} width={32} height={32} style={{ objectFit: 'contain' }} /> : t.icon}</span>
              <div className={styles.info}>
                <div className={styles.name} style={{ color: t.color }}>{name}</div>
                {desc && <div className={styles.desc}>{desc}</div>}
              </div>
              <div className={styles.right}>
                <span className={styles.badge}>{ui.available}</span>
                {count && <span className={styles.count}>{count}</span>}
                <span className={styles.arrow} style={{ color: t.color }}>{ui.start}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
