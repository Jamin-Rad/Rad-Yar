'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import styles from './page.module.css'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · FNH",
    "title": "Fokale noduläre Hyperplasie (FNH)",
    "subtitle": "Typische und atypische Bildgebung in Sonographie, CT und MRT",
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
      { "id": "atypisch", "label": "Atypische FNH", "icon": "⚠️" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "2.-häufigste", "label": "benigne Leberläsion", "text": "nach dem Hämangiom" },
      { "value": "Spoke-wheel", "label": "zentrales Gefäß + radiäre Äste", "text": "im Doppler" },
      { "value": "kein Wash-out", "label": "kräftige arterielle KM-Aufnahme", "text": "T1 C+ Muster" }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Die fokale noduläre Hyperplasie (FNH) ist eine benigne, regenerative Raumforderung der Leber. Sie ist meist asymptomatisch und erfordert in der Regel keine Therapie.",
      "items": [
        { "title": "Definition", "text": "Benigne, regenerative Raumforderung der Leber ohne Therapiebedarf." },
        { "title": "Epidemiologie", "text": "Nach dem Hämangiom die zweithäufigste gutartige Leberläsion, am ehesten bei jungen bis mittelalten Erwachsenen mit deutlicher Prädominanz bei Frauen." },
        { "title": "Typische Lage", "text": "Solitäre, meist gut abgrenzbare Raumforderung im Leberparenchym." }
      ],
      "key": "Die FNH ist meist ein Zufallsbefund. Entscheidend sind die kräftige homogene arterielle Kontrastmittelaufnahme ohne Wash-out und – wenn vorhanden – die zentrale Narbe."
    },
    "sono": {
      "title": "Sonographie",
      "lead": "In der Sonographie ist die FNH oft nur subtil von der übrigen Leber abgrenzbar.",
      "tableHeaders": ["Merkmal", "Typischer Befund"],
      "tableRows": [
        ["Begrenzung", "meist glatt begrenzt, rund"],
        ["Echogenität", "meist isoechogen bis leicht hypoechogen"],
        ["Doppler", "zentrales Gefäß mit radiären Gefäßästen (Spoke-wheel-Muster)"],
        ["Konsequenz", "bei unauffälligem Befund oft schwer abgrenzbar – MRT zur Charakterisierung"]
      ],
      "key": "Das Spoke-wheel-Muster im Doppler – ein zentrales Gefäß mit radiär abgehenden Ästen – ist ein hilfreicher, aber nicht beweisender Hinweis auf eine FNH."
    },
    "ct": {
      "title": "CT-Diagnostik",
      "lead": "In der CT ist die FNH meist nur diskret von der Leber abgrenzbar.",
      "tableHeaders": ["Phase", "Befund"],
      "tableRows": [
        ["Nativ", "meist iso- bis leicht hypodens zur Leber"],
        ["Früharteriell", "kräftige, homogene Kontrastmittelaufnahme"],
        ["Portalvenös/spät", "rasche Angleichung an das Leberparenchym, kein Wash-out"],
        ["Zentrale Narbe", "hypodens nativ, verzögerte Kontrastmittelaufnahme in der Spätphase"]
      ],
      "irisTitle": "Homogenes Enhancement statt Irisblende",
      "irisText": "Im Gegensatz zum Hämangiom füllt sich die FNH früharteriell rasch und homogen auf – ohne periphere noduläre Aufnahme und ohne zentripetale Auffüllung.",
      "key": "Eine Läsion, die früharteriell kräftig und homogen anflutet und sich anschließend dem Leberparenchym angleicht, ist verdächtig auf eine FNH."
    },
    "mri": {
      "title": "MRT-Diagnostik",
      "lead": "Die MRT ist die sensitivste Methode zur Charakterisierung der FNH, insbesondere durch den Nachweis der zentralen Narbe.",
      "tableHeaders": ["Sequenz", "Typischer Befund", "Praktische Bedeutung"],
      "tableRows": [
        ["T1 nativ", "iso- bis leicht hypointens zum Leberparenchym", "unspezifisch"],
        ["T2", "iso- bis leicht hyperintens zum Leberparenchym", "Läsion oft nur diskret abgrenzbar"],
        ["T1 C+ arteriell", "scharf abgrenzbare, homogene, kräftige Kontrastmittelaufnahme", "Schlüsselbefund"],
        ["T1 C+ portalvenös/spät", "fehlendes Wash-out, iso- bis leicht hyperintens", "unterscheidet FNH von malignen Läsionen"],
        ["Zentrale Narbe – T2", "hyperintens", "in ca. 70 % der Fälle"],
        ["Zentrale Narbe – T1 C+ spät", "verzögerte Kontrastmittelaufnahme", "charakteristisch, aber nicht obligat"]
      ],
      "lightBulbTitle": "Zentrale Narbe",
      "lightBulbText": "Die zentrale Narbe ist charakteristisch für die FNH (ca. 70 % der Fälle), aber nicht obligat. Sie erscheint hyperintens in T2 und hypointens in T1 und nimmt in der Spätphase verzögert Kontrastmittel auf.",
      "dwiTitle": "Fehlendes Wash-out richtig interpretieren",
      "dwiText": "Die kräftige arterielle Kontrastmittelaufnahme ohne nachfolgendes Wash-out unterscheidet die FNH von hypervaskularisierten malignen Läsionen wie dem HCC, die typischerweise ein Wash-out zeigen.",
      "key": "Kräftige homogene arterielle Kontrastmittelaufnahme + fehlendes Wash-out + ggf. zentrale Narbe = typisches Muster der FNH."
    },
    "atypical": {
      "title": "Atypische FNH",
      "lead": "Etwa 20 % der FNH zeigen ein atypisches Erscheinungsbild, das die Abgrenzung zu anderen Lebertumoren erschweren kann.",
      "tableHeaders": ["Merkmal", "Typische FNH", "Atypische FNH"],
      "tableRows": [
        ["Zentrale Narbe", "vorhanden (ca. 70 %)", "fehlt"],
        ["Erscheinungsbild", "homogen", "heterogen"],
        ["Kapsel", "keine echte Kapsel", "Pseudokapsel möglich"],
        ["Narbenanreicherung", "verzögerte KM-Aufnahme der Narbe", "fehlende Narbenanreicherung"],
        ["Fett", "kein intraläsionales Fett", "intraläsionales Fett möglich"]
      ],
      "cave": "Bei fehlender zentraler Narbe, heterogenem Erscheinungsbild, Pseudokapsel oder intraläsionalem Fett ist die Abgrenzung zu anderen Lebertumoren (z. B. Adenom, HCC) erschwert.",
      "key": "Atypische FNH (ca. 20 %) kann ohne zentrale Narbe auftreten oder ein heterogenes Erscheinungsbild, eine Pseudokapsel, fehlende Narbenanreicherung oder intraläsionales Fett zeigen."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Befundungsregeln für die Praxis.",
      "items": [
        { "title": "Definition", "text": "Benigne, regenerative Raumforderung der Leber, meist asymptomatisch, ohne Therapiebedarf." },
        { "title": "Kontrastmittelmuster", "text": "Kräftige, homogene arterielle KM-Aufnahme ohne Wash-out – das wichtigste Unterscheidungsmerkmal zu malignen Läsionen." },
        { "title": "Zentrale Narbe", "text": "Charakteristisch in ca. 70 % der Fälle, hyperintens in T2, hypointens in T1, mit verzögerter KM-Aufnahme – aber nicht obligat." },
        { "title": "Atypische FNH", "text": "In ca. 20 % ohne zentrale Narbe, heterogen, mit Pseudokapsel oder intraläsionalem Fett – erschwert die Differenzierung." }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Liver · FNH",
    "title": "Focal Nodular Hyperplasia (FNH)",
    "subtitle": "Typical and atypical imaging in ultrasound, CT and MRI",
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
      { "id": "atypisch", "label": "Atypical FNH", "icon": "⚠️" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "2nd most common", "label": "benign liver lesion", "text": "after haemangioma" },
      { "value": "Spoke-wheel", "label": "central vessel + radiating branches", "text": "on Doppler" },
      { "value": "no wash-out", "label": "strong arterial enhancement", "text": "T1 C+ pattern" }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "Focal nodular hyperplasia (FNH) is a benign, regenerative liver lesion. It is usually asymptomatic and generally does not require treatment.",
      "items": [
        { "title": "Definition", "text": "Benign, regenerative liver lesion that does not require treatment." },
        { "title": "Epidemiology", "text": "Second most common benign liver lesion after haemangioma, most often in young to middle-aged adults with a clear female predominance." },
        { "title": "Typical location", "text": "Solitary, usually well-defined lesion within the liver parenchyma." }
      ],
      "key": "FNH is usually an incidental finding. The key features are strong, homogeneous arterial enhancement without wash-out and, if present, a central scar."
    },
    "sono": {
      "title": "Ultrasound",
      "lead": "On ultrasound, FNH is often only subtly different from the surrounding liver.",
      "tableHeaders": ["Feature", "Typical finding"],
      "tableRows": [
        ["Margins", "usually well-defined, round"],
        ["Echogenicity", "usually isoechoic to mildly hypoechoic"],
        ["Doppler", "central vessel with radiating branches (spoke-wheel pattern)"],
        ["Consequence", "often hard to delineate when inconspicuous – MRI for characterisation"]
      ],
      "key": "The spoke-wheel pattern on Doppler – a central vessel with radiating branches – is a helpful but not definitive sign of FNH."
    },
    "ct": {
      "title": "CT diagnosis",
      "lead": "On CT, FNH is often only subtly different from the liver.",
      "tableHeaders": ["Phase", "Finding"],
      "tableRows": [
        ["Non-contrast", "usually iso- to mildly hypodense to the liver"],
        ["Early arterial", "strong, homogeneous enhancement"],
        ["Portal venous/delayed", "rapid equalisation with the liver parenchyma, no wash-out"],
        ["Central scar", "hypodense on non-contrast, delayed enhancement"]
      ],
      "irisTitle": "Homogeneous enhancement instead of iris diaphragm",
      "irisText": "Unlike haemangioma, FNH enhances rapidly and homogeneously in the early arterial phase – without peripheral nodular enhancement or centripetal fill-in.",
      "key": "A lesion that enhances strongly and homogeneously in the early arterial phase and then equalises with the liver parenchyma is suspicious for FNH."
    },
    "mri": {
      "title": "MRI diagnosis",
      "lead": "MRI is the most sensitive method for characterising FNH, particularly through detection of the central scar.",
      "tableHeaders": ["Sequence", "Typical finding", "Practical meaning"],
      "tableRows": [
        ["Native T1", "iso- to mildly hypointense to liver parenchyma", "non-specific"],
        ["T2", "iso- to mildly hyperintense to liver parenchyma", "lesion often only subtly visible"],
        ["T1 C+ arterial", "sharply defined, homogeneous, strong enhancement", "key finding"],
        ["T1 C+ portal venous/delayed", "no wash-out, iso- to mildly hyperintense", "distinguishes FNH from malignant lesions"],
        ["Central scar – T2", "hyperintense", "in about 70% of cases"],
        ["Central scar – T1 C+ delayed", "delayed enhancement", "characteristic but not obligatory"]
      ],
      "lightBulbTitle": "Central scar",
      "lightBulbText": "The central scar is characteristic of FNH (about 70% of cases) but not obligatory. It appears hyperintense on T2 and hypointense on T1, with delayed enhancement.",
      "dwiTitle": "Interpreting the absence of wash-out correctly",
      "dwiText": "Strong arterial enhancement without subsequent wash-out distinguishes FNH from hypervascular malignant lesions such as HCC, which typically show wash-out.",
      "key": "Strong homogeneous arterial enhancement + no wash-out + possible central scar = typical pattern of FNH."
    },
    "atypical": {
      "title": "Atypical FNH",
      "lead": "About 20% of FNH lesions show an atypical appearance that can make differentiation from other liver tumours difficult.",
      "tableHeaders": ["Feature", "Typical FNH", "Atypical FNH"],
      "tableRows": [
        ["Central scar", "present (~70%)", "absent"],
        ["Appearance", "homogeneous", "heterogeneous"],
        ["Capsule", "no true capsule", "pseudocapsule possible"],
        ["Scar enhancement", "delayed enhancement of the scar", "absent scar enhancement"],
        ["Fat", "no intralesional fat", "intralesional fat possible"]
      ],
      "cave": "Without a central scar, with a heterogeneous appearance, a pseudocapsule, or intralesional fat, differentiation from other liver tumours (e.g. adenoma, HCC) is more difficult.",
      "key": "Atypical FNH (~20%) may occur without a central scar or show a heterogeneous appearance, pseudocapsule, absent scar enhancement, or intralesional fat."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The most important reporting rules for practice.",
      "items": [
        { "title": "Definition", "text": "Benign, regenerative liver lesion, usually asymptomatic, without need for treatment." },
        { "title": "Enhancement pattern", "text": "Strong, homogeneous arterial enhancement without wash-out – the most important distinguishing feature from malignant lesions." },
        { "title": "Central scar", "text": "Characteristic in about 70% of cases, hyperintense on T2, hypointense on T1, with delayed enhancement – but not obligatory." },
        { "title": "Atypical FNH", "text": "In about 20% without a central scar, heterogeneous, with pseudocapsule or intralesional fat – makes differentiation more difficult." }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "کبد · FNH",
    "title": "هیپرپلازی ندولار فوکال (FNH)",
    "subtitle": "تصویربرداری تیپیک و آتیپیک در سونوگرافی، CT و MRI",
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
      { "id": "atypisch", "label": "FNH آتیپیک", "icon": "⚠️" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "دومین شایع‌ترین", "label": "ضایعه خوش‌خیم کبد", "text": "بعد از همانژیوم" },
      { "value": "Spoke-wheel", "label": "عروق مرکزی + شاخه‌های رادیال", "text": "در داپلر" },
      { "value": "بدون wash-out", "label": "enhancement شریانی قوی", "text": "الگوی T1 C+" }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "هیپرپلازی ندولار فوکال (FNH) یک ضایعه خوش‌خیم و رژنراتیو کبد است. معمولاً بدون علامت است و معمولاً نیاز به درمان ندارد.",
      "items": [
        { "title": "تعریف", "text": "ضایعه خوش‌خیم و رژنراتیو کبد که نیاز به درمان ندارد." },
        { "title": "اپیدمیولوژی", "text": "بعد از همانژیوم، دومین ضایعه خوش‌خیم شایع کبد؛ بیشتر در بالغین جوان تا میانسال با غلبه واضح در زنان." },
        { "title": "محل تیپیک", "text": "ضایعه منفرد و معمولاً خوش‌حد در پارانشیم کبد." }
      ],
      "key": "FNH معمولاً یافته اتفاقی است. نکته کلیدی، enhancement شریانی قوی و هموژن بدون wash-out و در صورت وجود، اسکار مرکزی است."
    },
    "sono": {
      "title": "سونوگرافی",
      "lead": "در سونوگرافی، FNH اغلب فقط به‌طور خفیف از بافت کبد قابل افتراق است.",
      "tableHeaders": ["ویژگی", "یافته تیپیک"],
      "tableRows": [
        ["حاشیه", "معمولاً واضح و گرد"],
        ["اکوژنیسیته", "معمولاً ایزواکوژن تا کمی هیپواکوژن"],
        ["داپلر", "عروق مرکزی با شاخه‌های رادیال (الگوی spoke-wheel)"],
        ["نتیجه", "اغلب با ظاهر غیراختصاصی، افتراق دشوار است – MRI برای کاراکتریزاسیون"]
      ],
      "key": "الگوی spoke-wheel در داپلر – یک عروق مرکزی با شاخه‌های رادیال – نشانه کمک‌کننده ولی غیرقطعی برای FNH است."
    },
    "ct": {
      "title": "تشخیص در CT",
      "lead": "در CT، FNH اغلب فقط به‌طور خفیف از کبد قابل افتراق است.",
      "tableHeaders": ["فاز", "یافته"],
      "tableRows": [
        ["بدون کنتراست", "معمولاً ایزودنس تا کمی هیپودنس نسبت به کبد"],
        ["شریانی زودرس", "enhancement قوی و هموژن"],
        ["پورتال/تأخیری", "تطابق سریع با پارانشیم کبد، بدون wash-out"],
        ["اسکار مرکزی", "هیپودنس در فاز بدون کنتراست، enhancement تأخیری"]
      ],
      "irisTitle": "enhancement هموژن به‌جای Iris diaphragm",
      "irisText": "برخلاف همانژیوم، FNH در فاز شریانی زودرس به‌سرعت و به‌صورت هموژن enhancement می‌یابد – بدون enhancement ندولار محیطی یا پرشدگی مرکزگرا.",
      "key": "ضایعه‌ای که در فاز شریانی زودرس enhancement قوی و هموژن دارد و سپس با پارانشیم کبد تطابق می‌یابد، به نفع FNH است."
    },
    "mri": {
      "title": "تشخیص در MRI",
      "lead": "MRI حساس‌ترین روش برای کاراکتریزاسیون FNH است، به‌ویژه از طریق شناسایی اسکار مرکزی.",
      "tableHeaders": ["سکانس", "یافته تیپیک", "معنای عملی"],
      "tableRows": [
        ["T1 نیتیو", "ایزو تا کمی هیپواینتنس نسبت به پارانشیم کبد", "غیراختصاصی"],
        ["T2", "ایزو تا کمی هایپراینتنس نسبت به پارانشیم کبد", "ضایعه اغلب فقط به‌طور خفیف قابل مشاهده است"],
        ["T1 C+ شریانی", "enhancement واضح، هموژن و قوی", "یافته کلیدی"],
        ["T1 C+ پورتال/تأخیری", "بدون wash-out، ایزو تا کمی هایپراینتنس", "افتراق FNH از ضایعات بدخیم"],
        ["اسکار مرکزی – T2", "هایپراینتنس", "حدود ۷۰٪ موارد"],
        ["اسکار مرکزی – T1 C+ تأخیری", "enhancement تأخیری", "تیپیک ولی غیرضروری"]
      ],
      "lightBulbTitle": "اسکار مرکزی",
      "lightBulbText": "اسکار مرکزی برای FNH تیپیک است (حدود ۷۰٪ موارد) اما الزامی نیست. در T2 هایپراینتنس و در T1 هیپواینتنس است و در فاز تأخیری enhancement تأخیری دارد.",
      "dwiTitle": "تفسیر درست نبود wash-out",
      "dwiText": "enhancement شریانی قوی بدون wash-out بعدی، FNH را از ضایعات بدخیم پرعروق مانند HCC که معمولاً wash-out دارند، افتراق می‌دهد.",
      "key": "enhancement شریانی قوی و هموژن + بدون wash-out + احتمال اسکار مرکزی = الگوی تیپیک FNH."
    },
    "atypical": {
      "title": "FNH آتیپیک",
      "lead": "حدود ۲۰٪ از موارد FNH ظاهر آتیپیک دارند که می‌تواند افتراق از سایر تومورهای کبدی را دشوار کند.",
      "tableHeaders": ["ویژگی", "FNH تیپیک", "FNH آتیپیک"],
      "tableRows": [
        ["اسکار مرکزی", "وجود دارد (~۷۰٪)", "وجود ندارد"],
        ["ظاهر", "هموژن", "هتروژن"],
        ["کپسول", "کپسول واقعی ندارد", "پسودوکپسول ممکن است"],
        ["enhancement اسکار", "enhancement تأخیری اسکار", "عدم enhancement اسکار"],
        ["چربی", "بدون چربی داخل ضایعه", "چربی داخل ضایعه ممکن است"]
      ],
      "cave": "در صورت نبود اسکار مرکزی، ظاهر هتروژن، پسودوکپسول یا چربی داخل ضایعه، افتراق از سایر تومورهای کبدی (مثل آدنوم، HCC) دشوارتر می‌شود.",
      "key": "FNH آتیپیک (~۲۰٪) ممکن است بدون اسکار مرکزی باشد یا ظاهر هتروژن، پسودوکپسول، عدم enhancement اسکار یا چربی داخل ضایعه نشان دهد."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین قوانین گزارش‌نویسی برای عمل روزمره.",
      "items": [
        { "title": "تعریف", "text": "ضایعه خوش‌خیم و رژنراتیو کبد، معمولاً بدون علامت، بدون نیاز به درمان." },
        { "title": "الگوی enhancement", "text": "enhancement شریانی قوی و هموژن بدون wash-out – مهم‌ترین ویژگی افتراقی از ضایعات بدخیم." },
        { "title": "اسکار مرکزی", "text": "تیپیک در حدود ۷۰٪ موارد، هایپراینتنس در T2، هیپواینتنس در T1، با enhancement تأخیری – ولی الزامی نیست." },
        { "title": "FNH آتیپیک", "text": "در حدود ۲۰٪ بدون اسکار مرکزی، هتروژن، با پسودوکپسول یا چربی داخل ضایعه – افتراق را دشوارتر می‌کند." }
      ]
    }
  }
}


const CASE_COPY = {
  de: {
    label: 'Fallbeispiele',
    title: 'Fallbeispiele',
    lead: 'Echte Fälle von Radiopaedia.org zur fokal nodulären Hyperplasie (FNH) und ihrer wichtigsten Differenzialdiagnose.',
    openCase: 'Fall in Radiopaedia öffnen',
    cases: [
      {
        title: 'Klassische FNH mit zentraler Narbe',
        label: 'FNH',
        tags: ['MRT', 'zentrale Narbe'],
        icon: '⭐',
        meta: 'Homogen arteriell hyperintense Läsion mit hyperintenser zentraler Narbe in T2 und verzögertem Enhancement der Narbe in der Spätphase.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'Differenzialdiagnose: hepatozelluläres Adenom',
        label: 'DD: Adenom',
        tags: ['MRT', 'Differenzialdiagnose'],
        icon: '🔬',
        meta: 'Im Gegensatz zur FNH häufig Washout in der Spätphase, keine zentrale Narbe und ggf. intratumorale Einblutung – wichtige Abgrenzung bei oraler Kontrazeption.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
      },
    ],
  },
  en: {
    label: 'Cases',
    title: 'Cases',
    lead: 'Real cases from Radiopaedia.org on focal nodular hyperplasia (FNH) and its key differential diagnosis.',
    openCase: 'Open case in Radiopaedia',
    cases: [
      {
        title: 'Classic FNH with central scar',
        label: 'FNH',
        tags: ['MRI', 'central scar'],
        icon: '⭐',
        meta: 'Homogeneous arterial hyperenhancement with a T2-hyperintense central scar showing delayed enhancement on the late phase.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'Differential diagnosis: hepatocellular adenoma',
        label: 'DD: adenoma',
        tags: ['MRI', 'differential diagnosis'],
        icon: '🔬',
        meta: 'Unlike FNH, adenomas often show washout on delayed phase, no central scar and may bleed – an important distinction in patients on oral contraceptives.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
      },
    ],
  },
  fa: {
    label: 'نمونه کیس‌ها',
    title: 'نمونه کیس‌ها',
    lead: 'کیس‌های واقعی از Radiopaedia.org درباره هیپرپلازی ندولار فوکال (FNH) و مهم‌ترین تشخیص افتراقی آن.',
    openCase: 'باز کردن کیس در Radiopaedia',
    cases: [
      {
        title: 'FNH تیپیک با اسکار مرکزی',
        label: 'FNH',
        tags: ['MRI', 'اسکار مرکزی'],
        icon: '⭐',
        meta: 'enhancement شریانی هموژن همراه با اسکار مرکزی هایپراینتنس در T2 و enhancement تأخیری اسکار در فاز دیر.',
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'تشخیص افتراقی: آدنوم هپاتوسلولار',
        label: 'افتراق: آدنوم',
        tags: ['MRI', 'تشخیص افتراقی'],
        icon: '🔬',
        meta: 'برخلاف FNH، آدنوم اغلب washout در فاز تأخیری دارد، اسکار مرکزی ندارد و ممکن است خونریزی داشته باشد - افتراق مهم در مصرف قرص‌های ضدبارداری.',
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
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
  const [open, setOpen] = useState(true)
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

export default function LeberFnhPage() {
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
  const { isRead, toggleRead, authError } = useLessonReadStatus('fnh')
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
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=fnh&from=${encodeURIComponent(withLang('/abdomen/leber/fnh'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/fnh?from=${encodeURIComponent(withLang('/abdomen/leber/fnh'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
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

          <Section id="atypisch" title={copy.atypical.title} lead={copy.atypical.lead}>
            <Table headers={copy.atypical.tableHeaders} rows={copy.atypical.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.atypical.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.atypical.key}</Callout>
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
