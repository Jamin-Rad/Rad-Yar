const t = (de, en, fa) => ({ de, en, fa })

const SOURCE_LABEL = 'Dr. Zia'

export const CONTRAST_UI = {
  de: {
    toc: 'Inhaltsverzeichnis', breadcrumb: 'Technik · Kontrastmittel', mcq: 'MCQ', flashcards: 'Flashcards',
    mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden',
    auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', key: 'Merke', cave: 'CAVE',
    openImage: 'Bild vergrößern', closeImage: 'Bildansicht schließen', otherLessons: 'Weitere KM-Lektionen', sources: 'Leitlinien & Quellen', sourceNote: 'Für klinische Entscheidungen gelten aktuelle Fachinformationen und lokale Standards.',
  },
  en: {
    toc: 'Contents', breadcrumb: 'Technology · Contrast media', mcq: 'MCQs', flashcards: 'Flashcards',
    mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in',
    auth: 'Please sign in to save your learning progress.', key: 'Key point', cave: 'Caution',
    openImage: 'Enlarge image', closeImage: 'Close image view', otherLessons: 'Other contrast lessons', sources: 'Guidelines & sources', sourceNote: 'For clinical decisions, follow current product information and local standards.',
  },
  fa: {
    toc: 'فهرست مطالب', breadcrumb: 'تکنیک · مواد حاجب', mcq: 'MCQ', flashcards: 'فلش‌کارت',
    mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', signIn: 'ورود',
    auth: 'برای ذخیرهٔ پیشرفت یادگیری لطفاً وارد شوید.', key: 'نکتهٔ کلیدی', cave: 'هشدار',
    openImage: 'بزرگ‌نمایی تصویر', closeImage: 'بستن نمای تصویر', otherLessons: 'درس‌های دیگر مواد حاجب', sources: 'راهنماها و منابع', sourceNote: 'برای تصمیم‌گیری بالینی، اطلاعات به‌روز دارو و استانداردهای محلی رعایت شوند.',
  },
}

export const CONTRAST_LESSONS = {
  roentgen: {
    id: 'roentgen', sourceLabel: SOURCE_LABEL,
    title: t('Röntgen-Kontrastmittel', 'X-ray contrast media', 'مواد حاجب اشعهٔ ایکس'),
    subtitle: t(
      'Arten, Applikation, Ausscheidung, Reaktionen und gastrointestinale Anwendung',
      'Types, administration, elimination, reactions and gastrointestinal use',
      'انواع، نحوهٔ تجویز، دفع، واکنش‌ها و کاربرد گوارشی'
    ),
    stats: [
      { value: '≈ 300 mg/ml', label: t('Standard-Jodkonzentration', 'Standard iodine concentration', 'غلظت استاندارد ید'), text: t('Für die meisten intravenösen CT-Untersuchungen', 'For most intravenous CT examinations', 'برای بیشتر CTهای وریدی') },
      { value: '3–5 ml/s', label: t('Standard-Injektionsrate', 'Standard injection rate', 'سرعت استاندارد تزریق'), text: t('Typischerweise über eine 18G-Braunüle', 'Typically through an 18G cannula', 'معمولاً از آنژیوکت 18G') },
      { value: '≈ 90 %', label: t('Renale Elimination', 'Renal elimination', 'دفع کلیوی'), text: t('Nahezu vollständig nach 24 Stunden', 'Almost complete after 24 hours', 'تقریباً کامل طی ۲۴ ساعت') },
    ],
    sections: [
      {
        id: 'arten', icon: '◐', nav: t('Arten', 'Types', 'انواع'),
        title: t('Verschiedene Röntgen-Kontrastmittel', 'Types of X-ray contrast media', 'انواع مواد حاجب اشعهٔ ایکس'),
        lead: t(
          'Röntgen-Kontrastmittel werden nach ihrem Einfluss auf die Strahlenabsorption und nach ihrer Löslichkeit eingeteilt.',
          'X-ray contrast media are classified by their effect on X-ray attenuation and by solubility.',
          'مواد حاجب اشعهٔ ایکس بر اساس اثر بر جذب پرتو و میزان حلالیت طبقه‌بندی می‌شوند.'
        ),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Röntgennegative Kontrastmittel', 'Negative X-ray contrast media', 'مواد حاجب منفی'), text: t('Sie absorbieren Röntgenstrahlung nur gering oder gar nicht und lassen sie deshalb weitgehend ungehindert passieren.', 'They show little or no X-ray attenuation and therefore allow X-rays to pass largely unhindered.', 'جذب پرتو بسیار کم یا ناچیزی دارند و در نتیجه پرتو تقریباً بدون مانع عبور می‌کند.'), bullets: [t('Wasser', 'Water', 'آب'), t('Luft oder Gas, zum Beispiel CO₂', 'Air or gas, for example CO₂', 'هوا یا گاز، مانند CO₂')] },
            { title: t('Röntgenpositive Kontrastmittel', 'Positive X-ray contrast media', 'مواد حاجب مثبت'), text: t('Ihre höhere Ordnungszahl führt im Vergleich zum umgebenden Gewebe zu einer stärkeren Absorption der Röntgenstrahlung.', 'Their higher atomic number causes greater X-ray attenuation than surrounding tissue.', 'عدد اتمی بالاتر آن‌ها نسبت به بافت اطراف موجب جذب بیشتر پرتو می‌شود.'), bullets: [t('Wasserlösliche jodhaltige Kontrastmittel', 'Water-soluble iodinated agents', 'مواد حاجب یددار محلول در آب'), t('Wasserunlösliche Kontrastmittel', 'Water-insoluble agents', 'مواد حاجب نامحلول در آب')] },
          ]},
          { type: 'cards', columns: 2, items: [
            { title: t('Nicht-ionische jodhaltige Kontrastmittel', 'Non-ionic iodinated contrast media', 'مواد حاجب یددار غیر‌یونی'), text: t('Alle wasserlöslichen jodhaltigen Kontrastmittel besitzen einen Trijodbenzolring. Jod mit der Ordnungszahl 53 ist die röntgenkontrastgebende Substanz. Nicht-ionische Mittel sind ungeladen, hydrophiler und deutlich niedriger osmolar.', 'All water-soluble iodinated agents contain a tri-iodinated benzene ring. Iodine, atomic number 53, provides the X-ray contrast. Non-ionic agents are uncharged, more hydrophilic and markedly lower in osmolality.', 'همهٔ مواد یددار محلول در آب دارای حلقهٔ تری‌یودوبنزن هستند. ید با عدد اتمی ۵۳ عامل ایجاد کنتراست است. مواد غیر‌یونی فاقد بار، آب‌دوست‌تر و دارای اسمولاریتهٔ بسیار پایین‌تری هستند.'), bullets: [t('Beispiele: Imeron®, Ultravist®', 'Examples: Imeron®, Ultravist®', 'نمونه‌ها: Imeron® و Ultravist®'), t('Standard für die intravasale Anwendung; besser verträglich', 'Standard for intravascular use; better tolerated', 'استاندارد کاربرد داخل‌عروقی و با تحمل بهتر')] },
            { title: t('Ionische jodhaltige Kontrastmittel', 'Ionic iodinated contrast media', 'مواد حاجب یددار یونی'), text: t('Ionische Mittel besitzen eine höhere Osmolarität und ein höheres Nebenwirkungsprofil. Sie sind günstiger, aber nicht mehr für die intravasale Anwendung zugelassen.', 'Ionic agents have higher osmolality and more adverse effects. They are less expensive but are no longer approved for intravascular use.', 'مواد یونی اسمولاریته و میزان عوارض بیشتری دارند. ارزان‌ترند، اما دیگر برای مصرف داخل‌عروقی مجاز نیستند.'), bullets: [t('Beispiel: Gastrografin®', 'Example: Gastrografin®', 'نمونه: Gastrografin®'), t('Für die enterale Anwendung', 'For enteric use', 'برای کاربرد گوارشی')] },
          ]},
          { type: 'cards', columns: 2, items: [
            { title: t('Bariumsulfat', 'Barium sulphate', 'باریم سولفات'), text: t('Wasserunlösliches positives Kontrastmittel für die enterale Bildgebung.', 'A water-insoluble positive agent for enteric imaging.', 'مادهٔ حاجب مثبت نامحلول در آب برای تصویربرداری گوارشی.') },
            { title: t('Jodhaltige Öle', 'Iodinated oils', 'روغن‌های یددار'), text: t('Dienen zur Darstellung der Lymphbahnen in der Lymphangiographie und werden heute nur noch selten verwendet.', 'Used to demonstrate lymphatic pathways in lymphangiography and now only rarely employed.', 'برای نمایش مسیرهای لنفاوی در لنفانژیوگرافی استفاده می‌شوند و امروزه کاربرد کمی دارند.') },
          ]},
        ],
      },
      {
        id: 'applikation', icon: '↗', nav: t('Applikation', 'Administration', 'تجویز'),
        title: t('Kontrastmittel-Applikation und -Ausscheidung', 'Administration and elimination', 'تجویز و دفع مادهٔ حاجب'),
        lead: t('Konzentration, Gesamtmenge, Flussrate, Zugang und Untersuchungsziel müssen gemeinsam geplant werden.', 'Concentration, total volume, flow rate, access and examination target must be planned together.', 'غلظت، حجم کل، سرعت تزریق، مسیر و هدف بررسی باید هم‌زمان برنامه‌ریزی شوند.'),
        blocks: [
          { type: 'table', headers: [t('Untersuchung', 'Examination', 'بررسی'), t('Typische Einstellung', 'Typical setting', 'تنظیم معمول'), t('Begründung', 'Rationale', 'دلیل')], rows: [
            [t('Standard-CT', 'Standard CT', 'CT استاندارد'), t('Etwa 300 mg Jod/ml', 'About 300 mg iodine/ml', 'حدود ۳۰۰ mg ید/ml'), t('Für die meisten intravenösen CT-Untersuchungen ausreichend', 'Adequate for most intravenous CT examinations', 'برای بیشتر CTهای وریدی کافی است')],
            [t('CT-Angiographie', 'CT angiography', 'CT آنژیوگرافی'), t('350–375 mg Jod/ml', '350–375 mg iodine/ml', '۳۵۰ تا ۳۷۵ mg ید/ml'), t('Stärkere intravasale Kontrastierung', 'Stronger intravascular enhancement', 'کنتراست داخل‌عروقی بیشتر')],
            [t('LAE-CT', 'CTPA', 'CT آمبولی ریه'), t('Ca. 50–70 ml', 'Approx. 50–70 ml', 'حدود ۵۰ تا ۷۰ ml'), t('Kurzer, hochkonzentrierter Bolus', 'Short, highly concentrated bolus', 'بولوس کوتاه و پُرغلظت')],
            [t('CTA Aorta / supraaortal', 'Aortic / supra-aortic CTA', 'CTA آئورت/سوپرا‌آئورتیک'), t('Ca. 60–80 ml', 'Approx. 60–80 ml', 'حدود ۶۰ تا ۸۰ ml'), t('Rasche maximale Gefäßkontrastierung', 'Rapid peak vascular enhancement', 'رسیدن سریع به حداکثر کنتراست عروقی')],
            [t('Abdomen, portalvenös', 'Portal venous abdomen', 'شکم، فاز پورتال'), t('Ca. 80–120 ml', 'Approx. 80–120 ml', 'حدود ۸۰ تا ۱۲۰ ml'), t('Längere homogene Organanreicherung', 'Longer homogeneous organ enhancement', 'کنتراست یکنواخت و طولانی‌تر اندام‌ها')],
            [t('Abdomen, biphasisch', 'Biphasic abdomen', 'شکم دو فازی'), t('Ca. 100–140 ml', 'Approx. 100–140 ml', 'حدود ۱۰۰ تا ۱۴۰ ml'), t('Ausreichende Kontrastierung in mehreren Phasen', 'Adequate enhancement in multiple phases', 'کنتراست کافی در چند فاز')],
          ]},
          { type: 'callout', variant: 'key', text: t('Je schneller ein Gefäß maximal kontrastiert werden soll, desto kleiner kann das benötigte Volumen sein. Je länger ein Organ homogen kontrastiert werden muss, desto größer ist das Volumen.', 'The faster peak vascular enhancement is required, the smaller the volume may be. The longer homogeneous organ enhancement is needed, the larger the volume.', 'هرچه رسیدن به حداکثر کنتراست عروقی سریع‌تر لازم باشد، حجم می‌تواند کمتر باشد؛ هرچه کنتراست یکنواخت اندام باید طولانی‌تر بماند، حجم بیشتری لازم است.') },
          { type: 'cards', columns: 3, items: [
            { title: t('Art der Untersuchung', 'Type of examination', 'نوع بررسی'), text: t('CTs parenchymatöser Organe benötigen meist größere Volumina und langsamere Injektionen als CT-Angiographien.', 'Parenchymal CT generally requires larger volumes and slower injection than CT angiography.', 'CT اندام‌های پارانشیمی معمولاً نسبت به CT آنژیوگرافی به حجم بیشتر و تزریق آهسته‌تر نیاز دارد.') },
            { title: t('Körpergewicht', 'Body weight', 'وزن بدن'), text: t('Ein höheres Körpergewicht erfordert häufig ein höheres Volumen für eine ausreichende Kontrastierung.', 'Higher body weight often requires a larger volume for adequate enhancement.', 'وزن بالاتر اغلب برای کنتراست کافی به حجم بیشتری نیاز دارد.') },
            { title: t('Nierenrisiko', 'Renal risk', 'خطر کلیوی'), text: t('Bei erhöhtem Risiko für eine kontrastmittelassoziierte akute Nierenschädigung wird das Volumen reduziert.', 'Volume is reduced when the risk of contrast-associated acute kidney injury is increased.', 'در خطر بالاتر آسیب حاد کلیه مرتبط با مادهٔ حاجب، حجم کاهش داده می‌شود.') },
          ]},
          { type: 'table', headers: [t('Zugang / Rate', 'Access / rate', 'مسیر/سرعت'), t('Einordnung', 'Use', 'کاربرد')], rows: [
            [t('18G, 3–5 ml/s', '18G, 3–5 ml/s', '18G، ۳ تا ۵ ml/s'), t('Standard-Injektionsrate', 'Standard injection rate', 'سرعت استاندارد تزریق')],
            [t('20G, 3–4 ml/s', '20G, 3–4 ml/s', '20G، ۳ تا ۴ ml/s'), t('Ausreichend, insbesondere für ausschließlich portalvenöse Untersuchungen', 'Adequate, especially for portal venous examinations', 'به‌ویژه برای بررسی صرفاً پورتال کافی است')],
            [t('5 ml/s', '5 ml/s', '۵ ml/s'), t('LAE-Ausschluss und Charakterisierung hyper- oder hypovaskularisierter Tumoren', 'CTPA and characterisation of hyper- or hypovascular tumours', 'برای رد آمبولی ریه و مشخص‌کردن تومورهای هایپر یا هایپوواسکولار')],
            [t('22G oder ZVK, 2,5 ml/s', '22G or central line, 2.5 ml/s', '22G یا کاتتر مرکزی، ۲٫۵ ml/s'), t('Wenn möglich vermeiden: geringere Kontrastqualität und arterielle Abgrenzbarkeit', 'Avoid if possible: reduced enhancement quality and arterial delineation', 'در صورت امکان اجتناب شود؛ کیفیت کنتراست و تفکیک شریانی را کاهش می‌دهد')],
          ]},
          { type: 'cards', columns: 2, items: [
            { title: t('Renale Ausscheidung', 'Renal elimination', 'دفع کلیوی'), text: t('Etwa 90 % werden renal eliminiert. Die Plasmahalbwertszeit beträgt 1–3 Stunden: etwa 50 % nach 2 Stunden, 75 % nach 4 Stunden und nahezu vollständige Elimination nach 24 Stunden.', 'About 90% is eliminated renally. Plasma half-life is 1–3 hours: around 50% after 2 hours, 75% after 4 hours and almost complete elimination after 24 hours.', 'حدود ۹۰٪ از راه کلیه دفع می‌شود. نیمه‌عمر پلاسمایی ۱ تا ۳ ساعت است: حدود ۵۰٪ پس از ۲ ساعت، ۷۵٪ پس از ۴ ساعت و تقریباً کامل طی ۲۴ ساعت.') },
            { title: t('Extrarenale Ausscheidung', 'Extrarenal elimination', 'دفع خارج‌کلیوی'), text: t('Ein geringer Anteil wird über Leber und Galle, Darm sowie Speicheldrüsen ausgeschieden.', 'A small proportion is eliminated through liver and bile, bowel and salivary glands.', 'بخش کمی از راه کبد و صفرا، روده و غدد بزاقی دفع می‌شود.') },
          ]},
          { type: 'callout', variant: 'note', title: t('Umweltaspekt', 'Environmental aspect', 'نکتهٔ محیط‌زیستی'), text: t('Jodhaltige CT- und gadoliniumhaltige MRT-Kontrastmittel lassen sich kaum aus dem Abwasser filtern. Sie gelangen über den Urin ins Abwassersystem und sind im Trinkwasser messbar; effektive Gegenmaßnahmen fehlen derzeit.', 'Iodinated CT and gadolinium MRI agents are difficult to remove from wastewater. They enter sewage through urine and can be measured in drinking water; effective countermeasures are currently lacking.', 'مواد حاجب یددار CT و گادولینیومی MRI به‌سختی از فاضلاب جدا می‌شوند، از طریق ادرار وارد سیستم فاضلاب شده و در آب آشامیدنی قابل اندازه‌گیری‌اند؛ در حال حاضر راهکار مؤثری وجود ندارد.') },
        ],
      },
      {
        id: 'paravasat', icon: '!', nav: t('Paravasat', 'Extravasation', 'نشت خارج‌عروقی'),
        title: t('Paravasat-Management', 'Extravasation management', 'مدیریت نشت مادهٔ حاجب'),
        lead: t('Ein Paravasat verlangt sofortige Maßnahmen, eine strukturierte neurovaskuläre Kontrolle und klare Entlassungshinweise.', 'Extravasation requires immediate measures, structured neurovascular assessment and clear discharge advice.', 'نشت مادهٔ حاجب نیازمند اقدامات فوری، ارزیابی منظم نوروواسکولار و توصیه‌های روشن هنگام ترخیص است.'),
        blocks: [
          { type: 'steps', items: [
            { title: t('Injektion stoppen', 'Stop the injection', 'تزریق را متوقف کنید'), text: t('Zugang zunächst belassen und eine Aspiration versuchen; die Kanüle erst danach entfernen.', 'Initially leave the access in place and attempt aspiration; remove the cannula afterwards.', 'ابتدا مسیر را نگه دارید و آسپیراسیون را امتحان کنید؛ سپس آنژیوکت را خارج کنید.') },
            { title: t('Extremität behandeln', 'Treat the limb', 'رسیدگی به اندام'), text: t('Extremität hochlagern, kalte Kompresse jeweils etwa 20 Minuten mehrfach anwenden und die Ausdehnung mit einem Stift markieren.', 'Elevate the limb, apply a cold compress repeatedly for about 20 minutes and mark the extent with a pen.', 'اندام را بالا نگه دارید، کمپرس سرد را چند بار و هر بار حدود ۲۰ دقیقه قرار دهید و محدوده را با قلم علامت بزنید.') },
            { title: t('Befund dokumentieren', 'Document the event', 'ثبت رویداد'), text: t('Menge, Kontrastmitteltyp, klinischen Befund und alle Maßnahmen schriftlich festhalten.', 'Record volume, agent type, clinical findings and all measures.', 'حجم، نوع ماده، یافتهٔ بالینی و تمام اقدامات را ثبت کنید.') },
          ]},
          { type: 'cards', columns: 2, items: [
            { title: t('Durchblutung, Motorik und Sensorik', 'Perfusion, motor and sensory function', 'پرفیوژن، حرکت و حس'), text: t('Kapillarfüllzeit und distale Pulse sowie Parästhesien oder motorische Ausfälle prüfen.', 'Check capillary refill, distal pulses, paraesthesia and motor deficits.', 'پرشدن مویرگی، نبض‌های دیستال، پارستزی و اختلال حرکتی را بررسی کنید.') },
            { title: t('Spannung und Haut', 'Tension and skin', 'تنش بافت و پوست'), text: t('Auf zunehmendes Ödem, livide Verfärbung, Blasenbildung oder beginnende Nekrose achten. Eine Zunahme kann auf ein Kompartmentsyndrom hinweisen.', 'Look for increasing oedema, livid discoloration, blistering or early necrosis. Progression may indicate compartment syndrome.', 'به افزایش ادم، تغییر رنگ کبود، تاول یا شروع نکروز توجه کنید؛ پیشرفت علائم می‌تواند نشانهٔ سندرم کمپارتمان باشد.') },
          ]},
          { type: 'callout', variant: 'cave', title: t('Patienteninformation', 'Patient information', 'اطلاع به بیمار'), text: t('Schwellung, Rötung und Wärme können in den nächsten Stunden auftreten. Bei Zunahme, Blasenbildung, Taubheit, Hautverfärbung oder starken Schmerzen muss der Patient sofort eine Notaufnahme aufsuchen.', 'Swelling, redness and warmth may occur over the following hours. Increasing symptoms, blistering, numbness, skin discoloration or severe pain require immediate emergency assessment.', 'تورم، قرمزی و گرمی ممکن است در ساعات بعد رخ دهد. افزایش علائم، تاول، بی‌حسی، تغییر رنگ پوست یا درد شدید نیازمند مراجعهٔ فوری به اورژانس است.') },
        ],
      },
      {
        id: 'reaktionen', icon: '⚕', nav: t('Reaktionen', 'Reactions', 'واکنش‌ها'),
        title: t('Nebenwirkungen jodhaltiger Kontrastmittel', 'Adverse effects of iodinated contrast media', 'عوارض مواد حاجب یددار'),
        lead: t('Chemotoxische und allergieartige Reaktionen müssen unterschieden und nach Schweregrad eingeordnet werden.', 'Chemotoxic and allergic-like reactions must be distinguished and graded by severity.', 'واکنش‌های شیمیایی‌سمی و شبه‌آلرژیک باید از هم تفکیک و بر اساس شدت طبقه‌بندی شوند.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Chemotoxische Reaktion', 'Chemotoxic reaction', 'واکنش شیمیایی‌سمی'), text: t('Direkte chemische Wirkung des Kontrastmittels, nicht immunologisch vermittelt.', 'A direct chemical effect of the agent, not immune-mediated.', 'اثر مستقیم شیمیایی مادهٔ حاجب است و منشأ ایمنی ندارد.'), bullets: [t('Wärmegefühl', 'Warm sensation', 'احساس گرما'), t('Übelkeit und Erbrechen', 'Nausea and vomiting', 'تهوع و استفراغ'), t('Vasovagale Reaktion oder Arrhythmie', 'Vasovagal reaction or arrhythmia', 'واکنش وازوواگال یا آریتمی'), t('Zerebraler Krampfanfall', 'Cerebral seizure', 'تشنج مغزی')] },
            { title: t('Allergieartige Reaktion', 'Allergic-like reaction', 'واکنش شبه‌آلرژیک'), text: t('Sie ähnelt einer Allergie, ist jedoch meist nicht IgE-vermittelt. Als Mechanismus gelten unspezifische Mastzellaktivierung und Histaminausschüttung.', 'It resembles allergy but is usually not IgE-mediated. Non-specific mast-cell activation and histamine release are implicated.', 'شبیه آلرژی است اما معمولاً با IgE واسطه‌گری نمی‌شود؛ فعال‌شدن غیراختصاصی ماست‌سل و آزادشدن هیستامین مطرح است.') },
          ]},
          { type: 'table', headers: [t('Grad', 'Grade', 'درجه'), t('Typische Symptome', 'Typical symptoms', 'علائم تیپیک')], rows: [
            [t('1 · mild', '1 · mild', '۱ · خفیف'), t('Juckreiz, leichte Urtikaria, Erythem', 'Pruritus, mild urticaria, erythema', 'خارش، کهیر خفیف و اریتم')],
            [t('2 · moderat', '2 · moderate', '۲ · متوسط'), t('Deutliche Urtikaria, Bronchospasmus, Larynxödem', 'Marked urticaria, bronchospasm, laryngeal oedema', 'کهیر واضح، برونکواسپاسم و ادم حنجره')],
            [t('3 · schwer', '3 · severe', '۳ · شدید'), t('Hypotonie oder Schock; sehr selten, etwa 0,01–0,04 %', 'Hypotension or shock; very rare, about 0.01–0.04%', 'افت فشار یا شوک؛ بسیار نادر، حدود ۰٫۰۱ تا ۰٫۰۴٪')],
            [t('4 · lebensbedrohlich', '4 · life-threatening', '۴ · تهدیدکنندهٔ حیات'), t('Atemstillstand oder Herzstillstand', 'Respiratory or cardiac arrest', 'ایست تنفسی یا قلبی')],
          ]},
          { type: 'prose', title: t('Bei früherer allergieartiger Reaktion', 'Previous allergic-like reaction', 'سابقهٔ واکنش شبه‌آلرژیک'), paragraphs: [
            t('Zunächst ein alternatives Bildgebungsverfahren erwägen. Wenn Kontrastmittel erforderlich ist, möglichst einen Substanzwechsel vornehmen.', 'First consider an alternative imaging method. If contrast is required, use a different agent whenever possible.', 'ابتدا روش تصویربرداری جایگزین را در نظر بگیرید. اگر مادهٔ حاجب ضروری است، تا حد امکان نوع ماده را تغییر دهید.'),
            t('In der Studie von Park et al. 2018 trat bei Wiederholung derselben Substanz in 31 % erneut eine Reaktion auf, nach Substanzwechsel in 12 %.', 'In Park et al. 2018, recurrent reactions occurred in 31% with the same agent and 12% after changing the agent.', 'در مطالعهٔ Park و همکاران در سال ۲۰۱۸، تکرار واکنش با همان ماده ۳۱٪ و پس از تغییر ماده ۱۲٪ بود.'),
            t('H1-/H2-Blocker und Cortison werden im klinischen Alltag häufig eingesetzt, aber in aktuellen Leitlinien nicht generell empfohlen. Mit zusätzlichem H1-Blocker wurden erneute Reaktionen in 8–24 % beschrieben. Die Kombination war noch in ESUR Version 9.0 aufgeführt.', 'H1/H2 blockers and corticosteroids are often used in practice but are not generally recommended by current guidelines. Recurrent reactions of 8–24% have been reported despite an additional H1 blocker. The combination was still listed in ESUR version 9.0.', 'مسدودکننده‌های H1/H2 و کورتون در عمل زیاد استفاده می‌شوند، اما در راهنماهای فعلی به‌طور عمومی توصیه نمی‌شوند. با وجود H1 اضافی، واکنش مجدد ۸ تا ۲۴٪ گزارش شده است. این ترکیب در نسخهٔ ۹ راهنمای ESUR ذکر شده بود.'),
          ]},
          { type: 'callout', variant: 'key', text: t('Die oft genannte „Jodallergie“ existiert nicht. Jod ist als kleines Molekül nicht allergen; die Reaktion richtet sich gegen andere Molekülbestandteile.', 'The commonly used term “iodine allergy” is incorrect. Iodine is too small to be an allergen; reactions are directed against other molecular components.', 'اصطلاح رایج «آلرژی به ید» درست نیست. ید مولکول کوچکی است و آلرژن محسوب نمی‌شود؛ واکنش به اجزای مولکولی دیگر مربوط است.') },
        ],
      },
      {
        id: 'niere-kurz', icon: '⌁', nav: t('Niere', 'Kidney', 'کلیه'),
        title: t('Nierenfunktion – Kurzüberblick', 'Renal function — brief overview', 'مرور کوتاه عملکرد کلیه'),
        lead: t('Das Nierenrisiko gehört zur jodhaltigen Kontrastmittelgabe, wird in der eigenen Lektion „Nierenfunktion und KM“ jedoch ausführlich und zusammen mit Gadolinium behandelt.', 'Renal risk is part of iodinated contrast use but is covered in detail together with gadolinium in the dedicated renal lesson.', 'خطر کلیوی بخشی از کاربرد مادهٔ یددار است، اما در درس مستقل کلیه همراه با گادولینیوم به‌طور کامل بررسی می‌شود.'),
        blocks: [
          { type: 'cards', columns: 3, items: [
            { title: t('PC-AKI', 'PC-AKI', 'PC-AKI'), text: t('Kreatininanstieg innerhalb von 48–72 Stunden um ≥ 0,3 mg/dl oder auf das ≥ 1,5-Fache.', 'Creatinine rise within 48–72 hours by ≥0.3 mg/dL or to ≥1.5 times baseline.', 'افزایش کراتینین طی ۴۸ تا ۷۲ ساعت به میزان ≥۰٫۳ mg/dL یا ≥۱٫۵ برابر پایه.') },
            { title: t('Besonders relevant', 'Particularly relevant', 'اهمیت ویژه'), text: t('AKI, eGFR < 30 ml/min/1,73 m², große oder wiederholte Dosen und intraarterieller First-Pass.', 'AKI, eGFR below 30, large or repeated doses and intra-arterial first pass.', 'AKI، eGFR کمتر از ۳۰، دوز زیاد یا تکراری و عبور اول داخل‌شریانی.') },
            { title: t('Prävention', 'Prevention', 'پیشگیری'), text: t('Volumen minimieren, Volumenstatus optimieren und Mehrfachgaben innerhalb von 48–72 Stunden vermeiden.', 'Minimise volume, optimise hydration and avoid repeat doses within 48–72 hours.', 'کاهش حجم، بهینه‌کردن وضعیت مایعات و پرهیز از دوز تکراری طی ۴۸ تا ۷۲ ساعت.') },
          ]},
          { type: 'lessonLink', target: 'nierenfunktion', label: t('Zur ausführlichen Lektion: Nierenfunktion und KM', 'Open the detailed lesson: renal function and contrast media', 'رفتن به درس کامل: عملکرد کلیه و مواد حاجب') },
        ],
      },
      {
        id: 'schilddruese', icon: '△', nav: t('Schilddrüse', 'Thyroid', 'تیروئید'),
        title: t('Hyperthyreose und jodhaltiges Kontrastmittel', 'Hyperthyroidism and iodinated contrast', 'پرکاری تیروئید و مادهٔ یددار'),
        lead: t('Die Jodlast kann eine Hyperthyreose verstärken oder eine thyreotoxische Krise auslösen, besonders bei Basedow, multinodulärer Struma und Autonomie.', 'The iodine load can worsen hyperthyroidism or precipitate thyroid storm, especially in Graves disease, multinodular goitre and autonomy.', 'بار ید می‌تواند پرکاری تیروئید را تشدید یا بحران تیروتوکسیک ایجاد کند، به‌ویژه در گریوز، گواتر مولتی‌ندولر و اتونومی.'),
        blocks: [
          { type: 'cards', columns: 3, items: [
            { title: t('Zeitpunkt und Häufigkeit', 'Timing and frequency', 'زمان و فراوانی'), text: t('Die Reaktion tritt meist frühestens eine Woche nach der Gabe auf und ist extrem selten: etwa 100 Fälle bei 5 Millionen Gaben.', 'It usually occurs no earlier than one week after administration and is extremely rare: about 100 cases per 5 million doses.', 'معمولاً زودتر از یک هفته رخ نمی‌دهد و بسیار نادر است: حدود ۱۰۰ مورد در ۵ میلیون تزریق.') },
            { title: t('Latente Hyperthyreose', 'Subclinical hyperthyroidism', 'پرکاری تحت‌بالینی'), text: t('Natriumperchlorat (Irenat®) vor der Gabe und für 7–10 Tage weiter. Es blockiert die Jodaufnahme in die Schilddrüse.', 'Sodium perchlorate (Irenat®) before administration and for 7–10 days afterwards; it blocks thyroid iodine uptake.', 'سدیم پرکلرات (Irenat®) پیش از تزریق و به‌مدت ۷ تا ۱۰ روز؛ برداشت ید توسط تیروئید را مهار می‌کند.') },
            { title: t('Manifeste Hyperthyreose', 'Overt hyperthyroidism', 'پرکاری آشکار'), text: t('Absolute Kontraindikation außerhalb lebensbedrohlicher Situationen. Im Notfall, etwa Aortendissektion, Polytrauma oder Schlaganfall, Irenat mit Thiamazol oder Carbimazol kombinieren.', 'An absolute contraindication outside life-threatening situations. In emergencies such as aortic dissection, polytrauma or stroke, combine Irenat with thiamazole or carbimazole.', 'به‌جز شرایط تهدیدکنندهٔ حیات منع مطلق است. در اورژانس‌هایی مانند دایسکشن آئورت، پلی‌تروما یا سکته، Irenat با تیامازول یا کاربی‌مازول ترکیب شود.') },
          ]},
          { type: 'callout', variant: 'cave', title: t('Differenzierte Schilddrüsenkarzinome', 'Differentiated thyroid carcinoma', 'کارسینوم تمایزیافته تیروئید'), text: t('Bei papillären oder follikulären Schilddrüsenkarzinomen kann die Jodsättigung eine nachfolgende Radiojodtherapie verhindern. Die Kontrastmittelgabe muss deshalb streng mit der geplanten nuklearmedizinischen Therapie abgestimmt werden.', 'In papillary or follicular thyroid carcinoma, iodine saturation may interfere with subsequent radioiodine therapy. Administration must therefore be coordinated closely with the planned nuclear medicine treatment.', 'در کارسینوم پاپیلری یا فولیکولار، اشباع ید می‌تواند درمان بعدی با رادیوید را مختل کند؛ بنابراین تزریق باید دقیقاً با برنامهٔ پزشکی هسته‌ای هماهنگ شود.') },
        ],
      },
      {
        id: 'gastrointestinal', icon: '◫', nav: t('Gastrointestinal', 'Gastrointestinal', 'گوارشی'),
        title: t('Gastrointestinale Diagnostik', 'Gastrointestinal contrast imaging', 'تصویربرداری گوارشی با مادهٔ حاجب'),
        lead: t('Bariumsulfat und wasserlösliche jodhaltige Mittel unterscheiden sich wesentlich bei Perforations- und Aspirationsrisiko.', 'Barium sulphate and water-soluble iodinated agents differ substantially in perforation and aspiration risk.', 'باریم سولفات و مواد یددار محلول در آب از نظر خطر پرفوراسیون و آسپیراسیون تفاوت مهمی دارند.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Bariumsulfat', 'Barium sulphate', 'باریم سولفات'), text: t('Orale oder rektale Applikation. Es wird nicht resorbiert und als charakteristischer weißer Stuhl ausgeschieden.', 'Administered orally or rectally. It is not absorbed and is excreted as characteristic white stool.', 'خوراکی یا رکتال تجویز می‌شود، جذب نمی‌شود و به‌شکل مدفوع سفید دفع می‌گردد.') },
            { title: t('Doppelkontrast', 'Double contrast', 'کنتراست دوگانه'), text: t('Positives Barium benetzt die Schleimhaut, negatives CO₂ oder Methylzellulose distendiert das Lumen. Ziel ist die optimale Darstellung des Schleimhautreliefs, etwa kleiner Polypen oder früher Erosionen. Heute wird die Methode nur noch selten eingesetzt.', 'Positive barium coats the mucosa while negative CO₂ or methylcellulose distends the lumen. The goal is optimal mucosal detail, such as small polyps or early erosions. The technique is now rarely used.', 'باریم مثبت مخاط را می‌پوشاند و CO₂ یا متیل‌سلولز منفی لومن را متسع می‌کند؛ هدف نمایش دقیق مخاط، مانند پولیپ‌های کوچک یا اروزیون اولیه است. امروزه به‌ندرت استفاده می‌شود.') },
          ]},
          { type: 'table', headers: [t('Situation', 'Situation', 'وضعیت'), t('Problem bei Bariumsulfat', 'Problem with barium', 'مشکل باریم')], rows: [
            [t('Perforation / Anastomoseninsuffizienz', 'Perforation / anastomotic leak', 'پرفوراسیون/نشت آناستوموز'), t('Austritt in die Bauchhöhle kann eine schwere Barium-Peritonitis verursachen.', 'Leakage into the peritoneum may cause severe barium peritonitis.', 'ورود به حفرهٔ صفاق می‌تواند پریتونیت شدید باریمی ایجاد کند.')],
            [t('Aspirationsgefahr', 'Aspiration risk', 'خطر آسپیراسیون'), t('Nicht lungengängig; schwere Fremdkörperreaktion und Lungenödem möglich.', 'Not cleared from the lung; severe foreign-body reaction and pulmonary oedema may occur.', 'از ریه پاک نمی‌شود و می‌تواند واکنش شدید جسم خارجی و ادم ریه ایجاد کند.')],
            [t('Verdacht auf Ileus', 'Suspected obstruction', 'شک به ایلئوس'), t('Kann dem Darminhalt Wasser entziehen, eindicken und Obstruktion oder Obstipation verschlechtern.', 'May draw water from bowel content, harden and worsen obstruction or constipation.', 'می‌تواند آب محتویات روده را بگیرد، غلیظ شود و انسداد یا یبوست را بدتر کند.')],
          ]},
          { type: 'callout', variant: 'key', title: t('Wasserlösliches Kontrastmittel, zum Beispiel Gastrografin®', 'Water-soluble contrast, for example Gastrografin®', 'مادهٔ محلول در آب، مانند Gastrografin®'), text: t('Bei möglicher Perforation wird es vom Peritoneum resorbiert und verursacht keine Barium-Peritonitis. Wegen seiner Hyperosmolarität wirkt es abführend und kann bei Ileus therapeutisch wirken.', 'With possible perforation it is absorbed by the peritoneum and does not cause barium peritonitis. Its hyperosmolality has a laxative effect and may be therapeutic in obstruction.', 'در پرفوراسیون احتمالی از صفاق جذب می‌شود و پریتونیت باریمی ایجاد نمی‌کند. به‌علت هایپراسمولار بودن اثر ملین دارد و ممکن است در ایلئوس اثر درمانی داشته باشد.') },
        ],
      },
      {
        id: 'takehome', icon: '✓', nav: t('Take home', 'Take home', 'جمع‌بندی'),
        title: t('Take-Home Messages', 'Take-home messages', 'پیام‌های نهایی'),
        blocks: [{ type: 'takehome', items: [
          { title: t('Klasse bewusst wählen', 'Choose the class deliberately', 'انتخاب آگاهانهٔ نوع ماده'), text: t('Nicht-ionische jodhaltige Kontrastmittel sind der intravasale Standard; Barium und ionische wasserlösliche Mittel haben spezielle enterale Rollen.', 'Non-ionic iodinated agents are the intravascular standard; barium and ionic water-soluble agents have specific enteric roles.', 'مواد یددار غیر‌یونی استاندارد داخل‌عروقی هستند؛ باریم و مواد یونی محلول در آب نقش‌های گوارشی مشخص دارند.') },
          { title: t('Protokoll an die Frage anpassen', 'Match protocol to the question', 'تطبیق پروتکل با سؤال'), text: t('Jodkonzentration, Volumen und Flussrate richten sich nach Organ, Phase, Körpergewicht, Zugang und Nierenrisiko.', 'Iodine concentration, volume and flow rate depend on organ, phase, body weight, access and renal risk.', 'غلظت ید، حجم و سرعت تزریق به اندام، فاز، وزن، مسیر و خطر کلیوی بستگی دارد.') },
          { title: t('Reaktionen vorbereitet behandeln', 'Be prepared for reactions', 'آمادگی برای واکنش‌ها'), text: t('Reaktion einordnen, Substanzwechsel erwägen und bei schwerer Symptomatik sofort strukturiert handeln.', 'Classify the reaction, consider changing the agent and treat severe symptoms immediately using a structured approach.', 'واکنش را طبقه‌بندی کنید، تغییر ماده را در نظر بگیرید و در علائم شدید فوراً ساختاریافته اقدام کنید.') },
          { title: t('Paravasat und Kontraindikationen ernst nehmen', 'Respect extravasation and contraindications', 'توجه جدی به نشت و منع مصرف'), text: t('Neurovaskuläre Kontrolle, klare Warnzeichen und die richtige Wahl bei Perforation, Aspiration oder Hyperthyreose verhindern Komplikationen.', 'Neurovascular assessment, clear warning signs and correct selection in perforation, aspiration or hyperthyroidism prevent complications.', 'ارزیابی نوروواسکولار، علائم هشدار روشن و انتخاب درست در پرفوراسیون، آسپیراسیون یا پرکاری تیروئید از عوارض جلوگیری می‌کند.') },
        ]}],
      },
    ],
  },
  mrt: {
    id: 'mrt', sourceLabel: SOURCE_LABEL,
    title: t('MRT-Kontrastmittel', 'MRI contrast media', 'مواد حاجب MRI'),
    subtitle: t('Gadolinium, Chelatstabilität, Retention und leberspezifische Kontrastmittel', 'Gadolinium, chelate stability, retention and liver-specific agents', 'گادولینیوم، پایداری شلات، احتباس و مواد اختصاصی کبد'),
    stats: [
      { value: 'Gd³⁺', label: t('Als Chelat gebunden', 'Bound in a chelate', 'متصل در شلات'), text: t('Freies Gadolinium ist toxisch', 'Free gadolinium is toxic', 'گادولینیوم آزاد سمی است') },
      { value: '0,1 mmol/kg', label: t('Übliche Dosis', 'Typical dose', 'دوز معمول'), text: t('Primovist®: 0,025 mmol/kg', 'Primovist®: 0.025 mmol/kg', 'Primovist®: ۰٫۰۲۵ mmol/kg') },
      { value: 'Makrozyklisch', label: t('Routine-Standard', 'Routine standard', 'استاندارد روتین'), text: t('Sehr hohe Chelatstabilität', 'Very high chelate stability', 'پایداری بسیار بالای شلات') },
    ],
    sections: [
      {
        id: 'gadolinium', icon: 'Gd', nav: t('Gadolinium', 'Gadolinium', 'گادولینیوم'),
        title: t('Gadolinium und Chelatstruktur', 'Gadolinium and chelate structure', 'گادولینیوم و ساختار شلات'),
        lead: t('Gadolinium ist ein paramagnetisches Metall. Da freie Gd³⁺-Ionen toxisch sind, werden sie in einem stabilen Chelat gebunden.', 'Gadolinium is a paramagnetic metal. Because free Gd³⁺ ions are toxic, they are enclosed in a stable chelate.', 'گادولینیوم فلزی پارامغناطیس است. چون یون آزاد Gd³⁺ سمی است، در یک شلات پایدار محصور می‌شود.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Lineare Chelate', 'Linear chelates', 'شلات‌های خطی'), text: t('Offenkettige Struktur: Das Gadolinium-Ion ist weniger fest umschlossen. Daraus folgen geringere Stabilität und ein höheres Risiko für Gadoliniumablagerungen.', 'Open-chain structure: the gadolinium ion is less tightly enclosed, resulting in lower stability and more gadolinium retention.', 'ساختار زنجیره‌باز دارد و یون گادولینیوم را شل‌تر نگه می‌دارد؛ بنابراین پایداری کمتر و خطر رسوب بیشتر است.'), bullets: [t('Rote-Hand-Brief zu linearen Gadolinium-KM 2018', '2018 safety communication on linear GBCAs', 'هشدار ایمنی مواد خطی در سال ۲۰۱۸'), t('Viele lineare Mittel ruhen oder sind eingeschränkt', 'Many linear agents are suspended or restricted', 'بسیاری از مواد خطی تعلیق یا محدود شده‌اند')] },
            { title: t('Makrozyklische Chelate', 'Macrocyclic chelates', 'شلات‌های ماکروسیکلیک'), text: t('Die ringförmige Käfigstruktur umschließt das Ion fest und besitzt eine sehr hohe Stabilität.', 'The ring-shaped cage encloses the ion tightly and provides very high stability.', 'ساختار حلقوی قفس‌مانند، یون را محکم نگه می‌دارد و پایداری بسیار بالایی دارد.'), bullets: [t('Heutiger Routine-Standard', 'Current routine standard', 'استاندارد روتین امروز'), t('Beispiele: Gadovist®, Dotarem®', 'Examples: Gadovist®, Dotarem®', 'نمونه‌ها: Gadovist® و Dotarem®')] },
          ]},
          { type: 'callout', variant: 'note', title: t('Ausnahmen bei linearen Mitteln', 'Exceptions among linear agents', 'استثناهای مواد خطی'), text: t('Gadoxetsäure (Primovist®) und Gadobensäure (MultiHance®) dürfen für Leber-MRT weiter eingesetzt werden, weil makrozyklische Wirkstoffe dort weniger geeignet sind. Primovist® wird mit nur einem Viertel der üblichen Gadoliniumdosis gegeben: 0,025 statt 0,1 mmol/kg. Etwa 50 % werden biliär und 50 % renal eliminiert.', 'Gadoxetate (Primovist®) and gadobenate (MultiHance®) remain available for liver MRI because macrocyclic agents are less suitable for this role. Primovist® uses one quarter of the usual gadolinium dose: 0.025 rather than 0.1 mmol/kg. About 50% is excreted in bile and 50% renally.', 'Gadoxetate (Primovist®) و Gadobenate (MultiHance®) برای MRI کبد باقی مانده‌اند، زیرا مواد ماکروسیکلیک برای این هدف مناسب‌تر نیستند. دوز Primovist® تنها یک‌چهارم دوز معمول است: ۰٫۰۲۵ در برابر ۰٫۱ mmol/kg؛ حدود ۵۰٪ صفراوی و ۵۰٪ کلیوی دفع می‌شود.') },
        ],
      },
      {
        id: 'wirkung', icon: 'T1', nav: t('Wirkung', 'Effect', 'اثر'),
        title: t('Wirkmechanismus', 'Mechanism of action', 'مکانیسم اثر'),
        lead: t('Gadolinium verändert die Relaxationszeiten benachbarter Protonen. Die beobachtete Signalwirkung hängt von Sequenz, Konzentration und Dosis ab.', 'Gadolinium alters the relaxation times of nearby protons. The observed signal effect depends on sequence, concentration and dose.', 'گادولینیوم زمان‌های ریلکسیشن پروتون‌های مجاور را تغییر می‌دهد و اثر سیگنال به سکانس، غلظت و دوز وابسته است.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('T1-Effekt', 'T1 effect', 'اثر T1'), text: t('Verkürzung der T1-Relaxationszeit mit Signalanstieg in T1-gewichteten Sequenzen.', 'Shortening of T1 relaxation with increased signal on T1-weighted sequences.', 'کوتاه‌شدن T1 و افزایش سیگنال در سکانس‌های T1-weighted.') },
            { title: t('T2-Effekt', 'T2 effect', 'اثر T2'), text: t('Verkürzung der T2-Relaxationszeit mit Signalabfall; vor allem bei hoher Konzentration oder Hochdosis relevant.', 'Shortening of T2 relaxation with signal loss, mainly relevant at high concentration or dose.', 'کوتاه‌شدن T2 و افت سیگنال که عمدتاً در غلظت یا دوز بالا اهمیت دارد.') },
          ]},
        ],
      },
      {
        id: 'nsf', icon: '!', nav: t('NSF', 'NSF', 'NSF'),
        title: t('Nephrogene systemische Fibrose', 'Nephrogenic systemic fibrosis', 'فیبروز سیستمیک نفروژنیک'),
        lead: t('NSF ist eine schwere fibrosierende Erkrankung der Haut und inneren Organe, die heute dank stabilerer Präparate extrem selten geworden ist.', 'NSF is a severe fibrosing disease of skin and internal organs that has become extremely rare with more stable agents.', 'NSF بیماری شدید فیبروزان پوست و اندام‌های داخلی است که با مواد پایدارتر امروزه بسیار نادر شده است.'),
        blocks: [
          { type: 'steps', items: [
            { title: t('Freies Gadolinium', 'Free gadolinium', 'گادولینیوم آزاد'), text: t('Dissoziiertes Gadolinium lagert sich ab.', 'Dissociated gadolinium is deposited.', 'گادولینیوم جداشده رسوب می‌کند.') },
            { title: t('Fibroblastenaktivierung', 'Fibroblast activation', 'فعال‌شدن فیبروبلاست'), text: t('Die Ablagerung aktiviert Fibroblasten.', 'Deposits activate fibroblasts.', 'رسوبات فیبروبلاست‌ها را فعال می‌کنند.') },
            { title: t('Fibrose', 'Fibrosis', 'فیبروز'), text: t('Massive Kollagenablagerung führt zur Fibrosierung von Haut und Organen.', 'Massive collagen deposition causes fibrosis of skin and organs.', 'رسوب زیاد کلاژن موجب فیبروز پوست و اندام‌ها می‌شود.') },
          ]},
          { type: 'cards', columns: 2, items: [
            { title: t('Risikokonstellation', 'Risk setting', 'وضعیت پرخطر'), text: t('Nahezu ausschließlich bei schwerer Niereninsuffizienz mit eGFR < 30 ml/min/1,73 m² und nach Gabe linearer Kontrastmittel.', 'Almost exclusively in severe renal impairment with eGFR below 30 and after linear agents.', 'تقریباً فقط در نارسایی شدید کلیه با eGFR کمتر از ۳۰ و پس از مواد خطی.') },
            { title: t('eGFR-Bestimmung', 'eGFR testing', 'اندازه‌گیری eGFR'), text: t('Nach ESUR bei bekannter Nierenerkrankung, Diabetes, Hypertonie, Alter über 70 Jahre oder anderen Risikofaktoren; nicht zwingend bei jedem Patienten.', 'According to ESUR in known renal disease, diabetes, hypertension, age over 70 or other risk factors; not mandatory in every patient.', 'طبق ESUR در بیماری کلیوی شناخته‌شده، دیابت، فشارخون، سن بالای ۷۰ سال یا سایر عوامل خطر؛ نه الزاماً برای هر بیمار.') },
          ]},
          { type: 'lessonLink', target: 'nierenfunktion', label: t('Nierenfunktion, Dialyse und Gadolinium ausführlich vergleichen', 'Compare renal function, dialysis and gadolinium in detail', 'مقایسهٔ کامل عملکرد کلیه، دیالیز و گادولینیوم') },
        ],
      },
      {
        id: 'retention', icon: '◎', nav: t('Retention', 'Retention', 'احتباس'),
        title: t('Gadolinium-Retention im Gehirn', 'Gadolinium retention in the brain', 'احتباس گادولینیوم در مغز'),
        lead: t('Nach mehrfacher Gabe vor allem linearer Mittel können in nativen T1-Sequenzen Hyperintensitäten im Nucleus dentatus und Globus pallidus auftreten. Ein klinisches Korrelat ist bisher nicht bekannt.', 'After repeated administration, particularly of linear agents, native T1 hyperintensity may occur in the dentate nucleus and globus pallidus. No clinical correlate has been established.', 'پس از تزریق‌های متعدد، به‌ویژه مواد خطی، ممکن است در T1 نیتیو هایپرسیگنال در Nucleus dentatus و Globus pallidus دیده شود؛ ارتباط بالینی ثابت نشده است.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Nucleus dentatus', 'Dentate nucleus', 'Nucleus dentatus'), text: t('Im Marklager der Kleinhirnhemisphäre, lateral der übrigen Kleinhirnkerne.', 'Located in the white matter of the cerebellar hemisphere, lateral to the other deep cerebellar nuclei.', 'در مادهٔ سفید نیمکرهٔ مخچه و لترال هسته‌های عمقی دیگر مخچه قرار دارد.') },
            { title: t('Globus pallidus', 'Globus pallidus', 'Globus pallidus'), text: t('Medialer Anteil des Linsenkerns, lateral der Capsula interna und medial des Putamens.', 'The medial part of the lentiform nucleus, lateral to the internal capsule and medial to the putamen.', 'بخش مدیال هستهٔ عدسی، لترال کپسول داخلی و مدیال پوتامن است.') },
          ]},
          { type: 'imageGallery', images: [
            { src: '/kontrastmittel/gadolinium-retention-axial-1.jpg', alt: t('Axiale native T1-MRT auf Höhe der Kleinhirnkerne', 'Axial native T1 MRI at the level of the deep cerebellar nuclei', 'MRI محوری T1 نیتیو در سطح هسته‌های مخچه') },
            { src: '/kontrastmittel/gadolinium-retention-sagittal.jpg', alt: t('Sagittale native T1-MRT des Gehirns', 'Sagittal native T1 MRI of the brain', 'MRI ساژیتال T1 نیتیو مغز') },
            { src: '/kontrastmittel/gadolinium-retention-axial-2.jpg', alt: t('Axiale native T1-MRT der hinteren Schädelgrube', 'Axial native T1 MRI of the posterior fossa', 'MRI محوری T1 نیتیو حفرهٔ خلفی') },
          ]},
          { type: 'callout', variant: 'key', text: t('Retention ist nachweisbar, bedeutet aber nicht automatisch eine klinische Erkrankung und ist nicht mit NSF gleichzusetzen.', 'Retention is detectable but does not automatically indicate clinical disease and is not the same as NSF.', 'احتباس قابل مشاهده است، اما الزاماً به‌معنای بیماری بالینی نیست و با NSF یکسان نیست.') },
        ],
      },
      {
        id: 'leber', icon: 'L', nav: t('Leber', 'Liver', 'کبد'),
        title: t('Leberspezifische Kontrastmittel', 'Liver-specific contrast media', 'مواد حاجب اختصاصی کبد'),
        lead: t('Hepatozytenspezifische Kontrastmittel werden von funktionstüchtigen Hepatozyten aktiv aufgenommen und biliär ausgeschieden.', 'Hepatocyte-specific agents are actively taken up by functioning hepatocytes and excreted in bile.', 'مواد اختصاصی هپاتوسیت توسط هپاتوسیت‌های سالم فعالانه برداشت و از صفرا دفع می‌شوند.'),
        blocks: [
          { type: 'callout', variant: 'key', text: t('Funktionstüchtige Hepatozyten zeigen in der hepatobiliären Phase Enhancement; Läsionen ohne funktionierende Hepatozyten bleiben hypointens.', 'Functioning hepatocytes enhance in the hepatobiliary phase; lesions without functioning hepatocytes remain hypointense.', 'هپاتوسیت‌های سالم در فاز هپاتوبیلیاری Enhancement نشان می‌دهند و ضایعات فاقد هپاتوسیت فعال هایپواینتنس می‌مانند.') },
          { type: 'cards', columns: 2, items: [
            { title: t('FNH versus Adenom', 'FNH versus adenoma', 'FNH در برابر آدنوم'), text: t('FNH nimmt das Kontrastmittel auf; Adenome nehmen es meistens nicht auf.', 'FNH takes up the agent; adenomas usually do not.', 'FNH ماده را جذب می‌کند، اما آدنوم‌ها معمولاً جذب نمی‌کنند.') },
            { title: t('HCC in Zirrhose', 'HCC in cirrhosis', 'HCC در سیروز'), text: t('Gut differenzierte HCC können ebenfalls Kontrastmittel aufnehmen.', 'Well-differentiated HCC may also take up contrast.', 'HCC با تمایز خوب نیز ممکن است ماده را جذب کند.') },
            { title: t('Kleine Metastasen', 'Small metastases', 'متاستازهای کوچک'), text: t('Metastasen unter 1 cm bleiben in der hepatobiliären Phase hypointens und werden gegenüber dem angereicherten Parenchym sensitiver erkannt.', 'Metastases below 1 cm remain hypointense in the hepatobiliary phase and become more conspicuous against enhanced liver.', 'متاستازهای کمتر از ۱ سانتی‌متر در فاز هپاتوبیلیاری هایپواینتنس می‌مانند و در برابر پارانشیم پرکنتراست حساس‌تر دیده می‌شوند.') },
            { title: t('Gallengänge', 'Bile ducts', 'مجاری صفراوی'), text: t('Die biliäre Ausscheidung kann zur Darstellung einer Galleleckage genutzt werden.', 'Biliary excretion can demonstrate a bile leak.', 'دفع صفراوی می‌تواند برای نمایش نشت صفرا استفاده شود.') },
          ]},
          { type: 'table', headers: [t('Eigenschaft', 'Feature', 'ویژگی'), 'Primovist®', 'MultiHance®'], rows: [
            [t('Hepatozyten-Aufnahme', 'Hepatocyte uptake', 'برداشت هپاتوسیتی'), '≈ 50 %', '≈ 3–5 %'],
            [t('Hepatobiliäre Spätphase', 'Hepatobiliary phase', 'فاز هپاتوبیلیاری'), t('Nach etwa 20 min', 'After about 20 min', 'پس از حدود ۲۰ دقیقه'), t('Nach etwa 40–120 min', 'After about 40–120 min', 'پس از حدود ۴۰ تا ۱۲۰ دقیقه')],
          ]},
          { type: 'callout', variant: 'note', text: t('Primovist® ist das einzige im Dokument als hepatozytenspezifisch hervorgehobene Gadolinium-Kontrastmittel.', 'Primovist® is highlighted in the source document as the hepatocyte-specific gadolinium agent.', 'در فایل منبع Primovist® به‌عنوان مادهٔ گادولینیومی اختصاصی هپاتوسیت برجسته شده است.') },
        ],
      },
      {
        id: 'buscopan', icon: 'B', nav: t('Buscopan', 'Buscopan', 'Buscopan'),
        title: t('Begleitmedikation: Buscopan®', 'Adjunct medication: Buscopan®', 'داروی همراه: Buscopan®'),
        lead: t('Buscopan® ist ein Parasympatholytikum, das die glatte Muskulatur des Gastrointestinaltrakts vorübergehend lähmt und dadurch Bewegungsartefakte reduziert.', 'Buscopan® is an antimuscarinic agent that temporarily relaxes gastrointestinal smooth muscle and reduces motion artefact.', 'Buscopan® یک پاراسمپاتولیتیک است که موقتاً عضلهٔ صاف گوارش را شل و آرتیفکت حرکتی را کم می‌کند.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Kontraindikationen', 'Contraindications', 'موارد منع'), bullets: [t('Glaukom', 'Glaucoma', 'گلوکوم'), t('Prostatahyperplasie', 'Prostatic hyperplasia', 'هیپرپلازی پروستات'), t('Tachyarrhythmie', 'Tachyarrhythmia', 'تاکی‌آریتمی'), t('Mechanischer Ileus', 'Mechanical bowel obstruction', 'ایلئوس مکانیکی')] },
            { title: t('Alternative', 'Alternative', 'جایگزین'), text: t('Glucagon kann verwendet werden, wenn Buscopan® kontraindiziert ist.', 'Glucagon can be used when Buscopan® is contraindicated.', 'اگر Buscopan® منع داشته باشد می‌توان از گلوکاگون استفاده کرد.') },
          ]},
          { type: 'callout', variant: 'cave', text: t('Durch Pupillenerweiterung und vorübergehend gestörte Nahakkommodation gilt für 1–2 Stunden Fahrverbot; Maschinen dürfen nicht bedient werden.', 'Pupil dilation and temporary loss of near accommodation mean no driving or operating machinery for 1–2 hours.', 'به‌علت گشادشدن مردمک و اختلال موقت تطابق نزدیک، بیمار ۱ تا ۲ ساعت نباید رانندگی یا با دستگاه کار کند.') },
        ],
      },
      {
        id: 'takehome', icon: '✓', nav: t('Take home', 'Take home', 'جمع‌بندی'),
        title: t('Take-Home Messages', 'Take-home messages', 'پیام‌های نهایی'),
        blocks: [{ type: 'takehome', items: [
          { title: t('Gadolinium immer als Chelat denken', 'Think of gadolinium as a chelate', 'گادولینیوم را همیشه به‌صورت شلات در نظر بگیرید'), text: t('Die Chelatstabilität bestimmt das Freisetzungs- und Retentionsrisiko; makrozyklische Präparate sind Routine-Standard.', 'Chelate stability determines release and retention risk; macrocyclic agents are the routine standard.', 'پایداری شلات خطر آزادشدن و احتباس را تعیین می‌کند؛ مواد ماکروسیکلیک استاندارد روتین‌اند.') },
          { title: t('NSF und Retention trennen', 'Separate NSF from retention', 'NSF را از احتباس جدا کنید'), text: t('NSF ist eine seltene fibrosierende Erkrankung bei schwerer Niereninsuffizienz; Hirnretention ist nachweisbar, aber ohne gesichertes klinisches Korrelat.', 'NSF is a rare fibrosing disease in severe renal impairment; brain retention is detectable but lacks a proven clinical correlate.', 'NSF بیماری فیبروزان نادر در نارسایی شدید کلیه است؛ احتباس مغزی دیده می‌شود اما پیامد بالینی اثبات‌شده ندارد.') },
          { title: t('Lebermittel gezielt einsetzen', 'Use liver agents purposefully', 'کاربرد هدفمند مواد کبدی'), text: t('Hepatobiliäre Aufnahme erhöht die Sensitivität für kleine Läsionen und unterstützt die Differenzierung hepatocellulärer Befunde.', 'Hepatobiliary uptake improves sensitivity for small lesions and supports characterisation of hepatocellular lesions.', 'برداشت هپاتوبیلیاری حساسیت ضایعات کوچک را افزایش داده و تفکیک ضایعات هپاتوسلولار را کمک می‌کند.') },
          { title: t('Buscopan-Kontraindikationen prüfen', 'Check Buscopan contraindications', 'موارد منع Buscopan را بررسی کنید'), text: t('Glaukom, Prostatahyperplasie, Tachyarrhythmie und mechanischer Ileus aktiv abfragen.', 'Actively check for glaucoma, prostatic hyperplasia, tachyarrhythmia and mechanical obstruction.', 'گلوکوم، هیپرپلازی پروستات، تاکی‌آریتمی و ایلئوس مکانیکی را فعالانه بررسی کنید.') },
        ]}],
      },
    ],
  },
  schwangerschaft: {
    id: 'schwangerschaft', sourceLabel: SOURCE_LABEL,
    title: t('Schwangere und Stillende', 'Pregnancy and breastfeeding', 'بارداری و شیردهی'),
    subtitle: t('Jodhaltige und gadoliniumhaltige Kontrastmittel sicher abwägen', 'Balancing iodinated and gadolinium contrast safely', 'ارزیابی ایمن مواد یددار و گادولینیومی'),
    stats: [
      { value: '10.–12. SSW', label: t('Fetale Schilddrüse', 'Fetal thyroid', 'تیروئید جنین'), text: t('Ab dann relevante Jodaufnahme', 'Relevant iodine uptake begins', 'شروع برداشت مهم ید') },
      { value: '< 0,04 %', label: t('Gadolinium in Muttermilch', 'Gadolinium in breast milk', 'گادولینیوم در شیر'), text: t('Orale Resorption zusätzlich minimal', 'Oral absorption is also minimal', 'جذب خوراکی نیز ناچیز است') },
      { value: 'Keine Pause', label: t('Stillen', 'Breastfeeding', 'شیردهی'), text: t('Routinemäßig nicht unterbrechen', 'No routine interruption', 'به‌طور روتین قطع نشود') },
    ],
    sections: [
      {
        id: 'grundprinzip', icon: '1', nav: t('Grundprinzip', 'Principle', 'اصل کلی'),
        title: t('Grundprinzipien in der Schwangerschaft', 'Principles during pregnancy', 'اصول کاربرد در بارداری'),
        lead: t('Die Indikation muss streng gestellt werden. Kontrastmittel sollen nur gegeben werden, wenn die Untersuchung nicht bis nach der Entbindung verschoben werden kann und eine kontrastmittelfreie Alternative nicht ausreicht.', 'Indication must be strict. Contrast should be used only when imaging cannot wait until after delivery and a non-contrast alternative is insufficient.', 'اندیکاسیون باید سخت‌گیرانه باشد. مادهٔ حاجب فقط زمانی استفاده شود که بررسی را نتوان تا پس از زایمان به تعویق انداخت و روش بدون کنتراست کافی نباشد.'),
        blocks: [
          { type: 'steps', items: [
            { title: t('Notwendigkeit klären', 'Confirm necessity', 'ضرورت را مشخص کنید'), text: t('Prüfen, ob das Ergebnis Diagnose oder Management relevant verändert.', 'Confirm that the result will meaningfully change diagnosis or management.', 'بررسی کنید نتیجه واقعاً تشخیص یا درمان را تغییر می‌دهد.') },
            { title: t('Alternativen prüfen', 'Review alternatives', 'جایگزین‌ها را بررسی کنید'), text: t('Kontrastmittelfreie MRT, Sonographie oder zeitliche Verschiebung erwägen.', 'Consider non-contrast MRI, ultrasound or postponement.', 'MRI بدون کنتراست، سونوگرافی یا تعویق را در نظر بگیرید.') },
            { title: t('Aufklären und dokumentieren', 'Counsel and document', 'توضیح و ثبت'), text: t('Indikation, Alternativen und Nutzen-Risiko-Abwägung detailliert dokumentieren.', 'Document indication, alternatives and benefit–risk assessment in detail.', 'اندیکاسیون، جایگزین‌ها و ارزیابی سود و خطر را دقیق ثبت کنید.') },
          ]},
        ],
      },
      {
        id: 'jod', icon: 'I', nav: t('Jodhaltige KM', 'Iodinated contrast', 'مادهٔ یددار'),
        title: t('Jodhaltige Kontrastmittel in der Schwangerschaft', 'Iodinated contrast during pregnancy', 'مواد حاجب یددار در بارداری'),
        lead: t('Jodhaltige Kontrastmittel passieren die Plazenta. Die fetale Schilddrüse kann Jod ab etwa der 10.–12. Schwangerschaftswoche aufnehmen.', 'Iodinated contrast crosses the placenta. The fetal thyroid can take up iodine from about 10–12 weeks of gestation.', 'مواد یددار از جفت عبور می‌کنند و تیروئید جنین از حدود هفتهٔ ۱۰ تا ۱۲ بارداری می‌تواند ید را جذب کند.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Theoretisches Risiko', 'Theoretical risk', 'خطر تئوریک'), text: t('Eine fetale oder neonatale Hypothyreose ist theoretisch möglich, klinisch aber selten relevant.', 'Fetal or neonatal hypothyroidism is theoretically possible but rarely clinically relevant.', 'کم‌کاری تیروئید جنین یا نوزاد از نظر تئوریک ممکن است، اما از نظر بالینی نادر است.') },
            { title: t('Wolff-Chaikoff-Effekt', 'Wolff–Chaikoff effect', 'اثر Wolff–Chaikoff'), text: t('Eine hohe Jodlast kann die fetale Schilddrüsenhormonbildung vorübergehend hemmen. Der Fetus entkommt dieser Blockade weniger zuverlässig als Erwachsene.', 'A high iodine load can transiently suppress fetal thyroid hormone production. The fetus escapes this block less reliably than adults.', 'بار زیاد ید می‌تواند موقتاً تولید هورمون تیروئید جنین را مهار کند و جنین نسبت به بالغین کمتر از این مهار خارج می‌شود.') },
          ]},
          { type: 'callout', variant: 'key', title: t('Nach der Geburt', 'After delivery', 'پس از تولد'), text: t('Nach jodhaltiger Kontrastmittelgabe in der Schwangerschaft soll die Schilddrüsenfunktion des Neugeborenen kontrolliert werden, insbesondere der TSH-Wert.', 'After iodinated contrast during pregnancy, neonatal thyroid function should be checked, particularly TSH.', 'پس از تزریق مادهٔ یددار در بارداری، عملکرد تیروئید نوزاد، به‌ویژه TSH، بررسی شود.') },
        ],
      },
      {
        id: 'gadolinium', icon: 'Gd', nav: t('Gadolinium', 'Gadolinium', 'گادولینیوم'),
        title: t('Gadoliniumhaltige Kontrastmittel in der Schwangerschaft', 'Gadolinium contrast during pregnancy', 'مواد گادولینیومی در بارداری'),
        lead: t('Gadoliniumhaltige Mittel passieren die Plazenta, werden vom Fetus renal ins Fruchtwasser ausgeschieden, oral wieder aufgenommen und gelangen erneut in den fetalen Kreislauf.', 'Gadolinium agents cross the placenta, are excreted by the fetal kidneys into amniotic fluid, swallowed and re-enter the fetal circulation.', 'مواد گادولینیومی از جفت عبور کرده، از کلیهٔ جنین وارد مایع آمنیوتیک می‌شوند، دوباره بلعیده و وارد گردش جنین می‌گردند.'),
        blocks: [
          { type: 'callout', variant: 'cave', text: t('Freies Gadolinium im Fruchtwasser ist potenziell teratogen oder toxisch; das tatsächliche Risiko ist unbekannt. Gadolinium möglichst vermeiden, besonders im ersten Trimester.', 'Free gadolinium in amniotic fluid is potentially teratogenic or toxic; the actual risk is unknown. Avoid gadolinium whenever possible, especially in the first trimester.', 'گادولینیوم آزاد در مایع آمنیوتیک بالقوه تراتوژن یا سمی است و خطر واقعی ناشناخته است. تا حد امکان، به‌ویژه در سه‌ماههٔ اول، از آن پرهیز شود.') },
          { type: 'cards', columns: 2, items: [
            { title: t('Nur bei zwingender Indikation', 'Only when essential', 'فقط در ضرورت قطعی'), text: t('Die zusätzliche diagnostische Information muss eine relevante klinische Konsequenz haben.', 'The additional diagnostic information must have a meaningful clinical consequence.', 'اطلاعات تشخیصی اضافه باید پیامد بالینی مهمی داشته باشد.') },
            { title: t('Makrozyklisch bevorzugen', 'Prefer macrocyclic agents', 'ترجیح مواد ماکروسیکلیک'), text: t('Wenn Gadolinium unvermeidbar ist, wegen der geringeren Dissoziation ein makrozyklisches Präparat wählen.', 'If gadolinium is unavoidable, choose a macrocyclic agent because of lower dissociation.', 'اگر گادولینیوم اجتناب‌ناپذیر است، به‌علت جداشدن کمتر از مادهٔ ماکروسیکلیک استفاده شود.') },
          ]},
        ],
      },
      {
        id: 'stillzeit', icon: '◡', nav: t('Stillzeit', 'Breastfeeding', 'شیردهی'),
        title: t('Kontrastmittel in der Stillzeit', 'Contrast media during breastfeeding', 'مواد حاجب در شیردهی'),
        lead: t('Nach jodhaltigen oder gadoliniumhaltigen Kontrastmitteln ist routinemäßig keine Stillpause erforderlich.', 'Routine interruption of breastfeeding is not required after iodinated or gadolinium contrast.', 'پس از مادهٔ یددار یا گادولینیومی، به‌طور روتین قطع شیردهی لازم نیست.'),
        blocks: [
          { type: 'table', headers: [t('Kontrastmittel', 'Agent', 'ماده'), t('Übergang in die Milch', 'Transfer into milk', 'ورود به شیر'), t('Aufnahme beim Säugling', 'Infant exposure', 'مواجههٔ شیرخوار')], rows: [
            [t('Jodhaltig', 'Iodinated', 'یددار'), t('Etwa 0,5 % der mütterlichen Dosis', 'About 0.5% of the maternal dose', 'حدود ۰٫۵٪ دوز مادر'), t('Orale Bioverfügbarkeit sehr gering', 'Very low oral bioavailability', 'فراهمی زیستی خوراکی بسیار کم')],
            [t('Gadoliniumhaltig', 'Gadolinium-based', 'گادولینیومی'), t('Weniger als 0,04 % der mütterlichen Dosis', 'Less than 0.04% of the maternal dose', 'کمتر از ۰٫۰۴٪ دوز مادر'), t('Orale Resorption minimal', 'Minimal oral absorption', 'جذب خوراکی ناچیز')],
          ]},
          { type: 'callout', variant: 'note', text: t('Wenn die Mutter trotz Aufklärung sehr beunruhigt ist, kann sie aus persönlicher Entscheidung 24 Stunden pausieren und die Milch verwerfen. Medizinisch erforderlich ist dies normalerweise nicht.', 'If the mother remains very concerned after counselling, she may elect to pause for 24 hours and discard milk. This is not normally medically required.', 'اگر مادر با وجود توضیح همچنان بسیار نگران است، می‌تواند با تصمیم شخصی ۲۴ ساعت شیردهی را قطع و شیر را دور بریزد؛ از نظر پزشکی معمولاً لازم نیست.') },
        ],
      },
      {
        id: 'takehome', icon: '✓', nav: t('Take home', 'Take home', 'جمع‌بندی'),
        title: t('Take-Home Messages', 'Take-home messages', 'پیام‌های نهایی'),
        blocks: [{ type: 'takehome', items: [
          { title: t('Indikation zuerst', 'Indication first', 'ابتدا اندیکاسیون'), text: t('Nur untersuchen, wenn Verschieben oder eine kontrastmittelfreie Alternative nicht ausreichen.', 'Use contrast only when postponement or a non-contrast alternative is insufficient.', 'فقط وقتی استفاده شود که تعویق یا روش بدون کنتراست کافی نباشد.') },
          { title: t('Jod: Schilddrüse mitdenken', 'Iodine: consider the thyroid', 'ید: تیروئید را در نظر بگیرید'), text: t('Plazentagängig; nach der Geburt neonatale Schilddrüsenkontrolle einplanen.', 'It crosses the placenta; plan neonatal thyroid assessment after delivery.', 'از جفت عبور می‌کند؛ پس از تولد بررسی تیروئید نوزاد برنامه‌ریزی شود.') },
          { title: t('Gadolinium möglichst vermeiden', 'Avoid gadolinium where possible', 'تا حد امکان پرهیز از گادولینیوم'), text: t('Nur bei relevantem Zusatznutzen, besonders streng im ersten Trimester, und dann makrozyklisch.', 'Use only for meaningful added value, especially restrictively in the first trimester, and choose a macrocyclic agent.', 'فقط با ارزش افزودهٔ مهم، به‌ویژه سخت‌گیرانه در سه‌ماههٔ اول، و ترجیحاً ماکروسیکلیک.') },
          { title: t('Stillen darf weitergehen', 'Breastfeeding can continue', 'شیردهی ادامه یابد'), text: t('Die kindliche Exposition ist bei beiden Kontrastmittelklassen extrem gering.', 'Infant exposure is extremely low with both agent classes.', 'مواجههٔ شیرخوار در هر دو گروه بسیار ناچیز است.') },
        ]}],
      },
    ],
  },
  nierenfunktion: {
    id: 'nierenfunktion', sourceLabel: SOURCE_LABEL,
    title: t('Nierenfunktion und KM', 'Renal function and contrast media', 'عملکرد کلیه و مواد حاجب'),
    subtitle: t('Jodhaltige und gadoliniumhaltige Kontrastmittel gemeinsam beurteilen', 'Assessing iodinated and gadolinium agents together', 'ارزیابی هم‌زمان مواد یددار و گادولینیومی'),
    stats: [
      { value: '< 30', label: t('eGFR-Hochrisikobereich', 'High-risk eGFR range', 'محدودهٔ پرخطر eGFR'), text: t('ml/min/1,73 m²', 'ml/min/1.73 m²', 'ml/min/1.73 m²') },
      { value: '48–72 h', label: t('PC-AKI-Zeitfenster', 'PC-AKI time window', 'بازهٔ PC-AKI'), text: t('Kreatininanstieg nach KM', 'Creatinine rise after contrast', 'افزایش کراتینین پس از ماده') },
      { value: '0,9 % NaCl', label: t('Bevorzugte Hydrierung', 'Preferred hydration', 'هیدراتاسیون ترجیحی'), text: t('Individuell anpassen', 'Individualise the regimen', 'برنامه فردی تنظیم شود') },
    ],
    sections: [
      {
        id: 'definition', icon: '1', nav: t('Definition', 'Definition', 'تعریف'),
        title: t('PC-AKI: Begriff und Definition', 'PC-AKI: terminology and definition', 'PC-AKI: اصطلاح و تعریف'),
        lead: t('Der frühere Begriff CIN unterstellte einen kausalen Zusammenhang. PC-AKI beschreibt neutral eine akute Nierenschädigung nach Kontrastmittelgabe.', 'The former term CIN implied causality. PC-AKI neutrally describes acute kidney injury occurring after contrast administration.', 'اصطلاح قدیمی CIN رابطهٔ علّی را القا می‌کرد؛ PC-AKI به‌طور خنثی آسیب حاد کلیه پس از مادهٔ حاجب را توصیف می‌کند.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Alter Begriff: CIN', 'Former term: CIN', 'اصطلاح قدیمی: CIN'), text: t('Kontrastmittelinduzierte Nephropathie; der Name suggeriert, dass das Kontrastmittel die Ursache ist.', 'Contrast-induced nephropathy; the term suggests that contrast is the cause.', 'نفروپاتی ناشی از کنتراست؛ نام آن مادهٔ حاجب را علت قطعی نشان می‌دهد.') },
            { title: t('Neuer Begriff: PC-AKI', 'Current term: PC-AKI', 'اصطلاح جدید: PC-AKI'), text: t('Post-Contrast Acute Kidney Injury. Studien zeigen, dass akutes Nierenversagen ähnlich häufig nach nativer und kontrastverstärkter CT auftritt; ein Kausalzusammenhang ist daher nicht immer gesichert.', 'Post-contrast acute kidney injury. Studies show similar AKI rates after unenhanced and contrast-enhanced CT, so causality is not always established.', 'آسیب حاد کلیه پس از کنتراست. مطالعات میزان مشابه AKI پس از CT نیتیو و با کنتراست را نشان می‌دهند؛ بنابراین رابطهٔ علّی همیشه ثابت نیست.') },
          ]},
          { type: 'callout', variant: 'key', title: t('ESUR-Definition', 'ESUR definition', 'تعریف ESUR'), text: t('Anstieg des Serumkreatinins innerhalb von 48–72 Stunden nach intravaskulärer Kontrastmittelgabe um ≥ 0,3 mg/dl oder auf das ≥ 1,5-Fache des Ausgangswerts.', 'Rise in serum creatinine within 48–72 hours after intravascular contrast by ≥0.3 mg/dL or to ≥1.5 times baseline.', 'افزایش کراتینین سرم طی ۴۸ تا ۷۲ ساعت پس از تزریق داخل‌عروقی به میزان ≥۰٫۳ mg/dL یا ≥۱٫۵ برابر مقدار پایه.') },
        ],
      },
      {
        id: 'jodrisiko', icon: 'I', nav: t('Jod-KM', 'Iodinated agents', 'مواد یددار'),
        title: t('Risikofaktoren bei jodhaltigem Kontrastmittel', 'Risk factors with iodinated contrast', 'عوامل خطر مواد یددار'),
        lead: t('Das Risiko wird durch die Nierenfunktion, einen akuten Nierenschaden, den Applikationsweg, Dosis und Wiederholungen bestimmt.', 'Risk is determined by renal function, acute kidney injury, route, dose and repeat exposure.', 'خطر به عملکرد کلیه، AKI، مسیر تجویز، دوز و تکرار تزریق وابسته است.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('Renaler First-Pass-Effekt', 'Renal first-pass exposure', 'عبور اول کلیوی'), text: t('Intraarterielle Gabe proximal der Nierenarterien: Das Kontrastmittel erreicht die Nieren direkt und in hoher Konzentration. Relevant bei eGFR < 45 ml/min/1,73 m² und bei Intensivpatienten.', 'Intra-arterial administration proximal to the renal arteries: the kidneys receive a high concentration directly. Relevant below eGFR 45 and in intensive-care patients.', 'تزریق داخل‌شریانی پروگزیمال به شریان‌های کلیوی؛ کلیه مستقیماً غلظت بالایی دریافت می‌کند. در eGFR کمتر از ۴۵ و بیماران ICU مهم است.') },
            { title: t('Renaler Second-Pass-Effekt', 'Renal second-pass exposure', 'عبور دوم کلیوی'), text: t('Intravenöse oder intraarterielle Gabe distal der Nierenarterien: Das Mittel wird zunächst im Körperkreislauf verteilt und erreicht die Niere verdünnt. Besonders relevant bei eGFR < 30 ml/min/1,73 m².', 'Intravenous or intra-arterial administration distal to the renal arteries: the agent is diluted in the systemic circulation before reaching the kidney. Particularly relevant below eGFR 30.', 'تزریق وریدی یا داخل‌شریانی دیستال به شریان‌های کلیوی؛ ماده ابتدا در گردش سیستمیک رقیق می‌شود. در eGFR کمتر از ۳۰ اهمیت ویژه دارد.') },
          ]},
          { type: 'list', title: t('Patientenbezogene Risikofaktoren', 'Patient-related risk factors', 'عوامل خطر مربوط به بیمار'), items: [
            t('Bekanntes oder vermutetes akutes Nierenversagen', 'Known or suspected acute kidney injury', 'AKI شناخته‌شده یا مشکوک'),
            t('eGFR < 45 bei renalem First-Pass-Effekt oder Intensivpatienten', 'eGFR below 45 with renal first pass or intensive-care status', 'eGFR کمتر از ۴۵ با عبور اول یا بستری ICU'),
            t('eGFR < 30 bei intravenöser oder intraarterieller Second-Pass-Gabe', 'eGFR below 30 with intravenous or intra-arterial second-pass administration', 'eGFR کمتر از ۳۰ در تزریق وریدی یا عبور دوم'),
          ]},
          { type: 'list', title: t('Untersuchungsbezogene Risikofaktoren', 'Procedure-related risk factors', 'عوامل خطر مربوط به بررسی'), items: [
            t('Intraarterielle Gabe mit renalem First-Pass-Effekt', 'Intra-arterial administration with renal first-pass exposure', 'تزریق داخل‌شریانی با عبور اول کلیوی'),
            t('Große Kontrastmittelmengen', 'Large contrast volumes', 'حجم زیاد مادهٔ حاجب'),
            t('Hochosmolare Röntgenkontrastmittel', 'High-osmolar X-ray contrast', 'مواد اشعهٔ ایکس هایپراسمولار'),
            t('Mehrfache Gaben innerhalb von 48–72 Stunden', 'Repeat doses within 48–72 hours', 'تزریق‌های متعدد طی ۴۸ تا ۷۲ ساعت'),
          ]},
        ],
      },
      {
        id: 'schutz', icon: 'H₂O', nav: t('Nierenschutz', 'Renal protection', 'محافظت کلیه'),
        title: t('Hydrierung und Nierenschutz', 'Hydration and renal protection', 'هیدراتاسیون و محافظت کلیه'),
        lead: t('Bei hohem Risiko ist die Optimierung des Volumenstatus die zentrale präventive Maßnahme.', 'In high-risk patients, optimisation of volume status is the central preventive measure.', 'در بیماران پرخطر، بهینه‌سازی وضعیت مایعات مهم‌ترین اقدام پیشگیرانه است.'),
        blocks: [
          { type: 'cards', columns: 3, items: [
            { title: t('Wann hydrieren?', 'When to hydrate?', 'چه زمانی هیدراته کنیم؟'), text: t('Hydrierung wird bei eGFR < 30 ml/min/1,73 m² empfohlen.', 'Hydration is recommended below eGFR 30 ml/min/1.73 m².', 'هیدراتاسیون در eGFR کمتر از ۳۰ توصیه می‌شود.') },
            { title: t('Wie hydrieren?', 'How to hydrate?', 'چگونه هیدراته کنیم؟'), text: t('Vorzugsweise intravenös mit 0,9%iger Kochsalzlösung. Ein gebräuchliches Schema ist 100 ml/h für vier Stunden vor und vier Stunden nach der Gabe.', 'Prefer intravenous 0.9% saline. A common regimen is 100 ml/h for four hours before and four hours after administration.', 'ترجیحاً وریدی با نرمال‌سالین ۰٫۹٪؛ برنامهٔ رایج ۱۰۰ ml/h چهار ساعت قبل و چهار ساعت بعد است.') },
            { title: t('Wann vorsichtig?', 'When to be cautious?', 'چه زمانی احتیاط؟'), text: t('Schema bei Herzinsuffizienz NYHA III–IV oder Lungenödem individuell anpassen.', 'Individualise the regimen in NYHA III–IV heart failure or pulmonary oedema.', 'در نارسایی قلبی NYHA III–IV یا ادم ریه برنامه فردی تنظیم شود.') },
          ]},
          { type: 'callout', variant: 'cave', title: t('Keine medikamentöse Prophylaxe', 'No proven drug prophylaxis', 'عدم اثبات پیشگیری دارویی'), text: t('Es gibt keine nachgewiesene medikamentöse Prophylaxe. Acetylcystein wurde früher häufig eingesetzt, seine Wirksamkeit ist jedoch widerlegt.', 'No drug prophylaxis has proven benefit. Acetylcysteine was formerly used frequently, but efficacy has been disproved.', 'هیچ پیشگیری دارویی اثبات‌شده‌ای وجود ندارد. استیل‌سیستئین قبلاً زیاد استفاده می‌شد، اما اثربخشی آن رد شده است.') },
        ],
      },
      {
        id: 'dialyse', icon: 'D', nav: t('Dialyse', 'Dialysis', 'دیالیز'),
        title: t('Dialyse: Jod und Gadolinium unterscheiden', 'Dialysis: distinguish iodine from gadolinium', 'دیالیز: تفاوت ید و گادولینیوم'),
        lead: t('Bei dialysepflichtigen Patienten müssen jodhaltige und gadoliniumhaltige Kontrastmittel unterschiedlich betrachtet werden.', 'In dialysis patients, iodinated and gadolinium agents require different considerations.', 'در بیماران دیالیزی، مواد یددار و گادولینیومی باید متفاوت ارزیابی شوند.'),
        blocks: [
          { type: 'table', headers: [t('Aspekt', 'Aspect', 'موضوع'), t('Jodhaltiges KM', 'Iodinated contrast', 'مادهٔ یددار'), t('Gadoliniumhaltiges KM', 'Gadolinium contrast', 'مادهٔ گادولینیومی')], rows: [
            [t('Zeitliche Abstimmung', 'Timing', 'زمان‌بندی'), t('Keine besondere Abstimmung mit der Dialyse erforderlich.', 'No special scheduling with dialysis is required.', 'هماهنگی ویژه با دیالیز لازم نیست.'), t('Bei bereits dialysepflichtigen Patienten möglichst zeitnah nach der Untersuchung dialysieren, um die Exposition zu reduzieren.', 'In patients already on dialysis, perform dialysis as soon as reasonably possible after examination to reduce exposure.', 'در بیمار از قبل دیالیزی، برای کاهش مواجهه دیالیز در زمان مناسب پس از بررسی انجام شود.')],
            [t('Begründung', 'Rationale', 'دلیل'), t('Eine bereits funktionslose Niere kann durch Jod-KM nicht nennenswert weiter geschädigt werden.', 'A non-functioning kidney cannot be meaningfully further injured by iodinated contrast.', 'کلیهٔ ازکارافتاده با مادهٔ یددار آسیب قابل‌توجه بیشتری نمی‌بیند.'), t('Entfernung von Gadolinium dient der Risikominimierung für NSF und Ablagerung.', 'Removal of gadolinium aims to reduce NSF and retention risk.', 'حذف گادولینیوم برای کاهش خطر NSF و رسوب است.')],
            [t('Neue Dialyse beginnen?', 'Initiate dialysis?', 'شروع دیالیز جدید؟'), t('Nicht allein wegen einer Kontrastmittelgabe.', 'Not solely because contrast was given.', 'صرفاً به‌دلیل تزریق شروع نشود.'), t('Nicht allein wegen einer Kontrastmittelgabe neu beginnen; Indikation und Präparat streng wählen.', 'Do not initiate solely because contrast was given; select indication and agent carefully.', 'صرفاً به‌دلیل تزریق شروع نشود؛ اندیکاسیون و ماده با دقت انتخاب شود.')],
          ]},
        ],
      },
      {
        id: 'metformin', icon: 'M', nav: t('Metformin', 'Metformin', 'متفورمین'),
        title: t('Metformin-Management', 'Metformin management', 'مدیریت متفورمین'),
        lead: t('Metformin verursacht die Nierenschädigung nicht, kann sich bei schwerer Nierenfunktionsstörung jedoch anreichern.', 'Metformin does not cause the kidney injury but may accumulate in severe renal dysfunction.', 'متفورمین علت آسیب کلیه نیست، اما در اختلال شدید کلیه می‌تواند تجمع یابد.'),
        blocks: [
          { type: 'cards', columns: 2, items: [
            { title: t('eGFR > 30', 'eGFR above 30', 'eGFR بالاتر از ۳۰'), text: t('Metformin kann normal weitergenommen werden.', 'Metformin can be continued normally.', 'متفورمین می‌تواند طبق معمول ادامه یابد.') },
            { title: t('eGFR < 30 oder AKI', 'eGFR below 30 or AKI', 'eGFR کمتر از ۳۰ یا AKI'), text: t('Zum Zeitpunkt der Untersuchung absetzen und für 48 Stunden pausieren. Metformin ist bei eGFR < 30 grundsätzlich kontraindiziert.', 'Stop at the time of examination and withhold for 48 hours. Metformin is generally contraindicated below eGFR 30.', 'در زمان بررسی قطع و ۴۸ ساعت متوقف شود. متفورمین در eGFR کمتر از ۳۰ اصولاً منع دارد.') },
          ]},
        ],
      },
      {
        id: 'gadolinium', icon: 'Gd', nav: t('Gadolinium', 'Gadolinium', 'گادولینیوم'),
        title: t('Nierenfunktion und Gadolinium', 'Renal function and gadolinium', 'عملکرد کلیه و گادولینیوم'),
        lead: t('Bei Gadolinium steht nicht PC-AKI, sondern vor allem das Risiko einer nephrogenen systemischen Fibrose durch weniger stabile Präparate im Vordergrund.', 'With gadolinium, the central renal concern is not PC-AKI but NSF from less stable agents.', 'در گادولینیوم، نگرانی اصلی PC-AKI نیست؛ بلکه NSF ناشی از مواد کم‌پایدار اهمیت دارد.'),
        blocks: [
          { type: 'cards', columns: 3, items: [
            { title: t('eGFR < 30 oder AKI', 'eGFR below 30 or AKI', 'eGFR کمتر از ۳۰ یا AKI'), text: t('Indikation streng prüfen und unnötige Gaben vermeiden.', 'Confirm the indication strictly and avoid unnecessary administration.', 'اندیکاسیون سخت‌گیرانه بررسی و از تزریق غیرضروری پرهیز شود.') },
            { title: t('Präparatwahl', 'Agent selection', 'انتخاب ماده'), text: t('Makrozyklisches beziehungsweise sehr niedriges NSF-Risiko bevorzugen; lineare instabile Mittel vermeiden.', 'Prefer macrocyclic or very-low-NSF-risk agents; avoid unstable linear agents.', 'مادهٔ ماکروسیکلیک یا با خطر بسیار پایین NSF ترجیح داده و از مواد خطی ناپایدار پرهیز شود.') },
            { title: t('Dosis', 'Dose', 'دوز'), text: t('Nur die niedrigste diagnostisch ausreichende Dosis einsetzen und Wiederholungen vermeiden.', 'Use the lowest diagnostically adequate dose and avoid repeat exposure.', 'کمترین دوز تشخیصی کافی استفاده و از تکرار پرهیز شود.') },
          ]},
          { type: 'callout', variant: 'key', text: t('NSF tritt nahezu ausschließlich bei schwerer Niereninsuffizienz und nach weniger stabilen, vor allem linearen Gadoliniumpräparaten auf. Mit makrozyklischen Mitteln ist sie heute extrem selten.', 'NSF occurs almost exclusively in severe renal impairment after less stable, particularly linear, gadolinium agents. It is now extremely rare with macrocyclic agents.', 'NSF تقریباً فقط در نارسایی شدید کلیه و پس از مواد گادولینیومی کم‌پایدار، به‌ویژه خطی، رخ می‌دهد و با مواد ماکروسیکلیک امروزه بسیار نادر است.') },
        ],
      },
      {
        id: 'workflow', icon: '✓', nav: t('Entscheidung', 'Decision', 'تصمیم‌گیری'),
        title: t('Praktischer Entscheidungsweg', 'Practical decision pathway', 'مسیر عملی تصمیم‌گیری'),
        blocks: [
          { type: 'steps', items: [
            { title: t('AKI und eGFR prüfen', 'Check AKI and eGFR', 'AKI و eGFR را بررسی کنید'), text: t('Aktuelle Nierenfunktion und klinischen Verlauf gemeinsam bewerten.', 'Assess current renal function together with the clinical course.', 'عملکرد فعلی کلیه را همراه با روند بالینی ارزیابی کنید.') },
            { title: t('Applikationsweg bestimmen', 'Determine the route', 'مسیر تجویز را مشخص کنید'), text: t('Bei Jod-KM First-Pass versus Second-Pass unterscheiden.', 'For iodinated contrast distinguish first-pass from second-pass exposure.', 'در مادهٔ یددار عبور اول را از عبور دوم جدا کنید.') },
            { title: t('Klasse und Dosis optimieren', 'Optimise class and dose', 'نوع و دوز را بهینه کنید'), text: t('Jodvolumen minimieren; bei Gadolinium stabiles Präparat und niedrigste ausreichende Dosis wählen.', 'Minimise iodine volume; with gadolinium choose a stable agent and the lowest adequate dose.', 'حجم ید را کم کنید؛ در گادولینیوم مادهٔ پایدار و کمترین دوز کافی را انتخاب کنید.') },
            { title: t('Schutzmaßnahmen planen', 'Plan protection', 'اقدامات محافظتی'), text: t('Hydrierung, Wiederholungsintervall, Metformin und bestehende Dialyse berücksichtigen.', 'Consider hydration, repeat interval, metformin and existing dialysis.', 'هیدراتاسیون، فاصلهٔ تکرار، متفورمین و دیالیز موجود را در نظر بگیرید.') },
            { title: t('Entscheidung dokumentieren', 'Document the decision', 'تصمیم را ثبت کنید'), text: t('Nutzen, Risiko, Alternativen und gewähltes Präparat nachvollziehbar festhalten.', 'Record benefit, risk, alternatives and chosen agent clearly.', 'سود، خطر، جایگزین‌ها و مادهٔ انتخاب‌شده را روشن ثبت کنید.') },
          ]},
        ],
      },
      {
        id: 'takehome', icon: '★', nav: t('Take home', 'Take home', 'جمع‌بندی'),
        title: t('Take-Home Messages', 'Take-home messages', 'پیام‌های نهایی'),
        blocks: [{ type: 'takehome', items: [
          { title: t('PC-AKI beschreibt zeitliche Assoziation', 'PC-AKI describes temporal association', 'PC-AKI ارتباط زمانی را توصیف می‌کند'), text: t('Der Begriff vermeidet eine nicht immer gesicherte Kausalitätsbehauptung.', 'The term avoids claiming causality that is not always proven.', 'این اصطلاح از ادعای رابطهٔ علّی که همیشه ثابت نیست پرهیز می‌کند.') },
          { title: t('eGFR < 30 ist die zentrale Schwelle', 'eGFR below 30 is the key threshold', 'eGFR کمتر از ۳۰ آستانهٔ کلیدی است'), text: t('Dann Indikation, Hydrierung, Dosis, Wiederholung und Präparat besonders sorgfältig planen.', 'Then plan indication, hydration, dose, repeat exposure and agent especially carefully.', 'در این حالت اندیکاسیون، هیدراتاسیون، دوز، تکرار و نوع ماده با دقت ویژه تنظیم شود.') },
          { title: t('Jod und Gadolinium nicht gleichsetzen', 'Do not equate iodine and gadolinium', 'ید و گادولینیوم را یکسان ندانید'), text: t('Bei Jod steht PC-AKI, bei Gadolinium vor allem NSF und Chelatstabilität im Vordergrund.', 'Iodine raises PC-AKI concerns; gadolinium raises NSF and chelate-stability concerns.', 'در ید PC-AKI و در گادولینیوم NSF و پایداری شلات مهم‌تر است.') },
          { title: t('Dialyse nicht reflexartig beginnen', 'Do not initiate dialysis reflexively', 'دیالیز را خودکار شروع نکنید'), text: t('Eine Kontrastmittelgabe allein ist kein Grund, eine neue Dialyse zu beginnen.', 'Contrast administration alone is not a reason to initiate dialysis.', 'تزریق مادهٔ حاجب به‌تنهایی دلیل شروع دیالیز نیست.') },
        ]}],
      },
    ],
  },
}

export const localizeContrast = (value, lang = 'de') => {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) return value
  return value[lang] || value.de || ''
}
