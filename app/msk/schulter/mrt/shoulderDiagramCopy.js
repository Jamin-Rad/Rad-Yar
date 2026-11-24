const diagram = (title, variants) => ({ title, variants })

export const translatedDiagrams = {
  en: [
    diagram('Imaging axes and rotator interval', [
      ['Axial to oblique coronal', 'The dashed reference line follows the scapular blade through the centre of the glenoid.'],
      ['Oblique coronal to oblique sagittal', 'The reference line joins the superior and inferior glenoid poles.'],
      ['Axial · interval', 'The long head of the biceps and SGHL lie in the rotator interval. The upper subscapularis borders it anteriorly.'],
    ]),
    diagram('Acromion and critical shoulder angle', [
      ['CSA', 'The vertex is the inferior glenoid pole. The rays pass through the superior glenoid pole and the lateralmost acromial point.'],
      ['Bigliani I–IV', 'Oblique sagittal profiles in the same orientation. Anterior is to the left.'],
    ]),
    diagram('Partial tears in tendon cross-section', [
      ['PASTA', 'The defect opens onto the articular surface at the footprint.'],
      ['Reverse PASTA', 'The defect reaches the bursal surface at the footprint.'],
      ['PAINT', 'The articular-sided defect extends medially within the tendon.'],
      ['Interstitial', 'The lesion remains within the tendon. Both surfaces are intact.'],
    ]),
    diagram('Tear thickness and width', [
      ['Anterior bundle', 'The tendon is intact on the anterior slice.'],
      ['Posterior bundle', 'The defect spans the tendon from the bursa to the joint in the posterior slice.'],
      ['Tangent sign', 'The atrophic muscle belly lies below the line from the coracoid to the scapular spine.'],
    ]),
    diagram('Pulley and upper subscapularis tear', [
      ['Intact pulley', 'The pulley steers the long head of the biceps into the groove.'],
      ['Subscapularis tear', 'Comma tissue marks the retracted superior tendon edge. The biceps tendon can shift medially.'],
    ]),
    diagram('Intra-articular contact zones', [
      ['Posterosuperior', 'Contact between the posterior greater tuberosity and posterosuperior glenoid rim in ABER.'],
      ['Anterosuperior', 'Contact between the lesser tuberosity and anterior glenoid rim during internal rotation.'],
    ]),
    diagram('Glenoid track with a fixed HSI', [
      ['On-track · d = 0 mm', 'With D = 30 mm and d = 0 mm, the track is 24.9 mm. An HSI of 23 mm fits within it.'],
      ['Off-track · d = 5 mm', 'With D = 30 mm and d = 5 mm, the track is 19.9 mm. An HSI of 23 mm exceeds it by 3.1 mm.'],
    ]),
    diagram('Comparison at the anteroinferior glenoid rim', [
      ['GLAD', 'The articular cartilage is injured. The periosteum remains intact.'],
      ['Perthes', 'The detached labrum stays close to its normal position. The periosteal sleeve is intact.'],
      ['ALPSA', 'The labrum and stripped periosteal sleeve are displaced medially.'],
      ['Bankart', 'The labrum is detached and the periosteal sleeve is disrupted.'],
    ]),
    diagram('Dislocation direction and impaction site', [
      ['Anterior', 'The humeral head is displaced anteriorly. The impaction defect is posterolateral.'],
      ['Posterior', 'The humeral head is displaced posteriorly. The impaction defect is anteromedial.'],
    ]),
  ],
  fa: [
    diagram('محورهای طراحی برش و روتاتور اینتروال', [
      ['آکسیال به کرونال مایل', 'خط‌چین هم‌راستا با تیغهٔ اسکاپولا از مرکز گلنوئید می‌گذرد.'],
      ['کرونال مایل به ساژیتال مایل', 'خط مرجع قطب فوقانی و تحتانی گلنوئید را به هم وصل می‌کند.'],
      ['آکسیال · اینتروال', 'تاندون سر بلند بایسپس و SGHL در روتاتور اینتروال قرار دارند. بخش فوقانی ساب‌اسکاپولاریس در جلوی آن است.'],
    ]),
    diagram('آکرومیون و زاویهٔ بحرانی شانه', [
      ['CSA', 'رأس زاویه روی قطب تحتانی گلنوئید است. دو ضلع از قطب فوقانی گلنوئید و خارجی‌ترین نقطهٔ آکرومیون می‌گذرند.'],
      ['انواع I تا IV', 'هر چهار شکل در ساژیتال مایل با جهت یکسان رسم شده‌اند. سمت چپ تصویر قدامی است.'],
    ]),
    diagram('پارگی‌های نسبی در مقطع تاندون', [
      ['PASTA', 'نقص در محل اتصال تاندون به سطح مفصلی باز می‌شود.'],
      ['Reverse PASTA', 'نقص در محل اتصال به سطح سمت بورس می‌رسد.'],
      ['PAINT', 'نقص سمت مفصلی درون تاندون به سمت داخل امتداد دارد.'],
      ['داخل‌تاندونی', 'ضایعه محدود به درون تاندون است و هر دو سطح پیوسته‌اند.'],
    ]),
    diagram('ضخامت و عرض پارگی', [
      ['دستهٔ قدامی', 'در برش قدامی پیوستگی تاندون حفظ شده است.'],
      ['دستهٔ خلفی', 'در برش خلفی، نقص از سطح بورس تا سطح مفصلی امتداد دارد.'],
      ['علامت مماس', 'شکم عضلهٔ آتروفیک زیر خط اتصال کوراکوئید و خار اسکاپولا قرار دارد.'],
    ]),
    diagram('پولی و پارگی بخش فوقانی ساب‌اسکاپولاریس', [
      ['پولی سالم', 'پولی تاندون سر بلند بایسپس را به شیار بین‌تکمه‌ای هدایت می‌کند.'],
      ['پارگی ساب‌اسکاپولاریس', 'بافت ویرگولی لبهٔ فوقانی تاندون عقب‌کشیده را مشخص می‌کند. تاندون بایسپس ممکن است به داخل جابه‌جا شود.'],
    ]),
    diagram('ناحیه‌های تماس داخل‌مفصلی', [
      ['خلفی‌فوقانی', 'در ABER، بخش خلفی تکمهٔ بزرگ با لبهٔ خلفی‌فوقانی گلنوئید تماس پیدا می‌کند.'],
      ['قدامی‌فوقانی', 'در چرخش داخلی، تکمهٔ کوچک با لبهٔ قدامی گلنوئید تماس پیدا می‌کند.'],
    ]),
    diagram('گلنوئید ترک با HSI ثابت', [
      ['On-track · بدون نقص', 'با قطر سالم ۳۰ و نقص صفر میلی‌متر، ترک ۲۴٫۹ میلی‌متر است. HSI برابر ۲۳ میلی‌متر داخل ترک قرار می‌گیرد.'],
      ['Off-track · نقص ۵ میلی‌متری', 'با قطر سالم ۳۰ و نقص ۵ میلی‌متر، ترک ۱۹٫۹ میلی‌متر است. HSI برابر ۲۳ میلی‌متر، ۳٫۱ میلی‌متر از ترک بزرگ‌تر است.'],
    ]),
    diagram('مقایسهٔ ضایعات لبهٔ قدامی‌تحتانی گلنوئید', [
      ['GLAD', 'غضروف مفصلی آسیب دیده و پیوستگی پریوست حفظ شده است.'],
      ['Perthes', 'لابروم جداشده نزدیک موقعیت طبیعی می‌ماند. غلاف پریوست پیوسته است.'],
      ['ALPSA', 'لابروم و غلاف پریوستِ بلندشده به سمت داخل جابه‌جا می‌شوند.'],
      ['Bankart', 'لابروم جدا شده و غلاف پریوست گسیخته است.'],
    ]),
    diagram('جهت دررفتگی و محل نقص ایمپکشن', [
      ['قدامی', 'سر هومروس به سمت جلو جابه‌جا می‌شود. نقص در بخش خلفی‌خارجی است.'],
      ['خلفی', 'سر هومروس به سمت عقب جابه‌جا می‌شود. نقص در بخش قدامی‌داخلی است.'],
    ]),
  ],
}

export const canvasLabels = {
  en: {
    Glenoidpole: 'Glenoid poles', Humeruskopf: 'Humeral head', Skapulablatt: 'Scapular blade', Glenoidmitte: 'Glenoid centre',
    LBS: 'LHBT', Ventral: 'Anterior', Dorsal: 'Posterior', 'Laterales Akromion': 'Lateral acromion',
    'I · Flach': 'I · Flat', 'II · Gebogen': 'II · Curved', 'III · Haken': 'III · Hooked', 'IV · Konvex': 'IV · Convex',
    Bursaseite: 'Bursal side', Gelenkseite: 'Articular side', Korakoid: 'Coracoid', 'Spina scapulae': 'Scapular spine',
    Muskel: 'Muscle', Transmural: 'Full thickness', 'Durchgängige Sehne': 'Intact tendon',
    'Komma-Zeichen': 'Comma sign', 'Superiorer Kontaktbereich': 'Superior contact zone',
    'GT 19,9 mm': 'GT 19.9 mm', 'GT 24,9 mm': 'GT 24.9 mm', Knorpel: 'Cartilage', Periost: 'Periosteum',
  },
  fa: {
    Glenoidpole: 'قطب‌های گلنوئید', Humeruskopf: 'سر هومروس', Skapulablatt: 'تیغهٔ اسکاپولا', Glenoidmitte: 'مرکز گلنوئید',
    LBS: 'LHBT', Subscapularis: 'ساب‌اسکاپولاریس', Ventral: 'قدامی', Dorsal: 'خلفی', Anterior: 'قدامی', Posterior: 'خلفی',
    'Laterales Akromion': 'لبهٔ خارجی آکرومیون', Glenoid: 'گلنوئید', 'Anterior ←': '← قدامی',
    'I · Flach': 'I · تخت', 'II · Gebogen': 'II · خمیده', 'III · Haken': 'III · قلاب‌دار', 'IV · Konvex': 'IV · محدب',
    Bursaseite: 'سمت بورس', Gelenkseite: 'سمت مفصل', Footprint: 'محل اتصال', Korakoid: 'کوراکوئید', 'Spina scapulae': 'خار اسکاپولا',
    Muskel: 'عضله', Transmural: 'تمام‌ضخامت', 'Durchgängige Sehne': 'تاندون پیوسته', Pulley: 'پولی',
    'Komma-Zeichen': 'علامت ویرگول', 'Superiorer Kontaktbereich': 'ناحیهٔ تماس فوقانی', 'Glenoid en face': 'نمای روبه‌روی گلنوئید',
    'GT 19,9 mm': 'GT 19.9 mm', 'GT 24,9 mm': 'GT 24.9 mm', Knorpel: 'غضروف', Periost: 'پریوست', Labrum: 'لابروم',
    '← Medial': '← داخلی', 'Reverse Hill-Sachs': 'هیل‌ساکس معکوس', 'Hill-Sachs': 'هیل‌ساکس',
    'Reverse Bankart': 'بنکارت معکوس', Bankart: 'بنکارت',
  },
}
