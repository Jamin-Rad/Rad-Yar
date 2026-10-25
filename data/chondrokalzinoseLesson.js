const L = (de, en, fa) => ({ de, en, fa })

export const CHONDROKALZINOSE_LESSON = {
  id: 'chondrokalzinose',
  title: L('Chondrokalzinose am Knie', 'Knee chondrocalcinosis', 'کندروکلسی‌نوز زانو'),
  alt: L('Schematische Menisken mit feinen linearen Kalkablagerungen', 'Schematic menisci with fine linear calcifications', 'نمای شماتیک منیسک‌ها با رسوب‌های خطی ظریف کلسیم'),
  goals: [
    L('Meniskusverkalkungen im Röntgenbild erkennen und den Befund korrekt benennen.', 'Recognise meniscal calcification on radiographs and name the finding accurately.', 'کلسیفیکاسیون منیسک را در رادیوگرافی تشخیص دهید و یافته را دقیق نام‌گذاری کنید.'),
    L('Ein erhöhtes Meniskussignal in PD-Sequenzen nicht vorschnell als Riss werten.', 'Avoid calling increased meniscal signal on PD imaging a tear without checking the pattern.', 'افزایش سیگنال منیسک در توالی PD را بدون بررسی الگو به‌سرعت پارگی تلقی نکنید.'),
    L('Chondrokalzinose als Bildbefund von einer klinischen CPPD-Erkrankung unterscheiden.', 'Distinguish the imaging finding chondrocalcinosis from clinical CPPD disease.', 'یافتهٔ تصویری کندروکلسی‌نوز را از بیماری بالینی CPPD تفکیک کنید.'),
  ],
  intro: L(
    'Feine Verkalkungen entlang des Meniskus können auf Chondrocalcinosis hinweisen. Der wichtigste MRT-Fallstrick: Kristallablagerungen können auf protonendichtegewichteten Bildern paradox signalreich erscheinen und dadurch einen Riss imitieren. Erst Röntgenmuster, Signalverteilung und sichere Risszeichen zusammen beurteilen.',
    'Fine calcifications along a meniscus may indicate chondrocalcinosis. The key MRI pitfall is that crystal deposits can paradoxically appear bright on proton-density-weighted images and mimic a tear. Assess the radiographic pattern, signal distribution and definite tear signs together.',
    'کلسیفیکاسیون‌های ظریف در امتداد منیسک می‌توانند نشانهٔ کندروکلسی‌نوز باشند. دام مهم MRI این است که رسوب بلورها ممکن است به‌طور متناقض در تصاویر با وزن‌دهی چگالی پروتون پرسیگنال دیده شود و پارگی را تقلید کند. الگوی رادیوگرافی، توزیع سیگنال و نشانه‌های قطعی پارگی را با هم ارزیابی کنید.'
  ),
  radiograph: {
    src: '/msk/knie/chondrokalzinose/msk-p56-rid-22147.jpg',
    detailSrc: '/msk/knie/chondrokalzinose/msk-p56-rid-22147-joint-detail.jpg',
    alt: L('AP-Röntgenaufnahme des rechten Knies; achte auf feine Verkalkungslinien im Bereich der Menisken.', 'AP radiograph of the right knee; note the fine calcific lines in the meniscal regions.', 'نمای قدامی‌ـ‌خلفی زانوی راست؛ به خطوط ظریف کلسیفیکاسیون در محدودهٔ منیسک‌ها توجه کنید.'),
    caption: L('MSK.pdf, PDF-S. 56 / Druck-S. 55, rID 22147. Beispielaufnahme aus der bereitgestellten Quelle; die Projektion zeigt Gelenkspalt und mögliche feine meniskale Verkalkungen, ersetzt aber keine klinische Diagnose.', 'MSK.pdf, PDF p. 56 / printed p. 55, rID 22147. Example radiograph from the supplied source; it shows the joint space and possible fine meniscal calcification but does not establish a clinical diagnosis.', 'MSK.pdf، صفحهٔ PDF ۵۶ / صفحهٔ چاپی ۵۵، rID 22147. رادیوگرافی نمونه از منبع ارائه‌شده؛ فضای مفصلی و کلسیفیکاسیون ظریف احتمالی منیسک را نشان می‌دهد، اما به‌تنهایی تشخیص بالینی را ثابت نمی‌کند.'),
  },
  content: {
    title: L('Vom Röntgenbild zum MRT: dem Befund folgen', 'From radiograph to MRI: trace the finding', 'از رادیوگرافی تا MRI: یافته را دنبال کنید'),
    xrayTitle: L('1. Zuerst das Röntgenbild beurteilen', '1. Start with the radiograph', '۱. ابتدا رادیوگرافی را ببینید'),
    xray: L('Im konventionellen Röntgen erscheinen Verkalkungen als feine punktförmige oder lineare Verschattungen entlang des Meniskus. Die PDF beschreibt den Befund besonders bei älteren Patientinnen und Patienten als häufig; beide Knie können symmetrisch betroffen sein. Chondrokalzinose bezeichnet den Bildbefund und ist allein kein Nachweis einer symptomatischen CPPD-Erkrankung.', 'On plain radiographs, calcification appears as fine punctate or linear opacities along the meniscus. The PDF describes the finding as common particularly in older people and notes that both knees may be affected symmetrically. Chondrocalcinosis names the imaging finding; by itself it does not establish symptomatic CPPD disease.', "در رادیوگرافی ساده، کلسیفیکاسیون به شکل کدورت‌های نقطه‌ای یا خطی ظریف در امتداد منیسک دیده می‌شود. PDF آن را به‌ویژه در افراد مسن شایع می‌داند و به امکان درگیری متقارن هر دو زانو اشاره می‌کند. کندروکلسی‌نوز نام یافتهٔ تصویری است و به‌تنهایی بیماری علامت‌دار CPPD را ثابت نمی‌کند."),
    mriTitle: L('2. Im MRT das Signal mit dem Ablagerungsmuster abgleichen', '2. On MRI, match signal to the deposit pattern', '۲. در MRI، سیگنال را با توزیع رسوب تطبیق دهید'),
    mri: L('Meniskale Ablagerungen erscheinen in verschiedenen Sequenzen meist signalarm oder als signalarmes punktförmiges Material. Die PDF weist jedoch darauf hin, dass sie in PD-gewichteten Sequenzen mitunter paradox signalreich sein und einen Riss imitieren können. Unterscheiden Sie ein diffuses oder punktförmiges Signal entlang des Meniskus von einer klaren Linie, die eine Gelenkfläche erreicht; prüfen Sie benachbarte Schichten und unabhängige Risszeichen.', 'Meniscal deposits are generally low signal or appear as low-signal foci across sequences. However, the PDF warns that deposits may sometimes show increased signal on PD-weighted images, mimicking a tear. Distinguish diffuse or punctate signal along the meniscus from a definite line reaching an articular surface; review adjacent slices and independent tear signs.', 'رسوب‌های منیسک معمولاً در توالی‌های مختلف کم‌سیگنال یا به‌صورت کانون‌های کم‌سیگنال دیده می‌شوند. بااین‌حال، PDF هشدار می‌دهد که گاهی در توالی PD افزایش سیگنال دارند و پارگی را تقلید می‌کنند. سیگنال منتشر یا نقطه‌ای در امتداد منیسک را از خط واضحی که به سطح مفصلی می‌رسد جدا کنید؛ برش‌های مجاور و نشانه‌های مستقل پارگی را نیز مرور کنید.'),
    caveTitle: L('Diagnostische Falle', 'Interpretive pitfall', 'دام تفسیری'),
    cave: L('Ein erhöhtes PD-Signal allein beweist keinen Meniskusriss. Die PDF-Aufnahme ist ein Beispiel und keine validierte diagnostische Regel. Röntgenologische Chondrokalzinose beweist außerdem nicht, dass aktuelle Beschwerden durch CPPD verursacht sind.', 'Increased PD signal alone does not prove a meniscal tear. The PDF image is an example, not a validated diagnostic rule. Radiographic chondrocalcinosis also does not prove that current symptoms are caused by CPPD.', 'افزایش سیگنال PD به‌تنهایی پارگی منیسک را ثابت نمی‌کند. تصویر PDF یک نمونه است، نه قاعدهٔ تشخیصی اعتبارسنجی‌شده. کندروکلسی‌نوز رادیوگرافیک نیز ثابت نمی‌کند که علائم فعلی ناشی از CPPD هستند.'),
  },
  check: {
    question: L('Im MRT zeigt sich in der PD-Sequenz ein fleckig erhöhtes Signal im Meniskuskörper; im Röntgenbild desselben Knies liegen feine Verkalkungslinien entlang des Meniskus. Was ist der beste nächste Schritt?', 'MRI shows patchy increased signal in the meniscal body on PD; the radiograph shows fine calcific lines along the meniscus. What is the best next step?', 'در MRI، سیگنال لکه‌لکه و افزایش‌یافته در تنهٔ منیسک در PD دیده می‌شود؛ رادیوگرافی همان زانو خطوط ظریف کلسیفیکاسیون در امتداد منیسک دارد. گام بعدی مناسب چیست؟'),
    options: [
      L('Das PD-Signal allein als sicheren Riss werten.', 'Call the PD signal a definite tear by itself.', 'سیگنال PD را به‌تنهایی پارگی قطعی بدانید.'),
      L('Das Ablagerungsmuster mit Röntgenbild und Nachbarschichten abgleichen und prüfen, ob eine Signallinie eine Gelenkfläche erreicht.', 'Correlate the deposit pattern with the radiograph, adjacent slices and whether a signal line reaches an articular surface.', 'توزیع رسوب را با رادیوگرافی، برش‌های مجاور و رسیدن خط سیگنال به سطح مفصلی تطبیق دهید.'),
      L('Allein aufgrund der Verkalkung eine symptomatische CPPD-Erkrankung diagnostizieren.', 'Diagnose symptomatic CPPD disease from calcification alone.', 'فقط بر اساس کلسیفیکاسیون، بیماری علامت‌دار CPPD را قطعی بدانید.'),
    ],
    answer: 1,
    explanation: L('Richtig. CPPD-Ablagerungen können in PD-Sequenzen signalreich sein und einen Riss imitieren. Gleichen Sie daher das Röntgenmuster ab und suchen Sie nach unabhängigen Risszeichen; die Bildgebung allein belegt nicht die Ursache der Beschwerden.', 'Correct. CPPD deposits may be bright on PD and mimic a tear; correlate the radiograph and look for independent tear signs. Imaging alone does not establish the cause of symptoms.', 'درست است. رسوب CPPD ممکن است در PD پرسیگنال و شبیه پارگی باشد؛ الگوی رادیوگرافی و نشانه‌های مستقل پارگی را هم بررسی کنید. تصویر به‌تنهایی علت علائم را تعیین نمی‌کند.'),
    incorrectExplanation: L('Ein PD-Signal allein beweist keinen Riss: Chondrokalzinose kann das Meniskussignal verändern. Eine Verkalkung belegt außerdem nicht, dass Beschwerden durch CPPD verursacht sind.', 'PD signal alone does not prove a tear: chondrocalcinosis can alter meniscal signal. Calcification also does not establish that symptoms are caused by CPPD.', 'سیگنال PD به‌تنهایی پارگی را ثابت نمی‌کند؛ کندروکلسی‌نوز می‌تواند سیگنال منیسک را تغییر دهد. کلسیفیکاسیون نیز ثابت نمی‌کند که علائم ناشی از CPPD هستند.'),
  },
  summary: [
    L('Chondrokalzinose ist ein Bildbefund; klinische CPPD-Erkrankung braucht den passenden Kontext.', 'Chondrocalcinosis is an imaging finding; CPPD disease requires the appropriate clinical context.', 'کندروکلسی‌نوز یک یافتهٔ تصویری است؛ بیماری CPPD به زمینهٔ بالینی متناسب نیاز دارد.'),
    L('Meniskale Verkalkungen können im Röntgenbild fein punktförmig oder linear erscheinen.', 'Meniscal calcification may appear as fine punctate or linear opacity on radiographs.', 'کلسیفیکاسیون منیسک ممکن است در رادیوگرافی به‌شکل کدورت‌های نقطه‌ای یا خطی ظریف باشد.'),
    L('Erhöhtes PD-Signal kann Verkalkung widerspiegeln und einen Riss imitieren.', 'Increased PD signal can reflect calcification and mimic a tear.', 'افزایش سیگنال PD می‌تواند بازتاب کلسیفیکاسیون باشد و پارگی را تقلید کند.'),
    L('Signalverteilung, Nachbarschichten und sicheren Oberflächenkontakt gemeinsam prüfen.', 'Assess signal distribution, adjacent slices and definite surface contact together.', 'توزیع سیگنال، برش‌های مجاور و تماس قطعی با سطح را با هم بررسی کنید.'),
  ],
  sources: [
    { label: 'MSK.pdf · PDF pp. 56 / printed p. 55 · rID 22147', href: null },
    { label: 'Mandl et al. · 2023 EULAR imaging recommendations for crystal-induced arthropathies', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/' },
    { label: 'Kaushik et al. · Effect of chondrocalcinosis on the MR imaging of knee menisci · AJR 2001;177(4):905–909 · PMID 11566703', href: 'https://doi.org/10.2214/ajr.177.4.1770905' },
    { label: 'Resnick & Kang · The Meniscus: Recent Advances in MR Imaging of the Knee · AJR 2002', href: 'https://doi.org/10.2214/ajr.179.5.1791115' },
  ],
}
