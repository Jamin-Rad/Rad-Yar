'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import template from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const copy = {
  title: L('Myokardinfarkt im Kardio-MRT', 'Myocardial infarction on cardiac MRI', 'انفارکت میوکارد در MRI قلب'),
  subtitle: L('LGE · Stress-Perfusion · MVO und Thrombus', 'LGE · stress perfusion · MVO and thrombus', 'LGE · پرفیوژن استرس · MVO و ترومبوس'),
  chapter: L('Kardiale Bildgebung / Kardio-MRT', 'Cardiac imaging / cardiac MRI', 'تصویربرداری قلبی / MRI قلب'),
  thorax: L('Thorax', 'Thorax', 'قفسه سینه'),
  contents: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  preview: L('Lektion im Aufbau · LGE und Stress-Perfusion', 'Lesson in progress · LGE and stress perfusion', 'درس در حال تکمیل · LGE و پرفیوژن استرس'),
  read: L('Als gelesen markieren', 'Mark as read', 'علامت‌گذاری به‌عنوان خوانده‌شده'),
  readDone: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  auth: L('Bitte melde dich an, um deinen Lernfortschritt zu speichern.', 'Please sign in to save your learning progress.', 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.'),
  signIn: L('Anmelden', 'Sign in', 'ورود'),
  rule: L('LGE: Die Leitfrage', 'LGE: the key question', 'LGE: پرسش کلیدی'),
  ruleQuestion: L('Erfasst das LGE das Subendokard und folgt es einem Koronarterritorium?', 'Does the LGE involve the subendocardium and follow a coronary territory?', 'آیا LGE ساب‌اندوکارد را درگیر می‌کند و از قلمرو یک شریان کرونری پیروی می‌کند؟'),
  yes: L('Beides ja → eher ischämische Schädigung / Infarkt', 'Both yes → favour ischaemic injury / infarction', 'هر دو بله ← بیشتر به آسیب ایسکمیک / انفارکت فکر کن'),
  no: L('Mid-wall, subepikardial oder nichtterritorial → eher nichtischämisch', 'Mid-wall, subepicardial or non-territorial → favour non-ischaemic disease', 'میدوال، ساب‌اپیکاردیال یا غیرقلمروی ← بیشتر به بیماری غیرایسکمیک فکر کن'),
  caveat: L('Subendokardiales LGE allein beweist keinen Infarkt: eine diffuse, nichtterritoriale Verteilung kann z. B. bei Amyloidose vorkommen.', 'Subendocardial LGE alone does not prove infarction: a diffuse, non-territorial pattern can occur with amyloidosis.', 'LGE ساب‌اندوکاردی به‌تنهایی انفارکت را ثابت نمی‌کند؛ الگوی منتشر و غیرقلمروی می‌تواند در آمیلوئیدوز دیده شود.'),
  sources: L('Quellen', 'Sources', 'منابع'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  completeSection: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completedSection: L('Als gelesen markiert', 'Marked as read', 'به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  close: L('Schließen', 'Close', 'بستن'),
  openSection: L('Abschnitt öffnen', 'Open section', 'باز کردن بخش'),
  factInfarct: L('Subendokard + Koronarterritorium', 'Subendocardium + coronary territory', 'ساب‌اندوکارد + قلمرو کرونری'),
  factMvo: L('Dunkler Kern im hellen Infarkt', 'Dark core within a bright infarct', 'هستهٔ تیره در انفارکت روشن'),
  factIschemia: L('Stressdefekt ohne Ruhedefekt', 'Stress defect absent at rest', 'نقص استرس بدون نقص در استراحت'),
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
  {
    id: 'stress-perfusion', number: '06', title: L('Ischämie in der Stress-Perfusion', 'Ischaemia on stress perfusion', 'ایسکمی در پرفیوژن استرس'),
    flow: true,
    paragraphs: [
      L('Die dynamische First-Pass-Serie Bild für Bild mit dem Slider vor- und zurückgehen: zuerst kontrastiert der rechte Ventrikel (RV), dann der linke Ventrikel (LV) und schließlich das LV-Myokard. Die Dauer eines Defekts lässt sich so besser beurteilen als allein in der abgespielten Schleife.', 'Step through the dynamic first-pass series frame by frame with the slider: contrast reaches the right ventricle (RV), then the left ventricle (LV), then the LV myocardium. This makes defect duration easier to judge than watching the loop alone.', 'سری دینامیک first-pass را با اسلایدر، فازبه‌فاز جلو و عقب ببر: کنتراست ابتدا به بطن راست (RV)، بعد بطن چپ (LV) و سپس میوکارد بطن چپ می‌رسد. این کار سنجش دوام نقص را از تماشای صرفِ فیلم آسان‌تر می‌کند.'),
      L('Ein echter induzierbarer Perfusionsdefekt beginnt mit der Kontrastankunft im Myokard, ist meist subendokardial und folgt häufig einem Koronarterritorium. Er hält über die maximale myokardiale Anreicherung hinaus mehrere Herzzyklen an (praktisch oft etwa vier oder mehr Bilder; keine starre Grenze).', 'A true inducible perfusion defect begins as contrast reaches the myocardium, is usually subendocardial and often follows a coronary territory. It persists for several heartbeats beyond peak myocardial enhancement (often roughly four or more frames in practice, but this is not a fixed cutoff).', 'نقص پرفیوژن القاپذیرِ واقعی با رسیدن کنتراست به میوکارد ظاهر می‌شود، معمولاً ساب‌اندوکاردیال است و اغلب از قلمرو کرونری پیروی می‌کند. این نقص چند ضربان پس از اوج افزایش سیگنال میوکارد باقی می‌ماند (در عمل اغلب حدود چهار فاز یا بیشتر، اما این عدد آستانهٔ قطعی نیست).'),
    ],
    bullets: [
      L('Nur unter Stress, nicht in Ruhe (falls eine Ruhe-Serie vorliegt) → reversibler Defekt; bei passender Form und Dauer spricht er für Ischämie.', 'Stress only, absent at rest (when rest images are available) → a reversible defect; if its shape and duration fit, it supports ischaemia.', 'فقط در استرس و غایب در استراحت (اگر سری استراحت موجود باشد) ← نقص برگشت‌پذیر؛ اگر شکل و دوام آن هم سازگار باشد، به نفع ایسکمی است.'),
      L('Unter Stress und in Ruhe → Artefakt oder andere Ursache erwägen; Narbengewebe anhand des LGE beurteilen.', 'Present at stress and rest → consider artifact or another cause; assess scar on LGE.', 'در استرس و استراحت هر دو دیده شود ← آرتیفکت یا علت دیگر را بررسی کن؛ اسکار را با LGE ارزیابی کن.'),
    ],
    takeaway: L('Stressdefekt + passende Dynamik + kein Ruhedefekt → induzierbare Ischämie wahrscheinlich.', 'Stress defect + convincing time course + no rest defect → inducible ischaemia is likely.', 'نقص در استرس + سیر زمانی سازگار + نبود نقص در استراحت ← ایسکمی القاپذیر محتمل است.'),
  },
  {
    id: 'dark-band', number: '07', title: L('Dark-Band-Artefakt erkennen', 'Recognising the dark-band artifact', 'شناخت آرتیفکت Dark-band'),
    paragraphs: [
      L('Das Dark-Band- oder Dark-Rim-Artefakt ist ein dünner subendokardialer dunkler Streifen. Es tritt häufig schon beim starken Kontrasteintritt in den LV-Blutpool auf, bevor das Myokard anreichert, und verschwindet rasch – oft nach nur ein bis zwei Bildern beziehungsweise wenigen Herzschlägen.', 'The dark-band or dark-rim artifact is a thin subendocardial dark line. It often appears as contrast enters the LV blood pool, before myocardial enhancement, and fades quickly—often after only one or two frames or a few heartbeats.', 'آرتیفکت dark-band یا dark-rim نوار تیرهٔ باریکی در ساب‌اندوکارد است. اغلب هنگام ورود شدید کنتراست به حفرهٔ LV، پیش از افزایش سیگنال میوکارد، ظاهر می‌شود و سریع محو می‌شود؛ گاهی تنها در یک تا دو فاز یا چند ضربان دیده می‌شود.'),
      L('Es kann auch in Ruhe auftreten und muss keinem Koronarterritorium entsprechen. Umgekehrt beweist sein Fehlen in Ruhe allein keine Ischämie: Herzfrequenz und Kontrastkinetik können das Artefakt zwischen Stress und Ruhe verändern.', 'It can also occur at rest and need not follow a coronary territory. Conversely, its absence at rest alone does not prove ischaemia: heart rate and contrast kinetics can change the artifact between stress and rest.', 'این نوار ممکن است در استراحت هم دیده شود و لزوماً از قلمرو کرونری پیروی نمی‌کند. برعکس، غایب بودنش در استراحت به‌تنهایی ایسکمی را ثابت نمی‌کند؛ ضربان قلب و سینتیک کنتراست می‌توانند ظاهر آرتیفکت را بین استرس و استراحت تغییر دهند.'),
    ],
    takeaway: L('Ischämie bleibt mehrere Phasen während der myokardialen Kontrastaufnahme sichtbar; Dark Band ist meist früh und kurzlebig.', 'Ischaemia persists for several frames during myocardial enhancement; a dark band is usually early and transient.', 'ایسکمی طی چند فازِ افزایش سیگنال میوکارد باقی می‌ماند؛ dark band معمولاً زودرس و گذراست.'),
  },
]

const references = [
  { label: 'SCMR position paper: clinical indications for CMR', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7649060/' },
  { label: 'Cardiac MR assessment of microvascular obstruction', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4651190/' },
  { label: 'CMR imaging for assessment of cardiac thrombus', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3782319/' },
  { label: 'Clinical CMR patterns in cardiomyopathies', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9902331/' },
  { label: 'SCMR: standardized CMR image interpretation and post-processing', href: 'https://events.scmr.org/wp-content/uploads/2024/08/Post-processing.pdf' },
]

const lessonSections = [...sections, { id: 'decision', number: '08', title: copy.rule }, { id: 'sources', number: '09', title: copy.sources }]

function SectionIcon({ id }) {
  const paths = {
    principle: 'M4 4h16v16H4z M8 9h8 M8 13h8 M8 17h5',
    infarct: 'M3 13h4l2-6 4 10 2-5h6',
    mvo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 8v4l3 2',
    thrombus: 'M12 3c-4 4-7 7-7 11a7 7 0 0 0 14 0c0-4-3-7-7-11z M9 15h6',
    noninfarct: 'M4 5h16v14H4z M7 13l3-3 3 4 4-5',
    'stress-perfusion': 'M3 12h4l2-5 4 10 2-5h6 M18 3v4 M16 5h4',
    'dark-band': 'M4 5h16v14H4z M7 15h10 M7 9h10',
    decision: 'M12 3l9 17H3z M12 9v5 M12 17v1',
    sources: 'M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4',
  }
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.principle} /></svg>
}

export default function MyokardinfarktMrtPage() {
  const { lang } = useLanguage()
  const current = lang === 'fa' || lang === 'en' ? lang : 'de'
  const t = value => value[current]
  const { isRead, toggleRead, authError } = useLessonReadStatus('myokardinfarkt-mrt')
  useMobileLearningLayout()
  const withLang = href => current === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${current}`
  const [openId, setOpenId] = useState(lessonSections[0].id)
  const [readSections, setReadSections] = useState(() => new Set())
  const [mobilePathOpen, setMobilePathOpen] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (lessonSections.some(section => section.id === hash)) setOpenId(hash)
    try {
      const saved = JSON.parse(localStorage.getItem('radyar_myokardinfarkt_mrt_sections') || '[]')
      if (Array.isArray(saved)) setReadSections(new Set(saved.filter(id => lessonSections.some(section => section.id === id))))
    } catch {}
  }, [])

  useEffect(() => {
    if (!isRead) return
    const all = new Set(lessonSections.map(section => section.id))
    setReadSections(all)
    try { localStorage.setItem('radyar_myokardinfarkt_mrt_sections', JSON.stringify([...all])) } catch {}
  }, [isRead])

  const selectSection = id => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    setMobilePathOpen(false)
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(null, '', nextId ? `${baseUrl}#${nextId}` : baseUrl)
    if (nextId) requestAnimationFrame(() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const updateSections = next => {
    setReadSections(next)
    try { localStorage.setItem('radyar_myokardinfarkt_mrt_sections', JSON.stringify([...next])) } catch {}
  }
  const toggleSectionRead = id => {
    const next = new Set(readSections)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    updateSections(next)
  }
  const toggleLessonRead = () => {
    if (toggleRead()) updateSections(isRead ? new Set() : new Set(lessonSections.map(section => section.id)))
  }
  const activeIndex = lessonSections.findIndex(section => section.id === openId)
  const activeSection = lessonSections[activeIndex] || lessonSections[0]
  const nextSection = () => selectSection(lessonSections[Math.min(activeIndex + 1, lessonSections.length - 1)].id)

  const sectionPanel = (section, children) => {
    const open = openId === section.id
    const done = readSections.has(section.id)
    return <section id={section.id} key={section.id} className={`${template.section} ${open ? template.sectionOpen : ''}`}>
      <button type="button" className={template.sectionHeader} onClick={() => selectSection(section.id)} aria-expanded={open} aria-controls={`${section.id}-panel`}>
        <span className={template.sectionIcon}><SectionIcon id={section.id} /></span><span><strong>{t(section.title)}</strong></span><span className={template.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div id={`${section.id}-panel`} hidden={!open} className={`${template.sectionBody} ${styles.sectionBody}`}>
        {children}
        <button type="button" className={`${template.readButton} ${done ? template.readButtonDone : ''}`} aria-pressed={done} onClick={() => toggleSectionRead(section.id)}><SectionIcon id="infarct" />{t(done ? copy.completedSection : copy.completeSection)}</button>
      </div>
    </section>
  }

  return <main className={`${template.page} ${styles.page}`} data-lesson-progress-managed="true" dir={current === 'fa' ? 'rtl' : 'ltr'} lang={current}>
    <header className={template.header}>
      <div className={template.topline}><nav className={template.breadcrumb} aria-label="Breadcrumb"><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/thorax')}>{t(copy.thorax)}</Link><span>/</span><span>{t(copy.chapter)}</span><span>/</span><strong>{t(copy.title)}</strong></nav><span className={template.author}>Dr. Zia</span></div>
      <div className={template.hero}>
        <div className={template.heroCopy}><h1>{t(copy.title)}</h1><p className={styles.subtitle}>{t(copy.subtitle)}</p><p className={styles.preview}>{t(copy.preview)}</p></div>
        <div className={template.heroFacts}>
          {[[sections[1].title, copy.factInfarct, 'infarct'], [sections[2].title, copy.factMvo, 'mvo'], [sections[5].title, copy.factIschemia, 'stress-perfusion']].map(([title, detail, icon]) => <article key={icon}><span className={template.factIcon}><SectionIcon id={icon} /></span><strong>{t(title)}</strong><p>{t(detail)}</p></article>)}
        </div>
      </div>
      <div className={template.progressBar}><div className={template.progressTrack}><i style={{ width: `${(readSections.size / lessonSections.length) * 100}%` }} /></div><span>{readSections.size} / {lessonSections.length} {t(copy.progress)}</span><div className={template.progressActions}><button type="button" className={`${template.lessonCompleteButton} ${isRead ? template.lessonCompleteButtonDone : ''}`} aria-pressed={isRead} onClick={toggleLessonRead}><SectionIcon id="infarct" />{t(isRead ? copy.readDone : copy.completeLesson)}</button><button type="button" className={template.continueButton} onClick={nextSection} disabled={activeIndex === lessonSections.length - 1}>{t(copy.continue)} <span aria-hidden="true">→</span></button></div></div>
      {authError && <p className={styles.authError}>{t(copy.auth)} <Link href={withLang('/sign-in')}>{t(copy.signIn)}</Link></p>}
    </header>
    <div className={template.layout}>
      <aside className={template.sidebar}><h2>{t(copy.path)}</h2><nav>{lessonSections.map(section => <button type="button" key={section.id} className={openId === section.id ? template.activeSideItem : ''} onClick={() => selectSection(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${t(copy.openSection)}: ${t(section.title)}`}><span className={template.sideIcon}><SectionIcon id={section.id} /></span><strong>{t(section.title)}</strong></button>)}</nav></aside>
      <article className={template.lesson}>
        {sections.map(section => sectionPanel(section, <><div className={styles.prose}>{section.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph)}</p>)}</div>{section.flow && <div className={styles.contrastFlow} dir="ltr" aria-label="RV to LV to LV myocardium"><span>RV</span><b>→</b><span>LV</span><b>→</b><span>LV myocardium</span></div>}{section.bullets && <ul className={styles.bullets}>{section.bullets.map((bullet, index) => <li key={index}>{t(bullet)}</li>)}</ul>}{section.takeaway && <div className={styles.takeaway}>{t(section.takeaway)}</div>}</>))}
        {sectionPanel(lessonSections[7], <><p className={styles.question}>{t(copy.ruleQuestion)}</p><div className={styles.answers}><div>{t(copy.yes)}</div><div>{t(copy.no)}</div></div><p className={styles.caveat}>{t(copy.caveat)}</p></>)}
        {sectionPanel(lessonSections[8], <div className={styles.references}>{references.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a>)}</div>)}
      </article>
    </div>
    <div className={template.mobileLearningPath}>
      {mobilePathOpen && <section id="mrt-mobile-learning-path" className={template.mobilePathPanel} role="dialog" aria-label={t(copy.path)}><header><div><small>{t(copy.progress)}</small><strong>{readSections.size} / {lessonSections.length}</strong></div><button type="button" onClick={() => setMobilePathOpen(false)} aria-label={t(copy.close)}>×</button></header><nav>{lessonSections.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => selectSection(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><SectionIcon id={section.id} /></span><span><strong>{t(section.title)}</strong><small>{t(section.title)}</small></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section>}
      <button type="button" className={template.mobilePathButton} onClick={() => setMobilePathOpen(value => !value)} aria-expanded={mobilePathOpen} aria-controls="mrt-mobile-learning-path"><span className={template.mobileProgressRing} style={{ '--mobile-progress': `${(readSections.size / lessonSections.length) * 360}deg` }}><b>{readSections.size}</b><small>/{lessonSections.length}</small></span><span className={template.mobileCurrentIcon}><SectionIcon id={activeSection.id} /></span><span className={template.mobilePathLabel}><strong>{t(copy.path)}</strong><small>{t(activeSection.title)}</small></span></button>
    </div>
  </main>
}
