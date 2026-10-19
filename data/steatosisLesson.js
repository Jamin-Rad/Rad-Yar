const L = (de, en, fa) => ({ de, en, fa })

export const STEATOSIS_CHAPTERS = [
  {
    id: 'muster', icon: 'pattern',
    title: L('Das diffuse Muster erkennen', 'Recognise the diffuse pattern', 'الگوی منتشر را بشناسید'),
    lead: L('Fett in Hepatozyten verändert das Erscheinungsbild des Leberparenchyms. Beginnen Sie mit dem Vergleich zur Milz oder Niere und prüfen Sie, ob die Veränderung diffus ist.', 'Fat in hepatocytes changes the appearance of the liver parenchyma. Start by comparing it with the spleen or kidney and determine whether the change is diffuse.', 'چربی در هپاتوسیت‌ها ظاهر پارانشیم کبد را تغییر می‌دهد. ابتدا کبد را با طحال یا کلیه مقایسه کنید و منتشر بودن تغییر را بسنجید.'),
    blocks: [
      { type: 'text', text: L('Hepatische Steatose bedeutet eine abnorme Ansammlung von Lipiden in Hepatozyten. Konventionelle Bildgebung zeigt Fettverteilung und -menge, bestimmt aber weder Steatohepatitis noch das Fibrosestadium allein. Bei klinischer Fragestellung können Elastographie und validierte nicht-invasive Tests die Fibroserisikobeurteilung ergänzen.', 'Hepatic steatosis means abnormal accumulation of lipid in hepatocytes. Conventional imaging shows fat distribution and amount, but does not by itself establish steatohepatitis or fibrosis stage. When clinically indicated, elastography and validated non-invasive tests can support fibrosis risk assessment.', 'استئاتوز کبدی به‌معنای تجمع غیرطبیعی چربی در هپاتوسیت‌هاست. تصویربرداری متعارف توزیع و مقدار چربی را نشان می‌دهد، اما به‌تنهایی استئاتوهپاتیت یا مرحلهٔ فیبروز را تعیین نمی‌کند. در صورت نیاز بالینی، الاستوگرافی و آزمون‌های غیرتهاجمی معتبر می‌توانند به ارزیابی خطر فیبروز کمک کنند.')},
      { type: 'table', headers: [L('Methode', 'Modality', 'روش'), L('Worauf achten?', 'What to look for', 'به چه نکته‌ای توجه کنیم؟')], rows: [
        [L('Sonographie', 'Ultrasound', 'سونوگرافی'), L('Leber diffus echoreicher als die Niere; bei stärkerer Steatose kann die Schallabschwächung die tiefen Anteile und das Zwerchfell unscharf machen.', 'The liver is diffusely more echogenic than the kidney; with greater steatosis, sound attenuation may obscure deep structures and the diaphragm.', 'اکوژنیسیته کبد به‌طور منتشر از کلیه بیشتر است؛ در استئاتوز شدیدتر، تضعیف صوت می‌تواند بخش‌های عمقی و دیافراگم را محو کند.')],
        [L('CT nativ', 'Unenhanced CT', 'CT بدون کنتراست'), L('Verminderte Leberattenuation; die PDF beschreibt den Vergleich mit der Milz sowie beispielhafte HU-Grenzen. Einzelne Grenzwerte sind hier nicht als validierte Diagnosekriterien übernommen.', 'Reduced liver attenuation; the PDF describes comparison with the spleen and example HU thresholds. Individual cut-offs are not adopted here as validated diagnostic criteria.', 'کاهش دانسیته کبد؛ PDF مقایسه با طحال و حدود نمونه HU را ذکر می‌کند. این حدود به‌عنوان معیار تشخیصی اعتبارسنجی‌شده در این درس ارائه نمی‌شوند.')],
        [L('MRT In-/Opposed-Phase', 'MRI in-/opposed-phase', 'MRI فاز هم‌فاز/ناهم‌فاز'), L('Ein Signalabfall in der Opposed-Phase gegenüber der In-Phase spricht für mikroskopisches Fett. Für eine quantitative Messung ist die MRT-PDFF besonders genau; wegen Kosten und Verfügbarkeit ist sie nicht automatisch die Erstlinienuntersuchung.', 'A signal drop on opposed-phase compared with in-phase images supports microscopic fat. MRI-PDFF is particularly accurate for quantitative measurement; cost and availability mean it is not automatically the first-line test.', 'افت سیگنال در فاز ناهم‌فاز نسبت به هم‌فاز به نفع چربی میکروسکوپی است. MRI-PDFF برای اندازه‌گیری کمّی دقت بالایی دارد؛ هزینه و دسترسی باعث می‌شود الزاماً روش خط اول نباشد.')],
      ]},
      { type: 'note', tone: 'warning', text: L('Sonographische Helligkeit allein quantifiziert die Steatose nicht zuverlässig. Beurteilen Sie auch Schallpenetration und Sichtbarkeit tiefer Strukturen.', 'Ultrasound brightness alone does not reliably quantify steatosis. Also assess sound penetration and visibility of deep structures.', 'روشن‌تر بودن در سونوگرافی به‌تنهایی استئاتوز را به‌طور قابل اعتماد کمّی نمی‌کند. نفوذ صوت و قابلیت مشاهده ساختارهای عمقی را نیز ارزیابی کنید.') },
    ],
  },
  {
    id: 'fokal', icon: 'compare',
    title: L('Fett und fokale Aussparung unterscheiden', 'Distinguish focal fat from focal sparing', 'چربی موضعی را از ناحیه حفظ‌شده افتراق دهید'),
    lead: L('Eine umschriebene Abweichung in einer verfetteten Leber ist nicht automatisch eine Raumforderung. Achten Sie auf typische Lage und erhaltene Gefäßverläufe.', 'A focal variation in a fatty liver is not automatically a mass. Look for a typical location and preserved vessel course.', 'تغییر موضعی در کبد چرب الزاماً توده نیست. به محل تیپیک و حفظ مسیر عروق توجه کنید.'),
    blocks: [
      { type: 'diagram' },
      { type: 'table', headers: [L('Hinweis', 'Clue', 'سرنخ'), L('Fokale Steatose / Aussparung', 'Focal steatosis / sparing', 'استئاتوز موضعی / ناحیه حفظ‌شده'), L('Raumforderung?', 'Mass?', 'توده؟')], rows: [
        [L('Typische Lage', 'Typical location', 'محل تیپیک'), L('Segment IV nahe dem Ligamentum falciforme; die Gallenblasengrube liegt meist in den Segmenten IV/V. Die PDF-Zuordnung „II/III nahe der Gallenblase“ ist anatomisch widersprüchlich und wird hier nicht übernommen.', 'Segment IV near the falciform ligament; the gallbladder fossa is usually in segments IV/V. The PDF pairing of “II/III near the gallbladder” is anatomically inconsistent and is not carried into this lesson.', 'سگمان IV نزدیک رباط فالسی‌فرم؛ حفرهٔ کیسهٔ صفرا معمولاً در سگمان‌های IV/V قرار دارد. نسبت‌دادن «II/III نزدیک کیسهٔ صفرا» در PDF با آناتومی سازگار نیست و در این درس تکرار نمی‌شود.'), L('Lage allein reicht nicht.', 'Location alone is insufficient.', 'محل به‌تنهایی کافی نیست.')],
        [L('Gefäße', 'Vessels', 'عروق'), L('Gefäße verlaufen ohne Verdrängung durch das Areal.', 'Vessels pass through the area without displacement.', 'عروق بدون جابه‌جایی از میان ناحیه عبور می‌کنند.'), L('Verdrängung oder Masseneffekt gezielt suchen.', 'Look specifically for displacement or mass effect.', 'جابه‌جایی یا اثر فشاری را مشخصاً بررسی کنید.')],
        [L('MRT', 'MRI', 'MRI'), L('Signalabfall in Opposed-Phase stützt intrazelluläres Fett.', 'Signal drop on opposed-phase supports intracellular fat.', 'افت سیگنال در فاز ناهم‌فاز از چربی داخل‌سلولی حمایت می‌کند.'), L('Befunde im Gesamtkontext bewerten.', 'Interpret findings in context.', 'یافته‌ها را در زمینه کلی تفسیر کنید.')],
      ]},
      { type: 'quiz' },
    ],
  },
  {
    id: 'ursachen', icon: 'warning',
    title: L('Ursachen und Verlauf einordnen', 'Place causes and course in context', 'علت‌ها و سیر بیماری را در نظر بگیرید'),
    lead: L('Die Bildgebung zeigt Fettverteilung und mögliche Folgen; sie bestimmt die Ursache nicht allein.', 'Imaging shows fat distribution and possible consequences; it does not determine the cause by itself.', 'تصویربرداری توزیع چربی و پیامدهای احتمالی را نشان می‌دهد؛ به‌تنهایی علت را تعیین نمی‌کند.'),
    blocks: [
      { type: 'text', text: L('Die PDF nennt Alkohol, metabolische Faktoren, Medikamente, parenterale Ernährung und chronische Hepatitis als mögliche Assoziationen. Das ist keine vollständige Ursachenklassifikation; die Bildgebung allein bestimmt die Ursache nicht.', 'The PDF lists alcohol, metabolic factors, medications, parenteral nutrition and chronic hepatitis as possible associations. This is not a complete causal classification; imaging alone does not establish the cause.', 'PDF مصرف الکل، عوامل متابولیک، داروها، تغذیه وریدی و هپاتیت مزمن را به‌عنوان ارتباط‌های احتمالی ذکر می‌کند. این فهرست طبقه‌بندی کامل علت‌ها نیست؛ تصویربرداری به‌تنهایی علت را مشخص نمی‌کند.')},
      { type: 'note', tone: 'key', text: L('Laut Zusammenfassung kann Steatose ohne Fibrose oder Zirrhose bei Behandlung der zugrunde liegenden Ursache reversibel sein; langfristig ist ein Übergang zu Fibrose und Zirrhose möglich. Verlauf und Ursache gehören in den klinischen Kontext.', 'According to the summary, steatosis without fibrosis or cirrhosis may be reversible when the underlying cause is treated; progression to fibrosis and cirrhosis is possible over time. Course and cause require clinical context.', 'طبق خلاصه، استئاتوز بدون فیبروز یا سیروز با درمان علت زمینه‌ای ممکن است برگشت‌پذیر باشد؛ در درازمدت پیشرفت به فیبروز و سیروز امکان‌پذیر است. علت و سیر را باید در زمینه بالینی ارزیابی کرد.')},
    ],
  },
  {
    id: 'takehome', icon: 'spark', emphasis: true,
    title: L('Vier Regeln für die Befundung', 'Four reporting rules', 'چهار قاعده برای گزارش'),
    lead: L('Fassen Sie Verteilung, Methode und mögliche Raumforderung getrennt zusammen.', 'Summarise distribution, modality and possible mass separately.', 'توزیع، روش تصویربرداری و احتمال توده را جداگانه جمع‌بندی کنید.'),
    blocks: [{ type: 'summary', items: [
      L('Diffuse Steatose zuerst im Parenchymvergleich erkennen; Ultraschallhelligkeit allein nicht quantifizieren.', 'Recognise diffuse steatosis by comparing parenchyma; do not quantify from ultrasound brightness alone.', 'استئاتوز منتشر را ابتدا با مقایسه پارانشیم بشناسید؛ از روشنایی سونوگرافی به‌تنهایی کمّی‌سازی نکنید.'),
      L('Bei nativem CT die relative Leberattenuation beurteilen; HU-Schwellen aus der PDF sind hier nicht als validierte Kriterien freigegeben.', 'On unenhanced CT, assess relative liver attenuation; HU thresholds from the PDF are not presented here as validated criteria.', 'در CT بدون کنتراست دانسیته نسبی کبد را بسنجید؛ آستانه‌های HU از PDF در اینجا معیار اعتبارسنجی‌شده محسوب نمی‌شوند.'),
      L('Opposed-Phase-Signalabfall spricht für intrazelluläres Fett.', 'Opposed-phase signal drop supports intracellular fat.', 'افت سیگنال در فاز ناهم‌فاز به نفع چربی داخل‌سلولی است.'),
      L('Bei fokalen Arealen typische Lage und fehlenden Masseneffekt prüfen; bei Unsicherheit weiter charakterisieren.', 'For focal areas, check typical location and absence of mass effect; further characterise if uncertain.', 'در نواحی موضعی محل تیپیک و نبود اثر فشاری را بررسی کنید؛ در صورت عدم قطعیت، بررسی تکمیلی انجام دهید.'),
    ] }],
  },
]

export const STEATOSIS_COPY = {
  title: L('Hepatische Steatose', 'Hepatic steatosis', 'استئاتوز کبدی'),
  heroAlt: L('Lehrschema: diffuse Leberverfettung mit einer fokal ausgesparten Region', 'Teaching schematic: diffuse fatty liver with a focal spared region', 'شماتیک آموزشی: کبد چرب منتشر با یک ناحیهٔ حفظ‌شدهٔ موضعی'),
  ui: {
    path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
    mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'ثبت خواندن این بخش'), marked: L('Als gelesen markiert', 'Marked as read', 'خوانده شد'),
    continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'), fullMark: L('Alles als gelesen markieren', 'Mark all as read', 'ثبت خواندن کل درس'), fullMarked: L('Alles gelesen', 'All read', 'کل درس خوانده شد'),
    summary: L('Kernpunkte', 'Key points', 'نکات کلیدی'), mcq: L('Selbsttest', 'Self-check', 'خودآزمایی'), breadcrumb: L('Brotkrumennavigation', 'Breadcrumb', 'مسیر راهنما'),
  },
  quiz: {
    title: L('Selbstcheck: fokale Aussparung', 'Self-check: focal sparing', 'خودآزمایی: ناحیه حفظ‌شده موضعی'),
    stem: L('In einer diffus echoreichen Leber liegt nahe der Gallenblase ein fokales Areal. Gefäße ziehen ohne Verdrängung hindurch. Was ist der sinnvollste nächste Schritt?', 'A focal area lies near the gallbladder in a diffusely echogenic liver. Vessels pass through without displacement. What is the most appropriate next step?', 'در کبدی با اکوژنیسیته منتشر بالا، ناحیه‌ای موضعی نزدیک کیسه صفرا دیده می‌شود. عروق بدون جابه‌جایی از آن عبور می‌کنند. گام مناسب بعدی چیست؟'),
    options: [L('Typische fokale Fettverteilung / Aussparung erwägen und bei Bedarf mit geeigneter MRT-Sequenz charakterisieren.', 'Consider typical focal fat / sparing and characterise with an appropriate MRI sequence if needed.', 'توزیع موضعی چربی یا ناحیه حفظ‌شده تیپیک را در نظر بگیرید و در صورت نیاز با سکانس مناسب MRI بررسی کنید.'), L('Allein wegen der umschriebenen Form eine Metastase diagnostizieren.', 'Diagnose metastasis solely because the area is focal.', 'صرفاً به‌علت موضعی بودن، متاستاز تشخیص دهید.'), L('Die Gefäßverläufe ignorieren und die HU-Grenze der PDF auf Ultraschall übertragen.', 'Ignore vessel course and apply the PDF HU threshold to ultrasound.', 'مسیر عروق را نادیده بگیرید و حد HU در PDF را به سونوگرافی تعمیم دهید.')],
    correct: 0,
    feedback: [
      L('Richtig: typische Lage und fehlender Masseneffekt sprechen für eine Fettverteilungsvariante, beweisen sie aber nicht. Bei Unsicherheit folgt eine passende Charakterisierung.', 'Correct: typical location and absent mass effect support a fat-distribution variant but do not prove it. If uncertain, proceed to appropriate characterisation.', 'درست: محل تیپیک و نبود اثر فشاری از واریانت توزیع چربی حمایت می‌کند، اما آن را ثابت نمی‌کند. در صورت عدم قطعیت، بررسی مناسب تکمیلی انجام دهید.'),
      L('Eine fokale Form allein ist kein Malignitätskriterium; Lage, Gefäße und Gewebesignal gemeinsam beurteilen.', 'Focal shape alone is not a malignancy criterion; assess location, vessels and tissue signal together.', 'شکل موضعی به‌تنهایی معیار بدخیمی نیست؛ محل، عروق و سیگنال بافت را با هم ارزیابی کنید.'),
      L('HU sind CT-Dichtewerte und nicht auf Ultraschall übertragbar. Außerdem sollte der Masseneffekt aktiv beurteilt werden.', 'HU are CT attenuation values and cannot be transferred to ultrasound. Mass effect should also be assessed directly.', 'HU واحد دانسیته در CT است و به سونوگرافی قابل تعمیم نیست. همچنین باید اثر فشاری را مستقیماً بررسی کرد.'),
    ],
  },
}
