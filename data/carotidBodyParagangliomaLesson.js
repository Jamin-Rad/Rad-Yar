const L = (de, en, fa) => ({ de, en, fa })

export const CAROTID_BODY_PARAGANGLIOMA_LESSON = {
  id: 'paragangliome-glomustumoren',
  title: L('Glomus caroticum: Paragangliom der Karotisbifurkation', 'Carotid body paraganglioma', 'پاراگانگلیوم جسم کاروتید'),
  hero: '/educational/carotid-body-paraganglioma/hero.svg',
  sourceNote: L(
    'Begrenzter Entwurf nach Wirbelsäule.pdf, PDF-Seite 23 (Druckseite 22). Obwohl die Datei Wirbelsäule heißt, behandelt diese Seite ausdrücklich das Glomus caroticum an der Karotisbifurkation. Sie belegt keine spinalen Paragangliome; die Curriculum-ID paragangliom-spinal bleibt separat und wird hier nicht bearbeitet.',
    'Bounded draft based on Wirbelsäule.pdf, PDF p. 23 (printed p. 22). Although the file is titled Wirbelsäule, this page explicitly covers the carotid body at the carotid bifurcation. It does not support spinal paraganglioma content; curriculum ID paragangliom-spinal remains separate and is not covered here.',
    'پیش‌نویس محدود بر اساس Wirbelsäule.pdf، صفحهٔ PDF ۲۳ (صفحهٔ چاپی ۲۲). با وجود نام فایل، این صفحه صریحاً دربارهٔ جسم کاروتید در محل دوشاخه‌شدن کاروتید است. محتوایی دربارهٔ پاراگانگلیوم نخاعی پشتیبانی نمی‌کند؛ شناسهٔ جداگانهٔ paragangliom-spinal در این درس پوشش داده نمی‌شود.'
  ),
  sections: [
    {
      id: 'location', icon: 'clinical',
      title: L('Wo liegt das Glomus caroticum?', 'Where is the carotid body tumour located?', 'تومور جسم کاروتید کجا قرار دارد؟'),
      lead: L(
        'Die PDF beschreibt einen neuroendokrinen Tumor der Chemorezeptorzellen des Glomus caroticum an der Karotisbifurkation. Für die Bildsuche ist zuerst die Aufzweigung der A. carotis communis entscheidend.',
        'The PDF describes a neuroendocrine tumour of the carotid-body chemoreceptor cells at the carotid bifurcation. On imaging, first identify the division of the common carotid artery.',
        'PDF آن را تومور نورواندوکرین سلول‌های کمورسپتور جسم کاروتید در محل دوشاخه‌شدن شریان کاروتید می‌داند. در تصویر ابتدا محل انشعاب شریان کاروتید مشترک را پیدا کنید.'
      ),
      note: L(
        'Abgrenzung: Diese Lektion behandelt ausschließlich das extrakranielle Glomus caroticum. Das separat geführte Curriculum-Thema „Spinales Paragangliom“ ist nicht dasselbe Lernziel; aus dieser PDF-Seite werden keine spinalen MRT-Merkmale abgeleitet.',
        'Scope distinction: this lesson covers only the extracranial carotid body. The separate curriculum topic “Spinal paraganglioma” is a different learning objective; no spinal MRI features are inferred from this PDF page.',
        'مرزبندی دامنه: این درس فقط جسم کاروتید خارج‌جمجمه‌ای را پوشش می‌دهد. موضوع جداگانهٔ curriculum با عنوان «پاراگانگلیوم نخاعی» هدف آموزشی دیگری است؛ از این صفحهٔ PDF ویژگی MRI نخاعی استنباط نمی‌شود.'
      ),
    },
    {
      id: 'imaging', icon: 'imaging',
      title: L('Welche Lage- und MRT-Zeichen nennt die Quelle?', 'Which location and MRI signs does the source describe?', 'منبع چه نشانه‌های مکانی و MRI را ذکر می‌کند؟'),
      lead: L(
        'An der Karotisgabel spreizt die Raumforderung A. carotis interna und externa auseinander. Die PDF bezeichnet dies als Lyra- beziehungsweise Splaying-Zeichen. Im MRT beschreibt sie T1-Signal ähnlich bis niedriger als Muskel, T2-Hyperintensität und Salt-and-Pepper; laut PDF wird dieses Muster ab etwa 2 cm Tumorgröße beschrieben. Das ist eine Quellenangabe, keine diagnostische Größenschwelle.',
        'At the carotid bifurcation, the mass splays the internal and external carotid arteries. The PDF calls this the lyre or splaying sign. On MRI it describes T1 signal similar to or lower than muscle, T2 hyperintensity and a salt-and-pepper pattern; the PDF notes this pattern from about 2 cm tumour size. This reports the source wording, not a diagnostic size threshold.',
        'در محل دوشاخهٔ کاروتید، توده شریان‌های کاروتید داخلی و خارجی را از هم باز می‌کند. PDF این یافته را علامت Lyre یا Splaying می‌نامد. در MRI سیگنال T1 مشابه یا پایین‌تر از عضله، T2 پرسیگنال و الگوی Salt-and-pepper توصیف شده است؛ طبق PDF این الگو از اندازهٔ تومور حدود ۲ سانتی‌متر به بالا ذکر می‌شود. این فقط بازگویی منبع است و آستانهٔ تشخیصی اندازه نیست.'
      ),
      rows: [
        [L('CT-Lokalisation', 'CT localisation', 'موضع‌یابی در CT'), L('Raumforderung an der Karotisbifurkation; im PDF-Beispiel sagittale CT. Die Abbildung illustriert die Lage, nicht einen vollständigen CT-Algorithmus.', 'Mass at the carotid bifurcation; the PDF example is a sagittal CT. The image illustrates location, not a complete CT algorithm.', 'توده در محل دوشاخه‌شدن کاروتید؛ نمونهٔ PDF یک CT ساژیتال است. تصویر محل را نشان می‌دهد، نه یک الگوریتم کامل CT.')],
        [L('Lyra-/Splaying-Zeichen', 'Lyre/splaying sign', 'علامت Lyre/Splaying'), L('A. carotis interna und externa weichen auseinander, laut PDF an der Karotisgabel.', 'The internal and external carotid arteries are displaced apart at the bifurcation, according to the PDF.', 'طبق PDF، شریان‌های کاروتید داخلی و خارجی در محل دوشاخه از هم فاصله می‌گیرند.')],
        [L('T1 / T2', 'T1 / T2', 'T1 / T2'), L('T1: iso- bis hypointens zur Muskulatur. T2: hyperintens.', 'T1: iso- to hypointense relative to muscle. T2: hyperintense.', 'T1: هم‌سیگنال تا کم‌سیگنال نسبت به عضله. T2: پرسیگنال.')],
        [L('Salt-and-Pepper', 'Salt-and-pepper', 'الگوی Salt-and-pepper'), L('Punktförmige Flow-Voids („pepper“) und hyperintense Areale beziehungsweise Hämorrhagien („salt“). Die PDF nennt das Muster ab etwa 2 cm Tumorgröße; dies ist kein Ausschlusskriterium für kleinere Läsionen.', 'Punctate flow voids (“pepper”) and hyperintense areas or haemorrhage (“salt”). The PDF notes the pattern from about 2 cm tumour size; this is not an exclusion criterion for smaller lesions.', 'Flow voidهای نقطه‌ای («pepper») و نواحی پرسیگنال یا خونریزی («salt»). PDF این الگو را از حدود ۲ سانتی‌متر به بالا ذکر می‌کند؛ این نکته معیار رد ضایعات کوچک‌تر نیست.')],
        [L('T1 nach Kontrastmittel, fettgesättigt', 'Post-contrast fat-suppressed T1', 'T1 پس از تزریق با سرکوب چربی'), L('Die Quelle beschreibt eine kräftige, frühe und homogene Kontrastmittelaufnahme als hypervaskuläres Muster.', 'The source describes avid, early, homogeneous enhancement as a hypervascular pattern.', 'منبع تقویت شدید، زودرس و همگن را به‌عنوان الگویی پرعروق توصیف می‌کند.')],
      ],
      note2: L(
        'Die PDF-Seite nennt DWI nur als Überschrift, ohne auswertbare Aussage. Deshalb wird hier kein DWI-Muster ergänzt.',
        'The PDF page shows DWI only as a heading, without an interpretable statement. No DWI pattern is added here.',
        'در صفحهٔ PDF فقط عنوان DWI آمده و توضیح قابل استفاده‌ای ندارد؛ بنابراین الگویی برای DWI اضافه نشده است.'
      ),
      imageAlt: L('Sagittale CT-Aufnahme aus dem PDF mit Raumforderung an der Karotisbifurkation.', 'Sagittal CT image from the PDF showing a mass at the carotid bifurcation.', 'تصویر CT ساژیتال از PDF با توده‌ای در محل دوشاخه‌شدن کاروتید.'),
      imageCaption: L('Quellbild: Wirbelsäule.pdf, PDF-Seite 23 (Druckseite 22), CT-Beispiel rID 47694. Es illustriert die Lage; die Pfeile oder weitere Phasen eines kompletten Befunds sind auf diesem Ausschnitt nicht dargestellt.', 'Source image: Wirbelsäule.pdf, PDF p. 23 (printed p. 22), CT example rID 47694. It illustrates location; arrows or additional phases from a complete examination are not shown in this crop.', 'تصویر منبع: Wirbelsäule.pdf، صفحهٔ PDF ۲۳ (صفحهٔ چاپی ۲۲)، نمونهٔ CT با شناسهٔ rID 47694. تصویر محل را نشان می‌دهد؛ پیکان‌ها یا فازهای دیگر یک بررسی کامل در این برش دیده نمی‌شوند.'),
    },
    {
      id: 'shamblin', icon: 'differential',
      title: L('Wie ordnet die PDF die Gefäßumfassung ein?', 'How does the PDF group vessel encasement?', 'PDF میزان درگیری عروق را چگونه دسته‌بندی می‌کند؟'),
      lead: L('Die Shamblin-Klassifikation wird auf der Quellseite als chirurgisch relevant bezeichnet. Hier dient sie nur dazu, die in der Bildgebung beschriebene Beziehung zur Karotis knapp zu ordnen.', 'The source page labels the Shamblin classification as surgically relevant. Here it is used only to organise the imaging description of the carotid relationship.', 'صفحهٔ منبع طبقه‌بندی Shamblin را از نظر جراحی مهم می‌داند. در اینجا فقط برای مرتب‌کردن توصیف تصویریِ ارتباط با کاروتید به‌کار می‌رود.'),
      rows: [
        [L('Shamblin I', 'Shamblin I', 'Shamblin I'), L('Klein und lokal begrenzt; laut PDF leicht resezierbar.', 'Small and locally limited; the PDF describes it as readily resectable.', 'کوچک و محدود به محل؛ PDF آن را به‌سادگی قابل برداشت توصیف می‌کند.')],
        [L('Shamblin II', 'Shamblin II', 'Shamblin II'), L('Anhaftend beziehungsweise teilweise umschließend an der Karotis.', 'Adherent to or partly surrounding the carotid artery.', 'چسبیده به یا تا حدی احاطه‌کنندهٔ شریان کاروتید.')],
        [L('Shamblin III', 'Shamblin III', 'Shamblin III'), L('Vollständige Umwandung der Karotis; die PDF erwähnt einen möglichen Gefäßersatz.', 'Complete encasement of the carotid artery; the PDF notes that vascular replacement may be needed.', 'احاطهٔ کامل شریان کاروتید؛ PDF احتمال نیاز به جایگزینی عروقی را ذکر می‌کند.')],
      ],
      note: L('Dies ist eine knappe Wiedergabe der PDF-Klassifikation und keine Operations- oder Therapieempfehlung.', 'This is a concise rendering of the PDF classification, not a surgical or treatment recommendation.', 'این بخش بازگویی خلاصهٔ طبقه‌بندی PDF است و توصیهٔ جراحی یا درمانی نیست.'),
    },
  ],
  check: {
    title: L('Salt-and-Pepper richtig zuordnen', 'Match the salt-and-pepper components', 'اجزای Salt-and-pepper را درست تطبیق دهید'),
    prompt: L('Welche Zuordnung entspricht der PDF-Seite?', 'Which pairing matches the PDF page?', 'کدام تطبیق با صفحهٔ PDF هم‌خوان است؟'),
    options: [
      L('Pepper = Flow-Voids; Salt = hyperintense Areale oder Hämorrhagien.', 'Pepper = flow voids; salt = hyperintense areas or haemorrhage.', 'Pepper = Flow void؛ Salt = نواحی پرسیگنال یا خونریزی.'),
      L('Pepper = Hämorrhagien; Salt = Flow-Voids.', 'Pepper = haemorrhage; salt = flow voids.', 'Pepper = خونریزی؛ Salt = Flow void.'),
      L('Pepper und Salt bezeichnen beide die Gefäßwand.', 'Pepper and salt both refer to the vessel wall.', 'Pepper و Salt هر دو به دیوارهٔ رگ اشاره دارند.'),
    ],
    answer: 0,
    explanation: L('Die Quelle ordnet die punktförmigen Flow-Voids dem „pepper“ und hyperintense Areale beziehungsweise Hämorrhagien dem „salt“ zu.', 'The source maps punctate flow voids to “pepper” and hyperintense areas or haemorrhage to “salt”.', 'منبع Flow voidهای نقطه‌ای را به «pepper» و نواحی پرسیگنال یا خونریزی را به «salt» نسبت می‌دهد.'),
    retry: L('Prüfe noch einmal, welcher Bestandteil im PDF als punktförmiger Flow-Void beschrieben wird.', 'Review which component the PDF describes as punctate flow voids.', 'دوباره بررسی کنید که PDF کدام جزء را Flow void نقطه‌ای می‌داند.'),
  },
  summary: [
    L('Glomus caroticum liegt an der Karotisbifurkation; die PDF zeigt die Aufzweigung im sagittalen CT.', 'The carotid body lies at the carotid bifurcation; the PDF shows the branch point on sagittal CT.', 'جسم کاروتید در محل دوشاخه‌شدن کاروتید قرار دارد؛ PDF محل انشعاب را در CT ساژیتال نشان می‌دهد.'),
    L('Das Lyra-/Splaying-Zeichen beschreibt das Auseinanderweichen von A. carotis interna und externa.', 'The lyre/splaying sign describes separation of the internal and external carotid arteries.', 'علامت Lyre/Splaying فاصله‌گرفتن شریان‌های کاروتید داخلی و خارجی را توصیف می‌کند.'),
    L('MRI laut PDF: T1 iso-/hypointens, T2 hyperintens und kräftige frühe homogene Kontrastmittelaufnahme; Salt-and-Pepper beschreibt die Quelle ab etwa 2 cm Tumorgröße.', 'MRI per the PDF: T1 iso-/hypointense, T2 hyperintense and avid early homogeneous enhancement; the source describes salt-and-pepper from about 2 cm tumour size.', 'طبق PDF در MRI: T1 هم‌سیگنال/کم‌سیگنال، T2 پرسیگنال و تقویت شدید، زودرس و همگن؛ منبع الگوی Salt-and-pepper را از اندازهٔ حدود ۲ سانتی‌متر به بالا توصیف می‌کند.'),
  ],
  references: [{
    id: 'source-p23', tag: 'PDF',
    title: L('Wirbelsäule.pdf · Glomus caroticum', 'Wirbelsäule.pdf · carotid body', 'Wirbelsäule.pdf · جسم کاروتید'),
    citation: L('PDF-Seite 23, Druckseite 22. Die Seite wurde als Ganzes visuell geprüft; das CT-Beispiel trägt im PDF die Kennung rID 47694.', 'PDF p. 23, printed p. 22. The full page was visually inspected; the CT example is marked rID 47694 in the PDF.', 'صفحهٔ PDF ۲۳، صفحهٔ چاپی ۲۲. کل صفحه بصری بررسی شد؛ تصویر CT در PDF شناسهٔ rID 47694 دارد.'),
    scope: L('Nur Carotisgabel-Paragangliom; kein Beleg für das separate Curriculum-Thema „spinales Paragangliom“.', 'Carotid-bifurcation paraganglioma only; no evidence for the separate curriculum topic “spinal paraganglioma”.', 'فقط پاراگانگلیوم دوشاخهٔ کاروتید؛ بدون شواهد برای موضوع جداگانهٔ «پاراگانگلیوم نخاعی» در curriculum.'),
  }],
}
