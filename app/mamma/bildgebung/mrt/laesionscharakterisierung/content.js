const L = (de, en, fa) => ({ de, en, fa })

export const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''

export const COPY = {
  mamma: L('Mamma', 'Breast', 'پستان'),
  imaging: L('Bildgebung', 'Imaging', 'تصویربرداری'),
  breastMri: L('Mamma-MRT', 'Breast MRI', 'MRI پستان'),
  title: L('Läsionscharakterisierung', 'Lesion characterisation', 'ارزیابی و توصیف ضایعه'),
  subtitle: L('Morphologie, Enhancement, T2-Signal, Diffusion und Kinetik systematisch kombinieren.', 'Systematically combine morphology, enhancement, T2 signal, diffusion and kinetics.', 'ترکیب سیستماتیک مورفولوژی، Enhancement، سیگنال T2، دیفیوژن و کینتیک.'),
  contents: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  zoom: L('Bild in voller Größe öffnen', 'Open full-size image', 'نمایش تصویر در اندازه کامل'),
  figureCaption: L('Systematische Läsionscharakterisierung in der Mamma-MRT', 'Systematic lesion characterisation in breast MRI', 'ارزیابی سیستماتیک ضایعات در MRI پستان'),
}

export const SECTIONS = [
  { id: 'start', icon: '01', label: L('Enhancement-Typen & Focus', 'Enhancement types & focus', 'انواع Enhancement و Focus') },
  { id: 'mass', icon: '02', label: L('Mass', 'Mass', 'Mass') },
  { id: 'nme', icon: '03', label: L('Non-Mass Enhancement', 'Non-mass enhancement', 'Non-Mass Enhancement') },
  { id: 'kinetik', icon: '04', label: L('Kinetik', 'Kinetics', 'کینتیک') },
  { id: 't2-diffusion', icon: '05', label: L('T2 & Diffusion', 'T2 & diffusion', 'T2 و دیفیوژن') },
  { id: 'algorithmus', icon: '06', label: L('Gesamtbewertung', 'Overall assessment', 'ارزیابی نهایی') },
]

export const FOCUS_POINTS = [
  L('neu oder bereits bekannt?', 'new or previously known?', 'جدید است یا در بررسی‌های قبلی وجود داشته؟'),
  L('stabil oder größer geworden?', 'stable or increased in size?', 'ثابت مانده یا بزرگ‌تر شده؟'),
  L('einzeln oder mehrere ähnliche Foci?', 'solitary or one of several similar foci?', 'منفرد است یا چند Focus مشابه وجود دارد؟'),
  L('unterscheidet er sich deutlich vom normalen BPE?', 'is it clearly distinct from normal BPE?', 'آیا به‌وضوح از BPE طبیعی قابل تفکیک است؟'),
]

export const MASS_SHAPES = [
  { term: 'Round', text: L('Rund.', 'Round.', 'گرد.') },
  { term: 'Oval', text: L('Oval; hierzu können auch gelappte Konturen gehören.', 'Oval; lobulated contours may also be included.', 'بیضی؛ کانتورهای لوبوله نیز می‌توانند در این گروه قرار گیرند.') },
  { term: 'Irregular', text: L('Keine eindeutig runde oder ovale Form. Verdächtiger, aber allein kein Beweis für Malignität.', 'Neither clearly round nor oval. More suspicious, but not proof of malignancy by itself.', 'نه کاملاً گرد و نه بیضی. مشکوک‌تر است، اما به‌تنهایی بدخیمی را اثبات نمی‌کند.') },
]

export const MASS_MARGINS = [
  { term: 'Circumscribed', text: L('Scharf und glatt begrenzt – eher typisch für benigne Läsionen.', 'Sharply and smoothly defined – more typical of benign lesions.', 'حاشیه واضح و صاف؛ بیشتر به نفع ضایعات خوش‌خیم است.'), level: 'low' },
  { term: 'Irregular', text: L('Unregelmäßige Begrenzung – suspekter.', 'Irregular border – more suspicious.', 'حاشیه نامنظم؛ مشکوک‌تر است.'), level: 'mid' },
  { term: 'Spiculated', text: L('Strahlenförmige Ausläufer in das umgebende Gewebe – hochgradig suspekt.', 'Radiating lines into the surrounding tissue – highly suspicious.', 'امتدادهای شعاعی به بافت اطراف؛ بسیار مشکوک است.'), level: 'high' },
]

export const MASS_ENHANCEMENT = [
  { term: 'Homogeneous', text: L('Die gesamte Läsion nimmt relativ gleichmäßig Kontrastmittel auf.', 'The entire lesion enhances relatively uniformly.', 'تمام ضایعه به‌طور نسبتاً یکنواخت Enhancement نشان می‌دهد.') },
  { term: 'Heterogeneous', text: L('Unterschiedlich starkes Enhancement innerhalb der Läsion.', 'Varying degrees of enhancement within the lesion.', 'شدت Enhancement در بخش‌های مختلف ضایعه متفاوت است.') },
  { term: 'Rim Enhancement', text: L('Vorwiegendes Enhancement am Rand – häufig suspekt, insbesondere bei invasiven Karzinomen.', 'Predominant peripheral enhancement – often suspicious, particularly in invasive carcinomas.', 'Enhancement غالب در حاشیه ضایعه؛ اغلب مشکوک، به‌ویژه در کارسینوم‌های مهاجم.') },
  { term: 'Dark Internal Septations', text: L('Nicht anreichernde dunkle Septen – hilfreiches klassisches Zeichen eines Fibroadenoms bei sonst benigner Morphologie.', 'Non-enhancing dark septa – a helpful classic sign of fibroadenoma when the remaining morphology is benign.', 'سپتاهای تیره بدون Enhancement؛ در صورت وجود سایر ویژگی‌های خوش‌خیم، نشانه کلاسیک و کمک‌کننده فیبروآدنوم است.') },
]

export const NME_DISTRIBUTION = [
  { term: 'Focal', text: L('Auf einen kleinen Bereich begrenzt.', 'Confined to a small area.', 'محدود به یک ناحیه کوچک.') },
  { term: 'Linear', text: L('Linienförmig, häufig entlang eines einzelnen Ganges orientiert.', 'Linear, often oriented along a single duct.', 'خطی و اغلب در امتداد یک مجرای منفرد.') },
  { term: 'Segmental', text: L('Keil- oder dreieckförmig in Richtung Mamille; kann einem Gangsystem entsprechen – verdächtiger.', 'Wedge- or triangular-shaped toward the nipple; may follow a ductal system – more suspicious.', 'گوه‌ای یا مثلثی رو به نوک پستان؛ ممکن است با یک سیستم مجرایی منطبق باشد و مشکوک‌تر است.') },
  { term: 'Regional', text: L('Größeres zusammenhängendes Areal ohne eindeutige Zuordnung zu einem einzelnen Gangsystem.', 'A larger contiguous area not clearly corresponding to a single ductal system.', 'ناحیه پیوسته بزرگ‌تر که به‌طور مشخص با یک سیستم مجرایی منفرد تطابق ندارد.') },
  { term: 'Multiple Regions', text: L('Mehrere getrennte größere Areale.', 'Several separate larger areas.', 'چند ناحیه بزرگ و جدا از یکدیگر.') },
  { term: 'Diffuse', text: L('Weit verteiltes Enhancement.', 'Widely distributed enhancement.', 'Enhancement با توزیع گسترده.') },
]

export const NME_PATTERNS = [
  { term: 'Homogeneous', text: L('Gleichmäßiges Enhancement.', 'Uniform enhancement.', 'Enhancement یکنواخت.') },
  { term: 'Heterogeneous', text: L('Uneinheitliches Enhancement.', 'Non-uniform enhancement.', 'Enhancement غیریکنواخت.') },
  { term: 'Clumped', text: L('Gruppierte, unregelmäßige kleine Enhancement-Areale – suspekt.', 'Grouped, irregular small areas of enhancement – suspicious.', 'کانون‌های کوچک، گروهی و نامنظم Enhancement؛ مشکوک است.') },
  { term: 'Clustered Ring', text: L('Viele kleine ringförmige Enhancements um Gangstrukturen – besonders suspekt.', 'Numerous small ring-like enhancements around ductal structures – particularly suspicious.', 'Enhancementهای حلقوی کوچک متعدد در اطراف ساختارهای مجرایی؛ به‌طور ویژه مشکوک است.') },
]

export const KINETIC_PHASES = [
  { title: L('Initiale Phase', 'Initial phase', 'فاز اولیه'), text: L('Wie schnell steigt das Enhancement nach Kontrastmittelgabe an?', 'How quickly does enhancement rise after contrast administration?', 'Enhancement پس از تزریق ماده حاجب با چه سرعتی افزایش می‌یابد؟'), items: ['slow', 'medium', 'rapid'] },
  { title: L('Späte Phase', 'Delayed phase', 'فاز تأخیری'), text: L('Wie verhält sich das Signal nach dem initialen Anstieg?', 'How does the signal behave after the initial rise?', 'سیگنال پس از افزایش اولیه چه تغییری می‌کند؟'), items: ['persistent', 'plateau', 'washout'] },
]

export const CURVES = [
  { type: 'I', name: 'Persistent', symbol: '↗', text: L('Das Enhancement nimmt weiter zu – eher benign.', 'Enhancement continues to increase – more often benign.', 'Enhancement همچنان افزایش می‌یابد؛ بیشتر به نفع خوش‌خیمی است.'), tone: 'green' },
  { type: 'II', name: 'Plateau', symbol: '↗ →', text: L('Nach dem Anstieg bleibt das Signal ungefähr konstant – intermediär/suspekt.', 'After the rise, the signal remains approximately constant – intermediate/suspicious.', 'پس از افزایش اولیه، سیگنال تقریباً ثابت می‌ماند؛ بینابینی/مشکوک.'), tone: 'amber' },
  { type: 'III', name: 'Washout', symbol: '↗ ↘', text: L('Nach starker Aufnahme nimmt das Signal wieder ab – stärker malignitätsverdächtig.', 'After strong uptake, the signal decreases – more suspicious for malignancy.', 'پس از Enhancement شدید، سیگنال کاهش می‌یابد؛ بیشتر به نفع بدخیمی است.'), tone: 'red' },
]

export const SUMMARY_STEPS = [
  L('Focus, Mass oder NME?', 'Focus, mass or NME?', 'Focus، Mass یا NME؟'),
  L('Mass: Form → Rand → internes Enhancement', 'Mass: shape → margin → internal enhancement', 'Mass: شکل ← حاشیه ← الگوی Enhancement داخلی'),
  L('NME: Distribution → internes Enhancement-Muster', 'NME: distribution → internal enhancement pattern', 'NME: توزیع ← الگوی Enhancement داخلی'),
  L('Danach: T2 → DWI/ADC → Kinetik → Voraufnahmen', 'Then: T2 → DWI/ADC → kinetics → prior studies', 'سپس: T2 ← DWI/ADC ← کینتیک ← بررسی‌های قبلی'),
]
