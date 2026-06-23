const L = (de, en, fa) => ({ de, en, fa })

const img = (src, de, en, fa, rid) => ({
  src,
  caption: L(de, en, fa),
  ...(rid ? { radiopaediaUrl: `https://radiopaedia.org/cases/${rid}` } : {}),
})

export const HRCT_LESSONS = {
  'hrct-dichteanhebung': {
    id: 'hrct-dichteanhebung',
    slug: 'dichteanhebung',
    title: L('HRCT: Dichteanhebung', 'HRCT: Increased Density', 'HRCT: افزایش دانسیته'),
    definition: L('Systematische Einordnung von Milchglas, Konsolidierung, Atelektase und pulmonalen Rundherden.', 'Systematic classification of ground-glass opacity, consolidation, atelectasis and pulmonary nodules.', 'طبقه‌بندی سیستماتیک کدورت شیشه‌مات، کنسولیدیشن، آتلکتازی و ندول‌های ریوی.'),
    heroCards: [
      { value: L('GGO', 'GGO', 'GGO'), label: L('Gefäße sichtbar', 'vessels remain visible', 'عروق قابل مشاهده'), text: L('partielle Luftverdrängung', 'partial air displacement', 'جایگزینی نسبی هوا') },
      { value: L('Konsolidierung', 'Consolidation', 'کنسولیدیشن'), label: L('Gefäße verdeckt', 'vessels obscured', 'عروق محو'), text: L('alveoläre Füllung', 'alveolar filling', 'پرشدگی آلوئولی') },
      { value: L('≤ 30 mm', '≤30 mm', '≤۳۰ میلی‌متر'), label: L('Nodulus', 'nodule', 'ندول'), text: L('darüber: Raumforderung', 'larger: mass', 'بزرگ‌تر: توده') },
    ],
    sections: [
      {
        id: 'atelektase', icon: '🫁', title: L('Atelektase & Volumenverlust', 'Atelectasis & Volume Loss', 'آتلکتازی و کاهش حجم'),
        lead: L('Eine Dichteanhebung mit Volumenverlust ist Atelektase, bis das Gegenteil bewiesen ist.', 'Increased opacity with volume loss should be regarded as atelectasis until proven otherwise.', 'افزایش دانسیته همراه با کاهش حجم، آتلکتازی است مگر اینکه خلاف آن ثابت شود.'),
        cards: [
          { title: L('Direkte Zeichen', 'Direct signs', 'علائم مستقیم'), text: L('Gefäß- und Bronchusverlagerung, Fissurenverschiebung und verdichtetes, kleineres Lungenvolumen.', 'Vascular and bronchial crowding, fissural displacement and a smaller, denser lung volume.', 'تجمع عروق و برونش‌ها، جابه‌جایی فیشورها و حجم کوچک‌تر و متراکم‌تر ریه.') },
          { title: L('Rundatelektase', 'Rounded atelectasis', 'آتلکتازی گرد'), text: L('Pleuranahe rundliche Verdichtung mit einziehenden bronchovaskulären Strukturen: Kometenschweifzeichen.', 'Pleural-based rounded opacity with curving bronchovascular structures: the comet-tail sign.', 'کدورت گرد مجاور پلور با کشیده‌شدن ساختارهای برونکوواسکولار: علامت دم دنباله‌دار.') },
        ],
        images: [
          img('/hrct/dichteanhebung/image1.png', 'Kometenschweif als Merkhilfe', 'Comet-tail mnemonic', 'یادآور دم دنباله‌دار'),
          img('/hrct/dichteanhebung/image2.jpeg', 'Rundatelektase mit Kometenschweifzeichen · rID 8563', 'Rounded atelectasis with comet-tail sign · rID 8563', 'آتلکتازی گرد با علامت دم دنباله‌دار · rID 8563', 8563),
          img('/hrct/dichteanhebung/image3.jpeg', 'Keilförmiger Lungeninfarkt · rID 27283', 'Wedge-shaped pulmonary infarct · rID 27283', 'انفارکت گوه‌ای ریه · rID 27283', 27283),
        ],
      },
      {
        id: 'ggo', icon: '🌫️', title: L('Milchglas vs. Konsolidierung', 'Ground Glass vs Consolidation', 'شیشه‌مات در برابر کنسولیدیشن'),
        lead: L('Der Unterschied ist morphologisch: Werden Gefäße und Bronchialwände noch erkannt?', 'The distinction is morphological: are vessels and bronchial walls still visible?', 'تفاوت مورفولوژیک است: آیا عروق و دیواره برونش‌ها هنوز دیده می‌شوند؟'),
        cards: [
          { title: L('Milchglas', 'Ground-glass opacity', 'کدورت شیشه‌مات'), text: L('Leichte Dichteanhebung ohne vollständige Verdeckung der Gefäße; möglich bei partieller Alveolenfüllung, interstitieller Verdickung oder Kollaps.', 'Mild opacity that does not completely obscure vessels; may reflect partial alveolar filling, interstitial thickening or collapse.', 'افزایش خفیف دانسیته بدون محوشدن کامل عروق؛ ناشی از پرشدگی نسبی آلوئول، ضخیم‌شدگی بینابینی یا کلاپس.') },
          { title: L('Konsolidierung', 'Consolidation', 'کنسولیدیشن'), text: L('Dichte Alveolenfüllung verdeckt Gefäßränder; ein positives Luftbronchogramm kann erhalten bleiben.', 'Dense alveolar filling obscures vascular margins; an air bronchogram may remain visible.', 'پرشدگی متراکم آلوئول‌ها حاشیه عروق را محو می‌کند؛ ممکن است برونکوگرام هوایی باقی بماند.') },
        ],
        images: [
          img('/hrct/dichteanhebung/image4.jpeg', 'Milchglasverdichtung · rID 21062', 'Ground-glass opacity · rID 21062', 'کدورت شیشه‌مات · rID 21062', 21062),
          img('/hrct/dichteanhebung/image5.jpeg', 'Konsolidierung · rID 30227', 'Consolidation · rID 30227', 'کنسولیدیشن · rID 30227', 30227),
          img('/hrct/dichteanhebung/image6.png', 'Reverse-Halo-/Atoll-Zeichen · rID 26531', 'Reverse halo/atoll sign · rID 26531', 'علامت هاله معکوس/آتول · rID 26531', 26531),
        ],
        cave: L('„Infiltrat“ ist unspezifisch. Beschreibe zuerst Milchglas, Konsolidierung, Verteilung und Begleitzeichen.', '“Infiltrate” is nonspecific. First describe GGO, consolidation, distribution and associated signs.', '«اینفیلتراسیون» غیراختصاصی است؛ ابتدا شیشه‌مات، کنسولیدیشن، توزیع و علائم همراه را توصیف کنید.'),
      },
      {
        id: 'noduli', icon: '🎯', title: L('Pulmonale Noduli & Raumforderungen', 'Pulmonary Nodules & Masses', 'ندول‌ها و توده‌های ریوی'),
        lead: L('Größe, Dichte, Morphologie und Wachstum bestimmen die Risikoeinschätzung.', 'Size, attenuation, morphology and growth determine risk assessment.', 'اندازه، دانسیته، مورفولوژی و رشد، ارزیابی خطر را تعیین می‌کنند.'),
        cards: [
          { title: L('Größenbegriffe', 'Size terminology', 'اصطلاحات اندازه'), text: L('Mikronodulus < 6 mm; Nodulus 6–30 mm; Raumforderung > 30 mm.', 'Micronodule <6 mm; nodule 6–30 mm; mass >30 mm.', 'میکروندول <۶ میلی‌متر؛ ندول ۶–۳۰ میلی‌متر؛ توده >۳۰ میلی‌متر.') },
          { title: L('Dichtetyp', 'Attenuation type', 'نوع دانسیته'), text: L('Solide, reine Milchglas- oder teilsolide Noduli getrennt beurteilen; die solide Komponente ist bei subsoliden Läsionen prognostisch wichtig.', 'Assess solid, pure ground-glass and part-solid nodules separately; the solid component is prognostically important in subsolid lesions.', 'ندول‌های جامد، شیشه‌مات خالص و نیمه‌جامد جداگانه ارزیابی شوند؛ جزء جامد در ضایعات ساب‌سالید اهمیت پیش‌آگهی دارد.') },
          { title: L('Perifissuraler Nodulus', 'Perifissural nodule', 'ندول پری‌فیشورال'), text: L('Typisch glatt, linsen- oder dreieckförmig und fissurennah; entspricht meist einem intrapulmonalen Lymphknoten.', 'Typically smooth, lentiform or triangular and fissure-related; usually an intrapulmonary lymph node.', 'معمولاً صاف، عدسی یا مثلثی و نزدیک فیشور؛ اغلب یک گره لنفاوی داخل‌ریوی است.') },
        ],
        images: [
          img('/hrct/dichteanhebung/image7.png', 'Typische und atypische perifissurale Noduli', 'Typical and atypical perifissural nodules', 'ندول‌های پری‌فیشورال تیپیک و آتیپیک'),
          img('/hrct/dichteanhebung/image8.jpeg', 'Pulmonaler Nodulus · rID 38425', 'Pulmonary nodule · rID 38425', 'ندول ریوی · rID 38425', 38425),
          img('/hrct/dichteanhebung/image9.jpeg', 'Subsolider Nodulus · rID 69260', 'Subsolid nodule · rID 69260', 'ندول ساب‌سالید · rID 69260', 69260),
        ],
      },
    ],
    takehome: [
      L('Volumenverlust trennt Atelektase von reiner alveolärer Füllung.', 'Volume loss separates atelectasis from pure alveolar filling.', 'کاهش حجم، آتلکتازی را از پرشدگی خالص آلوئولی جدا می‌کند.'),
      L('Bei Milchglas bleiben Gefäße sichtbar; Konsolidierung verdeckt sie.', 'Vessels remain visible in GGO but are obscured by consolidation.', 'در شیشه‌مات عروق دیده می‌شوند؛ کنسولیدیشن آن‌ها را محو می‌کند.'),
      L('Noduli immer nach Größe, Dichte, Rand, Lage und Wachstum einordnen.', 'Classify nodules by size, attenuation, margin, location and growth.', 'ندول را بر اساس اندازه، دانسیته، حاشیه، محل و رشد طبقه‌بندی کنید.'),
    ],
  },
  'hrct-retikulaer-nodulaer': {
    id: 'hrct-retikulaer-nodulaer', slug: 'retikulaer-nodulaer',
    title: L('HRCT: Retikulär & Nodulär', 'HRCT: Reticular & Nodular', 'HRCT: الگوهای رتیکولار و ندولار'),
    definition: L('Verteilung schlägt Diagnose: Septen, Fissuren, Lobuluszentrum und hämatogene Streuung systematisch unterscheiden.', 'Distribution drives diagnosis: distinguish septa, fissures, lobular centres and haematogenous spread.', 'توزیع مسیر تشخیص را تعیین می‌کند: سپتا، فیشورها، مرکز لوبول و انتشار هماتوژن را تفکیک کنید.'),
    heroCards: [
      { value: L('Perilymphatisch', 'Perilymphatic', 'پری‌لنفاتیک'), label: L('Pleura/Fissuren', 'pleura/fissures', 'پلور/فیشورها'), text: L('z. B. Sarkoidose', 'e.g. sarcoidosis', 'مثلاً سارکوئیدوز') },
      { value: L('Zentrilobulär', 'Centrilobular', 'سنترلوبولار'), label: L('Pleura ausgespart', 'pleura spared', 'پلور محفوظ'), text: L('Atemwege', 'small airways', 'راه‌های هوایی کوچک') },
      { value: L('Random', 'Random', 'تصادفی'), label: L('hämatogen', 'haematogenous', 'هماتوژن'), text: L('Miliarmuster/Metastasen', 'miliary disease/metastases', 'میلیاری/متاستاز') },
    ],
    sections: [
      {
        id: 'retikulaer', icon: '🕸️', title: L('Retikuläres Muster', 'Reticular Pattern', 'الگوی رتیکولار'),
        lead: L('Septenverdickung wird als glatt, irregulär oder nodulär beschrieben und mit der Verteilung kombiniert.', 'Septal thickening is described as smooth, irregular or nodular and combined with its distribution.', 'ضخیم‌شدگی سپتا به‌صورت صاف، نامنظم یا ندولار توصیف و با توزیع ترکیب می‌شود.'),
        cards: [
          { title: L('Glatt', 'Smooth', 'صاف'), text: L('Typisch bei interstitiellem Ödem; häufig zusammen mit Milchglas, Pleuraergüssen und Kardiomegalie.', 'Typical of interstitial oedema; often accompanied by GGO, pleural effusions and cardiomegaly.', 'تیپیک ادم بینابینی؛ اغلب همراه شیشه‌مات، افیوژن پلور و کاردیومگالی.') },
          { title: L('Nodulär', 'Nodular', 'ندولار'), text: L('Verdächtig auf lymphatische Tumorausbreitung oder granulomatöse Erkrankung.', 'Suggests lymphatic tumour spread or granulomatous disease.', 'به نفع انتشار لنفاتیک تومور یا بیماری گرانولوماتوز.') },
          { title: L('Irregulär', 'Irregular', 'نامنظم'), text: L('Spricht mit Traktionsbronchiektasen und Architekturstörung für Fibrose.', 'With traction bronchiectasis and architectural distortion, suggests fibrosis.', 'همراه برونشکتازی کششی و اختلال معماری به نفع فیبروز است.') },
        ],
        images: [
          img('/hrct/retikulaer-nodulaer/image10.png', 'Lymphangiosis carcinomatosa · rID 44439', 'Lymphangitic carcinomatosis · rID 44439', 'لنفانژیت کارسینوماتوزا · rID 44439', 44439),
          img('/hrct/retikulaer-nodulaer/image11.jpeg', 'Kardiogenes Lungenödem · rID 33582', 'Cardiogenic pulmonary oedema · rID 33582', 'ادم کاردیوژنیک ریه · rID 33582', 33582),
          img('/hrct/retikulaer-nodulaer/image12.jpeg', 'Glatt verdickte Septen bei Ödem', 'Smooth septal thickening in oedema', 'ضخیم‌شدگی صاف سپتا در ادم'),
          img('/hrct/retikulaer-nodulaer/image13.jpeg', 'Ödem mit Milchglas und Ergüssen', 'Oedema with GGO and effusions', 'ادم با شیشه‌مات و افیوژن'),
          img('/hrct/retikulaer-nodulaer/image14.png', 'Retikulation und Honeycombing', 'Reticulation and honeycombing', 'رتیکولاسیون و هانی‌کومبینگ'),
        ],
      },
      {
        id: 'verteilung', icon: '🧭', title: L('Noduläre Verteilung', 'Nodular Distribution', 'توزیع ندولار'),
        lead: L('Die wichtigste Frage lautet nicht nur „Welche Noduli?“, sondern „Wo im sekundären Lobulus liegen sie?“', 'The key question is not only “what nodules?” but “where are they within the secondary lobule?”', 'پرسش اصلی فقط «چه ندولی؟» نیست، بلکه «در کجای لوبول ثانویه؟» است.'),
        cards: [
          { title: L('Perilymphatisch', 'Perilymphatic', 'پری‌لنفاتیک'), text: L('Entlang Pleura, Fissuren, Septen und bronchovaskulären Bündeln; klassisch Sarkoidose.', 'Along pleura, fissures, septa and bronchovascular bundles; classic for sarcoidosis.', 'در امتداد پلور، فیشورها، سپتا و باندل‌های برونکوواسکولار؛ کلاسیک برای سارکوئیدوز.') },
          { title: L('Zentrilobulär', 'Centrilobular', 'سنترلوبولار'), text: L('5–10 mm Abstand zu Pleura und Fissuren; kleine Atemwege oder peribronchioläre Prozesse.', 'A 5–10 mm gap from pleura and fissures; small-airway or peribronchiolar disease.', 'فاصله ۵–۱۰ میلی‌متری از پلور و فیشورها؛ بیماری راه هوایی کوچک یا پری‌برونشیولار.') },
          { title: L('Random', 'Random', 'تصادفی'), text: L('Gleichmäßige Beteiligung von Zentrum und Peripherie durch hämatogene Streuung.', 'Uniform central and peripheral involvement due to haematogenous spread.', 'درگیری یکنواخت مرکز و محیط بر اثر انتشار هماتوژن.') },
        ],
        images: [
          img('/hrct/retikulaer-nodulaer/image15.png', 'Algorithmus zur Nodulusverteilung', 'Algorithm for nodular distribution', 'الگوریتم توزیع ندول'),
          img('/hrct/retikulaer-nodulaer/image16.png', 'Perilymphatische Noduli bei Sarkoidose · rID 89958', 'Perilymphatic nodules in sarcoidosis · rID 89958', 'ندول‌های پری‌لنفاتیک در سارکوئیدوز · rID 89958', 89958),
          img('/hrct/retikulaer-nodulaer/image17.jpeg', 'Zentrilobuläre Noduli · rID 24616', 'Centrilobular nodules · rID 24616', 'ندول‌های سنترلوبولار · rID 24616', 24616),
          img('/hrct/retikulaer-nodulaer/image18.jpeg', 'Azinozentrische Noduli bei HP · rID 17192', 'Ill-defined centrilobular nodules in HP · rID 17192', 'ندول‌های سنترلوبولار در HP · rID 17192', 17192),
          img('/hrct/retikulaer-nodulaer/image21.jpeg', 'Random verteilte Noduli', 'Randomly distributed nodules', 'ندول‌های با توزیع تصادفی'),
        ],
      },
      {
        id: 'treeinbud', icon: '🌿', title: L('Tree-in-bud & zystische Evolution', 'Tree-in-bud & Cystic Evolution', 'Tree-in-bud و تحول کیستیک'),
        lead: L('Tree-in-bud bildet gefüllte und erweiterte zentrilobuläre Bronchiolen ab; Verteilung und Klinik grenzen die Ursache ein.', 'Tree-in-bud represents impacted and dilated centrilobular bronchioles; distribution and clinical context narrow the cause.', 'Tree-in-bud بیانگر برونشیول‌های سنترلوبولار پر و گشاد است؛ توزیع و زمینه بالینی تشخیص افتراقی را محدود می‌کند.'),
        cards: [
          { title: L('Tree-in-bud', 'Tree-in-bud', 'Tree-in-bud'), text: L('Verzweigte zentrilobuläre Verdichtungen, häufig infektiös oder durch Aspiration; keine perilymphatische Verteilung.', 'Branching centrilobular opacities, often infectious or aspiration-related; not a perilymphatic pattern.', 'کدورت‌های شاخه‌دار سنترلوبولار، اغلب عفونی یا ناشی از آسپیراسیون؛ نه توزیع پری‌لنفاتیک.') },
          { title: L('Langerhans-Zell-Histiozytose', 'Langerhans cell histiocytosis', 'هیستیوسیتوز سلول لانگرهانس'), text: L('Bei Rauchern entwickeln sich oberlappenbetonte Noduli zu bizarren Zysten; kostophrenische Winkel bleiben relativ ausgespart.', 'In smokers, upper-lobe nodules evolve into bizarre cysts with relative sparing of the costophrenic angles.', 'در سیگاری‌ها ندول‌های غالب لوب فوقانی به کیست‌های عجیب تبدیل می‌شوند و زوایای کوستوفرنیک نسبتاً محفوظ می‌مانند.') },
        ],
        images: [
          img('/hrct/retikulaer-nodulaer/image19.png', 'Blütenzweig als Tree-in-bud-Merkhilfe', 'Blossoming branch as a tree-in-bud mnemonic', 'شاخه شکوفه‌دار به‌عنوان یادآور Tree-in-bud'),
          img('/hrct/retikulaer-nodulaer/image20.jpeg', 'Tree-in-bud · rID 12039', 'Tree-in-bud · rID 12039', 'Tree-in-bud · rID 12039', 12039),
          img('/hrct/retikulaer-nodulaer/image22.jpeg', 'Frühe LCH mit Noduli · rID 161054', 'Early LCH with nodules · rID 161054', 'LCH اولیه با ندول · rID 161054', 161054),
          img('/hrct/retikulaer-nodulaer/image23.jpeg', 'Späte LCH mit irregulären Zysten · rID 161054', 'Late LCH with irregular cysts · rID 161054', 'LCH دیررس با کیست‌های نامنظم · rID 161054', 161054),
        ],
      },
    ],
    takehome: [
      L('Glatt = eher Ödem; nodulär = lymphatisch; irregulär = eher Fibrose.', 'Smooth suggests oedema; nodular suggests lymphatic disease; irregular suggests fibrosis.', 'صاف بیشتر ادم، ندولار بیماری لنفاتیک و نامنظم بیشتر فیبروز را مطرح می‌کند.'),
      L('Pleura/Fissur beteiligt: perilymphatisch. Pleura ausgespart: zentrilobulär.', 'Pleura/fissure involved: perilymphatic. Pleura spared: centrilobular.', 'درگیری پلور/فیشور: پری‌لنفاتیک؛ حفظ پلور: سنترلوبولار.'),
      L('Tree-in-bud ist ein Bronchiolenzeichen, kein unspezifischer Mikronodulus.', 'Tree-in-bud is a bronchiolar sign, not a nonspecific micronodule.', 'Tree-in-bud علامت برونشیول است، نه میکروندول غیراختصاصی.'),
    ],
  },
  'hrct-architekturmuster': {
    id: 'hrct-architekturmuster', slug: 'architekturmuster',
    title: L('HRCT: Architekturmuster', 'HRCT: Architectural Patterns', 'HRCT: الگوهای معماری'),
    definition: L('Honeycombing, Mosaikmuster und Crazy Paving anhand ihrer Bausteine und Verteilung sicher unterscheiden.', 'Distinguish honeycombing, mosaic attenuation and crazy paving by their components and distribution.', 'هانی‌کومبینگ، موزائیک و کریزی‌پیونگ را بر اساس اجزا و توزیع تفکیک کنید.'),
    heroCards: [
      { value: L('Honeycombing', 'Honeycombing', 'هانی‌کومبینگ'), label: L('Endstadium', 'end-stage fibrosis', 'فیبروز انتهایی'), text: L('subpleural, geschichtet', 'subpleural, stacked', 'ساب‌پلورال، لایه‌ای') },
      { value: L('Mosaik', 'Mosaic', 'موزائیک'), label: L('3 Mechanismen', '3 mechanisms', '۳ مکانیسم'), text: L('Lunge, Atemweg, Gefäß', 'lung, airway, vessel', 'ریه، راه هوایی، عروق') },
      { value: L('Crazy Paving', 'Crazy paving', 'کریزی‌پیونگ'), label: L('GGO + Septen', 'GGO + septa', 'GGO + سپتا'), text: L('nicht spezifisch', 'nonspecific', 'غیراختصاصی') },
    ],
    sections: [
      {
        id: 'honeycombing', icon: '🍯', title: L('Honeycombing', 'Honeycombing', 'هانی‌کومبینگ'),
        lead: L('Honeycombing ist ein Fibrosezeichen mit zerstörter Lungenarchitektur, nicht einfach eine Ansammlung beliebiger Zysten.', 'Honeycombing is a sign of fibrosis with destroyed lung architecture, not merely a collection of arbitrary cysts.', 'هانی‌کومبینگ علامت فیبروز با تخریب معماری ریه است، نه صرفاً مجموعه‌ای از کیست‌ها.'),
        cards: [
          { title: L('Morphologie', 'Morphology', 'مورفولوژی'), text: L('Mehrere übereinanderliegende, meist 3–10 mm große, dickwandige subpleurale Hohlräume.', 'Multiple stacked, usually 3–10 mm, thick-walled subpleural air spaces.', 'فضاهای هوایی متعدد، لایه‌ای، معمولاً ۳–۱۰ میلی‌متر و دیواره‌ضخیم در ساب‌پلورال.') },
          { title: L('Kontext', 'Context', 'زمینه'), text: L('Zusammen mit Retikulation, Traktionsbronchiektasen und Volumenverlust; basal-subpleural typisch für UIP.', 'Occurs with reticulation, traction bronchiectasis and volume loss; basal subpleural distribution is typical of UIP.', 'همراه رتیکولاسیون، برونشکتازی کششی و کاهش حجم؛ توزیع بازال ساب‌پلورال تیپیک UIP.') },
        ],
        images: [
          img('/hrct/architekturmuster/image24.png', 'Honigwabe als morphologische Merkhilfe', 'Honeycomb as a morphological mnemonic', 'لانه زنبور به‌عنوان یادآور مورفولوژیک'),
          img('/hrct/architekturmuster/image25.jpeg', 'Subpleurales Honeycombing · rID 35820', 'Subpleural honeycombing · rID 35820', 'هانی‌کومبینگ ساب‌پلورال · rID 35820', 35820),
        ],
      },
      {
        id: 'mosaik', icon: '🧩', title: L('Mosaikmuster', 'Mosaic Attenuation', 'دانسیته موزائیک'),
        lead: L('Beim Mosaikmuster muss zuerst entschieden werden, ob die hellen oder die dunklen Areale pathologisch sind.', 'In mosaic attenuation, first decide whether the brighter or darker regions are abnormal.', 'در الگوی موزائیک ابتدا مشخص کنید نواحی روشن یا تیره پاتولوژیک‌اند.'),
        cards: [
          { title: L('Interstitiell/alveolär', 'Interstitial/alveolar', 'بینابینی/آلوئولی'), text: L('Die dichteren Areale sind abnormal und entsprechen fleckigem Milchglas.', 'The denser regions are abnormal and represent patchy GGO.', 'نواحی متراکم‌تر غیرطبیعی و نشان‌دهنده شیشه‌مات لکه‌ای هستند.') },
          { title: L('Small airways', 'Small airways', 'راه‌های هوایی کوچک'), text: L('Die dunkleren Areale sind durch Air Trapping abnormal; in Exspiration bleibt ihre Dichte niedrig.', 'The darker regions are abnormal from air trapping and remain low attenuation on expiration.', 'نواحی تیره‌تر به علت Air trapping غیرطبیعی‌اند و در بازدم کم‌دانسیته باقی می‌مانند.') },
          { title: L('Vaskulär', 'Vascular', 'عروقی'), text: L('Die dunkleren Areale sind oligämisch; kleine Gefäße und Perfusionsdefekte unterstützen die Diagnose.', 'The darker regions are oligaemic; small vessels and perfusion defects support the diagnosis.', 'نواحی تیره‌تر اولیگمیک‌اند؛ عروق کوچک و نقص پرفیوژن تشخیص را حمایت می‌کنند.') },
        ],
        images: [img('/hrct/architekturmuster/image26.jpeg', 'Mosaikmuster · rID 14799', 'Mosaic attenuation · rID 14799', 'الگوی موزائیک · rID 14799', 14799)],
      },
      {
        id: 'crazypaving', icon: '🧱', title: L('Crazy Paving', 'Crazy Paving', 'کریزی‌پیونگ'),
        lead: L('Crazy Paving ist die Überlagerung von Milchglas und glatter inter- sowie intralobulärer Septenverdickung.', 'Crazy paving combines GGO with smooth interlobular and intralobular septal thickening.', 'کریزی‌پیونگ ترکیب شیشه‌مات با ضخیم‌شدگی صاف سپتاهای بین‌لوبولی و داخل‌لوبولی است.'),
        cards: [
          { title: L('Klassische Assoziation', 'Classic association', 'ارتباط کلاسیک'), text: L('Pulmonale Alveolarproteinose, häufig geografisch begrenzt.', 'Pulmonary alveolar proteinosis, often with geographic margins.', 'پروتئینوز آلوئولی ریه، اغلب با حدود جغرافیایی.') },
          { title: L('Wichtige DD', 'Important differentials', 'افتراق‌های مهم'), text: L('Infektion einschließlich PJP/viral, Ödem, Hämorrhagie, ARDS und Adenokarzinom.', 'Infection including PJP/viral, oedema, haemorrhage, ARDS and adenocarcinoma.', 'عفونت از جمله PJP/ویروسی، ادم، خونریزی، ARDS و آدنوکارسینوم.') },
        ],
        images: [img('/hrct/architekturmuster/image27.jpeg', 'Crazy Paving · rID 63668', 'Crazy paving · rID 63668', 'کریزی‌پیونگ · rID 63668', 63668)],
        cave: L('Crazy Paving ist ein Muster, keine Diagnose. Akuität, Klinik und Verteilung entscheiden über die Differenzialdiagnose.', 'Crazy paving is a pattern, not a diagnosis. Acuity, clinical context and distribution determine the differential.', 'کریزی‌پیونگ یک الگو است نه تشخیص؛ حادبودن، زمینه بالینی و توزیع افتراق را تعیین می‌کنند.'),
      },
    ],
    takehome: [
      L('Honeycombing verlangt geschichtete subpleurale Hohlräume plus Fibrosezeichen.', 'Honeycombing requires stacked subpleural spaces plus signs of fibrosis.', 'هانی‌کومبینگ به فضاهای ساب‌پلورال لایه‌ای همراه علائم فیبروز نیاز دارد.'),
      L('Beim Mosaikmuster Gefäßkaliber vergleichen und Exspirations-CT nutzen.', 'In mosaic attenuation compare vessel calibre and use expiratory CT.', 'در موزائیک قطر عروق را مقایسه و از CT بازدمی استفاده کنید.'),
      L('Crazy Paving = Milchglas + Septenverdickung; die Ursache bleibt kontextabhängig.', 'Crazy paving = GGO plus septal thickening; the cause remains context-dependent.', 'کریزی‌پیونگ = شیشه‌مات + ضخیم‌شدگی سپتا؛ علت وابسته به زمینه است.'),
    ],
  },
  'hrct-dichteminderung': {
    id: 'hrct-dichteminderung', slug: 'dichteminderung',
    title: L('HRCT: Dichteminderung', 'HRCT: Decreased Density', 'HRCT: کاهش دانسیته'),
    definition: L('Bulla, Zyste und Kaverne anhand von Wand, Umgebung und Entstehungsmechanismus unterscheiden.', 'Distinguish bulla, cyst and cavity by wall, surrounding lung and mechanism.', 'بولا، کیست و کاویتی را بر اساس دیواره، ریه اطراف و مکانیسم تفکیک کنید.'),
    heroCards: [
      { value: L('Bulla', 'Bulla', 'بولا'), label: L('≥ 1 cm', '≥1 cm', '≥۱ سانتی‌متر'), text: L('Wand ≤ 1 mm', 'wall ≤1 mm', 'دیواره ≤۱ میلی‌متر') },
      { value: L('Zyste', 'Cyst', 'کیست'), label: L('dünne Wand', 'thin wall', 'دیواره نازک'), text: L('runde Luftstruktur', 'round air space', 'فضای هوایی گرد') },
      { value: L('Kaverne', 'Cavity', 'کاویتی'), label: L('in Läsion', 'within a lesion', 'داخل ضایعه'), text: L('Nekrose/Drainage', 'necrosis/drainage', 'نکروز/درناژ') },
    ],
    sections: [
      {
        id: 'begriffe', icon: '⭕', title: L('Bulla, Zyste, Kaverne', 'Bulla, Cyst, Cavity', 'بولا، کیست، کاویتی'),
        lead: L('Die Begriffe sind nicht austauschbar: Entscheidend sind Wanddicke, Hintergrundparenchym und Einbettung in eine andere Läsion.', 'The terms are not interchangeable: wall thickness, background lung and containment within another lesion are decisive.', 'این اصطلاحات قابل جایگزینی نیستند؛ ضخامت دیواره، پارانشیم زمینه و قرارگیری داخل ضایعه دیگر تعیین‌کننده‌اند.'),
        cards: [
          { title: L('Bulla', 'Bulla', 'بولا'), text: L('Lufthaltiger Raum ≥ 1 cm mit sehr dünner Wand ≤ 1 mm, gewöhnlich in emphysematös verändertem Parenchym.', 'Air-containing space ≥1 cm with a very thin wall ≤1 mm, usually in emphysematous lung.', 'فضای هوادار ≥۱ سانتی‌متر با دیواره بسیار نازک ≤۱ میلی‌متر، معمولاً در ریه آمفیزماتوز.') },
          { title: L('Zyste', 'Cyst', 'کیست'), text: L('Runder intrapulmonaler Raum mit definierter epithelialer oder fibröser Wand, meist < 2 mm und luftgefüllt.', 'Rounded intrapulmonary space with a defined epithelial or fibrous wall, usually <2 mm and air-filled.', 'فضای گرد داخل‌ریوی با دیواره مشخص اپی‌تلیال یا فیبروز، معمولاً <۲ میلی‌متر و پر از هوا.') },
          { title: L('Kaverne', 'Cavity', 'کاویتی'), text: L('Gasraum innerhalb einer Konsolidierung, eines Nodulus oder einer Raumforderung infolge Nekrose und Drainage.', 'Gas-filled space within consolidation, a nodule or a mass due to necrosis and drainage.', 'فضای گازی داخل کنسولیدیشن، ندول یا توده بر اثر نکروز و درناژ.') },
        ],
        images: [
          img('/hrct/dichteminderung/image28.jpeg', 'Bulla · rID 7959', 'Bulla · rID 7959', 'بولا · rID 7959', 7959),
          img('/hrct/dichteminderung/image29.jpeg', 'Pulmonale Zyste · rID 10493', 'Pulmonary cyst · rID 10493', 'کیست ریوی · rID 10493', 10493),
          img('/hrct/dichteminderung/image30.jpeg', 'Kaverne · rID 16033', 'Cavity · rID 16033', 'کاویتی · rID 16033', 16033),
        ],
      },
      {
        id: 'wand', icon: '📏', title: L('Wandanalyse & Inhalt', 'Wall Analysis & Contents', 'تحلیل دیواره و محتوا'),
        lead: L('Wanddicke ist nur ein Hinweis; Kontur, umgebende Läsion, Inhalt und klinischer Verlauf sind ebenso wichtig.', 'Wall thickness is only a clue; contour, surrounding lesion, contents and clinical course are equally important.', 'ضخامت دیواره فقط یک سرنخ است؛ کانتور، ضایعه اطراف، محتوا و سیر بالینی نیز مهم‌اند.'),
        cards: [
          { title: L('< 4 mm', '<4 mm', '<۴ میلی‌متر'), text: L('Eher benigne, aber kein sicherer Ausschluss einer malignen oder infektiösen Ursache.', 'More often benign, but does not safely exclude malignancy or infection.', 'بیشتر خوش‌خیم، اما بدخیمی یا عفونت را با قطعیت رد نمی‌کند.') },
          { title: L('4–15 mm', '4–15 mm', '۴–۱۵ میلی‌متر'), text: L('Indeterminierter Bereich; unregelmäßige Innenkontur und noduläre Wandanteile erhöhen den Verdacht.', 'Indeterminate range; an irregular inner contour and nodular wall components increase suspicion.', 'محدوده نامعین؛ کانتور داخلی نامنظم و اجزای ندولار دیواره شک را افزایش می‌دهند.') },
          { title: L('> 15 mm', '>15 mm', '>۱۵ میلی‌متر'), text: L('Häufiger maligne, insbesondere bei solitärer dickwandiger irregulärer Kaverne.', 'More often malignant, especially in a solitary thick-walled irregular cavity.', 'اغلب بدخیم‌تر، به‌ویژه کاویتی منفرد با دیواره ضخیم و نامنظم.') },
          { title: L('Luft-Flüssigkeitsspiegel', 'Air-fluid level', 'سطح هوا-مایع'), text: L('Spricht für flüssigen Inhalt, z. B. Abszess oder superinfizierte Zyste; ist nicht allein diagnosespezifisch.', 'Indicates liquid content, e.g. abscess or infected cyst; not diagnostic by itself.', 'نشان‌دهنده محتوای مایع مانند آبسه یا کیست عفونی است، اما به‌تنهایی اختصاصی نیست.') },
        ],
        images: [img('/hrct/dichteminderung/image31.jpeg', 'Irreguläre dickwandige Kaverne', 'Irregular thick-walled cavity', 'کاویتی با دیواره ضخیم و نامنظم')],
      },
      {
        id: 'dd', icon: '🧠', title: L('Topografische Differenzialdiagnose', 'Topographic Differential Diagnosis', 'تشخیص افتراقی بر اساس توپوگرافی'),
        lead: L('Lokalisation und Begleitbefunde helfen, infektiöse, neoplastische und entzündliche Ursachen zu trennen.', 'Location and associated findings help separate infectious, neoplastic and inflammatory causes.', 'محل و یافته‌های همراه به تفکیک علل عفونی، نئوپلاستیک و التهابی کمک می‌کنند.'),
        cards: [
          { title: L('Oberlappen', 'Upper lobes', 'لوب‌های فوقانی'), text: L('Reaktivierte Tuberkulose, Plattenepithelkarzinom und bestimmte Pilzinfektionen bedenken.', 'Consider reactivation tuberculosis, squamous carcinoma and selected fungal infections.', 'سل فعال‌شده مجدد، کارسینوم سلول سنگفرشی و برخی عفونت‌های قارچی را در نظر بگیرید.') },
          { title: L('Abhängig/posterior', 'Dependent/posterior', 'وابسته/خلفی'), text: L('Aspiration und Lungenabszess sind bei passender Klinik wahrscheinlich.', 'Aspiration and lung abscess are likely in the appropriate clinical setting.', 'در زمینه بالینی مناسب آسپیراسیون و آبسه ریه محتمل‌اند.') },
          { title: L('Intrakavitäre Masse', 'Intracavitary mass', 'توده داخل کاویتی'), text: L('Luftsichel um eine mobile Masse spricht für Myzetom/Aspergillom in einer präformierten Höhle.', 'An air crescent around a mobile mass suggests a mycetoma/aspergilloma in a pre-existing cavity.', 'هلال هوا اطراف توده متحرک به نفع میستوم/آسپرژیلوم در حفره قبلی است.') },
        ],
      },
    ],
    takehome: [
      L('Bulla = Emphysemkontext; Zyste = definierte dünne Wand; Kaverne = Hohlraum in einer Läsion.', 'Bulla = emphysema context; cyst = defined thin wall; cavity = space within a lesion.', 'بولا = زمینه آمفیزم؛ کیست = دیواره نازک مشخص؛ کاویتی = حفره داخل ضایعه.'),
      L('Wanddicke nie isoliert interpretieren; Innenkontur und Umgebung mitbewerten.', 'Never interpret wall thickness alone; assess inner contour and surroundings.', 'ضخامت دیواره را هرگز به‌تنهایی تفسیر نکنید؛ کانتور داخلی و محیط را نیز بسنجید.'),
      L('Luft-Flüssigkeit und Luftsichel beschreiben Inhalt, nicht automatisch die Ätiologie.', 'Air-fluid levels and air crescents describe contents, not automatically the aetiology.', 'سطح هوا-مایع و هلال هوا محتوا را توصیف می‌کنند، نه لزوماً علت را.'),
    ],
  },
}

const Q = (id, topicId, lang, q, options, correct, explanation) => ({
  id: `${topicId}-${lang}-${id}`,
  type: 'single',
  question: q,
  options: options.map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: String.fromCharCode(65 + correct),
  explanation,
  tags: [topicId],
  difficulty: 3,
})

const quizFacts = {
  'hrct-dichteanhebung': [
    [L('Welches Merkmal unterscheidet Milchglas am zuverlässigsten von Konsolidierung?', 'Which feature most reliably distinguishes GGO from consolidation?', 'کدام ویژگی شیشه‌مات را از کنسولیدیشن بهتر جدا می‌کند؟'), [L('Gefäße bleiben erkennbar.', 'Vessels remain visible.', 'عروق قابل مشاهده می‌مانند.'), L('Es besteht immer Volumenverlust.', 'Volume loss is always present.', 'همیشه کاهش حجم وجود دارد.'), L('Ein Luftbronchogramm fehlt immer.', 'An air bronchogram is always absent.', 'برونکوگرام هوایی همیشه غایب است.'), L('Die Läsion ist stets subpleural.', 'The lesion is always subpleural.', 'ضایعه همیشه ساب‌پلورال است.')], 0, L('Bei Milchglas bleibt die Kontur von Gefäßen und Bronchialwänden sichtbar; Konsolidierung verdeckt sie typischerweise.', 'GGO preserves vascular and bronchial-wall margins, whereas consolidation usually obscures them.', 'در شیشه‌مات حاشیه عروق و دیواره برونش حفظ می‌شود، در حالی که کنسولیدیشن معمولاً آن‌ها را محو می‌کند.')],
    [L('Welche Kombination spricht am stärksten für Rundatelektase?', 'Which combination most strongly suggests rounded atelectasis?', 'کدام ترکیب بیشتر به نفع آتلکتازی گرد است؟'), [L('Pleuranahe Masse mit Kometenschweifzeichen', 'Pleural-based mass with comet-tail sign', 'توده مجاور پلور با علامت دم دنباله‌دار'), L('Zentrale Masse mit Luftsichel', 'Central mass with an air crescent', 'توده مرکزی با هلال هوا'), L('Diffuse Milchglasnoduli', 'Diffuse ground-glass nodules', 'ندول‌های منتشر شیشه‌مات'), L('Dünnwandige Zysten apikal', 'Thin-walled apical cysts', 'کیست‌های نازک‌دیواره اپیکال')], 0, L('Einziehende, gebogene bronchovaskuläre Strukturen zur pleuranahen Masse bilden das Kometenschweifzeichen.', 'Curving bronchovascular structures entering a pleural-based mass form the comet-tail sign.', 'ساختارهای برونکوواسکولار خمیده که وارد توده پلورال می‌شوند علامت دم دنباله‌دار را می‌سازند.')],
    [L('Wie wird eine rundliche pulmonale Läsion von 35 mm bezeichnet?', 'How is a rounded 35 mm pulmonary lesion termed?', 'ضایعه گرد ریوی ۳۵ میلی‌متری چه نام دارد؟'), [L('Raumforderung', 'Mass', 'توده'), L('Mikronodulus', 'Micronodule', 'میکروندول'), L('Nodulus', 'Nodule', 'ندول'), L('Perifissuraler Nodulus', 'Perifissural nodule', 'ندول پری‌فیشورال')], 0, L('Eine fokale Läsion über 30 mm wird als Raumforderung bezeichnet.', 'A focal lesion larger than 30 mm is termed a mass.', 'ضایعه فوکال بزرگ‌تر از ۳۰ میلی‌متر توده نامیده می‌شود.')],
    [L('Welches Zeichen zeigt eine zentrale Milchglaszone mit ringförmiger Konsolidierung?', 'Which sign is a central GGO region surrounded by consolidation?', 'کدام علامت شامل شیشه‌مات مرکزی با حلقه کنسولیدیشن است؟'), [L('Reverse-Halo-Zeichen', 'Reverse halo sign', 'علامت هاله معکوس'), L('Halo-Zeichen', 'Halo sign', 'علامت هاله'), L('Tree-in-bud', 'Tree-in-bud', 'Tree-in-bud'), L('Luftsichelzeichen', 'Air crescent sign', 'علامت هلال هوا')], 0, L('Das Reverse-Halo- oder Atoll-Zeichen besteht aus zentralem Milchglas und einem dichteren ringförmigen Saum.', 'The reverse halo or atoll sign consists of central GGO surrounded by a denser ring.', 'علامت هاله معکوس یا آتول شامل شیشه‌مات مرکزی با حلقه متراکم‌تر است.')],
    [L('Was spricht bei einer Dichteanhebung primär für Atelektase?', 'What primarily suggests atelectasis in an opacity?', 'چه چیزی در کدورت بیشتر به نفع آتلکتازی است؟'), [L('Volumenverlust mit Fissurenverlagerung', 'Volume loss with fissural displacement', 'کاهش حجم با جابه‌جایی فیشور'), L('Unverändertes Lungenvolumen', 'Unchanged lung volume', 'حجم بدون تغییر ریه'), L('Random verteilte Noduli', 'Random nodules', 'ندول‌های تصادفی'), L('Luftsichel um eine Masse', 'Air crescent around a mass', 'هلال هوا اطراف توده')], 0, L('Atelektase ist durch Volumenverlust gekennzeichnet; Fissuren, Hilus und Mediastinum können zur kollabierten Lunge verlagert sein.', 'Atelectasis is defined by volume loss; fissures, hilum and mediastinum may shift toward the collapse.', 'آتلکتازی با کاهش حجم تعریف می‌شود و فیشورها، ناف و مدیاستن ممکن است به سمت کلاپس جابه‌جا شوند.')],
    [L('Welche Läsion ist ein typischer perifissuraler Nodulus?', 'Which lesion is a typical perifissural nodule?', 'کدام ضایعه ندول پری‌فیشورال تیپیک است؟'), [L('Glatt, linsenförmig und fissurennah', 'Smooth, lentiform and fissure-related', 'صاف، عدسی و نزدیک فیشور'), L('Spikuliert und oberlappenbetont', 'Spiculated and upper-lobe predominant', 'اسپیکوله و غالب لوب فوقانی'), L('Teilsolide mit wachsendem soliden Anteil', 'Part-solid with a growing solid component', 'نیمه‌جامد با جزء جامد رو به رشد'), L('Dickwandig mit Luft-Flüssigkeitsspiegel', 'Thick-walled with an air-fluid level', 'دیواره‌ضخیم با سطح هوا-مایع')], 0, L('Typische perifissurale Noduli sind glatte intrapulmonale Lymphknoten mit linsen- oder dreieckiger Form.', 'Typical perifissural nodules are smooth intrapulmonary lymph nodes with lentiform or triangular shape.', 'ندول پری‌فیشورال تیپیک گره لنفاوی داخل‌ریوی صاف با شکل عدسی یا مثلثی است.')],
    [L('Welche Komponente ist bei einem teilsoliden Nodulus besonders prognostisch relevant?', 'Which component is particularly prognostically relevant in a part-solid nodule?', 'کدام جزء در ندول نیمه‌جامد از نظر پیش‌آگهی مهم‌تر است؟'), [L('Größe der soliden Komponente', 'Size of the solid component', 'اندازه جزء جامد'), L('Anzahl sichtbarer Gefäße', 'Number of visible vessels', 'تعداد عروق قابل مشاهده'), L('Pleuraabstand allein', 'Pleural distance alone', 'فاصله از پلور به‌تنهایی'), L('Vorhandensein eines Bronchus', 'Presence of a bronchus', 'وجود برونش')], 0, L('Bei subsoliden Noduli korreliert insbesondere die Größe und Entwicklung der soliden Komponente mit invasivem Wachstum.', 'In subsolid nodules, the size and evolution of the solid component correlate especially with invasive growth.', 'در ندول‌های ساب‌سالید اندازه و تغییر جزء جامد با رشد تهاجمی ارتباط ویژه دارد.')],
    [L('Welche Beschreibung ist gegenüber „Infiltrat“ vorzuziehen?', 'Which description is preferable to “infiltrate”?', 'کدام توصیف به‌جای «اینفیلتراسیون» بهتر است؟'), [L('Milchglas, Konsolidierung, Verteilung und Begleitzeichen', 'GGO, consolidation, distribution and associated signs', 'شیشه‌مات، کنسولیدیشن، توزیع و علائم همراه'), L('Nur „entzündlich“', 'Only “inflammatory”', 'فقط «التهابی»'), L('Nur „Verschattung“ ohne Lage', 'Only “opacity” without location', 'فقط «کدورت» بدون محل'), L('Ausschließlich Größenangabe', 'Size alone', 'فقط اندازه')], 0, L('Eine morphologische Beschreibung ist präziser und vermeidet eine nicht belegte ätiologische Festlegung.', 'Morphological description is more precise and avoids an unsupported aetiological assumption.', 'توصیف مورفولوژیک دقیق‌تر است و از فرض علت‌شناختی بدون مدرک جلوگیری می‌کند.')],
    [L('Was definiert eine Konsolidierung?', 'What defines consolidation?', 'کنسولیدیشن چگونه تعریف می‌شود؟'), [L('Alveoläre Füllung mit Verdeckung der Gefäßränder', 'Alveolar filling that obscures vascular margins', 'پرشدگی آلوئولی با محوشدن حاشیه عروق'), L('Dünnwandige luftgefüllte Räume', 'Thin-walled air-filled spaces', 'فضاهای هوادار نازک‌دیواره'), L('Nur interlobuläre Septenverdickung', 'Interlobular septal thickening only', 'فقط ضخیم‌شدگی سپتای بین‌لوبولی'), L('Isolierte Bronchusdilatation', 'Isolated bronchial dilatation', 'اتساع منفرد برونش')], 0, L('Konsolidierung entsteht durch vollständige Verdrängung der alveolären Luft durch Flüssigkeit, Zellen oder Material.', 'Consolidation results from replacement of alveolar air by fluid, cells or other material.', 'کنسولیدیشن از جایگزینی هوای آلوئولی با مایع، سلول یا مواد دیگر ایجاد می‌شود.')],
    [L('Welche Form ist für einen peripheren Lungeninfarkt typisch?', 'Which shape is typical of a peripheral pulmonary infarct?', 'کدام شکل برای انفارکت محیطی ریه تیپیک است؟'), [L('Pleuralbasierte keilförmige Verdichtung', 'Pleural-based wedge-shaped opacity', 'کدورت گوه‌ای با قاعده پلورال'), L('Runde Zyste mit dünner Wand', 'Round thin-walled cyst', 'کیست گرد نازک‌دیواره'), L('Perilymphatische Mikronoduli', 'Perilymphatic micronodules', 'میکروندول‌های پری‌لنفاتیک'), L('Diffuses Honeycombing', 'Diffuse honeycombing', 'هانی‌کومبینگ منتشر')], 0, L('Ein hämorrhagischer Infarkt erscheint häufig keilförmig und pleuralbasiert.', 'A haemorrhagic infarct commonly appears wedge-shaped and pleural-based.', 'انفارکت هموراژیک اغلب گوه‌ای و با قاعده پلورال دیده می‌شود.')],
    [L('Welche Aussage zu einem Luftbronchogramm ist korrekt?', 'Which statement about an air bronchogram is correct?', 'کدام عبارت درباره برونکوگرام هوایی درست است؟'), [L('Es kann innerhalb einer Konsolidierung sichtbar sein.', 'It may be visible within consolidation.', 'ممکن است داخل کنسولیدیشن دیده شود.'), L('Es beweist eine bakterielle Pneumonie.', 'It proves bacterial pneumonia.', 'پنومونی باکتریایی را ثابت می‌کند.'), L('Es schließt Atelektase aus.', 'It excludes atelectasis.', 'آتلکتازی را رد می‌کند.'), L('Es kommt nur bei Tumoren vor.', 'It occurs only in tumours.', 'فقط در تومورها دیده می‌شود.')], 0, L('Lufthaltige Bronchien können in verdichteten Alveolen sichtbar bleiben; das Zeichen ist nicht ätiologiespezifisch.', 'Air-filled bronchi may remain visible in opacified alveoli; the sign is not aetiology-specific.', 'برونش‌های هوادار ممکن است در آلوئول‌های متراکم دیده شوند؛ این علامت علت‌اختصاصی نیست.')],
    [L('Welcher Parameter gehört zwingend zur Verlaufskontrolle eines Nodulus?', 'Which parameter is essential in nodule follow-up?', 'کدام پارامتر در پیگیری ندول ضروری است؟'), [L('Wachstum im Vergleich zu Voraufnahmen', 'Growth compared with prior imaging', 'رشد نسبت به تصاویر قبلی'), L('Herzgröße', 'Heart size', 'اندازه قلب'), L('Tracheadurchmesser', 'Tracheal diameter', 'قطر تراشه'), L('Zwerchfellstand allein', 'Diaphragm level alone', 'سطح دیافراگم به‌تنهایی')], 0, L('Vergleich mit Voraufnahmen zeigt Stabilität oder Wachstum und ist ein zentraler Bestandteil der Risikoeinschätzung.', 'Comparison with prior imaging establishes stability or growth and is central to risk assessment.', 'مقایسه با تصاویر قبلی ثبات یا رشد را نشان می‌دهد و بخش مرکزی ارزیابی خطر است.')],
  ],
}

const compactFactSets = {
  'hrct-retikulaer-nodulaer': [
    ['Perilymphatisch', 'Pleura, Fissuren, Septen und bronchovaskuläre Bündel', 'Sarkoidose'],
    ['Zentrilobulär', '5–10 mm Abstand zu Pleura und Fissuren', 'Bronchiolitis/HP'],
    ['Random', 'gleichmäßig bis an die Pleura', 'hämatogene Metastasen oder Miliartuberkulose'],
    ['Tree-in-bud', 'verzweigte zentrilobuläre Verdichtungen', 'gefüllte/dilatierte Bronchiolen'],
    ['Glatt verdickte Septen', 'symmetrisch mit Ergüssen und Kardiomegalie', 'kardiogenes Ödem'],
    ['Nodulär verdickte Septen', 'oft fokal oder asymmetrisch', 'Lymphangiosis carcinomatosa'],
    ['Irreguläre Septen', 'mit Traktionsbronchiektasen', 'Fibrose'],
    ['Lymphangiosis carcinomatosa', 'lymphatische Verteilung und häufig Lymphadenopathie', 'Tumorausbreitung'],
    ['LCH früh', 'oberlappenbetonte Noduli beim Raucher', 'spätere Zystenentwicklung'],
    ['LCH spät', 'bizarre Zysten mit Aussparung der kostophrenischen Winkel', 'fortgeschrittene LCH'],
    ['HP', 'unscharfe zentrilobuläre Milchglasnoduli', 'inhalatives Antigen'],
    ['Miliarmuster', 'zahllose random Mikronoduli', 'hämatogene Streuung'],
  ],
  'hrct-architekturmuster': [
    ['Honeycombing', 'geschichtete subpleurale Hohlräume', 'Endstadiumfibrose'],
    ['UIP-Verteilung', 'basal und subpleural betont', 'Honeycombing/Traktionsbronchiektasen'],
    ['Mosaik interstitiell', 'dichtere Areale sind krank', 'fleckiges Milchglas'],
    ['Mosaik small airways', 'dunklere Areale sind krank', 'Air Trapping'],
    ['Mosaik vaskulär', 'dunklere Areale mit kleinen Gefäßen', 'Oligämie'],
    ['Exspirations-CT', 'persistierende Minderbelüftung', 'Air Trapping'],
    ['Gefäßkaliber', 'kleiner in den dunklen Arealen', 'vaskulär oder hypoventiliert'],
    ['Crazy Paving', 'Milchglas plus glatte Septenverdickung', 'Muster, keine Diagnose'],
    ['Alveolarproteinose', 'geografisches Crazy Paving', 'klassische Assoziation'],
    ['Crazy-Paving-DD', 'Infektion, Ödem, Blutung, ARDS, Tumor', 'klinischer Kontext'],
    ['Traktionsbronchiektase', 'Bronchusdilatation durch Zug', 'Fibrose'],
    ['Honeycombing vs Zysten', 'subpleurale Schichtung plus Fibrosezeichen', 'Honeycombing'],
  ],
  'hrct-dichteminderung': [
    ['Bulla', '≥1 cm und Wand ≤1 mm', 'Emphysem'],
    ['Zyste', 'runde Luftstruktur mit meist <2 mm Wand', 'definierte Wand'],
    ['Kaverne', 'Gasraum innerhalb Nodulus, Masse oder Konsolidierung', 'Nekrose/Drainage'],
    ['Dünne Kaverne', '<4 mm Wand', 'eher benigne, nicht beweisend'],
    ['Indeterminierte Wand', '4–15 mm', 'Morphologie und Verlauf entscheiden'],
    ['Dicke Kaverne', '>15 mm', 'höherer Malignitätsverdacht'],
    ['Irreguläre Innenkontur', 'noduläre Wandanteile', 'suspekt'],
    ['Luft-Flüssigkeitsspiegel', 'Gas und Flüssigkeit in einer Höhle', 'Abszess oder Superinfektion'],
    ['Aspergillom', 'mobile intrakavitäre Masse mit Luftsichel', 'Myzetom'],
    ['Oberlappenkaverne', 'TB oder Plattenepithelkarzinom bedenken', 'Topografie'],
    ['Abhängige Kaverne', 'Aspiration/Abszess bedenken', 'Topografie'],
    ['Kaverne vs Zyste', 'umgebende Läsion und dickere irreguläre Wand', 'Kaverne'],
  ],
}

const factTranslations = {
  'hrct-retikulaer-nodulaer': {
    en: [
      ['Perilymphatic', 'pleura, fissures, septa and bronchovascular bundles', 'sarcoidosis'], ['Centrilobular', '5–10 mm gap from pleura and fissures', 'bronchiolitis/HP'], ['Random', 'uniformly extends to the pleura', 'haematogenous metastases or miliary TB'], ['Tree-in-bud', 'branching centrilobular opacities', 'impacted/dilated bronchioles'], ['Smooth septal thickening', 'symmetric with effusions and cardiomegaly', 'cardiogenic oedema'], ['Nodular septal thickening', 'often focal or asymmetric', 'lymphangitic carcinomatosis'], ['Irregular septa', 'with traction bronchiectasis', 'fibrosis'], ['Lymphangitic carcinomatosis', 'lymphatic distribution and frequent adenopathy', 'tumour spread'], ['Early LCH', 'upper-lobe nodules in a smoker', 'later cyst evolution'], ['Late LCH', 'bizarre cysts sparing costophrenic angles', 'advanced LCH'], ['HP', 'ill-defined centrilobular ground-glass nodules', 'inhaled antigen'], ['Miliary pattern', 'innumerable random micronodules', 'haematogenous spread'],
    ],
    fa: [
      ['پری‌لنفاتیک', 'پلور، فیشورها، سپتا و باندل‌های برونکوواسکولار', 'سارکوئیدوز'], ['سنترلوبولار', 'فاصله ۵–۱۰ میلی‌متری از پلور و فیشورها', 'برونشیولیت/HP'], ['تصادفی', 'توزیع یکنواخت تا پلور', 'متاستاز هماتوژن یا سل میلیاری'], ['Tree-in-bud', 'کدورت‌های شاخه‌دار سنترلوبولار', 'برونشیول‌های پر/گشاد'], ['ضخیم‌شدگی صاف سپتا', 'متقارن با افیوژن و کاردیومگالی', 'ادم کاردیوژنیک'], ['ضخیم‌شدگی ندولار سپتا', 'اغلب فوکال یا نامتقارن', 'لنفانژیت کارسینوماتوزا'], ['سپتای نامنظم', 'همراه برونشکتازی کششی', 'فیبروز'], ['لنفانژیت کارسینوماتوزا', 'توزیع لنفاتیک و اغلب آدنوپاتی', 'انتشار تومور'], ['LCH اولیه', 'ندول‌های لوب فوقانی در فرد سیگاری', 'تبدیل بعدی به کیست'], ['LCH دیررس', 'کیست‌های عجیب با حفظ زوایای کوستوفرنیک', 'LCH پیشرفته'], ['HP', 'ندول‌های شیشه‌مات سنترلوبولار نامشخص', 'آنتی‌ژن استنشاقی'], ['الگوی میلیاری', 'میکروندول‌های تصادفی بی‌شمار', 'انتشار هماتوژن'],
    ],
  },
  'hrct-architekturmuster': {
    en: [
      ['Honeycombing', 'stacked subpleural air spaces', 'end-stage fibrosis'], ['UIP distribution', 'basal and subpleural predominance', 'honeycombing/traction bronchiectasis'], ['Interstitial mosaic', 'denser regions are abnormal', 'patchy GGO'], ['Small-airway mosaic', 'darker regions are abnormal', 'air trapping'], ['Vascular mosaic', 'darker regions with small vessels', 'oligaemia'], ['Expiratory CT', 'persistent low attenuation', 'air trapping'], ['Vessel calibre', 'smaller in darker regions', 'vascular or hypoventilated lung'], ['Crazy paving', 'GGO plus smooth septal thickening', 'pattern, not a diagnosis'], ['Alveolar proteinosis', 'geographic crazy paving', 'classic association'], ['Crazy-paving differential', 'infection, oedema, haemorrhage, ARDS, tumour', 'clinical context'], ['Traction bronchiectasis', 'bronchial dilatation caused by traction', 'fibrosis'], ['Honeycombing vs cysts', 'subpleural stacking plus fibrotic signs', 'honeycombing'],
    ],
    fa: [
      ['هانی‌کومبینگ', 'فضاهای هوایی لایه‌ای ساب‌پلورال', 'فیبروز انتهایی'], ['توزیع UIP', 'غلبه بازال و ساب‌پلورال', 'هانی‌کومبینگ/برونشکتازی کششی'], ['موزائیک بینابینی', 'نواحی متراکم‌تر بیمارند', 'شیشه‌مات لکه‌ای'], ['موزائیک راه هوایی کوچک', 'نواحی تیره‌تر بیمارند', 'Air trapping'], ['موزائیک عروقی', 'نواحی تیره‌تر با عروق کوچک', 'اولیگمی'], ['CT بازدمی', 'باقی‌ماندن دانسیته پایین', 'Air trapping'], ['قطر عروق', 'کوچک‌تر در نواحی تیره', 'ریه عروقی یا کم‌تهویه'], ['کریزی‌پیونگ', 'شیشه‌مات همراه ضخیم‌شدگی صاف سپتا', 'الگو نه تشخیص'], ['پروتئینوز آلوئولی', 'کریزی‌پیونگ جغرافیایی', 'ارتباط کلاسیک'], ['افتراق کریزی‌پیونگ', 'عفونت، ادم، خونریزی، ARDS، تومور', 'زمینه بالینی'], ['برونشکتازی کششی', 'اتساع برونش بر اثر کشش', 'فیبروز'], ['هانی‌کومبینگ در برابر کیست', 'لایه‌بندی ساب‌پلورال همراه علائم فیبروز', 'هانی‌کومبینگ'],
    ],
  },
  'hrct-dichteminderung': {
    en: [
      ['Bulla', '≥1 cm with wall ≤1 mm', 'emphysema'], ['Cyst', 'round air space with wall usually <2 mm', 'defined wall'], ['Cavity', 'gas space within a nodule, mass or consolidation', 'necrosis/drainage'], ['Thin cavity', 'wall <4 mm', 'more often benign, not definitive'], ['Indeterminate wall', '4–15 mm', 'morphology and follow-up decide'], ['Thick cavity', '>15 mm', 'higher malignancy suspicion'], ['Irregular inner contour', 'nodular wall components', 'suspicious'], ['Air-fluid level', 'gas and liquid within a space', 'abscess or superinfection'], ['Aspergilloma', 'mobile intracavitary mass with air crescent', 'mycetoma'], ['Upper-lobe cavity', 'consider TB or squamous carcinoma', 'topography'], ['Dependent cavity', 'consider aspiration/abscess', 'topography'], ['Cavity vs cyst', 'surrounding lesion and thicker irregular wall', 'cavity'],
    ],
    fa: [
      ['بولا', '≥۱ سانتی‌متر با دیواره ≤۱ میلی‌متر', 'آمفیزم'], ['کیست', 'فضای هوایی گرد با دیواره معمولاً <۲ میلی‌متر', 'دیواره مشخص'], ['کاویتی', 'فضای گازی داخل ندول، توده یا کنسولیدیشن', 'نکروز/درناژ'], ['کاویتی نازک', 'دیواره <۴ میلی‌متر', 'اغلب خوش‌خیم‌تر، نه قطعی'], ['دیواره نامعین', '۴–۱۵ میلی‌متر', 'مورفولوژی و پیگیری تعیین‌کننده'], ['کاویتی ضخیم', '>۱۵ میلی‌متر', 'شک بیشتر به بدخیمی'], ['کانتور داخلی نامنظم', 'اجزای ندولار دیواره', 'مشکوک'], ['سطح هوا-مایع', 'گاز و مایع داخل حفره', 'آبسه یا عفونت ثانویه'], ['آسپرژیلوم', 'توده متحرک داخل کاویتی با هلال هوا', 'میستوم'], ['کاویتی لوب فوقانی', 'سل یا کارسینوم سنگفرشی را در نظر بگیرید', 'توپوگرافی'], ['کاویتی وابسته', 'آسپیراسیون/آبسه را در نظر بگیرید', 'توپوگرافی'], ['کاویتی در برابر کیست', 'ضایعه اطراف و دیواره ضخیم‌تر نامنظم', 'کاویتی'],
    ],
  },
}

for (const [topicId, facts] of Object.entries(compactFactSets)) {
  quizFacts[topicId] = facts.map((fact, index) => {
    const en = factTranslations[topicId].en[index]
    const fa = factTranslations[topicId].fa[index]
    const question = L(`Welche Kombination beschreibt „${fact[0]}“ korrekt?`, `Which combination correctly describes “${en[0]}”?`, `کدام ترکیب «${fa[0]}» را درست توصیف می‌کند؟`)
    const correct = L(`${fact[1]} — ${fact[2]}`, `${en[1]} — ${en[2]}`, `${fa[1]} — ${fa[2]}`)
    const distractors = [facts[(index + 3) % facts.length], facts[(index + 6) % facts.length], facts[(index + 9) % facts.length]]
    const options = [correct, ...distractors.map((item, offset) => {
      const translated = factTranslations[topicId]
      const itemIndex = (index + [3, 6, 9][offset]) % facts.length
      return L(`${item[1]} — ${item[2]}`, `${translated.en[itemIndex][1]} — ${translated.en[itemIndex][2]}`, `${translated.fa[itemIndex][1]} — ${translated.fa[itemIndex][2]}`)
    })]
    return [question, options, 0, L(`„${fact[0]}“ wird durch ${fact[1]} charakterisiert und passt typischerweise zu ${fact[2]}.`, `“${en[0]}” is characterised by ${en[1]} and typically points to ${en[2]}.`, `«${fa[0]}» با ${fa[1]} مشخص می‌شود و معمولاً به ${fa[2]} اشاره دارد.`)]
  })
}

export const HRCT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  Object.entries(quizFacts).flatMap(([topicId, facts]) => facts.map((fact, index) =>
    Q(String(index + 1).padStart(2, '0'), topicId, lang, fact[0][lang], fact[1].map(option => option[lang]), fact[2], fact[3][lang])
  )),
]))

const flashExtra = {
  'hrct-dichteanhebung': [
    [
      L('Milchglas', 'Ground-glass opacity', 'شیشه‌مات'),
      L('Welche Gefäßdarstellung definiert eine Milchglasverdichtung?', 'What vascular visibility defines ground-glass opacity?', 'چه وضعیت مشاهده عروق، کدورت شیشه‌مات را تعریف می‌کند؟'),
      L('Gefäße bleiben sichtbar.', 'Vessels remain visible.', 'عروق قابل مشاهده می‌مانند.'),
      L('Die Dichte ist erhöht, aber nicht so stark, dass Gefäß- und Bronchialwandkonturen vollständig verschwinden.', 'Attenuation is increased, but not enough to completely obscure vascular and bronchial-wall margins.', 'دانسیته افزایش یافته، اما نه به اندازه‌ای که حاشیه عروق و دیواره برونش کاملاً محو شود.'),
    ],
    [
      L('Konsolidierung', 'Consolidation', 'کنسولیدیشن'),
      L('Welche Gefäßdarstellung definiert eine pulmonale Konsolidierung?', 'What vascular visibility defines pulmonary consolidation?', 'چه وضعیت مشاهده عروق، کنسولیدیشن ریه را تعریف می‌کند؟'),
      L('Gefäßränder werden verdeckt.', 'Vascular margins are obscured.', 'حاشیه عروق محو می‌شود.'),
      L('Die alveoläre Luft ist weitgehend durch Flüssigkeit, Zellen oder anderes Material ersetzt; Luftbronchogramme können bestehen bleiben.', 'Alveolar air is largely replaced by fluid, cells or other material; air bronchograms may remain visible.', 'هوای آلوئولی عمدتاً با مایع، سلول یا مواد دیگر جایگزین شده و ممکن است برونکوگرام هوایی باقی بماند.'),
    ],
    [
      L('Atelektase', 'Atelectasis', 'آتلکتازی'),
      L('Welches Zusatzzeichen macht eine Verdichtung zur Atelektase?', 'Which additional sign makes an opacity atelectatic?', 'کدام علامت اضافی یک کدورت را آتلکتاتیک می‌کند؟'),
      L('Volumenverlust.', 'Volume loss.', 'کاهش حجم.'),
      L('Fissurenverlagerung, Gefäßcrowding und Verlagerung von Hilus oder Mediastinum zur betroffenen Seite stützen die Diagnose.', 'Fissural displacement, vascular crowding and shift of the hilum or mediastinum toward the affected side support the diagnosis.', 'جابه‌جایی فیشور، تجمع عروق و حرکت ناف یا مدیاستن به سمت درگیر، تشخیص را حمایت می‌کند.'),
    ],
  ],
}

const genericCardTranslations = {
  en: {
    q: (name) => `What is the key HRCT association of ${name}?`,
    a: (feature) => feature,
    e: (name, feature, association) => `${name} is recognised by ${feature}. In the appropriate distribution and clinical setting, this most strongly suggests ${association}.`,
  },
  fa: {
    q: (name) => `ارتباط کلیدی HRCT در ${name} چیست؟`,
    a: (feature) => feature,
    e: (name, feature, association) => `${name} با ${feature} شناخته می‌شود و در توزیع و زمینه بالینی مناسب بیشتر به نفع ${association} است.`,
  },
}

export const HRCT_FLASHCARD_TOPICS = Object.values(HRCT_LESSONS).map(lesson => ({
  id: lesson.id,
  title: lesson.title,
  subtitle: lesson.definition,
  area: 'Thorax',
  chapter: L('HRCT-Muster', 'HRCT Patterns', 'الگوهای HRCT'),
  icon: '🫁',
  iconImage: '/fach/thorax.png',
  color: '#0284c7',
  href: `/flashcards/${lesson.id}`,
}))

export const HRCT_FLASHCARDS = []
for (const [topicId, facts] of Object.entries(quizFacts)) {
  const sourceFacts = compactFactSets[topicId]
  if (sourceFacts) {
    sourceFacts.forEach((fact, index) => {
      const en = factTranslations[topicId].en[index]
      const fa = factTranslations[topicId].fa[index]
      HRCT_FLASHCARDS.push({
        id: `${topicId}-fc-${String(index + 1).padStart(2, '0')}`, topicId,
        category: L('Mustererkennung', 'Pattern recognition', 'تشخیص الگو'),
        front: L(`Welche zentrale HRCT-Assoziation gehört zu ${fact[0]}?`, genericCardTranslations.en.q(en[0]), genericCardTranslations.fa.q(fa[0])),
        answer: L(fact[1], genericCardTranslations.en.a(en[1]), genericCardTranslations.fa.a(fa[1])),
        explanation: L(`${fact[0]} erkennt man an ${fact[1]}. In passender Verteilung und Klinik weist dies besonders auf ${fact[2]} hin.`, genericCardTranslations.en.e(en[0], en[1], en[2]), genericCardTranslations.fa.e(fa[0], fa[1], fa[2])),
      })
    })
  } else {
    facts.forEach((fact, index) => {
      HRCT_FLASHCARDS.push({
        id: `${topicId}-fc-${String(index + 1).padStart(2, '0')}`, topicId,
        category: L('Mustererkennung', 'Pattern recognition', 'تشخیص الگو'),
        front: fact[0], answer: fact[1][fact[2]], explanation: fact[3],
      })
    })
  }
}

for (const [topicId, extras] of Object.entries(flashExtra)) {
  extras.forEach((item, index) => {
    HRCT_FLASHCARDS.push({
      id: `${topicId}-fc-${String(13 + index).padStart(2, '0')}`, topicId,
      category: item[0],
      front: item[1],
      answer: item[2],
      explanation: item[3],
    })
  })
}

// Ensure every HRCT page exposes 15 focused cards without duplicating vague prompts.
for (const lesson of Object.values(HRCT_LESSONS)) {
  const cards = HRCT_FLASHCARDS.filter(card => card.topicId === lesson.id)
  while (cards.length < 15) {
    const takehome = lesson.takehome[cards.length % lesson.takehome.length]
    const number = cards.length + 1
    const card = {
      id: `${lesson.id}-fc-${String(number).padStart(2, '0')}`,
      topicId: lesson.id,
      category: L('Prüfungsmerke', 'Exam pearl', 'نکته آزمونی'),
      front: L(`Welche konkrete Prüfungsregel gilt bei ${lesson.title.de}?`, `Which concrete exam rule applies to ${lesson.title.en}?`, `کدام قاعده مشخص آزمونی در ${lesson.title.fa} کاربرد دارد؟`),
      answer: takehome,
      explanation: L(`Diese Regel verknüpft die sichtbare Morphologie mit dem nächsten diagnostischen Schritt und verhindert eine unspezifische Befundung.`, `This rule links the visible morphology to the next diagnostic step and prevents nonspecific reporting.`, `این قاعده مورفولوژی قابل مشاهده را به گام تشخیصی بعدی پیوند می‌دهد و از گزارش غیراختصاصی جلوگیری می‌کند.`),
    }
    HRCT_FLASHCARDS.push(card)
    cards.push(card)
  }
}
