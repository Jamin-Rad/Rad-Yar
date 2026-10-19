'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../../gi/divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Zystische Leberläsionen', subtitle: 'Einfache Zyste und Echinokokkose anhand von Morphologie, Kontext und Warnzeichen unterscheiden.',
    intro: 'Eine glatt begrenzte flüssigkeitsäquivalente Läsion kann einer einfachen Zyste entsprechen. Tochterzysten, abgelöste Membranen, Wandveränderungen oder ein passender Expositionskontext verlangen eine andere Einordnung. Bildgebungsmuster allein sichern keine Echinokokkose.',
    simpleTitle: 'Einfache Leberzyste', simple: [
      ['Sonographie', 'Anechogener, glatt begrenzter Inhalt mit dorsaler Schallverstärkung.'],
      ['CT', 'Flüssigkeitsnahe Dichte, glatte Kontur und kein messbares Enhancement.'],
      ['MRT', 'Typischerweise T1-hypointens und T2-hyperintens; bei atypischer Wand oder komplexem Inhalt weiter charakterisieren.'],
    ],
    hydatidTitle: 'Echinokokkenzyste: Warnzeichen ernst nehmen', hydatid: [
      ['Mögliche Morphologie', 'Tochterzysten, abgelöste Membran („Water-lily“-Zeichen), Wandverkalkung oder komplexer Inhalt können auftreten.'],
      ['Komplikationen', 'Ruptur, Infektion und Kommunikation mit den Gallenwegen sind relevante Komplikationen.'],
      ['Kontext', 'Epidemiologie, Exposition und klinische Angaben mitberücksichtigen; die Bildgebung beschreibt den Verdacht, ersetzt aber keine klinische Diagnostik.'],
    ],
    workflowTitle: 'Sicherer Befundweg', workflow: [
      'Lokalisation und Größe dokumentieren; Inhalt, Wand, Septen und Verkalkung beschreiben.',
      'Sonographische Schallverstärkung und CT/MRT-Kontrastmittelverhalten gezielt prüfen.',
      'Tochterzysten, abgelöste Membran, Infektion, Ruptur oder biliäre Kommunikation suchen.',
      'Bei möglicher Echinokokkose eine diagnostische Punktion nicht als Routine vornehmen; vor Intervention spezialisierte Abklärung veranlassen.',
    ],
    cave: 'Eine mögliche Echinokokkose muss vor einer Punktion oder anderen invasiven Maßnahme geklärt werden. Die WHO-Behandlungswahl hängt unter anderem von Zystenstadium, Komplikationen, Lage und verfügbaren Fachkenntnissen ab; diese Lektion leitet keine Therapieentscheidung ab.',
    source: 'Quellabdeckung: Abdomen.pdf, S. 5–7 (S. 5–6 visuell geprüft; Originalfallbilder werden nicht wiederverwendet). Primärquellen: ACG Clinical Guideline: Focal Liver Lesions (2024), WHO Guidelines for Cystic Echinococcosis (2025).',
  },
  en: {
    title: 'Cystic liver lesions', subtitle: 'Distinguish simple cysts from echinococcosis using morphology, context and warning signs.',
    intro: 'A smooth fluid-attenuation lesion may represent a simple cyst. Daughter cysts, detached membranes, wall changes or a relevant exposure history require a different assessment. Imaging patterns alone do not establish echinococcosis.',
    simpleTitle: 'Simple hepatic cyst', simple: [
      ['Ultrasound', 'Anechoic, smoothly marginated contents with posterior acoustic enhancement.'],
      ['CT', 'Near-fluid attenuation, smooth contour and no measurable enhancement.'],
      ['MRI', 'Typically T1 hypointense and T2 hyperintense; further characterise an atypical wall or complex contents.'],
    ],
    hydatidTitle: 'Echinococcal cyst: heed warning signs', hydatid: [
      ['Possible morphology', 'Daughter cysts, detached membranes (“water-lily” sign), wall calcification or complex contents may occur.'],
      ['Complications', 'Rupture, infection and communication with the bile ducts are relevant complications.'],
      ['Context', 'Consider epidemiology, exposure and clinical history; imaging describes suspicion but does not replace clinical diagnosis.'],
    ],
    workflowTitle: 'A safe reporting sequence', workflow: [
      'Document location and size; describe contents, wall, septa and calcification.',
      'Assess posterior acoustic enhancement and contrast behaviour on CT/MRI.',
      'Look for daughter cysts, detached membranes, infection, rupture or biliary communication.',
      'If echinococcosis is possible, do not perform diagnostic puncture routinely; obtain specialist assessment before intervention.',
    ],
    cave: 'Possible echinococcosis must be clarified before puncture or another invasive procedure. WHO treatment choices depend on cyst stage, complications, location and available expertise; this lesson does not make treatment decisions.',
    source: 'Coverage: Abdomen.pdf, pp. 5–7 (pp. 5–6 visually checked; original case images are not reused). Primary sources: ACG Clinical Guideline: Focal Liver Lesions (2024), WHO Guidelines for Cystic Echinococcosis (2025).',
  },
  fa: {
    title: 'ضایعات کیستیک کبد', subtitle: 'کیست ساده را با توجه به مورفولوژی، زمینه و نشانه‌های هشدار از اکینوکوکوز افتراق دهید.',
    intro: 'ضایعه‌ای با حدود صاف و دانسیته مایع می‌تواند کیست ساده باشد. کیست‌های دختر، غشای جداشده، تغییرات دیواره یا سابقه تماس مرتبط، ارزیابی متفاوتی می‌طلبند. الگوی تصویربرداری به‌تنهایی اکینوکوکوز را اثبات نمی‌کند.',
    simpleTitle: 'کیست ساده کبد', simple: [
      ['سونوگرافی', 'محتوای بدون اکو با حدود صاف و تقویت صوتی خلفی.'],
      ['CT', 'دانسیته نزدیک به مایع، حاشیه صاف و بدون جذب قابل‌اندازه‌گیری ماده حاجب.'],
      ['MRI', 'معمولاً در T1 کم‌سیگنال و در T2 پرسیگنال است؛ دیواره غیرمعمول یا محتوای پیچیده را بیشتر بررسی کنید.'],
    ],
    hydatidTitle: 'کیست اکینوکوکی: نشانه‌های هشدار را جدی بگیرید', hydatid: [
      ['مورفولوژی احتمالی', 'کیست دختر، غشای جداشده (علامت «نیلوفر آبی»)، کلسیفیکاسیون دیواره یا محتوای پیچیده ممکن است دیده شود.'],
      ['عارضه‌ها', 'پارگی، عفونت و ارتباط با مجاری صفراوی از عارضه‌های مهم هستند.'],
      ['زمینه', 'همه‌گیرشناسی، سابقه تماس و اطلاعات بالینی را در نظر بگیرید؛ تصویر شک را توصیف می‌کند اما جایگزین تشخیص بالینی نیست.'],
    ],
    workflowTitle: 'توالی ایمن گزارش', workflow: [
      'محل و اندازه را ثبت کنید؛ محتوا، دیواره، سپتا و کلسیفیکاسیون را توصیف کنید.',
      'تقویت صوتی خلفی و رفتار ماده حاجب در CT/MRI را ارزیابی کنید.',
      'به‌دنبال کیست دختر، غشای جداشده، عفونت، پارگی یا ارتباط صفراوی باشید.',
      'اگر اکینوکوکوز مطرح است، نمونه‌گیری تشخیصی را به‌طور روتین انجام ندهید؛ پیش از مداخله ارزیابی تخصصی بگیرید.',
    ],
    cave: 'پیش از نمونه‌گیری یا اقدام تهاجمی دیگر، احتمال اکینوکوکوز باید روشن شود. انتخاب درمان WHO به مرحله کیست، عوارض، محل و مهارت موجود وابسته است؛ این درس تصمیم درمانی نمی‌گیرد.',
    source: 'پوشش منبع: Abdomen.pdf صفحات ۵ تا ۷ (صفحات ۵ و ۶ دیداری بررسی شدند؛ تصاویر کیس اصلی بازاستفاده نشده‌اند). منابع اولیه: راهنمای ACG ضایعات کانونی کبد (۲۰۲۴) و راهنمای WHO اکینوکوکوز کیستیک (۲۰۲۵).',
  },
}

export default function CysticLiverLesionsPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-cystic-liver-lesions" lang={lang} title={c.title} diagram="hydatid" copy={c}>
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <header className={styles.header}><div className={styles.hero}><div className={styles.heroText}><h1>{c.title}</h1><p>{c.subtitle}</p></div></div></header>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p>
          <div className={styles.cardsGrid}>{c.simple.map(([title, text]) => <article className={styles.infoCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>
        </section>
        <section className={styles.section}><h2>{c.hydatidTitle}</h2><div className={styles.cardsGrid}>{c.hydatid.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.workflowTitle}</h2><ol>{c.workflow.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noreferrer">ACG Clinical Guideline: Focal Liver Lesions ↗</a></p><p><a href="https://www.who.int/publications/i/item/9789240110472" target="_blank" rel="noreferrer">WHO Guidelines for Cystic Echinococcosis ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
