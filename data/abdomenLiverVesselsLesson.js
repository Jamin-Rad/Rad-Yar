const L = (de, en, fa) => ({ de, en, fa })

export const ABDOMEN_LIVER_VESSELS_LESSON = {
  id: 'abdomen-liver-vessels',
  title: L('Lebergefäße: Zufluss und Abfluss', 'Liver vessels: inflow and outflow', 'عروق کبد: ورودی و خروجی'),
  hero: '/educational/abdomen-liver-vessels/hero.svg',
  sourceNote: L(
    'Begrenzte Orientierung nach Abdomen.pdf, PDF-Seiten 2–4. Seite 2 zeigt die beschrifteten Hauptabgänge der abdominalen Aorta; die Tafeln auf S. 2–3 wurden visuell geprüft und S. 4 nennt die Zu- und Abflussbeziehungen der Leber. Segmentanatomie, Gefäßvarianten, Flussmessung und CT/MRT-Phasen sind nicht enthalten.',
    'Bounded orientation based on Abdomen.pdf, PDF pp. 2–4. Page 2 labels major branches of the abdominal aorta; the plates on pp. 2–3 were visually reviewed and p. 4 states liver inflow and outflow relationships. Segmental anatomy, vascular variants, flow measurements and CT/MRI phases are not included.',
    'این درسِ محدود بر پایهٔ Abdomen.pdf، صفحات PDF ۲ تا ۴ است. صفحهٔ ۲ شاخه‌های اصلی برچسب‌گذاری‌شدهٔ آئورت شکمی را نشان می‌دهد؛ تصاویر صفحات ۲ و ۳ بررسی دیداری شده‌اند و صفحهٔ ۴ رابطهٔ ورودی و خروجی کبد را بیان می‌کند. آناتومی سگمنتال، واریانت‌های عروقی، اندازه‌گیری جریان و فازهای CT/MRI در این درس نیستند.'
  ),
  sections: [
    {
      id: 'inflow', icon: 'clinical',
      title: L('Welche Gefäße führen Blut zur Leber?', 'Which vessels bring blood to the liver?', 'کدام عروق خون را به کبد می‌رسانند؟'),
      lead: L('Die Kursquelle zeigt zwei Zuflusswege. Die Pfortader entsteht aus der V. mesenterica superior und der V. splenica; die A. hepatica propria kommt aus dem Truncus coeliacus über die A. hepatica communis.', 'The course source shows two inflow routes. The portal vein is formed by the superior mesenteric and splenic veins; the proper hepatic artery arises from the celiac trunk via the common hepatic artery.', 'منبع آموزشی دو مسیر ورودی نشان می‌دهد. ورید پورت از پیوند ورید مزانتریک فوقانی و ورید طحالی تشکیل می‌شود؛ شریان کبدی اختصاصی از تنهٔ سلیاک و از راه شریان کبدی مشترک منشأ می‌گیرد.'),
      rows: [
        [L('Portalvenöser Zufluss', 'Portal venous inflow', 'ورودی ورید پورت'), L('V. mesenterica superior + V. splenica → V. portae hepatis.', 'Superior mesenteric vein + splenic vein → hepatic portal vein.', 'ورید مزانتریک فوقانی + ورید طحالی ← ورید پورت کبدی.')],
        [L('Arterieller Zufluss', 'Arterial inflow', 'ورودی شریانی'), L('Truncus coeliacus → A. hepatica communis → A. hepatica propria.', 'Celiac trunk → common hepatic artery → proper hepatic artery.', 'تنهٔ سلیاک ← شریان کبدی مشترک ← شریان کبدی اختصاصی.')]
      ],
      image: {
        src: '/educational/abdomen-liver-vessels/source-p3-portal-confluence.png',
        alt: L('Originaltafel aus Abdomen.pdf, PDF-Seite 3. Im oberen Bild sind Portalvene und spleno-mesenteriale Konfluenz neben Aorta und Vena cava inferior beschriftet.', 'Original plate from Abdomen.pdf, PDF page 3. In the upper image, the portal vein and splenomesenteric confluence are labelled beside the aorta and inferior vena cava.', 'تصویر اصلی Abdomen.pdf، صفحهٔ PDF شمارهٔ ۳. در تصویر بالایی، ورید پورت و محل پیوند ورید طحالی‌ـ‌مزانتریک در کنار آئورت و ورید اجوف تحتانی برچسب‌گذاری شده‌اند.'),
        caption: L('Die obere Abbildung zur Orientierung nutzen: Wo vereinigen sich V. splenica und V. mesenterica superior?', 'Use the upper figure for orientation: where do the splenic and superior mesenteric veins meet?', 'برای جهت‌یابی از تصویر بالا استفاده کن: ورید طحالی و ورید مزانتریک فوقانی کجا به هم می‌پیوندند؟')
      }
    },
    {
      id: 'aortic-branches', icon: 'imaging',
      title: L('Welche Hauptäste zeigt die Aorta abdominalis?', 'Which major branches are shown from the abdominal aorta?', 'آئورت شکمی چه شاخه‌های اصلی‌ای را نشان می‌دهد؟'),
      lead: L('Die Tafel auf PDF-Seite 2 ordnet beschriftete Äste entlang der Aorta. Für die Leberorientierung ist besonders der Truncus coeliacus mit der A. hepatica communis wichtig; die übrigen Beschriftungen helfen, die großen viszeralen und parietalen Abgänge räumlich einzuordnen.', 'The plate on PDF page 2 places labelled branches along the aorta. For liver orientation, the celiac trunk and common hepatic artery are especially relevant; the other labels help locate the major visceral and parietal branches.', 'تصویر صفحهٔ ۲ PDF شاخه‌های برچسب‌گذاری‌شده را در امتداد آئورت مرتب می‌کند. برای جهت‌یابی عروق کبد، تنهٔ سلیاک و شریان کبدی مشترک اهمیت ویژه دارند؛ سایر برچسب‌ها به تشخیص جایگاه شاخه‌های احشایی و جداری اصلی کمک می‌کنند.'),
      rows: [
        [L('Truncus coeliacus', 'Celiac trunk', 'تنهٔ سلیاک'), L('A. hepatica communis, A. gastrica sinistra und A. splenica.', 'Common hepatic, left gastric and splenic arteries.', 'شریان کبدی مشترک، شریان معده‌ای چپ و شریان طحالی.')],
        [L('Mesenterialarterien', 'Mesenteric arteries', 'شریان‌های مزانتریک'), L('A. mesenterica superior und A. mesenterica inferior.', 'Superior and inferior mesenteric arteries.', 'شریان مزانتریک فوقانی و شریان مزانتریک تحتانی.')],
        [L('Nierenarterien', 'Renal arteries', 'شریان‌های کلیوی'), L('A. renalis dextra und A. renalis sinistra.', 'Right and left renal arteries.', 'شریان کلیوی راست و شریان کلیوی چپ.')],
        [L('Weitere beschriftete Äste', 'Other labelled branches', 'سایر شاخه‌های برچسب‌گذاری‌شده'), L('A. phrenica inferior, A. suprarenalis media und Aa. lumbales.', 'Inferior phrenic, middle suprarenal and lumbar arteries.', 'شریان فرنیک تحتانی، شریان فوق‌کلیوی میانی و شریان‌های کمری.')],
        [L('Distales Ende', 'Distal end', 'انتهای دیستال'), L('Bifurcatio aortae, Aa. iliacae communes und A. sacralis mediana.', 'Aortic bifurcation, common iliac arteries and median sacral artery.', 'دوشاخه‌شدن آئورت، شریان‌های ایلیاک مشترک و شریان ساکرال میانی.')]
      ],
      image: {
        src: '/educational/abdomen-liver-vessels/source-p2-arterial-overview.png',
        alt: L('Beschriftete Arterientafel aus Abdomen.pdf, PDF-Seite 2: Aorta abdominalis mit Truncus coeliacus, Leber-, Magen-, Milz-, Nieren- und Mesenterialarterien sowie unteren Abgängen.', 'Labelled arterial plate from Abdomen.pdf, PDF page 2: abdominal aorta with celiac trunk, hepatic, gastric, splenic, renal and mesenteric arteries, plus distal branches.', 'تصویر برچسب‌گذاری‌شدهٔ شریان‌ها از Abdomen.pdf، صفحهٔ PDF شمارهٔ ۲: آئورت شکمی با تنهٔ سلیاک، شریان‌های کبدی، معده‌ای، طحالی، کلیوی و مزانتریک و شاخه‌های انتهایی.'),
        caption: L('Auf der Abbildung den Truncus coeliacus und die A. hepatica communis verfolgen. Die Tafel zeigt Hauptäste, keine vollständige Gefäßkarte.', 'Trace the celiac trunk and common hepatic artery in the figure. The plate shows major branches, not a complete vascular map.', 'در تصویر تنهٔ سلیاک و شریان کبدی مشترک را دنبال کنید. این تصویر شاخه‌های اصلی را نشان می‌دهد، نه نقشهٔ کامل عروق.')
      }
    },
    {
      id: 'outflow', icon: 'imaging',
      title: L('Wohin fließt das Blut aus der Leber?', 'Where does blood leave the liver?', 'خون از کبد به کجا تخلیه می‌شود؟'),
      lead: L('Die Lebervenen (Vv. hepaticae) münden laut PDF direkt in die V. cava inferior. Damit sind Portalvene und Lebervenen funktionell verschieden gerichtete Abschnitte: Zufluss zur Leber versus Abfluss zur Hohlvene.', 'According to the PDF, the hepatic veins drain directly into the inferior vena cava. The portal vein and hepatic veins therefore represent differently directed pathways: inflow to the liver versus outflow to the vena cava.', 'طبق PDF، وریدهای کبدی مستقیماً به ورید اجوف تحتانی می‌ریزند. بنابراین ورید پورت و وریدهای کبدی مسیرهایی با جهت متفاوت‌اند: ورود خون به کبد در برابر خروج آن به ورید اجوف.'),
      rows: [
        [L('Zufluss', 'Inflow', 'ورودی'), L('V. portae hepatis und A. hepatica propria führen zur Leber.', 'The hepatic portal vein and proper hepatic artery lead into the liver.', 'ورید پورت کبدی و شریان کبدی اختصاصی به کبد وارد می‌شوند.')],
        [L('Abfluss', 'Outflow', 'خروجی'), L('Vv. hepaticae → V. cava inferior.', 'Hepatic veins → inferior vena cava.', 'وریدهای کبدی ← ورید اجوف تحتانی.')]
      ],
      image: null
    }
  ],
  checkTitle: L('Äste zuordnen und Zu- von Abfluss unterscheiden', 'Place the branches and distinguish inflow from outflow', 'شاخه‌ها را جای‌یابی کنید و مسیرهای ورودی را از خروجی کبد تفکیک کنید'),
  checks: [
    {
      title: L('Welcher Ast ist im Bild dem Truncus coeliacus zugeordnet?', 'Which branch is shown arising from the celiac trunk?', 'در تصویر کدام شاخه به تنهٔ سلیاک مرتبط است؟'),
      prompt: L('Wähle die Arteriengruppe, die auf der PDF-Tafel beim Truncus coeliacus beschriftet ist.', 'Choose the arterial group labelled with the celiac trunk on the PDF plate.', 'گروهی از شریان‌ها را انتخاب کنید که در تصویر PDF در کنار تنهٔ سلیاک برچسب خورده‌اند.'),
      options: [
        L('A. hepatica communis, A. gastrica sinistra und A. splenica.', 'Common hepatic, left gastric and splenic arteries.', 'شریان کبدی مشترک، شریان معده‌ای چپ و شریان طحالی.'),
        L('A. mesenterica superior und A. mesenterica inferior.', 'Superior and inferior mesenteric arteries.', 'شریان مزانتریک فوقانی و شریان مزانتریک تحتانی.'),
        L('A. renalis dextra und A. renalis sinistra.', 'Right and left renal arteries.', 'شریان کلیوی راست و شریان کلیوی چپ.')
      ],
      answer: 0,
      good: L('Richtig: Diese drei Äste sind in der Tafel am Truncus coeliacus beschriftet.', 'Correct: these three branches are labelled at the celiac trunk on the plate.', 'درست است: این سه شاخه در تصویر کنار تنهٔ سلیاک برچسب‌گذاری شده‌اند.'),
      retry: L('Orientiere dich an den Beschriftungen der Abbildung: Leber-, linke Magen- und Milzarterie stehen beim Truncus coeliacus.', 'Use the figure labels: the hepatic, left gastric and splenic arteries are shown with the celiac trunk.', 'به برچسب‌های تصویر توجه کنید: شریان‌های کبدی، معده‌ای چپ و طحالی در کنار تنهٔ سلیاک نشان داده شده‌اند.')
    },
    {
      title: L('Zufluss oder Abfluss?', 'Inflow or outflow?', 'ورودی یا خروجی؟'),
      prompt: L('Welche Gefäßverbindung beschreibt den Abfluss aus der Leber?', 'Which vessel connection describes outflow from the liver?', 'کدام ارتباط عروقی خروج خون از کبد را توصیف می‌کند؟'),
      options: [
        L('Vv. hepaticae münden in die V. cava inferior.', 'The hepatic veins drain into the inferior vena cava.', 'وریدهای کبدی به ورید اجوف تحتانی می‌ریزند.'),
        L('V. mesenterica superior und V. splenica bilden die V. portae hepatis.', 'The superior mesenteric and splenic veins form the hepatic portal vein.', 'ورید مزانتریک فوقانی و ورید طحالی، ورید پورت کبدی را تشکیل می‌دهند.')
      ],
      answer: 0,
      good: L('Richtig: Die PDF ordnet die Vv. hepaticae dem Abfluss zu und beschreibt ihre direkte Mündung in die V. cava inferior.', 'Correct: the PDF identifies the hepatic veins as outflow and describes their direct drainage into the inferior vena cava.', 'درست است: PDF وریدهای کبدی را مسیر خروجی می‌داند و تخلیهٔ مستقیم آن‌ها به ورید اجوف تحتانی را بیان می‌کند.'),
      retry: L('Unterscheide Zufluss zur Leber von Abfluss zur Hohlvene: Die Pfortader entsteht aus zwei Zuflüssen; die Lebervenen münden in die V. cava inferior.', 'Separate inflow to the liver from outflow to the vena cava: the portal vein forms from two inflows; the hepatic veins drain into the inferior vena cava.', 'ورودی به کبد را از خروج به ورید اجوف جدا کن: ورید پورت از دو ورید ورودی تشکیل می‌شود؛ وریدهای کبدی به ورید اجوف تحتانی می‌ریزند.')
    }
  ],
  summary: [
    L('Am Truncus coeliacus sind A. hepatica communis, A. gastrica sinistra und A. splenica beschriftet.', 'The common hepatic, left gastric and splenic arteries are labelled with the celiac trunk.', 'در تصویر، شریان کبدی مشترک، شریان معده‌ای چپ و شریان طحالی در کنار تنهٔ سلیاک برچسب خورده‌اند.'),
    L('Zwei Zuflüsse: V. portae hepatis und A. hepatica propria.', 'Two inflows: hepatic portal vein and proper hepatic artery.', 'دو مسیر ورودی: ورید پورت کبدی و شریان کبدی اختصاصی.'),
    L('Die Pfortader entsteht aus V. mesenterica superior und V. splenica.', 'The portal vein forms from the superior mesenteric and splenic veins.', 'ورید پورت از ورید مزانتریک فوقانی و ورید طحالی تشکیل می‌شود.'),
    L('Die Vv. hepaticae leiten Blut direkt in die V. cava inferior ab.', 'The hepatic veins drain directly into the inferior vena cava.', 'وریدهای کبدی خون را مستقیماً به ورید اجوف تحتانی تخلیه می‌کنند.')
  ],
  references: [
    { title: L('Kursquelle', 'Course source', 'منبع آموزشی'), citation: L('Abdomen.pdf, PDF-Seiten 2–4; Seite 2 zeigt beschriftete Aortenäste, Seiten 2–3 Originaltafeln, Seite 4 eine kurze Textzusammenfassung.', 'Abdomen.pdf, PDF pp. 2–4; p. 2 labels aortic branches, pp. 2–3 contain original plates, and p. 4 has a short text summary.', 'Abdomen.pdf، صفحات PDF ۲ تا ۴؛ صفحهٔ ۲ شاخه‌های آئورت را برچسب‌گذاری می‌کند، صفحات ۲ و ۳ تصویر اصلی دارند و صفحهٔ ۴ خلاصهٔ کوتاه متنی است.'), href: '' }
  ]
}
