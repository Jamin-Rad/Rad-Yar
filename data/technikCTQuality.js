const L = (de, en, fa) => ({ de, en, fa })

export const CT_QUALITY_TOPIC = {
  id: 'ct-bildqualitaet-artefakte',
  title: L('CT-Bildqualität und Artefakte', 'CT image quality and artefacts', 'کیفیت تصویر و آرتیفکت‌های CT'),
}

export const CT_QUALITY_BLOCK = {
  id: 'ct-image-quality',
  title: L('Was bedeutet Bildqualität für die konkrete Aufgabe?', 'What does image quality mean for the task?', 'کیفیت تصویر برای پرسش مشخص چه معنایی دارد؟'),
  lead: L(
    'Bildqualität hat mehrere, gegeneinander abzuwägende Aspekte: Kontrast, räumliche Auflösung und Rauschen. Entscheidend ist, ob das Bild die konkrete Frage beantwortet; ein einzelner Wert beschreibt die diagnostische Leistung nicht vollständig.',
    'Image quality has several aspects that must be balanced: contrast, spatial resolution and noise. The question is whether the image answers the specific task; no single value fully describes diagnostic performance.',
    'کیفیت تصویر چند جنبه دارد که باید با هم سنجیده شوند: کنتراست، تفکیک مکانی و نویز. معیار اصلی پاسخ‌دادن تصویر به پرسش مشخص است؛ هیچ عددی به‌تنهایی عملکرد تشخیصی را کامل توصیف نمی‌کند.'
  ),
  rows: [
    [L('Kontrast', 'Contrast', 'کنتراست'), L('Unterschiede der Abschwächung helfen, Gewebe oder Läsionen abzugrenzen. Niedrigere Röhrenspannung kann den Iodkontrast erhöhen, häufig bei zugleich mehr Rauschen. Dosis und Bildwirkung hängen unter anderem von Patientengröße, automatischer Stromregelung, Rekonstruktion und Aufgabe ab.', 'Differences in attenuation help distinguish tissues or lesions. Lower tube voltage can increase iodine contrast, often with more noise. Dose and image effect also depend on patient size, automatic current modulation, reconstruction and task.', 'تفاوت تضعیف به تفکیک بافت یا ضایعه کمک می‌کند. ولتاژ پایین‌تر تیوب می‌تواند کنتراست ید را افزایش دهد و اغلب نویز را هم بیشتر می‌کند. دوز و اثر تصویری همچنین به اندازهٔ بیمار، کنترل خودکار جریان، بازسازی و پرسش وابسته‌اند.')],
    [L('Räumliche Auflösung', 'Spatial resolution', 'تفکیک مکانی'), L('Zeigt, ob kleine benachbarte Strukturen getrennt erkennbar sind. Brennfleck, Abtastung/Pixelgröße und Rekonstruktionskernel tragen dazu bei; ein schärferer Kernel kann mehr Rauschen zeigen.', 'Describes whether small neighbouring structures can be distinguished. Focal spot, sampling/pixel size and reconstruction kernel contribute; a sharper kernel can show more noise.', 'نشان می‌دهد ساختارهای کوچک و نزدیک تا چه حد جدا دیده می‌شوند. اندازهٔ کانون، نمونه‌برداری/اندازهٔ پیکسل و کرنل بازسازی نقش دارند؛ کرنل تیزتر ممکن است نویز بیشتری نشان دهد.')],
    [L('Rauschen und Darstellung', 'Noise and display', 'نویز و نمایش'), L('Rauschen kann subtile Kontrastunterschiede verdecken. Mehr Photonen senken es meist, erhöhen bei sonst gleichen Bedingungen aber die Dosis; automatische Regelung und Rekonstruktion verändern den Zusammenhang. Fensterung verändert die Anzeige, nicht die bereits erfassten Daten.', 'Noise can obscure subtle contrast differences. More photons usually reduce it but, with other conditions fixed, increase dose; automatic control and reconstruction change the relationship. Windowing changes display, not the data already acquired.', 'نویز می‌تواند اختلاف‌های ظریف کنتراست را بپوشاند. فوتون بیشتر معمولاً نویز را کم می‌کند، اما با ثابت‌بودن سایر شرایط دوز را بالا می‌برد؛ کنترل خودکار و بازسازی این رابطه را تغییر می‌دهند. windowing نمایش را عوض می‌کند، نه دادهٔ ثبت‌شده را.')],
    [L('Schichtdicke und Matrix', 'Slice thickness and matrix', 'ضخامت برش و ماتریس'), L('Eine dickere rekonstruierte Schicht mittelt mehr Signal und kann das Rauschen senken, verwischt aber Details entlang der z-Achse. Matrixgröße oder Pixelzahl allein beweisen keine höhere Systemauflösung; Geometrie, Abtastung und Rekonstruktion zählen mit.', 'A thicker reconstructed slice averages more signal and can reduce noise, but blurs detail along the z-axis. Matrix size or pixel count alone does not establish higher system resolution; geometry, sampling and reconstruction also matter.', 'برش بازسازی‌شدهٔ ضخیم‌تر سیگنال بیشتری را میانگین می‌گیرد و ممکن است نویز را کم کند، اما جزئیات محور z را محو می‌کند. اندازهٔ ماتریس یا شمار پیکسل به‌تنهایی تفکیک‌پذیری سامانه را ثابت نمی‌کند؛ هندسه، نمونه‌برداری و بازسازی نیز مؤثرند.')],
    [L('Pitch', 'Pitch', 'Pitch'), L('Pitch beeinflusst z-Abtastung und Scanzeit. Eine Änderung bedeutet nicht automatisch eine bestimmte Dosis- oder Rauschänderung: Röhrenstromkompensation und Systemumsetzung sind mitzuberücksichtigen. Zur Definition siehe den Abschnitt „CT-Geometrie: Kollimation, Pitch und Randexposition“.', 'Pitch affects z-sampling and scan time. A change does not imply a fixed dose or noise change: tube-current compensation and system implementation also matter. See “CT geometry: collimation, pitch and end exposure” for its definition.', 'Pitch بر نمونه‌برداری محور z و زمان اسکن اثر دارد. تغییر آن به‌تنهایی جهت یا اندازهٔ مشخصی برای تغییر دوز و نویز تعیین نمی‌کند؛ جبران جریان تیوب و پیاده‌سازی دستگاه نیز مؤثرند. تعریف آن در بخش «هندسهٔ CT: کولیمیشن، pitch و تابش اضافه در لبه‌ها» آمده است.')],
  ],
  references: [
    { href: 'https://aapm.org/pubs/reports/detail.asp?docid=186', label: L('AAPM Task Group 233, Performance Evaluation of Computed Tomography Systems (2019)', 'AAPM Task Group 233, Performance Evaluation of Computed Tomography Systems (2019)', 'گزارش گروه کاری ۲۳۳ انجمن فیزیک پزشکی آمریکا، ارزیابی عملکرد سامانه‌های CT (۲۰۱۹)') },
    { href: 'https://pubmed.ncbi.nlm.nih.gov/24158924/', label: L('ICRU Report 87, Radiation Dose and Image-Quality Assessment in CT (2012)', 'ICRU Report 87, Radiation Dose and Image-Quality Assessment in CT (2012)', 'گزارش ۸۷ کمیسیون واحدها و اندازه‌گیری پرتو، ارزیابی دوز و کیفیت تصویر در CT (۲۰۱۲)') },
  ],
  crossReference: {
    href: '#ct-dose-geometry',
    label: L('Zum Pitch-Begriff: CT-Geometrie, Kollimation und Randexposition', 'For the pitch definition: CT geometry, collimation and end exposure', 'برای تعریف Pitch: هندسهٔ CT، کولیمیشن و تابش اضافه در لبه‌ها'),
  },
}

export const CT_ARTIFACTS_BLOCK = {
  id: 'ct-artifact-patterns',
  title: L('Welche Ursache passt zum Artefaktbild?', 'Which cause fits the artefact pattern?', 'کدام علت با الگوی آرتیفکت سازگار است؟'),
  lead: L('Ein Artefakt kann Details verdecken oder vortäuschen. Muster erkennen, mit anderen Ebenen und Roh-/Zusatzrekonstruktionen abgleichen, sofern verfügbar; Korrekturen können selbst Nebenwirkungen haben.', 'An artefact can hide or mimic detail. Recognise the pattern and compare with other planes and additional reconstructions when available; corrections can have their own side effects.', 'آرتیفکت ممکن است جزئیات را پنهان یا شبیه‌سازی کند. الگو را بشناسید و در صورت دسترسی با صفحات دیگر و بازسازی‌های تکمیلی تطبیق دهید؛ روش‌های اصلاح می‌توانند عوارض خود را داشته باشند.'),
  rows: [
    [L('Bewegung', 'Motion', 'حرکت'), L('Ursache: Bewegung während der Aufnahme. Erscheinung: Unschärfe, Doppelkonturen oder Streifen. Einordnung: mit Anatomie und weiteren Ebenen abgleichen; keine feinen Details aus dem betroffenen Bereich ableiten.', 'Cause: movement during acquisition. Appearance: blur, doubled edges or streaks. Check against anatomy and other planes; avoid relying on fine detail in the affected area.', 'علت: حرکت هنگام تصویربرداری. ظاهر: تاری، لبهٔ دوتایی یا رگه. با آناتومی و صفحات دیگر تطبیق دهید و از جزئیات ظریف ناحیهٔ درگیر نتیجه‌گیری نکنید.')],
    [L('Metall', 'Metal', 'فلز'), L('Ursache: mehrere Effekte, darunter Strahlaufhärtung und Photonenmangel. Erscheinung: helle/dunkle Streifen und lokale Verzerrung. Einordnung: Ausmaß in Standard- und ggf. Metallartefakt-reduzierter Rekonstruktion vergleichen; Korrekturen sind nicht fehlerfrei.', 'Cause: multiple effects, including beam hardening and photon starvation. Appearance: bright/dark streaks and local distortion. Compare standard and, if available, metal-reduced reconstructions; corrections are imperfect.', 'علت: چند سازوکار از جمله سخت‌شدن پرتو و کمبود فوتون. ظاهر: رگه‌های روشن/تیره و اعوجاج موضعی. بازسازی استاندارد و در صورت دسترسی نسخهٔ کاهش آرتیفکت فلز را مقایسه کنید؛ اصلاح بی‌خطا نیست.')],
    [L('Ring', 'Ring', 'حلقه‌ای'), L('Ursache: Detektorelement oder Kalibrierung. Erscheinung: konzentrische Ringe im Bild. Einordnung: technisches Qualitäts-/Serviceproblem, nicht durch anatomische Variation erklären.', 'Cause: detector element or calibration issue. Appearance: concentric rings. Treat as a technical quality/service issue, not an anatomic variant.', 'علت: مشکل عنصر آشکارساز یا کالیبراسیون. ظاهر: حلقه‌های هم‌مرکز. آن را مسئلهٔ فنیِ کنترل کیفیت/سرویس بدانید، نه تنوع آناتومیک.')],
    [L('Stufenartefakt in MPR', 'Stair-step in MPR', 'پله‌ای‌شدن در بازسازی چندصفحه‌ای'), L('Ursache: grobe z-Abtastung bzw. unzureichende Quellauflösung. Erscheinung: stufige Kanten in Reformationen. Einordnung: Quellakquisition und Rekonstruktionsebene prüfen; vorhandene feinere Volumendaten nutzen, falls vorhanden.', 'Cause: coarse z-sampling or insufficient source resolution. Appearance: stepped edges on reformats. Check source acquisition and reconstruction plane; use finer existing volume data if available.', 'علت: نمونه‌برداری درشت محور z یا وضوح ناکافی دادهٔ منبع. ظاهر: لبه‌های پله‌ای در بازسازی‌ها. دادهٔ حجمی و صفحهٔ بازسازی را بررسی کنید و اگر حجم دقیق‌تری موجود است از آن بهره ببرید.')],
    [L('Strahlaufhärtung', 'Beam hardening', 'سخت‌شدن پرتو'), L('Ursache: niederenergetische Photonen werden an dichtem Material stärker abgeschwächt. Erscheinung: dunkle Bänder/Streifen oder Inhomogenität zwischen dichten Strukturen. Einordnung: Kontext mit Knochen, konzentriertem Kontrastmittel oder Metall prüfen; Korrekturverfahren können reduzieren, aber nicht immer beseitigen.', 'Cause: lower-energy photons are attenuated more by dense material. Appearance: dark bands/streaks or inhomogeneity between dense structures. Check context such as bone, concentrated contrast or metal; correction methods may reduce but do not always remove it.', 'علت: فوتون‌های کم‌انرژی در مادهٔ متراکم بیشتر تضعیف می‌شوند. ظاهر: نوار/رگهٔ تیره یا ناهمگنی میان ساختارهای متراکم. زمینهٔ استخوان، مادهٔ حاجب غلیظ یا فلز را بررسی کنید؛ روش اصلاح ممکن است آن را کم کند اما همیشه حذف نمی‌کند.')],
    [L('Partialvolumen', 'Partial volume', 'حجم جزئی'), L('Ursache: ein Voxel enthält mehrere Materialien; ihre Abschwächung wird gemittelt. Erscheinung: kleine Strukturen oder scharfe Grenzen wirken abgeschwächt/unscharf. Eine dünnere Rekonstruktion kann z-Mittelung verringern, erhöht aber meist das Rauschen; Details können unterhalb der Systemauflösung bleiben.', 'Cause: a voxel contains multiple materials whose attenuation is averaged. Appearance: small structures or sharp boundaries look diluted/blurred. A thinner reconstruction can reduce z-averaging but usually increases noise; details may remain below system resolution.', 'علت: یک وکسل چند ماده را دربر می‌گیرد و تضعیف آن‌ها میانگین می‌شود. ظاهر: ساختار کوچک یا مرز تیز کم‌رنگ/محو دیده می‌شود. بازسازی نازک‌تر می‌تواند میانگین‌گیری محور z را کم کند اما معمولاً نویز را بالا می‌برد؛ جزئیات ممکن است از وضوح سامانه کوچک‌تر باشند.')],
  ],
  visual: {
    src: '/technik/grundlagen/ct-partial-volume.svg',
    alt: L('Konzeptskizze: ein Voxel an einer Materialgrenze mittelt zwei Abschwächungswerte; ein kleineres Voxel umfasst weniger Mischgewebe. Keine Patientendaten.', 'Concept sketch: a voxel at a material boundary averages two attenuation values; a smaller voxel contains less mixed tissue. No patient data.', 'طرح مفهومی: وکسل در مرز مواد دو مقدار تضعیف را میانگین می‌گیرد؛ وکسل کوچک‌تر بافت مختلط کمتری دارد. دادهٔ بیمار نیست.'),
    caption: L('Links: größeres Voxel, das beide Materialien umfasst; rechts: kleineres Voxel mit geringerem Mischanteil. Die magenta Umrandung kennzeichnet jeweils das betrachtete Voxel. Konzeptskizze, keine Messwerte.', 'Left: a larger voxel spanning both materials; right: a smaller voxel with less mixing. The magenta outline marks the voxel being considered. Concept sketch, not measured data.', 'چپ: وکسل بزرگ‌تر که هر دو ماده را دربر می‌گیرد؛ راست: وکسل کوچک‌تر با اختلاط کمتر. کادر ارغوانی وکسل مورد بررسی را مشخص می‌کند. طرح مفهومی است و دادهٔ اندازه‌گیری‌شده نیست.'),
  },
  references: [
    { href: 'https://doi.org/10.1148/rg.2016160079', label: L('Artifacts at Cardiac CT: Physics and Solutions, RadioGraphics (2017)', 'Artifacts at Cardiac CT: Physics and Solutions, RadioGraphics (2017)', 'آرتیفکت‌ها در CT قلب: فیزیک و راهکارها، RadioGraphics (۲۰۱۷)') },
    { href: 'https://doi.org/10.1148/rg.2018170102', label: L('Current and Novel Techniques for Metal Artifact Reduction at CT, RadioGraphics (2018)', 'Current and Novel Techniques for Metal Artifact Reduction at CT, RadioGraphics (2018)', 'روش‌های کنونی و نوین کاهش آرتیفکت فلز در CT، RadioGraphics (۲۰۱۸)') },
  ],
}

export const CT_QUALITY_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `ct-quality-${lang}-partial-volume`, fach: 'technik', tags: [CT_QUALITY_TOPIC.id],
  question: L('Eine kleine Struktur liegt an einer Grenze zwischen zwei Geweben und wirkt im CT abgeschwächt. Welche Erklärung passt am besten?', 'A small structure lies at a boundary between two tissues and appears diluted on CT. Which explanation fits best?', 'ساختاری کوچک در مرز دو بافت در CT کم‌رنگ دیده می‌شود. کدام توضیح مناسب‌تر است؟')[lang],
  options: [
    { id: 'A', text: L('Partialvolumen: ein Voxel mittelt unterschiedliche Materialien.', 'Partial volume: one voxel averages different materials.', 'حجم جزئی: یک وکسل مواد متفاوت را میانگین می‌گیرد.')[lang] },
    { id: 'B', text: L('Ringartefakt durch ein fehlerhaftes Detektorelement oder eine Kalibrierung.', 'Ring artefact from a faulty detector element or calibration.', 'آرتیفکت حلقه‌ای ناشی از عنصر معیوب آشکارساز یا کالیبراسیون.')[lang] },
    { id: 'C', text: L('Fensterung hat die erfassten Rohdaten verändert.', 'Windowing changed the acquired raw data.', 'windowing دادهٔ خام ثبت‌شده را تغییر داده است.')[lang] },
    { id: 'D', text: L('Stair-step entsteht in allen axialen Quellbildern.', 'Stair-step appears in every axial source image.', 'پله‌ای‌شدن در همهٔ تصاویر محوری منبع رخ می‌دهد.')[lang] },
  ],
  correct: 'A',
  explanation: L('Richtig. Ein Voxel kann mehrere Materialien enthalten; ihre Abschwächung wird gemittelt und kann kleine Grenzstrukturen abschwächen.', 'Correct. One voxel can contain multiple materials; their attenuation is averaged and can dilute a small boundary structure.', 'درست است. یک وکسل می‌تواند چند ماده را دربرگیرد؛ تضعیف آن‌ها میانگین می‌شود و ممکن است ساختار کوچک مرزی را کم‌رنگ کند.')[lang],
  wrongExplanations: {
    B: L('Ein Ringartefakt zeigt konzentrische Ringe und passt nicht zur abgeschwächten Grenzstruktur.', 'A ring artefact forms concentric rings and does not explain a diluted boundary structure.', 'آرتیفکت حلقه‌ای به صورت حلقه‌های هم‌مرکز دیده می‌شود و ساختار کم‌رنگ در مرز را توضیح نمی‌دهد.')[lang],
    C: L('Fensterung verändert die Darstellung, nicht rückwirkend die Akquisitionsdaten.', 'Windowing changes display, not the acquisition data retrospectively.', 'windowing نمایش را عوض می‌کند و دادهٔ تصویربرداری را به‌طور بازگشتی تغییر نمی‌دهد.')[lang],
    D: L('Stair-step betrifft typischerweise multiplanare Reformationen aus grober z-Abtastung.', 'Stair-step typically affects multiplanar reformats from coarse z-sampling.', 'پله‌ای‌شدن معمولاً بازسازی چندصفحه‌ای از نمونه‌برداری درشت محور z را درگیر می‌کند.')[lang],
  },
}))

export const CT_QUALITY_TOPIC_GROUP = {
  fachId: 'technik', kapitelId: 'technik-ct',
  title: L('CT-Technik', 'CT technique', 'تکنیک CT'),
  topics: [CT_QUALITY_TOPIC],
}

export const CT_QUALITY_FLASHCARD_TOPIC = {
  id: CT_QUALITY_TOPIC.id, area: 'Technik', chapter: 'CT', icon: 'CT', color: '#3c8796',
  href: `/flashcards/${CT_QUALITY_TOPIC.id}`,
  title: CT_QUALITY_TOPIC.title,
  subtitle: L('Auflösung · Rauschen · Artefakte', 'Resolution · noise · artefacts', 'تفکیک‌پذیری · نویز · آرتیفکت‌ها'),
}

export const CT_QUALITY_FLASHCARDS = [
  {
    id: 'ct-quality-tradeoffs', topicId: CT_QUALITY_TOPIC.id, category: L('Bildqualität', 'Image quality', 'کیفیت تصویر'),
    front: L('Was ist bei Schichtdicke und Bildrauschen gegeneinander abzuwägen?', 'What trade-off links slice thickness and image noise?', 'در ضخامت برش و نویز تصویر چه بده‌بستانی وجود دارد؟'),
    answer: L('Eine dickere rekonstruierte Schicht mittelt mehr Signal und kann das Rauschen senken, verwischt aber Details entlang der z-Achse. Die diagnostische Eignung hängt von der konkreten Aufgabe ab.', 'A thicker reconstructed slice averages more signal and can reduce noise, but blurs detail along the z-axis. Diagnostic suitability depends on the task.', 'برش بازسازی‌شدهٔ ضخیم‌تر سیگنال بیشتری را میانگین می‌گیرد و ممکن است نویز را کم کند، اما جزئیات محور z را محو می‌کند. مناسب‌بودن تشخیصی به پرسش بستگی دارد.'),
    source: 'Technik.pdf pp. 54–55; AAPM TG 233',
  },
  {
    id: 'ct-quality-partial-volume', topicId: CT_QUALITY_TOPIC.id, category: L('Artefaktmuster', 'Artefact pattern', 'الگوی آرتیفکت'),
    front: L('Warum kann eine kleine Struktur an einer Gewebegrenze im CT abgeschwächt wirken?', 'Why can a small structure at a tissue boundary appear diluted on CT?', 'چرا ساختار کوچک در مرز بافت‌ها ممکن است در CT کم‌رنگ دیده شود؟'),
    answer: L('Ein Voxel, das mehrere Materialien enthält, mittelt deren Abschwächungswerte. Dünnere z-Rekonstruktionen können Partialvolumen reduzieren, meist auf Kosten von mehr Rauschen.', 'A voxel containing multiple materials averages their attenuation values. Thinner z reconstructions can reduce partial volume, usually with more noise.', 'وکسلِ دربرگیرندهٔ چند ماده، مقدار تضعیف آن‌ها را میانگین می‌گیرد. بازسازی نازک‌تر محور z می‌تواند حجم جزئی را کاهش دهد و معمولاً نویز بیشتری دارد.'),
    source: 'Technik.pdf p. 55; AAPM TG 233',
  },
]
