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
]
