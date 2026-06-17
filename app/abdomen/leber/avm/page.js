'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · AVM",
    "title": "Arteriovenöse Malformation (AVM) der Leber",
    "subtitle": "Shunt-Typen, Early-venous-filling-Zeichen und HHT-assoziierte Lebermanifestation in Doppler, CT und MRT",
    "sourceLabel": "Dr. Zia",
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
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "Arterioportal", "label": "häufigster Shunt-Typ", "text": "A. hepatica → Pfortaderast" },
      { "value": "Early venous filling", "label": "Schlüsselzeichen", "text": "vorzeitige Venenopazifikation arteriell" },
      { "value": "HHT", "label": "wichtigste kongenitale Ursache", "text": "Morbus Osler-Weber-Rendu" }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Eine arteriovenöse Malformation (AVM) der Leber ist eine abnorme direkte Verbindung zwischen einer Arterie und einem venösen Gefäß ohne zwischengeschaltetes Kapillarbett. Dadurch entsteht ein Hochfluss-Shunt mit niedrigem Widerstand.",
      "items": [
        { "title": "Definition", "text": "Direkte AV-Verbindung ohne Kapillarbett mit Hochfluss-Niedrigwiderstand-Charakteristik." },
        { "title": "Einteilung", "text": "Arterioportal (häufigster Typ, A. hepatica–Pfortaderast), arteriovenös (A. hepatica–Lebervene) und portosystemisch (Pfortader–Lebervene)." },
        { "title": "Ätiologie", "text": "Kongenital (v. a. HHT/Morbus Osler-Weber-Rendu) oder erworben (iatrogen nach Biopsie/TIPS, traumatisch, tumor- oder zirrhoseassoziiert)." }
      ],
      "key": "Eine AVM ist eine direkte AV-Kurzschlussverbindung ohne Kapillarbett. Arterioportale Shunts sind am häufigsten, HHT ist die wichtigste kongenitale Ursache multipler Shunts."
    },
    "sono": {
      "title": "Sonographie & Doppler",
      "lead": "Im B-Bild ist eine hepatische AVM oft unauffällig oder nur durch eine dezente Architekturstörung erkennbar. Der entscheidende Hinweis kommt aus dem Doppler.",
      "tableHeaders": ["Merkmal", "Typischer Befund"],
      "tableRows": [
        ["B-Bild", "häufig unauffällig, ggf. dezente, unscharfe Architekturstörung"],
        ["Farbduplex", "auffällig buntes, turbulentes Flusssignal im betroffenen Areal"],
        ["Spektraldoppler (Arterie)", "deutlich erniedrigter Widerstandsindex (RI), hohe diastolische Flussgeschwindigkeit"],
        ["Spektraldoppler (Vene/Pfortader)", "pulsatiler, arterialisierter Fluss statt normaler kontinuierlicher Fluss"]
      ],
      "key": "Ein pulsatiles, arterialisiertes Flusssignal in einer Lebervene oder einem Pfortaderast bei gleichzeitig erniedrigtem RI der zuführenden Arterie ist hochverdächtig auf einen AV-Shunt."
    },
    "ct": {
      "title": "CT-Diagnostik",
      "lead": "Das CT zeigt das Leitzeichen der hepatischen AVM besonders deutlich in der frühen arteriellen Phase.",
      "tableHeaders": ["Phase", "Befund"],
      "tableRows": [
        ["Nativ", "meist unauffällig, Läsion selbst oft nicht abgrenzbar"],
        ["Früharteriell", "Early venous filling sign: vorzeitige Kontrastierung der drainierenden Lebervene oder Pfortader"],
        ["Periläsional arteriell", "keilförmige transiente Hyperperfusion (THAD/THID)"],
        ["Portalvenös/spät", "rasche Angleichung, kein persistierendes Wash-out wie bei hypervaskulären Tumoren"]
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
        ["T1 C+ arteriell", "Early venous filling sign der drainierenden Vene", "Schlüsselbefund, analog zur CT"],
        ["Periläsional arteriell", "THAD/THID – transiente Hyperintensität", "kann hypervaskuläre Läsion imitieren"],
        ["Portalvenös/spät", "rasche Angleichung an das Leberparenchym", "kein relevantes Wash-out"]
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
        { "title": "Häufigster Typ", "text": "Arterioportale Shunts (A. hepatica–Pfortaderast) sind am häufigsten." },
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
    "subtitle": "Shunt types, the early venous filling sign and HHT-related liver involvement on Doppler, CT and MRI",
    "sourceLabel": "Dr. Zia",
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
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "Arterioportal", "label": "most common shunt type", "text": "hepatic artery → portal vein branch" },
      { "value": "Early venous filling", "label": "key sign", "text": "premature arterial venous opacification" },
      { "value": "HHT", "label": "most important congenital cause", "text": "Osler-Weber-Rendu disease" }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "A hepatic arteriovenous malformation (AVM) is an abnormal direct connection between an artery and a venous vessel without an intervening capillary bed, creating a high-flow, low-resistance shunt.",
      "items": [
        { "title": "Definition", "text": "Direct AV connection without a capillary bed, with high-flow, low-resistance characteristics." },
        { "title": "Classification", "text": "Arterioportal (most common, hepatic artery to portal vein branch), arteriovenous (hepatic artery to hepatic vein) and portosystemic (portal vein to hepatic vein)." },
        { "title": "Aetiology", "text": "Congenital (especially HHT/Osler-Weber-Rendu disease) or acquired (iatrogenic after biopsy/TIPS, traumatic, or tumour- or cirrhosis-associated)." }
      ],
      "key": "An AVM is a direct AV short-circuit without a capillary bed. Arterioportal shunts are the most common, and HHT is the most important congenital cause of multiple shunts."
    },
    "sono": {
      "title": "Ultrasound & Doppler",
      "lead": "On grey-scale ultrasound, a hepatic AVM is often inconspicuous or shows only subtle architectural distortion. The key clue comes from Doppler.",
      "tableHeaders": ["Feature", "Typical finding"],
      "tableRows": [
        ["Grey-scale", "often unremarkable, possibly subtle, ill-defined architectural distortion"],
        ["Colour Doppler", "conspicuous, colourful, turbulent flow signal in the affected area"],
        ["Spectral Doppler (artery)", "markedly decreased resistive index (RI), high diastolic flow velocity"],
        ["Spectral Doppler (vein/portal vein)", "pulsatile, arterialised flow instead of normal continuous flow"]
      ],
      "key": "A pulsatile, arterialised flow signal in a hepatic vein or portal vein branch together with a decreased RI of the feeding artery is highly suspicious for an AV shunt."
    },
    "ct": {
      "title": "CT diagnosis",
      "lead": "CT shows the key sign of a hepatic AVM particularly well in the early arterial phase.",
      "tableHeaders": ["Phase", "Finding"],
      "tableRows": [
        ["Non-contrast", "usually unremarkable, the lesion itself often not delineable"],
        ["Early arterial", "early venous filling sign: premature opacification of the draining hepatic vein or portal vein"],
        ["Perilesional arterial", "wedge-shaped transient hyperperfusion (THAD/THID)"],
        ["Portal venous/delayed", "rapid equalisation, no persistent wash-out as seen with hypervascular tumours"]
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
        ["T1 C+ arterial", "early venous filling sign of the draining vein", "key finding, analogous to CT"],
        ["Perilesional arterial", "THAD/THID – transient hyperintensity", "can mimic a hypervascular lesion"],
        ["Portal venous/delayed", "rapid equalisation with liver parenchyma", "no relevant wash-out"]
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
        { "title": "Most common type", "text": "Arterioportal shunts (hepatic artery to portal vein branch) are the most common." },
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
    "subtitle": "انواع شانت، علامت Early venous filling و درگیری کبدی HHT در داپلر، CT و MRI",
    "sourceLabel": "Dr. Zia",
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
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "آرتریوپورتال", "label": "شایع‌ترین نوع شانت", "text": "شریان کبدی ← شاخه ورید پورت" },
      { "value": "Early venous filling", "label": "علامت کلیدی", "text": "اپاسیفیکاسیون زودرس وریدی در فاز شریانی" },
      { "value": "HHT", "label": "مهم‌ترین علت کنژنیتال", "text": "بیماری Osler-Weber-Rendu" }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "مالفورماسیون شریانی-وریدی (AVM) کبد یک ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط است که یک شانت پرفشار با مقاومت پایین ایجاد می‌کند.",
      "items": [
        { "title": "تعریف", "text": "ارتباط مستقیم شریانی-وریدی بدون بستر مویرگی با ویژگی جریان بالا و مقاومت پایین." },
        { "title": "طبقه‌بندی", "text": "آرتریوپورتال (شایع‌ترین نوع، شریان کبدی به شاخه ورید پورت)، آرتریوونوس (شریان کبدی به ورید کبدی) و پورتوسیستمیک (ورید پورت به ورید کبدی)." },
        { "title": "اتیولوژی", "text": "کنژنیتال (به‌ویژه HHT/بیماری Osler-Weber-Rendu) یا اکتسابی (ایاتروژنیک پس از بیوپسی/TIPS، تروماتیک یا مرتبط با تومور/سیروز)." }
      ],
      "key": "AVM یک ارتباط مستقیم شریانی-وریدی بدون بستر مویرگی است. شانت‌های آرتریوپورتال شایع‌ترین هستند و HHT مهم‌ترین علت کنژنیتال شانت‌های متعدد است."
    },
    "sono": {
      "title": "سونوگرافی و داپلر",
      "lead": "در تصویر B-mode، AVM کبدی اغلب بدون یافته خاص است یا فقط با تغییر خفیف معماری بافت همراه است. نکته کلیدی از داپلر به‌دست می‌آید.",
      "tableHeaders": ["ویژگی", "یافته تیپیک"],
      "tableRows": [
        ["B-mode", "اغلب بدون یافته خاص، احتمالاً تغییر معماری خفیف و نامشخص"],
        ["داپلر رنگی", "سیگنال جریان رنگی و توربولانس قابل توجه در ناحیه درگیر"],
        ["داپلر اسپکترال (شریان)", "کاهش قابل توجه اندکس مقاومتی (RI) و سرعت دیاستولیک بالا"],
        ["داپلر اسپکترال (ورید/ورید پورت)", "جریان پولساتیل و آرتریالیزه به‌جای جریان پیوسته طبیعی"]
      ],
      "key": "سیگنال جریان پولساتیل و آرتریالیزه در یک ورید کبدی یا شاخه ورید پورت همراه با کاهش RI شریان تغذیه‌کننده، به‌شدت به نفع شانت شریانی-وریدی است."
    },
    "ct": {
      "title": "تشخیص در CT",
      "lead": "CT علامت کلیدی AVM کبدی را به‌ویژه در فاز شریانی زودرس به‌خوبی نشان می‌دهد.",
      "tableHeaders": ["فاز", "یافته"],
      "tableRows": [
        ["بدون کنتراست", "معمولاً بدون یافته خاص، خود ضایعه اغلب قابل تشخیص نیست"],
        ["شریانی زودرس", "Early venous filling sign: اپاسیفیکاسیون زودرس ورید کبدی یا ورید پورت تخلیه‌کننده"],
        ["اطراف ضایعه در فاز شریانی", "هیپرپرفیوژن گذرای گوه‌ای‌شکل (THAD/THID)"],
        ["پورتال/تأخیری", "تطابق سریع، بدون wash-out پایدار مانند تومورهای هیپرواسکولار"]
      ],
      "irisTitle": "Early venous filling به‌جای پرشدگی ضایعه",
      "irisText": "برخلاف تومورهای هیپرواسکولار مانند FNH یا HCC، در AVM نکته اصلی enhancement یک توده نیست بلکه اپاسیفیکاسیون زودرس عروق وریدی تخلیه‌کننده در فاز شریانی است - یعنی Early venous filling sign.",
      "key": "Early venous filling sign - اپاسیفیکاسیون زودرس وریدی در فاز شریانی - مهم‌ترین نشانه CT برای AVM کبدی است."
    },
    "mri": {
      "title": "تشخیص در MRI",
      "lead": "MRI عروق با جریان سریع AVM را مستقیماً به‌صورت ساختارهای بدون سیگنال نشان می‌دهد و اطلاعات دینامیک CT را تکمیل می‌کند.",
      "tableHeaders": ["سکانس", "یافته تیپیک", "معنای عملی"],
      "tableRows": [
        ["T1/T2", "ساختارهای سرپیژینوس بدون سیگنال (Flow voids)", "نشانه عروق متسع با جریان بالا"],
        ["T1 C+ شریانی", "Early venous filling sign ورید تخلیه‌کننده", "یافته کلیدی، مشابه CT"],
        ["اطراف ضایعه در فاز شریانی", "THAD/THID - هایپراینتنسیتی گذرا", "می‌تواند یک ضایعه هیپرواسکولار را تقلید کند"],
        ["پورتال/تأخیری", "تطابق سریع با پارانشیم کبد", "بدون wash-out قابل توجه"]
      ],
      "lightBulbTitle": "Flow voids به‌عنوان یافته کلیدی",
      "lightBulbText": "جریان سریع خون باعث ایجاد ساختارهای سرپیژینوس بدون سیگنال (Flow voids) در سکانس‌های T1 و T2 می‌شود - نشانه مستقیم عروق متسع با جریان بالا در محل AVM.",
      "dwiTitle": "تفسیر درست THAD/THID",
      "dwiText": "هیپرپرفیوژن/هایپراینتنسیتی گذرای گوه‌ای‌شکل اطراف یک AVM (THAD/THID) می‌تواند یک توده هیپرواسکولار مانند FNH یا HCC را تقلید کند. نکته کلیدی، اثبات شانت زمینه‌ای با Early venous filling است.",
      "key": "Flow voids + Early venous filling sign + احتمال THAD/THID = الگوی تیپیک MRI برای AVM کبدی."
    },
    "hht": {
      "title": "درگیری کبدی مرتبط با HHT",
      "lead": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu) مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد و منتشر کبدی است.",
      "tableHeaders": ["ویژگی", "یافته در درگیری کبدی HHT"],
      "tableRows": [
        ["الگوی عروقی", "شانت‌های متعدد و منتشر آرتریوپورتال، آرتریوونوس و پورتوسیستمیک"],
        ["شریان کبدی", "به‌طور قابل توجهی متسع و پیچ‌خورده، اغلب با تغییر ناگهانی کالیبر"],
        ["پارانشیم", "enhancement شریانی منتشر و لکه‌ای به دلیل تلانژکتازی‌های کوچک متعدد"],
        ["عارضه بالینی", "نارسایی قلبی با برون‌ده بالا، هیپرتانسیون پورت، ایسکمی صفراوی"]
      ],
      "cave": "شریان کبدی به‌طور قابل توجهی متسع و پیچ‌خورده همراه با enhancement شریانی منتشر و لکه‌ای و شانت‌های متعدد، به‌شدت به نفع درگیری کبدی HHT است - بررسی بین‌رشته‌ای (قلب، گاستروانترولوژی/هپاتولوژی) ضروری است.",
      "key": "HHT مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد کبدی است و می‌تواند از طریق افزایش برون‌ده قلبی به نارسایی قلبی با برون‌ده بالا و از طریق شانت آرتریوپورتال به هیپرتانسیون پورت منجر شود."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین نکات برای گزارش‌نویسی.",
      "items": [
        { "title": "تعریف", "text": "ارتباط مستقیم شریانی-وریدی غیرطبیعی بدون بستر مویرگی، با ویژگی جریان بالا و مقاومت پایین." },
        { "title": "شایع‌ترین نوع", "text": "شانت‌های آرتریوپورتال (شریان کبدی به شاخه ورید پورت) شایع‌ترین نوع هستند." },
        { "title": "علائم کلیدی", "text": "Early venous filling sign (اپاسیفیکاسیون زودرس وریدی) و THAD/THID مهم‌ترین نشانه‌های CT/MRI هستند." },
        { "title": "HHT", "text": "مهم‌ترین علت کنژنیتال شانت‌های متعدد؛ می‌تواند نارسایی قلبی با برون‌ده بالا و هیپرتانسیون پورت ایجاد کند." }
      ]
    }
  }
}


const CASE_COPY = {
  de: {
    label: 'Fallbeispiele',
    title: 'Fallbeispiele',
    lead: 'Echte Fälle von Radiopaedia.org zur hepatischen AVM und zur HHT-Leberbeteiligung.',
    openCase: 'Fall in Radiopaedia öffnen',
    cases: [
      {
        title: 'Hepatische AVM bei 85-jähriger Patientin',
        label: 'AVM',
        tags: ['CT', 'Early venous filling'],
        icon: '🩸',
        meta: 'Zuvor als Hämangiom fehlgedeutete Läsion mit nodulärer peripherer Anreicherung in der portalvenösen Phase.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
      },
      {
        title: 'Hereditäre hämorrhagische Teleangiektasie (HHT) der Leber',
        label: 'HHT',
        tags: ['CT', 'Diffuse Teleangiektasien'],
        icon: '🧬',
        meta: 'Diffuses arterielles Hyperenhancement mit unzähligen Teleangiektasien und massiv dilatierter, geschlängelter A. hepatica.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
  en: {
    label: 'Cases',
    title: 'Cases',
    lead: 'Real cases from Radiopaedia.org on hepatic AVM and HHT liver involvement.',
    openCase: 'Open case in Radiopaedia',
    cases: [
      {
        title: 'Hepatic AVM in an 85-year-old patient',
        label: 'AVM',
        tags: ['CT', 'Early venous filling'],
        icon: '🩸',
        meta: 'A lesion previously misdiagnosed as a haemangioma, with nodular peripheral enhancement in the portal venous phase.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
      },
      {
        title: 'Hereditary haemorrhagic telangiectasia (HHT) of the liver',
        label: 'HHT',
        tags: ['CT', 'Diffuse telangiectasias'],
        icon: '🧬',
        meta: 'Diffuse arterial hyperenhancement with innumerable telangiectasias and a markedly dilated, tortuous hepatic artery.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
  fa: {
    label: 'نمونه کیس‌ها',
    title: 'نمونه کیس‌ها',
    lead: 'کیس‌های واقعی از Radiopaedia.org درباره AVM کبدی و درگیری کبدی HHT.',
    openCase: 'باز کردن کیس در Radiopaedia',
    cases: [
      {
        title: 'AVM کبدی در بیمار خانم ۸۵ ساله',
        label: 'AVM',
        tags: ['CT', 'Early venous filling'],
        icon: '🩸',
        meta: 'ضایعه‌ای که قبلاً به‌اشتباه همانژیوم تشخیص داده شده بود، با enhancement ندولار محیطی در فاز پورتال.',
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hepatic-arteriovenous-malformation-1',
      },
      {
        title: 'تلانژکتازی هموراژیک ارثی (HHT) کبد',
        label: 'HHT',
        tags: ['CT', 'تلانژکتازی منتشر'],
        icon: '🧬',
        meta: 'enhancement شریانی منتشر با تلانژکتازی‌های بی‌شمار و شریان کبدی به‌شدت متسع و پیچ‌خورده.',
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/cases/hereditary-haemorrhagic-telangiectasia-liver-1',
      },
    ],
  },
}

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
  useEffect(() => setOpen(!isMobile), [isMobile, id])
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

export default function LeberAvmPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const caseCopy = CASE_COPY[lang] || CASE_COPY.de
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
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=avm&from=${encodeURIComponent(withLang('/abdomen/leber/avm'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/avm?from=${encodeURIComponent(withLang('/abdomen/leber/avm'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
                <small>{card.text}</small>
              </div>
            ))}
          </div>
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
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
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

          <Section id="sono" title={copy.sono.title} lead={copy.sono.lead}>
            <Table headers={copy.sono.tableHeaders} rows={copy.sono.tableRows} />
            <Callout label={copy.keyLabel}>{copy.sono.key}</Callout>
          </Section>

          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Table headers={copy.ct.tableHeaders} rows={copy.ct.tableRows} />
            <div className={styles.highlightBox}>
              <h3>{copy.ct.irisTitle}</h3>
              <p>{copy.ct.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>

          <Section id="mrt" title={copy.mri.title} lead={copy.mri.lead}>
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

          <Section id="hht" title={copy.hht.title} lead={copy.hht.lead}>
            <Table headers={copy.hht.tableHeaders} rows={copy.hht.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.hht.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.hht.key}</Callout>
          </Section>


          <Section id="fallbeispiele" title={caseCopy.title} lead={caseCopy.lead}>
            <div className={styles.caseGrid}>
              {caseCopy.cases.map(item => (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
                  <div className={styles.caseImage} aria-hidden="true">{item.icon}</div>
                  <div className={styles.caseBody}>
                    <div className={styles.caseLabelRow}>
                      <span className={styles.caseLabel}>{item.label}</span>
                      {item.tags?.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <small>{item.credit}</small>
                    <strong>{caseCopy.openCase}</strong>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
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
  )
}
