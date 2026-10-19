'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Akute Appendizitis', subtitle: 'Appendix, Wand und periappendikuläre Veränderungen gemeinsam beurteilen.',
    intro: 'Die Diagnose entsteht aus Klinik und Bildgebung. Durchmesser oder ein einzelnes sekundäres Zeichen reichen nicht isoliert aus; Appendixdarstellung, Wand, Kompressibilität und das umgebende Fettgewebe gehören zusammen.',
    usTitle: 'Sonographie: Appendix gezielt darstellen', us: [
      ['Direkte Beurteilung', 'Die Appendix entlang ihres Verlaufs aufsuchen und Kompressibilität, Wand, Lumen und Durchblutung beurteilen.'],
      ['Sekundäre Zeichen', 'Echogenes periappendikuläres Fett, lokale Flüssigkeit oder ein Appendikolith können den Verdacht stützen.'],
      ['Grenzen', 'Eine nicht dargestellte Appendix ist kein negativer Befund. Körperbau, Darmgas und Erfahrung beeinflussen die Aussage.'],
    ],
    ctTitle: 'CT: Entzündung und Komplikation beschreiben', ct: [
      ['Appendix', 'Kaliber, Wandverdickung und Kontrastmittelaufnahme im Gesamtkontext beschreiben; ein einzelner Durchmesser ist nicht beweisend.'],
      ['Umgebung', 'Periappendikuläre Fettgewebsreaktion, Flüssigkeit, Appendikolith, Abszess oder extraluminale Luft gezielt suchen.'],
      ['Komplikation', 'Bei möglicher Perforation oder Abszess Ausdehnung und Lage dokumentieren; Bildgebung allein legt die Therapie nicht fest.'],
    ],
    pathwayTitle: 'Modalität an Population und Situation anpassen', pathway: [
      'Klinische Vortestwahrscheinlichkeit und Untersuchungsqualität berücksichtigen.',
      'Bei Kindern und in der Schwangerschaft ist Ultraschall typischerweise der strahlenfreie erste Schritt; bei nicht schlüssigem Ultraschall weitere Bildgebung interdisziplinär wählen.',
      'Bei Erwachsenen ist CT bei passender Fragestellung häufig geeignet; Protokoll und Strahlendosis an Alter und klinische Situation anpassen.',
      'Bei nicht dargestellter Appendix, uneindeutigen Zeichen oder hoher klinischer Diskrepanz die Unsicherheit ausdrücklich berichten.',
    ],
    cave: 'Die 2025-WSES-Leitlinie aktualisiert Diagnostik und Behandlung, während ACR-Angemessenheitskriterien Modalitätswahl für konkrete Populationen einordnen. Dieser Lerninhalt fasst Bildzeichen zusammen und ersetzt weder klinische Risikoabschätzung noch lokale Akutpfade.',
    source: 'Quellabdeckung: Abdomen.pdf, S. 79–80 (visuell geprüft). Primärquellen: WSES Jerusalem Guidelines 2025 (JAMA Surgery 2026; DOI 10.1001/jamasurg.2025.6218) und ACR Appropriateness Criteria: Right Lower Quadrant Pain (2022).',
  },
  en: {
    title: 'Acute appendicitis', subtitle: 'Assess the appendix, its wall and periappendiceal changes together.',
    intro: 'Diagnosis combines clinical assessment and imaging. Diameter or one secondary sign is not sufficient in isolation; visualisation of the appendix, wall, compressibility and surrounding fat should be considered together.',
    usTitle: 'Ultrasound: identify the appendix deliberately', us: [
      ['Direct assessment', 'Trace the appendix and assess compressibility, wall, lumen and vascularity.'],
      ['Secondary signs', 'Echogenic periappendiceal fat, local fluid or an appendicolith may support suspicion.'],
      ['Limitations', 'A non-visualised appendix is not a negative examination. Body habitus, bowel gas and operator experience affect assessment.'],
    ],
    ctTitle: 'CT: describe inflammation and complications', ct: [
      ['Appendix', 'Describe calibre, wall thickening and enhancement in context; one diameter alone is not diagnostic.'],
      ['Surroundings', 'Look for periappendiceal fat stranding, fluid, appendicolith, abscess or extraluminal gas.'],
      ['Complications', 'If perforation or abscess is suspected, document extent and location; imaging alone does not determine treatment.'],
    ],
    pathwayTitle: 'Choose modality for the population and setting', pathway: [
      'Consider clinical pre-test probability and examination quality.',
      'In children and pregnancy, ultrasound is typically a radiation-free first step; if inconclusive, choose further imaging with the clinical team.',
      'In adults, CT is often appropriate for the relevant presentation; tailor protocol and radiation dose to age and clinical context.',
      'If the appendix is not visualised, findings are equivocal or clinical concern remains high, state the uncertainty explicitly.',
    ],
    cave: 'The 2025 WSES guideline updates diagnosis and treatment, while ACR appropriateness criteria address modality choices for specific populations. This lesson summarises imaging signs and does not replace clinical risk assessment or local acute-care pathways.',
    source: 'Coverage: Abdomen.pdf, pp. 79–80 (visually checked). Primary sources: WSES Jerusalem Guidelines 2025 (JAMA Surgery 2026; DOI 10.1001/jamasurg.2025.6218) and ACR Appropriateness Criteria: Right Lower Quadrant Pain (2022).',
  },
  fa: {
    title: 'آپاندیسیت حاد', subtitle: 'آپاندیس، دیواره و تغییرات اطراف آپاندیس را با هم ارزیابی کنید.',
    intro: 'تشخیص از ترکیب ارزیابی بالینی و تصویربرداری به‌دست می‌آید. قطر یا یک نشانه ثانویه به‌تنهایی کافی نیست؛ رؤیت آپاندیس، دیواره، قابلیت فشرده‌شدن و چربی اطراف باید با هم بررسی شوند.',
    usTitle: 'سونوگرافی: آپاندیس را هدفمند دنبال کنید', us: [
      ['ارزیابی مستقیم', 'آپاندیس را در طول مسیر دنبال کنید و قابلیت فشرده‌شدن، دیواره، لومن و جریان خون را بسنجید.'],
      ['نشانه‌های ثانویه', 'چربی اکوژن اطراف آپاندیس، مایع موضعی یا آپاندیکولیت می‌توانند شک را تقویت کنند.'],
      ['محدودیت‌ها', 'دیده‌نشدن آپاندیس به معنی بررسی منفی نیست. جثه بیمار، گاز روده و تجربه اپراتور بر ارزیابی اثر دارند.'],
    ],
    ctTitle: 'CT: التهاب و عوارض را توصیف کنید', ct: [
      ['آپاندیس', 'قطر، ضخیم‌شدن دیواره و جذب ماده حاجب را در زمینه کلی توصیف کنید؛ یک قطر منفرد تشخیصی نیست.'],
      ['بافت اطراف', 'التهاب چربی اطراف آپاندیس، مایع، آپاندیکولیت، آبسه یا هوای خارج لومن را جست‌وجو کنید.'],
      ['عوارض', 'اگر پارگی یا آبسه مطرح است، وسعت و محل را ثبت کنید؛ تصویر به‌تنهایی درمان را تعیین نمی‌کند.'],
    ],
    pathwayTitle: 'روش تصویربرداری را با جمعیت و شرایط تطبیق دهید', pathway: [
      'احتمال پیش‌آزمون بالینی و کیفیت بررسی را در نظر بگیرید.',
      'در کودکان و بارداری، سونوگرافی معمولاً گام نخست بدون پرتو است؛ اگر نتیجه قطعی نبود، تصویربرداری بعدی را با تیم بالینی انتخاب کنید.',
      'در بزرگسالان، برای تابلوی مناسب CT اغلب کاربرد دارد؛ پروتکل و دوز پرتو را با سن و زمینه بالینی تطبیق دهید.',
      'اگر آپاندیس دیده نمی‌شود، یافته‌ها مبهم‌اند یا شک بالینی بالاست، عدم قطعیت را صریح گزارش کنید.',
    ],
    cave: 'راهنمای WSES سال ۲۰۲۵ تشخیص و درمان را به‌روز می‌کند و معیارهای تناسب ACR انتخاب روش را برای جمعیت‌های مشخص توضیح می‌دهند. این درس نشانه‌های تصویری را خلاصه می‌کند و جایگزین ارزیابی خطر بالینی یا مسیرهای اورژانسی محلی نیست.',
    source: 'پوشش منبع: Abdomen.pdf صفحات ۷۹ تا ۸۰ (دیداری بررسی شدند). منابع اولیه: راهنمای WSES Jerusalem سال ۲۰۲۵ (JAMA Surgery 2026؛ DOI 10.1001/jamasurg.2025.6218) و معیارهای تناسب ACR برای درد ربع تحتانی راست (۲۰۲۲).',
  },
}

export default function AppendicitisPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-appendizitis" lang={lang} title={c.title} diagram="appendix" copy={c}>
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <header className={styles.header}><div className={styles.hero}><div className={styles.heroText}><h1>{c.title}</h1><p>{c.subtitle}</p></div></div></header>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p><div className={styles.cardsGrid}>{c.us.map(([title, text]) => <article className={styles.infoCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.ctTitle}</h2><div className={styles.cardsGrid}>{c.ct.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.pathwayTitle}</h2><ol>{c.pathway.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://pubmed.ncbi.nlm.nih.gov/41604201/" target="_blank" rel="noreferrer">WSES Jerusalem Guidelines 2025 ↗</a></p><p><a href="https://acsearch.acr.org/docs/69357/narrative/" target="_blank" rel="noreferrer">ACR Appropriateness Criteria: Right Lower Quadrant Pain ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
