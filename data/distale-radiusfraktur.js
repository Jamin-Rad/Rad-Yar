const L = (de, en, fa) => ({ de, en, fa })

export const DISTALE_RADIUS_LESSON = {
  id: 'distale-radiusfraktur',
  title: L('Distale Radiusfraktur', 'Distal Radius Fracture', 'شکستگی دیستال رادیوس'),
  definition: L(
    'Fraktur des distalen Radius mit möglicher Gelenkbeteiligung, Fehlstellung und karpaler oder ligamentärer Begleitverletzung.',
    'Fracture of the distal radius with possible articular involvement, malalignment and associated carpal or ligamentous injury.',
    'شکستگی دیستال رادیوس با احتمال درگیری مفصل، بدراستایی و آسیب همراه کارپ یا رباط.'
  ),
  breadcrumb: L('Distale Radiusfraktur', 'Distal Radius Fracture', 'شکستگی دیستال رادیوس'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),
  heroCards: [
    { value: L('Fernandez I–V', 'Fernandez I–V', 'فرناندز I–V'), label: L('Mechanismus', 'Mechanism', 'مکانیسم'), text: L('Biegung, Scherung, Kompression, Avulsion, Kombination', 'bending, shear, compression, avulsion, combination', 'خمشی، برشی، فشاری، آولسیون، ترکیبی') },
    { value: L("Gelenkfläche", "Articular surface", "سطح مفصل"), label: L("Stufe und Spalt", "Step and gap", "پله و فاصله"), text: L("messen und im Kontext bewerten", "measure and interpret in context", "اندازه‌گیری و تفسیر در زمینه") },
    { value: L('Karpus', 'Carpus', 'کارپ'), label: L('immer mitprüfen', 'always assess', 'همیشه بررسی شود'), text: L('SL-Band, Lunatum, DRUG', 'SL ligament, lunate, DRUJ', 'رباط SL، لونیت، DRUJ') },
  ],
  sections: [
    { id: 'diagnostik', icon: '🩻', label: L('Diagnostik', 'Assessment', 'ارزیابی') },
    { id: 'muster', icon: '🧭', label: L('Klassische Muster', 'Classic Patterns', 'الگوهای کلاسیک') },
    { id: 'fernandez', icon: '📊', label: L('Fernandez I–V', 'Fernandez I–V', 'فرناندز I–V'), emphasis: true },
    { id: 'sonderformen', icon: '🎯', label: L('Sonderformen', 'Special Patterns', 'الگوهای ویژه') },
    { id: 'begleitverletzungen', icon: '⚠️', label: L('Begleitverletzungen', 'Associated Injuries', 'آسیب‌های همراه'), emphasis: true },
    { id: 'befund', icon: '📝', label: L('Befundschema', 'Reporting', 'گزارش‌نویسی') },
    { id: 'therapie', icon: '🛠️', label: L('Therapie', 'Treatment', 'درمان') },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی'), emphasis: true },
  ],
  diagnostik: {
    title: L('Systematische Röntgendiagnostik', 'Systematic Radiographic Assessment', 'ارزیابی سیستماتیک رادیوگرافی'),
    lead: L(
      'Standard sind streng dorsopalmare und seitliche Aufnahmen des Handgelenks. Beurteilt werden Frakturmorphologie, Gelenkfläche, Radiusgeometrie, DRUG und Karpus.',
      'Standard imaging consists of true dorsopalmar and lateral wrist views. Assess fracture morphology, articular surface, radial geometry, DRUJ and carpus.',
      'استاندارد شامل نماهای دورسوپالمار و لترال واقعی مچ است. مورفولوژی شکستگی، سطح مفصل، هندسه رادیوس، DRUJ و کارپ بررسی می‌شوند.'
    ),
    headers: [L('Parameter', 'Parameter', 'پارامتر'), L('Normal / Ziel', 'Normal / target', 'طبیعی / هدف'), L('Pathologische Bedeutung', 'Pathological significance', 'اهمیت پاتولوژیک')],
    rows: [
      [L('Radialinklination', 'Radial inclination', 'شیب رادیال'), L('ca. 22–23°', 'about 22–23°', 'حدود ۲۲–۲۳ درجه'), L('Verminderung zeigt radiale Kollaps- oder Verkürzungskomponente.', 'Reduction indicates radial collapse or shortening.', 'کاهش نشان‌دهنده کلاپس یا کوتاهی رادیال است.')],
      [L('Volarer Tilt', 'Volar tilt', 'تیلت ولار'), L('ca. 10–12° volar', 'about 10–12° volar', 'حدود ۱۰–۱۲ درجه ولار'), L('Dorsaler Tilt typisch bei Colles; übermäßiger volarer Tilt bei Smith/Barton.', 'Dorsal tilt is typical of Colles; excessive volar tilt occurs in Smith/Barton.', 'تیلت دورسال در کولس و تیلت ولار بیش‌ازحد در اسمیت/بارتون دیده می‌شود.')],
      [L("Radiuslänge / Ulnavarianz", "Radial length / ulnar variance", "طول رادیوس / واریانس اولنار"), L("standardisierte PA-Projektion; individuelle Anatomie berücksichtigen", "standardized PA view; consider individual anatomy", "نمای PA استاندارد؛ آناتومی فردی لحاظ شود"), L("Radiusverkürzung kann die Ulnavarianz positiver machen. DRUG-Kongruenz und klinische Stabilität gesondert beurteilen.", "Radial shortening can make ulnar variance more positive. Assess DRUJ congruity and clinical stability separately.", "کوتاهی رادیوس می‌تواند واریانس اولنار را مثبت‌تر کند. تطابق DRUJ و پایداری بالینی را جداگانه ارزیابی کنید.")],
      [L("Gelenkstufe / Spalt", "Articular step / gap", "پله / فاصلهٔ مفصلی"), L("in Millimetern dokumentieren", "document in millimetres", "بر حسب میلی‌متر ثبت شود"), L("Inkongruenz und Repositionsergebnis bewerten. Das >2-mm-Kriterium gilt postreduktionell bei nichtgeriatrischen Patienten; siehe Therapieprinzipien.", "Assess incongruity and reduction result. The >2 mm criterion applies after reduction in nongeriatric patients; see treatment principles.", "ناهمخوانی و نتیجهٔ جااندازی را بسنجید. معیار بیش از ۲ میلی‌متر پس از جااندازی در بیماران غیرسالمند کاربرد دارد؛ اصول درمان را ببینید.")],
      [L('Karpale Ausrichtung', 'Carpal alignment', 'هم‌راستایی کارپ'), L('Radius–Lunatum–Kapitatum kollinear', 'radius–lunate–capitate collinear', 'رادیوس–لونیت–کاپیتیت هم‌خط'), L('Unterbrechung spricht für perilunäre/Lunatumluxation oder Barton-Subluxation.', 'Disruption suggests perilunate/lunate dislocation or Barton subluxation.', 'اختلال به نفع لوکساسیون پری‌لونیت/لونیت یا ساب‌لوکساسیون بارتون است.')],
    ],
    ct: L(
      'CT ist besonders hilfreich bei intraartikulärer Mehrfragmentfraktur, Die-Punch-Impression, unklarer Gelenkstufe, Barton-Fraktur und zur präoperativen Planung.',
      'CT is particularly useful for intra-articular comminution, die-punch depression, uncertain articular step, Barton fracture and preoperative planning.',
      'CT در شکستگی چندقطعه‌ای داخل‌مفصلی، فرورفتگی Die-Punch، پله مفصلی نامشخص، شکستگی بارتون و برنامه‌ریزی پیش از عمل مفید است.'
    ),
  },
  muster: {
    title: L('Klassische Frakturmuster', 'Classic Fracture Patterns', 'الگوهای کلاسیک شکستگی'),
    lead: L(
      'Die traditionellen Eponyme beschreiben Richtung und Gelenkbeteiligung. Sie ersetzen keine vollständige Frakturbeschreibung.',
      'Traditional eponyms describe displacement direction and articular involvement. They do not replace a complete fracture description.',
      'اپونیم‌های سنتی جهت جابجایی و درگیری مفصل را توصیف می‌کنند، اما جایگزین توصیف کامل شکستگی نیستند.'
    ),
    imageSrc: '/distale-radiusfraktur/klassische-muster.png',
    imageAlt: L('Colles-, Smith-, dorsale und volare Barton-Fraktur im Vergleich', 'Comparison of Colles, Smith, dorsal and volar Barton fractures', 'مقایسه شکستگی‌های کولس، اسمیت، بارتون دورسال و ولار'),
    imageLegendTitle: L('Begriffe in der Abbildung', 'Labels in the figure', 'برچسب‌های داخل تصویر'),
    imageLegend: [
      { title: L('Häufige distale Radiusfrakturen', 'Common distal radius fractures', 'شکستگی‌های شایع دیستال رادیوس'), text: L('Übersetzung der englischen Bildüberschrift.', 'German and Persian translation of the embedded English heading.', 'ترجمهٔ آلمانی و فارسی عنوان انگلیسیِ درج‌شده در تصویر.') },
      { title: L('Extraartikulär / intraartikulär', 'Extra-articular / intra-articular', 'خارج‌مفصلی / داخل‌مفصلی'), text: L('Außerhalb des Gelenks / mit Beteiligung der Gelenkfläche.', 'Fracture outside the joint / involving the articular surface.', 'شکستگی خارج از مفصل / همراه با درگیری سطح مفصلی.') },
      { title: L('Dorsale / palmare (volare) Angulation', 'Dorsal / volar angulation', 'زاویه‌داری دورسال / ولار'), text: L('Abkippung des distalen Fragments nach dorsal / zur Handflächenseite.', 'Angulation of the distal fragment dorsally / toward the palm.', 'زاویه‌داری قطعهٔ دیستال به سمت پشت دست / کف دست.') },
    ],
    items: [
      { icon: '↗', title: L('Colles-Fraktur', 'Colles fracture', 'شکستگی کولس'), text: L('Extraartikuläre distale Radiusfraktur mit dorsaler Angulation/Dislokation des distalen Fragments, meist nach Sturz auf die extendierte Hand.', 'Extra-articular distal radius fracture with dorsal angulation/displacement of the distal fragment, usually after a fall on an extended hand.', 'شکستگی خارج‌مفصلی دیستال رادیوس با زاویه‌داری/جابجایی دورسال قطعه دیستال، معمولاً پس از افتادن روی دست اکستاند.') },
      { icon: '↘', title: L('Smith-Fraktur', 'Smith fracture', 'شکستگی اسمیت'), text: L('Extraartikuläre Fraktur mit palmarer Angulation/Dislokation, klassisch nach Sturz auf das flektierte Handgelenk; „reverse Colles“.', 'Extra-articular fracture with volar angulation/displacement, classically after a fall on a flexed wrist; reverse Colles.', 'شکستگی خارج‌مفصلی با زاویه‌داری/جابجایی ولار، معمولاً پس از افتادن روی مچ فلکس؛ کولس معکوس.') },
      { icon: '◩', title: L('Barton-Fraktur', 'Barton fracture', 'شکستگی بارتون'), text: L('Intraartikuläre dorsale oder palmare Randfraktur; das Randfragment luxiert oder subluxiert zusammen mit dem Karpus.', 'Intra-articular dorsal or volar rim fracture; the rim fragment dislocates or subluxes together with the carpus.', 'شکستگی لبه دورسال یا ولار داخل‌مفصلی که قطعه لبه همراه با کارپ لوکس یا ساب‌لوکس می‌شود.') },
    ],
    cave: L(
      'Barton ist keine einfache Colles- oder Smith-Fraktur: Die radiokarpale Subluxation zusammen mit dem Randfragment macht das Muster hochinstabil.',
      'Barton is not simply a Colles or Smith fracture: radiocarpal subluxation together with the rim fragment makes it highly unstable.',
      'بارتون فقط کولس یا اسمیت ساده نیست؛ ساب‌لوکساسیون رادیوکارپال همراه قطعه لبه، الگو را بسیار ناپایدار می‌کند.'
    ),
  },
  fernandez: {
    title: L('Fernandez-Klassifikation', 'Fernandez Classification', 'طبقه‌بندی فرناندز'),
    lead: L(
      'Fernandez ordnet die distale Radiusfraktur nach dem zugrunde liegenden Verletzungsmechanismus und kann Hinweise auf mögliche Instabilität und Begleitverletzungen geben.',
      'Fernandez classifies distal radius fractures by injury mechanism and can offer clues to possible instability and associated injuries.',
      'فرناندز شکستگی دیستال رادیوس را بر اساس مکانیسم آسیب طبقه‌بندی می‌کند و می‌تواند سرنخ‌هایی دربارهٔ احتمال ناپایداری و آسیب‌های همراه بدهد.'
    ),
    schemaSrc: '/distale-radiusfraktur/fernandez-schema.png',
    xraySrc: '/distale-radiusfraktur/fernandez-roentgen.png',
    schemaAlt: L('Fernandez Typ I–V: schematische Darstellung der Frakturmuster', 'Fernandez Types I–V: schematic fracture patterns', 'فرناندز انواع I تا V: نمایش شماتیک الگوهای شکستگی'),
    xrayAlt: L('Den Fernandez-Typen I–V zugeordnete Röntgenbeispiele aus MSK.pdf, Seite 17', 'Radiographic examples paired with Fernandez Types I–V in MSK.pdf, page 17', 'نمونه‌های رادیوگرافی همراه با انواع I تا V فرناندز در MSK.pdf، صفحهٔ ۱۷'),
    headers: [L('Typ', 'Type', 'نوع'), L('Mechanismus', 'Mechanism', 'مکانیسم'), L('Muster', 'Pattern', 'الگو')],
    rows: [
      [L('I', 'I', 'I'), L('Biegung', 'Bending', 'خمشی'), L('Metaphysär, meist extraartikulär; Colles oder Smith.', 'Metaphyseal, usually extra-articular; Colles or Smith.', 'متافیزی، معمولاً خارج‌مفصلی؛ کولس یا اسمیت.')],
      [L('II', 'II', 'II'), L('Scherung', 'Shear', 'برشی'), L('Intraartikuläre Randfraktur mit radiokarpaler Subluxation; Barton.', 'Intra-articular rim fracture with radiocarpal subluxation; Barton.', 'شکستگی لبه داخل‌مفصلی با ساب‌لوکساسیون رادیوکارپال؛ بارتون.')],
      [L('III', 'III', 'III'), L('Kompression', 'Compression', 'فشاری'), L('Zentrale Gelenkimpression durch das Lunatum; Die-Punch.', 'Central articular depression caused by the lunate; die-punch.', 'فرورفتگی مرکزی مفصل توسط لونیت؛ Die-Punch.')],
      [L('IV', 'IV', 'IV'), L('Avulsion', 'Avulsion', 'آولسیون'), L('Radiokarpale Luxationsfraktur mit Avulsionskomponente.', 'Radiocarpal fracture-dislocation with an avulsion component.', 'شکستگی-دررفتگی رادیوکارپال با مؤلفهٔ آولسیون.')],
      [L('V', 'V', 'V'), L('Kombination', 'Combination', 'ترکیبی'), L('High-Energy-Verletzung mit komplexer Gelenkzertrümmerung.', 'High-energy injury with complex articular comminution.', 'آسیب پرانرژی با خردشدگی پیچیده مفصل.')],
    ],
    key: L(
      'Die Typen II–V umfassen Gelenkflächen-Scherung, -Kompression, Avulsion oder kombinierte Hochenergieverletzungen. Der Mechanismus gibt Hinweise auf das Muster, ersetzt aber weder die vollständige Frakturbeschreibung noch die individuelle Stabilitätsbeurteilung.',
      'Types II–V include articular shear, compression, avulsion or combined high-energy injury patterns. Mechanism helps anticipate morphology, but does not replace a complete fracture description or individual stability assessment.',
      'انواع II تا V شامل الگوهای برشی یا فشاری سطح مفصل، آولسیون یا آسیب‌های ترکیبی پرانرژی‌اند. مکانیسم به پیش‌بینی مورفولوژی کمک می‌کند، اما جایگزین توصیف کامل شکستگی یا ارزیابی اختصاصی پایداری نیست.'
    ),
  },
  sonderformen: {
    title: L('Sonderformen & Instabilitätszeichen', 'Special Patterns & Instability Signs', 'الگوهای ویژه و علائم ناپایداری'),
    lead: L('Bestimmte Fragmente und Fehlstellungen verändern Therapie und Prognose.', 'Certain fragments and malalignments alter treatment and prognosis.', 'برخی قطعات و بدراستایی‌ها درمان و پیش‌آگهی را تغییر می‌دهند.'),
    items: [
      { icon: '🚕', title: L('Chauffeur-Fraktur', 'Chauffeur fracture', 'شکستگی شوفر'), text: L("Intraartikuläre Radiusstyloidfraktur. Die PDF beschreibt sie als knöchernen Ausriss; der Name legt den Mechanismus nicht auf Avulsion fest. SL-Band und Karpus auf Begleitverletzungen prüfen.", "Intra-articular radial styloid fracture. The PDF describes a bony avulsion; the name does not restrict the mechanism to avulsion. Assess the SL ligament and carpus for associated injury.", "شکستگی داخل‌مفصلی استایلوئید رادیوس. PDF آن را آولسیون استخوانی توصیف می‌کند؛ نام شکستگی مکانیسم را به آولسیون محدود نمی‌کند. رباط SL و کارپ را از نظر آسیب همراه بررسی کنید.") },
      { icon: '🔨', title: L('Die-Punch-Fraktur', 'Die-punch fracture', 'شکستگی Die-Punch'), text: L('Impression der Fossa lunata durch axiale Kompression des Lunatums; kann im Röntgen unterschätzt werden und benötigt häufig CT.', 'Depression of the lunate fossa from axial lunate compression; may be underestimated on radiographs and often requires CT.', 'فرورفتگی فوسای لونیت بر اثر فشار محوری لونیت؛ ممکن است در رادیوگرافی کمتر دیده شود و اغلب CT لازم است.') },
      { icon: '📉', title: L("Instabilitätszeichen", "Instability signs", "علائم ناپایداری"), text: L("Komminution, Verkürzung, Tilt und Gelenkinkongruenz konkret beschreiben und mit Voraufnahmen vergleichen.", "Describe comminution, shortening, tilt and articular incongruity explicitly and compare with previous images.", "خردشدگی، کوتاهی، تیلت و ناهمخوانی مفصل را مشخص توصیف و با تصاویر قبلی مقایسه کنید.") },
      { icon: '🦴', title: L('Ulnastyloid', 'Ulnar styloid', 'استیلوئید اولنا'), text: L('Basisfraktur kann eine TFCC-/DRUG-Verletzung anzeigen; entscheidend ist die DRUG-Kongruenz und klinische Stabilität.', 'A base fracture may indicate TFCC/DRUJ injury; DRUJ congruity and clinical stability are decisive.', 'شکستگی قاعده می‌تواند نشان‌دهنده آسیب TFCC/DRUJ باشد؛ تطابق DRUJ و پایداری بالینی تعیین‌کننده‌اند.') },
    ],
  },
  begleitverletzungen: {
    title: L('Karpale & ligamentäre Begleitverletzungen', 'Carpal & Ligamentous Associated Injuries', 'آسیب‌های همراه کارپ و رباط'),
    lead: L(
      'Der Blick darf nicht an der Radiusfraktur enden. Insbesondere bei Hochenergie- und Styloidfrakturen müssen Karpus, SL-Band, Lunatum und DRUG systematisch geprüft werden.',
      'Assessment must not stop at the radius fracture. Especially in high-energy and styloid fractures, systematically assess the carpus, SL ligament, lunate and DRUJ.',
      'ارزیابی نباید به شکستگی رادیوس ختم شود. به‌ویژه در آسیب پرانرژی و شکستگی استیلوئید، کارپ، رباط SL، لونیت و DRUJ باید سیستماتیک بررسی شوند.'
    ),
    caseTitle: L('Fallübung: Karpus beurteilen · Radiopaedia rID 88989', 'Case exercise: assess the carpus · Radiopaedia rID 88989', 'تمرین موردی: ارزیابی کارپ · رادیوپدیا rID 88989'),
    radiopaediaUrl: 'https://radiopaedia.org/cases/88989',
    images: [{ src: '/distale-radiusfraktur/fall-rid88989.jpeg', caption: L('Radiopaedia rID 88989, PA-Aufnahme: Karpusausrichtung, Gilula-Bögen und SL-Intervall prüfen. Eine einzelne PA-Aufnahme belegt keine bestimmte Band- oder Lunatumverletzung.', 'Radiopaedia rID 88989, PA view: assess carpal alignment, Gilula arcs and the SL interval. A single PA view does not establish a specific ligament or lunate injury.', 'رادیوپدیا rID 88989، نمای PA: هم‌راستایی کارپ، قوس‌های گیلولا و فاصله SL را بررسی کنید. یک نمای PA به‌تنهایی آسیب مشخص رباط یا لونیت را اثبات نمی‌کند.') }],
    items: [
      { icon: '↔', title: L('Skapholunäre Dissoziation', 'Scapholunate dissociation', 'دیسوسیشن اسکافولونات'), text: L('Ein verbreitertes SL-Intervall (als grobe Orientierung > 3 mm), unterbrochene Gilula-Bögen und ggf. ein Skaphoid-Ringzeichen lenken den Verdacht auf eine SL-Verletzung. Projektion und Vergleich mit der Gegenseite mitberücksichtigen.', 'A widened SL interval (rough guide: >3 mm), disrupted Gilula arcs and a possible scaphoid ring sign raise suspicion for SL injury. Consider projection and comparison with the opposite wrist.', 'گشادشدگی فاصله SL (حدود راهنمای تقریبی: بیش از ۳ میلی‌متر)، اختلال قوس‌های گیلولا و احتمال علامت حلقه اسکافوئید شک به آسیب SL را مطرح می‌کنند. وضعیت تصویربرداری و مقایسه با مچ مقابل را در نظر بگیرید.') },
      { icon: '🌙', title: L('Lunatumluxation', 'Lunate dislocation', 'لوکساسیون لونیت'), text: L('Im Seitenbild kippt das Lunatum palmar („spilled teacup“); im PA-Bild kann es dreieckig erscheinen („piece of pie“).', 'On the lateral view the lunate tilts volarly (spilled teacup); on PA it may appear triangular (piece of pie).', "در نمای لترال لونیت به ولار می‌چرخد (علامت فنجان واژگون، spilled teacup) و در PA ممکن است مثلثی دیده شود (علامت تکهٔ پای، piece of pie).") },
      { icon: '◯', title: L('Dorsale perilunäre Luxation', 'Dorsal perilunate dislocation', 'دررفتگی پری‌لونیت دورسال'), text: L('Lunatum bleibt in der Radiuspfanne, während Kapitatum und übriger Karpus dorsal dislozieren; Radius–Lunatum-Beziehung von der Kapitatumachse trennen.', 'The lunate remains in the radial fossa while the capitate and remaining carpus dislocate dorsally; distinguish radiolunate from capitolunate alignment.', 'لونیت در فوسای رادیوس باقی می‌ماند و کاپیتیت و بقیه کارپ به دورسال جابجا می‌شوند؛ هم‌راستایی رادیولونات از کاپیتولونات تفکیک شود.') },
      { icon: '🔗', title: L("DRUG / TFCC", "DRUJ / TFCC", "DRUJ / TFCC"), text: L("DRUG-Weite und Ulnakopfstellung an korrekten Projektionen prüfen. Positive Ulnavarianz kann durch Radiusverkürzung entstehen und beweist allein keine TFCC-Läsion oder Instabilität; Bildbefund und klinische Stabilität zusammen beurteilen.", "Check DRUJ width and ulnar-head position on correct projections. Positive ulnar variance can reflect radial shortening and alone proves neither TFCC injury nor instability; combine imaging and clinical stability assessment.", "پهنای DRUJ و وضعیت سر اولنا را در نماهای درست بررسی کنید. واریانس اولنار مثبت می‌تواند از کوتاهی رادیوس ناشی شود و به‌تنهایی آسیب TFCC یا ناپایداری را اثبات نمی‌کند؛ تصویر و ارزیابی پایداری بالینی را با هم بسنجید.") },
    ],
    cave: L(
      "Eine perilunäre oder Lunatumluxation benötigt dringliche Behandlung: Es drohen Knorpelschaden, Medianuskompression und chronische Instabilität.",
      "Perilunate or lunate dislocation needs urgent treatment because cartilage damage, median-nerve compression and chronic instability may follow.",
      "دررفتگی پری‌لونیت یا لونیت به درمان فوری نیاز دارد؛ آسیب غضروف، فشار عصب مدیان و ناپایداری مزمن ممکن است در پی آن رخ دهد."
    ),
  },
  befund: {
    title: L('Strukturiertes Befundschema', 'Structured Reporting', 'الگوی ساختاری گزارش'),
    lead: L('Der Befund muss Frakturmuster, Repositionsrelevanz und Begleitverletzungen klar abbilden.', 'The report must clearly describe fracture pattern, reduction-relevant features and associated injuries.', 'گزارش باید الگوی شکستگی، ویژگی‌های مهم برای جااندازی و آسیب‌های همراه را روشن بیان کند.'),
    items: [
      { icon: '1', title: L('Extra- oder intraartikulär', 'Extra- or intra-articular', 'خارج یا داخل مفصل'), text: L('Frakturverlauf, Gelenkflächenanteil, Fragmente und Komminution.', 'Fracture course, articular involvement, fragments and comminution.', 'مسیر شکستگی، درگیری سطح مفصل، قطعات و خردشدگی.') },
      { icon: '2', title: L('Fehlstellung', 'Malalignment', 'بدراستایی'), text: L('Dorsale/palmare Angulation und Translation, Radiusverkürzung, radiale Dislokation und Rotation.', 'Dorsal/volar angulation and translation, radial shortening, radial displacement and rotation.', 'زاویه‌داری و جابجایی دورسال/ولار، کوتاهی رادیوس، جابجایی رادیال و چرخش.') },
      { icon: '3', title: L('Gelenkfläche', 'Articular surface', 'سطح مفصل'), text: L('Stufe und Spalt in Millimetern; Fossa scaphoidea/lunata und sigmoid notch nennen.', 'Step and gap in millimetres; specify scaphoid/lunate fossae and sigmoid notch.', 'پله و فاصله بر حسب میلی‌متر؛ فوسای اسکافوئید/لونیت و ناچ سیگموئید ذکر شود.') },
      { icon: '4', title: L('DRUG & Ulna', 'DRUJ & ulna', 'DRUJ و اولنا'), text: L('DRUG-Kongruenz, Ulnavarianz sowie Ulnastyloid- oder distale Ulnafraktur.', 'DRUJ congruity, ulnar variance and ulnar styloid or distal ulnar fracture.', 'تطابق DRUJ، واریانس اولنار و شکستگی استیلوئید یا دیستال اولنا.') },
      { icon: '5', title: L('Karpus', 'Carpus', 'کارپ'), text: L('Gilula-Bögen, SL-Intervall, Lunatum-/Kapitatumachse und karpale Begleitfrakturen.', 'Gilula arcs, SL interval, lunate/capitate alignment and associated carpal fractures.', 'قوس‌های گیلولا، فاصله SL، محور لونیت/کاپیتیت و شکستگی‌های همراه کارپ.') },
    ],
    sample: L(
      'Mehrfragmentäre intraartikuläre distale Radiusfraktur mit dorsaler Trümmerzone, 3 mm Gelenkstufe der Fossa lunata, 18° dorsalem Tilt und Radiusverkürzung mit positiver Ulnavarianz. DRUG leicht erweitert. Kein sicherer Hinweis auf perilunäre/Lunatumluxation; SL-Intervall grenzwertig verbreitert. CT zur präoperativen Fragmentkartierung empfohlen.',
      'Comminuted intra-articular distal radius fracture with dorsal comminution, 3 mm step of the lunate fossa, 18° dorsal tilt and radial shortening with positive ulnar variance. Mild DRUJ widening. No definite perilunate/lunate dislocation; borderline widening of the SL interval. CT recommended for preoperative fragment mapping.',
      'شکستگی چندقطعه‌ای داخل‌مفصلی دیستال رادیوس با خردشدگی دورسال، پله ۳ میلی‌متری فوسای لونیت، تیلت دورسال ۱۸ درجه و کوتاهی رادیوس با واریانس اولنار مثبت. گشادشدگی خفیف DRUJ. شواهد قطعی لوکساسیون پری‌لونیت/لونیت وجود ندارد؛ فاصله SL مرزی گشاد است. CT برای نقشه‌برداری پیش از عمل توصیه می‌شود.'
    ),
  },
  therapie: {
    title: L('Therapieprinzipien', 'Treatment Principles', 'اصول درمان'),
    lead: L('Therapieentscheidend sind Stabilität, Gelenkkongruenz, Fehlstellung, Knochenqualität, Alter und funktioneller Anspruch.', 'Treatment depends on stability, articular congruity, malalignment, bone quality, age and functional demand.', 'درمان به پایداری، تطابق مفصل، بدراستایی، کیفیت استخوان، سن و نیاز عملکردی بستگی دارد.'),
    items: [
      { icon: '🩹', title: L('Konservativ', 'Conservative', 'محافظه‌کارانه'), text: L('Stabile, akzeptabel reponierte extraartikuläre Fraktur: geschlossene Reposition, Immobilisation und frühe Verlaufskontrolle wegen Sekundärdislokation.', 'Stable, acceptably reduced extra-articular fracture: closed reduction, immobilisation and early follow-up for secondary displacement.', 'شکستگی خارج‌مفصلی پایدار با جااندازی قابل قبول: جااندازی بسته، بی‌حرکتی و پیگیری زودهنگام برای جابجایی ثانویه.') },
      { icon: '🔩', title: L("Operative Abwägung", "Consideration of fixation", "بررسی تثبیت جراحی"), text: L("AAOS/ASSH 2020: Bei nichtgeriatrischen Patienten (Studien meist <65 Jahre) unterstützt postreduktionelle Verkürzung >3 mm, dorsaler Tilt >10° oder Gelenkverschiebung/Stufe >2 mm eine Fixationsabwägung. Funktion, Ziele, Risiken und Stabilität zählen mit; Alter ist ein Näherungswert für funktionellen Anspruch. Bei geriatrischen Patienten ergibt sich kein langfristiger Vorteil der Operation für patientenberichtete Ergebnisse. Gelenkbeteiligung allein ist keine OP-Indikation.", "AAOS/ASSH 2020: in nongeriatric patients (studies usually <65), postreduction shortening >3 mm, dorsal tilt >10° or articular displacement/step >2 mm supports consideration of fixation. Function, goals, risks and stability also matter; age is a proxy for functional demand. In geriatric patients surgery offers no long-term patient-reported advantage. Articular involvement alone is not a surgical indication.", "AAOS/ASSH۲۰۲۰: در بیماران غیرسالمند (مطالعات معمولاً زیر ۶۵سال)، کوتاهی بیش از ۳ میلی‌متر، تیلت دورسال بیش از ۱۰درجه یا جابجایی/پلهٔ مفصلی بیش از ۲ میلی‌متر پس از جااندازی از بررسی تثبیت جراحی حمایت می‌کند. عملکرد، اهداف، خطرها و پایداری هم اهمیت دارند؛ سن جانشین تقریبی نیاز عملکردی است. در بیماران سالمند جراحی مزیت درازمدت در پیامدهای گزارش‌شده توسط بیمار ندارد. درگیری مفصل به‌تنهایی اندیکاسیون جراحی نیست.") },
      { icon: '⏱️', title: L('Dringlich', 'Urgent', 'فوری'), text: L('Offene Fraktur, neurovaskuläre Beeinträchtigung, akutes Karpaltunnelsyndrom sowie radiokarpale/perilunäre Luxation benötigen sofortige Eskalation.', 'Open fracture, neurovascular compromise, acute carpal tunnel syndrome and radiocarpal/perilunate dislocation require immediate escalation.', 'شکستگی باز، اختلال عصبی‌عروقی، سندرم حاد تونل کارپ و لوکساسیون رادیوکارپال/پری‌لونیت نیازمند اقدام فوری‌اند.') },
      { icon: '↻', title: L('Komplikationen', 'Complications', 'عوارض'), text: L('Sekundärdislokation, Fehlheilung, posttraumatische Arthrose, CRPS, Sehnenirritation/-ruptur, Medianusneuropathie und DRUG-Instabilität.', 'Secondary displacement, malunion, post-traumatic osteoarthritis, CRPS, tendon irritation/rupture, median neuropathy and DRUJ instability.', 'جابجایی ثانویه، بدجوش‌خوردگی، آرتروز پس از تروما، CRPS، تحریک/پارگی تاندون، نوروپاتی مدیان و ناپایداری DRUJ.') },
    ],
  },
  takehome: {
    title: L('Take-home Message', 'Take-home Message', 'پیام‌های کلیدی'),
    lead: L('Fünf Schritte für eine prüfungssichere Befundung.', 'Five steps for exam-safe reporting.', 'پنج گام برای گزارش مطمئن در آزمون.'),
    items: [
      { title: L('Muster vollständig beschreiben', 'Describe the complete pattern', 'الگو را کامل توصیف کنید'), text: L('Eponym plus extra-/intraartikulär, Fragmente und Dislokation.', 'Use the eponym plus articular involvement, fragments and displacement.', 'اپونیم همراه با درگیری مفصل، قطعات و جابجایی ذکر شود.') },
      { title: L('Geometrie messen', 'Measure geometry', 'هندسه را اندازه بگیرید'), text: L('Tilt, Inklination, Radiuslänge/Ulnavarianz sowie Gelenkstufe dokumentieren.', 'Document tilt, inclination, radial length/ulnar variance and articular step.', 'تیلت، شیب، طول رادیوس/واریانس اولنار و پله مفصل ثبت شود.') },
      { title: L('Fernandez verstehen', 'Understand Fernandez', 'فرناندز را درک کنید'), text: L('Der Mechanismus liefert Hinweise auf Fragmentmuster, mögliche Instabilität und Begleitverletzungen; er ersetzt nicht die individuelle Beurteilung.', 'Mechanism offers clues to fragment patterns, possible instability and associated injuries; it does not replace individual assessment.', 'مکانیسم سرنخ‌هایی دربارهٔ الگوی قطعات، احتمال ناپایداری و آسیب‌های همراه می‌دهد؛ اما جای ارزیابی فردی را نمی‌گیرد.') },
      { title: L('Karpus nicht vergessen', 'Do not forget the carpus', 'کارپ را فراموش نکنید'), text: L('SL-Intervall, Gilula-Bögen und Lunatum-/Kapitatumachse aktiv prüfen.', 'Actively assess the SL interval, Gilula arcs and lunate/capitate alignment.', 'فاصله SL، قوس‌های گیلولا و محور لونیت/کاپیتیت فعالانه بررسی شوند.') },
      { title: L('CT gezielt einsetzen', 'Use CT selectively', 'CT را هدفمند استفاده کنید'), text: L('Bei intraartikulärer Mehrfragmentfraktur, Die-Punch, Barton oder unklarer Gelenkfläche.', 'Use it for intra-articular comminution, die-punch, Barton or uncertain articular anatomy.', 'در خردشدگی داخل‌مفصلی، Die-Punch، بارتون یا آناتومی مفصلی نامشخص.') },
    ],
  },
}

const LETTERS = ['A', 'B', 'C', 'D']
const Q = (id, question, options, correct, explanation, wrongExplanations, source, difficulty) => ({
  id,
  question,
  options: options.map((text, index) => ({ id: LETTERS[index], text })),
  correct: LETTERS[correct],
  explanation,
  wrongExplanations,
  source,
  difficulty,
  tags: ['distale-radiusfraktur'],
  fach: 'msk',
})

const QUESTION_CONTENT = [
  {
    "id": "colles",
    "q": {
      "de": "Textfall: Die distale Radiusfraktur ist extraartikulär. Das distale Fragment ist dorsal gekippt und verkürzt; der Karpus bleibt an der distalen Gelenkfläche ausgerichtet. Welche Musterzuordnung passt?",
      "en": "Text vignette: the distal radius fracture is extra-articular. The distal fragment is dorsally tilted and shortened; the carpus remains aligned with the distal articular surface. Which pattern fits?",
      "fa": "سناریوی متنی: شکستگی دیستال رادیوس خارج‌مفصلی است. قطعهٔ دیستال تیلت دورسال و کوتاهی دارد؛ کارپ با سطح مفصلی دیستال هم‌راستا می‌ماند. کدام الگو مناسب است؟"
    },
    "o": [
      {
        "de": "Colles-Muster: extraartikuläre Biegungsfraktur mit dorsaler Fehlstellung",
        "en": "Colles pattern: extra-articular bending fracture with dorsal malalignment",
        "fa": "الگوی کولس: شکستگی خمشی خارج‌مفصلی با بدراستایی دورسال"
      },
      {
        "de": "Volares Barton-Muster: Gelenkrandfraktur mit radiokarpaler Subluxation",
        "en": "Volar Barton pattern: articular rim fracture with radiocarpal subluxation",
        "fa": "الگوی بارتون ولار: شکستگی لبهٔ مفصل با ساب‌لوکساسیون رادیوکارپال"
      },
      {
        "de": "Chauffeur-Muster: isolierte intraartikuläre Radiusstyloidfraktur",
        "en": "Chauffeur pattern: isolated intra-articular radial styloid fracture",
        "fa": "الگوی شوفر: شکستگی منفرد داخل‌مفصلی استایلوئید رادیوس"
      },
      {
        "de": "Die-Punch-Muster: zentrale Impression der Fossa lunata",
        "en": "Die-punch pattern: central depression of the lunate fossa",
        "fa": "الگوی Die-Punch: فرورفتگی مرکزی فوسای لونیت"
      }
    ],
    "c": 0,
    "e": {
      "de": "Colles ist typischerweise extraartikulär und dorsal anguliert/disloziert. Die Gelenkbeteiligung und vollständige Fehlstellung müssen dennoch separat beschrieben werden.",
      "en": "Colles is typically extra-articular with dorsal angulation/displacement. Articular involvement and complete malalignment must still be described separately.",
      "fa": "کولس معمولاً خارج‌مفصلی با زاویه‌داری/جابجایی دورسال است؛ درگیری مفصل و بدراستایی کامل باید جداگانه توصیف شوند."
    },
    "wrong": {
      "B": {
        "de": "Eine Barton-Fraktur erfordert die Gelenkrandbeteiligung und eine Mitverlagerung des Karpus; beides ist hier nicht beschrieben.",
        "en": "Barton requires articular rim involvement and displacement of the carpus with that fragment; neither is described here.",
        "fa": "بارتون به درگیری لبهٔ مفصل و جابجایی کارپ همراه قطعه نیاز دارد؛ هیچ‌کدام اینجا توصیف نشده‌اند."
      },
      "C": {
        "de": "Der Fall beschreibt nicht nur einen Styloidfortsatz, sondern ein extraartikuläres distales Hauptfragment.",
        "en": "The case describes an extra-articular distal main fragment rather than an isolated styloid fragment.",
        "fa": "این مورد قطعهٔ اصلی دیستالِ خارج‌مفصلی را توصیف می‌کند، نه قطعهٔ منفرد استایلوئید."
      },
      "D": {
        "de": "Eine zentrale Gelenkflächenimpression ist nicht beschrieben; die Fehlstellung betrifft das extraartikuläre Hauptfragment.",
        "en": "No central articular depression is described; malalignment concerns the extra-articular main fragment.",
        "fa": "فرورفتگی مرکزی سطح مفصل توصیف نشده؛ بدراستایی مربوط به قطعهٔ اصلی خارج‌مفصلی است."
      }
    },
    "difficulty": 2,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "smith",
    "q": {
      "de": "Textfall: Eine extraartikuläre distale Radiusfraktur zeigt palmare Angulation des distalen Fragments. Die radiokarpale Gelenkfläche bleibt kongruent; eine Gelenkrandabscherung ist nicht beschrieben. Welches Muster passt?",
      "en": "Text vignette: an extra-articular distal radius fracture has volar angulation of the distal fragment. The radiocarpal surface remains congruent and no articular rim shearing is described. Which pattern fits?",
      "fa": "سناریوی متنی: شکستگی خارج‌مفصلی دیستال رادیوس، زاویه‌داری ولار قطعهٔ دیستال دارد. سطح مفصلی رادیوکارپال همخوان است و برش لبهٔ مفصل توصیف نشده. کدام الگو مناسب است؟"
    },
    "o": [
      {
        "de": "Smith-Muster",
        "en": "Smith pattern",
        "fa": "الگوی اسمیت"
      },
      {
        "de": "Volares Barton-Muster",
        "en": "Volar Barton pattern",
        "fa": "الگوی بارتون ولار"
      },
      {
        "de": "Klassisches Colles-Muster",
        "en": "Classic Colles pattern",
        "fa": "الگوی کولس کلاسیک"
      },
      {
        "de": "Chauffeur-Muster",
        "en": "Chauffeur pattern",
        "fa": "الگوی شوفر"
      }
    ],
    "c": 0,
    "e": {
      "de": "Smith ist die reverse-Colles-Konfiguration mit palmarer Angulation/Dislokation des distalen Fragments und meist extraartikulärem Verlauf.",
      "en": "Smith is the reverse-Colles configuration with volar angulation/displacement of the distal fragment and usually an extra-articular fracture.",
      "fa": "اسمیت پیکربندی کولس معکوس با زاویه‌داری/جابجایی ولار قطعه دیستال و معمولاً مسیر خارج‌مفصلی است."
    },
    "wrong": {
      "B": {
        "de": "Volare Angulation allein macht keine volare Barton-Fraktur: Gelenkrandabscherung mit radiokarpaler Subluxation fehlt.",
        "en": "Volar angulation alone is not volar Barton: articular rim shear with radiocarpal subluxation is absent.",
        "fa": "زاویه‌داری ولار به‌تنهایی بارتون ولار نیست؛ برش لبهٔ مفصل همراه ساب‌لوکساسیون رادیوکارپال وجود ندارد."
      },
      "C": {
        "de": "Beim klassischen Colles-Muster kippt das distale Fragment dorsal; hier ist es palmar gekippt.",
        "en": "Classic Colles has dorsal tilt of the distal fragment; the fragment here tilts volarly.",
        "fa": "در کولس کلاسیک قطعهٔ دیستال تیلت دورسال دارد؛ قطعهٔ اینجا به ولار کج شده است."
      },
      "D": {
        "de": "Chauffeur bezeichnet die Radiusstyloidfraktur, nicht diese extraartikuläre Hauptfragmentfehlstellung.",
        "en": "Chauffeur denotes a radial styloid fracture rather than this extra-articular main-fragment malalignment.",
        "fa": "شوفر شکستگی استایلوئید رادیوس را می‌نامد، نه این بدراستایی قطعهٔ اصلی خارج‌مفصلی."
      }
    },
    "difficulty": 2,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "barton",
    "q": {
      "de": "Welches Merkmal definiert eine Barton-Fraktur?",
      "en": "Which feature defines a Barton fracture?",
      "fa": "کدام ویژگی شکستگی بارتون را تعریف می‌کند؟"
    },
    "o": [
      {
        "de": "Extraartikuläre metaphysäre Biegungsfraktur",
        "en": "Extra-articular metaphyseal bending fracture",
        "fa": "شکستگی خمشی متافیزی خارج‌مفصلی"
      },
      {
        "de": "Intraartikuläre Randfraktur mit Subluxation/Luxation des Karpus zusammen mit dem Fragment",
        "en": "Intra-articular rim fracture with carpal subluxation/dislocation together with the fragment",
        "fa": "شکستگی لبه داخل‌مفصلی با ساب‌لوکساسیون/لوکساسیون کارپ همراه قطعه"
      },
      {
        "de": "Zentrale Impression ohne Karpusverlagerung",
        "en": "Central depression without carpal displacement",
        "fa": "فرورفتگی مرکزی بدون جابجایی کارپ"
      },
      {
        "de": "Isolierte intraartikuläre Radiusstyloidfraktur ohne radiokarpale Subluxation",
        "en": "Isolated intra-articular radial styloid fracture without radiocarpal subluxation",
        "fa": "شکستگی منفرد داخل‌مفصلی استایلوئید رادیوس بدون ساب‌لوکساسیون رادیوکارپال"
      }
    ],
    "c": 1,
    "e": {
      "de": "Barton ist eine dorsale oder palmare intraartikuläre Randfraktur. Der Karpus folgt dem Randfragment und ist radiokarpal subluxiert oder luxiert.",
      "en": "Barton is a dorsal or volar intra-articular rim fracture. The carpus follows the rim fragment and is radiocarpally subluxed or dislocated.",
      "fa": "بارتون شکستگی لبه دورسال یا ولار داخل‌مفصلی است و کارپ همراه قطعه لبه ساب‌لوکس یا لوکس می‌شود."
    },
    "wrong": {
      "A": {
        "de": "Die extraartikuläre Biegungsfraktur beschreibt eher Colles/Smith und enthält keine abgescherte Gelenklippe mit mitfolgendem Karpus.",
        "en": "An extra-articular bending fracture fits Colles/Smith rather than a sheared articular rim with the carpus following it.",
        "fa": "شکستگی خمشی خارج‌مفصلی بیشتر کولس/اسمیت است، نه لبهٔ مفصلی بریده‌شده که کارپ همراه آن حرکت کند."
      },
      "C": {
        "de": "Die zentrale Impression entspricht einem Die-Punch-Muster; entscheidend für Barton ist die radiokarpale Randfraktur-Subluxation.",
        "en": "Central depression corresponds to die-punch; Barton is defined by articular rim fracture with radiocarpal subluxation.",
        "fa": "فرورفتگی مرکزی معادل Die-Punch است؛ بارتون با شکستگی لبهٔ مفصل و ساب‌لوکساسیون رادیوکارپال تعریف می‌شود."
      },
      "D": {
        "de": "Eine isolierte Radiusstyloidfraktur ohne radiokarpale Mitverlagerung ist nicht das definierende Barton-Muster.",
        "en": "An isolated styloid fracture without radiocarpal displacement is not the defining Barton pattern.",
        "fa": "شکستگی منفرد استایلوئید بدون جابجایی رادیوکارپال، الگوی تعریف‌کنندهٔ بارتون نیست."
      }
    },
    "difficulty": 1,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "fernandez-iii",
    "q": {
      "de": "Welche Verletzung entspricht Fernandez Typ III?",
      "en": "Which injury corresponds to Fernandez Type III?",
      "fa": "کدام آسیب با فرناندز نوع III مطابقت دارد؟"
    },
    "o": [
      {
        "de": "Biegungsfraktur",
        "en": "Bending fracture",
        "fa": "شکستگی خمشی"
      },
      {
        "de": "Scherfraktur",
        "en": "Shear fracture",
        "fa": "شکستگی برشی"
      },
      {
        "de": "Kompressionsfraktur mit Die-Punch-Impression",
        "en": "Compression fracture with die-punch depression",
        "fa": "شکستگی فشاری با فرورفتگی Die-Punch"
      },
      {
        "de": "Avulsionsfraktur",
        "en": "Avulsion fracture",
        "fa": "شکستگی آولسیون"
      }
    ],
    "c": 2,
    "e": {
      "de": "Fernandez III beruht auf axialer Kompression. Das Lunatum stanzt die Fossa lunata ein und erzeugt eine zentrale intraartikuläre Impression.",
      "en": "Fernandez III is caused by axial compression. The lunate impacts the lunate fossa, producing a central intra-articular depression.",
      "fa": "فرناندز III ناشی از فشار محوری است؛ لونیت فوسای لونیت را فرو می‌برد و فرورفتگی مرکزی داخل‌مفصلی ایجاد می‌کند."
    },
    "wrong": {
      "A": {
        "de": "Biegung der Metaphyse entspricht Typ I, nicht der zentralen Gelenkflächenkompression.",
        "en": "Metaphyseal bending corresponds to Type I, not central articular compression.",
        "fa": "خمش متافیز نوع I است، نه فشار مرکزی سطح مفصل."
      },
      "B": {
        "de": "Scherung der Gelenklippe entspricht Typ II beziehungsweise Barton.",
        "en": "Shearing of the articular rim corresponds to Type II or Barton.",
        "fa": "برش لبهٔ مفصل نوع II یا بارتون است."
      },
      "D": {
        "de": "Avulsion beziehungsweise radiokarpale Luxationsfraktur gehört zu Typ IV; Typ III beschreibt Kompression.",
        "en": "Avulsion or radiocarpal fracture-dislocation belongs to Type IV; Type III describes compression.",
        "fa": "آولسیون یا شکستگی-دررفتگی رادیوکارپال مربوط به نوع IV است؛ نوع III فشار را توصیف می‌کند."
      }
    },
    "difficulty": 1,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "fernandez-ii",
    "q": {
      "de": "Eine palmare Randfraktur luxiert zusammen mit dem Karpus. Welcher Fernandez-Typ ist dies?",
      "en": "A volar rim fragment dislocates together with the carpus. Which Fernandez type is this?",
      "fa": "قطعه لبه ولار همراه با کارپ لوکس می‌شود. کدام نوع فرناندز است؟"
    },
    "o": [
      {
        "de": "I: metaphysäre Biegung",
        "en": "I: metaphyseal bending",
        "fa": "I: خمش متافیز"
      },
      {
        "de": "II: Scherung der Gelenklippe",
        "en": "II: articular rim shear",
        "fa": "II: برش لبهٔ مفصل"
      },
      {
        "de": "III: zentrale Gelenkflächenkompression",
        "en": "III: central articular compression",
        "fa": "III: فشار مرکزی سطح مفصل"
      },
      {
        "de": "IV: radiokarpale Avulsionsverletzung",
        "en": "IV: radiocarpal avulsion injury",
        "fa": "IV: آسیب آولسیون رادیوکارپال"
      }
    ],
    "c": 1,
    "e": {
      "de": "Fernandez II ist eine Scherverletzung der Gelenkfläche und entspricht dem dorsalen oder volaren Barton-Muster.",
      "en": "Fernandez II is an articular shear injury corresponding to a dorsal or volar Barton pattern.",
      "fa": "فرناندز II آسیب برشی سطح مفصل و معادل الگوی بارتون دورسال یا ولار است."
    },
    "wrong": {
      "A": {
        "de": "Typ I beschreibt eine metaphysäre Biegungsfraktur. Hier wird die Gelenklippe zusammen mit dem Karpus abgeschert.",
        "en": "Type I describes metaphyseal bending. Here the articular rim is sheared off with the carpus.",
        "fa": "نوع I خمش متافیز را توصیف می‌کند؛ اینجا لبهٔ مفصل همراه کارپ بریده شده است."
      },
      "C": {
        "de": "Typ III entspricht der zentralen Impression durch Kompression, nicht der beschriebenen Randabscherung.",
        "en": "Type III is central compression depression, not the described rim shear.",
        "fa": "نوع III فرورفتگی مرکزی بر اثر فشار است، نه برش لبهٔ توصیف‌شده."
      },
      "D": {
        "de": "Typ IV ist eine radiokarpale Luxationsfraktur mit Avulsionskomponente. Das beschriebene Barton-Scherfragment entspricht Typ II.",
        "en": "Type IV is a radiocarpal fracture-dislocation with an avulsion component. The described Barton shear fragment corresponds to Type II.",
        "fa": "نوع IV شکستگی-دررفتگی رادیوکارپال با مؤلفهٔ آولسیون است؛ قطعهٔ برشی بارتونِ توصیف‌شده مربوط به نوع II است."
      }
    },
    "difficulty": 2,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "chauffeur",
    "q": {
      "de": "Was ist eine Chauffeur-Fraktur?",
      "en": "What is a chauffeur fracture?",
      "fa": "شکستگی شوفر چیست؟"
    },
    "o": [
      {
        "de": "Intraartikuläre Fraktur des Processus styloideus radii",
        "en": "Intra-articular radial styloid fracture",
        "fa": "شکستگی داخل‌مفصلی استایلوئید رادیوس"
      },
      {
        "de": "Fraktur des Processus styloideus ulnae",
        "en": "Fracture of the ulnar styloid",
        "fa": "شکستگی استیلوئید اولنا"
      },
      {
        "de": "Dorsale Randfraktur",
        "en": "Dorsal rim fracture",
        "fa": "شکستگی لبه دورسال"
      },
      {
        "de": "Zentrale Impression der Fossa lunata des Radius",
        "en": "Central depression of the radial lunate fossa",
        "fa": "فرورفتگی مرکزی فوسای لونیتِ رادیوس"
      }
    ],
    "c": 0,
    "e": {
      "de": "Die PDF beschreibt die Chauffeur-Fraktur als intraartikuläre knöcherne Avulsion des Radiusstyloids. SL-Band und karpale Ausrichtung auf Begleitverletzungen mitprüfen.",
      "en": "The PDF describes a chauffeur fracture as an intra-articular bony avulsion of the radial styloid. Also assess the SL ligament and carpal alignment for associated injury.",
      "fa": "در PDF، شکستگی شوفر به‌صورت آولسیون استخوانی داخل‌مفصلی استیلوئید رادیوس توصیف شده است. رباط SL و هم‌راستایی کارپ را نیز از نظر آسیب همراه بررسی کنید."
    },
    "wrong": {
      "B": {
        "de": "Der ulnare Styloidfortsatz gehört zur Ulna; Chauffeur betrifft den radialen Styloidfortsatz.",
        "en": "The ulnar styloid belongs to the ulna; chauffeur involves the radial styloid.",
        "fa": "استایلوئید اولنار متعلق به اولناست؛ شوفر استایلوئید رادیوس را درگیر می‌کند."
      },
      "C": {
        "de": "Eine dorsale Gelenkrandfraktur kann ein Barton-Muster bilden; sie ist nicht gleichbedeutend mit einer Radiusstyloidfraktur.",
        "en": "A dorsal articular rim fracture can form a Barton pattern; it is not synonymous with a radial styloid fracture.",
        "fa": "شکستگی لبهٔ دورسال مفصل می‌تواند الگوی بارتون باشد؛ معادل شکستگی استایلوئید رادیوس نیست."
      },
      "D": {
        "de": "Die Impression der Fossa lunata ist ein Die-Punch-Muster. Chauffeur betrifft das Radiusstyloid.",
        "en": "Lunate fossa depression is a die-punch pattern. Chauffeur involves the radial styloid.",
        "fa": "فرورفتگی فوسای لونیت الگوی Die-Punch است؛ شوفر استایلوئید رادیوس را درگیر می‌کند."
      }
    },
    "difficulty": 1,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. AO radial-column fracture mechanisms (shear or compression): https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-sagittal-multifragmentary-radial-fracture-involving-scaphoid-fossa/orif-radial-column-plate"
  },
  {
    "id": "step",
    "q": {
      "de": "Textfall: Bei einer funktionell aktiven 48-jährigen Person bleibt nach Reposition eine intraartikuläre Stufe von 3 mm. Welche Einordnung entspricht der AAOS/ASSH-Leitlinie 2020?",
      "en": "Text vignette: a functionally active 48-year-old has a residual 3 mm intra-articular step after reduction. Which interpretation matches the 2020 AAOS/ASSH guideline?",
      "fa": "سناریوی متنی: در فرد فعال ۴۸ساله، پس از جااندازی پلهٔ داخل‌مفصلی ۳ میلی‌متری باقی مانده است. کدام تفسیر با راهنمای AAOS/ASSH۲۰۲۰ مطابقت دارد؟"
    },
    "o": [
      {
        "de": "Bei nichtgeriatrischen Patienten: postreduktionelle Gelenkstufe >5 mm als Kriterium für eine Fixationsabwägung",
        "en": "In nongeriatric patients: postreduction articular step >5 mm as a criterion for considering fixation",
        "fa": "در بیماران غیرسالمند: پلهٔ مفصلی بیش از ۵ میلی‌متر پس از جااندازی به‌عنوان معیار بررسی تثبیت جراحی"
      },
      {
        "de": "Bei nichtgeriatrischen Patienten: präreduktionelle Gelenkstufe >2 mm als maßgebliches Kriterium dieser Leitlinienempfehlung",
        "en": "In nongeriatric patients: prereduction articular step >2 mm as the relevant criterion for this guideline recommendation",
        "fa": "در بیماران غیرسالمند: پلهٔ مفصلی بیش از ۲ میلی‌متر پیش از جااندازی به‌عنوان معیار مربوط به این توصیهٔ راهنما"
      },
      {
        "de": "Bei nichtgeriatrischen Patienten: postreduktionelle Gelenkstufe >2 mm als Kriterium für eine individuelle Fixationsabwägung",
        "en": "In nongeriatric patients: postreduction articular step >2 mm as a criterion for individualized consideration of fixation",
        "fa": "در بیماران غیرسالمند: پلهٔ مفصلی بیش از ۲ میلی‌متر پس از جااندازی به‌عنوان معیار بررسی فردی تثبیت جراحی"
      },
      {
        "de": "Bei geriatrischen Patienten: postreduktionelle Gelenkstufe >2 mm als Beleg eines langfristigen patientenberichteten Vorteils der Operation",
        "en": "In geriatric patients: postreduction articular step >2 mm as evidence of a long-term patient-reported advantage of surgery",
        "fa": "در بیماران سالمند: پلهٔ مفصلی بیش از ۲ میلی‌متر پس از جااندازی به‌عنوان شاهد مزیت درازمدت جراحی در پیامدهای گزارش‌شده توسط بیمار"
      }
    ],
    "c": 2,
    "e": {
      "de": "Für nichtgeriatrische Patienten (in Studien meist <65 Jahre) unterstützt die Leitlinie eine Fixation bei postreduktioneller Gelenkverschiebung/Stufe >2 mm. Die Entscheidung berücksichtigt Funktion, Ziele, Risiken und weitere Fehlstellung. Alter ist ein Näherungswert für funktionellen Anspruch; die Grenze ist keine universelle OP-Anordnung.",
      "en": "For nongeriatric patients (usually <65 in studies), the guideline supports fixation for postreduction articular displacement/step >2 mm. Decisions consider function, goals, risks and other malalignment. Age is a proxy for functional demand; the threshold is not a universal surgical order.",
      "fa": "برای بیماران غیرسالمند (در مطالعات معمولاً زیر ۶۵سال)، راهنما از تثبیت جراحی در جابجایی/پلهٔ مفصلی بیش از ۲ میلی‌متر پس از جااندازی حمایت می‌کند. تصمیم، عملکرد، اهداف، خطرها و سایر بدراستایی‌ها را در نظر می‌گیرد. سن جانشینی تقریبی برای نیاز عملکردی است؛ این مرز دستور همگانی جراحی نیست."
    },
    "wrong": {
      "A": {
        "de": "Die Empfehlung nennt >2 mm nach Reposition bei nichtgeriatrischen Patienten. Die verbleibenden 3 mm überschreiten dieses Kriterium bereits.",
        "en": "The recommendation uses >2 mm after reduction in nongeriatric patients. The residual 3 mm already exceeds that criterion.",
        "fa": "توصیه برای بیماران غیرسالمند بیش از ۲ میلی‌متر پس از جااندازی را ذکر می‌کند؛ ۳ میلی‌متر باقی‌مانده از آن فراتر است."
      },
      "B": {
        "de": "Der Messzeitpunkt ist entscheidend: Diese Empfehlung bezieht sich auf die verbleibende Stufe nach Reposition, nicht auf die initiale Stufe davor.",
        "en": "Timing matters: this recommendation concerns the residual step after reduction, not the initial step before reduction.",
        "fa": "زمان اندازه‌گیری مهم است؛ این توصیه مربوط به پلهٔ باقی‌مانده پس از جااندازی است، نه پلهٔ اولیهٔ پیش از آن."
      },
      "D": {
        "de": "Die Aussage über verbessertes Langzeitergebnis bei dieser Schwelle gehört zur nichtgeriatrischen Population. Bei geriatrischen Patienten zeigt die Leitlinie keinen langfristigen Vorteil für patientenberichtete Ergebnisse; Funktion und Ziele bleiben individuell abzuwägen.",
        "en": "The evidence of improved outcomes at this threshold concerns nongeriatric patients. In geriatric patients the guideline shows no long-term patient-reported advantage; function and goals still require individual consideration.",
        "fa": "شواهد بهبود پیامدها در این مرز مربوط به بیماران غیرسالمند است. در بیماران سالمند راهنما مزیت درازمدت در پیامدهای گزارش‌شده توسط بیمار نشان نمی‌دهد؛ عملکرد و اهداف همچنان باید فردی سنجیده شوند."
      }
    },
    "difficulty": 2,
    "source": "AAOS/ASSH 2020, Indications for Fixation, non-geriatric and geriatric patients; https://www.aaos.org/globalassets/quality-and-practice-resources/distal-radius/distal-radius-fractures-10-13-2020.pdf; functional-demand context: https://pmc.ncbi.nlm.nih.gov/articles/PMC9196973/"
  },
  {
    "id": "tilt",
    "q": {
      "de": "Wie wird der volare Tilt des distalen Radius gemessen?",
      "en": "How is distal radial volar tilt measured?",
      "fa": "تیلت ولار دیستال رادیوس چگونه اندازه‌گیری می‌شود؟"
    },
    "o": [
      {
        "de": "Im echten Seitenbild: Gelenkflächenlinie zur Senkrechten auf die Radiuslängsachse",
        "en": "On a true lateral view: articular surface line against the perpendicular to the radial shaft axis",
        "fa": "در لترال واقعی: خط سطح مفصل نسبت به خط عمود بر محور طولی رادیوس"
      },
      {
        "de": "Im PA-Bild: Radiusstyloid zur ulnaren Gelenkflächenecke",
        "en": "On the PA view: radial styloid to the ulnar articular corner",
        "fa": "در نمای PA: استایلوئید رادیوس تا گوشهٔ اولنار سطح مفصل"
      },
      {
        "de": "Im PA-Bild: Längendifferenz zwischen distaler Ulna und Radius",
        "en": "On the PA view: length difference between distal ulna and radius",
        "fa": "در نمای PA: اختلاف طول انتهای اولنا و رادیوس"
      },
      {
        "de": "Im Seitenbild: Winkel zwischen Skaphoid- und Lunatumachse",
        "en": "On the lateral view: angle between scaphoid and lunate axes",
        "fa": "در نمای لترال: زاویهٔ محور اسکافوئید و لونیت"
      }
    ],
    "c": 0,
    "e": {
      "de": "Im echten Seitenbild wird die dorsale mit der palmaren Gelenkflächenkante verbunden und zur Senkrechten auf die Radiuslängsachse gemessen. Typischer Referenzwert ist etwa 11° volar, mit physiologischer Streuung; Schrägprojektion verfälscht die Messung.",
      "en": "On a true lateral view, join the dorsal and volar articular rims and measure against the perpendicular to the radial shaft axis. A typical reference is about 11° volar with physiological variation; obliquity distorts measurement.",
      "fa": "در لترال واقعی، لبه‌های دورسال و ولار سطح مفصل را به هم وصل کرده و نسبت به خط عمود بر محور طولی رادیوس اندازه می‌گیرند. مقدار مرجع تیپیک حدود ۱۱درجه ولار با تنوع طبیعی است؛ نمای مایل اندازه‌گیری را مخدوش می‌کند."
    },
    "wrong": {
      "B": {
        "de": "Diese Landmarken dienen der Radialinklination im PA-Bild, nicht dem sagittalen Tilt.",
        "en": "Those landmarks measure radial inclination on PA, not sagittal tilt.",
        "fa": "این نشانه‌ها شیب رادیال را در PA می‌سنجند، نه تیلت ساژیتال."
      },
      "C": {
        "de": "Diese Längendifferenz beschreibt die Ulnavarianz, keinen Winkel des Radius.",
        "en": "That length difference describes ulnar variance, not a radial angle.",
        "fa": "این اختلاف طول واریانس اولنار را توصیف می‌کند، نه زاویهٔ رادیوس."
      },
      "D": {
        "de": "Dies ist der skapholunäre Winkel zur Karpusbeurteilung. Volarer Tilt beschreibt die Radiusgelenkfläche.",
        "en": "That is the scapholunate angle for carpal assessment. Volar tilt describes the radial articular surface.",
        "fa": "این زاویهٔ اسکافولونات برای بررسی کارپ است؛ تیلت ولار سطح مفصلی رادیوس را توصیف می‌کند."
      }
    },
    "difficulty": 2,
    "source": "Ghafoor et al.2021/2022, Table1 and Fig4, https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  },
  {
    "id": "sl",
    "q": {
      "de": "Welcher Befund spricht am ehesten für eine skapholunäre Dissoziation?",
      "en": "Which finding most strongly suggests scapholunate dissociation?",
      "fa": "کدام یافته بیشتر به نفع دیسوسیشن اسکافولونات است؟"
    },
    "o": [
      {
        "de": "SL-Intervall grob > 3 mm, im Seitenvergleich beurteilt",
        "en": "SL interval roughly >3 mm, assessed against the opposite wrist",
        "fa": "فاصله SL حدوداً بیش از ۳ میلی‌متر با ارزیابی در مقایسه با مچ مقابل"
      },
      {
        "de": "Verbreitertes DRUG mit Ulnakopfsubluxation",
        "en": "Widened DRUJ with ulnar-head subluxation",
        "fa": "گشادشدگی DRUJ همراه ساب‌لوکساسیون سر اولنا"
      },
      {
        "de": "Isolierte zentrale Impression der Fossa lunata",
        "en": "Isolated central depression of the lunate fossa",
        "fa": "فرورفتگی مرکزی منفرد فوسای لونیت"
      },
      {
        "de": "Radiusverkürzung mit positiver Ulnavarianz bei unauffälligem SL-Intervall",
        "en": "Radial shortening with positive ulnar variance and an unremarkable SL interval",
        "fa": "کوتاهی رادیوس با واریانس اولنار مثبت و فاصلهٔ SL بدون تغییر"
      }
    ],
    "c": 0,
    "e": {
      "de": "Mehr als etwa 3 mm ist ein grober Orientierungswert, kein universeller Grenzwert: Messort, Projektion und Vergleich mit der Gegenseite sind wichtig. Gilula-Bögen und ein mögliches Skaphoid-Ringzeichen ergänzen die Beurteilung.",
      "en": "More than about 3 mm is a rough guide, not a universal cutoff: measurement location, projection and comparison with the opposite wrist matter. Gilula arcs and a possible scaphoid ring sign add context.",
      "fa": "بیش از حدود ۳ میلی‌متر یک راهنمای تقریبی است، نه حد قطعی همگانی؛ محل اندازه‌گیری، نما و مقایسه با سمت مقابل اهمیت دارند. قوس‌های گیلولا و احتمال علامت حلقه اسکافوئید نیز به ارزیابی کمک می‌کنند."
    },
    "wrong": {
      "B": {
        "de": "Das lenkt den Verdacht auf eine DRUG-Verletzung; es lokalisiert keine skapholunäre Bandverletzung.",
        "en": "That raises concern for DRUJ injury; it does not localize scapholunate ligament injury.",
        "fa": "این یافته شک به آسیب DRUJ را مطرح می‌کند؛ آسیب رباط اسکافولونات را موضع‌یابی نمی‌کند."
      },
      "C": {
        "de": "Die-Punch betrifft die Radiusgelenkfläche, nicht primär das Intervall zwischen Skaphoid und Lunatum.",
        "en": "Die-punch concerns the radial articular surface, not primarily the scaphoid–lunate interval.",
        "fa": "Die-Punch سطح مفصلی رادیوس را درگیر می‌کند، نه در درجهٔ اول فاصلهٔ اسکافوئید–لونیت."
      },
      "D": {
        "de": "Positive Ulnavarianz kann durch Radiusverkürzung entstehen. Ohne SL-Befund belegt sie keine skapholunäre Dissoziation.",
        "en": "Positive ulnar variance can result from radial shortening. Without an SL finding it does not establish scapholunate dissociation.",
        "fa": "واریانس اولنار مثبت می‌تواند از کوتاهی رادیوس ناشی شود؛ بدون یافتهٔ SL دیسوسیشن اسکافولونات را اثبات نمی‌کند."
      }
    },
    "difficulty": 1,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. Jones et al.2015, radiographic methods, https://pmc.ncbi.nlm.nih.gov/articles/PMC4641076/; Projection quality considered; direct contralateral-assessment evidence: Lans et al.2018, https://pubmed.ncbi.nlm.nih.gov/29456778/ (bilateral widening occurs; no treatment rate used)."
  },
  {
    "id": "lunate",
    "q": {
      "de": "Textfall: Im echten Seitenbild ist das Lunatum nach palmar aus der Radiuspfanne gekippt. Welche Einordnung passt am besten?",
      "en": "Text vignette: on a true lateral view, the lunate has tilted volarly out of the radial fossa. Which interpretation fits best?",
      "fa": "سناریوی متنی: در لترال واقعی، لونیت به سمت ولار از فوسای رادیوس چرخیده است. کدام تفسیر مناسب‌تر است؟"
    },
    "o": [
      {
        "de": "Lunatumluxation mit Spilled-teacup-Konfiguration",
        "en": "Lunate dislocation with a spilled-teacup configuration",
        "fa": "دررفتگی لونیت با پیکربندی فنجان واژگون"
      },
      {
        "de": "Dorsale perilunäre Luxation bei erhaltener radiolunärer Beziehung",
        "en": "Dorsal perilunate dislocation with preserved radiolunate alignment",
        "fa": "دررفتگی پری‌لونیت دورسال با رابطهٔ رادیولونات حفظ‌شده"
      },
      {
        "de": "Isolierte SL-Diastase bei erhaltener radiolunärer Beziehung",
        "en": "Isolated SL diastasis with preserved radiolunate alignment",
        "fa": "دیاستاز منفرد SL با رابطهٔ رادیولونات حفظ‌شده"
      },
      {
        "de": "Die-Punch-Fraktur ohne Lunatumluxation",
        "en": "Die-punch fracture without lunate dislocation",
        "fa": "شکستگی Die-Punch بدون دررفتگی لونیت"
      }
    ],
    "c": 0,
    "e": {
      "de": "Bei Lunatumluxation kippt das Lunatum palmar und erscheint im Seitenbild wie eine verschüttete Teetasse. Im PA-Bild kann es dreieckig als piece-of-pie erscheinen.",
      "en": "In lunate dislocation the lunate tilts volarly, resembling a spilled teacup on lateral imaging. On PA it may appear triangular as a piece of pie.",
      "fa": "در لوکساسیون لونیت، لونیت به ولار می‌چرخد و در لترال شبیه فنجان واژگون است؛ در PA ممکن است مثلثی دیده شود."
    },
    "wrong": {
      "B": {
        "de": "Bei der dorsalen perilunären Luxation bleibt das Lunatum zum Radius ausgerichtet, während das Kapitatum dorsal disloziert. Hier ist das Lunatum selbst aus der Pfanne gekippt.",
        "en": "In dorsal perilunate dislocation the lunate remains aligned with the radius while the capitate dislocates dorsally. Here the lunate itself has tipped out of the fossa.",
        "fa": "در دررفتگی پری‌لونیت دورسال، لونیت با رادیوس هم‌راستا می‌ماند و کاپیتیت به دورسال جابجا می‌شود؛ اینجا خود لونیت از فوسا چرخیده است."
      },
      "C": {
        "de": "Eine isolierte SL-Diastase erklärt nicht die beschriebene Luxation des Lunatums aus der Radiuspfanne.",
        "en": "Isolated SL diastasis does not explain the described lunate dislocation out of the radial fossa.",
        "fa": "دیاستاز منفرد SL دررفتگی توصیف‌شدهٔ لونیت از فوسای رادیوس را توضیح نمی‌دهد."
      },
      "D": {
        "de": "Die-Punch ist eine Impression der Radiusgelenkfläche durch das Lunatum, keine palmare Luxation des Lunatums.",
        "en": "Die-punch is depression of the radial articular surface by the lunate, not volar lunate dislocation.",
        "fa": "Die-Punch فرورفتگی سطح مفصلی رادیوس توسط لونیت است، نه دررفتگی ولار لونیت."
      }
    },
    "difficulty": 2,
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. Primary case with operative confirmation: https://pmc.ncbi.nlm.nih.gov/articles/PMC5221394/; acute cases: https://pmc.ncbi.nlm.nih.gov/articles/PMC7861191/"
  },
  {
    "id": "ct",
    "q": {
      "de": "Textfall: Im Röntgen besteht eine intraartikuläre Mehrfragmentfraktur; Ausmaß der Fossa-lunata-Impression und Beteiligung der Incisura ulnaris sind unklar. Welcher nächste Bildgebungsschritt beantwortet diese knöcherne Planungsfrage am besten?",
      "en": "Text vignette: radiographs show an intra-articular multifragmentary fracture; the extent of lunate-fossa depression and sigmoid-notch involvement is unclear. Which next imaging step best answers this bony planning question?",
      "fa": "سناریوی متنی: رادیوگرافی شکستگی چندقطعه‌ای داخل‌مفصلی را نشان می‌دهد؛ وسعت فرورفتگی فوسای لونیت و درگیری ناچ سیگموئید نامشخص است. کدام تصویربرداری بعدی این پرسش استخوانیِ برنامه‌ریزی را بهتر پاسخ می‌دهد؟"
    },
    "o": [
      {
        "de": "MRT primär zur Beurteilung des TFCC",
        "en": "MRI primarily to assess the TFCC",
        "fa": "MRI در درجهٔ اول برای ارزیابی TFCC"
      },
      {
        "de": "CT mit multiplanaren Rekonstruktionen zur Fragment- und Gelenkflächenkartierung",
        "en": "CT with multiplanar reconstructions to map fragments and articular surfaces",
        "fa": "CT با بازسازی چندصفحه‌ای برای نقشه‌برداری قطعات و سطوح مفصلی"
      },
      {
        "de": "Gezielte Schrägaufnahmen zur ergänzenden Projektionsdiagnostik",
        "en": "Targeted oblique radiographs for additional projectional assessment",
        "fa": "رادیوگرافی‌های مایل هدفمند برای ارزیابی تکمیلی در نماهای مختلف"
      },
      {
        "de": "Gezielte Sonographie zur Beurteilung der Sehnen und umgebenden Weichteile",
        "en": "Targeted ultrasound to assess tendons and surrounding soft tissues",
        "fa": "سونوگرافی هدفمند برای ارزیابی تاندون‌ها و بافت نرم اطراف"
      }
    ],
    "c": 1,
    "e": {
      "de": "CT zeigt Gelenkflächenfragmente, Impressionen und die sigmoid notch wesentlich besser und ist für komplexe intraartikuläre Frakturen und OP-Planung besonders wertvoll.",
      "en": "CT depicts articular fragments, depressions and the sigmoid notch much better and is valuable for complex intra-articular fractures and surgical planning.",
      "fa": "CT قطعات سطح مفصل، فرورفتگی‌ها و ناچ سیگموئید را بهتر نشان می‌دهد و برای شکستگی پیچیده داخل‌مفصلی و برنامه‌ریزی جراحی ارزشمند است."
    },
    "wrong": {
      "A": {
        "de": "MRT kann Weichteilfragen klären. Hier steht aber die komplexe knöcherne Gelenkflächengeometrie für die Planung im Vordergrund.",
        "en": "MRI can address soft-tissue questions. Here the priority is complex bony articular geometry for planning.",
        "fa": "MRI می‌تواند پرسش‌های بافت نرم را پاسخ دهد؛ اینجا اولویت هندسهٔ پیچیدهٔ استخوانیِ سطح مفصل برای برنامه‌ریزی است."
      },
      "C": {
        "de": "Schrägaufnahmen können ergänzen. Für die beschriebene komplexe Gelenkflächenimpression und Incisura-ulnaris-Beteiligung liefert CT die benötigte räumliche Fragmentkartierung.",
        "en": "Oblique views can add information. For the complex articular depression and sigmoid-notch involvement described, CT provides the spatial fragment mapping needed.",
        "fa": "نماهای مایل می‌توانند اطلاعات تکمیلی بدهند؛ برای فرورفتگی پیچیدهٔ مفصلی و درگیری ناچ سیگموئیدِ توصیف‌شده، CT نقشه‌برداری فضایی قطعات را فراهم می‌کند."
      },
      "D": {
        "de": "Sonographie ist für oberflächliche Sehnen-/Weichteilfragen hilfreich. Die Planungsfrage betrifft hier jedoch die komplexe knöcherne Gelenkflächengeometrie.",
        "en": "Ultrasound helps with superficial tendon and soft-tissue questions. The planning question here concerns complex bony articular geometry.",
        "fa": "سونوگرافی برای بررسی تاندون‌های سطحی و بافت نرم مفید است؛ پرسش برنامه‌ریزی اینجا دربارهٔ هندسهٔ پیچیدهٔ استخوانی سطح مفصل است."
      }
    },
    "difficulty": 2,
    "source": "AO Surgery Reference, fracture assessment of volar rim, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-fracture-of-the-radius-involving-the-volar-rim/orif-palmar-plate; Ghafoor et al., CT-based approach selection: https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  },
  {
    "id": "urgent",
    "q": {
      "de": "Welcher Begleitbefund verlangt bei distaler Radiusfraktur eine sofortige handchirurgische/traumatologische Eskalation?",
      "en": "Which associated finding in distal radius fracture requires immediate hand-surgical/trauma escalation?",
      "fa": "کدام یافتهٔ همراه در شکستگی دیستال رادیوس به ارجاع فوری به جراحی دست/تروما نیاز دارد؟"
    },
    "o": [
      {
        "de": "Nicht dislozierte Radiusstyloidfraktur bei kongruentem Karpus und unauffälliger Neurovaskularität",
        "en": "Undisplaced radial styloid fracture with congruent carpus and normal neurovascular findings",
        "fa": "شکستگی بدون جابجایی استایلوئید رادیوس با کارپ همخوان و وضعیت عصبی‌عروقی طبیعی"
      },
      {
        "de": "Lunatumluxation mit zunehmender Taubheit in Daumen, Zeige- und Mittelfinger",
        "en": "Lunate dislocation with increasing numbness in thumb, index and middle fingers",
        "fa": "دررفتگی لونیت با بی‌حسی فزایندهٔ شست، اشاره و میانی"
      },
      {
        "de": "Nicht dislozierte Ulnastyloidspitzenfraktur bei kongruentem DRUG ohne neurologische Beschwerden",
        "en": "Undisplaced ulnar styloid tip fracture with congruent DRUJ and no neurological symptoms",
        "fa": "شکستگی بدون جابجایی نوک استایلوئید اولنا با DRUJ همخوان و بدون علائم عصبی"
      },
      {
        "de": "Geringe Radiusverkürzung bei erhaltener Reposition und unverändert normaler Neurovaskularität",
        "en": "Mild radial shortening with maintained reduction and persistently normal neurovascular findings",
        "fa": "کوتاهی خفیف رادیوس با جااندازی حفظ‌شده و وضعیت عصبی‌عروقی همچنان طبیعی"
      }
    ],
    "c": 1,
    "e": {
      "de": "Lunatumluxation mit progredienten Medianusbeschwerden ist zeitkritisch und kann eine akute Nervenkompression anzeigen. Befund sofort kommunizieren und dringliche fachchirurgische Behandlung veranlassen; eine Routinekontrolle reicht nicht.",
      "en": "Lunate dislocation with progressive median-nerve symptoms is time-critical and may indicate acute nerve compression. Communicate immediately and arrange urgent specialist treatment; routine follow-up is insufficient.",
      "fa": "دررفتگی لونیت با علائم پیشروندهٔ عصب مدیان زمان‌حساس است و می‌تواند نشان‌دهندهٔ فشار حاد عصب باشد. یافته را فوراً اطلاع دهید و درمان فوری تخصصی را ترتیب دهید؛ پیگیری معمول کافی نیست."
    },
    "wrong": {
      "A": {
        "de": "Auch diese Fraktur braucht Versorgung. Ohne Luxation oder neurovaskuläre Auffälligkeit enthält sie aber nicht das hier beschriebene zeitkritische Warnzeichen.",
        "en": "This fracture also needs care, but without dislocation or neurovascular abnormality it lacks the time-critical warning described here.",
        "fa": "این شکستگی هم به درمان نیاز دارد، اما بدون دررفتگی یا اختلال عصبی‌عروقی، علامت هشدار زمان‌حساسِ اینجا را ندارد."
      },
      "C": {
        "de": "Eine nicht dislozierte Styloidspitzenfraktur bei kongruentem DRUG ohne Nervenbeschwerden ist nicht gleichzusetzen mit Luxation und progredienter Medianuskompression.",
        "en": "An undisplaced styloid tip fracture with congruent DRUJ and no nerve symptoms is not equivalent to dislocation with progressive median compression.",
        "fa": "شکستگی بدون جابجایی نوک استایلوئید با DRUJ همخوان و بدون علائم عصبی معادل دررفتگی همراه فشار پیشروندهٔ مدیان نیست."
      },
      "D": {
        "de": "Verkürzung muss dokumentiert und im Behandlungskontext bewertet werden. Bei normaler Neurovaskularität begründet sie allein keine akute Medianuskompressionswarnung.",
        "en": "Shortening should be documented and considered in treatment planning. With normal neurovascular findings it alone does not signal acute median compression.",
        "fa": "کوتاهی باید ثبت و در زمینهٔ درمان ارزیابی شود؛ با وضعیت عصبی‌عروقی طبیعی به‌تنهایی نشانهٔ هشدار فشار حاد مدیان نیست."
      }
    },
    "difficulty": 2,
    "source": "Primary case with operative confirmation: https://pmc.ncbi.nlm.nih.gov/articles/PMC5221394/; acute cases: https://pmc.ncbi.nlm.nih.gov/articles/PMC7861191/"
  }
]

export const DISTALE_RADIUS_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  QUESTION_CONTENT.map(item => Q(`distaleradius-${lang}-${item.id}`, item.q[lang], item.o.map(option => option[lang]), item.c, item.e[lang], Object.fromEntries(Object.entries(item.wrong).map(([id,text]) => [id,text[lang]])), item.source, item.difficulty)),
]))

export const DISTALE_RADIUS_FLASHCARDS = [
  {
    "id": "drf-fc-01",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Muster",
      "en": "Pattern",
      "fa": "الگو"
    },
    "front": {
      "de": "Was definiert eine Colles-Fraktur?",
      "en": "What defines a Colles fracture?",
      "fa": "شکستگی کولس چگونه تعریف می‌شود؟"
    },
    "answer": {
      "de": "Extraartikuläre distale Radiusfraktur mit dorsaler Angulation/Dislokation.",
      "en": "Extra-articular distal radius fracture with dorsal angulation/displacement.",
      "fa": "شکستگی خارج‌مفصلی دیستال رادیوس با زاویه‌داری/جابجایی دورسال."
    },
    "explanation": {
      "de": "Sie entsteht klassisch nach Sturz auf die extendierte Hand. Zusätzlich müssen Verkürzung, Translation, Komminution, Ulnastyloid und DRUG beschrieben werden.",
      "en": "It classically follows a fall on an extended hand. Also report shortening, translation, comminution, ulnar styloid and DRUJ.",
      "fa": "معمولاً پس از افتادن روی دست اکستاند رخ می‌دهد و کوتاهی، جابه‌جایی انتقالی، خردشدگی، استیلوئید اولنا و DRUJ نیز باید گزارش شوند."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "drf-fc-02",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Muster",
      "en": "Pattern",
      "fa": "الگو"
    },
    "front": {
      "de": "Was definiert eine Smith-Fraktur?",
      "en": "What defines a Smith fracture?",
      "fa": "شکستگی اسمیت چگونه تعریف می‌شود؟"
    },
    "answer": {
      "de": "Extraartikuläre distale Radiusfraktur mit palmarer Angulation/Dislokation.",
      "en": "Extra-articular distal radius fracture with volar angulation/displacement.",
      "fa": "شکستگی خارج‌مفصلی دیستال رادیوس با زاویه‌داری/جابجایی ولار."
    },
    "explanation": {
      "de": "Die Smith-Fraktur gilt als reverse Colles und entsteht klassisch nach Sturz auf das flektierte Handgelenk. Eine volare Barton-Fraktur ist dagegen intraartikulär und folgt mit dem Karpus.",
      "en": "Smith is the reverse Colles and classically follows a fall on a flexed wrist. A volar Barton fracture is intra-articular and moves with the carpus.",
      "fa": "اسمیت کولس معکوس است و معمولاً پس از افتادن روی مچ فلکس رخ می‌دهد؛ بارتون ولار داخل‌مفصلی است و همراه کارپ جابجا می‌شود."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "drf-fc-03",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Muster",
      "en": "Pattern",
      "fa": "الگو"
    },
    "front": {
      "de": "Was ist eine Barton-Fraktur?",
      "en": "What is a Barton fracture?",
      "fa": "شکستگی بارتون چیست؟"
    },
    "answer": {
      "de": "Intraartikuläre dorsale oder volare Randfraktur mit radiokarpaler Subluxation/Luxation.",
      "en": "Intra-articular dorsal or volar rim fracture with radiocarpal subluxation/dislocation.",
      "fa": "شکستگی لبه دورسال یا ولار داخل‌مفصلی با ساب‌لوکساسیون/لوکساسیون رادیوکارپال."
    },
    "explanation": {
      "de": "Das entscheidende Merkmal ist, dass der Karpus zusammen mit dem Randfragment folgt. Deshalb ist Barton hochinstabil und darf nicht als einfache Colles-/Smith-Fraktur bezeichnet werden.",
      "en": "The defining feature is that the carpus follows the rim fragment. Barton is therefore highly unstable and should not be labelled as a simple Colles/Smith fracture.",
      "fa": "ویژگی اصلی حرکت کارپ همراه قطعه لبه است؛ بنابراین بارتون بسیار ناپایدار است و نباید کولس/اسمیت ساده نامیده شود."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "drf-fc-04",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Fernandez",
      "en": "Fernandez",
      "fa": "فرناندز"
    },
    "front": {
      "de": "Welche Mechanismen entsprechen Fernandez Typ I–V?",
      "en": "Which mechanisms correspond to Fernandez Types I–V?",
      "fa": "مکانیسم‌های فرناندز انواع I تا V چیستند؟"
    },
    "answer": {
      "de": "I Biegung, II Scherung, III Kompression, IV Avulsion, V Kombination.",
      "en": "I bending, II shear, III compression, IV avulsion, V combination.",
      "fa": "I خمشی، II برشی، III فشاری، IV آولسیون، V ترکیبی."
    },
    "explanation": {
      "de": "Die Klassifikation ist mechanistisch: Typ I meist Colles/Smith, Typ II Barton, Typ III Die-Punch, Typ IV radiokarpale Luxationsfraktur mit Avulsionskomponente und Typ V kombinierte Hochenergieverletzung mit komplexer Gelenkzertrümmerung. Sie ersetzt keine vollständige Beschreibung und Stabilitätsbeurteilung.",
      "en": "The classification is mechanism-based: Type I usually Colles/Smith, Type II Barton, Type III die-punch, Type IV radiocarpal fracture-dislocation with an avulsion component, and Type V combined high-energy injury with complex articular comminution. It does not replace full description or stability assessment.",
      "fa": "طبقه‌بندی مکانیسم‌محور است: نوع I معمولاً کولس/اسمیت، نوع II بارتون، نوع III Die-Punch، نوع IV شکستگی-دررفتگی رادیوکارپال با مؤلفهٔ آولسیون و نوع V آسیب ترکیبی پرانرژی با خردشدگی پیچیدهٔ مفصل است. این طبقه‌بندی جایگزین توصیف کامل یا ارزیابی پایداری نیست."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "drf-fc-05",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Sonderform",
      "en": "Special pattern",
      "fa": "الگوی ویژه"
    },
    "front": {
      "de": "Was ist eine Die-Punch-Fraktur?",
      "en": "What is a die-punch fracture?",
      "fa": "شکستگی Die-Punch چیست؟"
    },
    "answer": {
      "de": "Zentrale Impression der Fossa lunata durch axiale Kompression des Lunatums.",
      "en": "Central depression of the lunate fossa caused by axial lunate compression.",
      "fa": "فرورفتگی مرکزی فوسای لونیت بر اثر فشار محوری لونیت."
    },
    "explanation": {
      "de": "Sie entspricht Fernandez Typ III und kann im Projektionsröntgen unterschätzt werden. CT zeigt Tiefe, Fragmente und Gelenkstufe für die Operationsplanung.",
      "en": "It corresponds to Fernandez Type III and may be underestimated on radiographs. CT shows depth, fragments and articular step for surgical planning.",
      "fa": "معادل فرناندز III است و ممکن است در رادیوگرافی کمتر دیده شود؛ CT عمق، قطعات و پله مفصل را برای برنامه‌ریزی جراحی نشان می‌دهد."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25."
  },
  {
    "id": "drf-fc-06",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Sonderform",
      "en": "Special pattern",
      "fa": "الگوی ویژه"
    },
    "front": {
      "de": "Was ist eine Chauffeur-Fraktur?",
      "en": "What is a chauffeur fracture?",
      "fa": "شکستگی شوفر چیست؟"
    },
    "answer": {
      "de": "Intraartikuläre Fraktur des Processus styloideus radii",
      "en": "Intra-articular radial styloid fracture",
      "fa": "شکستگی داخل‌مفصلی استایلوئید رادیوس"
    },
    "explanation": {
      "de": "Die PDF beschreibt die Chauffeur-Fraktur als knöcherne Avulsion des Radiusstyloids. SL-Band und karpale Ausrichtung auf Begleitverletzungen prüfen.",
      "en": "The PDF describes a chauffeur fracture as a bony avulsion of the radial styloid. Assess the SL ligament and carpal alignment for associated injury.",
      "fa": "در PDF شکستگی شوفر به‌صورت آولسیون استخوانی استیلوئید رادیوس توصیف شده است. رباط SL و هم‌راستایی کارپ را از نظر آسیب همراه بررسی کنید."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. AO radial-column fracture mechanisms (shear or compression): https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-sagittal-multifragmentary-radial-fracture-involving-scaphoid-fossa/orif-radial-column-plate"
  },
  {
    "id": "drf-fc-07",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Messung",
      "en": "Measurement",
      "fa": "اندازه‌گیری"
    },
    "front": {
      "de": "Wie messen und interpretieren Sie den volaren Tilt?",
      "en": "How do you measure and interpret volar tilt?",
      "fa": "تیلت ولار را چگونه اندازه می‌گیرید و تفسیر می‌کنید؟"
    },
    "answer": {
      "de": "Im echten Seitenbild: Gelenkflächenlinie zur Senkrechten auf die Radiuslängsachse; etwa 11° volar als Referenz.",
      "en": "On a true lateral view: articular surface line against the perpendicular to the radial shaft axis; about 11° volar as a reference.",
      "fa": "در لترال واقعی: خط سطح مفصل نسبت به خط عمود بر محور طولی رادیوس؛ حدود ۱۱درجه ولار به‌عنوان مرجع."
    },
    "explanation": {
      "de": "Dorsale und palmare Gelenkkante verbinden. Der Referenzwert variiert physiologisch; eine Schrägprojektion kann den Tilt verfälschen. Richtung und Ausmaß der Fehlstellung berichten.",
      "en": "Join the dorsal and volar articular rims. The reference varies physiologically; obliquity can distort tilt. Report the direction and extent of malalignment.",
      "fa": "لبه‌های دورسال و ولار مفصل را به هم وصل کنید. مقدار مرجع تنوع طبیعی دارد؛ نمای مایل می‌تواند تیلت را مخدوش کند. جهت و میزان بدراستایی را گزارش کنید."
    },
    "source": "Ghafoor et al.2021/2022, Table1 and Fig4, https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  },
  {
    "id": "drf-fc-08",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Messung",
      "en": "Measurement",
      "fa": "اندازه‌گیری"
    },
    "front": {
      "de": "Welche Geometrie messen Sie im PA-Bild mit Radialinklination und Ulnavarianz?",
      "en": "What geometry do radial inclination and ulnar variance measure on PA?",
      "fa": "شیب رادیال و واریانس اولنار در PA چه هندسه‌ای را اندازه می‌گیرند؟"
    },
    "answer": {
      "de": "Radialinklination: Gelenkflächenneigung zur Radiusachssenkrechten (Referenz etwa 22°). Ulnavarianz: distale Längenrelation von Ulna und Radius.",
      "en": "Radial inclination: articular slope against the perpendicular to the radial axis (reference about 22°). Ulnar variance: distal length relationship of ulna and radius.",
      "fa": "شیب رادیال: شیب سطح مفصل نسبت به خط عمود بر محور رادیوس (مرجع حدود ۲۲درجه). واریانس اولنار: رابطهٔ طولی انتهای اولنا و رادیوس."
    },
    "explanation": {
      "de": "Für die Inklination Radiusstyloid und ulnare Gelenkflächenecke verbinden. Die Ulnavarianz separat an standardisierter PA-Projektion beurteilen; Radiusverkürzung kann sie positiver machen.",
      "en": "For inclination join the radial styloid and ulnar articular corner. Assess ulnar variance separately on a standardized PA view; radial shortening can make it more positive.",
      "fa": "برای شیب، استایلوئید رادیوس و گوشهٔ اولنار سطح مفصل را وصل کنید. واریانس اولنار را جداگانه در PA استاندارد بسنجید؛ کوتاهی رادیوس می‌تواند آن را مثبت‌تر کند."
    },
    "source": "Ghafoor et al.2021/2022, Table1 and Fig4, https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  },
  {
    "id": "drf-fc-09",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Gelenkfläche",
      "en": "Articular surface",
      "fa": "سطح مفصل"
    },
    "front": {
      "de": "Wann ist das >2-mm-Kriterium der AAOS/ASSH 2020 bei distaler Radiusfraktur anzuwenden?",
      "en": "When does the 2020 AAOS/ASSH >2 mm criterion apply in distal radius fracture?",
      "fa": "معیار بیش از ۲ میلی‌متر AAOS/ASSH۲۰۲۰ در شکستگی دیستال رادیوس چه زمانی کاربرد دارد؟"
    },
    "answer": {
      "de": "Bei postreduktioneller intraartikulärer Verschiebung/Stufe >2 mm in nichtgeriatrischen Patienten (Studien meist <65 Jahre); individuelle Fixationsabwägung.",
      "en": "For postreduction intra-articular displacement/step >2 mm in nongeriatric patients (studies usually <65); individualized consideration of fixation.",
      "fa": "در جابجایی/پلهٔ داخل‌مفصلی بیش از ۲ میلی‌متر پس از جااندازی در بیماران غیرسالمند (مطالعات معمولاً زیر ۶۵سال)؛ بررسی فردی تثبیت جراحی."
    },
    "explanation": {
      "de": "Funktioneller Anspruch, Ziele, Risiken und weitere Fehlstellung zählen mit. Alter ist ein Näherungswert für funktionellen Bedarf. Bei geriatrischen Patienten zeigt die Leitlinie keinen langfristigen Vorteil der Operation für patientenberichtete Ergebnisse. Kein universeller OP-Befehl allein durch Gelenkbeteiligung oder einen Grenzwert.",
      "en": "Functional demand, goals, risks and other malalignment also matter. Age is a proxy for functional demand. In geriatric patients the guideline shows no long-term patient-reported advantage of surgery. Neither articular involvement nor a threshold alone is a universal surgical order.",
      "fa": "نیاز عملکردی، اهداف، خطرها و سایر بدراستایی‌ها هم اهمیت دارند. سن جانشین تقریبی نیاز عملکردی است. در بیماران سالمند، راهنما مزیت درازمدت جراحی در پیامدهای گزارش‌شده توسط بیمار نشان نمی‌دهد. نه درگیری مفصل و نه یک مرز عددی به‌تنهایی دستور همگانی جراحی نیست."
    },
    "source": "AAOS/ASSH 2020, Indications for Fixation, non-geriatric and geriatric patients; https://www.aaos.org/globalassets/quality-and-practice-resources/distal-radius/distal-radius-fractures-10-13-2020.pdf; functional-demand context: https://pmc.ncbi.nlm.nih.gov/articles/PMC9196973/"
  },
  {
    "id": "drf-fc-10",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Begleitverletzung",
      "en": "Associated injury",
      "fa": "آسیب همراه"
    },
    "front": {
      "de": "Welche Zeichen sprechen für skapholunäre Dissoziation?",
      "en": "Which signs suggest scapholunate dissociation?",
      "fa": "کدام علائم به نفع دیسوسیشن اسکافولونات هستند؟"
    },
    "answer": {
      "de": "Grob erweitertes SL-Intervall (oft >3 mm), mit Seitenvergleich beurteilt.",
      "en": "A roughly widened SL interval (often >3 mm), assessed by comparison with the opposite wrist.",
      "fa": "گشادشدگی تقریبی فاصله SL (اغلب بیش از ۳ میلی‌متر) با مقایسهٔ سمت مقابل."
    },
    "explanation": {
      "de": "Mehr als etwa 3 mm ist ein Orientierungswert, kein universeller Grenzwert; Projektion und Gegenseite sind mitzuberücksichtigen. Zusätzlich werden Gilula-Bögen und ein mögliches Skaphoid-Ringzeichen beurteilt.",
      "en": "More than about 3 mm is a guide, not a universal cutoff; projection and the opposite wrist must also be considered. Also assess Gilula arcs and a possible scaphoid ring sign.",
      "fa": "بیش از حدود ۳ میلی‌متر یک راهنماست، نه حد قطعی همگانی؛ نما و سمت مقابل نیز باید در نظر گرفته شوند. قوس‌های گیلولا و احتمال علامت حلقه اسکافوئید را هم بررسی کنید."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. Jones et al.2015, radiographic methods, https://pmc.ncbi.nlm.nih.gov/articles/PMC4641076/; Projection quality considered; direct contralateral-assessment evidence: Lans et al.2018, https://pubmed.ncbi.nlm.nih.gov/29456778/ (bilateral widening occurs; no treatment rate used)."
  },
  {
    "id": "drf-fc-11",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Begleitverletzung",
      "en": "Associated injury",
      "fa": "آسیب همراه"
    },
    "front": {
      "de": "Wie unterscheiden sich Lunatumluxation und dorsale perilunäre Luxation im Seitenbild?",
      "en": "How do lunate dislocation and dorsal perilunate dislocation differ on the lateral view?",
      "fa": "دررفتگی لونیت و دررفتگی پری‌لونیت دورسال در نمای لترال چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Lunatumluxation: Lunatum kippt palmar. Dorsal perilunär: Lunatum bleibt am Radius, Kapitatum disloziert dorsal.",
      "en": "Lunate dislocation: lunate tilts volarly. Dorsal perilunate: lunate remains with radius, capitate dislocates dorsally.",
      "fa": "لوکساسیون لونیت: لونیت به ولار می‌چرخد. پری‌لونیت دورسال: لونیت با رادیوس می‌ماند و کاپیتیت به دورسال جابجا می‌شود."
    },
    "explanation": {
      "de": "Bei Lunatumluxation entsteht das spilled-teacup-Zeichen. Bei dorsaler perilunärer Luxation ist die radiolunäre Beziehung erhalten, aber die kapitolunäre Achse unterbrochen.",
      "en": "Lunate dislocation produces the spilled-teacup sign. In dorsal perilunate dislocation radiolunate alignment is preserved but capitolunate alignment is disrupted.",
      "fa": "در لوکساسیون لونیت علامت فنجان واژگون ایجاد می‌شود؛ در پری‌لونیت دورسال هم‌راستایی رادیولونات حفظ و محور کاپیتولونات مختل است."
    },
    "source": "Primary case with operative confirmation: https://pmc.ncbi.nlm.nih.gov/articles/PMC5221394/; acute cases: https://pmc.ncbi.nlm.nih.gov/articles/PMC7861191/"
  },
  {
    "id": "drf-fc-12",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Instabilität",
      "en": "Instability",
      "fa": "ناپایداری"
    },
    "front": {
      "de": "Wie berichten Sie Hinweise auf drohenden Repositionsverlust?",
      "en": "How do you report features concerning for loss of reduction?",
      "fa": "نشانه‌های نگران‌کننده برای از دست رفتن جااندازی را چگونه گزارش می‌کنید؟"
    },
    "answer": {
      "de": "Komminution, Verkürzung, Tilt und Gelenkinkongruenz konkret beschreiben und mit Voraufnahmen vergleichen.",
      "en": "Describe comminution, shortening, tilt and articular incongruity explicitly and compare with previous images.",
      "fa": "خردشدگی، کوتاهی، تیلت و ناهمخوانی مفصل را مشخص توصیف و با تصاویر قبلی مقایسه کنید."
    },
    "explanation": {
      "de": "Morphologie und zunehmende Fehlstellung begründen die fachchirurgische Stabilitätsbeurteilung. Alter, Knochenqualität, Reposition und funktioneller Bedarf mitberücksichtigen. Eine einzelne Zahl oder Gelenkbeteiligung allein beweist weder Instabilität noch OP-Pflicht.",
      "en": "Morphology and increasing malalignment inform specialist assessment of stability. Consider age, bone quality, reduction and functional demand. A single number or articular involvement alone proves neither instability nor mandatory surgery.",
      "fa": "مورفولوژی و بدراستایی فزاینده به ارزیابی تخصصی پایداری کمک می‌کنند. سن، کیفیت استخوان، جااندازی و نیاز عملکردی را در نظر بگیرید. یک عدد یا درگیری مفصل به‌تنهایی نه ناپایداری و نه الزام جراحی را اثبات می‌کند."
    },
    "source": "AAOS/ASSH 2020, Indications for Fixation, non-geriatric and geriatric patients; https://www.aaos.org/globalassets/quality-and-practice-resources/distal-radius/distal-radius-fractures-10-13-2020.pdf; functional-demand context: https://pmc.ncbi.nlm.nih.gov/articles/PMC9196973/"
  },
  {
    "id": "drf-fc-13",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Befund",
      "en": "Reporting",
      "fa": "گزارش"
    },
    "front": {
      "de": "Welche fünf Bereiche gehören in den Befund einer distalen Radiusfraktur?",
      "en": "Which five areas belong in a distal radius fracture report?",
      "fa": "کدام پنج بخش باید در گزارش شکستگی دیستال رادیوس باشد؟"
    },
    "answer": {
      "de": "Morphologie, Fehlstellung, Gelenkfläche, DRUG/Ulna und Karpus.",
      "en": "Morphology, malalignment, articular surface, DRUJ/ulna and carpus.",
      "fa": "مورفولوژی، بدراستایی، سطح مفصل، DRUJ/اولنا و کارپ."
    },
    "explanation": {
      "de": "Ein reines Eponym reicht nicht. Der Befund soll Fragmentzahl, Komminution, Tilt, Verkürzung, Gelenkstufe, Ulnavarianz, DRUG-Kongruenz und karpale Begleitverletzungen dokumentieren.",
      "en": "An eponym alone is insufficient. Report fragments, comminution, tilt, shortening, articular step, ulnar variance, DRUJ congruity and carpal associated injuries.",
      "fa": "اپونیم به‌تنهایی کافی نیست؛ تعداد قطعات، خردشدگی، تیلت، کوتاهی، پله مفصل، واریانس اولنار، تطابق DRUJ و آسیب‌های همراه کارپ ثبت شوند."
    },
    "source": "MSK.pdf, physical pp.17–18 (printed16–17); page images and extracted text read2026-10-25. Reporting synthesis of the lesson, geometry and CT source."
  },
  {
    "id": "drf-fc-14",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Wann ist CT bei distaler Radiusfraktur besonders indiziert?",
      "en": "When is CT particularly indicated in distal radius fracture?",
      "fa": "CT در شکستگی دیستال رادیوس چه زمانی به‌ویژه اندیکاسیون دارد؟"
    },
    "answer": {
      "de": "Bei komplexer intraartikulärer Fraktur, Die-Punch, Barton oder unklarer Gelenkstufe.",
      "en": "For complex intra-articular fracture, die-punch, Barton or uncertain articular step.",
      "fa": "در شکستگی پیچیده داخل‌مفصلی، Die-Punch، بارتون یا پله مفصلی نامشخص."
    },
    "explanation": {
      "de": "CT ermöglicht Fragmentkartierung der Fossa scaphoidea, Fossa lunata und sigmoid notch. Es unterstützt die Wahl des Zugangs und die Planung der Gelenkflächenrekonstruktion.",
      "en": "CT maps fragments of the scaphoid fossa, lunate fossa and sigmoid notch. It supports approach selection and articular reconstruction planning.",
      "fa": "CT قطعات فوسای اسکافوئید، فوسای لونیت و ناچ سیگموئید را نقشه‌برداری کرده و به انتخاب رویکرد و بازسازی سطح مفصل کمک می‌کند."
    },
    "source": "AO Surgery Reference, fracture assessment of volar rim, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-fracture-of-the-radius-involving-the-volar-rim/orif-palmar-plate; Ghafoor et al., CT-based approach selection: https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  },
  {
    "id": "drf-fc-15",
    "topicId": "distale-radiusfraktur",
    "category": {
      "de": "Komplikation",
      "en": "Complication",
      "fa": "عارضه"
    },
    "front": {
      "de": "Welche Befunde nach distaler Radiusfraktur sind sofort zu eskalieren, welche im Verlauf zu prüfen?",
      "en": "Which findings after distal radius fracture need immediate escalation, and which need follow-up assessment?",
      "fa": "کدام یافته‌ها پس از شکستگی دیستال رادیوس به ارجاع فوری و کدام به بررسی پیگیری نیاز دارند؟"
    },
    "answer": {
      "de": "Sofort: karpale Luxation oder progrediente Medianus-/neurovaskuläre Beschwerden. Verlauf: Repositionsverlust, Fehlheilung, Gelenkinkongruenz, Sehnen- und DRUG-Probleme.",
      "en": "Immediate: carpal dislocation or progressive median-nerve/neurovascular symptoms. Follow-up: loss of reduction, malunion, articular incongruity, tendon and DRUJ problems.",
      "fa": "فوری: دررفتگی کارپ یا علائم پیشروندهٔ مدیان/عصبی‌عروقی. پیگیری: از دست رفتن جااندازی، بدجوش‌خوردگی، ناهمخوانی مفصل، مشکلات تاندون و DRUJ."
    },
    "explanation": {
      "de": "Eine Lunatumluxation kann den Medianus komprimieren; Routinekontrolle reicht bei zunehmenden Nervenbeschwerden nicht. Im Verlauf Achse, Länge, Gelenkfläche und Implantat-/Sehnenbeziehung gezielt kontrollieren; Bildgebung und Klinik zusammenführen.",
      "en": "Lunate dislocation can compress the median nerve; routine follow-up is insufficient for worsening nerve symptoms. During follow-up assess alignment, length, articular surface and implant/tendon relationship; combine imaging and clinical findings.",
      "fa": "دررفتگی لونیت می‌تواند عصب مدیان را تحت فشار قرار دهد؛ پیگیری معمول برای علائم عصبی رو به افزایش کافی نیست. در پیگیری، هم‌راستایی، طول، سطح مفصل و رابطهٔ ایمپلنت/تاندون را هدفمند بررسی و یافته‌های تصویر و بالین را ترکیب کنید."
    },
    "source": "Primary case with operative confirmation: https://pmc.ncbi.nlm.nih.gov/articles/PMC5221394/; acute cases: https://pmc.ncbi.nlm.nih.gov/articles/PMC7861191/ Ghafoor et al.2021/2022, Table1 and Fig4, https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
  }
]

export const DISTALE_RADIUS_FLASHCARD_TOPIC = {
  id: 'distale-radiusfraktur',
  title: L('Distale Radiusfraktur', 'Distal Radius Fracture', 'شکستگی دیستال رادیوس'),
  subtitle: L('Fernandez · Colles · Smith · Barton · Messwerte · Karpus', 'Fernandez · Colles · Smith · Barton · measurements · carpus', 'فرناندز · کولس · اسمیت · بارتون · اندازه‌گیری · کارپ'),
  area: 'MSK',
  chapter: L('Traumatologie & Frakturen', 'Trauma & Fractures', 'تروما و شکستگی‌ها'),
  icon: '🦴',
  iconImage: '/fach/msk.png',
  color: '#f97316',
  href: '/flashcards/distale-radiusfraktur',
}
