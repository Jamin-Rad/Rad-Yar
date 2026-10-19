'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Untere GI-Blutung: CTA-Muster', subtitle: 'Aktive Extravasation phasenweise erkennen und Befundlokalisation präzise mitteilen.',
    intro: 'Die CT-Angiographie beantwortet eine konkrete Frage: Ist zum Untersuchungszeitpunkt eine aktive Blutung sichtbar, und wo liegt sie? Blutungsaktivität kann intermittierend sein; eine negative CTA schließt eine klinisch relevante Blutung nicht sicher aus.',
    phasesTitle: 'Mehrphasen-CTA vergleichen', phases: [
      ['Nativ', 'Vorhandenes hyperdenses Material im Darmlumen erkennen, bevor Kontrastmittel hinzukommt.'],
      ['Arteriell', 'Eine neu auftretende fokale Kontrastmittelaustrittstelle oder ein „Jet“ ins Lumen suchen.'],
      ['Portalvenös', 'Zunahme und Ausbreitung der intraluminalen Kontrastierung gegenüber der arteriellen Phase verfolgen.'],
    ],
    reportTitle: 'Lokalisation zuerst, Deutung danach', report: [
      'Segment und Gefäßterritorium so genau wie möglich benennen.',
      'Aktive Extravasation von hyperdichtem Blut, Inhalt oder Material unterscheiden, das bereits nativ sichtbar war.',
      'Blutungszeichen in arterieller und portalvenöser Phase vergleichen; Untersuchungszeitpunkt und Bewegungsartefakte berücksichtigen.',
      'Bei positivem CTA-Befund die Lokalisation zeitnah an das behandelnde Team kommunizieren.',
    ],
    contextTitle: 'Modalität an Blutungsaktivität anpassen', context: 'Bei aktiver unterer GI-Blutung ist CTA eine etablierte Lokalisationsmethode. Die ACR-Angemessenheitskriterien bewerten CTA bei aktiver Blutung als üblicherweise angemessen; bei hämodynamischer Instabilität nennt die ESGE CTA vor endoskopischer oder radiologischer Behandlung zur Lokalisation. Die konkrete Sequenz richtet sich nach Stabilität, Blutungsaktivität und lokalem Pfad.',
    cave: 'CTA ist zeitabhängig: Wenn die Blutung pausiert oder intermittiert, kann die Untersuchung negativ bleiben. Ein negativer Befund ist deshalb kein allgemeiner Ausschluss und ersetzt keine klinische Risikoeinschätzung.',
    source: 'Quellabdeckung: Abdomen.pdf, S. 86–87 (S. 86 visuell geprüft; S. 87 als Ablaufseite ausgewertet). Primärquellen: ACR Appropriateness Criteria: Radiologic Management of Lower GI Bleeding; ESGE Guideline 2021, DOI 10.1055/a-1496-8969; ACG Guideline 2023, PMID 36735555.',
  },
  en: {
    title: 'Lower GI bleeding: CTA patterns', subtitle: 'Recognise active extravasation across phases and communicate its location precisely.',
    intro: 'CT angiography answers a focused question: is active bleeding visible at the time of the examination, and where is it located? Bleeding can be intermittent; a negative CTA does not reliably exclude clinically important bleeding.',
    phasesTitle: 'Compare multiphase CTA', phases: [
      ['Unenhanced', 'Identify pre-existing hyperdense material in the bowel lumen before contrast is administered.'],
      ['Arterial', 'Look for a new focal site of contrast extravasation or a jet into the lumen.'],
      ['Portal venous', 'Track increase and spread of intraluminal contrast compared with the arterial phase.'],
    ],
    reportTitle: 'Localise first, interpret next', report: [
      'Name the bowel segment and vascular territory as precisely as possible.',
      'Distinguish active extravasation from hyperdense blood, contents or material already visible on the unenhanced series.',
      'Compare arterial and portal venous phases; account for timing and motion artefact.',
      'Communicate a positive CTA localisation promptly to the treating team.',
    ],
    contextTitle: 'Choose modality for bleeding activity', context: 'CTA is an established localisation method in active lower GI bleeding. ACR appropriateness criteria rate CTA as usually appropriate for active bleeding; ESGE recommends CTA before endoscopic or radiologic treatment to localise suspected ongoing bleeding in haemodynamically unstable patients. The sequence depends on stability, bleeding activity and the local pathway.',
    cave: 'CTA is time-dependent: if bleeding has stopped or is intermittent, the examination may be negative. A negative result is therefore not a general rule-out and does not replace clinical risk assessment.',
    source: 'Coverage: Abdomen.pdf, pp. 86–87 (p. 86 visually checked; p. 87 reviewed as the continuation). Primary sources: ACR Appropriateness Criteria: Radiologic Management of Lower GI Bleeding; ESGE Guideline 2021, DOI 10.1055/a-1496-8969; ACG Guideline 2023, PMID 36735555.',
  },
  fa: {
    title: 'خون‌ریزی تحتانی گوارش: الگوهای CTA', subtitle: 'نشت فعال ماده حاجب را در فازها تشخیص دهید و محل را دقیق گزارش کنید.',
    intro: 'CTA به پرسشی مشخص پاسخ می‌دهد: آیا هنگام بررسی خون‌ریزی فعال دیده می‌شود و محل آن کجاست؟ خون‌ریزی می‌تواند متناوب باشد؛ CTA منفی خون‌ریزی بالینی مهم را با اطمینان رد نمی‌کند.',
    phasesTitle: 'CTA چندفازی را مقایسه کنید', phases: [
      ['بدون تزریق', 'مواد پرچگال از پیش موجود در لومن روده را پیش از ورود ماده حاجب مشخص کنید.'],
      ['شریانی', 'به‌دنبال محل کانونی تازه نشت ماده حاجب یا «جت» به داخل لومن باشید.'],
      ['پورتوونوس', 'افزایش و گسترش ماده حاجب داخل لومن را در مقایسه با فاز شریانی دنبال کنید.'],
    ],
    reportTitle: 'ابتدا محل را مشخص کنید، سپس تفسیر کنید', report: [
      'سگمان روده و قلمرو عروقی را تا حد امکان دقیق نام ببرید.',
      'نشت فعال را از خون پرچگال، محتویات یا ماده‌ای که در تصاویر بدون تزریق هم دیده می‌شود تفکیک کنید.',
      'فازهای شریانی و پورتوونوس را مقایسه کنید و زمان تصویربرداری و آرتیفکت حرکتی را در نظر بگیرید.',
      'یافته مثبت CTA را سریع به تیم درمان اطلاع دهید.',
    ],
    contextTitle: 'روش را با فعالیت خون‌ریزی تطبیق دهید', context: 'CTA روش جاافتاده‌ای برای مکان‌یابی خون‌ریزی فعال تحتانی گوارش است. معیارهای تناسب ACR، CTA را برای خون‌ریزی فعال معمولاً مناسب می‌دانند؛ ESGE در بیمار ناپایدار با شک به خون‌ریزی ادامه‌دار، CTA را پیش از درمان اندوسکوپیک یا رادیولوژیک برای مکان‌یابی توصیه می‌کند. توالی بررسی به پایداری بیمار، فعالیت خون‌ریزی و مسیر محلی وابسته است.',
    cave: 'CTA به زمان وابسته است: اگر خون‌ریزی متوقف یا متناوب باشد، بررسی ممکن است منفی شود. بنابراین نتیجه منفی قاعده‌ای برای رد کلی نیست و جایگزین ارزیابی خطر بالینی نمی‌شود.',
    source: 'پوشش منبع: Abdomen.pdf صفحات ۸۶ تا ۸۷ (صفحه ۸۶ دیداری بررسی شد؛ صفحه ۸۷ به‌عنوان ادامه ارزیابی شد). منابع اولیه: معیارهای تناسب ACR برای خون‌ریزی تحتانی گوارش؛ راهنمای ESGE سال ۲۰۲۱، DOI 10.1055/a-1496-8969؛ راهنمای ACG سال ۲۰۲۳، PMID 36735555.',
  },
}

export default function LowerGIBleedingPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-lower-gi-bleeding" lang={lang} title={c.title} diagram="gi-bleed" copy={c}>
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <header className={styles.header}><div className={styles.hero}><div className={styles.heroText}><h1>{c.title}</h1><p>{c.subtitle}</p></div></div></header>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p><h2>{c.phasesTitle}</h2><div className={styles.cardsGrid}>{c.phases.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.reportTitle}</h2><ol>{c.report.map(item => <li key={item}>{item}</li>)}</ol><h2>{c.contextTitle}</h2><p>{c.context}</p><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://acsearch.acr.org/docs/69457/Narrative/" target="_blank" rel="noreferrer">ACR Appropriateness Criteria: Lower GI Bleeding ↗</a></p><p><a href="https://www.esge.com/diagnosis-and-management-of-acute-lower-gastrointestinal-bleeding-esge-guideline" target="_blank" rel="noreferrer">ESGE Guideline 2021 ↗</a></p><p><a href="https://pubmed.ncbi.nlm.nih.gov/36735555/" target="_blank" rel="noreferrer">ACG Guideline 2023 ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
