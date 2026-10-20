const L = (de, en, fa) => ({ de, en, fa })

export const STEATOSIS_FLASHCARD_TOPIC = {
  id: 'hepatische-steatose',
  area: 'Abdomen',
  chapter: 'Leber',
  icon: 'MRI',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/hepatische-steatose',
  title: L('Hepatische Steatose', 'Hepatic steatosis', 'استئاتوز کبدی'),
  subtitle: L('US · natives CT · Chemical-Shift-MRT · fokale Aussparung', 'US · unenhanced CT · chemical-shift MRI · focal sparing', 'سونوگرافی · CT بدون تزریق · MRI chemical-shift · ناحیه حفظ‌شده موضعی'),
}

export const STEATOSIS_FLASHCARDS = [
  {
    id: 'hepatische-steatose-01-ultrasound', topicId: 'hepatische-steatose',
    category: L('Sonographie', 'Ultrasound', 'سونوگرافی'),
    front: L('Welche sonographischen Hinweise sprechen für eine diffuse hepatische Steatose?', 'Which ultrasound clues support diffuse hepatic steatosis?', 'کدام سرنخ‌های سونوگرافی به نفع استئاتوز منتشر کبدی هستند؟'),
    answer: L('Diffus erhöhte Echogenität im Vergleich zur Niere; bei stärkerer Ausprägung kann die Schallabschwächung tiefe Leberanteile und das Zwerchfell schlechter abgrenzen.', 'Diffuse increased echogenicity relative to the kidney; with greater steatosis, sound attenuation may reduce visualisation of deep liver and the diaphragm.', 'افزایش منتشر اکوژنیسیته نسبت به کلیه؛ در استئاتوز شدیدتر، تضعیف صوت ممکن است مشاهده بخش‌های عمقی کبد و دیافراگم را دشوار کند.'),
    explanation: L('Helligkeit und Schallpenetration gemeinsam beurteilen. Die B-Bild-Echogenität allein ist keine zuverlässige quantitative Messung.', 'Assess brightness and sound penetration together. B-mode echogenicity alone is not a reliable quantitative measurement.', 'روشنایی و نفوذ صوت را با هم ارزیابی کنید. اکوژنیسیته B-mode به‌تنهایی اندازه‌گیری کمّی قابل اعتمادی نیست.'),
    diagram: L('Leber diffus heller als Nierenkortex · tiefe Schallpenetration mitbeurteilen', 'Liver diffusely brighter than renal cortex · also assess deep sound penetration', 'کبد به‌طور منتشر روشن‌تر از قشر کلیه · نفوذ صوت به عمق را هم ارزیابی کنید'),
  },
  {
    id: 'hepatische-steatose-02-mri', topicId: 'hepatische-steatose',
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Was bedeutet ein Signalabfall in der Opposed-Phase gegenüber der In-Phase?', 'What does signal drop on opposed-phase compared with in-phase imaging suggest?', 'افت سیگنال در فاز ناهم‌فاز نسبت به هم‌فاز چه مفهومی دارد؟'),
    answer: L('Er stützt das Vorliegen mikroskopischen intrazellulären Fetts. Für die Quantifizierung ist MRT-PDFF besonders genau, aber nicht automatisch die Erstlinienuntersuchung.', 'It supports microscopic intracellular fat. MRI-PDFF is particularly accurate for quantification, but is not automatically the first-line examination.', 'این یافته از وجود چربی میکروسکوپی داخل‌سلولی حمایت می‌کند. MRI-PDFF برای کمّی‌سازی دقت بالایی دارد، اما الزاماً آزمون خط اول نیست.'),
    explanation: L('Die qualitative Chemical-Shift-Sequenz und die quantitative MRT-PDFF beantworten verwandte, aber unterschiedliche Fragen. Kosten und Verfügbarkeit begrenzen den routinemäßigen Ersteinsatz der MRT-PDFF.', 'Qualitative chemical-shift imaging and quantitative MRI-PDFF answer related but different questions. Cost and availability limit MRI-PDFF as a routine first-line test.', 'تصویربرداری کیفی chemical-shift و MRI-PDFF کمّی به پرسش‌های مرتبط اما متفاوتی پاسخ می‌دهند. هزینه و دسترسی، استفاده روتین از MRI-PDFF به‌عنوان آزمون خط اول را محدود می‌کنند.'),
    diagram: L('Opposed-Phase: Signalabfall stützt mikroskopisches Fett · PDFF: Quantifizierung', 'Opposed-phase: signal drop supports microscopic fat · PDFF: quantification', 'فاز ناهم‌فاز: افت سیگنال به نفع چربی میکروسکوپی · PDFF: کمّی‌سازی'),
  },
  {
    id: 'hepatische-steatose-03-ct', topicId: 'hepatische-steatose',
    category: L('CT nativ', 'Unenhanced CT', 'CT بدون تزریق'),
    front: L('Welche CT-Einordnung ist bei verminderter Leberattenuation sinnvoll?', 'How should reduced liver attenuation on CT be interpreted?', 'کاهش دانسیته کبد در CT را چگونه باید تفسیر کرد؟'),
    answer: L('Die Leberattenuation relativ zur Milz und zum übrigen Untersuchungsmuster beurteilen; einzelne HU-Grenzen aus der PDF sind hier keine freigegebenen Diagnosekriterien.', 'Assess liver attenuation relative to the spleen and the overall examination; individual HU cut-offs from the PDF are not treated here as validated diagnostic criteria.', 'دانسیته کبد را نسبت به طحال و الگوی کلی بررسی بسنجید؛ حدود HU ذکرشده در PDF در اینجا معیار تشخیصی اعتبارسنجی‌شده محسوب نمی‌شوند.'),
    explanation: L('CT ohne Kontrastmittel ist wichtig, wenn Dichte verglichen wird. Kontrastmittelphase, Scanner und klinischer Kontext beeinflussen die Beurteilung; deshalb keine isolierte Zahl aus der Zusammenfassung verallgemeinern.', 'Unenhanced CT matters when comparing attenuation. Contrast phase, scanner and clinical context affect interpretation; do not generalise an isolated number from the summary.', 'برای مقایسه دانسیته، CT بدون ماده حاجب اهمیت دارد. فاز تزریق، دستگاه و زمینه بالینی بر تفسیر اثر می‌گذارند؛ بنابراین یک عدد منفرد از خلاصه را تعمیم ندهید.'),
    diagram: L('CT nativ: relative Leberattenuation · PDF-HU-Beispiele nicht als Cut-off verwenden', 'Unenhanced CT: relative liver attenuation · do not use PDF HU examples as cut-offs', 'CT بدون تزریق: دانسیته نسبی کبد · حدود HU در PDF را cut-off تلقی نکنید'),
  },
  {
    id: 'hepatische-steatose-04-focal-sparing', topicId: 'hepatische-steatose',
    category: L('Fokales Areal', 'Focal area', 'ناحیه موضعی'),
    front: L('Welche Befundkombination unterstützt fokale Steatose oder fokale Aussparung, ohne eine Raumforderung sicher auszuschließen?', 'Which combination supports focal steatosis or sparing without definitively excluding a mass?', 'کدام ترکیب یافته‌ها از استئاتوز یا ناحیه حفظ‌شده موضعی حمایت می‌کند، بی‌آنکه توده را با قطعیت رد کند؟'),
    answer: L('Typische Lage, keine Verdrängung und durch das Areal verlaufende Gefäße; bei Unsicherheit weiter charakterisieren, zum Beispiel mit Chemical-Shift-MRT.', 'Typical location, no displacement and vessels traversing the area; if uncertain, further characterise it, for example with chemical-shift MRI.', 'محل تیپیک، نبود جابه‌جایی و عبور عروق از ناحیه؛ در صورت عدم قطعیت، برای نمونه با MRI chemical-shift بررسی تکمیلی کنید.'),
    explanation: L('Lage und Gefäßverlauf sind unterstützende Hinweise, keine Beweise. Ein fokales Areal muss im Gesamtbefund beurteilt werden.', 'Location and vessel course are supportive clues, not proof. A focal area must be assessed in the context of the whole examination.', 'محل و مسیر عروق سرنخ‌های کمکی هستند، نه اثبات تشخیص. ناحیه موضعی باید در زمینه کل بررسی ارزیابی شود.'),
    diagram: L('Typische Lage + kein Masseneffekt + Gefäße ohne Verdrängung → Fettverteilungsvariante erwägen; bei Zweifel weiter abklären', 'Typical location + no mass effect + vessels without displacement → consider a fat-distribution variant; investigate further if uncertain', 'محل تیپیک + نبود اثر فشاری + عبور عروق بدون جابه‌جایی ← واریانت توزیع چربی را در نظر بگیرید؛ در صورت تردید بررسی تکمیلی کنید'),
  },
]
