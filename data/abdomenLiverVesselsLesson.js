const L = (de, en, fa) => ({ de, en, fa })

export const ABDOMEN_LIVER_VESSELS_LESSON = {
  id: 'abdomen-liver-vessels',
  title: L('Lebergefäße: Zufluss und Abfluss', 'Liver vessels: inflow and outflow', 'عروق کبد: ورودی و خروجی'),
  hero: '/educational/abdomen-liver-vessels/hero.svg',
  sourceNote: L(
    'Begrenzte Orientierung nach Abdomen.pdf, PDF-Seiten 2–4. Die Tafeln auf S. 2–3 wurden visuell geprüft; S. 4 nennt die Zufluss- und Abflussbeziehungen. Nicht enthalten sind Segmentanatomie, Gefäßvarianten, Flussmessung oder CT/MRT-Phasen.',
    'Bounded orientation based on Abdomen.pdf, PDF pp. 2–4. The plates on pp. 2–3 were visually reviewed; p. 4 states the inflow and outflow relationships. Segmental anatomy, vascular variants, flow measurements and CT/MRI phases are outside this lesson.',
    'این درسِ محدود بر پایهٔ Abdomen.pdf، صفحات PDF ۲ تا ۴ است. تصاویر صفحات ۲ و ۳ بررسی دیداری شده‌اند؛ صفحهٔ ۴ رابطهٔ ورودی و خروجی را بیان می‌کند. آناتومی سگمنتال، واریانت‌های عروقی، اندازه‌گیری جریان و فازهای CT/MRI در این درس پوشش داده نمی‌شوند.'
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
      id: 'outflow', icon: 'imaging',
      title: L('Wohin fließt das Blut aus der Leber?', 'Where does blood leave the liver?', 'خون از کبد به کجا تخلیه می‌شود؟'),
      lead: L('Die Lebervenen (Vv. hepaticae) münden laut PDF direkt in die V. cava inferior. Damit sind Portalvene und Lebervenen funktionell verschieden gerichtete Abschnitte: Zufluss zur Leber versus Abfluss zur Hohlvene.', 'According to the PDF, the hepatic veins drain directly into the inferior vena cava. The portal vein and hepatic veins therefore represent differently directed pathways: inflow to the liver versus outflow to the vena cava.', 'طبق PDF، وریدهای کبدی مستقیماً به ورید اجوف تحتانی می‌ریزند. بنابراین ورید پورت و وریدهای کبدی مسیرهایی با جهت متفاوت‌اند: ورود خون به کبد در برابر خروج آن به ورید اجوف.'),
      rows: [
        [L('Zufluss', 'Inflow', 'ورودی'), L('V. portae hepatis und A. hepatica propria führen zur Leber.', 'The hepatic portal vein and proper hepatic artery lead into the liver.', 'ورید پورت کبدی و شریان کبدی اختصاصی به کبد وارد می‌شوند.')],
        [L('Abfluss', 'Outflow', 'خروجی'), L('Vv. hepaticae → V. cava inferior.', 'Hepatic veins → inferior vena cava.', 'وریدهای کبدی ← ورید اجوف تحتانی.')]
      ],
      image: {
        src: '/educational/abdomen-liver-vessels/source-p2-arterial-overview.png',
        alt: L('Originaltafel aus Abdomen.pdf, PDF-Seite 2: abdominale Aorta und beschriftete viszerale Arterien, einschließlich Truncus coeliacus und A. hepatica communis.', 'Original plate from Abdomen.pdf, PDF page 2: abdominal aorta and labelled visceral arteries, including the celiac trunk and common hepatic artery.', 'تصویر اصلی Abdomen.pdf، صفحهٔ PDF شمارهٔ ۲: آئورت شکمی و شریان‌های احشایی برچسب‌گذاری‌شده، از جمله تنهٔ سلیاک و شریان کبدی مشترک.'),
        caption: L('Die Tafel zeigt die arterielle Hauptachse. Sie bildet keine intrahepatischen Segmentäste ab.', 'This plate shows the main arterial axis; it does not depict intrahepatic segmental branches.', 'این تصویر محور اصلی شریانی را نشان می‌دهد و شاخه‌های سگمنتال داخل کبدی را نمایش نمی‌دهد.')
      }
    }
  ],
  check: {
    title: L('Zufluss oder Abfluss?', 'Inflow or outflow?', 'ورودی یا خروجی؟'),
    prompt: L('Welche Gefäßverbindung beschreibt den Abfluss aus der Leber?', 'Which vessel connection describes outflow from the liver?', 'کدام ارتباط عروقی خروج خون از کبد را توصیف می‌کند؟'),
    options: [
      L('Vv. hepaticae münden in die V. cava inferior.', 'The hepatic veins drain into the inferior vena cava.', 'وریدهای کبدی به ورید اجوف تحتانی می‌ریزند.'),
      L('V. mesenterica superior und V. splenica bilden die V. portae hepatis.', 'The superior mesenteric and splenic veins form the hepatic portal vein.', 'ورید مزانتریک فوقانی و ورید طحالی، ورید پورت کبدی را تشکیل می‌دهند.')
    ],
    answer: 0,
    good: L('Richtig: Die PDF ordnet die Vv. hepaticae dem Abfluss zu und beschreibt ihre direkte Mündung in die V. cava inferior.', 'Correct: the PDF identifies the hepatic veins as outflow and describes their direct drainage into the inferior vena cava.', 'درست است: PDF وریدهای کبدی را مسیر خروجی می‌داند و تخلیهٔ مستقیم آن‌ها به ورید اجوف تحتانی را بیان می‌کند.'),
    retry: L('Unterscheide Zufluss zur Leber von Abfluss zur Hohlvene: Die Pfortader entsteht aus zwei Zuflüssen; die Lebervenen münden in die V. cava inferior.', 'Separate inflow to the liver from outflow to the vena cava: the portal vein forms from two inflows; the hepatic veins drain into the inferior vena cava.', 'ورودی به کبد را از خروج به ورید اجوف جدا کن: ورید پورت از دو ورید ورودی تشکیل می‌شود؛ وریدهای کبدی به ورید اجوف تحتانی می‌ریزند.')
  },
  summary: [
    L('Zwei Zuflüsse: V. portae hepatis und A. hepatica propria.', 'Two inflows: hepatic portal vein and proper hepatic artery.', 'دو مسیر ورودی: ورید پورت کبدی و شریان کبدی اختصاصی.'),
    L('Die Pfortader entsteht aus V. mesenterica superior und V. splenica.', 'The portal vein forms from the superior mesenteric and splenic veins.', 'ورید پورت از ورید مزانتریک فوقانی و ورید طحالی تشکیل می‌شود.'),
    L('Die Vv. hepaticae leiten Blut direkt in die V. cava inferior ab.', 'The hepatic veins drain directly into the inferior vena cava.', 'وریدهای کبدی خون را مستقیماً به ورید اجوف تحتانی تخلیه می‌کنند.')
  ],
  references: [
    { title: L('Kursquelle', 'Course source', 'منبع آموزشی'), citation: L('Abdomen.pdf, PDF-Seiten 2–4; Seiten 2–3 als Originaltafeln, Seite 4 mit kurzer Textzusammenfassung.', 'Abdomen.pdf, PDF pp. 2–4; original plates on pp. 2–3 and a short text summary on p. 4.', 'Abdomen.pdf، صفحات PDF ۲ تا ۴؛ تصاویر اصلی در صفحات ۲ و ۳ و خلاصهٔ کوتاه متنی در صفحهٔ ۴.'), href: '' }
  ]
}
