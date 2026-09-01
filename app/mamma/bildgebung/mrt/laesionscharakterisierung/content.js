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
  { term: L('Rund', 'Round', 'گرد'), text: L('Runde Form.', 'Round shape.', 'شکل گرد.') },
  { term: L('Oval', 'Oval', 'بیضی'), text: L('Ovale Form; auch leicht gelappte Konturen können noch als oval gelten.', 'Oval shape; mildly lobulated contours may still be classified as oval.', 'شکل بیضی؛ کانتورهای کمی لوبوله نیز می‌توانند همچنان در گروه بیضی قرار گیرند.') },
  { term: L('Irregulär', 'Irregular', 'نامنظم'), text: L('Weder rund noch oval. Eine irreguläre Form ist suspekter, beweist für sich allein aber keine Malignität.', 'Neither round nor oval. An irregular shape is more suspicious but does not prove malignancy by itself.', 'نه گرد و نه بیضی. شکل نامنظم مشکوک‌تر است، اما به‌تنهایی بدخیمی را اثبات نمی‌کند.') },
]

export const MASS_MARGINS = [
  { term: L('Scharf begrenzt', 'Circumscribed', 'واضح و صاف'), text: L('Der Übergang zum umgebenden Gewebe ist klar und glatt. Dieses Merkmal spricht eher für eine benigne Läsion.', 'The transition to surrounding tissue is sharp and smooth. This feature is more typical of a benign lesion.', 'مرز ضایعه با بافت اطراف واضح و صاف است؛ این ویژگی بیشتر به نفع یک ضایعه خوش‌خیم است.'), level: 'low' },
  { term: L('Irregulär', 'Irregular', 'نامنظم'), text: L('Der Rand ist unregelmäßig und nicht glatt. Dies ist ein suspektes Merkmal.', 'The margin is irregular and not smooth. This is a suspicious feature.', 'حاشیه نامنظم و ناصاف است؛ این یک ویژگی مشکوک محسوب می‌شود.'), level: 'mid' },
  { term: L('Spikuliert', 'Spiculated', 'اسپیکوله'), text: L('Vom Rand ziehen strahlenförmige Ausläufer in das umgebende Gewebe. Dieses Merkmal ist hochgradig malignitätsverdächtig.', 'Radiating lines extend from the margin into surrounding tissue. This feature is highly suspicious for malignancy.', 'امتدادهای شعاعی از حاشیه به بافت اطراف کشیده می‌شوند؛ این ویژگی به‌شدت به بدخیمی مشکوک است.'), level: 'high' },
]

export const MASS_ENHANCEMENT = [
  { term: L('Homogen', 'Homogeneous', 'همگن'), text: L('Die gesamte Mass reichert gleichmäßig Kontrastmittel an.', 'The entire mass enhances uniformly.', 'تمام Mass به‌صورت یکنواخت Enhancement نشان می‌دهد.') },
  { term: L('Heterogen', 'Heterogeneous', 'ناهمگن'), text: L('Die Kontrastmittelanreicherung ist innerhalb der Mass ungleichmäßig verteilt.', 'Enhancement is unevenly distributed within the mass.', 'Enhancement در بخش‌های مختلف Mass به‌صورت ناهمگون توزیع شده است.') },
  { term: L('Randständige Anreicherung', 'Rim Enhancement', 'Enhancement حاشیه‌ای'), text: L('Vorwiegende Anreicherung am Läsionsrand. Dieses Muster ist häufig suspekt, besonders bei invasiven Karzinomen.', 'Predominant enhancement at the lesion rim. This pattern is often suspicious, particularly in invasive carcinomas.', 'Enhancement عمدتاً در حاشیه ضایعه دیده می‌شود؛ این الگو اغلب مشکوک است، به‌ویژه در کارسینوم‌های مهاجم.') },
  { term: L('Dunkle interne Septierungen', 'Dark Internal Septations', 'سپتاهای داخلی تیره'), text: L('Nicht anreichernde dunkle Septen innerhalb einer anreichernden Mass. Bei ansonsten benigner Morphologie ein klassischer Hinweis auf ein Fibroadenom.', 'Non-enhancing dark septa within an enhancing mass. With otherwise benign morphology, this is a classic clue to fibroadenoma.', 'سپتاهای تیره و بدون Enhancement درون یک Mass دارای Enhancement؛ در صورت مورفولوژی خوش‌خیم، یافته‌ای کلاسیک به نفع فیبروآدنوم است.') },
]

export const NME_DISTRIBUTION = [
  { term: L('Fokal', 'Focal', 'کانونی'), text: L('Die Anreicherung ist auf ein kleines, umschriebenes Areal begrenzt.', 'The enhancement is confined to a small, defined area.', 'Enhancement به یک ناحیه کوچک و مشخص محدود است.') },
  { term: L('Linear', 'Linear', 'خطی'), text: L('Linienförmige Anreicherung, häufig entlang eines einzelnen Milchganges.', 'Linear enhancement, often following a single duct.', 'Enhancement خطی که اغلب در امتداد یک مجرای منفرد قرار دارد.') },
  { term: L('Segmental', 'Segmental', 'سگمنتال'), text: L('Keil- oder dreieckförmige Anreicherung in Richtung Mamille; sie entspricht häufig einem Gangsystem und ist suspekter.', 'Wedge- or triangular-shaped enhancement toward the nipple; it often follows a ductal system and is more suspicious.', 'Enhancement گوه‌ای یا مثلثی رو به نوک پستان که اغلب با یک سیستم مجرایی مطابقت دارد و مشکوک‌تر است.') },
  { term: L('Regional', 'Regional', 'ناحیه‌ای'), text: L('Größeres zusammenhängendes Areal, das keinem einzelnen Gangsystem eindeutig zugeordnet werden kann.', 'A larger contiguous area that does not clearly correspond to a single ductal system.', 'یک ناحیه پیوسته بزرگ‌تر که به‌طور مشخص به یک سیستم مجرایی منفرد محدود نیست.') },
  { term: L('Mehrere Regionen', 'Multiple Regions', 'چند ناحیه'), text: L('Mindestens zwei voneinander getrennte größere Anreicherungsareale.', 'At least two separate larger areas of enhancement.', 'دست‌کم دو ناحیه بزرگ و جدا از Enhancement.') },
  { term: L('Diffus', 'Diffuse', 'منتشر'), text: L('Weitläufige Anreicherung über große Teile der Brust.', 'Widespread enhancement involving large parts of the breast.', 'Enhancement گسترده که بخش بزرگی از پستان را درگیر می‌کند.') },
]

export const NME_PATTERNS = [
  { term: L('Homogen', 'Homogeneous', 'همگن'), text: L('Gleichmäßige, zusammenfließende Anreicherung innerhalb des NME.', 'Uniform, confluent enhancement within the NME.', 'Enhancement یکنواخت و به‌هم‌پیوسته در محدوده NME.') },
  { term: L('Heterogen', 'Heterogeneous', 'ناهمگن'), text: L('Ungleichmäßige, unterschiedlich starke Anreicherung innerhalb des NME.', 'Non-uniform enhancement of varying intensity within the NME.', 'Enhancement ناهمگون با شدت‌های متفاوت در محدوده NME.') },
  { term: L('Klumpig', 'Clumped', 'توده‌ای و خوشه‌ای'), text: L('Kleine, dicht gruppierte Anreicherungsareale unterschiedlicher Form und Größe; ein suspektes Muster.', 'Small, tightly grouped areas of enhancement of varying shape and size; a suspicious pattern.', 'نواحی کوچک Enhancement با شکل و اندازه متفاوت که به‌صورت فشرده کنار هم قرار گرفته‌اند؛ الگویی مشکوک.') },
  { term: L('Gruppiert ringförmig', 'Clustered Ring', 'حلقه‌های خوشه‌ای'), text: L('Mehrere dünne, ringförmige Anreicherungen um Gangstrukturen; ein besonders suspektes Muster.', 'Multiple thin ring-like enhancements around ductal structures; a particularly suspicious pattern.', 'چندین Enhancement حلقوی ظریف پیرامون ساختارهای مجرایی؛ الگویی به‌طور ویژه مشکوک.') },
]

export const KINETIC_PHASES = [
  { title: L('Initiale Phase', 'Initial phase', 'فاز اولیه'), text: L('Wie schnell steigt das Enhancement nach Kontrastmittelgabe an?', 'How quickly does enhancement rise after contrast administration?', 'Enhancement پس از تزریق ماده حاجب با چه سرعتی افزایش می‌یابد؟'), items: ['slow', 'medium', 'rapid'] },
  { title: L('Späte Phase', 'Delayed phase', 'فاز تأخیری'), text: L('Wie verhält sich das Signal nach dem initialen Anstieg?', 'How does the signal behave after the initial rise?', 'سیگنال پس از افزایش اولیه چه تغییری می‌کند؟'), items: ['persistent', 'plateau', 'washout'] },
]

export const CURVES = [
  { type: 'I', name: 'Persistent', symbol: '↗', tag: L('eher benign', 'more likely benign', 'بیشتر خوش‌خیم'), text: L('Das Enhancement nimmt weiter zu – eher benign.', 'Enhancement continues to increase – more often benign.', 'Enhancement همچنان افزایش می‌یابد؛ بیشتر به نفع خوش‌خیمی است.'), tone: 'green' },
  { type: 'II', name: 'Plateau', symbol: '↗ →', text: L('Nach dem Anstieg bleibt das Signal ungefähr konstant – intermediär/suspekt.', 'After the rise, the signal remains approximately constant – intermediate/suspicious.', 'پس از افزایش اولیه، سیگنال تقریباً ثابت می‌ماند؛ بینابینی/مشکوک.'), tone: 'amber' },
  { type: 'III', name: 'Washout', symbol: '↗ ↘', tag: L('malignomsuspekt', 'suspicious for malignancy', 'مشکوک به بدخیمی'), text: L('Nach starker Aufnahme nimmt das Signal wieder ab – stärker malignitätsverdächtig.', 'After strong uptake, the signal decreases – more suspicious for malignancy.', 'پس از Enhancement شدید، سیگنال کاهش می‌یابد؛ بیشتر به نفع بدخیمی است.'), tone: 'red' },
]

export const SUMMARY_STEPS = [
  L('Focus, Mass oder NME?', 'Focus, mass or NME?', 'Focus، Mass یا NME؟'),
  L('Mass: Form → Rand → internes Anreicherungsmuster', 'Mass: shape → margin → internal enhancement', 'Mass: شکل ← حاشیه ← الگوی Enhancement داخلی'),
  L('NME: Verteilung → internes Anreicherungsmuster', 'NME: distribution → internal enhancement pattern', 'NME: توزیع ← الگوی Enhancement داخلی'),
  L('Danach: T2 → DWI/ADC → Kinetik → Voraufnahmen', 'Then: T2 → DWI/ADC → kinetics → prior studies', 'سپس: T2 ← DWI/ADC ← کینتیک ← بررسی‌های قبلی'),
]
