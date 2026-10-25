const L = (de, en, fa) => ({ de, en, fa })

export const MSK_NOF_LESSON = {
  id: 'nicht-ossifizierendes-fibrom',
  title: L('Nicht-ossifizierendes Fibrom', 'Non-ossifying fibroma', 'فیبروم غیر استخوان‌ساز'),
  hero: '/educational/nicht-ossifizierendes-fibrom/hero.svg',
  sourceNote: L(
    'Begrenzter Lehrentwurf nach MSK.pdf, PDF S. 107–108 (Druckseiten 106–107). Die Größenangabe zur Unterscheidung von FCD und NOF ist eine konventionelle morphologische Einteilung. Die Größen-/Kortikalisangabe zur Frakturgefahr ist ein Anlass zur individuellen fachärztlichen Beurteilung, keine alleinige Operationsindikation. Die Fallbilder stammen aus der bereitgestellten PDF.',
    'Bounded teaching draft based on MSK.pdf, PDF pp. 107–108 (printed pp. 106–107). The size distinction between FCD and NOF is a conventional morphological classification. Size and cortical involvement are prompts for individual specialist assessment, not stand-alone indications for surgery. Case images are from the supplied PDF.',
    'پیش‌نویس آموزشی محدود بر پایهٔ MSK.pdf، صفحات PDF ۱۰۷–۱۰۸ (صفحات چاپی ۱۰۶–۱۰۷). تمایز اندازه‌ای FCD و NOF یک تقسیم‌بندی مورفولوژیک قراردادی است. اندازه و درگیری کورتکس فقط محرکی برای ارزیابی تخصصی فردی است و به‌تنهایی اندیکاسیون جراحی نیست. تصاویر کیس از PDF ارائه‌شده هستند.'
  ),
  sections: [
    {
      id: 'pattern', icon: 'clinical',
      title: L('FCD oder NOF: Was unterscheidet sie?', 'FCD or NOF: what is the distinction?', 'FCD یا NOF: تفاوت چیست؟'),
      lead: L(
        'Beide Namen beschreiben dasselbe Spektrum einer gutartigen, nicht-neoplastischen fibrösen Läsion im Wachstumsskelett. Der fibröse kortikale Defekt (FCD) ist klein und bleibt auf die Kortikalis beschränkt; ein nicht-ossifizierendes Fibrom (NOF) ist größer und reicht häufig in Richtung Markraum.',
        'Both names describe a spectrum of the same benign, non-neoplastic fibrous lesion in the growing skeleton. A fibrous cortical defect (FCD) is small and confined to the cortex; a non-ossifying fibroma (NOF) is larger and often extends toward the medullary cavity.',
        'هر دو نام طیفی از یک ضایعهٔ فیبروزی خوش‌خیم و غیرنئوپلاستیک در اسکلت در حال رشد را توصیف می‌کنند. نقص فیبروزی کورتیکال (FCD) کوچک و محدود به کورتکس است؛ فیبروم غیر استخوان‌ساز (NOF) بزرگ‌تر است و اغلب به‌سمت حفرهٔ مغز استخوان گسترش می‌یابد.'
      ),
      rows: [
        [L('FCD', 'FCD', 'FCD'), L('Konventionell kleiner als 3 cm und rein kortikal.', 'Conventionally smaller than 3 cm and intracortical.', 'به‌طور قراردادی کوچک‌تر از ۳ سانتی‌متر و کاملاً کورتیکال.')],
        [L('NOF', 'NOF', 'NOF'), L('Konventionell größer als 3 cm und kann in den Markraum hineinragen.', 'Conventionally larger than 3 cm and may project into the medullary cavity.', 'به‌طور قراردادی بزرگ‌تر از ۳ سانتی‌متر و ممکن است به حفرهٔ مغز استخوان پیشروی کند.')],
        [L('Gemeinsame Biologie', 'Shared biology', 'زیست‌شناسی مشترک'), L('Die Grenze ist eine praktische Größen-/Lagebeschreibung, keine biologische Trennlinie.', 'This is a practical size/location distinction, not a biological boundary.', 'این تمایز توصیفی و مبتنی بر اندازه و محل است، نه یک مرز زیستی قطعی.')],
      ],
    },
    {
      id: 'radiograph', icon: 'imaging',
      title: L('Welches Röntgenmuster passt?', 'Which radiographic pattern fits?', 'چه الگوی رادیوگرافیکی با آن سازگار است؟'),
      lead: L(
        'Beginne mit der Röntgenaufnahme: Eine typische Läsion liegt exzentrisch in der Metaphyse eines langen Röhrenknochens nahe der Wachstumsfuge. Sie ist länglich, verläuft parallel zur Knochenachse und überschreitet die Fuge nicht.',
        'Start with radiographs: a typical lesion is eccentric in the metaphysis of a long bone, near the growth plate. It is elongated, runs parallel to the bone axis and does not cross the physis.',
        'از رادیوگرافی شروع کنید: ضایعهٔ تیپیک به‌طور اکسنتریک در متافیز استخوان بلند و نزدیک صفحهٔ رشد قرار دارد. شکل کشیده و موازی محور استخوان است و از صفحهٔ رشد عبور نمی‌کند.'
      ),
      rows: [
        [L('Rand und Matrix', 'Margin and matrix', 'حاشیه و ماتریکس'), L('Lobulierte oder polyzyklische Osteolyse mit scharfem sklerotischem Randsaum; keine interne Matrixverkalkung.', 'Lobulated or polycyclic lucency with a sharp sclerotic rim; no internal matrix mineralisation.', 'شفافیت استخوانی لوبوله یا پلی‌سیکلیک با حاشیهٔ اسکلروتیک واضح؛ بدون کلسیفیکاسیون داخلی ماتریکس.')],
        [L('Kortikalis', 'Cortex', 'کورتکس'), L('Kann ausgedünnt oder leicht aufgetrieben sein, bleibt beim typischen Muster aber intakt.', 'May be thinned or mildly expanded, but remains intact in the typical pattern.', 'ممکن است نازک یا اندکی متسع باشد، اما در الگوی تیپیک پیوستگی خود را حفظ می‌کند.')],
        [L('Mit Wachstum', 'With growth', 'با رشد'), L('Die Läsion entfernt sich durch Knochenwachstum von der Wachstumsfuge; später kann sie zunehmend sklerosieren.', 'As bone grows, the lesion moves away from the physis and may become progressively sclerotic later.', 'با رشد استخوان، ضایعه از صفحهٔ رشد دورتر می‌شود و ممکن است در مراحل بعدی به‌تدریج اسکلروتیک شود.')],
        [L('MRT bei unklarem Befund', 'MRI when the appearance is unclear', 'MRI در یافتهٔ نامشخص'), L('T1 meist intermediär bis signalarm; T2 variabel. Kollagen oder Hämosiderin können das Signal senken, aktive Anteile können signalreich sein. Das Muster ist variabel und nicht allein diagnostisch.', 'T1 signal is usually intermediate to low; T2 is variable. Collagen or haemosiderin may lower signal, while active portions may be more signal-rich. The pattern is variable and not diagnostic by itself.', 'سیگنال T1 معمولاً متوسط تا پایین و T2 متغیر است. کلاژن یا هموسیدرین می‌تواند سیگنال را کاهش دهد و بخش‌های فعال ممکن است پرسیگنال باشند. این الگو متغیر است و به‌تنهایی تشخیصی نیست.')],
      ],
      imageAlt: L('Zwei Röntgenprojektionen eines exzentrischen, scharf begrenzten NOF in der distalen Tibiametaphyse; Ausschnitt aus MSK.pdf S. 108.', 'Two radiographic views of an eccentric, well-defined NOF in the distal tibial metaphysis; crop from MSK.pdf p. 108.', 'دو نمای رادیوگرافی از NOF اکسنتریک و خوش‌مرز در متافیز دیستال تیبیا؛ برش از صفحهٔ ۱۰۸ PDF.'),
      imageCaption: L('MSK.pdf, PDF S. 108 (Druckseite 107): Achte auf die längliche metaphysäre Aufhellung, den sklerotischen Rand und die ausgedünnte, erhaltene Kortikalis. Die Projektionen sind im PDF nicht weiter bezeichnet.', 'MSK.pdf, PDF p. 108 (printed p. 107): note the elongated metaphyseal lucency, sclerotic rim and thinned but intact cortex. The PDF does not further label the projections.', 'MSK.pdf، صفحهٔ PDF ۱۰۸ (صفحهٔ چاپی ۱۰۷): به شفافیت کشیدهٔ متافیزی، حاشیهٔ اسکلروتیک و کورتکس نازک‌شده اما سالم توجه کنید. نماها در PDF بیش از این مشخص نشده‌اند.'),
    },
    {
      id: 'next-step', icon: 'differential',
      title: L('Wann reichen Röntgenbilder, wann braucht es mehr?', 'When are radiographs enough, and when is more needed?', 'چه زمانی رادیوگرافی کافی است و چه وقت بررسی بیشتر لازم است؟'),
      lead: L(
        'Bei klinisch und radiologisch klassischem Erscheinungsbild ist der Befund meist eine Zufallsentdeckung; weitere Bildgebung oder Biopsie ist in der Regel nicht nötig. Bei unklarer Morphologie, Schmerzen ohne plausible Erklärung oder möglicher Fraktur hilft MRT, die Läsion und Begleitbefunde einzuordnen.',
        'With a clinically and radiographically classic appearance, this is usually an incidental finding; additional imaging or biopsy is generally unnecessary. If morphology is atypical, pain lacks a plausible explanation or fracture is suspected, MRI can help assess the lesion and associated findings.',
        'اگر ظاهر بالینی و رادیوگرافیک کلاسیک باشد، معمولاً یافته‌ای اتفاقی است و تصویربرداری بیشتر یا بیوپسی لازم نیست. در مورفولوژی نامشخص، درد بدون توضیح قابل‌قبول یا شک به شکستگی، MRI می‌تواند به ارزیابی ضایعه و یافته‌های همراه کمک کند.'
      ),
      rows: [
        [L('Klassischer Befund', 'Classic appearance', 'ظاهر کلاسیک'), L('Röntgenmuster im passenden Alter und Ort; weitere Abklärung meist nicht erforderlich.', 'Typical radiographic pattern for age and location; further work-up is usually unnecessary.', 'الگوی تیپیک رادیوگرافی متناسب با سن و محل؛ بررسی بیشتر معمولاً لازم نیست.')],
        [L('Atypisch oder symptomatisch', 'Atypical or symptomatic', 'نامعمول یا علامت‌دار'), L('MRT bei diagnostischer Unsicherheit oder Frakturverdacht; nicht routinemäßig für jede typische Läsion.', 'MRI when diagnosis is uncertain or fracture is suspected; not routinely for every typical lesion.', 'MRI در صورت عدم قطعیت تشخیصی یا شک به شکستگی؛ نه به‌طور روتین برای هر ضایعهٔ تیپیک.')],
        [L('Frakturgefahr', 'Fracture concern', 'نگرانی از شکستگی'), L('Große Läsion und deutliche Kortikalisverdünnung erhöhen die Aufmerksamkeit. Eine Beteiligung von über 50 % des Knochendurchmessers wird in der PDF als Warnschwelle genannt, ist aber allein keine Operationsindikation; Symptome, Ort und Belastung gemeinsam fachärztlich bewerten.', 'A large lesion and marked cortical thinning deserve attention. The PDF cites involvement of more than 50% of bone diameter as a warning threshold, but this alone is not an indication for surgery; specialist assessment should consider symptoms, site and loading together.', 'ضایعهٔ بزرگ و نازکی قابل‌توجه کورتکس نیازمند توجه‌اند. PDF درگیری بیش از ۵۰٪ قطر استخوان را آستانهٔ هشدار می‌داند، اما این یافته به‌تنهایی اندیکاسیون جراحی نیست؛ علائم، محل و میزان بارگذاری باید با هم و توسط متخصص ارزیابی شوند.')],
        [L('Behandlung', 'Management', 'درمان'), L('Bei klassischem asymptomatischem Befund meist keine Behandlung. Kürettage und Auffüllung kommen nur für ausgewählte große oder symptomatische Läsionen nach orthopädischer Beurteilung infrage.', 'A classic asymptomatic lesion usually needs no treatment. Curettage and grafting are considered only for selected large or symptomatic lesions after orthopaedic assessment.', 'در ضایعهٔ کلاسیک و بی‌علامت معمولاً درمان لازم نیست. کورتاژ و پرکردن فقط برای ضایعات بزرگ یا علامت‌دار منتخب و پس از ارزیابی ارتوپدی مطرح می‌شود.')],
      ],
      note: L('Schmerzen sind nicht automatisch tumorbedingt. Bei einer Fraktur zuerst Verletzung und Frakturlinie einordnen; eine pathologische Fraktur kann die erste Manifestation eines NOF sein.', 'Pain is not automatically caused by the lesion. If a fracture is present, assess the injury and fracture line; a pathological fracture can be the first presentation of an NOF.', 'درد الزاماً ناشی از ضایعه نیست. در صورت شکستگی، آسیب و خط شکستگی را ارزیابی کنید؛ شکستگی پاتولوژیک می‌تواند نخستین تظاهر NOF باشد.'),
    },
  ],
  check: {
    title: L('Ordne das Muster ein', 'Interpret the pattern', 'الگو را تفسیر کنید'),
    prompt: L('Bei einem Jugendlichen zeigt das Röntgenbild eine exzentrische, längliche metaphysäre Aufhellung mit sklerotischem Rand. Die Kortikalis ist dünn, aber durchgehend. Was passt am besten?', 'An adolescent radiograph shows an eccentric, elongated metaphyseal lucency with a sclerotic rim. The cortex is thin but continuous. What best fits?', 'در رادیوگرافی نوجوان، شفافیت استخوانی کشیده و اکسنتریک متافیزی با حاشیهٔ اسکلروتیک دیده می‌شود. کورتکس نازک اما پیوسته است. کدام برداشت مناسب‌تر است؟'),
    options: [
      L('Typisches FCD/NOF-Muster; Größe und Ausdehnung helfen, die konventionelle Bezeichnung einzuordnen.', 'Typical FCD/NOF pattern; size and extent help assign the conventional label.', 'الگوی تیپیک FCD/NOF؛ اندازه و گسترش برای نام‌گذاری قراردادی کمک می‌کنند.'),
      L('Kortikale Kontinuität schließt ein FCD/NOF aus.', 'An intact cortex excludes FCD/NOF.', 'پیوستگی کورتکس، FCD/NOF را رد می‌کند.'),
      L('Eine MRT ist bei jeder solchen Läsion zwingend erforderlich.', 'MRI is mandatory for every lesion with this appearance.', 'برای هر ضایعه با این ظاهر، MRI الزاماً لازم است.'),
    ], answer: 0,
    explanation: L('Richtig. Exzentrische metaphysäre Lage, längliche Form und sklerotischer Rand passen; eine ausgedünnte, aber intakte Kortikalis kann dazugehören. Die konventionelle FCD/NOF-Einteilung berücksichtigt Größe und Markraumausdehnung.', 'Correct. Eccentric metaphyseal location, elongated shape and a sclerotic rim fit; a thinned but intact cortex can be part of the pattern. The conventional FCD/NOF distinction considers size and medullary extension.', 'درست است. محل اکسنتریک متافیزی، شکل کشیده و حاشیهٔ اسکلروتیک با الگو سازگارند؛ کورتکس نازک اما سالم نیز ممکن است دیده شود. تمایز قراردادی FCD/NOF به اندازه و گسترش به مغز استخوان توجه دارد.'),
    retry: L('Prüfe zuerst Lage, Form und Rand. Eine ausgedünnte Kortikalis ist nicht gleichbedeutend mit einer Kortikalisunterbrechung.', 'First assess location, shape and margin. Cortical thinning is not the same as cortical breakthrough.', 'ابتدا محل، شکل و حاشیه را بررسی کنید. نازک‌شدن کورتکس با گسست آن یکسان نیست.'),
  },
  summary: [
    L('FCD und NOF bilden ein Größenspektrum derselben benignen Läsion: kleiner/kortikal versus größer/markraumnah.', 'FCD and NOF represent a size spectrum of the same benign lesion: smaller/cortical versus larger/near the medulla.', 'FCD و NOF طیفی از یک ضایعهٔ خوش‌خیم‌اند: کوچک‌تر و کورتیکال در برابر بزرگ‌تر و نزدیک به مغز استخوان.'),
    L('Das typische Röntgenmuster ist exzentrisch-metaphysär, länglich und scharf sklerosiert.', 'The typical radiographic pattern is eccentric and metaphyseal, elongated and sharply sclerotic.', 'الگوی تیپیک رادیوگرافی اکسنتریک و متافیزی، کشیده و دارای حاشیهٔ اسکلروتیک واضح است.'),
    L('Eine dünne, erhaltene Kortikalis passt; deutliche Ausdehnung oder Frakturverdacht verlangt individuelle Beurteilung.', 'A thin but intact cortex can fit; marked expansion or suspected fracture needs individual assessment.', 'کورتکس نازک اما سالم می‌تواند با الگو سازگار باشد؛ اتساع واضح یا شک به شکستگی نیازمند ارزیابی فردی است.'),
  ],
  references: [
    { tag: 'MSK.pdf · pp. 107–108', title: L("Quelle des Nutzers: FCD und NOF, Bildmerkmale und Behandlung", 'User source: FCD and NOF, imaging features and management', 'منبع کاربر: FCD و NOF، ویژگی‌های تصویربرداری و مدیریت'), citation: L("PDF-S. 107–108; Druck-S. 106–107. Die Fallbilder stammen von PDF-S. 108; Mitwirkende und Projektionsbezeichnungen sind auf der Seite nicht angegeben.", 'PDF pp. 107–108; printed pp. 106–107. Case images are from PDF p. 108; contributor and projection labels are not provided on the page.', 'صفحات PDF ۱۰۷–۱۰۸؛ صفحات چاپی ۱۰۶–۱۰۷. تصاویر کیس از صفحهٔ ۱۰۸ هستند؛ نام مشارکت‌کننده و برچسب نما در صفحه ذکر نشده است.') },
    { tag: 'Herget et al. · 2016', title: L("Natürlicher Verlauf, Stadieneinteilung und Frakturrisiko", 'Natural history, staging and fracture risk', 'سیر طبیعی، مرحله‌بندی و خطر شکستگی'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4820930/', citation: 'BMC Musculoskeletal Disorders. 2016;17:147. Retrospective series of 103 lesions; fracture cases were associated with larger lesion length and expansion. These are cohort observations, not a universal individual treatment threshold.' },
    { tag: 'Goldin et al. · 2020', title: L("CT-Kriterien zur Beurteilung des Frakturrisikos", 'CT criteria for fracture-risk assessment', 'معیارهای CT برای ارزیابی خطر شکستگی'), href: 'https://pubmed.ncbi.nlm.nih.gov/31181027/', citation: 'J Pediatr Orthop. 2020;40(2):e149–e154. Retrospective CT criteria study for distal tibial and femoral NOFs; its multi-feature score is not reduced here to a universal single cut-off.' },
    { tag: 'Ritschl et al. · 1988', title: L("Radiologischer Verlauf metaphysärer fibröser Defekte", 'Radiologic evolution of metaphyseal fibrous defects', 'سیر رادیولوژیک نقص‌های فیبروزی متافیز'), href: 'https://pubmed.ncbi.nlm.nih.gov/3358140/', citation: 'Skeletal Radiology. 1988;17:8–15. Longitudinal radiomorphological study of fibrous metaphyseal defects.' },
  ],
}
