export const TECHNIK_ROENTGEN_FLASHCARD_TOPIC = {
  id: 'roentgenanlage-roehre', area: 'Technik', chapter: 'Röntgen', icon: '🩻', iconImage: '/fach/technik.png', color: '#0e7490', href: '/flashcards/roentgenanlage-roehre',
  title: { de: 'Röntgenanlage & Bildentstehung', en: 'X-ray system & image formation', fa: 'دستگاه پرتو ایکس و تشکیل تصویر' },
  subtitle: { de: 'Röhre · Heel-Effekt · Wechselwirkung · Detektoren', en: 'Tube · heel effect · interactions · detectors', fa: 'تیوب · اثر پاشنه‌ای · برهم‌کنش · آشکارساز' },
}

export const TECHNIK_ROENTGEN_FLASHCARDS = [
  {
    id: 'roentgenanlage-roehre-01-fokus', topicId: 'roentgenanlage-roehre', category: 'Technik',
    front: { de: 'Was unterscheidet den effektiven Fokus von der thermisch belasteten Brennfleckfläche?', en: 'How does the effective focal spot differ from the heat-loaded focal area?', fa: 'کانون مؤثر چه تفاوتی با سطح گرماگیر کانون دارد؟' },
    answer: { de: 'Die geneigte Anode lässt den Fokus aus Sicht des Detektors verkürzt erscheinen. Ein kleinerer effektiver Fokus kann geometrische Schärfe verbessern; Belastbarkeit und Feldgröße begrenzen die Wahl.', en: 'The angled anode makes the focal area appear foreshortened from the detector. A smaller effective focus can improve geometric sharpness; tube loading and field size constrain the choice.', fa: 'آند مایل سطح کانون را از دید آشکارساز کوتاه‌تر نشان می‌دهد. کانون مؤثر کوچک‌تر می‌تواند وضوح هندسی را بهتر کند؛ بار گرمایی تیوب و اندازهٔ میدان انتخاب را محدود می‌کنند.' },
    explanation: { de: 'Das Line-Focus-Prinzip verbindet eine kleine optische Projektion mit einer größeren Wärmefläche. Es ersetzt nicht die Prüfung der Röhrenlastkurve.', en: 'The line-focus principle combines a small projected spot with a larger heat-loaded area. It does not replace checking the tube rating chart.', fa: 'اصل کانون خطی، تصویر اپتیکی کوچک را با سطح گرماگیر بزرگ‌تر ترکیب می‌کند. این اصل جای بررسی نمودار بار تیوب را نمی‌گیرد.' },
    diagram: { de: 'Geneigte Anode: effektiver Fokus kleiner als die thermisch belastete Fläche.', en: 'Angled anode: effective focal spot is smaller than the heat-loaded area.', fa: 'در آند مایل، کانون مؤثر از سطح گرماگیر کوچک‌تر است.' },
  },
  {
    id: 'roentgenanlage-roehre-02-heel', topicId: 'roentgenanlage-roehre', category: 'Technik',
    front: { de: 'In welche Richtung nimmt die Intensität beim Anoden-Heel-Effekt ab?', en: 'In which direction does beam intensity decrease with the anode heel effect?', fa: 'شدت پرتو در اثر پاشنه‌ای آند به کدام سمت کاهش می‌یابد؟' },
    answer: { de: 'Von der Kathodenseite zur Anodenseite. Wenn die Projektion es zulässt, kann der dickere Anatomieabschnitt zur Kathodenseite positioniert werden.', en: 'From the cathode side toward the anode side. When projection geometry permits, the thicker anatomy may be positioned toward the cathode.', fa: 'از سمت کاتد به‌سوی آند. اگر هندسهٔ نما اجازه دهد، بخش ضخیم‌تر آناتومی را می‌توان به سمت کاتد قرار داد.' },
    explanation: { de: 'Strahlung zur Anodenseite wird im Anodenmaterial stärker selbstabsorbiert. Ausprägung und klinischer Nutzen hängen unter anderem von Feldgröße und Anodenwinkel ab.', en: 'Photons toward the anode side are more strongly self-absorbed in the anode. Magnitude and practical benefit depend in part on field size and anode angle.', fa: 'فوتون‌های سمت آند در مادهٔ آند بیشتر خودجذب می‌شوند. شدت اثر و فایدهٔ عملی آن از جمله به اندازهٔ میدان و زاویهٔ آند وابسته است.' },
    diagram: { de: 'Kathodenseite: höhere Intensität; Anodenseite: niedrigere Intensität.', en: 'Cathode side: higher intensity; anode side: lower intensity.', fa: 'در سمت کاتد شدت بیشتر است؛ در سمت آند شدت کمتر است.' },
  },
  {
    id: 'roentgenanlage-roehre-03-filter', topicId: 'roentgenanlage-roehre', category: 'Technik',
    front: { de: 'Was bewirkt die zusätzliche Filterung des Röntgenstrahls?', en: 'What does additional X-ray beam filtration do?', fa: 'فیلتر اضافی پرتو ایکس چه اثری دارد؟' },
    answer: { de: 'Sie entfernt bevorzugt niederenergetische Photonen, erhöht damit die mittlere Strahlenenergie und reduziert die Nutzstrahlintensität.', en: 'It preferentially removes low-energy photons, thereby increasing mean beam energy and reducing useful-beam intensity.', fa: 'فوتون‌های کم‌انرژی را بیشتر حذف می‌کند؛ در نتیجه میانگین انرژی پرتو بالا می‌رود و شدت پرتو مفید کاهش می‌یابد.' },
    explanation: { de: 'Erforderliche Exposition hängt anschließend von Fragestellung, Patient, Gerät und Protokoll ab; der Filter garantiert keine identische Bildqualität bei jeder Einstellung.', en: 'Required exposure then depends on the task, patient, equipment and protocol; filtration does not guarantee identical image quality at every setting.', fa: 'پس از آن تابش لازم به پرسش، بیمار، دستگاه و پروتکل وابسته است؛ فیلتر در هر تنظیمی کیفیت تصویر یکسان را تضمین نمی‌کند.' },
    diagram: { de: 'Niederenergetische Photonen werden bevorzugt absorbiert; das Spektrum wird härter.', en: 'Low-energy photons are preferentially absorbed; the beam becomes harder.', fa: 'فوتون‌های کم‌انرژی بیشتر جذب می‌شوند و پرتو سخت‌تر می‌شود.' },
  },
  {
    id: 'roentgenanlage-roehre-04-detektoren', topicId: 'roentgenanlage-roehre', category: 'Technik',
    front: { de: 'Wie unterscheiden sich CR, indirekte DR und direkte DR in der Signalkette?', en: 'How do CR, indirect DR and direct DR differ in their signal chains?', fa: 'زنجیرهٔ سیگنال CR، DR غیرمستقیم و DR مستقیم چه تفاوتی دارد؟' },
    answer: { de: 'CR nutzt eine Speicherphosphorplatte mit separatem Laserleser. Indirekte DR wandelt Röntgen zunächst in Licht und dann in Ladung um; direkte DR wandelt Röntgen im Photoleiter unmittelbar in Ladung um.', en: 'CR uses a storage-phosphor plate and separate laser reader. Indirect DR converts X-rays to light and then charge; direct DR converts X-rays to charge in a photoconductor.', fa: 'CR از صفحهٔ فسفری ذخیره‌ساز و خوانشگر لیزری جداگانه استفاده می‌کند. DR غیرمستقیم ابتدا پرتو ایکس را به نور و سپس به بار تبدیل می‌کند؛ DR مستقیم پرتو را در فوتورسانا مستقیماً به بار تبدیل می‌کند.' },
    explanation: { de: 'Die Konversionskette beschreibt das Prinzip, beweist aber keine generell bessere Bildqualität oder geringere Patientendosis.', en: 'The conversion chain describes the principle but does not establish universally better image quality or lower patient dose.', fa: 'زنجیرهٔ تبدیل، اصل کار را بیان می‌کند اما به‌تنهایی کیفیت بهتر همگانی یا دوز کمتر بیمار را ثابت نمی‌کند.' },
    diagram: { de: 'CR: Speicherplatte, dann Laserleser. Indirekt: Röntgen, Licht, Ladung. Direkt: Röntgen, unmittelbar Ladung.', en: 'CR: storage plate, then laser reader. Indirect: X-ray, light, charge. Direct: X-ray, then charge.', fa: 'CR: صفحهٔ ذخیره‌ساز و سپس خوانش لیزری. DR غیرمستقیم: پرتو ایکس، نور، بار. DR مستقیم: پرتو ایکس و سپس بار.' },
  },
  {
    id: 'roentgenanlage-roehre-05-photoelectric', topicId: 'roentgenanlage-roehre', category: 'Wechselwirkung',
    front: { de: 'Was geschieht beim Photoeffekt mit dem einfallenden Photon?', en: 'What happens to the incident photon in the photoelectric effect?', fa: 'در اثر فوتوالکتریک چه اتفاقی برای فوتون فرودی می‌افتد؟' },
    answer: { de: 'Es wird vollständig absorbiert und überträgt seine Energie auf ein gebundenes Elektron, das freigesetzt wird.', en: 'It is fully absorbed and transfers its energy to a bound electron, which is ejected.', fa: 'فوتون کاملاً جذب می‌شود و انرژی خود را به الکترون مقیدی می‌دهد که آزاد می‌شود.' },
    explanation: { de: 'Es gibt danach kein gestreutes Primärphoton. Davon unterscheidet sich Compton: Dort wird nur ein Teil der Energie übertragen.', en: 'There is no scattered primary photon afterward. Compton differs: only part of the photon energy is transferred.', fa: 'پس از آن فوتون اولیهٔ پراکنده‌ای باقی نمی‌ماند. در کامپتون فقط بخشی از انرژی فوتون منتقل می‌شود.' },
    source: 'Technik.pdf physical p39 (printed p38); IAEA Diagnostic Radiology Physics, ch. 2',
  },
  {
    id: 'roentgenanlage-roehre-06-compton', topicId: 'roentgenanlage-roehre', category: 'Wechselwirkung',
    front: { de: 'Welche Energiebilanz kennzeichnet die Compton-Streuung?', en: 'Which energy pattern characterizes Compton scatter?', fa: 'کدام الگوی انرژی، پراکندگی کامپتون را مشخص می‌کند؟' },
    answer: { de: 'Ein Teil der Photonenergie geht auf ein Elektron über; das abgelenkte Photon bleibt erhalten, aber mit geringerer Energie.', en: 'Part of the photon energy is transferred to an electron; the deflected photon remains but has lower energy.', fa: 'بخشی از انرژی فوتون به الکترون منتقل می‌شود؛ فوتون منحرف‌شده باقی می‌ماند اما انرژی کمتری دارد.' },
    explanation: { de: 'Das gestreute Photon kann den Detektor erreichen und den Bildkontrast senken. Die Wechselwirkung wird nicht in Photoabsorption umgewandelt.', en: 'The scattered photon may reach the detector and reduce image contrast. The interaction is not converted into photoelectric absorption.', fa: 'فوتون پراکنده ممکن است به آشکارساز برسد و کنتراست تصویر را کاهش دهد. این برهم‌کنش به جذب فوتوالکتریک تبدیل نمی‌شود.' },
    source: 'Technik.pdf physical p40 (printed p39); IAEA Diagnostic Radiology Physics, ch. 2',
  },
  {
    id: 'roentgenanlage-roehre-07-coherent', topicId: 'roentgenanlage-roehre', category: 'Wechselwirkung',
    front: { de: 'Wie unterscheidet sich kohärente Streuung von Compton-Streuung?', en: 'How does coherent scatter differ from Compton scatter?', fa: 'پراکندگی همدوس چه تفاوتی با پراکندگی کامپتون دارد؟' },
    answer: { de: 'Das Photon ändert seine Richtung, ohne wesentliche Energie zu übertragen oder zu ionisieren.', en: 'The photon changes direction without substantial energy transfer or ionization.', fa: 'فوتون جهت خود را بدون انتقال چشمگیر انرژی یا یونش تغییر می‌دهد.' },
    explanation: { de: 'Bei Compton werden Energie und Impuls teilweise auf ein Elektron übertragen. Der quantitative Anteil kohärenter Streuung hängt von der Energie ab.', en: 'In Compton scatter, some energy and momentum are transferred to an electron. The proportion of coherent scatter depends on energy.', fa: 'در پراکندگی کامپتون بخشی از انرژی و تکانه به الکترون منتقل می‌شود. سهم کمّی پراکندگی همدوس به انرژی وابسته است.' },
    source: 'Technik.pdf physical p40 (printed p39); IAEA Diagnostic Radiology Physics, ch. 2',
  },
  {
    id: 'roentgenanlage-roehre-08-mtf-dqe', topicId: 'roentgenanlage-roehre', category: 'Bildgüte',
    front: { de: 'Wofür stehen MTF und DQE bei einem digitalen Detektor?', en: 'What do MTF and DQE describe for a digital detector?', fa: 'MTF و DQE در آشکارساز دیجیتال چه چیزی را توصیف می‌کنند؟' },
    answer: { de: 'MTF beschreibt die Kontrastübertragung über Ortsfrequenzen; DQE beschreibt, wie effizient der Detektor das Eingangs-Signal-Rausch-Verhältnis erhält.', en: 'MTF describes contrast transfer across spatial frequencies; DQE describes how efficiently the detector preserves input signal-to-noise ratio.', fa: 'MTF انتقال کنتراست در فرکانس‌های مکانی را توصیف می‌کند؛ DQE کارایی حفظ نسبت سیگنال به نویز ورودی را بیان می‌کند.' },
    explanation: { de: 'Beide Kennwerte sind frequenzabhängig und müssen unter vergleichbaren Messbedingungen interpretiert werden. Ein guter Kennwert allein beweist weder klinische Überlegenheit noch eine niedrigere Patientendosis.', en: 'Both metrics vary with spatial frequency and must be interpreted under comparable measurement conditions. One favorable metric alone proves neither clinical superiority nor lower patient dose.', fa: 'هر دو شاخص به فرکانس مکانی وابسته‌اند و باید در شرایط اندازه‌گیری قابل‌مقایسه تفسیر شوند. یک شاخص مطلوب به‌تنهایی برتری بالینی یا دوز کمتر بیمار را ثابت نمی‌کند.' },
    source: 'Technik.pdf physical p43 (printed p42); IAEA handbook ch. 4; AAPM TG-150',
  },
]
