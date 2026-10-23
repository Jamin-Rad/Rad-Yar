const L = (de, en, fa) => ({ de, en, fa })

export const RENAL_TRAUMA_LESSON = {
  id: 'abdomen-renal-trauma',
  title: L('Nierentrauma in der CT', 'Renal trauma on CT', 'تروما کلیه در CT'),
  goals: [
    L('Die drei CT-Phasen mit den jeweils vorrangigen Suchzielen verknüpfen.', 'Match the three CT phases to their main imaging targets.', 'هر یک از سه فاز CT را با هدف اصلی ارزیابی آن مرتبط کنید.'),
    L('Parenchym-, Gefäß- und Harnableitungsverletzungen strukturiert beschreiben.', 'Describe parenchymal, vascular and collecting-system injuries systematically.', 'آسیب پارانشیم، عروق و سیستم جمع‌کننده را منظم توصیف کنید.'),
    L('Urinkontrastmittelaustritt erkennen und die Grenzen der PDF-Fallzuordnung beachten.', 'Recognise urinary contrast extravasation and respect the limits of the PDF case attribution.', 'نشت ماده حاجب ادراری را تشخیص دهید و محدودیت انتساب کیس PDF را در نظر بگیرید.'),
  ],
  sections: [
    {
      title: L('Welche Frage beantwortet jede CT-Phase?', 'What does each CT phase answer?', 'هر فاز CT به کدام پرسش پاسخ می‌دهد؟'),
      body: L('Bei Verdacht auf Nierenverletzung ist die kontrastverstärkte CT bei hämodynamisch stabilen Patientinnen und Patienten die zentrale Bildgebung. Lies sie phasenbezogen: arteriell für Gefäßverletzung und aktive Kontrastmittelextravasation, nephrographisch für Kontusionen und Parenchymlazerationen, verzögert/exkretorisch für Verletzungen des Sammelsystems und des proximalen Ureters.', 'For suspected renal injury, contrast-enhanced CT is the central imaging examination in haemodynamically stable patients. Read it by phase: arterial for vascular injury and active contrast extravasation, nephrographic for contusions and parenchymal lacerations, and delayed/excretory for collecting-system and proximal ureteric injury.', 'در شک به آسیب کلیه، CT با تزریق در بیمار همودینامیک پایدار بررسی تصویربرداری اصلی است. تصاویر را بر اساس فاز بخوانید: فاز شریانی برای آسیب عروقی و خروج فعال ماده حاجب، فاز نفروگرافیک برای کوفتگی و پارگی پارانشیم، و فاز تأخیری/دفعی برای آسیب سیستم جمع‌کننده و بخش پروگزیمال حالب.'),
      implication: L('Die EAU beschreibt eine ideale Dreiphasen-CT: arteriell, nephrographisch und etwa fünf Minuten verzögert. Bei Hypovolämie kann die fünfminütige Verzögerung für den Nachweis einer Leckage unzuverlässig sein; eine gezielte weitere Verzögerung richtet sich nach Verdacht und Protokoll.', 'The EAU describes an ideal three-phase CT: arterial, nephrographic and about five minutes delayed. In hypovolaemia, a five-minute delay may be unreliable for demonstrating a leak; any further targeted delay depends on the suspicion and local protocol.', 'EAU یک CT ایده‌آل سه‌فازی را توصیف می‌کند: شریانی، نفروگرافیک و حدود پنج دقیقه تأخیری. در هیپوولمی، تأخیر پنج‌دقیقه‌ای ممکن است برای نشان‌دادن نشت قابل‌اتکا نباشد؛ تأخیر بیشتر و هدفمند به شک بالینی و پروتکل مرکز بستگی دارد.'),
    },
    {
      title: L('Welche Verletzungsmuster müssen beschrieben werden?', 'Which injury patterns should be described?', 'کدام الگوهای آسیب را باید توصیف کرد؟'),
      body: L('Verfolge die Niere von der Kontur zum Hilus und zum Sammelsystem. Beschreibe Seite und Ausdehnung des Hämatoms, Lage und Länge der Parenchymlazeration, Perfusionsdefekte, Gefäßverletzung oder aktive Blutung sowie eine mögliche Beteiligung von Nierenbecken und Ureterabgang. Prüfe zugleich die Gegenseite und Begleitverletzungen im Untersuchungsfeld.', 'Trace the kidney from its contour to the hilum and collecting system. Describe the side and extent of haematoma, location and length of parenchymal laceration, perfusion defects, vascular injury or active bleeding, and possible involvement of the renal pelvis or ureteropelvic junction. Also assess the contralateral kidney and associated injuries within the scan field.', 'کلیه را از حاشیه تا ناف و سیستم جمع‌کننده دنبال کنید. سمت و گسترهٔ هماتوم، محل و طول پارگی پارانشیم، نقص پرفیوژن، آسیب عروقی یا خونریزی فعال و درگیری احتمالی لگنچه یا محل اتصال لگنچه به حالب را توصیف کنید. کلیهٔ مقابل و آسیب‌های همراه در محدودهٔ بررسی را نیز ارزیابی کنید.'),
      implication: L('Die AAST hat 2025 eine überarbeitete Nierenverletzungsskala veröffentlicht. Ältere Kriterien dürfen daher nicht stillschweigend als aktuelle Skala ausgegeben werden. Diese Lektion ersetzt die aktuelle Originaltabelle nicht; bei einer Grad-Angabe die verwendete Fassung nennen.', 'The AAST published a revised renal injury scale in 2025. Older criteria should therefore not be silently presented as the current scale. This lesson does not replace the current original table; name the version used whenever assigning a grade.', 'AAST در سال ۲۰۲۵ مقیاس آسیب کلیه را بازنگری کرده است؛ بنابراین نباید معیارهای قدیمی را بی‌ذکر نسخه به‌عنوان معیار فعلی ارائه کرد. این درس جایگزین جدول اصلی نسخهٔ جاری نیست؛ هنگام ذکر گرید، نسخهٔ مورد استفاده را مشخص کنید.'),
    },
    {
      title: L('Wie erkennst du eine Verletzung des Harnableitungssystems?', 'How do you recognise collecting-system injury?', 'آسیب سیستم جمع‌کننده را چگونه تشخیص می‌دهید؟'),
      body: L('Auf der nativen Phase nennt die PDF geringe perirenale Flüssigkeit und Stranding; beides ist unspezifisch und zeigt für sich keine Urinleckage. In der verzögerten/exkretorischen Phase spricht kontrastierter Urin außerhalb des Sammelsystems für eine Leckage. Suche die Verbindung zum Nierenbecken oder Kelch, verfolge den Harnleiter und erfasse Urinom sowie die retroperitoneale Ausbreitung.', 'On the unenhanced phase, the PDF notes a small amount of perirenal fluid and fat stranding; neither finding is specific or demonstrates a urine leak by itself. On delayed/excretory images, opacified urine outside the collecting system supports a leak. Look for continuity with the renal pelvis or calyx, trace the ureter, and record any urinoma and retroperitoneal spread.', 'در فاز بدون تزریق، PDF مقدار کمی مایع اطراف کلیه و کدرشدگی چربی را ذکر می‌کند؛ هیچ‌یک به‌تنهایی اختصاصی نیست یا نشت ادرار را نشان نمی‌دهد. در تصاویر تأخیری/دفعی، ادرار حاجب خارج از سیستم جمع‌کننده به نفع نشت است. ارتباط آن با لگنچه یا کالیس را دنبال کنید، حالب را بررسی کنید و اورینوما و گسترش رتروپریتوئن را ثبت کنید.'),
      implication: L('Die PDF beschreibt an einem CT-Urogramm den direkten Übertritt von Kontrastmittel aus dem Nierenbecken nach ventral und dorsal in das Retroperitoneum, passend zu einer Fornixruptur. Obwohl die Folie unter „Nierenverletzung“ steht, dokumentiert sie für diesen Fall keinen Unfallmechanismus; die Abbildung belegt eine Leckage, nicht deren traumatische Ursache.', 'The PDF describes direct contrast passage from the renal pelvis anteriorly and posteriorly into the retroperitoneum on CT urography, in keeping with a fornix rupture. Although the slide sits under “renal injury,” it does not document a traumatic mechanism for this case; the image demonstrates a leak, not its traumatic cause.', 'PDF خروج مستقیم ماده حاجب از لگنچه به جلو و عقب در رتروپریتوئن را در CT اوروگرافی توصیف می‌کند که با پارگی فورنیکس سازگار است. با اینکه اسلاید زیر عنوان «آسیب کلیه» قرار دارد، برای این کیس سازوکار تروماتیک ثبت نشده است؛ تصویر نشت را نشان می‌دهد، نه علت تروماتیک آن را.'),
    },
  ],
  check: {
    question: L('Nach einem Flankentrauma zeigt nur die verzögerte CT-Phase kontrastierten Urin außerhalb des Nierenbeckens. Welche Aussage ist am besten belegt?', 'After flank trauma, only the delayed CT phase shows opacified urine outside the renal pelvis. Which statement is best supported?', 'پس از ضربه به پهلو، فقط در فاز تأخیری CT ادرار حاجب خارج از لگنچه دیده می‌شود. کدام گزاره بهتر پشتیبانی می‌شود؟'),
    options: [
      L('Es ist eine Urinleckage aus dem Sammelsystem belegt; Ursache und Ausdehnung sind weiter zu lokalisieren.', 'A urine leak from the collecting system is demonstrated; its cause and extent still need localisation.', 'نشت ادرار از سیستم جمع‌کننده نشان داده شده است؛ علت و گسترهٔ آن باید بیشتر مکان‌یابی شوند.'),
      L('Der Befund weist eine aktive arterielle Blutung nach; die verzögerte Phase lokalisiert deren Gefäßursprung.', 'The finding demonstrates active arterial bleeding; the delayed phase localises its vascular source.', 'این یافته خونریزی فعال شریانی را نشان می‌دهد؛ فاز تأخیری منشأ عروقی آن را مکان‌یابی می‌کند.'),
      L('Die Abbildung beweist, dass die gezeigte Fornixruptur durch das Flankentrauma verursacht wurde.', 'The image proves that the illustrated fornix rupture was caused by the flank trauma.', 'تصویر ثابت می‌کند که پارگی فورنیکس نشان‌داده‌شده ناشی از ضربه به پهلو بوده است.'),
      L('Die AAST-Gradstufe lässt sich aus der verzögerten Aufnahme allein zuverlässig festlegen.', 'The AAST grade can be reliably assigned from the delayed image alone.', 'گرید AAST را می‌توان فقط از تصویر تأخیری با اطمینان تعیین کرد.'),
    ],
    answer: 0,
    explanation: L('Richtig. Extraluminaler kontrastierter Urin in der verzögerten Phase zeigt eine Leckage. Die arterielle Phase beantwortet die Blutungsfrage separat; klinischer Zustand und Verletzungsmuster bleiben entscheidend.', 'Correct. Extraluminal opacified urine on delayed images demonstrates a leak. The arterial phase addresses bleeding separately; clinical status and the complete injury pattern still matter.', 'درست است. ادرار حاجب خارج‌لومنی در تصاویر تأخیری نشان‌دهندهٔ نشت است. فاز شریانی خونریزی را جداگانه ارزیابی می‌کند؛ وضعیت بیمار و الگوی کامل آسیب همچنان اهمیت دارند.'),
    retry: L('Prüfe noch einmal die Funktion der Phasen: Eine Leckage des Sammelsystems und eine aktive arterielle Blutung werden in unterschiedlichen Phasen beurteilt.', 'Review the phase roles: a collecting-system leak and active arterial bleeding are assessed on different phases.', 'نقش فازها را دوباره مرور کنید: نشت سیستم جمع‌کننده و خونریزی فعال شریانی در فازهای متفاوت ارزیابی می‌شوند.'),
  },
  summary: [
    L('Arteriell: Gefäße und aktive Blutung; nephrographisch: Parenchym; verzögert: Sammelsystem und Harnleiter.', 'Arterial: vessels and active bleeding; nephrographic: parenchyma; delayed: collecting system and ureter.', 'شریانی: عروق و خونریزی فعال؛ نفروگرافیک: پارانشیم؛ تأخیری: سیستم جمع‌کننده و حالب.'),
    L('Kontrastierter Urin außerhalb des Sammelsystems lokalisiert eine Leckage; Flüssigkeit allein reicht dafür nicht.', 'Opacified urine outside the collecting system localises a leak; fluid alone is insufficient.', 'ادرار حاجب خارج از سیستم جمع‌کننده نشت را مکان‌یابی می‌کند؛ مایع به‌تنهایی کافی نیست.'),
    L('AAST-Skala mit Versionsangabe verwenden; Bildbefund und Behandlung nicht gleichsetzen.', 'Use the AAST scale with its version stated; do not equate imaging findings with treatment.', 'مقیاس AAST را با ذکر نسخه به‌کار ببرید؛ یافتهٔ تصویری را با تصمیم درمانی یکی ندانید.'),
  ],
  figures: {
    leak: {
      src: '/educational/nierentrauma/fornix-rupture-pdf-p57.png',
      width: 704,
      height: 507,
      alt: L('Axiales CT-Urogramm aus dem PDF: Kontrastmittelaustritt neben dem rechten Nierenbecken, durch Pfeile markiert.', 'Axial CT urogram from the PDF: contrast extravasation beside the right renal pelvis, marked by arrows.', 'CT اوروگرام محوری از PDF: خروج ماده حاجب در کنار لگنچهٔ راست که با فلش مشخص شده است.'),
      caption: L('Abdomen.pdf, S. 57 (gedruckt 56): Der Pfeil markiert Kontrastmittel außerhalb des Sammelsystems. Die Quelle nennt eine Fornixruptur; ein Unfallmechanismus ist für diesen Fall nicht angegeben.', 'Abdomen.pdf, p. 57 (printed 56): the arrow marks contrast outside the collecting system. The source calls this a fornix rupture; it does not state a traumatic mechanism for this case.', 'Abdomen.pdf، صفحهٔ ۵۷ (چاپی ۵۶): فلش ماده حاجب خارج از سیستم جمع‌کننده را نشان می‌دهد. منبع آن را پارگی فورنیکس می‌نامد؛ سازوکار تروماتیک برای این کیس ذکر نشده است.'),
    },
  },
  media: L('Das PDF-Fallbild wurde aus Abdomen.pdf, S. 57, übernommen und zugeschnitten; keine Fall-ID, Sequenz oder beitragende Person war auf der Folie lesbar. Der Nutzer hat am 19. Oktober 2026 die Verwendung der Bilder aus den sechs Vorlesungs-PDFs autorisiert. Die Grafik ist eine direkte CT-Aufnahme, keine KI-generierte Darstellung.', 'The case image was cropped from Abdomen.pdf, p. 57; no case ID, sequence metadata or contributor was legible on the slide. On 19 October 2026, the user authorised use of images from the six lecture PDFs. This is a direct CT image, not AI-generated.', 'تصویر کیس از Abdomen.pdf، صفحهٔ ۵۷ برش خورده است؛ شناسهٔ کیس، اطلاعات توالی یا نام مشارکت‌کننده در اسلاید خوانا نبود. کاربر در ۱۹ اکتبر ۲۰۲۶ استفاده از تصاویر شش PDF درسی را مجاز دانست. این تصویر CT واقعی است و با هوش مصنوعی تولید نشده است.'),
  sourceReview: L('PDF-Abdeckung: Abdomen.pdf, S. 56–57 (gedruckt 55–56). Ergänzende CT-Phasen und diagnostische Grenzen: EAU Guidelines on Urological Trauma, 2026. AAST: offizielle Seite verlinkt die Nierenverletzungsskala 2025; die aktuelle Originaltabelle ist maßgeblich. Keine Behandlungsempfehlungen oder klinische Freigabe.', 'PDF coverage: Abdomen.pdf, pp. 56–57 (printed 55–56). Supplementary CT phases and diagnostic limitations: EAU Guidelines on Urological Trauma, 2026. AAST: the official page links the 2025 renal injury scale; the current original table is authoritative. No treatment recommendations or clinical approval.', 'پوشش PDF: صفحه‌های ۵۶ تا ۵۷ (چاپی ۵۵ تا ۵۶). فازهای CT و محدودیت‌های تشخیصی تکمیلی: راهنمای ترومای اورولوژیک EAU، ۲۰۲۶. AAST: صفحهٔ رسمی به مقیاس آسیب کلیهٔ ۲۰۲۵ پیوند می‌دهد؛ جدول اصلی نسخهٔ جاری مرجع است. توصیهٔ درمانی یا تأیید بالینی ارائه نمی‌شود.'),
}

export const RENAL_TRAUMA_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `nierentrauma-${lang}-delayed-urinary-leak`, fach: 'abdomen', tags: ['nierentrauma'],
  question: L('Bei Flankentrauma zeigt nur die verzögerte CT-Phase kontrastierten Urin außerhalb des Nierenbeckens. Welche Aussage ist am besten belegt?', 'After flank trauma, only the delayed CT phase shows opacified urine outside the renal pelvis. Which statement is best supported?', 'پس از ضربه به پهلو، فقط در فاز تأخیری CT ادرار حاجب خارج از لگنچه دیده می‌شود. کدام گزاره بهتر پشتیبانی می‌شود؟')[lang],
  options: [
    L('Die Abbildung belegt eine Leckage des Sammelsystems; sie beweist für sich weder deren traumatische Ursache noch das Ausmaß der Gesamtverletzung.', 'The image demonstrates a collecting-system leak; by itself it proves neither a traumatic cause nor the extent of the overall injury.', 'تصویر نشت از سیستم جمع‌کننده را نشان می‌دهد؛ اما به‌تنهایی نه علت تروماتیک آن و نه گسترهٔ کل آسیب را ثابت می‌کند.'),
    L('Der verzögerte Kontrastaustritt belegt eine aktive arterielle Blutung aus einer Nierenarterie.', 'Delayed contrast extravasation demonstrates active arterial bleeding from a renal artery.', 'خروج تأخیری ماده حاجب، خونریزی فعال شریانی از شریان کلیوی را ثابت می‌کند.'),
    L('Die CT-Urogramm-Abbildung beweist, dass diese Fornixruptur durch das berichtete Trauma verursacht wurde.', 'The CT urogram image proves that this fornix rupture was caused by the reported trauma.', 'تصویر CT اوروگرافی ثابت می‌کند که این پارگی فورنیکس ناشی از ترومای گزارش‌شده بوده است.'),
    L('Die AAST-Gradstufe lässt sich aus dem verzögerten Bild allein zuverlässig festlegen.', 'The AAST grade can be reliably assigned from the delayed image alone.', 'گرید AAST را می‌توان فقط از تصویر تأخیری با اطمینان تعیین کرد.'),
  ].map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: 'A',
  explanation: L('Die verzögerte Phase zeigt kontrastierten Urin außerhalb des Sammelsystems. Das belegt eine Leckage, aber nicht automatisch ihre Ursache oder den Grad weiterer parenchymaler und vaskulärer Verletzungen.', 'The delayed phase shows opacified urine outside the collecting system. This demonstrates a leak, but does not automatically establish its cause or the grade of additional parenchymal and vascular injuries.', 'فاز تأخیری ادرار حاجب خارج از سیستم جمع‌کننده را نشان می‌دهد. این یافته نشت را ثابت می‌کند، اما به‌طور خودکار علت آن یا گرید آسیب‌های دیگر پارانشیمی و عروقی را مشخص نمی‌کند.')[lang],
  wrongExplanations: {
    B: L('Blutung wird primär in der arteriellen Phase beurteilt; die verzögerte Phase dient vor allem dem Sammelsystem und den ableitenden Harnwegen.', 'Bleeding is primarily assessed on the arterial phase; delayed images mainly assess the collecting system and urinary tract.', 'خونریزی عمدتاً در فاز شریانی ارزیابی می‌شود؛ تصاویر تأخیری بیشتر سیستم جمع‌کننده و مجاری ادراری را بررسی می‌کنند.')[lang],
    C: L('Die Folie nennt eine Fornixruptur, dokumentiert für diesen Fall aber keinen Unfallmechanismus.', 'The slide calls the finding a fornix rupture but does not document a traumatic mechanism for this case.', 'اسلاید یافته را پارگی فورنیکس می‌نامد، اما سازوکار تروماتیک را برای این کیس ثبت نمی‌کند.')[lang],
    D: L('Die AAST-Einstufung benötigt die Verletzungsmerkmale der vollständigen Untersuchung und muss mit Angabe der verwendeten Skalenfassung erfolgen.', 'AAST grading requires the injury features from the complete examination and must name the scale version used.', 'گریدبندی AAST به ویژگی‌های آسیب در بررسی کامل نیاز دارد و باید نسخهٔ مقیاس مورد استفاده را مشخص کند.')[lang],
  },
  source: 'Abdomen.pdf physical p.57 (printed p.56); EAU Urological Trauma 2026; AAST Kidney OIS 2025',
}))

export const RENAL_TRAUMA_FLASHCARD_TOPIC = {
  id: 'nierentrauma', area: 'Abdomen', chapter: 'Niere', icon: 'CT', iconImage: '/fach/abdomen.png', color: '#328996',
  href: '/flashcards/nierentrauma',
  title: L('Nierentrauma in der CT', 'Renal trauma on CT', 'تروما کلیه در CT'),
  subtitle: L('CT-Phasen · Verletzungsmuster · Urinleck', 'CT phases · injury patterns · urinary leak', 'فازهای CT · الگوهای آسیب · نشت ادرار'),
}

export const RENAL_TRAUMA_FLASHCARDS = [
  {
    id: 'nierentrauma-ct-phases', topicId: 'nierentrauma', category: L('CT-Phasen', 'CT phases', 'فازهای CT'),
    front: L('Welche Hauptsuchziele haben die drei CT-Phasen?', 'What are the main targets of the three CT phases?', 'هدف اصلی هر یک از سه فاز CT چیست؟'),
    answer: L('Arteriell: Gefäße/aktive Blutung; nephrographisch: Parenchym; verzögert: Sammelsystem und Harnleiter.', 'Arterial: vessels/active bleeding; nephrographic: parenchyma; delayed: collecting system and ureter.', 'شریانی: عروق/خونریزی فعال؛ نفروگرافیک: پارانشیم؛ تأخیری: سیستم جمع‌کننده و حالب.'),
    source: 'EAU Urological Trauma 2026, §4.1.2.b.1; Abdomen.pdf pp.56–57',
  },
  {
    id: 'nierentrauma-urine-leak', topicId: 'nierentrauma', category: L('Urinleck', 'Urinary leak', 'نشت ادرار'),
    front: L('Welcher Befund spricht in der verzögerten Phase für eine Leckage des Sammelsystems?', 'Which delayed-phase finding supports collecting-system leakage?', 'کدام یافته در فاز تأخیری به نفع نشت از سیستم جمع‌کننده است؟'),
    answer: L('Kontrastierter Urin außerhalb von Nierenbecken oder Kelchen; perirenale Flüssigkeit allein ist unspezifisch.', 'Opacified urine outside the renal pelvis or calyces; perirenal fluid alone is non-specific.', 'ادرار حاجب خارج از لگنچه یا کالیس؛ مایع اطراف کلیه به‌تنهایی غیراختصاصی است.'),
    source: 'Abdomen.pdf physical p.57 (printed p.56); EAU Urological Trauma 2026, §4.1.2.b.1',
  },
  {
    id: 'nierentrauma-case-limit', topicId: 'nierentrauma', category: L('Befundgrenzen', 'Limits of attribution', 'محدودیت انتساب'),
    front: L('Was beweist das abgebildete CT-Urogramm der Fornixruptur über die Ursache?', 'What does the illustrated CT urogram of fornix rupture prove about the cause?', 'CT اوروگرامِ پارگی فورنیکسِ نشان‌داده‌شده دربارهٔ علت چه چیزی را ثابت می‌کند؟'),
    answer: L('Es belegt den Urinkontrastaustritt, aber keinen Unfallmechanismus für diesen konkreten Fall.', 'It demonstrates urinary contrast extravasation, but no traumatic mechanism for this specific case.', 'خروج مادهٔ حاجب ادراری را نشان می‌دهد، اما سازوکار تروماتیک را برای این کیس مشخص ثابت نمی‌کند.'),
    source: 'Abdomen.pdf physical p.57 (printed p.56); case caption and lesson source ledger',
  },
]
