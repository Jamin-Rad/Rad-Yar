'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'

const COPY = {
  de: {
    crumbMsk: 'MSK',
    crumbKnee: 'Knie',
    badge: 'MRT · Knie',
    title: 'Knie-Ligamente',
    lead: 'Kompakte Lernseite zu den Kniebändern: Schweregrade, lateraler und medialer Kollateralbandkomplex, VKB-Ruptur, mukoide VKB-Degeneration und HKB-Ruptur.',
    quiz: 'MCQs üben',
    cards: 'Flashcards',
    markRead: 'Als gelesen markieren',
    markedRead: 'Gelesen',
    stats: [
      ['I-III', 'MRT-Schweregrade von Zerrung bis Komplettruptur'],
      ['VKB', 'häufigste Bandverletzung am Knie'],
      ['PLC', 'Arcuate Sign als Red Flag'],
    ],
    toc: 'Inhalt',
    nav: [
      ['grading', 'MRT-Grading'],
      ['lateral', 'Lateral / PLC'],
      ['medial', 'Medial / MCL'],
      ['acl', 'VKB'],
      ['pcl', 'HKB'],
      ['cases', 'Fallbeispiele'],
      ['takehome', 'Take-home'],
    ],
    sections: {
      grading: {
        title: 'Schweregradeinteilung von Bandverletzungen in MRT',
        lead: 'Die Grundlogik ist einfach: erst Kontur, dann intraligamentäres Signal, dann Diskontinuität beurteilen.',
        cards: [
          ['Grad I: Zerrung', ['Bandkontur vollständig erhalten.', 'Nur periligamentöses Ödem bzw. Flüssigkeitssaum um das dunkle Band.']],
          ['Grad II: Partialruptur', ['Band verdickt mit erhöhtem intraligamentösem Signal.', 'Teilweise Konturunterbrechung; einzelne Fasern bleiben durchgängig.']],
          ['Grad III: Komplettruptur', ['Vollständige Diskontinuität des Bandes.', 'Oft welliger Verlauf der Bandstümpfe durch fehlende Spannung.']],
        ],
      },
      lateral: {
        title: 'Lateraler Kollateralbandkomplex',
        lead: 'Zum lateralen Komplex gehören LCL, Biceps-femoris-Sehne, Popliteussehne und das Ligamentum arcuatum. Er stabilisiert vor allem gegen Varus-Stress und posterolaterale Instabilität.',
        cards: [
          ['LCL', ['Verläuft vom Epicondylus lateralis femoris zum Fibulaköpfchen.', 'Primärer Widerstand gegen Varus-Stress.']],
          ['Popliteus / Biceps femoris', ['Die Biceps-femoris-Sehne setzt am Fibulaköpfchen an.', 'Die Popliteussehne verläuft direkt lateral des Außenmeniskus, intraartikulär aber extrasynovial.']],
          ['Arcuate Sign', ['Avulsionsfraktur am Apex des Fibulaköpfchens.', 'Red Flag für schwere Verletzung des posterolateralen Eckpunkts.']],
        ],
        note: 'Merksatz: Segond-Fraktur an der Tibia spricht für VKB-Ruptur; Arcuate Sign an der Fibula spricht für posterolaterale Instabilität.',
      },
      medial: {
        title: 'Medialer Kollateralbandkomplex',
        lead: 'Der mediale Komplex besteht aus oberflächlichem und tiefem MCL, Posterior Oblique Ligament und dem Semimembranosus-Sehnenfächer.',
        cards: [
          ['Oberflächliches MCL', ['Ursprung am Epicondylus medialis femoris.', 'Ansatz etwa 5 cm distal der Gelenklinie an der Tibia, unter den Pes-anserinus-Sehnen.']],
          ['Tiefes MCL', ['Lokale Verdickung der Gelenkkapsel.', 'Enge Verbindung zum Innenmeniskus.']],
          ['POL', ['Liegt posterior zum oberflächlichen MCL.', 'Bei jeder MCL-Verletzung gezielt dorsal mitbeurteilen.']],
        ],
        note: 'Persistierende intraligamentäre Signalsteigerung nach MCL-Partialruptur kann über 12 Wochen hinaus als fibrovaskuläre Heilung sichtbar bleiben.',
      },
      acl: {
        title: 'Vorderes Kreuzband',
        lead: 'Das VKB liegt intraartikulär, aber extrasynovial, und zieht von lateral femoral nach medial tibial. Es besteht aus anteromedialem und posterolateralem Bündel.',
        cards: [
          ['Normale Bündelung', ['AM- und PL-Bündel verlaufen in Extension weitgehend parallel.', 'Feine streifige Signalanhebungen zwischen den Bündeln können physiologisch sein.']],
          ['VKB-Ruptur', ['Direkte Zeichen: Faserdiskontinuität, T2/PD-Signalsteigerung, flacher oder welliger Verlauf.', 'Indirekte Zeichen: Kissing contusions, anteriore Tibiasubluxation über 7 mm, gebogenes HKB.']],
          ['Mukoide Degeneration', ['Chronische Einlagerung von Glykosaminoglykanen zwischen die Fasern.', 'Sellerie-Zeichen: intakte dunkle Fasern in hellem T2-hyperintensem Schleimgewebe.']],
        ],
        note: 'Unhappy Triad: VKB-Ruptur, MCL-Ruptur und Innenmeniskusläsion nach Valgustrauma mit Außenrotation bei fixiertem Unterschenkel.',
      },
      pcl: {
        title: 'Hinteres Kreuzband',
        lead: 'Das HKB zieht von medial femoral nach lateral/posterior tibial. Es ist kräftiger und signalärmer als das VKB und hat kein zwischengelagertes Fett-/Synovialgewebe.',
        cards: [
          ['Epidemiologie', ['Isolierte HKB-Verletzungen sind selten.', 'Die HKB-Ruptur ist deutlich seltener als die VKB-Ruptur.']],
          ['Mechanismus', ['Typisch ist ein direkter anteriorer Anprall auf die Tibia bei gebeugtem Knie.', 'Klassisches Beispiel: Dashboard Injury; alternativ extreme Hyperflexion.']],
          ['MRT', ['Rupturiertes HKB erscheint oft verdickt, signalverändert oder diskontinuierlich.', 'Operative Rekonstruktion meist nur bei ausgeprägter Instabilität oder kombinierten Verletzungen.']],
        ],
      },
      cases: {
        title: 'Fallbeispiele',
        lead: 'Freier Platz für deine späteren Fallbeispiele und Hinweise, worauf man beim Befunden achten soll.',
        placeholders: [
          ['Fall 1', 'Hier kann später ein typischer VKB-Fall mit indirekten Zeichen, Knochenmarködem und Meniskuscheck ergänzt werden.'],
          ['Fall 2', 'Platz für MCL/POL oder PLC: Mechanismus, Schlüsselbild, Befundformulierung und Pitfall.'],
          ['Fall 3', 'Platz für HKB oder mukoide VKB-Degeneration mit Differenzialdiagnose zur Ruptur.'],
        ],
      },
      takehome: {
        title: 'Take-home Message',
        text: 'Freier Platz für deine finale Take-home Message. Vorschlag als Struktur: erst Grading, dann Komplexe, dann direkte und indirekte Rupturzeichen, zuletzt Pitfalls.',
      },
    },
    figures: {
      lateral: [
        ['/knieligamente/lateral-collateral-complex.png', 'Lateraler Kollateralbandkomplex: LCL, Popliteus und Biceps-femoris-Bezug.'],
        ['/knieligamente/lcl-biceps-v-sign.png', 'Sagittales V am Fibulaköpfchen: LCL anteromedial, Biceps-femoris-Sehne posterolateral.'],
        ['/knieligamente/lcl-followup-series.png', 'LCL-Verlauf von links nach rechts: initial, nach 3 Monaten, nach 6 Monaten und nach 24 Monaten. Das akute Umgebungsödem nimmt ab, die Bandkontinuität stellt sich wieder dar; eine milde intraligamentäre Signalhebung kann persistieren.'],
        ['/knieligamente/arcuate-sign.png', 'Arcuate Sign: Avulsion am Fibulaköpfchen als Hinweis auf PLC-Verletzung.'],
      ],
      medial: [
        ['/knieligamente/medial-complex-anatomy.png', 'Medialer Komplex mit MCL, POL und Semimembranosus-Anteilen.'],
        ['/knieligamente/mcl-layered-anatomy.png', 'Oberflächliches und tiefes MCL mit Nähe zum Innenmeniskus.'],
        ['/knieligamente/mcl-partial-followup.png', 'MCL-Partialruptur im Verlauf: Trauma, nach 6 Wochen und nach 12 Wochen. Das periligamentäre Ödem nimmt ab; eine narbige Verdickung bzw. intraligamentäre Signalhebung kann als Heilungszeichen verbleiben.'],
        ['/knieligamente/mcl-pol-rupture.png', 'MCL-Ruptur mit Beteiligung des POL in koronarer und axialer Darstellung.'],
      ],
      acl: [
        ['/knieligamente/acl-sagittal-anatomy.jpeg', 'VKB-Anatomie in sagittaler Orientierung.'],
        ['/knieligamente/acl-normal-signal.png', 'Normale Signalsteigerung zwischen AM- und PL-Bündel nicht als Teilruptur überwerten.'],
        ['/knieligamente/acl-kissing-contusions.png', 'Kissing contusions als indirektes Zeichen einer VKB-Ruptur.'],
        ['/knieligamente/acl-mucoid-degeneration.png', 'Mukoide VKB-Degeneration mit Sellerie-Zeichen.'],
      ],
      pcl: [
        ['/knieligamente/pcl-normal-views.png', 'Normales HKB in axialer und sagittaler Darstellung.'],
        ['/knieligamente/pcl-rupture-sagittal.jpeg', 'HKB-Ruptur: verdickte und signalveränderte Struktur.'],
        ['/knieligamente/pcl-rupture-marked.jpeg', 'Markierte HKB-Läsion in sagittaler MRT.'],
        ['/knieligamente/pcl-coronal.jpeg', 'Koronare HKB-Darstellung.'],
      ],
    },
  },
  en: {
    crumbMsk: 'MSK',
    crumbKnee: 'Knee',
    badge: 'MRI · Knee',
    title: 'Knee ligaments',
    lead: 'Compact lesson on knee ligaments: grading, lateral and medial collateral complexes, ACL tear, mucoid ACL degeneration and PCL tear.',
    quiz: 'Practice MCQs',
    cards: 'Flashcards',
    markRead: 'Mark as read',
    markedRead: 'Read',
    stats: [['I-III', 'MRI grading from sprain to complete tear'], ['ACL', 'most common knee ligament injury'], ['PLC', 'arcuate sign as red flag']],
    toc: 'Contents',
    nav: [['grading', 'MRI grading'], ['lateral', 'Lateral / PLC'], ['medial', 'Medial / MCL'], ['acl', 'ACL'], ['pcl', 'PCL'], ['cases', 'Cases'], ['takehome', 'Take-home']],
    sections: {},
    figures: {},
  },
  fa: {
    crumbMsk: 'MSK',
    crumbKnee: 'زانو',
    badge: 'MRI · زانو',
    title: 'رباط‌های زانو',
    lead: 'درس فشرده درباره رباط‌های زانو: درجه‌بندی، کمپلکس لترال و مدیال، پارگی ACL، دژنراسیون موکوئید ACL و پارگی PCL.',
    quiz: 'تمرین MCQ',
    cards: 'فلش‌کارت‌ها',
    markRead: 'علامت‌گذاری به عنوان خوانده‌شده',
    markedRead: 'خوانده شد',
    stats: [['I-III', 'درجه‌بندی MRI از کشیدگی تا پارگی کامل'], ['ACL', 'شایع‌ترین آسیب رباطی زانو'], ['PLC', 'Arcuate sign به عنوان هشدار مهم']],
    toc: 'محتوا',
    nav: [['grading', 'درجه‌بندی MRI'], ['lateral', 'لترال / PLC'], ['medial', 'مدیال / MCL'], ['acl', 'ACL'], ['pcl', 'PCL'], ['cases', 'کیس‌ها'], ['takehome', 'Take-home']],
    sections: {},
    figures: {},
  },
}

COPY.en.sections = {
  grading: {
    title: 'MRI grading of ligament injuries',
    lead: 'The basic logic is simple: first assess contour, then intraligamentous signal, then discontinuity.',
    cards: [
      ['Grade I: sprain', ['Ligament contour is completely preserved.', 'Only periligamentous oedema or a rim of fluid around the dark ligament.']],
      ['Grade II: partial tear', ['Ligament is thickened with increased intraligamentous signal.', 'Partial contour interruption; some fibres remain continuous.']],
      ['Grade III: complete tear', ['Complete ligament discontinuity.', 'Often a wavy appearance of the ligament ends due to loss of tension.']],
    ],
  },
  lateral: {
    title: 'Lateral collateral ligament complex',
    lead: 'The lateral complex includes the LCL, biceps femoris tendon, popliteus tendon and arcuate ligament. It mainly stabilises against varus stress and posterolateral instability.',
    cards: [
      ['LCL', ['Runs from the lateral femoral epicondyle to the fibular head.', 'Primary restraint against varus stress.']],
      ['Popliteus / biceps femoris', ['The biceps femoris tendon inserts at the fibular head.', 'The popliteus tendon runs directly lateral to the lateral meniscus, intra-articular but extrasynovial.']],
      ['Arcuate sign', ['Avulsion fracture at the apex of the fibular head.', 'Red flag for severe posterolateral corner injury.']],
    ],
    note: 'Memory hook: Segond fracture at the tibia suggests ACL tear; arcuate sign at the fibula suggests posterolateral instability.',
  },
  medial: {
    title: 'Medial collateral ligament complex',
    lead: 'The medial complex consists of superficial and deep MCL, posterior oblique ligament and the semimembranosus tendon fan.',
    cards: [
      ['Superficial MCL', ['Originates at the medial femoral epicondyle.', 'Inserts about 5 cm distal to the joint line at the tibia, below the pes anserinus tendons.']],
      ['Deep MCL', ['Local thickening of the joint capsule.', 'Close connection to the medial meniscus.']],
      ['POL', ['Lies posterior to the superficial MCL.', 'Assess it deliberately in every MCL injury.']],
    ],
    note: 'Persistent intraligamentous signal after partial MCL tear may remain visible beyond 12 weeks as fibrovascular healing.',
  },
  acl: {
    title: 'Anterior cruciate ligament',
    lead: 'The ACL is intra-articular but extrasynovial and runs from the lateral femur to the medial tibia. It consists of an anteromedial and a posterolateral bundle.',
    cards: [
      ['Normal bundles', ['The AM and PL bundles run largely parallel in extension.', 'Fine streaky signal between the bundles may be physiologic.']],
      ['ACL tear', ['Direct signs: fibre discontinuity, T2/PD signal increase, flattened or wavy course.', 'Indirect signs: kissing contusions, anterior tibial subluxation over 7 mm, buckled PCL.']],
      ['Mucoid degeneration', ['Chronic glycosaminoglycan deposition between ACL fibres.', 'Celery-stalk sign: intact dark fibres within bright T2-hyperintense mucoid tissue.']],
    ],
    note: 'Unhappy triad: ACL tear, MCL tear and medial meniscus lesion after valgus trauma with external rotation and a fixed lower leg.',
  },
  pcl: {
    title: 'Posterior cruciate ligament',
    lead: 'The PCL runs from the medial femur to the lateral/posterior tibia. It is stronger and lower in signal than the ACL and has no interposed fat/synovial tissue.',
    cards: [
      ['Epidemiology', ['Isolated PCL injuries are rare.', 'PCL tears are much less common than ACL tears.']],
      ['Mechanism', ['A direct anterior blow to the tibia with the knee flexed is typical.', 'Classic example: dashboard injury; another mechanism is extreme hyperflexion.']],
      ['MRI', ['A torn PCL often appears thickened, signal-altered or discontinuous.', 'Reconstruction is usually reserved for marked instability or combined injuries.']],
    ],
  },
  cases: {
    title: 'Cases',
    lead: 'Open space for your later cases and notes on what to look for during reporting.',
    placeholders: [
      ['Case 1', 'A typical ACL case can later be added here with indirect signs, marrow oedema and meniscus checklist.'],
      ['Case 2', 'Space for MCL/POL or PLC: mechanism, key image, report phrasing and pitfall.'],
      ['Case 3', 'Space for PCL injury or mucoid ACL degeneration with differential diagnosis against rupture.'],
    ],
  },
  takehome: {
    title: 'Take-home message',
    text: 'Open space for your final take-home message. Suggested structure: grading first, then complexes, then direct and indirect tear signs, finally pitfalls.',
  },
}
COPY.en.figures = {
  lateral: [
    ['/knieligamente/lateral-collateral-complex.png', 'Lateral collateral complex: LCL, popliteus and biceps femoris relationship.'],
    ['/knieligamente/lcl-biceps-v-sign.png', 'Sagittal V at the fibular head: LCL anteromedial, biceps femoris tendon posterolateral.'],
    ['/knieligamente/lcl-followup-series.png', 'LCL follow-up from left to right: initial, after 3 months, after 6 months and after 24 months. The acute surrounding oedema decreases and ligament continuity returns; mild intraligamentous signal may persist.'],
    ['/knieligamente/arcuate-sign.png', 'Arcuate sign: fibular head avulsion suggesting PLC injury.'],
  ],
  medial: [
    ['/knieligamente/medial-complex-anatomy.png', 'Medial complex with MCL, POL and semimembranosus components.'],
    ['/knieligamente/mcl-layered-anatomy.png', 'Superficial and deep MCL with close relationship to the medial meniscus.'],
    ['/knieligamente/mcl-partial-followup.png', 'Partial MCL tear over time: trauma, after 6 weeks and after 12 weeks. Periligamentous oedema decreases; scar-like thickening or intraligamentous signal may remain as a healing finding.'],
    ['/knieligamente/mcl-pol-rupture.png', 'MCL tear with POL involvement on coronal and axial images.'],
  ],
  acl: [
    ['/knieligamente/acl-sagittal-anatomy.jpeg', 'ACL anatomy in sagittal orientation.'],
    ['/knieligamente/acl-normal-signal.png', 'Normal signal between AM and PL bundles should not be overcalled as partial tear.'],
    ['/knieligamente/acl-kissing-contusions.png', 'Kissing contusions as an indirect sign of ACL tear.'],
    ['/knieligamente/acl-mucoid-degeneration.png', 'Mucoid ACL degeneration with celery-stalk sign.'],
  ],
  pcl: [
    ['/knieligamente/pcl-normal-views.png', 'Normal PCL in axial and sagittal views.'],
    ['/knieligamente/pcl-rupture-sagittal.jpeg', 'PCL tear: thickened and signal-altered structure.'],
    ['/knieligamente/pcl-rupture-marked.jpeg', 'Marked PCL lesion on sagittal MRI.'],
    ['/knieligamente/pcl-coronal.jpeg', 'Coronal PCL depiction.'],
  ],
}
COPY.fa.sections = {
  grading: {
    title: 'درجه‌بندی آسیب رباط در MRI',
    lead: 'منطق اصلی ساده است: اول کانتور، سپس سیگنال داخل رباط، و بعد ناپیوستگی را بررسی کن.',
    cards: [
      ['درجه I: کشیدگی', ['کانتور رباط کاملاً حفظ شده است.', 'فقط ادم اطراف رباط یا حاشیه مایع دور رباط تیره دیده می‌شود.']],
      ['درجه II: پارگی نسبی', ['رباط ضخیم شده و سیگنال داخل رباط افزایش یافته است.', 'قطع نسبی کانتور وجود دارد؛ بخشی از فیبرها هنوز پیوسته‌اند.']],
      ['درجه III: پارگی کامل', ['ناپیوستگی کامل رباط.', 'اغلب نمای موج‌دار انتهای رباط به علت از دست رفتن کشش دیده می‌شود.']],
    ],
  },
  lateral: {
    title: 'کمپلکس رباط جانبی لترال',
    lead: 'کمپلکس لترال شامل LCL، تاندون بایسپس فموریس، تاندون پوپلیتئوس و رباط آرکوات است. نقش اصلی آن مقاومت در برابر استرس واروس و ناپایداری خلفی-لترال است.',
    cards: [
      ['LCL', ['از اپی‌کوندیل لترال فمور به سر فیبولا می‌رود.', 'مقاومت اصلی در برابر استرس واروس است.']],
      ['پوپلیتئوس / بایسپس فموریس', ['تاندون بایسپس فموریس به سر فیبولا می‌چسبد.', 'تاندون پوپلیتئوس درست لترال منیسک خارجی عبور می‌کند؛ داخل مفصل ولی خارج از سینوویوم است.']],
      ['Arcuate sign', ['شکستگی کندگی در رأس سر فیبولا.', 'هشدار مهم برای آسیب شدید گوشه خلفی-لترال زانو.']],
    ],
    note: 'نکته حفظی: شکستگی Segond در تیبیا به نفع پارگی ACL است؛ Arcuate sign در فیبولا به نفع ناپایداری خلفی-لترال است.',
  },
  medial: {
    title: 'کمپلکس رباط جانبی مدیال',
    lead: 'کمپلکس مدیال شامل MCL سطحی و عمقی، رباط مایل خلفی و فن تاندونی سمی‌ممبرانوسوس است.',
    cards: [
      ['MCL سطحی', ['از اپی‌کوندیل مدیال فمور منشأ می‌گیرد.', 'حدود ۵ سانتی‌متر دیستال‌تر از خط مفصل روی تیبیا، زیر تاندون‌های پس آنسرینوس، می‌چسبد.']],
      ['MCL عمقی', ['ضخیم‌شدگی موضعی کپسول مفصلی است.', 'ارتباط نزدیک با منیسک داخلی دارد.']],
      ['POL', ['خلف MCL سطحی قرار دارد.', 'در هر آسیب MCL باید هدفمند بررسی شود.']],
    ],
    note: 'افزایش سیگنال داخل رباط پس از پارگی نسبی MCL می‌تواند بیش از ۱۲ هفته به عنوان ترمیم فیبروواسکولار باقی بماند.',
  },
  acl: {
    title: 'رباط صلیبی قدامی',
    lead: 'ACL داخل مفصل ولی خارج از سینوویوم است و از فمور لترال به تیبیا مدیال می‌رود. از باندل قدامی-مدیال و خلفی-لترال تشکیل شده است.',
    cards: [
      ['باندل‌های طبیعی', ['باندل‌های AM و PL در اکستانسیون عمدتاً موازی‌اند.', 'سیگنال‌های خطی ظریف بین باندل‌ها می‌تواند فیزیولوژیک باشد.']],
      ['پارگی ACL', ['علائم مستقیم: قطع فیبرها، افزایش سیگنال T2/PD، مسیر صاف یا موج‌دار.', 'علائم غیرمستقیم: kissing contusions، سابلوکساسیون قدامی تیبیا بیش از ۷ میلی‌متر، PCL خمیده.']],
      ['دژنراسیون موکوئید', ['رسوب مزمن گلیکوزآمینوگلیکان‌ها بین فیبرهای ACL.', 'علامت celery-stalk: فیبرهای تیره سالم در میان بافت موکوئید روشن در T2.']],
    ],
    note: 'Unhappy triad: پارگی ACL، پارگی MCL و ضایعه منیسک داخلی پس از ترومای والگوس با چرخش خارجی و ساق ثابت.',
  },
  pcl: {
    title: 'رباط صلیبی خلفی',
    lead: 'PCL از فمور مدیال به تیبیا لترال/خلفی می‌رود. از ACL قوی‌تر و کم‌سیگنال‌تر است و بافت چربی/سینوویال بینابینی ندارد.',
    cards: [
      ['اپیدمیولوژی', ['آسیب منفرد PCL نادر است.', 'پارگی PCL بسیار کمتر از پارگی ACL دیده می‌شود.']],
      ['مکانیسم', ['ضربه مستقیم از جلو به تیبیا در زانوی خم‌شده تیپیک است.', 'مثال کلاسیک: dashboard injury؛ مکانیسم دیگر هایپرفلکشن شدید است.']],
      ['MRI', ['PCL پاره اغلب ضخیم، پرسیگنال یا ناپیوسته دیده می‌شود.', 'بازسازی معمولاً برای ناپایداری شدید یا آسیب‌های ترکیبی نگه داشته می‌شود.']],
    ],
  },
  cases: {
    title: 'کیس‌ها',
    lead: 'فضای آزاد برای کیس‌های بعدی و نکاتی که هنگام گزارش باید به آن‌ها نگاه کنی.',
    placeholders: [
      ['کیس ۱', 'بعداً می‌توان یک کیس تیپیک ACL با علائم غیرمستقیم، ادم مغز استخوان و چک منیسک اضافه کرد.'],
      ['کیس ۲', 'فضا برای MCL/POL یا PLC: مکانیسم، تصویر کلیدی، جمله گزارش و pitfall.'],
      ['کیس ۳', 'فضا برای آسیب PCL یا دژنراسیون موکوئید ACL با افتراق از پارگی.'],
    ],
  },
  takehome: {
    title: 'Take-home message',
    text: 'فضای آزاد برای پیام نهایی تو. ساختار پیشنهادی: اول درجه‌بندی، بعد کمپلکس‌ها، سپس علائم مستقیم و غیرمستقیم پارگی، و در پایان pitfalls.',
  },
}
COPY.fa.figures = {
  lateral: [
    ['/knieligamente/lateral-collateral-complex.png', 'کمپلکس لترال: ارتباط LCL، پوپلیتئوس و بایسپس فموریس.'],
    ['/knieligamente/lcl-biceps-v-sign.png', 'V ساژیتال در سر فیبولا: LCL قدام-مدیال و تاندون بایسپس فموریس خلف-لترال.'],
    ['/knieligamente/lcl-followup-series.png', 'سیر LCL از چپ به راست: اولیه، پس از ۳ ماه، پس از ۶ ماه و پس از ۲۴ ماه. ادم حاد اطراف رباط کاهش می‌یابد و پیوستگی رباط دوباره دیده می‌شود؛ افزایش خفیف سیگنال داخل رباط می‌تواند باقی بماند.'],
    ['/knieligamente/arcuate-sign.png', 'Arcuate sign: کندگی سر فیبولا به نفع آسیب PLC.'],
  ],
  medial: [
    ['/knieligamente/medial-complex-anatomy.png', 'کمپلکس مدیال شامل MCL، POL و اجزای سمی‌ممبرانوسوس.'],
    ['/knieligamente/mcl-layered-anatomy.png', 'MCL سطحی و عمقی با ارتباط نزدیک به منیسک داخلی.'],
    ['/knieligamente/mcl-partial-followup.png', 'سیر پارگی نسبی MCL: زمان تروما، پس از ۶ هفته و پس از ۱۲ هفته. ادم اطراف رباط کم می‌شود؛ ضخیم‌شدن اسکاری یا سیگنال داخل رباط می‌تواند به عنوان نشانه ترمیم باقی بماند.'],
    ['/knieligamente/mcl-pol-rupture.png', 'پارگی MCL با درگیری POL در تصاویر کرونال و اکسیال.'],
  ],
  acl: [
    ['/knieligamente/acl-sagittal-anatomy.jpeg', 'آناتومی ACL در نمای ساژیتال.'],
    ['/knieligamente/acl-normal-signal.png', 'سیگنال طبیعی بین باندل‌های AM و PL را نباید پارگی نسبی تلقی کرد.'],
    ['/knieligamente/acl-kissing-contusions.png', 'Kissing contusions به عنوان علامت غیرمستقیم پارگی ACL.'],
    ['/knieligamente/acl-mucoid-degeneration.png', 'دژنراسیون موکوئید ACL با علامت celery-stalk.'],
  ],
  pcl: [
    ['/knieligamente/pcl-normal-views.png', 'PCL طبیعی در نماهای اکسیال و ساژیتال.'],
    ['/knieligamente/pcl-rupture-sagittal.jpeg', 'پارگی PCL: ساختار ضخیم و پرسیگنال.'],
    ['/knieligamente/pcl-rupture-marked.jpeg', 'ضایعه مشخص PCL در MRI ساژیتال.'],
    ['/knieligamente/pcl-coronal.jpeg', 'نمای کرونال PCL.'],
  ],
}

function withLang(path, lang) {
  if (lang === 'de') return path
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}lang=${lang}`
}

function Card({ title, bullets }) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <ul>
        {bullets.map(item => <li key={item}>{item}</li>)}
      </ul>
    </article>
  )
}

function Figure({ src, caption }) {
  return (
    <figure className={styles.figure}>
      <img src={src} alt={caption} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function Section({ id, data, figures }) {
  return (
    <section id={id} className={styles.section}>
      <h2>{data.title}</h2>
      <p className={styles.sectionLead}>{data.lead}</p>
      <div className={styles.grid}>
        {data.cards.map(([title, bullets]) => <Card key={title} title={title} bullets={bullets} />)}
      </div>
      {data.note && <div className={styles.note}>{data.note}</div>}
      {figures?.length > 0 && (
        <div className={styles.imageGrid} style={{ marginTop: 16 }}>
          {figures.map(([src, caption]) => <Figure key={src} src={src} caption={caption} />)}
        </div>
      )}
    </section>
  )
}

export default function KneeLigamentsPage() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const { isRead, toggleRead } = useLessonReadStatus('kreuzbaender')

  return (
    <main className={styles.page} dir={dir}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={withLang('/lernen/msk', lang)}>{copy.crumbMsk}</Link>
          <span>/</span>
          <span>{copy.crumbKnee}</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroMain}>
            <span className={styles.eyebrow}>{copy.badge}</span>
            <h1>{copy.title}</h1>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.actions}>
              <Link className={`${styles.action} ${styles.actionPrimary}`} href={withLang('/ueben/quiz?fach=msk&n=10&themen=kreuzbaender&from=/msk/knie/kreuzbaender', lang)}>{copy.quiz}</Link>
              <Link className={styles.action} href={withLang('/flashcards/kreuzbaender?from=/msk/knie/kreuzbaender', lang)}>{copy.cards}</Link>
              <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}>
                {isRead ? copy.markedRead : copy.markRead}
              </button>
            </div>
          </div>
          <aside className={styles.heroSide}>
            {copy.stats.map(([value, text]) => (
              <div className={styles.stat} key={value}>
                <strong>{value}</strong>
                <span>{text}</span>
              </div>
            ))}
          </aside>
        </header>

        <div className={styles.layout}>
          <aside className={styles.toc}>
            <strong>{copy.toc}</strong>
            {copy.nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </aside>

          <div className={styles.main}>
            <Section id="grading" data={copy.sections.grading} />
            <Section id="lateral" data={copy.sections.lateral} figures={copy.figures.lateral} />
            <Section id="medial" data={copy.sections.medial} figures={copy.figures.medial} />
            <Section id="acl" data={copy.sections.acl} figures={copy.figures.acl} />
            <Section id="pcl" data={copy.sections.pcl} figures={copy.figures.pcl} />

            <section id="cases" className={styles.section}>
              <h2>{copy.sections.cases.title}</h2>
              <p className={styles.sectionLead}>{copy.sections.cases.lead}</p>
              <div className={styles.caseGrid}>
                {copy.sections.cases.placeholders.map(([title, text]) => (
                  <article className={styles.placeholder} key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="takehome" className={styles.takeHome}>
              <h2>{copy.sections.takehome.title}</h2>
              <p>{copy.sections.takehome.text}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
