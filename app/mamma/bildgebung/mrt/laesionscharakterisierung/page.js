'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import basics from '../basics/page.module.css'
import styles from './page.module.css'
import { COPY, CURVES, FOCUS_POINTS, KINETIC_PHASES, MASS_ENHANCEMENT, MASS_MARGINS, MASS_SHAPES, NME_DISTRIBUTION, NME_PATTERNS, SECTIONS, SUMMARY_STEPS, pick } from './content'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${basics.readButton} ${isRead ? `${base.readButtonActive} ${basics.readButtonActive}` : ''}`} onClick={onClick}><span className={`${base.readCheck} ${basics.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>{authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>
}

function Section({ id, eyebrow, title, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}><button className={`${base.sectionHeader} ${basics.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}><span className={basics.sectionHeading}><small>{eyebrow}</small><h2>{title}</h2></span><span className={basics.sectionToggle}>{open ? '−' : '+'}</span></button>{open && <div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>
}

function DescriptorGrid({ items, className = '' }) {
  const { lang } = useLanguage()
  return <div className={`${styles.descriptorGrid} ${className}`}>{items.map(item => <article className={`${styles.descriptor} ${item.level ? styles[item.level] : ''}`} key={item.term}><h3>{item.term}</h3><p>{pick(item.text, lang)}</p></article>)}</div>
}

function TeachingImage({ src, width, height, alt, caption, compact = false, crop = '' }) {
  const { lang } = useLanguage()
  return <figure className={`${styles.topicMedia} ${compact ? styles.topicMediaCompact : ''} ${crop ? styles[crop] : ''}`}><a href={src} target="_blank" rel="noreferrer" aria-label={pick({ de: `${caption.de} in voller Größe öffnen`, en: `Open ${caption.en} full size`, fa: `نمایش ${caption.fa} در اندازه کامل` }, lang)}><Image src={src} alt={pick(alt, lang)} width={width} height={height} sizes={compact ? '(max-width: 900px) calc(100vw - 64px), 390px' : '(max-width: 900px) calc(100vw - 48px), 820px'} /></a><figcaption><strong>{pick(caption, lang)}</strong><span>{pick(COPY.zoom, lang)}</span></figcaption></figure>
}

export default function LesionscharakterisierungPage() {
  const { lang } = useLanguage()
  const tx = value => pick(value, lang)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
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

  return <main className={`${base.page} ${basics.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}>
      <nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.imaging)}</Link><span>›</span><span>{tx(COPY.breastMri)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav>
      <div className={base.hero}>
        <div className={`${base.heroText} ${basics.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${basics.sourceBadge}`}>Dr. Zia</span><h1>{tx(COPY.title)}</h1><p>{tx(COPY.subtitle)}</p><div className={base.actions}><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=mamma-mrt-laesionscharakterisierung&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/mamma-mrt-laesionscharakterisierung?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 {tx(COPY.flashcards)}</Link></div></div>
        <div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${basics.heroStat}`}><strong>Mass</strong><span>{tx({ de: 'Form · Rand', en: 'Shape · Margin', fa: 'Shape · Margin' })}</span><small>Internal Enhancement</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>NME</strong><span>Distribution</span><small>Internal Enhancement</small></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx({ de: 'Multiparametrisch', en: 'Multiparametric', fa: 'چندپارامتری' })}</strong><span>T2 · DWI/ADC</span><small>{tx({ de: 'Kinetik · Verlauf', en: 'Kinetics · Follow-up', fa: 'کینتیک · پیگیری' })}</small></div></div>
      </div>
    </header>

    <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
    <div className={base.layout}>
      <aside className={`${base.sidebar} ${basics.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{SECTIONS.map(section => <button key={section.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${basics.sideItemActive}` : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span className={basics.sideNumber}>{section.icon}</span><strong>{tx(section.label)}</strong></button>)}</aside>
      <div className={base.main}>
        <Section id="start" eyebrow={tx({ de: '01 · Focus, Mass oder NME?', en: '01 · Focus, mass or NME?', fa: '۰۱ · Focus، Mass یا NME؟' })} title={tx(SECTIONS[0].label)}>
          <p className={styles.lead}>{tx(COPY.intro)}</p><div className={styles.principle}><span>{tx({ de: 'Grundprinzip', en: 'Core principle', fa: 'اصل کلی' })}</span><strong>{tx(COPY.principle)}</strong></div>
          <div className={styles.focusBox}><div><span>&lt; 5 mm</span><h3>Focus</h3><p>{tx({ de: 'Ein sehr kleines Enhancement, das zu klein ist, um Form und Rand zuverlässig zu beurteilen.', en: 'A very small enhancement that is too small for reliable assessment of shape and margin.', fa: 'Enhancement بسیار کوچکی که برای ارزیابی قابل اعتماد شکل و حاشیه بیش از حد کوچک است.' })}</p></div><ul>{FOCUS_POINTS.map(point => <li key={tx(point)}>{tx(point)}</li>)}</ul></div>
          <div className={styles.note}><strong>{tx({ de: 'Merke', en: 'Remember', fa: 'نکته' })}</strong><p>{tx({ de: 'Ein Focus ist nicht automatisch benign. Ein neu aufgetretener oder größer werdender Focus verdient mehr Aufmerksamkeit. Die Kinetik ist wegen möglicher Partialvolumeneffekte weniger zuverlässig.', en: 'A focus is not automatically benign. A new or enlarging focus deserves greater attention. Kinetics are less reliable because of possible partial-volume effects.', fa: 'Focus الزاماً خوش‌خیم نیست. Focus جدید یا در حال بزرگ‌شدن نیازمند توجه بیشتری است. به‌دلیل احتمال اثر Partial volume، کینتیک در این ضایعات کوچک قابلیت اعتماد کمتری دارد.' })}</p></div>
        </Section>

        <Section id="mass-morphologie" eyebrow={tx({ de: '02 · Morphologie', en: '02 · Morphology', fa: '۰۲ · مورفولوژی' })} title={tx(SECTIONS[1].label)}>
          <p className={styles.lead}>{tx({ de: 'Eine Mass ist eine dreidimensionale, raumfordernde Läsion. Bei jeder Mass beurteilen wir:', en: 'A mass is a three-dimensional space-occupying lesion. For every mass, assess:', fa: 'Mass یک ضایعه سه‌بعدی و فضاگیر است. در هر Mass موارد زیر ارزیابی می‌شوند:' })}</p><div className={styles.formula}>{tx({ de: 'Form', en: 'Shape', fa: 'Shape' })} <i>→</i> {tx({ de: 'Rand', en: 'Margin', fa: 'Margin' })} <i>→</i> Internal Enhancement</div>
          <TeachingImage src="/mamma/mrt/lesion-mass-shape-margin-en.png" width={512} height={536} caption={{ de: 'Mass: Form und Rand', en: 'Mass: Shape and Margin', fa: 'Mass: شکل و حاشیه' }} alt={{ de: 'MRT-Beispiele für runde, ovale und irreguläre Masses sowie scharf begrenzte, irreguläre und spikulierte Ränder', en: 'MRI examples of round, oval and irregular masses and circumscribed, irregular and spiculated margins', fa: 'نمونه‌های MRI از Mass گرد، بیضی و نامنظم و حاشیه‌های Circumscribed، Irregular و Spiculated' }} />
          <h3 className={styles.subheading}>{tx({ de: 'Form', en: 'Shape', fa: 'Shape' })}</h3><DescriptorGrid items={MASS_SHAPES} />
          <h3 className={styles.subheading}>{tx({ de: 'Rand', en: 'Margin', fa: 'Margin' })}</h3><DescriptorGrid items={MASS_MARGINS} />
          <div className={`${styles.note} ${styles.warning}`}><strong>{tx({ de: 'Warnzeichen', en: 'Warning sign', fa: 'علامت هشدار' })}</strong><p>{tx({ de: 'Spikulierte Ränder gehören zu den wichtigsten morphologischen Warnzeichen einer malignen Läsion.', en: 'Spiculated margins are among the most important morphological warning signs of malignancy.', fa: 'حاشیه Spiculated یکی از مهم‌ترین علائم مورفولوژیک هشداردهنده برای بدخیمی است.' })}</p></div>
        </Section>

        <Section id="mass-enhancement" eyebrow="03 · Mass" title={tx(SECTIONS[2].label)}>
          <TeachingImage crop="cropRightTall" src="/mamma/mrt/lesion-mass-internal-enhancement-en.png" width={518} height={536} caption={{ de: 'Mass: internes Enhancement', en: 'Mass: Internal Enhancement', fa: 'Mass: الگوی Enhancement داخلی' }} alt={{ de: 'MRT-Beispiele für homogenes, heterogenes und Rim Enhancement sowie Dark Internal Septations', en: 'MRI examples of homogeneous, heterogeneous and rim enhancement and dark internal septations', fa: 'نمونه‌های MRI از Homogeneous، Heterogeneous و Rim Enhancement و Dark Internal Septations' }} />
          <DescriptorGrid items={MASS_ENHANCEMENT} className={styles.fourGrid} />
          <div className={styles.suspiciousCombo}><span>{tx({ de: 'Besonders aufmerksam bei', en: 'Pay particular attention to', fa: 'ترکیب بسیار مهم و مشکوک' })}</span><strong>irregular shape + irregular/spiculated margin + heterogeneous oder rim enhancement</strong></div>
        </Section>

        <Section id="nme" eyebrow="04 · NME" title={tx(SECTIONS[3].label)}>
          <p className={styles.lead}>{tx({ de: 'Bei einem NME gibt es pathologisches Enhancement, aber keine klar abgrenzbare dreidimensionale Mass. NME wird daher anders beschrieben:', en: 'NME is pathological enhancement without a clearly defined three-dimensional mass and is therefore described differently:', fa: 'در NME یک Enhancement پاتولوژیک وجود دارد، اما Mass سه‌بعدی مشخصی تشکیل نمی‌شود؛ بنابراین روش توصیف آن متفاوت است:' })}</p><div className={styles.formula}>Distribution <i>→</i> Internal Enhancement Pattern</div>
          <TeachingImage src="/mamma/mrt/lesion-nme-distribution-pattern-en.png" width={518} height={536} caption={{ de: 'NME: Distribution und internes Enhancement-Muster', en: 'NME: Distribution and Internal Enhancement Pattern', fa: 'NME: توزیع و الگوی Enhancement داخلی' }} alt={{ de: 'MRT-Beispiele der NME-Verteilung und internen Enhancement-Muster', en: 'MRI examples of NME distribution and internal enhancement patterns', fa: 'نمونه‌های MRI از انواع توزیع و الگوهای Enhancement داخلی در NME' }} />
          <h3 className={styles.subheading}>Distribution</h3><DescriptorGrid items={NME_DISTRIBUTION} className={styles.threeGrid} />
          <p className={styles.inlineNote}>{tx({ de: 'Besonders linear und segmental sollten aufmerksam machen, da sie häufiger mit einem duktalen malignen Prozess verbunden sind. Keine Distribution ist allein beweisend.', en: 'Linear and segmental distributions warrant particular attention because they are more often associated with ductal malignancy. No distribution is diagnostic by itself.', fa: 'توزیع Linear و Segmental اهمیت ویژه دارند، زیرا بیشتر با فرایند بدخیم مجرایی همراه‌اند؛ بااین‌حال هیچ نوع توزیعی به‌تنهایی تشخیصی نیست.' })}</p>
          <h3 className={styles.subheading}>{tx({ de: 'Internes Enhancement-Muster', en: 'Internal enhancement pattern', fa: 'الگوی Internal Enhancement' })}</h3><DescriptorGrid items={NME_PATTERNS} className={styles.fourGrid} />
          <div className={styles.suspiciousCombo}><span>{tx({ de: 'An DCIS / malignen duktalen Prozess denken', en: 'Consider DCIS / a malignant ductal process', fa: 'به DCIS یا فرایند بدخیم مجرایی فکر کنید' })}</span><strong>segmental distribution + clumped oder clustered-ring enhancement</strong></div>
        </Section>

        <Section id="kinetik" eyebrow={tx({ de: '05 · Zeit-Signal-Kurven', en: '05 · Time-signal curves', fa: '۰۵ · منحنی‌های زمان–سیگنال' })} title={tx(SECTIONS[4].label)}>
          <p className={styles.lead}>{tx({ de: 'Morphologie zeigt, wie eine Läsion aussieht. Die Kinetik zeigt, wie sie im zeitlichen Verlauf Kontrastmittel aufnimmt.', en: 'Morphology shows what a lesion looks like. Kinetics show how it takes up contrast over time.', fa: 'مورفولوژی ظاهر ضایعه را نشان می‌دهد؛ کینتیک نحوه Enhancement ضایعه در طول زمان را بررسی می‌کند.' })}</p>
          <TeachingImage src="/mamma/mrt/lesion-kinetics-en.png" width={512} height={492} caption={{ de: 'Kinetik: Zeit-Signal-Kurven', en: 'Kinetics: Time-Signal Curves', fa: 'کینتیک: منحنی‌های زمان–سیگنال' }} alt={{ de: 'Kurvenbeispiele für persistentes Enhancement, Plateau und Washout', en: 'Curve examples of persistent enhancement, plateau and washout', fa: 'نمونه منحنی‌های Persistent، Plateau و Washout' }} />
          <div className={styles.phaseGrid}>{KINETIC_PHASES.map(phase => <article key={tx(phase.title)}><span>{tx(phase.title)}</span><h3>{tx(phase.text)}</h3><div>{phase.items.map(item => <strong key={item}>{item}</strong>)}</div></article>)}</div>
          <div className={styles.curveGrid}>{CURVES.map(curve => <article className={styles[curve.tone]} key={curve.type}><span>Type {curve.type}</span><strong>{curve.symbol}</strong><h3>{curve.name}</h3><p>{tx(curve.text)}</p></article>)}</div>
          <div className={`${styles.note} ${styles.warning}`}><strong>{tx({ de: 'Cave', en: 'Caution', fa: 'توجه' })}</strong><p>{tx({ de: 'Persistent bedeutet nicht automatisch benign und Washout nicht automatisch malign. Morphologie und Kinetik müssen gemeinsam interpretiert werden. Gerade bei NME und DCIS kann eine verdächtige Morphologie ohne klassische Washout-Kurve vorliegen.', en: 'Persistent enhancement is not automatically benign, and washout is not automatically malignant. Morphology and kinetics must be interpreted together. NME and DCIS may show suspicious morphology without a classic washout curve.', fa: 'الگوی Persistent الزاماً خوش‌خیم و Washout الزاماً بدخیم نیست. مورفولوژی و کینتیک باید هم‌زمان تفسیر شوند. به‌ویژه در NME و DCIS ممکن است مورفولوژی مشکوک بدون منحنی کلاسیک Washout وجود داشته باشد.' })}</p></div>
        </Section>

        <Section id="t2-diffusion" eyebrow={tx({ de: '06 · Zusatzkriterien', en: '06 · Additional criteria', fa: '۰۶ · معیارهای تکمیلی' })} title={tx(SECTIONS[5].label)}>
          <div className={styles.modalityGrid}><article><span>T2</span><TeachingImage compact crop="cropRightShort" src="/mamma/mrt/lesion-t2-signal-en.png" width={518} height={492} caption={{ de: 'T2-Signal', en: 'T2 Signal', fa: 'سیگنال T2' }} alt={{ de: 'MRT-Beispiele für hyperintenses, intermediäres und hypointenses T2-Signal', en: 'MRI examples of hyperintense, intermediate and hypointense T2 signal', fa: 'نمونه‌های MRI از سیگنال T2 بالا، متوسط و پایین' }} /><h3>{tx({ de: 'T2-hyperintens: häufig wasserreich oder benign', en: 'T2 hyperintense: often water-rich or benign', fa: 'T2 Hyperintense: اغلب حاوی آب بیشتر یا خوش‌خیم' })}</h3><ul><li>{tx({ de: 'Zyste', en: 'Cyst', fa: 'کیست' })}</li><li>{tx({ de: 'viele Fibroadenome', en: 'many fibroadenomas', fa: 'بسیاری از فیبروآدنوم‌ها' })}</li><li>{tx({ de: 'Lymphknoten', en: 'lymph nodes', fa: 'گره‌های لنفاوی' })}</li></ul><strong>T2 hell ≠ automatisch benign</strong><p>{tx({ de: 'Auch maligne Tumoren können T2-hyperintens sein, zum Beispiel das muzinöse Karzinom.', en: 'Malignant tumours can also be T2 hyperintense, for example mucinous carcinoma.', fa: 'تومورهای بدخیم نیز می‌توانند در T2 پرسیگنال باشند؛ برای مثال کارسینوم موسینوس.' })}</p></article><article><span>DWI / ADC</span><TeachingImage compact src="/mamma/mrt/lesion-dwi-adc-en.png" width={518} height={492} caption={{ de: 'DWI und ADC', en: 'DWI and ADC', fa: 'DWI و ADC' }} alt={{ de: 'DWI mit hohem b-Wert und korrespondierende ADC-Map', en: 'High b-value DWI and corresponding ADC map', fa: 'DWI با b-value بالا و نقشه ADC متناظر' }} /><h3>DWI ↑ + ADC ↓</h3><p>{tx({ de: 'Viele maligne Tumoren besitzen eine hohe Zelldichte und zeigen eine eingeschränkte Diffusion. Das unterstützt den Malignitätsverdacht.', en: 'Many malignant tumours have high cellularity and restricted diffusion, supporting suspicion of malignancy.', fa: 'بسیاری از تومورهای بدخیم به‌دلیل سلولاریته بالا محدودیت دیفیوژن نشان می‌دهند و این یافته از احتمال بدخیمی حمایت می‌کند.' })}</p><strong>ADC = Zusatzkriterium</strong><p>{tx({ de: 'Es bestehen deutliche Überschneidungen zwischen benignen und malignen Läsionen. ADC ist kein alleiniger Entscheidungsparameter.', en: 'There is considerable overlap between benign and malignant lesions. ADC is not a standalone decision parameter.', fa: 'هم‌پوشانی قابل‌توجهی میان ضایعات خوش‌خیم و بدخیم وجود دارد؛ بنابراین ADC معیار تصمیم‌گیری مستقل نیست.' })}</p></article></div>
        </Section>

        <Section id="algorithmus" eyebrow="07 · Take-Home Message" title={tx(SECTIONS[6].label)}>
          <ol className={styles.algorithm}>{SUMMARY_STEPS.map((step, index) => <li key={tx(step)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{tx(step)}</strong></li>)}</ol>
          <div className={styles.exampleCompare}><article><span>{tx({ de: 'Eher benign', en: 'More likely benign', fa: 'بیشتر به نفع خوش‌خیمی' })}</span><strong>Oval + circumscribed + homogeneous + T2-hyperintens + persistent</strong></article><i>vs.</i><article><span>{tx({ de: 'Deutlich suspekter', en: 'Considerably more suspicious', fa: 'به‌مراتب مشکوک‌تر' })}</span><strong>Irregular + spiculated + heterogeneous/rim enhancement + Diffusionsrestriktion + washout</strong></article></div>
          <div className={styles.takeHome}><strong>{tx({ de: 'Die stärkste Beurteilung entsteht aus der Kombination mehrerer Merkmale – nicht aus einem einzelnen Zeichen.', en: 'The strongest assessment comes from combining multiple features, not from a single sign.', fa: 'معتبرترین ارزیابی از ترکیب چندین ویژگی به‌دست می‌آید، نه از یک علامت منفرد.' })}</strong><p>{tx({ de: 'Auch hierbei gibt es Ausnahmen. Anschließend folgt die BI-RADS-Gesamtbewertung.', en: 'Exceptions still occur. The next step is the overall BI-RADS assessment.', fa: 'بااین‌حال استثناها وجود دارند و در مرحله بعد ارزیابی نهایی BI-RADS انجام می‌شود.' })}</p></div>
        </Section>
        <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
      </div>
    </div>
  </main>
}
