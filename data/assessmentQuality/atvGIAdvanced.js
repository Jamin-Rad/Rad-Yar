import { ileusRows, ileusCoverage } from './atvIleus'
import { rectalRows, rectalCoverage } from './atvRectalStaging'
const L=(de,en,fa)=>({de,en,fa})
const source='https://doi.org/10.1016/j.ejvs.2025.06.010'
const route='/abdomen/gi/mesenteriale-ischaemie'
export const advancedGastroRows=[
{key:'mesenteric-nomi',fach:'abdomen',topicId:'mesenteriale-ischaemie',route,goal:'mechanism',source,createCard:true,category:L('Gefäße und Darm','Vessels and bowel','عروق و روده'),
question:L('Ein Patient im Schock unter Vasopressoren hat in der CTA vermindertes Dünndarm-Enhancement. SMA und Mesenterialvenen sind durchgängig. Welche Arbeitsdiagnose muss insbesondere erwogen werden?','A patient in shock receiving vasopressors has reduced small-bowel enhancement on CTA. The SMA and mesenteric veins are patent. Which working diagnosis must particularly be considered?','بیمار در شوک و تحت وازوپرسور در CTA کاهش تقویت رودهٔ باریک دارد. SMA و وریدهای مزانتریک باز هستند. کدام تشخیص کاری باید به‌ویژه مطرح شود؟'),
options:[L('Embolischer proximaler SMA-Verschluss','Embolic proximal SMA occlusion','انسداد آمبولیک پروگزیمال SMA'),L('Nichtokklusive mesenteriale Ischämie (NOMI)','Non-occlusive mesenteric ischaemia (NOMI)','ایسکمی مزانتریک غیرانسدادی (NOMI)'),L('Okklusive mesenteriale Venenthrombose','Occlusive mesenteric venous thrombosis','ترومبوز انسدادی ورید مزانتریک'),L('Reine reaktive Hyperämie mit gesteigertem Darmwand-Enhancement','Pure reactive hyperaemia with increased bowel-wall enhancement','پرخونی واکنشیِ صرف با افزایش تقویت دیوارهٔ روده')],correct:'B',
explanation:L('Eine offene SMA schließt Ischämie nicht aus. Bei Schock und passender Darmwandminderperfusion beschreibt ESVS NOMI als wichtige Verdachtsdiagnose; Vasokonstriktion und systemische Minderperfusion können ohne zentralen Gefäßverschluss auftreten. Den Verdacht dringend im klinischen Kontext kommunizieren.','A patent SMA does not exclude ischaemia. With shock and compatible bowel hypoperfusion, ESVS identifies NOMI as an important suspicion; vasoconstriction and systemic hypoperfusion may occur without central vascular occlusion. Communicate concern urgently in clinical context.','بازبودن SMA ایسکمی را رد نمی‌کند. در شوک و کاهش پرفیوژن سازگار روده، ESVS ‏NOMI را تشخیص مشکوک مهم می‌داند؛ تنگی عروقی و کم‌پرفیوژنی سیستمیک می‌توانند بدون انسداد عروق مرکزی رخ دهند. نگرانی را در زمینهٔ بالینی فوراً منتقل کنید.'),
wrong:[L('Ein proximaler Verschluss ist mit der beschriebenen durchgängigen SMA nicht nachgewiesen.','A proximal occlusion is not demonstrated when the SMA is described as patent.','با SMA توصیف‌شده به‌عنوان باز، انسداد پروگزیمال نشان داده نشده است.'),null,L('Die beschriebenen durchgängigen Venen zeigen keine okklusive Venenthrombose.','The described patent veins do not demonstrate occlusive venous thrombosis.','وریدهای توصیف‌شده به‌عنوان باز، ترومبوز انسدادی وریدی را نشان نمی‌دهند.'),L('Gesteigertes Enhancement ist nicht der beschriebene Befund; hier liegt eine Minderaufnahme bei Schock vor.','Increased enhancement is not the stated finding; reduced enhancement in shock is described.','افزایش تقویت، یافتهٔ ذکرشده نیست؛ کاهش تقویت در شوک توصیف شده است.')],
front:L('Warum schließt eine offene SMA eine mesenteriale Ischämie nicht aus?','Why does a patent SMA not exclude mesenteric ischaemia?','چرا SMA باز، ایسکمی مزانتریک را رد نمی‌کند؟'),answer:L('NOMI kann bei systemischer Minderperfusion/Vasokonstriktion trotz offener zentraler Gefäße auftreten; Darmbefund und Schockkontext mitbeurteilen.','NOMI can occur with systemic hypoperfusion/vasoconstriction despite patent central vessels; assess bowel findings and shock context.','NOMI می‌تواند با کم‌پرفیوژنی سیستمیک یا تنگ‌شدن عروق، با وجود بازبودن عروق مرکزی رخ دهد؛ یافته‌های روده و زمینهٔ شوک را نیز بررسی کنید.')},
{
  "key": "mesenteric-viability",
  "fach": "abdomen",
  "topicId": "mesenteriale-ischaemie",
  "route": "/abdomen/gi/mesenteriale-ischaemie",
  "goal": "severity",
  "source": "https://doi.org/10.1016/j.ejvs.2025.06.010",
  "createCard": true,
  "category": {
    "de": "Befundsicherheit",
    "en": "Diagnostic certainty",
    "fa": "قطعیت گزارش"
  },
  "question": {
    "de": "CTA zeigt einen SMA-Verschluss, deutlich verminderte Darmwandaufnahme, Pneumatosis und portomesenteriales Gas. Welche Aussage zur Befundsicherheit ist angemessen?",
    "en": "CTA shows SMA occlusion, markedly reduced bowel-wall enhancement, pneumatosis and portomesenteric gas. Which statement about diagnostic certainty is appropriate?",
    "fa": "CTA انسداد SMA، کاهش واضح تقویت دیوارهٔ روده، پنوماتوز و گاز پورتومزانتریک نشان می‌دهد. کدام گزاره دربارهٔ قطعیت گزارش مناسب است؟"
  },
  "options": [
    {
      "de": "Passagestörung mit erhaltener Perfusion als führende Erklärung; konservative Verlaufskontrolle.",
      "en": "Transit obstruction with preserved perfusion as the leading explanation; conservative follow-up.",
      "fa": "اختلال عبور با پرفیوژن حفظ‌شده به‌عنوان علت اصلی؛ پیگیری محافظه‌کارانه."
    },
    {
      "de": "Transmurale Nekrose der gesamten betroffenen Strecke als führende Beurteilung; Resektionsausmaß aus der CT ableiten.",
      "en": "Transmural necrosis throughout the affected segment as the leading assessment; derive resection extent from CT.",
      "fa": "نکروز تمام‌جداری در سراسر قطعهٔ درگیر به‌عنوان ارزیابی اصلی؛ تعیین وسعت رزکسیون بر اساس CT."
    },
    {
      "de": "Akute mesenteriale Ischämie mit dringlichem Handlungsbedarf; Darmviabilität unverzüglich klinisch-chirurgisch beurteilen.",
      "en": "Acute mesenteric ischaemia requiring urgent action; promptly assess bowel viability clinically and surgically.",
      "fa": "ایسکمی حاد مزانتریک با نیاز به اقدام فوری؛ ارزیابی بی‌درنگ زنده‌مانی روده از نظر بالینی و جراحی."
    },
    {
      "de": "Gedeckte Darmperforation als führende Erklärung; primär nach einem lokalen Leck suchen.",
      "en": "Contained bowel perforation as the leading explanation; primarily search for a local leak.",
      "fa": "پرفوراسیون پوشیدهٔ روده به‌عنوان علت اصلی؛ جست‌وجوی اولیهٔ نشت موضعی."
    }
  ],
  "correct": "C",
  "explanation": {
    "de": "Der kombinierte Gefäß- und Darmbefund ist hochgradig bedenklich und muss dringlich kommuniziert werden. ESVS betont zugleich, dass auch Pneumatosis, venöses Gas und verminderte Aufnahme allein keine irreversible Darmschädigung beweisen. Viabilität und weiteres Vorgehen brauchen unverzügliche klinisch-chirurgisch-vaskuläre Beurteilung.",
    "en": "The combined vascular and bowel pattern is highly concerning and requires urgent communication. ESVS also stresses that pneumatosis, venous gas and reduced enhancement alone do not prove irreversible bowel injury. Viability and management require immediate clinical, surgical and vascular assessment.",
    "fa": "مجموعهٔ یافته‌های عروقی و روده‌ای بسیار نگران‌کننده است و باید فوری منتقل شود. ESVS همچنین تأکید می‌کند که پنوماتوز، گاز وریدی و کاهش تقویت به‌تنهایی آسیب برگشت‌ناپذیر روده را ثابت نمی‌کنند. زنده‌مانی و اقدام بعدی به ارزیابی بی‌درنگ بالینی، جراحی و عروقی نیاز دارد."
  },
  "wrong": [
    {
      "de": "SMA-Verschluss und verminderte Wandaufnahme sprechen gegen erhaltene Perfusion. Eine reine konservative Verlaufskontrolle würde die dringliche Ischämiebeurteilung verzögern.",
      "en": "SMA occlusion and reduced wall enhancement argue against preserved perfusion. Conservative follow-up alone would delay urgent ischaemia assessment.",
      "fa": "انسداد SMA و کاهش جذب دیواره بر خلاف پرفیوژن حفظ‌شده‌اند. پیگیری محافظه‌کارانهٔ صرف، ارزیابی فوری ایسکمی را به تأخیر می‌اندازد."
    },
    {
      "de": "Das Muster ist hochgradig bedenklich, definiert aber weder Irreversibilität noch das Resektionsausmaß zuverlässig allein. Dringliche interdisziplinäre Viabilitätsbeurteilung ist nötig.",
      "en": "The pattern is highly concerning but does not reliably define irreversibility or resection extent by itself. Urgent interdisciplinary viability assessment is needed.",
      "fa": "الگو بسیار نگران‌کننده است، اما به‌تنهایی برگشت‌ناپذیری یا وسعت رزکسیون را با اطمینان تعیین نمی‌کند. ارزیابی فوری و بین‌رشته‌ای زنده‌مانی لازم است."
    },
    null,
    {
      "de": "Portomesenteriales Gas ist venöses Gas und nicht der Nachweis eines lokalen Darmlecks. Der SMA-Verschluss mit Minderaufnahme priorisiert die Ischämie; zusätzliche Perforationszeichen wären gesondert zu beurteilen.",
      "en": "Portomesenteric gas is venous gas, not demonstration of a local bowel leak. SMA occlusion with reduced enhancement prioritises ischaemia; additional perforation signs require separate assessment.",
      "fa": "گاز پورتومزانتریک گاز وریدی است، نه اثبات نشت موضعی روده. انسداد SMA همراه کاهش جذب، ایسکمی را در اولویت می‌گذارد؛ نشانه‌های اضافی پرفوراسیون باید جداگانه ارزیابی شوند."
    }
  ],
  "front": {
    "de": "Beweisen Pneumatosis und portomesenteriales Gas eine irreversible Darmnekrose?",
    "en": "Do pneumatosis and portomesenteric gas prove irreversible bowel necrosis?",
    "fa": "آیا پنوماتوز و گاز پورتومزانتریک، نکروز برگشت‌ناپذیر روده را ثابت می‌کنند؟"
  },
  "answer": {
    "de": "Nein. Im passenden Muster sind sie dringliche Warnzeichen; Irreversibilität lässt sich daraus allein nicht beweisen. Gefäße, Enhancement und Klinik gemeinsam beurteilen.",
    "en": "No. In a compatible pattern they are urgent warning signs; they do not alone prove irreversibility. Assess vessels, enhancement and clinical findings together.",
    "fa": "خیر. در الگوی سازگار، نشانه‌های هشدار فوری‌اند؛ برگشت‌ناپذیری را به‌تنهایی ثابت نمی‌کنند. عروق، تقویت و بالین را با هم ارزیابی کنید."
  }
}
]
export const advancedGastroCoverage=[{route,topicId:'mesenteriale-ischaemie',status:'AUTHOR_REPAIR_PENDING_SHARED_ORIGINAL',learningGoals:[
{id:'cta',text:L('Bei AMI-Verdacht die zeitkritische mehrphasige Dünnschicht-CTA einordnen.','Identify time-critical thin-slice multiphase CTA for suspected AMI.','CTA چندفازی با برش نازک و زمان‌حساس را در شک به AMI بشناسید.'),questionIds:['abdomen-mesenteric-ischaemia-cta-protocol-de-01'],cardIds:['mesenteriale-ischaemie-cta-protocol']},
{id:'mechanism',text:L('NOMI trotz durchgängiger zentraler Gefäße im Schockkontext erwägen.','Consider NOMI despite patent central vessels in shock.','در زمینهٔ شوک، با وجود بازبودن عروق مرکزی NOMI را مطرح کنید.'),questionIds:['aq-atv-mesenteric-nomi-de-application'],cardIds:['aq-atv-mesenteric-nomi-retrieval']},
{id:'severity',text:L('Schwere Ischämiezeichen dringlich melden und die Grenze der Viabilitätsaussage benennen.','Urgently report severe ischaemic signs and state limits of viability assessment.','نشانه‌های شدید ایسکمی را فوری گزارش و محدودیت ارزیابی زنده‌مانی را بیان کنید.'),questionIds:['aq-atv-mesenteric-viability-de-application'],cardIds:['aq-atv-mesenteric-viability-retrieval']}
]}]

const pylorusRoute='/abdomen/gi/pylorusstenose'
advancedGastroRows.push({key:'pylorus-indeterminate',fach:'abdomen',topicId:'pylorusstenose',route:pylorusRoute,goal:'indeterminate',source:'https://pubmed.ncbi.nlm.nih.gov/17958692/',createCard:true,category:L('Pädiatrischer Ultraschall','Paediatric ultrasound','سونوگرافی کودکان'),
question:L("Ein kreislaufstabiler sechs Wochen alter Säugling erbricht weiterhin nichtgallig. Bei HPS-Verdacht war die erste Pylorussonografie technisch unzureichend und ergab grenzwertige Maße ohne verlässliche Dynamik. Welche gezielte Bildgebung ist unter diesen Optionen als nächstes sinnvoll?","A haemodynamically stable six-week-old infant continues nonbilious vomiting. With suspected HPS, initial pyloric ultrasound was technically inadequate with borderline measurements and unreliable dynamic assessment. Which targeted imaging step is most appropriate among these options?","شیرخوار شش‌هفته‌ای با وضعیت همودینامیک پایدار همچنان استفراغ غیرصفراوی دارد. در شک به HPS، سونوگرافی اولیهٔ پیلور از نظر فنی ناکافی و اندازه‌ها مرزی بوده و ارزیابی پویا قابل‌اعتماد نبوده است. از میان این گزینه‌ها، کدام تصویربرداری هدفمند بعدی مناسب‌تر است؟"),
options:[L("Konventionelle Röntgenaufnahme des Abdomens.","Plain abdominal radiography.","رادیوگرافی سادهٔ شکم."),L("Kontrastmitteleinlauf zur Beurteilung des Kolons.","Contrast enema to assess the colon.","تنقیهٔ مادهٔ حاجب برای ارزیابی کولون."),L("Gezielte Wiederholungssonografie des Pylorus mit optimierter Technik und dynamischer Beobachtung.","Targeted repeat pyloric ultrasound with optimised technique and dynamic observation.","تکرار هدفمند سونوگرافی پیلور با تکنیک بهینه و مشاهدهٔ پویا."),L("Nuklearmedizinische Untersuchung auf gastroösophagealen Reflux.","Nuclear medicine study for gastro-oesophageal reflux.","بررسی پزشکی هسته‌ای برای ریفلاکس معده‌به‌مری.")],correct:'C',
explanation:L('Technische Einschränkung und grenzwertige Maße ergeben keine sichere positive oder negative Diagnose. Bei fortbestehendem klinischem Verdacht unterstützt die Originalstudie eine erneute Sonografie oder alternative Abklärung; die konkrete Wahl richtet sich nach der klinischen Situation.','Technical limitations and borderline measurements do not establish a reliable positive or negative diagnosis. With persistent clinical suspicion, the original study supports repeat ultrasound or alternative assessment; the specific choice depends on the clinical situation.','محدودیت فنی و اندازه‌های مرزی، تشخیص مثبت یا منفی قابل‌اعتماد نمی‌دهند. در شک بالینی ماندگار، مطالعهٔ اصلی از تکرار سونوگرافی یا بررسی جایگزین حمایت می‌کند؛ انتخاب مشخص به وضعیت بالینی بستگی دارد.'),
wrong:[L("Ein Röntgenbild kann eine Magendilatation zeigen, klärt aber die grenzwertigen Muskelmaße und dynamische Pylorusöffnung nicht gezielt.","Radiographs may show gastric dilatation but do not directly resolve borderline muscle measurements or dynamic pyloric opening.","رادیوگرافی ممکن است اتساع معده را نشان دهد، اما اندازه‌های مرزی عضله و بازشدن پویای پیلور را هدفمند روشن نمی‌کند."),L("Ein Kolonkontrasteinlauf untersucht nicht die hier unzureichend beurteilte Pylorusmuskulatur und -öffnung.","A contrast enema does not assess the inadequately examined pyloric muscle and opening.","تنقیهٔ مادهٔ حاجب، عضله و بازشدن پیلور را که ناقص بررسی شده‌اند ارزیابی نمی‌کند."),null,L("Eine Refluxszintigrafie ersetzt keine verlässliche morphologische und dynamische Pylorusbeurteilung bei weiterbestehendem HPS-Verdacht.","Reflux scintigraphy does not replace reliable morphological and dynamic pyloric assessment when HPS remains suspected.","سینتی‌گرافی ریفلاکس در شک ماندگار به HPS جای ارزیابی مورفولوژیک و پویای قابل‌اعتماد پیلور را نمی‌گیرد.")],
front:L('Wie bei grenzwertiger, technisch unzureichender Pylorussonografie und fortbestehenden Beschwerden vorgehen?','How should borderline technically inadequate pyloric ultrasound with persistent symptoms be handled?','در سونوگرافی مرزی و از نظر فنی ناکافی پیلور با علائم ادامه‌دار چه می‌کنیم؟'),answer:L('Als unklar kommunizieren; Klinik abstimmen und gezielte Wiederholung oder alternative Abklärung erwägen, statt aus einem Einzelwert sicher ein- oder auszuschließen.','Communicate uncertainty, correlate clinically and consider targeted repeat or alternative assessment rather than confirming or excluding from one measurement.','عدم قطعیت را اعلام، با بالین تطبیق و تکرار هدفمند یا بررسی جایگزین را مطرح کنید؛ از یک عدد منفرد تأیید یا رد قطعی نکنید.')})
advancedGastroCoverage.push({route:pylorusRoute,topicId:'pylorusstenose',status:'AUTHOR_PACKET03_IN_PROGRESS',learningGoals:[
{id:'measure',text:L('Pylorusmuskeldicke anatomisch korrekt messen.','Measure pyloric muscle thickness anatomically correctly.','ضخامت عضلهٔ پیلور را از نظر آناتومیک درست اندازه بگیرید.'),questionIds:['pylorusstenose-measurement-de'],cardIds:['pylorusstenose-measurement']},
{id:'dynamics',text:L('Dynamische Öffnung und Morphometrie bei Spasmus versus HPS gemeinsam gewichten.','Integrate dynamic opening and morphometry for spasm versus HPS.','بازشدن پویا و مورفومتری را در افتراق اسپاسم از HPS با هم بسنجید.'),questionIds:['pylorusstenose-dynamic-de'],cardIds:['pylorusstenose-dynamic']},
{id:'indeterminate',text:L('Bei unklarer Untersuchung und anhaltendem Verdacht eine angemessene weitere Abklärung formulieren.','State appropriate further assessment after an indeterminate study with persistent suspicion.','پس از بررسی نامعین و شک ماندگار، بررسی تکمیلی مناسب را بیان کنید.'),questionIds:['aq-atv-pylorus-indeterminate-de-application'],cardIds:['aq-atv-pylorus-indeterminate-retrieval']}
]},{route:'/abdomen/gi/kolitis-patterns',topicId:'pmc-kolitis',status:'AUTHOR_PACKET03_IN_PROGRESS',learningGoals:[
{id:'distribution',text:L('Segmentale Kolitis im klinischen Kontext einordnen, ohne eine Ätiologie aus der Verteilung zu beweisen.','Interpret segmental colitis clinically without proving aetiology from distribution.','کولیت سگمنتال را با بالین تفسیر کنید، بدون اثبات علت از توزیع.'),questionIds:['pmc-kolitis-distribution-de'],cardIds:['pmc-kolitis-distribution']},
{id:'accordion',text:L('Accordion-Faltenmuster erklären und seine ätiologische Grenze nennen.','Explain the accordion fold pattern and its aetiological limits.','الگوی چین‌های آکاردئونی و محدودیت آن در تعیین علت را توضیح دهید.'),questionIds:['pmc-kolitis-accordion-de'],cardIds:['pmc-kolitis-accordion']},
{id:'uc-pattern',text:L('Das typische unbehandelte CU-Muster von konkurrierenden Verteilungen unterscheiden.','Distinguish typical untreated UC from competing distributions.','الگوی معمول CU درمان‌نشده را از توزیع‌های رقیب تفکیک کنید.'),questionIds:['colitis-ulcerosa-pattern-de'],cardIds:['colitis-ulcerosa-pattern']},
{id:'urgent',text:L('Nichtmechanische Dilatation mit systemischer Toxizität als dringlichen Komplikationsverdacht kommunizieren.','Urgently communicate nonmechanical dilatation with systemic toxicity as a complication concern.','اتساع غیرمکانیکی همراه سمیت سیستمیک را به‌عنوان شک به عارضه، فوری اعلام کنید.'),questionIds:['colitis-ulcerosa-urgent-de'],cardIds:['colitis-ulcerosa-urgent']}
]})

advancedGastroRows.push(...rectalRows)
advancedGastroCoverage.push(rectalCoverage)

advancedGastroRows.push(...ileusRows)
advancedGastroCoverage.push(ileusCoverage)
