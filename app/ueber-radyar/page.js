'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CONTENT = {
  de: {
    breadcrumb: 'Über RadYar & Rechtliches',
    eyebrow: 'Informationen zur Plattform',
    title: 'Über RadYar & Rechtliches',
    intro: 'Hier findest du Informationen über RadYar, medizinische Hinweise, Nutzungsbedingungen, Bildnachweise und Datenschutz.',
    recommendation: 'Rechtlicher Entwurf',
    recommendationText: 'Diese Seite ist eine redaktionelle Empfehlung und keine Rechtsberatung. Impressum, Datenschutz und Lizenznutzung sollten vor einer kommerziellen Veröffentlichung rechtlich geprüft werden.',
    navigation: 'Inhalt',
    updated: 'Stand: 13. Juni 2026',
    contactLink: 'Kontaktformular öffnen',
    sections: [
      {
        title: 'Über RadYar',
        paragraphs: [
          'RadYar ist eine digitale radiologische Lernplattform für Ärztinnen und Ärzte. Sie bereitet radiologisches Wissen strukturiert, verständlich und praxisnah auf und unterstützt beim Lernen, Wiederholen und Vertiefen.',
          'Die Plattform wurde von Dr. Univ. Kerman Hamed Zia erstellt und didaktisch weiterentwickelt. Die Inhalte beruhen auf radiologischem Fachwissen, klinischer Erfahrung, Weiterbildungsinhalten und öffentlich zugänglichen Lehrquellen.',
          'RadYar richtet sich an medizinisches Fachpersonal. Die Plattform ist keine Beratungsplattform für Patientinnen und Patienten.',
        ],
      },
      {
        title: 'Medizinischer Hinweis',
        paragraphs: [
          'Alle Inhalte dienen ausschließlich der medizinischen Aus-, Fort- und Weiterbildung. Sie stellen keine individuelle medizinische Beratung sowie keine Diagnose- oder Therapieempfehlung dar.',
          'Trotz sorgfältiger Erstellung können Fehler, Unvollständigkeiten oder veraltete Angaben nicht ausgeschlossen werden. Klinische Entscheidungen müssen eigenverantwortlich anhand aktueller Leitlinien, Fachliteratur, lokaler Standards und fachärztlicher Supervision getroffen werden.',
          'RadYar darf nicht als alleinige Grundlage für diagnostische oder therapeutische Entscheidungen verwendet werden.',
        ],
      },
      {
        title: 'Kostenlose und kostenpflichtige Inhalte',
        paragraphs: [
          'RadYar kann frei zugängliche Inhalte, Funktionen nach kostenloser Registrierung und kostenpflichtige Zusatzfunktionen anbieten.',
          'Lernlektionen und darin eingebundene externe Lehrbilder sollen kostenlos zugänglich bleiben. Interaktive Funktionen wie Lernfortschritt, MCQs, Flashcards, Quiz- und Wiederholungsfunktionen können abhängig vom gewählten Zugangsmodell eingeschränkt sein.',
          'Kostenpflichtige Angebote beziehen sich auf RadYars eigene Lern- und Interaktionsfunktionen. Externe Bilder werden nicht als Bestandteil eines kostenpflichtigen Bildangebots verkauft.',
        ],
      },
      {
        title: 'Bildnachweise und externe Quellen',
        paragraphs: [
          'RadYar kann externe radiologische Bilder verwenden, insbesondere von Radiopaedia. Soweit solche Bilder eingesetzt werden, sollen Originalquelle, Autorenschaft beziehungsweise Fall-ID und ein direkter Link in unmittelbarer Nähe angegeben werden.',
          'RadYar beansprucht keine Rechte an externen Bildern. Maßgeblich sind immer die Lizenzbedingungen, die bei der jeweiligen Originalquelle und beim konkreten Bild oder Fall angegeben sind. Diese Bedingungen können sich ändern und müssen vor jeder Nutzung geprüft werden.',
          'Eine Weiterverwendung durch Nutzerinnen und Nutzer ist nur im Rahmen der jeweiligen Originallizenz zulässig.',
        ],
      },
      {
        title: 'Quellen und fachliche Grundlage',
        paragraphs: [
          'Die Lerninhalte beruhen auf Fachwissen, klinischer Erfahrung, Weiterbildungsinhalten und öffentlich zugänglichen Lehrquellen.',
          'Bei standardisierten Klassifikationen, Leitlinien, Scores und Systemen wie BI-RADS, O-RADS, LI-RADS, Bosniak, TNM oder Fleischner-Kriterien sollen relevante Originalquellen beziehungsweise offizielle Referenzen angegeben werden.',
          'Didaktische Zusammenfassungen können Einzelheiten verkürzt darstellen und ersetzen weder offizielle Leitlinien noch Lehrbücher oder wissenschaftliche Primärliteratur.',
        ],
      },
      {
        title: 'Nutzungsbedingungen',
        paragraphs: ['Mit der Nutzung von RadYar erkennen Nutzerinnen und Nutzer den ausschließlichen Lern- und Fortbildungszweck der Plattform an.'],
        bullets: [
          'Inhalte nicht als alleinige Grundlage medizinischer Entscheidungen verwenden.',
          'Externe Inhalte nur entsprechend ihrer jeweiligen Lizenz weiterverwenden.',
          'Geschützte oder kostenpflichtige Inhalte nicht unberechtigt kopieren, veröffentlichen oder weitergeben.',
          'Zugangsdaten nicht an Dritte weitergeben.',
          'Die Plattform nicht missbräuchlich, automatisiert störend oder rechtswidrig nutzen.',
        ],
      },
      {
        title: 'Urheberrecht',
        paragraphs: [
          'Eigene Texte, Struktur, didaktische Aufbereitung, MCQs, Flashcards, Quizfunktionen, Wiederholungslogik, Diagramme und Grafiken von RadYar sind urheberrechtlich geschützt, soweit sie nicht ausdrücklich als externe Inhalte gekennzeichnet sind.',
          'Die persönliche Nutzung zu Lernzwecken ist erlaubt. Eine Veröffentlichung, kommerzielle Nutzung oder Weitergabe wesentlicher Teile ist ohne vorherige Zustimmung nicht gestattet.',
        ],
      },
      {
        title: 'Datenschutz',
        paragraphs: [
          'RadYar verarbeitet personenbezogene Daten nur für die bereitgestellten Funktionen, beispielsweise Registrierung, Anmeldung, Profil, Lernfortschritt, Kontakt und Verwaltung von Zugangsmodellen.',
          'Eine vollständige Datenschutzerklärung muss insbesondere Verantwortliche, Rechtsgrundlagen, Speicherdauer, eingesetzte Dienstleister, Cookies, Hosting, mögliche Zahlungsdienste sowie Auskunfts-, Löschungs- und Widerspruchsrechte konkret benennen.',
          'Bis eine juristisch geprüfte Datenschutzerklärung veröffentlicht ist, dürfen hieraus keine abschließenden Aussagen über die konkrete Datenverarbeitung abgeleitet werden.',
        ],
      },
      {
        title: 'Kontakt und Verantwortlicher',
        paragraphs: [
          'Verantwortlich für die redaktionellen Inhalte: Dr. Univ. Kerman Hamed Zia.',
          'Fragen, Korrekturhinweise, Bildnachweise und rechtliche Anliegen können über das Kontaktformular im Nutzerprofil übermittelt werden.',
          'Vor einem öffentlichen oder kommerziellen Betrieb müssen gegebenenfalls weitere gesetzlich erforderliche Impressumsangaben, insbesondere eine ladungsfähige Anschrift und eine direkte Kontaktmöglichkeit, ergänzt werden.',
        ],
        contact: true,
      },
      {
        title: 'Aktualität',
        paragraphs: [
          'RadYar wird fortlaufend weiterentwickelt. Inhalte, Funktionen, Zugangsmodelle und rechtliche Informationen können angepasst werden. Maßgeblich ist die jeweils veröffentlichte Fassung dieser Seite.',
        ],
      },
    ],
  },
  en: {
    breadcrumb: 'About RadYar & Legal',
    eyebrow: 'Platform information',
    title: 'About RadYar & Legal',
    intro: 'Information about RadYar, medical notices, terms of use, image credits and privacy.',
    recommendation: 'Legal draft',
    recommendationText: 'This page is an editorial recommendation and does not constitute legal advice. The legal notice, privacy policy and use of licensed material should be reviewed by qualified counsel before commercial publication.',
    navigation: 'Contents',
    updated: 'Last updated: 13 June 2026',
    contactLink: 'Open contact form',
    sections: [
      {
        title: 'About RadYar',
        paragraphs: [
          'RadYar is a digital radiology learning platform for physicians. It presents radiological knowledge in a structured, accessible and practice-oriented format for learning and review.',
          'The platform was created and educationally developed by Dr. Univ. Kerman Hamed Zia. Its content draws on radiological expertise, clinical experience, training material and publicly available educational sources.',
          'RadYar is intended for medical professionals and is not a medical advice service for patients.',
        ],
      },
      {
        title: 'Medical disclaimer',
        paragraphs: [
          'All content is provided solely for medical education and professional development. It is not individual medical advice and does not provide diagnostic or treatment recommendations.',
          'Despite careful preparation, errors, omissions or outdated information cannot be excluded. Clinical decisions remain the user’s responsibility and must take account of current guidelines, literature, local standards and specialist supervision.',
          'RadYar must not be used as the sole basis for diagnostic or therapeutic decisions.',
        ],
      },
      {
        title: 'Free and paid content',
        paragraphs: [
          'RadYar may offer freely accessible material, features requiring free registration and additional paid functions.',
          'Learning lessons and external educational images embedded in them are intended to remain freely accessible. Interactive features such as progress tracking, MCQs, flashcards, quizzes and spaced review may depend on the selected access model.',
          'Paid services relate to RadYar’s own learning and interaction features. External images are not sold as part of a paid image product.',
        ],
      },
      {
        title: 'Image credits and external sources',
        paragraphs: [
          'RadYar may use external radiology images, particularly from Radiopaedia. Where used, the original source, author or case ID and a direct link should be displayed close to the image.',
          'RadYar claims no rights in external images. The licence shown by the original source for the specific image or case always applies. Licence terms may change and must be checked before each use.',
          'Users may reuse external material only where permitted by its original licence.',
        ],
      },
      {
        title: 'Sources and academic basis',
        paragraphs: [
          'Learning content is based on professional knowledge, clinical experience, training material and publicly available educational sources.',
          'For classifications, guidelines, scores and systems such as BI-RADS, O-RADS, LI-RADS, Bosniak, TNM or Fleischner criteria, relevant original or official references should be provided.',
          'Educational summaries may omit detail and do not replace official guidelines, textbooks or primary research.',
        ],
      },
      {
        title: 'Terms of use',
        paragraphs: ['By using RadYar, users acknowledge that the platform is intended solely for learning and professional education.'],
        bullets: [
          'Do not rely on the content as the sole basis for medical decisions.',
          'Reuse external content only under its applicable licence.',
          'Do not copy, publish or distribute protected or paid content without permission.',
          'Do not share account credentials with third parties.',
          'Do not use the platform unlawfully, abusively or in a way that disrupts its operation.',
        ],
      },
      {
        title: 'Copyright',
        paragraphs: [
          'RadYar’s original texts, structure, educational presentation, MCQs, flashcards, quiz functions, review logic, diagrams and graphics are protected by copyright unless identified as external content.',
          'Personal educational use is permitted. Publication, commercial exploitation or distribution of substantial portions requires prior permission.',
        ],
      },
      {
        title: 'Privacy',
        paragraphs: [
          'RadYar processes personal data only to provide its features, including registration, sign-in, profiles, learning progress, contact and access management.',
          'A complete privacy policy must specifically identify the controller, legal bases, retention periods, service providers, cookies, hosting, possible payment services and users’ rights to access, deletion and objection.',
          'Until a legally reviewed privacy policy is published, this section should not be treated as a complete description of actual data processing.',
        ],
      },
      {
        title: 'Contact and responsible person',
        paragraphs: [
          'Responsible for editorial content: Dr. Univ. Kerman Hamed Zia.',
          'Questions, corrections, image credit requests and legal enquiries can be submitted through the contact form in the user profile.',
          'Before public or commercial operation, any legally required company or publisher details, including a service address and direct contact method, must be added where applicable.',
        ],
        contact: true,
      },
      {
        title: 'Updates',
        paragraphs: [
          'RadYar is continuously developed. Content, features, access models and legal information may change. The version currently published on this page applies.',
        ],
      },
    ],
  },
  fa: {
    breadcrumb: 'درباره رادیار و اطلاعات حقوقی',
    eyebrow: 'اطلاعات پلتفرم',
    title: 'درباره رادیار و اطلاعات حقوقی',
    intro: 'در این صفحه اطلاعات مربوط به رادیار، هشدارهای پزشکی، شرایط استفاده، منابع تصاویر و حریم خصوصی ارائه شده است.',
    recommendation: 'پیش‌نویس حقوقی',
    recommendationText: 'این صفحه صرفاً یک پیشنهاد محتوایی است و مشاوره حقوقی محسوب نمی‌شود. اطلاعات ناشر، سیاست حریم خصوصی و استفاده از محتوای دارای مجوز باید پیش از انتشار تجاری توسط متخصص حقوقی بررسی شوند.',
    navigation: 'فهرست مطالب',
    updated: 'آخرین به‌روزرسانی: ۱۳ ژوئن ۲۰۲۶',
    contactLink: 'باز کردن فرم تماس',
    sections: [
      {
        title: 'درباره رادیار',
        paragraphs: [
          'رادیار یک پلتفرم دیجیتال آموزش رادیولوژی برای پزشکان است. هدف آن ارائه دانش رادیولوژی به‌صورت ساختاریافته، قابل فهم و کاربردی برای یادگیری و مرور است.',
          'این پلتفرم توسط دکتر کرمان حامد ضیا ایجاد و از نظر آموزشی توسعه داده شده است. مطالب بر دانش تخصصی رادیولوژی، تجربه بالینی، محتوای آموزشی و منابع عمومی استوار هستند.',
          'رادیار برای متخصصان پزشکی طراحی شده و سامانه مشاوره پزشکی برای بیماران نیست.',
        ],
      },
      {
        title: 'هشدار پزشکی',
        paragraphs: [
          'تمام مطالب صرفاً برای آموزش و توسعه حرفه‌ای پزشکی ارائه می‌شوند و جایگزین مشاوره فردی، تشخیص یا توصیه درمانی نیستند.',
          'با وجود دقت در تهیه مطالب، احتمال خطا، نقص یا قدیمی بودن اطلاعات وجود دارد. تصمیم‌های بالینی باید با مسئولیت شخصی و بر اساس راهنماهای روز، منابع علمی، استانداردهای محلی و نظارت تخصصی اتخاذ شوند.',
          'رادیار نباید تنها مبنای تصمیم‌های تشخیصی یا درمانی باشد.',
        ],
      },
      {
        title: 'محتوای رایگان و پولی',
        paragraphs: [
          'رادیار می‌تواند محتوای آزاد، امکانات نیازمند ثبت‌نام رایگان و قابلیت‌های تکمیلی پولی ارائه کند.',
          'درس‌ها و تصاویر آموزشی خارجی درون آن‌ها قرار است رایگان باقی بمانند. قابلیت‌هایی مانند ثبت پیشرفت، پرسش‌های چندگزینه‌ای، فلش‌کارت، آزمون و مرور می‌توانند به نوع دسترسی وابسته باشند.',
          'خدمات پولی مربوط به امکانات آموزشی و تعاملی خود رادیار هستند. تصاویر خارجی به‌عنوان محصول تصویری پولی فروخته نمی‌شوند.',
        ],
      },
      {
        title: 'منابع تصاویر و محتوای خارجی',
        paragraphs: [
          'رادیار ممکن است از تصاویر رادیولوژی منابع خارجی، به‌ویژه Radiopaedia، استفاده کند. در این موارد باید منبع اصلی، نام پدیدآورنده یا شناسه کیس و پیوند مستقیم در نزدیکی تصویر نمایش داده شود.',
          'رادیار هیچ حقی نسبت به تصاویر خارجی ادعا نمی‌کند. مجوز درج‌شده در منبع اصلی برای همان تصویر یا کیس ملاک است. شرایط مجوز ممکن است تغییر کند و پیش از هر استفاده باید بررسی شود.',
          'استفاده مجدد کاربران تنها در محدوده مجوز منبع اصلی مجاز است.',
        ],
      },
      {
        title: 'منابع و مبنای علمی',
        paragraphs: [
          'مطالب آموزشی بر دانش تخصصی، تجربه بالینی، محتوای دوره‌های آموزشی و منابع عمومی استوار هستند.',
          'برای طبقه‌بندی‌ها، راهنماها و سیستم‌هایی مانند BI-RADS، O-RADS، LI-RADS، Bosniak، TNM و معیارهای Fleischner باید منابع اصلی یا رسمی مرتبط ذکر شوند.',
          'خلاصه‌سازی آموزشی ممکن است برخی جزئیات را حذف کند و جایگزین راهنمای رسمی، کتاب تخصصی یا پژوهش اصلی نیست.',
        ],
      },
      {
        title: 'شرایط استفاده',
        paragraphs: ['با استفاده از رادیار، کاربر می‌پذیرد که این پلتفرم صرفاً برای یادگیری و آموزش حرفه‌ای است.'],
        bullets: [
          'مطالب نباید تنها مبنای تصمیم پزشکی باشند.',
          'محتوای خارجی فقط مطابق مجوز مربوطه استفاده شود.',
          'محتوای محافظت‌شده یا پولی بدون اجازه کپی، منتشر یا توزیع نشود.',
          'اطلاعات ورود حساب در اختیار دیگران قرار نگیرد.',
          'از پلتفرم به‌صورت غیرقانونی، سوءاستفاده‌آمیز یا مختل‌کننده استفاده نشود.',
        ],
      },
      {
        title: 'حقوق مؤلف',
        paragraphs: [
          'متن‌ها، ساختار، شیوه آموزشی، پرسش‌ها، فلش‌کارت‌ها، آزمون‌ها، منطق مرور، نمودارها و تصاویر اختصاصی رادیار، مگر آن‌که خارجی معرفی شده باشند، تحت حمایت حقوق مؤلف هستند.',
          'استفاده شخصی برای یادگیری مجاز است. انتشار، بهره‌برداری تجاری یا توزیع بخش‌های عمده بدون اجازه قبلی مجاز نیست.',
        ],
      },
      {
        title: 'حریم خصوصی',
        paragraphs: [
          'رادیار داده‌های شخصی را فقط برای ارائه امکاناتی مانند ثبت‌نام، ورود، پروفایل، پیشرفت آموزشی، تماس و مدیریت دسترسی پردازش می‌کند.',
          'سیاست کامل حریم خصوصی باید مسئول پردازش، مبانی قانونی، مدت نگهداری، ارائه‌دهندگان خدمات، کوکی‌ها، میزبانی، خدمات پرداخت احتمالی و حقوق دسترسی، حذف و اعتراض کاربران را دقیقاً مشخص کند.',
          'تا زمان انتشار سیاست حریم خصوصی بررسی‌شده از نظر حقوقی، این بخش شرح کامل پردازش واقعی داده‌ها محسوب نمی‌شود.',
        ],
      },
      {
        title: 'تماس و مسئول محتوا',
        paragraphs: [
          'مسئول محتوای تحریریه: دکتر کرمان حامد ضیا.',
          'پرسش‌ها، اصلاحات، درخواست‌های مربوط به منبع تصاویر و امور حقوقی از طریق فرم تماس در پروفایل کاربر قابل ارسال هستند.',
          'پیش از فعالیت عمومی یا تجاری، اطلاعات قانونی لازم مانند نشانی قابل ابلاغ و راه تماس مستقیم باید در صورت الزام قانونی تکمیل شوند.',
        ],
        contact: true,
      },
      {
        title: 'به‌روزرسانی',
        paragraphs: [
          'رادیار به‌طور پیوسته توسعه می‌یابد. محتوا، امکانات، مدل‌های دسترسی و اطلاعات حقوقی ممکن است تغییر کنند. نسخه منتشرشده فعلی این صفحه معتبر است.',
        ],
      },
    ],
  },
}

const sectionId = index => `section-${index + 1}`

export default function UeberRadyarPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">RadYar</Link>
          <span>›</span>
          <span>{copy.breadcrumb}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <small>{copy.updated}</small>
        </header>

        <aside className={styles.notice}>
          <span aria-hidden="true">i</span>
          <div>
            <strong>{copy.recommendation}</strong>
            <p>{copy.recommendationText}</p>
          </div>
        </aside>

        <div className={styles.layout}>
          <nav className={styles.toc} aria-label={copy.navigation}>
            <strong>{copy.navigation}</strong>
            {copy.sections.map((section, index) => (
              <a key={section.title} href={`#${sectionId(index)}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>

          <div className={styles.content}>
            {copy.sections.map((section, index) => (
              <section className={styles.section} id={sectionId(index)} key={section.title}>
                <div className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {section.contact && <Link className={styles.contactLink} href="/profil">{copy.contactLink} →</Link>}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
