export const SPINALE_TUMOREN_GRUNDLAGEN = {
  id: 'spinale-tumoren-grundlagen',
  title: { de: 'Tumoren der Wirbelsäule: Orientierung nach Kompartiment', en: 'Spinal tumours: orientation by compartment', fa: 'تومورهای ستون فقرات: جهت‌یابی بر اساس کمپارتمان' },
  alt: { de: 'Nichtdiagnostisches Querschnittsschema mit Wirbelkörper, Spinalkanal und drei unterschiedlich gelegenen Läsionszonen.', en: 'Non-diagnostic cross-sectional schematic showing a vertebral body, spinal canal and three lesion zones in different locations.', fa: 'شماتیک غیرتشخیصی از مقطع مهره، کانال نخاعی و سه ناحیهٔ ضایعه در محل‌های متفاوت.' },
  intro: {
    title: { de: 'Zuerst die Lage beschreiben', en: 'Describe the location first', fa: 'ابتدا محل را توصیف کنید' },
    text: {
      de: 'Die PDF-Seiten 21–22 zeigen zwei verschiedene Aufgaben: eine diffuse Wirbelkörpersklerose (PDF S. 21) und eine knappe Übersicht spinaler Raumforderungen nach Lage zum Myelon (PDF S. 22). Beginne mit Knochen oder Kanal und ordne die Läsion anschließend dem Verhältnis zum Myelon zu.',
      en: 'PDF pages 21–22 show two different tasks: diffuse vertebral-body sclerosis (PDF p. 21) and a brief overview of spinal masses by their position relative to the cord (PDF p. 22). Start with bone or canal, then describe the lesion’s relationship to the cord.',
      fa: 'صفحه‌های ۲۱–۲۲ PDF دو موضوع جدا را نشان می‌دهند: اسکلروز منتشر جسم مهره (ص. ۲۱) و مرور کوتاهی از توده‌های نخاعی بر اساس موقعیت نسبت به طناب نخاعی (ص. ۲۲). ابتدا استخوان یا کانال را مشخص کنید و سپس رابطهٔ ضایعه با طناب نخاعی را توصیف کنید.'
    }
  },
  chapters: [
    {
      id: 'compartments', icon: 'compartments',
      title: { de: 'Welche Lage hat die Läsion?', en: 'Where is the lesion located?', fa: 'ضایعه در کدام محل قرار دارد؟' },
      lead: { de: 'Die Übersicht der PDF trennt drei Lagegruppen. Das Schema erklärt nur diese räumliche Einteilung; es zeigt keine echte MRT und erlaubt keine Diagnose.', en: 'The PDF overview separates three location groups. The schematic explains only this spatial classification; it is not an MRI and cannot establish a diagnosis.', fa: 'مرور PDF سه گروه مکانی را جدا می‌کند. شماتیک فقط همین تقسیم‌بندی فضایی را توضیح می‌دهد؛ تصویر MRI واقعی نیست و تشخیص نمی‌دهد.' },
      rows: [
        [{ de: 'Intramedullär', en: 'Intramedullary', fa: 'داخل‌مدولاری' }, { de: 'Im Myelon: Die PDF nennt Astrozytom und Ependymom.', en: 'Within the cord: the PDF lists astrocytoma and ependymoma.', fa: 'درون طناب نخاعی: PDF آستروسیتوما و اپاندیموما را نام می‌برد.' }],
        [{ de: 'Intradural-extramedullär', en: 'Intradural-extramedullary', fa: 'داخل‌دورال ـ خارج‌مدولاری' }, { de: 'Im Duralsack, aber außerhalb des Myelons: Meningeom, Schwannom und Epidermoidzyste werden aufgelistet.', en: 'Within the dural sac but outside the cord: meningioma, schwannoma and epidermoid cyst are listed.', fa: 'داخل کیسهٔ دورال ولی خارج از طناب نخاعی: مننژیوم، شوانوما و کیست اپیدرموئید فهرست شده‌اند.' }],
        [{ de: 'Extradural', en: 'Extradural', fa: 'خارج‌دورال' }, { de: 'Außerhalb des Duralsacks: Die PDF nennt Metastase und Epiduralabszess. Der Abszess ist eine wichtige nicht-neoplastische Differenzialdiagnose.', en: 'Outside the dural sac: the PDF lists metastasis and epidural abscess. The abscess is an important non-neoplastic differential.', fa: 'خارج از کیسهٔ دورال: PDF متاستاز و آبسهٔ اپیدورال را نام می‌برد. آبسه یک تشخیص افتراقی مهم و غیرنئوپلاستیک است.' }],
      ],
      note: { de: 'Die Bezeichnungen geben die Lage wieder, keine Histologie. Die PDF liefert hier keine vollständige Klassifikation aller spinalen Tumoren.', en: 'These terms describe location, not histology. The PDF does not provide a complete classification of all spinal tumours.', fa: 'این اصطلاح‌ها محل را توصیف می‌کنند، نه بافت‌شناسی را. PDF در این بخش طبقه‌بندی کاملی از همهٔ تومورهای نخاعی ارائه نمی‌دهد.' },
      source: { de: 'Quelle: Wirbelsäule.pdf, PDF S. 22 (gedruckt S. 21).', en: 'Source: Wirbelsäule.pdf, PDF p. 22 (printed p. 21).', fa: 'منبع: Wirbelsäule.pdf، صفحهٔ PDF ۲۲ (شمارهٔ چاپی ۲۱).' },
    },
    {
      id: 'ivory-vertebra', icon: 'bone',
      title: { de: 'Was bedeutet eine „Ivory Vertebra“?', en: 'What does an “ivory vertebra” mean?', fa: '«مهرهٔ عاجی» چه معنایی دارد؟' },
      lead: { de: 'Auf PDF S. 21 ist damit eine diffuse, homogene Sklerosierung eines einzelnen Wirbelkörpers gemeint. Die gezeigten Beispiele beschreiben erhaltene Größe und Kontur; das Zeichen allein legt die Ursache nicht fest.', en: 'On PDF p. 21, this means diffuse, homogeneous sclerosis of a single vertebral body. The examples describe preserved size and contour; the sign alone does not determine the cause.', fa: 'در ص. ۲۱ PDF، منظور اسکلروز منتشر و همگن یک جسم مهره است. در مثال‌ها اندازه و حاشیه حفظ شده‌اند؛ این علامت به‌تنهایی علت را مشخص نمی‌کند.' },
      rows: [
        [{ de: 'PDF-Beispiel', en: 'PDF example', fa: 'مثال PDF' }, { de: 'Osteoblastische Metastasen bei bekanntem Prostatakarzinom; dies ist der Kontext der gezeigten Fälle.', en: 'Osteoblastic metastases in the context of known prostate cancer; this is the context of the examples shown.', fa: 'متاستازهای استئوبلاستیک در زمینهٔ پروستات‌کارسینوم شناخته‌شده؛ این زمینهٔ مثال‌های ارائه‌شده است.' }],
        [{ de: 'Im PDF genannte Differenzialdiagnosen', en: 'Differentials listed in the PDF', fa: 'تشخیص‌های افتراقی ذکرشده در PDF' }, { de: 'Morbus Paget und Lymphom. Das PDF ergänzt für Paget eine Wirbelkörpervergrößerung, kortikale Verdickung und grobe Trabekel.', en: 'Paget disease and lymphoma. For Paget disease, the PDF adds vertebral enlargement, cortical thickening and coarse trabeculae.', fa: 'بیماری پاژه و لنفوم. PDF برای پاژه بزرگ‌شدن مهره، ضخیم‌شدن کورتکس و ترابکول‌های درشت را اضافه می‌کند.' }],
      ],
      note: { de: 'Die Geschlechtszuordnung zu Primärtumoren und die pauschale Hodgkin-Zuordnung beim Lymphom werden hier nicht als allgemeine Regel gelehrt; die knappe PDF-Aussage ist klinisch nicht unabhängig verifiziert.', en: 'The sex-based primary-tumour associations and the broad Hodgkin attribution for lymphoma are not taught here as general rules; the brief PDF statements have not been independently clinically verified.', fa: 'ارتباط تومور اولیه با جنس و نسبت‌دادن کلی لنفوم به هوچکین در اینجا به‌عنوان قاعدهٔ عمومی آموزش داده نمی‌شود؛ عبارت کوتاه PDF از نظر بالینی مستقلاً تأیید نشده است.' },
      source: { de: 'Quelle: Wirbelsäule.pdf, PDF S. 21 (gedruckt S. 20), einschließlich der dort gezeigten Röntgenbeispiele.', en: 'Source: Wirbelsäule.pdf, PDF p. 21 (printed p. 20), including the radiographs shown there.', fa: 'منبع: Wirbelsäule.pdf، صفحهٔ PDF ۲۱ (شمارهٔ چاپی ۲۰)، شامل رادیوگرافی‌های همان صفحه.' },
    },
    {
      id: 'signal-patterns', icon: 'pattern',
      title: { de: 'Welche MRT-Muster listet die PDF?', en: 'Which MRI patterns does the PDF list?', fa: 'PDF چه الگوهای MRI را فهرست می‌کند؟' },
      lead: { de: 'Die Tabelle gibt die Stichwörter auf PDF S. 22 wieder. Sequenzangaben oder knappe Aussagen wie „keine DWI“ sind ohne weitere Erklärung mehrdeutig; sie werden daher nicht zu Diagnose- oder Ausschlusskriterien erweitert.', en: 'The table reproduces the notes on PDF p. 22. Sequence statements or brief phrases such as “no DWI” are ambiguous without further explanation, so they are not expanded into diagnostic or exclusion criteria.', fa: 'جدول، نکته‌های ص. ۲۲ PDF را بازگو می‌کند. عبارت‌های کوتاه مانند «بدون DWI» بدون توضیح بیشتر مبهم‌اند؛ بنابراین به معیار تشخیصی یا رد بیماری گسترش داده نمی‌شوند.' },
      rows: [
        [{ de: 'Astrozytom (intramedullär)', en: 'Astrocytoma (intramedullary)', fa: 'آستروسیتوما (داخل‌مدولاری)' }, { de: 'PDF-Stichwörter: eher jüngere Patient:innen; häufig langstreckige, oft asymmetrische Myelonauftreibung mit unscharfer Begrenzung und variabler, teils geringer KM-Aufnahme. Alter und Muster sind Hinweise, keine Diagnosekriterien.', en: 'PDF notes: more often younger patients; commonly long-segment, often asymmetric cord expansion with ill-defined margins and variable, sometimes mild enhancement. Age and pattern are clues, not diagnostic criteria.', fa: 'نکته‌های PDF: بیشتر در سنین پایین‌تر؛ اغلب اتساع طولانی و گاه نامتقارن طناب نخاعی با مرز نامشخص و جذب متغیر و گاهی کم مادهٔ حاجب. سن و الگو سرنخ‌اند، نه معیار تشخیص.' }],
        [{ de: 'Ependymom (intramedullär)', en: 'Ependymoma (intramedullary)', fa: 'اپاندیموما (داخل‌مدولاری)' }, { de: 'PDF-Stichwörter: häufiger bei Erwachsenen; oft zentral/symmetrisch und schärfer begrenzt, mit meist deutlicherer, häufig homogener KM-Aufnahme. Zysten/Syrinx und eine Hämosiderin-Kappe können vorkommen, sind aber nicht obligat. „Keine DWI“ steht im PDF ohne Erklärung und bleibt ungeklärt.', en: 'PDF notes: more common in adults; often central/symmetric and more sharply defined, with usually stronger, often homogeneous enhancement. Cysts/syrinx and a hemosiderin cap may occur but are not obligatory. “No DWI” appears without explanation and remains unresolved.', fa: 'نکته‌های PDF: در بزرگسالان شایع‌تر؛ اغلب مرکزی/متقارن و با مرز واضح‌تر، همراه با جذب معمولاً بیشتر و اغلب همگن مادهٔ حاجب. کیست/سیرینکس و کلاهک هموسیدرین ممکن‌اند، اما الزامی نیستند. عبارت «بدون DWI» در PDF توضیحی ندارد و حل‌نشده می‌ماند.' }],
        [{ de: 'Meningeom (intradural-extramedullär)', en: 'Meningioma (intradural-extramedullary)', fa: 'مننژیوم (داخل‌دورال ـ خارج‌مدولاری)' }, { de: 'PDF-Stichwörter: meist dorsal/thorakal; T1/T2 isointens; starke homogene KM-Aufnahme und Dural tail; Verdrängung des Myelons.', en: 'PDF notes: usually dorsal/thoracic; T1/T2 isointense; avid homogeneous enhancement and dural tail; cord displacement.', fa: 'نکته‌های PDF: اغلب پشتی/توراسیک؛ ایزوسیگنال در T1/T2؛ جذب شدید و همگن مادهٔ حاجب و دُم دورال؛ جابه‌جایی طناب نخاعی.' }],
        [{ de: 'Schwannom (intradural-extramedullär)', en: 'Schwannoma (intradural-extramedullary)', fa: 'شوانوما (داخل‌دورال ـ خارج‌مدولاری)' }, { de: 'PDF-Stichwörter: Ursprung an der Nervenwurzel mit möglicher Foramen-Erweiterung; heterogen, Zysten möglich; starke KM-Aufnahme.', en: 'PDF notes: nerve-root origin with possible foraminal widening; heterogeneous, cysts possible; avid enhancement.', fa: 'نکته‌های PDF: منشأ از ریشهٔ عصبی با احتمال گشادشدن فورامن؛ ناهمگن و گاهی کیستیک؛ جذب شدید مادهٔ حاجب.' }],
        [{ de: 'Epidermoidzyste (intradural-extramedullär)', en: 'Epidermoid cyst (intradural-extramedullary)', fa: 'کیست اپیدرموئید (داخل‌دورال ـ خارج‌مدولاری)' }, { de: 'PDF-Stichwörter: Liquor-ähnliches T1/T2-Signal, stark positives DWI, keine KM-Aufnahme; laut PDF häufig lumbal.', en: 'PDF notes: CSF-like T1/T2 signal, strongly positive DWI, no enhancement; described as often lumbar in the PDF.', fa: 'نکته‌های PDF: سیگنال T1/T2 شبیه CSF، DWI به‌شدت مثبت، بدون جذب مادهٔ حاجب؛ طبق PDF اغلب کمری.' }],
        [{ de: 'Metastase (extradural)', en: 'Metastasis (extradural)', fa: 'متاستاز (خارج‌دورال)' }, { de: 'PDF-Stichwörter: Wirbelkörperdestruktion, T1 hypointens, T2 hyperintens und KM-Aufnahme; epidurale Kompression möglich.', en: 'PDF notes: vertebral-body destruction, T1 hypointensity, T2 hyperintensity and enhancement; epidural compression may occur.', fa: 'نکته‌های PDF: تخریب جسم مهره، هیپوسیگنال T1، هایپرسیگنال T2 و جذب مادهٔ حاجب؛ فشار اپیدورال ممکن است.' }],
        [{ de: 'Epiduralabszess (extradural)', en: 'Epidural abscess (extradural)', fa: 'آبسهٔ اپیدورال (خارج‌دورال)' }, { de: 'PDF-Stichwörter: T2-Hyperintensität, randständige KM-Aufnahme und positives DWI; Fieber/Infekt als klinischer Kontext; Bandscheibenvorfall als genannte DD.', en: 'PDF notes: T2 hyperintensity, rim enhancement and positive DWI; fever/infection as clinical context; disc herniation listed as a differential.', fa: 'نکته‌های PDF: هایپرسیگنال T2، جذب محیطی مادهٔ حاجب و DWI مثبت؛ تب/عفونت به‌عنوان زمینهٔ بالینی؛ فتق دیسک به‌عنوان تشخیص افتراقی ذکرشده.' }],
      ],
      note: { de: 'Nicht alle auf PDF S. 22 genannten Entitäten sind Tumoren: Epiduralabszess und Epidermoidzyste sind hier wichtige Nachahmer/Differenziale. Der Vergleich von Astrozytom und Ependymom ist durch eine pathologisch bestätigte MRI-Serie (43 Fälle) gestützt; in deren multivariater Analyse war nur Syringohydromyelie ein unabhängiger Unterscheider (Kim DH et al., Clin Radiol. 2014;69(1):29–35; doi:10.1016/j.crad.2013.07.017; PMID 24034546). Alter, Symmetrie, Begrenzung, Enhancement, Zysten und Hämosiderin-Kappe bleiben daher kombinierte Hinweise, keine alleinigen Diagnosekriterien. „Keine DWI“ in der PDF bleibt ungeklärt.', en: 'Not every entity on PDF p. 22 is a tumour: epidural abscess and epidermoid cyst are important mimics/differentials here. The astrocytoma–ependymoma comparison is supported by a pathology-confirmed MRI series (43 cases); in its multivariable analysis, only syringohydromyelia independently distinguished the groups (Kim DH et al., Clin Radiol. 2014;69(1):29–35; doi:10.1016/j.crad.2013.07.017; PMID 24034546). Age, symmetry, margins, enhancement, cysts and a hemosiderin cap therefore remain combined clues, not stand-alone diagnostic criteria. “No DWI” in the PDF remains unresolved.', fa: 'همهٔ موارد ص. ۲۲ PDF تومور نیستند: آبسهٔ اپیدورال و کیست اپیدرموئید مقلد/تشخیص افتراقی مهم‌اند. مقایسهٔ آستروسیتوم و اپاندیموم از یک مجموعهٔ MRI با تأیید پاتولوژی (۴۳ مورد) پشتیبانی می‌شود؛ در تحلیل چندمتغیرهٔ آن فقط سیرینگوهیدرومیلی به‌طور مستقل دو گروه را افتراق داد (Kim DH و همکاران، Clin Radiol. 2014;69(1):29–35؛ doi:10.1016/j.crad.2013.07.017؛ PMID:24034546). بنابراین سن، تقارن، حاشیه، جذب مادهٔ حاجب، کیست‌ها و کلاهک هموسیدرین سرنخ‌های ترکیبی‌اند، نه معیارهای مستقل تشخیص. عبارت «بدون DWI» در PDF حل‌نشده می‌ماند.' },
      source: { de: 'Quelle: Wirbelsäule.pdf, PDF S. 22 (gedruckt S. 21).', en: 'Source: Wirbelsäule.pdf, PDF p. 22 (printed p. 21).', fa: 'منبع: Wirbelsäule.pdf، صفحهٔ PDF ۲۲ (شمارهٔ چاپی ۲۱).' },
    },
  ],
  ivoryFigures: [
    {
      src: '/educational/ivory-vertebra-p21-a.png',
      alt: {
        de: 'Beckenübersicht in AP-Projektion; das PDF markiert Beispiel A mit einer diffus und homogen sklerosierten Wirbelkörpersäule.',
        en: 'AP pelvic overview; the PDF labels example A with a diffusely and homogeneously sclerotic vertebral body.',
        fa: 'نمای کلی لگن در پروجکشن AP؛ PDF مثال A را با اسکلروز منتشر و همگن یک جسم مهره مشخص می‌کند.'
      },
      caption: {
        de: 'A · L4: Das PDF beschreibt eine homogene Sklerosierung bei erhaltener Größe und Kontur, im Kontext bekannter osteoblastischer Prostatakarzinommetastasen.',
        en: 'A · L4: the PDF describes homogeneous sclerosis with preserved size and contour, in the context of known osteoblastic prostate-cancer metastases.',
        fa: 'A · مهرهٔ L4: PDF اسکلروز همگن با اندازه و حاشیهٔ حفظ‌شده را در زمینهٔ متاستازهای استئوبلاستیک شناخته‌شدهٔ سرطان پروستات توصیف می‌کند.'
      }
    },
    {
      src: '/educational/ivory-vertebra-p21-b.png',
      alt: {
        de: 'Seitliche Röntgenaufnahme der Brustwirbelsäule; das PDF markiert Beispiel B mit diffuser homogener Sklerosierung eines Wirbelkörpers.',
        en: 'Lateral thoracic-spine radiograph; the PDF labels example B with diffuse homogeneous sclerosis of a vertebral body.',
        fa: 'رادیوگرافی لترال ستون مهره‌های سینه‌ای؛ PDF مثال B را با اسکلروز منتشر و همگن یک جسم مهره مشخص می‌کند.'
      },
      caption: {
        de: 'B · BWK 6: Im PDF sind Höhe und Kontur erhalten. Zusätzlich nennt die Bildlegende fleckige Sklerosierung und Destruktion an BWK 4; die Fälle stehen im Kontext eines bekannten Prostatakarzinoms.',
        en: 'B · T6: the PDF describes preserved height and contour. The source caption also notes patchy sclerosis and destruction at T4; the examples are in the context of known prostate cancer.',
        fa: 'B · مهرهٔ T6: PDF حفظ ارتفاع و حاشیه را توصیف می‌کند. کپشن منبع همچنین اسکلروز لکه‌ای و تخریب T4 را ذکر می‌کند؛ مثال‌ها در زمینهٔ سرطان پروستات شناخته‌شده‌اند.'
      }
    }
  ],
  intramedullaryFigures: [
    {
      src: '/educational/spinal-ependymoma-radiopaedia-rID-19319.jpeg',
      href: 'https://radiopaedia.org/cases/spinal-ependymoma-18',
      alt: { de: 'Sagittale T2-MRT aus einem histologisch bestätigten intramedullären zervikalen Ependymom-Fall; langstreckige Myelonauftreibung mit zentraler Läsion.', en: 'Sagittal T2 MRI from a histologically confirmed intramedullary cervical ependymoma case; long-segment cord expansion with a central lesion.', fa: 'MRI ساجیتال T2 از یک مورد اپاندیموم داخل‌مدولاری گردنی با تأیید بافت‌شناسی؛ اتساع طولانی طناب نخاعی با ضایعهٔ مرکزی.' },
      caption: { de: 'Ependymom · Sagittal T2 · Fall rID 19319, Studie 19334, Bild 2324899. Beispielbild; das Muster allein beweist keine Histologie.', en: 'Ependymoma · sagittal T2 · case rID 19319, study 19334, image 2324899. Example image; this pattern alone does not establish histology.', fa: 'اپاندیموم · ساجیتال T2 · مورد rID 19319، مطالعه 19334، تصویر 2324899. تصویر نمونه است؛ این الگو به‌تنهایی بافت‌شناسی را اثبات نمی‌کند.' }
    },
    {
      src: '/educational/spinal-pilocytic-astrocytoma-radiopaedia-rID-152705.jpeg',
      href: 'https://radiopaedia.org/cases/spinal-pilocytic-astrocytoma-3',
      alt: { de: 'Sagittale T2-MRT aus einem histologisch bestätigten intramedullären pilozystischen Astrozytom-Fall; langstreckige Myelonauftreibung.', en: 'Sagittal T2 MRI from a histologically confirmed intramedullary pilocytic astrocytoma case; long-segment cord expansion.', fa: 'MRI ساجیتال T2 از یک مورد آستروسیتوم پیلوسیتیک داخل‌مدولاری با تأیید بافت‌شناسی؛ اتساع طولانی طناب نخاعی.' },
      caption: { de: 'Pilozystisches Astrozytom · Sagittal T2 · Fall rID 152705, Studie 126541, Bild 59654435. Beispielbild; kein direkter diagnostischer Vergleich bei unterschiedlichen Fällen.', en: 'Pilocytic astrocytoma · sagittal T2 · case rID 152705, study 126541, image 59654435. Example image; not a direct diagnostic comparison because these are different patients.', fa: 'آستروسیتوم پیلوسیتیک · ساجیتال T2 · مورد rID 152705، مطالعه 126541، تصویر 59654435. تصویر نمونه است؛ چون مربوط به دو بیمار متفاوت‌اند، مقایسهٔ تشخیصی مستقیم نیست.' }
    }
  ],
  check: {
    title: { de: 'Selbstcheck: Was folgt aus der Lage?', en: 'Self-check: what follows from location?', fa: 'خودآزمایی: از محل ضایعه چه نتیجه‌ای می‌گیریم؟' },
    prompt: { de: 'Eine Raumforderung liegt innerhalb des Duralsacks, aber außerhalb des Myelons. Welche Aussage ist durch diese Beschreibung gedeckt?', en: 'A mass lies within the dural sac but outside the cord. Which statement is supported by this description?', fa: 'توده داخل کیسهٔ دورال ولی خارج از طناب نخاعی است. کدام گزاره از این توصیف پشتیبانی می‌شود؟' },
    options: [
      { de: 'Sie ist intradural-extramedullär; die Lage allein bestimmt nicht den Tumortyp.', en: 'It is intradural-extramedullary; location alone does not determine tumour type.', fa: 'ضایعه داخل‌دورال ـ خارج‌مدولاری است؛ محل به‌تنهایی نوع تومور را مشخص نمی‌کند.' },
      { de: 'Sie ist sicher ein Meningeom.', en: 'It is definitely a meningioma.', fa: 'قطعاً مننژیوم است.' },
      { de: 'Sie ist extradural und damit eine Metastase.', en: 'It is extradural and therefore a metastasis.', fa: 'خارج‌دورال است و بنابراین متاستاز است.' },
    ], answerIndex: 0,
    feedback: { de: 'Die Lage erlaubt zunächst nur die Kompartimentbeschreibung. Meningeom, Schwannom und weitere Ursachen brauchen zusätzliche Bildmerkmale und klinischen Kontext.', en: 'Location supports only a compartment description at this stage. Meningioma, schwannoma and other causes require additional imaging features and clinical context.', fa: 'در این مرحله محل فقط توصیف کمپارتمان را ممکن می‌کند. تشخیص مننژیوم، شوانوما یا علت‌های دیگر به ویژگی‌های تصویری و زمینهٔ بالینی بیشتری نیاز دارد.' }
  },
  takeHome: [
    { de: 'Zuerst knöcherne Läsion versus Raumforderung im Spinalkanal unterscheiden.', en: 'First distinguish a bone lesion from a spinal-canal mass.', fa: 'ابتدا ضایعهٔ استخوانی را از تودهٔ داخل کانال نخاعی جدا کنید.' },
    { de: 'Im Kanal die Beziehung zum Myelon beschreiben: intra- oder extramedullär und intra- oder extradural.', en: 'In the canal, describe the relationship to the cord: intra- or extramedullary and intra- or extradural.', fa: 'در کانال، رابطه با طناب نخاعی را توصیف کنید: داخل‌مدولاری یا خارج‌مدولاری و داخل‌دورال یا خارج‌دورال.' },
    { de: 'Ein Lage- oder Dichtemuster ist keine histologische Diagnose.', en: 'A location or density pattern is not a histological diagnosis.', fa: 'الگوی محل یا دانسیته، تشخیص بافت‌شناسی نیست.' },
  ],
  notice: {
    de: 'Quellenbegrenzung: Diese Lektion gibt ausgewählte Inhalte aus Wirbelsäule.pdf, PDF S. 21–22, wieder. Die knappe PDF-Übersicht wurde nicht als vollständige Tumorklassifikation ergänzt. Klinische Richtigkeit der kurzen Tumor-/Sequenzangaben ist nicht unabhängig bestätigt; sie sind Lernhinweise aus der Quelle und keine alleinigen Diagnosekriterien. S. 23–24 wurden hier nicht verwendet.',
    en: 'Source limits: this lesson reproduces selected content from Wirbelsäule.pdf, PDF pp. 21–22. The brief PDF overview has not been expanded into a complete tumour classification. The clinical accuracy of the short tumour/sequence statements has not been independently confirmed; they are source-based learning notes, not stand-alone diagnostic criteria. pp. 23–24 are not used here.',
    fa: 'محدودیت منبع: این درس گزیده‌ای از Wirbelsäule.pdf، صفحه‌های PDF ۲۱–۲۲ را بازگو می‌کند. مرور کوتاه PDF به طبقه‌بندی کامل تومورها گسترش داده نشده است. درستی بالینی نکته‌های کوتاه تومور/سکانس مستقلاً تأیید نشده؛ این‌ها نکته‌های آموزشی برگرفته از منبع‌اند، نه معیار مستقل تشخیص. صفحه‌های ۲۳–۲۴ در این درس استفاده نشده‌اند.'
  },
}
