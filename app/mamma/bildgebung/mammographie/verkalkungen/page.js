'use client'
import {useMemo,useState} from 'react'
import Image from 'next/image'
import {useLanguage} from '@/providers/LanguageProvider'
import StandardLessonShell,{LessonSection,LessonSources,TakeHomeList} from '@/components/lesson-template/StandardLessonShell'
import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'
import styles from './page.module.css'
import caseStyles from './case.module.css'
import {COPY,DISTRIBUTION,GERMAN_SECTIONS,L,MORPH,pick} from './content'
import {translateLesson} from './translations'
const ID='mammographie-mikrokalk',PATH='/mamma/bildgebung/mammographie/verkalkungen'
const TEMPLATE_COPY={
  path:L('Lernpfad','Learning path','مسیر یادگیری'),
  close:L('Schließen','Close','بستن'),
  progress:L('gelesen','read','خوانده‌شده'),
  continue:L('Lektion fortsetzen','Continue lesson','ادامه درس'),
  completeLesson:L('Ganze Lektion als gelesen markieren','Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted:L('Ganze Lektion gelesen','Full lesson marked as read','کل درس خوانده شد'),
  complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed:L('Als gelesen markiert','Marked as read','به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  open:L('Abschnitt öffnen','Open section','باز کردن بخش'),
  mcq:L('MCQ starten','Start MCQs','شروع MCQ'),
  takeHome:L('Take Home Message','Take Home Message','Take Home Message'),
}
const MORPHOLOGY_IMAGES={
  round:{src:'/mamma/mammographie/verkalkungen/morphology/round.png',width:309,height:895,alt:L('Runde, scharf begrenzte Verkalkungen mit Vergrößerung','Round, well-defined calcifications with magnified view','کلسیفیکاسیون‌های گرد و با حدود مشخص همراه با نمای بزرگ‌نمایی‌شده')},
  amorph:{src:'/mamma/mammographie/verkalkungen/morphology/amorphous.png',width:307,height:1024,alt:L('Amorphe, unscharf begrenzte Verkalkungen mit Vergrößerung','Amorphous, indistinct calcifications with magnified view','کلسیفیکاسیون‌های آمورف و نامشخص همراه با نمای بزرگ‌نمایی‌شده')},
  coarse:{src:'/mamma/mammographie/verkalkungen/morphology/coarse-heterogeneous.png',width:305,height:895,alt:L('Grob heterogene Verkalkungen mit Vergrößerung','Coarse heterogeneous calcifications with magnified view','کلسیفیکاسیون‌های درشت ناهمگون همراه با نمای بزرگ‌نمایی‌شده')},
  pleomorphic:{src:'/mamma/mammographie/verkalkungen/morphology/fine-pleomorphic.png',width:304,height:895,alt:L('Fein pleomorphe Verkalkungen mit Vergrößerung','Fine pleomorphic calcifications with magnified view','کلسیفیکاسیون‌های ظریف پلئومورفیک همراه با نمای بزرگ‌نمایی‌شده')},
  linear:{src:'/mamma/mammographie/verkalkungen/morphology/fine-linear-branching.png',width:307,height:895,alt:L('Fein lineare und verzweigte Verkalkungen mit Vergrößerung','Fine linear and branching calcifications with magnified view','کلسیفیکاسیون‌های ظریف خطی و شاخه‌دار همراه با نمای بزرگ‌نمایی‌شده')},
}
const DISTRIBUTION_IMAGES={
  diffuse:{src:'/mamma/mammographie/verkalkungen/distribution/diffuse.png',width:307,height:1024,alt:L('Diffuse Verteilung von Verkalkungen mit Vergrößerung','Diffuse distribution of calcifications with magnified view','توزیع منتشر کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  regional:{src:'/mamma/mammographie/verkalkungen/distribution/regional.png',width:307,height:1024,alt:L('Regionale Verteilung von Verkalkungen mit Vergrößerung','Regional distribution of calcifications with magnified view','توزیع ناحیه‌ای کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  grouped:{src:'/mamma/mammographie/verkalkungen/distribution/grouped.png',width:308,height:1024,alt:L('Gruppierte Verteilung von Verkalkungen mit Vergrößerung','Grouped distribution of calcifications with magnified view','توزیع گروهی کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  linear:{src:'/mamma/mammographie/verkalkungen/distribution/linear.png',width:307,height:1024,alt:L('Lineare Verteilung von Verkalkungen mit Vergrößerung','Linear distribution of calcifications with magnified view','توزیع خطی کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  segmental:{src:'/mamma/mammographie/verkalkungen/distribution/segmental.png',width:307,height:1024,alt:L('Segmentale Verteilung von Verkalkungen mit Vergrößerung','Segmental distribution of calcifications with magnified view','توزیع سگمنتال کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
}
const CALC_MATRIX={
  round:{diffuse:'3',regional:'3',grouped:'3',linear:'3',segmental:'4B'},
  amorph:{diffuse:'3',regional:'3',grouped:'4B',linear:'4B',segmental:'4B'},
  coarse:{diffuse:'3',regional:'3',grouped:'4A',linear:'4B',segmental:'4B'},
  pleomorphic:{diffuse:'4B',regional:'4B',grouped:'4C',linear:'4C',segmental:'4C'},
  linear:{diffuse:'4C',regional:'4B',grouped:'4C',linear:'5',segmental:'5'},
}
const MODEL_MORPH = MORPH.map(item => item.key === 'round' ? { ...item, title: L('Punktförmig (historischer Prädiktor)', 'Punctate (historical predictor)', 'نقطه‌ای (متغیر تاریخی)') } : item)
const CALC_CLASS={'3':'cat3','4A':'cat4a','4B':'cat4b','4C':'cat4c','5':'cat5'}
const SECTION_ICON_PATHS={
  grundlagen:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  groesse:'M4 8v8 M20 8v8 M4 12h16 M8 9l-4 3 4 3 M16 9l4 3-4 3',
  morphologie:'M6 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M15 4l5 3-2 5-5-2z M6 16l3-2 3 4-4 3z M16 17l4 3',
  verteilung:'M5 4v5l7 5v6 M19 4v5l-7 5 M12 3v11',
  ausdehnung:'M9 4H4v5 M15 4h5v5 M4 15v5h5 M20 15v5h-5 M8 12h8 M12 8v8',
  kombination:'M4 4h16v16H4z M4 10h16 M10 4v16 M15 14v4 M13 16h4',
  benigne:'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
  ultraschall:'M3 5h18v13H3z M8 21h8 M12 18v3 M5 12h3l2-4 4 7 2-3h3',
  technik:'M3 5h18v14H3z M7 9h10 M7 13h6 M8 22h8',
  kontext:'M12 4v16 M4 12h16 M7 7l10 10 M17 7L7 17',
  algorithmus:'M6 4h14v17H6z M3 8h5 M3 13h5 M3 18h5 M11 12l2 2 4-5',
  warnung:'M12 3L2 21h20z M12 9v5 M12 17v1',
  merke:'M6 3.5h12v17l-6-3.8-6 3.8z M9 8h6 M9 11.5h4',
}
function SectionIcon({id}){return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={SECTION_ICON_PATHS[id]||SECTION_ICON_PATHS.ultraschall}/></svg>}
const CALC_META={
  '3':{risk:'> 0 bis ≤ 2 %',label:'wahrscheinlich benigne',action:'Bei bestätigter Kategorie: Kontrolle nach 6 Monaten',mri:'Eine MRT ist für die reguläre BI-RADS-3-Verlaufskontrolle nicht erforderlich.'},
  '4A':{risk:'> 2 bis ≤ 10 %',label:'gering suspekt',action:'Biopsie empfohlen',mri:'Biopsieindikation bleibt bei bestätigter mammographischer BI-RADS-Kategorie 4 oder 5 bestehen; eine negative MRT hebt sie nicht automatisch auf.'},
  '4B':{risk:'> 10 bis ≤ 50 %',label:'mäßig suspekt',action:'Biopsie empfohlen',mri:'Biopsieindikation bleibt bei bestätigter mammographischer BI-RADS-Kategorie 4 oder 5 bestehen; eine negative MRT hebt sie nicht automatisch auf.'},
  '4C':{risk:'> 50 bis < 95 %',label:'stark suspekt',action:'Biopsie empfohlen',mri:'Negative MRT: histologische Abklärung weiterhin erforderlich.'},
  '5':{risk:'≥ 95 %',label:'hochgradig malignomverdächtig',action:'Histologische Sicherung erforderlich',mri:'Negative MRT: Biopsie erforderlich; der hochsuspekte Mammographiebefund bleibt maßgeblich.'},
}
const CALC_FACTORS=[
  {key:'progression',group:'Verlauf',title:'Neu, zunehmend oder stabil?',text:'Neuauftreten und Progression erhöhen den Verdacht.\nStabilität kann entlasten, schließt bei suspekter Morphologie aber Malignität nicht aus.'},
  {key:'extent',group:'Ausdehnung',title:'Das gesamte Kalkareal beachten',text:'Eine größere Ausdehnung kann das Risiko erhöhen.'},
  {key:'associated',group:'Begleitbefunde',title:'Masse oder Architekturstörung?',text:'Assoziierte Gewebeveränderungen können den Verdacht verstärken. Auch Asymmetrie sowie Haut- und Mamillenveränderungen mitbeurteilen.'},
  {key:'history',group:'Risikokontext',title:'Alter und Anamnese einbeziehen',text:'Höheres Alter und eine persönliche Brustkrebsanamnese können das Ausgangsrisiko erhöhen. Entscheidend bleibt der Gesamtbefund.'},
]
const FOUNDATION_GROUPS=[
  {
    id:'systematic-assessment',
    title:L('Systematische Beurteilung','Systematic assessment','ارزیابی سیستماتیک'),
    intro:L('Vier Fragen strukturieren die Beurteilung. Wähle links einen Fokus; rechts erscheint die passende diagnostische Frage.','Four questions structure the assessment. Choose a focus on the left to see the matching diagnostic question.','چهار پرسش ارزیابی را ساختار می‌دهند. یک محور را در سمت چپ انتخاب کنید تا پرسش تشخیصی مرتبط در سمت راست نمایش داده شود.'),
    items:[
      {id:'particle-size',label:L('Partikelgröße','Particle size','اندازه ذرات'),category:L('Einzelpartikel','Individual particle','ذره منفرد'),text:L('Wie groß sind die einzelnen Verkalkungen? Größe hilft bei der Beschreibung, trennt aber allein nicht sicher zwischen benign und maligne.','How large are the individual calcifications? Size helps with description but does not reliably separate benign from malignant findings on its own.','هر کلسیفیکاسیون چه اندازه‌ای دارد؟ اندازه به توصیف کمک می‌کند، اما به‌تنهایی خوش‌خیم را از بدخیم جدا نمی‌کند.')},
      {id:'morphology',label:L('Morphologie','Morphology','مورفولوژی'),category:L('Form & Kontur','Shape & margin','شکل و حاشیه'),text:L('Wie sehen die einzelnen Kalkpartikel aus? Form, Kontur und Größenheterogenität bestimmen den morphologischen Verdacht.','What do the individual particles look like? Shape, margin and size heterogeneity determine morphological suspicion.','ذرات کلسیفیکاسیون چه شکلی دارند؟ شکل، حاشیه و ناهمگونی اندازه میزان شک مورفولوژیک را تعیین می‌کند.')},
      {id:'distribution',label:L('Verteilungsmuster','Distribution pattern','الگوی توزیع'),category:L('Räumliche Anordnung','Spatial arrangement','آرایش فضایی'),text:L('Wie sind die Partikel innerhalb der Brust angeordnet? Lineare und segmentale Muster können auf einen duktalen Prozess hinweisen.','How are the particles arranged within the breast? Linear and segmental patterns may indicate a ductal process.','ذرات در پستان چگونه چیده شده‌اند؟ الگوهای خطی و سگمنتال می‌توانند نشان‌دهنده فرایند مجرایی باشند.')},
      {id:'extent',label:L('Ausdehnung','Extent','وسعت'),category:L('Gesamtareal','Total area','ناحیه کلی'),text:L('Wie groß ist das gesamte betroffene Kalkareal? Die Gesamtausdehnung ist für Risikoeinschätzung, DCIS-Ausdehnung und Therapieplanung relevant.','How large is the total calcification field? Overall extent matters for risk assessment, DCIS extent and treatment planning.','کل ناحیه درگیر کلسیفیکاسیون چه اندازه‌ای دارد؟ وسعت کلی برای ارزیابی خطر، وسعت DCIS و برنامه‌ریزی درمان اهمیت دارد.')},
    ],
    noteTitle:L('Grundprinzip','Core principle','اصل پایه'),
    note:L('Kalk ist ein bildgebender Phänotyp und allein keine Diagnose. Verlauf, klinischer Kontext und Begleitbefunde gehören immer zur Gesamtbeurteilung.','Calcification is an imaging phenotype, not a diagnosis by itself. Evolution, clinical context and associated findings always belong in the overall assessment.','کلسیفیکاسیون یک فنوتیپ تصویربرداری است و به‌تنهایی تشخیص محسوب نمی‌شود. روند، زمینه بالینی و یافته‌های همراه همیشه باید در ارزیابی کلی لحاظ شوند.'),
  },
  {
    id:'technique',
    tone:'secondary',
    title:L('Technik','Technique','تکنیک'),
    intro:L('Mammographie und Tomosynthese beantworten unterschiedliche Teilfragen. Die Detailbeurteilung des Kalks bleibt eine Aufgabe gezielter 2D-Vergrößerungsaufnahmen.','Mammography and tomosynthesis answer different parts of the problem. Detailed calcification analysis remains the role of targeted 2D magnification views.','ماموگرافی و توموسنتز به بخش‌های متفاوت مسئله پاسخ می‌دهند. بررسی دقیق کلسیفیکاسیون همچنان بر عهده نماهای هدفمند بزرگ‌نمایی دوبعدی است.'),
    items:[
      {id:'mammography',label:L('Mammographie · MG','Mammography · MG','ماموگرافی · MG'),category:L('Detaildiagnostik','Detail assessment','ارزیابی جزئیات'),text:L('Gezielte 2D-Vergrößerungsaufnahmen zeigen Form, Kontur und Dichte der einzelnen Kalkpartikel und sind für die morphologische Einordnung zentral.','Targeted 2D magnification views show the shape, margin and density of individual particles and are central to morphological assessment.','نماهای هدفمند بزرگ‌نمایی دوبعدی شکل، حاشیه و دانسیته هر ذره را نشان می‌دهند و برای ارزیابی مورفولوژیک ضروری‌اند.')},
      {id:'tomosynthesis',label:L('Tomosynthese · DBT','Tomosynthesis · DBT','توموسنتز · DBT'),category:L('Lokalisation & Kontext','Localisation & context','محل و زمینه'),text:L('DBT ergänzt die räumliche Lokalisation und den Gewebekontext, ersetzt bei der Kalkabklärung jedoch keine Vergrößerungsaufnahmen.','DBT adds spatial localisation and tissue context but does not replace magnification views when assessing calcifications.','DBT محل فضایی و زمینه بافتی را تکمیل می‌کند، اما در ارزیابی کلسیفیکاسیون جایگزین نماهای بزرگ‌نمایی نمی‌شود.')},
    ],
  },
]
const BENIGN_OUTSIDE_GROUPS=[{
  id:'benign-outside-parenchyma',
  title:L('Außerhalb des Drüsenparenchyms','Outside the glandular parenchyma','خارج از پارانشیم غده‌ای'),
  intro:L('Oberflächliche, vaskuläre und postoperative Verkalkungen lassen sich vor allem durch ihre typische Lage und Form einordnen.','Superficial, vascular and postoperative calcifications are classified mainly by their characteristic location and shape.','کلسیفیکاسیون‌های سطحی، عروقی و پس از جراحی عمدتاً بر اساس محل و شکل تیپیک آن‌ها طبقه‌بندی می‌شوند.'),
  items:[
    {id:'skin',label:L('Hautverkalkungen','Skin calcifications','کلسیفیکاسیون پوستی'),category:L('Oberflächliche Lage','Superficial location','محل سطحی'),text:L('Typischerweise rund oder oval und oberflächlich gelegen. Eine zentrale Aufhellung und die Lage nahe der Haut unterstützen die Zuordnung.','Typically round or oval and superficially located. Central lucency and proximity to the skin support classification.','معمولاً گرد یا بیضی و سطحی هستند. شفافیت مرکزی و نزدیکی به پوست به تشخیص کمک می‌کند.')},
    {id:'vascular',label:L('Vaskuläre Verkalkungen','Vascular calcifications','کلسیفیکاسیون عروقی'),category:L('Gefäßverlauf','Vascular course','مسیر عروقی'),text:L('Dichte lineare oder parallele Verkalkungen zeichnen einen Gefäßverlauf nach. Sie sind zugleich ein Marker für ein erhöhtes kardiovaskuläres Risiko.','Dense linear or parallel calcifications follow the course of a vessel. They are also a marker of increased cardiovascular risk.','کلسیفیکاسیون‌های خطی یا موازی متراکم مسیر عروق را دنبال می‌کنند و هم‌زمان نشانگر افزایش خطر قلبی‌عروقی هستند.')},
    {id:'suture',label:L('Nahtverkalkungen','Suture calcifications','کلسیفیکاسیون بخیه'),category:L('Postoperativer Kontext','Postoperative context','زمینه پس از جراحی'),text:L('Lineare oder kurvilineare Verkalkungen liegen entlang von Nahtmaterial. Operationsanamnese und typische Verteilung sichern die Einordnung.','Linear or curvilinear calcifications lie along suture material. Surgical history and typical distribution support classification.','کلسیفیکاسیون‌های خطی یا منحنی در امتداد بخیه قرار می‌گیرند. سابقه جراحی و توزیع تیپیک طبقه‌بندی را تأیید می‌کند.')},
  ],
}]
const BENIGN_PARENCHYMA_GROUPS=[{
  id:'benign-within-parenchyma',
  tone:'secondary',
  title:L('Im Drüsenparenchym','Within the glandular parenchyma','داخل پارانشیم غده‌ای'),
  intro:L('Wähle links eines der vier typischen Muster. Rechts erscheinen Morphologie, Entstehung und die wichtigste Abgrenzung.','Choose one of the four typical patterns on the left. Morphology, origin and the key distinction appear on the right.','یکی از چهار الگوی تیپیک را در سمت چپ انتخاب کنید. مورفولوژی، منشأ و مهم‌ترین افتراق در سمت راست نمایش داده می‌شود.'),
  items:[
    {id:'coarse',label:L('Grobschollig','Coarse / popcorn-like','درشت / پاپ‌کورنی'),category:L('Coarse · popcornartig','Coarse · popcorn-like','درشت · پاپ‌کورنی'),text:L('Große, grobe Verkalkungen, meist über 2 mm. Typisch bei involutiertem Fibroadenom, Fettnekrose, Narben oder dystrophen Veränderungen.','Large coarse calcifications, usually over 2 mm. Typical of an involuting fibroadenoma, fat necrosis, scars or dystrophic change.','کلسیفیکاسیون‌های بزرگ و درشت، معمولاً بیش از ۲ میلی‌متر؛ تیپیک در فیبروآدنوم اینولوتیو، نکروز چربی، اسکار یا تغییرات دیستروفیک.')},
    {id:'rod-like',label:L('Large rod-like','Large rod-like','میله‌ای بزرگ'),category:L('Gang- oder Gangwandverkalkung','Ductal or periductal calcification','کلسیفیکاسیون داخل یا اطراف مجرا'),text:L('Grobe, längliche Verkalkungen mit glatten, gut definierten Konturen. Nicht mit den deutlich feineren und irregulären fine linear calcifications verwechseln.','Coarse elongated calcifications with smooth, well-defined contours. Do not confuse them with much finer, irregular fine linear calcifications.','کلسیفیکاسیون‌های درشت و کشیده با حاشیه صاف و مشخص؛ نباید با کلسیفیکاسیون‌های ظریف خطی و نامنظم اشتباه شوند.')},
    {id:'layering',label:L('Layering','Layering','لایه‌نشینی'),category:L('Teacup · Milchkalzium','Teacup · milk of calcium','فنجانی · شیر کلسیم'),text:L('Sedimentierende Verkalkungen innerhalb von Mikro- oder Makrozysten; in der Seitenaufnahme typischerweise halbmond- oder sichelförmig.','Dependent calcifications within micro- or macrocysts; typically crescent-shaped on the lateral view.','رسوب کلسیفیکاسیون در میکروکیست یا ماکروکیست که در نمای لترال معمولاً هلالی دیده می‌شود.')},
    {id:'rim',label:L('Rim calcifications','Rim calcifications','کلسیفیکاسیون حاشیه‌ای'),category:L('Dünne Randverkalkung','Thin peripheral calcification','کلسیفیکاسیون حاشیه‌ای نازک'),text:L('Dünne randständige Verkalkungen entlang einer rundlichen Struktur, typisch bei Fettnekrose, Ölzysten oder Zysten.','Thin peripheral calcifications along a rounded structure, typical of fat necrosis, oil cysts or cysts.','کلسیفیکاسیون نازک در حاشیه یک ساختار گرد، تیپیک در نکروز چربی، کیست روغنی یا کیست.')},
  ],
}]
const MODALITY_GROUPS=[
  {
    id:'ultrasound-calcifications',
    title:L('Ultraschall','Ultrasound','سونوگرافی'),
    intro:L('Korrelatsuche und Biopsieplanung stehen im Vordergrund. Die mammographische Beurteilung des Kalks bleibt maßgeblich.','The main roles are finding a correlate and planning biopsy. Mammographic assessment of the calcifications remains decisive.','هدف اصلی یافتن یافته متناظر و برنامه‌ریزی بیوپسی است. ارزیابی ماموگرافیک کلسیفیکاسیون همچنان تعیین‌کننده است.'),
    items:[
      {id:'visibility',label:L('Sichtbarkeit','Visibility','قابلیت مشاهده'),category:L('Sonographisches Erscheinungsbild','Sonographic appearance','نمای سونوگرافیک'),text:L('Makroverkalkungen erscheinen echogen, häufig mit dorsalem Schallschatten. Mikrokalk kann als feine echogene Foci sichtbar sein, besonders innerhalb einer Gewebeveränderung oder eines Ganges.','Macrocalcifications appear echogenic, often with posterior shadowing. Microcalcifications may be visible as fine echogenic foci, especially within a tissue change or duct.','ماکروکلسیفیکاسیون‌ها اکوژن و اغلب همراه سایه خلفی‌اند. میکروکلسیفیکاسیون ممکن است به‌صورت فوکوس‌های ظریف اکوژن، به‌ویژه در ضایعه بافتی یا مجرا دیده شود.')},
      {id:'benefit',label:L('Zusatznutzen','Added value','کاربرد تکمیلی'),category:L('Korrelat & Biopsie','Correlation & biopsy','تطابق و بیوپسی'),text:L('Assoziierte Gewebeveränderungen gezielt mitbeurteilen. Ein eindeutig zugeordnetes Korrelat kann eine ultraschallgesteuerte Biopsie ermöglichen.','Target associated tissue changes. A confidently matched correlate may allow ultrasound-guided biopsy.','تغییرات بافتی همراه را هدفمند بررسی کنید. یافتن یک یافته متناظر مطمئن می‌تواند بیوپسی تحت هدایت سونوگرافی را ممکن کند.')},
      {id:'limit',label:L('Grenze','Limitation','محدودیت'),category:L('Kein Ausschlussverfahren','Not an exclusion test','روش ردکننده نیست'),text:L('Fehlende sonographische Sichtbarkeit schließt einen suspekten mammographischen Kalkbefund nicht aus.','Lack of sonographic visibility does not exclude suspicious mammographic calcifications.','دیده‌نشدن در سونوگرافی، کلسیفیکاسیون مشکوک ماموگرافیک را رد نمی‌کند.')},
    ],
  },
  {
    id:'mri-calcifications',
    tone:'secondary',
    title:L('MRT','MRI','MRI'),
    intro:L('Die kontrastverstärkte MRT beurteilt das umgebende Gewebe und die Ausdehnung, nicht die Kalkpartikel selbst.','Contrast-enhanced MRI assesses the surrounding tissue and extent, not the calcific particles themselves.','MRI با تزریق، بافت اطراف و وسعت را ارزیابی می‌کند، نه خود ذرات کلسیفیکاسیون را.'),
    items:[
      {id:'visibility',label:L('Sichtbarkeit','Visibility','قابلیت مشاهده'),category:L('Kontrastmittelaufnahme','Enhancement','افزایش کنتراست'),text:L('Die MRT zeigt die Kontrastmittelaufnahme des Gewebes; die Kalkpartikel selbst werden nicht zuverlässig dargestellt.','MRI shows tissue enhancement; the calcific particles themselves are not reliably depicted.','MRI افزایش کنتراست بافت را نشان می‌دهد؛ خود ذرات کلسیفیکاسیون به‌طور قابل اعتماد نمایش داده نمی‌شوند.')},
      {id:'benefit',label:L('Zusatznutzen','Added value','کاربرد تکمیلی'),category:L('Ausdehnung & Zusatzherde','Extent & additional lesions','وسعت و ضایعات اضافی'),text:L('Bei entsprechender Fragestellung lassen sich Läsionsausdehnung, zusätzliche Herde und Hinweise auf eine invasive Komponente beurteilen.','When clinically indicated, lesion extent, additional foci and signs of an invasive component can be assessed.','در صورت اندیکاسیون، می‌توان وسعت ضایعه، کانون‌های اضافی و نشانه‌های جزء مهاجم را بررسی کرد.')},
      {id:'limit',label:L('Grenze','Limitation','محدودیت'),category:L('Negative MRT','Negative MRI','MRI منفی'),text:L('Eine unauffällige MRT schließt ein DCIS nicht sicher aus und beweist keine Benignität.','A negative MRI does not reliably exclude DCIS and does not prove benignity.','MRI منفی، DCIS را با اطمینان رد نمی‌کند و خوش‌خیمی را اثبات نمی‌کند.')},
    ],
  },
]
const DISTRIBUTION_CONTEXT={
  diffuse:L('meist eher benign','usually less suspicious','اغلب کمتر مشکوک'),
  regional:L('im Kontext bewerten','assess in context','در زمینه ارزیابی شود'),
  grouped:L('Morphologie entscheidet','morphology drives risk','مورفولوژی تعیین‌کننده خطر است'),
  linear:L('duktales Muster möglich','possible ductal pattern','احتمال الگوی مجرایی'),
  segmental:L('duktales Muster besonders relevant','ductal pattern is especially relevant','الگوی مجرایی اهمیت ویژه دارد'),
}
const REFERENCES=[
  {
    tag:L('Leitlinie & Lexikon','Guideline & lexicon','راهنما و واژه‌نامه'),
    title:'ACR BI-RADS® v2025 – Mammography Summary Form',
    citation:'American College of Radiology; 2025. Official mammography summary form.',
    scope:L('Aktuelle standardisierte Terminologie, Befundstruktur, Kategorien und Managementempfehlungen.','Current standardized terminology, report structure, assessment categories, and management recommendations.','اصطلاحات استاندارد فعلی، ساختار گزارش، دسته‌بندی‌ها و توصیه‌های مدیریتی.'),
    href:"https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
  },
  {
    tag:L('Übersicht','Review','مرور'),
    title:'Microcalcification on mammography: approaches to interpretation and biopsy',
    citation:'Wilkinson L, Thomas V, Sharma N. Br J Radiol. 2017;90:20160594. PMID 27648482.',
    scope:L('Pragmatischer Überblick zu Interpretation, Zusatzaufnahmen und Biopsiestrategie.','Practical overview of interpretation, additional views, and biopsy strategy.','مرور کاربردی تفسیر، نماهای تکمیلی و راهبرد بیوپسی.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/27648482/',
  },
  {
    tag:L('Risikostratifikation','Risk stratification','طبقه‌بندی خطر'),
    title:'The positive predictive value of BI-RADS microcalcification descriptors and final assessment categories',
    citation:"Bent CK, Bassett LW, D'Orsi CJ, Sayre JW. AJR. 2010;194:1378–1383. PMID 20410428.",
    scope:L('Positiver Vorhersagewert von Morphologie, Verteilung und BI-RADS-Endkategorie.','Positive predictive value of morphology, distribution, and final BI-RADS category.','ارزش اخباری مثبت مورفولوژی، توزیع و دسته نهایی BI-RADS.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/20410428/',
  },
  {
    tag:L('Scoring-Modell','Scoring model','مدل امتیازدهی'),
    title:'Scoring System to Stratify Malignancy Risks for Mammographic Microcalcifications Based on BI-RADS 5th Edition Descriptors',
    citation:'Youk JH et al. Korean J Radiol. 2019;20:1646–1652. PMID 31854152.',
    scope:L('Grundlage des vereinfachten Morphologie-mal-Verteilung-Modells dieser Lektion.','Basis for the simplified morphology-by-distribution model used in this lesson.','مبنای مدل ساده‌شده مورفولوژی در توزیع در این درس.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/31854152/',
  },
  {
    tag:L('Klassifikation','Classification','طبقه‌بندی'),
    title:'Breast microcalcifications: the UK RCR 5-point breast imaging system or BI-RADS; which is the better predictor of malignancy?',
    citation:"Metaxa L, Healy NA, O'Keeffe SA. Br J Radiol. 2019;92:20190177. PMID 31365279.",
    scope:L('Vergleich der Klassifikationssysteme und Einordnung von Morphologie und Ausdehnung.','Comparison of classification systems and assessment of morphology and extent.','مقایسه سامانه‌های طبقه‌بندی و ارزیابی مورفولوژی و وسعت.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/31365279/',
  },
  {
    tag:L('Systematischer Review','Systematic review','مرور سیستماتیک'),
    title:'MR Imaging for Diagnosis of Malignancy in Mammographic Microcalcifications',
    citation:'Bennani-Baiti B, Baltzer PA. Radiology. 2017;283:692–701. PMID 27788035.',
    scope:L('Diagnostische Leistung der kontrastverstärkten MRT bei mammographischem Mikrokalk.','Diagnostic performance of contrast-enhanced MRI for mammographic microcalcifications.','عملکرد تشخیصی MRI با کنتراست در میکروکلسیفیکاسیون‌های ماموگرافیک.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/27788035/',
  },
  {
    tag:L('Metaanalyse','Meta-analysis','متاآنالیز'),
    title:'Can supplementary contrast-enhanced MRI of the breast avoid needle biopsies in suspicious microcalcifications?',
    citation:'Fueger BJ et al. Breast. 2021;56:53–60. PMID 33618160.',
    scope:L('Evidenz und Grenzen eines MRT-gestützten Biopsieverzichts bei ausgewählten suspekten Verkalkungen.','Evidence and limitations of MRI-supported biopsy avoidance in selected suspicious calcifications.','شواهد و محدودیت‌های صرف‌نظر از بیوپسی با کمک MRI در کلسیفیکاسیون‌های مشکوک منتخب.'),
    href:'https://pubmed.ncbi.nlm.nih.gov/33618160/',
  },
]
function Section({id,title,children}){return <LessonSection id={id} title={title} icon={id} bodyClassName={`${styles.sectionBody} ${styles.templateSectionBody}`}>{children}</LessonSection>}
const IMAGE_LABEL_EQUIVALENTS = {
  "morphology": {
    "round": {
      "de": "Bildbeschriftung „Round (punctate)“: rund; punktförmig ist die ältere Bezeichnung sehr kleiner runder Partikel.",
      "en": "Image label “Round (punctate)”: round; punctate is an older term for very small round particles.",
      "fa": "برچسب تصویر «Round (punctate)»: گرد؛ نقطه‌ای اصطلاح قدیمی ذرات بسیار کوچک گرد است."
    },
    "amorph": {
      "de": "Bildbeschriftung „Amorphous“: amorph.",
      "en": "Image label “Amorphous”: amorphous.",
      "fa": "برچسب تصویر «Amorphous»: آمورف."
    },
    "coarse": {
      "de": "Bildbeschriftung „Coarse heterogeneous“: grob heterogen.",
      "en": "Image label “Coarse heterogeneous”: coarse heterogeneous.",
      "fa": "برچسب تصویر «Coarse heterogeneous»: درشت ناهمگون."
    },
    "pleomorphic": {
      "de": "Bildbeschriftung „Fine pleomorphic“: fein pleomorph.",
      "en": "Image label “Fine pleomorphic”: fine pleomorphic.",
      "fa": "برچسب تصویر «Fine pleomorphic»: پلئومورفیک ظریف."
    },
    "linear": {
      "de": "Bildbeschriftung „Fine linear (fine-linear or fine-linear branching)“: fein linear oder fein linear verzweigt.",
      "en": "Image label “Fine linear (fine-linear or fine-linear branching)”: fine linear or fine linear branching.",
      "fa": "برچسب تصویر «Fine linear (fine-linear or fine-linear branching)»: ظریف خطی یا ظریف خطی شاخه‌دار."
    }
  },
  "distribution": {
    "diffuse": {
      "de": "Bildbeschriftung „Diffuse“: diffus.",
      "en": "Image label “Diffuse”: diffuse.",
      "fa": "برچسب تصویر «Diffuse»: منتشر."
    },
    "regional": {
      "de": "Bildbeschriftung „Regional“: regional.",
      "en": "Image label “Regional”: regional.",
      "fa": "برچسب تصویر «Regional»: ناحیه‌ای."
    },
    "grouped": {
      "de": "Bildbeschriftung „Grouped“: gruppiert.",
      "en": "Image label “Grouped”: grouped.",
      "fa": "برچسب تصویر «Grouped»: گروهی."
    },
    "linear": {
      "de": "Bildbeschriftung „Linear“: linear.",
      "en": "Image label “Linear”: linear.",
      "fa": "برچسب تصویر «Linear»: خطی."
    },
    "segmental": {
      "de": "Bildbeschriftung „Segmental“: segmental.",
      "en": "Image label “Segmental”: segmental.",
      "fa": "برچسب تصویر «Segmental»: سگمنتال."
    }
  }
}
function MorphologyImage({type,lang='de'}){const image=MORPHOLOGY_IMAGES[type];return <div><a className={caseStyles.morphologyIllustration} href={image.src} target="_blank" rel="noreferrer" aria-label={pick(image.alt,lang)}><Image src={image.src} alt={pick(image.alt,lang)} width={image.width} height={image.height}/></a><p className={caseStyles.biradsCaption} dir={lang==='fa'?'rtl':'ltr'}>{pick(IMAGE_LABEL_EQUIVALENTS.morphology[type],lang)}</p></div>}
function DistributionImage({type,lang='de'}){const image=DISTRIBUTION_IMAGES[type];return <div><a className={caseStyles.distributionIllustration} href={image.src} target="_blank" rel="noreferrer" aria-label={pick(image.alt,lang)}><Image src={image.src} alt={pick(image.alt,lang)} width={image.width} height={image.height}/></a><p className={caseStyles.biradsCaption} dir={lang==='fa'?'rtl':'ltr'}>{pick(IMAGE_LABEL_EQUIVALENTS.distribution[type],lang)}</p></div>}
function BenignCalcificationDiagram({type,label}){
  const backgroundId=`benign-${type}-background`
  const glowId=`benign-${type}-glow`
  return <svg viewBox="0 0 280 210" role="img" aria-label={label}>
    <title>{label}</title>
    <defs>
      <radialGradient id={backgroundId} cx="52%" cy="48%" r="72%"><stop offset="0" stopColor="#413446"/><stop offset=".58" stopColor="#201a29"/><stop offset="1" stopColor="#0d0d16"/></radialGradient>
      <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="280" height="210" rx="16" fill={`url(#${backgroundId})`}/>
    <g fill="none" stroke="#f0dce7" strokeOpacity=".09" strokeWidth="1.5">
      <path d="M16 56C68 25 117 31 157 56s72 27 108 8"/><path d="M9 145c45-31 88-27 130-4s83 26 132-6"/><path d="M43 191c33-35 69-45 105-32s57 13 92-8"/>
    </g>
    {type==='coarse'?<g filter={`url(#${glowId})`} fill="#f7e8ef" stroke="#df9ab3" strokeWidth="2">
      <path d="M89 111c-13-16-5-35 13-39 4-20 29-27 43-13 17-10 39 3 37 23 19 7 23 31 7 43 5 19-15 36-33 28-13 17-39 11-43-9-21 5-38-17-24-33Z"/>
      <circle cx="111" cy="92" r="11" fill="#fff7fa"/><circle cx="148" cy="83" r="13"/><circle cx="164" cy="116" r="14" fill="#fff7fa"/><circle cx="126" cy="126" r="16"/>
    </g>:null}
    {type==='rod-like'?<g fill="none" stroke="#faedf2" strokeLinecap="round" filter={`url(#${glowId})`}>
      <path d="M83 49c22 28 29 63 22 104" strokeWidth="12"/><path d="M128 43c19 33 22 71 10 119" strokeWidth="10"/><path d="M173 52c13 30 12 66-2 103" strokeWidth="13"/><path d="M209 71c8 25 5 51-8 76" strokeWidth="9"/>
    </g>:null}
    {type==='layering'?<g filter={`url(#${glowId})`}>
      <g fill="#161421" stroke="#dfb5c5" strokeWidth="2"><circle cx="77" cy="104" r="39"/><circle cx="151" cy="86" r="31"/><circle cx="207" cy="132" r="28"/></g>
      <g fill="#f8eaf0"><path d="M42 114a39 39 0 0 0 70 0c-24 7-48 7-70 0Z"/><path d="M123 94a31 31 0 0 0 56 0c-19 6-38 6-56 0Z"/><path d="M182 139a28 28 0 0 0 50 0c-17 5-34 5-50 0Z"/></g>
      <g stroke="#fff" strokeOpacity=".75" strokeWidth="2"><path d="M45 114h64"/><path d="M126 94h50"/><path d="M185 139h44"/></g>
    </g>:null}
    {type==='rim'?<g filter={`url(#${glowId})`} fill="#171520">
      <circle cx="102" cy="103" r="45" stroke="#faedf2" strokeWidth="7"/><circle cx="180" cy="91" r="30" stroke="#e7c8d4" strokeWidth="5"/><circle cx="190" cy="151" r="20" stroke="#f7e5ec" strokeWidth="4"/>
      <circle cx="89" cy="89" r="5" fill="#624b61"/><circle cx="168" cy="81" r="4" fill="#624b61"/>
    </g>:null}
  </svg>
}
function KalkAssessment({lang}){
  const t=value=>translateLesson(value,lang)
  const[morph,setMorph]=useState('amorph')
  const[dist,setDist]=useState('grouped')
  const resultCategory=CALC_MATRIX[morph][dist]

  const selectCell=(nextMorph,nextDist)=>{setMorph(nextMorph);setDist(nextDist)}
  return <div className={`${caseStyles.assessment} ${caseStyles.refinedAssessment}`}>
    <div className={caseStyles.assessmentIntro}>
      <span className={caseStyles.assessmentIcon}><SectionIcon id="kombination"/></span>
      <div><small>{t("Historisches Forschungsmodell")}</small><h3>{t("BI-RADS")}<span>{t("(Kalzifikationen: Morphologie × Verteilung)")}</span></h3></div>
    </div>
    <div className={caseStyles.assessmentCalculator}>
      <div className={caseStyles.assessmentInputs}>
        <label><span>{t("1 · Morphologie")}</span><select value={morph} onChange={event=>setMorph(event.target.value)}>{MODEL_MORPH.map(item=><option key={item.key} value={item.key}>{pick(item.title,lang)}</option>)}</select></label>
        <span className={caseStyles.assessmentOperator}>×</span>
        <label><span>{t("2 · Verteilung")}</span><select value={dist} onChange={event=>setDist(event.target.value)}>{DISTRIBUTION.map(item=><option key={item.key} value={item.key}>{pick(item.title,lang)}</option>)}</select></label>
      </div>
      <div className={`${caseStyles.assessmentResult} ${caseStyles[CALC_CLASS[resultCategory]]}`} aria-live="polite">
        <span>{t("Historische Modellkategorie")}</span><strong>{resultCategory}</strong><small>{t("Klinisches Assessment gesondert: Dieser Modellwert berechnet kein individuelles Risiko und begründet weder Verlaufskontrolle noch Gewebeentnahme.")}</small>
      </div>
    </div>
    <div className={caseStyles.matrixHeading}><small>{t("Kategorien im Überblick")}</small></div>
    <div className={caseStyles.biradsMatrix}>
      <table>
        <thead><tr><th>{t("Morphologie ↓")}</th>{DISTRIBUTION.map(item=><th key={item.key} className={dist===item.key?caseStyles.axisActive:''}>{pick(item.title,lang)}</th>)}</tr></thead>
        <tbody>{MODEL_MORPH.map(item=><tr key={item.key}><th scope="row" className={morph===item.key?caseStyles.axisActive:''}>{pick(item.title,lang)}</th>{DISTRIBUTION.map(distribution=>{const value=CALC_MATRIX[item.key][distribution.key];const active=item.key===morph&&distribution.key===dist;return <td key={distribution.key} className={`${caseStyles[CALC_CLASS[value]]} ${active?caseStyles.cellActive:''}`}><button type="button" onClick={()=>selectCell(item.key,distribution.key)} aria-label={`${pick(item.title,lang)}, ${pick(distribution.title,lang)}: BI-RADS ${value}`} aria-pressed={active}><span className={caseStyles.matrixValue}>{value}</span></button></td>})}</tr>)}</tbody>
      </table>
    </div>
    <p className={caseStyles.biradsCaption}>{t("Youk2019: retrospektives Modell aus 194 operativ entfernten, ursprünglich suspekten Läsionen; externe Prüfung an 100 weiteren exzidierten Läsionen. Der historische Prädiktor war punktförmig (punctate), nicht jede runde Verkalkung. Verlauf, Patientenmerkmale und Begleitbefunde fehlen als Eingaben. Modellkategorien ersetzen keine heutige klinische BI-RADS-Zuordnung und verordnen keine Kontrolle oder Biopsie.")}</p>
    <p className={caseStyles.biradsCaption}>{t("Beispiel: Regionalem amorphem Kalk wird im historischen Modell die Modellkategorie 3 zugeordnet. Bei neuer benachbarter Architekturstörung muss diese gezielt abgeklärt und der Gesamtbefund neu bewertet werden. Das Modell kennt diesen Begleitbefund nicht; seine Modellkategorie 3 kann keine Sechsmonatskontrolle des Gesamtbefunds verordnen.")}</p>
    <div className={caseStyles.contextPanel}>
      <div className={caseStyles.contextPanelHead}><h4>{t("Modifikatoren")}</h4></div>
      <div className={caseStyles.contextFactorGrid}>{CALC_FACTORS.map((factor,index)=><article key={factor.key} className={caseStyles.contextFactor}><span className={caseStyles.factorIndex}>{String(index+1).padStart(2,'0')}</span><small>{t(factor.group)}</small><strong>{t(factor.title)}</strong><p style={{whiteSpace:'pre-line'}}>{t(factor.text)}</p></article>)}</div>
      <p className={caseStyles.biradsCaption}>{t("Zusätzlich mitbeurteilen – keine festen Plus-/Minus-Stufen und kein additiver BI-RADS-Score.")}</p>
    </div>
  </div>
}
function RememberNote({label,children}){return <aside className={caseStyles.rememberNote}><span className={caseStyles.rememberIcon}><SectionIcon id="merke"/></span><strong>{label}</strong><div>{children}</div></aside>}
function DescriptorExplorer({items,lang,type}){
  const[selected,setSelected]=useState(items[0].key)
  const active=items.find(item=>item.key===selected)||items[0]
  const title=type==='morphology'?pick(L('Morphologie auswählen','Choose morphology','انتخاب مورفولوژی'),lang):pick(L('Verteilung auswählen','Choose distribution','انتخاب توزیع'),lang)
  const context=type==='morphology'?pick(active.risk,lang):pick(DISTRIBUTION_CONTEXT[active.key],lang)
  return <div className={caseStyles.descriptorExplorer}>
    <div className={caseStyles.descriptorTabs} role="tablist" aria-label={title}>
      {items.map(item=><button key={item.key} type="button" role="tab" id={`${type}-${item.key}-tab`} aria-controls={`${type}-descriptor-panel`} aria-selected={selected===item.key} onClick={()=>setSelected(item.key)}><span>{pick(item.title,lang)}</span><i aria-hidden="true">→</i></button>)}
    </div>
    <article id={`${type}-descriptor-panel`} className={caseStyles.descriptorPanel} role="tabpanel" aria-labelledby={`${type}-${active.key}-tab`}>
      <div className={caseStyles.descriptorCopy}><small>{context}</small><h3>{pick(active.title,lang)}</h3><p>{pick(active.text,lang)}</p></div>
      <div className={caseStyles.descriptorVisual}>{type==='morphology'?<MorphologyImage type={active.key} lang={lang}/>:<DistributionImage type={active.key} lang={lang}/>}</div>
    </article>
  </div>
}
function LessonContent({lang}){const t=value=>translateLesson(value,lang);return <>
  <Section {...GERMAN_SECTIONS[0]} title={t(GERMAN_SECTIONS[0].label.de)}>
    <InteractiveTeachingGroups groups={FOUNDATION_GROUPS} resolve={value=>pick(value,lang)} direction={lang==='fa'?'rtl':'ltr'}/>
  </Section>

  <Section {...GERMAN_SECTIONS[1]} title={t(GERMAN_SECTIONS[1].label.de)}>
    <p className={`${styles.lead} ${caseStyles.emphasizedLead}`}>{t("Makroverkalkungen (> 2 mm) beziehungsweise typisch grobschollige Verkalkungen (irregulär geformt, jedoch mit glatter Begrenzung) sind in der Regel benign.")}</p>
    <p className={styles.lead}>{t("Malignitätsassoziierte Mikroverkalkungen sind häufig kleiner als 0,5 mm, insbesondere fein pleomorphe und fein lineare Formen. Kleine Partikel kommen jedoch auch bei benignen Befunden vor: Die Größe allein trennt nicht sicher zwischen benign und malign.")}</p>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grobschollige Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86372/r-cc.png" alt={t("CC-Mammographie rechts mit grobscholligen Verkalkungen")} width={394} height={814}/></a><figcaption>{t("CC rechts")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86372/r-mlo.png" alt={t("MLO-Mammographie rechts mit grobscholligen Verkalkungen")} width={413} height={818}/></a><figcaption>{t("MLO rechts")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Größe und Morphologie:")}</strong>{" "}{t("Mehrere große, grobe und glatt begrenzte Verkalkungen in der rechten Brust.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 86372 (Vollbild)")}</a>.</p>
    </article>
    <RememberNote label={t("Merke")}><p>{t("Größe allein beweist keine Benignität – Morphologie und Verteilung entscheiden über das tatsächliche Risiko.")}</p></RememberNote>
  </Section>

  <Section {...GERMAN_SECTIONS[2]} title={t(GERMAN_SECTIONS[2].label.de)}>
    <p className={styles.lead}>{t("Die Morphologie beschreibt die Form der einzelnen Kalkpartikel.")}</p>
    <div className={caseStyles.morphologyArrow}><span>{t("benigne")}</span><b>{t("suspekt")}</b></div>
    <p className={caseStyles.biradsCaption}>{t("Amorph und grob heterogen sind suspekte Deskriptoren ohne universelle feste Reihenfolge. Ihr beobachteter PPV hängt von Kohorte, Verteilung und Kontext ab; grob heterogen ist nicht typisch benigner grober Kalk.")}</p>
    <DescriptorExplorer items={MORPH} lang={lang} type="morphology"/>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grob heterogene Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-67107/ccd-1.png" alt={t("Vergrößerungsaufnahme der rechten Brust mit grob heterogenen Verkalkungen")} width={461} height={645}/></a><figcaption>{t("Vergrößerungsaufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-67107/ccd-2.png" alt={t("Detailaufnahme grob heterogener Verkalkungen")} width={594} height={506}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Gruppierte, irreguläre und unterschiedlich große Verkalkungen, größer und dichter als amorphe Partikel, aber ohne typisch grobschollige Benignitätsmerkmale.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 67107 (Vollbild)")}</a>.</p>
    </article>
    <RememberNote label={t("Merke")}><p>{t("Fein lineare/verzweigte Verkalkungen sind hochsuspekt und häufig mit DCIS assoziiert.")}</p><p>{t("Eine einzelne Gruppe runder Verkalkungen (historisch auch punktförmig) ohne Voraufnahmen kann nach vollständiger diagnostischer Abklärung und ohne suspekte Zusatzmerkmale als BI-RADS 3 eingestuft werden; erste Kontrolle nach 6 Monaten. Das gilt nicht pauschal für amorphe Verkalkungen.")}</p></RememberNote>
    <p className={caseStyles.biradsCaption}>{t("Einordnung:")}{" "}<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5787219/" target="_blank" rel="noreferrer">{t("BI-RADS 3: Current and Future Use")}</a>.</p>
  </Section>

  <Section {...GERMAN_SECTIONS[3]} title={t(GERMAN_SECTIONS[3].label.de)}>
    <p className={styles.lead}>{t("Neben der Morphologie muss immer beschrieben werden, wie sich die Verkalkungen innerhalb der Brust verteilen.")}</p>
    <div className={caseStyles.morphologyArrow}><span>{t("benigne")}</span><b>{t("suspekt")}</b></div>
    <DescriptorExplorer items={DISTRIBUTION} lang={lang} type="distribution"/>
    <RememberNote label={t("Merke")}><ul className={caseStyles.rememberList}><li><b>{t("Duktales Muster, keine sichere Histologie:")}</b>{" "}{t("Suspekte Mikroverkalkungen in linearer oder segmentaler Verteilung sind häufig mit DCIS assoziiert. Auch ein invasives Karzinom mit intraduktaler Komponente ist möglich.")}</li><li><b>{t("Linear ist nicht automatisch maligne:")}</b>{" "}{t("Grobe, glatte Stäbchen können sekretorisch bedingt sein, etwa bei Duktektasie/Plasmazellmastitis. Feine, irreguläre lineare oder verzweigte Partikel sind dagegen suspekt.")}</li></ul></RememberNote>
  </Section>

  <Section {...GERMAN_SECTIONS[4]} title={t(GERMAN_SECTIONS[4].label.de)}>
    <p className={styles.lead}>{t("Die Gesamtausdehnung beschreibt das gesamte Kalkareal, nicht den Durchmesser eines einzelnen Partikels. Sie gehört in den Befund und in die Planung einer möglichen Gewebeabklärung oder Behandlung.")}</p>
    <p className={caseStyles.biradsCaption}>{t("Metaxa et al. untersuchten 241 biopsierte Befunde mit reinen Verkalkungen. Die beobachtete Assoziation ist kohortenabhängig und ersetzt weder die Morphologiebeurteilung noch ein klinisches Assessment.")}</p>
    <RememberNote label={t("Merke")}><p>{t("In der untersuchten Biopsiekohorte war eine größere Gesamtausdehnung mit Malignität assoziiert. Daraus folgt kein hier belegter, von der Morphologie unabhängiger Effekt und keine individuelle Risikozahl. Die Ausdehnung in Millimetern dokumentieren; sie ist für Befundabgleich und Therapieplanung relevant.")}</p></RememberNote>
  </Section>

  <Section {...GERMAN_SECTIONS[5]} title={t(GERMAN_SECTIONS[5].label.de)}>
    <p className={styles.lead}>{t("Morphologie und Verteilung werden zusammen mit Verlauf, Begleitbefunden und Patientenkontext bewertet. Das folgende historische Forschungsmodell illustriert zwei Deskriptoren; es legt keine klinische Kategorie oder Behandlung fest.")}</p>
    <KalkAssessment lang={lang}/>
    <div className={caseStyles.warningSigns}><header><SectionIcon id="warnung"/><div><small>{t("Gezielt beachten")}</small><h3>{t("Warnzeichen auf einen Blick")}</h3></div></header><ul><li><SectionIcon id="morphologie"/><div><b>{t("Suspekte Morphologie")}</b><p>{t("Fein pleomorph oder fein linear/verzweigt; deutliche Form- und Größenheterogenität.")}</p></div></li><li><SectionIcon id="verteilung"/><div><b>{t("Duktale Verteilung")}</b><p>{t("Lineare oder segmentale Anordnung suspekter Partikel.")}</p></div></li><li><SectionIcon id="ausdehnung"/><div><b>{t("Große Ausdehnung")}</b><p>{t("Ein ausgedehntes Kalkareal im Gesamtbefund berücksichtigen.")}</p></div></li><li><SectionIcon id="kontext"/><div><b>{t("Assoziierte Gewebeveränderung")}</b><p>{t("Begleitende Masse oder Architekturstörung.")}</p></div></li></ul></div>
    <div className={`${styles.rule} ${caseStyles.multiParagraph}`}><strong>{t("Stabilität ≠ sicher benign")}</strong><p>{t("DCIS kann langsam wachsen und über Jahre bildmorphologisch unverändert bleiben. Stabilität entkräftet eine suspekte Morphologie daher nicht.")}</p></div>
    <p className={caseStyles.biradsCaption}>{t("Zum natürlichen Verlauf:")}{" "}<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4484537/" target="_blank" rel="noreferrer">{t("Ductal Carcinoma In Situ of the Breast")}</a>.</p>
  </Section>

  <Section {...GERMAN_SECTIONS[6]} title={t(GERMAN_SECTIONS[6].label.de)}>
    <InteractiveTeachingGroups groups={BENIGN_OUTSIDE_GROUPS} resolve={value=>pick(value,lang)} direction={lang==='fa'?'rtl':'ltr'}/>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Hautverkalkungen")}</h3></div>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-mlo.png" alt={t("MLO-Mammographie der rechten Brust mit Hautverkalkungen")} width={340} height={630}/></a><figcaption>{t("Rechts MLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc-detail.png" alt={t("Vergrößerung gruppierter Hautverkalkungen der rechten Brust")} width={335} height={578}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc.png" alt={t("CC-Mammographie der rechten Brust mit posteromedialen Hautverkalkungen")} width={392} height={630}/></a><figcaption>{t("Rechts CC")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Mehrere rundliche, teils zentral aufgehellte Verkalkungen liegen dicht gruppiert und oberflächlich in der posteromedialen Haut nahe der Inframammärfalte.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Ammar Ashraf,")}{" "}<a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 159211 (Vollbild)")}</a>.</p>
    </article>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Vaskuläre Verkalkungen")}</h3></div>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-1.png" alt={t("MLO-Mammographie mit vaskulären Verkalkungen")} width={443} height={539}/></a><figcaption>{t("MLO-Aufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-2.png" alt={t("Zweite MLO-Aufnahme mit vaskulären Verkalkungen")} width={443} height={539}/></a><figcaption>{t("MLO-Aufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Feine, dicht aneinanderliegende lineare Verkalkungen zeichnen den Verlauf mehrerer Gefäße in der Brust ab.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Ayla Al Kabbani,")}{" "}<a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 72331 (Vollbild)")}</a>.</p>
    </article>
    <div className={styles.rule}><strong>{t("Wichtiger vaskulärer Hinweis")}</strong><p>{t("Vaskuläre Verkalkungen sind ein relevanter Marker für ein erhöhtes Risiko kardiovaskulärer Erkrankungen. Daher sollte eine klinische kardiovaskuläre Risikoevaluation erfolgen.")}</p></div>
    <InteractiveTeachingGroups groups={BENIGN_PARENCHYMA_GROUPS} resolve={value=>pick(value,lang)} direction={lang==='fa'?'rtl':'ltr'} renderVisual={item=><BenignCalcificationDiagram type={item.id} label={pick(item.label,lang)}/>}/>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleRim}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Rim calcification")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-rmlo.png" alt={t("Mammographie mit dünner randständiger Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Rechts RMLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-rcc.png" alt={t("CC-Mammographie mit Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Rechts RCC")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-detail.png" alt={t("Detailaufnahme der Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Dünne, glatte, randständige Verkalkung entlang einer rundlichen Läsion – typisch für eine verkalkte Ölzyste beziehungsweise Fettnekrose.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 52694")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleLayering}`}>
      <p className={caseStyles.biradsCaption} dir={lang==='fa'?'rtl':'ltr'}>{pick({"de":"Beschriftung des Schemas: Teetassenmodell → Mammographie. Links: Modell einer Teetasse in Aufsicht und Seitenansicht; von oben rund/unscharf, seitlich setzen sich Teeblätter am Boden als sichelförmige Schicht ab. Rechts: A · CC-Aufsicht, rund/amorph/unscharf; B · echte 90°-Seitaufnahme LM/ML, Sediment am Zystenboden mit Meniskus-/Teetassenzeichen. Die Zeichnung erläutert das Prinzip und ist kein Patientenbild.","en":"Schematic labels: teacup model → mammography. Left: a teacup model in top and side views; round/smudgy from above, while tea leaves settle at the bottom as a crescent-shaped layer from the side. Right: A · CC top view, round/amorphous/smudgy; B · true 90° LM/ML lateral view, sediment at the cyst floor with a meniscus/teacup sign. The drawing explains the principle and is not a patient image.","fa":"برچسب‌های شماتیک: مدل فنجان چای ← ماموگرافی. چپ: مدل فنجان از بالا و کنار؛ از بالا گرد/محو و از کنار برگ‌های چای در کف به‌صورت لایهٔ هلالی ته‌نشین می‌شوند. راست: A · نمای CC از بالا، گرد/آمورف/محو؛ B · نمای لترال واقعی ۹۰ درجه LM/ML، رسوب در کف کیست با علامت منیسک/فنجان. این ترسیم اصل را توضیح می‌دهد و تصویر بیمار نیست."},lang)}</p>
      <header className={caseStyles.caseHeader}><div><small>{t("LEHRMODELL")}</small><h3>{t("Layering: Teacup- oder Meniskuszeichen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="/mamma/mammographie/verkalkungen/layering/layering-schematic.svg" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/layering/layering-schematic.svg" alt={t("Schematische Erklärung des Layering- beziehungsweise Teacup-Zeichens")} width={1200} height={650}/></a><figcaption>{t("Schema: CC versus echte 90°-Seitaufnahme (LM/ML)")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Prinzip:")}</strong>{" "}{t("In CC erscheinen die Sedimente oft rundlich und unscharf. Besonders in einer echten 90°-Seitaufnahme (LM/ML), gelegentlich auch in MLO, wird die schwerkraftabhängige halbmond-/teetassenartige Schichtung am Zystenboden sichtbar. Entscheidend ist der Formwechsel zwischen Projektionen. Der aktuelle Deskriptor lautet „Layering“ (historisch: Milk of Calcium).")}</p>
      <p className={caseStyles.caseCredit}>{t("Quelle zum Layering-Prinzip:")}{" "}<a href="https://jksronline.org/search.php?code=3016JKSR&amp;id=10.3348/jksr.2026.0028&amp;vmode=FULL&amp;where=aview#F6" target="_blank" rel="noreferrer">{t("Kang BJ. J Korean Soc Radiol. 2026;87:437–459, Fig. 6. doi:10.3348/jksr.2026.0028.")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleCoarse}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grobschollige Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-57400/l-mlo.png" alt={t("MLO-Mammographie mit grobscholliger Verkalkung")} width={592} height={768}/></a><figcaption>{t("Links MLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-57400/l-cc.png" alt={t("CC-Mammographie mit grobscholliger Verkalkung")} width={532} height={716}/></a><figcaption>{t("Links CC")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Grobe, unregelmäßig-lobulierte Verkalkung mit teils randständiger Aufhellung in einer umschriebenen Läsion der linken Brust.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Subash Thapa,")}{" "}<a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 57400 (Vollbild)")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleRod}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Large rod-like Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86379/rod-1.png" alt={t("MLO-Aufnahme rechts mit Large-rod-like-Verkalkungen")} width={491} height={720}/></a><figcaption>{t("MLO rechts")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86379/rod-2.png" alt={t("CC-Aufnahme rechts mit Large-rod-like-Verkalkungen")} width={491} height={720}/></a><figcaption>{t("CC rechts")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Grobe, längliche Verkalkungen mit glatten, gut definierten Konturen verlaufen innerhalb eines Milchganges.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Edgar Lorente,")}{" "}<a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 86379")}</a>.</p>
    </article>
  </Section>

  <Section {...GERMAN_SECTIONS[7]} title={t(GERMAN_SECTIONS[7].label.de)}>
    <p className={styles.lead}>{t("Die Mammographie beurteilt den Kalk. Ultraschall und MRT ergänzen die Beurteilung des umgebenden Gewebes und helfen bei der weiteren Abklärung.")}</p>
    <InteractiveTeachingGroups groups={MODALITY_GROUPS} resolve={value=>pick(value,lang)} direction={lang==='fa'?'rtl':'ltr'}/>
    <RememberNote label={t("Merke")}><p>{t("Ein unauffälliger Ultraschall oder eine negative MRT hebt eine mammographisch begründete Biopsieindikation nicht automatisch auf.")}</p></RememberNote>
    <div className={`${caseStyles.mriManagement} ${caseStyles.mriOverview}`}>
      <header><small>{t("Mammographische Kategorie bleibt maßgeblich")}</small><h3>{t("Negative MRT bei mammographischen Kalzifikationen: Was bedeutet das für die Biopsie?")}</h3></header>
      <div className={caseStyles.mriTableScroll}><table><caption>{t("Management bei negativer kontrastverstärkter MRT")}</caption><thead><tr><th scope="col">{t("BI-RADS")}</th><th scope="col">{t("Malignitätsrisiko vor MRT")}</th><th scope="col">{t("Einordnung")}</th></tr></thead><tbody>
        {['4A','4B','4C','5'].map(category=><tr key={category}><th scope="row"><span className={caseStyles[CALC_CLASS[category]]}>{category}</span></th><td data-label={t("Malignitätsrisiko vor MRT")}>{t(CALC_META[category].risk)}</td><td>{t("Biopsieindikation bleibt bei bestätigter mammographischer BI-RADS-Kategorie 4 oder 5 bestehen; eine negative MRT hebt sie nicht automatisch auf.")}</td></tr>)}
      </tbody></table></div>
      <p className={caseStyles.biradsCaption}>{t("Fueger2021 modellierte bei reinem Mikrokalk ohne Begleitbefund eine mögliche Risikoreduktion nach negativer MRT. Die 22-%-Prätestschwelle ist ein Modellergebnis und keine Grenze zwischen 4A und 4B. Die Autoren schlugen für ausgewählte Fälle 6–12 Monate Überwachung vor; das ist kein prospektiv validiertes Biopsieersatz-Protokoll. Eine belastbare gepoolte Regel für 4A/4B/4C wurde nicht gezeigt. Bei bestätigter Kategorie 4/5 bleibt Gewebediagnostik Standard.")}</p>
      <p className={caseStyles.biradsCaption}>{t("Quellen:")}{" "}<a href="https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf" target="_blank" rel="noreferrer">{t("ACR: Kategorien und Management")}</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7907894/" target="_blank" rel="noreferrer">{t("Fueger et al., The Breast 2021 – Metaanalyse zur ergänzenden MRT")}</a>.</p>
    </div>
  </Section>

  <Section {...GERMAN_SECTIONS[8]} title={t(GERMAN_SECTIONS[8].label.de)}>
    <TakeHomeList items={[
      {title:pick(L("Systematisch beurteilen","Assess systematically","ارزیابی سیستماتیک"),lang),detail:t("Vier Merkmale systematisch beurteilen: Partikelgröße, Morphologie, Verteilung und Gesamtausdehnung. Die Größe allein beweist weder Benignität noch Malignität.")},
      {title:pick(L("Kalkdetails erkennen","Identify calcification details","تشخیص جزئیات کلسیفیکاسیون"),lang),detail:t("2D-Vergrößerungsaufnahmen zeigen die Kalkdetails; DBT ergänzt den räumlichen Kontext. Typisch benigne Muster wie Coarse (klassisch popcornartig), Rim, sekretorische Stäbchen und Layering sicher erkennen.")},
      {title:pick(L("Morphologie × Verteilung","Morphology × distribution","مورفولوژی × توزیع"),lang),detail:t("Morphologie und Verteilung gemeinsam bewerten: Fein pleomorpher oder fein linearer/verzweigter Kalk in linearer oder segmentaler Anordnung ist besonders suspekt.")},
      {title:pick(L("Stabilität","Stability","پایداری"),lang),detail:t("Auch langfristige Stabilität schließt DCIS bei suspekter Morphologie nicht aus.")},
      {title:pick(L("Duktaler Prozess","Ductal process","فرایند مجرایی"),lang),detail:t("Suspekter Mikrokalk kann DCIS oder ein invasives Karzinom mit intraduktaler Komponente begleiten. Das Bild beweist keine bestimmte Histologie.")},
      {title:pick(L("Ultraschall & MRT","Ultrasound & MRI","سونوگرافی و MRI"),lang),detail:t("Ultraschall hilft bei Korrelatsuche und Biopsieplanung; MRT ergänzt Gewebe- und Ausdehnungsbeurteilung. Eine negative MRT schließt DCIS nicht vollständig aus.")},
      {title:pick(L("Individuelle Entscheidung","Individual decision","تصمیم‌گیری فردی"),lang),detail:t("Bei bestätigter mammographischer Kategorie 4 oder 5 bleibt Gewebediagnostik Standard. MRT-gestützter Biopsieverzicht ist eine begrenzte Forschungsfrage; negative MRT allein verordnet keine Herabstufung oder Verlaufskontrolle.")},
    ]}/>
  </Section>
</>}

export default function Page(){
  const{lang}=useLanguage()
  const tx=value=>pick(value,lang)
  const withLang=href=>lang==='de'?href:`${href}${href.includes('?')?'&':'?'}lang=${lang}`
  const lessonSections=useMemo(()=>GERMAN_SECTIONS.map((section,index)=>({
    ...section,
    label:translateLesson(section.label.de,lang),
    icon:section.id,
    emphasis:index===GERMAN_SECTIONS.length-1,
  })),[lang])
  const labels=useMemo(()=>({
    contents:tx(COPY.contents),
    path:tx(TEMPLATE_COPY.path),
    close:tx(TEMPLATE_COPY.close),
    progress:tx(TEMPLATE_COPY.progress),
    continue:tx(TEMPLATE_COPY.continue),
    completeLesson:tx(TEMPLATE_COPY.completeLesson),
    lessonCompleted:tx(TEMPLATE_COPY.lessonCompleted),
    complete:tx(TEMPLATE_COPY.complete),
    completed:tx(TEMPLATE_COPY.completed),
    open:tx(TEMPLATE_COPY.open),
    takeHome:tx(TEMPLATE_COPY.takeHome),
  }),[lang])
  const breadcrumbs=[
    {label:'RadYar',href:withLang('/')},
    {label:tx(COPY.mamma),href:withLang('/lernen/mamma')},
    {label:tx(COPY.mammography)},
    {label:tx(COPY.title)},
  ]
  const actions={
    mcq:{label:tx(TEMPLATE_COPY.mcq),href:withLang(`/ueben/quiz?fach=mamma&n=10&themen=${ID}&from=${encodeURIComponent(withLang(PATH))}`),trailingIcon:'arrow'},
    flashcards:{label:tx(COPY.flashcards),href:withLang(`/flashcards/${ID}?from=${encodeURIComponent(withLang(PATH))}`)},
  }
  const references=REFERENCES.map(reference=>({
    ...reference,
    tag:pick(reference.tag,lang),
    scope:pick(reference.scope,lang),
  }))

  return <StandardLessonShell
    lessonId={ID}
    lang={lang}
    title={tx(COPY.title)}
    author="Dr. Zia"
    breadcrumbs={breadcrumbs}
    sections={lessonSections}
    labels={labels}
    actions={actions}
    renderIcon={id=><SectionIcon id={id}/>}
    theme={{
      backgroundImage:'/andarun-galaxy-v3.png',
      heroImage:'/mamma/mammographie/verkalkungen/verkalkungen-hero-v4.png',
      heroImageOpacity:.9,
      accent:'#e45a88',
      accentStrong:'#7a2348',
      accentSoft:'#f4dce6',
      secondary:'#73c5cf',
      secondaryStrong:'#257985',
      heroBase:'#0c0b13',
    }}
    className={lang==='fa'?styles.rtl:''}
    sources={<LessonSources
      title={pick(L('Quellen','Sources','منابع'),lang)}
      items={references}
      note={pick(L('Redaktion und Quellen aktualisiert: 25. Oktober 2026 · Fachliche Freigabe durch Dr. Zia ausstehend.','Editorial and source update: 25 October 2026 · Clinical approval by Dr. Zia pending.','به‌روزرسانی تحریری و منابع: ۲۵ اکتبر ۲۰۲۶ · تأیید علمی Dr. Zia در انتظار است.'),lang)}
    />}
  >
    <LessonContent lang={lang}/>
  </StandardLessonShell>
}
