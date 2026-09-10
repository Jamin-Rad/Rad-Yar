'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import basics from '../basics/page.module.css'
import styles from './page.module.css'
import { COPY, CURVES, MASS_ENHANCEMENT, MASS_MARGINS, MASS_SHAPES, MASS_WORKFLOW, NME_DISTRIBUTION, NME_PATTERNS, NME_WORKFLOW, SECTIONS, SUMMARY_STEPS, pick } from './content'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${basics.readButton} ${isRead ? `${base.readButtonActive} ${basics.readButtonActive}` : ''}`} onClick={onClick}><span className={`${base.readCheck} ${basics.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>{authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>
}

function Section({ id, icon, title, open, onToggle, children }) {
  return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}><button className={`${base.sectionHeader} ${basics.sectionHeader}`} type="button" onClick={() => onToggle(id)} aria-expanded={open}><span className={basics.sectionHeading}><h2><span className={styles.sectionIcon} aria-hidden="true">{icon}</span>{title}</h2></span><span className={basics.sectionToggle}>{open ? '−' : '+'}</span></button>{open && <div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>
}

function scrollSectionToTop(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

function DescriptorGrid({ items, className = '' }) {
  const { lang } = useLanguage()
  return <div className={`${styles.descriptorGrid} ${className}`}>{items.map(item => <article className={`${styles.descriptor} ${item.level ? styles[item.level] : ''}`} key={pick(item.term, 'de')}><h3>{pick(item.term, lang)}</h3><p>{pick(item.text, lang)}</p>{item.sub && <p className={`${styles.descriptorSub} ${item.subStrong ? styles.descriptorSubStrong : ''}`}>{pick(item.sub, lang)}</p>}{item.subItems && <ul className={`${styles.descriptorSub} ${styles.descriptorSubList}`}>{item.subItems.map(subItem => <li key={pick(subItem, 'de')}>{pick(subItem, lang)}</li>)}</ul>}</article>)}</div>
}

function ReasoningPath({ items }) {
  const { lang } = useLanguage()
  return <div className={styles.reasoningPath}>{items.map(item => <article key={pick(item.title, 'de')}><h3>{pick(item.title, lang)}</h3><p>{pick(item.text, lang)}</p></article>)}</div>
}

function ReportExample({ label, text, checklist }) {
  const { lang } = useLanguage()
  return <aside className={styles.reportExample}><div><span>{pick(label, lang)}</span><p>{pick(text, lang)}</p></div><ul>{checklist.map(item => <li key={pick(item, 'de')}>{pick(item, lang)}</li>)}</ul></aside>
}

function TeachingImage({ src, width, height, alt, caption, compact = false, crop = '', className = '' }) {
  const { lang } = useLanguage()
  return <figure className={`${styles.topicMedia} ${compact ? styles.topicMediaCompact : ''} ${crop ? styles[crop] : ''} ${className ? styles[className] || className : ''}`}><a href={src} target="_blank" rel="noreferrer" aria-label={pick({ de: `${caption.de} in voller Größe öffnen`, en: `Open ${caption.en} full size`, fa: `نمایش ${caption.fa} در اندازه کامل` }, lang)}><Image src={src} alt={pick(alt, lang)} width={width} height={height} sizes={compact ? '(max-width: 900px) calc(100vw - 64px), 390px' : '(max-width: 900px) calc(100vw - 48px), 820px'} /></a><figcaption><strong>{pick(caption, lang)}</strong><span>{pick(COPY.zoom, lang)}</span></figcaption></figure>
}

export default function LesionscharakterisierungPage() {
  const { lang } = useLanguage()
  const tx = value => pick(value, lang)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [openId, setOpenId] = useState(SECTIONS[0].id)
  const shouldScrollToOpenSection = useRef(false)
  const { isRead, toggleRead, authError } = useLessonReadStatus('mamma-mrt-laesionscharakterisierung')
  const lessonPath = '/mamma/bildgebung/mrt/laesionscharakterisierung'
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
    if (!openId || !shouldScrollToOpenSection.current) return
    shouldScrollToOpenSection.current = false
    scrollSectionToTop(openId)
  }, [openId])

  const selectSection = id => {
    setActiveId(id)
    if (openId === id) {
      scrollSectionToTop(id)
      return
    }
    shouldScrollToOpenSection.current = true
    setOpenId(id)
  }

  const toggleSection = id => {
    if (openId === id) {
      setOpenId(null)
      return
    }
    selectSection(id)
  }

  return <main className={`${base.page} ${basics.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}>
      <nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.imaging)}</Link><span>›</span><span>{tx(COPY.breastMri)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav>
      <div className={base.hero}>
        <div className={`${base.heroText} ${basics.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${basics.sourceBadge}`}>Dr. Zia</span><h1>{tx(COPY.title)}</h1><p>{tx(COPY.subtitle)}</p><div className={base.actions}><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=8&themen=mamma-mrt-laesionscharakterisierung&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/mamma-mrt-laesionscharakterisierung?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 {tx(COPY.flashcards)}</Link></div></div>
        <div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${basics.heroStat}`}><strong>Mass</strong><span>{tx({ de: 'Form · Rand', en: 'Shape · Margin', fa: 'Shape · Margin' })}</span><small>{tx({ de: 'Internes Anreicherungsmuster', en: 'Internal Enhancement', fa: 'الگوی Enhancement داخلی' })}</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>NME</strong><span>{tx({ de: 'Verteilung', en: 'Distribution', fa: 'توزیع' })}</span><small>{tx({ de: 'Anreicherungsmuster', en: 'Internal Enhancement', fa: 'الگوی Enhancement' })}</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx({ de: 'Multiparametrisch', en: 'Multiparametric', fa: 'چندپارامتری' })}</strong><span>T2 · DWI/ADC</span><small>{tx({ de: 'Kinetik · Verlauf', en: 'Kinetics · Follow-up', fa: 'کینتیک · پیگیری' })}</small></div></div>
      </div>
    </header>

    <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
    <div className={base.layout}>
      <aside className={`${base.sidebar} ${basics.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{SECTIONS.map(section => <button key={section.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${basics.sideItemActive}` : ''}`} onClick={() => selectSection(section.id)}><span className={basics.sideNumber}>{section.icon}</span><strong>{tx(section.label)}</strong></button>)}</aside>
      <div className={base.main}>
        <Section id="start" icon={SECTIONS[0].icon} title={tx(SECTIONS[0].label)} open={openId === 'start'} onToggle={toggleSection}>
          <figure className={`${basics.enhancementMedia} ${styles.enhancementOverview}`}>
            <a href="/mamma/mrt/enhancement-types.png" target="_blank" rel="noreferrer" aria-label={tx({ de: 'Enhancement-Typen in voller Größe öffnen', en: 'Open enhancement types full size', fa: 'نمایش تصویر انواع Enhancement در اندازه کامل' })}>
              <Image src="/mamma/mrt/enhancement-types.png" alt={tx({ de: 'MRT-Beispiele für Mass und Non-Mass Enhancement', en: 'MRI examples of mass and non-mass enhancement', fa: 'نمونه‌های MRI از Mass و Non-Mass Enhancement' })} width={1536} height={1024} sizes="(max-width: 900px) calc(100vw - 48px), 860px" />
            </a>
            <figcaption><strong>Mass · Non-Mass Enhancement</strong><span>{tx(COPY.zoom)}</span></figcaption>
          </figure>
          <p className={styles.classificationPrompt}><strong>{tx({ de: 'Zuerst richtig klassifizieren', en: 'Classify correctly first', fa: 'ابتدا طبقه‌بندی صحیح' })}</strong></p>
        </Section>

        <Section id="mass" icon={SECTIONS[1].icon} title={tx(SECTIONS[1].label)} open={openId === 'mass'} onToggle={toggleSection}>
          <div className={styles.definitionCard}><h3>{tx({ de: 'Dreidimensionale Läsion mit konvexer Außenkontur', en: 'A three-dimensional lesion with a convex outer contour', fa: 'ضایعه سه‌بعدی با کانتور خارجی محدب' })}</h3><p>{tx({ de: 'Eine Mass verdrängt oder ersetzt Gewebe und lässt sich räumlich als eigenes Volumen abgrenzen. Kannst du keinen konvexen Rand und keine echte Raumforderung definieren, darfst du nicht künstlich Form und Rand vergeben – dann ist NME wahrscheinlicher.', en: 'A mass displaces or replaces tissue and can be outlined as a distinct volume. If no convex margin and no true space-occupying lesion can be defined, do not invent shape and margin; NME is more likely.', fa: 'Mass بافت را جابه‌جا یا جایگزین می‌کند و به‌صورت حجمی مستقل قابل ترسیم است. اگر حاشیه محدب و ضایعه فضاگیر واقعی تعریف نمی‌شود، Shape و Margin را به‌زور تعیین نکنید؛ احتمال NME بیشتر است.' })}</p></div>
          <div className={styles.formula}>{tx({ de: 'Form', en: 'Shape', fa: 'Shape' })} <i>→</i> {tx({ de: 'Rand', en: 'Margin', fa: 'Margin' })} <i>→</i> {tx({ de: 'Internes Anreicherungsmuster', en: 'Internal Enhancement', fa: 'الگوی Enhancement داخلی' })}</div>
          <ReasoningPath items={MASS_WORKFLOW} />
          <h3 className={styles.subheading}>{tx({ de: 'Form', en: 'Shape', fa: 'Shape' })}</h3>
          <TeachingImage className="referenceMediaWide" src="/mamma/mrt/lesion-characterization/mass-shape-reference.png" width={1900} height={1010} caption={{ de: 'Mass: Form – Referenzübersicht', en: 'Mass: Shape – reference overview', fa: 'Mass: شکل – نمای مرجع' }} alt={{ de: 'Referenzübersicht der Mass-Formen oval, gelappt, rund und irregulär', en: 'Reference overview of oval, lobulated, round and irregular mass shapes', fa: 'نمای مرجع شکل‌های Mass: Oval، Lobulated، Round و Irregular' }} />
          <DescriptorGrid items={MASS_SHAPES} className={styles.fourGrid} />
          <h3 className={styles.subheading}>{tx({ de: 'Rand', en: 'Margin', fa: 'Margin' })}</h3>
          <TeachingImage className="referenceMediaWide" src="/mamma/mrt/lesion-characterization/mass-margin-reference.png" width={1900} height={1010} caption={{ de: 'Mass: Rand – Referenzübersicht', en: 'Mass: Margin – reference overview', fa: 'Mass: حاشیه – نمای مرجع' }} alt={{ de: 'Referenzübersicht der Mass-Ränder zirkumskript, indistinkt und spikuliert', en: 'Reference overview of circumscribed, indistinct and spiculated mass margins', fa: 'نمای مرجع حاشیه‌های Mass: Circumscribed، Indistinct و Spiculated' }} />
          <DescriptorGrid items={MASS_MARGINS} />
          <div className={`${styles.note} ${styles.warning}`}><strong>{tx({ de: 'Warnzeichen', en: 'Warning sign', fa: 'علامت هشدار' })}</strong><p>{tx({ de: 'Spikulierte Ränder gehören zu den wichtigsten morphologischen Warnzeichen einer malignen Läsion.', en: 'Spiculated margins are among the most important morphological warning signs of malignancy.', fa: 'حاشیه Spiculated یکی از مهم‌ترین علائم مورفولوژیک هشداردهنده برای بدخیمی است.' })}</p></div>
          <h3 className={styles.subheading}>{tx({ de: 'Internes Anreicherungsmuster', en: 'Internal Enhancement', fa: 'الگوی Enhancement داخلی' })}</h3>
          <TeachingImage className="referenceMediaWide" src="/mamma/mrt/lesion-characterization/mass-internal-enhancement-reference.png" width={1900} height={1010} caption={{ de: 'Mass: internes Anreicherungsmuster – Referenzübersicht', en: 'Mass: Internal Enhancement – reference overview', fa: 'Mass: الگوی Enhancement داخلی – نمای مرجع' }} alt={{ de: 'Referenzübersicht der internen Mass-Anreicherung: homogen, dunkle interne Septierungen, heterogen und dicke randständige Anreicherung', en: 'Reference overview of internal mass enhancement: homogeneous, dark internal septations, heterogeneous and thick rim enhancement', fa: 'نمای مرجع الگوهای Enhancement داخلی Mass: Homogeneous، Dark Internal Septations، Heterogeneous و Thick Rim Enhancement' }} />
          <DescriptorGrid items={MASS_ENHANCEMENT} className={styles.fourGrid} />
          <div className={styles.suspiciousCombo}><span>{tx({ de: 'Besonders aufmerksam bei', en: 'Pay particular attention to', fa: 'ترکیب بسیار مهم و مشکوک' })}</span><strong>{tx({ de: 'irreguläre Form + indistinkter oder spikulierter Rand + heterogene oder randständige Anreicherung', en: 'irregular shape + indistinct/spiculated margin + heterogeneous or rim enhancement', fa: 'شکل نامنظم + حاشیه نامشخص یا اسپیکوله + Enhancement ناهمگن یا حاشیه‌ای' })}</strong></div>
          <ReportExample label={{ de: 'So klingt ein klarer Befund', en: 'A clear report sounds like this', fa: 'نمونه گزارش واضح' }} text={{ de: 'Rechts bei 10 Uhr zeigt sich eine 13 × 10 × 9 mm große, irregulär geformte Mass mit spikuliertem Rand und heterogenem internem Enhancement. Sie ist T2-hypointens, zeigt eine Diffusionsrestriktion und eine Washout-Kinetik und ist neu gegenüber der Voruntersuchung.', en: 'At 10 o’clock in the right breast, there is a 13 × 10 × 9 mm irregular mass with a spiculated margin and heterogeneous internal enhancement. It is T2 hypointense, demonstrates restricted diffusion and washout kinetics, and is new compared with the prior examination.', fa: 'در ساعت ۱۰ پستان راست، Mass نامنظم به ابعاد ۱۳ × ۱۰ × ۹ میلی‌متر با حاشیه اسپیکوله و Enhancement داخلی ناهمگن دیده می‌شود. ضایعه در T2 کم‌سیگنال است، محدودیت دیفیوژن و کینتیک Washout دارد و نسبت به بررسی قبلی جدید است.' }} checklist={[{ de: 'Seite · Uhrzeit · Abstand zur Mamille', en: 'Side · clock position · distance from nipple', fa: 'سمت · موقعیت ساعت · فاصله از نوک پستان' }, { de: 'Größe in drei Ebenen', en: 'Size in three dimensions', fa: 'اندازه در سه بعد' }, { de: 'Form · Rand · internes Enhancement', en: 'Shape · margin · internal enhancement', fa: 'Shape · Margin · Enhancement داخلی' }, { de: 'T2 · DWI/ADC · Kinetik · Vorvergleich', en: 'T2 · DWI/ADC · kinetics · comparison', fa: 'T2 · DWI/ADC · کینتیک · مقایسه قبلی' }]} />
        </Section>

        <Section id="nme" icon={SECTIONS[2].icon} title={tx(SECTIONS[2].label)} open={openId === 'nme'} onToggle={toggleSection}>
          <div className={`${styles.definitionCard} ${styles.definitionCardNme}`}><span>{tx({ de: 'Der entscheidende Unterschied', en: 'The key distinction', fa: 'تفاوت کلیدی' })}</span><h3>{tx({ de: 'NME = Anreicherung ohne abgrenzbare dreidimensionale Mass', en: 'NME = enhancement without a discrete three-dimensional mass', fa: 'NME = Enhancement بدون Mass سه‌بعدی مشخص' })}</h3><p>{tx({ de: 'Normales Drüsengewebe oder Fett bleibt zwischen den anreichernden Anteilen sichtbar; eine konvexe Außenkontur fehlt. „Non-Mass“ bedeutet nicht „kein Tumor“: Besonders DCIS kann sich als NME ausbreiten.', en: 'Normal glandular tissue or fat remains visible between enhancing components and there is no convex outer contour. “Non-mass” does not mean “no tumour”: DCIS in particular may spread as NME.', fa: 'بافت غده‌ای طبیعی یا چربی میان اجزای دارای Enhancement باقی می‌ماند و کانتور خارجی محدب وجود ندارد. «Non-Mass» به معنی «بدون تومور» نیست؛ به‌ویژه DCIS می‌تواند به‌شکل NME گسترش یابد.' })}</p></div>
          <p className={styles.lead}>{tx({ de: 'Bei NME ersetzt die Verteilung die Form- und Randbeschreibung. Zwei getrennte Fragen verhindern typische Verwechslungen:', en: 'For NME, distribution replaces shape and margin. Two separate questions prevent common mix-ups:', fa: 'در NME، Distribution جایگزین توصیف Shape و Margin می‌شود. دو پرسش جدا از اشتباهات رایج جلوگیری می‌کند:' })}</p><div className={styles.formula}>{tx({ de: 'Wo und wie weit?', en: 'Where and how far?', fa: 'کجا و تا چه وسعت؟' })} <i>→</i> {tx({ de: 'Welches innere Muster?', en: 'Which internal pattern?', fa: 'کدام الگوی داخلی؟' })}</div>
          <ReasoningPath items={NME_WORKFLOW} />
          <TeachingImage className="referenceMediaWide" src="/mamma/mrt/lesion-characterization/nme-distribution-reference.png" width={1900} height={1030} caption={{ de: 'NME: Verteilung – Referenzübersicht', en: 'NME: Distribution – reference overview', fa: 'NME: توزیع – نمای مرجع' }} alt={{ de: 'Referenzübersicht der NME-Verteilung: fokal, linear, segmental, regional und diffus', en: 'Reference overview of NME distribution: focal, linear, segmental, regional and diffuse', fa: 'نمای مرجع توزیع NME: Focal، Linear، Segmental، Regional و Diffuse' }} />
          <h3 className={styles.subheading}>{tx({ de: 'Verteilung', en: 'Distribution', fa: 'توزیع' })}</h3><DescriptorGrid items={NME_DISTRIBUTION} className={styles.threeGrid} />
          <p className={styles.inlineNote}>{tx({ de: 'Eine lineare oder segmentale Verteilung erfordert besondere Aufmerksamkeit, da sie häufiger mit einem malignen duktalen Prozess verbunden ist. Keine Verteilung ist jedoch für sich allein beweisend.', en: 'Linear and segmental distributions warrant particular attention because they are more often associated with ductal malignancy. No distribution is diagnostic by itself.', fa: 'توزیع Linear و Segmental اهمیت ویژه دارند، زیرا بیشتر با فرایند بدخیم مجرایی همراه‌اند؛ بااین‌حال هیچ نوع توزیعی به‌تنهایی تشخیصی نیست.' })}</p>
          <h3 className={styles.subheading}>{tx({ de: 'Internes Anreicherungsmuster', en: 'Internal enhancement pattern', fa: 'الگوی Enhancement داخلی' })}</h3>
          <TeachingImage className="referenceMediaWide" src="/mamma/mrt/lesion-characterization/nme-internal-enhancement-reference.png" width={1900} height={1030} caption={{ de: 'NME: internes Anreicherungsmuster – Referenzübersicht', en: 'NME: Internal Enhancement Pattern – reference overview', fa: 'NME: الگوی Enhancement داخلی – نمای مرجع' }} alt={{ de: 'Referenzübersicht der NME-Muster: homogen, heterogen, klumpig und gruppiert-ringförmig', en: 'Reference overview of NME patterns: homogeneous, heterogeneous, clumped and clustered ring', fa: 'نمای مرجع الگوهای NME: Homogeneous، Heterogeneous، Clumped و Clustered Ring' }} />
          <DescriptorGrid items={NME_PATTERNS} className={styles.fourGrid} />
          <div className={styles.suspiciousCombo}><span>{tx({ de: 'An DCIS / malignen duktalen Prozess denken', en: 'Consider DCIS / a malignant ductal process', fa: 'به DCIS یا فرایند بدخیم مجرایی فکر کنید' })}</span><strong>{tx({ de: 'segmentale Verteilung + klumpiges oder gruppiert-ringförmiges Anreicherungsmuster', en: 'segmental distribution + clumped or clustered-ring enhancement', fa: 'توزیع سگمنتال + الگوی Enhancement توده‌ای یا حلقه‌ای خوشه‌ای' })}</strong></div>
          <div className={`${styles.note} ${styles.nmeCave}`}><strong>{tx({ de: 'Wichtige Falle', en: 'Important pitfall', fa: 'دام مهم' })}</strong><p>{tx({ de: 'NME nicht direkt aus der MIP klassifizieren. Immer die dünnen Subtraktionsschichten prüfen: Gefäße, Bewegungsartefakte und asymmetrisches BPE können ein lineares oder flächiges NME vortäuschen.', en: 'Do not classify NME from the MIP alone. Always review thin subtraction slices: vessels, motion artefacts and asymmetric BPE may mimic linear or geographic NME.', fa: 'NME را فقط از روی MIP طبقه‌بندی نکنید. همیشه برش‌های نازک Subtraction را بررسی کنید؛ عروق، آرتیفکت حرکت و BPE نامتقارن می‌توانند NME خطی یا گسترده را تقلید کنند.' })}</p></div>
          <ReportExample label={{ de: 'So klingt ein klarer Befund', en: 'A clear report sounds like this', fa: 'نمونه گزارش واضح' }} text={{ de: 'Links zentral besteht über 42 × 28 × 18 mm ein segmental verteiltes NME mit klumpigem bis gruppiert-ringförmigem internem Enhancement, neu gegenüber der Voruntersuchung.', en: 'In the central left breast, there is 42 × 28 × 18 mm segmental NME with clumped to clustered-ring internal enhancement, new from the prior examination.', fa: 'در بخش مرکزی پستان چپ، NME سگمنتال به ابعاد ۴۲ × ۲۸ × ۱۸ میلی‌متر با Enhancement داخلی Clumped تا Clustered ring دیده می‌شود که نسبت به بررسی قبلی جدید است.' }} checklist={[{ de: 'Seite · Lokalisation · Ausdehnung', en: 'Side · location · full extent', fa: 'سمت · محل · وسعت کامل' }, { de: 'Verteilung zuerst', en: 'Distribution first', fa: 'ابتدا Distribution' }, { de: 'Dann internes Muster', en: 'Then internal pattern', fa: 'سپس الگوی داخلی' }, { de: 'Asymmetrie · BPE · Vorvergleich · Begleitbefunde', en: 'Asymmetry · BPE · priors · associated findings', fa: 'عدم تقارن · BPE · مقایسه قبلی · یافته‌های همراه' }]} />
        </Section>

        <Section id="kinetik" icon={SECTIONS[3].icon} title={tx(SECTIONS[3].label)} open={openId === 'kinetik'} onToggle={toggleSection}>
          <p className={styles.lead}>{tx({ de: 'Morphologie zeigt, wie eine Läsion aussieht. Die Kinetik zeigt, wie sie im zeitlichen Verlauf Kontrastmittel aufnimmt.', en: 'Morphology shows what a lesion looks like. Kinetics show how it takes up contrast over time.', fa: 'مورفولوژی ظاهر ضایعه را نشان می‌دهد؛ کینتیک نحوه Enhancement ضایعه در طول زمان را بررسی می‌کند.' })}</p>
          <TeachingImage src="/mamma/mrt/lesion-kinetics-en.png" width={512} height={492} caption={{ de: 'Kinetik: Zeit-Signal-Kurven', en: 'Kinetics: Time-Signal Curves', fa: 'کینتیک: منحنی‌های زمان–سیگنال' }} alt={{ de: 'Kurvenbeispiele für persistentes Enhancement, Plateau und Washout', en: 'Curve examples of persistent enhancement, plateau and washout', fa: 'نمونه منحنی‌های Persistent، Plateau و Washout' }} />
          <div className={styles.curveGrid}>{CURVES.map(curve => <article className={styles[curve.tone]} key={curve.type}><span>Type {curve.type}</span><strong>{curve.symbol}</strong><h3>{curve.name}</h3>{curve.tag && <em className={styles.curveTag}>{tx(curve.tag)}</em>}<p>{tx(curve.text)}</p></article>)}</div>
          <div className={`${styles.note} ${styles.warning}`}><strong>{tx({ de: 'Cave', en: 'Caution', fa: 'توجه' })}</strong><p>{tx({ de: 'Persistent bedeutet nicht automatisch benign und Washout nicht automatisch malign. Morphologie und Kinetik müssen gemeinsam interpretiert werden. Gerade bei NME und DCIS kann eine verdächtige Morphologie ohne klassische Washout-Kurve vorliegen.', en: 'Persistent enhancement is not automatically benign, and washout is not automatically malignant. Morphology and kinetics must be interpreted together. NME and DCIS may show suspicious morphology without a classic washout curve.', fa: 'الگوی Persistent الزاماً خوش‌خیم و Washout الزاماً بدخیم نیست. مورفولوژی و کینتیک باید هم‌زمان تفسیر شوند. به‌ویژه در NME و DCIS ممکن است مورفولوژی مشکوک بدون منحنی کلاسیک Washout وجود داشته باشد.' })}</p></div>
        </Section>

        <Section id="t2-diffusion" icon={SECTIONS[4].icon} title={tx(SECTIONS[4].label)} open={openId === 't2-diffusion'} onToggle={toggleSection}>
          <div className={styles.t2Grid}>
            <article className={styles.t2Article}>
              <span className={styles.t2Tag}>T2</span>
              <TeachingImage compact crop="cropRightShort" src="/mamma/mrt/lesion-t2-signal-en.png" width={518} height={492} caption={{ de: 'T2-Signal', en: 'T2 Signal', fa: 'سیگنال T2' }} alt={{ de: 'MRT-Beispiele für hyperintenses, intermediäres und hypointenses T2-Signal', en: 'MRI examples of hyperintense, intermediate and hypointense T2 signal', fa: 'نمونه‌های MRI از سیگنال T2 بالا، متوسط و پایین' }} />
              <div className={styles.t2Body}>
                <h3>{tx({ de: 'T2-hyperintens:', en: 'T2 hyperintense:', fa: 'T2 Hyperintense:' })}<br />{tx({ de: 'häufig wasserreich oder benign', en: 'often water-rich or benign', fa: 'اغلب حاوی آب بیشتر یا خوش‌خیم' })}</h3>
                <ul><li>{tx({ de: 'Zyste', en: 'Cyst', fa: 'کیست' })}</li><li>{tx({ de: 'viele Fibroadenome', en: 'many fibroadenomas', fa: 'بسیاری از فیبروآدنوم‌ها' })}</li><li>{tx({ de: 'Lymphknoten', en: 'lymph nodes', fa: 'گره‌های لنفاوی' })}</li></ul>
                <strong className={styles.t2Caveat}>T2 hell ≠ automatisch benign</strong>
                <p>{tx({ de: 'Auch maligne Tumoren können T2-hyperintens sein, zum Beispiel das muzinöse Karzinom.', en: 'Malignant tumours can also be T2 hyperintense, for example mucinous carcinoma.', fa: 'تومورهای بدخیم نیز می‌توانند در T2 پرسیگنال باشند؛ برای مثال کارسینوم موسینوس.' })}</p>
              </div>
            </article>
            <article className={`${styles.t2Article} ${styles.t2ArticleDwi}`}>
              <span className={styles.t2Tag}>DWI / ADC</span>
              <TeachingImage compact src="/mamma/mrt/lesion-dwi-adc-en.png" width={518} height={492} caption={{ de: 'DWI und ADC', en: 'DWI and ADC', fa: 'DWI و ADC' }} alt={{ de: 'DWI mit hohem b-Wert und korrespondierende ADC-Map', en: 'High b-value DWI and corresponding ADC map', fa: 'DWI با b-value بالا و نقشه ADC متناظر' }} />
              <div className={styles.t2Body}>
                <h3>DWI ↑ + ADC ↓</h3>
                <p>{tx({ de: 'Viele maligne Tumoren besitzen eine hohe Zelldichte und zeigen eine eingeschränkte Diffusion. Das unterstützt den Malignitätsverdacht.', en: 'Many malignant tumours have high cellularity and restricted diffusion, supporting suspicion of malignancy.', fa: 'بسیاری از تومورهای بدخیم به‌دلیل سلولاریته بالا محدودیت دیفیوژن نشان می‌دهند و این یافته از احتمال بدخیمی حمایت می‌کند.' })}</p>
                <strong className={styles.t2Caveat}>ADC = Zusatzkriterium</strong>
                <p>{tx({ de: 'Es bestehen deutliche Überschneidungen zwischen benignen und malignen Läsionen. ADC ist kein alleiniger Entscheidungsparameter.', en: 'There is considerable overlap between benign and malignant lesions. ADC is not a standalone decision parameter.', fa: 'هم‌پوشانی قابل‌توجهی میان ضایعات خوش‌خیم و بدخیم وجود دارد؛ بنابراین ADC معیار تصمیم‌گیری مستقل نیست.' })}</p>
              </div>
            </article>
          </div>
        </Section>

        <Section id="algorithmus" icon={SECTIONS[5].icon} title={tx(SECTIONS[5].label)} open={openId === 'algorithmus'} onToggle={toggleSection}>
          <ol className={styles.algorithm}>{SUMMARY_STEPS.map((step, index) => <li key={tx(step)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{tx(step)}</strong></li>)}</ol>
          <div className={styles.exampleCompare}><article><span>{tx({ de: 'Eher benign', en: 'More likely benign', fa: 'بیشتر به نفع خوش‌خیمی' })}</span><strong>Oval + circumscribed + homogeneous + T2-hyperintens + persistent</strong></article><i>vs.</i><article><span>{tx({ de: 'Deutlich suspekter', en: 'Considerably more suspicious', fa: 'به‌مراتب مشکوک‌تر' })}</span><strong>Irregular + spiculated + heterogeneous/rim enhancement + Diffusionsrestriktion + washout</strong></article></div>
          <div className={styles.takeHome}>
            <p className={styles.takeHomeHeadline}>{tx({ de: 'Systematisch · Multiparametrisch · Kontextuell', en: 'Systematic · Multiparametric · Contextual', fa: 'سیستماتیک · چندپارامتری · کل‌نگرانه' })}</p>
            <ol className={styles.takeHomeList}>
              <li><strong>{tx({ de: 'Morphologie zuerst', en: 'Morphology first', fa: 'ابتدا مورفولوژی' })}</strong><span>{tx({ de: 'Mass: Form → Rand → Anreicherungsmuster. NME: Verteilung → Muster.', en: 'Mass: shape → margin → enhancement. NME: distribution → pattern.', fa: 'Mass: شکل ← حاشیه ← Enhancement. NME: توزیع ← الگو.' })}</span></li>
              <li><strong>{tx({ de: 'Multiparametrie ergänzt', en: 'Multiparametrics add context', fa: 'چندپارامتری تکمیل می‌کند' })}</strong><span>{tx({ de: 'T2, DWI/ADC und Kinetik stützen die Einschätzung – ersetzen die Morphologie aber nicht.', en: 'T2, DWI/ADC and kinetics support the assessment – but do not replace morphology.', fa: 'T2، DWI/ADC و کینتیک ارزیابی را تقویت می‌کنند – اما جایگزین مورفولوژی نمی‌شوند.' })}</span></li>
              <li><strong>{tx({ de: 'Kein Zeichen allein entscheidet', en: 'No single sign decides', fa: 'هیچ یافته‌ای به‌تنهایی تعیین‌کننده نیست' })}</strong><span>{tx({ de: 'Washout ≠ malign. Persistent ≠ benign. Die Gesamtschau führt zur BI-RADS-Kategorie.', en: 'Washout ≠ malignant. Persistent ≠ benign. The overall picture determines the BI-RADS category.', fa: 'Washout ≠ بدخیم. Persistent ≠ خوش‌خیم. تصویر کلی منجر به دسته‌بندی BI-RADS می‌شود.' })}</span></li>
            </ol>
          </div>
        </Section>
        <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
      </div>
    </div>
  </main>
}
