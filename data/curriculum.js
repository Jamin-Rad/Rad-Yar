// Neue Kurrikulum-Struktur (Stand 2026, Quelle: Inhalt.txt)
// Jeder Eintrag (Fach/Kapitel/Thema) trägt seinen Titel inline in allen
// 3 Sprachen (title: {de, en, fa}) - keine separaten Übersetzungs-Dicts mehr.
//
// thema.group: optionale Breadcrumb-Liste für tiefer verschachtelte
// Zwischenebenen aus Inhalt.txt (z.B. ['Knochenbildende Tumoren']).
// thema.sub: echte Varianten/Unterformen eines Themas.
// "ready"-Themen haben link/mcqLink/flashcardLink/fallLink + updatedAt.

export const CURRICULUM = [
  {
    id: 'gehirn',
    title: { de: 'Kopf', en: 'Head', fa: 'سر' },
    icon: '🧠', color: '#a78bfa',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    bodyZone: 'Neuroradiologie',
    kapitel: [],
  },
  {
    id: 'hals',
    title: { de: 'Hals/HNO', en: 'Neck/ENT', fa: 'گردن و ENT' },
    icon: '🦋', color: '#818cf8',
    bg: 'linear-gradient(135deg,#1a0c40,#2d1b69)',
    bodyZone: 'Hals',
    kapitel: [],
  },
  {
    id: 'thorax',
    title: { de: 'Thorax', en: 'Thorax', fa: 'قفسه سینه' },
    icon: '🫁', color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    bodyZone: 'Thorax',
    kapitel: [],
  },
  {
    id: 'mamma',
    title: { de: 'Mamma', en: 'Breast', fa: 'پستان' },
    icon: '🩺', color: '#f472b6',
    bg: 'linear-gradient(135deg,#2a0a20,#5a1040)',
    bodyZone: 'Brust',
    kapitel: [],
  },
  {
    id: 'abdomen',
    title: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    icon: '🫘', color: '#10b981',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    bodyZone: 'Abdomen',
    kapitel: [],
  },
  {
    id: 'becken-f',
    title: { de: 'Becken – Frau', en: 'Pelvis – Female', fa: 'لگن – زنان' },
    icon: '♀️', color: '#fb7185',
    bg: 'linear-gradient(135deg,#2a0a10,#5a1020)',
    bodyZone: 'BeckenF',
    kapitel: [],
  },
  {
    id: 'becken-m',
    title: { de: 'Becken – Mann', en: 'Pelvis – Male', fa: 'لگن – مردان' },
    icon: '♂️', color: '#c084fc',
    bg: 'linear-gradient(135deg,#1a0a30,#3a1060)',
    bodyZone: 'BeckenM',
    kapitel: [],
  },
  {
    id: 'msk',
    title: { de: 'Muskuloskelettal', en: 'Musculoskeletal', fa: 'اسکلتی-عضلانی' },
    icon: '🦴', color: '#fb923c',
    bg: 'linear-gradient(135deg,#2a1a00,#4a3000)',
    bodyZone: 'Muskuloskelettal',
    kapitel: [
      {
        id: 'msk-anatomie',
        title: { de: '1. Anatomische Grundlagen', en: '1. Anatomical Fundamentals', fa: '۱. مبانی آناتومیک' },
        icon: '🦴',
        themen: [
          { id: 'msk-knochen', title: { de: 'Knochen', en: 'Bone', fa: 'استخوان' }, tags: ['Rö','MRT'], diff: 1 },
          { id: 'msk-gelenke-ligamente', title: { de: 'Gelenke & Ligamente', en: 'Joints & Ligaments', fa: 'مفاصل و رباط‌ها' }, tags: ['MRT'], diff: 1 },
          { id: 'msk-muskeln-sehnen', title: { de: 'Muskeln & Sehnen', en: 'Muscles & Tendons', fa: 'عضلات و تاندون‌ها' }, tags: ['MRT'], diff: 1 },
          { id: 'msk-anatomie-gefaesse', title: { de: 'Gefäße', en: 'Vessels', fa: 'عروق' }, tags: ['MRT'], diff: 1 },
          { id: 'msk-periphere-nerven', title: { de: 'Periphere Nerven', en: 'Peripheral Nerves', fa: 'اعصاب محیطی' }, tags: ['MRT'], diff: 1 },
        ],
      },
      {
        id: 'msk-modalitaeten',
        title: { de: '2. Bildgebungsmodalitäten', en: '2. Imaging Modalities', fa: '۲. روش‌های تصویربرداری' },
        icon: '📡',
        themen: [
          { id: 'msk-roentgen', title: { de: 'Röntgen', en: 'Radiography (X-ray)', fa: 'رادیوگرافی (Rö)' }, tags: ['Rö'], diff: 1 },
          { id: 'msk-mrt', title: { de: 'MRT', en: 'MRI', fa: 'MRI' }, tags: ['MRT'], diff: 1 },
          { id: 'msk-szintigraphie', title: { de: 'Skelettszintigraphie / SPECT', en: 'Bone Scintigraphy / SPECT', fa: 'اسکن استخوان / SPECT' }, tags: ['NUK'], diff: 2 },
        ],
      },
      {
        id: 'msk-knochentumoren',
        title: { de: '3. Knochentumoren & tumorähnliche Läsionen', en: '3. Bone Tumours & Tumour-like Lesions', fa: '۳. تومورهای استخوانی و ضایعات شبه‌توموری' },
        icon: '🔬',
        themen: [
          { id: 'knochentumor-grundlagen', title: { de: 'Grundlagen & Klassifikation', en: 'Fundamentals & Classification', fa: 'مبانی و طبقه‌بندی' }, tags: ['Rö','MRT'], diff: 2 },
          { id: 'osteom', title: { de: 'Osteom', en: 'Osteoma', fa: 'استئوم' }, group: ['Knochenbildende Tumoren'], tags: ['Rö'], diff: 1 },
          { id: 'osteoid-osteom', title: { de: 'Osteoid-Osteom', en: 'Osteoid Osteoma', fa: 'استئوئید استئوما' }, group: ['Knochenbildende Tumoren'], tags: ['Rö','CT'], diff: 2 },
          { id: 'osteoblastom', title: { de: 'Osteoblastom', en: 'Osteoblastoma', fa: 'استئوبلاستوما' }, group: ['Knochenbildende Tumoren'], tags: ['Rö','CT'], diff: 2 },
          { id: 'osteosarkom', title: { de: 'Osteosarkom', en: 'Osteosarcoma', fa: 'استئوسارکوما' }, group: ['Knochenbildende Tumoren'], tags: ['Rö','MRT'], diff: 3 },
          { id: 'osteochondrom', title: { de: 'Osteochondrom', en: 'Osteochondroma', fa: 'استئوکندروم' }, group: ['Knorpelbildende Tumoren'], tags: ['Rö'], diff: 1 },
          { id: 'enchondrom', title: { de: 'Enchondrom', en: 'Enchondroma', fa: 'انکندروم' }, group: ['Knorpelbildende Tumoren'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'chondrosarkom', title: { de: 'Chondrosarkom', en: 'Chondrosarcoma', fa: 'کندروسارکوما' }, group: ['Knorpelbildende Tumoren'], tags: ['Rö','MRT'], diff: 3 },
          { id: 'fibrosarkom-knochen', title: { de: 'Fibrosarkom', en: 'Fibrosarcoma', fa: 'فیبروسارکوما' }, group: ['Fibröse Tumoren'], tags: ['MRT'], diff: 3 },
          { id: 'ewing-sarkom', title: { de: 'Ewing-Sarkom', en: 'Ewing Sarcoma', fa: 'سارکوم یووینگ' }, group: ['Hämatopoetische & Rundzelltumoren'], tags: ['MRT','Rö'], diff: 3 },
          { id: 'plasmozytom-myelom', title: { de: 'Plasmozytom / Multiples Myelom', en: 'Plasmacytoma / Multiple Myeloma', fa: 'پلاسموسیتوم / مولتیپل میلوما' }, group: ['Hämatopoetische & Rundzelltumoren'], tags: ['MRT','CT'], diff: 3 },
          { id: 'knochenlymphom', title: { de: 'Knochenlymphom', en: 'Bone Lymphoma', fa: 'لنفوم استخوان' }, group: ['Hämatopoetische & Rundzelltumoren'], tags: ['MRT'], diff: 3 },
          { id: 'riesenzelltumor', title: { de: 'Riesenzelltumor (GCT)', en: 'Giant Cell Tumour (GCT)', fa: 'تومور سلول ژانت (GCT)' }, tags: ['Rö','MRT'], diff: 2 },
          { id: 'knochenzyste-simple', title: { de: 'Einfache Knochenzyste (SBC)', en: 'Simple Bone Cyst (SBC)', fa: 'کیست ساده استخوان (SBC)' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö'], diff: 1 },
          { id: 'knochenzyste-aneurysmatisch', title: { de: 'Aneurysmatische Knochenzyste (AKZ)', en: 'Aneurysmal Bone Cyst (ABC)', fa: 'کیست آنوریسمال استخوان (ABC)' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'kortikalisdefekt-nof', title: { de: 'Fibröser Kortikalisdefekt / NOF', en: 'Fibrous Cortical Defect / NOF', fa: 'نقص کورتیکال فیبروزی / NOF' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö'], diff: 1 },
          { id: 'fibroese-dysplasie', title: { de: 'Fibröse Dysplasie', en: 'Fibrous Dysplasia', fa: 'دیسپلازی فیبروزی' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'enostose', title: { de: 'Enostose', en: 'Enostosis (Bone Island)', fa: 'انوستوز' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö'], diff: 1 },
          { id: 'intraossaeres-lipom', title: { de: 'Intraossäres Lipom', en: 'Intraosseous Lipoma', fa: 'لیپوم داخل‌استخوانی' }, group: ['Tumorähnliche Läsionen'], tags: ['MRT'], diff: 2 },
          { id: 'intraossaeres-ganglion', title: { de: 'Intraossäres Ganglion', en: 'Intraosseous Ganglion', fa: 'گانگلیون داخل‌استخوانی' }, group: ['Tumorähnliche Läsionen'], tags: ['MRT'], diff: 2 },
          { id: 'eosinophiles-granulom', title: { de: 'Eosinophiles Granulom (LCH)', en: 'Eosinophilic Granuloma (LCH)', fa: 'گرانولوم ائوزینوفیلیک (LCH)' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'myositis-ossificans', title: { de: 'Myositis ossificans', en: 'Myositis Ossificans', fa: 'میوزیت اوسیفیکانس' }, group: ['Tumorähnliche Läsionen'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'knochenmetastasen', title: { de: 'Knochenmetastasen', en: 'Bone Metastases', fa: 'متاستازهای استخوانی' }, tags: ['CT','MRT','NUK'], diff: 2 },
        ],
      },
      {
        id: 'msk-weichteiltumoren',
        title: { de: '4. Weichteiltumoren', en: '4. Soft-tissue Tumours', fa: '۴. تومورهای بافت نرم' },
        icon: '🧬',
        themen: [
          { id: 'lipom-msk', title: { de: 'Lipom', en: 'Lipoma', fa: 'لیپوم' }, group: ['Benigne Weichteiltumoren'], tags: ['MRT'], diff: 1 },
          { id: 'haemangiom-msk', title: { de: 'Hämangiom / vaskuläre Malformation', en: 'Haemangioma / Vascular Malformation', fa: 'همانژیوم / مالفورماسیون عروقی' }, group: ['Benigne Weichteiltumoren'], tags: ['MRT'], diff: 2 },
          { id: 'tgct', title: { de: 'Tenosynovialer Riesenzelltumor (TGCT)', en: 'Tenosynovial Giant Cell Tumour (TGCT)', fa: 'تومور تنوسینوویال سلول ژانت (TGCT)' }, group: ['Benigne Weichteiltumoren'], tags: ['MRT'], diff: 2 },
          { id: 'liposarkom', title: { de: 'Liposarkom', en: 'Liposarcoma', fa: 'لیپوسارکوما' }, group: ['Maligne Weichteiltumoren'], tags: ['MRT'], diff: 3 },
          { id: 'synovialsarkom', title: { de: 'Synovialsarkom', en: 'Synovial Sarcoma', fa: 'سینوویال سارکوما' }, group: ['Maligne Weichteiltumoren'], tags: ['MRT'], diff: 3 },
        ],
      },
      {
        id: 'msk-knocheninfektionen',
        title: { de: '5. Knocheninfektionen', en: '5. Bone Infections', fa: '۵. عفونت‌های استخوان' },
        icon: '🦠',
        themen: [
          { id: 'osteomyelitis', title: { de: 'Osteomyelitis', en: 'Osteomyelitis', fa: 'استئومیلیت' }, tags: ['MRT','Rö'], diff: 2 },
          { id: 'septische-arthritis', title: { de: 'Septische Arthritis', en: 'Septic Arthritis', fa: 'آرتریت سپتیک' }, tags: ['MRT','Sono'], diff: 2 },
        ],
      },
      {
        id: 'msk-metabolisch',
        title: { de: '6. Metabolische & systemische Knochenerkrankungen', en: '6. Metabolic & Systemic Bone Diseases', fa: '۶. بیماری‌های متابولیک و سیستمیک استخوان' },
        icon: '⚖️',
        themen: [
          { id: 'osteoporose', title: { de: 'Osteoporose', en: 'Osteoporosis', fa: 'استئوپروز' }, tags: ['Rö'], diff: 1 },
          { id: 'morbus-paget', title: { de: 'Morbus Paget', en: "Paget's Disease", fa: 'بیماری پاژه (Morbus Paget)' }, tags: ['Rö','CT'], diff: 2 },
          { id: 'renale-osteodystrophie', title: { de: 'Renale Osteodystrophie', en: 'Renal Osteodystrophy', fa: 'استئودیستروفی کلیوی' }, tags: ['Rö'], diff: 2 },
          { id: 'rachitis', title: { de: 'Rachitis', en: 'Rickets', fa: 'راشیتیسم' }, tags: ['Rö'], diff: 2 },
        ],
      },
      {
        id: 'msk-arthritiden',
        title: { de: '7. Arthritiden', en: '7. Arthritides', fa: '۷. آرتریت‌ها' },
        icon: '🔥',
        themen: [
          { id: 'arthrose', title: { de: 'Arthrose (OA)', en: 'Osteoarthritis (OA)', fa: 'آرتروز (OA)' }, tags: ['Rö','MRT'], diff: 1 },
          { id: 'rheumatoide-arthritis', title: { de: 'Rheumatoide Arthritis (RA)', en: 'Rheumatoid Arthritis (RA)', fa: 'آرتریت روماتوئید (RA)' }, tags: ['Rö','MRT'], diff: 2 },
          { id: 'gicht', title: { de: 'Gicht', en: 'Gout', fa: 'نقرس' }, group: ['Kristallarthropathien'], tags: ['Rö','CT'], diff: 2 },
          { id: 'chondrokalzinose', title: { de: 'Chondrokalzinose (CPPD)', en: 'Chondrocalcinosis (CPPD)', fa: 'کندروکلسینوز (CPPD)' }, group: ['Kristallarthropathien'], tags: ['Rö'], diff: 2 },
        ],
      },
      {
        id: 'msk-knochennekrosen',
        title: { de: '8. Knochennekrosen', en: '8. Bone Necrosis', fa: '۸. نکروزهای استخوانی' },
        icon: '💀',
        themen: [
          { id: 'avn-huefte', title: { de: 'Avaskuläre Nekrose (AVN) & Hüftkopfnekrose', en: 'Avascular Necrosis (AVN) & Femoral Head Necrosis', fa: 'نکروز آواسکولار (AVN) و نکروز سر فمور' }, tags: ['MRT'], diff: 2 },
          { id: 'knocheninfarkt', title: { de: 'Knocheninfarkt', en: 'Bone Infarct', fa: 'انفارکت استخوان' }, tags: ['MRT'], diff: 2 },
        ],
      },
      {
        id: 'msk-osteochondrosen',
        title: { de: '9. Osteochondrosen', en: '9. Osteochondroses', fa: '۹. استئوکندروزها' },
        icon: '🧒',
        themen: [
          { id: 'morbus-perthes', title: { de: 'Morbus Perthes', en: 'Perthes Disease', fa: 'بیماری پرتس (Morbus Perthes)' }, tags: ['Rö','MRT'], diff: 2 },
          { id: 'osgood-schlatter', title: { de: 'Morbus Osgood-Schlatter', en: 'Osgood-Schlatter Disease', fa: 'بیماری آزگود-اشلاتر' }, tags: ['Rö'], diff: 1 },
          { id: 'morbus-scheuermann', title: { de: 'Morbus Scheuermann', en: "Scheuermann's Disease", fa: 'بیماری شویرمان' }, tags: ['Rö'], diff: 2 },
          { id: 'osteochondrosis-dissecans', title: { de: 'Osteochondrosis dissecans', en: 'Osteochondritis Dissecans (OCD)', fa: 'استئوکندریت دیسکانس (OCD)' }, tags: ['MRT'], diff: 2 },
          { id: 'weitere-osteochondrosen', title: { de: 'Weitere Osteochondrosen', en: 'Other Osteochondroses', fa: 'سایر استئوکندروزها' }, tags: ['Rö'], diff: 1 },
        ],
      },
      {
        id: 'msk-trauma',
        title: { de: '10. Traumatologie & Frakturen', en: '10. Trauma & Fractures', fa: '۱۰. تروما و شکستگی‌ها' },
        icon: '🚑',
        themen: [
          { id: 'frakturbeschreibung', title: { de: 'Frakturbeschreibung', en: 'Fracture Description', fa: 'توصیف شکستگی' }, group: ['Grundlagen'], tags: ['Rö'], diff: 1 },
          { id: 'frakturheilung', title: { de: 'Frakturheilung & Komplikationen', en: 'Fracture Healing & Complications', fa: 'ترمیم شکستگی و عوارض' }, group: ['Grundlagen'], tags: ['Rö'], diff: 2 },
          { id: 'stressfrakturen', title: { de: 'Stressfrakturen', en: 'Stress Fractures', fa: 'شکستگی‌های استرسی' }, group: ['Grundlagen'], tags: ['MRT','Rö'], diff: 2 },
          { id: 'frakturen-kindesalter', title: { de: 'Frakturen im Kindesalter', en: 'Paediatric Fractures', fa: 'شکستگی‌های دوران کودکی' }, group: ['Grundlagen'], tags: ['Rö'], diff: 2 },
          { id: 'luxationen', title: { de: 'Luxationen', en: 'Dislocations', fa: 'دررفتگی‌ها (لوکساسیون)' }, group: ['Grundlagen'], tags: ['Rö'], diff: 1 },
          { id: 'ao-klassifikation', title: { de: 'AO-Klassifikation', en: 'AO Classification', fa: 'طبقه‌بندی AO' }, group: ['Klassifikationssysteme'], tags: ['Rö'], diff: 2 },
          { id: 'klassische-klassifikationen', title: { de: 'Relevante klassische Klassifikationen', en: 'Relevant Classic Classifications', fa: 'طبقه‌بندی‌های کلاسیک مهم' }, group: ['Klassifikationssysteme'], tags: ['Rö'], diff: 2 },
          { id: 'proximale-humerusfraktur', title: { de: 'Proximale Humerusfraktur', en: 'Proximal Humerus Fracture', fa: 'شکستگی پروگزیمال هومروس' }, group: ['Schulter & Oberarm'], tags: ['Rö','CT'], diff: 2 },
          { id: 'klavikulafraktur', title: { de: 'Klavikulafraktur', en: 'Clavicle Fracture', fa: 'شکستگی ترقوه (کلاویکول)' }, group: ['Schulter & Oberarm'], tags: ['Rö'], diff: 1 },
          { id: 'skapulafraktur', title: { de: 'Skapulafraktur', en: 'Scapula Fracture', fa: 'شکستگی کتف (اسکاپولا)' }, group: ['Schulter & Oberarm'], tags: ['Rö','CT'], diff: 2 },
          { id: 'distale-humerusfraktur', title: { de: 'Distale Humerusfraktur', en: 'Distal Humerus Fracture', fa: 'شکستگی دیستال هومروس' }, group: ['Ellenbogen & Unterarm'], tags: ['Rö'], diff: 2 },
          { id: 'radiuskoepfchenfraktur', title: { de: 'Radiusköpfchenfraktur', en: 'Radial Head Fracture', fa: 'شکستگی سر رادیوس' }, group: ['Ellenbogen & Unterarm'], tags: ['Rö'], diff: 2 },
          { id: 'monteggia-fraktur', title: { de: 'Monteggia-Fraktur', en: 'Monteggia Fracture', fa: 'شکستگی مونتجیا' }, group: ['Ellenbogen & Unterarm'], tags: ['Rö'], diff: 2 },
          { id: 'galeazzi-fraktur', title: { de: 'Galeazzi-Fraktur', en: 'Galeazzi Fracture', fa: 'شکستگی گالئاتزی' }, group: ['Ellenbogen & Unterarm'], tags: ['Rö'], diff: 2 },
          { id: 'distale-radiusfraktur', title: { de: 'Distale Radiusfraktur', en: 'Distal Radius Fracture', fa: 'شکستگی دیستال رادیوس' }, group: ['Handgelenk & Hand'], tags: ['Rö'], diff: 1 },
          { id: 'skaphoidfraktur', title: { de: 'Skaphoidfraktur', en: 'Scaphoid Fracture', fa: 'شکستگی اسکافوئید' }, group: ['Handgelenk & Hand'], tags: ['Rö','MRT'], diff: 2 },
          { id: 'karpale-frakturen', title: { de: 'Weitere Karpale Frakturen', en: 'Other Carpal Fractures', fa: 'سایر شکستگی‌های کارپ' }, group: ['Handgelenk & Hand'], tags: ['Rö'], diff: 2 },
          { id: 'metakarpale-frakturen', title: { de: 'Metakarpale Frakturen', en: 'Metacarpal Fractures', fa: 'شکستگی‌های متاکارپ' }, group: ['Handgelenk & Hand'], tags: ['Rö'], diff: 1 },
          { id: 'fingerfrakturen', title: { de: 'Fingerfrakturen', en: 'Finger Fractures', fa: 'شکستگی‌های انگشت' }, group: ['Handgelenk & Hand'], tags: ['Rö'], diff: 1 },
          { id: 'proximale-femurfraktur', title: { de: 'Proximale Femurfraktur', en: 'Proximal Femur Fracture', fa: 'شکستگی پروگزیمال فمور' }, group: ['Hüfte & Becken'], tags: ['Rö','CT'], diff: 2 },
          { id: 'beckenringfraktur', title: { de: 'Beckenringfraktur', en: 'Pelvic Ring Fracture', fa: 'شکستگی حلقه لگن' }, group: ['Hüfte & Becken'], tags: ['CT'], diff: 3 },
          { id: 'distale-femurfraktur', title: { de: 'Distale Femurfraktur', en: 'Distal Femur Fracture', fa: 'شکستگی دیستال فمور' }, group: ['Knie & Unterschenkel'], tags: ['Rö'], diff: 2 },
          { id: 'tibiakopffraktur', title: { de: 'Tibiakopffraktur', en: 'Tibial Plateau Fracture', fa: 'شکستگی پلاتوی تیبیا' }, group: ['Knie & Unterschenkel'], tags: ['Rö','CT'], diff: 2 },
          { id: 'patellafraktur-trauma', title: { de: 'Patellafraktur', en: 'Patella Fracture', fa: 'شکستگی کشکک (پاتلا)' }, group: ['Knie & Unterschenkel'], tags: ['Rö'], diff: 1 },
          { id: 'fibulakopffraktur', title: { de: 'Fibulakopffraktur', en: 'Fibular Head Fracture', fa: 'شکستگی سر فیبولا' }, group: ['Knie & Unterschenkel'], tags: ['Rö'], diff: 1 },
          { id: 'osg-fraktur', title: { de: 'OSG-Fraktur', en: 'Ankle Fracture', fa: 'شکستگی مچ پا (OSG)' }, group: ['Sprunggelenk & Fuß'], tags: ['Rö'], diff: 1 },
          { id: 'fusswurzel-frakturen', title: { de: 'Fußwurzel', en: 'Tarsal Fractures', fa: 'شکستگی‌های تارس' }, group: ['Sprunggelenk & Fuß'], tags: ['Rö','CT'], diff: 2 },
          { id: 'vorfuss-frakturen', title: { de: 'Vorfuß', en: 'Forefoot Fractures', fa: 'شکستگی‌های فورفوت' }, group: ['Sprunggelenk & Fuß'], tags: ['Rö'], diff: 1 },
          { id: 'zehenfrakturen', title: { de: 'Zehenfrakturen', en: 'Toe Fractures', fa: 'شکستگی‌های انگشت پا' }, group: ['Sprunggelenk & Fuß'], tags: ['Rö'], diff: 1 },
        ],
      },
      {
        id: 'msk-schulter',
        title: { de: '11. Schulter', en: '11. Shoulder', fa: '۱۱. شانه' },
        icon: '💪',
        themen: [
          { id: 'rotatorenmanschette', title: { de: 'Rotatorenmanschette', en: 'Rotator Cuff', fa: 'روتاتور کاف' }, tags: ['MRT'], diff: 2 },
          { id: 'schulterinstabilitaet', title: { de: 'Schulterinstabilität / Labrumläsionen', en: 'Shoulder Instability / Labral Tears', fa: 'ناپایداری شانه / ضایعات لابروم' }, tags: ['MRT'], diff: 3 },
          { id: 'impingement-kalkschulter', title: { de: 'Impingement-Syndrom & Kalkschulter', en: 'Impingement Syndrome & Calcific Tendinitis', fa: 'سندرم ایمپینجمنت و شانه کلسیفیه' }, tags: ['MRT','Rö'], diff: 2 },
          { id: 'bizepssehne-schulter', title: { de: 'Bizepssehne', en: 'Biceps Tendon', fa: 'تاندون بایسپس' }, tags: ['MRT'], diff: 2 },
          { id: 'bursitis-subacromial', title: { de: 'Bursitis subacromialis / subdeltoidea', en: 'Subacromial / Subdeltoid Bursitis', fa: 'بورسیت ساب‌آکرومیال / ساب‌دلتوئید' }, tags: ['MRT'], diff: 1 },
          { id: 'frozen-shoulder', title: { de: 'Adhäsive Kapsulitis (Frozen Shoulder)', en: 'Adhesive Capsulitis (Frozen Shoulder)', fa: 'کپسولیت چسبنده (شانه یخ‌زده)' }, tags: ['MRT'], diff: 2 },
          { id: 'acg-gelenk', title: { de: 'ACG-Gelenk', en: 'AC Joint', fa: 'مفصل آکرومیوکلاویکولار (ACG)' }, tags: ['Rö','MRT'], diff: 1 },
        ],
      },
      {
        id: 'msk-ellenbogen',
        title: { de: '12. Ellenbogen', en: '12. Elbow', fa: '۱۲. آرنج' },
        icon: '🦴',
        themen: [
          { id: 'epicondylitis', title: { de: 'Epicondylitis (lateral / medial)', en: 'Epicondylitis (Lateral / Medial)', fa: 'اپی‌کوندیلیت (خارجی/داخلی)' }, tags: ['MRT'], diff: 1 },
          { id: 'distale-bizepssehnenruptur', title: { de: 'Distale Bizepssehnenruptur', en: 'Distal Biceps Tendon Rupture', fa: 'پارگی دیستال تاندون بایسپس' }, tags: ['MRT'], diff: 2 },
          { id: 'kubitaltunnelsyndrom', title: { de: 'Kubitaltunnelsyndrom', en: 'Cubital Tunnel Syndrome', fa: 'سندرم تونل کوبیتال' }, tags: ['MRT'], diff: 2 },
          { id: 'bursitis-olecrani', title: { de: 'Bursitis olecrani', en: 'Olecranon Bursitis', fa: 'بورسیت اولکرانون' }, tags: ['MRT','Sono'], diff: 1 },
          { id: 'bandverletzungen-ellenbogen', title: { de: 'Bandverletzungen', en: 'Ligament Injuries', fa: 'آسیب‌های رباطی آرنج' }, tags: ['MRT'], diff: 2 },
        ],
      },
      {
        id: 'msk-hand',
        title: { de: '13. Handgelenk & Hand', en: '13. Wrist & Hand', fa: '۱۳. مچ دست و دست' },
        icon: '✋',
        themen: [
          { id: 'tfcc-laesionen', title: { de: 'TFCC-Läsionen', en: 'TFCC Lesions', fa: 'ضایعات TFCC' }, tags: ['MRT'], diff: 3 },
          { id: 'bandverletzungen-handgelenk', title: { de: 'Bandverletzungen', en: 'Ligament Injuries', fa: 'آسیب‌های رباطی مچ دست' }, tags: ['MRT'], diff: 2 },
          { id: 'morbus-kienboeck', title: { de: 'Morbus Kienböck (AVN des Lunatums)', en: "Kienböck's Disease (AVN of the Lunate)", fa: 'بیماری کینبک (AVN لونیت)' }, tags: ['Rö','MRT'], diff: 2 },
          { id: 'sehnenpathologien-hand', title: { de: 'Sehnenpathologien', en: 'Tendon Pathologies', fa: 'پاتولوژی‌های تاندونی دست' }, tags: ['MRT','Sono'], diff: 2 },
          { id: 'karpaltunnelsyndrom', title: { de: 'Karpaltunnelsyndrom', en: 'Carpal Tunnel Syndrome', fa: 'سندرم تونل کارپال' }, tags: ['MRT','Sono'], diff: 1 },
          { id: 'guyon-kanal-syndrom', title: { de: 'Guyon-Kanal-Syndrom', en: "Guyon's Canal Syndrome", fa: 'سندرم کانال گویون' }, tags: ['MRT'], diff: 2 },
          { id: 'de-quervain', title: { de: 'Tendovaginitis de Quervain', en: "De Quervain's Tenosynovitis", fa: 'تنوسینوویت دو کرواین' }, tags: ['Sono','MRT'], diff: 1 },
          { id: 'ganglion-hand', title: { de: 'Ganglion', en: 'Ganglion Cyst', fa: 'کیست گانگلیون' }, tags: ['Sono','MRT'], diff: 1 },
        ],
      },
      {
        id: 'msk-huefte',
        title: { de: '14. Hüfte', en: '14. Hip', fa: '۱۴. هیپ' },
        icon: '🦴',
        themen: [
          { id: 'hueftdysplasie', title: { de: 'Hüftdysplasie', en: 'Hip Dysplasia', fa: 'دیسپلازی هیپ' }, tags: ['Sono','Rö'], diff: 2 },
          { id: 'fai', title: { de: 'Femoroacetabuläres Impingement (FAI)', en: 'Femoroacetabular Impingement (FAI)', fa: 'ایمپینجمنت فمورواستابولار (FAI)' }, tags: ['MRT','Rö'], diff: 3 },
          { id: 'labrumlaesionen-huefte', title: { de: 'Labrumläsionen', en: 'Labral Tears', fa: 'ضایعات لابروم هیپ' }, tags: ['MRT'], diff: 2 },
          { id: 'coxarthrose', title: { de: 'Coxarthrose', en: 'Hip Osteoarthritis (Coxarthrosis)', fa: 'آرتروز هیپ (کوکسارتروز)' }, tags: ['Rö'], diff: 1 },
          { id: 'bursitis-trochanterica', title: { de: 'Bursitis trochanterica', en: 'Trochanteric Bursitis', fa: 'بورسیت تروکانتریک' }, tags: ['MRT'], diff: 1 },
          { id: 'coxa-saltans', title: { de: 'Coxa saltans / Snapping Hip', en: 'Coxa Saltans / Snapping Hip', fa: 'کوکسا سالتانس (هیپ تق‌تقی)' }, tags: ['MRT','Sono'], diff: 2 },
          { id: 'hamstring-pathologie', title: { de: 'Proximale Hamstring-Pathologie', en: 'Proximal Hamstring Pathology', fa: 'پاتولوژی پروگزیمال همسترینگ' }, tags: ['MRT'], diff: 2 },
          { id: 'coxitis-fugax', title: { de: 'Coxitis fugax', en: 'Transient Synovitis (Coxitis Fugax)', fa: 'سینوویت گذرای هیپ (کوکسیت فوگاکس)' }, tags: ['Sono'], diff: 1 },
        ],
      },
      {
        id: 'msk-knie',
        title: { de: '15. Knie', en: '15. Knee', fa: '۱۵. زانو' },
        icon: '🦵',
        themen: [
          {
            id: 'meniskus',
            title: { de: 'Meniskus', en: 'Meniscus', fa: 'منیسک' },
            tags: ['MRT'], diff: 2,
            link: '/msk/knie/meniskus',
            mcqLink: '/msk/knie/meniskus/mcq',
            flashcardLink: '/flashcards/meniskus',
            fallLink: '/faelle?thema=meniskus',
            ready: true, updatedAt: '2026-06-07',
          },
          { id: 'kreuzbaender', title: { de: 'Kreuzbänder', en: 'Cruciate Ligaments', fa: 'رباط‌های صلیبی' }, tags: ['MRT'], diff: 2 },
          { id: 'seitenbaender-knie', title: { de: 'Seitenbänder', en: 'Collateral Ligaments', fa: 'رباط‌های جانبی زانو' }, tags: ['MRT'], diff: 2 },
          { id: 'knorpelschaeden-knie', title: { de: 'Knorpelschäden', en: 'Cartilage Lesions', fa: 'آسیب‌های غضروفی زانو' }, tags: ['MRT'], diff: 2 },
          { id: 'patella-streckapparat', title: { de: 'Patella & Streckapparat', en: 'Patella & Extensor Mechanism', fa: 'پاتلا و مکانیسم اکستانسور' }, tags: ['MRT'], diff: 2 },
          { id: 'hoffa-impingement', title: { de: 'Hoffa-Fettkörper-Impingement', en: "Hoffa's Fat Pad Impingement", fa: 'ایمپینجمنت بالشتک چربی هوفا' }, tags: ['MRT'], diff: 2 },
          { id: 'itb-syndrom', title: { de: 'Iliotibial-Band-Syndrom', en: 'Iliotibial Band Syndrome', fa: 'سندرم باند ایلیوتیبیال' }, tags: ['MRT'], diff: 1 },
          { id: 'bursitis-baker-zyste', title: { de: 'Bursitiden & Baker-Zyste', en: "Bursitis & Baker's Cyst", fa: 'بورسیت‌ها و کیست بیکر' }, tags: ['MRT','Sono'], diff: 1 },
        ],
      },
      {
        id: 'msk-fuss',
        title: { de: '16. Sprunggelenk & Fuß', en: '16. Ankle & Foot', fa: '۱۶. مچ پا و پا' },
        icon: '🦶',
        themen: [
          { id: 'bandverletzungen-osg', title: { de: 'Bandverletzungen (OSG)', en: 'Ligament Injuries (Ankle)', fa: 'آسیب‌های رباطی مچ پا' }, tags: ['MRT'], diff: 1 },
          { id: 'osg-impingement', title: { de: 'OSG-Impingement (anterior / posterior)', en: 'Ankle Impingement (Anterior / Posterior)', fa: 'ایمپینجمنت مچ پا (قدامی/خلفی)' }, tags: ['MRT'], diff: 2 },
          { id: 'achillessehne', title: { de: 'Achillessehne', en: 'Achilles Tendon', fa: 'تاندون آشیل' }, tags: ['MRT','Sono'], diff: 1 },
          { id: 'peronealsehnen', title: { de: 'Peronealsehnen', en: 'Peroneal Tendons', fa: 'تاندون‌های پرونئال' }, tags: ['MRT'], diff: 2 },
          { id: 'tibialis-posterior-sehne', title: { de: 'Tibialis posterior-Sehne', en: 'Tibialis Posterior Tendon', fa: 'تاندون تیبیالیس پوستریور' }, tags: ['MRT'], diff: 2 },
          { id: 'tibialis-anterior-sehne', title: { de: 'Tibialis anterior-Sehne', en: 'Tibialis Anterior Tendon', fa: 'تاندون تیبیالیس آنتریور' }, tags: ['MRT'], diff: 2 },
          { id: 'sinus-tarsi-syndrom', title: { de: 'Sinus-tarsi-Syndrom', en: 'Sinus Tarsi Syndrome', fa: 'سندرم سینوس تارسی' }, tags: ['MRT'], diff: 2 },
          { id: 'plantarfasziitis', title: { de: 'Plantarfasziitis', en: 'Plantar Fasciitis', fa: 'فاشئیت پلانتار' }, tags: ['Sono','MRT'], diff: 1 },
        ],
      },
      {
        id: 'msk-postop',
        title: { de: '17. Postoperative & postinterventionelle Bildgebung', en: '17. Postoperative & Post-interventional Imaging', fa: '۱۷. تصویربرداری بعد از عمل و مداخله' },
        icon: '🔧',
        themen: [
          { id: 'osteosynthese', title: { de: 'Osteosynthese & Frakturversorgung', en: 'Osteosynthesis & Fracture Fixation', fa: 'استئوسنتز و فیکساسیون شکستگی' }, tags: ['Rö','CT'], diff: 2 },
          { id: 'postop-komplikationen', title: { de: 'Komplikationen (Pseudarthrose, Infektion, Implantatversagen)', en: 'Complications (Nonunion, Infection, Implant Failure)', fa: 'عوارض (سودارتروز، عفونت، شکست ایمپلنت)' }, tags: ['Rö','CT','MRT'], diff: 3 },
          { id: 'endoprothetik', title: { de: 'Endoprothetik (Hüfte, Knie, Schulter)', en: 'Joint Arthroplasty (Hip, Knee, Shoulder)', fa: 'آرتروپلاستی مفصل (هیپ، زانو، شانه)' }, tags: ['Rö','CT'], diff: 2 },
        ],
      },
    ],
  },
  {
    id: 'wirbelsaeule',
    title: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' },
    icon: '🩻', color: '#60a5fa',
    bg: 'linear-gradient(135deg,#0c1f40,#1e3a6e)',
    bodyZone: 'Wirbelsäule',
    kapitel: [],
  },
  {
    id: 'gefaesse-ir',
    title: { de: 'Gefäße & Interventionelle Radiologie', en: 'Vascular & Interventional Radiology', fa: 'عروق و رادیولوژی مداخله‌ای' },
    icon: '🩸', color: '#ef4444',
    bg: 'linear-gradient(135deg,#2a0808,#4a1414)',
    bodyZone: 'Gefäße',
    kapitel: [],
  },
  {
    id: 'technik',
    title: { de: 'Technik & Physik', en: 'Technique & Physics', fa: 'تکنیک و فیزیک' },
    icon: '⚙️', color: '#4ade80',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    bodyZone: 'Technik',
    kapitel: [],
  },
]

export const getFach = (id) => CURRICULUM.find(f => f.id === id)

export const getKapitel = (fachId, kapitelId) => {
  const fach = getFach(fachId)
  return fach?.kapitel.find(k => k.id === kapitelId)
}

export const getThemenCount = (fachId) => {
  const fach = getFach(fachId)
  return fach?.kapitel.reduce((sum, k) => sum + k.themen.length, 0) || 0
}

// Inline-i18n Helper: liest title.{lang}, fällt auf de zurück
export const t = (obj, lang) => obj?.[lang] || obj?.de || ''
export const getFachTitle = (fach, lang) => t(fach?.title, lang)
export const getKapitelTitle = (kapitel, lang) => t(kapitel?.title, lang)
export const getThemaTitle = (thema, lang) => t(thema?.title, lang)
