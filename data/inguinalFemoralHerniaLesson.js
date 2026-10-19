const L = (de, en, fa) => ({ de, en, fa })

export const INGUINAL_FEMORAL_HERNIA_LESSON = {
  id: 'inguinal-femoral-hernia',
  title: L('Leisten- und Schenkelhernie', 'Inguinal and femoral hernias', 'فتق اینگوینال و فمورال'),
  chapters: [
    {
      id: 'map', icon: 'map',
      title: L('Zuerst die Landmarken ordnen', 'Start with the landmarks', 'ابتدا نشانه‌های آناتومیک را مرتب کنید'),
      paragraphs: [
        L('Die erste Einordnung erfolgt am Leistenband: Eine Inguinalhernie tritt oberhalb, eine Femoralhernie unterhalb davon aus.', 'Begin by locating the inguinal ligament: an inguinal hernia emerges above it, while a femoral hernia emerges below it.', 'برای افتراق اولیه رباط اینگوینال را پیدا کنید: فتق اینگوینال از بالای آن و فتق فمورال از پایین آن بیرون می‌زند.'),
        L('Bei Inguinalhernien hilft zusätzlich die Lage zum inferioren epigastrischen Gefäßbündel: indirekt liegt lateral, direkt medial davon.', 'For inguinal hernias, also use the inferior epigastric vessels: an indirect hernia lies lateral to them, a direct hernia medial.', 'برای افتراق انواع اینگوینال، جایگاه نسبت به عروق اپی‌گاستریک تحتانی را هم ببینید: نوع غیرمستقیم لترال و نوع مستقیم مدیال آن‌هاست.'),
      ],
      visualNote: L('Orientierung der Skizze: Die graue Querlinie markiert das Leistenband. Links davon liegt die laterale Seite; rechts davon die mediale. Die roten epigastrischen Gefäße liegen zwischen tiefem Leistenring (violett, lateral) und direktem Weg (braun, medial). Der femorale Weg (ocker) liegt medial der Femoralvene (blau). Die Skizze zeigt Anatomie, keinen diagnostischen Fall.', 'Schematic orientation: the grey horizontal line marks the inguinal ligament. The left side is lateral and the right side medial. The red inferior epigastric vessels lie between the deep ring (purple, lateral) and the direct path (brown, medial). The femoral path (amber) lies medial to the femoral vein (blue). This is anatomy, not a diagnostic case.', 'جهت‌یابی شماتیک: خط افقی خاکستری رباط اینگوینال است. سمت چپ در شکل لترال و سمت راست مدیال است. عروق اپی‌گاستریک تحتانی قرمز میان حلقهٔ عمقی (بنفش، لترال) و مسیر مستقیم (قهوه‌ای، مدیال) قرار دارند. مسیر فمورال (کهربایی) در مدیال ورید فمورال (آبی) است. این شکل آناتومیک است و کیس تشخیصی نیست.'),
    },
    {
      id: 'inguinal', icon: 'route',
      title: L('Direkt oder indirekt?', 'Direct or indirect?', 'مستقیم یا غیرمستقیم؟'),
      paragraphs: [
        L('Die indirekte Hernie tritt lateral der inferioren epigastrischen Gefäße durch den tiefen Leistenring ein und verläuft schräg durch den Leistenkanal.', 'An indirect hernia enters lateral to the inferior epigastric vessels through the deep inguinal ring and follows an oblique course through the inguinal canal.', 'فتق غیرمستقیم از لترال عروق اپی‌گاستریک تحتانی و از حلقهٔ عمقی اینگوینال وارد می‌شود و مسیر موربی در کانال اینگوینال دارد.'),
        L('Die direkte Hernie tritt medial der Gefäße durch das Hesselbach-Dreieck vor. Im Vergleich zur indirekten Form verläuft sie eher senkrecht nach vorne.', 'A direct hernia protrudes medial to the vessels through Hesselbach’s triangle. Compared with the indirect type, its course is more directly anterior.', 'فتق مستقیم از مدیال عروق و از مثلث هسل‌باخ بیرون می‌زند. مسیر آن در مقایسه با نوع غیرمستقیم مستقیم‌تر به سمت قدام است.'),
        L('Für die Bildgebung ist die Beziehung zu den Gefäßen und zum tiefen Ring entscheidend; allein die Richtung der Vorwölbung ersetzt diese Landmarken nicht.', 'For imaging, the relationship to the vessels and deep ring is decisive; the apparent direction of a bulge alone does not replace these landmarks.', 'در تصویربرداری، رابطه با عروق و حلقهٔ عمقی تعیین‌کننده است؛ جهت ظاهری برجستگی به‌تنهایی جای این نشانه‌ها را نمی‌گیرد.'),
      ],
    },
    {
      id: 'femoral', icon: 'vessels',
      title: L('Die Femoralhernie unterhalb der Leiste', 'The femoral hernia below the groin', 'فتق فمورال در پایین رباط اینگوینال'),
      paragraphs: [
        L('Die Femoralhernie tritt kaudal des Leistenbandes durch den Femoral-Kanal aus.', 'A femoral hernia emerges below the inguinal ligament through the femoral canal.', 'فتق فمورال از پایین رباط اینگوینال و از کانال فمورال خارج می‌شود.'),
        L('Der Bruchsack liegt typischerweise medial der Vena femoralis. Beurteilen Sie diese Beziehung in der passenden Ebene und verfolgen Sie den Hals bis zum Austritt.', 'The hernia sac is typically medial to the femoral vein. Assess this relationship in the appropriate plane and trace the neck to its exit.', 'ساک فتق معمولاً در مدیال ورید فمورال قرار دارد. این رابطه را در صفحهٔ مناسب بسنجید و گردن فتق را تا محل خروج دنبال کنید.'),
        L('Die Lage unterhalb des Leistenbandes und medial der Femoralvene hilft, eine Femoralhernie von einer Inguinalhernie abzugrenzen.', 'A position below the inguinal ligament and medial to the femoral vein helps distinguish a femoral from an inguinal hernia.', 'قرارگیری در پایین رباط اینگوینال و مدیال ورید فمورال به افتراق فتق فمورال از اینگوینال کمک می‌کند.'),
      ],
    },
    {
      id: 'imaging', icon: 'scan',
      title: L('Dynamischer Ultraschall und CT-Zeichen', 'Dynamic ultrasound and CT signs', 'سونوگرافی دینامیک و نشانه‌های CT'),
      paragraphs: [
        L('Die Quelle nennt die Sonographie als Erstliniendiagnostik. Sie ermöglicht eine dynamische Untersuchung mit Valsalva-Manöver; dabei kann die Reponibilität beurteilt werden. Zeigen Sie im Befund, wo der Bruchsack zum Leistenband, zu den epigastrischen Gefäßen und – bei femoraler Lage – zur Femoralvene liegt.', 'The source names ultrasound as first-line imaging. It allows dynamic assessment with Valsalva, during which reducibility can be assessed. In the report, state where the sac lies relative to the inguinal ligament, inferior epigastric vessels and, for a femoral hernia, the femoral vein.', 'منبع، سونوگرافی را روش تصویربرداری خط اول می‌داند. این روش بررسی دینامیک با مانور والسالوا را ممکن می‌کند و در آن می‌توان قابلیت جاافتادن را سنجید. در گزارش، جای ساک را نسبت به رباط اینگوینال، عروق اپی‌گاستریک تحتانی و در فتق فمورال نسبت به ورید فمورال ذکر کنید.'),
        L('Bei Verdacht auf Komplikation nennt die Quelle als CT-Merkmale eine Wandverdickung der hernierten Darmschlinge, vermindertes oder fehlendes Enhancement der Darmwand sowie Ödem des umgebenden Fettgewebes.', 'When complication is suspected, the source lists these CT findings: thickening of the herniated bowel wall, reduced or absent bowel-wall enhancement, and edema of the surrounding fat.', 'در شک به عارضه، منبع این یافته‌های CT را ذکر می‌کند: ضخیم‌شدن دیوارهٔ حلقهٔ رودهٔ فتق‌یافته، کاهش یا فقدان جذب مادهٔ حاجب در دیوارهٔ روده و ادم چربی اطراف.'),
        L('Die Befundung beschreibt die sichtbaren Zeichen und deren Ausmaß. Ein einzelnes Zeichen wird hier nicht als alleiniger Beweis für Ischämie oder Strangulation gelehrt.', 'Describe the visible findings and their extent. This lesson does not teach any single sign as standalone proof of ischemia or strangulation.', 'یافته‌های قابل مشاهده و وسعت آن‌ها را توصیف کنید. در این درس هیچ نشانهٔ منفردی به‌تنهایی اثبات ایسکمی یا استرانگولاسیون تلقی نمی‌شود.'),
      ],
    },
  ],
  check: {
    prompt: L('Eine Vorwölbung liegt unterhalb des Leistenbandes; der Bruchsack befindet sich medial der Vena femoralis. Welche Zuordnung passt am besten?', 'A bulge lies below the inguinal ligament, and the sac is medial to the femoral vein. Which classification best fits?', 'برجستگی در پایین رباط اینگوینال است و ساک در مدیال ورید فمورال قرار دارد. کدام دسته‌بندی مناسب‌تر است؟'),
    options: [L('Direkte Inguinalhernie', 'Direct inguinal hernia', 'فتق اینگوینال مستقیم'), L('Indirekte Inguinalhernie', 'Indirect inguinal hernia', 'فتق اینگوینال غیرمستقیم'), L('Femoralhernie', 'Femoral hernia', 'فتق فمورال')],
    answer: 2,
    feedback: L('Die Lage unterhalb des Leistenbandes und medial der Femoralvene spricht für eine Femoralhernie. Die Zuordnung berücksichtigt beide anatomischen Landmarken.', 'The position below the inguinal ligament and medial to the femoral vein supports a femoral hernia. This classification uses both anatomical landmarks.', 'قرارگیری در پایین رباط اینگوینال و مدیال ورید فمورال به نفع فتق فمورال است. این افتراق بر هر دو نشانهٔ آناتومیک تکیه دارد.'),
  },
  summary: [
    L('Oberhalb des Leistenbandes: Inguinalhernie; unterhalb: Femoralhernie.', 'Above the inguinal ligament: inguinal; below it: femoral.', 'بالای رباط اینگوینال: فتق اینگوینال؛ پایین آن: فتق فمورال.'),
    L('Indirekt liegt lateral, direkt medial der inferioren epigastrischen Gefäße.', 'Indirect is lateral and direct is medial to the inferior epigastric vessels.', 'نوع غیرمستقیم لترال و نوع مستقیم مدیال عروق اپی‌گاستریک تحتانی است.'),
    L('Eine Femoralhernie liegt typischerweise medial der Vena femoralis.', 'A femoral hernia is typically medial to the femoral vein.', 'فتق فمورال معمولاً در مدیال ورید فمورال قرار دارد.'),
    L('Sonographie als Erstlinie dynamisch mit Valsalva einsetzen; CT-Zeichen einer möglichen Komplikation beschreiben.', 'Use ultrasound as first-line imaging with dynamic Valsalva assessment; describe CT signs that may indicate complication.', 'سونوگرافی را به‌عنوان روش خط اول با بررسی دینامیک و والسالوا به‌کار ببرید؛ نشانه‌های CT که ممکن است دال بر عارضه باشند را توصیف کنید.'),
  ],
  visual: {
    src: '/educational/hernia-groin-map.svg',
    alt: L('Schematische Karte der Leistenregion mit Leistenband, epigastrischen Gefäßen, tiefem Leistenring, direktem und indirektem Verlauf sowie Femoralgefäßen; keine diagnostische Aufnahme.', 'Schematic map of the groin showing the inguinal ligament, epigastric vessels, deep ring, direct and indirect paths, and femoral vessels; not a diagnostic image.', 'نقشهٔ شماتیک کشالهٔ ران شامل رباط اینگوینال، عروق اپی‌گاستریک، حلقهٔ عمقی، مسیر مستقیم و غیرمستقیم و عروق فمورال؛ تصویر تشخیصی نیست.'),
  },
  sourceNote: L('Inhaltsgrundlage: bereitgestelltes Abdomen.pdf, PDF S.93–94 (Druck S.92–93), Abschnitt „Leistenhernie“. Die letzte Zeile zur freien Flüssigkeit ist im PDF unvollständig und wurde ausgelassen. Aussagen zu Häufigkeit, Inkarzerationsrisiko und einem CT-„Goldstandard“ wurden nicht übernommen. Die Skizze ist eine nichtdiagnostische, eigens erstellte Orientierung.', 'Content source: supplied Abdomen.pdf, PDF pp.93–94 (printed pp.92–93), “Leistenhernie” section. The final line on free fluid is incomplete and was omitted. Claims about frequency, incarceration risk and a CT “gold standard” were not carried over. The diagram is an original, non-diagnostic orientation schematic.', 'مبنای محتوا: Abdomen.pdf ارائه‌شده، صفحه‌های PDF ۹۳–۹۴ (چاپی ۹۲–۹۳)، بخش «فتق اینگوینال». سطر پایانی دربارهٔ مایع آزاد ناقص بود و حذف شد. ادعاهای فراوانی، خطر اینکارسراسیون و «استاندارد طلایی» بودن CT وارد نشدند. شکل، شماتیک جهت‌یابی اختصاصی و غیرتشخیصی است.'),
}
