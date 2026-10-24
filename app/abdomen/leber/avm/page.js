'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · AVM",
    "title": "Arteriovenöse Malformation (AVM) der Leber",
    "subtitle": "",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      { "id": "grundlagen", "label": "Grundlagen", "icon": "🧬" },
      { "id": "sono", "label": "Sonographie", "icon": "🔊" },
      { "id": "ct", "label": "CT", "icon": "🩻" },
      { "id": "mrt", "label": "MRT", "icon": "🧲" },
      { "id": "hht", "label": "HHT & Leber", "icon": "🩸" },
      { "id": "takehome", "label": "Take home message", "icon": "💡" }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Eine arteriovenöse Malformation (AVM) der Leber ist eine abnorme direkte Verbindung zwischen einer Arterie und einem venösen Gefäß ohne zwischengeschaltetes Kapillarbett. Dadurch entsteht ein Hochfluss-Shunt mit niedrigem Widerstand.",
      "items": [
        { "title": "Definition", "text": "Direkte AV-Verbindung ohne Kapillarbett mit Hochfluss-Niedrigwiderstand-Charakteristik." },
        { "title": "Intrahepatische Shunts", "text": "Arterioportal (A. hepatica → Pfortaderast), hepato-arteriovenöse Fistel (A. hepatica → Lebervene) und portosystemisch (Pfortader → Lebervene). Der portosystemische Shunt ist keine arteriovenöse Fistel." },
        { "title": "Begriffe", "text": "AVM wird in der Kursquelle als Sammelbegriff verwendet. Eine direkte Verbindung von A. hepatica und Lebervene heißt präziser hepatische arteriovenöse Fistel (HAVF); die genaue Gefäßverbindung muss bildgebend belegt werden." },
        { "title": "Ätiologie", "text": "Kongenital (v. a. HHT/Morbus Osler-Weber-Rendu) oder erworben (iatrogen nach Biopsie/TIPS, traumatisch, tumor- oder zirrhoseassoziiert)." }
      ],
      "key": "Eine AVM ist eine direkte AV-Kurzschlussverbindung ohne Kapillarbett. HHT kann multiple hepatische Shunts verursachen."
    },
    "sono": {
      "title": "Sonographie & Doppler",
      "lead": "Im B-Bild ist eine hepatische AVM oft unauffällig oder nur durch eine dezente Architekturstörung erkennbar. Der entscheidende Hinweis kommt aus dem Doppler.",
      "tableHeaders": ["Modalität / Gefäß", "Erwarteter Normalbefund", "Hinweis auf Shunt"],
      "tableRows": [
        ["B-Bild", "keine spezifische Parenchymveränderung", "häufig unauffällig, ggf. dezente, unscharfe Architekturstörung"],
        ["Farbduplex", "gerichteter Fluss in Portal- und Lebervenen", "auffällig turbulentes oder aliasing Flusssignal im betroffenen Areal"],
        ["Spektraldoppler · Pfortader", "hepatopetal und relativ kontinuierlich, mit geringer kardialer/respiratorischer Modulation", "pulsatiler, arterialisierter oder umgekehrter Fluss kann bei einem arterioportalen Shunt auftreten"],
        ["Spektraldoppler · Lebervene", "kardial phasisch, normalerweise triphasisch", "arterialisierter Fluss kann zu einer hepato-arteriovenösen Fistel passen"],
        ["Spektraldoppler · zuführende Arterie", "Niedrigwiderstandsmuster mit kontinuierlichem diastolischem Vorwärtsfluss", "deutlich erniedrigter RI und erhöhter diastolischer Fluss unterstützen den Shuntverdacht"]
      ],
      "key": "Pfortader- und Lebervenen haben unterschiedliche Normalwellenformen. Ein neu arterialisiertes Muster ist verdächtig, aber nicht allein beweisend; Gefäßtyp, Flussrichtung, klinischen Kontext und weitere Bildgebung gemeinsam bewerten."
    },
    "ct": {
      "title": "CT-Diagnostik",
      "lead": "Das CT zeigt das Leitzeichen der hepatischen AVM besonders deutlich in der frühen arteriellen Phase.",
      "tableHeaders": ["Phase", "Befund"],
      "tableRows": [
        ["Nativ", "meist unauffällig, Läsion selbst oft nicht abgrenzbar"],
        ["Früharteriell", "Early venous filling sign: vorzeitige Kontrastierung der drainierenden Lebervene oder Pfortader"],
        ["Periläsional arteriell", "keilförmige transiente Hyperperfusion (THAD/THID)"],
        ["Portalvenös/spät", "Phasenverlauf fallbezogen beurteilen; die PDF-Montage erlaubt keine sichere Zuordnung."]
      ],
      "irisTitle": "Early venous filling statt Läsionsfüllung",
      "irisText": "Im Gegensatz zu hypervaskulären Tumoren wie FNH oder HCC steht bei der AVM nicht die Anreicherung einer Raumforderung im Vordergrund, sondern die vorzeitige arterielle Opazifikation des venösen Abflussgefäßes – das Early venous filling sign.",
      "key": "Das Early venous filling sign – die vorzeitige arterielle Opazifikation der drainierenden Vene – ist der wichtigste CT-Hinweis auf eine hepatische AVM."
    },
    "mri": {
      "title": "MRT-Diagnostik",
      "lead": "Die MRT zeigt die schnell fließenden Gefäße der AVM direkt als signalfreie Strukturen und ergänzt die dynamische Information aus der CT.",
      "tableHeaders": ["Sequenz", "Typischer Befund", "Praktische Bedeutung"],
      "tableRows": [
        ["T1/T2", "serpiginöse, signalfreie Strukturen (Flow voids)", "Hinweis auf dilatierte, schnell durchflossene Gefäße"],
        ["DWI (PDF-Fall)", "als normal beschrieben", "Einzelfallangabe; nicht als Ausschlussregel verallgemeinern"],
        ["T1 C+ arteriell", "Early venous filling sign der drainierenden Vene", "Schlüsselbefund, analog zur CT"],
        ["Periläsional arteriell", "THAD/THID – transiente Hyperintensität", "kann hypervaskuläre Läsion imitieren"],
        ["Portalvenös/spät (PDF-Fall)", "früharterielle Anreicherung, danach Wash-out laut PDF", "Zielstruktur und Phasenzuordnung in der Abbildung unklar"]
      ],
      "lightBulbTitle": "Flow voids als Leitbefund",
      "lightBulbText": "Schnell fließendes Blut erzeugt in T1- und T2-gewichteten Sequenzen signalfreie, serpiginöse Strukturen (Flow voids) – ein direkter Hinweis auf dilatierte, hochflussige Gefäße im Bereich der AVM.",
      "dwiTitle": "THAD/THID richtig einordnen",
      "dwiText": "Eine transiente, keilförmige Hyperperfusion/-intensität um eine AVM (THAD/THID) kann eine hypervaskuläre Raumforderung wie FNH oder HCC imitieren. Entscheidend ist der Nachweis des zugrunde liegenden Shunts mit Early venous filling.",
      "key": "Flow voids + Early venous filling sign + ggf. THAD/THID = typisches MRT-Muster einer hepatischen AVM."
    },
    "hht": {
      "title": "HHT-assoziierte Lebermanifestation",
      "lead": "Die hereditäre hämorrhagische Teleangiektasie (HHT, Morbus Osler-Weber-Rendu) ist die wichtigste kongenitale Ursache multipler, diffus verteilter hepatischer AV-Shunts.",
      "tableHeaders": ["Merkmal", "Befund bei HHT-Leberbeteiligung"],
      "tableRows": [
        ["Gefäßmuster", "multiple, diffus verteilte arterioportale, arteriovenöse und portosystemische Shunts"],
        ["A. hepatica", "deutlich dilatiert und geschlängelt, oft mit abruptem Kalibersprung"],
        ["Parenchym", "diffuses, fleckiges arterielles Enhancement durch zahlreiche kleine Teleangiektasien"],
        ["Klinische Konsequenz", "High-Output-Herzinsuffizienz, portale Hypertension, biliäre Ischämie"]
      ],
      "cave": "Eine massiv dilatierte, geschlängelte A. hepatica mit diffusem fleckigem arteriellem Enhancement und multiplen Shunts ist hochverdächtig auf eine HHT-Leberbeteiligung – eine interdisziplinäre Abklärung (Kardiologie, Hepatologie) ist erforderlich.",
      "key": "HHT ist die wichtigste kongenitale Ursache multipler hepatischer AV-Shunts und kann über ein erhöhtes Herzzeitvolumen zu einer High-Output-Herzinsuffizienz sowie über arterioportale Shunts zu portaler Hypertension führen."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Punkte für die Befundung.",
      "items": [
        { "title": "Definition", "text": "Abnorme direkte AV-Verbindung ohne Kapillarbett mit Hochfluss-Niedrigwiderstand-Charakteristik." },
        { "title": "Shunt-Verbindungen", "text": "Arterioportal, arteriovenös oder portosystemisch; den Typ anhand der früh kontrastierten Gefäße zuordnen." },
        { "title": "Leitzeichen", "text": "Early venous filling sign (vorzeitige arterielle Venenopazifikation) und THAD/THID sind die wichtigsten CT-/MRT-Hinweise." },
        { "title": "HHT", "text": "Wichtigste kongenitale Ursache multipler Shunts; kann High-Output-Herzinsuffizienz und portale Hypertension verursachen." }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Liver · AVM",
    "title": "Hepatic Arteriovenous Malformation (AVM)",
    "subtitle": "",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      { "id": "grundlagen", "label": "Basics", "icon": "🧬" },
      { "id": "sono", "label": "Ultrasound", "icon": "🔊" },
      { "id": "ct", "label": "CT", "icon": "🩻" },
      { "id": "mrt", "label": "MRI", "icon": "🧲" },
      { "id": "hht", "label": "HHT & Liver", "icon": "🩸" },
      { "id": "takehome", "label": "Take home message", "icon": "💡" }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "A hepatic arteriovenous malformation (AVM) is an abnormal direct connection between an artery and a venous vessel without an intervening capillary bed, creating a high-flow, low-resistance shunt.",
      "items": [
        { "title": "Definition", "text": "Direct AV connection without a capillary bed, with high-flow, low-resistance characteristics." },
        { "title": "Intrahepatic shunts", "text": "Arterioportal (hepatic artery → portal vein branch), hepato-arteriovenous fistula (hepatic artery → hepatic vein), and portosystemic (portal vein → hepatic vein). A portosystemic shunt is not an arteriovenous fistula." },
        { "title": "Terminology", "text": "The course source uses AVM as an umbrella term. A direct hepatic artery-to-hepatic vein connection is more precisely a hepatic arteriovenous fistula (HAVF); the specific connection must be demonstrated on imaging." },
        { "title": "Aetiology", "text": "Congenital (especially HHT/Osler-Weber-Rendu disease) or acquired (iatrogenic after biopsy/TIPS, traumatic, or tumour- or cirrhosis-associated)." }
      ],
      "key": "An AVM is a direct AV connection without an intervening capillary bed. HHT can cause multiple hepatic shunts."
    },
    "sono": {
      "title": "Ultrasound & Doppler",
      "lead": "On grey-scale ultrasound, a hepatic AVM is often inconspicuous or shows only subtle architectural distortion. The key clue comes from Doppler.",
      "tableHeaders": ["Modality / vessel", "Expected normal appearance or flow", "Shunt clue"],
      "tableRows": [
        ["Grey-scale", "no specific parenchymal abnormality", "often unremarkable; sometimes subtle, ill-defined architectural distortion"],
        ["Colour Doppler", "Directional flow in portal and hepatic veins", "conspicuously turbulent or aliased flow in the affected area"],
        ["Spectral Doppler · portal vein", "hepatopetal and relatively continuous, with mild cardiac/respiratory modulation", "pulsatile, arterialised or reversed flow may occur with an arterioportal shunt"],
        ["Spectral Doppler · hepatic vein", "cardiac-phasic, normally triphasic", "arterialised flow may fit a hepato-arteriovenous fistula"],
        ["Spectral Doppler · feeding artery", "low-resistance pattern with continuous forward diastolic flow", "markedly decreased RI and increased diastolic flow support suspicion of a shunt"]
      ],
      "key": "Portal and hepatic veins have different normal waveforms. A newly arterialised pattern is suspicious but not diagnostic by itself; assess vessel type, flow direction, clinical context and complementary imaging together."
    },
    "ct": {
      "title": "CT diagnosis",
      "lead": "CT shows the key sign of a hepatic AVM particularly well in the early arterial phase.",
      "tableHeaders": ["Phase", "Finding"],
      "tableRows": [
        ["Non-contrast", "usually unremarkable, the lesion itself often not delineable"],
        ["Early arterial", "early venous filling sign: premature opacification of the draining hepatic vein or portal vein"],
        ["Perilesional arterial", "wedge-shaped transient hyperperfusion (THAD/THID)"],
        ["Portal venous/delayed", "Assess the phase pattern in context; the PDF montage does not permit confident assignment."]
      ],
      "irisTitle": "Early venous filling instead of lesion fill-in",
      "irisText": "Unlike hypervascular tumours such as FNH or HCC, the hallmark of an AVM is not enhancement of a mass but the premature arterial opacification of the draining venous vessel – the early venous filling sign.",
      "key": "The early venous filling sign – premature arterial opacification of the draining vein – is the most important CT clue to a hepatic AVM."
    },
    "mri": {
      "title": "MRI diagnosis",
      "lead": "MRI directly depicts the rapidly flowing vessels of an AVM as signal-void structures and adds dynamic information to CT.",
      "tableHeaders": ["Sequence", "Typical finding", "Practical meaning"],
      "tableRows": [
        ["T1/T2", "serpiginous signal-void structures (flow voids)", "indicates dilated, high-flow vessels"],
        ["DWI (PDF case)", "reported as normal", "single-case statement; do not generalise as an exclusion rule"],
        ["T1 C+ arterial", "early venous filling sign of the draining vein", "key finding, analogous to CT"],
        ["Perilesional arterial", "THAD/THID – transient hyperintensity", "can mimic a hypervascular lesion"],
        ["Portal venous/delayed (PDF case)", "early arterial enhancement followed by wash-out, as reported in the PDF", "target structure and phase mapping are unclear in the figure"]
      ],
      "lightBulbTitle": "Flow voids as the key finding",
      "lightBulbText": "Rapidly flowing blood produces signal-void, serpiginous structures (flow voids) on T1- and T2-weighted sequences – a direct sign of dilated, high-flow vessels at the site of an AVM.",
      "dwiTitle": "Interpreting THAD/THID correctly",
      "dwiText": "Transient, wedge-shaped hyperperfusion/hyperintensity around an AVM (THAD/THID) can mimic a hypervascular mass such as FNH or HCC. The key is demonstrating the underlying shunt with early venous filling.",
      "key": "Flow voids + early venous filling sign + possible THAD/THID = typical MRI pattern of a hepatic AVM."
    },
    "hht": {
      "title": "HHT-related liver involvement",
      "lead": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease) is the most important congenital cause of multiple, diffusely distributed hepatic AV shunts.",
      "tableHeaders": ["Feature", "Finding in HHT liver involvement"],
      "tableRows": [
        ["Vascular pattern", "multiple, diffusely distributed arterioportal, arteriovenous and portosystemic shunts"],
        ["Hepatic artery", "markedly dilated and tortuous, often with an abrupt calibre change"],
        ["Parenchyma", "diffuse, patchy arterial enhancement due to numerous small telangiectasias"],
        ["Clinical consequence", "high-output heart failure, portal hypertension, biliary ischaemia"]
      ],
      "cave": "A markedly dilated, tortuous hepatic artery with diffuse patchy arterial enhancement and multiple shunts is highly suspicious for HHT-related liver involvement – interdisciplinary work-up (cardiology, hepatology) is required.",
      "key": "HHT is the most important congenital cause of multiple hepatic AV shunts and can cause high-output heart failure via increased cardiac output and portal hypertension via arterioportal shunting."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The most important points for reporting.",
      "items": [
        { "title": "Definition", "text": "Abnormal direct AV connection without a capillary bed, with high-flow, low-resistance characteristics." },
        { "title": "Shunt connections", "text": "Arterioportal, arteriovenous or portosystemic; identify the type from the vessels that opacify early." },
        { "title": "Key signs", "text": "The early venous filling sign (premature arterial venous opacification) and THAD/THID are the most important CT/MRI clues." },
        { "title": "HHT", "text": "Most important congenital cause of multiple shunts; can cause high-output heart failure and portal hypertension." }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "کبد · AVM",
    "title": "مالفورماسیون شریانی-وریدی (AVM) کبد",
    "subtitle": "",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      { "id": "grundlagen", "label": "مبانی", "icon": "🧬" },
      { "id": "sono", "label": "سونوگرافی", "icon": "🔊" },
      { "id": "ct", "label": "CT", "icon": "🩻" },
      { "id": "mrt", "label": "MRI", "icon": "🧲" },
      { "id": "hht", "label": "HHT و کبد", "icon": "🩸" },
      { "id": "takehome", "label": "Take home message", "icon": "💡" }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "مالفورماسیون شریانی-وریدی (AVM) کبد یک ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط است که یک شانت با جریان بالا و مقاومت پایین ایجاد می‌کند.",
      "items": [
        { "title": "تعریف", "text": "ارتباط مستقیم شریانی-وریدی بدون بستر مویرگی با ویژگی جریان بالا و مقاومت پایین." },
        { "title": "شانت‌های داخل‌کبدی", "text": "آرتریوپورتال (شریان کبدی → شاخهٔ ورید پورت)، فیستول شریانی‌وریدی کبدی (HAVF؛ شریان کبدی → ورید کبدی) و پورتوسیستمیک (ورید پورت → ورید کبدی). شانت پورتوسیستمیک، فیستول شریانی‌وریدی نیست." },
        { "title": "اصطلاح‌شناسی", "text": "منبع آموزشی از AVM به‌عنوان اصطلاحی کلی استفاده می‌کند. اتصال مستقیم شریان کبدی به ورید کبدی دقیق‌تر «فیستول شریانی‌وریدی کبدی» (HAVF) نامیده می‌شود؛ اتصال مشخص باید در تصویربرداری اثبات شود." },
        { "title": "اتیولوژی", "text": "کنژنیتال (به‌ویژه HHT/بیماری Osler-Weber-Rendu) یا اکتسابی (ایاتروژنیک پس از بیوپسی/TIPS، تروماتیک یا مرتبط با تومور/سیروز)." }
      ],
      "key": "AVM یک ارتباط مستقیم شریانی-وریدی بدون بستر مویرگی است. HHT می‌تواند باعث شانت‌های متعدد کبدی شود."
    },
    "sono": {
      "title": "سونوگرافی و داپلر",
      "lead": "در تصویر B-mode، AVM کبدی اغلب بدون یافته خاص است یا فقط با تغییر خفیف معماری بافت همراه است. نکته کلیدی از داپلر به‌دست می‌آید.",
      "tableHeaders": ["روش / رگ", "نمای یا جریان طبیعی مورد انتظار", "سرنخ شانت"],
      "tableRows": [
        ["B-mode", "بدون ناهنجاری اختصاصی در پارانشیم کبد", "اغلب بدون یافتهٔ خاص؛ گاهی تغییر معماری خفیف و نامشخص"],
        ["داپلر رنگی", "جریان جهت‌دار در ورید پورت و وریدهای کبدی", "سیگنال جریان آشوبناک یا aliasing در ناحیه درگیر"],
        ["داپلر اسپکترال · ورید پورت", "جریان به‌سوی کبد و نسبتاً پیوسته، با تغییرات خفیف قلبی/تنفسی", "جریان پولساتیل، آرتریالیزه یا معکوس ممکن است در شانت آرتریوپورتال دیده شود"],
        ["داپلر اسپکترال · ورید کبدی", "وابسته به چرخهٔ قلب و معمولاً سه‌فازی", "جریان آرتریالیزه ممکن است با فیستول شریانی‌وریدی کبدی (HAVF) سازگار باشد"],
        ["داپلر اسپکترال · شریان تغذیه‌کننده", "الگوی کم‌مقاومت با جریان رو به جلو در دیاستول", "کاهش واضح RI و افزایش جریان دیاستولیک از شک به شانت حمایت می‌کند"]
      ],
      "key": "ورید پورت و وریدهای کبدی شکل موج طبیعی متفاوتی دارند. الگوی آرتریالیزهٔ جدید مشکوک است اما به‌تنهایی تشخیصی نیست؛ نوع رگ، جهت جریان، زمینهٔ بالینی و تصویربرداری تکمیلی را با هم ارزیابی کنید."
    },
    "ct": {
      "title": "تشخیص در CT",
      "lead": "CT علامت کلیدی AVM کبدی را به‌ویژه در فاز شریانی زودرس به‌خوبی نشان می‌دهد.",
      "tableHeaders": ["فاز", "یافته"],
      "tableRows": [
        ["بدون کنتراست", "معمولاً بدون یافته خاص، خود ضایعه اغلب قابل تشخیص نیست"],
        ["شریانی زودرس", "علامت پرشدگی زودرس وریدی: اپاسیفیکاسیون زودرس ورید کبدی یا ورید پورت تخلیه‌کننده"],
        ["اطراف ضایعه در فاز شریانی", "هیپرپرفیوژن گذرای گوه‌ای‌شکل (THAD/THID)"],
        ["پورتال/تأخیری", "الگوی فاز را در زمینهٔ کیس ارزیابی کنید؛ مونتاژ PDF انتساب مطمئن را ممکن نمی‌کند."]
      ],
      "irisTitle": "پرشدگی زودرس وریدی به‌جای پرشدگی ضایعه",
      "irisText": "برخلاف تومورهای هیپرواسکولار مانند FNH یا HCC، در AVM نکته اصلی تقویت پس از تزریق یک توده نیست بلکه اپاسیفیکاسیون زودرس عروق وریدی تخلیه‌کننده در فاز شریانی است - یعنی علامت پرشدگی زودرس وریدی.",
      "key": "علامت پرشدگی زودرس وریدی - اپاسیفیکاسیون زودرس وریدی در فاز شریانی - مهم‌ترین نشانه CT برای AVM کبدی است."
    },
    "mri": {
      "title": "تشخیص در MRI",
      "lead": "MRI عروق با جریان سریع AVM را مستقیماً به‌صورت ساختارهای بدون سیگنال نشان می‌دهد و اطلاعات دینامیک CT را تکمیل می‌کند.",
      "tableHeaders": ["سکانس", "یافته تیپیک", "معنای عملی"],
      "tableRows": [
        ["T1/T2", "ساختارهای سرپیژینوس بدون سیگنال (فقدان سیگنال جریان (flow void))", "نشانه عروق متسع با جریان بالا"],
        ["DWI (کیس PDF)", "طبیعی گزارش شده است", "گزارش یک کیس؛ آن را به‌صورت معیار رد تعمیم ندهید"],
        ["T1 C+ شریانی", "علامت پرشدگی زودرس وریدی ورید تخلیه‌کننده", "یافته کلیدی، مشابه CT"],
        ["اطراف ضایعه در فاز شریانی", "THAD/THID - هایپراینتنسیتی گذرا", "می‌تواند یک ضایعه هیپرواسکولار را تقلید کند"],
        ["پورتال/تأخیری (کیس PDF)", "طبق PDF جذب زودرس شریانی و سپس wash-out", "ساختار هدف و تطبیق فازها در تصویر نامشخص است"]
      ],
      "lightBulbTitle": "فقدان سیگنال جریان (flow void) به‌عنوان یافته کلیدی",
      "lightBulbText": "جریان سریع خون باعث ایجاد ساختارهای سرپیژینوس بدون سیگنال (فقدان سیگنال جریان (flow void)) در سکانس‌های T1 و T2 می‌شود - نشانه مستقیم عروق متسع با جریان بالا در محل AVM.",
      "dwiTitle": "تفسیر درست THAD/THID",
      "dwiText": "هیپرپرفیوژن/هایپراینتنسیتی گذرای گوه‌ای‌شکل اطراف یک AVM (THAD/THID) می‌تواند یک توده هیپرواسکولار مانند FNH یا HCC را تقلید کند. نکته کلیدی، اثبات شانت زمینه‌ای با پرشدگی زودرس وریدی است.",
      "key": "فقدان سیگنال جریان (flow void) + علامت پرشدگی زودرس وریدی + احتمال THAD/THID = الگوی تیپیک MRI برای AVM کبدی."
    },
    "hht": {
      "title": "درگیری کبدی مرتبط با HHT",
      "lead": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu) مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد و منتشر کبدی است.",
      "tableHeaders": ["ویژگی", "یافته در درگیری کبدی HHT"],
      "tableRows": [
        ["الگوی عروقی", "شانت‌های متعدد و منتشر آرتریوپورتال، آرتریوونوس و پورتوسیستمیک"],
        ["شریان کبدی", "به‌طور قابل توجهی متسع و پیچ‌خورده، اغلب با تغییر ناگهانی کالیبر"],
        ["پارانشیم", "تقویت شریانی منتشر و لکه‌ای به دلیل تلانژکتازی‌های کوچک متعدد"],
        ["عارضه بالینی", "نارسایی قلبی با برون‌ده بالا، هیپرتانسیون پورت، ایسکمی صفراوی"]
      ],
      "cave": "شریان کبدی به‌طور قابل توجهی متسع و پیچ‌خورده همراه با تقویت شریانی منتشر و لکه‌ای و شانت‌های متعدد، به‌شدت به نفع درگیری کبدی HHT است - بررسی بین‌رشته‌ای (قلب، گاستروانترولوژی/هپاتولوژی) ضروری است.",
      "key": "HHT مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد کبدی است و می‌تواند از طریق افزایش برون‌ده قلبی به نارسایی قلبی با برون‌ده بالا و از طریق شانت آرتریوپورتال به هیپرتانسیون پورت منجر شود."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین نکات برای گزارش‌نویسی.",
      "items": [
        { "title": "تعریف", "text": "ارتباط مستقیم شریانی-وریدی غیرطبیعی بدون بستر مویرگی، با ویژگی جریان بالا و مقاومت پایین." },
        { "title": "ارتباط‌های شانت", "text": "آرتریوپورتال، آرتریوونوس یا پورتوسیستمیک؛ نوع را از روی عروقی که زودتر اپاسیفه می‌شوند تعیین کنید." },
        { "title": "علائم کلیدی", "text": "علامت پرشدگی زودرس وریدی (اپاسیفیکاسیون زودرس وریدی) و THAD/THID مهم‌ترین نشانه‌های CT/MRI هستند." },
        { "title": "HHT", "text": "مهم‌ترین علت کنژنیتال شانت‌های متعدد؛ می‌تواند نارسایی قلبی با برون‌ده بالا و هیپرتانسیون پورت ایجاد کند." }
      ]
    }
  }
}


const CASE_COPY = {
  de: {
    label: 'Fallbeispiele',
    title: 'Fallbeispiele',
    lead: 'Ein ausgewähltes Mehrphasen-CT und ein ergänzender Fall zu HHT.',
    openCase: 'Radiopaedia-Seite öffnen',
    cases: [
      {
        title: 'Radiopaedia-Fall: HHT mit Leberbeteiligung',
        label: 'HHT',
        meta: 'Externer Fallverweis. Bilder und Fallbeschreibung sind auf der Originalseite zu prüfen.',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
  en: {
    label: 'Cases',
    title: 'Cases',
    lead: 'A selected multiphase CT case and a supplementary HHT case.',
    openCase: 'Open Radiopaedia page',
    cases: [
      {
        title: 'Radiopaedia case: HHT with liver involvement',
        label: 'HHT',
        meta: 'External case link. Check images and case description on the original page.',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
  fa: {
    label: 'نمونه کیس‌ها',
    title: 'نمونه کیس‌ها',
    lead: 'یک کیس CT چندفازی و یک نمونهٔ تکمیلی از HHT.',
    openCase: 'باز کردن صفحهٔ Radiopaedia',
    cases: [
      {
        title: 'کیس Radiopaedia: HHT با درگیری کبد',
        label: 'HHT',
        meta: 'پیوند به کیس خارجی؛ تصاویر و شرح کیس را در صفحهٔ اصلی بررسی کنید.',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
}

const AVM_PDF_CASE = {
  de: { title: 'Abdomen.pdf p. 11: nichtdiagnostische Quellenabbildung', text: 'Die PDF berichtet normales DWI und frühe arterielle Kontrastmittelaufnahme mit anschließendem Wash-out. HCC wird als wichtige Differentialdiagnose genannt; zusätzlich soll man auf Leberzirrhose und die DWI-Sequenz achten. Das ist die Empfehlung der Kursfolie, keine unabhängig validierte Entscheidungsregel. Die acht CT-/MRT-Bilder werden hier nur als nichtdiagnostische Quellenabbildung gezeigt; sie sind nicht nach Phase oder Zielstruktur beschriftet. Daher bleibt offen, ob das Wash-out den Shunt oder eine separate Läsion betrifft; die Einzelbeobachtung ist keine allgemeine AVM-Regel.', alt: 'Nichtdiagnostische, unbeschriftete CT- und MRT-Montage aus Abdomen.pdf, physische Seite 11 (gedruckte Seite 10); keine Phasen- oder Zielstrukturzuordnung.', question: 'Was lässt sich aus Text und Abbildung sicher ableiten?', options: ['Wash-out beweist HCC und macht den Zirrhosekontext überflüssig.', 'Die PDF berichtet normales DWI und frühe arterielle Anreicherung mit Wash-out; sie empfiehlt, Zirrhosekontext und DWI zu beachten, aber die Bildserie identifiziert die Zielstruktur nicht.', 'Jede hepatische AVM zeigt Wash-out.'], answer: 'Richtig: Die Quelle nennt diese Befunde und den Zirrhose-/DWI-Kontext, aber die Abbildung ordnet das Wash-out keiner Zielstruktur zu.' },
  en: { title: 'Abdomen.pdf p. 11: non-diagnostic source figure', text: 'The PDF reports normal DWI and early arterial enhancement followed by wash-out. It names HCC as an important differential and additionally advises considering cirrhosis and the DWI sequence. This is the slide’s advice, not an independently validated decision rule. The eight CT/MRI frames are shown only as a non-diagnostic source figure; they are not labelled by phase or target structure, so it remains unclear whether wash-out refers to the shunt or a separate lesion. This single observation is not a general AVM rule.', alt: 'Non-diagnostic, unlabelled CT and MRI montage from Abdomen.pdf, physical page 11 (printed page 10); no phase or target structure is assigned.', question: 'What can safely be concluded from text and figure?', options: ['Wash-out proves HCC and makes cirrhosis context irrelevant.', 'The PDF reports normal DWI and early arterial enhancement followed by wash-out; it advises considering cirrhosis and DWI, but the montage does not identify the target structure.', 'Every hepatic AVM shows wash-out.'], answer: 'Correct: the source reports those findings and the cirrhosis/DWI context, but the image does not assign wash-out to a specific target.' },
  fa: { title: 'Abdomen.pdf صفحهٔ ۱۱: تصویر منبعِ غیرتشخیصی', text: 'PDF، DWI طبیعی و جذب زودرس شریانی مادهٔ حاجب و سپس wash-out را گزارش می‌کند. HCC را تشخیص افتراقی مهم می‌داند و توجه به سیروز کبدی و سکانس DWI را نیز توصیه می‌کند. این توصیهٔ اسلاید است، نه قاعدهٔ تصمیم‌گیری که مستقلاً اعتبارسنجی شده باشد. هشت تصویر CT/MRI فقط به‌عنوان تصویر منبعِ غیرتشخیصی نمایش داده می‌شوند و بر اساس فاز یا ساختار هدف برچسب ندارند؛ بنابراین مشخص نیست wash-out به شانت مربوط است یا ضایعه‌ای جداگانه، و این مشاهدهٔ منفرد را نمی‌توان به همهٔ AVMها تعمیم داد.', alt: 'مونتاژ غیرتشخیصی و بدون برچسب CT/MRI از صفحهٔ فیزیکی ۱۱ (صفحهٔ چاپی ۱۰) Abdomen.pdf؛ فاز یا ساختار هدفی تعیین نشده است.', question: 'از متن و تصویر چه نتیجه‌ای را می‌توان با اطمینان گرفت؟', options: ['Wash-out، HCC را ثابت می‌کند و زمینهٔ سیروز اهمیتی ندارد.', 'PDF، DWI طبیعی و جذب زودرس شریانی و سپس wash-out را گزارش می‌کند؛ توجه به زمینهٔ سیروز و DWI را توصیه می‌کند، اما مونتاژ ساختار هدف را مشخص نمی‌کند.', 'همهٔ AVMهای کبدی wash-out نشان می‌دهند.'], answer: 'درست است: منبع این یافته‌ها و توجه به زمینهٔ سیروز/DWI را ذکر می‌کند، اما تصویر wash-out را به ساختار مشخصی نسبت نمی‌دهد.' },
}

const RADIOPAEDIA_AVM_CASE = {
  de: {
    title: 'Mehrphasen-CT: hepatische AVM',
    intro: 'Bei einer 85-jährigen Patientin mit abdomineller Distension war eine Läsion im rechten Leberlappen zuvor als Hämangiom bezeichnet worden. Vergleiche die arterielle und portalvenöse CT-Phase und achte auf die Gefäßstrukturen sowie die frühe Portalvenenopazifizierung.',
    labels: ['Arterielle Phase', 'Portalvenöse Phase'],
    finding: 'Beschrieben werden dilatierte, geschlängelte periphere Gefäßkanäle, eine hypertrophierte rechte Leberarterie und eine Opazifizierung der Portalvenenäste bereits in der arteriellen Phase – passend zu einem arterioportalen Shunt. Die Originalfallbeschreibung nennt eine hepatische AVM.',
    credit: 'Bilder: Fall von Adarsh Ad, Radiopaedia.org, rID 71969, CC BY-NC-SA 3.0.',
    link: 'Originalfall und Bildserie auf Radiopaedia öffnen',
    alt: ['Axiales CT in arterieller Phase aus dem Radiopaedia-Fall einer hepatischen AVM.', 'Axiales CT in portalvenöser Phase aus dem Radiopaedia-Fall einer hepatischen AVM.'],
    url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
  },
  en: {
    title: 'Multiphase CT: hepatic AVM',
    intro: 'An 85-year-old woman presented with abdominal distension. A right hepatic lobe lesion had previously been reported as a haemangioma. Compare the arterial and portal venous CT phases and look for the vascular channels and early portal-vein opacification.',
    labels: ['Arterial phase', 'Portal venous phase'],
    finding: 'The case describes dilated tortuous peripheral vascular channels, a hypertrophied right hepatic artery, and opacification of portal-vein branches during the arterial phase, consistent with an arterioportal shunt. The original case diagnosis is hepatic AVM.',
    credit: 'Images: case contributed by Adarsh Ad, Radiopaedia.org, rID 71969, CC BY-NC-SA 3.0.',
    link: 'Open the original Radiopaedia case and image series',
    alt: ['Axial arterial-phase CT from a Radiopaedia hepatic AVM case.', 'Axial portal-venous-phase CT from a Radiopaedia hepatic AVM case.'],
    url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
  },
  fa: {
    title: 'CT چندفازی: AVM کبدی',
    intro: 'بیمار خانمی ۸۵ ساله با اتساع شکم بود. در گزارش قبلی، ضایعهٔ لوب راست کبد همانژیوم تشخیص داده شده بود. فاز شریانی و ورید پورت CT را مقایسه کنید و به مجاری عروقی و اپاسیفیکاسیون زودرس ورید پورت توجه کنید.',
    labels: ['فاز شریانی', 'فاز ورید پورت'],
    finding: 'در شرح کیس، مجاری عروقی محیطیِ متسع و پیچ‌خورده، شریان کبدی راستِ هیپرتروفیه و اپاسیفیکاسیون شاخه‌های ورید پورت در فاز شریانی توصیف شده‌اند؛ الگویی سازگار با شانت آرتریوپورتال. تشخیص ثبت‌شده در کیس اصلی AVM کبدی است.',
    credit: 'تصاویر: کیس ارسالی Adarsh Ad، Radiopaedia.org، شناسهٔ rID 71969، مجوز CC BY-NC-SA 3.0.',
    link: 'باز کردن کیس و سری تصاویر اصلی در Radiopaedia',
    alt: ['CT اکسیال در فاز شریانی از کیس AVM کبدی در Radiopaedia.', 'CT اکسیال در فاز ورید پورت از کیس AVM کبدی در Radiopaedia.'],
    url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
  },
}

const RADIOPAEDIA_AVM_IMAGES = [
  '/avm-liver/radiopaedia-71969/arterial.jpeg',
  '/avm-liver/radiopaedia-71969/portal-venous.jpeg',
]

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(false), [id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

function ShuntDiagram({ lang }) {
  const labels = {
    de: { artery: 'Arterie', shunt: 'Direkter Shunt', capillary: 'Kein Kapillarbett', vein: 'Vene' },
    en: { artery: 'Artery', shunt: 'Direct shunt', capillary: 'No capillary bed', vein: 'Vein' },
    fa: { artery: 'شریان', shunt: 'شانت مستقیم', capillary: 'بدون بستر مویرگی', vein: 'ورید' },
  }[lang] || { artery: 'Artery', shunt: 'Direct shunt', capillary: 'No capillary bed', vein: 'Vein' }
  return (
    <div className={styles.shuntDiagram} role="img" aria-label={`${labels.artery} → ${labels.shunt} → ${labels.vein}; ${labels.capillary}`}>
      <svg viewBox="0 0 320 230" aria-hidden="true">
        <defs><marker id="avm-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="currentColor" /></marker></defs>
        <path d="M75 75 C125 75 125 75 165 75 S205 75 245 75" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" markerEnd="url(#avm-arrow)" />
        <circle cx="60" cy="75" r="27" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="3" />
        <circle cx="250" cy="75" r="27" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="3" />
        <path d="M105 150 H215" stroke="#d97706" strokeWidth="3" strokeDasharray="7 7" />
        <path d="M150 137 L170 163 M170 137 L150 163" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className={styles.shuntLabels}><strong>{labels.artery}</strong><strong>{labels.shunt}</strong><strong>{labels.vein}</strong></div>
      <span>{labels.capillary}</span>
    </div>
  )
}

export default function LeberAvmPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const caseCopy = CASE_COPY[lang] || CASE_COPY.de
  const radiopaediaCase = RADIOPAEDIA_AVM_CASE[lang] || RADIOPAEDIA_AVM_CASE.de
  const pageSections = useMemo(() => {
    const exists = copy.sections.some(section => section.id === 'fallbeispiele')
    if (exists) return copy.sections
    const takeHomeIndex = copy.sections.findIndex(section => section.id === 'takehome')
    const caseSection = { id: 'fallbeispiele', label: caseCopy.label, icon: '🧪' }
    if (takeHomeIndex === -1) return [...copy.sections, caseSection]
    return [...copy.sections.slice(0, takeHomeIndex), caseSection, ...copy.sections.slice(takeHomeIndex)]
  }, [copy.sections, caseCopy.label])
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(pageSections[0].id)
  const [pdfAnswer, setPdfAnswer] = useState(null)
  const pdfCase = AVM_PDF_CASE[lang] || AVM_PDF_CASE.de
  const { isRead, toggleRead, authError } = useLessonReadStatus('avm')
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const sectionIds = useMemo(() => pageSections.map(section => section.id), [pageSections])

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
    <LegacyLessonMigration lessonRoute="/abdomen/leber/avm" lessonId="/abdomen/leber/avm" lang={lang}>
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <LessonHero title={copy.title} lang={lang} visual={<ShuntDiagram lang={lang} />} />
        <div className={styles.actions}>
          <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=avm&from=${encodeURIComponent(withLang('/abdomen/leber/avm'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
          <Link href={withLang(`/flashcards/avm?from=${encodeURIComponent(withLang('/abdomen/leber/avm'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
        </div>
      </header>

      <div className={styles.readBar}>
        <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {pageSections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section migrationChapter id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <div className={styles.cardsGrid}>
              {copy.basics.items.map(item => (
                <div className={styles.infoCard} key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section migrationChapter id="sono" title={copy.sono.title} lead={copy.sono.lead}>
            <Table headers={copy.sono.tableHeaders} rows={copy.sono.tableRows} />
            <p className={styles.sourceLinks}>
              {lang === 'fa' ? 'مرجع الگوهای داپلر: ' : lang === 'en' ? 'Doppler waveform reference: ' : 'Referenz für Doppler-Wellenformen: '}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4579749/" target="_blank" rel="noopener noreferrer">Standards of the Polish Ultrasound Society: portal system and hepatic vessels</a>
            </p>
            <Callout label={copy.keyLabel}>{copy.sono.key}</Callout>
          </Section>

          <Section migrationChapter id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Table headers={copy.ct.tableHeaders} rows={copy.ct.tableRows} />
            <figure className={styles.sourceFigure}>
              <div className={styles.sourceFigureImage}><Image src="/educational/avm-liver/abdomen-p11-montage.svg" alt={pdfCase.alt} width={1191} height={985} sizes="(max-width: 760px) 100vw, 900px" unoptimized /></div>
              <figcaption><strong>{pdfCase.title}</strong><br />{pdfCase.text}<br /><a href="/educational/avm-liver/abdomen-p11.png" target="_blank" rel="noopener noreferrer">{lang === 'fa' ? 'باز کردن صفحهٔ کامل PDF' : lang === 'en' ? 'Open the full PDF slide' : 'Ganze PDF-Folie öffnen'}</a></figcaption>
            </figure>
            <div className={styles.sourceCheck}>
              <strong>{pdfCase.question}</strong>
              {pdfCase.options.map((option, index) => <button type="button" key={option} onClick={() => setPdfAnswer(index)} aria-pressed={pdfAnswer === index}>{option}</button>)}
              {pdfAnswer !== null && <p role="status">{pdfAnswer === 1 ? pdfCase.answer : (lang === 'fa' ? 'پاسخ درست گزینهٔ دوم است؛ تعمیم ندهید.' : lang === 'en' ? 'The second option is correct; do not generalise.' : 'Die zweite Aussage ist richtig; nicht verallgemeinern.')}</p>}
            </div>
            <div className={styles.highlightBox}>
              <h3>{copy.ct.irisTitle}</h3>
              <p>{copy.ct.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>

          <Section migrationChapter id="mrt" title={copy.mri.title} lead={copy.mri.lead}>
            <Table headers={copy.mri.tableHeaders} rows={copy.mri.tableRows} />
            <div className={styles.splitGrid}>
              <div className={styles.infoCard}>
                <h3>{copy.mri.lightBulbTitle}</h3>
                <p>{copy.mri.lightBulbText}</p>
              </div>
              <div className={styles.infoCard}>
                <h3>{copy.mri.dwiTitle}</h3>
                <p>{copy.mri.dwiText}</p>
              </div>
            </div>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>

          <Section migrationChapter id="hht" title={copy.hht.title} lead={copy.hht.lead}>
            <Table headers={copy.hht.tableHeaders} rows={copy.hht.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.hht.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.hht.key}</Callout>
            <p className={styles.sourceLinks}>
              {lang === 'fa' ? 'منابع تکمیلی: ' : lang === 'en' ? 'Supplementary sources: ' : 'Ergänzende Quellen: '}
              <a href="https://hhtguidelines.org/liver/" target="_blank" rel="noopener noreferrer">International HHT Guidelines — liver VMs</a>
              {' · '}
              <a href="https://doi.org/10.14309/ajg.0000000000000486" target="_blank" rel="noopener noreferrer">ACG Clinical Guideline: Disorders of the Hepatic and Mesenteric Circulation</a>
              {' · '}
              <a href="https://doi.org/10.1016/j.jhep.2025.08.001" target="_blank" rel="noopener noreferrer">EASL Clinical Practice Guidelines: Vascular diseases of the liver</a>
            </p>
          </Section>


          <Section migrationChapter id="fallbeispiele" title={caseCopy.title} lead={caseCopy.lead}>
            <article className={styles.radiopaediaCase}>
              <div className={styles.radiopaediaCaseIntro}>
                <h3>{radiopaediaCase.title}</h3>
                <p>{radiopaediaCase.intro}</p>
              </div>
              <div className={styles.radiopaediaPhaseGrid}>
                {RADIOPAEDIA_AVM_IMAGES.map((src, index) => (
                  <figure key={src}>
                    <Image src={src} alt={radiopaediaCase.alt[index]} width={480} height={480} sizes="(max-width: 680px) 100vw, 25vw" unoptimized />
                    <figcaption>{radiopaediaCase.labels[index]}</figcaption>
                  </figure>
                ))}
              </div>
              <p className={styles.radiopaediaCaseFinding}>{radiopaediaCase.finding}</p>
              <footer className={styles.radiopaediaCaseCredit}>{radiopaediaCase.credit} <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 3.0</a> · <a href={radiopaediaCase.url} target="_blank" rel="noopener noreferrer">{radiopaediaCase.link}</a></footer>
            </article>
            <div className={styles.caseGrid}>
              {caseCopy.cases.map(item => (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
                  <div className={styles.caseBody}>
                    <div className={styles.caseLabelRow}>
                      <span className={styles.caseLabel}>{item.label}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <strong>{caseCopy.openCase}</strong>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section migrationChapter id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <div className={styles.readBarBottom}>
            <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
          </div>
        </div>
      </div>
    </main>
    </LegacyLessonMigration>
  )
}
