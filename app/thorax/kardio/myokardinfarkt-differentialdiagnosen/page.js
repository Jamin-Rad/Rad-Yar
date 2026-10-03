'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import template from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const ID = 'myokardinfarkt-differentialdiagnosen'
const PATH = '/thorax/kardio/myokardinfarkt-differentialdiagnosen'
const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''

const COPY = {
  title: L('Rolle der Kardio-MRT bei Troponinanstieg', 'Role of cardiac MRI in patients with elevated troponin', 'نقش MRI قلب در بیمار با افزایش تروپونین'),
  thorax: L('Thorax', 'Thorax', 'قفسه سینه'),
  chapter: L('Herz / Kardio-MRT', 'Heart / cardiac MRI', 'قلب / MRI قلب'),
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  open: L('Abschnitt öffnen', 'Open section', 'باز کردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  start: L('Entscheidungsweg starten', 'Start decision pathway', 'شروع مسیر تصمیم‌گیری'),
  synthetic: L('Synthetische Lehrabbildung · kein Patientendatensatz', 'Synthetic teaching image · not a patient dataset', 'تصویر آموزشی ساختگی · بدون دادهٔ بیمار'),
}

const SECTIONS = [
  { id: 'ausgangspunkt', label: L('Vorgehen bei erhöhtem Troponin', 'Approach to elevated troponin', 'رویکرد به افزایش تروپونین') },
  { id: 'lge-muster', label: L('Late Gadolinium Enhancement (LGE)', 'Late gadolinium enhancement (LGE)', 'Late Gadolinium Enhancement (LGE)') },
  { id: 'minoca', label: L('MINOCA', 'MINOCA', 'MINOCA') },
  { id: 'takotsubo', label: L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندروم تاکوتسوبو') },
  { id: 'myokarditis', label: L('Myokarditis', 'Myocarditis', 'میوکاردیت') },
  { id: 'sarkoidose', label: L('Kardiale Sarkoidose', 'Cardiac sarcoidosis', 'سارکوئیدوز قلبی') },
  { id: 'infarkt', label: L('Akuter vs. chronischer Infarkt', 'Acute vs. chronic infarction', 'انفارکت حاد در برابر مزمن') },
  { id: 'algorithmus', label: L('Take Home Message', 'Take-home message', 'پیام نهایی') },
]
const SECTION_IDS = SECTIONS.map(section => section.id)
const SECTION_LABELS = Object.fromEntries(SECTIONS.map(section => [section.id, section.label]))

const ICONS = {
  ausgangspunkt: 'M4 12h4l2-5 4 10 2-5h4 M5 4h14v16H5z',
  'lge-muster': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v10 M7 12h10',
  infarkt: 'M3 12h4l2-6 5 12 3-7h4 M12 3v3 M12 18v3',
  minoca: 'M5 5h14v14H5z M8 9h8 M8 13h5 M8 17h3',
  takotsubo: 'M12 21s-7-4.3-7-10.1C5 7.6 7.2 5 10 5c1.2 0 2 .6 2 1.5C12 5.6 12.8 5 14 5c2.8 0 5 2.6 5 5.9C19 16.7 12 21 12 21z',
  myokarditis: 'M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10 M9 13h6',
  sarkoidose: 'M7 7h.01 M12 4h.01 M17 8h.01 M8 13h.01 M15 15h.01 M12 20h.01',
  algorithmus: 'M6 4h12v4H6z M6 16h12v4H6z M12 8v8 M9 13l3 3 3-3',
  mcq: 'M5 4h14v16H5z M8 8h8 M8 12h5 M8 16h3 M17 15l1 1 2-3',
  flashcards: 'M5 6h12v14H5z M8 3h11v14 M9 10h4 M11 8v4',
  takehome: 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
}

const PATTERNS = [
  {
    id: 'infarct', title: L('Infarkt / MINOCA', 'Infarction / MINOCA', 'انفارکت / MINOCA'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-infarct-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subendokardial bis transmuralem Infarktmuster und dunkler mikrovaskulärer Obstruktion', 'Synthetic short-axis LGE image with subendocardial-to-transmural infarct pattern and dark microvascular obstruction', 'تصویر ساختگی LGE محور کوتاه با الگوی انفارکت ساب‌اندوکاردیال تا ترانس‌مورال و انسداد میکروواسکولار تیره'),
    lge: L('Subendokardial beginnend, je nach Infarkttiefe bis transmural; die Verteilung folgt einem Koronarterritorium.', 'Beginning in the subendocardium and extending to the full wall thickness depending on infarct depth; the distribution follows a coronary territory.', 'از ساب‌اندوکارد آغاز می‌شود و بسته به عمق انفارکت می‌تواند تا تمام ضخامت دیواره گسترش یابد؛ توزیع آن از یک قلمرو کرونری پیروی می‌کند.'),
    points: [
      L('Transmuralität und betroffene Segmente dokumentieren.', 'Document transmural extent and involved segments.', 'وسعت ترانس‌مورال و سگمنت‌های درگیر ثبت شود.'),
      L('T2-Ödem spricht für einen akuten Infarkt; fehlendes Ödem eher für eine chronische Narbe.', 'T2 oedema supports an acute infarction; absent oedema favours a chronic scar.', 'ادم در T2 به نفع انفارکت حاد است؛ نبود ادم بیشتر به نفع اسکار مزمن است.'),
      L('Bei akutem Infarkt gezielt nach MVO, Einblutung und LV-Thrombus suchen.', 'Look for MVO, haemorrhage, and LV thrombus.', 'MVO، خونریزی و ترومبوس LV بررسی شود.'),
    ],
  },
  {
    id: 'takotsubo', title: L('Takotsubo', 'Takotsubo', 'تاکوتسوبو'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg',
    alt: L('Synthetische Cine-Langachsenaufnahme mit apikalem Ballooning bei Takotsubo', 'Synthetic long-axis cine image with apical ballooning in Takotsubo syndrome', 'تصویر ساختگی Cine محور بلند با بالونینگ اپیکال در تاکوتسوبو'),
    lge: L('Typischerweise kein LGE in den dysfunktionellen Segmenten; ein persistierendes infarct- oder myokarditistypisches Muster spricht gegen die klassische Konstellation.', 'Typically there is no LGE in the dysfunctional segments; a persistent infarct- or myocarditis-type pattern argues against classic Takotsubo syndrome.', 'به‌طور معمول در سگمنت‌های دچار اختلال حرکتی LGE وجود ندارد؛ الگوی پایدار تیپیک انفارکت یا میوکاردیت با تاکوتسوبوی کلاسیک سازگار نیست.'),
    points: [
      L('Cine zeigt das Ballooning: apikal, midventrikulär, basal (invers) oder fokal.', 'Cine shows apical, mid-ventricular, basal, or focal ballooning.', 'Cine بالونینگ اپیکال، میانی، بازال یا فوکال را نشان می‌دهد.'),
      L('Die Wandbewegungsstörung reicht meist über ein einzelnes Koronarterritorium hinaus.', 'Wall-motion abnormality usually extends beyond one coronary territory.', 'اختلال حرکت دیواره معمولاً فراتر از یک قلمرو کرونر است.'),
      L('T2-Ödem kann vorliegen; zusätzlich auf LV-/RV-Beteiligung und intrakavitäre Thromben achten.', 'T2 oedema may occur; assess ventricular involvement and thrombi.', 'ادم T2 ممکن است وجود داشته باشد؛ درگیری بطنی و ترومبوس بررسی شود.'),
    ],
  },
  {
    id: 'myocarditis', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-myocarditis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subepikardialem inferolateralem Myokarditismuster', 'Synthetic short-axis LGE image with a subepicardial inferolateral myocarditis pattern', 'تصویر ساختگی LGE محور کوتاه با الگوی ساب‌اپیکاردیال اینفرولاترال میوکاردیت'),
    lge: L('Subepikardial und/oder midmyokardial, häufig inferolateral; keine Bindung an ein Koronarterritorium und typischerweise Aussparung des Subendokards.', 'Subepicardial and/or mid-wall, often inferolateral; it does not conform to a coronary territory and typically spares the subendocardium.', 'ساب‌اپیکاردیال و/یا میدوال، اغلب در بخش اینفرولاترال؛ از قلمرو کرونری پیروی نمی‌کند و معمولاً ساب‌اندوکارد را درگیر نمی‌سازد.'),
    points: [
      L('Lake Louise: mindestens ein T2-basiertes plus ein T1-basiertes Zeichen zusammen bewerten.', 'Combine one T2-based and one T1-based marker.', 'یک معیار T2 و یک معیار T1 با هم ارزیابی شوند.'),
      L('T2-Ödem sowie erhöhte native T1-/ECV-Werte stützen eine aktive Entzündung.', 'T2 oedema and elevated native T1/ECV support active inflammation.', 'ادم T2 و افزایش T1/ECV به نفع التهاب فعال است.'),
      L('Auch auf Perikarderguss und perikardiales Enhancement achten.', 'Also assess pericardial effusion and enhancement.', 'افیوژن و enhancement پریکارد نیز بررسی شود.'),
    ],
  },
  {
    id: 'sarcoidosis', title: L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit multifokal fleckigem nichtischämischem Muster bei kardialer Sarkoidose', 'Synthetic short-axis LGE image with multifocal patchy non-ischaemic pattern in cardiac sarcoidosis', 'تصویر ساختگی LGE محور کوتاه با الگوی چندکانونی لکه‌ای غیرایسکمیک در سارکوئیدوز قلبی'),
    lge: L('Fleckig und multifokal, häufig basal-septal oder lateral sowie midmyokardial/subepikardial; ein einzelnes Koronarterritorium wird nicht eingehalten.', 'Patchy and multifocal, commonly basal-septal or lateral and mid-wall/subepicardial; it does not conform to a single coronary territory.', 'لکه‌ای و چندکانونی، اغلب در بخش بازال‌سپتال یا لترال و به‌صورت میدوال/ساب‌اپیکاردیال؛ از یک قلمرو کرونری منفرد پیروی نمی‌کند.'),
    points: [
      L('Mehrere räumlich getrennte Herde und eine mögliche RV-Beteiligung erfassen.', 'Assess separate foci and possible RV involvement.', 'کانون‌های جدا و درگیری احتمالی RV بررسی شود.'),
      L('LGE zeigt vor allem Narbe; FDG-PET ergänzt bei der Frage nach aktiver Entzündung.', 'LGE depicts scar; FDG-PET complements assessment of activity.', 'LGE بیشتر اسکار را نشان می‌دهد؛ PET برای فعالیت کمک‌کننده است.'),
      L('Das Muster ist nicht pathognomonisch und muss klinisch eingeordnet werden.', 'The pattern is not pathognomonic and must be interpreted in the clinical context.', 'این الگو پاتوگنومونیک نیست و باید در زمینهٔ بالینی تفسیر شود.'),
    ],
  },
]

const TROPONIN_DIFFERENTIALS = [
  { id: 'mi', title: L('Akuter Myokardinfarkt / MINOCA', 'Acute myocardial infarction / MINOCA', 'انفارکت حاد میوکارد / MINOCA'), description: L('Ischämische Myokardschädigung mit Troponindynamik. MINOCA ist keine Enddiagnose, sondern ein vorläufiger Sammelbegriff, bis die zugrunde liegende Ursache geklärt ist.', 'Ischaemic myocardial injury with a rise and/or fall in troponin. MINOCA is not a final diagnosis but a working diagnosis until the underlying cause is established.', 'آسیب ایسکمیک میوکارد با افزایش و/یا کاهش تروپونین همراه است. MINOCA تشخیص نهایی نیست، بلکه تا زمان مشخص شدن علت زمینه‌ای یک تشخیص اولیه محسوب می‌شود.') },
  { id: 'myocarditis', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'), description: L('Entzündliche Myokardschädigung mit Ödem und nichtischämischem LGE-Muster; Perikarderguss oder perikardiales LGE können die Diagnose unterstützen.', 'Inflammatory myocardial injury with oedema and a non-ischaemic LGE pattern; pericardial effusion or pericardial enhancement may support the diagnosis.', 'آسیب التهابی میوکارد با ادم و الگوی LGE غیرایسکمیک؛ افیوژن پریکارد یا enhancement پریکارد می‌تواند تشخیص را تقویت کند.') },
  { id: 'takotsubo', title: L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندروم تاکوتسوبو'), description: L('Vorübergehende regionale LV-Dysfunktion mit apikalem, midventrikulärem, basalem (inversem) oder fokalem Ballooning; typischerweise kein LGE.', 'Transient regional LV dysfunction with apical, mid-ventricular, basal (inverted), or focal ballooning; LGE is typically absent.', 'اختلال گذرای موضعی عملکرد بطن چپ با بالونینگ اپیکال، میدونتریکولار، بازال (معکوس) یا فوکال؛ معمولاً LGE وجود ندارد.') },
  { id: 'pe', title: L('Lungenarterienembolie', 'Pulmonary embolism', 'آمبولی ریه'), description: L('Akute Rechtsherzbelastung und Hypoxämie können eine sekundäre Myokardschädigung mit Troponinfreisetzung verursachen.', 'Acute right-heart strain and hypoxaemia can cause secondary myocardial injury with troponin release.', 'فشار حاد بر قلب راست و هیپوکسمی می‌توانند باعث آسیب ثانویهٔ میوکارد و آزاد شدن تروپونین شوند.') },
  { id: 'tachy', title: L('Tachyarrhythmie', 'Tachyarrhythmia', 'تاکی‌آریتمی'), description: L('Hohe Herzfrequenz erhöht den Sauerstoffbedarf und kann ein Missverhältnis von Angebot und Bedarf auslösen.', 'A high heart rate increases oxygen demand and may produce a supply–demand mismatch.', 'ضربان بالای قلب نیاز به اکسیژن را افزایش می‌دهد و می‌تواند باعث عدم تعادل میان عرضه و تقاضای اکسیژن شود.') },
  { id: 'heart-failure', title: L('Akute Herzinsuffizienz', 'Acute heart failure', 'نارسایی حاد قلبی'), description: L('Wandstress, erhöhte Füllungsdrücke und Minderperfusion können Troponin ohne akuten Typ-1-Infarkt erhöhen.', 'Wall stress, elevated filling pressures, and hypoperfusion can raise troponin without an acute type 1 myocardial infarction.', 'استرس دیواره، افزایش فشارهای پرشدگی و کاهش پرفیوژن می‌توانند بدون انفارکت حاد نوع ۱ باعث افزایش تروپونین شوند.') },
  { id: 'aorta', title: L('Aortenstenose / -dissektion', 'Aortic stenosis / dissection', 'تنگی / دیسکسیون آئورت'), description: L('Druckbelastung oder akute Koronarmalperfusion kann eine relevante Myokardschädigung hervorrufen.', 'Pressure overload or acute coronary malperfusion may cause clinically relevant myocardial injury.', 'اضافه‌بار فشاری یا اختلال حاد پرفیوژن کرونر می‌تواند آسیب قابل‌توجه میوکارد ایجاد کند.') },
  { id: 'sarcoid-op', title: L('Kardiale Sarkoidose / Herz-OP', 'Cardiac sarcoidosis / cardiac surgery', 'سارکوئیدوز قلبی / جراحی قلب'), description: L('Granulomatöse Entzündung beziehungsweise perioperative Myokardschädigung kann Troponin freisetzen.', 'Granulomatous inflammation or perioperative myocardial injury may release troponin.', 'التهاب گرانولوماتوز یا آسیب میوکارد در حوالی جراحی می‌تواند موجب آزاد شدن تروپونین شود.') },
]

const REFERENCES = [
  ['ESC 2023 Acute Coronary Syndromes Guideline', 'https://academic.oup.com/eurheartj/article/44/38/3720/7243210'],
  ['ESC 2025 Myocarditis and Pericarditis Guideline', 'https://academic.oup.com/eurheartj/article/46/40/3952/8234483'],
  ['ESC 2024 Chronic Coronary Syndromes Guideline', 'https://academic.oup.com/eurheartj/article/45/36/3415/7743115'],
  ['SCMR Standardized CMR Protocols · 2020 Update', 'https://scmr.org/news/standardized-cardiovascular-magnetic-resonance-imaging-cmr-protocols-2020-update/'],
  ['2018 Updated Lake Louise Criteria · JACC Expert Panel', 'https://pubmed.ncbi.nlm.nih.gov/30545455/'],
  ['International Expert Consensus on Takotsubo Syndrome', 'https://academic.oup.com/eurheartj/article/39/22/2047/5025411'],
  ['AHA Scientific Statement: Diagnosis and Management of Cardiac Sarcoidosis', 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001240'],
  ['AHA Standardized Myocardial Segmentation and Nomenclature', 'https://www.ahajournals.org/doi/10.1161/hc0402.102975'],
  ['Radiopaedia case 33052 · Takotsubo cardiomyopathy', 'https://radiopaedia.org/cases/33052'],
  ['Radiopaedia case 77023 · Acute myocarditis', 'https://radiopaedia.org/cases/77023'],
  ['Radiopaedia case 74548 · Cardiac sarcoidosis', 'https://radiopaedia.org/cases/74548'],
]

const RADIOPAEDIA_CASES = {
  takotsubo: {
    title: L('Radiopaedia-Fall: atypisches Takotsubo-Syndrom', 'Radiopaedia case: atypical Takotsubo syndrome', 'کیس Radiopaedia: تاکوتسوبوی آتیپیک'),
    patient: L('55-jährige Frau', '55-year-old woman', 'خانم ۵۵ ساله'),
    presentation: L('Im Echo Verdacht auf Ventrikelaneurysma beziehungsweise gedeckte Ruptur.', 'Echocardiography raised concern for a ventricular aneurysm or contained rupture.', 'در اکوکاردیوگرافی شک به آنوریسم بطنی یا پارگی مهارشده مطرح شد.'),
    findings: [
      L('Cine: dyskinetische mittlere Vorderwand mit systolischer Auswärtsbewegung.', 'Cine: dyskinetic mid-anterior wall with systolic outward bulging.', 'Cine: دیسکینزی دیواره قدامی میانی همراه با برجسته‌شدن سیستولی به خارج.'),
      L('STIR: korrespondierendes Ödem; kein Thrombus und kein myokardiales LGE.', 'STIR: matching oedema; no thrombus and no myocardial LGE.', 'STIR: ادم متناظر؛ بدون ترومبوس و بدون LGE میوکارد.'),
      L('Verlauf: Wandbewegungsstörung und Perikarderguss nach vier Wochen rückläufig.', 'Follow-up: wall-motion abnormality and pericardial effusion resolved after four weeks.', 'پیگیری: اختلال حرکت دیواره و افیوژن پریکارد پس از چهار هفته برطرف شدند.'),
    ],
    teaching: L('Transiente Dysfunktion außerhalb eines Koronarterritoriums + Ödem + fehlendes LGE stützen Takotsubo.', 'Transient dysfunction beyond one coronary territory + oedema + absent LGE support Takotsubo.', 'اختلال گذرا فراتر از یک قلمرو کرونری همراه با ادم و نبود LGE از تاکوتسوبو حمایت می‌کند.'),
    frames: [
      ['01-2ch-cine.jpg', '2-chamber Cine SSFP'],
      ['02-short-axis-cine.jpg', 'Short-axis Cine SSFP'],
      ['03-2ch-stir.jpg', '2-chamber STIR'],
      ['04-2ch-early-gad.jpg', '2-chamber Early Gadolinium'],
      ['05-short-axis-early-gad.jpg', 'Short-axis Early Gadolinium'],
      ['06-2ch-lge.jpg', '2-chamber LGE'],
      ['07-short-axis-lge.jpg', 'Short-axis LGE'],
    ].map(([file, label]) => ({ src: `/thorax/kardio/myokardinfarkt-differentialdiagnosen/radiopaedia/takotsubo-33052/${file}`, label })),
    alt: L('Zweikammer-Cine-SSFP aus einem Radiopaedia-Fall mit atypischem Takotsubo-Syndrom', 'Two-chamber cine SSFP from a Radiopaedia case of atypical Takotsubo syndrome', 'Cine SSFP دوحفره‌ای از کیس Radiopaedia تاکوتسوبوی آتیپیک'),
    url: 'https://radiopaedia.org/cases/33052/studies/34073?lang=us',
    credit: 'Case courtesy of Yune Kwong, Radiopaedia.org · rID-33052 · CC BY-NC-SA 3.0',
  },
  myocarditis: {
    title: L('Radiopaedia-Fall: akute Myoperikarditis', 'Radiopaedia case: acute myopericarditis', 'کیس Radiopaedia: میوپریکاردیت حاد'),
    patient: L('30-jähriger Mann', '30-year-old man', 'آقای ۳۰ ساله'),
    presentation: L('Thoraxschmerz nach akuter Gastroenteritis, diffuse ST-Hebungen und deutlich erhöhtes Troponin.', 'Chest pain after acute gastroenteritis, diffuse ST elevation, and markedly elevated troponin.', 'درد قفسه سینه پس از گاستروانتریت حاد، بالا رفتن منتشر ST و افزایش واضح تروپونین.'),
    findings: [
      L('T2/STIR: Ödem der lateralen LV-Wand.', 'T2/STIR: oedema of the lateral LV wall.', 'T2/STIR: ادم دیواره لترال بطن چپ.'),
      L('LGE: fleckig midmyokardial und subepikardial, am stärksten inferolateral.', 'LGE: patchy mid-wall and subepicardial enhancement, most pronounced inferolaterally.', 'LGE: الگوی لکه‌ای میدوال و ساب‌اپیکاردیال، با بیشترین شدت در اینفرولاترال.'),
      L('Kleiner Erguss und perikardiales Enhancement stützen die Myoperikarditis.', 'A small effusion and pericardial enhancement support myopericarditis.', 'افیوژن کوچک و enhancement پریکارد از میوپریکاردیت حمایت می‌کنند.'),
    ],
    teaching: L('Ein T2-basiertes und ein T1-basiertes Zeichen gemeinsam bewerten.', 'Assess a T2-based and a T1-based marker together.', 'یک معیار مبتنی بر T2 و یک معیار مبتنی بر T1 را با هم ارزیابی کنید.'),
    frames: [
      ['01-4ch-cine.jpeg', '4-chamber SSFP Cine'],
      ['02-4ch-stir.jpeg', '4-chamber STIR'],
      ['03-short-axis-stir.jpeg', 'Short-axis STIR'],
      ['04-4ch-lge.jpeg', '4-chamber LGE'],
      ['05-short-axis-lge.jpeg', 'Short-axis LGE'],
      ['06-3ch-lge.jpeg', '3-chamber LGE'],
    ].map(([file, label]) => ({ src: `/thorax/kardio/myokardinfarkt-differentialdiagnosen/radiopaedia/myocarditis-77023/${file}`, label })),
    alt: L('Vierkammer-LGE aus einem Radiopaedia-Fall mit akuter Myoperikarditis', 'Four-chamber LGE from a Radiopaedia case of acute myopericarditis', 'LGE چهارحفره‌ای از کیس Radiopaedia میوپریکاردیت حاد'),
    url: 'https://radiopaedia.org/cases/77023/studies/88967?lang=us',
    credit: 'Case courtesy of Tamara Razon Cuenza, Radiopaedia.org · rID-77023 · CC BY-NC-SA 3.0',
  },
  sarcoidosis: {
    title: L('Radiopaedia-Fall: kardiale Sarkoidose', 'Radiopaedia case: cardiac sarcoidosis', 'کیس Radiopaedia: سارکوئیدوز قلبی'),
    patient: L('50-jährige Frau', '50-year-old woman', 'خانم ۵۰ ساله'),
    presentation: L('Bekannte Sarkoidose, ventrikuläre Extrasystolen und vorausgegangene Endomyokardbiopsie.', 'Known sarcoidosis, ventricular extrasystoles, and previous endomyocardial biopsy.', 'سارکوئیدوز شناخته‌شده، اکستراسیستول بطنی و سابقه بیوپسی اندومیوکارد.'),
    findings: [
      L('LGE: fleckig intramyokardial und subepikardial in inferioren midventrikulären/apikalen Segmenten.', 'LGE: patchy intramyocardial and subepicardial enhancement in inferior mid-ventricular/apical segments.', 'LGE: الگوی لکه‌ای داخل‌میوکاردی و ساب‌اپیکاردیال در سگمنت‌های اینفریور میدونتریکولار و اپیکال.'),
      L('Aktuell kein Ödem; natives T1, T2 und ECV innerhalb der lokalen Referenzbereiche.', 'No current oedema; native T1, T2, and ECV were within local reference ranges.', 'در حال حاضر ادم وجود نداشت و native T1، T2 و ECV در محدوده مرجع محلی بودند.'),
      L('Die Biopsie zeigte eine granulomatöse Entzündung und bestätigte die Diagnose.', 'Biopsy showed granulomatous inflammation and established the diagnosis.', 'بیوپسی التهاب گرانولوماتوز را نشان داد و تشخیص را تأیید کرد.'),
    ],
    teaching: L('LGE kann als Narbe fortbestehen, obwohl die aktuelle Entzündungsaktivität abgeklungen ist.', 'LGE may persist as scar after current inflammatory activity has resolved.', 'LGE می‌تواند به‌صورت اسکار باقی بماند، حتی وقتی فعالیت التهابی فعلی فروکش کرده است.'),
    frames: [
      ['01-2ch-cine.jpg', '2-chamber Cine SSFP'],
      ['02-4ch-cine.jpg', '4-chamber Cine SSFP'],
      ['03-3ch-cine.jpg', '3-chamber Cine SSFP'],
      ['04-short-axis-stir.jpg', 'Short-axis STIR'],
      ['05-t2-map.jpeg', 'Short-axis T2 mapping'],
      ['06-native-t1-map.jpeg', 'Short-axis native T1 mapping'],
      ['07-2ch-lge.jpg', '2-chamber IR-LGE'],
      ['08-short-axis-lge.jpg', 'Short-axis IR-LGE'],
    ].map(([file, label]) => ({ src: `/thorax/kardio/myokardinfarkt-differentialdiagnosen/radiopaedia/sarcoidosis-74548/${file}`, label })),
    alt: L('Zweikammer-LGE aus einem Radiopaedia-Fall mit kardialer Sarkoidose', 'Two-chamber LGE from a Radiopaedia case of cardiac sarcoidosis', 'LGE دوحفره‌ای از کیس Radiopaedia سارکوئیدوز قلبی'),
    url: 'https://radiopaedia.org/cases/74548/studies/85535?lang=us',
    credit: 'Case courtesy of Joachim Feger, Radiopaedia.org · rID-74548 · CC BY-NC-SA 3.0',
  },
}

const LessonContext = createContext(null)

function SectionIcon({ id }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[id] || ICONS['lge-muster']} /></svg>
}

function Section({ id, title, children }) {
  const context = useContext(LessonContext)
  const open = context.openId === id
  const isRead = context.readSections.has(id)
  return <section id={id} className={`${template.section} ${open ? template.sectionOpen : ''} ${styles.section}`}>
    <button type="button" className={`${template.sectionHeader} ${styles.sectionHeader}`} onClick={() => context.selectSection(id)} aria-expanded={open} aria-controls={`${id}-panel`}>
      <span className={template.sectionIcon}><SectionIcon id={id} /></span>
      <span><strong>{title}</strong></span>
      <span className={template.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id={`${id}-panel`} hidden={!open} className={`${template.sectionBody} ${styles.sectionBody}`}>
      {children}
      <button type="button" className={`${template.readButton} ${styles.sectionReadButton} ${isRead ? template.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => context.toggleSectionRead(id)}><SectionIcon id="takehome" />{pick(isRead ? COPY.completed : COPY.complete, context.lang)}</button>
    </div>
  </section>
}

function PatternExplorer({ lang }) {
  const [selectedId, setSelectedId] = useState('infarct')
  const selected = PATTERNS.find(pattern => pattern.id === selectedId) || PATTERNS[0]
  return <section className={styles.patternExplorer} aria-labelledby="pattern-title">
    <header><h3 id="pattern-title">{pick(L('Differenzialdiagnosen im LGE', 'Differential diagnoses on LGE', 'تشخیص‌های افتراقی در LGE'), lang)}</h3></header>
    <div className={styles.patternTabs} role="tablist" aria-label={pick(L('Diagnose auswählen', 'Select diagnosis', 'انتخاب تشخیص'), lang)}>{PATTERNS.map(pattern => <button key={pattern.id} type="button" role="tab" aria-selected={selectedId === pattern.id} className={selectedId === pattern.id ? styles.patternTabActive : ''} onClick={() => setSelectedId(pattern.id)}><strong>{pick(pattern.title, lang)}</strong></button>)}</div>
    <article className={styles.patternPanel} role="tabpanel">
      <figure><Image src={selected.image} alt={pick(selected.alt, lang)} width={1254} height={1254} priority={selected.id === 'infarct'} /><figcaption>{pick(COPY.synthetic, lang)}</figcaption></figure>
      <div><h4>{pick(selected.title, lang)}</h4><div className={styles.patternInfo}><section><h5>{pick(L('LGE-Charakteristik', 'LGE characteristics', 'ویژگی‌های LGE'), lang)}</h5><p>{pick(selected.lge, lang)}</p></section><section><h5>{pick(L('Wichtige Punkte', 'Important points', 'نکات مهم'), lang)}</h5><ul>{selected.points.map(point => <li key={pick(point, lang)}>{pick(point, lang)}</li>)}</ul></section></div></div>
    </article>
  </section>
}

function RadiopaediaCase({ caseId, lang }) {
  const data = RADIOPAEDIA_CASES[caseId]
  const t = value => pick(value, lang)
  const [frameIndex, setFrameIndex] = useState(0)
  const viewerRef = useRef(null)
  const wheelLock = useRef(false)
  const pointerStart = useRef(null)

  const selectFrame = next => setFrameIndex(current => Math.max(0, Math.min(data.frames.length - 1, typeof next === 'function' ? next(current) : next)))
  const moveFrame = direction => selectFrame(current => current + direction)
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return undefined
    const handleWheel = event => {
      if (wheelLock.current || Math.abs(event.deltaY) < 8) return
      const direction = event.deltaY > 0 ? 1 : -1
      const canMove = direction > 0 ? frameIndex < data.frames.length - 1 : frameIndex > 0
      if (!canMove) return
      event.preventDefault()
      wheelLock.current = true
      moveFrame(direction)
      window.setTimeout(() => { wheelLock.current = false }, 160)
    }
    viewer.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewer.removeEventListener('wheel', handleWheel)
  }, [frameIndex, data.frames.length])
  const onKeyDown = event => {
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) { event.preventDefault(); moveFrame(1) }
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); moveFrame(-1) }
  }
  const frame = data.frames[frameIndex]

  return <article className={styles.radiopaediaCase} aria-labelledby={`${caseId}-case-title`}>
    <div ref={viewerRef} className={styles.caseViewer} role="group" aria-label={t(L('Scrollbarer Radiopaedia-Fall', 'Scrollable Radiopaedia case', 'کیس قابل اسکرول Radiopaedia'))} tabIndex={0} onKeyDown={onKeyDown} onPointerDown={event => { pointerStart.current = { x: event.clientX, y: event.clientY } }} onPointerUp={event => { if (!pointerStart.current) return; const deltaX = pointerStart.current.x - event.clientX; const deltaY = pointerStart.current.y - event.clientY; pointerStart.current = null; if (Math.abs(deltaX) > 34 && Math.abs(deltaX) > Math.abs(deltaY)) moveFrame(deltaX > 0 ? 1 : -1) }} data-testid={`${caseId}-case-viewer`}>
      <div className={styles.caseImageStage}>
        <Image key={frame.src} src={frame.src} alt={`${t(data.alt)} · ${frame.label}`} width={760} height={640} draggable={false} />
        <span className={styles.caseFrameLabel}>{frame.label}</span>
        <span className={styles.caseFrameCounter}>{String(frameIndex + 1).padStart(2, '0')} / {String(data.frames.length).padStart(2, '0')}</span>
      </div>
      <div className={styles.caseViewerControls}>
        <button type="button" onClick={() => moveFrame(-1)} disabled={frameIndex === 0} aria-label={t(L('Vorheriges Bild', 'Previous image', 'تصویر قبلی'))}>←</button>
        <div className={styles.caseFrameDots} aria-label={t(L('Bild auswählen', 'Select image', 'انتخاب تصویر'))}>{data.frames.map((item, index) => <button key={item.src} type="button" className={index === frameIndex ? styles.caseFrameDotActive : ''} onClick={() => selectFrame(index)} aria-label={`${t(L('Bild', 'Image', 'تصویر'))} ${index + 1}: ${item.label}`} aria-current={index === frameIndex ? 'true' : undefined} />)}</div>
        <button type="button" onClick={() => moveFrame(1)} disabled={frameIndex === data.frames.length - 1} aria-label={t(L('Nächstes Bild', 'Next image', 'تصویر بعدی'))}>→</button>
      </div>
      <p className={styles.caseViewerHint}>{t(L('Scrollen · Wischen · Pfeiltasten', 'Scroll · swipe · arrow keys', 'اسکرول · سوایپ · کلیدهای جهت'))}</p>
    </div>
    <div className={styles.caseContent}>
      <header><small>RADIOPAEDIA CASE</small><h3 id={`${caseId}-case-title`}>{t(data.title)}</h3><strong>{t(data.patient)}</strong><p>{t(data.presentation)}</p></header>
      <ul>{data.findings.map(finding => <li key={t(finding)}>{t(finding)}</li>)}</ul>
      <aside><b>{t(L('Lehrpunkt', 'Teaching point', 'نکته آموزشی'))}</b><p>{t(data.teaching)}</p></aside>
      <a className={styles.caseSourceLink} href={data.url} target="_blank" rel="noopener noreferrer">{t(L('Originalfall in Radiopaedia öffnen', 'Open the original Radiopaedia case', 'باز کردن کیس اصلی در Radiopaedia'))}<span aria-hidden="true">↗</span></a>
      <p className={styles.caseCredit}>{data.credit}</p>
    </div>
  </article>
}

function LgeBasics({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.lgeBasics}>
    <article><span>01</span><div><h3>{t(L('Wie entsteht das Bild?', 'How is the image created?', 'تصویر چگونه ایجاد می‌شود؟'))}</h3><p>{t(L('Etwa 10–15 Minuten nach Gadolinium wird eine T1-gewichtete Inversion-Recovery-Sequenz aufgenommen. Die Inversionszeit wird so gewählt, dass normales Myokard dunkel erscheint.', 'A T1-weighted inversion-recovery sequence is acquired about 10–15 minutes after gadolinium administration. The inversion time is selected to null normal myocardium so that it appears dark.', 'حدود ۱۰ تا ۱۵ دقیقه پس از تزریق گادولینیوم، یک سکانس T1-weighted inversion-recovery گرفته می‌شود. زمان inversion به‌گونه‌ای انتخاب می‌شود که میوکارد طبیعی null شده و تیره دیده شود.'))}</p></div></article>
    <article><span>02</span><div><h3>{t(L('Warum wird geschädigtes Myokard hell?', 'Why does injured myocardium become bright?', 'چرا میوکارد آسیب‌دیده روشن می‌شود؟'))}</h3><p>{t(L('Bei Nekrose oder Fibrose ist der Extrazellulärraum vergrößert: Gadolinium reichert sich stärker an und wird gegenüber dem genullten, dunklen Normalmyokard hell. Entscheidend sind danach Wandschicht und Verteilung.', 'Necrosis or fibrosis expands the extracellular space, allowing more gadolinium to accumulate. The injured tissue therefore appears bright against nulled, dark normal myocardium. The involved wall layer and distribution then determine the interpretation.', 'در نکروز یا فیبروز، فضای خارج‌سلولی افزایش می‌یابد و گادولینیوم بیشتری تجمع پیدا می‌کند؛ بنابراین بافت آسیب‌دیده در برابر میوکارد طبیعیِ null‌شده و تیره، روشن دیده می‌شود. سپس لایهٔ درگیر دیواره و نحوهٔ توزیع برای تفسیر تعیین‌کننده‌اند.'))}</p></div></article>
  </div>
}

function LayerDiagram({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.layerDiagram} aria-label={t(L('Schema der ischämischen und nichtischämischen LGE-Verteilung', 'Diagram of ischaemic and non-ischaemic LGE distribution', 'نمودار توزیع LGE ایسکمیک و غیرایسکمیک'))}>
    <article><h4>{t(L('Ischämisches LGE', 'Ischaemic LGE', 'LGE ایسکمیک'))}</h4><div className={`${styles.wallRing} ${styles.subendo}`}><i /></div><dl><div><dt>{t(L('1 · Wandschicht', '1 · Wall layer', '۱ · لایه دیواره'))}</dt><dd>{t(L('Das LGE beginnt immer subendokardial und kann sich je nach Infarkttiefe bis transmural ausbreiten.', 'LGE always begins in the subendocardium and may extend transmurally depending on infarct depth.', 'LGE همیشه از ساب‌اندوکارد آغاز می‌شود و بسته به عمق انفارکت می‌تواند تا تمام ضخامت دیواره گسترش یابد.'))}</dd></div><div><dt>{t(L('2 · Verteilung', '2 · Distribution', '۲ · توزیع'))}</dt><dd>{t(L('Die Ausdehnung folgt einem Koronarterritorium.', 'The extent follows a coronary territory.', 'گسترهٔ درگیری از یک قلمرو کرونری پیروی می‌کند.'))}</dd></div></dl></article>
    <span aria-hidden="true">≠</span>
    <article><h4>{t(L('Nichtischämisches LGE', 'Non-ischaemic LGE', 'LGE غیرایسکمیک'))}</h4><div className={`${styles.wallRing} ${styles.midwall}`}><i /></div><dl><div><dt>{t(L('1 · Wandschicht', '1 · Wall layer', '۱ · لایه دیواره'))}</dt><dd>{t(L('Midmyokardial oder subepikardial: Das helle Areal berührt die innere, direkt an das LV-Blut angrenzende Myokardschicht typischerweise nicht.', 'Mid-wall or subepicardial: the bright area typically does not reach the inner myocardial layer directly adjacent to the LV blood pool.', 'میدوال یا ساب‌اپیکاردیال: ناحیهٔ روشن معمولاً به داخلی‌ترین لایهٔ میوکارد که مستقیماً در مجاورت خون بطن چپ است، نمی‌رسد.'))}</dd></div><div><dt>{t(L('2 · Verteilung', '2 · Distribution', '۲ · توزیع'))}</dt><dd>{t(L('Die Herde folgen keinem einzelnen Koronarterritorium und können fleckig oder multifokal sein.', 'The foci do not follow a single coronary territory and may be patchy or multifocal.', 'کانون‌ها از یک قلمرو کرونری منفرد پیروی نمی‌کنند و می‌توانند لکه‌ای یا چندکانونی باشند.'))}</dd></div></dl></article>
  </div>
}

const TROPONIN_GRAPHICS = {
  de: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-de.png',
    title: 'Entscheidungsweg bei Thoraxschmerz und Troponinanstieg',
    alt: 'Entscheidungsweg bei Thoraxschmerz und Troponinanstieg: Herzkatheterlabor bei ST-Hebung, hämodynamischer Instabilität, sehr hohem Ausgangswert oder signifikanter Troponindynamik; CMR bei fehlender obstruktiver KHK oder weiterhin unklarer Ursache.',
  },
  en: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-en.png',
    title: 'Decision pathway for chest pain and elevated troponin',
    alt: 'Decision pathway for chest pain and elevated troponin: cardiac catheterization lab for ST elevation, haemodynamic instability, a very high baseline value, or a significant troponin change; CMR when there is no obstructive CAD or the patient is clinically stable but the cause remains unclear.',
  },
  fa: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-fa.png',
    title: 'مسیر تصمیم‌گیری در درد قفسه سینه و افزایش تروپونین',
    alt: 'مسیر تصمیم‌گیری در درد قفسه سینه و افزایش تروپونین: ارجاع به Cardiac catheterization lab در بالا رفتن قطعه ST، ناپایداری همودینامیک، مقدار اولیه بسیار بالا یا تغییر معنی‌دار تروپونین؛ انجام CMR در نبود بیماری انسدادی عروق کرونر یا باقی ماندن علت نامشخص در بیمار پایدار.',
  },
}

function TroponinFlowchart({ lang }) {
  const graphic = TROPONIN_GRAPHICS[lang] || TROPONIN_GRAPHICS.de
  return <figure className={styles.troponinGraphic} aria-labelledby="troponin-flow-title">
    <h3 id="troponin-flow-title" className={styles.srOnly}>{graphic.title}</h3>
    <Image src={graphic.src} alt={graphic.alt} width={1205} height={1306} priority unoptimized />
  </figure>
}

function TroponinDifferentials({ lang }) {
  const t = value => pick(value, lang)
  const [selectedId, setSelectedId] = useState(TROPONIN_DIFFERENTIALS[0].id)
  const selected = TROPONIN_DIFFERENTIALS.find(item => item.id === selectedId) || TROPONIN_DIFFERENTIALS[0]
  return <section className={styles.troponinDifferentials} aria-labelledby="troponin-dd-title">
    <header><h3 id="troponin-dd-title">{t(L('Differenzialdiagnosen des Troponinanstiegs', 'Differential diagnoses of troponin elevation', 'تشخیص‌های افتراقی افزایش تروپونین'))}</h3></header>
    <div className={styles.differentialTabs} role="tablist" aria-label={t(L('Differenzialdiagnose auswählen', 'Select differential diagnosis', 'انتخاب تشخیص افتراقی'))}>{TROPONIN_DIFFERENTIALS.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={selectedId === item.id} className={selectedId === item.id ? styles.differentialTabActive : ''} onMouseEnter={() => setSelectedId(item.id)} onFocus={() => setSelectedId(item.id)} onClick={() => setSelectedId(item.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.title)}</strong></button>)}</div>
    <article className={styles.differentialDetail} role="tabpanel" aria-live="polite"><small>{t(L('Warum steigt Troponin?', 'Why does troponin rise?', 'چرا تروپونین افزایش می‌یابد؟'))}</small><strong>{t(selected.title)}</strong><p>{t(selected.description)}</p></article>
    <aside className={styles.troponinRemember}><strong>{t(L('Merke', 'Remember', 'نکته'))}</strong><p>{t(L('Je höher der Ausgangswert und je deutlicher die Dynamik, desto wahrscheinlicher ist im passenden ischämischen Kontext ein akuter Myokardinfarkt.', 'The higher the initial value and the clearer the kinetics, the more likely acute myocardial infarction becomes in the appropriate ischaemic context.', 'هرچه مقدار اولیه بالاتر و تغییرات سریال واضح‌تر باشد، در زمینه بالینی ایسکمیک احتمال انفارکت حاد بیشتر می‌شود.'))} <b>{t(L('Die Höhe allein beweist keine KHK. Auch nichtkoronare Ursachen können starke Anstiege verursachen.', 'Magnitude alone does not prove CAD. Non-coronary causes can also cause marked elevations.', 'شدت افزایش به‌تنهایی بیماری عروق کرونر را ثابت نمی‌کند و علل غیرکرونری نیز می‌توانند افزایش شدید ایجاد کنند.'))}</b></p></aside>
  </section>
}

function TroponinApproach({ lang }) {
  return <div className={styles.troponinSection}>
    <TroponinFlowchart lang={lang} />
    <TroponinDifferentials lang={lang} />
  </div>
}

function DecisionTree({ lang }) {
  const [answer, setAnswer] = useState('infarct')
  const result = {
    infarct: L('Infarkttypisches LGE + Ödem + regionale Dyskinesie → akuter MI; bei nichtobstruktiven Koronarien an MINOCA denken.', 'Infarct-pattern LGE + oedema + regional dyskinesia → acute MI; with non-obstructive coronaries consider MINOCA.', 'LGE انفارکتی + ادم + دیسکینزی موضعی ← MI حاد؛ با کرونر غیرانسدادی به MINOCA فکر کنید.'),
    none: L('Typischerweise kein LGE + charakteristisches Ballooning über ein einzelnes Koronarterritorium hinaus → Takotsubo wahrscheinlich.', 'Typically no LGE plus characteristic ballooning extending beyond a single coronary territory → Takotsubo is likely.', 'نبود تیپیک LGE همراه با بالونینگ مشخص که از یک قلمرو کرونری فراتر می‌رود ← تاکوتسوبو محتمل است.'),
    nonischemic: L('Nichtinfarkttypisches LGE + Ödem → entzündliche Myokardschädigung; Verteilung auf Myokarditis oder Sarkoidose prüfen.', 'Non-infarct LGE + oedema → inflammatory myocardial injury; use distribution to distinguish myocarditis from sarcoidosis.', 'LGE غیرانفارکتی + ادم ← آسیب التهابی میوکارد؛ توزیع برای افتراق میوکاردیت از سارکوئیدوز بررسی شود.'),
  }[answer]
  return <div className={styles.decisionTool}>
    <header><small>{pick(L('1 · Muster erkennen', '1 · Recognise the pattern', '۱ · تشخیص الگو'), lang)}</small><h3>{pick(L('Wie ist das Late Enhancement verteilt?', 'How is late enhancement distributed?', 'توزیع Late Enhancement چگونه است؟'), lang)}</h3><p>{pick(L('Die Wandschicht und die Verteilung des LGE geben die Richtung vor.', 'The wall layer and distribution of LGE determine the direction.', 'لایه دیواره و توزیع LGE مسیر را مشخص می‌کند.'), lang)}</p></header>
    <div className={styles.decisionOptions}>{[
      ['infarct', L('Infarkt-Typ', 'Infarct pattern', 'الگوی انفارکتی')],
      ['none', L('Kein LGE', 'No typical LGE', 'بدون LGE تیپیک')],
      ['nonischemic', L('Nicht-Infarkt-Typ', 'Non-infarct pattern', 'الگوی غیرانفارکتی')],
    ].map(([id, label]) => <button key={id} type="button" className={answer === id ? styles.decisionActive : ''} aria-pressed={answer === id} onClick={() => setAnswer(id)}>{pick(label, lang)}</button>)}</div>
    <div className={styles.decisionResult} aria-live="polite"><span><SectionIcon id="algorithmus" /></span><p>{pick(result, lang)}</p></div>
  </div>
}

function LessonContent({ lang }) {
  const t = value => pick(value, lang)
  return <>
    <Section id="ausgangspunkt" title={t(SECTION_LABELS.ausgangspunkt)}>
      <TroponinApproach lang={lang} />
    </Section>

    <Section id="lge-muster" title={t(SECTION_LABELS['lge-muster'])}>
      <LgeBasics lang={lang} />
      <LayerDiagram lang={lang} />
      <PatternExplorer lang={lang} />
    </Section>

    <Section id="minoca" title={t(SECTION_LABELS.minoca)}>
      <div className={styles.minocaDefinition}>
        <small>MINOCA</small>
        <h3>{t(L('Myokardinfarkt mit nichtobstruktiven Koronararterien', 'Myocardial infarction with non-obstructive coronary arteries', 'انفارکت میوکارد با عروق کرونر غیرانسدادی'))}</h3>
        <p>{t(L('MINOCA setzt einen echten akuten Myokardinfarkt voraus: klinische Evidenz einer akuten Ischämie mit Troponinanstieg/-abfall, aber in der Koronarangiographie keine Stenose ≥ 50 % in einem großen epikardialen Gefäß. „Nichtobstruktiv“ bedeutet nicht „keine Atherosklerose“ – auch eine nicht hochgradige Plaque kann rupturieren.', 'MINOCA requires a true acute myocardial infarction: clinical evidence of acute ischaemia with a rise and/or fall in troponin, but no stenosis ≥50% in a major epicardial vessel on coronary angiography. “Non-obstructive” does not mean “no atherosclerosis”—a non-severe plaque may still rupture.', 'MINOCA مستلزم وجود یک انفارکت حاد واقعی است: شواهد بالینی ایسکمی حاد همراه با افزایش و/یا کاهش تروپونین، اما در آنژیوگرافی هیچ تنگی ۵۰٪ یا بیشتر در عروق اپیکاردیال اصلی دیده نمی‌شود. «غیرانسدادی» به معنی «نبود آترواسکلروز» نیست؛ پلاک بدون تنگی شدید نیز می‌تواند پاره شود.'))}</p>
        <aside>{t(L('Wichtig: Bei der Angiographie ist MINOCA zunächst eine Arbeitsdiagnose. Erst nach Ausschluss nichtischämischer Mimics und Nachweis eines ischämischen Mechanismus wird die Diagnose präzisiert.', 'Important: at angiography, MINOCA is initially a working diagnosis. It is refined only after non-ischaemic mimics have been excluded and an ischaemic mechanism has been identified.', 'نکته مهم: هنگام آنژیوگرافی، MINOCA در ابتدا یک تشخیص کاری است. تنها پس از رد موارد مشابه غیرایسکمیک و شناسایی یک مکانیسم ایسکمیک، تشخیص نهایی دقیق می‌شود.'))}</aside>
      </div>
      <div className={styles.minocaColumns}>
        <article><span>{t(L('GEHÖRT ZU MINOCA', 'ISCHAEMIC MINOCA CAUSES', 'علل ایسکمیک MINOCA'))}</span><h3>{t(L('Ischämische Mechanismen', 'Ischaemic mechanisms', 'مکانیسم‌های ایسکمیک'))}</h3><ul><li>{t(L('Plaqueruptur oder Plaqueerosion bei nichtobstruktiver Plaque', 'Plaque rupture or erosion involving a non-obstructive plaque', 'پارگی یا فرسایش پلاک غیرانسدادی'))}</li><li>{t(L('Epikardialer Koronarspasmus oder mikrovaskuläre Dysfunktion', 'Epicardial coronary spasm or coronary microvascular dysfunction', 'اسپاسم اپیکاردیال کرونر یا اختلال میکروواسکولار'))}</li><li>{t(L('Koronare Embolie oder Thrombose', 'Coronary embolism or thrombosis', 'آمبولی یا ترومبوز کرونر'))}</li><li>{t(L('Spontane Koronardissektion (SCAD)', 'Spontaneous coronary artery dissection (SCAD)', 'دیسکسیون خودبه‌خودی عروق کرونر (SCAD)'))}</li></ul></article>
        <article><span>{t(L('KEIN MINOCA ALS ENDDIAGNOSE', 'NOT FINAL MINOCA DIAGNOSES', 'تشخیص نهایی MINOCA نیستند'))}</span><h3>{t(L('Nichtischämische Mimics', 'Non-ischaemic mimics', 'موارد مشابه غیرایسکمیک'))}</h3><p>{t(L('Myokarditis und Takotsubo-Syndrom können bei der Erstangiographie wie MINOCA erscheinen, sind nach aktueller Einordnung aber eigenständige Diagnosen und keine Ursachen eines endgültig bestätigten MINOCA. Auch andere nichtischämische Myokardschädigungen müssen ausgeschlossen werden.', 'Myocarditis and Takotsubo syndrome may resemble MINOCA at initial angiography, but under current classification they are separate diagnoses—not causes of a finally confirmed MINOCA. Other non-ischaemic forms of myocardial injury must also be excluded.', 'میوکاردیت و سندروم تاکوتسوبو ممکن است در آنژیوگرافی اولیه شبیه MINOCA باشند، اما در طبقه‌بندی فعلی تشخیص‌های مستقلی هستند و علت MINOCA تأییدشده محسوب نمی‌شوند. سایر انواع آسیب غیرایسکمیک میوکارد نیز باید رد شوند.'))}</p></article>
      </div>
      <div className={styles.focusSteps}><span><b>01</b>{t(L('Angiographie: Stenose < 50 %', 'Angiography: stenosis <50%', 'آنژیوگرافی: تنگی کمتر از ۵۰٪'))}</span><span><b>02</b>{t(L('CMR früh im Indexaufenthalt', 'Early CMR during the index admission', 'CMR زودهنگام در بستری اولیه'))}</span><span><b>03</b>{t(L('Infarkt bestätigen, Mimics ausschließen', 'Confirm infarction and exclude mimics', 'تأیید انفارکت و رد تشخیص‌های مشابه'))}</span></div>
    </Section>

    <Section id="takotsubo" title={t(SECTION_LABELS.takotsubo)}>
      <div className={styles.diseaseFeature}><figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg" alt={t(PATTERNS[1].alt)} width={1254} height={1254} /><figcaption>{t(COPY.synthetic)}</figcaption></figure><div><small>{t(L('CINE ZUERST', 'CINE FIRST', 'ابتدا CINE'))}</small><h3>{t(L('Ballooning statt Koronarterritorium', 'Ballooning beyond one coronary territory', 'بالونینگ فراتر از قلمرو کرونر'))}</h3><p>{t(L('Cine zeigt eine vorübergehende regionale LV-Dysfunktion. Das Muster ist am häufigsten apikal, kann aber auch midventrikulär, basal (invers) oder fokal sein und überschreitet meist die Grenzen eines einzelnen Koronarterritoriums.', 'Cine shows transient regional LV dysfunction. The pattern is most often apical, but may also be mid-ventricular, basal (inverted), or focal, and usually extends beyond the boundaries of a single coronary territory.', 'Cine اختلال گذرای موضعی عملکرد بطن چپ را نشان می‌دهد. الگو اغلب اپیکال است، اما می‌تواند میدونتریکولار، بازال (معکوس) یا فوکال نیز باشد و معمولاً از مرزهای یک قلمرو کرونری منفرد فراتر می‌رود.'))}</p><ul><li>{t(L('T2: Ödem in den dysfunktionellen Segmenten möglich.', 'T2: oedema may be present in the dysfunctional segments.', 'T2: ممکن است در سگمنت‌های دچار اختلال حرکتی ادم وجود داشته باشد.'))}</li><li>{t(L('LGE: typischerweise nicht nachweisbar.', 'LGE: typically absent.', 'LGE: معمولاً وجود ندارد.'))}</li><li>{t(L('Komplikationen: LV-/RV-Beteiligung, LVOT-Obstruktion, Mitralinsuffizienz und intrakavitäre Thromben prüfen.', 'Complications: assess LV/RV involvement, LVOT obstruction, mitral regurgitation, and intracavitary thrombi.', 'عوارض: درگیری بطن چپ/راست، انسداد LVOT، نارسایی میترال و ترومبوس‌های داخل‌حفره‌ای بررسی شوند.'))}</li></ul></div></div>
      <RadiopaediaCase caseId="takotsubo" lang={lang} />
    </Section>

    <Section id="myokarditis" title={t(SECTION_LABELS.myokarditis)}>
      <div className={styles.myocarditisLead}>
        <figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-myocarditis-lge.jpg" alt={t(PATTERNS[2].alt)} width={1254} height={1254} /><figcaption>{t(COPY.synthetic)}</figcaption></figure>
        <div><small>{t(L('ENTZÜNDLICHE MYOKARDSCHÄDIGUNG', 'INFLAMMATORY MYOCARDIAL INJURY', 'آسیب التهابی میوکارد'))}</small><h3>{t(L('Was bedeutet Myokarditis im CMR?', 'What does myocarditis mean on CMR?', 'میوکاردیت در CMR به چه معناست؟'))}</h3><p>{t(L('Myokarditis ist eine entzündliche Erkrankung des Herzmuskels. Im CMR suchen wir nicht nach einem einzelnen „Myokarditis-Bild“, sondern nach zwei Komponenten: akutem Wassergehalt/Ödem und Myokardschädigung. Die Bildgebung muss immer zur Klinik, zum EKG und zum Troponin passen.', 'Myocarditis is an inflammatory disease of the heart muscle. On CMR, we do not look for one single “myocarditis image”, but for two components: acute water content/oedema and myocardial injury. Imaging findings must always fit the clinical presentation, ECG, and troponin.', 'میوکاردیت بیماری التهابی عضلهٔ قلب است. در CMR به دنبال یک «تصویر منفرد میوکاردیت» نیستیم، بلکه دو مؤلفه را بررسی می‌کنیم: افزایش آب/ادم حاد و آسیب میوکارد. یافته‌های تصویربرداری همیشه باید با تابلوی بالینی، ECG و تروپونین تطبیق داده شوند.'))}</p></div>
      </div>
      <div className={styles.lakeLouiseHeader}><small>{t(L('AKTUALISIERTE LAKE-LOUISE-KRITERIEN', 'UPDATED LAKE LOUISE CRITERIA', 'معیارهای به‌روزشدهٔ LAKE LOUISE'))}</small><h3>{t(L('Ein T2-Zeichen + ein T1-Zeichen', 'One T2 marker + one T1 marker', 'یک معیار T2 + یک معیار T1'))}</h3><p>{t(L('Sind beide Kriterien positiv, ist die Spezifität für eine akute Myokarditis höher. Nur eines von beiden kann im passenden klinischen Kontext eine mögliche Myokarditis stützen, ist aber weniger spezifisch.', 'When both criteria are positive, specificity for acute myocarditis is higher. One positive domain alone may support possible myocarditis in the appropriate clinical setting, but is less specific.', 'مثبت بودن هر دو گروه معیار، اختصاصیت تشخیص میوکاردیت حاد را افزایش می‌دهد. مثبت بودن تنها یکی از آن‌ها در زمینهٔ بالینی مناسب می‌تواند از میوکاردیت احتمالی حمایت کند، اما اختصاصیت کمتری دارد.'))}</p></div>
      <div className={styles.lakeLouiseGrid}>
        <article><header><b>T2</b><div><small>{t(L('ÖDEM', 'OEDEMA', 'ادم'))}</small><h3>{t(L('T2-basiertes Kriterium', 'T2-based criterion', 'معیار مبتنی بر T2'))}</h3></div></header><p>{t(L('Zeigt erhöhten freien Wassergehalt als Ausdruck aktiver Entzündung.', 'Shows increased free water content as a marker of active inflammation.', 'افزایش آب آزاد بافت را به‌عنوان نشانهٔ التهاب فعال نشان می‌دهد.'))}</p><ul><li>{t(L('Regionales oder globales Hochsignal in T2-gewichteten/STIR-Sequenzen', 'Regional or global high signal on T2-weighted/STIR sequences', 'افزایش موضعی یا منتشر سیگنال در سکانس‌های T2-weighted/STIR'))}</li><li>{t(L('Erhöhte myokardiale T2-Relaxationszeit im T2-Mapping', 'Elevated myocardial T2 relaxation time on T2 mapping', 'افزایش زمان relaxation میوکارد در T2 mapping'))}</li></ul></article>
        <article><header><b>T1</b><div><small>{t(L('MYOKARDSCHÄDIGUNG', 'MYOCARDIAL INJURY', 'آسیب میوکارد'))}</small><h3>{t(L('T1-basiertes Kriterium', 'T1-based criterion', 'معیار مبتنی بر T1'))}</h3></div></header><p>{t(L('Erfasst Zellschädigung und Expansion des Extrazellulärraums.', 'Detects cellular injury and expansion of the extracellular space.', 'آسیب سلولی و افزایش فضای خارج‌سلولی را نشان می‌دهد.'))}</p><ul><li>{t(L('Erhöhtes natives T1 im T1-Mapping', 'Elevated native T1 on T1 mapping', 'افزایش native T1 در T1 mapping'))}</li><li>{t(L('Erhöhtes Extrazellulärvolumen (ECV)', 'Elevated extracellular volume (ECV)', 'افزایش حجم خارج‌سلولی (ECV)'))}</li><li>{t(L('Nichtischämisches LGE: meist subepikardial oder midmyokardial, häufig inferolateral', 'Non-ischaemic LGE: usually subepicardial or mid-wall, often inferolateral', 'LGE غیرایسکمیک: معمولاً ساب‌اپیکاردیال یا میدوال و اغلب اینفرولاترال'))}</li></ul></article>
      </div>
      <aside className={styles.myocarditisSupport}><strong>{t(L('Unterstützende Befunde – keine Hauptkriterien', 'Supportive findings—not main criteria', 'یافته‌های حمایتی؛ نه معیارهای اصلی'))}</strong><p>{t(L('Cine: globale oder regionale LV-Dysfunktion. Perikarderguss, perikardiales Ödem oder perikardiales LGE sprechen für eine begleitende Perikarditis.', 'Cine: global or regional LV dysfunction. Pericardial effusion, pericardial oedema, or pericardial LGE suggests concomitant pericarditis.', 'Cine: اختلال عملکرد منتشر یا موضعی بطن چپ. افیوژن، ادم یا LGE پریکارد به نفع پریکاردیت همراه است.'))}</p></aside>
      <RadiopaediaCase caseId="myocarditis" lang={lang} />
    </Section>

    <Section id="sarkoidose" title={t(SECTION_LABELS.sarkoidose)}>
      <div className={styles.diseaseFeature}><figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg" alt={t(PATTERNS[3].alt)} width={1254} height={1254} /><figcaption>{t(COPY.synthetic)}</figcaption></figure><div><small>{t(L('MULTIFOKALES LGE', 'MULTIFOCAL LGE', 'LGE چندکانونی'))}</small><h3>{t(L('Fleckige Narbe, nicht ein Koronarterritorium', 'Patchy scar beyond a coronary territory', 'اسکار لکه‌ای خارج از قلمرو کرونر'))}</h3><p>{t(L('Typisch ist ein fleckiges, multifokales LGE, häufig basal-septal oder lateral sowie midmyokardial beziehungsweise subepikardial. Auch transmurale Herde und eine RV-Beteiligung sind möglich.', 'Patchy, multifocal LGE is typical, often basal-septal or lateral and mid-wall or subepicardial. Transmural foci and RV involvement may also occur.', 'الگوی تیپیک، LGE لکه‌ای و چندکانونی است که اغلب در بخش بازال‌سپتال یا لترال و به‌صورت میدوال یا ساب‌اپیکاردیال دیده می‌شود. کانون‌های ترانس‌مورال و درگیری بطن راست نیز ممکن‌اند.'))}</p><ul><li>{t(L('LGE quantifiziert vor allem die Narbenlast und ist prognostisch relevant.', 'LGE primarily quantifies scar burden and has prognostic relevance.', 'LGE در درجهٔ اول بار اسکار را نشان می‌دهد و ارزش پیش‌آگهی دارد.'))}</li><li>{t(L('FDG-PET ergänzt die Beurteilung der entzündlichen Aktivität.', 'FDG-PET complements the assessment of inflammatory activity.', 'FDG-PET ارزیابی فعالیت التهابی را تکمیل می‌کند.'))}</li><li>{t(L('Kein einzelnes LGE-Muster ist beweisend: Klinik, Rhythmusdiagnostik und extrakardiale Befunde mitbewerten.', 'No single LGE pattern is diagnostic: integrate the clinical presentation, rhythm assessment, and extracardiac findings.', 'هیچ الگوی منفرد LGE به‌تنهایی تشخیصی نیست؛ تابلوی بالینی، بررسی ریتم و یافته‌های خارج‌قلبی نیز باید در نظر گرفته شوند.'))}</li></ul></div></div>
      <RadiopaediaCase caseId="sarcoidosis" lang={lang} />
    </Section>

    <Section id="infarkt" title={t(SECTION_LABELS.infarkt)}>
      <div className={styles.infarctSplit}>
        <article><small>{t(L('Akut', 'Acute', 'حاد'))}</small><h3>{t(L('Ödem + frische Nekrose', 'Oedema + acute necrosis', 'ادم و نکروز حاد'))}</h3><ul><li>{t(L('T2: erhöht durch Myokardödem.', 'T2: elevated because of myocardial oedema.', 'T2: به علت ادم میوکارد افزایش می‌یابد.'))}</li><li>{t(L('LGE: subendokardial bis transmural im Koronarterritorium.', 'LGE: subendocardial to transmural within a coronary territory.', 'LGE: از ساب‌اندوکارد تا ترانس‌مورال در یک قلمرو کرونری دیده می‌شود.'))}</li><li>{t(L('Cine: regionale Hypo-, A- oder Dyskinesie.', 'Cine: regional hypokinesia, akinesia, or dyskinesia.', 'Cine: هیپوکینزی، آکینزی یا دیسکینزی موضعی دیده می‌شود.'))}</li></ul></article>
        <article><small>{t(L('Chronisch', 'Chronic', 'مزمن'))}</small><h3>{t(L('Narbe + Remodeling', 'Scar + remodelling', 'اسکار و بازسازی'))}</h3><ul><li>{t(L('T2: kein Ödem, Signal meist normalisiert.', 'T2: no oedema, usually normalised.', 'T2 بدون ادم و معمولاً نرمال است.'))}</li><li>{t(L('LGE: persistierende Narbe, oft mit Wandverdünnung.', 'LGE: persistent scar, often with wall thinning.', 'LGE اسکار پایدار همراه نازکی دیواره است.'))}</li><li>{t(L('Cine: persistierende A- oder Dyskinesie und LV-Remodeling.', 'Cine: persistent akinesia/dyskinesia and remodelling.', 'Cine آکینزی یا دیسکینزی پایدار را نشان می‌دهد.'))}</li></ul></article>
      </div>
      <section className={styles.complicationSection} aria-labelledby="mi-complications-title">
        <header><small>{t(L('Eigener Prüfschritt', 'Dedicated review step', 'مرحله بررسی مستقل'))}</small><h3 id="mi-complications-title">{t(L('Komplikationen des Myokardinfarkts', 'Complications of myocardial infarction', 'عوارض انفارکت میوکارد'))}</h3></header>
        <figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/post-mi-complications-cmr.png" alt={t(L('Synthetische CMR-Lehrabbildung mit mikrovaskulärer Obstruktion, intramyokardialer Einblutung, LV-Thrombus und LV-Aneurysma', 'Synthetic CMR teaching image showing microvascular obstruction, intramyocardial haemorrhage, LV thrombus, and LV aneurysm', 'تصویر آموزشی ساختگی CMR شامل انسداد میکروواسکولار، خونریزی داخل میوکارد، ترومبوس بطن چپ و آنوریسم بطن چپ'))} width={1536} height={1024} /><figcaption>{t(COPY.synthetic)}</figcaption></figure>
        <div className={styles.complicationGrid}>{[
          [L('MVO', 'MVO', 'MVO'), L('Dunkler Kern innerhalb des hellen Infarkt-LGE: Hinweis auf fehlende mikrovaskuläre Reperfusion.', 'A dark core within bright infarct LGE indicates failure of microvascular reperfusion.', 'هسته‌ای تیره درون LGE روشن انفارکت، نشانهٔ عدم برقراری مجدد پرفیوژن میکروواسکولار است.')],
          [L('Intramyokardiale Einblutung', 'Intramyocardial haemorrhage', 'خونریزی داخل میوکارد'), L('Suszeptibilitätsbedingte Signalminderung im Infarktkern, am besten in T2*/Mapping erfassbar.', 'Susceptibility-related signal loss in the infarct core, best detected with T2* imaging or mapping.', 'کاهش سیگنال ناشی از susceptibility در مرکز انفارکت که با T2* یا mapping بهتر تشخیص داده می‌شود.')],
          [L('LV-Thrombus', 'LV thrombus', 'ترومبوس بطن چپ'), L('Meist apikaler, nicht perfundierter Füllungsdefekt; gezielt in Cine und kontrastverstärkten Bildern prüfen.', 'Usually an apical, non-perfused filling defect; assess it specifically on cine and contrast-enhanced images.', 'معمولاً به‌صورت نقص پرشدگی اپیکال و بدون پرفیوژن دیده می‌شود؛ در تصاویر Cine و کنتراست‌دار باید به‌طور هدفمند بررسی شود.')],
          [L('Aneurysma / Pseudoaneurysma', 'Aneurysm / pseudoaneurysm', 'آنوریسم / پسودوآنوریسم'), L('Breithalsiges, wandständiges Aneurysma von einem schmalhalsigen, rupturgefährdeten Pseudoaneurysma abgrenzen.', 'Differentiate a broad-necked true aneurysm containing myocardial wall from a narrow-necked pseudoaneurysm at risk of rupture.', 'آنوریسم واقعیِ دهانه‌گشاد که دیوارهٔ آن حاوی میوکارد است باید از پسودوآنوریسم دهانه‌باریک و مستعد پارگی افتراق داده شود.')],
        ].map(([title, text], index) => <article key={t(title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{t(title)}</h4><p>{t(text)}</p></div></article>)}</div>
      </section>
      <section className={styles.territorySection} aria-labelledby="territory-title">
        <div className={styles.territoryCopy}><small>{t(L('AHA · 17 SEGMENTE', 'AHA · 17 SEGMENTS', 'AHA · ۱۷ سگمنت'))}</small><h3 id="territory-title">{t(L('Koronarterritorium systematisch zuordnen', 'Map the coronary territory systematically', 'تطبیق سیستماتیک قلمرو کرونر'))}</h3><p>{t(L('LAD versorgt typischerweise die anterioren und anteroseptalen, RCA die inferioren und LCX die lateralen Segmente. Diese Zuordnung ist eine Orientierung: Dominanz und individuelle Koronaranatomie können abweichen.', 'The LAD typically supplies the anterior and anteroseptal segments, the RCA the inferior segments, and the LCX the lateral segments. This assignment is a guide: coronary dominance and individual anatomy may vary.', 'LAD معمولاً سگمنت‌های قدامی و قدامی‌سپتال، RCA سگمنت‌های تحتانی و LCX سگمنت‌های لترال را خون‌رسانی می‌کند. این تقسیم‌بندی صرفاً راهنماست؛ غالب بودن عروق و آناتومی کرونری افراد می‌تواند متفاوت باشد.'))}</p></div>
        <figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/coronary-territories-aha17.png" alt={t(L('Originale schematische Darstellung der typischen LAD-, RCA- und LCX-Territorien im AHA-17-Segment-Modell', 'Original schematic of typical coronary territories in the AHA 17-segment model', 'شماتیک قلمروهای کرونری در مدل ۱۷ سگمنتی AHA'))} width={1536} height={1024} /><figcaption>{t(L('Vereinfachte Zuordnung · Koronaranatomie variabel', 'Simplified assignment · coronary anatomy varies', 'تطبیق ساده‌شده؛ آناتومی کرونر متغیر است'))}</figcaption></figure>
      </section>
    </Section>

    <Section id="algorithmus" title={t(SECTION_LABELS.algorithmus)}>
      <div className={styles.takeHomeIntro}>
        <span><SectionIcon id="takehome" /></span>
        <div><h3>{t(L('Nicht der Einzelbefund, sondern das Gesamtmuster entscheidet.', 'The complete pattern—not one finding—decides.', 'الگوی کلی، نه یک یافته منفرد، تعیین‌کننده است.'))}</h3><div className={styles.takeHomePrinciples}><span><b>LGE</b>{t(L('lokalisiert die Schädigung.', 'localises the injury.', 'محل آسیب را مشخص می‌کند.'))}</span><span><b>T2</b>{t(L('zeigt die Aktivität.', 'indicates activity.', 'فعالیت را نشان می‌دهد.'))}</span><span><b>Cine</b>{t(L('ordnet die Funktion ein.', 'assesses function.', 'عملکرد را ارزیابی می‌کند.'))}</span></div></div>
      </div>
      <DecisionTree lang={lang} />
      <div className={styles.takeHomeSteps}>{[
        [L('LGE', 'LGE', 'LGE'), L('Muster', 'Pattern', 'الگو'), L('Subendokardial im Territorium = ischämisch; subepikardial/midmyokardial = nichtischämisch.', 'Subendocardial territorial enhancement is ischaemic; subepicardial/mid-wall enhancement is non-ischaemic.', 'درگیری ساب‌اندوکاردیال قلمرویی ایسکمیک و ساب‌اپیکاردیال/میدوال غیرایسکمیک است.')],
        [L('T2', 'T2', 'T2'), L('Aktivität', 'Activity', 'فعالیت'), L('Ödem spricht für einen akuten oder aktiven Prozess, ist allein aber nicht spezifisch.', 'Oedema supports an acute or active process but is not specific alone.', 'ادم به نفع فرایند حاد یا فعال است اما اختصاصی نیست.')],
        [L('Cine', 'Cine', 'Cine'), L('Funktion', 'Function', 'عملکرد'), L('Territoriale Akinesie, Ballooning oder globale Dysfunktion gezielt einordnen.', 'Classify territorial akinesia, ballooning, or global dysfunction.', 'آکینزی قلمرویی، بالونینگ یا اختلال کلی را طبقه‌بندی کنید.')],
      ].map(([label, title, text], index) => <article key={t(label)}><div><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(label)}</strong></div><h3>{t(title)}</h3><p>{t(text)}</p></article>)}</div>
      <aside className={styles.takeHomeBottomLine}><SectionIcon id="takehome" /><p>{t(L('Bei STEMI oder hämodynamischer Instabilität hat die Akutversorgung Vorrang. CMR hilft anschließend, wenn die Ursache der Myokardschädigung unklar bleibt.', 'In STEMI or haemodynamic instability, acute treatment takes priority. CMR helps when the cause of myocardial injury remains unclear.', 'در STEMI یا ناپایداری همودینامیک، درمان فوری اولویت دارد؛ CMR زمانی کمک می‌کند که علت آسیب میوکارد نامشخص بماند.'))}</p></aside>
    </Section>

    <details className={styles.sourcesDisclosure}><summary>{t(L('Leitlinien & Konsensusdokumente', 'Guidelines & consensus documents', 'گایدلاین‌ها و اسناد اجماعی'))}</summary><div>{REFERENCES.map(([title, href], index) => <a key={href} href={href} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><i aria-hidden="true">↗</i></a>)}</div></details>

  </>
}

function MobilePath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const current = SECTIONS.find(section => section.id === openId) || SECTIONS[0]
  const progress = (readSections.size / SECTIONS.length) * 360
  const select = id => { onSelect(id); setPanelOpen(false) }
  return <div className={`${template.mobileLearningPath} ${styles.mobileLearningPath}`}>
    {panelOpen ? <section id="mi-dd-mobile-path" className={`${template.mobilePathPanel} ${styles.mobilePathPanel}`} role="dialog" aria-label={pick(COPY.path, lang)}><header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {SECTIONS.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => select(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><SectionIcon id={section.id} /></span><span><strong>{pick(section.label, lang)}</strong><small>{pick(section.label, lang)}</small></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section> : null}
    <button type="button" className={`${template.mobilePathButton} ${styles.mobilePathButton}`} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mi-dd-mobile-path"><span className={`${template.mobileProgressRing} ${styles.mobileProgressRing}`} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{SECTIONS.length}</small></span><span className={`${template.mobileCurrentIcon} ${styles.mobileCurrentIcon}`}><SectionIcon id={current.id} /></span><span className={template.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(current.label, lang)}</small></span></button>
  </div>
}

export default function MyocardialInfarctionDifferentialPage() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState(SECTIONS[0].id)
  const [readSections, setReadSections] = usePersistedSectionProgress(ID, SECTION_IDS)
  const activeIndex = useMemo(() => SECTIONS.findIndex(section => section.id === openId), [openId])
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const lessonPath = '/thorax/kardio/myokardinfarkt-differentialdiagnosen'

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (SECTION_IDS.includes(hash)) setOpenId(hash)
  }, [])

  const selectSection = id => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(null, '', nextId ? `${baseUrl}#${nextId}` : baseUrl)
    if (nextId) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }
  const jumpTo = id => {
    setOpenId(id)
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(null, '', `${baseUrl}#${id}`)
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }
  const toggleSectionRead = id => setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const lessonComplete = readSections.size === SECTIONS.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(SECTION_IDS))
  const advance = () => jumpTo(SECTIONS[activeIndex < 0 ? 0 : Math.min(activeIndex + 1, SECTIONS.length - 1)].id)
  const facts = [
    [L('Akutversorgung zuerst', 'Acute care comes first', 'ابتدا درمان اورژانسی'), L('ST-Hebung oder Instabilität → sofort Herzkatheterlabor; CMR darf nicht verzögern.', 'ST elevation or instability → immediate cardiac catheterization lab; CMR must not delay treatment.', 'بالا رفتن قطعهٔ ST یا ناپایداری ← ارجاع فوری به Cardiac catheterization lab؛ CMR نباید درمان را به تأخیر بیندازد.'), 'ausgangspunkt'],
    [L('Subendokardial = ischämisch', 'Subendocardial = ischaemic', 'ساب‌اندوکاردیال = ایسکمیک'), L('Infarkt-LGE folgt einem Koronarterritorium und kann transmural werden.', 'Infarct-pattern LGE follows a coronary territory and may become transmural.', 'LGE انفارکتی از قلمرو کرونری پیروی می‌کند و می‌تواند ترانس‌مورال شود.'), 'lge-muster'],
    [L('CMR klärt die Ursache', 'CMR identifies the cause', 'CMR علت را مشخص می‌کند'), L('Bei nichtobstruktiver KHK: Infarkt, Myokarditis und Takotsubo differenzieren.', 'With non-obstructive coronary arteries, distinguish infarction, myocarditis, and Takotsubo syndrome.', 'در نبود بیماری انسدادی کرونر، انفارکت، میوکاردیت و تاکوتسوبو را از هم افتراق دهید.'), 'algorithmus'],
  ]

  return <main className={`${template.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} data-lesson-progress-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={template.header}>
      <div className={template.topline}><nav className={template.breadcrumb} aria-label={pick(COPY.contents, lang)}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/thorax')}>{pick(COPY.thorax, lang)}</Link><span>/</span><span>{pick(COPY.chapter, lang)}</span><span>/</span><strong>{pick(COPY.title, lang)}</strong></nav><span className={template.author}>Dr. Zia</span></div>
      <div className={template.hero}><div className={`${template.heroCopy} ${styles.heroCopy}`}><h1>{pick(COPY.title, lang)}</h1><div className={styles.heroTools}><Link className={styles.heroToolPrimary} href={withLang(`/ueben/quiz?fach=thorax&n=6&themen=${ID}&from=${encodeURIComponent(withLang(lessonPath))}`)}><SectionIcon id="mcq" /><span><strong>MCQ</strong><small>{pick(L('6 Prüfungsfragen', '6 exam questions', '۶ سؤال آزمونی'), lang)}</small></span><i aria-hidden="true">{lang === 'fa' ? '←' : '→'}</i></Link><Link className={styles.heroToolSecondary} href={withLang(`/flashcards/${ID}?from=${encodeURIComponent(withLang(lessonPath))}`)}><SectionIcon id="flashcards" /><span><strong>{pick(L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'), lang)}</strong><small>{pick(L('8 Lernkarten', '8 study cards', '۸ کارت آموزشی'), lang)}</small></span><i aria-hidden="true">{lang === 'fa' ? '←' : '→'}</i></Link></div></div><div className={`${template.heroFacts} ${styles.heroFacts}`}>{facts.map(([value, description, icon]) => <article key={pick(value, lang)}><span className={template.factIcon}><SectionIcon id={icon} /></span><strong>{pick(value, lang)}</strong><p>{pick(description, lang)}</p></article>)}</div></div>
      <div className={template.progressBar}><div className={template.progressTrack}><i style={{ width: `${(readSections.size / SECTIONS.length) * 100}%` }} /></div><span>{readSections.size} / {SECTIONS.length} {pick(COPY.progress, lang)}</span><div className={template.progressActions}><button type="button" className={`${template.lessonCompleteButton} ${lessonComplete ? template.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><SectionIcon id="takehome" />{pick(lessonComplete ? COPY.lessonCompleted : COPY.completeLesson, lang)}</button><button type="button" className={template.continueButton} onClick={advance} disabled={activeIndex === SECTIONS.length - 1}>{pick(COPY.continue, lang)}<span aria-hidden="true">{lang === 'fa' ? '←' : '→'}</span></button></div></div>
    </header>
    <div className={`${template.layout} ${styles.lessonLayout}`}><aside className={`${template.sidebar} ${styles.lessonSidebar}`}><h2>{pick(COPY.path, lang)}</h2><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={`${styles.sideNavItem} ${openId === section.id ? `${template.activeSideItem} ${styles.sideNavItemActive}` : ''}`} onClick={() => jumpTo(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.label, lang)}`}><span className={template.sideIcon}><SectionIcon id={section.id} /></span><strong>{pick(section.label, lang)}</strong></button>)}</nav></aside><article className={template.lesson}><LessonContext.Provider value={{ lang, openId, readSections, selectSection, toggleSectionRead }}><LessonContent lang={lang} /></LessonContext.Provider></article></div>
    <MobilePath lang={lang} openId={openId} readSections={readSections} onSelect={jumpTo} />
  </main>
}
