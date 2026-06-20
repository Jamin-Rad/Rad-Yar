// ── RADYAR QUESTION BANK ────────────────────────────────────────────────────

import { CONTRAST_QUESTIONS, CONTRAST_TOPICS } from './contrastMedia'
import { STROKE_QUESTIONS } from './stroke'
import { ICB_QUESTIONS } from './icb'
import { HIE_QUESTIONS } from './hie'
import { SAB_QUESTIONS } from './sab'
import { EDH_QUESTIONS } from './edh'
import { DISSECTION_QUESTIONS } from './dissection'
import { SDH_QUESTIONS } from './sdh'
import { MOYAMOYA_QUESTIONS } from './moyamoya'
import { HMA_QUESTIONS } from './hypertensive-mikroangiopathie'
import { CAA_QUESTIONS } from './caa'
import { CADASIL_QUESTIONS } from './cadasil'
import { DVA_QUESTIONS } from './dva'
import { KAVERNOM_QUESTIONS } from './kavernom'
import { NPH_QUESTIONS } from './normaldruckhydrozephalus'
import { TELEANGIEKTASIE_QUESTIONS } from './kapillaere-teleangiektasie'
import { SVT_QUESTIONS } from './sinusvenenthrombose'
import { DAVF_QUESTIONS } from './davf'
import { AVM_QUESTIONS } from './avm'
import { FRAKTUR_QUESTIONS } from './frakturbeschreibung'
import { FRAKTUR_KINDER_QUESTIONS } from './frakturen-kindesalter'
import { AK_LUXATION_QUESTIONS } from './ak-luxation'
import { RADIUSKOPF_QUESTIONS } from './radiuskopf'

const DIVERTICULITIS_QUESTION_CONTENT = [
  {
    id: 'definition',
    question: {
      de: 'Welche Aussage trennt Divertikulose und Divertikulitis korrekt?',
      en: 'Which statement correctly distinguishes diverticulosis from diverticulitis?',
      fa: 'کدام عبارت دیورتیکولوز را به‌درستی از دیورتیکولیت متمایز می‌کند؟',
    },
    options: [
      { id: 'A', text: { de: 'Divertikulose bezeichnet Divertikel ohne Entzündungsreaktion.', en: 'Diverticulosis means diverticula without inflammatory change.', fa: 'دیورتیکولوز به معنای وجود دیورتیکول بدون واکنش التهابی است.' } },
      { id: 'B', text: { de: 'Divertikulose setzt immer einen perikolischen Abszess voraus.', en: 'Diverticulosis always requires a pericolic abscess.', fa: 'دیورتیکولوز همیشه به آبسه پریکولیک نیاز دارد.' } },
      { id: 'C', text: { de: 'Divertikulitis ist ein rein intraluminaler Befund.', en: 'Diverticulitis is a purely intraluminal finding.', fa: 'دیورتیکولیت صرفاً یک یافته داخل‌لومنی است.' } },
      { id: 'D', text: { de: 'Beide Begriffe sind synonym.', en: 'The two terms are synonymous.', fa: 'این دو اصطلاح مترادف هستند.' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Divertikulose beschreibt Divertikel ohne entzündliche Begleitreaktion. Erst die Entzündung eines Divertikels mit Darmwand- und Fettgewebsreaktion entspricht einer Divertikulitis.',
      en: 'Diverticulosis describes diverticula without surrounding inflammation. Diverticulitis requires inflammation involving a diverticulum, the bowel wall and adjacent fat.',
      fa: 'دیورتیکولوز وجود دیورتیکول بدون التهاب اطراف است. دیورتیکولیت نیازمند التهاب دیورتیکول، دیواره روده و چربی مجاور است.',
    },
  },
  {
    id: 'ct-triad',
    question: {
      de: 'Welche CT-Befundkombination ist für eine akute Sigmadivertikulitis am typischsten?',
      en: 'Which combination of CT findings is most typical of acute sigmoid diverticulitis?',
      fa: 'کدام ترکیب یافته‌های CT برای دیورتیکولیت حاد سیگموئید تیپیک‌تر است؟',
    },
    options: [
      { id: 'A', text: { de: 'Divertikel, segmentale Wandverdickung und perikolisches Fettgewebsstranding', en: 'Diverticula, segmental wall thickening and pericolic fat stranding', fa: 'دیورتیکول، ضخیم‌شدگی سگمنتال دیواره و التهاب چربی پریکولیک' } },
      { id: 'B', text: { de: 'Diffuse Dünndarmdilatation ohne Übergang', en: 'Diffuse small-bowel dilatation without a transition point', fa: 'اتساع منتشر روده باریک بدون نقطه گذار' } },
      { id: 'C', text: { de: 'Isolierte freie Flüssigkeit ohne Darmwandbefund', en: 'Isolated free fluid without bowel wall abnormality', fa: 'مایع آزاد منفرد بدون یافته دیواره روده' } },
      { id: 'D', text: { de: 'Homogene Pankreasvergrößerung', en: 'Homogeneous pancreatic enlargement', fa: 'بزرگ‌شدگی همگن پانکراس' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Die typische CT-Trias besteht aus Divertikeln, segmentaler Darmwandverdickung und einer perikolischen Entzündungsreaktion.',
      en: 'The typical CT triad consists of diverticula, segmental bowel wall thickening and pericolic inflammatory change.',
      fa: 'تریاد تیپیک CT شامل دیورتیکول، ضخیم‌شدگی سگمنتال دیواره و واکنش التهابی پریکولیک است.',
    },
  },
  {
    id: 'protocol',
    question: {
      de: 'Welches CT-Protokoll ist bei Verdacht auf akute Divertikulitis in der Regel angemessen?',
      en: 'Which CT protocol is generally appropriate for suspected acute diverticulitis?',
      fa: 'کدام پروتکل CT معمولاً برای شک به دیورتیکولیت حاد مناسب است؟',
    },
    options: [
      { id: 'A', text: { de: 'Kontrastverstärkte CT in portalvenöser Phase', en: 'Contrast-enhanced CT in the portal venous phase', fa: 'CT با کنتراست در فاز پورتال‌ونوس' } },
      { id: 'B', text: { de: 'Nur arterielle CT-Angiografie', en: 'Arterial CT angiography only', fa: 'فقط CT آنژیوگرافی شریانی' } },
      { id: 'C', text: { de: 'MRT des Beckens ohne T2-Sequenzen', en: 'Pelvic MRI without T2-weighted sequences', fa: 'MRI لگن بدون سکانس T2' } },
      { id: 'D', text: { de: 'Routinemäßig ausschließlich rektales Kontrastmittel', en: 'Routine rectal contrast only', fa: 'به‌طور روتین فقط کنتراست رکتال' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Eine kontrastverstärkte portalvenöse CT erlaubt die Beurteilung von Darmwand, Fettgewebe, Abszess und freier Flüssigkeit. Enterales Kontrastmittel ist routinemäßig meist nicht erforderlich.',
      en: 'Portal venous contrast-enhanced CT assesses the bowel wall, adjacent fat, abscesses and free fluid. Enteric contrast is usually unnecessary.',
      fa: 'CT با کنتراست در فاز پورتال‌ونوس دیواره روده، چربی مجاور، آبسه و مایع آزاد را ارزیابی می‌کند. کنتراست گوارشی معمولاً لازم نیست.',
    },
  },
  {
    id: 'cdd-1b',
    question: {
      de: 'Welcher Befund passt am besten zu CDD Typ 1b?',
      en: 'Which finding best corresponds to CDD type 1b?',
      fa: 'کدام یافته بیشترین تطابق را با CDD نوع 1b دارد؟',
    },
    options: [
      { id: 'A', text: { de: 'Phlegmonöse perikolische Reaktion ohne Abszess', en: 'Phlegmonous pericolic inflammation without abscess', fa: 'التهاب فلگمونوس پریکولیک بدون آبسه' } },
      { id: 'B', text: { de: 'Makroabszess über 3 cm', en: 'Macroabscess larger than 3 cm', fa: 'ماکروآبسه بزرگ‌تر از ۳ سانتی‌متر' } },
      { id: 'C', text: { de: 'Freie Perforation mit Peritonitis', en: 'Free perforation with peritonitis', fa: 'پرفوراسیون آزاد با پریتونیت' } },
      { id: 'D', text: { de: 'Asymptomatische Divertikulose', en: 'Asymptomatic diverticulosis', fa: 'دیورتیکولوز بدون علامت' } },
    ],
    correct: 'A',
    explanation: {
      de: 'CDD 1b bezeichnet eine akute unkomplizierte Divertikulitis mit phlegmonöser Umgebungsreaktion, aber ohne Abszess.',
      en: 'CDD 1b is acute uncomplicated diverticulitis with phlegmonous surrounding inflammation but no abscess.',
      fa: 'CDD نوع 1b دیورتیکولیت حاد بدون عارضه با التهاب فلگمونوس اطراف، اما بدون آبسه است.',
    },
  },
  {
    id: 'cdd-2a',
    question: {
      de: 'Eine 2 cm große perikolische Kollektion bei Sigmadivertikulitis entspricht welchem CDD-Typ?',
      en: 'A 2 cm pericolic collection in sigmoid diverticulitis corresponds to which CDD type?',
      fa: 'یک تجمع پریکولیک ۲ سانتی‌متری در دیورتیکولیت سیگموئید با کدام نوع CDD مطابقت دارد؟',
    },
    options: [
      { id: 'A', text: { de: 'CDD 1a', en: 'CDD 1a', fa: 'CDD 1a' } },
      { id: 'B', text: { de: 'CDD 2a', en: 'CDD 2a', fa: 'CDD 2a' } },
      { id: 'C', text: { de: 'CDD 2c', en: 'CDD 2c', fa: 'CDD 2c' } },
      { id: 'D', text: { de: 'CDD 4', en: 'CDD 4', fa: 'CDD 4' } },
    ],
    correct: 'B',
    explanation: {
      de: 'Ein Mikroabszess beziehungsweise eine gedeckte Perforation mit einer Kollektion bis 3 cm entspricht CDD Typ 2a.',
      en: 'A microabscess or contained perforation with a collection up to 3 cm corresponds to CDD type 2a.',
      fa: 'میکروآبسه یا پرفوراسیون مهارشده با تجمع تا ۳ سانتی‌متر مطابق CDD نوع 2a است.',
    },
  },
  {
    id: 'macroabscess',
    question: {
      de: 'Ab welcher Abszessgröße wird in der CDD-Klassifikation von einem Makroabszess gesprochen?',
      en: 'At what abscess size does the CDD classification define a macroabscess?',
      fa: 'در طبقه‌بندی CDD از چه اندازه‌ای آبسه ماکروآبسه محسوب می‌شود؟',
    },
    options: [
      { id: 'A', text: { de: '> 1 cm', en: '> 1 cm', fa: 'بیش از ۱ سانتی‌متر' } },
      { id: 'B', text: { de: '> 2 cm', en: '> 2 cm', fa: 'بیش از ۲ سانتی‌متر' } },
      { id: 'C', text: { de: '> 3 cm', en: '> 3 cm', fa: 'بیش از ۳ سانتی‌متر' } },
      { id: 'D', text: { de: '> 10 cm', en: '> 10 cm', fa: 'بیش از ۱۰ سانتی‌متر' } },
    ],
    correct: 'C',
    explanation: {
      de: 'CDD Typ 2b bezeichnet einen Makroabszess über 3 cm. Die Abszessgröße sollte im Befund in drei Dimensionen angegeben werden.',
      en: 'CDD type 2b denotes a macroabscess larger than 3 cm. Report abscess size in three dimensions.',
      fa: 'CDD نوع 2b ماکروآبسه بزرگ‌تر از ۳ سانتی‌متر است. اندازه آبسه باید در سه بعد گزارش شود.',
    },
  },
  {
    id: 'fistula',
    question: {
      de: 'Welcher CT-Befund spricht bei Divertikulitis besonders für eine kolovesikale Fistel?',
      en: 'Which CT finding particularly suggests a colovesical fistula in diverticulitis?',
      fa: 'کدام یافته CT در دیورتیکولیت بیشتر به نفع فیستول کولووزیکال است؟',
    },
    options: [
      { id: 'A', text: { de: 'Gas in der Harnblase ohne vorausgegangene Instrumentierung', en: 'Gas in the urinary bladder without prior instrumentation', fa: 'گاز داخل مثانه بدون ابزارگذاری قبلی' } },
      { id: 'B', text: { de: 'Isolierte Milzvergrößerung', en: 'Isolated splenomegaly', fa: 'اسپلنومگالی منفرد' } },
      { id: 'C', text: { de: 'Gallenblasenstein', en: 'Gallstone', fa: 'سنگ کیسه صفرا' } },
      { id: 'D', text: { de: 'Basaler Pleuraerguss', en: 'Basal pleural effusion', fa: 'افیوژن پلورال قاعده‌ای' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Intravesikales Gas ohne Katheterisierung zusammen mit entzündlichem Kontakt zwischen Sigma und Blase ist ein klassischer Hinweis auf eine kolovesikale Fistel.',
      en: 'Intravesical gas without catheterisation, together with inflammatory contact between sigmoid colon and bladder, is a classic clue to a colovesical fistula.',
      fa: 'گاز داخل مثانه بدون کاتتریزاسیون همراه با تماس التهابی سیگموئید و مثانه نشانه کلاسیک فیستول کولووزیکال است.',
    },
  },
  {
    id: 'free-perforation',
    question: {
      de: 'Welche Konstellation spricht für eine freie Perforation?',
      en: 'Which combination suggests free perforation?',
      fa: 'کدام ترکیب به نفع پرفوراسیون آزاد است؟',
    },
    options: [
      { id: 'A', text: { de: 'Freie intraperitoneale Luft und Flüssigkeit mit Peritonitiszeichen', en: 'Free intraperitoneal gas and fluid with signs of peritonitis', fa: 'گاز و مایع آزاد داخل صفاقی همراه علائم پریتونیت' } },
      { id: 'B', text: { de: 'Ein einzelnes Divertikel ohne Entzündung', en: 'A single diverticulum without inflammation', fa: 'یک دیورتیکول بدون التهاب' } },
      { id: 'C', text: { de: 'Nur diskretes perikolisches Stranding', en: 'Mild pericolic stranding only', fa: 'فقط التهاب خفیف پریکولیک' } },
      { id: 'D', text: { de: 'Isolierte Wandverdickung ohne Umgebungsreaktion', en: 'Isolated wall thickening without surrounding reaction', fa: 'ضخیم‌شدگی منفرد دیواره بدون واکنش اطراف' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Freie Luft und Flüssigkeit mit Peritonitiszeichen entsprechen einer freien Perforation und damit CDD Typ 2c.',
      en: 'Free gas and fluid with signs of peritonitis indicate free perforation and CDD type 2c.',
      fa: 'گاز و مایع آزاد همراه علائم پریتونیت نشان‌دهنده پرفوراسیون آزاد و CDD نوع 2c است.',
    },
  },
  {
    id: 'cancer-differential',
    question: {
      de: 'Welcher Befund sollte bei vermeintlicher Divertikulitis besonders an ein kolorektales Karzinom denken lassen?',
      en: 'Which finding should particularly raise concern for colorectal cancer in presumed diverticulitis?',
      fa: 'کدام یافته در دیورتیکولیت فرضی باید بیشتر شک به سرطان کولورکتال ایجاد کند؟',
    },
    options: [
      { id: 'A', text: { de: 'Kurze asymmetrische Wandverdickung mit suspekten Lymphknoten', en: 'Short asymmetric wall thickening with suspicious lymph nodes', fa: 'ضخیم‌شدگی کوتاه و نامتقارن دیواره همراه لنف‌نودهای مشکوک' } },
      { id: 'B', text: { de: 'Ausgeprägtes Stranding um ein sichtbares entzündetes Divertikel', en: 'Marked stranding centred on a visible inflamed diverticulum', fa: 'التهاب شدید اطراف یک دیورتیکول ملتهب قابل مشاهده' } },
      { id: 'C', text: { de: 'Mehrere reizlose Divertikel', en: 'Multiple non-inflamed diverticula', fa: 'چندین دیورتیکول بدون التهاب' } },
      { id: 'D', text: { de: 'Kleine Menge reaktiver Beckenflüssigkeit', en: 'A small amount of reactive pelvic fluid', fa: 'مقدار کمی مایع واکنشی لگن' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Eine kurze asymmetrische oder irreguläre Stenose und suspekte Lymphknoten sind für eine unkomplizierte Divertikulitis atypisch und verlangen eine onkologische Differenzialdiagnose.',
      en: 'A short asymmetric or irregular stenosis and suspicious lymph nodes are atypical for uncomplicated diverticulitis and require an oncological differential.',
      fa: 'تنگی کوتاه نامتقارن یا نامنظم و لنف‌نودهای مشکوک برای دیورتیکولیت بدون عارضه آتیپیک‌اند و نیاز به افتراق انکولوژیک دارند.',
    },
  },
  {
    id: 'reporting',
    question: {
      de: 'Welche Angabe darf im CT-Befund einer abszedierenden Divertikulitis nicht fehlen?',
      en: 'Which detail must be included in the CT report of diverticulitis with an abscess?',
      fa: 'کدام مورد نباید در گزارش CT دیورتیکولیت همراه آبسه فراموش شود؟',
    },
    options: [
      { id: 'A', text: { de: 'Abszessgröße in drei Dimensionen und Lokalisation', en: 'Abscess size in three dimensions and location', fa: 'اندازه آبسه در سه بعد و محل آن' } },
      { id: 'B', text: { de: 'Nur die Milzlänge', en: 'Splenic length only', fa: 'فقط طول طحال' } },
      { id: 'C', text: { de: 'Ausschließlich die Dosislänge', en: 'Dose-length product only', fa: 'فقط محصول طول دوز' } },
      { id: 'D', text: { de: 'Nur die Anzahl aller Kolondivertikel', en: 'Only the total number of colonic diverticula', fa: 'فقط تعداد کل دیورتیکول‌های کولون' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Größe, Lokalisation und Zugänglichkeit einer Kollektion sind managementrelevant. Zusätzlich müssen freie Luft, Fistel, Stenose und freie Flüssigkeit beurteilt werden.',
      en: 'Collection size, location and accessibility affect management. Free gas, fistula, stenosis and free fluid must also be assessed.',
      fa: 'اندازه، محل و قابلیت دسترسی تجمع بر درمان اثر دارد. گاز آزاد، فیستول، تنگی و مایع آزاد نیز باید ارزیابی شوند.',
    },
  },
]

const DIVERTICULITIS_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    DIVERTICULITIS_QUESTION_CONTENT.map(item => ({
      id: `divertikulitis-${lang}-${item.id}`,
      tags: ['divertikulitis', 'kolon', 'abdomen'],
      fach: 'abdomen',
      question: item.question[lang],
      options: item.options.map(option => ({ id: option.id, text: option.text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

const MIDLINE_CAVA_QUESTION_CONTENT = [
  {
    id: 'flow',
    question: {
      de: 'Welche Reihenfolge beschreibt den physiologischen Liquorfluss korrekt?',
      en: 'Which sequence correctly describes physiological CSF flow?',
      fa: 'کدام ترتیب، مسیر طبیعی جریان CSF را به‌درستی نشان می‌دهد؟',
    },
    options: [
      { id: 'A', text: { de: 'Seitenventrikel → Foramina Monroi → 3. Ventrikel → Aquädukt → 4. Ventrikel → Magendie/Luschka', en: 'Lateral ventricles → foramina of Monro → third ventricle → aqueduct → fourth ventricle → Magendie/Luschka', fa: 'بطن‌های جانبی ← سوراخ‌های مونرو ← بطن سوم ← مجرای مغزی ← بطن چهارم ← ماژندی/لوشکا' } },
      { id: 'B', text: { de: 'Seitenventrikel → Aquädukt → 3. Ventrikel → Foramen Monroi → 4. Ventrikel', en: 'Lateral ventricles → aqueduct → third ventricle → foramen of Monro → fourth ventricle', fa: 'بطن‌های جانبی ← مجرای مغزی ← بطن سوم ← سوراخ مونرو ← بطن چهارم' } },
      { id: 'C', text: { de: '3. Ventrikel → Foramina Luschkae → Seitenventrikel → Aquädukt', en: 'Third ventricle → foramina of Luschka → lateral ventricles → aqueduct', fa: 'بطن سوم ← سوراخ‌های لوشکا ← بطن‌های جانبی ← مجرای مغزی' } },
      { id: 'D', text: { de: '4. Ventrikel → Foramina Monroi → 3. Ventrikel → Arachnoidalgranulationen', en: 'Fourth ventricle → foramina of Monro → third ventricle → arachnoid granulations', fa: 'بطن چهارم ← سوراخ‌های مونرو ← بطن سوم ← گرانولاسیون‌های آراکنوئید' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Liquor fließt aus den Seitenventrikeln über die Foramina Monroi in den 3. Ventrikel, durch den Aquädukt in den 4. Ventrikel und anschließend über Magendie und Luschka in den Subarachnoidalraum.',
      en: 'CSF flows from the lateral ventricles through the foramina of Monro into the third ventricle, through the aqueduct into the fourth ventricle, then through Magendie and Luschka into the subarachnoid space.',
      fa: 'CSF از بطن‌های جانبی از طریق سوراخ‌های مونرو وارد بطن سوم می‌شود، سپس از مجرای مغزی به بطن چهارم و از سوراخ‌های ماژندی و لوشکا به فضای ساب‌آراکنوئید می‌رسد.',
    },
  },
  {
    id: 'aqueduct',
    question: {
      de: 'Welche Ventrikelkonfiguration spricht am ehesten für eine Aquäduktstenose?',
      en: 'Which ventricular configuration most strongly suggests aqueduct stenosis?',
      fa: 'کدام الگوی بطنی بیش از همه به نفع تنگی مجرای مغزی است؟',
    },
    options: [
      { id: 'A', text: { de: 'Nur der rechte Seitenventrikel ist erweitert.', en: 'Only the right lateral ventricle is enlarged.', fa: 'فقط بطن جانبی راست متسع است.' } },
      { id: 'B', text: { de: 'Seitenventrikel und 3. Ventrikel sind erweitert, der 4. Ventrikel ist normal weit.', en: 'The lateral and third ventricles are enlarged while the fourth ventricle remains normal.', fa: 'بطن‌های جانبی و سوم متسع‌اند ولی بطن چهارم اندازه طبیعی دارد.' } },
      { id: 'C', text: { de: 'Nur der 4. Ventrikel ist erweitert.', en: 'Only the fourth ventricle is enlarged.', fa: 'فقط بطن چهارم متسع است.' } },
      { id: 'D', text: { de: 'Alle Ventrikel und kortikalen Sulci sind proportional erweitert.', en: 'All ventricles and cortical sulci are proportionally enlarged.', fa: 'همه بطن‌ها و شیارهای کورتیکال به‌طور متناسب گشاد شده‌اند.' } },
    ],
    correct: 'B',
    explanation: {
      de: 'Bei einer Aquäduktstenose staut sich Liquor proximal der Obstruktion: Seitenventrikel und 3. Ventrikel erweitern sich, während der distal gelegene 4. Ventrikel normal bleibt.',
      en: 'Aqueduct stenosis causes upstream CSF obstruction: the lateral and third ventricles enlarge while the downstream fourth ventricle remains normal.',
      fa: 'در تنگی مجرای مغزی، CSF در بخش پروگزیمال جمع می‌شود؛ بنابراین بطن‌های جانبی و سوم متسع می‌شوند ولی بطن چهارم که دیستال انسداد است طبیعی می‌ماند.',
    },
  },
  {
    id: 'hydrocephalus-atrophy',
    question: {
      de: 'Welche Befundkombination spricht eher für einen aktiven Hydrozephalus als für eine Ex-vacuo-Erweiterung bei Atrophie?',
      en: 'Which combination favours active hydrocephalus over ex-vacuo ventricular enlargement due to atrophy?',
      fa: 'کدام ترکیب یافته بیشتر به نفع هیدروسفالی فعال است تا اتساع ex vacuo ناشی از آتروفی؟',
    },
    options: [
      { id: 'A', text: { de: 'Proportional erweiterte Ventrikel und kortikale Sulci ohne Verlaufänderung', en: 'Proportionally enlarged ventricles and cortical sulci without interval change', fa: 'اتساع متناسب بطن‌ها و شیارهای کورتیکال بدون تغییر در پیگیری' } },
      { id: 'B', text: { de: 'Erweiterte Temporalhörner, enge Sulci und transependymaler Liquorübertritt', en: 'Enlarged temporal horns, tight sulci and transependymal CSF flow', fa: 'اتساع شاخ‌های تمپورال، تنگی شیارها و جریان ترانس‌اپاندیمال CSF' } },
      { id: 'C', text: { de: 'Breite kortikale Sulci bei ausgeprägtem globalem Volumenverlust', en: 'Wide cortical sulci with marked global volume loss', fa: 'شیارهای کورتیکال گشاد همراه کاهش واضح حجم کلی مغز' } },
      { id: 'D', text: { de: 'Isoliertes persistierendes Cavum septi pellucidi', en: 'An isolated persistent cavum septi pellucidi', fa: 'کاووم سپتی پلوسیدی پایدار و منفرد' } },
    ],
    correct: 'B',
    explanation: {
      de: 'Disproportionale Ventrikelerweiterung, frühe Temporalhorndilatation, Sulcuseffacement und transependymaler Liquorübertritt sprechen für erhöhten intraventrikulären Druck. Bei Atrophie sind Ventrikel und Sulci eher proportional erweitert.',
      en: 'Disproportionate ventricular enlargement, early temporal-horn dilatation, sulcal effacement and transependymal flow favour raised intraventricular pressure. Atrophy tends to enlarge ventricles and sulci proportionally.',
      fa: 'اتساع نامتناسب بطن‌ها، گشادشدن زودرس شاخ‌های تمپورال، محو شدن شیارها و جریان ترانس‌اپاندیمال به نفع افزایش فشار داخل بطنی است. در آتروفی، بطن‌ها و شیارها معمولاً متناسب گشاد می‌شوند.',
    },
  },
]

const MIDLINE_CAVA_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    MIDLINE_CAVA_QUESTION_CONTENT.map(item => ({
      id: `liquorraeume-ventrikelsystem-${lang}-${item.id}`,
      tags: ['liquorraeume-ventrikelsystem', 'cavum', 'gehirn'],
      fach: 'gehirn',
      question: item.question[lang],
      options: item.options.map(option => ({ id: option.id, text: option.text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

export const QUESTION_BANK = {
  "de": [
    ...CONTRAST_QUESTIONS.de,
    ...DIVERTICULITIS_QUESTIONS.de,
    ...STROKE_QUESTIONS.de,
    ...ICB_QUESTIONS.de,
    ...HIE_QUESTIONS.de,
    ...SAB_QUESTIONS('de'),
    ...EDH_QUESTIONS.de,
    ...MIDLINE_CAVA_QUESTIONS.de,
    ...SDH_QUESTIONS.de,
    ...DISSECTION_QUESTIONS.de,
    ...MOYAMOYA_QUESTIONS.de,
    ...HMA_QUESTIONS.de,
    ...CAA_QUESTIONS.de,
    ...CADASIL_QUESTIONS.de,
    ...DVA_QUESTIONS.de,
    ...KAVERNOM_QUESTIONS.de,
    ...NPH_QUESTIONS.de,
    ...TELEANGIEKTASIE_QUESTIONS.de,
    ...SVT_QUESTIONS.de,
    ...FRAKTUR_QUESTIONS.de,
    ...DAVF_QUESTIONS.de,
    ...AVM_QUESTIONS.de,
    ...FRAKTUR_KINDER_QUESTIONS.de,
    ...AK_LUXATION_QUESTIONS.de,
    ...RADIUSKOPF_QUESTIONS.de,
    {
      "id": "meniskus-de-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Warum ist der Innenmeniskus (Meniscus medialis) im Vergleich zum Außenmeniskus signifikant häufiger von traumatischen Rissen betroffen?",
      "options": [
        {
          "id": "A",
          "text": "Er ist durch seine C-Form anatomisch instabiler geformt."
        },
        {
          "id": "B",
          "text": "Er ist fest mit der Gelenkkapsel und dem medialen Seitenband verwachsen und dadurch weniger beweglich."
        },
        {
          "id": "C",
          "text": "Er besitzt eine rein avaskuläre Versorgung über die gesamte Breite."
        },
        {
          "id": "D",
          "text": "Er artikuliert im Gegensatz zum Außenmeniskus nicht mit den Femurkondylen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die C-Form des Innenmeniskus und die O-Form des Außenmeniskus sind normale anatomische Varianten, die sich an die Form der jeweiligen Tibiaplateaus anpassen. Sie bedingen keine intrinsische mechanische Instabilität des Gewebes.\n\nB ist richtig: Die feste ligamentäre Fixierung des Innenmeniskus an der Gelenkkapsel und dem Innenband (MCL) schränkt seine Mobilität stark ein. Bei plötzlichen Rotations- oder Scherbewegungen kann er – anders als der mobile Außenmeniskus – nicht flexibel ausweichen und reißt deutlich schneller.\n\nC ist falsch: Beide Menisken weisen eine ähnliche vaskuläre Architektur auf. Sie sind in der Peripherie (rote Zone) gut durchblutet und werden nach zentral hin avaskulär. Der Innenmeniskus ist nicht komplett gefäßfrei.\n\nD ist falsch: Beide Menisken artikulieren proximal mit den Femurkondylen und distal mit dem Tibiaplateau, um ihre Hauptfunktion der Kraftübertragung und Stoßdämpfung im Gelenk zu erfüllen."
    },
    {
      "id": "meniskus-de-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Welches Kriterium muss laut der etablierten „Two-slice-touch“-Regel erfüllt sein, um die Diagnose eines Meniskusrisses im MRT mit hoher Spezifität zu sichern?",
      "options": [
        {
          "id": "A",
          "text": "Das Signal muss sowohl die superiore als auch die inferiore Gelenkfläche berühren."
        },
        {
          "id": "B",
          "text": "Die Signalsteigerung muss auf mindestens zwei aufeinanderfolgenden Schichtbildern mit Oberflächenkontakt nachweisbar sein."
        },
        {
          "id": "C",
          "text": "Der Riss muss in zwei unterschiedlichen Sequenzen (z. B. T1w und T2w) sichtbar sein."
        },
        {
          "id": "D",
          "text": "Die Läsion muss eine Ausdehnung von mindestens 3 mm in der Sagittalebene aufweisen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Ein Riss muss nicht die gesamte Höhe des Meniskus durchbauen. Es reicht völlig aus, wenn das pathologische Signal entweder nur die obere (superiore) oder nur die untere (inferiore) Gelenkfläche schneidet.\n\nB ist richtig: Die Regel besagt, dass die intrameniskale Signalsteigerung auf mindestens zwei direkt benachbarten Schnittbildern (Slices) Kontakt zur Oberfläche haben muss. Dies eliminiert das Risiko, ein rein technisches Rauschen oder einen Volumenmitteleffekt auf einer Einzelschicht fälschlicherweise als Riss zu interpretieren.\n\nC ist falsch: Obwohl Risse idealerweise in mehreren Sequenzen und Ebenen (sagittal/koronar) evaluiert werden, bezieht sich die spezifische „Two-slice-touch“-Regel rein auf die Kontinuität über aufeinanderfolgende Schichten derselben Sequenz.\n\nD ist falsch: Die Regel ist unabhängig von einer absoluten Millimeter-Metrik. Sie definiert sich ausschließlich über die Anzahl der betroffenen Schichten, auch wenn die Standard-Schnittdicke im Protokoll meist 3 mm beträgt."
    },
    {
      "id": "meniskus-de-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "In welcher vaskulären Zone zeigt eine Meniskusruptur die besten biologischen Voraussetzungen für eine erfolgreiche Meniskusnaht?",
      "options": [
        {
          "id": "A",
          "text": "Weiße Zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Rot-Weiße Zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Rote Zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniskuswurzel (Root)"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Die weiße Zone bildet das zentral gelegene Drittel des Meniskus. Sie ist komplett avaskulär (gefäßfrei) und wird rein per Diffusion durch die Synovialflüssigkeit ernährt. Eine Naht bleibt hier aufgrund fehlender Heilungspotenz fast immer erfolglos.\n\nB ist falsch: Die rot-weiße Zone ist ein Übergangsbereich (ca. 3–5 mm von der Kapsel entfernt). Hier liegt nur noch eine sehr eingeschränkte, kapillare Blutversorgung vor, weshalb die Heilungstendenz nach einer Naht unsicher ist.\n\nC ist richtig: Die rote Zone (Zone I) umfasst den kapsennahen Außenrand (<3 mm). Sie wird direkt über den perimeniskalen Plexus reichlich mit Blut versorgt. Die biologischen Voraussetzungen für die Einwanderung von Fibroblasten und die Gewebeheilung sind hier optimal, was eine Refixation (Naht) begünstigt.\n\nD ist falsch: Die Meniskuswurzeln (Roots) stellen die ligamentäre Verankerung der Meniskushörner am Tibiaplateau dar. Sie beschreiben keine vaskuläre Zone des funktionellen Meniskuskörpers."
    },
    {
      "id": "meniskus-de-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Welche MRT-Sequenz eignet sich laut Protokoll am besten für den definitiven Nachweis von akuten Meniskusrissen, begleitenden Knochenödemen und Kontinuitätsunterbrechungen der Bänder?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-Wichtung ohne Fettsättigung."
        },
        {
          "id": "B",
          "text": "T2-gewichtete oder PD-fettgesättigte (fs) Sequenzen."
        },
        {
          "id": "C",
          "text": "3D-Gradienechosequenzen mit einer Schichtdicke von 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-gewichtete Phasenkontrast-Angiographie."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die native T1-Wichtung bietet zwar eine exzellente anatomische Übersicht und zeigt chronische Fibrosen gut an, ist jedoch nicht flüssigkeitssensitiv. Akuter Riss-induzierter Flüssigkeitseinstrom oder Knochenmarködeme lassen sich darin kaum differenzieren.\n\nB ist richtig: T2-w oder PD-fs (Protonendichte mit Fettsättigung) Sequenzen sind extrem sensitiv für freies Wasser. Da pathologische Veränderungen wie ein Rissspalt (gefüllt mit Synovialflüssigkeit) oder Ödeme viel Wasser enthalten, leuchten sie hyperintens (hell) vor dem unterdrückten, dunklen Hintergrundgewebe auf.\n\nC ist falsch: Eine Schichtdicke von 6 mm ist für die Kniebinnendiagnostik deutlich zu grob. Kleine Risse würden durch den Volumenmitteleffekt komplett maskiert. Der Standard liegt bei maximal 3 mm Schnittdicke.\n\nD ist falsch: Die Phasenkontrast-Angiographie dient der funktionellen Darstellung von Blutströmen in Gefäßen. Für die Beurteilung der statischen, fibrocartilaginären Gewebestrukturen des Kniegelenks ist sie ungeeignet."
    },
    {
      "id": "meniskus-de-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Wie unterscheidet sich die Verteilung von Rissen im Hinterhorn des Außenmeniskus im Vergleich zum Innenmeniskus?",
      "options": [
        {
          "id": "A",
          "text": "Beim Außenmeniskus betreffen praktisch alle Risse das Vorderhorn."
        },
        {
          "id": "B",
          "text": "Beim Außenmeniskus liegen etwa 50 % der Risse im Hinterhorn, während beim Innenmeniskus ca. 98 % das Hinterhorn betreffen."
        },
        {
          "id": "C",
          "text": "Risse im Hinterhorn des Außenmeniskus treten aufgrund der O-Form überhaupt nicht auf."
        },
        {
          "id": "D",
          "text": "Die Verteilung ist bei beiden Menisken absolut identisch."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Das Vorderhorn des Außenmeniskus ist zwar häufiger betroffen als das des Innenmeniskus, macht aber keineswegs die Gesamtheit aller Außenmeniskusrisse aus.\n\nB ist richtig: Das Hinterhorn des Innenmeniskus ist durch seine posteriore Fixierung der mechanische Drehpunkt bei Kniebewegungen und extremen Belastungen ausgesetzt – daher liegen hier nahezu 98 % der Risse. Der Außenmeniskus ist mobiler; bei ihm entfällt nur die Hälfte der Risse auf das Hinterhorn, während der Rest auf das Vorderhorn und den Corpus (Mittelabschnitt) verteilt ist.\n\nC ist falsch: Die geometrische O-Form schützt den Außenmeniskus nicht vor Pathologien. Das Hinterhorn bleibt auch hier mit 50 % der Fälle statistisch die häufigste Lokalisation für Risse.\n\nD ist falsch: Aufgrund der stark unterschiedlichen biomechanischen Fixierungen und Beweglichkeiten weisen Innen- und Außenmeniskus völlig unterschiedliche Verteilungsmuster bei Läsionen auf."
    },
    {
      "id": "meniskus-de-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Ein radiologischer Befund beschreibt ein keilförmiges/globuläres Signal im Meniskusgewebe, das die Gelenkfläche im vorliegenden Schnittbild knapp nicht erreicht. Welchem Subtyp nach Lotysch ist dies zuzuordnen?",
      "options": [
        {
          "id": "A",
          "text": "Grad 2a"
        },
        {
          "id": "B",
          "text": "Grad 2b"
        },
        {
          "id": "C",
          "text": "Grad 2c"
        },
        {
          "id": "D",
          "text": "Grad 3"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Grad 2a ist definiert als ein rein lineares (strichförmiges) Signal im Meniskusinneren, das keinen Kontakt zur superioren oder inferioren Oberfläche aufweist. Es zeigt keine flächige Ausdehnung.\n\nB ist falsch: Grad 2b beschreibt ebenfalls ein lineares Signal, welches jedoch die Gelenkoberfläche auf genau einem einzigen Bild berührt, was den Befund inkonklusiv für einen echten Riss macht.\n\nC ist richtig: Ein keilförmiges, flächiges oder kugelförmiges (globuläres) Signal im Gewebe ohne eindeutigen Oberflächenkontakt entspricht dem Stadium Grad 2c nach Lotysch. Es repräsentiert eine fortgeschrittene mukoide Degeneration mit einem sehr hohen Risiko für das Vorliegen eines okkulten (versteckten) Risses.\n\nD ist falsch: Grad 3 setzt voraus, dass das Signal die Gelenkoberfläche eindeutig und reproduzierbar durchbricht (auf mindestens zwei aufeinanderfolgenden Schichten). Solange kein Oberflächenkontakt vorliegt, darf kein Grad 3 diagnostiziert werden."
    },
    {
      "id": "haemangiom-de-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt ein Leberhämangiom am korrektesten?",
      "options": [
        {
          "id": "A",
          "text": "Kavernöse nicht-neoplastische Malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatische Metastase mit Nekrose"
        },
        {
          "id": "C",
          "text": "Präkanzeröse hepatozelluläre Läsion"
        },
        {
          "id": "D",
          "text": "Bakterieller Leberabszess"
        }
      ],
      "correct": "A",
      "explanation": "Ein Leberhämangiom ist eine kavernöse, nicht-neoplastische vaskuläre Malformation und der häufigste gutartige solide Lebertumor."
    },
    {
      "id": "haemangiom-de-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Sonographiebefund ist typisch für ein kleines Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Scharf begrenzte echoreiche Läsion"
        },
        {
          "id": "B",
          "text": "Unscharfe hypoechogene Läsion mit Kapselretraktion"
        },
        {
          "id": "C",
          "text": "Gasreflexe mit dorsalem Schallschatten"
        },
        {
          "id": "D",
          "text": "Diffuse Wandverdickung der Gallenblase"
        }
      ],
      "correct": "A",
      "explanation": "Typische Hämangiome sind sonographisch meistens echoreich und scharf begrenzt. Bei klassischer Sonomorphologie ist häufig keine weitere Diagnostik notwendig."
    },
    {
      "id": "haemangiom-de-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welches dynamische CT-Muster ist klassisch für ein Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Peripher-noduläre diskontinuierliche KM-Aufnahme mit zentripetaler Auffüllung"
        },
        {
          "id": "B",
          "text": "Arterielles Wash-in mit portalvenösem Wash-out und Kapsel"
        },
        {
          "id": "C",
          "text": "Dünnwandige Läsion ohne KM-Aufnahme"
        },
        {
          "id": "D",
          "text": "Diffuses infiltratives Wachstum entlang der Gallenwege"
        }
      ],
      "correct": "A",
      "explanation": "Klassisch ist eine randständige, noduläre und diskontinuierliche Kontrastmittelaufnahme, die sich in späteren Phasen zentripetal auffüllt."
    },
    {
      "id": "haemangiom-de-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Was beschreibt das Irisblendenphänomen beim Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Auffüllung der Läsion von peripher nach zentral"
        },
        {
          "id": "B",
          "text": "Zentrales Wash-out in der Spätphase"
        },
        {
          "id": "C",
          "text": "Abrupter Perfusionsstopp am Leberhilus"
        },
        {
          "id": "D",
          "text": "Ringförmige Abszesskapsel"
        }
      ],
      "correct": "A",
      "explanation": "Das Irisblendenphänomen beschreibt die zentripetale Kontrastmittelauffüllung vom Rand zur Mitte."
    },
    {
      "id": "haemangiom-de-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher MRT-Befund ist besonders typisch für ein klassisches Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Sehr hohes T2-Signal im Sinne eines Light-bulb-Zeichens"
        },
        {
          "id": "B",
          "text": "Ausgeprägtes T1-hyperintenses Fettareal mit Signalabfall in opposed phase"
        },
        {
          "id": "C",
          "text": "Niedriges T2-Signal wie fibrotisches Gewebe"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrale Diffusionsrestriktion ohne KM-Aufnahme"
        }
      ],
      "correct": "A",
      "explanation": "Das klassische Hämangiom ist in T2 sehr hell, oft sogar heller als Galle. Dieses Light-bulb-Zeichen ist ein wichtiger diagnostischer Hinweis."
    },
    {
      "id": "haemangiom-de-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie ist die DWI/ADC-Konstellation beim typischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "DWI hell, ADC hoch: T2-shine-through"
        },
        {
          "id": "B",
          "text": "DWI hell, ADC niedrig: sichere Restriktion"
        },
        {
          "id": "C",
          "text": "DWI dunkel, ADC nicht messbar"
        },
        {
          "id": "D",
          "text": "DWI und ADC immer unauffällig"
        }
      ],
      "correct": "A",
      "explanation": "Hämangiome können auf hohen b-Werten hyperintens sein. Hohe ADC-Werte zeigen aber T2-shine-through und keine echte Diffusionsrestriktion."
    },
    {
      "id": "haemangiom-de-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie erscheint ein typisches Hämangiom in späteren Kontrastmittelphasen?",
      "options": [
        {
          "id": "A",
          "text": "Zunehmend homogen/isodens durch zentripetale Auffüllung"
        },
        {
          "id": "B",
          "text": "Immer vollständig hypodens ohne Aufnahme"
        },
        {
          "id": "C",
          "text": "Frühes Wash-out mit Pseudokapsel"
        },
        {
          "id": "D",
          "text": "Nur randständig gasgefüllt"
        }
      ],
      "correct": "A",
      "explanation": "In der portalvenösen und späten Phase nimmt die zentripetale Auffüllung zu. Die Läsion nähert sich der Blutbahn bzw. dem Leberparenchym an."
    },
    {
      "id": "haemangiom-de-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Warum können größere Hämangiome inhomogen aussehen?",
      "options": [
        {
          "id": "A",
          "text": "Durch Fibrosierung, Verkalkungen oder Thromben"
        },
        {
          "id": "B",
          "text": "Durch obligate maligne Entartung"
        },
        {
          "id": "C",
          "text": "Durch Luft in den Gallengängen"
        },
        {
          "id": "D",
          "text": "Durch fokale Fettinfiltration der Nierenrinde"
        }
      ],
      "correct": "A",
      "explanation": "Größere Hämangiome können durch interne Fibrosierung, Verkalkungen oder Thromben inhomogen werden. Das macht sie nicht automatisch maligne."
    },
    {
      "id": "haemangiom-de-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage passt eher zu einem atypischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Keine klassische periphere noduläre Aufnahme, ggf. früharteriell homogen starkes Enhancement"
        },
        {
          "id": "B",
          "text": "Immer homogenes Light-bulb-T2 und komplette klassische Zentripetenz"
        },
        {
          "id": "C",
          "text": "Nie Kontrastmittelaufnahme"
        },
        {
          "id": "D",
          "text": "Immer Gasbildung und Flüssigkeitsspiegel"
        }
      ],
      "correct": "A",
      "explanation": "Atypische Hämangiome können die klassische periphere noduläre Aufnahme und zentripetale Auffüllung verlieren und stattdessen früharteriell homogen stark kontrastieren."
    },
    {
      "id": "haemangiom-de-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Befund hilft am meisten gegen die Fehldiagnose „Metastase“ bei einem Hämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Hoher ADC und mehrphasiges zentripetales Fill-in"
        },
        {
          "id": "B",
          "text": "Niedriger ADC und rasches Wash-out"
        },
        {
          "id": "C",
          "text": "Irreguläres infiltratives Wachstum"
        },
        {
          "id": "D",
          "text": "Kapselretraktion mit Gallenwegserweiterung"
        }
      ],
      "correct": "A",
      "explanation": "Hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion. Zusammen mit mehrphasiger zentripetaler Auffüllung stützt dies die Diagnose Hämangiom."
    },
    {
      "id": "fnh-de-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt die fokale noduläre Hyperplasie (FNH) am korrektesten?",
      "options": [
        { "id": "A", "text": "Benigne, regenerative Raumforderung der Leber" },
        { "id": "B", "text": "Maligner primärer Lebertumor mit Metastasierungspotenzial" },
        { "id": "C", "text": "Bakterieller Leberabszess mit zentraler Einschmelzung" },
        { "id": "D", "text": "Zystische Raumforderung mit serösem Inhalt" }
      ],
      "correct": "A",
      "explanation": "Die FNH ist eine benigne, regenerative Raumforderung der Leber, meist asymptomatisch und ohne Therapiebedarf."
    },
    {
      "id": "fnh-de-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage zur Epidemiologie der FNH trifft zu?",
      "options": [
        { "id": "A", "text": "Sie ist die häufigste benigne Leberläsion überhaupt" },
        { "id": "B", "text": "Sie ist nach dem Hämangiom die zweithäufigste benigne Leberläsion und betrifft bevorzugt Frauen" },
        { "id": "C", "text": "Sie tritt überwiegend bei älteren Männern auf" },
        { "id": "D", "text": "Sie ist eine Präkanzerose mit hohem Malignisierungsrisiko" }
      ],
      "correct": "B",
      "explanation": "Nach dem Hämangiom ist die FNH die zweithäufigste gutartige Leberläsion, am ehesten bei jungen bis mittelalten Erwachsenen mit deutlicher Prädominanz bei Frauen."
    },
    {
      "id": "fnh-de-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welcher Doppler-Befund ist typisch für eine FNH?",
      "options": [
        { "id": "A", "text": "Zentrales Gefäß mit radiären Gefäßästen (Spoke-wheel-Muster)" },
        { "id": "B", "text": "Komplette Gefäßfreiheit der Läsion" },
        { "id": "C", "text": "Ausschließlich periphere venöse Gefäße ohne zentrales Gefäß" },
        { "id": "D", "text": "Arteriovenöse Fistel mit Shuntfluss" }
      ],
      "correct": "A",
      "explanation": "Das Spoke-wheel-Muster – ein zentrales Gefäß mit radiär abgehenden Ästen – ist ein typischer, wenn auch nicht beweisender Doppler-Befund der FNH."
    },
    {
      "id": "fnh-de-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich eine typische FNH früharteriell in der CT?",
      "options": [
        { "id": "A", "text": "Periphere noduläre, diskontinuierliche Kontrastmittelaufnahme" },
        { "id": "B", "text": "Kräftige, homogene Kontrastmittelaufnahme" },
        { "id": "C", "text": "Keine Kontrastmittelaufnahme in allen Phasen" },
        { "id": "D", "text": "Ringförmige Kontrastmittelaufnahme mit zentraler Nekrose" }
      ],
      "correct": "B",
      "explanation": "Im Gegensatz zum Hämangiom zeigt die FNH früharteriell eine kräftige, homogene Kontrastmittelaufnahme ohne periphere noduläre Aufnahme."
    },
    {
      "id": "fnh-de-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was ist in der portalvenösen und Spätphase für die FNH charakteristisch?",
      "options": [
        { "id": "A", "text": "Deutliches Wash-out mit Hypodensität gegenüber der Leber" },
        { "id": "B", "text": "Fehlendes Wash-out mit Angleichung an das Leberparenchym" },
        { "id": "C", "text": "Progressive Größenzunahme der Läsion" },
        { "id": "D", "text": "Auftreten neuer peripherer Knoten" }
      ],
      "correct": "B",
      "explanation": "Die FNH zeigt kein Wash-out und gleicht sich in der portalvenösen und Spätphase rasch dem Leberparenchym an – ein wichtiges Unterscheidungsmerkmal zu malignen Läsionen."
    },
    {
      "id": "fnh-de-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie stellt sich die FNH typischerweise in T1 und T2 zum Leberparenchym dar?",
      "options": [
        { "id": "A", "text": "Deutlich hypointens in T1 und stark hyperintens in T2 (Light-bulb sign)" },
        { "id": "B", "text": "Iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2" },
        { "id": "C", "text": "Hyperintens in T1 und hypointens in T2" },
        { "id": "D", "text": "Signalfrei in beiden Sequenzen" }
      ],
      "correct": "B",
      "explanation": "Die FNH ist meist iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2 zum Leberparenchym, sodass sie nativ oft nur diskret abgrenzbar ist."
    },
    {
      "id": "fnh-de-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich die zentrale Narbe der FNH in der MRT?",
      "options": [
        { "id": "A", "text": "Hyperintens in T2, hypointens in T1, mit verzögerter Kontrastmittelaufnahme in der Spätphase" },
        { "id": "B", "text": "Hypointens in T2 und T1 ohne jegliche Kontrastmittelaufnahme" },
        { "id": "C", "text": "Hyperintens in T1 und isointens in T2" },
        { "id": "D", "text": "Nur in der CT, nie in der MRT darstellbar" }
      ],
      "correct": "A",
      "explanation": "Die zentrale Narbe ist hyperintens in T2, hypointens in T1 und nimmt in der Spätphase verzögert Kontrastmittel auf – charakteristisch in ca. 70 % der Fälle."
    },
    {
      "id": "fnh-de-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Merkmal hilft am meisten, eine FNH von einem HCC zu unterscheiden?",
      "options": [
        { "id": "A", "text": "Fehlendes Wash-out bei kräftiger arterieller Kontrastmittelaufnahme" },
        { "id": "B", "text": "Vorhandensein einer echten Tumorkapsel" },
        { "id": "C", "text": "Erhöhtes Alpha-Fetoprotein" },
        { "id": "D", "text": "Multifokales Auftreten" }
      ],
      "correct": "A",
      "explanation": "Ein HCC zeigt typischerweise ein Wash-out in der portalvenösen/Spätphase, während die FNH trotz kräftiger arterieller Anreicherung kein Wash-out aufweist."
    },
    {
      "id": "fnh-de-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Merkmale können bei einer atypischen FNH auftreten?",
      "options": [
        { "id": "A", "text": "Fehlende zentrale Narbe, heterogenes Erscheinungsbild, Pseudokapsel oder intraläsionales Fett" },
        { "id": "B", "text": "Ausschließlich verkalkte Randstrukturen ohne Kontrastmittelaufnahme" },
        { "id": "C", "text": "Vollständige zystische Transformation" },
        { "id": "D", "text": "Diffuse Verteilung über die gesamte Leber" }
      ],
      "correct": "A",
      "explanation": "Atypische FNH (ca. 20 %) kann ohne zentrale Narbe auftreten oder ein heterogenes Erscheinungsbild, eine Pseudokapsel, fehlende Narbenanreicherung oder intraläsionales Fett zeigen, was die Abgrenzung zu anderen Lebertumoren erschwert."
    },
    {
      "id": "fnh-de-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Vorgehen ist bei einer typischen, asymptomatischen FNH angezeigt?",
      "options": [
        { "id": "A", "text": "In der Regel keine Therapie, da benigne und meist asymptomatisch" },
        { "id": "B", "text": "Sofortige chirurgische Resektion" },
        { "id": "C", "text": "Systemische Chemotherapie" },
        { "id": "D", "text": "Transarterielle Chemoembolisation" }
      ],
      "correct": "A",
      "explanation": "Die FNH ist benigne, meist asymptomatisch und erfordert in der Regel keine Therapie."
    },
    {
      "id": "avm-de-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was charakterisiert eine arteriovenöse Malformation (AVM) der Leber pathophysiologisch?",
      "options": [
        { "id": "A", "text": "Eine abnorme direkte Verbindung zwischen Arterie und venösem Gefäß ohne zwischengeschaltetes Kapillarbett" },
        { "id": "B", "text": "Eine benigne regenerative Raumforderung aus hyperplastischem Lebergewebe" },
        { "id": "C", "text": "Eine zystische Raumforderung mit seröser Flüssigkeit" },
        { "id": "D", "text": "Eine fokale Fettansammlung im Leberparenchym" }
      ],
      "correct": "A",
      "explanation": "Eine hepatische AVM ist eine abnorme direkte Verbindung zwischen einer Arterie und einem venösen Gefäß ohne zwischengeschaltetes Kapillarbett, sodass Blut mit hoher Geschwindigkeit und niedrigem Widerstand direkt arteriell-venös fließt."
    },
    {
      "id": "avm-de-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welcher Shunt-Typ ist bei hepatischen AVMs am häufigsten?",
      "options": [
        { "id": "A", "text": "Arterioportal (A. hepatica – Pfortaderast)" },
        { "id": "B", "text": "Portosystemisch (Pfortader – Lebervene)" },
        { "id": "C", "text": "Ausschließlich arteriovenös (A. hepatica – Lebervene)" },
        { "id": "D", "text": "Venovenös zwischen zwei Lebervenen" }
      ],
      "correct": "A",
      "explanation": "Arterioportale Shunts – eine Verbindung zwischen A. hepatica und einem Pfortaderast – sind der häufigste Typ hepatischer AV-Malformationen."
    },
    {
      "id": "avm-de-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Erkrankung ist die wichtigste kongenitale Ursache multipler hepatischer AVMs?",
      "options": [
        { "id": "A", "text": "Morbus Osler-Weber-Rendu (hereditäre hämorrhagische Teleangiektasie, HHT)" },
        { "id": "B", "text": "Morbus Wilson" },
        { "id": "C", "text": "Hämochromatose" },
        { "id": "D", "text": "Alpha-1-Antitrypsin-Mangel" }
      ],
      "correct": "A",
      "explanation": "Die hereditäre hämorrhagische Teleangiektasie (HHT, Morbus Osler-Weber-Rendu) ist die wichtigste kongenitale Ursache multipler, diffus verteilter hepatischer AV-Shunts."
    },
    {
      "id": "avm-de-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Ursache passt am besten zu einer erworbenen hepatischen AVM?",
      "options": [
        { "id": "A", "text": "Iatrogen nach Leberbiopsie oder TIPS-Anlage" },
        { "id": "B", "text": "Angeborene Leberzyste" },
        { "id": "C", "text": "Chronische Virushepatitis allein" },
        { "id": "D", "text": "Physiologische Altersveränderung" }
      ],
      "correct": "A",
      "explanation": "Erworbene hepatische AVMs entstehen vor allem traumatisch oder iatrogen, z. B. nach Leberbiopsie, TIPS-Anlage oder Operation."
    },
    {
      "id": "avm-de-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Dopplermuster spricht für einen AV-Shunt in einer Lebervene oder einem Pfortaderast?",
      "options": [
        { "id": "A", "text": "Monophasisches, kontinuierliches Flusssignal mit sehr niedriger Geschwindigkeit" },
        { "id": "B", "text": "Pulsatiler, arterialisierter Fluss mit hoher Geschwindigkeit" },
        { "id": "C", "text": "Komplette Flussumkehr ohne Pulsatilität" },
        { "id": "D", "text": "Fehlendes Dopplersignal (\"stille Vene\")" }
      ],
      "correct": "B",
      "explanation": "Ein pulsatiles, arterialisiertes Flussmuster mit hoher Geschwindigkeit in einer Vene weist auf eine direkte AV-Shuntverbindung hin."
    },
    {
      "id": "avm-de-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich der Widerstandsindex (RI) der zuführenden Arterie bei einem AV-Shunt typischerweise?",
      "options": [
        { "id": "A", "text": "Deutlich erhöht" },
        { "id": "B", "text": "Deutlich erniedrigt" },
        { "id": "C", "text": "Unverändert im Vergleich zur Gegenseite" },
        { "id": "D", "text": "Nicht messbar" }
      ],
      "correct": "B",
      "explanation": "Durch den niedrigen Widerstand im Shunt sinkt der Widerstandsindex der zuführenden Arterie deutlich ab, erkennbar an einer hohen diastolischen Flussgeschwindigkeit."
    },
    {
      "id": "avm-de-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was ist das wichtigste CT-Leitzeichen einer hepatischen AVM?",
      "options": [
        { "id": "A", "text": "Zentripetale Kontrastmittelauffüllung in der Spätphase" },
        { "id": "B", "text": "Vorzeitige Kontrastierung der drainierenden Vene in der arteriellen Phase (\"Early venous filling sign\")" },
        { "id": "C", "text": "Homogen hypodense Läsion in allen Phasen" },
        { "id": "D", "text": "Verkalkungen im Läsionszentrum" }
      ],
      "correct": "B",
      "explanation": "Das Early venous filling sign – die vorzeitige arterielle Opazifikation der drainierenden Vene – ist der Schlüsselbefund einer hepatischen AVM in CT und MRT."
    },
    {
      "id": "avm-de-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie wird eine fokale, keilförmige Hyperperfusion um eine AVM in der frühen arteriellen Phase bezeichnet?",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "Zentrale Narbe" },
        { "id": "C", "text": "Transiente Hyperperfusionsstörung (THAD/THID)" },
        { "id": "D", "text": "Pseudokapsel" }
      ],
      "correct": "C",
      "explanation": "Eine transiente, fokale oder keilförmige Hyperperfusion um einen AV-Shunt wird als THAD/THID bezeichnet und kann eine hypervaskuläre Läsion wie FNH oder HCC imitieren."
    },
    {
      "id": "avm-de-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie stellen sich AV-Malformationen typischerweise in T1/T2-gewichteten MRT-Sequenzen dar?",
      "options": [
        { "id": "A", "text": "Homogen hyperintens mit langsamer, zentripetaler Kontrastmittelanreicherung wie ein Hämangiom" },
        { "id": "B", "text": "Als serpiginöse, signalfreie Strukturen (Flow voids) durch schnellen Fluss" },
        { "id": "C", "text": "Als fettäquivalente Signalintensität in allen Sequenzen" },
        { "id": "D", "text": "Als zystische, scharf begrenzte Raumforderung mit Flüssigkeitsspiegel" }
      ],
      "correct": "B",
      "explanation": "Schnell fließendes Blut in dilatierten Gefäßen erzeugt Flow voids – serpiginöse, signalfreie Strukturen in T1- und T2-gewichteten Sequenzen."
    },
    {
      "id": "avm-de-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche klinische Konsequenz kann eine ausgeprägte HHT-assoziierte Leberbeteiligung mit multiplen AV-Shunts haben?",
      "options": [
        { "id": "A", "text": "Akutes Nierenversagen" },
        { "id": "B", "text": "High-Output-Herzinsuffizienz und portale Hypertension" },
        { "id": "C", "text": "Akute Pankreatitis" },
        { "id": "D", "text": "Hypothyreose" }
      ],
      "correct": "B",
      "explanation": "Multiple hepatische AV-Shunts können über ein erhöhtes Herzzeitvolumen zu einer High-Output-Herzinsuffizienz führen und über arterioportale Shunts eine portale Hypertension verursachen."
    },
    {
      "id": "hcc-de-01", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "In welchem Kontext ist die nicht invasive Bilddiagnose eines HCC besonders belastbar?",
      "options": [{"id":"A","text":"Im geeigneten Hochrisikokontext, z. B. bei Leberzirrhose"},{"id":"B","text":"Bei jeder zufälligen Leberläsion unabhängig von der Vorgeschichte"},{"id":"C","text":"Nur bei gesunden Kindern"},{"id":"D","text":"Ausschließlich nach Trauma"}],
      "correct": "A", "explanation": "Das typische dynamische HCC-Muster und LI-RADS sind an eine definierte Hochrisikopopulation gebunden, insbesondere Patienten mit Zirrhose oder bestimmten chronischen Lebererkrankungen."
    },
    {
      "id": "hcc-de-02", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welches Kontrastmittelmuster ist klassisch für ein HCC?",
      "options": [{"id":"A","text":"Non-rim APHE mit non-peripheral Wash-out"},{"id":"B","text":"Periphere noduläre Aufnahme mit zentripetalem Fill-in"},{"id":"C","text":"Kein Enhancement in allen Phasen"},{"id":"D","text":"Nur verzögerte Narbenanreicherung ohne APHE"}],
      "correct": "A", "explanation": "Nicht randförmige arterielle Hyperenhancement gefolgt von nicht peripherem Wash-out ist das klassische dynamische HCC-Muster im Risikopatienten."
    },
    {
      "id": "hcc-de-03", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Was bedeutet Wash-out bei einer Leberläsion?",
      "options": [{"id":"A","text":"Die Läsion wird in späteren Phasen relativ hypointens/hypodens zur Leber"},{"id":"B","text":"Die Läsion verschwindet vollständig"},{"id":"C","text":"Es tritt immer eine aktive Blutung auf"},{"id":"D","text":"Die Läsion nimmt nur in T2 an Signal zu"}],
      "correct": "A", "explanation": "Wash-out ist ein relativer Befund: Die Läsion wird gegenüber dem zunehmend anreichernden Leberparenchym in portalvenöser oder später Phase dunkler."
    },
    {
      "id": "hcc-de-04", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welcher Befund beschreibt eine Kapselappearance?",
      "options": [{"id":"A","text":"Glatter peripher anreichernder Rand in späteren Phasen"},{"id":"B","text":"Zentrale T2-helle Narbe mit verzögertem Enhancement"},{"id":"C","text":"Komplette Verkalkung der Läsion"},{"id":"D","text":"Keilförmige Perfusionsstörung ohne Raumforderung"}],
      "correct": "A", "explanation": "Eine glatte, peripher anreichernde Begrenzung in portalvenöser oder später Phase entspricht einer Kapselappearance und unterstützt die HCC-Diagnose."
    },
    {
      "id": "hcc-de-05", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Wie erscheint ein HCC typischerweise in der hepatobiliären MRT-Phase?",
      "options": [{"id":"A","text":"Hypointens zum Leberparenchym"},{"id":"B","text":"Immer deutlich hyperintens"},{"id":"C","text":"Signalfrei wie Luft"},{"id":"D","text":"Identisch zu Gefäßen"}],
      "correct": "A", "explanation": "Die meisten HCC enthalten keine ausreichend funktionsfähigen Hepatozyten und erscheinen daher in der hepatobiliären Phase hypointens."
    },
    {
      "id": "hcc-de-06", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welches DWI/ADC-Muster kann ein HCC unterstützen?",
      "options": [{"id":"A","text":"Diffusionsrestriktion mit erniedrigtem ADC"},{"id":"B","text":"Sehr hoher ADC ohne DWI-Signal"},{"id":"C","text":"Ausschließlich T2-shine-through ohne Restriktion"},{"id":"D","text":"Keine Darstellung in der DWI"}],
      "correct": "A", "explanation": "Erhöhte Zelldichte kann eine echte Diffusionsrestriktion mit hohem DWI-Signal und erniedrigtem ADC verursachen; dies ist unterstützend, aber nicht spezifisch."
    },
    {
      "id": "hcc-de-07", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welcher Befund spricht am ehesten für Tumor in vein?",
      "options": [{"id":"A","text":"Anreicherndes Weichteilgewebe in einer Vene mit tumortypischem Enhancement"},{"id":"B","text":"Ein homogener nicht anreichernder Thrombus ohne Verbindung zum Tumor"},{"id":"C","text":"Ausschließlich periportales Ödem"},{"id":"D","text":"Eine einfache Leberzyste neben der Pfortader"}],
      "correct": "A", "explanation": "Enhancing soft tissue innerhalb einer Vene spricht für makrovaskuläre Tumorinvasion und muss von blandem Thrombus unterschieden werden."
    },
    {
      "id": "hcc-de-08", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welche Aussage zum infiltrativen HCC ist richtig?",
      "options": [{"id":"A","text":"Es kann permeativ wachsen und das klassische APHE/Wash-out-Muster nur fokal zeigen"},{"id":"B","text":"Es ist immer eine scharf begrenzte solitäre Läsion"},{"id":"C","text":"Gefäßinvasion kommt praktisch nie vor"},{"id":"D","text":"Satellitenherde schließen die Diagnose aus"}],
      "correct": "A", "explanation": "Infiltratives HCC wächst unscharf über mehrere Segmente; klassisches Enhancement kann heterogen oder nur fokal vorhanden sein. Satelliten und Gefäßinvasion sind häufig."
    },
    {
      "id": "hcc-de-09", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welches Merkmal spricht eher für HCC als für typische FNH?",
      "options": [{"id":"A","text":"Portalvenöses/spätes Wash-out"},{"id":"B","text":"Homogenes APHE ohne Wash-out"},{"id":"C","text":"T2-helle zentrale Narbe mit verzögerter Anreicherung"},{"id":"D","text":"Spoke-wheel-Muster im Doppler"}],
      "correct": "A", "explanation": "Typische FNH zeigt APHE, aber kein Wash-out. Portalvenöses oder spätes Wash-out ist im passenden Risikokontext ein wichtiges HCC-Merkmal."
    },
    {
      "id": "hcc-de-10", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Welche Angaben sind für das HCC-Staging im radiologischen Befund besonders wichtig?",
      "options": [{"id":"A","text":"Zahl, Größe, Segment, Satelliten, Gefäßinvasion und extrahepatische Ausbreitung"},{"id":"B","text":"Nur die Echogenität in der Sonographie"},{"id":"C","text":"Nur das Patientenalter"},{"id":"D","text":"Ausschließlich die Nativdichte"}],
      "correct": "A", "explanation": "Tumorlast, Lokalisation, Satelliten, makrovaskuläre Invasion und Metastasen bestimmen Staging und Therapieplanung."
    },
    {
      "id": "sarkoidose-de-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches histologische Merkmal ist typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Verkäsende Granulome"
        },
        {
          "id": "B",
          "text": "Nicht-verkäsende Granulome"
        },
        {
          "id": "C",
          "text": "Eosinophile Mikroabszesse"
        },
        {
          "id": "D",
          "text": "Tumoröse Plattenepithelformationen"
        }
      ],
      "correct": "B",
      "explanation": "Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ätiologie. Histologisch sind nicht-verkäsende Granulome typisch."
    },
    {
      "id": "sarkoidose-de-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Verteilungsmuster der Mikronoduli ist in der HRCT typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatisch entlang Fissuren, Pleura und bronchovaskulären Bündeln"
        },
        {
          "id": "B",
          "text": "Rein zufällig hämatogen ohne Bezug zu Fissuren"
        },
        {
          "id": "C",
          "text": "Nur basal subpleural als Honeycombing"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrilobulär mit Tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Typisch sind scharf begrenzte 2–4-mm-Mikronoduli in perilymphatischer Verteilung, besonders entlang Fissuren, Pleura, Septen und bronchovaskulären Bündeln."
    },
    {
      "id": "sarkoidose-de-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was beschreibt das 1-2-3-Zeichen bei Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Rechter Hilus, linker Hilus und rechter Paratrachealraum"
        },
        {
          "id": "B",
          "text": "Drei Kavernen im rechten Oberlappen"
        },
        {
          "id": "C",
          "text": "Drei Zonen der Lungenfibrose"
        },
        {
          "id": "D",
          "text": "Drei Stadien der kardialen Sarkoidose"
        }
      ],
      "correct": "A",
      "explanation": "Das 1-2-3-Zeichen beschreibt die typische Lymphknotenverteilung: rechter Hilus, linker Hilus und rechter Paratrachealraum."
    },
    {
      "id": "sarkoidose-de-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Scadding-Stadium zeigt isoliert bihiläre Lymphadenopathie ohne Parenchymbefall?",
      "options": [
        {
          "id": "A",
          "text": "Stadium 0"
        },
        {
          "id": "B",
          "text": "Stadium I"
        },
        {
          "id": "C",
          "text": "Stadium III"
        },
        {
          "id": "D",
          "text": "Stadium IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding Stadium I entspricht isolierter bihilärer Lymphadenopathie bei regelrechtem Lungenparenchym."
    },
    {
      "id": "sarkoidose-de-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was bedeutet Scadding Stadium II?",
      "options": [
        {
          "id": "A",
          "text": "Nur Fibrose"
        },
        {
          "id": "B",
          "text": "Nur Parenchymveränderungen ohne Lymphadenopathie"
        },
        {
          "id": "C",
          "text": "Bihiläre Lymphadenopathie plus Parenchymveränderungen"
        },
        {
          "id": "D",
          "text": "Normaler Röntgen-Thorax"
        }
      ],
      "correct": "C",
      "explanation": "Stadium II bedeutet BHL plus Lungenparenchymveränderungen. Stadium III wäre Parenchymveränderung ohne BHL, Stadium IV Fibrose."
    },
    {
      "id": "sarkoidose-de-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Aussage zu Eggshell-Verkalkungen ist korrekt?",
      "options": [
        {
          "id": "A",
          "text": "Sie sind pathognomonisch für Sarkoidose"
        },
        {
          "id": "B",
          "text": "Sie können auch bei Silikose auftreten"
        },
        {
          "id": "C",
          "text": "Sie beweisen immer Lymphom"
        },
        {
          "id": "D",
          "text": "Sie treten nur bei Asbestose auf"
        }
      ],
      "correct": "B",
      "explanation": "Schalenförmige Eggshell-Verkalkungen können bei Sarkoidose vorkommen, sind aber nicht spezifisch und werden auch bei Silikose gesehen."
    },
    {
      "id": "sarkoidose-de-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was ist das Sarcoid Galaxy Sign?",
      "options": [
        {
          "id": "A",
          "text": "Großer Knoten mit vielen kleinen Satellitennoduli"
        },
        {
          "id": "B",
          "text": "Diffuse Milchglastrübung ohne Noduli"
        },
        {
          "id": "C",
          "text": "Pleuraplaques mit Verkalkung"
        },
        {
          "id": "D",
          "text": "Zentrale Lungenembolie"
        }
      ],
      "correct": "A",
      "explanation": "Das Sarcoid Galaxy Sign besteht aus einem größeren Granulom-Aggregat, das von vielen kleinen Satellitennoduli umgeben ist. Es ist nicht spezifisch und kann auch bei Tuberkulose vorkommen."
    },
    {
      "id": "sarkoidose-de-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche DD zeigt typischerweise unregelmäßige knotige Septenverdickungen, oft einseitig oder asymmetrisch?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangiosis carcinomatosa"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "Heerfordt-Syndrom"
        },
        {
          "id": "D",
          "text": "Discoider Meniskus"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangiosis carcinomatosa macht häufig unregelmäßige, knotige Septenverdickungen und ist oft asymmetrisch bzw. einseitig. Klinisch sind die Patienten häufig schwerer krank."
    },
    {
      "id": "sarkoidose-de-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Kombination definiert das Heerfordt-Syndrom?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, Parotitis und Fazialisparese"
        },
        {
          "id": "B",
          "text": "Asthma, Sinusitis und Eosinophilie"
        },
        {
          "id": "C",
          "text": "Arthritis, Urethritis und Konjunktivitis"
        },
        {
          "id": "D",
          "text": "Hämoptyse, Glomerulonephritis und Sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Das Heerfordt-Syndrom ist eine Sarkoidose-Manifestation mit Uveitis, Parotitis und Fazialisparese."
    },
    {
      "id": "sarkoidose-de-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Modalität ist besonders wichtig zum Nachweis einer kardialen Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "MRT mit Late Gadolinium Enhancement"
        },
        {
          "id": "B",
          "text": "Konventionelle Knieaufnahme"
        },
        {
          "id": "C",
          "text": "Sonographie der Gallenblase"
        },
        {
          "id": "D",
          "text": "Native Schädel-CT"
        }
      ],
      "correct": "A",
      "explanation": "Kardiale Sarkoidose wird häufig mittels MRT und Late Gadolinium Enhancement beurteilt. Klinisch wichtig ist das erhöhte Risiko für Rhythmusstörungen."
    },
    {
      "id": "rotatorenmanschette-de-01",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welche vier Muskeln bilden die Rotatorenmanschette?",
      "options": [
        { "id": "A", "text": "Supraspinatus, Infraspinatus, Teres minor, Subscapularis" },
        { "id": "B", "text": "Deltoideus, Trapezius, Latissimus dorsi, Teres major" },
        { "id": "C", "text": "Bizeps, Trizeps, Coracobrachialis, Pectoralis major" },
        { "id": "D", "text": "Supraspinatus, Deltoideus, Teres minor, Subscapularis" }
      ],
      "correct": "A",
      "explanation": "Die Rotatorenmanschette besteht aus M. supraspinatus, M. infraspinatus, M. teres minor und M. subscapularis (Merkwort: SITS)."
    },
    {
      "id": "rotatorenmanschette-de-02",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Wo liegt die sogenannte „Critical Zone“ der Supraspinatussehne?",
      "options": [
        { "id": "A", "text": "Ca. 1-2 cm proximal des Ansatzes am Tuberculum majus - eine hypovaskuläre Zone" },
        { "id": "B", "text": "Am muskulotendinösen Übergang" },
        { "id": "C", "text": "Am Ursprung an der Skapula" },
        { "id": "D", "text": "Im Bereich des Bizepssehnenursprungs am Glenoid" }
      ],
      "correct": "A",
      "explanation": "Die Critical Zone liegt ca. 1-2 cm proximal des Ansatzes am Tuberculum majus, ist hypovaskulär und damit Prädilektionsstelle für Degeneration und Rupturen."
    },
    {
      "id": "rotatorenmanschette-de-03",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welche Hauptfunktion hat der M. subscapularis?",
      "options": [
        { "id": "A", "text": "Außenrotation des Arms" },
        { "id": "B", "text": "Abduktion des Arms" },
        { "id": "C", "text": "Innenrotation des Arms" },
        { "id": "D", "text": "Elevation des Arms über 90°" }
      ],
      "correct": "C",
      "explanation": "Der M. subscapularis ist der wichtigste Innenrotator des Arms und stabilisiert den Humeruskopf zusammen mit dem M. infraspinatus in der Transversalebene."
    },
    {
      "id": "rotatorenmanschette-de-04",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welche Sequenzkombination ist für die Beurteilung der Rotatorenmanschette essenziell?",
      "options": [
        { "id": "A", "text": "Nur eine native T1-Sequenz axial" },
        { "id": "B", "text": "Fettunterdrückte, flüssigkeitssensitive Sequenzen in mindestens zwei Ebenen" },
        { "id": "C", "text": "Ausschließlich eine DWI-Sequenz in einer Ebene" },
        { "id": "D", "text": "Nur eine T1-Sequenz mit Kontrastmittel" }
      ],
      "correct": "B",
      "explanation": "Ein standardisiertes Protokoll mit fettunterdrückten, flüssigkeitssensitiven Sequenzen (z. B. PD/T2 fs) in mindestens zwei Ebenen ist essenziell, um Rupturen sicher zu detektieren."
    },
    {
      "id": "rotatorenmanschette-de-05",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Was beschreibt das Magic-Angle-Phänomen?",
      "options": [
        { "id": "A", "text": "Eine echte Ruptur, die nur in T1-Sequenzen sichtbar ist" },
        { "id": "B", "text": "Eine artifizielle Signalanhebung in kurzen TE-Sequenzen (T1, PD) bei einem Sehnenverlauf von ca. 55° zum Hauptmagnetfeld, die in T2 verschwindet" },
        { "id": "C", "text": "Eine Signalauslöschung durch Metallartefakte" },
        { "id": "D", "text": "Ein Bewegungsartefakt durch die Atmung" }
      ],
      "correct": "B",
      "explanation": "Das Magic-Angle-Phänomen führt zu einer artifiziellen Signalanhebung in PD/T1, wenn die Sehne in einem Winkel von ca. 55° zum Hauptmagnetfeld verläuft - in T2-gewichteten Sequenzen verschwindet das Phänomen, sodass es nicht mit einer echten Pathologie verwechselt werden sollte."
    },
    {
      "id": "rotatorenmanschette-de-06",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Wie zeigt sich eine bursaseitige Partialruptur der Supraspinatussehne typischerweise in der MRT?",
      "options": [
        { "id": "A", "text": "Vollständige Diskontinuität der Sehne mit Retraktion des Stumpfes" },
        { "id": "B", "text": "Fokaler Flüssigkeitssaum zwischen Sehne und Bursa subacromialis in T2 fs" },
        { "id": "C", "text": "Diffuse Signalminderung der gesamten Sehne in T1 ohne weitere Auffälligkeiten" },
        { "id": "D", "text": "Isoliertes Knochenmarködem im Humeruskopf ohne Sehnenveränderung" }
      ],
      "correct": "B",
      "explanation": "Eine bursaseitige Partialruptur betrifft die oberflächlichen (bursalen) Faseranteile und zeigt einen fokalen Flüssigkeitssaum zwischen Sehne und Bursa subacromialis in T2 fs."
    },
    {
      "id": "rotatorenmanschette-de-07",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Was bezeichnet eine PASTA-Läsion?",
      "options": [
        { "id": "A", "text": "Eine vollständige Ruptur mit Retraktion Grad 3 nach Patte" },
        { "id": "B", "text": "Eine gelenkseitige Partialruptur am Footprint (Partial Articular Surface Tendon Avulsion)" },
        { "id": "C", "text": "Eine isolierte Bursitis subacromialis ohne Sehnenbeteiligung" },
        { "id": "D", "text": "Eine Tendinopathie der langen Bizepssehne" }
      ],
      "correct": "B",
      "explanation": "PASTA steht für Partial Articular Surface Tendon Avulsion - eine gelenkseitige (artikuläre) Partialruptur der tiefen Faseranteile am Footprint, häufig assoziiert mit Impingement."
    },
    {
      "id": "rotatorenmanschette-de-08",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Wodurch unterscheidet sich eine intratendinöse Partialruptur von einer reinen Tendinopathie?",
      "options": [
        { "id": "A", "text": "Bei einer Tendinopathie liegt eine vollständige Diskontinuität der Sehne vor" },
        { "id": "B", "text": "Eine intratendinöse Ruptur zeigt eine fokale T2-hyperintense Signalanhebung ohne Kontakt zu Bursa oder Gelenk, während eine Tendinopathie eher eine PD/T1-Signalanhebung ohne klares T2-Flüssigkeitssignal zeigt" },
        { "id": "C", "text": "Beide sind in der MRT grundsätzlich nicht unterscheidbar" },
        { "id": "D", "text": "Eine Tendinopathie zeigt immer eine Retraktion des Sehnenstumpfes" }
      ],
      "correct": "B",
      "explanation": "Die intratendinöse Partialruptur zeigt eine fokale T2-hyperintense Signalanhebung ohne Oberflächenkontakt, während die Tendinopathie eine intratendinöse PD/T1-Signalanhebung ohne eindeutiges T2-Flüssigkeitssignal aufweist."
    },
    {
      "id": "rotatorenmanschette-de-09",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Ab welchem Ausmaß der Footprint-Beteiligung wird bei einer PASTA-Läsion häufig eine operative Refixation erwogen?",
      "options": [
        { "id": "A", "text": "Bei einer Footprint-Beteiligung von mehr als 50 %" },
        { "id": "B", "text": "Bei einer Footprint-Beteiligung von mehr als 10 %" },
        { "id": "C", "text": "Nur bei einer Footprint-Beteiligung von 100 %" },
        { "id": "D", "text": "Die Footprint-Beteiligung spielt für die Therapieentscheidung keine Rolle" }
      ],
      "correct": "A",
      "explanation": "Bei einer Footprint-Beteiligung von mehr als 50 % wird bei der PASTA-Läsion häufig eine operative Refixation erwogen, bei weniger als 50 % oft konservative Therapie oder Debridement."
    },
    {
      "id": "rotatorenmanschette-de-10",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welches MRT-Zeichen ist beweisend für eine Komplettruptur der Rotatorenmanschette?",
      "options": [
        { "id": "A", "text": "Eine isolierte Signalanhebung in PD ohne T2-Korrelat" },
        { "id": "B", "text": "Eine vollständige T2-hyperintense Unterbrechung der Sehne mit Flüssigkeit im Defekt, die Gelenk und Bursa verbindet" },
        { "id": "C", "text": "Eine Sehnenverdickung ohne jegliche Signalveränderung" },
        { "id": "D", "text": "Eine isolierte Bursitis subacromialis ohne Sehnenbeteiligung" }
      ],
      "correct": "B",
      "explanation": "Eine Komplettruptur zeigt eine vollständige T2-hyperintense Unterbrechung der Sehne mit Flüssigkeit im Defekt - dadurch entsteht eine direkte Kommunikation zwischen Glenohumeralgelenk und Bursa subacromialis."
    },
    {
      "id": "rotatorenmanschette-de-11",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Was beschreibt die Klassifikation nach Patte?",
      "options": [
        { "id": "A", "text": "Den Grad der fettigen Muskelatrophie" },
        { "id": "B", "text": "Den Retraktionsgrad des Sehnenstumpfes (Grad 1-3)" },
        { "id": "C", "text": "Die Größe eines Labrumdefekts" },
        { "id": "D", "text": "Den Grad einer Bursitis subacromialis" }
      ],
      "correct": "B",
      "explanation": "Die Patte-Klassifikation graduiert die Retraktion des Sehnenstumpfes von Grad 1 (nahe am Footprint) bis Grad 3 (auf Höhe des Glenoids) und ist entscheidend für die OP-Planung."
    },
    {
      "id": "rotatorenmanschette-de-12",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Was bedeutet ein positives Tangentenzeichen in der Schulter-MRT?",
      "options": [
        { "id": "A", "text": "Der Humeruskopf überschreitet die Tangente zwischen Akromion und Korakoid - Hinweis auf eine massive Ruptur" },
        { "id": "B", "text": "Die Supraspinatussehne ist normal konfiguriert" },
        { "id": "C", "text": "Es liegt eine isolierte Tendinopathie der langen Bizepssehne vor" },
        { "id": "D", "text": "Die Bursa subacromialis ist verdickt, aber die Sehne ist intakt" }
      ],
      "correct": "A",
      "explanation": "Beim Tangentenzeichen überschreitet der Humeruskopf die Tangente zwischen Akromion und Korakoid - dies ist ein Hinweis auf eine massive Rotatorenmanschettenruptur."
    },
    {
      "id": "rotatorenmanschette-de-13",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welche Aussage zur Goutallier-Klassifikation ist korrekt?",
      "options": [
        { "id": "A", "text": "Sie beschreibt ausschließlich die Sehnenretraktion" },
        { "id": "B", "text": "Sie graduiert die fettige Degeneration der Muskulatur von Grad 0 (keine Fettinfiltration) bis Grad 4 (Fett > Muskel)" },
        { "id": "C", "text": "Sie wird ausschließlich bei Partialrupturen angewendet" },
        { "id": "D", "text": "Sie basiert ausschließlich auf konventionellen Röntgenbefunden" }
      ],
      "correct": "B",
      "explanation": "Die Goutallier-Klassifikation graduiert die fettige Muskelatrophie von Grad 0 (keine Fettinfiltration) bis Grad 4 (Fett > Muskel). Ab Grad 3-4 gilt eine Rekonstruktion meist als nicht mehr erfolgsversprechend."
    },
    {
      "id": "rotatorenmanschette-de-14",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welcher Faktor kann zu einem subakromialen Impingement beitragen?",
      "options": [
        { "id": "A", "text": "Eine besonders dünne Bursa subacromialis" },
        { "id": "B", "text": "Eine Akromionform vom Bigliani-Typ mit Osteophyten oder eine Bursaverdickung, die den Subakromialraum einengen" },
        { "id": "C", "text": "Eine isolierte Tendinopathie der langen Bizepssehne" },
        { "id": "D", "text": "Eine isolierte Innenrotationsschwäche ohne strukturelle Veränderung" }
      ],
      "correct": "B",
      "explanation": "Eine Akromionform vom Bigliani-Typ mit Osteophyten, AC-Gelenksarthrose mit kaudalen Osteophyten oder eine Bursaverdickung können den Subakromialraum einengen und ein Impingement begünstigen."
    },
    {
      "id": "rotatorenmanschette-de-15",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Welche Bedeutung hat eine Dislokation der langen Bizepssehne aus dem Sulcus bicipitalis?",
      "options": [
        { "id": "A", "text": "Sie ist immer ein Zufallsbefund ohne klinische Relevanz" },
        { "id": "B", "text": "Sie ist ein indirektes Zeichen für eine begleitende Ruptur der Subscapularissehne" },
        { "id": "C", "text": "Sie beweist eine Komplettruptur der Supraspinatussehne" },
        { "id": "D", "text": "Sie tritt ausschließlich bei Kindern auf" }
      ],
      "correct": "B",
      "explanation": "Eine Dislokation der langen Bizepssehne aus dem Sulcus bicipitalis ist ein indirektes Zeichen für eine begleitende Subscapularisruptur, da die Sehne des Subscapularis Teil des Stützapparats für die Bizepssehne im Sulcus ist."
    }
  ],
  "en": [
    ...CONTRAST_QUESTIONS.en,
    ...DIVERTICULITIS_QUESTIONS.en,
    ...STROKE_QUESTIONS.en,
    ...ICB_QUESTIONS.en,
    ...HIE_QUESTIONS.en,
    ...SAB_QUESTIONS('en'),
    ...EDH_QUESTIONS.en,
    ...MIDLINE_CAVA_QUESTIONS.en,
    ...SDH_QUESTIONS.en,
    ...DISSECTION_QUESTIONS.en,
    ...MOYAMOYA_QUESTIONS.en,
    ...HMA_QUESTIONS.en,
    ...CAA_QUESTIONS.en,
    ...CADASIL_QUESTIONS.en,
    ...DVA_QUESTIONS.en,
    ...KAVERNOM_QUESTIONS.en,
    ...NPH_QUESTIONS.en,
    ...TELEANGIEKTASIE_QUESTIONS.en,
    ...SVT_QUESTIONS.en,
    ...FRAKTUR_QUESTIONS.en,
    ...DAVF_QUESTIONS.en,
    ...AVM_QUESTIONS.en,
    ...FRAKTUR_KINDER_QUESTIONS.en,
    ...AK_LUXATION_QUESTIONS.en,
    ...RADIUSKOPF_QUESTIONS.en,
    {
      "id": "meniskus-en-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Why is the medial meniscus significantly more frequently affected by traumatic tears compared to the lateral meniscus?",
      "options": [
        {
          "id": "A",
          "text": "It is anatomically less stable due to its C-shape."
        },
        {
          "id": "B",
          "text": "It is firmly attached to the joint capsule and the medial collateral ligament, making it less mobile."
        },
        {
          "id": "C",
          "text": "It has a purely avascular supply across its entire width."
        },
        {
          "id": "D",
          "text": "Unlike the lateral meniscus, it does not articulate with the femoral condyles."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: The C-shape of the medial meniscus and the O-shape of the lateral meniscus are normal anatomical variations matching their respective tibial plateaus. They do not cause intrinsic mechanical tissue instability.\n\nB is correct: The firm ligamentous anchoring of the medial meniscus to the capsule and the medial collateral ligament (MCL) severely limits its mobility. Under rotational or shearing stress, it cannot glide out of the way like the mobile lateral meniscus, making it highly susceptible to tears.\n\nC is incorrect: Both menisci share a similar vascular layout, featuring a well-perfused periphery (red zone) and an avascular central region. The medial meniscus is not entirely devoid of blood vessels.\n\nD is incorrect: Both menisci articulate with the femoral condyles superiorly and the tibial plateau inferiorly to perform their primary load-bearing and shock-absorbing functions within the joint."
    },
    {
      "id": "meniskus-en-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "According to the established \"two-slice-touch\" rule, which criterion must be met to diagnose a meniscus tear on MRI with high specificity?",
      "options": [
        {
          "id": "A",
          "text": "The signal must touch both the superior and inferior articular surfaces."
        },
        {
          "id": "B",
          "text": "The signal increase must be detectable with surface contact on at least two consecutive slices."
        },
        {
          "id": "C",
          "text": "The tear must be visible in two different sequences (e.g., T1w and T2w)."
        },
        {
          "id": "D",
          "text": "The lesion must have an extension of at least 3 mm in the sagittal plane."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: A tear does not need to span the entire height of the meniscus. It is completely sufficient if the pathological signal intersects either the superior or the inferior articular surface.\n\nB is correct: This rule dictates that the intrameniscal signal abnormality must communicate with the articular surface on at least two directly adjacent images (slices). This eliminates the risk of misinterpreting technical noise or volume averaging artifacts on a single slice as a true tear.\n\nC is incorrect: While tears should ideally be verified across multiple planes (sagittal/coronal) and sequences, the \"two-slice-touch\" rule specifically demands continuity across successive slices within the same sequence.\n\nD is incorrect: The rule is independent of absolute millimeter measurements. It relies solely on the number of involved slices, regardless of the protocol's standard slice thickness (which is typically 3 mm)."
    },
    {
      "id": "meniskus-en-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "In which vascular zone does a meniscus tear present the best biological conditions for a successful meniscus repair (suture)?",
      "options": [
        {
          "id": "A",
          "text": "White zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Red-white zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Red zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniscal root"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: The white zone comprises the central third of the meniscus and is completely avascular, relying purely on diffusion from synovial fluid. Suturing here almost always fails due to the lack of healing potential.\n\nB is incorrect: The red-white zone is a transitional area (approx. 3–5 mm from the capsule). It contains only a sparse, capillary blood supply, making the predictability of tissue healing after suturing highly uncertain.\n\nC is correct: The red zone (Zone I) represents the peripheral outer rim (<3 mm from the capsule) and receives a rich blood supply from the perimeniscal capillary plexus. The biological prerequisites for fibroblast migration and tissue repair are optimal here, favoring anatomical reconstruction.\n\nD is incorrect: The meniscal roots anchor the anterior and posterior horns to the tibial plateau. They represent specific ligamentous attachments rather than a vascular zone of the functional meniscal body."
    },
    {
      "id": "meniskus-en-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "According to standard protocols, which MRI sequence is best suited for the definitive detection of acute meniscus tears, accompanying bone marrow edema, and ligament disruptions?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-weighting without fat saturation."
        },
        {
          "id": "B",
          "text": "T2-weighted or PD fat-saturated (fs) sequences."
        },
        {
          "id": "C",
          "text": "3D gradient-echo sequences with a slice thickness of 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-weighted phase-contrast angiography."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Native T1-weighting provides excellent anatomical details and screens well for chronic fibrosis, but it lacks fluid sensitivity. Acute fluid entering a tear cleft or bone marrow edema cannot be reliably differentiated.\n\nB is correct: T2-w or PD-fs (proton density fat-saturated) sequences are highly sensitive to free fluid. Pathological changes like a tear gap (filled with synovial fluid) or marrow edema contain high amounts of water and appear hyperintense (bright) against the suppressed, dark background.\n\nC is incorrect: A 6 mm slice thickness is far too thick for internal knee derangement diagnostics. Small tears would be completely hidden due to volume averaging effects. The standard protocol requires a maximum thickness of 3 mm.\n\nD is incorrect: Phase-contrast angiography is designed to image fluid dynamics within vessels. It is entirely unsuited for evaluating the static, fibrocartilaginous tissue components of the knee joint."
    },
    {
      "id": "meniskus-en-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "How does the distribution of tears in the posterior horn of the lateral meniscus differ compared to the medial meniscus?",
      "options": [
        {
          "id": "A",
          "text": "In the lateral meniscus, practically all tears affect the anterior horn."
        },
        {
          "id": "B",
          "text": "In the lateral meniscus, about 50% of tears are located in the posterior horn, whereas in the medial meniscus, approximately 98% affect the posterior horn."
        },
        {
          "id": "C",
          "text": "Tears in the posterior horn of the lateral meniscus do not occur at all due to its O-shape."
        },
        {
          "id": "D",
          "text": "The distribution is absolutely identical in both menisci."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Although the anterior horn of the lateral meniscus is torn more often than that of the medial meniscus, it does not account for all or even the majority of lateral meniscal tears.\n\nB is correct: Because the posterior horn of the medial meniscus is rigidly fixed, it acts as a mechanical pivot during knee movement, absorbing immense stress—causing roughly 98% of its tears to occur there. The lateral meniscus is less constrained; only half of its tears affect the posterior horn, with the remainder distributed among the body (corpus) and anterior horn.\n\nC is incorrect: The geometric O-shape does not immunize the lateral meniscus against injury. Statistically, the posterior horn remains the most common site for tears, accounting for 50% of cases.\n\nD is incorrect: Due to completely different biomechanical fixations and mobility profiles, the medial and lateral menisci display entirely distinct lesion distribution patterns."
    },
    {
      "id": "meniskus-en-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "A radiology report describes a wedge-shaped/globular signal within the meniscus tissue that just falls short of reaching the articular surface on the current image. Which Lotysch subtype does this represent?",
      "options": [
        {
          "id": "A",
          "text": "Grade 2a"
        },
        {
          "id": "B",
          "text": "Grade 2b"
        },
        {
          "id": "C",
          "text": "Grade 2c"
        },
        {
          "id": "D",
          "text": "Grade 3"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: Grade 2a is strictly defined as a purely linear (line-like) intrameniscal signal that shows absolutely no communication with either the superior or inferior articular surface. It lacks any broad or expanding morphology.\n\nB is incorrect: Grade 2b also describes a linear signal, but one that touches the articular surface on exactly a single slice, rendering the imaging finding inconclusive for a definitive tear.\n\nC is correct: A wedge-shaped, wide, or rounded (globular) intrameniscal signal that does not definitively break through the surface is classified as Lotysch Grade 2c. This indicates severe mucoid degeneration carrying an exceptionally high risk of an underlying occult (hidden) tear.\n\nD is incorrect: Grade 3 requires the signal to clearly and reproducibly breach the articular surface on at least two consecutive slices. Without objective surface contact, a Grade 3 diagnosis is not permitted."
    },
    {
      "id": "haemangiom-en-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement best describes a liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Cavernous non-neoplastic malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatic metastasis with necrosis"
        },
        {
          "id": "C",
          "text": "Premalignant hepatocellular lesion"
        },
        {
          "id": "D",
          "text": "Bacterial liver abscess"
        }
      ],
      "correct": "A",
      "explanation": "A liver haemangioma is a cavernous, non-neoplastic vascular malformation and the most common benign solid liver tumour."
    },
    {
      "id": "haemangiom-en-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which ultrasound finding is typical for a small liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Well-defined hyperechoic lesion"
        },
        {
          "id": "B",
          "text": "Ill-defined hypoechoic lesion with capsular retraction"
        },
        {
          "id": "C",
          "text": "Gas echoes with posterior shadowing"
        },
        {
          "id": "D",
          "text": "Diffuse gallbladder wall thickening"
        }
      ],
      "correct": "A",
      "explanation": "Typical haemangiomas are usually hyperechoic and well-defined on ultrasound. If morphology is classic, further imaging is often unnecessary."
    },
    {
      "id": "haemangiom-en-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which dynamic CT pattern is classic for liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Peripheral nodular discontinuous enhancement with centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Arterial wash-in with portal venous wash-out and capsule"
        },
        {
          "id": "C",
          "text": "Thin-walled lesion without enhancement"
        },
        {
          "id": "D",
          "text": "Diffuse infiltrative growth along the bile ducts"
        }
      ],
      "correct": "A",
      "explanation": "Classic haemangioma shows peripheral nodular discontinuous enhancement with progressive centripetal fill-in on later phases."
    },
    {
      "id": "haemangiom-en-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What does the iris diaphragm phenomenon in liver haemangioma describe?",
      "options": [
        {
          "id": "A",
          "text": "Fill-in of the lesion from periphery to centre"
        },
        {
          "id": "B",
          "text": "Central wash-out in the delayed phase"
        },
        {
          "id": "C",
          "text": "Abrupt perfusion stop at the liver hilum"
        },
        {
          "id": "D",
          "text": "Ring-shaped abscess capsule"
        }
      ],
      "correct": "A",
      "explanation": "The iris diaphragm phenomenon describes centripetal contrast fill-in from the rim toward the centre."
    },
    {
      "id": "haemangiom-en-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which MRI finding is especially typical for a classic liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Very high T2 signal, the light-bulb sign"
        },
        {
          "id": "B",
          "text": "Marked T1-hyperintense fatty area with opposed-phase signal drop"
        },
        {
          "id": "C",
          "text": "Low T2 signal like fibrotic tissue"
        },
        {
          "id": "D",
          "text": "Only central diffusion restriction without enhancement"
        }
      ],
      "correct": "A",
      "explanation": "A classic haemangioma is very bright on T2, often even brighter than bile. This light-bulb sign is an important diagnostic clue."
    },
    {
      "id": "haemangiom-en-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What is the typical DWI/ADC constellation in liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Bright DWI, high ADC: T2 shine-through"
        },
        {
          "id": "B",
          "text": "Bright DWI, low ADC: definite restriction"
        },
        {
          "id": "C",
          "text": "Dark DWI, ADC not measurable"
        },
        {
          "id": "D",
          "text": "DWI and ADC always normal"
        }
      ],
      "correct": "A",
      "explanation": "Haemangiomas may be hyperintense on high b-values. High ADC values indicate T2 shine-through and not true diffusion restriction."
    },
    {
      "id": "haemangiom-en-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "How does a typical haemangioma appear on delayed contrast phases?",
      "options": [
        {
          "id": "A",
          "text": "Increasingly homogeneous/isodense due to centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Always completely hypodense without enhancement"
        },
        {
          "id": "C",
          "text": "Early wash-out with pseudocapsule"
        },
        {
          "id": "D",
          "text": "Only rim gas-filled"
        }
      ],
      "correct": "A",
      "explanation": "On portal venous and delayed phases, centripetal fill-in increases. The lesion becomes progressively more homogeneous and may approach liver signal or density."
    },
    {
      "id": "haemangiom-en-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Why can larger haemangiomas look heterogeneous?",
      "options": [
        {
          "id": "A",
          "text": "Due to fibrosis, calcifications or thrombi"
        },
        {
          "id": "B",
          "text": "Due to obligatory malignant transformation"
        },
        {
          "id": "C",
          "text": "Due to air in the bile ducts"
        },
        {
          "id": "D",
          "text": "Due to focal fat infiltration of the renal cortex"
        }
      ],
      "correct": "A",
      "explanation": "Larger haemangiomas may become heterogeneous because of internal fibrosis, calcifications or thrombi. This does not automatically make them malignant."
    },
    {
      "id": "haemangiom-en-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement fits an atypical liver haemangioma better?",
      "options": [
        {
          "id": "A",
          "text": "No classic peripheral nodular enhancement, sometimes strong homogeneous arterial enhancement"
        },
        {
          "id": "B",
          "text": "Always homogeneous light-bulb T2 and complete classic centripetal fill-in"
        },
        {
          "id": "C",
          "text": "Never any enhancement"
        },
        {
          "id": "D",
          "text": "Always gas formation and fluid level"
        }
      ],
      "correct": "A",
      "explanation": "Atypical haemangiomas may lack classic peripheral nodular enhancement and centripetal fill-in and instead show strong homogeneous arterial enhancement."
    },
    {
      "id": "haemangiom-en-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which finding best helps avoid misdiagnosing a haemangioma as metastasis?",
      "options": [
        {
          "id": "A",
          "text": "High ADC and multiphasic centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Low ADC and rapid wash-out"
        },
        {
          "id": "C",
          "text": "Irregular infiltrative growth"
        },
        {
          "id": "D",
          "text": "Capsular retraction with bile duct dilatation"
        }
      ],
      "correct": "A",
      "explanation": "High ADC values argue against true diffusion restriction. Together with multiphasic centripetal fill-in, this supports haemangioma."
    },
    {
      "id": "fnh-en-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement most accurately describes focal nodular hyperplasia (FNH)?",
      "options": [
        { "id": "A", "text": "Benign, regenerative liver lesion" },
        { "id": "B", "text": "Malignant primary liver tumour with metastatic potential" },
        { "id": "C", "text": "Bacterial liver abscess with central liquefaction" },
        { "id": "D", "text": "Cystic lesion with serous content" }
      ],
      "correct": "A",
      "explanation": "FNH is a benign, regenerative liver lesion, usually asymptomatic and not requiring treatment."
    },
    {
      "id": "fnh-en-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement about the epidemiology of FNH is correct?",
      "options": [
        { "id": "A", "text": "It is the most common benign liver lesion overall" },
        { "id": "B", "text": "It is the second most common benign liver lesion after haemangioma and predominantly affects women" },
        { "id": "C", "text": "It mainly occurs in elderly men" },
        { "id": "D", "text": "It is a precancerous lesion with a high risk of malignant transformation" }
      ],
      "correct": "B",
      "explanation": "After haemangioma, FNH is the second most common benign liver lesion, most often in young to middle-aged adults with a clear female predominance."
    },
    {
      "id": "fnh-en-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which Doppler finding is typical for FNH?",
      "options": [
        { "id": "A", "text": "Central vessel with radiating branches (spoke-wheel pattern)" },
        { "id": "B", "text": "Complete absence of vessels within the lesion" },
        { "id": "C", "text": "Only peripheral venous vessels without a central vessel" },
        { "id": "D", "text": "Arteriovenous fistula with shunt flow" }
      ],
      "correct": "A",
      "explanation": "The spoke-wheel pattern – a central vessel with radiating branches – is a typical, though not definitive, Doppler finding of FNH."
    },
    {
      "id": "fnh-en-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does a typical FNH behave on the early arterial phase of CT?",
      "options": [
        { "id": "A", "text": "Peripheral nodular, discontinuous enhancement" },
        { "id": "B", "text": "Strong, homogeneous enhancement" },
        { "id": "C", "text": "No enhancement in any phase" },
        { "id": "D", "text": "Ring-like enhancement with central necrosis" }
      ],
      "correct": "B",
      "explanation": "Unlike haemangioma, FNH shows strong, homogeneous enhancement in the early arterial phase without peripheral nodular enhancement."
    },
    {
      "id": "fnh-en-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is characteristic of FNH in the portal venous and delayed phases?",
      "options": [
        { "id": "A", "text": "Marked wash-out with hypodensity relative to the liver" },
        { "id": "B", "text": "No wash-out, with rapid equalisation to the liver parenchyma" },
        { "id": "C", "text": "Progressive increase in lesion size" },
        { "id": "D", "text": "Appearance of new peripheral nodules" }
      ],
      "correct": "B",
      "explanation": "FNH shows no wash-out and rapidly equalises with the liver parenchyma in the portal venous and delayed phases – an important distinguishing feature from malignant lesions."
    },
    {
      "id": "fnh-en-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does FNH typically appear on T1 and T2 relative to the liver parenchyma?",
      "options": [
        { "id": "A", "text": "Markedly hypointense on T1 and strongly hyperintense on T2 (light-bulb sign)" },
        { "id": "B", "text": "Iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2" },
        { "id": "C", "text": "Hyperintense on T1 and hypointense on T2" },
        { "id": "D", "text": "No signal on either sequence" }
      ],
      "correct": "B",
      "explanation": "FNH is usually iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2 relative to the liver parenchyma, so it is often only subtly visible on non-contrast images."
    },
    {
      "id": "fnh-en-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does the central scar of FNH behave on MRI?",
      "options": [
        { "id": "A", "text": "Hyperintense on T2, hypointense on T1, with delayed enhancement" },
        { "id": "B", "text": "Hypointense on both T2 and T1 without any enhancement" },
        { "id": "C", "text": "Hyperintense on T1 and isointense on T2" },
        { "id": "D", "text": "Only visible on CT, never on MRI" }
      ],
      "correct": "A",
      "explanation": "The central scar is hyperintense on T2, hypointense on T1, and shows delayed enhancement – characteristic in about 70% of cases."
    },
    {
      "id": "fnh-en-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which feature is most helpful to distinguish FNH from HCC?",
      "options": [
        { "id": "A", "text": "Absence of wash-out despite strong arterial enhancement" },
        { "id": "B", "text": "Presence of a true tumour capsule" },
        { "id": "C", "text": "Elevated alpha-fetoprotein" },
        { "id": "D", "text": "Multifocal occurrence" }
      ],
      "correct": "A",
      "explanation": "HCC typically shows wash-out in the portal venous/delayed phase, whereas FNH shows no wash-out despite strong arterial enhancement."
    },
    {
      "id": "fnh-en-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which features can occur in atypical FNH?",
      "options": [
        { "id": "A", "text": "Absent central scar, heterogeneous appearance, pseudocapsule, or intralesional fat" },
        { "id": "B", "text": "Exclusively calcified rim without any enhancement" },
        { "id": "C", "text": "Complete cystic transformation" },
        { "id": "D", "text": "Diffuse involvement of the entire liver" }
      ],
      "correct": "A",
      "explanation": "Atypical FNH (~20%) may occur without a central scar or show a heterogeneous appearance, pseudocapsule, absent scar enhancement, or intralesional fat, which can make differentiation from other liver tumours difficult."
    },
    {
      "id": "fnh-en-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the appropriate management of a typical, asymptomatic FNH?",
      "options": [
        { "id": "A", "text": "Generally no treatment, as it is benign and usually asymptomatic" },
        { "id": "B", "text": "Immediate surgical resection" },
        { "id": "C", "text": "Systemic chemotherapy" },
        { "id": "D", "text": "Transarterial chemoembolisation" }
      ],
      "correct": "A",
      "explanation": "FNH is benign, usually asymptomatic, and generally does not require treatment."
    },
    {
      "id": "avm-en-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What pathophysiologically characterises a hepatic arteriovenous malformation (AVM)?",
      "options": [
        { "id": "A", "text": "An abnormal direct connection between an artery and a venous vessel without an intervening capillary bed" },
        { "id": "B", "text": "A benign regenerative mass composed of hyperplastic liver tissue" },
        { "id": "C", "text": "A cystic mass containing serous fluid" },
        { "id": "D", "text": "A focal accumulation of fat within the liver parenchyma" }
      ],
      "correct": "A",
      "explanation": "A hepatic AVM is an abnormal direct connection between an artery and a venous vessel without an intervening capillary bed, allowing high-velocity, low-resistance blood flow directly from the arterial to the venous side."
    },
    {
      "id": "avm-en-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which shunt type is most common in hepatic AVMs?",
      "options": [
        { "id": "A", "text": "Arterioportal (hepatic artery to portal vein branch)" },
        { "id": "B", "text": "Portosystemic (portal vein to hepatic vein)" },
        { "id": "C", "text": "Purely arteriovenous (hepatic artery to hepatic vein) only" },
        { "id": "D", "text": "Venovenous between two hepatic veins" }
      ],
      "correct": "A",
      "explanation": "Arterioportal shunts - a connection between the hepatic artery and a portal vein branch - are the most common type of hepatic AV malformation."
    },
    {
      "id": "avm-en-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which condition is the most important congenital cause of multiple hepatic AVMs?",
      "options": [
        { "id": "A", "text": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease)" },
        { "id": "B", "text": "Wilson's disease" },
        { "id": "C", "text": "Haemochromatosis" },
        { "id": "D", "text": "Alpha-1 antitrypsin deficiency" }
      ],
      "correct": "A",
      "explanation": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease) is the most important congenital cause of multiple, diffusely distributed hepatic AV shunts."
    },
    {
      "id": "avm-en-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which cause best fits an acquired hepatic AVM?",
      "options": [
        { "id": "A", "text": "Iatrogenic, following liver biopsy or TIPS placement" },
        { "id": "B", "text": "A congenital liver cyst" },
        { "id": "C", "text": "Chronic viral hepatitis alone" },
        { "id": "D", "text": "A physiological age-related change" }
      ],
      "correct": "A",
      "explanation": "Acquired hepatic AVMs mainly arise from trauma or iatrogenic causes, such as liver biopsy, TIPS placement, or surgery."
    },
    {
      "id": "avm-en-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which Doppler pattern suggests an AV shunt within a hepatic vein or portal vein branch?",
      "options": [
        { "id": "A", "text": "Monophasic, continuous flow signal with very low velocity" },
        { "id": "B", "text": "Pulsatile, arterialised flow with high velocity" },
        { "id": "C", "text": "Complete flow reversal without pulsatility" },
        { "id": "D", "text": "Absent Doppler signal (\"silent vein\")" }
      ],
      "correct": "B",
      "explanation": "A pulsatile, arterialised high-velocity flow pattern in a vein indicates a direct AV shunt connection."
    },
    {
      "id": "avm-en-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does the resistive index (RI) of the feeding artery typically behave in an AV shunt?",
      "options": [
        { "id": "A", "text": "Markedly increased" },
        { "id": "B", "text": "Markedly decreased" },
        { "id": "C", "text": "Unchanged compared with the contralateral side" },
        { "id": "D", "text": "Not measurable" }
      ],
      "correct": "B",
      "explanation": "Due to the low resistance of the shunt, the resistive index of the feeding artery drops markedly, recognisable by a high diastolic flow velocity."
    },
    {
      "id": "avm-en-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the key CT sign of a hepatic AVM?",
      "options": [
        { "id": "A", "text": "Centripetal contrast filling in the delayed phase" },
        { "id": "B", "text": "Premature opacification of the draining vein during the arterial phase (\"early venous filling sign\")" },
        { "id": "C", "text": "Homogeneously hypodense lesion in all phases" },
        { "id": "D", "text": "Calcifications within the centre of the lesion" }
      ],
      "correct": "B",
      "explanation": "The early venous filling sign - premature arterial-phase opacification of the draining vein - is the key finding of a hepatic AVM on CT and MRI."
    },
    {
      "id": "avm-en-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the term for focal, wedge-shaped hyperperfusion around an AVM in the early arterial phase?",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "Central scar" },
        { "id": "C", "text": "Transient hepatic attenuation/intensity difference (THAD/THID)" },
        { "id": "D", "text": "Pseudocapsule" }
      ],
      "correct": "C",
      "explanation": "Transient, focal or wedge-shaped hyperperfusion around an AV shunt is called THAD/THID and can mimic a hypervascular lesion such as FNH or HCC."
    },
    {
      "id": "avm-en-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How do AV malformations typically appear on T1- and T2-weighted MRI sequences?",
      "options": [
        { "id": "A", "text": "Homogeneously hyperintense with slow, centripetal contrast enhancement like a haemangioma" },
        { "id": "B", "text": "As serpiginous signal-void structures (flow voids) due to rapid flow" },
        { "id": "C", "text": "As fat-equivalent signal intensity on all sequences" },
        { "id": "D", "text": "As a sharply circumscribed cystic mass with a fluid level" }
      ],
      "correct": "B",
      "explanation": "Rapidly flowing blood within dilated vessels produces flow voids - serpiginous, signal-void structures on T1- and T2-weighted sequences."
    },
    {
      "id": "avm-en-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What clinical consequence can result from extensive HHT-associated hepatic involvement with multiple AV shunts?",
      "options": [
        { "id": "A", "text": "Acute renal failure" },
        { "id": "B", "text": "High-output heart failure and portal hypertension" },
        { "id": "C", "text": "Acute pancreatitis" },
        { "id": "D", "text": "Hypothyroidism" }
      ],
      "correct": "B",
      "explanation": "Multiple hepatic AV shunts can lead to high-output heart failure via increased cardiac output, and to portal hypertension via arterioportal shunting."
    },
    {
      "id": "hcc-en-01", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "In which setting is non-invasive imaging diagnosis of HCC most reliable?",
      "options": [{"id":"A","text":"An appropriate high-risk setting, such as cirrhosis"},{"id":"B","text":"Every incidental liver lesion regardless of history"},{"id":"C","text":"Healthy children only"},{"id":"D","text":"Only after trauma"}],
      "correct": "A", "explanation": "The typical dynamic HCC pattern and LI-RADS apply to a defined high-risk population, particularly patients with cirrhosis or selected chronic liver disease."
    },
    {
      "id": "hcc-en-02", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which enhancement pattern is classic for HCC?",
      "options": [{"id":"A","text":"Non-rim APHE with non-peripheral wash-out"},{"id":"B","text":"Peripheral nodular enhancement with centripetal fill-in"},{"id":"C","text":"No enhancement in any phase"},{"id":"D","text":"Delayed scar enhancement only without APHE"}],
      "correct": "A", "explanation": "Non-rim arterial phase hyperenhancement followed by non-peripheral wash-out is the classic dynamic HCC pattern in an at-risk patient."
    },
    {
      "id": "hcc-en-03", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "What does wash-out mean in a liver lesion?",
      "options": [{"id":"A","text":"The lesion becomes relatively hypoenhancing to liver on later phases"},{"id":"B","text":"The lesion disappears completely"},{"id":"C","text":"Active bleeding is always present"},{"id":"D","text":"The lesion only increases in T2 signal"}],
      "correct": "A", "explanation": "Wash-out is relative: the lesion becomes darker than the progressively enhancing liver in the portal venous or delayed phase."
    },
    {
      "id": "hcc-en-04", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which finding describes capsule appearance?",
      "options": [{"id":"A","text":"A smooth peripheral enhancing rim on later phases"},{"id":"B","text":"A T2-bright central scar with delayed enhancement"},{"id":"C","text":"Complete lesion calcification"},{"id":"D","text":"A wedge-shaped perfusion change without a mass"}],
      "correct": "A", "explanation": "A smooth peripheral enhancing boundary in the portal venous or delayed phase represents capsule appearance and supports HCC."
    },
    {
      "id": "hcc-en-05", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "How does HCC typically appear in the hepatobiliary phase?",
      "options": [{"id":"A","text":"Hypointense relative to liver parenchyma"},{"id":"B","text":"Always markedly hyperintense"},{"id":"C","text":"Signal void like air"},{"id":"D","text":"Identical to vessels"}],
      "correct": "A", "explanation": "Most HCCs lack sufficient functioning hepatocytes and therefore appear hypointense in the hepatobiliary phase."
    },
    {
      "id": "hcc-en-06", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which DWI/ADC pattern can support HCC?",
      "options": [{"id":"A","text":"Restricted diffusion with low ADC"},{"id":"B","text":"Very high ADC without DWI signal"},{"id":"C","text":"T2 shine-through only without restriction"},{"id":"D","text":"Complete invisibility on DWI"}],
      "correct": "A", "explanation": "High cellularity can cause true diffusion restriction with high DWI signal and low ADC; this is supportive but not specific."
    },
    {
      "id": "hcc-en-07", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which finding most strongly suggests tumour in vein?",
      "options": [{"id":"A","text":"Enhancing soft tissue in a vein with tumour-like enhancement"},{"id":"B","text":"A homogeneous non-enhancing thrombus separate from the tumour"},{"id":"C","text":"Periportal oedema alone"},{"id":"D","text":"A simple cyst beside the portal vein"}],
      "correct": "A", "explanation": "Enhancing soft tissue within a vein suggests macrovascular tumour invasion and must be distinguished from bland thrombus."
    },
    {
      "id": "hcc-en-08", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which statement about infiltrative HCC is correct?",
      "options": [{"id":"A","text":"It may grow permeatively and show classic APHE/wash-out only focally"},{"id":"B","text":"It is always a sharply defined solitary lesion"},{"id":"C","text":"Vascular invasion is exceptionally rare"},{"id":"D","text":"Satellite lesions exclude the diagnosis"}],
      "correct": "A", "explanation": "Infiltrative HCC grows ill-defined across segments; classic enhancement may be heterogeneous or focal. Satellites and vascular invasion are common."
    },
    {
      "id": "hcc-en-09", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which feature favours HCC over typical FNH?",
      "options": [{"id":"A","text":"Portal venous or delayed wash-out"},{"id":"B","text":"Homogeneous APHE without wash-out"},{"id":"C","text":"T2-bright central scar with delayed enhancement"},{"id":"D","text":"Spoke-wheel Doppler pattern"}],
      "correct": "A", "explanation": "Typical FNH shows APHE but no wash-out. Portal venous or delayed wash-out is an important HCC feature in the correct risk setting."
    },
    {
      "id": "hcc-en-10", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "Which details are particularly important for radiological HCC staging?",
      "options": [{"id":"A","text":"Number, size, segment, satellites, vascular invasion and extrahepatic spread"},{"id":"B","text":"Ultrasound echogenicity only"},{"id":"C","text":"Patient age only"},{"id":"D","text":"Non-contrast density only"}],
      "correct": "A", "explanation": "Tumour burden, location, satellites, macrovascular invasion and metastases determine staging and treatment planning."
    },
    {
      "id": "sarkoidose-en-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which histological feature is typical of sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Caseating granulomas"
        },
        {
          "id": "B",
          "text": "Non-caseating granulomas"
        },
        {
          "id": "C",
          "text": "Eosinophilic microabscesses"
        },
        {
          "id": "D",
          "text": "Squamous tumour nests"
        }
      ],
      "correct": "B",
      "explanation": "Sarcoidosis is a systemic granulomatous disease of unknown cause. Non-caseating granulomas are typical."
    },
    {
      "id": "sarkoidose-en-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which HRCT nodule distribution is typical for sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatic along fissures, pleura and bronchovascular bundles"
        },
        {
          "id": "B",
          "text": "Purely random haematogenous without fissural relation"
        },
        {
          "id": "C",
          "text": "Only basal subpleural honeycombing"
        },
        {
          "id": "D",
          "text": "Exclusively centrilobular tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoidosis typically shows sharply defined 2–4 mm micronodules in a perilymphatic distribution along fissures, pleura, septa and bronchovascular bundles."
    },
    {
      "id": "sarkoidose-en-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does the 1-2-3 sign describe in sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Right hilum, left hilum and right paratracheal region"
        },
        {
          "id": "B",
          "text": "Three cavities in the right upper lobe"
        },
        {
          "id": "C",
          "text": "Three zones of pulmonary fibrosis"
        },
        {
          "id": "D",
          "text": "Three stages of cardiac sarcoidosis"
        }
      ],
      "correct": "A",
      "explanation": "The 1-2-3 sign describes the typical nodal distribution: right hilum, left hilum and right paratracheal region."
    },
    {
      "id": "sarkoidose-en-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which Scadding stage shows isolated bilateral hilar lymphadenopathy without parenchymal disease?",
      "options": [
        {
          "id": "A",
          "text": "Stage 0"
        },
        {
          "id": "B",
          "text": "Stage I"
        },
        {
          "id": "C",
          "text": "Stage III"
        },
        {
          "id": "D",
          "text": "Stage IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding stage I corresponds to isolated bilateral hilar lymphadenopathy with normal lung parenchyma."
    },
    {
      "id": "sarkoidose-en-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does Scadding stage II mean?",
      "options": [
        {
          "id": "A",
          "text": "Fibrosis only"
        },
        {
          "id": "B",
          "text": "Parenchymal disease without lymphadenopathy"
        },
        {
          "id": "C",
          "text": "Bilateral hilar lymphadenopathy plus parenchymal disease"
        },
        {
          "id": "D",
          "text": "Normal chest X-ray"
        }
      ],
      "correct": "C",
      "explanation": "Stage II means BHL plus lung parenchymal abnormalities. Stage III is parenchymal disease without BHL, and stage IV is fibrosis."
    },
    {
      "id": "sarkoidose-en-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which statement about eggshell calcifications is correct?",
      "options": [
        {
          "id": "A",
          "text": "They are pathognomonic for sarcoidosis"
        },
        {
          "id": "B",
          "text": "They can also occur in silicosis"
        },
        {
          "id": "C",
          "text": "They always prove lymphoma"
        },
        {
          "id": "D",
          "text": "They occur only in asbestosis"
        }
      ],
      "correct": "B",
      "explanation": "Eggshell-like nodal calcifications can occur in sarcoidosis but are not specific and are also seen in silicosis."
    },
    {
      "id": "sarkoidose-en-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What is the sarcoid galaxy sign?",
      "options": [
        {
          "id": "A",
          "text": "Large nodule surrounded by many small satellite nodules"
        },
        {
          "id": "B",
          "text": "Diffuse ground-glass opacity without nodules"
        },
        {
          "id": "C",
          "text": "Calcified pleural plaques"
        },
        {
          "id": "D",
          "text": "Central pulmonary embolism"
        }
      ],
      "correct": "A",
      "explanation": "The sarcoid galaxy sign consists of a larger granuloma aggregate surrounded by many small satellite nodules. It is not specific and can also occur in tuberculosis."
    },
    {
      "id": "sarkoidose-en-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which differential typically causes irregular nodular septal thickening, often unilateral or asymmetric?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangitic carcinomatosis"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "Heerfordt syndrome"
        },
        {
          "id": "D",
          "text": "Discoid meniscus"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangitic carcinomatosis often causes irregular nodular septal thickening and is frequently asymmetric or unilateral. Clinically, patients are often more severely ill."
    },
    {
      "id": "sarkoidose-en-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which triad defines Heerfordt syndrome?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, parotitis and facial palsy"
        },
        {
          "id": "B",
          "text": "Asthma, sinusitis and eosinophilia"
        },
        {
          "id": "C",
          "text": "Arthritis, urethritis and conjunctivitis"
        },
        {
          "id": "D",
          "text": "Haemoptysis, glomerulonephritis and sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Heerfordt syndrome is a manifestation of sarcoidosis with uveitis, parotitis and facial palsy."
    },
    {
      "id": "sarkoidose-en-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which modality is especially important for detecting cardiac sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "MRI with late gadolinium enhancement"
        },
        {
          "id": "B",
          "text": "Conventional knee radiograph"
        },
        {
          "id": "C",
          "text": "Gallbladder ultrasound"
        },
        {
          "id": "D",
          "text": "Non-contrast head CT"
        }
      ],
      "correct": "A",
      "explanation": "Cardiac sarcoidosis is commonly assessed with MRI and late gadolinium enhancement. Clinically, the increased risk of arrhythmias is important."
    },
    {
      "id": "rotatorenmanschette-en-01",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Which four muscles make up the rotator cuff?",
      "options": [
        { "id": "A", "text": "Supraspinatus, infraspinatus, teres minor, subscapularis" },
        { "id": "B", "text": "Deltoid, trapezius, latissimus dorsi, teres major" },
        { "id": "C", "text": "Biceps, triceps, coracobrachialis, pectoralis major" },
        { "id": "D", "text": "Supraspinatus, deltoid, teres minor, subscapularis" }
      ],
      "correct": "A",
      "explanation": "The rotator cuff consists of the supraspinatus, infraspinatus, teres minor and subscapularis muscles (mnemonic: SITS)."
    },
    {
      "id": "rotatorenmanschette-en-02",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Where is the so-called \"critical zone\" of the supraspinatus tendon located?",
      "options": [
        { "id": "A", "text": "About 1-2 cm proximal to its insertion on the greater tuberosity - a hypovascular zone" },
        { "id": "B", "text": "At the musculotendinous junction" },
        { "id": "C", "text": "At its origin on the scapula" },
        { "id": "D", "text": "At the biceps tendon origin on the glenoid" }
      ],
      "correct": "A",
      "explanation": "The critical zone lies about 1-2 cm proximal to the insertion on the greater tuberosity, is hypovascular, and is therefore a predilection site for degeneration and tears."
    },
    {
      "id": "rotatorenmanschette-en-03",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What is the main function of the subscapularis muscle?",
      "options": [
        { "id": "A", "text": "External rotation of the arm" },
        { "id": "B", "text": "Abduction of the arm" },
        { "id": "C", "text": "Internal rotation of the arm" },
        { "id": "D", "text": "Elevation of the arm above 90°" }
      ],
      "correct": "C",
      "explanation": "The subscapularis is the main internal rotator of the arm and, together with the infraspinatus, stabilises the humeral head in the transverse plane."
    },
    {
      "id": "rotatorenmanschette-en-04",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Which sequence combination is essential for assessing the rotator cuff?",
      "options": [
        { "id": "A", "text": "Only a single non-contrast axial T1 sequence" },
        { "id": "B", "text": "Fat-suppressed, fluid-sensitive sequences in at least two planes" },
        { "id": "C", "text": "Only a DWI sequence in one plane" },
        { "id": "D", "text": "Only a T1 sequence with contrast" }
      ],
      "correct": "B",
      "explanation": "A standardised protocol with fat-suppressed, fluid-sensitive sequences (e.g. PD/T2 fs) in at least two planes is essential to reliably detect tears."
    },
    {
      "id": "rotatorenmanschette-en-05",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What does the magic-angle phenomenon describe?",
      "options": [
        { "id": "A", "text": "A true tear that is only visible on T1 sequences" },
        { "id": "B", "text": "An artefactual signal increase on short-TE sequences (T1, PD) when a tendon runs at about 55° to the main magnetic field, which disappears on T2" },
        { "id": "C", "text": "Signal void caused by metal artefact" },
        { "id": "D", "text": "A motion artefact from breathing" }
      ],
      "correct": "B",
      "explanation": "The magic-angle phenomenon causes an artefactual signal increase on PD/T1 when the tendon runs at about 55° to the main magnetic field - on T2-weighted sequences it disappears, so it should not be mistaken for a true pathology."
    },
    {
      "id": "rotatorenmanschette-en-06",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "How does a bursal-sided partial tear of the supraspinatus tendon typically appear on MRI?",
      "options": [
        { "id": "A", "text": "Complete discontinuity of the tendon with retraction of the stump" },
        { "id": "B", "text": "Focal fluid rim between the tendon and subacromial bursa on T2 fs" },
        { "id": "C", "text": "Diffuse low signal of the entire tendon on T1 without further findings" },
        { "id": "D", "text": "Isolated bone marrow oedema in the humeral head without tendon change" }
      ],
      "correct": "B",
      "explanation": "A bursal-sided partial tear affects the superficial (bursal) fibres and shows a focal fluid rim between the tendon and subacromial bursa on T2 fs."
    },
    {
      "id": "rotatorenmanschette-en-07",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What does a PASTA lesion refer to?",
      "options": [
        { "id": "A", "text": "A full-thickness tear with grade 3 retraction according to Patte" },
        { "id": "B", "text": "An articular-sided partial tear at the footprint (Partial Articular Surface Tendon Avulsion)" },
        { "id": "C", "text": "An isolated subacromial bursitis without tendon involvement" },
        { "id": "D", "text": "Tendinopathy of the long head of biceps" }
      ],
      "correct": "B",
      "explanation": "PASTA stands for Partial Articular Surface Tendon Avulsion - an articular-sided partial tear of the deep fibres at the footprint, often associated with impingement."
    },
    {
      "id": "rotatorenmanschette-en-08",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "How does an intratendinous partial tear differ from pure tendinopathy?",
      "options": [
        { "id": "A", "text": "Tendinopathy shows complete discontinuity of the tendon" },
        { "id": "B", "text": "An intratendinous tear shows focal T2-hyperintense signal without contact to the bursa or joint, whereas tendinopathy shows PD/T1 signal elevation without a clear T2 fluid signal" },
        { "id": "C", "text": "The two are fundamentally indistinguishable on MRI" },
        { "id": "D", "text": "Tendinopathy always shows retraction of the tendon stump" }
      ],
      "correct": "B",
      "explanation": "An intratendinous partial tear shows focal T2-hyperintense signal without surface contact, while tendinopathy shows intratendinous PD/T1 signal elevation without a clear T2 fluid signal."
    },
    {
      "id": "rotatorenmanschette-en-09",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "From what extent of footprint involvement is surgical refixation often considered for a PASTA lesion?",
      "options": [
        { "id": "A", "text": "Footprint involvement of more than 50%" },
        { "id": "B", "text": "Footprint involvement of more than 10%" },
        { "id": "C", "text": "Only at 100% footprint involvement" },
        { "id": "D", "text": "Footprint involvement plays no role in the treatment decision" }
      ],
      "correct": "A",
      "explanation": "For a PASTA lesion, footprint involvement of more than 50% often prompts surgical refixation, whereas less than 50% is often managed conservatively or with debridement."
    },
    {
      "id": "rotatorenmanschette-en-10",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Which MRI sign is diagnostic of a full-thickness rotator cuff tear?",
      "options": [
        { "id": "A", "text": "An isolated signal increase on PD without a T2 correlate" },
        { "id": "B", "text": "Complete T2-hyperintense interruption of the tendon with fluid in the gap, connecting the joint and bursa" },
        { "id": "C", "text": "Tendon thickening without any signal change" },
        { "id": "D", "text": "Isolated subacromial bursitis without tendon involvement" }
      ],
      "correct": "B",
      "explanation": "A full-thickness tear shows complete T2-hyperintense interruption of the tendon with fluid in the gap - this creates direct communication between the glenohumeral joint and subacromial bursa."
    },
    {
      "id": "rotatorenmanschette-en-11",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What does the Patte classification describe?",
      "options": [
        { "id": "A", "text": "The degree of fatty muscle atrophy" },
        { "id": "B", "text": "The degree of retraction of the tendon stump (grade 1-3)" },
        { "id": "C", "text": "The size of a labral defect" },
        { "id": "D", "text": "The degree of subacromial bursitis" }
      ],
      "correct": "B",
      "explanation": "The Patte classification grades retraction of the tendon stump from grade 1 (close to the footprint) to grade 3 (at the level of the glenoid) and is decisive for surgical planning."
    },
    {
      "id": "rotatorenmanschette-en-12",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What does a positive tangent sign indicate on shoulder MRI?",
      "options": [
        { "id": "A", "text": "The humeral head crosses the tangent line between the acromion and coracoid - a sign of a massive tear" },
        { "id": "B", "text": "The supraspinatus tendon is normally configured" },
        { "id": "C", "text": "There is isolated tendinopathy of the long head of biceps" },
        { "id": "D", "text": "The subacromial bursa is thickened but the tendon is intact" }
      ],
      "correct": "A",
      "explanation": "In the tangent sign, the humeral head crosses the tangent line between the acromion and coracoid - this indicates a massive rotator cuff tear."
    },
    {
      "id": "rotatorenmanschette-en-13",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Which statement about the Goutallier classification is correct?",
      "options": [
        { "id": "A", "text": "It describes only tendon retraction" },
        { "id": "B", "text": "It grades fatty degeneration of the muscle from grade 0 (no fatty infiltration) to grade 4 (fat > muscle)" },
        { "id": "C", "text": "It is used only for partial tears" },
        { "id": "D", "text": "It is based exclusively on conventional radiographs" }
      ],
      "correct": "B",
      "explanation": "The Goutallier classification grades fatty muscle atrophy from grade 0 (no fatty infiltration) to grade 4 (fat > muscle). From grade 3-4 onwards, repair is generally considered unlikely to succeed."
    },
    {
      "id": "rotatorenmanschette-en-14",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Which factor can contribute to subacromial impingement?",
      "options": [
        { "id": "A", "text": "A particularly thin subacromial bursa" },
        { "id": "B", "text": "A Bigliani-type acromion with osteophytes or bursal thickening narrowing the subacromial space" },
        { "id": "C", "text": "Isolated tendinopathy of the long head of biceps" },
        { "id": "D", "text": "Isolated internal rotation weakness without structural change" }
      ],
      "correct": "B",
      "explanation": "A Bigliani-type acromion with osteophytes, AC joint osteoarthritis with inferior osteophytes, or bursal thickening can narrow the subacromial space and promote impingement."
    },
    {
      "id": "rotatorenmanschette-en-15",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "What is the significance of dislocation of the long head of biceps tendon from the bicipital groove?",
      "options": [
        { "id": "A", "text": "It is always an incidental finding without clinical relevance" },
        { "id": "B", "text": "It is an indirect sign of an associated subscapularis tendon tear" },
        { "id": "C", "text": "It proves a full-thickness tear of the supraspinatus tendon" },
        { "id": "D", "text": "It occurs only in children" }
      ],
      "correct": "B",
      "explanation": "Dislocation of the long head of biceps tendon from the bicipital groove is an indirect sign of an associated subscapularis tear, as the subscapularis tendon is part of the structures that keep the biceps tendon within the groove."
    }
  ],
  "fa": [
    ...CONTRAST_QUESTIONS.fa,
    ...DIVERTICULITIS_QUESTIONS.fa,
    ...STROKE_QUESTIONS.fa,
    ...ICB_QUESTIONS.fa,
    ...HIE_QUESTIONS.fa,
    ...SAB_QUESTIONS('fa'),
    ...EDH_QUESTIONS.fa,
    ...MIDLINE_CAVA_QUESTIONS.fa,
    ...SDH_QUESTIONS.fa,
    ...DISSECTION_QUESTIONS.fa,
    ...MOYAMOYA_QUESTIONS.fa,
    ...HMA_QUESTIONS.fa,
    ...CAA_QUESTIONS.fa,
    ...CADASIL_QUESTIONS.fa,
    ...DVA_QUESTIONS.fa,
    ...KAVERNOM_QUESTIONS.fa,
    ...NPH_QUESTIONS.fa,
    ...TELEANGIEKTASIE_QUESTIONS.fa,
    ...SVT_QUESTIONS.fa,
    ...FRAKTUR_QUESTIONS.fa,
    ...DAVF_QUESTIONS.fa,
    ...AVM_QUESTIONS.fa,
    ...FRAKTUR_KINDER_QUESTIONS.fa,
    ...AK_LUXATION_QUESTIONS.fa,
    ...RADIUSKOPF_QUESTIONS.fa,
    {
      "id": "meniskus-fa-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "چرا منیسک داخلی (Meniscus medialis) در مقایسه با منیسک خارجی به طور معناداری بیشتر دچار پارگی‌های تروماتیک (ناشی از ضربه) می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به دلیل شکل C مانند خود، از نظر آناتومیک پایداری کمتری دارد."
        },
        {
          "id": "B",
          "text": "به کپسول مفصلی و رباط جانبی داخلی (MCL) چسبیده است و در نتیجه تحرک کمتری دارد."
        },
        {
          "id": "C",
          "text": "در تمام پهنای خود دارای خون‌رسانی کاملاً غیرعروقی (بدون رگ) است."
        },
        {
          "id": "D",
          "text": "برعکس منیسک خارجی، با کندیل‌های فمور (استخوان ران) مفصل نمی‌شود."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: شکل C در منیسک داخلی و شکل O در منیسک خارجی، واریانت‌های آناتومیک نرمال هستند که با شکل پلاتوی تیبیا مطابقت دارند. این اشکال هندسی به خودی خود باعث ناپایداری مکانیکی بافت نمی‌شوند.\n\nب صحیح است: اتصال محکم منیسک داخلی به کپسول مفصلی و رباط جانبی داخلی (MCL) تحرک آن را به شدت محدود می‌کند. در هنگام حرکات چرخشی یا اعمال نیروهای برشی ناگهانی، این منیسک – برخلاف منیسک خارجی که آزاد و متحرک است – نمی‌تواند جابجا شود و پاره می‌شود.\n\nج غلط است: هر دو منیسک ساختار عروقی مشابهی دارند؛ یعنی در محیط (ناحیه قرمز) دارای رگ‌های خونی هستند و به سمت مرکز بدون رگ (آواسکولار) می‌شوند. منیسک داخلی کاملاً فاقد عروق نیست.\n\nد غلط است: هر دو منیسک از سمت بالا (پروکسیمال) با کندیل‌های فمور و از سمت پایین (دیستال) با پلاتوی تیبیا مفصل می‌شوند تا وظیفه اصلی خود یعنی توزیع بار و جذب ضربه را در مفصل انجام دهند."
    },
    {
      "id": "meniskus-fa-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "طبق قانون شناخته‌شده‌ی \"Two-slice-touch\" (تماس در دو تصویر)، چه معیاری باید وجود داشته باشد تا تشخیص پارگی منیسک در MRI با دقت و ویژگی بالا تایید شود؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال باید هم با سطح مفصلی بالایی (سوپریور) و هم پایینی (اینفریور) تماس داشته باشد."
        },
        {
          "id": "B",
          "text": "افزایش سیگنال باید حداقل در دو تصویر (برش) متوالی که با سطح مفصلی تماس دارند، دیده شود."
        },
        {
          "id": "C",
          "text": "پارگی باید در دو سکانس مختلف (مانند T1w و T2w) قابل رویت باشد."
        },
        {
          "id": "D",
          "text": "طول ضایعه در صفحه ساجیتال باید حداقل ۳ میلی‌متر باشد."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: یک پارگی نیازی ندارد که کل ارتفاع منیسک را طی کند. اگر سیگنال پاتولوژیک فقط به سطح مفصلی بالایی (سوپریور) یا فقط به سطح پایینی (اینفریور) رسیده باشد، برای تشخیص کفایت می‌کند.\n\nب صحیح است: این قانون تصریح می‌کند که سیگنال افزایش‌یافته‌ی داخل منیسک باید حداقل در دو برش مجاور و پشت‌سرهم با سطح مفصل تماس داشته باشد. این معیار خطر اشتباه گرفتن نویزهای تکنیکی دستگاه یا پدیده حجم متوسط (Volume Averaging) در یک تک‌برش را با پارگی واقعی از بین می‌برد.\n\nج غلط است: اگرچه بررسی پارگی در سکانس‌ها و صفحات مختلف (ساجیتال/کورونال) ایده‌آل است، اما قانون خاص \"Two-slice-touch\" صرفاً بر تداوم ضایعه در برش‌های متوالی یک سکانس واحد تاکید دارد.\n\nد غلط است: این قانون مستقل از اندازه‌گیری‌های مطلق به میلی‌متر است و فقط بر اساس تعداد برش‌های درگیر تعریف می‌شود، حتی اگر ضخامت استاندارد برش‌ها در پروتکل معمولاً ۳ میلی‌متر باشد."
    },
    {
      "id": "meniskus-fa-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "پارگی منیسک در کدام ناحیه عروقی (خون‌رسانی)، بهترین شرایط بیولوژیکی را برای یک جراحی ترمیم و دوختن موفقیت‌آمیز (Suture) دارد؟",
      "options": [
        {
          "id": "A",
          "text": "ناحیه سفید (Zone III)"
        },
        {
          "id": "B",
          "text": "ناحیه قرمز-سفید (Zone II)"
        },
        {
          "id": "C",
          "text": "ناحیه قرمز (Zone I)"
        },
        {
          "id": "D",
          "text": "ریشه منیسک (Root)"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: ناحیه سفید یک‌سوم مرکزی منیسک را تشکیل می‌دهد، کاملاً آواسکولار (بدون رگ) است و تغذیه آن صرفاً از طریق انتشار (دیفیوژن) مایع سینوویال انجام می‌شود. بخیه زدن در این ناحیه به دلیل عدم پتانسیل ترمیم بافتی تقریباً همیشه شکست می‌خورد.\n\nب غلط است: ناحیه قرمز-سفید یک منطقه بینابینی است (حدود ۳ تا ۵ میلی‌متر از کپسول). در این ناحیه خون‌رسانی مویرگی بسیار محدودی وجود دارد، به همین دلیل پیش‌آگهی و روند ترمیم بافت پس از بخیه زدن نامشخص و نامطمئن است.\n\nج صحیح است: ناحیه قرمز (Zone I) شامل لبه بیرونی و مجاور کپسول مفصلی است (فاصله کمتر از ۳ میلی‌متر). این ناحیه مستقیماً از طریق شبکه مویرگی دور منیسکی خون‌رسانی می‌شود. شرایط بیولوژیک برای مهاجرت فیبروبلاست‌ها و ترمیم بافت در اینجا ایده‌آل است و جوش خوردن بخیه را تسهیل می‌کند.\n\nد غلط است: ریشه‌های منیسک (Roots) محل اتصال لیگامانی شاخ‌های منیسک به پلاتوی تیبیا هستند. این بخش‌ها یک ناحیه عروقی در تنه کارکردی منیسک محسوب نمی‌شوند."
    },
    {
      "id": "meniskus-fa-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "طبق پروتکل‌های استاندارد، کدام سکانس MRI بهترین گزینه برای تشخیص قطعی پارگی‌های حاد منیسک، ادم (تجمع مایع) مغز استخوان و پارگی رباط‌ها است؟",
      "options": [
        {
          "id": "A",
          "text": "سکانس T1 معمولی بدون حذف چربی."
        },
        {
          "id": "B",
          "text": "سکانس‌های T2-weighted یا فشرده با حذف چربی (PD-fs)."
        },
        {
          "id": "C",
          "text": "سکانس‌های سه‌بعدی Gradient-Echo با ضخامت برش ۶ میلی‌متر."
        },
        {
          "id": "D",
          "text": "آنژیوگرافی تداخل فاز با وزن T2*."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: سکانس T1 معمولی اگرچه آناتومی را به خوبی نشان می‌دهد و برای ارزیابی فیبروز مزمن مفید است، اما به مایعات حساس نیست. مایع حاد وارد شده به خط پارگی یا ادم مغز استخوان در این سکانس به درستی تفکیک نمی‌شوند.\n\nب صحیح است: سکانس‌های T2 یا PD-fs (پروتون دنسیتی با حذف چربی) به شدت به آب آزاد حساس هستند. از آنجا که پاتولوژی‌هایی مانند خط پارگی (پر شده با مایع سینوویال) یا ادم حاوی آب زیادی هستند، در این سکانس‌ها به صورت هایپرینتنس (روشن و سفید) در یک پس‌زمینه تاریک و حذف‌شده به خوبی دیده می‌شوند.\n\nج غلط است: ضخامت برش ۶ میلی‌متر برای تشخیص ضایعات داخلی زانو بسیار ضخیم است. پارگی‌های کوچک به دلیل پدیده حجم متوسط کاملاً محو می‌شوند. استاندارد پروتکل حداکثر ۳ میلی‌متر است.\n\nد غلط است: آنژیوگرافی تداخل فاز برای نشان دادن دینامیک جریان خون در رگ‌ها کاربرد دارد و برای ارزیابی بافت‌های استاتیک و غضروفی-فیبری مفصل زانو کاملاً بی‌استفاده است."
    },
    {
      "id": "meniskus-fa-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "نحوه توزیع و پخش شدن پارگی‌ها در شاخ پشتی (Hinterhorn) منیسک خارجی چه تفاوتی با منیسک داخلی دارد؟",
      "options": [
        {
          "id": "A",
          "text": "در منیسک خارجی، تقریباً تمام پارگی‌ها شاخ جلویی را درگیر می‌کنند."
        },
        {
          "id": "B",
          "text": "در منیسک خارجی حدود ۵۰٪ پارگی‌ها در شاخ پشتی رخ می‌دهد، در حالی که در منیسک داخلی حدود ۹۸٪ پارگی‌ها مربوط به شاخ پشتی است."
        },
        {
          "id": "C",
          "text": "پارگی در شاخ پشتی منیسک خارجی به دلیل شکل O مانند آن اصلاً رخ نمی‌دهد."
        },
        {
          "id": "D",
          "text": "میزان توزیع پارگی در هر دو منیسک کاملاً یکسان و مشابه است."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: اگرچه شاخ جلویی منیسک خارجی بیشتر از منیسک داخلی دچار پارگی می‌شود، اما به هیچ وجه شامل تمام یا حتی اکثریت پارگی‌های منیسک خارجی نیست.\n\nب صحیح است: شاخ پشتی منیسک داخلی به دلیل تثبیت بودن، نقطه اتکای مکانیکی در حرکات زانو است و استرس شدیدی را تحمل می‌کند؛ به همین دلیل نزدیک به ۹۸٪ پارگی‌های آن در این ناحیه است. منیسک خارجی متحرک‌تر است؛ بنابراین تنها نیمی از پارگی‌های آن در شاخ پشتی رخ می‌دهد و بقیه در بدنه (Corpus) و شاخ جلویی پخش می‌شوند.\n\nج غلط است: شکل هندسی O مانند، منیسک خارجی را در برابر آسیب مصون نمی‌کند. از نظر آماری، شاخ پشتی همچنان با ۵۰٪ موارد، شایع‌ترین محل پارگی در منیسک خارجی است.\n\nد غلط است: به دلیل تفاوت‌های ساختاری و بیومکانیکی در میزان تثبیت و تحرک، منیسک داخلی و خارجی الگوهای توزیع ضایعه کاملاً متفاوتی را نشان می‌دهند."
    },
    {
      "id": "meniskus-fa-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "یک گزارش رادیولوژی، وجود یک سیگنال گوهه‌ای شکل یا گرد (Globular) را در بافت منیسک توصیف می‌کند که در تصویر موجود، پاره شده و به سطح مفصل نرسیده است. این وضعیت با کدام ساب‌تایپ (زیرگروه) سیستم درجه‌بندی Lotysch مطابقت دارد؟",
      "options": [
        {
          "id": "A",
          "text": "درجه 2a"
        },
        {
          "id": "B",
          "text": "درجه 2b"
        },
        {
          "id": "C",
          "text": "درجه 2c"
        },
        {
          "id": "D",
          "text": "درجه ۳"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: درجه 2a دقیقاً به عنوان یک سیگنال خطی (خط‌مانند) در داخل منیسک تعریف می‌شود که هیچ اتصالی با سطح مفصلی بالایی یا پایینی ندارد و فاقد هرگونه گسترش وسیع یا گرد است.\n\nب غلط است: درجه 2b نیز یک سیگنال خطی را توصیف می‌کند، با این تفاوت که سیگنال دقیقاً در یک تک‌برش با سطح مفصل تماس پیدا می‌کند که این یافته را برای پارگی قطعی غیرقابل استناد (Inconclusive) می‌سازد.\n\nج صحیح است: یک سیگنال درون‌منیسکی به شکل گوهه‌ای، وسیع یا گرد (Globular) که به طور قطعی سطح را قطع نکرده است، طبق سیستم لوتیش درجه 2c نامیده می‌شود. این حالت نشان‌دهنده دژنراسیون موکوئید پیشرفته است و ریسک بسیار بالایی برای یک پارگی مخفی (Occult) دارد.\n\nد غلط است: درجه ۳ مستلزم آن است که سیگنال به طور واضح و تکرارپذیر (حداقل در دو برش متوالی) سطح مفصلی را قطع کرده باشد. تا زمانی که تماس با سطح احراز نشود، تشخیص درجه ۳ مجاز نیست."
    },
    {
      "id": "haemangiom-fa-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت همانژیوم کبدی را دقیق‌تر توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "مالفورماسیون کاورنوز غیرنئوپلاستیک"
        },
        {
          "id": "B",
          "text": "متاستاز داخل کبدی همراه نکروز"
        },
        {
          "id": "C",
          "text": "ضایعه پیش‌بدخیم هپاتوسلولار"
        },
        {
          "id": "D",
          "text": "آبسه باکتریال کبد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کبدی یک مالفورماسیون عروقی کاورنوز و غیرنئوپلاستیک است و شایع‌ترین تومور جامد خوش‌خیم کبد محسوب می‌شود."
    },
    {
      "id": "haemangiom-fa-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته سونوگرافی برای همانژیوم کوچک کبدی تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعه اکوژن و خوش‌حد"
        },
        {
          "id": "B",
          "text": "ضایعه هیپواکو و بدحد همراه با کشیدگی کپسول"
        },
        {
          "id": "C",
          "text": "اکوهای گاز با سایه خلفی"
        },
        {
          "id": "D",
          "text": "ضخیم‌شدن منتشر دیواره کیسه صفرا"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم تیپیک در سونوگرافی معمولاً اکوژن و خوش‌حد است. اگر مورفولوژی کلاسیک باشد، اغلب تصویربرداری بیشتر لازم نیست."
    },
    {
      "id": "haemangiom-fa-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی CT دینامیک برای همانژیوم کبدی کلاسیک است؟",
      "options": [
        {
          "id": "A",
          "text": "enhancement ندولار محیطی و ناپیوسته با پرشدگی مرکزگرا"
        },
        {
          "id": "B",
          "text": "wash-in شریانی با wash-out پورتال و کپسول"
        },
        {
          "id": "C",
          "text": "ضایعه نازک‌دیواره بدون enhancement"
        },
        {
          "id": "D",
          "text": "رشد انفیلتراتیو منتشر در امتداد مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "الگوی کلاسیک همانژیوم، enhancement ندولار و ناپیوسته محیطی است که در فازهای بعدی به صورت مرکزگرا پر می‌شود."
    },
    {
      "id": "haemangiom-fa-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "پدیده Iris diaphragm در همانژیوم کبدی چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "پرشدگی ضایعه از محیط به مرکز"
        },
        {
          "id": "B",
          "text": "wash-out مرکزی در فاز تأخیری"
        },
        {
          "id": "C",
          "text": "قطع ناگهانی پرفیوژن در ناف کبد"
        },
        {
          "id": "D",
          "text": "کپسول حلقوی آبسه"
        }
      ],
      "correct": "A",
      "explanation": "پدیده Iris diaphragm یعنی پرشدگی مرکزگرا با ماده حاجب از حاشیه به سمت مرکز."
    },
    {
      "id": "haemangiom-fa-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته MRI برای همانژیوم کلاسیک کبدی بسیار تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال T2 بسیار بالا به صورت Light-bulb sign"
        },
        {
          "id": "B",
          "text": "ناحیه چربی T1 هایپراینتنس با افت سیگنال در opposed phase"
        },
        {
          "id": "C",
          "text": "سیگنال T2 پایین شبیه بافت فیبروتیک"
        },
        {
          "id": "D",
          "text": "فقط محدودیت انتشار مرکزی بدون enhancement"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کلاسیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. این Light-bulb sign یک سرنخ مهم تشخیصی است."
    },
    {
      "id": "haemangiom-fa-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "الگوی تیپیک DWI/ADC در همانژیوم کبدی چیست؟",
      "options": [
        {
          "id": "A",
          "text": "DWI روشن، ADC بالا: T2 shine-through"
        },
        {
          "id": "B",
          "text": "DWI روشن، ADC پایین: محدودیت قطعی"
        },
        {
          "id": "C",
          "text": "DWI تیره، ADC غیرقابل اندازه‌گیری"
        },
        {
          "id": "D",
          "text": "DWI و ADC همیشه طبیعی"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم ممکن است در b-value بالا روشن باشد. اما ADC بالا نشان‌دهنده T2 shine-through است و محدودیت انتشار واقعی نیست."
    },
    {
      "id": "haemangiom-fa-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "همانژیوم تیپیک در فازهای تأخیری کنتراست چگونه دیده می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به علت پرشدگی مرکزگرا به‌تدریج هموژن یا ایزواینتنس می‌شود"
        },
        {
          "id": "B",
          "text": "همیشه کاملاً هیپودنس و بدون enhancement می‌ماند"
        },
        {
          "id": "C",
          "text": "wash-out زودرس با pseudocapsule"
        },
        {
          "id": "D",
          "text": "فقط حاشیه پر از گاز دارد"
        }
      ],
      "correct": "A",
      "explanation": "در فاز پورتال و تأخیری، پرشدگی مرکزگرا بیشتر می‌شود و ضایعه به دانسیته/سیگنال خون یا کبد نزدیک می‌شود."
    },
    {
      "id": "haemangiom-fa-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "چرا همانژیوم‌های بزرگ‌تر ممکن است ناهمگون دیده شوند؟",
      "options": [
        {
          "id": "A",
          "text": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز"
        },
        {
          "id": "B",
          "text": "به علت تبدیل بدخیم اجباری"
        },
        {
          "id": "C",
          "text": "به علت هوا در مجاری صفراوی"
        },
        {
          "id": "D",
          "text": "به علت نفوذ چربی در قشر کلیه"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم‌های بزرگ‌تر ممکن است به علت فیبروز داخلی، کلسیفیکاسیون یا ترومبوز ناهمگون شوند. این به‌تنهایی به معنی بدخیمی نیست."
    },
    {
      "id": "haemangiom-fa-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت بیشتر با همانژیوم آتیپیک کبدی تطابق دارد؟",
      "options": [
        {
          "id": "A",
          "text": "نبود enhancement ندولار محیطی کلاسیک، گاهی enhancement هموژن و قوی شریانی"
        },
        {
          "id": "B",
          "text": "همیشه T2 کاملاً Light-bulb و پرشدگی مرکزگرای کلاسیک کامل"
        },
        {
          "id": "C",
          "text": "هیچ‌وقت enhancement ندارد"
        },
        {
          "id": "D",
          "text": "همیشه گاز و سطح مایع دارد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم آتیپیک ممکن است enhancement ندولار محیطی و پرشدگی مرکزگرای کلاسیک را نداشته باشد و به جای آن enhancement هموژن و قوی شریانی نشان دهد."
    },
    {
      "id": "haemangiom-fa-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته بیشتر کمک می‌کند همانژیوم با متاستاز اشتباه نشود؟",
      "options": [
        {
          "id": "A",
          "text": "ADC بالا و پرشدگی چندفازی مرکزگرا"
        },
        {
          "id": "B",
          "text": "ADC پایین و wash-out سریع"
        },
        {
          "id": "C",
          "text": "رشد انفیلتراتیو نامنظم"
        },
        {
          "id": "D",
          "text": "کشیدگی کپسول همراه با اتساع مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "ADC بالا علیه محدودیت انتشار واقعی است. همراه با پرشدگی مرکزگرای چندفازی، تشخیص همانژیوم را تقویت می‌کند."
    },
    {
      "id": "fnh-fa-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام گزینه هیپرپلازی ندولار فوکال (FNH) را به‌درستی توصیف می‌کند؟",
      "options": [
        { "id": "A", "text": "ضایعه خوش‌خیم و رژنراتیو کبد" },
        { "id": "B", "text": "تومور بدخیم اولیه کبد با پتانسیل متاستاز" },
        { "id": "C", "text": "آبسه باکتریایی کبد با ذوب مرکزی" },
        { "id": "D", "text": "ضایعه کیستیک با محتوای سروز" }
      ],
      "correct": "A",
      "explanation": "FNH یک ضایعه خوش‌خیم و رژنراتیو کبد است، معمولاً بدون علامت و بدون نیاز به درمان."
    },
    {
      "id": "fnh-fa-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام گزینه درباره اپیدمیولوژی FNH صحیح است؟",
      "options": [
        { "id": "A", "text": "شایع‌ترین ضایعه خوش‌خیم کبد به‌طور کلی است" },
        { "id": "B", "text": "بعد از همانژیوم، دومین ضایعه خوش‌خیم شایع کبد است و بیشتر در زنان دیده می‌شود" },
        { "id": "C", "text": "بیشتر در مردان مسن دیده می‌شود" },
        { "id": "D", "text": "یک ضایعه پره‌کانسر با خطر بالای بدخیمی است" }
      ],
      "correct": "B",
      "explanation": "بعد از همانژیوم، FNH دومین ضایعه خوش‌خیم شایع کبد است؛ بیشتر در بالغین جوان تا میانسال با غلبه واضح در زنان."
    },
    {
      "id": "fnh-fa-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام یافته داپلر برای FNH تیپیک است؟",
      "options": [
        { "id": "A", "text": "عروق مرکزی با شاخه‌های رادیال (الگوی spoke-wheel)" },
        { "id": "B", "text": "نبود کامل عروق در ضایعه" },
        { "id": "C", "text": "فقط عروق وریدی محیطی بدون عروق مرکزی" },
        { "id": "D", "text": "فیستول شریانی-وریدی با جریان شانت" }
      ],
      "correct": "A",
      "explanation": "الگوی spoke-wheel - یک عروق مرکزی با شاخه‌های رادیال - یافته داپلر تیپیک ولی غیرقطعی برای FNH است."
    },
    {
      "id": "fnh-fa-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "رفتار FNH تیپیک در فاز شریانی زودرس CT چگونه است؟",
      "options": [
        { "id": "A", "text": "enhancement ندولار محیطی و ناپیوسته" },
        { "id": "B", "text": "enhancement قوی و هموژن" },
        { "id": "C", "text": "بدون enhancement در هیچ فازی" },
        { "id": "D", "text": "enhancement حلقوی با نکروز مرکزی" }
      ],
      "correct": "B",
      "explanation": "برخلاف همانژیوم، FNH در فاز شریانی زودرس enhancement قوی و هموژن دارد، بدون enhancement ندولار محیطی."
    },
    {
      "id": "fnh-fa-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ویژگی تیپیک FNH در فاز پورتال و تأخیری چیست؟",
      "options": [
        { "id": "A", "text": "wash-out واضح با هیپودنسیته نسبت به کبد" },
        { "id": "B", "text": "بدون wash-out، با تطابق سریع با پارانشیم کبد" },
        { "id": "C", "text": "افزایش تدریجی اندازه ضایعه" },
        { "id": "D", "text": "ظهور ندول‌های محیطی جدید" }
      ],
      "correct": "B",
      "explanation": "FNH هیچ wash-out نشان نمی‌دهد و در فاز پورتال و تأخیری به‌سرعت با پارانشیم کبد تطابق می‌یابد - یک ویژگی افتراقی مهم از ضایعات بدخیم."
    },
    {
      "id": "fnh-fa-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ضایعه FNH معمولاً در T1 و T2 چگونه دیده می‌شود؟",
      "options": [
        { "id": "A", "text": "به‌وضوح هیپواینتنس در T1 و به‌شدت هایپراینتنس در T2 (light-bulb sign)" },
        { "id": "B", "text": "ایزو تا کمی هیپواینتنس در T1 و ایزو تا کمی هایپراینتنس در T2" },
        { "id": "C", "text": "هایپراینتنس در T1 و هیپواینتنس در T2" },
        { "id": "D", "text": "بدون سیگنال در هر دو سکانس" }
      ],
      "correct": "B",
      "explanation": "FNH معمولاً نسبت به پارانشیم کبد در T1 ایزو تا کمی هیپواینتنس و در T2 ایزو تا کمی هایپراینتنس است، بنابراین در تصاویر بدون کنتراست اغلب فقط به‌طور خفیف قابل مشاهده است."
    },
    {
      "id": "fnh-fa-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "اسکار مرکزی FNH در MRI چگونه رفتار می‌کند؟",
      "options": [
        { "id": "A", "text": "هایپراینتنس در T2، هیپواینتنس در T1، با enhancement تأخیری" },
        { "id": "B", "text": "هیپواینتنس در T2 و T1 بدون هیچ enhancement" },
        { "id": "C", "text": "هایپراینتنس در T1 و ایزواینتنس در T2" },
        { "id": "D", "text": "فقط در CT قابل مشاهده است، هرگز در MRI" }
      ],
      "correct": "A",
      "explanation": "اسکار مرکزی در T2 هایپراینتنس، در T1 هیپواینتنس است و enhancement تأخیری دارد - تیپیک در حدود ۷۰٪ موارد."
    },
    {
      "id": "fnh-fa-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام ویژگی بیشترین کمک به افتراق FNH از HCC می‌کند؟",
      "options": [
        { "id": "A", "text": "نبود wash-out به‌رغم enhancement شریانی قوی" },
        { "id": "B", "text": "وجود کپسول واقعی تومور" },
        { "id": "C", "text": "افزایش آلفافتوپروتئین" },
        { "id": "D", "text": "وقوع چندکانونی" }
      ],
      "correct": "A",
      "explanation": "HCC معمولاً در فاز پورتال/تأخیری wash-out دارد، در حالی که FNH به‌رغم enhancement شریانی قوی، wash-out ندارد."
    },
    {
      "id": "fnh-fa-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام ویژگی‌ها می‌توانند در FNH آتیپیک دیده شوند؟",
      "options": [
        { "id": "A", "text": "نبود اسکار مرکزی، ظاهر هتروژن، پسودوکپسول یا چربی داخل ضایعه" },
        { "id": "B", "text": "فقط حاشیه کلسیفیه بدون هیچ enhancement" },
        { "id": "C", "text": "تبدیل کامل کیستیک" },
        { "id": "D", "text": "درگیری منتشر کل کبد" }
      ],
      "correct": "A",
      "explanation": "FNH آتیپیک (~۲۰٪) ممکن است بدون اسکار مرکزی باشد یا ظاهر هتروژن، پسودوکپسول، عدم enhancement اسکار یا چربی داخل ضایعه نشان دهد، که افتراق از سایر تومورهای کبدی را دشوار می‌کند."
    },
    {
      "id": "fnh-fa-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "رویکرد مناسب برای FNH تیپیک و بدون علامت چیست؟",
      "options": [
        { "id": "A", "text": "معمولاً بدون درمان، چون خوش‌خیم و معمولاً بدون علامت است" },
        { "id": "B", "text": "رزکسیون جراحی فوری" },
        { "id": "C", "text": "شیمی‌درمانی سیستمیک" },
        { "id": "D", "text": "آمبولیزاسیون شیمیایی ترانس‌آرتریال" }
      ],
      "correct": "A",
      "explanation": "FNH خوش‌خیم است، معمولاً بدون علامت است و معمولاً نیاز به درمان ندارد."
    },
    {
      "id": "avm-fa-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مالفورماسیون شریانی-وریدی (AVM) کبد از نظر پاتوفیزیولوژیک با چه چیزی مشخص می‌شود؟",
      "options": [
        { "id": "A", "text": "ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط" },
        { "id": "B", "text": "یک توده رژنراتیو خوش‌خیم متشکل از بافت کبدی هیپرپلاستیک" },
        { "id": "C", "text": "یک توده کیستیک حاوی مایع سروز" },
        { "id": "D", "text": "تجمع فوکال چربی در پارانشیم کبد" }
      ],
      "correct": "A",
      "explanation": "AVM کبدی یک ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط است که باعث جریان خون مستقیم با سرعت بالا و مقاومت پایین از سمت شریانی به وریدی می‌شود."
    },
    {
      "id": "avm-fa-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "شایع‌ترین نوع شانت در AVM‌های کبدی کدام است؟",
      "options": [
        { "id": "A", "text": "آرتریوپورتال (شریان کبدی به شاخه ورید پورت)" },
        { "id": "B", "text": "پورتوسیستمیک (ورید پورت به ورید کبدی)" },
        { "id": "C", "text": "صرفاً آرتریوونوس (شریان کبدی به ورید کبدی)" },
        { "id": "D", "text": "ونو-ونوس بین دو ورید کبدی" }
      ],
      "correct": "A",
      "explanation": "شانت‌های آرتریوپورتال - ارتباط بین شریان کبدی و یک شاخه ورید پورت - شایع‌ترین نوع مالفورماسیون شریانی-وریدی کبد هستند."
    },
    {
      "id": "avm-fa-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مهم‌ترین علت کنژنیتال AVM‌های متعدد کبدی کدام بیماری است؟",
      "options": [
        { "id": "A", "text": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu)" },
        { "id": "B", "text": "بیماری ویلسون" },
        { "id": "C", "text": "هموکروماتوز" },
        { "id": "D", "text": "کمبود آلفا-1-آنتی‌تریپسین" }
      ],
      "correct": "A",
      "explanation": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu) مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد و منتشر کبدی است."
    },
    {
      "id": "avm-fa-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام علت بیشتر با AVM کبدی اکتسابی مطابقت دارد؟",
      "options": [
        { "id": "A", "text": "علت ایاتروژنیک، پس از بیوپسی کبد یا انجام TIPS" },
        { "id": "B", "text": "کیست کبدی کنژنیتال" },
        { "id": "C", "text": "هپاتیت ویروسی مزمن به‌تنهایی" },
        { "id": "D", "text": "تغییر فیزیولوژیک مرتبط با سن" }
      ],
      "correct": "A",
      "explanation": "AVM‌های کبدی اکتسابی معمولاً ناشی از تروما یا علل ایاتروژنیک مانند بیوپسی کبد، TIPS یا جراحی هستند."
    },
    {
      "id": "avm-fa-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام الگوی داپلر نشان‌دهنده شانت شریانی-وریدی در یک ورید کبدی یا شاخه ورید پورت است؟",
      "options": [
        { "id": "A", "text": "سیگنال جریان مونوفازیک و پیوسته با سرعت بسیار پایین" },
        { "id": "B", "text": "جریان پولساتیل و آرتریالیزه با سرعت بالا" },
        { "id": "C", "text": "معکوس‌شدن کامل جریان بدون پولساتیلیتی" },
        { "id": "D", "text": "عدم وجود سیگنال داپلر (\"ورید ساکت\")" }
      ],
      "correct": "B",
      "explanation": "الگوی جریان پولساتیل و آرتریالیزه با سرعت بالا در یک ورید نشان‌دهنده ارتباط مستقیم شانت شریانی-وریدی است."
    },
    {
      "id": "avm-fa-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "اندکس مقاومتی (RI) شریان تغذیه‌کننده در یک شانت شریانی-وریدی معمولاً چگونه تغییر می‌کند؟",
      "options": [
        { "id": "A", "text": "به‌طور قابل توجهی افزایش می‌یابد" },
        { "id": "B", "text": "به‌طور قابل توجهی کاهش می‌یابد" },
        { "id": "C", "text": "نسبت به سمت مقابل بدون تغییر است" },
        { "id": "D", "text": "قابل اندازه‌گیری نیست" }
      ],
      "correct": "B",
      "explanation": "به دلیل مقاومت پایین در شانت، اندکس مقاومتی شریان تغذیه‌کننده به‌طور قابل توجهی کاهش می‌یابد که با سرعت دیاستولیک بالا قابل تشخیص است."
    },
    {
      "id": "avm-fa-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مهم‌ترین علامت CT برای AVM کبدی کدام است؟",
      "options": [
        { "id": "A", "text": "پرشدگی سانتریپتال کنتراست در فاز دیر" },
        { "id": "B", "text": "اپاسیفیکاسیون زودرس ورید تخلیه‌کننده در فاز شریانی (\"early venous filling sign\")" },
        { "id": "C", "text": "ضایعه هیپودنس همگن در تمام فازها" },
        { "id": "D", "text": "کلسیفیکاسیون در مرکز ضایعه" }
      ],
      "correct": "B",
      "explanation": "\"Early venous filling sign\" - اپاسیفیکاسیون زودرس ورید تخلیه‌کننده در فاز شریانی - یافته کلیدی AVM کبدی در CT و MRI است."
    },
    {
      "id": "avm-fa-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "هیپرپرفیوژن فوکال و گوه‌ای‌شکل اطراف یک AVM در فاز شریانی زودرس چه نام دارد؟",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "اسکار مرکزی" },
        { "id": "C", "text": "اختلاف گذرای تراکم/سیگنال کبدی (THAD/THID)" },
        { "id": "D", "text": "پسوکپسول" }
      ],
      "correct": "C",
      "explanation": "هیپرپرفیوژن گذرا، فوکال یا گوه‌ای‌شکل اطراف یک شانت شریانی-وریدی THAD/THID نامیده می‌شود و می‌تواند یک ضایعه هیپرواسکولار مانند FNH یا HCC را تقلید کند."
    },
    {
      "id": "avm-fa-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مالفورماسیون‌های شریانی-وریدی معمولاً در سکانس‌های T1 و T2 وزن‌دار MRI چگونه دیده می‌شوند؟",
      "options": [
        { "id": "A", "text": "هیپراینتنس همگن با تجمع آرام و سانتریپتال کنتراست مانند هماانژیوم" },
        { "id": "B", "text": "به‌صورت ساختارهای سرپیژینوس بدون سیگنال (Flow voids) به دلیل جریان سریع" },
        { "id": "C", "text": "به‌صورت سیگنال معادل چربی در تمام سکانس‌ها" },
        { "id": "D", "text": "به‌صورت توده کیستیک با مرز مشخص و سطح مایع" }
      ],
      "correct": "B",
      "explanation": "جریان سریع خون در عروق متسع باعث ایجاد Flow voids - ساختارهای سرپیژینوس بدون سیگنال - در سکانس‌های T1 و T2 می‌شود."
    },
    {
      "id": "avm-fa-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "درگیری کبدی شدید مرتبط با HHT همراه با شانت‌های شریانی-وریدی متعدد چه عارضه بالینی می‌تواند داشته باشد؟",
      "options": [
        { "id": "A", "text": "نارسایی حاد کلیه" },
        { "id": "B", "text": "نارسایی قلبی با برون‌ده بالا و هیپرتانسیون پورت" },
        { "id": "C", "text": "پانکراتیت حاد" },
        { "id": "D", "text": "هیپوتیروئیدی" }
      ],
      "correct": "B",
      "explanation": "شانت‌های شریانی-وریدی متعدد کبدی می‌توانند از طریق افزایش برون‌ده قلبی منجر به نارسایی قلبی با برون‌ده بالا شوند و از طریق شانت آرتریوپورتال باعث هیپرتانسیون پورت گردند."
    },
    {
      "id": "hcc-fa-01", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "تشخیص غیرتهاجمی تصویربرداری HCC در کدام زمینه قابل اعتمادتر است؟",
      "options": [{"id":"A","text":"زمینه پرخطر مناسب مانند سیروز"},{"id":"B","text":"هر ضایعه اتفاقی کبد بدون توجه به سابقه"},{"id":"C","text":"فقط کودکان سالم"},{"id":"D","text":"فقط پس از تروما"}],
      "correct": "A", "explanation": "الگوی دینامیک تیپیک HCC و LI-RADS برای گروه پرخطر تعریف‌شده، به‌ویژه بیماران مبتلا به سیروز یا برخی بیماری‌های مزمن کبدی، کاربرد دارند."
    },
    {
      "id": "hcc-fa-02", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام الگوی enhancement برای HCC کلاسیک است؟",
      "options": [{"id":"A","text":"non-rim APHE همراه non-peripheral wash-out"},{"id":"B","text":"enhancement ندولار محیطی با پرشدگی مرکزگرا"},{"id":"C","text":"عدم enhancement در همه فازها"},{"id":"D","text":"فقط enhancement تأخیری اسکار بدون APHE"}],
      "correct": "A", "explanation": "هایپرانهانسمنت شریانی غیرحلقوی و سپس wash-out غیرمحیطی، الگوی دینامیک کلاسیک HCC در بیمار پرخطر است."
    },
    {
      "id": "hcc-fa-03", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "wash-out در یک ضایعه کبدی به چه معناست؟",
      "options": [{"id":"A","text":"ضایعه در فازهای دیرتر نسبت به کبد هیپوenhancing می‌شود"},{"id":"B","text":"ضایعه کاملاً ناپدید می‌شود"},{"id":"C","text":"همیشه خونریزی فعال وجود دارد"},{"id":"D","text":"فقط سیگنال T2 افزایش می‌یابد"}],
      "correct": "A", "explanation": "Wash-out یک یافته نسبی است: ضایعه در فاز پورتال یا تأخیری نسبت به کبدی که بیشتر enhancement می‌یابد، تیره‌تر می‌شود."
    },
    {
      "id": "hcc-fa-04", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام یافته capsule appearance را توصیف می‌کند؟",
      "options": [{"id":"A","text":"حاشیه صاف محیطی با enhancement در فازهای دیرتر"},{"id":"B","text":"اسکار مرکزی روشن در T2 با enhancement تأخیری"},{"id":"C","text":"کلسیفیکاسیون کامل ضایعه"},{"id":"D","text":"اختلال پرفیوژن گوه‌ای بدون توده"}],
      "correct": "A", "explanation": "مرز صاف محیطی با enhancement در فاز پورتال یا تأخیری نمایانگر capsule appearance و به نفع HCC است."
    },
    {
      "id": "hcc-fa-05", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "HCC معمولاً در فاز هپاتوبیلیاری چگونه دیده می‌شود؟",
      "options": [{"id":"A","text":"هیپواینتنس نسبت به پارانشیم کبد"},{"id":"B","text":"همیشه به‌شدت هایپراینتنس"},{"id":"C","text":"بدون سیگنال مانند هوا"},{"id":"D","text":"کاملاً مشابه عروق"}],
      "correct": "A", "explanation": "بیشتر HCCها هپاتوسیت عملکردی کافی ندارند و در فاز هپاتوبیلیاری هیپواینتنس دیده می‌شوند."
    },
    {
      "id": "hcc-fa-06", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام الگوی DWI/ADC می‌تواند تشخیص HCC را تقویت کند؟",
      "options": [{"id":"A","text":"محدودیت انتشار همراه ADC پایین"},{"id":"B","text":"ADC بسیار بالا بدون سیگنال DWI"},{"id":"C","text":"فقط T2 shine-through بدون محدودیت"},{"id":"D","text":"عدم مشاهده کامل در DWI"}],
      "correct": "A", "explanation": "سلولاریته بالا می‌تواند محدودیت انتشار واقعی با سیگنال DWI بالا و ADC پایین ایجاد کند؛ این یافته حمایتی اما غیراختصاصی است."
    },
    {
      "id": "hcc-fa-07", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام یافته بیشتر به نفع tumour in vein است؟",
      "options": [{"id":"A","text":"بافت نرم enhancing داخل ورید با الگوی مشابه تومور"},{"id":"B","text":"ترومبوس همگن بدون enhancement و جدا از تومور"},{"id":"C","text":"فقط ادم پری‌پورتال"},{"id":"D","text":"کیست ساده کنار ورید پورت"}],
      "correct": "A", "explanation": "بافت نرم enhancing داخل ورید نشان‌دهنده تهاجم ماکروواسکولار تومور است و باید از ترومبوس ساده افتراق داده شود."
    },
    {
      "id": "hcc-fa-08", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام جمله درباره HCC انفیلتراتیو صحیح است؟",
      "options": [{"id":"A","text":"می‌تواند permeative رشد کند و APHE/wash-out کلاسیک را فقط فوکال نشان دهد"},{"id":"B","text":"همیشه یک ضایعه منفرد با مرز واضح است"},{"id":"C","text":"تهاجم عروقی تقریباً هرگز رخ نمی‌دهد"},{"id":"D","text":"ضایعات ماهواره‌ای تشخیص را رد می‌کنند"}],
      "correct": "A", "explanation": "HCC انفیلتراتیو به‌صورت نامشخص چند سگمان را درگیر می‌کند؛ enhancement کلاسیک ممکن است هتروژن یا فقط فوکال باشد و تهاجم عروقی شایع است."
    },
    {
      "id": "hcc-fa-09", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام ویژگی بیشتر به نفع HCC نسبت به FNH تیپیک است؟",
      "options": [{"id":"A","text":"wash-out پورتال یا تأخیری"},{"id":"B","text":"APHE هموژن بدون wash-out"},{"id":"C","text":"اسکار مرکزی روشن در T2 با enhancement تأخیری"},{"id":"D","text":"الگوی spoke-wheel در داپلر"}],
      "correct": "A", "explanation": "FNH تیپیک APHE دارد اما wash-out ندارد. Wash-out پورتال یا تأخیری در زمینه خطر مناسب ویژگی مهم HCC است."
    },
    {
      "id": "hcc-fa-10", "tags": ["hcc", "leber", "abdomen"], "fach": "abdomen",
      "question": "کدام اطلاعات برای مرحله‌بندی رادیولوژیک HCC اهمیت ویژه دارند؟",
      "options": [{"id":"A","text":"تعداد، اندازه، سگمان، ضایعات ماهواره‌ای، تهاجم عروقی و گسترش خارج کبدی"},{"id":"B","text":"فقط اکوژنیسیته سونوگرافی"},{"id":"C","text":"فقط سن بیمار"},{"id":"D","text":"فقط دانسیته بدون کنتراست"}],
      "correct": "A", "explanation": "بار تومور، محل، ضایعات ماهواره‌ای، تهاجم ماکروواسکولار و متاستازها مرحله و برنامه درمان را تعیین می‌کنند."
    },
    {
      "id": "sarkoidose-fa-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام ویژگی هیستولوژیک برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "گرانولوم‌های caseating"
        },
        {
          "id": "B",
          "text": "گرانولوم‌های non-caseating"
        },
        {
          "id": "C",
          "text": "میکروآبسه‌های ائوزینوفیلیک"
        },
        {
          "id": "D",
          "text": "لانه‌های توموری اسکواموس"
        }
      ],
      "correct": "B",
      "explanation": "سارکوئیدوز یک بیماری سیستمیک گرانولوماتوز با علت ناشناخته است. گرانولوم‌های non-caseating برای آن تیپیک هستند."
    },
    {
      "id": "sarkoidose-fa-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام الگوی توزیع ندول‌ها در HRCT برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "پری‌لنفاتیک در امتداد فیشورها، پلور و دسته‌های برونکوواسکولار"
        },
        {
          "id": "B",
          "text": "کاملاً رندوم هماتوژن بدون ارتباط با فیشور"
        },
        {
          "id": "C",
          "text": "فقط Honeycombing بازال ساب‌پلورال"
        },
        {
          "id": "D",
          "text": "فقط Tree-in-bud سنترلوبولار"
        }
      ],
      "correct": "A",
      "explanation": "سارکوئیدوز معمولاً میکروندول‌های ۲–۴ میلی‌متری شارپ با توزیع پری‌لنفاتیک در امتداد فیشورها، پلور، سپتا و دسته‌های برونکوواسکولار نشان می‌دهد."
    },
    {
      "id": "sarkoidose-fa-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "علامت 1-2-3 در سارکوئیدوز چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "هیلوم راست، هیلوم چپ و ناحیه پارا تراکئال راست"
        },
        {
          "id": "B",
          "text": "سه کاویته در لوب فوقانی راست"
        },
        {
          "id": "C",
          "text": "سه زون فیبروز ریه"
        },
        {
          "id": "D",
          "text": "سه مرحله سارکوئیدوز قلبی"
        }
      ],
      "correct": "A",
      "explanation": "علامت 1-2-3 توزیع تیپیک لنف‌نودها را نشان می‌دهد: هیلوم راست، هیلوم چپ و پارا تراکئال راست."
    },
    {
      "id": "sarkoidose-fa-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام مرحله Scadding فقط لنفادنوپاتی بی‌هیلار بدون درگیری پارانشیم دارد؟",
      "options": [
        {
          "id": "A",
          "text": "مرحله 0"
        },
        {
          "id": "B",
          "text": "مرحله I"
        },
        {
          "id": "C",
          "text": "مرحله III"
        },
        {
          "id": "D",
          "text": "مرحله IV"
        }
      ],
      "correct": "B",
      "explanation": "مرحله I در Scadding یعنی فقط لنفادنوپاتی بی‌هیلار با پارانشیم طبیعی."
    },
    {
      "id": "sarkoidose-fa-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "مرحله II در Scadding به چه معناست؟",
      "options": [
        {
          "id": "A",
          "text": "فقط فیبروز"
        },
        {
          "id": "B",
          "text": "درگیری پارانشیم بدون لنفادنوپاتی"
        },
        {
          "id": "C",
          "text": "لنفادنوپاتی بی‌هیلار همراه با درگیری پارانشیم"
        },
        {
          "id": "D",
          "text": "رادیوگرافی قفسه سینه طبیعی"
        }
      ],
      "correct": "C",
      "explanation": "مرحله II یعنی BHL به همراه تغییرات پارانشیم ریه. مرحله III پارانشیم بدون BHL و مرحله IV فیبروز است."
    },
    {
      "id": "sarkoidose-fa-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام جمله درباره کلسیفیکاسیون Eggshell درست است؟",
      "options": [
        {
          "id": "A",
          "text": "برای سارکوئیدوز پاتوگنومونیک است"
        },
        {
          "id": "B",
          "text": "در سیلیکوز هم دیده می‌شود"
        },
        {
          "id": "C",
          "text": "همیشه لنفوم را اثبات می‌کند"
        },
        {
          "id": "D",
          "text": "فقط در آزبستوز رخ می‌دهد"
        }
      ],
      "correct": "B",
      "explanation": "کلسیفیکاسیون شبیه پوسته تخم‌مرغ می‌تواند در سارکوئیدوز دیده شود، اما اختصاصی نیست و در سیلیکوز هم رخ می‌دهد."
    },
    {
      "id": "sarkoidose-fa-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Sarcoid Galaxy Sign چیست؟",
      "options": [
        {
          "id": "A",
          "text": "ندول بزرگ با ندول‌های ماهواره‌ای کوچک متعدد اطراف آن"
        },
        {
          "id": "B",
          "text": "Ground-glass منتشر بدون ندول"
        },
        {
          "id": "C",
          "text": "پلاک پلور کلسیفیه"
        },
        {
          "id": "D",
          "text": "آمبولی مرکزی ریه"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoid Galaxy Sign شامل تجمع بزرگ‌تر گرانولوم است که با ندول‌های ماهواره‌ای کوچک احاطه شده است. این علامت اختصاصی نیست و در سل هم ممکن است دیده شود."
    },
    {
      "id": "sarkoidose-fa-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام DD معمولاً ضخیم‌شدن سپتای ندولار نامنظم و اغلب یک‌طرفه یا نامتقارن ایجاد می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "Lymphangiosis carcinomatosa"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "سندرم Heerfordt"
        },
        {
          "id": "D",
          "text": "منیسک دیسکوئید"
        }
      ],
      "correct": "A",
      "explanation": "لنفانژیوز کارسینوماتوز اغلب باعث ضخیم‌شدن نامنظم و ندولار سپتا می‌شود و معمولاً نامتقارن یا یک‌طرفه است. بیمار از نظر بالینی غالباً بدحال‌تر است."
    },
    {
      "id": "sarkoidose-fa-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام سه‌گانه سندرم Heerfordt را تعریف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "یووئیت، پاروتیت و فلج فاسیال"
        },
        {
          "id": "B",
          "text": "آسم، سینوزیت و ائوزینوفیلی"
        },
        {
          "id": "C",
          "text": "آرتریت، اورتریت و کونژنکتیویت"
        },
        {
          "id": "D",
          "text": "هموپتزی، گلومرولونفریت و سینوزیت"
        }
      ],
      "correct": "A",
      "explanation": "سندرم Heerfordt یکی از تظاهرات سارکوئیدوز است و شامل یووئیت، پاروتیت و فلج فاسیال می‌شود."
    },
    {
      "id": "sarkoidose-fa-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام روش برای تشخیص سارکوئیدوز قلبی اهمیت ویژه دارد؟",
      "options": [
        {
          "id": "A",
          "text": "MRI با Late Gadolinium Enhancement"
        },
        {
          "id": "B",
          "text": "رادیوگرافی ساده زانو"
        },
        {
          "id": "C",
          "text": "سونوگرافی کیسه صفرا"
        },
        {
          "id": "D",
          "text": "CT سر بدون کنتراست"
        }
      ],
      "correct": "A",
      "explanation": "سارکوئیدوز قلبی معمولاً با MRI و Late Gadolinium Enhancement ارزیابی می‌شود. از نظر بالینی افزایش خطر آریتمی مهم است."
    },
    {
      "id": "rotatorenmanschette-fa-01",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "روتاتور کاف از کدام چهار عضله تشکیل شده است؟",
      "options": [
        { "id": "A", "text": "سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور، ساب‌اسکاپولاریس" },
        { "id": "B", "text": "دلتوئید، تراپزیوس، لاتیسیموس دورسی، ترس میجر" },
        { "id": "C", "text": "بایسپس، تریسپس، کوراکوبراکیالیس، پکتورالیس میجر" },
        { "id": "D", "text": "سوپراسپیناتوس، دلتوئید، ترس مینور، ساب‌اسکاپولاریس" }
      ],
      "correct": "A",
      "explanation": "روتاتور کاف از عضلات سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور و ساب‌اسکاپولاریس تشکیل شده است (مخفف: SITS)."
    },
    {
      "id": "rotatorenmanschette-fa-02",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "ناحیه «Critical Zone» تاندون سوپراسپیناتوس کجا قرار دارد؟",
      "options": [
        { "id": "A", "text": "حدود ۱ تا ۲ سانتی‌متر قبل از محل اتصال به توبرکل بزرگ - یک ناحیه هیپوواسکولار" },
        { "id": "B", "text": "در محل اتصال عضله به تاندون" },
        { "id": "C", "text": "در محل منشأ عضله از اسکاپولا" },
        { "id": "D", "text": "در ناحیه منشأ تاندون بایسپس از گلنوئید" }
      ],
      "correct": "A",
      "explanation": "Critical Zone حدود ۱ تا ۲ سانتی‌متر قبل از محل اتصال به توبرکل بزرگ قرار دارد، هیپوواسکولار است و به همین دلیل محل شایع دژنراسیون و پارگی است."
    },
    {
      "id": "rotatorenmanschette-fa-03",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "عملکرد اصلی عضله ساب‌اسکاپولاریس چیست؟",
      "options": [
        { "id": "A", "text": "چرخش خارجی بازو" },
        { "id": "B", "text": "ابداکسیون بازو" },
        { "id": "C", "text": "چرخش داخلی بازو" },
        { "id": "D", "text": "بالا بردن بازو بیش از ۹۰ درجه" }
      ],
      "correct": "C",
      "explanation": "ساب‌اسکاپولاریس مهم‌ترین چرخاننده داخلی بازو است و همراه با اینفراسپیناتوس سر هومروس را در صفحه ترانسورس تثبیت می‌کند."
    },
    {
      "id": "rotatorenmanschette-fa-04",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "کدام ترکیب سکانس برای ارزیابی روتاتور کاف ضروری است؟",
      "options": [
        { "id": "A", "text": "فقط یک سکانس T1 آگزیال بدون کنتراست" },
        { "id": "B", "text": "سکانس‌های فت‌ساپرس و حساس به مایع در حداقل دو پلان" },
        { "id": "C", "text": "فقط یک سکانس DWI در یک پلان" },
        { "id": "D", "text": "فقط یک سکانس T1 با کنتراست" }
      ],
      "correct": "B",
      "explanation": "یک پروتکل استاندارد با سکانس‌های فت‌ساپرس و حساس به مایع (مانند PD/T2 fs) در حداقل دو پلان برای تشخیص مطمئن پارگی ضروری است."
    },
    {
      "id": "rotatorenmanschette-fa-05",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "پدیده Magic Angle چه چیزی را توصیف می‌کند؟",
      "options": [
        { "id": "A", "text": "یک پارگی واقعی که فقط در سکانس‌های T1 دیده می‌شود" },
        { "id": "B", "text": "افزایش سیگنال کاذب در سکانس‌های TE کوتاه (T1، PD) زمانی که تاندون با زاویه حدود ۵۵ درجه نسبت به میدان مغناطیسی اصلی قرار دارد، که در T2 ناپدید می‌شود" },
        { "id": "C", "text": "از بین رفتن سیگنال به دلیل آرتیفکت فلزی" },
        { "id": "D", "text": "آرتیفکت حرکتی ناشی از تنفس" }
      ],
      "correct": "B",
      "explanation": "پدیده Magic Angle باعث افزایش سیگنال کاذب در PD/T1 می‌شود زمانی که تاندون با زاویه حدود ۵۵ درجه نسبت به میدان مغناطیسی اصلی قرار گیرد - در سکانس‌های T2 این پدیده ناپدید می‌شود و نباید با یک پاتولوژی واقعی اشتباه گرفته شود."
    },
    {
      "id": "rotatorenmanschette-fa-06",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "پارگی جزئی سمت بورسال تاندون سوپراسپیناتوس معمولاً در MRI چگونه دیده می‌شود؟",
      "options": [
        { "id": "A", "text": "عدم تداوم کامل تاندون همراه با رتراکشن انتهای آن" },
        { "id": "B", "text": "حاشیه کانونی مایع بین تاندون و بورس ساب‌آکرومیال در T2 fs" },
        { "id": "C", "text": "کاهش منتشر سیگنال کل تاندون در T1 بدون یافته دیگر" },
        { "id": "D", "text": "ادم مغز استخوان در سر هومروس بدون تغییر در تاندون" }
      ],
      "correct": "B",
      "explanation": "پارگی جزئی سمت بورسال فیبرهای سطحی (بورسال) را درگیر می‌کند و حاشیه کانونی مایع بین تاندون و بورس ساب‌آکرومیال در T2 fs نشان می‌دهد."
    },
    {
      "id": "rotatorenmanschette-fa-07",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "ضایعه PASTA به چه معناست؟",
      "options": [
        { "id": "A", "text": "یک پارگی کامل با رتراکشن درجه ۳ بر اساس طبقه‌بندی Patte" },
        { "id": "B", "text": "یک پارگی جزئی سمت مفصلی در Footprint (Partial Articular Surface Tendon Avulsion)" },
        { "id": "C", "text": "یک بورسیت ساب‌آکرومیال ایزوله بدون درگیری تاندون" },
        { "id": "D", "text": "تاندینوپاتی سر بلند بایسپس" }
      ],
      "correct": "B",
      "explanation": "PASTA مخفف Partial Articular Surface Tendon Avulsion است - یک پارگی جزئی سمت مفصلی فیبرهای عمقی در Footprint که اغلب با ایمپینجمنت همراه است."
    },
    {
      "id": "rotatorenmanschette-fa-08",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "تفاوت پارگی جزئی داخل تاندونی با تاندینوپاتی خالص چیست؟",
      "options": [
        { "id": "A", "text": "در تاندینوپاتی، عدم تداوم کامل تاندون وجود دارد" },
        { "id": "B", "text": "پارگی داخل تاندونی سیگنال کانونی هیپراینتنس T2 بدون تماس با بورس یا مفصل نشان می‌دهد، در حالی که تاندینوپاتی افزایش سیگنال PD/T1 بدون سیگنال مایع واضح در T2 نشان می‌دهد" },
        { "id": "C", "text": "این دو در MRI اساساً قابل تمایز نیستند" },
        { "id": "D", "text": "تاندینوپاتی همیشه با رتراکشن انتهای تاندون همراه است" }
      ],
      "correct": "B",
      "explanation": "پارگی جزئی داخل تاندونی سیگنال کانونی هیپراینتنس T2 بدون تماس با سطح نشان می‌دهد، در حالی که تاندینوپاتی افزایش سیگنال داخل تاندونی در PD/T1 بدون سیگنال مایع واضح در T2 دارد."
    },
    {
      "id": "rotatorenmanschette-fa-09",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "از چه میزان درگیری Footprint، ترمیم جراحی برای ضایعه PASTA معمولاً در نظر گرفته می‌شود؟",
      "options": [
        { "id": "A", "text": "درگیری Footprint بیش از ۵۰٪" },
        { "id": "B", "text": "درگیری Footprint بیش از ۱۰٪" },
        { "id": "C", "text": "فقط در درگیری ۱۰۰٪ Footprint" },
        { "id": "D", "text": "میزان درگیری Footprint در تصمیم درمانی اهمیتی ندارد" }
      ],
      "correct": "A",
      "explanation": "در ضایعه PASTA، درگیری Footprint بیش از ۵۰٪ اغلب منجر به در نظر گرفتن ترمیم جراحی می‌شود، در حالی که کمتر از ۵۰٪ معمولاً با درمان محافظه‌کارانه یا دبریدمان مدیریت می‌شود."
    },
    {
      "id": "rotatorenmanschette-fa-10",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "کدام یافته MRI برای پارگی کامل روتاتور کاف تشخیصی است؟",
      "options": [
        { "id": "A", "text": "افزایش سیگنال ایزوله در PD بدون معادل در T2" },
        { "id": "B", "text": "قطع کامل و هیپراینتنس تاندون در T2 همراه با مایع در محل نقص، که مفصل و بورس را به هم متصل می‌کند" },
        { "id": "C", "text": "ضخیم‌شدن تاندون بدون هیچ تغییر سیگنالی" },
        { "id": "D", "text": "بورسیت ساب‌آکرومیال ایزوله بدون درگیری تاندون" }
      ],
      "correct": "B",
      "explanation": "پارگی کامل قطع کامل و هیپراینتنس تاندون در T2 را همراه با مایع در محل نقص نشان می‌دهد - این امر ارتباط مستقیمی بین مفصل گلنوهومرال و بورس ساب‌آکرومیال ایجاد می‌کند."
    },
    {
      "id": "rotatorenmanschette-fa-11",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "طبقه‌بندی Patte چه چیزی را توصیف می‌کند؟",
      "options": [
        { "id": "A", "text": "درجه آتروفی چربی عضله" },
        { "id": "B", "text": "درجه رتراکشن انتهای تاندون (درجه ۱ تا ۳)" },
        { "id": "C", "text": "اندازه نقص لابروم" },
        { "id": "D", "text": "درجه بورسیت ساب‌آکرومیال" }
      ],
      "correct": "B",
      "explanation": "طبقه‌بندی Patte رتراکشن انتهای تاندون را از درجه ۱ (نزدیک Footprint) تا درجه ۳ (در سطح گلنوئید) درجه‌بندی می‌کند و برای برنامه‌ریزی جراحی تعیین‌کننده است."
    },
    {
      "id": "rotatorenmanschette-fa-12",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "Tangent sign مثبت در MRI شانه به چه معناست؟",
      "options": [
        { "id": "A", "text": "سر هومروس از خط فرضی بین آکرومیون و کوراکوئید عبور می‌کند - نشانه پارگی وسیع" },
        { "id": "B", "text": "تاندون سوپراسپیناتوس ساختار طبیعی دارد" },
        { "id": "C", "text": "تاندینوپاتی ایزوله سر بلند بایسپس وجود دارد" },
        { "id": "D", "text": "بورس ساب‌آکرومیال ضخیم شده اما تاندون سالم است" }
      ],
      "correct": "A",
      "explanation": "در Tangent sign، سر هومروس از خط فرضی بین آکرومیون و کوراکوئید عبور می‌کند - این نشانه یک پارگی وسیع روتاتور کاف است."
    },
    {
      "id": "rotatorenmanschette-fa-13",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "کدام گزینه درباره طبقه‌بندی Goutallier صحیح است؟",
      "options": [
        { "id": "A", "text": "فقط رتراکشن تاندون را توصیف می‌کند" },
        { "id": "B", "text": "دژنراسیون چربی عضله را از درجه ۰ (بدون نفوذ چربی) تا درجه ۴ (چربی > عضله) درجه‌بندی می‌کند" },
        { "id": "C", "text": "فقط در پارگی‌های جزئی کاربرد دارد" },
        { "id": "D", "text": "فقط بر اساس یافته‌های رادیوگرافی ساده است" }
      ],
      "correct": "B",
      "explanation": "طبقه‌بندی Goutallier آتروفی چربی عضله را از درجه ۰ (بدون نفوذ چربی) تا درجه ۴ (چربی > عضله) درجه‌بندی می‌کند. از درجه ۳ تا ۴ به بعد، ترمیم معمولاً کم‌احتمال در نظر گرفته می‌شود."
    },
    {
      "id": "rotatorenmanschette-fa-14",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "کدام عامل می‌تواند به ایمپینجمنت ساب‌آکرومیال منجر شود؟",
      "options": [
        { "id": "A", "text": "بورس ساب‌آکرومیال بسیار نازک" },
        { "id": "B", "text": "آکرومیون تیپ Bigliani همراه با استئوفیت یا ضخیم‌شدن بورس که فضای ساب‌آکرومیال را تنگ می‌کنند" },
        { "id": "C", "text": "تاندینوپاتی ایزوله سر بلند بایسپس" },
        { "id": "D", "text": "ضعف ایزوله چرخش داخلی بدون تغییر ساختاری" }
      ],
      "correct": "B",
      "explanation": "آکرومیون تیپ Bigliani همراه با استئوفیت، آرتروز مفصل ACG با استئوفیت‌های تحتانی یا ضخیم‌شدن بورس می‌توانند فضای ساب‌آکرومیال را تنگ کرده و ایمپینجمنت را تشدید کنند."
    },
    {
      "id": "rotatorenmanschette-fa-15",
      "tags": ["rotatorenmanschette", "schulter"],
      "fach": "msk",
      "question": "دیسلوکیشن تاندون سر بلند بایسپس از Sulcus bicipitalis چه اهمیتی دارد؟",
      "options": [
        { "id": "A", "text": "همیشه یک یافته اتفاقی بدون اهمیت بالینی است" },
        { "id": "B", "text": "نشانه غیرمستقیم پارگی همراه تاندون ساب‌اسکاپولاریس است" },
        { "id": "C", "text": "ثابت‌کننده پارگی کامل تاندون سوپراسپیناتوس است" },
        { "id": "D", "text": "فقط در کودکان رخ می‌دهد" }
      ],
      "correct": "B",
      "explanation": "دیسلوکیشن تاندون سر بلند بایسپس از Sulcus bicipitalis نشانه غیرمستقیم پارگی همراه ساب‌اسکاپولاریس است، زیرا تاندون ساب‌اسکاپولاریس بخشی از سازه‌های نگه‌دارنده تاندون بایسپس در داخل Sulcus است."
    }
  ]
}

export const MCQ_TOPIC_GROUPS = [
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-anatomie',
    title: { de: '1. Anatomie & Normalvarianten', en: '1. Anatomy & Normal Variants', fa: '۱. آناتومی و واریانت‌های طبیعی' },
    topics: [
      { id: 'liquorraeume-ventrikelsystem', title: { de: 'Liquorräume / Ventrikelsystem', en: 'CSF spaces / ventricular system', fa: 'فضاهای مایع مغزی‌نخاعی / سیستم بطنی' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    title: { de: '2. Vaskuläre Erkrankungen', en: '2. Vascular Diseases', fa: '۲. بیماری‌های عروقی' },
    topics: [
      { id: 'ischaemischer-schlaganfall', title: { de: 'Ischämischer Schlaganfall', en: 'Ischaemic Stroke', fa: 'سکته مغزی ایسکمیک' } },
      { id: 'intrazerebrale-blutung', title: { de: 'Intrazerebrale Blutung', en: 'Intracerebral Haemorrhage', fa: 'خونریزی داخل مغزی' } },
      { id: 'hypoxisch-ischaemische-hirnschaedigung', title: { de: 'Hypoxisch-ischämische Hirnschädigung', en: 'Hypoxic-ischaemic brain injury', fa: 'آسیب مغزی هیپوکسیک-ایسکمیک' } },
      { id: 'cadasil', title: { de: 'CADASIL', en: 'CADASIL', fa: 'CADASIL' } },
      { id: 'dva', title: { de: 'Developmental Venous Anomaly', en: 'Developmental Venous Anomaly', fa: 'آنومالی وریدی تکاملی' } },
      { id: 'kavernom', title: { de: 'Kavernom', en: 'Cavernoma', fa: 'کاورنوم' } },
      { id: 'kapillaere-teleangiektasie', title: { de: 'Kapilläre Teleangiektasie', en: 'Capillary telangiectasia', fa: 'تلانژکتازی مویرگی' } },
      { id: 'sinusvenenthrombose', title: { de: 'Sinus- und Hirnvenenthrombose', en: 'Cerebral venous thrombosis', fa: 'ترومبوز سینوس و وریدهای مغزی' } },
      { id: 'davf', title: { de: 'Durale AV-Fistel (dAVF)', en: 'Dural Arteriovenous Fistula (dAVF)', fa: 'فیستول دورال AV (dAVF)' } },
      { id: 'avm-zns', title: { de: 'Arteriovenöse Malformation (AVM)', en: 'Arteriovenous Malformation (AVM)', fa: 'مالفورماسیون شریانی-وریدی (AVM)' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-liquor',
    title: { de: '7. Liquorzirkulationsstörungen & intrakranieller Druck', en: '7. CSF Circulation Disorders & Intracranial Pressure', fa: '۷. اختلالات گردش مایع مغزی‌نخاعی و فشار داخل جمجمه' },
    topics: [
      { id: 'normaldruckhydrozephalus', title: { de: 'Normaldruckhydrozephalus', en: 'Normal pressure hydrocephalus', fa: 'هیدروسفالی فشار طبیعی' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-trauma',
    title: { de: '8. Trauma', en: '8. Trauma', fa: '۸. تروما' },
    topics: [
      { id: 'epidurale-blutung', title: { de: 'Epiduralhämatom', en: 'Epidural haematoma', fa: 'هماتوم اپیدورال' } },
    ],
  },
  {
    fachId: 'technik',
    kapitelId: 'technik-kontrastmittel',
    title: { de: '9. Kontrastmittel', en: '9. Contrast Media', fa: '۹. مواد حاجب' },
    topics: CONTRAST_TOPICS.map(({ id, title }) => ({ id, title })),
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-trauma',
    title: { de: '10. Traumatologie & Frakturen', en: '10. Trauma & Fractures', fa: '۱۰. تروما و شکستگی‌ها' },
    topics: [
      { id: 'frakturbeschreibung', title: { de: 'Frakturbeschreibung', en: 'Fracture description', fa: 'توصیف شکستگی' } },
      { id: 'frakturen-kindesalter', title: { de: 'Frakturen im Kindesalter', en: 'Paediatric Fractures', fa: 'شکستگی‌های دوران کودکی' } },
      { id: 'ak-luxation', title: { de: 'Akromioklavikuläre Luxation', en: 'AC Joint Dislocation', fa: 'لوکساسیون مفصل AC' } },
      { id: 'radiuskoepfchenfraktur', title: { de: 'Radiusköpfchenfraktur', en: 'Radial Head Fracture', fa: 'شکستگی سر رادیوس' } },
    ],
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-knie',
    title: { de: '15. Knie', en: '15. Knee', fa: '۱۵. زانو' },
    topics: [
      { id: 'meniskus', title: { de: 'Meniskus', en: 'Meniscus', fa: 'منیسک' } },
    ],
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-schulter',
    title: { de: '11. Schulter', en: '11. Shoulder', fa: '۱۱. شانه' },
    topics: [
      { id: 'rotatorenmanschette', title: { de: 'Rotatorenmanschette', en: 'Rotator Cuff', fa: 'روتاتور کاف' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-leber',
    title: { de: 'Leber', en: 'Liver', fa: 'کبد' },
    topics: [
      { id: 'haemangiom', title: { de: 'Leberhämangiom', en: 'Liver haemangioma', fa: 'همانژیوم کبد' } },
      { id: 'fnh', title: { de: 'FNH', en: 'FNH', fa: 'FNH' } },
      { id: 'hcc', title: { de: 'HCC', en: 'HCC', fa: 'HCC' } },
      { id: 'avm', title: { de: 'AVM der Leber', en: 'Hepatic AVM', fa: 'AVM کبد' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-gi-trakt',
    title: { de: 'Gastrointestinaltrakt', en: 'Gastrointestinal tract', fa: 'دستگاه گوارش' },
    topics: [
      { id: 'divertikulitis', title: { de: 'Divertikulitis', en: 'Diverticulitis', fa: 'دیورتیکولیت' } },
    ],
  },
  {
    fachId: 'thorax',
    kapitelId: 'thorax-lunge',
    title: { de: 'Lunge', en: 'Lung', fa: 'ریه' },
    topics: [
      { id: 'sarkoidose', title: { de: 'Sarkoidose', en: 'Sarcoidosis', fa: 'سارکوئیدوز' } },
    ],
  },
]

export function getAvailableQuestionTopicIds() {
  const tags = new Set(QUESTION_BANK.de.flatMap(question => question.tags))
  return new Set(
    MCQ_TOPIC_GROUPS.flatMap(group => group.topics)
      .map(topic => topic.id)
      .filter(topicId => tags.has(topicId))
  )
}

export function countQuestions(themenIds) {
  const selected = new Set(themenIds)
  return QUESTION_BANK.de.filter(question => question.tags.some(tag => selected.has(tag))).length
}

export function getQuestions(themenIds, lang, n) {
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  const tagSet = new Set(themenIds)
  const filtered = all.filter(q => q.tags.some(t => tagSet.has(t)))
  const shuffled = [...filtered]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

export function getQuestionsByIds(questionIds, lang) {
  const wanted = new Set(questionIds)
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  return all.filter(question => wanted.has(question.id))
}
