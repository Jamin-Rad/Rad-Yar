'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from '../../gi/divertikulitis/page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Pankreas · Pankreatitis',
    title: 'Pankreatitis',
    subtitle: 'Akute und chronische Pankreatitis: Atlanta-Klassifikation, CTSI, Komplikationen und wichtige Differenzialdiagnosen',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    sections: [
      { id: 'grundlagen', label: 'Klinische Grundlagen', icon: '🧪' },
      { id: 'atlanta', label: 'Atlanta-Klassifikation', icon: '📋' },
      { id: 'ctsi', label: 'CTSI/Balthazar', icon: '🧮' },
      { id: 'komplikationen', label: 'Komplikationen', icon: '⚠️' },
      { id: 'chronisch', label: 'Chronische Pankreatitis', icon: '🧱' },
      { id: 'dd', label: 'Differenzialdiagnosen', icon: '🔎' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '40–50 %', label: 'biliär', text: 'Choledocholithiasis oder Mikrolithiasis' },
      { value: '48–72 h', label: 'Nekrose-Zeitfenster', text: 'Nekrosen erst dann zuverlässig beurteilbar' },
      { value: 'CTSI 0–10', label: 'Schweregrad', text: 'Balthazar-Grad plus Nekrose-Score' },
    ],
    basics: {
      title: 'Klinische Grundlagen der akuten Pankreatitis',
      lead: 'Die häufigsten Ursachen sind biliär und alkoholtoxisch. Bildgebung dient nicht nur der Diagnose, sondern vor allem der Einordnung von Morphologie, Nekrose und Komplikationen.',
      items: [
        { title: 'Biliäre Genese', text: 'Ca. 40–50 %. Choledocholithiasis oder Mikrolithiasis verlegt die Papilla duodeni major. Dadurch entstehen Galle-Reflux oder Druckanstieg im Pankreasgang mit vorzeitiger Enzymaktivierung.' },
        { title: 'Alkoholtoxische Genese', text: 'Ca. 30–35 %. Ethanol wirkt direkt toxisch auf Azinuszellen und verändert die Sekretviskosität, sodass Protein-Plugs entstehen können.' },
        { title: 'Seltene Ursachen', text: 'Hypertriglyzeridämie, Hyperkalzämie, Medikamente wie Azathioprin, Furosemid, Steroide oder ACE-Hemmer, viral, autoimmun und iatrogen.' },
        { title: 'Post-ERCP', text: 'Die akute Pankreatitis ist die häufigste Komplikation nach ERCP. Auch abdominelle Eingriffe können Auslöser sein.' },
      ],
      key: 'Bei früher CT kann die Pankreatitis unterschätzt werden: Nekrosebeurteilung ist erst nach 48–72 Stunden wirklich belastbar.',
    },
    atlanta: {
      title: 'Atlanta-Klassifikation: Morphologie und Kollektionen',
      lead: 'Atlanta trennt die interstitiell-ödematöse von der nekrotisierenden Pankreatitis und benennt peripankreatische Kollektionen nach Morphologie und Zeitverlauf.',
      morphology: [
        { title: 'Interstitiell-ödematös', text: 'Diffuse Parenchymschwellung, homogene Kontrastmittelaufnahme und peripankreatisches Fett-Stranding.' },
        { title: 'Nekrotisierend', text: 'Parenchym- und/oder Fettgewebsnekrosen. Typisch sind fehlendes Enhancement, inhomogene Areale, >30 % oder >3 cm Nekrose.' },
      ],
      collectionHeaders: ['Form', '< 4 Wochen', '> 4 Wochen'],
      collections: [
        ['Ödematöse Pankreatitis', 'APFC: Acute Peripancreatic Fluid Collection, keine Kapsel', 'Pseudozyste: definierte Wand/Kapsel, rein flüssig'],
        ['Nekrotisierende Pankreatitis', 'ANC: Acute Necrotic Collection, inhomogen, fest/flüssig gemischt', 'WON: Walled-Off Necrosis, organisierte Kapsel um Nekroseareal'],
      ],
      key: 'Zeit und Inhalt entscheiden die Bezeichnung: Flüssig ohne Kapsel ist APFC, organisierte Nekrose nach 4 Wochen ist WON.',
    },
    ctsi: {
      title: 'CT-Schweregrad-Index nach Balthazar',
      lead: 'Der CTSI kombiniert den Balthazar-Grad mit dem Nekrose-Score. Maximal sind 10 Punkte möglich.',
      balthazarHeaders: ['Grad', 'CT-Befund', 'Punkte'],
      balthazarRows: [
        ['A', 'Normal', '0'],
        ['B', 'Pankreasschwellung', '1'],
        ['C', 'Peripankreatisches Fett-Stranding', '2'],
        ['D', 'Eine peripankreatische Flüssigkeitskollektion', '3'],
        ['E', 'Mindestens zwei Kollektionen oder retroperitoneales Gas', '4'],
      ],
      necrosisHeaders: ['Nekrose', 'Zusatzpunkte'],
      necrosisRows: [
        ['Keine Nekrose', '+0 Punkte'],
        ['< 30 % Nekrose', '+2 Punkte'],
        ['30–50 % Nekrose', '+4 Punkte'],
        ['> 50 % Nekrose', '+6 Punkte; Mortalität deutlich erhöht'],
      ],
      interpretationHeaders: ['CTSI', 'Interpretation'],
      interpretationRows: [
        ['0–3 Punkte', 'Mild; Mortalität < 3 %'],
        ['4–6 Punkte', 'Moderat; Morbidität steigt'],
        ['7–10 Punkte', 'Schwer; Mortalität bis 17 %'],
      ],
    },
    complications: {
      title: 'Komplikationen gezielt suchen',
      lead: 'Komplikationen verändern das Management. Gefäße, Kollektionen, Nekrosen und Gangintegrität müssen aktiv geprüft werden.',
      items: [
        { title: 'Pseudoaneurysma', text: 'Rundliche, scharf begrenzte arterielle Struktur in oder nahe einer Kollektion/Nekrose. Entsteht durch Arrosion der Gefäßwand durch Pankreasenzyme; häufig A. lienalis.' },
        { title: 'Venenthrombose', text: 'Entzündliche Infiltrate und Druck durch Ödeme verlangsamen den Fluss und reizen die Venenwand. Häufig V. lienalis und V. portae.' },
        { title: 'Infizierte Nekrose', text: 'Gas im Nekroseareal ist im CT praktisch pathognomonisch für eine infizierte Nekrose.' },
        { title: 'Gangruptur', text: 'MRCP kann ein Kontrastmittel-Extravasat oder ein Disconnected-Duct-Syndrom zeigen.' },
      ],
      cave: 'Ein Pseudoaneurysma darf nicht als „kleine hyperdense Struktur“ übersehen werden: arterielle Phase und Lage zur Kollektion sind entscheidend.',
    },
    chronic: {
      title: 'Chronische Pankreatitis',
      lead: 'Im Spätstadium ist die klassische Trias aus Verkalkungen, Parenchymatrophie und Gangveränderungen oft diagnostisch.',
      items: [
        { title: 'Pankreasverkalkungen', text: 'Pathognomonisch, intraduktal und parenchymal möglich.' },
        { title: 'Parenchymatrophie', text: 'Ausdruck chronischer Destruktion und Fibrose.' },
        { title: 'Ductus pancreaticus', text: 'Dilatation >3 mm, perlschnurartiges Muster mit wechselnden Stenosen und Erweiterungen.' },
      ],
      key: 'Die Kombination aus Verkalkungen und unregelmäßig erweitertem Gang spricht stark für chronische Pankreatitis.',
    },
    dd: {
      title: 'Wichtige Differenzialdiagnosen',
      lead: 'Chronische Pankreatitis kann ein Karzinom imitieren; Autoimmunpankreatitis kann wie ein Tumor wirken. Gangzeichen und Enhancement-Muster helfen.',
      headers: ['Entität', 'Hinweise'],
      rows: [
        ['Chronische Pankreatitis', 'Verkalkungen, langer Gangverschluss und Duct-penetrating-sign: der Gang verläuft sichtbar durch die Läsion.'],
        ['Pankreaskarzinom', 'Keine Verkalkungen in der Masse, abrupter Gangabbruch, konsekutive Schwanzatrophie und Gefäßinfiltration.'],
        ['Autoimmunpankreatitis Typ 1', 'Wurstförmige Konfiguration mit Verlust der Lobulierung, hypodenser kapsulär-fibrotischer Halo und schnelle Besserung unter Steroiden.'],
      ],
      cave: 'Ein abrupt abbrechender Ductus mit Schwanzatrophie und Gefäßkontakt ist malignomverdächtig, auch wenn klinisch Pankreatitis vermutet wird.',
    },
    takehome: {
      title: 'Take home message',
      lead: 'Die wichtigsten Regeln für Prüfung und Befundung.',
      items: [
        { title: 'Ursache mitdenken', text: 'Biliär und alkoholtoxisch sind die häufigsten Ursachen; post-ERCP ist iatrogen besonders wichtig.' },
        { title: 'Atlanta korrekt benennen', text: 'Interstitiell versus nekrotisierend und APFC/Pseudozyste/ANC/WON nach Zeit und Inhalt unterscheiden.' },
        { title: 'CTSI systematisch', text: 'Balthazar-Grad plus Nekrose-Score ergibt den CT-Schweregrad.' },
        { title: 'Komplikationen suchen', text: 'Pseudoaneurysma, Venenthrombose, infizierte Nekrose und Gangruptur aktiv ausschließen.' },
        { title: 'Karzinom nicht verpassen', text: 'Abrupter Gangabbruch, Schwanzatrophie und Gefäßinfiltration sprechen gegen reine Pankreatitis.' },
      ],
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Pancreas · Pancreatitis',
    title: 'Pancreatitis',
    subtitle: 'Acute and chronic pancreatitis: Atlanta classification, CTSI, complications and key differentials',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    sections: [
      { id: 'grundlagen', label: 'Clinical basics', icon: '🧪' },
      { id: 'atlanta', label: 'Atlanta classification', icon: '📋' },
      { id: 'ctsi', label: 'CTSI/Balthazar', icon: '🧮' },
      { id: 'komplikationen', label: 'Complications', icon: '⚠️' },
      { id: 'chronisch', label: 'Chronic pancreatitis', icon: '🧱' },
      { id: 'dd', label: 'Differentials', icon: '🔎' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: '40–50%', label: 'biliary', text: 'choledocholithiasis or microlithiasis' },
      { value: '48–72 h', label: 'necrosis timing', text: 'reliable assessment after this interval' },
      { value: 'CTSI 0–10', label: 'severity', text: 'Balthazar grade plus necrosis score' },
    ],
    basics: {
      title: 'Clinical basics of acute pancreatitis',
      lead: 'The main causes are biliary and alcohol-related. Imaging defines morphology, necrosis and complications.',
      items: [
        { title: 'Biliary cause', text: 'Approximately 40–50%. Choledocholithiasis or microlithiasis obstructs the major papilla, causing bile reflux or raised pancreatic duct pressure with premature enzyme activation.' },
        { title: 'Alcohol-related cause', text: 'Approximately 30–35%. Ethanol directly injures acinar cells and increases secretion viscosity, promoting protein plugs.' },
        { title: 'Rare causes', text: 'Hypertriglyceridaemia, hypercalcaemia, drugs such as azathioprine, furosemide, steroids or ACE inhibitors, viral, autoimmune and iatrogenic causes.' },
        { title: 'Post-ERCP', text: 'Acute pancreatitis is the most common complication after ERCP. Abdominal surgery may also trigger it.' },
      ],
      key: 'Early CT can underestimate disease: necrosis is assessed reliably only after 48–72 hours.',
    },
    atlanta: {
      title: 'Atlanta classification: morphology and collections',
      lead: 'Atlanta separates interstitial oedematous from necrotising pancreatitis and names peripancreatic collections according to time and content.',
      morphology: [
        { title: 'Interstitial oedematous', text: 'Diffuse pancreatic swelling, homogeneous enhancement and peripancreatic fat stranding.' },
        { title: 'Necrotising', text: 'Pancreatic parenchymal and/or fat necrosis. Typical findings are absent enhancement and heterogeneous areas, >30% or >3 cm.' },
      ],
      collectionHeaders: ['Type', '< 4 weeks', '> 4 weeks'],
      collections: [
        ['Oedematous pancreatitis', 'APFC: acute peripancreatic fluid collection, no capsule', 'Pseudocyst: defined wall/capsule, purely fluid'],
        ['Necrotising pancreatitis', 'ANC: acute necrotic collection, heterogeneous solid/fluid material', 'WON: walled-off necrosis, organised capsule around necrosis'],
      ],
      key: 'Time and content drive the name: fluid without a wall is APFC; organised necrosis after 4 weeks is WON.',
    },
    ctsi: {
      title: 'CT severity index by Balthazar',
      lead: 'CTSI combines the Balthazar grade with the necrosis score. The maximum is 10 points.',
      balthazarHeaders: ['Grade', 'CT finding', 'Points'],
      balthazarRows: [
        ['A', 'Normal', '0'],
        ['B', 'Pancreatic swelling', '1'],
        ['C', 'Peripancreatic fat stranding', '2'],
        ['D', 'One peripancreatic fluid collection', '3'],
        ['E', 'At least two collections or retroperitoneal gas', '4'],
      ],
      necrosisHeaders: ['Necrosis', 'Additional points'],
      necrosisRows: [
        ['No necrosis', '+0 points'],
        ['< 30% necrosis', '+2 points'],
        ['30–50% necrosis', '+4 points'],
        ['> 50% necrosis', '+6 points; mortality clearly increased'],
      ],
      interpretationHeaders: ['CTSI', 'Interpretation'],
      interpretationRows: [
        ['0–3 points', 'Mild; mortality < 3%'],
        ['4–6 points', 'Moderate; morbidity increases'],
        ['7–10 points', 'Severe; mortality up to 17%'],
      ],
    },
    complications: {
      title: 'Actively search for complications',
      lead: 'Complications alter management. Vessels, collections, necrosis and duct integrity must be reviewed actively.',
      items: [
        { title: 'Pseudoaneurysm', text: 'Round, sharply defined arterial structure in or near a collection/necrosis. It results from enzymatic arterial wall erosion, often involving the splenic artery.' },
        { title: 'Venous thrombosis', text: 'Inflammation and oedema slow flow and irritate adjacent veins. The splenic and portal veins are commonly affected.' },
        { title: 'Infected necrosis', text: 'Gas within necrotic tissue is virtually pathognomonic on CT.' },
        { title: 'Duct rupture', text: 'MRCP may show contrast extravasation or disconnected duct syndrome.' },
      ],
      cave: 'Do not miss a pseudoaneurysm as a small hyperdense focus: arterial phase and relation to a collection are essential.',
    },
    chronic: {
      title: 'Chronic pancreatitis',
      lead: 'In late-stage disease, calcifications, parenchymal atrophy and ductal irregularity form the classic triad.',
      items: [
        { title: 'Pancreatic calcifications', text: 'Pathognomonic; may be intraductal or parenchymal.' },
        { title: 'Parenchymal atrophy', text: 'Reflects chronic destruction and fibrosis.' },
        { title: 'Pancreatic duct', text: 'Dilatation >3 mm with a chain-of-lakes pattern of alternating strictures and dilatations.' },
      ],
      key: 'Calcifications plus an irregularly dilated duct strongly support chronic pancreatitis.',
    },
    dd: {
      title: 'Important differential diagnoses',
      lead: 'Chronic pancreatitis may mimic carcinoma; autoimmune pancreatitis may mimic a mass. Duct signs and enhancement patterns help.',
      headers: ['Entity', 'Clues'],
      rows: [
        ['Chronic pancreatitis', 'Calcifications, a long ductal narrowing and the duct-penetrating sign: the duct can be seen traversing the lesion.'],
        ['Pancreatic carcinoma', 'No calcifications within the mass, abrupt duct cut-off, downstream tail atrophy and vascular infiltration.'],
        ['Autoimmune pancreatitis type 1', 'Sausage-shaped configuration with loss of lobulation, hypodense capsule-like halo and rapid steroid response.'],
      ],
      cave: 'Abrupt duct cut-off with tail atrophy and vascular contact is suspicious for malignancy, even when pancreatitis is suspected clinically.',
    },
    takehome: {
      title: 'Take home message',
      lead: 'Core rules for exams and reporting.',
      items: [
        { title: 'Think of the cause', text: 'Biliary and alcohol-related causes dominate; post-ERCP pancreatitis is the key iatrogenic setting.' },
        { title: 'Name Atlanta correctly', text: 'Separate interstitial from necrotising disease and APFC/pseudocyst/ANC/WON by time and content.' },
        { title: 'Use CTSI systematically', text: 'Balthazar grade plus necrosis score gives CT severity.' },
        { title: 'Search complications', text: 'Exclude pseudoaneurysm, venous thrombosis, infected necrosis and duct rupture.' },
        { title: 'Do not miss carcinoma', text: 'Abrupt duct cut-off, tail atrophy and vascular infiltration argue against pure pancreatitis.' },
      ],
    },
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbAbdomen: 'شکم',
    breadcrumbCurrent: 'پانکراس · پانکراتیت',
    title: 'پانکراتیت',
    subtitle: 'پانکراتیت حاد و مزمن: طبقه‌بندی آتلانتا، CTSI، عوارض و تشخیص‌های افتراقی مهم',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'فلش‌کارت',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    sections: [
      { id: 'grundlagen', label: 'مبانی بالینی', icon: '🧪' },
      { id: 'atlanta', label: 'طبقه‌بندی آتلانتا', icon: '📋' },
      { id: 'ctsi', label: 'CTSI/Balthazar', icon: '🧮' },
      { id: 'komplikationen', label: 'عوارض', icon: '⚠️' },
      { id: 'chronisch', label: 'پانکراتیت مزمن', icon: '🧱' },
      { id: 'dd', label: 'تشخیص افتراقی', icon: '🔎' },
      { id: 'takehome', label: 'نکات کلیدی', icon: '💡' },
    ],
    heroCards: [
      { value: '۴۰–۵۰٪', label: 'صفراوی', text: 'کلدوکولیتیازیس یا میکرولیتیازیس' },
      { value: '۴۸–۷۲ ساعت', label: 'زمان ارزیابی نکروز', text: 'ارزیابی نکروز پس از این زمان مطمئن‌تر است' },
      { value: 'CTSI 0–10', label: 'شدت', text: 'گرید Balthazar به‌علاوه امتیاز نکروز' },
    ],
    basics: {
      title: 'مبانی بالینی پانکراتیت حاد',
      lead: 'علل اصلی، صفراوی و الکلی هستند. تصویربرداری برای تعیین مورفولوژی، نکروز و عوارض اهمیت دارد.',
      items: [
        { title: 'علت صفراوی', text: 'حدود ۴۰–۵۰٪. سنگ کلدوک یا میکرولیتیازیس پاپیلای اصلی را مسدود می‌کند و باعث رفلاکس صفرا یا افزایش فشار مجرای پانکراس و فعال‌شدن زودرس آنزیم‌ها می‌شود.' },
        { title: 'علت الکلی', text: 'حدود ۳۰–۳۵٪. اتانول به سلول‌های آسینار آسیب مستقیم می‌زند و ویسکوزیته ترشحات را افزایش می‌دهد؛ در نتیجه پلاگ پروتئینی ایجاد می‌شود.' },
        { title: 'علل نادر', text: 'هیپرتری‌گلیسریدمی، هیپرکلسمی، داروها مانند آزاتیوپرین، فوروزماید، استروئیدها یا ACE inhibitor، علل ویروسی، خودایمنی و یاتروژنیک.' },
        { title: 'پس از ERCP', text: 'پانکراتیت حاد شایع‌ترین عارضه پس از ERCP است. جراحی‌های شکمی نیز می‌توانند محرک باشند.' },
      ],
      key: 'CT خیلی زود ممکن است شدت بیماری را کمتر نشان دهد؛ ارزیابی نکروز معمولاً پس از ۴۸–۷۲ ساعت قابل اعتماد است.',
    },
    atlanta: {
      title: 'طبقه‌بندی آتلانتا: مورفولوژی و تجمعات',
      lead: 'آتلانتا پانکراتیت ادماتوی بینابینی را از نوع نکروزان جدا می‌کند و تجمعات اطراف پانکراس را بر اساس زمان و محتوا نام‌گذاری می‌کند.',
      morphology: [
        { title: 'ادماتوی بینابینی', text: 'تورم منتشر پانکراس، enhancement همگن و stranding چربی اطراف پانکراس.' },
        { title: 'نکروزان', text: 'نکروز پارانشیم پانکراس و/یا چربی. عدم enhancement و نواحی ناهمگن، به‌ویژه بیش از ۳۰٪ یا بیش از ۳ سانتی‌متر.' },
      ],
      collectionHeaders: ['نوع', '< ۴ هفته', '> ۴ هفته'],
      collections: [
        ['پانکراتیت ادماتوی', 'APFC: تجمع مایع حاد اطراف پانکراس، بدون کپسول', 'پسودوسیست: دیواره/کپسول مشخص، کاملاً مایع'],
        ['پانکراتیت نکروزان', 'ANC: تجمع نکروتیک حاد، ناهمگن و مخلوط جامد/مایع', 'WON: نکروز محصور با کپسول سازمان‌یافته'],
      ],
      key: 'زمان و محتوا نام ضایعه را تعیین می‌کنند: مایع بدون کپسول APFC است؛ نکروز سازمان‌یافته پس از ۴ هفته WON است.',
    },
    ctsi: {
      title: 'شاخص شدت CT بر اساس Balthazar',
      lead: 'CTSI گرید Balthazar را با امتیاز نکروز ترکیب می‌کند. حداکثر امتیاز ۱۰ است.',
      balthazarHeaders: ['گرید', 'یافته CT', 'امتیاز'],
      balthazarRows: [
        ['A', 'طبیعی', '0'],
        ['B', 'تورم پانکراس', '1'],
        ['C', 'stranding چربی اطراف پانکراس', '2'],
        ['D', 'یک تجمع مایع اطراف پانکراس', '3'],
        ['E', 'حداقل دو تجمع یا گاز رتروپریتوئن', '4'],
      ],
      necrosisHeaders: ['نکروز', 'امتیاز اضافه'],
      necrosisRows: [
        ['بدون نکروز', '+0'],
        ['نکروز کمتر از ۳۰٪', '+2'],
        ['نکروز ۳۰–۵۰٪', '+4'],
        ['نکروز بیش از ۵۰٪', '+6؛ افزایش واضح مرگ‌ومیر'],
      ],
      interpretationHeaders: ['CTSI', 'تفسیر'],
      interpretationRows: [
        ['0–3', 'خفیف؛ مرگ‌ومیر کمتر از ۳٪'],
        ['4–6', 'متوسط؛ موربیدیتی افزایش می‌یابد'],
        ['7–10', 'شدید؛ مرگ‌ومیر تا ۱۷٪'],
      ],
    },
    complications: {
      title: 'جست‌وجوی فعال عوارض',
      lead: 'عوارض درمان را تغییر می‌دهند. عروق، تجمعات، نکروز و پیوستگی مجرا باید فعالانه بررسی شوند.',
      items: [
        { title: 'پسودوآنوریسم', text: 'ساختار گرد و واضح در فاز شریانی داخل یا کنار تجمع/نکروز. به علت خوردگی دیواره عروق توسط آنزیم‌های پانکراس ایجاد می‌شود؛ شایعاً شریان طحالی.' },
        { title: 'ترومبوز وریدی', text: 'التهاب و فشار ادم جریان خون را کند و دیواره ورید را تحریک می‌کند. ورید طحالی و ورید پورت شایع‌تر درگیر می‌شوند.' },
        { title: 'نکروز عفونی', text: 'گاز داخل ناحیه نکروز در CT تقریباً پاتوگنومونیک است.' },
        { title: 'پارگی مجرا', text: 'MRCP می‌تواند نشت کنتراست یا disconnected duct syndrome را نشان دهد.' },
      ],
      cave: 'پسودوآنوریسم نباید با یک کانون هایپردنس کوچک اشتباه گرفته شود؛ فاز شریانی و ارتباط با تجمع بسیار مهم است.',
    },
    chronic: {
      title: 'پانکراتیت مزمن',
      lead: 'در مرحله دیررس، تریاد کلاسیک شامل کلسیفیکاسیون، آتروفی پارانشیم و تغییرات مجرایی است.',
      items: [
        { title: 'کلسیفیکاسیون پانکراس', text: 'پاتوگنومونیک؛ می‌تواند داخل مجرا یا داخل پارانشیم باشد.' },
        { title: 'آتروفی پارانشیم', text: 'نشانه تخریب مزمن و فیبروز.' },
        { title: 'مجرای پانکراس', text: 'اتساع بیش از ۳ میلی‌متر و الگوی زنجیره‌ای با تنگی‌ها و گشادشدگی‌های متناوب.' },
      ],
      key: 'کلسیفیکاسیون همراه با مجرای نامنظم و گشاد به‌شدت به نفع پانکراتیت مزمن است.',
    },
    dd: {
      title: 'تشخیص‌های افتراقی مهم',
      lead: 'پانکراتیت مزمن می‌تواند شبیه کارسینوم باشد؛ پانکراتیت خودایمنی نیز می‌تواند نمای توده‌ای بدهد.',
      headers: ['بیماری', 'نکات افتراقی'],
      rows: [
        ['پانکراتیت مزمن', 'کلسیفیکاسیون، تنگی طولانی مجرا و duct-penetrating sign: مجرا از درون ضایعه عبور می‌کند.'],
        ['کارسینوم پانکراس', 'عدم کلسیفیکاسیون در توده، قطع ناگهانی مجرا، آتروفی دم پانکراس و درگیری عروقی.'],
        ['پانکراتیت خودایمنی نوع ۱', 'ظاهر سوسیسی با از بین رفتن لوبولاسیون، halo هیپودنس کپسولی-فیبروتیک و پاسخ سریع به استروئید.'],
      ],
      cave: 'قطع ناگهانی مجرا همراه آتروفی دم و تماس عروقی به نفع بدخیمی است، حتی اگر از نظر بالینی پانکراتیت مطرح باشد.',
    },
    takehome: {
      title: 'نکات کلیدی',
      lead: 'قواعد اصلی برای امتحان و گزارش.',
      items: [
        { title: 'علت را در نظر بگیر', text: 'علل صفراوی و الکلی شایع‌ترین‌اند؛ پانکراتیت پس از ERCP علت یاتروژنیک مهم است.' },
        { title: 'آتلانتا را درست نام‌گذاری کن', text: 'بینابینی را از نکروزان جدا کن و APFC/پسودوسیست/ANC/WON را بر اساس زمان و محتوا تشخیص بده.' },
        { title: 'CTSI را سیستماتیک حساب کن', text: 'گرید Balthazar به‌علاوه امتیاز نکروز، شدت CT را تعیین می‌کند.' },
        { title: 'عوارض را فعالانه بجوی', text: 'پسودوآنوریسم، ترومبوز وریدی، نکروز عفونی و پارگی مجرا را رد کن.' },
        { title: 'کارسینوم را از دست نده', text: 'قطع ناگهانی مجرا، آتروفی دم و درگیری عروقی علیه پانکراتیت ساده است.' },
      ],
    },
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
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{label}</strong>
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
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Cards({ items }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function PankreatitisPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('pankreatitis')
  const lessonPath = '/abdomen/pankreas/pankreatitis'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=pankreatitis&from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>{copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/pankreatitis?from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>{copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <Cards items={copy.basics.items} />
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="atlanta" title={copy.atlanta.title} lead={copy.atlanta.lead}>
            <Cards items={copy.atlanta.morphology} />
            <Table headers={copy.atlanta.collectionHeaders} rows={copy.atlanta.collections} />
            <Callout label={copy.keyLabel}>{copy.atlanta.key}</Callout>
          </Section>

          <Section id="ctsi" title={copy.ctsi.title} lead={copy.ctsi.lead}>
            <Table headers={copy.ctsi.balthazarHeaders} rows={copy.ctsi.balthazarRows} />
            <Table headers={copy.ctsi.necrosisHeaders} rows={copy.ctsi.necrosisRows} />
            <Table headers={copy.ctsi.interpretationHeaders} rows={copy.ctsi.interpretationRows} />
          </Section>

          <Section id="komplikationen" title={copy.complications.title} lead={copy.complications.lead}>
            <Cards items={copy.complications.items} />
            <Callout type="cave" label={copy.caveLabel}>{copy.complications.cave}</Callout>
          </Section>

          <Section id="chronisch" title={copy.chronic.title} lead={copy.chronic.lead}>
            <Cards items={copy.chronic.items} />
            <Callout label={copy.keyLabel}>{copy.chronic.key}</Callout>
          </Section>

          <Section id="dd" title={copy.dd.title} lead={copy.dd.lead}>
            <Table headers={copy.dd.headers} rows={copy.dd.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.dd.cave}</Callout>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
