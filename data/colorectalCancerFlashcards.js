const L = (de, en, fa) => ({ de, en, fa })

export const COLORECTAL_CANCER_FLASHCARD_TOPIC = {
  id: 'kolorektales-karzinom',
  area: 'Abdomen',
  chapter: 'Kolon & Rektum',
  icon: 'MRT',
  iconImage: '/fach/abdomen.png',
  color: '#0ea5e9',
  href: '/flashcards/kolorektales-karzinom',
  title: L('Kolorektales Karzinom', 'Colorectal cancer', 'سرطان کولورکتال'),
  subtitle: L('CT · Rektum-MRT · MRF · EMVI', 'CT · rectal MRI · MRF · EMVI', 'CT · MRI رکتوم · MRF · EMVI'),
}

const cards = [
  {
    front: L('Welche Bildgebungsfrage beantwortet die Becken-MRT beim Rektumkarzinom?', 'Which imaging question does pelvic MRI answer in rectal cancer?', 'MRI لگن در سرطان رکتوم به کدام پرسش تصویربرداری پاسخ می‌دهد؟'),
    answer: L('Sie beurteilt die lokoregionäre Ausdehnung und ihre Beziehung zu Mesorektum und mesorektaler Faszie.', 'It assesses locoregional extent and its relationship to the mesorectum and mesorectal fascia.', 'گسترش موضعی و ناحیه‌ای و ارتباط آن با مزورکتوم و فاسیای مزورکتال را ارزیابی می‌کند.'),
    explanation: L('Die Suche nach Fernmetastasen ist eine getrennte Staging-Aufgabe und wird nicht durch die lokale Becken-MRT ersetzt.', 'Distant-metastasis assessment is a separate staging task and is not replaced by local pelvic MRI.', 'جست‌وجوی متاستاز دوردست مرحله‌ای جداگانه است و MRI موضعی لگن جای آن را نمی‌گیرد.'),
  },
  {
    front: L('Wofür stehen T1 bis T4 beim Rektumkarzinom anatomisch?', 'What anatomic extent do T1 to T4 represent in rectal cancer?', 'T1 تا T4 در سرطان رکتوم از نظر آناتومیک چه گسترشی را نشان می‌دهند؟'),
    answer: L('Tis: Mukosa; T1: Invasion der Submukosa; T2: Invasion der Muscularis propria; T3: durch die Muscularis propria ins perikolorektale Gewebe; T4a: durch das viszerale Peritoneum; T4b: Invasion/Adhärenz an Nachbarorganen.', 'Tis: mucosa; T1: invasion of submucosa; T2: invasion of muscularis propria; T3: through muscularis propria into pericolorectal tissue; T4a: through visceral peritoneum; T4b: invasion/adherence to adjacent organs.', 'Tis: مخاط؛ T1: نفوذ به زیرمخاط؛ T2: نفوذ به muscularis propria؛ T3: عبور از muscularis propria به بافت پری‌کولورکتال؛ T4a: عبور از صفاق احشایی؛ T4b: نفوذ/چسبندگی به اندام مجاور.'),
    explanation: L('Die T-Kategorie beschreibt die anatomische Tiefenausdehnung. PDF-Untergruppen und numerische Grenzen müssen zur benannten TNM-Version passen.', 'The T category describes anatomic depth. PDF subgroups and numeric cut-offs must match the stated TNM version.', 'دسته T عمق گسترش آناتومیک را بیان می‌کند. زیرگروه‌ها و حدهای عددی PDF باید با نسخه مشخص TNM تطبیق داده شوند.'),
  },
  {
    front: L('Wann gilt die mesorektale Faszie nach ESGAR 2026 als beteiligt?', 'When is the mesorectal fascia considered involved under ESGAR 2026?', 'طبق ESGAR 2026 چه زمانی فاسیای مزورکتال درگیر محسوب می‌شود؟'),
    answer: L('Bei einem Abstand von ≤1 mm zum Primärtumor, zu EMVI oder zu irregulären tumorverdächtigen Knoten.', 'When the distance is ≤1 mm from the primary tumour, EMVI or irregular suspicious nodes.', 'وقتی فاصله تا تومور اولیه، EMVI یا غدد نامنظم مشکوک ≤۱ میلی‌متر باشد.'),
    explanation: L('Ein glatt begrenzter Lymphknoten allein macht die MRF nicht positiv. MRF ist ein anatomischer MRT-Begriff; CRM bezeichnet den chirurgischen Resektionsrand.', 'A smooth-bordered node alone does not make the MRF positive. MRF is an anatomic MRI term; CRM refers to the surgical circumferential resection margin.', 'غده با حاشیه صاف به‌تنهایی MRF را مثبت نمی‌کند. MRF اصطلاحی آناتومیک در MRI است؛ CRM به حاشیه برداشت جراحی اشاره دارد.'),
  },
  {
    front: L('Welche Merkmale sprechen im MRT für EMVI?', 'Which MRI features suggest EMVI?', 'چه ویژگی‌هایی در MRI به نفع EMVI هستند؟'),
    answer: L('Tumorsignal und expansionistische Kontur innerhalb extramuraler Venen.', 'Tumour signal and expansion of extramural veins.', 'سیگنال تومور و اتساع وریدهای خارج‌دیواره‌ای.'),
    explanation: L('EMVI ausdrücklich berichten und die Beziehung zur MRF mitbeurteilen, da beides für die Risikoeinschätzung wichtig ist.', 'Report EMVI explicitly and assess its relationship to the MRF, since both matter for risk assessment.', 'EMVI را صریح گزارش کنید و ارتباط آن با MRF را نیز بسنجید؛ هر دو در برآورد خطر اهمیت دارند.'),
  },
  {
    front: L('Warum genügt die Lymphknotengröße im Rektum-MRT nicht allein?', 'Why is lymph-node size alone insufficient on rectal MRI?', 'چرا اندازه غدد لنفاوی به‌تنهایی در MRI رکتوم کافی نیست؟'),
    answer: L('cN patientenbezogen mit angegebener Sicherheit einordnen und T-Kategorie, EMVI, Anzahl sowie Morphologie berücksichtigen. Bei obturatorischen und internen iliakalen Seitenknoten gilt ≥7 mm Kurzachse als verdächtig; 5–7 mm können bei suspekter Morphologie ebenfalls auffällig sein.', 'Classify cN per patient, state confidence, and consider T category, EMVI, node number and morphology. For obturator and internal iliac lateral nodes, a short axis ≥7 mm is suspicious; 5–7 mm nodes may also be suspicious when morphology is concerning.', 'cN را برای هر بیمار با ذکر میزان اطمینان تعیین کنید و دسته T، وجود EMVI، تعداد و مورفولوژی غدد را در نظر بگیرید. در غدد لترال ابتوراتور و ایلیاک داخلی، محور کوتاه ≥۷ میلی‌متر مشکوک است؛ غدد ۵ تا ۷ میلی‌متری نیز با مورفولوژی مشکوک ممکن است مطرح باشند.'),
    explanation: L('Die Größenangabe gilt für obturatorische und interne iliakale Seitenknoten; für andere Knotenstationen darf sie nicht pauschal übertragen werden. Bildgebung kann mikroskopischen Befall nicht sicher ausschließen.', 'The size criterion applies to obturator and internal iliac lateral nodes; do not generalise it to other nodal stations. Imaging cannot reliably exclude microscopic disease.', 'این معیار اندازه برای غدد لترال ابتوراتور و ایلیاک داخلی است و نباید به همه ایستگاه‌های غدد تعمیم داده شود. تصویربرداری درگیری میکروسکوپی را با اطمینان رد نمی‌کند.'),
  },
]

export const COLORECTAL_CANCER_FLASHCARDS = cards.map((card, index) => ({
  id: `kolorektales-karzinom-${String(index + 1).padStart(2, '0')}`,
  topicId: 'kolorektales-karzinom',
  category: L('Staging', 'Staging', 'مرحله‌بندی'),
  ...card,
  source: 'Abdomen.pdf physical pp. 88–89; ESGAR 2026 primary-staging consensus',
}))
