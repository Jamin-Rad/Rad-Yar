'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const NAME = 'Dr. Univ. Kerman Hamed Zia'

const CONTENT = {
  de: {
    breadcrumbCurrent: 'Über RadYar & Rechtliches',
    title: 'Über RadYar & Rechtliches',
    subtitle: 'Informationen zur Plattform, zu Inhalten, Nutzungsbedingungen, Bildnachweisen und Datenschutz.',
    toc: 'Inhaltsverzeichnis',
    stand: 'Stand: 12.06.2026',
    sections: [
      {
        id: 'ueber-radyar',
        icon: 'ℹ️',
        navLabel: 'Über RadYar',
        title: '1. Über RadYar',
        paragraphs: [
          'RadYar ist eine digitale radiologische Lernplattform für Ärztinnen und Ärzte. Ziel der Plattform ist es, radiologisches Wissen strukturiert, verständlich und praxisnah aufzubereiten. Die Inhalte sollen beim Lernen, Wiederholen und Vertiefen radiologischer Themen unterstützen.',
          'Die Plattform wurde von {{NAME}} erstellt und didaktisch weiterentwickelt. Die Inhalte basieren auf radiologischem Fachwissen, klinischer Erfahrung, Weiterbildungsinhalten sowie öffentlich zugänglichen Lehrquellen. RadYar erhebt keinen Anspruch auf Vollständigkeit und ersetzt keine Fachbücher, Leitlinien, wissenschaftlichen Originalarbeiten, Supervision oder ärztliche Weiterbildung.',
          'RadYar richtet sich ausschließlich an Ärztinnen und Ärzte und ist nicht für Patientinnen und Patienten als medizinische Beratungsplattform bestimmt.',
        ],
      },
      {
        id: 'disclaimer',
        icon: '⚠️',
        navLabel: 'Medizinischer Hinweis',
        title: '2. Medizinischer Hinweis / Disclaimer',
        paragraphs: [
          'Die Inhalte von RadYar dienen ausschließlich der medizinischen Fortbildung und dem Training radiologischer Kenntnisse. Sie stellen keine individuelle medizinische Beratung, Diagnose oder Therapieempfehlung dar und sind nicht für die unmittelbare Anwendung am Patienten bestimmt.',
          'Nutzerinnen und Nutzer sind verpflichtet, alle Inhalte eigenständig anhand aktueller Leitlinien, Fachliteratur, lokaler Standards und unter fachärztlicher Supervision zu überprüfen. RadYar darf nicht die alleinige Grundlage für diagnostische oder therapeutische Entscheidungen sein.',
        ],
      },
      {
        id: 'inhalte',
        icon: '💳',
        navLabel: 'Kostenlose & kostenpflichtige Inhalte',
        title: '3. Kostenlose und kostenpflichtige Inhalte',
        paragraphs: [
          'Die Lektionen von RadYar, einschließlich der darin eingebetteten radiologischen Bilder, sind und bleiben kostenfrei zugänglich.',
          'Bestimmte interaktive Funktionen – etwa die Speicherung des Lernfortschritts, MCQ-Fragen, Flashcards, Wiederholungsfunktionen und die erweiterte Themenauswahl – können eine Registrierung und/oder ein aktives Abonnement voraussetzen.',
          'Bilder von Radiopaedia.org werden zu keinem Zeitpunkt als Bestandteil kostenpflichtiger Inhalte verkauft oder vermarktet.',
        ],
      },
      {
        id: 'bildnachweise',
        icon: '🖼️',
        navLabel: 'Bildnachweise & Radiopaedia',
        title: '4. Bildnachweise und Radiopaedia',
        paragraphs: [
          'Auf den frei zugänglichen Lektionsseiten verwendet RadYar vereinzelt externe Bildmaterialien, insbesondere von Radiopaedia.org, ausschließlich zu nicht-kommerziellen Bildungszwecken.',
          'Zu jedem verwendeten Bild wird ein direkter Link zur Originalquelle sowie – soweit verfügbar – die Fall-ID bzw. rID angegeben; entsprechende Nachweise (Credits) werden in unmittelbarer Nähe zum Bild dargestellt.',
          'RadYar erhebt keinen eigenen urheberrechtlichen Anspruch auf diese externen Bilder. Inhalte von Radiopaedia.org unterliegen der jeweils gültigen Creative-Commons-Lizenz von Radiopaedia (nicht-kommerzielle Nutzung, Namensnennung, Weitergabe unter gleichen Bedingungen).',
          'Die kostenpflichtigen Bereiche (MCQs, Flashcards, Wiederholungs- und Quizfunktionen) enthalten keine Bilder von Radiopaedia.org als Bestandteil des verkauften Inhalts.',
        ],
      },
      {
        id: 'quellen',
        icon: '📚',
        navLabel: 'Quellen & fachliche Grundlage',
        title: '5. Quellen und fachliche Grundlage',
        paragraphs: [
          'Die Inhalte von RadYar basieren auf radiologischem Fachwissen, klinischer Erfahrung, Weiterbildungsinhalten sowie öffentlich zugänglichen Lehrquellen.',
          'Bei der Darstellung standardisierter Klassifikationen, Leitlinien und Scores (z. B. BI-RADS, O-RADS, LI-RADS, Bosniak-Klassifikation, TNM-Klassifikation, Fleischner-Kriterien, Empfehlungen zu Kontrastmitteln) wird auf die jeweiligen Originalquellen verwiesen.',
          'Die Darstellung erfolgt didaktisch zusammengefasst und vereinfacht und ersetzt nicht die offiziellen Leitlinien, Fachbücher oder Originalarbeiten.',
        ],
      },
      {
        id: 'nutzung',
        icon: '📜',
        navLabel: 'Nutzungsbedingungen',
        title: '6. Nutzungsbedingungen',
        paragraphs: [
          'Mit der Nutzung von RadYar erkennen Nutzerinnen und Nutzer an, dass die Plattform ausschließlich Lern- und Fortbildungszwecken dient. Sie verpflichten sich insbesondere,',
        ],
        list: [
          'die Inhalte nicht als alleinige Grundlage für medizinische Entscheidungen zu verwenden,',
          'die Lizenzbedingungen externer Bilder und Quellen zu respektieren,',
          'kostenpflichtige Inhalte nicht ohne Genehmigung zu kopieren, weiterzugeben oder zu veröffentlichen,',
          'ihre Zugangsdaten nicht an Dritte weiterzugeben,',
          'die Plattform nicht missbräuchlich zu nutzen.',
        ],
        afterList: [
          'RadYar behält sich das Recht vor, Inhalte, Funktionen, Zugangsmodelle und Preise jederzeit anzupassen.',
        ],
      },
      {
        id: 'urheberrecht',
        icon: '©️',
        navLabel: 'Urheberrecht',
        title: '7. Urheberrecht an RadYar-Inhalten',
        paragraphs: [
          'Texte, Struktur, didaktische Inhalte, MCQs, Flashcards, Quizfunktionen, Wiederholungslogik, Abbildungen und eigene Grafiken von RadYar sind urheberrechtlich geschützt, soweit sie nicht ausdrücklich als externe Inhalte gekennzeichnet sind.',
          'Die private Nutzung zu Lernzwecken ist gestattet. Eine Vervielfältigung, Veröffentlichung, kommerzielle Nutzung oder Weitergabe wesentlicher Teile der Inhalte bedarf der vorherigen Zustimmung.',
          'Für externe Inhalte (z. B. Bilder von Radiopaedia.org) gelten die Lizenzbedingungen der jeweiligen Originalquelle.',
        ],
      },
      {
        id: 'datenschutz',
        icon: '🔒',
        navLabel: 'Datenschutz',
        title: '8. Datenschutz-Hinweis',
        paragraphs: [
          'Personenbezogene Daten werden ausschließlich im Rahmen der angebotenen Funktionen verarbeitet, insbesondere für Registrierung, Login, Lernfortschritt, Profil, Kontaktformular und Abo-Verwaltung.',
          'Nähere Informationen zur Datenverarbeitung, zu Cookies, eingesetzten externen Diensten, Hosting und Zahlungsdienstleistern sowie zu den Rechten der Nutzerinnen und Nutzer finden sich in der separaten Datenschutzerklärung. Diese ist Bestandteil dieser rechtlichen Hinweise und sollte vor der Nutzung der Plattform gelesen werden.',
        ],
      },
      {
        id: 'kontakt',
        icon: '✉️',
        navLabel: 'Kontakt',
        title: '9. Kontakt',
        paragraphs: [
          'Für Fragen, Korrekturen, Bildnachweise oder rechtliche Anliegen steht im Nutzerprofil ein Kontaktformular zur Verfügung.',
        ],
        contact: {
          label: 'Verantwortlich für den Inhalt:',
          lines: ['{{NAME}}', 'Esslingen, Deutschland'],
        },
      },
      {
        id: 'aktualitaet',
        icon: '🕒',
        navLabel: 'Aktualität',
        title: '10. Hinweis zur Aktualität',
        paragraphs: [
          'RadYar wird kontinuierlich weiterentwickelt. Inhalte, Funktionen und rechtliche Hinweise können sich daher ändern. Maßgeblich ist stets die jeweils aktuelle Version dieser Seite.',
        ],
      },
    ],
  },
  en: {
    breadcrumbCurrent: 'About RadYar & Legal',
    title: 'About RadYar & Legal',
    subtitle: 'Information about the platform, content, terms of use, image credits and privacy.',
    toc: 'Contents',
    stand: 'Last updated: 12 June 2026',
    sections: [
      {
        id: 'ueber-radyar',
        icon: 'ℹ️',
        navLabel: 'About RadYar',
        title: '1. About RadYar',
        paragraphs: [
          'RadYar is a digital radiology learning platform for physicians. The platform’s aim is to present radiological knowledge in a structured, accessible and practice-oriented way. The content is intended to support learning, revision and deepening of radiological topics.',
          'The platform was created and didactically developed by {{NAME}}. The content is based on radiological expertise, clinical experience, postgraduate training materials and publicly accessible teaching sources. RadYar does not claim to be complete and does not replace textbooks, guidelines, original scientific papers, supervision or medical training.',
          'RadYar is intended exclusively for physicians and is not designed as a medical advice platform for patients.',
        ],
      },
      {
        id: 'disclaimer',
        icon: '⚠️',
        navLabel: 'Medical notice',
        title: '2. Medical Notice / Disclaimer',
        paragraphs: [
          'The content of RadYar is intended exclusively for medical education and training. It does not constitute individual medical advice, diagnosis or treatment recommendations and is not intended for direct application to patients.',
          'Users are required to independently verify all content against current guidelines, the scientific literature, local standards and specialist supervision. RadYar must not be the sole basis for diagnostic or therapeutic decisions.',
        ],
      },
      {
        id: 'inhalte',
        icon: '💳',
        navLabel: 'Free & paid content',
        title: '3. Free and Paid Content',
        paragraphs: [
          'RadYar’s lessons, including the radiological images embedded within them, are and will remain freely accessible.',
          'Certain interactive features — such as saving learning progress, MCQ questions, flashcards, repetition functions and extended topic selection — may require registration and/or an active subscription.',
          'Images from Radiopaedia.org are never sold or marketed as part of paid content.',
        ],
      },
      {
        id: 'bildnachweise',
        icon: '🖼️',
        navLabel: 'Image credits & Radiopaedia',
        title: '4. Image Credits and Radiopaedia',
        paragraphs: [
          'On the freely accessible lesson pages, RadYar occasionally uses external image material, particularly from Radiopaedia.org, exclusively for non-commercial educational purposes.',
          'For each image used, a direct link to the original source and, where available, the case ID or rID is provided; corresponding credits are displayed directly next to the image.',
          'RadYar does not claim any copyright of its own over these external images. Content from Radiopaedia.org is subject to Radiopaedia’s applicable Creative Commons licence (non-commercial use, attribution, share-alike).',
          'The paid areas (MCQs, flashcards, repetition and quiz functions) do not contain any Radiopaedia.org images as part of the sold content.',
        ],
      },
      {
        id: 'quellen',
        icon: '📚',
        navLabel: 'Sources & basis',
        title: '5. Sources and Professional Basis',
        paragraphs: [
          'The content of RadYar is based on radiological expertise, clinical experience, postgraduate training materials and publicly accessible teaching sources.',
          'When presenting standardised classifications, guidelines and scores (e.g. BI-RADS, O-RADS, LI-RADS, Bosniak classification, TNM classification, Fleischner criteria, contrast agent recommendations), reference is made to the respective original sources.',
          'The presentation is didactically summarised and simplified and does not replace official guidelines, textbooks or original publications.',
        ],
      },
      {
        id: 'nutzung',
        icon: '📜',
        navLabel: 'Terms of use',
        title: '6. Terms of Use',
        paragraphs: [
          'By using RadYar, users acknowledge that the platform serves exclusively learning and educational purposes. In particular, they agree',
        ],
        list: [
          'not to use the content as the sole basis for medical decisions,',
          'to respect the licence terms of external images and sources,',
          'not to copy, redistribute or publish paid content without authorisation,',
          'not to share their login credentials with third parties,',
          'not to misuse the platform.',
        ],
        afterList: [
          'RadYar reserves the right to adjust content, features, access models and prices at any time.',
        ],
      },
      {
        id: 'urheberrecht',
        icon: '©️',
        navLabel: 'Copyright',
        title: '7. Copyright in RadYar Content',
        paragraphs: [
          'Texts, structure, didactic content, MCQs, flashcards, quiz functions, repetition logic, diagrams and original graphics created by RadYar are protected by copyright unless explicitly marked as external content.',
          'Private use for learning purposes is permitted. Reproduction, publication, commercial use or distribution of substantial parts of the content requires prior consent.',
          'External content (e.g. images from Radiopaedia.org) is subject to the licence terms of the respective original source.',
        ],
      },
      {
        id: 'datenschutz',
        icon: '🔒',
        navLabel: 'Privacy',
        title: '8. Privacy Notice',
        paragraphs: [
          'Personal data is processed only within the scope of the functions provided, in particular for registration, login, learning progress, profile, contact form and subscription management.',
          'Further information on data processing, cookies, external services used, hosting and payment providers, as well as on users’ rights, can be found in the separate privacy policy. This is part of these legal notices and should be read before using the platform.',
        ],
      },
      {
        id: 'kontakt',
        icon: '✉️',
        navLabel: 'Contact',
        title: '9. Contact',
        paragraphs: [
          'For questions, corrections, image credits or legal concerns, a contact form is available in the user profile.',
        ],
        contact: {
          label: 'Responsible for the content:',
          lines: ['{{NAME}}', 'Esslingen, Germany'],
        },
      },
      {
        id: 'aktualitaet',
        icon: '🕒',
        navLabel: 'Currency notice',
        title: '10. Note on Currency',
        paragraphs: [
          'RadYar is being developed continuously. Content, features and legal notices may therefore change. The current version of this page is always authoritative.',
        ],
      },
    ],
  },
  fa: {
    breadcrumbCurrent: 'درباره رادیار و موارد قانونی',
    title: 'درباره رادیار و موارد قانونی',
    subtitle: 'اطلاعاتی درباره پلتفرم، محتوا، شرایط استفاده، منابع تصاویر و حفظ حریم خصوصی.',
    toc: 'فهرست مطالب',
    stand: 'تاریخ به‌روزرسانی: ۱۲.۰۶.۲۰۲۶',
    sections: [
      {
        id: 'ueber-radyar',
        icon: 'ℹ️',
        navLabel: 'درباره رادیار',
        title: '۱. درباره رادیار',
        paragraphs: [
          'رادیار یک پلتفرم آموزشی دیجیتال رادیولوژی برای پزشکان است. هدف این پلتفرم، ارائه دانش رادیولوژی به‌صورت ساختاریافته، قابل‌فهم و کاربردی است. محتوای آن برای یادگیری، تکرار و تعمیق مباحث رادیولوژی طراحی شده است.',
          'این پلتفرم توسط {{NAME}} ایجاد و از نظر آموزشی توسعه داده شده است. محتوا بر اساس دانش تخصصی رادیولوژی، تجربه بالینی، منابع آموزشی تخصصی و منابع آموزشی عمومی در دسترس تهیه شده است. رادیار ادعای کامل بودن ندارد و جایگزین کتاب‌های درسی، گایدلاین‌ها، مقالات علمی اصلی، سوپروایژن یا آموزش پزشکی نیست.',
          'رادیار صرفاً برای پزشکان طراحی شده و به‌عنوان یک پلتفرم مشاوره پزشکی برای بیماران در نظر گرفته نشده است.',
        ],
      },
      {
        id: 'disclaimer',
        icon: '⚠️',
        navLabel: 'توضیح پزشکی',
        title: '۲. توضیح پزشکی / سلب مسئولیت',
        paragraphs: [
          'محتوای رادیار صرفاً برای آموزش و تمرین پزشکی است. این محتوا به‌منزله مشاوره پزشکی فردی، تشخیص یا توصیه درمانی نیست و برای استفاده مستقیم در مورد بیماران در نظر گرفته نشده است.',
          'کاربران موظف‌اند تمام محتوا را به‌طور مستقل با گایدلاین‌های روز، منابع علمی، استانداردهای محلی و تحت نظارت متخصص بررسی کنند. رادیار نباید تنها مبنای تصمیمات تشخیصی یا درمانی باشد.',
        ],
      },
      {
        id: 'inhalte',
        icon: '💳',
        navLabel: 'محتوای رایگان و پرداختی',
        title: '۳. محتوای رایگان و پرداختی',
        paragraphs: [
          'درس‌های رادیار، از جمله تصاویر رادیولوژی موجود در آن‌ها، رایگان هستند و رایگان باقی خواهند ماند.',
          'برخی امکانات تعاملی - مانند ذخیره پیشرفت یادگیری، سؤالات MCQ، فلش‌کارت‌ها، عملکردهای تکرار و انتخاب گسترده‌تر موضوعات - ممکن است نیاز به ثبت‌نام و/یا اشتراک فعال داشته باشند.',
          'تصاویر Radiopaedia.org هیچ‌گاه به‌عنوان بخشی از محتوای پرداختی فروخته یا بازاریابی نمی‌شوند.',
        ],
      },
      {
        id: 'bildnachweise',
        icon: '🖼️',
        navLabel: 'منابع تصاویر و Radiopaedia',
        title: '۴. منابع تصاویر و Radiopaedia',
        paragraphs: [
          'در صفحات درسی رایگان، رادیار گاهی از تصاویر خارجی، به‌ویژه از Radiopaedia.org، صرفاً برای اهداف آموزشی غیرتجاری استفاده می‌کند.',
          'برای هر تصویر استفاده‌شده، لینک مستقیم به منبع اصلی و در صورت وجود، شناسه کیس یا rID ارائه می‌شود؛ منابع مربوطه نیز در نزدیکی تصویر نمایش داده می‌شوند.',
          'رادیار هیچ ادعای حق نشر مستقلی بر این تصاویر خارجی ندارد. محتوای Radiopaedia.org تحت مجوز Creative Commons مربوطه از Radiopaedia قرار دارد (استفاده غیرتجاری، ذکر منبع، انتشار با شرایط مشابه).',
          'بخش‌های پرداختی (MCQها، فلش‌کارت‌ها، عملکردهای تکرار و کوییز) هیچ تصویری از Radiopaedia.org به‌عنوان بخشی از محتوای فروخته‌شده ندارند.',
        ],
      },
      {
        id: 'quellen',
        icon: '📚',
        navLabel: 'منابع و مبنای علمی',
        title: '۵. منابع و مبنای علمی',
        paragraphs: [
          'محتوای رادیار بر اساس دانش تخصصی رادیولوژی، تجربه بالینی، منابع آموزشی تخصصی و منابع آموزشی عمومی در دسترس تهیه شده است.',
          'در ارائه طبقه‌بندی‌ها، گایدلاین‌ها و امتیازات استاندارد (مانند BI-RADS، O-RADS، LI-RADS، طبقه‌بندی Bosniak، طبقه‌بندی TNM، معیارهای Fleischner، توصیه‌های ماده حاجب) به منابع اصلی مربوطه ارجاع داده می‌شود.',
          'این ارائه به‌صورت آموزشی، خلاصه و ساده‌شده است و جایگزین گایدلاین‌های رسمی، کتاب‌های درسی یا مقالات اصلی نیست.',
        ],
      },
      {
        id: 'nutzung',
        icon: '📜',
        navLabel: 'شرایط استفاده',
        title: '۶. شرایط استفاده',
        paragraphs: [
          'با استفاده از رادیار، کاربران تأیید می‌کنند که این پلتفرم صرفاً برای اهداف یادگیری و آموزشی است. کاربران متعهد می‌شوند که:',
        ],
        list: [
          'محتوا را به‌عنوان تنها مبنای تصمیمات پزشکی استفاده نکنند،',
          'شرایط مجوز تصاویر و منابع خارجی را رعایت کنند،',
          'محتوای پرداختی را بدون اجازه کپی، اشتراک‌گذاری یا منتشر نکنند،',
          'اطلاعات ورود خود را با اشخاص ثالث به اشتراک نگذارند،',
          'از پلتفرم به‌صورت نادرست استفاده نکنند.',
        ],
        afterList: [
          'رادیار حق دارد در هر زمان محتوا، امکانات، مدل‌های دسترسی و قیمت‌ها را تغییر دهد.',
        ],
      },
      {
        id: 'urheberrecht',
        icon: '©️',
        navLabel: 'حق نشر',
        title: '۷. حق نشر محتوای رادیار',
        paragraphs: [
          'متون، ساختار، محتوای آموزشی، MCQها، فلش‌کارت‌ها، عملکردهای کوییز، منطق تکرار، نمودارها و گرافیک‌های اصلی رادیار - مگر آنکه به‌صراحت به‌عنوان محتوای خارجی مشخص شده باشند - تحت حمایت حق نشر هستند.',
          'استفاده شخصی برای اهداف یادگیری مجاز است. تکثیر، انتشار، استفاده تجاری یا اشتراک‌گذاری بخش‌های قابل‌توجه محتوا نیاز به موافقت قبلی دارد.',
          'برای محتوای خارجی (مانند تصاویر Radiopaedia.org) شرایط مجوز منبع اصلی مربوطه اعمال می‌شود.',
        ],
      },
      {
        id: 'datenschutz',
        icon: '🔒',
        navLabel: 'حفظ حریم خصوصی',
        title: '۸. توضیحات حفظ حریم خصوصی',
        paragraphs: [
          'اطلاعات شخصی فقط در چارچوب امکانات ارائه‌شده پردازش می‌شود، به‌ویژه برای ثبت‌نام، ورود، پیشرفت یادگیری، پروفایل، فرم تماس و مدیریت اشتراک.',
          'اطلاعات بیشتر درباره پردازش داده‌ها، کوکی‌ها، خدمات خارجی استفاده‌شده، هاستینگ و ارائه‌دهندگان پرداخت، و همچنین حقوق کاربران در سیاست حفظ حریم خصوصی جداگانه آمده است. این سیاست بخشی از این اطلاعیه قانونی است و باید پیش از استفاده از پلتفرم مطالعه شود.',
        ],
      },
      {
        id: 'kontakt',
        icon: '✉️',
        navLabel: 'تماس',
        title: '۹. تماس با ما',
        paragraphs: [
          'برای سؤالات، اصلاحات، منابع تصاویر یا موارد قانونی، یک فرم تماس در پروفایل کاربری در دسترس است.',
        ],
        contact: {
          label: 'مسئول محتوا:',
          lines: ['{{NAME}}', 'اسلینگن، آلمان'],
        },
      },
      {
        id: 'aktualitaet',
        icon: '🕒',
        navLabel: 'به‌روزرسانی',
        title: '۱۰. به‌روزرسانی',
        paragraphs: [
          'رادیار به‌طور مستمر در حال توسعه است. به همین دلیل محتوا، امکانات و اطلاعیه‌های قانونی ممکن است تغییر کنند. نسخه فعلی این صفحه همواره معتبر است.',
        ],
      },
    ],
  },
}

function renderText(text) {
  if (!text.includes('{{NAME}}')) return text
  const [before, after] = text.split('{{NAME}}')
  return <>{before}<strong>{NAME}</strong>{after}</>
}

function Section({ id, icon, title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2><span className={styles.sectionIcon}>{icon}</span>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </section>
  )
}

export default function UeberRadyarPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const [activeId, setActiveId] = useState(sectionIds[0])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/">RadYar</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.heroText}>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
          <span className={styles.stand}>{copy.stand}</span>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.navLabel}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          {copy.sections.map(section => (
            <Section key={section.id} id={section.id} icon={section.icon} title={section.title}>
              {section.paragraphs.map((paragraph, index) => (
                <p className={styles.paragraph} key={index}>{renderText(paragraph)}</p>
              ))}
              {section.list && (
                <ul className={styles.list}>
                  {section.list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              )}
              {section.afterList && section.afterList.map((paragraph, index) => (
                <p className={styles.paragraph} key={`after-${index}`}>{renderText(paragraph)}</p>
              ))}
              {section.contact && (
                <div className={styles.contactBlock}>
                  <strong>{section.contact.label}</strong>
                  {section.contact.lines.map((line, index) => (
                    <span key={index}>{renderText(line)}</span>
                  ))}
                </div>
              )}
            </Section>
          ))}
        </div>
      </div>
    </main>
  )
}
